<template>
  <div class="rankGroups">
    <!-- 日榜、总榜切换主Tabs -->
    <div class="mainTabs">
      <div class="tabs">
        <a class="tab1" @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" href=""></a>
        <a class="tab2" @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" href=""></a>
      </div>
      <a @click.prevent="onRefresh" href="" :style="{transform:'rotate('+rotatePx+'deg)'}" id="refresh" v-if="actStatus == 1"></a>
    </div>
    <div class="rankTips">
      <div class="giftTips" v-if="mainTab == 0">
        <p>Điểm Rực Rỡ=lượt thích bài hát x10 + mị lực quà xu của bài hát<br />Bài hát dự thi nhận quà sau, mị lực tăng 5%</p>
        <div class="giftItem">
          <div class="item" v-for="(item,index) in giftArr" :key="index">
            <div class="imgBox">
              <i class="boxIcon" v-if="index == 3"></i>
              <img :src="require(`../assets/img/rank/gift/gift${index + 1}.png`)" alt="">
            </div>
            <strong>{{item}}</strong>
          </div>
        </div>
        <p class="timeTips">21:00 – 21:10 bài hát dự thi nhận quà xu, tăng 10% mị lực nhận.</p>
      </div>
      <p v-else>Bài hát gắn thẻ “Vua Ca Nhạc” trong vòng 48h sau khi đăng nếu nhận đủ 20k mị lực quà xu sẽ tăng 20% điểm xếp hạng trên BXH ca khúc trên app.</p>
    </div>

    <!-- 总榜 -->
    <div class="rankList">
      <ul v-if="mainTab==0" class="list day">
        <li v-for="(item,index) in rank.list" :key="index" :class="'rank' +item.rank">
          <div class="rank">{{item.rank}}</div>
          <div class="imgBox" @click="goUser(item.uid)">
            <img v-if="item.frame &&item.frame != ''" :src="item.frame" class="frame" alt="">
            <!-- <img src="../assets/img/testFrame.png" class="frame" alt=""> -->
            <img v-else-if="item.noble > 0" :src="require(`../assets/img/nob/${item.noble}.png`)" class="nob" alt="">
            <img v-lazy="item.avatar" alt="" class="av">
          </div>
          <div class="msg">
            <div class="nick">{{item.nick}}</div>
            <div class="add" v-if="item.ratio > 0">Tăng {{item.ratio}}%</div>
          </div>
          <div class="score">
            <div class="lv">Lv.{{item.level}} <em class="lvScore">Điểm Rực Rỡ:{{item.score}}</em> </div>
            <div class="iconScore">
              <span> <i class="sIcon1"></i>{{item.like}}</span>
              <span> <i class="sIcon2"></i>{{item.charm}}</span>
            </div>
          </div>
        </li>
      </ul>
      <!-- 飙升 -->
      <div class="upTopRank" v-else-if="mainTab==1">
        <div class="topTabs">
          <span :class="{act:tab == 1}" @click="tabClick(1)">Đăng trong 48h</span>
          <span :class="{act:tab == 2}" @click="tabClick(2)">Đăng 48h trước</span>
        </div>
        <div class="listHeader">
          <span class="name">Tên bài hát</span>
          <span class="bar">Tiến độ quà</span>
          <span class="status">Trạng thái</span>
        </div>
        <ul class="list total">
          <li v-for="(item,index) in rank.list" :key="index">
            <div class="rank">{{index +1}}</div>
            <img :src="item.cover" alt="" class="av" @click="goSong(item.sid)">
            <div class="songMsg">
              <div class="nick">{{item.name}}</div>
              <div class="tm">{{getDate(item.time,1)}}</div>
            </div>
            <div class="bar">
              <strong>{{item.score}}/{{item.target}}</strong>
              <span class="actBar" :class="{max:(item.score/item.target) *100 >93,min:item.score > 0,black:tab == 2 && item.status == 0}" :style="{width:(item.score/item.target) *100+'%'}"></span>
            </div>
            <div class="status">
              <strong v-if="tab == 2">{{item.status == 1?'Đã tăng tốc':'Quá hạn'}}</strong>
              <strong v-else>{{item.status == 1?'Đã tăng tốc':'Đợi tăng tốc'}}</strong>
              <span v-if="!item.status && tab == 1">Còn:{{getDate(item.ltime,2)}}</span>
            </div>
          </li>
        </ul>
      </div>

      <!-- 日榜和总榜共用Loading（如果需要细化加载提示文案，可以把以下标签复制到不同的榜单后面） -->
      <div class="listTipsBox" v-if="rank.loading|| rank.none">
        <div v-if="rank.loading" class="scrollLoading">Đang tải...</div>
        <div v-if="rank.none " class="scrollNone">
          Chưa có số liệu
        </div>
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
      giftArr: [
        'Ủng Hộ Bạn',
        'Hoa Hồng',
        'Kỳ Lân 7 Màu',
        'Cạn Ly Bia'
      ]
    }
  },
  watch: {
    // nowDay(val) {
    //   this.tab = val
    //   this.$nextTick(() => {
    //     if (!this.rank.loadCount) {
    //       this.onScroll();
    //     }
    //   });
    // }
  },
  computed: {
    ...mapState(['rankGroups', "setInited", "isShare", "actStatus"]),
    rankKey() {
      return this.mainTab == 0 ? 'total' : this.tab;
    },
    rankApi() {
      if (this.isShare) {
        var dayApi = `/songking2020/upRank.php?`;
        var totalApi = `/songking2020/rank.php?from={from}`;
        var api = this.rankKey == 'total' ? totalApi : dayApi;
        return api
      } else {
        var dayApi = `/songking2020/upRank.php?token={token}`;
        var totalApi = `/songking2020/rank.php?token={token}&from={from}`;
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
      // this.vxc('changTab', this.rankKey)
      // this.vxc('changTab', this.rankKey)
      // this.$nextTick(() => {
      //   if (!this.rank.loadCount) {
      //     this.onScroll();
      //   }
      // });
    },
    onScroll() {
      if (!this.rank.loading && !this.rank.loadEnd) {

        const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100;
        const notFull = document.body.scrollHeight < window.innerHeigh;
        if (scrollToBottom || notFull || !this.rank.loadCount) {
          const mainTab = this.mainTab
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
            if (mainTab == 1) {
              let user = response_data.user
              user['total'] = response_data.infos.total
              user['up'] = response_data.infos.up
              this.vxc('updateRankGroups', { //当前日榜信息
                key: 1,
                loadCount: 1,
                loadEnd: response_data.infos.valid.length < 20,
                loading: false,
                none: response_data.infos.valid.length == 0,
                list: response_data.infos.valid,
              })
              this.vxc('updateRankGroups', { //当前日榜信息
                key: 2,
                loadCount: 1,
                loadEnd: response_data.infos.invalid.length < 20,
                loading: false,
                none: response_data.infos.invalid.length == 0,
                list: response_data.infos.invalid,
              })
              this.$store.commit("changGroupsUserMsg", {//初始当前日榜个人信息
                key: key,
                msg: user
              })
            }
            const arr = response_data.list;
            if (arr.slice && mainTab == 0) {
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
    getDate(time, type) {
      if (type == 1) {
        return getDate(new Date(time * 1000), type)
      }
      return this.secondToTimeStr(time)
    },
    goUser(uid) { //跳转
      location.href = `uid:${uid}`
    },
    goSong(sid) {
      location.href = 'songid:{"songlist":[' + sid + '],"index":0}';
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.onScroll);
    },
    secondToTimeStr(t) {
      if (!t) return;
      if (t < 60) return ((i = t) < 10 ? "0" + i : i) + 's';
      if (t < 3600) return "" + ((a = parseInt(t / 60)) < 10 ? "0" + a : a) + "min" + ((i = t % 60) < 10 ? "0" + i : i) + 's';
      if (3600 <= t) {
        var a, i, e = parseInt(t / 3600);
        return (e < 10 ? "0" + e : e) + "h" + ((a = parseInt(t % 3600 / 60)) < 10 ? "0" + a : a) + "min";
      }
    }
  },
}
</script>

<style lang="scss">
.rankGroups {
  margin-top: 0.5rem;
  padding: 0.24rem 0 0;
  position: relative;
  .mainTabs {
    // width: 7rem;
    height: 0.9rem;
    margin: 0 auto;
    position: relative;
    .tabs {
      height: 0.9rem;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      a {
        display: block;
        width: 3.75rem;
        height: 100%;
        text-align: center;
        line-height: 0.9rem;
        color: rgba(200, 249, 205, 1);
        transition: all 0.1s linear;
        &.tab1 {
          background: url(../assets/img/rank/rankTab1.png);
          background-size: 100% 100%;
          &.current {
            background: url(../assets/img/rank/rankTab1_act.png);
            background-size: 100% 100%;
          }
        }
        &.tab2 {
          background: url(../assets/img/rank/rankTab2.png);
          background-size: 100% 100%;
          &.current {
            background: url(../assets/img/rank/rankTab2_act.png);
            background-size: 100% 100%;
          }
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
        margin: 0.25rem 0 0.2rem;
      }
      .timeTips {
        margin: 0.75rem 0 0.24rem;
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
            background: url(../assets/img/box/giftItemBg.png);
            background-size: 100% 100%;
            position: relative;
            img {
              width: 100%;
              height: 100%;
            }
            .boxIcon {
              display: block;
              width: 1.24rem;
              height: 0.34rem;
              background: url(../assets/img/rank/boxIcon.png);
              background-size: 100% 100%;
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
    > p {
      text-align: center;
      font-size: 0.28rem;
      padding: 0 0.27rem;
      margin: 0.43rem 0 0.55rem;
    }
  }
  .rankList {
    width: 7.1rem;
    border: 0.05rem solid RGBA(255, 228, 152, 1);
    border-radius: 0.2rem;
    margin: 0 auto;
    .upTopRank {
      .topTabs {
        width: 6.4rem;
        height: 0.88rem;
        display: flex;
        align-self: center;
        background: url(../assets/img/rank/topTabsBg.png);
        background-size: 100% 100%;
        margin: 0.38rem auto 0;
        span {
          width: 3.2rem;
          height: 0.8rem;
          text-align: center;
          line-height: 0.88rem;
          color: rgba(144, 133, 118, 1);
          font-size: 0.28rem;
          &.act {
            font-size: 0.32rem;
            color: rgba(126, 26, 6, 1);
            background: url(../assets/img/rank/topTabsAct.png);
            background-size: 100% 100%;
          }
        }
      }
      .listHeader {
        padding: 0 0.39rem;
        font-size: 0.28rem;
        color: rgba(252, 245, 193, 1);
        display: flex;
        white-space: nowrap;
        margin: 0.2rem 0 0.1rem;
        .name {
          width: 2.6rem;
          text-align: right;
        }
        .bar {
          width: 2.8rem;
          text-align: center;
        }
        .status {
          flex: 1;
          text-align: center;
        }
      }
    }
    .list {
      width: 7.1rem;
      &.total {
        .rank {
          width: 0.4rem;
        }
        .av {
          width: 0.88rem;
          height: 0.88rem;
          border-radius: 0.1rem;
          margin: 0 0.12rem;
        }
        .songMsg {
          width: 1.65rem;
          white-space: nowrap;
          .nick {
            font-size: 0.26rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .tm {
            font-size: 0.24rem;
            opacity: 0.5;
            margin-top: 0.15rem;
          }
        }
        .bar {
          width: 1.65rem;
          height: 0.29rem;
          background: #dddddd;
          border-radius: 0.17rem;
          text-align: center;
          line-height: 0.33rem;
          color: rgba(96, 37, 0, 1);
          position: relative;
          strong {
            font-size: 0.22rem;
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: 1;
          }
          .actBar {
            display: block;
            max-width: 100%;
            height: 0.29rem;
            background: linear-gradient(90deg, #ffc875, #ffdda4);
            border-radius: 0.17rem 0 0 0.17rem;
            text-align: center;
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            &.max {
              border-radius: 0.17rem;
            }
            &.min {
              min-width: 7%;
            }
            &.black {
              background: #666666;
            }
          }
        }
        .status {
          flex: 1;
          display: flex;
          // justify-content: flex-end;
          align-items: flex-end;
          flex-direction: column;
          strong {
            display: block;
            font-size: 0.24rem;
            white-space: nowrap;
          }
          span {
            white-space: nowrap;
            font-size: 0.2rem;
            opacity: 0.5;
          }
        }
      }
      li {
        height: 1.4rem;
        display: flex;
        align-items: center;
        position: relative;
        padding: 0 0.3rem;
        .rank {
          width: 0.76rem;
          height: 0.65rem;
          text-align: center;
          line-height: 0.65rem;
          font-size: 0.32rem;
        }
        .imgBox {
          width: 1.1rem;
          height: 1.1rem;
          position: relative;
          margin: 0 0.18rem;
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
            border: 0.04rem solid rgba(247, 224, 160, 1);
            box-sizing: border-box;
            top: 0.1rem;
            left: 0.11rem;
            border-radius: 50%;
            position: absolute;
          }
        }
        .msg {
          width: 1.8rem;
          .nick {
            font-size: 0.28rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .add {
            width: 1.07rem;
            height: 0.33rem;
            background: linear-gradient(90deg, #d19d51 0%, #edca92 100%);
            border: 0.02rem solid #ffef9d;
            box-sizing: border-box;
            border-radius: 0.17rem;
            text-align: center;
            line-height: 0.33rem;
            color: rgba(96, 37, 0, 1);
            font-size: 0.22rem;
            margin-top: 0.15rem;
            white-space: nowrap;
          }
        }
        .score {
          flex: 1;
          width: 2.48rem;
          .lv {
            white-space: nowrap;
            color: rgba(252, 245, 193, 1);
            font-size: 0.24rem;
            text-align: center;
            em {
              font-size: 0.24rem;
            }
          }
          .iconScore {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 0.28rem;
            margin-top: 0.15rem;
            span {
              font-size: 0.28rem;
              display: flex;
              align-items: center;
              i {
                width: 0.36rem;
                height: 0.36rem;
                margin-right: 0.05rem;
              }
              .sIcon1 {
                background: url(../assets/img/rank/sIcon1.png);
                background-size: 100% 100%;
              }
              .sIcon2 {
                background: url(../assets/img/rank/sIcon2.png);
                background-size: 100% 100%;
              }
            }
          }
        }
        &.rank1 {
          .rank {
            text-indent: -999rem;
            background: url(../assets/img/rank/top1.png);
            background-size: 100% 100%;
          }
        }
        &.rank2 {
          .rank {
            text-indent: -999rem;
            background: url(../assets/img/rank/top2.png);
            background-size: 100% 100%;
          }
        }
        &.rank3 {
          .rank {
            text-indent: -999rem;
            background: url(../assets/img/rank/top3.png);
            background-size: 100% 100%;
          }
        }
      }
      li:last-child::before {
        display: none;
      }
      li:before {
        content: "";
        display: block;
        width: 6.56rem;
        height: 0.02rem;
        background: url(../assets/img/xu.png);
        background-size: 100% 100%;
        position: absolute;
        bottom: -0.03rem;
        left: 0.3rem;
        z-index: 10;
      }
    }
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
  color: #fef978;
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
  height: 0.94rem;
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
