<template>
  <div class="play__dialog">
    <div
      @touchmove.prevent
      class="play__screen__container"
      @click="handleCloseDialog"
    ></div>
    <div class="play__container">
      <img src="../assets/images/close.png" @click="handleCloseDialog" class="close__img" />
      <div class="tabs">
        <div
          v-for="item in 3"
          :key="item"
          class="tab"
          @click="handleTab(item)"
          :class="{ 
            [`tab_select_${item}`]: currentTab == item,
          }"
        >
          {{ lang[`play_tab_${item}`] }}
        </div>
      </div>
      <div class="play_main">
        <template v-if="currentTab == 1">
          <div class="title">{{ lang[`friend_title_${friendIndex}`] }}</div>
          <div class="play_rule">{{ lang.play_rule }}</div>
          <div
            class="rule_des"
            v-html="getBrHtml(lang[`friend_rule_${friendIndex}`])"
          ></div>
          <div class="tip" v-if="lang[`friend_tip_${friendIndex}`]">
            {{ lang.tip_title }}
          </div>
          <div
            class="rule_des"
            v-html="getBrHtml(lang[`friend_tip_${friendIndex}`])"
          ></div>
        </template>

        <template v-if="currentTab == 2">
          <div class="title">{{ lang[`pk_title_${pkIndex}`] }}</div>
          <div class="play_rule">{{ lang.play_rule }}</div>
          <div
            class="rule_des"
            v-html="getBrHtml(lang[`pk_rule_${pkIndex}`])"
          ></div>
          <div class="tip" v-if="lang[`pk_tip_${pkIndex}`]">
            {{ lang.tip_title }}
          </div>
          <div
            class="rule_des"
            v-html="getBrHtml(lang[`pk_tip_${pkIndex}`])"
          ></div>
        </template>

        <template v-if="currentTab == 3">
          <div class="title">{{ lang[`auction_title_${auctionIndex}`] }}</div>
          <div class="play_rule">{{ lang.play_rule }}</div>
          <div
            class="rule_des"
            v-html="getBrHtml(lang[`auction_rule_${auctionIndex}`])"
          ></div>
          <div class="tip" v-if="lang[`auction_tip_${auctionIndex}`]"></div>
          <div
            class="rule_des"
            v-html="getBrHtml(lang[`auction_tip_${auctionIndex}`])"
          ></div>
        </template>
      </div>
      <div class="action">
        <div class="change_tab" @click="handleChange"></div>
        <div class="tab btn" @click="handleCopy"></div>
      </div>
    </div>
  </div>
</template>

<script>
import lang from "@/config/lang";
import { contributionRank } from "../request/index";
import { toast } from "../utils";
import callApp from "../utils/callApp";
import Clipboard from "clipboard";

export default {
  name: "Dialog",

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    lang: () => lang,
  },

  data() {
    return {
      currentTab: 1,
      friendIndex: 1,
      auctionIndex: 1,
      pkIndex: 1
    };
  },

  created() {
    document.body.style.overflow = 'hidden'
  },

  beforeDestroy() {
    document.body.style.overflow = ''
  },

  methods: {
    handleTab(index) {
      this.currentTab = index;
      this.friendIndex = 1
      this.auctionIndex = 1
      this.pkIndex = 1
    },
    handleChange() {
      if (this.currentTab == 1) {
        if (this.friendIndex + 1 > 3) {
          this.friendIndex = 1;
        } else {
          this.friendIndex += 1;
        }
      }
      if (this.currentTab == 2) {
        if (this.pkIndex + 1 > 2) {
          this.pkIndex = 1;
        } else {
          this.pkIndex += 1;
        }
      }
    },
    handleCopy() {
      var clipboard = new Clipboard(".btn", {
        // 通过target指定要复印的节点
        target: function () {
          return document.querySelector(".play_main");
        },
      });
      clipboard.on("success", function (e) {
        console.info('Text:', e.text);
        e.clearSelection();
        toast(lang.copy_success)
      });
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
.play__dialog {
  width: 100%;
  height: 100%;
  .play__screen__container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.7;
    z-index: 1000;
  }

  .play__container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    opacity: 1;
    width: 713px;
    height: 905px;
    background: url("../assets/images/play_dialog_bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    // padding: 137px 30px 0 30px;
    padding-top: 140px;
    padding-bottom: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .close__img {
      width: 58px;
      height: 58px;
      position: absolute;
      top: -73px;
      right: 9px;
      z-index: 1000;
    }
    .tabs {
      width: 603px;
      height: 71px;
      display: flex;
      justify-content: center;
      background: url("../assets/images/play_tabs_bg.png") 0/100% 100% no-repeat;
      margin: 0 auto;
      .tab {
        width: 201px;
        font-size: 30px;
        font-weight: 400;
        font-style: italic;
        color: #c8a669;
        text-align: center;
        line-height: 71px;
      }
      .tab_select_1 {
        width: 208px;
        background: url("../assets/images/tab_select_1.png") 0/100% 100%
          no-repeat;
        font-size: 0;
        flex-shrink: 0;
      }
      .tab_select_2 {
        width: 208px;
        background: url("../assets/images/tab_select_2.png") 0/100% 100%
          no-repeat;
        font-size: 0;
        flex-shrink: 0;
      }
      .tab_select_3 {
        width: 208px;
        background: url("../assets/images/tab_select_3.png") 0/100% 100%
          no-repeat;
        font-size: 0;
        flex-shrink: 0;
      }
      .tab_select {
        background: url("../assets/images/play_tab_bg.png") 0/100% 100%
          no-repeat;
        font-size: 30px;
        font-weight: bold;
        font-style: italic;
        color: #ffffff;
        -webkit-text-stroke: 2px #cb6f3d;
        text-stroke: 2px #cb6f3d;
      }
    }
    .play_main {
      height: 545px;
      margin-top: 20px;
      overflow: auto;
      // background: #f2f2f2;
      padding-left: 58px;
      padding-right: 58px;
      .title {
        font-size: 34px;
        color: rgba(251, 237, 141, 1);
        padding-top: 30px;
        padding-bottom: 10px;
      }
      .play_rule {
        font-size: 24px;
        color: rgba(251, 237, 141, 1);
      }
      .rule_des {
        font-size: 24px;
        color: #ffffff;
        line-height: 30px;
      }
      .tip {
        font-size: 22px;
        color: rgba(251, 237, 141, 1);
        padding-top: 30px;
      }
    }
    .action {
      display: flex;
      justify-content: center;
      margin-top: 20px;
      .tab {
        width: 260px;
        height: 71px;
        background: url("../assets/images/copy_play_btn.png") 0/100% 100%
          no-repeat;
        font-size: 30px;
        font-weight: bold;
        font-style: italic;
        color: #ffffff;
        -webkit-text-stroke: 2px #cb6f3d;
        text-stroke: 2px #cb6f3d;
        text-align: center;
        line-height: 71px;
        margin-left: 25px;
        margin-right: 25px;
      }
      .change_tab {
        @extend .tab;
        width: 210px;
        background: url("../assets/images/change_btn.png") 0/100% 100% no-repeat;
        -webkit-text-stroke: 2px #3335c3;
        text-stroke: 2px #3335c3;
      }
    }
  }
}
</style>