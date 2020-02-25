<template>
  <div class="wardstoast">
    <span class="title">مبروك! تكسب</span>
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
        <p class="double" v-show="showdouble">مع بطاقة التضاعف، يتضاعف عدد الجائزتين الأخرين، رائعا جدا!</p>
        <p class="toastMsg">تصل إليك هذه الجوائز، تفضل بالتحقق</p>
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
    top: 3.4rem;
    left: 2.8rem;
    z-index: 100;
    color: #fdfdac;
    font-weight: bold;
  }
  .wardlist {
    margin: 0 auto;
    width: 7.5rem;
    height: 6.52rem;
    background: url("../assets/img/mintaostBg.png") no-repeat center center;
    background-size: 100% 100%;
    position: absolute;
    top: 1.5rem;
    .listitembox {
      width: 5.1rem;
      height: 2rem;
      display: flex;
      margin: 3rem auto 0;
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
      height: 1.2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .double {
        width: 4.58rem;
        font-size: 80%;
        color: #ffdb6e;
        text-align: center;
        margin: 0 auto;
      }
      .toastMsg {
        width: 4.58rem;
        font-size: 80%;
        line-height: 0.45rem;
        text-align: center;
        color: #f7d8ff;
        margin: 0 auto;
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
    bottom: -1rem;
    left: 3.3rem;
  }
}
</style>