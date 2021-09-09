<template>
  <div @click.stop="" @touchend.stop="" class="land" :class="[{landBg:info.status  == 0 || info.status == 1},'land'+info.id, 'status'+info.status,'good'+info.goods_id]">
    <!-- 罩子 -->
    <div class="protect" v-if="protect_seconds && (info.status == 2 || info.status ==3)" :class="{pt:info.status == 3}"><i></i><strong>{{protect_time}}</strong> </div>
    <!-- 解锁 -->
    <div class="lock" :class="{pt:info.id == next_land_id}">
      <i></i>
      <strong>NO.{{info.id}}</strong>
      <div class="unlock" @click="unLockConfim()" v-if="info.id == next_land_id">點擊解鎖</div>
    </div>
    <!-- 空地 -->
    <ul @click="emptyClick()" class="choose">
      <span class="plant" @click="getGoodsList('seed')">點擊種植</span>
    </ul>
    <!-- 生长中 -->
    <div class="growing" @click="useProp('props')">
      <div class="time"><span>{{time}}后成熟</span></div>
      <div class="text"><span class="value" :class="'value'+info.value">x {{info.value}}</span></div>
    </div>

    <!-- 成熟了 -->
    <!-- :class="'step'+mature" -->
    <div @click="getCarrot()" class="mature">
      <!-- 礼盒 -->
      <div class="prize" v-show="info.prize.id"></div>
      <!-- 偷摘过 -->
      <div class="sunGetEd" v-if="info.stolen > 0"></div>
      <!-- 阳光 -->
      <div class="icon" v-show="!info.prize.id && info.stolen == 0">
        <canvas :id="'sunGo'+info.id"></canvas>
        <strong>{{info.sun}}</strong>
      </div>

      <!-- <div class="text"><span class="value" :class="'value'+info.value">x {{info.value}}</span><span v-if="info.second" class="time">{{time}}</span></div> -->
    </div>

    <!-- 道具列表 -->
    <div class="mask" v-show="showPropPup">
      <transition name="slide">
        <div class="userGoodList props" v-if="showPropPup">
          <i @click="showPropPup = false" class="close"></i>
          <div class="desc" v-if="showProDesc">
            <p>{{propsDesc[descId]}}</p>
            <div class="user" @click="useProps()">使用</div>
            <i class="corner" :class="{ringht:descIndex == 1}"></i>
          </div>
          <div class="goodsList ">
            <div class="goodItem" v-for="(item,index) in  isMain==1? myUseProps:protect_seconds>0?stoneProps:gloveProps" :key="index" @click="showDesc(item.id,index)">
              <img :src="require(`../img/props/${item.id}.png`)" alt="">
              <div class="nums">{{item.num}}</div>
              <div class="name">{{item.name}}</div>
            </div>
          </div>
        </div>
      </transition>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import downTime from '../utils/downTime';
import { feed, plant, harvest, addLand, useProps, goodsList, steal } from '../apis';
import { getOffset } from '../utils';
import { debuglog } from 'util';

import { Player } from 'svga.lite'

export default {
  props: ['info', 'svgaData', 'next_land_id'],
  data () {
    return {
      mature: 1, //成熟阶段交互状态序号 1手指 2铲子 3萝卜。这个状态存在组件中是因为这个状态从一点击开始，后面状态自动走完，中间不能干预。
      time: '00:00',
      seconds: 0,
      protect_time: '00:00',
      protect_seconds: 0,
      timer: null,
      showPropPup: false,
      userPropsList: [],
      propsDesc: {
        1: '肥料減少植物的成熟時間，每次使用-N秒',
        2: '保護盾可保護土地在N小時內不會被偷摘，但向保護盾投擲石頭會縮短保護時間，N秒',
        3: '對保護盾投擲石頭,可讓保護盾的保護時間減少N秒',
        4: '使用手套可摘到非好友玩家的陽光'
      },
      usePropsDesc: {
        1: '加速成功，植物成熟時間縮短N秒',
        2: '使用保護盾成功，N小時內將不被偷摘',
        3: '投出一個石頭，該保護盾保護時間-N秒',
        4: '偷取到N個陽光'
      },
      showProDesc: false,
      descId: 0,
      descIndex: 0,

    };
  },
  computed: {
    ...mapState(['owner_msg', 'is_friend', 'otherUser', 'isMain']),
    empty () {
      //空地阶段交互状态序号 1图标 2按钮
      //这个状态存在Store主要考虑点格子外自动状态重置（主要针对空地两种交互状态）
      return this.info.empty || 1;
    },
    myUseProps () {
      return this.userPropsList.filter(item => {
        return item.id != 3 && item.id != 4
      })
    },
    // otherProps () {
    //   return this.userPropsList.filter(item => {
    //     return item.id != 1 && item.id != 2
    //   })
    // },
    stoneProps () {
      return this.userPropsList.filter(item => {
        return item.id != 1 && item.id != 2 && item.id != 4
      })
    },
    gloveProps () {
      return this.userPropsList.filter(item => {
        return item.id != 1 && item.id != 2 && item.id != 3
      })
    }
  },
  watch: {
    svgaData (val) {
      this.sunGo()
    }
  },
  mounted () {
    this.startTimer();
  },
  destroyed () {
    this.stopTimer();
  },
  methods: {
    useProps () {
      //   const second = downTime(`protect${this.info.id}`)
      if (this.protect_seconds > 0 && this.descId == 2) {
        this.toast(`這塊土地有正在使用的保護盾哦~`)
        return
      }
      if (this.descId == 4) { //用手套偷摘
        steal(this.info.plant_id, 4).then(res => {
          if (res.data.response_status.code == 0) {
            this.toast(`已摘到好友的${res.data.response_data.sun}個陽光!`)
            this.descId = 0
            this.showPropPup = false
            this.showProDesc = false
            this.$parent.init(this.otherUser.uid)
          } else {
            this.toast(res.data.response_status.error)
          }
        })
      } else {
        useProps(this.info.plant_id, this.descId).then(res => {
          if (res.data.response_status.code == 0) {
            this.toast(this.usePropsDesc[this.descId])
            this.descId = 0
            this.showPropPup = false
            this.showProDesc = false
            if (this.isMain == 1) {
              this.$parent.init()
            } else {
              this.$parent.init(this.otherUser.uid)
            }
          } else {
            this.toast(res.data.response_status.error)
          }
        })
      }

    },
    showDesc (id, index) {
      this.descIndex = index
      this.descId = id
      this.showProDesc = true
    },
    useProp (type) {
      goodsList(type).then(res => {
        this.showPropPup = true
        this.userPropsList = res.data.response_data.list
      })
    },
    unLockConfim () {
      if (this.isMain == 1) {
        this.$parent.buyLand(this.info.id)
      }
    },
    getGoodsList (type) {
      if (this.isMain == 1) {
        this.$parent.getGoodsList(type, this.info.id)
      }
    },
    updateEmptyStep (step) {
      this.$store.commit('updateLandInfo', {
        id: this.info.id,
        empty: step,
      });
    },
    updateMatureStep (step) {
      this.mature = step;
    },
    updateStatus (status) {
      this.$store.commit('updateLandInfo', {
        id: this.info.id,
        status,
      });
    },
    startTimer () {
      const id = this.info.id;
      const timeKey = 'land' + id;
      const protectKey = 'protect' + id
      this.timer = setInterval(() => {
        const timeObj = downTime(timeKey);
        const protect_timeObj = downTime(protectKey);
        if (protect_timeObj) {
          this.protect_seconds = protect_timeObj.seconds
          this.protect_time = protect_timeObj.minute + ':' + protect_timeObj.second;
        }
        if (timeObj) {
          this.time = timeObj.minute + ':' + timeObj.second;
          this.seconds = timeObj.seconds;
          const status = this.info.status;
          if (status > 1 && timeObj.end) {
            if (status == 2) {
              //成长中
              // const second = 60 * 60;
              const second = this.info.end_seconds;
              downTime('land' + id, second);
              this.$store.commit('updateLandInfo', {
                id: id,
                second: second,
                status: 3,
              });
            } else if (status == 3) {
              //歡哥植物成熟后一段時間不摘會消失，覓友不需要這個邏輯
              //   const seed = this.info.seed;
              //   this.$store.commit('updateLandInfo', {
              //     id: id,
              //     empty: 1,
              //     status: 1,
              //   });
              //   if (seed == 1 && this.mature == 1) { //如果已经开始领取了，停止状态自动更新，让收成动画播放完整
              //     //普通种子（1小时内不领取消失）

              //   } else if (seed == 2) {
              //     //疯狂种子（倒计时结束，second设为0隐藏时间，因为用钱购卖的原因成熟1小时后也不自动消失）
              //     if (this.info.second != 0) {
              //       this.$store.commit('updateLandInfo', {
              //         id: id,
              //         empty: 1,
              //         value: 100, //疯狂种子成熟一小时后值由110变为100
              //         second: 0,
              //       });
              //     }
              //   }
            }
          }
        }
      }, 1000);
    },
    stopTimer () {
      clearInterval(this.timer);
    },
    emptyClick () {
      this.$store.commit('resetLandSteps', this.info.id);
      this.updateEmptyStep(2);
    },
    async getCarrot () {
      if (this.isMain == 1) {
        const id = this.info.plant_id;
        harvest(id).then(res => {
          if (res.data.response_status.code == 0) {
            if (this.info.prize.id) {
              this.toast(`勤勞的莊園主,恭喜你種出了【${this.info.prize.name}*${this.info.prize.num}】`)
            } else {
              this.toast(`恭喜獲得${res.data.response_data.sun}個陽光`)
            }
            this.$parent.init()
          } else {
            this.toast(res.data.response_status.error)
          }
        })
      } else if (this.is_friend) { //好友
        if (this.info.enable) {
          if (this.protect_seconds > 0) { //有保护罩判断是否有石头
            this.useProp('props')
          } else {
            steal(this.info.plant_id, 0).then(res => {
              if (res.data.response_status.code == 0) {
                this.toast(`已摘到好友的${res.data.response_data.sun}個陽光!`)
                this.$parent.init(this.otherUser.uid)
              } else {
                this.toast(res.data.response_status.error)
              }
            })
          }
        }
      } else if (!this.is_friend) { //非好友
        if (this.info.enable) {
          this.useProp('props')
        }
      }
    },
    async sunGo () {
      let canvas = document.getElementById('sunGo' + this.info.id)
      let player = new Player(canvas)
      await player.mount(this.svgaData)
      player.start()
    }
  },
};
</script>

<style lang="scss">
@keyframes translateY {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10px);
  }
}
@keyframes shovel {
  0% {
    transform: translateY(-30px);
  }
  50% {
    transform: translateY(30px);
    transform: rotate(20deg);
  }
}
@keyframes packet {
  0% {
    transform: scale(0.9) rotate(2deg);
  }
  100% {
    transform: scale(1) rotate(-2deg);
  }
}
@keyframes value {
  100% {
    opacity: 0;
    transform: translateY(-100px);
  }
}

.land {
  width: 2.4rem;
  height: 1.6rem;
  position: relative;
  &.landBg {
    background: url(../img/land2.png);
    background-size: 100% 100%;
  }

  .protect {
    width: 2.25rem;
    height: 1.44rem;
    background: url(../img/protect.png);
    background-size: 100% 100%;
    position: absolute;
    top: -0.5rem;
    left: 0.1rem;
    z-index: 50;
    text-align: center;
    display: flex;
    justify-content: center;
    &.pt {
      height: 0.64rem;
      padding-top: 0.8rem;
    }
    i {
      width: 0.21rem;
      height: 0.27rem;
      background: url(../img/protectIcon.png);
      background-size: 100% 100%;
    }
    strong {
      font-size: 0.22rem;
      font-weight: bold;
      color: #026D74;
      text-shadow: #fff 1px 0 0, #fff 0 1px 0, #fff -1px 0 0, #fff 0 -1px 0;
    }
  }
  .choose,
  .growing,
  .mature,
  .lock {
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
  .lock {
    text-align: center;
    padding-top: 0.5rem;
    &.pt {
      padding-top: 0.25rem;
    }
    i {
      display: inline-block;
      width: 0.33rem;
      height: 0.38rem;
      background: url(../img/lock.png);
      background-size: 100% 100%;
    }
    strong {
      font-size: 0.32rem;
      text-shadow: #88421E 1px 0 0, #88421E 0 1px 0, #88421E -1px 0 0,
        #88421E 0 -1px 0;
    }
    .unlock {
      width: 1.33rem;
      height: 0.51rem;
      background: url(../img/unlock.png);
      background-size: 100% 100%;
      margin: 0 auto;
      font-size: 0.26rem;
      color: #672A0B;
      text-align: center;
      line-height: 0.51rem;
    }
  }
  .choose {
    position: absolute;
    z-index: 50;
    .plant {
      display: block;
      width: 1.34rem;
      height: 0.98rem;
      background: url(../img/plant.png);
      background-size: 100% 100%;
      margin: 0 auto;
      text-align: center;
      font-size: 0.26rem;
      color: #672A0B;
      line-height: 0.58rem;
      font-weight: bold;
    }
  }

  .growing {
    background: url('../img/carrot.png') center center no-repeat;
    background-size: 90%;
  }
  .growing {
    .time,
    .text {
      position: absolute;
      left: 0;
      right: 0;
      text-align: center;
      z-index: 50;
    }
    .time {
      bottom: 1.4rem;
      span {
        display: inline-block;
        padding: 0.05rem 0.15rem;
        font-size: 0.24rem;
        background: rgba(0, 0, 0, 0.73);
        border-radius: 1rem;
      }
    }
    .text {
      bottom: 0.7rem;
    }
  }

  .mature {
    position: relative;
    z-index: 50;
    .prize {
      width: 1.01rem;
      height: 1.03rem;
      background: url(../img/giftBox.png);
      background-size: 100% 100%;
      animation: translateY 1s linear infinite alternate;
      position: absolute;
      top: -0.7rem;
      left: 0.7rem;
    }
    .icon {
      width: 1.01rem;
      height: 1.03rem;
      text-align: center;
      line-height: 0.95rem;
      color: #672A0B;
      position: absolute;
      top: -0.7rem;
      left: 0.2rem;
      animation: translateY 1s linear infinite alternate;
      canvas {
        width: 1.01rem;
        height: 1.03rem;
        position: absolute;
      }
      strong {
        font-size: 0.26rem;
        width: 1.01rem;
        height: 1.03rem;
        position: absolute;
      }
    }
    .sunGetEd {
      width: 1.01rem;
      height: 1.03rem;
      background: url(../img/sunGetEd.png);
      background-size: 100% 100%;
      position: absolute;
      top: -0.7rem;
      left: 0.63rem;
      animation: translateY 1s linear infinite alternate;
    }
    // .icon,
    // .text {
    //   position: absolute;
    //   left: 0;
    //   right: 0;
    //   z-index: 50;
    // }
    // .icon {
    //   bottom: 1rem;
    //   height: 0.9rem;
    //   background-position: center bottom;
    //   background-repeat: no-repeat;
    //   background-size: auto 0.9rem;
    //   top: -0.7rem;
    //   animation: translateY 1s linear infinite alternate;
    // }
    // .text {
    //   text-align: center;
    //   bottom: 0.5rem;
    //   .time {
    //     display: inline-block;
    //     padding: 0.05rem 0.1rem;
    //     color: #fff;
    //     font-size: 90%;
    //     background: rgba(255, 177, 86, 0.8);
    //     border-radius: 1rem;
    //     margin-left: 0.1rem;
    //     vertical-align: middle;
    //   }
    // }

    // &.step1 .icon {
    //   background-image: url('../img/sum.png');
    // }

    // &.step2 {
    //   .icon {
    //     background-image: url('../img/shovel.png');
    //     animation: shovel 1s linear infinite alternate;
    //   }
    //   .text {
    //     display: none;
    //   }
    // }
    // &.step3 {
    //   &:before {
    //     visibility: hidden;
    //   }
    //   .icon {
    //     visibility: hidden;
    //     background-image: url('../img/rabbit_done.png');
    //   }
    //   .time {
    //     display: none;
    //   }
    //   .value {
    //     animation: value 1s linear;
    //   }
    // }
  }

  .value {
    display: inline-block;
    width: 0.8rem;
    height: 0.3rem;
    vertical-align: middle;
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    text-indent: -1000rem;
    &.value5 {
      background-image: url('../img/x5.png');
    }
    &.value100 {
      background-image: url('../img/x100.png');
    }
    &.value110 {
      background-image: url('../img/x110.png');
    }
  }
  &.status0 .lock {
    display: block;
  }
  &.status1 .choose {
    display: block;
  }
  &.status2 .growing {
    display: block;
  }
  &.status3 .mature {
    display: block;
  }

  &.good100 {
    background: url(../img/landGoods/100.png);
    background-size: 100% 100%;
  }
  &.good101 {
    background: url(../img/landGoods/101.png);
    background-size: 100% 100%;
  }
  &.good102 {
    background: url(../img/landGoods/102.png);
    background-size: 100% 100%;
  }
  &.good103 {
    background: url(../img/landGoods/103.png);
    background-size: 100% 100%;
  }
  &.good104 {
    background: url(../img/landGoods/104.png);
    background-size: 100% 100%;
  }
  &.good105 {
    background: url(../img/landGoods/105.png);
    background-size: 100% 100%;
  }
  &.good106 {
    background: url(../img/landGoods/106.png);
    background-size: 100% 100%;
  }
  &.good107 {
    background: url(../img/landGoods/107.png);
    background-size: 100% 100%;
  }
  &.good108 {
    background: url(../img/landGoods/108.png);
    background-size: 100% 100%;
  }
  &.good109 {
    background: url(../img/landGoods/109.png);
    background-size: 100% 100%;
  }
  &.good200 {
    background: url(../img/landGoods/200.png);
    background-size: 100% 100%;
  }
}

@keyframes headShake {
  0% {
    transform: translateX(0);
  }
  6.5% {
    transform: translateX(-6px) rotateY(-9deg);
  }
  18.5% {
    transform: translateX(5px) rotateY(7deg);
  }
  31.5% {
    transform: translateX(-3px) rotateY(-5deg);
  }
  43.5% {
    transform: translateX(2px) rotateY(3deg);
  }
  50% {
    transform: translateX(0);
  }
}
.carrotAnim {
  position: absolute;
  width: 0.67rem;
  height: 0.81rem;
  background: url('../img/rabbit_done.png');
  background-size: 100% 100%;
  transition: all 1s ease;
}
.carrotValueAnim {
  animation: headShake 1s linear infinite alternate;
}
</style>