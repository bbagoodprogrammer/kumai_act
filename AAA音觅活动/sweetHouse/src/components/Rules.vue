<template>
  <div class="rule">
    <i class="close" @click="closeRules()"></i>
    <div class="tips">
      <p>每天做任務獲得甜品材料，製作清新甜品（背包禮物），獲得清新值還能贏限定頭像框、座駕、金幣獎勵</p>
      <div class="tabs">
        <span :class="{act:type==1}" @click="tabClick(1)">活動規則</span>
        <span :class="{act:type==2}" @click="tabClick(2)">活動獎勵</span>
      </div>
      <p class="actTime">2020/09/08 18:00-09/22 21:00</p>
      <div class="tipsCon">
        <div class="tips1" v-if="type==1">
          <h6>如何玩轉清新甜品屋？</h6>
          <p>做任務收集甜品材料,製作清新甜品（背包禮物）獲得清新值>>積纍清新值完成進階任務領取獎勵</p>
          <p class="blue">*製作成功的清新甜品將發放到用戶背包可在任意房間送給任意其他用戶</p>
          <h6>如何玩轉清新甜品屋？</h6>
          <img src="../assets/img/rules/tab1.png" alt="" class="img1">
          <h6>如何積累清新值？</h6>
          <p>製作完成指定清新甜品后即可獲得對應清新值</p>
          <img src="../assets/img/rules/tab2.png" alt="" class="img2">
        </div>
        <div class="tips2" v-else>
          <h6>進階任務及獎勵</h6>
          <img src="../assets/img/rules/tab3.png" alt="" class="img3">
          <h6>如何玩轉清新甜品屋？</h6>
          <img src="../assets/img/rules/tab4.png" alt="" class="img4">
          <h6>注意事項</h6>
          <p class="blue">榜單獎勵在5個工作日內發放</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: 1
    }
  },
  methods: {
    tabClick(val) {
      this.type = val
    },
    closeRules() {
      this.$parent.showRules = false
    }
  }
}
</script>
<style lang="scss">
.rule {
  width: 7.1rem;
  height: 9.6rem;
  background: url(../assets/img/rulesBg.png);
  background-size: 100% 100%;
  padding-top: 1.61rem;
  p {
    font-size: 0.26rem;
    padding-left: 0.3rem;
  }
  .tips {
    padding: 0 0.51rem;
    .tabs {
      width: 5.65rem;
      height: 0.73rem;
      display: flex;
      background: url(../assets/img/ruleTabs.png);
      background-size: 100% 100%;
      margin: 0.13rem auto 0;
      span {
        width: 2.99rem;
        height: 0.73rem;
        color: rgba(40, 146, 199, 1);
        font-size: 0.27rem;
        text-align: center;
        line-height: 0.73rem;
        &.act {
          color: #fff;
          background: url(../assets/img/ruleAct.png);
          background-size: 100% 100%;
        }
      }
    }
    .actTime {
      text-align: center;
      margin: 0.11rem auto;
    }
    .tipsCon {
      height: 6.8rem;
      overflow-y: scroll;
    }
    .blue {
      color: rgba(20, 120, 172, 1);
    }
    h6 {
      margin: 0.1rem 0;
      color: rgba(4, 111, 165, 1);
      font-weight: 600;
    }
    .img1 {
      width: 5.48rem;
      height: 2.48rem;
      margin-left: 0.3rem;
    }
    .img2 {
      width: 2.98rem;
      height: 2.49rem;
      margin-left: 0.3rem;
    }
    .img3 {
      width: 5.48rem;
      height: 2.01rem;
      margin-left: 0.3rem;
    }
    .img4 {
      width: 6.67rem;
      height: 4.29rem;
      margin-left: -0.6rem;
    }
  }
  .close {
    display: block;
    width: 0.51rem;
    height: 0.51rem;
    background: url(../assets/img/close2.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0.34rem;
    top: 1rem;
    z-index: 10;
  }
}
</style>
