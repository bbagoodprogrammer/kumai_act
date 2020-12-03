<template>
  <div id="app">
    <singIn></singIn>
    <msg-toast></msg-toast>
    <loading></loading>
  </div>
</template>

<script>
import singIn from './view/singIn.vue'
import MsgToast from "./components/commonToast"
import Loading from "./components/Loading"
import { globalBus } from './utils/eventBus'
import { mapState } from 'vuex'
import APP from './utils/openApp'
export default {
  name: 'App',
  components: { singIn, MsgToast, Loading },
  computed: {
    ...mapState(['actStatus', 'isShare'])
  },
  data() {
    return {
      tastMsg: '',
      showT: false
      // imgArr:[
      //   require(''),
      //   require('')
      // ]
    }
  },
  created() {
    globalBus.$on('commonEvent', (callback) => {
      if (this.isShare) {
        APP()
        return
      } else if (this.actStatus === 0) {
        this.vxc('setToast', {
          msg: this.lang.noAct
        })
      } else if (this.actStatus === 2) {
        this.vxc('setToast', {
          msg: this.lang.actEd
        })
      } else {
        callback()
      }
    })
  },
  mounted() {
    // for(var i=0;i<this.imgArr.length;i++){
    //   var Img = new Image()
    //   Img.src = this.imgArr[i]
    // }
  },
  methods: {
    closeToast() {
      this.showT = false
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #350096;
}
#app {
  max-width: 750px;
  overflow-x: hidden;
  margin: auto;
  direction: rtl;
}
@import "./assets/scss/common.scss";
</style>

