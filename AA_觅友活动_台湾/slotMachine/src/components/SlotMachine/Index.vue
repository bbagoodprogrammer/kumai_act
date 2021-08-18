<template>
  <div class="slotMachine">
    <SlotMachineItem @end="$emit('end', result)" :icons="result" :nowIndex="result[i-1]" :nums="nums" :updateFlag="itemUpdateFlag" v-for="i in size" :list="list" :id="getResultId(i-1)" :size="size"
      :slotIndex="i-1" :key="i" ref="slotItem" />
  </div>
</template>

<script>
import SlotMachineItem from './SlotMachineItem';

export default {
  props: {
    size: {
      type: Number,
      default: 3,
    },
    list: {
      type: Array,
      default: [],
    },
    result: {
      type: Array,
      default: [],
    },
    nums: {
      type: Array,
      default: [],
    },
  },
  data () {
    return {
      itemUpdateFlag: false,
    };
  },
  watch: {
    result (newValue) {
      this.itemUpdateFlag = !this.itemUpdateFlag;
    },
  },
  methods: {
    getResultId (index) {
      if (this.result && this.result.length) {
        return typeof this.result[index] != 'undefined' ? this.result[index] : -1;
      }
      return -1;
    },
  },
  components: {
    SlotMachineItem,
  }
}
</script>

<style lang="scss">
.slotMachine > div {
  float: left;
}
</style>
