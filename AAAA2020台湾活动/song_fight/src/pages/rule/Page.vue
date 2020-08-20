<template>
  <div class="rule">
    <div class="tabs">
      <span :class="{act:type==1}" @click="tabClick(1)">活動獎勵</span>
      <span :class="{act:type==2}" @click="tabClick(2)">活動規則</span>
    </div>
    <div class="gift" v-if="type == 1">
      <h3>活動獎勵</h3>
      <img src="../../assets/img/gift.png" alt="" class="giftImg">
      <h6>本期打擂榜前10名獎勵：</h6>
      <p>第1名</p>
      <p>300金幣+1個月VIP+1000金豆</p>
      <p>第2名</p>
      <p>200金幣+1個月VIP+600金豆</p>
      <p>第3名 </p>
      <p>100金幣+1個月VIP+400金豆</p>
      <p>第4-10名</p>
      <p>50金幣+1個月VIP+200金豆</p>
      <h6>本賽季前100名獎勵：</h6>
      <p>第1-3名：音樂教父</p>
      <p>音樂教父徽章+600金幣+VIP（1個月）+1200金豆</p>
      <p>第4-10名：音樂大師</p>
      <p>音樂大師徽章+500金幣+背包禮物2+VIP（1個月）+1000金豆</p>
      <p>第11-50名：音樂明星 </p>
      <p>音樂明星徽章+300金幣+VIP（1個月）+600金豆</p>
      <p>第51-100：音樂達人</p>
      <p>音樂達人徽章+100金幣+VIP（1個月）+300金豆</p>
      <h6>評委獎勵：</h6>
      <p>評委每天評分前30組歌每組歌曲將獲得2金豆<br />當期每連投8組投中，可隨機獲得一個音樂盒背包禮物（360金豆）/棉花糖背包禮物（1金幣）/2天VIP/赤鷹戰機座駕（2天）</p>
      <h6>評委稱號及特權獎勵：</h6>
      <img src="../../assets/img/chTab.png" alt="" class="chTabImg">
      <p>PS.</p>
      <p>1、稱號展示在下一期的活動中</p>
      <p>2、如本期獲得金耳朵稱號，下期每投一票相當於普通用戶投2票</p>
      <p>3、本期獲得的評委稱號及投票特權僅在下一期活動中生效</p>
      <h6>獎勵說明：</h6>
      <p>1、背包禮物獎勵有效期為14天</p>
      <p>2、評委金豆獎勵即時發放，連投獎勵將由系統在活動結束時發放，本期打擂榜前10名將在活動結束後7天內發放，本賽季前100名獎勵將在本賽季活動結束後7天內發放</p>
    </div>
    <div class="ruleTips" v-else>
      <div class="actTime">
        <p>本期擂台賽時間：</p>
        <p class="timeItem">{{stime}}-{{etime}}</p>
        <p>本期報名打擂時間：</p>
        <p class="timeItem">{{pstime}}-{{petime}}</p>
        <p>本期匹配對手時間：</p>
        <p class="timeItem">10:00:00-22:00:00，匹配時間段內每2個小時匹配一次對手，即10:00:00，12:00:00，14:00:00，16:00:00，18:00:00，20:00:00，22:00:00；但本期比賽最後一天只在當天10:00:00，12:00:00兩個時間匹配對手，過後即不再匹配</p>
        <p>本賽季擂台賽時間：</p>
        <p class="timeItem">{{zsetime}}-{{zeetime}}，每週五～下週一</p>
        <!-- <p>活動時間規律說明：</p>
        <div class="timeTips">
          <p>每期時間：</p>
          <p>每週五18:00:00-每週一20:00:00</p>
          <p>賽季時間：</p>
          <p>每3個自然月為一個賽季</p>
        </div> -->
      </div>
      <h3>活動規則</h3>
      <h6>參賽規則：</h6>
      <div class="mTips">
        <p>1、需演唱{{stime}}後發佈的官方指定伴奏參賽（即需演唱點擊打擂後跳轉的伴奏），演唱其他伴奏無法參賽</p>
        <p>2、參賽作品類型僅限獨唱</p>
        <p>3、每一首伴奏僅可選擇一首作品參賽</p>
        <p>4、每期可選擇多首伴奏參加打擂</p>
        <p>5、演唱歌曲需為完整歌曲（歌曲時長最多比伴奏時長短30S），否則無法提交歌曲參賽</p>
        <p>6、若成功選擇打擂歌曲參賽並匹配打擂對手後，刪除該打擂歌曲作品，視為自動棄權，雙方該歌曲打擂成績均失效，另一方將參與下一輪的匹配重新參與打擂</p>
        <p>7、系統會自動匹配相同曲目的兩個參賽選手組成一組，推送給大眾評委進行盲選投票，截止活動結束，每一首歌曲獲得票數多的選手獲勝</p>
        <p>8、若一首歌曲中，兩位選手的總票數超過50，且某一方獲得80%及以上的票數時（即某一方獲得的票數/該歌曲雙方票數之和*100%>=80%），贏的一方可增加2分，輸的人只減1分；若雙方該歌曲的票數之和沒有達到50或者贏的一方獲得的票數沒有達到80%，贏的一方可增加1分，而失敗的則減1分；平票的話，雙方均不加分也不減分，投票的用戶也不算投中</p>
      </div>
      <h6>每期打擂榜排名規則：</h6>
      <p>1、根據本期獲得的分數排名，如果分數相同，本期參賽歌曲獲得更多票數的排名在前面</p>
      <h6>季歌王榜排名規則：</h6>
      <p>1、本季歌王榜根據等級，即所有期數獲得的分數總和排名；如果等級相同，獲得更多票數的排名在前面</p>
      <p>2、每個賽季開始，選手默認的等級為Lv.0，每期擂台賽每獲得1分升一級，每減1分降一級，等級可能為負數</p>
      <h3>其他說明</h3>
      <p>比賽過程中，若發現用戶使用不正當手段參與活動，小歡有權在事先不通知的前提下按情節嚴重對參賽者、違規者做取消其參賽資格或封禁帳號等處罰，包括但不限於：</p>
      <p>1）活動作品非本人原唱或盜錄他人作品；</p>
      <p>2）盜用或借用他人已有帳號參與活動；</p>
      <p>3）同一用戶註冊多個帳號參與活動；</p>
      <p>4）比賽期間對參賽作品進行惡意評論，廣告等；</p>
      <p>5）通過其他違規行為參與活動。</p>
      <p class="mt"> 若為主動作弊者，無論是否為參賽者永久封禁該用戶所有大小號，活動結束后小歡任有權收回該用戶所有獎勵</p>
    </div>
    <p class="lastTips">本活動的最終解釋權歸活動主辦方所有</p>
  </div>
</template>

<script>
import getDate from "../../utils/getDate"
export default {
  data() {
    return {
      type: 1,
      time: {}
    }
  },
  created() {
    document.title = '獎勵&規則'
    this.time = JSON.parse(sessionStorage.getItem('time'))
    console.log(this.time)
  },
  computed: {
    stime() {
      return getDate(new Date(this.time.stime * 1000), 3)
    },
    etime() {
      return getDate(new Date(this.time.etime * 1000), 3)
    },
    pstime() {
      return getDate(new Date(this.time.pstime * 1000), 3)
    },
    petime() {
      return getDate(new Date(this.time.petime * 1000), 3)
    },
    zsetime() {
      return getDate(new Date(this.time.zsetime * 1000), 3)
    },
    zeetime() {
      return getDate(new Date(this.time.zeetime * 1000), 3)
    },
    rStime() {
      return getDate(new Date(this.time.stime * 1000), 1)
    },
    rEtime() {
      return getDate(new Date(this.time.etime * 1000), 1)
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
  background: rgba(117, 67, 240, 1);
  .mTips {
    p {
      margin-bottom: 0.07rem;
    }
  }
  .rule {
    padding: 0.29rem 0.44rem;
    .tabs {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 6.22rem;
      height: 0.88rem;
      background: url(../../assets/img/tabs.png);
      background-size: 100% 100%;
      margin: 0 auto;
      span {
        width: 3.26rem;
        height: 0.8rem;
        text-align: center;
        line-height: 0.8rem;
        color: rgba(255, 220, 42, 1);
        font-weight: bold;
        &.act {
          color: rgba(174, 72, 0, 1);
          background: url(../../assets/img/actTab.png);
          background-size: 100% 100%;
        }
      }
    }
    h3 {
      text-align: center;
      margin: 0.3rem 0 0.2rem;
    }
    h6 {
      font-size: 0.26rem;
      margin: 0.49rem 0 0.25rem;
    }
    p {
      color: rgba(229, 222, 255, 1);
      font-size: 0.24rem;
      padding-left: 0.22rem;
    }
    .giftImg {
      width: 6.56rem;
      height: 4.38rem;
      display: block;
    }
    .chTabImg {
      width: 5.65rem;
      height: 4.22rem;
      margin: 0 0 0.25rem 0.22rem;
    }
    .lastTips {
      color: rgba(209, 190, 255, 1);
      margin: 0.78rem 0 0.92rem;
      text-align: center;
    }
    .ruleTips {
      h6 {
        margin: 0.35rem 0 0.25rem;
      }
      .actTime {
        margin-top: 0.6rem;
        .timeItem {
          margin-bottom: 0.3rem;
        }
        .timeTips {
          padding-left: 0.45rem;
        }
      }
    }
    .mt {
      margin-top: 0.3rem;
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
