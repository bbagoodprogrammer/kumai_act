<template>
  <div class="rankGroups">
    <div class="listTipsL"></div>
    <div class="listTipsR"></div>
    <!-- 日榜、总榜切换主Tabs -->
    <div class="mainTabs" :class="{maxH:mainTab!=2 && mainTab!=1}">
      <div class="tabItem">
        <span class="taskTab" @click.prevent="mainTabClick(2)" :class="{current:mainTab==2}" href="">每日任務</span>
        <div class="tabs">
          <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" href="">日榜</a>
          <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" href="">總榜</a>
        </div>
      </div>
      <div class="listBg" v-if="mainTab!=2 && mainTab!=1">
        <DayTabs v-if="mainTab==0" @changeClick="tabClick" :tab="tab"></DayTabs>
        <div class="downTimebox" v-show="mainTab!=2">
          <!-- <div v-if="mainTab == 0">
        <p v-if="tab == nowDay && activeityState == 1">本日榜結束倒計時</p>
        <p v-else-if="tab >= nowDay">本日榜開始倒計時</p>
        <div class="noTime" v-else>本日榜已結束</div>
        </div>
        <div v-if="mainTab == 1">
          <p v-if="activeityState == 0">總榜開始倒計時</p>
          <p v-else-if="activeityState == 1">總榜結束倒計時</p>
          <div class="noTime" v-else>總榜已結束</div>
        </div> -->
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
        </div>
        <div class="dayScore" :class="{mt:tab<nowDay}">
          <span class="scoreImg"></span>
          <div class="scoreMsg">
            <div class="total">神燈召喚值現已積累到 {{rank.amount}}</div>
            <div class="conis" v-if="tab>=nowDay">日榜前100名今日有機會瓜分 <em>{{rank.coins}}</em>金幣 </div>
            <div class="conis" v-else>日榜前100名已瓜分 <em>{{rank.coins}}</em>金幣 </div>
          </div>
        </div>
      </div>
      <a @click.prevent="onRefresh" href="" v-if="(tab == nowDay || mainTab == 1) && !isShare && activeityState===1" :style="{transform:'rotate('+rotatePx+'deg)'}" id="refresh">刷新</a>
    </div>
    <!-- <div v-if="mainTab==0" class="tabs">
      <a @click.prevent="tabClick(0)" :class="{current:tab==0}" href="">日榜1</a>
      <a @click.prevent="tabClick(1)" :class="{current:tab==1}" href="">日榜2</a>
      <a @click.prevent="tabClick(2)" :class="{current:tab==2}" href="">日榜3</a>
    </div> -->
    <!-- <p class="scoreTips">狂歡值=積分值+作品/K房收到金幣禮物魅力值</p> -->
    <!-- 日榜 -->

    <ul v-if="mainTab==0" class="list day">
      <li v-for="(item,index) in rank.list" :key="index" :class="'rank'+item.rank" @click="goUser(item.uid)">
        <div class="rank">{{item.rank}}</div>
        <div class="uerImg">
          <span class="imgBg"></span>
          <img v-lazy="item.avatar" alt="" class="imgItem">
        </div>
        <div class="userMsg">
          <div class="name">{{item.nick}}</div>
          <div class="uid">{{item.uid}}</div>
        </div>
        <div class="score" :class="{ml:item.coins==0}">召喚值: <em>{{item.score}}</em></div>
        <!-- -->
        <div class="coins" v-if="item.coins>0">{{item.coins}}金幣</div>
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
          <div class="name">{{item.nick}}</div>
          <div class="uid">{{item.uid}}</div>
        </div>
        <div class="score">召喚值: <em>{{item.score}}</em></div>
        <!-- v-if="item.coins>0" -->
        <!-- <div class="coins">{{item.coins}}金幣</div> -->
      </li>
    </ul>
    <!-- 任務列表 -->
    <taskList v-else></taskList>
    <!-- 日榜和总榜共用Loading（如果需要细化加载提示文案，可以把以下标签复制到不同的榜单后面） -->
    <div class="listTipsBox" v-if="rank.loading || mainTab==0 && tab > nowDay || rank.none && mainTab==0 && (rank.list.length == 0 && (tab <= nowDay || tab ==='total'))">
      <div v-if="rank.loading" class="scrollLoading">加載中...</div>
      <div v-if="rank.none && mainTab==0 && (rank.list.length == 0 && (tab <= nowDay || tab ==='total'))" class="scrollNone">
        目前暫無歌友上榜</br>
        虛位以待，等你來哦！
      </div>
      <div v-if="mainTab==0 && tab > nowDay" class="dengdai">敬請期待！</div>
    </div>
    <div class="listBtn" v-if="mainTab!=2"></div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import getUrlString from '../utils/getString.js';
import DayTabs from "../components/DayTabs"
import downTime from '../utils/downTime.js'
import APP from "../utils/openApp"
import TaskList from "../components/TaskList"
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
  components: { DayTabs, TaskList },
  data() {
    return {
      mainTab: 2,
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
    ...mapState(['rankGroups', "nowDay", "setInited", "isShare", "activeityState", "daily_tasks", "dateArr"]),
    rankKey() {
      return this.mainTab == 1 ? 'total' : this.tab;
    },
    rankApi() {
      if (this.isShare) {
        var dayApi = `/lampu_aladdin/allList.php?tm={date}&from={from}`;
        var totalApi = `/lampu_aladdin/allList.php?tm=0&from={from}`;
        var api = this.rankKey == 'total' ? totalApi : dayApi;
        return api.replace('{date}', this.getDate(this.dateArr[this.tab - 1]))
      } else {
        var dayApi = `/lampu_aladdin/allList.php?token={token}&tm={date}&from={from}`;
        var totalApi = `/lampu_aladdin/allList.php?token={token}&tm=0&from={from}`;
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
      // this.$store.commit("changTypeTab", tab)
      if (tab == 2) {  //展示任務列表
        this.mainTab = tab;
        this.tab = this.nowDay
        this.$store.commit("changTab", this.rankKey)
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
      if (this.setInited === 0 || this.mainTab == 2) { //初始化是少一次請求,是日榜的时候和不是总榜的时候返回
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
            set('second', response_data.date)
            set('amount', response_data.amount)
            set('coins', response_data.coins)
            // }

            //跟随榜单变换个人信息
            if (response_data.myrank) {
              this.$store.commit("changGroupsUserMsg", {//初始当前日榜个人信息
                key: this.rankKey,
                msg: response_data.myrank
              })
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
    onRefresh() {
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      if (this.rank.loading) return
      this.$emit('getDefaultData')
      if (this.mainTab == 1) {
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
      return getDate(new Date(time * 1000), '3')
    },
    goUser(uid) { //跳转
      location.href = `uid:${uid}`
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.onScroll);
    },
  },
}
</script>

<style lang="scss">
.rankGroups {
  // margin-top: -0.15rem;
  padding: 0.49rem 0 2rem 0;
  position: relative;
  > li {
    padding: 0.5rem 0;
  }
  .listTipsL {
    width: 0.73rem;
    height: 4.76rem;
    background: url(../assets/img/rankR.png);
    background-size: 100% 100%;
    position: absolute;
    top: -0.15rem;
    left: 0;
    z-index: 5;
  }
  .listTipsR {
    width: 0.73rem;
    height: 4.76rem;
    background: url(../assets/img/rankL.png);
    background-size: 100% 100%;
    position: absolute;
    top: -0.15rem;
    right: 0;
    z-index: 5;
  }
  .mainTabs {
    width: 7.05rem;
    height: 0.83rem;
    background: url(../assets/img/listBg.png);
    background-size: 100% auto;
    margin: 0 auto;
    position: relative;
    &.maxH {
      height: 3.28rem;
    }
    .tabItem {
      display: flex;
      align-items: center;
      width: 6.34rem;
      height: 1.18rem;
      background: url(../assets/img/tabs.png);
      background-size: 100% 100%;
      margin: 0 auto;
      position: absolute;
      top: -0.5rem;
      left: 0.37rem;
      z-index: 5;
      .taskTab {
        width: 1.86rem;
        height: 0.65rem;
        text-align: center;
        line-height: 0.75rem;
        margin: -0.1rem 0 0 0.06rem;
        font-size: 0.28rem;
        color: #fff334;
        font-weight: 700;
        &.current {
          color: #fff7e0;
          line-height: 0.65rem;
          text-shadow: #6b2800 1.9px 0 0, #6b2800 0 1.9px 0, #6b2800 -1.9px 0 0,
            #6b2800 0 -1.9px 0;
          // -webkit-text-stroke: 0.5px #6b2800;
          // text-stroke: 0.5px #6b2800;
          background: url(../assets/img/taskAct.png);
          background-size: 100% 100%;
        }
      }
      .tabs {
        flex: 1;
        height: 0.65rem;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 0.11rem;
        margin-top: -0.1rem;
        a {
          display: block;
          width: 50%;
          height: 0.65rem;
          text-align: center;
          line-height: 0.75rem;
          color: #fff334;
          font-size: 0.28rem;
          &.current {
            color: #fff;
            line-height: 0.65rem;
            text-shadow: #6b2800 1.9px 0 0, #6b2800 0 1.9px 0,
              #6b2800 -1.9px 0 0, #6b2800 0 -1.9px 0;
            background: url(../assets/img/actTab.png);
            background-size: 100% 100%;
          }
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
  .listBg {
    width: 7.05rem;
    height: 2.53rem;
    background: url(../assets/img/listBg.png);
    background-size: 100% auto;
    position: absolute;
    bottom: 0.15rem;
  }
  .downTimebox {
    margin: 0 auto;
    width: 6.98rem;
    text-align: center;
    position: relative;
    .timeDown {
      width: 3.6rem;
      height: 0.6rem;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      > div {
        height: 100%;
        color: #ce874e;
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
  .dayScore {
    width: 5.45rem;
    height: 0.88rem;
    padding: 0 0.48rem;
    background: url(../assets/img/dayScore.png);
    background-size: 100% 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    &.mt {
      margin-top: 0.4rem;
    }
    .scoreImg {
      width: 0.82rem;
      height: 0.77rem;
      background: url(../assets/img/scoreBox.png);
      background-size: 100% 100%;
      margin-right: 0.1rem;
    }
    .scoreMsg {
      .total {
        font-size: 0.24rem;
        font-weight: 600;
      }
      .conis {
        font-size: 0.24rem;
        font-weight: 600;
        color: #ffe33a;
        white-space: nowrap;
      }
    }
  }
  .list {
    margin: -0rem auto;
    width: 7.05rem;
    li {
      height: 1.13rem;
      background: url(../assets/img/listBg.png);
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      position: relative;
      .rank {
        width: 0.84rem;
        height: 0.72rem;
        font-size: 110%;
        color: #c15675;
        text-align: center;
        line-height: 0.72rem;
        margin-left: 0.15rem;
      }
      .uerImg {
        width: 1.1rem;
        height: 1.1rem;
        position: relative;
        margin-left: 0.06rem;
        .imgBg {
          width: 1.09rem;
          height: 1.09rem;
          background: url(../assets/img/userImgBg.png);
          background-size: 100% 100%;
          position: absolute;
          z-index: 10;
        }
        .imgItem {
          width: 1rem;
          height: 1rem;
          position: absolute;
          top: 0.045rem;
          left: 0.045rem;
          border-radius: 50%;
        }
      }
      .userMsg {
        width: 1.7rem;
        margin-left: 0.1rem;
        .name {
          max-width: 2.3rem;
          height: 50%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: #784114;
          font-size: 0.24rem;
        }
        .uid {
          color: #784114;
          font-size: 0.22rem;
        }
      }
      .score {
        min-width: 1.2rem;
        color: #784114;
        font-size: 0.21rem;
        margin-left: 0.15rem;
        em {
          font-size: 0.29rem;
        }
        &.ml {
          margin-left: 1rem;
        }
      }
      .coins {
        width: 1.3rem;
        height: 0.34rem;
        background: url(../assets/img/coins.png);
        background-size: 100% 100%;
        font-size: 0.24rem;
        text-indent: 0.4rem;
        color: #ffed5f;
        font-weight: 600;
        margin-left: 0.05rem;
      }
      &.rank1 {
        .rank {
          text-indent: -999rem;
          background: url(../assets/img/top1.png);
          background-size: 100% 100%;
        }
        .imgBg {
          width: 1.11rem;
          height: 1.25rem;
          top: -0.2rem;
          background: url(../assets/img/rank1.png);
          background-size: 100% 100%;
        }
      }
      &.rank2 {
        .rank {
          text-indent: -999rem;
          background: url(../assets/img/top2.png);
          background-size: 100% 100%;
        }
        .imgBg {
          width: 1.11rem;
          height: 1.25rem;
          top: -0.2rem;
          background: url(../assets/img/rank2.png);
          background-size: 100% 100%;
        }
      }
      &.rank3 {
        .rank {
          text-indent: -999rem;
          background: url(../assets/img/top3.png);
          background-size: 100% 100%;
        }
        .imgBg {
          width: 1.11rem;
          height: 1.25rem;
          top: -0.2rem;
          background: url(../assets/img/rank3.png);
          background-size: 100% 100%;
        }
      }
    }
    li:last-child::before {
      display: none;
    }
    li:before {
      content: "";
      display: block;
      width: 6rem;
      height: 0.06rem;
      opacity: 0.48;
      background: #e4b758;
      position: absolute;
      bottom: -0.03rem;
      left: 0.65rem;
      z-index: 10;
    }
  }
}
.listTipsBox {
  width: 7.05rem;
  height: 1.13rem;
  margin: 0 auto;
  background: url(../assets/img/listBg.png);
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #784114;
  font-size: 0.24rem;
}
.listBtn {
  width: 7.05rem;
  height: 0.59rem;
  background: url(../assets/img/listBtn.png);
  background-size: 100% 100%;
  margin: -0.05rem auto;
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
