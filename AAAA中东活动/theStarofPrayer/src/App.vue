<template>
  <div id="app">
    <the-starof-prayer></the-starof-prayer>
  </div>
</template>

<script>
import TheStarofPrayer from './view/TheStarofPrayer.vue'
export default {
  name: 'App',
  components: {
    TheStarofPrayer
  },
  data() {
    return {
      imgArr: [
        require('./assets/img/pupBg.png'),
        require('./assets/img/lamp.png')
      ]
    }
  },
  mounted() {
    for (var i = 0; i < this.imgArr.length; i++) {
      var Img = new Image()
      Img.src = this.imgArr[i]
    }
  }
}
</script>

<style lang="scss">
#app {
  max-width: 750px;
  margin: auto;
}
@import "./assets/scss/common.scss";
</style>

