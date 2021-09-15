<template>
  <div class="rule">
    <i class="close" @click="$parent.showRule = false"></i>
    <div class="title">{{lang.ruleTitle}}</div>
    <div class="tabs">
      <span :class="{act:type== 1}" @click="type = 1">{{lang.ruleTab1}}</span>
      <span :class="{act:type== 2}" @click="type =2">{{lang.ruleTab2}}</span>
    </div>
    <div class="con">
      <div class="ruleTips" v-if="type == 1">
        <h6>{{lang.ruleTips1}}</h6>
        <p v-html="lang.ruleTips2"></p>
        <h6>{{lang.ruleTips3}}</h6>
        <p v-html="lang.ruleTips4">
        </p>
        <h6>{{lang.ruleTips5}}</h6>
        <p v-html="lang.ruleTips6">
        </p>
        <h6>{{lang.ruleTips7}}</h6>
        <p v-html="lang.ruleTips8" class="mb">
        </p>
        <p class="mb"> {{lang.ruleTips9}}</p>
        <p v-html="lang.ruleTips10" class="mb">
        </p>
        <p class="mb">{{lang.ruleTips11}} </p>
        <p class="mb">{{lang.ruleTips12}}</p>
        <p class="lastIips">*{{lang.ruleTips13}}</p>
      </div>
      <div class="giftTips" v-else>
        <div class="giftList">
          <div class="giftItem" v-for="(item,index) in giftArr" :key="index">
            <div class="imgBox">
              <img :src="item.img" alt="">
            </div>
            <strong>{{item.name}}</strong>
          </div>
        </div>
        <p>{{lang.wardTop1}}</p>
        <p>{{lang.wardTop2}}</p>
        <p>{{lang.wardTop3}}</p>
        <p>{{lang.wardTop4}}</p>
        <p>{{lang.wardTop5}}</p>
        <p class="lastIips">*{{lang.ruleTips13}}</p>
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
  ,
  computed: {
    giftArr () {
      return this.lang.giftArr
    }
  }
}
</script>

<style lang="scss">
.rule {
  width: 6.33rem;
  padding: 0 0.5rem;
  height: 11.05rem;
  padding-top: 0.3rem;
  background: url(../img/ruleBg.png);
  background-size: 100% 100%;
  position: relative;
  .mb {
    margin-bottom: 0.2rem;
  }
  .close {
    width: 0.54rem;
    height: 0.54rem;
    background: url(../img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0.2rem;
    top: 0;
  }
  .title {
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    font-size: 0.4rem;
    color: #8E4908;
    font-weight: bold;
    text-shadow: #FFFFDB 1px 0 0, #FFFFDB 0 1px 0, #FFFFDB -1px 0 0,
      #FFFFDB 0 -1px 0;
  }
  .tabs {
    width: 4rem;
    height: 0.54rem;
    background: #F7E2BD;
    border-radius: 0.27rem;
    margin: 0.3rem auto 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 0.54rem;
    span {
      flex: 1;
      height: 100%;
      text-align: center;
      font-size: 0.28rem;
      color: #8E4908;
      &.act {
        background: url(../img/buy.png);
        background-size: 100% 100%;
      }
    }
  }
  .con {
    height: 8.8rem;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  h6 {
    color: #EC933B;
    font-size: 0.28rem;
    margin: 0.38rem 0 0.21rem;
    font-weight: bold;
  }
  p {
    color: #672A0B;
    font-size: 0.28rem;
  }
  .giftTips {
    p {
      margin-bottom: 0.3rem;
    }
  }
  .giftList {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 0.31rem;
    .giftItem {
      width: 1.49rem;
      margin-bottom: 0.2rem;
    }
    .giftItem:nth-child(5) {
      margin-left: 0.6rem;
    }
    .giftItem:nth-child(7) {
      margin-right: 0.6rem;
    }
    .imgBox {
      width: 1.49rem;
      height: 1.49rem;
      background: #EEAC6E;
      border: 0.04rem solid #FFECB4;
      border-radius: 0.1rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    strong {
      width: 100%;
      display: block;
      text-align: center;
      font-size: 0.26rem;
      color: #672A0B;
    }
  }
  .lastIips {
    text-align: center;
    font-size: 0.28rem;
    color: #EC933B;
    margin-top: 0.5rem;
  }
}
</style>