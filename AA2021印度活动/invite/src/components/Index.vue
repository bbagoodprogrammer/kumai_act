<template>
  <div class="page pageIndex" :class="{open_ed:myCode}">
    <RoolMsg />
    <div class="tipsItem">
      <span>नियम व इनाम</span>
      <span v-if="newUser && !inputCode" @click="showCodePup = true">इनविटेशन कोड</span>
    </div>
    <div class="openType" v-if="!myCode">
      <div class="open">कैश पैक </div>
      <div class="openIcon"></div>
      <div class="openTips">इवेंट शुरू नहीं</div>
    </div>
    <div class="openEdType" v-else>
      <div class="exllBtn">
        <span @click="exchange()" :class="{ex:ifExchange}">निकासी></span>
        <span @click="exchangeMoney()" :class="{ex:ifExchangeMoney}">विनिमय></span>
      </div>
      <div class="title">
        <i class="left"></i>
        <span>मेरे पैसे</span>
        <i class="right"></i>
      </div>
      <div class="myMoney">
        <span>{{money}}</span>
        <em>रुपए</em>
      </div>
      <div class="liner">
        <div class="actLiner" :style="{width: money/exchangeMoneyNeed * 100+'%'}"></div>
        <!-- <i class="coinsIcon" :class="{act:money >= exchangeCoinNeed}"></i> -->
      </div>
      <div class="moneyTips">
        <span v-if="money < exchangeCoinNeed">कॉइन का विनिमय करने के लिए <em>8</em> रुपए की ज़रूरत</span>
        <span v-if="money < exchangeMoneyNeed">निकासी के लिए <em>8</em> रुपए की ज़रूरत</span>
      </div>
      <div class="share" @click="shareApp()">
        दोस्तों को आमंत्रित कर कैश कमाए
      </div>
      <div class="shareCode">
        इनविटेशन कोड दर्ज करें: : <em>{{myCode}}</em>
      </div>
      <div class="lastTips">
        कॉपी के लिए लॉन्ग प्रेस
      </div>
    </div>
    <!-- 邀请码弹窗 -->
    <div class="mask" v-show="showCodePup">
      <transition name="slide">
        <div class="fillShareCode" v-show="showCodePup">
          <i class="close"></i>
          <div class="title">
            <i class="left"></i>
            <span>सिंगस्टार में आने का स्वागत है</span>
            <i class="right"></i>
          </div>
          <div class="fillTips">
            दोस्त का इनविटेशन कोड दर्ज करेंताकि दोस्त को कैश इनाम मिल सकेगा
          </div>
          <input class="fillInput" placeholder="दोस्त का इनविटेशन कोड दर्ज करें" v-model="code" />
          <div class="querybtn" @click="comCode()">
            ठीक है
          </div>
        </div>
      </transition>
    </div>
    <!-- 兑换金币 -->
    <div class="mask" v-show="showExCoinsPup">
      <transition name="slide">
        <div class="exCoins" v-show="showExCoinsPup">
          <i class="close" @click="showExCoinsPup = false"></i>
          <div class="title">
            <i class="left"></i>
            <span>बधाई हो! अभी विनिमय कर सके</span>
            <i class="right"></i>
          </div>
          <div class="exTips">
            प्राप्ति रुपए: <em>{{money}}</em><br />
            1 रुपए 10 कॉइन का विनिमय कर सके
          </div>
          <div class="inputBox">
            <div class="inputItem">
              <input type="number" placeholder="जितने रुपए आप विनिमय करना चाहते हैं, उतने दर्ज़ करें" v-model="exCoinsNums" @input="setExCoins()">
              <label>रुपए</label>
            </div>
            <span class="arr"></span>
            <div class="inputItem">
              <input type="number" :value="exCoinsNums * 10" class="tc" disabled>
              <label>कॉइन</label>
            </div>
          </div>
          <div class="okEx" @click="exCoinsApi(1)">
            ठीक है
          </div>
        </div>
      </transition>
    </div>
    <!-- 不够兑换金币 -->
    <div class="mask" v-show="showNotExCoins">
      <transition name="slide">
        <div class="exchangeCoins" v-show="showNotExCoins">
          <i class="close" @click="showNotExCoins = false"></i>
          <p class="exTips" v-if="noCoinsType == 1">
            कॉइन का विनिमय करने के लिए <em>{{exchangeCoinNeed - money}}</em> रुपए की ज़रूरत है
          </p>
          <p class="exTips" v-if="noCoinsType == 2">
            निकासी के लिए <em>{{exchangeMoneyNeed - money}}</em> रुपए की ज़रूरत है
          </p>
          <div class="share" @click="shareApp()">
            दोस्तों को आमंत्रित कर कैश कमाए
          </div>
        </div>
      </transition>
    </div>
    <!-- 达到提现门栏 -->
    <div class="mask" v-show="showCanExPup">
      <transition name="slide">
        <div class="canEx" v-show="showCanExPup">
          <i class="close" @click="showCanExPup = false"></i>
          <p class="canTips">
            बधाई हो! आप नकद निकासी कर सके
          </p>
          <div class="querybtn" @click="exMoneySet()">अगला</div>
        </div>
      </transition>
    </div>
    <!-- 提现 -->
    <div class="mask" v-show="queryMoneyPup">
      <transition name="slide">
        <div class="exMoney" v-show="queryMoneyPup">
          <i class='close' @click="queryMoneyPup = false"></i>
          <div class="title">
            <i class="left"></i>
            <span>निकासी के लिए जानकारी पूरा करें</span>
            <i class="right"></i>
          </div>
          <div class="inputItem">
            <label>निकासी राशि:</label>
            <input type="number" v-model="exMoneyNums" @input="setExMoney()">
            <div class="hasBean">
              (प्राप्ति रुपए: <em>{{money}}</em> )
            </div>
          </div>
          <div class="exMoneyTips">
            <p>निकासी राशि दर्ज़ करने के बाद, आधिकारिक कर्मचारी uid 10 आपसे संपर्क कर बैंक खाते की </p>
            <p><span>सूचना:</span> बैंक ट्रांसफर का प्रोसेस जटिल है; नकद निकासी के लिए सिंगस्टार सेवा शुल्क नहीं चार्ज करता है। इसलिए कृपया ऐसे झूठ की चेतावनी दीजिए जो सेवा शुल्क की मांग करने वाला।
            </p>
          </div>
          <div class="queryBtn">
            <u @click="queryMoneyPup = false">वापस करें</u>
            <div class="ok" @click="exCoinsApi(2)">सबमिट करें</div>
          </div>
        </div>
      </transition>
    </div>
    <!-- id10 -->
    <div class="mask" v-show="id10Pup">
      <transition name="slide">
        <div class="canEx" v-show="id10Pup">
          <i class="close" @click="id10Pup = false"></i>
          <p class="canTips id">
            सबमिट किया गया, कृपया आधिकारिक कर्मचारी uid 10 के मैसेज पर धयान दीजिए~
          </p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { singUp, inviteCode, exchange, notice } from "../apis"
import { getUrlString } from "../utils"
import RoolMsg from "../components/RoolMsg"

export default {
  components: { RoolMsg },
  data () {
    return {
      showCodePup: false,
      code: '',
      showNotExCoins: false,
      exCoinsNums: '',
      exMoneyNums: '',
      showExCoinsPup: false,
      noCoinsType: 1,
      showCanExPup: false,
      queryMoneyPup: false,
      id10Pup: false
    }
  },
  mounted () {
    notice().then(res => {
      this.vxc('setTop', res.data.response_data.list)
    })
  },
  computed: {
    ...mapState(['myCode', 'money', 'exchangeCoinNeed', 'exchangeMoneyNeed', 'newUser', 'inputCode', 'firstTips']),
    ifExchange () {
      return this.money >= this.exchangeCoinNeed
    },
    ifExchangeMoney () {
      return this.money >= this.exchangeMoneyNeed
    }
  },
  watch: {
    firstTips (val) {
      if (val) {
        this.showCodePup = true
      }
    },
  },
  methods: {
    exMoneySet () {
      this.queryMoneyPup = true
      this.showCanExPup = false
    },
    exCoinsApi (type) {
      let nums = type == 1 ? this.exCoinsNums : this.exMoneyNums
      if (nums) {
        exchange(type, nums).then(res => {
          if (res.data.response_status.code == 0) {
            this.vxc('setNewMoney', res.data.response_data.money)
            this.exCoinsNums = ''
            this.exMoneyNums = ''
            this.showExCoinsPup = false
            this.queryMoneyPup = false
            if (type == 2) {
              this.id10Pup = true
            }
          } else {
            this.toast(res.data.response_status.error)
          }
        })
      }
    },
    setExMoney () {
      if (this.exMoneyNums * 1 > this.money) {
        this.exMoneyNums = this.money
      }
    },
    setExCoins () {
      if (this.exCoinsNums * 1 > this.money) {
        this.exCoinsNums = this.money
      }
    },
    exchange () {
      if (this.ifExchange) {
        this.showExCoinsPup = true
      } else {
        this.noCoinsType = 1
        this.showNotExCoins = true
      }
    },
    exchangeMoney () {
      if (this.ifExchange) {
        this.showCanExPup = true
      } else {
        this.noCoinsType = 2
        this.showNotExCoins = true
      }
    },
    userSingUp () {
      singUp().then(res => {
        if (res.data.response_status.code == 0) {
          this.$store.dispatch('getInitInfo');
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    comCode () {
      if (this.code) {
        inviteCode(this.code).then(res => {
          if (res.data.response_status.code == 0) {
            this.toast(`दर्ज किया गया, दोस्त का कैश इनाम बढ़ाया`)
            this.vxc("setInputCode", true)
          } else {
            this.toast(res.data.response_status.error)
          }
        })
      }
    },
    shareApp () {
      var ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      var ua = navigator.userAgent;
      let lang = getUrlString("lang")
      let aid = getUrlString("aid")
      let shareImg = ''
      var data = {
        "share_title": `SingStar खेलो और पैसे कमाओ !`,
        "share_content": `इंडियन ऑनलाइन फ्री Karaoke सोशल एप्प ! मज़े के साथ कैश भी कमा सकते हो ! मेरी इनविटेशन कोड टाइप करो：${this.myCode}`,
        "share_image": shareImg,
        "link": `http://activity.singstarapp.com/invite/share.php?code=${this.myCode}&lang=${lang}`,
        "image": shareImg,
        "share_url": `http://activity.singstarapp.com/invite/share.php?code=${this.myCode}&lang=${lang}`
      }
      if (ios) {
        if (window.shareOutside != undefined) {
          shareOutside(JSON.stringify(data))
        } else {
          location.href = `shareUserInfo://activity.singstarapp.com/invite/share.php?code=${this.myCode}&lang=${lang}&shareText=इंडियन ऑनलाइन फ्री Karaoke सोशल एप्प ! मज़े के साथ कैश भी कमा सकते हो ! मेरी इनविटेशन कोड टाइप करो：${this.myCode}&userImg=${shareImg}&title=SingStar खेलो और पैसे कमाओ !`;
        }
      } else {
        javascript: JSInterface.shareOutside(JSON.stringify(data));
      }
    }
  }
}

</script>

<style lang="scss">
.pageIndex {
  position: relative;
  .tipsItem {
    position: absolute;
    top: 2.57rem;
    right: 0;
    span {
      display: block;
      width: 1.19rem;
      height: 0.46rem;
      background: url(../img/ruleTips.png);
      background-size: 100% 100%;
      font-size: 0.2rem;
      text-align: center;
      line-height: 0.46rem;
      white-space: nowrap;
      color: rgba(173, 21, 21, 1);
      text-indent: 0.1rem;
      margin-bottom: 0.05rem;
    }
  }
  img {
    display: block;
    width: 100%;
  }
  .openType {
    width: 5.5rem;
    height: 7rem;
    position: absolute;
    top: 4rem;
    left: 1rem;
    .open {
      height: 0.9rem;
      line-height: 1.5rem;
      color: rgba(253, 230, 183, 1);
      font-size: 0.6rem;
      font-weight: bold;
      text-align: center;
    }
    .openTips {
      text-align: center;
      color: rgba(247, 239, 178, 1);
      font-size: 0.6rem;
      margin-top: 0.25rem;
    }
  }
  .exllBtn {
    position: absolute;
    right: 0;
    top: 0;
    span {
      width: 0.84rem;
      height: 0.32rem;
      display: block;
      text-align: center;
      font-size: 0.2rem;
      color: rgba(255, 180, 100, 1);
      background: url(../img/exllBtn.png);
      background-size: 100% 100%;
      margin-bottom: 0.04rem;
      position: relative;
      text-indent: 0.1rem;
      &.ex {
        background: url(../img/canEx.png);
        background-size: 100% 100%;
        color: rgba(255, 109, 93, 1);
      }
      &.ex::before {
        content: '';
        width: 0.1rem;
        height: 0.1rem;
        background: #FF6D5D;
        border-radius: 50%;
        position: absolute;
        left: 0.05rem;
        top: 0.11rem;
      }
    }
  }
  .openEdType {
    width: 5rem;
    height: 7rem;
    position: absolute;
    top: 4rem;
    left: 1.25rem;
    .myMoney {
      height: 1.3rem;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      span {
        font-size: 1.1rem;
        font-weight: bold;
        color: #fb4a44;
      }
      em {
        color: rgba(204, 144, 103, 1);
        font-size: 0.4rem;
        margin-left: 0.18rem;
      }
    }
    .liner {
      width: 4.11rem;
      height: 0.2rem;
      background: #FFE7CB;
      box-shadow: -0.02rem 0.03rem 0.21rem 0 rgba(255, 166, 64, 0.65);
      border-radius: 10px;
      position: relative;
      margin: 0.3rem auto 0;
      .actLiner {
        max-width: 100%;
        height: 0.2rem;
        background: linear-gradient(180deg, #FE7A7C 0%, #F92F32 100%);
        border-radius: 0.1rem;
        position: absolute;
        left: 0;
        top: 0;
      }
      .coinsIcon {
        display: block;
        width: 0.36rem;
        height: 0.36rem;
        background: url(../img/coinsIcon1.png);
        background-size: 100% 100%;
        position: absolute;
        z-index: 3;
        top: -0.08rem;
        &.act {
          background: url(../img/coinsIcon2.png);
          background-size: 100% 100%;
        }
      }
    }
    .moneyTips {
      height: 0.96rem;
      font-size: 0.28rem;
      padding: 0 0.3rem;
      color: rgba(221, 142, 80, 1);
      text-align: center;
      margin-top: 0.2rem;
      em {
        font-size: 0.4rem;
        color: rgba(249, 47, 50, 1);
      }
    }
    .share {
      width: 4.69rem;
      height: 1.14rem;
      background: url(../img/share.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 1.14rem;
      color: rgba(192, 50, 2, 1);
      margin: 1.4rem auto 0;
    }
    .shareCode {
      text-align: center;
      font-size: 0.28rem;
      color: rgba(255, 245, 200, 1);
      em {
        color: rgba(254, 228, 100, 1);
      }
    }
    .lastTips {
      text-align: right;
      font-size: 0.2rem;
      color: rgba(255, 245, 200, 1);
      margin-top: -0.05rem;
      padding-right: 0.8rem;
    }
  }
}
.title {
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(221, 142, 80, 1);
  font-size: 0.4rem;
  i {
    width: 0.34rem;
    height: 0.34rem;
    background: url(../img/title_left.png);
    background-size: 100% 100%;
    &.right {
      background: url(../img/title_right.png);
      background-size: 100% 100%;
      margin-left: 0.28rem;
    }
    &.left {
      margin-right: 0.28rem;
    }
  }
}
.fillShareCode {
  width: 5.28rem;
  height: 3.69rem;
  padding-top: 0.4rem;
  background: url(../img/fillCode.png);
  background-size: 100% 100%;
  position: relative;
  .title {
    font-size: 0.28rem;
  }
  .fillTips {
    text-align: center;
    font-size: 0.28rem;
    padding: 0 0.4rem;
    color: rgba(211, 111, 32, 1);
    margin: 0.2rem auto 0.1rem;
  }
  .fillInput {
    display: block;
    width: 3.75rem;
    height: 0.56rem;
    background: #F6E39F;
    border-radius: 0.1rem;
    margin: 0 auto;
  }

  .querybtn {
    width: 3.44rem;
    height: 0.73rem;
    background: url(../img/qureyBtn.png);
    background-size: 100% 100%;
    text-align: center;
    line-height: 0.73rem;
    color: rgba(192, 50, 2, 1);
    font-size: 0.38rem;
    margin: 0.3rem auto 0;
  }
}
.exCoins {
  width: 5.28rem;
  height: 4.83rem;
  background: url(../img/exCoins.png);
  background-size: 100% 100%;
  position: relative;
  padding-top: 0.4rem;
  .title {
    font-size: 0.28rem;
  }
  .exTips {
    text-align: center;
    font-size: 0.28rem;
    color: rgba(211, 111, 32, 1);
    margin-top: 0.2rem;
    em {
      font-size: 0.34rem;
      color: rgba(249, 47, 50, 1);
    }
  }
  .inputBox {
    margin: 0.22rem 0 0.4rem;
    .arr {
      display: block;
      width: 0.35rem;
      height: 0.3rem;
      background: url(../img/arr.png);
      background-size: 100% 100%;
      margin: 0.1rem 0 0.1rem 2.25rem;
    }
    .inputItem {
      display: flex;
      align-items: center;
      justify-content: center;
      input {
        width: 3.92rem;
        height: 0.56rem;
        background: #F6E39F;
        border-radius: 0.1rem;
        text-align: center;
      }
      label {
        font-size: 0.28rem;
        color: rgba(221, 142, 80, 1);
        margin-left: 0.12rem;
      }
    }
  }
  .okEx {
    width: 3.44rem;
    height: 0.73rem;
    background: url(../img/qureyBtn.png);
    background-size: 100% 100%;
    text-align: center;
    line-height: 0.73rem;
    color: rgba(192, 50, 2, 1);
    font-size: 0.38rem;
    margin: 0.2rem auto 0;
  }
}
.exchangeCoins {
  width: 5.28rem;
  height: 3.03rem;
  padding-top: 0.4rem;
  background: url(../img/exCoinst.png);
  background-size: 100% 100%;
  position: relative;
  .exTips {
    text-align: center;
    font-size: 0.28rem;
    color: rgba(211, 111, 32, 1);
    margin-top: 0.3rem;
    padding: 0 0.3rem;
    em {
      color: rgba(249, 47, 50, 1);
    }
  }
  .share {
    width: 4.07rem;
    height: 0.73rem;
    background: url(../img/share2.png);
    background-size: 100% 100%;
    text-align: center;
    line-height: 0.73rem;
    color: rgba(192, 50, 2, 1);
    margin: 0.4rem auto 0;
    font-size: 0.28rem;
  }
}
.canEx {
  width: 5.28rem;
  height: 3.03rem;
  padding-top: 0.4rem;
  background: url(../img/exCoinst.png);
  background-size: 100% 100%;
  position: relative;
  .canTips {
    text-align: center;
    font-size: 0.28rem;
    color: rgba(211, 111, 32, 1);
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    &.id {
      height: 3rem;
    }
  }
  .querybtn {
    width: 3.44rem;
    height: 0.73rem;
    background: url(../img/qureyBtn.png);
    background-size: 100% 100%;
    text-align: center;
    line-height: 0.73rem;
    color: rgba(192, 50, 2, 1);
    font-size: 0.38rem;
    margin: 0.3rem auto 0;
  }
}
.exMoney {
  width: 5.28rem;
  height: 5.23rem;
  padding-top: 0.4rem;
  background: url(../img/exMoney.png);
  background-size: 100% 100%;
  position: relative;
  .title {
    font-size: 0.28rem;
  }
  .inputItem {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    label {
      color: rgba(211, 111, 32, 1);
      font-size: 0.32rem;
    }
    input {
      margin-left: 0.1rem;
      width: 1.62rem;
      height: 0.4rem;
      background: #F6E39F;
      border-radius: 0.05rem;
      font-size: 0.26rem;
    }
    .hasBean {
      position: absolute;
      left: 2.6rem;
      bottom: -0.35rem;
      font-size: 0.26rem;
      color: rgba(211, 111, 32, 1);
      em {
        font-size: 0.32rem;
        color: rgba(249, 47, 50, 1);
      }
    }
  }
  .exMoneyTips {
    padding: 0 0.15rem;
    text-align: center;
    margin-top: 0.6rem;
    color: rgba(211, 111, 32, 1);
    p {
      font-size: 0.28rem;
      line-height: 0.32rem;
      margin-bottom: 0.2rem;
    }
    span {
      font-size: 0.32rem;
      color: rgba(249, 76, 72, 1);
    }
  }
  .queryBtn {
    display: flex;
    align-items: center;
    color: rgba(221, 145, 78, 1);
    font-size: 0.38rem;
    justify-content: center;
    margin: 0.5rem auto 0;
    .ok {
      width: 1.87rem;
      height: 0.66rem;
      background: url(../img/ok.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.66rem;
      color: rgba(192, 50, 2, 1);
      margin-left: 0.77rem;
    }
  }
}
.close {
  display: block;
  width: 0.29rem;
  height: 0.29rem;
  background: url(../img/close.png);
  background-size: 100% 100%;
  position: absolute;
  top: 0.16rem;
  right: 0.12rem;
}
input {
  padding-left: 0.17rem;
  color: rgba(249, 47, 50, 1);
  background: none;
  border: none;
}
input::placeholder {
  font-size: 0.24rem;
  color: rgba(196, 179, 119, 1) ；;
}
</style>