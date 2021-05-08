<template>
  <div class="rule">
    <i class="close" @click="$parent.showRule = false"></i>
    <div class="title">規則&獎勵</div>
    <div class="con">
      <div class="tm">活動時間：1月2-1月11</div>
      <h5>1、參與對象</h5>
      <p>平台內與官方合作的主播和房主均可參與，活動期間內成為官方主播和官方房主均可參與，有興趣加入的玩家可聯繫音覓莓莓子（UID:1888）</p>
      <h5>2、如何建高樓</h5>
      <p>官方主播和官方房主均獲得一塊空地，通過任務累計高度即可建成對應的大樓，並獲得對應的建成獎勵</p>
      <span class="ruleImg1"></span>
      <h5>3、任務</h5>
      <p>主播通過以下兩個任務可獲得高度</p>
      <p>進房人數：一位玩家當天首次進入某主播房間算作完成一次任務，一人=1高度，每日上限200</p>
      <p>收到指定禮物禮物：主播收到指定禮物，按照10金幣=1高度的比例累計高度，無上限</p>
      <div class="giftList">
        <div v-for="(item,index) in rule_gift1" :key="index">
          <div class="imgBox">
            <img :src="item.img" alt="">
          </div>
          <strong>{{item.name}}</strong>
        </div>
      </div>
      <h5> 4、建成獎勵</h5>
      <span class="ruleImg2"></span>
      <h5>5、榜單獎勵</h5>
      <div class="giftList mb">
        <div v-for="(item,index) in rule_gift2" :key="index">
          <div class="imgBox">
            <img :src="item.img" alt="">
          </div>
          <strong>{{item.name}}</strong>
        </div>
      </div>
      <p>第一名：璀璨盛放頭像框*7天+雷霆戰車座駕*7天+房產大亨勛章*10天+金幣流水返利6%</p>
      <p>第二名：紫光盛放頭像框*7天+雷霆戰車座駕*7天+房產大亨勛章*10天+金幣流水返利4%</p>
      <p>第三名：藍光盛放頭像框*7天+雷霆戰車座駕*7天+房產大亨勛章*10天+金幣流水返利3%</p>
      <p>*主播金幣返利說明：主播/房主在活動期間，個人收到的指定禮物的金幣流水，按比例獎勵金幣</p>
      <h5>6、粉絲貢獻獎勵</h5>
      <p>第一名：頭號粉絲-頭像框*7天+金幣返利6%</p>
      <p>第二名：頭號粉絲-頭像框*7天+金幣返利4%</p>
      <p>第三名：頭號粉絲-頭像框*7天+金幣返利3%</p>
      <p>*粉絲金幣返利說明：在活動期間，獲獎玩家送出指定禮物的金幣流水，按比例返利</p>
      <h5>7、其他</h5>
      <p>活動中，若發現玩家用不正當手段參與活動，小音有權在不事先通知的情況下按情節嚴重對參與玩家、違規者取消上榜資格、封禁賬號、收回該玩家所有獎勵等處罰，包括但不限於：</p>
      <p>a）活動期間對參賽玩家惡意評論、造謠、影射等</p>
      <p class="lastTips">此活動與蘋果公司無關</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    rule_gift1 () {
      return this.lang.rule_gift1
    },
    rule_gift2 () {
      return this.lang.rule_gift2
    }
  }
}
</script>

<style lang="scss">
.rule {
  width: 6.54rem;
  height: 6.55rem;
  background: url(../img/ruleBg.png);
  background-size: 100% 100%;
  position: relative;
  .title {
    height: 0.7rem;
    text-align: center;
    line-height: 0.7rem;
    font-weight: 600;
  }
  .con {
    height: 5.2rem;
    overflow-y: scroll;
    padding: 0 0.2rem;
    color: rgba(11, 66, 117, 1);
    font-size: 0.26rem;
    padding-bottom: 0.6rem;
    .tm {
      height: 0.8rem;
      line-height: 0.8rem;
    }
    h5 {
      font-weight: 600;
      font-size: 0.26rem;
      margin-top: 0.2rem;
    }
    p {
      font-size: 0.26rem;
      margin: 0.1rem 0;
    }
  }
  .lastTips {
    text-align: center;
    margin: 0.3rem auto 0;
  }
  .giftList {
    margin: 0.31rem 0 0.2rem;
    padding: 0 0.6rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &.mb {
      margin: 0.35rem 0;
    }
    > div {
      width: 1.39rem;
    }
    .imgBox {
      width: 1.39rem;
      height: 1.39rem;
      background: RGBA(77, 142, 228, 1);
      border-radius: 0.2rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    strong {
      height: 0.55rem;
      display: block;
      text-align: center;
      font-size: 0.22rem;
      color: #fff;
      margin-top: 0.15rem;
    }
  }
}
</style>