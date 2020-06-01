<template>
  <div class="emojiGiftBox">
    <div class="herder">
      <i class="back" @click="closeGiftBox"></i> 表情包<i class="close" @click="closeGiftBox"></i>
    </div>
    <EmojiList />
  </div>
</template>
<script>
import EmojiList from "./EmojiList"
export default {
  components: { EmojiList },
  methods: {
    closeGiftBox() {
      this.$emit('closeGiftBox')
    }
  }
}
</script>
<style lang="scss">
.emojiGiftBox {
  max-width: 750px;
  height: 9.74rem;
  // overflow-x: hidden;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background: url(../assets/img/bigBox.png) center 0 no-repeat;
  background-size: 100% 100%;
  .herder {
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    font-size: 0.36rem;
    font-weight: 600;
    position: relative;
    border-bottom: 0.01rem solid #837cff;
    .back {
      display: block;
      width: 0.18rem;
      height: 0.3rem;
      background: url(../assets/img/backArrow.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.35rem;
      left: 0.34rem;
    }
    .close {
      display: block;
      width: 0.37rem;
      height: 0.37rem;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.35rem;
      right: 0.34rem;
    }
  }
}
</style>
