<template>
  <div class="header">
    <div class="title">{{title}} <span class="back" @click="back()"></span></div>

  </div>
</template>
<script>
export default {
  props: ["title"],
  methods: {
    back() {
      history.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  height: 0.6rem;
  line-height: 0.6rem;
  position: relative;
  margin-top: 0.18rem;
  .title {
    font-size: 160%;
    color: #000000;
    text-align: center;
    .back {
      width: 0.2rem;
      height: 0.35rem;
      background: url(../assets/img/back.png);
      background-size: 100% 100%;
      transform: rotate(180deg);
      position: absolute;
      right: 0.35rem;
      top: 0.15rem;
    }
  }
}
</style>
