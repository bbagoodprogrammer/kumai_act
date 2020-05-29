<template>
  <div class="box">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <div class="tipsBox" :class="{top:isShare}">
        <span class="ruleTips" :class="{top:isShare}" @click="showRules()">{{lang.rules}}</span>
        <span class="ruleTips" :class="{top:isShare}" @click="goBar()" v-if="is_admin">{{lang.myAct}}</span>
      </div>
      <div class="actTitle"></div>
    </div>
    <Actlist />
    <act-footer></act-footer>
    <div class="mask" v-show="showRule">
      <transition name="slide">
        <div class="rules" v-if="showRule">
          <i class="close" @click="closeRule()"></i>
          <div class="type1" v-if="is_admin">
            <h6>申請開趴攻略：</h6>
            <p>1、K房房主及管理員可申請開趴，點擊【申請開趴】按鈕並完整填寫開趴申請表即可，需在活動開始前5-30天內提交申請，每次活動時長限定1-3小時之間，每個K房每月最多申請舉辦4次活動</p>
            <p>2、如活動需要歌友提前報名作為演唱嘉賓請選擇【需要報名】，報名詳情可在【我的趴踢】查看，可快捷聯絡報名歡友</p>
            <p>3、成功提交申請後請耐心等待官方審核結果，具體情況可點擊【我的趴踢】查看</p>
            <p>4、在【我的趴踢】中點擊修改方案可對未審核及審核未通過的方案進行修改，已審核通過的方案不可修改</p>
            <p>5、方案審核未通過可重新修改提交一次，再次提交未通過不可進行修改</p>
            <h6>圍觀轟趴攻略：</h6>
            <p>1、K房房主及管理員可申請開趴</p>
            <p>2、點擊關注活動後可在活動開始前5分鐘收到活動消息提醒，精彩趴踢不錯過</p>
            <p>3、具有報名功能的活動可點擊報名後填寫並提交報名申請，活動發起人會聯絡告知你報名結果，報名成功即可參與活動</p>
            <p>4、多分享、多關注可吸引更多歌友一起轟趴</p>
            <p>5、具體活動內容由發起人確定，與官方無關，活動中存在疑問可咨詢對應活動發起人</p>
            <p class="lastTips">K房狂歡趴活動解釋權歸主辦方所有</p>
          </div>
          <div class="type2" v-else>
            <h6>圍觀轟趴攻略</h6>
            <p>1、點擊關注活動後可在活動開始前5分鐘收到活動消息提醒，精彩趴踢不錯過</p>
            <p>2、具有報名功能的活動可點擊報名後填寫並提交報名申請，活動發起人會聯絡告知你報名結果，報名成功即可參與活動</p>
            <p>3、多分享、多關注可吸引更多歌友一起轟趴</p>
            <p>4、具體活動內容由發起人確定，與官方無關，活動中存在疑問可咨詢對應活動發起人</p>
            <p class="lastTips">K房狂歡趴活動解釋權歸主辦方所有</p>
          </div>
        </div>
      </transition>
    </div>
    <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}"></div>
    <div class="goTop" @click="scorllGO()"></div>
  </div>
</template>

<script>

import getString from "../utils/getString"
import APP from "../utils/openApp"
import api from "../api/apiConfig"
import ActFooter from "../components/ActFooter"
import MsgToast from "../components/commonToast"
import { globalBus } from '../utils/eventBus'
import Actlist from "../components/Actlist"
import { fail } from 'assert';
export default {
  components: { MsgToast, ActFooter, Actlist },
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
      is_admin: null
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
          const { is_admin, list } = response_data
          this.is_admin = is_admin
          this.vxc('setActStatus', 1)
          this.vxc('setIs_admin', is_admin)
          this.vxc('setList', list)
        } else {
          this.toast(response_status.error)
        }
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
    goBar() {
      let regstr = getString('token')
      location.href = `./index3.html?token=${regstr}`
    },
    showRules() {
      this.showRule = true
    },
    closeRule() {
      this.showRule = false
    },
    scorllGO() {
      this.timer = setInterval(() => {
        var scorllTop = document.documentElement.scrollTop || document.body.scrollTop
        var step = scorllTop / 10
        window.scrollTo(0, scorllTop - step)
        if (scorllTop < 1) {//速度小于3或者滚动条到底了
          clearInterval(this.timer)
        }
      }, 10)
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
  background: #5b16ba url(../assets/img/banner.png) center 0 no-repeat;
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
    height: 5.1rem;
    position: relative;
    .tipsBox {
      position: absolute;
      right: 0;
      top: 0.12rem;
      &.top {
        top: 1.5rem;
      }
      .ruleTips {
        display: block;
        width: 1.42rem;
        height: 0.53rem;
        background: url(../assets/img/ruleTips.png);
        background-size: 100% 100%;
        text-align: center;
        line-height: 0.53rem;
        font-size: 0.26rem;
        text-indent: 0.15rem;
        margin-bottom: 0.11rem;
      }
    }
    .actTitle {
      width: 3.04rem;
      height: 0.39rem;
      background: url(../assets/img/actTitleTips.png);
      background-size: 100% 100%;
      position: absolute;
      bottom: 0.16rem;
      left: 2.23rem;
    }
  }
  .guaBox {
    position: relative;
  }
  .rules {
    width: 5.32rem;
    padding: 0 0.29rem 0.26rem;
    background: rgba(104, 30, 181, 1);
    border-radius: 0.4rem;
    position: relative;
    .close {
      display: block;
      width: 0.58rem;
      height: 0.58rem;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      top: -0.7rem;
    }
    h6 {
      font-size: 0.26rem;
      margin: 0.24rem 0 0.14rem;
    }
    p {
      font-size: 0.24rem;
      color: #bffffe;
    }
    .lastTips {
      text-align: center;
      font-size: 0.24rem;
      color: #a884d8;
      margin-top: 0.28rem;
    }
  }
}
.goTop {
  display: block;
  width: 0.94rem;
  height: 0.94rem;
  position: fixed;
  right: 0.08rem;
  bottom: 1.35rem;
  background: url(../assets/img/goTop.png) no-repeat;
  background-size: contain;
  z-index: 1000;
}
.refresh {
  display: block;
  width: 0.94rem;
  height: 0.94rem;
  position: fixed;
  left: 0.08rem;
  bottom: 1.35rem;
  background: url(../assets/img/refresh.png) no-repeat;
  background-size: contain;
  transition: transform 1s;
  z-index: 1000;
}
</style>


