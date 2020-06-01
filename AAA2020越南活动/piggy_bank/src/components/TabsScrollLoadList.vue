<template>
  <div class="rankGroups">
    <!-- 日榜、总榜切换主Tabs -->
    <div class="mainTabs">
      <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" href="">{{lang.rankTitle1}}</a>
      <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" href="">{{lang.rankTitle2}}</a>
    </div>
    <a @click.prevent="onRefresh" href="" class="refresh" :style="{transform:'rotate('+rotatePx+'deg)'}"></a>
    <!-- 日榜 -->
    <!-- <div v-if="mainTab==0" class="tabs">
      <a @click.prevent="tabClick(0)" :class="{current:tab==0}" href="">日榜1</a>
      <a @click.prevent="tabClick(1)" :class="{current:tab==1}" href="">日榜2</a>
      <a @click.prevent="tabClick(2)" :class="{current:tab==2}" href="">日榜3</a>
    </div> -->
    <!-- <div class="downTime" v-if="showTimeState && tab == nowDay">
      <span>{{surplusTime.day}}</span>
      <span>{{surplusTime.hour}}</span>
      <span>{{surplusTime.minute}}</span>
      <span>{{surplusTime.second}}</span>
    </div> -->
    <ul v-if="mainTab==0" class="list day">
      <li v-for="(item,index) in rank.list" :key="index" :class="'rank'+item.rank" @click="goUser(item.rid,item.uid)">
        <div class="rank">{{item.rank}}</div>
        <div class="userImg">
          <span class="imgBor"></span>
          <img v-lazy="item.avatar" alt="" class="userAtr">
        </div>
        <div class="userMsg">
          <div class="name">{{item.nick}}</div>
          <div class="id">{{item.uid}} <em v-if="item.rid >0"></em> </div>
        </div>
        <div class="scoreBox">
          <div class="score">{{lang.score}}: <strong>{{item.rank_score}}</strong></div>
          <div class="gua" v-if="item.rank <=10">{{lang.branch}} {{item.share_money}} {{lang.ynB}}</div>
          <div class="gua" v-else-if="item.rank >10 && item.rank <=20">Tăng điểm sự kiện lần sau {{item.addition_rate * 100 +'%'}}</div>
        </div>
      </li>
    </ul>
    <!-- 总榜 -->
    <ul v-else class="list total">
      <li v-for="(item,index) in rank.list" :key="index" :class="'rank'+item.rank" @click="goUser(item.rid,item.uid)">
        <div class="rank" :class="'rank'+item.rank">{{item.rank}}</div>
        <div class="userImg">
          <span class="imgBor"></span>
          <img v-lazy="item.avatar" alt="" class="userAtr">
        </div>
        <div class="userMsg">
          <div class="name">{{item.nick}}</div>
          <div class="id">{{item.uid}}</div>
        </div>
        <div class="scoreBox">
          <div class="score">{{lang.gotConis}} {{item.rank_score}}</div>
        </div>
      </li>
    </ul>
    <!-- 日榜和总榜共用Loading（如果需要细化加载提示文案，可以把以下标签复制到不同的榜单后面） -->
    <div v-if="rank.loading" class="scrollLoading">Đang tải...</div>
    <div v-if="rank.none" class="scrollNone">
      Chưa có ai được xếp hạng</br>
      Chỗ trống đang đợi bạn đấy!</div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import getUrlString from '../utils/getString.js';
import downTime from '../utils/downTime.js'

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
  data() {
    return {
      mainTab: 0,
      tab: 0,
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
    };
  },
  watch: {
    userMsg() {
      let type = 0
      if (!this.userMsg.is_anchor) {
        type = 1
      }
      this.mainTab = type
      this.vxc('setMainTab', type)
    }
  },
  computed: {
    ...mapState(['rankGroups', 'userMsg', 'isFirst']),
    rankKey() {
      // return ['one', 'two', 'three'][this.tab];
      return this.mainTab == 1 ? 'total' : this.tab;
    },
    rankApi() {
      const dayApi = '/piggy_bank/anchorRank.php?from={from}';
      const totalApi = '/piggy_bank/guardRank.php?from={from}';

      const api = this.rankKey == 'total' ? totalApi : dayApi;

      const token = getUrlString('token') || '';
      return api.replace('{token}', token);
    },
    rankSize() {
      // 如果明确服务器每次返回的列表长度，请返回具体的数值，有助于减少一次额外请求即可确定加载完所有数据
      return 10;
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
      this.vxc('setMainTab', tab)
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      });
    },
    // tabClick(tab) {
    //   this.tab = tab;
    //   this.$nextTick(() => {
    //     if (!this.rank.loadCount) {
    //       this.onScroll();
    //     }
    //   });
    // },
    onScroll() {
      if (!this.rank.loading && !this.rank.loadEnd && !this.isFirst) {
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
            if (this.rankKey == 'total') {
              var arr = response_data.guard_rank;
            } else {
              var arr = response_data.anchor_rank;
            }
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
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      if (this.rank.loading) return
      this.$parent.getDefaultData()
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
    goUser(rid, uid) {
      if (rid && rid > 0) {
        location.href = `rid:${rid}`
      } else {
        location.href = `uid:${uid}`
      }
    }
  },
}
</script>

<style lang="scss">
.rankGroups {
  position: relative;
  .mainTabs {
    width: 6.91rem;
    height: 0.89rem;
    background: url(../assets/img/tabsBg.png);
    background-size: 100% 100%;
    margin: 0.22rem auto;
    display: flex;
    a {
      display: block;
      width: 3.66rem;
      height: 0.89rem;
      text-align: center;
      white-space: nowrap;
      font-size: 0.36rem;
      color: #1cdde3;
      font-weight: bold;
      line-height: 0.89rem;
      &.current {
        color: #fff;
        background: url(../assets/img/actTab.png);
        background-size: 100% 100%;
      }
    }
  }
  .list {
    padding: 0 0.25rem;
    margin-top: 0.27rem;
    li {
      display: flex;
      align-items: center;
      height: 1.15rem;
      background: url(../assets/img/itemBg.png);
      background-size: 100% 100%;
      margin-bottom: 0.09rem;
      .rank {
        width: 0.75rem;
        height: 0.65rem;
        text-align: center;
        line-height: 0.65rem;
        color: #ffdde8;
        font-weight: 700;
        font-size: 0.36rem;
        font-style: italic;
        margin-left: 0.15rem;
      }
      .userImg {
        position: relative;
        width: 1.09rem;
        height: 1.09rem;
        margin-left: 0.09rem;
        .imgBor {
          display: block;
          width: 1.09rem;
          height: 1.09rem;
          background: url(../assets/img/userAtrBor.png);
          background-size: 100% 100%;
          position: absolute;
          z-index: 5;
        }
        .userAtr {
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          position: absolute;
          left: 0.045rem;
          top: 0.045rem;
        }
      }
      .userMsg {
        width: 2.1rem;
        margin-left: 0.09rem;
        .name {
          font-size: 0.26rem;
          font-weight: 500;
          max-width: 2.1rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .id {
          color: #93e7ff;
          font-weight: 500;
          font-size: 0.22rem;
          display: flex;
          align-items: center;
          em {
            display: block;
            width: 0.66rem;
            height: 0.19rem;
            background: url(../assets/img/live.gif);
            background-size: 100% 100%;
            margin-left: 0.1rem;
          }
        }
      }
      .scoreBox {
        width: 2.3rem;
        margin-left: 0.45rem;
        .score {
          font-size: 0.24rem;
          strong {
            font-weight: 700;
            font-size: 0.3rem;
          }
        }
        .gua {
          font-size: 0.24rem;
          color: #fffec6;
        }
      }
      &.rank1 {
        background: url(../assets/img/top1Bg.png);
        background-size: 100% 100%;
        .rank {
          text-indent: -999rem;
          background: url(../assets/img/rank1.png);
          background-size: 100% 100%;
        }
        .imgBor {
          width: 1.11rem;
          height: 1.25rem;
          background: url(../assets/img/top1.png);
          background-size: 100% 100%;
          top: -0.17rem;
          left: -0.02rem;
        }
      }
      &.rank2 {
        background: url(../assets/img/top2Bg.png);
        background-size: 100% 100%;
        .rank {
          text-indent: -999rem;
          background: url(../assets/img/rank2.png);
          background-size: 100% 100%;
        }
        .imgBor {
          width: 1.11rem;
          height: 1.25rem;
          background: url(../assets/img/top2.png);
          background-size: 100% 100%;
          top: -0.17rem;
          left: -0.02rem;
        }
      }
      &.rank3 {
        background: url(../assets/img/top2Bg.png);
        background-size: 100% 100%;
        .rank {
          text-indent: -999rem;
          background: url(../assets/img/rank3.png);
          background-size: 100% 100%;
        }
        .imgBor {
          width: 1.11rem;
          height: 1.25rem;
          background: url(../assets/img/top3.png);
          background-size: 100% 100%;
          top: -0.17rem;
          left: -0.02rem;
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
  .scrollLoading,
  .scrollNone {
    text-align: center;
  }
}
</style>
