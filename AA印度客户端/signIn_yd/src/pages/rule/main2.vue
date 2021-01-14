<template>
  <div class="rule">
    <div class="header">
      <!-- <i class="black" @click="closeWeb()"></i>簽到規則說明 -->
    </div>
    <div class="tips">
      <h6>{{lang.rile_title2}}</h6>
      <p>{{lang.rile_p1}}</p>
      <p>{{lang.rile_p2}}</p>
      <p>{{lang.rile_p3}}</p>
      <p>{{lang.rile_p4}}</p>
      <p>{{lang.rile_p5}}</p>
      <p>{{lang.rile_p6}}</p>
      <p>{{lang.rile_p7}}</p>
      <p>{{lang.rile_p8}}</p>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    document.title = this.lang.rile_title
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
      background: url(../../img/arr.png);
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
// @import "../../assets/scss/common.scss";
</style>
