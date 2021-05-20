<template>
  <div class="page pageIndex">
    <div class="default_type" v-if="type==1">
      <div class="sex_default_img" :class="{woman:sex == 1}"></div>
      <h3 class="tips_title">通過真人認證，更受歡迎</h3>
      <div class="tips">
        <div class="tips_item" v-for="(item,index) in img_tipsArr" :key="index">
          <i>{{index+1}}</i>
          <span>{{item}}</span>
        </div>
      </div>
      <div class="photograph">
        拍照認證
      </div>
    </div>
    <div class="has_img" v-else-if="type == 2">
      <div class="img_change">
        <div class="nowImg">
          <img src="" alt="">
          <span class="img_tips">當前頭像 <i></i></span>
        </div>
        <div class="changImg">
          <img src="" alt="">
          <span class="img_tips">認證照片<i></i></span>
        </div>
      </div>
      <div class="chang_title">
        請確認當前頭像與認證照片是你本人，否
        則將無法通過認證
      </div>
      <div class="commit">提交</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sex: 0,
      type: 2,
      img_tipsArr: [
        '請模仿示意圖拍攝認證照片；',
        '真人認證照片需和頭像保持一致，否則無效；',
        '通過認證後，聊天粉鑽收益翻倍；',
        '拍攝照片僅作認證審核作用，官方將嚴格保密；'
      ]
    }
  }
}
</script>

<style lang="scss">
.pageIndex {
  .default_type {
    padding-top: 0.6rem;
    .tips_title {
      min-height: 0.5rem;
      font-size: 0.36rem;
      font-weight: bold;
      color: #2C2B36;
      text-align: center;
      margin: 0.6rem auto 0.3rem;
    }
    .tips {
      padding: 0 0.3rem;
      color: rgba(114, 88, 254, 1);
      font-size: 0.26rem;
      .tips_item {
        display: flex;
        align-items: center;
        margin-bottom: 0.1rem;
        i {
          width: 0.3rem;
          height: 0.3rem;
          line-height: 0.29rem;
          background: url(../img/num_tips.png);
          background-size: 100% 100%;
          text-align: center;
          color: #fff;
          font-size: 0.24rem;
          margin-right: 0.1rem;
        }
      }
    }
    .photograph {
      width: 5rem;
      height: 0.88rem;
      background: linear-gradient(90deg, #7A68F8 0%, #9585FF 100%);
      box-shadow: 0 0.05rem 0.16rem rgba(122, 104, 248, 0.25);
      border-radius: 0.44rem;
      text-align: center;
      line-height: 0.88rem;
      font-size: 0.32rem;
      margin: 1.36rem auto 0;
    }
  }
  .has_img {
    padding-top: 1.23rem;
    .img_change {
      padding: 0 0.3rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      > div {
        width: 3.35rem;
        height: 4.36rem;
        border-radius: 0.2rem;
        overflow: hidden;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
        .img_tips {
          padding: 0 0.26rem;
          height: 0.6rem;
          background: #BCBBC7;
          border-radius: 0 0.2rem 0 0.2rem;
          display: flex;
          font-size: 0.28rem;
          align-items: center;
          position: absolute;
          bottom: 0;
          left: 0;
          i {
            width: 0.42rem;
            height: 0.42rem;
            background: url(../img/change_icon.png);
            background-size: 100% 100%;
          }
        }
      }
      .changImg {
        .img_tips {
          background: linear-gradient(180deg, #18DEBF 0%, #1BE5E6 100%);
        }
      }
    }
    .chang_title {
      font-size: 0.36rem;
      font-weight: bold;
      line-height: 0.54rem;
      color: #2C2B36;
      text-align: center;
      padding: 0 0.51rem;
      margin: 1.17rem auto 0;
    }
    .commit {
      width: 5rem;
      height: 0.88rem;
      background: linear-gradient(90deg, #7A68F8 0%, #9585FF 100%);
      box-shadow: 0 0.05rem 0.16rem rgba(122, 104, 248, 0.25);
      border-radius: 0.44rem;
      text-align: center;
      line-height: 0.88rem;
      font-size: 0.32rem;
      margin: 2.9rem auto 0;
    }
  }
  img {
    display: block;
    width: 100%;
  }
}
</style>