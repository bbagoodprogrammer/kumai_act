<template>
  <div class="rule">
    <div class="tabs">
      <a @click.prevent="tabClick(0)" :class="{current:tab==0}" href="">नियम</a>
      <a @click.prevent="tabClick(1)" :class="{current:tab==1}" href="">इनाम</a>
    </div>
    <h6 class="time">समय：4/19 12:00- 4/26 22:00</h6>
    <div class="ruleTips" v-show="tab == 0">
      <h6>नियम</h6>
      <p>1. इवेंट में भाग लेकर उपयोगकर्ता रूम में या गीत कार्यों को कॉइन उपहार देने से चार्म मूल्य पा सकता है, जिसे 【सप्राइज़ स्कोर】 मिलेगी</p>
      <p>2. सप्राइज़ स्कोर जब हर लेवल तक पहुँचती है तब आप सप्राइज़ बॉक्स खोल सकते हैं, लेकिन हर व्यक्ति का एक दिन में सिर्फ 1 मौका है। अनेक लेवल पहुँचने के बाद जब आप बॉक्स खोलते हैं, डीफ़ोल्ट से सबसे उँच्ची लेवल की बॉक्स खुलेगी। इनाम सिस्टम खुद भेजेगी</p>
      <p>
                  3.सूची नियम
        <strong>दैनिक सूची ：【सप्राइज़ स्कोर= रूम/कार्यों को भेजे हुए कॉइन उपहारों की कुल चार्म मूल्य】 जिसे उँच्चे से नीचे तक सूची में रखा है, दैनिक सूची अगले दिन 0 बजे को हटाई जाएगी और फिर से शुरु होगी। दैनिक सूची में सिर्फ TOP1-100 के लोग दिखाती है</strong>
        <strong>कुल सूची：सब की सप्राइज़ स्कोर को उँच्चे से नीचे तक सूची में रखा है, कुल सूची में सिर्फ TOP1-100 के लोग दिखाती है
</strong>
      </p>
      <h6>दैनिक सूची समय：</h6>
      <p class="dayTime">
        दिन 1:     4/19 12:00-4/20 00:00<br />
        दिन 2:     4/20 00:00-4/21 00:00<br />
        दिन 3:     4/21 00:00-4/22 00:00<br />
        दिन 4:     4/22 00:00-4/23 00:00<br />
        दिन 5:     4/23 00:00-4/24 00:00<br />
        दिन 6:     4/24 00:00-4/25 00:00<br />
        दिन 7:     4/25 00:00-4/26 00:00<br />
        दिन 8:     4/26 00:00-4/26 22:00<br />
      </p>
      <h6>लकी लेवल：</h6>
      <p class="dayTime">
        Lv1：1000 स्कोर</br>
        Lv2：10000 स्कोर</br>
        Lv3：50000 स्कोर</br>
        Lv4：1 lakh स्कोर</br>
        Lv5：2 lakh स्कोर</br>
        Lv6：3 lakh स्कोर</br>
        सूपिअरीअ बॉक्स : इवेंट में कुल मिलाकर सप्राइज़ स्कोर 4 लाख पहुँचती है</br>
        【ध्यान दें】：सप्राइज़ स्कोर हर दिन के 0 बजे मिटाई जाएगी, कृपया समय पर बॉक्स खोलें
      </p>
      <h6>नोट्स：</h6>
      <p>1.अगर किसी भी प्रतियोगी को बेइमानी से स्कोर पाना मिले, तो बिना बताए उस की स्कोर और इनाम को हटाए जाएँगे, और इसे किसी इवेंट में भाग लेना भी मना किया जाएगा</p>
      <p>2.दैनिक सूची के TOP1-3 को मिलेंगी 15%、12%、10% की रिचार्ज बोनस कूपॉन, जो अगले दिन 0 बजे सिस्टम खुद भेजेगी। अंतिम दिन में इवेंट की अंत के बाद दैनिक इनाम भेजा जाएगा। कूपॉन भेजने के 1 दिन में वैध रहेगी, कृपया जल्दी उपयोग करें</p>
      <p>3.सब बैक उपहार वैध रहेंगे भेजने के 14 दिनों में</p>
      <p>सप्राइज़ स्कोर जब हर लेवल तक पहुँचती है तब आप इवेंट पेज पर सप्राइज़ बॉक्स खोल सकते हैं, हर व्यक्ति का एक दिन में सिर्फ 1 मौका है। अनेक लेवल पहुँचने के बाद जब आप बॉक्स खोलते हैं, डीफ़ोल्ट से सबसे उँच्ची लेवल की बॉक्स खुलेगी</p>
    </div>
    <div class="giftTips" v-show="tab ==1">
      <div class="giftBox">
        <span>
          <img src="../../img/ruleGift/1.png" alt="">
          <strong>लकी बॉक्स बैज</strong>
        </span>
        <span>
          <img src="../../img/ruleGift/2.png" alt="">
          <strong>Unicorn(1300 कॉइन्स/पीस)</strong>
        </span>
        <span>
          <img src="../../img/ruleGift/3.png" alt="">
          <strong>Swift Racing(30 दिन/900 कॉइन्स)</strong>
        </span>
        <span>
          <img src="../../img/ruleGift/10.png" alt="">
          <strong>रिचार्ज बोनस कूपॉन</strong>
        </span>
        <span>
          <img src="../../img/ruleGift/5.png" alt="">
          <strong>कॉइन्स</strong>
        </span>
        <span>
          <img src="../../img/ruleGift/6.png" alt="">
          <strong>पॉइन्ट्स</strong>
        </span>
      </div>
      <h6>इनाम</h6>
      <p>लकी लेवल इनाम：सप्राइज़ स्कोर जब हर लेवल तक पहुँचती है तब आप सप्राइज़ बॉक्स खोल सकते हैं, लेकिन हर व्यक्ति का एक दिन में सिर्फ 1 मौका है। अनेक लेवल पहुँचने के बाद जब आप बॉक्स खोलते हैं, डीफ़ोल्ट से सबसे उँच्ची लेवल वाली खुलेगी। इनाम सिस्टम से बांधा जाएगा, इनाम रेकोर्ड के लिए सप्राइज़ टाइम पेज पर देखें</p>
      <h6>दैनिक सूची इनाम</h6>
      <p>TOP1-3 के इनाम हैं 15%,12%,10% की रिचार्ज बोनस कूपॉन, जो अगले दिन 0 बजे सिस्टम भेजेगी, अंतिम दिन में इनाम भेजेगी इवेंट  की अंत के बाद</p>
      <h6>कुल सूची इनाम</h6>
      <p>TOP 1：लकी बॉक्स बैज 31 दिन+Convertible 30 दिन (1000 कॉइन्स)+10000 कॉइन्स+20000 पॉइन्ट्स</p>
      <p>TOP 2：लकी बॉक्स बैज 31 दिन+Convertible 30 दिन (1000 कॉइन्स)+8000 कॉइन्स+10000 पॉइन्ट्स</p>
      <p>TOP 3：लकी बॉक्स बैज 31 दिन+Convertible 30 दिन (1000 कॉइन्स)+6000 कॉइन्स+8000 पॉइन्ट्स</p>
      <p>TOP4-10：लकी बॉक्स बैज 31 दिन+Convertible 30 दिन (1000 कॉइन्स)+4000 कॉइन्स+6000 पॉइन्ट्स</p>
      <h6>नोट्स：</h6>
      <p>1.रिचार्ज बोनस कूपॉन भेजने के 1 दिन में वैध रहेगी, कृपया जल्दी उपयोग करें</p>
      <p>2.सब बैक उपहार वैध रहेंगे भेजने के 14 दिनों में</p>
      <p>3.कुल सूची इनाम भेजेंगे इवेंट के 7 दिन बाद</p>
    </div>
    <p class="lastTips">
इस इवेंट की अंतिम व्याख्या का अधिकार इवेंट आयोजक आरक्षित करता है।</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tab: 0
    }
  },
  methods: {
    tabClick (val) {
      this.tab = val
    }
  }
}
</script>

<style lang="scss">
body {
  .rule {
    padding: 0.36rem 0.27rem 0;
    background-color: #ad2b43;
    .tabs {
      width: 6.98rem;
      height: 0.98rem;
      background: url(../../img/tabs.png);
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      a {
        display: block;
        width: 3.66rem;
        height: 0.9rem;
        text-align: center;
        line-height: 0.9rem;
        color: #fddc55;
        font-weight: 700;
        font-size: 0.32rem;
        &.current {
          color: #a24e04;
          background: url(../../img/actTabs.png);
          background-size: 100% 100%;
        }
      }
    }
    .time {
      text-align: center;
      font-weight: 600;
      color: #fee898;
      margin-top: 0.5rem;
    }
    h6 {
      font-weight: 600;
      color: #fee898;
      margin: 0.5rem 0 0.2rem;
    }
    p {
      font-size: 0.24rem;
      font-weight: 500;
      margin-top: 0.15rem;
      padding-left: 0.2rem;
      line-height: 0.4rem;
      strong {
        font-size: 0.24rem;
        display: block;
        padding-left: 0.15rem;
      }
    }
    .ruleTips {
      margin-top: 0.61rem;
      .dayTime {
        line-height: 0.5rem;
      }
    }
    .giftTips {
      .giftBox {
        padding: 0 0.37rem;
        margin-top: 0.15rem;
        span {
          display: inline-block;
          vertical-align: top;
          width: 1.6rem;
          margin: 0.29rem 0.6rem 0 0;
          img {
            display: block;
            width: 1.6rem;
            height: 1.6rem;
          }
          strong {
            display: block;
            width: 120%;
            margin-left: -0.16rem;
            text-align: center;
            color: #fff3d2;
            font-size: 0.24rem;
            margin-top: 0.15rem;
          }
        }
        span:nth-child(3),
        span:nth-child(6) {
          margin-right: 0;
        }
      }
    }
    .lastTips {
      text-align: center;
      margin: 0.94rem 0 0.15rem;
      color: #ffb2c6;
      font-size: 0.24rem;
      font-weight: 500;
    }
  }
}
// @import '../scss/common.scss';
</style>
