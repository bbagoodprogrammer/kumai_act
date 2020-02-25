<template>
  <div class="rankGroups">
    <!-- 日榜、总榜切换主Tabs -->
    <div class="mainTabs">
      <span class="taskTab" @click.prevent="mainTabClick(2)" :class="{current:mainTab==2}" href="">{{lang.bottomTabs1}}</span>
      <div class="tabs">
        <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" class="rank1">{{lang.bottomTabs2}}</a>
        <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" class="rank2">{{lang.bottomTabs3}}</a>
      </div>
      <a @click.prevent="onRefresh" href="" v-if="!isShare && actStatus===1" :style="{transform:'rotate('+rotatePx+'deg)'}" id="refresh"></a>
    </div>
    <!-- 日榜 -->
    <p class="rankTips">
      <span v-if="mainTab==0">{{lang.rankTips}}</span>
      <span v-if="mainTab==1">{{lang.rankTips2}}</span>
    </p>
    <ul v-if="mainTab==0" class="list day">
      <li v-for="(item,index) in rank.list" :key="index" :class="'rank'+item.rank" @click="goUser(item.uid)">
        <div class="rank">{{item.rank}}</div>
        <div class="uerImg">
          <span class="imgBg"></span>
          <img v-lazy="item.avatar" alt="" class="imgItem">
        </div>
        <div class="userMsg">
          <div class="name">
            <span>{{item.nick}}</span>
          </div>
        </div>
        <div class="score">
          <div class="lv">{{lang.Lv}}{{getLv(item.score)}}</div>
          <div class="scoreItem">{{lang.Score}}{{item.score}}</div>
        </div>
      </li>
    </ul>
    <!-- 总榜 -->
    <ul v-else-if="mainTab==1" class="list total">
      <li v-for="(item,index) in rank.list" :key="index" :class="'rank'+item.rank" @click="goUser(item.uid)">
        <div class="rank">{{item.rank}}</div>
        <div class="uerImg">
          <span class="imgBg"></span>
          <img v-lazy="item.avatar" alt="" class="imgItem">
        </div>
        <div class="userMsg">
          <div class="name">
            <span>{{item.nick}}</span>
          </div>
        </div>
        <div class="score">
          {{lang.PlayValue}}{{item.score}}
        </div>
      </li>
    </ul>
    <!-- 任務列表 -->
    <taskList v-else></taskList>
    <!-- 日榜和总榜共用Loading（如果需要细化加载提示文案，可以把以下标签复制到不同的榜单后面） -->
    <div v-if="rank.loading" class="scrollLoading">{{lang.Loading}}</div>
    <div v-if="rank.none && mainTab!=2 && actStatus == 1" class="scrollNone">
      {{lang.noPeople}}</br>
      {{lang.wait}}
    </div>
    <div class="dengdai" v-if="mainTab!=2 && actStatus == 0">{{lang.deng}}</div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import getUrlString from '../utils/getString.js';
import APP from "../utils/openApp"
import TaskList from "../components/TaskList"
import api from "../api/apiConfig"
import getDate from "../utils/getDate"
import { findValueUseTwoSplit } from "../utils/getGrade"
import { globalBus } from '../utils/eventBus'
import lang from "../config/lang"
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
  components: { TaskList },
  data() {
    return {
      mainTab: 2,
      // tab: 1,
      surplusTime: {},//日榜剩余时间
      timer: null,
      timer2: null,
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
      timer: null,
    }
  },
  watch: {
  },
  computed: {
    ...mapState(['rankGroups', "setInited", "isShare", "actStatus"]),
    rankKey() {
      return this.mainTab == 1 ? 'total' : this.mainTab;
    },
    rankApi() {
      if (this.isShare) {
        var dayApi = `/ye201901/sharerank.php?rank_status=${this.mainTab}&from={from}`;
        return dayApi.replace('{date}')
      } else {
        var dayApi = `/ye201901/rank.php?token={token}&rank_status=${this.mainTab}&from={from}`;
        const token = getUrlString('token') || '';
        return dayApi.replace('{date}').replace('{token}', token);
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
    globalBus.$on('tabClick', (callback, other) => {
      this.mainTabClick(callback, other)
    })
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    mainTabClick(tab, other) { //总榜切换
      this.mainTab = tab;
      this.$store.commit("changTab2", this.rankKey)
      if (other) {
        this.scorllTo()
      }
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      });
    },
    onScroll(val) {
      if (this.setInited === 0) { //初始化是少一次請求,是日榜的时候和不是总榜的时候返回
        return
      }
      if (!this.rank.loading && !this.rank.loadEnd && this.mainTab !== 2) {
        const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100;
        const notFull = document.body.scrollHeight < window.innerHeight;
        if (scrollToBottom || notFull || val) {
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
            const arr = response_data.rank;
            //跟随榜单变换个人信息
            if (response_data.owner_msg && response_data.owner_msg.uid) {
              this.$store.commit("changGroupsUserMsg", {//初始当前日榜个人信息
                key: this.rankKey,
                msg: response_data.owner_msg
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
      if (this.mainTab == 2) {
        this.$parent.getDefaultData()
      } else {
        this.$parent.getDefaultData()
        this.$store.commit('updateRankGroups', {
          key: this.rankKey,
          loadCount: 0,
          loadEnd: false,
          loading: false,
          none: false,
          list: [],
        });
        this.$nextTick(this.onScroll('ref'));
      }
    },
    getDate(time) {
      return getDate(new Date(time * 1000), '2')
    },
    goUser(uid) { //跳转
      location.href = `uid:${uid}`
    },
    getLv(score) {
      return findValueUseTwoSplit(score).grade
    },
    scorllTo() {
      this.timer = setInterval(() => {
        var scorllTop = document.body.scrollHeight
        var step = scorllTop / 10
        window.scrollTo(0, scorllTop - step)
        const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100;
        if (scrollToBottom) {//速度小于3或者滚动条到底了
          clearInterval(this.timer)
        }
      }, 10)
    }
  },
}
</script>

<style lang="scss">
.rankGroups {
  margin-top: 0.27rem;
  padding-bottom: 2rem;
  > li {
    padding: 0.5rem 0;
  }
  .mainTabs {
    margin: 0.37rem 0 0.3rem;
    padding: 0 0.22rem;
    height: 0.81rem;
    display: flex;
    .taskTab {
      width: 2.33rem;
      height: 0.81rem;
      background: url(../assets/img/taskBg.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.81rem;
      margin-right: 0.23rem;
      color: #ffd145;
      font-size: 93%;
      font-weight: bold;
      &.current {
        color: #b98300;
        background: url(../assets/img/taskBgAct.png);
        background-size: 100% 100%;
      }
    }
    .tabs {
      // width: 4.7rem;
      height: 0.81rem;
      // background: url(../assets/img/tabs.png);
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      a {
        display: block;
        width: 2.33rem;
        height: 0.81rem;
        text-align: center;
        line-height: 0.81rem;
        color: #ffd145;
        font-weight: bold;
        font-size: 93%;
        &.rank1 {
          background: url(../assets/img/tabsBg.png);
          background-size: 100% 100%;
          &.current {
            color: #b98300;
            background: url(../assets/img/tabsBgAct.png);
            background-size: 100% 100%;
          }
        }
        &.rank2 {
          background: url(../assets/img/tabsBg2.png);
          background-size: 100% 100%;
          &.current {
            color: #b98300;
            background: url(../assets/img/tabsBgAct2.png);
            background-size: 100% 100%;
          }
        }
      }
    }
  }
  .rankTips {
    span {
      display: block;
      text-align: center;
      font-size: 80%;
      color: #ffe178;
    }
  }
  .list {
    margin: 0.19rem auto;
    width: 7.12rem;
    li {
      height: 1rem;
      margin-top: 0.05rem;
      background: url(../assets/img/top3Bg.png);
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      .rank {
        width: 0.84rem;
        height: 0.72rem;
        font-size: 110%;
        color: #c15675;
        text-align: center;
        line-height: 0.72rem;
        margin-left: 0.13rem;
      }
      .uerImg {
        width: 0.92rem;
        height: 1.01rem;
        position: relative;
        margin-left: 0.05rem;
        display: flex;
        align-items: center;
        justify-content: center;
        .imgItem {
          width: 0.78rem;
          height: 0.78rem;
          border: 0.03rem solid #ffe178;
          border-radius: 50%;
        }
      }
      .userMsg {
        width: 2.5rem;
        margin-left: 0.21rem;
        .name {
          display: flex;
          align-items: center;
          span {
            max-width: 2.5rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          i {
            display: block;
            margin-left: 0.1rem;
            width: 0.62rem;
            height: 0.29rem;
            // background: url(../assets/img/prizeTips.png);
            background-size: 100% 100%;
          }
        }
        .probability {
          color: #fff9d6;
          font-size: 73%;
          em {
            font-size: 0.28rem;
          }
        }
      }
      .score {
        font-size: 80%;
        margin-left: 0.4rem;
        em {
          font-size: 0.29rem;
        }
      }
      .giftCharm {
        div {
          display: flex;
          align-items: center;
          font-size: 80%;
          color: #fff9d6;
        }
        .star {
          display: block;
          width: 0.32rem;
          height: 0.31rem;
          margin-right: 0.09rem;
          // background: url(../assets/img/star.png);
          background-size: 100% 100%;
        }
        .hear {
          display: block;
          width: 0.32rem;
          height: 0.31rem;
          margin-right: 0.09rem;
          // background: url(../assets/img/hear.png);
          background-size: 100% 100%;
        }
      }
      &.rank1 {
        background: url(../assets/img/top1Bg.png);
        background-size: 100% 100%;
        .rank {
          text-indent: -999rem;
          background: url(../assets/img/top1.png);
          background-size: 100% 100%;
        }
        .imgBg {
          width: 0.94rem;
          height: 1.06rem;
          background: url(../assets/img/top1ImgBg.png);
          background-size: 100% 100%;
          position: absolute;
          z-index: 10;
          top: -0.13rem;
        }
        img {
          border: none;
        }
      }
      &.rank2 {
        background: url(../assets/img/top2Bg.png);
        background-size: 100% 100%;
        .rank {
          text-indent: -999rem;
          background: url(../assets/img/top2.png);
          background-size: 100% 100%;
        }
        .imgBg {
          width: 0.94rem;
          height: 1.06rem;
          background: url(../assets/img/top2ImgBg.png);
          background-size: 100% 100%;
          position: absolute;
          z-index: 10;
          top: -0.13rem;
        }
        img {
          border: none;
        }
      }
      &.rank3 {
        background: url(../assets/img/top2Bg.png);
        background-size: 100% 100%;
        .rank {
          text-indent: -999rem;
          background: url(../assets/img/top3.png);
          background-size: 100% 100%;
        }
        .imgBg {
          width: 0.9rem;
          height: 1.06rem;
          background: url(../assets/img/top3ImgBg.png);
          background-size: 100% 100%;
          position: absolute;
          z-index: 10;
          top: -0.13rem;
        }
        img {
          border: none;
        }
      }
    }
  }
  .total {
    .score {
      margin-left: 0.05rem !important;
    }
  }
}
.dengdai {
  text-align: center;
}
.scrollLoading {
  text-align: center;
  color: #ffefd7;
  font-size: 80%;
}
.scrollNone {
  text-align: center;
  color: #ffefd7;
  font-size: 80%;
}
#refresh {
  display: block;
  width: 0.94rem;
  height: 1rem;
  position: fixed;
  right: 0.08rem;
  bottom: 1.35rem;
  background: url(../assets/img/refresh.png) no-repeat;
  background-size: contain;
  transition: all 1s;
  text-indent: -999rem;
  z-index: 100;
}
</style>
