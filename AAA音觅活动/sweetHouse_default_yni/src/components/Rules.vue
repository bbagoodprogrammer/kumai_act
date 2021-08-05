<template>
  <div class="rule">
    <i class="close" @click="closeRules()"></i>
    <div class="tips">
      <p>{{lang.ruleTips}}</p>
      <div class="tabs">
        <span :class="{act:type==1}" @click="tabClick(1)">{{lang.ruleTab1}}</span>
        <span :class="{act:type==2}" @click="tabClick(2)">{{lang.ruleTab2}}</span>
      </div>
      <p class="actTime">{{lang.ruleTm}}</p>
      <div class="tipsCon">
        <div class="tips1" v-if="type==1">
          <h6>{{lang.ruleListItem1}}</h6>
          <p>{{lang.ruleListItem2}}</p>
          <p class="blue">{{lang.ruleListItem3}}</p>
          <h6>{{lang.ruleListItem1}}</h6>
          <img src="../assets/img/rules/ruleTab1.png" alt="" class="img1">
          <h6>{{lang.ruleListItem4}}</h6>
          <p>{{lang.ruleListItem5}}</p>
          <img src="../assets/img/rules/ruleTab2.png" alt="" class="img2">
          <p class="blue">{{lang.ruleListItem11}}</p>
          <p class="blue">{{lang.ruleListItem6}}</p>
        </div>
        <div class="tips2" v-else>
          <h6>{{lang.ruleListItem7}}</h6>
          <img src="../assets/img/rules/ruleTab3.png" alt="" class="img3">
          <h6>{{lang.ruleListItem8}}</h6>
          <img src="../assets/img/rules/ruleTab4.png" alt="" class="img4">
          <h6>{{lang.ruleListItem9}}</h6>
          <p class="blue">{{lang.ruleListItem10}}</p>
          <p class="blue">{{lang.ruleListItem11}}</p>
          <p class="blue">{{lang.ruleListItem6}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      type: 1
    }
  },
  methods: {
    tabClick (val) {
      this.type = val
    },
    closeRules () {
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
    color: rgba(233, 140, 86, 1);
  }
  .tips {
    // padding: 0 0.51rem;
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
        // color: rgba(40, 146, 199, 1);
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
      h6,
      p {
        padding: 0 0.51rem;
      }
    }
    .blue {
      color: rgba(174, 6, 5, 1);
    }
    h6 {
      margin: 0.1rem 0;
      color: rgba(174, 6, 5, 1);
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
      width: 6.14rem;
      height: 2.56rem;
      margin-left: 0.3rem;
    }
    .img4 {
      display: block;
      width: 6.26rem;
      height: 4.27rem;
      margin-left: 0.2rem;
      z-index: 10;
    }
  }
  .close {
    display: block;
    width: 0.51rem;
    height: 0.51rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0.34rem;
    top: 1rem;
    z-index: 10;
  }
}
</style>
