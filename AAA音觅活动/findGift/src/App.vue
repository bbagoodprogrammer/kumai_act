<template>
  <div id="app">
    <arm-bandit></arm-bandit>
    <msg-toast></msg-toast>
    <loading></loading>
  </div>
</template>

<script>
import ArmBandit from './view/ArmBandit.vue'
import MsgToast from "./components/commonToast"
import Loading from "./components/Loading"
import { globalBus } from './utils/eventBus'
import { mapState } from 'vuex'
import APP from './utils/openApp'
export default {
  name: 'App',
  components: { ArmBandit, MsgToast, Loading },
  computed: {
    ...mapState(['actStatus', 'isShare'])
  },
  data() {
    return {
      tastMsg: '',
      showT: false,
      imgArr: [
        require('./assets/img/giftBoxBg2.png'),
        require('./assets/img/goldGift2.png'),
        require('./assets/img/goType3.png'),
        require('./assets/img/goType4.png'),
        require('./assets/img/pupBg.png'),
        require('./assets/img/tabs2.png'),
      ]
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
    for (var i = 0; i < this.imgArr.length; i++) {
      var Img = new Image()
      Img.src = this.imgArr[i]
    }
  },
  methods: {
    closeToast() {
      this.showT = false
    }
  }
}
</script>

<style lang="scss">
#app {
  max-width: 750px;
  overflow-x: hidden;
  margin: auto;
}
@import "./assets/scss/common.scss";
</style>

