<template>
  <div class="redPactets">
    <div class="packet">
      <div class="packetBar">
        <em class="min">0</em>
        <em class="max">{{redPacket.step}}</em>
        <div class="actBar" :style="{width:redPacket.current/redPacket.step * 100 +'%'}">
          <span class="store">
            <i class="tips">{{redPacket.current}}</i>
          </span>
        </div>
      </div>
    </div>
    <div class="redTips">
      يمكن لجميع المستخدمين أن يفتحوا المغلف الأحمر المحظوظ بعد أن تتلقي الأعمال التي تشترك في هذه المسابقة {{redPacket.step}}<i></i> هدية تاج
    </div>
    <div class="subscribe" @click="subscribe()">
      {{redPacket.subscribe?'إلغاء الموعد':'ضرب الموعد للمغلف'}}
    </div>
    <div class="lastOpenPacketPeople" v-if="naming.uid">
      <div class="title">المغلف الأحمر السابقة تحت دعم المطرب التالي</div>
      <div class="people">
        <div class="imgBox" @click="goSong(naming.sid)">
          <img v-lazy="naming.avatar" alt="" class="av">
          <span class="br"></span>
        </div>
        <div class="nick">{{naming.nick}}</div>
        <div class="score">
          <i></i>
          <strong>{{naming.count}}x</strong>
        </div>
      </div>
    </div>

    <!-- 倒计时红包 -->
    <div class="mask" v-show="redPacket_downTime">
      <transition name="slide">
        <div class="downTimePacket" v-if="redPacket_downTime" :class="{open:packetType == 2}">
          <i class="close" @click="redPacket_downTime = false"></i>
          <h5 v-if="packetType == 1">العد التنازلي لفتح المغلف الأحمر المحظوظ</h5>
          <div class="timeDown" v-if="packetType == 1">سيصل مغلفك الأحمر إليك خلال <em>{{downTime}}</em> ثانية</div>
          <span class="rotate" v-if="packetType == 2" @click="openRedPacket()"></span>
          <vue-seamless-scroll :class-option="optionHover" :data="redPacket.record" class="seamless-warp">
            <ul class="item">
              <li v-for="(item,index) in redPacket.record" :key="index">
                <img :src="item.avatar" alt="" v-if="item.avatar" @click="goUser(item.uid)">
                <img src="../assets/img/default.png" alt="" v-else @click="goUser(item.uid)">
                <strong><em class="nick">{{item.nick}}</em> يحصل على {{item.count}} تاج</strong>
              </li>
            </ul>
          </vue-seamless-scroll>
          <div class="share" v-if="packetType == 1" @click="shareAct()">تذكير الأصدقاء</div>
        </div>
      </transition>
    </div>
    <!-- 开紅包结果 -->
    <div class="mask" v-show="packetRes">
      <transition name="slide">
        <div class="packetRes" v-if="packetRes">
          <i class="close" @click="closePacketPup()"></i>
          <div class="resHeader">
            <div class="title">{{coins?'مبروك للحصول':'أنت بطيء، قد تم اقتسام المغلف الأحمر'}}</div>
            <div class="coins" v-if="coins">
              <span>{{coins}}</span>
              <span class="icon"></span>
            </div>
          </div>
          <div class="resBottom">
            <div class="bar"></div>
            <div class="resBtn" @click="redPacketHistory()">نظر تفاصيل الاستلام>></div>
          </div>
        </div>
      </transition>
    </div>
    <!-- 开奖详情 -->
    <div class="mask" v-show="packetRecore">
      <transition name="slide">
        <div class="packetRecord" v-show="packetRecore">
          <i class="close" @click="closePacketPup()"></i>
          <!-- <p class="red">{{dtime}}</p> -->
          <div class="resHeader">
            <div class="tips" v-if="recoreData.time">{{recoreData.users}} مغلف أحمر، وتم اقتسامها أثناء {{recoreData.time}} ثانية</div>
            <div class="tips" v-else>
              <span>تم الاستلام {{recoreData.users}}\{{recoreData.gotUsers}}، </span>
              <span>و{{recoreData.gotCoins}}\{{recoreData.coins}} عملة</span>
            </div>
          </div>
          <ul class="recoreList">
            <li v-for="(item,index) in recoreData.list" :key="index" @click="goUser(item.uid)">
              <img v-lazy="item.avatar" alt="" class="av">
              <div class="msg">
                <div class="nick">{{item.nick}}</div>
                <div class="tm">{{getDate(item.time)}}</div>
              </div>
              <div class="gift">
                <div class="nums">{{item.coin}} عملات</div>
                <div class="luck" v-if="item.lucky"><i></i> أفضل الحظ</div>
              </div>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import api from "../api/apiConfig"
import { mapState } from "vuex"
import getDate from "../utils/getDate"
import { globalBus } from '../utils/eventBus'
import getString from "../utils/getString"
import store from "../store/stores"

export default {
  data() {
    return {
      redPacket_downTime: false,  //倒计时红包
      packetRes: false,  //开红包后的结果
      packetRecore: false,
      downTime: 0,
      packetType: 1,
      coins: null,  //有没有抢到 有为数值
      recoreData: {},
      loaded: false,
      more: true,
      timer: null,
      timer2: null,
      dtime: 0
    }
  },
  computed: {
    ...mapState(['redPacket', 'naming', 'reg']),
    optionHover() {
      return {
        limitMoveNum: 4,
        hoverStop: false,
        openTouch: false,
        autoPlay: true,
      }
    }
  },
  watch: {
    redPacket(val) {
      this.dtime = val.dtime
      if (typeof (val.dtime) != 'undefined' && this.timer2 == null) {
        this.nextRedPacket(val.dtime * 1000)
      }
      if (val.status == 1) { //红包倒计时
        this.packetType = 1
        this.redPacket_downTime = true
        this.downTime = val.time
        this.downTimeGo()
      } else if (val.status > 0 && !val.hide && (this.redPacket.coins > 0 || this.redPacket.lose === true) && this.redPacket.coins > 0) {  //抢到了展示记录
        this.redPacketHistory()
      } else if (val.status > 0 && !val.hide && (this.redPacket.coins > 0 || this.redPacket.lose === true) && this.redPacket.coins == 0) {  //抢到了空
        this.redPacketHistory()
      } else if (val.status > 0 && !val.hide && !(this.redPacket.coins > 0 || this.redPacket.lose === true)) {  //没抢过
        this.packetType = 2
        this.redPacket_downTime = true
      }
    }
  },
  mounted() {
    this.scrollable = this.$el.querySelector('.recoreList');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
  },
  methods: {
    subscribe() {
      if (!this.reg) {
        this.vxc('setToast', {
          title: 'فشل في ضرب الموعد',
          msg: 'لم تشترك في المسابقة، لذلك لا يمكنك فتح المغلف الأحمر، انقر فوق "التسجيل" سريعا'
        })
        return
      }
      api.subscribe().then(res => {
        if (res.data.response_status.code == 0) {
          this.vxc('setSubscribe', res.data.response_data.status)
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    downTimeGo() {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.downTime--
        if (this.downTime <= 0) {
          clearInterval(this.timer)
          this.packetType = 2
        }
      }, 1000)
    },
    openRedPacket() {
      api.openRedPacket().then(res => {
        if (res.data.response_status.code == 0) {
          this.packetRes = true
          this.redPacket_downTime = false
          this.coins = res.data.response_data.coins
          if (typeof (res.data.response_data.dtime) != 'undefined' && this.timer2 == null) {
            this.dtime = res.data.response_data.dtime
            this.nextRedPacket(res.data.response_data.dtime * 1000)
          }
        } else {
          if (res.data.response_status.code != 20008) {
            this.toast(res.data.response_status.error)
          }
        }
      })
    },
    redPacketHistory() {
      api.redPacketHistory(0).then(res => {
        this.packetRecore = true
        // res.data.response_data
        this.recoreData = res.data.response_data
        if (!res.data.response_data.list.length) {
          this.nextRedPacket(0)
        }
        // {
        //   "users": 300, // 红包总人数
        //   "coins": 1088, // 红包总金币数
        //   "gotUsers": 1, // 已领取人数
        //   "gotCoins": 2, // 已领取金币数
        //   "time": 0, // 多少秒被抢完（0未抢完）
        //   "list": [ // 抢红包用户记录
        //     {
        //       "uid": 100880,
        //       "coin": 2,
        //       "time": 1604563101,
        //       "avatar": "http://img.17sing.tw/uc/img/head_100880_1591328073.png_small",
        //       "nick": "啾咪、欣戀",
        //       "lucky": false // 是否手气最佳
        //     },
        //     {
        //       "uid": 100880,
        //       "coin": 2,
        //       "time": 1604563101,
        //       "avatar": "http://img.17sing.tw/uc/img/head_100880_1591328073.png_small",
        //       "nick": "啾咪、欣戀",
        //       "lucky": false // 是否手气最佳
        //     },
        //     {
        //       "uid": 100880,
        //       "coin": 2,
        //       "time": 1604563101,
        //       "avatar": "http://img.17sing.tw/uc/img/head_100880_1591328073.png_small",
        //       "nick": "啾咪、欣戀",
        //       "lucky": false // 是否手气最佳
        //     },
        //     {
        //       "uid": 100880,
        //       "coin": 2,
        //       "time": 1604563101,
        //       "avatar": "http://img.17sing.tw/uc/img/head_100880_1591328073.png_small",
        //       "nick": "啾咪、欣戀",
        //       "lucky": false // 是否手气最佳
        //     },
        //     {
        //       "uid": 100880,
        //       "coin": 2,
        //       "time": 1604563101,
        //       "avatar": "http://img.17sing.tw/uc/img/head_100880_1591328073.png_small",
        //       "nick": "啾咪、欣戀",
        //       "lucky": false // 是否手气最佳
        //     },
        //     {
        //       "uid": 100880,
        //       "coin": 2,
        //       "time": 1604563101,
        //       "avatar": "http://img.17sing.tw/uc/img/head_100880_1591328073.png_small",
        //       "nick": "啾咪、欣戀",
        //       "lucky": false // 是否手气最佳
        //     }
        //   ]
        // }
      })
    },
    getDate(tm) {
      return getDate(new Date(tm * 1000), 1)
    },
    onScroll() {
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.loaded) return
        if (this.more) {
          this.more = false
          api.redPacketHistory(this.recoreData.list.length, 'more').then(res => {
            this.more = true
            this.recoreData.list = this.recoreData.list.concat(res.data.response_data.list)
            if (res.data.response_data.list.length < 20) {
              this.loaded = true
            }
          })
        }
      }
    },
    closePacketPup() {
      this.packetRes = false
      this.packetRecore = false
      // api.hideRedPacket()
    },
    goUser(uid) { //跳转
      location.href = `uid:${uid}`
    },
    goSong(sid) {
      location.href = 'songid:{"songlist":[' + sid + '],"index":0}';
    },
    shareAct() {
      api.report('packet')
      var ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      let uid = getString('uid')
      // console.log(this.chioneUserMsg)
      var data = {
        "share_title": `تعال! سيبدأ انفجار المغلفين الحمراء لمسابقة المطربين السحريين!`,
        "share_content": "انقر لضرب الموعد للمغلف، يمكن أن تتلقى رسالة التنبيه من النظام>>",
        "share_image": `http://activity.gosingapp.com/static_html/2020/songking2020/share.png?v=2`,
        "link": `http://activity.gosingapp.com/static_html/2020/songking2020/index.html?uid=#ID#&token=#TOKEN#`,
        "image": `http://activity.gosingapp.com/static_html/2020/songking2020/share.png?v=2`,
        "share_url": `http://activity.gosingapp.com/static_html/2020/songking2020/index.html?uid=#ID#&token=#TOKEN#`
      }
      if (ios) {
        if (window.share != undefined) {
          share(JSON.stringify(data))
        } else {
          location.href = `shareUserInfo://activity.17sing.tw/static_html/2020/songking2020/index.html?uid=#ID#&token=#TOKEN#&shareText=انقر لضرب الموعد للمغلف، يمكن أن تتلقى رسالة التنبيه من النظام>>&userImg=http://activity.gosingapp.com/static_html/2020/songking2020/share.png?v=2&title=تعال! سيبدأ انفجار المغلفين الحمراء لمسابقة المطربين السحريين!`;
        }
      } else {
        // javascript: JSInterface.share(JSON.stringify(data));
        javascript: JSInterface.share('http://activity.gosingapp.com/static_html/2020/songking2020/index.html?uid=#ID#&token=#TOKEN#', 'تعال! سيبدأ انفجار المغلفين الحمراء لمسابقة المطربين السحريين!', 'انقر لضرب الموعد للمغلف، يمكن أن تتلقى رسالة التنبيه من النظام>>', 'http://activity.gosingapp.com/static_html/2020/songking2020/share.png?v=2');
      }
    },
    nextRedPacket(dtime) {
      clearTimeout(this.timer2)
      this.timer2 = setTimeout(() => {
        // clearTimeout(this.timer2)
        this.redPacket_downTime = false
        this.packetRes = false
        this.packetRecore = false
        // this.packetType = 1
        api.getDefault('more').then(res => {
          // this.$parent.getDefaultData()
          this.vxc('setRedPacket', res.data.response_data.redPacket)
        })
      }, dtime)
    }
  }
}
</script>
<style lang="scss">
.redPactets {
  .packet {
    width: 7.5rem;
    height: 5.79rem;
    background: url(../assets/img/redPackBg.png);
    background-size: 100% 100%;
    position: relative;
    .packetBar {
      width: 4.45rem;
      height: 0.08rem;
      background: rgba(255, 255, 255, 0.4);
      border-radius: 0.04rem;
      position: absolute;
      bottom: 0.2rem;
      left: 1.36rem;
      > em {
        display: block;
        text-align: center;
        line-height: 0.3rem;
        width: 0.3rem;
        height: 0.3rem;
        position: absolute;
        top: -0.1rem;
        &.max {
          left: -0.4rem;
        }
        &.min {
          position: absolute;
          right: -0.4rem;
        }
      }
      .actBar {
        max-width: 100%;
        height: 0.08rem;
        border-radius: 0.04rem;
        background: linear-gradient(90deg, #fcbc58 0%, #ffe2af 100%);
        position: absolute;
        top: 0;
        right: 0;
        .store {
          display: block;
          width: 0.28rem;
          height: 0.28rem;
          background: url(../assets/img/packStore.png);
          background-size: 100% 100%;
          position: absolute;
          left: -0.14rem;
          top: -0.1rem;
          .tips {
            display: block;
            width: 0.58rem;
            height: 0.36rem;
            background: url(../assets/img/packTips.png);
            background-size: 100% 100%;
            position: absolute;
            top: -0.4rem;
            left: -0.16rem;
            color: rgba(117, 57, 13, 1);
            font-size: 0.24rem;
            text-align: center;
            line-height: 0.3rem;
          }
        }
      }
    }
  }
  .redTips {
    text-align: center;
    font-size: 0.28rem;
    vertical-align: bottom;
    padding-top: 0.02rem;
    margin-top: 0.1rem;
    i {
      display: inline-block;
      width: 0.58rem;
      height: 0.58rem;
      background: url(../assets/img/giftIcon.png);
      background-size: 100% 100%;
      margin: 0 0.05rem -0.2rem;
    }
  }
  .subscribe {
    width: 3.76rem;
    height: 0.8rem;
    background: url(../assets/img/box/okBtn.png);
    background-size: 100% 100%;
    font-size: 0.32rem;
    color: rgba(126, 26, 6, 1);
    font-weight: 600;
    margin: 0.2rem auto 0;
    text-align: center;
    line-height: 0.8rem;
  }
  .lastOpenPacketPeople {
    margin-top: 0.45rem;
    .title {
      font-size: 0.28rem;
      color: rgba(252, 245, 193, 1);
      text-align: center;
    }
    .people {
      width: 7.26rem;
      height: 1.4rem;
      margin: 0.2rem auto 0;
      background: url(../assets/img/people.png);
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      .imgBox {
        width: 0.96rem;
        height: 0.96rem;
        position: relative;
        margin-right: 0.55rem;
        .av {
          width: 0.96rem;
          height: 0.96rem;
          background: #fffbc7;
          border-radius: 50%;
          position: absolute;
        }
        .br {
          width: 0.96rem;
          height: 0.96rem;
          background: url(../assets/img/avBg.png);
          background-size: 100% 100%;
          position: absolute;
          z-index: 1;
        }
      }
      .nick {
        width: 3rem;
        margin-right: 0.31rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .score {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        i {
          width: 0.58rem;
          height: 0.58rem;
          background: url(../assets/img/giftIcon.png);
          background-size: 100% 100%;
          margin-left: 0.06rem;
        }
      }
    }
  }
  .downTimePacket {
    width: 6.17rem;
    height: 7.75rem;
    background: url(../assets/img/redPackets/open_downTime.png);
    background-size: 100% 100%;
    position: relative;
    padding-top: 0.8rem;
    &.open {
      background: url(../assets/img/redPackets/open.png);
      background-size: 100% 100%;
      .seamless-warp {
        margin-top: 4.1rem;
      }
    }
    h5 {
      height: 0.4rem;
      text-align: center;
      color: rgba(174, 91, 29, 1);
      font-size: 0.32rem;
    }
    .timeDown {
      text-align: center;
      color: rgba(151, 77, 22, 1);
      font-size: 0.32rem;
      margin-top: 0.25rem;
      em {
        font-size: 0.64rem;
        font-weight: 600;
      }
    }
    .rotate {
      display: block;
      width: 1.84rem;
      height: 1.84rem;
      background: url(../assets/img/redPackets/rotate.png);
      background-size: 100% 100%;
      animation: rotateLingth 3s linear infinite;
      position: absolute;
      left: 2.15rem;
      top: 2.55rem;
    }
    .seamless-warp {
      width: 4.6rem;
      height: 1.86rem;
      overflow: hidden;
      margin: 2.5rem auto 0;
      .item {
        width: 4rem;
        height: 1.86rem;
        li {
          height: 0.5rem;
          margin-bottom: 0.12rem;
          display: flex;
          align-items: center;
          img {
            width: 0.48rem;
            height: 0.48rem;
            border-radius: 50%;
            border: 0.03rem solid rgba(255, 255, 255, 0.4);
          }
          strong {
            width: 3.3rem;
            margin-left: 0.15rem;
            font-size: 0.24rem;
            white-space: nowrap;
            color: rgba(151, 77, 22, 1);
            display: flex;
            align-items: center;
            .nick {
              display: inline-block;
              font-size: 0.24rem;
              max-width: 1.5rem;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
    .share {
      width: 3.16rem;
      height: 0.8rem;
      background: url(../assets/img/redPackets/shareBtn.png);
      background-size: 100% 100%;
      margin: 0.35rem auto 0;
      font-size: 0.32rem;
      font-weight: 600;
      line-height: 0.8rem;
      color: rgba(126, 26, 6, 1);
      text-align: center;
      z-index: 10;
    }
  }
  .packetRes {
    width: 6.17rem;
    height: 7.75rem;
    background: url(../assets/img/redPackets/open_ed.png);
    background-size: 100% 100%;
    position: relative;
    padding-top: 0.8rem;
    .resHeader {
      height: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .title {
        font-size: 0.36rem;
        color: rgba(111, 83, 34, 1);
      }
      .coins {
        font-size: 1.08rem;
        color: rgba(111, 83, 34, 1);
        display: flex;
        align-items: center;
        margin-top: 0.16rem;
        .icon {
          width: 1.05rem;
          height: 1.05rem;
          background: url(../assets/img/redPackets/coinsIcon.png);
          background-size: 100% 100%;
          margin-left: 0.06rem;
        }
      }
    }
    .resBottom {
      margin-top: 2.3rem;
      .bar {
        width: 3.92rem;
        height: 0.3rem;
        background: url(../assets/img/redPackets/bar.png);
        background-size: 100% 100%;
        margin: 0 auto;
      }
      .resBtn {
        width: 3.16rem;
        height: 0.8rem;
        background: url(../assets/img/redPackets/shareBtn.png);
        background-size: 100% 100%;
        margin: 0.4rem auto 0;
        font-size: 0.32rem;
        font-weight: 600;
        line-height: 0.8rem;
        color: rgba(126, 26, 6, 1);
        text-align: center;
      }
    }
  }
  .packetRecord {
    width: 6.17rem;
    height: 7.75rem;
    background: url(../assets/img/redPackets/open_ed.png);
    background-size: 100% 100%;
    position: relative;
    padding-top: 0.8rem;
    .red {
      font-size: 0.4rem;
      color: red;
    }
    .resHeader {
      height: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .tips {
        color: rgba(151, 77, 22, 1);
        font-size: 0.32rem;
        span {
          display: block;
          margin-bottom: 0.15rem;
          em {
            font-size: 0.4rem;
            color: rgba(93, 45, 9, 1);
          }
        }
      }
    }
    .recoreList {
      width: 5rem;
      height: 3.15rem;
      overflow-y: scroll;
      margin: 0.5rem auto 0;
      li {
        display: flex;
        align-items: center;
        margin-bottom: 0.12rem;
        .av {
          width: 0.48rem;
          height: 0.48rem;
          border-radius: 50%;
          border: 0.03rem solid rgba(255, 255, 255, 0.4);
        }
        .msg {
          width: 2.3rem;
          margin-left: 0.13rem;
          .nick {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 0.24rem;
            color: rgba(51, 51, 51, 1);
          }
          .tm {
            font-size: 0.22rem;
            color: rgba(51, 51, 51, 0.6);
          }
        }
        .gift {
          width: 1.4rem;
          margin-left: 0.15rem;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;
          .nums {
            font-size: 0.24rem;
            color: rgba(51, 51, 51, 1);
          }
          .luck {
            display: flex;
            align-items: center;
            color: rgba(176, 115, 8, 1);
            font-size: 0.22rem;
            white-space: nowrap;
            i {
              width: 0.37rem;
              height: 0.43rem;
              background: url(../assets/img/redPackets/good.png);
              background-size: 100% 100%;
            }
          }
        }
      }
    }
    .recoreList::-webkit-scrollbar {
      width: 0.06rem;
      background: rgba(207, 147, 41, 1);
    }
    .recoreList::-webkit-scrollbar-thumb {
      width: 0.06rem;
      background: rgba(255, 251, 189, 1);
    }
  }
  .close {
    display: block;
    width: 0.65rem;
    height: 0.65rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    top: 0;
  }
  .packetRes::before,
  .downTimePacket::before,
  .packetRecord::before {
    content: "";
    display: block;
    width: 7.5rem;
    height: 7.05rem;
    background: url(../assets/img/redPackets/packetBg.png);
    background-size: 100% 100%;
    position: absolute;
    left: -0.665rem;
    top: 1.8rem;
    z-index: -1;
  }
}
</style>
