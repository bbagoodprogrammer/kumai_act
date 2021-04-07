<template>
  <div class="table">
    <div class="zi"></div>
    <div class="turnTable" :style="{transform:'rotate('+nowAngle+'deg)'}">
      <div class="goIcon" @click="luckIng()"></div>
      <span v-for=" (item,index) in turntable" :key="index" :class="'ward'+index">
        <img :src="item.image" alt="">
        <em>{{item.name}}</em>
      </span>
    </div>
    <div class="mask">
      <transition name="slide">
        <div class="luckPup">
          <div class="title">恭喜獲得</div>
          <div class="luckItem">
            <div class="imgBox">
              <img src="" alt="">
            </div>
            <strong></strong>
          </div>
          <div class="tips">恭喜你獲得【獎勵名稱名稱】</div>
          <div class="ok"></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>

import { mapState } from "vuex"
import { turntableLuck } from "../apis"

export default {
  data () {
    return {
      nowAngle: 0,
      giftAngle: {
        1: 0, //碎片1-6
        2: 300,
        3: 240,
        4: 180,
        5: 120,
        6: 60,
      },
      giftIndex: 1,
    }
  },
  computed: {
    ...mapState(['turntable'])
  },
  methods: {
    luckIng () {
      turntableLuck().then(res => {
        if (res.data.response_status.code == 0) {
          const id = res.data.response_data.prize.pid
          for (let i = 0; i < this.turntable.length; i++) {
            if (this.turntable[i].pid == id) {
              console.log(this.turntable[i].pid)
              this.giftIndex = this.turntable[i].pid
              this.turnAngle()
              setTimeout(() => {

              }, 5000)
            }
          }
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    turnAngle () {
      if (this.nowAngle % 360 > this.giftAngle[this.giftIndex]) { //目标礼物在前面
        this.nowAngle += 1800 + (this.giftAngle[this.giftIndex] - this.nowAngle % 360)
      } else if (this.nowAngle % 360 < this.giftAngle[this.giftIndex]) {
        this.nowAngle += 1800 + (360 - (this.nowAngle % 360)) + this.giftAngle[this.giftIndex]
      } else if (this.nowAngle % 360 == this.giftAngle[this.giftIndex]) {
        this.nowAngle += 1800
      }
    },
  }
}
</script>

<style lang="scss">
.table {
  width: 7.51rem;
  height: 7.66rem;
  background: url(../img/turnTable2.png);
  background-size: 100% 100%;
  position: relative;
  .zi {
    width: 0.38rem;
    height: 0.59rem;
    background: url(../img/zi.png);
    background-size: 100% 100%;
    position: absolute;
    top: 0.78rem;
    left: 3.65rem;
    z-index: 10;
  }
  .turnTable {
    width: 5.6rem;
    height: 5.6rem;
    background: url(../img/turnTable1.png);
    background-size: 100% 100%;
    position: absolute;
    top: 1.05rem;
    left: 1.04rem;
    transition: transform 5s ease;
    .goIcon {
      width: 2.11rem;
      height: 2.11rem;
      background: url(../img/turn_default.png);
      background-size: 100% 100%;
      position: absolute;
      top: 1.77rem;
      left: 1.77rem;
    }
    span {
      display: block;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 1.2rem;
        height: 1.2rem;
      }
      em {
        display: block;
        width: auto;
        height: 0.3rem;
        font-size: 80%;
        color: rgba(255, 254, 135, 1);
        text-align: center;
        white-space: nowrap;
      }
      &.ward0 {
        position: absolute;
        top: 0.2rem;
        left: 2.2rem;
        z-index: 10;
      }
      &.ward1 {
        position: absolute;
        top: 1.1rem;
        left: 4rem;
        transform: rotate(60deg);
        z-index: 10;
      }
      &.ward2 {
        position: absolute;
        top: 3.1rem;
        left: 4rem;
        transform: rotate(120deg);
        z-index: 10;
      }
      &.ward3 {
        position: absolute;
        top: 4rem;
        left: 2.2rem;
        transform: rotate(-180deg);
        z-index: 10;
      }
      &.ward4 {
        position: absolute;
        top: 3.1rem;
        left: 0.5rem;
        transform: rotate(-120deg);
        z-index: 10;
      }
      &.ward5 {
        position: absolute;
        top: 1.1rem;
        left: 0.5rem;
        transform: rotate(-60deg);
        z-index: 10;
      }
    }
  }
  .luckPup {
    width: 5.89rem;
    height: 4.88rem;
    background: url(../img/turnLuckPup.png);
    background-size: 100% 100%;
    .title {
      height: 0.8rem;
      text-align: center;
      line-height: 0.8rem;
      font-size: 0.32rem;
      color: #fff;
    }
  }
}
</style>