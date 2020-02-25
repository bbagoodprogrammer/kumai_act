<template>
  <div class="box">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <span class="ruleTips" :class="{top:isShare}" @click="goRule()">Thể lệ&Thưởng</span>
    </div>
    <div class="wardsImg"></div>
    <TabsScrollLoadList></TabsScrollLoadList>
    <loading></loading>
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
  </div>
</template>

<script>

import getString from "../utils/getString"
import APP from "../utils/openApp"
import api from "../api/apiConfig"
import Loading from "../components/Loading"
import MsgToast from "../components/commonToast"
import { globalBus } from '../utils/eventBus'
import TabsScrollLoadList from "../components/TabsScrollLoadList"
export default {
  components: { Loading, MsgToast, TabsScrollLoadList },
  data() {
    return {
      isShare: false, //是否分享
      isMore: true,   //加载更多
      activite: 1,    //活动状态
      showT: false,  //提示弹窗显示
      tastMsg: "提示信息",  //基础弹窗提示信息
      userState: 0,   //用户状态（是否报名）
    }
  },
  created() {
    this.judgeShare()  //判断是否为分享环境,请求相应的接口 
    this.getDefaultData()
  },
  mounted() {
  },
  methods: {
    judgeShare() {//判断是否为分享环境,请求相应的接口 
      this.isShare = getString('token') ? false : true
      this.$store.commit('changShareState', this.isShare) //分享状态
    },
    getDefaultData(val) { //初始化
      api.getDefault(1).then(res => {
        const { response_status, response_data } = res.data
        if (response_status.code == 20000) {
          this.activite = 0
          this.$store.commit('changActStatus', 0)
        } else if (response_status.code == 0) {
          const { step, time, owner, rank } = response_data
          this.activite = step
          this.$store.commit('changActStatus', step)
          this.$store.commit('setTime', time)
          this.$store.commit('setOwner', owner ? owner : {})
          this.$store.commit('setIsOne', false)
          this.$store.commit('updateRankGroups', {
            key: 0,
            loadCount: 0,
            loadEnd: rank.length < 20,
            loading: false,
            none: rank.length == 0,
            list: rank,
          });
        }
      })
    },
    onScroll() {
      if (this.isMore) {
        const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100
        if (scrollToBottom) { //加載更多
        }
      }
    },
    downApp() {
      APP()
    },
    goRule() {
      let regstr = getString('token')
      location.href = `./index2.html?token=${regstr}`
    },
    closeToast() {
      this.showT = false
    }
  }
}
</script>
<style lang='scss' scoped>
body::-webkit-scrollbar {
  width: 0;
}
.box {
  max-width: 750px;
  overflow-x: hidden;
  position: relative;
  margin: auto;
  background: #ae172e url(../assets/img/banner.png) center 0 no-repeat;
  background-size: 100% auto;
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
      background: url(../assets/img/share_bar.png) no-repeat;
      background-size: 100% 100%;
    }
  }
  .header {
    height: 5.83rem;
    position: relative;
    .ruleTips {
      width: 1.83rem;
      height: 0.64rem;
      background: url(../assets/img/ruleTips.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      top: 0.17rem;
      font-size: 0.24rem;
      color: #b43808;
      white-space: nowrap;
      text-align: center;
      line-height: 0.57rem;
      &.top {
        top: 1.5rem;
      }
    }
  }
  .wardsImg {
    width: 6.73rem;
    height: 5.46rem;
    background: url(../assets/img/wards.png);
    background-size: 100% 100%;
    margin: 0 auto;
  }
}
.refresh {
  display: block;
  width: 0.94rem;
  height: 1rem;
  position: fixed;
  left: 0.08rem;
  bottom: 1.35rem;
  background: url(../assets/img/refresh.png) no-repeat;
  background-size: contain;
  transition: transform 1s;
  z-index: 1000;
}
</style>


