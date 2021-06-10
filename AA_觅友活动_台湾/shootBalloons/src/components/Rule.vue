<template>
  <div class="rule">
    <i class="close" @click="$parent.showRule = false"></i>
    <p class="actTm">{{lang.rule_tm}}</p>
    <!-- <div class="tabs">
      <a class="tab1" @click.prevent="mainTab=0" :class="{current:mainTab==0}" href="">{{lang.rule_tab1}}</a>
      <a class="tab2" @click.prevent="mainTab=1" :class="{current:mainTab==1}" href="">{{lang.rule_tab2}}</a>
    </div> -->
    <div class="tips">
      <div v-for="(item,index) in rule_item" :key="index">
        <h6>{{item.h6}}</h6>
        <div class="giftList" v-if="item.giftList">
          <div class="giftItem" v-for="(item2,index2) in item.giftList" :key="index2">
            <div class="imgBox">
              <img :src="item2.img" alt="">
            </div>
            <strong>
              {{item2.name}}
            </strong>
          </div>
        </div>
        <p v-for="(item2,index2) in item.p" :key="index2">
          {{item2}}
        </p>
        <img :src="item.img" alt="" v-if="item.img" class="ruleTable">
      </div>
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
  computed: {
    rule_item () {
      return this.lang.rule_item
    }
  }
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
  .giftList {
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0.2rem 0;
    .giftItem {
      width: 1.7rem;
      .imgBox {
        width: 1.5rem;
        height: 1.5rem;
        background: #F5D9A8;
        display: flex;
        align-items: center;
        margin: 0 auto;
        img {
          width: 1.38rem;
          height: 1.38rem;
          margin: 0 auto;
        }
      }
      strong {
        display: block;
        text-align: center;
        font-size: 0.26rem;
        color: #7D4903;
        margin-top: 0.13rem;
      }
    }
  }
  .ruleTable {
    width: 4.31rem;
    height: 2.54rem;
    margin: 0.1rem auto;
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