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
      <p>評委每天評分前30首歌每首歌曲將獲得1金豆,<br />當期連投8組投中，可隨機獲得一個耳機金豆背包禮物（180金豆）/1金幣/2天VIP</p>
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
        <p class="timeItem">7月24日18:00:00-7月27日20:00:00</p>
        <p>本期報名打擂時間：</p>
        <p class="timeItem">7月24日18:00:00-7月27日12:00:00</p>
        <p>本賽季時間：</p>
        <p class="timeItem">7月24日18:00:00-9月31日20:00:00</p>
        <p>活動時間規律說明：</p>
        <div class="timeTips">
          <p>每期時間：</p>
          <p>每週五18:00:00-每週一20:00:00</p>
          <p>賽季時間：</p>
          <p>每3個自然月為一個賽季</p>
        </div>
      </div>
      <h3>活動規則</h3>
      <h6>參賽規則：</h6>
      <p>1、需演唱官方指定作品參賽，參賽作品類型僅限獨唱，可選擇多首伴奏參加打擂</p>
      <p>2、系統會自動匹配相同曲目的兩個參賽選手組成一組，推送給大眾評委進行盲選投票，截止活動結束，獲得票數多的選手獲勝</p>
      <p>3、匹配對手時間：</p>
      <p>10:00:00-22:00:00，匹配時間段內每2個小時匹配一次對手，即10:00:00，12:00:00，14:00:00，16:00:00，18:00:00，20:00:00，22:00:00，</p>
      <p>本期比賽最後一次匹配時間為7月27日</p>
      <h6>打擂等級說明：</h6>
      <p>1、每個賽季，選手默認的等級為Lv.0,且Lv.0為最低級，不會降級</p>
      <p>2、選手升級模式為集滿4星升一級；每一次獲勝的選手（選手獲勝的評判標準為支持率大於50%），會獲得1顆星星，當滿4顆星星自動升級，而失敗的則失去一顆星星，且可降級</p>
      <h6>7.31-8.03打擂榜排名規則：</h6>
      <p>1、根據本期參加打擂歌曲的平均支持率排名，如果平均支持率相同，該場次獲得更多票數的排名在前面，若支持率與票數相同，先達到該票數的排名在前面</p>
      <h6>本季歌王榜排名規則：</h6>
      <p>1、按照獲得的星星數排名</p>
      <p>2、如果星星數相同，平均支持率大的先排在前面</p>
      <p>3、若星星數、平均支持率，獲得總票數大的排名在前面</p>
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
export default {
  data() {
    return {
      type: 1,
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
