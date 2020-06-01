<template>
  <div class="box">
    <div class="header">
      <div class="goBox" :class="{top:isShare}">
        <span class="ruleTips" @click="goRule()">{{lang.rule}}</span>
        <span class="detail" @click="goDetail()">{{lang.detail}}</span>
        <!--  -->
        <span class="Invitation" @click="invi()" v-if="userMsg.user_flag != 0">{{lang.Invitation}}</span>
      </div>
      <span class="task" @click="goTaskHtml()" :class="{shake:shakeAni}" v-if="is_allow_version">
        <i class="taskNum">{{userMsg.invited_new}}</i>
        <strong>{{lang.taskTitle}}</strong>
      </span>
      <roolMsg :roolmsg="roolmsg"></roolMsg>
    </div>
    <cards />
    <act-footer></act-footer>
    <loading></loading>
    <div class="mask" v-show="showFillCode">
      <transition name="slide">
        <div class="reCode" v-show="showFillCode">
          <span class="title"></span>
          <i class="close" @click="closeFillCode()"></i>
          <p class="tips">{{lang.main1}}</p>
          <p class="codeTips">{{lang.main2}}</p>
          <div class="code">
            <input type="text" maxlength="6" v-model="userCode">
          </div>
          <i class="copy">{{lang.main3}}</i>
          <div class="paste" @click="past()" ref="past1">{{lang.main4}}</div>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="showLuckGift">
      <transition name="slide">
        <div class="luckGift" v-if="showLuckGift">
          <span class="title"></span>
          <i class="close" @click="closeLuck()"></i>
          <p class="luckTips">{{lang.main5}}</p>
          <div class="giftItem">
            <span v-for="(item,index) in giftArr" :key="index">
              <img :src="require(`../assets/img/gifts/ward${item.tid}.png`)" alt="">
              <strong>{{item.pname}}</strong>
            </span>
          </div>
          <span class="ok" @click="closeLuck()">{{lang.main6}}</span>
        </div>
      </transition>
    </div>
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
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
import roolMsg from "../components/RoolMsg"
import cards from "../components/Cards"
import { mapState } from "vuex"

export default {
  components: { Loading, MsgToast, ActFooter, cards, roolMsg },
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
      roolmsg: [],
      userCode: '',
      showFillCode: false,
      showLuckGift: false,
      giftArr: [],
      is_allow_version: null
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
  computed: {
    ...mapState(['my_record', 'userMsg', 'shakeAni']),
    taskNum() {
      return this.my_record.filter(x => {
        return x.tid == 8
      })
    }
  },
  methods: {
    judgeShare() {//判断是否为分享环境,请求相应的接口 
      this.isShare = getString('token') ? false : true
      this.$store.commit('changShareState', this.isShare) //分享状态
    },
    getDefaultData(val) { //初始化
      api.getDefault().then(res => {
        const { response_data, response_status } = res.data
        if (response_status.code == 0) {
          const { new_record, my_record, step, stime, etime, user_info, is_allow_version } = response_data
          this.roolmsg = new_record
          this.is_allow_version = is_allow_version.allow_lottery_pid20
          this.vux('changActStatus', step)
          this.vux('changUserMsg', user_info)
          this.vux('setMy_record', my_record)
          sessionStorage.setItem('time', JSON.stringify({
            stime: stime,
            etime: etime
          }))
        } else {
          this.tastMsg = response_status.error
          this.showT = true
        }
      })
    },
    invi() {
      globalBus.$emit('commonEvent', () => {
        if (this.userMsg.user_flag == 2) {
          this.tastMsg = this.lang.sucCode
          this.showT = true
        } else {
          this.showFillCode = true
        }
      })
    },
    past() {
      if (this.userCode == '') return
      api.verIfy(this.userCode).then(res => {
        const { response_data, response_status } = res.data
        if (response_status.code == 0) {
          this.showFillCode = false
          this.giftArr = response_data.prizes
          this.showLuckGift = true
        } else {
          this.tastMsg = response_status.error
          this.showT = true
        }
      })
    },
    goTaskHtml() {
      globalBus.$emit('commonEvent', () => {
        sessionStorage.setItem('taskList', JSON.stringify(this.taskNum))
        let regstr = getString('token')
        let uid = getString("uid")
        location.href = `./index3.html?token=${regstr}&uid=${uid}&v=2`
      })
    },
    downApp() {
      APP()
    },
    goRule() {
      let regstr = getString('token')
      location.href = `./index2.html?token=${regstr}&v=2`
    },
    goDetail() {
      let regstr = getString('token')
      let uid = getString("uid")
      location.href = `./index4.html?token=${regstr}&uid=${uid}&v=2`
    },
    refrsh() { //刷新
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      window.removeEventListener("scroll", this.onScroll)
      this.getDefaultData('ref')
    },
    closeToast() {
      this.showT = false
    },
    closeLuck() {
      this.showLuckGift = false
    },
    closeFillCode() {
      this.showFillCode = false
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
    height: 5.93rem;
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
      display: block;
      width: 1.8rem;
      height: 0.52rem;
      background: url(../assets/img/ruleTipsBg.png);
      background-size: 100% 100%;
      font-size: 0.22rem;
      color: #c36220;
      font-weight: bold;
      margin-top: 0.1rem;
      white-space: nowrap;
      text-align: center;
      line-height: 0.52rem;
      text-indent: 0.08rem;
    }
    .task {
      width: 2.15rem;
      height: 1.78rem;
      background: url(../assets/img/taskTips.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      bottom: 0.1rem;
      .taskNum {
        display: block;
        width: 0.45rem;
        height: 0.45rem;
        line-height: 0.45rem;
        border-radius: 50%;
        position: absolute;
        top: 0.6rem;
        right: 0.7rem;
        color: #ffd628;
      }
      strong {
        display: block;
        width: 1.8rem;
        font-size: 0.21rem;
        position: absolute;
        bottom: 0.23rem;
        left: 0.2rem;
        letter-spacing: 0.01px;
      }
    }
  }
  .guaBox {
    position: relative;
  }
}
.reCode {
  width: 6.21rem;
  height: 5.48rem;
  background: url(../assets/img/pup1.png);
  background-size: 100% 100%;
  position: absolute;
  left: 0.69rem;
  top: 4.2rem;
  text-align: center;
  .title {
    width: 5.49rem;
    height: 2.07rem;
    background: url(../assets/img/pupTitle.png);
    background-size: 100% 100%;
    position: absolute;
    left: 0.36rem;
    top: -2.07rem;
  }
  .close {
    display: block;
    width: 0.8rem;
    height: 0.8rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    top: -1rem;
  }
  .tips {
    padding: 0 0.25rem;
    height: 1rem;
    margin: 0.69rem 0 0.44rem;
    font-weight: bold;
    font-size: 0.36rem;
    text-align: center;
  }
  .codeTips {
    text-align: center;
    font-weight: bold;
    font-size: 0.36rem;
  }
  .code {
    width: 2.75rem;
    height: 0.81rem;
    background: rgba(196, 39, 131, 1);
    border-radius: 0.2rem;
    margin: 0.24rem auto 0;
    display: flex;
    align-items: center;
    justify-content: center;
    input {
      width: 2rem;
      height: 100%;
      background: none;
      outline: none;
      border: none;
      color: #fffaa8;
      font-size: 0.42rem;
      text-align: center;
    }
  }
  .copy {
    text-align: center;
    font-size: 0.22rem;
    color: #ffdea3;
  }
  .paste {
    width: 2.83rem;
    height: 0.8rem;
    background: url(../assets/img/goVip.png);
    background-size: 100% 100%;
    text-align: center;
    color: #ae4800;
    font-weight: bold;
    font-size: 0.36rem;
    line-height: 0.8rem;
    margin: 0.43rem auto 0;
  }
}
.luckGift {
  width: 6.21rem;
  height: 5.48rem;
  background: url(../assets/img/pup1.png);
  background-size: 100% 100%;
  position: absolute;
  left: 0.69rem;
  top: 4.2rem;
  .title {
    width: 5.49rem;
    height: 2.07rem;
    background: url(../assets/img/pupTitle.png);
    background-size: 100% 100%;
    position: absolute;
    left: 0.36rem;
    top: -2.07rem;
  }
  .close {
    display: block;
    width: 0.8rem;
    height: 0.8rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    top: -1rem;
  }
  .luckTips {
    padding: 0 0.2rem;
    font-size: 0.36rem;
    font-weight: bold;
    margin: 0.65rem auto 0.3rem;
    text-align: center;
  }
  .giftItem {
    padding: 0 0.36rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      width: 1.6rem;
      height: 1.6rem;
      background: url(../assets/img/giftBg.png);
      background-size: 100% 100%;
      img {
        width: 1.2rem;
        height: 1.2rem;
        display: block;
        margin: 0.21rem auto;
      }
    }
    strong {
      font-weight: bold;
      font-size: 0.24rem;
      color: #ffe6ce;
      display: block;
      text-align: center;
    }
  }
  .ok {
    display: block;
    width: 2.43rem;
    height: 0.8rem;
    background: url(../assets/img/goVip.png);
    background-size: 100% 100%;
    color: #ae4800;
    font-size: 0.34rem;
    text-align: center;
    line-height: 0.8rem;
    position: absolute;
    left: 1.86rem;
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
  z-index: 100;
}
#circlebox {
  // width: 2rem;
  // height: 2rem;
  // background-color: red;
  // position: fixed;
}
</style>


