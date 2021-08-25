<template>
  <div class="giftList">
    <div class="liner">
      <div class="giftItem" :class="'gift' + index" v-for="(item,index) in rare_prizes" :key="index">
        <i class="tips">稀有</i>
        <i class="lock" v-if="item.num <= 0"></i>
        <div class="imgBox">
          <div class="bollImg" :class="[{lockImg:item.num <= 0},'ball' + index]"></div>
          <div class="linght" v-if="item.num > 0"></div>
        </div>
        <strong class="name">{{item.name}}</strong>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  computed: {
    ...mapState(['rare_prizes'])
  }
}
</script>

<style lang="scss">
.giftList {
  width: 3.88rem;
  height: 0.23rem;
  background: url(../img/giftLiner.png);
  background-size: 100% 100%;
  position: absolute;
  top: 4.17rem;
  left: 1.96rem;
  .giftItem {
    width: 1.21rem;
    position: absolute;
    top: -0.54rem;
    .tips {
      width: 0.68rem;
      height: 0.29rem;
      background: url(../img/tipsBg.png);
      background-size: 100% 100%;
      position: absolute;
      left: 0.1rem;
      font-size: 0.24rem;
      text-align: center;
      line-height: 0.29rem;
      z-index: 10;
    }
    .lock {
      width: 0.35rem;
      height: 0.42rem;
      background: url(../img/lock.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.39rem;
      left: 0.44rem;
      z-index: 5;
    }
    .imgBox {
      width: 1.21rem;
      height: 1.21rem;
      background: url(../img/giftImgBg.png);
      background-size: 100% 100%;
      .bollImg {
        position: absolute;
        left: 0.02rem;
        top: 0.02rem;
        width: 1.17rem;
        height: 1.17rem;
        &.lockImg {
          opacity: 0.48;
        }
      }
      .linght {
        position: absolute;
        left: -0.195rem;
        top: -0.195rem;
        width: 1.6rem;
        height: 1.6rem;
        background: url(../img/linght.png);
        background-size: 100% 100%;
      }
    }
    .name {
      width: 1.5rem;
      margin-left: -0.15rem;
      text-align: center;
      margin-top: 0.04rem;
      font-size: 0.24rem;
      color: #FADCFA;
      display: block;
      white-space: nowrap;
    }
    &.gift0 {
      left: -0.55rem;
    }
    &.gift1 {
      left: 1.18rem;
    }
    &.gift2 {
      right: -0.32rem;
    }
  }
}
</style>