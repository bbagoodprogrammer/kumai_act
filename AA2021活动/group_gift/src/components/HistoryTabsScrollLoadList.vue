<template>
  <div class="rankGroups">
    <!-- 日榜、总榜切换主Tabs -->
    <div class="mainTabs">
      <div class="tabs">
        <a class="tab1" @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" href="">{{lang.history_tab1}}</a>
        <a class="tab2" @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" href="">{{lang.history_tab2}}</a>
      </div>
    </div>
    <div class="tmTips" v-if="mainTab == 1">{{actTime}}{{lang.group_end}}</div>
    <!-- 总榜 -->
    <div class="rankList_history">
      <div class="tabHeader" v-if="mainTab == 0">
        <span>{{lang.history_tm}}</span>
        <span>{{lang.history_gift}}</span>
        <span>{{lang.history_type}}</span>
        <span>{{lang.history_nums}}</span>
        <span>{{lang.history_price}}</span>
        <span>{{lang.status}}</span>
      </div>
      <!-- <p class="noData" v-if="!rank.list.length">暫無數據</p> -->
      <ul class="list day" v-if="mainTab == 0">
        <li v-for="(item,index) in rank.list" :key="index" :class="{fail:item.status == 2}">
          <span>{{getDate(item.create_at)}}</span>
          <span>{{item.name}}</span>
          <span>{{lang.people_nums.replace('$',item.num)}}</span>
          <span>1</span>
          <span>{{item.price}}</span>
          <span>{{item.status==1?lang.people_suc:lang.people_redux}}</span>
        </li>
      </ul>
      <ul class='scrollable' v-else>
        <li v-for="(item,index) in rank.list" :key="index">
          <div class="imgBox">
            <img :src="item.img" alt="">
          </div>
          <div class="msg">
            <div class="giftName">{{item.name}} <i>{{item.kind*1?lang.people_Kroom:lang.people_song}}</i></div>
            <div class="pNums" v-html="lang.people_groupMsg.replace('$',item.num).replace('%',item.surplus)">

              <!-- {{item.num}}人團，還差 <em>{{item.surplus}}</em> 人</div> -->
              <div class="price">
                <span><em>{{item.price}}</em></span> <i class="icon"></i>
              </div>
            </div>
            <span class="buy" @click="showFriendsPup(item.id)">
              {{lang.group_inivte}}
            </span>
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
      <!-- 好友 -->
      <div class="mask" v-show="showFriends">
        <transition name="slide">
          <Friends v-if="showFriends" :order_id="order_id" />
        </transition>
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
import Friends from "./Friends"

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
  components: { Friends },
  data () {
    return {
      mainTab: 0,
      showFriends: false,
      order_id: null
      // channel1: {
      //   0: '任務獲得',
      //   1: '送禮獲得'
      // },
      // channel2: {
      //   0: '全服許願值獎勵',
      //   1: '個人許願值獎勵',
      //   2: '日榜獎勵'
      // }
    }
  },
  computed: {
    ...mapState(['rankGroups_history', 'end']),
    rankKey () {
      return this.mainTab == 1 ? 'total' : this.mainTab;
    },
    rankApi () {
      var dayApi = `/gift_group/myGroup.php?token={token}&from={from}&type={type}`;
      const token = getUrlString('token') || '';
      return dayApi.replace('{token}', token).replace('{type}', this.mainTab)

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
    channel1: () => _lang.channel1,
    channel2: () => _lang.channel2,
    actTime () {
      return getDate(new Date(this.end * 1000), 5)
    }
  },
  mounted () {
    this.onScroll(); // 如果默认展示的Tabs依赖服务器配置，把此方法移到watch中去调用（watch更新Tabs值后调onScroll）
    // 如果初始化接口返回当前榜单数据，可以在Store的Action拿到服务器数据时先调用commit('updateRankGroups', {key:key, list:[]})，再更新state.tab触发组件watch
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
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
      console.log('xxxxx')
      if (!this.rank.loading && !this.rank.loadEnd) {
        const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100;
        const notFull = document.body.scrollHeight < window.innerHeigh;
        if (scrollToBottom || notFull || !this.rank.loadCount) {
          console.log('xxxoverxx')
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
    getDate (tm) {
      return getDate(new Date(tm * 1000), 1)
    },
    goUser (uid) { //跳转
      location.href = `uid:${uid}`
    },
    closeHistory () {
      this.$parent.showHistory = false
    },
    showFriendsPup (id) {
      this.order_id = id
      this.showFriends = true
    },
  },
}
</script>

<style lang="scss" scoped>
.noData {
  text-align: center;
  font-size: 0.28rem;
  color: rgba(133, 90, 55, 1);
}
.rankGroups {
  position: relative;
  .tmTips {
    text-align: center;
    color: rgba(133, 90, 55, 1);
    font-size: 0.24rem;
  }
  .mainTabs {
    margin: 0.52rem auto;
    position: relative;
    .tabs {
      width: 7.18rem;
      height: 0.88rem;
      background: #ffffff;
      border-radius: 0.44rem;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      a {
        // display: block;
        width: 3.56rem;
        height: 0.82rem;
        border-radius: 0.41rem;
        text-align: center;
        line-height: 0.82rem;
        color: rgba(133, 90, 55, 1);
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 0.3rem;
        &.current {
          color: #fff;
          background: linear-gradient(-90deg, #ff885a, #ff6957);
        }
      }
    }
  }
  .rankTips {
    .giftTips {
      > p {
        text-align: center;
        font-size: 0.28rem;
        line-height: 0.4rem;
        margin: 0.1rem 0;
      }
      .giftItem {
        padding: 0 0.2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .item {
          .imgBox {
            width: 1.6rem;
            height: 1.6rem;
            // background: url(../assets/img/box/giftItemBg.png);
            // background-size: 100% 100%;
            position: relative;
            img {
              width: 100%;
              height: 100%;
            }
            .boxIcon {
              display: block;
              width: 1.24rem;
              height: 0.34rem;
              // background: url(../assets/img/rank/boxIcon.png);
              // background-size: 100% 100%;
              position: absolute;
              left: 0.18rem;
            }
          }
          strong {
            font-size: 0.26rem;
            display: block;
            text-align: center;
          }
        }
      }
    }
  }
  .rankList_history {
    width: 7.15rem;
    // height: 3.48rem;
    background: #ffffff;
    border-radius: 0.12rem;
    overflow-x: hidden;
    overflow-y: scroll;
    margin: 0.48rem auto;
    .tabHeader {
      width: 6.66rem;
      border-bottom: 0.015rem solid rgba(250, 225, 198, 1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: rgba(157, 96, 77, 1);
      font-size: 0.24rem;
      margin: 0 auto;
      height: 0.97rem;
      height: 0.97rem;
      span {
        flex: 1;
        text-align: center;
      }
    }
    .list {
      width: 6.66rem;
      margin: 0 auto;
      li {
        padding: 0.1rem 0;
        margin-bottom: 0.1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: rgba(133, 90, 55, 1);
        font-size: 0.24rem;
        span {
          flex: 1;
          text-align: center;
        }
        &.fail {
          color: rgba(133, 90, 55, 0.6);
        }
      }
    }
  }
}
.close {
  width: 0.7rem;
  height: 0.7rem;
  // background: url(../img/close.png);
  // background-size: 100% 100%;
  position: absolute;
  bottom: -0.6rem;
  left: 3.1rem;
}
.scrollable {
  max-height: 11.55rem;
  margin-top: 0.15rem;
  overflow-x: hidden;
  overflow-y: scroll;
  li {
    height: 1.6rem;
    display: flex;
    align-items: center;
    color: rgba(133, 90, 55, 1);
    position: relative;
    .msg {
      //   width: 3.5rem;
      flex: 1;
      .giftName {
        display: flex;
        align-items: center;
        // justify-content: center;
        font-size: 0.32rem;
        color: rgba(133, 90, 55, 1);
        i {
          padding: 0 0.08rem;
          height: 0.3rem;
          line-height: 0.3rem;
          border: 1px solid #ff7959;
          border-radius: 0.06rem;
          font-size: 0.22rem;
          color: rgba(255, 121, 89, 1);
          margin-left: 0.05rem;
        }
      }
      .pNums {
        font-size: 0.26rem;
      }
      .price {
        font-size: 0.18rem;
        display: flex;
        align-items: center;
        // justify-content: center;
        span {
          color: rgba(255, 121, 89, 1);
          em {
            color: rgba(255, 121, 89, 1);
            font-size: 0.26rem;
            font-weight: 600;
            margin-left: 0.05rem;
          }
        }
        i {
          width: 0.28rem;
          height: 0.28rem;
          background: url(../img/coins.png);
          background-size: 100% 100%;
          margin: 0 0.06rem;
        }
        del {
          font-size: 0.18rem;
        }
      }
    }
    .imgBox {
      width: 1.2rem;
      height: 1.2rem;
      background: rgba(255, 245, 237, 0.92);
      border-radius: 0.06rem;
      margin: 0 0.14rem 0 0.2rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .buy {
      display: inline-block;
      max-width: 2.5rem;
      padding: 0 0.2rem;
      height: 0.48rem;
      background: linear-gradient(-90deg, #ff885a, #ff6957);
      border-radius: 0.24rem;
      text-align: center;
      line-height: 0.48rem;
      color: #fff;
      font-size: 0.24rem;
      white-space: nowrap;
    }
  }
  li::before {
    content: '';
    display: block;
    width: 5.1rem;
    height: 0.015rem;
    position: absolute;
    bottom: 0;
    right: 0.3rem;
    background: RGBA(255, 229, 226, 1);
  }
}
.listTipsBox {
  height: 1.13rem;
  margin: 0 auto;
  // background: url(../assets/img/listBg.png);
  // background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgba(145, 77, 68, 1);
  font-size: 0.24rem;
}
</style>
