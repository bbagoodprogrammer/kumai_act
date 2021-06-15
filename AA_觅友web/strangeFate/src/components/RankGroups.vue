<template>
  <div class="rankGroups">
    <header-nav :title="lang.rank_title" />
    <div class="rank_rule" @click="openPro()">
      <span>{{lang.span_title}}</span>
      <img src="../img/question.png" alt="" />
      <div class="pro" v-if="pro_flag">
        <p>
          {{lang.rank_tips}}
        </p>
        <div class="prize_box">
          <p>{{lang.prize_box1}}</p>
          <div class="prize">
            <div class="prize_list">
              <img :src="images.week_reward1" alt="" />
              <p>{{lang.prize_list1}}</p>
            </div>
            <div class="prize_list">
              <img :src="images.week_reward2" alt="" />
              <p>{{lang.prize_list2}}</p>
            </div>
            <div class="prize_list">
              <img :src="images.week_reward3" alt="" />
              <p>{{lang.prize_list3}}</p>
            </div>
          </div>
        </div>
        <div class="prize_box">
          <p>{{lang.prize_box2}}</p>
          <div class="prize">
            <div class="prize_list">
              <img :src="images.week_reward4" alt="" />
              <p>{{lang.prize_list4}}</p>
            </div>
            <div class="prize_list">
              <img :src="images.week_reward5" alt="" />
              <p>{{lang.prize_list5}}</p>
            </div>
            <div class="prize_list">
              <img :src="images.week_reward5" alt="" />
              <p>{{lang.prize_list6}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mainTabs">
      <a
        href=""
        @click.prevent="mainTabClick(0)"
        :class="{ current: whichWeek == 0 }"
        >{{lang.whichWeek0}}</a
      >
      <a
        href=""
        @click.prevent="mainTabClick(1)"
        :class="{ current: whichWeek == 1 }"
        >{{lang.whichWeek1}}</a
      >
    </div>
    <div class="mainTabs2">
      <a href="" :class="{ current: mainTab == 0 }" @click.prevent="tabClick(0)"
        >{{lang.whichMainTab0}}</a
      >
      <a href="" :class="{ current: mainTab == 1 }" @click.prevent="tabClick(1)"
        >{{lang.whichMainTab1}}</a
      >
    </div>

    <!-- 榜单 -->
    <template>
      <div
        class="rankList fateRank"
        v-if="mainTab == 0 && rank.list.length > 0"
      >
        <fate-item
          v-for="(item, index) in rank.list"
          :info="item"
          :key="index"
          :from="mainTab"
        />
      </div>
      <div
        class="rankList charmRank"
        v-if="mainTab == 1 && rank.list.length > 0"
      >
        <charm-item
          v-for="(item, index) in rank.list"
          :info="item"
          :key="index"
          :from="mainTab"
        />
      </div>
    </template>

    <!-- {{owner}} -->
    <div class="owner" v-if="owner">
      <template v-if="mainTab == 0">
        <owner-fate-item 
          :info="owner[rankKey]"
          :from="mainTab"
        />
      </template>
      <template v-if="mainTab == 1">
        <owner-charm-item
          :info="owner[rankKey]"
          :from="mainTab"
        />
      </template>
    </div>

    <!-- 日榜和总榜共用Loading -->
    <div v-if="rank.loading" class="scrollLoading">{{lang.loading}}</div>
    <div v-if="rank.none" class="scrollNone">{{lang.no_data}}</div>

    <loading :show="loading" />
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import HeaderNav from "./headerNav";
import { getUrlString } from "../utils";
import FateItem from "./FateItem";
import OwnerFateItem from "./OwnerFateItem";
import CharmItem from "./CharmItem";
import OwnerCharmItem from "./OwnerCharmItem";
import Loading from "./common/Loading";

const uid = getUrlString("uid");
const token = getUrlString("token");
const rid = getUrlString("rid");
const lang = getUrlString("lang");
export default {
  data() {
    return {
      mainTab: 0,
      whichWeek: 0,
      is_Load: false,
      pro_flag: false,
      owner: {},
    };
  },
  computed: {
    ...mapState([
      "rankGroups",
      "inited",
      "is_load",
      "myrank",
      "user_info",
      "dayRankOwnerInfos",
      "loading",
    ]),
    rankKey() {
      return 0 == this.whichWeek
        ? 0 == this.mainTab
          ? "0"
          : "1"
        : 0 == this.mainTab
        ? "2"
        : "3";
    },
    rankApi() {
      let api = {
        0: "/index.php?action=Action/StrangeFate.getStrangeFateList&whichWeek=0&uid={uid}&token={token}&lang={lang}&rid={rid}",
        1: "/index.php?action=Action/StrangeFate.getContributeList&whichWeek=0&uid={uid}&token={token}&lang={lang}&rid={rid}",
        2: "/index.php?action=Action/StrangeFate.getStrangeFateList&whichWeek=1&uid={uid}&token={token}&lang={lang}&rid={rid}",
        3: "/index.php?action=Action/StrangeFate.getContributeList&whichWeek=1&uid={uid}&token={token}&lang={lang}&rid={rid}",
      }[this.rankKey];

      // e = k("uid") || "",
      // r = k("token") || "",
      // n = k("lang") || "",
      // i = k("rid") || "";
      return api
        .replace("{uid}", uid)
        .replace("{token}", token)
        .replace("{lang}", lang)
        .replace("{rid}", rid);
    },
    rankApi111() {
      let curApi, lastApi;
      curApi =
        "/index.php?action=weekStar.getCurGiftRanking&gid={gid}&from={from}&uid={uid}&token={token}";
      lastApi =
        "/index.php?action=weekStar.getLastGiftRanking&gid={gid}&from={from}&uid={uid}&token={token}";

      const api = this.rankKey == "cur" + this.gid ? curApi : lastApi;

      const token = getUrlString("token") || "";
      return api
        .replace("{gid}", this.mainTab == 0 ? this.gid : this.gid1)
        .replace("{token}", token)
        .replace("{uid}", uid);
    },
    rankSize() {
      return 20;
    },
    rank() {
      const rankConf = this.rankGroups[this.rankKey] || {};
      rankConf.list = rankConf.list || [];
      return rankConf;
    },
    refreshButtonShow() {
      //只能刷新当天日榜和总榜
      // return this.activity_status == 1 && !this.share && (this.currentDay == this.dates.days || this.mainTab == 1);
    },
  },
  mounted() {
    this.onScroll();
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
    clearInterval(this.timer);
  },
  methods: {
    tabClick(t) {
      var e = this;
      (this.mainTab = t),
        this.$nextTick(() => {
          e.rank.loadCount || e.onScroll();
        });
    },
    mainTabClick(t) {
      var e = this;
      (this.whichWeek = t),
        this.$nextTick(() => {
          e.rank.loadCount || e.onScroll();
        });
    },
    onScroll() {
      //inited用于防止当前用户星座以及当前天确认前，触发不必要的数据加载（星座和当前天都有默认值，服务器初始化数据回来时，要定位用户的星座和当前天）
      // if (!this.inited) {
      // return;
      // }
      if (!this.rank.loading && !this.rank.loadEnd) {
        const scrollToBottom =
          (document.documentElement.scrollTop || document.body.scrollTop) +
            window.innerHeight >=
          document.body.scrollHeight - 100;
        const notFull = document.body.scrollHeight < window.innerHeigh;
        if (scrollToBottom || notFull) {
          const key = this.rankKey;

          const set = (k, v) => {
            this.$store.commit("updateRankGroups", { key, [k]: v });
          };

          set("loading", true);
          axios
            .get(this.rankApi.replace("{from}", this.rank.list.length))
            .then((res) => {
              set("loading", false);
              const { response_status, response_data } = res.data;
              if (response_status.error != "") {
                set("loadEnd", true);
                return;
              }

              const arr = response_data.list;
              this.owner[this.rankKey] = response_data;
              console.log(this.owner);
              //跟随榜单加载的个人底部榜单记录
              if (arr.slice) {
                const loadCount =
                  typeof this.rank.loadCount == "undefined"
                    ? 0
                    : this.rank.loadCount;
                set("loadCount", loadCount + 1);
                if (arr.length) {
                  set("list", this.rank.list.concat(arr));
                  const noMore =
                    !isNaN(this.rankSize) &&
                    arr.length < parseInt(this.rankSize);
                  //分享模式不支持滚动加载更多
                  if (this.rank.loadOnce || noMore || this.share) {
                    set("loadEnd", true);
                  } else {
                    this.$nextTick(this.onScroll);
                  }
                } else {
                  set("loadEnd", true);
                }
                this.$nextTick(() => {
                  if (this.rank.loadCount > 0 && this.rank.list.length === 0) {
                    set("none", true);
                  }
                });
              } else {
                set("loadEnd", true);
              }
            })
            .catch((err) => {
              set("loading", false);
              set("loadEnd", true);
            });
        }
      }
    },


    openPro() {
      this.pro_flag = !this.pro_flag;
    },

    getAvatar(url) {
      return url ? url : require("../img/avatar.png");
    },
    record() {
      this.record_url = "/kroom_hoster/allList.php?from={from}&token={token}";
      this.record_flag = true;
    },
    close_record() {
      this.record_flag = false;
    },
    proDataRecord(data) {
      if (!data.response_status.code) {
        return data.response_data.list || [];
      } else {
        return [];
      }
    },
    async onRefresh() {
      this.$store.dispatch("init");
      this.$store.dispatch("getMine");
    },
  },
  components: {
    FateItem,
    OwnerFateItem,
    OwnerCharmItem,
    CharmItem,
    Loading,
    HeaderNav,
  },
};
</script>

<style lang="scss">
.rankGroups {
  color: #fff;
  width: 7.5rem;
  height: 9.39rem;
  background: #332d88;
  position: relative;
  border-radius: 0.3rem 0.3rem 0 0;
  .rankList {
    height: 5.2rem;
    overflow: auto;
    margin: 0 auto;
  }
  .rank_rule {
    position: absolute;
    top: 0.34rem;
    right: 0.2rem;
    font-size: 0;
    & > span {
      font-size: 0.28rem;
      color: hsla(0, 0%, 100%, 0.6);
      line-height: 0.4rem;
    }
    & > img {
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
      top: 0.6rem;
      border-radius: 0.24rem;
      padding-bottom: 0.39rem;
      box-sizing: border-box;
      overflow: auto;
      &.pro {
        &:after {
          content: " ";
          position: absolute;
          width: 0;
          height: 0;
          top: -0.2rem;
          right: 0.8rem;
          border-right: 0.2rem solid transparent;
          border-left: 0.2rem solid transparent;
          border-bottom: 0.2rem solid rgba(0, 0, 0, 0.9);
        }
      }
      & > p {
        font-size: 0.28rem;
        line-height: 0.56rem;
        color: #fff;
        padding: 0.24rem 0.3rem 0.23rem;
      }
      .prize_box {
        padding-left: 0.3rem;
        & > p {
          font-size: 0.28rem;
          line-height: 0.4rem;
          padding-bottom: 0.1rem;
        }
        .prize {
          .prize_list {
            width: 1.4rem;
            display: inline-block;
            vertical-align: text-top;
            text-align: center;
            position: relative;
            img {
              width: 1.4rem;
              height: 1.4rem;
              margin-bottom: 0.1rem;
            }
            p {
              color: hsla(0, 0%, 100%, 0.6);
              font-size: 0.24rem;
              line-height: 0.34rem;
            }
            &:first-of-type {
              margin-right: 0.2rem;
              ::before {
                content: "";
                width: 0.53rem;
                height: 0.22rem;
                position: absolute;
                left: 0;
                top: 0;
                background: url("../img/no1.png");
                background-size: 100% 100%;
              }
            }
            &:nth-of-type(2) {
              margin-right: 0.44rem;
            }
            &:nth-of-type(3) {
              :before {
                content: "";
                width: 1rem;
                height: 0.22rem;
                position: absolute;
                left: 0;
                top: 0;
                background: url("../img/no2.png");
                background-size: 100% 100%;
              }
            }
          }
        }
        &:first-of-type {
          margin-bottom: 0.3rem;
        }
      }
    }
  }
  .mainTabs {
    width: 4.99rem;
    height: 0.88rem;
    line-height: 0.98rem;
    margin: auto;
    text-align: center;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin-bottom: 0.12rem;
    margin-top: 0.05rem;
    a {
      display: inline-block;
      width: 2.19rem;
      font-size: 0.32rem;
      color: hsla(0, 0%, 100%, 0.6);
      position: relative;
      &.current {
        color: #fff;
        font-weight: 700;
        &:before {
          content: "";
          width: 0.28rem;
          height: 0.08rem;
          background: #fff;
          border-radius: 0.04rem;
          top: 0.73rem;
          left: 50%;
          margin-left: -0.14rem;
          position: absolute;
        }
      }
    }
  }
  .mainTabs2 {
    width: 4.99rem;
    height: 0.65rem;
    background-color: hsla(0, 0%, 100%, 0.1);
    border-radius: 0.33rem;
    margin: auto;
    text-align: center;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: justify;
    justify-content: space-between;
    box-sizing: border-box;
    margin-bottom: 0.11rem;
    a {
      display: inline-block;
      width: 2.19rem;
      height: 0.65rem;
      line-height: 0.65rem;
      font-size: 0.32rem;
      color: hsla(0, 0%, 100%, 0.6);
      &.current {
        width: 2.19rem;
        background: linear-gradient(270deg, #78dff3, #8170fa);
        border-radius: 0.33rem;
        color: #fff;
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
  .scrollLoading {
    text-align: center;
    padding: 0.3rem 0;
    font-size: 0.24rem;
  }
  .scrollNone {
    width: 5rem;
    height: 5rem;
    background: url("../img/no_data.png") no-repeat;
    background-size: 100% 100%;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 0.3rem 0;
  }
  .waiting {
    text-align: center;
    padding: 0.5rem 0;
    font-size: 0.24rem;
  }
}
.rankGroups .rank_rule > img,
.rankGroups .rank_rule > span {
  display: inline-block;
  vertical-align: middle;
}

.scrollLoading,
.scrollNone {
  font-size: 0.24rem;
  color: #fff;
  padding: 0 0 0.4rem 0;
  text-align: center;
}

.loading_inner {
  text-align: center;
  padding: 0.2rem 0;
}
.none_inner {
  text-align: center;
  padding: 0.5rem 0;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
