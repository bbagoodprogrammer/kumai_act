<template>
  <div class="lamp">
    <div class="openBtns">
      <span @click="openlamp(20,1)">20 pháp lực</span>
      <span @click="openlamp(90,2)">90 pháp lực</span>
      <span @click="openlamp(200,3)">200 pháp lực</span>
    </div>
    <div class="userScore">
      <div class="av">
        <span class="defaluteAV"></span>
        <img v-lazy="av" class="userAv" alt="">
      </div>
      <div class="userScoreMsg">
        <div class="tip">Dùng pháp lực triệu hồi Thần Đèn, nhận quà bất ngờ!</div>
        <div class="score">
          <span>Pháp lực đã gọi Thần Đèn: <em>{{all_chance-re_chance}}</em></span>
          <span>Pháp lực còn lại hôm nay: <em>{{re_chance}}</em></span>
        </div>
      </div>
    </div>
    <div class="mask" v-show="showGift">
      <transition name="slide">
        <div class="giftPup" v-if="showGift">
          <i class="close" @click="closeGift()"> </i>
          <div class="title">Chúc mừng nhận</div>
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
          <p class="ticketTips">Phiếu nạp quay trúng có hiệu lực trong ngày!</p>
          <p class="luckTips">(Phần thưởng đã gửi vào tài khoản, mời kiểm tra)</p>
          <div class="ok" @click="closeGift()">Xác nhận</div>
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
            title: 'Không thể triệu hồi.',
            msg: 'Chưa tài xong tài nguyên, mời thử lại sau！'
          })
          return
        }
        if (!this.singUp) {
          this.vxc('setToast', {
            title: 'Không thể triệu hồi.',
            msg: 'Bạn chưa báo danh, hãy báo danh ngay~'
          })
          return
        }
        if (this.re_chance >= val) {
          this.getLuckGift(type, val)
        } else {
          this.vxc('setToast', {
            title: 'Không thể triệu hồi.',
            msg: 'Pháp lực của bạn không đủ, không thể triệu hồi, hãy làm nhiệm vụ~'
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
<style lang="scss" scoped>
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
      font-weight: 600;
      color: #fff6ab;
      font-size: 0.24rem;
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
      margin-right: 0.1rem;
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
      .tip {
        font-size: 0.22rem;
        color: #ffc274;
        font-weight: 500;
      }
      .score {
        font-size: 0.22rem;
        color: #fff6ab;
        font-weight: 500;
        span {
          display: block;
          em {
            font-size: 0.3rem;
            color: #fff;
            font-weight: 600;
          }
        }
        span:last-child {
          margin-top: -0.1rem;
        }
      }
    }
  }
}
.giftPup {
  width: 6.56rem;
  height: 6.7rem;
  background: url(../assets/img/pupBg.png);
  background-size: 100% 100%;
  position: relative;
  .title {
    margin-top: 2.1rem;
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
      margin-right: 0.19rem;
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
        margin-left: -0.14rem;
        display: block;
        height: 0.7rem;
        text-align: center;
        font-size: 0.22rem;
        color: #f7c30c;
        font-weight: 500;
        // display: flex;
        // align-items: center;
        // justify-content: center;
        line-height: 0.28rem;
        margin-top: 0.05rem;
      }
    }
  }
  .ticketTips {
    text-align: center;
    font-size: 0.22rem;
    color: #eec362;
    margin-top: 0.05rem;
    line-height: 0.22rem;
    color: red;
    padding: 0 1rem;
  }
  .luckTips {
    text-align: center;
    font-size: 0.22rem;
    color: #eec362;
    padding: 0 1rem;
  }
  .ok {
    display: block;
    width: 2.3rem;
    height: 0.84rem;
    line-height: 0.84rem;
    font-weight: 700;
    text-align: center;
    color: #fdf144;
    position: absolute;
    bottom: 0.2rem;
    left: 2.12rem;
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
