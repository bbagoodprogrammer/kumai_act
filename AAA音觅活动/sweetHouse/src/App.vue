<template>
  <div id="app">
    <Share v-if="sharePage" />
    <arm-bandit v-else></arm-bandit>
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
import getString from "./utils/getString"
export default {
  name: 'App',
  components: { ArmBandit, MsgToast, Loading, SingUpPup, Share },
  computed: {
    ...mapState(['actStatus', 'isShare', 'reg', 'nick'])
  },
  data() {
    return {
      tastMsg: '',
      showT: false,
      sharePage: null,
      imgArr: [
        require('./assets/img/tabs.png'),
        require('./assets/img/rulesBg.png'),
        require('./assets/img/rankBg.png'),
        require('./assets/img/taskItemBg.png'),
        require('./assets/img/singUp.png'),
        require('./assets/img/ruleTabs.png'),
      ]
    }
  },
  created() {
    this.sharePage = getString('type')
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
      } else if (!this.reg) {
        this.vxc('setSingUp')
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
  background-color: rgba(93, 197, 230, 1);
}
#app {
  max-width: 750px;
  overflow-x: hidden;
  margin: auto;
}
@import "./assets/scss/common.scss";
</style>

