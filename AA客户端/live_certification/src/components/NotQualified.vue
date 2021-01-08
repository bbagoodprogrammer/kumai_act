<template>
  <div class="notQualified">
    <div class="commitTips">
      <span class="tipsIcon"></span>
      <p class="commitMsg">您還未獲得申請主播的資格</p>
    </div>
    <div class="tipList">
      <h3>如何獲得主播申請資格：</h3>
      <p>1.主播申請資格咨詢可聯繫官方號ID1000，官方會根據用戶在平台內的個人形象，唱功表現，活躍行為等多方面進行綜合考慮，多發作品，多參與官方活動更容易獲得主播申請資格喔。</p>
      <p>2.獲得主播申請資格的用戶，還需綁定手機號碼，並提交身份認證，審核通過後才可開播。</p>
      <p>3.開播需遵守平台主播行為規範，違者將按主播開播政策處罰。</p>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.commitTips {
  text-align: center;
  font-size: 0.26rem;
  margin-top: 0.7rem;
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
  margin-top: 1.32rem;
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
