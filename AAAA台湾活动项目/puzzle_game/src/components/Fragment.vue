<template>
  <div class="fragment">
    <div class="fragmentCon">
      <span :class="{active:puzzle_list[1]>0}" class="fragment1">
        <p>碎片①</p>
        <em>X {{puzzle_list[1]}}</em>
      </span>
      <span :class="{active:puzzle_list[2]>0}" class="fragment2">
        <p>碎片②</p>
        <em>X {{puzzle_list[2]}}</em>
      </span>
      <span :class="{active:puzzle_list[3]>0}" class="fragment3">
        <p>碎片③</p>
        <em>X {{puzzle_list[3]}}</em>
      </span>
      <span :class="{active:puzzle_list[4]>0}" class="fragment4">
        <p>碎片④</p>
        <em>X {{puzzle_list[4]}}</em>
      </span>
      <span :class="{active:puzzle_list[5]>0}" class="fragment5">
        <p>碎片⑤</p>
        <em>X {{puzzle_list[5]}}</em>
      </span>
      <span :class="{active:puzzle_list[6]>0}" class="fragment6">
        <p>碎片⑥</p>
        <em>X {{puzzle_list[6]}}</em>
      </span>
      <div class="synthesisBtn" :class="{active:isClude}" @click="synthesis()">合成領取感恩大禮</div>
    </div>
    <transition name="slide">
      <div class="LuckGift" v-show="showLuckGift">
        <div class="LuckGiftCon">
          <span class="close" @click="closeGetGift()"></span>
          <div class="giftItemBox">
            <div class="gift">
              <span>
                <div class="imgBox">
                  <img src="../assets/img/ward9.png" alt="" class="ward9">
                </div>
                <p>VIP（7天）</p>
              </span>
              <span>
                <div class="imgBox">
                  <img src="../assets/img/ward11.png" alt="" class="ward11">
                </div>
                <p>10%消費金幣返利券</p>
              </span>
              <span>
                <div class="imgBox">
                  <img src="../assets/img/ward12.png" alt="" class="ward12">
                </div>
                <p>感恩鈴鐺背包禮物*1</p>
              </span>
              <span>
                <div class="imgBox">
                  <img src="../assets/img/ward13.png" alt="" class="ward13">
                </div>
                <p>極速快艇座駕（7天）</p>
              </span>
            </div>
            <p class="luckGiftTips">以上獎品已派發到您的賬戶上，</br>請注意查收！
            </p>
          </div>
        </div>
      </div>
    </transition>
    <div class="gifBox" v-show="showGiftBox">
      <div class="giftItem">

      </div>
    </div>
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
  </div>

</template>
<script>
import { mapState } from 'vuex'
import { globalBus } from '../utils/eventBus'
import MsgToast from "../components/commonToast"
import api from "../api/apiConfig"
import { setTimeout } from 'timers';
export default {
  components: { MsgToast },
  data() {
    return {
      showLuckGift: false,
      showGiftBox: false,
      showT: false,  //提示弹窗显示
      tastMsg: "提示信息",  //基础弹窗提示信息
    }
  },
  computed: {
    ...mapState(['puzzle_list']),
    isClude() {
      for (let item in this.puzzle_list) {
        if (this.puzzle_list[item] == 0) {
          return false
        }
      }
      return true
    }
  },
  methods: {
    synthesis() {
      globalBus.$emit('commonEvent', callback => {
        if (this.isClude) {
          api.synthesis().then(res => {
            if (res.data.response_status.code == 0) {
              this.showGiftBox = true
              setTimeout(() => {
                this.showGiftBox = false
                this.showLuckGift = true
              }, 2000)
              this.$store.commit('addTotal_count')  //拼图加一，碎片减少
            } else {
              this.tastMsg = res.data.response_status.error
              this.showT = true
            }
          })
        }
      })
    },
    closeGetGift() {
      this.showLuckGift = false
    },
    closeToast() {
      this.showT = false
    }
  }
}
</script>
<style  lang="scss">
.fragment {
  width: 7.5rem;
  height: 4.62rem;
  padding-top: 1.55rem;
  background: url(../assets/img/fragmentBg.png);
  background-size: 100% 100%;
  .fragmentCon {
    width: 4.88rem;
    height: 3.26rem;
    margin: 0 auto;
    position: relative;
    color: #ab5125;
    span {
      position: absolute;
    }
    em {
      display: block;
    }
    .fragment1 {
      width: 1.93rem;
      height: 1.68rem;
      text-align: center;
      p {
        width: 1.627rem;
        margin-top: 0.58rem;
        font-size: 80%;
        color: #ffffff;
        -webkit-text-stroke: 0.02rem #ab5125;
        text-stroke: 0.02rem #ab5125;
      }
      em {
        width: 1.627rem;
        margin-top: 0.05rem;
        color: #ffffff;
        -webkit-text-stroke: 0.02rem #681600;
        text-stroke: 0.02rem #681600;
      }
      &.active {
        background: url(../assets/img/fragment1.png);
        background-size: 100% 100%;
      }
    }
    .fragment2 {
      width: 1.93rem;
      height: 1.68rem;
      left: 1.6rem;
      text-align: center;
      p {
        width: 1.627rem;
        margin-top: 0.58rem;
        font-size: 80%;
        color: #ffffff;
        -webkit-text-stroke: 0.02rem #ab5125;
        text-stroke: 0.02rem #ab5125;
      }
      em {
        width: 1.627rem;
        margin-top: 0.05rem;
        color: #ffffff;
        -webkit-text-stroke: 0.02rem #681600;
        text-stroke: 0.02rem #681600;
      }
      &.active {
        background: url(../assets/img/fragment2.png);
        background-size: 100% 100%;
      }
    }
    .fragment3 {
      width: 1.68rem;
      height: 1.95rem;
      right: 0;
      text-align: center;
      p {
        width: 1.627rem;
        margin-top: 0.58rem;
        font-size: 80%;
        color: #ffffff;
        -webkit-text-stroke: 0.02rem #ab5125;
        text-stroke: 0.02rem #ab5125;
      }
      em {
        width: 1.627rem;
        margin-top: 0.05rem;
        color: #ffffff;
        -webkit-text-stroke: 0.02rem #681600;
        text-stroke: 0.02rem #681600;
      }
      &.active {
        background: url(../assets/img/fragment3.png);
        background-size: 100% 100%;
      }
    }
    .fragment4 {
      width: 1.68rem;
      height: 1.91rem;
      bottom: 0;
      text-align: center;
      p {
        width: 1.627rem;
        margin-top: 0.85rem;
        font-size: 80%;
        color: #ffffff;
        -webkit-text-stroke: 0.02rem #ab5125;
        text-stroke: 0.02rem #ab5125;
      }
      em {
        width: 1.627rem;
        margin-top: 0.05rem;
        color: #ffffff;
        -webkit-text-stroke: 0.02rem #681600;
        text-stroke: 0.02rem #681600;
      }
      &.active {
        background: url(../assets/img/fragment4.png);
        background-size: 100% 100%;
      }
    }
    .fragment5 {
      width: 1.93rem;
      height: 1.68rem;
      bottom: 0;
      left: 1.35rem;
      text-align: center;
      p {
        width: 1.627rem;
        margin: 0.58rem 0 0 auto;
        font-size: 80%;
        color: #ffffff;
        -webkit-text-stroke: 0.02rem #ab5125;
        text-stroke: 0.02rem #ab5125;
      }
      em {
        width: 1.627rem;
        margin: 0.05rem 0 0 auto;
        color: #ffffff;
        -webkit-text-stroke: 0.02rem #681600;
        text-stroke: 0.02rem #681600;
      }
      &.active {
        background: url(../assets/img/fragment5.png);
        background-size: 100% 100%;
      }
    }
    .fragment6 {
      width: 1.93rem;
      height: 1.68rem;
      bottom: 0;
      right: 0;
      text-align: center;
      p {
        width: 1.627rem;
        margin: 0.58rem 0 0 auto;
        font-size: 80%;
        color: #ffffff;
        -webkit-text-stroke: 0.02rem #ab5125;
        text-stroke: 0.02rem #ab5125;
      }
      em {
        width: 1.627rem;
        margin: 0.05rem 0 0 auto;
        color: #ffffff;
        -webkit-text-stroke: 0.02rem #681600;
        text-stroke: 0.02rem #681600;
      }
      &.active {
        background: url(../assets/img/fragment6.png);
        background-size: 100% 100%;
      }
    }
    .synthesisBtn {
      width: 3.05rem;
      height: 0.85rem;
      text-align: center;
      line-height: 0.7rem;
      white-space: nowrap;
      color: #fff;
      background: url(../assets/img/blackSynthesis.png);
      background-size: 100% 100%;
      position: absolute;
      left: 0.95rem;
      bottom: -1.2rem;
      &.active {
        color: #661714;
        background: url(../assets/img/synthesisBtn.png);
        background-size: 100% 100%;
      }
    }
  }
  .LuckGift {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 10000;
    background: rgba(0, 0, 0, 0.8);
    .LuckGiftCon {
      width: 6.42rem;
      height: 7.68rem;
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -40%);
      background: url(../assets/img/getGift2.png);
      background-size: 100% 100%;
      .giftItemBox {
        width: 4.8rem;
        position: absolute;
        top: 2.2rem;
        left: 0.8rem;
        .fiveTitle {
          text-align: center;
          color: #ffc867;
          margin-top: 0.1rem;
        }
        .gift {
          height: 3.4rem;
          padding-top: 0.4rem;
          text-align: center;
          span {
            display: inline-block;
            width: 49%;
            img {
              display: block;
              margin: 0 auto;
              &.ward9 {
                width: 0.99rem;
                height: 0.93rem;
              }
              &.ward11 {
                width: 0.99rem;
                height: 1.01rem;
              }
              &.ward12 {
                width: 1.01rem;
                height: 1rem;
              }
              &.ward13 {
                width: 1.15rem;
                height: 1.07rem;
              }
            }
            p {
              text-align: center;
              font-size: 80%;
              line-height: 0.3rem;
              margin-top: 0.1rem;
              padding: 0 0.1rem;
            }
          }
        }
        .luckGiftTips {
          padding: 0 0.1rem;
          font-size: 80%;
          color: #ffe0aa;
          text-align: center;
        }
      }
      .close {
        display: block;
        width: 0.45rem;
        height: 0.45rem;
        position: absolute;
        top: 0;
        right: 0.57rem;
        background: url(../assets/img/getGiftClose.png);
        background-size: 100% 100%;
      }
    }
  }
  .gifBox {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 10000;
    background: rgba(0, 0, 0, 0.8);
    .giftItem {
      width: 2.8rem;
      height: 3.42rem;
      background: url(../assets/img/giftBox.png);
      background-size: 100% 100%;
      position: absolute;
      top: 4.5rem;
      left: 2.5rem;
      // opacity: 0;
      // transform: translate(-50%, -50%);
      animation: rotae 2s linear;
    }
  }
  @keyframes rotae {
    0% {
      transform: rotate(-10deg);
    }
    5% {
      transform: rotate(10deg);
    }
    10% {
      transform: rotate(-10deg);
    }
    15% {
      transform: rotate(-10deg);
    }
    20% {
      transform: rotate(10deg);
    }
    25% {
      transform: rotate(-10deg);
    }
    30% {
      transform: rotate(10deg);
    }
    35% {
      transform: rotate(-10deg);
    }
    40% {
      transform: rotate(10deg);
    }
    45% {
      transform: rotate(-10deg);
    }
    50% {
      transform: rotate(10deg);
    }
    55% {
      transform: rotate(-10deg);
    }
    60% {
      transform: rotate(10deg);
    }
    65% {
      transform: rotate(-10deg);
    }
    70% {
      transform: rotate(10deg);
    }
    75% {
      transform: rotate(-10deg);
    }
    80% {
      transform: rotate(10deg);
    }
    85% {
      transform: rotate(-10deg);
    }
    90% {
      transform: rotate(10deg);
    }
    95% {
      transform: rotate(-10deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
  @keyframes he {
    100% {
      top: 1.5rem;
      left: 1.5rem;
    }
  }
}
</style>
