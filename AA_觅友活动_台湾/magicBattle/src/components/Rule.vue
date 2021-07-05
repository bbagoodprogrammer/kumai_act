<template>
  <div class="rule">
    <i class="close" @click="$parent.showRule = false"></i>
    <p class="actTm">{{lang.rule_tm}}</p>
    <div class="tab">
      <span :class="{act:type == 1}" @click="type = 1">{{lang.rule_tab1}}</span>
      <span :class="{act:type == 2}" @click="type = 2">{{lang.rule_tab2}}</span>
    </div>
    <div class="con">
      <div class="ruleItem" v-if="type == 1">
        <div v-for="(item,index) in lang.ruleItem" :key="index">
          <h6>{{item.h6}}</h6>
          <p v-html="item.p"></p>
          <p v-html="item.p2" v-if="item.p2"></p>
        </div>
      </div>
      <div class="giftItem" v-else>
        <div v-for="(item,index) in lang.giftItem" :key="index">
          <h6>{{item.h6}}</h6>
          <p v-html="item2" v-for="(item2,index2) in item.p" :key="index2"></p>
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
  }
}
</script>

<style lang="scss" scoped>
.rule {
  width: 6.16rem;
  height: 7.33rem;
  padding: 0.69rem 0.5rem 0;
  background: url(../img/ruleBg.png);
  background-size: 100% 100%;
  position: relative;
  .actTm {
    text-align: center;
    color: #96451D;
    font-size: 0.26rem;
  }
  .tab {
    height: 0.68rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0.3rem auto;
    span {
      width: 2.94rem;
      height: 0.78rem;
      text-align: center;
      line-height: 0.78rem;
      background: url(../img/notAct.png);
      background-size: 100% 100%;
      &.act {
        background: url(../img/singBtn.png);
        background-size: 100% 100%;
      }
    }
  }
  .con {
    height: 5rem;
    overflow-y: scroll;
    h6 {
      color: #330D0E;
      margin: 0.2rem 0;
    }
    p {
      font-size: 0.28rem;
      color: #96451D;
    }
  }
  .close {
    display: block;
    width: 0.79rem;
    height: 0.78rem;
    background: url(../img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0.44rem;
    top: 0;
  }
}
</style>