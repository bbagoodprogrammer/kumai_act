<template>
  <div class="rule">
    <i class="close" @click="$parent.showRule = false"></i>
    <div class="title">{{lang.rule_tite}}{{aTimer}}</div>
    <div class="con">
      <div class="tm">{{lang.rule_tm}}</div>
      <h5>{{lang.rule_p_1}}</h5>
      <p>{{lang.rule_p_2}}</p>
      <h5>{{lang.rule_p_3}}</h5>
      <p>{{lang.rule_p_4}}</p>
      <span class="ruleImg1"></span>
      <h5>{{lang.rule_p_5}}</h5>
      <p>{{lang.rule_p_6}}</p>
      <p>{{lang.rule_p_7}}</p>
      <p>{{lang.rule_p_8}}</p>
      <div class="giftList">
        <div v-for="(item,index) in rule_gift1" :key="index">
          <div class="imgBox">
            <img :src="item.img" alt="">
          </div>
          <strong>{{item.name}}</strong>
        </div>
      </div>
      <h5> {{lang.rule_p_9}}</h5>
      <span class="ruleImg2"></span>
      <h5>{{lang.rule_p_10}}</h5>
      <div class="giftList mb">
        <div v-for="(item,index) in rule_gift2" :key="index">
          <div class="imgBox">
            <img :src="item.img" alt="">
          </div>
          <strong>{{item.name}}</strong>
        </div>
      </div>
      <p>{{lang.rule_p_11}}</p>
      <p>{{lang.rule_p_12}}</p>
      <p>{{lang.rule_p_13}}</p>
      <p>{{lang.rule_p_14}}</p>
      <h5>{{lang.rule_p_15}}</h5>
      <p>{{lang.rule_p_16}}</p>
      <p>{{lang.rule_p_17}}</p>
      <p>{{lang.rule_p_18}}</p>
      <p>{{lang.rule_p_19}}</p>
      <p>{{lang.rule_p_20}}</p>
      <h5>{{lang.rule_p_21}}</h5>
      <p>{{lang.rule_p_22}}</p>
      <p>{{lang.rule_p_23}}</p>
      <p class="lastTips">{{lang.rule_p_24}}</p>
    </div>
  </div>
</template>

<script>

import getDate from "../utils/getDate"
export default {
  data () {
    return {
    }
  },
  computed: {
    aTimer () {
      if (AREA == 'tw') {
        return getDate(new Date(this.activity.stime * 1000), 1) + '-' + getDate(new Date(this.activity.etime * 1000), 1)
      } else if (AREA == 'vn') {
        return getDate(new Date(this.activity.stime * 1000), 2) + '-' + getDate(new Date(this.activity.etime * 1000), 2)
      }
    },
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
      display: flex;
      align-items: center;
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