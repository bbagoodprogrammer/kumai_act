<template>
  <div class="giftBox">
    <div class="userLv">
      <div class="lv">我的等級 <strong>Lv.{{packets.level}}</strong></div>
      <!-- <i class="quest" @click="showTipsPup = true"></i> -->
      <div class="score">星光值 <strong>{{packets.score}}</strong> </div>
    </div>
    <div class="liner">
      <div class="actLiner" :style="{width:actWidth}"></div>
      <div class="boxItem" v-for="(item,index) in packets.levels " :key="index" :class="'box'+ index">
        <span class="item " :class="{black:!packets.status[index] && packets.score < item,ani:!packets.status[index] && packets.score >= item}" @click="showGiftPup(index)"></span>
        <div class="lv">Lv.{{index}}</div>
        <div class="score" :class="{act:packets.status[index] || packets.score >= item}">{{item}}</div>
        <i class="ligt" v-if="!packets.status[index] && packets.score >= item"></i>
      </div>
    </div>
    <div class="mask">
      <transition name="slide">
        <div class="luckPup">
          <slot-machine-test ref="luck"></slot-machine-test>
          <div class="luckGo" @click="goLuck()"></div>
        </div>

      </transition>
    </div>
    <!-- 寶箱禮物展示 -->
    <!-- <div class="mask" v-show="showBoxGift">
      <transition name="slide">
        <div class="boxGifts" v-if="showBoxGift">
          <i class="close" @click="showBoxGift = !showBoxGift"></i>
          <h3>助攻值達到 <em>{{packets.levels[showBoxIndex]}}</em> 可領取</h3>
          <strong class="needLv">(即升級到Lv.{{showBoxIndex}}等級)</strong>
          <div class="giftList">
            <div class="giftItem" v-for="(item,index) in showBoxItem" :key="index">
              <div class="imgBox">
                <img :src="item.image" alt="" v-if="item.image">
                <img :src="require(`../assets/img/box/${item.type}.png`)" alt="" v-else>
              </div>
              <strong class="gName">{{getGiftName(item)}}</strong>
            </div>
          </div>
          <div class="getStatus" :class="{act:isOpen}" @click="getGift()">{{packets.status[showBoxIndex]?'已領取':'領取'}}</div>
        </div>
      </transition>
    </div> -->

    <!-- 弹窗提示 -->
    <!-- <div class="mask" v-show="showTipsPup">
      <transition name="slide">
        <div class="boxGifts tipsPup" v-if="showTipsPup">
          <i class="close" @click="showTipsPup = !showTipsPup"></i>
          <h3>閃耀值獲取攻略</h3>
          <p class="yel">閃耀值=參賽作品收到點讚數X10+參賽作品收到金幣禮物魅力值</p>
          <p><span class="yel">點讚數：</span>僅限前30個讚計入成績</p>
          <p><span class="yel">特定禮物加成：</span>參賽作品以下收到4個特定禮物，支持你（10金幣）、玫瑰花束（188金幣）、彩虹獨角獸（399金幣），作品高級福運禮盒中的啤酒乾杯（110金幣），參賽作品魅力值增幅5%</p>
          <p><span class="yel">特定時間加成：</span>活動期間21:00-21:10參賽作品收金幣禮物，魅力值額外加成10%</p>
          <span class="ok" @click="showTipsPup = !showTipsPup">我知道啦</span>
        </div>
      </transition>
    </div> -->
  </div>
</template>
<script>

import { mapState } from "vuex"
import api from "../api/apiConfig"
import { globalBus } from '../utils/eventBus'
import SlotMachineTest from "../components/SlotMachine/SlotMachineTest.vue"
export default {
  components: { SlotMachineTest },
  data() {
    return {
      showBoxGift: false,
      showTipsPup: false,
      showBoxIndex: {}
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
    getGift() {
      globalBus.$emit('commonEvent', () => {
        if (this.isOpen) {
          api.openPacket(this.showBoxIndex).then(res => {
            if (res.data.response_status.code == 0) {
              this.showBoxGift = false
              this.vxc('setBoxStatus', this.showBoxIndex)
              this.vxc('setToast', {
                title: '領取成功',
                msg: '對應獎勵已派發到您的賬戶上,<br/>請注意查收'
              })
            } else {
              this.toast(res.data.response_status.error)
            }
          })
        } else if (!this.packets.status[this.showBoxIndex]) {
          this.vxc('setToast', {
            title: '無法領取',
            msg: `等級達到Lv.${this.showBoxIndex}(閃耀值達到${this.packets.levels[this.showBoxIndex]})<br/>才可領取喔`
          })
        }
      })
    },
    getGiftName(item) {
      if (item.type == 'gift') {
        return 'N禮物(C金幣) *S'.replace('N', item.name).replace('C', item.coin).replace('S', item.count)
      } else if (item.type == 'coupon') {
        return `${item.ratio}%儲值返利券`
      } else if (item.type == 'vip') {
        return `${item.day}天vip`
      } else if (item.type == 'bean') {
        return `${item.count}金豆`
      } else if (item.type == 'coin') {
        return `${item.count}金幣`
      }
    }
  }
}
</script>
<style lang="scss">
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
        top: -0.1rem;
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
  background: url(../assets/img/luck_img/bg.png);
  background-size: 100% 100%;
  .luckGo {
    width: 4rem;
    height: 1rem;
    background: url(../assets/img/luck_img/go.png);
    background-size: 100% 100%;
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
</style>
