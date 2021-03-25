<template>
  <div class="skill_con">
    <div class="skill_header"></div>
    <div class="title title1"></div>
    <img :src="lang.people_img1" alt="" class="pimg1">
    <img :src="lang.people_img2" alt="" class="pimg2">
    <h5 class="mt1"><i></i>{{lang.groupLive_p1}} <i></i></h5>
    <h5><i></i>{{lang.groupLive_p2}} <i></i></h5>
    <div class="imgGroup">
      <span class="people" :class="'people' +item" v-for="(item,index) in lang.group1_img" :key="index">
        <img :src="item" alt="">
      </span>
    </div>
    <h5 class="mt2"><i></i> {{lang.groupLive_p3}} <i></i></h5>
    <h5><i></i>{{lang.groupLive_p4}} <i></i></h5>
    <div class="imgGroup">
      <span class="people" :class="'people' +item" v-for="(item,index) in lang.group2_img" :key="index">
        <img :src="item" alt="">
      </span>
    </div>
    <h5 class="mt3"><i></i>{{lang.groupLive_p5}} <i></i></h5>
    <h5><i></i>{{lang.groupLive_p6}} <i></i></h5>
    <h5><i></i>{{lang.groupLive_p7}} <i></i></h5>
    <div class="title title2 mt4"></div>
    <h5><i></i>{{lang.groupLive_p8}} <i></i></h5>
    <h5><i></i>{{lang.groupLive_p9}} <i></i></h5>
    <div class="imgGroup pd">
      <span class="people" :class="'people' +item" v-for="(item,index) in lang.group3_img" :key="index">
        <img :src="item" alt="">
      </span>
    </div>
    <h5 class="mt5"><i></i> {{lang.groupLive_p10}} <i></i></h5>
    <h5><i></i>{{lang.groupLive_p11}} <i></i></h5>
    <div class="imgGroup pd">
      <span class="people" :class="'people' +item" v-for="(item,index) in lang.group4_img" :key="index">
        <img :src="item" alt="">
      </span>
    </div>
    <h5 class="pd mt2"><i></i>{{lang.groupLive_p12}} <i></i></h5>
    <img :src="lang.people_img3" alt="" class="pimg3">
    <img :src="lang.people_img4" alt="" class="pimg4">
    <div class="border_tips">
      <div class="con">
        <h5>{{lang.groupLive_p13}} </h5>
        <p>{{lang.groupLive_p14}} </p>
      </div>
    </div>
    <div class="lastBottm">
      <!-- <div class="lastTips">

      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    // group1 () {
    //   return this.lang.group1
    // },
    // group2 () {
    //   return this.lang.group2
    // },
    // group3 () {
    //   return this.lang.group3
    // },
    // group4 () {
    //   return this.lang.group4
    // }
  }
}
</script>
<style lang="scss">
body {
  background: RGBA(114, 0, 201, 1);
}
.skill_con {
  height: 34.5rem;

  img {
    display: block;
    margin: 0 auto;
  }
  .pimg1 {
    width: 5.78rem;
    height: 2.21rem;
  }
  .pimg2 {
    width: 5.78rem;
    height: 3.15rem;
    margin-top: 0.13rem;
  }
  .pimg3,
  .pimg4 {
    width: 5.8rem;
    height: 1.65rem;
    margin-top: 0.2rem;
  }
  .pimg4 {
    margin-top: 0.14rem;
  }
  .people {
    img {
      width: 1.76rem;
      height: 1.76rem;
    }
  }
  .pd {
    padding: 0 0.5rem;
    i {
      margin-top: -0.3rem;
    }
  }
  .border_tips {
    width: 5.62rem;
    min-height: 2.52rem;
    background: #7F1BDA;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.4rem;
    .con {
      width: 4.75rem;
      height: 1.91rem;
      border: 0.03rem dotted RGBA(164, 94, 228, 0.46);
      color: #fff;
      padding: 0.22rem 0.36rem;
      h5,
      p {
        text-align: left;
        font-size: 0.26rem;
      }
      p {
        margin-top: 0.15rem;
        opacity: 0.7;
      }
    }
  }
  .imgGroup {
    &.pd {
      padding: 0 0.85rem !important;

      .people,
      img {
        width: 2.78rem;
        height: 2.78rem;
      }
    }
  }
  .mt1 {
    margin-top: 0.43rem !important;
  }
  .mt2 {
    margin-top: 0.6rem !important;
  }
  .mt3 {
    margin-top: 0.38rem !important;
  }
  .mt4 {
    margin-top: 0.83rem !important;
  }
  .mt5 {
    margin-top: 0.5rem !important;
  }
  .mt0 {
    margin-top: 0 !important;
  }
}
</style>
