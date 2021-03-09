<template>
  <div v-if="owner_msg" class="landsBox">
    <!-- <div class="title">
      <a @click.prevent="" href=""><img :src="owner_msg.avatar" @error="onAvatarError($event)"></a>
      <div><strong>{{owner_msg.nick}}</strong><em>總成長值：{{owner_msg.total_score}}　排名：{{owner_msg.total_rank}}</em></div>
      <p>總成長值=胡蘿蔔數量+點讚值+作品/K房收禮魅力值</p>
    </div> -->

    <!-- <div class="btns">
      <a @click.prevent="getSeed" href="" class="get"></a>
      <a @click.prevent="getHelp" href="" class="help"></a>
    </div> -->

    <!-- <div class="role">
      <div><img :src="getRoleGif(owner_msg.rabbit_lv)"></div>
      <p><span>Lv {{owner_msg.rabbit_lv}}</span></p>
    </div> -->

    <!-- <ul class="seeds">
      <li><i>{{owner_msg.free_seed}}</i><span><strong>普通種子</strong><em>成長時間30分鐘<br>成熟1小時內領取</em></span></li>
      <li><i>{{owner_msg.crazy_seed}}</i><span><strong>瘋狂種子</strong><em>收成翻20倍 成長時間30分鐘<br>成熟1小時內領取加成10%</em></span></li>
    </ul> -->

    <div class="lands">
      <land v-for="land in land_info" :info="land" :key="land.id" ref="landItem" />
    </div>

    <!-- 普通种子确认弹窗 -->
    <div class="mask" v-show="showOrdinary">
      <transition name="slide">
        <div class="ordinaryPup" v-show="showOrdinary">
          <i class="close" @click="showOrdinary = false"></i>
          <p class="ordinaryTips">確定消耗一顆普通種子<img src="../img/normal.png" alt="">,種植5朵星願花嗎</p>
          <div class="ok" @click="plantSeed(false)">確認</div>
        </div>
      </transition>
    </div>

    <!-- 白色种子确认弹窗 -->
    <div class="mask" v-show="showWhitePup">
      <transition name="slide">
        <div class="whiteSeed" v-if="showWhitePup">
          <i class="close" @click="closeWhitePup()"></i>
          <div class="seedTitle">
            請選擇種植白色種子數量
          </div>
          <div class="overSeed">
            現有<img src="../img/crazy.png" alt=""> {{seed1}}
          </div>
          <div class="selectNums">
            <span v-for="(item,index) in 5 " :key="index" :class="[{act:nums == item,black:seed1< item},'num' + item]" @click="nums = item">
              {{item}}
            </span>
          </div>
          <div class="fallowNums">
            預計產出<em>{{nums * 15}}</em><img src="../img/flower.png" alt="">
          </div>
          <div class="ok" @click="plantSeed(true)">確認</div>
        </div>
      </transition>
    </div>

    <!-- 白色種子加速器 -->
    <div class="mask" v-show="acceleratorPup">
      <transition name="slide">
        <div class="whiteSeed" v-if="acceleratorPup">
          <i class="close" @click="closeAcceleratorPup()"></i>
          <div class="seedTitle">
            請選擇使用花神祝福數量
          </div>
          <div class="overSeed">
            現有<img src="../img/accIcon.png" alt=""> {{hoping}}
          </div>
          <div class="selectNums">
            <span v-for="(item,index) in 5 " :key="index" :class="[{act:acceleratorNums == item,black:item > couldNums},'num' + item]" @click="useAcc(item)">
              {{item}}
            </span>
          </div>
          <div class="fallowNums">
            減少成長時間<em>10</em>分鐘
          </div>
          <div class="ok" @click="useAccelerator(1)">確認</div>
        </div>
      </transition>
    </div>

    <!-- 普通种子加速器 -->
    <div class="mask" v-show="acceleratorPup2">
      <transition name="slide">
        <div class="ordinaryPup" v-show="acceleratorPup2">
          <i class="close" @click="acceleratorPup2 = false"></i>
          <p class="ordinaryTips">確定消耗一次花神祝福<img src="../img/accIcon.png" alt=""> 使當前種子立刻成熟？</p>
          <div class="ok" @click="useAccelerator(0)">確認</div>
        </div>
      </transition>
    </div>

    <!-- 擴建確認 -->
    <div class="mask" v-show="extensionPup">
      <transition name="slide">
        <div class="ordinaryPup" v-show="extensionPup">
          <i class="close" @click="extensionPup = false"></i>
          <p class="ordinaryTips">確定使用【{{priceArr[extension]}}金幣】購買【花圃格數x1】？</p>
          <div class="ok" @click="extensionClick()">確認</div>
        </div>
      </transition>
    </div>
    <!-- 種子不足 -->
    <div class="mask" v-show="noSeedPup">
      <transition name="slide">
        <div class="ordinaryPup noSeed" v-show="noSeedPup">
          <i class="close" @click="closeSeedPup()"></i>
          <p class="ordinaryTips" v-if="userNotType == 1">種子不足<span>趕快完成任務<br />獲取更多種子吧！</span></p>
          <p class="ordinaryTips" v-if="userNotType == 2">花神祝福次數不足<span>儲值金幣可獲取【花神祝福】 減少花朵10分鐘成長時間！</span></p>
          <div class="ok" @click="closeSeedPup()">確認</div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Land from './Land';
import { preloadImages } from '../utils';
import { plant, hoping, extension } from "../apis"
import downTime from '../utils/downTime';
import { globalBus } from '../utils/eventBus'
export default {
  data () {
    return {
      showOrdinary: false,
      showWhitePup: false,
      noSeedPup: false,
      acceleratorPup: false,
      acceleratorPup2: false,
      nums: 1,
      acceleratorNums: 1,
      couldNums: 0,
      userNotType: 1,
      extensionPup: false,
      priceArr: {
        0: 30,
        1: 60,
        2: 90
      }
    }
  },
  computed: {
    ...mapState(['extension', 'owner_msg', 'land_info', 'speciesObj', 'seed', 'seed1', 'hoping', 'land_id']),
  },
  watch: {
    speciesObj (val) {
      const timeKey = 'land' + val.land_id;
      const seconds = downTime(timeKey).seconds;
      this.couldNums = Math.ceil(seconds / 600)
    }
  },
  mounted () {
    preloadImages(
      require('../img/carrot.png'),

      // require('../img/common_seed.png'),
      // require('../img/crazy_seed.png'),

      // require('../img/x5.png'),
      // require('../img/x100.png'),
      // require('../img/x110.png'),

      // require('../img/finger.png'),
      // require('../img/shovel.png'),
      // require('../img/rabbit_done.png'),
    );
  },
  methods: {
    useAcc (item) {
      if (item <= this.couldNums) {
        this.acceleratorNums = item
      }
    },
    async plantSeed (crazySeed) {
      globalBus.$emit('commonEvent', () => {
        const id = this.speciesObj.land_id;
        const type = this.speciesObj.type;
        let nums = crazySeed ? this.nums : 1
        let value = crazySeed ? this.nums * 15 : 5
        if ((type == 1 && this.seed < 1) || (type == 2 && this.seed1 < this.nums)) {
          this.userNotType = 1
          this.noSeedPup = true
          return
        }
        plant(id, type - 1, nums).then(res => {
          if (res.data.response_status.code == 0) {
            console.log(type)
            // 減去種子書
            this.vxc('reduxSeed', {
              type: type,
              nums: type == 1 ? 1 : this.nums
            })
            const second = 600 * nums;
            downTime('land' + id, second);
            this.$store.commit('updateLandInfo', {
              land_id: id,
              empty: 1,
              seed: type,
              value: value,
              second: second,
              status: 1,
            });
            // 倒计时结束一半  种子变成黄色花朵
            setTimeout(() => {
              this.$store.commit('updateLandInfo', {
                land_id: id,
                seed: 3,
              });
            }, second * 1000 / 2)
            this.$store.commit(type == 2 ? 'updateCrazySeed' : 'updateNormalSeed');
            this.showOrdinary = false
            this.showWhitePup = false

          } else {
            this.toast(res.data.response_status.error)
          }
        })
      })

      //   return;

      //   const res = await plant(id, type);
      //   if (res.data) {
      //     const { response_status, response_data } = res.data;
      //     if (response_status && response_status.code === 0) {

      //     }
      //   }
    },
    useAccelerator (val) {
      globalBus.$emit('commonEvent', () => {
        let aNums = val ? this.acceleratorNums : 1
        if (this.hoping < aNums) {
          this.userNotType = 2
          this.noSeedPup = true
        } else {
          hoping(this.speciesObj.land_id, aNums).then(res => {
            if (res.data.response_status.code == 0) {
              const seconds = res.data.response_data.second
              const timeKey = 'land' + this.speciesObj.land_id;
              // 減去
              this.vxc('reduxSeed', {
                type: 3,
                nums: aNums
              })
              if (seconds > 0) {
                downTime(timeKey, seconds)
              } else {
                this.$store.commit('updateLandInfo', {
                  land_id: this.speciesObj.land_id,
                  status: 2,
                });
              }
              this.acceleratorPup = false
              this.acceleratorPup2 = false
            } else {
              this.toast(res.data.response_status.error)
            }
          })
        }
      })
    },
    extensionClick () {
      extension().then(res => {
        if (res.data.response_status.code == 0) {
          this.extensionPup = false
          this.$store.commit('updateLandInfo', {
            land_id: this.land_id,
            able: true,
            status: 0
          });
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    closeWhitePup () {
      this.nums = 1
      this.showWhitePup = false
    },
    closeAcceleratorPup () {
      this.acceleratorNums = 1
      this.acceleratorPup = false
    },
    onAvatarError (event) {
      event.target.src = require('../img/default.png');
    },
    getRoleGif (lv) {
      return [
        '',
        require('../img/1.gif'),
        require('../img/2.gif'),
        require('../img/3.gif'),
        require('../img/4.gif'),
        require('../img/5.gif'),
      ][lv];
    },
    getSeed () {
      alert('領種子');
    },
    getHelp () {
      alert('種植攻略');
    },
    closeSeedPup () {
      this.noSeedPup = false
      this.showOrdinary = false
      this.showWhitePup = false
    }
  },
  components: {
    Land,
  },
}
</script>

<style lang="scss">
@keyframes getSeed {
  100% {
    transform: scale(0.96);
  }
}
@keyframes role {
  55% {
    transform: translateY(0);
  }
  60% {
    transform: translateY(-5px);
  }
  65% {
    transform: translateY(0);
  }
}

.landsBox {
  font-size: 0.3rem;
  width: 7.33rem;
  height: 5rem;
  margin: 0 auto;
  position: relative;
  //   background: url('../img/feed_box.png');
  //   background-size: 100% 100%;

  .title {
    width: 5.6rem;
    height: 1rem;
    padding-left: 1.1rem;
    position: relative;
    background: url('../img/feed_box_title.png');
    background-size: 100% 100%;
    margin: auto;
    top: -0.4rem;
    a {
      display: block;
      width: 0.98rem;
      height: 1.19rem;
      position: absolute;
      left: 0;
      top: -0.25rem;
      img {
        width: 0.87rem;
        height: 0.87rem;
        border-radius: 1rem;
        position: absolute;
        left: 0.05rem;
        bottom: 0.05rem;
      }
      &:after {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: url('../img/self_avatar_bg.png');
        background-size: 100% 100%;
      }
    }
    div {
      padding-top: 0.08rem;
      strong,
      em {
        display: inline-block;
        vertical-align: middle;
      }
      strong {
        color: #fff;
        margin-right: 0.4rem;
        font-size: 90%;
        width: 1.5rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      em {
        font-size: 80%;
        color: #FFE479;
      }
    }
    p {
      font-size: 74%;
      color: #0CF8D0;
      white-space: nowrap;
    }
  }

  .btns {
    position: absolute;
    left: 0.3rem;
    top: 0.7rem;
    a {
      display: inline-block;
      background-size: 100% 100%;
      vertical-align: top;
      &.get {
        width: 1.08rem;
        height: 1.32rem;
        background-image: url('../img/get_seed.png');
        animation: getSeed 0.5s linear infinite alternate;
      }
      &.help {
        width: 1.66rem;
        height: 0.67rem;
        background-image: url('../img/plant_strategy.png');
      }
    }
  }

  .role {
    width: 1.8rem;
    position: absolute;
    left: 2.7rem;
    top: 1.2rem;
    text-align: center;
    div {
      img {
        height: 1.8rem;
        animation: role 8s linear infinite alternate;
      }
    }
    p {
      span {
        display: inline-block;
        padding: 0 0.3rem;
        color: #fff;
        height: 0.45rem;
        line-height: 0.45rem;
        background: #56C78A;
        border-radius: 1rem;
        font-size: 90%;
      }
    }
  }

  .seeds {
    position: absolute;
    left: 0.3rem;
    top: 9.35rem;
    right: 0.3rem;
    height: 1rem;
    li {
      float: left;
      box-sizing: border-box;
      border-radius: 0.4rem;
      padding: 0.05rem 0.2rem 0.05rem 0.7rem;
      position: relative;
      i,
      span {
        display: inline-block;
      }
      i {
        color: #fff;
        position: absolute;
        left: 0.2rem;
        bottom: 0.1rem;
        font-size: 70%;
        padding: 0 0.08rem;
        border-radius: 1rem;
        border-width: 2px;
        border-style: solid;
      }
      strong,
      em {
        display: block;
      }
      strong {
        font-size: 80%;
      }
      em {
        font-size: 70%;
        color: #BEFFCF;
        white-space: nowrap;
      }
      &:first-child {
        width: 41%;
        background: #1e8c66 url('../img/icon_common_seed.png') 0.1rem center
          no-repeat;
        background-size: 0.5rem 0.6rem;
        margin-right: 1%;
        i {
          background: #aa755e;
          border-color: #dba673;
        }
        strong {
          color: #F1FF8F;
        }
      }
      &:last-child {
        width: 58%;
        background: #1f8081 url('../img/icon_crazy_seed.png') 0.1rem center
          no-repeat;
        background-size: 0.5rem 0.6rem;
        i {
          background: #a05a8e;
          border-color: #df9bc1;
        }
        strong {
          color: #FFA4C5;
        }
      }
    }
  }

  .lands {
    width: 6.7rem;
    height: 5rem;
    position: relative;
    margin: 0 auto;
    // left: 0.3rem;
    // top: 4.2rem;
    .land1,
    .land2,
    .land3 {
      position: absolute;
      bottom: 3.28rem;
      transform: scale(0.7);
    }
    .land1 {
      left: 0.5rem;
    }
    .land2 {
      left: 2.25rem;
    }
    .land3 {
      right: 0.5rem;
    }

    .land4,
    .land5,
    .land6 {
      position: absolute;
      bottom: 1.8rem;
      transform: scale(0.8);
    }
    .land4 {
      left: 0.3rem;
    }
    .land5 {
      left: 2.25rem;
    }
    .land6 {
      right: 0.3rem;
    }

    .land7,
    .land8,
    .land9 {
      position: absolute;
      bottom: 0;
    }
    .land7 {
      left: 0;
    }
    .land8 {
      left: 2.2rem;
    }
    .land9 {
      right: 0.1rem;
    }

    .land1,
    .land4,
    .land7 {
      background: url(../img/lands/3.1.png);
      background-size: 100% 100%;
    }

    .land2,
    .land5,
    .land8 {
      background: url(../img/lands/3.2.png);
      background-size: 100% 100%;
    }
    .land3,
    .land6,
    .land9 {
      background: url(../img/lands/3.3.png);
      background-size: 100% 100%;
    }
  }
}
.ordinaryPup {
  width: 6.6rem;
  height: 6.12rem;
  background: url(../img/queryPup.png);
  background-size: 100% 100%;
  position: relative;
  padding-right: 0.46rem;
  margin: -1rem 0 0 0.3rem;
  &.noSeed {
    .ordinaryTips {
      margin-top: 1.7rem;
      span {
        display: block;
        color: rgba(240, 179, 255, 1);
        font-size: 0.28rem;
        line-height: 0.45rem;
        margin-top: 0.2rem;
      }
    }
    .ok {
      margin-top: 0.8rem;
    }
  }
  .ordinaryTips {
    padding: 0 1.3rem;
    vertical-align: middle;
    margin-top: 1.9rem;
    line-height: 0.6rem;
    text-align: center;
    font-size: 0.32rem;
    font-weight: 500;

    img {
      width: 0.5rem;
      height: 0.5rem;
    }
  }
  .ok {
    width: 2.54rem;
    height: 0.74rem;
    text-align: center;
    line-height: 0.74rem;
    font-size: 0.36rem;
    font-weight: 500;
    background: url(../img/ok.png);
    background-size: 100% 100%;
    margin: 0 auto;
    color: rgba(101, 72, 209, 1);
    margin-top: 0.5rem;
    font-weight: 500;
  }
  .close {
    left: 3.1rem;
  }
}
.whiteSeed {
  width: 6.6rem;
  height: 8.07rem;
  padding: 1.07rem 0.46rem 0 0;
  background: url(../img/pup/whiteBg.png);
  background-size: 100% 100%;
  margin: -1rem 0 0 0.3rem;
  position: relative;
  .seedTitle {
    text-align: center;
    font-size: 0.42rem;
    font-weight: 500;
  }
  .overSeed {
    text-align: center;
    color: rgba(240, 179, 255, 1);
    font-size: 0.28rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.3rem auto;
    img {
      width: 0.5rem;
      height: 0.5rem;
      margin: 0 0.1rem;
    }
  }
  .selectNums {
    display: flex;
    flex-wrap: wrap;
    span {
      width: 0.9rem;
      height: 0.9rem;
      background: #5E59D4;
      border: 0.04rem solid #9DADEB;
      border-radius: 0.14rem;
      text-align: center;
      line-height: 0.9rem;
      font-size: 0.48rem;
      font-weight: bold;
      color: rgba(157, 173, 235, 1);
      margin: 0 0 0.46rem 0.96rem;
      box-sizing: border-box;
      &.act {
        background: url(../img/selectAct.png);
        background-size: 100% 100%;
        border: none;
      }
      &.black {
        background: url(../img/selectBlack.png);
        background-size: 100% 100%;
        border: none;
      }
      &.num4 {
        margin-left: 1.85rem;
      }
    }
  }
  .fallowNums {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.2rem;
    em {
      margin: 0 0.15rem;
      color: rgba(255, 250, 151, 1);
      font-size: 0.38rem;
    }
    img {
      width: 0.5rem;
      height: 0.5rem;
    }
  }
  .ok {
    width: 2.54rem;
    height: 0.74rem;
    text-align: center;
    line-height: 0.74rem;
    font-size: 0.36rem;
    font-weight: 500;
    background: url(../img/ok.png);
    background-size: 100% 100%;
    margin: 0 auto;
    color: rgba(101, 72, 209, 1);
    margin-top: 0.5rem;
  }
}
.close {
  display: block;
  width: 0.7rem;
  height: 0.7rem;
  background: url(../img/close.png);
  background-size: 100% 100%;
  position: absolute;
  bottom: -0.8rem;
  left: 2.86rem;
}
</style>