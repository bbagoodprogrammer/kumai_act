<template>
  <div class="page pageIndex">
    <span>{{disNums}}</span>
  </div>
</template>

<script>
import { tween } from "../utils/tween"
export default {
  data () {
    return {
      nums: 0,
      disNums: 0,
    }
  },
  watch: {
    nums (newV, old) {
      console.log(newV, old)
      tween(old, newV, 1000, v => {
        this.disNums = parseInt(v)
      })
    }
  },
  created () {
    setTimeout(() => {
      this.nums = 1000000
    }, 0)

  }
}
</script>

<style lang="scss">
.pageIndex {
  //   background: #0D042A url(../img/banner.png);
  //   background-size: 100% 100%;
  span {
    color: red;
  }
  img {
    display: block;
    width: 100%;
  }
}
</style>