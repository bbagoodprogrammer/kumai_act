<template>
  <div class="box">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <div class="tipsBox" :class="{top:isShare}">
        <span class="ruleTips" @click="goRule()">{{lang.rule}}</span>
        <span class="history" @click="goHistory()">{{lang.history}}</span>
      </div>
      <rool-msg :roolmsg="roolmsg"></rool-msg>
    </div>
    <cards v-show="type == 1" />
    <exclude-cards v-show="type == 2" />
    <function-card />
    <task v-if="initData.registered" />
    <act-footer></act-footer>
    <loading></loading>
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
    <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}"></div>
  </div>
</template>

<script>

import getString from "../utils/getString"
import APP from "../utils/openApp"
import api from "../api/apiConfig"
import Loading from "../components/Loading"
import ActFooter from "../components/ActFooter"
import MsgToast from "../components/commonToast"
import { globalBus } from '../utils/eventBus'
import cards from "../components/Cards"
import RoolMsg from "../components/RoolMsg"
import FunctionCard from "../components/FunctionCard"
import ExcludeCards from "../components/ExcludeCards"
import { mapState } from "vuex"
import Task from "../components/Task"
export default {
  components: { Loading, MsgToast, ActFooter, cards, RoolMsg, FunctionCard, ExcludeCards, Task },
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
      roolmsg: []
    }
  },
  computed: {
    ...mapState(['type', 'initData'])
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
      this.vxc('setShareState', this.isShare) //分享状态
    },
    getDefaultData(val) { //初始化
      api.getDefault().then(res => {
        const { response_status, response_data } = res.data
        if (response_status.code == 0) {
          this.vxc('setActStatus', response_data.step)
          this.vxc('setInitData', response_data)
        } else {
          this.toast(response_status.error)
        }
      })
      api.getRotaMsg(1).then(res => {
        this.roolmsg = res.data.response_data.list
      })
    },
    downApp() {
      APP()
    },
    goRule() {
      let regstr = getString('token')
      location.href = `./index2.html?token=${regstr}&v=1`
    },
    goHistory() {
      let regstr = getString('token')
      location.href = `./index3.html?token=${regstr}&v=1`
    },
    refrsh(val) { //刷新
      if (!val) {
        this.rotatePx = 540 * ++this.rotatec  //旋转动画
      }
      window.removeEventListener("scroll", this.onScroll)
      this.getDefaultData('ref')
    },
    closeToast() {
      this.showT = false
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
  background: url(../assets/img/banner.png) center 0 no-repeat;
  background-size: 100% auto;
  padding-bottom: 1.5rem;
  direction: rtl;
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
    height: 4.71rem;
    position: relative;
    .tipsBox {
      position: absolute;
      right: 0;
      top: 0.17rem;
      font-size: 0.21rem;
      color: #955339;
      font-weight: 700;
      text-align: center;
      line-height: 0.55rem;
      white-space: nowrap;
      &.top {
        top: 1.5rem;
      }
      .ruleTips {
        display: block;
        width: 1.36rem;
        height: 0.55rem;
        background: url(../assets/img/ruleTips.png);
        background-size: 100% 100%;
      }
      .history {
        display: block;
        width: 1.36rem;
        height: 0.55rem;
        background: url(../assets/img/ruleTips.png);
        background-size: 100% 100%;
        margin-top: 0.12rem;
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
  z-index: 100;
}
#circlebox {
  // width: 2rem;
  // height: 2rem;
  // background-color: red;
  // position: fixed;
}
</style>


