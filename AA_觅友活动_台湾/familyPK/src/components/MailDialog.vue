<template>
  <div class="mail_dialog">
    <div class="dialog_screen" @click="handleCloseDialog"></div>
    <div class="dialog_container">
      <div class="dialog__title">{{ lang.family_mail }}</div>
      <div class="tabs" v-if="initData.patriarch">
        <div
          class="tab"
          :class="{ tab_select: tab == 0 }"
          @click="handleClick(0)"
        >
          {{ lang.guard_dynamic }}
        </div>
        <div
          class="tab"
          :class="{ tab_select: tab == 1 }"
          @click="handleClick(1)"
        >
          {{ lang.join_dynamic }}
        </div>
      </div>

      <GuardDynamic v-if="tab == 0 && initData.patriarch" />
      <JoinDynamic v-if="tab == 1 && initData.patriarch" />

      <GuardDynamic v-if="!initData.patriarch" />
      
      <img
        class="close__dialog"
        @click="handleCloseDialog"
        src="../img/close.png"
      />
    </div>
  </div>
</template>

<script>
import GuardDynamic from './GuardDynamic'
import JoinDynamic from './JoinDynamic'
import { mapState, mapGetters } from "vuex";
export default {
  name: "MailDialog",

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },

  components: {
    GuardDynamic,
    JoinDynamic
  },

  computed: {
    ...mapState(["initData"]),
  },

  data() {
    return {
      tab: 0,
    };
  },

  created() {
    document.body.style.overflow = "hidden";
  },

  beforeDestroy() {
    document.body.style.overflow = "";
  },

  methods: {
    handleClick(tab) {
      this.tab = tab;
    },

    handleCloseDialog() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style lang="scss">
.mail_dialog {
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
    width: 7.33rem;
    height: 9.71rem;
    background: url("../img/dialog_bg.png") 0/100% 100% no-repeat;
    position: fixed;
    top: 0;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    opacity: 1;
    box-sizing: border-box;

    .dialog__title {
      display: inline-block;
      font-size: 0.34rem;
      color: #e4bd68;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 0.31rem;
      margin-bottom: 0.35rem;
    }
    .dialog__title::before {
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
    .dialog__title::after {
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

    .tabs {
      display: flex;
      justify-content: center;
      position: relative;
      z-index: 50;
      margin-bottom: 0.35rem;
      .tab {
        width: 2.3rem;
        height: 0.78rem;
        background: url("../img/tab_bg.png") 0/100% 100% no-repeat;
        margin: 0 0.05rem 0 0.05rem;
        font-size: 0.28rem;
        text-align: center;
        line-height: 0.78rem;
        font-weight: bold;
        color: #cbd5f9;
      }
      .tab_select {
        background: url("../img/current_tab_bg.png") 0/100% 100% no-repeat;
        color: #2c0204;
      }
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