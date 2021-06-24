<template>
  <div class="rule">
    <i class="close" @click="$parent.showRule = false"></i>
    <div class="tabs">
      <a class="tab1" @click.prevent="mainTab=0" :class="{current:mainTab==0}" href="">{{lang.rule_tab1}}</a>
      <a class="tab2" @click.prevent="mainTab=1" :class="{current:mainTab==1}" href="">{{lang.rule_tab2}}</a>
    </div>
    <div class="rule_con">
      <p class="tm">{{lang.act_tm}}</p>
      <div class="ruleTips " v-if="!mainTab">
        <div v-for="(item,index) in rule_tips" :key="index">
          <h5>{{item.h5}}</h5>
          <p v-html="item.p"></p>
          <div class="giftList first" v-if="item.gift">
            <div class="giftItem" v-for="(item,index) in item.gift" :key="index">
              <div class="imgBox">
                <img :src="item.img" alt="">
              </div>
              <strong v-html="item.name"></strong>
            </div>
          </div>
        </div>
      </div>
      <div class="giftTips" v-else>
        <h5>{{lang.gift_title1}}</h5>
        <div class="giftFirstTips" v-for="(item,index) in gift_tips" :key="index">
          <h6>{{item.title}}</h6>
          <div class="giftList ml">
            <div class="giftItem" v-for="(item2,index2) in item.gift" :key="index2">
              <div class="imgBox">
                <img :src="item2.img" alt="">
              </div>
              <strong v-html="item2.name"></strong>
            </div>
          </div>

        </div>
        <p>
          {{lang.gift_p1}}
        </p>
        <h5>{{lang.gift_title2}}</h5>
        <div class="ruleTable"></div>
        <p>{{lang.gift_p2}}</p>
        <h5>{{lang.gift_title3}}</h5>
        <div class="giftList">
          <div class="giftItem" v-for="(item,index) in giftArr2" :key="index">
            <div class="imgBox">
              <img :src="item.img" alt="">
            </div>
            <strong v-html="item.name"></strong>
          </div>
        </div>
        <p v-html="lang.gift_p3">
        </p>
        <p class="mt">{{lang.gift_p4}}</p>
      </div>
      <p class="lastTips">{{lang.gift_lastTips}}</p>
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
    rule_tips () {
      return this.lang.rule_tips
    },
    giftArr2 () {
      return this.lang.giftArr2
    },
    gift_tips () {
      return this.lang.gift_tips
    }
  }
}
</script>

<style lang="scss" scoped>
.close {
  width: 0.7rem;
  height: 0.7rem;
  background: url(../img/close.png);
  background-size: 100% 100%;
  position: absolute;
  top: -1rem;
  right: 0.2rem;
}
.giftList {
  &.first {
    flex-wrap: wrap;
    .giftItem:nth-child(1) {
      margin-left: 1rem;
    }
    .giftItem:nth-child(2) {
      margin-right: 1rem;
    }
  }
}
.rule {
  padding-top: 1.22rem;
  position: relative;
  .tabs {
    padding: 0 0.59rem;
    height: 0.88rem;
    border-radius: 0.44rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    a {
      width: 2.72rem;
      height: 0.79rem;
      line-height: 0.79rem;
      background: url(../img/tab_bg.png);
      background-size: 100% 100%;
      text-align: center;
      color: rgba(136, 214, 255, 1);
      font-size: 0.34rem;
      font-weight: bold;
      transition: all 0.1s ease;
      &.current {
        width: 2.82rem;
        height: 0.82rem;
        line-height: 0.82rem;
        color: #fff;
        background: url(../img/tab_act.png);
        background-size: 100% 100%;
      }
    }
  }
  .rule_con {
    height: 6rem;
    overflow-y: scroll;
    padding: 0 0.28rem;
    .tm {
      font-size: 0.26rem;
      margin: 0.1rem auto;
    }
    h5 {
      font-size: 0.28rem;
      color: rgba(196, 232, 255, 1);
      margin: 0.25rem 0 0.15rem;
    }
    p {
      color: rgba(114, 234, 255, 1);
      font-size: 0.26rem;
    }
  }
  .giftList {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.25rem;
    .imgBox {
      width: 1.6rem;
      height: 1.6rem;
      background: url(../img/luckGift_bg.png);
      background-size: 100% 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 1.34rem;
        height: 1.34rem;
      }
    }
    strong {
      width: 1.7rem;
      height: 0.7rem;
      display: block;
      text-align: center;
      font-size: 0.24rem;
      margin: 0.11rem auto;
    }
  }
  .giftTips {
    h6 {
      font-size: 0.26rem;
      color: rgba(114, 234, 255, 1);
    }
    .giftList {
      &.ml {
        justify-content: center;
        .giftItem {
          margin-left: 0.15rem;
        }
      }
    }
  }
  .mt {
    margin-top: 0.22rem;
  }
  .lastTips {
    text-align: center;
    font-size: 0.24rem;
    color: rgba(196, 232, 255, 1) !important;
    margin-top: 0.4rem;
  }
}
</style>