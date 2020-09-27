<template>
  <div class="box">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <div class="tipsBox" :class="{top:isShare}">
        <span class="ruleTips" @click="goRule()">獎勵&規則</span>
        <span class="ruleTips2" @click="goHistory()">{{leader?'申請&邀請記錄':'受邀記錄'}} <i v-if="red_point.invite || red_point.apply"></i> </span>
        <span class="ruleTips3" @click="teamList()">當前組隊情況</span>
      </div>
      <i class="taskIcon" @click="showTaskPup()"></i>
    </div>
    <div class="pkList" v-if="team.type >0">
      <div class="title">當前組隊情況</div>
      <PkMsg :team="team" />
    </div>

    <Invitation v-if="leader && registered" />
    <!-- v-else-if="registered" -->
    <div class="mask" v-show="showTask">
      <transition name="slide">
        <Tasks v-if="showTask" :record="record" />
      </transition>
    </div>
    <MainTabsScrollLoadList />
    <act-footer></act-footer>
    <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}"></div>
    <div class="mask" v-show="showTeam">
      <transition name="slide">
        <div class="nowList" v-if="showTeam">
          <div class="title">當前組隊情況</div>
          <i class="close" @click="closeTeam()"></i>
          <PkMsg :team="team" :no="true" />
        </div>
      </transition>
    </div>
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
import MainTabsScrollLoadList from "../components/MainTabsScrollLoadList"
import PkMsg from "../components/PkMsg"
export default {
  components: { MsgToast, ActFooter, Invitation, Tasks, MainTabsScrollLoadList, PkMsg },
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
      leader: null,
      registered: false,
      showTeam: false,
      team: {},
      red_point: {},
      defaultTeam: {
        team: [null, null, null, null, null, null, null, null],
        type: 0
      }
    }
  },
  created() {
    this.judgeShare()  //判断是否为分享环境,请求相应的接口 
    this.getDefaultData()
  },
  computed: {
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
          this.vxc('setMyRank', rank)
          this.vxc('setFriend_list', friend_list.list)
          this.leader = leader
          this.vxc('setLeader', leader)
          this.vxc('setKol', kol)
          this.registered = user_info.registered
          this.team = team.type == 0 ? this.defaultTeam : team
          this.red_point = red_point
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
    },
    teamList() {
      this.showTeam = true
    },
    closeTeam() {
      this.showTeam = false
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
    height: 7.8rem;
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
        position: relative;
        i {
          width: 0.15rem;
          height: 0.15rem;
          background: #ff0001;
          border: 0.02rem solid #d4aa66;
          border-radius: 50%;
          position: absolute;
          right: 0rem;
          top: 0.12rem;
        }
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
  .pkList {
    > .title {
      width: 5.83rem;
      height: 0.7rem;
      background: url(../assets/img/inivationTitle.png);
      background-size: 100% 100%;
      font-size: 0.36rem;
      line-height: 0.6rem;
      text-align: center;
      margin: 0 auto 0rem;
      text-shadow: rgba(28, 81, 179, 1) 0.02rem 0 0,
        rgba(28, 81, 179, 1) 0 0.02rem 0, rgba(28, 81, 179, 1) -0.02rem 0 0,
        rgba(28, 81, 179, 1) 0 -0.02rem 0;
    }
  }
}
.close {
  display: block;
  width: 0.67rem;
  height: 0.67rem;
  background: url(../assets/img/close.png);
  background-size: 100% 100%;
  position: absolute;
  bottom: -1.5rem;
  left: 3.05rem;
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
    padding: 0 0.3rem;
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
.nowList {
  width: 6.75rem;
  height: 4.53rem;
  background: url(../assets/img/pkBg2.png);
  background-size: 100% 100%;
  position: relative;
  padding-top: 0.6rem;
  > .title {
    width: 4.08rem;
    height: 0.92rem;
    font-size: 0.48rem;
    font-weight: 600;
    text-align: center;
    line-height: 0.92rem;
    background: url(../assets/img/titleBg.png);
    background-size: 100% 100%;
    position: absolute;
    left: 1.34rem;
    top: -0.33rem;
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


