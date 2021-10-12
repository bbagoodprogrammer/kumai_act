<template>
  <div class="page pageIndex">
    <h6 class="title1">1. 超級喜歡有什麼作用？</h6>
    <p>-超級喜歡可以給你直接和心儀對象聊天的機會</p>
    <p>-置頂展示你的卡片、獨特的卡片展示效果，大大提升和對方配對成功的幾率</p>
    <div class="imgTips">
      <span class="img1"></span>
      <span class="img2"></span>
    </div>
    <h6 class="title2">2. 如何獲得超級喜歡？</h6>
    <p>你可以通過完成新手任務、完成首儲獲得獎勵以及通過消費購買超級喜歡</p>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.pageIndex {
  padding: 0.28rem 0.3rem;
  .title1,
  .title2 {
    font-size: 0.32rem;
    color: #2C2B36;
    font-weight: bold;
    margin-bottom: 0.12rem;
  }
  .title2 {
    margin-top: 0.48rem;
  }
  p {
    font-size: 0.28rem;
    color: #2C2B36;
    line-height: 0.42rem;
  }
  .imgTips {
    padding: 0 0.07rem;
    margin-top: 0.24rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .img1,
    .img2 {
      background: red;
      width: 3.19rem;
      height: 3.72rem;
    }
  }
  img {
    display: block;
    width: 100%;
  }
}
</style>