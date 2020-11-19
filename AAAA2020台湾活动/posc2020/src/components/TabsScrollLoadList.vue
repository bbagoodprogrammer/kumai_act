<template>
  <div class="rankGroups">
    <!-- 三個類別 -->
    <div class="typeMainTabs">
      <i class="left"></i>
      <div class="tabItem">
        <span :class="{act: nowTab == index + 1}" @click="setShowType( index + 1)" v-for="(item,index) in actArr" :key="index">{{item.name}}<em>{{item.tm}}</em> </span>
      </div>
      <i class="right"></i>
    </div>
    <div class="giftArr">
      <span class="giftItem" v-for="(item,index) in nowInitData.gifts" :key="index">
        <div class="imgBox">
          <img :src="item.image" alt="">
        </div>
        <strong>{{item.name}}</strong>
      </span>
    </div>
    <div class="actTips">
      <p>在比賽期間向選手送以上禮物，選手可獲得10%的人氣加成喔</p>
      <p><span>高光時刻：</span>比賽期間每日21:00～21:00送出的禮物可以獲得10%的人氣值加成</p>
    </div>
    <div class="downTimebox">
      <div class="timeTips">1v1對戰開始倒計時</div>
      <div class="timeDown" v-if="surplusTime&& !surplusTime.end">
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
      <div class="rankTips"></div>
    </div>
    <!-- 日榜 -->
    <!-- <DayTabs v-if="mainTab == 0 && showType== 1" @changeClick="tabClick" :tab="tab"></DayTabs> -->
    <!-- <p class="scoreTips" v-else>榜單時間：{{actTime}}</p> -->
    <ul v-if="nowTab ==1" class="list day">
      <li v-for="(item,index) in rank.list" :key="index" :class="'rank'+item.rank" @click="goPeople(item.uid,item.live)">
      </li>
    </ul>
    <ul v-else-if="nowTab ==2" class="stage2List">
      <li v-for="(item,index) in rank.list" :key="index" :class="[{min:item.empty},'rank'+item.rank]">
      </li>
    </ul>
    <ul v-else class="list stage3List">
      <li v-for="(item,index) in rank.list" :key="index" :class="'rank'+item.rank">
      </li>
    </ul>
    <!-- 日榜和总榜共用Loading（如果需要细化加载提示文案，可以把以下标签复制到不同的榜单后面） -->
    <div v-if="rank.loading" class="scrollLoading">加載中...</div>
    <div v-if="rank.none && rank.list.length == 0 " class="scrollNone">
      目前暫無歌友上榜</br>
      虛位以待，等你來哦！
    </div>
    <div v-if="mainTab==0" class="dengdai">敬請期待！</div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import getUrlString from '../utils/getString.js';
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
  components: {},
  props: ['stime1', 'stime2', 'stime3', 'etime1', 'etime2', 'etime3'],
  data() {
    return {
      mainTab: 0,
      tab: 0,
      nowTab: 1,
      surplusTime: {},//日榜剩余时间
      timer: null,
      timer2: null,
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
      firstTask: true,
      showPeopleList: false,
      actIndex: 0,
      uidCon: 0,
      peopleArr: [],
      showFcards: false,
      cardsMsg: {},
      actArr: [
        {
          name: '海選',
          tm: '11.30~12.02'
        },
        {
          name: '1V1對決',
          tm: '12.03~12.05'
        },
        {
          name: '團戰',
          tm: '12.06~12.08'
        },
        {
          name: '出道決戰',
          tm: '12.09~12.11'
        }
      ]
    }
  },
  computed: {
    ...mapState(['rankGroups', "initGrounps", "isShare", "actStatus", "showType"]),
    rankKey() {
      return this.nowTab
    },
    rankApi() {
      if (this.isShare) {
      } else {
        var dayApi = '/posc2020/init.php?step={step}&token={token}'
        const token = getUrlString('token') || '';
        return ''
        return dayApi.replace('{token}', token).replace('{step}', this.nowTab)
      }
    },
    rankSize() {
      // 如果明确服务器每次返回的列表长度，请返回具体的数值，有助于减少一次额外请求即可确定加载完所有数据
      return 20;
    },
    rank() {
      const rankConf = this.rankGroups[this.rankKey] || {};
      rankConf.list = rankConf.list || [];
      // && rankConf.second > 0
      return rankConf;
    },
    nowInitData() {
      console.log(this.initGrounps, this.nowTab)
      return this.initGrounps[this.nowTab] ? this.initGrounps[this.nowTab] : { gifts: {} }
    }
    // actTime() {
    //   return getDate(new Date(this.timeObj.stime * 1000), '2') + ' ~ ' + getDate(new Date(this.timeObj.etime * 1000), '2')
    // }
  },
  mounted() {
    this.init()
    this.onScroll(); // 如果默认展示的Tabs依赖服务器配置，把此方法移到watch中去调用（watch更新Tabs值后调onScroll）
    // 如果初始化接口返回当前榜单数据，可以在Store的Action拿到服务器数据时先调用commit('updateRankGroups', {key:key, list:[]})，再更新state.tab触发组件watch
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    init(val) {
      api.getDefault(val ? val : 0).then(res => {
        let data = res.data.response_data
        this.vxc('setActStatus', data.step)
        this.vxc('setNowShowType', data.currentTab)
        if (!val) {
          this.nowTab = data.currentTab
        }
        this.vxc('setNowStep', data.activityStep)
        this.vxc('setInitGroup', {
          key: data.currentTab,
          data
        })
        this.downTimeGo('time' + data.currentTab, data.downTime)
      })
    },
    setShowType(val) {
      this.nowTab = val
      if (!this.nowInitData.step) {
        this.init(val)
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
            const arr = response_data.list;
            //跟随榜单变换个人信息
            if (response_data.rank) {
              let userObj = {
                type: this.showType,
                data: { //当前日榜信息
                  key: this.rankKey,
                  msg: response_data.rank ? response_data.rank : {}
                }
              }
              this.vxc('changGroupsUserMsg', userObj)
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
    downTimeGo(timeName, val) {
      console.log(val)
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
    getWidth(score1, score2) {
      return score1 / (score1 + score2) * 100 + '%'
    },
    getDate(time, type) {
      return getDate(new Date(time * 1000), type)
    },
    closePeople() {
      this.actIndex = 0
      this.showPeopleList = false
    },
    goPeople(uid, live) {
      if (live) {
        location.href = `rid:${live}`
        return
      }
      console.log(live)
      location.href = `uid:${uid}`
    },
    showFamily(fid) {
      let type = this.showType == 2 ? 0 : 1
      api.fCards(type, fid).then(res => {
        console.log(res)
        this.cardsMsg = res.data.response_data
        this.showFcards = true
      })
    },
    // getNowDate() {
    //   return getDate(new Date(this.dateArr[this.tab - 1] * 1000), 4)
    // },
    closeCards() {
      this.showFcards = false
    },
    goFroom() {
      location.href = `fid:${this.cardsMsg.family.fid}`
    }
  },
}
</script>

<style lang="scss">
.rankGroups {
  margin-top: 0.16rem;
  padding-bottom: 2rem;
  .typeMainTabs {
    width: 7.04rem;
    height: 1.17rem;
    background: url(../assets/img/tabs.png);
    background-size: 100% 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    .left {
      width: 0.72rem;
      height: 0.72rem;
      background: url(../assets/img/left.png);
      background-size: 100% 100%;
      margin: 0 0.11rem;
    }
    .right {
      width: 0.72rem;
      height: 0.72rem;
      background: url(../assets/img/right.png);
      background-size: 100% 100%;
      margin: 0 0.11rem;
    }
    .tabItem {
      flex: 1;
      white-space: nowrap;
      overflow-x: scroll;
      span {
        display: inline-block;
        width: 1.82rem;
        height: 0.82rem;
        text-align: center;
        color: rgba(255, 191, 92, 1);
        font-size: 0.32rem;
        font-weight: 600;
        em {
          display: block;
          font-size: 0.2rem;
          color: rgba(255, 192, 92, 1);
        }
        &.act {
          color: rgba(178, 79, 40, 1);
          background: url(../assets/img/tab_act.png);
          background-size: 100% 100%;
          em {
            color: rgba(178, 79, 40, 1);
          }
        }
      }
    }
  }
  .giftArr {
    padding: 0 0.3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.22rem;
    span {
      width: 1.56rem;
      .imgBox {
        width: 1.56rem;
        height: 1.56rem;
        background: url(../assets/img/giftItemBg.png);
        background-size: 100% 100%;
        img {
          display: block;
          width: 100%;
          height: 100%;
          margin: 0 auto;
        }
      }
      strong {
        display: block;
        text-align: center;
        font-size: 0.24rem;
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }
  .actTips {
    text-align: center;
    color: rgba(254, 254, 254, 0.6);
    margin-top: 0.3rem;
    p {
      font-size: 0.24rem;
      margin-bottom: 0.2rem;
      span {
        display: inline-block;
        color: rgba(255, 205, 118, 1);
      }
    }
  }
  .mainTabs {
    margin: 0.15rem 0 0.25rem;
    padding: 0 0.37rem;
    height: 0.88rem;
    margin: 0 auto;
    display: flex;
    .tabs {
      width: 6.76rem;
      height: 0.78rem;
      padding: 0 0.07rem;
      // background: url(../assets/img/tabs.png);
      // background-size: 100% 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0.13rem auto 0;
      > a {
        display: block;
        width: 3.33rem;
        height: 0.64rem;
        text-align: center;
        line-height: 0.64rem;
        // background: url(../assets/img/dayTitle.png);
        // background-size: 100% 100%;
        color: rgba(142, 105, 63, 1);
        font-weight: 500;
        &.current {
          color: #fff;
          // background: url(../assets/img/actTabs.png);
          // background-size: 100% 100%;
        }
      }
    }
  }
  .timeTips {
    > p {
      margin-top: 0.11rem;
      width: 6.98rem;
      font-size: 80%;
      color: rgba(238, 172, 104, 1);
    }
  }
  .downTimebox {
    margin: 0 auto;
    width: 7.5rem;
    height: 3.62rem;
    text-align: center;
    background: url(../assets/img/timeBg.png);
    background-size: 100% 100%;
    position: relative;
    padding-top: 0.39rem;
    .timeTips {
      text-align: center;
      color: rgba(255, 205, 118, 1);
      font-size: 0.32rem;
    }
    .timeDown {
      padding: 0 1.3rem;
      margin: 0.26rem auto 0;
      display: flex;
      justify-content: space-between;
      > div {
        height: 100%;
        display: flex;
        align-items: flex-end;
        strong {
          display: block;
          width: 0.86rem;
          height: 0.86rem;
          background: url(../assets/img/timeItemBg.png);
          background-size: 100% 100%;
          text-align: center;
          line-height: 0.86rem;
          font-size: 0.48rem;
          color: rgba(255, 250, 164, 1);
          font-weight: bold;
        }
        em {
          height: 0.3rem;
          font-size: 0.2rem;
          color: rgba(238, 172, 104, 1);
          margin: 0 0 0.15rem 0.05rem;
        }
      }
    }
    .rankTips {
      width: 7.06rem;
      height: 1.78rem;
      background: url(../assets/img/rankTips.png);
      background-size: 100% 100%;
      margin: 0 auto;
    }
    .noTime {
      line-height: 0.45rem;
    }
    .rankTips {
      margin-top: 0.25rem;
      font-size: 0.24rem;
      color: rgba(142, 105, 63, 1);
      span {
        display: block;
      }
    }
  }
  .dayGiftImg {
    width: 6.98rem;
    height: 2.42rem;
    display: block;
    margin: 0.27rem auto 0;
  }
  .list {
    margin: 0.19rem auto;
    width: 7.1rem;
    &.stage3List {
      .uerImg {
        .imgItem {
          width: 0.96rem;
          height: 0.96rem;
          border-radius: 0.16rem;
        }
      }
      .userMsg {
        width: 2.3rem;
        margin-right: 0.15rem;
        .name {
          width: 1.44rem;
          height: 0.54rem;
          padding-left: 0.63rem;
          // background: url(../assets/img/lv0.png);
          // background-size: 100% 100%;
          // &.lv1 {
          //   background: url(../assets/img/lv1.png);
          //   background-size: 100% 100%;
          // }
          // &.lv2 {
          //   background: url(../assets/img/lv2.png);
          //   background-size: 100% 100%;
          // }
          // &.lv3 {
          //   background: url(../assets/img/lv3.png);
          //   background-size: 100% 100%;
          // }
        }
        .score {
          display: flex;
          align-items: center;
          margin-top: 0.06rem;
          i {
            width: 0.4rem;
            height: 0.38rem;
            // background: url(../assets/img/star.png);
            // background-size: 100% 100%;
          }
          strong {
            font-size: 0.26rem;
          }
        }
      }
      .userList {
        flex: 1;
        justify-content: center;
        .userItem {
          margin-right: 0.13rem;
        }
      }
    }
    li {
      height: 1.18rem;
      margin-bottom: 0.2rem;
      // background: url(../assets/img/listItem1.png);
      // background-size: 100% 100%;
      display: flex;
      align-items: center;
      position: relative;
      .rank {
        width: 0.75rem;
        height: 0.65rem;
        font-size: 0.46rem;
        color: rgba(243, 165, 77, 1);
        text-align: center;
        line-height: 0.72rem;
        margin-left: 0.13rem;
      }
      .uerImg {
        width: 1rem;
        height: 1.01rem;
        position: relative;
        margin: 0 0.15rem 0 0.08rem;
        .imgBg {
          width: 1rem;
          height: 1.01rem;
          // background: url(../assets/img/av4.png);
          // background-size: 100% 100%;
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
        .nob {
          width: 1.2rem;
          height: 1.2rem;
          position: absolute;
          top: -0.1rem;
          left: -0.1rem;
          z-index: 10;
        }
        .vip {
          display: block;
          width: 0.8rem;
          height: 0.3rem;
          background: #fc6161;
          font-size: 0.24rem;
          color: #fffca1;
          position: absolute;
          bottom: 0rem;
          border-radius: 0.3rem;
          text-align: center;
          line-height: 0.3rem;
          left: 0.1rem;
          z-index: 11;
        }
      }
      .userMsg {
        width: 2.7rem;
        margin-right: 0.45rem;
        .name,
        .rName {
          height: 0.4rem;
          display: flex;
          align-items: center;
          strong {
            max-width: 1.85rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 0.26rem;
          }
          .live {
            width: 0.78rem;
            height: 0.33rem;
            // background: url(../assets/img/live.png);
            // background-size: 100% 100%;
            margin-left: 0.06rem;
          }
        }
        .rNick {
          color: #ff8cfe;
          margin-top: -0.05rem;
        }
        .score {
          display: flex;
          align-items: center;
          color: rgba(255, 231, 184, 1);
          font-size: 0.22rem;
          font-weight: 500;
          i {
            display: block;
            margin-right: 0.1rem;
            width: 0.22rem;
            height: 0.25rem;
            // background: url(../assets/img/coins.png);
            // background-size: 100% 100%;
          }
        }
      }
      > .score {
        flex: 1;
        .star {
          font-size: 0.32rem;
          display: flex;
          align-items: center;
          i {
            width: 0.4rem;
            height: 0.38rem;
            // background: url(../assets/img/star.png);
            // background-size: 100% 100%;
            margin-right: 0.1rem;
          }
        }
        .num {
          font-size: 0.22rem;
          color: rgba(255, 231, 184, 1);
        }
      }
      .award {
        display: block;
        width: 0.97rem;
        height: 0.77rem;
        // background: url(../assets/img/award.png);
        // background-size: 100% 100%;
        position: absolute;
        bottom: 0;
        right: 1.81rem;
        z-index: 0;
      }
      .userList {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .userItem {
          position: relative;
          .userImgBox {
            display: block;
            width: 0.62rem;
            height: 0.68rem;
            margin: 0 auto;
            position: relative;
            span {
              display: block;
              width: 0.62rem;
              height: 0.68rem;
              position: absolute;
              z-index: 2;
            }
            // .user1 {
            //   background: url(../assets/img/user1.png);
            //   background-size: 100% 100%;
            // }
            // .user2 {
            //   background: url(../assets/img/user2.png);
            //   background-size: 100% 100%;
            // }
            // .user3 {
            //   background: url(../assets/img/user3.png);
            //   background-size: 100% 100%;
            // }
            img {
              width: 0.6rem;
              height: 0.6rem;
              border-radius: 50%;
              position: absolute;
              top: 0.07rem;
              left: 0.01rem;
            }
          }
          strong {
            display: block;
            text-align: center;
            color: rgba(255, 250, 238, 1);
            font-size: 0.2rem;
          }
        }
      }
      // &.rank1 {
      //   background: url(../assets/img/listItem2.png);
      //   background-size: 100% 100%;
      //   .rank {
      //     text-indent: -999rem;
      //     background: url(../assets/img/top1.png);
      //     background-size: 100% 100%;
      //   }
      // }
      // &.rank2 {
      //   background: url(../assets/img/listItem2.png);
      //   background-size: 100% 100%;
      //   .rank {
      //     text-indent: -999rem;
      //     background: url(../assets/img/top2.png);
      //     background-size: 100% 100%;
      //   }
      // }
      // &.rank3 {
      //   background: url(../assets/img/listItem2.png);
      //   background-size: 100% 100%;
      //   .rank {
      //     text-indent: -999rem;
      //     background: url(../assets/img/top3.png);
      //     background-size: 100% 100%;
      //   }
      // }
    }
  }
  .stage2List {
    width: 6.9rem;
    margin: 0.23rem auto 0;
    li {
      height: 2.95rem;
      margin-bottom: 0.2rem;
      // background: url(../assets/img/stage2ListBg.png);
      // background-size: 100% 100%;
      position: relative;
      .jinji {
        display: block;
        width: 1.18rem;
        height: 0.38rem;
        // background: url(../assets/img/jinji.png);
        // background-size: 100% 100%;
        position: absolute;
        top: 0.13rem;
        // &.left {
        //   left: 0;
        //   background: url(../assets/img/jinji2.png);
        //   background-size: 100% 100%;
        // }
        // &.right {
        //   right: 0;
        // }
      }
      // &.min {
      //   height: 2.61rem;
      //   background: url(../assets/img/stage2ListMinBg.png);
      //   background-size: 100% 100%;
      //   .fPeopleList {
      //     width: 6.16rem;
      //     height: 1.04rem;
      //     background: url(../assets/img/minFpeople.png);
      //     background-size: 100% 100%;
      //     .left {
      //       justify-content: center;
      //       .userItem {
      //         margin: 0 0.13rem;
      //       }
      //       strong {
      //         display: block;
      //         text-align: center;
      //       }
      //     }
      //   }
      // }
      .familyMsg {
        height: 1.4rem;
        padding: 0 0.3rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .family {
          display: flex;
          align-items: center;
          img {
            width: 1rem;
            height: 1rem;
            border-radius: 0.16rem;
          }
          .msg {
            margin-left: 0.14rem;
            .nick {
              height: 0.5rem;
              max-width: 2rem;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .star {
              display: flex;
              align-items: center;
              font-size: 0.24rem;
              color: rgba(255, 251, 237, 1);
              i {
                width: 0.31rem;
                height: 0.29rem;
                // background: url(../assets/img/star.png);
                // background-size: 100% 100%;
                margin-right: 0.06rem;
              }
            }
          }
        }
      }
      .fLiner {
        width: 6.3rem;
        height: 0.16rem;
        display: flex;
        align-items: center;
        margin: 0 auto;
        span {
          height: 100%;
        }
        .left {
          width: 50%;
          background: linear-gradient(
            90deg,
            rgba(255, 144, 83, 1) 0%,
            rgba(255, 58, 58, 1) 39%
          );
          border-radius: 0.08rem 0 0 0.08rem;
          position: relative;
          .giftBox {
            position: absolute;
            width: 0.53rem;
            height: 0.54rem;
            // background: url(../assets/img/giftBox.png);
            // background-size: 100% 100%;
            right: -0.27rem;
            top: -0.24rem;
          }
        }
        .right {
          flex: 1;
          border-radius: 0 0.08rem 0.08rem 0;
          background: linear-gradient(
            90deg,
            rgba(255, 141, 40, 1) 39%,
            rgba(255, 208, 106, 1) 100%
          );
        }
      }
      .family2 {
        .msg {
          margin-right: 0.14rem;
        }
        .noOpponents {
          font-size: 0.24rem;
          color: rgba(255, 245, 129, 1);
        }
      }
      .fPeopleList {
        width: 6.08rem;
        height: 1.04rem;
        // background: url(../assets/img/fPeopleBg.png);
        // background-size: 100% 100%;
        margin: 0.13rem auto 0;
        display: flex;
        align-items: center;
        > div {
          flex: 1;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          &.left {
            margin-left: -0.16rem;
          }
          &.right {
            margin-right: -0.16rem;
          }
          .userItem {
            position: relative;
            margin-right: 0.13rem;
            .userImgBox {
              display: block;
              width: 0.62rem;
              height: 0.68rem;
              margin: 0 auto;
              position: relative;
              span {
                display: block;
                width: 0.62rem;
                height: 0.68rem;
                position: absolute;
                z-index: 2;
              }
              // .user1 {
              //   background: url(../assets/img/user1.png);
              //   background-size: 100% 100%;
              // }
              // .user2 {
              //   background: url(../assets/img/user2.png);
              //   background-size: 100% 100%;
              // }
              // .user3 {
              //   background: url(../assets/img/user3.png);
              //   background-size: 100% 100%;
              // }
              img {
                width: 0.6rem;
                height: 0.6rem;
                border-radius: 50%;
                position: absolute;
                top: 0.07rem;
                left: 0.01rem;
              }
            }
            strong {
              display: block;
              text-align: center;
              color: rgba(255, 250, 238, 1);
              font-size: 0.2rem;
            }
          }
        }
        .vs {
          width: 1.4rem;
          height: 1.38rem;
          // background: url(../assets/img/vs.png);
          // background-size: 100% 100%;
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
  // background-size: contain;
  transition: all 1s;
  text-indent: -999rem;
  z-index: 100;
}
</style>
