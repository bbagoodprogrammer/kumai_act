<template>
  <div class="barBox">
    <div class="barTips">成長值</div>
    <div class="bar">
      <span v-for="(item,index) in lvArr" :key="index" class="spot" :class="[{act:userMsg.deer_exp>=item},'spot'+index]" @click="showDeerGiftPup(index)">
        <em>{{item}}</em>
        <img :src="require(`../assets/img/bar/barDeer${index +1}.png`)" alt="" :class="'barDeer'+index">
      </span>
      <div class="actBar" :style="{width:actWidth}">
        <i class="actliner"></i>
      </div>
    </div>
    <div class="mask" v-show="showDeerGift">
      <transition name="slide">
        <div class="deerMsg" :class="'deer'+index" v-if="showDeerGift">
          <i class="close" @click="closeHistory()"></i>
          <img :src="titleArr[index]" alt="" class="title" :class="'title'+index">
          <strong class="deerTips">{{tipsArr[index].tips}}</strong>
          <div class="gift">
            <span class="giftItem" v-for="(item,index) in tipsArr[index].gift" :key="index">
              <img :src="require(`../assets/img/derrGift/${item.img}.png`)" alt="">
              <strong v-html="item.msg"></strong>
            </span>
          </div>
          <p class="lastMsg">獎勵在活動結束後，統一發放到玩家的賬號中</p>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      showDeerGift: false,
      index: 1,
      titleArr: [
        '',
        require('../assets/img/derrGift/titile1.png'),
        require('../assets/img/derrGift/titile2.png'),
        require('../assets/img/derrGift/titile3.png'),
        require('../assets/img/derrGift/titile4.png')
      ],
      tipsArr: [
        {},
        {
          tips: '即養成顏值逆天鹿',
          gift: [
            {
              img: 'deer2',
              msg: '顏值逆天鹿禮物 </br> <i>（2金幣）x5</i>'
            },
            {
              img: 'coins1',
              msg: '30金幣'
            }
          ]
        },
        {
          tips: '即養成桃花旺旺鹿',
          gift: [
            {
              img: 'deer2',
              msg: '顏值逆天鹿禮物 </br> <i>（2金幣）x5</i>'
            },
            {
              img: 'deer3',
              msg: '桃花旺旺鹿禮物 </br> <i>（5金幣）x5</i>'
            },
            {
              img: 'coins2',
              msg: '50金幣'
            }
          ]
        },
        {
          tips: '即養成天籟之聲鹿',
          gift: [
            {
              img: 'deer3',
              msg: '桃花旺旺鹿禮物 </br> <i>（5金幣）x5</i>'
            },
            {
              img: 'deer4',
              msg: '天籟之聲鹿禮物 </br> <i>（20金幣）x3</i>'
            },
            {
              img: 'coins3',
              msg: '80金幣'
            }
          ]
        },
        {
          tips: '即養成才華橫溢鹿',
          gift: [
            {
              img: 'deer4',
              msg: '天籟之聲鹿禮物 </br> <i>（20金幣）x3</i>'
            },
            {
              img: 'deer5',
              msg: '才華橫溢鹿禮物 </br> <i>（108金幣）x3</i>'
            },
            {
              img: 'coins4',
              msg: '100金幣'
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapState(['lvArr', 'userMsg']),
    actWidth() {
      for (let i = this.lvArr.length - 1; i >= 0; i--) {
        if (this.userMsg.deer_exp >= this.lvArr[this.lvArr.length - 1]) {
          return '100%'
        } else if (this.userMsg.deer_exp >= this.lvArr[i]) {
          let c = this.lvArr[i + 1] - this.lvArr[i]
          let t = this.userMsg.deer_exp - this.lvArr[i]
          let a = (t / c) * 100 / 5
          return (25 * i + a) + '%'
        }
      }
    }
  },
  methods: {
    showDeerGiftPup(val) {
      if (val == 0) return
      this.index = val
      this.showDeerGift = true
    },
    closeHistory() {
      this.showDeerGift = false
    }
  }
}
</script>
<style lang="scss" scoped>
.barBox {
  width: 100%;
  padding: 0 0.3rem;
  position: absolute;
  bottom: 1.05rem;
  display: flex;
  .barTips {
    color: #48850f;
    font-size: 0.24rem;
    font-weight: 600;
  }
  .bar {
    width: 5.18rem;
    height: 0.28rem;
    background: #b25927;
    box-sizing: border-box;
    border: 0.06rem solid rgba(72, 133, 15, 1);
    border-radius: 0.3rem;
    margin-left: 0.3rem;
    position: relative;
    .spot {
      position: absolute;
      display: block;
      width: 0.37rem;
      height: 0.37rem;
      background: url(../assets/img/spot1.png);
      background-size: 100% 100%;
      top: -0.1rem;
      text-align: center;
      em {
        display: block;
        width: 200%;
        text-align: center;
        margin: 0.5rem 0 0 -0.2rem;
        color: #48850f;
        font-size: 0.24rem;
      }
      img {
        width: 1.1rem;
        height: 1.1rem;
        position: absolute;
        bottom: 0.45rem;
        left: -0.38rem;
      }
      &.act {
        background: url(../assets/img/spot2.png);
        background-size: 100% 100%;
      }
      &.spot0 {
        left: -0.185rem;
      }
      &.spot1 {
        left: 1.05rem;
      }
      &.spot2 {
        left: 2.3rem;
      }
      &.spot3 {
        left: 3.58rem;
      }
      &.spot4 {
        right: -0.185rem;
      }
    }
    .actBar {
      overflow: hidden;
      border-radius: 0.3rem;
      .actliner {
        display: block;
        width: 5.06rem;
        height: 0.16rem;
        background: url(../assets/img/actliner.png);
        background-size: 100% 100%;
      }
    }
  }
  .deerMsg {
    width: 6.42rem;
    height: 9.51rem;
    padding: 0 0.23rem;
    background: url(../assets/img/derrGift/bg2.png);
    background-size: 100% 100%;
    position: absolute;
    left: 0.31rem;
    top: 1.35rem;
    &.deer1 {
      width: 6.42rem;
      height: 6.8rem;
      background: url(../assets/img/derrGift/bg1.png);
      background-size: 100% 100%;
      .lastMsg {
        margin-top: 0.48rem;
      }
    }
    .close {
      display: block;
      width: 0.32rem;
      height: 0.32rem;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0.44rem;
      top: 0.44rem;
    }
    .title {
      width: 4.82rem;
      height: 0.56rem;
      display: block;
      margin: 0.85rem auto 0;
      &.title1 {
        width: 4.43rem;
        height: 0.56rem;
      }
    }
    .deerTips {
      text-align: center;
      color: #5f962d;
      font-weight: bold;
      display: block;
      margin: 0.23rem auto 0.32rem;
    }
    .gift {
      text-align: center;
      .giftItem {
        width: 50%;
        display: inline-block;
        vertical-align: top;
        margin-bottom: 0.25rem;
        img {
          display: block;
          width: 1.8rem;
          height: 1.9rem;
          margin: 0 auto;
        }
        strong {
          text-align: center;
          color: #3b7108;
          font-weight: bold;
          display: block;
          margin: 0.25rem auto 0;
        }
      }
    }
    .lastMsg {
      color: #5faf14;
      font-size: 0.24rem;
      font-weight: bold;
      text-align: center;
      margin-top: 0.3rem;
    }
  }
}
</style>
