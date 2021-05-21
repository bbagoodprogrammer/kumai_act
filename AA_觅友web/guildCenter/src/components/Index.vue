<template>
  <div class="page pageIndex">
    <div class="app_top" :style="{background:'rgba(16, 9, 60, 1)',height:navigatorHeight}"></div>
    <!-- <div class="top_bg"></div> -->
    <div class="tab" :style="{top:navigatorHeight}">
      <span class="tab1" :class="{act:type == 1}" @click="tabClick(1)">{{lang.tab1}}</span>
      <span class="tab2" :class="{act:type == 2}" @click="tabClick(2)">{{lang.tab2}}</span>
    </div>
    <div class="pangCon" :style="{paddingTop:navigatorHeight2}">
      <div class="guild_msg">
        <div class="guild">
          <span class="name">我的公會</span>
          <span class="id">ID 123445</span>
        </div>
        <div class="anchor_nums">
          主播數量：10
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { getLangHtml, getTimeObj, getUrlString, getAppVer, getPlatform, getDeviceId } from "../utils";
import { setFullScreen, setStatusBarStyle, getStatusBarHeight, callAppNew } from '../utils/navigation';
import { getInitInfo, getGift } from "../apis"
// import { Downloader, Parser, Player } from 'svga.lite'

// const downloader = new Downloader()
// const parser = new Parser({ disableWorker: true })


export default {
  data () {
    return {
      navigatorHeight: '20px',
      navigatorHeight2: '44px',
      type: 1,
    }
  },
  //   created () {

  //   },
  mounted () {
    setTimeout(() => {
      const pt = getPlatform();
      const ver = getAppVer();
      if ((pt == 'ios' && ver >= 165) || pt == 'android') {
        setFullScreen();
        // - document.getElementsByClassName('tab')[0].clientHeight
        this.navigatorHeight = getStatusBarHeight() - document.getElementsByClassName('tab')[0].clientHeight + 'px'; // 88為APPtitle高度
        this.navigatorHeight2 = getStatusBarHeight() * 1 + 20 + 'px';
      }
      this.init(1)
    }, 0)

  },
  computed: {
  },
  methods: {
    init (val) {
      //   getInitInfo(val).then(res => {
      //     if (res.data.response_data) {
      //       if (val == 1) {
      //         this.data1 = res.data.response_data
      //         // this.downloaderData(this.filderArr1)
      //       } else {
      //         this.loading = false
      //         this.data2 = res.data.response_data
      //         // this.downloaderData(this.filderArr2)
      //       }
      //     } else {
      //       this.toast(res.data.response_status.error)
      //     }
      //   })
    },
    tabClick (val) {
      this.type = val
      if (val == 2 && !this.loaded2) {
        this.loaded2 = true
        this.loading = true
        this.init(0)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
body {
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
}
.pageIndex {
  overflow-x: hidden;
  position: relative;
  background: #10093C;
  #10093C .app_top {
    width: 100%;
    position: fixed;
    z-index: 5;
    &.app_top_fit {
      position: fixed;
      background-color: #10093C;
    }
  }
  img {
    display: block;
    width: 100%;
  }
  .top_bg {
    width: 100%;
    overflow: hidden;
    height: 4.6rem;
    position: absolute;
    top: 0;
    z-index: -1;
  }
  .tab {
    width: 100%;
    height: 0.88rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    // top: 0;
    z-index: 5;
    background: #10093C;
    span {
      font-size: 0.36rem;
      position: relative;
      color: rgba(255, 255, 255, 0.6);
      &.act {
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
      }
      &.act::after {
        content: '';
        display: block;
        width: 0.28rem;
        height: 0.08rem;
        background: #fff;
        border-radius: 0.06rem;
        position: absolute;
        left: 40%;
        bottom: -0.1rem;
      }
    }
    .tab2 {
      margin-left: 0.6rem;
    }
  }
  .pangCon {
    .guild_msg {
      height: 0.88rem;
      padding: 0 0.3rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .guild {
        .name {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.28rem;
          position: relative;
        }
        .name::before {
          content: '';
          display: block;
          width: 1px;
          height: 0.18rem;
          background: rgba(255, 255, 255, 0.3);
          position: absolute;
          right: -0.1rem;
          top: 0.13rem;
        }
        .id {
          font-size: 0.24rem;
          color: rgba(255, 255, 255, 0.3);
          margin-left: 0.1rem;
        }
      }
      .anchor_nums {
        font-size: 0.24rem;
        color: rgba(140, 137, 149, 1);
      }
    }
  }
}
</style>