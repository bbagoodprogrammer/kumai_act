<template>
  <div @click.stop="" @touchend.stop="" class="land" :class="['land'+info.land_id, 'status'+info.status]">
    <!-- 空地 -->
    <ul @click="emptyClick()" class="choose" :class="'step'+empty">
      <li v-if="owner_msg.free_seed" @click="plantSeed(false)" class="normal">播種</li>
      <li v-else @click="getSeed" class="normal">去領種子</li>

      <li v-if="owner_msg.crazy_seed" @click="plantSeed(true)" class="crazy">播種</li>
      <li v-else @click="buySeed" class="crazy">購賣</li>
    </ul>

    <!-- 生长中 -->
    <div class="growing">
      <div class="time"><span>{{time}}</span></div>
      <div class="text"><span class="value" :class="'value'+info.value">x {{info.value}}</span></div>
    </div>

    <!-- 成熟了 -->
    <div @click="getCarrot()" class="mature" :class="'step'+mature">
      <div class="icon"></div>
      <div class="text"><span class="value" :class="'value'+info.value">x {{info.value}}</span><span v-if="info.second" class="time">{{time}}</span></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import downTime from '../utils/downTime';
import { plant, feed } from '../apis';
import { getOffset } from '../utils';
import { debuglog } from 'util';

export default {
  props: ['info'],
  data() {
    return {
      mature: 1, //成熟阶段交互状态序号 1手指 2铲子 3萝卜。这个状态存在组件中是因为这个状态从一点击开始，后面状态自动走完，中间不能干预。
      time: '00:00',
      timer: null,
    };
  },
  computed: {
    ...mapState(['owner_msg']),
    empty() {
      //空地阶段交互状态序号 1图标 2按钮
      //这个状态存在Store主要考虑点格子外自动状态重置（主要针对空地两种交互状态）
      return this.info.empty || 1;
    },
  },
  mounted() {
    this.startTimer();
  },
  destroyed() {
    this.stopTimer();
  },
  methods: {
    updateEmptyStep(step) {
      this.$store.commit('updateLandInfo', {
        land_id: this.info.land_id,
        empty: step,
      });
    },
    updateMatureStep(step) {
      this.mature = step;
    },
    updateStatus(status) {
      this.$store.commit('updateLandInfo', {
        land_id: this.info.land_id,
        status,
      });
    },
    startTimer() {
      const id = this.info.land_id;
      const timeKey = 'land' + id;
      this.timer = setInterval(() => {
        const timeObj = downTime(timeKey);
        if (timeObj) {
          this.time = timeObj.minute + ':' + timeObj.second;
          const status = this.info.status;
          if (status > 0 && timeObj.end) {
            if (status == 1) {
              //成长中
              // const second = 60 * 60;
              const second = 3;
              downTime('land' + id, second);
              this.$store.commit('updateLandInfo', {
                land_id: id,
                second: second,
                status: 2,
              });
            } else if (status == 2) {
              //等待收成
              const seed = this.info.seed;
              if (seed == 1 && this.mature == 1) { //如果已经开始领取了，停止状态自动更新，让收成动画播放完整
                //普通种子（1小时内不领取消失）
                this.$store.commit('updateLandInfo', {
                  land_id: id,
                  empty: 1,
                  status: 0,
                });
              } else if (seed == 2) {
                //疯狂种子（倒计时结束，second设为0隐藏时间，因为用钱购卖的原因成熟1小时后也不自动消失）
                if (this.info.second != 0) {
                  this.$store.commit('updateLandInfo', {
                    land_id: id,
                    empty: 1,
                    value: 100, //疯狂种子成熟一小时后值由110变为100
                    second: 0,
                  });
                }
              }
            }
          }
        }
      }, 1000);
    },
    stopTimer() {
      clearInterval(this.timer);
    },
    emptyClick() {
      this.$store.commit('resetLandSteps', this.info.land_id);
      this.updateEmptyStep(2);
    },
    getSeed() {
      alert('去領種子');
    },
    buySeed() {
      alert('購賣瘋狂種子');
    },
    async plantSeed(crazySeed) {
      const id = this.info.land_id;
      const type = crazySeed ? 2 : 1;

      if (type == 1 && !this.owner_msg.free_seed) {
        alert('普通種子數量不足');
        return;
      } else if (type == 2 && !this.owner_msg.crazy_seed) {
        alert('瘋狂種子數量不足');
        return;
      }

      // const second = 30 * 60;
      const second = 3;
      downTime('land' + id, second);
      this.$store.commit('updateLandInfo', {
        land_id: id,
        empty: 1,
        seed: type,
        value: 100,
        second: second,
        status: 1,
      });

      this.$store.commit(type == 2 ? 'updateCrazySeed' : 'updateNormalSeed');
      return;

      const res = await plant(id, type);
      if (res.data) {
        const { response_status, response_data } = res.data;
        if (response_status && response_status.code === 0) {

        }
      }
    },

    async getCarrot() {
      const id = this.info.land_id;
      this.updateMatureStep(2);
      setTimeout(() => {
        this.updateMatureStep(3);
        this.showCarrotAnim();
        setTimeout(() => {
          this.updateMatureStep(1);
          this.$store.commit('addRadish', this.info.value);
          this.$store.commit('updateLandInfo', {
            land_id: id,
            empty: 1,
            status: 0,
          });
        }, 1000);
      }, 2000);
      return;

      const res = await feed(id);
      if (res.data) {
        const { response_status, response_data } = res.data;
        if (response_status && response_status.code === 0) {

        }
      }
    },

    showCarrotAnim() {
      const elNums = document.getElementsByClassName('nums')[0];
      const landOffset = getOffset(this.$el);
      const valueOffset = getOffset(elNums);
      const div = document.createElement('div');
      div.className = 'carrotAnim';
      div.style.left = landOffset.left + this.$el.clientWidth / 2 - 20 + 'px';
      div.style.top = landOffset.top + 'px';
      document.body.appendChild(div);
      setTimeout(() => {
        console.log(valueOffset.left, valueOffset.top)
        div.style.left = valueOffset.left + 'px';
        div.style.top = valueOffset.top + 'px';
        div.style.transform = 'scale(.5)';
        setTimeout(() => {
          document.body.removeChild(div);
          elNums.firstChild.className = 'carrotValueAnim';
          setTimeout(() => {
            elNums.firstChild.className = '';
          }, 2000);
        }, 1000);
      }, 50);
    },
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
  width: 2.2rem;
  height: 1.8rem;
  position: relative;
  // outline: 1px solid red;

  .choose,
  .growing,
  .mature {
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }

  .choose {
    &.step1 {
      li {
        visibility: hidden;
      }
      background: url("../img/icon_seed.png") center 0.3rem no-repeat;
      background-size: 0.8rem;
      animation: packet 1s linear infinite alternate;
    }
    &.step2 {
      padding: 0.2rem 0 0 0.35rem;
      li {
        width: 1.66rem;
        height: 0.72rem;
        text-align: center;
        overflow: hidden;
        box-sizing: border-box;
        padding-left: 0.5rem;
        font-size: 80%;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        &.normal {
          line-height: 0.7rem;
          background-image: url("../img/common_seed.png");
        }
        &.crazy {
          line-height: 0.78rem;
          background-image: url("../img/crazy_seed.png");
        }
      }
    }
  }

  .growing,
  .mature {
    &:before {
      content: "";
      display: block;
      width: 100%;
      height: 110%;
      background: url("../img/carrot.png") center center no-repeat;
      background-size: 90%;
      position: absolute;
      left: 0;
      bottom: 0.1rem;
    }
  }

  .growing {
    .time,
    .text {
      position: absolute;
      left: 0;
      right: 0;
      text-align: center;
    }
    .time {
      bottom: 1.2rem;
      span {
        display: inline-block;
        padding: 0.05rem 0.15rem;
        color: #beffcf;
        font-size: 90%;
        background: rgba(21, 172, 163, 0.8);
        border-radius: 1rem;
      }
    }
    .text {
      bottom: 0.7rem;
    }
  }

  .mature {
    .icon,
    .text {
      position: absolute;
      left: 0;
      right: 0;
    }
    .icon {
      bottom: 1rem;
      height: 0.9rem;
      background-position: center bottom;
      background-repeat: no-repeat;
      background-size: auto 0.9rem;
      animation: translateY 1s linear infinite alternate;
    }
    .text {
      text-align: center;
      bottom: 0.5rem;
      .time {
        display: inline-block;
        padding: 0.05rem 0.1rem;
        color: #fff;
        font-size: 90%;
        background: rgba(255, 177, 86, 0.8);
        border-radius: 1rem;
        margin-left: 0.1rem;
        vertical-align: middle;
      }
    }

    &.step1 .icon {
      background-image: url("../img/finger.png");
    }
    &.step2 {
      .icon {
        background-image: url("../img/shovel.png");
        animation: shovel 1s linear infinite alternate;
      }
      .text {
        display: none;
      }
    }
    &.step3 {
      &:before {
        visibility: hidden;
      }
      .icon {
        visibility: hidden;
        background-image: url("../img/rabbit_done.png");
      }
      .time {
        display: none;
      }
      .value {
        animation: value 1s linear;
      }
    }
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
      background-image: url("../img/x5.png");
    }
    &.value100 {
      background-image: url("../img/x100.png");
    }
    &.value110 {
      background-image: url("../img/x110.png");
    }
  }

  &.status0 .choose {
    display: block;
  }
  &.status1 .growing {
    display: block;
  }
  &.status2 .mature {
    display: block;
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
  background: url("../img/rabbit_done.png");
  background-size: 100% 100%;
  transition: all 1s ease;
}
.carrotValueAnim {
  animation: headShake 1s linear infinite alternate;
}
</style>