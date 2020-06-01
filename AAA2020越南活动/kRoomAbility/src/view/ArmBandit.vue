<template>
  <div class="box">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <!-- <div class="title"></div> -->
    <!-- <CarWay ref="carWay" /> -->
    <div class="header">
      <span class="ruleTips" :class="{top:isShare}" @click="goRule()"></span>
      <div class="goHtml" @click="goRules()">Thưởng&Thể lệ</div>
    </div>
    <TabsScrollLoadList ref="scorll" @getDefaultData="getDefaultData"></TabsScrollLoadList>
    <act-footer></act-footer>
    <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}"></div>
  </div>
</template>

<script>

import getString from "../utils/getString"
import APP from "../utils/openApp"
import api from "../api/apiConfig"
import ActFooter from "../components/ActFooter"
import MsgToast from "../components/commonToast"
import { globalBus } from '../utils/eventBus'
import CarWay from "../components/CarWay"
import getDateArr from "../utils/getDateArr"
import TabsScrollLoadList from "../components/TabsScrollLoadList"
export default {
  components: { MsgToast, ActFooter, CarWay, TabsScrollLoadList },
  data() {
    return {
      isShare: false, //是否分享
      isMore: true,   //加载更多
      activite: 1,    //活动状态
      showT: false,  //提示弹窗显示
      tastMsg: "提示信息",  //基础弹窗提示信息
      userState: 0,   //用户状态（是否报名）
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
    }
  },
  created() {
    this.judgeShare()  //判断是否为分享环境,请求相应的接口 
    this.getDefaultData()
  },
  methods: {
    judgeShare() {//判断是否为分享环境,请求相应的接口 
      this.isShare = getString('token') ? false : true
      this.vxc('setShareState', this.isShare) //分享状态
    },
    getDefaultData(val) { //初始化
      api.getDefault().then(res => {
        const { response_status, response_data } = res.data
        if (response_status.code == 0) {
          const { activity_status, dates, second, rank, owner_msg } = response_data
          this.$store.commit("setActStatus", activity_status)
          this.$store.commit("setSingUp", owner_msg.is_reg)
          this.$store.commit("setUserScore", owner_msg.score || 0) //當前用戶分數owner_msg.score
          this.$store.commit("setAv", owner_msg.avatar)
          this.$store.commit("setNowDay", dates.days)  //當前天
          this.getDateArr(dates.stime, dates.etime)  //生成日榜数组
          this.$store.commit("setInited", 1)  //是否初始化頁面
          this.$store.commit("changTab", dates.days)
          this.$store.commit('updateRankGroups', { //当前日榜信息
            key: dates.days,
            loadCount: 0,
            loadEnd: rank.length < 20,
            loading: false,
            none: rank.length == 0,
            list: rank,
            second: second
          })
          this.$store.commit("changGroupsUserMsg", {//初始当前日榜个人信息
            key: dates.days,
            msg: owner_msg
          })
        } else {
          this.toast(response_status.error)
        }
      })
    },
    getDateArr(stime, etime) {
      let dateArr = getDateArr(stime, etime)
      this.$store.commit('setDateArr', dateArr)
      this.$store.commit("setTotalDay", dateArr.length) //当前期活动总天数
    },
    downApp() {
      APP()
    },
    goRules() {
      let regstr = getString('token')
      location.href = `./index2.html?token=${regstr}`
    },
    refrsh() { //刷新
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      window.removeEventListener("scroll", this.onScroll)
      this.getDefaultData('ref')
    }
  }
}
</script>
<style lang='scss'>
body::-webkit-scrollbar {
  width: 0;
}
.box {
  max-width: 750px;
  overflow-x: hidden;
  position: relative;
  margin: auto;
  // background:url(../assets/img/主视觉.png) center 0 no-repeat;
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
  .goHtml {
    width: 1.92rem;
    height: 0.58rem;
    background: url(../assets/img/tuleTips.png);
    background-size: 100% 100%;
    text-align: center;
    line-height: 0.58rem;
    font-size: 0.24rem;
    color: #ffd48f;
    position: absolute;
    top: 0.22rem;
    right: 0;
    z-index: 100;
  }
  .title {
    width: 5.89rem;
    height: 2.75rem;
    background: url(../assets/img/actTitle.png);
    background-size: 100% 100%;
    position: absolute;
    top: 0.26rem;
    left: 0.81rem;
    z-index: 10;
  }

  .header {
    height: 4.42rem;
    position: relative;
    .ruleTips {
      width: 1.7rem;
      height: 0.56rem;
      // background: url(../assets/img/ruleTips.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      top: 0.17rem;
      &.top {
        top: 1.5rem;
      }
    }
  }
  .guaBox {
    position: relative;
  }
}
.refresh {
  display: block;
  width: 0.94rem;
  height: 1rem;
  position: fixed;
  right: 0.08rem;
  bottom: 1.35rem;
  background: url(../assets/img/refresh.png) no-repeat;
  background-size: contain;
  transition: transform 1s;
  z-index: 1000;
}
</style>


