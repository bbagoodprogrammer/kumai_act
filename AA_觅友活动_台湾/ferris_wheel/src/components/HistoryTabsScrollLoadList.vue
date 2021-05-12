<template>
  <div class="rankGroups">
    <!-- 日榜、总榜切换主Tabs -->
    <div class="mainTabs">
      <div class="tabs">
        <a class="tab1" @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" href="">日常動態</a>
        <a class="tab2" @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" href="">收到的信件</a>
      </div>
    </div>
    <div class="tmTips" v-if="mainTab == 1">{{actTime}}{{lang.group_end}}</div>
    <!-- 总榜 -->
    <div class="rankList_history">

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

export default {
  data () {
    return {
      mainTab: 0,
      showFriends: false,
      order_id: null
    }
  },
  computed: {
    ...mapState(['rankGroups_history', 'end']),
    rankKey () {
      return this.mainTab == 1 ? 'total' : this.mainTab;
    },
    rankApi () {
      var dayApi = `/gift_group/myGroup.php?token={token}&from={from}&type={type}`;
      const token = getUrlString('token') || '';
      return dayApi.replace('{token}', token).replace('{type}', this.mainTab)

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
    channel1: () => _lang.channel1,
    channel2: () => _lang.channel2,
    actTime () {
      if (_app == 'hsing') {
        return getDate(new Date(this.end * 1000), 5)
      } else if (_app == 'singnow') {
        return getDate(new Date(this.end * 1000), 8)
      }

    }
  },
  mounted () {
    this.onScroll(); // 如果默认展示的Tabs依赖服务器配置，把此方法移到watch中去调用（watch更新Tabs值后调onScroll）
    // 如果初始化接口返回当前榜单数据，可以在Store的Action拿到服务器数据时先调用commit('updateRankGroups', {key:key, list:[]})，再更新state.tab触发组件watch
    window.addEventListener('scroll', this.onScroll);
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
        const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100;
        const notFull = document.body.scrollHeight < window.innerHeigh;
        if (scrollToBottom || notFull || !this.rank.loadCount) {
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
    getDate (tm) {
      if (_app == 'hsing') {
        return getDate(new Date(tm * 1000), 1)
      } else if (_app == 'singnow') {
        return getDate(new Date(tm * 1000), 2)
      }
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
  margin: 0 auto;
  .mainTabs {
    position: relative;
    .tabs {
      width: 4.98rem;
      height: 0.68rem;
      background: url(../img/history_bg.png);
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      margin: 0 auto;
      a {
        // display: block;
        width: 2.59rem;
        height: 0.74rem;
        text-align: center;
        line-height: 0.74rem;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 0.3rem;
        margin-top: -0.06rem;
        &.current {
          color: #fff;
          background: url(../img/history_bg_act.png);
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>
