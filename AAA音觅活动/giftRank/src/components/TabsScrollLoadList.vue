<template>
  <div class="rankGroups">
    <div class="timeDown" v-if="!surplusTime.end">
      <div class="day">
        <strong>{{surplusTime.day}}</strong>

      </div>
      <div class="hours">
        <strong>{{surplusTime.hour}}</strong>

      </div>
      <div class="min">
        <strong>{{surplusTime.minute}}</strong>

      </div>
      <div class="second">
        <strong>{{surplusTime.second}}</strong>

      </div>
    </div>
    <!-- 日榜、总榜切换主Tabs -->
    <div class="mainTabs" :class="{current:mainTab==1}">
      <div @click.prevent="mainTabClick(0)" class="tab" :class="{act:mainTab==0}">
        <div class="imgBox">
          <img :src="require('../assets/img/gift/tab1.png')" alt="">
        </div>
        <strong>{{lang.tab1}}</strong>
      </div>
      <div @click.prevent="mainTabClick(1)" class="tab" :class="{act:mainTab==1}">
        <div class="imgBox">
          <img :src="require('../assets/img/gift/tab2.png')" alt="">
        </div>
        <strong>{{lang.tab2}}</strong>
      </div>
      <a @click.prevent="onRefresh" href="" v-if="!isShare && actStatus===1" :style="{transform:'rotate('+rotatePx+'deg)'}" id="refresh"></a>
    </div>

    <!-- 日榜 -->
    <div class="list day">
      <div class="rankHeader">
        <span class="rank">{{lang.rank}}</span>
        <span class="nick">{{lang.nick}}</span>
        <span class="rankScore"><i></i> <em>{{mainTab == 0?lang.tabScore1:lang.tabScore2}}</em> </span>
      </div>
      <!-- <div class="top1" v-if="top1.uid">
        <div class="top1Rank">
          <div class="imgBox" @click="goUser(top1.uid)">
            <img src="../assets/img/top1.png" alt="" class="top1Tips">
            <img v-lazy="top1.avatar" alt="" class="top1Avatar">
          </div>
          <div class="userMsg">
            <div class="nick">{{top1.nick}}</div>
            <div class="score" v-if="top1.medals">
              <img :src="item2" alt="" v-for="(item2,index2) in top1.medals" :key="index2">
            </div>
          </div>
        </div>
        <div class="top1Score">
          <strong>收到禮物個數</strong>
          <em>{{top1.score}}</em>
        </div>
      </div> -->
      <ul>
        <li v-for="(item,index) in surplusArr" :key="index" :class="'rank'+item.rank" @click="goUser(item.uid)">
          <div class="rank">{{item.rank}}</div>
          <img v-lazy="item.avatar" alt="" class="av">
          <div class="nick">{{item.nick}}</div>
          <div class="medals">
            <img v-for="(item2,index2) in item.medals" :src="item2" :key="index2" alt="">
          </div>
          <div class="score">
            <!-- <strong>收到禮物個數</strong> -->
            <em>{{item.score}}</em>
          </div>
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
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import getUrlString from '../utils/getString.js';
import downTime from '../utils/downTime.js'
import APP from "../utils/openApp"
import api from "../api/apiConfig"
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
      firstTask: true,
      surplusTime: {},
    }
  },
  watch: {
    inited () {
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      })
    }
  },
  computed: {
    ...mapState(['rankGroups', "isShare", "actStatus", "gifts", "inited"]),
    rankKey () {
      // return ['one', 'two', 'three'][this.tab];
      return this.mainTab == 1 ? 'total' : this.mainTab;
    },
    rankApi () {
      // if (this.isShare) {
      //   var dayApi = `/happy_fly_car/rank.php?from={from}&date={date}`;
      //   var totalApi = `/happy_fly_car/rank.php?from={from}&date=0`;
      //   var api = this.rankKey == 'total' ? totalApi : dayApi;
      //   return api.replace('{date}', this.getDate(this.dateArr[this.tab - 1]))
      // } else {
      var dayApi = `/index.php?action=luckyRank.rank&type=1&from={from}&signture=innerserver&uid={uid}&token={token}`;
      var totalApi = `/index.php?action=luckyRank.rank&type=2&from={from}&signture=innerserver&uid={uid}&token={token}`;
      var api = this.rankKey == 'total' ? totalApi : dayApi;
      const token = getUrlString('token') || '';
      const uid = getUrlString('uid') || '';
      return api.replace('{uid}', uid).replace('{token}', token);
      //}
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
    top1 () {
      if (this.rank.list.length) {
        return this.rank.list[0]
      }
      return {}
    },
    surplusArr () {
      if (this.rank.list.length) {
        return this.rank.list.slice(0)
      }
      return []
    }
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
    onScroll () {
      if (this.inited === 0) { //初始化是少一次請求,是日榜的时候和不是总榜的时候返回
        return
      }
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
            // if (response_data.owner_msg && response_data.owner_msg.uid) {
            //   this.$store.commit("changGroupsUserMsg", {//初始当前日榜个人信息
            //     key: this.rankKey,
            //     msg: response_data.owner_msg
            //   })
            // }
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
      var u = navigator.userAgent;
      var isiOS = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i); //ios终端
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
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

<style lang="scss">
.rankGroups {
  width: 6.88rem;
  padding: 0.83rem 0 2rem;
  position: relative;
  background: #0438DA url(../assets/img/listBg.png) no-repeat;
  background-size: 100% auto;
  margin: 0.37rem auto;
  > li {
    padding: 0.5rem 0;
  }
  .mainTabs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.1rem;
    height: 3rem;
    .tab {
      .imgBox {
        width: 1.7rem;
        height: 1.7rem;
        background: url(../assets/img/giftImgBox.png) no-repeat;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 1.4rem;
          height: 1.4rem;
        }
      }
      strong {
        display: block;
        text-align: center;
        color: #1494E0;
        font-size: 0.26rem;
      }
      &.act {
        .imgBox {
          width: 2.15rem;
          height: 2.15rem;
        }
      }
    }
  }
  .list {
    margin: 0.3rem auto;
    position: relative;
    z-index: 10;
    .rankHeader {
      display: flex;
      align-items: center;
      color: #299BE3;
      font-size: 0.18rem;
      padding: 0 0.23rem;
      text-align: center;
      margin-bottom: 0.06rem;
      .rank {
        width: 1.1rem;
      }
      .nick {
        width: 2.2rem;
      }
      .rankScore {
        margin-left: 1.4rem;
        flex: 1;
        display: flex;
        align-items: center;
        em {
          font-size: 0.18rem;
        }
        i {
          width: 0.33rem;
          height: 0.33rem;
          background: url(../assets/img/scoreIcon.png);
          background-size: 100% 100%;
        }
      }
    }
    .top1 {
      height: 3.17rem;
      margin-bottom: 0.11rem;
      display: flex;
      justify-content: center;
      position: relative;
      .top1Rank {
        width: 2.76rem;
        height: 100%;
        position: relative;
        .imgBox {
          width: 2.73rem;
          height: 2.3rem;
          position: relative;
          .top1Tips {
            width: 2.04rem;
            height: 2.04rem;
            position: absolute;
            left: 0.35rem;
            top: 0;
            z-index: 2;
          }
          .top1Avatar {
            width: 2.04rem;
            height: 2.04rem;
            border-radius: 50%;
            position: absolute;
            left: 0.35rem;
            top: 0;
          }
        }
        .userMsg {
          display: flex;
          justify-content: center;
          align-items: center;
          color: rgba(255, 81, 57, 1);
          .nick {
            max-width: 2rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-weight: 800;
            color: rgba(255, 81, 57, 1);
          }
          .score {
            margin-left: 0.28rem;
            font-weight: 800;
            img {
              width: 0.34rem;
              height: 0.34rem;
            }
          }
        }
      }
      .top1Score {
        width: 1.8rem;
        height: 3rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 0.4rem;
        strong {
          display: block;
          color: rgba(255, 81, 57, 1);
          font-size: 0.24rem;
          font-weight: 500;
        }
        em {
          display: block;
          font-size: 0.72rem;
          color: rgba(255, 81, 57, 1);
          font-weight: 800;
        }
      }
    }
    li {
      width: 6.44rem;
      height: 0.94rem;
      margin: 0 auto 0.12rem;
      display: flex;
      align-items: center;
      background: url(../assets/img/topItem.png);
      background-size: 100% 100%;
      .rank {
        width: 1.12rem;
        line-height: 0.94rem;
        color: rgba(255, 239, 230, 1);
        text-align: center;
        font-weight: bold;
        font-size: 0.42rem;
      }
      .av {
        width: 0.65rem;
        height: 0.65rem;
        border: 0.02rem solid #f8fc6a;
        border-radius: 50%;
      }
      .nick {
        width: 1.7rem;
        max-width: 1.7rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight: bold;
        margin-left: 0.15rem;
      }
      .medals {
        width: 1rem;
        height: 0.35rem;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 0.34rem;
          //   height: 0.34rem;
        }
      }
      .score {
        flex: 1;
        margin-left: 0.15rem;
        strong {
          display: block;
          font-size: 0.18rem;
          font-weight: bold;
        }
        em {
          display: block;
          font-size: 0.26rem;
          font-weight: 500;
          text-align: center;
        }
      }
      &.rank1 {
        background: url(../assets/img/top1.png);
        background-size: 100% 100%;
        .rank {
          text-indent: -999rem;
        }
      }
      &.rank2 {
        background: url(../assets/img/top2.png);
        background-size: 100% 100%;
        .rank {
          text-indent: -999rem;
        }
      }
      &.rank3 {
        background: url(../assets/img/top3.png);
        background-size: 100% 100%;
        .rank {
          text-indent: -999rem;
        }
      }
    }
  }
}
.timeDown {
  width: 4.3rem;
  height: 0.53rem;
  margin: 0.17rem auto 0;
  display: flex;
  background: url(../assets/img/downTime.png);
  background-size: 100% 100%;
  > div {
    height: 100%;
    line-height: 0.6rem;
    display: flex;
    align-items: center;
    strong {
      display: block;
      width: 0.9rem;
      height: 0.42rem;
      line-height: 0.42rem;
      letter-spacing: 0.32rem;
      text-indent: 0.1rem;
      color: #FFFFFF;
    }
  }
  .hours,
  .second {
    margin-left: 0.23rem;
    text-align: center;
  }
  .min {
    margin-left: 0.24rem;
  }
  .second {
    margin-left: 0.25rem;
  }
}
.dengdai {
  text-align: center;
}
.scrollLoading {
  text-align: center;
  color: #fff;
  font-size: 80%;
}
.scrollNone {
  text-align: center;
  color: #fff;
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
