<template>
  <div class="integral">
    <div class="intergralCon">
      <div class="userInter">{{lang.integral}}<em>{{integral}}</em></div>
      <div class="gifts">
        <span v-for="(item,index) in gift[nowDay]" :key='index' :class="'span'+index">
          <em v-html="getName(item.name)"></em>
          <img :src="item.img" alt="" @click="showGift(index)" :class="{shake: gift_list.gift_list && gift_list.gift_list[index].is_get==0&&sucStep>= (index+1)}">
        </span>
      </div>
      <div class="line">
        <div class="actLine" :style="{width:lineWidth}"></div>
        <span v-for="(item,index) in 4" :key="index" :class="['item'+item,{act:sucStep>=item}]">
        </span>
      </div>
      <div class="num">
        <span :class="{act:sucStep>=1}">70</span>
        <span :class="{act:sucStep>=2}">90</span>
        <span :class="{act:sucStep>=3}">130</span>
        <span :class="{act:sucStep>=4}">150</span>
      </div>
    </div>
    <transition name="slide">
      <div class="receivePup" v-if="showGiftPup">
        <div class="receivePupCon">
          <div class="title"></div>
          <span class="close" @click="closePup()"></span>
          <div class="type" v-if="type == 1">
            <p v-html="getDengji()" class="dengji"></p>
            <div class="imgBox">
              <img :src="getPupImg()" alt="">
            </div>
            <p class="giftName" v-html="getName(gift[nowDay][giftIndex].name)" v-if="giftIndex!==3"></p>
            <p class="giftName" v-else>بطاقة لتضاعف الهدية عشوائيا</br>هدية عشوائية من ثلاث هدايا سابقة نلتها اليوم*2</p>
            <p class="bean" v-if="giftIndex== 0">(الوصول {{gift_list.continue_login_counts}} أيام استمرارا)</p>
            <span class="lingqu" :class="{act:gift_list.gift_list[giftIndex].is_get == 0 && sucStep>=(giftIndex+1)}" @click="receive()">{{gift_list.gift_list[giftIndex].is_get==0?'استلام':'تم الاستلام'}}</span>
          </div>
          <div class="type2" v-else-if="type == 2">
            <div class="successTi">
              <div class="tips"></div>
              <span>استلام نجاحا!</span>
            </div>
            <p class="sucTips">
              تصل الجائزة إلى حسابك، تفضل بالتحقق

            </p>
          </div>
          <div class="type3" v-else-if="type == 3">
            <div class="imgBox">
              <img :src="getPupImgTwo()" alt="">
            </div>
            <p class="giftName" v-html="getNameTwo()" v-if="giftIndex == 3"></p>
            <span class="succeTitle">استلام نجاحا!</span>
            <p class="sucTips">
              تصل الجائزة إلى حسابك، تفضل بالتحقق
            </p>
          </div>
          <p class="giftTips" v-html="lang.todayGift[giftIndex].msg"></p>
        </div>
      </div>
    </transition>
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
  </div>
</template>
<script>
import lang from "../config/lang"
import gift from "../config/gift"
import { mapState } from "vuex"
import api from "../api/apiConfig"
import MsgToast from "../components/commonToast"
export default {
  components: { MsgToast },
  data() {
    return {
      lang: lang,
      gift: gift,
      giftIndex: 0,  //彈窗禮物索引
      showGiftPup: false,
      type: 1,
      tastMsg: '',
      showT: false,
      gift_name: 0
    }
  },
  computed: {
    ...mapState(['nowDay', 'integral', 'gift_list']),
    sucStep() {
      if (this.integral >= 150) {
        return 4
      } else if (this.integral >= 130) {
        return 3
      } else if (this.integral >= 90) {
        return 2
      } else if (this.integral >= 70) {
        return 1
      }
    },
    lineWidth() {
      if (this.integral >= 150) {
        return (94.25 + (this.integral - 150) / 100 * 100) + '%'
      } else if (this.integral >= 130) {
        return (65.25 + (this.integral - 130) / 100 * 100) + '%'
      } else if (this.integral >= 90) {
        return (31 + (this.integral - 90) / 100 * 100) + '%'
      } else if (this.integral >= 70) {
        return (6 + (this.integral - 70) / 100 * 100) + '%'
      }
      return 0
    }
  },
  methods: {
    getName(name) {
      return name.replace('X', this.gift_list.gift_list ? this.gift_list.gift_list[0].counts : 0)
    },
    getNameTwo(name) {
      let giftTwoName = gift[this.nowDay][this.gift_name].name
      return giftTwoName.replace('X', this.gift_list.gift_list ? this.gift_list.gift_list[0].counts : 0).replace('*1', '') + '*2'
    },
    showGift(index, item) {
      this.giftIndex = index
      if (index == 3 && this.gift_list.gift_list[index].is_get == 1) {
        this.type = 3
        this.gift_name = this.gift_list.gift_list[index].gid
      }
      this.showGiftPup = true
    },
    getDengji() {
      return lang.todayp.replace('X', lang.todayGift[this.giftIndex].num)
    },
    getPupImg() {
      return gift[this.nowDay][this.giftIndex].pupImg
    },
    getPupImgTwo() {
      return gift[this.nowDay][this.gift_name].pupImg
    },
    receive() {
      if (this.gift_list.gift_list[this.giftIndex].is_get == 0 && this.sucStep >= (this.giftIndex + 1)) {
        api.receiveGift(this.giftIndex).then(res => {
          if (res.data.response_status.code === 0) {
            if (this.giftIndex == 3) {
              this.gift_name = res.data.response_data.gift_id
              this.type = 3
            } else {
              this.type = 2
            }
            this.$store.commit('changGiftState', this.giftIndex)
          } else {
            this.tastMsg = res.data.response_status.error
            this.showT = true
          }
        })
      }
    },
    closePup() {
      this.showGiftPup = false
      this.type = 1
    },
    closeToast() {
      this.showT = false
    }
  }
}
</script>
<style lang="scss">
.integral {
  width: 7.22rem;
  height: 5.44rem;
  background: url(../assets/img/integralBg.png);
  background-size: 100% 100%;
  margin: 0 auto;
  position: relative;
  .intergralCon {
    width: 7.22rem;
    position: absolute;
    top: 1.9rem;
    .userInter {
      text-align: center;
    }
    .gifts {
      margin: 0.12rem auto;
      width: 6.6rem;
      display: flex;
      justify-content: space-between;
      text-align: center;
      span {
        em {
          height: 0.7rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 80%;
          color: #ffefd7;
          text-align: center;
        }
        img {
          margin-top: 0.17rem;
          width: 0.83rem;
          height: 1rem;
          &.heard {
            animation: heartbeat 3s linear infinite;
          }
        }
        &.span0 {
          width: 1rem;
        }
        &.span1 {
          width: 2.1rem;
        }
        &.span2 {
          width: 2.1rem;
        }
        &.span3 {
          width: 1.4rem;
        }
      }
    }
    .line {
      width: 6.15rem;
      height: 0.12rem;
      background: rgba(165, 58, 64, 1);
      border-radius: 0.06rem;
      margin: 0.23rem 0.45rem 0.12rem 0;
      position: relative;
      .actLine {
        height: 0.12rem;
        position: absolute;
        max-width: 100%;
        right: 0;
        top: 0;
        background: #ffd08c;
        z-index: 10;
        border-radius: 0.06rem;
      }
      span {
        display: block;
        width: 0.33rem;
        height: 0.33rem;
        border-radius: 50%;
        background: #a53a40;
        position: absolute;
        top: -0.1rem;
        z-index: 10;
        &.act {
          background: #ffd08c;
        }
        &.item1 {
          right: 0.2rem;
        }
        &.item2 {
          right: 1.75rem;
        }
        &.item3 {
          right: 3.85rem;
        }
        &.item4 {
          left: 0.2rem;
        }
      }
    }
    .num {
      width: 6.1rem;
      margin: 0.12rem auto;
      display: flex;
      color: #a53a40;
      font-size: 80%;
      .act {
        color: #ffefd7;
      }
      span {
        text-align: right;
      }
      span:nth-child(3) {
        width: 1.95rem;
        text-indent: 0.15rem;
      }
      span:nth-child(2) {
        width: 1.95rem;
        text-indent: 0.1rem;
      }
      span:nth-child(1) {
        width: 1.57rem;
        text-indent: 0.12rem;
      }
    }
  }
  .receivePup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 10000;
    .receivePupCon {
      width: 5.49rem;
      padding: 0.57rem 0 0.2rem 0;
      background: rgba(234, 71, 78, 1);
      border: 0.04rem solid rgba(255, 196, 130, 1);
      border-radius: 0.4rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .title {
        width: 4.4rem;
        height: 1.83rem;
        background: url(../assets/img/giftTitle.png);
        background-size: 100% 100%;
        position: absolute;
        top: -1.3rem;
        left: 0.5rem;
      }
      .close {
        width: 0.5rem;
        height: 0.5rem;
        background: url(../assets/img/close.png);
        background-size: 100% 100%;
        position: absolute;
        right: 0;
        top: -0.8rem;
      }
      .type {
        .dengji {
          text-align: center;
          font-size: 120%;
        }
        .imgBox {
          width: 1.6rem;
          height: 1.6rem;
          background: url(../assets/img/giftbg.png);
          background-size: 100% 100%;
          margin: 0.19rem auto;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .giftName {
          text-align: center;
          font-size: 80%;
          color: #ffefd7;
        }
        .bean {
          font-size: 80%;
          color: #ffefd7;
          text-align: center;
        }
        .lingqu {
          display: block;
          margin: 0.12rem auto;
          width: 2.29rem;
          height: 0.85rem;
          background: url(../assets/img/blackBtn.png);
          background-size: 100% 100%;
          line-height: 0.85rem;
          text-align: center;
          &.act {
            background: url(../assets/img/lingqu.png);
            background-size: 100% 100%;
          }
        }
      }
      .type2 {
        .successTi {
          margin: 1rem auto;
          .tips {
            width: 0.65rem;
            height: 0.65rem;
            background: url(../assets/img/success.png);
            background-size: 100% 100%;
            margin: 0 auto;
          }
          span {
            font-size: 120%;
            color: #ffefd7;
            display: block;
            text-align: center;
            margin-top: 0.22rem;
          }
        }
        .sucTips {
          text-align: center;
          font-size: 80%;
          margin-bottom: 0.34rem;
        }
      }
      .type3 {
        .imgBox {
          width: 1.6rem;
          height: 1.6rem;
          background: url(../assets/img/giftbg.png);
          background-size: 100% 100%;
          margin: 0.19rem auto;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .giftName {
          text-align: center;
          font-size: 80%;
          color: #ffefd7;
        }
        .succeTitle {
          font-size: 120%;
          color: #ffefd7;
          display: block;
          text-align: center;
          margin-top: 0.22rem;
        }
        .sucTips {
          text-align: center;
          font-size: 80%;
          margin-bottom: 0.34rem;
        }
      }
      .giftTips {
        font-size: 73%;
        color: #ffbbbe;
        text-align: left;
        margin-top: 0.15rem;
        padding: 0 0.27rem;
      }
    }
  }
}
</style>
