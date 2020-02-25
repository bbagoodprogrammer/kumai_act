<template>
  <div class="rule">
    <div class="tabs">
      <span :class="{act:showCom=='ward'}" @click="changTab('ward')">活動規則</span>
      <span :class="{act:showCom=='rule'}" @click="changTab('rule')">活動獎勵</span>
    </div>
    <div class="ward" v-show="showCom=='ward'">
      <div class="actTime">活動時間：1月19日12:00-1月27日19:00</div>
      <h3>活動規則</h3>
      <p>1、家族長和副族長點擊活動報名按鈕即視為家族報名成功，並開始累計數據</p>
      <p>2、每個家族依據2019年所有成員收穫魅力值之和進行家族排名，前100名可獲得年度加成</p>
      <table border="1" bordercolor="#ffe79c" cellspacing="0">
        <thead>
          <th>家族魅力排名</th>
          <th>年度加成</th>
        </thead>
        <tbody>
          <tr>
            <td>1-10</td>
            <td>5%</td>
          </tr>
          <tr>
            <td>11-20</td>
            <td>4%</td>
          </tr>
          <tr>
            <td>21-40</td>
            <td>3%</td>
          </tr>
          <tr>
            <td>41-60</td>
            <td>2%</td>
          </tr>
          <tr>
            <td>61-100</td>
            <td>1%</td>
          </tr>
        </tbody>
      </table>
      <p>3、家族積分值=報名後家族成員作品和K房收禮魅力值*（1+年度加成），金豆魅力值上限5000
        </br>榮耀票值=收到家族榮耀票獲得的魅力值，通過頭號玩家遊戲幣兌換 </p>
      <p>4、家族菁英為金幣送禮魅力值超過3萬的前3名家族成員，每個菁英可為總榮耀值加成1%，最高加成3%，並獲得菁英禮包獎勵</p>
      <p>5、家族成員收禮金幣魅力值達到對應數值可自動開啟寶箱並隨機發放獎勵，每個寶箱每人最多獲得一份獎勵，寶箱每天最多開啟2個，於每日零點刷新</p>
      <p>6、金牌家族榜前三名為年度金、銀、銅牌家族，受邀參與年度之星演唱會</p>
      <p>7、參與年度之星演唱會活動的嘉賓由族長推薦，三個家族可分別獲得演唱會收禮金幣40%、30%、20%的金幣返利，其中5%歸演唱者所有，其餘部分由族長分配</p>
      <h3>備註</h3>
      <p>1、報名活動後更換家族則原有家族數據不扣減</p>
      <p>2、活動期間如有任何刷分行為，將取消參賽資格和獎勵，嚴重者封號處理</p>
      <p class="lastTips">活動最終解釋權歸主辦方所有</p>
    </div>
    <div class="ruleMsg" v-show="showCom=='rule'">
      <div class="actTime">活動時間：1月19日12:00-1月27日19:00</div>
      <img src="../../assets/img/wardsImg.png" alt="" class="wardsImg">
      <h3>金牌家族榜獎勵</h3>
      <h6>年度金牌家族：</h6>
      <p>1、年度金牌家族認證（1年）</p>
      <p>2、可選30位家族成員獲得年度2020金牌家族徽章（6個月）</p>
      <p>3、獎勵家族等級積分20000</p>
      <p>4、K房人數上限提升至200（永久）+金牌家族K房標籤（1個月）</p>
      <p>5、族長獎勵全年VIP、副族長獎勵3個月VIP</p>
      <p>6、可選50位家族成員獎勵家族禮物一套</p>
      <p>7、所有家族成員獎勵800金豆</p>
      <p>8、年度之星演唱會&演唱會收入金幣40%金幣返利</p>
      <h6>年度銀牌家族：</h6>
      <p>1、年度銀牌家族認證（1年）</p>
      <p>2、獎勵家族等級積分15000</p>
      <p>3、K房人數上限提升至200（永久）+銀牌家族K房標籤（1個月）</p>
      <p>4、族長獎勵全年VIP、副族長獎勵2個月VIP</p>
      <p>5、可選40位家族成員獎勵家族禮物一套</p>
      <p>6、所有家族成員獎勵500金豆</p>
      <p>7、年度之星演唱會&演唱會收入金幣30%金幣返利</p>
      <h6>年度銅牌家族：</h6>
      <p>1、年度銅牌家族認證（1年）</p>
      <p>2、獎勵家族等級積分12000</p>
      <p>3、K房人數上限提升至200（永久）+銅牌家族K房標籤（1個月）</p>
      <p>4、族長獎勵全年VIP、副族長獎勵1個月VIP</p>
      <p>5、可選30位家族成員獎勵家族禮物一套</p>
      <p>6、所有家族成員獎勵300金豆</p>
      <p>7、年度之星演唱會&演唱會收入金幣20%金幣返利</p>
      <h6>年度前十家族（4-10名）：</h6>
      <p>1、獎勵家族等級積分10000</p>
      <p>2、K房人數上限提升至200（1個月）+前十家族K房標籤（1個月）</p>
      <p>3、族長獎勵3個月VIP、副族長獎勵1個月VIP</p>
      <p>4、可選20位家族成員獎勵家族禮物一套</p>
      <p>5、所有家族成員獎勵200金豆</p>
      <h6>家族菁英禮包：</h6>
      <p>1、家族菁英徽章（30天）</p>
      <p>2、家族禮物一套</p>
      <p>3、新年快樂座駕7天</p>
      <p>4、貴族富豪值5000（價值5000金幣）</p>
      <h6>家族禮物套裝（價值179金幣）：</h6>
      <img src="../../assets/img/wardsImg2.png" alt="" class="wardImg2">
      <h3>備註</h3>
      <div class="other">
        <p>1、家族認證僅發放家族長，同時獲得多個年度活動認證則可選擇其中一個進行發放</p>
        <p>2、家族積分已達到滿值則該獎項視為無效</p>
        <p>3、K房人數上限提升自獎勵發放之日起計算</p>
        <p>4、活動結束後7個工作日內工作人員將聯繫家族長統計自選獎勵信息</p>
        <p>5、家族成員信息統計於活動截止時為準，獎勵於活動結束後7個工作日內發放</p>
      </div>

      <p class="lastTips">活動最終解釋權歸主辦方所有</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showCom: 'ward'
    }
  },
  methods: {
    changTab(val) {
      this.showCom = val
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #1f1f27;
}
.rule {
  padding: 0.35rem 0.45rem;
  .tabs {
    width: 6.74rem;
    height: 0.9rem;
    background: url(../../assets/img/tabBg.png);
    background-size: 100% 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0.08rem;
    span {
      width: 3.51rem;
      height: 0.79rem;
      text-align: center;
      line-height: 0.79rem;
      color: #fffb8e;
      &.act {
        color: #fff;
        background: url(../../assets/img/tabAct.png);
        background-size: 100% 100%;
      }
    }
  }
  .actTime {
    font-size: 0.26rem;
    color: #ffdb7b;
    font-weight: 600;
    text-align: center;
    margin-top: 0.16rem;
  }
  h3 {
    color: #ba7a3a;
    font-size: 0.28rem;
    font-weight: 600;
    margin: 0.36rem 0 0.21rem;
  }
  p {
    color: #ffe79c;
    font-size: 80%;
    padding-left: 0.2rem;
  }
  table {
    color: #ffe79c;
    text-align: center;
    margin: 0.11rem auto 0.11rem;
    font-size: 0.22rem;
    th {
      font-size: 0.22rem !important;
      padding: 0 0.21rem;
    }
    td {
      font-size: 0.22rem !important;
    }
  }
  .lastTips {
    font-size: 80%;
    color: #a88644;
    margin-top: 0.76rem;
    text-align: center;
  }
  .ruleMsg {
    .wardsImg {
      width: 6.53rem;
      height: 3.98rem;
      margin: 0.28rem auto;
    }
    .wardImg2 {
      width: 6.14rem;
      height: 1.94rem;
      margin: 0.2rem 0 0 0.44rem;
    }
    h6 {
      font-size: 87%;
      color: #fff1c4;
      font-weight: 600;
      padding-left: 0.24rem;
      margin-top: 0.2rem;
    }
    p {
      padding-left: 0.48rem;
    }
  }
  .other {
    p {
      padding-left: 0.24rem;
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
