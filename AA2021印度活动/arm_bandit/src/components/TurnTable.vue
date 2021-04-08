<template>
  <div class="turntable">
    <div class="timeBox">
      <p class="time">{{timer}}</p>
    </div>

    <slot-machine-test></slot-machine-test>
    <p class="coinsbox">{{lang.userCoins}}<span class="coins">{{coins}}</span></p>
    <!-- <a href="" class="handle" :class="{active:hadleActive}" @click.prevent="go()"></a> -->

  </div>
</template>

<script>
import getDate from "../utils/getDate.js"
import TurntableItem from "./TurntableItem.vue"
import SlotMachineTest from "./SlotMachine/SlotMachineTest.vue"
import api from "../apis"
import { mapState } from "vuex"
export default {
  data () {
    return {
      timer: '',
      hadleActive: false,
      showMinToast: false  // 控制弹窗显示
    }
  },
  props: ["stime", "etime"],
  computed: {
    ...mapState(["coins", "drawCions", "actState"])
  },
  methods: {

  },
  watch: {
    stime () {
      var that = this
      if (that.actState == 1) { //开始
        that.timer = getDate(new Date(Number(that.stime * 1000)), "~") + ' ~ ' + getDate(new Date(Number(that.etime * 1000)), "~")
      } else if (that.actState == 0) {//未开始
        that.timer = that.lang.act_noStar
      } else if (that.actState == 2) { //一结束
        that.timer = that.lang.act_end
      }

    }
  },
  created () {

  },
  components: {
    TurntableItem,
    SlotMachineTest
  }
}
</script>

<style lang="scss">
.turntable {
  height: 7.8rem;
  position: relative;
  .timeBox {
    width: 4rem;
    color: #fdfdac;
    text-align: center;
    font-size: 85%;
    position: absolute;
    top: 4.05rem;
    left: 1.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .coinsbox {
    text-align: center;
    margin-top: 0.1rem;
    position: absolute;
    top: 7.08rem;
    left: 2.3rem;
    font-size: 90%;
    display: flex;
    align-items: center;
    .coins {
      font-size: 120%;
      color: #fffc00;
      margin-left: 0.05rem;
    }
  }

  // .handle.active{animation:btnBs ease-in .3s 2 alternate forwards; }
  // @keyframes btnBs{
  //     0%{ transform:scaleY(1)}
  //     100%{ transform:scaleY(-0.5)}
  // }
}
</style>
