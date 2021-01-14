<template>
  <div class="page pageRule" :style="{height:viewHeight+'px'}">
    <div class="title"><i class="back" @click="$router.go(-1)"></i> नियम विवरण</div>
    <div class="tipsItem">
      <p><i>1</i>
        लाटरी शुरू करने वाले ने पुरस्कार खरीदने के लिए संबंधित कॉइन खर्च किए और लाटरी के लिए जरुरी उपहार की शर्तें सेट किए, जब उपयोगकर्ता ऐसा उपहार देता है तब वह लाटरी में शामिल कर सकता है, प्रत्येक बार देने से एक लाटरी मौका मिल सकता है, अधिक मौका है, पुरस्कार मिलने की अधिक संभावना है। काउंटडाउन समाप्त के बाद लाटरी ड्रा करेगा, जो सभी शामिल करने वाले में से एक चुनकर उससे संबंधित पुरस्कार देंगे।

      </p>
      <p><i>2</i>
        पुरस्कार के प्रकार VIP सदस्य, उपहार, गाड़ी और अवतार फ्रेम हैं, प्रत्येक लाटरी के लिए केवल पुरस्कार का एक प्रकार हो सकता है।

      </p>
      <p><i>3</i>लाटरी शर्तों का ज़रूरी उपहार एक नामित उपहार है, जो विशेष तौर पर सूची के अनुसार है।
      </p>
      <p><i>4</i>प्रत्येक लाटरी को काउंटडाउन सेट करना चाहिए, काउंटडाउन के लिए 2 मिनट, 5 मिनट, 10 मिनट, 30 मिनट और 60 मिनट चुन सकता है, जबकि लाटरी प्रस्तुत करता है तब काउंटडाउन शुरू होता है, उपयोगकर्ताओं को लाटरी में शामिल करने के लिए काउंटडाउन के दौरान में नामित उपहार देना चाहिए।
      </p>
      <p><i>5</i>लाटरी में शामिल करने वाले को सेट कर सकता है, जब सभी लोगों की अनुमति है तो अभी उपयोगकर्ता लाटरी में शामिल कर सकते हैं; जब माइक के उपयोग में लोगों की अनुमति है तो वे लोग ही लाटरी में शामिल कर सकते हैं। ज्यादातर मनोरंजन मोड के लिए उपलब्ध है।

      </p>
      <p><i>6</i>
        हर रूम में एक समय में केवल एक लाटरी हो सकता है, यदि वर्तमान में लाटरी चल रहा है, तो वह लाटरी ख़त्म करने के बाद अगला लाटरी शुरू कर सकता है।

      </p>
      <p><i>7</i>
        शुरू की गई लाटरी अपरिवर्तनीय है, और दिए गए कॉइन वापस नहीं हैं। यदि काउंटडाउन के अंत में कोई भी लॉटरी में भाग नहीं लेता है, तो पुरस्कार शुरू करने वाले का है।

      </p>
    </div>
  </div>
</template>

<script>
// import { lang } from './config';

export default {
  computed: {
    // lang: () => lang,
    viewHeight: () => window.innerHeight,
  },
};
</script>

<style lang="scss">
.pageRule {
  width: 7.5rem;
  height: 9.88rem;
  background: linear-gradient(
    0deg,
    rgba(84, 173, 255, 1) 0%,
    rgba(122, 75, 255, 1) 100%
  );
  border-radius: 0.32rem 0.32rem 0 0;
  display: flex;
  flex-direction: column;
  .title {
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    font-size: 0.42rem;
    font-weight: 600;
    position: relative;
    .back {
      display: block;
      width: 0.17rem;
      height: 0.29rem;
      background: url(../../img/back2.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.36rem;
      left: 0.3rem;
    }
  }
  .tipsItem {
    margin-top: 0.08rem;
    flex: 1;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    -webkit-overflow-scrolling: auto;
    padding: 0 0.28rem 0.3rem 0.73rem;
    p {
      position: relative;
      i {
        display: block;
        width: 0.34rem;
        height: 0.34rem;
        background: url(../../img/pNum.png);
        background-size: 100% 100%;
        font-size: 0.24rem;
        text-align: center;
        line-height: 0.34rem;
        position: absolute;
        left: -0.43rem;
        top: 0;
      }
      font-size: 0.26rem;
      margin-top: 0.3rem;
    }
  }
}
</style>