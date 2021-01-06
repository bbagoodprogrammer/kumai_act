<template>
  <div id="app">
    <router-view class="appView" :style="{minHeight:viewHeight+'px'}"></router-view>
    <Loading v-show="loading" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Loading from './components/common/Loading';
import { globalBus } from './utils/eventBus'
import APP from './utils/openApp'

export default {
  data() {
    return {
      imgArr: []
    }
  },
  computed: {
    ...mapState(['loading', 'step', 'isShare']),
    viewHeight: () => window.innerHeight,
  },
  created() {
    globalBus.$on('commonEvent', (callback) => {
      if (this.isShare) {
        APP()
        return
      } else if (this.actStatus === 0) {
        this.toast(lang.noAct)
      } else if (this.actStatus === 2) {
        this.toast(lang.actEd)
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
  components: {
    Loading,
  },
};
</script>