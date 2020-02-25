<template>
  <div class="box">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <div class="tipsBox" :class="{top:isShare}">
        <span class="ruleTips" @click="goRule()">{{lang.rules}}</span>
        <span class="mian" @click="goMain()">{{lang.mainVuev}}</span>
        <span class="getTicket" @click="getTicket()">{{lang.getTicket}}</span>
      </div>
    </div>
    <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}"></div>
    <gift-box></gift-box>
    <rank ref="rank"></rank>
    <act-footer></act-footer>
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
    <loading></loading>
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
import GiftBox from "../components/GiftBox"
import Rank from "../components/rank"
import { mapState } from "vuex"
export default {
  components: { Loading, MsgToast, ActFooter, GiftBox, Rank },
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
  computed: {
    ...mapState(['showCom'])
  },
  methods: {
    judgeShare() {//判断是否为分享环境,请求相应的接口 
      let regstr = getString('token')
      if (regstr) {
        this.isShare = false
      } else {
        this.isShare = true
      }
      this.$store.commit('changShareState', this.isShare) //分享状态
    },
    getDefaultData(val) { //初始化
      api.getDefault().then(res => {
        const { response_status, response_data } = res.data
        if (response_status.code == 20000) {
          this.activite = 0
          this.$store.commit('changActStatus', this.activite)
        } else if (response_status.code == 0) {
          const { activity_status, rank, owner_msg, box, second } = response_data
          this.activite = activity_status
          this.$store.commit('changActStatus', this.activite)
          this.$store.commit('changBox', box)
          this.$store.commit('changRegistered', owner_msg.is_reg)
          this.$store.commit('changSecond', second)
          this.$store.commit('updateRankGroups', {
            key: 'rank1',
            rank: rank,
            loaded: rank.length < 5
          })
          this.$store.commit('updateMsgGroups', {
            key: 'rank1',
            userMsg: owner_msg,
          })
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
    goMain() {
      let regstr = getString('token')
      let uid = getString("uid")
      location.href = `http://activity.17sing.tw/static_html/2019/mainVenue/index.html?uid=${uid}&token=${regstr}`
    },
    getTicket() {
      let regstr = getString('token')
      let uid = getString("uid")
      location.href = `http://activity.17sing.tw/static_html/2019/numberOnePlayer/index.html?uid=${uid}&token=${regstr}&t=2`
    },
    refrsh() { //刷新
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      window.removeEventListener("scroll", this.onScroll)
      this.getDefaultData('ref')
      if (this.showCom == 'rank2') {
        this.$refs.rank.getRank2()
      }
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
    height: 4.73rem;
    position: relative;
    .tipsBox {
      position: absolute;
      right: 0;
      top: 0.17rem;
      font-size: 80%;
      color: #ffeda7;
      text-align: right;
      &.top {
        top: 1.5rem;
      }
    }
    .mian {
      margin-top: 0.31rem;
    }
    .getTicket {
      margin-top: 0.31rem;
    }
    span {
      width: 1.66rem;
      height: 0.36rem;
      padding-right: 0.15rem;
      background: url(../assets/img/tipsBg.png);
      background-size: 100% 100%;
      display: block;
      white-space: nowrap;
    }
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
.moveR-enter-active,
.moveR-leave-active {
  transition: all 0.1s linear;
  transform: translateY(0);
}
.moveR-enter,
.moveR-leave {
  transform: translateY(100%);
}
.moveR-leave-to {
  transform: translateY(100%);
}
</style>


