<template>
  <div class="rankGroups">
    <!-- 日榜、总榜切换主Tabs -->
    <!-- <div class="mainTabs">
      <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" href="">日榜</a>
      <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" href="">总榜</a>
      <a @click.prevent="onRefresh" href="">刷新</a>
    </div> -->
    <!-- 日榜 -->
    <!-- <DayTabs v-if="mainTab==0" @changeClick="tabClick" :tab="tab"></DayTabs> -->
    <div v-if="mainTab==0" class="tabs">
      <a @click.prevent="tabClick(0)" :class="{current:tab==0}" href="" class="list1"></a>
      <a @click.prevent="tabClick(1)" :class="{current:tab==1}" href="" class="list2"></a>
      <a @click.prevent="tabClick(2)" :class="{current:tab==2}" href="" class="list3"></a>
      <a @click.prevent="tabClick(3)" :class="{current:tab==3}" href="" class="list4"></a>
      <span class="goTop" @click="scorllGO()"></span>
    </div>
    <!-- <div class="downTime" v-if="showTimeState && tab == nowDay">
      <span>{{surplusTime.day}}</span>
      <span>{{surplusTime.hour}}</span>
      <span>{{surplusTime.minute}}</span>
      <span>{{surplusTime.second}}</span>
    </div> -->
    <ul v-if="mainTab==0" class="list day">
      <li v-for="(item,index) in rank.list" :key="index" :class="{nv:item.sex == 1}" @click="showUserPup(item,index)">
        <div class="imgBox">
          <img v-lazy="item.avatar" alt="">
          <i class="sex" :class="{sex2:item.sex == 1}"></i>
        </div>
        <div class="userMsg">
          <div class="songName">{{item.song_name}}</div>
          <div class="userName">From: <em>{{item.nick}}</em></div>
        </div>
        <!-- <div class="addred" :class="{nan:item.sex == 0}" v-if="item.distance !== undefined || item.uid == userMsgState.uid">
          <i class="addresTips"></i>
          <em v-if="item.uid == userMsgState.uid">0m</em>
          <em v-else-if="item.distance > 1000">{{(item.distance /1000).toFixed(2)}}km</em>
          <em v-else>{{item.distance}}m</em>
        </div> -->
      </li>
    </ul>
    <!-- 总榜 -->
    <!-- <ul v-else class="list total">
      <li v-for="(item,index) in rank.list" :key="index">总榜{{JSON.stringify(item)}}</li>
    </ul> -->
    <!-- 日榜和总榜共用Loading（如果需要细化加载提示文案，可以把以下标签复制到不同的榜单后面） -->
    <div v-if="rank.loading" class="scrollLoading">Loading...</div>
    <div v-if="rank.list.length == 0" class="scrollNone">Sekarang belum ada data!</div>
    <!-- <div v-if="mainTab==0">敬請期待</div> -->
    <transition name="slide">
      <!--  v-show="showUser" -->
      <div class="userItemPup mask" v-show="showUser">
        <div class="userCon" :class="{maxHigt:showPup3}">
          <span class="close" @click="closePup()"></span>
          <div class="imgBox" :class="{nv:userMsg.sex == 1}" @click="goUser(userMsg.uid)">
            <img v-lazy="userMsg.avatar" alt="">
          </div>
          <p class="name">{{userMsg.nick}}</p>
          <p class="songName">{{userMsg.song_name}}</p>
          <p class="songUser">{{userMsg.song_author}}</p>
          <p class="jiyuTitle">——<i>·</i> Send word <i>·</i> ——</p>
          <p class="jiyu">{{userMsg.wish}}</p>
          <span class="Extract" @click="Extract(userMsg.id)" v-if="!showPup3"></span>
          <span class="goSing" @click="gosing()" v-else></span>
          <p class="Tips">
            Setelah mengambil keinginan,nyanyian umum pertama yang diupload akan sawer kepada pemohon(orang yang buat keinginan) secara default.
            <span>Setiap hari paling banyak bisa menbantu pengguna lain 10 keinginan</span>
            <span>Setelah ambil keinginan,silakan mengantar lagu keinginan sebelum lewati 6 jam, jika tidak keinginan ini akan menjadi keterangan ditunggu ambil</span>
            <span>Selama acara, dinilai 1 mencapai 10 kali,atau hapus lagu keinginan mencapai 5 kali ,akan dilarang untuk mengambil keinginan orang lain!</span>
          </p>
        </div>
      </div>
    </transition>
    <transition name="slide">
      <!-- -->
      <div class="pup2 mask" v-show="showPup2">
        <div class="pup2Con">
          <span class="close" @click="closePup2()"></span>
          <p class="title"> Anda konfirmasikan untuk menyerah keinginan yang sebelumnya?</p>
          <p class="msg">
            Konfirmasikan untuk menyerah keinginan yang telah diambil sebelumnya?
            Dan mengambil keinginan saat ini?
          </p>
          <div class="btnBox">
            <span class="yes" @click="zhaiqu(userMsg.id)"></span>
            <span class="no" @click="closePup2()"></span>
          </div>
        </div>
      </div>
    </transition>
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';
import api from '../api/apiConfig'
import { mapState } from 'vuex';
import getUrlString from '../utils/getString.js';
import MsgToast from "../components/commonToast"
import { globalBus } from '../utils/eventBus'
import APP from "../utils/openApp"
// import DayTabs from "../components/DayTabs"
// import downTime from '../utils/downTime.js'

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
  components: { MsgToast },
  data() {
    return {
      mainTab: 0,
      tab: 0,
      showUser: false,
      showPup2: false,
      showPup3: false,
      tastMsg: '',
      showT: false,
      userMsg: {}
    };
  },
  computed: {
    ...mapState(['rankGroups', 'userMsgState', 'isShare']),
    rankKey() {
      // return ['one', 'two', 'three'][this.tab];
      return this.mainTab == 1 ? 'total' : this.tab;
    },
    rankApi() {
      let type = ''
      if (this.rankKey === 0) {
        type = 'all'
      } else if (this.rankKey === 1) {
        type = 'friend'
      }
      else if (this.rankKey === 2) {
        type = 'city'
      }
      else if (this.rankKey === 3) {
        type = 'sex'
      }
      const dayApi = '/wish_list/list.php?type={type}&from={from}&token={token}';
      // const totalApi = '/ktv_beginner/totalrank.php?&from={from}';

      // const api = this.rankKey == 'total' ? totalApi : dayApi;

      const token = getUrlString('token') || '';
      if (token !== '') {
        return dayApi.replace('{type}', type).replace('{token}', token);
      } else {
        return dayApi.replace('{type}', type).replace('&token={token}', '');
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
    mainTabClick(tab) {
      this.mainTab = tab;
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      });
    },
    tabClick(tab) {
      if (this.isShare) {
        APP()
        return
      }
      this.tab = tab;
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      })
    },
    onScroll() {
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
    onRefresh() {
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
    scorllGO() {
      this.timer = setInterval(() => {
        var scorllTop = document.documentElement.scrollTop || document.body.scrollTop
        var step = scorllTop / 10
        window.scrollTo(0, scorllTop - step)
        if (scorllTop < 1) {//速度小于3或者滚动条到底了
          clearInterval(this.timer)
        }
      }, 10)
    },
    showUserPup(item, index) {
      this.userMsg = JSON.parse(JSON.stringify(item))
      this.userMsg.index = index
      this.showUser = true
    },
    closePup() {
      this.showUser = false
      this.showPup3 = false
    },
    closePup2() {
      this.showPup2 = false
    },
    zhaiqu(id, tips) { //摘心愿
      globalBus.$emit('commonEvent', () => {
        api.zhaiqu(id).then((res) => {
          if (res.data.response_status.code === 0) {
            let delObj = {
              rankIndex: this.rankKey,
              listInedx: this.userMsg.index
            }
            this.$store.commit('delItem', delObj)//摘下心愿用户
            if (tips) {
              // this.closePup()
              // this.showPup2 = false
              this.showPup3 = true
              this.$store.commit('addTook')
            } else {
              // this.showPup3 = true
              this.$store.commit('changTook', 1)
              this.closePup()
              this.showPup2 = false
            }
          } else if (res.data.response_status.code === 20004) {
            this.tastMsg = `Keinginan telah diambil oleh orang lain terlebih dahulu!`
            this.showT = true
          } else if (res.data.response_status.code === 60001) {
            this.tastMsg = `Selama acara,lagumu telah  berturut-turut dinilai 1 lebih dari 10 kali, dilarang untuk mengambil keinginan orang lain!`
            this.showT = true
          } else if (res.data.response_status.code === 60002) {
            this.tastMsg = `Selama acara,hapus lagu keinginan mencapai 5 kali, dan dilarang untuk  mengambil keinginan orang lain!`
            this.showT = true
          } else if (res.data.response_status.code === 60003) {
            this.tastMsg = `Maaf,ambil keinginan terlalu sering, silakan coba lagi nanti`
            this.showT = true
          } else if (res.data.response_status.code === 50001) {
            this.tastMsg = `Maaf,Anda sudah melanggar utk ikut acara,gak bisa ambil keinginan`
            this.showT = true
          } else if (res.data.response_status.code === 80001) {
            this.tastMsg = `Maaf, Anda sebanyak membantu temanmu utk menyelesaikan 10 keinginan setiap hari,Anda udah menyelesaikan 10 keinginan hari ini,gak bisa ambil keinginan lagi ya`
            this.showT = true
          } else {
            this.tastMsg = res.data.response_status.error
            this.showT = true
          }
        })
      })
    },
    closeToast() {
      this.showT = false
    },
    Extract(id) { //摘取心愿
      if (this.userMsgState.took === 0) {
        this.zhaiqu(id, '2')
      } else {
        this.showPup2 = true
      }
    },
    goUser(uid) {
      location.href = `uid:${uid}`
    },
    gosing() {
     let regstr = getUrlString('token')
      location.href = `./index5.html?token=${regstr}&t=1`
    }
  },
}
</script>

<style lang="scss">
.rankGroups {
  position: relative;
  margin-top: -0.7rem;
  .scrollLoading {
    text-align: center;
  }
  .scrollNone {
    text-align: center;
  }
  .tabs {
    width: 7.1rem;
    margin: 0 auto;
    a {
      display: inline-block;
      width: 3.5rem;
      height: 1.42rem;
      text-align: center;
      transition: all 0.2s;
    }
    .list1 {
      background: url(../assets/img/list1Bg.png);
      background-size: 100% 100%;
      &.current {
        background: url(../assets/img/actList1Bg.png);
        background-size: 100% 100%;
      }
    }
    .list2 {
      background: url(../assets/img/list2Bg.png);
      background-size: 100% 100%;
      &.current {
        background: url(../assets/img/actList2Bg.png);
        background-size: 100% 100%;
      }
    }
    .list3 {
      background: url(../assets/img/list3Bg.png);
      background-size: 100% 100%;
      &.current {
        background: url(../assets/img/actList3Bg.png);
        background-size: 100% 100%;
      }
    }
    .list4 {
      background: url(../assets/img/list4Bg.png);
      background-size: 100% 100%;
      &.current {
        background: url(../assets/img/actList4Bg.png);
        background-size: 100% 100%;
      }
    }
    .goTop {
      display: block;
      width: 0.75rem;
      height: 0.75rem;
      position: fixed;
      right: 0.31rem;
      bottom: 1.42rem;
      background: url(../assets/img/goTop.png);
      background-size: 100% 100%;
      z-index: 10;
    }
  }
  ul {
    padding: 0 0.49rem 2rem;
    li {
      margin-top: 0.2rem;
      background: url(../assets/img/nan.png);
      background-size: 100% 100%;
      height: 1.83rem;
      display: flex;
      align-items: center;
      &.nv {
        background: url(../assets/img/nv.png);
        background-size: 100% 100%;
        .imgBox {
          background: url(../assets/img/nvBg.png);
          background-size: 100% 100%;
        }
      }
      .imgBox {
        width: 1.73rem;
        height: 1.73rem;
        margin: -0.3rem 0.28rem 0 0.17rem;
        background: url(../assets/img/nanBg.png);
        background-size: 100% 100%;
        position: relative;
        img {
          width: 1.55rem;
          height: 1.55rem;
          margin: 0.1rem;
          border-radius: 50%;
        }
        .sex {
          display: block;
          width: 0.47rem;
          height: 0.47rem;
          background: url(../assets/img/sex1.png);
          background-size: 100% 100%;
          position: absolute;
          right: 0;
          bottom: 0.09rem;
          &.sex2 {
            background: url(../assets/img/sex2.png);
            background-size: 100% 100%;
          }
        }
      }
      .userMsg {
        color: #fffde3;
        font-size: 110%;
        width: 4.2rem;
        div {
          height: 50%;
        }
        .songName {
          max-width: 4.2rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .userName {
          max-width: 4.2rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .addred {
        margin-left: 0.4rem;
        color: #ff4dbd;
        &.nan {
          color: #76caff;
          .addresTips {
            display: inline-block;
            width: 0.21rem;
            height: 0.27rem;
            background: url(../assets/img/addres2.png);
            background-size: 100% 100%;
          }
        }
        .addresTips {
          display: inline-block;
          width: 0.21rem;
          height: 0.27rem;
          background: url(../assets/img/addres1.png);
          background-size: 100% 100%;
        }
      }
    }
  }
  .userItemPup {
    .userCon {
      width: 6.96rem;
      height: 9.5rem; //7.64rem
      padding-top: 0.48rem;
      background: url(../assets/img/pup1.png);
      background-size: 100% 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      &.maxHigt {
        height: 9.5rem;
      }
      .close {
        display: block;
        width: 0.51rem;
        height: 0.51rem;
        background: url(../assets/img/close.png);
        background-size: 100% 100%;
        position: absolute;
        top: 0.45rem;
        right: 0.45rem;
      }
      .imgBox {
        width: 1.93rem;
        height: 1.93rem;
        background: url(../assets/img/nanBg.png);
        background-size: 100% 100%;
        position: relative;
        margin: 0 auto;
        &.nv {
          background: url(../assets/img/nvBg.png);
          background-size: 100% 100%;
        }
        img {
          display: block;
          width: 1.66rem;
          height: 1.66rem;
          border-radius: 50%;
          position: absolute;
          top: 0.15rem;
          left: 0.13rem;
          margin: 0;
        }
      }
      p {
        text-align: center;
        width: 5rem;
        margin: 0 auto;
        &.name {
          margin: 0.15rem auto 0;
          font-size: 115%;
          color: #fffde3;
          max-width: 5rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        &.songName {
          margin-top: 0.1rem;
          color: #fffde3;
        }
        &.songUser {
          margin-top: 0.05rem;
          color: #fffde3;
        }
        &.jiyuTitle {
          font-size: 93%;
          color: #fffa5a;
          font-weight: 500;
          margin-top: 0.1rem;
          vertical-align: middle;
          display: flex;
          align-items: center;
          justify-content: center;
          i {
            margin-top: 0.1rem;
          }
          i:first-child {
            margin-right: 0.2rem;
          }
          i:last-child {
            margin-left: 0.2rem;
          }
        }
        &.jiyu {
          color: #fffa5a;
          font-size: 80%;
          margin-top: 0.15rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
        }
      }
      .Extract {
        display: block;
        width: 2.52rem;
        height: 0.79rem;
        background: url(../assets/img/zhaiqu.png);
        background-size: 100% 100%;
        position: absolute;
        left: 2.22rem;
        bottom: 0.45rem;
      }
      .goSing {
        display: block;
        width: 2.8rem;
        height: 0.79rem;
        background: url(../assets/img/goSing.png);
        background-size: 100% 100%;
        position: absolute;
        left: 2.22rem;
        bottom: 0.45rem;
      }
      .Tips {
        width: 6.1rem;
        font-size: 70%;
        color: #fffdbd;
        text-align: center;
        position: absolute;
        left: 0.45rem;
        bottom: 1.4rem;
        span {
          display: block;
          color: #d7184a;
          text-align: center;
        }
      }
    }
  }
  .pup2 {
    .pup2Con {
      width: 6.96rem;
      height: 3.44rem;
      padding-top: 0.93rem;
      background: url(../assets/img/pup2Bg.png);
      background-size: 100% 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      .close {
        display: block;
        width: 0.51rem;
        height: 0.51rem;
        background: url(../assets/img/close.png);
        background-size: 100% 100%;
        position: absolute;
        top: 0.45rem;
        right: 0.45rem;
      }
      .title {
        text-align: center;
        font-size: 110%;
        color: #fffa5a;
        font-weight: bold;
      }
      .msg {
        width: 6rem;
        font-size: 70%;
        color: #fffdbd;
        text-align: center;
        margin: 0.29rem auto 0;
      }
      .btnBox {
        display: flex;
        margin-top: 0.13rem;
        justify-content: center;
        .yes {
          display: block;
          width: 2.12rem;
          height: 0.79rem;
          background: url(../assets/img/yes.png);
          background-size: 100% 100%;
        }
        .no {
          display: block;
          width: 2.12rem;
          height: 0.79rem;
          margin-left: 1.05rem;
          background: url(../assets/img/no.png);
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>
