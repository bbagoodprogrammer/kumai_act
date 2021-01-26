<template>
  <div class="box">
    <RoolMsg />
    <!-- <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div> -->
    <div class="header">
      <div class="house" :class="{easy: !reg ||  easy.less.length > 1}">
        <div class="userTitle">
          <p v-if="!reg">Gian hàng chưa khai trương <strong>Điểm:????</strong> </p>
          <div class="userHouers" v-else>
            <p>Gian hàng đồ ngọt của <em> {{nick}}</em></p>
            <strong>Điểm:{{score}}</strong>
          </div>
        </div>
        <div class="people"></div>
        <div class="sweetsStatus" v-if="reg && easy.less.length == 0">
          <p class="ok">Có nguyên liệu có thể tạo đồ ngọt, </p>
          <span class="scorllTop" @click="scorllTo()">mau tạo đồ đồ ngọt</span>
        </div>
        <div class="sweetsStatus" v-else-if="reg && easy.less.length == 1 ">
          <img :src="require(`../assets/img/sweets/creatIcon${easy.id}.png`)" alt="">
          <p class="less">Còn {{easy.less[0].count}} phần {{easy.less[0].name}} có thể chế biến {{easy.name}}</p>
        </div>
        <Box :nick="nick" />
      </div>
      <div class="wards">
        <div class="title"></div>
        <i class="num num1" :class="'num' + index" v-for="(item,index) in raws" :key="index">{{item.count}}</i>
      </div>
      <div class="tipsBox">
        <span class="ruleTips1" @click="history()"></span>
        <span class="ruleTips2" @click="rule()"></span>
        <span class="ruleTips3" @click="rank()"></span>
      </div>
    </div>
    <List :nick="nick" ref="list" />
    <p class="actTips">Quyết định cuối dùng thuộc về Alochat</p>
    <!-- <act-footer></act-footer> -->
    <div class="mask" v-show="showRank">
      <transition name="slide">
        <Rank v-if="showRank" :omerMsg="omerMsg" />
      </transition>
    </div>
    <div class="mask" v-show="showRules">
      <transition name="slide">
        <Rules v-if="showRules" />
      </transition>
    </div>
    <div class="mask" v-show="showInviatPup">
      <transition name="slide">
        <div class="invitatCon" v-if="showInviatPup">
          <i class="close" @click="closeInviatPup()"></i>
          <ul class="pList">
            <li v-for="(item,index) in friends" :key="index" @click="inviteation(item.uid,index)">
              <!-- <div class="userRank">{{item.rank}}</div> -->
              <div class="lsitItem">
                <div class="imgBox">
                  <span class="avBg" v-if="item.rank<=3"></span>
                  <img v-lazy="item.avatar" alt="">
                </div>
                <div class="nick">
                  <div>{{item.nick}}</div>
                </div>
                <div class="shareBtn">
                  <i v-if="invitieIndex == index"> </i>
                </div>
              </div>
            </li>
          </ul>
          <p>Mời bạn bè tham gia, mời thành công 1 người tham gia sự kiện <i></i> 5 xuất</p>
          <div class="singUpBtn" @click="invitSingUp()"></div>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="showHistory">
      <transition name="slide">
        <GiftHistory v-if="showHistory" @closeHistory="closeHistory" />
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
import GiftHistory from "../components/GiftHistory"
import { mapState } from "vuex"
export default {
  components: { MsgToast, ActFooter, List, Box, RoolMsg, Rank, Rules, GiftHistory },
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
      showRank: false,
      showRules: false,
      nick: '',
      omerMsg: {},
      friends: [],
      showInviatPup: false,
      invitieIndex: 0,
      historyList: [],
      showHistory: false,
      easy: {
        less: []
      }
    }
  },
  created() {
    this.judgeShare()  //判断是否为分享环境,请求相应的接口 
    this.getDefaultData()
  },
  computed: {
    ...mapState(['raws', 'score', 'reg'])
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
          const { step, uid, reg, score, nick, packets, raws, desserts, friends, easy } = response_data
          this.vxc('setActStatus', step)
          this.vxc('setReg', reg)
          this.vxc('setUid', uid)
          this.friends = friends
          if (friends.length > 0 && !reg) {
            this.inUid = friends[0].uid
            this.showInviatPup = true
          } else if (!reg) {
            this.vxc('setSingUp')
          }
          this.vxc('setPackets', packets)
          this.vxc('setRaws', raws)
          this.vxc('setDesserts', desserts)
          this.vxc('setScore', score)
          this.vxc('setNick', nick)
          this.nick = nick
          if (easy) {
            this.easy = easy
          }
        } else {
          this.toast(response_status.error)
        }
      })
      api.getRoolMsg().then(res => {
        this.vxc('setRoolMsg', res.data.response_data.list)
      })
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
      api.getRank(0).then(res => {
        this.vxc('setRank', res.data.response_data.list)
        this.omerMsg = res.data.response_data.owner
        this.showRank = true
      })
    },
    history() {
      // api.getHistroy(0).then(res => {
      //   this.historyList = res.data.response_data.list
      this.showHistory = true
      // })
    },
    inviteation(uid, index) {
      this.inUid = uid
      this.invitieIndex = index
    },
    closeInviatPup() {
      this.showInviatPup = false
    },
    invitSingUp() {
      api.singUp(this.inUid).then(res => {
        if (res.data.response_status.code == 0) {
          this.showInviatPup = false
          this.vxc('setReg', true)
          this.toast('Gian hàng đồ ngọt của bạn đã khai trương!<br/>Mau chế biến đồ đồ ngọt')
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    rule() {
      this.showRules = true
    },
    closeHistory() {
      this.showHistory = false
    },
    scorllTo() {
      let a = this.$refs.list.$el.getBoundingClientRect().top
      let c = document.documentElement.scrollTop
      let e = a + c - 10
      this.timer = setInterval(() => {
        let c = document.documentElement.scrollTop
        let t = (e - c) / 10
        window.scrollTo(0, c + t)
        if (t < 8) {
          clearInterval(this.timer)
        }
      }, 10)
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
  // background: url(../assets/img/banner.png) center 0 no-repeat;
  // background-size: 100% auto;
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
    // height: 8.8rem;
    // padding-top: 1.49rem;
    position: relative;
    .house {
      width: 7.5rem;
      height: 8.52rem;
      background: url(../assets/img/houseBg2.png) no-repeat;
      background-size: 100% auto;
      margin: 0 auto 0;
      position: relative;
      &.easy {
        background: url(../assets/img/houseBg.png) no-repeat;
        background-size: 100% auto;
      }
      .userTitle {
        width: 4.5rem;
        height: 0.9rem;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 1.5rem;
        left: 1.5rem;
        text-align: center;
        text-shadow: RGBA(251, 150, 31, 1) 1px 0 0,
          RGBA(251, 150, 31, 1) 0 1px 0, RGBA(251, 150, 31, 1) -1px 0 0,
          RGBA(251, 150, 31, 1) 0 -1px 0;
        p {
          font-weight: 600;
        }
        strong {
          display: block;
          font-size: 0.22rem;
          font-weight: 600;
          margin-top: -0.05rem;
        }
        .userHouers {
          p {
            display: flex;
            align-items: center;
            justify-content: center;
            em {
              display: block;
              max-width: 2.3rem;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
      }
      .people {
        width: 3.4rem;
        height: 2.74rem;
        background: url(../assets/img/people.png);
        background-size: 100% 100%;
        position: absolute;
        top: 2.75rem;
        left: 1.1rem;
      }
      .sweetsStatus {
        width: 2.25rem;
        height: 2.35rem;
        position: absolute;
        right: 0.9rem;
        top: 3rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        img {
          width: 1rem;
          height: 1rem;
          margin-top: 0.15rem;
        }
        .ok {
          margin-top: 0.3rem;
          font-size: 0.26rem;
          font-weight: 500;
        }
        .less {
          margin-top: 0.05rem;
          font-size: 0.26rem;
          font-weight: 500;
        }
        .scorllTop {
          width: 1.86rem;
          height: 0.62rem;
          text-align: center;
          line-height: 0.62rem;
          background: url(../assets/img/creat2.png);
          background-size: 100% 100%;
          font-size: 0.24rem;
          color: rgba(114, 0, 91, 1);
          font-weight: 600;
          margin-top: 0.2rem;
        }
      }
    }
    .wards {
      width: 7.08rem;
      height: 2.91rem;
      background: url(../assets/img/wards.png);
      background-size: 100% 100%;
      position: relative;
      margin: -0.3rem auto;
      .title {
        width: 4.67rem;
        height: 1.22rem;
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
      z-index: 100;
      right: 0;
      top: 0.78rem;
      width: 1.54rem;
      span {
        display: block;
        float: right;
      }
      .ruleTips1 {
        width: 1.28rem;
        height: 0.4rem;
        background: url(../assets/img/tips1.png) no-repeat;
        background-size: 100% 100%;
      }
      .ruleTips2 {
        width: 2.24rem;
        height: 0.4rem;
        background: url(../assets/img/tips2.png) no-repeat;
        background-size: 100% 100%;
        margin: 0.1rem 0;
      }
      .ruleTips3 {
        width: 1.09rem;
        height: 0.4rem;
        background: url(../assets/img/tips3.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .guaBox {
    position: relative;
  }
  .invitatCon {
    width: 7.1rem;
    height: 9.55rem;
    background: url(../assets/img/inviationBg.png);
    background-size: 100% 100%;
    position: relative;
    padding-top: 1.67rem;
    .pList {
      height: 7.1rem;
      max-height: 7.1rem;
      overflow-y: scroll;
      .lsitItem {
        width: 6.37rem;
        display: flex;
        align-items: center;
        height: 1.21rem;
        margin: 0 auto;
        background: url(../assets/img/listItembg.png);
        background-size: 100% 100%;
        margin-bottom: 0.1rem;
        .userRank {
          width: 0.6rem;
          margin-left: 0.14rem;
          text-align: center;
          font-weight: 800;
        }
        .imgBox {
          width: 0.95rem;
          height: 0.94rem;
          margin-left: 0.15rem;
          position: relative;
          .avBg {
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
          }
          img {
            display: block;
            width: 0.8rem;
            height: 0.8rem;
            margin: 0.07rem 0 0 0.06rem;
            border-radius: 50%;
          }
        }
        .nick {
          width: 3rem;
          max-width: 3rem;
          overflow: hidden;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          .tips {
            font-size: 0.24rem;
          }
        }
        .shareBtn {
          width: 0.48rem;
          height: 0.48rem;
          background: url(../assets/img/yesBg.png);
          background-size: 100% 100%;
          margin-left: 1.3rem;
          position: relative;
          i {
            display: block;
            width: 0.4rem;
            height: 0.4rem;
            background: url(../assets/img/yes.png);
            background-size: 100% 100%;
            position: absolute;
            left: 0.04rem;
            top: 0.04rem;
          }
        }
      }
    }
    > p {
      text-align: center;
      color: rgba(233, 140, 86, 1);
      i {
        display: inline-block;
        width: 0.3rem;
        height: 0.3rem;
        background: url(../assets/img/gift/giftIcon2.png);
        background-size: 100% 100%;
      }
    }
    .singUpBtn {
      width: 3.98rem;
      height: 0.86rem;
      background: url(../assets/img/singUpBtn2.png);
      background-size: 100% 100%;
      margin: 0.37rem auto 0;
    }
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


