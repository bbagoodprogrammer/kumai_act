<template>
  <div class="home__container" :class="{home_padding: actionTab == 0 || actionTab == 1}">
    <Header ref="header" />

    <FriendCollection v-if="actionTab == 0" />
    <Collection v-if="actionTab == 1" />
    <RankGroups v-if="actionTab == 2" />

    <!-- 有好友赠送盲盒弹框 -->
    <div class="friend_give__dialog" v-if="showGiveDialog">
      <div class="screen" @click="showGiveDialog = false"></div>
      <div class="main">
        <span class="title">{{ lang.friend_give_box }}</span>
        <img class="send__icon" src="../img/send_box_icon.png" alt="" />
        <div class="btn__box">
          <img class="confirm__btn" :src="images.open_box" @click="goOpenBox" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import Collection from "../components/Collection";
import FriendCollection from "../components/FriendCollection";
import RankGroups from "../components/RankGroups";
import { loadImages } from "../utils";
import { mapState, mapGetters } from "vuex";

export default {
  name: "Home",

  components: {
    Header,
    Collection,
    FriendCollection,
    RankGroups,
  },

  data () {
    return {
      showGiveDialog: false,
      tab: 0,
    };
  },

  computed: {
    ...mapState(["initData", "actionTab"]),
    ...mapGetters([]),
  },

  watch: {
    "initData.notOpenBlindBox": {
      handler (val) {
        if (val > 0) {
          this.showGiveDialog = true;
        }
      },
    },
  },

  created () {
    this.$store.dispatch("initData");
  },

  mounted () {
    loadImages();
    //require("../img/synth_dialog_bg.png"),
  },

  methods: {
    goOpenBox () {
      this.showGiveDialog = false
      this.$refs.header.goNotOpenDialog()
      //this.$refs.header.showRecordDialog = true
    }
  },
};
</script>

<style lang="scss">
.home_padding {
  padding-bottom: 0.3rem;
}
.home__container {
  background: RGBA(48, 23, 141, 1);
  width: 100%;
  position: relative;
  .main__box {
    width: 7.29rem;
    height: 15.56rem;
    background: url('../img/main_bg.png') 0/100% 100% no-repeat;
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
  }

  .friend_give__dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    .screen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: black;
      opacity: 0.5;
      z-index: 1000;
    }
    .main {
      width: 6.35rem;
      height: 5.62rem;
      background: url('../img/comfirm_dialog.png') 0/100% 100% no-repeat;
      position: fixed;
      top: 0;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 1000;
      opacity: 1;
      .title {
        display: block;
        text-align: center;
        font-size: 0.28rem;
        font-weight: 400;
        color: #ffffff;
        line-height: 0.31rem;
        margin: 0.66rem auto 0.44rem auto;
      }
      .send__icon {
        display: block;
        width: 2.34rem;
        height: 2.34rem;
        margin: 0.44rem auto 0.2rem auto;
      }
      .btn__box {
        display: flex;
        justify-content: center;
        margin-top: 0.5rem;
        .confirm__btn {
          width: 2.14rem;
          height: 0.77rem;
          margin: 0 0.1rem;
        }
      }
    }
  }
}
</style>
