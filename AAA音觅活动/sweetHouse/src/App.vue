<template>
  <div id="app">
    <Share />
    <!-- <arm-bandit></arm-bandit> -->
    <msg-toast></msg-toast>
    <loading></loading>
    <SingUpPup />
  </div>
</template>

<script>
import Share from "./components/Share"
import ArmBandit from './view/ArmBandit.vue'
import MsgToast from "./components/commonToast"
import Loading from "./components/Loading"
import { globalBus } from './utils/eventBus'
import { mapState } from 'vuex'
import APP from './utils/openApp'
import SingUpPup from "./components/SingUpPup"
export default {
  name: 'App',
  components: { ArmBandit, MsgToast, Loading, SingUpPup, Share },
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
  background-color: rgba(93, 197, 230, 1);
}
#app {
  max-width: 750px;
  overflow-x: hidden;
  margin: auto;
}
@import "./assets/scss/common.scss";
</style>

