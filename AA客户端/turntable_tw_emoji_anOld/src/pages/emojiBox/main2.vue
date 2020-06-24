<template>
  <div id="box">
    <EmojiList :type="2" />
    <Loading />
  </div>
</template>

<script>
import EmojiList from "../../components/EmojiList"
import Loading from "../../components/Loading"
export default {
  components: { EmojiList, Loading },
  data() {
    return {
    }
  },
  created() {
    document.title = '幸運轉盤 - 表情包'
    sessionStorage.setItem("need-refresh", true);
  },
  methods: {
  }
}
</script>

<style lang="scss">
body {
  width: 100%;
  height: 100%;
}
#box {
  max-width: 750px;
  width: 100%;
  height: 100%;
  position: absolute;
  overflow-x: hidden;
  background: url(../../assets/img/wholeBg.png) center 0 no-repeat;
  background-size: 100% 100%;
  .emojiList {
    > .list {
      height: 6.83rem !important;
      background: url(../../assets/img/emojiBgMax.png);
      background-size: 100% 100%;
      .emojiItem {
        height: 6.6rem !important;
        max-height: 6.6rem !important;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        -webkit-overflow-scrolling: auto;
      }
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
