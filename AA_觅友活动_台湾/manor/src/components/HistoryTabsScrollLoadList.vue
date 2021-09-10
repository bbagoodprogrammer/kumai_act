<template>
  <div class="history">
    <div class="title">動態</div>
    <!-- 日榜、总榜切换主Tabs -->
    <i class="close" @click="closeHistory()"></i>
    <div class="mainTabs">
      <div class="tabs">
        <a class="tab1" @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" href="">摘取</a>
        <a class="tab2" @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" href="">購買/兌換</a>
        <a class="tab3" @click.prevent="mainTabClick(2)" :class="{current:mainTab==1}" href="">任務</a>
      </div>
    </div>
    <!-- 总榜 -->
    <div class="rankList_history ">
      <ul class="list day scrollable">
        <li v-for="(item,index) in mainTab == 0?this.rank.list:makeData" :key="index">
          <div class="get" v-if="mainTab == 0">
            <div class="tm">{{item.is_today?'今天':getDate(item.date,3)}}</div>
            <div class="totalSun">
              <i></i>
              <div class="msg">
                <div class="total">共收穫 {{item.sun_num}} 陽光</div>
                <div class="vs">摘取他人{{item.steal_num}}陽光 <em>VS</em> 被人摘取{{item.stolen_num}}陽光</div>
              </div>
            </div>
            <div class="peopleList">
              <img v-lazy="" alt="" class="firstAv">
              <div class="peopleMsg">
                <div class="tips">
                  <div class="msgTips"> 玩家暱稱等N位玩家摘取了陽光*N</div>
                  <u class="open" @click="setIndex(index)">展開</u>
                </div>
                <ul class="openList" :class="{height:showPeopleIndex == index}">
                  <li v-for="(item2,index2) in 9" :key="index2">
                    <img v-lazy="item2.avatar" alt="">
                    <div class="msg">
                      <div class="userTips">玩家暱稱摘取了陽光*N</div>
                      <div class="tm2">12:00</div>
                    </div>
                    <div class="back">回摘</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="other" v-else>
            <div class="time">{{item.key}}</div>
            <div class="taskItem" v-for="(item2,index2) in item.list" :key="index2">
              <div class="title">{{item2.title}}</div>
              <div class="tm">{{getDate(item2.date,5)}}</div>
            </div>
          </div>
        </li>
      </ul>
      <!-- 日榜和总榜共用Loading（如果需要细化加载提示文案，可以把以下标签复制到不同的榜单后面） -->
      <div class="listTipsBox" v-if="rank.loading|| rank.none">
        <div v-if="rank.loading" class="scrollLoading">{{lang.loading}}</div>
        <div v-if="rank.none " class="scrollNone">
          {{lang.noData}}
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import { getUrlString } from '../utils';
import APP from "../utils/openApp"
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

var getKey = function (arr, time) {
  for (let index = 0; index < arr.length; index++) {
    if (arr[index].key == time) {
      return index;
    }
  }
  return -1;
};

export default {
  data () {
    return {
      mainTab: 0,
      showPeopleIndex: -1
    }
  },
  computed: {
    ...mapState(['rankGroups_history', 'end']),
    rankKey () {
      return this.mainTab == 1 ? 'total' : this.mainTab;
    },
    rankApi () {
      var dayApi = `/index.php?action=manor.history&uid={uid}&token={token}&type=${this.mainTab + 1}&from={from}`;
      const token = getUrlString('token') || '';
      const uid = getUrlString('uid') || '';
      return dayApi.replace('{token}', token).replace('{uid}', uid)
    },
    rankSize () {
      // 如果明确服务器每次返回的列表长度，请返回具体的数值，有助于减少一次额外请求即可确定加载完所有数据
      return 20;
    },
    rank () {
      const rankConf = this.rankGroups_history[this.rankKey] || {};
      rankConf.list = rankConf.list || [];
      return rankConf;
    },
    makeData () {
      var arr = [];
      for (let i = 0; i < this.rank.list.length; i++) {
        var times = this.rank.list[i].date;
        var day = getDate(new Date(times * 1000), AREA == 'tw' ? 3 : 4)
        var index = getKey(arr, day);
        if (index == -1) {
          arr.push({ key: day, list: [this.rank.list[i]] })
        } else {
          arr[index].list.push(this.rank.list[i]);
        }
      }
      console.log(arr)
      return arr;
    }
  },
  mounted () {
    this.scrollable = this.$el.querySelector('.scrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
      this.onScroll()
    }
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    setIndex (index) {
      if (this.showPeopleIndex == index) {
        this.showPeopleIndex = -1
        return
      }
      this.showPeopleIndex = index
    },
    mainTabClick (tab) { //总榜切换
      this.mainTab = tab;
      // this.vxc('changTab', this.rankKey)
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      });
    },
    onScroll () {
      if (!this.rank.loading && !this.rank.loadEnd) {
        const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 30;
        if (scrollToBottom || !this.rank.loadCount) {

          const mainTab = this.mainTab
          const key = this.rankKey;

          const set = (k, v) => {
            this.$store.commit('updateRankGroups_history', { key, [k]: v });
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
    getDate (tm, type) {
      return getDate(new Date(tm * 1000), type)
    },
    goUser (uid) { //跳转
      location.href = `uid:${uid}`
    },
    closeHistory () {
      //   this.vxc('clearList')
      this.$parent.showHistoryPup = false
    },
    showFriendsPup (id) {
      this.order_id = id
      this.showFriends = true
    },
  },
}
</script>

<style lang="scss" scoped>
.listTipsBox {
  text-align: center;
  margin-top: 0.3rem;
}
.noData {
  text-align: center;
  font-size: 0.28rem;
  color: rgba(133, 90, 55, 1);
}
.history {
  width: 7.33rem;
  height: 10.64rem;
  padding-top: 0.3rem;
  background: url(../img/history.png);
  background-size: 100% 100%;
  position: relative;
  .close {
    display: block;
    width: 0.54rem;
    height: 0.54rem;
    background: url(../img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0.15rem;
    top: 0.15rem;
  }
  .title {
    height: 0.8rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.4rem;
    color: #8E4908;
    text-shadow: #fff 1px 0 0, #fff 0 1px 0, #fff -1px 0 0, #fff 0 -1px 0;
  }
  .mainTabs {
    width: 6.08rem;
    height: 0.54rem;
    background: #F7E2BD;
    border-radius: 0.27rem;
    margin: 0.5rem auto 0;
    .tabs {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    a {
      width: 1.82rem;
      height: 0.56rem;
      text-align: center;
      line-height: 0.56rem;
      color: #8E4908;
      font-size: 0.28rem;
      &.current {
        background: url(../img/buy.png);
        background-size: 100% 100%;
      }
    }
  }
}
.list {
  padding: 0 0.6rem;
  .get {
    .tm {
      font-size: 0.26rem;
      color: #EC933B;
      margin: 0.16rem auto;
    }
    .totalSun {
      display: flex;
      align-items: center;
      i {
        width: 0.63rem;
        height: 0.63rem;
        background: url(../img/sum.png);
        background-size: 100% 100%;
      }
      .msg {
        .total {
          font-size: 0.28rem;
          color: #672A0B;
        }
        .vs {
          font-size: 0.26rem;
          color: #EC933B;
          em {
            font-size: 0.26rem;
            color: #672A0B;
          }
        }
      }
    }
    .peopleList {
      position: relative;
      height: 0.75rem;
      margin-top: 0.16rem;
      > img {
        display: inline-block;
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 50%;
        float: left;
      }
      .peopleMsg {
        float: right;
        width: 5rem;
        padding: 0 0.1rem;
        background: rgba(227, 181, 140, 0.29);
        border-radius: 0.06rem;
        color: #672A0B;
        overflow: hidden;
        .tips {
          height: 0.73rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .openList {
          height: 0;
          transition: height 0.1s linear;
          &.height {
            height: 4rem;
            overflow-y: scroll;
          }
          li {
            height: 0.73rem;
            display: flex;
            align-items: center;
            > img {
              width: 0.58rem;
              height: 0.58rem;
              margin: 0 0.1rem;
            }
            .msg {
              width: 2.8rem;
              .userTips {
                color: #672A0B;
                font-size: 0.24rem;
              }
              .tm2 {
                color: #EC933B;
                font-size: 0.24rem;
              }
            }
            .back {
              width: 1.22rem;
              height: 0.49rem;
              background: url(../img/buy.png);
              background-size: 100% 100%;
              text-align: center;
              line-height: 0.49rem;
              font-size: 0.24rem;
            }
          }
        }
        .msgTips {
          font-size: 0.26rem;
        }
        u {
          font-size: 0.2rem;
          color: #2F75A5;
        }
      }
    }
  }
}
.close {
  width: 0.7rem;
  height: 0.7rem;
  background: url(../img/close.png);
  background-size: 100% 100%;
  position: absolute;
  top: -1rem;
  right: 0rem;
}
</style>
