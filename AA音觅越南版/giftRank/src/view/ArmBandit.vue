<template>
  <div class="box">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <roolMsg :roolMsgs="roolMsgs" />
      <span class="ruleTips" @click="goRule()"></span>
      <!-- <span class="ruleTips rank" @click="showRank()"></span> -->
    </div>
     <div class= "giftList">
      <div class="giftItem" v-for="(item,index) in giftArr" :key="index">
    
        <div class="imgBox">
          <img :src="item.img" alt="">
        </div>
          <strong>{{item.gname}}</strong>
      </div>
    </div>
    <!-- <div class="gifts">
      <div class="giftItem">
        <div class="item" v-for="(item,index) in prizes" :key="index">
          <strong>{{item.name}}</strong>
          <img :src="item.image" alt="">
        </div>
      </div>
      <div class="timeDown" v-if="!surplusTime.end">
        <div class="day">
          <strong>{{surplusTime.day}}</strong>
          <em>天</em>
        </div>
        <div class="hours">
          <strong>{{surplusTime.hour}}</strong>
          <em>時</em>
        </div>
        <div class="min">
          <strong>{{surplusTime.minute}}</strong>
          <em>分</em>
        </div>
        <div class="second">
          <strong>{{surplusTime.second}}</strong>
          <em>秒</em>
        </div>
      </div>
    </div> -->
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
            <p>BXH Qùa may mắn được chia thành BXH Hộp quà may mắn và BXH Ky binh, Top 100 được hiển thị. </p>
            <p>BXH Hộp quà may mắn: Dựa vào số xu quà tặng từ quà tại hộp quà may mắn, 1 xu =10 điểm</p>
            <p>BXH Kỳ binh: Dựa vào số xu quà nhận được từ Kỳ binh kho báu, 1 xu = 10 điểm, 1 vỏ sò = 100 điểm, 1 kim cương = 1000 điểm</p>
            <h6>3. Thưởng</h6>
            <div class="giftBox">

              <p>Top 1: Khung ảnh 2021 7 ngày + Xe Maserati 7 ngày +2000 đậu<br />
               Top 2: Khung ảnh 2021 5 ngày + 1500 đậu<br />
                Top 3: Khung ảnh 2021 3 ngày +1000 đậu
              </p>

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
      giftArr:[
        {
          img: require('../assets/img/gift/gift1.png'),
          gname:'Khung ảnh'
        },
         {
          img:require('../assets/img/gift/gift2.png'),
          gname:'Xe'
        },
         {
          img:require('../assets/img/gift/gift3.png'),
          gname:'Đậu'
        }
      ]
    }
  },
  created() {
    this.judgeShare()  //判断是否为分享环境,请求相应的接口 
    this.getDefaultData()
  },
  computed: {
    aTimer() {
      return getDate(new Date(this.stime * 1000), '2') + '-' + getDate(new Date(this.etime * 1000), '2')
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
          const { step, gifts, downTime, stime, etime, owner, prizes } = response_data
          this.prizes = prizes
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
               this.$refs.scorll.downTimeGo('timer1', downTime)
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
    showRank() {
      let token = getString('token')
      let uid = getString('uid')
      location.href = `./index2.html?token=${token}&uid=${uid}`
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
  background: #0438DA url(../assets/img/banner.png) center 0
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
    height: 6.44rem;
    position: relative;
    .ruleTips {
      width: 1.65rem;
      height: 0.43rem;
      background: url(../assets/img/ruleTips.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      top: 4.8rem;
    
      &.rank {
        background: url(../assets/img/ruleTips2.png);
        background-size: 100% 100%;
        top: 5.3rem;
      }
    }
  }
  .giftList{
    width: 6.07rem;
    height: 3.74rem;
      background: url(../assets/img/giftList.png) no-repeat;
      background-size: 100% 100%;
      padding: 0 .49rem;
      margin: 0 auto ;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .giftItem{
          margin-top: .3rem;
          strong{
              display: block;
              text-align: center;
              font-size: .24rem;
              color:#1494E0;
              margin-top: .15rem;
          }
.imgBox{
  width: 1.7rem;
  height: 1.7rem;
     background: url(../assets/img/giftImgBox.png) no-repeat;
      background-size: 100% 100%;
      img{
        width: 1.6rem;
  height: 1.6rem;
      }
}
      }
  }
  .gifts {
    width: 6.88rem;
    height: 4.58rem;
    background: url(../assets/img/giftBg.png);
    background-size: 100% 100%;
    margin: 0.29rem auto;
    position: relative;
    padding-top: 1.2rem;
    .giftItem {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0.1 rem auto 0;
      padding: 0 0.8rem;
      .item {
        img {
          width: 2.4rem;
          height: 2.4rem;
        }
        strong {
          color: #a2291f;
          display: block;
          text-align: center;
        }
      }
    }
  }
  .rule {
    width: 6rem;
    height: 8.07rem;
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
      color: #a2291f;
      font-size: 0.2rem;
      margin-top: 0.24rem;
      text-align: center;
      text-indent: 0;
      padding: 0 ;
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
        color: #a2291f;
      }
      p {
        padding-left: 0.6rem;
      }
    }
    h6 {
      font-size: 0.24rem;
      color: #a2291f;
      font-weight: 800;
      margin-top: 0.1rem;
    }
    p {
      font-size: 0.24rem;
      color: #a2291f;
      font-weight: 500;
       padding-left: 0.6rem;
    //   text-indent: 0.5rem;
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


