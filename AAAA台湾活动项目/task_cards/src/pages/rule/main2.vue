<template>
  <div class="rule">
    <h1>活動規則</h1>
    <p class="time">活動時間：3月10日18:00:00-3月20日20:00:00</p>
    <h6>活動規則</h6>
    <p>1.活動期間，報名成功後完成對應挑戰任務能量達到一定數值後，可觸發翻牌機會，1000能量兌換1次翻牌機會，每個用戶每天最多5次翻牌機會，當天翻牌機會凌晨重置，請及時使用</p>
    <p>2.每次翻牌可獲得1個獎勵，使用double卡可使獲得獎勵翻倍，獎勵實時派發到賬戶，購買道具卡，可獲得更豐富的獎勵</p>
    <p>3.該活動獲得的儲值返利券在抽到劵後開始計算數值，滿足條件派發金幣</p>
    <h6>道具使用說明：</h6>
    <p>1.排除卡，點擊使用，先排除已抽中的一種類型，再次點擊翻牌 </br> double卡，點擊使用后，直接點擊翻牌</p>
    <p>2.活動道具必須當天使用，凌晨自動清零</p>
    <p>3.道具翻牌前使用，作用於本次翻牌結果</p>
    <p>4.每人每天僅能購買1張排除卡和1張double卡</p>
    <h6>獎勵使用說明：</h6>
    <p>1.獎勵的背包禮物有效期均為14天，請在有效期內使用</p>
    <p>2.儲值返利券自動發放到背包裡，24小時內有效，儲值時返金幣，請及時使用</p>
    <p>3.背包禮物安卓版本可在我-背包中查看，並且送禮時，可選擇背包禮物送出。IOS可前往APP STORE搜尋最新版本”高歌“，下載使用</p>
    <h5>可能獲得的獎品</h5>
    <img src="../../assets/img/giftImg.png" alt="">
    <p class="footerMsg">該活動最終解釋權歸主辦方所有</p>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
body {
  background-color: #af6f4c;
}
.rule {
  padding: 0.6rem 0.37rem;
  h1 {
    font-size: 0.36rem;
    font-weight: 800;
    text-align: center;
  }
  h6 {
    color: #ffe2a5;
    font-weight: 600;
    margin-top: 0.46rem;
  }
  h5 {
    font-size: 0.36rem;
    font-weight: 800;
    text-align: center;
    margin: 0.95rem 0 0.53rem;
  }
  img {
    width: 6.35rem;
    height: 7.04rem;
    margin: 0 auto;
  }
  p {
    font-size: 0.24rem;
    color: #ffe2a5;
    font-weight: 600;
    margin-top: 0.3rem;
    padding-left: 0.25rem;
  }
  .time {
    font-size: 0.24rem;
    font-weight: 600;
    text-align: center;
    margin-top: 0.2rem;
  }
  .footerMsg {
    text-align: center;
    font-size: 80%;
    color: #e8bea6;
    font-weight: 600;
    margin-top: 0.8rem;
  }
  .clearfix:after {
    content: "";
    height: 0;
    line-height: 0;
    display: block;
    visibility: hidden;
    clear: both;
  }
}
@import "../../assets/scss/common.scss";
</style>
