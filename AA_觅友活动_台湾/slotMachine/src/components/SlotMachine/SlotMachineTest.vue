<template>
  <div class="dfbox">
    <div class="sloat">
      <SlotMachine @end="onEnd" :size="3" :nums="nums" :list="list" :result="result" ref="Slot" />
      <div class="mask" v-show="showMinToast">
        <transition name="slide">
          <div class="luckPup" v-if="showMinToast" :class="{bg:prize.type != 'coin' && prize.type != 'bean'}">
            <i class="close" @click="hideToast()"></i>
            <div class="title">{{lang.luckTitle}}</div>
            <div class="imgBox">
              <img :src="prize.image" alt="" v-if="prize.type != 'coin' && prize.type != 'bean'">
              <div class="coinsNums" v-else>
                <img :src="prize.type == 'coin'?require(`../../img/turnImg/99.png`):require(`../../img/turnImg/98.png`)" alt="">
                <div class="nums">
                  <img :src="require(`../../img/nums/${item2}.png`)" v-for="(item2,index2) in String(prize.num).split('')" :key="index2" alt="">
                </div>
              </div>
              <div class="name">{{prize.name}}</div>
            </div>
            <div class="get" @click="hideToast()">{{lang.get}}</div>
          </div>
        </transition>
      </div>

    </div>
  </div>

</template>

<script>
import SlotMachine from './Index';
import { luckDraw } from "../../apis"
import { mapState } from "vuex"

export default {
  props: ['cilckItem'],
  data () {
    return {
      list: [
        { id: 1, src: require("../../img/turnImg/1.png") },
        { id: 2, src: require("../../img/turnImg/2.png") },
        { id: 3, src: require("../../img/turnImg/3.png") },
        { id: 4, src: require("../../img/turnImg/4.png") },
        { id: 5, src: require("../../img/turnImg/5.png") },
        { id: 6, src: require("../../img/turnImg/6.png") },
        { id: 7, src: require("../../img/turnImg/7.png") },
        { id: 8, src: require("../../img/turnImg/8.png") },
        { id: 9, src: require("../../img/turnImg/9.png") },
        { id: 10, src: require("../../img/turnImg/10.png") },
        { id: 11, src: require("../../img/turnImg/11.png") },
        { id: 12, src: require("../../img/turnImg/12.png") },
        { id: 13, src: require("../../img/turnImg/13.png") },
        { id: 14, src: require("../../img/turnImg/14.png") },
        // { id: 15, src: require("../../img/turnImg/15.png") },
        { id: 16, src: require("../../img/turnImg/16.png") },
        { id: 17, src: require("../../img/turnImg/17.png") },
        { id: 18, src: require("../../img/turnImg/18.png") },
        { id: 19, src: require("../../img/turnImg/19.png") },
        { id: 20, src: require("../../img/turnImg/20.png") },
        { id: 21, src: require("../../img/turnImg/21.png") },
        { id: 22, src: require("../../img/turnImg/22.png") },


        { id: 30, src: require("../../img/turnImg/30.png"), defalutSrc: require("../../img/turnImg/98.png") },
        { id: 31, src: require("../../img/turnImg/31.png"), defalutSrc: require("../../img/turnImg/98.png") },
        { id: 32, src: require("../../img/turnImg/32.png"), defalutSrc: require("../../img/turnImg/98.png") },
        { id: 33, src: require("../../img/turnImg/33.png"), defalutSrc: require("../../img/turnImg/98.png") },

        { id: 34, src: require("../../img/turnImg/34.png"), defalutSrc: require("../../img/turnImg/99.png") },
        { id: 35, src: require("../../img/turnImg/35.png"), defalutSrc: require("../../img/turnImg/99.png") },
        { id: 36, src: require("../../img/turnImg/36.png"), defalutSrc: require("../../img/turnImg/99.png") },
        { id: 37, src: require("../../img/turnImg/37.png"), defalutSrc: require("../../img/turnImg/99.png") },
        { id: 38, src: require("../../img/turnImg/38.png"), defalutSrc: require("../../img/turnImg/99.png") },
      ],
      result: [],
      imgindex: 0,
      drawSwitch: true,    // 抽奖开关，避免重复抽奖
      timerSet: 0,
      showMinToast: false,  //弹窗开关
      prize: {},
      nums: []
    };
  },
  computed: {
    ...mapState(['owner'])
  },

  methods: {
    getRand (start, end) {
      const len = end - start;
      return start + Math.round(Math.random() * len);
    },
    startGame (val) {
      if (this.owner.coins >= val && this.drawSwitch) { //避免重复请求  活动开始转动
        this.drawSwitch = false  //关闭开关
        this.nums = []
        luckDraw(val).then(res => { // 获取抽奖结果
          if (res.data.response_status.code === 0) {
            const { icons, nums, prize, score, coins } = res.data.response_data
            this.result = icons       //开启奖品滚动效果
            this.prize = prize
            this.nums = nums
            this.vxc('resetLuckState')
            setTimeout(() => {
              this.vxc('addScore', score)
              this.vxc('addCoins', coins)
            }, 4000)
            this.$emit('setPacketStatus')
          } else {
            this.toast(res.data.response_status.error)
          }
        })
      } else if (this.owner.coins < val) {
        this.toast(this.lang.noCoins)
        setTimeout(() => {
          this.$parent.gowalletpage()
        }, 1300)
      }
    },
    onEnd (result) { //动画结束时重置开关
      setTimeout(() => {
        this.drawSwitch = true //请求开启开关
        this.showMinToast = true
      }, 1300)
    },
    hideToast () {
      this.showMinToast = false
    },
    closeToast () {
      this.showT = false
    }
  },
  components: {
    SlotMachine,
  }
}
</script>

<style lang="scss" scoped>
.iconNums {
  width: 100%;
  height: 1.25rem;
  //   background: #fff;
  position: absolute;
  top: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    width: 1.51rem;
    height: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
button {
  padding: 0.1rem 0.2rem;
  position: absolute;
}
.dfbox {
  height: 1.16rem;
  position: absolute;
  top: 3.98rem;
  left: 1.42rem;
  padding-top: 1.4rem;
  overflow: hidden;
}
.sloat {
  // position: absolute;
  // top: 4rem;
  // left: 1.45rem;
}
.startStype {
  display: flex;
  justify-content: space-between;
  span {
    width: 1.55rem;
    height: 1.41rem;
  }
}
.luckPup {
  width: 6.01rem;
  height: 7.41rem;
  background: url(../../img/giftPup.png);
  background-size: 100% 100%;
  position: relative;
  &.bg {
    .imgBox {
      width: 2.78rem;
      height: 2.78rem;
      background: url(../../img/giftBg.png);
      background-size: 100% 100%;
    }

    .get {
      margin: 1rem auto 0;
    }
  }
  .title {
    text-align: center;
    height: 1rem;
    line-height: 1.1rem;
  }
  .close {
    display: block;
    width: 0.66rem;
    height: 0.66rem;
    background: url(../../img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0rem;
    top: 0.1rem;
  }
  .imgBox {
    margin: 0.68rem auto 0;
    > img {
      width: 2.78rem;
      height: 2.78rem;
      margin: 0 auto;
    }
  }
  .get {
    width: 2.7rem;
    height: 0.92rem;
    font-size: 0.36rem;
    background: url(../../img/get.png);
    background-size: 100% 100%;
    text-align: center;
    line-height: 0.92rem;
    margin: 0.5rem auto 0;
    font-size: 0.26rem;
    color: #6C0000;
  }
  .coinsNums {
    width: 2.78rem;
    height: 2.78rem;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(../../img/giftBg.png);
    background-size: 100% 100%;
    margin: 0 auto;
    .nums {
      position: absolute;
      bottom: 0.15rem;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 0.3rem;
        height: 0.34rem;
        margin-left: -0.06rem;
      }
    }
  }
  .name {
    text-align: center;
    margin-top: 0.12rem;
  }
}
</style>
