<template>
  <div class="rankGroups">
    <div class="liner"></div>
    <!-- 日榜、总榜切换主Tabs -->
    <div class="mainTabs">
      <div class="tabs">
        <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" href="">BXH ngày</a>
        <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" href="">BXH tổng</a>
      </div>
      <a @click.prevent="onRefresh" href="" v-if="tab == nowDay && !isShare && actStatus===1" :style="{transform:'rotate('+rotatePx+'deg)'}" id="refresh"></a>
    </div>
    <!-- <div v-if="mainTab==0" class="tabs">
      <a @click.prevent="tabClick(0)" :class="{current:tab==0}" href="">日榜1</a>
      <a @click.prevent="tabClick(1)" :class="{current:tab==1}" href="">日榜2</a>
      <a @click.prevent="tabClick(2)" :class="{current:tab==2}" href="">日榜3</a>
    </div> -->
    <div class="downTimebox">
      <div v-if="mainTab == 0">
        <p v-if="tab == nowDay && actStatus == 1">Đếm ngược kết thúc BXH hôm nay</p>
        <p v-else-if="tab >= nowDay">Đếm ngược mở BXH ngày này</p>
        <div class="noTime" v-else>BXH ngày này đã kết thúc</div>
      </div>
      <div v-if="mainTab == 1">
        <p v-if="actStatus == 0">Đếm ngược mở BXH tổng</p>
        <p v-else-if="actStatus == 1">Đếm ngược kết thúc BXH tổng</p>
        <div class="noTime" v-else>BXH tổng đã kết thúc</div>
      </div>
      <div class="timeDown" v-if="tab >= nowDay && surplusTime.day">
        <div class="day">
          <strong>{{surplusTime.day}}</strong>
          <em>ngày</em>
        </div>
        <div class="hours">
          <strong>{{surplusTime.hour}}</strong>
          <em>giờ</em>
        </div>
        <div class="min">
          <strong>{{surplusTime.minute}}</strong>
          <em>phút</em>
        </div>
        <div class="second">
          <strong>{{surplusTime.second}}</strong>
          <em>giây</em>
        </div>
      </div>
    </div>
    <!-- 日榜 -->
    <DayTabs v-if="mainTab==0" @changeClick="tabClick" :tab="tab"></DayTabs>
    <div class="list day" v-if="mainTab==0">
      <p class="tips">Điểm lộ trình=Điểm mị tặng quà xu phòng kara/bài hát/radio</p>
      <ul>
        <li v-for="(item,index) in rank.list" :key="index" :class="'rank'+item.rank" @click="goUser(item.uid)">
          <div class="rank">{{item.rank}}</div>
          <div class="userMsg">
            <div class="uerImg">
              <span class="imgBg"></span>
              <img v-lazy="item.avatar" alt="" class="imgItem">
            </div>
            <div class="name">
              <div class="userName">{{item.nick}}</div>
              <div class="carName">{{getCar(item.score).name}}</div>
            </div>
            <div class="car">
              <img :src="getCar(item.score).img" alt="" :class="'car'+getCar(item.score).lv">
            </div>
            <div class="score">{{item.score}} <i></i> </div>
            <div class="bonus" v-if="item.scale>0">Tăng {{item.scale}} %</div>
          </div>
        </li>
      </ul>
    </div>

    <!-- 总榜 -->
    <div v-else-if="mainTab==1" class="list total">
      <p class="tips">Điểm lộ trình=Điểm mị tặng quà xu phòng kara/bài hát/radio</p>
      <ul>
        <li v-for="(item,index) in rank.list" :key="index" :class="'rank'+item.rank" @click="goUser(item.uid)">
          <div class="rank">{{item.rank}}</div>
          <div class="userMsg">
            <div class="uerImg">
              <span class="imgBg"></span>
              <img v-lazy="item.avatar" alt="" class="imgItem">
            </div>
            <div class="name">
              <div class="userName">{{item.nick}}</div>
              <div class="carName">{{getCar(item.score).name}}</div>
            </div>
            <div class="car">
              <img :src="getCar(item.score).img" alt="" :class="'car'+getCar(item.score).lv">
            </div>
            <div class="score">{{item.score}} <i></i> </div>
            <div class="bonus" v-if="item.scale>0">Tăng {{item.scale}} %</div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 任務列表 -->
    <!-- <taskList v-else></taskList> -->
    <!-- 日榜和总榜共用Loading（如果需要细化加载提示文案，可以把以下标签复制到不同的榜单后面） -->
    <div v-if="rank.loading" class="scrollLoading">Đang tải...</div>
    <div v-if="rank.none  && (rank.list.length == 0 && (tab <= nowDay || tab ==='total'))" class="scrollNone">
      Chưa có ai được xếp hạng</br>
      Chỗ trống đang đợi bạn đấy!！
    </div>
    <div v-if="mainTab==0 && tab > nowDay" class="dengdai">Hãy chờ đợi！</div>
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
import carList from "../config/cars"
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
    ...mapState(['rankGroups', "nowDay", "inited", "isShare", "actStatus", "dateArr"]),
    rankKey() {
      // return ['one', 'two', 'three'][this.tab];
      return this.mainTab == 1 ? 'total' : this.tab;
    },
    rankApi() {
      if (this.isShare) {
        var dayApi = `/happy_fly_car/rank.php?from={from}&date={date}`;
        var totalApi = `/happy_fly_car/rank.php?from={from}&date=0`;
        var api = this.rankKey == 'total' ? totalApi : dayApi;
        return api.replace('{date}', this.getDate(this.dateArr[this.tab - 1]))
      } else {
        var dayApi = `/kroom_singer/allList.php?token={token}&from={from}&tm={date}`;
        var totalApi = `/kroom_singer/allList.php?token={token}&from={from}&tm=0`;
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
      this.mainTab = tab;
      this.$store.commit("changTab", this.rankKey)
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      })
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
      if (this.inited === 0) { //初始化是少一次請求,是日榜的时候和不是总榜的时候返回
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
            // }
            const arr = response_data.list;
            //跟随榜单变换个人信息
            if (response_data.myrank && response_data.myrank.avatar) {
              this.$store.commit("changGroupsUserMsg", {//初始当前日榜个人信息
                key: this.rankKey,
                msg: response_data.myrank
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
    },
    getCar(score) {
      for (let i = carList.length - 1; i >= 0; i--) {
        if (score >= carList[i].score) {
          return carList[i]
        }
      }
      return {}
    }
  },
}
</script>

<style lang="scss">
.rankGroups {
  margin-top: 0.1rem;
  padding-bottom: 2rem;
  position: relative;
  .liner {
    width: 7.5rem;
    height: 1.69rem;
    position: absolute;
    top: 1.1rem;
    z-index: 0;
    background: url(../assets/img/liner.png);
    background-size: 100% 100%;
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
      width: 6.84rem;
      height: 0.98rem;
      padding: 0 0.07rem;
      background: url(../assets/img/tabs.png);
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      a {
        display: block;
        width: 3.59rem;
        height: 0.84rem;
        text-align: center;
        line-height: 0.84rem;
        color: #d5b49f;
        &.current {
          color: #642002;
          background: url(../assets/img/actTab.png);
          background-size: 100% 100%;
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
  .downTimebox {
    margin: 0.11rem auto 0;
    width: 6.98rem;
    text-align: center;
    position: relative;
    > p {
      width: 6.98rem;
      color: #b68885;
      font-size: 0.26rem;
    }
    .timeDown {
      width: 5.15rem;
      height: 0.6rem;
      padding: 0 0.09rem;
      margin: 0.17rem auto 0;
      background: url(../assets/img/timeDown.png);
      background-size: 100% 100%;
      display: flex;
      justify-content: space-between;
      > div {
        height: 100%;
        line-height: 0.6rem;
        display: flex;
        align-items: center;
        strong {
          display: block;
          width: 0.73rem;
          height: 0.42rem;
          line-height: 0.42rem;
          background: url(../assets/img/actTimeBg.png);
          background-size: 100% 100%;
        }
        em {
          font-size: 0.24rem;
          color: #222426;
          margin: 0.1rem 0 0 0.05rem;
        }
      }
    }
    .noTime {
      line-height: 0.6rem;
    }
  }
  .list {
    margin: 0.25rem auto;
    width: 7.26rem;
    background: url(../assets/img/rankTips.png) no-repeat;
    background-size: 100% auto;
    position: relative;
    z-index: 10;
    p {
      text-align: center;
      font-size: 0.22rem;
      color: #d5b49f;
      font-weight: 500;
      height: 0.5rem;
      line-height: 0.5rem;
      margin-bottom: 0.2rem;
    }
    li {
      height: 1.25rem;
      margin-top: 0.05rem;
      display: flex;
      align-items: center;
      .rank {
        width: 0.82rem;
        height: 0.82rem;
        color: #472400;
        text-align: center;
        line-height: 0.82rem;
        margin-left: 0.11rem;
        font-weight: bold;
        background: url(../assets/img/rankBg.png);
        background-size: 100% 100%;
      }
      .userMsg {
        width: 6.17rem;
        height: 1.22rem;
        background: url(../assets/img/listItem.png);
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        position: relative;
        .uerImg {
          width: 1.25rem;
          height: 1.25rem;
          position: relative;
          .imgItem {
            width: 0.85rem;
            height: 0.85rem;
            position: absolute;
            top: 0.2rem;
            left: 0.2rem;
            border-radius: 50%;
            z-index: 10;
          }
        }
        .name {
          width: 1.7rem;
          .userName {
            height: 0.4rem;
            line-height: 0.4rem;
            max-width: 1.7rem;
            color: #3f3f3f;
            font-size: 0.24rem;
            font-weight: 500;
            text-indent: 0.1rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .carName {
            width: 2.24rem;
            height: 0.33rem;
            line-height: 0.33rem;
            font-style: italic;
            color: rgba(255, 196, 160, 1);
            font-size: 0.24rem;
            font-weight: 500;
            text-indent: 0.3rem;
            background: url(../assets/img/carNameBg.png);
            background-size: 100% 100%;
          }
        }
        .car {
          width: 1.25rem;
          display: flex;
          justify-content: center;
          margin: 0.2rem 0 0 0.2rem;
          .car1 {
            width: 0.54rem;
            height: 0.47rem;
          }
          .car2 {
            width: 0.78rem;
            height: 0.48rem;
          }
          .car3 {
            width: 1.1rem;
            height: 0.36rem;
          }
          .car4 {
            width: 1.15rem;
            height: 0.41rem;
          }
          .car5 {
            width: 1.15rem;
            height: 0.36rem;
          }
          .car6 {
            width: 1.25rem;
            height: 0.39rem;
          }
        }
        .score {
          color: #ffc350;
          font-style: italic;
          font-weight: 500;
          margin: 0 0 0 0.1rem;
          i {
            display: block;
            width: 1.15rem;
            height: 0.08rem;
            background: url(../assets/img/jiao.png);
            background-size: 100% 100%;
            margin: 0.1rem 0 0 -0.2rem;
          }
        }
        .bonus {
          width: 1.49rem;
          height: 0.31rem;
          background: url(../assets/img/bonus.png);
          background-size: 100% 100%;
          text-align: center;
          line-height: 0.31rem;
          font-size: 0.22rem;
          font-style: italic;
          color: rgba(255, 255, 255, 1);
          position: absolute;
          bottom: 0rem;
          right: -0.03rem;
        }
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
          position: absolute;
          top: -0.11rem;
          left: 0.06rem;
          background: url(../assets/img/av1.png);
          background-size: 100% 100%;
          z-index: 11;
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
          position: absolute;
          top: -0.11rem;
          left: 0.06rem;
          background: url(../assets/img/av2.png);
          background-size: 100% 100%;
          z-index: 11;
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
          position: absolute;
          top: -0.11rem;
          left: 0.06rem;
          background: url(../assets/img/av3.png);
          background-size: 100% 100%;
          z-index: 11;
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
