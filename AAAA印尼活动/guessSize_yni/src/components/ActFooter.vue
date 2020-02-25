<template>
  <div>
    <div class="footerBar">
      <div class="acrStatus">
        <span class="goAct" v-if="astState === 1" @click="singUp()">Mendaftar untuk ikut </span>
        <span class="actIng" v-if="astState === 3">
          <span class="type1" @click="showVuePopup(true)" v-if="owner_msg.bets && owner_msg.bets.length===0" :class="{gray:actStatus === 2}">Bet</span>
          <span class="type2" v-else>Kali ini telah bet</span>
        </span>
      </div>
    </div>
    <transition name="slide">
      <div class="vue-popup" v-if="astState === 3" v-show="show2">
        <div class="popup-content">
          <i class="close" @click="showVuePopup(false)"></i>
          <div class="title">
            <div class="left">Jumlah bet:<em>{{owner_msg.b}}</em></div>
            <div class="right">Taruhan minimal adalah 50,</br>
              setiap kali tambah atau berkurang10</div>
          </div>
          <div class="pointMsg">
            <div v-if="actPoints1.key" class="point1">
              <div class="point1Left">
                <span :class="actPoints1.key">
                  <img :src="actPoints1.img">
                  <em>1 : 1</em>
                  <p class="title">{{actPoints1.choice}}</p>
                </span>
              </div>
              <div class="point1right">
                <div class="comisNum">
                  <span @click="reduce1()"></span>
                  <input type="text" v-model="coins1" oninput="value=value.replace(/[^\d]/g,'')" onfocus="this.scrollIntoView(true);this.scrollIntoViewIfNeeded();" @change="change1()">
                  <span @click="add1()"></span>
                </div>
              </div>
            </div>
            <div v-if="actPoints2.key" class="point2">
              <p>
                Menang 1 mendapatkan 1 kali lipat</br>
                Menang 2 mendapatkan 2 kali lipat</br>
                Menang 3 mendapatkan 3 kali lipat
              </p>
              <div class="cbtn">
                <span class="coinsItem">
                  <img :src="actPoints2.img" alt="">
                </span>
                <div class="point2right">
                  <div class="comisNum">
                    <span @click="reduce2()"></span>
                    <input type="text" v-model="coins2" oninput="value=value.replace(/[^\d]/g,'')" onfocus="this.scrollIntoView(true);this.scrollIntoViewIfNeeded();" @change="change2()">
                    <span @click="add2()"></span>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="actPoints3.key" class="point3">
              <div class="point3Left">
                <span :class="actPoints3.key">
                  <img :src="actPoints3.img">
                  <em>1 : {{actPoints3.multiple}}</em>
                  <p class="title">Total skor</p>
                </span>
              </div>
              <div class="point3right">
                <div class="comisNum">
                  <span @click="reduce3()"></span>
                  <input type="text" v-model="coins3" oninput="value=value.replace(/[^\d]/g,'')" onfocus="this.scrollIntoView(true);this.scrollIntoViewIfNeeded();" @change="change3()">
                  <span @click="add3()"></span>
                </div>
              </div>
            </div>
            <p v-show="!actPoints1.key && !actPoints2.key && !actPoints3.key" class="noChange">Anda belum memilih metode taruhan</p>
          </div>
          <p class="msg">
            Kali ini total bet {{totalNum}}, setelah konfirmasi,tidak dapat menambah atau memodifikasi taruhan: {{hours}}
          </p>
          <div class="changBtn">
            <span v-if="actPoints1.key || actPoints2.key || actPoints3.key" @click="betting()">Ya</span>
            <span v-else @click="showVuePopup(false)" class="noChange">Silakan bertaruh dulu</span>
          </div>
        </div>
      </div>
    </transition>
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import MsgToast from "../components/commonToast"
import api from "../api/apiConfig"
import { globalBus } from '../utils/eventBus'
export default {
  components: { MsgToast },
  data() {
    return {
      show2: false,
      tasksList: [],
      coins1: 50,
      coins2: 50,
      coins3: 50,
      tastMsg: '',
      showT: false,
    }
  },
  created() {
  },
  computed: {
    ...mapState(['actStatus', 'owner_msg', "isShare", "actPoints1", "actPoints2", "actPoints3", "hours"]),
    astState() {
      if (this.actStatus === 0) { //活动未开始
        return 1
      } else if (this.actStatus === 2 && this.owner_msg.is_reg === 1) { //活动已结束
        return 3
      } else if (this.actStatus === 2 && this.owner_msg.is_reg === 0) { //活动已结束
        return 1
      } else if ((this.actStatus === 1 && this.owner_msg.is_reg === 0) || this.isShare) { //活动开始未报名，或者分享
        return 1
      } else if (this.actStatus === 1 && this.owner_msg.is_reg === 1) { //活动开始已报名
        return 3
      }
    },
    totalNum() {
      var totalNum = 0
      if (this.actPoints1.key) {
        totalNum += Number(this.coins1)
      }
      if (this.actPoints2.key) {
        totalNum += Number(this.coins2)
      }
      if (this.actPoints3.key) {
        totalNum += Number(this.coins3)
      }
      return totalNum
    }
  },
  methods: {
    showVuePopup(flag) {
      globalBus.$emit('commonEvent', () => {
        this.show2 = flag
      })
    },
    betting() {//投注
      globalBus.$emit('commonEvent', () => {
        let betChange = {}
        let totalCoins = 0
        if (this.actPoints1.key) {
          let first = {
            key: this.actPoints1.key,
            b: this.coins1
          }
          betChange.first = first
          totalCoins += this.coins1 * 1
        }
        if (this.actPoints2.key) {
          let second = {
            key: this.actPoints2.key,
            b: this.coins2
          }
          betChange.second = second
          totalCoins += this.coins2 * 1
        }
        if (this.actPoints3.key) {
          let third = {
            key: this.actPoints3.key,
            b: this.coins3
          }
          betChange.third = third
          totalCoins += this.coins3 * 1
        }
        // betChange.totalCoins = totalCoins
        if (Object.keys(betChange).length > 0 && this.owner_msg.b >= totalCoins) { //有押注
          api.betting(betChange).then(res => {
            if (res.data.response_status.code === 0) {
              let newObj = {
                betChange: betChange,
                totalCoins: totalCoins
              }
              this.$store.commit('changeIsBetting', newObj)
              this.showVuePopup(false)
            } else {
              this.tastMsg = res.data.response_status.error
              this.showT = true
            }
          })
        } else if (Object.keys(betChange).length > 0 && this.owner_msg.b < totalCoins) {  //余额不足
          this.tastMsg = `Jumlah taruhan tidak mencukupi`
          this.showT = true
        }
      })
    },
    reduce1() {
      if (this.coins1 > 50) {
        this.coins1 = this.coins1 * 1 - 10
      }
    },
    add1() {
      this.coins1 = this.coins1 * 1 + 10
    },
    change1() {
      if (this.coins1 < 50) { //提示要大于五十
        this.coins1 = 50
        this.tastMsg = `Taruhan minimal adalah 50`
        this.showT = true
      } else if (this.coins1 % 10 !== 0) {
        this.coins1 = 50
        this.tastMsg = `setiap kali tambah atau berkurang10`
        this.showT = true
      }
    },
    reduce2() {
      if (this.coins2 > 50) {
        this.coins2 = this.coins2 * 1 - 10
      }
    },
    add2() {
      this.coins2 = this.coins2 * 1 + 10
    },
    change2() {
      if (this.coins2 < 50) { //提示要大于五十
        this.coins2 = 50
        this.tastMsg = `Taruhan minimal adalah 50`
        this.showT = true
      } else if (this.coins2 % 10 !== 0) {
        this.coins2 = 50
        this.tastMsg = `setiap kali tambah atau berkurang10`
        this.showT = true
      }
    },
    reduce3() {
      if (this.coins3 > 50) {
        this.coins3 = this.coins3 * 1 - 10
      }
    },
    add3() {
      this.coins3 = this.coins3 * 1 + 10
    },
    change3() {
      if (this.coins3 < 50) { //提示要大于五十
        this.coins3 = 50
        this.tastMsg = `Taruhan minimal adalah 50`
        this.showT = true
      } else if (this.coins3 % 10 !== 0) {
        this.coins3 = 50
        this.tastMsg = `setiap kali tambah atau berkurang10`
        this.showT = true
      }
    },
    singUp() {
      globalBus.$emit('commonEvent', () => {
        api.singUp().then(res => {
          if (res.data.response_status.code === 0) {
            this.$store.commit('singUp')
          }
          else {
            this.tastMsg = res.data.response_status.error
            this.showT = true
          }
        })
      })
    },
    closeTaskList() {
      this.shotasks = false
    },
    closeToast() {
      this.showT = false
    }
  }
}
</script>
<style lang="scss">
.footerBar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  .acrStatus {
    width: 7.5rem;
    height: 1.75rem;
    margin: auto;
    text-align: center;
    display: flex;
    justify-content: center;
    // background: url() no-repeat;
    // background-size: contain;
    span {
      display: inline-block;
    }
    .goAct {
      display: block;
      width: 3.82rem;
      height: 1.01rem;
      line-height: 0.8rem;
      font-weight: bold;
      font-size: 110%;
      margin-top: 0.2rem;
      background: url(../assets/img/singUp.png);
      background-size: 100% 100%;
    }
  }
  .type1 {
    display: block;
    width: 2.7rem;
    height: 0.98rem;
    background: url(../assets/img/footerBtn.png);
    background-size: 100% 100%;
    line-height: 1rem;
    font-weight: bold;
    font-size: 120%;
    margin-top: 0.2rem;
    &.gray {
      background: url(../assets/img/footerBtned.png);
      background-size: 100% 100%;
    }
  }
  .type2 {
    display: block;
    width: 2.7rem;
    height: 0.98rem;
    background: url(../assets/img/footerBtned.png);
    background-size: 100% 100%;
    line-height: 1rem;
    font-weight: bold;
    font-size: 90%;
    margin-top: 0.2rem;
  }
  .taskBtm {
    color: red;
    text-align: center;
  }
}
button {
  display: block;
  width: 300px;
  height: 44px;
  margin: 20px auto;
  border-radius: 4px;
  background-color: #3884ff;
  color: #fff;
}
.vue-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10000;
  .popup-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 5.86rem;
    padding: 0.32rem 0.27rem 0.7rem;
    z-index: 1000;
    background: rgba(22, 58, 60, 1);
    border: 0.1rem solid rgba(14, 154, 213, 1);
    border-radius: 0.52rem;
    // -webkit-transition: all 0.2s ease-in;
    // transition: all 0.2s ease-in;
    .close {
      display: block;
      width: 0.62rem;
      height: 0.62rem;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
      position: absolute;
      top: -1rem;
      right: 0rem;
    }
    > .title {
      height: 0.62rem;
      display: flex;
      .left {
        // width: 1.6rem;
        height: 0.62rem;
        padding: 0 0.2rem;
        background: #041313;
        border-radius: 0.5rem;
        line-height: 0.6rem;
        color: #659c9c;
        font-size: 80%;
        display: flex;
        white-space: nowrap;
        em {
          display: inline-block;
          width: 1rem;
          text-align: center;
          color: #fff261;
          font-size: 110%;
          font-weight: bold;
        }
      }
      .right {
        color: #51a6a6;
        font-size: 70%;
        margin-left: 0.15rem;
        margin-top: -0.2rem;
      }
    }
    .pointMsg {
      margin-top: 0.24rem;
      width: 5.86rem;
      min-height: 1rem;
      > div {
        background: #0b292b;
        border-radius: 0.52rem;
      }
      .noChange {
        font-size: 80%;
        color: #51a6a6;
        text-align: center;
      }
      .point1 {
        height: 1.82rem;
        display: flex;
        align-items: center;
        padding-bottom: 0.2rem;
        .point1Left {
          margin-left: 0.7rem;
          span {
            display: inline-block;
            width: 1.32rem;
            height: 1.21rem;
            margin-top: 0.7rem;
            text-align: center;
            // line-height: 1rem;
            background: url(../assets/img/point1.png);
            background-size: 100% 100%;
            position: relative;
            img {
              display: block;
              margin: 0.18rem auto;
            }
            em {
              margin-top: 0.15rem;
              color: #97461a;
              font-size: 70%;
            }
            .title {
              position: absolute;
              width: 1.32rem;
              top: -0.62rem;
              font-size: 80%;
              color: #22808a;
            }
            &.first_1 {
              img {
                width: 0.8rem;
                height: 0.31rem;
              }
            }
            &.first_2 {
              margin-right: 0.2rem;
              img {
                width: 0.66rem;
                height: 0.32rem;
              }
            }
            &.first_3 {
              img {
                width: 1.14rem;
                height: 0.38rem;
              }
            }
            &.first_4 {
              img {
                width: 0.91rem;
                height: 0.32rem;
              }
            }
          }
        }
        .point1right {
          width: 2.38rem;
          height: 0.7rem;
          background: url(../assets/img/num.png);
          background-size: 100% 100%;
          margin: 0.5rem 0 0 1.1rem;
          .comisNum {
            display: flex;
            justify-content: space-between;
            span {
              display: inline-block;
              width: 0.73rem;
              height: 0.7rem;
            }
            input {
              width: 0.8rem;
              color: #fff;
              text-align: center;
              background: none;
              outline: none;
              border: none;
            }
          }
        }
      }
      .point2 {
        margin-top: 0.2rem;
        padding: 0.2rem 0.37rem 0.2rem;
        > p {
          font-size: 80%;
          color: #22808a;
          text-align: center;
        }
        .cbtn {
          margin-top: 0.2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .coinsItem {
            display: inline-block;
            width: 0.88rem;
            height: 0.83rem;
            background: url(../assets/img/point2Bg.png);
            background-size: 100% 100%;
            position: relative;
            margin-left: 0.5rem;
            img {
              display: block;
              width: 0.24rem;
              height: 0.35rem;
              margin: 0.22rem auto;
            }
          }
          .point2right {
            width: 2.38rem;
            height: 0.7rem;
            background: url(../assets/img/num.png);
            background-size: 100% 100%;
            .comisNum {
              display: flex;
              justify-content: space-between;
              span {
                display: inline-block;
                width: 0.73rem;
                height: 0.7rem;
              }
              input {
                width: 0.8rem;
                color: #fff;
                text-align: center;
                background: none;
                outline: none;
                border: none;
              }
            }
          }
        }
      }
      .point3 {
        margin-top: 0.2rem;
        display: flex;
        align-items: center;
        padding: 0.2rem 0.37rem 0.2rem;
        .point3Left {
          > span {
            display: inline-block;
            width: 1.71rem;
            height: 1.21rem;
            background: url(../assets/img/point3Bg.png);
            background-size: 100% 100%;
            margin: 0.56rem 0.16rem 0 0;
            position: relative;
            .title {
              position: absolute;
              width: 1.72rem;
              text-align: center;
              top: -0.4rem;
              font-size: 80%;
              color: #22808a;
            }
            img {
              width: 1.2rem;
              height: 0.32rem;
              display: block;
              margin: 0.26rem auto 0;
            }
            em {
              display: block;
              text-align: center;
              color: #97461a;
              font-size: 70%;
              margin: 0.2rem auto;
            }
          }
        }
        .point3right {
          width: 2.38rem;
          height: 0.7rem;
          background: url(../assets/img/num.png);
          background-size: 100% 100%;
          margin: 0.5rem 0 0 1rem;
          .comisNum {
            display: flex;
            justify-content: space-between;
            span {
              display: inline-block;
              width: 0.73rem;
              height: 0.7rem;
            }
            input {
              width: 0.8rem;
              color: #fff;
              text-align: center;
              background: none;
              outline: none;
              border: none;
            }
          }
        }
      }
    }
    .msg {
      margin-top: 0.17rem;
      text-align: center;
      color: #51a6a6;
      font-size: 80%;
    }
    .changBtn {
      width: 2.8rem;
      height: 0.98rem;
      background: url(../assets/img/footerBtn.png);
      background-size: 100% 100%;
      position: absolute;
      left: 1.9rem;
      bottom: -0.5rem;
      span {
        display: block;
        width: 100%;
        height: 100%;
        font-size: 110%;
        text-align: center;
        line-height: 0.98rem;
        font-weight: bold;
        &.noChange {
          font-size: 70%;
        }
      }
    }
  }
}
.mask {
  z-index: 10;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  transition: all 0.2s ease-in;
}
</style>
