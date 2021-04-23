<template>
  <div class="tips">
    <div class="app_top" :style="{height:navigatorHeight}"></div>
    <h3>01</h3>
    <h6>{{lang.h6_1}}</h6>
    <p>{{lang.p_1}}</p>
    <h3 class="mt">02</h3>
    <h6>{{lang.h6_2}}</h6>
    <p>{{lang.p_1}}</p>
    <p class="mt2">{{lang.p_2}}</p>
    <p>{{lang.p_3}}</p>
    <p class="mt2">{{lang.p_4}}</p>
    <p>{{lang.p_5}}</p>
    <p class="mt2">{{lang.p_6}}</p>
    <p>{{lang.p_7}}</p>
    <p class="mt2">{{lang.p_8}}</p>
    <p>{{lang.p_9}}</p>
    <p class="mt2">{{lang.p_10}}</p>
    <p>{{lang.p_11}}</p>
    <p class="mt2">{{lang.p_12}}</p>
    <p>{{lang.p_13}}</p>
    <h3 class="mt">03</h3>
    <h6>{{lang.h6_3}}</h6>
    <p>{{lang.p_14}}</p>
  </div>
</template>

<script>



import { getLangHtml, getTimeObj, getUrlString, getAppVer, getPlatform, getDeviceId } from "../utils";
import { setFullScreen, setStatusBarStyle, getStatusBarHeight, callAppNew } from '../utils/navigation';

export default {
  data () {
    return {
      navigatorHeight: 0,
    }
  },
  mounted () {
    setTimeout(() => {
      document.title = this.lang.tips_title
      const pt = getPlatform();
      const ver = getAppVer();
      if ((pt == 'ios' && ver >= 165) || pt == 'android') {
        setFullScreen(false);
      }
    }, 0)
  },

}
</script>

<style lang="scss">
body {
  background: #fff !important;
  .app_top {
    width: 100%;
    position: fixed;
    z-index: 5;
    &.app_top_fit {
      position: fixed;
      background-color: #10093C;
    }
  }
  .mt {
    margin-top: 1rem;
  }
  .mt2 {
    margin: 0.32rem 0 0.16rem 0;
  }
  .tips {
    padding: 0.5rem 0.3rem 1.9rem;
  }
  h3 {
    min-height: 0.7rem;
    font-size: 0.5rem;
    font-weight: 600;
    line-height: 0.52rem;
    color: #7A68F8;
  }
  h6 {
    min-height: 0.45rem;
    font-size: 0.32rem;
    font-family: PingFang SC;
    font-weight: 600;
    line-height: 0.52rem;
    color: #2C2B36;
    margin: 0.06rem 0 0.33rem;
  }
  p {
    font-size: 0.32rem;
    line-height: 0.52rem;
    color: #2C2B36;
  }
}
</style>