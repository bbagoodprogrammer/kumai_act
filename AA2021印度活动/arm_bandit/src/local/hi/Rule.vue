<template>
  <div class="rule">
    <h5>इवेंट के नियम</h5>
    <p class="ruleTitle">इवेंट का समय ：{{timer}}</p>
    <ol>
      <li>1.इवेंट के दौरान हर 1 कोइन रिचार्ज करने के साथ 1 स्लॉट टोकन मिलेगा, और स्लॉट टोकन के साथ आप स्लॉट मशीन को स्पिन कर सकते हैं। तीनों लॉटरी मोड में जो ज्यादा स्लॉट टोकन्स खर्च करता है, उससे
        आपको ज्यादा पुरस्कार मिलेंगे, और कीमती पुरस्कार मिलने का मौका ज्यादा होगा !</li>
      <li>2.हर एक स्पिन में 3 पुरस्कार साथ ही मिलेंगे, और पुरस्कार तत्काल खाते में डाले जाएंगे। जब पुरस्कारों में मिले डबल कार्ड, बाकी दो पुरस्कार दो-दो मिल जाएंगे !</li>
      <li>3.इवेंट में जो रिचार्ज बोनस कूपॉन और उपहार पेबैक कूपॉन हैं, उन्हें प्राप्त करते ही गणना शुरु होगी, और कूपॉन की शर्तों को पूरा करके कोइन्स का वितरण किया जाएगा !</li>
      <li>4. यदि आपने 4000 स्लॉट टोकन्स/ स्पिन के लॉटरी मोड से 20 बार स्पिन किया है, तो आपको पक्का मिलेगी एक 4-5 अंक की Special UID। इनाम जीतने वाले उपयोगकर्ताओं से आधिकारिक UID संपर्क करेगा इवेंट के
        बाद 7 दिनों के अंतर । </li>
      <li>5. इस इवेंट में प्राप्त बैक उपहार के इनाम आप देख सकते हैं मैं-बैक में । उपहार देते समय, इसतेमाल करने के लिए बैक उपहार चुनें।</li>
      <li>6.4000 स्लॉट टोकन्स/ स्पिन के लॉटरी मोड से 20 बार स्पिन करके Special UID मिलने के लिए, हर एक उपयोगकर्ता का हर इवेंट सेशन में सिर्फ एक मौका है।</li>
    </ol>
    <p class="waordsMsg">पुरस्कार </p>
    <div class="wardsBox clearfix">
      <ul>
        <li>
          <span>
            <img :src="require('./img/wards/ward22.png')" alt="">
          </span>
          <p>VIP</p>
        </li>
        <li>
          <span>
            <img :src="require('./img/wards/ward12.png')" alt="">
          </span>
          <p>भरपूर कोइन्स</p>
        </li>
        <li>
          <span>
            <img :src="require('./img/wards/ruleWard.png')" alt="">
          </span>
          <p>पॉइंट्स उपहार</p>
        </li>
        <li>
          <span>
            <img :src="require('./img/wards/ward4.png')" alt="">
          </span>
          <p>रिचार्ज बोनस कूपॉन </p>
        </li>
        <li>
          <span>
            <img :src="require('./img/wards/ward7.png')" alt="">
          </span>
          <p>उपहार पेबैक कूपॉन </p>
        </li>
        <li>
          <span>
            <img :src="require('./img/wards/ward8.png')" alt="">
          </span>
          <p> स्लॉट टोकन्स</p>
        </li>
        <li>
          <span>
            <img :src="require('./img/wards/ward21.png')" alt="">
          </span>
          <p>डबल कार्ड</p>
        </li>
        <li>
          <span>
            <img :src="require('./img/wards/ward15.png')" alt="">
          </span>
          <p>भरपूर पॉइंट्स</p>
        </li>
        <li>
          <span>
            <img :src="require('./img/wards/ward23.png')" alt="">
          </span>
          <p> 4-5अंक की Special UID</p>
        </li>
      </ul>
    </div>
    <p class="footerMsg">इस इवेंट की अंतिम व्याख्या का अधिकार इवेंट आयोजक आरक्षित करता है। </p>
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
