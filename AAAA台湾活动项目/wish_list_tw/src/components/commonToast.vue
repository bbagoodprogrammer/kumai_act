<template>
  <div class="toastBox">
    <div class="promptBox">
      <div class="close"  @click="close()"></div>
      <div class="title">{{tostTitle && tostTitle!='' ? tostTitle:'溫馨提示'}}</div>
      <p v-html="msg"></p>
      <div class="ok">
        <a href="javascript:;" @click="close()"></a>
      </div>
    </div>

  </div>

</template>

<script>
import getString from "../utils/getString"
export default {
  props: ["msg","tostTitle","back"],
  data() {
    return {
    }
  },
  methods: {
    close() {
      this.$emit('closeToast')
      if(this.back){
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
  background: rgba(0, 0, 0, 0.8);
  z-index: 10000;
}
.promptBox {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  width: 6.92rem;
  height: 4.27rem;
  background: url(../assets/img/pup2Bg.png);
  background-size: 100% 100%;
  .close{
    display: block;
    width: .51rem;
    height: .51rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: .45rem;
    top:.45rem;
  }
  .title{
    margin-top: 1rem;
    text-align: center;
    font-weight: 600;
    font-size: 120%;
  }
  p {
    font-size: .28rem;
    color: #FFFDBD;
    padding: 10px 30px 5px;
    text-align: center;
    margin-top: .22rem;
    height: .8rem;
    font-weight: 500;
  }
  .ok {
    white-space: nowrap;
    text-align: center;
    a {
      display: inline-block;
      width: 2.52rem;
      height: .79rem;
      background: url(../assets/img/quers.png);
      background-size: 100% 100%;
    }
  }
}
</style>
