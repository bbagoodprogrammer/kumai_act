<template>
  <div class="rankGroups">
    <div class="liner"></div>
    <!-- 日榜、总榜切换主Tabs -->
    <div class="mainTabs">
      <div class="tabs" :class="{current:mainTab==1}">
        <a @click.prevent="mainTabClick(0)" href="" class="tab1"><i :class="{act:mainTab==1}"></i></a>
        <a @click.prevent="mainTabClick(1)" href="" class="tab2"><i :class="{act:mainTab==1}"></i></a>
      </div>
      <a @click.prevent="onRefresh" href="" v-if="tab == nowDay && !isShare && actStatus===1" :style="{transform:'rotate('+rotatePx+'deg)'}" id="refresh"></a>
    </div>
    <!-- <div v-if="mainTab==0" class="tabs">
      <a @click.prevent="tabClick(0)" :class="{current:tab==0}" href="">日榜1</a>
      <a @click.prevent="tabClick(1)" :class="{current:tab==1}" href="">日榜2</a>
      <a @click.prevent="tabClick(2)" :class="{current:tab==2}" href="">日榜3</a>
    </div> -->
    <p class="dayTips" v-if="mainTab == 1">依據K房多人娛樂分組模式下報名用戶收禮金幣魅力之總和排名</p>
    <p class="dayTips" v-else> 與隊長組隊參與分組PK可積累戰隊積分，依據總積分排名。上麥收禮1金幣魅力值=1積分，僅計算K房多人分組模式數據</p>
    <TeamSearch v-if="userMsg.registered && !leader" />
    <!-- 日榜 -->
    <div class="list day" v-if="mainTab==0">
      <ul>
        <li v-for="(item,index) in rank.list" :key="index" :class="'rank'+item.rank">
          <span class="rank">{{item.rank}}</span>
          <div class="imgBox" @click.stop="showFamily(item.uid)">
            <span class="avBg"></span>
            <img v-lazy="item.avatar" alt="" class="av">
          </div>
          <div class="msg">
            <div class="nick">{{item.nick}}</div>
            <div class="score"> <i></i> {{item.score}}</div>
          </div>
          <div class="peopleList">
            <span v-for="(item2,index2) in item.list " :key="index2">
              <img v-lazy="item2.avatar" alt="" @click="goPeople(item2.uid)">
              <strong>{{item2.score}}</strong>
            </span>
            <span class="add" v-if="!leader" @click="addFamily(item)">
              <img src="../assets/img/addIcon.png" alt="">
              <strong>加入</strong>
            </span>
          </div>
        </li>
      </ul>
    </div>

    <!-- 总榜 -->
    <div v-else-if="mainTab==1" class="list total">

      <ul>
        <li v-for="(item,index) in rank.list" :key="index" :class="'rank'+item.rank" @click="goRoom(item.rid)">
          <span class="rank">{{item.rank}}</span>
          <img v-lazy="item.pic_url" alt="" class="av">
          <div class="msg">
            <div class="nick">{{item.rname}}</div>
            <div class="rid">{{item.rid}} <i class="pk" v-if="item.status"></i> </div>
          </div>
          <div class="score">
            <i></i>{{item.score}}
          </div>
        </li>
      </ul>
    </div>
    <!-- 任務列表 -->
    <!-- <taskList v-else></taskList> -->
    <!-- 日榜和总榜共用Loading（如果需要细化加载提示文案，可以把以下标签复制到不同的榜单后面） -->
    <div v-if="rank.loading" class="scrollLoading">加載中...</div>
    <div v-if="rank.none" class="scrollNone">
      暫無歌友上榜
    </div>
    <div v-if="mainTab==0 && tab > nowDay" class="dengdai">敬請期待！</div>
    <div class="mask" v-show="showFcards">
      <transition name="slide">
        <div class="familyCard" v-if="showFcards">
          <i class="close" @click="closeCards()"></i>
          <div class="title">{{cardsMsg.rank.info.nick}}</div>
          <div class="peopleTop">
            <div class="imgBox" @click="goFamily(cardsMsg.info.family_id)">
              <span class="avBg"></span>
              <img v-lazy="cardsMsg.info.info.avatar" alt="" class="av">
            </div>
            <div class="nick">
              {{cardsMsg.info.info.nick}}
            </div>
            <div class="score">
              <i></i>{{cardsMsg.info.score}}
            </div>
          </div>
          <div class="fUserList">
            <ul>
              <li v-for="(item,index) in cardsMsg.list" :key="index" @click="goPeople(item.uid)">
                <div class="rank" :class="'rank' + item.rank">{{item.rank}}</div>
                <div class="avBox">
                  <span :class="'user' + item.rank"></span>
                  <img v-lazy="item.avatar" alt="">
                </div>
                <div class="nick">{{item.nick}}</div>
                <div class="score">
                  <i></i>
                  <strong>{{item.score}}</strong>
                </div>
              </li>
            </ul>
          </div>
          <div class="myInfo" v-if="cardsMsg.rank.rank > 0">
            <div class="rank" :class="'rank' + cardsMsg.rank">{{cardsMsg.rank.rank}}</div>
            <div class="avBox" @click="goPeople(cardsMsg.rank.info.uid)">
              <span :class="'user' + cardsMsg.rank.rank"></span>
              <img v-lazy="cardsMsg.rank.info.avatar" alt="">
            </div>
            <div class="nick">{{cardsMsg.rank.info.nick}}</div>
            <div class="score">
              <i></i>
              <strong>{{cardsMsg.rank.score}}</strong>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="fiveQuery">
      <transition name="slide">
        <div class="queryPup" v-if="fiveQuery">
          <i class="close" @click="closeFiveQuery()"></i>
          <p>
            每人最多加入5個戰隊,是否確認申請加入{{actFamily.nick}}戰隊<br />({{myRank.length}}/5)
          </p>
          <div class="btnBox">
            <span class="ok" @click="application(actFamily.uid)">確定</span>
            <span class="no" @click="closeFiveQuery()">取消</span>
          </div>
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
import getDate from "../utils/getDate"
import TeamSearch from "./TeamSearch"
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
  components: { TeamSearch },
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
      showFcards: false,
      fiveQuery: false,
      actFamily: {}
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
    ...mapState(['rankGroups', "nowDay", "inited", "isShare", "actStatus", "leader", "myRank", "userMsg"]),
    rankKey() {
      // return ['one', 'two', 'three'][this.tab];
      return this.mainTab == 1 ? 'total' : this.mainTab;
    },
    rankApi() {
      if (this.isShare) {
        var dayApi = `/happy_fly_car/rank.php?from={from}&date={date}`;
        var totalApi = `/happy_fly_car/rank.php?from={from}&date=0`;
        var api = this.rankKey == 'total' ? totalApi : dayApi;
        return api.replace('{date}', this.getDate(this.dateArr[this.tab - 1]))
      } else {
        var dayApi = `/kol_team_fight/teamList.php?token={token}&from={from}`;
        var totalApi = `/kol_team_fight/roomList.php?token={token}&from={from}`;
        var api = this.rankKey == 'total' ? totalApi : dayApi;
        const token = getUrlString('token') || '';
        return api.replace('{token}', token);
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
            if (this.rankKey == 'total') {
              this.vxc('myRoomRank', response_data.rank)
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
    showFamily(fid) {
      api.teamInfo(fid).then(res => {
        console.log(res)
        this.cardsMsg = res.data.response_data
        this.showFcards = true
      })
    },
    addFamily(item) {
      if (!this.userMsg.registered) {
        this.vxc('setToast', {
          msg: "請點擊報名參與活動"
        })
      } else {
        this.actFamily = item
        this.fiveQuery = true
      }

    },
    application(id) {
      api.application(id).then(res => {
        if (res.data.response_status.code == 0) {
          this.toast(`申請成功,請等待隊長審核`)
          this.fiveQuery = false
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    goPeople(uid) {
      location.href = `uid:${uid}`
    },
    goFamily(fid) {
      location.href = `fid:${fid}`
    },
    goRoom(rid) {
      location.href = `rid:${rid}`
    },
    getDate(time) {
      return getDate(new Date(time * 1000), '2')
    },
    closeCards() {
      this.showFcards = false
    },
    closeFiveQuery() {
      this.fiveQuery = false
    }
  },
}
</script>

<style lang="scss">
.rankGroups {
  margin-top: 0.1rem;
  padding-bottom: 2rem;
  position: relative;
  > li {
    padding: 0.5rem 0;
  }
  .mainTabs {
    margin: 0.15rem 0 0.25rem;
    padding: 0 0.37rem;
    height: 1.06rem;
    margin: 0 auto;
    display: flex;
    .tabs {
      width: 6.84rem;
      height: 1.06rem;
      background: url(../assets/img/hsitoryTab1.png);
      background-size: 100%100%;
      display: flex;
      align-items: center;
      a {
        height: 100%;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        &.tab1 {
          i {
            display: block;
            width: 2.01rem;
            height: 0.53rem;
            background: url(../assets/img/tabName8.png);
            background-size: 100% 100%;
            &.act {
              width: 1.82rem;
              height: 0.34rem;
              background: url(../assets/img/tabName7.png);
              background-size: 100% 100%;
            }
          }
        }
        &.tab2 {
          i {
            display: block;
            width: 1.11rem;
            height: 0.34rem;
            background: url(../assets/img/tabName9.png);
            background-size: 100% 100%;
            &.act {
              width: 1.3rem;
              height: 0.53rem;
              background: url(../assets/img/tabName10.png);
              background-size: 100% 100%;
            }
          }
        }
      }
      &.current {
        background: url(../assets/img/hsitoryTab2.png);
        background-size: 100% 100%;
      }
    }
  }
  .dayTips {
    text-align: center;
    color: rgba(247, 211, 124, 1);
    font-size: 0.24rem;
    margin: 0.2rem 0 0.3rem;
    padding: 0 0.25rem;
  }
  .list {
    margin: 0.25rem auto;
    width: 6.9rem;
    // background: url(../assets/img/rankTips.png) no-repeat;
    // background-size: 100% auto;
    position: relative;
    z-index: 10;
    li {
      height: 1.25rem;
      margin-top: 0.05rem;
      display: flex;
      align-items: center;
      background: url(../assets/img/listItemBlack.png);
      background-size: 100% 100%;
      margin-bottom: 0.2rem;
      .rank {
        width: 0.82rem;
        height: 0.82rem;
        color: rgba(243, 165, 78, 1);
        text-align: center;
        line-height: 0.82rem;
        margin-left: 0.11rem;
        font-weight: bold;
        font-size: 0.4rem;
      }
      .imgBox {
        width: 1.11rem;
        height: 1.25rem;
        position: relative;
        .av {
          width: 1rem;
          height: 1rem;
          border: 0.02rem solid rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          position: absolute;
          top: 0.125rem;
        }
      }
      .msg {
        width: 1.8rem;
        .nick {
          font-weight: bold;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .score {
          display: flex;
          align-items: center;
          color: rgba(255, 231, 184, 1);
          font-size: 0.25rem;
          i {
            width: 0.49rem;
            height: 0.52rem;
            background: url(../assets/img/fire.png);
            background-size: 100% 100%;
          }
        }
      }
      .peopleList {
        width: 2.76rem;
        height: 0.91rem;
        padding: 0 0.14rem;
        position: relative;
        display: flex;
        align-items: center;
        background: linear-gradient(90deg, rgba(6, 26, 68, 0.2) 0%);
        span {
          width: 0.7rem;
          margin-top: 0.05rem;
          img {
            width: 0.48rem;
            height: 0.48rem;
            border-radius: 50%;
            display: block;
            margin: 0 auto;
          }
          strong {
            display: block;
            text-align: center;
            color: rgba(255, 231, 184, 1);
            font-size: 0.17rem;
            text-align: center;
            margin-top: 0.02rem;
          }
          .add {
            strong {
              color: #fff;
            }
          }
        }
      }
      &.rank1 {
        background: url(../assets/img/listItme.png);
        background-size: 100% 100%;
        .rank {
          text-indent: -999rem;
          background: url(../assets/img/top1.png);
          background-size: 100% 100%;
        }
        .avBg {
          width: 1.11rem;
          height: 1.25rem;
          position: absolute;
          top: -0.11rem;
          left: -0.03rem;
          background: url(../assets/img/av1.png);
          background-size: 100% 100%;
          z-index: 11;
        }
      }
      &.rank2 {
        background: url(../assets/img/listItme.png);
        background-size: 100% 100%;
        .rank {
          text-indent: -999rem;
          background: url(../assets/img/top2.png);
          background-size: 100% 100%;
        }
        .avBg {
          width: 1.11rem;
          height: 1.25rem;
          position: absolute;
          top: -0.11rem;
          left: -0.03rem;
          background: url(../assets/img/av2.png);
          background-size: 100% 100%;
          z-index: 11;
        }
      }
      &.rank3 {
        background: url(../assets/img/listItme.png);
        background-size: 100% 100%;
        .rank {
          text-indent: -999rem;
          background: url(../assets/img/top3.png);
          background-size: 100% 100%;
        }
        .avBg {
          width: 1.11rem;
          height: 1.25rem;
          position: absolute;
          top: -0.11rem;
          left: -0.03rem;
          background: url(../assets/img/av3.png);
          background-size: 100% 100%;
          z-index: 11;
        }
      }
    }
    &.total {
      li {
        .av {
          width: 1rem;
          height: 1rem;
          border-radius: 0.1rem;
          border: 0.02rem solid #fff;
        }
        .msg {
          width: 3.2rem;
          margin-left: 0.11rem;
          .rid {
            color: rgba(203, 255, 251, 1);
            font-size: 0.25rem;
            display: flex;
            align-items: center;
            .pk {
              width: 1.06rem;
              height: 0.31rem;
              background: url(../assets/img/pk.png);
              background-size: 100% 100%;
              margin-left: 0.1rem;
            }
          }
        }
        .score {
          display: flex;
          align-items: center;
          color: rgba(255, 231, 184, 1);
          font-size: 0.25rem;
          i {
            width: 0.49rem;
            height: 0.52rem;
            background: url(../assets/img/fire.png);
            background-size: 100% 100%;
          }
        }
      }
    }
  }
}
.familyCard {
  width: 6.75rem;
  height: 8.28rem;
  background: url(../assets/img/taskBg.png);
  background-size: 100% 100%;
  padding-top: 0.73rem;
  position: relative;
  margin-top: -0.6rem;
  .title {
    width: 4.08rem;
    height: 0.92rem;
    font-size: 0.48rem;
    font-weight: 600;
    text-align: center;
    line-height: 0.92rem;
    background: url(../assets/img/titleBg.png);
    background-size: 100% 100%;
    position: absolute;
    left: 1.34rem;
    top: -0.33rem;
  }
  .close {
    display: block;
    width: 0.67rem;
    height: 0.67rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    bottom: -1rem;
    left: 2.8rem;
  }
  .peopleTop {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 0.2rem;
    .imgBox {
      width: 1.11rem;
      height: 1.25rem;
      position: relative;
      .av {
        width: 1rem;
        height: 1rem;
        border: 0.02rem solid rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        position: absolute;
        top: 0.125rem;
      }
      .avBg {
        width: 1.11rem;
        height: 1.25rem;
        position: absolute;
        top: -0.11rem;
        left: -0.03rem;
        background: url(../assets/img/av1.png);
        background-size: 100% 100%;
        z-index: 11;
      }
    }
    .score {
      display: flex;
      align-items: center;
      color: rgba(255, 231, 184, 1);
      font-size: 0.25rem;
      i {
        width: 0.49rem;
        height: 0.52rem;
        background: url(../assets/img/fire.png);
        background-size: 100% 100%;
      }
    }
  }
  .fUserList {
    width: 5.92rem;
    height: 3.75rem;
    background: rgba(52, 122, 170, 0.2);
    margin: 0.1rem auto;
    overflow-y: scroll;
    li {
      height: 1.2rem;
      display: flex;
      align-items: center;
      margin-bottom: 0.1rem;
      .rank {
        width: 1rem;
        text-align: center;
        font-size: 0.4rem;
        color: rgba(243, 165, 78, 1);
        font-weight: 600;
      }
      .avBox {
        img {
          width: 1rem;
          height: 1rem;
          border: 0.02rem solid rgba(255, 255, 255, 0.6);
          border-radius: 50%;
        }
      }
      .nick {
        width: 1.8rem;
        font-size: 0.24rem;
        margin-left: 0.28rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .score {
        display: flex;
        align-items: center;
        color: rgba(255, 231, 184, 1);
        font-size: 0.25rem;
        margin-left: 0.15rem;
        i {
          width: 0.49rem;
          height: 0.52rem;
          background: url(../assets/img/fire.png);
          background-size: 100% 100%;
        }
      }
    }
  }
  .myInfo {
    width: 5.85rem;
    padding: 0 0.45rem;
    height: 1.5rem;
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    margin-bottom: 0.1rem;
    background: rgba(52, 122, 170, 0.2);
    .rank {
      width: 1rem;
      text-align: center;
      font-size: 0.4rem;
      color: rgba(243, 165, 78, 1);
      font-weight: 600;
    }
    .avBox {
      img {
        width: 1rem;
        height: 1rem;
        border: 0.02rem solid rgba(255, 255, 255, 0.6);
        border-radius: 50%;
      }
    }
    .nick {
      width: 1.8rem;
      font-size: 0.24rem;
      margin-left: 0.28rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .score {
      display: flex;
      align-items: center;
      color: rgba(255, 231, 184, 1);
      font-size: 0.25rem;
      margin-left: 0.15rem;
      i {
        width: 0.49rem;
        height: 0.52rem;
        background: url(../assets/img/fire.png);
        background-size: 100% 100%;
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
