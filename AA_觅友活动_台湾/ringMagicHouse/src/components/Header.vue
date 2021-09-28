<template>
  <div class="header">
    <img class="header_img" :src="images.header_bg" />

    <!-- 右侧的按钮 -->
    <div class="rule" @click="showRuleAward = true">{{ lang.act_rule }}</div>
    <div class="act_mail" @click="showMail = true">
      {{ lang.act_mail_box }}
      <span v-if="initData.mailNew > 0" class="dot"></span>
    </div>

    <img v-if="showFullImg" class="ball_bottom" src="../img/engine_ring_2.png" />
    <img v-if="showFullImg" class="ball_top" src="../img/engine_ring_1.png" />
    <canvas v-if="showBallSvga" class="ball_svga" id="ballSvga"></canvas>

    <!-- 球上面的按钮 -->
    <img v-if="!energy.isAvailable" @click="jumpTask" class="get_engine_btn" :src="images.get_engine_btn" />
    <img v-else @click="handleStartMake" class="get_engine_btn" :src="images.make_btn" />

    <!-- 球上面的魔法能量和百分比 -->
    <img class="magic_engine_text" :src="images.magic_engine_text" />
    <div v-if="energy.rid" class="imgs" v-html="getImgs"></div>

    <!-- 制作戒指的动效 -->
    <canvas v-if="makeRing" class="makering" id="makering"></canvas>

    <!-- 三个戒指 -->
    <div :class="{
        ring__box1: item.index == 1,
        ring__box2: item.index == 2,
        ring__box3: item.index == 3,
      }" v-for="item in ringProgress" :key="item.index" @click="clickRing(item)">
      <img v-if="!item.received" :src="images[`ring_${item.index}`]" />
      <img v-else :src="images[`ring_own_${item.index}`]" />
    </div>

    <!-- 底部的文案 -->
    <div class="ball_engine_des" v-html="getBrHtml(lang.ball_engine_des)"></div>

    <RingDialog :visible.sync="showRing" :info="ringInfo" v-if="showRing" />

    <!-- 制作戒指的二次确认弹框 -->
    <MakeRingDialog :visible.sync="showMakeRing" :info="energy" v-if="showMakeRing" />

    <MailDialog :visible.sync="showMail" v-if="showMail" />

    <RuleAwardDialog :visible.sync="showRuleAward" v-if="showRuleAward" />

    <ScrollNotice />

    <!-- 合成戒指成功弹框 -->
    <GetRingDialog :visible.sync="showGetRing" :info="ringDialogInfo" v-if="showGetRing" />
  </div>
</template>

<script>
import RingDialog from "./RingDialog";
import MakeRingDialog from "./MakeRingDialog";
import MailDialog from "./MailDialog";
import RuleAwardDialog from "./RuleAwardDialog";
import ScrollNotice from "./ScrollNotice";
import GetRingDialog from '../components/GetRingDialog'
import { mapState, mapGetters } from "vuex";
import calcNumImg from "../utils/calcNumImg";
import { toast } from "../utils";
import { makingRings } from "../apis/index";
import { Downloader, Parser, Player } from "svga.lite";

export default {
  name: 'Header',

  components: {
    RingDialog,
    MakeRingDialog,
    MailDialog,
    RuleAwardDialog,
    ScrollNotice,
    GetRingDialog
  },

  data () {
    return {
      showRing: false,
      showMakeRing: false,
      showMail: false,
      ringInfo: {},
      showBallSvga: false,
      showRuleAward: false,
      showGetRing: false,
      showFullImg: false
    };
  },

  computed: {
    ...mapState(["initData", "loading", "makeRing", "ringDialogInfo"]),
    ...mapGetters(["ringProgress", "energy", "userInfo", "allRingsFinished"]),
    getImgs () {
      if (this.energy.rid) {
        let num = Math.floor(
          (this.energy.userEnergy / this.energy.recentTotalEnergy) * 100
        );
        num = num > 100 ? 100 : num
        this.showBallSvga = false
        if (num <= 100) {
          this.$nextTick(() => {
            this.handleBallSvga(num);
          })
        }
        return calcNumImg(num);
      }
    }
  },

  watch: {
    makeRing (val) {
      if (val) {
        this.$nextTick(() => {
          this.handleSvga();
        })
      }
    },
    allRingsFinished: {
      handler (val) {
        if (val.totalEnergy) {
          this.showFullImg = true
        }
      },
      deep: true,
      immediate: true
    }
  },

  mounted () {
    // this.$store.commit('makeRing', true)
  },

  methods: {
    async handleSvga () {
      const downloader = new Downloader();
      const parser = new Parser({ disableWorker: !("Worker" in window) });
      let player = new Player("#makering");
      const fileData = await downloader.get(
        "//fstatic.cat1314.com/uc/svga/99f9261b9a7bead91c4edae40e7bb854_1611138288.svga"
      );
      let svgaData1 = await parser.do(fileData);
      player.set({
        loop: 1,
      });
      await player.mount(svgaData1);
      player.$on("end", () => {
        this.$store.commit("makeRing", false);
        this.$nextTick(() => {
          this.showGetRing = true
          console.log('showGetRing=>', this.showGetRing)
          this.$store.dispatch("initData");
          player.destroy()
        })
      });
      player.start();
    },

    async handleBallSvga (num = 0) {
      this.showBallSvga = true
      this.$nextTick(async () => {
        let url = "";
        if (num >= 0 && num < 20) {
          url = "//fstatic.cat1314.com/uc/svga/05b1917f3e142dacf4fca56d9ebeff14_1611222498.svga";
        } else if (num >= 20 && num < 40) {
          url = "//fstatic.cat1314.com/uc/svga/529244cd6f2d282bfe1cff11c0b52d9d_1611222519.svga";
        } else if (num >= 40 && num < 60) {
          url = "//fstatic.cat1314.com/uc/svga/5fb0c4511fd2c76d058ede3c67bb7531_1611222538.svga";
        } else if (num >= 60 && num < 80) {
          url = "//fstatic.cat1314.com/uc/svga/cb10e0f8b25dd0cd7542c3a3bdafff5e_1611222566.svga";
        } else if (num >= 80 && num <= 100) {
          url = "//fstatic.cat1314.com/uc/svga/eb94e5f8cecc569ad5141e890c05a945_1611222598.svga";
        }
        const downloader = new Downloader();
        const parser = new Parser({ disableWorker: !("Worker" in window) });
        let player = new Player("#ballSvga");
        const fileData = await downloader.get(url);
        let svgaData1 = await parser.do(fileData);
        player.set({
          loop: 0,
        });
        await player.mount(svgaData1);
        player.start();
      })
    },

    async handleStartMake () {
      let res = await makingRings({ rid: this.energy.rid });
      let { response_status, response_data } = res.data;
      if (response_status.code === 0) {
        // 把返回的数据保存到vuex，在动效完成之后弹出一个制作成功的框
        this.$store.commit('setRingDialogInfo', response_data)
        this.$store.commit('makeRing', true)
      } else {
        toast(response_status.error);
      }
    },

    clickRing (item) {
      this.ringInfo = item;
      this.showRing = true;
    },

    jumpTask () {
      if (!this.userInfo.cp_uid) {
        toast(this.lang.cp_can_get_engine);
        return;
      }
      this.$store.commit("changeCurrentTab", 0);
      window.scrollTo(0, document.body.scrollHeight);
    },

    getBrHtml (text) {
      if (!text) {
        return;
      }
      return text.replace(/\n/g, "<br>");
    },
  },
};
</script>

<style lang="scss">
.header {
  width: 7.5rem;
  height: 9.3rem;
  // background-image: url("../img/header_bg.png");
  // background-repeat: no-repeat;
  // background-size: 100% 100%;
  position: relative;
  .header_img {
    width: 100%;
    height: 100%;
  }
  .rule {
    width: 1.43rem;
    height: 0.53rem;
    background: url('../img/act_rule_btn.png') 0/100% 100% no-repeat;
    position: absolute;
    right: 0;
    top: 0.67rem;
    line-height: 0.53rem;
    text-align: right;
    font-size: 0.22rem;
    font-weight: 500;
    color: #fff3a4;
    box-sizing: border-box;
    padding-right: 0.1rem;
  }
  .act_mail {
    width: 1.43rem;
    height: 0.53rem;
    background: url('../img/act_rule_btn.png') 0/100% 100% no-repeat;
    position: absolute;
    right: 0;
    top: 1.31rem;
    line-height: 0.53rem;
    text-align: right;
    font-size: 0.2rem;
    font-weight: 500;
    color: #fff3a4;
    box-sizing: border-box;
    padding-right: 0.1rem;
    .dot {
      display: block;
      width: 0.15rem;
      height: 0.15rem;
      background: red;
      border-radius: 50%;
      position: absolute;
      top: 0.02rem;
      right: 0.05rem;
    }
  }
  .ball_bottom {
    width: 3.8rem;
    height: 3.82rem;
    position: absolute;
    bottom: 0.8rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
  }
  .ball_top {
    width: 3.34rem;
    height: 3.34rem;
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 30;
  }
  .ball_svga {
    width: 3.8rem;
    height: 3.82rem;
    position: absolute;
    bottom: 0.8rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
  }

  .get_engine_btn {
    width: 3.3rem;
    height: 1.33rem;
    position: absolute;
    bottom: 0.9rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 30;
  }

  .ball_engine_des {
    width: 6.27rem;
    height: 0.78rem;
    background: url('../img/ball_bottom_des_bg.png') 0/100% 100% no-repeat;
    position: absolute;
    bottom: 0.22rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 0.22rem;
    font-weight: 300;
    color: #ffefbf;
  }

  .magic_engine_text {
    width: 1.27rem;
    height: 0.33rem;
    position: absolute;
    bottom: 2.83rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 40;
  }

  .makering {
    width: 3.8rem;
    height: 3.82rem;
    position: absolute;
    bottom: 0.8rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
  }

  .imgs {
    position: absolute;
    bottom: 2.23rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 40;
    white-space: nowrap;
  }

  .ring {
    width: 1.9rem;
    height: 1.9rem;
    position: absolute;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .ring__box1 {
    @extend .ring;
    left: 0.96rem;
    top: 3.58rem;
  }
  .ring__box2 {
    @extend .ring;
    left: 4.66rem;
    top: 3.58rem;
  }
  .ring__box3 {
    @extend .ring;
    left: 2.82rem;
    top: 2.82rem;
  }
}
</style>