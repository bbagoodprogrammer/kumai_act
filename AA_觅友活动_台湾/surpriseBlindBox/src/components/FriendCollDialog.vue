<template>
  <div class="friend_coll_dialog">
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
                <div v-if="item.count > 0" class="text">
                  {{ lang.coll_gift_num.replace("%s", item.count) }}
                </div>
                <div v-else class="text">{{ lang.not_coll }}</div>
              </div>
              <div class="btn" :class="{invited_btn: item.count == 0 && item.invite == 1}" @click="handleClick(item)">
                <span v-if="item.count > 0">{{ lang.see_ta_coll }}</span>
                <template v-else>
                  <span v-if="item.invite == 0">{{ lang.invite }}</span>
                  <span v-if="item.invite == 1 || item.invite == 2">{{ lang.invited }}</span>
                </template>
              </div>
            </li>
          </ul>

          <div v-if="loading" class="scrollLoading">{{ lang.loading }}</div>
          <div v-if="none" class="scrollNone">{{ lang.not_friend }}</div>
        </template>
      </InnerScrollLoadList>

      <img
        class="close__dialog"
        @click="handleCloseDialog"
        src="../img/close.png"
      />
    </div>
  </div>
</template>

<script>
import InnerScrollLoadList from "./common/InnerScrollLoadList";
import callApp from "../utils/callApp";
import api from "../apis/api";
import { invite } from "../apis";
import { toast } from "../utils";
export default {
  name: "FriendCollDialog",

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
      url: api.friends.replace("{type}", "collects"),
    };
  },

  created() {
    this.$store.commit('clearFriendList')
    document.body.style.overflow = "hidden";
  },

  beforeDestroy() {
    document.body.style.overflow = "";
  },

  methods: {

    parse(data) {
      const { response_status, response_data } = data;
      if (response_status && response_status.error === "") {
        //this.$store.commit('setFriendList', response_data.list)
        return response_data.list;
      } else {
        const { error } = response_status;
        if (error) {
          toast(error);
        }
      }
      return [];
    },

    handleClick(item) {
      if (item.count == 0 && item.invite == 0) {
        this.handleInvite(item)
      }
      if (item.count > 0) {
        this.$store.commit('setFriendInfo', item)
        this.$store.commit('changeActionTab', 0)
        this.handleCloseDialog()
      }
    },

    async handleInvite(item) {
      let res = await invite({fuid: item.uid});
      let { response_status, response_data } = res.data;
      if (response_status.code === 0) {
        item.invite = 1
      } else {
        toast(response_status.error);
      }
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
.friend_coll_dialog {
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
      height: 7.2rem;
      overflow: auto;
      .list__item {
        width: 5.52rem;
        height: 1.34rem;
        background: url("../img/people_item_bg.png") 0/100% 100% no-repeat;
        display: flex;
        align-items: center;
        padding-left: 0.37rem;
        padding-right: 0.3rem;
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
            width: 1.5rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .text {
            font-size: 0.26rem;
            font-weight: 400;
            color: #f7f45b;
            padding-top: 0.1rem;
          }
        }
        .btn {
          width: 1.41rem;
          height: 0.47rem;
          background: url("../img/see_coll_btn.png") 0/100% 100% no-repeat;
          font-size: 0.24rem;
          font-weight: 400;
          color: #ffffff;
          text-align: center;
          line-height: 0.47rem;
        }
        .invited_btn {
          background: url("../img/invited.png") 0/100% 100% no-repeat !important;
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
      width: 0.9rem;
      height: 0.9rem;
      bottom: -1rem;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>