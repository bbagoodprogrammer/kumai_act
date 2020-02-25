<template>
  <div class="rankGroups">
    <!-- 日榜、总榜切换主Tabs -->
    <!-- <div class="mainTabs">
      <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" href="">日榜</a>
      <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" href="">总榜</a>
      <a @click.prevent="onRefresh" href="">刷新</a>
    </div> -->
    <!-- 日榜 -->
    <!-- <DayTabs v-if="mainTab==0" @changeClick="tabClick" :tab="tab"></DayTabs> -->
    <div v-if="mainTab==0">
      <!-- <div @click.prevent="tabClick(index)" :class="{current:index==nowTab,black:index < nowTab}" v-for="(item,index) in clock_list" :key="index"></div> -->
      <time-tabs :tab="tab" :totalDay="clock_list.length" :nowTab="nowTab" @changeClick="tabClick"></time-tabs>
      <!-- <a @click.prevent="tabClick(0)" :class="{current:0==nowDay,black:0 < nowDay}" href="">日榜1</a>
      <a @click.prevent="tabClick(1)" :class="{current:1==nowDay,black:1 < nowDay}" href="">日榜2</a>
      <a @click.prevent="tabClick(2)" :class="{current:2==nowDay,black:2 < nowDay}" href="">日榜3</a>
      <a @click.prevent="tabClick(3)" :class="{current:3==nowDay,black:3 < nowDay}" href="">日榜4</a> -->
    </div>
    <!--  && !surplusTime.end -->
    <div class="downTime" v-if="tab >= nowTab && !surplusTime.end && rank.second!==0">
      <div class="title" v-if="tab == nowTab && rank.gift_status ==1">
        本場秒殺結束倒計時
      </div>
      <div class="title" v-else-if="tab >= nowTab">
        本場秒殺開始倒計時
      </div>
      <div class="timeItem">
        <span>{{surplusTime.day}}</span>
        <span>{{surplusTime.hour}}</span>
        <span>{{surplusTime.minute}}</span>
        <span>{{surplusTime.second}}</span>
      </div>
    </div>
    <ul v-if="mainTab==0" class="list day">
      <li v-for="(item,index) in rank.list" :key="index">
        <img :src="item.picture" alt="">
        <div class="gifMsg">
          <div class="name">{{item.name}}
            <em class="tips" v-if="item.label != ''">{{item.label}}</em>
          </div>
          <div class="quota" v-if="item.user_max != 0">本場次每個UID限購 {{item.user_max}} 件</div>
          <div class="sold">
            <em v-if="((1-(item.stock / item.total_max))* 100)%1 == 0">已售 {{((1-(item.stock*1 / item.total_max*1))* 100)+ '%'}}</em>
            <em v-else>已售 {{((1-(item.stock*1 / item.total_max*1))* 100).toFixed(1) + '%'}}</em>
            <span :style="{width:(1-(item.stock / item.total_max))* 100+'%'}" :class="{man:Math.round((1-(item.stock / item.total_max))* 100)>92,minw:(1-(item.stock / item.total_max))>0}"></span>
          </div>
        </div>
        <div class="coin">
          <i :class="{dou:item.pay_type == 2}"></i>
          <em>{{item.amount}}</em>
        </div>
        <!-- 已预约 -->
        <span class="buyBtn1" v-if="tab >= nowTab && rank.is_order == 1">
          已預約
        </span>
        <!-- 提醒我 -->
        <span class="buyBtn" v-else-if="tab >= nowTab && rank.is_order == 0 && rank.gift_status==0" @click="yuyue(item.gift_id)">
          提醒我
        </span>
        <!-- 已售完 -->
        <span class="buyBtn2" v-else-if="item.stock == 0">
          已售完
        </span>
        <!-- 灰色购买按钮 -->
        <span class="buyBtn4" v-else-if="tab <= nowTab  && item.stock > 0&& rank.gift_status!=1">
          點擊購買
        </span>
        <!-- 可以购买 -->
        <span class="buyBtn3" v-else-if="tab == nowTab && item.stock > 0 && rank.gift_status==1" @click="showBuyItemPup(item,index)">
          點擊購買
        </span>
      </li>
    </ul>
    <!-- 总榜 -->
    <!-- <ul v-else class="list total">
      <li v-for="(item,index) in rank.list" :key="index">总榜{{JSON.stringify(item)}}</li>
    </ul> -->
    <!-- 日榜和总榜共用Loading（如果需要细化加载提示文案，可以把以下标签复制到不同的榜单后面） -->
    <div v-if="rank.loading" class="scrollLoading">加載中...</div>
    <div v-if="rank.none" class="scrollNone">暫無數據!</div>
    <!-- <div v-if="mainTab==0">敬請期待</div> -->
    <transition name="slide">
      <div class="buyItem" v-show="buyItemPup">
        <div class="buyItemCon">
          <i class="close" @click="closeBuyItemPup()"></i>
          <div class="imgBox">
            <img :src="giftMsgItem.picture" alt="">
          </div>
          <div class="name">{{giftMsgItem.name}}</div>
          <div class="tipsBox" v-if="giftMsgItem.label != ''"><em class="tips">{{giftMsgItem.label}}</em></div>
          <div class="num">
            <span class="add" @click="reduce()"></span>
            <input type="number" v-model="gifNum" disabled>
            <span class="down" @click="add()"> </span>
          </div>
          <div class="coins">
            <i :class="{dou:giftMsgItem.pay_type == 2}"></i>
            <em>{{giftMsgItem.amount * gifNum}}</em>
          </div>
          <div class="buyBtn" @click="queryBuy(giftMsgItem.gift_id)">
            確定購買
          </div>
        </div>
      </div>
    </transition>
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import getUrlString from '../utils/getString.js';
// import DayTabs from "../components/DayTabs"
import MsgToast from "./commonToast"
import downTime from '../utils/downTime.js'
import api from "../api/apiConfig"
import APP from "../utils/openApp"
import { globalBus } from "../utils/eventBus"
import TimeTabs from "./TimeTabs"
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
  components: { MsgToast, TimeTabs },
  data() {
    return {
      mainTab: 0,
      tab: 0,
      surplusTime: {},
      second: 0,
      buyItemPup: false,
      gifNum: 1,
      tastMsg: '',
      showT: false,
      giftMsgItem: {},
      totalDay: 0, //总得场次
      giftType: [
        `已成功購買！</br>禮物已放入你的背包中,請注意查收！`,
        ``,
        `已成功購買！</br>禮券已放入你的背包中,請注意查收！`,
        `已成功購買！</br>VIP已放入你的賬戶中,請注意查收！`,
        `已成功購買！</br>座駕已放入你的賬戶中,請注意查收！`
      ],
    };
  },
  computed: {
    ...mapState(['rankGroups', 'clock_list', 'Hi', 'setInited', 'qid', 'user_msg', 'isShare', 'actStatus']),
    rankKey() {
      // return ['one', 'two', 'three'][this.tab];
      return this.mainTab == 1 ? 'total' : this.tab;
    },
    rankApi() {
      // const dayApi = '/ktv_beginner/dayrank.php?&token={token}&day={day}&from={from}';
      // const totalApi = '/ktv_beginner/totalrank.php?&from={from}';

      const api = `/seconds_kill/getclockgifts.php?token={token}&Hi={Hi}&qid={qid}`

      const token = getUrlString('token') || '';
      return api.replace('{Hi}', this.clock_list[this.rankKey] + `:00`).replace('{token}', token).replace('{qid}', this.qid);
    },
    rankSize() {
      // 如果明确服务器每次返回的列表长度，请返回具体的数值，有助于减少一次额外请求即可确定加载完所有数据
      return 20;
    },
    rank() {
      const rankConf = this.rankGroups[this.rankKey] || {};
      rankConf.list = rankConf.list || [];
      if (rankConf.second && rankConf.second != undefined) {
        this.downTimeGo('time' + this.rankKey, rankConf.second)
      }
      return rankConf;
    },
    nowTab() {
      return this.clock_list.indexOf(this.Hi)
    }
  },
  mounted() {
    // this.second = this.rank.second
    // 如果初始化接口返回当前榜单数据，可以在Store的Action拿到服务器数据时先调用commit('updateRankGroups', {key:key, list:[]})，再更新state.tab触发组件watch
    window.addEventListener('scroll', this.onScroll);
    // this.downTimeGo(this.second)
  },
  watch: {
    Hi(val) {
      this.tab = this.nowTab
      this.onScroll(); // 如果默认展示的Tabs依赖服务器配置，把此方法移到watch中去调用（watch更新Tabs值后调onScroll）
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    mainTabClick(tab) {
      this.mainTab = tab;
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      });
    },
    tabClick(tab) {
      if (this.isShare) {
        APP()
        return
      }
      this.tab = tab;
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      });
    },
    downTimeGo(timeName, val) {
      clearInterval(this.timer)
      if (!downTime(timeName)) {
        downTime(timeName, val);
      }
      this.surplusTime = downTime(timeName);
      this.timer = setInterval(() => {
        this.surplusTime = downTime(timeName);
        if (this.surplusTime.end) {
          clearInterval(this.timer)
          // this.$store.commit("changday_down_time", 0)  //當天剩餘時間
        }
      }, 1000)
    },
    onScroll() {
      // if (this.setInited === 1) { //初始化是少一次請求,是日榜的时候和不是总榜的时候返回
      //   this.$store.commit("changSetInited", 0)
      //   return
      // }
      if (!this.rank.loading && !this.rank.loadEnd) {
        const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100;
        const notFull = document.body.scrollHeight < window.innerHeigh;
        if (scrollToBottom || notFull) {
          const key = this.rankKey;

          const set = (k, v) => {
            this.$store.commit('updateRankGroups', { key, [k]: v });
          };

          set('loading', true);
          axios.get(this.rankApi).then(res => {
            set('loading', false);

            const { response_status, response_data } = res.data;

            if (response_status.code != 0) {
              set('loadEnd', true);
              return;
            }

            set('gift_status', response_data.gift_list.gift_status)
            // this.second = response_data.gift_list.second  //启动watch的倒计时
            set('second', response_data.gift_list.second)
            const arr = response_data.gift_list.list;

            if (arr.slice) {
              set('is_order', response_data.is_order)
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
          }).catch(err => {
            set('loading', false);
            set('loadEnd', true);
          });
        }
      }
    },
    onRefresh() {
      this.$store.commit('updateRankGroups', {
        key: this.rankKey,
        loadCount: 0,
        loadEnd: false,
        loading: false,
        none: false,
        list: [],
      });
      this.$nextTick(this.onScroll);
    },
    add() {
      if (this.giftMsgItem.user_max == 0 && this.gifNum < this.giftMsgItem.total_max) { //不限购
        this.gifNum += 1
      } else if (this.giftMsgItem.user_max == 0 && this.gifNum >= this.giftMsgItem.total_max) {
        this.tastMsg = `庫存不足!`
        this.showT = true
      } else if (this.giftMsgItem.user_max > 0) { //限购
        if ((this.gifNum * 1 + this.giftMsgItem.buy_counts * 1) < this.giftMsgItem.user_max) {
          this.gifNum += 1
        } else if ((this.gifNum * 1 + this.giftMsgItem.buy_counts * 1) >= this.giftMsgItem.user_max) {  //限购
          this.tastMsg = `該商品本場次最多可購買 ${this.giftMsgItem.user_max} 件!`
          this.showT = true
        }
      }
    },
    queryBuy(id) { //确定购买
      if (this.giftMsgItem.pay_type == 1 && this.user_msg.coins * 1 < this.giftMsgItem.amount * 1) {  //金币不足
        this.tastMsg = `購買失敗！</br>金幣餘額不足，請先儲值!`
        this.showT = true
      } else if (this.giftMsgItem.pay_type == 2 && this.user_msg.beans * 1 < this.giftMsgItem.amount * 1) { //金豆不足
        this.tastMsg = `購買失敗！</br>金豆餘額不足，快去完成今日任務賺金豆吧!`
        this.showT = true
      } else if (this.gifNum * 1 > this.giftMsgItem.stock * 1) { //庫存不足
        this.tastMsg = `庫存不足!`
        this.showT = true
      } else {
        api.buyGift(id, this.gifNum).then(res => {
          if (res.data.response_status.code === 0) {
            let byObj = {
              rankKey: this.rankKey,
              rankIndex: this.giftMsgItem.index,
              gifNum: this.gifNum,
              pay_type: this.giftMsgItem.pay_type,
              amount: this.giftMsgItem.amount * this.gifNum
            }
            this.$store.commit('buySusses', byObj)
            this.buyItemPup = false
            let gift_type = res.data.response_data.gift_type
            this.tastMsg = this.giftType[gift_type]
            this.showT = true
          } else {
            this.tastMsg = res.data.response_status.error
            this.showT = true
          }
        })
      }

    },
    reduce() {
      if (this.gifNum <= 1) return
      this.gifNum -= 1
    },
    showBuyItemPup(item, index) {
      globalBus.$emit('commonEvent', () => {
        if (this.rank.gift_status != 1) {
          this.tastMsg = `不在搶購時間內!`
          this.showT = true
        } else if (item.stock == 0) { //庫存不足
          this.tastMsg = `庫存不足!`
          this.showT = true
        } else if (item.user_max > 0 && item.user_max == item.buy_counts) { //礼物限购并且购买达到上限
          this.tastMsg = `該商品本場次最多可購買 ${item.user_max} 件!`
          this.showT = true
        } else {
          this.giftMsgItem = item
          this.giftMsgItem.index = index
          this.buyItemPup = true
        }
      })
    },
    yuyue(gid) {
      globalBus.$emit('commonEvent', () => {
        if (this.rank.gift_status == 0) {
          api.make(gid).then(res => {
            if (res.data.response_status.code == 0) {
              this.$store.commit("yuyueSuccess", this.rankKey)
              this.tastMsg = `已成功預約推送提醒！`
              this.showT = true
            } else {
              this.tastMsg = res.data.response_status.error
              this.showT = true
            }
          })
        } else {
          this.tastMsg = `不在預約時間內!`
          this.showT = true
        }
      })
    },
    closeBuyItemPup() {
      this.buyItemPup = false
      this.giftMsgItem = {}
      this.gifNum = 1
    },
    closeToast() {
      this.showT = false
    }
  },
}
</script>

<style lang="scss">
.rankGroups {
  .downTime {
    width: 3.4rem;
    height: 1.22rem;
    background: url(../assets/img/timeBg.png);
    background-size: 100% 100%;
    margin: 0.22rem auto;
    .title {
      height: 0.36rem;
      line-height: 0.36rem;
      text-align: center;
      font-size: 80%;
      color: #ffcf71;
    }
    .timeItem {
      height: 0.85rem;
      padding: 0 0.14rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        display: block;
        width: 0.66rem;
        height: 0.55rem;
        line-height: 0.55rem;
        color: #fffb9a;
        font-size: 120%;
        text-align: center;
        left: 0.55rem;
        background: #9d2323;
        border: 0.02rem solid rgba(146, 15, 0, 1);
        border-radius: 0.1rem;
      }
    }
  }
  .list {
    margin-top: 0.24rem;
    padding: 0 0.3rem 2rem;
    li {
      width: 6.5rem;
      height: 1.76rem;
      padding: 0.2rem;
      background: url(../assets/img/liItem.png);
      background-size: 100% 100%;
      margin-bottom: 0.19rem;
      display: flex;
      align-items: center;
      position: relative;
      img {
        display: block;
        width: 1.6rem;
        height: 1.6rem;
        margin-left: 0.05rem;
        border-radius: 0.5rem;
      }
      .gifMsg {
        width: 3.15rem;
        height: 1.66rem;
        margin-left: 0.18rem;
        position: relative;
        .name {
          width: 150%;
          color: #46396a;
          font-size: 110%;
          display: flex;
          align-items: center;
          white-space: nowrap;
          .tips {
            max-width: 2rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            display: inline-block;
            // width: 1.1rem;
            padding: 0.02rem 0.15rem;
            text-align: center;
            height: 0.34rem;
            line-height: 0.34rem;
            margin-left: 0.2rem;
            // border-image: linear-gradient(to right, #ff5282, 30%, #fd881f);
            // background: linear-gradient(to right, #ff5282, 30%, #fd881f);
            background: -webkit-linear-gradient(
              to right,
              #ff5282,
              30%,
              #fd881f
            );
            background: -moz-linear-gradient(to right, #ff5282, 30%, #fd881f);
            background: -o-linear-gradient(to right, #ff5282, 30%, #fd881f);
            background: -ms-linear-gradient(to right, #ff5282, 30%, #fd881f);
            background: linear-gradient(to right, #ff5282, 30%, #fd881f);
            border-radius: 0.15rem 0 0.15rem 0;
            font-size: 70%;
            color: #fff;
          }
        }
        .quota {
          margin-top: 0.1rem;
          font-size: 70%;
          color: #8d8fb3;
        }
        .sold {
          width: 2rem;
          height: 0.34rem;
          background: #b486a1;
          border-radius: 0.17rem;
          position: absolute;
          bottom: 0;
          .man {
            border-radius: 0.17rem;
          }
          em {
            width: 100%;
            height: 100%;
            font-size: 70%;
            text-align: center;
            line-height: 0.34rem;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 10;
          }
          span {
            &.minw {
              min-width: 8%;
            }
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background: -webkit-linear-gradient(
              to right,
              #ff5282,
              30%,
              #fd881f
            );
            background: -moz-linear-gradient(
              -90deg,
              rgba(236, 49, 30, 1),
              rgba(239, 33, 154, 1),
              rgba(255, 121, 140, 1)
            );
            background: -o-linear-gradient(
              -90deg,
              rgba(236, 49, 30, 1),
              rgba(239, 33, 154, 1),
              rgba(255, 121, 140, 1)
            );
            background: -ms-linear-gradient(
              -90deg,
              rgba(236, 49, 30, 1),
              rgba(239, 33, 154, 1),
              rgba(255, 121, 140, 1)
            );
            background: linear-gradient(
              -90deg,
              rgba(236, 49, 30, 1),
              rgba(239, 33, 154, 1),
              rgba(255, 121, 140, 1)
            );
            border-radius: 0.17rem 0 0 0.17rem;
          }
        }
      }
      .coin {
        display: flex;
        align-items: center;
        margin-top: -0.3rem;
        i {
          display: inline-block;
          width: 0.45rem;
          height: 0.45rem;
          background: url(../assets/img/GoldCoin.png);
          background-size: 100% 100%;
          &.dou {
            background: url(../assets/img/Goldenbeans.png);
            background-size: 100% 100%;
          }
        }
        em {
          display: block;
          width: 0.8rem;
          text-align: center;
          font-size: 120%;
          color: #ef9600;
        }
      }
      .buyBtn {
        width: 2rem;
        height: 0.64rem;
        text-align: center;
        line-height: 0.64rem;
        font-size: 80%;
        font-weight: bold;
        color: #833700;
        position: absolute;
        right: 0.2rem;
        bottom: 0.18rem;
        background: -webkit-linear-gradient(
          0deg,
          rgba(252, 169, 49, 1) 0%,
          rgba(253, 232, 40, 1) 100%
        );
        background: -moz-linear-gradient(
          0deg,
          rgba(252, 169, 49, 1) 0%,
          rgba(253, 232, 40, 1) 100%
        );
        background: -o-linear-gradient(
          0deg,
          rgba(252, 169, 49, 1) 0%,
          rgba(253, 232, 40, 1) 100%
        );
        background: -ms-linear-gradient(
          0deg,
          rgba(252, 169, 49, 1) 0%,
          rgba(253, 232, 40, 1) 100%
        );
        background: linear-gradient(
          0deg,
          rgba(252, 169, 49, 1) 0%,
          rgba(253, 232, 40, 1) 100%
        );
        border-radius: 0.3rem;
      }
      .buyBtn1 {
        width: 2rem;
        height: 0.64rem;
        text-align: center;
        line-height: 0.64rem;
        font-size: 80%;
        font-weight: bold;
        color: #833700;
        position: absolute;
        right: 0.2rem;
        bottom: 0.18rem;
        background: -webkit-linear-gradient(
          0deg,
          rgba(252, 169, 49, 1) 0%,
          rgba(253, 232, 40, 1) 100%
        );
        background: -moz-linear-gradient(
          0deg,
          rgba(252, 169, 49, 1) 0%,
          rgba(253, 232, 40, 1) 100%
        );
        background: -o-linear-gradient(
          0deg,
          rgba(252, 169, 49, 1) 0%,
          rgba(253, 232, 40, 1) 100%
        );
        background: -ms-linear-gradient(
          0deg,
          rgba(252, 169, 49, 1) 0%,
          rgba(253, 232, 40, 1) 100%
        );
        background: linear-gradient(
          0deg,
          rgba(252, 169, 49, 1) 0%,
          rgba(253, 232, 40, 1) 100%
        );
        border-radius: 0.3rem;
      }
      .buyBtn2 {
        width: 2rem;
        height: 0.64rem;
        text-align: center;
        line-height: 0.64rem;
        font-size: 80%;
        font-weight: bold;
        color: #d7d7d7;
        position: absolute;
        right: 0.2rem;
        bottom: 0.18rem;
        background: url(../assets/img/buyBtn.png);
        background-size: 100% 100%;
      }
      .buyBtn3 {
        width: 2rem;
        height: 0.64rem;
        text-align: center;
        line-height: 0.64rem;
        font-size: 80%;
        font-weight: bold;
        color: #833700;
        position: absolute;
        right: 0.2rem;
        bottom: 0.18rem;
        background: -webkit-linear-gradient(
          0deg,
          rgba(252, 169, 49, 1) 0%,
          rgba(253, 232, 40, 1) 100%
        );
        background: -moz-linear-gradient(
          0deg,
          rgba(252, 169, 49, 1) 0%,
          rgba(253, 232, 40, 1) 100%
        );
        background: -o-linear-gradient(
          0deg,
          rgba(252, 169, 49, 1) 0%,
          rgba(253, 232, 40, 1) 100%
        );
        background: -ms-linear-gradient(
          0deg,
          rgba(252, 169, 49, 1) 0%,
          rgba(253, 232, 40, 1) 100%
        );
        background: linear-gradient(
          0deg,
          rgba(252, 169, 49, 1) 0%,
          rgba(253, 232, 40, 1) 100%
        );
        border-radius: 0.3rem;
      }
      .buyBtn4 {
        width: 2rem;
        height: 0.64rem;
        text-align: center;
        line-height: 0.64rem;
        font-size: 80%;
        font-weight: bold;
        color: #d7d7d7;
        position: absolute;
        right: 0.2rem;
        bottom: 0.18rem;
        background: url(../assets/img/buyBtn.png);
        background-size: 100% 100%;
      }
    }
  }
  .buyItem {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 10000;
    background: rgba(0, 0, 0, 0.8);
    .buyItemCon {
      width: 5.14rem;
      height: 5.88rem;
      background: rgba(245, 240, 236, 1);
      border: 0.04rem solid rgba(247, 177, 155, 1);
      border-radius: 0.6rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
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
      .imgBox {
        width: 1.66rem;
        height: 1.66rem;
        margin: 0.4rem auto 0;
        background: url(../assets/img/imgBg.png);
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 1.52rem;
          height: 1.28rem;
        }
      }
      .name {
        color: #46396a;
        font-size: 120%;
        text-align: center;
        margin-top: 0.14rem;
      }
      .tipsBox {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 0.1rem;
        .tips {
          max-width: 1.8rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          display: inline-block;
          // width: 1.1rem;
          padding: 0.02rem 0.15rem;
          text-align: center;
          height: 0.34rem;
          margin-left: 0.2rem;
          background: -webkit-linear-gradient(to right, #ff5282, 30%, #fd881f);
          background: -moz-linear-gradient(to right, #ff5282, 30%, #fd881f);
          background: -o-linear-gradient(to right, #ff5282, 30%, #fd881f);
          background: -ms-linear-gradient(to right, #ff5282, 30%, #fd881f);
          background: linear-gradient(to right, #ff5282, 30%, #fd881f);
          border-radius: 0.15rem 0 0.15rem 0;
          font-size: 70%;
          color: #fff;
        }
      }
      .num {
        width: 2.54rem;
        height: 0.63rem;
        margin: 0.2rem auto;
        display: flex;
        background: url(../assets/img/numBg.png);
        background-size: 100% 100%;
        span {
          display: block;
          width: 0.8rem;
          height: 100%;
          width: 0.83rem;
        }
        input {
          width: 0.89rem;
          background: none;
          outline: none;
          border: none;
          text-align: center;
          font-size: 120%;
          color: #fff;
        }
      }
      .coins {
        display: flex;
        align-items: center;
        justify-content: center;
        i {
          display: inline-block;
          width: 0.45rem;
          height: 0.47rem;
          background: url(../assets/img/GoldCoin.png);
          background-size: 100% 100%;
          &.dou {
            background: url(../assets/img/Goldenbeans.png);
            background-size: 100% 100%;
          }
        }
        em {
          font-size: 120%;
          color: #ef9600;
          margin-left: 0.18rem;
        }
      }
      .buyBtn {
        width: 2rem;
        height: 0.64rem;
        margin: 0.25rem auto 0;
        display: block;
        background: -webkit-linear-gradient(
          0deg,
          rgba(252, 169, 49, 1) 0%,
          rgba(253, 232, 40, 1) 100%
        );
        background: -moz-linear-gradient(
          0deg,
          rgba(252, 169, 49, 1) 0%,
          rgba(253, 232, 40, 1) 100%
        );
        background: -o-linear-gradient(
          0deg,
          rgba(252, 169, 49, 1) 0%,
          rgba(253, 232, 40, 1) 100%
        );
        background: -ms-linear-gradient(
          0deg,
          rgba(252, 169, 49, 1) 0%,
          rgba(253, 232, 40, 1) 100%
        );
        background: linear-gradient(
          0deg,
          rgba(252, 169, 49, 1) 0%,
          rgba(253, 232, 40, 1) 100%
        );
        border-radius: 0.3rem;
        font-size: 80%;
        color: #833700;
        line-height: 0.64rem;
        text-align: center;
        font-weight: bold;
      }
    }
  }
  .scrollLoading {
    text-align: center;
  }
  .scrollNone {
    text-align: center;
  }
}
</style>
