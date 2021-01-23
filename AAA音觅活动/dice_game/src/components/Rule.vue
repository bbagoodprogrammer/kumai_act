<template>
  <div class="rule">
    <i class="close" @click="closeRule()"></i>
    <div class="title"><i></i></div>
    <div class="actTime">活動時間:1月22日19：00-1月28日24：00</div>
    <div class="tab">
      <span class="ruleTab" :class="{act:type == 1}" @click="tabClick(1)">活動規則</span>
      <span class="wardTab" :class="{act:type == 2}" @click="tabClick(2)">活動獎勵</span>
    </div>
    <div class="ruleTips" v-if="type== 1">
      <h6>1、搖骰子做富翁</h6>
      <p>通過購買可以獲得骰子,活動期間內累計步數從高到低進行排名，前10名玩家可獲得相關獎勵；</p>
      <p>活動結束後，若有骰子未使用，則按照50金幣/顆回退相應金幣到賬號中</p>
      <h6>2、獎勵概率</h6>
      <img src="../assets/img/rule/table1.png" alt="" class="table">
      <p class="red">若前300次沒有中幸運錦鯉特效禮物，第301次必中幸運錦鯉-特效禮物</p>
      <p>儲值返利券使用說明：獲獎當天儲值任意金幣，在次日可獲得對應的金幣返利（不可疊加返利比例）。若一天同時獲得多張儲值返利券，按照所獲得的儲值返利券的最高比例來返利。返利券僅獲得當天有效</p>
      <p>靜態背包禮物有效期為7天，特效背包禮物有效期為10天，請盡快送出哦~</p>
      <h6>3.注意事項</h6>
      <p>1、活動中，若發現玩家用不正當手段參與活動，小音有權在不事先通知的情況下按情節嚴重對參與玩家、違規者取消上榜資格、封禁賬號、收回該玩家所有獎勵等處罰，包括但不限於：</p>
      <p>活動期間對參賽玩家進行惡意評論、造謠、影射他人</p>
      <p>2、此活動與蘋果公司無關</p>
    </div>
    <div class="wardsTips" v-if="type== 2">
      <h6>1.總榜第1-3名</h6>
      <div class="giftBox">
        <span v-for="(item,index) in gift1" :key="index">
          <img :src="item.img" alt="">
          <strong>{{item.name}}</strong>
        </span>
      </div>
      <h6>2.總榜第4-10名</h6>
      <div class="giftBox">
        <span v-for="(item,index) in gift2" :key="index">
          <img :src="item.img" alt="">
          <strong>{{item.name}}</strong>
        </span>
      </div>
      <h6>3.日榜第一名將獲得骰子五枚，在次日0點發放</h6>
      <h6>4.1月28日的為活動的最後一天，1月28日的日榜獎勵將不發放</h6>
    </div>
    <p class="lastTips">*活動最終解釋權歸活動主辦方所有</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type: 1,
      gift1: [
        {
          img: require('../assets/img/rule/Certification_01.png'),
          name: '【音覓大富翁】認證7天'
        },
        {
          img: require('../assets/img/rule/badge.png'),
          name: '音覓大富翁勛章10天'
        },
        {
          img: require('../assets/img/rule/car1.png'),
          name: '紅色法拉利座駕10天'
        }
      ],
      gift2: [
        {
          img: require('../assets/img/rule/Certification_01.png'),
          name: '【聚財小天使】認證7天'
        },
        {
          img: require('../assets/img/rule/badge.png'),
          name: '音覓大富翁勛章7天'
        },
        {
          img: require('../assets/img/rule/BMW.png'),
          name: 'BMW座駕10天'
        }
      ]
    }
  },
  methods: {
    tabClick(val) {
      this.type = val
    },
    closeRule() {
      this.$parent.showRule = false
    }
  }
}
</script>
<style lang="scss">
.red {
  color: #ffe747 !important;
}
.table {
  width: 5.88rem;
  height: 2.83rem;
  margin: 0 auto 0.1rem;
}
.rule {
  width: 6.48rem;
  height: 10rem;
  padding-top: 0.54rem;
  border: 0.08rem solid #ffffff;
  border-radius: 0.24rem;
  background: linear-gradient(0deg, #83d2fb, #9e81fa, #a875f1);
  position: relative;
  padding-bottom: 0.1rem;
  .title {
    width: 5.14rem;
    height: 1.42rem;
    background: url(../assets/img/title/ribbon.png);
    background-size: 100% 100%;
    position: absolute;
    top: -0.8rem;
    left: 0.71rem;
    i {
      display: block;
      width: 5.14rem;
      height: 1.42rem;
      background: url(../assets/img/title/title_14.png);
      background-size: 100% 100%;
    }
  }
  .actTime {
    text-align: center;
  }
  .tab {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.24rem;
    span {
      width: 2.7rem;
      height: 0.8rem;
      background: url(../assets/img/tab2.png);
      background-size: 100% 100%;
      text-align: center;
      font-size: 0.24rem;
      color: rgba(59, 59, 59, 1);
      line-height: 0.67rem;
      &.wardTab {
        margin-left: 0.46rem;
      }
      &.act {
        color: rgba(126, 45, 0, 1);
        background: url(../assets/img/tab1.png);
        background-size: 100% 100%;
      }
    }
  }
  .ruleTips {
    height: 7.8rem;
    overflow-y: scroll;
    padding: 0 0.31rem;
    h6 {
      font-size: 0.28rem;
      font-weight: bold;
      margin: 0.33rem 0 0.22rem;
    }
    p {
      font-size: 0.24rem;
      font-weight: 500;
    }
  }
  .wardsTips {
    height: 7.8rem;
    overflow-y: scroll;
    padding: 0 0.3rem;
    h6 {
      margin: 0.2rem auto;
    }
    .giftBox {
      width: 5.88rem;
      height: 2.66rem;
      background: rgba(103, 52, 191, 0.4);
      border-radius: 0.12rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        width: 1.7rem;
        height: 100%;
        padding-top: 0.7rem;
        img {
          display: block;
          margin: 0 auto;
          width: 1.4rem;
          height: 1.4rem;
        }
        strong {
          display: block;
          font-size: 0.24rem;
          text-align: center;
          margin-top: 0.05rem;
        }
      }
    }
  }
  .close {
    display: block;
    width: 0.72rem;
    height: 0.78rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: -0.3rem;
    top: -0.4rem;
  }
  .lastTips {
    text-align: center;
    font-size: 0.24rem;
    margin-top: 0.2rem;
  }
}
</style>
