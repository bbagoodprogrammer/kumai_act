<template>
  <div class="rule">
    <i class="close" @click="$parent.showRule = false"></i>
    <p class="actTm">活動時間：10.10-20-19</p>
    <!-- <div class="tabs">
      <a class="tab1" @click.prevent="mainTab=0" :class="{current:mainTab==0}" href="">{{lang.rule_tab1}}</a>
      <a class="tab2" @click.prevent="mainTab=1" :class="{current:mainTab==1}" href="">{{lang.rule_tab2}}</a>
    </div> -->
    <div class="tips">
      <h6>趣味射氣球</h6>
      <p>1、投入金幣即可參與射氣球，彈珠砲台50金幣/次，飛鏢砲台100金幣/次；還有機會射中氣球大獎（2000-10000金幣）</p>
      <h6>射手排行榜規則</h6>
      <p>1、彈珠砲台和飛鏢砲台共用一個射手榜</p>
      <p>2、射手榜按照命中值從高到低排序，若命中值一致，則先達到的優先</p>
      <p>3、射中的獎勵提供指定的命中值</p>
      <p>射氣球所得的1金豆=1命中值、1金幣=1命中值、1個背包禮物=200命中值</p>
      <h6>射手排行榜獎勵</h6>
      <p>第一名：超級射手-認證（7天）+超級射手-勛章（10天）+紫色魅影-座駕（10天）</p>
      <p>第二名：超級射手-勛章（7天）+紫色魅影-座駕（7天）</p>
      <p>第三名：超級射手-勛章（5天）+紫色魅影-座駕（5天）</p>
      <h6>注意事項</h6>
      <p>1、活動中，若發現玩家用不正當手段參與活動，小音有權在不事先通知的情況下按情節嚴重對參與玩家、違規者取消上榜資格、封禁賬號、收回該玩家所有獎勵等處罰，包括但不限於：</p>
      <p>a）不正當獲得金幣、活動指定禮物，並惡意刷分</p>
      <p>b）活動期間對參與活動的玩家進行惡意攻擊、造謠</p>
      <p>2、活動中送出的所有禮物有效期均為7天</p>
      <p>3、本活動與蘋果公司無關</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mainTab: 0,
    }
  },
}
</script>

<style lang="scss">
.rule {
  position: relative;
  .tabs {
    width: 5.76rem;
    height: 0.66rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    background: url(../img/ruleTab_bg.png);
    background-size: 100% 100%;
    a {
      width: 2.88rem;
      height: 0.69rem;
      line-height: 0.69rem;
      text-align: center;
      color: #A3541B;
      font-size: 0.26rem;
      font-weight: bold;
      transition: all 0.1s ease;
      &.current {
        background: url(../img/tab_act.png);
        background-size: 100% 100%;
      }
    }
  }
  .actTm {
    text-align: center;
    font-size: 0.24rem;
    color: #A9650A;
    margin: 0.2rem auto;
  }
  .tips {
    padding: 0 0.39rem;
    height: 5.8rem;
    overflow-y: scroll;
    h6 {
      color: #7D4903;
      margin: 0.33rem 0 0.12rem 0;
    }
    p {
      font-size: 0.26rem;
      color: #B88038;
    }
  }
}

.close {
  width: 0.7rem;
  height: 0.7rem;
  background: url(../img/close.png);
  background-size: 100% 100%;
  position: absolute;
  top: 0rem;
  right: 0.2rem;
}
</style>