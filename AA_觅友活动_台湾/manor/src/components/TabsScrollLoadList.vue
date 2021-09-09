<template>
  <div class="rankGroups">
    <!-- 日榜、总榜切换主Tabs -->
    <div class="mainTabs">
      <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" class="tabL">關注總排行榜</a>
      <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" class="tabR">總排行榜</a>
      <a @click.prevent="onRefresh" href="" :style="{transform:'rotate('+rotatePx+'deg)'}" id="refresh"></a>
    </div>
    <!-- 日榜 -->
    <div class="list day">
      <ul>
        <li v-for="(item,index) in rank.list" :key="index" :class="['rank' + item.rank]" @click="showUserLand(item)">
          <div class="hasSun" v-if="item.harvest_sun > 0">有陽光</div>
          <div class="userRank">{{item.rank}}</div>
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
    <!-- 用戶信息 -->
    <div class="userMsg" :class="['rank' + nowUserMsg.rank]">
      <div class="userRank">{{nowUserMsg.rank}}</div>
      <div class="imgBox">
        <img :src="nowUserMsg.avatar_frame" alt="" v-if="nowUserMsg.avatar_frame" class="frame">
        <img v-lazy="nowUserMsg.avatar" alt="" class="avatar">
      </div>
      <div class="msg">
        <div class="nick">{{nowUserMsg.nick}}</div>
        <div class="iconList" v-if="nowUserMsg.wealth_lv > 0 || (nowUserMsg.medals && nowUserMsg.medals.length)">
          <img :src="nowUserMsg2.url" alt="" v-for="(nowUserMsg2,index2) in nowUserMsg.medals" :key="index2">
          <div class="inner" v-if="nowUserMsg.wealth_lv">
            <img :src="require(`../img/wealv/icon${ parseInt(nowUserMsg.wealth_lv / 10)}.png`)" alt="" class="icon_lv">
            <span :class="{gt:nowUserMsg.wealth_lv>=10,
              bg9:nowUserMsg.wealth_lv>=1 && nowUserMsg.wealth_lv<10,
              bg10:nowUserMsg.wealth_lv>=10 && nowUserMsg.wealth_lv<20,
              bg20:nowUserMsg.wealth_lv>=20 && nowUserMsg.wealth_lv<30,
              bg30:nowUserMsg.wealth_lv>=30 && nowUserMsg.wealth_lv<40,
              bg40:nowUserMsg.wealth_lv>=40 && nowUserMsg.wealth_lv<50,
              bg50:nowUserMsg.wealth_lv>=50}">{{nowUserMsg.wealth_lv}}
            </span>
          </div>
        </div>
      </div>
      <div class="score">
        <i>{{lang.scoreName}}</i>
        <em>{{nowUserMsg.score}}</em>
      </div>
    </div>
    <!-- 日榜和总榜共用Loading（如果需要细化加载提示文案，可以把以下标签复制到不同的榜单后面） -->
    <div v-if="rank.loading" class="scrollLoading">{{lang.loading}}</div>
    <div v-if="rank.none" class="scrollNone">
      {{lang.rank_noData}}
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
  computed: {
    ...mapState(['rankGroups', 'activity', 'groupsUserMsg', 'owner']),
    rankKey () {
      // return ['one', 'two', 'three'][this.tab];
      return this.mainTab == 1 ? 'total' : this.mainTab;
    },
    rankApi () {
      var dayApi = `/index.php?action=manor.rank&uid={uid}&token={token}&from={from}`;
      const token = getUrlString('token') || '';
      const uid = getUrlString('uid') || '';
      return dayApi.replace('{uid}', uid).replace('{token}', token);
    },
    rankSize () {
      // 如果明确服务器每次返回的列表长度，请返回具体的数值，有助于减少一次额外请求即可确定加载完所有数据
      return 20;
    },
    rank () {
      const rankConf = this.rankGroups[this.rankKey] || {};
      rankConf.list = rankConf.list || [];
      // if (rankConf.second && rankConf.second > 0) {
      //   console.log(rankConf.second)
      // }
      return rankConf;
    },
    nowUserMsg () {
      if (this.mainTab == 0) {
        return this.owner
      } else {
        const rankConf = this.groupsUserMsg[this.rankKey] || {};
        return rankConf.msg || {};
      }

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
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      })
    },
    onScroll () {
      if (!this.rank.loading && !this.rank.loadEnd && this.mainTab != 0) {
        console.log('xxxxx')
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
    onRefresh (val) {
      console.log(val)
      if (this.rank.loading) return
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
    showUserLand (item) {
      const uid = getUrlString('uid') || ''
      if (uid != item.uid) {
        this.vxc('setIsMain', 2)
      } else {
        this.vxc('setIsMain', 1)
      }
      this.vxc('setOtherUser', item)
      this.$parent.$refs.landsBox.init(item.uid)
    }
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
    width: 5.55rem;
    height: 0.82rem;
    line-height: 0.82rem;
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
      color: #8E4908;
      &.current {
        color: #672A0B;
        background: url(../img/rankTabAct.png);
        background-size: 100% 100%;
      }
    }
  }
  ul {
    width: 6.98rem;
    margin: 0.54rem auto 0;
  }
  li,
  .userMsg {
    height: 1.53rem;
    display: flex;
    align-items: center;
    background: url(../img/listItem.png);
    background-size: 100% 100%;
    margin-bottom: 0.06rem;
    position: relative;
    .hasSun {
      width: 1.31rem;
      height: 0.37rem;
      font-size: 0.26rem;
      color: #BE670E;
      text-indent: 0.28rem;
      background: url(../img/hasSun.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0;
      right: 0;
      text-align: center;
      line-height: 0.37rem;
    }
    .userRank {
      width: 1rem;
      height: 0.86rem;
      text-align: center;
      line-height: 0.86rem;
      font-size: 0.32rem;
      font-weight: bold;
      color: #F2E87E;
      margin: 0 0.09rem 0 0.05rem;
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
        z-index: 2;
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
        color: #703500;
        font-size: 0.28rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .iconList {
        height: 0.6rem;
        display: flex;
        margin-top: 0.1rem;
        > img {
          width: 0.49rem;
          height: 0.53rem;
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
            margin-top: 0.1rem;
          }
          span {
            display: inline-block;
            width: 0.67rem;
            height: 0.4rem;
            line-height: 0.4rem;
            background: linear-gradient(322deg, #8C8995 0%, #BCBBC7 100%);
            border-radius: 0 0.25rem 0.25rem 0;
            margin: 0.1rem 0 0 -0.25rem;
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
      height: 0.46rem;
      flex: 1;
      text-align: center;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      i {
        width: 0.46rem;
        height: 0.46rem;
        color: #FFD25F;
        background: url(../img/sunIcon1.png);
        background-size: 100% 100%;
        margin-right: 0.05rem;
      }
      em {
        font-size: 0.32rem;
        color: #703500;
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
      .userRank {
        text-indent: -999rem;
        background: url(../img/top1.png);
        background-size: 100% 100%;
      }
    }
    &.rank2 {
      .userRank {
        background: url(../img/top2.png);
        background-size: 100% 100%;
      }
    }
    &.rank3 {
      .userRank {
        background: url(../img/top3.png);
        background-size: 100% 100%;
      }
    }
  }
  .userMsg {
    width: 7.5rem;
    height: 1.29rem;
    padding-top: 0.4rem;
    margin-bottom: 0;
    position: fixed;
    bottom: 0;
    background: url(../img/footer.png);
    background-size: 100% 100%;
    .userRank {
      margin-left: 0.15rem;
    }
    .userRank,
    .nick,
    .score {
      color: #fff !important;
      em {
        color: #fff !important;
      }
    }
  }
  li:last-child {
    margin-bottom: 0;
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
