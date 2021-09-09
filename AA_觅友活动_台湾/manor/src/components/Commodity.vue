<template>
  <div class="commodity">
    <div class="mainTabs">
      <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" class="tabL">工具&種子</a>
      <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" class="tabR">兌換</a>
    </div>
    <ul class="shopList">
      <li v-for="(item,index) in shopList" :key="index">
        <div class="imgBox">
          <img :src="require(`../img/goods/${item.id}.png`)" alt="" v-if="item.type=='seed'" class="seed">
          <img :src="require(`../img/props/${item.id}.png`)" alt="" v-else class="props">

          <div class="name">{{item.name}}</div>
          <div class="price"><i></i><strong>{{item.sun}}</strong></div>
        </div>
        <div class="getBtn">購買</div>
      </li>
    </ul>
  </div>
</template>

<script>

import { shop } from "../apis"
export default {
  data () {
    return {
      mainTab: 0,
      shopList: []
    }
  },
  created () {
    shop().then(res => {
      this.shopList = res.data.response_data.goods_list
    })
  },
  methods: {
    mainTabClick (val) {
      this.mainTab = val
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
    margin-top: 0.61rem;
    padding: 0 0.14rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
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
          background: url(../img/sum.png);
          background-size: 100% 100%;
          margin-right: 0.09rem;
        }
      }
      .getBtn {
        width: 2.32rem;
        height: 2.3rem;
        background: url(../img/buyBtn.png);
        background-size: 100% 100%;
      }
    }
  }
}
</style>