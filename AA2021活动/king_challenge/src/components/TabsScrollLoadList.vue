<template>
  <div class="rankGroups">
    <!-- 日榜、总榜切换主Tabs -->
    <div class="mainTabs">
      <div class="tabs">
        <a @click.prevent="mainTabClick(2)" :class="{current:mainTab==2}" class="tab2">{{lang.rank_title3}}</a>
        <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" class="tab1">{{lang.rank_title1}}</a>
        <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" class="tab2">{{lang.rank_title2}}</a>
      </div>
      <a @click.prevent="onRefresh" href="" :class="{mb:mainTab == 0 || mainTab == 1}" :style="{transform:'rotate('+rotatePx+'deg)'}" id="refresh"></a>
    </div>
    <Tasks v-if="mainTab == 2" />
    <!-- 倒计时 -->
    <div class="downTimebox" v-if="mainTab != 2">
      <!-- <div class="timeTips"> -->
      <p v-if="step==0">{{lang.rank_timeDown2}}</p>
      <p v-else-if="step == 1">{{lang.rank_timeDown1}}</p>
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
          <span class="model" v-if="item.level">{{level[item.level].name}}</span>
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
          <span class="model" v-if="item.info.playmode">{{room_model[item.info.playmode]}} </span>
          <div class="rank">{{item.rank}}</div>
          <div class="uerImg">
            <img v-lazy="item.info.pic_url" alt="" class="av room" :class="{noBor:item.info.frame_resource_url}">
            <img :src="item.info.frame_resource_url" alt="" v-if="item.info.frame_resource_url" class="room_frame">
          </div>
          <div class="nickBox">
            <div class="nickTips"><span class="nick">{{item.info.rname}}</span></div>
            <div class="uid"><span>{{item.info.rid}}</span> <i>{{item.info.online}}{{lang.onLine}}</i> </div>
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
import Tasks from "./Tasks"
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
  components: { Tasks },
  data () {
    return {
      mainTab: 2,
      // tab: 1,
      surplusTime: {},//日榜剩余时间
      timer: null,
      timer2: null,
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
      surplusTime: {},
      // room_model: {
      //   1: '1v1PK',
      //   2: '家族PK',
      //   3: '擂台PK',
      //   4: '禮物挑戰',
      //   5: '談天說地',
      //   6: '歡唱KTV',
      // }
    }
  },
  watch: {
    load (val) {
      this.downTimeGo('time', val)
    },
  },
  computed: {
    ...mapState(['rankGroups', 'isShare', 'load', 'step', 'level']),
    rankKey () {
      // return ['one', 'two', 'three'][this.tab];
      return this.mainTab == 1 ? 'total' : this.mainTab;
    },
    rankApi () {
      if (this.isShare) {
        var dayApi = `/king_challenge/allList.php?from={from}&type=0`;
        var totalApi = `/king_challenge/allList.php?from={from}&type=1`;
        var api = this.rankKey == 'total' ? totalApi : dayApi;
        return api
      } else {
        var dayApi = `/king_challenge/allList.php?token={token}&from={from}&type=0`;
        var totalApi = `/king_challenge/allList.php?token={token}&from={from}&type=1`;
        var api = this.rankKey == 'total' ? totalApi : dayApi;
        const token = getUrlString('token') || '';
        return api.replace('{token}', token);
      }
    },
    rankSize () {
      // 如果明确服务器每次返回的列表长度，请返回具体的数值，有助于减少一次额外请求即可确定加载完所有数据
      return 20;
    },
    rank () {
      const rankConf = this.rankGroups[this.rankKey] || {};
      rankConf.list = rankConf.list || [];
      // if (rankConf.second && rankConf.second > 0) {
      //   this.downTimeGo('time' + this.rankKey, rankConf.second)
      // }
      return rankConf;
    },
    room_model: () => _lang.room_model,
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
      this.$store.commit("changTab", this.rankKey)
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      })
    },
    onScroll (isRefresh) {
      // console.log('xxx')
      // if (this.tab > this.nowDay) return (this.tab > this.nowDay && this.rankKey !== 'total') || 
      // if (this.inited === 0) { //初始化是少一次請求,是日榜的时候和不是总榜的时候返回
      //   return
      // }
      if (!this.rank.loading && !this.rank.loadEnd && this.mainTab != 2) {
        const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100;
        const notFull = document.body.scrollHeight < window.innerHeigh;
        if (scrollToBottom || notFull || isRefresh || !this.rank.loadCount) {
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
    onRefresh () {
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
        if (this.mainTab == 2) {
          this.$store.dispatch('getInitInfo');
        }

      });
    },

    goUser (uid, kmic) { //跳转
      if (kmic) {
        this.goKroom(kmic)
        return
      }
      location.href = `uid:${uid}`
    },
    goKroom (rid) {
      location.href = `rid:${rid}`
    },
    downTimeGo (timeName, val) {
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

<style lang="scss" scoped>
.rankGroups {
  margin-top: 0.1rem;
  padding-bottom: 2rem;
  position: relative;
  .mainTabs {
    margin: 0.3rem auto;
    .tabs {
      padding: 0 0.24rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      a {
        display: block;
        width: 2.18rem;
        height: 0.72rem;
        text-align: center;
        line-height: 0.72rem;
        font-size: 0.32rem;
        color: rgba(131, 9, 67, 1);
        background: url(../img/tabs_not_act.png);
        background-size: 100% 100%;
        &.current {
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
    color: rgba(131, 9, 67, 1);
    .timeDown {
      padding: 0 0.37rem;
      margin: 0.12rem auto 0;
      display: flex;
      justify-content: space-between;
      strong {
        color: rgba(131, 9, 67, 1);
        font-size: 0.63rem;
        font-weight: bold;
        display: block;
        width: 1rem;
        height: 1rem;
        background: #fff2d8;
        border: 0.02rem solid #830943;
        border-radius: 0.12rem;
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
        color: rgba(131, 9, 67, 1);
        margin: 0.1rem 0 0.22rem;
      }
    }
    .tips {
      color: rgba(131, 9, 67, 1);
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
    width: 7.02rem;
    padding: 0.18rem 0;
    background: linear-gradient(180deg, #f8db5d, #f8db5d, #99c28c);
    border: 0.02rem solid #830943;
    border-radius: 0.28rem;
    position: relative;
    z-index: 10;
    ul {
      width: 6.66rem;
      background: #fff2d8;
      border: 0.02rem solid #830943;
      border-radius: 0.16rem;
      margin: 0 auto;
    }
    li {
      height: 1.39rem;
      display: flex;
      align-items: center;
      margin-bottom: 0.04rem;
      position: relative;
      .model {
        padding: 0 0.1rem;
        height: 0.32rem;
        line-height: 0.32rem;
        font-size: 0.2rem;
        background: #f8db5d;
        border: 0.02rem solid #830943;
        border-radius: 0 0 0.05rem 0.05rem;
        position: absolute;
        right: 0.22rem;
        top: 0;
      }
      .rank {
        width: 0.55rem;
        height: 0.56rem;
        color: rgba(131, 9, 67, 1);
        text-align: center;
        line-height: 0.56rem;
        margin: 0 0.15rem;
        font-size: 0.32rem;
        font-weight: bold;
        white-space: nowrap;
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
        .room_frame {
          width: 1rem;
          height: 1rem;
          position: absolute;
          top: 0.05rem;
          left: 0.051rem;
          z-index: 10;
        }
        .av {
          width: 0.88rem;
          height: 0.88rem;
          position: absolute;
          top: 0.1rem;
          left: 0.11rem;
          border-radius: 50%;
          border: 0.02rem solid rgba(131, 9, 67, 1);
          &.room {
            border-radius: 0.14rem;
            &.noBor {
              border: none;
            }
          }
        }
      }
      .nickBox {
        width: 2.6rem;
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
            color: rgba(131, 9, 67, 1);
          }
          .ktvIng {
            width: 0.28rem;
            height: 0.22rem;
            background: url(../img/ktvIng.png);
            background-size: 100% 100%;
            margin-left: 0.1rem;
          }
        }
        .uid {
          color: rgba(131, 9, 67, 0.6);
          font-size: 0.26rem;
          display: flex;
          align-items: center;
          margin-top: 0.06rem;
          i {
            font-size: 0.26rem;
            margin-left: 0.15rem;
          }
        }
      }

      .score {
        display: flex;
        align-items: center;
        font-size: 0.28rem;
        margin-left: 0.15rem;
        color: rgba(131, 9, 67, 1);
        i {
          width: 0.31rem;
          height: 0.38rem;
          background: url(../img/fire.png);
          background-size: 100% 100%;
          margin-right: 0.1rem;
          &.coins {
            width: 0.35rem;
            background: url(../img/coinsIcon.png);
            background-size: 100% 100%;
          }
        }
      }
      &.rank1 {
        .rank {
          text-indent: -999rem;
          background: url(../img/top1.png) center  center no-repeat;
          background-size: 0.44rem 0.55rem;
        }
      }
      &.rank2 {
        .rank {
          text-indent: -999rem;
          background: url(../img/top2.png)  center  center no-repeat;
          background-size: 0.44rem 0.55rem;
        }
      }
      &.rank3 {
        .rank {
          text-indent: -999rem;
          background: url(../img/top3.png)  center  center no-repeat;
          background-size: 0.44rem 0.55rem;
        }
      }
    }
    li::before {
      content: '';
      display: block;
      width: 6.33rem;
      height: 0rem;
      border-bottom: 1px dashed rgba(131, 9, 67, 1);
      position: absolute;
      bottom: 0;
      left: 0.17rem;
    }
    li:last-child:before {
      border: none;
    }
  }
}
.dengdai {
  text-align: center;
  margin-top: 1rem;
}
.scrollLoading {
  text-align: center;
  color: #830943;
  font-size: 80%;
  margin-top: 1rem;
}
.scrollNone {
  text-align: center;
  color: #830943;
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
  transition: transform 1s;
  text-indent: -999rem;
  z-index: 100;
  &.mb {
    bottom: 2.8rem;
  }
}
</style>
