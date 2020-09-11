<template>
  <div class="rankGroups">
    <div class="title">打擂榜</div>
    <!-- 日榜、总榜切换主Tabs -->
    <div class="mainTabs">
      <div class="tabs">
        <!-- {{rStime}}-{{rEtime}} -->
        <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" href="">{{rStime}}-{{rEtime}}打擂榜</a>
        <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" href="">本季歌王榜</a>
      </div>
      <a @click.prevent="onRefresh" href="" :style="{transform:'rotate('+rotatePx+'deg)'}" id="refresh">刷新</a>
    </div>

    <ul class="list day">
      <li v-for="(item,index) in rank.list" :key="index" :class="'rank'+item.rank" @click="goUser(item.uid,item.live)">
        <div class="rank">{{item.rank}}</div>
        <div class="imgBox">
          <img v-lazy="item.userinfo.avatar" alt="" class="av">
        </div>
        <div class="nick">
          <strong class="userNick">{{item.userinfo.nick}}</strong>
          <strong class="songNum" v-if="mainTab==0">打擂歌曲數：{{item.songs}}</strong>
          <strong class="songNum" v-if="mainTab==0">已刪除歌曲數量：{{item.del}}</strong>
        </div>
        <div class="score">
          <em v-if="mainTab==0">本期分數：{{item.star}}</em>
          <em v-else>本賽季等級：<i>Lv.{{item.star}}</i></em>
          <!-- <em>平均支持率：<i>{{item.pp}}%</i> </em> -->
        </div>
      </li>
    </ul>
    <!-- 日榜和总榜共用Loading（如果需要细化加载提示文案，可以把以下标签复制到不同的榜单后面） -->
    <div class="listTipsBox">
      <div v-if="rank.loading" class="scrollLoading">加載中...</div>
      <div v-if="rank.none " class="scrollNone">
        目前暫無歌友上榜</br>
        虛位以待，等你來哦！
      </div>
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
  data() {
    return {
      mainTab: 0,
      tab: 1,
      surplusTime: {},//日榜剩余时间
      timer: null,
      timer2: null,
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
      act: null,
      noData: false,
      noData2: false,
    }
  },
  computed: {
    ...mapState(['rankGroups', "isShare"]),
    rankKey() {
      return this.mainTab == 1 ? 'total' : this.mainTab;
    },
    rankApi() {
      if (this.isShare) {
        var dayApi = `/song_fight/preList.php?from={from}`;
        var totalApi = `/song_fight/allList.php?from={from}`;
        var api = this.rankKey == 'total' ? totalApi : dayApi;
        return api
      } else {
        var dayApi = `/song_fight/preList.php?token={token}&from={from}`;
        var totalApi = `/song_fight/allList.php?token={token}&from={from}`;
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
      return rankConf;
    },
    rStime() {
      if (this.act) {
        return getDate(new Date(this.act.stime * 1000), 1)
      }
    },
    rEtime() {
      if (this.act) {
        return getDate(new Date(this.act.etime * 1000), 1)
      }
    },
    configUser() {
      let arr = []
      for (let i = 0; i < 100; i++) {
        let obj = {
          rank: i + 1,
          songs: "??",
          star: "??",
          userinfo: {
            avatar: "",
            nick: "???"
          }
        }
        arr.push(obj)
      }
      console.log(arr)
      return arr
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
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      });
    },
    onScroll() {
      let nowDate = null
      if (this.rankKey == 'total') {
        nowDate = this.noData2
      } else {
        nowDate = this.noData
      }
      if (!this.rank.loading && !this.rank.loadEnd && !nowDate) {
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
            //跟随榜单变换个人信息
            // if (response_data.myRank) {
            //   this.$store.commit("changGroupsUserMsg", {//初始当前日榜个人信息
            //     key: this.rankKey,
            //     msg: response_data.myRank
            //   })
            // }
            if (!this.act) {
              this.act = response_data.act
            }
            const arr = response_data.list;
            if (arr.slice) {
              const loadCount = typeof this.rank.loadCount == 'undefined' ? 0 : this.rank.loadCount;
              if (loadCount == 0 && !arr.length) {
                if (this.rankKey == 'total') {
                  this.noData2 = true
                  set('list', this.configUser);
                } else {
                  this.noData = true
                  set('list', this.configUser);
                }
              }
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
      if (this.rank.loading) return
      let nowDate = false
      if (this.rankKey == 'total') {
        nowDate = this.noData2
      } else {
        nowDate = this.noData
      }
      if (nowDate) { return }
      // this.$emit('getDefaultData')
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
    getDate(time) {
      return getDate(new Date(time * 1000), '3')
    },
    goUser(uid, live) { //跳转
      if (live) {
        location.href = `rid:${live}`
        return
      }
      location.href = `uid:${uid}`
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.onScroll);
    },
  },
}
</script>

<style lang="scss">
.rankGroups {
  padding: 0.36rem 0.2rem 0;
  position: relative;
  .title {
    text-align: center;
    font-size: 0.48rem;
    color: rgba(255, 213, 86, 1);
  }
  > li {
    padding: 0.5rem 0;
  }
  .mainTabs {
    width: 7.05rem;
    height: 0.83rem;
    margin: 0.25rem auto 0;
    position: relative;
    .tabs {
      width: 6.22rem;
      height: 0.88rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background: url(../assets/img/tabs.png);
      background-size: 100% 100%;
      margin: 0 auto;
      a {
        display: block;
        width: 3.26rem;
        height: 0.8rem;
        text-align: center;
        line-height: 0.8rem;
        color: rgba(255, 220, 42, 1);
        font-size: 0.28rem;
        font-weight: 600;
        &.current {
          color: rgba(174, 72, 0, 1);
          background: url(../assets/img/actTab.png);
          background-size: 100% 100%;
        }
      }
    }
  }
  .tabsTips {
    .taotalTips {
      color: rgba(199, 249, 204, 1);
      font-size: 0.24rem;
      text-align: center;
      margin: 0.16rem 0 0.24rem 0;
      line-height: 0.4rem;
    }
    .tips {
      text-align: center;
      color: rgba(199, 249, 204, 1);
      font-size: 0.24rem;
      font-weight: 500;
      margin: 0.15rem auto 0.32rem;
    }
  }
  .list {
    margin: 0.43rem auto;
    li {
      height: 1.13rem;
      // background: url(../assets/img/listBg.png);
      // margin-bottom: 0.17rem;
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      position: relative;
      margin-bottom: 0.1rem;
      .rank {
        width: 0.76rem;
        height: 0.65rem;
        color: rgba(163, 198, 255, 1);
        text-align: center;
        line-height: 0.65rem;
        margin-left: 0.08rem;
        font-weight: 700;
      }
      .imgBox {
        margin-left: 0.13rem;
        .av {
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
        }
      }
      .nick {
        width: 2.3rem;
        margin-left: 0.17rem;
        .userNick {
          height: 0.4rem;
          display: block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .songNum {
          display: block;
          color: rgba(201, 165, 255, 1);
          font-size: 0.24rem;
        }
      }
      .score {
        flex: 1;
        margin-left: 0.15rem;
        em {
          font-size: 0.24rem;
          color: rgba(94, 255, 230, 1);
          white-space: nowrap;
          margin-top: 0.1rem;
          display: flex;
          align-items: center;
          i {
            font-size: 0.24rem;
            // font-weight: bold;
          }
          > i {
            display: block;
            width: 0.81rem;
            height: 0.33rem;
            color: #fff;
            background: rgba(251, 162, 91, 1);
            border-radius: 0.1rem;
            text-align: center;
            line-height: 0.36rem;
            font-size: 0.24rem;
          }
        }
      }
      &.rank1 {
        .rank {
          text-indent: -999rem;
          background: url(../assets/img/top1.png);
          background-size: 100% 100%;
        }
      }
      &.rank2 {
        .rank {
          text-indent: -999rem;
          background: url(../assets/img/top2.png);
          background-size: 100% 100%;
        }
      }
      &.rank3 {
        .rank {
          text-indent: -999rem;
          background: url(../assets/img/top3.png);
          background-size: 100% 100%;
        }
      }
    }
    // li:last-child::before {
    //   display: none;
    // }
    // li:before {
    //   content: "";
    //   display: block;
    //   width: 6rem;
    //   height: 0.06rem;
    //   opacity: 0.48;
    //   background: #e4b758;
    //   position: absolute;
    //   bottom: -0.03rem;
    //   left: 0.65rem;
    //   z-index: 10;
    // }
  }
}
.listTipsBox {
  width: 7.05rem;
  height: 1.13rem;
  margin: 0 auto;
  // background: url(../assets/img/listBg.png);
  // background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #c7f9cc;
  font-size: 0.24rem;
}
.listBtn {
  width: 7.05rem;
  height: 0.59rem;
  // background: url(../assets/img/listBtn.png);
  // background-size: 100% 100%;
  margin: -0.05rem auto;
}
#refresh {
  display: block;
  width: 0.94rem;
  height: 1rem;
  position: fixed;
  right: 0.08rem;
  bottom: 1.35rem;
  background: url(../assets/img/refresh.png) no-repeat;
  background-size: contain;
  transition: all 1s;
  text-indent: -999rem;
  z-index: 100;
}
</style>
