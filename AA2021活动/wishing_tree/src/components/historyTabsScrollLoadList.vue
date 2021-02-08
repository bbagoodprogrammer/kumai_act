<template>
  <div class="rankGroups">
    <!-- 日榜、总榜切换主Tabs -->
    <div class="mainTabs">
      <div class="tabs">
        <a class="tab1" @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" href="">{{lang.history_tab1}}</a>
        <a class="tab2" @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" href="">{{lang.history_tab2}}</a>
      </div>
    </div>
    <div class="tabHeader">
      <span>{{lang.history_tm}}</span>
      <span>{{lang.history_get}}</span>
      <span v-if="mainTab==0">{{lang.history_giftScore}}</span>
      <span v-else>{{lang.history_gift}}</span>
    </div>
    <!-- 总榜 -->
    <div class="rankList_history">

      <ul class="list day">
        <li v-for="(item,index) in rank.list" :key="index" :class="'rank' +item.rank">
          <span>{{getDate(item.time)}}</span>
          <span v-if="mainTab == 0">{{channel1[item.type]}}</span>
          <span v-else>{{channel2[item.type]}}</span>
          <span v-if="mainTab == 0">{{item.num}}</span>
          <span v-else>{{item.name}}</span>
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
    <i class="close" @click="closeHistory()"></i>
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
  components: {},
  data() {
    return {
      mainTab: 0,
      // channel1: {
      //   0: '任務獲得',
      //   1: '送禮獲得'
      // },
      // channel2: {
      //   0: '全服許願值獎勵',
      //   1: '個人許願值獎勵',
      //   2: '日榜獎勵'
      // }
    }
  },
  computed: {
    ...mapState(['rankGroups_history']),
    rankKey() {
      return this.mainTab == 1 ? 'total' : this.mainTab;
    },
    rankApi() {
      var dayApi = `/wishing_tree/giftRecord.php?token={token}&from={from}&type={type}`;
      const token = getUrlString('token') || '';
      return dayApi.replace('{token}', token).replace('{type}', this.mainTab)

    },
    rankSize() {
      // 如果明确服务器每次返回的列表长度，请返回具体的数值，有助于减少一次额外请求即可确定加载完所有数据
      return 20;
    },
    rank() {
      const rankConf = this.rankGroups_history[this.rankKey] || {};
      rankConf.list = rankConf.list || [];
      return rankConf;
    },
    channel1: () => _lang.channel1,
    channel2: () => _lang.channel2,
  },
  mounted() {
    this.scrollable = this.$el.querySelector('.rankList_history');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
    this.onScroll()
  },
  methods: {

    mainTabClick(tab) { //总榜切换
      this.mainTab = tab;
      // this.vxc('changTab', this.rankKey)
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      });
    },
    onScroll() {
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if ((scrollToBottom || !this.rank.loadCount) && !this.rank.loading && !this.rank.loadEnd) { //滾動加載，沒有加載完成
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
    },
    getDate(tm) {
      return getDate(new Date(tm * 1000), 7)
    },
    goUser(uid) { //跳转
      location.href = `uid:${uid}`
    },
    closeHistory() {
      this.$parent.showHistory = false
    }
  },
}
</script>

<style lang="scss" scoped>
.rankGroups {
  width: 6.8rem;
  height: 7.79rem;
  padding: 0.52rem 0.22rem 0 0;
  background: url(../img/history_bg.png);
  background-size: 100% 100%;
  position: relative;
  .mainTabs {
    margin: 0 auto;
    position: relative;
    .tabs {
      width: 5.59rem;
      height: 0.88rem;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      background: url(../img/his_tabs.png);
      background-size: 100% 100%;
      a {
        display: block;
        width: 2.77rem;
        height: 100%;
        text-align: center;
        line-height: 0.9rem;
        font-size: 0.32rem;
        color: rgba(255, 245, 219, 1);
        transition: all 0.1s linear;
        &.current {
          color: rgba(145, 77, 68, 1);
          background: url(../img/his_act.png);
          background-size: 100% 100%;
        }
      }
    }
  }
  .rankTips {
    .giftTips {
      > p {
        text-align: center;
        font-size: 0.28rem;
        line-height: 0.4rem;
        margin: 0.1rem 0;
      }
      .giftItem {
        padding: 0 0.2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .item {
          .imgBox {
            width: 1.6rem;
            height: 1.6rem;
            // background: url(../assets/img/box/giftItemBg.png);
            // background-size: 100% 100%;
            position: relative;
            img {
              width: 100%;
              height: 100%;
            }
            .boxIcon {
              display: block;
              width: 1.24rem;
              height: 0.34rem;
              // background: url(../assets/img/rank/boxIcon.png);
              // background-size: 100% 100%;
              position: absolute;
              left: 0.18rem;
            }
          }
          strong {
            font-size: 0.26rem;
            display: block;
            text-align: center;
          }
        }
      }
    }
  }
  .rankList_history {
    width: 5.6rem;
    height: 5.2rem;
    overflow-x: hidden;
    overflow-y: scroll;
    border-radius: 0.2rem;
    margin: 0.1rem auto;

    .list {
      margin: 0 auto;
      li {
        margin-bottom: 0.04rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: rgba(235, 168, 104, 1);
        font-size: 0.22rem;
        span {
          flex: 1;
          text-align: center;
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
  bottom: -0.6rem;
  left: 3.1rem;
}
.tabHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: rgba(157, 96, 77, 1);
  font-size: 0.24rem;
  padding: 0 0.84rem;
  margin: 0.15rem 0;
  span {
    flex: 1;
    text-align: center;
  }
}
.listTipsBox {
  height: 1.13rem;
  margin: 0 auto;
  // background: url(../assets/img/listBg.png);
  // background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgba(145, 77, 68, 1);
  font-size: 0.24rem;
}
</style>
