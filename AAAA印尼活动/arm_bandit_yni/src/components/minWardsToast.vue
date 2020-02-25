<template>
  <div class="wardstoast">
    <span class="title">Selamat</span>
    <div class="wardlist">
      <div class="wardListCon">
        <div class="listitembox">
          <span>
            <div><img :src="imgone" alt=""></div>
            <p>{{titleone}}</p>
          </span>
          <span>
            <div><img :src="imgtwo" alt=""></div>
            <span></span>
            <p>{{titletwo}}</p>
          </span>
          <span>
            <div><img :src="imgthree" alt=""></div>
            <span></span>
            <p>{{titlethree}}</p>
          </span>
        </div>
        <div class="wardMsgs">
          <p class="double" v-show="showdouble">Mendapatkan Double Card, 2 hadiah lainnya akan digandakan,bagus banget!</p>
          <p class="toastMsg">Hadiah tersebut sudah berhasil dikirim ke akun Anda,silakan cek!</p>
        </div>
      </div>
      <a href="" @click.prevent="closeToast()" class="close"></a>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import wards from "../config/wards.js"
import wardsImg from "../config/wardsImg.js"
export default {
  data() {
    return {
      showdouble: false
    }
  },
  computed: {
    ...mapState(["lotterylist"]),
    imgone() {
      if (this.lotterylist.length > 0) {
        var img1 = wardsImg[this.lotterylist[0]]
        return require(`../assets/img/${img1}.png`)
      }
    },
    imgtwo() {
      if (this.lotterylist.length > 0) {
        var img2 = wardsImg[this.lotterylist[1]]
        return require(`../assets/img/${img2}.png`)
      }
    },
    imgthree() {
      if (this.lotterylist.length > 0) {
        var img3 = wardsImg[this.lotterylist[2]]
        return require(`../assets/img/${img3}.png`)
      }
    },
    titleone() {
      if (this.lotterylist.length > 0) {
        return `${wards[this.lotterylist[0]]}`
      }
    },
    titletwo() {
      if (this.lotterylist.length > 0) {
        return `${wards[this.lotterylist[1]]}`
      }
    },
    titlethree() {
      if (this.lotterylist.length > 0) {
        return `${wards[this.lotterylist[2]]}`
      }
    }

  },
  watch: {
    lotterylist(val) {
      if (val.indexOf(29) > -1) {
        this.showdouble = true
      } else {
        this.showdouble = false
      }
    }
  },
  methods: {
    closeToast() {
      this.$emit('hideToast')
    }
  }
}
</script>

<style lang="scss" scoped>
.wardstoast {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  background: #2b0057;
  .title {
    position: absolute;
    top: 3.3rem;
    left: 3.2rem;
    z-index: 100;
    color: #fdfdac;
    font-weight: bold;
  }
  .wardlist {
    margin: 0 auto;
    width: 7.5rem;
    height: 9.16rem;
    background: url("../assets/img/mintaostBg.png") no-repeat center center;
    background-size: 100% auto;
    position: relative;
    .wardListCon {
      width: 5rem;
      position: absolute;
      top: 4.3rem;
      left: 1.3rem;
      .wardMsgs {
        height: 1.2rem;
        display: flex;
        justify-content: center;
        flex-direction: column;
      }
    }
    .listitembox {
      width: 5.1rem;
      display: flex;
      span {
        display: block;
        flex: 1;
        text-align: center;
        > div {
          display: inline-block;
          width: 0.9rem;
          height: 0.9rem;
          background-color: #cc00ff;
          border-radius: 0.2rem;
          text-align: center;
          > img {
            width: 0.9rem;
            height: 0.9rem;
          }
        }
        > p {
          color: #5dffe2;
          font-size: 80%;
          text-align: center;
        }
      }

      p {
        font-size: 80%;
      }
    }
    .double {
      width: 4.58rem;
      height: 0.49rem;
      font-size: 80%;
      color: #ffdb6e;
      text-align: center;
      margin-top: 0.1rem;
    }
    .toastMsg {
      width: 4.58rem;
      height: 0.49rem;
      font-size: 80%;
      text-align: center;
      color: #f7d8ff;
      margin-top: 0.1rem;
    }
  }
  .close {
    display: block;
    width: 0.71rem;
    height: 0.71rem;
    background: url(../assets/img/close.png) center center;
    background-size: 100% 100%;
    position: absolute;
    bottom: 0;
    left: 3.3rem;
  }
}
</style>