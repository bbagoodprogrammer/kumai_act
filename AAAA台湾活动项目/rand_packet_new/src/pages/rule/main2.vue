<template>
  <div class="rule">
    <div class="tabs">
      <a @click.prevent="tabClick(0)" :class="{current:tab==0}" href="">活動規則</a>
      <a @click.prevent="tabClick(1)" :class="{current:tab==1}" href="">活動獎勵</a>
    </div>
    <h6 class="time">活動時間：12月23日12:00:00-12月31日23:59:59</h6>
    <div class="ruleTips" v-show="tab == 0">
      <h6>活動規則</h6>
      <p>1. 點擊報名參賽之後用戶可以通過在K房、作品送禮金幣魅力值獲取驚喜值</p>
      <p>2. 驚喜值每達到指定的等級都可以打開寶箱，但每人每天只能打開1次寶箱，達到多個等級時默認打開最高級別的寶箱，寶箱中的禮物由系統自動發放到帳戶</p>
      <p>
        3.排名規則
        <strong>日榜 ：驚喜值=作品/K房送禮金幣魅力值總和，按驚喜值從高到低排名，日榜排行次日0點清空重新排名，日榜排行只顯示TOP1~100用戶</strong>
        <strong>總榜：累計每日驚喜值按從高到低排名，總榜排行只顯示TOP1~100用戶</strong>
      </p>
      <h6>日榜時間：</h6>
      <p class="dayTime">
        Day1: 12月23日12:00-12月24日0:00<br />
        Day2: 12月24日0:00-12月25日0:00<br />
        Day3: 12月25日0:00-12月26日0:00<br />
        Day4: 12月26日0:00-12月27日0:00<br />
        Day5: 12月27日0:00-12月28日0:00<br />
        Day6: 12月28日0:00-12月29日0:00<br />
        Day7: 12月29日0:00-12月30日0:00<br />
        Day8: 12月30日0:00-12月31日0:00<br />
        Day9: 12月31日0:00-12月31日23:59:59
      </p>
      <h6>幸運等級劃分：</h6>
      <p class="dayTime">
        Lv1： 500驚喜值</br>
        Lv2：1000驚喜值</br>
        Lv3：2000驚喜值</br>
        Lv4：5000驚喜值</br>
        Lv5：8000驚喜值</br>
        Lv6：10000驚喜值</br>
        終極寶箱 : 活動期間累計驚喜值達150000</br>
        注意：驚喜值次日零點清零，請及時打開寶箱
      </p>
      <h6>備註：</h6>
      <p>1. 若用戶以任意不正規行為刷分，舉辦方有權在不提前通知的情況下刪除比賽分數並收回所有活動獎勵</p>
      <p>2. 日榜TOP1-3獎勵的15%、12%、10%單次儲值返利券，次日0點由系統自動派發，活動最後一天日榜獎勵在活動結束時發放，券自發放時起1天內有效，請盡快使用</p>
      <p>3. 所有背包禮物有效使用期為自派發時起14天</p>
      <p>4. 達到對應幸運等級時需在頁面手動打開寶箱領取獎品，每人每天只能打開1次寶箱，當達到多個開寶箱等級時預設打開最高級別的寶箱</p>
    </div>
    <div class="giftTips" v-show="tab ==1">
      <div class="giftBox">
        <span>
          <img src="../../assets/img/ruleGift/1.png" alt="">
          <strong>幸運寶箱勳章</strong>
        </span>
        <span>
          <img src="../../assets/img/ruleGift/2.png" alt="">
          <strong>聖誕禮物</strong>
        </span>
        <span>
          <img src="../../assets/img/ruleGift/3.png" alt="">
          <strong>馴鹿座駕</strong>
        </span>
        <span>
          <img src="../../assets/img/ruleGift/10.png" alt="">
          <strong>儲值返利劵</strong>
        </span>
        <span>
          <img src="../../assets/img/ruleGift/5.png" alt="">
          <strong>金幣</strong>
        </span>
        <span>
          <img src="../../assets/img/ruleGift/6.png" alt="">
          <strong>金豆</strong>
        </span>
      </div>
      <h6>等級獎勵</h6>
      <p>驚喜值每達到指定的等級都可以打開寶箱，但每人每天只能打開1次寶箱，當達到多個開寶箱等級時默認打開最高級別的寶箱。寶箱中的禮物由系統自動發放到帳戶上，領取記錄可在驚喜時刻查看</p>
      <h6>日榜獎勵</h6>
      <p>TOP1~3 分別獎勵15%、12%、10%單次儲值返利券，次日零點系統自動派發，活動最後一天日榜獎勵在活動結束時發放</p>
      <h6>總榜獎勵</h6>
      <p>TOP 1： 幸運寶箱徽章（31天）+聖誕禮物*2（1225金幣/個）+聖誕節頭飾31天+馴鹿座駕（31天）+3000金幣+5000金豆</p>
      <p>TOP 2： 幸運寶箱徽章（31天）+聖誕禮物*2（1225金幣/個）+聖誕節頭飾31天+馴鹿座駕（31天）+2000金幣+3000金豆</p>
      <p>TOP 3： 幸運寶箱徽章（31天）+聖誕禮物*2（1225金幣/個）+聖誕節頭飾31天+馴鹿座駕（31天）+1000金幣+2000金豆</p>
      <p>TOP4-10： 幸運寶箱徽章（31天）+聖誕節頭飾31天+ 馴鹿座駕（31天）+500金幣 + 1000金豆</p>
      <h6>備註：</h6>
      <p>1、活動儲值返利券均為單次有效，自發放時起1天內有效，請儘快使用</p>
      <p>2、所有背包禮物的有效使用期為即派發時起14天內</p>
      <p>3、總榜獎勵在活動結束後7天內派發</p>
    </div>
    <p class="lastTips">活動解釋權歸主辦方所有</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: 0
    }
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
  background-color: #290d70;
  .rule {
    padding: 0.36rem 0.27rem 0;
    .tabs {
      width: 6.98rem;
      height: 0.98rem;
      background: url(../../assets/img/tabs.png);
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      a {
        display: block;
        width: 3.66rem;
        height: 0.9rem;
        text-align: center;
        line-height: 0.9rem;
        color: #fddc55;
        font-weight: 700;
        font-size: 0.32rem;
        &.current {
          color: #a24e04;
          background: url(../../assets/img/actTabs.png);
          background-size: 100% 100%;
        }
      }
    }
    .time {
      text-align: center;
      font-weight: 600;
      color: #81f8fe;
      margin-top: 0.5rem;
    }
    h6 {
      font-weight: 600;
      color: #81f8fe;
      margin: 0.5rem 0 0.2rem;
    }
    p {
      font-size: 0.24rem;
      font-weight: 500;
      margin-top: 0.15rem;
      padding-left: 0.2rem;
      line-height: 0.4rem;
      strong {
        font-size: 0.24rem;
        display: block;
        padding-left: 0.15rem;
      }
    }
    .ruleTips {
      margin-top: 0.61rem;
      .dayTime {
        line-height: 0.5rem;
      }
    }
    .giftTips {
      .giftBox {
        padding: 0 0.37rem;
        margin-top: 0.15rem;
        span {
          display: inline-block;
          vertical-align: top;
          width: 1.6rem;
          margin: 0.29rem 0.6rem 0 0;
          img {
            display: block;
            width: 1.6rem;
            height: 1.6rem;
          }
          strong {
            display: block;
            width: 120%;
            margin-left: -0.16rem;
            text-align: center;
            color: #fff3d2;
            font-size: 0.24rem;
            margin-top: 0.15rem;
          }
        }
        span:nth-child(3),
        span:nth-child(6) {
          margin-right: 0;
        }
      }
    }
    .lastTips {
      text-align: center;
      margin: 0.94rem 0 0.15rem;
      color: #4f43cd;
      font-size: 0.24rem;
      font-weight: 500;
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
