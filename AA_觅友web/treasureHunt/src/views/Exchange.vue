<template>
  <div class="exchange__container">
    <div class="navigator">
      <img class="arrow" @click="$router.go(-1)" src="../img/arrow.png" />
      {{ lang.super_exchange }}
      <div class="wealth">
        <img src="../img/treasure_3.png" />
        {{actInfo.shells}}
        <img src="../img/treasure_6.png" />
        {{actInfo.jewels}}
      </div>
    </div>
    <div class="exchange__main">
      <ul>
        <li v-for="(item, index) in list" :key="index" :ref="'goods'+index">
          <div class="header__box">
            <div class="clock">
              <img src="../img/clock.png" />
              <span>{{lang.day.replace('%s', item.effectiveTime || '')}}</span>
            </div>
            <img class="label__img" v-if="item.imageLabel" :src="item.imageLabel" />
          </div>
          <div class="goods_img__box">
            <img @click.stop="clickImg($event, index, item)" class="goods__img" :src="item.image" />
            <!-- gift tip -->
            <div v-if="showGiftTip && index == currentIndex" class="gift_tip__box" :class="{
                gift_tip__box_left: isTipLeft,
                gift_tip__box_right: !isTipLeft,
                gift_tip__box_lower: isTipLower,
                gift_tip__box_up: !isTipLower,
              }" @click.stop="">
              <div class="tip_header__box">
                <div class="img__box">
                  <img class="gift" :src="tipItem.image" />
                </div>
                <div>
                  <div class="name">{{tipItem.name}}</div>
                  <div class="coin__box">
                    <img src="../img/coin.png" />
                    <div>{{tipItem.price}}</div>
                  </div>
                </div>
              </div>
              <div class="gift_des">
                {{tipItem.caption}}
              </div>
              <!-- 箭头 -->
              <div :class="{
                  arrow_down: isArrowLower,
                  arrow_up: !isArrowLower,
                }"></div>
            </div>
          </div>
          <div class="name">{{item.name}}</div>
          <div class="num__box">
            <img v-if="item.payType == 'shell'" src="../img/treasure_3.png" />
            <img v-else src="../img/treasure_6.png" />
            <span>{{item.spendNum}}</span>
          </div>
          <div @click="handleExchange(item)" class="exchange__btn">{{ lang.exchange }}</div>
        </li>
      </ul>
    </div>

    <Loading :show="loading" />
  </div>
</template>

<script>
import { dateFormat } from "../utils/index";
import InnerScrollLoadList from "../components/common/InnerScrollLoadList";
import { getExchangeList, exchangeProp } from '../apis'
import { toast } from '../utils'
import { mapState } from "vuex";
import Loading from "../components/common/Loading";

export default {
  name: "Exchange",

  components: {
    InnerScrollLoadList,
    Loading
  },

  data () {
    return {
      list: [],
      showGiftTip: false,
      currentIndex: 0,
      isTipLeft: false,
      isTipLower: false,
      isArrowLower: false,
      tipItem: {},
    };
  },

  mounted () {
    this.$el.onclick = (event) => {
      if (this.showGiftTip) {
        this.showGiftTip = false
      }
    }
    this.fetchData()
  },

  methods: {

    async fetchData () {
      const res = await getExchangeList();
      if (res.data) {
        const { response_status, response_data } = res.data;
        if (response_status && response_status.error === "") {
          this.list = response_data.list
        } else if (response_status.error) {
          toast(response_status.error.replace(/\[\d+\]$/, ''));
        }
      }
    },

    clickImg (e, index, item) {
      if (this.showGiftTip && index == this.currentIndex) {
        this.showGiftTip = false
        return
      }

      this.tipItem = item
      // console.log("e=>", e.clientY);
      this.currentIndex = index;
      this.showGiftTip = true;
      // 判断当前的点击图片是否位于左边还是右边
      if ((index + 1) % 2 == 0) {
        this.isTipLeft = false;
      } else {
        this.isTipLeft = true;
      }
      // 判断是否展示在图片的上方还是下方
      if (e.clientY <= 250) {
        this.isTipLower = true;
        this.isArrowLower = false;
      } else {
        this.isTipLower = false;
        this.isArrowLower = true;
      }
    },

    async handleExchange (item) {
      if (item.payType == 'shell' && this.actInfo.shells < item.spendNum) {
        toast(this.lang.shell_not_enough)
        return
      }
      if (item.payType == 'jewel' && this.actInfo.jewels < item.spendNum) {
        toast(this.lang.jewel_not_enough)
        return
      }
      const res = await exchangeProp({ id: item.id });
      if (res.data) {
        const { response_status, response_data } = res.data;
        if (response_status && response_status.error === "") {
          toast(this.lang.exchange_succ)
          //改变贝壳或者彩砖的数量
          this.$store.commit('changeShellsJewels', {
            type: item.payType,
            num: item.spendNum
          })
        } else if (response_status.error) {
          toast(response_status.error.replace(/\[\d+\]$/, ''));
        }
      }
    }
  },

  computed: {
    lang: () => _lang,
    ...mapState([
      "actInfo",
      "loading"
    ])
  },
};
</script>

<style lang="scss">
.exchange__container {
  width: 100%;
  height: 9.3rem;
  background: #7a68f8;
  border-radius: 0.2rem 0.2rem 0rem 0rem;
  box-sizing: border-box;
  padding-top: 0.3rem;
  .navigator {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.42rem;
    font-weight: 400;
    height: 0.59rem;
    color: #ffffff;
    opacity: 1;
    position: relative;
    // line-height: 0.59rem;
    margin-bottom: 0.3rem;
    .arrow {
      width: 0.42rem;
      height: 0.42rem;
      position: absolute;
      left: 0.2rem;
    }
    .wealth {
      position: absolute;
      right: 0.24rem;
      top: 0;
      display: flex;
      align-items: center;
      color: #FFFFFF;
      opacity: 1;
      font-weight: 400;
      font-size: 0.28rem;
      height: 0.59rem;
      line-height: 0.59rem;
      img:last-child {
        margin-left: 0.3rem;
      }
      img {
        width: 0.36rem;
        height: 0.36rem;
        margin-right: 0.1rem;
      }
    }
  }
  .exchange__main {
    height: 8.11rem;
    overflow: auto;
    box-sizing: border-box;
    ul {
      display: flex;
      flex-wrap: wrap;
      padding-left: 0.15rem;
      padding-right: 0.15rem;
    }
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 3.42rem;
      height: 5.1rem;
      background: linear-gradient(180deg, #e2dff8 0%, #ffffff 100%);
      opacity: 1;
      border-radius: 0.1rem;
      margin-left: 0.09rem;
      margin-right: 0.09rem;
      margin-bottom: 0.2rem;
      position: relative;
      .header__box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
        padding: 0.2rem 0.3rem 0.33rem 0.3rem;
        .clock {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          height: 0.4rem;
          line-height: 0.4rem;
          font-size: 0.24rem;
          font-weight: bold;
          color: #7A68F8;
          opacity: 1;
          //background: red;
          img {
            width: 0.2rem;
            height: 0.2rem;
            margin-right: 0.09rem;
          }
        }
        // .label {
        //   width: 1.36rem;
        //   height: 0.4rem;
        //   background: linear-gradient(
        //     45deg,
        //     #f65a6e 0%,
        //     #b676f0 64%,
        //     #7d7df6 100%
        //   );
        //   opacity: 1;
        //   border-radius: 0.2rem;
        //   text-align: center;
        //   font-size: 0.24rem;
        //   font-weight: 400;
        //   line-height: 0.4rem;
        //   color: #ffffff;
        //   opacity: 1;
        // }
        .label__img {
          height: 0.4rem;
          flex-shrink: 1;
        }
      }
      .goods_img__box {
        width: 2rem;
        height: 2rem;
        position: relative;
        .goods__img {
          width: 2rem;
          height: 2rem;
        }
      }
      .name {
        height: 0.37rem;
        font-size: 0.26rem;
        font-weight: 400;
        line-height: 0.37rem;
        color: #666666;
        opacity: 1;
        margin-top: 0.13rem;
      }
      .num__box {
        display: flex;
        align-items: center;
        height: 0.45rem;
        font-size: 0.32rem;
        font-weight: 600;
        line-height: 0.45rem;
        color: #333333;
        opacity: 1;
        margin-top: 0.06rem;
        img {
          width: 0.36rem;
          height: 0.36rem;
          margin-right: 0.1rem;
        }
      }
      .exchange__btn {
        width: 1.56rem;
        height: 0.58rem;
        background: #7a68f8;
        border: 0.01rem solid rgba(0, 0, 0, 0);
        opacity: 1;
        border-radius: 0.36rem;
        font-size: 0.26rem;
        font-weight: 400;
        color: #ffffff;
        -webkit-text-stroke: 1 rgba(0, 0, 0, 0);
        text-stroke: 1 rgba(0, 0, 0, 0);
        opacity: 1;
        text-align: center;
        line-height: 0.58rem;
        margin-top: 0.29rem;
      }

      .gift_tip__box {
        width: 5.82rem;
        background: rgba(0, 0, 0, 0.8);
        border-radius: 0.3rem;
        position: absolute;
        z-index: 50;
        box-sizing: border-box;
        padding: 0.3rem;
        .arrow {
          position: absolute;
          width: 0;
          height: 0;
          border-width: 0.19rem;
          border-style: solid;
        }
        .arrow_up {
          @extend .arrow;
          top: -0.38rem;
          border-color: transparent transparent rgba(0, 0, 0, 0.8) transparent;
        }
        .arrow_down {
          @extend .arrow;
          bottom: -0.38rem;
          border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
        }
        .tip_header__box {
          display: flex;
          align-items: center;
          .img__box {
            width: 1.4rem;
            height: 1.4rem;
            position: relative;
            margin-right: 0.3rem;
            .gift {
              width: 100%;
              height: 100%;
            }
            .num {
              width: 0.51rem;
              height: 0.51rem;
              position: absolute;
              top: 0;
              right: 0;
            }
          }
          .name {
            height: 0.45rem;
            font-size: 0.32rem;
            font-weight: 400;
            line-height: 0.45rem;
            color: #ffffff;
            opacity: 1;
          }
          .coin__box {
            display: flex;
            align-items: center;
            font-size: 0.24rem;
            font-weight: 400;
            color: #ffdd00;
            opacity: 1;
            height: 0.33rem;
            margin-top: 0.04rem;
            img {
              width: 0.3rem;
              height: 0.3rem;
              margin-right: 0.04rem;
            }
          }
        }
        .gift_des {
          margin-top: 0.2rem;
          font-size: 0.26rem;
          font-weight: 400;
          line-height: 0.37rem;
          color: #ffffff;
          opacity: 0.6;
          word-wrap: break-word;
          white-space: normal;
          word-break: break-all;
        }
      }
      .gift_tip__box_left {
        left: 0rem;
        .arrow_up {
          left: 1rem;
          transform: translate(-50%);
        }
        .arrow_down {
          left: 1rem;
          transform: translate(-50%);
        }
      }
      .gift_tip__box_right {
        right: 0rem;
        .arrow_up {
          right: 1rem;
          transform: translate(50%);
        }
        .arrow_down {
          right: 1rem;
          transform: translate(50%);
        }
      }
      .gift_tip__box_lower {
        top: 2rem;
      }
      .gift_tip__box_up {
        bottom: 2rem;
      }
    }
  }
}
</style>