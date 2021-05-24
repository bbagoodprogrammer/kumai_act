<template>
  <div class="rankGroups">
    <!-- 日榜、总榜切换主Tabs -->
    <i class="close" @click="$parent.showHistory = false"></i>
    <div class="mainTabs">
      <div class="tabs">
        <a class="tab1" @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" href="">著陸記錄</a>
        <a class="tab2" @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" href="">碎片記錄</a>
      </div>
    </div>
    <!-- 总榜 -->
    <div class="rankList_history scrollable">
      <p class="noData" v-if="!rank.list.length">暫無數據</p>
      <ul class="list day">
        <li v-for="(item,index) in makeData" :key="index">
          <div class="time">{{item.key}}</div>
          <div class="taskItem" v-for="(item2,index2) in item.list" :key="index2">
            <div class="title">{{item2.title}}</div>
            <div class="tm">{{getDate(item2.time,5)}}</div>
          </div>
        </li>
      </ul>
      <!-- 日榜和总榜共用Loading（如果需要细化加载提示文案，可以把以下标签复制到不同的榜单后面） -->
      <div class="listTipsBox" v-if="rank.loading|| rank.none">
        <div v-if="rank.loading" class="scrollLoading">{{lang.loading}}</div>
        <div v-if="rank.none " class="scrollNone">
          {{lang.noData}}
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import { getUrlString } from '../utils';
import APP from "../utils/openApp"
import getDate from "../utils/getDate"

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

var getKey = function (arr, time) {
  for (let index = 0; index < arr.length; index++) {
    if (arr[index].key == time) {
      return index;
    }
  }
  return -1;
};

export default {
  data () {
    return {
      mainTab: 0,
    }
  },
  computed: {
    ...mapState(['rankGroups_history', 'end']),
    rankKey () {
      return this.mainTab == 1 ? 'total' : this.mainTab;
    },
    rankApi () {
      var dayApi = `/index.php?action=spaceTravel.records&uid={uid}&token={token}&type={type}`;
      const token = getUrlString('token') || '';
      const uid = getUrlString('uid') || '';
      return dayApi.replace('{token}', token).replace('{uid}', uid).replace('{type}', this.mainTab == 0 ? 'landing' : 'fragments')
    },
    rankSize () {
      // 如果明确服务器每次返回的列表长度，请返回具体的数值，有助于减少一次额外请求即可确定加载完所有数据
      return 20;
    },
    rank () {
      const rankConf = this.rankGroups_history[this.rankKey] || {};
      rankConf.list = rankConf.list || [];
      return rankConf;
    },
    makeData () {
      var arr = [];
      for (let i = 0; i < this.rank.list.length; i++) {
        var times = this.rank.list[i].time;
        var day = getDate(new Date(times * 1000), AREA == 'tw' ? 3 : 4)
        var index = getKey(arr, day);
        if (index == -1) {
          arr.push({ key: day, list: [this.rank.list[i]] })
        } else {
          arr[index].list.push(this.rank.list[i]);
        }
      }
      console.log(arr)
      return arr;
    }
  },
  mounted () {
    this.scrollable = this.$el.querySelector('.scrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
      this.onScroll()
    }
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    mainTabClick (tab) { //总榜切换
      this.mainTab = tab;
      // this.vxc('changTab', this.rankKey)
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      });
    },
    onScroll () {
      console.log('xxxxx')
      if (!this.rank.loading && !this.rank.loadEnd) {
        const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
        if (scrollToBottom || !this.rank.loadCount) {

          const mainTab = this.mainTab
          const key = this.rankKey;

          const set = (k, v) => {
            this.$store.commit('updateRankGroups_history', { key, [k]: v });
          };
          set('loading', true);

          axios.get(this.rankApi.replace('{from}', this.rank.list.length)).then(res => {
            set('loading', false);
            const { response_status, response_data } = res.data;

            if (response_status.code != 0) {
              set('loadEnd', true);
              return;
            }
            const arr = response_data.records;
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
    getDate (tm, type) {
      return getDate(new Date(tm * 1000), type)
    },
    goUser (uid) { //跳转
      location.href = `uid:${uid}`
    },
    closeHistory () {
      this.$parent.showHistory = false
    },
    showFriendsPup (id) {
      this.order_id = id
      this.showFriends = true
    },
  },
}
</script>

<style lang="scss" scoped>
.noData {
  text-align: center;
  font-size: 0.28rem;
  color: rgba(133, 90, 55, 1);
}
.rankGroups {
  position: relative;
  padding-top: 1.22rem;
  .mainTabs {
    position: relative;
    .tabs {
      padding: 0 0.28rem;
      height: 0.88rem;
      border-radius: 0.44rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
      a {
        width: 2.72rem;
        height: 0.79rem;
        line-height: 0.79rem;
        background: url(../img/tab_bg.png);
        background-size: 100% 100%;
        text-align: center;
        color: rgba(136, 214, 255, 1);
        font-size: 0.34rem;
        font-weight: bold;
        transition: all 0.1s ease;
        &.current {
          width: 2.82rem;
          height: 0.82rem;
          line-height: 0.82rem;
          color: #fff;
          background: url(../img/tab_act.png);
          background-size: 100% 100%;
        }
      }
    }
  }
  .rankList_history {
    border-radius: 0.12rem;
    overflow-x: hidden;
    overflow-y: scroll;
    .list {
      height: 4.8rem;
      overflow-y: scroll;
      padding: 0 0.28rem;
      margin: 0 auto;
      li {
        .time {
          font-size: 0.24rem;
          color: rgba(55, 43, 148, 1);
        }
        .taskItem {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .title {
            color: rgba(114, 234, 255, 1);
            font-size: 0.26rem;
          }
          .tm {
            font-size: 0.24rem;
            color: rgba(55, 43, 148, 1);
          }
        }
      }
    }
  }
}
.close {
  width: 0.7rem;
  height: 0.7rem;
  background: url(../img/close.png);
  background-size: 100% 100%;
  position: absolute;
  bottom: -0.9rem;
  left: 2.95rem;
}
</style>
