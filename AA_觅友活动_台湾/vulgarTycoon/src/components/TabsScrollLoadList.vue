<template>
  <div class="rankGroups">
    <div class="rankTitle"></div>
    <!-- 日榜、总榜切换主Tabs -->
    <div class="mainTabs">
      <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" class="tabL">{{lang.rankTab1}}</a>
      <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" class="tabR">{{lang.rankTab2}}</a>
      <a @click.prevent="onRefresh" href="" :style="{transform:'rotate('+rotatePx+'deg)'}" id="refresh"></a>
    </div>
    <p class="rankTips">{{lang.rankTips}}</p>
    <div class="timeDown" v-if="surplusTime&& !surplusTime.end">
      <strong>{{surplusTime.day}}</strong>
      <em>{{lang.rank_day}}</em>
      <strong>{{surplusTime.hour}}</strong>
      <em>{{lang.rank_hour}}</em>
      <strong>{{surplusTime.minute}}</strong>
      <em>{{lang.rank_min}}</em>
      <strong>{{surplusTime.second}}</strong>
      <em>{{lang.rank_second}}</em>
    </div>
    <!-- 日榜 -->
    <div class="list day">
      <ul>
        <li v-for="(item,index) in nowRank.list" :key="index" :class="['rank' + item.rank]" @click="goUser(item.uid)">
          <div class="userRank"> <i v-if="item.rank > 3">{{item.rank}}</i> </div>
          <div class="imgBox">
            <img :src="item.avatar_frame" alt="" v-if="item.avatar_frame" class="frame">
            <img v-lazy="item.avatar" alt="" class="avatar">
          </div>
          <div class="msg">
            <div class="nick">{{item.nick}}</div>
            <div class="iconList" v-if="item.wealth_lv || item.medals.length">
              <img :src="item2.url" alt="" v-for="(item2,index2) in item.medals" :key="index2">
              <div class="inner" v-if="item.wealth_lv">
                <img :src="require(`../img/wealv/icon${ parseInt(item.wealth_lv / 10)}.png`)" alt="" class="icon_lv">
                <span :class="{gt:item.wealth_lv>=10,
              bg9:item.wealth_lv>=1 && item.wealth_lv<10,
              bg10:item.wealth_lv>=10 && item.wealth_lv<20,
              bg20:item.wealth_lv>=20 && item.wealth_lv<30,
              bg30:item.wealth_lv>=30 && item.wealth_lv<40,
              bg40:item.wealth_lv>=40 && item.wealth_lv<50,
              bg50:item.wealth_lv>=50}">{{item.wealth_lv}}
                </span>
              </div>
            </div>
          </div>
          <div class="score">
            <i>{{lang.scoreName}}</i>
            <em>{{item.score}}</em>
          </div>
        </li>
      </ul>
    </div>
    <!-- 日榜和总榜共用Loading（如果需要细化加载提示文案，可以把以下标签复制到不同的榜单后面） -->
    <div v-if="rank.loading" class="scrollLoading">{{lang.loading}}</div>
    <div v-if="rank.none" class="scrollNone">
      {{lang.noData}}
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
    activity () {
      this.$store.commit('updateRankGroups', {
        key: this.rankKey,
        loadCount: 1,
        loadEnd: this.rank.length < 20,
        loading: false,
        none: this.rank.length < 20,
        list: this.rank,
      });
    },
    nowRank () {
      this.downTimeGo('timer' + this.mainTab, this.mainTab == 0 ? this.activity.today_seconds : this.activity.seconds)
    }
  },
  computed: {
    ...mapState(['rankGroups', 'activity', 'groupsUserMsg', 'owner', 'rank']),
    rankKey () {
      // return ['one', 'two', 'three'][this.tab];
      return this.mainTab == 1 ? 'total' : this.mainTab;
    },
    rankApi () {
      var dayApi = `/index.php?action=vulgarTycoon.rank&uid={uid}&token={token}`;
      const token = getUrlString('token') || '';
      const uid = getUrlString('uid') || '';
      return dayApi.replace('{uid}', uid).replace('{token}', token);
    },
    rankSize () {
      // 如果明确服务器每次返回的列表长度，请返回具体的数值，有助于减少一次额外请求即可确定加载完所有数据
      return 20;
    },
    nowRank () {
      const rankConf = this.rankGroups[this.rankKey] || {};
      rankConf.list = rankConf.list || [];
      // if (rankConf.second && rankConf.second > 0) {
      //   console.log(rankConf.second)
      // }
      return rankConf;
    },
  },
  methods: {
    mainTabClick (tab) { //总榜切换
      this.mainTab = tab;
      this.vxc('setTab', this.rankKey)
      this.$nextTick(() => {
        if (!this.nowRank.loadCount) {
          this.onScroll();
        }
      })
    },
    onScroll () {
      if (!this.nowRank.loading && !this.nowRank.loadEnd && this.mainTab == 1) {
        // const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 80;
        const notFull = document.body.scrollHeight < window.innerHeigh;
        console.log(notFull,this.nowRank)
        if (notFull || !this.nowRank.loadCount) {
          const key = this.rankKey;

          const set = (k, v) => {
            this.$store.commit('updateRankGroups', { key, [k]: v });
          };
          set('loading', true);
          axios.get(this.rankApi).then(res => {

            const { response_status, response_data } = res.data;

            if (response_status.code != 0) {
              set('loadEnd', true);
              return;
            }
            const arr = response_data.list;
            //跟随榜单变换个人信息
            if (response_data.owner && response_data.owner.uid) {
              this.$store.commit("changGroupsUserMsg", {//初始当前日榜个人信息
                key: this.rankKey,
                msg: response_data.owner
              })
            }
            if (arr.slice) {
              const loadCount = typeof this.nowRank.loadCount == 'undefined' ? 0 : this.nowRank.loadCount;
              set('loadCount', loadCount + 1);
              if (arr.length) {
                set('list', arr);
                const noMore = !isNaN(this.rankSize) && arr.length < parseInt(this.rankSize);
                if (this.nowRank.loadOnce || noMore) {
                  set('loadEnd', true);
                } else {
                  this.$nextTick(this.onScroll);
                }
              } else {
                set('loadEnd', true);
              }
              this.$nextTick(() => {
                if (this.nowRank.loadCount > 0 && this.nowRank.list.length === 0) {
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
    onRefresh (val) {
      if (this.nowRank.loading) return
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
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
    scorllTo (className) {
      let e = 0
      console.log(e)
      this.timer = setInterval(() => {
        let c = document.documentElement.scrollTop
        let t = c / 10
        window.scrollTo(0, c - t)
        if (t < 1) {
          clearInterval(this.timer)
        }
      }, 10)
    },
  },
}
</script>

<style lang="scss" scoped>
.rankGroups {
  position: relative;
  // background: #f8ffe6 url(../assets/img/listBg.png) no-repeat;
  background-size: 100% auto;
  margin: 0.15rem auto 0;
  padding-bottom: 2rem;
  .mainTabs {
    display: flex;
    width: 6.9rem;
    height: 0.78rem;
    line-height: 0.78rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    background: url(../img/rankTab.png);
    background-size: 100% 100%;
    a {
      flex: 1;
      height: 100%;
      text-align: center;
      &.current {
        color: #672A0B;
        background: url(../img/rankTabAct.png);
        background-size: 100% 100%;
      }
    }
  }
  .rankTips {
    font-size: 0.24rem;
    padding: 0 0.36rem;
    text-align: center;
    color: #B75A3F;
    margin-top: 0.28rem;
  }
  ul {
    width: 6.98rem;
    margin: 0 auto;
  }
  li {
    height: 1.53rem;
    display: flex;
    align-items: center;
    background: url(../img/listItem.png);
    background-size: 100% 100%;
    margin-bottom: 0.06rem;
    position: relative;
    .userRank {
      width: 1rem;
      height: 0.86rem;
      text-align: center;
      line-height: 0.86rem;
      font-size: 0.32rem;
      font-weight: bold;
      //   color: #F2E87E;
      margin: 0 0.09rem 0 0.05rem;
      display: flex;
      align-items: center;
      justify-content: center;
      i {
        text-align: center;
        line-height: 0.51rem;
      }
    }
    .imgBox {
      position: relative;
      margin-left: 0.3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.08rem;
      height: 1.08rem;
      .frame {
        width: 1.836rem;
        height: 1.836rem;
        position: absolute;
        left: -0.378rem;
        top: -0.378rem;
        // z-index: 2;
      }
      .avatar {
        width: 1.08rem;
        height: 1.08rem;
        border-radius: 50%;
        box-sizing: border-box;
        border: 0.03rem solid #fff;
      }
    }
    .msg {
      width: 2.3rem;
      margin-left: 0.15rem;
      display: flex;
      flex-direction: column;
      // align-items: center;
      justify-content: center;
      .nick {
        font-size: 0.28rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .iconList {
        height: 0.4rem;
        display: flex;
        align-items: center;
        margin-top: 0.1rem;
        > img {
          width: 0.39rem;
          height: 0.43rem;
          margin-left: 0.05rem;
        }
        .inner {
          display: flex;
          justify-content: center;
          box-sizing: border-box;
          margin-left: 0.1rem;
          .icon_lv {
            display: inline-block;
            width: 0.4rem;
            height: 0.4rem;
            position: relative;
          }
          span {
            display: inline-block;
            width: 0.67rem;
            height: 0.4rem;
            line-height: 0.4rem;
            background: linear-gradient(322deg, #8C8995 0%, #BCBBC7 100%);
            border-radius: 0 0.25rem 0.25rem 0;
            margin: 0 0 0 -0.25rem;
            font-size: 0.28rem;
            font-family: PingFang SC;
            font-weight: bold;
            color: #FFFFFF;
            box-sizing: border-box;
            text-align: center;
            padding-left: 0.16rem;
            &.gt {
              width: 0.87rem;
            }
            &.bg9 {
              background: linear-gradient(322deg, #4A85B2 0%, #7BABD2 100%);
            }
            &.bg10 {
              background: linear-gradient(322deg, #40ABA1 0%, #69C9D2 100%);
            }
            &.bg20 {
              background: linear-gradient(322deg, #4AC96C 0%, #94E9AB 100%);
            }
            &.bg30 {
              background: linear-gradient(322deg, #BF883B 0%, #E4C396 100%);
            }
            &.bg40 {
              background: linear-gradient(322deg, #CE7445 0%, #D29473 100%);
            }
            &.bg50 {
              background: linear-gradient(322deg, #C55451 0%, #D46B71 100%);
            }
          }
          .privilege_icon {
            width: 2rem;
            height: 1.6rem;
          }
          .privilege4 {
            width: 2rem;
            height: 2rem;
          }
          .float {
            width: 2rem;
            height: 0.88rem;
          }
        }
      }
    }
    .score {
      //   height: 0.46rem;
      flex: 1;
      text-align: center;
      position: relative;
      i {
        display: block;
        text-align: center;
        font-size: 0.22rem;
        color: #FFE7B8;
      }
      em {
        font-size: 0.32rem;
      }
    }
    &.rank1,
    &.rank2,
    &.rank3 {
      .userRank {
        text-indent: -999rem;
      }
    }
    &.rank1 {
      background: url(../img/top1.png);
      background-size: 100% 100%;
    }
    &.rank2 {
      background: url(../img/top2.png);
      background-size: 100% 100%;
    }
    &.rank3 {
      background: url(../img/top3.png);
      background-size: 100% 100%;
    }
  }

  li:last-child {
    margin-bottom: 0;
  }
}
.timeDown {
  padding: 0 1.3rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  strong {
    font-size: 0.48rem;
    font-weight: bold;
    display: block;
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 0.12rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFD564;
    img {
      width: 0.38rem;
      height: 0.59rem;
    }
  }
  em {
    display: block;
    font-size: 0.24rem;
    line-height: 0.9rem;
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
  width: 1rem;
  height: 1rem;
  position: fixed;
  right: 0.08rem;
  bottom: 1.35rem;
  //   background: url(../img/refresh.png) no-repeat;
  //   background-size: contain;
  transition: all 1s;
  text-indent: -999rem;
  z-index: 100;
}
</style>
