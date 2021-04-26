<template>
  <div class="page pageIndex">
    <div class="app_top" :style="{background:'#7A68F8',height:navigatorHeight}"></div>
    <div class="top_bg"></div>
    <!-- <div class="tab" :style="{top:navigatorHeight}"></div> -->
    <div class="propsList" :style="{paddingTop:navigatorHeight2}">
      <div class="noData" v-if="!list.length">
        <img src="../img/noData.png" alt="">
        <p>{{lang.no_props}}</p>
      </div>
      <ul :class="{noLength:!list.length}">
        <li v-for="(item,index) in list" :key="index" @click="giftClick(item)">
          <div class="imgBox">
            <i class="propsDay" v-if="item.expire ">{{item.expire}}{{lang.day_expire}}</i>
            <i class="propsDay" v-else>{{lang.expire_end}}</i>
            <img :src="item.image" alt="">
          </div>
          <strong>{{item.name}}x{{item.num}}</strong>
        </li>
      </ul>
    </div>
    <div class="mask" v-show="showGiftPup">
      <transition name="slide">
        <div class="act_gift" v-show="showGiftPup">
          <div class="imgBox">
            <img :src="showGift.image" alt="">
          </div>
          <strong>{{showGift.name}}</strong>
          <p class="tips">{{lang.props_tips}}{{showGift.caption}}</p>
          <div class="ok" @click="showGiftPup = false">{{lang.ok}}</div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>

import { getLangHtml, getTimeObj, getUrlString, getAppVer, getPlatform } from "../utils";
import { setFullScreen, setStatusBarStyle, getStatusBarHeight, callAppNew } from '../utils/navigation';
import { mapState } from "vuex"
import { getInitInfo } from "../apis"
export default {
  data () {
    return {
      navigatorHeight: 0,
      showGift: {},
      showGiftPup: false,
      loaded: false,
      pageNums: 1,
      more: true
    }
  },
  computed: {
    ...mapState(['list'])
  },
  //   created () {

  //   },
  mounted () {
    setTimeout(() => {
      this.onScroll(); // 如果默认展示的Tabs依赖服务器配置，把此方法移到watch中去调用（watch更新Tabs值后调onScroll）
      // 如果初始化接口返回当前榜单数据，可以在Store的Action拿到服务器数据时先调用commit('updateRankGroups', {key:key, list:[]})，再更新state.tab触发组件watch
      window.addEventListener('scroll', this.onScroll);
      const pt = getPlatform();
      const ver = getAppVer();
      if ((pt == 'ios' && ver >= 165) || pt == 'android') {
        setFullScreen(true);
        //  - document.getElementsByClassName('tab')[0].clientHeight
        this.navigatorHeight = getStatusBarHeight() + 'px';
        this.navigatorHeight2 = getStatusBarHeight() * 1 + 14 + 'px';
      }
    }, 200)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    giftClick (val) {
      console.log(val)
      this.showGift = val
      this.showGiftPup = true
    },
    onScroll () {
      const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 20;
      const notFull = document.body.scrollHeight < window.innerHeigh;
      if ((scrollToBottom && !this.loaded && this.more) || notFull) {
        this.more = false
        getInitInfo(this.pageNums, 'more').then(res => {
          this.more = true
          let list = res.data.response_data.list
          console.log(list.length)
          if (list.length) {
            console.log(list.length)
            this.pageNums += 1
            this.$store.commit('addList', list)
          } else {
            this.loaded = true
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
.pageIndex {
  .app_top {
    width: 100%;
    position: fixed;
    z-index: 5;
    &.app_top_fit {
      position: fixed;
      background-color: #10093C;
    }
  }
  img {
    display: block;
    width: 100%;
  }
  .tab {
    width: 100%;
    height: 0.88rem;
  }
  .propsList {
    width: 6.9rem;
    min-height: 3rem;
    position: relative;
    z-index: 2;
    overflow: hidden;
    padding: 0.12rem 0.3rem 0;
    .noData {
      width: 6.9rem;
      height: 3.51rem;
      background: #FFFFFF;
      border-radius: 0.3rem;
      padding-top: 0.3rem;
      img {
        width: 2.8rem;
        height: 2.1rem;
        margin: 0 auto;
      }
      p {
        text-align: center;
        margin-top: 0.36rem;
        color: rgba(44, 43, 54, 1);
        font-size: 0.32rem;
        font-weight: 600;
      }
    }
    ul {
      background: #fff;
      border-radius: 0.3rem;
      padding: 0.4rem 0.24rem 0.1rem;
      display: flex;
      flex-wrap: wrap;
      &.noLength {
        padding: 0;
      }
      li {
        width: 2.14rem;
        height: 2.31rem;
        padding-top: 0.04rem;
        margin-bottom: 0.1rem;
        .imgBox {
          width: 1.52rem;
          height: 1.52rem;
          margin: 0 auto;
          position: relative;
          .propsDay {
            display: block;
            padding: 0 0.15rem;
            height: 0.34rem;
            background: rgba(255, 81, 85, 0.8);
            border-radius: 0 0.1rem 0 0.1rem;
            font-size: 0.2rem;
            color: #fff;
            line-height: 0.34rem;
            text-align: center;
            position: absolute;
            top: -0.04rem;
            left: -0.04rem;
          }
        }
        strong {
          display: block;
          height: 0.37rem;
          font-size: 0.26rem;
          font-weight: 400;
          line-height: 0.37rem;
          color: #2C2B36;
          text-align: center;
          margin-top: 0.1rem;
        }
      }
    }
  }

  .act_gift {
    width: 6.18rem;
    min-height: 5.89rem;
    background: #FFFFFF;
    border-radius: 0.3rem;
    padding: 0.56rem 0 0.2rem;
    .imgBox {
      width: 2.28rem;
      height: 2.28rem;
      margin: 0 auto;
      img {
        width: 2.28rem;
        height: 2.28rem;
      }
    }
    strong {
      display: block;
      min-height: 0.45rem;
      line-height: 0.45rem;
      text-align: center;
      margin-top: 0.36rem;
      padding: 0 0.3rem;
      font-weight: 600;
      color: rgba(44, 43, 54, 1);
    }
    .tips {
      text-align: center;
      font-size: 0.28rem;
      color: rgba(44, 43, 54, 1);
      margin-top: 0.08rem;
      padding: 0 0.62rem;
    }
    .ok {
      width: 3.3rem;
      height: 0.88rem;
      background: linear-gradient(90deg, #7A68F8 0%, #9585FF 100%);
      border-radius: 0.44rem;
      text-align: center;
      line-height: 0.88rem;
      font-size: 0.32rem;
      color: #fff;
      margin: 0.52rem auto 0;
    }
  }
}
.top_bg {
  width: 100%;
  overflow: hidden;
  height: 4.4rem;
  position: absolute;
  top: 0;
  z-index: -1;
}
.top_bg::after {
  content: '';
  width: 120%;
  height: 4.4rem;
  position: absolute;
  left: -10%;
  top: 0;
  z-index: -1;
  border-radius: 0 0 60% 60%;
  background: #7A68F8;
}
</style>