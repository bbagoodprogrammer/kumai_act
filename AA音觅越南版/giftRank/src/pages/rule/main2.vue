<template>
  <div class="rule">
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
body {
  background-color: #2b0057;
}
.rule {
  padding: 0.35rem 0.45rem;
  h5 {
    color: #fdfdac;
    font-size: 160%;
    font-weight: bold;
    text-align: center;
    margin-bottom: 0.36rem;
  }
  > p {
    font-size: 80%;
    color: #5dffe2;
  }
  ol {
    li {
      margin-top: 0.2rem;
      padding-left: 0.38rem;
      font-size: 80%;
      line-height: 0.28rem;
      position: relative;
    }
    li::after {
      content: "";
      width: 0.12rem;
      height: 0.12rem;
      position: absolute;
      left: 0rem;
      top: 0.1rem;
      background-color: #ffd900;
      border-radius: 50%;
    }
  }
  .waordsMsg {
    margin-top: 1rem;
  }
  .wardsBox {
    width: 5.5rem;
    margin: 0 auto;
    li {
      width: 1.52rem;
      float: left;
      margin: 0.2rem 0.3rem 0 0;
      span {
        display: block;
        width: 0.9rem;
        height: 0.9rem;
        border-radius: 0.2rem;
        background-color: #ab02de;
        text-align: center;
        margin: 0 auto;
        img {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }
      p {
        font-size: 80%;
        text-align: center;
        white-space: nowrap;
        margin-top: 0.12rem;
      }
    }
  }
  .footerMsg {
    text-align: center;
    font-size: 80%;
    color: #f7d8ff;
    margin-top: 0.6rem;
  }
  .clearfix:after {
    content: "";
    height: 0;
    line-height: 0;
    display: block;
    visibility: hidden;
    clear: both;
  }
}
@import "../../assets/scss/common.scss";
</style>
