<template>
  <div class="rules">
    <i class="close" @click="closeRule()"></i>
    <div class="title"></div>
    <div class="rulesTips"></div>
    <div class="ruleTime">活動時間：4月22日 20：00-5月1日 23：59：59</div>
    <div class="tabs " :class="{act:showType == 2}">
      <span @click="tabCLick(1)" class="tab1">經營田地產食物</span>
      <span @click="tabCLick(2)" class="tab2">活動獎勵</span>
    </div>
    <div class="ruleCon" ref="con">
      <div class="ruleItem" v-show="showType == 1">
        <h6>1、完成日常任務，增加梅花鹿成長值~~梅花鹿長大後能解鎖田地，等級越高田地種出的食物成長值越高</h6>
        <img src="../assets/img/rulesImg/ruleImg3.png" alt="" class="ruleImg1">
        <h6>2、完成成長任務，直接增加梅花鹿成長值，加速成長~</h6>
        <img src="../assets/img/rulesImg/ruleImg4.png" alt="" class="ruleImg2">
      </div>
      <div class="giftItem" v-show="showType == 2">
        <h6>1、梅花鹿升級獎勵</h6>
        <img src="../assets/img/rulesImg/ruleImg1.png" alt="" class="ruleImg3">
        <h6>2、榜單獎勵</h6>
        <img src="../assets/img/rulesImg/ruleImg2.png" alt="" class="ruleImg4">
        <p class="giftTips">玩家需養成天籟之聲鹿並達到排行榜前三名可獲得對應榜單獎勵</p>
        <!-- <div class="wardTips">
          <h3>注意事項：</h3>
          <p>音覓背包功能將在1.80版本上線，敬請期待~活動獎勵的禮物將在活動結束後發放到玩家的背包中</p>
        </div> -->
      </div>
      <div class="lastTips">*活動最終解釋權歸活動主辦方所有</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      showType: 1
    }
  },
  methods: {
    tabCLick (type) {
      if (this.showType == type) return
      this.showType = type
      this.$refs.con.scrollTo(0, 0)
    },
    closeRule () {
      this.$emit('closeRule')
    }
  }
}
</script>
<style lang="scss" scoped>
.rules {
  width: 6.34rem;
  height: 9rem;
  padding: 0 0.23rem;
  background: rgba(226, 255, 194, 1);
  border: 0.04rem solid rgba(202, 255, 148, 1);
  // box-shadow: -0.01rem 0.1rem 0.31rem 0.1rem rgba(255, 255, 255, 0.75);
  border-radius: 0.1rem;
  position: absolute;
  left: 0.35rem;
  top: 1.35rem;
  .close {
    display: block;
    width: 0.32rem;
    height: 0.32rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0.25rem;
    top: 0.25rem;
  }
  .title {
    width: 3.67rem;
    height: 0.49rem;
    background: url(../assets/img/rulesImg/title.png);
    background-size: 100% 100%;
    margin: 0.43rem auto 0;
  }
  .rulesTips {
    width: 6.38rem;
    height: 1.05rem;
    background: url(../assets/img/rulesImg/rulesTips.png);
    background-size: 100% 100%;
    margin: 0.25rem auto 0.3rem;
  }
  .ruleTime {
    font-size: 0.28rem;
    color: #5f962d;
    font-weight: bold;
  }
  .ruleCon {
    max-height: 5.3rem;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .tabs {
    width: 5.7rem;
    height: 0.66rem;
    background: url(../assets/img/rulesImg/tab2.png);
    background-size: 100% 100%;
    display: flex;
    margin: 0 auto;
    span {
      flex: 1;
      text-align: center;
      line-height: 0.66rem;
      font-weight: bold;
      &.tab1 {
        color: #5f9512;
      }
      &.tab2 {
        color: #d5f120;
      }
    }
    &.act {
      background: url(../assets/img/rulesImg/tab1.png);
      background-size: 100% 100%;
      .tab1 {
        color: #d5f120;
      }
      .tab2 {
        color: #5f9512;
      }
    }
  }
  .ruleItem,
  .giftItem {
    font-size: 0.24rem;
    color: #5f9512;
    font-weight: 500;
    h6 {
      margin: 0.56rem 0 0.32rem;
      font-size: 0.24rem;
      color: #5f9512;
      font-weight: 500;
    }
    .ruleImg1 {
      width: 6.39rem;
      height: 2.81rem;
      margin: 0 auto;
    }
    .ruleImg2 {
      width: 6.39rem;
      height: 4.89rem;
      margin: 0 auto;
    }
    .ruleImg3 {
      width: 6.39rem;
      height: 5.96rem;
      margin: 0 auto;
    }
    .ruleImg4 {
      width: 6.39rem;
      height: 3.85rem;
      margin: 0 auto;
    }
    .giftTips {
      text-align: center;
      font-size: 0.2rem;
      color: #7dc331;
    }
    .wardTips {
      width: 6.4rem;
      height: 1.57rem;
      margin-top: 0.4rem;
      background: url(../assets/img/rulesImg/tipsBg.png);
      background-size: 100% 100%;
      h3 {
        width: 1.5rem;
        color: #eafcd6;
        font-size: 0.24rem;
        font-weight: bold;
        height: 0.55rem;
        text-align: center;
        line-height: 0.65rem;
      }
      p {
        color: #5f9512;
        font-size: 0.24rem;
        font-weight: 500;
        margin-top: 0.15rem;
        padding: 0 0.23rem;
      }
    }
  }
  .lastTips {
    text-align: center;
    margin: 0.39rem auto 0;
    font-size: 0.24rem;
    color: #7dc331;
  }
}
</style>
