<template>
  <div class="page pageIndex">
    <div class="header">

    </div>
    <TimePeople />
  </div>
</template>

<script>
import TimePeople from "./TimePeople"
export default {
  components: { TimePeople }
}
</script>

<style lang="scss">
.pageIndex {
  .header {
    height: 5.27rem;
  }
  img {
    display: block;
    width: 100%;
  }
}
</style>