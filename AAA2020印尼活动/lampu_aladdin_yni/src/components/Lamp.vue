<template>
  <div class="lamp">
    <div class="openBtns">
      <span @click="openlamp(20,1)">20 nilai panggilan</span>
      <span @click="openlamp(90,2)">90 nilai panggilan</span>
      <span @click="openlamp(200,3)">200 nilai panggilan</span>
    </div>
    <div class="userScore">
      <div class="av">
        <span class="defaluteAV"></span>
        <img v-lazy="av" class="userAv" alt="">
      </div>
      <div class="userScoreMsg">
        <div class="tip">Gunakan nilai panggilan hari ini untuk memanggil </br>elf lampu ajaib,akan bisa mendapatkan hadiah kejutan</div>
        <div class="score">
          <span>
            Nilai elf lampu ajaib</br>
            yg sudah dipanggil:
          </span>
          <strong>{{all_chance-re_chance}}</strong>
          <span>
            Nilai panggilan hari </br> ini yg tersisa:
          </span>
          <strong>{{re_chance}}</strong>
        </div>
      </div>
    </div>
    <div class="mask" v-show="showGift">
      <transition name="slide">
        <div class="giftPup" v-if="showGift">
          <i class="close" @click="closeGift()"> </i>
          <div class="title">Selamat</div>
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
          <p class="ticketTips">Jika undian kupon hadiah, kupon hadiah hanya berlaku untuk hari ini</p>
          <p class="luckTips">(Hadiah telah dikirim ke akun, silakan cek)</p>
          <div class="ok" @click="closeGift()">Ya</div>
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
            title: 'Tidak dapat memanggil',
            msg: 'Sumber daya belum selesaikan dimuat, coba lagi nanti!'
          })
          return
        }
        if (!this.singUp) {
          this.vxc('setToast', {
            title: 'Tidak dapat memanggil',
            msg: 'Anda belum mendaftar, silakan mendaftar dulu ~'
          })
          return
        }
        if (this.re_chance >= val) {
          this.getLuckGift(type, val)
        } else {
          this.vxc('setToast', {
            title: 'Tidak dapat memanggil',
            msg: 'Nilai panggilan Anda tidak cukup utk memanggil, silakan selesaikan tugas dulu ~'
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
      width: 1.8rem;
      padding: 0 0.19rem;
      height: 0.73rem;
      text-align: center;
      line-height: 0.25rem;
      font-weight: 600;
      color: #fff6ab;
      font-size: 0.24rem;
      display: flex;
      align-items: center;
      justify-content: center;
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
      }
      .score {
        font-size: 0.22rem;
        color: #fff6ab;
        font-weight: 500;
        display: flex;
        align-items: center;
        strong {
          width: 0.8rem;
          text-align: center;
          display: inline-block;
          font-size: 0.3rem;
          color: #fff;
          font-weight: 600;
        }
      }
    }
  }
}
.giftPup {
  width: 6.56rem;
  height: 6.27rem;
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
    margin-top: 0.1rem;
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
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 0.2rem;
        margin-top: 0.05rem;
      }
    }
  }
  .ticketTips {
    text-align: center;
    font-size: 0.22rem;
    color: #eec362;
    margin-top: 0.05rem;
    line-height: 0.2rem;
    color: red;
    padding: 0 0.8rem;
  }
  .luckTips {
    text-align: center;
    font-size: 0.22rem;
    color: #eec362;
    margin-top: -0.05rem;
    padding: 0 0.5rem;
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
    bottom: 0.1rem;
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
