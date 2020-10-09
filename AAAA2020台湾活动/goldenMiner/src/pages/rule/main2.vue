<template>
  <div class="rule">
    <div class="tabs">
      <span :class="{act:showType== 0}" @click="tabClick(0)">活動規則</span>
      <span :class="{act:showType== 1}" @click="tabClick(1)">活動獎勵</span>
    </div>
    <div class="rules" v-show="showType == 0">
      <p class="actTime">2020年10月9日18:00:00-10月23日20:00:00</p>
      <h5>財富值排名規則</h5>
      <p>1.按照報名參賽後，通過挖掘礦產贏得的財富值排名，點擊報名後，完成的每日任務和儲值任務的數據才會被記錄哦~ <span>財富值=挖掘礦產+解救礦工獎勵的總財富值</span></p>
      <img src="../../assets/img/ruleImg1.png" alt="" class="ruleImg1">
      <p>2.若獲得的財富值相同，則先到達該財富值的排名在前面</p>
      <p>3.總榜單展示前100名用戶的比賽成績</p>
      <h5>任務說明</h5>
      <p>1.充值任務：每充值50金幣即可獲得1次挖掘次數，通過挖掘礦產和解救礦工贏得財富值，兌換好禮</p>
      <p>2.每日任務：前一天發佈的任意一首公開作品未刪除的任務要求，當天12:00檢測前一天的公開作品，如果作品未刪除，則發放1次挖掘次數</p>
      <h5>挖掘攻略</h5>
      <div class="block1">
        <p>1.深層的礦產需要將正對著的淺層礦產挖掘后才可挖掘；當礦產全部挖掘完成和礦工全部救出後，則一輪挖掘結束，可開啟新一輪挖掘</p>
        <p>2.每一列挖掘完成 <i class="red">5 </i>次挖掘，即可解救礦工1次，解救礦工可獲得不定財富值</p>
        <p>3.各種礦產的擁有一定的財富值範圍，神秘寶石財富值浮動較大</p>
        <p>4.當天凌晨挖掘次數和挖掘場景全部清零，請盡快使用</p>
        <p>5.財富值排名以活動期間累計為標準，先到達那個排名在前</p>
        <P>6.一鍵挖掘：點擊“一鍵挖掘”本輪的剩餘礦鏟全部被挖掘及剩餘礦工全部解救完成</P>
      </div>
      <h5>其他說明 </h5>
      <p class="otherTips">比賽過程中，若發現用戶使用不正當手段參與活動，小歡有權在事先不通知的前提下按情節嚴重對參賽者、違規者做取消其參賽資格或封禁帳號等處罰，包括但不限於：</p>
      <p>1）盜用或借用他人已有帳號參與活動；</p>
      <p>2）同一用戶註冊多個帳號參與活動；</p>
      <p>3）通過其他違規行為參與活動。</p>
      <p class="otherTips2">若為主動作弊者，無論是否為參賽者永久封禁該用戶所有大小號，活動結束后小歡任有權收回該用戶所有獎勵</p>
    </div>
    <div class="wards" v-show="showType == 1">
      <p class="actTime">2020年10月9日18:00:00-10月23日20:00:00</p>
      <h5 class="title1">每日獎勵</h5>
      <p class="centerTips">每日獎勵的財富值=當日累計財富值</p>
      <img src="../../assets/img/ruleImg2.png" alt="" class="ruleImg2">
      <p>1.每日獎勵以每日累積的財富值作為衡量依據，凌晨每日獎勵重新開啟計算；每日積累財富值達到一定等級，即可領取不同禮包，點擊領取，禮包當天即時派發到賬戶</p>
      <p>2.活動期間，不同等級禮包每人每天只能兌換同一等級獎勵1次，若當天未領取，獎勵自動清零</p>
      <p>3.每連續5天完成所有的每日任務，可獲得座駕法拉利（5天），獎勵立即自動派發到賬戶，用戶注意查收~</p>
      <h5>財富榜單獎勵禮物</h5>
      <div class="topGift">
        <h6>第一名：</h6>
        <p>礦產大亨徽章（30天）+赤鷹戰機（30天）+黃金寶庫作品背包禮物（666金幣）+5000金幣+5000金豆</p>
        <h6>第二名：</h6>
        <p>礦產大亨徽章（15天）+赤鷹戰機（30天）+ 黃金寶庫作品背包禮物（666金幣）+3000金幣+3000金豆</p>
        <h6>第三名：</h6>
        <p>礦產大亨徽章（7天） +赤鷹戰機（30天）+ 黃金寶庫背包禮物（666金幣）+2000金幣+2500金豆</p>
        <h6>第四-五名：</h6>
        <p>礦產大亨徽章（7天）+ 赤鷹戰機（15天）+黃金寶庫作品背包禮物（666金幣）+1500金幣+2000金豆</p>
        <h6>第六-十名：</h6>
        <p>赤鷹戰機（9天）+黃金寶庫作品背包禮物（666金幣）+1000金幣+1000金豆</p>
      </div>
      <h5>獎勵使用規則</h5>
      <div class="giftRules">
        <p>1、晉級禮物中的儲值金幣返利券，僅限領取當天23:59:59前有效，若是同一用戶同一天領取多張沒儲值額度限制儲值金幣返利券可疊加使用，返利金幣將會儲值后立刻返還到賬戶上</p>
        <p>2、獎勵的背包禮物有效期均為7天，請在有效期內使用。</p>
        <p>3、背包禮物安卓版本可在我-背包中查看，並且送禮時，可選擇背包禮物送出。IOS可前往APP STORE搜尋最新版本”高歌“，下載使用</p>
      </div>
    </div>
    <p class="lastTips">本活動的最終解釋權歸活動主辦方所有</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showType: 0
    }
  },
  created() {
    document.title = '規則&獎勵'
    sessionStorage.setItem("need-refresh", true);
  },
  methods: {
    tabClick(val) {
      this.showType = val
    }
  }
}
</script>

<style lang="scss">
body {
  background: #331106;
}
.red {
  color: red !important;
}
.rule {
  padding: 0.27rem 0.23rem;
  .tabs {
    width: 7.01rem;
    height: 0.95rem;
    display: flex;
    justify-content: space-between;
    span {
      display: block;
      width: 3.46rem;
      height: 0.95rem;
      background: url(../../assets/img/rule2.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.95rem;
      color: #5a2412;
      &.act {
        background: url(../../assets/img/rule1.png);
        background-size: 100% 100%;
      }
    }
  }
  .actTime {
    margin-top: 0.27rem;
    text-align: center;
    color: #eb9358;
    font-size: 0.24rem;
    font-weight: 700;
  }
  h5 {
    margin: 0.5rem auto 0.36rem;
    text-align: center;
    color: #fddd4e;
    font-weight: 700;
  }
  p {
    font-size: 0.24rem;
    color: #eb9358;
    font-weight: 500;
    span {
      display: block;
      text-indent: 0.25rem;
    }
  }
  .rules {
    .block1 {
      p {
        margin-bottom: 0.2rem;
      }
    }
    .ruleImg1 {
      width: 4.41rem;
      height: 3.93rem;
      margin: 0.16rem 0 0 0.24rem;
    }
    .otherTips {
      margin-bottom: 0.25rem;
    }
    .otherTips2 {
      margin-top: 0.25rem;
    }
  }
  .wards {
    .title1 {
      margin-bottom: 0.14rem;
    }
    .centerTips {
      text-align: center;
    }
    .ruleImg2 {
      width: 7.01rem;
      height: 4.89rem;
      margin: 0.2rem auto 0.14rem;
    }
    .topGift {
      h6 {
        font-size: 0.24rem;
        font-weight: 600;
        color: #eb9358;
        margin: 0.28rem 0 0.15rem;
      }
      p {
        padding-left: 0.39rem;
      }
    }
    .giftRules {
      p {
        margin-bottom: 0.25rem;
      }
    }
  }
  .lastTips {
    text-align: center;
    font-weight: 500;
    color: #9f6151;
    font-size: 0.24rem;
    margin-top: 0.74rem;
  }
}
@import "../../assets/scss/common.scss";
</style>
