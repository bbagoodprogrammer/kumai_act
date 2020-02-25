<template>
  <div class="footerBar">
    <div class="acrStatus" :class="{singUped:singUpState}">
      <span class="noAct" v-if="astState === 0">活動未開始</span>
      <span class="noAct" v-if="astState === 2">活動已結束</span>
      <span class="goAct" v-if="astState === 1" @click="singUp()"></span>
      <div class="actIng" v-if="astState === 3">
        <div class="rank">
          離榜首還有 {{owner_msg.rank - 1}}位
        </div>
        <img v-lazy="owner_msg.avatar" alt="" class="avatar" @click="goUser(owner_msg.uid)">
        <div class="userMsg">
          <div class="name">{{owner_msg.nick}}</div>
          <div class="ming">{{owner_msg.sign}}</div>
        </div>
        <div class="score">
          <strong>金幣魅力值</strong>
          <em>{{owner_msg.score}}</em>
        </div>
        <div class="goBtn" @click="goHtml(owner_msg.rid)">馬上開播</div>
      </div>
    </div>
    <div class="mask" v-show="showT">
      <transition name="slide">
        <msg-toast :tastTitle="tastTitle" :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import api from "../api/apiConfig"
import getDate from "../utils/getDate"
import MsgToast from "../components/commonToast"
import { globalBus } from '../utils/eventBus'
export default {
  components: { MsgToast },
  data() {
    return {
      tastTitle: '',
      tastMsg: '',
      showT: false
    }
  },
  computed: {
    ...mapState(['actStatus', 'owner_msg', "isShare"]),
    astState() {
      if (this.actStatus === 0) { //活动未开始
        return 0
      } else if (this.actStatus === 2) { //活动已结束
        return 2
      } else if (this.owner_msg.is_reg == 0 || this.isShare) { //活动开始未报名，或者分享
        return 1
      } else if (this.owner_msg.is_reg == 1) { //活动开始已报名
        return 3
      }
    },
    singUpState() {
      return this.owner_msg.is_reg == 1 ? true : false
    },
    couldSingUp() {
      return Math.floor((Date.parse(new Date()) - this.owner_msg.regtime * 1000) / (24 * 3600 * 1000)) < 60
    }
  },
  methods: {
    singUp() {
      globalBus.$emit('commonEvent', () => {
        if (this.couldSingUp) {
          api.singUp().then(res => {
            const { response_status, response_data } = res.data
            if (response_status.code == 0) {
              this.$store.commit('setSingUp', response_data.owner_msg)
              this.showT = true
              this.tastTitle = `報名成功`
              this.tastMsg = `馬上開播,收穫粉絲和魅力</br>秀魅力絕對紅`
            } else {
              this.showT = true
              this.tastTitle = `報名失敗`
              this.tastMsg = response_status.error
            }
          })
        } else {  //超过60天
          this.showT = true
          this.tastTitle = `報名失敗`
          this.tastMsg = `本活動僅限註冊少於60天的玩家參與哦~`
        }
      })
    },
    goHtml(rid) {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      if (rid != 0) {
        if (isiOS) {
          sendJsData('app://room?rid=' + rid);
        } else {
          javascript: JSInterface.sendJsData('app://room?rid=' + rid);
        }
      } else {  //创建房间页
        location.href = `goto:{"controller":"com.utalk.hsing.activity.CreateRoomEditActivity"}`
        // this.showT = true
        // this.tastMsg = `你還沒創建自己的房間哦(,,•﹏•,,) </br>請到廣場點擊右上方創建房間`
      }
    },
    goUser(uid) {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      if (isiOS) {
        sendJsData('app://userInfo?uid=' + uid);
      } else {
        javascript: JSInterface.sendJsData('app://userInfo?uid=' + uid);
      }
    },
    closeToast() {
      this.showT = false
    }
  }
}
</script>
<style lang="scss">
.footerBar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  .acrStatus {
    width: 7.5rem;
    height: 1.53rem;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(../assets/img/footerSing.png) no-repeat;
    background-size: 100% 100%;
    &.singUped {
      background: url(../assets/img/singUped.png) no-repeat;
      background-size: 100% 100%;
    }
    span {
      display: inline-block;
      &.noAct {
        font-size: 0.36rem;
        color: #9b3022;
        font-weight: 700;
      }
      &.goAct {
        width: 3.05rem;
        height: 0.86rem;
        background: url(../assets/img/singUpBtn.png);
        background-size: 100% 100%;
      }
    }
    .actIng {
      width: 7.5rem;
      height: 1.53rem;
      display: flex;
      align-items: center;
      .rank {
        width: 1.2rem;
        height: 0.67rem;
        text-align: center;
        margin: 0 0.13rem 0 0.11rem;
        font-weight: bold;
        font-size: 0.22rem;
        color: rgba(155, 48, 34, 1);
      }
      .avatar {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        border: 0.03rem solid #fffff8;
      }
      .userMsg {
        width: 1.4rem;
        margin-left: 0.14rem;
        .name {
          color: #9b3022;
          max-width: 1.4rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ming {
          color: #844c1a;
          font-size: 0.24rem;
          margin-top: 0.05rem;
          max-width: 1.4rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .score {
        font-size: 0.28rem;
        text-align: center;
        margin-left: 0.28rem;
        strong {
          display: block;
          color: #9f1954;
        }
        em {
          color: #fff99d;
        }
      }
      .goBtn {
        width: 1.31rem;
        height: 0.67rem;
        background: url(../assets/img/goBtn.png);
        background-size: 100% 100%;
        text-align: center;
        white-space: nowrap;
        line-height: 0.67rem;
        font-size: 0.22rem;
        color: #ffeaa9;
        margin-left: 0.21rem;
      }
      &.rank2 {
        background: url(../assets/img/rank2.png);
        background-size: 100% 100%;
        .rank {
          text-indent: -999rem;
          background: url(../assets/img/no2.png);
          background-size: 100% 100%;
        }
      }
      &.rank3 {
        background: url(../assets/img/rank3.png);
        background-size: 100% 100%;
        .rank {
          text-indent: -999rem;
          background: url(../assets/img/no3.png);
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>
