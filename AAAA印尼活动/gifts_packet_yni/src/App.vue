<template>
  <div id="app">
    <gifts-packet></gifts-packet>
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
  </div>
</template>

<script>
import giftsPacket from './view/gifts_packet.vue'
import MsgToast from "./components/commonToast"
import { globalBus } from './utils/eventBus'
import { mapState } from 'vuex'
import APP from './utils/openApp'
export default {
  name: 'App',
  components: { giftsPacket, MsgToast },
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
        this.tastMsg = "活動未開始！"
        this.showT = true
      } else if (this.actStatus === 2) {
        this.tastMsg = "活動已結束！"
        this.showT = true
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
  background: #ae172e;
}
#app {
  max-width: 750px;
  overflow-x: hidden;
  margin: auto;
}
@import "./assets/scss/common.scss";
</style>

