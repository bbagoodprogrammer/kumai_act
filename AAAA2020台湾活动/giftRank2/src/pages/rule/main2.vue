<template>
  <div class="rule">
    <div class="tabs">
      <span :class="{act:type==1}" @click="tabClick(1)">規則</span>
      <span :class="{act:type==2}" @click="tabClick(2)">獎勵</span>
    </div>
    <div class="actTime">活動時間：{{timer}}</div>
    <div class="ruleItem" v-if="type==1">
      <h5>活動規則</h5>
      <h6>報名規則</h6>
      <p>1、簽約創作者默認參與創作者榜排行</p>
      <p>2、簽約房主默認參與房主榜排行</p>
      <p>3、非簽約用戶可點擊報名參與用戶榜排行</p>
      <p class="red"> 4.用戶報名活動成功后，分數開始計入用戶榜，本期活動成績只能計入用戶榜
        <br /> （PS：活動期間申請簽約成功，依舊享受原有的分成，只是不參加本期創作者榜和房主榜的排名）</p>
      <h6>排行規則</h6>
      <p>1、創作者榜、房主榜、用戶榜均分爲日榜與總榜</p>
      <p>2、創作者榜按照簽約創作者收到的作品和K房特定禮物金幣數排名</p>
      <p>3、房主榜按照簽約房主的房間收到的K房特定禮物金幣數排名</p>
      <p>4、用戶榜按照用戶報名後收到的作品和K房特定活動禮物金幣數排名</p>
      <p>5、日榜和總榜均展示前100名，先到達該成績的排名在前面</p>
      <p>6.本活動作品特定禮物為黃桃慕斯（10金幣）、潛水小鴨（129金幣）；K房特定禮物為椰子水（10金幣）、獨角獸（129金幣）</p>
      <P class="mt">PS.如需了解更多簽約創作者及簽約房主詳情，可聯繫官方工作人員卡布奇諾（UID1577281）</P>
      <h6>其他說明</h6>
      <p>比賽過程中，若發現用戶使用不正當手段參與活動，小歡有權在事先不通知的前提下按情節嚴重對參賽者、違規者做取消其參賽資格或封禁賬號等處罰，包括但不限於：</p>
      <p>1）活動作品非本人原唱或盜錄他人作品</p>
      <p>2）盜用或借用他人已有賬戶參與活動</p>
      <p>3）比賽期間進參賽作品進行惡意評論和廣告等</p>
      <p> 4）比賽期間，用戶的參賽作品的歌曲內容、序文和評論涉及誹謗、謾罵、攻擊、侮辱、影射他人</p>
      <p> 5）通過其他違規行為參與活動</p>
      <p> 若為主動作弊者，無論是否為參賽者，永久封禁該用戶所有大小號，活動結束后小歡任有權收回該用戶所有獎勵</p>
      <p class="lastTips">該活動最終解釋權由活動主辦方所有</p>
    </div>
    <div class="wardItem" v-else>
      <h5>活動獎勵</h5>
      <img src="../../assets/img/wardImg.png" alt="" class="wardImg">
      <h5>創作者榜獎勵</h5>
      <h6>日榜前3獎勵</h6>
      <p> 分別獎勵榜單金幣3%/2.5%/2%現金分成（以每日結算時間段爲準）</p>
      <h6>總榜前10獎勵</h6>
      <p>第1名：</p>
      <p>總榜金幣5%現金分成+明星創作者徽章（30天）+粉色薔薇座駕（30天）+30000富豪值+6000金豆</p>
      <p>第2名：</p>
      <p>總榜金幣4%現金分成+明星創作者徽章（30天）+粉色薔薇座駕（30天）+20000富豪值+5000金豆</p>
      <p>第3名： </p>
      <p>總榜金幣3%現金分成+明星創作者徽章（30天）+粉色薔薇座駕（30天）+10000富豪值+4000金豆</p>
      <p>第4-10名：</p>
      <p>總榜金幣2%現金分成+粉色薔薇座駕（15天）+2000金豆</p>
      <h5>房主榜獎勵</h5>
      <h6> 日榜前3獎勵</h6>
      <p> 分別獎勵榜單金幣2%/1.5%/1%現金分成（以每日結算時間段爲準）</p>
      <h6> 總榜前10獎勵</h6>
      <p>第1名：</p>
      <p>總榜金幣4%現金分成+明星K房標籤（14天）+明星房主徽章（15天）+粉色薔薇座駕（30天）+30000富豪值</p>
      <p>第2名：</p>
      <p>總榜金幣3%現金分成+明星K房標籤（10天）+明星房主徽章（15天）+粉色薔薇座駕（30天）+20000富豪值</p>
      <p>第3名： </p>
      <p>總榜金幣2%現金分成+明星K房標籤（7天）+明星房主徽章（15天）+粉色薔薇座駕（30天）+10000富豪值</p>
      <p>第4-10名：</p>
      <p>總榜金幣1%現金分成+明星K房標籤（3天）+粉色薔薇座駕（15天）</p>
      <h5>用戶榜獎勵</h5>
      <h6>日榜前3獎勵</h6>
      <p>分別獎勵榜單金幣8%/5%/3%金幣分成（以每日結算時間段爲準）</p>
      <h6>總榜前10獎勵</h6>
      <p>第1名：</p>
      <p>禮物之王徽章（30天）+3000金幣+粉色薔薇座駕（30天）+限量超跑背包禮物（1888金幣）*1+6000金豆</p>
      <p>第2名：</p>
      <p>禮物之王徽章（30天）+粉色薔薇座駕（30天）+2500金幣+眷侶射手（1288金幣）*1+5000金豆</p>
      <p>第3名： </p>
      <p>禮物之王徽章（30天）+粉色薔薇座駕（30天）+2000金幣+歡樂摩天輪背包禮物（999金幣）*1+4000金豆</p>
      <p>第4-10名：</p>
      <p> 禮物之王徽章（30天）+粉色薔薇座駕（15天）+1000金幣+2000金豆</p>
      <h5>守護獎勵</h5>
      <p>創作者總榜和用戶總榜第一名、第二名、第三名的貢獻第一用戶分別獎勵：守護之王徽章（30天）+10000金豆</p>
      <p class="mt">PS:</p>
      <p>1、榜單日榜及總榜獎勵將在活動結束後7天發放</p>
      <p>2、獎勵的背包禮物有效期均為14天</p>
      <p>3. 本活動獲得的總榜及日榜現金分成將兌換為歡鉆直接發放到簽約收益中心</p>
      <p class="lastTips">該活動最終解釋權由活動主辦方所有</p>
    </div>
  </div>
</template>

<script>
import getDate from "../../utils/getDate"
export default {
  data() {
    return {
      type: 1,
      stime: '',
      etime: ''
    }
  },
  computed: {
    timer() {
      return getDate(new Date(this.stime * 1000), 3) + '-' + getDate(new Date(this.etime * 1000), 3)
    }
  },
  created() {
    document.title = '規則&獎勵'
    this.stime = sessionStorage.getItem('stime')
    this.etime = sessionStorage.getItem('etime')
  },
  methods: {
    tabClick(val) {
      this.type = val
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #8338d0;
}
.red {
  color: orange !important;
  font-weight: 600;
}
.rule {
  padding: 0.54rem 0.26rem;
  font-weight: 500;
  h5 {
    text-align: center;
    margin: 0.31rem auto;
    color: #ffe6b5;

    font-size: 0.28rem;
  }
  h6 {
    color: #30ffee;
    font-size: 0.26rem;
    margin-top: 0.31rem;
  }
  p {
    font-size: 0.22rem;
    color: #e6a3ff;
  }
  .tabs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 6.98rem;
    height: 0.98rem;
    background: url(../../assets/img/tasBg.png);
    background-size: 100% 100%;
    span {
      width: 3.46rem;
      height: 0.9rem;
      text-align: center;
      line-height: 0.9rem;
      &.act {
        background: url(../../assets/img/ruleAct.png);
        background-size: 100% 100%;
      }
    }
  }
  .wardImg {
    width: 6.5rem;
    height: 6.11rem;
    display: block;
    margin: 0 auto;
  }
  .actTime {
    text-align: center;
    color: #ffe6b5;
    font-weight: 500;
    font-size: 0.26rem;
    margin-top: 0.27rem;
  }
  .ruleItem {
    .lastTips {
      margin-top: 5.8rem;
      text-align: center;
      color: #6628af;
    }
  }
  .wardItem {
    .lastTips {
      margin-top: 2rem;
      text-align: center;
      color: #6628af;
    }
  }
  .mt {
    margin-top: 0.35rem;
  }
}
@import "../../assets/scss/common.scss";
</style>
