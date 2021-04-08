<template>
  <div class="rule">
    <h5>Rules</h5>
    <p class="ruleTitle">Time：</p>
    <p>{{timer}}</p>
    <ol>
      <li>1. You can get 1 slot token for every coin recharged. You can get better prizes by drawing with more tokens.</li>
      <li>2. You can get three prizes in one draw. Prizes will be sent automatically. If you receive a double card, you can get two of the rest prizes in this draw.</li>
      <li>3. Gifts value will be calculated after you receive the payback coupon. You will get coins payback once reaching the condition.</li>
      <li>4. You must get a special uid if you draw with 4,000 tokens 20 times. After the event, Official Service UID 10 will contact you in 7 days about the special uid.</li>
      <li>5. GIfts will be saved in your "Pack". You can send them to other users.</li>
      <li>6. Each user can only get one special uid for drawing with 4,000 tokens 20 times.</li>
    </ol>
    <p class="waordsMsg">Possible Prizes </p>
    <div class="wardsBox clearfix">
      <ul>
        <li>
          <span>
            <img :src="require('./img/wards/ward19.png')" alt="">
          </span>
          <p>Vip</p>
        </li>
        <li>
          <span>
            <img :src="require('./img/wards/ward12.png')" alt="">
          </span>
          <p>Massive Coins</p>
        </li>
        <li>
          <span>
            <img :src="require('./img/wards/ruleWard.png')" alt="">
          </span>
          <p>Gifts</p>
        </li>
        <li>
          <span>
            <img :src="require('./img/wards/ward7.png')" alt="">
          </span>
          <p>Recharge bonus coupon </p>
        </li>
        <li>
          <span>
            <img :src="require('./img/wards/ward4.png')" alt="">
          </span>
          <p>Payback coupon</p>
        </li>
        <li>
          <span>
            <img :src="require('./img/wards/ward8.png')" alt="">
          </span>
          <p>Slot tokens</p>
        </li>
        <li>
          <span>
            <img :src="require('./img/wards/ward21.png')" alt="">
          </span>
          <p> Double card</p>
        </li>
        <li>
          <span>
            <img :src="require('./img/wards/ward15.png')" alt="">
          </span>
          <p>Massive points</p>
        </li>
        <li>
          <span>
            <img :src="require('./img/wards/ward23.png')" alt="">
          </span>
          <p>Special uid</p>
        </li>
      </ul>
    </div>
    <p class="footerMsg">SingStar reserves the right of final explanation. </p>
  </div>
</template>

<script>
import getDate from "../../utils/getDate.js"
export default {
  data () {
    return {
      stime: 0,
      etime: 0
    }
  },
  created () {
    this.stime = sessionStorage.getItem('stime')
    this.etime = sessionStorage.getItem('etime')
  },
  computed: {
    timer () {
      return getDate(new Date(Number(this.stime * 1000)), "rule") + ' - ' + getDate(new Date(Number(this.etime * 1000)), "rule")
    }
  }
}
</script>

<style lang="scss" scoped>
body {
  background-color: RGBA(43, 0, 87, 1);
}
.rule {
  background-color: RGBA(43, 0, 87, 1);
  padding: 0.35rem 0.45rem;
  .ruleTitle {
    margin-top: 0.1rem;
  }
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
      content: '';
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
    margin-top: 0.5rem;
  }
  .wardsBox {
    width: 5.5rem;
    margin: 0 auto;
    li {
      width: 1.52rem;
      height: 1.8rem;
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
        font-size: 70%;
        text-align: center;
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
    content: '';
    height: 0;
    line-height: 0;
    display: block;
    visibility: hidden;
    clear: both;
  }
}
// @import '../../assets/scss/common.scss';
</style>
