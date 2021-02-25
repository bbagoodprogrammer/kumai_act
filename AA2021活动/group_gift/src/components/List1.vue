<template>
  <div class="giftList" :class="{my_gronp:my_group.length}">
    <ul>
      <li v-for="(item,index) in gift" :key="index" :class="{over:item.group_num >= item.num}">
        <div class="itemNums">{{item.group_num}}/{{item.num}}</div>
        <img :src="item.image" alt="" class="giftImg">
        <div class="giftName">{{item.name}} <i>{{item.kind?'K房':'歌曲'}}</i> </div>
        <div class="price">
          <span>最低<em>{{item.min_price}}</em></span> <i class="icon"></i><del>{{item.price}}金幣</del>
        </div>
        <div class="buy" @click="setGift(item)">
          發起拼團
        </div>
      </li>
    </ul>
    <!-- 當前選擇禮物 -->
    <div class="mask" v-show="showSelectGiftItem">
      <transition name="slide">
        <div class="giftItemPup" v-show="showSelectGiftItem">
          <i class="close" @click=" closePup()"></i>
          <div class="giftItemMsg">
            <div class="imgBox">
              <img :src="actItem.image" alt="">
            </div>
            <div class="msg">
              <div class="giftName">{{actItem.name}} <i>{{actItem.kind?'K房':'歌曲'}}</i></div>
              <div class="price">
                <span><em>{{actItem.min_price}}</em></span> <i class="icon"></i><del>{{actItem.price}}金幣</del>
              </div>
              <div class="giftPupTips">（若拼團未成功，金幣將退回您的錢包）</div>
            </div>
          </div>
          <div class="selectType1" v-if="selectType == 1">
            <div class="selectSet">
              <span>發起團人數</span>
              <div class="numsInput">
                <span class="reduex" @click="selectNums >2?selectNums--:false">-</span>
                <input type="text" v-model="selectNums" readonly>
                <span class="add" @click="selectNums <5?selectNums++:false">+</span>
              </div>
            </div>
            <div class="selectSet">
              <span>購買數量</span>
              <div class="nums">1</div>
            </div>
            <div class="selectSet">
              <span>支付</span>
              <div class="nums">{{actItem.min_price* selectNums}}金幣</div>
            </div>
            <div class="go" @click="selectType = 2">發起拼團</div>
          </div>
          <div class="selectType2" v-else-if="selectType == 2">
            <div class="buyTips">發起拼團，需要支付{{actItem.min_price * selectNums}}金幣</div>
            <div class="btn">
              <span class="no" @click=" closePup()">否</span>
              <span class="qurey" @click="buy()">確認支付</span>
            </div>
          </div>
          <div class="selectType2" v-else-if="selectType == 3">
            <div class="buyTips left">此團還差<em>{{buyGiftData.surplus}}</em> 人就可以拼團成功，<br /> 每人可以以<em>{{buyGiftData.price}}</em> 金幣購買{{actItem.name}}*1</div>
            <div class="go" @click="showFriendsPup()">邀請好友拼團</div>
          </div>
        </div>
      </transition>
    </div>
    <!-- 儲值 -->
    <div class="mask" v-show="showNoCoiosPup">
      <transition name="slide">
        <div class="giftItemPup" v-show="showNoCoiosPup">
          <i class="close" @click="showNoCoiosPup = false"></i>
          <div class="noCoins">您的錢包餘額不足<br /> 請前去儲值</div>
          <div class="go no" @click="stored()">前去儲值</div>
        </div>
      </transition>
    </div>
    <!-- 好友 -->
    <div class="mask" v-show="showFriends">
      <transition name="slide">
        <Friends v-if="showFriends" :order_id="order_id" />
      </transition>
    </div>
  </div>
</template>
<script>

import Friends from "./Friends"
import { mapState } from "vuex"
import { start } from "../apis"

export default {
  components: { Friends },
  data() {
    return {
      selectNums: 2,
      selectType: 1,
      showNoCoiosPup: false,
      showSelectGiftItem: false,
      showFriends: false,
      actItem: {},
      buyGiftData: {},
      order_id: null
    }
  },
  computed: {
    ...mapState(['gift', 'my_group'])
  },
  methods: {
    setGift(item) {
      this.actItem = item
      this.showSelectGiftItem = true
    },
    buy() {
      start(this.actItem.gid, this.selectNums).then(res => {
        if (res.data.response_status.code == 0) {
          this.buyGiftData = res.data.response_data.data
          this.selectType = 3
        } else {
          if (res.data.response_status.code == 10006) {
            this.showNoCoiosPup = true
            return
          }
          // this.showFriends = true
          // this.order_id = 1
          this.toast(res.data.response_status.error)
        }

      })

    },
    showFriendsPup() {
      this.order_id = this.buyGiftData.id
      this.showFriends = true

    },
    closePup() {
      this.showSelectGiftItem = false
      this.selectNums = 1
      this.selectType = 1
    },
    stored() {
      location.href = "walletConfig://"
    }
  }
}
</script>
<style lang="scss"
 scoped>
.giftList {
  margin-top: 0.46rem;
  padding-bottom: 0.6rem;
  &.my_gronp {
    padding-bottom: 3.6rem;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    padding-right: 0.16rem;
    li {
      width: 2.28rem;
      height: 3.42rem;
      background: #ffffff;
      border-radius: 0.12rem;
      margin: 0 0 0.19rem 0.16rem;
      position: relative;
      padding-top: 0.28rem;
      .itemNums {
        padding: 0 0.15rem;
        height: 0.36rem;
        background: rgba(255, 121, 89, 1);
        border-radius: 0.12rem 0 0.12rem 0;
        font-size: 0.24rem;
        text-align: center;
        line-height: 0.36rem;
        color: #fff;
        position: absolute;
        left: 0;
        top: 0;
      }
      .giftImg {
        display: block;
        width: 1.6rem;
        height: 1.6rem;
        margin: 0 auto;
      }
      .giftName {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.28rem;
        margin-top: 0.2rem;
        color: rgba(133, 90, 55, 1);
        i {
          padding: 0 0.08rem;
          height: 0.3rem;
          line-height: 0.3rem;
          border: 1px solid #ff7959;
          border-radius: 0.06rem;
          font-size: 0.22rem;
          color: rgba(255, 121, 89, 1);
          margin-left: 0.05rem;
        }
      }
      .price {
        font-size: 0.18rem;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          color: rgba(255, 121, 89, 1);
          em {
            color: rgba(255, 121, 89, 1);
            font-size: 0.26rem;
            font-weight: 600;
            margin-left: 0.05rem;
          }
        }
        i {
          width: 0.28rem;
          height: 0.28rem;
          background: url(../img/coins.png);
          background-size: 100% 100%;
          margin: 0 0.06rem;
        }
        del {
          font-size: 0.18rem;
        }
      }
      .buy {
        width: 1.96rem;
        height: 0.48rem;
        background: linear-gradient(-90deg, #ff885a, #ff6957);
        border-radius: 0.24rem;
        text-align: center;
        font-size: 0.24rem;
        color: #fff;
        line-height: 0.48rem;
        margin: 0.15rem auto 0;
      }
      &.over {
        .itemNums,
        .buy {
          background: rgba(188, 188, 188, 1);
        }
      }
    }
  }
  .giftItemPup {
    width: 6.6rem;
    // height: 6.5rem;
    padding-bottom: 0.3rem;
    background: #ffffff;
    border-radius: 0.12rem;
    position: relative;
    .close {
      display: block;
      width: 0.27rem;
      height: 0.27rem;
      background: url(../img/close.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.32rem;
      right: 0.26rem;
    }
    .giftItemMsg {
      height: 2.24rem;
      display: flex;
      align-items: center;
      .imgBox {
        width: 1.6rem;
        height: 1.6rem;
        background: rgba(255, 245, 237, 0.92);
        border-radius: 0.06rem;
        margin: 0 0.14rem 0 0.2rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .msg {
        width: 3.8rem;
        .giftName {
          display: flex;
          align-items: center;
          // justify-content: center;
          font-size: 0.32rem;
          color: rgba(133, 90, 55, 1);
          i {
            padding: 0 0.08rem;
            height: 0.3rem;
            line-height: 0.3rem;
            border: 1px solid #ff7959;
            border-radius: 0.06rem;
            font-size: 0.22rem;
            color: rgba(255, 121, 89, 1);
            margin-left: 0.05rem;
          }
        }
        .price {
          font-size: 0.18rem;
          display: flex;
          align-items: center;
          // justify-content: center;
          span {
            color: rgba(255, 121, 89, 1);
            em {
              color: rgba(255, 121, 89, 1);
              font-size: 0.26rem;
              font-weight: 600;
              margin-left: 0.05rem;
            }
          }
          i {
            width: 0.28rem;
            height: 0.28rem;
            background: url(../img/coins.png);
            background-size: 100% 100%;
            margin: 0 0.06rem;
          }
          del {
            font-size: 0.18rem;
          }
        }
        .giftPupTips {
          font-size: 0.18rem;
          color: rgba(188, 168, 155, 1);
        }
      }
    }
    .selectSet {
      height: 0.9rem;
      padding: 0 0.32rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: rgba(133, 90, 55, 1);
      font-size: 0.26rem;
      .numsInput {
        display: flex;
        align-items: center;
        justify-content: center;
        input {
          width: 0.84rem;
          height: 0.36rem;
          line-height: 0.36rem;
          background: #fff6ee;
          border-radius: 0.06rem;
          border: none;
          text-align: center;
        }
        .reduex {
          margin-right: 0.05rem;
        }
        .add {
          margin-left: 0.05rem;
        }
      }
    }
    .go {
      width: 5.2rem;
      height: 0.8rem;
      background: linear-gradient(-90deg, #ff885a, #ff6957);
      border-radius: 0.4rem;
      text-align: center;
      line-height: 0.8rem;
      color: #fff;
      font-size: 0.32rem;
      margin: 0.4rem auto 0;
      &.no {
        margin: 0 auto;
      }
    }
    .selectType2 {
      .buyTips {
        height: 1.3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(133, 90, 55, 1);
        font-size: 0.26rem;
        em {
          color: rgba(255, 121, 89, 1);
        }
        &.left {
          display: block;
          justify-content: flex-start;
          padding: 0 0.3rem;
          height: 0.8rem;
          margin-top: 0.15rem;
        }
      }
      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          width: 2.8rem;
          height: 0.8rem;
          background: linear-gradient(
            -90deg,
            rgba(255, 136, 90, 0.1),
            rgba(255, 105, 87, 0.1)
          );
          border-radius: 0.4rem;
          text-align: center;
          line-height: 0.8rem;
          color: rgba(255, 133, 90, 1);
          &.qurey {
            color: #fff;
            background: linear-gradient(-90deg, #ff885a, #ff6957);
            margin-left: 0.43rem;
          }
        }
      }
    }
    .noCoins {
      height: 3.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: rgba(133, 90, 55, 1);
      font-size: 0.32rem;
    }
  }
}
</style>
