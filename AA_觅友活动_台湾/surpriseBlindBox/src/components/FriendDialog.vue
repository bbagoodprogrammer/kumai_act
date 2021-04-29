<template>
  <div class="friend_dialog">
    <div class="dialog_screen" @click="handleCloseDialog"></div>
    <div
      class="dialog_container"
      :style="{
        background: `url(${images.friend_dialog}) 0/100% 100% no-repeat`,
      }"
    >
      <div class="des">{{ lang.friend_des }}</div>
      <InnerScrollLoadList class="list__main" :url="url" :parse="parse">
        <template slot-scope="{ list, loading, none }">
          <ul>
            <li class="list__item" v-for="(item, index) in list" :key="index">
              <img
                class="avatar"
                @click="goHomepage(item.uid)"
                v-lazy="item.avatar"
              />
              <div class="info">
                <div class="nick">
                  {{ item.nick }}
                </div>
              </div>
              <div class="dot__box" @click="handleSelect(item)">
                <img v-if="item.uid == selectUid" src="../img/dot.png" />
              </div>
            </li>
          </ul>

          <div v-if="loading" class="scrollLoading">{{ lang.loading }}</div>
          <div v-if="none" class="scrollNone">{{ lang.not_friend }}</div>
        </template>
      </InnerScrollLoadList>
      <img class="give__img" :src="images.give_ta" @click="handleSure" />
    </div>

    <ComfirmDialog
      :visible.sync="showComfirmDialog"
      v-if="showComfirmDialog"
      :type="type"
      :count="count"
      :nick="userInfo.nick"
      @handlePurchase="handlePurchase"
    />
  </div>
</template>

<script>
import InnerScrollLoadList from "./common/InnerScrollLoadList";
import ComfirmDialog from "./ComfirmDialog";
import callApp from "../utils/callApp";
import api from "../apis/api";
import { giveBlindBox } from "../apis";
import { toast } from "../utils";
export default {
  name: "FriendDialog",

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    count: {
      required: true,
    },
    id: {
      required: true,
    },
  },

  components: {
    InnerScrollLoadList,
    ComfirmDialog,
  },

  data() {
    return {
      url: api.friends.replace("{type}", "give"),
      showComfirmDialog: false,
      selectUid: "",
      userInfo: {},
    };
  },

  created() {
    document.body.style.overflow = "hidden";
  },

  beforeDestroy() {
    document.body.style.overflow = "";
  },

  methods: {
    async handlePurchase() {
      let data = {
        count: this.count,
        id: this.id + 1,
        fuid: this.selectUid
      };
      let res = await giveBlindBox(data);
      let { response_status, response_data } = res.data;
      if (response_status.code === 0) {
        this.$parent.showSuccDialog = true
        this.handleCloseDialog()
      } else {
        toast(response_status.error);
      }
    },

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

    handleSelect(item) {
      this.userInfo = item;
      this.selectUid = item.uid;
    },

    async handleSure() {
      if (!this.selectUid) {
        return;
      }
      this.showComfirmDialog = true;
    },

    goHomepage(uid) {
      if (uid) {
        callApp.userInfo(uid);
      }
    },

    getBrHtml(text) {
      if (!text) {
        return;
      }
      return text.replace(/\n/g, "<br>");
    },

    handleCloseDialog() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style lang="scss">
.friend_dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  .dialog_screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.7;
    z-index: 1000;
  }
  .dialog_container {
    width: 6.35rem;
    height: 9.13rem;
    position: fixed;
    top: 0;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    opacity: 1;
    .des {
      text-align: center;
      font-size: 0.24rem;
      font-weight: 400;
      color: #fff94a;
      line-height: 0.31rem;
      padding-top: 1.18rem;
      padding-bottom: 0.05rem;
    }
    .give__img {
      width: 2.14rem;
      height: 0.77rem;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -0.3rem;
    }
    .list__main {
      width: 100%;
      height: 6.9rem;
      overflow: auto;
      .list__item {
        width: 5.52rem;
        height: 1.34rem;
        background: url("../img/people_item_bg.png") 0/100% 100% no-repeat;
        display: flex;
        align-items: center;
        padding-left: 0.37rem;
        padding-right: 0.57rem;
        box-sizing: border-box;
        margin: 0 auto 0.08rem auto;
        .avatar {
          width: 0.95rem;
          height: 0.95rem;
          border-radius: 50%;
          border: 0.02rem solid RGBA(106, 225, 254, 1);
          flex-shrink: 0;
        }
        .info {
          flex: 1;
          margin-left: 0.2rem;
          .nick {
            height: 0.26rem;
            line-height: 0.26rem;
            font-size: 0.26rem;
            font-weight: bold;
            color: #fff9e8;
            width: 2rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .dot__box {
          width: 0.4rem;
          height: 0.4rem;
          background: url("../img/dot_box.png") 0/100% 100% no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 0.24rem;
            height: 0.24rem;
          }
        }
      }
    }
    .scrollLoading,
    .scrollNone {
      text-align: center;
      color: #fff9e8;
      padding-top: 0.2rem;
      padding-bottom: 0.2rem;
      font-size: 0.26rem;
    }

    .close__dialog {
      position: absolute;
      width: 0.43rem;
      height: 0.42rem;
      top: 2.53rem;
      right: 0.75rem;
    }
  }
}
</style>