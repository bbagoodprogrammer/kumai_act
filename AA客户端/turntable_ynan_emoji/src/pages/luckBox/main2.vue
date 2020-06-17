<template>
  <div id="box">
    <LuckBoxList :type="2" />
  </div>
</template>

<script>
import LuckBoxList from "../../components/LuckBoxList"
export default {
  components: { LuckBoxList },
  data() {
    return {
    }
  },
  created() {
    document.title = 'Vòng quay - Rương quà'
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
  .luckBoxList {
    > .list {
      max-height: 11.8rem !important;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch; //有回弹效果
      -webkit-overflow-scrolling: auto; //滑到哪停到哪
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
