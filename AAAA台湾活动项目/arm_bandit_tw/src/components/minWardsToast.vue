<template>
  <div class="wardstoast">
    <span class="title">恭喜獲得</span>
    <div class="wardlist">
      <div class="listitembox" :class="{top:!showdouble}">
        <span>
          <div><img :src="imgone" alt=""></div>
          <p v-html="titleone"></p>
        </span>
        <span>
          <div><img :src="imgtwo" alt=""></div>
          <span></span>
          <p v-html="titletwo"></p>
        </span>
        <span>
          <div><img :src="imgthree" alt=""></div>
          <span></span>
          <p v-html="titlethree"></p>
        </span>
      </div>
      <div class="msgBox" :class="{top:!showdouble}">
        <!--  -->
        <p class="double" v-show="showdouble">Double卡加成，另外2個獎品各獲得2個，超讚！</p>
        <p class="toastMsg">以上獎品已成功派發到您的賬號上,</br>請注意查收</p>
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
  background: rgba(#000, 0.8);
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
    .listitembox {
      position: absolute;
      top: 4.3rem;
      left: 1.3rem;
      width: 5.1rem;
      height: 1.3rem;
      display: flex;
      //  justify-content:space-between;
      &.top {
        top: 4.5rem;
      }
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
    .msgBox {
      position: absolute;
      top: 5.9rem;
      left: 1.5rem;
      .double {
        width: 4.58rem;
        font-size: 80%;
        color: #ffdb6e;
        text-align: center;
      }
      .toastMsg {
        width: 4.58rem;
        font-size: 80%;
        line-height: 0.45rem;
        text-align: center;
        color: #f7d8ff;
      }
      &.top {
        top: 6.3rem;
      }
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