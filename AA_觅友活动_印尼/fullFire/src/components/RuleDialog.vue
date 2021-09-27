<template>
  <div class="rule__dialog">
    <div @touchmove.prevent class="rule__screen__container" @click="handleCloseDialog"></div>
    <div class="rule__container">
      <img src="../assets/images/close.png" @click="handleCloseDialog" class="close__img" />
      <div class="tabs">
        <div class="tab" @click="handleTab(0)" :class="{ tab_select_left: currentTab == 0 }">
          {{ lang.act_rule_title }}
        </div>
        <div class="tab" @click="handleTab(1)" :class="{ tab_select_right: currentTab == 1 }">
          {{ lang.act_award_title }}
        </div>
      </div>
      <div class="rule_main">
        <div v-if="currentTab == 0">
          <div class="time">{{ actTime }}</div>
          <div class="title">{{ lang.join_and_list }}</div>
          <div class="des" v-html="getBrHtml(lang.join_list_des)"></div>
          <div class="title">{{ lang.matters }}</div>
          <div class="des" v-html="getBrHtml(lang.matters_des)"></div>
          <div class="des des_padding">{{ lang.explain_1 }}</div>
          <div class="explain">{{ lang.explain_2 }}</div>
        </div>
        <div v-if="currentTab == 1">
          <div class="time">{{ actTime }}</div>
          <div class="title">{{ lang.total_award }}</div>
          <div class="des" v-html="getBrHtml(lang.total_award_des)"></div>
          <div class="title">{{ lang.cont_award }}</div>
          <ul>
            <li v-for="item in 4" :key="item">
              <img :src="require(`../assets/images/fan_award_${item}.png`)" />
              <div class="name" v-html="getBrHtml(lang[`rule_fan_award_${item}`])"></div>
            </li>
          </ul>
          <div class="des" v-html="getContAwardDes"></div>
          <div class="explain">{{ lang.explain_2 }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import lang from "@/config/lang";
import { dateFormat } from "../utils";
import { mapState } from "vuex";

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
    ...mapState(["initData"]),
    actTime () {
      let start = dateFormat(this.lang.time_value, this.initData.sTime * 1000)
      let end = dateFormat(this.lang.time_value, this.initData.eTime * 1000)
      return this.lang.act_time.replace('%s', start + '-' + end)
    },
    getContAwardDes () {
      let time = dateFormat(this.lang.coupon_time, (this.initData.eTime + 86400) * 1000)
      return this.lang.cont_award_des.replace(/\n/g, "<br>").replace('%s', time)
    }
  },

  data () {
    return {
      currentTab: 0,
    };
  },

  created () {
    document.body.style.overflow = "hidden";
  },

  beforeDestroy () {
    document.body.style.overflow = "";
  },

  methods: {
    handleTab (index) {
      this.currentTab = index;
    },
    getBrHtml (text) {
      return text
        .replace(/\n/g, "<br>")
        .replace(
          "%1",
          '<a href="https://activities.newstarapp.com/static_html/chat_explain/index.html?aid=42" >'
        )
        .replace("%2", '</a>');
    },

    handleCloseDialog () {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style lang="scss">
.rule__dialog {
  width: 100%;
  height: 100%;
  .rule__screen__container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.7;
    z-index: 1000;
  }

  .rule__container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    opacity: 1;
    width: 713px;
    height: 923px;
    background: url('../assets/images/rule_dialog_bg.png');
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
      width: 540px;
      height: 71px;
      display: flex;
      justify-content: center;
      background: url('../assets/images/tabs_bg.png') 0/100% 100% no-repeat;
      margin: 0 auto;
      .tab {
        width: 50%;
        font-size: 24px;
        font-weight: bold;
        font-style: italic;
        color: #FFFFFF;
        text-align: center;
        line-height: 71px;
      }
      .tab_select {
        background: url('../assets/images/tab_select_bg.png') 0/100% 100%
          no-repeat;
        font-size: 30px;
      }
      .tab_select_left {
        background: url('../assets/images/tab_select_left.png') 0/100% 100%
          no-repeat;
        font-size: 0;
      }
      .tab_select_right {
        background: url('../assets/images/tab_select_right.png') 0/100% 100%
          no-repeat;
        font-size: 0;
      }
    }
    .rule_main {
      flex: 1;
      overflow: auto;
      // background: red;
      padding-left: 30px;
      padding-right: 25px;
      // padding-bottom: 30px;
      .time {
        height: 23px;
        font-size: 24px;
        font-weight: 400;
        color: #fbed8d;
        line-height: 23px;
        text-align: center;
        padding-top: 19px;
        // padding-bottom: ;
      }
      .title {
        font-size: 28px;
        color: rgba(251, 237, 141, 1);
        padding-top: 28px;
        padding-bottom: 10px;
      }
      .des {
        font-size: 22px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 29px;
      }
      .des_padding {
        padding-top: 20px;
      }
      .explain {
        height: 23px;
        font-size: 24px;
        font-weight: 400;
        color: #fbed8d;
        text-align: center;
        padding-top: 30px;
      }
      ul {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        li {
          img {
            width: 150px;
            height: 150px;
            border: 1px solid #fbed8d;
            padding: 10px;
            box-sizing: border-box;
            border-radius: 9px;
            overflow: hidden;
            margin-left: 5px;
            margin-right: 5px;
          }
          .name {
            line-height: 28px;
            // height: 23px;
            font-size: 24px;
            font-weight: 400;
            color: #f1c877;
            text-align: center;
            padding-top: 8px;
            padding-bottom: 30px;
          }
        }
      }
    }
  }
}
</style>