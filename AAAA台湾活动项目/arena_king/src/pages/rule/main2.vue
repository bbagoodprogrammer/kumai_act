<template>
  <div class="rule">
    <div class="mainTabs">
      <a @click.prevent="tabClick(1)" :class="{current:tab==1}" href="">活動規則</a>
      <a @click.prevent="tabClick(2)" :class="{current:tab==2}" href="">活動獎勵</a>
    </div>
    <div class="ruleMsg" v-show="tab == 1">
      <div class="actTime">活動時間：12月11日18:00-12月20日23:00</div>
      <h6>擂臺福利</h6>
      <p>每當完成100場擂臺PK賽時，隨機抽取100名參與用戶發放座駕、背包禮物和金豆獎勵，福利獎勵將於每日18:00統一發放,詳見獎勵列表</p>
      <p>官方K房唯愛發聲（13）和純真年代（12）每晚18-22點將開啟擂臺模式供玩家體驗使用</p>
      <h6>賽程安排</h6>
      <p>擂臺之王爭霸賽全程以擂臺模式進行，分爲兩個賽程，用戶需報名參與風雲賽，通過晉級後最終在爭霸賽決一勝負，獲勝者成為擂臺之王</p>
      <h6>風雲賽</h6>
      <p>比賽時間：12月11日18:00-12月18日23:00</p>
      <p>榜單規則：</p>
      <p>1、根據風雲賽活動期間內用戶在擂臺PK模式下所收到的PK票數（金豆票上限1000，超過則不再積累）進行排名</p>
      <p>2、收到擂臺禮物則對應票數加成5%</p>
      <p>3、擂主榜依據活動期間獲得擂主次數排名，前4名晉級爭霸賽並擔任擂主，每場至少具備兩位挑戰者</p>
      <p>4、風雲榜展示前100名，除擂主以外的前12名晉級爭霸賽並擔任挑戰者</p>
      <h6>爭霸賽：</h6>
      <p>比賽時間：12月20日20:00-12月20日23:00</p>
      <p>比賽規則：</p>
      <p>1、風雲賽晉級用戶隨機分配位置進入爭霸賽前4場擂臺進行PK</p>
      <p>2、爭霸賽期間在天天歡歌（11）K房依據場次和挑戰位順序進行擂臺PK挑戰</p>
      <p>3、爭霸賽前四場獲勝擂主晉級決勝場，進行擂臺之王最終角逐，決勝場擂主和挑戰者位置隨機分配</p>
      <p>4、所有PK依據票數決勝，爭霸賽加時條件為200票（上麥90秒內未達200票則自動下麥）</p>
      <p>5、票數計算方式：1金幣=30金豆=1張免費票=1票</p>
      <p>6、爭霸賽期間贈送任意金幣禮物獎勵棒棒糖x1</p>
      <p>7、爭霸賽棄賽用戶視為挑戰失敗，票數記為0</p>
      <h6>備註：</h6>
      <p>1、每位用戶僅可註冊一個賬號參與活動，違規刷分等行為將取消參賽資格和獎勵</p>
      <p>2、私密房間和惡意刷分將不計入活動數據</p>
      <p class="lastMsg">活動最終解釋權歸主辦方所有</p>
    </div>
    <div class="wardMsg" v-show="tab == 2">
      <div class="actTime">活動時間：12月11日18:00-12月20日23:00</div>
      <h6>擂臺之王：</h6>
      <p>擂臺之王徽章（30天）+繁星守護背包禮物*5（1888金幣/個，7天）+隆重登場座駕（30天）+5000金幣+5000金豆</p>
      <h6>決勝場挑戰者（3位）：</h6>
      <p>繁星守護背包禮物*3（1888金幣/個，7天）+隆重登場座駕（30天）+2000金幣+2000金豆</p>
      <h6>擂主榜：</h6>
      <p>第1名：擂臺金杯背包禮物*1（528金幣/個，7天）+豪華遊艇座駕（7天）+1000金幣+1000金豆</p>
      <p>第2-4名：擂臺金杯背包禮物*1（528金幣/個，7天）+豪華遊艇座駕（7天）+800金幣+800金豆</p>
      <p>第5-10名：擂臺金杯背包禮物*1（528金幣/個，7天）+豪華遊艇座駕（7天）+500金幣+500金豆</p>
      <h6>風雲榜：</h6>
      <p>第1名：擂臺金杯背包禮物*1（528金幣/個，7天）+豪華遊艇座駕（7天）+1000金幣+1000金豆</p>
      <p>第2-4名：擂臺金杯背包禮物*1（528金幣/個，7天）+豪華遊艇座駕（7天）+800金幣+800金豆</p>
      <p>第5-10名：擂臺金杯背包禮物*1（528金幣/個，7天）+豪華遊艇座駕（7天）+500金幣+500金豆</p>
      <p>第11-16名：豪華遊艇座駕（7天）+200金幣+200金豆</p>
      <h6>助威守護榜獎勵</h6>
      <p>第1名：5%儲值返利券（1天）+隆重登場座駕（30天）+守護達人徽章（30天）+10000金豆</p>
      <p>第2名：4%儲值返利券（1天）+隆重登場座駕（30天）+守護達人徽章（30天）+5000金豆</p>
      <p>第3名：3%儲值返利券（1天）+隆重登場座駕（30天）+守護達人徽章（30天）+3000金豆</p>
      <p>第4-10名：守護達人徽章（7天）+豪華遊艇座駕（7天）+2000金豆</p>
      <h6>擂臺福利獎勵（每次發100名）：</h6>
      <p>50金豆（50人）</p>
      <p>赤鷹戰機座駕3天（20人）</p>
      <p>極速快艇座駕7天（10人）</p>
      <p>仙女棒K房金豆禮物-360金豆/個（10人）</p>
      <p>皇冠車作品金豆禮物-600金豆/個（10人）</p>
      <h6> 備註：</h6>
      <p>1、風雲賽中勝出並晉級的用戶棄權參與爭霸賽則僅發放擂主榜、風雲榜對應金豆獎勵</p>
      <p>2、榜單獎勵將於活動結束後3個工作日內發放</p>
      <p>3、擂臺福利獎勵將於每日18:00統一發放，獎勵隨機派發</p>
      <p class="lastMsg">活動最終解釋權歸主辦方所有</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: 1
    }
  },
  methods: {
    tabClick(tab) {
      this.tab = tab;
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #20150d;
}
.rule {
  .mainTabs {
    width: 6.9rem;
    height: 0.9rem;
    background: url(../../assets/img/tabsBg.png);
    background-size: 100% 100%;
    margin: 0.28rem auto;
    display: flex;
    align-items: center;
    padding: 0 0.05rem;
    a {
      display: block;
      width: 3.59rem;
      height: 0.84rem;
      font-size: 120%;
      color: #e1ab70;
      text-align: center;
      line-height: 0.84rem;
      &.current {
        color: #fff9d6;
        background: url(../../assets/img/actTabs.png);
        background-size: 100% 100%;
      }
    }
  }
  .ruleMsg {
    padding: 0 0.39rem 0.39rem;
    .actTime {
      font-size: 80%;
      text-align: center;
      color: #d89d58;
    }
    h6 {
      color: #d89d58;
      margin-top: 0.39rem;
    }
    p {
      color: #c0a08b;
      font-size: 80%;
    }
    .lastMsg {
      margin-top: 0.8rem;
      text-align: center;
      color: #9b7254;
    }
  }
  .wardMsg {
    padding: 0 0.39rem 0.39rem;
    .actTime {
      font-size: 80%;
      text-align: center;
      color: #d89d58;
    }
    h6 {
      color: #d89d58;
      margin-top: 0.39rem;
    }
    p {
      color: #c0a08b;
      font-size: 80%;
    }
    .lastMsg {
      margin-top: 0.8rem;
      text-align: center;
      color: #9b7254;
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
