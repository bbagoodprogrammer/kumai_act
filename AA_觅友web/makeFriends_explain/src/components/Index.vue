<template>
  <div class="page pageIndex">
    <!-- <div class="app_top" :style="{background:'#F984BE',height:navigatorHeight}"></div> -->
    <div class="html_title">
      {{lang.title}}
    </div>
    <p class="explain_tips1">
      {{lang.explain_tips1}}
    </p>
    <div class="title1">
      {{lang.title1}}
    </div>
    <p class="explain_tips2">
      <!-- 告白祝福階段中，心動值達到{{Math.floor(heartbeatValueReward / 10000) }}萬時，將獎勵{{ringName}}戒指，並自動結成為CP關係，如雙方已是CP關係則新增對應戒指， -->
      {{lang.explain_tips2.replace('$',Math.floor(heartbeatValueReward / 10000)).replace('%',ringName)}}
      <span>
        {{lang.explain_tips3}}
      </span>
    </p>
    <div class="ring">
      <div class="title" v-html="lang.ring_title.replace('$',Math.floor(heartbeatValueReward))"></div>
      <div class="ring_tips">{{ringName}}</div>
      <img :src="ringImage" alt="" class="ringImg">
    </div>
    <div class="title1">
      {{lang.ring_title2}}
    </div>
    <p class="explain_tips2">
      {{lang.explain_tips4}}
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
  //   background: linear-gradient(59deg, #FD4CAF 0%, #F88BC0 100%);
  background: #FD4CAF url(../img/bg.png) no-repeat;
  background-size: 100% auto;
  border-radius: 0.3rem 0.3rem 0 0;
  overflow: hidden;
  .html_title {
    font-size: 0.36rem;
    font-weight: bold;
    height: 0.88rem;
    line-height: 0.88rem;
    text-align: center;
  }
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
    background: rgba(255, 255, 255, 0.3);
    border-radius: 0.2rem;
    padding: 0.2rem;
    position: relative;
    .title {
      font-size: 0.28rem;
      font-weight: bold;
      display: flex;
      align-items: center;
      i {
        width: 0.16rem;
        height: 0.16rem;
        background: url(../img/hear.png);
        background-size: 100% 100%;
        margin: 0 0.08rem;
      }
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
    white-space: nowrap;
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