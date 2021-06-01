<template>
  <div class="page pageIndex">
    <div class="app_top" :style="{background:'#10093C',height:navigatorHeight}"></div>
    <div class="tab" :style="{top:navigatorHeight}">
      <span class="tab1" :class="{act:type == 1}" @click="tabClick(1)">{{lang.index_tab1}}</span>
      <span class="tab2" :class="{act:type == 2}" @click="tabClick(2)">{{lang.index_tab2}}</span>
      <!-- <i class="question" @click="goTips()"></i> -->
    </div>
    <div class="pangCon" :style="{paddingTop:navigatorHeight2}">
      <component :is="type == 1?'RankGroups':'ccj_makeFriend'"></component>
      <!-- <rank-groups /> -->
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import store from "../store";
import { getLangHtml, getTimeObj, getUrlString, getAppVer, getPlatform } from "../utils";
import { setFullScreen, setStatusBarStyle, getStatusBarHeight, callAppNew } from '../utils/navigation';
import RankGroups from '../components/RankGroups';
import ccj_makeFriend from "./ccj_makeFriend"

const uid = getUrlString("uid");
const token = getUrlString("token");

export default {
  data () {
    return {
      type: 1,
      navigatorHeight: 0,
      navigatorHeight2: 0,
      is_fix: false,
    };
  },
  computed: {
    ...mapState(["loading"])
  },
  created () {

  },
  mounted () {
    // window.addEventListener('scroll', () => {
    //   let htmlFont= parseInt(document.documentElement.style.fontSize);
    //     let top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
    //     if (top >= htmlFont*1.2) {
    //       this.is_fix = true;
    //     } else {
    //       this.is_fix = false;
    //     }
    // })
    setTimeout(() => {
      const pt = getPlatform();
      const ver = getAppVer();
      if ((pt == 'ios' && ver >= 165) || pt == 'android') {
        setFullScreen();
        //   this.navigatorHeight = getStatusBarHeight() + 'px';
        //   this.navigatorHeight2 = getStatusBarHeight() * 1 + 20 + 'px';
        this.navigatorHeight = getStatusBarHeight() - document.getElementsByClassName('tab')[0].clientHeight + 'px'; // 88為APPtitle高度
        this.navigatorHeight2 = getStatusBarHeight() * 1 + 20 + 'px';
      }
    }, 0)
  },
  methods: {
    tabClick (val) {
      this.type = val
    }
  },
  components: {
    RankGroups,
    ccj_makeFriend
  }
};
</script>

<style lang="scss" scoped>
.pageIndex {
  overflow-x: hidden;
  position: relative;
  .app_top {
    width: 100%;
    position: fixed;
    z-index: 5;
    &.app_top_fit {
      position: fixed;
      background-color: #10093C;
    }
  }
  .tab {
    width: 100%;
    height: 0.88rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 5;
    background: #10093C;
    span {
      font-size: 0.34rem;
      position: relative;
      color: rgba(255, 255, 255, 0.6);
      &.act {
        font-weight: bold;
        color: #fff;
      }
      &.act::after {
        content: '';
        display: block;
        width: 0.28rem;
        height: 0.08rem;
        background: #FFFFFF;
        border-radius: 0.06rem;
        position: absolute;
        left: 40%;
        bottom: -0.17rem;
      }
    }
    .tab2 {
      margin-left: 0.6rem;
    }
  }
}
</style>