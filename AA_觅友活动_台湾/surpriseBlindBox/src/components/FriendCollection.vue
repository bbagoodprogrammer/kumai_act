<template>
  <div class="friend_collection">
    <div class="box">
      <i class="arr left" @click="arrClick(0)"></i>
      <i class="arr right" @click="arrClick(1)"></i>
      <ul class="series__main_friend">
        <li v-for="item in initData.series" :key="item.key" class="series__box_friend" :class="{ current_series: currentSeries == item.key }" @click="selectSeries(item.key)">
          {{ item.name }}
        </li>
      </ul>

      <div class="frame_right">
        <span class="title" v-html="getTitle"></span>
        <span class="num">{{ lang.friend_coll_des.replace("%s", count) }}</span>
      </div>

      <ul class="collection__main">
        <li v-for="(item, index) in collects" :key="index" :class="{ no_coll: item.count == 0 }">
          <img class="label" v-if="item.level == 'rare'" :src="images.rare" />
          <img class="label" v-if="item.level == 'hide'" :src="images.hidden" />
          <img class="label" v-if="item.level == 'dyn'" :src="images.dyn" />
          <img v-if="isHidn(item)" class="coll__img" src="../img/hidn_icon.png" alt="" />
          <img v-else class="coll__img" :src="item.image" alt="" />
          <span v-if="!isHidn(item)" class="name">{{ item.name }}</span>
          <span v-else class="name">{{lang.hidn_gift}}</span>
        </li>
      </ul>

      <div class="btn__box">
        <img class="btn1" :src="images.go_my_coll" @click="goMyColl" />
        <img class="btn1" :src="images.next_friend_coll" @click="showFriendCollDialog = true" />
      </div>
    </div>

    <FriendCollDialog :visible.sync="showFriendCollDialog" v-if="showFriendCollDialog" />
  </div>
</template>

<script>
import FriendCollDialog from "./FriendCollDialog";
import { seeCollect } from "../apis";
import { toast } from "../utils";
import { mapState, mapGetters } from "vuex";

export default {
  name: "FriendCollection",

  data () {
    return {
      collects: [],
      currentUid: "",
      currentNick: "",
      count: 0,
      showFriendCollDialog: false,
      currentSeries: "",
    };
  },

  computed: {
    ...mapState(["initData", "friendInfo", "friendList"]),
    getTitle () {
      return this.lang.friend_coll_title.replace(
        "%s",
        `<span class="nick">${this.currentNick}</span>`
      );
    },
  },

  watch: {
    showFriendCollDialog (val) {
      if (!val) {
        this.$nextTick(() => {
          this.currentUid = this.friendInfo.uid;
          this.currentNick = this.friendInfo.nick;
          this.currentSeries = this.initData.currentSeries;
          this.fetchData();
        });
      }
    },
    "initData.currentSeries": {
      handler (val) {
        this.currentSeries = val;
      },
      immediate: true,
      deep: true,
    },
  },

  components: {
    FriendCollDialog,
  },

  created () {
    this.currentUid = this.friendInfo.uid;
    this.currentNick = this.friendInfo.nick;
    this.fetchData();
  },

  methods: {
    async fetchData () {
      let res = await seeCollect({
        fuid: this.currentUid,
        series: this.currentSeries,
      });
      let { response_status, response_data } = res.data;
      if (response_status.code === 0) {
        this.collects = response_data.collects;
        this.count = 0;
        this.collects.forEach((item) => {
          if (item.count > 0) {
            this.count += 1;
          }
          if (this.currentSeries == 'sakura') {
            if (item.level == 'hide') {
              item.level = 'dyn'
            }
          }
        });
      } else {
        toast(response_status.error);
      }
    },

    selectSeries (key) {
      this.currentSeries = key;
      this.fetchData();
    },

    isHidn (item) {
      return (item.level == 'hide' || item.level == 'dyn') && item.count == 0
    },

    goMyColl () {
      this.$store.commit("changeActionTab", 1);
    },

    getBrHtml (text) {
      if (!text) {
        return;
      }
      return text.replace(/\n/g, "<br>");
    },
    arrClick (type) {
      let el = document.getElementsByClassName('series__main_friend')[0]
      let scrollLeft = el.scrollLeft
      let itemWidth = document.getElementsByClassName('series__box_friend')[0].clientWidth
      if (type) {
        el.scrollLeft += itemWidth
      } else {
        el.scrollLeft -= itemWidth
      }
    }
  },
};
</script>

<style lang="scss">
.friend_collection {
  width: 7.29rem;
  height: 14.18rem;
  background: url('../img/friend_coll.png') 0/100% 100% no-repeat;
  margin: -2.09rem auto 0 auto;
  .box {
    width: 7.29rem;
    height: 14.18rem;
    position: relative;
    .arr {
      display: block;
      width: 0.28rem;
      height: 0.4rem;
      background: url(../img/left.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.95rem;
      left: 0.17rem;
      &.right {
        background: url(../img/right.png);
        background-size: 100% 100%;
        left: 6.9rem;
      }
    }
    .series__main_friend {
      //   display: flex;
      //   align-items: center;
      //   justify-content: center;
      padding-top: 0.9rem;
      margin-bottom: 0.15rem;
      width: 6.1rem;
      overflow-x: scroll;
      white-space: nowrap;
      margin: 0 auto;
      .series__box_friend {
        width: 1.98rem;
        height: 0.52rem;
        background: url('../img/series_box_gray.png') 0/100% 100% no-repeat;
        line-height: 0.52rem;
        text-align: center;
        font-size: 0.24rem;
        font-weight: 400;
        color: #ffffff;
        margin-left: 0.02rem;
        margin-right: 0.02rem;
        display: inline-block;
      }
      .current_series {
        background: url('../img/series_box.png') 0/100% 100% no-repeat;
      }
    }
    .series__main_friend::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
    .frame_right {
      width: 6.38rem;
      height: 1.45rem;
      background: url('../img/friend_coll_des_box.png') 0/100% 100% no-repeat;
      position: relative;
      top: 0.2rem;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      font-size: 0.3rem;
      font-weight: 600;
      color: #ffffff;
      box-sizing: border-box;
      padding-top: 0.4rem;
      .title {
        display: flex;
        align-items: center;
        justify-content: center;
        .nick {
          max-width: 2.5rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .num {
        display: block;
        margin-top: 0.05rem;
        font-size: 0.2rem;
        font-weight: 400;
        color: #ffeb70;
        line-height: 0.31rem;
      }
    }

    .collection__main {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      // margin-top: 0.7rem;
      .no_coll {
        opacity: 0.41;
      }
      li:nth-child(1) {
        margin-left: 1.41rem;
      }
      li:nth-child(2) {
        margin-right: 1.41rem;
        background: url('../img/rare_gift_box.png') 0/100% 100% no-repeat;
      }
      li {
        width: 2.03rem;
        height: 2.86rem;
        background: url('../img/gift_box.png') 0/100% 100% no-repeat;
        margin-left: 0.13rem;
        margin-right: 0.13rem;
        margin-top: 0.31rem;
        position: relative;
        text-align: center;
        .label {
          width: 0.86rem;
          height: 0.4rem;
          position: absolute;
          right: 0;
          top: 0.08rem;
        }
        .name {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 0.85rem;
          position: absolute;
          bottom: 0.1rem;
          font-size: 0.26rem;
          font-weight: 400;
          color: #ffffff;
          line-height: 0.34rem;
        }
        .coll__img {
          width: 1.58rem;
          height: 1.58rem;
          margin-top: 0.23rem;
        }
      }
    }

    .btn__box {
      display: flex;
      justify-content: center;
      margin-top: 0.4rem;
      .btn {
        width: 3.51rem;
        height: 0.85rem;
        margin: 0 0.18rem;
      }
      .btn1 {
        width: 3.18rem;
        height: 0.85rem;
        margin: 0 0.18rem;
      }
    }
  }
}
</style>