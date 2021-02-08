<template>
  <div class="dfbox">
    <div class="sloat">
      <SlotMachine @end="onEnd" :size="3" :list="list" :result="result" />
      <div class="mask" v-show="showMinToast">
        <transition name="slide">
          <div class="giftPup" v-show="showMinToast">
            <i class="close" @click="showMinToast = false"></i>
            <div class="title"></div>
            <div class="giftArr">
              <div class="giftItem" v-for="(item,index) in result " :key="index">
                <div class="imgBg">
                  <img :src="giftArr[item].img" alt="">
                </div>
                <strong>{{giftArr[item].name}}</strong>
              </div>
            </div>
            <p>以上獎品已成功派發到您的賬號上，請注意查收</p>
          </div>
        </transition>
      </div>
    </div>

  </div>

</template>

<script>
import SlotMachine from './Index';
import api from "../../api/apiConfig.js"
// import minWardsToast from "../../components/minWardsToast.vue"
import MsgToast from "../commonToast.vue"
import APP from "../../utils/openApp.js"
import { globalBus } from '../../utils/eventBus.js'
import { mapState } from "vuex"
import { giftArr } from "../../config/gifts"
export default {
  props: ['cilckItem'],
  data() {
    return {
      list: [
        { id: 1, src: require("../../assets/img/gifts/beans.png") },
        { id: 2, src: require("../../assets/img/gifts/beans.png") },
        { id: 3, src: require("../../assets/img/gifts/gift1.png") },
        { id: 4, src: require("../../assets/img/gifts/gift2.png") },
        { id: 5, src: require("../../assets/img/gifts/ticket2.png") },
        { id: 6, src: require("../../assets/img/gifts/beans.png") },
        { id: 7, src: require("../../assets/img/gifts/vip.png") },
        { id: 8, src: require("../../assets/img/gifts/gift3.png") },


        { id: 9, src: require("../../assets/img/gifts/gift5.png") },
        { id: 10, src: require("../../assets/img/gifts/gift4.png") },
        { id: 11, src: require("../../assets/img/gifts/gift6.png") },
        { id: 12, src: require("../../assets/img/gifts/ticket2.png") },
        { id: 13, src: require("../../assets/img/gifts/beans.png") },
        { id: 14, src: require("../../assets/img/gifts/gift1.png") },
        { id: 15, src: require("../../assets/img/gifts/gift5.png") },
        { id: 16, src: require("../../assets/img/gifts/vip.png") },
        { id: 17, src: require("../../assets/img/gifts/gift3.png") },


        { id: 18, src: require("../../assets/img/gifts/coins.png") },
        { id: 19, src: require("../../assets/img/gifts/gift9.png") },
        { id: 20, src: require("../../assets/img/gifts/gift8.png") },
        { id: 21, src: require("../../assets/img/gifts/ticket2.png") },
        { id: 22, src: require("../../assets/img/gifts/gift1.png") },
        { id: 23, src: require("../../assets/img/gifts/gift7.png") },
        { id: 24, src: require("../../assets/img/gifts/gift4.png") },
        { id: 25, src: require("../../assets/img/gifts/vip.png") },
        { id: 26, src: require("../../assets/img/gifts/gift3.png") },
        { id: 27, src: require("../../assets/img/gifts/gift10.png") },

        { id: 28, src: require("../../assets/img/gifts/coins.png") },
        { id: 29, src: require("../../assets/img/gifts/gift16.png") },
        { id: 30, src: require("../../assets/img/gifts/gift8.png") },
        { id: 31, src: require("../../assets/img/gifts/gift13.png") },
        { id: 32, src: require("../../assets/img/gifts/gift12.png") },
        { id: 33, src: require("../../assets/img/gifts/ticket2.png") },
        { id: 34, src: require("../../assets/img/gifts/gift11.png") },
        { id: 35, src: require("../../assets/img/gifts/gift6.png") },
        { id: 36, src: require("../../assets/img/gifts/vip.png") },
        { id: 37, src: require("../../assets/img/gifts/gift3.png") },

        // { id: 38, src: require("../../assets/img/gifts/gift12.png") },
        // { id: 39, src: require("../../assets/img/gifts/gift10.png") },
        // { id: 40, src: require("../../assets/img/gifts/coins.png") },
        // { id: 41, src: require("../../assets/img/gifts/gift12.png") },
        // { id: 42, src: require("../../assets/img/gifts/gift15.png") },
        // { id: 43, src: require("../../assets/img/gifts/ticket2.png") },
        // { id: 44, src: require("../../assets/img/gifts/ticket2.png") },
        // { id: 45, src: require("../../assets/img/gifts/gift14.png") },
        // { id: 46, src: require("../../assets/img/gifts/vip.png") },
        // { id: 47, src: require("../../assets/img/gifts/gift3.png") },

      ],
      result: [],
      imgindex: 0,
      drawSwitch: true,    // 抽奖开关，避免重复抽奖
      timerSet: 0,
      showMinToast: false,  //弹窗开关
    };
  },
  computed: {
    ...mapState([]),
    giftArr() {
      return giftArr
    }
  },
  created() {
    this.total();
  },
  methods: {
    getRand(start, end) {
      const len = end - start;
      return start + Math.round(Math.random() * len);
    },
    total() {
      var that = this
      globalBus.$on('countNumber', () => {
        that.startGame()
      });
    },
    startGame() {
      globalBus.$emit('commonEvent', (callback) => {
        if (this.cilckItem.get) {
          return
        } else if (!this.cilckItem.can && !this.cilckItem.get) {
          this.$parent.showNotSingup = true
          return
        }
        if (this.drawSwitch && this.cilckItem.can) { //避免重复请求  活动开始转动
          this.drawSwitch = false  //关闭开关
          api.openPacket(this.cilckItem.level).then(res => { // 获取抽奖结果
            if (res.data.response_status.code === 0) {
              var prizes = res.data.response_data.prizes
              this.result = prizes       //开启奖品滚动效果
              this.$emit('setPacketStatus')
            } else {
              this.toast(res.data.response_status.error)
            }
          })
        }
      })
    },
    onEnd(result) { //动画结束时重置开关

      this.drawSwitch = true //请求开启开关
      this.showMinToast = true
    },
    hideToast() {
      this.showMinToast = false
    },
    closeToast() {
      this.showT = false
    }
  },
  //  minWardsToast,
  components: {
    SlotMachine,

    MsgToast
  }
}
</script>

<style lang="scss" scoped>
button {
  padding: 0.1rem 0.2rem;
  position: absolute;
}
.dfbox {
  height: 1.2rem;
  position: absolute;
  top: 4rem;
  left: 1.45rem;
  padding-top: 1.4rem;
  overflow: hidden;
}
.sloat {
  // position: absolute;
  // top: 4rem;
  // left: 1.45rem;
}
.giftPup {
  width: 7.18rem;
  height: 4.74rem;
  background: url(../../assets/img/pup/pup_bg.png);
  background-size: 100% 100%;
  position: relative;
  .close {
    display: block;
    width: 0.3rem;
    height: 0.3rem;
    background: url(../../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0.2rem;
    top: 0.2rem;
  }
  .title {
    width: 3.7rem;
    height: 1.26rem;
    background: url(../../assets/img/pup/luckTitle.png);
    background-size: 100% 100%;
    position: absolute;
    top: -0.6rem;
    left: 1.7rem;
  }
  .giftArr {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.8rem;
    padding: 0 0.58rem;
    .giftItem {
      width: 1.6rem;
    }
    .imgBg {
      width: 1.6rem;
      height: 1.6rem;
      background: rgba(135, 65, 227, 1);
      border-radius: 0.12rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    strong {
      display: block;
      height: 0.9rem;
      font-size: 0.24rem;
      text-align: center;
    }
  }
  p {
    text-align: center;
    margin-top: 0.5rem;
    font-size: 0.24rem;
  }
}
</style>
