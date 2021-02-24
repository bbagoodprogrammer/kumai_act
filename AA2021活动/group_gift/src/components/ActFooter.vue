<template>
  <div class="footer">
    <van-swipe class="my-swipe-sGift" :loop="false" :touchable="false" :indicator-color="'yellow'" ref="swiper">
      <van-swipe-item>
        1
      </van-swipe-item>
      <van-swipe-item>
        2
      </van-swipe-item>
      <van-swipe-item>
        3
      </van-swipe-item>
    </van-swipe>
    <span class="pre" @click="pre()"></span>
    <span class="next" @click="next()"></span>
  </div>

</template>


<script>

export default {
  data() {
    return {
      swiper: {}
    }
  },
  mounted() {
    this.swiper = this.$refs.swiper
  },
  methods: {
    pre() {
      console.log(this.swiper)
      this.swiper.prev()
    },
    next() {
      this.swiper.next()
    },
  },
};
</script>

<style lang="scss" scoped>
.footer {
  overflow-x: hidden;
}
// .my-swipe {
//   width: 7.5rem;
//   height: 4.62rem;
//   position: relative;
//   padding-top: 0.6rem;
// }
.my-swipe-sGift {
  height: 3.8rem;
  position: relative;
  .vipTips {
    padding: 0 0.4rem;
    font-size: 0.26rem;
  }
  .vipBox {
    // height: 2.6rem;
    overflow: hidden;
  }

  .vipItem::-webkit-scrollbar {
    display: none;
  }
}
.van-swipe {
  overflow: visible !important ;
}
.van-swipe-item {
  background: orange;
  color: red;
  height: 100%;
}
.pre,
.next {
  display: block;
  width: 1rem;
  height: 1rem;
  background: green;
}
</style>