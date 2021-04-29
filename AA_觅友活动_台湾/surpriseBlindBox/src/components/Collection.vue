<template>
  <div class="collection">
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

    <div class="box">
      <span class="see_coll" @click="showMyCollectionDialog = true">{{
        lang.total_collection
      }}</span>
      <img class="frame_left" src="../img/frame_left.png" />
      <div class="frame_right">
        <span v-html="getBrHtml(lang.get_frame)"></span>
        <br />
        <span class="num">{{ getCollectionNum }}</span>
      </div>

      <ul class="collection__main">
        <li
          v-for="(item, index) in collects"
          :key="index"
          :class="{ no_coll: item.count == 0 }"
        >
          <img class="label" v-if="item.level == 'rare'" :src="images.rare" />
          <img class="label" v-if="item.level == 'hide'" :src="images.hidden" />
          <img class="label" v-if="item.level == 'dyn'" :src="images.dyn" />
          <img
            v-if="isHidn(item)"
            class="coll__img"
            src="../img/hidn_icon.png"
            alt=""
          />
          <img v-else class="coll__img" :src="item.image" alt="" />
          <span v-if="!isHidn(item)" class="name" >{{ item.name }}</span>
          <span v-else class="name">{{lang.hidn_gift}}</span>
        </li>
      </ul>

      <div class="btn__box">
        <img
          class="btn"
          :src="images.see_friend_coll"
          @click="handleSeeFriendColl"
        />
      </div>
    </div>

    <MyCollectionDialog
      :visible.sync="showMyCollectionDialog"
      v-if="showMyCollectionDialog"
    />

    <FriendCollDialog
      :visible.sync="showFriendCollDialog"
      v-if="showFriendCollDialog"
    />
  </div>
</template>

<script>
import MyCollectionDialog from "./MyCollectionDialog";
import FriendCollDialog from "./FriendCollDialog";
import { mapState, mapGetters } from "vuex";

export default {
  name: "Collection",

  components: {
    MyCollectionDialog,
    FriendCollDialog,
  },

  data() {
    return {
      showMyCollectionDialog: false,
      showFriendCollDialog: false,
    };
  },

  computed: {
    ...mapState(["initData", "actionTab"]),
    ...mapGetters(["collects"]),
    getCollectionNum() {
      let num = 0;
      this.collects.forEach((item) => {
        if (+item.count > 0) {
          num += 1;
        }
      });
      return this.lang.collection_num.replace("%s", num);
    },
  },

  methods: {
    handleTab(tab) {
      this.$store.commit("changeActionTab", tab);
    },

    handleSeeFriendColl() {
      this.showFriendCollDialog = true;
    },

    isHidn(item) {
      return (item.level == 'hide' || item.level == 'dyn') && item.count == 0
    },

    getBrHtml(text) {
      if (!text) {
        return;
      }
      return text.replace(/\n/g, "<br>");
    },
  },
};
</script>

<style lang="scss">
.collection {
  width: 7.29rem;
  height: 15.56rem;
  background: url("../img/main_bg.png") 0/100% 100% no-repeat;
  margin: -2.09rem auto 0 auto;
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
  .box {
    width: 7.29rem;
    height: 12.58rem;
    background: url("../img/my_collection_box.png") 0/100% 100% no-repeat;
    position: relative;
    .see_coll {
      font-size: 0.24rem;
      font-weight: 400;
      text-decoration: underline;
      color: #ffd1e2;
      margin-left: 0.83rem;
      position: relative;
      z-index: 50;
    }
    .frame_left {
      width: 2.29rem;
      height: 2.35rem;
      position: absolute;
      left: 0.45rem;
      top: 0.49rem;
      z-index: 20;
    }
    .frame_right {
      width: 4.68rem;
      height: 1.59rem;
      background: url("../img/frame_right.png") 0/100% 100% no-repeat;
      position: relative;
      top: 0.45rem;
      left: 1.98rem;
      font-size: 0.26rem;
      font-weight: 400;
      color: #ffffff;
      line-height: 0.34rem;
      box-sizing: border-box;
      padding-left: 0.85rem;
      padding-top: 0.29rem;
      .num {
        display: block;
        margin-top: 0.05rem;
        font-size: 0.24rem;
        font-weight: 400;
        color: #fff94a;
        line-height: 0.34rem;
      }
    }

    .collection__main {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 0.92rem;
      .no_coll {
        opacity: 0.41;
      }
      li:nth-child(1) {
        margin-left: 1.41rem;
      }
      li:nth-child(2) {
        margin-right: 1.41rem;
        background: url("../img/rare_gift_box.png") 0/100% 100% no-repeat;
      }
      li {
        width: 2.03rem;
        height: 2.86rem;
        background: url("../img/gift_box.png") 0/100% 100% no-repeat;
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