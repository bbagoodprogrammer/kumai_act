<template>
  <div class="slice">
    <div class="slice_tips">
      <i></i>
      <strong> {{lang.slice_tips1}}</strong>
    </div>
    <div class="slice_con">
      <div class="slice_card">
        <div class="card">
          <span class="arr" v-for="(item,index) in 3" :key="'arr'+index" :class="'arr'+item"></span>
          <div class="fragmentItem" v-for="(item,index) in fragments" :key="index" :class="[{no_bg:item.num},'fragment'+item.id]">
            <i class="nums">{{item.id}}</i>
          </div>
        </div>
      </div>
      <div class="giftList">
        <div class="giftItem" v-for="(item,index) in giftList" :key="index + item">
          <img :src="item.img" alt="" v-if="light_up[gift_key[index]]">
          <img src="../img/gift_noOpen.png" alt="" v-else class="noOpen">
          <strong v-html="light_up[gift_key[index]]?item.name:'????'"></strong>
        </div>
      </div>
    </div>
    <div class="ufoLuck" @click="ufoluck()">
      {{lang.ufoLuck}}
    </div>
    <div class="user_tickNums">
      <em class="name">{{lang.ticket}}</em>
      <em>{{lang.ticket_used.replace(`$`,owner.coupons_used)}}</em>
      <em>{{lang.ticket_userNums.replace(`$`,owner.coupons)}}</em>
    </div>
    <div class="mask" v-show="ufoGift">
      <transition name="slide">
        <div class="ufoLuckPup" v-if="ufoGift">
          <i class="close" @click="ufoGift = false"></i>
          <div class="ufo_luckList">
            <div class="ufoGiftItem" v-for="(item,index) in ufoLuckGigft" :key="index">
              <div class="imgBox">
                <img src="../img/gift_1.png" alt="" v-if="item.type == 'bean'">
                <img src="../img/gift_2.png" alt="" v-else-if="item.type == 'coin'">
                <img :src=" item.image" alt="" v-else>
              </div>
              <strong>{{item.name}}</strong>
            </div>
          </div>

          <div class="get" @click="ufoGift = false">
            {{lang.star_get}}
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>

import { getSliceInfo, ufoLuck } from "../apis"
import { mapState } from "vuex"
export default {
  data () {
    return {
      ufoGift: false,
      ufoLuckGigft: [],// 集齊的情況下會返回獎勵列表,
      gift_key: [
        '1_2_3',
        '4_5_6',
        '7_8_9'
      ],
      //   giftList: [
      //     {
      //       img: require(`../img/gift_1.png`),
      //       name: '1000金豆'
      //     },
      //     {
      //       img: require(`../img/gift_2.png`),
      //       name: '1000金幣'
      //     },
      //     {
      //       img: require(`../img/gift_3.png`),
      //       name: '太空喵<br/>特效禮物*1'
      //     }
      //   ],
      fragments: {},
      light_up: []
    }
  },
  computed: {
    ...mapState(['owner']),
    giftList () {
      return this.lang.giftList
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      getSliceInfo().then(res => {
        console.log(res)
        this.fragments = res.data.response_data.fragments
        this.light_up = res.data.response_data.light_up
      })
    },
    ufoluck () {
      ufoLuck().then(res => {
        if (res.data.response_status.code == 0) {
          const { fragment, gifts } = res.data.response_data
          const id = fragment.id
          if (gifts) {
            this.ufoLuckGigft = gifts
            this.ufoGift = true
          } else {
            this.toast(`${this.lang.frame_get} ${fragment.name} * 1`)
          }
          let newNum = this.fragments[id].num + 1
          this.vxc('reduxCoupons')
          this.$set(this.fragments[id], 'num', newNum)
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.slice {
  //   padding-bottom: 0.57rem;
  .slice_tips {
    color: rgba(90, 172, 247, 1);
    padding: 0 0.4rem 0 0.27rem;
    margin-top: 0.4rem;
    line-height: 0.28rem;
    i {
      display: inline-block;
      width: 0.22rem;
      height: 0.22rem;
      background: url(../img/tips.png);
      background-size: 100% 100%;
    }
    strong {
      font-size: 0.2rem;
    }
  }
  .slice_con {
    margin-top: 0.3rem;
    display: flex;
    .slice_card {
      width: 5.41rem;
      height: 5.42rem;
      background: url(../img/slice_bg.png);
      background-size: 100% 100%;
      margin-left: 0.33rem;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      .card {
        width: 5.2rem;
        height: 5.21rem;
        background: url(../img/slice_card.png);
        background-size: 100% 100%;
        position: relative;
        .arr {
          display: block;
          width: 0.52rem;
          height: 0.67rem;
          background: url(../img/arr.png);
          background-size: 100% 100%;
          position: absolute;
          z-index: 2;
          &.arr1 {
            top: 0.51rem;
            right: -0.4rem;
          }
          &.arr2 {
            top: 2.3rem;
            right: -0.4rem;
          }
          &.arr3 {
            top: 3.9rem;
            right: -0.4rem;
          }
        }
        .fragmentItem {
          position: absolute;

          .nums {
            display: block;
            width: 0.34rem;
            height: 0.34rem;
            background: url(../img/frame_nums.png);
            background-size: 100% 100%;
            text-align: center;
            line-height: 0.34rem;
            color: rgba(147, 224, 253, 1);
            font-size: 0.26rem;
            position: absolute;
          }
          &.no_bg {
            background: none !important;
          }
          &.fragment1 {
            width: 1.73rem;
            height: 1.73rem;
            background: url(../img/frame/frame_1.png);
            background-size: 100% 100%;
            top: 0.03rem;
            left: 0.03rem;
            .nums {
              top: 0.14rem;
              left: 0.14rem;
            }
          }
          &.fragment2 {
            width: 2.15rem;
            height: 1.98rem;
            background: url(../img/frame/frame_2.png);
            background-size: 100% 100%;
            top: 0.03rem;
            left: 1.53rem;
            .nums {
              top: 0.14rem;
              left: 0.32rem;
            }
          }
          &.fragment3 {
            width: 1.73rem;
            height: 1.95rem;
            background: url(../img/frame/frame_3.png);
            background-size: 100% 100%;
            top: 0.03rem;
            right: 0rem;
            .nums {
              top: 0.14rem;
              left: 0.11rem;
            }
          }
          &.fragment4 {
            width: 1.73rem;
            height: 2.14rem;
            background: url(../img/frame/frame_4.png);
            background-size: 100% 100%;
            top: 1.52rem;
            left: 0.03rem;
            .nums {
              top: 0.33rem;
              left: 0.14rem;
            }
          }
          &.fragment5 {
            width: 2.16rem;
            height: 1.73rem;
            background: url(../img/frame/frame_5.png);
            background-size: 100% 100%;
            top: 1.73rem;
            left: 1.52rem;
            .nums {
              top: 0.13rem;
              left: 0.33rem;
            }
          }
          &.fragment6 {
            width: 1.73rem;
            height: 1.92rem;
            background: url(../img/frame/frame_6.png);
            background-size: 100% 100%;
            top: 1.73rem;
            right: 0.03rem;
            .nums {
              top: 0.13rem;
              left: 0.11rem;
            }
          }
          &.fragment7 {
            width: 1.73rem;
            height: 1.73rem;
            background: url(../img/frame/frame_7.png);
            background-size: 100% 100%;
            bottom: 0.03rem;
            left: 0.03rem;
            .nums {
              top: 0.13rem;
              left: 0.14rem;
            }
          }
          &.fragment8 {
            width: 2.15rem;
            height: 1.98rem;
            background: url(../img/frame/frame_8.png);
            background-size: 100% 100%;
            bottom: 0.02rem;
            left: 1.53rem;
            .nums {
              top: 0.37rem;
              left: 0.31rem;
            }
          }
          &.fragment9 {
            width: 1.73rem;
            height: 1.74rem;
            background: url(../img/frame/frame_9.png);
            background-size: 100% 100%;
            bottom: 0.03rem;
            right: 0.03rem;
            .nums {
              top: 0.14rem;
              left: 0.11rem;
            }
          }
        }
      }
    }
    .giftList {
      flex: 1;
      margin-left: 0.17rem;
      .giftItem {
        width: 1.48rem;
        margin: 0 auto;
        img {
          width: 1.48rem;
          height: 1.48rem;
        }
        strong {
          display: block;
          text-align: center;
          font-size: 0.22rem;
          color: rgba(147, 249, 253, 1);
          margin-top: -0.1rem;
        }
        .noOpen {
          margin-bottom: 0.15rem;
        }
      }
    }
  }
  .ufoLuck {
    width: 3.29rem;
    height: 0.85rem;
    background: url(../img/ball_luck.png);
    background-size: 100% 100%;
    margin: 0.54rem auto 0;
    text-align: center;
    line-height: 0.85rem;
    font-weight: 500;
    font-style: italic;
    font-size: 0.4rem;
  }
  .user_tickNums {
    text-align: center;
    margin-top: 0.23rem;
    em {
      color: rgba(147, 224, 253, 1);
      font-size: 0.26rem;
    }
    .name {
      color: rgba(229, 89, 236, 1);
    }
  }
  .ufoLuckPup {
    position: relative;
    .close {
      display: block;
      width: 0.75rem;
      height: 0.75rem;
      background: url(../img/close.png);
      background-size: 100% auto;
      position: absolute;
      top: -1rem;
      right: 0rem;
    }
    .ufo_luckList {
      display: flex;
      align-content: center;
      justify-content: center;
      .ufoGiftItem {
        .imgBox {
          width: 1.7rem;
          height: 1.7rem;
          background: url(../img/luckGift_bg.png);
          background-size: 100% 100%;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 1.34rem;
            height: 1.34rem;
          }
        }
        strong {
          width: 1.7rem;
          height: 0.7rem;
          display: block;
          text-align: center;
          font-size: 0.26rem;
          margin: 0 auto;
        }
      }
      .ufoGiftItem:nth-child(2) {
        margin-left: 0.21rem;
      }
    }

    .get {
      width: 2.45rem;
      height: 0.74rem;
      background: url(../img/go.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.74rem;
      margin: 0.48rem auto 0;
    }
  }
}
</style>