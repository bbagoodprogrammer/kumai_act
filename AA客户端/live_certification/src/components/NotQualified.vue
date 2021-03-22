<template>
  <div class="notQualified">
    <div class="commitTips">
      <span class="tipsIcon"></span>
      <p class="commitMsg">{{lang.notQualified_tip1}}</p>
    </div>
    <div class="tipList">
      <h3>{{lang.notQualified_tip2}}</h3>
      <p>{{lang.notQualified_tip3}}</p>
      <p>{{lang.notQualified_tip4}}</p>
      <p>{{lang.notQualified_tip5}}</p>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.commitTips {
  width: 6.9rem;
  height: 3.4rem;
  text-align: center;
  font-size: 0.26rem;
  margin: 0 auto;
  background: #fff;
  border-radius: 0.12rem;
  padding-top: 0.6rem;
  span {
    color: rgba(103, 160, 226, 1);
  }
  .tipsIcon {
    display: block;
    width: 1.6rem;
    height: 1.6rem;
    margin: 0 auto;
    background: url(../img/status_warning.png);
    background-size: 100% 100%;
  }
  .commitMsg {
    font-size: 0.32rem;
    color: rgba(51, 51, 51, 1);
    margin-top: 0.33rem;
  }
}
.tipList {
  margin-top: 0.3rem;
  padding: 0 0.48rem;
  h3 {
    font-size: 0.28rem;
    color: rgba(51, 51, 51, 1);
  }
  p {
    color: rgba(153, 153, 153, 1);
    font-size: 0.26rem;
    line-height: 0.46rem;
  }
}
</style>
