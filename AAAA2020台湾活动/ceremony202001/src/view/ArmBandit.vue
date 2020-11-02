<template>
  <div class="box">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <div class="ruleTipsBox">
        <span class="ruleTips" @click="goMain()"></span>
        <span class="ruleTips2" @click="goRule()"></span>
        <span class="ruleTips3" @click="goTicket()"></span>
      </div>
    </div>
    <div class="tabs">
      <span :class="[{act:act_index == item},'tab'+item]" v-for="(item,index) in 5" :key="index" @click="tabClick(item)">
        <i class="red" v-if="item == 1 && point.one || item == 2 && point.two || item == 3 && point.three"></i>
      </span>
    </div>
    <keep-alive>
      <component :is="'Playing'+act_index"></component>
    </keep-alive>
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
import Playing1 from "../components/Playing1"
import Playing2 from "../components/Playing2"
import Playing3 from "../components/Playing3"
import Playing4 from "../components/Playing4"
import Playing5 from "../components/Playing5"
export default {
  components: { MsgToast, ActFooter, Playing1, Playing2, Playing3, Playing4, Playing5 },
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
      act_index: 1
    }
  },
  created() {
    this.judgeShare()  //判断是否为分享环境,请求相应的接口 
    this.getDefaultData()
  },
  computed: {
    ...mapState(['point']),
    showCom() {
      return `Playing${this.act_index}`
    }
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
          const { step, coins, point, rank, shcule, user_info } = response_data
          this.vxc('setActStatus', step)
          this.vxc('setDaily_b', coins)
          this.vxc('setRegistered', user_info.registered)
          this.vxc('setShcule', shcule)
          let newPoint = point
          newPoint.one = false
          this.vxc('setPoint', newPoint)
          this.vxc('setUserInfo', user_info)
        } else {
          this.toast(response_status.error)
        }
      })
    },
    tabClick(item) {
      this.act_index = item
      this.vxc('setAct_index', item)
    },
    downApp() {
      APP()
    },
    goMain() {
      let regstr = getString('token')
      let uid = getString('uid')
      let aid = getString('aid')
      location.href = `http://activity.17sing.tw/static_html/2020/ceremony202000/index.html?token=${regstr}&uid=${uid}&aid=${aid}`
    },
    goRule() {
      let uid = getString('uid')
      let regstr = getString('token')
      location.href = `./index2.html?token=${regstr}&uid=${uid}`
    },
    goTicket() {
      let uid = getString('uid')
      let regstr = getString('token')
      let aid = getString('aid')
      location.href = `http://activity.17sing.tw/static_html/2020/singervote2020/index.html?token=${regstr}&uid=${uid}&aid=${aid}`
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
body {
  background: #281b24;
}
.box {
  max-width: 750px;
  overflow-x: hidden;
  position: relative;
  margin: auto;
  background: url("../assets/img/banner.png") 0 0 no-repeat,
    url("../assets/img/bg.png") 0 0 no-repeat;
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
    height: 9.76rem;
    position: relative;
    .ruleTipsBox {
      position: absolute;
      right: 0;
      top: 4.45rem;
      span {
        display: block;
        margin-bottom: 0.06rem;
      }
      .ruleTips {
        width: 1.49rem;
        height: 0.9rem;
        background: url(../assets/img/ruleTips1.png);
        background-size: 100% 100%;
      }
      .ruleTips2 {
        width: 1.48rem;
        height: 0.66rem;
        background: url(../assets/img/ruleTips2.png);
        background-size: 100% 100%;
      }
      .ruleTips3 {
        width: 1.48rem;
        height: 0.66rem;
        background: url(../assets/img/ruleTips3.png);
        background-size: 100% 100%;
      }
    }
  }
  .tabs {
    height: 1.8rem;
    display: flex;
    align-items: center;
    transition: all 0.5s ease;
    span {
      width: 1.5rem;
      height: 1.8rem;
      position: relative;
      .red {
        display: block;
        width: 0.24rem;
        height: 0.24rem;
        background: url(../assets/img/red.png);
        background-size: 100% 100%;
        position: absolute;
        right: 0.1rem;
        top: 0.1rem;
      }
    }
    .tab1 {
      background: url(../assets/img/tab1.png) no-repeat;
      background-size: 100% 100%;
      &.act {
        background: url(../assets/img/tab1_act.png) no-repeat;
        background-size: 100% 100%;
      }
    }
    .tab2 {
      background: url(../assets/img/tab2.png) no-repeat;
      background-size: 100% 100%;
      &.act {
        background: url(../assets/img/tab2_act.png) no-repeat;
        background-size: 100% 100%;
      }
    }
    .tab3 {
      background: url(../assets/img/tab3.png) no-repeat;
      background-size: 100% 100%;
      &.act {
        background: url(../assets/img/tab3_act.png) no-repeat;
        background-size: 100% 100%;
      }
    }
    .tab4 {
      background: url(../assets/img/tab4.png) no-repeat;
      background-size: 100% 100%;
      &.act {
        background: url(../assets/img/tab4_act.png) no-repeat;
        background-size: 100% 100%;
      }
    }
    .tab5 {
      background: url(../assets/img/tab5.png) no-repeat;
      background-size: 100% 100%;
      &.act {
        background: url(../assets/img/tab5_act.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .com {
    height: 15rem;
  }
  .guaBox {
    position: relative;
  }
}
.refresh {
  display: block;
  width: 0.94rem;
  height: 0.94rem;
  position: fixed;
  right: 0.08rem;
  bottom: 1.35rem;
  background: url(../assets/img/refresh.png) no-repeat;
  background-size: contain;
  transition: transform 1s;
  z-index: 1000;
}
</style>


