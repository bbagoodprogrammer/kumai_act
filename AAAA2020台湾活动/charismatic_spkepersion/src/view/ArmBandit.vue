<template>
  <div class="box" :class="{bg:!showBannerBg}">
    <!-- <canvas id="bannerBg" v-show="!showBannerBg"></canvas> -->
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <div class="tipsBox" :class="{top:isShare}">
        <span class="ruleTips ruleTips2" @click="goMain()"></span>
        <span class="ruleTips" @click="goRule()"></span>
        <span class="ruleTips ruleTips3" @click="showHistory()"></span>

      </div>
    </div>
    <TrunMsg />
    <Box :level="level" :score="score" />
    <RedPackets :rate="rate" />
    <TabsScrollLoadList ref="scorll" />
    <act-footer></act-footer>
    <div class="mask" v-show="showHistoryPup">
      <transition name="clide">
        <div class="history" v-show="showHistoryPup">
          <i class="close" @click="showHistoryPup = false"></i>
          <div class="title"></div>
          <div class="history_con">
            <div class="his_header">
              <span>抽獎時間</span>
              <span>獲得獎品</span>
            </div>
            <ul>
              <li v-for="(item,index) in historyList" :key="index">
                <div class="tmBox">
                  <div class="tm">{{getDate(item.tm)}}</div>
                  <div class="lv">Lv.{{item.level}}等級</div>
                </div>
                <div class="giftArr">
                  <div class="giftItem" v-for="(item,index) in item.prize " :key="index">
                    <div class="imgBg">
                      <img :src="giftArr[item].img" alt="">
                    </div>
                    <strong>{{giftArr[item].name}}</strong>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <!-- <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}"></div> -->
  </div>
</template>

<script>

import getString from "../utils/getString"
import APP from "../utils/openApp"
import api from "../api/apiConfig"
import ActFooter from "../components/ActFooter"
import MsgToast from "../components/commonToast"
import { globalBus } from '../utils/eventBus'
import TrunMsg from "../components/TrunMsg"
import Box from "../components/Box"
import RedPackets from "../components/RedPackets"
import TabsScrollLoadList from "../components/TabsScrollLoadList"
import { giftArr } from "../config/gifts"
import { Downloader, Parser, Player } from 'svga.lite'
import getDate from "../utils/getDate"

const downloader = new Downloader()
const parser = new Parser({ disableWorker: true })

export default {
  components: { MsgToast, ActFooter, TrunMsg, Box, RedPackets, TabsScrollLoadList },
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
      showBannerBg: true,
      rate: {},
      historyList: [],
      showHistoryPup: false,
      level: 0,
      score: 0
    }
  },
  created() {
    this.judgeShare()  //判断是否为分享环境,请求相应的接口 
    this.getDefaultData()
  },
  computed: {
    giftArr() {
      return giftArr
    }
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
          const { step, c_day, reg, gift, redPacket, naming, owner, notice, rate, stime, etime, days } = response_data
          this.rate = rate
          this.vxc('setActStatus', step)
          this.vxc('setReg', reg)
          this.vxc('setPacket', gift)
          this.vxc('setRedPacket', redPacket)
          this.vxc('setNaming', naming)
          this.vxc('setUserMsg', owner)
          this.vxc('setNotice', notice)
          this.vxc('setTimeArr', this.getDateArr(stime, etime))
          this.vxc('setTotalDay', days)
          this.vxc('setInited', 1)
          this.level = owner.level
          this.score = owner.score
          if (!val) {
            this.vxc('setC_day', c_day)
            this.vxc('changTab', c_day)
          }
        } else {
          this.toast(response_status.error)
        }
      })
    },
    downApp() {
      APP()
    },
    goRule() {
      let regstr = getString('token')
      location.href = `./index2.html?token=${regstr}`
    },
    goMain() {
      let regstr = getString('token')
      let uid = getString('uid')
      let aid = getString('aid')
      location.href = `./index4.html?token=${regstr}`
    },
    refrsh() { //刷新
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      window.removeEventListener("scroll", this.onScroll)
      this.getDefaultData('ref')
    },
    getDateArr(stime, etime) {
      let arr = []
      for (let i = stime * 1; i <= etime * 1; i += 86400) {
        arr.push(i)
      }
      return arr
    },
    getDate(tm) {
      return getDate(new Date(tm * 1000), 5)
    },
    showHistory() {
      api.openPacketList().then(res => {
        console.log(res)
        this.historyList = res.data.response_data.list
        this.showHistoryPup = true
      })
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
  background: RGBA(162, 119, 243, 1) url(../assets/img/banner.png) center 0
    no-repeat;
  background-size: 100% auto;
  padding-bottom: 2rem;
  &.bg {
    background: url(../assets/img/banner1.jpg) center 0 no-repeat;
    background-size: 100% auto;
  }
  #bannerBg {
    width: 7.5rem;
    height: auto;
    position: absolute;
    top: 0;
    left: 0;
  }
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
    height: 6.12rem;
    position: relative;
    .tipsBox {
      position: absolute;
      right: 0;
      top: 3.8rem;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      .ruleTips {
        display: block;
        width: 1.81rem;
        height: 0.61rem;
        background: url(../assets/img/ruleTips1.png);
        background-size: 100% 100%;
        margin-bottom: 0.15rem;
        &.ruleTips2 {
          background: url(../assets/img/ruleTips2.png);
          background-size: 100% 100%;
        }
        &.ruleTips3 {
          background: url(../assets/img/ruleTips3.png);
          background-size: 100% 100%;
        }
      }
      &.top {
        top: 1.5rem;
      }
    }
  }
  .guaBox {
    position: relative;
  }
}
.history {
  width: 7.18rem;
  height: 9.24rem;
  padding-top: 1.02rem;
  background: url(../assets/img/history_bg.png);
  background-size: 100% 100%;
  position: relative;
  .close {
    display: block;
    width: 0.3rem;
    height: 0.3rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0.3rem;
    top: 0.3rem;
  }
  .title {
    width: 3.7rem;
    height: 1.26rem;
    background: url(../assets/img/history_title.png);
    background-size: 100% 100%;
    position: absolute;
    top: -0.6rem;
    left: 1.7rem;
  }
  .history_con {
    padding: 0 0.4rem;
    .his_header {
      display: flex;
      justify-content: space-between;
    }
    ul {
      padding-right: 0.2rem;
      max-height: 8rem;
      overflow-x: hidden;
      overflow-y: scroll;
      li {
        height: 2.6rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        .tmBox {
          .lv {
            width: 1.1rem;
            height: 0.32rem;
            background: linear-gradient(90deg, #ffd6ba 0%, #fdf2d5 100%);
            border-radius: 0.16rem;
            text-align: center;
            line-height: 0.32rem;
            color: rgba(133, 88, 14, 1);
            font-size: 0.22rem;
            margin-top: 0.12rem;
          }
        }
        .giftArr {
          width: 3.2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .giftItem {
            width: 1rem;
          }
          .imgBg {
            width: 1rem;
            height: 1rem;
            background: rgba(135, 65, 227, 1);
            border-radius: 0.12rem;
            img {
              width: 100%;
              height: 100%;
            }
          }
          strong {
            display: block;
            height: 0.9rem;
            font-size: 0.24rem;
            text-align: center;
          }
        }
      }
      li::before {
        content: "";
        display: block;
        width: 7.1rem;
        height: 0.02rem;
        background: linear-gradient(
          90deg,
          rgba(252, 245, 193, 0),
          rgba(252, 245, 193, 0.5),
          rgba(252, 245, 193, 0)
        );
        border-radius: 0.02rem;
        position: absolute;
        bottom: 0;
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
  transition: transform 1s;
  z-index: 1000;
}
</style>


