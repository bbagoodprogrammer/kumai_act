<template>
  <div class="rule">
    <i class="close" @click="closeRule()"></i>
    <div class="title"><i></i></div>
    <div class="actTime">{{lang.ruleTm}}{{tm}}</div>
    <div class="tab">
      <span class="ruleTab" :class="{act:type == 1}" @click="tabClick(1)">{{lang.ruleTab1}}</span>
      <span class="wardTab" :class="{act:type == 2}" @click="tabClick(2)">{{lang.ruleTab2}}</span>
    </div>
    <div class="ruleTips" v-if="type== 1">
      <h6>{{lang.ruleTips1}}</h6>
      <p>{{lang.ruleTips2}}</p>
      <p>{{lang.ruleTips3}}</p>
      <h6>{{lang.ruleTips4}}</h6>
      <img src="../assets/img/rule/table1.png" alt="" class="table">
      <p class="red">{{lang.ruleTips5}}</p>
      <p>{{lang.ruleTips6}}</p>
      <p>{{lang.ruleTips7}}</p>
      <h6>{{lang.ruleTips8}}</h6>
      <p>{{lang.ruleTips9}}</p>
      <p>{{lang.ruleTips10}}</p>
      <p>{{lang.ruleTips11}}</p>
    </div>
    <div class="wardsTips" v-if="type== 2">
      <h6>{{lang.ruleTips12}}</h6>
      <div class="giftBox">
        <span v-for="(item,index) in gift1" :key="index">
          <img :src="item.img" alt="">
          <strong>{{item.name}}</strong>
        </span>
      </div>
      <h6>{{lang.ruleTips13}}</h6>
      <div class="giftBox">
        <span v-for="(item,index) in gift2" :key="index">
          <img :src="item.img" alt="">
          <strong>{{item.name}}</strong>
        </span>
      </div>
      <h6>{{lang.ruleTips14}}</h6>
      <h6>{{lang.ruleTips15}}</h6>
    </div>
    <p class="lastTips">{{lang.ruleTips16}}</p>
  </div>
</template>
<script>

import getDate from "../utils/getDate"
import { mapState } from "vuex"
export default {
  data () {
    return {
      type: 1,
    }
  },
  computed: {
    ...mapState(['stime', 'etime']),
    tm () {
      return getDate(new Date(this.stime * 1000), 4) + '~' + getDate(new Date(this.etime * 1000), 4)
    },
    gift1 () {
      return this.lang.gift1
    },
    gift2 () {
      return this.lang.gift2
    }
  },
  methods: {
    tabClick (val) {
      this.type = val
    },
    closeRule () {
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
  height: 3.02rem;
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
          font-size: 0.22rem;
          text-align: center;
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
