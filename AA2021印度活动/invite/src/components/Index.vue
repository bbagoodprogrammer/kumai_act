<template>
  <div class="page pageIndex" :class="{open_ed:myCode}">
    <RoolMsg />
    <div class="tipsItem">
      <span @click="showRule = true">{{lang.rule_tips}}</span>
      <span v-if="newUser && !inputCode" @click="showCodePup = true">{{lang.inviteCodeTips}}</span>
    </div>
    <div class="openType" v-if="!myCode">
      <div class="open">{{lang.open_type1_title}} </div>
      <div class="openIcon" @click="userSingUp()"></div>
      <div class="openTips" v-if="step == 0">{{lang.no_start}}</div>
    </div>
    <div class="openEdType" v-else>
      <div class="exllBtn">
        <span @click="exchangeMoney()" :class="{ex:ifExchangeMoney}">{{lang.exllBtn1}}</span>
        <span @click="exchange()" :class="{ex:ifExchange}">{{lang.exllBtn2}}</span>
      </div>
      <div class="title">
        <i class="left"></i>
        <span>{{lang.my_money}}</span>
        <i class="right"></i>
      </div>
      <div class="myMoney">
        <span>{{money}}</span>
        <em>{{lang.money}}</em>
      </div>
      <div class="liner">
        <div class="actLiner" :style="{width: money/exchangeMoneyNeed * 100+'%'}"></div>
        <!-- <i class="coinsIcon" :class="{act:money >= exchangeCoinNeed}"></i> -->
      </div>
      <div class="moneyTips">
        <span v-if="money < exchangeCoinNeed" v-html="lang.exCoinsNeed.replace('$',exchangeCoinNeed-money)"> </span>
        <span v-if="money < exchangeMoneyNeed" v-html="lang.exMoneyNeed.replace('$',exchangeMoneyNeed-money)"></span>
      </div>
      <div class="share" @click="shareApp()">
        {{lang.share}}
      </div>
      <div class="shareCode">
        {{lang.myCode}} <em>{{myCode}}</em>
      </div>
      <div class="lastTips">
        {{lang.code_tips}}
      </div>
    </div>
    <!-- 邀请码弹窗 -->
    <div class="mask" v-show="showCodePup">
      <transition name="slide">
        <div class="fillShareCode" v-show="showCodePup">
          <i class="close" @click="showCodePup = false"></i>
          <div class="title">
            <i class="left"></i>
            <span>{{lang.share_title}}</span>
            <i class="right"></i>
          </div>
          <div class="fillTips">
            {{lang.share_tips}}
          </div>
          <input class="fillInput" :placeholder="lang.shareCode_pvalue" v-model="code" />
          <div class="querybtn" @click="comCode()">
            {{lang.ok}}
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
            <span>{{lang.exCoins_title}}</span>
            <i class="right"></i>
          </div>
          <div class="exTips">
            {{lang.exCoins_tips1}} <em>{{money}}</em><br />
            {{lang.exCoins_tips2}}
          </div>
          <div class="inputBox">
            <div class="inputItem">
              <input type="number" :placeholder="lang.exCoins_tips3" v-model="exCoinsNums" @input="setExCoins()">
              <label>{{lang.lubi}}</label>
            </div>
            <span class="arr"></span>
            <div class="inputItem">
              <input type="number" :value="exCoinsNums * 10" class="tc" disabled>
              <label>{{lang.coins}}</label>
            </div>
          </div>
          <div class="okEx" @click="exCoinsApi(1)">
            {{lang.ok}}
          </div>
        </div>
      </transition>
    </div>
    <!-- 不够兑换金币 -->
    <div class="mask" v-show="showNotExCoins">
      <transition name="slide">
        <div class="exchangeCoins" v-show="showNotExCoins">
          <i class="close" @click="showNotExCoins = false"></i>
          <p class="exTips" v-if="noCoinsType == 1" v-html="lang.exCoinsNeed.replace('$',exchangeCoinNeed - money)">
            <!-- कॉइन का विनिमय करने के लिए <em>{{}}</em> रुपए की ज़रूरत है -->
          </p>
          <p class="exTips" v-if="noCoinsType == 2" v-html="lang.exMoneyNeed.replace('$',exchangeMoneyNeed - money)">
            <!-- निकासी के लिए <em>{{exchangeMoneyNeed - money}}</em> रुपए की ज़रूरत है -->
          </p>
          <div class="share" @click="shareApp()">
            {{lang.share}}
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
            {{lang.exMoney_tips1}}
          </p>
          <div class="querybtn" @click="exMoneySet()">{{lang.exMoney_next}}</div>
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
            <span>{{lang.exMoney_tips2}}</span>
            <i class="right"></i>
          </div>
          <div class="inputItem">
            <label>{{lang.exMoney_tips3}}</label>
            <input type="number" v-model="exMoneyNums" @input="setExMoney()">
            <div class="hasBean">
              ({{lang.exMoney_tips4}} <em>{{money}}</em> )
            </div>
          </div>
          <div class="exMoneyTips">
            <p> {{lang.exMoney_tips5}}</p>
            <p><span>{{lang.exMoney_tips6}}</span> {{lang.exMoney_tips7}}
            </p>
          </div>
          <div class="queryBtn">
            <u @click="queryMoneyPup = false">{{lang.exMoney_cancel}}</u>
            <div class="ok" @click="exCoinsApi(2)">{{lang.exMoney_qurey}}</div>
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
            {{lang.id10Tips}}
          </p>
        </div>
      </transition>
    </div>
    <!-- 规则 -->
    <div class="mask" v-show="showRule">
      <transition name="slide">
        <Rule v-if="showRule" />
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { singUp, inviteCode, exchange, notice } from "../apis"
import { getUrlString } from "../utils"
import RoolMsg from "../components/RoolMsg"
import Rule from "../components/rule"
export default {
  components: { RoolMsg, Rule },
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
      id10Pup: false,
      showRule: false
    }
  },
  mounted () {
    notice().then(res => {
      this.vxc('setTop', res.data.response_data.list)
    })
  },
  computed: {
    ...mapState(['myCode', 'money', 'step', 'exchangeCoinNeed', 'exchangeMoneyNeed', 'newUser', 'inputCode', 'firstTips']),
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
    step (val) {
      if (val == 0) {
        this.toast(this.lang.no_start)
      }
    }
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
      if (this.ifExchangeMoney) {
        this.showCanExPup = true
      } else {
        this.noCoinsType = 2
        this.showNotExCoins = true
      }
    },
    userSingUp () {
      if (this.step == 0) {
        this.toast(this.lang.no_start)
        return
      }
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
            this.toast(this.lang.code_suc_tips)
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
      if (lang == 'hi') {
        shareImg = require(`../local/hi/img/share.jpg`)
      } else if (lang == 'en') {
        shareImg = require(`../local/en/img/share.jpg`)
      }
      var data = {
        "share_title": this.lang.shareHtml_title,
        "share_content": `${this.lang.shareHtml_con}${this.myCode}`,
        "share_image": `http://activity.singstarapp.com/invite/${shareImg}`,
        "link": `http://activity.singstarapp.com/invite/share.php?code=${this.myCode}&lang=${lang}`,
        "image": `http://activity.singstarapp.com/invite/${shareImg}`,
        "share_url": `http://activity.singstarapp.com/invite/share.php?code=${this.myCode}&lang=${lang}`
      }
      if (ios) {
        if (window.shareOutside != undefined) {
          shareOutside(JSON.stringify(data))
        } else {
          location.href = `shareUserInfo://activity.singstarapp.com/invite/share.php?code=${this.myCode}&lang=${lang}&shareText=${this.lang.shareHtml_con}${this.myCode}&userImg=${shareImg}&title=${this.lang.shareHtml_title}`;
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
      width: 1.14rem;
      height: 0.48rem;
      display: block;
      text-align: center;
      font-size: 0.3rem;
      line-height: 0.48rem;
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
      font-size: 0.26rem;
      padding: 0 0.2rem;
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
    padding: 0 0.2rem;
    // text-align: center;
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
  width: 0.58rem;
  height: 0.58rem;
  background: url(../img/close.png);
  background-size: 100% 100%;
  position: absolute;
  top: -0.2rem;
  right: -0.2rem;
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