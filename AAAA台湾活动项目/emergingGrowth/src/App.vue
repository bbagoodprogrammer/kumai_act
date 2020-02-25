<template>
  <div id="app">
    <emerging-growth></emerging-growth>
  </div>
</template>

<script>
import EmergingGrowth from './view/EmergingGrowth.vue'
export default {
  name: 'App',
  components: {
    EmergingGrowth
  },
  data() {
    return {
      // imgArr:[
      //   require(''),
      //   require('')
      // ]
    }
  },
  mounted() {
    // for(var i=0;i<this.imgArr.length;i++){
    //   var Img = new Image()
    //   Img.src = this.imgArr[i]
    // }
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

