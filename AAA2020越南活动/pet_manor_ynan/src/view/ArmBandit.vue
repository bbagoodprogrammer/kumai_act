<template>
  <div class="box">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <div class="userMaxTips" @click="showNo()">
        <div class="avBg">
          <span class="bg"></span>
          <img v-lazy="av" alt="">
        </div>
        <p>Chủ Vườn Ưu Tú</p>
      </div>
      <div class="tipsBox" :class="{top:isShare}">
        <span class="ruleTips ruleTips2" @click="goRule()">Thể lệ&Thưởng</span>
        <span class="ruleTips mt" @click="goHistory()">Lịch sử</span>
      </div>
    </div>
    <Pats />
    <Bar />
    <TabsScrollLoadList ref="scorll" @getDefaultData="getDefaultData"></TabsScrollLoadList>
    <act-footer></act-footer>
    <div class="mask" v-show="showUserNo">
      <transition name="slide">
        <div class="topPup" v-if="showUserNo">
          <i class="close" @click="showNo()"></i>
          <div class="avBg">
            <span class="bg"></span>
            <img v-lazy="av" alt="">
          </div>
          <h3>Chủ Vườn Ưu Tú</h3>
          <p v-if="number == 0">Thu thập 6 loại thú cưng trở thành chủ vườn ưu tú<br />Đã có {{complete}} chủ vườn được chứng nhận ưu tú</p>
          <p v-else>Chúc mừng bạn thu thập đủ 6 loại thú cưng<br />Trở thành chủ vườn ưu tú thứ {{number}}, được chứng nhận</p>
          <span class="no" v-if="number> 0">Mã ưu tú: NO.{{number}}</span>
        </div>
      </transition>
    </div>
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
import Pats from "../components/Pats"
import Bar from "../components/Bar"
import TabsScrollLoadList from "../components/TabsScrollLoadList"
export default {
  components: { MsgToast, ActFooter, Pats, Bar, TabsScrollLoadList },
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
      showUserNo: false,
      number: 0,
      complete: 0,
      av: ''
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
      this.vxc('setShareState', this.isShare) //分享状态
    },
    getDefaultData(val) { //初始化
      api.getDefault().then(res => {
        const { response_status, response_data } = res.data
        if (response_status.code == 0) {
          const { all, schule, myrank, list, step, number, complete } = response_data
          this.vxc('setPets', all)
          this.vxc('setSchule', schule)
          this.vxc('setActStatus', step)
          this.complete = complete
          this.number = number
          this.av = myrank.avatar
          this.vxc('setSetInited', 1)
          this.vxc('setSingUp', myrank.registered)
          this.$store.commit('updateRankGroups', { //当前日榜信息
            key: 'total',
            loadCount: 0,
            loadEnd: list.length < 20,
            loading: false,
            none: list.length == 0,
            list: list,
          })
          this.$store.commit("changGroupsUserMsg", {//初始当前日榜个人信息
            key: 'total',
            msg: myrank
          })
        } else {
          this.toast(response_status.error)
        }
      })
    },
    showNo() {
      this.showUserNo = !this.showUserNo
    },
    downApp() {
      APP()
    },
    goRule() {
      let regstr = getString('token')
      location.href = `./index2.html?token=${regstr}`
    },
    goHistory() {
      let regstr = getString('token')
      location.href = `./index3.html?token=${regstr}`
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
  background: rgba(32, 88, 123, 1) url(../assets/img/banner.png) no-repeat;
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
    height: 5.09rem;
    position: relative;
    .userMaxTips {
      position: absolute;
      top: 3.02rem;
      .avBg {
        width: 1.38rem;
        height: 1.38rem;
        position: relative;
        margin-left: 0.13rem;
        animation: jiggle 3s ease-in-out infinite;
        -o-animation: jiggle 3s ease-in infinite;
        -webkit-animation: jiggle 3s ease-in infinite;
        -moz-animation: jiggle 3s ease-in infinite;
        -ms-animation: jiggle 3s ease-in infinite;
        .bg {
          width: 1.38rem;
          height: 1.38rem;
          position: absolute;
          background: url(../assets/img/maxTopBg.png);
          background-size: 100% 100%;
          z-index: 1;
        }
        img {
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          position: absolute;
          top: 0.25rem;
          left: 0.19rem;
        }
      }
      p {
        width: 1.8rem;
        height: 0.43rem;
        line-height: 0.43rem;
        background: url(../assets/img/maxTipsBg.png);
        background-size: 100% 100%;
        font-size: 0.22rem;
        font-weight: 500;
        text-align: center;
        white-space: nowrap;
      }
    }
    .tipsBox {
      position: absolute;
      right: 0;
      top: 0.17rem;
      &.top {
        top: 1.5rem;
      }
      .mt {
        margin: 0.14rem 0 0 0.3rem;
      }
      .ruleTips {
        display: block;
        width: 1.38rem;
        height: 0.55rem;
        line-height: 0.55rem;
        background: url(../assets/img/tipsBg.png);
        background-size: 100% 100%;
        font-size: 0.22rem;
        font-weight: 600;
        color: rgba(32, 88, 123, 1);
        text-align: center;
        text-indent: 0.1rem;
        white-space: nowrap;
      }
      .ruleTips2 {
        width: 1.68rem;
        background: url(../assets/img/tipsBg.png);
        background-size: 100% 100%;
      }
    }
  }
  .topPup {
    width: 6.2rem;
    height: 4.41rem;
    background: url(../assets/img/comPupBg.png);
    background-size: 100% 100%;
    padding-top: 1.09rem;
    margin-top: -1rem;
    position: relative;
    .close {
      display: block;
      width: 0.77rem;
      height: 0.77rem;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
      position: absolute;
      bottom: -1rem;
      left: 2.73rem;
    }
    .avBg {
      width: 1.38rem;
      height: 1.38rem;
      position: relative;
      margin-left: 0.13rem;
      margin: 0 auto;
      .bg {
        width: 1.38rem;
        height: 1.38rem;
        position: absolute;
        background: url(../assets/img/maxTopBg.png);
        background-size: 100% 100%;
        z-index: 1;
      }
      img {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        position: absolute;
        top: 0.25rem;
        left: 0.19rem;
      }
    }
    h3 {
      text-align: center;
      color: rgba(32, 88, 123, 1);
      font-weight: 600;
      margin-top: 0.1rem;
    }
    p {
      text-align: center;
      color: rgba(32, 88, 123, 1);
      font-size: 0.32rem;
      margin-top: 0.3rem;
    }
    .no {
      display: block;
      font-size: 0.36rem;
      color: rgba(32, 88, 123, 1);
      margin: 0.56rem auto 0;
      text-align: center;
    }
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


