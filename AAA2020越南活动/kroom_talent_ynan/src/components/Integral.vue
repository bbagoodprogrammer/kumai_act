<template>
  <div class="Integral">
    <div class="scoreTips">
      <div class="lv">{{lang.integral_lv}}<span> Lv.{{Lv}}</span></div>
      <div class="score">{{lang.integral_coins}} <span>{{score}}</span></div>
    </div>
    <div class="giftLiner">
      <div class="liner_act_hid" :style="{width:giftArr[Lv]?giftArr[Lv].act_width:'0%'}">
        <div class="liner_act_show"></div>
      </div>
      <div class="giftItem" v-for="(item,index) in giftArr" :key="index" :class="'item' + index" @click="getGiftApi(index)">
        <span class="lv">Lv.{{index}}</span>
        <span class="coins">{{item.name}}</span>
        <img :src="item.img" alt="">
        <div class="linght" v-if="level[index] && level[index].can && !level[index].get"></div>
        <span class="gift_day" v-if="item.gift_tips">{{item.gift_tips}}</span>
      </div>
    </div>
    <div class="tips">
      {{lang.integral_tips}}
    </div>
    <div class="mask" v-show="showGiftPup">
      <transition name="slide">
        <div class="gift_pup" v-if="showGiftPup">
          <i class="close" @click="showGiftPup = false"></i>
          <div class="title">{{lang.integral_luck}}</div>
          <div class="imgBox">
            <img :src="giftArr[act_lv].img" alt="">
          </div>
          <div class="name">{{giftArr[act_lv].gname}}</div>
          <!-- <div class="gift_coins">5金幣/個</div> -->
          <div class="gift_tips">{{lang.integral_luckTips}}</div>
          <span class="ok" @click="showGiftPup = false">{{lang.integral_ok}}</span>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
import { getGift } from "../apis"
export default {
  data() {
    return {
      showGiftPup: false,
      act_lv: 0,
      // giftArr: {
      //   1: {
      //     gift_tips: 'x30',
      //     img: require('../img/get_gift/giftItem_1.png'),
      //     name: '10 xu',
      //     act_width: '13%',
      //     gname: '30 đậu'
      //   },
      //   2: {
      //     gift_tips: '7 ngày',
      //     img: require('../img/get_gift/giftItem_2.png'),
      //     name: '30 xu',
      //     act_width: '30%',
      //     gname: 'VIP 7 ngày'
      //   },
      //   3: {
      //     img: require('../img/get_gift/giftItem_3.png'),
      //     name: '100 xu',
      //     act_width: '50%',
      //     gname: 'Hoa Hồng （180 đậu）'
      //   },
      //   4: {
      //     img: require('../img/get_gift/giftItem_4.png'),
      //     name: '300 xu',
      //     act_width: '70%',
      //     gname: 'Pháo Tết（5 xu）'
      //   },
      //   5: {
      //     gift_tips: '7 ngày',
      //     img: require('../img/get_gift/giftItem_5.png'),
      //     name: '500 xu',
      //     act_width: '100%',
      //     gname: 'Kẹo Ngọt 7 ngày（110 xu）'
      //   },
      // }
    }
  },
  computed: {
    ...mapState(['level', 'Lv', 'score']),
    giftArr() {
      return this.lang.giftArr
    }
  },
  methods: {
    getGiftApi(lv) {
      if (!this.level[lv].get && this.level[lv].can) {
        getGift(lv).then(res => {
          if (res.data.response_status.code == 0) {
            this.act_lv = lv
            this.showGiftPup = true
            this.vxc('setLvState', lv)
          } else {
            this.toast(res.data.response_status.error)
          }
        })
      }

    }
  }
}
</script>
<style lang="scss">
.Integral {
  width: 6.82rem;
  height: 3rem;
  padding-top: 0.69rem;
  background: url(../img/Integral_bg.png);
  background-size: 100% 100%;
  margin: 0.42rem auto 0.61rem;
  .scoreTips {
    font-size: 0.24rem;
    padding: 0 0.69rem 0 0.59rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      font-size: 0.3rem;
    }
  }
  .giftLiner {
    width: 5.91rem;
    height: 0.17rem;
    background: url(../img/liner_bg.png);
    background-size: 100% 100%;
    position: relative;
    margin: 0.8rem auto;
    .liner_act_hid {
      height: 100%;
      position: absolute;
      overflow: hidden;
      border-radius: 0.12rem;
      .liner_act_show {
        width: 100%;
        height: 100%;
        background: url(../img/liner_act.png);
        background-size: 100% 100%;
      }
    }
    .giftItem {
      width: 0.74rem;
      height: 0.74rem;
      background: url(../img/get_gift/giftItem_bg.png);
      background-size: 100% 100%;
      position: absolute;
      top: -0.35rem;
      img {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 3;
      }
      .lv,
      .coins {
        display: block;
        width: 0.8rem;
        text-align: center;
        font-size: 0.22rem;
        position: absolute;
        white-space: nowrap;
      }
      .lv {
        top: -0.4rem;
      }
      .linght {
        width: 100%;
        height: 100%;
        background: url(../img/get_gift/lingt.png);
        background-size: 100% 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
      .gift_day {
        font-size: 0.22rem;
        font-weight: 600;
        text-shadow: rgba(89, 36, 197, 1) 1px 0 0, rgba(89, 36, 197, 1) 0 1px 0,
          rgba(89, 36, 197, 1) -1px 0 0, rgba(89, 36, 197, 1) 0 -1px 0;
        position: absolute;
        bottom: -0.05rem;
        right: -0.1rem;
        z-index: 5;
      }
      .coins {
        bottom: -0.4rem;
      }
      &.item1 {
        left: 0.33rem;
      }
      &.item2 {
        left: 1.45rem;
      }
      &.item3 {
        left: 2.58rem;
      }
      &.item4 {
        left: 3.7rem;
      }
      &.item5 {
        right: 0.3rem;
      }
    }
  }
  .tips {
    font-size: 0.22rem;
    color: rgba(255, 254, 173, 1);
    text-align: center;
    padding: 0 0.4rem;
  }
  .gift_pup {
    width: 4.77rem;
    height: 4.43rem;
    background: url(../img/get_gift/gift_bg.png);
    background-size: 100% 100%;
    position: relative;
    .close {
      display: block;
      width: 0.64rem;
      height: 0.64rem;
      background: url(../img/close.png);
      background-size: 100% 100%;
      position: absolute;
      bottom: -1rem;
      left: 2.06rem;
    }
    .title {
      height: 0.92rem;
      line-height: 1rem;
      text-align: center;
    }
    .imgBox {
      width: 1.5rem;
      height: 1.5rem;
      background: url(../img/get_gift/gift_item_bg.png);
      background-size: 100% 100%;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .gift_coins,
    .name {
      font-size: 0.22rem;
      text-align: center;
    }
    .gift_coins {
      opacity: 0.5;
    }
    .gift_tips {
      font-size: 0.22rem;
      color: rgba(248, 211, 255, 1);
      margin: 0.1rem auto 0;
      text-align: center;
    }
    .ok {
      display: block;
      width: 1.4rem;
      height: 0.54rem;
      line-height: 0.46rem;
      font-size: 0.26rem;
      background: url(../img/get_gift/ok.png);
      background-size: 100% 100%;
      text-align: center;
      margin: 0.1rem auto 0;
    }
  }
}
</style>
