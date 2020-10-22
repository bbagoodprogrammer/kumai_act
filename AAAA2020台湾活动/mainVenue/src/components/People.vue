<template>
  <div class="pList">

  </div>
</template>
<script>
import api from "../api/apiConfig"
export default {
  created() {
    console.log('xxx')
    api.allList().then(res => {
      console.log(res)
    })
  }
}
</script>
<style lang="scss">
</style>
