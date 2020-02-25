<template>
  <div class="turntable">
    <p class="time">{{timer}}</p>
    <slot-machine-test></slot-machine-test>
    <p class="coinsbox">Koin harimau yg sisa：<span class="coins">{{coins}}</span></p>
    <!-- <a href="" class="handle" :class="{active:hadleActive}" @click.prevent="go()"></a> -->

  </div>
</template>

<script>
import getDate from "../utils/getDate.js"
import SlotMachineTest from "../components/SlotMachine/SlotMachineTest.vue"
import api from "../api/apiConfig.js"
import { mapState } from "vuex"
export default {
  data() {
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
    stime() {
      var that = this
      if (that.actState == 1) { //开始
        that.timer = getDate(new Date(Number(that.stime * 1000)), "~") + ' ~ ' + getDate(new Date(Number(that.etime * 1000)), "~")
      } else if (that.actState == 0) {//未开始
        that.timer = `Acara belum dimulai`
      } else if (that.actState == 2) { //一结束
        that.timer = `Acara telah berakhir`
      }

    }
  },
  created() {

  },
  components: {
    SlotMachineTest
  }
}
</script>

<style lang="scss">
.turntable {
  height: 7.8rem;
  position: relative;
  .time {
    color: #fdfdac;
    text-align: center;
    font-size: 73%;
    width: 3.9rem;
    position: absolute;
    top: 4.1rem;
    left: 1.8rem;
    white-space: nowrap;
  }
  .coinsbox {
    text-align: center;
    margin-top: 0.05rem;
    position: absolute;
    top: 7.12rem;
    left: 2rem;
    font-size: 80%;
    .coins {
      font-size: 120%;
      color: #fffc00;
    }
  }

  // .handle.active{animation:btnBs ease-in .3s 2 alternate forwards; }
  // @keyframes btnBs{
  //     0%{ transform:scaleY(1)}
  //     100%{ transform:scaleY(-0.5)}
  // }
}
</style>
