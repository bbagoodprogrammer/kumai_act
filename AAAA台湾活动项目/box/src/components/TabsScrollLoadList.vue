<template>
  <div class="rankGroups">
    <!-- 日榜、总榜切换主Tabs -->
    <div class="mainTabs">
      <span class="taskTab" @click.prevent="mainTabClick(2)" :class="{current:mainTab==2}" href="">積分任務</span>
      <div class="tabs">
        <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" href="">狂歡日榜</a>
        <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" href="">狂歡總榜</a>
      </div>
      <a @click.prevent="onRefresh" href="" v-if="tab == nowDay && !isShare && activeityState===1" :style="{transform:'rotate('+rotatePx+'deg)'}" id="refresh">刷新</a>
    </div>
    <!-- <div v-if="mainTab==0" class="tabs">
      <a @click.prevent="tabClick(0)" :class="{current:tab==0}" href="">日榜1</a>
      <a @click.prevent="tabClick(1)" :class="{current:tab==1}" href="">日榜2</a>
      <a @click.prevent="tabClick(2)" :class="{current:tab==2}" href="">日榜3</a>
    </div> -->
    <p class="scoreTips">狂歡值=積分值+作品/K房收到金幣禮物魅力值</p>
    <div class="downTimebox" v-if="mainTab == 0">
      <p v-if="tab == nowDay">本日榜結束倒計時</p>
      <p v-else-if="tab > nowDay">本日榜開始倒計時</p>
      <div class="timeDown" v-if="tab >= nowDay && surplusTime.day">
        <div class="day">
          <strong>{{surplusTime.day}}</strong>
          <em>天</em>
        </div>
        <div class="hours">
          <strong>{{surplusTime.hour}}</strong>
          <em>時</em>
        </div>
        <div class="min">
          <strong>{{surplusTime.minute}}</strong>
          <em>分</em>
        </div>
        <div class="second">
          <strong>{{surplusTime.second}}</strong>
          <em>秒</em>
        </div>
      </div>
      <div class="noTime" v-else>本日榜已結束</div>
      <div class="thrid">
        每日狂歡值每達到3000，即可進入當天日榜</br>
        中獎概率=本人日榜狂歡值/進入日榜用戶狂歡總值</br>
        每天中獎名額為進入日榜總人數20%
      </div>
      <div class="warfTips">
        <div class="title">日榜中獎獎勵</div>
        <div class="wardItem">
          <p>- 聖誕套裝背包禮物</p>
          <p>- 聖誕麋鹿座駕（7天）</p>
        </div>
      </div>
    </div>
    <!-- 日榜 -->
    <DayTabs v-if="mainTab==0" @changeClick="tabClick" :tab="tab"></DayTabs>
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
            <i class="tips" v-if="item.is_lucky == 1"></i>
          </div>
          <div class="probability">中獎概率：<em>{{(item.scale*100).toFixed(1)+'%'}}</em></div>
        </div>
        <div class="score">狂歡值: <em>{{item.score}}</em></div>
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
            <i class="tips" v-if="item.is_lucky == 1"></i>
          </div>
          <div class="score">狂歡值: <em>{{item.score}}</em></div>
        </div>
        <div class="giftCharm">
          <div class="starCharm"><i class="star"></i><em>{{item.star_score}}</em></div>
          <div class="hearCharm"><i class="hear"></i><em>{{item.charm_score}}</em></div>
        </div>
      </li>
    </ul>
    <!-- 任務列表 -->
    <taskList v-else></taskList>
    <!-- 日榜和总榜共用Loading（如果需要细化加载提示文案，可以把以下标签复制到不同的榜单后面） -->
    <div v-if="rank.loading" class="scrollLoading">加載中...</div>
    <div v-if="rank.none && mainTab==0 && (rank.list.length == 0 && (tab <= nowDay || tab ==='total'))" class="scrollNone">
      目前暫無歌友上榜</br>
      虛位以待，等你來哦！
    </div>
    <div v-if="mainTab==0 && tab > nowDay" class="dengdai">敬請期待！</div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import getUrlString from '../utils/getString.js';
import DayTabs from "../components/DayTabs"
import downTime from '../utils/downTime.js'
import APP from "../utils/openApp"
// import TaskList from "../components/TaskList"
import api from "../api/apiConfig"
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
  components: { DayTabs },
  data() {
    return {
      mainTab: 0,
      tab: 1,
      surplusTime: {},//日榜剩余时间
      timer: null,
      timer2: null,
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
    ...mapState(['rankGroups', "nowDay", "setInited", "isShare", "activeityState", "day_down_time", "total_down_time", "daily_tasks", "dateArr"]),
    rankKey() {
      // return ['one', 'two', 'three'][this.tab];
      return this.mainTab == 1 ? 'total' : this.tab;
    },
    rankApi() {
      if (this.isShare) {
        var dayApi = `/christmas_party/sharerank.php?date={date}&from={from}`;
        var totalApi = `/christmas_party/sharerank.php?date=0&from={from}`;
        var api = this.rankKey == 'total' ? totalApi : dayApi;
        return api.replace('{date}', this.getDate(this.dateArr[this.tab - 1]))
      } else {
        var dayApi = `/christmas_party/rank.php?token={token}&date={date}&from={from}`;
        var totalApi = `/christmas_party/rank.php?token={token}&date=0&from={from}`;
        var api = this.rankKey == 'total' ? totalApi : dayApi;
        const token = getUrlString('token') || '';
        return api.replace('{date}', this.getDate(this.dateArr[this.tab - 1])).replace('{token}', token);
      }
    },
    rankSize() {
      // 如果明确服务器每次返回的列表长度，请返回具体的数值，有助于减少一次额外请求即可确定加载完所有数据
      return 20;
    },
    rank() {
      const rankConf = this.rankGroups[this.rankKey] || {};
      rankConf.list = rankConf.list || [];
      if (rankConf.second && rankConf.second > 0) {
        this.downTimeGo('time' + this.rankKey, rankConf.second)
      }
      return rankConf;
    },
    // showTimeState() { // 是否顯示剩餘時間
    //   if (this.day_down_time > 0) { //是當天活動
    //     this.downTimeGo(this.day_down_time)
    //     return true
    //   } else {
    //     return false
    //   }
    // }
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
      if (tab == 2) {  //展示任務列表
        this.mainTab = tab;
        if (this.firstTask && !this.isShare) {
          api.getTask().then(res => {
            this.$store.commit('changDaily_tasks', res.data.response_data.daily_tasks)
            this.firstTask = false
          })
        }
      } else {
        this.mainTab = tab;
        this.$store.commit("changTab", this.rankKey)
        this.$nextTick(() => {
          if (!this.rank.loadCount) {
            this.onScroll();
          }
        });
      }
    },
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
      if (this.setInited === 0) { //初始化是少一次請求,是日榜的时候和不是总榜的时候返回
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
            if (this.tab >= this.nowDay && this.mainTab == 0) {
              set('second', response_data.second)
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
        this.$emit('getDefaultData')
        api.getTask().then(res => {
          this.$store.commit('changDaily_tasks', res.data.response_data.daily_tasks)
          this.firstTask = false
        })
      } else {
        this.$store.commit('updateRankGroups', {
          key: this.rankKey,
          loadCount: 0,
          loadEnd: false,
          loading: false,
          none: false,
          list: [],
        });
        this.$nextTick(this.onScroll);
      }

    },
    downTimeGo(timeName, val) {
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
    getDate(time) {
      return getDate(new Date(time * 1000), '2')
    },
    goUser(uid) { //跳转
      location.href = `uid:${uid}`
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
    margin: 0.15rem 0 0.25rem;
    padding: 0 0.37rem;
    height: 0.88rem;
    margin: 0 auto;
    display: flex;
    .taskTab {
      width: 1.86rem;
      height: 0.88rem;
      // background: url(../assets/img/taskTab.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.88rem;
      margin-right: 0.28rem;
      &.current {
        //  background: url(../assets/img/taskAct.png);
        background-size: 100% 100%;
      }
    }
    .tabs {
      width: 4.7rem;
      height: 0.88rem;
      //background: url(../assets/img/tabs.png);
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      a {
        display: block;
        width: 2.51rem;
        height: 0.84rem;
        text-align: center;
        line-height: 0.84rem;
        &.current {
          //background: url(../assets/img/actTab.png);
          background-size: 100% 100%;
        }
      }
    }
  }
  .scoreTips {
    text-align: center;
    color: #ffefd7;
    font-size: 80%;
    margin: 0.31rem 0 0.21rem 0;
  }
  .downTimebox {
    margin: 0.53rem auto 0;
    width: 6.98rem;
    height: 3.79rem;
    text-align: center;
    // background: url(../assets/img/timeBg.png);
    background-size: 100% 100%;
    position: relative;
    > p {
      position: absolute;
      top: -0.4rem;
      width: 6.98rem;
      color: #ff97a8;
      font-size: 80%;
    }
    .timeDown {
      width: 3.6rem;
      height: 0.6rem;
      margin: 0.17rem auto 0;
      // background: url(../assets/img/timeDown.png);
      background-size: 100% 100%;
      display: flex;
      justify-content: space-between;
      > div {
        height: 100%;
        line-height: 0.6rem;
        display: inline-block;
        strong {
          font-size: 120%;
        }
        em {
          font-size: 73%;
        }
      }
    }
    .noTime {
      line-height: 0.6rem;
    }
    .thrid {
      font-size: 73%;
      color: #ffcfdf;
      text-align: center;
    }
    .warfTips {
      width: 2.8rem;
      height: 2rem;
      position: absolute;
      right: 0.2rem;
      bottom: 0.2rem;
      text-align: left;
      white-space: nowrap;
      .title {
        margin-top: 0.5rem;
        color: #ffd52d;
      }
      p {
        color: #ffefd7;
        font-size: 80%;
      }
    }
  }
  .list {
    margin: 0.19rem auto;
    width: 7.12rem;
    li {
      height: 1rem;
      margin-top: 0.05rem;
      //background: url(../assets/img/topItemBg.png);
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
        margin-left: 0.21rem;
        .imgBg {
          width: 0.92rem;
          height: 1.01rem;
          //background: url(../assets/img/userImgBg.png);
          background-size: 100% 100%;
          position: absolute;
          z-index: 10;
        }
        .imgItem {
          width: 0.78rem;
          height: 0.78rem;
          position: absolute;
          top: 0.19rem;
          left: 0.07rem;
          border-radius: 50%;
        }
      }
      .userMsg {
        width: 2.5rem;
        .name {
          display: flex;
          align-items: center;
          span {
            max-width: 1.65rem;
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
        color: #fff88e;
        font-size: 80%;
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
          //  background: url(../assets/img/hear.png);
          background-size: 100% 100%;
        }
      }
      &.rank1 {
        // background: url(../assets/img/top1Bg.png);
        background-size: 100% 100%;
        .rank {
          text-indent: -999rem;
          // background: url(../assets/img/top1.png);
          background-size: 100% 100%;
        }
      }
      &.rank2 {
        // background: url(../assets/img/top2Bg.png);
        background-size: 100% 100%;
        .rank {
          text-indent: -999rem;
          //background: url(../assets/img/top2.png);
          background-size: 100% 100%;
        }
      }
      &.rank3 {
        // background: url(../assets/img/top2Bg.png);
        background-size: 100% 100%;
        .rank {
          text-indent: -999rem;
          //  background: url(../assets/img/top3.png);
          background-size: 100% 100%;
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
  // background: url(../assets/img/refresh.png) no-repeat;
  background-size: contain;
  transition: all 1s;
  text-indent: -999rem;
  z-index: 100;
}
</style>
