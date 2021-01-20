<template>
  <div class="giftBox">
    <div class="userLv">
      <div class="lv">我的等級 <strong>Lv.{{level}}</strong></div>
      <!-- <i class="quest" @click="showTipsPup = true"></i> -->
      <div class="score">星光值 <strong>{{score}}</strong> </div>
    </div>
    <div class="liner">
      <div class="actLiner" :style="{width:actWidth}"></div>
      <div class="boxItem" v-for="(item,index) in packets" :key="index" :class="'box'+ item.level">
        <span class="item " @click="boxClick(item,index)"></span>
        <div class="lv">Lv.{{item.level}}</div>
        <div class="score">{{item.limit}}</div>
        <i class="ligt" v-if="item.can || item.get" :class="{rotate:!item.get && item.can}"></i>
      </div>
    </div>
    <div class="mask" v-show="shouLuckPup">
      <transition name="slide">
        <div class="luckPup" v-if="shouLuckPup">
          <i class="close" @click="shouLuckPup = false"></i>
          <p class="lvTips">星光值達到{{cilckItem.limit}}可抽獎 <em>(即升級到Lv.{{cilckItem.level}}等級)</em></p>
          <slot-machine-test ref="luck" :cilckItem="cilckItem" @setPacketStatus="setPacketStatus"></slot-machine-test>
          <div class="luckGo" :class="{can:cilckItem.can,ed:cilckItem.get}" @click="goLuck()"></div>
        </div>
      </transition>
    </div>
    <!-- 不能開 -->
    <div class="mask" v-show="showNotSingup">
      <transition name="slide">
        <div class="suc_not" v-if="showNotSingup">
          <i class="close" @click="showNotSingup = false"></i>
          <div class="title"></div>
          <p>
            需升級到Lv.{{cilckItem.level}}，
            即星光值達到{{cilckItem.limit}}才可抽獎哦！
          </p>
          <div class="okBtn" @click="showNotSingup = false">
            我知道啦
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>

import { mapState } from "vuex"
import api from "../api/apiConfig"
import { globalBus } from '../utils/eventBus'
import SlotMachineTest from "../components/SlotMachine/SlotMachineTest.vue"
export default {
  components: { SlotMachineTest },
  props: ["score", "level"],
  data() {
    return {
      showBoxGift: false,
      showTipsPup: false,
      showBoxIndex: {},
      shouLuckPup: false,
      cilckItem: {},
      cilckIndex: null,
      showNotSingup: false
    }
  },
  computed: {
    ...mapState(['packets']),
    actWidth() {
      let arr = []
      for (let i in this.packets.levels) {
        arr.push(this.packets.levels[i])
      }
      for (let i = arr.length - 1; i >= 0; i--) {
        if (this.packets.score >= arr[arr.length - 1]) {
          return '100%'
        } else if (this.packets.score >= arr[i]) {
          let c = arr[i + 1] - arr[i]
          let t = this.packets.score - arr[i]
          let a = (t / c) * 100 / 5
          return (25 * i + a) + '%'
        } else if (this.packets.score < arr[0].score) {
          // return this.packets.score / arr[0] / 5 * 100 - 3.5 + '%'
          return '0%'
        }
      }
    },
    showBoxItem() {
      return this.packets.prizes[this.showBoxIndex]
    },
    isOpen() {
      return !this.packets.status[this.showBoxIndex] && this.packets.score >= this.packets.levels[this.showBoxIndex]
    }
  },
  methods: {
    showGiftPup(index) {
      this.showBoxGift = true
      this.showBoxIndex = index
    },
    goLuck() {
      this.$refs.luck.startGame()
    },
    boxClick(item, index) {
      this.cilckItem = item
      this.shouLuckPup = true
    },
    setPacketStatus() {
      console.log(this.cilckItem)
      this.cilckItem.get = true
      this.cilckItem.can = false
      this.vxc('setPacketStatus', this.cilckItem.level - 1)
    }
  }
}
</script>
<style lang="scss" scoped>
.giftBox {
  width: 7.22rem;
  height: 3.43rem;
  background: url(../assets/img/box/boxBg.png);
  background-size: 100% 100%;
  margin: 0.25rem auto 0;
  position: relative;
  .userLv {
    height: 0.88rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.47rem;
    font-size: 0.24rem;
    > div {
      display: flex;
      align-items: center;
      strong {
        font-size: 0.3rem;
        color: rgba(252, 245, 193, 1);
        font-weight: 600;
        margin: 0 0.15rem;
      }
      .quest {
        width: 0.36rem;
        height: 0.36rem;
        background: url(../assets/img/box/quest.png);
        background-size: 100% 100%;
      }
    }
  }
  .liner {
    width: 5.61rem;
    height: 0.08rem;
    background: RGBA(196, 154, 254, 1);
    position: relative;
    margin: 1.2rem auto 0;
    .actLiner {
      max-width: 100%;
      height: 0.08rem;
      background: RGBA(255, 226, 175, 1);
      position: absolute;
      left: 0;
      top: 0;
      z-index: 10;
      border-radius: 0.05rem;
    }
    .boxItem {
      width: 1.09rem;
      height: 0.85rem;
      position: absolute;
      z-index: 20;
      top: -0.4rem;
      .ani {
        animation: heartbeat 2.5s linear infinite;
      }
      .item {
        display: block;
        width: 100%;
        height: 100%;
      }
      .lv {
        width: 100%;
        position: absolute;
        top: -0.3rem;
        text-align: center;
        font-size: 0.24rem;
      }
      .score {
        width: 100%;
        text-align: center;
        font-size: 0.24rem;
        margin-top: 0.15rem;
        // &.act {
        //   color: rgba(252, 245, 193, 1);
        // }
      }
      &.box1 {
        left: -0.55rem;
        .item {
          background: url(../assets/img/box/01.png);
          background-size: auto 100%;
        }
      }
      &.box2 {
        left: 0.85rem;
        .item {
          background: url(../assets/img/box/02.png);
          background-size: auto 100%;
        }
      }
      &.box3 {
        left: 2.23rem;
        .item {
          background: url(../assets/img/box/03.png);
          background-size: auto 100%;
        }
      }
      &.box4 {
        left: 3.61rem;
        .item {
          background: url(../assets/img/box/04.png);
          background-size: auto 100%;
        }
      }
      &.box5 {
        right: -0.55rem;
        .item {
          background: url(../assets/img/box/05.png);
          background-size: auto 100%;
        }
      }
      .ligt {
        display: block;
        width: 1.26rem;
        height: 1.26rem;
        background: url(../assets/img/box/ligt.png);
        background-size: auto 100%;
        z-index: -1;
        position: absolute;
        left: -0.1rem;
        top: -0.2rem;
        &.rotate {
          animation: rotateLingth 10s linear infinite;
        }
      }
    }
  }
  .boxGifts {
    width: 7.5rem;
    height: 7.8rem;
    padding-top: 1.3rem;
    background: url(../assets/img/box/giftPupBg.png);
    background-size: 100% 100%;
    position: relative;
    h3 {
      width: 6.98rem;
      height: 0.78rem;
      line-height: 0.78rem;
      text-align: center;
      font-size: 0.32rem;
      background: url(../assets/img/box/boxPupTitle.png);
      background-size: 100% 100%;
      margin: 0 auto;
      color: rgba(252, 245, 193, 1);
    }
    .needLv {
      display: block;
      text-align: center;
      font-size: 0.26rem;
      margin-top: 0.34rem;
    }
    .giftList {
      padding: 0 0.3rem;
      height: 3.2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .giftItem {
        width: 1.6rem;
        height: 2rem;
        .imgBox {
          width: 1.6rem;
          height: 1.6rem;
          margin: 0 auto;
          background: url(../assets/img/box/giftItemBg.png);
          background-size: 100% 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            display: block;
            margin: 0 auto;
            width: 100%;
            height: 100%;
          }
        }
        .gName {
          display: block;
          text-align: center;
          font-size: 0.26rem;
          line-height: 0.3rem;
          margin-top: 0.05rem;
          padding: 0 0.1rem;
        }
      }
    }
    .getStatus {
      width: 3.76rem;
      height: 0.86rem;
      line-height: 0.86rem;
      background: url(../assets/img/box/okBtn_b.png);
      background-size: 100% 100%;
      margin: 1rem auto;
      font-size: 0.32rem;
      font-weight: 600;
      text-align: center;
      color: rgba(126, 26, 6, 1);
      &.act {
        color: #2d2d2d;
        background: url(../assets/img/box/okBtn.png);
        background-size: 100% 100%;
      }
    }
    .close {
      display: block;
      width: 0.65rem;
      height: 0.65rem;
      position: absolute;
      top: 0rem;
      right: 0.22rem;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
    }
  }
  .tipsPup {
    height: 8.9rem;
    background: url(../assets/img/box/tipsBg.png);
    background-size: 100% 100%;
    padding-top: 1.5rem;
    p {
      padding: 0 0.45rem;
      font-size: 0.28rem;
      margin-bottom: 0.6rem;
    }
    h3 {
      margin-bottom: 0.5rem;
    }
    .yel {
      color: rgba(252, 245, 193, 1);
    }
    .ok {
      display: block;
      width: 3.76rem;
      height: 0.8rem;
      margin: 0 auto;
      background: url(../assets/img/box/okBtn.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.8rem;
      color: rgba(126, 26, 6, 1);
      font-size: 0.32rem;
    }
  }
}
.luckPup {
  width: 7.5rem;
  height: 11.62rem;
  background: url(../assets/img/luck_img/luck_bg.png);
  background-size: 100% 100%;
  position: relative;
  .close {
    width: 0.47rem;
    height: 0.47rem;
    background: url(../assets/img/close2.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0.35rem;
    top: 1.3rem;
  }
  .lvTips {
    width: 4.7rem;
    height: 0.5rem;
    white-space: nowrap;
    position: absolute;
    top: 3.2rem;
    left: 1.4rem;
    font-size: 0.24rem;
    line-height: 0.5rem;
    text-align: center;
    em {
      font-size: 0.22rem;
    }
  }
  .luckGo {
    width: 4rem;
    height: 1rem;
    background: url(../assets/img/luck_img/go_black.png);
    background-size: 100% 100%;
    position: absolute;
    bottom: 3.2rem;
    left: 1.7rem;
    &.ed {
      background: url(../assets/img/luck_img/luck_ed.png);
      background-size: 100% 100%;
    }
    &.can {
      background: url(../assets/img/luck_img/go.png);
      background-size: 100% 100%;
    }
  }
}
.giftBox::before {
  content: "";
  display: block;
  width: 7.1rem;
  height: 0.02rem;
  background: linear-gradient(
    90deg,
    rgba(252, 245, 193, 0),
    rgba(252, 245, 193, 0.5),
    rgba(252, 245, 193, 0)
  );
  border-radius: 0.01rem;
  position: absolute;
  top: 0.88rem;
  left: 0.06rem;
}
.suc_not {
  width: 7.18rem;
  height: 4.74rem;
  background: url(../assets/img/pup/pup_bg.png);
  background-size: 100% 100%;
  position: relative;
  .close {
    display: block;
    width: 0.3rem;
    height: 0.3rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0.2rem;
    top: 0.2rem;
  }
  .title {
    width: 3.7rem;
    height: 1.26rem;
    background: url(../assets/img/pup/luck_not.png);
    background-size: 100% 100%;
    position: absolute;
    top: -0.6rem;
    left: 1.7rem;
  }
  p {
    text-align: center;
    margin-top: 0.5rem;
    font-size: 0.32rem;
    padding: 0 0.3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .okBtn {
    width: 2.22rem;
    height: 0.65rem;
    background: url(../assets/img/footer/commit.png);
    background-size: 100% 100%;
    margin: 0 auto;
    color: rgba(133, 88, 14, 1);
    text-align: center;
    line-height: 0.65rem;
  }
}
</style>
