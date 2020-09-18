<template>
  <div class="rankGroups">
    <!-- 日榜、总榜切换主Tabs -->
    <!-- <div class="mainTabs">
      <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" class="tabL">日榜</a>
      <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" class="tabR">總榜</a>
      <a @click.prevent="onRefresh" href="" v-if="!isShare && actStatus===1" :style="{transform:'rotate('+rotatePx+'deg)'}" id="refresh"></a>
    </div> -->
    <!-- 日榜 -->
    <div class="list day" :class="{min:!host}">
      <ul>
        <li v-for="(item,index) in rank.list" :key="index">
          <img v-lazy="item.avatar" alt="" class="av">
          <div class="nick">{{item.nick}}</div>
          <div class="peopleNum" v-if="!host">{{item.nums}}</div>
          <div class="tm">{{getDate(item.time)}}</div>
          <div class="status" v-if="mainTab == 0 && host">
            <span v-if="item.status == 2" class="black text_shadow_black">已拒絕</span>
            <span v-else-if="item.status == 1" class="black text_shadow_black">已通過</span>
            <span v-else-if="item.status == 3" class="blue text_shadow_bule" @click="hostApplySet(item.uid,0,index)">通過</span>
            <span v-if="item.status == 3" class="yellow text_shadow_yellow" @click="hostApplySet(item.uid,1,index)">拒絕</span>
          </div>
          <div class="status" v-else-if="mainTab == 1 && host">
            <span v-if="item.status == 2" class="black text_shadow_black">已拒絕</span>
            <span v-else-if="item.status == 1" class="black text_shadow_black">已同意</span>
            <span v-else-if="item.status == 0" class="blue text_shadow_bule">待同意</span>
            <span v-if="item.status == 0 ||item.status == 2" class="black text_shadow_black" :class="{blue:item.status == 2,text_shadow_bule:item.status == 2}" @click="againInvited(item.uid,item.status,index)">再次邀請</span>
          </div>
          <div class="status" v-else-if="mainTab == 0 && !host">
            <span v-if="item.status == 2" class="black">已拒絕</span>
            <span v-else-if="item.status == 1" class="black">已同意</span>
            <span v-else-if="item.status == 0" class="blue text_shadow_bule">待通過</span>
            <span v-if="item.status == 0 ||item.status == 2" class="black text_shadow_black" :class="{blue:item.status == 2,text_shadow_bule:item.status == 2}" @click="againApplication(item.uid,item.status,index)">再次申請</span>
          </div>
          <div class="status" v-else-if="mainTab == 1 && !host">
            <span v-if="item.status == 2" class="black text_shadow_black">已拒絕</span>
            <span v-else-if="item.status == 1" class="black text_shadow_black">已同意</span>
            <span v-else-if="item.status == 3" class="blue text_shadow_bule" @click="applySet(item.uid,0,index)">同意</span>
            <span v-if="item.status == 3" class="yellow text_shadow_yellow" @click="applySet(item.uid,1,index)">拒絕</span>
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
//     updateHistory(state, obj) {
//         if (obj && typeof obj.key != 'undefined') {
//             const key = obj.key;
//             delete obj['key'];
//             state.rankGroups = Object.assign({}, state.rankGroups, {[key]: Object.assign({}, state.rankGroups[key], obj)});
//         }
//     },
// }

export default {
  props: ["host"],
  data() {
    return {
      mainTab: 0,
      surplusTime: {},//日榜剩余时间
      timer: null,
      timer2: null,
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
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
  },
  computed: {
    ...mapState(['history', "isShare", "actStatus", "inited", "second", "total", "day"]),
    rankKey() {
      // return ['one', 'two', 'three'][this.tab];
      return this.mainTab == 1 ? 'total' : this.mainTab;
    },
    rankApi() {
      if (this.isShare) {
        var dayApi = `/index.php?action=richMan.rank&type={type}&signture=innerserver`;
        return dayApi.replace('{type}', this.rankKey == 'total' ? 2 : 1)
      } else {
        var dayApi = `/kol_team_fight/records.php?token={token}&type={type}&from={from}`;
        const token = getUrlString('token') || '';
        return dayApi.replace('{type}', this.rankKey == 'total' ? 1 : 0).replace('{token}', token);
      }
    },
    rankSize() {
      // 如果明确服务器每次返回的列表长度，请返回具体的数值，有助于减少一次额外请求即可确定加载完所有数据
      return 20;
    },
    rank() {
      const rankConf = this.history[this.rankKey] || {};
      rankConf.list = rankConf.list || [];
      return rankConf;
    }
  },
  mounted() {
    this.onScroll(); // 如果默认展示的Tabs依赖服务器配置，把此方法移到watch中去调用（watch更新Tabs值后调onScroll）
    // 如果初始化接口返回当前榜单数据，可以在Store的Action拿到服务器数据时先调用commit('updateHistory', {key:key, list:[]})，再更新state.tab触发组件watch
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
      })
    },
    onScroll() {
      // if (this.tab > this.nowDay) return (this.tab > this.nowDay && this.rankKey !== 'total') || 
      if (!this.rank.loading && !this.rank.loadEnd) {
        const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100;
        const notFull = document.body.scrollHeight < window.innerHeigh;
        if (scrollToBottom || notFull) {
          const key = this.rankKey;

          const set = (k, v) => {
            this.$store.commit('updateHistory', { key, [k]: v });
          };
          setTimeout(() => {
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
                if (arr) {
                  //.length
                  // set('list', this.rank.list.concat(arr));
                  set('list', [
                    // {
                    //   "uid": 100861,
                    //   "avatar": "http://img.17sing.tw/uc/img/head_100861_1543577175.png_small",
                    //   "nick": "ＭＩＮＧＦＵＮＮＮＮ",
                    //   "time": 1600055600, //时间
                    //   nums: 11,
                    //   "status": 0  //状态 0 等待处理 1 已接受 2 已拒绝 3未操作
                    // },
                    {
                      "uid": 100861,
                      "avatar": "http://img.17sing.tw/uc/img/head_100861_1543577175.png_small",
                      "nick": "ＭＩＮＧＦＵＮＮＮＮ",
                      "time": 1600055600, //时间
                      nums: 11,
                      "status": 1  //状态 0 等待处理 1 已接受 2 已拒绝 3未操作
                    },
                    {
                      "uid": 100861,
                      "avatar": "http://img.17sing.tw/uc/img/head_100861_1543577175.png_small",
                      "nick": "ＭＩＮＧＦＵＮＮＮＮ",
                      "time": 1600055600, //时间
                      nums: 11,
                      "status": 2  //状态 0 等待处理 1 已接受 2 已拒绝 3未操作
                    },
                    {
                      "uid": 100861,
                      "avatar": "http://img.17sing.tw/uc/img/head_100861_1543577175.png_small",
                      "nick": "ＭＩＮＧＦＵＮＮＮＮ",
                      "time": 1600055600, //时间
                      "status": 3  //状态 0 等待处理 1 已接受 2 已拒绝 3未操作
                    }
                  ]);
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
          }, 500)

        }
      }
    },
    hostApplySet(uid, type, index) {   //隊長處理
      api.hostApplySet(uid, type).then(res => {
        if (res.data.response_status.code == 0) {
          let obj = {
            index: this.rankKey,
            listIndex: index,
            status: type == 0 ? 1 : 2
          }
          this.vxc('hostInivitSuc', obj)
        } else {
          this.vxc('setToast', {
            msg: res.data.response_status.error
          })
        }
      })
    },
    applySet(uid, type, index) {
      api.applySet(uid, type).then(res => {
        if (res.data.response_status.code == 0) {
          let obj = {
            index: this.rankKey,
            listIndex: index,
            status: type == 0 ? 1 : 2
          }
          this.vxc('hostInivitSuc', obj)
        } else {
          this.vxc('setToast', {
            msg: res.data.response_status.error
          })
        }
      })
    },
    againInvited(uid, status, index) {  //隊長再次邀請
      if (status == 2) {
        api.hostInvite(uid).then(res => {
          if (res.data.response_status.code == 0) {
            let obj = {
              index: this.rankKey,
              listIndex: index,
              status: 0
            }
            this.vxc('hostInivitSuc', obj)
          } else {
            this.vxc('setToast', {
              msg: res.data.response_status.error
            })
          }
        })
      }
    },
    againApplication(uid, status, index) {  //隊員再次申請
      if (status == 2) {
        api.application(uid).then(res => {
          if (res.data.response_status.code == 0) {
            let obj = {
              index: this.rankKey,
              listIndex: index,
              status: 0
            }
            this.vxc('hostInivitSuc', obj)
          } else {
            this.vxc('setToast', {
              msg: res.data.response_status.error
            })
          }
        })
      }
    },
    onRefresh() {
      if (this.rank.loading) return
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      this.$parent.getDefaultData()
      this.$store.commit('updateHistory', {
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
      return getDate(new Date(time * 1000), '2')
    },
  },
}
</script>

<style lang="scss">
.rankGroups {
  position: relative;
  // background: #f8ffe6 url(../assets/img/listBg.png) no-repeat;
  background-size: 100% auto;
  margin: 0.37rem auto;
  padding-bottom: 2rem;
  .list {
    margin: 0.3rem auto;
    position: relative;
    z-index: 10;
    &.min {
      .nick {
        width: 1.3rem;
      }
      // .tm {
      //   width: 1.2rem;
      // }
    }
    li {
      height: 1rem;
      display: flex;
      align-items: center;
      font-size: 0.22rem;
      text-align: center;
      .av {
        width: 0.7rem;
        height: 0.7rem;
        margin: 0 0.15rem;
        border-radius: 50%;
      }
      .nick {
        width: 1.5rem;
      }
      .peopleNum {
        width: 0.8rem;
      }
      .tm {
        width: 1.7rem;
      }
      .status {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          width: 1.27rem;
          height: 0.48rem;
          font-size: 0.24rem;
          line-height: 0.48rem;
          font-style: italic;
          &.yellow {
            background: url(../assets/img/btnStatus2.png);
            background-size: 100% 100%;
          }
          &.black {
            background: url(../assets/img/btnStatus3.png);
            background-size: 100% 100%;
          }
          &.blue {
            background: url(../assets/img/btnStatus1.png);
            background-size: 100% 100%;
          }
        }
      }
    }
  }
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
