<template>
  <div class="bar">
    <div class="barTips">在K房、作品收到以上禮物可解鎖並收集對應萌寵<br />每收集1種萌寵禮物可解鎖1級獎勵</div>
    <div class="barItem">
      <div class="liner">
        <span class="store" :style="{left:getLeft(index)}" :class="{act:schule >= index}" v-for="(item,index) in petObj" :key="index">
          {{index}}
          <em class="gift">
            <img :src="require(`../assets/img/giftIcon/${item.gift.type}.png`)" alt="">
            <strong>{{item.gift.num?`x${item.gift.num}`:`${item.gift.day}天`}}</strong>
          </em>
        </span>
        <div class="actLiner" :style="{width: (schule -1)/ 5 *100+'%'}"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      petObj: {
        1: {
          gift: {
            type: 'beat',
            num: 20
          }
        },
        2: {
          gift: {
            type: 'beat',
            num: 50
          }
        },
        3: {
          gift: {
            type: 'gift1',
            num: 1
          }
        },
        4: {
          gift: {
            type: 'gift2',
            num: 1
          }
        },
        5: {
          gift: {
            type: 'vip',
            day: 7
          }
        },
        6: {
          gift: {
            type: 'car',
            day: 7
          }
        },
      }
    }
  },
  computed: {
    ...mapState(['schule'])
  },
  methods: {
    getLeft(index) {
      if (index == 1) {
        return '0%'
      } else if (index == 6) {
        return ((index - 1) * 20) - 6.31 + '%'
      } else {
        return (index - 1) * 20 - 3.155 + '%'
      }
    }
  }
}
</script>
<style lang="scss">
.barTips {
  height: 0.76rem;
  font-size: 0.24rem;
  color: rgba(222, 255, 192, 1);
  text-align: center;
  line-height: 0.4rem;
  margin-top: 0.2rem;
}
.barItem {
  width: 6.7rem;
  height: 1.46rem;
  background: url(../assets/img/barBg.png);
  background-size: 100% 100%;
  margin: 0.15rem auto;
  padding-top: 0.25rem;
  .liner {
    width: 6.18rem;
    height: 0.3rem;
    background: url(../assets/img/linerBg.png);
    background-size: 100% 100%;
    margin: 0 auto;
    position: relative;
    .store {
      display: block;
      width: 0.39rem;
      height: 0.39rem;
      background: rgba(128, 236, 209, 1);
      border-radius: 50%;
      font-size: 0.24rem;
      color: rgba(32, 88, 123, 1);
      text-align: center;
      line-height: 0.39rem;
      position: absolute;
      top: -0.06rem;
      z-index: 10;
      &.act {
        background: rgba(254, 255, 185, 1);
      }
      .gift {
        position: absolute;
        left: -0.1rem;
        top: 0.5rem;
        img {
          width: 0.6rem;
          height: 0.6rem;
        }
        strong {
          display: block;
          text-align: center;
          color: rgba(207, 234, 255, 1);
          font-size: 0.24rem;
          white-space: nowrap;
          margin-top: -0.15rem;
        }
      }
    }
    .actLiner {
      height: 0.15rem;
      background: rgba(254, 255, 185, 1);
      border-radius: 0.08rem;
      position: absolute;
      top: 0.08rem;
    }
  }
}
</style>
