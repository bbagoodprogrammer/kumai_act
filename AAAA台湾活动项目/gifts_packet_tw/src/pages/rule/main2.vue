<template>
  <div class="rule">
    <div class="tabs">
      <a @click.prevent="tabClick(0)" :class="{current:tab==0}" href="">活動規則</a>
      <a @click.prevent="tabClick(1)" :class="{current:tab==1}" href="">活動獎勵</a>
    </div>
    <div class="actTime">活動時間：11月12日12:00:00—11月21日22:00:00</div>
    <div class="ruleTips" v-show="tab == 0">
      <h5>活動規則：</h5>
      <p>1.活動需報名參賽，參賽後計算數值</p>
      <p>2.榜單分爲達人榜和手氣榜</p>
      <p class="rankTips">
        達人榜：計算參賽用戶發送的金幣紅包的金幣總額，展示前100名</br>
        手氣榜：計算參賽用戶收到的禮物紅包的個數總額，展示前100名
      </p>
      <h5 class="other">注意事項:</h5>
      <p>1、私密K房發送紅包不記錄活動數據</p>
      <p>2、每位用戶僅可使用一個帳號參與活動</p>
      <p>3、以任何違規行爲參與活動將被取消活動資格、活動獎勵，嚴重者封禁賬號</p>
    </div>
    <div class="wardTips" v-show="tab == 1">
      <h5>活動獎勵：</h5>
      <h6>達人榜</h6>
      <p>第1名：紅包達人徽章（30天）+隆重登場座駕（30天）+夢幻木馬*1（3520金幣/個）+1000金幣</p>
      <p>第2名：紅包達人徽章（30天）+隆重登場座駕（30天）+彩蝶飛舞*1（2250金幣/個）+800金幣</p>
      <p>第3名：紅包達人徽章（30天）+隆重登場座駕（30天）+天馬行空*1（1688金幣/個）+600金幣</p>
      <p>第4~10名：紅包達人徽章（30天）+隆重登場座駕（30天）+萌兔泡泡槍*1（820金幣/個）+100金幣</p>
      <p>第11~20名：隆重登場座駕（7天）+100金幣+1000金豆</p>
      <h6>手氣榜</h6>
      <p>第1名：紅包手氣王徽章（30天）+極速快艇座駕（30天）+3000金豆</p>
      <p>第2名：紅包手氣王徽章（30天）+極速快艇座駕（30天）+2000金豆</p>
      <p>第3名：紅包手氣王徽章（30天）+極速快艇座駕（30天）+1000金豆</p>
      <p>第4~10名：紅包手氣王徽章（30天）+500金豆</p>
      <h5>注意事項：</h5>
      <p>1、獎勵將於活動結束後7個工作日內發放</p>
      <p>2、背包禮物有效期為7天，請盡快使用</p>
    </div>
    <p class="lastTips">活動最終解釋權歸主辦方所有</p>
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
  background-color: #ae172e;
}
.rule {
  padding: 0.51rem 0.25rem;
  .tabs {
    display: flex;
    width: 7rem;
    height: 0.85rem;
    background: url(../../assets/img/tab.png);
    background-size: 100% 100%;
    margin: 0 auto 0.26rem;
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: 3.5rem;
      height: 0.85rem;
      color: #ae4800;
      font-size: 0.3rem;
      font-weight: bold;
      &.current {
        background: url(../../assets/img/tab1.png);
        background-size: 100% 100%;
      }
    }
  }
  .actTime {
    text-align: center;
    margin: 0.49rem auto 0.45rem;
    color: #faeac5;
  }
  .ruleTips {
    h5 {
      color: #f4cf77;
      font-size: 0.36rem;
      margin-bottom: 0.37rem;
      font-weight: bold;
    }
    p {
      font-size: 0.24rem;
      color: #f3d4d8;
      padding-left: 0.25rem;
      margin-top: 0.2rem;
    }
    .rankTips {
      font-size: 0.22rem;
      color: #f3d4d8;
      padding-left: 0.4rem;
    }
    .other {
      margin-top: 0.97rem;
    }
  }
  .wardTips {
    h5 {
      color: #f4cf77;
      font-size: 0.36rem;
      margin-top: 0.5rem;
      font-weight: bold;
    }
    h6 {
      color: #faeac5;
      font-size: 0.24rem;
      margin-top: 0.45rem;
      padding-left: 0.35rem;
    }
    p {
      color: #f3d4d8;
      font-size: 0.22rem;
      padding-left: 0.5rem;
      margin-top: 0.15rem;
    }
  }
  .lastTips {
    text-align: center;
    color: #faeac5;
    font-size: 0.24rem;
    margin-top: 1.5rem;
  }
}
@import "../../assets/scss/common.scss";
</style>
