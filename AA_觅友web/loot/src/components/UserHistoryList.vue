<template>
  <div class="userHistoryList">
    <div class="title"><i @click="$parent.showUserHistrry = false"></i>奪寶記錄</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.userHistoryList {
  width: 7.5rem;
  height: 9.31rem;
  background: url(../img/pupBg.png);
  background-size: 100% 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  .title {
    height: 0.98rem;
    display: flex;
    align-items: center;
    font-size: 0.36rem;
    i {
      width: 0.48rem;
      height: 0.48rem;
      background: url(../img/black.png);
      background-size: 100% 100%;
      margin: 0 0.08rem 0 0.32rem;
    }
  }
}
</style>