<template>
  <div class="box">
    <div class="tipsBox">
      <span class="ruleTips" :class="{top:isShare}" @click="goRule()">規則&獎勵</span>
      <span class="ruleTips history" :class="{top:isShare}" @click="history()">獎勵記錄</span>
    </div>
    <RoolMsg />
    <Game />
    <TabsScrollLoadList />
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
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
    <div class="mask" v-show="showHistory">
      <transition name="slide">
        <GiftHistory v-if="showHistory" @closeHistory="closeHistory" />
      </transition>
    </div>
    <div class="mask" v-show="showRule">
      <transition name="slide">
        <Rule v-show="showRule" />
      </transition>
    </div>
    <act-footer ref="footer"></act-footer>
    <!-- <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}"></div> -->
  </div>
</template>

<script>

import getString from "../utils/getString"
import APP from "../utils/openApp"
import api from "../api/apiConfig"
import ActFooter from "../components/ActFooter"
import MsgToast from "../components/commonToast"
import RoolMsg from "../components/RoolMsg"
import { globalBus } from '../utils/eventBus'
import { setTimeout } from 'timers';
import TabsScrollLoadList from "../components/TabsScrollLoadList"
import Game from "../components/Game"
import GiftHistory from "../components/GiftHistory"
import Rule from "../components/Rule"
export default {
  components: { MsgToast, Rule, ActFooter, RoolMsg, TabsScrollLoadList, Game, GiftHistory },
  data () {
    return {
      isShare: false, //是否分享
      isMore: true,   //加载更多
      activite: 1,    //活动状态
      showT: false,  //提示弹窗显示
      tastMsg: "提示信息",  //基础弹窗提示信息
      userState: 0,   //用户状态（是否报名）
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
      peopleList: [],
      actIndex: null,
      invitation: false,
      showHistory: false,
      showRule: false
    }
  },
  created () {
    this.judgeShare()  //判断是否为分享环境,请求相应的接口 
    this.getDefaultData()
    this.getRoolMsg()
  },
  mounted () {
  },
  methods: {
    judgeShare () {//判断是否为分享环境,请求相应的接口 
      this.isShare = getString('token') ? false : true
      this.vxc('setShareState', this.isShare) //分享状态
    },
    getDefaultData (val) { //初始化
      api.getDefault().then(res => {
        const { response_status, response_data } = res.data
        if (response_status.code == 0) {
          const { step, steps, day, total, position, position2, owner, dice, reg, friends, stime, etime } = response_data
          this.vxc('setActStatus', step)
          this.vxc('setSteps', steps)
          this.vxc('setSecond', total.dtime)
          this.vxc('setPosition', position2)
          this.vxc('setOwner', owner)
          this.vxc('setDice', dice)
          this.vxc('setDay', day)
          this.vxc('setTotal', total)
          this.vxc('setReg', reg)
          this.vxc('setStime', stime)
          this.vxc('setEtime', etime)
          if (friends && !reg) {
            this.peopleList = friends
            this.invitation = true
          }
        } else {
          this.toast(response_status.error)
        }
      })
    },
    getRoolMsg () {
      api.roolMsg().then(res => {
        this.vxc('setRoolMsg', res.data.response_data.list)
      })
    },
    history () {
      // api.getHistroy(0).then(res => {
      //   this.historyList = res.data.response_data.list
      this.showHistory = true
      // })
    },
    downApp () {
      APP()
    },
    goRule () {
      this.showRule = true
    },
    refrsh () { //刷新
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      window.removeEventListener("scroll", this.onScroll)
      this.getDefaultData('ref')
    },
    setActIndex (index) {
      this.actIndex = index
    },
    singUp () {
      let fuid = this.peopleList[this.actIndex].uid
      this.$refs.footer.singUp(fuid)
    },
    closeInvitation () {
      this.invitation = false
    },
    closeHistory () {
      this.showHistory = false
    },
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
  .tipsBox {
    width: 1.48rem;
    position: absolute;
    top: 0.9rem;
    right: 0;
    .ruleTips {
      display: block;
      width: 1.7rem;
      height: 0.56rem;
      background: url(../assets/img/ruleTips.png);
      background-size: 100% 100%;
      text-align: center;
      font-size: 0.24rem;
      line-height: 0.56rem;
      &.history {
        margin-top: 0.1rem;
      }
    }
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
  left: 0.08rem;
  bottom: 1.35rem;
  background: url(../assets/img/refresh.png) no-repeat;
  background-size: contain;
  transition: transform 1s;
  z-index: 1000;
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
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: -0.3rem;
    top: -0.4rem;
  }
  .title {
    width: 5.14rem;
    height: 1.42rem;
    background: url(../assets/img/title/ribbon.png);
    background-size: 100% 100%;
    position: absolute;
    top: -0.8rem;
    left: 0.71rem;
    i {
      display: block;
      width: 5.14rem;
      height: 1.42rem;
      background: url(../assets/img/title/title_11.png);
      background-size: 100% 100%;
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
        background: url(../assets/img/Unselected.png);
        background-size: 100% 100%;
        margin-left: 0.5rem;
        &.act {
          background: url(../assets/img/Selected.png);
          background-size: 100% 100%;
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
      background: url(../assets/img/dice.png);
      background-size: 100% 100%;
    }
  }
  .singUpBtn {
    display: block;
    width: 3.76rem;
    height: 1rem;
    margin: 0.19rem auto;
    background: url(../assets/img/singUpBtn.png);
    background-size: 100% 100%;
    color: rgba(126, 46, 0, 1);
    font-size: 0.32rem;
    text-align: center;
    line-height: 0.85rem;
  }
}
</style>


