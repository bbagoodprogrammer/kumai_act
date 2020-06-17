<template>
  <div class="functionCard">
    <div class="exclude">
      <div class="con">
        <div class="title">{{lang.changOne}}</div>
        <div class="price">{{lang.price}}</div>
        <div class="have">
          <em v-if="initData.skipOpened != '' || type == 2" class="used">{{lang.usedCard}}</em>
          <em v-else-if="initData.skipGot && initData.skipOpened == ''" class="has">{{lang.hasCard}}</em>
          <em v-else-if="!initData.skipGot" class="noHas">{{lang.noHas}}</em>
        </div>
        <div class="excludeBtn">
          <em v-if="initData.skipType != '' || type == 2" class="used">{{lang.usedCard}}</em>
          <em v-else-if="initData.skipGot && initData.skipOpened == ''" class="use" @click="useExclude()">{{lang.use}}</em>
          <em v-else-if="!initData.skipGot" class="buy" @click="buyExcludeCard(1)">{{lang.buy}}</em>
        </div>
      </div>
    </div>
    <div class="double">
      <div class="con">
        <div class="title">{{lang.nextDouble}}</div>
        <div class="price">{{lang.price2}}</div>
        <div class="have">
          <em v-if="initData.doubleUsed || initData.doubleOpened > 0" class="used">{{lang.usedCard}}</em>
          <em v-else-if="initData.doubleGot && !initData.doubleUsed && initData.doubleOpened == 0" class="has">{{lang.hasCard}}</em>
          <em v-else-if="!initData.doubleGot" class="noHas">{{lang.noHas}}</em>
        </div>
        <div class="excludeBtn">
          <em v-if="initData.doubleUsed && initData.doubleOpened > 0" class="used">{{lang.usedCard}}</em>
          <em v-else-if="initData.doubleUsed && initData.doubleOpened == 0" @click="rexUseDou()">{{lang.rexUse}}</em>
          <em v-else-if="initData.doubleGot && !initData.doubleUsed && initData.doubleOpened == 0" class="use" @click="useDoubleCard()">{{lang.use}}</em>
          <em v-else-if="!initData.doubleGot" class="buy" @click="buyExcludeCard(2)">{{lang.buy}}</em>
        </div>
      </div>
    </div>
    <div class="mask" v-show="showT">
      <transition name="slide">
        <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
      </transition>
    </div>
    <div class="mask" v-show="showBuyState">
      <transition name="slide">
        <div class="buyCon" v-show="showBuyState">
          <div class="content">
            <p class="title">{{typeTips[buyType].title}}</p>
            <p class="buyTips">{{typeTips[buyType].tips}}</p>
            <p class="buyPrice">{{typeTips[buyType].price}}</p>
            <img :src="typeTips[buyType].img" alt="">
            <div class="buyBtn">
              <span class="closeBuyPup" @click="closeBuyPup()">{{lang.query}}</span>
              <span class="closeBuyPup" @click="closeBuy()">{{lang.qux}}</span>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
import { globalBus } from '../utils/eventBus'
import MsgToast from "../components/commonToast"
import api from "../api/apiConfig"
export default {
  components: { MsgToast },
  computed: {
    ...mapState(['initData', 'type']),
  },
  data() {
    return {
      showT: false,
      tastMsg: '',
      showBuyState: false,
      buyType: 1,
      typeTips: {
        1: {
          title: this.lang.buyCardTitle1,
          tips: this.lang.buyCardTips1,
          price: this.lang.price,
          img: require('../assets/img/exd.png')
        },
        2: {
          title: this.lang.buyCardTitle2,
          tips: this.lang.nextDouble,
          price: this.lang.price2,
          img: require('../assets/img/doublePup.png')
        }
      }
    }
  },
  methods: {
    buyExcludeCard(val) {
      globalBus.$emit('commonEvent', () => {
        if (!this.initData.registered) {
          this.tastMsg = this.lang.goSingUp2
          this.showT = true
          return
        } else {
          this.buyType = val
          this.showBuyState = true
        }
      })
    },
    useExclude() {  //使用排除卡
      globalBus.$emit('commonEvent', () => {
        if (this.initData.chanceUsed == 5) {
          this.tastMsg = this.lang.noCards
          this.showT = true
          return
        }
        if (this.initData.chanceUsed > 0) {
          this.vxc('setType', 2)
        } else {
          this.tastMsg = this.lang.hfOne
          this.showT = true
        }
      })
    },
    useDoubleCard() { //用雙倍卡
      globalBus.$emit('commonEvent', () => {
        if (this.initData.chanceUsed == 5) {
          this.tastMsg = this.lang.noCards
          this.showT = true
          return
        }
        api.userCard(2).then(res => {
          if (res.data.response_status.code == 0) {
            this.vxc('setUseDouble', true)
          } else {
            this.showT = true
            this.tastMsg = res.data.response_status.error
          }
        })
      })
    },
    rexUseDou() {
      api.cancel().then(res => {
        this.vxc('setUseDouble', false)
      })
    },
    closeBuyPup() {
      api.buyCard(this.buyType).then(res => {
        const { response_status, response_data } = res.data
        if (response_status.code == 0) {
          this.showBuyState = false
          this.vxc('setBuyCard', this.buyType)
          this.$parent.refrsh(2)
        } else {
          this.showBuyState = false
          this.showT = true
          this.tastMsg = response_status.error
        }
      })
    },
    closeBuy() {
      this.showBuyState = false
    },
    closeToast() {
      this.showT = false
    }
  }
}
</script>
<style lang="scss" scoped>
.functionCard {
  height: 4.43rem;
  padding: 0 0.4rem;
  display: flex;
  .exclude {
    width: 3.26rem;
    height: 4.38rem;
    background: url(../assets/img/exclude.png);
    background-size: 100% 100%;
    position: relative;
  }
  .double {
    width: 3.26rem;
    height: 4.38rem;
    background: url(../assets/img/double.png);
    background-size: 100% 100%;
    margin-left: 0.18rem;
  }
  .con {
    width: 3rem;
    margin: 1.75rem auto 0;
    .title {
      height: 0.55rem;
      padding: 0 0.32rem;
      display: flex;
      align-items: center;
      font-size: 0.22rem;
      color: #fcf16a;
      font-weight: 600;
      text-align: center;
    }
    .price {
      text-align: center;
      height: 0.4rem;
      line-height: 0.4rem;
      font-size: 0.26rem;
      font-weight: 600;
    }
    .have {
      text-align: center;
      .used,
      .noHas {
        font-weight: 650;
        color: #a95d15;
        font-size: 0.24rem;
      }
      .has {
        color: #60ffee;
        font-size: 0.24rem;
      }
    }
    .excludeBtn {
      text-align: center;
      margin-top: 0.05rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      em {
        display: block;
        width: 2rem;
        height: 0.8rem;
        line-height: 0.75rem;
        background: url(../assets/img/cardBtn.png);
        background-size: 100% 100%;
        font-weight: 700;
        margin: 0 auto;
      }
    }
  }
  .buyCon {
    width: 5.45rem;
    height: 7.94rem;
    background: url(../assets/img/giftPup.png);
    background-size: 100% 100%;
    position: absolute;
    left: 1.09rem;
    top: 2rem;
    .content {
      width: 5.45rem;
      height: 5.2rem;
      margin-top: 2.4rem;
      text-align: center;
      .title {
        font-weight: 600;
        font-size: 0.32rem;
      }
      .buyTips {
        color: #fcf16a;
        font-size: 0.24rem;
        font-weight: 600;
        margin-top: 0.05rem;
      }
      .buyPrice {
        font-size: 0.24rem;
        font-weight: 500;
        margin-top: 0.06rem;
      }
      img {
        width: 2.14rem;
        height: 2.83rem;
        margin: 0.13rem auto 0;
      }
      .buyBtn {
        display: flex;
        justify-content: center;
        .closeBuyPup {
          display: block;
          width: 2rem;
          height: 0.8rem;
          margin-right: 0.15rem;
          background: url(../assets/img/cardBtn.png);
          background-size: 100% 100%;
          text-align: center;
          line-height: 0.78rem;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
