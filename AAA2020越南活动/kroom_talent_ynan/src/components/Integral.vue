<template>
  <div class="Integral">
    <div class="scoreTips">
      <div class="lv">Cấp độ phóng khoáng <span> Lv.4</span></div>
      <div class="score">Tiêu phí xu <span>300</span></div>
    </div>
    <div class="giftLiner">
      <div class="liner_act_hid">
        <div class="liner_act_show"></div>
      </div>
      <div class="giftItem" v-for="(item,index) in giftArr" :key="index" :class="'item' + index">
        <span class="lv">Lv.{{index}}</span>
        <span class="coins">Lv.{{item.name}}</span>
        <img :src="item.img" alt="">
      </div>
    </div>
    <div class="tips">
      在禮物紅包/福運禮物/砸蛋探寶中消費金幣可獲得相應獎勵
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      giftArr: {
        1: {
          gift_tips: 'x30',
          img: require('../img/get_gift/giftItem_1.png'),
          name: '10金币'
        },
        2: {
          gift_tips: '7天',
          img: require('../img/get_gift/giftItem_2.png'),
          name: '30金币'
        },
        3: {
          img: require('../img/get_gift/giftItem_3.png'),
          name: '100金币'
        },
        4: {
          img: require('../img/get_gift/giftItem_4.png'),
          name: '300金币'
        },
        5: {
          gift_tips: '7天',
          img: require('../img/get_gift/giftItem_5.png'),
          name: '50金币'
        },
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
      width: 100%;
      height: 100%;
      position: absolute;
      width: 50%;
      overflow: hidden;
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
        right: 0.2rem;
      }
    }
  }
  .tips {
    font-size: 0.22rem;
    color: rgba(255, 254, 173, 1);
    text-align: center;
  }
}
</style>
