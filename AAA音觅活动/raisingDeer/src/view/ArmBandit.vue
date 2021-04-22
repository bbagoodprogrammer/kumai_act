<template>
  <div class="box">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <span class="ruleTips" @click="goRule()"></span>
      <div class="history" @click="showHistoryPup()"></div>
      <Lottie />
      <bar />
      <p class="barTipsMsg"> <i></i> 點擊梅花鹿可查看升級獎勵</p>
    </div>
    <LandBox />
    <rank ref="rank" />
    <!-- 规则 -->
    <div class="mask" v-show="showRules">
      <transition name="slide">
        <rules v-show="showRules" @closeRule="closeRule" />
      </transition>
    </div>
    <!-- 历史 -->
    <div class="mask" v-show="showHistory">
      <transition name="slide">
        <giftHistory v-if="showHistory" @closeHistory="closeHistory" />
      </transition>
    </div>
    <!-- 领取鹿宝宝 -->
    <div class="mask" v-show="getDeer">
      <transition name="slide">
        <div class="getDeerPup" v-show="getDeer">
          <i class="close" @click="closeGetDeer()"></i>
          <img src="../assets/img/firstDeer.png" alt="" class="fidstDeer">
          <div class="title"></div>
          <p class="firstTips">每天領水瓶種食物，養成梅花鹿， </br>獲得限量勛章、限量禮物。</p>
          <div class="giftBox">
            <span v-for="(item,index) in firstGiftArr" :key="index" class="giftItem">
              <img :src="item.img" alt="">
              <strong v-html="item.msg"></strong>
            </span>
          </div>
          <div class="getBtn" @click="singUp()"></div>
        </div>
      </transition>
    </div>
    <!-- 受邀請頁面 -->
    <div class="mask" v-show="friendInivaList">
      <transition>
        <FriendInivat v-if="friendInivaList" :invite_users="invite_users" @closeFriendList="closeFriendList" />
      </transition>
    </div>
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
import LandBox from "../components/LandBox"
import Bar from "../components/bar"
import Rank from "../components/Rank"
import Lottie from "../components/Lottie"
import Rules from "../components/Rules"
import GiftHistory from "../components/GiftHistory"
import FriendInivat from "../components/FriendInivat"
import { mapState } from "vuex"


export default {
  components: { MsgToast, ActFooter, LandBox, Bar, Rank, Lottie, Rules, GiftHistory, FriendInivat },
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
      showRules: false,
      showHistory: false,
      getDeer: false,
      firstGiftArr: [
        {
          img: require('../assets/img/firstDeer4.png'),
          msg: '天籟之音鹿<br>(背包禮物)'
        },
        {
          img: require('../assets/img/firstDeer3.png'),
          msg: '桃花旺旺鹿<br>(背包禮物)'
        },
        {
          img: require('../assets/img/firstCar.png'),
          msg: '深林見鹿蹤<br>(特效禮物)'
        }
      ],
      friendInivaList: false,
      invite_users: []
    }
  },
  created () {
    //this.judgeShare()  //判断是否为分享环境,请求相应的接口 
    this.getDefaultData()
  },
  computed: {
    ...mapState(['userMsg', 'lvArr']),
    userLv () {
      for (let i = this.lvArr.length; i >= 0; i--) {
        if (this.userMsg.deer_exp >= this.lvArr[i]) {
          return i + 1
        }
      }
      return this.userMsg.deer_level
    }
  },
  methods: {
    getDefaultData (val) { //初始化
      api.getDefault().then(res => {
        const { response_status, response_data } = res.data
        if (response_status.code == 0) {
          const { step, land_infos, level_conf, rank, user_info, invite_users } = response_data
          this.vxc('setActStatus', step)
          this.vxc('setLvArr', level_conf)
          this.vxc('setLandInfo', land_infos)
          this.vxc('setUserMsg', user_info)
          this.vxc('setRank', rank)
          console.log(this.userLv)
          this.vxc('updatAniImg', this.userLv)
          this.invite_users = invite_users
          if (!user_info.registered && invite_users.length) {
            this.invite_users = invite_users
            this.friendInivaList = true
          } else if (!user_info.registered && invite_users.length == 0) {
            this.getDeer = true
          }
        } else {
          this.toast(response_status.error)
        }
      })
    },

    singUp (uid) {
      globalBus.$emit('commonEvent', () => {
        api.singUp(uid).then(res => {
          const { response_status, response_data } = res.data
          if (response_status.code == 0) {
            const { user_info, land_infos } = response_data
            this.vxc('setUserMsg', user_info)
            this.vxc('setLandInfo', land_infos)
            this.vxc('setToast', {
              msg: `領取水瓶，為鹿寶寶種食物吧！`,
              title: require('../assets/img/pupImg/getDeerSuc.png'),
            })
            // this.vxc('updateLandInfo', {
            //   id: 1,
            //   status: 2,
            // })
            // this.vxc('pushRank', user_info)
            this.getDeer = false
            this.friendInivaList = false
          } else {
            this.toast(response_status.error)
          }
        })
      })
    },
    downApp () {
      APP()
    },
    goRule () {
      this.showRules = true
    },
    showHistoryPup () {
      this.showHistory = true
    },
    refrsh () { //刷新
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      // window.removeEventListener("scroll", this.onScroll)
      this.$refs.rank.loaded = false
      this.getDefaultData('ref')
    },
    closeRule () {
      this.showRules = false
    },
    closeHistory () {
      this.showHistory = false
    },
    closeGetDeer () {
      this.getDeer = false
    },
    closeFriendList () {
      this.friendInivaList = false
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
  padding-bottom: 2rem;
  overflow-x: hidden;
  position: relative;
  margin: auto;
  background: #9bd135 url(../assets/img/banner.png) center 0 no-repeat;
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
      background: url(../assets/img/share_bar.jpg) no-repeat;
      background-size: 100% 100%;
    }
  }
  .header {
    height: 10.67rem;
    position: relative;
    .ruleTips {
      width: 1.88rem;
      height: 0.61rem;
      background: url(../assets/img/ruleTips.png);
      background-size: 100% 100%;
      position: absolute;
      right: -0.4rem;
      top: 3.39rem;
    }
    .history {
      width: 0.99rem;
      height: 0.85rem;
      background: url(../assets/img/history.png);
      background-size: 100% 100%;
      position: absolute;
      top: 4.44rem;
      right: 0.05rem;
    }
    .barTipsMsg {
      width: 7.5rem;
      display: flex;
      text-align: center;
      align-items: center;
      justify-content: center;
      color: #48850f;
      font-weight: bold;
      font-size: 0.22rem;
      position: absolute;
      bottom: 0.15rem;
      i {
        display: block;
        width: 0.22rem;
        height: 0.22rem;
        background: url(../assets/img/jiao.png);
        background-size: 100% 100%;
        margin-right: 0.08rem;
      }
    }
  }
  .guaBox {
    position: relative;
  }
  .getDeerPup {
    width: 5.94rem;
    height: 9.6rem;
    padding: 0 0.23rem;
    background: rgba(226, 255, 194, 1);
    border: 0.04rem solid rgba(202, 255, 148, 1);
    border-radius: 0.1rem;
    position: absolute;
    left: 0.51rem;
    top: 0.7rem;
    .close {
      display: block;
      width: 0.32rem;
      height: 0.32rem;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0.25rem;
      top: 0.25rem;
    }
    .fidstDeer {
      width: 3.99rem;
      height: 3.94rem;
      display: block;
      margin: 0.05rem auto 0;
    }
    .title {
      width: 4.73rem;
      height: 0.49rem;
      background: url(../assets/img/firstDeerTitle.png);
      background-size: 100% 100%;
      margin: -0.1rem auto 0;
    }
    .firstTips {
      color: #5f962d;
      font-weight: 500;
      line-height: 0.45rem;
      margin: 0.39rem auto 0.42rem;
      text-align: center;
    }
    .giftBox {
      display: flex;
      justify-content: space-between;
      .giftItem {
        flex: 1;
        img {
          width: 1.15rem;
          height: 1.15rem;
          display: block;
          margin: 0 auto;
        }
        strong {
          display: block;
          font-size: 0.24rem;
          color: #3b7108;
          font-weight: bold;
          text-align: center;
          margin-top: 0.2rem;
        }
      }
    }
    .getBtn {
      width: 4.18rem;
      height: 1.02rem;
      background: url(../assets/img/getDeerBtn.png);
      background-size: 100% 100%;
      margin: 0.18rem auto 0;
    }
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


