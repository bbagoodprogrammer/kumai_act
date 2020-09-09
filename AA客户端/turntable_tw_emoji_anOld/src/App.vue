<template>
  <div id="app">
    <arm-bandit></arm-bandit>
    <!-- <Lottie /> -->
    <Loading />
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
  </div>
</template>

<script>
import ArmBandit from './view/ArmBandit.vue'
import MsgToast from "./components/commonToast"
import { globalBus } from './utils/eventBus'
import { mapState } from 'vuex'
import APP from './utils/openApp'
import Lottie from "./components/lottie"
import Loading from "./components/Loading"
export default {
  name: 'App',
  components: { ArmBandit, MsgToast, Lottie, Loading },
  computed: {
    ...mapState(['actStatus', 'isShare'])
  },
  data() {
    return {
      tastMsg: '',
      showT: false,
      imgArr: [
        require('./assets/img/trunBgConBlack.png'),
        require('./assets/img/openAct.png'),
        require('./assets/img/openBlack.png'),
      ]
    }
  },
  created() {
    sessionStorage.setItem('entryType', 2)
    globalBus.$on('commonEvent', (callback) => {
      if (this.isShare) {
        APP()
        return
      } else if (this.actStatus === 0) {
        this.tastMsg = ""
        this.showT = true
      } else if (this.actStatus === 2) {
        this.tastMsg = ""
        this.showT = true
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
body {
  // background-color: #350096;
}
#app {
  max-width: 750px;
  overflow-x: hidden;
  margin: auto;
}
@import "./assets/scss/common.scss";
</style>

