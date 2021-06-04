<template>
  <div class="select__dialog">
    <div class="select__screen__container" @click="handleCloseDialog"></div>
    <img class="dialog_crown" src="../img/dialog_crown.png" />
    <div class="select__container">
      <img
        src="../img/close.png"
        @click="handleCloseDialog"
        class="close__img"
      />
      <div class="dialog_header">{{ lang.select_cp_object }}</div>
      <div class="dialog_main">
        <!-- <InnerScrollLoadList class="scroll" :url="url" :parse="parse">
          <template slot-scope="{ list, loading, none }"> -->
            <ul>
              <li
                class="item__box"
                :class="{ item__box_select: item.uid == selectUid }"
                v-for="(item, index) in list"
                :key="index"
              >
                <img
                  @click="goProfile(item.uid)"
                  class="avatar"
                  v-lazy="item.avatar"
                />
                <div class="info_right" @click="selectCp(item.uid)">
                  <div class="nick">
                    {{ lang.user_nick.replace("%s", item.nick) }}
                  </div>
                  <div class="score">
                    {{ lang.intimacy_value.replace("%s", item.intimacy) }}
                  </div>
                </div>
              </li>
            </ul>
            <div
              v-if="list.length == 0"
              class="scrollNone"
              v-html="getBrHtml(lang.friend_empty)"
            ></div>
            <!-- <div
              v-if="loading"
              class="scrollNone"
              v-html="getBrHtml(lang.loading)"
            ></div> -->
          <!-- </template>
        </InnerScrollLoadList> -->
      </div>
      <div
        @click="handleSure()"
        class="dialog_footer"
        :class="{ btn_select: selectUid }"
      >
        {{ lang.sure_cp_object }}
      </div>
    </div>
  </div>
</template>

<script>
import InnerScrollLoadList from "./common/InnerScrollLoadList";
import { toast } from "../utils/index";
import callApp from "../utils/callApp";
import { invite, friends } from "../apis/index";
import api from "../apis/api";

export default {
  name: "SelectCpDialog",

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },

  components: {
    InnerScrollLoadList,
  },

  data() {
    return {
      url: api.friends,
      list: [],
      selectUid: "",
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
    parse(data) {
      const { response_status, response_data } = data;
      if (response_status && response_status.error === "") {
        return response_data.list;
      } else {
        const { error } = response_status;
        if (error) {
          toast(error);
        }
      }
      return [];
    },

    async fetchData () {
      let res = await friends();
      let { response_status, response_data } = res.data;
      if (response_status.code === 0) {
        this.list = response_data.list
      } else {
        toast(response_status.error);
      }
    },

    async handleSure() {
      if (!this.selectUid) return;
      let res = await invite({ to_uid: this.selectUid });
      let { response_status, response_data } = res.data;
      if (response_status.code === 0) {
        toast(this.lang.invite_req_success);
        this.handleCloseDialog()
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

    selectCp(uid) {
      this.selectUid = uid;
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
.select__dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  .select__screen__container {
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
  .select__container {
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
    .scroll {
      width: 6.38rem;
      height: 7rem;
      overflow: auto;
      .scrollNone {
        font-size: 0.28rem;
        font-weight: 500;
        color: #ffffff;
        text-align: center;
        padding-top: 0.1rem;
        padding-bottom: 0.1rem;
      }
    }
    .dialog_main {
      width: 6.38rem;
      height: 7.3rem;
      background-size: 6.38rem;
      position: relative;
      // padding-bottom: 0.5rem;
      padding-top: 0.3rem;
      box-sizing: border-box;
      overflow: auto;
      .scrollNone {
        font-size: 0.28rem;
        font-weight: 500;
        color: #ffffff;
        text-align: center;
        padding-top: 0.1rem;
        padding-bottom: 0.1rem;
      }
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
    .dialog_footer {
      width: 2.48rem;
      height: 0.7rem;
      background: url("../img/select_cp_btn.png") 0/100% 100% no-repeat;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 0.5rem;
      font-size: 0.28rem;
      font-weight: 500;
      color: #ffffff;
      line-height: 0.7rem;
      text-align: center;
    }
    .btn_select {
      background: url("../img/cp_selected_btn.png") 0/100% 100% no-repeat;
    }
  }
}
</style>