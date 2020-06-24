<template>
  <div class="rankGroups">
    <!-- 日榜、总榜切换主Tabs -->
    <!-- 日榜 -->
    <DayTabs @changeClick="tabClick" :tab="tab"></DayTabs>
    <div class="list day">
      <ul>
        <li v-for="(item,index) in rank.list" :key="index" :class="'rank'+item.rank" @click="goUser(item.uid)">
          <img v-lazy="item.avatar" alt="" class="av">
          <div class="userMsg">
            <div class="name">{{item.nick}}</div>
            <div class="uid">{{item.uid}}</div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 任務列表 -->
    <!-- <taskList v-else></taskList> -->
    <!-- 日榜和总榜共用Loading（如果需要细化加载提示文案，可以把以下标签复制到不同的榜单后面） -->
    <div v-if="rank.loading" class="scrollLoading">في التحميل...</div>
    <div v-if="rank.none && tab <= nowDay" class="scrollNone">
      لا يوجد أي مشترك في القائمة الآن</br>
      ننتظرك لدخول القائمة!
    </div>
    <div v-if="tab > nowDay" class="dengdai">تفضل بالتطلع إليه</div>
    <div id="refresh" @click="onRefresh()" v-if="tab == nowDay"></div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import getUrlString from '../utils/getString.js';
import DayTabs from "../components/DayTabs"
import APP from "../utils/openApp"
import api from "../api/apiConfig"
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
  components: { DayTabs },
  data() {
    return {
      tab: null,
      surplusTime: {},//日榜剩余时间
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
      firstTask: true
    }
  },
  watch: {
    nowDay(val) {
      this.tab = val
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      });
    }
  },
  computed: {
    ...mapState(['rankGroups', "nowDay", "inited", "isShare", "actStatus", "day_down_time", "total_down_time", "daily_tasks", "dateArr"]),
    rankKey() {
      // return ['one', 'two', 'three'][this.tab];
      return this.mainTab == 1 ? 'total' : this.tab;
    },
    rankApi() {
      if (this.isShare) {
        var dayApi = `/happy_fly_car/rank.php?from={from}&date={date}`;
        var totalApi = `/happy_fly_car/rank.php?from={from}&date=0`;
        var api = this.rankKey == 'total' ? totalApi : dayApi;
        return api.replace('{date}', this.getDate(this.dateArr[this.tab - 1]))
      } else {
        var dayApi = `/dominoes/allList.php?level={level}&from={from}`;
        // var totalApi = `/dominoes/allList.php?level={level}`;
        // var api = this.rankKey == 'total' ? totalApi : dayApi;
        // const token = getUrlString('token') || '';
        return dayApi.replace('{level}', this.tab)
      }
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
    tabClick(tab) { //日榜切换
      this.tab = tab;
      var nowTab = this.rankKey >= this.nowDay ? this.nowDay : this.rankKey //存当天选择的tab索引用于底部个人信息查找
      this.$store.commit("changTab", nowTab)
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      });
    },
    onScroll() {
      // if (this.tab > this.nowDay) return (this.tab > this.nowDay && this.rankKey !== 'total') || 
      if (this.inited === 0) { //初始化是少一次請求,是日榜的时候和不是总榜的时候返回
        return
      }

      if (!this.rank.loading && !this.rank.loadEnd) {
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
            // if (this.tab >= this.nowDay && this.mainTab == 0) {
            // set('second', response_data.second)
            // }
            const arr = response_data.list;
            //跟随榜单变换个人信息
            if (response_data.myrank && response_data.myrank.uid) {
              this.$store.commit("changGroupsUserMsg", {//初始当前日榜个人信息
                key: this.rankKey,
                msg: response_data.myrank
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
      if (this.rank.loading) return
      this.$parent.getDefaultData()
      // this.$parent.getDefaultData()
      // this.$store.commit('updateRankGroups', {
      //   key: this.rankKey,
      //   loadCount: 0,
      //   loadEnd: false,
      //   loading: false,
      //   none: false,
      //   list: [],
      // });
      // this.$nextTick(this.onScroll);
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
  // padding-bottom: 2rem;
  position: relative;
  .list {
    position: relative;
    z-index: 10;
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0 0.33rem;
      margin-top: 0.27rem;
      li {
        width: 3.37rem;
        height: 1.01rem;
        display: flex;
        align-items: center;
        background: url(../assets/img/listBg.png);
        background-size: 100% 100%;
        margin-bottom: 0.22rem;
        .av {
          width: 1rem;
          height: 1rem;
          border: 0.04rem solid rgba(154, 93, 255, 1);
          box-sizing: border-box;
          border-radius: 50%;
        }
        .userMsg {
          flex: 1;
          margin-right: 0.16rem;
          // font-weight: 500;
          .name {
            color: #c1f7ff;
            max-width: 2rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .uid {
            font-size: 0.24rem;
            color: #aa84ff;
            font-weight: 500;
          }
        }
        &.rank1 {
          .rank {
            text-indent: -999rem;
            // background: url(../assets/img/top1.png);
            // background-size: 100% 100%;
          }
        }
        &.rank2 {
          .rank {
            text-indent: -999rem;
            // background: url(../assets/img/top2.png);
            // background-size: 100% 100%;
          }
        }
        &.rank3 {
          .rank {
            text-indent: -999rem;
            // background: url(../assets/img/top3.png);
            // background-size: 100% 100%;
          }
        }
      }
    }
  }
}

.scrollLoading,
.scrollNone,
.dengdai {
  text-align: center;
  color: #ffefd7;
  font-size: 80%;
  margin-top: 0.3rem;
}
#refresh {
  display: block;
  width: 0.94rem;
  height: 1rem;
  position: fixed;
  left: 0.08rem;
  bottom: 1.35rem;
  background: url(../assets/img/refresh.png) no-repeat;
  background-size: contain;
  transition: all 1s;
  text-indent: -999rem;
  z-index: 100;
}
</style>
