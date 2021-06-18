<template>
  <div class="rankGroups">
    <!-- 三個類別 -->
    <div class="typeMainTabs">
      <span @click="setShowType(1)" :class="{act:showType == 1}">{{lang.type_tab1}}</span>
      <span @click="setShowType(2)" :class="{act:showType == 2}">{{lang.type_tab2}}</span>
      <!-- <span @click="setShowType(3)" :class="{act:showType == 3}">用戶榜</span> -->
    </div>
    <a @click.prevent="onRefresh" href="" :style="{transform:'rotate('+rotatePx+'deg)'}" id="refresh"></a>
    <!-- 任务 -->
    <div class="taskBg" v-if="showType == 2 && mainTab == 0">
      <div class="bg"></div>
      <div class="task">
        <div class="taskHeader">
          <div class="taskName">{{lang.taskHeader_tab1}}</div>
          <div class="taskScore">{{lang.taskHeader_tab2}}</div>
          <div class="taskLimt">{{lang.taskHeader_tab3}}</div>
          <div class="taskBar">{{lang.taskHeader_tab4}}</div>
        </div>
        <ul>
          <li v-for="(item,index) in tasks" :key="index">
            <div class="taskName">{{item.title}}</div>
            <div class="taskScore">{{lang.taskScoreTips.replace('%s',item.score)}}</div>
            <div class="taskLimt">{{item.max==0?lang.noMax:item.max}}</div>
            <div class="taskBar" v-if="item.max==0">{{item.progress}}</div>
            <div class="taskBar" v-else>
              <span v-if="item.progress < item.max">
                <i :style="{width:item.progress/item.max * 100 +'%'}"></i>
                <strong class="numText">{{item.progress}}/{{item.max}}</strong>
              </span>
              <em v-else>
                {{lang.over}}
              </em>
            </div>
          </li>
        </ul>
        <div class="todayScore">
          <strong>{{lang.todayScore}}</strong>
          <em>{{owner.score}}</em>
        </div>
      </div>
    </div>

    <!-- 日榜、总榜切换主Tabs -->
    <div class="list_bg">
      <div class="mainTabs">
        <div class="tabs">
          <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" href="">{{lang.tab1}}</a>
          <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" href="">{{lang.tab2}}</a>
        </div>
      </div>
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
      <ul class="list day">
        <li v-for="(item,index) in rank.list" :key="index" :class="'rank'+item.rank">
          <div class="rank">{{item.rank}}</div>
          <div class="uerImg" @click="goUser(item.uid)">
            <img v-if="item.avatar_frame &&item.avatar_frame != ''" :src="item.avatar_frame" class="frame" alt="">
            <img v-lazy="item.avatar" alt="" class="av">
            <i v-if="item.mic_room">LIVE</i>
          </div>
          <div class="userMsg">
            <div class="nick"><strong>{{item.nick}}</strong> <i v-if="item.live  && mainTab == 0"> </i></div>
            <div class="uid"><i>{{lang.floowScore}}</i> <em>{{item.score}}</em> </div>
          </div>
          <div class="fansList" v-if="item.fans.length">
            <p @click="showFans(item)">{{lang.fanList}}</p>
            <div class="imgList" v-if="item.fans">
              <img v-lazy="item2.avatar" alt="" v-for="(item2,index2) in item.fans" :key="index2" @click="goUser(item2.uid)">
            </div>
          </div>
        </li>
      </ul>
      <!-- 日榜和总榜共用Loading（如果需要细化加载提示文案，可以把以下标签复制到不同的榜单后面） -->
      <div v-if="rank.loading" class="scrollLoading">{{lang.loading}}</div>
      <div v-if="rank.none" class="scrollNone">
        {{lang.noPeople}}
      </div>
    </div>
    <div class="mask" v-show="showFansCard">
      <transition name="slide">
        <div class="fanCards" v-if="showFansCard">
          <i class="close" @click="showFansCard = false"></i>
          <div class="title"> <strong>{{userItem.nick}}</strong>{{lang.userPup}}</div>
          <div class="listHeader">
            <span class="rank">{{lang.user_rank}}</span>
            <span class="user">{{lang.user_nick}}</span>
            <span class="score">{{lang.user_score}}</span>
          </div>
          <ul>
            <li v-for="(item,index) in fans" :key="index">
              <span class="rank">{{item.rank}}</span>
              <span class="user">{{item.nick}}</span>
              <span class="score">{{item.score}}</span>
            </li>
          </ul>
          <p class="fansTips">{{lang.userTips}}</p>
          <div class="goUser" @click="goUser(userItem.uid)">
            {{lang.goUser}}
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
import { fansList } from "../apis"
import downTime from '../utils/downTime.js'
import APP from "../utils/openApp"
import api from "../apis"
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
  data () {
    return {
      mainTab: 0,
      tab: 0,
      surplusTime: {},//日榜剩余时间
      timer: null,
      timer2: null,
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
      firstTask: true,
      actIndex: 0,
      uidCon: 0,
      peopleArr: [],
      showFansCard: false,
      fans: [],
      userItem: {}
    }
  },
  watch: {
    activity (val) {
      this.downTimeGo('time_day', val.today_seconds)
    }
  },
  computed: {
    ...mapState(['rankGroups', "firstInit", "showType", "activity", 'tasks', 'owner']),
    rankKey () {
      // return ['one', 'two', 'three'][this.tab];
      return this.mainTab == 1 ? 'total' : this.mainTab;
    },
    rankApi () {
      var dayApi = `/index.php?action=flowerCar.popularityRank&token={token}&uid={uid}`;
      var totalApi = `/index.php?action=flowerCar.totalRank&token={token}&uid={uid}&type={type}`;
      var api = this.mainTab == 1 ? totalApi : dayApi;
      const token = getUrlString('token') || '';
      const uid = getUrlString('uid') || '';
      return api.replace('{type}', this.showType == 1 ? 'flower' : 'popularity').replace('{token}', token).replace('{uid}', uid)
    },
    rankSize () {
      // 如果明确服务器每次返回的列表长度，请返回具体的数值，有助于减少一次额外请求即可确定加载完所有数据
      return 20;
    },
    rank () {
      const rankConf = this.rankGroups[this.showType][this.rankKey] || {};
      rankConf.list = rankConf.list || [];
      //   if (rankConf.second && rankConf.second > 0) {
      //     this.downTimeGo('time' + this.rankKey, rankConf.second)
      //   }
      return rankConf;
    },
    actTime () {
      return getDate(new Date(this.activity.stime * 1000), '2') + ' ~ ' + getDate(new Date(this.activity.etime * 1000), '2')
    }
  },
  //   mounted () {
  //     //this.onScroll(); // 如果默认展示的Tabs依赖服务器配置，把此方法移到watch中去调用（watch更新Tabs值后调onScroll）
  //     // 如果初始化接口返回当前榜单数据，可以在Store的Action拿到服务器数据时先调用commit('updateRankGroups', {key:key, list:[]})，再更新state.tab触发组件watch
  //     window.addEventListener('scroll', this.onScroll);
  //   },
  //   beforeDestroy () {
  //     window.removeEventListener('scroll', this.onScroll);
  //   },
  methods: {
    setShowType (val) {
      if (val !== this.showType) {
        this.vxc('setShowType', val)
        this.$nextTick(() => {
          if (!this.rank.loadCount) {
            this.onScroll();
          }
        });
      }
    },
    mainTabClick (tab) { //总榜切换
      this.mainTab = tab;
      this.vxc("changTab", this.rankKey)
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      });
      if (tab == 1) {
        this.downTimeGo('time_total', this.activity.seconds)
      } else {
        this.downTimeGo('time_day')
      }
    },
    onScroll () {
      const rank = this.rank
      if (!rank.loading && !rank.loadEnd && !this.firstInit) {
        const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100;
        const notFull = document.body.scrollHeight < window.innerHeigh;
        // scrollToBottom  本活动无分页
        if (notFull || !rank.loadCount) {
          const key_type = this.showType
          const key = this.rankKey;

          console.log(key_type, key, '1')
          const set = (k, v) => {
            let obj = {
              type: key_type,
              data: { key, [k]: v }
            }
            this.$store.commit('updateRankGroups', obj);
          };

          set('loading', true);
          axios.get(this.rankApi.replace('{from}', rank.list.length)).then(res => {
            set('loading', false);

            const { response_status, response_data } = res.data;

            if (response_status.code != 0) {
              set('loadEnd', true);
              return;
            }
            if (response_data.tasks) {
              this.vxc('setTasks', response_data.tasks)
            }

            const arr = response_data.rank;
            //跟随榜单变换个人信息
            if (response_data.owner && response_data.owner.uid) {
              let userObj = {
                type: key_type,
                data: { //当前日榜信息
                  key,
                  msg: response_data.owner
                }
              }
              this.vxc('updateGroupsUserMsg', userObj)
            }



            if (arr.slice) {
              const loadCount = typeof rank.loadCount == 'undefined' ? 0 : rank.loadCount;
              set('loadCount', loadCount + 1);
              if (arr.length) {
                set('list', rank.list.concat(arr));
                const noMore = !isNaN(this.rankSize) && arr.length < parseInt(this.rankSize);
                if (rank.loadOnce || noMore) {
                  set('loadEnd', true);
                } else {
                  this.$nextTick(this.onScroll);
                }
              } else {
                set('loadEnd', true);
                set('none', true);
              }
              this.$nextTick(() => {
                if (rank.loadCount > 0 && rank.list.length === 0) {
                  set('none', true);
                }
              });
            } else {
              set('loadEnd', true);
              set('none', true);
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
      let obj = {
        type: this.showType,
        data: { //当前日榜信息
          key: this.rankKey,
          loadCount: 0,
          loadEnd: false,
          loading: false,
          none: false,
          list: []
          // second: response_data.data.current_time
        }
      }
      this.vxc('updateRankGroups', obj)
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
    showFans (item) {
      this.userItem = item
      fansList(this.showType == 1 ? 'flower' : 'popularity', item.uid, this.mainTab == 0 ? 1 : 0).then(res => {
        console.log(res)
        this.fans = res.data.response_data.fans
        this.showFansCard = true
      })
    },
    goUser (uid) { //跳转
      var isiOS = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      if (isiOS) {
        sendJsData('app://userInfo?uid=' + uid);
      } else {
        javascript: JSInterface.sendJsData('app://userInfo?uid=' + uid);
      }
    },
    closePeople () {
      this.actIndex = 0
      this.showPeopleList = false
    },
    pushUser (item) {
      this.$router.push({ name: 'UserList', params: { userItem: item } })
    }
  },
}
</script>

<style lang="scss">
.rankGroups {
  margin-top: 0.16rem;
  //   background: #fff url(../img/rankBg.png) no-repeat;
  //   background-size: 7.02rem 0.63rem;
  padding-bottom: 2rem;
  margin: 0.4rem auto 0;
  .typeMainTabs {
    padding: 0 0.28rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    position: relative;
    z-index: 3;
    > span {
      width: 3.2rem;
      height: 1.5rem;
      font-size: 0.4rem;
      text-align: center;
      font-weight: 500;
      background: url(../img/typeTab.png);
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      &.act {
        background: url(../img/typeTab_act.png);
        background-size: 100% 100%;
      }
    }
  }
  .taskBg {
    position: relative;
  }
  .bg {
    width: 7.33rem;
    height: 7.1rem;
    background: url(../img/taskLinerBg.png);
    background-size: 100% 100%;
    position: absolute;
    top: -5em;
    z-index: 1;
  }
  .task {
    width: 6.19rem;
    height: 5rem;
    padding: 0.46rem 0.62rem 0;
    background: url(../img/taskBg.png);
    background-size: 100% 100%;
    margin-bottom: 0.8rem;
    position: relative;
    z-index: 2;
    .taskName {
      text-align: left;
    }
    .taskBar {
      display: flex;
      align-items: center;
      justify-content: center;
      span,
      em {
        width: 1.16rem;
        height: 0.38rem;
        line-height: 0.38rem;
        color: #4C4066;
        font-size: 0.26rem;
        text-align: center;
      }
      span {
        background: rgba(147, 130, 186, 0.23);
        border-radius: 0.19rem;
        position: relative;
        overflow: hidden;
        i {
          max-width: 100%;
          display: block;
          height: 100%;
          background: linear-gradient(126deg, #EDB9F9 0%, #72C7FD 100%);
          position: absolute;
          left: 0;
          top: 0;
          border-radius: 0.19rem;
        }
        strong {
          width: 100%;
          height: 100%;
          font-size: 0.26rem;
          position: absolute;
          left: 0;
          top: 0;
        }
      }
    }

    .taskHeader {
      //   padding: 0 0.62rem;
      display: flex;
      align-items: center;
      height: 1rem;
      color: #7865E6;
      font-size: 0.28rem;
      text-align: center;
      position: relative;
      div {
        flex: 1;
      }
    }
    .taskHeader:before {
      content: '';
      display: block;
      width: 6.59rem;
      height: 0.03rem;
      background: url(../img/liLiner.png);
      background-size: 100% 100%;
      position: absolute;
      bottom: 0;
    }
    ul {
      li {
        height: 0.9rem;
        display: flex;
        align-items: center;
        font-size: 0.26rem;
        color: #4C4066;
        position: relative;
        div {
          flex: 1;
          text-align: center;
        }
      }
      li:before {
        content: '';
        display: block;
        width: 6.59rem;
        height: 0.03rem;
        background: url(../img/liLiner.png);
        background-size: 100% 100%;
        position: absolute;
        bottom: 0;
      }
    }
    .todayScore {
      height: 0.7rem;
      line-height: 0.7rem;
      text-align: center;
      strong {
        font-size: 0.28rem;
        color: rgba(120, 101, 230, 1);
      }
      em {
        font-size: 0.28rem;
        color: rgba(247, 72, 251, 1);
      }
    }
  }
  > li {
    padding: 0.5rem 0;
  }
  .list_bg {
    width: 7.31rem;
    padding: 0.41rem 0 0.25rem;
    background: rgba(100, 49, 202, 0.42);
    border-radius: 0.31rem;
    margin: 0.48rem auto;
    position: relative;
  }
  .mainTabs {
    margin: 0 auto;
    position: absolute;
    top: -0.41rem;
    .tabs {
      padding: 0 1.1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      > a {
        display: block;
        width: 2.58rem;
        height: 0.97rem;
        text-align: center;
        line-height: 0.97rem;
        font-weight: 500;
        position: relative;
        font-size: 0.4rem;
        background: url(../img/dayTab.png);
        background-size: 100% 100%;
        &.current {
          background: url(../img/dayTab_act.png);
          background-size: 100% 100%;
        }
      }
    }
  }

  .timeDown {
    padding: 0 1.82rem;
    height: 0.7rem;
    margin-top: 0.05rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    strong {
      font-size: 0.36rem;
      color: #F2E4FF;
      margin-right: -0.3rem;
    }
    em {
      font-size: 0.26rem;
      color: #D5ACFB;
      margin: 0rem 0 0 0.16rem;
    }
  }
  .list {
    margin: 0 auto;
    width: 7.17rem;
    li {
      height: 1.56rem;
      margin-top: 0.05rem;
      display: flex;
      align-items: center;
      position: relative;
      background: url(../img/listBg.png);
      background-size: 100% 100%;
      .rank {
        width: 0.87rem;
        height: 0.7rem;
        line-height: 0.7rem;
        text-align: center;
        font-size: 0.28rem;
        color: #711ED8;
      }
      .uerImg {
        width: 1.22rem;
        height: 1.22rem;
        position: relative;
        .av {
          width: 100%;
          height: 100%;
          border: 0.02rem solid #FF99FE;
          border-radius: 50%;
          box-sizing: border-box;
        }
        i {
          width: 0.84rem;
          height: 0.27rem;
          background: #FF99FE;
          border-radius: 0.14rem;
          position: absolute;
          left: 0.19rem;
          bottom: 0;
          text-align: center;
          line-height: 0.27rem;
          font-size: 0.26rem;
        }
      }
      .userMsg {
        width: 2.8rem;
        margin-left: 0.15rem;
        .nick {
          color: #711ED8;
          display: flex;
          align-items: center;
          strong {
            flex: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          i {
            display: inline-block;
            width: 0.28rem;
            height: 0.22rem;
            // background: url(../img/ktving.gif);
            // background-size: 100% 100%;
            margin-left: 0.1rem;
          }
        }
        .uid {
          display: flex;
          align-items: center;
          margin-top: 0.05rem;
          i {
            color: #C703F1;
            font-size: 0.22rem;
          }
          em {
            color: #711ED8;
            font-size: 0.28rem;
            margin-left: 0.05rem;
          }
        }
      }
      .fansList {
        margin-right: 0.38rem;
        p {
          font-size: 0.22rem;
          color: #C703F1;
          text-align: right;
        }
        .imgList {
          width: 2.14rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 0.08rem;
          img {
            width: 0.41rem;
            height: 0.41rem;
            background: #9C55F4;
            border: 1px solid #FFFFFF;
            border-radius: 50%;
            margin-right: 0.02rem;
          }
        }
      }
      &.rank1 {
        .rank {
          text-indent: -999rem;
          background: url(../img/top1.png) center center no-repeat;
          background-size: 0.44rem 0.55rem;
        }
      }
      &.rank2 {
        .rank {
          text-indent: -999rem;
          background: url(../img/top2.png) center center no-repeat;
          background-size: 0.44rem 0.55rem;
        }
      }
      &.rank3 {
        .rank {
          text-indent: -999rem;
          background: url(../img/top3.png) center center no-repeat;
          background-size: 0.44rem 0.55rem;
        }
      }
    }
  }
  .fanCards {
    width: 4.52rem;
    height: 7.27rem;
    background: url(../img/fansCardBg.png);
    background-size: 100% 100%;
    padding: 1.35rem 0.9rem 0;
    text-align: center;
    position: relative;
    .close {
      display: block;
      width: 0.51rem;
      height: 0.51rem;
      background: url(../img/close.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0.51rem;
      top: 0.18rem;
    }
    .title {
      text-align: center;
      color: #4C4066;
    }
    .listHeader {
      display: flex;
      font-size: 0.24rem;
      color: #705BE4;
      white-space: nowrap;
      margin-top: 0.25rem;
    }
    ul {
      height: 3.8rem;
      overflow-y: scroll;
      li {
        height: 0.6rem;
        display: flex;
        align-items: center;
        color: #4C4066;
        font-size: 0.28rem;
      }
    }

    .rank {
      width: 0.7rem;
    }
    .user {
      width: 2.3rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .score {
      flex: 1;
    }
    .fansTips {
      font-size: 0.24rem;
      color: #705BE4;
      line-height: 0.41rem;
      text-align: left;
    }
    .goUser {
      width: 3.94rem;
      height: 0.84rem;
      background: url(../img/goUser.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.74rem;
      font-size: 0.28rem;
      margin: 0.15rem auto 0;
    }
  }
}

.dengdai {
  text-align: center;
}
.scrollLoading {
  text-align: center;
  color: rgba(168, 168, 176, 1);
  font-size: 80%;
}
.scrollNone {
  text-align: center;
  color: rgba(168, 168, 176, 1);
  font-size: 80%;
}
#refresh {
  display: block;
  width: 0.94rem;
  height: 1rem;
  position: fixed;
  right: 0.08rem;
  bottom: 2rem;
  //   background: url(../img/refresh.png) no-repeat;
  //   background-size: contain;
  transition: all 1s;
  text-indent: -999rem;
  z-index: 100;
}
</style>
