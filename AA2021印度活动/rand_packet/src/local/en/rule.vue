<template>
  <div class="rule">
    <div class="tabs">
      <a @click.prevent="tabClick(0)" :class="{current:tab==0}" href="">Rules</a>
      <a @click.prevent="tabClick(1)" :class="{current:tab==1}" href="">Prizes</a>
    </div>
    <h6 class="time">Time: April 19, 13:00 - April 26, 22:00</h6>
    <div class="ruleTips" v-show="tab == 0">
      <h6>Rules</h6>
      <p>1. After joining the event, you can earn luck value by sending gifts in room or on recordings.</p>
      <p> Mysterious chest can only be opened once a day. You can open the mysterious chest according to the level you reach. The higher level, the fancier mysterious chest. Prizes will be sent
        automatically.</p>
      <p>
        3. Rules of ranking
        <strong>Daily Chart: Luck value = 10*the coin value of the gifts you send. Daily ranking will be reset at 00:00 everyday. Only Top 100 will be showed.</strong>
        <strong>Main Chart: Ranking is based on the total luck value. Only Top 100 will be showed.</strong>
      </p>
      <h6>Daily Ranking period</h6>
      <p class="dayTime">
        Day 1: April 19, 13:00 - April 20, 00:00<br />
        Day 2: April 20, 00:00 - April 21, 00:00<br />
        Day 3: April 21, 00:00 - April 22, 00:00<br />
        Day 4: April 22, 00:00 - April 23, 00:00<br />
        Day 5: April 23, 00:00 - April 24, 00:00<br />
        Day 6: April 24, 00:00 - April 25, 00:00<br />
        Day 7: April 25, 00:00 - April 26, 00:00<br />
        Day 8: April 26, 00:00 - April 26, 22:00
      </p>
      <h6>Luck Level</h6>
      <p class="dayTime">
        Lv1: 1,000 luck value</br>
        Lv2: 10,000 luck value</br>
        Lv3: 50,000 luck value</br>
        Lv4: 1 lakh luck value</br>
        Lv5: 2 lakh luck value</br>
        Lv6: 3 lakh luck value</br>
        Superior Chest: Totally earn 4 lakh luck value during the event.</br>
        Note: For mysterious chest, luck value will be set everyday, please open the chest in time. For superior chest, the total value will keep calculating.
      </p>
      <h6>Note</h6>
      <p>1. SingStar would exclude those users who cheated at the event and take their prizes back without prior notice.</p>
      <p>2. Daily Top 1-3 can get 15%, 12%, 10% recharge bonus coupon respectively. Coupon will be sent once the ranking comes out. It is valid for one day. Please use in time.</p>
      <p>3. Gifts will be valid for 14 days.</p>
      <p>4. Mysterious chest can only be opened once a day. You can open the mysterious chest according to the level you reach. The higher level, the fancier mysterious chest.</p>
    </div>
    <div class="giftTips" v-show="tab ==1">
      <div class="giftBox">
        <span>
          <img src="../../img/ruleGift/1.png" alt="">
          <strong>Lucky Chest badge</strong>
        </span>
        <span>
          <img src="../../img/ruleGift/2.png" alt="">
          <strong>Unicorn (Value 1,300 coins)</strong>
        </span>
        <span>
          <img src="../../img/ruleGift/3.png" alt="">
          <strong>Swift Racing</strong>
        </span>
        <span>
          <img src="../../img/ruleGift/10.png" alt="">
          <strong>Recharge bonus coupon</strong>
        </span>
        <span>
          <img src="../../img/ruleGift/5.png" alt="">
          <strong>coins</strong>
        </span>
        <span>
          <img src="../../img/ruleGift/6.png" alt="">
          <strong>points</strong>
        </span>
      </div>
      <h6>Prizes of each level</h6>
      <p>Mysterious chest can only be opened once a day. You can open the mysterious chest according to the level you reach. The higher level, the fancier mysterious chest. Prizes will be sent
        automatically. You can view the record on "Surprise Moment".</p>
      <h6>Prizes of daily chart</h6>
      <p>Daily Top 1-3 can get 15%, 12%, 10% recharge bonus coupon respectively. Coupon will be sent once the ranking comes out.</p>
      <h6>Prizes of main chart</h6>
      <p>TOP 1: Lucky Chest badge (31 days) + Convertible (30 days) + 10,000 coins + 20,000 points</p>
      <p>TOP 2: Lucky Chest badge (31 days) + Convertible (30 days) + 8,000 coins + 10,000 points</p>
      <p>TOP 3: Lucky Chest badge (31 days) + Convertible (30 days) + 6,000 coins + 8,000 points</p>
      <p>TOP4-10: Lucky Chest badge (31 days) + Convertible (30 days) + 4,000 coins + 6,000 points</p>
      <h6>Note</h6>
      <p>1. Recharge bonus coupon is for single use and valid for one day. Please use in time.</p>
      <p>2. Gifts are valid for 14 days.</p>
      <p>3. Prizes for main chart will be sent within 7 days after the event.</p>
    </div>
    <p class="lastTips">SingStar reserves the right of final explanation.</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tab: 0
    }
  },
  methods: {
    tabClick (val) {
      this.tab = val
    }
  }
}
</script>

<style lang="scss">
body {
  .rule {
    padding: 0.36rem 0.27rem 0;
    background-color: #ad2b43;
    .tabs {
      width: 6.98rem;
      height: 0.98rem;
      background: url(../../img/tabs.png);
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
          background: url(../../img/actTabs.png);
          background-size: 100% 100%;
        }
      }
    }
    .time {
      text-align: center;
      font-weight: 600;
      color: #fee898;
      margin-top: 0.5rem;
    }
    h6 {
      font-weight: 600;
      color: #fee898;
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
      color: #ffb2c6;
      font-size: 0.24rem;
      font-weight: 500;
    }
  }
}
// @import '../scss/common.scss';
</style>
