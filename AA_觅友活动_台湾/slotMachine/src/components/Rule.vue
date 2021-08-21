<template>
  <div class="rule">
    <i class="close" @click="$parent.showRule = false"></i>
    <div class="title">{{lang.indexRuleTips1}}</div>
    <div class="con">
      <h6>{{lang.ruleTm}}{{aTimer}}</h6>
      <h6>{{lang.ruleTips1}}</h6>
      <p>{{lang.ruleTips2}}</p>
      <div class="giftList">
        <div class="item" v-for="(item,index) in gift1 " :key="index">
          <div class="imgBox">
            <img :src="item.img" alt="">
          </div>
          <strong>{{item.name}}</strong>
        </div>
      </div>
      <h6>{{lang.ruleTips3}}</h6>
      <div class="table1"></div>
      <!-- <div class="table2"></div> -->
      <h6>{{lang.ruleTips4}}</h6>
      <p>{{lang.ruleTips5}}</p>
      <p>{{lang.ruleTips6}}</p>
      <p v-html="lang.ruleTips7">
      </p>
      <div class="giftList">
        <div class="item" v-for="(item,index) in gift2" :key="index">
          <div class="imgBox">
            <img :src="item.img" alt="">
          </div>
          <strong>{{item.name}}</strong>
        </div>
      </div>
      <h6>{{lang.ruleTips8}}</h6>
      <p v-html="lang.ruleTips9"></p>
      <h6>{{lang.ruleTips10}}</h6>
      <h6>{{lang.lastTips}}</h6>
    </div>

  </div>
</template>

<script>
import getDate from "../utils/getDate"
import { mapState } from "vuex"

export default {
  computed: {
    ...mapState(['activity']),
    aTimer () {
      if (AREA == 'tw') {
        return getDate(new Date(this.activity.stime * 1000), 1) + '-' + getDate(new Date(this.activity.etime * 1000), 1)
      } else if (AREA == 'vn') {
        return getDate(new Date(this.activity.stime * 1000), 2) + '-' + getDate(new Date(this.activity.etime * 1000), 2)
      }
    },
    gift1 () {
      return this.lang.gift1
    },
    gift2 () {
      return this.lang.gift2
    }
  }
}
</script>

<style lang="scss">
.giftList {
  padding: 0 0.54rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 0.3rem;
  .item {
    width: 1.6rem;
  }
  .imgBox {
    width: 1.6rem;
    height: 1.6rem;
    background: url(../img/giftImgBg.png);
    background-size: 100% 100%;
  }
  strong {
    display: block;
    text-align: center;
    margin-bottom: 0.2rem;
    margin-top: 0.05rem;
    font-size: 0.24rem;
  }
}
.rule {
  position: relative;
  width: 7.13rem;
  height: 9.95rem;
  background: url(../img/ruleBg.png);
  background-size: 100% 100%;
  .title {
    height: 1.1rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.34rem;
  }
  .con {
    height: 8.7rem;
    padding: 0 0.28rem;
    overflow-y: scroll;
    h6 {
      font-size: 0.28rem;
      color: #E25DFF;
      margin: 0.25rem 0;
    }
    p {
      font-size: 0.28rem;
    }
  }
  .close {
    display: block;
    width: 0.66rem;
    height: 0.66rem;
    background: url(../img/close.png);
    background-size: 100% 100%;
    position: absolute;
    top: 0.1rem;
    right: 0.1rem;
  }
}
</style>