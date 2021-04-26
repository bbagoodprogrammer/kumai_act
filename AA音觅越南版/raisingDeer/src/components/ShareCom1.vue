<template>
  <div class="shareCom1" :class="{mHeight:type == 2}">
    <div class="con" v-if="type == 1 || !type">
      <i class="close"></i>
      <div class="title"></div>
      <p class="tips1">rất vui! Tặng bạn 1 bé hưu nhé!</p>
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
  data () {
    return {
      giftArr: [
        {
          img: require('../assets/img/shareDeer/share1.png'),
          name: 'Quà túi hưu sao'
        },
        {
          img: require('../assets/img/shareDeer/shareCar.png'),
          name: 'Quà hiệu ứng siêu xe'
        },
        // {
        //   img: require('../assets/img/shareDeer/share3.png'),
        //   name: '金幣'
        // }
      ],
      supriseMsg: [
        '',
        'Mỗi ngày soi gương, tôi thấy mình ngày càng đẹp hơn',
        'Tôi chỉ muốn được hẹn hò, chẳng phải làm chủ thế giới... mà sao khó thế',
        'Cùng một bài hát, nhưng tôi có thể hát theo kiểu dân ca, nhạc trẻ và cả nhạc rap.',
        'Tôi tự kỷ cấp 6, tâm sự cấp 8, 9 lần vô địch cú đêm, quá dữ!'
      ],
      tipsArr: [
        {},
        {
          tips: 'Sẽ nuôi được hưu siêu đẹp',
          gift: [
            {
              img: 'deer2',
              msg: 'Hưu siêu đẹp </br> <i>x3</i>'
            },
            // {
            //   img: 'coins1',
            //   msg: '30金幣'
            // }
          ]
        },
        {
          tips: 'Sẽ nuôi được hưu hoa đào',
          gift: [
            {
              img: 'deer2',
              msg: 'Hưu siêu đẹp </br> <i>x3</i>'
            },
            {
              img: 'deer3',
              msg: 'Hưu hoa đào </br> <i>x3</i>'
            },
            // {
            //   img: 'coins2',
            //   msg: '50金幣'
            // }
          ]
        },
        {
          tips: 'Sẽ nuôi được hưu hoang dã',
          gift: [
            {
              img: 'deer3',
              msg: 'Hưu hoa đào </br> <i>x3</i>'
            },
            {
              img: 'deer4',
              msg: 'Hưa hoang dã </br> <i>x3</i>'
            },
            // {
            //   img: 'coins3',
            //   msg: '80金幣'
            // }
          ]
        },
        {
          tips: 'Sẽ nuôi được hưu tài hoa',
          gift: [
            {
              img: 'deer4',
              msg: 'Hưa hoang dã </br> <i>x3</i>'
            },
            {
              img: 'deer5',
              msg: 'Hưu tài hoa </br> <i>x3</i>'
            },
            // {
            //   img: 'coins4',
            //   msg: '100金幣'
            // }
          ]
        }
      ]
    }
  },
  methods: {
    downApp () {
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
        width: 2.57rem;
        height: 0.4rem;
        background: url(../assets/img/getGiftTips.png);
        background-size: 100% 100%;
      }
      .giftItem {
        margin-top: 0.36rem;
        display: flex;
        justify-content: center;
        span:last-child {
          margin-left: 0.5rem;
        }
        img {
          width: 1.68rem;
          height: 1.68rem;
          display: block;
          margin: 0 auto;
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
      content: '\0020';
      width: 1.42rem;
      height: 0.32rem;
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
