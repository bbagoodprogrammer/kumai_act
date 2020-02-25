<template>
  <div class="wards">
    <p class="actTime">活動時間：11月22日18:00:00-12月2日20:00:00</p>
    <div class="wardImg"></div>
    <h3>積分抽獎獎品</h3>
    <div class="wardImg2"></div>
    <h3>感恩節大禮包</h3>
    <p class="wardTips2">每合成1個拼圖，獎勵一個感恩節大禮包：</p>
    <div class="wardImg3"></div>
    <h3>榜單前10名獎勵</h3>
    <div class="rankTop10">
      <h6>第一名</h6>
      <p>感恩徽章（30天）+7位靚號+粉色薔薇座駕（30天）+8000金幣+感恩鈴鐺背包禮物（80金幣）*12+8000金豆</p>
      <h6>第二名</h6>
      <p>感恩徽章（15天）+7位靚號+粉色薔薇座駕（30天）+6000金幣+感恩鈴鐺背包禮物（80金幣）*10+6000金豆</p>
      <h6>第三名</h6>
      <p>感恩徽章（15天）+7位靚號+粉色薔薇座駕（30天）+3000金幣+感恩鈴鐺背包禮物（80金幣）*8+3000金豆</p>
      <h6>第四 - 第五名</h6>
      <p>感恩徽章（7天）+粉色薔薇座駕（30天）+2000金幣+感恩鈴鐺背包禮物（80金幣）*6+2000金豆</p>
      <h6>第六 - 第十名</h6>
      <p>粉色薔薇座駕（30天）+1000金幣+感恩鈴鐺背包禮物（80金幣）*5+1000金豆</p>
    </div>
    <h3>獎勵使用規則</h3>
    <div class="wardsTips">
      <p>1、感恩節大禮包中的10%消費金幣返利券，僅限領取當天有效，額度不可疊加，領取當天00:00:00-23:59:59消費金幣算入返利（若是在11月22日領取，則18:00:00-23:59:59消費金幣計入返利），返利金幣將會在次日凌晨結算並返還到賬戶上</p>
      <p>2、抽獎獲得的5%儲值金幣返利券，僅限領取後24小時內有效，同一天領取多張儲值金幣返利券，額度不可疊加，返利金幣將在每次儲值後返還到賬戶上</p>
      <p>3、獎勵的背包禮物有效期均為30天，請在有效期內使用。</p>
      <p>4、背包禮物及5%儲值金幣返利券安卓版本可在我-背包中查看，並且送禮時，可選擇背包禮物送出。IOS可前往app store 搜尋最新版本“高歌”，下載使用</p>
      <p>5、獲得7位數靚號獎勵，官方號UID10會與您聯繫，在官方提供的靚號庫範圍內篩選確認靚號號碼，以及需要提供未在歡歌平台註冊過的手機號碼進行綁定</p>
    </div>
    <p class="lastTips">本活動的最終解釋權歸活動主辦方所有</p>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.wards {
  .actTime {
    color: #ffd9c4;
    font-size: 80%;
    text-align: center;
    margin-top: 0.31rem;
  }
  .wardImg {
    width: 7.1rem;
    height: 4.85rem;
    background: url(../../assets/img/wardImg.png);
    background-size: 100% 100%;
    margin: 0.33rem auto;
  }
  .wardImg2 {
    width: 6.81rem;
    height: 1.43rem;
    background: url(../../assets/img/wardImg2.png);
    background-size: 100% 100%;
    margin: 0.23rem auto;
  }
  .wardImg3 {
    width: 6.19rem;
    height: 1.79rem;
    background: url(../../assets/img/wardImg3.png);
    background-size: 100% 100%;
    margin: 0.23rem auto;
  }
  .wardTips2 {
    color: #ffd9c4;
    text-align: center;
    font-size: 80%;
    margin-top: 0.18rem;
  }
  .wardsTips {
    padding: 0 0.33rem;
    color: #ffd9c4;
    p {
      margin-top: 0.2rem;
      font-size: 80%;
    }
  }
  .lastTips {
    text-align: center;
    color: #ffe0aa;
    font-size: 80%;
    margin-top: 0.55rem;
  }
  .rankTop10 {
    margin: 0.29rem;
    padding: 0 0.35rem;
    h6 {
      font-size: 93%;
      margin-top: 0.25rem;
    }
    p {
      color: #ffd9c4;
      font-size: 80%;
      padding-left: 0.2rem;
    }
  }
  h3 {
    margin-top: 0.55rem;
    color: #ffc867;
    font-size: 120%;
    text-align: center;
  }
}
</style>
