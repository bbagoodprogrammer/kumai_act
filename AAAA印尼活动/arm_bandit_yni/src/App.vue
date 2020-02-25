<template>
  <div id="app">
      <arm-bandit></arm-bandit>
  </div>
</template>

<script>
import ArmBandit from './view/ArmBandit.vue'
export default {
  name: 'App',
  components: {
    ArmBandit
  },
  data(){
    return{
      imgArr:[
        require('./assets/img/taostBg.png'),
        require('./assets/img/mintaostBg.png')
      ]
    }
  },
  mounted(){
    for(var i=0;i<this.imgArr.length;i++){
      var Img = new Image()
      Img.src = this.imgArr[i]
    }
  }
}
</script>

<style lang="scss">
    @import './assets/scss/common.scss';
</style>

