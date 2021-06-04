<template>
  <div class="invite__dialog">
    <div class="invite__screen__container" @click="handleCloseDialog"></div>
    <img class="dialog_crown" src="../img/dialog_crown.png" />
    <div class="invite__container">
      <img
        src="../img/close.png"
        @click="handleCloseDialog"
        class="close__img"
      />
      <div class="dialog_header">{{ lang.magic_house_invite }}</div>
      <div class="invite_des" v-html="getBrHtml(lang.invite_welcome)"></div>
      <div class="dialog_main">
        <ul>
          <li
            class="item__box"
            :class="{ item__box_select: item.id == mailId }"
            v-for="(item, index) in list"
            :key="index"
          >
            <img
              @click="goProfile(item.uid)"
              class="avatar"
              v-lazy="item.avatar"
            />
            <div class="info_right" @click="selectCp(item.id)">
              <div class="nick">
                {{ lang.user_nick.replace("%s", item.nick) }}
              </div>
              <div class="score">
                {{ lang.intimacy_value.replace("%s", item.intimacy) }}
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="btn__box">
        <div
          class="btn"
          @click="handleSure()"
          :class="{ btn_select: mailId }"
        >
          {{ lang.sure_cp_object }}
        </div>
        <div class="not_cp" @click="handleCloseDialog">{{ lang.not_cp_object }}</div>
      </div>
      <div
        class="invite_succ_des"
        v-html="getBrHtml(lang.invite_succ_des)"
      ></div>
    </div>
  </div>
</template>

<script>
import { toast } from "../utils/index";
import callApp from "../utils/callApp";
import { accept, acceptableInvita } from "../apis";

export default {
  name: "InviteDialog",

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      list: [],
      mailId: "",
    };
  },

  created() {
    document.body.style.overflow = "hidden";
    this.fetchData()
  },

  beforeDestroy() {
    document.body.style.overflow = "";
  },

  methods: {
    async fetchData() {
      let res = await acceptableInvita();
      let { response_status, response_data } = res.data;
      if (response_status.code === 0) {
        this.list = response_data.list;
      } else {
        toast(response_status.error);
      }
    },

    async handleSure() {
      if (!this.mailId) return;
      let res = await accept({ mail_id: this.mailId});
      let { response_status, response_data } = res.data;
      if (response_status.code === 0) {
        this.handleCloseDialog()
        this.$store.dispatch("initData");
      } else {
        toast(response_status.error);
      }
    },

    getBrHtml(text) {
      if (!text) {
        return;
      }
      return text.replace(/\n/g, "<br>");
    },

    selectCp(id) {
      this.mailId = id;
    },

    goProfile(uid) {
      callApp.userInfo(uid);
    },

    handleCloseDialog() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style lang="scss">
.invite__dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  .invite__screen__container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.7;
    z-index: 1000;
  }

  .dialog_crown {
    position: absolute;
    top: 0.9rem;
    left: 50%;
    transform: translateX(-50%);
    width: 5.55rem;
    height: 2.02rem;
    background: url("../img/dialog_crown.png") 0/100% 100% no-repeat;
    z-index: 1000;
  }
  .invite__container {
    width: 6.38rem;
    height: 9.55rem;
    background: url("../img/dialog_bg.png") 0/100% 100% no-repeat;
    position: fixed;
    top: 2.5rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    opacity: 1;
    .close__img {
      width: 0.64rem;
      height: 0.64rem;
      position: absolute;
      top: 0.1rem;
      right: 0rem;
      z-index: 1100;
    }

    .dialog_header {
      width: 6.38rem;
      height: 0.82rem;
      text-align: center;
      line-height: 0.8rem;
      font-size: 0.36rem;
      font-weight: 500;
      color: #ffefbf;
      position: relative;
      z-index: 1050;
    }
    .invite_des {
      padding: 0.1rem 0.1rem 0.3rem 0.1rem;
      text-align: center;
      font-size: 0.22rem;
      font-weight: 300;
      color: #ffffff;
    }
    .dialog_main {
      width: 6.38rem;
      height: 4.6rem;
      background-size: 6.38rem;
      position: relative;
      // padding-bottom: 0.5rem;
      overflow: auto;
      box-sizing: border-box;
      // background: red;
      .item__box_select {
        background: url("../img/li_item_selected_bg.png") 0/100% 100% no-repeat !important;
      }
      .item__box {
        width: 5.6rem;
        height: 1.23rem;
        background: url("../img/li_item_bg.png") 0/100% 100% no-repeat;
        margin: 0 auto 0.15rem auto;
        display: flex;
        align-items: center;
        .info_right {
          flex: 1;
        }
        .avatar {
          width: 1rem;
          height: 1rem;
          border: 0.02rem solid #fffebc;
          border-radius: 50%;
          margin-left: 0.2rem;
          margin-right: 0.17rem;
        }
        .nick {
          width: 3rem;
          height: 0.3rem;
          line-height: 0.3rem;
          font-size: 0.22rem;
          font-weight: 300;
          color: #ffffff;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .score {
          height: 0.22rem;
          line-height: 0.22rem;
          font-size: 0.22rem;
          font-weight: 300;
          color: #ffefbf;
          margin-top: 0.1rem;
        }
      }
    }
    .btn__box {
      position: relative;
      margin-top: 0.3rem;
      .btn {
        width: 2.48rem;
        height: 0.7rem;
        background: url("../img/select_cp_btn.png") 0/100% 100% no-repeat;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.28rem;
        font-weight: 500;
        color: #ffffff;
        line-height: 0.7rem;
        text-align: center;
      }
      .btn_select {
        background: url("../img/cp_selected_btn.png") 0/100% 100% no-repeat;
      }
      .not_cp {
        position: absolute;
        bottom: 0;
        left: 4.45rem;
        font-size: 0.2rem;
        font-weight: 300;
        text-decoration: underline;
        color: #af74ff;
      }
    }
    .invite_succ_des {
      padding-top: 0.25rem;
      text-align: center;
      font-size: 0.22rem;
      font-weight: 300;
      color: #ff82fe;
    }
  }
}
</style>