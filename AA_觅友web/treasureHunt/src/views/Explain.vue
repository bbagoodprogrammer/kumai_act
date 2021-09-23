<template>
  <div class="explain__container">
    <div class="navigator">
      <img @click="$router.go(-1)" src="../img/arrow.png" />
      {{ lang.how_to_play }}
    </div>
    <div class="explain__main">
      <div class="title title_margin">{{lang.treasure_hunt}}</div>
      <div class="des__box">
        <div class="num">1</div>
        <div class="des">{{lang.treasure_hunt_1}}</div>
      </div>
      <div class="des__box">
        <div class="num">2</div>
        <div class="des">{{ getTreasureHunt }}</div>
      </div>

      <div class="title">{{lang.lucky_moment}}</div>
      <div class="des__box">
        <div class="num">1</div>
        <div class="des">{{lang.lucky_moment_1}}</div>
      </div>
      <div class="des__box">
        <div class="num">2</div>
        <div class="des">{{lang.lucky_moment_2}}</div>
      </div>

      <div class="title">{{lang.super_treasure_hunt}}</div>
      <div class="des__box">
        <div class="num">1</div>
        <div class="des">{{getSuperTreasureHunt}}</div>
      </div>
      <div class="des__box">
        <div class="num">2</div>
        <div class="des">{{lang.super_treasure_hunt_2}}</div>
      </div>
      <div class="des__box">
        <div class="num">3</div>
        <div class="des">{{lang.super_treasure_hunt_3}}</div>
      </div>

      <div class="title">{{lang.super_value_exchange}}</div>
      <div class="des__box">
        <div class="num">1</div>
        <div class="des">{{lang.super_value_exchange_1}}</div>
      </div>
      <div class="des__box">
        <div class="num">2</div>
        <div class="des">{{lang.super_value_exchange_2}}</div>
      </div>

      <div class="title">{{lang.adventure_list}}</div>
      <div class="des__box">
        <div class="num">1</div>
        <div class="des">{{lang.adventure_list_1}}</div>
      </div>
      <div class="des__box">
        <div class="num">2</div>
        <div class="des">{{lang.adventure_list_2}}</div>
      </div>

      <div class="award__box">
        <div class="first__box">
          <div class="award__title">{{lang.adventure_first}}</div>
          <div class="des">{{lang.adventure_first_des}}</div>
          <div class="imgs">
            <img src="../img/award_1.png" />
            <img src="../img/award_2.png" />
            <img :src="images.award_3" />
            <img src="../img/award_4.png" />
          </div>
        </div>
        <div class="award__box_right">
          <div class="second__box">
            <div class="award__title">{{lang.adventure_second}}</div>
            <div class="des">{{lang.adventure_second_des}}</div>
            <div class="imgs">
              <img src="../img/award_1.png" />
              <img src="../img/award_4.png" />
            </div>
          </div>
          <div class="third__box">
            <div>
              <div class="award__title">{{lang.adventure_rest}}</div>
              <div class="des">{{lang.adventure_rest_des}}</div>
            </div>
            <img src="../img/award_4.png" />
          </div>
        </div>
      </div>

      <div class="title">{{lang.prop_get_rate}}</div>
      <div class="table table_first">
        <div class="tr">{{lang.general_treasure_hunt}}</div>
        <div class="tr">
          <div class="td">{{lang.item_name}}</div>
          <div class="td">{{lang.rate}}</div>
        </div>
        <div class="tr" v-for="(item, index) in ruleNormalList" :key="index">
          <div class="td">
            <div class="img__box">
              <img class="icon" :src="item.image" alt="" />
              <img v-if="item.num > 1" class="num__img" :src="require(`../img/X${item.num}.png`)" />
            </div>
            {{item.name}}
          </div>
          <div class="td">{{item.chance}}</div>
        </div>
      </div>
      <div class="table table_second">
        <div class="tr">{{lang.super_treasure_hunt}}</div>
        <div class="tr">
          <div class="td">{{lang.item_name}}</div>
          <div class="td">{{lang.rate}}</div>
        </div>
        <div class="tr" v-for="(item, index) in ruleSuperList" :key="index">
          <div class="td">
            <div class="img__box">
              <img class="icon" :src="item.image" alt="" />
              <img v-if="item.num > 1" class="num__img" :src="require(`../img/X${item.num}.png`)" />
            </div>
            {{item.name}}
          </div>
          <div class="td">{{item.chance}}</div>
        </div>
      </div>

      <div class="title">{{lang.other_explain}}</div>
      <div class="des__box">
        <div class="num">1</div>
        <div class="des">{{lang.other_explain_1}}</div>
      </div>
      <div class="des__box">
        <div class="num">2</div>
        <div class="des">{{lang.other_explain_2}}</div>
      </div>
      <div class="des__box">
        <div class="num">3</div>
        <div class="des">{{lang.other_explain_3}}</div>
      </div>
      <div class="des__box">
        <div class="num">4</div>
        <div class="des">{{lang.other_explain_4}}</div>
      </div>

    </div>
  </div>
</template>

<script>
// import img1 from '../img/treasure_1.png'
// import img2 from '../img/treasure_2.png'
// import img3 from '../img/treasure_3.png'
// import img4 from '../img/treasure_4.png'
// import img5 from '../img/treasure_5.png'
// import img6 from '../img/treasure_6.png'
// import img7 from '../img/treasure_7.png'
// import img8 from '../img/treasure_8.png'
// import img9 from '../img/treasure_9.png'
// import img10 from '../img/treasure_10.png'
// import img11 from '../img/treasure_11.png'
import { mapState } from "vuex";

export default {
  name: "Explain",

  data () {
    return {
      list: [],
      superList: []
    };
  },

  created () {
    // this.list = [
    //   {
    //     title: this.lang.gift_1,
    //     img: img1,
    //     rate: 5050
    //   },
    //   {
    //     title: this.lang.gift_2,
    //     img: img2,
    //     rate: 3000
    //   },
    //   {
    //     title: this.lang.gift_3,
    //     img: img3,
    //     rate: 1500
    //   },
    //   {
    //     title: this.lang.gift_4,
    //     img: img4,
    //     rate: 220
    //   },
    //   {
    //     title: this.lang.gift_5,
    //     img: img5,
    //     rate: 80
    //   },
    //   {
    //     title: this.lang.gift_6,
    //     img: img6,
    //     rate: 80
    //   },
    //   {
    //     title: this.lang.gift_7,
    //     img: img7,
    //     rate: 60
    //   },
    //   {
    //     title: this.lang.gift_8,
    //     img: img8,
    //     rate: 10
    //   }
    // ]
    // this.superList = [
    //   {
    //     title: this.lang.gift_1,
    //     img: img1,
    //     rate: 5596
    //   },
    //   {
    //     title: this.lang.gift_2,
    //     img: img2,
    //     rate: 1800
    //   },
    //   {
    //     title: this.lang.gift_3,
    //     img: img3,
    //     rate: 1600
    //   },
    //   {
    //     title: this.lang.gift_9,
    //     img: img9,
    //     rate: 600
    //   },
    //   {
    //     title: this.lang.gift_4,
    //     img: img4,
    //     rate: 180
    //   },
    //   {
    //     title: this.lang.gift_6,
    //     img: img6,
    //     rate: 120
    //   },
    //    {
    //     title: this.lang.gift_5,
    //     img: img5,
    //     rate: 60
    //   },
    //   {
    //     title: this.lang.gift_10,
    //     img: img10,
    //     rate: 40
    //   },
    //   {
    //     title: this.lang.gift_11,
    //     img: img11,
    //     rate: 4
    //   }
    // ]
  },

  computed: {
    lang: () => _lang,
    images: () => _images,
    ...mapState([
      "actInfo",
      "ruleNormalList",
      "ruleSuperList"
    ]),
    getTreasureHunt () {
      let count_1 = 1
      let count_10 = 10
      let count_100 = 100
      return this.lang.treasure_hunt_2
        .replace('{1}', this.actInfo.mapPrice * count_1 || '')
        .replace('{2}', count_1)
        .replace('{3}', this.actInfo.mapPrice * count_10 || '')
        .replace('{4}', count_10)
        .replace('{5}', this.actInfo.mapPrice * count_100 || '')
        .replace('{6}', count_100)
    },

    getSuperTreasureHunt () {
      let num = (1 / this.actInfo.superMaxNum * 100) + '%'
      return this.lang.super_treasure_hunt_1.replace('%s', num)
    }
  },
};
</script>

<style lang="scss">
.explain__container {
  width: 100%;
  height: 9.3rem;
  background: #7a68f8;
  border-radius: 0.2rem 0.2rem 0rem 0rem;
  box-sizing: border-box;
  padding-top: 0.3rem;
  // overflow: auto;
  .navigator {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.36rem;
    font-weight: 400;
    height: 0.5rem;
    color: #ffffff;
    opacity: 1;
    position: relative;
    margin-bottom: 0.3rem;
    img {
      width: 0.42rem;
      height: 0.42rem;
      position: absolute;
      left: 0.2rem;
    }
  }
  .explain__main {
    height: 8.2rem;
    overflow: auto;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    padding-bottom: 0.5rem;
    box-sizing: border-box;
    .title_margin {
      margin-top: 0 !important;
    }
    .title {
      height: 0.45rem;
      font-size: 0.32rem;
      font-weight: bold;
      line-height: 0.45rem;
      color: #FFFFFF;
      opacity: 1;
      margin-top: 0.3rem;
      margin-bottom: -0.06rem;
    }
    .des__box {
      display: flex;
      margin-top: 0.11rem;
      .num {
        flex-shrink: 0;
        width: 0.3rem;
        height: 0.3rem;
        background: url('../img/explain_icon.png');
        background-size: 100% 100%;
        color: #FFFFFF;
        font-size: 0.24rem;
        text-align: center;
        line-height: center;
        margin-right: 0.1rem;
        margin-top: 0.1rem;
      }
      .des {
        font-size: 0.26rem;
        font-weight: 400;
        line-height: 0.46rem;
        color: #FFFFFF;
        opacity: 0.9;
      }
    }

    .award__box {
      display: flex;
      justify-content: space-between;
      margin-top: 0.1rem;
      .first__box {
        width: 3.35rem;
        min-height: 4.4rem;
        background: #6253C7;
        border-radius: 0.2rem;
        .award__title {
          height: 0.4rem;
          font-size: 0.28rem;
          font-weight: bold;
          line-height: 0.4rem;
          color: #FFFFFF;
          padding-top: 0.2rem;
          padding-bottom: 0.06rem;
          margin-left: 0.18rem;
        }
        .des {
          font-size: 0.26rem;
          font-weight: 400;
          line-height: 0.3rem;
          color: #FFFFFF;
          opacity: 0.6;
          padding-left: 0.2rem;
          padding-right: 0.2rem;
        }
        .imgs {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          img {
            width: 1.4rem;
            height: 1.4rem;
            margin-left: 0.075rem;
            margin-right: 0.075rem;
            margin-top: 0.1rem;
          }
        }
      }
      .award__box_right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .second__box {
        width: 3.35rem;
        min-height: 2.63rem;
        background: #6253C7;
        border-radius: 0.2rem;
        .award__title {
          height: 0.4rem;
          font-size: 0.28rem;
          font-weight: bold;
          line-height: 0.4rem;
          color: #FFFFFF;
          padding-top: 0.2rem;
          padding-bottom: 0.06rem;
          margin-left: 0.18rem;
        }
        .des {
          font-size: 0.26rem;
          font-weight: 400;
          line-height: 0.3rem;
          color: #FFFFFF;
          opacity: 0.6;
          padding-left: 0.2rem;
          padding-right: 0.2rem;
        }
        .imgs {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          img {
            width: 1.4rem;
            height: 1.4rem;
            margin-left: 0.075rem;
            margin-right: 0.075rem;
            //margin-top: 0.1rem;
          }
        }
      }
      .third__box {
        width: 3.35rem;
        min-height: 1.55rem;
        background: #6253C7;
        border-radius: 0.2rem;
        display: flex;
        justify-content: space-between;
        .award__title {
          height: 0.4rem;
          font-size: 0.28rem;
          font-weight: bold;
          line-height: 0.4rem;
          color: #FFFFFF;
          padding-top: 0.2rem;
          padding-bottom: 0.06rem;
          margin-left: 0.18rem;
        }
        .des {
          font-size: 0.26rem;
          font-weight: 400;
          line-height: 0.3rem;
          color: #FFFFFF;
          opacity: 0.6;
          padding-left: 0.2rem;
          // padding-right: 0.2rem;
        }
        img {
          flex-shrink: 0;
          width: 1.4rem;
          height: 1.4rem;
          margin-right: 0.2rem;
          margin-top: 0.075rem;
        }
      }
    }

    .table_first {
      margin-top: 0.16rem;
    }
    .table_second {
      margin-top: 0.6rem;
    }
    .table {
      border-radius: 0.1rem;
      border: 0.01rem solid #6A5BD8;
      overflow: hidden;
      .tr:first-child {
        background: #6253C7;
        height: 0.88rem;
        line-height: 0.88rem;
        font-size: 0.28rem;
        font-weight: 400;
        color: #FFFFFF;
        border-top: none;
        justify-content: center;
      }
      .tr:nth-child(2) {
        background: #6A5BD8;
        height: 0.88rem;
        line-height: 0.88rem;
        .td {
          font-size: 0.28rem !important;
        }
      }
      .tr {
        display: flex;
        align-items: center;
        height: 0.76rem;
        border-top: 0.01rem solid #6A5BD8;
        .td:first-child {
          width: 50%;
          padding-left: 1.17rem;
          font-size: 0.26rem;
          font-weight: 400;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          .img__box {
            width: 0.4rem;
            height: 0.4rem;
            margin-right: 0.06rem;
            position: relative;
            .icon {
              width: 0.4rem;
              height: 0.4rem;
            }
            .num__img {
              width: 0.28rem;
              height: 0.28rem;
              position: absolute;
              top: -0.05rem;
              right: -0.08rem;
            }
          }
          // .img_double {
          //   width: 0.5rem;
          //   height: 0.4rem;
          // }
        }
        .td:last-child {
          width: 50%;
          text-align: center;
          color: #CAC2FC;
          font-weight: 400;
          font-size: 0.26rem;
        }
      }
    }
  }
}
</style>