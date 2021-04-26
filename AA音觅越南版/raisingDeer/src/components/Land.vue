<template>
  <div class="land" :class="['status'+info.status,'land'+info.id]">
    <div class="noOpen" @click="openLand()">
      <div class="openTips" v-if="info.id == 1 && !userMsg.registered">
        <img src="../assets/img/deer1.png" alt="" class="deerStart">
        <em class="receiveFirst"></em>
      </div>
      <div class="openTips" :class="{open:userLv >= info.id}" v-else>
        <span class="lock"></span>
        <em v-html="info.tips" class="itemDeerOpenTips" v-if="userLv < info.id"></em>
        <i v-else class="hand"></i>
      </div>
    </div>
    <div class="watering" @click="watering()">
      <div class="grass">
        <div class="icon"></div>
        <em class="waterTips"></em>
      </div>
    </div>
    <div class="immature">
      <div class="grass">
        <div class="time">{{time}} sau thu hoạch</div>
      </div>
    </div>
    <div class="mature" @click="getScore()">
      <div class="grass">
        <div class="icon"></div>
        <em class="feeding"></em>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
import { getOffset } from '../utils';
import downTime from '../utils/downTime';
import { setTimeout } from 'timers';
import api from "../api/apiConfig"
export default {
  props: ['info', 'userLv'],
  data () {
    return {
      time: '10:00',
      timer: null,
      couldGet: true
    }
  },
  computed: {
    ...mapState(['userMsg']),
  },
  mounted () {
    this.startTimer()
  },
  methods: {
    startTimer () {
      const id = this.info.id;
      const timeKey = 'land' + id;
      this.timer = setInterval(() => {
        const timeObj = downTime(timeKey);
        if (timeObj) {
          this.time = timeObj.minute + ':' + timeObj.second;
          const status = this.info.status;
          if (status > 2 && timeObj.end) {
            this.updateLandInfo(4)
          }
        }
      }, 1000)
    },
    openLand () {
      if (this.userLv >= this.info.unlock_level) {
        api.getLand(this.info.id).then(res => {
          if (res.data.response_status.code == 0) {
            this.updateLandInfo(2)
            this.vxc('setToast', {
              msg: 'Mở khóa',
              title: require('../assets/img/pupImg/landOpen.png'),
              img: require('../assets/img/pupImg/landOpenImg.png'),
              time: 2000
            })
          } else {
            this.vxc('setToast', { msg: res.data.response_status.error })
          }
        })
      }
      // else {
      //   this.toast('成长值还未到达当前解锁等级哦，</br>快去喂养食物吧！')
      // }
    },
    watering () {
      if (this.userMsg.water_count >= this.info.water_require) {
        const id = this.info.id
        api.wating(id).then(res => {
          if (res.data.response_status.code == 0) {
            const second = this.info.time_require
            downTime('land' + id, second)
            this.updateLandInfo(3)
            this.reduceNum(1, this.info.water_require)
          } else {
            this.vxc('setToast', { msg: res.data.response_status.error })
          }
        })
      } else {
        this.vxc('setToast', {
          msg: `Cần ${this.info.water_require}<i></i> bình nước, nhận bình nước nào`,
          title: require('../assets/img/pupImg/waterFlase.png'),
          img: null
        })
      }
    },
    updateLandInfo (val) {
      this.vxc('updateLandInfo', {
        id: this.info.id,
        status: val,
      })
    },
    reduceNum (type, num) {
      const id = this.info.id
      let obj = {
        type: type,
        num: num
      }
      this.vxc('reduceNum', obj)
    },
    getScore () {
      if (this.couldGet) {
        api.getCaoMei(this.info.id).then(res => {
          if (res.data.response_status.code == 0) {
            setTimeout(() => {
              this.couldGet = false
              this.showCarrotAnim()
              setTimeout(() => {
                this.vxc('setToast', {
                  msg: `Điểm trưởng thành tăng ${this.info.reward_exp}`,
                  title: require('../assets/img/pupImg/feedSuc.png'),
                  img: require('../assets/img/pupImg/feedImg.png'),
                  time: 2000
                })
                this.vxc('addScore', this.info.reward_exp)
                this.vxc('mouthMove', 2)
                this.updateLandInfo(2)
                this.couldGet = true
              }, 1000)
            }, 0)
          } else {
            this.vxc('setToast', { msg: res.data.response_status.error })
          }
        })
      }
    },
    showCarrotAnim () {
      const elNums = document.getElementById('lottie');
      const landOffset = getOffset(this.$el);
      const valueOffset = getOffset(elNums);
      const div = document.createElement('div');
      div.className = 'carrotAnim';
      div.style.left = landOffset.left + this.$el.clientWidth / 2 - 20 + 'px';
      div.style.top = landOffset.top + this.$el.clientHeight / 2 - 20 + 'px';
      document.body.appendChild(div);
      setTimeout(() => {
        div.style.left = valueOffset.left + elNums.clientWidth / 2 - 20 + 'px';
        div.style.top = valueOffset.top + elNums.clientHeight / 2 - 20 + 'px';
        div.style.transform = 'scale(.5)';
        setTimeout(() => {
          document.body.removeChild(div);
          //这里替换图片鹿的嘴巴动一动
          // elNums.firstChild.className = 'carrotValueAnim';
          // setTimeout(() => {
          //   elNums.firstChild.className = '';
          // }, 2000);
        }, 1000);
      }, 50);
    },
  }
}
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
// @keyframes rotateAni {
//   0% {
//     transform: rotate(0);
//   }
//   40% {
//     transform: rotate(-30deg);
//     background: url(../assets/img/loading.gif) no-repeat;
//   }
//   60% {
//     transform: rotate(-30deg);
//     background: url(../assets/img/loading.gif) no-repeat;
//   }
//   100% {
//     transform: rotate(0);
//   }
// }

@keyframes fingerHandle {
  0% {
    transform: none;
  }
  70% {
    transform: scale3d(0.8, 0.8, 0.8);
  }
  100% {
    transform: none;
  }
}
.carrotAnim {
  position: absolute;
  width: 0.67rem;
  height: 0.81rem;
  background: url('../assets/img/strawberry.png');
  background-size: 100% 100%;
  transition: all 1s ease;
}
.land {
  width: 2.79rem;
  height: 2.89rem;
  position: absolute;
  .noOpen,
  .watering,
  .immature,
  .mature {
    display: none;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .noOpen {
    .openTips {
      .deerStart {
        width: 1.11rem;
        height: 1.18rem;
        display: block;
        margin: 0.4rem auto 0;
      }
      .lock {
        width: 0.42rem;
        height: 0.5rem;
        background: url(../assets/img/lock.png);
        background-size: 100% 100%;
        display: block;
        margin: 0.8rem auto 0;
      }
      .receiveFirst {
        display: block;
        width: 2.15rem;
        height: 0.89rem;
        background: url(../assets/img/receiveFirst.png);
        background-size: 100% 100%;
        margin: 0 auto;
      }
      .itemDeerOpenTips {
        font-size: 0.24rem;
        color: #be762d;
        font-weight: 600;
        display: block;
        text-align: center;
        margin: 0.2rem auto 0;
      }
      &.open {
        .lock {
          width: 1.69rem;
          height: 0.59rem;
          background: url(../assets/img/couldOpen.png);
          background-size: 100% 100%;
        }
        .hand {
          display: block;
          width: 0.96rem;
          height: 0.84rem;
          background: url(../assets/img/hand.png);
          background-size: 100% 100%;
          position: absolute;
          right: 0;
          animation: fingerHandle 1s ease infinite both;
        }
      }
    }
  }
  .watering {
    .grass {
      width: 2.8rem;
      height: 2.96rem;
      background: url(../assets/img/wateringBg.png);
      background-size: 100% 100%;
      position: absolute;
    }
    .icon {
      width: 1.48rem;
      height: 1.51rem;
      background: url(../assets/img/water.png);
      background-size: 100% 100%;
      margin: 0.4rem auto 0;
      animation: translateY 1.5s linear infinite alternate;
    }
    .waterTips {
      display: block;
      width: 1.79rem;
      height: 0.48rem;
      background: url(../assets/img/goWater.png);
      background-size: 100% 100%;
      margin: 0.1rem auto 0;
    }
  }
  .immature {
    .grass {
      width: 2.8rem;
      height: 2.96rem;
      background: url(../assets/img/immatureBg.png);
      background-size: 100% 100%;
      position: absolute;
      .time {
        width: 1.43rem;
        height: 0.42rem;
        background: rgba(6, 120, 25, 0.8);
        border-radius: 0.21rem;
        font-size: 0.22rem;
        color: #beffcf;
        font-weight: bold;
        line-height: 0.42rem;
        text-align: center;
        white-space: nowrap;
        margin: 0.89rem auto 0;
      }
    }
  }
  .mature {
    .grass {
      width: 2.8rem;
      height: 2.96rem;
      background: url(../assets/img/matureBg.png);
      background-size: 100% 100%;
      position: absolute;
      .icon {
        width: 1.48rem;
        height: 1.5rem;
        margin: 0.4rem auto 0;
        background: url(../assets/img/strawberry.png) no-repeat;
        background-size: 100% 100%;
        animation: translateY 1.5s linear infinite alternate;
      }
      .feeding {
        display: block;
        width: 1.19rem;
        height: 0.6rem;
        background: url(../assets/img/feeding.png);
        background-size: 100% 100%;
        margin: 0.1rem auto 0;
      }
    }
  }

  &.status0 .noOpen {
    display: block;
  }
  &.status1 .noOpen {
    display: block;
  }
  &.status2 .watering {
    display: block;
  }
  &.status3 .immature {
    display: block;
  }
  &.status4 .mature {
    display: block;
  }
  &.land1 {
    top: 0.85rem;
    left: 0.56rem;
    background: url(../assets/img/land1Bg2.png);
    background-size: 100% 100%;
    &.status0 {
      background: url(../assets/img/land1Bg1.png);
      background-size: 100% 100%;
    }
  }
  &.land2 {
    top: 0.85rem;
    right: 0.59rem;
    background: url(../assets/img/land2Bg2.png);
    background-size: 100% 100%;
    &.status0 {
      background: url(../assets/img/land2Bg1.png);
      background-size: 100% 100%;
    }
  }
  &.land3 {
    bottom: 1.92rem;
    left: 0.42rem;
    background: url(../assets/img/land1Bg2.png);
    background-size: 100% 100%;
    transform: scale(1.1);
    &.status0 {
      background: url(../assets/img/land3Bg1.png);
      background-size: 100% 100%;
    }
  }
  &.land4 {
    bottom: 1.92rem;
    right: 0.42rem;
    background: url(../assets/img/land2Bg2.png);
    background-size: 100% 100%;
    transform: scale(1.1);
    &.status0 {
      background: url(../assets/img/land2Bg1.png);
      background-size: 100% 100%;
    }
  }
}
</style>
