<template>
  <div class="toastBox">
    <div class="promptBox">
      <div class="close" @click="close()"></div>
      <div class="title">{{tastTitle && tastTitle !='' ? tastTitle:'溫馨提示'}}</div>
      <p v-html="msg"></p>
      <!-- <div class="ok">
        <a href="javascript:;" @click="close()"></a>
      </div> -->
    </div>

  </div>

</template>

<script>
import getString from "../utils/getString"
export default {
  props: ["msg", "tastTitle", "back"],
  data() {
    return {
    }
  },
  methods: {
    close() {
      this.$emit('closeToast')
      if (this.back) {
        history.go(-1)
      }
    }
  }
}
</script>

<style lang="scss">
.toastBox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  // background: rgba(0, 0, 0, 0.8);
  z-index: 10000;
}
.promptBox {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 5.68rem;
  height: 2.81rem;
  border: 0.02rem solid rgba(0, 0, 145, 1);
  background: linear-gradient(
    0deg,
    rgba(238, 168, 18, 1) 0%,
    rgba(253, 223, 29, 1) 100%
  );
  border-radius: 0.4rem;
  .close {
    display: block;
    width: 0.36rem;
    height: 0.36rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0.31rem;
    top: 0.13rem;
  }
  .title {
    margin-top: 0.59rem;
    text-align: center;
    font-weight: bold;
    font-size: 0.34rem;
    color: #750937;
  }
  p {
    font-size: 0.28rem;
    color: #9b3022;
    padding: 10px 30px 5px;
    text-align: center;
    margin-top: 0.22rem;
    height: 0.8rem;
    font-weight: 500;
  }
  .ok {
    white-space: nowrap;
    text-align: center;
    a {
      display: inline-block;
      width: 2.52rem;
      height: 0.79rem;
      // background: url(../assets/img/quers.png);
      // background-size: 100% 100%;
    }
  }
}
</style>
