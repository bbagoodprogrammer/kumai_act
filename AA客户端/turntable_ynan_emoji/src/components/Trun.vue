<template>
  <div class="trun">
    <div class="trunCon" :class="{buld:showBuld}">
      <div class="roate" :style="{transform:'rotate('+nowAngle+'deg)' }">
        <span v-for="(item,index) in gift_list" :key="index" :class="'ward'+index">
          <em>{{item.name}}</em>
          <img :src="item.picture" alt="">
        </span>
      </div>
      <div class="jian" :class="{black:lucking}" @click="go()">
        <!-- 禮物動畫組件 -->
        <!-- <img :src="lateImg" alt="" :class="{giftLate:showGiftLate}"> -->
      </div>
    </div>
    <p class="tips">
      Tặng thêm quà phòng Kara giá {{userMsg.diff_ktvgift}} xu nhận 1 vé rút thưởng
      <em>(tính từ 20h ngày 28/4)</em>
    </p>
    <Tabs />
    <div class="mask" :style="{height:mainHeight+'px'}" v-show="showGiftPup">
      <transition name="slide">
        <div class="giftPupCon" v-show="showGiftPup">
          <i class="close" @click="closePup()"></i>
          <p>Chúc mừng nhận</p>
          <div class="imgBox">
            <img :src="lateImg" alt="">
            <em>{{giftPupName}}</em>
          </div>
          <p v-if="showVerTips && !Version" class="verTips">Phần thưởng này phải cập nhật bản mới nhất để dùng</p>
          <div class="querBtn" @click="closePup()">Xác nhận</div>
        </div>
      </transition>
    </div>
    <div class="mask" :style="{height:mainHeight+'px'}" v-show="showT">
      <transition name="slide">
        <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
      </transition>
    </div>
  </div>
</template>
<script> 
import { mapState } from "vuex"
import MsgToast from "../components/commonToast"
import api from "../api/apiConfig"
import Tabs from "./Tabs"
export default {
  components: { MsgToast, Tabs },
  data() {
    return {
      showGiftPup: false,
      showBuld: false,
      nowAngle: 0,
      giftAngle: {
        1: 0,
        2: 300,
        3: 240,
        4: 180,
        5: 120,
        6: 60,
      },
      giftIndex: 1,
      tastMsg: ``,
      showT: false,
      // showGiftLate: false,
      lateImg: '',
      giftPupName: '',
      lucking: false,
      luckGift: {}
    }
  },
  computed: {
    ...mapState(["gift_list", "userMsg", "mainHeight", "Version"]),
    showVerTips() {
      if (this.luckGift.gift_type == 9 || this.luckGift.gift_type == 10 || this.luckGift.gift_type == 13 || this.luckGift.gift_type == 14) {
        return true
      }
    }
  },
  mounted() {
    setInterval(() => {
      this.showBuld = !this.showBuld
    }, 500);
  },
  methods: {
    go() {
      if (this.lucking) return  //动画未结束
      if (this.userMsg.ticket > 0) {
        this.lucking = true
        api.luckDraw(0).then(res => {
          this.$store.commit('reduceTicket')
          this.luckGift = res.data.response_data.gift_info
          let gIndex = res.data.response_data.gift_info.gift_id  //礼物ID索引
          for (let i = 0; i < this.gift_list.length; i++) {
            if (this.gift_list[i].gift_id == gIndex) {
              this.giftIndex = i + 1
            }
          }
          let giftType = res.data.response_data.gift_info.gift_type   //礼物类型
          let giftNum = res.data.response_data.gift_info.num
          this.turnAngle()
          setTimeout(() => {
            this.lateImg = this.gift_list[this.giftIndex - 1].picture
            this.giftPupName = this.gift_list[this.giftIndex - 1].name
            this.showGiftPup = true
            // this.showGiftLate = true
            // setTimeout(() => {
            // this.showGiftLate = false
            this.lucking = false
            let addType = {}
            if (giftType == 6) {  //抽奖券
              addType.type = 1
            } else if (giftType == 7) {  //箱子
              addType.type = 2
            } else if (giftType == 8) {  //钥匙
              addType.type = 3
            } else if (giftType == 9) {  //禮物碎片
              addType.type = 4
            } else if (giftType == 10) {  //表情包碎片
              addType.type = 5
            }
            addType.num = giftNum * 1
            if (addType.type) {
              this.$store.commit('addGift', addType)
            }
            // }, 1000)
          }, 5000);
        })
      } else {
        this.tastMsg = `Bạn không đủ vé quay thưởng, mau đi kiếm vé nào!`
        this.showT = true
      }
    },
    turnAngle() {
      if (this.nowAngle % 360 > this.giftAngle[this.giftIndex]) { //目标礼物在前面
        this.nowAngle += 1800 + (this.giftAngle[this.giftIndex] - this.nowAngle % 360)
      } else if (this.nowAngle % 360 < this.giftAngle[this.giftIndex]) {
        this.nowAngle += 1800 + (360 - (this.nowAngle % 360)) + this.giftAngle[this.giftIndex]
      } else if (this.nowAngle % 360 == this.giftAngle[this.giftIndex]) {
        this.nowAngle += 1800
      }
    },
    closeToast() {
      this.showT = false
    },
    closePup() {
      this.showGiftPup = false
    }
  }
}
</script>
<style lang="scss" scoped>
.trunCon {
  width: 5.76rem;
  height: 5.63rem;
  margin: 0.12rem auto 0;
  background: url(../assets/img/trunBg1.png);
  background-size: 100% 100%;
  position: relative;
  &.buld {
    background: url(../assets/img/trunBg2.png);
    background-size: 100% 100%;
  }
  .roate {
    width: 4.61rem;
    height: 4.61rem;
    background: url(../assets/img/trunBg3.png);
    background-size: 100% 100%;
    position: absolute;
    top: 0.51rem;
    left: 0.61rem;
    transition: transform 5s ease;
    span {
      display: block;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 0.99rem;
      img {
        width: 0.99rem;
        height: 0.99rem;
      }
      em {
        display: block;
        width: auto;
        height: 0.3rem;
        font-size: 80%;
        color: #ff6d39;
        text-align: center;
        white-space: nowrap;
      }
      &.ward0 {
        position: absolute;
        top: 0.2rem;
        left: 1.8rem;
        // transform: rotate(180deg);
        z-index: 10;
      }
      &.ward1 {
        position: absolute;
        top: 0.95rem;
        left: 3.05rem;
        transform: rotate(60deg);
        z-index: 10;
      }
      &.ward2 {
        position: absolute;
        top: 2.35rem;
        left: 3.05rem;
        transform: rotate(120deg);
        z-index: 10;
      }
      &.ward3 {
        position: absolute;
        top: 3.12rem;
        left: 1.8rem;
        transform: rotate(-180deg);
        z-index: 10;
      }
      &.ward4 {
        position: absolute;
        top: 2.35rem;
        left: 0.6rem;
        transform: rotate(-120deg);
        z-index: 10;
      }
      &.ward5 {
        position: absolute;
        top: 0.95rem;
        left: 0.6rem;
        transform: rotate(-60deg);
        z-index: 10;
      }
    }
  }
  .jian {
    width: 2.38rem;
    height: 2.38rem;
    background: url(../assets/img/trunBgCon.png);
    background-size: 100% 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    &.black {
      background: url(../assets/img/trunBgConBlack.png);
      background-size: 100% 100%;
    }
    img {
      width: 0.99rem;
      height: 0.99rem;
      position: absolute;
      top: 0.73rem;
      left: 0.73rem;
      opacity: 0;
      &.giftLate {
        animation: giftLate 1s linear;
      }
    }
  }
}
.tips {
  text-align: center;
  font-size: 83%;
  margin-top: -0.1rem;
  em {
    display: block;
    margin-top: -0.04rem;
    font-size: 0.2rem;
    opacity: 0.5;
  }
}
.giftPupCon {
  width: 4rem;
  min-height: 4.18rem;
  padding-bottom: 0.2rem;
  background: rgba(124, 65, 241, 1);
  border-radius: 0.16rem;
  position: relative;
  // position: absolute;
  // top: 2.26rem;
  // left: 1.74rem;
  .verTips {
    font-size: 0.26rem;
    padding: 0 0.15rem;
  }
  .close {
    display: block;
    width: 0.37rem;
    height: 0.37rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;
  }
  p {
    text-align: center;
    margin-top: 0.24rem;
    font-size: 0.32rem;
  }
  .imgBox {
    width: 2.59rem;
    height: 2.47rem;
    background: url(../assets/img/giftPupBg.png);
    background-size: 100% 100%;
    margin: -0.05rem 0.72rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 1.6rem;
      height: 1.6rem;
      margin-top: 0.4rem;
    }
    em {
      text-align: center;
      font-size: 0.32rem;
      line-height: 0.3rem;
    }
  }
  .querBtn {
    width: 2.4rem;
    height: 0.72rem;
    background: rgba(254, 241, 41, 1);
    border-radius: 0.36rem;
    text-align: center;
    line-height: 0.72rem;
    color: #7c41f1;
    font-size: 103%;
    margin: 0.26rem auto 0;
  }
}
@keyframes giftLate {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  10% {
    transform: scale(1.5);
  }
  20% {
    transform: scale(2);
    opacity: 1;
    top: 0.65rem;
    left: 0.65rem;
  }
  50% {
    transform: scale(2);
    opacity: 1;
    top: 0.65rem;
    left: 0.65rem;
  }
  100% {
    top: 4rem;
    left: 3.7rem;
  }
}
</style>
