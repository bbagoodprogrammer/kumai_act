<template>
  <div class="rule">
    <i class='close' @click="$parent.showRule = false"></i>
    <div class="title">
      <i class="left"></i>
      <span>{{lang.rule_title}}</span>
      <i class="right"></i>
    </div>
    <div class="tm">{{lang.rule_tm}}</div>
    <div class="tabs">
      <span :class="{act:type == 1}" @click="type = 1">{{lang.rule_tab1}}</span>
      <span :class="{act:type == 2}" @click="type = 2">{{lang.rule_tab2}}</span>
    </div>
    <div class="ruleTips" v-if="type == 1">
      <h5>{{lang.rule_tips_h5}}</h5>
      <p>
        {{lang.rule_tips_p1}}
      </p>
    </div>
    <div class="giftTips" v-else>
      <h5>{{lang.rule_tips_h52}}</h5>
      <p>
        {{lang.rule_tips_p2}}
      </p>
    </div>
    <div class="other">
      <h4>{{lang.rule_tips_h4}}</h4>
      <p>{{lang.rule_tips_p3}}</p>
      <p>{{lang.rule_tips_p4}}</p>
      <p>{{lang.rule_tips_p5}}</p>
      <p>{{lang.rule_tips_p6}}</p>
      <p class="lastTips">{{lang.rule_tips_p7}}</p>
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

<style lang="scss">
.rule {
  width: 5.28rem;
  height: 7.62rem;
  background: url(../img/ruleBg.png);
  background-size: 100% 100%;
  color: rgba(211, 111, 32, 1);
  padding-top: 0.1rem;
  position: relative;
  .tm {
    font-size: 0.22rem;
    text-align: center;
    margin: 0.1rem 0;
  }
  .tabs {
    width: 4.65rem;
    height: 0.56rem;
    background: url(../img/tabs.png);
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    span {
      width: 2.36rem;
      height: 0.54rem;
      text-align: center;
      color: #fff;
      line-height: 0.54rem;
      &.act {
        color: rgba(216, 65, 61, 1);
        background: url(../img/tabs_act.png);
        background-size: 100% 100%;
      }
    }
  }
  p {
    font-size: 0.2rem;
    margin: 0.05rem 0;
  }
  h4 {
    height: 0.5rem;
    text-align: center;
    position: relative;
    font-size: 0.28rem;
    margin-top: 0.2rem;
  }
  h5 {
    font-size: 0.28rem;
    margin-top: 0.1rem;
  }
  h4::before {
    content: '';
    display: block;
    width: 4.64rem;
    height: 0.02rem;
    background: url(../img/liner.png);
    background-size: 100% 100%;
    position: absolute;
    top: 0.2rem;
  }
  .ruleTips,
  .other,
  .giftTips {
    padding: 0 0.3rem;
  }
  .lastTips {
    margin-top: 0.3rem;
    text-align: center;
  }
}
</style>