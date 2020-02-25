<template>
  <div class="history">
    <div class="historyHeader">
      <div class="tabs">
        <span @click="closeHistory()" class="closeIcon"></span>
        القواعد
        <em class="liner"></em>
        <i class="linerItem"></i>
      </div>
      <ul class="historyList scrollable">
        <li v-for="(item,index) in record" :key="index">
          <div class="imgBox">
            <img :src="getRankImg(item.gift_id)" alt="">
            <em class="imgNum" v-html="getNum(item.gift_id)"></em>
          </div>
          <div class="giftBox">
            <div class="name">{{getName(item.gift_id)}}</div>
            <div class="time">{{getTimeStr(item.tm)}}</div>
          </div>
          <span class="cha" v-if="item.gift_type == 1 || item.gift_type == 4 ||item.gift_type == 5||item.gift_type == 6" @click="goHtml(item.gift_type)"></span>
        </li>
        <div class="rankLoading" v-show="loadingShow">في التحميل...</div>
        <div class="noData" v-show="noData">لا توجد البيانات الآن!</div>
        <div class="dataEnd" v-show="dataEnd">تظهر 100 معلومة للجوائز في اليانصيب قريبا فقط</div>
      </ul>
      <!-- <div class="historyTips" v-show="showHistoryTips"> -->
      <!-- <transition name="timeOut"> -->
      <!-- <div class="rankTips" v-show="showRankTips"> -->
      <div class="historyCon" v-show="showHistoryTips">
        <!-- <span class="closeTips" @click="closeHistoryTips()"></span> -->
        <p>تفضل بذهاب إلى 【أنا-حقيبة】للتحقق</p>
      </div>
      <!-- </div> -->
      <!-- </transition> -->
      <!-- </div> -->
    </div>
  </div>
</template>
<script>
import api from "../api/apiConfig"
import getString from "../utils/getString"
import getDate from "../utils/getDate"
import { giftNum, historyImg } from "../config/wardImg"
export default {
  data() {
    return {
      more: true,
      record: [],
      loadingShow: false,
      noData: false,
      dataEnd: false,
      showHistoryTips: false
    }
  },
  created() {
    this.loadingShow = true
    api.getHistroy(0).then(res => {
      this.loadingShow = false
      if (res.data.response_status.code == 0) {
        this.record = res.data.response_data.record
        if (this.record.length == 0) {
          this.noData = true
        }
      }
    })
  },
  mounted() {
    this.scrollable = this.$el.querySelector('.scrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
  },
  methods: {
    onScroll() {
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.dataEnd || this.noData) return
        if (this.more) {
          this.more = false
          api.getHistroy(this.record.length, 'more').then(res => {
            this.more = true
            if (res.data.response_data.record.length === 0 && this.record.length == 100) {
              this.dataEnd = true
            } else if (res.data.response_data.record.length === 0 && this.record.length < 100) {
              this.noData = true
            } else {
              this.record = this.record.concat(res.data.response_data.record)
            }
          })
        }
      }
    },
    goHtml(giftType) {
      let regstr = getString('token')
      let uid = getString('uid')
      if (giftType == 1) { //礼物弹窗
        this.showHistoryTips = true
        this.setTimeCloseTips()
      } else if (giftType == 4) {  //座驾
        location.href = `http://act.gosingapp.com/html/auto/index.html?uid=${uid}&token=${regstr}`
      } else if (giftType == 5) { //vip
        location.href = `http://act.gosingapp.com/html/member_new/index.html?uid=${uid}&token=${regstr}`
      } else if (giftType == 6) { //储值券弹窗
        this.showHistoryTips = true
        this.setTimeCloseTips()
      }
    },
    setTimeCloseTips() {
      setTimeout(() => {
        this.closeHistoryTips()
      }, 900)
    },
    closeHistory() {
      this.$emit('closeWardsHistoryPup')
    },
    closeHistoryTips() {
      this.showHistoryTips = false
    },
    getRankImg(id) {
      return historyImg[id]
    },
    getNum(id) {
      return giftNum[id].num
    },
    getName(id) {
      return giftNum[id].name
    },
    getTimeStr(tm) {
      return getDate(new Date(tm * 1000))
    }
  }
}
</script>
<style lang= "scss" scoped>
.history {
  width: 7.5rem;
  height: 7.5rem;
  background: #4f0078;
  overflow-x: hidden;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  overflow: hidden;
  padding-bottom: 1.5rem;
  .historyHeader {
    .tabs {
      width: 6.17rem;
      height: 0.96rem;
      margin: 0 auto;
      text-align: center;
      line-height: 0.96rem;
      font-size: 120%;
      color: #fff9a0;
      position: relative;
      /* display: flex;
      align-items: center;
      justify-content: center; */
      .closeIcon {
        display: block;
        width: 0.18rem;
        height: 0.3rem;
        background: url(../assets/img/backArrow.png);
        background-size: 100% 100%;
        position: absolute;
        top: 0.34rem;
        right: -0.42rem;
        transform: rotate(180deg);
      }
      .liner {
        display: block;
        width: 100%;
        height: 0.02rem;
        position: absolute;
        bottom: 0;
        background: rgba(255, 255, 255, 1);
        opacity: 0.05;
      }
      .linerItem {
        display: block;
        width: 0.68rem;
        height: 0.02rem;
        background: #dcd097;
        opacity: 0.5;
        position: absolute;
        left: 2.75rem;
        bottom: 0;
      }
    }
  }
  .historyList {
    margin: 0.14rem auto 0;
    width: 7.08rem;
    height: 7.3rem;
    overflow-y: scroll;
    overflow-scrolling: touch;
    -webkit-overflow-scrolling: touch;
    padding: 0 0 0.15rem 0.1rem;
    li {
      height: 1.04rem;
      border-bottom: 0.02rem solid #48006d;
      display: flex;
      align-items: center;
      position: relative;
      .imgBox {
        width: 0.95rem;
        height: 0.7rem;
        margin-right: 0.15rem;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
        .imgNum {
          position: absolute;
          right: 0.05rem;
          bottom: 0rem;
          font-size: 70%;
          /* transform: scale(0.8); */
          /* font-style: italic; */
          color: #ff37d2;
          -webkit-text-stroke: 0.005rem #fff;
          text-stroke: 0.005rem #fff;
        }
      }
      .giftBox {
        margin-right: 0.15rem;
        .name {
          font-size: 93%;
        }
        .time {
          font-size: 72%;
          opacity: 0.5;
          font-weight: 300;
          direction: ltr;
        }
      }
      .cha {
        width: 0.95rem;
        height: 0.39rem;
        background: url(../assets/img/chashou.png);
        background-size: 100% 100%;
        position: absolute;
        left: 0.24rem;
      }
    }
  }
  .historyList::-webkit-scrollbar {
    width: 0.04rem;
    background: rgba(0, 0, 0, 1);
    opacity: 0.1;
    border-radius: 0.02rem;
  }
  .historyList::-webkit-scrollbar-thumb {
    width: 0.04rem;
    background: rgba(0, 0, 0, 1);
    opacity: 0.2;
    border-radius: 0.02rem;
  }
  .historyTips {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10000;
  }
  .historyCon {
    width: 3rem;
    background: rgba(0, 0, 0, 1);
    border-radius: 0.26rem;
    position: absolute;
    top: 50%;
    left: 2.21rem;
    opacity: 1;
    /* transform: translate(-50%, 0); */
    /* animation: timeOut 0.8s linear; */
    .closeTips {
      display: block;
      width: 0.41rem;
      height: 0.41rem;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.07rem;
      right: 0.12rem;
    }
    h3 {
      font-size: 120%;
      color: #262626;
      text-align: center;
    }
    p {
      padding: 0.05rem;
      font-size: 72%;
      color: #fff;
      text-align: center;
    }
  }
  .rankLoading {
    text-align: center;
    margin-top: 0.1rem;
  }
  .noData {
    text-align: center;
    margin-top: 0.1rem;
  }
  .dataEnd {
    text-align: center;
    margin-top: 0.1rem;
  }
  @keyframes timeOut {
    /* 50% {
      opacity: 1;
    } */
    /* 100% {
      opacity: 0;
    } */
  }
}
</style>
