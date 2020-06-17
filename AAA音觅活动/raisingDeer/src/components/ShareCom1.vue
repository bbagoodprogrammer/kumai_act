<template>
  <div class="shareCom1" :class="{mHeight:type == 2}">
    <div class="con" v-if="type == 1 || !type">
      <i class="close"></i>
      <div class="title"></div>
      <p class="tips1">很好玩，也送你一隻鹿寶寶</p>
      <img src="../assets/img/shareDeer1.png" alt="" class="derr1">
      <div class="giftBox">
        <p class="giftTips"></p>
        <div class="giftItem">
          <span v-for="(item,index) in giftArr" :key="index">
            <img :src="item.img" alt="">
            <strong>{{item.name}}</strong>
          </span>
        </div>
      </div>
      <div class="downApp" @click="downApp()"></div>
    </div>
    <div class="con2" v-if="type == 2">
      <div class="userMsg">
        <img v-lazy="sharePeople.avatar" alt="" class="avatar">
        <span>{{sharePeople.name}}</span>
      </div>
      <img :src="require(`../assets/img/shareDeer/shareTitle${sharePeople.lv}.png`)" alt="" class="title">
      <img :src="require(`../assets/img/supriseDeer/deer${sharePeople.lv}.png`)" alt="" class="deerImg">
      <div class="deerTips">
        {{supriseMsg[sharePeople.lv -1]}}
      </div>
      <div class="giftBox">
        <p class="giftTips"></p>
        <div class="giftItem">
          <span v-for="(item,index) in tipsArr[sharePeople.lv -1].gift" :key="index">
            <img :src="require(`../assets/img/derrGift/${item.img}.png`)" alt="">
            <strong v-html="item.msg"></strong>
          </span>
        </div>
      </div>
      <div class="downApp2" @click="downApp()"></div>
    </div>
  </div>
</template>
<script>
import APP from "../utils/openApp"
export default {
  props: ['sharePeople', 'type'],
  data() {
    return {
      giftArr: [
        {
          img: require('../assets/img/shareDeer/share1.png'),
          name: '梅花鹿背包禮物'
        },
        {
          img: require('../assets/img/shareDeer/shareCar.png'),
          name: '跑車特效禮物'
        },
        {
          img: require('../assets/img/shareDeer/share3.png'),
          name: '金幣'
        }
      ],
      supriseMsg: [
        '',
        '每天照鏡子自己顏值忽高忽低的,第一眼美第二眼更美',
        '我只想談個戀愛，又不是要統治世界，這麼難嗎！',
        '同一首歌，我會美聲唱法、民族唱法、流行唱法和走音唱法',
        '我自言自語六級、心裡話八級、熬夜杯九次奪冠、這麼厲害的我！'
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
  methods: {
    downApp() {
      APP()
    }
  }
}
</script>
<style lang="scss" scoped>
.shareCom1 {
  width: 6.88rem;
  height: 9.12rem;
  background: url(../assets/img/shareComBg.png);
  background-size: 100% 100%;
  position: absolute;
  top: 0.5rem;
  left: 0.31rem;
  &.mHeight {
    height: 10.25rem;
  }
  .con {
    .title {
      width: 4.06rem;
      height: 0.56rem;
      background: url(../assets/img/shareTitle1.png);
      background-size: 100% 100%;
      margin: 0.48rem auto 0;
    }
    .tips1 {
      color: #5f962d;
      font-weight: bold;
      text-align: center;
      margin-top: 0.19rem;
    }
    .derr1 {
      width: 4.49rem;
      height: 4.43rem;
      display: block;
      margin: -0.1rem auto 0;
    }
    .giftBox {
      margin-top: -0.28rem;
      padding: 0 0.55rem;
      .giftTips {
        width: 1.74rem;
        height: 0.28rem;
        background: url(../assets/img/getGiftTips.png);
        background-size: 100% 100%;
      }
      .giftItem {
        margin-top: 0.36rem;
        display: flex;
        justify-content: space-between;
        img {
          width: 1.68rem;
          height: 1.68rem;
          display: block;
        }
        strong {
          display: block;
          font-size: 0.24rem;
          font-weight: bold;
          color: #5f962d;
          text-align: center;
          margin-top: 0.16rem;
        }
      }
    }
  }
  .con2 {
    .userMsg {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0.36rem auto 0.27rem;
      color: #48850f;
      font-size: 0.32rem;
      margin-right: 0.13rem;
      .avatar {
        width: 0.58rem;
        height: 0.58rem;
        border-radius: 50%;
        border: 0.02rem solid #f7fc65;
        margin-right: 0.15rem;
      }
    }
    .title {
      width: 3.25rem;
      height: 0.45rem;
      display: block;
      margin: 0 auto;
    }
    .deerImg {
      width: 3.64rem;
      height: 3.59rem;
      display: block;
      margin: -0.22rem auto 0;
    }
    .deerTips {
      width: 5.54rem;
      padding: 0 0.15rem;
      height: 1.09rem;
      background: #d3f8ab;
      color: #48850f;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      margin: 0 auto 0;
    }
    .deerTips:before {
      content: "\0020";
      width: 0.67rem;
      height: 0.29rem;
      background: url(../assets/img/supriseDeer/deerSho.png);
      background-size: 100% 100%;
      position: absolute;
      top: -0.5rem;
      left: 0;
    }
    .giftBox {
      padding: 0 0.55rem;
      margin-top: 0.28rem;
      z-index: 12;
      .giftTips {
        width: 1.74rem;
        height: 0.28rem;
        background: url(../assets/img/getGiftTips.png);
        background-size: 100% 100%;
      }
      .giftItem {
        margin-top: 0.05rem;
        display: flex;
        justify-content: center;
        span {
          width: 33%;
          img {
            width: 1.2rem;
            height: 1.2rem;
            display: block;
            margin: 0 auto;
          }
          strong {
            display: block;
            width: 110%;
            margin-left: -0.15rem;
            font-size: 0.22rem;
            font-weight: bold;
            color: #5f962d;
            text-align: center;
          }
        }
      }
    }
  }
  .downApp {
    width: 4.18rem;
    height: 1.02rem;
    background: url(../assets/img/singUp2.png);
    background-size: 100% 100%;
    position: absolute;
    bottom: -1.3rem;
    left: 1.21rem;
  }
  .downApp2 {
    width: 4.18rem;
    height: 1.02rem;
    background: url(../assets/img/shareBtn2.png);
    background-size: 100% 100%;
    margin: 0.15rem auto;
  }
}
</style>
