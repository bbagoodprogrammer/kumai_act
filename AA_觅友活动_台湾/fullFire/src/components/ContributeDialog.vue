<template>
  <div class="list__dialog">
    <div
      @touchmove.prevent
      class="list__screen__container"
      @click="handleCloseDialog"
    ></div>
    <div class="list__container">
      <img src="../assets/images/close.png" @click="handleCloseDialog" class="close__img" />
      <div class="rid">{{ lang.rid.replace("%s", rid) }}</div>
      <div class="title__box">
        <div class="rank">{{ lang.rank }}</div>
        <div class="user">{{ lang.user }}</div>
        <div class="coin">{{ lang.total_contribute_coin }}</div>
      </div>
      <div class="list__main">
        <div class="cont__list" v-for="(item, index) in list" :key="index">
          <div class="rank">{{ item.rank }}</div>
          <div class="info_middle">
            <img @click="goHomepage(item.uid)" v-lazy="item.avatar" />
            <div class="nick">{{item.nick}}</div>
          </div>
          <div class="coin">{{item.score}}</div>
        </div>
      </div>
      <div class="list_des" v-html="getBrHtml(lang.list_des)"></div>
      <div class="list_join" @click="handleJoin(rid)"></div>
    </div>
  </div>
</template>

<script>
import lang from "@/config/lang";
import { contributionRank } from '../request/index'
import { toast } from '../utils';
import callApp from '../utils/callApp'
export default {
  name: "Dialog",

  props: {
    visible: {
      type: Boolean,
      required: true
    },
    rid: {
      required: true
    }
  },

  computed: {
    lang: () => lang,
  },

  data() {
    return {
      list: [],
    };
  },

  created() {
    this.fetchData()
    document.body.style.overflow = 'hidden'
  },

  beforeDestroy() {
    document.body.style.overflow = ''
  },

  methods: {
    handleJoin (rid) {
      this.$store.dispatch('attendParty', rid)
      callApp.room(rid)
    },
    goHomepage (uid) {
      callApp.userInfo(uid)
    },
    async fetchData () {
      let res = await contributionRank({from: 0, rid: this.rid});
      let { response_status, response_data } = res.data;
      if (response_status.code === 0) {
        this.list = response_data.list
      } else {
        toast(response_status.error)
      }
    },

    getBrHtml(text) {
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
    width: 713px;
    height: 923px;
    background: url("../assets/images/contribute_list_bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    // padding: 137px 30px 0 30px;
    padding-top: 137px;
    box-sizing: border-box;
    .close__img {
      width: 58px;
      height: 58px;
      position: absolute;
      top: -73px;
      right: 9px;
      z-index: 1000;
    }
    .rid {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 83px;
      height: 16px;
      line-height: 16px;
      font-size: 20px;
      font-weight: 400;
      color: #ffffff;
    }
    .title__box {
      display: flex;
      height: 25px;
      font-size: 26px;
      font-weight: bold;
      color: #fbed8d;
      line-height: 25px;
      margin-left: 9px;
      margin-right: 9px;
      // box-sizing: border-box;
      margin-bottom: 39px;
      .rank {
        width: 168px;
        text-align: center;
      }
      .user {
        flex: 1;
        text-align: center;
      }
      .coin {
        width: 246px;
        text-align: center;
      }
    }

    .list__main {
      // background: red;
      height: 498px;
      overflow: auto;
    }

    .cont__list {
      display: flex;
      align-items: center;
      margin-left: 9px;
      margin-right: 9px;
      font-size: 26px;
      font-weight: bold;
      color: #ffffff;
      height: 52px;
      line-height: 52px;
      margin-bottom: 31px;
      .rank {
        width: 168px;
        text-align: center;
      }
      .info_middle {
        flex: 1;
        display: flex;
        align-items: center;
        img {
          width: 52px;
          height: 52px;
          background: #12124c;
          border: 2px solid #4843cc;
          border-radius: 26px;
          box-sizing: border-box;
          margin-left: 19px;
        }
        .nick {
          width: 160px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin-left: 21px;
        }
      }
      .coin {
        width: 246px;
        text-align: center;
      }
    }

    .list_des {
      width: 627px;
      height: 75px;
      font-size: 22px;
      font-weight: 400;
      color: #fbed8d;
      padding-left: 30px;
      padding-top: 18px;
    }
    .list_join {
      width: 270px;
      height: 71px;
      background: url("../assets/images/join_btn.png");
      background-size: 100% 100%;
      line-height: 71px;
      font-size: 36px;
      font-weight: bold;
      font-style: italic;
      color: #ffffff;
      -webkit-text-stroke: 2px #cb6f3d;
      text-stroke: 2px #cb6f3d;
      text-align: center;
      margin: 23px auto 0 auto;
    }
  }
}
</style>