<template>
  <div class="luck">
    <i class="close" @click="closeLuckPup()"></i>
    <div class="luckTips">
      <span>搖一搖星願瓶掉落豐富獎勵！消耗20朵星願花搖一次哦！</span>
    </div>
    <div class="luckBox">
      <div class="falowNums">{{chance}}</div>
      <div class="history" @click="showHistory = true">獎勵記錄</div>
      <div class="go one" @click="luck(1)">
        <span class="goTips">搖一次</span>
        <span class="goNums"><i></i>20</span>
      </div>
      <div class="go ten" @click="luck(10)">
        <span class="goTips">搖十次</span>
        <span class="goNums"><i></i>200</span>
      </div>
    </div>
    <div class="giftTips">
      <div class="title">成就獎勵</div>
      <div class="tipsStr">
        每天成功收穫60朵星願花,累計5天、10天、15天完成任務，即可領取對應獎勵（每人限領一次）
      </div>
      <div class="dayNums">
        今日已收穫花數<span>{{day_flower}}朵</span>
      </div>
      <div class="giftItem">
        <div class="item" v-for="(item,index) in task_day_gift" :key="index">
          <div class="imgBox">
            <img :src="require(`../img/gift/gift${index}.png`)" alt="">
          </div>
          <span class="bar">
            <em class="ed" v-if="item.get">已領取</em>
            <em v-else-if=" task_day >= item.limit" class="getSeed" @click="getGift(index)">領取</em>
            <em v-else class="barNums">
              <strong>{{task_day}}/{{item.limit}}</strong>
              <i class="actBar" :style="{width:task_day/item.limit * 100 +'%'}"></i>
            </em>
          </span>
        </div>
      </div>
    </div>
    <!-- 花不足 -->
    <div class="mask" v-show="noFalowPup">
      <transition name="slide">
        <div class="ordinaryPup noSeed" v-show="noFalowPup">
          <i class="close" @click="noFalowPup = false"></i>
          <p class="ordinaryTips">星願花數量不足<span>快去種植更多星願花吧！</span></p>
          <div class="ok" @click="noFalowPup = false">確認</div>
        </div>
      </transition>
    </div>
    <!-- 抽獎獲得 -->
    <div class="mask" v-show="showLuckGiftPup">
      <transition name="slide">
        <div class="giftPup" v-if="showLuckGiftPup" :class="{ten:prize.length > 1}">
          <i class=" close" @click="showLuckGiftPup = false"></i>
          <div class="title">恭喜獲得</div>
          <div class="giftImg">
            <div class="item" v-for="(item,index) in prize" :key="index">
              <div class="imgBox">
                <img :src="item.img" alt="">
                <div class="imgbg"></div>
              </div>
              <strong>{{item.name}}</strong>
            </div>
          </div>
          <p class="luckTips2">獎勵已派發您的帳號上,請注意查收哦！</p>
          <div class="ok" @click="showLuckGiftPup = false">確認</div>
        </div>
      </transition>
    </div>
    <!-- 禮物彈窗 -->
    <div class="mask" v-show="showGiftPup">
      <transition name="slide">
        <div class="giftPup" v-if="showGiftPup">
          <i class=" close" @click="showGiftPup = false"></i>
          <div class="title">恭喜獲得</div>
          <div class="giftImg">
            <div class="item" v-for="(item,index) in giftConfig[act_index]" :key="index">
              <div class="imgBox">
                <img :src="item.img" alt="">
                <div class="imgbg"></div>
              </div>
              <strong>{{item.name}}</strong>
            </div>
          </div>
          <div class="ok" @click="showGiftPup = false">確認</div>
        </div>
      </transition>
    </div>

    <!-- 抽奖记录-->
    <div class="mask" v-show="showHistory">
      <transition name="slide">
        <History v-if="showHistory" />
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { getDayGift, lottery, lotteryRecord } from "../apis"
import History from "./History"
export default {
  components: { History },
  data () {
    return {
      act_index: 1,
      showGiftPup: false,
      showHistory: false,
      showLuckGiftPup: false,
      prize: [],
      giftConfig: {
        1: [
          {
            img: require('../img/gift/gift4.png'),
            name: '花神祝福*10'
          },
          {
            img: require('../img/gift/gift1.png'),
            name: '5%單次儲值券'
          }
        ],
        2: [
          {
            img: require('../img/gift/gift4.png'),
            name: '花神祝福*20'
          },
          {
            img: require('../img/gift/gift2.png'),
            name: '馴鹿座駕（7天）'
          }
        ],
        3: [
          {
            img: require('../img/gift/gift4.png'),
            name: '花神祝福*15'
          },
          {
            img: require('../img/gift/gift3.png'),
            name: '小花壺（10金幣）'
          }
        ]
      },
      noFalowPup: false
    }
  },
  computed: {
    ...mapState(['task_day_gift', 'day_flower', 'task_day', 'chance'])
  },
  methods: {
    luck (val) {
      if (this.chance < val * 20) {
        this.noFalowPup = true
      } else {
        this.act_index = val
        lottery(val == 1 ? 0 : 1).then(res => {
          if (res.data.response_status.code == 0) {
            this.showLuckGiftPup = true
            this.prize = res.data.response_data.prize
            const ret = res.data.response_data.ret
            this.vxc('addLuckSeed', ret)
            this.vxc('reduxChance', val * 20)
          } else {
            this.toast(res.data.response_status.error)
          }
        })
      }

    },
    getGift (id) {
      getDayGift(id).then(res => {
        if (res.data.response_status.code == 0) {
          this.toast(`領取成功！`)
          this.vxc('setGiftStatus', id)
          this.showGiftPup = true
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    closeLuckPup () {
      this.$parent.showLuck = false
    }
  }
}
</script>

<style lang="scss">
.luck {
  width: 6.4rem;
  height: 10.4rem;
  background: url(../img/luckBg.png);
  background-size: 100% 100%;
  margin: -1rem 0 0 0.4rem;
  padding: 0.76rem 0.5rem 0 0.16rem;
  position: relative;
  .luckTips {
    width: 4.1rem;
    height: 0.98rem;
    padding: 0.2rem 0 0 1.38rem;
    background: url(../img/luckTips.png);
    background-size: 100% 100%;
    margin: 0 auto;
    span {
      display: block;
      font-size: 0.24rem;
    }
  }
  .luckBox {
    height: 4rem;
    position: relative;
    .falowNums {
      width: 0.85rem;
      height: 0.5rem;
      text-align: center;
      background: url(../img/falowNums.png);
      background-size: 100% 100%;
      font-size: 0.24rem;
      line-height: 0.55rem;
      position: absolute;
      padding-left: 0.5rem;
      top: 0.2rem;
      left: 0.73rem;
    }
    .history {
      width: 1.2rem;
      height: 0.5rem;
      background: url(../img/history.png);
      background-size: 100% 100%;
      font-size: 0.24rem;
      line-height: 0.5rem;
      position: absolute;
      top: 0.2rem;
      right: 0.35rem;
      text-align: center;
    }
    .go {
      width: 2.05rem;
      height: 0.74rem;
      position: absolute;
      .goTips {
        display: block;
        font-size: 0.26rem;
        line-height: 0.37rem;
        height: 50%;
        text-align: center;
        color: rgba(101, 72, 209, 1);
      }
      .goNums {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.26rem;

        i {
          width: 0.35rem;
          height: 0.35rem;
          background: url(../img/rabbit_done.png);
          background-size: 100% 100%;
        }
      }
      &.one {
        background: url(../img/tabs_act.png);
        background-size: 100% 100%;
        top: 3.07rem;
        left: 1.03rem;
      }
      &.ten {
        background: url(../img/ok.png);
        background-size: 100% 100%;
        top: 3.07rem;
        right: 0.8rem;
      }
    }
  }
  .giftTips {
    width: 5.67rem;
    height: 4.09rem;
    background: linear-gradient(
      180deg,
      rgba(59, 52, 154, 0.2),
      rgba(0, 0, 0, 0.1)
    );
    border-radius: 1rem;
    margin: 0 auto;
    .title {
      height: 0.9rem;
      line-height: 0.9rem;
      text-align: center;
      font-size: 0.38rem;
      font-weight: 600;
      color: #fff;
    }
    .tipsStr {
      text-align: center;
      font-size: 0.24rem;
      color: rgba(186, 230, 255, 1);
      padding: 0 0.15rem;
    }
    .dayNums {
      text-align: center;
      font-size: 0.24rem;
      margin: 0.2rem auto 0;
      span {
        font-size: 0.38rem;
        color: rgba(255, 250, 151, 1);
        margin-left: 0.15rem;
      }
    }
  }
  .giftItem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.7rem;
    margin-top: 0.2rem;
    .item {
      .imgBox {
        width: 0.9rem;
        height: 0.9rem;
        background: url(../img/selectAct.png);
        background-size: 100% 100%;
        margin: 0 auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .bar {
        display: block;
        width: 1.24rem;
        height: 0.3rem;
        text-align: center;
        margin-top: 0.15rem;
        .ed {
          background: rgba(131, 198, 255, 0.4);
          color: rgba(84, 71, 190, 1);
          font-size: 0.24rem;
        }
        .getSeed {
          display: block;
          width: 1.24rem;
          height: 0.3rem;
          line-height: 0.3rem;
          background: linear-gradient(90deg, #E68FFF 0%, #FFF38F 100%);
          border-radius: 0.15rem;
          margin: 0 auto;
          color: rgba(84, 71, 190, 1);
        }
        em {
          display: block;
          width: 1.24rem;
          height: 0.3rem;
          font-size: 0.24rem;
          font-weight: 500;
          position: relative;
          margin: 0 auto;
          border-radius: 0.15rem;
          &.barNums {
            background: RGBA(104, 124, 219, 1);
          }
          strong {
            font-size: 0.22rem;
            color: rgba(84, 71, 190, 1);
            display: block;
            width: 100%;
            height: 100%;
            line-height: 0.3rem;
            text-align: center;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 2;
          }
          .actBar {
            height: 0.3rem;
            line-height: 0.3rem;
            background: linear-gradient(90deg, #E68FFF 0%, #FFF38F 100%);
            border-radius: 0.15rem;
            max-width: 100%;
            position: absolute;
            left: 0;
            top: 0;
          }
        }
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
}
.giftPup {
  width: 6.6rem;
  height: 6.12rem;
  background: url(../img/queryPup.png);
  background-size: 100% 100%;
  position: relative;
  padding-right: 0.46rem;
  margin: -1rem 0 0 0.3rem;
  &.ten {
    width: 6.6rem;
    height: 8.07rem;
    padding: 1.07rem 0.46rem 0 0;
    background: url(../img/pup/whiteBg.png);
    background-size: 100% 100%;
    .title {
      height: 0.2rem;
      line-height: 0.2rem;
    }
    .giftImg {
      flex-wrap: wrap;
    }
  }
  .title {
    height: 1.4rem;
    line-height: 2.3rem;
    text-align: center;
    font-size: 0.36rem;
  }
  .giftTips {
    text-align: center;
    color: rgba(240, 179, 255, 1);
    font-size: 0.24rem;
    padding: 0 0.8rem;
    em {
      font-size: 0.24rem;
    }
  }
  .luckTips2 {
    padding: 0 0.3rem;
    text-align: center;
    font-size: 0.24rem;
    color: rgba(240, 179, 255, 1);
    margin: 0.15rem 0;
  }
  .giftImg {
    display: flex;
    align-items: center;
    justify-content: center;

    .imgBox {
      width: 1.58rem;
      height: 1.6rem;
      position: relative;
      .imgbg {
        width: 1.58rem;
        height: 1.6rem;
        background: url(../img/finght.png);
        background-size: 100% 100%;
        position: absolute;
        left: 0;
        top: 0;
      }
      img {
        width: 1rem;
        height: 1rem;
        position: absolute;
        left: 0.29rem;
        top: 0.3rem;
        z-index: 2;
      }
    }
    strong {
      display: block;
      text-align: center;
      font-size: 0.24rem;
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
    margin: 0.25rem auto;
    color: rgba(101, 72, 209, 1);
    font-weight: 500;
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