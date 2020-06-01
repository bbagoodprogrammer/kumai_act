<template>
  <div id="box">
    <GiftBoxList :type="2" />
  </div>
</template>

<script>
import GiftBoxList from "../../components/GiftBoxList"
export default {
  components: { GiftBoxList },
  data() {
    return {
    }
  },
  created() {
    document.title = '幸運轉盤 - 禮盒'
    sessionStorage.setItem("need-refresh", true);
  },
  methods: {
    getDefaultData() {
    },
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
  .giftBoxList {
    > .list {
      height: 12.6rem !important;
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
