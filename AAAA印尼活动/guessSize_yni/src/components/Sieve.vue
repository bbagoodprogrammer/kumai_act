<template>
  <div class="sieveItem">
    <div class="bgRot"></div>
    <div class="imgBox" :style="{transform:'rotate('+roateRo+'deg)'}">
      <img v-show="sieveInedx === 1" src="../assets/img/sieve1.png" alt="">
      <img v-show="sieveInedx === 2" src="../assets/img/sieve2.png" alt="">
      <img v-show="sieveInedx === 3" src="../assets/img/sieve3.png" alt="">
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sieveInedx: 0,
      roateRo: 0
    }
  },
  created() {
    this.sieveInedx = Math.floor(Math.random() * 3 + 1)
  },
  mounted() {
    setInterval(() => {
      this.sieveInedx = Math.floor(Math.random() * 3 + 1)
      // this.roateRo = Math.floor((this.roateRo + 180) + (Math.random() * 180 + 1))
    }, 2000)
  },
  computed: {
  }
}
</script>
<style lang="scss">
.sieveItem {
  width: 1.73rem;
  height: 1.72rem;
  position: relative;
  .bgRot {
    position: absolute;
    top: 0;
    left: 0;
    width: 1.73rem;
    height: 1.72rem;
    background: url(../assets/img/sieveBg.png);
    background-size: 100% 100%;
    animation: roatae 5s linear infinite;
  }
  .imgBox {
    width: 1.21rem;
    height: 1.26rem;
    position: absolute;
    top: 0.27rem;
    left: 0.27rem;
    // transition: all ls;
    animation: roatae 2s linear infinite;
    img {
      width: 100%;
      height: 100%;
    }
  }
  @keyframes roatae {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(1turn);
    }
  }
}
</style>
