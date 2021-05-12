<template>
  <div class="turn">
    <div class="userCoins">
      <i class="icon"></i>
      <span class="nums">99999</span>
      <i class="add"></i>
    </div>
    <span class="go_1" @click="luckPup = true">抽一次</span>
    <span class="go_10" @click="luckPup = true">抽十次</span>
    <div class="gift" v-for="(item,index) in 8" :key="index" :class="[{act:index%2 ==0},'gift' + index]">

    </div>
    <!-- 禮物彈窗 -->
    <div class="mask" v-show="luckPup">
      <transition name="slide">
        <div class="luck_gift" v-if="luckPup" :class="{ten:giftList.length > 1}">
          <i class="close" @click="luckPup = false"></i>
          <div class="title">愛神祝福</div>
          <div class="giftList">
            <ul>
              <li v-for="(item,index) in giftList" :key="index">
                <div class="imgBox">
                  <img :src="item.img" alt="">
                </div>
                <strong>{{item.name}}</strong>
              </li>
            </ul>
          </div>
          <div class="luckTips">
            {{luckTips[1]}}
          </div>
          <div class="btns">
            <span class="st1">再次召喚</span>
            <span class="st2">幸福收下</span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      luckPup: false,
      giftList: [
        {
          name: 'xxxx',
          img: ''
        },
        {
          name: 'xxxx',
          img: ''
        },
        {
          name: 'xxxx',
          img: ''
        },
        {
          name: 'xxxx',
          img: ''
        },
        {
          name: 'xxxx',
          img: ''
        }, {
          name: 'xxxx',
          img: ''
        },

      ],
      giftArr: [
        {
          img: '',
          name: ''
        },
        {
          img: '',
          name: ''
        },
        {
          img: '',
          name: ''
        },
        {
          img: '',
          name: ''
        }
      ],
      luckTips: {
        1: '恭喜獲得愛神送出的祝福—獎品名稱1,已經發放到你帳號啦，要幸福喲',
        2: '愛神降臨拉~丘比特手捧真愛飛入你心，恭喜獲得丘比特戒指！！',
        3: '恭喜獲得愛神送出的祝福，獎勵已發放到你的賬號了，要幸福喲',
        4: '愛神降臨啦～丘比特手捧真愛飛入你心，恭喜獲得丘比特戒指！！'
      }
    }
  }
}
</script>

<style lang="scss">
.turn {
  width: 6.82rem;
  height: 6.87rem;
  position: relative;
  background: url(../img/turn_bg.png);
  background-size: 100% 100%;
  margin: 0.79rem auto 1.4rem;
  .userCoins {
    width: 1.79rem;
    height: 0.36rem;
    padding-right: 0.07rem;
    background: url(../img/userCoins_bg.png);
    background-size: 100% 100%;
    position: absolute;
    top: -0.5rem;
    right: 0.17rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .icon {
      display: block;
      width: 0.38rem;
      height: 0.38rem;
      background: url(../img/userCoins_coins.png);
      background-size: 100% 100%;
      margin: -0.03rem 0 0 -0.03rem;
    }
    .nums {
      flex: 1;
      margin: 0 0.15rem;
      font-size: 0.26rem;
      text-align: right;
    }
    .add {
      width: 0.24rem;
      height: 0.24rem;
      background: url(../img/userCoins_add.png);
      background-size: 100% 100%;
    }
  }
  .go_1,
  .go_10 {
    width: 2.6rem;
    height: 0.93rem;
    position: absolute;
    top: 2.47rem;
    left: 2.1rem;
    background: url(../img/go_1.png);
    background-size: 100% 100%;
    text-align: center;
    line-height: 0.93rem;
    font-weight: 500;
  }
  .go_10 {
    top: 3.5rem;
    background: url(../img/go_10.png);
    background-size: 100% 100%;
  }
  .gift {
    width: 2.03rem;
    height: 2.03rem;
    background: url(../img/gift_bg2.png);
    background-size: 100% 100%;
    position: absolute;
    &.gift0 {
      top: -0.66rem;
      left: 2.5rem;
    }
    &.gift1 {
      top: 0.41rem;
      right: 0rem;
    }
    &.gift2 {
      top: 2.66rem;
      right: -0.24rem;
    }
    &.gift3 {
      top: 4.88rem;
      right: 0.03rem;
    }
    &.gift4 {
      bottom: -0.66rem;
      left: 2.5rem;
    }
    &.gift5 {
      top: 4.88rem;
      left: 0.03rem;
    }
    &.gift6 {
      top: 2.66rem;
      left: -0.24rem;
    }
    &.gift7 {
      top: 0.41rem;
      left: 0rem;
    }
    &.act {
      background: url(../img/gift_bg.png);
      background-size: 100% 100%;
    }
  }
  .luck_gift {
    width: 6.82rem;
    height: 6.46rem;
    background: url(../img/luck_gift.png);
    background-size: 100% 100%;
    padding-top: 0.28rem;
    position: relative;
    &.ten {
      width: 7.29rem;
      height: 7.78rem;
      background: url(../img/luck_ten_bg.png);
      background-size: 100% 100%;
      .giftList {
        ul {
          height: 3.6rem;
          margin-top: 0.2rem;
          padding: 0 0.61rem 0 0.31rem;
          li {
            width: 1.18rem;
            margin: 0 0 0 0.3rem;
            .imgBox {
              width: 1.18rem;
              height: 1.18rem;
              background: url(../img/luckGiftItem_10.png);
              background-size: 100% 100%;
            }
          }
        }
      }
      .luckTips {
        margin-top: 0.25rem;
      }
    }
    .close {
      display: block;
      width: 0.62rem;
      height: 0.62rem;
      background: url(../img/close.png);
      background-size: 100% 100%;
      position: absolute;
      top: -0.8rem;
      right: 0.5rem;
    }
    .title {
      height: 1.1rem;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.34rem;
      color: rgba(188, 37, 104, 1);
      font-weight: 500;
    }
    .giftList {
      ul {
        padding: 0 0.61rem;
        height: 2.8rem;
        // overflow-y: scroll;
        display: flex;
        flex-wrap: wrap;
        li {
          margin-left: 1.71rem;
          width: 2.25rem;
          .imgBox {
            width: 2.25rem;
            height: 2.25rem;
            background: url(../img/luckGiftItem.png);
            background-size: 100% 100%;
          }
          strong {
            width: 100%;
            min-height: 0.6rem;
            color: rgba(188, 102, 130, 1);
            font-size: 0.24rem;
            display: block;
            text-align: center;
            margin-top: 0.05rem;
          }
        }
      }
    }
    .luckTips {
      padding: 0 0.8rem;
      color: rgba(176, 97, 101, 1);
      font-size: 0.26rem;
      text-align: center;
    }
    .btns {
      padding: 0 0.97rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 0.32rem;
      span {
        width: 2.19rem;
        height: 0.74rem;
        text-align: center;
        line-height: 0.74rem;
        &.st1 {
          background: url(../img/st1.png);
          background-size: 100% 100%;
        }
        &.st2 {
          background: url(../img/st12.png);
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>