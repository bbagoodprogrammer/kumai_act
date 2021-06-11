<template>
  <div>
    <div class="draw__box">
      <canvas id="canvas"></canvas>
      <div class="draw__main">
        <div
          v-for="(item, giftIndex) in list"
          :key="item.key"
          :data-key="item.key"
          class="line_item"
          :class="[item.check ? 'active' : 'white_item']"
          :ref="'giftRef' + giftIndex"
          @click.stop="handleGiftTip(giftIndex, item)"
        >
          <template v-if="!mode">
            <div v-if="item.key == 8" class="luck_value__box">
              <div @click.stop="handleLuckValueTip()" class="imgs" v-html="getImgs(actInfo.luckyValue)"></div>
              <div @click.stop="handleLuckValueTip()" ref="luckValue" class="value">
                {{ lang.luck_value }}
              </div>
              <div v-show="showLuckValueTip" class="value_tip">
                {{ lang.luck_value_tip }}
              </div>
            </div>
            <template v-else>
              <img class="gift__img" :src="item.image" />
              <img v-if="item.num > 1" class="num__img" :src="require(`../img/X${item.num}.png`)" />
            </template>
          </template>
          <template v-else>
            <img class="gift__img" :src="item.image" />
            <img v-if="item.num > 1" class="num__img" :src="require(`../img/X${item.num}.png`)" />
          </template>
        </div>

        <!-- gift tip -->
        <div
          v-if="showGiftTip"
          class="gift_tip__box"
          :class="{
            gift_tip__box_first: giftTipRow == 1,
            gift_tip__box_second: giftTipRow == 2,
            gift_tip__box_third: giftTipRow == 3,
          }"
          @click.stop=""
        >
          <div class="tip_header__box">
            <div class="img__box">
              <img class="gift" :src="giftItem.image" />
              <img v-if="giftItem.num > 1" class="num" :src="require(`../img/X${giftItem.num}.png`)" />
            </div>
            <div>
              <div class="name">{{giftItem.name}}</div>
              <div class="coin__box">
                <img src="../img/coin.png" />
                <div>{{giftItem.price}}</div>
              </div>
            </div>
          </div>
          <div class="gift_des">{{giftItem.caption}}</div>
          <!-- 箭头 -->
          <div
            :class="{
              arrow_up: giftTipRow == 1 || giftTipRow == 2,
              arrow_down: giftTipRow == 3,
            }"
            :style="{ marginLeft: giftArrowMarLeft }"
          ></div>
        </div>
      </div>
    </div>

    <LuckDrawGift
      :visible.sync="giftDialog"
      :list="giftList"
      v-if="giftDialog"
    />
  </div>
</template>
<script>
import { playSvga } from "../utils/svga";
import calcNuImmg from "../utils/calcNumImg";
import LuckDrawGift from "./LuckDrawGift";
import {startHunt} from '../apis'
import {toast} from '../utils'
import { mapState } from "vuex";
import { Downloader, Parser, Player } from "svga.lite";
import store from '../store';
export default {
  computed: {
    lang: () => _lang,
    images: () => _images,
    ...mapState([
      "svgaDatas", 
      "normalList", 
      "actInfo",
      "superList",
      "speed_config"
    ]),
  },

  props: ["mode"],

  components: {
    LuckDrawGift,
  },

  data() {
    return {
      index: 0, // 当前转动到哪个位置，起点位置
      count: 8, // 总共有多少个位置
      timer: 0, // 每次转动定时器
      speed: 180, // 初始转动速度
      times: 0, // 转动次数
      cycle: 15, // 转动基本次数：即至少需要转动多少次再进入抽奖环节
      prizes: 0, // 中奖位置
      prize: [0, 1, 2, 3, 4, 5, 6, 7], // 奖品位置
      // mode: true,
      list: [],
      loadSvga: false,
      showLuckValueTip: false,
      luckValueTimer: 0,
      giftDialog: false,
      giftList: [],
      giftLeft: "", // 礼物tip小箭头的left值
      giftTipRow: 1,
      giftArrowMarLeft: "",
      showGiftTip: false,
      giftIndex: 0,
      giftItem: {},
      player: null,
      luckyMapObj: {},
      tenHuntKey: [], //存放寻宝十次的位置
      updateMode: false
    };
  },

  watch: {
    svgaDatas: {
      handler(val) {
        let type = this.mode ? 'colourCircle' : 'whiteCircle'
        let svgaItem = this.svgaDatas.find(
          (item) => item.type == type
        );
        if (svgaItem && this.loadSvga) {
          this.handleSvga(svgaItem.fileData);
        }
      },
      deep: true,
      immediate: true,
    },
    loadSvga: {
      handler(val) {
        if (val) {
          let type = this.mode ? 'colourCircle' : 'whiteCircle'
          let svgaItem = this.svgaDatas.find(
            (item) => item.type == type
          );
          if (svgaItem) {
            this.handleSvga(svgaItem.fileData);
          }
        }
      },
    },
    mode: {
      handler(val) {
        // console.log('mode=>', val)
        let type = val ? 'colourCircle' : 'whiteCircle'
        let svgaItem = this.svgaDatas.find(
          (item) => item.type == type
        );
        if (svgaItem && this.loadSvga) {
          this.handleSvga(svgaItem.fileData);
        }
        this.handleList(val)
      },
      immediate: true
    },
    'actInfo.luckyValue': {
      handler(val) {
        if (val == 100 && !this.giftDialog) {
          this.handleLuckValueTip()
        }
      }
    },
    normalList:{
      handler() {
        this.handleList(this.mode)
      },
      deep: true,
    },
    superList:{
      handler() {
        this.handleList(this.mode)
      },
      deep: true,
    },
    giftDialog (val) {
      if (!val && this.updateMode) {
        this.$store.commit('changeMode', false)
      }
      if (!val && this.actInfo.luckyValue == 100) {
        this.handleLuckValueTip()
      }
    }
  },

  mounted() {
    this.loadSvga = true;
    this.speed = this.speed_config
    window.document.onclick = (event) => {
      if (this.showLuckValueTip) {
        this.showLuckValueTip = false;
        this.luckValueTimer && clearTimeout(this.luckValueTimer);
      }
      if (this.showGiftTip) {
        this.showGiftTip = false;
      }
    };
  },

  beforeDestroy() {

  },

  methods: {
    handleList (mode) {
      this.$nextTick(() => {
        if (mode) {
          this.list = this.superList
        } else {
          this.list = this.normalList
        }
      })
    },

    getImgs(num) {
      return calcNuImmg(num);
    },

    // 点击奖品弹出说明
    handleGiftTip(giftIndex, item) {
      // console.log(giftIndex);
      if (this.$parent.showSuperTip) {
        this.$parent.showSuperTip = false
      }

      // 关闭中间的幸运值提示
      if (this.showLuckValueTip) {
        this.showLuckValueTip = false
        this.luckValueTimer && clearTimeout(this.luckValueTimer);
      }

      // 普通模式下，中间4号位不弹
      if (!this.mode && giftIndex == 4) {
        return;
      }

      // 如果已经在抽奖中，则不弹出
      if (this.speed != this.speed_config) {
        return;
      }

      //如果前后点击的都是同一个，则关闭
      if (this.showGiftTip && this.giftIndex == giftIndex) {
        this.showGiftTip = false;
        return;
      }

      if (giftIndex == 0 || giftIndex == 1 || giftIndex == 2) {
        this.giftTipRow = 1;
      } else if (giftIndex == 3 || giftIndex == 4 || giftIndex == 5) {
        this.giftTipRow = 2;
      } else {
        this.giftTipRow = 3;
      }

      if (giftIndex == 0 || giftIndex == 3 || giftIndex == 6) {
        this.giftArrowMarLeft = "-1.5rem";
      } else if (giftIndex == 2 || giftIndex == 5 || giftIndex == 8) {
        this.giftArrowMarLeft = "1.5rem";
      } else {
        this.giftArrowMarLeft = "";
      }
      this.giftIndex = giftIndex;
      this.giftItem = item
      this.showGiftTip = true;
    },

    handleLuckValueTip() {
      if (this.showGiftTip) {
        this.showGiftTip = false
        this.luckValueTimer && clearTimeout(this.luckValueTimer);
      }

      if (!this.showLuckValueTip) {
        this.luckValueTimer && clearTimeout(this.luckValueTimer);
        this.luckValueTimer = setTimeout(() => {
          this.showLuckValueTip = false;
        }, 5000);
        this.$nextTick(() => {
          this.showLuckValueTip = true;
        })
      }
      //操作父组件
      if (this.$parent.showSuperTip) {
        this.$parent.showSuperTip = false
      }
    },

    async handleSvga(fileData) {
      this.player = new Player("#canvas");
      this.player.set({ loop: 0, startFrame: 1 });
      await this.player.mount(fileData);
      this.player.start();
      this.player.stop();
    },

    // 判断是否寻宝
    judgeHunt() {
      if (this.speed == this.speed_config) { 
        // 未在寻宝中，改变寻宝模式
        this.$store.commit('changeMode', false)
      } else {
        //正在寻宝中，等展示寻宝礼物弹框结束后再改变
        this.updateMode = true
      }
    },

    async goLotteryOne() {
      // this.prizes = 5
      // this.player.start()
      //       this.startRoll();
      //       return
      //判断如果抽奖停止后才可以再次点击
      if (this.speed == this.speed_config) {
        this.updateMode = false
        this.tenHuntKey = []
        let mode = this.mode ? 1 : 0
        let res = await startHunt({num: 1, mode: mode});
        if (res.data) {
          const { response_status, response_data } = res.data;
          if (response_status && response_status.error === "") {
            // 把幸运值和地图数保存起来，在弹出中奖礼物时改变数据
            this.luckyMapObj = {
              luckyValue: response_data.luckyValue,
              mapCount: 1
            }
            // 计算出中奖的位置
            this.prizes = this.list.findIndex(item => item.sn == response_data.list[0].sn)
            // 普通模式需要特殊处理，因为中间插了个幸运值
            if (mode == 0 && this.prizes > 4) {
              this.prizes -= 1
            }

            this.player.start()
            this.startRoll();
            this.giftList = response_data.list
            console.log('prizes: ', this.prizes)
          } else if (response_status.error) {
            //如果是另一种寻宝模式，则切换模式
            if (response_status.code == 10205) {
              toast(this.lang.content_update)
              // 调用寻宝进度的接口
              this.$parent.getSuperProgress()
              return
            } else {
              toast(response_status.error.replace(/\[\d+\]$/, ''));
            }
          }
        }
      }
    },

    async goLotteryTen() {
      //判断如果抽奖停止后才可以再次点击
      if (this.speed == this.speed_config) {
        this.tenHuntKey = []
        this.updateMode = false
        let mode = this.mode ? 1 : 0
        let res = await startHunt({num: 10, mode: mode});
        if (res.data) {
          const { response_status, response_data } = res.data;
          if (response_status && response_status.error === "") {
            // 把幸运值和地图数保存起来，在弹出中奖礼物时改变数据
            this.luckyMapObj = {
              luckyValue: response_data.luckyValue,
              mapCount: 10
            }
            // 计算出第一个中奖的位置
            this.prizes = this.list.findIndex(item => item.sn == response_data.list[0].sn)
            let tenHuntKey = []
            response_data.list.forEach(gift => {
              tenHuntKey.push(this.list.findIndex(item => item.sn == gift.sn))
            })
            // 普通模式需要特殊处理，因为中间插了个幸运值
            if (mode == 0) {
              if (this.prizes > 4) {
                this.prizes -= 1
              }
              tenHuntKey = tenHuntKey.map(i => i > 4 ? i - 1 : i)
            }
            this.tenHuntKey = tenHuntKey
            
            this.player.start()
            this.startRoll();
            this.giftList = response_data.list
          } else if (response_status.error) {
            //如果是另一种寻宝模式，则切换模式
            if (response_status.code == 10205) {
              toast(this.lang.content_update)
              // 调用寻宝进度的接口
              this.$parent.getSuperProgress()
              return
            }else {
              toast(response_status.error.replace(/\[\d+\]$/, ''));
            }
          }
        }
      }
    },

    // 开始转动
    startRoll() {
      this.times += 1; // 转动次数
      this.oneRoll(); // 转动过程调用的每一次转动方法，这里是第一次调用初始化
      this.usePrize();
    },
    // 每一次转动
    oneRoll() {
      let index = this.index; // 当前转动到哪个位置
      let count = 8; // 总共有多少个位置
      if (this.mode) { // 超级模式
        count = 9
      }
      index += 1;
      if (index > count - 1) {
        index = 0;
      }
      this.index = index;

      let list = JSON.parse(JSON.stringify(this.list))
      list.forEach((item, i) => {
        if (item.key == this.index) {
          item.check = true
        } else {
          item.check = false
        }
      })
      this.$nextTick(() => {
        this.$store.commit('changList', {
          type: this.mode,
          list: list
        })
      })
      
    },
    usePrize() {
      // 如果当前转动次数达到要求 && 目前转到的位置是中奖位置
      if (this.times > this.cycle + 5 && this.prizes === this.index) {
        clearTimeout(this.timer); // 清除转动定时器，停止转动
        this.times = 0;
        this.speed = this.speed_config; //速度初始化
        this.player.stop()

        // 寻宝十次结束后，让每个中奖的元素选中
        if (this.tenHuntKey.length > 0) {
          let list = JSON.parse(JSON.stringify(this.list))
          list.forEach((item, i) => {
            if (this.tenHuntKey.includes(+item.key)) {
              item.check = true
            } else {
              item.check = false
            }
          })
          this.$nextTick(() => {
            this.$store.commit('changList', {
              type: this.mode,
              list: list
            })
          })
        }
        setTimeout(() => {
          this.$nextTick(() => {
            this.giftDialog = true; //展示礼物弹框
            this.$store.commit('changeLuckyValue', this.luckyMapObj.luckyValue)
            this.$store.commit('changeMapCount', -this.luckyMapObj.mapCount)
          })
        }, 1000)
      } else {
        if (this.times < this.cycle) {
          this.speed += 5; // 降低转动速度
        }
        this.timer = setTimeout(this.startRoll, this.speed);
      }
    },
  },
};
</script>
<style lang="scss">
.draw__box {
  width: 5.4rem;
  height: 5.4rem;
  background: url("../img/luck_draw.png");
  background-size: 100% 100%;
  margin: 0.05rem auto 0 auto;
  position: relative;
  #canvas {
    width: 5.06rem;
    height: 5.06rem;
    margin-left: 0.16rem;
    margin-top: 0.16rem;
    position: absolute;
  }
  .draw__main {
    width: 4.6rem;
    height: 4.6rem;
    position: absolute;
    left: 0.38rem;
    top: 0.38rem;
    z-index: 10;
    .line_item {
      width: 1.4rem;
      height: 1.4rem;
      float: left;
      margin-left: 0.1rem;
      margin-top: 0.1rem;
      border-radius: 0.1rem;
      position: relative;
      .gift__img {
        width: 1.2rem;
        height: 1.2rem;
        margin-left: 0.1rem;
        margin-top: 0.1rem;
      }
      .num__img {
        width: 0.6rem;
        height: 0.6rem;
        position: absolute;
        top: 0;
        right: 0;
      }
      .luck_value__box {
        width: 1.46rem;
        height: 1.46rem;
        background: url("../img/luck_value_bg.png");
        background-size: 100% 100%;
        margin-left: -0.03rem;
        margin-top: -0.03rem;
        position: relative;
        .imgs {
          white-space: nowrap;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 0.22rem;
          img:not(:first-child) {
            margin-left: -0.18rem;
          }
        }
        .value {
          height: 0.33rem;
          line-height: 0.33rem;
          font-size: 0.35rem;
          font-weight: 600;
          color: #ffffff;
          position: absolute;
          bottom: 0.23rem;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
        }
        .value_tip {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: -0.65rem;
          z-index: 50;
          white-space: nowrap;
          background: rgba(0, 0, 0, 0.8);
          height: 0.45rem;
          font-size: 0.32rem;
          font-weight: 400;
          line-height: 0.45rem;
          color: #ffffff;
          opacity: 1;
          padding: 0.1rem 0.3rem;
          border-radius: 0.325rem;
        }
        .value_tip::before {
          content: "";
          position: absolute;
          top: -0.3rem;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-width: 0.15rem;
          border-style: solid;
          border-color: transparent transparent rgba(0, 0, 0, 0.8) transparent;
        }
      }
    }
    .gift_tip__box {
      width: 5.82rem;
      //height: 2.76rem;
      background: rgba(0, 0, 0, 0.8);
      border-radius: 0.3rem;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      z-index: 50;
      box-sizing: border-box;
      padding: 0.3rem;
      .arrow {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-width: 0.19rem;
        border-style: solid;
      }
      .arrow_up {
        @extend .arrow;
        top: -0.38rem;
        border-color: transparent transparent rgba(0, 0, 0, 0.8) transparent;
      }
      .arrow_down {
        @extend .arrow;
        bottom: -0.38rem;
        border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
      }
      .tip_header__box {
        display: flex;
        align-items: center;
        .img__box {
          width: 1.4rem;
          height: 1.4rem;
          position: relative;
          margin-right: 0.3rem;
          .gift {
            width: 100%;
            height: 100%;
          }
          .num {
            width: 0.51rem;
            height: 0.51rem;
            position: absolute;
            top: 0;
            right: 0;
          }
        }
        .name {
          height: 0.45rem;
          font-size: 0.32rem;
          font-weight: 400;
          line-height: 0.45rem;
          color: #ffffff;
          opacity: 1;
        }
        .coin__box {
          display: flex;
          align-items: center;
          font-size: 0.24rem;
          font-weight: 400;
          color: #ffdd00;
          opacity: 1;
          height: 0.33rem;
          margin-top: 0.04rem;
          img {
            width: 0.3rem;
            height: 0.3rem;
            margin-right: 0.04rem;
          }
        }
      }
      .gift_des {
        margin-top: 0.2rem;
        font-size: 0.26rem;
        font-weight: 400;
        line-height: 0.37rem;
        color: #FFFFFF;
        opacity: 0.6;
        word-wrap: break-word;
        white-space: normal;
        word-break: break-all;
      }
    }
    .gift_tip__box_first {
      top: 1.5rem;
    }
    .gift_tip__box_second {
      top: 3rem;
    }
    .gift_tip__box_third {
      bottom: 1.5rem;
    }

    .active {
      background: url("../img/draw_gift_bg.png");
      background-size: 100% 100%;
    }
    .white_item {
      background-color: #b2bdff;
    }
  }
}
</style>