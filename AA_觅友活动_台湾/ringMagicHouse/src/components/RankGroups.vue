<template>
  <div class="rankGroups">
    <div class="list_des">{{ lang.list_des }}</div>
    <ul class="list__box">
      <li v-for="(item, index) in rank.list" :key="index">
        <div class="rank">{{ item.rank }}</div>
        <div class="info">
          <img v-lazy="item.avatar" @click="goHomepage(item.uid)" />
          <div class="nick">{{ item.nick }}</div>
        </div>
        <div class="score">
          <img src="../img/mini_fire.png" />
          <div class="num">{{ item.score }}</div>
        </div>
        <div class="info">
          <img v-lazy="item.cp_avatar" @click="goHomepage(item.cp_uid)" />
          <div class="nick">{{ item.cp_nick }}</div>
        </div>
      </li>
    </ul>
    <div v-if="rank.loading" class="scrollLoading">{{ lang.loading }}</div>
    <div v-if="rank.none" class="scrollNone">{{ lang.coming_soon }}</div>

    <div class="info__bottom">
      <div
        v-if="!rank.userRank.cp_uid"
        class="btn"
        @click="showSelectCp = true"
      >
        {{ lang.select_cp }}
      </div>
      <div v-else class="info">
        <div class="rank">{{handleRank(rank.userRank.ranking)}}</div>
        <img class="avatar" v-lazy="rank.userRank.avatar" />
        <img class="avatar_cp" v-lazy="rank.userRank.cp_avatar" />
        <div class="nick__box">
          <div class="nick">{{rank.userRank.nick}}</div>
          <div class="nick">{{rank.userRank.cp_nick}}</div>
        </div>
        <div class="score__box">
          <img src="../img/mini_fire.png" />
          <div class="score">{{rank.userRank.score}}</div>
        </div>
      </div>
    </div>

    <SelectCpDialog :visible.sync="showSelectCp" v-if="showSelectCp" />

    <!-- <img
      v-if="initData.step == 1"
      @click="onRefresh"
      class="refresh"
      :class="{ rotate: refreshing }"
      src="../img/refresh.png"
    /> -->
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import { getUrlString, replaceUrl } from "../utils";
import API from "../apis/api";
import callApp from "../utils/callApp";
import SelectCpDialog from "./SelectCpDialog";

export default {
  name: "RankGroups",

  data() {
    return {
      list: [],
      refreshing: false,
      showSelectCp: false,
    };
  },
  components: {
    SelectCpDialog,
  },
  computed: {
    ...mapState(["rankGroups", "initData", "share", "firstLoad"]),
    rankKey() {
      return "ringMagicHouse";
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
    handleRank (rank) {
      return rank>100 ? '100+' : rank
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

          this.$store.commit("changeFirstLoad", false)

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
      // setTimeout(() => {
      //   this.refreshing = false;
      // }, 1000);
      this.$store.commit("changeFirstLoad", true)
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
  padding-bottom: 1.26rem;
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
      background: url("../img/list_item_1.png") 0/100% 100% no-repeat;
      .rank {
        font-size: 0;
        background: url("../img/rank1.png") center/0.75rem 0.65rem no-repeat;
        opacity: 1;
      }
    }
    li:nth-child(2) {
      background: url("../img/list_item_2.png") 0/100% 100% no-repeat;
      .rank {
        font-size: 0;
        background: url("../img/rank2.png") center/0.75rem 0.65rem no-repeat;
        opacity: 1;
      }
    }
    li:nth-child(3) {
      background: url("../img/list_item_2.png") 0/100% 100% no-repeat;
      .rank {
        font-size: 0;
        background: url("../img/rank3.png") center/0.75rem 0.65rem no-repeat;
        opacity: 1;
      }
    }
    li {
      width: 6.64rem;
      height: 1.41rem;
      background: url("../img/list_item_rest.png") 0/100% 100% no-repeat;
      margin: 0 auto 0.09rem auto;
      display: flex;
      .rank {
        width: 1.2rem;
        height: 1.41rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.4rem;
        font-weight: bold;
        color: #ffffff;
        opacity: 0.6;
        margin-right: 0.2rem;
      }
      .info {
        width: 1.3rem;
        text-align: center;
        img {
          display: block;
          width: 1rem;
          height: 1rem;
          border: 0.02rem solid #fffebc;
          border-radius: 50%;
          box-sizing: border-box;
          margin-left: 0.15rem;
          margin-top: 0.03rem;
        }
        .nick {
          width: 100%;
          height: 0.36rem;
          line-height: 0.36rem;
          font-size: 0.22rem;
          font-weight: 300;
          color: #ffffff;
          text-align: center;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .score {
        width: 2rem;
        text-align: center;
        img {
          width: 0.42rem;
          height: 0.49rem;
          margin-top: 0.2rem;
        }
        .num {
          height: 0.26rem;
          font-size: 0.36rem;
          font-weight: bold;
          color: #8afffb;
          // padding-top: 0.09rem;
        }
      }
    }
  }

  .info__bottom {
    width: 7.5rem;
    height: 1.26rem;
    background: url("../img/info_bottom_bg.png") 0/100% 100% no-repeat;
    position: fixed;
    bottom: 0;
    // left: 0;
    left: 50%;
    transform: translateX(-50%);
    .btn {
      width: 3.15rem;
      height: 0.94rem;
      background: url("../img/fixed_btn.png") 0/100% 100% no-repeat;
      text-align: center;
      font-size: 0.36rem;
      font-weight: bold;
      color: #ffffff;
      line-height: 0.94rem;
      margin: 0.15rem auto 0 auto;
    }
    .info {
      width: 6.64rem;
      height: 1.26rem;
      margin: 0 auto;
      display: flex;
      .rank {
        width: 1.2rem;
        height: 1.41rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.4rem;
        font-weight: bold;
        color: #ffffff;
        opacity: 0.6;
        margin-right: 0.2rem;
      }
      .avatar {
        display: block;
        width: 1rem;
        height: 1rem;
        border: 0.02rem solid #fffebc;
        border-radius: 50%;
        box-sizing: border-box;
        margin-left: 0.15rem;
        margin-top: 0.1rem;
      }
      .avatar_cp {
        display: block;
        width: 0.8rem;
        height: 0.8rem;
        border: 0.02rem solid #fffebc;
        border-radius: 50%;
        box-sizing: border-box;
        margin-left: -0.2rem;
        margin-top: 0.3rem;
      }
      .nick__box {
        margin-left: 0.1rem;
        margin-top: 0.46rem;
        font-size: 0.22rem;
        font-weight: 300;
        color: #ffffff;
        .nick {
          width: 1.2rem;
          height: 0.3rem;
          line-height: 0.3rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .score__box {
        width: 1.37rem;
        text-align: center;
        margin-left: 0.3rem;
        img {
          width: 0.42rem;
          height: 0.49rem;
          margin-top: 0.17rem;
          // margin-bottom: 0.09rem;
        }
        .score {
          font-size: 0.36rem;
          font-weight: bold;
          color: #8afffb;
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
