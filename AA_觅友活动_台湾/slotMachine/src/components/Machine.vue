<template>
  <div class="machine">
    <div class="userNums">幸運值：{{disNums}}</div>
    <slot-machine-test ref="slot"></slot-machine-test>
    <div class="startStype">
      <span v-for="(item,index) in luckType" :key="index" :class="'type' + index" @click="startGame(item)">

      </span>
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
    owner (val) {
      this.nums = val.score
    }
  },
  computed: {
    ...mapState(['owner'])
  },
  methods: {
    startGame (val) {
      this.$refs.slot.startGame(val)
    }
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
}
</style>