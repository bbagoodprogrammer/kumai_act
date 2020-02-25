<template>
  <div class="turnBox">
    <div class="mouseL"></div>
    <div class="mouseR"></div>
    <div class="coins">{{lang.GameB}}<i></i><em>{{daily_b}}</em></div>
    <div class="turntable">
      <span class="giftHistory" @click="goHistory()">{{lang.GiftHistory}}</span>
      <div class="giftItem" :style="{transform:'rotate('+nowAngle+'deg)'}"></div>
      <div class="needld">
        <div class="oneLuck" @click="luckGO(1)">
          <span>X1</span>
          <em>{{lang.numB1}}</em>
        </div>
        <div class="fireLuck" @click="luckGO(5)">
          <span>X5</span>
          <em>{{lang.numB2}}</em>
        </div>
      </div>
    </div>
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>

    <transition name="slide">
      <div class="getGift" v-show="showGetGift">
        <div class="getGiftCon" :class="{five:getGift_list.length == 5}">
          <span class="close" @click="closeGetGift()"></span>
          <div class="giftItemBox">
            <p class="fiveTitle" v-if="getGift_list.length == 5">{{lang.fiveTips}}</p>
            <div class="gift">
              <span v-for="(item,index) in getGift_list" :key="index">
                <div class="imgBox">
                  <img :src="getWardImg(item)" alt="" :class="'img'+index">
                </div>
                <p>{{getWardName(item)}}</p>
              </span>
            </div>
            <p class="luckGiftTips" v-if="getGift_list.length == 1">{{lang.CongratulationsOneGift}}{{getWardName(getGift_list[0])}},{{lang.CongratulationsGoPack}}</p>
            <p class="luckGiftTips" v-else-if="getGift_list.length == 5">{{lang.fiveTips2}}
            </p>
          </div>
        </div>
      </div>
    </transition>

    <transition name="slide">
      <div class="noConisTips2" v-show="showNoCoins">
        <div class="noCoinsCon">
          <span class="close" @click="closeNoCoins()"></span>
          <p>{{lang.noCoinsTips4}}{{lang.noCoinsTips2}}</p>
          <span class="doTask" @click="goTask()">{{lang.goGetConis}}</span>
        </div>
      </div>
    </transition>
  </div>

</template>
<script>
import api from "../api/apiConfig"
import { mapState } from "vuex"
import MsgToast from "../components/commonToast"
import getString from "../utils/getString"
import { globalBus } from "../utils/eventBus"
import { wardImg, wardName } from "../config/ward"
import lang from "../config/lang"
export default {
  components: { MsgToast },
  data() {
    return {
      giftAngle: {
        1: 0, //30金豆
        2: 330, //30游戏币
        3: 300,  //10金豆
        4: 270,  //2%返利券
        5: 240,  //3金币
        6: 210,    //30经验值
        7: 180,   //VIP3天
        8: 150,    //3%储值返利券
        9: 120,  //20金币
        10: 90,  //满100送10返利券
        11: 60,   //浪漫飞艇
        12: 30,   //40游戏币
      },
      nowAngle: 0,
      giftIndex: 0,
      tastMsg: '',
      showT: false,
      getGift_list: [],
      showGetGift: false,
      showNoCoins: false,
      luckIng: false
    }
  },
  computed: {
    ...mapState(['groupsUserMsg', 'daily_b', 'registered'])
  },
  methods: {
    luckGO(val) {
      globalBus.$emit('commonEvent', callback => {
        if (this.luckIng) return
        if (!this.registered) {
          this.tastMsg = lang.NoSingUp
          this.showT = true
        } else {
          if (this.daily_b < 20 * val) {
            this.showNoCoins = true
          } else {
            this.luckIng = true
            api.go(val).then(res => {
              if (res.data.response_status.code == 0) {
                this.getGift_list = res.data.response_data.gift_ids
                this.giftIndex = this.getGift_list[0]
                this.turnAngle()     //動畫開始
                setTimeout(() => {   //禮物彈窗
                  this.showGetGift = true
                  this.$store.commit('reduceB', val * 20)
                  this.$store.commit('addTotalScore', val * 20)
                  var coins = 0
                  this.getGift_list.forEach(element => {
                    if (element == 2) {
                      coins += 30
                    } else if (element == 12) {
                      coins += 40
                    }
                  })
                  this.$store.commit('addB', coins)
                  this.luckIng = false
                }, 5000);
              } else {
                this.tastMsg = res.data.response_status.error
                this.showT = true
              }
            })
          }
        }
      })
    },
    turnAngle() {
      if (this.nowAngle % 360 > this.giftAngle[this.giftIndex]) { //目标礼物在前面
        this.nowAngle += 1800 + (this.giftAngle[this.giftIndex] - this.nowAngle % 360)
      } else if (this.nowAngle % 360 < this.giftAngle[this.giftIndex]) {
        this.nowAngle += 1800 + (360 - (this.nowAngle % 360)) + this.giftAngle[this.giftIndex]
      } else if (this.nowAngle % 360 == this.giftAngle[this.giftIndex]) {
        this.nowAngle += 1800
      }
    },
    getWardImg(giftId) {
      return wardImg[giftId]
    },
    getWardName(giftId) {
      return wardName[giftId]
    },
    closeGetGift() {
      this.showGetGift = false
    },
    closeToast() {
      this.showT = false
    },
    goHistory() {
      globalBus.$emit('commonEvent', callback => {
        let regstr = getString('token')
        location.href = `./index4.html?token=${regstr}`
      })
    },
    goTask() {
      globalBus.$emit('tabClick', 2, 1)
      this.showNoCoins = false
    },
    closeNoCoins() {
      this.showNoCoins = false
    },
  }
}
</script>
<style lang="scss" scoped>
.turnBox {
  position: relative;
  margin-top: 0.76rem;
  .coins {
    display: flex;
    align-items: center;
    color: #ffe0aa;
    position: absolute;
    top: -0.6rem;
    left: 2.61rem;
    i {
      display: block;
      width: 0.4rem;
      height: 0.41rem;
      background: url(../assets/img/coins.png);
      background-size: 100% 100%;
      margin-right: 0.05rem;
    }
  }
  .mouseL {
    width: 1.37rem;
    height: 1.56rem;
    background: url(../assets/img/mouseL.png);
    background-size: 100% 100%;
    position: absolute;
    z-index: -10;
    left: 0.2rem;
    top: -0.2rem;
  }
  .mouseR {
    width: 1.46rem;
    height: 1.55rem;
    background: url(../assets/img/mouseR.png);
    background-size: 100% 100%;
    position: absolute;
    z-index: -10;
    right: 0.2rem;
    top: -0.2rem;
  }
  .turntable {
    width: 7.36rem;
    height: 7.4rem;
    margin: 0 auto;
    background: url(../assets/img/turnBg.png);
    background-size: 100% 100%;
    position: relative;
    overflow: hidden;
    z-index: 10;
    .giftHistory {
      width: 1.5rem;
      height: 0.54rem;
      color: #ffc954;
      font-size: 70%;
      text-align: center;
      background: url(../assets/img/historyBg.png);
      background-size: 100% 100%;
      position: absolute;
      bottom: 0.12rem;
      right: 0.19rem;
      display: flex;
      align-items: center;
      justify-content: center;
      // white-space: nowrap;
    }
    .giftItem {
      width: 5.76rem;
      height: 5.75rem;
      transition: transform 5s ease;
      background: url(../assets/img/giftItem.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.73rem;
      left: 0.8rem;
    }
    .needld {
      width: 2.08rem;
      height: 2rem;
      padding-top: 0.36rem;
      background: url(../assets/img/needld.png);
      background-size: 100% 100%;
      position: absolute;
      top: 2.29rem;
      left: 2.64rem;
      .oneLuck {
        width: 2.08rem;
        height: 0.8rem;
        padding-top: 0.2rem;
        border-radius: 1rem 1rem 0 0;
        span {
          display: block;
          text-align: center;
          font-style: italic;
        }
        em {
          font-size: 72%;
          color: #ffdab6;
          display: block;
          text-align: center;
        }
      }
      .fireLuck {
        width: 2.08rem;
        height: 50%;
        border-radius: 0 0 1rem 1rem;
        span {
          display: block;
          text-align: center;
          font-style: italic;
        }
        em {
          font-size: 72%;
          color: #ffdab6;
          display: block;
          text-align: center;
        }
      }
    }

    @keyframes trun {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(1turn);
      }
    }
  }
}
.getGift {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.8);
  .getGiftCon {
    width: 4.91rem;
    // height: 2.83rem;
    padding-bottom: 0.25rem;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -40%);
    background: linear-gradient(
      0deg,
      rgba(211, 61, 59, 1),
      rgba(255, 94, 92, 1)
    );
    border: 0.04rem solid rgba(255, 244, 137, 1), rgba(255, 249, 214, 1);
    border-radius: 0.4rem;
    .giftItemBox {
      .fiveTitle {
        text-align: center;
        color: #ffe178;
        margin-top: 0.1rem;
      }
      .gift {
        // height: 2rem;
        padding-top: 0.4rem;
        text-align: center;
        span {
          display: inline-block;
          vertical-align: top;
          width: 33%;
          // height: 1.5rem;
          img {
            display: block;
            margin: 0 auto;
            width: 0.95rem;
            height: 0.95rem;
          }
          p {
            text-align: center;
            font-size: 80%;
            line-height: 0.3rem;
            margin-top: 0.05rem;
            padding: 0 0.1rem;
            // color: #ffe178;
          }
        }
      }
      .luckGiftTips {
        margin-top: 0.25rem;
        padding: 0 0.1rem;
        font-size: 80%;
        color: #ffe0aa;
        text-align: center;
      }
    }
    .close {
      display: block;
      width: 0.42rem;
      height: 0.42rem;
      position: absolute;
      top: -0.6rem;
      right: 0rem;
      background: url(../assets/img/getGiftClose.png);
      background-size: 100% 100%;
    }
    &.five {
      // height: 5.14rem;
      // background: url(../assets/img/getGift2.png);
      // background-size: 100% 100%;
      .gift {
        // height: 3.5rem;
        padding-top: 0.33rem;
        span {
          margin-top: 0.1rem;
          p {
            word-wrap: break-word;
          }
        }
        .imgBox {
          width: 1rem;
          height: 1rem;
          margin: 0 auto;
          img {
            display: block;
            margin: 0 auto;
          }
        }
      }
      // .luckGiftTips {
      //   margin-top: 0.53rem;
      // }
    }
  }
}
.noConisTips2 {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10000;
  .noCoinsCon {
    width: 4.8rem;
    // height: 2.12rem;
    padding: 0.5rem 0 0.3rem 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(
      0deg,
      rgba(211, 61, 59, 1),
      rgba(255, 94, 92, 1)
    );
    border: 0.04rem solid rgba(255, 244, 137, 1), rgba(255, 249, 214, 1);
    border-radius: 0.4rem;
    .close {
      display: block;
      width: 0.42rem;
      height: 0.42rem;
      background: url(../assets/img/getGiftClose.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      top: -1rem;
    }
    p {
      text-align: center;
      color: #ffdab6;
      font-size: 80%;
      line-height: 0.6rem;
    }
    span {
      display: block;
      width: 2.33rem;
      height: 0.81rem;
      line-height: 0.25rem;
      margin: 0.3rem auto 0;
      text-align: center;
      background: url(../assets/img/taskBgAct.png);
      background-size: 100% 100%;
      font-size: 93%;
      color: #b98300;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
