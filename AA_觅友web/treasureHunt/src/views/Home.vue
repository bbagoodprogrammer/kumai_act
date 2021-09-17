<template>
  <div class="main" :style="{background: `url(${images.main})`, backgroundSize: '100% 100%'}">
    <!-- 超值兑换 -->
    <div class="exchange__box" @click="handleRouter('exchange')">
      <img src="../img/gift_icon.png" />
      <span>{{lang.super_exchange}}</span>
    </div>
    <img @click="handleRouter('explain')" class="explain" src="../img/explain.png" />
    <img @click="handleRouter('record')" class="record" src="../img/record.png" />

    <!-- 轮播 -->
    <div class="rotation">
      <ScrollNotice />
    </div>

    <!-- 抽奖 -->
    <LuckDraw ref="luckDraw" :mode="isSuper" />

    <div class="map__des">
      <div class="title">{{lang.treasure_map}}</div>
      <img src="../img/map.png" />
      <div class="num">:{{actInfo.mapCount}}</div>
      <div class="get" @click="showGetMap = true">{{lang.get}}</div>
    </div>

    <div class="treasure__action">
      <div class="one" @click="startDraw(1)">
        <div class="title">{{lang.treasure_one}}</div>
        <div class="count">(<img src="../img/map.png" />1)</div>
      </div>
      <div class="ten" @click="startDraw(10)">
        <div class="title">{{lang.treasure_ten}}</div>
        <div class="count">(<img src="../img/map.png" />10)</div>
      </div>
    </div>

    <!-- 探險榜 -->
    <div @click="handleRouter('list')" class="adventure__btn">{{lang.adventure_list}}</div>

    <GetMap v-if="showGetMap" :visible.sync="showGetMap" />

    <!-- 进度条 -->
    <div class="progress__box">
      <div class="progress">
        <div class="liner__box">
          <span class="liner" :style="{height: linerHeight}">
            <span class="num_tip" :style="{top: numTipTop}">{{progress}}%</span>
          </span>
        </div>
      </div>
      <div class="text__box" @click.stop="handleShowSuperTip">
        <div class="text">{{lang.process_bottom_text}}</div>
        <div class="pro_question">
          <div v-if="showSuperTip" @click.stop="" class="super_tip">{{lang.super_treasure_tip}}</div>
          <div v-if="showSuperTip" class="super_tip_arrow"></div>
        </div>
      </div>
      <!-- 倒计时 v-if="showTimeDown" -->
      <div v-if="showTimeDown" class="time_down__box">
        <div class="down__title">{{lang.time_down}}</div>
        <div class="down__time">{{lang.time_down_value.replace('{0}', downTime.minute || '00').replace('{1}', downTime.second || '00')}}</div>
      </div>
    </div>

    <!-- <Loading v-show="loading" /> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Player } from "svga.lite";
import { urls } from "../config";
import { toast } from "../utils";
import { loadSvgaData } from "../utils/svga";
import downTime from "../utils/downTime";
import Loading from "../components/common/Loading";
import ScrollNotice from "../components/common/ScrollNotice";
import LuckDraw from '../components/LuckDraw'
import GetMap from "../components/GetMap";
import { getSuperProgress } from "../apis";

export default {
  components: {
    Loading,
    ScrollNotice,
    LuckDraw,
    GetMap
  },

  data () {
    return {
      showGetMap: false,
      showSuperTip: false,
      downTime: {},
      timer: 0,
      isSuper: '',
      superTipTimer: 0,
      progress: 0,
      showTimeDown: false
    };
  },

  computed: {
    ...mapState(["loading", "actInfo", "speed_config"]),
    lang: () => _lang,
    images: () => _images,
    linerHeight () {
      if (this.progress < 5) {
        return '5%'
      }
      return this.progress + '%'
    },
    numTipTop () {
      if (this.progress < 5) {
        return '-0.35rem'
      }
      if (this.progress >= 95) {
        return '-0.09rem'
      }
      return '-0.24rem'
    }
  },

  watch: {
    showSuperTip (val) {
      if (!val) {
        this.superTipTimer && clearTimeout(this.superTipTimer)
      }
    },
    'actInfo.isSuperMode': {
      handler (val) {
        // console.log('val=>', val)
        this.isSuper = val
      }
    }
  },

  created () {
    // document.title='\u200E';
    setTimeout(() => {
      this.getSuperProgress()
    }, 300)
  },

  mounted () {
    this.$el.onclick = () => {
      if (this.showSuperTip) {
        this.showSuperTip = false
      }
    }
  },

  beforeDestroy () {
    clearInterval(this.timer)
    clearTimeout(this.superTipTimer)
  },

  methods: {
    // 获取进度条的数据
    async getSuperProgress () {
      const res = await getSuperProgress();
      if (res.data) {
        const { response_status, response_data } = res.data;
        if (response_status && response_status.error === "") {
          // 改变vuex isSuperMode
          this.$store.commit('changeMode', '')
          this.$nextTick(() => {
            this.$store.commit('changeMode', response_data.isRunning)
          })
          this.progress = response_data.progress >= 100 ? 100 : response_data.progress
          if (response_data.isRunning && response_data.surplus) {
            this.showTimeDown = true
            this.handleDownTime(response_data.surplus)
          }
        } else if (response_status.error) {
          //toast(response_status.error.replace(/\[\d+\]$/, ""));
        }
      }
    },

    handleDownTime (diffTime) {
      const timeKey = "super_time";
      if (downTime(timeKey) == null) {
        downTime(timeKey, diffTime);
      }
      if (downTime(timeKey).end) {
        this.downTime = downTime(timeKey);
      } else {
        clearInterval(this.timer)
        let fn = () => {
          this.downTime = downTime(timeKey);
          if (this.downTime.end) {
            clearInterval(this.timer)
            //this.$store.commit('changeMode', false)
            // 当超级模式结束时，首先判断是否正在正在寻宝，如果正在寻宝中，等寻宝完成之后再改变寻宝九宫格
            this.$refs.luckDraw.judgeHunt()
            this.progress = 0
            this.showTimeDown = false
          }
        }
        fn()
        this.timer = setInterval(fn, 1000);
      }
    },

    startDraw (count) {
      // 寻宝图数量判断
      if (this.actInfo.mapCount < count) {
        toast(this.lang.map_not_enough)
        return
      }
      if (count == 1) {
        this.$refs.luckDraw.goLotteryOne()
      } else {
        this.$refs.luckDraw.goLotteryTen()
      }
    },

    handleShowSuperTip () {
      // 操作子组件
      if (this.$refs.luckDraw.showGiftTip) {
        this.$refs.luckDraw.showGiftTip = false
      }
      if (this.$refs.luckDraw.showLuckValueTip) {
        this.$refs.luckDraw.showLuckValueTip = false
      }
      if (!this.showSuperTip) {
        this.superTipTimer = setTimeout(() => {
          this.showSuperTip = false
        }, 5000)
      }
      this.showSuperTip = !this.showSuperTip
    },

    handleRouter (router) {
      // 如果正在寻宝中，不让跳转到其他的页面
      if (this.$refs.luckDraw.speed != this.speed_config) {
        toast(this.lang.hunt_not_leave)
        return
      }
      this.$router.push('/' + router)
    },

  }
};
</script>

<style lang="scss">
.main {
  width: 7.5rem;
  height: 9.3rem;
  position: relative;
  box-sizing: border-box;
  padding-top: 1.4rem;
  .exchange__box {
    //width: 1.9rem;
    padding-right: 0.19rem;
    height: 0.54rem;
    line-height: 0.54rem;
    background: #442784;
    border-radius: 0.27rem;
    position: absolute;
    right: 0.19rem;
    top: 0.24rem;
    display: flex;
    align-items: center;
    img {
      width: 0.6rem;
      height: 0.6rem;
    }
    span {
      padding-left: 0.01rem;
      font-size: 0.28rem;
      font-weight: 400;
      color: #FFFFFF;
      opacity: 0.6;
    }
  }
  .explain {
    width: 0.42rem;
    height: 0.42rem;
    position: absolute;
    top: 0.3rem;
    left: 0.3rem;
  }
  .record {
    width: 0.42rem;
    height: 0.42rem;
    position: absolute;
    left: 1.03rem;
    top: 0.3rem;
  }

  .rotation {
    width: 7.5rem;
    height: 0.4rem;
    background: url('../img/rotation.png');
    background-size: 100% 100%;
  }

  // .draw__box {
  //   width: 5.41rem;
  //   height: 5.41rem;
  //   background: url('../img/luck_draw.png');
  //   background-size: 100% 100%;
  //   margin: 0.05rem auto 0 auto;
  // }

  .map__des {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 0.36rem;
    line-height: 0.36rem;
    margin-top: 0.26rem;
    .title {
      font-size: 0.32rem;
      font-weight: 600;
      color: #FFFFFF;
    }
    img {
      width: 0.42rem;
      height: 0.42rem;
      margin-left: 0.11rem;
      margin-right: 0.12rem;
    }
    .num {
      font-size: 0.32rem;
      font-weight: 400;
      color: #FFFFFF;
    }
    .get {
      height: 0.36rem;
      line-height: 0.36rem;
      border: 0.02rem solid #FFFFFF;
      border-radius: 0.18rem;
      font-size: 0.26rem;
      font-weight: 400;
      color: #FFFFFF;
      opacity: 0.6;
      padding-left: 0.21rem;
      padding-right: 0.21rem;
      margin-left: 0.3rem;
      box-sizing: border-box;
    }
  }

  .treasure__action {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.3rem;
    text-align: center;
    .action {
      width: 1.95rem;
      height: 0.87rem;
      margin-left: 0.3rem;
      margin-right: 0.3rem;
      display: flex;
      align-items: center;
      // justify-content: center;
      flex-direction: column;
      font-size: 0.28rem;
      font-weight: 600;
      .count {
        display: flex;
        align-items: center;
        font-size: 0.24rem;
        height: 0.3rem;
        line-height: 0.3rem;
        img {
          width: 0.3rem;
          height: 0.3rem;
          display: block;
        }
      }
      .title {
        height: 0.32rem;
        line-height: 0.32rem;
        margin-top: 0.11rem;
        //margin-bottom: 0.05rem
      }
    }
    .one {
      @extend .action;
      background: url('../img/treasure_one.png');
      background-size: 100% 100%;
      color: #984904;
    }
    .ten {
      @extend .action;
      background: url('../img/treasure_ten.png');
      background-size: 100% 100%;
      color: #FFFFFF;
    }
  }

  .adventure__btn {
    //width: 1.2rem;
    height: 0.6rem;
    background: #FFFFFF;
    border-radius: 0.3rem 0rem 0rem 0.3rem;
    position: absolute;
    right: 0;
    bottom: 1.31rem;
    line-height: 0.6rem;
    font-size: 0.28rem;
    font-weight: bold;
    color: #714BED;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
  }

  .progress__box {
    position: absolute;
    left: 0.43rem;
    top: 3.35rem;
    z-index: 50;
    .progress {
      width: 0.22rem;
      height: 3.24rem;
      background: url('../img/liner.png');
      background-size: 100% 100%;
      position: relative;
      // box-sizing: border-box;
      // padding: 0.03rem;
      .liner__box {
        width: 0.18rem;
        height: 3.2rem;
        position: absolute;
        top: 0.02rem;
        left: 0.02rem;
        .liner {
          width: 0.18rem;
          // height: 80%;
          background: linear-gradient(
            0deg,
            #6BF9BD 0%,
            #487AFD 50%,
            #E21AFC 100%
          );
          border-radius: 0.09rem;
          display: block;
          position: absolute;
          bottom: 0;
          left: 0;
          .num_tip {
            width: 0.64rem;
            height: 0.31rem;
            background: url('../img/progress_text_bg.png');
            background-size: 100% 100%;
            display: block;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            // top: -0.24rem;
            font-size: 0.22rem;
            font-weight: 600;
            color: #380772;
            text-align: center;
          }
        }
      }
    }
    .text__box {
      position: absolute;
      // display: flex;
      // align-items: center;
      // left: 50%;
      // transform: translateX(-50%);
      left: -0.24rem;
      margin-top: 0.09rem;
      .text {
        width: 0.48rem;
        height: 0.48rem;
        font-size: 0.2rem;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 0.24rem;
        opacity: 0.6;
        text-align: center;
      }
      .pro_question {
        width: 0.3rem;
        height: 0.3rem;
        background: url('../img/explain.png');
        background-size: 100% 100%;
        // margin-left: 0.05rem;
        position: absolute;
        left: 0.5rem;
        top: 0.09rem;
        .super_tip {
          width: 5.52rem;
          padding: 0.2rem;
          box-sizing: border-box;
          background: rgba($color: #000000, $alpha: 0.8);
          position: absolute;
          bottom: 0.51rem;
          left: -0.5rem;
          z-index: 50;
          font-size: 0.32rem;
          font-weight: 400;
          line-height: 0.46rem;
          color: #FFFFFF;
          opacity: 1;
          border-radius: 0.2rem;
          text-align: center;
        }
        .super_tip_arrow {
          position: absolute;
          top: -0.21rem;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-width: 0.15rem;
          border-style: solid;
          border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
        }
      }
    }
    .time_down__box {
      width: 0.9rem;
      height: 0.61rem;
      background: url('../img/time_down_box.png');
      background-size: 100% 100%;
      position: absolute;
      top: -0.87rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .down__title {
        font-size: 0.24rem;
        font-weight: 600;
        color: #FFFFFF;
        line-height: 0.24rem;
      }
      .down__time {
        font-size: 0.24rem;
        font-weight: 600;
        color: #FFFFFF;
        line-height: 0.24rem;
      }
    }
  }
}
</style>