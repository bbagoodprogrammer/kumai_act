<template>
  <div class="rankGroups" :style="{background: `url(${images.list_bg}) center top/7.31rem no-repeat`}">
    <div class="list_des">{{ lang.list_des }}</div>
    <ul class="list__box">
      <li v-for="(item, index) in rank.list" :key="index">
        <div class="rank">{{ item.rank }}</div>
        <div class="info">
          <img v-lazy="item.avatar" @click="goHomepage(item.uid)" />
        </div>
        <div class="nick__box">
          <div class="nick">{{ item.nick }}</div>
          <img
            v-for="(img, imgIndex) in item.medals"
            :key="imgIndex"
            :src="img"
          />
        </div>
        <div class="score">
          <div class="title">{{ lang.happy_value }}</div>
          <div class="num">{{ item.score }}</div>
        </div>
      </li>
    </ul>
    <div v-if="rank.loading" class="scrollLoading">{{ lang.loading }}</div>
    <div v-if="rank.none" class="scrollNone">{{ lang.coming_soon }}</div>

    <div class="info__bottom">
      <div class="info__box">
        <div class="rank">{{ handleRank(rank.userRank.ranking) }}</div>
        <div class="info">
          <img
            :src="rank.userRank.avatar"
            @click="goHomepage(rank.userRank.uid)"
          />
        </div>
        <div class="nick__box">
          <div class="nick">{{ rank.userRank.nick }}</div>
          <img
            v-for="(img, imgIndex) in rank.userRank.medals"
            :key="imgIndex"
            :src="img"
          />
        </div>
        <div class="score">
          <div class="title">{{ lang.happy_value }}</div>
          <div class="num">{{ rank.userRank.score }}</div>
        </div>
      </div>
    </div>

    <img
      v-if="initData.step == 1"
      @click="onRefresh"
      class="refresh"
      :class="{ rotate: refreshing }"
      src="../img/refresh.png"
    />
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import { getUrlString, replaceUrl } from "../utils";
import API from "../apis/api";
import callApp from "../utils/callApp";

export default {
  name: "RankGroups",

  data() {
    return {
      list: [],
      refreshing: false,
      showSelectCp: false,
    };
  },
  components: {},
  computed: {
    ...mapState(["rankGroups", "initData", "share", "firstLoad"]),
    rankKey() {
      return "duck";
    },
    rankApi() {
      return replaceUrl(API.rank);
    },
    rankSize() {
      // 如果明确服务器每次返回的列表长度，请返回具体的数值，有助于减少一次额外请求即可确定加载完所有数据
      return 20;
    },
    rank() {
      const rankConf = this.rankGroups[this.rankKey] || {};
      rankConf.list = rankConf.list || [];
      rankConf.userRank = rankConf.userRank || {};
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
    handleRank(rank) {
      return rank > 100 ? "100+" : rank;
    },
    goHomepage(uid) {
      if (uid) {
        callApp.userInfo(uid);
      }
    },
    onScroll() {
      if (!this.rank.loading && !this.rank.loadEnd) {
        const scrollToBottom =
          (document.documentElement.scrollTop || document.body.scrollTop) +
            window.innerHeight >=
          document.body.scrollHeight - 100;
        const notFull = document.body.scrollHeight < window.innerHeigh;

        if (scrollToBottom || notFull || this.firstLoad) {
          const key = this.rankKey;

          const set = (k, v) => {
            // if (k == 'none') {
            //   console.log(k,'=>', v)
            // }
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
                set("userRank", response_data.userRanking);
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
      this.$store.commit("changeFirstLoad", true);
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
  width: 7.31rem;
  min-height: 11.14rem;
  margin: 0 auto;
  box-sizing: border-box;
  padding-top: 1.5rem;
  .list_des {
    text-align: center;
    font-size: 0.2rem;
    font-weight: 300;
    color: #b296ff;
    padding-top: 0.23rem;
    padding-bottom: 0.3rem;
  }
  .list__box {
    li:nth-child(1) {
      @extend .li_top3;
      .rank {
        background: url("../img/rank1.png") center/0.77rem 0.51rem no-repeat;
      }
    }
    li:nth-child(2) {
      @extend .li_top3;
      .rank {
        background: url("../img/rank2.png") center/0.77rem 0.51rem no-repeat;
      }
    }
    li:nth-child(3) {
      @extend .li_top3;
      .rank {
        background: url("../img/rank3.png") center/0.77rem 0.51rem no-repeat;
      }
    }
    .li_top3 {
      background: url("../img/list_top3_bg.png") 0/100% 100% no-repeat;
      .nick__box .nick {
        color: rgba(104, 60, 2, 1);
      }
      .score .num {
        color: rgba(255, 255, 255, 1);
      }
      .score .title {
        color: rgba(104, 60, 2, 1);
      }
    }
    li {
      width: 6.89rem;
      height: 1.55rem;
      background: url("../img/list_rest_bg.png") 0/100% 100% no-repeat;
      margin: 0 auto;
      margin-bottom: 0.05rem;
      display: flex;
      align-items: center;
      .rank {
        width: 1.1rem;
        height: 1.55rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.28rem;
        font-weight: bold;
        font-style: italic;
        color: #ffcc96;
        margin-right: 0.13rem;
      }
      .info {
        img {
          display: block;
          width: 1.12rem;
          height: 1.12rem;
          border-radius: 50%;
          border: 0.03rem solid RGBA(214, 172, 77, 1);
          border-radius: 50%;
          box-sizing: border-box;
        }
      }
      .nick__box {
        padding-left: 0.1rem;
        .nick {
          height: 0.31rem;
          font-size: 0.26rem;
          font-weight: 400;
          color: #ffffff;
          line-height: 0.31rem;
          width: 2rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          padding-top: 0.1rem;
        }
        img {
          display: inline-block;
          height: 0.49rem;
          margin-right: 0.05rem;
          margin-top: 0.1rem;
        }
      }
      .score {
        width: 2rem;
        text-align: center;
        margin-left: 0.3rem;
        .title {
          font-size: 0.22rem;
          font-weight: 400;
          color: #e2c776;
          line-height: 0.31rem;
        }
        .num {
          font-size: 0.34rem;
          font-weight: bold;
          color: #fff254;
          line-height: 0.31rem;
          padding-top: 0.16rem;
        }
      }
    }
  }

  .info__bottom {
    width: 7.5rem;
    height: 1.36rem;
    background: url("../img/info_bottom_bg.png") 0/100% 100% no-repeat;
    position: fixed;
    bottom: 0;
    // left: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 200;
    .btn {
      width: 3.15rem;
      height: 0.94rem;
      // background: url("../img/fixed_btn.png") 0/100% 100% no-repeat;
      text-align: center;
      font-size: 0.36rem;
      font-weight: bold;
      color: #ffffff;
      line-height: 0.94rem;
      margin: 0.15rem auto 0 auto;
    }
    .info__box {
      width: 6.89rem;
      height: 1.36rem;
      margin: 0 auto;
      display: flex;
      align-items: center;
      .rank {
        width: 1.1rem;
        height: 1.36rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.28rem;
        font-weight: bold;
        font-style: italic;
        color: #7a4916;
        margin-right: 0.13rem;
      }
      .info {
        img {
          display: block;
          width: 1.12rem;
          height: 1.12rem;
          border-radius: 50%;
          border: 0.03rem solid RGBA(214, 172, 77, 1);
          border-radius: 50%;
          box-sizing: border-box;
        }
      }
      .nick__box {
        padding-left: 0.1rem;
        .nick {
          height: 0.31rem;
          font-size: 0.26rem;
          font-weight: 400;
          color: #633910;
          line-height: 0.31rem;
          width: 2rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          padding-top: 0.1rem;
        }
        img {
          display: inline-block;
          height: 0.49rem;
          margin-right: 0.05rem;
          margin-top: 0.1rem;
        }
      }
      .score {
        width: 2rem;
        text-align: center;
        margin-left: 0.3rem;
        .title {
          font-size: 0.22rem;
          font-weight: 400;
          color: #7a4916;
          line-height: 0.31rem;
          padding-top: 0.05rem;
        }
        .num {
          font-size: 0.34rem;
          font-weight: bold;
          color: #ffffff;
          line-height: 0.31rem;
          padding-top: 0.06rem;
        }
      }
    }
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
  padding-top: 0.8rem;
}

.refresh {
  width: 0.94rem;
  height: 0.94rem;
  position: fixed;
  right: 0.13rem;
  bottom: 1.6rem;
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
</style>
