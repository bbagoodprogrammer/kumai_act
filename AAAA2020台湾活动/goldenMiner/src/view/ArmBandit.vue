<template>
  <div class="box">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <div class="title"></div>
      <div class="goHtml" :class="{top:isShare}">
        <span class="ruleTips" @click="goRule()">{{lang.rules}}</span>
        <span class="ruleTips" @click="goDetail()">{{lang.history}}</span>
      </div>
    </div>
    <LandBox />
    <Tabs ref="tabs" />
    <!-- <Game /> -->
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
import Game from "../components/Game"
import LandBox from "../components/LandBox"
import Tabs from "../components/Tabs"
export default {
  components: { MsgToast, ActFooter, Game, LandBox, Tabs },
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
    window.addEventListener("pageshow", function () {
      if (sessionStorage.getItem("need-refresh")) {
        location.reload();
        sessionStorage.removeItem("need-refresh");
      }
    });
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
        const { response_data, response_status } = res.data
        const { step, user_info, myrank, my_pool, today_wealth, continuous, schule, charge, receive } = response_data
        this.vxc('setActStatus', step)
        this.vxc('setUserMsg', user_info)
        this.vxc('setMy_pool', my_pool)
        this.vxc('setMyrank', myrank)
        this.vxc('setToday_wealth', today_wealth)
        this.vxc('setContinuous', continuous)
        this.vxc('setSchule', schule)
        this.vxc('setCharge', charge)
        this.vxc('setReceive', receive)
      })
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
      this.getDefaultData('ref')
      if (this.$refs.tabs.showCom == 'DayWards') {
        this.$refs.tabs.creatDayWards()
      } else if (this.$refs.tabs.showCom == 'Rank') {
        globalBus.$emit('setLoader')
        this.$refs.tabs.creatRank()
      }
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
  padding-bottom: 1.4rem;
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
    height: 2.91rem;
    position: relative;
    .title {
      width: 5.92rem;
      height: 2.91rem;
      background: url(../assets/img/title.png);
      background-size: 100% 100%;
      position: absolute;
      left: 0.79rem;
    }
    .goHtml {
      position: absolute;
      right: 0;
      top: 0.18rem;
      .ruleTips {
        display: block;
        width: 1.21rem;
        height: 0.49rem;
        background: url(../assets/img/ruleTips.png);
        background-size: 100% 100%;
        font-size: 0.24rem;
        color: #ae4800;
        font-weight: 700;
        text-align: center;
        line-height: 0.49rem;
      }
      .ruleTips:last-child {
        margin-top: 0.18rem;
      }
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
  width: 0.64rem;
  height: 0.7rem;
  border-radius: 50%;
  position: fixed;
  right: 0.08rem;
  bottom: 1.2rem;
  background: url(../assets/img/refresh.png) no-repeat;
  background-size: contain;
  transition: transform 1s;
  z-index: 1000;
}
</style>


