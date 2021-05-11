<template>
  <div class="page pageIndex">
    <div class="turn">
      <div class="turnImg"></div>
      <div class="size" v-for="(item,index) in 7 " :key="index" :class="'size' + index">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss">
.pageIndex {
  .turn {
    width: 6.82rem;
    height: 6.82rem;
    margin: 1rem auto 0;
    position: relative;
    background: url(../img/turn.png);
    background-size: 100% 100%;
    animation: zhuan1 30s infinite linear;
    @keyframes zhuan1 {
      to {
        transform: rotate(360deg);
      }
    }
    @keyframes zhuan2 {
      to {
        transform: rotate(-360deg);
      }
    }

    .size {
      width: 2.72rem;
      height: 1.84rem;
      background: url(../img/zise.png);
      background-size: 100% 100%;
      position: absolute;
      animation: zhuan2 30s infinite linear;
      &.size0 {
        top: -0.2rem;
        left: 0.2rem;
      }
      &.size1 {
        top: -0.2rem;
        right: 0.2rem;
      }
      &.size2 {
        top: 1.8rem;
        right: -0.2rem;
      }
      &.size3 {
        top: 3.8rem;
        right: 0rem;
      }
      &.size4 {
        top: 5.6rem;
        left: 2rem;
      }
      &.size5 {
        top: 3.8rem;
        left: 0rem;
      }
      &.size6 {
        top: 1.8rem;
        left: -0.2rem;
      }
      &.size7 {
      }
    }
  }
  img {
    display: block;
    width: 100%;
  }
}
</style>