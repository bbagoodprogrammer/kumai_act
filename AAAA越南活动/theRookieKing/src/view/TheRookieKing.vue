<template>
  <div class="box">
    <!-- <div class="tabs">
      <a href="" :class="{active:showCom =='DayList'}" @click.prevent="changShowCom('DayList')">日榜</a>
      <a href="" :class="{active:showCom =='TotalList'}" @click.prevent="changShowCom('TotalList')">總榜</a>
    </div>
    <component :is="showCom"></component> -->
    <div class="header">
      <a href="./index2.html" class="rules">Thể lệ&Thưởng</a>
      <a href="" class="history" @click.prevent="godebutList()">BXH Debut</a>
      <a href="" class="share" @click.prevent="goShare()" v-if="isShare"></a>
    </div>
    <div class="wards">
      <div class="wardsTitle"></div>
      <div class="wardsItem">
        <div>
          <img src="../assets/img/wardsBg.png" alt="" class="imgBg">
          <img src="../assets/img/badge_06.png" alt="" class="imgB2">
          <span>Quý tộc</br>Hoàng Đế</span>
        </div>
        <div>
          <img src="../assets/img/wardsBg.png" alt="" class="imgBg">
          <img src="../assets/img/newKing.png" alt="" class="imgB2">
          <span>Huy chương</br>Tân Vương</span>
        </div>
        <div>
          <img src="../assets/img/wardsBg.png" alt="" class="imgBg">
          <img src="../assets/img/coin.png" alt="" class="imgB2">
          <span>Vô số Xu</span>
        </div>
        <div>
          <img src="../assets/img/wardsBg.png" alt="" class="imgBg">
          <img src="../assets/img/beans.png" alt="" class="imgB2">
          <span>Vô số Đậu</span>
        </div>
      </div>
    </div>
    <div class="listRules">
      <p class="listRulesTitle">
        <em class="leftBg"></em>
        Thể lệ xếp hạng
        <em class="rightBg"></em>
      </p>
      <p class="listMsg">
        Điểm BXH = tổng mị lực đậu + mị lực xu mà thí sinh nhận được tại phòng Kara trong thời gian sự kiện (bao gồm quà trong Túi phòng Kara)
      </p>
    </div>
    <TabsScrollLoadList></TabsScrollLoadList>
    <act-footer></act-footer>
    <loading></loading>
    <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-if="showT"></msg-toast>
    <!-- <a href="" class="refresh" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}" v-show="activite!= 0 && !isShare"></a> -->
  </div>
</template>

<script>

import getString from "../utils/getString.js"
import api from "../api/apiConfig.js"
import Loading from "../components/Loading.vue"
import MsgToast from "../components/commonToast.vue"
import APP from "../utils/openApp.js"
import ActFooter from "../components/footer"
import TabsScrollLoadList from "../components/TabsScrollLoadList"
export default {
  components: { Loading, MsgToast, ActFooter, TabsScrollLoadList },
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
      showCom: 'DayList'
    }
  },
  created() {
    this.judgeShare()  //判断是否为分享环境,请求相应的接口 
    this.getDefaultData(0)
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  methods: {
    judgeShare() {//判断是否为分享环境,请求相应的接口 
      let regstr = getString('token')
      if (regstr) {
        this.isShare = false
      } else {
        this.isShare = true
      }
      this.$store.commit('changShareState', this.isShare) //分享状态
    },
    getDefaultData(val) { //初始化
      api.getDefault(0).then((res) => {
        const { response_data, response_status } = res.data
        if (response_status.code == 20000) { //活動未開始
          this.activite = 0
          this.$store.commit("changactiveityState", this.activite)
        } else if (response_status && response_status.code == 0) {  // 拆分存入數據
          const { step, days_count, current_day, day_down_time, total_down_time, rank, owner_info } = response_data
          this.$store.commit("changactiveityState", step)
          this.$store.commit("changNowDay", current_day)  //當前天
          this.$store.commit("changTotalDay", days_count) //当前期活动总天数
          this.$store.commit("changday_down_time", day_down_time)  //當天剩餘時間
          this.$store.commit("changtotal_down_time", total_down_time) //總榜剩餘時間
          this.$store.commit("changSetInited", 1)  //是否初始化頁面
          this.$store.commit('updateRankGroups', { //当前日榜信息
            key: current_day,
            loadCount: 0,
            loadEnd: rank < 20,
            loading: false,
            none: false,
            list: rank,
          })
          this.$store.commit("changTab", current_day)  //初始当天选择的
          this.$store.commit("changGroupsUserMsg", {//初始当前日榜个人信息
            key: current_day,
            msg: owner_info
          })
          if (owner_info) {
            this.$store.commit("changeisDebut", owner_info.upgraded)  //当前用户是否出道
          }
        }
      })
    },
    changShowCom(val) {
      this.showCom = val
    },
    onScroll() {
      if (this.isMore) {
        const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100
        if (scrollToBottom) { //加載更多
        }
      }
    },
    godebutList() {
      if (this.isShare) { //分享模式
        APP()
        return
      }
      location.href = `./index3.html`
    },
    goShare() {
      APP()
    },
    // refrsh() { //刷新
    //   this.showT = true
    //   this.rotatePx = 540 * ++this.rotatec  //旋转动画
    //   window.removeEventListener("scroll", this.onScroll)
    //   this.getDefaultData('ref')
    // },
    closeToast() {
      this.showT = false
    }
  }
}
</script>
<style lang='scss'>
body {
}
.box {
  max-width: 7.5rem;
  overflow-x: hidden;
  position: relative;
  margin: auto;
  background: #100c4c url(../assets/img/bigBg.png) center 0 no-repeat;
  background-size: 100% auto;
  .header {
    background: url(../assets/img/header.png) center 0 no-repeat;
    background-size: 100% 100%;
    height: 4.59rem;
    position: relative;
    .share {
      height: 1.2rem;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: url(../assets/img/share_bar.png);
      background-size: 100% 100%;
      z-index: 1000;
    }
    .rules {
      display: block;
      width: 1.94rem;
      height: 0.67rem;
      background: url(../assets/img/headerB.png);
      background-size: 100% 100%;
      position: absolute;
      top: 3.26rem;
      right: 0;
      font-size: 85%;
      color: #5437be;
      text-align: center;
      line-height: 0.67rem;
      padding-left: 0.2rem;
    }
    .history {
      display: block;
      width: 1.94rem;
      height: 0.67rem;
      background: url(../assets/img/headerB.png);
      background-size: 100% 100%;
      position: absolute;
      top: 4.14rem;
      right: 0;
      font-size: 85%;
      color: #5437be;
      text-align: center;
      line-height: 0.67rem;
      padding-left: 0.2rem;
    }
  }
  .wards {
    height: 3.7rem;
    .wardsTitle {
      width: 3.27rem;
      height: 0.95rem;
      background: url(../assets/img/wardsTitle.png);
      background-size: 100% 100%;
      margin: 0.06rem auto 0;
    }
    .wardsItem {
      display: flex;
      margin-top: 0.15rem;
      > div {
        width: 1.62rem;
        margin-left: 0.16rem;
        position: relative;
        img {
          width: 1.6rem;
          height: 1.6rem;
        }
        .imgBg {
          width: 1.98rem;
          height: 1.98rem;
        }
        .imgB2 {
          position: absolute;
          top: 0.19rem;
          left: 0.19rem;
        }
        span {
          display: block;
          width: 1.6rem;
          text-align: center;
          font-size: 80%;
          margin-left: 0.2rem;
        }
      }
    }
  }
  .listRules {
    height: 3.14rem;
    background: url(../assets/img/listRule.png);
    background-size: 100% 100%;
    .listRulesTitle {
      padding-top: 0.76rem;
      text-align: center;
      font-size: 120%;
      color: #ffee82;
      .leftBg {
        display: inline-block;
        width: 1.05rem;
        height: 0.14rem;
        background: url(../assets/img/ruleMin.png);
        background-size: 100% 100%;
      }
      .rightBg {
        display: inline-block;
        width: 1.05rem;
        height: 0.14rem;
        background: url(../assets/img/ruleMin2.png);
        background-size: 100% 100%;
      }
    }
    .listMsg {
      color: #ffee82;
      text-align: center;
      padding: 0.21rem 0.62rem 0;
      font-size: 85%;
    }
  }
  .tabs {
    height: 0.7rem;
    display: flex;
    a {
      display: inline-block;
      width: 50%;
      text-align: center;
      &.active {
        background: orange;
      }
    }
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
  transition: all 1s;
}
</style>


