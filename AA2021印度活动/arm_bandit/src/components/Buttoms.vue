<template>
  <div class="buttomBox">
    <div class="coins1" @click="changCoins(400)"></div>
    <div class="coins2" @click="changCoins(1600)"></div>
    <div class="coins3" @click="changCoins(4000)"></div>
  </div>
</template>

<script>
import { globalBus } from '../utils/eventBus.js'
export default {
  data () {
    return {
      coins: 50
    }
  },
  methods: {
    changCoins (val) {
      this.coins = val
      this.$store.commit('changDrawCions', val)
      globalBus.$emit('countNumber')
    }
  }
}
</script>

<style lang="scss">
.buttomBox {
  height: 2rem;
  padding: 0.2rem 1rem;
  display: flex;
  div {
    float: left;
    margin-left: 0.2rem;
  }
  //   .coins1 {
  //     width: 1.59rem;
  //     height: 1.13rem;
  //     background: url(../img/50.png);
  //     background-size: 100% 100%;
  //   }
  //   .coins2 {
  //     width: 1.59rem;
  //     height: 1.13rem;
  //     background: url(../img/200.png);
  //     background-size: 100% 100%;
  //   }
  //   .coins3 {
  //     width: 1.59rem;
  //     height: 1.13rem;
  //     background: url(../img/500.png);
  //     background-size: 100% 100%;
  //   }
}
</style>
