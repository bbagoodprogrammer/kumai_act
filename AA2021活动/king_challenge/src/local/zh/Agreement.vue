<template>
  <div class="rule">
    <div class="tabs">
      <a @click.prevent="mainTab=0" :class="{current:mainTab==0}" class="tab1">活動規則</a>
      <a @click.prevent="mainTab=1" :class="{current:mainTab==1}" class="tab2">活動獎勵</a>
    </div>
    <div class="ruleItem" v-if="mainTab == 0">
      <h5>活動時間</h5>
      <p>2月19日18:00-2月28日22:00</p>
      <h5>【王者簽到】</h5>
      <p>1、用戶報名后才可參與活動，才會開始累計活動分；</p>
      <p>2、活動期間每日在完成相應K房任務，即可成功簽到（當日任務僅限當日完成有效）；</p>
      <p>3、每日簽到成功可獲得相應獎勵，完成連續簽到3天/7天/10天更有額外豐厚獎勵；</p>
      <h5>【挑戰榜】</h5>
      <p>1、榜單根據活動期間用戶在K房1v1PK/擂台PK/禮物挑戰/歡唱KTV/談天說地模式下收到禮物的金幣魅力值進行排名；</p>
      <p>2、達到段位對應金幣魅力值，可獲得挑戰段位寶箱：</p>
      <img src="./img/table1.png" alt="" class="table1">
      <h5>【熱房榜】</h5>
      <p>1、榜單根據活動期間報名用戶的K房在1v1PK/擂台PK/禮物挑戰/歡唱KTV/談天說地模式下產生的金幣魅力值進行排名；</p>
      <p>2、房間挑戰：活動期間達到10000金幣魅力值的K房可獲得王者挑戰房間邊框7天；</p>
      <h5>備註：</h5>
      <p>1、活動期間如有任何刷分行為，將取消參賽資格和獎勵，嚴重者封號處理</p>
      <p>2、每個設備僅可使用一個賬號參與活動</p>
      <p>3、活動中段位獎勵需手動領取，活動結束時未領取則自動作廢，榜單獎勵會在活動結束后7天內發放，其餘獎勵均為系統自動發放；</p>
      <p>4、所有私密K房數據不會被計算；</p>
    </div>
    <div class="gift" v-else>
      <h5>活動時間</h5>
      <p>2月19日18:00-2月28日22:00</p>
      <h5>【王者簽到】</h5>
      <img src="./img/table2.png" alt="" class="table2">
      <h5>【挑戰榜】</h5>
      <p>第1名：王者挑戰徽章30天+王者挑戰頭飾30天+白玉輕舟座駕30天+特效禮物夜之戀曲（2880金幣）+2000金幣+5000金豆</p>
      <p>第2名：王者挑戰徽章30天+王者挑戰頭飾30天+白玉輕舟座駕30天+特效禮物燦若流星（1880金幣）+1500金幣+3000金豆</p>
      <p>第3名：王者挑戰徽章30天+王者挑戰頭飾30天+白玉輕舟座駕30天+特效禮物燦若流星（1880金幣）+1000金幣+2000金豆</p>
      <p>第4~10名：王者挑戰徽章30天+王者挑戰頭飾30天+白玉輕舟座駕30天+特效禮物愛心泡泡雨（820金幣）+500金幣+1000金豆</p>
      <h5>【熱房榜】（獎勵房主和管理員）</h5>
      <p>第1名：200金幣+2000金豆+王者挑戰主題30天</p>
      <p>第2名：150金幣+1500金豆+王者挑戰主題30天</p>
      <p>第3名：100金幣+1000金豆+王者挑戰主題30天</p>
      <p>第4~10名：50金幣+500金豆+王者挑戰主題30天</p>
      <h5>備註：</h5>
      <p>1、所有背包禮物有效期為7天</p>
      <p>2、頭飾獎勵可以在“我”頁面中“個性商城”里查看</p>
      <p>3、挑戰榜和熱房榜前十獎勵會在活動結束7天之內發放，其餘獎勵需要手動點擊領取</p>
    </div>

    <p class="lastTips">活動最終解釋權歸主辦方所有</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mainTab: 0
    }
  }
}
</script>
<style lang="scss" scoped>
body {
  background: rgba(30, 6, 99, 1);
  .mt {
    margin-top: 0.8rem;
  }
  .rule {
    padding-top: 0.38rem;
  }
  .tabs {
    height: 0.96rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.8rem;
    a {
      display: block;
      width: 2.66rem;
      height: 0.78rem;
      text-align: center;
      line-height: 0.78rem;
      font-size: 0.36rem;
      color: rgba(83, 43, 35, 1);
      background: url(../../img/tabs_not_act.png);
      background-size: 100% 100%;
      &.current {
        background: url(../../img/tabs_act.png);
        background-size: 100% 100%;
      }
    }
  }
  .table1,
  .table2 {
    width: 6.96rem;
    height: 4.82rem;
  }
  .ruleItem,
  .gift {
    padding: 0 0.23rem;
  }
  h5 {
    color: rgba(67, 47, 23, 0.8);
    font-size: 0.28rem;
    font-weight: 600;
    margin: 0.38rem 0 0.2rem;
  }
  p {
    color: rgba(67, 47, 23, 0.8);
    font-size: 0.24rem;
    margin: 0.15rem 0;
    padding-left: 0.6rem;
  }
  .lastTips {
    margin-top: 3rem;
    text-align: center;
  }
}
</style>
