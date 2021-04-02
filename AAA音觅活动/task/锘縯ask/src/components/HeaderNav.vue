<template>
  <div class="headerNav">
    <i @click="back"></i>
    <strong>
      <em>{{title}}</em>
    </strong>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss">
.headerNav {
  height: .88rem;
  line-height: .88rem;
  padding-top: 0.1rem;
  color: #fff;
  text-align: center;
  position: relative;
  i {
    display: inline-block;
    position: absolute;
    top: 0.33rem;
    left: 0.3rem;
    width: 0.42rem;
    height: 0.42rem;
    background: url("../img/btn_back.png") center center no-repeat;
    background-size: 100% 100%;
  }
  strong {
    display: inline-block;
    width: 2.5rem;
    height: 0.32rem;
    line-height: 0.32rem;
    background-image: url("../img/tab_bg.png");
    background-size: contain;
    text-align: center;
    em {
      font-size: 0.36rem;
      font-weight: bold;
      color: #ffffff;
      background: linear-gradient(45deg, #78dff3 0%, #8170fa 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
</style>