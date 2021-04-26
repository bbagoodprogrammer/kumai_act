<template>
  <div id="app">
    <ShareCom1 v-if="isShare" :sharePeople="sharePeople" :type="type" />
    <arm-bandit v-else> </arm-bandit>
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
import ShareCom1 from "./components/ShareCom1"
import getString from "./utils/getString"
export default {
  name: 'App',
  components: { ArmBandit, MsgToast, Loading, ShareCom1 },
  computed: {
    ...mapState(['actStatus'])
  },
  data () {
    return {
      tastMsg: '',
      showT: false,
      imgArr: [
        require('./assets/img/wateringBg.png'),
        require('./assets/img/matureBg.png'),
        require('./assets/img/immatureBg.png'),
        require('./assets/img/strawberry.png'),
        require('./assets/img/water.png'),
        require('./assets/img/land1Bg2.png'),
        require('./assets/img/land2Bg1.png'),
        require('./assets/img/land2Bg2.png'),
        require('./assets/img/land3Bg1.png'),
      ],
      type: 0,
      isShare: null,
      sharePeople: {}
    }
  },
  created () {
    globalBus.$on('commonEvent', (callback) => {
      if (this.isShare) {
        APP()
        return
      } else if (this.actStatus === 0) {
        this.toast('Event chưa mở')
      } else if (this.actStatus === 2) {
        this.toast('Event đã kết thúc')
      } else {
        callback()
      }
    })
  },
  mounted () {
    this.judgeShare()
    for (var i = 0; i < this.imgArr.length; i++) {
      var Img = new Image()
      Img.src = this.imgArr[i]
    }
  },
  methods: {
    closeToast () {
      this.showT = false
    },
    judgeShare () {//判断是否为分享环境,请求相应的接口 
      this.isShare = getString('token') ? false : true
      this.vxc('setShareState', this.isShare) //分享状态
      if (this.isShare) {
        this.type = getString('type')
        var userObj = getString('t')
        if (this.type == 2) {
          this.sharePeople = JSON.parse(window.decodeURIComponent(window.atob(userObj)))
        }
      }
    },
    test () {

    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #9bd135;
}
#app {
  max-width: 750px;
  overflow-x: hidden;
  margin: auto;
}
@import './assets/scss/common.scss';
</style>

