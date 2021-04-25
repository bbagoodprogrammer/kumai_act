<template>
  <div class="rankGroups">
    <div v-if="familyPK.step == 1" class="con_title">{{ lang.pk_down_title }}</div>
    <div v-if="familyPK.step == 2" class="con_title">{{ lang.pk_end_down_title }}</div>
    <div v-if="familyPK.step == 1" class="time__box">
      <div class="num">{{ downTime.day }}</div>
      <div class="text">{{ lang.day }}</div>
      <div class="num">{{ downTime.hour }}</div>
      <div class="text">{{ lang.hour }}</div>
      <div class="num">{{ downTime.minute }}</div>
      <div class="text">{{ lang.minute }}</div>
      <div class="num">{{ downTime.second }}</div>
      <div class="text">{{ lang.second }}</div>
    </div>

    <div class="pk_tabs" :class="{pk_tabs_margin: familyPK.step != 1}">
      <div
        @click="handleTab(1)"
        class="tab"
        :class="{ tab_red: actionTab == 1 }"
      >
        {{ lang.red_team }}
      </div>
      <div
        @click="handleTab(2)"
        class="tab"
        :class="{ tab_blue: actionTab == 2 }"
      >
        {{ lang.blue_team }}
      </div>
    </div>

    <RankList :list="rank.list" :userRank="rank.userRank" :tab="actionTab" />
    <div v-if="rank.loading" class="scrollLoading">{{ lang.loading }}</div>
    <div v-if="rank.none" class="scrollNone">{{ lang.coming_soon }}</div>

    <img
      v-if="initData.step == 1"
      class="refresh"
      :class="{ rotate: refreshing }"
      @click="onRefresh"
      src="../img/refresh.png"
    />

  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapGetters } from "vuex";
import { getUrlString, toast } from "../utils";
import API from "../apis/api";
import callApp from "../utils/callApp";
import RankList from "./RankList";
import downTime from "../utils/downTime";
import { rankData } from "../apis/mock";

export default {
  name: "RankGroups",

  data() {
    return {
      refreshing: false,
      downTime: {},
      actionTab: 1,
    };
  },
  components: {
    RankList,
  },

  computed: {
    ...mapState(["rankGroups", "initData", "share", "firstLoad"]),
    ...mapGetters(["familyPK"]),
    rankKey() {
      return this.actionTab;
    },
    rankApi() {
      let api = API.rank;
      const token = getUrlString("token") || "";
      const uid = getUrlString("uid") || "";
      return api.replace("{uid}", uid).replace("{token}", token).replace("{type}", 'pk') + `&team=${this.actionTab == 1 ? 'red' : 'blue'}`
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

  watch: {
    familyPK: {
      handler(val) {
        if (val.step == 1) {
          this.handleCountTime(val.downTime)
        }
      },
      immediate: true,
      deep: true
    }
  },

  mounted() {
    !this.firstLoad && this.$store.commit("changeFirstLoad", true);
    this.$nextTick(() => {
      this.onScroll(); // 如果默认展示的Tabs依赖服务器配置，把此方法移到watch中去调用（watch更新Tabs值后调onScroll）
      // 如果初始化接口返回当前榜单数据，可以在Store的Action拿到服务器数据时先调用commit('updateRankGroups', {key:key, list:[]})，再更新state.tab触发组件watch
      window.addEventListener("scroll", this.onScroll);
    });
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    handleTab(tab) {
      !this.firstLoad && this.$store.commit("changeFirstLoad", true);
      this.actionTab = tab;
      this.$nextTick(() => {
        this.onScroll()
      })
    },

    handleCountTime(diffTime) {
      const timeKey = "familyPk1";
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
      this.$store.dispatch("initData");
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
  width: 7.39rem;
  min-height: 8.1rem;
  background: url("../img/rank_box_bg.png") center top/7.39rem no-repeat;
  margin: -0.35rem auto 0 auto;
  padding-top: 0.35rem;
  .con_title {
    display: inline-block;
    font-size: 0.24rem;
    color: #e4bd68;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 0.4rem;
  }
  .con_title::before {
    content: "";
    width: 1.94rem;
    height: 0.16rem;
    position: absolute;
    left: -2.06rem;
    background-image: url("../img/title_left.png");
    background-size: 100% 100%;
    top: 50%;
    transform: translateY(-50%);
  }
  .con_title::after {
    content: "";
    width: 1.94rem;
    height: 0.16rem;
    position: absolute;
    right: -2.06rem;
    background-image: url("../img/title_right.png");
    background-size: 100% 100%;
    top: 50%;
    transform: translateY(-50%);
  }

  .time__box {
    display: flex;
    justify-content: center;
    align-items: baseline;
    height: 0.8rem;
    .num {
      font-size: 0.48rem;
      font-weight: 900;
      color: #ffffff;
    }
    .text {
      margin-left: 0.15rem;
      margin-right: 0.15rem;
      font-size: 0.22rem;
      font-weight: normal;
      color: #fafcaf;
    }
  }

  .pk_tabs_margin {
    margin-top: 0.3rem !important;
  }
  .pk_tabs {
    display: flex;
    justify-content: center;
    position: relative;
    margin-top: 0.05rem;
    .tab {
      width: 2.54rem;
      height: 0.75rem;
      background: url("../img/pk_tab_default.png") 0/100% 100% no-repeat;
      font-size: 0.3rem;
      text-align: center;
      font-weight: bold;
      color: #8f90c9;
      line-height: 0.75rem;
    }
    .tab_red {
      background: url("../img/pk_tab_red.png") 0/100% 100% no-repeat;
      color: #ffffff;
    }
    .tab_blue {
      background: url("../img/pk_tab_blue.png") 0/100% 100% no-repeat;
      color: #ffffff;
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
    padding-top: 0.6rem;
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
