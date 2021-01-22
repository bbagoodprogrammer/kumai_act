<template>
  <div class="rule">
    <div class="topTabs">
      <span :class="{act:tab == 1}" @click="tabClick(1)">活動獎勵</span>
      <span :class="{act:tab == 2}" @click="tabClick(2)">活動規則</span>
    </div>
    <div class="ruleTips" v-if="tab == 1">
      <h5>活動時間</h5>
      <p class="tm">1月22日18:00:00-1月31日21:00:00</p>
      <img src="../../assets/img/rule/gifts.png" alt="" class="gift">
      <h5>等級抽獎獎勵-每次抽獎獎勵3個</h5>
      <img src="../../assets/img/rule/gifts2.png" alt="" class="img1">
      <h5>魅力日榜中獎獎勵</h5>
      <img src="../../assets/img/rule/gifts3.png" alt="" class="img3">
      <p>PS.魅力日榜前100名用戶中的隨機20位，可獲得5個為你鼓掌（10金幣）禮物。將於每天晚上12點抽出中獎名單，比賽最後一天將在比賽結束時抽出，中獎背包禮物將自動發放到賬戶上</p>
      <h5>魅力榜總榜前10名獎勵</h5>
      <p>第一名：<br />歡歌1月魅力代言人認證（30天）+魅力代言人大禮包獎勵（首頁加魅力代言人歌曲標籤歌曲推薦1首+2000金幣）+1月魅力代言人徽章（30天）+水瓶座頭飾（30天）+紅毯座駕（30天）+會員VIP（30天）+魅力四射背包禮物（129金幣）*3+5000金幣+5000金豆 </p>
      <p>第二名：<br /> 1月魅力代言人徽章（30天）+水瓶座頭飾（30天）+紅毯座駕（30天）+會員VIP（30天）+魅力四射背包禮物（129金幣）*2+3000金幣+3000金豆</p>
      <p>第三名：<br />1月魅力代言人徽章（30天）+水瓶座頭飾（30天）+紅毯座駕（30天）+會員VIP（30天）+魅力四射背包禮物（129金幣）*2+2000金幣+2000金豆</p>
      <p>第四-五名：<br />1月魅力代言人徽章（30天）+紅毯座駕（30天）+會員VIP（30天）+魅力四射背包禮物（129金幣）*1+1500金幣+1500金豆</p>
      <p>第六-十名：<br />紅毯座駕（30天）+會員VIP（30天）+魅力四射背包禮物（129金幣）*1+1000金幣+1000金豆</p>
      <h5>獎勵使用規則</h5>
      <p>1、本活動獎勵的背包禮物有效期均為7天，請在有效期內使用</p>
      <p>2.送禮返利券限領取後24小時內有效，返利獎勵金幣將即時發放到賬戶上</p>
    </div>
    <div class="giftItem" v-else>
      <h5 class="mb">活動時間</h5>
      <p>1月22日18:00:00-1月31日21:00:00</p>
      <h4>活動規則</h4>
      <h6>活動報名：</h6>
      <p>1、點擊“立即報名”後在活動頁面上上傳任意公開作品（清唱5分鐘除外）報名，可上傳多首作品參賽，報名後作品收禮以及收到的讚才會被計算，若刪除活動期間報名的參賽作品，該刪除作品收禮總魅力值以及收到的讚數作廢</p>
      <h5>活動榜單排名規則</h5>
      <h6>魅力總榜：</h6>
      <p>1、按照報名參賽後，獲得的星光值排名 <br />
        2、星光值獲取攻略： 星光值=參賽作品收到點讚數X10+參賽作品收到金幣禮物魅力值<br />
        <span>點讚數</span>：僅限參賽作品前30個讚計入成績<br />
        <span>金幣禮物魅力值</span>:參賽作品每收到1金幣禮物，折算10魅力值<br />
        <span>星光值加成</span>：每冠名贊助1次紅包，星光值加成2%，上限10%<br />
        3、若獲得的星光值相同，則先到達該成長值的排名在前面榜單展示前100名用戶的比賽成績

      </p>
      <h6>魅力日榜：</h6>
      <p>
        1、魅力日榜按照日榜星光值排名 <br />
        2、若獲得的日榜星光值相同，則先到達該星光值的排名在前面。日榜星光值排名前100用戶可進入魅力日榜<br />
        3、魅力日榜前100名用戶中的隨機20位，可獲得為你鼓掌禮物（10金幣）*5 <br />
        4、中獎概率=本人日榜星光值/前100名用戶當天日榜總星光值
      </p>
      <h6>等級抽獎攻略：</h6>
      <p>
        1、老虎機共有5個，星光值達到分別達到100、1000、10000、50000、100000，可抽取對應的老虎機獎勵，每次抽獎將得到3樣獎品。領取後獎勵將自動到賬，每人僅可抽取同一個老虎機獎勵1次<br />
        2、所有老虎機抽獎有效期為活動結束前，請及時抽獎唷~
      </p>
      <h6>紅包攻略：</h6>
      <p>
        1、在活動期間，帶有“魅力代言人大賽”標籤作品每收到100個“魅力四射”禮物（129金幣），會爆1次總金額888金幣的拼手氣紅包，每次爆紅包個數200個，先到先得<br />
        2、點擊“預約搶紅包”後，爆紅包時將收到系統提醒，點擊“取消預約”，則不再收到爆紅包的系統提醒
      </p>
      <h5>其他說明</h5>
      <p class="mg">比賽過程中，若發現用戶使用不正當手段參與活動，小歡有權在事先不通知的前提下按情節嚴重對參賽者、違規者做取消其參賽資格或封禁帳號等處罰，包括但不限於：</p>
      <p>
        1）活動作品非本人原唱或盜錄他人作品； <br />
        2）盜用或借用他人已有帳號參與活動；<br />
        3）同一用戶註冊多個帳號參與活動；<br />
        4）比賽期間對參賽作品進行惡意評論，廣告等； <br />
        5）通過其他違規行為參與活動。
      </p>
      <p> 若為主動作弊者，無論是否為參賽者永久封禁該用戶所有大小號，活動結束后小歡任有權收回該用戶所有獎勵</p>
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
  background-color: RGBA(162, 119, 243, 1);
  .red {
    color: rgba(252, 245, 193, 1);
  }
  .mg {
    margin: 0 !important;
  }
  .tm {
    padding-left: 0 !important;
  }
  .rule {
    padding: 0 0.14rem;
    h5,
    h4 {
      color: rgba(254, 249, 120, 1);
      font-weight: bold;
      font-size: 0.32rem;
    }
    h6 {
      color: rgba(120, 254, 139, 1);
      padding-left: 0.7rem;
    }
    h4 {
      margin-top: 0.47rem;
    }
    h5 {
      margin: 0.65rem 0 0.2rem;
    }
    p {
      font-size: 0.28rem;
      font-weight: 500;
      padding-left: 0.5rem;
      margin-bottom: 0.4rem;
      em {
        font-size: 0.28rem;
        font-weight: 500;
      }
    }
    .gift {
      width: 7.08rem;
      height: 5.16rem;
      margin: 0.27rem auto 0;
    }
    .img1 {
      width: 7.02rem;
      height: 2.26rem;
      margin: 0 auto;
    }
    .img2 {
      width: 7.02rem;
      height: 6.01rem;
      margin: 0 auto 0.34rem;
    }
    .img3 {
      width: 7.18rem;
      height: 2.13rem;
      margin: 0 auto;
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
  justify-content: center;
  align-items: center;
  background: url(../../assets/img/rankTabs.png);
  background-size: 100% 100%;
  margin: 0.38rem auto 0;
  span {
    width: 3.15rem;
    height: 0.85rem;
    text-align: center;
    line-height: 0.88rem;
    color: rgba(255, 255, 255, 0.6);
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
