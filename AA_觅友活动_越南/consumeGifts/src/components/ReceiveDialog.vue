<template>
  <div @touchmove.prevent class="receive__dailog">
    <div class="common__screen__container" @click="handleCloseDialog"></div>
    <div class="common__container">
      <img src="../assets/images/close.png" @click="handleCloseDialog" class="receive__dailog_close__img" />
      
      <div v-if="prizes.length == 1">
        <img class="img" :src="prizes[0].image" />
      </div>
      <div class="mul__box" v-if="prizes.length > 1">
        <img class="mul_img" :src="prizes[0].image" />
        <!-- <br /> -->
        <img class="mul_img" :src="prizes[1].image" />
        <!-- <img class="mul_img" :src="prizes[2].image" /> -->
      </div>
      <div class="title">{{lang.dialog_receive_success}}</div>
      <div class="des">{{lang.dialog_receive_success_des}}</div>
      <div class="btn" @click="handleCloseDialog">{{lang.sure}}</div>
    </div>
  </div>
</template>

<script>
import lang from '@/config/lang';

export default {
  name: 'ReceivedDialog',

  computed: {
    lang: () => lang,
  },

  props: {
    visible: {
      type: Boolean,
      required: true
    },
    prizes: {
      type: Array,
      required: true
    }
  },

  methods: {
    handleCloseDialog () {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.receive__dailog {
  width: 100%;
  height: 100%;
  .common__screen__container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.7;
    z-index: 1000;
  }

  .common__container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 1000;
    opacity: 1;
    width:659px;
    height:806px;
    background: url('../assets/images/receive_dialog_bg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .receive__dailog_close__img {
      width: 47px;
      height: 47px;
      position: absolute;
      top: -70px;
      right: 35px;
      z-index: 1000;
    }
    .img {
      width: 350px;
      height: 350px;
      display: block;
      margin: 0 auto;
      margin-top: 80px;
    }
    .mul__box {
      text-align: center;
    }
    .mul_img {
      width: 260px;
      height: 260px;
      margin: 10px;
      margin-top: 120px;
    }
    .mul_img1  {
      display: block;
      margin: 0 auto;
      margin-top: 20px;
    }
    .title {
      font-size: 60px;
      font-weight: 400;
      color: #fff;
      text-align: center;
      margin-top: 30px;
    }
    .des {
      width: 424px;
      margin: 26px auto 36px auto;
      text-align: center;
      font-size: 34px;
      font-weight: 400;
      color: #C4C9FF;
    }
    .btn {
      width: 332px;
      height: 96px;
      text-align: center;
      line-height: 96px;
      font-size: 39px;
      font-weight: 400;
      color: #7D2D15;
      background: url('../assets/images/receive.png');
      background-size:100% 100%;
      background-repeat: no-repeat;
      margin: 0 auto;
    }
  }
}
</style>