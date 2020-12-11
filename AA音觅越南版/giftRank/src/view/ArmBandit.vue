<template>
  <div class="box">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <roolMsg :roolMsgs="roolMsgs" />
      <span class="ruleTips" @click="goRule()">Thể lệ</span>
    </div>
    <div class="gifts">
      <div class="timeDown" v-if="!surplusTime.end">
        <div class="day">
          <strong>{{surplusTime.day}}</strong>
          <!-- <em>天</em> -->
        </div>
        <div class="hours">
          <strong>{{surplusTime.hour}}</strong>
          <!-- <em>時</em> -->
        </div>
        <div class="min">
          <strong>{{surplusTime.minute}}</strong>
          <!-- <em>分</em> -->
        </div>
        <div class="second">
          <strong>{{surplusTime.second}}</strong>
          <!-- <em>秒</em> -->
        </div>
      </div>
    </div>
    <TabsScrollLoadList ref="scorll" @getDefaultData="getDefaultData"></TabsScrollLoadList>
    <act-footer></act-footer>
    <div class="mask" v-show="showRules">
      <transition name="slide">
        <div class="rule" v-if="showRules">
          <div class="con">
            <i class="close" @click="closeRule()"></i>
            <h6>1 Thời gian</h6>
            <p>{{aTimer}}</p>
            <h6>2. Bảng xếp hạng</h6>
            <p>Hệ thống sẽ sắp xếp thứ tự dựa trên số lượng phần thưởng cây thông Noel và ông già Noel.
              <br /> Bảng xếp hạng hiển thị số lượng quà chỉ định.
            </p>
            <h6>3. Thưởng</h6>
            <div class="giftBox">
              <h5>BXH Cây thông Noel：</h5>
              <p>Top 1：Khung ảnh Giáng sinh vui nhộn（7 ngày）、Xe Maserati bạc（7 ngày）<br />
                Top 2：Khung ảnh Giáng sinh vui nhộn (5 ngày）<br />
                Top 3：Khung ảnh Giáng sinh vui nhộn（3 ngày）
              </p>
              <h5>BXH Ông già Noel：</h5>
              <div class="giftBox">
                <p>
                  Top 1：Khung ảnh Giáng sinh vui nhộn（15 ngày）、Xe Maserati bạc（10 ngày）<br />
                  Top 2：Khung ảnh Giáng sinh vui nhộn（7 ngày）、Xe Maserati bạc（7ngày）<br />
                  Top 3：Khung ảnh Giáng sinh vui nhộn（5 ngày）
                </p>
              </div>
            </div>
            <h6>4 Chú ý </h6>
            <p>Giải thưởng được phát sau khi sự kiện kết thúc 7 ngày.</p>
            <p class="lastTips">Quyết định cuối cùng thuộc về Alochat</p>
          </div>
        </div>
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
import roolMsg from "../components/RoolMsg"
import downTime from '../utils/downTime.js'
import TabsScrollLoadList from "../components/TabsScrollLoadList"
import getDate from '../utils/getDate';
export default {
  components: { MsgToast, ActFooter, roolMsg, TabsScrollLoadList },
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
      roolMsgs: [],
      surplusTime: {},
      showRules: false,
    }
  },
  created() {
    this.judgeShare()  //判断是否为分享环境,请求相应的接口 
    this.getDefaultData()
  },
  computed: {
    aTimer() {
      return getDate(new Date(this.stime * 1000), '1') + '-' + getDate(new Date(this.etime * 1000), '1')
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
          const { step, gifts, downTime, stime, etime, owner } = response_data
          this.stime = stime
          this.etime = etime
          this.vxc('setActStatus', step)
          this.vxc('setGifts', gifts)
          this.vxc('setInited', 1)
          this.vxc('setSingUp', owner.reg)
          this.vxc('setOwner', owner)
          this.$store.commit("changGroupsUserMsg", {//初始当前日榜个人信息
            key: 0,
            msg: owner.rank1
          })
          this.$store.commit("changGroupsUserMsg", {//初始当前日榜个人信息
            key: 'total',
            msg: owner.rank2
          })
          if (downTime > 0) {
            this.downTimeGo('timer1', downTime)
          }
        } else {
          this.toast(response_status.error)
        }
      })
      api.roolMsg().then(res => {
        this.roolMsgs = res.data.response_data.list
        // console.log(this.roolMsgs)
      })
    },
    downTimeGo(timeName, val) {
      downTime(timeName, val);
      this.surplusTime = downTime(timeName);
      this.timer = setInterval(() => {
        this.surplusTime = downTime(timeName);
        if (this.surplusTime.end) {
          clearInterval(this.timer)
          // this.$store.commit("changday_down_time", 0)  //當天剩餘時間
        }
      }, 1000)
    },
    downApp() {
      APP()
    },
    goRule() {
      this.showRules = true
    },
    closeRule() {
      this.showRules = false
    }
    // refrsh() { //刷新
    //   this.rotatePx = 540 * ++this.rotatec  //旋转动画
    //   window.removeEventListener("scroll", this.onScroll)
    //   this.getDefaultData('ref')
    // }
  }
}
</script>
<style lang='scss'>
body::-webkit-scrollbar {
  width: 0;
}
.con {
  height: 7.6rem;
  overflow-y: scroll;
}
.box {
  max-width: 750px;
  overflow-x: hidden;
  position: relative;
  margin: auto;
  background: rgba(3, 62, 180, 1) url(../assets/img/banner.png) center 0
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
      background: url(../assets/img/share_bar.jpg) no-repeat;
      background-size: 100% 100%;
    }
  }
  .header {
    height: 8.3rem;
    position: relative;
    .ruleTips {
      width: 1.22rem;
      height: 0.36rem;
      background: url(../assets/img/ruleTips.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      text-align: center;
      top: 4.8rem;
    }
  }
  .gifts {
    width: 6.88rem;
    height: 5.78rem;
    background: url(../assets/img/giftBg.png);
    background-size: 100% 100%;
    margin: 0 auto;
    position: relative;
  }
  .timeDown {
    width: 4.3rem;
    height: 0.53rem;
    // padding: 0 0.09rem;
    margin: 0.17rem auto 0;
    display: flex;
    // justify-content: space-between;
    background: url(../assets/img/downTime.png);
    background-size: 100% 100%;
    position: absolute;
    bottom: 0.7rem;
    left: 1.27rem;
    > div {
      height: 100%;
      line-height: 0.6rem;
      display: flex;
      align-items: center;
      strong {
        display: block;
        width: 0.9rem;
        height: 0.42rem;
        line-height: 0.42rem;
        letter-spacing: 0.32rem;
        text-indent: 0.1rem;
        color: #ffeeb7;
      }
    }
    .hours,
    .second {
      margin-left: 0.23rem;
      text-align: center;
    }
    .min {
      margin-left: 0.24rem;
    }
    .second {
      margin-left: 0.25rem;
    }
  }
  .rule {
    width: 6rem;
    height: 9rem;
    padding: 1.15rem 0.4rem 0;
    background: url(../assets/img/ruleBg.png);
    background-size: 100% 100%;
    position: relative;
    .close {
      display: block;
      width: 0.21rem;
      height: 0.23rem;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      top: -0.4rem;
    }
    .lastTips {
      color: rgba(247, 217, 140, 1);
      font-size: 0.2rem;
      margin-top: 0.24rem;
      text-align: center;
      text-indent: 0;
    }
    .giftImg {
      display: block;
      width: 1.81rem;
      height: 1.81rem;
      background: url(../assets/img/giftCar.png);
      background-size: 100% 100%;
      margin: 0.18rem auto 0.38rem;
    }
    .giftBox {
      h5 {
        padding-left: 0.3rem;
        color: rgba(247, 217, 140, 1);
      }
      p {
        padding-left: 0.6rem;
        text-indent: 0rem;
      }
    }
    h6 {
      font-size: 0.24rem;
      color: rgba(247, 217, 140, 1);
      font-weight: 800;
      margin-top: 0.1rem;
    }
    p {
      font-size: 0.24rem;
      color: rgba(247, 217, 140, 1);
      font-weight: 500;
      text-indent: 0.5rem;
      // margin-top: 0.1rem;
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


