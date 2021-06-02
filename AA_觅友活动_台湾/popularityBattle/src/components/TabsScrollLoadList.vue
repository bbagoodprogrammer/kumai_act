<template>
  <div class="rankGroups" :class="{ty_1:$parent.type == 1}">
    <!-- 日榜、总榜切换主Tabs -->
    <div class="mainTabs">
      <span @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" class="tabL"><i></i></span>
      <span @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" class="tabR"><i></i></span>
      <a @click.prevent="onRefresh" href="" :style="{transform:'rotate('+rotatePx+'deg)'}" id="refresh"></a>
    </div>
    <div class="userList">
      <div class="timeBox">
        <!-- <p v-if="rank.status == 0">當前階段結束倒計時</p>
        <p v-else-if="rank.status == 1">當前階段開始就倒計時</p> -->
        <p v-if="rank.status == 2">當前階段已結束</p>
        <div class="actTime" v-if="rank.status != 2">
          <span>{{surplusTime.day}}</span>
          <em>{{lang.day}}</em>
          <span>{{surplusTime.hour}}</span>
          <em>{{lang.houer}}</em>
          <span>{{surplusTime.minute}}</span>
          <em>{{lang.min}}</em>
          <span>{{surplusTime.second}}</span>
          <em>{{lang.second}}</em>
        </div>
      </div>
      <!-- 海选 -->
      <div v-if="mainTab == 0">
        <div class="listHeader">
          <span class="rank">{{lang.rank_listHeader1}}</span>
          <span class="img">{{lang.rank_listHeader2}}</span>
          <span class="nick">{{lang.rank_listHeader3}}</span>
          <span class="score">{{lang.rank_listHeader4}}</span>
        </div>
        <div class="list day">
          <ul>
            <li v-for="(item,index) in rank.list" :key="index" :class="[{danger:item.rank == 8 && rank.status == 1,eliminate:item.rank == 11 && rank.status == 2},'rank' + item.rank]">
              <div class="userRank">{{item.rank}}</div>
              <div class="imgBox">
                <img v-lazy="item.avatar" alt="" class="av1">
                <img v-lazy="item.fans[0].avatar" alt="" class="av2">
                <i class="live" v-if="item.mic_room">LIVE</i>
              </div>
              <div class="nick">{{item.nick}}</div>
              <div class="score">{{item.score}}</div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 决赛 -->
      <div v-if="mainTab == 1">
        <div class="listHeader">
          <span class="rank">{{lang.rank_listHeader1}}</span>
          <span class="img">{{lang.rank_listHeader5}}</span>
          <span class="score">{{lang.rank_listHeader4}}</span>
        </div>
        <div class="list totle">
          <ul>
            <li v-for="(item,index) in rank.list" :key="index" :class="[{danger:item.rank == 8 && rank.status == 1,eliminate:item.rank == 11 && rank.status == 2},'rank' + item.rank]">
              <div class="userRank">{{item.rank}}</div>
              <div class="imgBox">
                <img v-lazy="item.avatar" alt="" class="av1">
                <i class="live" v-if="item.mic_room">LIVE</i>
              </div>
              <div class="msg">
                <div class="userMsg">
                  <div class="nick">{{item.nick}}</div>
                  <div class="score">{{item.score}}</div>
                </div>
                <div class="userPeople">
                  <div class="peopleItem">
                    <img v-lazy="item2.avatar" alt="" v-for="(item2,index2) in item.fans" :key="index2">
                  </div>
                  <u @click="shouFriend(item,'final')">粉絲守護團>></u>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- 日榜和总榜共用Loading（如果需要细化加载提示文案，可以把以下标签复制到不同的榜单后面） -->
      <div v-if="rank.loading" class="scrollLoading">{{lang.loading}}</div>
      <div v-if="rank.none" class="scrollNone">
        {{lang.rank_noData}}
      </div>
    </div>
    <div class="mask" v-show="showFriendList">
      <transition name="slide">
        <div class="userPeopleList" v-if="showFriendList">
          <div class="list_title">【{{act_item.nick}}】的粉絲守護團</div>
          <div class="list_header">
            <span>排名</span>
            <span>用戶</span>
            <span>貢獻人氣值</span>
          </div>
          <ul>
            <li v-for="(item,index) in friendList" :key="index">
              <div class="userRank">{{item.rank}}</div>
              <img v-lazy="item.avatar" alt="">
              <div class="nick">{{item.nick}}</div>
              <div class="score">{{item.score}}</div>
            </li>
          </ul>
          <div class="fans_tips">
            *貢獻人氣值為粉絲對同一名主播所貢獻的人氣值總
            和，榜單顯示前20名
          </div>
          <div class="lookmsg" @click="goUser(act_item.uid)">
            查看他人資料頁
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import { getUrlString } from '../utils';
import downTime from "../utils/downTime"
import { userFriend } from "../apis"
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
      showFriendList: false,
      friendList: [],
      act_item: {}
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
  },
  computed: {
    ...mapState(['rankGroups', "isShare", "actStatus", "inited", "second", "total", "day", "first"]),
    rankKey () {
      // return ['one', 'two', 'three'][this.tab];
      return this.mainTab == 1 ? 'total' : this.mainTab;
    },
    rankApi () {
      var dayApi = `/index.php?action=popularityBattle.init&uid={uid}&token={token}`;
      var totalApi = `/index.php?action=popularityBattle.final&uid={uid}&token={token}`;
      const token = getUrlString('token') || '';
      const uid = getUrlString('uid') || '';
      const api = this.mainTab == 1 ? totalApi : dayApi
      return api.replace('{uid}', uid).replace('{token}', token);
    },
    rankSize () {
      // 如果明确服务器每次返回的列表长度，请返回具体的数值，有助于减少一次额外请求即可确定加载完所有数据
      return 20;
    },
    rank () {
      const rankConf = this.rankGroups[this.rankKey] || {};
      rankConf.list = rankConf.list || [];
      if (rankConf.second && rankConf.second > 0) {
        this.downTimeGo('time' + this.rankKey, rankConf.second)
      }
      return rankConf;
    },
    top3 () {
      if (this.rank) {
        return this.rank.list.slice(0, 3)
      }
      return []
    },
    otherRank () {
      if (this.rank) {
        return this.rank.list.slice(3)
      }
      return []
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
      this.$store.commit("changTab", this.rankKey)
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      })
    },
    onScroll () {
      // if (this.tab > this.nowDay) return (this.tab > this.nowDay && this.rankKey !== 'total') || 
      if (!this.rank.loading && !this.rank.loadEnd) {
        const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100;
        const notFull = document.body.scrollHeight < window.innerHeigh;
        if (scrollToBottom || notFull || !this.rank.loadCount) {
          const key = this.rankKey;
          const set = (k, v) => {
            this.$store.commit('updateRankGroups', { key, [k]: v });
          };
          set('loading', true);
          axios.get(this.rankApi).then(res => {

            const { response_status, response_data } = res.data;
            if (response_status.code != 0) {
              set('loadEnd', true);
              return;
            }

            let arr = []
            if (this.mainTab == 1) {
              arr = response_data.final.rank
            } else {
              arr = response_data.promotion.rank
            }

            //倒计时
            // const second = this.mainTab == 1 ? response_data.promotion.seconds : response_data.final.seconds;
            let second = 0
            if (this.mainTab == 1) {
              second = response_data.final.seconds
            } else {
              second = response_data.promotion.seconds
            }
            set('second', second)
            // 當前階段狀態
            let status = 0
            if (this.mainTab == 1) {
              status = response_data.final.status
            } else {
              status = response_data.promotion.status
            }

            //跟随榜单变换个人信息
            let owner = 0
            if (this.mainTab == 1) {
              owner = response_data.final.owner
            } else {
              owner = response_data.promotion.owner
            }
            if (owner) {
              this.$store.commit("changGroupsUserMsg", {//初始当前日榜个人信息
                key: this.rankKey,
                msg: owner
              })
            }
            set('status', status)
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
              console.log('ggg')
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
      if (val != 'init') {
        this.$store.dispatch('getInitInfo');
      }
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
    shouFriend (item, type) {
      userFriend(item.uid, type).then(res => {
        this.act_item = item
        this.friendList = res.data.response_data.fans
        this.showFriendList = true
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.rankGroups {
  position: relative;
  // background: #f8ffe6 url(../assets/img/listBg.png) no-repeat;
  background-size: 100% auto;
  margin: 0.22rem auto 0;
  .mainTabs {
    display: flex;
    width: 7.22rem;
    height: 0.84rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    background: url(../img/tab_bg.png);
    background-size: 100% 100%;
    span {
      height: 1.03rem;
      flex: 1;
      text-align: center;
      display: flex;
      display: flex;
      align-items: center;
      justify-content: center;
      &.current {
        color: rgba(255, 248, 251, 1);
        // background: url(../img/rank_tab_act.png);
        // background-size: 100% 100%;
      }
    }
  }
  .userList {
    width: 7.22rem;
    background: url(../img/list_bg.png) no-repeat;
    background-size: 100% auto;
    margin: 0.2rem auto 0;
    padding-bottom: 2rem;
  }
  .timeBox {
    height: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > p {
      font-size: 0.28rem;
    }
    .actTime {
      height: 1rem;
      display: flex;
      align-items: center;
      span {
        width: 0.72rem;
        height: 0.72rem;
        text-align: center;
        line-height: 0.72rem;
        font-size: 0.48rem;
        font-weight: 600;
        border-radius: 0.1rem;
        color: #FEC4FE;
      }
      em {
        font-size: 0.22rem;
        margin: 0.1rem 0.15rem 0 0.15rem;
        color: #FDFF35;
      }
    }
  }
  .listHeader {
    width: 7.07rem;
    height: 0.3rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    text-align: center;
    span {
      font-size: 0.22rem;
      color: rgba(246, 197, 255, 1);
      &.rank {
        width: 1.3rem;
      }
      &.img {
        width: 1.7rem;
      }
      &.nick {
        width: 2.5rem;
      }
      &.score {
        flex: 1;
      }
    }
  }
  .list {
    width: 7.07rem;
    margin: 0.1rem auto;
    li {
      height: 1.6rem;
      margin-bottom: 0.06rem;
      display: flex;
      align-items: center;
      background: url(../img/topItem_bg.png);
      background-size: 100% 100%;
      .userRank {
        width: 0.72rem;
        height: 0.58rem;
        line-height: 0.58rem;
        margin: 0 0.47rem 0 0.19rem;
        text-align: center;
        font-size: 0.34rem;
        font-weight: bold;
        font-style: italic;
      }
      .imgBox {
        width: 1.6rem;
        height: 1.21rem;
        position: relative;
        .live {
          width: 0.77rem;
          height: 0.27rem;
          background: #ED5A27;
          border-radius: 0.14rem;

          font-size: 0.24rem;
          font-weight: 500;
          text-align: center;
          line-height: 0.27rem;
          position: absolute;
          bottom: 0;
          left: 0.2rem;
        }
        img {
          box-sizing: border-box;
          border: 0.02rem solid #F2DA7E;
        }
        .av1 {
          width: 1.21rem;
          height: 1.21rem;
          border-radius: 50%;
          position: absolute;
          top: 0;
          left: 0;
        }
        .av2 {
          width: 0.76rem;
          height: 0.76rem;
          border-radius: 50%;
          position: absolute;
          right: 0rem;
          top: 0.4rem;
        }
      }
      .nick {
        width: 2rem;
        margin-left: 0.25rem;
        text-align: center;
        color: #761381;
        font-size: 0.26rem;
      }
      .score {
        flex: 1;
        margin-left: 0.25rem;
        text-align: center;
        font-size: 0.34rem;
        color: #FFF83B;
        font-weight: bold;
        font-style: italic;
      }
      &.rank1,
      &.rank2,
      &.rank3 {
        background: url(../img/top3_bg.png);
        background-size: 100% 100%;
      }
      &.rank1 {
        .userRank {
          text-indent: -99rem;
          background: url(../img/top1.png);
          background-size: 100% 100%;
        }
      }
      &.rank2 {
        .userRank {
          text-indent: -99rem;
          background: url(../img/top2.png);
          background-size: 100% 100%;
        }
      }
      &.rank3 {
        .userRank {
          text-indent: -99rem;
          background: url(../img/top3.png);
          background-size: 100% 100%;
        }
      }
    }
    &.totle {
      li {
        .imgBox {
          width: 1.4rem;
          margin-left: 0.2rem;
        }
        .msg {
          flex: 1;
          padding-right: 0.2rem;
          .userMsg {
            display: flex;
            align-items: center;
            justify-content: space-between;
            > div {
              margin: 0;
              &.nick {
                text-align: left;
              }
              &.score {
                margin-left: 0.6rem;
              }
            }
          }
          .userPeople {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-top: 0.34rem;
            .peopleItem {
              display: flex;
              align-items: center;
              justify-content: space-between;
              img {
                width: 0.31rem;
                height: 0.31rem;
                margin-left: -0.1rem;
                border-radius: 50%;
              }
            }
            u {
              font-size: 0.24rem;
              color: #AB23CD;
              margin-left: 0.05rem;
            }
          }
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
  color: #fff;
  font-size: 80%;
}
.scrollNone {
  text-align: center;
  color: #fff;
  font-size: 80%;
}
.userPeopleList {
  width: 7.24rem;
  height: 10.36rem;
  background: url(../img/people_bg.png);
  background-size: 100% 100%;
  .list_title {
    height: 1.07rem;
    line-height: 1.07rem;
    text-align: center;
    font-size: 0.33rem;
    font-weight: bold;
  }
  .list_header {
    padding: 0 0.34rem;
    height: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #F785C1;
    span {
      font-size: 0.22rem;
    }
  }
  ul {
    height: 6.18rem;
    overflow-y: scroll;
    li {
      width: 7.22rem;
      height: 1.03rem;
      display: flex;
      align-items: center;
      .userRank {
        width: 1rem;
        text-align: center;
        margin-left: 0.05rem;
      }
      img {
        width: 0.83rem;
        height: 0.83rem;
        border-radius: 50%;
        margin-left: 0.34rem;
      }
      .nick {
        width: 2.2rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-left: 0.21rem;
        font-size: 0.28rem;
      }
      .score {
        flex: 1;
        margin-left: 0.8rem;
        text-align: center;
        color: #FFEA59;
        font-size: 0.28rem;
      }
    }
  }
  .fans_tips {
    font-size: 0.28rem;
    color: #E585BD;
    padding: 0 0.48rem;
    margin-top: 0.36rem;
    line-height: 0.34rem;
  }
  .lookmsg {
    width: 3.72rem;
    height: 0.7rem;
    font-size: 0.33rem;
    background: url(../img/lookmsg.png);
    background-size: 100% 100%;
    text-align: center;
    line-height: 0.7rem;
    margin: 0.36rem auto 0;
  }
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
