<template>
  <div class="box">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <div class="tipsBox" :class="{top:isShare}">
        <span class="ruleTips" @click="goRule()">獎勵&規則</span>
        <span class="ruleTips2" @click="goHistory()">申請&邀請記錄</span>
        <span class="ruleTips3" @click="goRule()">當前組隊情況</span>
      </div>
      <i class="taskIcon" @click="showTaskPup()"></i>
    </div>
    <Invitation />
    <!-- <act-footer></act-footer> -->
    <div class="mask" v-show="showTask">
      <transition name="slide">
        <Tasks v-if="showTask" :record="record" />
      </transition>
    </div>
    <TeamSearch />
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
import Invitation from "../components/Invitation"
import Tasks from "../components/Tasks"
import TeamSearch from "../components/TeamSearch"
export default {
  components: { MsgToast, ActFooter, Invitation, Tasks, TeamSearch },
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
      showTask: false,
      record: [],
      leader: null
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
          const { step, friend_list, kol, leader, list, nums, rank, red_point, team, user_info } = response_data
          this.vxc('setActStatus', step)
          this.vxc('setUserMsg', user_info)
          this.vxc('setFriend_list', [
            {
              "avatar": "http://img.17sing.tw/uc/img/head_100862_1582700448.png_small",
              "nick": "栗子蛋糕推薦一下距離",
              "uid": 100862,
              "status": "0" //0已邀请 1已加入 3 拒接 3 未操作
            },
            {
              "avatar": "http://img.17sing.tw/group50/M00/59/D4/Cm4EdVkJvtSAK8FjAAC6F_tEJqY936.png_small",
              "nick": "Kelly",
              "uid": 100865,
              "status": "0"
            },
            {
              "avatar": "http://img.17sing.tw/uc/img/head_100867_1536057451.png_small",
              "nick": "Alisa",
              "uid": 100867,
              "status": 3  //未操作
            },
            {
              "avatar": "http://img.17sing.tw/uc/img/head_100868_1572869355.png_small",
              "nick": "拾夢人",
              "uid": 100868,
              "status": 3
            },
            {
              "avatar": "http://img.17sing.tw/uc/img/head_100869_1541753461.png_small",
              "nick": "Hui",
              "uid": 100869,
              "status": 3
            },
            {
              "avatar": "http://img.17sing.tw/uc/img/head_100871_1599193856.png_small",
              "nick": "(*ﾟｪﾟ*)車來了車來",
              "uid": 100871,
              "status": 3
            }
          ])
          this.leader = leader
        } else {
          this.toast(response_status.error)
        }
      })
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
      location.href = `./index3.html?host=${this.leader}&token=${regstr}`
    },
    refrsh() { //刷新
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      window.removeEventListener("scroll", this.onScroll)
      this.getDefaultData('ref')
    },
    showTaskPup() {
      api.taskList().then(res => {
        this.showTask = true
        this.record = res.data.response_data.record
        console.log(res)
      })
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
  .header {
    height: 7.4rem;
    position: relative;
    .tipsBox {
      position: absolute;
      right: 0;
      top: 0.17rem;
      span {
        display: block;
        font-size: 0.24rem;
        height: 0.87rem;
        line-height: 0.87rem;
        font-style: italic;
        text-align: center;
        text-indent: 0.1rem;
        text-shadow: rgba(45, 45, 45, 1) 0.02rem 0 0,
          rgba(45, 45, 45, 1) 0 0.02rem 0, rgba(45, 45, 45, 1) -0.02rem 0 0,
          rgba(45, 45, 45, 1) 0 -0.02rem 0;
      }
      .ruleTips {
        width: 1.48rem;
        background: url(../assets/img/ruleTips1.png);
        background-size: 100% 100%;
        margin-left: 0.48rem;
      }
      .ruleTips2 {
        width: 1.96rem;
        background: url(../assets/img/ruleTips2.png);
        background-size: 100% 100%;
      }
      .ruleTips3 {
        width: 1.76rem;
        background: url(../assets/img/ruleTips3.png);
        background-size: 100% 100%;
        margin-left: 0.2rem;
      }
      &.top {
        top: 1.5rem;
      }
    }
    .taskIcon {
      display: block;
      width: 1.14rem;
      height: 1.25rem;
      background: url(../assets/img/taksIcon.png) no-repeat;
      background-size: 100% 100%;
      position: absolute;
      left: 0.26rem;
      bottom: 0.17rem;
    }
  }
  .guaBox {
    position: relative;
  }
}
.queryPup {
  width: 6.25rem;
  height: 4.02rem;
  background: url(../assets/img/pupBg.png);
  background-size: 100% 100%;
  position: relative;
  .close {
    display: block;
    width: 0.67rem;
    height: 0.67rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    bottom: -1.5rem;
    left: 2.8rem;
  }
  p {
    height: 2.33rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .btnBox {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    span {
      width: 2.32rem;
      height: 0.92rem;
      line-height: 0.8rem;
      text-shadow: rgba(55, 30, 13, 1) 0.02rem 0 0,
        rgba(55, 30, 13, 1) 0 0.02rem 0, rgba(55, 30, 13, 1) -0.02rem 0 0,
        rgba(55, 30, 13, 1) 0 -0.02rem 0;
      &.ok {
        background: url(../assets/img/ok.png);
        background-size: 100% 100%;
      }
      &.no {
        margin-left: 0.84rem;
        background: url(../assets/img/no.png);
        background-size: 100% 100%;
      }
    }
    span:first-child {
      text-shadow: rgba(28, 81, 179, 1) 0.02rem 0 0,
        rgba(28, 81, 179, 1) 0 0.02rem 0, rgba(28, 81, 179, 1) -0.02rem 0 0,
        rgba(28, 81, 179, 1) 0 -0.02rem 0;
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


