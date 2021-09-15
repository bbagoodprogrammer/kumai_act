<template>
  <div class="rankGroups">
    <div class="title"><i @click="closeRank()"></i>{{lang.rankTitle}}</div>
    <!-- 日榜、总榜切换主Tabs -->
    <div class="mainTabs">
      <span @click.prevent="mainTabClick(0)" :class="{act:mainTab==0}" class="tabL">{{lang.rankTab1}}</span>
      <span @click.prevent="mainTabClick(1)" :class="{act:mainTab==1}" class="tabR">{{lang.rankTab2}}</span>
    </div>
    <ul class="list">
      <li v-for="(item,index) in rank.list" :key="index" :class="'rank' + item.rank">
        <div class="userRank">{{item.rank}}</div>
        <img v-lazy="item.avatar" alt="" @click="goUser(item.uid)">
        <div class="nick">{{item.nick}}</div>
        <div class="score">
          <span></span>
          <strong>{{item.score}}</strong>
        </div>
      </li>
    </ul>
    <!-- 任務列表 -->
    <!-- <taskList v-else></taskList> -->
    <!-- 日榜和总榜共用Loading（如果需要细化加载提示文案，可以把以下标签复制到不同的榜单后面） -->
    <div v-if="rank.loading" class="scrollLoading">{{lang.loading}}</div>
    <div v-if="rank.none" class="scrollNone">
      {{lang.noData}}
    </div>
    <!-- :class="'rank' + userMsg.rank" -->
    <div class="usermsg" v-if="userMsg.uid">
      <div class="userRank" :class="{noRank:userMsg.rank==0}">{{userMsg.rank==0?lang.noRank:userMsg.rank}}</div>
      <img v-lazy="userMsg.avatar" alt="">
      <div class="nick">{{userMsg.nick}}</div>
      <div class="score">
        <span></span>
        <strong>{{userMsg.score}}</strong>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import { getUrlString } from '../utils';
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
    }
  },
  computed: {
    ...mapState(['rankGroups', 'groupsUserMsg']),
    rankKey () {
      return this.mainTab == 1 ? 'total' : this.mainTab;
    },
    rankApi () {
      const token = getUrlString('token') || '';
      const uid = getUrlString('uid') || '';
      return `/index.php?action=Action/SnatchTreasure.rank&type=${this.mainTab}&page=${this.rank.page ? this.rank.page + 1 : 1}&uid=${uid}&token=${token}`;
    },
    rankSize () {
      // 如果明确服务器每次返回的列表长度，请返回具体的数值，有助于减少一次额外请求即可确定加载完所有数据
      return 20;
    },
    rank () {
      const rankConf = this.rankGroups[this.rankKey] || {};
      rankConf.list = rankConf.list || [];
      return rankConf;
    },
    userMsg () {
      return this.groupsUserMsg[this.rankKey] ? this.groupsUserMsg[this.rankKey].msg : {}
    }
  },
  mounted () {
    // 如果初始化接口返回当前榜单数据，可以在Store的Action拿到服务器数据时先调用commit('updateRankGroups', {key:key, list:[]})，再更新state.tab触发组件watch
    window.addEventListener('scroll', this.onScroll);
    setTimeout(() => {
      this.onScroll(); // 如果默认展示的Tabs依赖服务器配置，把此方法移到watch中去调用（watch更新Tabs值后调onScroll）
    }, 0)

  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    closeRank () {
      this.$parent.showRank = false
      this.vxc('resetRank')
    },
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
          axios.get(this.rankApi.replace('{from}', this.rank.list.length)).then(res => {
            const { response_status, response_data } = res.data;

            // if (response_status.code != 0) {
            //   set('loadEnd', true);
            //   return;
            // }
            const arr = response_data.ranklist;

            set('page', this.rank.page ? this.rank.page + 1 : 1)
            //跟随榜单变换个人信息
            if (response_data.myself && response_data.myself.uid) {
              this.$store.commit("changGroupsUserMsg", {//初始当前日榜个人信息
                key: this.rankKey,
                msg: response_data.myself
              })
            }
            //倒计时
            // set('second', response_data.second)

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
    goUser (uid) { //跳转
      var isiOS = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      if (isiOS) {
        sendJsData('app://userInfo?uid=' + uid);
      } else {
        javascript: JSInterface.sendJsData('app://userInfo?uid=' + uid);
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.rankGroups {
  width: 7.5rem;
  height: 9.31rem;
  background: url(../img/pupBg.png);
  background-size: 100% 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  .title {
    height: 0.98rem;
    display: flex;
    align-items: center;
    font-size: 0.36rem;
    i {
      width: 0.48rem;
      height: 0.48rem;
      background: url(../img/black.png);
      background-size: 100% 100%;
      margin: 0 0.08rem 0 0.32rem;
    }
  }
  .mainTabs {
    width: 6.38rem;
    height: 0.8rem;
    background: #6E1ACC;
    border-radius: 0.4rem;
    margin: 0.1rem auto 0;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      width: 3.08rem;
      height: 0.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.32rem;
      color: rgba(255, 255, 255, 0.6);
      &.act {
        color: #ffff;
        background: url(../img/tabAct.png);
        background-size: 100% 100%;
      }
    }
  }
  ul {
    max-height: 5.88rem;
    overflow-y: scroll;
    margin-top: 0.15rem;
    padding-bottom: 1.4rem;
  }
  li,
  .usermsg {
    height: 1.56rem;
    margin-bottom: 0.01rem;
    display: flex;
    align-items: center;
    .userRank {
      width: 0.7rem;
      height: 0.4rem;
      text-align: center;
      line-height: 0.4rem;
      font-size: 0.28rem;
      margin: 0 0.15rem 0 0.12rem;
      white-space: nowrap;
      &.noRank {
        width: 1.1rem;
        white-space: normal;
        margin: -0.4rem 0.15rem 0 0.12rem;
      }
    }
    > img {
      width: 1.1rem;
      height: 1.1rem;
      border-radius: 50%;
    }
    .nick {
      width: 2.8rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 0.32rem;
      margin-left: 0.11rem;
    }
    .score {
      flex: 1;
      text-align: right;
      margin-right: 0.3rem;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      span {
        display: block;
        width: 0.48rem;
        height: 0.48rem;
        background: url(../img/tIcon.png);
        background-size: 100% 100%;
      }
      strong {
        display: block;
        font-size: 0.32rem;
        font-style: italic;
      }
    }
    &.rank1 {
      .userRank {
        text-indent: -999rem;
        background: url(../img/top1.png);
        background-size: 100% 100%;
      }
    }
    &.rank2 {
      .userRank {
        text-indent: -999rem;
        background: url(../img/top2.png);
        background-size: 100% 100%;
      }
    }
    &.rank3 {
      .userRank {
        text-indent: -999rem;
        background: url(../img/top3.png);
        background-size: 100% 100%;
      }
    }
  }
  .usermsg {
    width: 100%;
    height: 1.4rem;
    background: linear-gradient(90deg, #FDBA9D 0%, #FD329B 100%);
    margin-bottom: 0;
    position: absolute;
    bottom: 0;
  }
}

.scrollLoading,
.scrollNone {
  text-align: center;
  font-size: 80%;
  margin-top: 0.6rem;
}
</style>
