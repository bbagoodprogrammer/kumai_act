<template>
  <div class="box">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <div class="tipsBox">
        <span class="ruleTips" :class="{top:isShare}" @click="goRule()">規則獎勵</span>
        <span class="history">糖果動態</span>
      </div>
    </div>
    <div class="mainTabsMtop">
      <span :class="{act:mainTab=='Tasks'}" @click="tabClick('Tasks')">萬聖節糖果</span>
      <span :class="{act:mainTab=='TabsScrollLoadList'}" @click="tabClick('TabsScrollLoadList')">討糖不搗蛋</span>
    </div>
    <!-- <keep-alive> -->
    <component :is="mainTab" :type="mainTab"></component>
    <!-- </keep-alive> -->
    <!-- <TabsScrollLoadList /> -->
    <!-- <act-footer></act-footer> -->
    <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}"></div>
    <div class="mask" v-show="invitation">
      <transition name="slide">
        <div class="invitationPup" v-if="invitation">
          <i class="close" @click="closeInvitation()"></i>
          <div class="title"><i></i></div>
          <p>有好友邀請你玩音覓大富翁</p>
          <ul>
            <li v-for="(item,index) in peopleList" :key="index" @click="setActIndex(index)">
              <img v-lazy="item.avatar" alt="">
              <div class="nick">{{item.nick}}</div>
              <i class="gou" :class="{act:index==actIndex}"></i>
            </li>
          </ul>
          <p class="tips">成功邀請你玩音覓大富翁的好友，有機會獲得 <i></i> x3</p>
          <span class="singUpBtn" @click="singUp()">接受他的邀請</span>
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
import TabsScrollLoadList from "../components/TabsScrollLoadList"
import Tasks from "../components/Tasks"
import { mapState } from "vuex"
export default {
  components: { MsgToast, ActFooter, TabsScrollLoadList, Tasks },
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
      mainTab: 'TabsScrollLoadList',
      invitation: false,
      actIndex: null,
      tasksList: [],
    }
  },
  created() {
    this.judgeShare()  //判断是否为分享环境,请求相应的接口 
    this.getDefaultData()
  },
  computed: {
    ...mapState(['tasks'])
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
          const { step, reg, owner, step_show, score, today, end_time } = response_data
          this.vxc('setActStatus', step)
          this.vxc('setReg', reg)
          this.vxc('setUserMsg', owner)
          this.vxc('setScore', score)
          this.vxc('updateRankGroups', { key: 0, second: today })
          this.vxc('updateRankGroups', { key: 'total', second: end_time })
        } else {
          this.toast(response_status.error)
        }
      })
    },
    tabClick(val) {
      if (val == 'Tasks' && !this.tasks.day_task) { //拉取任務數據
        this.mainTab = val
        api.tasks().then(res => {
          console.log(res)
          this.vxc('setTasks', res.data.response_data)
        })
      } else {
        this.mainTab = val
      }
    },
    downApp() {
      APP()
    },
    goRule() {
      let regstr = getString('token')
      location.href = `./index2.html?token=${regstr}`
    },
    refrsh() { //刷新
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      window.removeEventListener("scroll", this.onScroll)
      this.getDefaultData('ref')
    },
    closeInvitation() {
      this.invitation = false
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
  background: rgba(24, 7, 103, 1) url(../assets/img/banner.png) center 0
    no-repeat;
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
    height: 9.94rem;
    position: relative;
    .tipsBox {
      position: absolute;
      right: 0;
      top: 8.45rem;
      span {
        display: block;
        text-align: center;
        color: rgba(155, 69, 66, 1);
        font-size: 0.2rem;
        text-indent: 0.15rem;
      }
      .ruleTips {
        width: 1.42rem;
        height: 0.43rem;
        background: url(../assets/img/ruleTips.png);
        background-size: 100% 100%;
      }
      .history {
        width: 1.27rem;
        height: 0.43rem;
        background: url(../assets/img/history.png);
        background-size: 100% 100%;
        margin: 0.17rem 0 0 0.15rem;
      }
    }
  }
  .mainTabsMtop {
    width: 6.97rem;
    height: 0.9rem;
    line-height: 0.9rem;
    display: flex;
    align-items: center;
    background: url(../assets/img/tabs.png);
    background-size: 100% 100%;
    margin: 0 auto;
    span {
      flex: 1;
      height: 100%;
      text-align: center;
      &.act {
        background: url(../assets/img/actTab.png);
        background-size: 100% 100%;
      }
    }
  }
}
.invitationPup {
  width: 6.48rem;
  height: 8.29rem;
  padding-top: 0.71rem;
  border: 0.08rem solid #ffffff;
  background: linear-gradient(0deg, #83d2fb, #9e82fa, #a876f1);
  border-radius: 0.24rem;
  position: relative;
  .close {
    display: block;
    width: 0.72rem;
    height: 0.78rem;
    // background: url(../assets/img/close.png);
    // background-size: 100% 100%;
    position: absolute;
    right: -0.3rem;
    top: -0.4rem;
  }
  .title {
    width: 5.14rem;
    height: 1.42rem;
    // background: url(../assets/img/title/ribbon.png);
    // background-size: 100% 100%;
    position: absolute;
    top: -0.8rem;
    left: 0.71rem;
    i {
      display: block;
      width: 5.14rem;
      height: 1.42rem;
      // background: url(../assets/img/title/title_11.png);
      // background-size: 100% 100%;
    }
  }
  > p {
    text-align: center;
    font-size: 0.28rem;
  }
  ul {
    width: 6rem;
    height: 6rem;
    margin: 0.21rem auto;
    overflow-y: scroll;
    li {
      height: 1.4rem;
      background: rgba(104, 53, 191, 0.4);
      border-radius: 0.12rem;
      margin-bottom: 0.1rem;
      display: flex;
      align-items: center;
      img {
        width: 0.88rem;
        height: 0.88rem;
        border-radius: 50%;
        margin: 0 0.15rem 0 0.25rem;
      }
      .nick {
        width: 3.5rem;
        max-width: 3.5rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .gou {
        width: 0.48rem;
        height: 0.48rem;
        // background: url(../assets/img/Unselected.png);
        // background-size: 100% 100%;
        margin-left: 0.5rem;
        &.act {
          // background: url(../assets/img/Selected.png);
          // background-size: 100% 100%;
        }
      }
    }
  }
  .tips {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.24rem;
    i {
      width: 0.27rem;
      height: 0.27rem;
      // background: url(../assets/img/dice.png);
      // background-size: 100% 100%;
    }
  }
  .singUpBtn {
    display: block;
    width: 3.76rem;
    height: 1rem;
    margin: 0.19rem auto;
    // background: url(../assets/img/singUpBtn.png);
    // background-size: 100% 100%;
    color: rgba(126, 46, 0, 1);
    font-size: 0.32rem;
    text-align: center;
    line-height: 0.85rem;
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


