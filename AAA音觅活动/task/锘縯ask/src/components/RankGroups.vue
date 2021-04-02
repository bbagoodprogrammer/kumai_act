<template>
  <div class="rankGroups">
    <header-nav :title="lang.rank_title"></header-nav>
    <div class="rank_rule" @click="openPro()">
      <span>{{lang.span_title}}</span>
      <img src="../img/question.png" alt />
      <div class="pro" v-if="pro_flag">
        <p>{{lang.rank_tips}}</p>
        <div class="prize_box">
          <p>{{lang.prize_box1}}</p>
          <div class="prize">
            <div class="prize_list">
              <img :src="images.week_prize1" alt="">
              <p>{{lang.prize_list1}}</p>
            </div>
            <div class="prize_list">
              <img :src="images.week_prize2" alt="">
              <p>{{lang.prize_list2}}</p>
            </div>
            <div class="prize_list">
              <img :src="images.week_prize3" alt="">
              <p>{{lang.prize_list3}}</p>
            </div>
          </div>
        </div>
        <div class="prize_box">
          <p>{{lang.prize_box1}}</p>
          <div class="prize">
            <div class="prize_list">
              <img :src="images.week_prize4" alt="">
              <p>{{lang.prize_list4}}</p>
            </div>
            <div class="prize_list">
              <img :src="images.week_prize5" alt="">
              <p>{{lang.prize_list5}}</p>
            </div>
            <div class="prize_list">
              <img :src="images.week_prize5" alt="">
              <p>{{lang.prize_list6}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 日榜、总榜切换主Tabs -->
    <div class="mainTabs">
      <a @click.prevent="mainTabClick(0)" :class="{current:whichWeek==0}" href>{{lang.whichWeek0}}</a>
      <a @click.prevent="mainTabClick(1)" :class="{current:whichWeek==1}" href>{{lang.whichWeek1}}</a>
    </div>
    <div class="mainTabs2">
      <a @click.prevent="tabClick(0)" :class="{current:mainTab==0}" href>{{lang.whichMainTab0}}</a>
      <a @click.prevent="tabClick(1)" :class="{current:mainTab==1}" href>{{lang.whichMainTab1}}</a>
    </div>
    <!-- 榜单 -->
    <template>
      <div class="rankList">
        <top-item v-for="(item,index) in rank.list" :info="item" :key="index" :from="mainTab" />
        <!-- 共用Loading -->
        <div v-if="rank.loading" class="scrollLoading">{{lang.loading}}</div>
        <div v-if="rank.none" class="scrollNone">{{lang.no_data}}</div>
      </div>
    </template>

    <!-- 日榜和总榜共用Loading -->
    <!-- <div v-if="rank.loading&&mainTab!=2" class="scrollLoading">{{lang.loading}}</div>
    <div v-if="rank.none&&mainTab!=2" class="scrollNone">{{lang.no_data}}</div>-->

    <div class="owner" v-if="is_Load&&dayRankOwnerInfos[rankKey]">
      <owner-item :info="dayRankOwnerInfos[rankKey]" :from="mainTab" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import { getUrlString } from "../utils";
// import mixin from "../utils/mixin";
import topItem from "./TopItem";
import OwnerItem from "../components/OwnerItem";
import HeaderNav from "../components/HeaderNav";

const uid = getUrlString("uid") || "";
const token = getUrlString("token") || "";

export default {
  // mixins: [mixin],
  data() {
    return {
      cid: 0,
      mainTab: 0, //0奇缘，1贡献
      whichWeek: 0, //0本周，1上周
      is_Load: false,
      pro_flag:false,//奖励弹窗说明
    };
  },
  computed: {
    ...mapState([
      "rankGroups",
      "activity_status",
      "inited",
      "share",
      "sign",
      "fid",
      "mine_data",
      "is_load",
      "myrank",
      "user_info",
      "dayRankOwnerInfos"
    ]),
    rankKey() {
      //mainTab： 0 奇缘 1 贡献  whichWeek：0 本  1 上
      //0 本周奇缘 1本周贡献  2上周奇缘  3上周贡献
      if (this.whichWeek == 0) {
        if (this.mainTab == 0) {
          return "0";
        } else {
          return "1";
        }
      } else {
        if (this.mainTab == 0) {
          return "2";
        } else {
          return "3";
        }
      }
    },
    rankApi() {
      let dayApi;
      // console.log(this.rankKey);
      //0本周 1上周 2本月 3 上月
      dayApi = {
        "0": "/index.php?action=Action/StrangeFate.getStrangeFateList&whichWeek=0&uid={uid}&token={token}&lang={lang}&rid={rid}",
        "1": "/index.php?action=Action/StrangeFate.getContributeList&whichWeek=0&uid={uid}&token={token}&lang={lang}&rid={rid}",
        "2": "/index.php?action=Action/StrangeFate.getStrangeFateList&whichWeek=1&uid={uid}&token={token}&lang={lang}&rid={rid}",
        "3": "/index.php?action=Action/StrangeFate.getContributeList&whichWeek=1&uid={uid}&token={token}&lang={lang}&rid={rid}",
      };
      const api = dayApi[this.rankKey];
      const uid = getUrlString("uid") || "";
      const token = getUrlString("token") || "";
      const lang = getUrlString("lang") || "";
      const rid = getUrlString("rid") || "";
      return api.replace("{uid}", uid).replace("{token}", token).replace("{lang}", lang).replace("{rid}", rid);
    },
    rankSize() {
      return 20;
    },
    rank() {
      const rankConf = this.rankGroups[this.rankKey] || {};
      rankConf.list = rankConf.list || [];
      return rankConf;
    }
  },
  mounted() {
    this.onScroll();
    // window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    // window.removeEventListener("scroll", this.onScroll);
    // clearInterval(this.timer);
  },
  methods: {
    openPro() {
      this.pro_flag = !this.pro_flag;
    },
    tabClick(tab) {
      this.mainTab = tab;
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      });
    },
    mainTabClick(tab) {
      this.whichWeek = tab;
      this.$nextTick(() => {
        if (!this.rank.loadCount) {
          this.onScroll();
        }
      });
    },
    onScroll() {
      //inited用于防止当前用户星座以及当前天确认前，触发不必要的数据加载（星座和当前天都有默认值，服务器初始化数据回来时，要定位用户的星座和当前天）
      // if (!this.inited || this.mainTab == 2) {
      //   return;
      // }
      if (!this.rank.loading) {
        const key = this.rankKey;

        const set = (k, v) => {
          this.$store.commit("updateRankGroups", { key, [k]: v });
        };

        set("loading", true);
        axios
          .get(this.rankApi.replace("{from}", this.rank.list.length))
          .then(res => {
            set("loading", false);
            const { response_status, response_data } = res.data;

            if (response_status.error != "") {
              set("loadEnd", true);
              return;
            }
            const arr = response_data.list;
            // console.log(response_data);
            this.is_Load = true;
            response_data.key = this.rankKey;
            this.$store.commit("setDayRankOwnerInfos", response_data);
            //跟随榜单加载的个人底部榜单记录
            if (arr.slice) {
              const loadCount =
                typeof this.rank.loadCount == "undefined"
                  ? 0
                  : this.rank.loadCount;
              set("loadCount", loadCount + 1);
              if (arr.length) {
                set("list", this.rank.list.concat(arr));
                // const noMore =
                //   !isNaN(this.rankSize) && arr.length < parseInt(this.rankSize);
                // //分享模式不支持滚动加载更多
                // if (this.rank.loadOnce || noMore || this.share) {
                //   set("loadEnd", true);
                // } else {
                //   this.$nextTick(this.onScroll);
                // }
              } else {
                set("loadEnd", true);
              }
              this.$nextTick(() => {
                // if (this.rank.loadCount > 0 && this.rank.list.length === 0) {
                //   set("none", true);
                // }
              });
            } else {
              set("loadEnd", true);
            }
          })
          .catch(err => {
            set("loading", false);
            set("loadEnd", true);
          });
      }
      return;
      // if (!this.rank.loading && !this.rank.loadEnd) {
      //   const scrollToBottom =
      //     (document.documentElement.scrollTop || document.body.scrollTop) +
      //       window.innerHeight >=
      //     document.body.scrollHeight - 100;
      //   const notFull = document.body.scrollHeight < window.innerHeigh;
      //   if (scrollToBottom || notFull) {
      //     const key = this.rankKey;

      //     const set = (k, v) => {
      //       this.$store.commit("updateRankGroups", { key, [k]: v });
      //     };

      //     set("loading", true);
      //     axios
      //       .get(this.rankApi.replace("{from}", this.rank.list.length))
      //       .then(res => {
      //         set("loading", false);
      //         const { response_status, response_data } = res.data;

      //         if (response_status.code != 0) {
      //           set("loadEnd", true);
      //           return;
      //         }
      //         const arr = response_data.list;
      //         // console.log(response_data);
      //         response_data.rank.key = this.rankKey;
      //         this.$store.commit("setDayRankOwnerInfos", response_data.rank);
      //         //跟随榜单加载的个人底部榜单记录
      //         if (arr.slice) {
      //           const loadCount =
      //             typeof this.rank.loadCount == "undefined"
      //               ? 0
      //               : this.rank.loadCount;
      //           set("loadCount", loadCount + 1);
      //           if (arr.length) {
      //             set("list", this.rank.list.concat(arr));
      //             const noMore =
      //               !isNaN(this.rankSize) &&
      //               arr.length < parseInt(this.rankSize);
      //             //分享模式不支持滚动加载更多
      //             if (this.rank.loadOnce || noMore || this.share) {
      //               set("loadEnd", true);
      //             } else {
      //               this.$nextTick(this.onScroll);
      //             }
      //           } else {
      //             set("loadEnd", true);
      //           }
      //           this.$nextTick(() => {
      //             if (this.rank.loadCount > 0 && this.rank.list.length === 0) {
      //               set("none", true);
      //             }
      //           });
      //         } else {
      //           set("loadEnd", true);
      //         }
      //       })
      //       .catch(err => {
      //         set("loading", false);
      //         set("loadEnd", true);
      //       });
      //   }
      // }
    },

    getAvatar(url) {
      return url ? url : require("../img/default.png");
    }
  },
  components: {
    topItem,
    OwnerItem,
    HeaderNav
  }
};
</script>

<style lang="scss">
.rankGroups {
  color: #fff;
  width: 7.5rem;
  height: 9.4rem;
  background: #332d88;
  position: relative;
  border-radius: 0.12rem 0.12rem 0 0;
  .rank_rule {
    position: absolute;
    top: 0.34rem;
    right: 0.2rem;
    > span,
    > img {
      display: inline-block;
      vertical-align: middle;
    }
    > span {
      font-size: 0.28rem;
      color: rgba(255, 255, 255, 0.6);
      line-height: 0.4rem;
    }
    > img {
      width: 0.42rem;
      height: 0.42rem;
    }
    .pro {
      z-index: 3;
      width: 6.2rem;
      height: 8.11rem;
      background: rgba(0, 0, 0, 0.9);
      position: absolute;
      right: 0;
      top: .7rem;
      border-radius: 0.24rem;
      &.pro::after {
        content: " ";
        position: absolute;
        width: 0;
        height: 0;
        top: -0.2rem;
        right: .8rem;
        border-right: 0.2rem solid transparent;
        border-left: 0.2rem solid transparent;
        border-bottom: 0.2rem solid rgba(0, 0, 0, 0.9);
      }
      >p{
        font-size: .28rem;
        line-height: .56rem;
        color: #FFFFFF;
        padding: .3rem;
      }
      .prize_box{
        padding-left: .3rem;
        >p{
          font-size: .28rem;
          line-height: .4rem;
          padding-bottom: .1rem;
        }
        .prize{
          .prize_list{
            width: 1.4rem;
            display: inline-block;
            vertical-align: text-top;
            text-align: center;
            position: relative;
            img{
              width: 1.4rem;
              height: 1.4rem;
            }
            p{
              color: rgba(255, 255, 255, .6);
              font-size: .24rem;
              line-height: .34rem;
            }
          }
          .prize_list:nth-of-type(1){
            margin-right: .2rem;
            ::before{
              content: "";
              width: .53rem;
              height: .22rem;
              position: absolute;
              left: 0rem;
              top: 0rem;
              background: url('../img/no1.png');
              background-size: 100% 100%;
            }
          }
          .prize_list:nth-of-type(2){
            margin-right: .6rem;
          }
          .prize_list:nth-of-type(3){
            ::before{
              content: "";
              width: 1rem;
              height: .22rem;
              position: absolute;
              left: 0rem;
              top: 0rem;
              background: url('../img/no23.png');
              background-size: 100% 100%;
            }
          }
        }
      }
      .prize_box:nth-of-type(1){
        margin-bottom: .3rem;
      }
    }
  }
  .mainTabs {
    width: 4.99rem;
    height: 0.88rem;
    line-height: 0.98rem;
    margin: auto;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.12rem;
    a {
      display: inline-block;
      width: 2.19rem;
      font-size: 0.32rem;
      color: rgba(255, 255, 255, 0.6);
      &.current {
        color: #fff;
        font-weight: bold;
      }
    }
  }

  .mainTabs2 {
    width: 4.99rem;
    height: 0.65rem;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 0.33rem;
    margin: auto;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    margin-bottom: 0.11rem;
    a {
      display: inline-block;
      width: 2.19rem;
      height: 0.65rem;
      line-height: 0.65rem;
      font-size: 0.32rem;
      color: rgba(255, 255, 255, 0.6);
      &.current {
        width: 2.19rem;
        background: linear-gradient(270deg, #78dff3 0%, #8170fa 100%);
        border-radius: 0.33rem;
      }
    }
  }

  .owner {
    width: 7.5rem;
    height: 1.4rem;
    background: #6253c7;
    opacity: 1;
    position: absolute;
    bottom: 0;
  }

  .rankList {
    height: 5.2rem;
    overflow: auto;
    margin: 0 auto;
  }

  .scrollLoading,
  .scrollNone {
    text-align: center;
    padding: 0.3rem 0;
    font-size: 0.24rem;
  }
  .waiting {
    text-align: center;
    padding: 0.5rem 0;
    font-size: 0.24rem;
  }
}
</style>
