<template>
  <div class="box">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <div class="actTitle">
        <span class="rotateConis"></span>
        <strong class="actTime">{{actDate}}</strong>
      </div>
      <div class="totalScore">
        <div class="title">{{lang.totalGotScore}}</div>
        <div class="score">{{balance}}</div>
      </div>
      <span class="lpeople"></span>
      <span class="rpeole"></span>
      <div class="goHtmlBox" :class="{top:isShare}">
        <span class="ruleTips" @click="goRule()">{{lang.rules}}</span>
        <span class="scoreTips" @click="goDetail()" v-if="is_anchor">{{lang.scoreTips}}</span>
      </div>
    </div>
    <div class="pig">
      <StarEffects v-for="(item,index) in 2" :key="index" :index="index" />
      <div class="pigImg" :class="{pig1:isOver == 1,pig2:isOver == 2 || showHit,pig3:isOver == 3}" @click="hitPig()"></div>
      <div class="pigL"></div>
      <div class="pigR"></div>
    </div>
    <div class="con">
      <anthorTask :is_anchor="is_anchor" />
      <TabsScrollLoadList ref="scorll"></TabsScrollLoadList>
    </div>
    <act-footer></act-footer>
    <!-- <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}"></div> -->
  </div>
</template>

<script>

import getString from "../utils/getString"
import APP from "../utils/openApp"
import api from "../api/apiConfig"
import ActFooter from "../components/ActFooter"
import MsgToast from "../components/commonToast"
import { globalBus } from '../utils/eventBus'
import { mapState } from "vuex"
import TabsScrollLoadList from "../components/TabsScrollLoadList"
import anthorTask from "../components/anthor_task"
import { setInterval, setTimeout } from 'timers';
import StarEffects from "../components/StarEffects"
import getDate from "../utils/getDate"
export default {
  // anchor_Rank, guard_rank,
  components: { MsgToast, ActFooter, TabsScrollLoadList, anthorTask, StarEffects },
  data() {
    return {
      isShare: false, //是否分享
      isMore: true,   //加载更多
      activite: 1,    //活动状态
      showT: false,  //提示弹窗显示
      tastMsg: "",  //基础弹窗提示信息
      userState: 0,   //用户状态（是否报名）
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
      is_anchor: false,
      actDate: '',
      balance: 0,
      ecountdown: null,  //活动结束倒计时
      scountdown: null, // 活动开始时间
      showHit: false
    }
  },
  created() {
    this.judgeShare()  //判断是否为分享环境,请求相应的接口 
    this.getDefaultData()
  },
  computed: {
    isOver() {
      if (this.ecountdown == 0) {
        return 3
      } else if (this.ecountdown > 0 && this.ecountdown <= 172800) {
        return 2
      } else {
        return 1
      }
    }
  },
  methods: {
    judgeShare() {//判断是否为分享环境,请求相应的接口 
      this.isShare = getString('token') ? false : true
      this.$store.commit('changShareState', this.isShare) //分享状态
    },
    getDefaultData(val) { //初始化
      api.getDefault().then(res => {
        const { response_status, response_data } = res.data
        if (response_status.code == 0) {
          const { step, stime, etime, mission_countdown, user_info, anchor_missions, anchor_rank, guard_rank, balance, ecountdown, scountdown } = response_data
          this.scountdown = scountdown
          this.ecountdown = ecountdown
          this.balance = balance
          this.actDate = this.getDate(stime, etime)
          sessionStorage.setItem('stime', stime)
          sessionStorage.setItem('etime', etime)
          this.vxc('setActStatus', step)
          this.vxc('setUserMsg', user_info)
          const is_anchor = user_info.is_anchor
          this.is_anchor = is_anchor
          if (is_anchor) {
            this.vxc('setmission_countdown', mission_countdown)
            this.vxc('setAnchor_missions', anchor_missions)
            // this.vxc('setAnchor_rank', anchor_rank)
            this.$store.commit('updateRankGroups', { //当前日榜信息
              key: 0,
              loadCount: 0,
              loadEnd: anchor_rank.length < 10,
              loading: false,
              none: anchor_rank.length == 0,
              list: anchor_rank,
            })
          } else {
            // this.vxc('setGuard_rank', guard_rank)
            this.$store.commit('updateRankGroups', { //当前日榜信息
              key: 'total',
              loadCount: 0,
              loadEnd: guard_rank.length < 10,
              loading: false,
              none: guard_rank.length == 0,
              list: guard_rank,
            })
          }
          this.vxc('setIsFirst', false)
        }
      })
    },
    getDate(stime, etime) {
      return getDate(new Date(stime * 1000), 1) + " - " + getDate(new Date(etime * 1000), 1)
    },
    hitPig() {
      if (this.scountdown <= 691200 && !this.showHit) {
        this.showHit = true
        setTimeout(() => {
          this.showHit = false
        }, 500)
      }
    },
    downApp() {
      APP()
    },
    goRule() {
      let regstr = getString('token')
      location.href = `./index2.html?token=${regstr}`
    },
    goDetail() {
      let regstr = getString('token')
      location.href = `./index3.html?token=${regstr}`
    },
    refrsh() { //刷新
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
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
  padding-bottom: 2rem;
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
    height: 3.78rem;
    padding-top: 0.28rem;
    position: relative;
    z-index: 1;
    .actTitle {
      width: 6.03rem;
      height: 2.63rem;
      margin: 0 auto;
      background: url(../assets/img/actTitle.png);
      background-size: 100% 100%;
      position: relative;
      .rotateConis {
        display: block;
        width: 1rem;
        height: 1rem;
        background: url(../assets/img/coins.gif);
        background-size: 100% 100%;
        margin: 0 auto;
      }
      .actTime {
        font-weight: 800;
        font-size: 0.31rem;
        -webkit-text-stroke: 1px #d06721;
        text-stroke: 1px #d06721;
        position: absolute;
        top: 2.22rem;
        left: 2rem;
      }
    }
    .totalScore {
      margin-top: 0.05rem;
      .title {
        text-align: center;
        color: #ac3e1c;
        font-size: 0.267rem;
        font-weight: bold;
      }
      .score {
        width: 3.14rem;
        height: 0.59rem;
        line-height: 0.59rem;
        background: url(../assets/img/totalBg.png);
        background-size: 100% 100%;
        margin: 0.03rem auto 0;
        text-align: center;
        font-size: 0.42rem;
        color: #ac3e1c;
        font-weight: bold;
      }
    }
    .lpeople {
      display: block;
      width: 0.95rem;
      height: 1.05rem;
      background: url(../assets/img/man.gif);
      background-size: 100% 100%;
      position: absolute;
      top: 1.78rem;
      left: 0;
    }
    .rpeole {
      display: block;
      width: 0.95rem;
      height: 1.05rem;
      background: url(../assets/img/gir.gif);
      background-size: 100% 100%;
      position: absolute;
      top: 1.8rem;
      right: 0;
    }
    .goHtmlBox {
      position: absolute;
      right: 0;
      top: 0.17rem;
      &.top {
        top: 1.5rem;
      }
      .ruleTips,
      .scoreTips {
        display: block;
        width: 1.63rem;
        height: 0.53rem;
        background: url(../assets/img/ruleTips.png);
        background-size: 100% 100%;
        font-size: 0.21rem;
        white-space: nowrap;
        line-height: 0.53rem;
        text-align: center;
        text-indent: 0.1rem;
      }
      .scoreTips {
        margin-top: 0.09rem;
      }
    }
  }
  .pig {
    height: 9rem;
    position: relative;
    z-index: 1;
    background: url(../assets/img/banner2.png) center 0 no-repeat;
    background-size: 100% auto;
    .pigImg {
      width: 4.6rem;
      height: 3.96rem;
      position: absolute;
      top: 1.55rem;
      left: 1.45rem;
      animation: heartbeat 5s infinite;
      &.pig1 {
        background-image: url(../assets/img/pig1.png);
        background-size: 100% 100%;
      }
      &.pig2 {
        background-image: url(../assets/img/pig2.png);
        background-size: 100% 100%;
      }
      &.pig3 {
        width: 5.62rem;
        height: 3.37rem;
        left: 1rem;
        background-image: url(../assets/img/pig3.png);
        background-size: 100% 100%;
      }
    }
    .pigL {
      width: 0.55rem;
      height: 0.89rem;
      background: url(../assets/img/pigL.png);
      background-size: 100% 100%;
      position: absolute;
      left: 0.4rem;
      top: 0.21rem;
      z-index: -1;
      animation: heart 1.3s ease-in-out 0.8s infinite alternate;
    }
    .pigR {
      width: 0.79rem;
      height: 1.22rem;
      background: url(../assets/img/pigR.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0.67rem;
      top: -0.17rem;
      z-index: -1;
      animation: heart 1.3s ease-in-out 2s infinite alternate;
    }
  }
  .tabs {
    display: block;
    span {
      &.act {
        color: red;
      }
    }
  }
  .con {
    margin-top: -4.8rem;
    position: relative;
    z-index: 10;
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
#circlebox {
  // width: 2rem;
  // height: 2rem;
  // background-color: red;
  // position: fixed;
}
</style>


