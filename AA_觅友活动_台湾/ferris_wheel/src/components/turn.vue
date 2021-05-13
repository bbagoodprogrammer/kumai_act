<template>
  <div class="turn">
    <div class="userCoins">
      <i class="icon"></i>
      <span class="nums">{{user_coins}}</span>
      <i class="add" @click="goWall()"></i>
    </div>
    <span class="go_1" @click="luck(0)">抽一次</span>
    <span class="go_10" @click="luck(1)">抽十次</span>
    <div class="gift" v-for="(item,index) in gift_list" :key="index" :class="[{act:index%2 ==0},'gift' + index]"></div>
    <!-- 禮物彈窗 -->
    <div class="mask" v-show="luckPup">
      <transition name="slide">
        <div class="luck_gift" v-if="luckPup" :class="{ten:giftList.length > 1}">
          <i class="close" @click="luckPup = false"></i>
          <div class="title">愛神祝福</div>
          <div class="giftList">
            <ul>
              <li v-for="(item,index) in luckGiftNums" :key="index">
                <div class="imgBox">
                  <img :src="luckImg[index]" alt="">
                  <i class="nusm">{{item}}</i>
                </div>
                <strong>{{gift_list[index].name}}</strong>
              </li>
            </ul>
          </div>
          <div class="luckTips">
            {{luckTips[1]}}
          </div>
          <div class="btns">
            <span class="st1" @click="luck(type)">再次召喚</span>
            <span class="st2" @click="luckPup = false">幸福收下</span>
          </div>
        </div>
      </transition>
    </div>
    <!-- 確認抽獎彈窗 -->
    <div class="mask" v-show="qureyLuckPup">
      <transition name="slide">
        <div class="queryLuck" v-show="qureyLuckPup">
          <div class="title">確認</div>
          <p class="coinsTips">召喚{{type?1:10}}次，需要花費{{type?50:500}}金幣</p>
          <div class="btns">
            <span class="st1" @click="luck(type,'again')">確定召喚</span>
            <span class="st2" @click="qureyLuckPup = false">我再想想</span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>

import { mapState } from "vuex"
import { luck_go } from "../apis"

export default {
  data () {
    return {
      luckPup: false,
      giftList: [],
      luckTips: {
        1: '恭喜獲得愛神送出的祝福—獎品名稱1,已經發放到你帳號啦，要幸福喲',
        2: '愛神降臨拉~丘比特手捧真愛飛入你心，恭喜獲得丘比特戒指！！',
        3: '恭喜獲得愛神送出的祝福，獎勵已發放到你的賬號了，要幸福喲',
        4: '愛神降臨啦～丘比特手捧真愛飛入你心，恭喜獲得丘比特戒指！！'
      },
      type: 0,
      qureyLuckPup: false
    }
  },
  computed: {
    ...mapState(['gift_list', 'user_coins', 'go_count']),
    luckImg () {
      return this.lang.luckImg
    },
    luckGiftNums () {
      var obj = {};
      for (var i = 0, l = this.giftList.length; i < l; i++) {
        var item = this.giftList[i];
        obj[item] = (obj[item] + 1) || 1;
      }
      console.log(obj)
      return obj;
    }
  },
  methods: {
    luck (val, again) {
      if (again) {
        this.qureyLuckPup = false
      }
      if (this.go_count || again) {
        this.type = val
        if (this.user_coins >= val ? 50 : 500) {
          luck_go(val).then(res => {
            if (res.data.response_status.code == 0) {
              let nums = this.go_count
              this.vxc('setGo_count', nums++)
              this.vxc('setUser_coins', res.data.response_data.coins)
              this.giftList = res.data.response_data.gift_ids
              this.luckPup = true
            } else {
              this.toast(res.data.response_status.error)
              if (res.data.response_status.code == 60001) {
                this.vxc('setUser_coins', res.data.response_data.coins)
              }
            }
          })
        } else {
          this.toast(`你的金幣不足哦~`)
        }
      } else {
        this.type = val
        this.qureyLuckPup = true
      }

    },
    goWall () {
      const ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      if (ios) {
        sendJsData('app://walletpage');
      } else {
        javascript: JSInterface.sendJsData('app://walletpage');
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
  margin: 0.79rem auto 1.1rem;
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
    // background: url(../img/gift_bg2.png);
    // background-size: 100% 100%;
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
    // &.act {
    //   background: url(../img/gift_bg.png);
    //   background-size: 100% 100%;
    // }
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
          overflow-y: scroll;
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
              position: relative;
            }
            .nusm {
              width: 0.65rem;
              height: 0.65rem;
              background: url(../img/luckGiftItem_10_icon.png);
              background-size: 100% 100%;
              position: absolute;
              bottom: -0.15rem;
              right: -0.15rem;
              text-align: center;
              line-height: 0.65rem;
              color: #bc6682;
              font-size: 0.22rem;
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
        // height: 2.8rem;
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
            img {
              width: 100%;
              height: 100%;
            }
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
  .queryLuck {
    width: 6.63rem;
    height: 3.82rem;
    background: url(../img/queryLuck.png);
    background-size: 100% 100%;
    padding-top: 0.3rem;
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
    .coinsTips {
      height: 0.7rem;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 0.4rem;
      text-align: center;
      font-size: 0.26rem;
      color: rgba(176, 97, 101, 1);
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