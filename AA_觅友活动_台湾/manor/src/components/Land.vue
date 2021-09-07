<template>
  <div @click.stop="" @touchend.stop="" class="land" :class="[{landBg:info.status  == 0 || info.status == 1},'land'+info.id, 'status'+info.status,'good'+info.goods_id]">
    <!-- 罩子 -->
    <div class="protect"></div>
    <!-- 解锁 -->
    <div class="lock" :class="{pt:info.id == next_land_id}">
      <i></i>
      <strong>NO.{{info.id}}</strong>
      <div class="unlock" @click="unLock()" v-if="info.id == next_land_id">點擊解鎖</div>
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
      <div class="icon">
        <canvas :id="'sunGo'+info.id"></canvas>
        <strong>{{info.sun}}</strong>
      </div>
      <!-- <div class="text"><span class="value" :class="'value'+info.value">x {{info.value}}</span><span v-if="info.second" class="time">{{time}}</span></div> -->
    </div>

    <!-- 用戶種子列表 -->
    <div class="mask" v-show="showGoodListPup">
      <transition name="slide">
        <div class="userGoodList" v-if="showGoodListPup">
          <i @click="showGoodListPup = false" class="close"> </i>
          <div class="noGoods" v-if="!userGoodsList.length">
            <strong>倉庫里沒有種子哦...</strong>
            <span class="buy">去商店購買</span>
          </div>
          <div class="goodsList" v-else>
            <div class="goodItem" v-for="(item,index) in userGoodsList" :key="index" @click="plant(item.id)">
              <img :src="require(`../img/goods/${item.id}.png`)" alt="">
              <div class="nums">{{item.num}}</div>
              <div class="name">{{item.name}}</div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <!-- 道具列表 -->
    <div class="mask" v-show="showPropPup">
      <transition name="slide">
        <div class="userGoodList props" v-if="showPropPup">
          <i @click="showPropPup = false" class="close"></i>
          <div class="desc" v-if="showProDesc">
            <p>{{propsDesc[descId]}}</p>
            <div class="user" @click="useProps()">使用</div>
            <i class="corner"></i>
          </div>
          <div class="goodsList ">
            <div class="goodItem" v-for="(item,index) in myUseProps" :key="index" @click="showDesc(item.id)">
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
import { feed, goodsList, plant, harvest, addLand, useProps } from '../apis';
import { getOffset } from '../utils';
import { debuglog } from 'util';

import { Player } from 'svga.lite'

export default {
  props: ['info', 'svgaData', 'next_land_id'],
  data () {
    return {
      mature: 1, //成熟阶段交互状态序号 1手指 2铲子 3萝卜。这个状态存在组件中是因为这个状态从一点击开始，后面状态自动走完，中间不能干预。
      time: '00:00',
      timer: null,
      showGoodListPup: false,
      showPropPup: false,
      userGoodsList: [],
      userPropsList: [],
      propsDesc: {
        1: '肥料減少植物的成熟時間，每次使用-N秒',
        2: '保護盾可保護土地在N小時內不會被偷摘，但向保護盾投擲石頭會縮短保護時間，N秒',
        3: '',
        4: ''
      },
      showProDesc: false,
      descId: 0
    };
  },
  computed: {
    ...mapState(['owner_msg']),
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
    otherProps () {
      return this.userPropsList.filter(item => {
        return item.id != 1 && item.id != 2
      })
    }
  },
  watch: {
    svgaData (val) {
      console.log(val)
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
      const second = downTime(`protect${this.info.id}`)
      if (second && this.descId == 2) {
        this.toast(`這塊土地有正在使用的保護盾哦~`)
        return
      }
      useProps(this.info.plant_id, this.descId).then(res => {
        if (res.data.response_status.code == 0) {
          this.showPropPup = false
          this.showProDesc = false
          this.$parent.init()
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    showDesc (id) {
      this.descId = id
      this.showProDesc = true
    },
    useProp (type) {
      goodsList(type).then(res => {
        this.showPropPup = true
        this.userPropsList = res.data.response_data.list
      })
    },
    unLock () {
      addLand().then(res => {
        if (res.data.response_status.code == 0) {
          this.toast(`解鎖成功！`)
          this.$parent.init()
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    plant (goodId) {
      plant(this.info.id, goodId).then(res => {
        if (res.data.response_status.code == 0) {
          this.toast(`種植成功！`)
          this.showGoodListPup = false
          this.$parent.init()
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    getGoodsList (type) {
      goodsList(type).then(res => {
        this.showGoodListPup = true
        this.userGoodsList = res.data.response_data.list
      })
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
      this.timer = setInterval(() => {
        const timeObj = downTime(timeKey);
        if (timeObj) {
          this.time = timeObj.minute + ':' + timeObj.second;
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
      const id = this.info.plant_id;
      harvest(id).then(res => {
        if (res.data.response_status.code == 0) {
          this.toast(`收穫成功！`)
          this.$parent.init()
          //   this.updateMatureStep(2);
          //   setTimeout(() => {
          //     this.updateMatureStep(3);
          //     // this.showCarrotAnim();
          //     setTimeout(() => {
          //       this.updateMatureStep(1);
          //     //   this.$store.commit('addRadish', this.info.value);
          //       this.$store.commit('updateLandInfo', {
          //         id: id,
          //         status: 1,
          //         goods_id: 0
          //       });
          //     }, 1000);
          //   }, 2000)
        } else {
          this.toast(res.data.response_status.error)
        }
      })

    },

    // showCarrotAnim () {
    //   const elNums = document.getElementsByClassName('nums')[0];
    //   const landOffset = getOffset(this.$el);
    //   const valueOffset = getOffset(elNums);
    //   const div = document.createElement('div');
    //   div.className = 'carrotAnim';
    //   div.style.left = landOffset.left + this.$el.clientWidth / 2 - 20 + 'px';
    //   div.style.top = landOffset.top + 'px';
    //   document.body.appendChild(div);
    //   setTimeout(() => {
    //     console.log(valueOffset.left, valueOffset.top)
    //     div.style.left = valueOffset.left + 'px';
    //     div.style.top = valueOffset.top + 'px';
    //     div.style.transform = 'scale(.5)';
    //     setTimeout(() => {
    //       document.body.removeChild(div);
    //       elNums.firstChild.className = 'carrotValueAnim';
    //       setTimeout(() => {
    //         elNums.firstChild.className = '';
    //       }, 2000);
    //     }, 1000);
    //   }, 50);
    // },
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

.userGoodList {
  width: 7rem;
  height: 2.23rem;
  padding: 0.18rem 0.17rem 0;
  background: url(../img/goodlist.png);
  background-size: 100% 100%;
  position: relative;
  &.props {
    width: 4.14rem;
    height: 2.22rem;
    background: url(../img/props.png);
    background-size: 100% 100%;
    .goodsList {
      display: flex;
      align-items: center;
      justify-content: center;
      //    overflow-x: ;
    }
  }
  .close {
    display: block;
    width: 0.54rem;
    height: 0.54rem;
    background: url(../img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: -0.1rem;
    top: -0.25rem;
    z-index: 3;
  }
  .noGoods {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    strong {
      color: #D9B27F;
    }
    .buy {
      width: 2.78rem;
      height: 0.84rem;
      background: url(../img/buy.png);
      background-size: 100% 100%;
      text-align: center;
      text-align: center;
      line-height: 0.84rem;
      color: #672A0B;
      margin-top: 0.2rem;
    }
  }
  .desc {
    width: 5.6rem;
    height: 1.26rem;
    padding: 0.2rem;
    background: #FFF9E8;
    border: 1px solid #FFFFFF;
    border-radius: 0.1rem;
    color: #703500;
    font-size: 0.26rem;
    position: absolute;
    top: -2rem;
    left: -0.8rem;
    p {
      font-size: 0.24rem;
    }
    .user {
      width: 1.88rem;
      height: 0.59rem;
      background: url(../img/use.png);
      background-size: 100% 100%;
      margin: 0.15rem auto 0;
      text-align: center;
      line-height: 0.59rem;
    }
    .corner {
      display: block;
      width: 0px; /*  宽高设置为0，很重要，否则达不到效果 */
      height: 0px;
      border: 0.25rem solid #FFF9E8;
      border-bottom-color: transparent; /* 设置透明背景色 */
      border-left-color: transparent;
      border-right-color: transparent;
      position: absolute;
      bottom: -0.52rem;
      left: 1.8rem;
    }
  }
  .goodsList {
    width: 100%;
    height: 2.06rem;
    overflow-x: scroll;
    white-space: nowrap;
    .goodItem {
      display: inline-block;
      width: 1.79rem;
      height: 2.06rem;
      background: url(../img/goodItem.png);
      background-size: 100% 100%;
      margin-right: 0.04rem;
      position: relative;
      img {
        width: 1.09rem;
        height: 1.16rem;
        margin: 0.21rem auto 0;
      }
      .nums {
        width: 0.43rem;
        height: 0.43rem;
        border: 1px solid #FFFFFF;
        background: linear-gradient(0deg, #496BFF 0%, #64B5FF 100%);
        border-radius: 50%;
        position: absolute;
        top: 1.06rem;
        right: 0.19rem;
        text-align: center;
        line-height: 0.43rem;
        font-size: 0.24rem;
      }
      .name {
        text-align: center;
        font-size: 0.28rem;
        color: #703500;
        margin-top: 0.1rem;
      }
    }
  }
  .goodsList::-webkit-scrollbar {
    display: none; /* Chrome Safari */
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
    .icon {
      width: 1.01rem;
      height: 1.03rem;
      //   margin: -0.8rem auto 0;
      text-align: center;
      line-height: 1.03rem;
      font-size: 0.26rem;
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
        width: 1.01rem;
        height: 1.03rem;
        position: absolute;
      }
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