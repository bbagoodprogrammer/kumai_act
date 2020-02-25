<template>
  <div id="app">
    <gulalla></gulalla>
  </div>
</template>

<script>
import Gulalla from './view/Gulalla.vue'
export default {
  name: 'App',
  components: {
    Gulalla
  },
  data() {
    return {
      imgArr: [
        // require("./assets/img/lunbo.png"),
        // require("./assets/img/coverCoumetn.png"),
        // require("./assets/img/muttonBg.png"),
        // require("./assets/img/listBig.png"),
        // require("./assets/img/coinsBg.png"),
        // require("./assets/img/pupbg.png"),
        // require("./assets/img/defaluteTos.png")
      ]
    }
  },
  mounted() {
    // for (let i = 0; i < this.imgArr.length; i++) {
    //   const img = new Image();
    //   img.src = this.imgArr[i];
    // }
  }
}
</script>

<style lang="scss">
@import "./assets/scss/common.scss";
</style>

