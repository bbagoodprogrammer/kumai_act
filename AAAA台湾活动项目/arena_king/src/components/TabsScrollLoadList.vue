<template>
  <div class="rankGroups" :class="{main1:mainTab== 0}">
    <!-- 日榜、总榜切换主Tabs -->
    <div class="mainTabs">
      <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" href="">風雲賽</a>
      <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" href="">爭霸賽</a>
      <!-- <a @click.prevent="onRefresh" href="">刷新</a> -->
    </div>
    <!-- 日榜 -->
    <div v-if="mainTab==0" class="tabs">
      <a @click.prevent="tabClick(1)" :class="{current:tab==1}" href="">風雲榜</a>
      <a @click.prevent="tabClick(2)" :class="{current:tab==2}" href="">擂主榜</a>
    </div>
    <!-- 風雲賽開始 -->
    <div class="rank1Tips" v-show="mainTab==0 && tab==1">
      <div class="rank1Time">
        <div class="end" v-if="step1 == 2">— 風雲賽已結束 —</div>
        <div class="time" v-else-if="step1 == 1">
          <div class="timeTitle">— 風雲賽結束倒計時 —</div>
          <div class="timeItem">
            <span><em>{{surplusTime.day}}</em><i>天</i> </span>
            <span><em>{{surplusTime.hour}}</em><i>時</i> </span>
            <span><em>{{surplusTime.minute}}</em><i>分</i> </span>
            <span><em>{{surplusTime.second}}</em><i>秒</i></span>
          </div>
        </div>
        <div class="forward" v-else>— 敬请期待 —</div>
      </div>
      <p class="msgTips">
        依據擂臺模式下獲得PK票數排名
        </br> 除擂主外前12名晉級爭霸賽並擔任挑戰者
        </br> 收到以下擂臺禮物獲得5%票數加成
      </p>
      <div class="wardImgBox">
        <div class="imgItme"></div>
        <div class="wardName">
          <span>鳴鑼助威</br>20金幣/個</span>
          <span>擊鼓助威</br>168金幣/個</span>
          <span>擂臺金杯</br>528金幣/個</span>
        </div>
      </div>
    </div>
    <!-- 風雲賽結束 -->
    <!-- 擂臺賽開始 -->
    <div class="rank2Tips" v-show="mainTab==0 &&tab==2">
      <div class="rank1Time">
        <div class="end" v-if="step1 == 2">— 擂主賽已結束 —</div>
        <div class="time" v-else-if="step1 == 1">
          <div class="timeTitle">— 擂主賽結束倒計時 —</div>
          <div class="timeItem">
            <span><em>{{surplusTime.day}}</em><i>天</i> </span>
            <span><em>{{surplusTime.hour}}</em><i>時</i> </span>
            <span><em>{{surplusTime.minute}}</em><i>分</i> </span>
            <span><em>{{surplusTime.second}}</em><i>秒</i></span>
          </div>
        </div>
        <div class="forward" v-else>— 敬请期待 —</div>
      </div>
      <p class="msgTips">
        依據活動期間獲得擂主次數排名</br>
        前4名晉級爭霸賽並擔任擂主
      </p>
    </div>
    <!-- 擂臺賽結束 -->
    <!-- 風雲賽兩個榜單 -->
    <ul v-if="mainTab==0" class="list day">
      <li v-for="(item,index) in rank.list" :key="index" :class="'rank'+item.rank" @click="goHtml(item.rstatus,item.uid)">
        <div class="rank" :class="{challenger:item.winner == 1}">{{item.rank}}</div>
        <div class="imgBox">
          <img src="../assets/img/top1Img.png" alt="" class="top1Img" v-if="item.rank == 1">
          <img v-lazy="item.avatar" alt="" class="userImg">
          <span class="live" v-if="item.rstatus > 0"></span>
        </div>
        <div class="userMsg">
          <div class="name">{{item.nick}}</div>
          <div class="uid">UID:{{item.uid}}</div>
        </div>
        <div class="default" :class="{promotionTips:tab==1&&item.up == 1}"></div>
        <div class="scoreBox">
          <i class="Microphone" :class="{leizhu:tab==2}"></i>
          <em>{{item.score}}</em>
        </div>
      </li>
    </ul>
    <!-- 总榜 -->
    <user-pk v-show="mainTab==1" ref="userPk"></user-pk>
    <!-- <ul  class=" list total">
      <li v-for="(item,index) in rank.list" :key="index">总榜{{JSON.stringify(item)}}</li>
    </ul> -->
    <!-- 日榜和总榜共用Loading（如果需要细化加载提示文案，可以把以下标签复制到不同的榜单后面） -->
    <div v-if="rank.loading" class="scrollLoading">加載中...</div>
    <div v-if="rank.none" class="scrollNone">列表為空！</div>
    <!-- <div v-if="mainTab==0 && tab > nowDay">敬請期待</div> -->
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import getUrlString from '../utils/getString.js';
import api from "../api/apiConfig"
// import DayTabs from "../components/DayTabs"
import downTime from '../utils/downTime.js'
import UserPk from './UserPk'
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
  components: { UserPk },
  data() {
    return {
      mainTab: 0,
      tab: 1,
      surplusTime: {},
    };
  },
  computed: {
    ...mapState(['rankGroups', 'setInited', 'step1', 'step2', 'step1Time', 'userGroups']),
    rankKey() {
      // return ['one', 'two', 'three'][this.tab];
      return this.mainTab == 1 ? 'total' : this.tab;
    },
    rankApi() {
      const token = getUrlString('token');
      if (token) {
        var dayApi = '/arena_pk/rank.php?type={type}&from={from}&token={token}';
      } else {
        var dayApi = '/arena_pk/rank.php?type={type}&from={from}';
      }
      return dayApi.replace('{type}', this.rankKey).replace('{token}', token).replace('{step}', 1);
    },
    rankSize() {
      // 如果明确服务器每次返回的列表长度，请返回具体的数值，有助于减少一次额外请求即可确定加载完所有数据
      return 20;
    },
    rank() {
      const rankConf = this.rankGroups[this.rankKey] || {};
      rankConf.list = rankConf.list || [];
      return rankConf;
    },
  },
  watch: {
    step1Time(val) {
      this.downTimeGo(val)
    }
  },
  mounted() {
    this.onScroll(); // 如果默认展示的Tabs依赖服务器配置，把此方法移到watch中去调用（watch更新Tabs值后调onScroll）
    // 如果初始化接口返回当前榜单数据，可以在Store的Action拿到服务器数据时先调用commit('updateRankGroups', {key:key, list:[]})，再更新state.tab触发组件watch
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    mainTabClick(tab) {
      this.mainTab = tab;
      this.$store.commit('changMainTab', tab)
      if (tab == 1) {
        this.getRank3Data()  //争霸赛接口
      }
    },
    tabClick(tab) {
      this.tab = tab;
      this.$store.commit('changTab', tab)
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      });
    },
    getRank3Data() {
      if (Object.keys(this.userGroups).length == 0) {
        api.getMain2().then(res => {
          const { response_data } = res.data
          this.$store.commit('updateNowUserStep', response_data.step)
          this.$store.commit('changMainRoom', response_data.room)
          this.$store.commit('updateUserGroups', {
            key: response_data.step,
            users: response_data.users
          });
        })
      }
    },
    downTimeGo(val) {
      downTime('time1', val);
      this.surplusTime = downTime('time1');
      this.timer = setInterval(() => {
        this.surplusTime = downTime('time1');
        if (this.surplusTime.end) {
          clearInterval(this.timer)
          this.$store.commit('changStep', 2)
        }
      }, 1000)
    },
    onScroll() {
      if (this.setInited === 0) { //初始化是少一次請求,是日榜的时候和不是总榜的时候返回
        return
      }
      if (!this.rank.loading && !this.rank.loadEnd && this.mainTab !== 1) {
        const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100;
        const notFull = document.body.scrollHeight < window.innerHeigh;
        if (scrollToBottom || notFull) {
          const key = this.rankKey;

          const set = (k, v) => {
            this.$store.commit('updateRankGroups', { key, [k]: v });
          };

          set('loading', true);
          axios.get(this.rankApi.replace('{from}', this.rank.list.length)).then(res => {
            set('loading', false);

            const { response_status, response_data } = res.data;

            if (response_status.code != 0) {
              set('loadEnd', true);
              return;
            }
            //存入擂主榜的个人信息
            if (this.rankKey == 2 && response_data.owner) {
              this.$store.commit('changUserMsg2', response_data.owner)
            }
            //存入榜单操作
            const arr = response_data.list;
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
          }).catch(err => {
            set('loading', false);
            set('loadEnd', true);
          });
        }
      }
    },
    onRefresh() {
      if (this.mainTab == 0) {
        this.$store.commit('updateRankGroups', {
          key: this.rankKey,
          loadCount: 0,
          loadEnd: false,
          loading: false,
          none: false,
          list: [],
        });
        this.$nextTick(this.onScroll);
      } else {
        this.$refs.userPk.onRefresh()
      }
    },
    goHtml(rstatus, uid) {
      if (rstatus > 0) {
        location.href = `rid:${rstatus}`
      } else {
        location.href = `uid:${uid}`
      }
    }
  },
}
</script>

<style lang="scss">
.rankGroups {
  &.main1 {
    padding-bottom: 1.5rem;
  }
  .mainTabs {
    width: 6.9rem;
    height: 0.9rem;
    background: url(../assets/img/tabsBg.png);
    background-size: 100% 100%;
    margin: 0.28rem auto;
    display: flex;
    align-items: center;
    padding: 0 0.05rem;
    a {
      display: block;
      width: 3.59rem;
      height: 0.84rem;
      font-size: 120%;
      color: #e1ab70;
      text-align: center;
      line-height: 0.84rem;
      &.current {
        color: #fff9d6;
        background: url(../assets/img/actTabs.png);
        background-size: 100% 100%;
      }
    }
  }
  .tabs {
    width: 4.25rem;
    height: 0.7rem;
    background: url(../assets/img/minTabsBg.png);
    background-size: 100% 100%;
    margin: 0.23rem auto 0;
    display: flex;
    align-items: center;
    padding: 0 0.05rem;
    a {
      display: block;
      width: 2.3rem;
      height: 0.66rem;
      color: #e1ab70;
      text-align: center;
      line-height: 0.66rem;
      &.current {
        color: #fff9d6;
        background: url(../assets/img/minActTabs.png);
        background-size: 100% 100%;
      }
    }
  }
  .rank1Tips {
    width: 7.5rem;
    background: url(../assets/img/rank1WardBg.png) no-repeat;
    background-size: 100% 2.74rem;
    background-position: 0 0.35rem;
    margin-top: 0.38rem;
    .rank1Time {
      width: 4.22rem;
      height: 0.86rem;
      background: url(../assets/img/timeBg.png);
      background-size: 100% 100%;
      margin: 0 auto;
      .timeTitle {
        font-size: 72%;
        color: #d89d58;
        text-align: center;
        height: 0.3rem;
        line-height: 0.3rem;
      }
      .timeItem {
        height: 0.56rem;
        color: #d89d58;
        display: flex;
        align-items: center;
        padding: 0 0.27rem;
        span {
          flex: 1;
          em {
            color: #fff3ba;
            font-size: 120%;
            margin-right: 0.16rem;
          }
          i {
            font-size: 71%;
          }
        }
      }
    }
    .msgTips {
      margin-top: 0.18rem;
      color: #d89d58;
      font-size: 80%;
      text-align: center;
    }
    .wardImgBox {
      width: 5.05rem;
      margin: 0.11rem auto 0;
      .imgItme {
        height: 1.41rem;
        background: url(../assets/img/wardItemBg.png);
        background-size: 100% 100%;
      }
      .wardName {
        display: flex;
        span {
          flex: 1;
          text-align: center;
          color: #835a3e;
          font-size: 71%;
          white-space: nowrap;
        }
        span:nth-child(1) {
          margin-right: 0.3rem;
        }
        span:nth-child(2) {
          margin-right: 0.3rem;
        }
      }
    }
  }
  .rank2Tips {
    margin-top: 0.21rem;
    .rank1Time {
      width: 4.22rem;
      height: 0.86rem;
      background: url(../assets/img/timeBg.png);
      background-size: 100% 100%;
      margin: 0 auto;
      .timeTitle {
        font-size: 72%;
        color: #d89d58;
        text-align: center;
        height: 0.3rem;
        line-height: 0.3rem;
      }
      .timeItem {
        height: 0.56rem;
        color: #d89d58;
        display: flex;
        align-items: center;
        padding: 0 0.27rem;
        span {
          flex: 1;
          em {
            color: #fff3ba;
            font-size: 120%;
            margin-right: 0.16rem;
          }
          i {
            font-size: 71%;
          }
        }
      }
    }
    .msgTips {
      margin-top: 0.18rem;
      color: #d89d58;
      font-size: 80%;
      text-align: center;
    }
  }
  .list {
    width: 7.12rem;
    margin: 0.23rem auto;
    li {
      height: 1rem;
      background: url(../assets/img/rankItemBg.png);
      background-size: 100% 100%;
      margin-top: 0.05rem;
      display: flex;
      align-items: center;
      .rank {
        width: 0.84rem;
        height: 0.72rem;
        margin-left: 0.12rem;
        text-align: center;
        line-height: 0.72rem;
        font-size: 111%;
        color: #864e22;
        &.challenger {
          width: 0.83rem;
          height: 0.85rem;
          text-indent: -999rem;
          background: url(../assets/img/rankLei.png);
          background-size: 100% 100%;
        }
      }
      .imgBox {
        width: 0.78rem;
        height: 0.78rem;
        margin-left: 0.2rem;
        position: relative;
        .top1Img {
          width: 0.81rem;
          height: 0.92rem;
          position: absolute;
          top: -0.16rem;
          left: 0.02rem;
        }
        .userImg {
          width: 0.78rem;
          height: 0.78rem;
          border-radius: 50%;
          border: 0.02rem solid rgba(232, 157, 23, 1);
          box-sizing: border-box;
        }
        .live {
          width: 0.64rem;
          height: 0.28rem;
          background: url(../assets/img/live.png);
          background-size: 100% 100%;
          position: absolute;
          bottom: 0;
          left: 0.07rem;
        }
      }
      .userMsg {
        width: 1.8rem;
        // height: 0.64rem;
        margin-left: 0.12rem;
        .name {
          font-size: 98%;
          color: #fff9d6;
          max-width: 1.8rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .uid {
          font-size: 80%;
          color: #fff9d6;
          margin-top: 0.05rem;
        }
      }
      .default {
        width: 0.99rem;
        height: 0.39rem;
        margin-left: 0.2rem;
        &.promotionTips {
          background: url(../assets/img/promotionTips.png);
          background-size: 100% 100%;
        }
      }
      .scoreBox {
        display: flex;
        align-items: center;
        margin-left: 0.24rem;
        .Microphone {
          display: block;
          width: 0.39rem;
          height: 0.4rem;
          background: url(../assets/img/Microphone.png);
          background-size: 100% 100%;
          &.leizhu {
            width: 0.43rem;
            height: 0.44rem;
            background: url(../assets/img/leizhu.png);
            background-size: 100% 100%;
          }
        }
        em {
          color: #fff88e;
          font-size: 98%;
          margin-left: 0.09rem;
        }
      }

      &.rank1 {
        background: url(../assets/img/rankTopBg.png);
        background-size: 100% 100%;
        // .rank {
        //   text-indent: -999rem;
        //   background: url(../assets/img/top1.png);
        //   background-size: 100% 100%;
        // }
      }
      &.rank2 {
        background: url(../assets/img/rankTopBg.png);
        background-size: 100% 100%;
        // .rank {
        //   text-indent: -999rem;
        //   background: url(../assets/img/top2.png);
        //   background-size: 100% 100%;
        // }
      }
      &.rank3 {
        background: url(../assets/img/rankTopBg.png);
        background-size: 100% 100%;
        // .rank {
        //   text-indent: -999rem;
        //   background: url(../assets/img/top3.png);
        //   background-size: 100% 100%;
        // }
      }
    }
  }
  .forward {
    color: #e1ab70;
    text-align: center;
    height: 0.86rem;
    line-height: 0.86rem;
  }
  .end {
    color: #e1ab70;
    text-align: center;
    height: 0.86rem;
    line-height: 0.86rem;
  }
  .scrollLoading {
    text-align: center;
  }
  .scrollNone {
    text-align: center;
  }
}
</style>
