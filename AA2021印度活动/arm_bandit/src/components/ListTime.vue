<template>
  <div class="time">
    {{time}}
  </div>
</template>

<script>
import getDate from "../utils/getDate.js"
export default {
  props: ['item'],
  computed: {
    time() {
      console.log(this.item)
      return getDate(new Date(Number(this.item * 1000)), 'rule')
    }
  }
}
</script>

<style>
</style>
