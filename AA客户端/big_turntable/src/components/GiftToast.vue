<template>
  <div class="giftToast">
    <div class="giftCon" :class="{tenTop:giftArr.length>1}">
      <span class="close" @click="closeToastPup()"></span>
      <div class="flower">
      </div>
      <h5 class="toasTitle">مبروك للحصول</h5>
      <div class="giftItem" :class="{ten:giftArr.length>1}">
        <span v-for="(item,index) in giftArr" :key="index">
          <img :src="getWardImg(item.gift_id)" alt="">
        </span>
      </div>
      <span class="ok" @click="closeToastPup()">عرفت</span>
    </div>
  </div>
</template>
<script>
import { oneWardImg, tenWardImg } from "../config/wardImg"
export default {
  props: ['giftArr'],
  methods: {
    getWardImg(id) {
      if (this.giftArr.length > 1) {
        return tenWardImg[id]
      } else {
        return oneWardImg[id]
      }
    },
    closeToastPup() {
      this.$emit('closeToast')
    }
  },
}
</script>
<style lang= "scss" scoped>
.giftToast {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10000;
  .giftCon {
    width: 5.15rem;
    /* min-height: 3.4rem; */
    padding-bottom: 0.15rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.26rem;
    position: absolute;
    top: 2.38rem;
    left: 50%;
    transform: translate(-50%, 0);
    &.tenTop {
      top: 1.54rem;
    }
    .close {
      display: block;
      width: 0.41rem;
      height: 0.41rem;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0.11rem;
      top: 0.11rem;
      z-index: 10;
    }
    .flower {
      width: 5.21rem;
      height: 1.84rem;
      background: url(../assets/img/giftToastBg.png);
      background-size: 100% 100%;
      position: absolute;
      top: -0.5rem;
    }
    .toasTitle {
      font-size: 120%;
      color: #4d4d4d;
      text-align: center;
      position: relative;
      top: 0.35rem;
    }
    .giftItem {
      width: 4.4rem;
      margin: 0.6rem auto 0;
      text-align: center;
      position: relative;
      span {
        display: inline-block;
        width: 1.47rem;
        height: 1.47rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &.ten {
        text-align: left;
        span {
          width: 1.1rem;
          height: 1.1rem;
        }
      }
    }
    .ok {
      display: block;
      width: 1.76rem;
      height: 0.72rem;
      margin: 0.2rem auto 0;
      background: url(../assets/img/okBg.png);
      background-size: 100% 100%;
      font-size: 108%;
      text-align: center;
      line-height: 0.72rem;
    }
  }
}
</style>
