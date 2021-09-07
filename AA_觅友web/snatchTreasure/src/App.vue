<template>
  <div id="app">
    <!-- :style="{minHeight:viewHeight+'px'}" -->
    <router-view class="appView"></router-view>
    <Loading v-show="loading" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Loading from './components/common/Loading';

export default {
  data () {
    return {
      imgArr: [
        require('./img/hitListBg.png'),
        require('./img/getTicketBg.png'),
        require('./img/pupBg.png'),
        require('./img/listBg.png'),
        require('./img/setJoinBg.png'),
      ]
    }
  },
  computed: {
    ...mapState(['loading']),
    viewHeight: () => window.innerHeight,
  },
  beforeCreate () {
    // let count = 0
    // for (var i = 0; i < this.imgArr.length; i++) {
    //   var Img = new Image()
    //   Img.src = this.imgArr[i]
    //   image.onload = () => {
    //     count++;
    //   };
    // }
    //this.$store.dispatch('getInitInfo');
  },
  components: {
    Loading,
  },
};
</script>