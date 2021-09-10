<template>
  <div class="commodity">
    <div class="mainTabs">
      <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" class="tabL">工具&種子</a>
      <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" class="tabR">兌換</a>
    </div>
    <ul class="shopList">
      <li v-for="(item,index) in mainTab == 0?shopList:prizes" :key="index">
        <div class="imgBox">
          <img :src="item.image" alt="" v-if="item.image" class="seed">
          <img :src="require(`../img/goods/${item.id}.png`)" alt="" v-else-if="item.type=='seed'" class="seed">
          <img :src="require(`../img/props/${item.id}.png`)" alt="" v-else class="props">
          <div class="name">{{item.name}}</div>
          <div class="price"><i :class="{sun:mainTab == 1}"></i><strong>{{mainTab == 0?item.coins:item.sun}}/份</strong></div>
        </div>
        <div class="getBtn" @click="shopBuy(item)">{{mainTab == 0?'購買':'兌換'}}</div>
      </li>
    </ul>
    <!-- 购买 -->
    <div class="mask" v-show="showBuyPup">
      <transition name="slide">
        <div class="buyNums" v-if="showBuyPup">
          <div class="title">購買</div>
          <div class="userHas">
            <i></i>
            <em>{{owner.coins}}</em>
          </div>
          <div class="landImgBox">
            <img :src="require(`../img/goods/${buyItem.id}.png`)" alt="" v-if="buyItem.type=='seed'" class="seed">
            <img :src="require(`../img/props/${buyItem.id}.png`)" alt="" v-else class="props">
            <div class="name">{{buyItem.name}}</div>
            <div class="price"><i></i><strong>{{buyItem.coins}}/份</strong></div>
          </div>
          <p>這裡是一條奇怪的介紹語啊，這裡是一條奇怪的介紹語啊</p>
          <div class="shovelNums">
            <span class="redux" @click="nums>0?nums--:0"></span>
            <input type="text" disabled v-model="nums" class="getNums">
            <span class="add" @click="nums<maxGetNums?nums++:maxGetNums"></span>
            <u class="max" @click="nums = maxGetNums">MAX</u>
          </div>
          <p>購買{{nums}}份【{{buyItem.name}}】，共 {{nums * buyItem.coins}} 金幣</p>
          <div class="btnBox">
            <u @click="closeBuy()">我再想想</u>
            <span @click="buy()">確定購買</span>
          </div>
        </div>
      </transition>
    </div>
    <!-- 兌換 -->
    <div class="mask" v-show="showExchange">
      <transition name="slide">
        <div class="buyNums" v-if="showExchange">
          <div class="title">兌換</div>
          <div class="userHas">
            <i class="sun"></i>
            <em>{{owner.sun}}</em>
          </div>
          <div class="landImgBox">
            <img :src="buyItem.image" alt="" v-if="buyItem.image" class="seed">
            <img :src="require(`../img/goods/${buyItem.id}.png`)" alt="" v-else-if="buyItem.type=='seed'" class="seed">
            <img :src="require(`../img/props/${buyItem.id}.png`)" alt="" v-else class="props">
            <div class="name">{{buyItem.name}}</div>
            <div class="price"><i :class="{sun:mainTab == 1}"></i><strong>{{mainTab == 0?buyItem.coins:buyItem.sun}}/份</strong></div>
          </div>
          <p>這裡是一條奇怪的介紹語啊，這裡是一條奇怪的介紹語啊</p>
          <div class="shovelNums">
            <span class="redux" @click="nums>0?nums--:0"></span>
            <input type="text" disabled v-model="nums" class="getNums">
            <span class="add" @click="nums<maxGetNums2?nums++:maxGetNums2"></span>
            <u class="max" @click="nums = maxGetNums2">MAX</u>
          </div>
          <p>兌換{{nums}}份【{{buyItem.name}}】，共 {{nums * buyItem.sun}} 陽光</p>
          <div class="btnBox">
            <u @click="closeBuy()">我再想想</u>
            <span @click="exchange()">確定兌換</span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>

import { shop, buy, exchange } from "../apis"
import { mapState } from "vuex"

export default {
  data () {
    return {
      nums: 1,
      mainTab: 0,
      shopList: [],
      prizes: [],
      buyItem: {},
      showBuyPup: false,
      showExchange: false
    }
  },
  computed: {
    ...mapState(['owner']),
    maxGetNums () {
      return parseInt(this.owner.coins / this.buyItem.coins)
    },
    maxGetNums2 () {
      return parseInt(this.owner.sun / this.buyItem.sun)
    }
  },
  created () {
    shop().then(res => {
      this.shopList = res.data.response_data.goods_list
      this.prizes = res.data.response_data.prizes

    })
  },
  methods: {
    mainTabClick (val) {
      this.mainTab = val
    },
    shopBuy (item) {
      this.buyItem = item
      if (this.mainTab == 0) {
        this.showBuyPup = true
      } else {
        this.showExchange = true
      }

    },
    buy () {
      buy(this.buyItem.id, this.nums).then(res => {
        if (res.data.response_status.code == 0) {
          this.toast(`購買成功！`)
          this.showBuyPup = false
          this.nums = 1
          this.$store.dispatch('getInitInfo');
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    exchange () {
      exchange(this.buyItem.id, this.nums).then(res => {
        if (res.data.response_status.code == 0) {
          this.toast(`兌換成功！`)
          this.showExchange = false
          this.nums = 1
          this.$store.dispatch('getInitInfo');
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    closeBuy () {
      this.showBuyPup = false
      this.showExchange = false
      this.nums = 1
    }
  }
}
</script>

<style lang="scss">
.commodity {
  margin: 0.15rem auto 0;
  .mainTabs {
    display: flex;
    width: 5.55rem;
    height: 0.82rem;
    line-height: 0.82rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    background: url(../img/rankTab.png);
    background-size: 100% 100%;
    a {
      flex: 1;
      height: 100%;
      text-align: center;
      color: #8E4908;
      &.current {
        color: #672A0B;
        background: url(../img/rankTabAct.png);
        background-size: 100% 100%;
      }
    }
  }
  .shopList {
    height: 8.35rem;
    overflow-y: scroll;
    margin-top: 0.61rem;
    padding: 0 0.14rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      margin-bottom: 0.21rem;
      .imgBox {
        width: 2.32rem;
        height: 2.3rem;
        padding-top: 0.15rem;
        background: url(../img/shopGiftBg.png);
        background-size: 100% 100%;
        > img {
          margin: 0 auto;
        }
        .seed {
          width: 1.09rem;
          height: 1.16rem;
        }
        .props {
          width: 1.26rem;
          height: 1.26rem;
        }
        .name {
          text-align: center;
          color: #8E4908;
          margin: 0.1rem auto;
        }
        .price {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #EC933B;
          font-size: 0.26rem;
          i {
            width: 0.23rem;
            height: 0.23rem;
            background: url(../img/icon.png);
            background-size: 100% 100%;
            margin-right: 0.09rem;
            &.sun {
              background: url(../img/sum.png);
              background-size: 100% 100%;
            }
          }
          strong {
            font-size: 0.26rem;
          }
        }
      }
      .getBtn {
        width: 2.12rem;
        height: 0.51rem;
        text-align: center;
        line-height: 0.51rem;
        background: url(../img/buyBtn.png);
        background-size: 100% 100%;
        margin: 0.12rem auto 0;
      }
    }
  }
  .buyNums {
    width: 6.76rem;
    height: 8.53rem;
    padding-top: 0.3rem;
    background: url(../img/buyBg.png);
    background-size: 100% 100%;
    position: relative;
    > p {
      padding: 0 0.62rem;
      color: #EC933B;
      font-size: 0.24rem;
      text-align: center;
      margin-top: 0.12rem;
    }
    .userHas {
      width: 1.43rem;
      height: 0.37rem;
      background: url(../img/userHas.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0.57rem;
      top: 1.58rem;
      text-align: center;
      line-height: 0.37rem;
      display: flex;
      align-items: center;
      i {
        width: 0.42rem;
        height: 0.42rem;
        background: url(../img/icon.png);
        background-size: 100% 100%;
        margin: -0.04rem 0 0 -0.1rem;
        &.sun {
          background: url(../img/sum.png);
          background-size: 100% 100%;
        }
      }
      em {
        flex: 1;
        font-size: 0.28rem;
      }
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
    .landImgBox {
      width: 2.9rem;
      height: 2.56rem;
      background: url(../img/landImgBg.png);
      background-size: 100% 100%;
      margin: 0.65rem auto 0;
      padding-top: 0.5rem;
      > img {
        margin: 0 auto;
      }
      .seed {
        width: 1.09rem;
        height: 1.16rem;
      }
      .props {
        width: 1.26rem;
        height: 1.26rem;
      }
      .name {
        color: #8E4908;
        text-align: center;
        margin: 0.12rem auto;
      }
      .price {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #EC933B;
        font-size: 0.26rem;
        i {
          width: 0.28rem;
          height: 0.28rem;
          background: url(../img/icon.png);
          background-size: 100% 100%;
          margin-right: 0.09rem;
          &.sun {
            background: url(../img/sum.png);
            background-size: 100% 100%;
          }
        }
        strong {
          font-size: 0.26rem;
        }
      }
    }
    .shovelNums {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      margin-top: 0.25rem;
      .redux,
      .add {
        width: 0.67rem;
        height: 0.67rem;
      }
      .redux {
        background: url(../img/redux.png);
        background-size: 100% 100%;
      }
      .add {
        background: url(../img/add.png);
        background-size: 100% 100%;
      }
      .max {
        font-size: 0.28rem;
        color: #A67247;
        position: absolute;
        right: 0.85rem;
      }
      .getNums {
        width: 1.58rem;
        height: 0.67rem;
        background: #D9BE9F;
        outline: none;
        border: 0.02rem solid #A6845A;
        border-radius: 0.1rem;
        margin: 0 0.2rem;
        text-align: center;
        line-height: 0.67rem;
        color: #672A0B;
      }
    }
    .btnBox {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 0.25rem;
      u {
        color: #672A0B;
      }
      span {
        width: 2.78rem;
        height: 0.84rem;
        background: url(../img/buy.png);
        background-size: 100% 100%;
        text-align: center;
        line-height: 0.84rem;
        color: #672A0B;
        margin-left: 0.73rem;
      }
    }
  }
}
</style>