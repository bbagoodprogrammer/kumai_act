<template>
  <div class="rankGroups">
    <!-- 日榜、总榜切换主Tabs -->
    <div class="mainTabs">
      <div class="tabs">
        <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" class="tab1">{{lang.rankTitle}}</a>
        <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" class="tab2">{{lang.rankTitle2}}</a>
      </div>
      <a @click.prevent="onRefresh" href="" :style="{transform:'rotate('+rotatePx+'deg)'}" id="refresh"></a>
    </div>
    <div class="list day" v-if="mainTab==0 && rank.list.length">
      <p class="tips">{{lang.rankTips}}</p>
      <ul>
        <li v-for="(item,index) in rank.list" :key="index" :class="'rank'+item.rank" @click="goUser(item.uid)">
          <div class="rank">{{item.rank}}</div>
          <div class="uerImg">
            <img v-if="item.avatar_frame &&item.avatar_frame != ''" :src="item.avatar_frame" class="frame" alt="">
            <!-- <img src="../assets/img/testFrame.png" class="frame" alt=""> -->
            <img v-else-if="item.nob > 0" :src="require(`../img/nob/${item.nob}.png`)" class="nob" alt="">
            <img v-lazy="item.avatar" alt="" class="av">
          </div>
          <div class="nick">{{item.nick}}</div>
          <div class="score"><i></i>{{item.score}}</div>
        </li>
      </ul>
    </div>

    <!-- 总榜 -->
    <div v-else-if="mainTab==1 && rank.list.length" class="list total">
      <p class="tips">{{lang.rankTips2}}</p>
      <ul>
        <li v-for="(item,index) in rank.list" :key="index" :class="'rank'+item.rank" @click="goUser(item.uid)">
          <div class="rank">{{item.rank}}</div>
          <div class="uerImg">
            <img v-if="item.avatar_frame &&item.avatar_frame != ''" :src="item.avatar_frame" class="frame" alt="">
            <!-- <img src="../assets/img/testFrame.png" class="frame" alt=""> -->
            <img v-else-if="item.nob > 0" :src="require(`../img/nob/${item.nob}.png`)" class="nob" alt="">
            <img v-lazy="item.avatar" alt="" class="av">
          </div>
          <div class="nick">{{item.nick}}</div>
          <div class="score"><i class="coins"></i>{{item.score}}</div>
        </li>
      </ul>
    </div>
    <!-- 任務列表 -->
    <!-- <taskList v-else></taskList> -->
    <!-- 日榜和总榜共用Loading（如果需要细化加载提示文案，可以把以下标签复制到不同的榜单后面） -->
    <div v-if="rank.loading" class="scrollLoading">{{lang.loading}}</div>
    <div v-if="rank.none" class="scrollNone">
      {{lang.noDataRank}}
    </div>
    <!-- <div class="dengdai">敬請期待！</div> -->
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import { getUrlString } from "../utils"


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
      tab: 1,
      surplusTime: {},//日榜剩余时间
      timer: null,
      timer2: null,
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
      firstTask: true
    }
  },

  computed: {
    ...mapState(['rankGroups', 'isShare']),
    rankKey() {
      // return ['one', 'two', 'three'][this.tab];
      return this.mainTab == 1 ? 'total' : this.mainTab;
    },
    rankApi() {
      if (this.isShare) {
        var dayApi = `/luckybox_challenge/allList.php?from={from}&type=0`;
        var totalApi = `/luckybox_challenge/allList.php?from={from}&type=1`;
        var api = this.rankKey == 'total' ? totalApi : dayApi;
        return api
      } else {
        var dayApi = `/luckybox_challenge/allList.php?token={token}&from={from}&type=0`;
        var totalApi = `/luckybox_challenge/allList.php?token={token}&from={from}&type=1`;
        var api = this.rankKey == 'total' ? totalApi : dayApi;
        const token = getUrlString('token') || '';
        return api.replace('{token}', token);
      }
    },
    rankSize() {
      // 如果明确服务器每次返回的列表长度，请返回具体的数值，有助于减少一次额外请求即可确定加载完所有数据
      return 20;
    },
    rank() {
      const rankConf = this.rankGroups[this.rankKey] || {};
      rankConf.list = rankConf.list || [];
      if (rankConf.second && rankConf.second > 0) {
        this.downTimeGo('time' + this.rankKey, rankConf.second)
      }
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
    mainTabClick(tab) { //总榜切换
      this.mainTab = tab;
      this.$store.commit("changTab", this.rankKey)
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      })
    },
    onScroll(isRefresh) {
      // console.log('xxx')
      // if (this.tab > this.nowDay) return (this.tab > this.nowDay && this.rankKey !== 'total') || 
      // if (this.inited === 0) { //初始化是少一次請求,是日榜的时候和不是总榜的时候返回
      //   return
      // }
      if (!this.rank.loading && !this.rank.loadEnd) {
        const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100;
        const notFull = document.body.scrollHeight < window.innerHeigh;
        if (scrollToBottom || notFull || isRefresh) {
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
            // if (this.tab >= this.nowDay && this.mainTab == 0) {
            set('second', response_data.second)
            // }
            const arr = response_data.list;
            //跟随榜单变换个人信息
            if (response_data.rank) {
              this.$store.commit("changGroupsUserMsg", {//初始当前日榜个人信息
                key: this.rankKey,
                msg: response_data.rank
              })
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
      this.$store.commit('updateRankGroups', {
        key: this.rankKey,
        loadCount: 0,
        loadEnd: false,
        loading: false,
        none: false,
        list: [],
      });
      this.$nextTick(() => {
        this.onScroll(1)
        this.$parent.initData()
      });
    },

    goUser(uid) { //跳转
      location.href = `uid:${uid}`
    },

  },
}
</script>

<style lang="scss">
.rankGroups {
  margin-top: 0.1rem;
  padding-bottom: 2rem;
  position: relative;
  .mainTabs {
    margin: 0.15rem 0 0.25rem;
    margin: 0 auto;
    display: flex;
    .tabs {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      a {
        display: block;
        width: 3.55rem;
        height: 0.88rem;
        text-align: center;
        line-height: 0.84rem;
        color: rgba(255, 255, 255, 0.6);
        &.tab1 {
          background: url(../img/tab3.png);
          background-size: 100% 100%;
          &.current {
            color: rgba(255, 255, 255, 1);
            background: url(../img/tab4.png);
            background-size: 100% 100%;
          }
        }
        &.tab2 {
          background: url(../img/tab2.png);
          background-size: 100% 100%;
          &.current {
            color: rgba(255, 255, 255, 1);
            background: url(../img/tab1.png);
            background-size: 100% 100%;
          }
        }
      }
    }
  }
  .list {
    margin: 0.25rem auto;
    width: 7.26rem;
    position: relative;
    z-index: 10;
    p {
      text-align: center;
      font-size: 0.26rem;
      color: rgba(255, 255, 255, 1);
      height: 0.5rem;
      line-height: 0.5rem;
      margin-bottom: 0.2rem;
      white-space: nowrap;
      letter-spacing: -0.015rem;
    }
    ul {
      width: 6.78rem;
      padding: 0.13rem 0.16rem;
      background: url(../img/listBor.png) no-repeat;
      background-size: 100% auto;
    }
    li {
      height: 1.25rem;
      margin-top: 0.05rem;
      display: flex;
      align-items: center;
      background: url(../img/rank4.png);
      background-size: 100% 100%;
      margin-bottom: 0.04rem;
      .rank {
        width: 0.82rem;
        height: 0.82rem;
        color: #472400;
        text-align: center;
        line-height: 0.82rem;
        margin-left: 0.11rem;
        font-weight: bold;
      }
      .uerImg {
        width: 1.1rem;
        height: 1.1rem;
        position: relative;
        .nob {
          width: 1.1rem;
          height: 1.1rem;
          position: absolute;
          top: 0rem;
          left: 0rem;
          z-index: 10;
        }
        .frame {
          width: 1.5rem;
          height: 1.5rem;
          position: absolute;
          top: -0.21rem;
          left: -0.2rem;
          z-index: 10;
        }
        .av {
          width: 0.88rem;
          height: 0.88rem;
          position: absolute;
          top: 0.1rem;
          left: 0.11rem;
          border-radius: 50%;
        }
      }
      .nick {
        width: 2.8rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 0.32rem;
        color: rgba(255, 255, 255, 1);
      }
      .score {
        display: flex;
        align-items: center;
        font-size: 0.28rem;
        margin-left: 0.15rem;
        i {
          width: 0.36rem;
          height: 0.32rem;
          background: url(../img/hearIcon.png);
          background-size: 100% 100%;
          margin-right: 0.1rem;
          &.coins {
            height: 0.37rem;
            background: url(../img/coinsIcon.png);
            background-size: 100% 100%;
          }
        }
      }
      &.rank1 {
        background: url(../img/rank1.png);
        background-size: 100% 100%;
        .rank {
          text-indent: -999rem;
          background: url(../img/top1.png);
          background-size: 100% 100%;
        }
      }
      &.rank2 {
        background: url(../img/rank2.png);
        background-size: 100% 100%;
        .rank {
          text-indent: -999rem;
          background: url(../img/top2.png);
          background-size: 100% 100%;
        }
      }
      &.rank3 {
        background: url(../img/rank3.png);
        background-size: 100% 100%;
        .rank {
          text-indent: -999rem;
          background: url(../img/top3.png);
          background-size: 100% 100%;
        }
      }
    }
  }
}
.dengdai {
  text-align: center;
  margin-top: 1rem;
}
.scrollLoading {
  text-align: center;
  color: #ffefd7;
  font-size: 80%;
  margin-top: 1rem;
}
.scrollNone {
  text-align: center;
  color: #ffefd7;
  font-size: 80%;
  margin-top: 1rem;
}
#refresh {
  display: block;
  width: 0.94rem;
  height: 1rem;
  position: fixed;
  right: 0.08rem;
  bottom: 1.35rem;
  background: url(../img/refresh.png) no-repeat;
  background-size: contain;
  transition: all 1s;
  text-indent: -999rem;
  z-index: 100;
}
</style>
