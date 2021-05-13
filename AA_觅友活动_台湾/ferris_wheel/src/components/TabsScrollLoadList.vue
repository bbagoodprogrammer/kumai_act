<template>
  <div class="rankGroups">
    <div class="rankTitle"></div>
    <!-- 日榜、总榜切换主Tabs -->
    <div class="mainTabs">
      <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" class="tabL">真愛日榜</a>
      <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" class="tabR">真愛總榜</a>
      <!-- <a @click.prevent="onRefresh" href="" v-if="!isShare && actStatus===1" :style="{transform:'rotate('+rotatePx+'deg)'}" id="refresh"></a> -->
    </div>
    <div class="timeBox">
      <div class="actTime">
        <span>{{surplusTime.day}}</span>
        <em>天</em>
        <span>{{surplusTime.hour}}</span>
        <em>時</em>
        <span>{{surplusTime.minute}}</span>
        <em>分</em>
        <span>{{surplusTime.second}}</span>
        <em>秒</em>
      </div>
    </div>
    <!-- 日榜 -->
    <div class="listHeader">
      <span>名次</span>
      <span>真愛情侶</span>
      <span>真愛值</span>
    </div>
    <div class="list day">
      <div class="top3">
        <ul>
          <li v-for="(item,index) in top3" :key="index" :class="'rank' + item.rank">
            <div class="user_rank"></div>
            <div class="userAv">
              <div class="user_l">
                <img v-lazy="item.avatar_1" alt="">
                <strong>{{item.nick_1}}</strong>
              </div>
              <i class="hear"></i>
              <div class="user_r">
                <img v-lazy="item.avatar_2" alt="">
                <strong>{{item.nick_2}}</strong>
              </div>
            </div>
            <div class="score">{{item.score}}</div>
          </li>
        </ul>
      </div>
      <div class="other_list">
        <ul>
          <li v-for="(item,index) in otherRank" :key="index">
            <div class="userRank">{{item.rank}}</div>
            <div class="userAv">
              <img v-lazy="item.avatar_1" alt="" class="man">
              <img v-lazy="item.avatar_2" alt="" class="woman">
            </div>
            <div class="userNick">
              <div class="man">{{item.nick_1}}</div>
              <div class="woman">{{item.nick_2}}</div>
            </div>
            <div class="score">{{item.score}}</div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 任務列表 -->
    <!-- <taskList v-else></taskList> -->
    <!-- 日榜和总榜共用Loading（如果需要细化加载提示文案，可以把以下标签复制到不同的榜单后面） -->
    <div v-if="rank.loading" class="scrollLoading">加載中...</div>
    <div v-if="rank.none" class="scrollNone">
      暫無歌友上榜
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import { getUrlString } from '../utils';
import downTime from "../utils/downTime"
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
  watch: {
    // inited() {
    //   this.$nextTick(() => {
    //     if (!this.rank.loadCount) {
    //       this.onScroll();
    //     }
    //   })
    // },
  },
  computed: {
    ...mapState(['rankGroups', "isShare", "actStatus", "inited", "second", "total", "day"]),
    rankKey () {
      // return ['one', 'two', 'three'][this.tab];
      return this.mainTab == 1 ? 'total' : this.mainTab;
    },
    rankApi () {
      if (this.isShare) {
        var dayApi = `/index.php?action=trueLove.rank&date={date}&signture=innerserver&from={from}`;
        return dayApi.replace('{date}', this.rankKey == 'total' ? 0 : 1)
      } else {
        var dayApi = `/index.php?action=trueLove.rank&date={date}&signture=innerserver&uid={uid}&token={token}&from={from}`;
        const token = getUrlString('token') || '';
        const uid = getUrlString('uid') || '';
        return dayApi.replace('{date}', this.rankKey == 'total' ? 0 : 1).replace('{uid}', uid).replace('{token}', token);
      }
    },
    rankSize () {
      // 如果明确服务器每次返回的列表长度，请返回具体的数值，有助于减少一次额外请求即可确定加载完所有数据
      return 20;
    },
    rank () {
      const rankConf = this.rankGroups[this.rankKey] || {};
      rankConf.list = rankConf.list || [];
      if (rankConf.second && rankConf.second > 0) {
        this.downTimeGo('time' + this.rankKey, rankConf.second)
      }
      return rankConf;
    },
    top3 () {
      if (this.rank) {
        return this.rank.list.slice(0, 3)
      }
      return []
    },
    otherRank () {
      if (this.rank) {
        return this.rank.list.slice(3)
      }
      return []
    }
  },
  mounted () {
    // 如果初始化接口返回当前榜单数据，可以在Store的Action拿到服务器数据时先调用commit('updateRankGroups', {key:key, list:[]})，再更新state.tab触发组件watch
    window.addEventListener('scroll', this.onScroll);
    this.onScroll(); // 如果默认展示的Tabs依赖服务器配置，把此方法移到watch中去调用（watch更新Tabs值后调onScroll）
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    mainTabClick (tab) { //总榜切换
      this.mainTab = tab;
      this.$store.commit("changTab", this.rankKey)
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      })
    },
    // tabClick(tab) { //日榜切换
    //   this.tab = tab;
    //   var nowTab = this.rankKey >= this.nowDay ? this.nowDay : this.rankKey //存当天选择的tab索引用于底部个人信息查找
    //   this.$store.commit("changTab", nowTab)
    //   this.$nextTick(() => {
    //     if (!this.rank.loadCount) {
    //       this.onScroll();
    //     }
    //   });
    // },
    onScroll () {
      // if (this.tab > this.nowDay) return (this.tab > this.nowDay && this.rankKey !== 'total') || 
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

            const { response_status, response_data } = res.data;

            if (response_status.code != 0) {
              set('loadEnd', true);
              return;
            }
            const arr = response_data.rank;
            //跟随榜单变换个人信息
            if (response_data.owner && response_data.owner.uid) {
              this.$store.commit("changGroupsUserMsg", {//初始当前日榜个人信息
                key: this.rankKey,
                msg: response_data.owner
              })
            }
            //倒计时
            set('second', response_data.second)
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
    onRefresh () {
      if (this.rank.loading) return
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
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
    downTimeGo (timeName, val) {
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
    getDate (time) {
      return getDate(new Date(time * 1000), '2')
    },
    goUser (uid) { //跳转
      var isiOS = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      if (isiOS) {
        sendJsData('app://userInfo?uid=' + uid);
      } else {
        javascript: JSInterface.sendJsData('app://userInfo?uid=' + uid);
      }
    },
    // getCar(score) {
    //   for (let i = carList.length - 1; i >= 0; i--) {
    //     if (score >= carList[i].score) {
    //       return carList[i]
    //     }
    //   }
    //   return {}
    // }
  },
}
</script>

<style lang="scss" scoped>
.rankGroups {
  position: relative;
  // background: #f8ffe6 url(../assets/img/listBg.png) no-repeat;
  background-size: 100% auto;
  margin: 0.37rem auto 0;
  padding-bottom: 2rem;
  .rankTitle {
    width: 6.5rem;
    height: 0.95rem;
    background: url(../img/rankTitle.png);
    background-size: 100% 100%;
    margin: 0 auto;
  }
  .mainTabs {
    display: flex;
    width: 7.12rem;
    height: 0.69rem;
    line-height: 0.69rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    background: url(../img/rank_tab.png);
    background-size: 100% 100%;
    a {
      flex: 1;
      height: 100%;
      text-align: center;
      color: rgba(255, 216, 243, 1);
      &.current {
        color: rgba(255, 248, 251, 1);
        background: url(../img/rank_tab_act.png);
        background-size: 100% 100%;
      }
    }
  }
  .timeBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .actTime {
      height: 1rem;
      display: flex;
      align-items: center;
      span {
        width: 0.72rem;
        height: 0.72rem;
        text-align: center;
        line-height: 0.72rem;
        font-size: 0.48rem;
        font-weight: 600;
        border-radius: 0.1rem;
      }
      em {
        font-size: 0.22rem;
        margin: 0.1rem 0.15rem 0 0.15rem;
        color: rgba(252, 252, 180, 1);
      }
    }
  }
  .listHeader {
    width: 5.9rem;
    height: 0.3rem;
    padding: 0 0.61rem;
    background: url(../img/list_header.png);
    background-size: 100% 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      font-size: 0.22rem;
      color: rgba(246, 197, 255, 1);
    }
  }
  .top3 {
    width: 7rem;
    margin: 0.1rem auto;
    ul {
      li {
        height: 1.75rem;
        display: flex;
        align-items: center;
        background: url(../img/top3_bg.png);
        background-size: 100% 100%;
        margin-bottom: 0.07rem;
        .user_rank {
          width: 0.69rem;
          height: 0.88rem;
          margin: 0 0.66rem 0 0.42rem;
        }
        .userAv {
          width: 3.3rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .hear {
            width: 0.77rem;
            height: 0.69rem;
            background: url(../img/hear_rank.png);
            background-size: 100% 100%;
          }
          .user_l,
          .user_r {
            img {
              width: 1.17rem;
              height: 1.17rem;
              border-radius: 50%;
            }
            strong {
              font-size: 0.26rem;
              display: block;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              text-align: center;
            }
          }
        }
        .score {
          margin-left: 0.15rem;
          flex: 1;
          text-align: center;
          font-size: 0.32rem;
          color: rgba(255, 240, 159, 1);
          font-weight: 500;
        }
        &.rank1 {
          .user_rank {
            background: url(../img/rank1.png);
            background-size: 100% 100%;
          }
        }
        &.rank2 {
          .user_rank {
            background: url(../img/rank2.png);
            background-size: 100% 100%;
          }
        }
        &.rank3 {
          .user_rank {
            background: url(../img/rank3.png);
            background-size: 100% 100%;
          }
        }
      }
    }
  }
  .other_list {
    width: 7rem;
    margin: 0 auto;
    ul {
      li {
        height: 1.3rem;
        background: url(../img/listRank.png);
        background-size: 100% 100%;
        margin-bottom: 0.07rem;
        display: flex;
        align-items: center;
        .userRank {
          width: 0.45rem;
          height: 0.45rem;
          margin: 0 0.81rem 0 0.57rem;
          background: url(../img/defaUserRank_bg.png);
          background-size: 100% 100%;
          text-align: center;
          line-height: 0.45rem;
          font-size: 0.26rem;
        }
        .userAv {
          width: 1.5rem;
          height: 0.92rem;
          position: relative;
          .man {
            width: 0.92rem;
            height: 0.92rem;
            border-radius: 50%;
            position: absolute;
          }
          .woman {
            width: 0.72rem;
            height: 0.72rem;
            border-radius: 50%;
            position: absolute;
            left: 0.6rem;
            bottom: 0;
          }
        }
        .userNick {
          width: 1.95rem;
          > div {
            font-size: 0.26rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .score {
          flex: 1;
          text-align: center;
          font-size: 0.32rem;
          color: rgba(255, 240, 159, 1);
          font-weight: 500;
        }
      }
    }
  }
}
.dengdai {
  text-align: center;
}
.scrollLoading {
  text-align: center;
  color: #056005;
  font-size: 80%;
}
.scrollNone {
  text-align: center;
  color: #056005;
  font-size: 80%;
}
#refresh {
  display: block;
  width: 0.94rem;
  height: 1rem;
  position: fixed;
  right: 0.08rem;
  bottom: 1.35rem;
  // background: url(../assets/img/refresh.png) no-repeat;
  background-size: contain;
  transition: all 1s;
  text-indent: -999rem;
  z-index: 100;
}
</style>
