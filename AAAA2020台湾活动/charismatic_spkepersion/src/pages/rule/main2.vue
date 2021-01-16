<template>
  <div class="rule">
    <div class="topTabs">
      <span :class="{act:tab == 1}" @click="tabClick(1)">活動獎勵</span>
      <span :class="{act:tab == 2}" @click="tabClick(2)">活動規則</span>
    </div>
    <div class="ruleTips" v-if="tab == 1">
      <h5>活動時間</h5>
      <p>11月16日18:00:00-11月25日20:00:00</p>
      <img src="../../assets/img/rule/gifts.png" alt="" class="gift">
      <h5>各等級寶箱獎勵</h5>
      <img src="../../assets/img/rule/img1.png" alt="" class="img1">
      <h5>紅包獎勵</h5>
      <p>1、在活動期間，帶有“年度魅力歌王大賽”活動標籤作品每收到100個“玫瑰花束”（168金幣）禮物，會爆1次總金額1088金幣的拼手氣紅包，每次爆紅包個數300個，先到先得</p>
      <h5>歡歌榜飆升獎勵</h5>
      <p>1、帶有“年度魅力歌王大賽”標籤的參賽作品，在發佈後48小時內，收到50000金幣魅力值的禮物，可在APP內的歡歌榜分數飆升20%</p>
      <h5>魅力歌王榜前10名獎勵</h5>
      <p class="mg">第一名：<br /> 10000新台幣+年度魅力歌王認證（1年）+年度魅力歌王徽章（1個月）+專屬靚號（ID4位數，需與官方溝通）+會員VIP（1年）+3%儲值返利券（6個月）+魅力歌王頭飾（1個月）+紅毯座駕（1個月）+鹿小姐作品背包禮物（666金幣）*3+10000金豆+慶功演唱會收入金幣30%現金分成</p>
      <p class="mg">第二名：<br />7000新台幣+年度魅力歌王認證（6個月）+年度魅力歌王徽章（1個月）+專屬靚號（ID4位數，需與官方溝通）+會員VIP（3個月）+3%儲值返利券（3個月）+魅力歌王頭飾（1個月）+紅毯座駕（1個月）+鹿小姐背包禮物（666金幣）*2+7000金豆+慶功演唱會收入金幣25%現金分成 </p>
      <p class="mg">第三名：<br /> 5000新台幣+年度魅力歌王認證（3個月）+年度魅力歌王徽章（1個月）+專屬靚號（ID4位數，需與官方溝通）+會員VIP（2個月）+3%儲值返利券（3個月）+魅力歌王頭飾（1個月）+紅毯座駕（1個月）+鹿小姐背包禮物（666金幣）*2+5000金豆+慶功演唱會收入金幣20%現金分成</p>
      <p class="mg">第四-五名：<br /> 年度魅力歌王徽章（1個月）+會員VIP（2個月）+3%儲值返利券（1個月）+魅力歌王頭飾（1個月）+紅毯座駕（1個月）+鹿小姐背包禮物（666金幣）+3000金幣+3000金豆</p>
      <p class="mg">第六-十名：<br /> 年度魅力歌王徽章（1個月）+會員VIP（1個月）+3%儲值返利券（1個月）+魅力歌王頭飾（1個月）+鹿小姐背包禮物（666金幣）+紅毯座駕（1個月）+2000金幣+2000金豆</p>
      <h5>獎勵使用規則</h5>
      <p>1、獎勵的背包禮物有效期均為14天，請在有效期內使用</p>
      <p>2、活動獎勵將在活動結束後14天內發放</p>
      <p>3、如獲得多個演唱會資格，則獲得最高獎勵的分成比例，不進行疊加</p>
    </div>
    <div class="giftItem" v-else>
      <h5 class="mb">活動時間</h5>
      <p>11月16日18:00:00-11月25日20:00:00</p>
      <h4>活動規則</h4>
      <h5 class="mt">活動報名</h5>
      <p>1、點擊“立即報名”後在活動頁面上上傳任意公開作品（清唱5分鐘除外）報名，可上傳多首作品參賽，報名後作品收禮以及收到的讚才會被計算，若刪除活動期間報名的參賽作品，該刪除作品收禮總魅力值以及收到的讚數作廢</p>
      <h4>活動榜單排名規則</h4>
      <h5 class="mt">魅力歌王榜</h5>
      <p class="mg">1、按照報名參賽後，獲得的閃耀值排名</p>
      <p class="mg">2、閃耀值獲取攻略：</p>
      <p class="mg">閃耀值=參賽作品收到點讚數X10+參賽作品收到金幣禮物魅力值</p>
      <p class="mg"> <em class="red">點讚數:</em> 僅限參賽作品前30個讚計入成績</p>
      <p class="mg"> <em class="red">金幣禮物魅力值:</em>參賽作品每收到1金幣禮物，折算10魅力值</p>
      <p class="mg"><em class="red">特定禮物加成:</em>參賽作品以下收到4個特定禮物，支持你（10金幣）、玫瑰花束（188金幣）、彩虹獨角獸（399金幣），作品高級福運禮盒中的啤酒乾杯（110金幣），參賽作品魅力值增幅5% </p>
      <p class="mg"><em class="red">特定時間加成:</em>活動期間21:00-21:10參賽作品收金幣禮物，魅力值額外加成10%</p>
      <p class="mg">3、2020年1-10月作品總收金幣禮魅力值排名前100名的歌友，可獲得魅力歌王榜魅力值加成，具體加成如下：</p>
      <img src="../../assets/img/rule/img2.png" alt="" class="img2">
      <p>4、若獲得的閃耀值相同，則先到達該閃耀值的排名在前面</p>
      <p>5、榜單展示前100名用戶的閃耀值</p>
      <h5>寶箱獎勵領取攻略</h5>
      <p>1、寶箱共有6個，閃耀值達到分別達到100、1000、10000、50000、100000，可領對應的寶箱獎勵，領取後獎勵將自動到賬，每人僅可領取同一個寶箱獎勵1次</p>
      <p>2、所有寶箱領取有效期為活動結束前，請及時領取唷~</p>
      <img src="../../assets/img/rule/img1.png" alt="" class="img1 mt">
      <h5>爆紅包規則</h5>
      <p>1、在活動期間，帶有“年度魅力歌王大賽”標籤作品每收到100個“玫瑰花束”禮物（168金幣），會爆1次總金額1088金幣的拼手氣紅包，每次爆紅包個數300個，先到先得</p>
      <p>2、點擊“預約搶紅包”後，爆紅包時將收到系統提醒，點擊“取消預約”，則不再收到爆紅包的系統提醒</p>
      <h5>其他說明</h5>
      <p>比賽過程中，若發現用戶使用不正當手段參與活動，小歡有權在事先不通知的前提下按情節嚴重對參賽者、違規者做取消其參賽資格或封禁帳號等處罰，包括但不限於：</p>
      <p>1）活動作品非本人原唱或盜錄他人作品；</p>
      <p>2）盜用或借用他人已有帳號參與活動；</p>
      <p>3）同一用戶註冊多個帳號參與活動；</p>
      <p>4）比賽期間對參賽作品進行惡意評論，廣告等；</p>
      <p class="mg">5）通過其他違規行為參與活動。</p>
      <p>若為主動作弊者，無論是否為參賽者永久封禁該用戶所有大小號，活動結束后小歡任有權收回該用戶所有獎勵</p>
    </div>
    <p class="lastTips">本活動的最終解釋權歸活動主辦方所有</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: 1
    }
  },
  created() {
    document.title = '規則&獎勵'
  },
  methods: {
    tabClick(val) {
      this.tab = val
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: RGBA(34, 33, 30, 1);
  .red {
    color: rgba(252, 245, 193, 1);
  }
  .rule {
    padding: 0 0.14rem;
    h5,
    h4 {
      color: rgba(254, 249, 120, 1);
      font-weight: bold;
      font-size: 0.32rem;
    }
    h4 {
      text-align: center;
      margin-top: 0.67rem;
    }
    h5 {
      margin: 0.65rem 0 0.2rem;
    }
    p {
      font-size: 0.28rem;
      font-weight: 500;
      padding-left: 0.7rem;
      em {
        font-size: 0.28rem;
        font-weight: 500;
      }
    }
    .gift {
      width: 7.22rem;
      height: 10.27rem;
      margin: 0.27rem auto 0;
    }
    .img1 {
      width: 7.02rem;
      height: 7.87rem;
      margin: 0 auto;
    }
    .img2 {
      width: 7.02rem;
      height: 6.01rem;
      margin: 0 auto 0.34rem;
    }
    .mg {
      margin-bottom: 0.5rem;
    }
    .mb {
      margin-bottom: 0;
    }
    .mt {
      margin-top: 0.2rem;
    }
    .lastTips {
      margin: 0.93rem 0 1.11rem;
      text-align: center;
    }
  }
}
.topTabs {
  width: 6.4rem;
  height: 0.88rem;
  display: flex;
  align-self: center;
  background: url(../../assets/img/rank/topTabsBg.png);
  background-size: 100% 100%;
  margin: 0.38rem auto 0;
  span {
    width: 3.2rem;
    height: 0.8rem;
    text-align: center;
    line-height: 0.88rem;
    color: rgba(144, 133, 118, 1);
    font-size: 0.28rem;
    &.act {
      font-size: 0.32rem;
      color: rgba(126, 26, 6, 1);
      background: url(../../assets/img/rank/topTabsAct.png);
      background-size: 100% 100%;
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
