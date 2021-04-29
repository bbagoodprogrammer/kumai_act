<template>
  <div class="rankGroups">
    <div class="tabs">
      <img
        @click="handleTab(1)"
        :class="{ current_tab: actionTab == 1 }"
        :src="images.collection"
      />
      <img
        @click="handleTab(2)"
        :class="{ current_tab: actionTab == 2 }"
        :src="images.collection_rank"
      />
    </div>
    <div class="tab__box">
      <div class="tab" :class="{ current_tab: tab == 1 }" @click="handleListTab(1)">{{lang.this_issue_list}}</div>
      <div class="tab" :class="{ current_tab: tab == 2 }" @click="handleListTab(2)">{{lang.total_issue_list}}</div>
    </div>
    <RankList :list="rank.list" :userRank="rank.userRank" />
    <div v-if="rank.loading" class="scrollLoading">{{ lang.loading }}</div>
    <div v-if="rank.none" class="scrollNone">{{ lang.coming_soon }}</div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import { getUrlString, toast } from "../utils";
import API from "../apis/api";
import callApp from "../utils/callApp";
import RankList from "./RankList";

export default {
  name: "RankGroups",

  data() {
    return {
      refreshing: false,
      tab: 1
    };
  },
  components: {
    RankList,
  },

  computed: {
    ...mapState(["rankGroups", "initData", "share", "actionTab", "firstLoad"]),
    rankKey() {
      return String(this.tab);
    },
    rankApi() {
      let api = this.tab == 1 ? API.rank : API.totalRank;
      const token = getUrlString("token") || "";
      const uid = getUrlString("uid") || "";
      return api.replace("{uid}", uid).replace("{token}", token);
    },
    rankSize() {
      // 如果明确服务器每次返回的列表长度，请返回具体的数值，有助于减少一次额外请求即可确定加载完所有数据
      return 20;
    },
    rank() {
      const rankConf = this.rankGroups[this.rankKey] || {};
      rankConf.list = rankConf.list || [];
      rankConf.userRank = rankConf.rank || { giftCollection: {} };
      return rankConf;
    },
  },
  mounted() {
    this.onScroll(); // 如果默认展示的Tabs依赖服务器配置，把此方法移到watch中去调用（watch更新Tabs值后调onScroll）
    // 如果初始化接口返回当前榜单数据，可以在Store的Action拿到服务器数据时先调用commit('updateRankGroups', {key:key, list:[]})，再更新state.tab触发组件watch
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    handleTab(tab) {
      this.$store.commit("changeActionTab", tab);
    },

    handleListTab(tab) {
      this.tab = tab
      if (this.rank.list.length == 0) {
        !this.firstLoad && this.$store.commit("changeFirstLoad", true); 
      }
      this.$nextTick(this.onScroll);
    },

    handleRank(rank) {
      return rank > 100 ? "100+" : rank;
    },

    goHomepage(uid) {
      if (uid) {
        callApp.userInfo(uid);
      }
    },

    setList() {
      this.$store.commit("updateRankGroups", {
        key: this.rankKey,
        loadCount: 0,
        loadEnd: true,
        loading: false,
        none: true,
        list: [],
        rank: {},
      });
    },
    onScroll() {
      console.log("onScroll");
      if (!this.rank.loading && !this.rank.loadEnd) {
        const scrollToBottom =
          (document.documentElement.scrollTop || document.body.scrollTop) +
            window.innerHeight >=
          document.body.scrollHeight - 100;
        const notFull = document.body.scrollHeight < window.innerHeigh;
        if (scrollToBottom || notFull || this.firstLoad) {
          const key = this.rankKey;
          const set = (k, v) => {
            this.$store.commit("updateRankGroups", { key, [k]: v });
          };
          this.$store.commit("changeFirstLoad", false);
          set("loading", true);
          axios
            .get(this.rankApi.replace("{from}", this.rank.list.length))
            .then((res) => {
              set("loading", false);

              this.refreshing = false;

              const { response_status, response_data } = res.data;

              if (response_status.code != 0) {
                set("loadEnd", true);
                return;
              }

              const arr = response_data.list;

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

                  this.$nextTick(() => {
                    if (this.rank.list.length > 200) {
                      set("loadEnd", true);
                    }
                  });

                  if (this.rank.loadOnce || noMore) {
                    set("loadEnd", true);
                  } else {
                    this.$nextTick(this.onScroll);
                  }
                } else {
                  set("loadEnd", true);
                }
                set("rank", response_data.userRanking);
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
    onRefresh() {
      if (this.refreshing) {
        return;
      }
      this.refreshing = true;
      // setTimeout(() => {
      //   this.refreshing = false;
      // }, 1000);
      this.$store.commit("updateRankGroups", {
        key: this.rankKey,
        loadCount: 0,
        loadEnd: false,
        loading: false,
        none: false,
        list: [],
        rank: {},
      });
      this.$nextTick(this.onScroll);
    },
  },
};
</script>

<style lang="scss">
.rankGroups {
  width: 7.29rem;
  min-height: 13.11rem;
  background: url("../img/rank_list_bg.png") center top/7.29rem no-repeat;
  margin: -2rem auto 0 auto;
  padding-bottom: 1.8rem;
  .tabs {
    padding-top: 0.79rem;
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 50;
    img {
      width: 3.5rem;
      height: 0.88rem;
      margin: 0 0.06rem 0 0.06rem;
      opacity: 0.4;
    }
    .current_tab {
      opacity: 1;
    }
  }

  .tab__box {
    width: 4.08rem;
    height: 0.55rem;
    background: url("../img/tab_box.png") 0/100% 100% no-repeat;
    display: flex;
    margin: 0.12rem auto 0.2rem auto;
    .tab {
      width: 50%;
      height: 100%;
      font-size: 0.26rem;
font-weight: bold;
color: #70A3F5;
line-height: 0.55rem;
text-align: center;
    }
    .current_tab {
      background: url("../img/current_tab.png") 0/100% 100% no-repeat;
      color: #fff;
    }
  }

  .scrollLoading,
  .scrollNone {
    text-align: center;
    color: #ffffff;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    font-size: 0.26rem;
  }
  .scrollNone {
    padding-bottom: 0.6rem;
  }

  .refresh {
    width: 0.94rem;
    height: 0.94rem;
    position: fixed;
    right: 0.2rem;
    bottom: 2rem;
    z-index: 300;
  }
  .rotate {
    //animation: rotate 1s ease;
    animation: rotate 0.8s linear infinite;
  }
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(1080deg);
    }
  }
}
</style>
