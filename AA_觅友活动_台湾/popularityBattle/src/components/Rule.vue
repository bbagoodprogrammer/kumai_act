<template>
  <div class="rule">
    <i class="close" @click="$parent.showRule = false"></i>
    <h5><i class="left"></i>{{lang.rule_title}}<i class="right"></i></h5>
    <div class="tab">
      <span :class="{act:type == 1}" @click="type = 1">{{lang.rule_tab1}}</span>
      <span :class="{act:type == 2}" @click="type = 2">{{lang.rule_tab2}}</span>
    </div>
    <div class="tm">{{lang.rule_tm}}</div>
    <div class="con">
      <div class="rule_tips" v-if="type == 1">
        <div v-for="(item,index) in rule_item" :key="index+'1'">
          <h6>{{item.title}}</h6>
          <p v-if="item.p1">{{item.p1}}</p>
          <p v-if="item.p2">{{item.p2}}</p>
        </div>

        <div class="rule_gift">
          <div class="giftItem" v-for="(item,index) in rule_gift" :key="index+'2'">
            <span>{{item.price}} <i></i> </span>
            <img :src="item.img" alt="">
            <div class="name">{{item.name}}</div>
            <div class="addScoreStr">{{item.addScoreStr}}</div>
          </div>
        </div>
        <h6>{{rule_tipsList.title}}</h6>
        <p v-for="(item,index) in rule_tipsList.p" :key="index+'3'">{{item}}</p>

      </div>
      <div class="gift_tips" v-if="type == 2">
        <h6>{{lang.gift_title1}}</h6>
        <div class="rule_gift gift">
          <div class="giftItem" v-for="(item,index) in luck_gift" :key="index+'1'">
            <img :src="item.img" alt="">
            <div class="name" v-html="item.name"></div>
            <div class="addScoreStr">{{item.addScoreStr}}</div>
          </div>
        </div>

        <div v-for="(item,index) in gift_top3" :key="index+'2'" class="giftTipsItem">
          <h6 class="nomt">{{item.title}}</h6>
          <p>{{item.p}}</p>
          <h6>{{lang.top1_title}}</h6>
          <p>{{item.p2}}</p>
        </div>

        <div class="rule_gift gift">
          <div class="giftItem" v-for="(item,index) in luck_gift2" :key="index+'3'">
            <img :src="item.img" alt="">
            <div class="name" v-html="item.name"></div>
            <div class="addScoreStr">{{item.addScoreStr}}</div>
          </div>
        </div>

        <div v-for="(item,index) in gift_other" :key="index+'4'" class="giftTipsItem">
          <h6 class="nomt">{{item.title}}</h6>
          <p v-for="(item2,index2) in item.p" :key="index2">{{item2}}</p>
        </div>

      </div>
      <p class="lastTips">{{lang.lastTips}}</p>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      type: 1,

    }
  },
  computed: {
    rule_item () {
      return this.lang.rule_item
    },
    rule_tipsList () {
      return this.lang.rule_tipsList
    },
    gift_top3 () {
      return this.lang.gift_top3
    },
    gift_other () {
      return this.lang.gift_other
    },
    rule_gift () {
      return this.lang.rule_gift
    },
    luck_gift () {
      return this.lang.luck_gift
    },
    luck_gift2 () {
      return this.lang.luck_gift2
    }
  }
}
</script>

<style lang="scss">
.nomt {
  margin-top: 0 !important;
}
.fb {
  font-weight: bold;
}
.lastTips {
  text-align: center;
  margin-top: 0.3rem;
}
.rule {
  width: 7.22rem;
  height: 10.36rem;
  background: url(../img/rule_bg.png);
  background-size: 100% 100%;
  position: relative;
  .close {
    display: block;
    width: 0.74rem;
    height: 0.74rem;
    background: url(../img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    top: -0.4rem;
  }
  h5 {
    height: 1.03rem;
    display: flex;
    align-items: center;
    justify-content: center;
    i {
      width: 2.26rem;
      height: 0.33rem;
      background: url(../img/rule_left.png);
      background-size: 100% 100%;
      &.right {
        background: url(../img/rule_right.png);
        background-size: 100% 100%;
        margin-left: 0.32rem;
      }
      &.left {
        margin-right: 0.32rem;
      }
    }
  }
  .tab {
    width: 6.92rem;
    height: 0.79rem;
    background: url(../img/rule_tab.png);
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    span {
      flex: 1;
      height: 0.82rem;
      text-align: center;
      line-height: 0.7rem;
      margin-top: 0.06rem;
      color: #BD6EF5;
      &.act {
        color: #fff;
        background: url(../img/rule_tab_act.png);
        background-size: 100% 100%;
      }
    }
  }
  .tm {
    text-align: center;
    color: #FFEA59;
    font-size: 0.28rem;
    margin-top: 0.26rem;
  }
  .con {
    height: 7.63rem;
    padding: 0 0.29rem;
    overflow-y: scroll;
    h6 {
      font-size: 0.28rem;
      color: #FC9DCE;
      margin-top: 0.27rem;
      font-weight: 600;
    }
    p {
      font-size: 0.26rem;
    }
  }
  .rule_gift {
    padding: 0 0.34rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.42rem;
    &.gift {
      padding: 0;
      margin: 0.22rem 0;
      .giftItem {
        width: 1.62rem;
        height: 1.94rem;
        img {
          width: 1.55rem;
          height: 1.25rem;
          margin: 0 auto;
        }
        .name {
          height: 0.65rem;
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    .giftItem {
      width: 1.82rem;
      height: 2.29rem;
      background: url(../img/ruleGift/gift_bg.png);
      background-size: 100% 100%;
      text-align: center;
      position: relative;
      span {
        width: 0.92rem;
        height: 0.37rem;
        background: url(../img/ruleGift/price_bg.png);
        background-size: 100% 100%;
        font-size: 0.26rem;
        color: #FFE741;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        i {
          width: 0.19rem;
          height: 0.19rem;
          background: url(../img/ruleGift/price.png);
          background-size: 100% 100%;
          margin-left: 0.06rem;
        }
      }
      img {
        width: 1.76rem;
        height: 1.34rem;
      }
      .name {
        font-size: 0.26rem;
        margin: 0.12rem auto;
      }
      .addScoreStr {
        font-size: 0.26rem;
        color: #E586BD;
      }
    }
  }
  .giftTipsItem {
    background: rgba(97, 10, 100, 0.54);
    border-radius: 0.1rem;
    padding: 0.12rem;
    margin-bottom: 0.11rem;
  }
}
</style>