<template>
  <div class="rankGroups">
    <!-- 日榜、总榜切换主Tabs -->
    <div class="tabsTips">
      <div class="petTips">
        <div class="petItem">
          <span v-for="(item,index) in pets" :class="[{act:tab == index},'tab' + index]" :key="index" @click="tabClick(index)"></span>
        </div>
        <p class="tips" v-html="lang.petTips5.replace('$',pets[tab]?pets[tab].name:'').replace('%',pets[tab]?pets[tab].name:'')"></p>
      </div>
    </div>
    <div class="rank3" :style="{height:listHeight+'rem'}">
      <div class="bg">
        <div class="top">
          <!-- 日榜和总榜共用Loading（如果需要细化加载提示文案，可以把以下标签复制到不同的榜单后面） -->
          <div class="listTipsBox">
            <div v-if="rank.loading" class="scrollLoading">{{lang.loading}}</div>
            <div v-if="rank.none " class="scrollNone" v-html="lang.petTips6"></div>
          </div>
        </div>
        <div class="con"></div>
        <div class="bottom"></div>
      </div>
      <ul class="list day">
        <li v-for="(item,index) in rank.list" :key="index" :class="'top'+item.rank">
          <div class="rank">{{item.rank}}</div>
          <div class="imgBox" @click="goUser(item.uid)">
            <img v-if="item.avatar_frame &&item.avatar_frame != ''" :src="item.avatar_frame" class="frame" alt="">
            <!-- <img src="../assets/img/testFrame.png" class="frame" alt=""> -->
            <img v-else-if="item.nob > 0" :src="require(`../assets/img/nob/${item.nob}.png`)" class="nob" alt="">
            <img v-lazy="item.avatar" alt="" class="av">
          </div>
          <div class="nick"><strong>{{item.nick}}</strong> <i v-if="item.live">Live</i> </div>
          <div class="score"> <img :src="pets[tab].img" alt=""> {{item.score}}</div>
        </li>
      </ul>
    </div>
    <div href="" class="refresh circle" @click.prevent="onRefresh()" :style="{transform:'rotate('+rotatePx+'deg)'}"></div>
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
  props: ['pets'],
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
      firstTask: true,
      listHeight: 0,
      del: true
    }
  },
  watch: {
    rank(val) {
      if (val.list && val.list.length) {
        this.listHeight = val.list.length * 1.4 + 0.65
      } else {
        this.listHeight = 1.65 + .65
      }
    }
  },
  computed: {
    ...mapState(['rankGroups', 'point']),
    rankKey() {
      return this.tab
    },
    rankApi() {
      if (this.isShare) {
        var dayApi = `/carnival2020ceremony/list3.php?gid={gid}&from={from}`;
        const token = getUrlString('token') || '';
        var id = this.pets[this.rankKey] ? this.pets[this.rankKey].id : 0
        return dayApi.replace('{gid}', id)
      } else {
        var dayApi = `/carnival2020ceremony/list3.php?token={token}&gid={gid}&from={from}`;
        const token = getUrlString('token') || '';
        var id = this.pets[this.rankKey] ? this.pets[this.rankKey].id : 0
        return dayApi.replace('{gid}', id).replace('{token}', token);
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
  activated() {
    window.addEventListener('scroll', this.onScroll)
  },
  deactivated() {
    window.removeEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    mainTabClick(tab) { //总榜切换
      this.mainTab = tab;
      this.vxc('changTab', this.rankKey)
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      });
    },
    tabClick(tab) { //日榜切换
      this.tab = tab;
      this.vxc('changTab', this.rankKey)
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      });
    },
    onScroll() {
      this.delPoint()
      if (!this.rank.loading && !this.rank.loadEnd && this.pets[1]) {
        const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100;
        const notFull = document.body.scrollHeight < window.innerHeigh;
        if (scrollToBottom || notFull || !this.rank.loadCount) {
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
            if (response_data.rank) {
              this.$store.commit("petChangGroupsUserMsg", {//初始当前日榜个人信息
                key: this.rankKey,
                msg: response_data.rank
              })
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
    delPoint() {
      let mainScorllTops = document.documentElement.scrollTop || document.body.scrollTop
      let petBarScorll = document.getElementsByClassName('petBar')[0].offsetTop
      let pats = document.getElementsByClassName('pats')[0].getBoundingClientRect().height
      if (mainScorllTops > (petBarScorll - pats) && this.del && this.point.three) {
        api.delRedPoint()
        this.vxc('delPoints')
        this.del = false
      }
    },
    onRefresh() {
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      if (this.rank.loading) return
      this.$parent.init()
      if (this.tab != 1) {
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
  },
}
</script>

<style lang="scss">
.rankGroups {
  position: relative;
  > li {
    padding: 0.5rem 0;
  }
  .mainTabs {
    width: 7.05rem;
    height: 0.83rem;
    margin: 0 auto;
    position: relative;
    .tabs {
      width: 6.41rem;
      height: 0.9rem;
      display: flex;
      justify-content: center;
      align-items: center;
      // background: url(../assets/img/tabs.png);
      // background-size: 100% 100%;
      margin: 0 auto;
      a {
        display: block;
        width: 3.24rem;
        height: 100%;
        text-align: center;
        line-height: 0.9rem;
        color: rgba(200, 249, 205, 1);
        font-size: 0.28rem;
        font-weight: 600;
        &.current {
          color: rgba(32, 88, 123, 1);
          // background: url(../assets/img/actTab.png);
          // background-size: 100% 100%;
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
    .petItem {
      display: flex;
      margin-top: 0.28rem;
      padding: 0 0.19rem;
      justify-content: space-between;
      > span {
        display: block;
        width: 1.18rem;
        height: 0.66rem;
        &.tab1 {
          background: url(../assets/img/pet_tabs/tab1.png);
          background-size: 100% 100%;
          &.act {
            background: url(../assets/img/pet_tabs/tab1_act.png);
            background-size: 100% 100%;
          }
        }
        &.tab2 {
          background: url(../assets/img/pet_tabs/tab2.png);
          background-size: 100% 100%;
          &.act {
            background: url(../assets/img/pet_tabs/tab2_act.png);
            background-size: 100% 100%;
          }
        }
        &.tab3 {
          background: url(../assets/img/pet_tabs/tab3.png);
          background-size: 100% 100%;
          &.act {
            background: url(../assets/img/pet_tabs/tab3_act.png);
            background-size: 100% 100%;
          }
        }
        &.tab4 {
          background: url(../assets/img/pet_tabs/tab4.png);
          background-size: 100% 100%;
          &.act {
            background: url(../assets/img/pet_tabs/tab4_act.png);
            background-size: 100% 100%;
          }
        }
        &.tab5 {
          background: url(../assets/img/pet_tabs/tab5.png);
          background-size: 100% 100%;
          &.act {
            background: url(../assets/img/pet_tabs/tab5_act.png);
            background-size: 100% 100%;
          }
        }
        &.tab6 {
          background: url(../assets/img/pet_tabs/tab6.png);
          background-size: 100% 100%;
          &.act {
            background: url(../assets/img/pet_tabs/tab6_act.png);
            background-size: 100% 100%;
          }
        }
      }
    }
    .tips {
      text-align: center;
      font-size: 0.28rem;
      font-weight: 500;
      margin: 0.15rem auto 0.32rem;
      em {
        color: rgba(254, 248, 149, 1);
      }
    }
  }
  .rank3 {
    width: 7.35rem;
    min-height: 2.4rem;
    position: relative;
    margin: 0 auto;
    .noData {
      text-align: center;
      margin-top: 1rem;
    }
    .bg {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      .top {
        width: 100%;
        height: 1.56rem;
        background: url(../assets/img/listBgHeader.png);
        background-size: 100% 100%;
      }
      .con {
        width: 100%;
        flex: 1;
        background: url(../assets/img/listBgCon.png);
        background-size: 100% auto;
      }
      .bottom {
        width: 100%;
        height: 0.65rem;
        background: url(../assets/img/listBgBotton.png);
        background-size: 100% 100%;
      }
    }
    .list {
      width: 6.67rem;
      position: absolute;
      top: 0;
      left: 0;
      padding: 0.39rem 0.3rem 0;
      li {
        height: 1.4rem;
        display: flex;
        align-items: center;
        position: relative;
        .rank {
          width: 0.51rem;
          height: 0.67rem;
          line-height: 0.67rem;
          text-align: center;
          font-size: 0.26rem;
          margin: 0 0.18rem 0 0.2rem;
        }
        .imgBox {
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
          .av {
            width: 0.88rem;
            height: 0.88rem;
            position: absolute;
            top: 0.1rem;
            left: 0.11rem;
            border-radius: 50%;
          }
        }
        .nick {
          width: 2.5rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 0.28rem;
          margin-left: 0.18rem;
        }
        .score {
          font-size: 0.28rem;
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          img {
            width: 0.6rem;
            height: 0.6rem;
            margin-right: 0.05rem;
          }
        }
        &.top1 {
          .rank {
            text-indent: 999rem;
            background: url(../assets/img/top1.png);
            background-size: 100% 100%;
          }
        }
        &.top2 {
          .rank {
            text-indent: 999rem;
            background: url(../assets/img/top2.png);
            background-size: 100% 100%;
          }
        }
        &.top3 {
          .rank {
            text-indent: 999rem;
            background: url(../assets/img/top3.png);
            background-size: 100% 100%;
          }
        }
      }
      li::before {
        content: "";
        width: 5.4rem;
        height: 1px;
        background: #ffffff;
        opacity: 0.3;
        position: absolute;
        bottom: 0;
        right: 0;
      }
      li:last-child::before {
        height: 0;
      }
    }
  }
}
.listTipsBox {
  width: 7.05rem;
  height: 1.13rem;
  margin: 0.6rem auto;
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
