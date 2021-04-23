<template>
  <div class="friend_dialog">
    <div class="dialog_screen" @click="handleCloseDialog"></div>
    <div class="dialog_container">
      <div class="dialog__title">{{ lang.friend_list }}</div>
      <div v-if="listData.length > 0" class="friend_des">{{ lang.friend_des }}</div>
      <InnerScrollLoadList class="list__main" :url="url" :parse="parse">
        <template slot-scope="{ list, loading, none }">
          <ul>
            <li
              class="friend__item"
              :class="{ select__item: uids.includes(item.uid) }"
              v-for="(item, index) in list"
              :key="index"
              @click="handleSelectUid(item.uid)"
            >
              <img
                class="avatar"
                @click.stop="goHomepage(item.uid)"
                v-lazy="item.avatar"
              />
              <div class="info">
                <div class="nick">{{ item.nick }}</div>
              </div>
              <img
                class="img__btn"
                v-if="uids.includes(item.uid)"
                src="../img/friend_selected_btn.png"
                alt=""
              />
              <img class="img__btn" v-else src="../img/friend_btn.png" alt="" />
            </li>
          </ul>

          <div v-if="loading" class="scrollLoading">{{ lang.loading }}</div>
          <div v-if="none" class="scrollNone">{{ lang.friend_des }}</div>
        </template>
      </InnerScrollLoadList>
      <div v-if="listData.length > 0" class="btn" @click="handleInvite">
        {{ lang.invite_num.replace("%s", uids.length) }}
      </div>
      <div v-if="listData.length > 0" class="invite_limit">{{ lang.invite_limit }}</div>
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
import { toast } from '../utils';
export default {
  name: "FriendDialog",

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
      uids: [],
      listData: []
    };
  },

  created() {
    document.body.style.overflow = "hidden";
  },

  beforeDestroy() {
    document.body.style.overflow = "";
  },

  methods: {
    parse(data) {
      const { response_status, response_data } = data;
      if (response_status && response_status.error === "") {
        this.listData = this.listData.concat(response_data.list)
        return response_data.list;
      } else {
        const { error } = response_status;
        if (error) {
          toast(error);
        }
      }
      return [];
    },

    async handleInvite() {
      if (this.uids.length == 0) return;
      let res = await invite({ fuids: this.uids.join() });
      let { response_status, response_data } = res.data;
      if (response_status.code === 0) {
        toast(this.lang.operation_succ)
        this.handleCloseDialog()
      } else {
        toast(response_status.error);
      }
    },

    handleSelectUid(uid) {
      let index = this.uids.findIndex((item) => item == uid);
      if (index == -1) {
        if (this.uids.length >= 10) return;
        this.uids.push(uid);
      } else {
        this.uids.splice(index, 1);
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
.friend_dialog {
  .dialog_screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.3;
    z-index: 1000;
  }
  .dialog_container {
    width: 7.33rem;
    height: 9.71rem;
    background: url("../img/dialog_bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    box-sizing: border-box;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;

    .dialog__title {
      display: inline-block;
      font-size: 0.34rem;
      color: #e4bd68;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 0.31rem;
    }
    .dialog__title::before {
      content: "";
      width: 1.94rem;
      height: 0.16rem;
      position: absolute;
      left: -2.2rem;
      background-image: url("../img/title_left.png");
      background-size: 100% 100%;
      top: 50%;
      transform: translateY(-50%);
    }
    .dialog__title::after {
      content: "";
      width: 1.94rem;
      height: 0.16rem;
      position: absolute;
      right: -2.2rem;
      background-image: url("../img/title_right.png");
      background-size: 100% 100%;
      top: 50%;
      transform: translateY(-50%);
    }
    .friend_des {
      font-size: 0.26rem;
      text-align: center;
      font-weight: 400;
      color: #b1c4f7;
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
    }

    .list__main {
      width: 100%;
      height: 6.35rem;
      overflow: auto;
      .select__item {
        background: url("../img/friend_item_selected_bg.png") 0/100% 100%
          no-repeat !important;
        .info .nick {
          color: #fff !important;
        }
      }
      .friend__item {
        width: 6.91rem;
        height: 1.01rem;
        background: url("../img/friend_item_bg.png") 0/100% 100% no-repeat;
        display: flex;
        align-items: center;
        padding-left: 0.66rem;
        padding-right: 0.75rem;
        box-sizing: border-box;
        margin: 0 auto 0.13rem auto;
        .avatar {
          width: 0.68rem;
          height: 0.68rem;
          border-radius: 50%;
          border: 0.02rem solid #73f9e9;
          flex-shrink: 0;
        }
        .info {
          flex: 1;
          margin-left: 0.21rem;
          .nick {
            font-size: 0.26rem;
            font-weight: 400;
            color: #231443;
            width: 2rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .btn__img {
          width: 0.24rem;
          height: 0.24rem;
        }
      }
    }

    .btn {
      width: 3.26rem;
      height: 0.83rem;
      background: url("../img/dialog_btn.png");
      background-size: 100% 100%;
      line-height: 0.83rem;
      text-align: center;
      font-size: 0.28rem;
      font-weight: bold;
      color: #7a2a10;
      margin: 0.23rem auto 0 auto;
    }
    .invite_limit {
      font-size: 0.22rem;
      text-align: center;
      font-weight: 400;
      color: #f8f293;
      padding-top: 0.1rem;
    }

    .scrollLoading,
    .scrollNone {
      text-align: center;
      color: #E9FAF9;
      padding-top: 0.2rem;
      padding-bottom: 0.2rem;
      font-size: 0.26rem;
    }
    .scrollNone {
      padding-top: 3.5rem;
      font-size: 0.32rem;
    }

    .close__dialog {
      position: absolute;
      width: 0.56rem;
      height: 0.56rem;
      top: -0.2rem;
      right: 0;
    }
  }
}
</style>