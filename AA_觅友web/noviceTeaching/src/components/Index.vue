<template>
  <div class="page pageIndex">
    <div class="slice slice1">
      <div class="title">
        <i class="number"></i>
        <strong>真人社交 滑動選擇</strong>
      </div>
      <div class="msgCon">
        <p>配對頁面可查看用戶訊息，左滑無感，右滑喜歡，相互喜歡就可以馬上開始聊天</p>
        <p>搭訕頁面可以對感興趣的推薦用戶發起聊天，也可以查看同城用戶</p>
      </div>
    </div>
    <div class="slice slice2">
      <div class="title">
        <i class="number"></i>
        <strong>加入派對一起嗨</strong>
      </div>
      <div class="msgCon">
        <p>派對頁面可以直接進入熱門語聊房，和其他用戶一起搶唱或者交友，也可以通過上方的banner參與各種活動</p>
        <p>我的頁面可訪問最近進入過的語聊房或者收藏的房間</p>
      </div>
    </div>
    <div class="slice slice3">
      <div class="title">
        <i class="number"></i>
        <strong>推薦動態滑不停</strong>
      </div>
      <div class="msgCon">
        <p>發現頁可以發佈語音、文字和圖片動態，也可以查看追蹤的好友動態，推薦用戶動態和聲音動態，喜歡可按贊和評論或者發起聊天</p>
      </div>
    </div>
    <div class="slice slice4">
      <div class="title">
        <i class="number"></i>
        <strong>收到訊息快查看</strong>
      </div>
      <div class="msgCon">
        <p>訊息頁可查看收取到的訊息，也可以查詢添加好友，查看好友列表，私訊好友</p>
      </div>
    </div>
    <div class="slice slice5">
      <div class="title">
        <i class="number"></i>
        <strong>個人資料全在這</strong>
      </div>
      <div class="msgCon">
        <p>我的頁面可以查看自己的個人資料，獲得的收益和禮物，參與活動的進度等</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.pageIndex {
  background: #7A68F8 url(../img/bg.png);
  background-size: 100% auto;
  .slice {
    position: relative;
  }
  .title {
    position: relative;
    strong {
      font-size: 0.4rem;
      font-weight: bold;
      position: relative;
      z-index: 2;
    }
  }
  .slice1 {
    height: 13.15rem;
    padding-top: 1.48rem;
    .title {
      padding-left: 0.43rem;
      position: relative;
      .number {
        content: '';
        display: block;
        width: 0.61rem;
        height: 0.52rem;
        background: url(../img/1.png);
        background-size: 100% 100%;
        position: absolute;
        top: -0.36rem;
        left: 0.46rem;
      }
    }
    .msgCon {
      width: 3.16rem;
      margin: 0.67rem 0 0 0.48rem;
      p {
        font-size: 0.26rem;
        line-height: 0.48rem;
        margin-bottom: 0.3rem;
      }
    }
  }
  .slice2 {
    height: 13.78rem;
    padding-top: 0.53rem;
    text-align: right;
    .title {
      padding-right: 0.43rem;
      position: relative;
      .number {
        content: '';
        display: block;
        width: 0.73rem;
        height: 0.52rem;
        background: url(../img/2.png);
        background-size: 100% 100%;
        position: absolute;
        top: -0.36rem;
        right: 0.46rem;
      }
    }
    .msgCon {
      width: 3.16rem;
      margin: 0.67rem 0 0 3.92rem;
      p {
        font-size: 0.26rem;
        line-height: 0.48rem;
        margin-bottom: 0.3rem;
      }
    }
  }
  .slice3 {
    height: 16.26rem;
    padding-top: 2.09rem;
    .title {
      padding-left: 0.43rem;
      position: relative;
      .number {
        content: '';
        display: block;
        width: 0.74rem;
        height: 0.52rem;
        background: url(../img/3.png);
        background-size: 100% 100%;
        position: absolute;
        top: -0.36rem;
        left: 0.46rem;
      }
    }
    .msgCon {
      width: 3.16rem;
      margin: 0.67rem 0 0 0.48rem;
      p {
        font-size: 0.26rem;
        line-height: 0.48rem;
        margin-bottom: 0.3rem;
      }
    }
  }
  .slice4 {
    height: 4.65rem;
    padding-top: 4.7rem;
    text-align: right;
    .title {
      padding-right: 0.43rem;
      position: relative;
      .number {
        content: '';
        display: block;
        width: 0.73rem;
        height: 0.52rem;
        background: url(../img/4.png);
        background-size: 100% 100%;
        position: absolute;
        top: -0.36rem;
        right: 0.46rem;
      }
    }
    .msgCon {
      width: 3.16rem;
      margin: 0.67rem 0 0 3.92rem;
      p {
        font-size: 0.26rem;
        line-height: 0.48rem;
        margin-bottom: 0.3rem;
        text-align: right;
      }
    }
  }
  .slice5 {
    height: 12rem;
    padding-top: 1.87rem;
    .title {
      position: relative;
      text-align: center;
      .number {
        content: '';
        display: block;
        width: 0.73rem;
        height: 0.52rem;
        background: url(../img/5.png);
        background-size: 100% 100%;
        position: absolute;
        top: -0.36rem;
        left: 3.38rem;
      }
    }
    .msgCon {
      width: 4.91rem;
      margin: 0.43rem auto 0;
      p {
        font-size: 0.26rem;
        line-height: 0.48rem;
        margin-bottom: 0.3rem;
        text-align: center;
      }
    }
  }
  img {
    display: block;
    width: 100%;
  }
}
</style>