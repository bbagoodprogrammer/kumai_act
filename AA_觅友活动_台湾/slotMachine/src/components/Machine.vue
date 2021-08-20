<template>
  <div class="machine">
    <div class="userNums">{{lang.scoreName}}：{{disNums}}</div>
    <slot-machine-test ref="slot"></slot-machine-test>
    <div class="startStype">
      <span v-for="(item,index) in luckType" :key="index" :class="'type' + index" @click="startGame(item)"></span>
    </div>
    <div class="userCoins">
      <i class="coinsIcon"></i>
      <span>{{owner.coins}}</span>
      <i class="add" @click="gowalletpage()"></i>
    </div>
  </div>
</template>

<script>

import { tween } from "../utils/tween"
import SlotMachineTest from "../components/SlotMachine/SlotMachineTest.vue"
import { mapState } from "vuex"

export default {
  components: { SlotMachineTest },
  data () {
    return {
      nums: 0,
      disNums: 0,
      luckType: [
        50, 100, 200, 500
      ],
    }
  },
  watch: {
    nums (newV, old) {
      tween(old, newV, 1000, v => {
        this.disNums = parseInt(v)
      })
    },
    userScore (val) {
      this.nums = val
    }
  },
  computed: {
    ...mapState(['owner']),
    userScore () {
      return this.owner.score
    }
  },
  methods: {
    startGame (val) {
      this.$refs.slot.startGame(val)
    },
    gowalletpage () {
      const ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      try {
        if (ios) {
          // goWalletpage()
          sendJsData('app://walletpage');
        } else {
          javascript: JSInterface.sendJsData('app://walletpage');
        }
      } catch (e) { }
    },
  }
}
</script>

<style lang="scss">
.machine {
  height: 13.59rem;
  position: relative;
  .userNums {
    width: 5.55rem;
    height: 0.7rem;
    position: absolute;
    top: 2.72rem;
    left: 1rem;
    text-align: center;
    line-height: 0.7rem;
    font-size: 0.4rem;
    color: #FEF780;
  }
  .startStype {
    width: 6.3rem;
    position: absolute;
    top: 7.8rem;
    left: 0.63rem;
    display: flex;
    justify-content: space-between;
  }
  .userCoins {
    width: 2.22rem;
    height: 0.46rem;
    background: url(../img/coinsBg.png);
    background-size: 100% 100%;
    position: absolute;
    top: 9.3rem;
    left: 2.64rem;
    display: flex;
    align-items: center;
    .coinsIcon {
      width: 0.32rem;
      height: 0.32rem;
      background: url(../img/coins.png);
      background-size: 100% 100%;
      margin-left: 0.1rem;
    }
    span {
      flex: 1;
      text-align: center;
    }
    .add {
      width: 0.41rem;
      height: 0.4rem;
      background: url(../img/add.png);
      background-size: 100% 100%;
    }
  }
}
</style>