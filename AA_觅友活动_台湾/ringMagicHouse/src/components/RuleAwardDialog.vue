<template>
  <div class="mail__dialog">
    <div class="mail__screen__container" @click="handleCloseDialog"></div>
    <img class="dialog_crown" src="../img/dialog_crown.png" />
    <div class="mail__container">
      <img
        src="../img/close.png"
        @click="handleCloseDialog"
        class="close__img"
      />
      <div class="dialog_header">{{ lang.act_rule }}</div>
      <div class="mail__tabs">
        <div
          class="tab"
          @click="handleTab(0)"
          :class="{ tab_select: currentTab == 0 }"
        >
          {{ lang.rule_title }}
        </div>
        <div
          class="tab"
          @click="handleTab(1)"
          :class="{ tab_select: currentTab == 1 }"
        >
          {{ lang.award_title }}
        </div>
      </div>
      <div class="dialog_main">
        <Rule v-if="currentTab == 0" />
        <Award v-if="currentTab == 1" />
      </div>
    </div>
  </div>
</template>

<script>
import Rule from './Rule'
import Award from './Award'

export default {
  name: "RuleAwardDialog",

  components:{
    Rule,
    Award
  },

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      currentTab: 0,
    };
  },

  created() {
    document.body.style.overflow = "hidden";
  },

  beforeDestroy() {
    document.body.style.overflow = "";
  },

  methods: {
    handleTab(index) {
      this.currentTab = index;
    },

    handleCloseDialog() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style lang="scss">
.mail__dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  .mail__screen__container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.7;
    z-index: 1000;
  }

  .dialog_crown {
    position: absolute;
    top: 0.9rem;
    left: 50%;
    transform: translateX(-50%);
    width: 5.55rem;
    height: 2.02rem;
    background: url("../img/dialog_crown.png") 0/100% 100% no-repeat;
    z-index: 1000;
  }
  .mail__container {
    width: 6.38rem;
    height: 9.55rem;
    background: url("../img/dialog_bg.png") 0/100% 100% no-repeat;
    position: fixed;
    top: 2.5rem;
    left: 50%;
    transform: translateX(-50%);
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
    .mail__tabs {
      width: 5.69rem;
      height: 0.73rem;
      display: flex;
      justify-content: center;
      background: url("../img/mail__tabs.png") 0/100% 100% no-repeat;
      margin: 0.4rem auto 0.2rem auto;
      .tab {
        width: 50%;
        color: rgba($color: #ffff, $alpha: 0.6);
        text-align: center;
        line-height: 0.73rem;
        font-size: 0.24rem;
        font-weight: 500;
      }
      .tab_select {
        background: url("../img/mail_tab_select.png") 0/100% 100% no-repeat;
        color: #ffff;
      }
    }
    .dialog_main {
      width: 6.38rem;
      height: 7.1rem;
      // background: red;
      overflow: auto;
    }
  }
}
</style>