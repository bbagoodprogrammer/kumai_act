<template>
  <div class="rankGroups">
    <!-- 日榜、总榜切换主Tabs -->
    <div class="mainTabs">
      <div class="tabs">
        <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" class="tab1">{{lang.rank_title1}}</a>
        <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" class="tab2">{{lang.rank_title2}}</a>
      </div>
      <a @click.prevent="onRefresh" href="" :style="{transform:'rotate('+rotatePx+'deg)'}" id="refresh"></a>
    </div>
    <!-- 倒计时 -->
    <div class="downTimebox">
      <!-- <div class="timeTips"> -->
      <p v-if="step==0">{{lang.rank_timeDown1}}</p>
      <p v-else-if="step == 1">{{lang.rank_timeDown2}}</p>
      <!-- </div> -->
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
      <p class="tips" v-if="mainTab==0" v-html="lang.rank_tips1">
      </p>
      <p class="tips" v-if="mainTab==1" v-html="lang.rank_tips2">
      </p>
    </div>
    <div class="list day" v-if="mainTab==0 && rank.list.length">
      <ul>
        <li v-for="(item,index) in rank.list" :key="index" :class="'rank'+item.rank" @click="goUser(item.uid,item.kmic)">
          <div class="rank">{{item.rank}}</div>
          <div class="uerImg">
            <img v-if="item.avatar_frame &&item.avatar_frame != ''" :src="item.avatar_frame" class="frame" alt="">
            <!-- <img src="../assets/img/testFrame.png" class="frame" alt=""> -->
            <img v-else-if="item.nob > 0" :src="require(`../img/nob/${item.nob}.png`)" class="nob" alt="">
            <img v-lazy="item.avatar" alt="" class="av">
          </div>
          <div class="nickBox">
            <div class="nickTips"><span class="nick">{{item.nick}}</span> <i class="ktvIng" v-if="item.kmic"></i> </div>
            <div class="uid">{{item.uid}}</div>
          </div>
          <div class="score"><i class="coins"></i>{{item.score}}</div>
        </li>
      </ul>
    </div>

    <!-- 总榜 -->
    <div v-else-if="mainTab==1 && rank.list.length" class="list total">
      <ul>
        <li v-for="(item,index) in rank.list" :key="index" :class="'rank'+item.rank" @click="goKroom(item.info.rid)">
          <div class="rank">{{item.rank}}</div>
          <div class="uerImg">
            <!-- <img v-if="item.avatar_frame &&item.avatar_frame != ''" :src="item.avatar_frame" class="frame" alt=""> -->
            <!-- <img src="../assets/img/testFrame.png" class="frame" alt=""> -->
            <!-- <img v-else-if="item.nob > 0" :src="require(`../img/nob/${item.nob}.png`)" class="nob" alt=""> -->
            <img v-lazy="item.info.pic_url" alt="" class="av room">
          </div>
          <div class="nickBox">
            <div class="nickTips"><span class="nick">{{item.info.rname}}</span><i class="scoreIcon" :class="'icon'+item.rockt" v-if="item.rockt"></i></div>
            <div class="uid">{{item.info.rid}} <i class="red_packet" v-if="item.red_packet"></i> </div>
          </div>
          <div class="score"><i></i>{{item.score}}</div>
        </li>
      </ul>
    </div>
    <!-- 任務列表 -->
    <!-- <taskList v-else></taskList> -->
    <!-- 日榜和总榜共用Loading（如果需要细化加载提示文案，可以把以下标签复制到不同的榜单后面） -->
    <div v-if="rank.loading" class="scrollLoading">{{lang.loading}}</div>
    <div v-if="rank.none" class="scrollNone">
      {{lang.noData}}
    </div>
    <!-- <div class="dengdai">敬請期待！</div> -->
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import { getUrlString } from "../utils"
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
      tab: 1,
      surplusTime: {},//日榜剩余时间
      timer: null,
      timer2: null,
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
      firstTask: true,
      surplusTime: {}
    }
  },
  watch: {
    load(val) {
      this.downTimeGo('time', val)
    },
  },
  computed: {
    ...mapState(['rankGroups', 'isShare', 'load', 'step']),
    rankKey() {
      // return ['one', 'two', 'three'][this.tab];
      return this.mainTab == 1 ? 'total' : this.mainTab;
    },
    rankApi() {
      if (this.isShare) {
        var dayApi = `/kroom_talent/allList.php?from={from}&type=0`;
        var totalApi = `/kroom_talent/allList.php?from={from}&type=1`;
        var api = this.rankKey == 'total' ? totalApi : dayApi;
        return api
      } else {
        var dayApi = `/kroom_talent/allList.php?token={token}&from={from}&type=0`;
        var totalApi = `/kroom_talent/allList.php?token={token}&from={from}&type=1`;
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
      // if (rankConf.second && rankConf.second > 0) {
      //   this.downTimeGo('time' + this.rankKey, rankConf.second)
      // }
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
        // this.$parent.initData()
      });
    },

    goUser(uid, kmic) { //跳转
      if (kmic) {
        this.goKroom(kmic)
        return
      }
      location.href = `uid:${uid}`
    },
    goKroom(rid) {
      location.href = `rid:${rid}`
    },
    downTimeGo(timeName, val) {
      clearInterval(this.timer)
      if (!downTime(timeName)) {
        downTime(timeName, val);
      }
      this.surplusTime = downTime(timeName);
      this.timer = setInterval(() => {
        this.surplusTime = downTime(timeName);
        if (this.surplusTime && this.surplusTime.end) {
          clearInterval(this.timer)
          // this.$store.commit("changday_down_time", 0)  //當天剩餘時間
        }
      }, 1000)
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
    margin: 0 auto;
    display: flex;
    .tabs {
      width: 7.5rem;
      height: 0.96rem;
      background: url(../img/tabs.png);
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      a {
        display: block;
        width: 3.78rem;
        height: 0.88rem;
        text-align: center;
        line-height: 0.84rem;
        font-size: 0.36rem;
        color: #fff;
        &.current {
          color: rgba(87, 61, 197, 1);
          height: 1.13rem;
          margin-top: 0.2rem;
          background: url(../img/tabs_act.png);
          background-size: 100% 100%;
        }
      }
    }
  }
  .downTimebox {
    margin: 0.15rem auto;
    text-align: center;
    position: relative;
    .timeDown {
      padding: 0 0.37rem;
      margin: 0.12rem auto 0;
      display: flex;
      justify-content: space-between;
      strong {
        color: #69c5ff;
        font-size: 0.63rem;
        font-weight: bold;
        display: block;
        width: 1.12rem;
        height: 1.12rem;
        background: url(../img/timeItemBg.png);
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 0.38rem;
          height: 0.59rem;
        }
      }
      em {
        display: block;
        font-size: 0.24rem;
        line-height: 1.12rem;
        color: rgba(130, 131, 255, 1);
        margin: 0.1rem 0 0.22rem;
      }
    }
    .tips {
      color: rgba(199, 225, 255, 1);
      font-size: 0.22rem;
    }
    .rankTips {
      margin-top: 0.25rem;
      font-size: 0.24rem;
      color: rgba(142, 105, 63, 1);
      span {
        display: block;
      }
    }
  }
  .list {
    margin: 0.25rem auto;
    width: 7.26rem;
    position: relative;
    z-index: 10;
    ul {
      width: 6.78rem;
      padding: 0.13rem 0.16rem;
    }
    li {
      height: 1.25rem;
      margin-top: 0.05rem;
      display: flex;
      align-items: center;
      margin-bottom: 0.04rem;
      position: relative;
      .rank {
        width: 0.43rem;
        height: 0.6rem;
        color: rgba(199, 225, 255, 1);
        text-align: center;
        line-height: 0.6rem;
        margin: 0 0.25rem 0 0.11rem;
        font-weight: bold;
        white-space: nowrap;
        font-size: 0.36rem;
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
          &.room {
            border-radius: 0.14rem;
            border: 0.02rem solid rgba(251, 235, 137, 1);
          }
        }
      }
      .nickBox {
        width: 3.2rem;
        margin-left: 0.2rem;
        .nickTips {
          display: flex;
          align-items: center;
          .nick {
            max-width: 1.7rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 0.32rem;
            color: rgba(255, 255, 255, 1);
          }
          .ktvIng {
            width: 0.29rem;
            height: 0.26rem;
            background: url(../img/ktvIng.png);
            background-size: 100% 100%;
            margin-left: 0.1rem;
          }
          .scoreIcon {
            width: 1.29rem;
            height: 0.65rem;
            margin-left: 0.1rem;
            &.icon1 {
              background: url(../img/icon/icon_1.png);
              background-size: 100% 100%;
            }
            &.icon2 {
              background: url(../img/icon/icon_2.png);
              background-size: 100% 100%;
            }
            &.icon3 {
              background: url(../img/icon/icon_3.png);
              background-size: 100% 100%;
            }
            &.icon4 {
              background: url(../img/icon/icon_4.png);
              background-size: 100% 100%;
            }
            &.icon5 {
              width: 1.94rem;
              background: url(../img/icon/icon_5.png);
              background-size: 100% 100%;
            }
            &.icon100 {
              width: 1.94rem;
              background: url(../img/icon/icon_5.png);
              background-size: 100% 100%;
            }
          }
        }
        .uid {
          color: rgba(226, 205, 255, 1);
          font-size: 0.28rem;
          display: flex;
          align-items: center;

          .red_packet {
            width: 1.41rem;
            height: 0.57rem;
            margin-left: 0.1rem;
            background: url(../img/icon/red_packt.png);
            background-size: 100% 100%;
          }
        }
      }

      .score {
        display: flex;
        align-items: center;
        font-size: 0.28rem;
        margin-left: 0.35rem;
        color: rgba(255, 227, 68, 1);
        i {
          width: 0.25rem;
          height: 0.29rem;
          background: url(../img/fire.png);
          background-size: 100% 100%;
          margin-right: 0.1rem;
          &.coins {
            height: 0.25rem;
            background: url(../img/coinsIcon.png);
            background-size: 100% 100%;
          }
        }
      }
      &.rank1 {
        .rank {
          text-indent: -999rem;
          background: url(../img/top1.png);
          background-size: 100% 100%;
        }
      }
      &.rank2 {
        .rank {
          text-indent: -999rem;
          background: url(../img/top2.png);
          background-size: 100% 100%;
        }
      }
      &.rank3 {
        .rank {
          text-indent: -999rem;
          background: url(../img/top3.png);
          background-size: 100% 100%;
        }
      }
    }
    li::before {
      content: "";
      display: block;
      width: 6.42rem;
      height: 1px;
      background: #ffffff;
      opacity: 0.3;
      position: absolute;
      bottom: 0;
      left: 0.31rem;
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
  height: 0.94rem;
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
