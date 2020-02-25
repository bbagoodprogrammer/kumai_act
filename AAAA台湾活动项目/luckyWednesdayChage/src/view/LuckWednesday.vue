<template>
  <div class="box">
    <div class="header">
      <a class="history" :class="{mt:isShare}" @click.prevent=" goHistory()"><em>購買明細</em></a>
      <a href="./index2.html" :class="{mtT:isShare}" class="rules"><em>活動詳情</em></a>
      <a href="" @click.prevent="share()" class="shareBar" v-if="isShare"></a>
    </div>
    <div class="discountCon">
      <div class="discountTitle">
        <span class="ward" @click="changTab('ward')" :class="{active:showTab == 'ward'}"></span>
        <span class="kward" @click="changTab('kward')" :class="{active:showTab == 'kward'}"></span>
      </div>
      <ul class="wardsList" v-show="showTab === 'ward'">
        <li v-for="(item,index) in wardGifts" :class="{astTop:item.type == 'K房'}" :key="index">
          <div class="imgBox">
            <img :src="imgArr[++index]" alt="" :class="{minImg:item.type == 'K房'}">
            <span v-if="item.type == 'K房'" class="wardsType"></span>
          </div>
          <div class="wardsMsg">
            <div class="wardName">{{item.name}}</div>
            <div class="priceBox">
              <span class="shandian"></span>
              <span class="zhe">{{item.discount}}折</span><del class="originalPrice">原價{{item.original}}金幣</del>
            </div>
            <div class="termOfValidity">有效期{{item.period}}天</div>
          </div>
          <div class="nowPriceBox">
            <div class="nowPrice">
              {{item.price}}金幣/一個
            </div>
            <span @click="buyWards(item.shun)">點擊購買</span>
          </div>
        </li>
      </ul>
      <ul class="wardsList" v-show="showTab === 'kward'">
        <li v-for="(item,index) in kWardGifts" :key="index">
          <div class="imgBox">
            <img :src="kimgArr[++index]">
            <!-- <span v-if=" item.type=='K房'" class=" wardsType"></span> -->
          </div>
          <div class="wardsMsg">
            <div class="wardName">{{item.name}}</div>
            <div class="priceBox">
              <span class="shandian"></span>
              <span class="zhe">{{item.discount}}折</span><del class="originalPrice">原價{{item.original}}金幣</del>
            </div>
            <div class="termOfValidity">有效期{{item.period}}天</div>
          </div>
          <div class="nowPriceBox">
            <div class="nowPrice">
              {{item.price}}金幣/一個
            </div>
            <span @click="buyWards(item.shun)">點擊購買</span>
          </div>
        </li>
      </ul>
    </div>
    <!-- <buy-history v-show="showHistoryTos"></buy-history> -->
    <loading></loading>
    <msg-toast :msg="tastMsg" @closeToast="closeToast()" @buyWard="buyed()" v-show="showT" :colued="colued"></msg-toast>
    <!-- <a href="" class="refresh" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}" v-show="activite!= 0 && !isShare"></a> -->
  </div>
</template>

<script>

import getString from "../utils/getString.js"
import api from "../api/apiConfig.js"
import Loading from "../components/Loading"
import MsgToast from "../components/commonToast"
import APP from "../utils/openApp.js"
export default {
  components: { Loading, MsgToast },
  data() {
    return {
      isShare: false, //是否分享
      // isMore:true,   //加载更多
      activite: 1,    //活动状态
      showT: false,  //提示弹窗显示
      tastMsg: "",  //基础弹窗提示信息
      balance: 0,  //用戶餘額
      buyWardId: 0,
      // showHistoryTos:false,
      gifts: {},  //禮物ID
      colued: 0,
      imgArr: [
        "",
        require("../assets/img/wards/1.png"),
        require("../assets/img/wards/2.png"),
        require("../assets/img/wards/3.png"),
        require("../assets/img/wards/4.png"),
        require("../assets/img/wards/5.png"),
        require("../assets/img/wards/6.png"),
        require("../assets/img/wards/7.png")
      ],
      kimgArr: [
        "",
        require("../assets/img/wards/14.png"),
        require("../assets/img/wards/8.png"),
        require("../assets/img/wards/9.png"),
        require("../assets/img/wards/10.png"),
        require("../assets/img/wards/11.png"),
        require("../assets/img/wards/12.png"),
        require("../assets/img/wards/13.png"),
      ],
      showTab: 'ward', //當前tab
      kWardGifts: []
    }
  },
  computed: {
    wardGifts() { //處理數據
      var wardGiftsArr = []
      for (var item in this.gifts) {
        if (this.gifts[item].type == '作品') {
          this.gifts[item]['shun'] = item
          wardGiftsArr.push(this.gifts[item])
        } else {
          this.gifts[item]['shun'] = item
          this.kWardGifts.push(this.gifts[item])
          Object.keys(this.kWardGifts).sort((a, b) => a.index - b.index)
        }
      }
      Object.keys(wardGiftsArr).sort((a, b) => a.index - b.index)
      return wardGiftsArr
    }
  },
  created() {
    //获取当前时间判断展示的tab
    var date = new Date()
    var day = date.getDay();
    var hours = date.getHours();
    if ((day == 2 && hours >= 22) || (day == 3 && hours < 12)) { //周二晚上十点到周三十二点
      this.showTab = 'kward'
    }
    this.judgeShare()  //判断是否为分享环境,请求相应的接口 
    this.getDefaultData()
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
      api.getDefault().then((res) => {
        if (res.data.response_status.code === 0) {
          const { step, gifts, balance } = res.data.response_data
          for (var item in gifts) {  //轉換禮物類型
            if (gifts[item].type == 1) {
              gifts[item].type = '作品'
            } else if (gifts[item].type == 2) {
              gifts[item].type = 'K房'
            }
          }
          this.activite = step //活動狀態
          this.gifts = gifts  //禮物
          this.balance = balance //餘額
          this.$store.commit("changHistoryList", gifts)
        }
      })
    },
    buyWards(value) { //当前礼物id的当前礼物数组索引
      if (this.isShare) {
        APP()
        return
      } else if (this.activite === 0) {
        this.tastMsg = "活動未開始"
        this.colued = 0
        this.showT = true
      } else if (this.activite === 2) {
        this.tastMsg = "活動已結束"
        this.colued = 0
        this.showT = true
      } else if (this.balance < this.gifts[value].price) {
        this.tastMsg = "抱歉，您的金幣餘額不足，無法購買</br>快去儲值吧！"
        this.colued = 0
        this.showT = true
      } else if (this.balance >= this.gifts[value].price) {
        this.tastMsg = `您即將購買"${this.gifts[value].name}"${this.gifts[value].type}背包禮物,</br>購買後不可取消唷~ `
        this.colued = 1
        this.showT = true
        this.buyWardId = value
      }
    },
    buyed() {
      this.showT = false
      api.buy(this.buyWardId).then((res) => { //購買禮物
        if (res.data.response_status.code === 0) { // 購買成功
          this.balance -= this.gifts[this.buyWardId].price  //注意。購買成功后要減去當前餘額
          this.tastMsg = "購買成功,請在我-背包中查看哦~"
          this.colued = 0
          this.showT = true
        } else if (res.data.response_status.code === 20005) {
          this.tastMsg = "抱歉，您的金幣餘額不足，無法購買</br>快去儲值吧！"
          this.colued = 0
          this.showT = true
        }
      })
    },
    changTab(tab) {
      this.showTab = tab
    },
    share() {
      APP()
    },
    goHistory() {
      if (this.isShare) {
        APP()
        return
      } else {
        let regstr = getString('token')
        location.href = `./index3.html?token=${regstr}`
      }
    },
    // showHistory(){
    //     api.bugHistory().then((res) =>{
    //         var historyList = res.data.response_data
    //         this.$store.commit("changWardsList",historyList)
    //         this.showHistoryTos = true
    //     })
    // },
    refrsh() { //刷新
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      this.getDefaultData()
    },
    closeToast() {
      this.showT = false
    }
  }
}
</script>
<style lang='scss'>
body {
  background-color: #6d2883;
  padding-bottom: 1.1rem;
  -webkit-text-size-adjust: none;
}
.box {
  max-width: 7.5rem;
  position: relative;
  margin: auto;
  background: url(../assets/img/banner.png) center 0 no-repeat;
  background-size: 100% auto;
  overflow-x: hidden;
  .shareBar {
    display: block;
    height: 1.2rem;
    background: url(../assets/img/share_bar.png) no-repeat;
    background-size: 100% 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
  }
  .header {
    height: 7.21rem;
    .history {
      display: block;
      width: 1.63rem;
      height: 0.6rem;
      background: url(../assets/img/詳情按鈕.png) no-repeat;
      background-size: 100% 100%;
      padding-top: 0.17rem;
      position: absolute;
      top: 1.06rem;
      right: -0.1rem;
      &.mt {
        top: 2rem;
      }
      em {
        font-weight: bold;
        margin-left: 0.36rem;
        font-size: 90%;
        background-image: -webkit-linear-gradient(bottom, #efae7e, #edeee6);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    .rules {
      display: block;
      width: 1.63rem;
      height: 0.6rem;
      background: url(../assets/img/詳情按鈕.png) no-repeat;
      background-size: 100% 100%;
      padding-top: 0.17rem;
      position: absolute;
      top: 0.2rem;
      right: -0.1rem;
      &.mtT {
        top: 1.3rem;
      }
      em {
        font-weight: bold;
        margin-left: 0.36rem;
        font-size: 90%;
        background-image: -webkit-linear-gradient(bottom, #efae7e, #edeee6);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
  .discountCon {
    height: 22.19rem;
    background: url(../assets/img/礼物折扣背景.png);
    background-size: 100% 100%;
    padding-top: 0.52rem;
    .discountTitle {
      height: 0.98rem;
      margin: -0.45rem 0.93rem 0;
      .ward {
        display: inline-block;
        width: 2.61rem;
        height: 0.98rem;
        background: url(../assets/img/作品未点击.png) no-repeat;
        background-size: 100% 100%;
        &.active {
          background: url(../assets/img/作品点击.png) no-repeat;
          background-size: 100% 100%;
        }
      }
      .kward {
        display: inline-block;
        width: 2.61rem;
        height: 0.98rem;
        background: url(../assets/img/K房未点击.png) no-repeat;
        background-size: 100% 100%;
        margin-left: 0.25rem;
        &.active {
          background: url(../assets/img/K房点击.png) no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .wardsList {
      margin-top: 1.3rem;
      padding: 0 0.51rem;
      li {
        height: 2rem;
        padding: 0.2rem 0 0.5rem 0;
        // display: flex;
        // justify-content: space-between;
        border-bottom: 0.01rem solid #8535c9;
        &.astTop {
          height: 1.8rem;
          padding-top: 0.33rem;
          .wardsMsg {
            margin-top: 0.15rem;
          }
        }
        img {
          width: 1.95rem;
          height: 2.16rem;
          float: left;
        }
        .minImg {
          height: 1.95rem;
        }
        .imgBox {
          position: relative;
          .wardsType {
            display: block;
            width: 1.16rem;
            height: 0.68rem;
            background: url(../assets/img/K房小標籤.png) no-repeat;
            background-size: 100% 100%;
            position: absolute;
            top: -0.2rem;
          }
        }
      }
    }
    .wardsMsg {
      width: 2.5rem;
      display: flex;
      flex-direction: column;
      margin: 0.32rem 0 0 0.1rem;
      float: left;
      .wardName {
        color: #f0ebf3;
        font-size: 113%;
      }
      .priceBox {
        width: 2.7rem;
        display: flex;
        align-items: center;
        margin-top: 0.15rem;
        .shandian {
          display: inline-block;
          width: 0.19rem;
          height: 0.26rem;
          background: url(../assets/img/闪电.png) no-repeat;
          background-size: contain;
        }
        .zhe {
          color: #33d7de;
          font-weight: 600;
          margin-left: 0.05rem;
          white-space: nowrap;
        }
        .originalPrice {
          font-size: 85%;
          white-space: nowrap;
          color: #cf82e7;
          transform: scale(0.8);
        }
      }
      .termOfValidity {
        width: 1.5rem;
        height: 0.4rem;
        font-size: 85%;
        color: rgba(253, 87, 86, 1);
        border: 0.015rem solid rgba(253, 87, 86, 1);
        border-radius: 0.15rem;
        text-align: center;
        line-height: 0.35rem;
        box-sizing: border-box;
        margin-top: 0.2rem;
        transform: scale(0.8);
      }
    }
    .nowPriceBox {
      .nowPrice {
        text-align: right;
        color: #ffe053;
        white-space: nowrap;
        margin-top: 0.4rem;
      }
      span {
        display: block;
        float: right;
        width: 1.64rem;
        height: 0.54rem;
        text-align: center;
        background: linear-gradient(
          -3deg,
          rgba(253, 87, 86, 1),
          rgba(252, 119, 101, 1)
        );
        border-radius: 0.08rem;
        line-height: 0.54rem;
        margin-top: 0.33rem;
      }
    }
  }
}
.refresh {
  display: block;
  width: 0.94rem;
  height: 0.94rem;
  position: fixed;
  left: 0.08rem;
  bottom: 1.35rem;
  background: url(../assets/img/refrsh.png) no-repeat;
  background-size: contain;
  transition: all 1s;
}
</style>


