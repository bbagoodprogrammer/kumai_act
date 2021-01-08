<template>
  <div class="cover">
    <div class="imgItem">
      <div class="now">
        <i class='iconAdd'></i>
        <img :src="nowCover" alt="" v-if="nowCover">
        <span class="nowTips">當前封面</span>
      </div>
      <div class="rep">
        <i class='iconAdd'></i>
        <img :src="repCover" alt="" v-if="repCover">
        <span class="nowTips" v-if="repCover">審核中</span>
        <span class='change'><i class="icon"></i> 更改</span>
      </div>
    </div>
    <div class="tipList">
      <h3>直播封面圖</h3>
      <p>封面圖爲人工審核，請上傳本人面部清晰的照片請勿上傳暴露/低俗/包含邊框、相機水印的圖片儘量上傳真實，自然的自拍圖，更容易審核通過。</p>
    </div>
    <div class="nextBtn act" @click="upload()">上傳封面</div>
  </div>
</template>
<script>

import { getCover, uploadCover } from "../apis"
export default {
  data() {
    return {
      nowCover: "",
      repCover: "",
      upCover: ""
    }
  },
  created() {
    getCover().then(res => {
      if (res.data.response_data) {
        const { cover, cover_audit, reject_notice } = res.data.response_data
        this.nowCover = cover
        this.repCover = cover_audit
        if (reject_notice) {
          this.toast(`上次提交的封面圖不符合要求，未能審核通過，請重新上傳`)
        }
      } else {
        this.toast(res.data.response_status.error)
      }
    })
  },
  methods: {
    upload() {
      if (!this.upCover) {
        this.toast(`封面上傳中，審核通過後生效`)
        uploadCover(this.upCover).then(res => {
          if (res.data.response_data) {
            this.toast(`上傳成功`)
            this.repCover = this.upCover
          } else {
            this.toast(res.data.response_status.error)
          }
        })
      } else {
        this.toast(`請選擇需要更改的封面！`)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.imgItem {
  margin: 0.47rem auto 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.6rem;
  .now,
  .rep {
    width: 3rem;
    height: 3rem;
    border-radius: 0.08rem;
    overflow: hidden;
    position: relative;
    background: url(../img/coverBg.png);
    background-size: 100% 100%;
    .iconAdd {
      display: block;
      width: 0.6rem;
      height: 0.6rem;
      position: absolute;
      left: 1.2rem;
      top: 1.2rem;
      background: url(../img/addIcon.png);
      background-size: 100% 100%;
    }
    img {
      width: 100%;
      height: 100%;
      position: absolute;
    }
    .nowTips {
      position: absolute;
      bottom: 0;
      z-index: 2;
      width: 100%;
      height: 0.5rem;
      text-align: center;
      line-height: 0.5rem;
      font-size: 0.32rem;
      color: rgba(255, 255, 255, 1);
    }
    .change {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 0.96rem;
      height: 0.4rem;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 1rem;
      position: absolute;
      right: 0.2rem;
      top: 0.2rem;
      z-index: 3;
      color: #fff;
      font-size: 0.2rem;
      i {
        width: 0.2rem;
        height: 0.2rem;
        background: url(../img/rotate.png);
        background-size: 100% 100%;
        margin-right: 0.04rem;
      }
    }
  }
}
.tipList {
  margin-top: 0.48rem;
  padding: 0 0.48rem;
  h3 {
    font-size: 0.28rem;
    color: rgba(51, 51, 51, 1);
  }
  p {
    color: rgba(153, 153, 153, 1);
    font-size: 0.26rem;
    line-height: 0.46rem;
  }
}
.nextBtn {
  width: 6.4rem;
  height: 0.86rem;
  text-align: center;
  line-height: 0.86rem;
  border-radius: 0.43rem;
  margin: 1.2rem auto 0;
  background: RGBA(216, 216, 216, 1);
  color: #fff;
  font-size: 0.32rem;
  font-weight: 500;
  &.act {
    background: linear-gradient(313deg, #fc0274 0%, #fc5228 100%);
  }
}
</style>
