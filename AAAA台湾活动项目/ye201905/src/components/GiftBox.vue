<template>
  <div class="card">
    <div class="rotateBg"></div>
    <div class="cardRigth" v-show="activeIndex == 6"></div>
    <div class="cardLeft" v-show="activeIndex ==  0  "></div>
    <div class="buttomBg"></div>
    <div class="actStateTips">
      <span v-if="actStatus == 0">{{lang.wait}}</span>
      <span v-else-if="actStatus == 1">{{lang.actIng}}</span>
      <span v-else-if="actStatus == 2">{{lang.acted}}</span>
    </div>
    <timer></timer>
    <div class="cardItem">
      <swiper :options="swiperOption" class="swiper-no-swiping swpier" ref="mySwiper">
        <swiper-slide class="swiper-no-swiping" v-for="(item,index) in ward" :key="index">
          <div class="boxTitle">瓜分{{index}}級寶箱</div>
          <div class="imgBox">
            <img :src="require(`../assets/img/boxImg/${index}.png`)" alt="" :class="'box'+index">
          </div>
          <div class="boxScore">{{item.score}}</div>
          <div class="userScore">{{lang.familySo}} <em>{{box.score}}</em></div>
          <div class="boxGift">
            <div class="giftTitle">{{lang.boxWards}}</div>
            <div class="giftItem">
              <span v-for="(item2,index2) in item.giftItem" :key="index2">
                <div class="giftImgBox">
                  <img :src="require(`../assets/img/boxGift/${item2.type}.png`)" alt="">
                  <i>{{'x'+item2.num}}</i>
                </div>
                <strong class="name">{{item2.name}}</strong>
              </span>
            </div>
          </div>
        </swiper-slide>
      </swiper>
      <span class="pre" @click="pre()"></span>
      <span class="next" @click="go()"></span>
      <!-- <p class="boxTips" v-if="box.open_lv >= activeIndex+1">{{lang.carveUped}}</p> -->
      <p class="boxTips" v-if="box.is_max == 0">
        <em v-if="box.open_lv >= activeIndex+1">{{lang.carveUped}}</em>
        <em v-else>{{lang.carveUpTody}}</em>
      </p>
      <p class="boxTips" v-else>
        <em v-if="box.open_lv >= activeIndex+1">{{lang.carveUped}}</em>
        <em v-else-if="activeIndex+1>box.open_lv && activeIndex+1<=box.lv-1">{{lang.carveUpNo}}</em>
        <em v-else>{{lang.carveUpNoOpen}}</em>
      </p>
    </div>

  </div>

</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
// import downTime from '../utils/downTime.js'
import ward from '../config/ward'
import { mapState } from 'vuex'
import Timer from "./Timer"
export default {
  name: 'carrousel',
  data() {
    return {
      ward: ward,
      swiperOption: {
        // grabCursor: false,
        // observer: true,
        // observeParents: true,
        // notNextTick: true,
        // initialSlide: 5,
        //loopedSlides: 5,//在loop模式下使用slidesPerview:'auto',还需使用该参数设置所要用到的loop个数。
        slidesPerView: 'auto',//设置slider容器能够同时显示的slides数量(carousel模式)。另外，支持'auto'值，会根据容器container的宽度调整slides数目。
        effect: 'coverflow',//可以实现3D效果的轮播,
        centeredSlides: true,//设定为true时，active slide会居中，而不是默认状态下的居左。
        shadows: false,
        coverflowEffect: {
          rotate: 60,//slide做3d旋转时Y轴的旋转角度。默认50。
          stretch: 10,//每个slide之间的拉伸值，越大slide靠得越紧。 默认0。
          depth: 130,//slide的位置深度。值越大z轴距离越远，看起来越小。 默认100。
          modifier: 1,//depth和rotate和stretch的倍率，相当于depth*modifier、rotate*modifier、stretch*modifier，值越大这三个参数的效果越明显。默认1。
          slideShadows: false,//开启slide阴影。默认 true。
          shadow: false
        },

        // cubeEffect: {
        //   slideShadows: false, //开启slide阴影。默认 true。
        //   shadow: false, //开启投影。默认 true。
        //   shadowOffset: 100, //投影距离。默认 20，单位px。
        //   shadowScale: 0.6 //投影缩放比例。默认0.94。
        // },
        // flipEffect: {
        //   slideShadows: false, //slides的阴影。默认true。
        //   limitRotation: false, //限制最大旋转角度为180度，默认true。
        // }
      },
      activeIndex: 0
    }
  },
  components: {
    swiper,
    swiperSlide,
    Timer
  },
  // you can find current swiper instance object like this, while the notNextTick property value must be true
  // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
  computed: {
    ...mapState(['box', 'actStatus', 'second']),
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  watch: {
    box(val) {
      this.activeIndex = this.box.lv - 1
      this.swiper.slideTo(this.box.lv - 1, 0)  //swpier 索引從0開始
    }
  },
  mounted() {
    // you can use current swiper instance object to do something(swiper methods)
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    // console.log('this is current swiper instance object', this.swiper)
    // this.swiper.slideTo(3, 1000, false)

  },
  methods: {
    go() {
      this.activeIndex = this.swiper.activeIndex == 6 ? 6 : this.swiper.activeIndex + 1
      this.swiper.slideTo(this.activeIndex, 500, false)
    },
    pre() {
      this.activeIndex = this.swiper.activeIndex == 0 ? 0 : this.swiper.activeIndex - 1
      this.swiper.slideTo(this.activeIndex, 500, false)
    },
  }
}
</script>
<style lang="scss">
.card {
  position: relative;
  height: 7.3rem;
  // overflow: hidden;
  .rotateBg {
    width: 6.8rem;
    height: 6.74rem;
    background: url(../assets/img/rotateBg.png);
    background-size: 100% 100%;
    position: absolute;
    left: 0.35rem;
    top: 0.35rem;
    animation: rotateInfint 5s linear infinite;
  }
  .cardRigth {
    width: 0.76rem;
    height: 3.41rem;
    background: url(../assets/img/cardRigth.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    top: 1.97rem;
  }
  .cardLeft {
    width: 0.76rem;
    height: 3.41rem;
    background: url(../assets/img/cardLeft.png);
    background-size: 100% 100%;
    position: absolute;
    left: 0;
    top: 1.97rem;
  }
  .buttomBg {
    width: 7.5rem;
    height: 2.92rem;
    background: url(../assets/img/buttomBg.png);
    background-size: 100% 100%;
    position: absolute;
    top: 5.5rem;
  }
  .actStateTips {
    text-align: center;
    color: #ffdb7b;
    font-size: 0.26rem;
    font-weight: 600;
  }

  .cardItem {
    position: relative;
    .boxTitle {
      height: 0.5rem;
      font-weight: 600;
      color: #582a0e;
      text-align: center;
      font-size: 86%;
      margin-top: 0.16rem;
    }
    .imgBox {
      height: 2.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      img {
        display: block;
        &.box1 {
          width: 1.93rem;
          height: 1.54rem;
        }
        &.box2 {
          width: 1.98rem;
          height: 1.57rem;
        }
        &.box3 {
          width: 1.93rem;
          height: 1.84rem;
        }
        &.box4 {
          width: 2.05rem;
          height: 1.98rem;
        }
        &.box5 {
          width: 2.19rem;
          height: 1.99rem;
        }
        &.box6 {
          width: 2.21rem;
          height: 2.02rem;
        }
        &.box7 {
          width: 2.31rem;
          height: 2.57rem;
        }
      }
    }
    .boxScore {
      width: 1.74rem;
      height: 0.42rem;
      text-align: center;
      line-height: 0.45rem;
      font-weight: 700;
      background: url(../assets/img/boxScoreBg.png);
      background-size: 100% 100%;
      margin: -0.2rem auto 0;
      position: relative;
      z-index: 10;
    }
    .userScore {
      text-align: center;
      font-weight: 600;
      margin-top: 0.07rem;
      color: #fff0c4;
      font-size: 0.26rem;
      em {
        font-size: 0.26rem;
      }
    }
    .boxGift {
      .giftTitle {
        font-size: 71%;
        color: #5e3613;
        text-align: center;
        margin: 0.12rem auto 0.06rem;
        font-weight: 600;
      }
      .giftItem {
        display: flex;
        justify-content: space-between;
        padding: 0 0.44rem;
        span {
          width: 25%;
          .giftImgBox {
            position: relative;
            width: 0.75rem;
            height: 0.75rem;
            margin: 0 auto;
            img {
              width: 0.75rem;
              height: 0.75rem;
            }
            i {
              width: 0.42rem;
              height: 0.24rem;
              background: linear-gradient(
                -37deg,
                rgba(255, 171, 52, 1),
                rgba(255, 243, 104, 1),
                rgba(163, 104, 0, 1),
                rgba(255, 237, 174, 1)
              );
              border-radius: 0.1rem 0 0.1rem;
              position: absolute;
              bottom: 0;
              right: 0;
              font-size: 70%;
              color: #5e3613;
              line-height: 0.28rem;
              text-align: center;
            }
          }
          .name {
            display: block;
            width: 105%;
            font-size: 66%;
            color: #5e3613;
            text-align: center;
            margin-top: 0.05rem;
            line-height: 0.23rem;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
    .boxTips {
      text-align: center;
      margin: 0.13rem auto 0;
      font-size: 0.28rem;
      font-weight: 700;
      color: #ffdb7b;
    }
    .pre {
      display: block;
      width: 0.9rem;
      height: 0.9rem;
      background: url(../assets/img/pre.png);
      background-size: 100% 100%;
      position: absolute;
      left: 0.31rem;
      top: 50%;
      transform: translate(0, -50%);
      z-index: 10;
    }
    .next {
      display: block;
      width: 0.9rem;
      height: 0.9rem;
      background: url(../assets/img/next.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0.31rem;
      top: 50%;
      transform: translate(0, -50%);
      z-index: 10;
    }
  }
}

.swiper-container {
  overflow: visible !important;
}
.swpier {
  width: 4.62rem;
  height: 5.73rem;
  box-shadow: none !important;
  .swiper-slide {
    background: url(../assets/img/carItemBg.png);
    background-size: 100% 100%;
    // backface-visibility: hidden !important;
    // background-color: rgba(256, 256, 256, 0);
  }
  .swiper-button-prev {
  }
  .swiper-button-next {
  }
}
.swpier::-webkit-scrollbar {
  width: 0rem !important;
}
.swiper-wrapper {
  display: flex;
}
.swiper-pagination {
  margin-top: 2rem;
}
.swiper-button-prev {
}
</style>