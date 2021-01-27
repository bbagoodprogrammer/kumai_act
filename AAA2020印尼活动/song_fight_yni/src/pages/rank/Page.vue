<template>
  <div class="rank">
    <TabsScrollLoadList />
  </div>
</template>
<script>
import TabsScrollLoadList from "../../components/TabsScrollLoadList"
export default {
  components: { TabsScrollLoadList },
  created() {
    document.title = 'Daftar Arena'
  }
}
</script>
<style lang="scss">
body {
  background: rgba(117, 67, 240, 1) url(../../assets/img/htmlBg.png) no-repeat;
  background-size: 100% auto;
}
</style>
