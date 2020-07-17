<template>
  <div class="box">
    <RoolMsg />
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <Box />
      <div class="house">
        <div class="userTitle">
          <p>xxx的夏日清爽屋 <strong>清爽值：xxxxx</strong></p>
        </div>
        <div class="people"></div>
      </div>
      <div class="wards">
        <div class="title"></div>
        <i class="num num1"></i>
        <i class="num num2"></i>
        <i class="num num3"></i>
      </div>
      <div class="tipsBox">
        <span class="ruleTips1" @click="goRule()"></span>
        <span class="ruleTips2" @click="rule()"></span>
        <span class="ruleTips3" @click="rank()"></span>
      </div>
    </div>
    <List />
    <p class="actTips">活動最終解釋權歸活主辦方所有</p>
    <!-- <act-footer></act-footer> -->
    <div class="mask" v-show="showRank">
      <transition name="slide">
        <Rank v-if="showRank" />
      </transition>
    </div>
    <div class="mask" v-show="showRules">
      <transition name="slide">
        <Rules v-if="showRules" />
      </transition>
    </div>
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
import List from "../components/List"
import Box from "../components/Box"
import RoolMsg from "../components/RoolMsg"
import Rank from "../components/Rank"
import Rules from "../components/Rules"
import { setTimeout } from 'timers';
export default {
  components: { MsgToast, ActFooter, List, Box, RoolMsg, Rank, Rules },
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
      showRank: false,
      showRules: false
    }
  },
  created() {
    this.judgeShare()  //判断是否为分享环境,请求相应的接口 
    this.getDefaultData()
    setTimeout(() => {
      this.vxc('setRoolMsg', [{
        name: 'xxxx',
        score: 4546464
      }, {
        name: 'xxxx',
        score: 4546464
      }])
    }, 2000)
  },
  mounted() {
  },
  methods: {
    judgeShare() {//判断是否为分享环境,请求相应的接口 
      this.isShare = getString('token') ? false : true
      this.vxc('setShareState', this.isShare) //分享状态
    },
    getDefaultData(val) { //初始化
      // api.getDefault().then(res => {
      //   const { response_status, response_data } = res.data
      //   if (response_status.code == 0) {

      //   } else {
      //     this.toast(response_status.error)
      //   }
      // })
    },
    downApp() {
      APP()
    },
    refrsh() { //刷新
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      window.removeEventListener("scroll", this.onScroll)
      this.getDefaultData('ref')
    },
    rank() {
      this.showRank = true
    },
    rule() {
      this.showRules = true
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
    height: 8.8rem;
    padding-top: 1.49rem;
    position: relative;
    .house {
      width: 7.5rem;
      height: 7.97rem;
      background: url(../assets/img/houseBg.png) no-repeat;
      background-size: 100% 100%;
      margin: 0 auto 0;
      position: relative;
      .userTitle {
        width: 4.5rem;
        height: 0.7rem;
        position: absolute;
        top: 0.65rem;
        left: 1.5rem;
        text-align: center;
        color: RGBA(141, 75, 255, 1);
        p {
          font-weight: 600;
        }
        strong {
          display: block;
          font-size: 0.22rem;
          font-weight: 600;
          margin-top: -0.05rem;
        }
      }
      .people {
        width: 3.4rem;
        height: 2.74rem;
        background: url(../assets/img/people.png);
        background-size: 100% 100%;
        position: absolute;
        top: 1.97rem;
        left: 0.92rem;
      }
    }
    .wards {
      width: 7.08rem;
      height: 2.91rem;
      background: url(../assets/img/wards.png);
      background-size: 100% 100%;
      position: absolute;
      top: 7.44rem;
      left: 0.22rem;
      .title {
        width: 4.67rem;
        height: 1.47rem;
        background: url(../assets/img/title1.png) no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: -0.73rem;
        left: 1.3rem;
      }
      .num {
        display: block;
        width: 0.61rem;
        height: 0.64rem;
        background: url(../assets/img/numBg.png) no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 0.54rem;
        text-align: center;
        line-height: 0.64rem;
        font-size: 0.24rem;
        &.num1 {
          left: 1.61rem;
        }
        &.num2 {
          left: 3.8rem;
        }
        &.num3 {
          left: 6rem;
        }
      }
    }
    .tipsBox {
      position: absolute;
      right: 0;
      top: 5.78rem;
      width: 1.54rem;
      span {
        display: block;
        float: right;
      }
      .ruleTips1 {
        width: 0.8rem;
        height: 0.4rem;
        background: url(../assets/img/tips1.png) no-repeat;
        background-size: 100% 100%;
      }
      .ruleTips2 {
        width: 1.54rem;
        height: 0.4rem;
        background: url(../assets/img/tips2.png) no-repeat;
        background-size: 100% 100%;
        margin: 0.1rem 0;
      }
      .ruleTips3 {
        width: 1.03rem;
        height: 0.4rem;
        background: url(../assets/img/tips3.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .guaBox {
    position: relative;
  }
}
.actTips {
  text-align: center;
  font-size: 0.24rem;
  margin: 0.25rem 0;
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


