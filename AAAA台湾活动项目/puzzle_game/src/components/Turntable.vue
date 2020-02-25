<template>
  <div class="turntable">
    <div class="trunLamp">
    </div>
    <div class="giftItem" :style="{transform:'rotate('+nowAngle+'deg)'}">
    </div>
    <div class="needld">
      <span class="oneLuck" @click="luckGO(1)"></span>
      <span class="fireLuck" @click="luckGO(5)"></span>
    </div>
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
    <transition name="slide">
      <div class="getGift" v-show="showGetGift">
        <div class="getGiftCon" :class="{five:getGift_list.length == 5}">
          <span class="close" @click="closeGetGift()"></span>
          <div class="giftItemBox">
            <p class="fiveTitle" v-if="getGift_list.length == 5">恭喜你連抽5次獲得以下獎品</p>
            <div class="gift">
              <span v-for="(item,index) in getGift_list" :key="index">
                <div class="imgBox">
                  <img :src="getWardImg(item.gift_id)" alt="" :class="'img'+item.gift_id">
                </div>
                <p>{{getWardName(item.gift_id)}}</p>
              </span>
            </div>
            <p class="luckGiftTips" v-if="getGift_list.length == 1 && getGift_list[0].gift_id == 12">恭喜你成功抽中了{{getWardName(getGift_list[0].gift_id)}},每合成一張拼圖,獎勵一個感恩節大禮包,太讚啦！</p>
            <p class="luckGiftTips" v-else-if="getGift_list.length == 1 && getGift_list[0].gift_id > 0 && getGift_list[0].gift_id <=6">恭喜你成功抽中了{{getWardName(getGift_list[0].gift_id)}},每合成一張拼圖,獎勵一個感恩節大禮包,太讚啦！</p>
            <p class="luckGiftTips" v-else-if="getGift_list.length == 1">恭喜你成功抽中了{{getWardName(getGift_list[0].gift_id)}},已派發到您的賬戶上，請查收！</p>
            <p class="luckGiftTips" v-else-if="getGift_list.length == 5">獎品已派發到您的賬戶上，請注意查收！
            </p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import api from "../api/apiConfig"
import { mapState } from "vuex"
import MsgToast from "../components/commonToast"
import { globalBus } from "../utils/eventBus"
import { wardImg, wardName } from "../config/ward"
export default {
  components: { MsgToast },
  data() {
    return {
      giftAngle: {
        1: 30, //碎片1-6
        2: 330,
        3: 270,
        4: 210,
        5: 150,
        6: 90,
        7: 300,   //10金豆
        8: 0,    //20金豆
        9: 240,  //3金币
        10: 120,  //20金币
        11: 180,   //vip
        12: 60,   //5%储值返利
      },
      nowAngle: 0,
      giftIndex: 0,
      tastMsg: '',
      showT: false,
      getGift_list: [],
      showGetGift: false
    }
  },
  computed: {
    ...mapState(['userMsg'])
  },
  methods: {
    luckGO(val) {
      // this.getGift_list = [{ gift_id: 1 }, { gift_id: 2 }, { gift_id: 3 }, { gift_id: 4 }, { gift_id: 12 }]
      // this.showGetGift = true
      globalBus.$emit('commonEvent', callback => {
        if (this.userMsg.is_reg == 0) {
          this.tastMsg = `未報名無法參與活動，請先報名哦！`
          this.showT = true
        } else {
          if (this.userMsg.integral < 20 * val) {
            this.tastMsg = `您的積分餘額不足，無法抽獎</br>快去賺取積分吧！`
            this.showT = true
          } else {
            api.getGift(val).then(res => {
              this.getGift_list = res.data.response_data.gift_list
              this.giftIndex = this.getGift_list[0].gift_id
              this.$store.commit('reducePoints', val * 20)
              this.turnAngle()     //動畫開始
              setTimeout(() => {   //禮物彈窗
                this.showGetGift = true
              }, 5000);
              let suipObj = {}
              for (let item in this.getGift_list) {
                if (this.getGift_list[item].gift_id >= 1 && this.getGift_list[item].gift_id <= 6) {
                  if (suipObj[this.getGift_list[item].gift_id]) {
                    suipObj[this.getGift_list[item].gift_id] += 1
                  } else {
                    suipObj[this.getGift_list[item].gift_id] = 1
                  }
                }
              }
              this.$store.commit('getFragment', suipObj)
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
    }
  }
}
</script>
<style lang="scss">
.turntable {
  width: 7.41rem;
  height: 7.41rem;
  margin: 0 auto;
  background: url(../assets/img/trunBg.png);
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
  .trunLamp {
    width: 6.37rem;
    height: 6.38rem;
    background: url(../assets/img/trunLamp.png);
    background-size: 100% 100%;
    position: absolute;
    top: 0.39rem;
    left: 0.51rem;
    animation: trun 25s linear infinite;
  }
  .giftItem {
    width: 5.74rem;
    height: 5.74rem;
    transition: transform 5s ease;
    background: url(../assets/img/giftItem.png);
    background-size: 100% 100%;
    position: absolute;
    top: 0.71rem;
    left: 0.825rem;
  }
  .needld {
    width: 3.33rem;
    height: 3.67rem;
    background: url(../assets/img/needld.png);
    background-size: 100% 100%;
    position: absolute;
    top: 1.57rem;
    left: 2.05rem;
    .oneLuck {
      width: 2rem;
      height: 1rem;
      position: absolute;
      top: 1rem;
      left: 0.65rem;
      border-radius: 1rem 1rem 0 0;
    }
    .fireLuck {
      width: 2rem;
      height: 1rem;
      position: absolute;
      top: 2rem;
      left: 0.65rem;
      border-radius: 0 0 1rem 1rem;
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
      width: 6.42rem;
      height: 6.44rem;
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -40%);
      background: url(../assets/img/getGift1.png);
      background-size: 100% 100%;
      .giftItemBox {
        width: 4.8rem;
        position: absolute;
        top: 2.2rem;
        left: 0.8rem;
        .fiveTitle {
          text-align: center;
          color: #ffc867;
          margin-top: 0.1rem;
        }
        .gift {
          height: 2rem;
          padding-top: 0.4rem;
          text-align: center;
          span {
            display: inline-block;
            vertical-align: middle;
            width: 33%;
            height: 1.5rem;
            img {
              display: block;
              margin: 0 auto;
              width: 1rem;
              height: 1rem;
            }
            p {
              text-align: center;
              font-size: 80%;
              height: 0.3rem;
              line-height: 0.3rem;
              margin-top: 0.05rem;
              padding: 0 0.1rem;
            }
          }
        }
        .luckGiftTips {
          padding: 0 0.1rem;
          font-size: 80%;
          color: #ffe0aa;
          text-align: center;
        }
      }
      .close {
        display: block;
        width: 0.45rem;
        height: 0.45rem;
        position: absolute;
        top: 0;
        right: 0.57rem;
        background: url(../assets/img/getGiftClose.png);
        background-size: 100% 100%;
      }
      &.five {
        height: 7.78rem;
        background: url(../assets/img/getGift2.png);
        background-size: 100% 100%;
        .gift {
          height: 3.3rem;
          padding-top: 0rem;
          span {
            margin-top: 0.1rem;
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
</style>
