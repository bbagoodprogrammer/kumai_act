<template>
  <div class="convertibility">
    <div class="converItem" v-for="(item,index) in exchange_configs" :key="index">
      <h3>{{lang.converGiftTitle}}</h3>
      <div class="converGIft">
        <div class="gift1">
          <div class="giftImg">
            <img :src="act_info.images.chip_icon" alt="">
          </div>
          <strong class="giftName">{{act_info.chip_name}}</strong>
          <span class="giftNum">{{user_info.chips}}/{{item.cost}}</span>
        </div>
        <div class="arrow"></div>
        <div class="gift2">
          <div class="giftImg">
            <img :src="item.prize_icon" alt="">
          </div>
          <strong class="giftName">{{item.prize_name}}</strong>
        </div>
        <div class="converGiftState">
          <span class="dayEd" v-if="item.limit == item.exchanged_count">{{lang.dayEd}}</span>
          <div class="noConver" v-else>
            <strong class="noConverTips" v-if="item.limit > 0">Mỗi ngày đổi tối đa {{item.limit}} lần</strong>
            <div class="converBtn" @click="chowGiftPup(item,index)">{{lang.convertibility}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="mask" v-show="showConverGiftPup">
      <transition name="slide">
        <div class="converPup" v-show="showConverGiftPup">
          <i class="close" @click="closeConverPup()"></i>
          <div class="converGift">
            <div class="gift1">
              <div class="giftImg">
                <img :src="act_info.images.chip_icon" alt="">
              </div>
              <strong class="giftName">{{act_info.chip_name}}</strong>
              <span class="giftNum">{{user_info.chips}}/{{gift.cost}}</span>
            </div>
            <div class="arrow"></div>
            <div class="gift2">
              <div class="giftImg">
                <img :src="gift.prize_icon" alt="">
              </div>
              <strong class="giftName">{{gift.prize_name}}</strong>
            </div>
          </div>
          <p class="converTips">{{lang.converNum2.replace("X",gift.limit)}}</p>
          <div class="numBtn">
            <span class="redux" @click="redux()"></span>
            <input type="number" v-model="giftNum" readonly>
            <span class="add" @click="add()"></span>
          </div>
          <div class="okBtn" @click="rev()">{{lang.ok}}</div>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="showT">
      <transition name="slide">
        <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
      </transition>
    </div>
  </div>
</template>
<script>
import MsgToast from "../components/commonToast"
import { mapState } from "vuex"
import api from "../api/apiConfig"
import { globalBus } from '../utils/eventBus'
export default {
  components: { MsgToast },
  data() {
    return {
      giftNum: 1,
      showConverGiftPup: false,
      showT: false,
      tastMsg: '',
      gift: {},
      index: 0
    }
  },
  computed: {
    ...mapState(['exchange_configs', 'act_info', 'user_info']),
  },
  methods: {
    redux() {
      if (this.giftNum > 1) {
        this.giftNum--
      }
    },
    add() {
      if (this.giftNum >= this.gift.limit - this.gift.exchanged_count) {
        this.tastMsg = this.lang.converNum2.replace("X", this.gift.limit)
        this.showT = true
      } else {
        this.giftNum++
      }
    },
    rev() {
      api.getRevGift(this.gift.id, this.giftNum).then(res => {
        if (res.data.response_status.code == 0) {
          let obj = {
            index: this.index,
            giftNum: this.giftNum,
            prizsNum: this.gift.cost * this.giftNum
          }
          this.vxc('revGiftState', obj)
          this.closeConverPup()
        } else {
          this.tastMsg = res.data.response_status.error
          this.showT = true
        }
      })
    },
    chowGiftPup(item, index) {
      globalBus.$emit('commonEvent', () => {
        if (this.user_info.chips >= item.cost) {
          this.gift = item
          this.index = index
          this.showConverGiftPup = true
        } else {
          this.tastMsg = this.lang.noChpin
          this.showT = true
        }
      })
    },
    closeConverPup() {
      this.giftNum = 1
      this.showConverGiftPup = false
    },
    closeToast() {
      this.showT = false
    }
  }
}
</script>
<style lang="scss" scoped>
.convertibility {
  margin-top: 0.21rem;
  padding: 0 0.2rem;
  padding-bottom: 1.5rem;
  .converItem {
    width: 7.11rem;
    height: 2.91rem;
    background: url(../assets/img/converItem.png);
    background-size: 100% 100%;
    margin-bottom: 0.15rem;
    h3 {
      height: 0.68rem;
      line-height: 0.73rem;
      text-align: center;
      color: #fff583;
      font-weight: 600;
    }
    .converGIft {
      padding: 0 0.32rem 0 0.36rem;
      height: 2.2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .gift1,
      .gift2 {
        width: 1.5rem;
        height: 1.7rem;
        .giftImg {
          width: 1rem;
          height: 0.95rem;
          background: url(../assets/img/giftBg.png);
          background-size: 100% 100%;
          padding-top: 0.05rem;
          margin: 0 auto;
          img {
            display: block;
            width: 0.9rem;
            height: 0.9rem;
            margin: 0 auto;
          }
        }
        .giftName {
          width: 120%;
          margin-left: -0.15rem;
          font-size: 0.24rem;
          font-weight: 500;
          display: block;
          text-align: center;
        }
        .giftNum {
          font-size: 0.28rem;
          color: #fff195;
          font-weight: 600;
          display: block;
          text-align: center;
        }
      }
      .converGiftState {
        width: 2.4rem;
        height: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        .noConver {
          .noConverTips {
            font-size: 0.28rem;
            color: #603939;
            font-weight: 500;
            text-align: center;
            display: block;
          }
          .converBtn {
            width: 2.11rem;
            height: 0.8rem;
            background: url(../assets/img/converBtn.png);
            background-size: 100% 100%;
            line-height: 0.8rem;
            text-align: center;
            font-size: 0.36rem;
            font-weight: 700;
            margin: 0.15rem auto;
          }
        }
        .dayEd {
          color: #fff195;
          font-weight: 800;
          margin: -0.5rem 0 0 0.15rem;
        }
      }
      .arrow {
        width: 0.74rem;
        height: 0.63rem;
        background: url(../assets/img/arrow.png);
        background-size: 100% 100%;
        margin-top: -0.7rem;
      }
    }
  }
  .converPup {
    width: 5.37rem;
    height: 3.72rem;
    background: url(../assets/img/ruleBg.png);
    background-size: 100% 100%;
    position: absolute;
    left: 1.06rem;
    top: 4rem;
    .close {
      display: block;
      width: 1.03rem;
      height: 1.05rem;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
      position: absolute;
      right: -0.25rem;
      top: -0.4rem;
    }
    .converGift {
      padding: 0 0.7rem 0;
      height: 2.1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 0.15rem;
      .gift1,
      .gift2 {
        width: 1.5rem;
        height: 1.7rem;
        .giftImg {
          width: 1rem;
          height: 0.95rem;
          background: url(../assets/img/giftBg.png);
          background-size: 100% 100%;
          padding-top: 0.05rem;
          margin: 0 auto;
          img {
            display: block;
            width: 0.9rem;
            height: 0.9rem;
            margin: 0 auto;
          }
        }
        .giftName {
          width: 120%;
          margin-left: -0.15rem;
          font-size: 0.24rem;
          font-weight: 500;
          display: block;
          text-align: center;
        }
        .giftNum {
          font-size: 0.28rem;
          color: #fff195;
          font-weight: 600;
          display: block;
          text-align: center;
        }
      }
      .arrow {
        width: 0.74rem;
        height: 0.63rem;
        background: url(../assets/img/arrow.png);
        background-size: 100% 100%;
        margin-top: -0.7rem;
      }
    }
    .converTips {
      text-align: center;
      color: #603939;
      font-weight: 600;
      font-size: 0.28rem;
    }
    .numBtn {
      width: 2.7rem;
      height: 0.76rem;
      margin: 0.18rem auto;
      background: url(../assets/img/addNum.png);
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        display: block;
        width: 0.9rem;
        height: 0.74rem;
        &.redux {
          border-radius: 0.4rem 0 0 0.4rem;
        }
        &.add {
          border-radius: 0 0.4rem 0.4rem 0;
        }
      }
      input {
        background: none;
        border: none;
        outline: none;
        width: 0.9rem;
        height: 0.74rem;
        text-align: center;
        font-weight: 700;
        font-size: 0.46rem;
        color: #fff;
      }
    }
    .okBtn {
      width: 2.74rem;
      height: 0.9rem;
      background: url(../assets/img/okBtn.png);
      background-size: 100% 100%;
      position: absolute;
      left: 1.31rem;
      bottom: -1.4rem;
      text-align: center;
      line-height: 0.9rem;
      font-weight: 700;
      font-size: 0.36rem;
    }
  }
}
</style>
