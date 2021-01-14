<template>
  <div class="sloat">
    <SlotMachine @end="onEnd" :size="3" :list="list" :result="result" />
    <div class="handle" :style="{'background-position-Y':imgPos[imgindex]}"></div>
    <!-- <img :src="require('../../assets/img/'+imgindex+'.png')" alt="" class="handle"> -->
    <transition name="slide">
      <min-wards-toast v-show="showMinToast" @hideToast="hideToast()"></min-wards-toast>
    </transition>
    <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    <span class="refresh" @click="refresh()" :style="{transform:'rotate('+rotatePx+'deg)'}"> </span>
  </div>
</template>

<script>
import SlotMachine from './Index';
import api from "../../api/apiConfig.js"
import minWardsToast from "../../components/minWardsToast.vue"
import MsgToast from "../commonToast.vue"
import APP from "../../utils/openApp.js"
import { globalBus } from '../../utils/eventBus.js'
import { mapState } from "vuex"
export default {
  data() {
    return {
      list: [
        { id: 1, src: require("../../assets/img/ward1.png") },
        { id: 2, src: require("../../assets/img/ward2.png") },
        { id: 3, src: require("../../assets/img/ward3.png") },
        { id: 4, src: require("../../assets/img/ward4.png") },
        { id: 5, src: require("../../assets/img/ward4.png") },
        { id: 6, src: require("../../assets/img/ward4.png") },
        { id: 7, src: require("../../assets/img/ward5.png") },
        { id: 8, src: require("../../assets/img/ward6.png") },
        { id: 9, src: require("../../assets/img/ward7.png") },
        { id: 10, src: require("../../assets/img/ward8.png") },
        { id: 11, src: require("../../assets/img/ward9.png") },
        { id: 12, src: require("../../assets/img/ward10.png") },
        { id: 13, src: require("../../assets/img/ward11.png") },
        { id: 14, src: require("../../assets/img/ward12.png") },
        { id: 15, src: require("../../assets/img/ward12.png") },
        { id: 16, src: require("../../assets/img/ward12.png") },
        { id: 17, src: require("../../assets/img/ward12.png") },
        { id: 18, src: require("../../assets/img/ward13.png") },
        { id: 19, src: require("../../assets/img/ward14.png") },
        { id: 20, src: require("../../assets/img/ward15.png") },
        { id: 21, src: require("../../assets/img/ward15.png") },
        { id: 22, src: require("../../assets/img/ward15.png") },
        { id: 23, src: require("../../assets/img/ward15.png") },
        { id: 24, src: require("../../assets/img/frame1.png") },
        { id: 25, src: require("../../assets/img/frame2.png") },
        { id: 26, src: require("../../assets/img/frame3.png") },
        { id: 27, src: require("../../assets/img/ward19.png") },
        { id: 28, src: require("../../assets/img/car3.png") },
        { id: 29, src: require("../../assets/img/ward21.png") },
      ],
      result: [],
      imgindex: 0,
      drawSwitch: true,    // 抽奖开关，避免重复抽奖
      timerSet: 0,
      showMinToast: false,  //弹窗开关
      tastMsg: '',       //弹窗提示
      showT: false,
      imgPos: [
        "-.1rem", "-2.5rem", "-4.83rem", "-7.2rem", "-9.56rem", "-7.2rem", "-4.83rem", "-2.5rem", "-.1rem"
      ],
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
      activeMsg: {}
    };
  },
  computed: {
    ...mapState(["drawCions", "actState", "coins", "isShare"])
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
      var that = this
      if (that.isShare) { //分享模式下打开APP
        APP()
        return
      }
      if (that.drawSwitch && that.actState === 1) { //避免重复请求  活动开始转动
        that.drawSwitch = false  //关闭开关
        if (that.coins < that.drawCions) {  //老虎币不足
          that.drawSwitch = true  //弹窗提示，重置抽奖开关
          that.tastMsg = `ليس لديك نقود الفتحة الكافية`
          that.showT = true
          return
        } else {  //老虎币足够开启抽奖
          var nowCoins = that.coins - that.drawCions
          that.$store.commit('changcoins', nowCoins)  //减少当前用户老虎币
          api.luckDraw(that.drawCions).then(function (res) { // 获取抽奖结果
            if (res.data.response_status.code === 0) {
              var lotterylist = res.data.response_data.lotterylist
              that.result = lotterylist       //开启奖品滚动效果
            }
          })
          if (this.imgindex !== 0) return
          this.timerSet = setInterval(() => { //把手动画开始
            this.imgindex++
            if (this.imgindex >= this.imgPos.length) {
              this.imgindex = 0
              clearInterval(this.timerSet)
            }
          }, 100)
        }
      } else if (that.actState === 0) { //活动未开始
        that.tastMsg = `لم يبدأ النشاط` //弹窗提示，重置抽奖开关
        that.drawSwitch = true
        that.showT = true
      } else if (that.actState === 2) { //活动结束
        that.tastMsg = `انتهى النشاط` //弹窗提示，重置抽奖开关
        that.drawSwitch = true
        that.showT = true
      }
    },
    onEnd(result) { //动画结束时重置开关
      this.$store.commit('changlotterylist', result) //提交抽奖结果，后弹窗
      //判断有无抽中老虎币，有的话更新当前用户老虎币数量
      var getCoins = 0
      result.forEach(element => {
        if (element == 10) {
          getCoins += 500
        } else if (element == 11) {
          getCoins += 1000
        } else if (element == 12) {
          getCoins += 1500
        }
      });
      //更新老虎币
      this.$store.commit('changcoins', (this.coins + getCoins))
      this.drawSwitch = true //请求开启开关
      this.showMinToast = true
    },
    hideToast() {
      this.showMinToast = false
    },
    closeToast() {
      this.showT = false
    },
    refresh() {
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      if (this.drawSwitch) {
        let that = this
        api.getDefault().then(function (res) { //请求基础数据
          that.activeMsg = res.data.response_data
          that.$store.commit('changcoins', that.activeMsg.coins)  //当前用户老虎币数量
          that.$store.commit('changactState', that.activeMsg.status)  //当前活动状态
        })
      }
    }
  },
  components: {
    SlotMachine,
    minWardsToast,
    MsgToast
  }
}
</script>

<style lang="scss">
button {
  padding: 0.1rem 0.2rem;
  position: absolute;
}
.sloat {
  position: absolute;
  top: 4.5rem;
  left: 1.85rem;
}
.handle {
  width: 0.56rem;
  height: 2.56rem;
  position: absolute;
  right: -0.98rem;
  background: url(../../assets/img/handle.png) no-repeat;
  background-size: 100% auto;
}
.refresh {
  display: block;
  width: 0.94rem;
  height: 1rem;
  position: fixed;
  right: 0.08rem;
  bottom: 1.35rem;
  background: url(../../assets/img/refresh.png) no-repeat;
  background-size: contain;
  transition: transform 1s;
  z-index: 1000;
}
</style>
