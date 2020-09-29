<template>
  <div class="rankGroups">
    <p class="rankTips">報名活動成為小搗蛋>>收到糖果和指定禮物>>獲得狂歡值 <i @click="scorePupClick()"></i></p>
    <img src="../assets/img/giftImg.png" alt="" class="giftImg">
    <!-- 日榜、总榜切换主Tabs -->
    <div class="listBog">
      <div class="mainTabs">
        <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" class="tabL">日榜</a>
        <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" class="tabR">總榜</a>
        <!-- <a @click.prevent="onRefresh" href="" v-if="!isShare && actStatus===1" :style="{transform:'rotate('+rotatePx+'deg)'}" id="refresh"></a> -->
      </div>
      <div class="timeBox">
        <div class="title">- 結束倒計時 -</div>
        <div class="actTime">
          <span>{{surplusTime.day}}</span>
          <em>天</em>
          <span>{{surplusTime.hour}}</span>
          <em>時</em>
          <span>{{surplusTime.minute}}</span>
          <em>分</em>
          <span>{{surplusTime.second}}</span>
          <em>秒</em>
        </div>
      </div>
      <!-- 搜索框 -->
      <div class="shareBtn">
        <input type="number" v-model="searchUid" placeholder="填寫UID搜索小搗蛋">
        <i @click="search()"></i>
      </div>
      <!-- 日榜 -->
      <div class="list day">
        <li v-for="(item,index) in rank.list" :key="index" :class="'list'+item.rank">
          <!-- v-if="item.rid > 0" -->
          <i class="ing" :class="{yel:item.rank > 3}" v-if="item.rid > 0"></i>
          <div class="userRank"><em v-if="item.rank >3"> {{item.rank}}</em></div>
          <div class="imgBox">
            <div class="userImg" @click="goUser(item.uid)">
              <span class="avBg" :class="'avBg' + item.rank" v-if="item.rank<=3"></span>
              <img v-lazy="item.avatar" alt="">
            </div>
            <strong>{{item.nick}}</strong>
          </div>
          <div class="userScore">
            <div class="total">總狂歡值 {{item.sugar_score*1 + item.gift_score*1}}</div>
            <div class="score1">糖果狂歡值 {{item.sugar_score}}</div>
            <div class="score1">派對狂歡值 {{item.gift_score}}</div>
          </div>
          <div class="peopleList" v-if="item.rank <=3">
            <div class="userList">
              <span>貢獻榜Top3</span>
              <div class="items">
                <img v-lazy="item2.avatar" alt="" v-for="(item2,index2) in item.guard" :key="index2" @click="goUser(item2.uid)">
              </div>
            </div>
            <div class="pupIcon" @click="showTeamList(item.uid)">
              查看貢獻榜>>
            </div>
          </div>
        </li>
      </div>
      <!-- 日榜和总榜共用Loading（如果需要细化加载提示文案，可以把以下标签复制到不同的榜单后面） -->
      <div v-if="rank.loading" class="scrollLoading">加載中...</div>
      <div v-if="rank.none" class="scrollNone">
        暫無歌友上榜
      </div>
    </div>
    <!-- 搜索結果 -->
    <div class="mask" v-show="showitemList">
      <transition name="slide">
        <div class="searchList" :class="'list'+itemMsg.rank" v-if="showitemList">
          <i class="ing" :class="{yel:itemMsg.rank > 3}" v-if="itemMsg.rid > 0"></i>
          <div class="userRank"><em v-if="itemMsg.rank >3"> {{itemMsg.rank}}</em></div>
          <div class="imgBox">
            <div class="userImg" @click="goUser(itemMsg.uid)">
              <span class="avBg" :class="'avBg' + itemMsg.rank" v-if="itemMsg.rank<=3"></span>
              <img v-lazy="itemMsg.avatar" alt="">
            </div>
            <strong>{{itemMsg.nick}}</strong>
          </div>
          <div class="userScore">
            <div class="total">總狂歡值 {{itemMsg.sugar_score*1 + itemMsg.gift_score*1}}</div>
            <div class="score1">糖果狂歡值 {{itemMsg.sugar_score}}</div>
            <div class="score1">派對狂歡值 {{itemMsg.gift_score}}</div>
          </div>
          <div class="peopleList" v-if="itemMsg.rank <=3">
            <div class="userList">
              <span>貢獻榜Top3</span>
              <div class="items">
                <img v-lazy="item2.avatar" alt="" v-for="(item2,index2) in itemMsg.guard" :key="index2" @click="goUser(item2.uid)">
              </div>
            </div>
            <div class="pupIcon" @click="showTeamList(itemMsg.uid)">
              查看貢獻榜>>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <!-- 守護榜 -->
    <div class="mask" v-show="showPlist">
      <transition name="slide">
        <div class="peopleListPup" v-show="showPlist">
          <i class="close" @click="closePlist()"></i>
          <h5 class="pupTitle"><strong>{{pupMsg.info.nick}}</strong>的貢獻榜</h5>
          <div class="peopleItem">
            <div class="listHeader">
              <span class="rank">排名</span>
              <span class="user">用戶</span>
              <span class="score">總貢獻榜狂歡值</span>
            </div>
            <p class="noData" v-if="pupMsg.list.length == 0">暫無數據</p>
            <ul class="scrollable">
              <li v-for="(item,index) in pupMsg.list" :key="index" @click="goUser(item.uid)">
                <div class="rank">{{item.rank}}</div>
                <div class="user">
                  <img v-lazy="item.avatar" alt="">
                  <div class="nick">{{item.nick}}</div>
                </div>
                <div class="score">{{item.score}}</div>
              </li>
            </ul>
            <p class="listRankTips">
              *总贡献值为粉丝同一名用户的所有参加活动的声音
              作品的贡献狂欢值综合；若声音作品被删除，对应的
              狂欢之也会被删除；榜单显示前20名粉丝
            </p>
            <div class="goBtn" @click="goUser(pupMsg.info.uid)">查看他的個人資料頁</div>
          </div>
        </div>
      </transition>
    </div>
    <!-- 分值提示 -->
    <div class="mask" v-show="scoreTips">
      <transition name="slide">
        <div class="scoreTips" v-show="scoreTips">
          <div class="title">狂歡值</div>
          <h6>狂歡值=糖果狂歡值+派對狂歡值</h6>
          <p>糖果狂歡值=收到糖果數x10<br />
            派對狂歡值=玩家在房間收到指定禮物的價值x12
          </p>
          <div class="ok" @click="scorePupClick()">我知道了</div>
        </div>
      </transition>
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
  props: ['type'],
  data() {
    return {
      mainTab: 0,
      tab: 1,
      surplusTime: {},//日榜剩余时间
      timer: null,
      timer2: null,
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
      searchUid: '',
      itemMsg: {},
      pupMsg: {
        info: {},
        list: []
      },
      showitemList: false,
      nick: '',
      showPlist: false,
      loaded: false,
      more: true,
      pupUid: 0,
      scoreTips: false

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
        var dayApi = `/index.php?action=richMan.rank&signture=innerserver&type={type}&signture=innerserver&from={from}`;
        return dayApi.replace('{type}', this.rankKey == 'total' ? 2 : 1)
      } else {
        var dayApi = `/index.php?action=halloweenParty.rank&signture=innerserver&from={from}&type={type}&uid={uid}&token={token}`;
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
    }
  },
  mounted() {
    this.onScroll(); // 如果默认展示的Tabs依赖服务器配置，把此方法移到watch中去调用（watch更新Tabs值后调onScroll）
    // 如果初始化接口返回当前榜单数据，可以在Store的Action拿到服务器数据时先调用commit('updateRankGroups', {key:key, list:[]})，再更新state.tab触发组件watch
    window.addEventListener('scroll', this.onScroll);
    //守護榜分頁
    this.scrollable = this.$el.querySelector('.scrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.pupOnScroll);
    }
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
    showTeamList(uid, nick) {
      this.pupUid = uid
      api.teamList(uid, 0).then(res => {
        this.pupMsg = res.data.response_data
        this.showPlist = true
      })
    },
    closePlist() {
      this.showPlist = false
    },
    search() {
      api.search(this.searchUid).then(res => {
        if (res.data.response_status.code == 0) {
          this.itemMsg = res.data.response_data
          this.showitemList = true
        } else {
          this.vxc('setToast', {
            msg: res.data.response_status.error
          })
        }
      })
    },
    onScroll() {
      // if (this.inited === 0) { //初始化是少一次請求,是日榜的时候和不是总榜的时候返回
      //   return
      // }
      // if (this.tab > this.nowDay) return (this.tab > this.nowDay && this.rankKey !== 'total') || 
      if (!this.rank.loading && !this.rank.loadEnd && this.type === 'TabsScrollLoadList') {
        const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100;
        const notFull = document.body.scrollHeight < window.innerHeight;
        if (scrollToBottom || notFull || !this.rank.loadCount) {
          const key = this.rankKey;

          const set = (k, v) => {
            this.$store.commit('updateRankGroups', { key, [k]: v });
          };
          set('loading', true);
          axios.get(this.rankApi.replace('{from}', this.rank.list.length)).then(res => {

            const { response_status, response_data } = res.data;

            if (response_status.code != 0) {
              set('loadEnd', true);
              return;
            }
            // if (this.tab >= this.nowDay && this.mainTab == 0) {
            // if (this.rankKey == 'total') {
            //   set('second', this.total.dtime)
            // } else {
            //   set('second', this.day.dtime)
            // }
            // }
            const arr = response_data.list;
            //跟随榜单变换个人信息
            if (response_data.rank && response_data.rank.uid) {
              this.$store.commit("changGroupsUserMsg", {//初始当前日榜个人信息
                key: this.rankKey,
                msg: response_data.rank
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
            set('loading', false);
          }).catch(err => {
            set('loading', false);
            set('loadEnd', true);
          });

        }
      }
    },
    pupOnScroll() {
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.loaded) return
        if (this.more) {
          this.more = false
          api.teamList(this.pupUid, this.pupMsg.list.length, 'more').then(res => {
            this.more = true
            if (res.data.response_data.list.length === 0) {
              this.loaded = true
            } else {
              this.pupMsg.list = this.pupMsg.list.concat(res.data.response_data.list)
            }
          })
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
      var isiOS = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      if (isiOS) {
        sendJsData('app://userInfo?uid=' + uid);
      } else {
        javascript: JSInterface.sendJsData('app://userInfo?uid=' + uid);
      }
    },
    scorePupClick() {
      this.scoreTips = !this.scoreTips
    }
  },
}
</script>

<style lang="scss">
.rankGroups {
  position: relative;
  // background: #f8ffe6 url(../assets/img/listBg.png) no-repeat;
  // background-size: 100% auto;
  margin: 0.2rem auto;
  padding-bottom: 2rem;

  .noData {
    text-align: center;
    font-size: 0.26rem;
    margin-top: 0.25rem;
  }
  .rankTips {
    font-size: 0.22rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    i {
      width: 0.18rem;
      height: 0.18rem;
      background: url(../assets/img/quest.png);
      background-size: 100% 100%;
      margin-left: 0.1rem;
    }
  }
  .giftImg {
    display: block;
    width: 7.07rem;
    height: 5.28rem;
    margin: 0.1rem auto 0;
  }
  .listBog {
    width: 7.48rem;
    min-height: 14rem;
    background: url(../assets/img/listBg.png) no-repeat;
    background-size: 100% auto;
    padding-top: 2.18rem;
  }
  .mainTabs {
    display: flex;
    width: 6.09rem;
    height: 0.79rem;
    background: url(../assets/img/tabs2.png);
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    a {
      flex: 1;
      height: 100%;
      text-align: center;
      line-height: 0.79rem;
      &.current {
        color: #fff;
        background: url(../assets/img/actTab2.png);
        background-size: 100% 100%;
      }
    }
  }
  .timeBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title {
      height: 0.61rem;
      line-height: 0.61rem;
      text-align: center;
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
        // background: RGBA(75, 59, 104, 1);
        border-radius: 0.1rem;
      }
      em {
        color: rgba(245, 223, 172, 1);
        font-size: 0.22rem;
        margin: 0.1rem 0.15rem 0 0.15rem;
      }
    }
  }
  .list {
    width: 6.62rem;
    margin: 0.3rem auto;
    position: relative;
    z-index: 1000;
    li {
      height: 1.89rem;
      background: url(../assets/img/listItem.png);
      background-size: 100% 100%;
      margin-bottom: 0.1rem;
      display: flex;
      align-items: center;
      position: relative;
      .ing {
        display: block;
        width: 0.95rem;
        height: 0.28rem;
        background: url(../assets/img/ing.png);
        background-size: 100% 100%;
        position: absolute;
        top: 0.22rem;
        right: 0.31rem;
        &.yel {
          background: url(../assets/img/ing2.png);
          background-size: 100% 100%;
        }
      }
      .userRank {
        width: 1.44rem;
        display: flex;
        justify-content: center;
      }
      .imgBox {
        width: 1.5rem;
        .userImg {
          width: 1.23rem;
          height: 1.38rem;
          position: relative;
          margin: 0 auto;
          .avBg {
            width: 1.23rem;
            height: 1.38rem;
            position: absolute;
            z-index: 10;
            &.avBg1 {
              background: url(../assets/img/av1.png);
              background-size: 100% 100%;
            }
            &.avBg2 {
              background: url(../assets/img/av2.png);
              background-size: 100% 100%;
            }
            &.avBg3 {
              background: url(../assets/img/av3.png);
              background-size: 100% 100%;
            }
          }
          img {
            width: 1.09rem;
            height: 1.09rem;
            border-radius: 50%;
            position: absolute;
            top: 0.25rem;
            left: 0.06rem;
            box-sizing: border-box;
            border: 0.03rem solid #fedf74;
          }
        }
        strong {
          display: block;
          font-size: 0.23rem;
          text-align: center;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .userScore {
        margin-left: 0.3rem;
        .total {
          font-size: 0.27rem;
          font-weight: 600;
          margin-bottom: 0.22rem;
        }
        .score1 {
          font-size: 0.18rem;
        }
      }
      .peopleList {
        width: 100%;
        height: 0.62rem;
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.2rem;
        .userList {
          margin-left: 0.23rem;
          display: flex;
          align-items: center;
          .items {
            display: flex;
            // justify-content: space-between;
            margin-left: 0.3rem;
            width: 1.3rem;
            img {
              width: 0.33rem;
              height: 0.33rem;
              border-radius: 50%;
              margin-right: 0.06rem;
            }
          }
        }
        .pupIcon {
          color: rgba(255, 246, 213, 1);
          margin-right: 1.11rem;
        }
      }
      &.list1 {
        padding-bottom: 0.62rem;
        background: url(../assets/img/1.png);
        background-size: 100% 100%;
      }
      &.list2 {
        padding-bottom: 0.62rem;
        background: url(../assets/img/2.png);
        background-size: 100% 100%;
      }
      &.list3 {
        padding-bottom: 0.62rem;
        background: url(../assets/img/3.png);
        background-size: 100% 100%;
      }
    }
  }
}
.searchList {
  width: 6.62rem;
  height: 1.89rem;
  background: url(../assets/img/listItem.png);
  background-size: 100% 100%;
  margin-bottom: 0.1rem;
  display: flex;
  align-items: center;
  position: relative;
  .ing {
    display: block;
    width: 0.95rem;
    height: 0.28rem;
    background: url(../assets/img/ing.png);
    background-size: 100% 100%;
    position: absolute;
    top: 0.22rem;
    right: 0.31rem;
    &.yel2 {
      background: url(../assets/img/ing2.png);
      background-size: 100% 100%;
    }
  }
  .userRank {
    width: 1.44rem;
    display: flex;
    justify-content: center;
  }
  .imgBox {
    width: 1.5rem;
    .userImg {
      width: 1.23rem;
      height: 1.38rem;
      position: relative;
      margin: 0 auto;
      .avBg {
        width: 1.23rem;
        height: 1.38rem;
        position: absolute;
        z-index: 10;
        &.avBg1 {
          background: url(../assets/img/av1.png);
          background-size: 100% 100%;
        }
        &.avBg2 {
          background: url(../assets/img/av2.png);
          background-size: 100% 100%;
        }
        &.avBg3 {
          background: url(../assets/img/av3.png);
          background-size: 100% 100%;
        }
      }
      img {
        width: 1.09rem;
        height: 1.09rem;
        border-radius: 50%;
        position: absolute;
        top: 0.25rem;
        left: 0.06rem;
        box-sizing: border-box;
        border: 0.03rem solid #fedf74;
      }
    }
    strong {
      display: block;
      font-size: 0.23rem;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .userScore {
    margin-left: 0.3rem;
    .total {
      font-size: 0.27rem;
      font-weight: 600;
      margin-bottom: 0.22rem;
    }
    .score1 {
      font-size: 0.18rem;
    }
  }
  .peopleList {
    width: 100%;
    height: 0.62rem;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.2rem;
    .userList {
      margin-left: 0.23rem;
      display: flex;
      align-items: center;
      .items {
        display: flex;
        // justify-content: space-between;
        margin-left: 0.3rem;
        width: 1.3rem;
        img {
          width: 0.33rem;
          height: 0.33rem;
          border-radius: 50%;
          margin-right: 0.06rem;
        }
      }
    }
    .pupIcon {
      color: rgba(255, 246, 213, 1);
      margin-right: 1.11rem;
    }
  }
  &.list1 {
    padding-bottom: 0.62rem;
    background: url(../assets/img/1.png);
    background-size: 100% 100%;
  }
  &.list2 {
    padding-bottom: 0.62rem;
    background: url(../assets/img/2.png);
    background-size: 100% 100%;
  }
  &.list3 {
    padding-bottom: 0.62rem;
    background: url(../assets/img/3.png);
    background-size: 100% 100%;
  }
}
.peopleListPup {
  width: 6.91rem;
  height: 8.8rem;
  background: url(../assets/img/peopleListBg.png);
  background-size: 100% 100%;
  padding-top: 1rem;
  position: relative;
  .pupTitle {
    font-size: 0.3rem;
    strong {
      max-width: 2rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .close {
    display: block;
    width: 0.95rem;
    height: 0.95rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: -0.2rem;
    top: 0.63rem;
  }
  h5 {
    width: 6.06rem;
    height: 0.8rem;
    text-align: center;
    line-height: 0.95rem;
    color: rgba(108, 39, 194, 1);
    font-size: 0.35rem;
    margin: 0 auto;
  }
  .peopleItem {
    width: 6.3rem;
    margin: 0 auto;
    margin-top: 0.2rem;
    .listHeader {
      display: flex;
      align-items: center;
      span {
        text-align: center;
        font-size: 0.22rem;
        color: rgba(255, 237, 130, 1);
      }
      .rank {
        width: 1.5rem;
      }
      .user {
        width: 3rem;
      }
      .score {
        flex: 1;
      }
    }
    ul {
      height: 5.85rem;
      overflow-y: scroll;
      li {
        display: flex;
        align-items: center;
        text-align: center;
        .rank {
          width: 1.5rem;
          text-align: center;
        }
        .user {
          width: 3rem;
          display: flex;
          align-items: center;
          img {
            width: 0.91rem;
            height: 0.91rem;
            border-radius: 50%;
            margin-right: 0.1rem;
          }
          .nick {
            font-size: 0.26rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .score {
          color: rgba(255, 237, 130, 1);
          font-size: 0.22rem;
          flex: 1;
        }
      }
    }
    .listRankTips {
      text-align: center;
      font-size: 0.23rem;
    }
    .goBtn {
      width: 3.65rem;
      height: 0.94rem;
      text-align: center;
      line-height: 0.94rem;
      background: url(../assets/img/actTab.png);
      background-size: 100% 100%;
      position: absolute;
      left: 1.65rem;
    }
  }
}
.shareBtn {
  width: 6.45rem;
  height: 0.63rem;
  border-radius: 0.23rem;
  display: flex;
  align-items: center;
  margin: 0.21rem auto 0;
  background: url(../assets/img/search.png);
  background-size: 100% 100%;
  input {
    width: 5rem;
    margin-left: 0.6rem;
    color: rgba(74, 14, 147, 1);
    font-size: 0.22rem;
    height: 100%;
  }
  input::-webkit-input-placeholder {
    color: rgba(74, 14, 147, 1);
    font-size: 0.22rem;
  }
  i {
    width: 0.29rem;
    height: 0.29rem;
    background: url(../assets/img/cha.png);
    background-size: 100% 100%;
    margin-left: 0.05rem;
  }
}

.scoreTips {
  width: 7.48rem;
  height: 3rem;
  padding-top: 1.11rem;
  background: url(../assets/img/scoreTips.png);
  background-size: 100% 100%;
  position: relative;
  .title {
    height: 0.7rem;
    line-height: 0.7rem;
    font-weight: 600;
    font-size: 0.35rem;
    text-align: center;
    color: rgba(107, 38, 193, 1);
  }
  h6 {
    height: 0.9rem;
    line-height: 0.9rem;
    padding-left: 0.92rem;
    color: rgba(107, 38, 193, 1);
    font-size: 0.32rem;
    font-weight: 600;
  }
  p {
    font-size: 0.23rem;
    padding-left: 0.92rem;
  }
  .ok {
    width: 2.6rem;
    height: 0.97rem;
    text-align: center;
    line-height: 0.97rem;
    background: url(../assets/img/ok.png);
    background-size: 100% 100%;
    position: absolute;
    bottom: -0.4rem;
    left: 2.26rem;
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
