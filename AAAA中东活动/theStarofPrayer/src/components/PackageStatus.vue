<template>
  <div class="packState">
    <div class="packTitle">نيل الجان بإكمال المهمات اليومية </div>
    <!-- <div class="totalLamp"> عدد الجان المحصول عليه : <em>{{totalSpirit}}</em></div> -->
    <div class="surplusLmap">عدد الجان الباقي : <em>{{shouliMsg.spirit_counts}}</em></div>
    <div class="LampGod">
      <span v-for="(val,key,index) in taskReceive" :key=index @click="receive(key)">
        <i :class="{black:val ===1,shake:spotNum>=key && val ===0}"></i><em>{{key}}</em>
      </span>
    </div>
    <div class="lampLine">
      <i v-for="(item,index) in spotNum" :key=index></i>
      <div class="line" :style="{width:lineWidth}"></div>
      <div class="xuhao">
        <em>1</em>
        <em>2</em>
        <em>3</em>
        <em>4</em>
      </div>
    </div>
    <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import api from '../api/apiConfig'
import APP from "../utils/openApp"
import MsgToast from "../components/commonToast"
export default {
  components: { MsgToast },
  data() {
    return {
      tastMsg: '',
      showT: false
    }
  },
  computed: {
    ...mapState(['taskState', "taskReceive", "totalSpirit", 'isShare', 'activeityState', 'shouliMsg']),
    spotNum() { //完成任务数量
      var spot = 0
      if (this.taskState) {
        var giftState = this.taskState
        for (var item in giftState) {
          if (giftState[item].is_finish === 1) {
            spot++
          }
        }
        return spot
      }
      //   return spot
    },
    lineWidth() {//完成两个33%，三个66%，四个100%
      if (this.spotNum === 1 || this.spotNum === 0) {
        return '0%'
      } else if (this.spotNum === 2) {
        return '33%'
      } else if (this.spotNum === 3) {
        return '66%'
      } else if (this.spotNum === 4) {
        return '100%'
      }
    },
    // taskReceiveNum() { //已领取奖励个数
    //   if (this.taskState.gift) {
    //     var receiveNum = 0
    //     var gift = this.taskState.gift
    //     for (var item in gift) {
    //       if (gift[item] === 1) {
    //         receiveNum++
    //       }
    //     }
    //     return receiveNum
    //   }
    // },
    // totalLamp() {
    //   if (this.taskState) {
    //     return this.taskState.total_spirit
    //   }
    // }
  },
  methods: {
    receive(key) { //领取精灵球
      if (this.isShare) {
        APP()
        return
      } else if (this.activeityState === 0) {
        this.tastMsg = "لم يبدأ النشاط!"
        this.showT = true
      } else if (this.activeityState === 2) {
        this.tastMsg = "انتهى النشاط!"
        this.showT = true
      } else {
        if (this.taskReceive[key] === 0 && this.spotNum >= key) { //未领取且已完成
          api.receive(key).then((res) => {
            if (res.data.response_status.code === 0) { //改变任务已领取的状态
              this.$store.commit('setPackReceive', key)
              this.$store.commit('addSpirit', key)
            }
          })
        }
      }
    },
    closeToast() {
      this.showT = false
    }
  }
}
</script>

<style lang="scss">
.packState {
  width: 7.1rem;
  height: 3.06rem;
  background: url(../assets/img/packStateBg.png);
  background-size: 100% 100%;
  margin: -0.45rem auto 0;
  position: relative;
  .packTitle {
    color: #ffc960;
    text-align: center;
    font-weight: bold;
    padding-right: 0.4rem;
  }
  .totalLamp {
    text-align: center;
    margin-top: 0.05rem;
    font-size: 90%;
    em {
      font-size: 110%;
      color: #60fffd;
    }
  }
  .surplusLmap {
    margin-top: 0.17rem;
    text-align: center;
    font-size: 90%;
    em {
      font-size: 110%;
      color: #60fffd;
    }
  }
  .LampGod {
    width: 3.4rem;
    height: 0.57rem;
    // margin-left: .1rem;
    position: absolute;
    left: 0;
    top: 1.27rem;
    display: flex;
    span {
      flex: 1;
      font-size: 80%;
      color: #60fffd;
      vertical-align: middle;
      display: flex;
      align-items: center;
      i {
        display: inline-block;
        width: 0.32rem;
        height: 0.57rem;
        background: url(../assets/img/minLampBg.png);
        background-size: 100% 100%;
        margin-right: 0.1rem;
        &.black {
          background: url(../assets/img/huise.png);
          background-size: 100% 100%;
        }
        &.shake {
          animation: jiggle 3s ease-in infinite;
          -o-animation: jiggle 3s ease-in infinite;
          -webkit-animation: jiggle 3s ease-in infinite;
          -moz-animation: jiggle 3s ease-in infinite;
          -ms-animation: jiggle 3s ease-in infinite;
        }
        @keyframes jiggle {
          70%,
          100% {
            transform: rotate(0);
          }
          73%,
          79%,
          84%,
          90%,
          96% {
            transform: rotate(-8deg);
          }
          76%,
          81%,
          87%,
          93%,
          99% {
            transform: rotate(8deg);
          }
        }
      }
      em {
        // margin-right: .1rem;
      }
    }
  }
  .lampLine {
    width: 2.89rem;
    height: 0.21rem;
    background: url(../assets/img/lineBg.png);
    background-size: 100% 100%;
    position: absolute;
    top: 1.9rem;
    left: 0.31rem;
    i {
      display: inline-block;
      width: 0.2rem;
      height: 0.2rem;
      background: linear-gradient(
        0deg,
        rgba(228, 138, 12, 1) 0%,
        rgba(255, 226, 110, 1) 100%
      );
      border-radius: 50%;
      position: absolute;
      z-index: 10;
      // margin-top: .015rem;
    }
    i:nth-child(2) {
      right: 30.5%;
    }
    i:nth-child(3) {
      right: 61.5%;
    }
    i:nth-child(4) {
      right: 2.69rem;
    }
    .xuhao {
      width: 2.89rem;
      margin-top: 0.3rem;
      display: flex;
      em {
        flex: 1;
        text-align: center;
        color: #fff8ab;
      }
      em:nth-child(2) {
        padding-left: 0.22rem;
      }
      em:first-child {
        text-align: right;
      }
      em:last-child {
        text-align: left;
      }
    }
    .line {
      width: 100%;
      height: 0.05rem;
      position: absolute;
      top: 0.08rem;
      right: 0;
      background: #ffe58c;
      border-radius: 0.6rem;
    }
  }
}
</style>