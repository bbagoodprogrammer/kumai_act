<template>
  <div class="page pageIndex">
    <div class="app_top" :style="{background:'#F984BE',height:navigatorHeight}"></div>
    <p class="explain_tips1">
      心動交友共三個階段，男女嘉賓上麥各自介紹自己，根據主持人的指引，只有本輪在“心動選擇”階段有互選成功的用戶才會進入“告白祝福”階段
    </p>
    <div class="title1">
      CP戒指
    </div>
    <p class="explain_tips2">
      告白祝福階段中，心動值達到30萬時，將獎勵xxx戒指，並自動結成為CP關係，如雙方已是CP關係則新增對應戒指，
      <span>
        如仍一方已有CP則該獎勵無效
      </span>
    </p>
    <div class="ring">
      <div class="title">心動值達到{{Math.floor(heartbeatValueReward / 10000) }}萬</div>
      <div class="ring_tips">{{ringName}}</div>
      <img :src="ringImage" alt="" class="ringImg">
    </div>
    <div class="title1">
      牽手場景
    </div>
    <p class="explain_tips2">
      根據告白祝福階段達到的心動值，完成該階段後，將觸發牽手場景，心動值越高，牽手場景越浪漫
    </p>
    <div class="imgList">
      <div class="imgItem" v-for="(item,index) in imgList" :key="index">
        <img :src="item.img" alt="">
        <div class="nums"><i></i> {{svgaLevel[index]}}</div>
      </div>
    </div>
  </div>
</template>

<script>

import { getAppVer, getPlatform } from "../utils";
import { setFullScreen, getStatusBarHeight } from '../utils/navigation';
import { getInitInfo } from "../apis"
export default {
  data () {
    return {
      navigatorHeight: 0,
      heartbeatValueReward: '',
      ringImage: '',
      ringName: '',
      svgaLevel: ''
    }
  },
  computed: {
    imgList () {
      return this.lang.imgList
    }
  },
  created () {
    getInitInfo().then(res => {
      console.log(res)
      const { heartbeatValueReward, ringImage, ringName, svgaLevel } = res.data.response_data
      this.heartbeatValueReward = heartbeatValueReward
      this.ringImage = ringImage
      this.ringName = ringName
      this.svgaLevel = svgaLevel
    })
  },
  mounted () {
    const pt = getPlatform();
    const ver = getAppVer();
    if ((pt == 'ios' && ver >= 165) || pt == 'android') {
      setFullScreen(true);
      this.navigatorHeight = getStatusBarHeight() + 'px';
    }
  },
}
</script>

<style lang="scss">
.pageIndex {
  padding: 0.12rem 0.2rem 0.48rem;
  background: linear-gradient(59deg, #FD4CAF 0%, #F88BC0 100%);
  .explain_tips1,
  .explain_tips2 {
    font-size: 0.26rem;
    line-height: 0.46rem;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 0.46rem;
    padding: 0 0.14rem;
  }
  .explain_tips2 {
    margin-bottom: 0.1rem;
    span {
      display: block;
      color: rgba(255, 221, 39, 1);
    }
  }
  .ring {
    width: 6.5rem;
    height: 1.15rem;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 0.2rem;
    padding: 0.2rem;
    position: relative;
    .title {
      font-size: 0.28rem;
      font-weight: bold;
    }
    .ring_tips {
      font-size: 0.26rem;
      color: rgba(255, 255, 255, 0.6);
    }
    .ringImg {
      width: 1.2rem;
      height: 1.2rem;
      position: absolute;
      top: 0.18rem;
      right: 0.2rem;
    }
  }
  .title1 {
    width: 1.62rem;
    height: 0.53rem;
    background: url(../img/title_icon.png);
    background-size: 100% 100%;
    padding: 0.31rem 0 0 0.14rem;
    font-size: 0.32rem;
    font-weight: 600;
  }
  .imgList {
    margin-top: 0.08rem;
    .imgItem {
      width: 6.94rem;
      height: 1.59rem;
      margin-bottom: 0.08rem;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        position: absolute;
      }
      .nums {
        width: 1.1rem;
        height: 0.3rem;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 0 0.16rem 0 0.16rem;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.16rem;
        i {
          width: 0.16rem;
          height: 0.16rem;
          background: url(../img/hear.png);
          background-size: 100% 100%;
          margin-right: 0.03rem;
        }
      }
    }
    .imgItem:last-child {
      margin-bottom: 0;
    }
  }
  img {
    display: block;
    width: 100%;
  }
}
</style>