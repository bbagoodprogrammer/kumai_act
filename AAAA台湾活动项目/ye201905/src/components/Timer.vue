<template>
  <div class="downTime">
    <div class="timeItem" v-if="!surplusTime.end && second>0">
      <span><em>{{surplusTime.day}}</em><i>{{lang.day}}</i> </span>
      <span><em>{{surplusTime.hour}}</em><i>{{lang.houer}}</i> </span>
      <span><em>{{surplusTime.minute}}</em><i>{{lang.minute}}</i> </span>
      <span><em>{{surplusTime.second}}</em><i>{{lang.second}}</i></span>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import downTime from "../utils/downTime"
export default {
  data() {
    return {
      surplusTime: {},
      timer: null
    }
  },
  computed: {
    ...mapState(['second']),
  },
  watch: {
    second(val) {
      if (val > 0) {
        this.downTimeGo(val)
      }
    }
  },
  methods: {
    downTimeGo(val) {
      downTime('time1', val);
      this.surplusTime = downTime('time1');
      this.timer = setInterval(() => {
        this.surplusTime = downTime('time1');
        if (this.surplusTime.end) {
          clearInterval(this.timer)
          this.$store.commit('changActStatus', 2)
        }
      }, 1000)
    },
  }
}
</script>
<style lang="scss" scoped>
.downTime {
  width: 4.2rem;
  margin: 0 auto;
  .timeItem {
    height: 0.56rem;
    color: #ac8c4d;
    display: flex;
    align-items: center;
    padding: 0 0.27rem;
    span {
      flex: 1;
      display: flex;
      align-items: center;
      em {
        color: #fff;
        margin: 0 0.16rem;
        font-weight: 500;
      }
      i {
        font-size: 74%;
      }
    }
  }
}
</style>
