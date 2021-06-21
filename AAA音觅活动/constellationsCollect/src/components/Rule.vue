
<template>
  <div class="rule">
    <i class="close" @click="$parent.showRule = false"></i>
    <div class="title">{{lang.rule_title}}</div>
    <div class="ruleCon">
      <p class="tm">{{lang.rule_tm}}</p>
      <h5>{{lang.rule_p1}}</h5>
      <p>{{lang.rule_p2}}</p>
      <h5>{{lang.rule_p3}}</h5>
      <p>{{lang.rule_p4}}</p>
      <p>{{lang.rule_p5}}</p>
      <div class="giftList">
      </div>
      <h5>{{lang.rule_p6}}</h5>
      <p>{{lang.rule_p7}}</p>
      <p>{{lang.rule_p8}}</p>
      <p>{{lang.rule_p9}}</p>
      <p>{{lang.rule_p10}}</p>
      <p class="lastTips">{{lang.rule_p11}}</p>
    </div>
  </div>

</template>

<script>
export default {

}
</script>

<style lang="scss">
.rule {
  width: 7.07rem;
  height: 7.53rem;
  background: url(../img/history.png);
  background-size: 100% 100%;
  position: relative;
  .close {
    width: 0.69rem;
    height: 0.69rem;
    background: url(../img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: -0.15rem;
    top: -0.15rem;
  }
  .title {
    height: 0.8rem;
    text-align: center;
    line-height: 0.8rem;
    font-size: 0.32rem;
    color: #fff;
  }
  .ruleCon {
    color: #fff;
    padding: 0 0.34rem;
    max-height: 6.2rem;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    -webkit-overflow-scrolling: auto;
    margin-top: 0.2rem;
    .tm {
      font-size: 0.24rem;
      color: rgba(90, 224, 248, 1);
    }
    h5 {
      font-size: 0.28rem;
      margin-top: 0.25rem;
    }
    p {
      font-size: 0.26rem;
      color: rgba(246, 223, 254, 1);
    }
    .lastTips {
      font-size: 0.24rem;
      color: rgba(90, 224, 248, 1);
      text-align: center;
      margin-top: 0.6rem;
    }
  }
}
</style>