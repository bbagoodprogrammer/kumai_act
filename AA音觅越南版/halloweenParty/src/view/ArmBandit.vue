<template>
  <div class="box">
    <RoolMsg />
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <div class="tipsBox" :class="{top:isShare}">
        <span class="ruleTips" @click="goRule()"></span>
        <span class="history" @click="goHistory()"></span>
      </div>
    </div>
    <div class="mainTabsMtop">
      <span :class="{act:mainTab=='Tasks'}" @click="tabClick('Tasks')">Qùa Halloween</span>
      <span :class="{act:mainTab=='TabsScrollLoadList'}" @click="tabClick('TabsScrollLoadList')">Đi xin kẹo</span>
    </div>
    <!-- <keep-alive> -->
    <component :is="mainTab" :type="mainTab" ref="ranks"></component>
    <!-- </keep-alive> -->
    <!-- <TabsScrollLoadList /> -->
    <act-footer></act-footer>
    <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}"></div>
    <div class="mask" v-show="invitation">
      <transition name="slide">
        <div class="invitationPup" v-if="invitation">
          <i class="close" @click="closeInvitation()"></i>
          <h5>"Mời bạn bè tham gia Lế hội Halloween"</h5>
          <ul>
            <li v-for="(item,index) in peopleList" :key="index" @click="setActIndex(index)">
              <img v-lazy="item.avatar" alt="">
              <div class="nick">{{item.nick}}</div>
              <span class="gou"> <i v-if="actIndex == index"> </i></span>
            </li>
          </ul>
          <p class="tips">Người mời thành công bạn tham gia Lễ hội Halloween, có thể nhận<i></i></p>
          <span class="singUpBtn" @click="singUp('select')">Chấp nhận lời mời của họ</span>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="firstGift">
      <transition name="slide">
        <div class="firstLuck" v-if="firstGift">
          <i class="close" @click="closeFirst()"></i>
          <div class="title">
            <p v-if="!isRank">Chào đón bạn đến với lế hội halloween Tặng bạn 2 chiếc Kẹo ma lực"</p>
            <p v-else>Hoan nghênh nồng nhiệt!</p>
          </div>
          <img src="../assets/img/tang.png" alt="" v-if="!isRank">
          <img :src="rankGift[step_show].img" alt="" v-else>
          <p v-if="!isRank">Có thể tặng cho những tiểu quỷ, để tăng điểm chơi của họ nhé</p>
          <p v-else>Bạn đạt {{score}} điểm, nhận được thưởng {{rankGift[step_show].name}}, mời bạn kiểm tra.</p>
          <div class="btn" v-if="!isRank" @click="singUp()">Nhận</div>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="showHistory">
      <transition name="slide">
        <GiftHistory v-if="showHistory" @closeHistory="closeHistory" />
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
import RoolMsg from "../components/RoolMsg"
import GiftHistory from "../components/GiftHistory"
export default {
  components: { MsgToast, ActFooter, TabsScrollLoadList, Tasks, RoolMsg, GiftHistory },
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
      step_show: 1,
      firstGift: false,
      isRank: false,
      rankGift: {
        1: {
          name: 'Túi quà bí đỏ *10',
          img: require('../assets/img/ruleImg/f2.png')
        },
        2: {
          name: 'Khung ảnh Halloween 15 ngày',
          img: require('../assets/img/ruleImg/f3.png')
        },
        3: {
          name: 'Xe bí đỏ 15 ngày',
          img: require('../assets/img/ruleImg/f1.png')
        }
      },
      showHistory: false,
      score: 0
    }
  },
  created() {
    this.judgeShare()  //判断是否为分享环境,请求相应的接口 
    this.getDefaultData()
    this.getRoolMsg()
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
          const { step, reg, owner, step_show, score, today, end_time, invite } = response_data
          if (invite && invite.length) {
            this.peopleList = invite
            this.invitation = true
          } else if (!reg) {
            this.firstGift = true
          }
          if (step_show > 0) {
            this.isRank = true
            this.firstGift = true
            this.step_show = step_show
          }
          this.vxc('setActStatus', step)
          this.vxc('setReg', reg)
          this.vxc('setUserMsg', owner)
          this.score = score
          this.vxc('setScore', score)
          this.vxc('updateRankGroups', { key: 0, second: today })
          this.vxc('updateRankGroups', { key: 'total', second: end_time })

        } else {
          this.toast(response_status.error)
        }
      })
    },
    getRoolMsg() {
      api.roolMsg().then(res => {
        this.vxc('setRoolMsg', res.data.response_data.list)
      })
    },
    tabClick(val) {
      if (val == 'Tasks' && !this.tasks.day_task) { //拉取任務數據
        this.mainTab = val
        api.tasks().then(res => {
          this.vxc('setTasks', res.data.response_data)
        })
      } else {
        this.mainTab = val
      }
    },
    setActIndex(index) {
      this.actIndex = index
    },
    // invitSingUp() {
    //   this.invitation = false
    //   this.firstGift = true
    // },
    singUp(select) {
      if (select && this.actIndex == null) {
        this.toast('Chọn bạn chia sẻ~')
        return
      }
      let uid = this.actIndex != null ? this.peopleList[this.actIndex].uid : null
      api.singUp(uid).then(res => {
        if (res.data.response_status.code == 0) {
          this.getDefaultData()
          this.invitation = false
          this.firstGift = false
          this.toast('Chào đón bạn đến với lế hội halloween Tặng bạn 2 chiếc Kẹo ma lực( đã được gửi vào túi quà)')
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    closeFirst() {
      this.firstGift = false
    },
    goHistory() {
      this.showHistory = true
    },
    closeHistory() {
      this.showHistory = false
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
      // window.removeEventListener("scroll", this.onScroll)
      this.getDefaultData('ref')
      if (this.mainTab == 'Tasks') {
        api.tasks().then(res => {
          this.vxc('setTasks', res.data.response_data)
        })
      } else {
        this.$refs.ranks.onRefresh()
      }
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
        line-height: 0.43rem;
      }
      .ruleTips {
        width: 1.84rem;
        height: 0.43rem;
        background: url(../assets/img/ruleTips2.png);
        background-size: 100% 100%;
      }
      .history {
        width: 1.27rem;
        height: 0.43rem;
        background: url(../assets/img/ruleTips1.png);
        background-size: 100% 100%;
        margin: 0.17rem 0 0 0.6rem;
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
  width: 6.6rem;
  height: 7.14rem;
  background: url(../assets/img/fListBg.png);
  background-size: 100% 100%;
  border-radius: 0.24rem;
  position: relative;
  padding-top: 1rem;
  h5 {
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    color: rgba(107, 38, 193, 1);
    font-size: 0.33rem;
    font-weight: 600;
  }
  .close {
    display: block;
    width: 0.72rem;
    height: 0.78rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: -0.1rem;
    top: 0.7rem;
  }
  > p {
    text-align: center;
    font-size: 0.28rem;
  }
  ul {
    width: 6rem;
    height: 4.5rem;
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
        width: 0.26rem;
        height: 0.26rem;
        background: url(../assets/img/Unselected.png);
        background-size: 100% 100%;
        margin-left: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        i {
          display: block;
          width: 0.18rem;
          height: 0.18rem;
          background: url(../assets/img/selected.png);
          background-size: 100% 100%;
        }
      }
    }
  }
  .tips {
    text-align: center;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    font-size: 0.24rem;
    padding: 0 0.4rem;
    i {
      display: inline-block;
      vertical-align: middle;
      width: 0.5rem;
      height: 0.5rem;
      background: url(../assets/img/tang.png);
      background-size: 100% 100%;
    }
  }
  .singUpBtn {
    display: block;
    width: 3.12rem;
    height: 0.97rem;
    margin: 0.19rem auto;
    background: url(../assets/img/inivtBtn.png);
    background-size: 100% 100%;
    font-size: 0.32rem;
    text-align: center;
    line-height: 0.97rem;
  }
}
.firstLuck {
  width: 6.6rem;
  height: 5.08rem;
  background: url(../assets/img/firstPup.png);
  background-size: 100% 100%;
  padding-top: 1rem;
  position: relative;
  .close {
    display: block;
    width: 0.72rem;
    height: 0.78rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: -0.1rem;
    top: 0.7rem;
  }
  .title {
    padding: 0 0.4rem;
    height: 1.6rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    p {
      font-size: 0.35rem;
      font-weight: 600;
      color: rgba(107, 38, 193, 1);
    }
  }
  img {
    display: block;
    margin: 0 auto;
    width: 1.5rem;
    height: 1.5rem;
  }
  > p {
    text-align: center;
    font-size: 0.23rem;
    margin-top: 0.3rem;
    padding: 0 0.3rem;
  }
  .btn {
    width: 2.6rem;
    height: 0.97rem;
    text-align: center;
    line-height: 0.97rem;
    background: url(../assets/img/ok.png);
    background-size: 100% 100%;
    position: absolute;
    left: 1.99rem;
    bottom: -0.3rem;
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


