<template>
  <div class="rankGroups">
    <div class="rankTitle1"></div>
    <!-- 日榜、总榜切换主Tabs -->
    <div class="mainTabs">
      <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" class="tabL">日榜</a>
      <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" class="tabR">總榜</a>
      <!-- <a @click.prevent="onRefresh" href="" v-if="!isShare && actStatus===1" :style="{transform:'rotate('+rotatePx+'deg)'}" id="refresh"></a> -->
    </div>
    <div class="timeBox">
      <div class="title"></div>
      <div class="actTime">
        <span>{{surplusTime.day}}</span>
        <em>天</em>
        <span>{{surplusTime.hour}}</span>
        <em>時</em>
        <span>{{surplusTime.minute}}</span>
        <em>分</em>
      </div>
    </div>
    <!-- 日榜 -->
    <div class="list day">
      <div class="top" v-if="top1.length > 0">
        <div class="title">
          <div class="light"></div>
          <div class="name"><i></i></div>
        </div>
        <div class="top1List">
          <div class="topItem" v-for="(item,index) in top1" :key="index" :class="'top' + item.rank">
            <div class="imgBox">
              <img :src="require(`../assets/img/no${item.rank}.png`)" alt="" class="avBg">
              <img :src="item.avatar" alt="" class="av">
            </div>
            <div class="nick">{{item.nick}}</div>
            <div class="score">{{item.score}}步</div>
          </div>
          <div class="topItem top3" v-if="top1.length == 2"></div>
        </div>
        <div class="bottomLiner" v-if="top2.length > 0">
          <div class="linerTop"></div>
        </div>
      </div>
      <div class="top2" v-if="top2.length > 0">
        <div class="title">
          <div class="light"></div>
          <div class="name"><i></i></div>
        </div>
        <div class="top2List">
          <ul>
            <li v-for="(item,index) in top2" :key="index">
              <span class="rank">{{item.rank}}</span>
              <img v-lazy="item.avatar" alt="" class="av">
              <div class="nick">{{item.nick}}</div>
              <div class="score">{{item.score}}步</div>
            </li>
          </ul>
        </div>
        <div class="bottomLiner" v-if="top3.length > 0">
          <div class="linerTop"></div>
        </div>
      </div>
      <div class="top3" v-if="top3.length > 0">
        <ul class="top3List">
          <li v-for="(item,index) in top3" :key="index">
            <span class="rank">{{item.rank}}</span>
            <img v-lazy="item.avatar" alt="" class="av">
            <div class="nick">{{item.nick}}</div>
            <div class="score">{{item.score}}步</div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 任務列表 -->
    <!-- <taskList v-else></taskList> -->
    <!-- 日榜和总榜共用Loading（如果需要细化加载提示文案，可以把以下标签复制到不同的榜单后面） -->
    <div v-if="rank.loading" class="scrollLoading">加載中...</div>
    <div v-if="rank.none" class="scrollNone">
      暫無歌友上榜
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import getUrlString from '../utils/getString.js';
import APP from "../utils/openApp"
import api from "../api/apiConfig"
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
  data() {
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
    // inited() {
    //   this.$nextTick(() => {
    //     if (!this.rank.loadCount) {
    //       this.onScroll();
    //     }
    //   })
    // },
    // second(val) {
    //   this.downTimeGo('time' + this.rankKey, val)
    // }
  },
  computed: {
    ...mapState(['rankGroups', "isShare", "actStatus", "inited", "second", "total", "day"]),
    rankKey() {
      // return ['one', 'two', 'three'][this.tab];
      return this.mainTab == 1 ? 'total' : this.mainTab;
    },
    rankApi() {
      if (this.isShare) {
        var dayApi = `/index.php?action=richMan.rank&type={type}&signture=innerserver`;
        return dayApi.replace('{type}', this.rankKey == 'total' ? 2 : 1)
      } else {
        var dayApi = `/index.php?action=richMan.rank&type={type}&signture=innerserver&uid={uid}&token={token}`;
        const token = getUrlString('token') || '';
        const uid = getUrlString('uid') || '';
        return dayApi.replace('{type}', this.rankKey == 'total' ? 2 : 1).replace('{uid}', uid).replace('{token}', token);
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
    top1() {
      if (this.rank.list.length) {
        return this.rank.list.slice(0, 3)
      }
      return []
    },
    top2() {
      if (this.rank.list.length) {
        return this.rank.list.slice(3, 10)
      }
      return []
    },
    top3() {
      if (this.rank.list.length) {
        return this.rank.list.slice(10)
      }
      return []
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
      this.$store.commit("changTab", this.rankKey)
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      })
    },
    // tabClick(tab) { //日榜切换
    //   this.tab = tab;
    //   var nowTab = this.rankKey >= this.nowDay ? this.nowDay : this.rankKey //存当天选择的tab索引用于底部个人信息查找
    //   this.$store.commit("changTab", nowTab)
    //   this.$nextTick(() => {
    //     if (!this.rank.loadCount) {
    //       this.onScroll();
    //     }
    //   });
    // },
    onScroll() {
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
          setTimeout(() => {
            set('loading', true);
            axios.get(this.rankApi.replace('{from}', this.rank.list.length)).then(res => {
              set('loading', false);

              const { response_status, response_data } = res.data;

              if (response_status.code != 0) {
                set('loadEnd', true);
                return;
              }
              // if (this.tab >= this.nowDay && this.mainTab == 0) {
              if (this.rankKey == 'total') {
                set('second', this.total.dtime)
              } else {
                set('second', this.day.dtime)
              }
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
          }, 500)

        }
      }
    },
    onRefresh() {
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
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
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
  position: relative;
  // background: #f8ffe6 url(../assets/img/listBg.png) no-repeat;
  background-size: 100% auto;
  margin: 0.37rem auto;
  padding-bottom: 2rem;
  .rankTitle1 {
    width: 4.4rem;
    height: 1rem;
    background: url(../assets/img/rankTitle1.png);
    background-size: 100% 100%;
    margin: 0 auto;
  }
  .mainTabs {
    display: flex;
    width: 6.8rem;
    height: 0.88rem;
    background: url(../assets/img/tabBg.png);
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    .tabL {
      &.current {
        color: #fff;
        background: url(../assets/img/Switch_l.png);
        background-size: 100% 100%;
      }
    }
    .tabR {
      &.current {
        color: #fff;
        background: url(../assets/img/Switch_r.png);
        background-size: 100% 100%;
      }
    }

    a {
      flex: 1;
      height: 100%;
      text-align: center;
      line-height: 0.88rem;
      color: RGBA(164, 128, 200, 1);
    }
  }
  .timeBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title {
      width: 3.76rem;
      height: 0.75rem;
      background: url(../assets/img/title_02.png);
      background-size: 100% 100%;
      margin-top: 0.5rem;
    }
    .actTime {
      display: flex;
      align-items: center;
      span {
        width: 0.72rem;
        height: 0.72rem;
        text-align: center;
        line-height: 0.72rem;
        font-size: 0.48rem;
        font-weight: 600;
        background: RGBA(75, 59, 104, 1);
        border-radius: 0.1rem;
      }
      em {
        font-size: 0.22rem;
        margin: 0.3rem 0.15rem 0 0.15rem;
      }
    }
  }
  .list {
    margin: 0.3rem auto;
    position: relative;
    z-index: 10;
    .top {
      width: 7.5rem;
      height: 8.44rem;
      background: url(../assets/img/frame.png);
      background-size: 100% 100%;
      position: relative;
      .title {
        .light {
          width: 7.06rem;
          height: 1.2rem;
          background: url(../assets/img/light.png);
          background-size: 100% 100%;
          position: absolute;
          left: 0.22rem;
        }
        .name {
          width: 3.2rem;
          height: 1.12rem;
          background: url(../assets/img/plaque_01.png);
          background-size: 100% 100%;
          position: absolute;
          left: 2.15rem;
          z-index: 10;
          i {
            display: block;
            width: 3.2rem;
            height: 1.12rem;
            background: url(../assets/img/Rank_01.png);
            background-size: 100% 100%;
          }
        }
      }
      .top1List {
        display: flex;
        flex-wrap: wrap;
        padding-top: 1.7rem;
        .topItem {
          display: inline-block;
          margin: 0 auto;
          .nick {
            text-align: center;
            margin: 0.06rem 0 0.03rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .score {
            text-align: center;
            font-size: 0.26rem;
            color: RGBA(183, 174, 213, 1);
          }
          &.top1 {
            width: 6rem;
            .imgBox {
              width: 3.54rem;
              height: 2.21rem;
              position: relative;
              margin: 0 auto;
              .avBg {
                width: 3.54rem;
                height: 2.21rem;
                position: absolute;
                z-index: 2;
              }
              .av {
                width: 1.6rem;
                height: 1.6rem;
                border-radius: 50%;
                position: absolute;
                left: 0.9rem;
                top: 0.5rem;
              }
            }
          }
          &.top2,
          &.top3 {
            width: 1.8rem;
            .imgBox {
              width: 1.8rem;
              height: 1.56rem;
              position: relative;
              .avBg {
                width: 1.8rem;
                height: 1.56rem;
                position: absolute;
                z-index: 2;
              }
              .av {
                width: 1.16rem;
                height: 1.16rem;
                border-radius: 50%;
                position: absolute;
                left: 0.32rem;
                top: 0.33rem;
              }
            }
          }
        }
      }
    }
    .top2 {
      margin-top: 1.2rem;
      position: relative;
      .title {
        position: absolute;
        top: -1rem;
        .light {
          width: 7.06rem;
          height: 1.2rem;
          background: url(../assets/img/light.png);
          background-size: 100% 100%;
          position: absolute;
          left: 0.22rem;
        }
        .name {
          width: 3.2rem;
          height: 1.12rem;
          background: url(../assets/img/plaque_02.png);
          background-size: 100% 100%;
          position: absolute;
          left: 2.15rem;
          z-index: 10;
          i {
            display: block;
            width: 3.2rem;
            height: 1.12rem;
            background: url(../assets/img/Rank_02.png);
            background-size: 100% 100%;
          }
        }
      }
      .top2List {
        width: 6.84rem;
        margin: 0 auto;
        background: linear-gradient(90deg, #7c34ff, #d640fc);
        border-radius: 0.1rem;
        padding: 0.2rem 0 0.2rem;
        ul {
          width: 6.52rem;
          border: 0.03rem solid RGBA(42, 15, 91, 1);
          margin: 0 auto;
          border-radius: 0.08rem;
          li {
            height: 1.24rem;
            border-radius: 0.02rem;
            border-bottom: 0.03rem solid RGBA(42, 15, 91, 1);
            display: flex;
            align-items: center;
            .rank {
              width: 0.8rem;
              text-align: center;
              font-size: 0.24rem;
            }
            .av {
              width: 0.88rem;
              height: 0.88rem;
              border-radius: 50%;
            }
            .nick {
              width: 3rem;
              max-width: 3rem;
              font-size: 0.28rem;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              margin-left: 0.2rem;
            }
            .score {
              color: RGBA(237, 178, 254, 1);
              font-size: 0.24rem;
              margin-left: 0.6rem;
            }
          }
          li:last-child {
            border-bottom: none;
          }
        }
      }
      .bottomLiner {
        height: 0.7rem;
        bottom: -0.6rem;
      }
    }
    .top3 {
      margin-top: 0.58rem;
      .top3List {
        width: 6.44rem;
        padding: 0 0.2rem;
        margin: 0 auto;
        background: linear-gradient(90deg, #7c34ff, #d640fc);
        border-radius: 0 0 0.1rem 0.1rem;
        padding: 0.2rem 0.2rem 0.2rem;
        li {
          height: 1.24rem;
          border-radius: 0.02rem;
          display: flex;
          align-items: center;
          background: RGBA(42, 15, 91, 1);
          position: relative;
          .rank {
            width: 0.8rem;
            text-align: center;
            font-size: 0.24rem;
          }
          .av {
            width: 0.88rem;
            height: 0.88rem;
            border-radius: 50%;
          }
          .nick {
            width: 3rem;
            max-width: 3rem;
            font-size: 0.28rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-left: 0.2rem;
          }
          .score {
            color: RGBA(237, 178, 254, 1);
            font-size: 0.24rem;
            margin-left: 0.6rem;
            color: RGBA(170, 159, 189, 1);
          }
        }
        li::before {
          content: "";
          width: 5.18rem;
          height: 1px;
          position: absolute;
          bottom: 0;
          right: 0.4rem;
          background: linear-gradient(90deg, #7c34ff, #d640fc);
        }
        li:last-child {
          border-radius: 0 0 0.1rem 0.1rem;
        }
        li:first-child {
          border-radius: 0.1rem 0.1rem 0 0;
        }
      }
    }
    .bottomLiner {
      width: 6.84rem;
      height: 1.49rem;
      background: url(../assets/img/Rod.png);
      background-size: 100% 100%;
      position: absolute;
      bottom: -1.2rem;
      left: 0.33rem;
      z-index: -1;
      .linerTop {
        width: 6.84rem;
        height: 0.2rem;
        margin: 0 auto;
        background: url(../assets/img/frame_top.png);
        background-size: 100% auto;
        position: absolute;
        bottom: 0;
      }
    }
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
