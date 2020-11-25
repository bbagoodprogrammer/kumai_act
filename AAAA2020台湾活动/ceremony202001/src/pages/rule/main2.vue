<template>
  <div class="rule">
    <div class="taskTabs">
      <span class="p1Tab1" :class="{act:type==1}" @click="tabClick(1)"></span>
      <span class="p1Tab2" :class="{act:type==2}" @click="tabClick(2)"></span>
    </div>
    <div class="gifts" v-if="type == 1">
      <h5>活動時間</h5>
      <p>11月12日18:00:00-12月28日20:00:00</p>
      <h5>活動獎勵</h5>
      <div class="giftsItem">
        <div class="item" v-for="(item,index) in 28" :key="index">
          <div class="imgBg">
            <img :src="require(`../../assets/img/ruleGifts/${item}.png`)" alt="">
          </div>
          <strong v-html="giftName[index]"></strong>
        </div>
      </div>
      <h5>抽獎好禮多-歡樂嘉年華榜單獎勵</h5>
      <h6 class="minTop">第一名:</h6>
      <p>歡樂嘉年華徽章（1個月）+紅毯座駕（1個月）+3000金幣+6000金豆</p>
      <h6>第二名：</h6>
      <p>歡樂嘉年華徽章（1個月）+紅毯座駕（1個月）+2000金幣+4000金豆</p>
      <h6>第三名：</h6>
      <p>歡樂嘉年華徽章（1個月）+紅毯座駕（1個月）+1500金幣+3000金豆</p>
      <h6>第四-十名：</h6>
      <p>歡樂嘉年華徽章（1個月）+紅毯座駕（1個月）+1000金幣+2000金豆</p>
      <h6>第十一-三十名：</h6>
      <p>歡樂嘉年華徽章（15天）+紅毯座駕（1個月）+500金幣+1000金豆</p>
      <h5>助攻VIP-等級獎勵</h5>
      <img src="../../assets/img/rules/img1.png" alt="" class="img1">
      <p class="ps">PS.每個等級對應的寶箱獎勵僅可被領取1次</p>
      <h5>助攻MVP-助攻MVP榜單獎勵</h5>
      <h6 class="minTop">第一名：</h6>
      <p>歡歌助攻MVP認證（1年）+助攻MVP徽章（1個月）+紅毯座駕（1個月）+助攻MVP頭飾（1個月）+會員VIP（1個月）+彩虹獨角獸背包禮物（399金幣）*3+6000金幣+6000金豆</p>
      <h6>第二名：</h6>
      <p>歡歌助攻MVP認證（6個月）+助攻MVP徽章（1個月）+紅毯座駕（1個月）+助攻MVP頭飾（1個月）+會員VIP（1個月）+彩虹獨角獸背包禮物（399金幣）*3+4500金幣+4500金豆</p>
      <h6>第三名：</h6>
      <p>歡歌助攻MVP認證（3個月）+助攻MVP徽章（1個月）+紅毯座駕（1個月）+助攻MVP頭飾（1個月）+會員VIP（1個月）+彩虹獨角獸背包禮物（399金幣）*3+3000金幣+3000金豆</p>
      <h6>第四-五名：</h6>
      <p>助攻MVP徽章（1個月）+紅毯座駕（1個月）+助攻MVP頭飾（1個月）+會員VIP（1個月）+彩虹獨角獸背包禮物（399金幣）*2+2000金幣+2000金豆</p>
      <h6>第六-十名：</h6>
      <p>助攻MVP徽章（1個月）+紅毯座駕（1個月）+助攻MVP頭飾（1個月）+會員VIP（1個月）+彩虹獨角獸背包禮物（399金幣）*1+1500金幣+1500金豆</p>
      <h5>禮物冠名-解鎖獎勵</h5>
      <img src="../../assets/img/rules/img2.png" alt="" class="img2">
      <p class="ps">PS.每個等級的獎勵限領取一次</p>
      <h5>禮物冠名-各禮物冠軍榜單獎勵</h5>
      <img src="../../assets/img/rules/img3.png" alt="" class="img3">
      <h5 class="other">獎勵使用規則</h5>
      <p>
        1、活動獎勵將在活動結束後14個工作日內派發<br />
        2、獎勵的背包禮物有效期均為7天<br />
        3、禮物冠名獎勵將把冠名用戶信息展示在禮物購買面板上
      </p>
    </div>
    <div class="ruleItem" v-else>
      <h5>活動時間</h5>
      <p>11月12日18:00:00-12月28日20:00:00</p>
      <h5>活動規則</h5>
      <h6 class="minTop">活動報名</h6>
      <p>1、點擊“立即報名”即可參加抽獎好禮多、助攻MVP、禮物冠名環節的活動，活動數據將在點擊報名後計算；12%儲值返利環節以及高光時刻環節無需報名即可參與</p>
      <h5>抽獎好禮多</h5>
      <h6 class="minTop">抽獎好禮多-規則</h6>
      <p>
        1、通過完成每日任務可獲得盛典幣，盛典幣自動到賬，獲得盛典幣活動期間內有效,獲得盛典幣每日清0，請盡快使用哦<br />
        2、前一天發佈的任意一首公開非收錄作品未刪除的任務，會在當天12:00檢測前一天的公開作品，如果作品未刪除，則視為完成任務，發放20盛典幣<br />
        3、盛典幣可用于抽獎，抽中獎勵即時到賬<br />
        4、抽中的歡卡為年度人物評選活動的投票券，可在年度人物評選活動投出
      </p>
      <h6>抽獎好禮多-歡樂嘉年華榜單排名規則</h6>
      <p>1、根據報名後獲得的歡樂值排名，歡樂值=使用的盛典幣數量；若分數相同，先達到的排名在前面</p>
      <h5>助攻MVP</h5>
      <h6 class="minTop">助攻MVP-規則</h6>
      <p>1、送出1金幣禮物累計10助攻值，助攻值達到1000、10000、50000、100000、200000、300000、400000、500000可以可以領取對應的寶箱獎勵</p>
      <h6>助攻MVP-助攻MVP榜單排名規則</h6>
      <p>1、根據報名後在作品及K房送出的金幣禮物魅力值排名，若分數相同，先達到的排名在前面</p>
      <h5>禮物冠名</h5>
      <h6 class="minTop">禮物冠名-規則</h6>
      <p>1、設置6個盛典特定禮物，獲得該特定禮物數量最高的用戶，獲得該禮物冠名權</p>
      <h6>禮物冠名-6個盛典特定禮物冠名榜單排名規則</h6>
      <p>1、根據報名後收到該特定禮物的數量排名，若分數相同，先達到的排名在前面</p>
      <h5>12%儲值返利</h5>
      <h6 class="minTop">12%儲值返利-規則</h6>
      <p>
        1、11月26日感恩節以及12月25日聖誕節當天儲值任意金幣即送12%的返利金幣（不包括系統贈送）<br />
        2、活動期間每筆儲值成功後返利金幣立即到帳
      </p>
      <h6>12儲值返利-儲值排名規則</h6>
      <p>1、11月26日感恩節儲值12%返利以及12月25日聖誕節12%儲值返利各設置1個榜單，都根據當天的儲值金幣數排名</p>
      <h5>高光時刻</h5>
      <h6 class="minTop">高光時刻-規則</h6>
      <p>1、以下活動指定時間段，21:00:00-21:10:00獲得的分數額外加成10%</p>
      <h6>年度魅力歌王大賽</h6>
      <p class="ytime">11月16日-11月24日</p>
      <h6>年度K房男神女神賽</h6>
      <p class="ytime">11月23日-12月3日</p>
      <h6>年度C位爭奪賽</h6>
      <p class="ytime">11月30日-12月8日</p>
      <h6>年度最強家族戰 </h6>
      <p class="ytime">12月22日-12月24日</p>
      <h5 class="other">其他說明</h5>
      <p>比賽過程中，若發現用戶使用不正當手段參與活動，小歡有權在事先不通知的前提下按情節嚴重對參賽者、違規者做取消其參賽資格或封禁帳號等處罰，包括但不限於：</p>
      <p>
        1）盜用或借用他人已有帳號參與活動；<br />
        2）同一用戶註冊多個帳號參與活動；<br />
        3）比賽期間對參賽作品或參賽者進行惡意評論，廣告等；<br />
        4）通過其他違規行為參與活動。 若為主動作弊者，無論是否為參賽者永久封禁該用戶所有大小號，活動結束后小歡任有權收回該用戶所有獎勵
      </p>
    </div>
    <p class="lastTips">本活動的最終解釋權歸活動主辦方所有</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: 1,
      giftName: [
        '助攻MVP<br/>認證',
        '禮物冠名',
        '歡樂嘉年華<br/>徽章',
        '初級助攻<br/>徽章',
        '中級助攻<br/>徽章',
        '高級助攻<br/>徽章',
        '助攻MVP<br/>徽章',
        '支持你<br/>徽章',
        '玫瑰花束<br/>徽章',
        '彩虹獨角獸<br/>徽章',
        '應援棒<br/>徽章',
        '巨星登場<br/>徽章',
        '告白煙火<br/>徽章',
        '紅毯座駕',
        '馴鹿座駕',
        '白玉仙舟<br/>座駕',
        '中級助攻<br/>頭飾',
        '高級助攻<br/>頭飾',
        '助攻MVP<br/>頭飾',
        '抽獎獎勵<br/>背包禮物',
        '助攻獎勵<br/> 背包禮物',
        '儲值返利獎勵<br/>背包禮物',
        '邁凱倫座駕',
        'GTR座駕',
        '儲值返利券',
        '送禮返利券',
        '海量金幣',
        '海量金豆'
      ]
    }
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
  background-color: RGBA(35, 27, 40, 1);
  .rule {
    padding: 0.37rem 0.18rem 0;
    .taskTabs {
      display: flex;
      justify-content: center;
      span {
        width: 3.54rem;
        height: 0.88rem;
      }
      .p1Tab1 {
        background: url(../../assets/img/rules/ruleTab1.png);
        background-size: 100% 100%;
        &.act {
          background: url(../../assets/img/rules/ruleTab1_act.png);
          background-size: 100% 100%;
        }
      }

      .p1Tab2 {
        background: url(../../assets/img/rules/ruleTab2.png);
        background-size: 100% 100%;
        &.act {
          background: url(../../assets/img/rules/ruleTab2_act.png);
          background-size: 100% 100%;
        }
      }
    }
    .gifts,
    .ruleItem {
      margin-top: 0.1rem;
      padding: 0 0.08rem;
      h5 {
        font-size: 0.32rem;
        color: rgba(254, 249, 120, 1);
        font-weight: bold;
        margin-top: 0.4rem;
      }
      h6 {
        font-size: 0.28rem;
        color: rgba(255, 128, 34, 1);
        padding-left: 0.64rem;
        margin-top: 0.5rem;
      }
      p {
        font-size: 0.28rem;
        padding-left: 0.64rem;
      }
      .ps {
        font-size: 0.31rem;
        padding-left: 0;
      }
      img {
        margin: 0.18rem auto;
      }
      .img1 {
        width: 7.02rem;
        height: 14.18rem;
      }
      .img2 {
        width: 7.02rem;
        height: 7.02rem;
      }
      .img3 {
        width: 7.02rem;
        height: 18.36rem;
      }
    }
    .giftsItem {
      width: 6.31rem;
      height: 17.57rem;
      padding: 0.81rem 0.48rem 0;
      background: url(../../assets/img/ruleGifts/rulebg.png);
      background-size: 100% 100%;
      margin-left: -0.15rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .item {
        .imgBg {
          width: 1.4rem;
          height: 1.4rem;
          background: url(../../assets/img/luckBg.png);
          background-size: 100% 100%;
          margin: 0 auto;
          img {
            width: 1.4rem;
            height: 1.4rem;
            margin: 0 auto;
          }
        }

        strong {
          display: block;
          font-size: 0.24rem;
          text-align: center;
        }
      }
    }
    .minTop {
      margin-top: 0.29rem !important;
    }
    .ytime {
      color: rgba(252, 245, 193, 1);
    }
    .other {
      margin-bottom: 0.28rem;
    }
  }
  .lastTips {
    text-align: center;
    margin: 1.25rem 0 0.6rem;
  }
}
@import "../../assets/scss/common.scss";
</style>
