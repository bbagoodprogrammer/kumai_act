<template>
  <div class="rule">
    <div class="tabs">
      <span @click="tabClick(1)" :class="{act:show== 1}">活動獎勵</span>
      <span @click="tabClick(2)" :class="{act:show== 2}">活動規則</span>
    </div>
    <div class="actTime">活動時間：1月8日18:00:00-1月27日20:00:00</div>
    <div class="wards" v-show="show == 1">
      <h3>活動獎勵</h3>
      <div class="wardImg2"></div>
      <h3>頭號玩家榜前10名獎勵</h3>
      <h6>第一名：</h6>
      <p>頭號玩家徽章（30天）+粉色薔薇座駕（30天）+7000金幣+10000金豆</p>
      <h6>第二名：</h6>
      <p>頭號玩家徽章（30天）+粉色薔薇座駕（30天）+5000金幣+8000金豆</p>
      <h6>第三名：</h6>
      <p> 頭號玩家徽章（30天）+粉色薔薇座駕（30天）+3000金幣+5000金豆</p>
      <h6>第四-五名：</h6>
      <p>粉色薔薇座駕（30天）+1000金幣+2000金豆</p>
      <h6>第六-十名：</h6>
      <p>粉色薔薇座駕（30天）+800金幣+1000金豆</p>
      <h3>歡樂地鼠榜前10名獎勵</h3>
      <h6>第一名：</h6>
      <p>頭號玩家徽章（15天）+粉色薔薇座駕（30天）+5000金幣+6000金豆</p>
      <h6>第二名：</h6>
      <p>頭號玩家徽章（15天）+粉色薔薇座駕（30天）+3000金幣+4000金豆</p>
      <h6>第三名：</h6>
      <p> 頭號玩家徽章（15天）+粉色薔薇座駕（30天）+2000金幣+3000金豆</p>
      <h6>第四-五名：</h6>
      <p>粉色薔薇座駕（30天）+800金幣+1500金豆</p>
      <h6>第六-十名：</h6>
      <p>粉色薔薇座駕（30天）+450金幣+900金豆</p>
      <h3>歡樂打地鼠解鎖等級獎勵</h3>
      <div class="wardImg3"></div>
      <h3>獎勵使用規則</h3>
      <div class="wardRule">
        <p>1、兌換的年度活動選票金豆背包禮物價值30金豆，有效期為1天，請在有效期內使用</p>
        <p>2、獎勵的搗蛋鼠作品背包禮物、搗蛋鼠K房背包禮物、搗蛋鼠語聊背包禮物、搞怪錘作品背包禮物有效期為14天，請在有效期內使用</p>
        <p>3、抽獎獲得的滿100返10金幣返利券，僅限領取後24小時內有效，返利金幣將在消費後返還到賬戶上</p>
        <p>4、抽獎獲得的3%儲值金幣返利券及2%儲值金幣返利券，僅限領取後24小時內有效，儲值券額度可疊加，返利金幣將在每次儲值後返還到賬戶上</p>
        <p>5、頭號玩家榜前10名和歡樂地鼠榜前10名獎勵將在活動結束後7個工作日內發放</p>
      </div>
    </div>
    <div class="rules" v-show="show==2">
      <h3>活動規則</h3>
      <h6>活動報名：</h6>
      <p>點擊“立即報名”即可參加活動，報名後的活動數據才會被計算</p>
      <h6>頭號玩家榜榜單排名規則：</h6>
      <p>1、按照報名活動後，獲得的玩樂值排名。玩樂值為總使用的遊戲幣數量</p>
      <p>2、通過完成每日任務、幫歌友加油及被歌友加油均可獲得遊戲幣；可通過歡樂打地鼠、年度選票兌換、幸運大轉盤這3個遊樂項目使用遊戲幣</p>
      <p>3、若玩樂值相同，則先到達該玩樂值的排名在前面</p>
      <p>4、榜單展示前100名用戶的比賽成績</p>
      <h6>歡樂地鼠榜榜單排名規則：</h6>
      <p>1、按照報名活動後，根據歡樂打地鼠項目獲得的分數排名</p>
      <p>2、若獲得的分數相同，則先到達該分數的排名在前面</p>
      <p>3、榜單展示前100名用戶的比賽成績</p>
      <h6>遊戲幣獲取攻略：</h6>
      <p>
        可通過完成每日任務、幫歌友加油及被歌友加油均可獲得遊戲幣；</br>
        遊戲幣自動到賬，獲得遊戲幣每日清0
      </p>
      <h6>完成每日任務獲得遊戲幣：</h6>
      <p>每日挑戰任務及對應遊戲幣如下:</p>
      <div class="taskImg"></div>
      <p class="ps">PS.送金豆禮及送金幣禮任務，向作品/K房/語聊房送禮均計算在內</p>
      <h6>幫好友加油贏遊戲幣：</h6>
      <p>1、每日最多可幫3位好友加油，每日最多被3位好友加油</p>
      <p>2、幫對方加油一次，可雙方增加5個遊戲幣</p>
      <h3>遊戲幣使用攻略</h3>
      <h6>歡樂打地鼠：</h6>
      <p>使用20遊戲幣兌換1次打地鼠遊戲，達到相應的分數可解鎖對應的獎勵</p>
      <h6>年度選票兌換：</h6>
      <p>1、年度活動開放時間內兌換，送給對應活動參賽者，可為參賽者加分</p>
      <p>2、兌換1張選票花費20遊戲幣</p>
      <p>3、每人每天僅限兌換1張同個活動選票；選票兌換後可在我的背包查看</p>
      <p>4、每張選票價值30金豆，有效期為1天，請在有效期內送出哦</p>
      <h6>幸運大轉盤：</h6>
      <p>每次抽獎花費20遊戲幣，抽到的獎勵即時到賬</p>
      <h3>其他說明</h3>
      <div class="jinggao">
        比賽過程中，若發現用戶使用不正當手段參與活動，小歡有權在事先不通知的前提下按情節嚴重對參賽者、違規者做取消其參賽資格或封禁帳號等處罰，包括但不限於：
        <p>1）盜用或借用他人已有帳號參與活動；</p>
        <p>2）同一用戶註冊多個帳號參與活動；</p>
        <p>3）比賽期間對參賽作品或參賽者進行惡意評論，廣告等；</p>
        <p>4）通過其他違規行為參與活動。若為主動作弊者，無論是否為參賽者永久封禁該用戶所有大小號，活動結束后小歡任有權收回該用戶所有獎勵</p>
      </div>
    </div>
    <p class="lastTips">本活動的最終解釋權歸活動主辦方所有</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: 1
    }
  },
  methods: {
    tabClick(val) {
      this.show = val
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #d94343;
}
.rule {
  padding: 0.29rem 0.41rem;
  .tabs {
    display: flex;
    justify-content: space-between;
    span {
      display: block;
      width: 3.3rem;
      height: 0.81rem;
      color: #ffd145;
      font-size: 93%;
      background: url(../../assets/img/ruleBg.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.81rem;
      &.act {
        color: #b98300;
        background: url(../../assets/img/ruleBgAct.png);
        background-size: 100% 100%;
      }
    }
  }
  .actTime {
    font-size: 80%;
    color: #ffa365;
    margin: 0.21rem auto 0;
    text-align: center;
  }
  h3 {
    margin: 0.46rem 0 0.31rem;
    text-align: center;
    color: #ffdc7f;
  }
  .wardImg2 {
    width: 6.35rem;
    height: 6.11rem;
    background: url(../../assets/img/wardImg2.png);
    background-size: 100% 100%;
    margin: 0 auto;
  }
  .wardImg3 {
    width: 5.59rem;
    height: 4.53rem;
    background: url(../../assets/img/wardImg.png);
    background-size: 100% 100%;
    margin: 0 auto;
  }
  h6,
  p {
    font-size: 70%;
    color: #ffddc7;
  }
  .wardRule {
    p {
      margin-top: 0.15rem;
    }
  }
  > p {
    padding-left: 0.4rem;
  }
  .lastTips {
    font-size: 80%;
    text-align: center;
    color: #e68d51;
    margin-top: 0.8rem;
  }
  .taskImg {
    width: 6.38rem;
    height: 6.81rem;
    background: url(../../assets/img/taskImg.png);
    background-size: 100% 100%;
    margin: 0.1rem 0 0 0.4rem;
  }

  .ps {
    color: #ffc29a;
  }
  .wards {
    p {
      margin-bottom: 0.15rem;
    }
  }
  .rules {
    h6 {
      font-size: 90%;
      margin-top: 0.25rem;
      font-weight: 700;
    }
    p {
      font-size: 70%;
      padding-left: 0.4rem;
      font-weight: 500;
    }
    .jinggao {
      font-size: 0.2rem;
      color: #ffddc7;
      p {
        font-size: 0.2rem !important;
      }
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
