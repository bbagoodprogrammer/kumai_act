<template>
  <div id="app">
    <luck-wednesday></luck-wednesday>
  </div>
</template>

<script>
import LuckWednesday from './view/LuckWednesday.vue'
export default {
  name: 'App',
  components: {
    LuckWednesday
  },
  data() {
    return {
      imgArr: [
        require('./assets/img/K房点击.png'),
        require('./assets/img/K房未点击.png'),
        require('./assets/img/作品点击.png'),
        require('./assets/img/作品未点击.png')
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
@import "./assets/scss/common.scss";
</style>

