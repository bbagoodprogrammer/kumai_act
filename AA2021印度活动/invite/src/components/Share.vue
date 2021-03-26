<template>
  <div class="shareHtml">
    <div class="shareBar" @click="openApp()"></div>
    <div class="codeMsg">
      <div class="title">
        <i class="left"></i>
        <span>{{lang.shareHtml_tip1}}</span>
        <i class="right"></i>
      </div>
      <div class="tipsCode">
        <p>{{lang.shareHtml_tip2}} {{code}}</p>
        <p>{{lang.shareHtml_tip3}}</p>
      </div>
    </div>

  </div>
</template>

<script>
import { getUrlString } from "../utils"
import APP from "../utils/openApp"
export default {
  data () {
    return {
      code: ''
    }
  },
  created () {
    this.code = getUrlString('code') || 'xxxx'
  },
  methods: {
    openApp () {
      APP()
    }
  }
}
</script>

<style lang="scss">
.shareHtml {
  width: 7.5rem;
  height: 18.49rem;
  position: relative;
  .shareBar {
    width: 7.5rem;
    height: 1.14rem;
    position: fixed;
    top: 0;
  }
  .codeMsg {
    width: 100%;
    height: 1rem;
    position: absolute;
    top: 13.14rem;
    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 220, 127, 1);
      font-size: 0.34rem;
      i {
        width: 0.34rem;
        height: 0.34rem;
        background: url(../img/title_left.png);
        background-size: 100% 100%;
        &.right {
          background: url(../img/title_right.png);
          background-size: 100% 100%;
          margin-left: 0.28rem;
        }
        &.left {
          margin-right: 0.28rem;
        }
      }
    }
    .tipsCode {
      color: rgba(255, 220, 127, 1);
      text-align: center;
      p {
        font-size: 0.28rem;
      }
    }
  }
}
</style>