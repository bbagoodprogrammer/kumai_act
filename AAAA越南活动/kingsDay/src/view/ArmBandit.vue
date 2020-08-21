<template>
  <div class="box" :style="{backgroundImage: 'url(' + banner + ')', backgroundSize:'100% auto',backgroundRepeat:'no-repeat'}">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <div class="goBox">
        <span class="ruleTips" :class="{top:isShare}" @click="goRule()">{{lang.rule}}</span>
        <span class="history" @click="goHistory()">{{lang.history}}</span>
      </div>
    </div>
    <gift-con></gift-con>
    <act-footer></act-footer>
    <!-- 规则弹窗 -->
    <div class="mask" v-show="showRule">
      <transition name="slide">
        <div class="rule" v-show="showRule">
          <i class="close" @click="closeRule()"></i>
          <h3>{{lang.rule}}</h3>
          <p><i>1</i><strong>{{lang.rule1}}</strong></p>
          <p><i class="mag">2</i><strong>{{lang.rule2}}</strong></p>
          <p><i class="mag3">3</i><strong>{{lang.rule3}}</strong></p>
          <p><i class="mag3">4</i><strong>{{lang.rule4}}</strong></p>
        </div>
      </transition>
    </div>
    <loading></loading>
    <div class="mask" v-show="showT">
      <transition name="slide">
        <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
      </transition>
    </div>
    <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}"></div>
  </div>
</template>

<script>

import getString from "../utils/getString"
import APP from "../utils/openApp"
import api from "../api/apiConfig"
import Loading from "../components/Loading"
import ActFooter from "../components/ActFooter"
import MsgToast from "../components/commonToast"
import { globalBus } from '../utils/eventBus'
import GiftCon from "../components/GiftCon"
export default {
  components: { Loading, MsgToast, ActFooter, GiftCon },
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
      showRule: false,
      banner: '',
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
      this.$store.commit('changShareState', this.isShare) //分享状态
    },
    getDefaultData(val) { //初始化
      api.getDefault().then(res => {
        const { response_status, response_data } = res.data
        if (response_status.code == 0) {
          const { user_info, act_info, mission_status, exchange_status, current_date, date_line, top_mission, missions } = response_data
          document.title = act_info.subject
          this.banner = act_info.images.banner
          this.vxc('changActStatus', act_info.step)
          this.vxc('setUser_info', user_info)
          this.vxc('setAct_info', act_info)
          this.vxc('setMission_status', mission_status)
          this.vxc('setExchange_status', exchange_status)
          this.vxc('setCurrent_date', current_date)
          this.vxc('setDate_line', date_line)
          // this.vxc('setTop_mission',top_mission)
          // this.vxc('setMissions',missions)
          let nowDayIndex = null
          date_line.forEach((element, index) => {
            if (element == current_date) {
              nowDayIndex = index
            }
            this.vxc('setCurrent_index', nowDayIndex)
            this.vxc('setTab_index', nowDayIndex)  //初始化选中的tab
            if (nowDayIndex != undefined) {
              this.vxc('updateRankGroups', {
                key: nowDayIndex,
                top_mission: top_mission,
                missions: missions,
                loading: false,
              })
            }
          });
        } else {
          this.tastMsg = response_data.error
          this.showT = true
        }
      })
    },
    downApp() {
      APP()
    },
    goRule() {
      this.showRule = true
    },
    closeRule() {
      this.showRule = false
    },
    goHistory() {
      let token = getString('token')
      let uid = getString('uid')
      location.href = `./index3.html?token=${token}&uid=${uid}`
    },
    refrsh(s) { //刷新
      if (!s) {
        this.rotatePx = 540 * ++this.rotatec  //旋转动画
      }
      window.removeEventListener("scroll", this.onScroll)
      this.getDefaultData('ref')
    },
    closeToast() {
      this.showT = false
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
  // background: #dd5e5e url(../assets/img/banner.png) center 0 no-repeat;
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
    height: 7.27rem;
    position: relative;
    .goBox {
      position: absolute;
      right: 0;
      top: 0.17rem;
      &.top {
        top: 1.5rem;
      }
    }
    span {
      width: 1.6rem;
      height: 0.65rem;
      display: block;
      background: url(../assets/img/tipsBg.png);
      background-size: 100% 100%;
      text-align: center;
      font-weight: 600;
      font-size: 0.24rem;
      line-height: 0.65rem;
      text-indent: 0.1rem;
    }
    .ruleTips {
    }
    .history {
      margin-top: 0.09rem;
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
  right: 0.08rem;
  bottom: 1.35rem;
  background: url(../assets/img/refresh.png) no-repeat;
  background-size: contain;
  transition: transform 1s;
  z-index: 10;
}
.rule {
  width: 5.37rem;
  height: 4.3rem;
  background: url(../assets/img/ruleBg.png);
  background-size: 100% 100%;
  position: absolute;
  left: 1.06rem;
  top: 4rem;
  .close {
    display: block;
    width: 1.03rem;
    height: 1.05rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: -0.25rem;
    top: -0.4rem;
  }
  h3 {
    font-size: 0.36rem;
    text-align: center;
    font-weight: 700;
    margin: 0.35rem 0 0.1rem;
  }
  p {
    padding: 0 0.25rem 0 0.67rem;
    margin-top: 0.1rem;
    position: relative;
    i {
      display: inline-block;
      width: 0.3rem;
      height: 0.3rem;
      background: url(../assets/img/numTips.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.3rem;
      font-weight: 700;
      position: absolute;
      left: 0.25rem;
      top: 0.05rem;
    }
    strong {
      width: 4.6rem;
      display: inline-block;
      font-size: 0.24rem;
      color: #fffab1;
      font-weight: 500;
    }
    .mag {
      margin-top: 0.02rem;
    }
    .mag3 {
      margin-top: -0.03rem;
    }
  }
}
</style>


