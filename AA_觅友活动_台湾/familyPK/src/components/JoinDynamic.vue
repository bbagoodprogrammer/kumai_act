<template>
  <div class="Join_dynamic">
    <InnerScrollLoadList class="list__main" :url="url" :parse="parse">
      <template slot-scope="{ list, loading, none }">
        <div class="title">{{ lang.wait_handle }}</div>
        <ul>
          <li
            class="apply__item"
            v-for="(item, index) in applyList"
            :key="index"
          >
            <img
              class="avatar"
              @click.stop="goHomepage(item.uid)"
              v-lazy="item.avatar"
            />
            <div class="info">
              <div class="nick">{{ item.nick }}</div>
              <div class="time">{{ item.time }}</div>
            </div>
            <div class="btn" @click="handleApply(item, 1)">
              {{ lang.agree }}
            </div>
            <div class="reject_btn" @click="handleApply(item, 2)">
              {{ lang.reject }}
            </div>
          </li>
        </ul>

        <div class="title orther_title">{{ lang.orther_dynamic }}</div>
        <ul>
          <li class="orther__item" v-for="(item, index) in list" :key="index">
            <img
              class="avatar"
              @click.stop="goHomepage(item.uid)"
              v-lazy="item.avatar"
            />
            <div class="info">
              <div class="nick">{{ item.nick }}</div>
            </div>
            <span class="des">{{ item.des }}</span>
          </li>
        </ul>

        <div v-if="loading" class="scrollLoading">{{ lang.loading }}</div>
        <div v-if="none" class="scrollNone">{{ lang.not_data }}</div>
      </template>
    </InnerScrollLoadList>

    <div class="confirm__dialog" v-if="showConfirm">
      <div
        @touchmove.prevent
        class="list__screen__container"
        @click="showConfirm = false"
      ></div>
      <div class="apply__main">
        <div class="confirm__title">
          {{ type == 1 ? lang.agree : lang.reject }}
        </div>
        <div class="apply_des" v-if="type == 1">
          {{ lang.agree_des.replace("%s", userInfo.nick) }}
        </div>
        <div class="apply_des" v-else>
          {{ lang.reject_des.replace("%s", userInfo.nick) }}
        </div>
        <div class="btn__box">
          <div class="btn" @click="showConfirm = false">
            {{ lang.think_again }}
          </div>
          <div class="btn" @click="handleSubmit">
            {{ type == 1 ? lang.confirm_agree : lang.confirm_reject }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../apis/api";
import InnerScrollLoadList from "./common/InnerScrollLoadList";
import { dateFormat, toast } from "../utils";
import { applyList, accept, reject } from "../apis";
import callApp from "../utils/callApp";
export default {
  name: 'JoinDynamic',
  
  components: {
    InnerScrollLoadList,
  },

  data() {
    return {
      url: api.otherList,
      applyList: [],
      showConfirm: false,
      type: 1, // 1同意 2拒绝
      userInfo: {},
    };
  },

  created() {
    this.fetchData();
  },

  methods: {
    parse(data) {
      const { response_status, response_data } = data;
      if (response_status && response_status.error === "") {
        response_data.list.forEach((item) => {
          item.des = this.lang[`orther_dyn_des_${item.status}`];
        });
        return response_data.list;
      } else {
        const { error } = response_status;
        if (error) {
          toast(error);
        }
      }
      return [];
    },

    async fetchData() {
      let res = await applyList();
      let { response_status, response_data } = res.data;
      if (response_status.code === 0) {
        response_data.list.forEach((item) => {
          item.time = dateFormat(this.lang.apply_time, item.time * 1000);
        });
        this.applyList = response_data.list;
      } else {
        toast(response_status.error);
      }
    },

    handleApply(item, type) {
      this.type = type;
      this.userInfo = item;
      this.showConfirm = true;
    },

    async handleSubmit() {
      let req = this.type == 1 ? accept : reject
      let res = await req({mailId: this.userInfo.mailId});
      let { response_status, response_data } = res.data;
      if (response_status.code === 0) {
        toast(this.lang.operation_succ)
        this.showConfirm = false
        this.fetchData()
        this.url = this.url + '&t=' + Date.now();
      } else {
        toast(response_status.error);
      }
    },

    goHomepage(uid) {
      if (uid) {
        callApp.userInfo(uid);
      }
    },
  },
};
</script>

<style lang="scss">
.Join_dynamic {
  .list__main {
    height: 7.1rem;
    overflow: auto;
    .title {
      font-size: 0.24rem;
      margin-left: 0.27rem;
      font-weight: 400;
      color: #b1c4f7;
      padding-bottom: 0.13rem;
    }
    .orther_title {
      padding-top: 0.3rem;
    }

    .apply__item {
      display: flex;
      align-items: center;
      width: 6.7rem;
      height: 1.18rem;
      background: url("../img/mail_item.png") 0/100% 100% no-repeat;
      margin: 0 auto 0.08rem auto;
      .avatar {
        width: 0.84rem;
        height: 0.84rem;
        background: #231443;
        border: 0.02rem solid #eeb66a;
        box-sizing: border-box;
        border-radius: 50%;
        margin-left: 0.33rem;
      }
      .info {
        margin-left: 0.24rem;
        width: 3.2rem;
        .nick {
          font-size: 0.24rem;
          font-weight: 400;
          color: #fdfdff;
          width: 2rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .time {
          font-size: 0.22rem;
          font-weight: 400;
          color: #6e61c9;
          margin-top: 0.06rem;
        }
      }
      .btn {
        width: 0.86rem;
        height: 0.37rem;
        background: url("../img/agree_btn.png") 0/100% 100% no-repeat;
        font-size: 0.2rem;
        font-weight: 400;
        color: #7a2a10;
        text-align: center;
        line-height: 0.37rem;
      }
      .reject_btn {
        @extend .btn;
        background: url("../img/reject_btn.png") 0/100% 100% no-repeat;
        color: #fff;
        margin-left: 0.09rem;
      }
    }

    .orther__item {
      display: flex;
      align-items: center;
      width: 6.7rem;
      height: 1.18rem;
      background: url("../img/mail_item.png") 0/100% 100% no-repeat;
      margin: 0 auto 0.08rem auto;
      .avatar {
        width: 0.84rem;
        height: 0.84rem;
        background: #231443;
        border: 0.02rem solid #eeb66a;
        box-sizing: border-box;
        border-radius: 50%;
        margin-left: 0.33rem;
      }
      .info {
        margin-left: 0.24rem;
        flex: 1;
        .nick {
          font-size: 0.24rem;
          font-weight: 400;
          color: #fdfdff;
          width: 2rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .des {
        font-size: 0.2rem;
        font-weight: 400;
        color: #6e61c9;
        padding-right: 0.25rem;
      }
    }
    .scrollLoading,
    .scrollNone {
      text-align: center;
      color: #e9faf9;
      padding-top: 0.2rem;
      padding-bottom: 0.2rem;
      font-size: 0.26rem;
    }
    .scrollNone {
      padding-top: 2.5rem;
    }
  }

  .confirm__dialog {
    .list__screen__container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: black;
      opacity: 0.5;
      z-index: 1000;
    }

    .apply__main {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1000;
      opacity: 1;
      width: 6.81rem;
      height: 3.51rem;
      background: url("../img/mini_dialog_bg.png");
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

      .confirm__title {
        display: inline-block;
        font-size: 0.34rem;
        color: #e4bd68;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 0.31rem;
      }
      .confirm__title::before {
        content: "";
        width: 1.94rem;
        height: 0.16rem;
        position: absolute;
        left: -2.3rem;
        background-image: url("../img/title_left.png");
        background-size: 100% 100%;
        top: 50%;
        transform: translateY(-50%);
      }
      .confirm__title::after {
        content: "";
        width: 1.94rem;
        height: 0.16rem;
        position: absolute;
        right: -2.3rem;
        background-image: url("../img/title_right.png");
        background-size: 100% 100%;
        top: 50%;
        transform: translateY(-50%);
      }

      .apply_des {
        text-align: center;
        font-size: 0.26rem;
        font-weight: 400;
        color: #e9faf9;
        padding: 0.48rem 1rem 0.4rem 1rem;
      }

      .btn__box {
        display: flex;
        justify-content: center;
        .btn:first-child {
          background: url("../img/tab_bg.png");
          background-size: 100% 100%;
          color: #ffffff;
        }
        .btn {
          width: 2.3rem;
          height: 0.78rem;
          background: url("../img/current_tab_bg.png");
          background-size: 100% 100%;
          line-height: 0.78rem;
          text-align: center;
          font-size: 0.28rem;
          font-weight: bold;
          color: #7a2a10;
          margin: 0 0.2rem 0 0.2rem;
        }
      }
    }
  }
}
</style>