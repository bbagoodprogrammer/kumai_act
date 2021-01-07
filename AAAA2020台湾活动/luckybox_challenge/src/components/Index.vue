<template>
  <div class="page pageIndex">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <div class="tipsBox">
        <router-link to="agreement" class="ruleTips"></router-link>
        <span class="ruleTips2" @click="showHistory()"></span>

      </div>
    </div>
    <RoolMsg :roolmsg="roolmsgArr" />
    <boxGIft />
    <TabsScrollLoadList />
    <ActFooter />
    <div class="mask" v-show="showHistoryList">
      <transition name="slide">
        <History v-show="showHistoryList" :hList="hList" @addhList="addhList" />
      </transition>
    </div>

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { init, getList } from '../apis';
import { getUrlString } from '../utils'
import RoolMsg from "./RoolMsg"
import boxGIft from "./boxGIft"
import TabsScrollLoadList from "./TabsScrollLoadList"
import ActFooter from "./ActFooter"
import History from "./History"
export default {
  components: { RoolMsg, boxGIft, TabsScrollLoadList, ActFooter, History },
  data() {
    return {
      roolmsgArr: [],
      isShare: false,
      showHistoryList: false,
      hList: []
    }
  },
  created() {
    this.judgeShare()
    this.initData()
  },
  methods: {
    judgeShare() {//判断是否为分享环境,请求相应的接口 
      this.isShare = getUrlString('token') ? false : true
      this.$store.commit('setShareState', this.isShare) //分享状态
    },
    initData() {
      init().then(res => {
        const { step, gift, list, rank, user_info, top } = res.data.response_data
        this.$store.commit('setStep', step)
        this.$store.commit('setGift', gift)
        this.$store.commit('setRegistered', user_info.registered)
        this.roolmsgArr = top
      })
    },
    showHistory() {
      getList(0).then(res => {
        this.hList = res.data.response_data.list
        this.showHistoryList = true
      })
    },
    addhList(newList) {
      this.hList = this.hList.concat(newList)
    }
  },
}
</script>

<style lang="scss">
.pageIndex {
  .shareBar {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
    .bar {
      width: 7.5rem;
      height: 1.2rem;
      margin: auto;
    }
  }
  .header {
    height: 9.7rem;
    .tipsBox {
      position: absolute;
      right: 0;
      top: 2.93rem;
      span,
      a {
        display: block;
      }
    }
  }
}
</style>