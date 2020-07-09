<template>
  <div class="lamp">
    <div class="openBtns">
      <span @click="openlamp(20,1)">20 قيمة الاستدعاء</span>
      <span @click="openlamp(90,2)">90 قيمة الاستدعاء</span>
      <span @click="openlamp(200,3)">200 قيمة الاستدعاء</span>
    </div>
    <div class="userScore">
      <div class="av">
        <span class="defaluteAV"></span>
        <img v-lazy="av" class="userAv" alt="">
      </div>
      <div class="userScoreMsg">
        <div class="tip">استخدام قيمة الاستدعاء اليومية لاستدعاء الجان في<br /> المصباح السحري يمكن حصول على المفاجآت الرايعة~</div>
        <div class="score">قد استخدمت قيمة الاستدعاء: <em>{{all_chance-re_chance}}</em> قيمة الاستدعاء الباقية اليوم:<em>{{re_chance}}</em></div>
      </div>
    </div>
    <div class="mask" v-show="showGift">
      <transition name="slide">
        <div class="giftPup" v-if="showGift">
          <i class="close" @click="closeGift()"> </i>
          <div class="title">مبروك لحصول</div>
          <div class="giftBox">
            <div class="giftItem" v-for="(item,index) in luckGift" :key="index">
              <div class="gitImg">
                <span class="giftBg"></span>
                <img src="../assets/img/ticket.png" alt="" v-if="item.type == 1">
                <img src="../assets/img/ticket2.png" alt="" v-else-if="item.type == 2">
                <img :src="item.img" alt="" v-else>
              </div>
              <strong>{{item.name}}</strong>
            </div>
          </div>
          <p class="ticketTips">التذكرة صلاحيتها في اليوم فقط</p>
          <p class="luckTips">(المكافآت قد وصلت إلى حسابك، يرجي التحقق)</p>
          <div class="ok" @click="closeGift()">حسنا</div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import api from "../api/apiConfig"
import { globalBus } from '../utils/eventBus'
export default {
  data() {
    return {
      lucking: false,
      luckGift: [],
      showGift: false
    }
  },
  computed: {
    ...mapState(['all_chance', 're_chance', 'singUp', 'av'])
  },
  methods: {
    openlamp(val, type) {
      globalBus.$emit('commonEvent', () => {
        if (!this.$parent.svgaData1 || !this.$parent.svgaData2) {
          this.vxc('setToast', {
            title: 'لا يمكن الاستدعاء',
            msg: 'الموارد جار التحميل، يرجى محاولة لاحقا'
          })
          return
        }
        if (!this.singUp) {
          this.vxc('setToast', {
            title: 'لا يمكن الاستدعاء',
            msg: 'لم يتم التسجيل، يرجي التسجيل أولا~'
          })
          return
        }
        if (this.re_chance >= val) {
          this.getLuckGift(type, val)
        } else {
          this.vxc('setToast', {
            title: 'لا يمكن الاستدعاء',
            msg: 'قيمة الاستدعاء عندك غير كافية، يرجي الإكمال المهمات أولا~'
          })
        }
      })
    },
    getLuckGift(type, val) {
      if (!this.lucking) {
        api.lottery(type).then(res => {
          const { response_data, response_status } = res.data
          if (response_status.code === 0) {  //报名成功
            this.vxc('reduxScore', val)
            this.lucking = true
            this.luckGift = res.data.response_data.prize
            this.$parent.aniOpen(this.giftPup)
          } else {
            this.vxc('setToast', {
              msg: response_status.error
            })
          }
        })
      }
    },
    giftPup() {
      this.showGift = true
    },
    closeGift() {
      this.showGift = false
    }
  }
}
</script>
<style lang="scss">
.lamp {
  position: absolute;
  bottom: 0;
  .openBtns {
    height: 0.73rem;
    padding: 0 0.43rem;
    display: flex;
    justify-content: space-between;
    span {
      width: 2.18rem;
      height: 0.73rem;
      text-align: center;
      line-height: 0.73rem;
      font-weight: 500;
      color: #fff6ab;
      font-size: 0.26rem;
    }
    span:first-child {
      background: url(../assets/img/openBtn1.png);
      background-size: 100% 100%;
    }
    span:nth-child(2) {
      background: url(../assets/img/openBtn2.png);
      background-size: 100% 100%;
    }
    span:nth-child(3) {
      background: url(../assets/img/openBtn3.png);
      background-size: 100% 100%;
    }
  }
  .userScore {
    height: 1.01rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .av {
      width: 0.75rem;
      height: 0.75rem;
      position: relative;
      margin-left: 0.1rem;
      .userAv {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      .defaluteAV {
        display: block;
        width: 0.75rem;
        height: 0.75rem;
        background: url(../assets/img/userAvDefault.png);
        background-size: 100% 100%;
        position: absolute;
      }
    }
    .userScoreMsg {
      width: 5rem;
      .tip {
        font-size: 0.24rem;
        color: #ffc274;
        font-weight: 600;
        line-height: 0.3rem;
      }
      .score {
        font-size: 0.24rem;
        color: #fff6ab;
        font-weight: 500;
        white-space: nowrap;
        em {
          font-size: 0.3rem;
          color: #fff;
          font-weight: 600;
        }
        em:first-child {
          margin-left: 0.3rem;
        }
      }
    }
  }
}
.giftPup {
  width: 6.56rem;
  height: 5.96rem;
  background: url(../assets/img/pupBg.png);
  background-size: 100% 100%;
  position: relative;
  .title {
    margin-top: 2rem;
    text-align: center;
    font-weight: 600;
    color: #fdfe34;
    font-size: 0.24rem;
  }
  .giftBox {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.05rem;
    padding: 0 1rem;
    .giftItem {
      width: 1.4rem;
      margin-left: 0.19rem;
      .gitImg {
        width: 1.4rem;
        height: 1.4rem;
        position: relative;
        .giftBg {
          display: block;
          width: 100%;
          height: 100%;
          background: url(../assets/img/gitBg.png);
          background-size: 100% 100%;
          position: absolute;
        }
        img {
          width: 100%;
          height: 100%;
          position: absolute;
        }
      }
      strong {
        width: 120%;
        margin-right: -0.14rem;
        display: block;
        height: 0.5rem;
        text-align: center;
        font-size: 0.22rem;
        color: #f7c30c;
        font-weight: 500;
        // display: flex;
        // align-items: center;
        // justify-content: center;
        line-height: 0.25rem;
        margin-top: 0.05rem;
      }
    }
  }
  .ticketTips {
    text-align: center;
    font-size: 0.22rem;
    color: #eec362;
    color: red;
  }
  .luckTips {
    text-align: center;
    font-size: 0.22rem;
    color: #eec362;
    margin-top: -0.1rem;
  }
  .ok {
    display: block;
    width: 2.3rem;
    height: 0.84rem;
    line-height: 0.84rem;
    font-weight: 700;
    text-align: center;
    margin: 0.05rem auto 0;
    color: #fdf144;
  }
  .close {
    display: block;
    width: 0.68rem;
    height: 0.65rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0.1rem;
    top: 0.9rem;
  }
}
</style>
