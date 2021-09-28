<template>
  <div class="rankGroupsFriend">
    <!-- <div :style="{background:'#7a68f8',height:navigatorHeight}"></div> -->
    <!-- 日榜、总榜切换主Tabs -->
    <div class="mainTabs">
      <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" href="">{{lang.friend_tab1}}</a>
      <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" href="">{{lang.friend_tab2}}</a>
      <!-- <div class="risk-active-line" :class="[mainTab == 1?'risk-active-line-f':'risk-active-line-r']"></div> -->
    </div>

    <div class="data no_spacing" v-if="mainTab==0">
      <div class="pro_top" v-if="live_flag">
        <div class="inner">
          <div class="scroll_title_tab1">
            <span class="anchor">{{lang.title_type1}}</span>
            <span class="pro_top">{{lang.pro_top}}</span>
            <span class="pro_top2">{{lang.pro_top2}}</span>
          </div>
          <div class="rank_list scrollable" :style="{height:(viewHeight-topHeight-navigatorHeight2)+'px',}">
            <inner-scroll-load-list :url="live_url" :parse="dayDataParse" :reset='reset'>
              <div slot-scope="{list, loading, none, end}">
                <liveItemFriend v-for="(item,index) in list" :info="item" :key="index" />
                <div v-show="loading" class="sloading_inner">{{lang.loading}}</div>
                <div v-show="none" class="snone_inner">{{lang.no_data}}</div>
                <div v-show="end" class="send_inner"></div>
              </div>
            </inner-scroll-load-list>
          </div>
        </div>
      </div>
    </div>

    <div class="data brick" v-if="mainTab==1&&is_done">
      <div class="top">
        <div>
          <span>{{getMonthShowTime()}}</span>
          <span @click="choose()"></span>
        </div>
        <div class="help" @click="openRule()"></div>
      </div>
      <div class="pro_top" v-if="month_flag">
        <div class="inner">
          <p class="total">
            <span>{{lang.settlement_title}}</span>
            <img src="../img/mey_icon.png" alt="">
            <span>{{monthTotalCoins}}</span>
            <img src="../img/vedio.png" alt="">
            <span>{{videoJewelCnt}}</span>
          </p>
          <div class="scroll_title">
            <span>{{lang.title_type1}}</span>
            <span>{{lang.settlement_coins}}</span>
            <span>{{lang.settlement_tm}}</span>
          </div>
          <div class="rank_list scrollable" :style="{height:(viewHeight-topHeight-navigatorHeight2)+'px',}">
            <inner-scroll-load-list :url="month_url" :parse="monthDataParse" :reset='reset' :notPaging="true">
              <div slot-scope="{list, loading, none, end}">
                <liveItemBrick v-for="(item,index) in list" :info="item" :key="index" />
                <div v-show="loading" class="sloading_inner">{{lang.loading}}</div>
                <div v-show="none" class="snone_inner">{{lang.no_data}}</div>
                <div v-show="end" class="send_inner"></div>
              </div>
            </inner-scroll-load-list>
          </div>
        </div>
      </div>
    </div>

    <van-popup v-model="show" position="bottom" round :style="{ height: '40%' }">
      <!-- <van-datetime-picker v-model="currentDateDay" type="date" title="" :min-date="minDate" :max-date="maxDate" :confirm-button-text=lang.confirm :cancel-button-text=lang.cancel
        @confirm="confirmTime(0)" @cancel="cancelTime()" :swipe-duration="50" /> -->
      <van-datetime-picker v-model="currentDate" type="date" :min-date="minDateMounth" :max-date="maxDateMounth" :confirm-button-text="setType == 1?lang.next:lang.confirm"
        :cancel-button-text="lang.cancel" @confirm="confirmTime(1)" @cancel="cancelTime()" :swipe-duration="50" :title="setType == 1?lang.setStartTime:lang.setEndTime " />
    </van-popup>

    <van-popup v-model=" rule_show" position="bottom" round :style="{ height: '70%',}">
      <div class="rule_box">
        <p>{{lang.rule_pickTitle}}</p>
        <!-- <p class="rule_tips">{{lang.rule_tips}}</p> -->
        <ol>
          <li v-for="i in lang.rule_pickLi.length" :key="i">
            <i>{{i}}</i>
            <strong v-html="lang.rule_pickLi[i-1]"></strong>
          </li>
        </ol>
      </div>
    </van-popup>

  </div>
</template>

<script>

import Vue from 'vue';
import axios from 'axios';
import { mapState } from 'vuex';
import { getUrlString, getTimeObj, getAppVer, getPlatform } from '../utils';
import { setFullScreen, setStatusBarStyle, getStatusBarHeight, callAppNew } from '../utils/navigation';
import { getDayInfo, getMonthInfo } from '../apis';
import InnerScrollLoadList from '../components/InnerScrollLoadList';
import liveItemFriend from "../components/liveItem_friend"
import liveItemBrick from "../components/liveItem_brick"
const uid = getUrlString("uid");
const token = getUrlString("token");
const lang = getUrlString("lang");
const rid = getUrlString("rid");
//可设置初始化日子
const mTime = new Date(2021, 2, 1);
const htmlFont = parseInt(getComputedStyle(window.document.documentElement)['font-size']);


export default {
  // mixins: [mixin],
  data () {
    return {
      navigatorHeight: 0,
      navigatorHeight2: 0,
      topHeight: 0,
      mainTab: 0,
      rule_show: false,
      rule_flag: false,

      send_month: '',
      init_data: {},
      month_data: {},
      is_done: false,
      is_done_day: false,
      minDate: mTime,
      minDateMounth: mTime,
      maxDate: new Date(),
      maxDateMounth: new Date(),
      currentDate: new Date(),
      currentDateDay: new Date(),
      show: false,
      tips: "",
      stime: 0,
      etime: 0,

      room_flag: false,
      room_url: '',
      live_flag: false,
      live_url: '',

      shijiancuo: new Date() / 1000,
      shijiancuo_month: new Date() / 1000,

      confirm_day_time: '',
      confirm_month_time: String(this.format(new Date().getTime() / 1000)),
      isLoad: false,
      reset: false,

      dayTotalCoins: 0,
      monthTotalCoins: 0,
      videoJewelCnt: 0,
      month_flag: false,
      month_url: '',//月地址
      reset: false,

      //ccj
      monthStart: '',
      monthEnd: '',
      setType: 1
    };
  },
  created () {
    const pt = getPlatform();
    const ver = getAppVer();
    if ((pt == 'ios' && ver >= 165) || pt == 'android') {
      this.navigatorHeight = getStatusBarHeight() + 'px';
      this.navigatorHeight2 = getStatusBarHeight()
    }
  },
  computed: {
    ...mapState(['loading', 'my_info', 'rankGroups']),
    viewHeight: () => window.innerHeight,
    mountStarStr () {
      return `${getTimeObj(this.monthStart).year}-${getTimeObj(this.monthStart).month}-${getTimeObj(this.monthStart).day}`
    },
    mountEndStr () {
      return `${getTimeObj(this.shijiancuo_month).year}-${getTimeObj(this.shijiancuo_month).month}-${getTimeObj(this.shijiancuo_month).day}`
    }
    // topHeight:()=>{
    //     var htmlFont = parseInt(getComputedStyle(window.document.documentElement)['font-size']);
    //     console.log(htmlFont);
    //     return parseInt(5.62)*htmlFont;
    // }
  },
  mounted () {
    this.$store.dispatch('getGuildInfo');
    var now = Date.parse(new Date());
    this.live_flag = true;
    this.confirm_day_time = String(this.formatDay(this.shijiancuo));
    this.live_url = '/index.php?action=Action/Anchor.getAnchorPinkJewel&uid={uid}&token={token}&page={page}' + '&lang=' + lang;
  },
  watch: {
    confirm_day_time () {
      this.isLoad = true;
    },
    // confirm_month_time(){
    //     return String(this.format(new Date().getTime()/1000));
    // }
  },
  methods: {
    getDayShowTime () {
      return this.lang.day_time.replace('{0}', getTimeObj(this.shijiancuo).year).replace('{1}', getTimeObj(this.shijiancuo).month).replace('{2}', getTimeObj(this.shijiancuo).day);
    },
    getDayShowTimeInner () {
      return this.lang.day_time_inner.replace('{0}', getTimeObj(this.shijiancuo).year).replace('{1}', getTimeObj(this.shijiancuo).month).replace('{2}', getTimeObj(this.shijiancuo).day);
    },
    getMonthShowTime () {
      return this.lang.month_time.replace('{0}', getTimeObj(this.monthStart).year).replace('{1}', getTimeObj(this.monthStart).month).replace('{2}', getTimeObj(this.monthStart).day) + '-' + this.lang.month_time.replace('{0}', getTimeObj(this.shijiancuo_month).year).replace('{1}', getTimeObj(this.shijiancuo_month).month).replace('{2}', getTimeObj(this.shijiancuo_month).day);
    },
    openRule () {
      this.rule_show = !this.rule_show;
    },
    getHour (seconds) {
      return (seconds / 60 / 60).toFixed(1);
    },

    async mainTabClick (tab) {
      this.mainTab = tab;
      if (tab == 1) {//月数据
        // console.log(this.confirm_month_time);
        // return;
        // if(!this.is_done){
        // this.live_flag = false;
        // console.log(this.confirm_month_time);
        this.reset = !this.reset;
        this.month_flag = true;
        var nowmonth = new Date().getTime();
        var today = String(this.format(nowmonth / 1000));
        // this.shijiancuo_month = new Date().getTime()/1000;

        //ccj
        this.monthStart = this.getOneDay()
        this.is_done = true;
        this.month_url = '/index.php?action=Action/Anchor.getAnchorPinkJewelSettlement&uid={uid}&token={token}&page={page}&ym=' + this.confirm_month_time + '&lang=' + lang + '&startDate=' + this.mountStarStr + '&endDate=' + this.mountEndStr

        // const info = await getMonthInfo(today);
        // if (info.data) {
        //     const {response_status, response_data} = info.data;
        //     if (response_status.error == ''){
        //         Object.assign(this.month_data, response_data);
        //         this.is_done = true;
        //         console.log(this.month_data);
        //     }else{
        //         this.$alert(response_status.error.replace(/\[\d+\]/, ''));
        //     }
        // }
        // }
      } else {
        this.reset = !this.reset;
      }
    },

    choose () {
      if (!this.show) {
        this.show = true;
      } else {
        this.show = false;
      }
    },
    async confirmTime (type) {//0日，1月
      if (type == 0) {
        // console.log('日');
        var send_time = String(this.formatDay(this.currentDateDay.getTime() / 1000));
        this.shijiancuo = this.currentDateDay.getTime() / 1000;
        this.show = false;
        this.reset = !this.reset;
        this.confirm_day_time = send_time;
        this.live_url = '/index.php?action=Action/Anchor.getAnchorPinkJewel&uid={uid}&token={token}&page={page}' + '&lang=' + lang;

      } else {
        //ccj
        if (this.setType == 1) {
          console.log(new Date(this.currentDate.getTime() + 86400000 * 31))
          this.monthStart = this.currentDate.getTime() / 1000
          this.minDateMounth = new Date(this.currentDate)
          this.maxDateMounth = new Date(this.currentDate.getTime() + 86400000 * 31)
          this.setType = 2
        } else {
          this.setType = 1
          this.minDateMounth = mTime
          this.maxDateMounth = new Date()
          var send_month_time = String(this.format(this.currentDate.getTime() / 1000));
          this.confirm_month_time = send_month_time;
          this.shijiancuo_month = this.currentDate.getTime() / 1000;
          this.show = false;
          this.reset = !this.reset;
          this.month_url = '/index.php?action=Action/Anchor.getAnchorPinkJewelSettlement&uid={uid}&token={token}&page={page}&ym=' + send_month_time + '&lang=' + lang + '&startDate=' + this.mountStarStr + '&endDate=' + this.mountEndStr
        }
        // return;
        // var send_month_time = String(this.format(this.currentDate.getTime() / 1000));
        // this.shijiancuo_month = this.currentDate.getTime() / 1000;
        // const info = await getMonthInfo(send_month_time);
        // if (info.data) {
        //   const { response_status, response_data } = info.data;
        //   if (response_status.error == '') {
        //     console.log(this.month_data);
        //     if (response_data && response_data.length == 0) {
        //       this.$alert(this.lang.no_data);
        //       return;
        //     }
        //     this.show = false;
        //     this.month_data = {};
        //     this.month_data = response_data;
        //   } else {
        //     this.$alert(response_status.error.replace(/\[\d+\]/, ''));
        //   }
        // }
      }
    },
    cancelTime () {
      this.show = false;
      //ccj
      this.monthStart = this.getOneDay()
      this.minDateMounth = mTime
      this.maxDateMounth = new Date()
      this.setType = 1
    },

    dayDataParse (data) {
      // console.log(data);
      var htmlFont = parseInt(getComputedStyle(window.document.documentElement)['font-size']);
      this.dayTotalCoins = data.response_data.coins;
      this.topHeight = parseInt(5.62) * htmlFont
      if (!data.response_status.code) {
        return data.response_data.list || [];

      } else {
        return [];
      }
    },

    closeVan () {
      // if(this.room_flag == true){
      //     // 是否重新加载
      setTimeout(() => {
        this.live_flag = false;
        this.room_flag = false;
      }, 500)
      // }
    },

    monthDataParse (data) {
      this.monthTotalCoins = data.response_data.pinkJewelCnt;
      this.videoJewelCnt = data.response_data.videoJewelCnt;
      if (!data.response_status.code) {
        return data.response_data.list || [];
        // return [//详细主播的粉钻余额
        //   {
        //     "uid": 1234,//主播uid
        //     "nick": "昵称",//主播昵称
        //     "avatar": "http://XXX",//主播头像
        //     "pinkJewel": -1000,//结算粉钻
        //     "opTime": "2021-05-25 09:00:00"//结算时间，格式yyyy-MM-dd HH:mm:ss
        //   }
        // ]
      } else {
        return [];
      }
    },



    formatDay (nows) {
      var now = new Date(nows * 1000);
      var year = now.getFullYear();
      var month = now.getMonth() + 1 >= 10 ? now.getMonth() + 1 : '0' + (now.getMonth() + 1);
      var date = now.getDate() >= 10 ? now.getDate() : '0' + now.getDate();
      var hour = now.getHours() >= 10 ? now.getHours() : '0' + now.getHours();
      var minute = now.getMinutes() >= 10 ? now.getMinutes() : '0' + now.getMinutes();
      var second = now.getSeconds() > 10 ? now.getSeconds() : '0' + now.getSeconds();
      return year + "-" + month + "-" + date;
    },
    showformat (nows) {
      var now = new Date(nows * 1000);
      var year = now.getFullYear();
      var month = now.getMonth() + 1 >= 10 ? now.getMonth() + 1 : '0' + (now.getMonth() + 1);
      var date = now.getDate() >= 10 ? now.getDate() : '0' + now.getDate();
      var hour = now.getHours() >= 10 ? now.getHours() : '0' + now.getHours();
      var minute = now.getMinutes() >= 10 ? now.getMinutes() : '0' + now.getMinutes();
      var second = now.getSeconds() > 10 ? now.getSeconds() : '0' + now.getSeconds();
      return year + "." + month;
    },
    format (nows) {
      var now = new Date(nows * 1000);
      var year = now.getFullYear();
      var month = now.getMonth() + 1 >= 10 ? now.getMonth() + 1 : '0' + (now.getMonth() + 1);
      var date = now.getDate() >= 10 ? now.getDate() : '0' + now.getDate();
      var hour = now.getHours() >= 10 ? now.getHours() : '0' + now.getHours();
      var minute = now.getMinutes() >= 10 ? now.getMinutes() : '0' + now.getMinutes();
      var second = now.getSeconds() > 10 ? now.getSeconds() : '0' + now.getSeconds();
      return year + "-" + month;
    },
    showformatDay (nows) {
      var now = new Date(nows * 1000);
      var year = now.getFullYear();
      var month = now.getMonth() + 1 >= 10 ? now.getMonth() + 1 : '0' + (now.getMonth() + 1);
      var date = now.getDate() >= 10 ? now.getDate() : '0' + now.getDate();
      var hour = now.getHours() >= 10 ? now.getHours() : '0' + now.getHours();
      var minute = now.getMinutes() >= 10 ? now.getMinutes() : '0' + now.getMinutes();
      var second = now.getSeconds() > 10 ? now.getSeconds() : '0' + now.getSeconds();
      return month + "." + date;
    },
    //ccj
    getOneDay () {
      //获取本月第一天零点零分零秒
      var data = new Date();
      data.setDate(1);
      data.setHours(0);
      data.setSeconds(0);
      data.setMinutes(0);
      return data.getTime() / 1000
    }
  },
  components: {
    InnerScrollLoadList,
    liveItemFriend,
    liveItemBrick
  }
}
</script>

<style lang="scss">
body {
  background-color: #10093C;
  font-family: 'San Francisco', 'Helvetica Neue', Helvetica, Arial,
    'PingFang SC', 'Noto Sans CJK', 'Droid Sans', 'Droid Sans Fallback',
    'Microsoft YaHei UI', 'Microsoft YaHei', sans-serif;
}
.van-picker__confirm {
  color: #7A68F8;
}
.rankGroupsFriend {
  position: relative;
  .mainTabs {
    width: 5rem;
    height: 0.8rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 0.41rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    a {
      width: 2.4rem;
      height: 0.6rem;
      line-height: 0.6rem;
      border-radius: 0.3rem;
      text-align: center;
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.28rem;
      &.current {
        background: rgba(255, 255, 255, 1);
        color: rgba(16, 9, 60, 1);
        // background: url(../img/rank_tab_act.png);
        // background-size: 100% 100%;
      }
    }
  }
  .myInfo {
    margin-top: 0.3rem;
    padding: 0 0.3rem;
    display: flex;
    justify-content: space-between;
    font-size: 0;
    div:nth-of-type(1) {
      span {
        display: inline-block;
      }
      span:nth-of-type(1) {
        font-size: 0.28rem;
        font-weight: bold;
        line-height: 0.4rem;
        color: rgba(255, 255, 255, 0.6);
      }
      span:nth-of-type(2) {
        width: 0.01rem;
        height: 0.18rem;
        background-color: rgba(255, 255, 255, 0.3);
        margin: 0 0.1rem;
      }
      span:nth-of-type(3) {
        font-size: 0.24rem;
        line-height: 0.33rem;
        color: rgba(255, 255, 255, 0.3);
      }
    }
    div:nth-of-type(2) {
      font-size: 0.24rem;
      line-height: 0.33rem;
      color: #8C8995;
    }
  }

  .data {
    width: 6.9rem;
    // height: 3.98rem;
    background: linear-gradient(
      135deg,
      rgba(246, 90, 110, 0.1) 0%,
      rgba(182, 118, 240, 0.1) 64%,
      rgba(125, 125, 246, 0.1) 100%
    );
    border-radius: 0.2rem;
    margin: 0.3rem auto 0.3rem;
    padding: 0.35rem 0 0.3rem;
    box-sizing: border-box;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.3rem;
      > div {
        display: inline-block;
      }
      > div:nth-of-type(1) {
        font-size: 0;
        span {
          display: inline-block;
          vertical-align: middle;
        }
        span:nth-of-type(1) {
          font-size: 0.28rem;
          font-weight: bold;
          line-height: 0.46rem;
          color: rgba(255, 255, 255, 0.3);
          margin-right: 0.1rem;
        }
        span:nth-of-type(2) {
          width: 0.54rem;
          height: 0.4rem;
          background: url('../img/arrow_down.png');
          background-size: 100% 100%;
        }
      }
      > div:nth-of-type(2) {
        width: 0.42rem;
        height: 0.42rem;
        background: url('../img/help.png');
        background-size: 100% 100%;
      }
    }
    &.no_spacing {
      padding: 0 0 0.3rem;
      .pro_top {
        padding-top: 0;
      }
      .scroll_title {
        display: flex;
        align-items: center;
        span {
          flex: 1;
        }
      }
    }
    &.brick {
      .scroll_title {
        display: flex;
        align-items: center;
        span {
          flex: 1;
        }
      }
    }
  }

  .detail {
    padding: 0 0.3rem;
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 1.28rem;
      span {
        display: inline-block;
      }
      span:nth-of-type(1) {
        font-size: 0.32rem;
        color: #FFFFFF;
      }
      span:nth-of-type(2) {
        width: 0.42rem;
        height: 0.42rem;
        background: url('../img/arrow_right.png');
        background-size: 100% 100%;
      }
    }
  }
  .van-overlay {
    // background-color: #ccc;
  }
  .van-popup--bottom.van-popup--round {
    border-radius: 0.2rem 0.2rem 0 0;
  }
  .rule_box {
    p:nth-of-type(1) {
      font-size: 0.36rem;
      font-weight: bold;
      color: #2C2B36;
      padding: 0.4rem 0 0.32rem 0;
      text-align: center;
    }
    p:nth-of-type(2) {
      font-size: 0.26rem;
      line-height: 0.37rem;
      color: #2C2B36;
      opacity: 1;
      padding: 0 0 0.1rem 0.3rem;
    }
    ol {
      li {
        padding-bottom: 0.23rem;
        display: flex;
        flex-wrap: nowrap;
        padding: 0 0.3rem;
        margin-bottom: 0.1rem;
        i {
          box-sizing: border-box;
          margin-top: 0.08rem;
          margin-right: 0.1rem;
          width: 0.3rem;
          height: 0.3rem;
          line-height: 0.3rem;
          font-size: 0.24rem;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          background: url('../img/bg_num.png');
          background-size: 100% 100%;
          color: #fff;
        }
        strong {
          flex: 1;
          font-size: 0.26rem;
          line-height: 0.46rem;
          color: #2C2B36;
        }
      }
    }
  }

  .pro_top {
    padding-top: 0.21rem;
    .inner {
      // height: 9rem;
      position: relative;
      padding-bottom: 1rem;
      .total {
        width: 6.9rem;
        height: 0.46rem;
        line-height: 0.46rem;
        background: linear-gradient(
          81deg,
          rgba(234, 234, 242, 0) 0%,
          rgba(234, 234, 242, 0) 0%,
          rgba(255, 255, 255, 0.1) 18%,
          rgba(255, 255, 255, 0.1) 85%,
          rgba(234, 234, 242, 0) 100%
        );
        border-radius: 0.23rem;
        display: flex;
        align-items: center;
        padding-left: 0.2rem;
        box-sizing: border-box;
        margin-bottom: 0.2rem;
        span,
        img {
          display: inline-block;
          vertical-align: middle;
        }
        span {
          font-size: 0.28rem;
          line-height: 0.4rem;
          color: #D1D0DC;
          -webkit-text-stroke: 1 rgba(0, 0, 0, 0);
          text-stroke: 1 rgba(0, 0, 0, 0);
          opacity: 1;
        }
        img {
          opacity: 1;
          width: 0.3rem;
          height: 0.3rem;
          margin: 0 0.1rem;
        }
      }
      .scroll_title_tab1 {
        width: 6.9rem;
        height: 0.88rem;
        display: flex;
        align-items: center;
        text-align: center;
        .anchor {
          width: 3.45rem;
        }
        .pro_top,
        .pro_top2 {
          flex: 1;
        }
      }
      .scroll_title {
        width: 6.9rem;
        height: 0.88rem;
        display: flex;
        align-items: center;
        span {
          display: inline-block;
          font-size: 0.24rem;
          color: #999;
          text-align: center;
        }
        span:nth-of-type(1) {
          width: 2.6rem;
          // background-color: #fff;
        }
        span:nth-of-type(2) {
          width: 1.7rem;
          // background-color: red;
        }
        span:nth-of-type(3) {
          width: 1.3rem;
          // background-color: #ff8022;
        }
        span:nth-of-type(4) {
          width: 1.3rem;
          // background-color: blue;
        }
      }
      .scrollable {
        // height: 8.5rem;
        overflow: auto;
        margin: 0 auto;
        // padding-bottom: 1.2rem;
      }
      .scrollable::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 0; /*高宽分别对应横竖滚动条的尺寸*/
        height: 0;
      }
      .scrollable::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
      }
      .sloading_inner,
      .snone_inner,
      .send_inner {
        text-align: center;
        font-size: 0.26rem;
        color: #5C5B67;
        padding-top: 0.4rem;
      }
      .snone_inner {
        padding-top: 2rem;
      }
      // .rankItem_box:nth-of-type(-1) {
      //     background-color: #ccc;
      // }

      // .rankItem_box:nth-of-type(116){
      //     background-color: #ccc;
      // }
      // .rankItem_box:last-child{
      //     .rankItem{
      //         border:none;
      //     }
      // }
    }
  }

  .bounce-enter-active {
    animation: bounce-in 0.4s;
  }
  .bounce-leave-active {
    animation: bounce-in 0.4s reverse;
  }
  @keyframes bounce-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>
