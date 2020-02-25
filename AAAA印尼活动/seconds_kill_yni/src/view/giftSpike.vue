<template>
  <div class="box" :style="{backgroundImage: 'url(' + banner + ')', backgroundSize:'center',backgroundRepeat:'no-repeat'}">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="herder">
      <div class="spanBox" :class="{shareTop:isShare}">
        <span class="rules" @click="showRulesPup()">Aturan Acara</span>
        <span class="history" @click="showBuyHistoryPup()">Riwayat</span>
      </div>
    </div>
    <tabs-scroll-load-list ref="scroll"></tabs-scroll-load-list>
    <act-footer v-if="!isShare"></act-footer>
    <loading></loading>
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
    <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}" v-if="!isShare && activite !== 0"></div>
    <!-- <div @touchstart="down" @touchmove="move" @touchend="end" id="circlebox" class="circle">
      <div class="left-line"></div>
      <div class="right-line"></div>
    </div> -->
    <!-- 遮罩 -->
    <!-- <div class="mask-box" id="page1mask" v-if="showif"></div> -->
    <transition name="slide">
      <div class="rulesPup" v-show="showRules">
        <div class="rulesCon">
          <i class="close" @click="closeRulesPup()"></i>
          <div class="title">Aturan Acara</div>
          <p class="time">Waktu Acara: {{getDateStr(new Date(stime*1000))}} ~ {{getDateStr(new Date(etime*1000))}}</p>
          <h6>Aturan Acara</h6>
          <p>1.Pengguna dapat membeli barang/hadiah dengan koin emas atau kacang emas, jumlah kali pembelian terbatas , harga dan info spesifik dari barang/hadiah yang dibeli, silakan lihat persyaratan barang/hadiah ini!</p>
          <p>2.Acara dibagi menjadi beberapa tahap round,sampai semua barang/hadiah terjual! Round /Periode yang belum dimulai,Anda bisa mengatur pengingat terlebih dahulu (Harus membuka notifikasi pesan ),setelah acara dimulai, sistem akan secara otomatis mengirim pengingat untuk membeli barang/hadiah, jangan melewatkan barang-barang promosi yang terbatas!</p>
          <p>3.Kalau hadiah yang dibeli berhasil,kupon hadiah ini akan langsung dikirim ke ransel Anda, silakan cek !</p>
          <p>4.Hadiah berlaku selama 7 hari, dan kupon hadiah berlaku selama 24 jam!</p>
          <p class="tips">Hak interpretasi acara ini dipegang oleh penyelenggara acara</p>
        </div>
      </div>
    </transition>
    <transition name="slide">
      <div class="buyHistoryPup" v-show="showBuyHistory">
        <div class="buyHistoryPupCon">
          <i class="close" @click="closeBuyHistoryPup()"></i>
          <div class="title">Riwayat</div>
          <div class="listTitle">
            <span class="giftName">Hadiah</span>
            <span class="time">Round/Waktu</span>
            <span class="num">Jumlah</span>
          </div>
          <ul class="scrollable">
            <li v-for="(item,index) in buyHistory" :key="index">
              <span class="giftName">{{item.name}}</span>
              <span class="time">{{item.tm}}</span>
              <span class="num">{{item.count}}</span>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

import getString from "../utils/getString"
import APP from "../utils/openApp"
import api from "../api/apiConfig"
import Loading from "../components/Loading"
import ActFooter from "../components/ActFooter"
import MsgToast from "../components/commonToast"
import TabsScrollLoadList from "../components/TabsScrollLoadList"
import { globalBus } from '../utils/eventBus'
import getDate from '../utils/getDate'
export default {
  components: { Loading, MsgToast, ActFooter, TabsScrollLoadList },
  data() {
    return {
      isShare: false, //是否分享
      more: true,   //加载更多
      loaded: false,//加载完毕
      activite: 1,    //活动状态
      showT: false,  //提示弹窗显示
      tastMsg: "Bạn chưa mở thông báo, sau khi mở mới nhận được tin nhắn nhắc nhở~",  //基础弹窗提示信息
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
      showRules: false,
      showBuyHistory: false,
      qid: null,
      buyHistory: [],
      banner: '',
      stime: '',
      etime: ''
    }
  },
  created() {
    this.judgeShare()  //判断是否为分享环境,请求相应的接口 
    this.getDefaultData()
  },
  mounted() {
    this.scrollable = this.$el.querySelector('.scrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
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
      api.getDefault().then(res => {
        if (res.data.response_status.code == 20000) {
          this.activite = 0
          this.$store.commit('changActStatus', this.activite)
        } else if (res.data.response_status.code == 0) {
          const { activity_status, Hi, clock_list, gift_list, is_order, user_msg, qid, banner, stime, etime } = res.data.response_data
          this.banner = banner
          this.$store.commit('changActStatus', activity_status)
          this.$store.commit('changHi', Hi)
          this.$store.commit('changClock_list', clock_list)
          // this.$store.commit('changIs_order', is_order)
          this.$store.commit('changUser_msg', user_msg)
          this.qid = qid
          this.$store.commit('changQid', qid)
          this.$store.commit("changSetInited", 1)  //是否初始化頁面
          this.stime = stime
          this.etime = etime
          if (!val) {
            this.$store.commit('updateRankGroups', { //当前日榜信息
              key: clock_list.indexOf(Hi),
              gift_status: gift_list.gift_status,
              loadCount: 0,
              loadEnd: gift_list.list.length < 20,
              loading: false,
              none: false,
              list: gift_list.list,
              is_order: is_order,
              second: gift_list.second
            })
          }
        } else {
          this.tastMsg = res.data.response_status.error
          this.showT = true
        }
      })
    },
    onScroll() {
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.loaded) return
        if (this.more) {
          this.more = false
          api.buyrecord(this.qid, this.buyHistory.length).then(res => {
            this.more = true
            if (res.data.response_data.record.length === 0) {
              this.loaded = true
            } else {
              this.buyHistory = this.buyHistory.concat(res.data.response_data.record)
            }
          })
        }
      }
    },
    refrsh() { //刷新
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      window.removeEventListener("scroll", this.onScroll)
      this.getDefaultData('ref')
      this.$refs.scroll.onRefresh()
    },
    showRulesPup() {
      this.showRules = true
    },
    closeRulesPup() {
      this.showRules = false
    },
    closeToast() {
      this.showT = false
    },
    showBuyHistoryPup() { //显示购买记录
      api.buyrecord(this.qid, 0).then(res => {
        if (res.data.response_status.code === 0) {
          this.buyHistory = res.data.response_data.record
          this.showBuyHistory = true
        }
      })

    },
    closeBuyHistoryPup() {
      this.showBuyHistory = false
    },
    downApp() {
      APP()
    },
    getDateStr(date) {
      return getDate(date, '~')
    }
  }
}
</script>
<style lang='scss'>
.box {
  max-width: 750px;
  overflow-x: hidden;
  position: relative;
  margin: auto;
  // background: url(../assets/img/banner.png) center 0 no-repeat;
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
  .herder {
    height: 5.95rem;
    position: relative;
    .spanBox {
      width: 1.55rem;
      position: absolute;
      top: 0.1rem;
      right: 0;
      white-space: nowrap;
      &.shareTop {
        top: 2rem;
      }
      span {
        display: block;
        width: 1.35rem;
        height: 0.53rem;
        font-size: 70%;
        padding: 0 0.15rem;
        color: #833700;
        text-align: center;
        line-height: 0.53rem;
        background: url(../assets/img/headerItemBg.png);
        background-size: 100% 100%;
        &.rules {
          margin-bottom: 0.07rem;
        }
      }
    }
  }
  .rulesPup {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 10000;
    background: rgba(0, 0, 0, 0.8);
    .rulesCon {
      width: 5.96rem;
      padding: 0.39rem 0.37rem 0.19rem;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background: rgba(245, 240, 236, 1);
      border: 0.04rem solid rgba(247, 177, 155, 1);
      border-radius: 0.6rem;
      color: #c18143;
      font-size: 80%;
      .close {
        display: block;
        width: 0.55rem;
        height: 0.55rem;
        background: url(../assets/img/close.png);
        background-size: 100% 100%;
        position: absolute;
        right: 0.2rem;
        top: -0.8rem;
      }
      .title {
        font-size: 120%;
        color: #833700;
        text-align: center;
        font-weight: bold;
      }
      .time {
        margin-top: 0.36rem;
      }
      .tips {
        text-align: center;
        margin-top: 0.57rem;
      }
      p {
        font-size: 80%;
      }
      h6 {
        margin-top: 0.18rem;
        font-size: 80%;
      }
    }
  }
  .buyHistoryPup {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 10000;
    background: rgba(0, 0, 0, 0.8);
    .buyHistoryPupCon {
      width: 5.96rem;
      height: 5.45rem;
      padding: 0.39rem 0.37rem 0.19rem;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background: rgba(245, 240, 236, 1);
      border: 0.04rem solid rgba(247, 177, 155, 1);
      border-radius: 0.6rem;
      color: #c18143;
      font-size: 80%;
      .close {
        display: block;
        width: 0.55rem;
        height: 0.55rem;
        background: url(../assets/img/close.png);
        background-size: 100% 100%;
        position: absolute;
        right: 0rem;
        top: -0.8rem;
      }
      .title {
        font-size: 120%;
        color: #833700;
        text-align: center;
        font-weight: bold;
      }
      .listTitle {
        width: 5.72rem;
        height: 0.74rem;
        line-height: 0.74rem;
        // margin-right: 0.18rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 0.02rem solid #f0dcc9;
        span {
          display: block;
          text-align: center;
          &.giftName {
            width: 2.2rem;
          }
          &.time {
            width: 2.2rem;
          }
          &.num {
            width: 1.12rem;
          }
        }
      }
      .scrollable {
        height: 4.25rem;
        padding-right: 0.18rem;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch; //有回弹效果
        -webkit-overflow-scrolling: auto; //滑到哪停到哪
        li {
          min-height: 0.45rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 0.02rem solid #f0dcc9;
          box-sizing: border-box;
          span {
            display: block;
            text-align: center;
            &.giftName {
              width: 2.2rem;
            }
            &.time {
              width: 2.2rem;
            }
            &.num {
              width: 1.12rem;
            }
          }
        }
      }
      .scrollable::-webkit-scrollbar {
        width: 0.06rem;
        margin-left: 0.1rem;
        // background: #b486a1;
      }
      .scrollable::-webkit-scrollbar-thumb {
        background: #f7b19b;
      }
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


