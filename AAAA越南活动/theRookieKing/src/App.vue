<template>
  <div id="app">
    <the-rookie-king></the-rookie-king>
  </div>
</template>

<script>
import TheRookieKing from './view/TheRookieKing.vue'
export default {
  name: 'App',
  components: {
    TheRookieKing
  },
  // data(){
  //   return{
  //     imgArr:[
  //       require(''),
  //       require('')
  //     ]
  //   }
  // },
  // mounted(){
  //   for(var i=0;i<this.imgArr.length;i++){
  //     var Img = new Image()
  //     Img.src = this.imgArr[i]
  //   }
  // }
}
</script>

<style lang="scss">
@import "./assets/scss/common.scss";
</style>

