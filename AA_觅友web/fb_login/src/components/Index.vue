<template>
  <div class="page pageIndex">
    <div class="init" v-if="type == 1">
      <img src="../img/fb_Img.png" alt="" class="fbImg">
      <h3>FB重新綁定</h3>
      <p>由於FB協議變更，部分用戶的FB賬號與uid已解綁，使用FB登入時，會創建全新的uid。</p>
      <p>出現FB登入到新uid的用戶，可通過此頁面找回舊uid，並重新綁定</p>
      <!-- <div class="fb-login-button" data-width="" data-size="large" data-button-type="continue_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="true"></div> -->
      <div class="loginBtn" @click="login()">找回uid</div>
      <p class="tips">*在成功找回舊賬號後，<br />當前登錄的新賬號將會被註銷</p>
      <p class="lastTips">為了你的賬戶安全，本鏈接請勿分享予他人</p>
    </div>
    <div class="type_2" v-else-if="type == 2">
      <div class="userMsg">
        <img v-lazy="" alt="" class="userAv">
        <div class="userNick">頂頂頂頂頂頂頂頂頂頂頂頂</div>
        <div class="userUid">uid 999999</div>
        <div class="binding" v-if="type== 2">
          <div class="go">重新綁定</div>
          <p class="tips">*重新綁定後，FB可登入舊有uid<br />已創建的新uid將註銷。請謹慎操作</p>
        </div>
        <div class="lockTips" v-else-if="type == 3">
          該賬戶已被綁定，<br />
          請聯繫uid10
        </div>
      </div>
      <div class="again">
        賬號錯了，重新找回
      </div>
    </div>
    <div id="status"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      type: 2,
      type_title: {
        1: '已找到原來綁定的uid',
        2: 'Facebook賬號找回',
        3: '未找到已綁定uid'
      }
    }
  },
  methods: {
    login () {
      FB.login(function (response) {
        console.log(response)
        // handle the response 
      });
    }
  }
}
</script>

<style lang="scss">
.pageIndex {
  .fbImg {
    width: 1.36rem;
    height: 1.36rem;
    margin: 1.67rem auto 0;
  }
  .loginBtn {
    width: 5rem;
    height: 0.88rem;
    background: linear-gradient(90deg, #7A68F8 0%, #9585FF 100%);
    border-radius: 0.44rem;
    text-align: center;
    line-height: 0.88rem;
    margin: 0.72rem auto 0;
  }
  .init {
    img {
      display: block;
      width: 100%;
    }
    h3 {
      height: 0.45rem;
      font-size: 0.32rem;
      font-weight: 600;
      line-height: 0.7rem;
      color: #2C2B36;
      text-align: center;
      margin: 0.4rem 0 0.24rem;
    }
    p {
      margin: 0 auto;
      width: 6.5rem;
      height: 0.8rem;
      font-size: 0.28rem;
      font-family: PingFang SC;
      line-height: 0.4rem;
      color: #2C2B36;
      text-align: center;
      margin-bottom: 0.2rem;
    }
    .tips {
      margin-top: 0.6rem;
      font-size: 0.28rem;
      color: rgba(255, 81, 85, 1);
      line-height: 0.4rem;
    }
    .lastTips {
      font-size: 0.26rem;
      color: rgba(188, 187, 199, 1);
      margin-top: 2.16rem;
    }
  }
  .type_2 {
    .userMsg {
      width: 6.7rem;
      height: 3.84rem;
      background: rgba(122, 104, 248, 0.04);
      border-radius: 0.3rem;
      margin: 0.98rem auto 0;
      position: relative;
      padding-top: 1.14rem;
      .userAv {
        display: block;
        width: 1.48rem;
        height: 1.48rem;
        border-radius: 50%;
        position: absolute;
        left: 2.61rem;
        top: -0.5rem;
      }
      .userNick {
        max-width: 1.48rem;
        height: 0.45rem;
        font-size: 0.32rem;
        font-weight: 600;
        line-height: 0.48rem;
        color: #2C2B36;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 0 auto 0.02rem;
      }
      .userUid {
        width: 1.48rem;
        height: 0.33rem;
        font-size: 0.24rem;
        line-height: 0.48rem;
        color: #8C8995;
        margin: 0 auto;
      }
      .go {
        width: 3.3rem;
        height: 0.88rem;
        background: linear-gradient(90deg, #7A68F8 0%, #9585FF 100%);
        border-radius: 0.44rem;
        text-align: center;
        line-height: 0.88rem;
        margin: 0.56rem auto 0;
      }
      .tips {
        margin-top: 0.6rem;
        font-size: 0.28rem;
        color: rgba(255, 81, 85, 1);
        line-height: 0.4rem;
        text-align: center;
      }
    }

    .again {
      width: 5rem;
      height: 0.8rem;
      background: rgba(122, 104, 248, 0.06);
      border-radius: 0.44rem;
      color: rgba(122, 104, 248, 1);
      text-align: center;
      line-height: 0.8rem;
      font-size: 0.28rem;
      margin: 4.5rem auto 0;
    }
  }
  .status {
    position: absolute;
    left: -10000rem;
  }
}
</style>