<template>
  <div class="shareCon">
    <div class="down" v-if="!isSingNow" @click="downApp()">
      <!-- <span @click="downApp()">{{lang.share1}} </span> -->
    </div>
    <div class="con">
      <p class="tips1">{{lang.share2}}</p>
      <div class="code">
        <div class="title">{{lang.shareCode}}</div>
        <input type="text" name="" id="" v-model="code" readonly class="co">
        <span class="copy">{{lang.shareCode2}}</span>
      </div>
      <h6> <i class="left"></i> {{lang.share3}}<i class="right"></i></h6>
      <img src="../assets/img/tuleImg/1.png" alt="" class="img1">
      <img src="../assets/img/tuleImg/2.png" alt="" class="img2">
      <img src="../assets/img/tuleImg/3.png" alt="" class="img3">
      <img src="../assets/img/tuleImg/4.png" alt="" class="img4">
      <span class="downApp" @click="downApp()" v-if="!isSingNow">{{lang.share4}}</span>
    </div>
  </div>
</template>

<script>
import APP from "../utils/openApp"
import getString from "../utils/getString"
export default {
  data() {
    return {
      code: '',
      copyTru: false,
      isSingNow: false
    }
  },
  created() {
    var ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
    var ua = navigator.userAgent;
    this.code = getString('code')
  },
  mounted() {
    this.isSingNow = navigator.userAgent.indexOf('singnow') >= 0;
  },
  methods: {
    downApp() {
      APP()
    },
    copyCode(str) {
      var save = function (e) {
        e.clipboardData.setData('text/plain', str);
        e.preventDefault();
      };
      document.addEventListener('copy', save);
      document.execCommand('copy');
      document.removeEventListener('copy', save);
      this.copyTru = true
    }
  }
}
</script>

<style lang="scss" scoped>
.shareCon {
  .down {
    height: 1.25rem;
    background: url(../assets/img/share_bar.png);
    background-size: 100% 100%;
    position: relative;
    // span {
    //   display: block;
    //   width: 2.43rem;
    //   height: 0.8rem;
    //   background: url(../assets/img/goVip.png);
    //   background-size: 100% 100%;
    //   text-align: center;
    //   line-height: 0.8rem;
    //   color: #c36220;
    //   font-weight: bold;
    //   font-size: 0.26rem;
    //   position: absolute;
    //   right: 0.2rem;
    //   top: 0.23rem;
    // }
  }
  .con {
    padding: 0.69rem 0.48rem 0;
  }
  .tips1 {
    color: #d3fffa;
    font-size: 0.28rem;
  }
  .code {
    width: 6.21rem;
    height: 3.13rem;
    background: url(../assets/img/codeBg.png);
    background-size: 100% 100%;
    margin: 0.42rem auto 0;
    text-align: center;
    .title {
      height: 1.3rem;
      line-height: 1.3rem;
      font-size: 0.26rem;
      text-align: center;
    }
    .co {
      width: 2.75rem;
      height: 0.81rem;
      font-size: 0.48rem;
      background: rgba(196, 39, 131, 1);
      border-radius: 0.2rem;
      font-weight: bold;
      text-align: center;
      outline: none;
      border: none;
      color: #fff;
    }
    .copy {
      display: block;
      color: #ffdea3;
      text-align: center;
      margin: 0.15rem auto 0;
      font-size: 0.22rem;
    }
    em {
      color: #ffdea3;
      font-size: 0.21rem;
    }
  }
  h6 {
    font-size: 0.36rem;
    color: #87edff;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.92rem;
    .left {
      display: block;
      width: 1.01rem;
      height: 0.27rem;
      background: url(../assets/img/left.png);
      background-size: 100% 100%;
      margin-right: 0.25rem;
    }
    .right {
      display: block;
      width: 1.01rem;
      height: 0.27rem;
      background: url(../assets/img/right.png);
      background-size: 100% 100%;
      margin-left: 0.25rem;
    }
  }
  .img1,
  .img2,
  .img3,
  .img4 {
    width: 6.38rem;
    height: 3.38rem;
  }
  .downApp {
    display: block;
    width: 2.43rem;
    height: 0.8rem;
    background: url(../assets/img/goVip.png);
    background-size: 100% 100%;
    text-align: center;
    line-height: 0.8rem;
    color: #ae4800;
    font-weight: bold;
    font-size: 0.26rem;
    margin: 0.51rem auto;
  }
}
</style>