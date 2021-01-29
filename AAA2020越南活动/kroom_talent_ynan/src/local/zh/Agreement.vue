<template>
  <div class="rule">
    <div class="tabs">
      <a @click.prevent="mainTab=0" :class="{current:mainTab==0}" class="tab1">活動規則</a>
      <a @click.prevent="mainTab=1" :class="{current:mainTab==1}" class="tab2">活動獎勵</a>
    </div>
    <div class="ruleItem" v-if="mainTab == 0">
      <h5>活動時間</h5>
      <p>11月12日18:00-11月21日22:00</p>
      <h5>活動規則</h5>
      <p>1）活動需報名參賽，參賽后計算數值</p>
      <p>2）榜單分爲K房達人榜和人氣K房榜 K房達人榜</p>
      <p>K房達人榜: 根據活動時間內用戶在禮物紅包和福運禮盒消費的金幣進行排名，所在房間內每開啟一次火箭活動分數增加1000 人氣K房榜</p>
      <p>人氣K房榜： 根據活動時間內房間中禮物紅包和福運禮盒產生的魅力值進行排名，房間內每開啟一次火箭活動分數增加10000</p>
      <h5>注意事項</h5>
      <p>1）私密K房不記錄活動數據</p>
      <p>2）每位用戶僅可使用一個賬號參與活動</p>
      <p>3）以任何違規行爲參與活動將被取消活動資格、活動獎勵， 嚴重者封禁賬號</p>
    </div>
    <div class="gift" v-else>
      <h5>活動時間</h5>
      <p>11月12日18:00-11月21日22:00</p>
      <h5>活動獎勵</h5>
      <p>K房達人榜</p>
      <p>第1名：K房達人徽章（30天）+隆重登場座駕（30天）+夢幻木馬*1（3520金幣/個）+2000金幣</p>
      <p>第2名：K房達人徽章（30天）+隆重登場座駕（30天）+彩蝶飛舞*1（2250金幣/個）+1500金幣</p>
      <p>第3名：K房達人徽章（30天）+隆重登場座駕（30天）+天馬行空*1（1688金幣/個）+1000金幣</p>
      <p>第4~10名：K房達人徽章（30天）+隆重登場座駕（30天）+萌兔泡泡槍*1（820金幣/個）+500金幣</p>
      <p class="mt">人氣K房榜（獎勵房主和管理員）</p>
      <p>第1名：200金幣+2000金豆+人氣K房主題30天</p>
      <p>第2名：150金幣+1500金豆+人氣K房主題30天</p>
      <p>第3名：100金幣+1000金豆+人氣K房主題30天</p>
      <p>第4~10名：50金幣+500金豆+人氣K房主題30天</p>
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
      mainTab: 0
    }
  }
}
</script>
<style lang="scss" scoped>
body {
  background: rgba(30, 6, 99, 1);
  .mt {
    margin-top: 0.8rem;
  }
  .rule {
    padding-top: 0.38rem;
  }
  .tabs {
    width: 7.5rem;
    height: 0.96rem;
    background: url(../../img/tabs.png);
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      display: block;
      width: 3.78rem;
      height: 0.88rem;
      text-align: center;
      line-height: 0.84rem;
      font-size: 0.36rem;
      color: #fff;
      &.current {
        color: rgba(87, 61, 197, 1);
        height: 1.13rem;
        margin-top: 0.2rem;
        background: url(../../img/tabs_act.png);
        background-size: 100% 100%;
      }
    }
  }
  .ruleItem,
  .gift {
    padding: 0 0.23rem;
  }
  h5 {
    color: rgba(255, 241, 162, 1);
    font-size: 0.28rem;
    font-weight: 600;
    margin: 0.38rem 0 0.2rem;
  }
  p {
    color: rgba(199, 240, 255, 1);
    font-size: 0.24rem;
    margin: 0.15rem 0;
  }
  .lastTips {
    margin-top: 3rem;
    text-align: center;
  }
}
</style>
