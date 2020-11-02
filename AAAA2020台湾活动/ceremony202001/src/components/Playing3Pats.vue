<template>
  <div class="pats">
    <div class="petItem" v-for="(item,index) in pets" :key="index">
      <!-- <span class="lock" v-if="item.nums == 0"></span> -->
      <!-- <img :src="item.img" alt="" class="pet"> -->
      <img :src="require(`../assets/img/pets/${index}.png`)" alt="" class="pet">
      <strong class="name">{{item.name}}</strong>
      <strong class="num">x {{item.nums}}</strong>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
export default {
  props: ['pets'],
  data() {
    return {
    }
  },
}
</script>
<style lang="scss" scoped>
.pats {
  width: 6.59rem;
  height: 5.63rem;
  padding: 0.6rem 0.34rem 0;
  background: url(../assets/img/petsBg.png);
  background-size: 100% 100%;
  margin: 0.49rem auto 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .petItem {
    width: 2rem;
    height: 2rem;
    background: url(../assets/img/ward.png);
    background-size: 100% 100%;
    position: relative;
    &.kroom {
      background: url(../assets/img/kRoom.png);
      background-size: 100% 100%;
    }
    .lock {
      width: 2rem;
      height: 2rem;
      // background: url(../assets/img/pets/lock.png);
      // background-size: 100% 100%;
      position: absolute;
      z-index: 11;
    }
    .type {
      display: block;
      width: 0.7rem;
      height: 0.4rem;
      text-align: center;
      line-height: 0.4rem;
      font-size: 0.24rem;
      // background: url(../assets/img/pets/petTypeBg.png);
      // background-size: 100% 100%;
      position: absolute;
      z-index: 1000;
    }
    .pet {
      position: absolute;
      width: 2rem;
      height: 2rem;
    }
    .name {
      display: block;
      width: 2rem;
      height: 0.4rem;
      position: absolute;
      bottom: -0.5rem;
      text-align: center;
      font-size: 0.24rem;
    }
    .num {
      display: block;
      width: 2rem;
      height: 0.44rem;
      background: rgba(29, 12, 46, 0.4);
      border-radius: 0 0 0.2rem 0.2rem;
      position: absolute;
      bottom: 0;
      text-align: center;
      line-height: 0.44rem;
    }
  }
  .petTips {
    font-size: 0.24rem;
    color: rgba(222, 255, 192, 1);
  }
}
</style>
