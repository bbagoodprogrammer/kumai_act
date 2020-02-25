<template>
  <div class="rules">
    <p class="activeTime"><strong>活動時間</strong>2019年12月30日18:00-2020年1月8日23:00</p>
    <h4>活動規則</h4>
    <div class="wardTop">
      <p>1、點擊活動頁面報名按鈕即可參與活動，人氣榜、應援榜數據於報名成功後開始計算</p>
      <p>2、用戶在K房內收禮或送禮獲得人氣值/應援值，榜單依據對應數值排名，計算方式如下：</p>
      <p>人氣榜：人氣值=活動期間K房內獲得的魅力值</p>
      <p>活動期間K房上麥獲得的送禮人數前五名分別獲得5/4/3/2/1% 總人氣值加成</p>
      <p class="yingyuan">應援榜：應援值=活動期間K房內對參賽者貢獻的魅力值</p>
    </div>
    <h4>備註</h4>
    <p>1、同一用戶僅可註冊一個帳號參與活動，送禮人數不記錄同一設備的多個用戶數據</p>
    <p>2、如發現用戶有任何違規刷分行為，將直接取消用戶活動資格及獎勵，嚴重者封號處理</p>
    <div class="bottmMsg">
      本活動的最終解釋權歸活動主辦方所有
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.rules {
  padding-bottom: 1rem;
  h4 {
    margin-top: 0.7rem;
    color: #ffefbb;
    font-weight: 600;
  }
  .activeTime {
    margin-top: 0.51rem;
    text-align: left;
    font-size: 80%;
    strong {
      display: block;
      text-align: left;
      color: #ffefbb;
      font-weight: 600;
      margin-bottom: 0.24rem;
    }
  }
  .wardTop {
    .topTitle {
      font-size: 88%;
      color: #19ffe7;
      margin-top: 0.3rem;
    }
    > h5 {
      font-size: 75%;
      margin-top: 0.2rem;
    }
    p {
      font-size: 80%;
    }
    .yingyuan {
      margin: 0.2rem 0;
    }
  }
  p {
    margin-top: 0.1rem;
    line-height: 0.36rem;
    font-size: 80%;
  }
  .bottmMsg {
    text-align: center;
    font-size: 80%;
    color: #f4a2ff;
    margin-top: 0.87rem;
  }
}
</style>
