<template>
  <div id="app">
    <card-game></card-game>
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
  </div>
</template>

<script>
import CardGame from './view/CardGame.vue'
import MsgToast from "./components/commonToast"
import { globalBus } from './utils/eventBus'
import { mapState } from 'vuex'
import APP from './utils/openApp'
export default {
  name: 'App',
  components: { CardGame, MsgToast },
  computed: {
    ...mapState(['actStatus', 'isShare'])
  },
  data() {
    return {
      tastMsg: '',
      showT: false,
      imgArr: [
        require('./assets/img/ExcludeCardsBg.png'),
        require('./assets/img/openCarBg.png'),
        require('./assets/img/carPup.png'),
        require('./assets/img/giftPup.png'),
      ]
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
  background-color: #af6f4c;
}
#app {
  max-width: 750px;
  overflow-x: hidden;
  margin: auto;
}
@import "./assets/scss/common.scss";
</style>

