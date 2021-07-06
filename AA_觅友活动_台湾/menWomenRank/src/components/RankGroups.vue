<template>
  <div class="rankGroups" :class="{rankGroups_padding: showFixed}">
    <div class="tabs">
      <img
        @click="handleTab(0)"
        :src="actionTab == 0 ? images.man_tab_select : images.man_tab"
      />
      <img
        @click="handleTab(1)"
        :src="actionTab == 0 ? images.woman_tab_select : images.woman_tab"
      />
    </div>
    <div class="down_title" v-if="initData.step != 0">{{ lang.act_down_time }}</div>
    <div class="time__box" v-if="initData.step != 0">
      <div class="num">{{ downTime.day }}</div>
      <div class="text">{{ lang.day }}</div>
      <div class="num">{{ downTime.hour }}</div>
      <div class="text">{{ lang.hour }}</div>
      <div class="num">{{ downTime.minute }}</div>
      <div class="text">{{ lang.minute }}</div>
      <div class="num">{{ downTime.second }}</div>
      <div class="text">{{ lang.second }}</div>
    </div>

    <RankList :list="rank.list" :userRank="rank.userRank" :sex="actionTab" />
    <div v-if="rank.loading" class="scrollLoading">{{ lang.loading }}</div>
    <div v-if="rank.none" class="scrollNone">{{ lang.coming_soon }}</div>

    <img class="refresh" v-if="initData.step == 1" :class="{rotate: refreshing}" @click="onRefresh" src="../img/refresh.png" />
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import { getUrlString, toast } from "../utils";
import downTime from "../utils/downTime";
import API from "../apis/api";
import callApp from "../utils/callApp";
import RankList from "./RankList";

export default {
  name: "RankGroups",

  data() {
    return {
      actionTab: 0,
      refreshing: false,
      downTime: {},
    };
  },
  components: {
    RankList,
  },

  computed: {
    ...mapState(["rankGroups", "initData", "share", "firstLoad"]),
    rankKey() {
      return this.actionTab;
    },
    rankApi() {
      let api = API.rank;
      const token = getUrlString("token") || "";
      const uid = getUrlString("uid") || "";
      const sex = this.actionTab == 0 ? "men" : "women";
      return api
        .replace("{uid}", uid)
        .replace("{token}", token)
        .replace("{sex}", sex);
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
    showFixed() {
      if (this.initData.step != 2 && !this.initData.reg) {
        return true;
      }
      if (this.initData.reg && this.initData.userInfo.sex == this.actionTab) {
        return true;
      }
      return false;
    },
  },
  watch: {
    "initData": {
      handler(val) {
        if (val.downTime) {
          this.handleCountTime(val.downTime);
        }
        if (val.userInfo) {
        this.actionTab = this.initData.userInfo.sex  
        }
        
      },
      deep: true,
      immediate: true,
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
      this.actionTab = tab;
      this.$nextTick(() => {
        this.onScroll();
      });
    },

    handleCountTime(diffTime) {
      const timeKey = "manwoman";
      if (downTime(timeKey) == null) {
        downTime(timeKey, diffTime);
      }
      if (downTime(timeKey).end) {
        this.downTime = downTime(timeKey);
      } else {
        clearInterval(this.timer);
        let fn = () => {
          this.downTime = downTime(timeKey);
        };
        fn();
        this.timer = setInterval(fn, 1000);
      }
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
.rankGroups_padding {
  padding-bottom: 1.7rem !important;
}
.rankGroups {
  width: 7.43rem;
  min-height: 9.32rem;
  background: url("../img/rank_list_bg.png") center top/7.43rem no-repeat;
  margin: 0.56rem auto 0 auto;
  padding-bottom: 0.1rem;
  .tabs {
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 50;
    top: -0.3rem;
    img {
      width: 2.9rem;
      height: 0.93rem;
      margin: 0 0.08rem 0 0.08rem;
    }
  }
  .down_title {
    text-align: center;
    font-size: 0.22rem;
    font-weight: 300;
    color: #ffffff;
    margin-top: -0.2rem;
  }

  .time__box {
    display: flex;
    justify-content: center;
    align-items: baseline;
    .num {
      font-size: 0.48rem;
      font-weight: 900;
      color: #ffffff;
    }
    .text {
      margin-left:0.10rem;
      margin-right: 0.10rem;
      font-size: 0.22rem;
      font-weight: normal;
      color: #f9f9a5;
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
