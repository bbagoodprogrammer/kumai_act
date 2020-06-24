<template>
  <div class="rule">
    <div class="header">
      <!-- <i class="black" @click="closeWeb()"></i>簽到規則說明 -->
    </div>
    <div class="tips">
      <h6>規則說明：</h6>
      <p>這裡展示你最近一次連續簽到的天數，如有斷簽，則重新計算</p>
      <p>連簽徽章，當連簽天數達到要求即可自動獲得，已獲得的徽章可在我的徽章查看並佩戴使用</p>
      <p>可花費金幣進行補簽，每次可補簽1天，每次補簽花費依次遞增，如第一次補一天花費100金幣，第二次補簽一天花費200金幣，如此類推。</p>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    document.title = `簽到規則說明`
  },
  methods: {
    closeWeb() {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      try {
        if (isAndroid) {
          window.JSInterface.closeWeb();
        } else {
          closeWeb();
        }
      } catch (e) {

      }
    }
  }
}
</script>

<style lang="scss">
body {
  background: #f2f2f2;
}
.rule {
  .header {
    height: 0.88rem;
    line-height: 0.88rem;
    // background: #fff;
    font-size: 0.36rem;
    text-align: center;
    position: relative;
    color: #111111;
    .black {
      display: block;
      width: 0.18rem;
      height: 0.32rem;
      background: url(../../assets/img/arr.png);
      background-size: 100% 100%;
      position: absolute;
      left: 0.28rem;
      top: 0.28rem;
    }
  }
  .tips {
    padding: 0.3rem;
    h6 {
      color: #111;
      font-size: 0.32rem;
    }
    p {
      font-size: 0.26rem;
      color: #666666;
      margin-top: 0.14rem;
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
