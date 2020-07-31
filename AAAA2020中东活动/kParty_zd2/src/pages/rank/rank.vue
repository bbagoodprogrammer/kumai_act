<template>
  <div class="rankGroups">
    <a @click.prevent="onRefresh" href="" class="refresh" :style="{transform:'rotate('+rotatePx+'deg)'}"></a>
    <!-- 日榜、总榜切换主Tabs -->
    <div class="mainTabs">
      <a @click.prevent="changPre(0)" :class="{current:month==0}" href="">القائمة الأسبوعية للغرف</a>
      <a @click.prevent="changPre(1)" :class="{current:month ==1}" href="">القائمة الشهرية للغرف</a>
    </div>
    <div class="lastTabs">
      <span v-if="month== 0 && mainTab==2" @click="mainTabClick(0)">ترتيب الأسبوع الحالي>></span>
      <span v-if="month== 0 && mainTab==0" @click="mainTabClick(2)">ترتيب الأسبوع السابق>></span>
      <span v-if="month== 1 && mainTab==3" @click="mainTabClick(1)">ترتيب الشهر الحالي>></span>
      <span v-if="month== 1 && mainTab==1" @click="mainTabClick(3)">ترتيب الشهر السابق>></span>
    </div>
    <p v-if="mainTab==0" class="rankTips">وفقًا لترتيب نقاط الأسبوع الحالي في كل غرفة، ستحصل الغرفة التي تصل نقاط الأسبوع الحالي إلى 1000 و مرتبتها في العشرة الأوائل على مكافأة.</p>
    <p v-else-if="mainTab==2" class="rankTips">وفقًا لترتيب نقاط الأسبوع الحالي في كل غرفة، ستحصل الغرفة التي تصل نقاط الأسبوع السابق إلى 1000 و مرتبتها في العشرة الأوائل على مكافأة.</p>
    <p v-else-if="mainTab==1" class="rankTips">وفقًا لترتيب نقاط الشهر الحالي في كل غرفة، ستحصل الغرفة التي تصل نقاط الشهر الحالي إلى 4000 و مرتبتها في العشرة الأوائل على مكافأة.</p>
    <p v-else class="rankTips">وفقًا لترتيب نقاط الشهر الحالي في كل غرفة، ستحصل الغرفة التي تصل نقاط الشهر السابق إلى 4000 و مرتبتها في العشرة الأوائل على مكافأة.</p>
    <ul class="list day" :class="{nodata: rank.list.length == 0}">
      <li v-for="(item,index) in rank.list" :key="index" @click="goUser(item.rid)">
        <div class="rank">{{item.rank}}</div>
        <img v-lazy="item.img" alt="">
        <div class="userMsg">
          <div class="name">{{item.name}}</div>
          <div class="rid">{{item.is_ktv?"رقم غرفة الغناء":"رقم غرفة الدردشة"}} <em>{{item.rid}}</em> </div>
        </div>
        <div class="score" v-if="mainTab==0 || mainTab==2">نقاط الأسبوع الحالي <em>{{item.score}}</em> </div>
        <div class="score" v-else>نقاط الشهر الحالي <em>{{item.score}}</em> </div>
      </li>
    </ul>
    <!-- 总榜 -->
    <!-- <ul v-else class="list total">
      <li v-for="(item,index) in rank.list" :key="index" @click="goUser(item.uid)">总榜{{JSON.stringify(item)}}</li>
    </ul> -->
    <!-- 日榜和总榜共用Loading（如果需要细化加载提示文案，可以把以下标签复制到不同的榜单后面） -->
    <div v-if="rank.loading" class="scrollLoading">...في التحميل</div>
    <div v-if="rank.none" class="scrollNone">!هذه الغرفة خالية</div>
    <div class="footer" v-if="msg.rank != 0 && msg.rid">
      <div class="rank">{{msg.rank}}</div>
      <img v-lazy="msg.img" alt="">
      <div class="userMsg">
        <div class="name">{{msg.name}}</div>
        <div class="rid">{{msg.is_ktv?"رقم غرفة الغناء":"رقم غرفة الدردشة"}} <em>{{msg.rid}}</em></div>
      </div>
      <div class="score" v-if="mainTab==0 || mainTab==2">نقاط الأسبوع الحالي <em>{{msg.score}}</em> </div>
      <div class="score" v-else>نقاط الشهر الحالي <em>{{msg.score}}</em> </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import getUrlString from '../../utils/getString.js';

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
  data() {
    return {
      month: 0,
      mainTab: 0,
      tab: 0,
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
    };
  },
  computed: {
    ...mapState(['rankGroups', 'groupsUserMsg']),
    rankKey() {
      // return ['one', 'two', 'three'][this.tab];
      return this.mainTab;
    },
    rankApi() {
      const dayApi = '/kroom_party/rankList.php?pre={pre}&month={month}&from={from}&token={token}';
      let pre = 0
      let month = 0
      if (this.mainTab == 1) {
        month = 1
      } else if (this.mainTab == 2) {
        pre = 1
      } else if (this.mainTab == 3) {
        pre = 1
        month = 1
      }
      let token = getUrlString('token')
      return dayApi.replace('{pre}', pre).replace('{month}', month).replace('{token}', token)
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
    msg() {
      let nowMsg = this.groupsUserMsg[this.rankKey] || {}
      console.log(nowMsg.msg ? nowMsg.msg : {})
      return nowMsg.msg ? nowMsg.msg : {}
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
    changPre(val) {
      this.month = val
      if (val == 1) {
        this.mainTabClick(1)
      } else {
        this.mainTabClick(0)
      }
    },
    mainTabClick(tab) {
      this.mainTab = tab;
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      });
    },
    // tabClick(tab) {
    //   this.tab = tab;
    //   this.$nextTick(() => {
    //     if (!this.rank.loadCount) {
    //       this.onScroll();
    //     }
    //   });
    // },
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
            this.vxc('changGroupsUserMsg', {
              key: this.mainTab,
              msg: response_data.rank
            })
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
    goUser(rid) {
      location.href = `rid:${rid}`
    }
  },
}
</script>

<style lang="scss">
@import "../../assets/scss/common.scss";
body {
  background: rgba(65, 23, 122, 1);
}
.footer {
  width: 7.5rem;
  height: 1.26rem;
  background: url(../../assets/img/footer.png);
  background-size: 100% 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  .rank {
    width: 0.8rem;
    font-size: 0.4rem;
    color: #fff;
    margin-left: 0.29rem;
    text-align: center;
    font-weight: 600;
    font-style: italic;
  }
  img {
    width: 0.74rem;
    height: 0.74rem;
    border-radius: 50%;
    border: 0.03rem solid rgba(190, 127, 255, 1);
  }
  .userMsg {
    margin-left: 0.13rem;
    .name {
      width: 2rem;
      max-width: 2rem;
      font-size: 0.24rem;
      font-weight: 500;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .rid {
      font-size: 0.24rem;
      color: rgba(216, 190, 255, 1);
    }
  }
  .score {
    color: rgba(255, 248, 190, 1);
    font-size: 0.24rem;
    em {
      display: block;
    }
  }
}
.scrollLoading,
.scrollNone {
  text-align: center;
  margin-top: 0.3rem;
}
.rankGroups {
  padding: 0.28rem 0.26rem 2rem;
  .mainTabs {
    width: 6.74rem;
    height: 0.98rem;
    padding: 0 0.12rem;
    background: url(../../assets/img/tabs.png);
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    a {
      width: 3.51rem;
      height: 0.76rem;
      color: rgba(187, 129, 251, 1);
      text-align: center;
      line-height: 0.76rem;
      text-align: center;
      line-height: 0.76rem;
      font-weight: 600;
      &.current {
        color: rgba(255, 255, 255, 1);
        background: url(../../assets/img/tabsAct.png);
        background-size: 100% 100%;
      }
    }
  }
  .lastTabs {
    margin: 0.26rem 0 0.13rem;
    font-weight: 600;
    color: RGBA(250, 123, 120, 1);
    text-align: right;
  }
  .rankTips {
    text-align: center;
    font-size: 0.26rem;
  }
  .list {
    width: 6.52rem;
    background: rgba(88, 16, 161, 1);
    border-radius: 0.2rem;
    margin: 0.2rem auto 0;
    padding-top: 0.27rem;
    &.nodata {
      background: none;
    }
    li {
      height: 1.16rem;
      position: relative;
      display: flex;
      align-items: center;
      .rank {
        width: 0.8rem;
        font-size: 0.4rem;
        color: rgba(217, 156, 255, 1);
        margin-left: 0.29rem;
        text-align: center;
        font-weight: 600;
        font-style: italic;
      }
      img {
        width: 0.74rem;
        height: 0.74rem;
        border-radius: 50%;
        border: 0.03rem solid rgba(190, 127, 255, 1);
      }
      .userMsg {
        margin-left: 0.13rem;
        .name {
          width: 2rem;
          max-width: 2rem;
          font-size: 0.24rem;
          font-weight: 500;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .rid {
          font-size: 0.24rem;
          color: rgba(216, 190, 255, 1);
          em {
            display: block;
          }
        }
      }
      .score {
        color: rgba(255, 248, 190, 1);
        font-size: 0.24rem;
        em {
          display: block;
        }
      }
    }
    li:before {
      content: "";
      width: 5.73rem;
      height: 0.02rem;
      background: rgba(107, 39, 175, 1);
      border-radius: 0.015rem;
      position: absolute;
      bottom: 0;
      left: 0.39rem;
    }
    li:last-child::before {
      display: none;
    }
  }
  .refresh {
    display: block;
    width: 0.94rem;
    height: 1rem;
    position: fixed;
    right: 0.08rem;
    bottom: 1.35rem;
    background: url(../../assets/img/refresh.png) no-repeat;
    background-size: contain;
    transition: transform 1s;
    z-index: 1000;
  }
}
</style>
