<template>
  <div class="first_dialog">
    <div class="dialog_screen" @click="handleCloseDialog"></div>
    <div class="dialog_container" :style="{background: `url(${images.first_dialog_bg}) 0/100% 100% no-repeat`}">
      <img class="duck__img" src="../img/first_dialog_duck.png" />
      <div class="des" v-html="getBrHtml(lang.first_dialog_des)"></div>
      <img @click="handleCloseDialog" class="btn__img" :src="images.first_dialog_btn" />
    </div>
  </div>
</template>

<script>
export default {
  name: "FirstDialog",

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },

  computed: {},

  data() {
    return {};
  },

  created() {
    document.body.style.overflow = "hidden";
  },

  beforeDestroy() {
    document.body.style.overflow = "";
  },

  methods: {
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
.first_dialog {
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
    width: 6.86rem;
    height: 10.36rem;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translate(-50%);
    z-index: 1000;
    opacity: 1;
    .duck__img {
      display: block;
      width: 4.88rem;
      height: 4.39rem;
      margin: 3.48rem auto 0 auto;
    }
    .des {
      text-align: center;
      font-size: 0.28rem;
      font-weight: 400;
      color: #712d0f;
      line-height: 0.34rem;
      margin-top: 0.2rem;
    }
    .btn__img {
      width: 3.64rem;
      height: 1.24rem;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -0.62rem;
    }
  }
}
</style>