<template>
  <div class="giftBox" :class="{type2:type==2}">
    <div class="title">
      <span @click="tabClick(1)"></span>
      <span @click="tabClick(2)"></span>
    </div>
    <RoolMsg />
    <div class="goldGift"></div>
    <div class="goBtnBox">
      <span class="goType1" @click="luck(1)"></span>
      <span class="goType2" @click="luck(10)"></span>
    </div>
    <div class="keys">
      <i></i>
      <strong>剩餘：<em>{{keyNum}}</em></strong>
      <div class="getKey" @click="showBuyKeys()"></div>
    </div>
    <div class="mask" v-show="buyKeysPup">
      <transition name="slide">
        <div class="buyKeysPup" v-if="buyKeysPup">
          <i class="close" @click="closeBuyKeyPup()"></i>
          <div class="title"></div>
          <p class="tips">購買藍色經典頭像框（{{buyKeyNum*1}}天），可獲贈鑰匙x{{buyKeyNum*2}}</p>
          <div class="keyGift">
            <span class="frame">
              <strong>
                <em>({{buyKeyNum}}天)</em>
                <i>蓝色经典头像框</i>
              </strong>
            </span>
            <span class="key">
              <em>x{{buyKeyNum*2}}</em>
            </span>
          </div>
          <div class="buyNum">
            <div class="num">
              <span class="reduex" @click="reduexKey()"></span>
              <input type="number" v-model="buyKeyNum">
              <span class="add" @click="addKey()"></span>
            </div>
          </div>
          <div class="buyBtn" @click="buyKeys()">金幣{{buyKeyNum*200}}購買</div>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="prizesPup">
      <transition name="slide">
        <div class="prizes" v-if="prizesPup">
          <i class="close" @click="closePeizesPup()"></i>
          <div class="title"></div>
          <div class="prizesBox" :class="{one:prizes.length ==1}">
            <span v-for="(item,index) in prizes" :key="index">
              <img :src="item.image" alt="" v-if="item.image">
              <img :src="require(`../assets/img/gifts/${item.type}.png`)" alt="" v-else>
              <strong v-if="item.name && item.type!='frame'" :class="'lv' + item.level">{{item.name}} {{item.day?`(${item.day}天)`:`*${item.count}`}}</strong>
              <strong v-else :class="'lv' + item.level">{{getName(item)}}</strong>
            </span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import RoolMsg from "../components/RoolMsg"
import { mapState } from "vuex"
import api from "../api/apiConfig"
export default {
  components: { RoolMsg },
  computed: {
    ...mapState(['keyNum', 'open_keys'])
  },
  data() {
    return {
      type: 1,
      luckIng: false,
      prizes: [],
      buyKeysPup: false,
      prizesPup: false,
      buyKeyNum: 1
    }
  },
  methods: {
    tabClick(val) {
      this.type = val
    },
    luck(num) {
      if (this.luckIng) return
      this.luckIng = true
      let needKeyNum = this.open_keys[this.type][num]
      if (this.keyNum >= needKeyNum) {
        api.luckDraw(this.type, num).then(res => {
          if (res.data.response_status.code == 0) {
            this.prizes = res.data.response_data.prizes
            this.ModalHelper.afterOpen()
            this.prizesPup = true
            let num = 0
            this.prizes.forEach(element => {
              if (element.type == 'fragment') {
                num += element.count
              }
            });
            this.vxc('reduxKeys', {
              needKeyNum: needKeyNum,
              frames: num
            })
            this.luckIng = false
          } else {
            this.luckIng = false
            this.vxc('setToast', {
              msg: res.data.response_status.error
            })
          }
        })
      } else {
        this.vxc('setToast', {
          type: 4,
          title: '鑰匙不足',
          msg: '前往獲取鑰匙',
          cb: this.showBuyKeys
        })
        this.luckIng = false
      }
    },
    getName(item) {
      if (item.type == 'coin') {
        return `${item.coins}金幣`
      } else if (item.type == 'frame') {
        return `${item.name}頭像框(${item.days}天) x1`
      } else if (item.type == 'fragment') {
        return `寶藏碎片x${item.count}`
      }
    },
    buyKeys() {
      api.buyKeys(this.buyKeyNum).then(res => {
        if (res.data.response_status.code == 0) {
          this.vxc('setToast', {
            title: '購買成功',
            msg: `前往上城查看頭像框，</br>成功獲得贈送鑰匙${this.buyKeyNum * 2}`,
          })
          this.vxc('addKeys', this.buyKeyNum * 2)
        } else {
          this.vxc('setToast', {
            type: 3,
            title: '購買失敗',
            msg: res.data.response_status.error,
            cb: this.walletpage
          })
        }
      })
    },
    reduexKey() {
      if (this.buyKeyNum <= 1) return
      this.buyKeyNum--
    },
    addKey() {
      this.buyKeyNum++
    },
    showBuyKeys() {
      this.buyKeysPup = true
    },
    walletpage() {
      const ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      try {
        if (ios) {
          // goWalletpage()
          sendJsData('app://walletpage');
        } else {
          javascript: JSInterface.sendJsData('app://walletpage');
        }
      } catch (e) {
        console.log(e)
      }
    },
    closeBuyKeyPup() {
      this.buyKeysPup = false
      this.buyKeyNum = 1
    },
    closePeizesPup() {
      this.prizesPup = false
      this.ModalHelper.beforeClose()
    }
  }
}
</script>
<style lang="scss">
.giftBox {
  width: 7.03rem;
  height: 10.79rem;
  padding-top: 0.14rem;
  background: url(../assets/img/giftBoxBg.png);
  background-size: 100% 100%;
  margin: 0 auto;
  position: relative;
  > .title {
    width: 5.46rem;
    height: 0.71rem;
    background: url(../assets/img/tabs.png);
    background-size: 100% 100%;
    display: flex;
    position: absolute;
    top: -0.6rem;
    left: 0.78rem;
    span {
      flex: 1;
    }
  }
  .goldGift {
    width: 6.25rem;
    height: 7.98rem;
    background: url(../assets/img/goldGift.png);
    background-size: 100% 100%;
    margin: 0.24rem auto 0;
  }
  .goBtnBox {
    margin-top: 0.24rem;
    padding: 0 0.39rem;
    display: flex;
    justify-content: space-between;
    span {
      width: 3.02rem;
      height: 1.02rem;
      &.goType1 {
        background: url(../assets/img/goType1.png);
        background-size: 100% 100%;
      }
      &.goType2 {
        background: url(../assets/img/goType2.png);
        background-size: 100% 100%;
      }
    }
  }
  .keys {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.1rem;
    i {
      width: 0.28rem;
      height: 0.28rem;
      background: url(../assets/img/keyIcon.png);
      background-size: 100% 100%;
      margin-right: 0.1rem;
    }
    strong {
      vertical-align: middle;
      font-size: 0.24rem;
      font-weight: bold;
    }
    .getKey {
      width: 1.76rem;
      height: 0.46rem;
      background: url(../assets/img/getKey.png);
      background-size: 100% 100%;
      margin-left: 0.27rem;
    }
  }
  &.type2 {
    background: url(../assets/img/giftBoxBg2.png);
    background-size: 100% 100%;
    .title {
      background: url(../assets/img/tabs2.png);
      background-size: 100% 100%;
    }
    .goldGift {
      background: url(../assets/img/goldGift2.png);
      background-size: 100% 100%;
    }
    .goBtnBox {
      .goType1 {
        background: url(../assets/img/goType3.png);
        background-size: 100% 100%;
      }
      .goType2 {
        background: url(../assets/img/goType4.png);
        background-size: 100% 100%;
      }
    }
  }
  .prizes {
    width: 6.07rem;
    // height: 9rem;
    position: absolute;
    .title {
      width: 1.89rem;
      height: 0.45rem;
      background: url(../assets/img/prizeTitle.png);
      background-size: 100% 100%;
      margin: 0 auto;
    }
    .prizesBox {
      margin-top: 0.69rem;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      span {
        width: 25%;
        img {
          width: 1.36rem;
          height: 1.36rem;
          display: block;
          margin: 0 auto;
        }
        strong {
          display: block;
          font-size: 0.22rem;
          font-weight: bold;
          text-align: center;
          color: #74e4ff;
          height: 0.7rem;
          display: flex;
          align-items: center;
          justify-content: center;
          &.lv2 {
            color: #f678fb;
          }
          &.lv3 {
            color: #fae234;
          }
        }
      }
      &.one {
        span {
          flex: 1;
          img {
            width: 2.72rem;
            height: 2.72rem;
          }
          strong {
            font-size: 0.36rem;
            font-weight: bold;
          }
        }
      }
    }
    .close {
      display: block;
      width: 0.22rem;
      height: 0.22rem;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
      position: absolute;
      top: -0.5rem;
      right: 0;
    }
  }
  .buyKeysPup {
    width: 6.86rem;
    height: 6.2rem;
    background: rgba(130, 23, 243, 1);
    border: 0.04rem solid rgba(246, 229, 64, 1);
    border-radius: 0.4rem;
    position: relative;
    .title {
      width: 1.64rem;
      height: 0.39rem;
      background: url(../assets/img/buyKeysTitle.png);
      background-size: 100% 100%;
      margin: 0.5rem auto 0;
    }
    .tips {
      margin-top: 0.27rem;
      font-size: 0.26rem;
      font-weight: 500;
      text-align: center;
    }
    .keyGift {
      padding: 0 0.18rem;
      display: flex;
      justify-content: space-between;
      span {
        width: 3.2rem;
        height: 3.24rem;
        &.frame {
          background: url(../assets/img/frame.png);
          background-size: 100% 100%;
          position: relative;
          strong {
            width: 2.2rem;
            height: 0.6rem;
            position: absolute;
            left: 0.46rem;
            bottom: 0.43rem;
            text-align: center;
            em {
              display: block;
              font-size: 0.22rem;
              text-align: center;
            }
            i {
              font-size: 0.24rem;
              text-align: center;
            }
          }
        }
        &.key {
          background: url(../assets/img/key.png);
          background-size: 100% 100%;
          position: relative;
          em {
            font-size: 0.54rem;
            font-weight: bold;
            color: #f9d832;
            position: absolute;
            bottom: 0.42rem;
            right: 0.6rem;
          }
        }
      }
    }
    .buyNum {
      margin-top: 0.15rem;
      .num {
        width: 2.2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-left: 0.6rem;
        span {
          width: 0.36rem;
          height: 0.36rem;
          &.reduex {
            background: url(../assets/img/reduex.png);
            background-size: 100% 100%;
          }
          &.add {
            background: url(../assets/img/add.png);
            background-size: 100% 100%;
          }
        }
        input {
          width: 1.3rem;
          height: 0.63rem;
          outline: none;
          background: #7407e6;
          border: none;
          text-align: center;
          color: #fff;
        }
      }
    }
    .buyBtn {
      width: 3.25rem;
      height: 1.02rem;
      background: url(../assets/img/buyBtn.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0.45rem;
      bottom: 0.38rem;
      text-align: center;
      line-height: 0.8rem;
      font-weight: bold;
      color: #8218f3;
    }
    .close {
      display: block;
      width: 0.22rem;
      height: 0.22rem;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
      position: absolute;
      top: -0.5rem;
      right: 0;
    }
  }
}
</style>
