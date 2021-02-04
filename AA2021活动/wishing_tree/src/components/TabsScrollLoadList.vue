<template>
  <div class="rankGroups">
    <!-- 日榜、总榜切换主Tabs -->
    <div class="mainTabs">
      <div class="tabs">
        <a class="tab1" @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" href="">{{lang.dayTab}}</a>
        <a class="tab2" @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" href="">{{lang.allTab}}</a>
      </div>
      <a @click.prevent="onRefresh" href="" :style="{transform:'rotate('+rotatePx+'deg)'}" id="refresh" v-if="step == 1">刷新</a>
    </div>
    <DayTabs :tab="tab" @changeClick="tabClick" v-if="mainTab == 0" />
    <div class="dayGift" v-if="mainTab == 0">
      <div class="giftTips" v-html="lang.giftTips"></div>
      <img src="../img/dayGift.png" alt="">
      <div class="giftName">
        {{lang.giftName}}
      </div>
    </div>
    <!-- 倒計時 -->
    <div class="downTimeBox2" v-if="mainTab == 1">
      <!-- <div v-if="mainTab == 0">
        <p v-if="tab == c_day">今日日榜結束倒計時</p>
        <p v-else-if="tab > c_day">今日日榜開始倒計時</p>
        <div class="noTime" v-else>今日日榜已結束</div>
      </div> -->
      <div>
        <p v-if="step == 0">{{lang.downTimeStart}}</p>
        <p v-else-if="step == 1">{{lang.downTimeEnd}}</p>
        <div class="noTime" v-else>{{lang.downTimeEd}}</div>
      </div>
      <div class="timeDown" v-if="surplusTime&& !surplusTime.end">
        <div class="day">
          <strong>{{surplusTime.day}}</strong>
          <em>{{lang.day}}</em>
        </div>
        <div class="hours">
          <strong>{{surplusTime.hour}}</strong>
          <em>{{lang.hour}}</em>
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
      <p class="timeTips" v-html="lang.timeTips"></p>
    </div>

    <!-- 总榜 -->
    <div class="rankList">
      <ul class="list day">
        <li v-for="(item,index) in rank.list" :key="index" :class="'rank' +item.rank">
          <div class="rank">{{item.rank}}</div>
          <div class="imgBox" @click="goUser(item.uid)">
            <img v-if="item.avatar_frame &&item.avatar_frame != ''" :src="item.avatar_frame" class="frame" alt="">
            <!-- <img src="../assets/img/testFrame.png" class="frame" alt=""> -->
            <img v-else-if="item.noble > 0" :src="require(`../img/nob/${item.noble}.png`)" class="nob" alt="">
            <img v-lazy="item.avatar" alt="" class="av">
          </div>
          <div class="msg">
            <div class="nick">{{item.nick}}</div>
            <div class="add">UID:{{item.uid}}</div>
          </div>
          <div class="score">
            <div class="lv"><i></i><em class="lvScore">{{item.score}}</em> </div>
          </div>
        </li>
      </ul>

      <!-- 日榜和总榜共用Loading（如果需要细化加载提示文案，可以把以下标签复制到不同的榜单后面） -->
      <div class="listTipsBox" v-if="rank.loading|| rank.none">
        <div v-if="rank.loading" class="scrollLoading">{{lang.loading}}</div>
        <div v-if="rank.none " class="scrollNone">
          {{lang.noData}}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import { getUrlString } from '../utils';
import APP from "../utils/openApp"
// import api from "../apis"
import getDate from "../utils/getDate"
import DayTabs from "./DayTabs"
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
    c_day(val) {
      this.tab = val
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      });
    },
    down_second(val) {
      this.downTimeGo('time1', val)
    }
  },
  computed: {
    ...mapState(['rankGroups', "setInited", "isShare", "step", "c_day", "inited", "dateArr", "down_second"]),
    rankKey() {
      return this.mainTab == 1 ? 'total' : this.tab;
    },
    rankApi() {
      if (this.isShare) {
        var dayApi = `/wishing_tree/allList.php?time={day}&from={from}`;
        var totalApi = `/wishing_tree/allList.php?from={from}`;
        var api = this.rankKey == 'total' ? totalApi : dayApi;
        return api.replace('{day}', this.dateArr[this.tab - 1]).replace('{type}', this.showType);
      } else {
        var dayApi = `/wishing_tree/allList.php?token={token}&time={day}&from={from}`;
        var totalApi = `/wishing_tree/allList.php?token={token}&from={from}`;
        var api = this.rankKey == 'total' ? totalApi : dayApi;
        const token = getUrlString('token') || '';

        return api.replace('{day}', getDate(new Date(this.dateArr[this.tab - 1] * 1000), 4)).replace('{token}', token)
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
      // this.downTimeGo('time' + this.rankKey, rankConf.second)
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
      this.vxc('changTab', this.rankKey)
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      });
    },
    tabClick(tab) { //日榜切换
      this.tab = tab;
      // var nowTab = this.rankKey >= this.c_day ? this.c_day : this.rankKey //存当天选择的tab索引用于底部个人信息查找
      this.vxc("changTab", this.rankKey)
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      });
    },
    onScroll() {
      if (this.inited === 0) { //初始化是少一次請求,是日榜的时候和不是总榜的时候返回
        return
      }
      if (!this.rank.loading && !this.rank.loadEnd) {

        const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100;
        const notFull = document.body.scrollHeight < window.innerHeigh;
        if (scrollToBottom || notFull || !this.rank.loadCount) {
          const mainTab = this.mainTab
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
            //个人信息
            if (response_data.myrank) {
              this.vxc("changGroupsUserMsg", {//初始当前日榜个人信息
                key: this.rankKey,
                msg: response_data.myrank
              })
            }

            //倒计时
            set('second', response_data.load)
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
      this.$parent.init('ref')
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
    getDate(time, type) {
      if (type == 1) {
        return getDate(new Date(time * 1000), type)
      }
      return this.secondToTimeStr(time)
    },
    goUser(uid) { //跳转
      location.href = `uid:${uid}`
    },
    goSong(sid) {
      location.href = 'songid:{"songlist":[' + sid + '],"index":0}';
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.onScroll);
    },
    secondToTimeStr(t) {
      if (!t) return;
      if (t < 60) return ((i = t) < 10 ? "0" + i : i) + 's';
      if (t < 3600) return "" + ((a = parseInt(t / 60)) < 10 ? "0" + a : a) + "min" + ((i = t % 60) < 10 ? "0" + i : i) + 's';
      if (3600 <= t) {
        var a, i, e = parseInt(t / 3600);
        return (e < 10 ? "0" + e : e) + "h" + ((a = parseInt(t % 3600 / 60)) < 10 ? "0" + a : a) + "min";
      }
    },
    downTimeGo(timeName, val) {
      console.log(timeName, val)
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
  padding: 0.24rem 0 1.5rem;
  position: relative;
  .mainTabs {
    margin: 0 auto;
    position: relative;
    .tabs {
      width: 7.18rem;
      height: 0.88rem;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      background: url(../img/tabs.png);
      background-size: 100% 100%;
      a {
        display: block;
        width: 3.56rem;
        height: 100%;
        text-align: center;
        line-height: 0.9rem;
        font-size: 0.32rem;
        color: rgba(255, 245, 219, 1);
        transition: all 0.1s linear;
        &.current {
          color: rgba(145, 77, 68, 1);
          background: url(../img/tab_act.png);
          background-size: 100% 100%;
        }
      }
    }
  }
  .dayGift {
    width: 6.44rem;
    height: 2.83rem;
    background: rgba(193, 58, 65, 0.2);
    border-radius: 0.2rem;
    margin: 0.25rem auto 0;
    padding-top: 0.22rem;
    .giftTips {
      color: rgba(255, 255, 255, 1);
      font-size: 0.22rem;
      text-align: center;
    }
    > img {
      display: block;
      width: 1.25rem;
      height: 1.25rem;
      margin: 0.18rem auto 0;
    }
    .giftName {
      text-align: center;
      margin: 0.15rem auto 0;
      font-size: 0.24rem;
      color: #fff;
    }
  }
  .rankTips {
    .giftTips {
      > p {
        text-align: center;
        font-size: 0.28rem;
        line-height: 0.4rem;
        margin: 0.1rem 0;
      }
      .giftItem {
        padding: 0 0.2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .item {
          .imgBox {
            width: 1.6rem;
            height: 1.6rem;
            // background: url(../assets/img/box/giftItemBg.png);
            // background-size: 100% 100%;
            position: relative;
            img {
              width: 100%;
              height: 100%;
            }
            .boxIcon {
              display: block;
              width: 1.24rem;
              height: 0.34rem;
              // background: url(../assets/img/rank/boxIcon.png);
              // background-size: 100% 100%;
              position: absolute;
              left: 0.18rem;
            }
          }
          strong {
            font-size: 0.26rem;
            display: block;
            text-align: center;
          }
        }
      }
    }
  }
  .rankList {
    width: 7.17rem;
    border-radius: 0.2rem;
    margin: 0.1rem auto;
    padding-top: 0.05rem;
    .list {
      width: 7.17rem;
      margin: 0 auto;
      &.total {
        .rank {
          width: 0.4rem;
        }
        .av {
          width: 0.88rem;
          height: 0.88rem;
          border-radius: 0.1rem;
          margin: 0 0.12rem;
        }
        .songMsg {
          width: 1.65rem;
          white-space: nowrap;
          .nick {
            font-size: 0.26rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .tm {
            font-size: 0.24rem;
            opacity: 0.5;
            margin-top: 0.15rem;
          }
        }
        .bar {
          width: 1.65rem;
          height: 0.29rem;
          background: #dddddd;
          border-radius: 0.17rem;
          text-align: center;
          line-height: 0.33rem;
          color: rgba(96, 37, 0, 1);
          position: relative;
          strong {
            font-size: 0.22rem;
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: 1;
          }
          .actBar {
            display: block;
            max-width: 100%;
            height: 0.29rem;
            background: linear-gradient(90deg, #ffc875, #ffdda4);
            border-radius: 0.17rem 0 0 0.17rem;
            text-align: center;
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            &.max {
              border-radius: 0.17rem;
            }
            &.min {
              min-width: 7%;
            }
            &.black {
              background: #666666;
            }
          }
        }
        .status {
          flex: 1;
          display: flex;
          // justify-content: flex-end;
          align-items: flex-end;
          flex-direction: column;
          strong {
            display: block;
            font-size: 0.24rem;
            white-space: nowrap;
          }
          span {
            white-space: nowrap;
            font-size: 0.2rem;
            opacity: 0.5;
          }
        }
      }
      li {
        height: 1.35rem;
        display: flex;
        align-items: center;
        position: relative;
        padding: 0 0.3rem;
        margin-bottom: 0.04rem;
        background: url(../img/top_rank.png);
        background-size: 100% 100%;
        .rank {
          width: 0.76rem;
          height: 0.65rem;
          text-align: center;
          line-height: 0.65rem;
          font-size: 0.32rem;
        }
        .imgBox {
          width: 1.1rem;
          height: 1.1rem;
          position: relative;
          margin: 0 0.18rem;
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
            border: 0.04rem solid rgba(247, 224, 160, 1);
            box-sizing: border-box;
            top: 0.1rem;
            left: 0.11rem;
            border-radius: 50%;
            position: absolute;
          }
        }
        .msg {
          width: 1.8rem;
          .nick {
            font-size: 0.28rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .add {
            color: rgba(255, 119, 132, 1);
            font-size: 0.24rem;
            margin-top: 0.15rem;
            white-space: nowrap;
          }
        }
        .score {
          flex: 1;
          width: 2.58rem;
          .lv {
            display: flex;
            align-items: center;
            justify-content: center;
            i {
              width: 0.41rem;
              height: 0.42rem;
              background: url(../img/gift_icon.png);
              background-size: 100% 100%;
              margin-right: 0.15rem;
            }
            em {
              font-size: 0.24rem;
              color: rgba(249, 121, 145, 1);
              font-weight: bold;
            }
          }
          .iconScore {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            font-size: 0.26rem;
            margin-top: 0.15rem;
            white-space: nowrap;
            > span {
              font-size: 0.26rem;
              // display: flex;
              // align-items: center;
              // justify-content: center;
              // i {
              //   width: 0.36rem;
              //   height: 0.36rem;
              //   margin-right: 0.05rem;
              // }
              // .sIcon1 {
              //   background: url(../assets/img/rank/sIcon1.png);
              //   background-size: 100% 100%;
              // }
              // .sIcon2 {
              //   background: url(../assets/img/rank/sIcon2.png);
              //   background-size: 100% 100%;
              // }
            }
            .luck_ed {
              width: 0.64rem;
              height: 0.32rem;
              background: linear-gradient(90deg, #ff4571 0%, #ff67b2 100%);
              border-radius: 0.16rem;
              font-size: 0.21rem;
              margin-left: 0.1rem;
              text-align: center;
              line-height: 0.32rem;
            }
          }
        }
        &.rank1 {
          background: url(../img/top3_rank.png);
          background-size: 100% 100%;
          .rank {
            text-indent: -999rem;
            background: url(../img/top1.png);
            background-size: 100% 100%;
          }
        }
        &.rank2 {
          background: url(../img/top3_rank.png);
          background-size: 100% 100%;
          .rank {
            text-indent: -999rem;
            background: url(../img/top2.png);
            background-size: 100% 100%;
          }
        }
        &.rank3 {
          background: url(../img/top3_rank.png);
          background-size: 100% 100%;
          .rank {
            text-indent: -999rem;
            background: url(../img/top3.png);
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
        width: 6.56rem;
        height: 0.02rem;
        // background: url(../assets/img/xu.png);
        // background-size: 100% 100%;
        position: absolute;
        bottom: -0.03rem;
        left: 0.3rem;
        z-index: 10;
      }
    }
  }
}
.listTipsBox {
  width: 7.05rem;
  height: 1.13rem;
  margin: 0 auto;
  // background: url(../assets/img/listBg.png);
  // background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fef978;
  font-size: 0.24rem;
}
.img3 {
  display: block;
  width: 7.18rem;
  height: 2.13rem;
  margin: 0.15rem auto;
}
.downTimeBox2 {
  margin: 0.11rem auto 0;
  width: 6.98rem;
  text-align: center;
  position: relative;
  p {
    width: 6.98rem;
    color: rgba(255, 255, 255, 1);
    font-size: 0.32rem;
  }
  .timeDown {
    width: 5.15rem;
    padding: 0 0.09rem;
    margin: 0.17rem auto 0;
    display: flex;
    justify-content: space-between;
    > div {
      height: 100%;
      line-height: 0.6rem;
      display: flex;
      align-items: center;
      strong {
        display: block;
        text-align: center;
        width: 0.7rem;
        height: 0.7rem;
        line-height: 0.7rem;
        background: url(../img/time_bg.png);
        background-size: 100% 100%;
        color: rgba(145, 77, 68, 1);
        font-size: 0.36rem;
      }
      em {
        font-size: 0.24rem;
        margin: 0.05rem 0.05rem 0 0.2rem;
        color: rgba(255, 198, 212, 1);
      }
    }
  }
  .timeTips {
    font-size: 0.24rem;
    text-align: center;
    margin: 0.13rem auto 0;
  }
  .noTime {
    line-height: 0.6rem;
  }
}
.listBtn {
  width: 7.05rem;
  height: 0.59rem;
  // background: url(../assets/img/listBtn.png);
  // background-size: 100% 100%;
  margin: -0.05rem auto;
}
#refresh {
  display: block;
  width: 0.94rem;
  height: 0.94rem;
  position: fixed;
  right: 0.08rem;
  bottom: 1.55rem;
  background: url(../img/refresh.png) no-repeat;
  background-size: contain;
  transition: all 1s;
  text-indent: -999rem;
  z-index: 5000;
}
</style>
