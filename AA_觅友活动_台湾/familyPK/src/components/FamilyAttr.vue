<template>
  <div class="family__attr">
    <div
      @touchmove.prevent
      class="list__screen__container"
      @click="handleCloseDialog"
    ></div>
    <div class="list__container">

      <img
        class="close__dialog"
        @click="handleCloseDialog"
        src="../img/close.png"
      />
      
      <div class="dialog__title">
        <div class="name">{{ name }}</div>
      </div>

      <div class="idea">{{ lang.idea }}</div>
      <div class="idea_content">{{ concept }}</div>

      <div class="guard_title">
        {{ lang.guard_list }}
      </div>
      <div class="list__main">
        <div class="cont__list" v-for="(item, index) in list" :key="index">
          <div class="rank">{{ index + 1 }}</div>
          <img
            class="avatar"
            @click="goHomepage(item.uid)"
            v-lazy="item.avatar"
          />
          <div class="info_middle">
            <div class="nick">{{ item.nick }}</div>
          </div>
          <div class="score">{{ item.score }}</div>
        </div>
      </div>
      <div class="btn" @click="showApplyDialog = true" v-if="!familyRank.familyId && conut < initData.maxNumber">{{ lang.join_family }}</div>
      <div class="btn" @click="showFriendDialog = true" v-if="familyRank.familyId == familyId && conut < initData.maxNumber">{{ lang.invite_friend }}</div>
      <div class="sign_out" v-if="familyRank.familyId == familyId && !initData.patriarch" @click="showSignOutDialog = true">{{ lang.sign_out }}</div>
    </div>

    <FriendDialog v-if="showFriendDialog" :visible.sync="showFriendDialog" />

    <ApplyDialog v-if="showApplyDialog" :visible.sync="showApplyDialog" :familyId="familyId" :name="name"  />

    <SignOutDialog v-if="showSignOutDialog" :visible.sync="showSignOutDialog" :familyId="familyId" :name="name"  />

  </div>
</template>

<script>
import { contributionRank } from "../apis";
import { toast } from "../utils";
import callApp from "../utils/callApp";
import FriendDialog from "./FriendDialog";
import ApplyDialog from './ApplyDialog'
import SignOutDialog from '../components/SignOutDialog'
import { mapState, mapGetters } from "vuex";
export default {
  name: "FamilyAttr",

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    familyId: {
      required: true,
    },
    actStep: {
      required: true,
    },
  },

  components: {
    FriendDialog,
    ApplyDialog,
    SignOutDialog
  },

  computed: {
    ...mapState(["initData"]),
    ...mapGetters(["familyRank"]),
  },

  data() {
    return {
      list: [],
      showFriendDialog: false,
      name: "",
      concept: "",
      showApplyDialog: false,
      showSignOutDialog: false,
      conut: 0
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
      let res = await contributionRank({
        familyId: this.familyId,
        type: this.actStep,
      });
      let { response_status, response_data } = res.data;
      if (response_status.code === 0) {
        this.list = response_data.list;
        this.name = response_data.name;
        this.concept = response_data.concept;
        this.conut = response_data.conut
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
.family__attr {
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

  .list__container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    opacity: 1;
    width: 7.33rem;
    height: 9.71rem;
    background: url("../img/dialog_bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    box-sizing: border-box;

    .close__dialog {
      position: absolute;
      width: 0.56rem;
      height: 0.56rem;
      top: -0.2rem;
      right: 0;
    }

    .dialog__title {
      display: inline-block;
      font-size: 0.34rem;
      color: #e4bd68;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 0.31rem;
      // .name {
      //   width: 1.5rem;
      //   overflow: hidden;
      //   white-space: nowrap;
      //   text-overflow: ellipsis;
      //   text-align: center;
      // }
    }
    // .dialog__title::before {
    //   content: "";
    //   width: 1.94rem;
    //   height: 0.16rem;
    //   position: absolute;
    //   left: -2.06rem;
    //   background-image: url("../img/title_left.png");
    //   background-size: 100% 100%;
    //   top: 50%;
    //   transform: translateY(-50%);
    // }
    // .dialog__title::after {
    //   content: "";
    //   width: 1.94rem;
    //   height: 0.16rem;
    //   position: absolute;
    //   right: -2.06rem;
    //   background-image: url("../img/title_right.png");
    //   background-size: 100% 100%;
    //   top: 50%;
    //   transform: translateY(-50%);
    // }

    .idea {
      font-size: 0.26rem;
      font-weight: 400;
      color: #e9faf9;
      line-height: 0.34rem;
      margin-left: 0.45rem;
    }
    .idea_content {
      width: 6.52rem;
      height: 1.2rem;
      margin-left: 0.45rem;
      margin-top: 0.17rem;
      background: #0f043d;
      font-size: 0.2rem;
      font-weight: 400;
      color: #b1c4f7;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.03rem;
    }

    .guard_title {
      display: inline-block;
      font-size: 0.28rem;
      color: #e9faf9;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 0.37rem;
    }
    .guard_title::before {
      content: "";
      width: 1.94rem;
      height: 0.16rem;
      position: absolute;
      left: -2.06rem;
      background-image: url("../img/title_left.png");
      background-size: 100% 100%;
      top: 50%;
      transform: translateY(-50%);
    }
    .guard_title::after {
      content: "";
      width: 1.94rem;
      height: 0.16rem;
      position: absolute;
      right: -2.06rem;
      background-image: url("../img/title_right.png");
      background-size: 100% 100%;
      top: 50%;
      transform: translateY(-50%);
    }

    .list__main {
      width: 6.5rem;
      height: 4.74rem;
      background: url("../img/guard_list_box.png") 0/100% 100% no-repeat;
      margin: 0.2rem auto 0 auto;
      overflow: auto;
    }
    .cont__list {
      display: flex;
      align-items: center;
      height: 1.1rem;
      font-size: 0.26rem;
      font-weight: 400;
      color: #fdfdff;
      border-bottom: 0.01rem solid rgba($color: #ffffff, $alpha: 0.15);
      margin-left: 0.11rem;
      margin-right: 0.11rem;
      .rank {
        width: 0.78rem;
        text-align: center;
      }
      .avatar {
        width: 0.68rem;
        height: 0.69rem;
        background: #231443;
        border: 0.03rem solid #eeb66a;
        border-radius: 50%;
        box-sizing: border-box;
        flex-shrink: 0;
      }
      .info_middle {
        flex: 1;
        display: flex;
        align-items: center;
        .nick {
          width: 3rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin-left: 0.21rem;
        }
      }
      .score {
        width: 1.6rem;
        text-align: center;
        color: #f9f453;
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
      margin: 0.3rem auto 0 auto;
    }
    .sign_out {
      position: absolute;
      bottom: 0.7rem;
      right: 0.5rem;
      font-size: 0.24rem;
      font-weight: 400;
      color: #3be6ff;
    }
  }
}
</style>