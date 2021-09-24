<template>
  <div class="rule">
    <div class="con">
      <i class="close" @click="$parent.showRule= false"></i>
      <div class="tm">{{lang.ruleTm}}{{aTimer}}</div>
      <h6>{{lang.ruleTips1}}</h6>
      <p>{{lang.ruleTips2}}</p>
      <p>{{lang.ruleTips3}}</p>
      <h6>{{lang.ruleTips4}}</h6>
      <p>{{lang.ruleTips5}}</p>
      <p>{{lang.ruleTips6}}</p>
      <div class="giftList">
        <div class="giftItem" v-for="(item,index) in gift1" :key="index">
          <div class="imgBox">
            <img :src="item.img" alt="">
          </div>
          <strong>{{item.name}}</strong>
          <!-- <strong>+{{item.score}}{{lang.scoreName}}</strong> -->
        </div>
      </div>
      <h6>{{lang.ruleTips7}}</h6>
      <div class="giftList list2">
        <div class="giftItem" v-for="(item,index) in gift2" :key="index">
          <div class="imgBox">
            <img :src="item.img" alt="">
          </div>
          <strong>{{item.name}}</strong>
        </div>
      </div>
      <p>{{lang.ruleTips8}}</p>
      <p>{{lang.ruleTips9}}</p>
      <p>{{lang.ruleTips10}}</p>
      <h6>{{lang.ruleTips11}}</h6>
      <p v-html="lang.ruleTips12">
      </p>
      <p>{{lang.ruleTips13}}</p>
      <p class="lastTips">{{lang.ruleTips14}}</p>
    </div>

  </div>
</template>

<script>

import getDate from "../utils/getDate"
import { mapState } from "vuex"
export default {
  computed: {
    ...mapState(['activity']),
    gift1 () {
      return this.lang.gift1
    },
    gift2 () {
      return this.lang.gift2
    },
    aTimer () {
      if (AREA == 'tw') {
        return getDate(new Date(this.activity.stime * 1000), 1) + '-' + getDate(new Date(this.activity.etime * 1000), 1)
      } else if (AREA == 'vn') {
        return getDate(new Date(this.activity.stime * 1000), 2) + '-' + getDate(new Date(this.activity.etime * 1000), 2)
      }
    },
  }
}
</script>

<style lang="scss">
.rule {
  width: 7.6rem;
  height: 8rem;
  padding: 0.44rem 0.34rem;
  background: url(../img/ruleBg.png);
  background-size: 100% 100%;
  position: relative;
  .close {
    display: block;
    width: 0.7rem;
    height: 0.7rem;
    background: url(../img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    top: -0.8rem;
  }
  .tm {
    font-size: 0.25rem;
  }
  .giftList {
    padding: 0 1.54rem;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    margin: 0.1rem 0;
    .giftItem {
      margin-bottom: 0.25rem;
    }
    &.list2 {
      padding: 0 0.7rem;
    }
    .giftItem {
      width: 1.63rem;
    }
    .imgBox {
      width: 1.63rem;
      height: 1.49rem;
      background: url(../img/ruleGiftBg.png);
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 1.3rem;
        height: 1.3rem;
      }
    }
    strong {
      display: block;
      width: 100%;
      text-align: center;
      font-size: 0.26rem;
      color: #C76245;
    }
  }
  .con {
    height: 8rem;
    overflow-y: scroll;
    .tm {
      height: 0.7rem;
      line-height: 0.7rem;
      color: #FFE7B8;
      text-align: center;
    }
    h6 {
      color: #FFE7B8;
      margin-bottom: 0.25rem;
    }
    p {
      font-size: 0.28rem;
      color: #C76245;
      margin-bottom: 0.2rem;
    }
  }
  .lastTips {
    text-align: center;
    color: #FFE7B8 !important;
    margin-top: 1rem;
  }
}
</style>