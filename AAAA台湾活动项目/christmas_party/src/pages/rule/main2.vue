<template>
  <div class="rule">
    <div class="tabs">
      <span :class="{act:showType == 'wards'}" @click="clickTab('wards')">活動獎勵</span>
      <span :class="{act:showType == 'rules'}" @click="clickTab('rules')">活動規則</span>
    </div>
    <div class="ward" v-show="showType == 'wards'">
      <p class="actTime">活動時間：12月17日18:00:00-12月28日20:00:00</p>
      <div class="wardImg"></div>
      <h3>狂歡總榜前10名獎勵</h3>
      <div class="rankTop10">
        <h6>第一名：</h6>
        <p>OPPO A5 2020手機+聖誕快樂徽章（30天）+100000富豪值（價值100000金幣）+聖誕麋鹿座駕（28天）+聖誕水晶球K房特效禮物（2288金幣）+5000金豆</p>
        <h6>第二名：</h6>
        <p>寶麗來snap拍立得+聖誕快樂徽章（15天）+45000富豪值（價值45000金幣）+聖誕麋鹿座駕（28天）+聖誕水晶球K房特效禮物（2288金幣）+3000金豆</p>
        <h6>第三名：</h6>
        <p>Beats EP 耳機+聖誕快樂徽章（7天）+30000富豪值（價值30000金幣）+聖誕麋鹿座駕（28天）+聖誕水晶球K房特效禮物（2288金幣）+2500金豆</p>
        <h6>第四-五名：</h6>
        <p>聖誕快樂徽章（7天）+聖誕麋鹿座駕（28天）+聖誕水晶球K房特效禮物（2288金幣）+2000金幣+2000金豆</p>
        <h6>第六-十名：</h6>
        <p>聖誕麋鹿座駕（28天）+聖誕水晶球K房特效禮物（2288金幣）+1000金幣+1000金豆</p>
      </div>
      <h3>狂歡日榜中獎獎勵</h3>
      <div class="wardImg2"></div>
      <h3>每日聖誕禮包獎勵</h3>
      <div class="dayBar">
        <h6>當日狂歡值達到70：</h6>
        <p>獎勵100金豆，連續多天達到，獎勵金豆數更多。獎勵金豆數=100+10*連續達到天數。
          </br>比如：第1天達到，獎勵110金豆；第2天達到，獎勵120金豆；……第12天達到，獎勵220金豆</p>
        <h6>當日狂歡值達到90：</h6>
        <p>獎勵有可能為：聖誕雪花背包禮物*1（2金幣）；VIP（3天）；浪漫飛艇座駕（3天）；
          赤鷹戰機座駕（3天）；老爺車座駕（3天）</p>
        <h6>當日狂歡值達到130：</h6>
        <p>獎勵全新打造聖誕套裝背包禮物的其中1個（每個價值10金幣），聖誕套裝背包禮物共12個，活動期間每天發放的禮物不重複，不要錯過咯~</p>
        <h6>當日狂歡值達到150：</h6>
        <p>獎勵當天本人獲得的前3檔禮物的隨機1個*2。
          如當天獲得的前3檔禮物分別是150金豆、VIP（3天）、聖誕襪背包禮物（10金幣)*1，則有可能獲得300金豆、VIP（6天），或者聖誕襪背包禮物（10金幣)*2</p>
      </div>
      <h3>獎勵使用規則</h3>
      <p>1、獎勵的背包禮物有效期均為14天，請在有效期內使用。</p>
      <p>2、背包禮物安卓版本可在我-背包中查看，並且送禮時，可選擇背包禮物送出。IOS可前往APP STORE搜尋最新版本“高歌”，下載使用</p>
    </div>
    <div class="rules" v-show="showType == 'rules'">
      <p class="actTime">活動時間：12月17日18:00:00-12月28日20:00:00</p>
      <h3>活動規則</h3>
      <h6>活動報名：</h6>
      <p>1、點擊“立即報名”即可參加活動，點擊立即報名後的數據才會被計入活動成績</p>
      <p>2、需要在點擊“立即報名”後在活動頁面上上傳任意公開作品（清唱5分鐘、收錄作品除外），可上傳多首作品參賽，報名後作品收禮才會被計算，若刪除活動期間報名的參賽作品，該刪除作品收禮成績作廢</p>
      <h3>活動榜單排名規則</h3>
      <h6>狂歡總榜：</h6>
      <p>1、按照報名參賽後，獲得的狂歡值排名。狂歡值=積分值+作品/K房收到金幣禮物魅力值</p>
      <p>2、獲得積分值為通過完成每日聖誕任務獲得</p>
      <p>3、報名參加活動後，參賽作品和參賽者在K房收到的金幣禮物，可增加狂歡值，每收到1金幣禮物，折算10狂歡值</p>
      <p>4、若獲得的狂歡值相同，則先到達該狂歡值的排名在前面</p>
      <p>5、榜單展示前100名用戶的比賽成績</p>
      <h6>狂歡日榜：</h6>
      <p>1、每日狂歡值大於或等於3000的用戶可進入狂歡日榜</p>
      <p>2、進入狂歡日榜的用戶有機會獲得聖誕套裝背包禮物（120金幣）*1+聖誕麋鹿座駕（7天）獎勵。中獎概率=本人日榜狂歡值/進入日榜用戶狂歡總值。日榜狂歡值越高，中獎幾會越大</p>
      <p>3、每天的中獎人數為當天進入日榜總人數20%，獎勵多多，不可錯過唷</p>
      <p>4、將於每天晚上12點抽出中獎名單，比賽最後一天將在比賽結束時抽出，中獎背包禮物及座駕將自動發放到賬戶上</p>
      <p>PS.將不對日榜排名靠前的用戶進行額外的榜單獎勵</p>
      <h6>積分獲取：</h6>
      <p>1、可通過每天完成特定任務獲得積分；完成任務後，積分將自動到賬，且獲得積分每日清0
        </br>每日挑戰任務及對應積分值如下：</p>
      <div class="tasKImg"></div>
      <h6>每日聖誕禮物獎勵領取：</h6>
      <p>1、每日達到的積分分為4個等級：當天積分分別達到70、90、130、150，每達到一個等級，可領取對應的獎勵，領取後獎勵將自動到賬</p>
      <p>2、達到積分獲得的聖誕禮物獎勵僅限當天領取，請勿錯過唷~</p>
      <h3>其他說明</h3>
      <p>比賽過程中，若發現用戶使用不正當手段參與活動，小歡有權在事先不通知的前提下按情節嚴重對參賽者、違規者做取消其參賽資格或封禁帳號等處罰，包括但不限於：</p>
      <p>1）活動作品非本人原唱或盜錄他人作品；</p>
      <p>2）盜用或借用他人已有帳號參與活動；</p>
      <p>3）同一用戶註冊多個帳號參與活動；</p>
      <p>4）比賽期間對參賽作品進行惡意評論，廣告等；</p>
      <p>5）通過其他違規行為參與活動。</p>
      <div class="tips">若為主動作弊者，無論是否為參賽者永久封禁該用戶所有大小號，活動結束后小歡有權收回該用戶所有獎勵</div>
      <div class="tips">本活動的最終解釋權歸活動主辦方所有</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showType: 'wards'
    }
  },
  methods: {
    clickTab(val) {
      this.showType = val
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #cf3052;
}
.actTime {
  font-size: 80%;
  color: #ffefd7;
  margin: 0.36rem 0 0.28rem;
  text-align: center;
}
.rule {
  padding-top: 0.28rem;
  .tabs {
    width: 6.67rem;
    height: 0.88rem;
    background: url(../../assets/img/tabsBg.png);
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    span {
      display: block;
      width: 3.57rem;
      height: 0.85rem;
      text-align: center;
      line-height: 0.85rem;
      &.act {
        background: url(../../assets/img/tuleTabaAct.png);
        background-size: 100% 100%;
      }
    }
  }

  h3 {
    width: 4.86rem;
    height: 0.9rem;
    line-height: 0.9rem;
    background: url(../../assets/img/h3Bg.png);
    background-size: 100% 100%;
    margin: 0.29rem auto 0;
    text-align: center;
    color: #ffeabe;
  }
  h6 {
    color: #ffae00;
    font-size: 80%;
    margin-top: 0.2rem;
  }
  p {
    color: #ffd3dc;
    font-size: 73%;
  }
  .rules {
    padding: 0 0.22rem 0.7rem;
  }
  .ward {
    padding: 0 0.22rem 0.7rem;
    .wardImg {
      width: 7.05rem;
      height: 6.98rem;
      background: url(../../assets/img/wardImg.png);
      background-size: 100% 100%;
      margin: 0 auto;
    }
    p {
      color: #ffd3dc;
      font-size: 73%;
    }
    .rankTop10 {
      h6 {
        color: #ffae00;
        font-size: 80%;
        margin-top: 0.2rem;
      }
      p {
        color: #ffd3dc;
        font-size: 73%;
      }
    }
    .dayBar {
      h6 {
        color: #ffae00;
        font-size: 80%;
        margin-top: 0.2rem;
      }
      p {
        color: #ffd3dc;
        font-size: 73%;
      }
    }
    .wardImg2 {
      width: 6.6rem;
      height: 5.67rem;
      background: url(../../assets/img/wardImg2.png);
      background-size: 100% 100%;
      margin: 0 auto;
    }
  }
  .tips {
    margin-top: 0.25rem;
    color: #ffd3dc;
    font-size: 73%;
  }
  .tasKImg {
    width: 6.83rem;
    height: 6.93rem;
    background: url(../../assets/img/taskImg.png);
    background-size: 100% 100%;
    margin: 0.15rem auto;
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
