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
      <h6>守護家族</h6>
      <p>1、比賽時間：11月10日12:00:00-11月14日23:59:59 </p>
      <p> 2、本賽段閃耀值=守護值+家族成員作品/K房收禮魅力值 </p>
      <p> 3、家族用戶通過完成家族任務和收禮來積累閃耀值 </p>
      <p> 4.本賽段結束後，排名榜前300名的家族晉級家族PK，本賽段前十家族獲得家族大禮包，按照家族貢獻閃耀值發給家族成員 </p>
      <p> 5、守護家族期間退出家族則榜單數據不清除，重新加入原來家族可繼續累積閃耀值，重新創建或加入其他家族重新累積閃耀值</p>
      <h6>家族PK</h6>
      <p>1、比賽時間：11月15日00:00:00-11月17日23:59:59</p>
      <p>2、本賽段閃耀值=家族成員作品/K房收禮魅力值</p>
      <p>3、晉級家族倆倆隨機PK（隨機匹配）依據本賽段時間的閃耀值判定勝負，本賽段前五的家族獲得家族大禮包，按照家族貢獻閃耀值分發給家族成員</p>
      <p> 4、送出特定家族禮物可獲得3%的閃耀值加成</p>
      <p>5、家族PK期間退出家族則榜單數據不清除，重新加入原來家族可繼續累積閃耀值，重新創建或加入其他家族視為未晉級</p>
      <h6>家族爭霸</h6>
      <p>1、比賽時間：11月18日00:00:00-11月20日22:00 </p>
      <p> 2、本賽段閃耀值=家族成員作品/K房收禮魅力值，本賽段每日21：00-21:10收禮獲得10%加成，本賽段年度家族前五十的家族也可拿到6-10%的閃耀值加成 </p>
      <p> 3、晉級家族依據本賽段的閃耀值排名，前三名家族和家族代表成為年度家族，第一名的家族獲得年度最強家族的認證 </p>
      <p>4、前十名的家族及其家族成員均獲得豐厚獎勵</p>
      <p> 5、家族爭霸期間退出家族則榜單數據不清除，重新加入原來家族可繼續累積閃耀值，重新創建或加入其他家族視為未晉級</p>
    </div>
    <div class="wardItem" v-else>
      <img src="../../assets/img/wardImg.png" alt="" class="wardImg">
      <h6>第1名家族 </h6>
      <p>1、所有家族成員獎勵年度最強家族認證 </p>
      <p> 2、所有家族成員獎勵年度家族徽章（12個月） </p>
      <p> 3、家族等級積分10000+K房人數上限提升至800人（永久） </p>
      <p> 4、所有家族成員獎勵500金豆</p>
      <p> 5、家族專屬邊框+專屬家族背景</p>
      <h6 class="textColor">家族成員貢獻獎勵</h6>
      <p> 第一名：仲夏夜之夢（3520金幣）+ 1000金幣</p>
      <p> 第二名：豚有夢（2520金幣）+ 800金幣</p>
      <p> 第三名：動感音樂會（999金幣）+ 500金幣</p>
      <p> 第四名：星河鏡（520金幣） + 300金幣</p>
      <p> 第五名：吻（288金幣）+100金幣</p>
      <h6>第2名家族 </h6>
      <p>1、所有家族成員獎勵年度家族認證 </p>
      <p>2、所有家族成員獎勵年度家族徽章（6個月） </p>
      <p>3、家族等級積分8000+K房人數上限提升至700人（永久） </p>
      <p>4、所有家族成員獎勵500金豆</p>
      <p> 5、家族專屬邊框+專屬自定義背景</p>
      <h6 class="textColor">家族成員貢獻獎勵</h6>
      <p>第一名：豚有夢（2520金幣）+ 800金幣 </p>
      <p> 第二名：動感音樂會（999金幣）+ 500金幣 </p>
      <p> 第三名：星河鏡（520金幣） + 300金幣 </p>
      <p> 第四名：吻（288金幣）+100金幣 </p>
      <p> 第五名：星光閃耀 （68金币）+80金币</p>
      <h6>第3名家族 </h6>
      <p>1、所有家族成員獎勵年度家族認證</p>
      <p>2、所有家族成員獎勵年度家族徽章（6個月）</p>
      <p> 3、家族等級積分5000+K房人數上限提升至600人（永久） </p>
      <p>4、所有家族成員獎勵300金豆</p>
      <p> 5、家族專屬邊框+專屬自定義背景</p>
      <h6 class="textColor">家族成員貢獻獎勵</h6>
      <p>第一名：動感音樂會（999金幣）+ 300金幣 </p>
      <p> 第二名：星河鏡（520金幣） + 200金幣 </p>
      <p> 第三名：吻（288金幣）+100金幣 </p>
      <p> 第四-五名：星光閃耀 （68金币）+80金币</p>
      <h6>第4-10名家族 </h6>
      <p>1、30位家族成員獎勵年度家族徽章（3個月）</p>
      <p> 2、家族等級積分2000+K房人數上限提升至500人（永久）</p>
      <p> 3、所有家族成員獎勵200金豆</p>
      <h6 class="textColor">家族成員貢獻獎勵</h6>
      <p>第一名：吻（288金幣）+100金幣 </p>
      <p> 第二名：愛你不要停（100金幣）+80金幣 </p>
      <p> 第三-五名：星光閃耀 （68金币）+70金币</p>
      <h5>守護家族賽段家族大禮包（2000金幣）*10</h5>
      <h6 class="textColor minsize">本賽段前十名的家族，家族成員按貢獻值發放</h6>
      <img src="../../assets/img/wardImg2.png" alt="" class="wardImg2">
      <h5>家族PK賽段家族大禮包（5000金幣）*5</h5>
      <h6 class="textColor minsize">本賽段前五名的家族，家族成員按貢獻值發放</h6>
      <img src="../../assets/img/wardImg3.png" alt="" class="wardImg2">
      <h6>備註</h6>
      <p>1、榜單獎勵家族成員不足5位則多餘獎勵視為無效 </p>
      <p>2、K房人數上限提升自獎勵發放之日起計算 </p>
      <p>3、活動結束後7個工作日內工作人員將聯繫家族長統計獎勵信息，逾期未提交視為自動放棄 </p>
      <p>4、家族成員信息統計於活動截止時為準，獎勵於活動結束後7個工作日內發放 </p>
      <p>5、活動獎勵特效禮物請更新至最新版本軟體使用，否則可能會錯過絢麗特效哦</p>
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
