<template>
  <div
    class="header"
    :class="{header1: tab != 1}"
    :style="{
      background: `url(${tab == 1 ? images.header_title : images.header_title1}) 0/100% 100% no-repeat`,
    }"
  >
    <!-- 右侧的按钮 -->
    <div class="rule" @click="goRule">{{ lang.act_rule }}</div>
    <div class="mail" @click="showMailDialog = true">
      {{ lang.family_mail }}
      <img v-if="initData.newMailCount" class="mail_dot" src="../img/mail_dot.png" alt="">
    </div>
    <ul class="award__box" v-if="tab == 1">
      <li v-for="item in 8" :key="item">
        <div class="img__box">
          <img v-if="item == 2" :src="images.award_2" alt="">
          <img v-else :src="require(`../img/award_${item}.png`)" alt="" />
        </div>
        <span class="name" v-html="getBrHtml(lang[`award_${item}`])"></span>
      </li>
    </ul>

    <MailDialog v-if="showMailDialog" :visible.sync="showMailDialog" />

    <ScrollNotice />
  </div>
</template>

<script>
import ScrollNotice from './ScrollNotice'
import MailDialog from './MailDialog'
import { mapState } from "vuex";

export default {
  name: "Header",

  components: {
    MailDialog,
    ScrollNotice
  },

  props:{
    tab:{
      required: true
    }
  },

  data() {
    return {
      showMailDialog: false
    };
  },

  computed: {
    ...mapState(["initData"]),
  },

  methods: {
    goRule() {
      this.$router.push('/rule')
    },

    getBrHtml(text) {
      if (!text) {
        return;
      }
      return text.replace(/\n/g, "<br>");
    },
  },
};
</script>

<style lang="scss">
.header1 {
  height: 8.44rem !important;
}
.header {
  width: 7.5rem;
  height: 13.23rem;
  position: relative;
  box-sizing: border-box;

  .btn_right {
    width: 1.8rem;
    height: 0.5rem;
    position: absolute;
    right: 0;
    font-size: 0.3rem;
    font-weight: 400;
    color: #2c0204;
    box-sizing: border-box;
    z-index: 10;
    text-align: center;
    line-height: 0.5rem;
  }
  .rule {
    @extend .btn_right;
    top: 6.4rem;
    background: url("../img/rule_btn.png") 0/100% 100% no-repeat;
  }
  .mail {
    @extend .btn_right;
    top: 7.06rem;
    background: url("../img/rule_btn.png") 0/100% 100% no-repeat;
    .mail_dot {
      width: 0.29rem;
      height: 0.29rem;
      position: absolute;
      left: 0.06rem;
      top: -0.1rem;
    }
  }

  .award__box {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    position: absolute;
    width: 100%;
    top: 8.12rem;
    li {
      margin-left: 0.05rem;
      margin-right: 0.05rem;
      .img__box {
        width: 1.57rem;
        height: 1.68rem;
        background: url("../img/gift_bg.png") 0/100% 100% no-repeat;
        text-align: center;
        img {
          width: 1.26rem;
          height: 1.25rem;
          margin-top: 0.2rem;
        }
      }
      .name {
        display: block;
        text-align: center;
        font-size: 0.24rem;
        font-weight: 400;
        color: #d6eaff;
        margin-top: 0.12rem;
        margin-bottom: 0.15rem;
      }
    }
  }
}
</style>