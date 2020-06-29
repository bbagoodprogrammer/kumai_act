<template>
  <div class="rule">
    <div class="header">
      <!-- <i class="black" @click="closeWeb()"></i>簽到規則說明 -->
    </div>
    <div class="tips">
      <h6>規則說明：</h6>
      <p>1、所有用戶均可參與簽到活動</p>
      <p>2、同一帳號每個自然天可簽到一次，並累積連簽天數。</p>
      <p>3、簽到以7天爲一個周期，斷簽或簽到滿7天後，將重新進入新的周期。</p>
      <p>4、每次簽到即可獲得固定獎勵與額外獎勵，其中固定獎勵爲金豆獎勵，額外獎勵爲翻牌獎勵（第一天至第六天）和寶箱獎勵（第七天），金牌與寶箱有機會獲得驚喜大禮。</p>
      <p>5、每天簽到可翻牌一次，如果完成分享任務，還可再翻牌一次，周期第7天除外。</p>
      <p>6、補簽僅支持補總連簽天數，不影響簽到周期。</p>
      <p>7、簽到活動期間，用戶如果違反誠實信用原則或出現違規行爲（如作弊領取、惡意套取、多帳號互刷等），平台一經發現將封號處理，並有權收回獎勵。</p>
      <p>8、凡參加簽到活動者，即視爲接受活動所有規則，並遵循平台相關法律聲明以及規定，平台有權在法律允許的範圍內對活動規則作出適當調整。</p>
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
