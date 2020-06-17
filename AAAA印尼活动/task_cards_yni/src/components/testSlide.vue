<template>
  <div class="boxGift">
    <swiper :options="swiperOption" class="swiper" ref="mySwiper" v-if="5">
      <!-- open:index %2 != 0, -->
      <swiper-slide v-for="(item,index) in cardItem" :key="index" :class="{active:item.open}">
        <!-- <img src="../assets/img/carItemBg.png" alt=""> -->
        <div class="inner">
          <div class="front">
            <img src="../assets/img/carItemBg.png" alt="">
          </div>
          <div class="back">
            <img :src="require(`../assets/img/${index}.png`)" alt="">
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <span class="openSpan" @click="changAct(0)"></span>
    <span class="openSpan" @click="changAct2(0)"></span>
  </div>

</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { setTimeout } from 'timers';
export default {
  name: 'carrousel',
  data() {
    return {
      cardItem: [
        {
          className: '1',
          obj: { open: false }
        },
        {
          className: '2',
          open: false
        },
        {
          className: '3',
          open: false
        },
        {
          className: '4',
          open: false
        },
        {
          className: '5',
          open: false
        }
      ],
      act: -1,
      swiperOption: {
        // init: false,
        // grabCursor: false,
        // observer: true,
        // observeParents: true,
        //notNextTick: false,
        //initialSlide :1,
        disableOnInteraction: false,
        //autoplay: true,//自动滑动
        speed: 300,//自动滑动开始到结束的时间（单位ms）
        loop: false,//开启循环
        loopedSlides: 5,//在loop模式下使用slidesPerview:'auto',还需使用该参数设置所要用到的loop个数。
        slidesPerView: 2.33,//设置slider容器能够同时显示的slides数量(carousel模式)。另外，支持'auto'值，会根据容器container的宽度调整slides数目。
        // autoplay: {
        //   delay: 1500,
        //   stopOnLastSlide: false,
        //   disableOnInteraction: false
        // },
        // observer: true,
        // observeParents: true,
        effect: 'coverflow',//可以实现3D效果的轮播,
        centeredSlides: true,//设定为true时，active slide会居中，而不是默认状态下的居左。
        coverflowEffect: {
          rotate: 0,//slide做3d旋转时Y轴的旋转角度。默认50。
          stretch: 77,//每个slide之间的拉伸值，越大slide靠得越紧。 默认0。
          depth: 200,//slide的位置深度。值越大z轴距离越远，看起来越小。 默认100。
          modifier: 1,//depth和rotate和stretch的倍率，相当于depth*modifier、rotate*modifier、stretch*modifier，值越大这三个参数的效果越明显。默认1。
          slideShadows: false,//开启slide阴影。默认 true。
        },
      },
    }
  }, components: {
    swiper,
    swiperSlide
  },
  // you can find current swiper instance object like this, while the notNextTick property value must be true
  // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted() {
    // you can use current swiper instance object to do something(swiper methods)
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    // console.log('this is current swiper instance object', this.swiper)
    // this.swiper.slideTo(3, 1000, false)
  },
  methods: {
    changAct(val) {
      this.swiper.autoplay.stop()
      this.act = this.swiper.realIndex
      this.$set(this.cardItem[val], true)
      for (let i = 0; i < this.swiper.slides.length; i++) {
        if (this.swiper.slides[i].getAttribute('data-swiper-slide-index') == this.act) {
          this.swiper.slides[i].classList.add("active")
        }
      }
      this.swiper.update(true)
      this.swiper.init()
      setTimeout(() => {
        this.swiper.autoplay.start()
      }, 0)
    },
    changAct2(val) {

    }
  }
}
</script>
<style lang="scss">
* {
  touch-action: none;
}
.openSpan {
  display: block;
  width: 1rem;
  height: 1rem;
  background: red;
}
// .swiper-container {
//   overflow: visible !important;
// }
.swiper {
  width: 7rem;
  height: 4.2rem;
  margin: 0 auto;
  overflow: hidden;
  .swiper-slide {
    // background: url(../assets/img/carItemBg.png);
    // background-size: 100% 100%;
    // backface-visibility: hidden !important;
    // background-color: rgba(256, 256, 256, 0);
    perspective: 1000px;
    -webkit-perspective: 1000px;
    img {
      width: 100%;
      height: 4.2rem;
      position: absolute;
    }
    .black {
      width: 100%;
      height: 100%;
      background: #ccc;
      position: absolute;
      z-index: 1;
    }
    .inner {
      position: relative;
      width: 100%;
      height: 4.2rem;
      transition: transform 0.2s;
      transform-style: preserve-3d;
      -webkit-transform-style: preserve-3d;
      -webkit-transition: transform 0.2s;
      /* Safari and Chrome */
      .back {
        transform: rotateY(180deg);
      }
    }
    .inner > div {
      width: 100%;
      height: 100%;
      position: absolute;
      backface-visibility: hidden;
    }
    &.open {
      .back {
        transform: rotateY(0deg);
      }
      .front {
        transform: rotateY(180deg);
      }
    }
    &.active {
      .inner {
        transform: rotateY(180deg);
      }
    }
  }
  .swiper-button-prev {
  }
  .swiper-button-next {
  }
}
.swpier::-webkit-scrollbar {
  width: 0rem !important;
}
// .swiper-wrapper {
//   display: flex;
// }
// .swiper-pagination {
//   margin-top: 2rem;
// }
.swiper-button-prev {
}
</style>