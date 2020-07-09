<template>
  <div id="app">
    <christmas-party></christmas-party>
  </div>
</template>

<script>
import ChristmasParty from './view/ChristmasParty.vue'
import { globalBus } from './utils/eventBus'
import { mapState } from 'vuex'
import APP from './utils/openApp'
export default {
  name: 'App',
  components: { ChristmasParty },
  computed: {
    ...mapState(['activeityState', 'isShare'])
  },
  data() {
    return {
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
      } else if (this.activeityState === 0) {
        this.vxc('setToast', {
          msg: this.lang.noAct
        })
      } else if (this.activeityState === 2) {
        this.vxc('setToast', {
          msg: this.lang.actEnd
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
  background-color: #48008c;
}
#app {
  max-width: 750px;
  overflow-x: hidden;
  margin: auto;
}
@import "./assets/scss/common.scss";
</style>

