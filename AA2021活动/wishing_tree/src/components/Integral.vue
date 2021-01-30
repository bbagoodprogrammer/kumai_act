<template>
  <div class="Integral">
    <div class="ownerScore">
      <span>個人許願值:</span>
      <div class="ownerLiner">
        <div class="actLiner"></div>
      </div>
    </div>
    <div class="totalScore">
      <span>全服許願值:</span>
      <div class="ownerLiner">
        <div class="actLiner"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ownerScore: [1000, 8000, 10000, 20000, 50000],
      totalScore: ['50萬', '150萬', '300萬', '500萬', '800萬']
    }
  }
}
</script>
<style lang="scss" scoped>
.Integral {
  width: 6.44rem;
  height: 2.46rem;
  background: url(../img/integral_bg.png);
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  .ownerLiner {
    width: 4.27rem;
    height: 0.26rem;
    background: url(../img/linerBg.png);
    background-size: 100% 100%;
  }
  .ownerScore,
  .totalScore {
    color: rgba(255, 220, 223, 1);
    font-size: 0.22rem;
    display: flex;
    align-items: center;
  }
}
</style>
