<template>
  <div class="rankGroups">
    <!-- 日榜、总榜切换主Tabs -->
    <div class="mainTabs">
      <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" href="">Top Angpau</a>
      <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" href="">Gambaran angpau</a>
      <div @click.prevent="onRefresh" href="" class="refresh" :style="{transform:'rotate('+rotatePx+'deg)'}" v-show="mainTab == 0"></div>
    </div>
    <!-- 日榜 -->
    <div v-if="mainTab==0" class="tabs">
      <a @click.prevent="tabClick(0)" :class="{current:tab==0}" href="">Top Master</a>
      <a @click.prevent="tabClick(1)" :class="{current:tab==1}" href="">Top Beruntung</a>
    </div>
    <div class="downTimebox" v-if="mainTab == 0">
      <p v-if="actStatus == 0">Acara mulai Hitung mundur</p>
      <!-- 活动结束 -->
      <p v-else-if="actStatus == 1">Acara berakhir Hitung mundur</p>
      <p v-else> Acara udh berakhir</p>
      <div class="timeDown" v-if="surplusTime.day">
        <div class="day">
          <strong>{{surplusTime.day}}</strong>
          <em>hari</em>
        </div>
        <div class="hours">
          <strong>{{surplusTime.hour}}</strong>
          <em>jam</em>
        </div>
        <div class="min">
          <strong>{{surplusTime.minute}}</strong>
          <em>menit</em>
        </div>
        <div class="second">
          <strong>{{surplusTime.second}}</strong>
          <em>Detik</em>
        </div>
      </div>
      <div class="noTime" v-else>Peringkat hari itu udh berakhir</div>
    </div>
    <div class="listBox" v-if="mainTab==0">
      <div class="titleBox">
        <span>Pangkat</span>
        <span>Alias(UID) </span>
        <span v-if="tab == 0">Jumlah total koin yg kirim angpau</span>
        <span v-else>Jumlah angpau yg terima</span>
      </div>
      <ul class="list day">
        <li v-for="(item,index) in rank.list" :key="index" :class="'rank'+item.rank" @click="goUser(item.uid)">
          <div class="top" :class="'top'+item.rank">
            {{item.rank}}
          </div>
          <img v-lazy="item.avatar" alt="" class="userImg">
          <div class="userMsg">
            <div class="name">{{item.nick}}</div>
            <div class="id">{{item.uid}}</div>
          </div>
          <div class="score" v-if="tab == 0">
            <i></i> {{item.score}}
          </div>
          <div class="score" v-else>
            <i></i> {{item.score}}
          </div>
        </li>
        <!-- 日榜和总榜共用Loading（如果需要细化加载提示文案，可以把以下标签复制到不同的榜单后面） -->
        <div v-if="rank.loading" class="scrollLoading">Sedang dimuat...</div>
        <div v-if="rank.list.length==0" class="scrollNone">Tiada data</div>
      </ul>
    </div>

    <red-back-tips v-else></red-back-tips>
    <!-- 抢红包攻略 -->
    <!-- <ul v-else class="list total" :class="'rank'+item.rank">
      <li v-for="(item,index) in rank.list" :key="index">总榜{{JSON.stringify(item)}}</li>
    </ul> -->
    <act-footer v-show="mainTab == 0"></act-footer>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import getUrlString from '../utils/getString.js';
import downTime from '../utils/downTime.js'
import RedBackTips from "../components/RedBackTips"
import ActFooter from "../components/ActFooter"
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
  components: { RedBackTips, ActFooter },
  data() {
    return {
      mainTab: 0,
      tab: 0,
      surplusTime: {},
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
      timer: null
    };
  },
  watch: {
    time(val) {
      this.downTimeGo('time1', val)
    }
  },
  computed: {
    ...mapState(['rankGroups', 'isOne', 'time', 'actStatus']),
    rankKey() {
      // return ['one', 'two', 'three'][this.tab];
      return this.mainTab == 1 ? 'total' : this.tab;
    },
    rankApi() {
      const token = getUrlString('token');
      if (token) {
        var dayApi = '/gifts_packet/rank.php?&token={token}&type={type}&from={from}';
      } else {
        var dayApi = '/gifts_packet/rank.php?&type={type}&from={from}';
      }
      // const api = this.rankKey == 'total' ? totalApi : dayApi;
      return dayApi.replace('{type}', this.rankKey + 1).replace('{token}', token);
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
      // this.$nextTick(() => {
      //   if (!this.rank.loadCount) {
      //     this.onScroll();
      //   }
      // });
    },
    tabClick(tab) {
      this.tab = tab;
      this.$store.commit('setTab', tab)
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      });
    },
    onScroll() {
      if (!this.rank.loading && !this.rank.loadEnd && !this.isOne && this.mainTab == 0) {
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

            if (this.rankKey == 1 && response_data.owner) {
              this.$store.commit('setUserMsg2', response_data.owner)
            }

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
    downTimeGo(timeName, val) {
      downTime(timeName, val);
      this.surplusTime = downTime(timeName);
      this.timer = setInterval(() => {
        this.surplusTime = downTime(timeName);
        if (this.surplusTime.end) {
          clearInterval(this.timer)
        }
      }, 1000)
    },
    goUser(uid) {
      location.href = `uid:${uid}`
    },
    onRefresh() {
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      if (this.rank.loading) return
      this.$parent.getDefaultData()
      if (this.tab == 1) {
        this.$store.commit('updateRankGroups', {
          key: this.rankKey,
          loadCount: 0,
          loadEnd: false,
          loading: false,
          none: false,
          list: [],
        });
        this.$nextTick(this.onScroll);
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.rankGroups {
  .mainTabs {
    margin: 0.47rem 0 0.33rem;
    height: 0.9rem;
    display: flex;
    justify-content: center;
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3.04rem;
      height: 0.9rem;
      background: url(../assets/img/mainTabBg.png);
      background-size: 100% 100%;
      font-weight: bold;
      color: #ae4800;
      font-size: 0.33rem;
      text-align: center;
      &.current {
        background: url(../assets/img/mainTabBgAct.png);
        background-size: 100% 100%;
      }
    }
    a:first-child {
      margin-right: 0.58rem;
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
  }
  .tabs {
    display: flex;
    width: 7rem;
    height: 0.85rem;
    background: url(../assets/img/tab.png);
    background-size: 100% 100%;
    margin: 0 auto 0.26rem;
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: 3.5rem;
      height: 0.85rem;
      color: #ae4800;
      font-size: 0.3rem;
      font-weight: bold;
      &.current {
        background: url(../assets/img/tab1.png);
        background-size: 100% 100%;
      }
    }
  }
  .downTimebox {
    width: 6.25rem;
    height: 1.77rem;
    text-align: center;
    margin: 0 auto;
    > p {
      height: 0.4rem;
      line-height: 0.4rem;
      color: #f4cf77;
      font-size: 80%;
      text-align: center;
    }
    .timeDown {
      margin: 0.3rem auto 0;
      width: 5.2rem;
      height: 0.84rem;
      background: url(../assets/img/timeBg.png);
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0.26rem 0 0.15rem;
      > div {
        line-height: 0.5rem;
        display: inline-block;
        display: flex;
        margin-top: 0.08rem;
        strong {
          display: block;
          width: 0.7rem;
          height: 0.7rem;
          line-height: 0.7rem;
          color: #fff8d7;
          font-size: 0.5rem;
          border-radius: 0.1rem;
          font-weight: 900;
        }
        em {
          color: #f8b461;
          font-size: 0.24rem;
          margin: 0.15rem 0 0 0.15rem;
        }
      }
    }
    .noTime {
      line-height: 0.6rem;
    }
  }
  .listBox {
    width: 6.79rem;
    background: url(../assets/img/listBgTop.png) no-repeat;
    background-size: 100% auto;
    padding: 0.15rem 0.1rem 1.2rem;
    margin: 0 auto;
    .titleBox {
      padding: 0 0.15rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.22rem;
      color: #ffd36e;
      margin-bottom: 0.05rem;
    }
    .list {
      // width: 7rem;
      // margin: 0.27rem auto;
      // border-radius: 0.1rem;
      // padding: 0.3rem 0.1rem 1.2rem;
      li {
        height: 1.21rem;
        margin-bottom: 0.11rem;
        background: url(../assets/img/4.png);
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        .top {
          width: 0.84rem;
          height: 0.73rem;
          color: #fefed5;
          font-weight: bold;
          font-size: 0.36rem;
          text-align: center;
          line-height: 0.73rem;
          margin: 0 0.03rem 0 0.18rem;
        }
        .userImg {
          width: 0.89rem;
          height: 0.89rem;
          border-radius: 50%;
          border: 0.03rem solid #fdd5b4;
          font-size: 0.24rem;
          color: #fffaee;
        }
        .userMsg {
          width: 2.4rem;
          margin-left: 0.15rem;
          .name {
            max-width: 2.4rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #fffaee;
          }
          .id {
            font-size: 0.24rem;
            color: #9a3600;
            margin-top: 0.05rem;
          }
        }
        .score {
          font-size: 0.28rem;
          color: #fff088;
          font-weight: 500;
          i {
            display: inline-block;
            width: 0.4rem;
            height: 0.61rem;
            vertical-align: middle;
            margin: -0.2rem 0.15rem 0;
            background: url(../assets/img/redBack.png);
            background-size: 100% 100%;
          }
        }
        &.rank1 {
          background: url(../assets/img/1.png);
          background-size: 100% 100%;
          .top {
            text-indent: -999rem;
            background: url(../assets/img/top1.png);
            background-size: 100% 100%;
          }
        }
        &.rank2 {
          background: url(../assets/img/2.png);
          background-size: 100% 100%;
          .top {
            text-indent: -999rem;
            background: url(../assets/img/top2.png);
            background-size: 100% 100%;
          }
        }
        &.rank3 {
          background: url(../assets/img/3.png);
          background-size: 100% 100%;
          .top {
            text-indent: -999rem;
            background: url(../assets/img/top3.png);
            background-size: 100% 100%;
          }
        }
      }
      .scrollLoading,
      .scrollNone {
        text-align: center;
        margin-top: 0.15rem;
      }
    }
  }
}
</style>
