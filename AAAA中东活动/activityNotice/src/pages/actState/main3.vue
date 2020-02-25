<template>
  <div class="actState">
    <common-heard :title="title"></common-heard>
  </div>
</template>
<script>
import CommonHeard from "../../components/CommonHeard"
export default {
  components: { CommonHeard },
  data() {
    return {
      title: `نشاطي`
    }
  }
}
</script>
<style lang="scss">
@import "../../assets/scss/common.scss";
</style>
 