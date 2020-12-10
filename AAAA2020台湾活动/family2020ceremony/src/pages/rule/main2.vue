<template>
  <div class="rule">
    <div class="tabs">
      <span :class="{act:type==1}" @click="tabClick(1)">活動規則</span>
      <span :class="{act:type==2}" @click="tabClick(2)">活動獎勵</span>
    </div>
    <!-- <div class="actTime">活動時間：{{timer}}</div> -->
    <div class="ruleItem" v-if="type==1">
      <div class="topTips textColor">
        <p>年度最強家族戰僅限家族用戶參加，所有家族自動報名參賽， 無需報名</p>
        <p>若非家族用戶想參加本活動，可以點擊報名參加，進行加入家族或者申請創建家族來參與活動</p>
        <p>年度最強家族賽分爲三個賽程：守護家族—家族PK—家族爭霸</p>
      </div>
      <h6>一、守護家族</h6>
      <p>1、比賽時間：12月14日12:00:00-12月17日23:59:59 </p>
      <p>2、本賽段閃光值=守護值+家族成員作品/K房金幣收禮魅力值</p>
      <p>3、家族用戶通過完成家族任務和收禮來積累閃光值</p>
      <p>4.本賽段結束後，排名榜前300名的家族晉級家族PK，本賽段前三十家族獲得家族大禮包，按照家族貢獻閃光值發給家族成員（本賽段對家族有閃光值貢獻的用戶才能獲得家族大禮包獎勵）</p>
      <p>5、守護家族期間退出家族則榜單數據不清除，重新加入原來家族可繼續累積閃光值，重新創建或加入其他家族重新累積閃光值</p>
      <h6>二、家族PK</h6>
      <p>1、比賽時間：12月18日00:00:00-12月21日23:59:59</p>
      <p>2、本賽段閃光值=家族成員作品/K房金幣收禮魅力值</p>
      <p>3、晉級家族倆倆隨機PK（隨機匹配）依據本賽段時間的閃光值判定勝負，同分同時淘汰，本賽段前十五的家族獲得家族大禮包（無論輸贏），按照家族貢獻閃光值分發給家族成員（本賽段對家族有閃光值貢獻的用戶才能獲得家族大禮包獎勵）</p>
      <p>4、送出特定家族禮物可獲得3%的閃光值加成</p>
      <p>5、家族PK期間退出家族則榜單數據不清除，重新加入原來家族可繼續累積閃光值，重新創建或加入其他家族視為未晉級</p>
      <p>6.PK雙方分數相同，則倆個家族都無法晉級</p>
      <h6>三、家族爭霸</h6>
      <p>1、比賽時間：12月22日00:00:00-12月25日20:00</p>
      <p>2、本賽段閃光值=家族成員作品/K房金幣收禮魅力值，本賽段每日21：00-21:10收禮獲得10%加成，本賽段年度家族前五十的家族也可拿到6-10%的閃光值加成 </p>
      <p>3、晉級家族依據本賽段的閃光值排名，第一名獲得年度最強家族，第二三名為年度家族</p>
      <p>4、前十名的家族及其家族成員均獲得豐厚獎勵</p>
      <p>5、家族爭霸期間退出家族則榜單數據不清除，重新加入原來家族可繼續累積閃光值，重新創建或加入其他家族視為未晉級</p>
    </div>
    <div class="wardItem" v-else>
      <img src="../../assets/img/wardImg.png" alt="" class="wardImg">
      <h6>第1名家族</h6>
      <p>1、所有家族成員獎勵年度家族徽章（1個月）</p>
      <p>2、家族等級積分10000+K房人數上限提升至800人（永久）</p>
      <p>3、所有家族成員獎勵800金豆 </p>
      <p>4、家族冠軍頭飾（1個月）</p>
      <p>5、家族主頁背景（1個月）</p>
      <p>6、家族專屬邊框（1個月）</p>
      <h6 class="textColor">家族成員貢獻閃光值的排名獎勵 </h6>
      <p>第一名：K房禮物仲夏夜之夢（3520金幣）+1000金幣 +紅毯座駕（1個月） </p>
      <p>第二名：K房禮物海豚有夢（2520金幣）+ 800金幣+紅毯座駕（1個月） </p>
      <p>第三名：作品禮物鹿小姐（999金幣）+ 500金幣 +紅毯座駕（1個月） </p>
      <p>第四名：K房禮物鐘情於你（520金幣）+ 300金幣 +紅毯座駕 （1個月） </p>
      <p>第五名：作品禮物浪漫摩天輪（388金幣）+100金幣 + 紅毯座駕 （1個月） </p>
      <h6>第2名家族 </h6>
      <p>1、所有家族成員獎勵年度家族徽章（1個月） </p>
      <p>2、家族等級積分8000+K房人數上限提升至700人（永久） </p>
      <p>3、所有家族成員獎勵700金豆 </p>
      <p>4、家族亞軍頭飾（1個月）</p>
      <p>5、家族主頁背景（1個月）</p>
      <p>6、家族專屬邊框（1個月）</p>
      <h6 class="textColor">家族成員貢獻閃光值排名獎勵 </h6>
      <p>第一名：K房禮物海豚有夢（2520金幣）+ 800金幣 + 紅毯座駕（1個月） </p>
      <p>第二名：作品禮物鹿小姐（999金幣）+ 500金幣 + 紅毯座駕（1個月） </p>
      <p>第三名：K房禮物鐘情於你（520金幣）+ 300金幣 + 紅毯座駕（1個月）</p>
      <p>第四名：作品禮物浪漫摩天輪（388金幣）+100金幣 + 紅毯座駕（1個月）</p>
      <p>第五名：K房禮物LOVE YOU（150金幣）+80金幣 + 紅毯座駕（1個月） </p>
      <h6>第3名家族 </h6>
      <p>1、所有家族成員獎勵年度家族徽章（1個月） </p>
      <p>2、家族等級積分5000+K房人數上限提升至600人（永久）</p>
      <p>3、所有家族成員獎勵600金豆 </p>
      <p>4、家族季軍頭飾（1個月）</p>
      <p>5、家族主頁背景（1個月）</p>
      <p>6、家族專屬邊框（1個月）</p>
      <h6 class="textColor">家族成員貢獻閃光值排名獎勵 </h6>
      <p>第一名：作品禮物鹿小姐（999金幣）+ 500金幣 + 紅毯座駕（1個月）</p>
      <p>第二名：K房禮物鐘情於你（520金幣）+ 300金幣 + 紅毯座駕（1個月） </p>
      <p>第三名：作品禮物浪漫摩天輪（388金幣）+100金幣 + 紅毯座駕（1個月）</p>
      <p>第四-五名：K房禮物LOVE YOU（150金幣）+80金幣 + 紅毯座駕（1個月） </p>
      <h6>第4-10名家族 </h6>
      <p>1、所有家族成員獎勵年度家族徽章（1個月） </p>
      <p>2、家族等級積分2000+K房人數上限提升至500人（永久）</p>
      <p>3、所有家族成員獎勵500金豆 </p>
      <h6 class="textColor">家族成員貢獻獎勵 </h6>
      <p>第一名：K房禮物鐘情於你（520金幣）+ 300金幣 </p>
      <p>第二名：作品禮物浪漫摩天輪（388金幣）+100金幣 </p>
      <p>第三-五名：K房禮物LOVE YOU（150金幣）+80金幣 </p>
      <h5>守護家族賽段家族大禮包（2000金幣）*30</h5>
      <h6 class="textColor minsize">本賽段前三十名閃光值的家族，各家族前50名家族成員獲得1個獎勵，家族成員貢獻閃光值越高獲得珍稀禮物的機會越大
        <br />備註：若家族成員不滿足50人或守護家族榜不足50人，則多餘獎勵視為無效</h6>
      <img src="../../assets/img/wardImg2.png" alt="" class="wardImg2">
      <h5>家族PK賽段家族大禮包（5000金幣）*15</h5>
      <h6 class="textColor minsize">本賽段前十五名閃光值的家族（無論輸贏），前60名家族成員獲得1個獎勵，家族成員貢獻閃光值越高獲得珍稀禮物的機會越大
        <br />備註：若家族成員不滿足60人或家族PK榜不足60人，則多餘獎勵視為無效
      </h6>
      <img src="../../assets/img/wardImg3.png" alt="" class="wardImg2">
      <h6>備註：</h6>
      <p>1、家族爭霸階段，貢獻榜家族成員不足5位則多餘獎勵視為無效 </p>
      <p>2、家族大禮包的發放以賽段結束時家族成員的數量和閃光值貢獻排名為標準</p>
      <p>3、K房人數上限提升自獎勵發放之日起計算</p>
      <p>4、活動結束後7個工作日內工作人員將聯繫家族長統計獎勵信息，逾期未提交視為自動放棄 </p>
      <p>5、家族成員信息統計於活動截止時為準，獎勵於活動結束後7個工作日內發放</p>
      <p>6、頭飾和活動獎勵特效禮物請更新至最新版本軟體使用，否則可能會錯過絢麗特效哦</p>
      <p>7、所有的背包禮物獎勵有效期為7天</p>
    </div>
    <p class="lastTips">活動最終解釋權歸主辦方所有</p>
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
  background-color: rgba(29, 14, 9, 1);
}
.giftBox {
  width: 5.34rem;
  height: 3.13rem;
  display: block;
  margin: 0 auto;
}
.giftTIps {
  text-align: center;
}
.textColor {
  color: rgba(255, 181, 104, 1) !important;
  font-weight: 600;
}
.rule {
  padding: 0.54rem 0.26rem;
  font-weight: 500;
  .tabs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 6.88rem;
    height: 0.81rem;
    padding: 0 0.07rem;
    background: url(../../assets/img/tabs.png);
    background-size: 100% 100%;
    span {
      width: 3.55rem;
      height: 0.82rem;
      text-align: center;
      line-height: 0.82rem;
      color: rgba(142, 105, 63, 1);
      &.act {
        color: rgba(29, 14, 9, 1);
        background: url(../../assets/img/actTabs.png);
        background-size: 100% 100%;
      }
    }
  }
  .ruleItem {
    padding: 0 0.25rem;
    .topTips {
      margin-top: 0.37rem;
      p {
        color: rgba(255, 181, 104, 1);
        margin-bottom: 0.2rem;
      }
    }
  }
  h6 {
    color: rgba(255, 248, 129, 1);
    font-size: 0.28rem;
    font-weight: 500;
    margin: 0.5rem 0 0.15rem;
  }
  h5 {
    color: rgba(255, 248, 129, 1);
    font-size: 0.26rem;
    margin: 0.53rem 0 0;
  }
  p {
    color: rgba(179, 181, 144, 1);
    font-size: 0.22rem;
    margin-bottom: 0.15rem;
  }
  .wardImg2 {
    width: 6.72rem;
    height: 1.92rem;
    margin: 0 auto;
  }
}
.minsize {
  font-size: 0.22rem !important;
  margin: 0.05rem 0 0.11rem !important;
}
.mag {
  margin: 0 !important;
}
.wardImg {
  display: block;
  width: 6.59rem;
  height: 4.07rem;
  margin: 0.35rem auto;
}
.lastTips {
  color: rgba(181, 120, 88, 1) !important;
  font-size: 0.24rem;
  margin: 1.7rem auto 0.45rem;
  text-align: center;
}
@import "../../assets/scss/common.scss";
</style>
