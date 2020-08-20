<template>
  <div class="box">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <span class="ruleTips" :class="{top:isShare}" @click="goRule()">獎勵規則</span>
    </div>
    <FightTabTime />
    <!-- <div class="pSong"> -->
    <FightSong :list="list" :set="status==1" v-if="list.length >0" />
    <!-- </div> -->

    <HotSong :length="list.length" @addSong="addSong" :update="update" />
    <act-footer :jun="jun" :device="device"></act-footer>
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
import FightTabTime from "../components/FightTabTime"
import FightSong from "../components/FightSong"
import HotSong from "../components/HotSong"
export default {
  components: { MsgToast, ActFooter, FightTabTime, FightSong, HotSong },
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
      list: [],
      jun: 0,
      device: null,
      id: null,
      status: null,
      update: null
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
    var ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
    //停止原生APP歌曲播放
    if (ios) {
      try {
        closeMusic();
      } catch (e) {

      }
    } else {
      try {
        javascript: JSInterface.closeMusic();
      } catch (e) {

      }
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
          const { act, version_allowed, device, jun, c_time, list, push, can, status, userinfo, next, time, update } = response_data
          if (val == 'toast') {
            this.toast(`提交成功！`)
          }
          this.id = act.id
          this.status = status
          sessionStorage.setItem('id', act.id)
          sessionStorage.setItem('status', status)
          this.device = device
          this.vxc('setVersion_allowed', version_allowed)
          sessionStorage.setItem('version_allowed', version_allowed)
          this.update = update
          sessionStorage.setItem('update', update)
          this.jun = jun
          this.vxc('setActStatus', status)
          this.list = push
          this.vxc('setHotSong', list)
          let downTime = 0
          if (status == 0) {
            downTime = act.stime - c_time
          } else if (status == 1) {
            downTime = act.etime - c_time
          }
          this.vxc('setAct', act)
          this.vxc('setDownScoend', downTime)
          this.vxc('setCan', can)
          this.vxc('setNext', next)
          sessionStorage.setItem('time', JSON.stringify(time))
        } else {
          this.toast(response_status.error)
        }
      })
    },
    addSong(item) {
      console.log(item, this.list)
      this.list.push(item)
    },
    downApp() {
      APP()
    },
    goRule() {
      let regstr = getString('token')
      location.href = `./rule.html?token=${regstr}`
    },
    refrsh() { //刷新
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      // window.removeEventListener("scroll", this.onScroll)
      this.getDefaultData()
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
    height: 7.47rem;
    position: relative;
    .ruleTips {
      width: 1.47rem;
      height: 0.56rem;
      background: url(../assets/img/ruleTips.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      top: 0.25rem;
      text-align: center;
      line-height: 0.56rem;
      color: rgba(174, 72, 0, 1);
      font-weight: bold;
      text-indent: 0.15rem;
      font-size: 0.26rem;
      &.top {
        top: 1.5rem;
      }
    }
  }
  .pSong {
    padding: 0 0.32rem;
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


