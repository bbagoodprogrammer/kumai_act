<template>
  <div class="list__dialog">
    <div
      @touchmove.prevent
      class="list__screen__container"
      @click="handleCloseDialog"
    ></div>
    <div class="list__container">
      <img src="../img/close.png" @click="handleCloseDialog" class="close__img" />
      <div class="title" v-html="getTitleHtml"></div>
      <div class="title__box">
        <div class="rank">{{ lang.rank }}</div>
        <div class="user">{{ lang.user }}</div>
        <div class="coin">{{ lang.attr_value }}</div>
      </div>
      <div class="list__main">
        <div class="cont__list" v-for="(item, index) in list" :key="index">
          <div class="rank">{{ item.rank }}</div>
          <div class="info_middle">
            <img @click="goHomepage(item.uid)" v-lazy="item.avatar" />
            <div class="nick">{{ item.nick }}</div>
          </div>
          <div class="coin">{{ item.score }}</div>
        </div>
      </div>
      <div class="list_des" v-html="getBrHtml(lang.list_des)"></div>
      <div class="list_join" @click="goHomepage(uid)">
        {{ lang.see_user_info }}
      </div>
    </div>
  </div>
</template>

<script>
import { fansRank } from "../apis";
import { toast } from "../utils";
import callApp from "../utils/callApp";
export default {
  name: "Dialog",

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    uid: {
      required: true,
    },
    nick: {
      required: true,
    },
  },

  computed: {
    getTitleHtml() {
      return this.lang.user_attr_list.replace('%s', `<span class="nick">${this.nick}</span>`);
    },
  },

  data() {
    return {
      list: [],
    };
  },

  created() {
    this.fetchData();
    document.body.style.overflow = "hidden";
  },

  beforeDestroy() {
    document.body.style.overflow = "";
  },

  methods: {
    goHomepage(uid) {
      callApp.userInfo(uid);
    },
    async fetchData() {
      let res = await fansRank({ rankUid: this.uid });
      let { response_status, response_data } = res.data;
      if (response_status.code === 0) {
        this.list = response_data.list;
      } else {
        toast(response_status.error);
      }
    },

    getBrHtml(text) {
      if (!text) {
        return "";
      }
      return text.replace("%s", "<br>");
    },

    handleCloseDialog() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style lang="scss">
.list__dialog {
  width: 100%;
  height: 100%;
  .list__screen__container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.7;
    z-index: 1000;
  }

  .list__container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    opacity: 1;
    width: 7.23rem;
    height: 9.73rem;
    background: url("../img/dialog_bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    box-sizing: border-box;
    .close__img {
      width: 0.69rem;
      height: 0.69rem;
      position: absolute;
      top: -0.2rem;
      right: -0rem;
      z-index: 1000;
    }
    .title {
      text-align: center;
      font-size: 0.4rem;
      font-weight: bold;
      color: #ffffff;
      padding-top: 0.62rem;
      .nick{
        display: inline-block;
        vertical-align: bottom;
        max-width: 2rem;
        overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      }
    }
    .title__box {
      display: flex;
      height: 0.25rem;
      font-size: 0.26rem;
      font-weight: bold;
      color: rgba(199, 81, 204, 1);
      line-height: 0.25rem;
      margin-left: 0.09rem;
      margin-right: 0.09rem;
      // box-sizing: border-box;
      margin-bottom: 0.39rem;
      margin-top: 0.64rem;
      .rank {
        width: 1.68rem;
        text-align: center;
        color: rgba(249, 249, 165, 1);
      }
      .user {
        flex: 1;
        text-align: center;
      }
      .coin {
        width: 2.46rem;
        text-align: center;
      }
    }

    .list__main {
      // background: red;
      height: 4.98rem;
      overflow: auto;
    }

    .cont__list {
      display: flex;
      align-items: center;
      margin-left: 0.09rem;
      margin-right: 0.09rem;
      font-size: 0.26rem;
      font-weight: bold;
      color: #ffffff;
      height: 0.52rem;
      line-height: 0.52rem;
      margin-bottom: 0.31rem;
      .rank {
        width: 1.68rem;
        text-align: center;
      }
      .info_middle {
        flex: 1;
        display: flex;
        align-items: center;
        img {
          width: 0.52rem;
          height: 0.52rem;
          background: #12124c;
          border: 0.02rem solid #4843cc;
          border-radius: 0.26rem;
          box-sizing: border-box;
          margin-left: 0.19rem;
        }
        .nick {
          width: 1.6rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin-left: 0.21rem;
        }
      }
      .coin {
        width: 2.46rem;
        text-align: center;
      }
    }

    .list_des {
      width: 6.26rem;
      height: 0.48rem;
      font-size: 0.22rem;
      font-weight: 400;
      color: #f9f9a5;
      margin: 0rem auto 0.3rem auto;
    }
    .list_join {
      width: 3.48rem;
      height: 1.04rem;
      background: url("../img/see_info_btn.png");
      background-size: 100% 100%;
      line-height: 1.04rem;
      text-align: center;
      font-size: 0.28rem;
      font-weight: 400;
      color: #ffffff;
      margin: 0.23rem auto 0 auto;
    }
  }
}
</style>