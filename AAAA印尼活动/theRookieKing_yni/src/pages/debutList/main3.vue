<template>
  <div class="rankGroups">
    <!-- 日榜、总榜切换主Tabs -->
    <!-- <div class="mainTabs">
      <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" href="">Ngày</a>
      <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" href="">Tổng</a>
      <a @click.prevent="onRefresh" href="" v-if="tab == nowDay && !isShare && activeityState===1" id="refresh">刷新</a>
    </div> -->
    <!-- <div v-if="mainTab==0" class="tabs">
      <a @click.prevent="tabClick(0)" :class="{current:tab==0}" href="">日榜1</a>
      <a @click.prevent="tabClick(1)" :class="{current:tab==1}" href="">日榜2</a>
      <a @click.prevent="tabClick(2)" :class="{current:tab==2}" href="">日榜3</a>
    </div> -->
    <!-- <div class="downTimebox" v-if="showTimeState && tab == nowDay && mainTab == 0">
      <p><em class="timeLf"></em>Đếm ngược kết thúc sự kiện<em class="timeRi"></em></p>
      <div class="timeDown">
        <div class="day">
          <strong>{{surplusTime.day}}</strong>
          <em>Ngày</em>
        </div>
        <div class="hours">
          <strong>{{surplusTime.hour}}</strong>
          <em>Giờ</em>
        </div>
        <div class="min">
          <strong>{{surplusTime.minute}}</strong>
          <em>Phút</em>
        </div>
        <div class="second">
          <strong>{{surplusTime.second}}</strong>
          <em>Giây</em>
        </div>

      </div>
    </div>
    <div class="downTimebox" v-if="totalShowTotalTime && mainTab == 1">
      <p><em class="timeLf"></em>Đếm ngược kết thúc sự kiện<em class="timeRi"></em></p>
      <div class="timeDown">
        <div class="day">
          <strong>{{totalSurplusTime.day}}</strong>
          <em>Ngày</em>
        </div>
        <div class="hours">
          <strong>{{totalSurplusTime.hour}}</strong>
          <em>Giờ</em>
        </div>
        <div class="min">
          <strong>{{totalSurplusTime.minute}}</strong>
          <em>Phút</em>
        </div>
        <div class="second">
          <strong>{{totalSurplusTime.second}}</strong>
          <em>Giây</em>
        </div>

      </div>
    </div> -->
    <div class="title">

    </div>
    <!-- 日榜 -->
    <DayTabs v-if="mainTab==0" @volchangeClick="tabClick" :tab="tab" :isList="isList" :nowVol="nowDay"></DayTabs>
    <ul v-if="mainTab==0" class="list day">
      <li v-for="(item,index) in rank.list" :key="index" @click="goUser(item.kstatus,item.uid)">
        <span v-if="index > 2" class="rank">{{item.rank}}</span>
        <div class="imgbox" :class="{minw:index > 2}">
          <img src="../../assets/img/top1.png" alt="" class="topimg" v-if="index==0">
          <img src="../../assets/img/top2.png" alt="" class="topimg" v-if="index==1">
          <img src="../../assets/img/top3.png" alt="" class="topimg" v-if="index==2">
          <img :src="require('../../assets/img/'+item.is_noble+'.png')" alt="" v-if="item.is_noble !==0 && index >2" class="noble">
          <img v-lazy="item.avatar" alt="" class="img2" :class="{lt:item.is_noble > 0 && index >2} ">
        </div>
        <div class="userMsg">
          <div class="name">{{item.nick}}</div>
          <div class="ID">{{item.uid}}</div>
          <div class="vip">
            <span class="king" v-if="item.kstatus >0"></span>
            <span class="vipIcon" v-if="item.is_vip > 0"><em>VIP {{item.is_vip}}</em></span>
          </div>
        </div>
        <span class="score"><em></em>{{item.score}}</span>
      </li>
    </ul>
    <!-- 总榜 -->
    <!-- <ul v-else class="list total">
      <li v-for="(item,index) in rank.list" :key="index">
        <span v-if="index > 2" class="rank">{{item.rank}}</span>
        <div class="imgbox" :class="{minw:index > 2}">
          <img src="../../assets/img/top1.png" alt="" class="topimg" v-if="index==0">
          <img src="../../assets/img/top2.png" alt="" class="topimg" v-if="index==1">
          <img src="../../assets/img/top3.png" alt="" class="topimg" v-if="index==2">
          <img :src="require('../../assets/img/'+item.is_noble+'.png')" alt="" v-if="item.is_noble !==0" class="noble">
          <img src="../../assets/img/default.png" alt="" class="img2" :class="{lt:item.is_noble > 0}">
        </div>
        <div class="userMsg">
          <div class="name">{{item.nick}}</div>
          <div class="ID">{{item.uid}}</div>
          <div class="vip">
            <span class="king" v-if="item.kstatus >0"></span>
            <span class="vipIcon" v-if="item.is_vip > 0"><em>VIP:{{item.is_vip}}</em></span>
          </div>
        </div>
        <span class="score"><em></em>{{item.score}}</span>
      </li>
    </ul> -->
    <!-- 日榜和总榜共用Loading（如果需要细化加载提示文案，可以把以下标签复制到不同的榜单后面） -->
    <div v-if="rank.loading" class="scrollLoading">Loading...</div>
    <div v-if="rank.none|| (rank.list.length == 0 && tab == nowDay)" class="scrollNone">Sekarang belum ada data!</div>
    <div v-if="mainTab==0 && tab > nowDay" class="dengdai">Harap menantikan!</div>
    <Loading></Loading>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import api from "../../api/apiConfig"
import getUrlString from '../../utils/getString.js';
import DayTabs from "../../components/DayTabs"
import Loading from "../../components/Loading"
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
  components: { DayTabs, Loading },
  data() {
    return {
      mainTab: 0,
      tab: null,
      nowDay: null,
      firstAj: true,
      isList: 1
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
    ...mapState(['debutList']),
    rankKey() {
      // return ['one', 'two', 'three'][this.tab];
      return this.mainTab == 1 ? 'total' : this.tab;
    },
    rankApi() {
      const dayApi = `/ktv_beginner/volrank.php?vol={vol}`;
      const totalApi = `/ktv_beginner/totalrank.php?&token={token}&from={from}`;

      const api = this.rankKey == 'total' ? totalApi : dayApi;

      const token = getUrlString('token') || '';
      return api.replace('{vol}', this.tab).replace('{token}', token);
    },
    rankSize() {
      // 如果明确服务器每次返回的列表长度，请返回具体的数值，有助于减少一次额外请求即可确定加载完所有数据
      return 4;
    },
    rank() {
      const rankConf = this.debutList[this.rankKey] || {};
      rankConf.list = rankConf.list || [];
      return rankConf;
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
  created() {
    api.getDebutList().then((res) => { //初始请求当前期数
      const { vol, list } = res.data.response_data
      this.nowDay = vol //第一次时储存当前期数
      this.firstAj = false
      this.$store.commit('updateDebutList', { //当前期榜单信息
        key: vol,
        loadCount: 0,
        loadEnd: list.length <= 3,
        loading: false,
        none: false,
        list: list,
      })
    })
  },
  methods: {
    tabClick(tab) {
      this.tab = tab;
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      });
    },
    onScroll() {
      if (this.tab > this.nowDay || this.firstAj) return
      //   if (this.tab > this.nowDay || this.setInited === 1) { //初始化是少一次請求
      //     this.$store.commit("changSetInited", 0)
      //     return
      //   }
      if (!this.rank.loading && !this.rank.loadEnd) {
        const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100;
        const notFull = document.body.scrollHeight < window.innerHeigh;
        if (scrollToBottom || notFull) {
          const key = this.rankKey;

          const set = (k, v) => {
            this.$store.commit('updateDebutList', { key, [k]: v });
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
            // if (response_data.owner_info && response_data.owner_info.uid) {
            //   this.$store.commit("changGroupsUserMsg", {//初始当前日榜个人信息
            //     key: this.rankKey,
            //     msg: response_data.owner_info
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
    goUser(kid, uid) { //跳转
      if (kid > 0) {
        location.href = `rid:${kid}`
      } else {
        location.href = `uid:${uid}`
      }
    }
    // onRefresh() {
    //   this.$store.commit('updateRankGroups', {
    //     key: this.rankKey,
    //     loadCount: 0,
    //     loadEnd: false,
    //     loading: false,
    //     none: false,
    //     list: [],
    //   });
    //   this.$nextTick(this.onScroll);
    // }
  },
}
</script>

<style lang="scss">
body {
  background: #0c003b;
}
.rankGroups {
  margin-top: 0.27rem;
  padding-bottom: 2rem;
  .title {
    width: 3.28rem;
    height: 0.96rem;
    margin: 0.33rem auto 0;
    background: url(../../assets/img/BXH.png);
    background-size: 100% 100%;
  }
  > li {
    padding: 0.5rem 0;
  }
  .mainTabs {
    width: 6.23rem;
    height: 0.8rem;
    margin: 0 auto;
    background: url(../../assets/img/tabsBg.png) no-repeat;
    background-size: contain;
    a {
      display: inline-block;
      width: 49%;
      height: 0.8rem;
      text-align: center;
      line-height: 0.8rem;
      color: #ca9dfd;
      font-weight: bold;
      &.current {
        color: #5b00b6;
        background: url(../../assets/img/actBg.png);
        background-size: 100% 100%;
      }
    }
  }
  .downTimebox {
    margin: 0.45rem auto 0;
    // width: 4.47rem;
    // height: 1.76rem;
    text-align: center;
    color: #00ffde;
    font-size: 120%;
    > p {
      .timeLf {
        display: inline-block;
        width: 0.98rem;
        height: 0.14rem;
        background: url(../../assets/img/timeL.png);
        background-size: 100% 100%;
        margin-right: 0.2rem;
      }
      .timeRi {
        display: inline-block;
        width: 0.98rem;
        height: 0.14rem;
        background: url(../../assets/img/timeR.png);
        background-size: 100% 100%;
        margin-left: 0.2rem;
      }
    }
    .timeDown {
      width: 5.7rem;
      height: 0.75rem;
      margin: 0.17rem auto 0;
      background: url(../../assets/img/timeDown.png);
      background-size: 100% 100%;
      > div {
        height: 100%;
        line-height: 0.75rem;
        display: inline-block;
        strong {
          font-size: 140%;
          font-weight: 900;
          -webkit-line-clamp: 2;
          background-image: -webkit-linear-gradient(bottom, #dbbbff, #c094fd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        em {
          font-size: 70%;
          color: #9437ff;
        }
      }
    }
  }
  .list {
    margin-top: 0.1rem;
    li {
      width: 6.5rem;
      height: 2.22rem;
      margin: 0 auto 0;
      background: url(../../assets/img/liItem.png);
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      position: relative;
      padding: 0 0.29rem 0 0.59rem;
      .rank {
        display: inline-block;
        width: 0.4rem;
        height: 0.4rem;
        text-align: center;
        color: #ffee82;
        font-size: 115%;
        margin-top: 0.1rem;
        font-weight: bold;
      }
      .imgbox {
        width: 1.47rem;
        height: 1.36rem;
        position: relative;
        margin: 0.1rem;
        &.minw {
          width: 1.2rem;
          margin-right: 0;
          .noble {
            width: 1.37rem;
            height: 1.59rem;
          }
          .img2 {
            width: 0.92rem;
            height: 0.92rem;
            left: 0.13rem;
            top: 0.2rem;
          }
        }
        .topimg {
          width: 1.6rem;
          height: 1.6rem;
          position: absolute;
          top: -0.1rem;
          z-index: 100;
        }
        .img2 {
          width: 1rem;
          height: 1rem;
          position: absolute;
          top: 0.25rem;
          left: 0.32rem;
          border-radius: 50%;
          &.lt {
            left: 0.13rem;
            top: 0.2rem;
          }
        }
        .noble {
          width: 1.47rem;
          height: 1.69rem;
          position: absolute;
          z-index: 100;
          top: -0.1rem;
          left: -0.1rem;
        }
      }
      .userMsg {
        margin: 0.3rem 0 0 0.2rem;
        width: 2.5rem;
        height: 1.2rem;
        > div {
          height: 33.3%;
          line-height: 0.3rem;
        }
        .name {
          font-size: 120%;
          max-width: 2.5rem;
          overflow: hidden;
          text-overflow: ellipsis; /* 超出部分显示省略号 */
          white-space: nowrap; /*规定段落中的文本不进行换行 */
        }
        .ID {
          color: #9270b8;
          font-size: 90%;
        }
        .vip {
          display: flex;
          align-items: center;
          .king {
            display: inline-block;
            width: 1.34rem;
            height: 0.3rem;
            background: url(../../assets/img/ked.png);
            background-size: 100% 100%;
          }
          .vipIcon {
            display: inline-block;
            width: 0.67rem;
            height: 0.3rem;
            background: url(../../assets/img/VIP.png);
            background-size: 100% 100%;
            margin-left: 0.1rem;
            em {
              display: block;
              width: 0.67rem;
              height: 0.3rem;
              font-size: 80%;
              transform: scale(0.8);
              text-align: center;
              color: #5cffdb;
            }
          }
        }
      }
      .score {
        display: inline-block;
        height: 0.5rem;
        line-height: 0.5rem;
        display: flex;
        align-items: center;
        font-size: 90%;
        margin-left: 0.3rem;
        em {
          display: inline-block;
          width: 0.66rem;
          height: 0.5rem;
          background: url(../../assets/img/魅力值标志.png);
          background-size: 100% 100%;
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
}
.scrollNone {
  text-align: center;
}
#refresh {
  display: block;
  width: 0.94rem;
  height: 1rem;
  position: fixed;
  left: 0.08rem;
  bottom: 1.35rem;
  background: url(../../assets/img/refresh.png) no-repeat;
  background-size: contain;
  transition: all 1s;
  text-indent: -999rem;
  z-index: 200;
}
@import "../../assets/scss/common.scss";
</style>
