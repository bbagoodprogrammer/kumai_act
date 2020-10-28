<template>
  <div class="taskList">
    <p class="tips">任務達成盛典幣自動到賬，每天獲得的盛典幣清0</p>
    <div class="taskItem">
      <div class="bg"></div>
      <div class="list"></div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
export default {
  computed: {
    ...mapState(['shcule'])
  }
}
</script>
<style lang="scss">
.taskList {
  .tips {
    text-align: center;
    font-size: 0.28rem;
    margin: 0.27rem 0 0.25rem;
  }
  .taskItem {
    width: 7.27rem;
    height: 11.39rem;
    background: url("../assets/img/listBgHeader.png") 0 0 no-repeat,
      url("../assets/img/listBgCon.png") 0 1.56rem,
      url("../assets/img/listBgBotton.png") left bottom no-repeat;
    background-size: 100% auto;
  }
}
</style>
