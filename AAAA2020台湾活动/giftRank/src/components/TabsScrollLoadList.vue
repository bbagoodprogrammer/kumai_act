<template>
  <div class="rankGroups">
    <!-- 三個類別 -->
    <div class="typeMainTabs">
      <span @click="setShowType(1)" :class="{act:showType == 1}">創作者榜</span>
      <span @click="setShowType(2)" :class="{act:showType == 2}">房主榜</span>
      <span @click="setShowType(3)" :class="{act:showType == 3}">用戶榜</span>
    </div>
    <!-- 日榜、总榜切换主Tabs -->
    <div class="mainTabs">
      <div class="tabs">
        <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" href="">日榜</a>
        <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" href="">總榜</a>
      </div>
      <a @click.prevent="onRefresh" href="" v-if="tab == nowDay && !isShare && actStatus===1" :style="{transform:'rotate('+rotatePx+'deg)'}" id="refresh">刷新</a>
    </div>
    <!-- <div v-if="mainTab==0" class="tabs">
      <a @click.prevent="tabClick(0)" :class="{current:tab==0}" href="">日榜1</a>
      <a @click.prevent="tabClick(1)" :class="{current:tab==1}" href="">日榜2</a>
      <a @click.prevent="tabClick(2)" :class="{current:tab==2}" href="">日榜3</a>
    </div> -->
    <!-- 日榜 -->
    <DayTabs v-if="mainTab == 0" @changeClick="tabClick" :tab="tab"></DayTabs>
    <p class="scoreTips" v-else>榜單時間：{{actTime}}</p>
    <div class="downTimebox">
      <div v-if="mainTab == 0" class="timeTips">
        <p v-if="tab == nowDay">- 距離今日榜單活動結束還有 -</p>
        <p v-else-if="tab > nowDay">- 距離今日榜單活動開始還有 -</p>
        <p class="noTime" v-else>- 本日榜已結束 -</p>
      </div>
      <div class="timeTips" v-else>
        <p v-if="actStatus == 0">- 距離活動開始還有 -</p>
        <p v-else-if="actStatus == 1">- 距離活動結束還有 - </p>
        <p v-else>- 活動已結束 - </p>
      </div>
      <!-- -->
      <div class="timeDown" v-if="(tab >= nowDay &&  surplusTime.day) || mainTab == 1">
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
      <p class="rankTips" v-if="mainTab == 0">日榜前3獎勵分別獎勵榜單金幣3%/2.5%/2%現金分成</p>
    </div>
    <ul v-if="mainTab==0" class="list day">
      <li v-for="(item,index) in rank.list" :key="index" :class="'rank'+item.rank" @click="goUser(item.uid)">
        <div class="rank">{{item.rank}}</div>
        <div class="uerImg">
          <span class="imgBg"></span>
          <img v-lazy="item.avatar" alt="" class="imgItem">
        </div>
        <div class="userMsg">
          <div class="rName" v-if="item.rname">{{item.rname}}</div>
          <div class="name" :class="{rNick:showType == 2}">{{item.nick}}</div>
          <div class="score"><i></i> {{item.score}}</div>
        </div>
        <div class="userGift">
          <span v-for="(item2,index2) in item.gift" :key="index2">
            <img :src="item2.img" alt="">
            <em>{{item2.muns}}</em>
          </span>
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
          <div class="rName" v-if="item.rname">{{item.rname}}</div>
          <div class="name" :class="{rNick:showType == 2}">{{item.nick}}</div>
          <div class="score"><i></i> {{item.score}}</div>
        </div>
        <div class="userGift">
          <span v-for="(item2,index2) in item.gift" :key="index2">
            <img :src="item2.img" alt="">
            <em>{{item2.muns}}</em>
          </span>
        </div>
      </li>
    </ul>
    <!-- 日榜和总榜共用Loading（如果需要细化加载提示文案，可以把以下标签复制到不同的榜单后面） -->
    <div v-if="rank.loading" class="scrollLoading">加載中...</div>
    <div v-if="rank.none && mainTab==0 && (rank.list.length == 0 && (tab <= nowDay || tab ==='total'))" class="scrollNone">
      目前暫無歌友上榜</br>
      虛位以待，等你來哦！
    </div>
    <div v-if="mainTab==0 && tab > nowDay" class="dengdai">敬請期待！</div>
    <div class="mask" v-show="showPeopleList">
      <transition name="slide">
        <div class="peopleList" v-if="showPeopleList">
          <i class="close" @click="closePeople()"></i>
          <ul>
            <li v-for="(item,index) in peopleArr" :key="index" :class="[{act:actIndex==index},'rank'+index]" @click="peopleClick(index,item.uid)">
              <div class="rank"></div>
              <div class="userImg">
                <span class="imgBg"></span>
                <img v-lazy="item.avatar" alt="" class="imgItem">
              </div>
              <div class="name">{{item.nick}}</div>
              <div class="score"><i></i> <em>{{item.score}}</em> </div>
            </li>
          </ul>
          <div class="goUerBtn" @click="goPeople()">前往他的主頁</div>
        </div>
      </transition>
    </div>
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
      tab: 0,
      surplusTime: {},//日榜剩余时间
      timer: null,
      timer2: null,
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
      firstTask: true,
      showPeopleList: false,
      actIndex: 0,
      uid: 0,
      peopleArr: []
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
    ...mapState(['rankGroups', "nowDay", "dateArr", "inited", "isShare", "actStatus", "showType", "timeObj"]),
    rankKey() {
      // return ['one', 'two', 'three'][this.tab];
      return this.mainTab == 1 ? 'total' : this.tab;
    },
    rankApi() {
      if (this.isShare) {
        var dayApi = `/gift_contest/list.php?type={type}&day={day}&from={from}`;
        var totalApi = `/gift_contest/list.php?type={type}&day=0&from={from}`;
        var api = this.rankKey == 'total' ? totalApi : dayApi;
        return api.replace('{day}', this.dateArr[this.tab - 1]).replace('{type}', this.showType);
      } else {
        var dayApi = `/gift_contest/list.php?token={token}&type={type}&day={day}&from={from}`;
        var totalApi = `/gift_contest/list.php?token={token}&type={type}&day=0&from={from}`;
        var api = this.rankKey == 'total' ? totalApi : dayApi;
        const token = getUrlString('token') || '';
        return api.replace('{day}', this.dateArr[this.tab - 1]).replace('{type}', this.showType).replace('{token}', token)
      }
    },
    rankSize() {
      // 如果明确服务器每次返回的列表长度，请返回具体的数值，有助于减少一次额外请求即可确定加载完所有数据
      return 20;
    },
    rank() {
      const rankConf = this.rankGroups[this.showType][this.rankKey] || {};
      rankConf.list = rankConf.list || [];
      if (rankConf.second && rankConf.second > 0) {
        this.downTimeGo('time' + this.rankKey, rankConf.second)
      }
      return rankConf;
    },
    actTime() {
      return getDate(new Date(this.timeObj.stime * 1000), '2') + ' ~ ' + getDate(new Date(this.timeObj.etime * 1000), '2')
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
    setShowType(val) {
      if (val !== this.showType) {
        this.vxc('setShowType', val)
        this.tab = this.nowDay
        this.mainTab = 0
        this.$nextTick(() => {
          if (!this.rank.loadCount) {
            this.onScroll();
          }
        });
      }
    },
    mainTabClick(tab) { //总榜切换
      this.mainTab = tab;
      this.vxc("changTab", this.rankKey)
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      });
    },
    tabClick(tab) { //日榜切换
      this.tab = tab;
      var nowTab = this.rankKey >= this.nowDay ? this.nowDay : this.rankKey //存当天选择的tab索引用于底部个人信息查找
      this.vxc("changTab", nowTab)
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      });
    },
    onScroll() {
      // if (this.tab > this.nowDay) return (this.tab > this.nowDay && this.rankKey !== 'total') || 
      if (this.inited === 0) { //初始化是少一次請求,是日榜的时候和不是总榜的时候返回
        return
      }
      if (!this.rank.loading && !this.rank.loadEnd) {
        const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100;
        const notFull = document.body.scrollHeight < window.innerHeigh;
        if (scrollToBottom || notFull) {
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
            if (this.tab >= this.nowDay || this.mainTab == 1) {
              set('second', response_data.current_time)
            }
            const arr = response_data.list;
            //跟随榜单变换个人信息
            if (response_data.myrank && response_data.myrank.info) {
              let userObj = {
                type: this.showType,
                data: { //当前日榜信息
                  key: this.rankKey,
                  msg: response_data.myrank ? response_data.myrank : {}
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
      api.getPeopleList(uid).then(res => {
        this.peopleArr = res.data.response_data.list
        this.showPeopleList = true
        this.uid = this.peopleArr[0].uid
      })
    },
    closePeople() {
      this.actIndex = 0
      this.showPeopleList = false
    },
    peopleClick(index, uid) {
      this.uid = uid
      this.actIndex = index
    },
    goPeople() {
      location.href = `uid:${this.uid}`
    }
  },
}
</script>

<style lang="scss">
.rankGroups {
  margin-top: 0.26rem;
  padding-bottom: 2rem;
  .typeMainTabs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 6.98rem;
    height: 0.98rem;
    background: url(../assets/img/tasBg.png);
    background-size: 100% 100%;
    margin: 0 auto;
    > span {
      width: 2.5rem;
      height: 0.9rem;
      text-align: center;
      color: #ffcac8;
      font-weight: 500;
      line-height: 0.89rem;
      &.act {
        color: #fff;
        background: url(../assets/img/actTab.png);
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
      width: 5.36rem;
      height: 0.72rem;
      // background: url(../assets/img/tabs.png);
      // background-size: 100% 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0.13rem auto 0;
      > a {
        display: block;
        width: 2.57rem;
        height: 0.72rem;
        text-align: center;
        line-height: 0.72rem;
        background: url(../assets/img/dayTitle.png);
        background-size: 100% 100%;
        color: #fdc0c1;
        font-weight: 500;
        &.current {
          color: #fff;
          background: url(../assets/img/actDayTitle.png);
          background-size: 100% 100%;
        }
      }
    }
  }
  .scoreTips {
    text-align: center;
    color: #fff9c6;
    font-size: 80%;
    margin: 0.2rem 0 0.11rem 0;
  }
  .timeTips {
    > p {
      margin-top: 0.11rem;
      width: 6.98rem;
      color: #a6ffd8;
      font-size: 80%;
    }
  }
  .downTimebox {
    margin: 0 auto;
    width: 6.98rem;
    text-align: center;
    // background: url(../assets/img/timeBg.png);
    // background-size: 100% 100%;
    position: relative;
    .timeDown {
      width: 4.64rem;
      height: 0.76rem;
      padding: 0 0.25rem;
      margin: 0.12rem auto 0;
      background: url(../assets/img/timeBg.png);
      background-size: 100% 100%;
      display: flex;
      justify-content: space-between;
      > div {
        height: 100%;
        line-height: 0.76rem;
        display: inline-block;
        strong {
          font-size: 0.48rem;
          font-weight: bold;
        }
        em {
          font-size: 0.22;
          color: #ffc0bd;
        }
      }
    }
    .noTime {
      line-height: 0.6rem;
    }
    .rankTips {
      margin-top: 0.12rem;
      font-size: 0.22rem;
      color: #fff9c6;
    }
  }
  .list {
    margin: 0.19rem auto;
    width: 7.1rem;
    li {
      height: 1.27rem;
      margin-top: 0.05rem;
      background: url(../assets/img/topItemBg.png);
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      .rank {
        width: 0.84rem;
        height: 0.72rem;
        font-size: 0.46rem;
        color: #ffd1bd;
        text-align: center;
        line-height: 0.72rem;
        margin-left: 0.13rem;
      }
      .uerImg {
        width: 1.21rem;
        height: 1.01rem;
        position: relative;
        margin-left: 0.21rem;
        .imgBg {
          width: 1rem;
          height: 1.01rem;
          background: url(../assets/img/av4.png);
          background-size: 100% 100%;
          position: absolute;
          z-index: 10;
        }
        .imgItem {
          width: 0.94rem;
          height: 0.94rem;
          position: absolute;
          top: 0.035rem;
          left: 0.03rem;
          border-radius: 50%;
        }
      }
      .userMsg {
        width: 2.5rem;
        .name {
          max-width: 2.5rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 0.26rem;
        }
        .rNick {
          color: #ffc4f9;
        }
        .score {
          display: flex;
          align-items: center;
          color: #ffed82;
          font-size: 0.22rem;
          font-weight: 500;
          i {
            display: block;
            margin-right: 0.1rem;
            width: 0.22rem;
            height: 0.25rem;
            background: url(../assets/img/coins.png);
            background-size: 100% 100%;
          }
        }
      }
      .userGift {
        width: 2rem;
        height: 0.8rem;
        span {
          float: left;
          display: inline-block;
          width: 48%;
          height: 50%;
          color: #ffe066;
          display: flex;
          align-items: center;
          em {
            font-size: 0.22rem;
            font-weight: 500;
          }
          img {
            display: block;
            width: 0.35rem;
            height: 0.35rem;
            margin-right: 0.05rem;
          }
        }
      }
      &.rank1 {
        background: url(../assets/img/top1Bg.png);
        background-size: 100% 100%;
        .imgBg {
          width: 1.11rem;
          height: 1.25rem;
          background: url(../assets/img/av1.png);
          background-size: 100% 100%;
          top: -0.22rem;
          left: -0.05rem;
        }
        .imgItem {
          width: 1rem;
          height: 1rem;
        }
        .rank {
          text-indent: -999rem;
          background: url(../assets/img/top1.png);
          background-size: 100% 100%;
        }
      }
      &.rank2 {
        background: url(../assets/img/top2Bg.png);
        background-size: 100% 100%;
        .imgBg {
          width: 1.11rem;
          height: 1.25rem;
          background: url(../assets/img/av2.png);
          background-size: 100% 100%;
          top: -0.22rem;
          left: -0.05rem;
        }
        .imgItem {
          width: 1rem;
          height: 1rem;
        }
        .rank {
          text-indent: -999rem;
          background: url(../assets/img/top2.png);
          background-size: 100% 100%;
        }
      }
      &.rank3 {
        background: url(../assets/img/top3Bg.png);
        background-size: 100% 100%;
        .imgBg {
          width: 1.11rem;
          height: 1.25rem;
          background: url(../assets/img/av3.png);
          background-size: 100% 100%;
          top: -0.22rem;
          left: -0.05rem;
        }
        .imgItem {
          width: 1rem;
          height: 1rem;
        }
        .rank {
          text-indent: -999rem;
          background: url(../assets/img/top3.png);
          background-size: 100% 100%;
        }
      }
    }
  }
}
.peopleList {
  width: 6.62rem;
  height: 6.14rem;
  background: url(../assets/img/peopleList.png);
  background-size: 100% 100%;
  position: relative;
  ul {
    width: 5.81rem;
    margin: 1.43rem auto 0;
    li {
      height: 1.27rem;
      display: flex;
      align-items: center;
      background: url(../assets/img/peopleBg.png);
      background-size: 100% 100%;
      .rank {
        width: 0.75rem;
        height: 0.65rem;
        margin-left: 0.17rem;
      }
      .userImg {
        width: 1.21rem;
        height: 1.01rem;
        position: relative;
        margin-left: 0.21rem;
        .imgBg {
          position: absolute;
          z-index: 10;
        }
        .imgItem {
          width: 0.94rem;
          height: 0.94rem;
          position: absolute;
          top: 0.035rem;
          left: 0.03rem;
          border-radius: 50%;
        }
      }
      .name {
        width: 2rem;
        max-width: 2rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .score {
        display: flex;
        align-items: center;
        margin-left: 0.3rem;
        i {
          display: block;
          width: 0.22rem;
          height: 0.25rem;
          background: url(../assets/img/coins.png);
          background-size: 100% 100%;
        }
        em {
          font-size: 0.22rem;
          color: #ffed82;
          margin-left: 0.06rem;
        }
      }
      &.act {
        background: url(../assets/img/peopleBg2.png);
        background-size: 100% 100%;
      }
      &.rank0 {
        .rank {
          background: url(../assets/img/top1.png);
          background-size: 100% 100%;
        }
        .imgBg {
          width: 1.11rem;
          height: 1.25rem;
          background: url(../assets/img/av1.png);
          background-size: 100% 100%;
          top: -0.23rem;
          left: -0.06rem;
        }
      }
      &.rank1 {
        .rank {
          background: url(../assets/img/top2.png);
          background-size: 100% 100%;
        }
        .imgBg {
          width: 1.11rem;
          height: 1.25rem;
          background: url(../assets/img/av2.png);
          background-size: 100% 100%;
          top: -0.23rem;
          left: -0.06rem;
        }
      }
      &.rank2 {
        .rank {
          background: url(../assets/img/top3.png);
          background-size: 100% 100%;
        }
        .imgBg {
          width: 1.11rem;
          height: 1.25rem;
          background: url(../assets/img/av3.png);
          background-size: 100% 100%;
          top: -0.23rem;
          left: -0.06rem;
        }
      }
    }
  }
  .goUerBtn {
    width: 2.76rem;
    height: 0.99rem;
    background: url(../assets/img/singUp.png);
    background-size: 100% 100%;
    text-align: center;
    line-height: 0.99rem;
    font-size: 0.36rem;
    font-weight: 500;
    position: absolute;
    bottom: -0.38rem;
    left: 1.93rem;
  }
  .close {
    display: block;
    width: 0.95rem;
    height: 0.95rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    top: -0.45rem;
    right: 0.25rem;
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
  // background-size: contain;
  transition: all 1s;
  text-indent: -999rem;
  z-index: 100;
}
</style>
