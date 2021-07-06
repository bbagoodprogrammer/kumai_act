<template>
  <div class="rule_dialog">
    <div class="dialog_screen" @click="handleCloseDialog"></div>
    <div class="dialog_container">
      <img class="title__img" :src="images.rule_dialog_title" alt="" />
      <div class="time" v-html="getActTime"></div>
      <div class="tabs">
        <img class="tab" @click="handleClick(0)" :src="tab == 0 ? images.rule_select : images.rule" />
        <img class="tab" :src="tab == 1 ? images.award_select : images.award" @click="handleClick(1)" />
      </div>
      <div class="rule__main">
        <template v-if="tab == 0">
          <div class="title">{{ lang.rule_title_1 }}</div>
          <div class="des" v-html="getBrHtml(lang.sign_des)"></div>
          <div class="title">{{ lang.rule_title_2 }}</div>
          <div class="des" v-html="getBrHtml(lang.get_des_1)"></div>
          <ul class="gifts">
            <li v-for="(item, index) in manGifts" :key="item">
              <img class="gift__img" :src="require(`../img/man_gift_${index + 1}.png`)" />
              <span class="name">{{ lang[`man_gift_${index + 1}`] }}</span>
              <span class="value">{{ lang.man_gift_value }}</span>
              <span class="value">+{{ item }}</span>
              <div class="label" v-if="index == 2 || index == 1">
                {{ lang.special_effects }}
              </div>
            </li>
          </ul>
          <div class="des" v-html="getBrHtml(lang.get_des_2)"></div>
          <ul class="gifts">
            <li v-for="(item, index) in womanGifts" :key="item">
              <img class="gift__img" :src="require(`../img/woman_gift_${index + 1}.png`)" />
              <span class="name">{{ lang[`woman_gift_${index + 1}`] }}</span>
              <span class="value">{{ lang.woman_gift_value }}</span>
              <span class="value">+{{ item }}</span>
              <div class="label" v-if="index == 2 || index == 1">
                {{ lang.special_effects }}
              </div>
            </li>
          </ul>
          <div class="title">{{ lang.rule_title_3 }}</div>
          <div class="des" v-html="getBrHtml(lang.higt_time_des)"></div>
          <div class="title">{{ lang.rule_title_4 }}</div>
          <div class="des" v-html="getBrHtml(lang.matter_des)"></div>
          <div class="explain">{{ lang.explain }}</div>
        </template>
        <template v-if="tab == 1">
          <div class="title">{{ lang.award_title_1 }}</div>
          <ul class="awards">
            <li v-for="(item, index) in 3" :key="item">
              <img class="gift__img" :src="require(`../img/man_award_${index + 1}.png`)" />
              <span class="name">{{ lang[`man_award_${index + 1}`] }}</span>
            </li>
          </ul>
          <div class="des" v-html="getBrHtml(lang.man_award)"></div>
          <div class="title">{{ lang.award_title_2 }}</div>
          <ul class="awards">
            <li v-for="(item, index) in 3" :key="item">
              <img class="gift__img" :src="require(`../img/woman_award_${index + 1}.png`)" />
              <span class="name">{{ lang[`woman_award_${index + 1}`] }}</span>
            </li>
          </ul>
          <div class="des" v-html="getBrHtml(lang.woman_award)"></div>
          <div class="explain">{{ lang.explain }}</div>
        </template>
      </div>
      <img class="close__dialog" @click="handleCloseDialog" src="../img/close.png" />
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
    getActTime () {
      let sTime = dateFormat(this.lang.s_time, this.initData.sTime * 1000);
      let eTime = dateFormat(this.lang.e_time, this.initData.eTime * 1000);
      return this.lang.act_time.replace("%s", sTime + "-" + eTime);
    },
  },

  data () {
    return {
      tab: 0,
      manGifts: [],
      womanGifts: [],
    };
  },

  created () {
    this.manGifts = window._manGifts
    this.womanGifts = window._womanGifts
    document.body.style.overflow = "hidden";
  },

  beforeDestroy () {
    document.body.style.overflow = "";
  },

  methods: {
    handleClick (tab) {
      this.tab = tab;
    },

    getBrHtml (text) {
      if (!text) {
        return;
      }
      return text.replace(/\n/g, "<br>");
    },

    handleCloseDialog () {
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
    width: 6.83rem;
    height: 9.33rem;
    position: fixed;
    top: 0;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    opacity: 1;
    box-sizing: border-box;
    padding-top: 0.8rem;
    background: url('../img/dialog_bg.png') 0/100% 100% no-repeat;
    .title__img {
      width: 3.49rem;
      height: 1.35rem;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -0.7rem;
    }
    .time {
      text-align: center;
      font-size: 0.26rem;
      font-weight: 400;
      color: #c751cc;
      padding-bottom: 0.17rem;
    }
    .tabs {
      margin: 0 auto 0.1rem auto;
      display: flex;
      justify-content: center;
      .tab {
        width: 2.5rem;
        height: 0.79rem;
        margin-left: 0.07rem;
        margin-right: 0.07rem;
      }
    }
    .rule__main {
      width: 6.11rem;
      height: 6.8rem;
      margin: 0rem auto 0 auto;
      overflow: auto;
      .title {
        font-size: 0.28rem;
        font-weight: 400;
        color: #c751cc;
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
        padding-bottom: 0.38rem;
        font-size: 0.26rem;
        font-weight: 400;
        color: #c751cc;
      }
      .title_padding {
        padding-top: 0.3rem;
      }
      .gifts {
        display: flex;
        justify-content: center;
        margin-top: -0.06rem;
        margin-bottom: 0.15rem;
        li {
          width: 1.8rem;
          height: 2.32rem;
          background: url('../img/gift_bg.png') 0/100% 100% no-repeat;
          margin-left: 0.06rem;
          margin-right: 0.06rem;
          text-align: center;
          position: relative;
          .gift__img {
            width: 1.74rem;
            height: 1.32rem;
            display: block;
            margin-left: 0.03rem;
            margin-top: 0.03rem;
          }
          .name {
            font-size: 0.24rem;
            font-weight: normal;
            color: #ffffff;
          }
          .value {
            display: block;
            font-size: 0.2rem;
            font-weight: normal;
            color: #9752f3;
            line-height: 0.26rem;
          }
          .label {
            width: 0.61rem;
            height: 0.26rem;
            background: url('../img/label_box.png') 0/100% 100% no-repeat;
            position: absolute;
            top: 0;
            right: 0;
            text-align: center;
            font-size: 0.18rem;
            font-weight: normal;
            color: #ffffff;
            line-height: 0.26rem;
          }
        }
      }
      .awards {
        display: flex;
        justify-content: center;
        margin-top: 0.3rem;
        li {
          margin-left: 0.07rem;
          margin-right: 0.08rem;
          text-align: center;
          .gift__img {
            display: block;
            width: 1.8rem;
            height: 1.8rem;
          }
          .name {
            font-size: 0.24rem;
            font-weight: normal;
            color: #9752f3;
            padding-top: 0.14rem;
            padding-bottom: 0.26rem;
            display: block;
          }
        }
      }
    }
    .close__dialog {
      width: 0.69rem;
      height: 0.69rem;
      position: absolute;
      top: -0.2rem;
      right: -0.2rem;
      z-index: 1000;
    }
  }
}
</style>