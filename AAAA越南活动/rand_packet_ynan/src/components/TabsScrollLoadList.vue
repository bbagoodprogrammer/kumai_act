<template>
  <div class="rankGroups">
    <!-- 日榜、总榜切换主Tabs -->
    <div class="mainTabs">
      <div class="tabs">
        <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" href="">{{lang.dayRank}}</a>
        <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" href="">{{lang.totalRank}}</a>
      </div>
      <a @click.prevent="onRefresh" href="" v-if="tab == nowDay && !isShare && actStatus===1" :style="{transform:'rotate('+rotatePx+'deg)'}" id="refresh"></a>
    </div>
    <!-- <div v-if="mainTab==0" class="tabs">
      <a @click.prevent="tabClick(0)" :class="{current:tab==0}" href="">日榜1</a>
      <a @click.prevent="tabClick(1)" :class="{current:tab==1}" href="">日榜2</a>
      <a @click.prevent="tabClick(2)" :class="{current:tab==2}" href="">日榜3</a>
    </div> -->
    <p class="scoreTips">{{lang.dayRankTips}}</p>
    <div class="downTimebox dayTime" v-if="mainTab == 0">
      <p v-if="tab == nowDay">{{lang.dayDownTime}}</p>
      <p v-else-if="tab > nowDay">{{lang.dayStartTime}}</p>
      <p class="noTime" v-else>{{lang.dayNoTime}}</p>
      <div class="timeDown" v-if="tab >= nowDay && surplusTime.day">
        <div class="day">
          <strong>{{surplusTime.day}}</strong>
          <em>{{lang.day}}</em>
        </div>
        <div class="hours">
          <strong>{{surplusTime.hour}}</strong>
          <em>{{lang.hours}}</em>
        </div>
        <div class="min">
          <strong>{{surplusTime.minute}}</strong>
          <em>{{lang.min}}</em>
        </div>
        <div class="second">
          <strong>{{surplusTime.second}}</strong>
          <em>{{lang.second}}</em>
        </div>
      </div>
    </div>
    <div class="downTimebox todayTime" v-else>
      <p v-if="actStatus == 1">{{lang.totalDownTime}}</p>
      <p v-else-if="actStatus == 0">{{lang.totalStartTime}}</p>
      <div class="noTime" v-else>{{lang.actEnd}}</div>
      <div class="timeDown" v-if="tab >= nowDay && surplusTime.day">
        <div class="day">
          <strong>{{surplusTime.day}}</strong>
          <em>{{lang.day}}</em>
        </div>
        <div class="hours">
          <strong>{{surplusTime.hour}}</strong>
          <em>{{lang.hours}}</em>
        </div>
        <div class="min">
          <strong>{{surplusTime.minute}}</strong>
          <em>{{lang.min}}</em>
        </div>
        <div class="second">
          <strong>{{surplusTime.second}}</strong>
          <em>{{lang.second}}</em>
        </div>
      </div>
    </div>
    <!-- 日榜 -->
    <DayTabs v-if="mainTab==0" @changeClick="tabClick" :tab="tab"></DayTabs>
    <div class="dayList" v-if="rank.list.length > 0 && tab <= nowDay">
      <div class="top3">
        <div v-for="(item,index) in top3" :key="index" :class="'rank'+item.rank" class="topItem">
          <div class="imgBox" @click="goUser(item.uid)">
            <img :src="require(`../assets/img/top${item.rank}.png`)" alt="" class="championTips">
            <img v-lazy="item.avatar" alt="" class="userImg">
          </div>
          <div class="userMsg">
            <div class="name">{{item.nick}}</div>
            <div class="score"><i></i><em>{{item.score}}</em></div>
            <div class="ticket" v-if="mainTab == 0">{{lang.ticket}} {{item.rebate}}%</div>
          </div>
        </div>
      </div>
      <ul class="list day">
        <li v-for="(item,index) in surpluslist" :key="index" :class="'rank'+item.rank" @click="goUser(item.uid)">
          <div class="rank">{{item.rank}}</div>
          <div class="uerImg">
            <img v-lazy="item.avatar" alt="" class="imgItem">
            <img v-if="item.noble != 0" :src="require(`../assets/img/noble/${item.noble}.png`)" alt="" class="noble">
            <i v-else-if="item.vip == 1" class="vip"></i>
          </div>
          <div class="userMsg">
            <div class="name">
              <span>{{item.nick}}</span>
            </div>
            <div class="probability" v-if="mainTab == 0">{{lang.luckGrade}}<em>{{lang.lv}}{{item.level}}</em></div>
          </div>
          <div class="score"><i></i><em>{{item.score}}</em></div>
        </li>
      </ul>
    </div>
    <!-- 总榜 -->
    <!-- <ul v-else-if="mainTab==1" class="list total">
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
    </ul> -->
    <!-- 任務列表 -->
    <!-- 日榜和总榜共用Loading（如果需要细化加载提示文案，可以把以下标签复制到不同的榜单后面） -->
    <div v-if="rank.loading" class="scrollLoading">Đang tải...</div>
    <div v-if="rank.list.length == 0 && tab <= nowDay" class="scrollNone">
      Hiện tại chưa có ai xếp hạng,</br>
      chờ bạn đến nhé!
    </div>
    <div v-if="mainTab==0 && tab > nowDay" class="dengdai">Hãy đợi thêm!</div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import getUrlString from '../utils/getString.js';
import DayTabs from "../components/DayTabs"
import downTime from '../utils/downTime.js'
import APP from "../utils/openApp"
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
      firstTask: true,
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
    ...mapState(['rankGroups', "nowDay", "setInited", "isShare", "actStatus", "day_down_time", "total_down_time", "daily_tasks", "dateArr"]),
    rankKey() {
      // return ['one', 'two', 'three'][this.tab];
      return this.mainTab == 1 ? 'total' : this.tab;
    },
    rankApi() {
      if (this.isShare) {
        var dayApi = `/rand_packet/rank.php?day={day}&from={from}`;
        var totalApi = `/rand_packet/rank.php?from={from}`;
        var api = this.rankKey == 'total' ? totalApi : dayApi;
        return api.replace('{day}', this.tab)
      } else {
        var dayApi = `/rand_packet/rank.php?day={day}&from={from}&token={token}`;
        var totalApi = `/rand_packet/rank.php?from={from}&token={token}`;
        var api = this.rankKey == 'total' ? totalApi : dayApi;
        const token = getUrlString('token') || '';
        return api.replace('{day}', this.tab).replace('{token}', token);
        //return api.replace('{date}', this.tab - 1).replace('{token}', token);
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
        this.downTimeGo('time' + this.rankKey, rankConf.second) //rankConf.second
      }
      return rankConf;
    },
    top3() {
      return this.rank.list.slice(0, 3)
    },
    surpluslist() {
      return this.rank.list.slice(3)
    }
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
      this.$store.commit("setTab", this.rankKey)
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      });
    },
    tabClick(tab) { //日榜切换
      this.tab = tab;
      // var nowTab = this.rankKey >= this.nowDay ? this.nowDay : this.rankKey //存当天选择的tab索引用于底部个人信息查找
      this.$store.commit("setTab", this.rankKey)
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      });
    },
    onScroll() {
      // if (this.tab > this.nowDay) return (this.tab > this.nowDay && this.rankKey !== 'total') || 
      if (this.setInited) { //初始化是少一次請求,是日榜的时候和不是总榜的时候返回
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
            if (this.tab >= this.nowDay) {
              set('second', response_data.time)
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
  padding-bottom: 1.3rem;
  > li {
    padding: 0.5rem 0;
  }
  .mainTabs {
    margin: 0.15rem 0 0.25rem;
    padding: 0 0.26rem;
    height: 0.98rem;
    margin: 0 auto;
    display: flex;
    .tabs {
      width: 6.98rem;
      height: 0.98rem;
      background: url(../assets/img/tabs.png);
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      a {
        display: block;
        width: 3.66rem;
        height: 0.9rem;
        text-align: center;
        line-height: 0.9rem;
        color: #fddc55;
        font-weight: 700;
        font-size: 0.32rem;
        &.current {
          color: #a24e04;
          background: url(../assets/img/actTabs.png);
          background-size: 100% 100%;
        }
      }
    }
  }
  .scoreTips {
    text-align: center;
    color: #4dffec;
    font-size: 0.24rem;
    margin: 0.18rem 0 0.27rem 0;
  }
  .downTimebox {
    margin: 0 auto;
    width: 6.98rem;
    text-align: center;
    //background: url(../assets/img/timeBg.png);
    background-size: 100% 100%;
    position: relative;
    > p {
      width: 6.98rem;
      color: #fed463;
      font-size: 80%;
    }
    .timeDown {
      margin: 0.12rem auto 0;
      width: 5.14rem;
      height: 0.76rem;
      background: url(../assets/img/timeDown.png);
      background-size: 100% 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 0.26rem 0 0.15rem;
      > div {
        line-height: 0.76rem;
        display: inline-block;
        display: flex;
        strong {
          display: block;
          width: 0.7rem;
          height: 0.76rem;
          line-height: 0.76rem;
          color: #f6e2b6;
          font-size: 0.48rem;
          font-weight: 900;
        }
        em {
          color: #febaff;
          font-size: 0.24rem;
          margin: 0.08rem 0 0 0.15rem;
        }
      }
    }
    .noTime {
      line-height: 0.6rem;
    }
  }
  .dayList {
    .top3 {
      height: 3.54rem;
      padding: 0 0.69rem;
      position: relative;
      .topItem {
        width: 1.8rem;
        display: inline-block;
        position: absolute;
        &.rank1 {
          top: 0.38rem;
          left: 2.85rem;
        }
        &.rank2 {
          top: 1.05rem;
          left: 0.69rem;
        }
        &.rank3 {
          top: 1.05rem;
          right: 0.69rem;
        }
        .imgBox {
          width: 1.11rem;
          height: 1.25rem;
          margin: 0 auto;
          position: relative;
          .championTips {
            width: 1.11rem;
            height: 1.25rem;
            position: absolute;
            z-index: 11;
          }
          .userImg {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            position: absolute;
            top: 0.23rem;
            left: 0.05rem;
          }
        }
        .userMsg {
          .name {
            font-size: 0.26rem;
            text-align: center;
            max-width: 1.8rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-top: 0.05rem;
          }
        }
        .score {
          color: #ffcb9c;
          font-size: 80%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 0.12rem;
          font-weight: 600;
          i {
            display: block;
            width: 0.3rem;
            height: 0.26rem;
            background: url(../assets/img/hear.png);
            background-size: 100% 100%;
            margin-right: 0.11rem;
          }
          em {
            font-size: 0.29rem;
          }
        }
        .ticket {
          text-align: center;
          white-space: nowrap;
          font-size: 0.22rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          background: linear-gradient(
            0deg,
            rgba(247, 203, 107, 1) 0%,
            rgba(251, 169, 128, 1) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }
  }

  .list {
    margin: 0.19rem auto;
    width: 6.98rem;
    li {
      height: 1.15rem;
      margin-bottom: 0.09rem;
      background: url(../assets/img/topItemBg.png);
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      .rank {
        width: 0.84rem;
        height: 0.72rem;
        font-size: 0.36rem;
        font-style: italic;
        color: #451380;
        text-align: center;
        line-height: 0.72rem;
        margin-left: 0.13rem;
        font-weight: 700;
      }
      .uerImg {
        width: 1rem;
        height: 1rem;
        margin-left: 0.15rem;
        position: relative;
        .noble {
          width: 1.2rem;
          height: 1.22rem;
          position: absolute;
          left: -0.11rem;
          top: -0.1rem;
        }
        .vip {
          display: block;
          width: 0.42rem;
          height: 0.42rem;
          background: url(../assets/img/vip.png);
          background-size: 100% 100%;
          position: absolute;
          bottom: 0;
          right: 0;
        }
        .imgItem {
          width: 1rem;
          height: 1rem;
          box-sizing: border-box;
          border: 0.02rem solid rgba(83, 129, 247, 1);
          border-radius: 50%;
        }
      }
      .userMsg {
        width: 2.7rem;
        margin-left: 0.18rem;
        .name {
          display: flex;
          align-items: center;
          span {
            font-size: 0.26rem;
            max-width: 2.7rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .probability {
          color: #d9cafb;
          font-size: 0.22rem;
          em {
            font-size: 0.22rem;
            margin-left: 0.14rem;
            background: linear-gradient(
              0deg,
              rgba(254, 220, 69, 1) 0%,
              rgba(251, 112, 153, 1) 100%
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }
      .score {
        color: #f8d285;
        font-size: 80%;
        display: flex;
        align-items: center;
        margin-left: 0.15rem;
        font-weight: 600;
        i {
          display: block;
          width: 0.3rem;
          height: 0.26rem;
          background: url(../assets/img/hear.png);
          background-size: 100% 100%;
          margin-right: 0.11rem;
        }
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
          //background: url(../assets/img/hear.png);
          background-size: 100% 100%;
        }
      }
    }
  }
}
.dengdai,
.scrollLoading,
.scrollNone {
  text-align: center;
  margin-top: 0.25rem;
  font-size: 0.24rem;
  color: #ffefd7;
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
