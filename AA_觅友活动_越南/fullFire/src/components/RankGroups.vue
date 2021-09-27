<template>
  <div class="rankGroups">
    <div class="rank_group__img"></div>
    <div class="list__box">
      <ul>
        <template v-for="(item, index) in rank.list">
          <li :class="index < 3 ? 'rank_top3' : 'rank_rest'" :key="index">
            <div class="item__main">
              <div class="rank">{{item.rank}}</div>
              <div class="cover">
                <img :src="item.pic_url" />
              </div>
              <div class="info">
                <div class="room__title">
                  <div class="title">{{item.name}}</div><!--v-if="item.status == 1"-->
                  <img v-if="item.status == 1" src="../assets/images/active.png" />
                </div>
                <template v-if="index < 3">
                  <div class="topic">
                    <div class="title" v-html="lang.topic"></div>
                    <div class="des">{{item.topicName}}</div>
                  </div>
                  <div class="topic">
                    <div class="title" v-html="lang.room_owner"></div>
                    <div class="des">{{item.owner}}</div>
                  </div>
                </template>
                <template v-else>
                  <div class="topic">
                    <div class="des">#{{item.topicName}}</div>
                  </div>
                  <div class="topic">
                    <div class="des">{{item.owner}}</div>
                  </div>
                </template>
                <div class="coin">
                  <div class="title">{{lang.coin_charm}}</div>
                  <div class="num">{{item.score}}</div>
                </div>
              </div>
            </div>
            <div class="item_bottom">
              <div class="contribute">
                <span class="title">{{lang.contribute_top3}}</span>
                <img v-for="(person, pIndex) in item.contribution" :key="pIndex" @click="goHomepage(person.uid)" v-lazy="person.avatar" />
                <span class="arrow" @click="showConDialog(item.rid)">>></span>
              </div>
              <div class="join" @click="handleJoin(item.rid)"></div>
            </div>
          </li>
        </template>
      </ul>
      <div v-if="rank.loading" class="scrollLoading">{{lang.loading}}</div>
      <div v-if="rank.none" class="scrollNone">{{lang.coming_soon}}</div>
    </div>
    

    <ContributeDialog
      v-if="showContributeDialog"
      :visible.sync="showContributeDialog"
      :rid="rid"
    />
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import { getUrlString, replaceUrl } from "../utils";
import API from "../request/api";
import lang from "../config/lang";
import ContributeDialog from "./ContributeDialog";
import callApp from '../utils/callApp'

export default {
  name: "RankGroups",

  data() {
    return {
      list: [1, 2, 3, 5, 1, 2, 32],
      showContributeDialog: false,
      rid: 0,
      refreshing:false
    };
  },
  components: {
    ContributeDialog,
  },
  computed: {
    lang: () => lang,
    ...mapState(["rankGroups", "initData", "share"]),
    rankKey() {
      return "fullfire";
    },
    rankApi() {
      return replaceUrl(API.roomRank);
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
    //this.onScroll(); // 如果默认展示的Tabs依赖服务器配置，把此方法移到watch中去调用（watch更新Tabs值后调onScroll）
    // 如果初始化接口返回当前榜单数据，可以在Store的Action拿到服务器数据时先调用commit('updateRankGroups', {key:key, list:[]})，再更新state.tab触发组件watch
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    // setList() {
    //   this.$store.commit("updateRankGroups", {
    //     key: this.rankKey,
    //     loadCount: 0,
    //     loadEnd: true,
    //     loading: false,
    //     none: true,
    //     list: [],
    //     rank: {},
    //   });
    // },
    handleJoin (rid) {
      this.$store.dispatch('attendParty', rid)
      callApp.room(rid)
    },
    goHomepage (uid) {
      if(uid) {
        callApp.userInfo(uid)
      }
    },
    showConDialog (rid) {
      this.rid = rid
      this.showContributeDialog = true
    },
    onScroll() {
      if (!this.rank.loading && !this.rank.loadEnd) {
        const scrollToBottom =
          (document.documentElement.scrollTop || document.body.scrollTop) +
            window.innerHeight >=
          document.body.scrollHeight - 100;
        const notFull = document.body.scrollHeight < window.innerHeigh;
        if (scrollToBottom || notFull) {
          const key = this.rankKey;

          const set = (k, v) => {
            // if (k == 'none') {
            //   console.log(k,'=>', v)
            // }
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
                set("rank", response_data.rank);
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
  position: relative;
  margin-top: -38px;
  height: auto;
  .rank_group__img {
    position: absolute;
    left: 4px;
    width: 742px;
    height: 1051px;
    background: url("../assets/images/rank_group_bg.png");
    background-size: 100% 100%;
    z-index: 10;
  }
  .list__box {
    width: 702px;
    min-height: 1051px;
    // background: red;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    z-index: 20;
    padding-top: 53px;
    li:nth-child(1) .item__main .rank {
      font-size: 0;
      background: url('../assets/images/rank1.png');
      background-size: 100% 100%;
    }
    li:nth-child(2) .item__main .rank {
      font-size: 0;
      background: url('../assets/images/rank2.png');
      background-size: 100% 100%;
    }
    li:nth-child(3) .item__main .rank {
      font-size: 0;
      background: url('../assets/images/rank3.png');
      background-size: 100% 100%;
    }
    .rank_top3 {
      width: 702px;
      height: 328px;
      background: url("../assets/images/rank_top3_bg.png");
      background-size: 100% 100%;
      margin-top: 14px;
      .item__main {
        height: 150px;
        display: flex;
        align-items: center;
        padding-top: 73px;
        .rank {
          width: 69px;
          height: 57px;
          text-align: center;
          line-height: 57px;
          font-size: 26px;
          font-weight: bold;
          font-style: italic;
          color: #fbed8d;
          margin-left: 22px;
          margin-right: 15px;
        }
        .cover {
          width: 150px;
          height: 150px;
          background: url("../assets/images/cover_box.png");
          background-size: 100% 100%;
          text-align: center;
          img {
            width: 144px;
            height: 144px;
            margin-top: 3px;
            border-radius: 8px;
          }
        }
        .info {
          height: 150px;
          margin-left: 20px;
        }
        .room__title {
          display: flex;
          align-items: center;
          padding-bottom: 8px;
          .title {
            max-width: 200px;
            height: 31px;
            font-size: 28px;
            font-weight: bold;
            color: #ffffff;
            line-height: 31px;
            text-shadow: 0px 3px 0px rgba(229, 107, 220, 0.69);
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          img {
            width: 131px;
            height: 28px;
            margin-left: 13px;
          }
        }
        .topic {
          display: flex;
          align-items: center;
          line-height: 23px;
          height: 23px;
          margin-top: 12px;
          .title {
            line-height: 17px;
            height: 17px;
            font-size: 18px;
            font-weight: 400;
            color: #f8d975;
            margin-right: 10px;
          }
          .des {
            line-height: 25px;
            height: 25px;
            font-size: 24px;
            font-weight: 400;
            color: #ffffff;
            width: 200px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .coin {
          display: flex;
          align-items: center;
          margin-top: 18px;
          .title {
            line-height: 17px;
            height: 17px;
            font-size: 18px;
            font-weight: 400;
            color: #f8d975;
            margin-right: 10px;
          }
          .num {
            line-height: 22px;
            height: 22px;
            font-size: 28px;
            font-weight: bold;
            font-style: italic;
            color: #26f9fc;
          }
        }
      }
      .item_bottom {
        display: flex;
        height: 42px;
        line-height: 42px;
        justify-content: space-between;
        padding-left: 34px;
        padding-right: 36px;
        margin-top: 28px;
        .contribute {
          display: flex;
          align-items: center;
          font-size: 24px;
          font-weight: 300;
          color: #f8d975;
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 6px;
            border: 1px solid #f2b83f;
          }
          .title {
            margin-right: 15px;
          }
          .arrow {
            margin-left: 6px;
          }
        }
        .join {
          width: 202px;
          height: 53px;
          background: url("../assets/images/list_join_btn.png");
          background-size: 100% 100%;
          line-height: 53px;
          font-size: 28px;
          font-weight: bold;
          font-style: italic;
          color: #ffffff;
          -webkit-text-stroke: 2px #cb6f3d;
          text-stroke: 2px #cb6f3d;
          text-align: center;
        }
      }
    }
    .rank_rest {
      width: 702px;
      height: 296px;
      background: url("../assets/images/rank_rest_bg.png");
      background-size: 100% 100%;
      // margin-bottom: 14px;
      .item__main {
        height: 144px;
        display: flex;
        align-items: center;
        padding-top: 52px;
        .rank {
          width: 69px;
          height: 57px;
          text-align: center;
          line-height: 57px;
          font-size: 26px;
          font-weight: bold;
          font-style: italic;
          color: #fbed8d;
          margin-left: 22px;
          margin-right: 15px;
        }
        .cover {
          width: 144px;
          height: 144px;
          background: #3f0648;
          border: 2px solid #f3d578;
          border-radius: 8px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .info {
          height: 144px;
          margin-left: 20px;
        }
        .room__title {
          display: flex;
          align-items: center;
          padding-bottom: 8px;
          .title {
            max-width: 200px;
            height: 31px;
            font-size: 26px;
            font-weight: bold;
            font-style: italic;
            color: #fbed8d;
            line-height: 31px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            padding-right: 5px;
          }
          img {
            width: 131px;
            height: 28px;
            margin-left: 13px;
          }
        }
        .topic {
          display: flex;
          align-items: center;
          line-height: 23px;
          height: 23px;
          margin-top: 12px;
          // .title {
          //   line-height: 17px;
          //   height: 17px;
          //   font-size: 18px;
          //   font-weight: 400;
          //   color: #f8d975;
          //   margin-right: 10px;
          // }
          .des {
            height: 22px;
            line-height: 22px;
            font-size: 22px;
            font-weight: 400;
            color: #ffffff;
            width: 200px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .coin {
          display: flex;
          align-items: center;
          margin-top: 18px;
          .title {
            line-height: 17px;
            height: 17px;
            font-size: 18px;
            font-weight: 300;
            color: #f8d975;
            margin-right: 10px;
          }
          .num {
            line-height: 22px;
            height: 22px;
            font-size: 28px;
            font-weight: bold;
            font-style: italic;
            color: #26f9fc;
          }
        }
      }
      .item_bottom {
        display: flex;
        // height: 42px;
        // line-height: 42px;
        justify-content: space-between;
        align-items: flex-end;
        padding-left: 45px;
        padding-right: 36px;
        margin-top: 18px;
        .contribute {
          display: flex;
          align-items: center;
          font-size: 24px;
          font-weight: 300;
          color: #f8d975;
          height: 50px;
          line-height: 50px;
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 6px;
            border: 1px solid #f2b83f;
          }
          .title {
            margin-right: 15px;
          }
          .arrow {
            margin-left: 6px;
          }
        }
        .join {
          width: 202px;
          height: 53px;
          background: url("../assets/images/list_join_btn.png");
          background-size: 100% 100%;
          line-height: 53px;
          font-size: 28px;
          font-weight: bold;
          font-style: italic;
          color: #ffffff;
          -webkit-text-stroke: 2px #cb6f3d;
          text-stroke: 2px #cb6f3d;
          text-align: center;
        }
      }
    }
  }
}

.scrollLoading,
.scrollNone {
  text-align: center;
  color: #ffffff;
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 26px;
}
.scrollNone {
  padding-top: 80px;
}

.refresh {
  width: 94px;
  height: 94px;
  position: fixed;
  right: 13px;
  bottom: 260px;
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
