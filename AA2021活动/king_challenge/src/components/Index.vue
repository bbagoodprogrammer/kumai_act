<template>
  <div class="page pageIndex">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <div class="ruleTips" @click="goRule()">{{lang.rule}}</div>
    </div>
    <div class="giftList">
      <!-- <h3>{{lang.gift_title}}</h3> -->
      <div class="giftItem" v-for="(item,index) in giftList" :key="index">
        <div class="imgBg">
          <img :src="item.img" alt="">
        </div>
        <strong>{{item.name}}</strong>
      </div>
    </div>
    <TabsScrollLoadList />
    <Footer />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getUrlString } from '../utils'
import APP from "../utils/openApp"
import TabsScrollLoadList from "./TabsScrollLoadList"
import Footer from "./Footer"



export default {
  components: { TabsScrollLoadList, Footer },
  data() {
    return {
      isShare: false,
      // giftList: [
      //   {
      //     img: require("../img/giftList/gift1.png"),
      //     name: 'Huy Chương Thần Tượng Phòng Kara'
      //   },
      //   {
      //     img: require("../img/giftList/gift2.png"),
      //     name: 'Chủ Đề Phòng Sôi Nổi'
      //   },
      //   {
      //     img: require("../img/giftList/gift3.png"),
      //     name: 'Xe Grand Debut'
      //   },
      //   {
      //     img: require("../img/giftList/gift4.png"),
      //     name: 'Quà hiếm có'
      //   },
      //   {
      //     img: require("../img/giftList/gift5.png"),
      //     name: 'Vô số xu'
      //   },
      //   {
      //     img: require("../img/giftList/gift6.png"),
      //     name: 'Vô số đậu'
      //   }
      // ]
    }
  },
  created() {
    this.judgeShare()
  },
  computed: {
    giftList() {
      return this.lang.giftList
    }
  },
  methods: {
    judgeShare() {//判断是否为分享环境,请求相应的接口 
      this.isShare = getUrlString('token') ? false : true
      this.vxc('setShareState', this.isShare) //分享状态
    },
    downApp() {
      APP()
    },
    goRule() {
      this.$router.push('Rule')
    }
  },
}
</script>

<style lang="scss">
.pageIndex {
  .header {
    height: 10.72rem;
    .ruleTips {
      width: 2.13rem;
      height: 0.64rem;
      background: url(../img/ruleTips.png);
      background-size: 100% 100%;
      position: absolute;
      top: 5.41rem;
      right: 0;
      font-size: 0.26rem;
      color: rgba(60, 34, 169, 1);
      text-align: center;
      line-height: 0.64rem;
    }
  }
  .giftList {
    width: 6.09rem;
    height: 5.03rem;
    padding: 1.01rem 0.37rem 0;
    margin: 0 auto;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    h3 {
      font-size: 0.36rem;
      color: rgba(87, 61, 197, 1);
      text-align: center;
      width: 5.7rem;
      height: 0.8rem;
      font-weight: bold;
      line-height: 0.8rem;
      position: absolute;
      top: 0;
    }
    .giftItem {
      width: 1.4rem;
      height: 1.4rem;
      margin-bottom: 0.1rem;
      .imgBg {
        width: 100%;
        height: 100%;
        background: #ffe6cb;
        border-radius: 0.12rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      strong {
        display: block;
        // width: 1.7rem;
        height: 0.9rem;
        margin-top: 0.1rem;
        font-size: 0.22rem;
        color: rgba(131, 9, 67, 1);
        text-align: center;
        // line-height: 0.25rem;
      }
    }
  }
}
</style>