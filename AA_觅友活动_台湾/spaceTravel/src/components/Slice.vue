<template>
  <div class="slice">
    <div class="slice_tips">
      <i></i>
      <strong> 每送出1234金幣指定禮物，可獲得一張太空券，消耗太空券可抽UFO碎片，當集齊橫向、縱向以及所有UFO碎片後，都能獲得響應的太空獎勵</strong>
    </div>
    <div class="slice_con">
      <div class="slice_card">
        <div class="card">

        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {

}
</script>

<style lang="scss">
.slice {
  .slice_tips {
    color: rgba(90, 172, 247, 1);
    padding: 0 0.4rem 0 0.27rem;
    margin-top: 0.4rem;
    i {
      display: inline-block;
      width: 0.22rem;
      height: 0.22rem;
      background: url(../img/tips.png);
      background-size: 100% 100%;
    }
    strong {
      font-size: 0.2rem;
    }
  }
  .slice_con {
    margin-top: 0.3rem;
    .slice_card {
      width: 5.41rem;
      height: 5.42rem;
      background: url(../img/slice_bg.png);
      background-size: 100% 100%;
      margin-left: 0.33rem;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      .card {
        width: 5.2rem;
        height: 5.21rem;
        background: url(../img/slice_card.png);
        background-size: 100% 100%;
      }
    }
  }
}
</style>