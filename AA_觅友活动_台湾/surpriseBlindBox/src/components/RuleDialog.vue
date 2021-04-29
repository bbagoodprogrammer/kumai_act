<template>
  <div class="rule_dialog">
    <div class="dialog_screen" @click="handleCloseDialog"></div>
    <div
      class="dialog_container"
      :style="{
        background: `url(${images.rule_dialog}) 0/100% 100% no-repeat`,
      }"
    >
      <!-- <div class="time">{{ lang.act_time }}</div> -->
      <!-- <div class="tabs">
        <div
          class="tab"
          :class="{ tab_select: tab == 0 }"
          @click="handleClick(0)"
        >
          {{ lang.act_rule_name }}
        </div>
        <div
          class="tab"
          :class="{ tab_select: tab == 1 }"
          @click="handleClick(1)"
        >
          {{ lang.act_award }}
        </div>
      </div> -->
      <div class="rule__main">
        <template v-if="tab == 0">
          <div class="time" v-html="getActTime"></div>
          <div class="title">{{ lang.rule_title_1 }}</div>
          <div class="des" v-html="getBrHtml(lang.purchase_box_des)"></div>
          <div class="title">{{ lang.rule_title_2 }}</div>
          <img class="rate__img" :src="images.rate" />
          <div class="title">{{ lang.rule_title_3 }}</div>
          <div class="des" v-html="getBrHtml(lang.rule_rank_des)"></div>
          <div class="title">{{ lang.rule_title_4 }}</div>
          <div class="des" v-html="getBrHtml(lang.matter_des)"></div>
          <div class="explain">{{ lang.explain }}</div>
        </template>
        <template v-if="tab == 1"> </template>
      </div>
      <img
        class="close__dialog"
        @click="handleCloseDialog"
        src="../img/close.png"
      />
    </div>
  </div>
</template>

<script>
import { dateFormat } from "../utils";
import { mapState, mapGetters } from "vuex";
export default {
  name: "ruleDialog",

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    ...mapState(["initData"]),
    getActTime() {
      let sTime = dateFormat(this.lang.s_time, this.initData.sTime * 1000)
      let eTime = dateFormat(this.lang.e_time, this.initData.eTime * 1000)
      return this.lang.act_time.replace('%s', sTime + '-' + eTime)
    }
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
.rule_dialog {
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
    width: 6.92rem;
    height: 8.33rem;
    position: fixed;
    top: 0;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    opacity: 1;
    box-sizing: border-box;
    padding-top: 1.1rem;
    .time {
      text-align: center;
      font-size: 0.24rem;
      font-weight: 400;
      color: #efee6a;
      //padding-top: 1.1rem;
      padding-bottom: 0.27rem;
    }
    .tabs {
      width: 3.39rem;
      height: 0.57rem;
      // background: url("../img/rule_tabs.png") 0/100% 100% no-repeat;
      margin: 0 auto;
      display: flex;
      align-items: center;

      .tab {
        width: 50%;
        text-align: center;
        font-size: 0.26rem;
        font-weight: 400;
        color: #dca16c;
        line-height: 0.57rem;
        position: relative;
      }
      .tab_select {
        width: 1.76rem;
        height: 0.65rem;
        // background: url("../img/rule_tab.png") 0/100% 100% no-repeat;
        color: #ffffff;
      }
    }
    .rule__main {
      width: 6.11rem;
      height: 6.8rem;
      margin: 0rem auto 0 auto;
      overflow: auto;
      .title {
        font-size: 0.24rem;
        font-weight: 400;
        color: #efee6a;
        line-height: 0.4rem;
      }
      .des {
        font-size: 0.26rem;
        font-weight: 400;
        color: rgba(254, 254, 254, 1);
        line-height: 0.4rem;
        padding-bottom: 0.3rem;
      }
      .rate__img {
        display: block;
        width: 6.11rem;
        margin-top: 0.24rem;
        margin-bottom: 0.28rem;
      }
      .notice {
        padding-bottom: 0.38rem;
        font-size: 0.26rem;
        font-weight: 400;
        color: #eba374;
      }
      .explain {
        text-align: center;
        // padding-top: 0.3rem;
        padding-bottom: 0.38rem;
        font-size: 0.26rem;
        font-weight: 400;
        color: #efee6a;
      }
      .title_padding {
        padding-top: 0.3rem;
      }
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