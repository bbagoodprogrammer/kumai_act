<template>
  <div id="app">
    <SingWish></SingWish>
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
  </div>
</template>
<script>
import SingWish from './view/SingWish.vue'
import MsgToast from "./components/commonToast"
import { globalBus } from './utils/eventBus'
import { mapState } from 'vuex'
import APP from './utils/openApp'
export default {
  name: 'App',
  components: { SingWish, MsgToast },
  computed: {
    ...mapState(['actStatus', 'isShare'])
  },
  data() {
    return {
      tastMsg: '',
      showT: false,
      imgArr: [
        require('./assets/img/actList1Bg.png'),
        require('./assets/img/actList2Bg.png'),
        require('./assets/img/actList3Bg.png'),
        require('./assets/img/actList4Bg.png'),
        require('./assets/img/historyBg.png'),
        require('./assets/img/pup1.png'),
        require('./assets/img/pup2Bg.png'),
      ]
    }
  },
  created() {
    globalBus.$on('commonEvent', (callback) => {
      if (this.isShare) {
        APP()
        return
      } else if (this.actStatus === 0) {
        this.tastMsg = "活动未开始！"
        this.showT = true
      } else if (this.actStatus === 2) {
        this.tastMsg = "活动已结束！"
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
  background-color: #350096;
  direction: rtl;
}
#app {
  max-width: 750px;
  overflow-x: hidden;
  margin: auto;
}
@import "./assets/scss/common.scss";
</style>

