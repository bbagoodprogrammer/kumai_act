<template>
  <div class="rankGroups">
    <!-- 日榜、总榜切换主Tabs -->
    <div class="mainTabs">
      <div class="tabs">
        <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" href="">萌寵魅力榜</a>
        <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" href="">專屬萌寵榜</a>
      </div>
      <a @click.prevent="onRefresh" href="" :style="{transform:'rotate('+rotatePx+'deg)'}" id="refresh">刷新</a>
    </div>
    <div class="tabsTips">
      <p v-if="mainTab==0" class="taotalTips">依據收到所有萌寵禮物魅力值總和排名<br />每完整集齊一次萌寵（6個）額外增加1000魅力值</p>
      <div class="petTips" v-else>
        <div class="petItem">
          <span v-for="(item,index) in pets" :class="{act:tab == index}" :key="index" @click="tabClick(index)">
            {{item.name}}
          </span>
        </div>
        <p class="tips">依據收到{{pets[tab].name}}禮物數排名，前十名獲得豐厚獎勵</p>
      </div>
    </div>
    <ul v-if="mainTab==0" class="list day">
      <li v-for="(item,index) in rank.list" :key="index" :class="'rank'+item.rank" @click="goUser(item.uid,item.live)">
        <div class="rank">{{item.rank}}</div>
        <div class="imgBox">
          <!-- v-if="item.nob > 0"  v-else-if="item.vip > 0"-->
          <img v-if="item.nob > 0" :src="require(`../assets/img/nob/${item.nob}.png`)" class="nob" alt="">
          <i class="vip" v-else-if="item.vip > 0">VIP{{item.vip}}</i>
          <img v-lazy="item.avatar" alt="" class="av">
        </div>
        <div class="nick"><strong>{{item.nick}}</strong> <i v-if="item.live">Live</i> </div>
        <div class="score"> <i></i> <em>{{item.score}}</em></div>
      </li>
    </ul>
    <!-- 总榜 -->
    <ul v-else-if="mainTab==1" class="list total">
      <li v-for="(item,index) in rank.list" :key="index" :class="'rank'+item.rank" @click="goUser(item.uid,item.live)">
        <div class="rank">{{item.rank}}</div>
        <div class="imgBox">
          <!-- v-if="item.nob > 0"  v-else-if="item.vip > 0"-->
          <img v-if="item.nob > 0" :src="require(`../assets/img/nob/${item.nob}.png`)" class="nob" alt="">
          <i class="vip" v-else-if="item.vip > 0">VIP{{item.vip}}</i>
          <img v-lazy="item.avatar" alt="" class="av">
        </div>
        <div class="nick"><strong>{{item.nick}}</strong> <i v-if="item.live">Live</i> </div>
        <div class="score">
          <img :src="require(`../assets/img/pets/pet${tab}.png`)" alt="">
          <em>{{item.score}}</em>
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
      firstTask: true,
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
    ...mapState(['rankGroups', "pets", "nowDay", "setInited", "isShare", "activeityState", "daily_tasks", "dateArr"]),
    rankKey() {
      return this.mainTab == 0 ? 'total' : this.tab;
    },
    rankApi() {
      if (this.isShare) {
        var dayApi = `/pet_manor/allList.php?pet={pet}&from={from}`;
        var totalApi = `/pet_manor/allList.php?pet=0&from={from}`;
        var api = this.rankKey == 'total' ? totalApi : dayApi;
        var id = this.rankKey == 'total' ? 0 : this.pets[this.rankKey].id
        return api.replace('{pet}', id)
      } else {
        var dayApi = `/pet_manor/allList.php?token={token}&pet={pet}&from={from}`;
        var totalApi = `/pet_manor/allList.php?token={token}&pet=0&from={from}`;
        var api = this.rankKey == 'total' ? totalApi : dayApi;
        const token = getUrlString('token') || '';
        var id = this.rankKey == 'total' ? 0 : this.pets[this.rankKey].id
        return api.replace('{pet}', id).replace('{token}', token);
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

            //跟随榜单变换个人信息
            if (response_data.myRank) {
              this.$store.commit("changGroupsUserMsg", {//初始当前日榜个人信息
                key: this.rankKey,
                msg: response_data.myRank
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
    onRefresh() {
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      if (this.rank.loading) return
      this.$emit('getDefaultData')
      if (this.mainTab != 0) {
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
    beforeDestroy() {
      window.removeEventListener('scroll', this.onScroll);
    },
  },
}
</script>

<style lang="scss">
.rankGroups {
  // margin-top: -0.15rem;
  padding: 0.24rem 0.2rem 0;
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
      background: url(../assets/img/tabs.png);
      background-size: 100% 100%;
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
    .petItem {
      display: flex;
      margin-top: 0.28rem;
      justify-content: space-between;
      > span {
        display: block;
        width: 1.14rem;
        height: 0.6rem;
        background: url(../assets/img/petItemBg.png);
        background-size: 100% 100%;
        color: rgba(199, 248, 204, 1);
        font-size: 0.24rem;
        font-weight: 500;
        text-align: center;
        line-height: 0.6rem;
        &.act {
          color: rgba(32, 88, 123, 1);
          background: url(../assets/img/petItemBgAct.png);
          background-size: 100% 100%;
        }
      }
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
    margin: 0rem auto;
    width: 7.1rem;
    li {
      height: 1.13rem;
      background: url(../assets/img/listBg.png);
      margin-bottom: 0.17rem;
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      position: relative;
      .rank {
        width: 0.76rem;
        height: 0.65rem;
        color: rgba(212, 255, 232, 1);
        text-align: center;
        line-height: 0.65rem;
        margin-left: 0.08rem;
        font-weight: 700;
      }
      .imgBox {
        width: 1.2rem;
        height: 1.2rem;
        position: relative;
        .nob {
          width: 1.2rem;
          height: 1.2rem;
          position: absolute;
          top: 0.02rem;
          z-index: 10;
        }
        .av {
          width: 1rem;
          height: 1rem;
          border: 0.04rem solid rgba(32, 88, 123, 1);
          box-sizing: border-box;
          border-radius: 50%;
          position: absolute;
          left: 0.1rem;
          top: 0.1rem;
        }
        .vip {
          display: block;
          width: 0.8rem;
          height: 0.3rem;
          background: #fc6161;
          font-size: 0.24rem;
          color: #fffca1;
          position: absolute;
          bottom: 0.1rem;
          border-radius: 0.3rem;
          text-align: center;
          line-height: 0.3rem;
          left: 0.2rem;
          z-index: 11;
        }
      }

      .nick {
        width: 2rem;
        margin-left: 0.17rem;
        display: flex;
        align-items: center;
        strong {
          font-size: 0.24rem;
          font-weight: 500;
          width: 1.66rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        i {
          width: 0.78rem;
          height: 0.33rem;
          text-align: center;
          line-height: 0.33rem;
          background: rgba(149, 246, 188, 1);
          color: rgba(32, 88, 123, 1);
          font-size: 0.24rem;
          margin-left: 0.07rem;
        }
      }
      .score {
        display: flex;
        align-items: center;
        margin-left: 0.92rem;
        color: rgba(255, 252, 161, 1);
        font-size: 0.24rem;
        font-weight: 500;
        img {
          width: 0.7rem;
          height: 0.7rem;
          margin-right: 0.19rem;
        }
        i {
          width: 0.4rem;
          height: 0.38rem;
          background: url(../assets/img/star.png);
          background-size: 100% 100%;
          margin-right: 0.09rem;
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
