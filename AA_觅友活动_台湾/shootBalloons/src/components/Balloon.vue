<template>
  <div class="balloon">
    <div class="operation">
      <div class="userCoins">
        <i class="icon"></i>
        <span>{{owner.balance}}</span>
        <i class="add"></i>
      </div>
      <div class="btn">
        <div class="one" @click="luck(1)">射一次</div>
        <div class="ten" @click="luck(10)">射十次</div>
      </div>
      <div class="ballTips">
        長按砲台可調整角度，鬆手後即射出彈珠/飛鏢，
        彈珠砲台20金幣/次，飛鏢砲台80金幣/次
      </div>
    </div>
    <!-- 抽獎禮物彈窗 -->
    <div class="mask" v-show="showLuckGift">
      <transition name="slide">
        <div class="luckGiftPup" v-if="showLuckGift">
          <i class="close" @click="showLuckGift =false"></i>
          <div class="luckTop"></div>
          <div class="luckCon" :class="{one:Object.keys(prizes.list).length == 1}">
            <div class="giftItem" v-for="(item,index) in prizes.list" :key="index">
              <div class="imgBox">
                <img src="../img/coin.png" alt="" v-if="item.type == 'coin'">
                <img src="../img/bean.png" alt="" v-if="item.type == 'bean'">
                <img :src="item.image" alt="" v-else>
                <div class="nums">
                  <img src="../img/numbers/c.png" alt="">
                  <img :src="require(`../img/numbers/${item}.png`)" alt="" v-for="(item,index) in String(item.num) " :key="index">
                </div>
              </div>
              <strong>{{item.name}}</strong>
            </div>
          </div>
          <div class="luckBotton">
          </div>
        </div>
      </transition>
    </div>
    <!-- 首次確認彈窗 -->
    <div class="mask" v-show="firstPup">
      <transition name="slide">
        <div class="firstQuery" v-if="firstPup">
          <div class="title">確認</div>
          <div class="queryTips">
            使用【炮台名稱】射擊n次氣球，
            需要消耗123金幣
          </div>
          <div class="btnBox">
            <span class="cancel" @click="firstPup =false">我再想想</span>
            <span class="determine" @click="luck(count,true)">確定射擊</span>
          </div>
        </div>
      </transition>
    </div>
    <!-- 大獎 -->
    <div class="mask" v-show="showlargePrizePup">
      <transition name="slide">
        <div class="grandPrix" :class="{open:prize_open}" v-if="showlargePrizePup">
          <!-- <i class="close" @click="closePup()"></i> -->
          <div class="prizeImg"> </div>
          <div class="prizeTips">
            {{prize_open?`恭喜擊中${prizes.list[prizes.grand_prize_id].name}`:'神射手降臨！你擊中了大獎勵～'}}
          </div>
          <div class="coins" v-if="prize_open">
            <i></i>
            <span>{{prizes.list[prizes.grand_prize_id].name}}</span>
          </div>
          <div class="ok" @click="next()">
            開心收下
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>

import { luck, getPrize } from "../apis"
import { mapState } from "vuex"
export default {
  props: ['type', 'svgaAddress'],
  data () {
    return {
      firstPup: false,
      showLuckGift: false,
      showlargePrizePup: false,
      prize_open: false, // 大獎是否開啟
      prizes: {},
      count: 0,
      Marbles_aniKey: ['Marbles_one_1', 'Marbles_one_2', 'Marbles_one_3', 'Marbles_one_4'],
      Darts_aniKey: ['Darts_one_1', 'Darts_one_2', 'Darts_one_3'],
      luckIng: false
    }
  },
  computed: {
    ...mapState(['owner'])
  },
  methods: {
    luck (count, cloud) {
      if (this.luckIng) {
        return
      }
      if (!this.owner.first_time && !cloud) {
        this.count = count
        this.firstPup = true
        return
      }
      this.luckIng = true
      luck(this.type == 1 ? 'marbles' : 'dart', count).then(res => {

        if (res.data.response_status.code == 0) {
          //播放動畫
          if (count == 10) {
            if (this.type == 1) {
              this.$parent.svgaStart('ball', 1, true, this.svgaAddress['Marbles_ten'].data)
            } else {
              this.$parent.svgaStart('ball', 1, true, this.svgaAddress['Darts_ten'].data)
            }
          } else {
            let aniKey = ''
            if (this.type == 1) {
              aniKey = this.Marbles_aniKey[Math.floor((Math.random() * this.Marbles_aniKey.length))]
            } else {
              aniKey = this.Darts_aniKey[Math.floor((Math.random() * this.Darts_aniKey.length))]
            }
            this.$parent.svgaStart('ball', 1, true, this.svgaAddress[aniKey].data)
          }
          let tm = count == 10 ? 10300 : 4000
          //中獎邏輯
          setTimeout(() => {
            this.luckIng = false
            if (this.type == 1) {
              this.$parent.svgaStart('ball', 1, true, this.svgaAddress['Marbles_default'].data)
            } else {
              this.$parent.svgaStart('ball', 1, true, this.svgaAddress['Darts_default'].data)
            }
            const { coins, prizes } = res.data.response_data
            if (!this.owner.first_time) {
              this.firstPup = false
              this.vxc('setFirst')
            }
            this.prizes = prizes
            if (prizes.level == 1) {
              let giftStr = ``
              let coinsNums = 0
              let beanNums = 0
              for (let i in prizes.list) {
                if (prizes.list[i].type == 'coin') {
                  coinsNums += prizes.list[i].num * 1
                } else {
                  beanNums += prizes.list[i].num * 1
                }
              }
              if (coinsNums) {
                giftStr += `金幣+${coinsNums}<br/>`
              }
              if (beanNums) {
                giftStr += `金豆+${beanNums}`
              }
              this.toast(giftStr)
            } else if (prizes.level == 2) {
              this.showLuckGift = true
              // setTimeout(() => {
              //   this.showLuckGift = false
              // }, 3000)
            } else if (prizes.level == 3) {
              this.showlargePrizePup = true
            }
            this.vxc('setUserCoins', coins)
          }, tm)
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    next () {
      if (!this.prize_open) {
        getPrize().then(res => {
          if (res.data.response_status.code == 0) {
            this.prize_open = true
          } else {
            this.toast(res.data.response_status.error)
          }
        })

      } else {
        this.prize_open = false
        this.showlargePrizePup = false
      }

    },
  }
}
</script>

<style lang="scss">
.balloon {
  height: 10.59rem;
  position: relative;
  z-index: 10;
  .operation {
    width: 100%;
    position: absolute;
    top: 8.57rem;
    .userCoins {
      min-width: 1.82rem;
      height: 0.36rem;
      background: rgba(0, 0, 0, 0.23);
      border-radius: 0.18rem;
      position: absolute;
      left: 38%;
      top: -0.6rem;
      display: flex;
      align-items: center;
      span {
        flex: 1;
        text-align: center;
        line-height: 0.36rem;
        font-size: 0.27rem;
      }
      i {
        &.icon {
          width: 0.24rem;
          height: 0.24rem;
          background: url(../img/coins.png);
          background-size: 100% 100%;
          margin: 0.06rem;
        }
        &.add {
          width: 0.46rem;
          height: 0.44rem;
          background: url(../img/add.png);
          background-size: 100% 100%;
          margin-right: -0.23rem;
        }
      }
    }
    .btn {
      padding: 0 0.52rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      > div {
        width: 3.04rem;
        height: 1.08rem;
        text-align: center;
        line-height: 1.08rem;
        font-size: 0.42rem;
        font-weight: 500;
        &.one {
          color: rgba(163, 84, 27, 1);
          background: url(../img/one.png);
          background-size: 100% 100%;
        }
        &.ten {
          background: url(../img/ten.png);
          background-size: 100% 100%;
        }
      }
    }
    .ballTips {
      margin-top: 0.16rem;
      font-size: 0.26rem;
      color: rgba(56, 131, 38, 1);
      text-align: center;
      line-height: 0.33rem;
      padding: 0 1rem;
    }
  }
  .firstQuery {
    width: 5.34rem;
    height: 3.43rem;
    background: url(../img/firstQuery.png);
    background-size: 100% 100%;
    .title {
      height: 1.32rem;
      text-align: center;
      font-size: 0.36rem;
      color: #7D4903;
      line-height: 1.32rem;
      font-weight: bold;
    }
    .queryTips {
      padding: 0 0.6rem;
      text-align: center;
      font-size: 0.24rem;
      color: #A9650A;
      line-height: 0.33rem;
    }
    .btnBox {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 0.41rem;
      > span {
        width: 2.07rem;
        height: 0.63rem;
        text-align: center;
        line-height: 0.63rem;
        font-size: 0.28rem;
      }
      .cancel {
        color: #A3541B;
        background: url(../img/cancel.png);
        background-size: 100% 100%;
      }
      .determine {
        background: url(../img/ok.png);
        background-size: 100% 100%;
        margin-left: 0.23rem;
      }
    }
  }
  .luckGiftPup {
    width: 5.34rem;
    min-height: 4rem;
    position: relative;
    .close {
      display: block;
      width: 0.5rem;
      height: 0.5rem;
      position: absolute;
      right: 0.3rem;
      top: -0.9rem;
      background: url(../img/close.png);
      background-size: 100% 100%;
      z-index: 1;
    }
    .luckTop {
      width: 5.34rem;
      height: 0.68rem;
      background: url(../img/luckGift_top.png);
      background-size: 100% 100%;
    }
    .luckCon {
      padding: 0 0.33rem 0 0.19rem;
      margin-top: -0.02rem;
      min-height: 3rem;
      background: url(../img/luckGift_con.png);
      background-size: 100% auto;
      display: flex;
      align-items: center;
      //   justify-content: space-between;
      flex-wrap: wrap;
      .giftItem {
        width: 1.48rem;
        margin: 0 0 0.06rem 0.12rem;
        .imgBox {
          width: 100%;
          height: 100%;
          background: rgba(243, 205, 157, 0.7);
          border-radius: 0.1rem;
          position: relative;
          .nums {
            position: absolute;
            bottom: 0.05rem;
            right: 0.05rem;
            display: flex;
            align-items: center;
            img {
              width: 0.25rem;
              height: 0.31rem;
              margin-left: -0.05rem;
            }
          }
        }
        strong {
          width: 100%;
          height: 0.7rem;
          color: #A9650A;
          font-size: 0.26rem;
          display: block;
          text-align: center;
          margin-top: 0.05rem;
        }
      }
      &.one {
        justify-content: center;
        .giftItem {
          width: 2.06rem;
        }
      }
    }
    .luckBotton {
      width: 5.34rem;
      height: 0.68rem;
      background: url(../img/luckGift_bottom.png);
      background-size: 100% 100%;
      margin-top: -0.2rem;
    }
  }
  .grandPrix {
    position: relative;
    .close {
      display: block;
      width: 0.7rem;
      height: 0.7rem;
      position: absolute;
      right: 0.45rem;
      top: 0.3rem;
      z-index: 1;
    }
    .prizeImg {
      width: 3.25rem;
      height: 2.79rem;
      background: url(../img/first_prizeImg.png);
      background-size: 100% 100%;
      margin: 0 auto;
    }
    .prizeTips {
      padding: 0 0.55rem;
      text-align: center;
      font-size: 0.24rem;
      color: #A9650A;
    }
    .coins {
      display: flex;
      align-items: center;
      justify-content: center;
      i {
        width: 0.4rem;
        height: 0.42rem;
        background: url(../img/firstIcon.png);
        background-size: 100% 100%;
        margin-right: 0.16rem;
      }
      span {
        font-size: 0.4rem;
        color: #FE4C2F;
      }
    }
    .ok {
      width: 2.07rem;
      height: 0.63rem;
      background: url(../img/ok.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.63rem;
      margin: 0.35rem auto 0;
    }
    &.open {
      .prizeImg {
        width: 3.03rem;
        height: 2.6rem;
        background: url(../img/first_prizeImg_open.png);
        background-size: 100% 100%;
        margin: 0 auto;
      }
      .ok {
        margin-top: 0.13rem;
      }
    }
  }
}
</style>