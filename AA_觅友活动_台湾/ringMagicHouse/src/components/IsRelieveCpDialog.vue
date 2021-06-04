<template>
  <div class="relieve_cp_dialog">
    <div class="select__screen__container" @click="handleCloseDialog"></div>
    <div class="select__container">
      <img
        src="../img/close.png"
        @click="handleCloseDialog"
        class="close__img"
      />
      <div class="dialog_header">{{ lang.regret_tell_you }}</div>
      <div class="relieve_cp_des">{{ lang.regret_tell_des_1.replace('%s', userInfo.cp_nick) }}</div>
      <div class="clear_engine">{{ lang.regret_tell_des_2 }}</div>
      <div class="action__tabs">
        <div class="tab" @click="handleReject">{{ lang.reject }}</div>
        <div class="tab" @click="handleAgree">{{ lang.agree }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { toast } from "../utils/index";
import callApp from "../utils/callApp";
import { rejectRelieve, acceptRelieve } from "../apis/index";
import { mapGetters, mapState } from 'vuex'

export default {
  name: "IsRelieveCpDialog",

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    mailId: {
      required: true,
    },
  },

   computed: {
    ...mapGetters([
      'userInfo',
    ]),
    ...mapState(["initData"])
  },

  data() {
    return {
      list: [],
      selectUid: "",
    };
  },

  created() {
    document.body.style.overflow = "hidden";
  },

  beforeDestroy() {
    document.body.style.overflow = "";
  },

  methods: {
    async handleReject() {
      let res = await rejectRelieve({mail_id: this.mailId});
      let { response_status, response_data } = res.data;
      if (response_status.code === 0) {
        this.handleCloseDialog()
      } else {
        toast(response_status.error);
      }
    },
    async handleAgree() {
      let res = await acceptRelieve({mail_id: this.mailId});
      let { response_status, response_data } = res.data;
      if (response_status.code === 0) {
        this.$store.dispatch("initData");
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

    handleCloseDialog() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style lang="scss">
.relieve_cp_dialog {
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
  .select__container {
    width: 6.38rem;
    height: 5.03rem;
    background: url("../img/mini_dialog_bg.png") 0/100% 100% no-repeat;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
    .relieve_cp_des {
      width: 5.7rem;
      font-size: 0.28rem;
      font-weight: 300;
      color: #ffffff;
      line-height: 0.36rem;
      margin: 0.7rem auto 0.46rem auto;
      text-align: center;
    }
    .clear_engine {
      width: 5.7rem;
      margin: 0 auto;
      text-align: center;
      font-size: 0.22rem;
      font-weight: 300;
      color: #8afffb;
    }

    .action__tabs {
      display: flex;
      justify-content: center;
      margin-top: 0.45rem;
      .tab:first-child {
        background: url("../img/dialog_left_action_tab.png") 0/100% 100%
          no-repeat;
      }
      .tab {
        width: 2.48rem;
        height: 0.7rem;
        line-height: 0.7rem;
        background: url("../img/cp_selected_btn.png") 0/100% 100% no-repeat;
        text-align: center;
        font-size: 0.28rem;
        font-weight: 500;
        color: #ffffff;
        margin-right: 0.2rem;
        margin-left: 0.2rem;
      }
    }
  }
}
</style>