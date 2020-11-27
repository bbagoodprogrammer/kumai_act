<template>
  <div class="giftBox">
    <div class="userLv">
      <div class="lv">مستواي: <strong>Lv.{{packets.level}}</strong></div>
      <div class="score">نقاط التألق: <strong>{{packets.score}}</strong> <i class="quest" @click="showTipsPup = true"></i></div>
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
    <!-- 寶箱禮物展示 -->
    <div class="mask" v-show="showBoxGift">
      <transition name="slide">
        <div class="boxGifts" v-if="showBoxGift">
          <i class="close" @click="showBoxGift = !showBoxGift"></i>
          <h3> يمكن الاستلام بعد وصول نقاط التألق إلى <em>{{packets.levels[showBoxIndex]}}</em></h3>
          <strong class="needLv">(يعني ترتقي LV{{showBoxIndex}})</strong>
          <div class="giftList">
            <div class="giftItem" v-for="(item,index) in showBoxItem" :key="index">
              <div class="imgBox">
                <img :src="item.image" alt="" v-if="item.image">
                <img :src="require(`../assets/img/box/${item.type}.png`)" alt="" v-else>
              </div>
              <strong class="gName">{{getGiftName(item)}}</strong>
            </div>
          </div>
          <div class="getStatus" :class="{act:isOpen}" @click="getGift()">{{packets.status[showBoxIndex]?'تم الاستلام':'استلام'}}</div>
        </div>
      </transition>
    </div>

    <!-- 弹窗提示 -->
    <div class="mask" v-show="showTipsPup">
      <transition name="slide">
        <div class="boxGifts tipsPup" v-if="showTipsPup">
          <i class="close" @click="showTipsPup = !showTipsPup"></i>
          <h3>استراتيجية لكسب نقاط التألق</h3>
          <p class="yel">نقاط التألق=عدد الإعجاب للأعمال المشتركة*10+قيمة السحر بعملات للأعمال المشتركة</p>
          <p>عدد الإعجاب: سيتم تضمين أول 30 إعجابًا فقط في النقاط</p>
          <p>الهدايا المحدودة لزيادة النقاط: إذا تتلقى الأعمال المشتركة هدايا تالية: أكون معك(10 عملات) وتاج(399 عملة) ووحيد القرن الملون(1700 عملة)، فستزيد قيمة السحر بنسبة %5</p>
          <p>الوقت المحدودة لزيادة النقاط: إذا تتلقى الأعمال المشتركة هدايا العملات أثناء 21:00-21:10 كل يوم، فستزيد قيمة السحر بنسبة %10</p>
          <span class="ok" @click="showTipsPup = !showTipsPup">عرفت</span>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>

import { mapState } from "vuex"
import api from "../api/apiConfig"
import { globalBus } from '../utils/eventBus'
export default {
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
    getGift() {
      globalBus.$emit('commonEvent', () => {
        if (this.isOpen) {
          api.openPacket(this.showBoxIndex).then(res => {
            if (res.data.response_status.code == 0) {
              this.showBoxGift = false
              this.vxc('setBoxStatus', this.showBoxIndex)
              this.vxc('setToast', {
                title: 'استلام بنجاح',
                msg: 'تصل إليك هذه الجوائز، نفضل بالتحقق'
              })
            } else {
              this.toast(res.data.response_status.error)
            }
          })
        } else if (!this.packets.status[this.showBoxIndex]) {
          this.vxc('setToast', {
            title: 'لا يمكن الاستلام',
            msg: `عندما يصل المستوى إلى ${this.showBoxIndex} (نقاط التألق إلى ${this.packets.levels[this.showBoxIndex]} ، يمكنك الحصول عليه`
          })
        }
      })
    },
    getGiftName(item) {
      if (item.type == 'gift') {
        return 'N هدية (Cعملة) *S'.replace('N', item.name).replace('C', item.coin).replace('S', item.count)
      } else if (item.type == 'coupon') {
        return `تذكرة إعادة %${item.ratio} عملات من الشحن`
      } else if (item.type == 'vip') {
        return `VIP أيام ${item.day}`
      } else if (item.type == 'bean') {
        return `${item.count}فول`
      } else if (item.type == 'coin') {
        return `${item.count}عملة`
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
  margin: 0.5rem auto 0;
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
    height: 0.34rem;
    background: url(../assets/img/boxLiner.png);
    background-size: 100% 100%;
    position: relative;
    margin: 1rem auto 0;
    .actLiner {
      max-width: 100%;
      height: 0.18rem;
      background: url(../assets/img/box/actLiner.png);
      background-size: auto 100%;
      position: absolute;
      left: 0.1rem;
      top: 0.084rem;
      z-index: 10;
      border-radius: 0.05rem;
    }
    .boxItem {
      width: 1.1rem;
      height: 1.1rem;
      position: absolute;
      z-index: 20;
      top: -0.38rem;
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
        &.act {
          color: rgba(252, 245, 193, 1);
        }
      }
      &.box1 {
        left: -0.55rem;
        .item {
          background: url(../assets/img/box/box_1.png);
          background-size: auto 100%;
          &.black {
            background: url(../assets/img/box/box_1_black.png);
            background-size: auto 100%;
          }
        }
      }
      &.box2 {
        left: 0.85rem;
        .item {
          background: url(../assets/img/box/box_2.png);
          background-size: auto 100%;
          &.black {
            background: url(../assets/img/box/box_2_black.png);
            background-size: auto 100%;
          }
        }
      }
      &.box3 {
        left: 2.23rem;
        .item {
          background: url(../assets/img/box/box_3.png);
          background-size: auto 100%;
          &.black {
            background: url(../assets/img/box/box_3_black.png);
            background-size: auto 100%;
          }
        }
      }
      &.box4 {
        left: 3.61rem;
        .item {
          background: url(../assets/img/box/box_4.png);
          background-size: auto 100%;
          &.black {
            background: url(../assets/img/box/box_4_black.png);
            background-size: auto 100%;
          }
        }
      }
      &.box5 {
        right: -0.55rem;
        .item {
          background: url(../assets/img/box/box_5.png);
          background-size: auto 100%;
          &.black {
            background: url(../assets/img/box/box_5_black.png);
            background-size: auto 100%;
          }
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
      width: 4rem;
      height: 0.78rem;
      line-height: 0.3rem;
      text-align: center;
      font-size: 0.28rem;
      background: url(../assets/img/box/boxPupTitle.png);
      background-size: 100% 100%;
      margin: 0 auto;
      color: rgba(252, 245, 193, 1);
      padding: 0 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
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
