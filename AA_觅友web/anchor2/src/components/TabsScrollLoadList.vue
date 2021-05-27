<template>
  <div class="rankGroups">
    <!-- 日榜、总榜切换主Tabs -->
    <div class="mainTabs">
      <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" class="tabL">主播信息</a>
      <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" class="tabR">粉磚結算</a>
    </div>
    <!-- 日榜 -->
    <div class="list_con">
      <div class="list day" v-if="mainTab == 0">
        <div class="listHeader">
          <span>主播</span>
          <span>粉磚餘額</span>
        </div>
        <ul>
          <li v-for="(item,index) in rank.list" :key="index">
            <img v-lazy="item.avatar" alt="">
            <div class="userMsg">
              <div class="nick">{{item.nick}}</div>
              <div class="uid">ID {{item.uid}}</div>
            </div>
            <div class="score">{{item.pinkJewel}}</div>
          </li>
        </ul>
      </div>
      <div class="data" v-if="mainTab==1">
        <div class="top">
          <div>
            <span>{{getDayShowTime()}}</span>
            <span @click="choose()"></span>
          </div>
          <div class="help" @click="openRule()"></div>
        </div>
        <div class="pro_top">
          <div class="inner">
            <p class="total">
              <span>結算粉磚匯總:</span><img src="../img/coin30.png" alt="">
              <span>9999</span>
            </p>
            <div class="scroll_title">
              <span>主播</span>
              <span>結算粉磚</span>
              <span>結算時間</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 日榜和总榜共用Loading（如果需要细化加载提示文案，可以把以下标签复制到不同的榜单后面） -->
      <div v-if="rank.loading" class="scrollLoading">{{lang.loading}}</div>
      <div v-if="rank.none" class="scrollNone">
        {{lang.no_data}}
      </div>
    </div>
    <!-- 時間選擇器 -->
    <van-popup v-model="show" position="bottom" round :style="{ height: '40%' }">
      <van-datetime-picker v-model="currentDateDay" type="date" title="" :min-date="minDate" :max-date="maxDate" :confirm-button-text=lang.confirm :cancel-button-text=lang.cancel
        @confirm="confirmTime(0)" @cancel="cancelTime()" :swipe-duration="50" />
    </van-popup>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import { getUrlString, getTimeObj } from '../utils';
const uid = getUrlString("uid");
const token = getUrlString("token");
const lang = getUrlString("lang");
const rid = getUrlString("rid");
//可设置初始化日子
const mTime = new Date(2021, 2, 1);
const htmlFont = parseInt(getComputedStyle(window.document.documentElement)['font-size']);

// 为了清晰显示各字段以及提供更灵活的配置，不采用mixin实现
// store.js 每项包含以下字段（需要修改的字段只有loadOnce，其它为当前榜单加载状态）：loadCount loading loadEnd none list <loadOnce>
// 如果不需要设置loadOnce，直接设置空对象即可rankGroups:{}
// state: {
//     rankGroups: {
//     },
// },
// mutations: {
//     updateRankGroups(state, obj) {
//         if (obj && typeof obj.key != 'undefined') {
//             const key = obj.key;
//             delete obj['key'];
//             state.rankGroups = Object.assign({}, state.rankGroups, {[key]: Object.assign({}, state.rankGroups[key], obj)});
//         }
//     },
// }

export default {
  data () {
    return {
      mainTab: 0,
      tab: 1,
      surplusTime: {},//日榜剩余时间
      timer: null,
      timer2: null,
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
      minDate: mTime,
      maxDate: new Date(),
      currentDate: new Date(),
      currentDateDay: new Date(),
      show: false,

      shijiancuo: new Date() / 1000,
      shijiancuo_month: new Date() / 1000,

      confirm_day_time: '',
      confirm_month_time: String(this.format(new Date().getTime() / 1000)),
    }
  },
  watch: {
    // inited() {
    //   this.$nextTick(() => {
    //     if (!this.rank.loadCount) {
    //       this.onScroll();
    //     }
    //   })
    // },
  },
  computed: {
    ...mapState(['rankGroups', "isShare", "actStatus", "inited", "second", "total", "day"]),
    rankKey () {
      // return ['one', 'two', 'three'][this.tab];
      return this.mainTab == 1 ? 'total' : this.mainTab;
    },
    rankApi () {
      var anchor_api = `/index.php?action=Action/Anchor.getAnchorPinkJewel&token={token}&uid={uid}&page={page}`;
      var masonry_api = `/index.php?action=Action/Anchor.getAnchorPinkJewelSettlement&token={token}&uid={uid}&page={page}&ym=2020-10`;
      const token = getUrlString('token') || '';
      const uid = getUrlString('uid') || '';
      return this.mainTab ? masonry_api : anchor_api
    },
    rankSize () {
      // 如果明确服务器每次返回的列表长度，请返回具体的数值，有助于减少一次额外请求即可确定加载完所有数据
      return 20;
    },
    rank () {
      const rankConf = this.rankGroups[this.rankKey] || {};
      rankConf.list = rankConf.list || [];
      return rankConf;
    }
  },
  mounted () {
    // 如果初始化接口返回当前榜单数据，可以在Store的Action拿到服务器数据时先调用commit('updateRankGroups', {key:key, list:[]})，再更新state.tab触发组件watch
    window.addEventListener('scroll', this.onScroll);
    this.onScroll(); // 如果默认展示的Tabs依赖服务器配置，把此方法移到watch中去调用（watch更新Tabs值后调onScroll）
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    mainTabClick (tab) { //总榜切换
      this.mainTab = tab;
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      })
    },
    onScroll () {
      // if (this.tab > this.nowDay) return (this.tab > this.nowDay && this.rankKey !== 'total') || 
      if (!this.rank.loading && !this.rank.loadEnd) {
        const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100;
        const notFull = document.body.scrollHeight < window.innerHeigh;
        if (scrollToBottom || notFull || !this.rank.loadCount) {
          const key = this.rankKey;

          const set = (k, v) => {
            this.$store.commit('updateRankGroups', { key, [k]: v });
          };
          set('loading', true);
          axios.get(this.rankApi.replace('{page}', this.rank.loadCount ? this.rank.loadCount : 0)).then(res => {

            const { response_status, response_data } = res.data;

            if (!response_data) {
              set('loadEnd', true);
              return;
            }

            // const arr = response_data.list;
            const arr = [//详细主播的粉钻余额
              {
                "uid": 1234,//主播uid
                "nick": "昵称",//主播昵称
                "avatar": "http://XXX",//主播头像
                "pinkJewel": 1000//粉钻余额
              },
              {
                "uid": 1234,//主播uid
                "nick": "昵称",//主播昵称
                "avatar": "http://XXX",//主播头像
                "pinkJewel": 1000//粉钻余额
              }
            ]

            if (arr.slice) {
              const loadCount = typeof this.rank.loadCount == 'undefined' ? 0 : this.rank.loadCount;
              set('loadCount', loadCount + 1);
              if (arr.length) {
                set('list', this.rank.list.concat(arr));
                const noMore = !isNaN(this.rankSize) && arr.length < parseInt(this.rankSize);
                if (this.rank.loadOnce || noMore) {
                  set('loadEnd', true);
                } else {
                  this.$nextTick(this.onScroll);
                }
              } else {
                set('loadEnd', true);
              }
              this.$nextTick(() => {
                if (this.rank.loadCount > 0 && this.rank.list.length === 0) {
                  set('none', true);
                }
              });
            } else {
              set('loadEnd', true);
            }
            set('loading', false);
          }).catch(err => {
            set('loading', false);
            set('loadEnd', true);
          });

        }
      }
    },
    getDate (time) {
      return getDate(new Date(time * 1000), '2')
    },
    goUser (uid) { //跳转
      var isiOS = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      if (isiOS) {
        sendJsData('app://userInfo?uid=' + uid);
      } else {
        javascript: JSInterface.sendJsData('app://userInfo?uid=' + uid);
      }
    },
    getDayShowTime () {
      return this.lang.day_time.replace('{0}', getTimeObj(this.shijiancuo).year).replace('{1}', getTimeObj(this.shijiancuo).month).replace('{2}', getTimeObj(this.shijiancuo).day);
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
        this.live_url = '/index.php?signture=innerserver&action=Action/Anchor.getDayAnchorInfo&uid={uid}&token={token}&from={from}&page={page}&ymd=' + send_time + '&lang=' + lang;
      } else {
        // console.log('月');
        // console.log(this.format(this.currentDate.getTime()/1000));
        var send_month_time = String(this.format(this.currentDate.getTime() / 1000));
        // console.log(send_month_time);
        // return;
        this.confirm_month_time = send_month_time;
        this.shijiancuo_month = this.currentDate.getTime() / 1000;
        this.show = false;
        this.reset = !this.reset;
        this.month_url = '/index.php?signture=innerserver&action=Action/Anchor.getMonthAnchorInfo&uid={uid}&token={token}&from={from}&page={page}&ym=' + send_month_time + '&lang=' + lang;
        return;
        var send_month_time = String(this.format(this.currentDate.getTime() / 1000));
        this.shijiancuo_month = this.currentDate.getTime() / 1000;
        const info = await getMonthInfo(send_month_time);
        if (info.data) {
          const { response_status, response_data } = info.data;
          if (response_status.error == '') {
            console.log(this.month_data);
            if (response_data && response_data.length == 0) {
              this.$alert(this.lang.no_data);
              return;
            }
            this.show = false;
            this.month_data = {};
            this.month_data = response_data;
          } else {
            this.$alert(response_status.error.replace(/\[\d+\]/, ''));
          }
        }
      }
    },
    cancelTime () {
      this.show = false;
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
  },
}
</script>

<style lang="scss" scoped>
.rankGroups {
  position: relative;
  // background: #f8ffe6 url(../assets/img/listBg.png) no-repeat;
  background-size: 100% auto;
  margin: 0 auto;
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
      &.current {
        color: rgba(255, 248, 251, 1);
        // background: url(../img/rank_tab_act.png);
        // background-size: 100% 100%;
      }
    }
  }
  .list_con {
    margin: 0.34rem auto 0;
    width: 6.9rem;
    border-radius: 0.2rem;
    padding-bottom: 0.35rem;
    background: linear-gradient(
      135deg,
      rgba(246, 90, 110, 0.1) 0%,
      rgba(182, 118, 240, 0.1) 64%,
      rgba(125, 125, 246, 0.1) 100%
    );
  }
  .list {
    .listHeader {
      height: 0.88rem;
      display: flex;
      align-items: center;
      span {
        flex: 1;
        height: 100%;
        text-align: center;
        line-height: 0.88rem;
      }
    }
    ul {
      li {
        height: 1.36rem;
        display: flex;
        align-items: center;
        img {
          width: 0.88rem;
          height: 0.88rem;
          border-radius: 50%;
          margin: 0 0.1rem 0 0.3rem;
        }
        .userMsg {
          width: 2.18rem;
          .nick {
            font-size: 0.28rem;
            color: #fff;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .uid {
            margin-top: 0.05rem;
            font-size: 0.24rem;
            color: rgba(153, 153, 153, 1);
          }
        }
        .score {
          font-size: 0.24rem;
          color: rgba(153, 153, 153, 1);
          flex: 1;
          text-align: center;
        }
      }
    }
  }
}
.dengdai {
  text-align: center;
}
.scrollLoading {
  text-align: center;
  font-size: 80%;
  margin-top: 0.25rem;
}
.scrollNone {
  text-align: center;
  font-size: 80%;
  margin-top: 0.25rem;
}
</style>
