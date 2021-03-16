<template>
  <div class="rankGroups">
    <!-- 三個類別 -->
    <div class="typeMainTabs">
      <span @click="setShowType(1)" :class="{act:showType == 1}">{{lang.type_tab1}}</span>
      <span @click="setShowType(2)" :class="{act:showType == 2}">{{lang.type_tab2}}</span>
      <!-- <span @click="setShowType(3)" :class="{act:showType == 3}">用戶榜</span> -->
    </div>
    <!-- 日榜、总榜切换主Tabs -->
    <div class="mainTabs">
      <div class="tabs">
        <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" href="">{{lang.tab1}}</a>
        <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" href="">{{lang.tab2}}</a>
      </div>
    </div>
    <ul class="list day">
      <li v-for="(item,index) in rank.list" :key="index" :class="'rank'+item.rank" @click="goUser(item.uid,item.rid)">
        <div class="showUserIcon" @click.stop="$router.push({name:'UserList',params:{uid:item.uid}})" v-if="showType == 2 && mainTab == 0">{{lang.rank_Tips}}<i></i></div>
        <div class="rank">{{item.rank}}</div>
        <div class="uerImg" @click="goUser(item.uid,item.live)">
          <img v-if="item.avatar_frame &&item.avatar_frame != ''" :src="item.avatar_frame" class="frame" alt="">
          <img v-lazy="item.avatar" alt="" class="av">
        </div>
        <div class="userMsg">
          <div class="nick">{{item.nick}} <i v-if="item.live && showType == 1 && mainTab == 0"> </i></div>
          <div class="uid">UID {{item.uid}}</div>
        </div>
        <div class="score"><i :class="{type2:showType == 1 && mainTab == 1}"></i><em>{{item.score}}</em></div>
      </li>
    </ul>
    <!-- 日榜和总榜共用Loading（如果需要细化加载提示文案，可以把以下标签复制到不同的榜单后面） -->
    <div v-if="rank.loading" class="scrollLoading">{{lang.loading}}</div>
    <div v-if="rank.none " class="scrollNone">
      {{lang.noPeople}}
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import { getUrlString } from '../utils';
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
      peopleArr: []
    }
  },
  watch: {
    firstInit (val) {
      this.onScroll();
    }
  },
  computed: {
    ...mapState(['rankGroups', "firstInit", "isShare", "step", "showType", "timeObj", "curent_data"]),
    rankKey () {
      // return ['one', 'two', 'three'][this.tab];
      return this.mainTab == 1 ? 'total' : this.mainTab;
    },
    rankApi () {
      if (this.isShare) {
        var dayApi = `/loving_city/allList.php?type={type}&tm=${this.curent_data}&from={from}`;
        var totalApi = `/loving_city/allList.php?type={type}&tm=0&from={from}`;
        var api = this.showType == 2 ? totalApi : dayApi;
        return api.replace('{type}', this.mainTab == 0 ? 1 : 0);
      } else {
        var dayApi = `/loving_city/allList.php?token={token}&type={type}&tm=${this.curent_data}&from={from}`;
        var totalApi = `/loving_city/allList.php?token={token}&type={type}&tm=0&from={from}`;
        var api = this.showType == 2 ? totalApi : dayApi;
        const token = getUrlString('token') || '';
        return api.replace('{type}', this.mainTab == 0 ? 1 : 0).replace('{token}', token)
      }
    },
    rankSize () {
      // 如果明确服务器每次返回的列表长度，请返回具体的数值，有助于减少一次额外请求即可确定加载完所有数据
      return 20;
    },
    rank () {
      const rankConf = this.rankGroups[this.showType][this.rankKey] || {};
      rankConf.list = rankConf.list || [];
      if (rankConf.second && rankConf.second > 0) {
        this.downTimeGo('time' + this.rankKey, rankConf.second)
      }
      return rankConf;
    },
    actTime () {
      return getDate(new Date(this.timeObj.stime * 1000), '2') + ' ~ ' + getDate(new Date(this.timeObj.etime * 1000), '2')
    }
  },
  mounted () {
    //this.onScroll(); // 如果默认展示的Tabs依赖服务器配置，把此方法移到watch中去调用（watch更新Tabs值后调onScroll）
    // 如果初始化接口返回当前榜单数据，可以在Store的Action拿到服务器数据时先调用commit('updateRankGroups', {key:key, list:[]})，再更新state.tab触发组件watch
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    setShowType (val) {
      if (val !== this.showType) {
        this.mainTab = 0
        this.vxc('setShowType', val)
        this.vxc("changTab", this.rankKey)
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
    },
    onScroll () {
      if (!this.rank.loading && !this.rank.loadEnd && !this.firstInit) {
        const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100;
        const notFull = document.body.scrollHeight < window.innerHeigh;
        if (scrollToBottom || notFull || !this.rank.loadCount) {
          const key = this.rankKey;

          const set = (k, v) => {
            let obj = {
              type: this.showType,
              data: { key, [k]: v }
            }
            this.$store.commit('updateRankGroups', obj);
          };

          set('loading', true);
          axios.get(this.rankApi.replace('{from}', this.rank.list.length)).then(res => {
            set('loading', false);

            const { response_status, response_data } = res.data;

            if (response_status.code != 0) {
              set('loadEnd', true);
              return;
            }
            this.$parent.downTimeGo('time', response_data.second)
            const arr = response_data.list;
            //跟随榜单变换个人信息
            if (response_data.myRank && response_data.myRank.uid) {
              let userObj = {
                type: this.showType,
                data: { //当前日榜信息
                  key: this.rankKey,
                  msg: response_data.myRank
                }
              }
              this.vxc('updateGroupsUserMsg', userObj)
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
                console.log(this.rank.loadCount, this.rank.list.length)
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
    goUser (uid, live) { //跳转
      if (live) {
        location.href = `rid:${uid}`
      } else {
        location.href = `uid:${uid}`
      }
    },
    closePeople () {
      this.actIndex = 0
      this.showPeopleList = false
    },
    goPeople (uid) {
      location.href = `uid:${uid}`
    }
  },
}
</script>

<style lang="scss">
.rankGroups {
  width: 7.02rem;
  margin-top: 0.16rem;
  background: #fff url(../img/rankBg.png) no-repeat;
  background-size: 7.02rem 0.63rem;
  padding-bottom: 2rem;
  margin: 0.4rem auto;
  .typeMainTabs {
    padding: 0 0.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 6.58rem;
    height: 0.98rem;
    margin: 0 auto;
    > span {
      width: 3.27rem;
      height: 0.8rem;
      text-align: center;
      font-weight: 500;
      line-height: 0.8rem;
      background: url(../img/typeTab.png);
      background-size: 100% 100%;
      &.act {
        background: url(../img/typeTab_act.png);
        background-size: 100% 100%;
      }
    }
  }
  > li {
    padding: 0.5rem 0;
  }
  .mainTabs {
    margin: 0.15rem 0 0.25rem;
    padding: 0 0.37rem;
    height: 0.88rem;
    margin: 0 auto;
    display: flex;
    .tabs {
      width: 5.2rem;
      height: 0.72rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0.13rem auto 0;
      > a {
        display: block;
        width: 2.6rem;
        height: 0.72rem;
        text-align: center;
        line-height: 0.72rem;
        font-weight: 500;
        position: relative;
        font-size: 0.24rem;
        color: rgba(168, 168, 176, 1);
        &.current {
          color: rgba(197, 183, 248, 1);
        }
        &.current::before {
          content: '';
          display: block;
          width: 2.6rem;
          height: 0.11rem;
          background: url(../img/tab_linerAct.png);
          background-size: 100% 100%;
          position: absolute;
          bottom: 0;
          left: 0;
        }
      }
      a::before {
        content: '';
        display: block;
        width: 2.6rem;
        height: 0.11rem;
        background: url(../img/tab_liner.png);
        background-size: 100% 100%;
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }
  }
  // .scoreTips {
  //   text-align: center;
  //   color: #9AFEFF;
  //   font-size: 80%;
  //   margin: 0.2rem 0 0.11rem 0;
  // }
  .timeTips {
    > p {
      margin-top: 0.11rem;
      width: 6.98rem;
      font-size: 80%;
    }
  }
  .list {
    margin: 0.19rem auto;
    width: 7.02rem;
    li {
      height: 1.27rem;
      margin-top: 0.05rem;
      display: flex;
      align-items: center;
      position: relative;
      .showUserIcon {
        width: 3.5rem;
        height: 0.32rem;
        background: url(../img/userListIcon.png);
        background-size: 100% 100%;
        position: absolute;
        right: 0;
        top: 0;
        font-size: 0.2rem;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap;
        text-indent: 0.15rem;
        i {
          width: 0.12rem;
          height: 0.21rem;
          background: url(../img/arr_left.png);
          background-size: 100% 100%;
          margin-left: 0.1rem;
        }
      }
      .rank {
        width: 0.87rem;
        height: 0.7rem;
        line-height: 0.7rem;
        text-align: center;
        color: rgba(171, 171, 182, 1);
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
          width: 0.94rem;
          height: 0.94rem;
          position: absolute;
          top: 0.055rem;
          left: 0.065rem;
          z-index: 10;
        }
        .av {
          width: 0.88rem;
          height: 0.88rem;
          position: absolute;
          top: 0.1rem;
          left: 0.11rem;
          border-radius: 50%;
          //   border: 0.02rem solid rgba(131, 9, 67, 1);
          &.room {
            border-radius: 0.14rem;
            &.noBor {
              border: none;
            }
          }
        }
      }
      .userMsg {
        width: 2.8rem;
        margin-right: 0.1rem;
        .nick {
          font-size: 0.32rem;
          color: rgba(168, 168, 176, 1);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          i {
            display: inline-block;
            width: 0.28rem;
            height: 0.22rem;
            background: url(../img/ktving.gif);
            background-size: 100% 100%;
            margin-left: 0.1rem;
          }
        }
        .uid {
          color: rgba(171, 171, 182, 0.7);
          font-size: 0.26rem;
        }
      }
      .score {
        display: flex;
        align-items: center;
        color: rgba(255, 191, 208, 1);
        margin-left: 0.15rem;
        i {
          width: 0.32rem;
          height: 0.26rem;
          background: url(../img/scoreIcon1.png);
          background-size: 100% 100%;
          margin-right: 0.1rem;
          &.type2 {
            background: url(../img/scoreIcon2.png);
            background-size: 100% 100%;
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
  bottom: 1.35rem;
  // background: url(../assets/img/refresh.png) no-repeat;
  // background-size: contain;
  transition: all 1s;
  text-indent: -999rem;
  z-index: 100;
}
</style>
