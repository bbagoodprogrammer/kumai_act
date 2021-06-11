<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("fetchPrizeList");
    this.$store.dispatch("getSvgaData");
  },
};
</script>

