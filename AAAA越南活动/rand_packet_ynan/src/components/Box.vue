<template>
  <div class="giftBox">
    <div class="blindBoxItem">
      <div class="boxItem left" :class="{open:packet.dayOpened}">
        <p class="title">{{lang.oneDayOpen}}</p>
        <div class="sonw">
          <div class="blineBox" :class="{heartbeat:!packet.dayOpened && userLv > 0}"></div>
        </div>
        <span class="openBtn" @click="openBox1()">{{packet.dayOpened?lang.opened:lang.open}}</span>
      </div>
      <div class="boxItem right" :class="{open:packet.totalOpened}">
        <p class="title">{{lang.actOpen}}</p>
        <div class="sonw">
          <div class="blineBox" :class="{heartbeat:!packet.totalOpened && isTop}"></div>
        </div>
        <span class="openBtn" @click="openBox2(2)">{{packet.totalOpened?lang.opened:lang.open}}</span>
      </div>
    </div>
    <bar :newPcket="newPcket" />
    <div class=" scoreBox">
      <div class="scoreTop">
        <div class="todayScore">
          <span>{{lang.todayScore}}<em>{{packet.dayScore}}</em></span>
        </div>
        <div class="totalScore">
          <span>{{lang.totalScore}}<em>{{packet.totalScore}}</em></span>
        </div>
      </div>
      <p class="totalBoxed" v-if="packet.totalOpened">{{lang.totalOpenEd}}</p>
      <p class="couldOpen" v-else-if="packet.totalScore >= packet.level[packet.level.length-1]"> {{lang.couldOpenTotalBox}}</p>
      <p class="rudexScore" v-else>{{lang.rudexScore}}<em>{{disparityScore}}</em></p>
    </div>
    <div class="mask" v-show="showOpenBox1">
      <transition name="slide">
        <div class="openBox1Pup" v-show="showOpenBox1">
          <span class="close" @click="closePup1()" v-if="showPup1Type2 || (!packet.dayOpened && userLv > 0)"></span>
          <div class="openBox1PupCon" v-if="!showPup1Type2">
            <div class="luckTitle" v-if="registered">{{lang.luck}} <i>{{userLv}}</i></div>
            <p class="openTips" v-html="box1Tips"></p>
            <span class="openBtn" @click="open(1)">{{lang.quer}}</span>
          </div>
          <div class="openBox1PupCon" v-else>
            <div class="gift">
              <div class="giftItem bean" v-if="prizes.bean">
                <span class="giftBg">
                  <img src="../assets/img/gift/bean.png" alt="" class="img1">
                </span>
                <em>{{prizes.bean}} {{lang.bean}}</em>
              </div>
              <div class="giftItem ticket" v-if="prizes.rebate">
                <span class="giftBg">
                  <img src="../assets/img/gift/ticket.png" alt="" class="img2">
                </span>
                <em>{{lang.ticket}} {{prizes.rebate}}%</em>
              </div>
              <div class="giftItem ticket" v-if="prizes.gift">
                <span class="giftBg">
                  <img :src="prizes.gift.image" alt="" class="img3">
                </span>
                <em>{{prizes.gift.name}}*{{prizes.gift.count}}</em>
              </div>
              <div class="giftItem ticket" v-if="prizes.frame">
                <span class="giftBg">
                  <img :src="prizes.frame.image" alt="" class="img3">
                </span>
                <em>{{prizes.frame.name}}({{prizes.frame.day}}{{lang.day}})</em>
              </div>
            </div>
            <p class="sucPup1" v-html="lang.sucPup1Tips"></p>
          </div>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="showOpenBox2">
      <transition name="slide">
        <div class="openBox2Pup" :class="{gifts:showPup2Type2}" v-show="showOpenBox2">
          <span class="close" @click="closePup2()" v-if="showPup2Type2"></span>
          <div class="openBox2PupCon" v-if="!showPup2Type2">
            <p class="openTips" v-html="box2Tips"></p>
            <span class="openBtn" @click="closePup2()">{{lang.quer}}</span>
          </div>
          <div class="openBox2PupCon" v-else>
            <div class="gift">
              <div class="giftItem bean" v-if="prizes2.bean">
                <span class="giftBg">
                  <img src="../assets/img/gift/bean.png" alt="" class="img1">
                </span>
                <em>{{prizes2.bean}} {{lang.bean}}</em>
              </div>
              <div class="giftItem ticket" v-if="prizes2.rebate">
                <span class="giftBg">
                  <img src="../assets/img/gift/ticket.png" alt="" class="img2">
                </span>
                <em>{{lang.ticket}} {{prizes2.rebate}}%</em>
              </div>
              <div class="giftItem ticket" v-if="prizes2.gift">
                <span class="giftBg">
                  <img :src="prizes2.gift.image" alt="" class="img3">
                </span>
                <em>{{prizes2.gift.name}}*{{prizes2.gift.count}}</em>
              </div>
              <div class="giftItem car" v-if="prizes2.car">
                <span class="giftBg">
                  <img :src="prizes2.car.image" alt="" class="img3">
                </span>
                <em>{{prizes2.car.name}}({{prizes2.car.day}}{{lang.day}})</em>
              </div>
              <div class="giftItem car" v-if="prizes2.frame">
                <span class="giftBg">
                  <img :src="prizes2.frame.image" alt="" class="img3">
                </span>
                <em>{{prizes2.frame.name}}({{prizes2.frame.day}}{{lang.day}})</em>
              </div>
            </div>
            <p class="sucPup1" v-html="lang.sucPup1Tips"></p>
          </div>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="showT">
      <transition name="slide">
        <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
      </transition>
    </div>

  </div>
</template>
<script>
import bar from "./bar"
import { mapState } from "vuex"
import api from "../api/apiConfig"
import MsgToast from "../components/commonToast"
import { globalBus } from "../utils/eventBus"
export default {
  components: { bar, MsgToast },
  data() {
    return {
      showOpenBox1: false,
      showPup1Type2: false,  //彈窗1有禮物狀態
      showOpenBox2: false, //終極禮盒
      showPup2Type2: false,
      box1Tips: '',
      box2Tips: '',
      prizes: {},
      prizes2: {},
      tastMsg: '',
      showT: false
    }
  },
  computed: {
    ...mapState(['packet', 'registered']),
    disparityScore() {
      let totalBoxScore = this.packet.level[this.packet.level.length - 1]
      return totalBoxScore - this.packet.totalScore
    },
    newPcket() {
      return this.packet.level.slice(0, this.packet.level.length - 1)
    },
    userLv() {
      for (let i = this.newPcket.length - 1; i >= 0; i--) {
        if (this.packet.dayScore >= this.newPcket[i]) {
          return i + 1
        }
      }
      return 0
    },
    isTop() {  //是否達到終極寶箱
      return this.packet.totalScore >= this.packet.level[this.packet.level.length - 1]
    }
  },
  methods: {
    openBox1() {
      globalBus.$emit('commonEvent', () => {
        if (!this.registered) {
          this.box1Tips = this.lang.noSingUpTips
        } else if (this.packet.dayOpened) {
          this.box1Tips = this.lang.openDayBoxTips3
        } else if (this.userLv > 0) {
          this.box1Tips = this.lang.openDayBoxTips1
        } else if (this.userLv === 0) {
          this.box1Tips = this.lang.openDayBoxTips2
        }
        this.showOpenBox1 = true
      })
    },
    openBox2(type) {
      globalBus.$emit('commonEvent', () => {
        if (!this.registered) {
          this.box2Tips = this.lang.noSingUpTips
          this.showOpenBox2 = true
        } else if (this.isTop && !this.packet.totalOpened) {
          api.openBox(type).then(res => {
            if (res.data.response_status.code == 0) {
              this.prizes2 = res.data.response_data.prizes
              this.showPup2Type2 = true
              this.showOpenBox2 = true
              this.vuexCommit('setTotalState', true)
            } else {
              this.tastMsg = res.data.response_status.error
              this.showT = true
            }
          })
        } else if (!this.isTop) {
          this.box2Tips = this.lang.openTotalBoxTips1
          this.showOpenBox2 = true
        }
      })
    },
    open(type) {
      if (!this.registered) {
        this.showOpenBox1 = false
      } else if (!this.packet.dayOpened && this.userLv > 0) {
        api.openBox(type).then(res => {
          if (res.data.response_status.code == 0) {
            this.prizes = res.data.response_data.prizes
            this.showPup1Type2 = true
            this.vuexCommit('setDayBoxState', true)
          } else {
            this.tastMsg = res.data.response_status.error
            this.showT = true
          }
        })
      } else {
        this.showOpenBox1 = false
      }
    },
    closePup1() {
      this.showOpenBox1 = false
      this.showPup1Type2 = false
    },
    closePup2() {
      this.showOpenBox2 = false
      this.showPup2Type2 = false
    },
    closeToast() {
      this.showT = false
    }
  }
}
</script>
<style lang="scss" scoped>
.giftBox {
  height: 7.66rem;
  margin-top: -0.02rem;
  background: url(../assets/img/boxBg.png) center 0 no-repeat;
  background-size: 100% auto;
  .blindBoxItem {
    padding: 0 0.15rem;
    height: 4.26rem;
    display: flex;
    .boxItem {
      width: 3.66rem;
      height: 3.59rem;
      padding-top: 0.67rem;
      position: relative;
      &.left {
        background: url(../assets/img/letfBoxBg.png);
        background-size: 100% 100%;
        .sonw {
          padding-top: 0.12rem;
          height: 2.37rem;
          .blineBox {
            width: 1.91rem;
            height: 1.98rem;
            margin: 0 auto 0;
            background: url(../assets/img/box1.png);
            background-size: 100% 100%;
          }
        }

        .openBtn {
          background: url(../assets/img/openBtn1.png);
          background-size: 100% 100%;
        }
        &.open {
          .blineBox {
            background: url(../assets/img/openBox1.png);
            background-size: 100% 100%;
          }
          .openBtn {
            background: url(../assets/img/openedBtnBg.png);
            background-size: 100% 100%;
          }
        }
      }
      &.right {
        background: url(../assets/img/rightBoxBg.png);
        background-size: 100% 100%;
        margin-left: -0.15rem;
        .blineBox {
          width: 2.14rem;
          height: 2.12rem;
          margin: 0 auto 0;
          background: url(../assets/img/box2.png);
          background-size: 100% 100%;
        }
        .openBtn {
          background: url(../assets/img/openBtn2.png);
          background-size: 100% 100%;
        }
        &.open {
          .blineBox {
            background: url(../assets/img/openBox2.png);
            background-size: 100% 100%;
          }
          .openBtn {
            background: url(../assets/img/openedBtnBg.png);
            background-size: 100% 100%;
          }
        }
      }
      .heartbeat {
        animation: heartbeat 1s infinite;
      }
      .title {
        text-align: center;
        color: #651a00;
        font-size: 0.21rem;
        font-weight: 600;
      }
      .sonw {
        width: 3.1rem;
        height: 2.49rem;
        background: url(../assets/img/sonw.png);
        background-size: 100% 100%;
        margin: 0.14rem auto;
        padding-top: 0.23;
      }
      .openBtn {
        display: block;
        width: 2.43rem;
        height: 0.8rem;
        text-align: center;
        line-height: 0.75rem;
        color: #a24e04;
        font-weight: 800;
        position: absolute;
        left: 0.62rem;
        bottom: -0.15rem;
      }
    }
  }
  .scoreBox {
    margin-top: 0.2rem;
    .scoreTop {
      display: flex;
      justify-content: center;
      span {
        font-size: 0.24rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        em {
          font-size: 0.3rem;
          color: #ffcb9c;
          font-weight: 600;
        }
      }
      .totalScore {
        margin-left: 0.54rem;
      }
    }
    .rudexScore {
      margin-top: 0.12rem;
      font-size: 0.24rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      em {
        font-size: 0.24rem;
        color: #fff3c4;
        font-weight: 600;
      }
    }
    .totalBoxed,
    .couldOpen {
      font-size: 0.24rem;
      color: #f4ce92;
      text-align: center;
      font-weight: 700;
      margin-top: 0.19rem;
    }
  }
  .openBox1Pup {
    width: 6.23rem;
    height: 6.36rem;
    background: url(../assets/img/openBox1Pup.png);
    background-size: 100% 100%;
    position: absolute;
    left: 0.63rem;
    top: 2.6rem;
    .openBox1PupCon {
      width: 6.23rem;
      height: 3.38rem;
      padding-top: 0.38rem;
      position: absolute;
      top: 2.5rem;
      .luckTitle {
        text-align: center;
        font-size: 0.36rem;
        font-weight: bold;
      }
      .openTips {
        height: 1.1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-size: 0.28rem;
        margin: 0.21rem auto 0.32rem;
      }
      .openBtn {
        display: block;
        width: 2.83rem;
        height: 0.92rem;
        background: url(../assets/img/ok.png);
        background-size: 100% 100%;
        line-height: 0.92rem;
        text-align: center;
        color: #a24e04;
        font-weight: bold;
        margin: 0 auto;
      }
      .gift {
        display: flex;
        padding: 0 0.36rem;
        justify-content: center;
        .giftItem {
          width: 1.7rem;
          .giftBg {
            width: 1.6rem;
            height: 1.6rem;
            margin: 0 auto;
            background: url(../assets/img/giftBg.png);
            background-size: 100% 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              display: block;
            }
            .img1 {
              width: 1.14rem;
              height: 1.05rem;
            }
            .img2 {
              width: 1.21rem;
              height: 1.18rem;
            }
            .img3,
            .img4 {
              width: 1.6rem;
              height: 1.6rem;
            }
          }
          em {
            display: block;
            height: 0.68rem;
            color: #fff3d2;
            font-size: 0.24rem;
            font-weight: 600;
            text-align: center;
            margin-top: 0.08rem;
          }
        }
        .giftItem:nth-child(2) {
          margin-left: 0.36rem;
        }
        .giftItem:nth-child(3) {
          margin-left: 0.36rem;
        }
      }
    }
  }
  .openBox2Pup {
    width: 6.23rem;
    height: 5.93rem;
    background: url(../assets/img/gift2Pup.png);
    background-size: 100% 100%;
    position: absolute;
    left: 0.63rem;
    top: 2.6rem;
    .openBox2PupCon {
      width: 6.23rem;
      height: 3.38rem;
      padding-top: 0.38rem;
      position: absolute;
      top: 2.1rem;
      .openTips {
        height: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-size: 0.28rem;
        margin: 0.21rem auto 0.32rem;
      }
      .openBtn {
        display: block;
        width: 2.83rem;
        height: 0.92rem;
        background: url(../assets/img/ok.png);
        background-size: 100% 100%;
        line-height: 0.92rem;
        text-align: center;
        color: #a24e04;
        font-weight: bold;
        margin: 0 auto;
      }
    }
    &.gifts {
      height: 8.18rem;
      top: 1.8rem;
      background: url(../assets/img/giftTotalBg.png);
      background-size: 100% 100%;
      .openBox2PupCon {
        height: 5.5rem;
        .gift {
          padding: 0 0.8rem;
          .giftItem {
            width: 48%;
            height: 2.2rem;
            display: inline-block;
            vertical-align: middle;
            .giftBg {
              width: 1.6rem;
              height: 1.6rem;
              margin: 0 auto;
              background: url(../assets/img/giftBg.png);
              background-size: 100% 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              img {
                display: block;
              }
              .img1 {
                width: 1.14rem;
                height: 1.05rem;
              }
              .img2 {
                width: 1.21rem;
                height: 1.18rem;
              }
              img {
                width: 1.6rem;
                height: 1.6rem;
              }
            }
            em {
              display: block;
              height: 0.68rem;
              color: #fff3d2;
              font-size: 0.24rem;
              font-weight: 600;
              text-align: center;
              margin-top: 0.08rem;
            }
          }
        }
      }
    }
  }
  .sucPup1 {
    text-align: center;
    font-size: 0.26rem;
    margin-top: 0.13rem;
  }
  .close {
    display: block;
    width: 0.77rem;
    height: 0.77rem;
    background: url(../assets/img/close.png);
    background-size: 100%;
    position: absolute;
    left: 2.73rem;
    bottom: -1rem;
  }
}
</style>
