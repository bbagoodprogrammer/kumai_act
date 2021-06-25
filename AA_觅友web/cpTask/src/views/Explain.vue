<template>
  <div class="explain">
    <div class="title first">{{lang.explain_title_1}}</div>
    <div class="des">{{lang.explain_des_1}}</div>
    <div class="title">{{lang.explain_title_2}}</div>
    <div class="des">{{lang.explain_des_2}}</div>
    <div class="title">{{lang.explain_title_3}}</div>
    <div class="des">{{lang.explain_des_3}}</div>
    <div class="title">{{lang.explain_title_4}}</div>
    <div class="des">{{lang.explain_des_4}}</div>
  </div>
</template>

<script>
export default {
  name: 'Explain',

  data () {
    return {
    };
  },

  created () {
    document.title = this.lang.cp_explain
  },

  computed: {
    lang: () => _lang
  },
};
</script>

<style lang="scss" scoped>
.explain {
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  .title {
    // height: 0.45rem;
    font-size: 0.32rem;
    font-weight: bold;
    // line-height: 0.45rem;
    color: #333333;
    opacity: 1;
    padding-top: 0.66rem;
  }
  .first {
    padding-top: 0.4rem;
  }
  .des {
    font-size: 0.28rem;
    font-weight: 400;
    line-height: 0.4rem;
    color: #333333;
    opacity: 1;
    padding-top: 0.1rem;
  }
}
</style>