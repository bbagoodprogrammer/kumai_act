<template>
  <div class="header">
    <!-- 右侧的按钮 -->
    <div class="rule" @click="showRuleDialog = true">{{ lang.act_rule }}</div>
    <div class="act_mail" @click="showRecordDialog = true">
      {{ lang.feed_record }}
    </div>
    <div
      class="title__box"
      :style="{
        background: `url(${images.act_title})`,
        backgroundSize: '100% 100%',
      }"
    >
      <div class="user_duck" v-html="getUserDuckNick"></div>
    </div>
    <div class="award__box">
      <div class="left">
        <div class="title">{{ lang.duck_happy_value }}</div>
        <div class="value">{{ initData.feedCount }}/{{ getTotalScore }}</div>
      </div>
      <div class="right">
        <div class="liner">
          <img v-if="processWidth" src="../img/process_left.png" />
          <div :style="{ width: processWidth }" class="process__main"></div>
          <img v-if="processWidth" src="../img/process_right.png" />
        </div>
        <div
          :class="{
            gift1: item.index == 1,
            gift2: item.index == 2,
            gift3: item.index == 3,
          }"
          v-for="item in initData.stage"
          :key="item.index"
          @click="receiveAward(item)"
        >
          <div
            v-if="item.receive == 0 || item.receive == 1"
            class="gift__img__box"
          >
            <img
              class="gift__img"
              :class="{ gift__ani: item.receive == 1 }"
              :src="require(`../img/gift_${item.index}.png`)"
            />
          </div>
          <img
            v-else
            class="gift_received__img"
            :src="require(`../img/gift_received_${item.index}.png`)"
          />
          <div
            class="title"
            v-html="getBrHtml(lang[`gift_title_${item.index}`])"
          ></div>
        </div>
      </div>
    </div>

    <div class="duck_toast" v-if="toastType">
      <div class="toast">{{ lang[`toast_${toastType}`] }}</div>
    </div>

    <!-- 鸭子动效 -->
    <canvas
      v-show="svgaType == 1"
      @click="handleDuck"
      class="duck__svga"
      id="duck1"
    ></canvas>
    <canvas v-show="svgaType == 2" class="duck__svga" id="duck2"></canvas>
    <canvas v-show="svgaType == 3" class="duck__svga" id="duck3"></canvas>
    <div class="duck_shadow"></div>

    <div class="my_coin">
      {{ lang.my_coin.replace("%s", initData.coin || 0) }}
    </div>
    <div class="feed__action">
      <img @click="handleFeed(1)" :src="images.feed1" />
      <img @click="handleFeed(10)" :src="images.feed10" />
    </div>

    <AwardDialog
      :visible.sync="showAwardDialog"
      :prizes="prizes"
      :type="type"
      v-if="showAwardDialog"
    />

    <RecordDialog :visible.sync="showRecordDialog" v-if="showRecordDialog" />

    <RuleDialog :visible.sync="showRuleDialog" v-if="showRuleDialog" />

    <ScrollNotice />
  </div>
</template>

<script>
import { toast } from "../utils";
import callApp from "../utils/callApp";
import { openStageGift, feed } from "../apis/index";
import AwardDialog from "./AwardDialog";
import RecordDialog from "./RecordDialog";
import RuleDialog from "./RuleDialog";
import ScrollNotice from "./ScrollNotice";
import { Downloader, Parser, Player } from "svga.lite";
import { mapState, mapGetters } from "vuex";

export default {
  name: "Header",

  components: {
    AwardDialog,
    RecordDialog,
    RuleDialog,
    ScrollNotice,
  },

  data() {
    return {
      type: 1,
      prizes: [],
      showAwardDialog: false,
      showRecordDialog: false,
      showRuleDialog: false,
      svgaType: 1,
      svgaData1: null,
      svgaData2: null,
      svgaData3: null,
      toastType: 0,
    };
  },

  computed: {
    ...mapState(["initData"]),
    ...mapGetters(["userRanking"]),
    getUserDuckNick() {
      return this.lang.user_duck.replace(
        "%s",
        `<span class="nick">${this.userRanking.nick || ""}</span>`
      );
    },
    getTotalScore() {
      if (this.initData.stage[2]) {
        return this.initData.stage[2].score;
      }
      return "";
    },
    processWidth() {
      let score = +this.initData.feedCount || 0;

      let arr = this.initData.stage || [];
      if (!Array.isArray(arr) || (Array.isArray(arr) && arr.length == 0)) {
        return "";
      }
      const maxScore = arr[arr.length - 1].score;
      const minScore = arr[0].score;
      for (let i = arr.length - 1; i >= 0; i--) {
        if (score >= maxScore) {
          return "100%";
        } else if (score < minScore) {
          if (score == 0) {
            return ''
          }
          let c = minScore;
          let t = score 
          let a = (t / c) * (1.61);
          return (a - 0.26) + 'rem'
        } else if (score >= arr[i].score) {
          let c = arr[i+1].score - arr[i].score;
          let t = score - arr[i].score;
          let a = (t / c) * (1.61);
          return (1.61 * (i+1) + a - 0.26) + 'rem' ;
        }
      }
    },
  },

  mounted() {
    this.fetchSvgaData();

    setTimeout(() => {
      this.toastType = 0;
    }, 2500);
  },

  methods: {
    async fetchSvgaData() {
      const downloader = new Downloader();
      const parser = new Parser({ disableWorker: !("Worker" in window) });

      const fileData1 = await downloader.get(
        "//fstatic.cat1314.com/uc/svga/7da6629056bb53eccc7b34cdc4d7d47f_1611568423.svga"
      );
      this.svgaData1 = await parser.do(fileData1);
      let player1 = new Player("#duck1");
      player1.set({
        loop: 0,
      });
      await player1.mount(this.svgaData1);
      player1.start();
      this.toastType = Math.ceil(Math.random() * 12) || 1;

      const fileData2 = await downloader.get(
        "//fstatic.cat1314.com/uc/svga/b812901a3f562c72d05eb3bc3c2fffdf_1611714556.svga"
      );
      this.svgaData2 = await parser.do(fileData2);

      const fileData3 = await downloader.get(
        "//fstatic.cat1314.com/uc/svga/6d1c8ece68c28e66b67de74672882486_1611719515.svga"
      );
      this.svgaData3 = await parser.do(fileData3);
    },

    async receiveAward(item) {
      if (item.receive == 1) {
        let res = await openStageGift({ index: item.index });
        let { response_status, response_data } = res.data;
        if (response_status.code === 0) {
          let name = this.lang[`gift_title_${item.index}`].replace("\n", "-");
          toast(this.lang.step_award_succ.replace("%s", name));
          item.receive = 2;
        } else {
          toast(response_status.error);
        }
      }
    },

    async handleFeed(num) {
      let res = await feed({ price: num });
      let { response_status, response_data } = res.data;
      if (response_status.code === 0) {
        toast(
          this.lang.use_coin_feed.replace("%s", num * window._coinConfig),
          0
        );
        this.$store.commit("changeCoin", num * window._coinConfig);
        let player3 = new Player("#duck3");
        player3.set({
          loop: 1,
        });
        player3.$on("end", () => {
          this.svgaType = 1;
          response_data.prizes.forEach((item) => {
            if (item.type == "frame") {
              item.name =
                item.name + this.lang.frame_day.replace("%s", item.day);
            }
            if (item.type == "car") {
              item.name = item.name + this.lang.car_day.replace("%s", item.day);
            }
            if (item.type == "gift") {
              item.name =
                item.name + this.lang.gift_day.replace("%s", item.day);
            }
            if (item.type == "coin") {
              item.image = require("../img/coin.png");
              item.name = this.lang.coin.replace("%s", item.count);
            }
            if (item.type == "bean") {
              item.name = this.lang.bean.replace("%s", item.count);
              item.image = require("../img/bean.png");
            }
          });
          this.prizes = response_data.prizes;
          this.type = response_data.price;
          this.showAwardDialog = true;
        });
        await player3.mount(this.svgaData3);
        player3.start();
        this.svgaType = 3;
      } else if (response_status.code == 30001) {
        toast(response_status.error);
        setTimeout(() => {
          callApp.wallet();
        }, 500);
      } else {
        toast(response_status.error);
      }
    },

    // 点击鸭子出现动作
    async handleDuck() {
      let player2 = new Player("#duck2");
      player2.set({
        loop: 1,
      });
      player2.$on("end", () => {
        this.toastType = 0;
        this.svgaType = 1;
      });
      await player2.mount(this.svgaData2);
      player2.start();

      this.toastType = Math.ceil(Math.random() * 12) || 1;
      this.svgaType = 2;
    },

    getBrHtml(text) {
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
  height: 14.98rem;
  background-image: url("../img/header_bg.png");
  background-size: 100% 100%;
  position: relative;
  box-sizing: border-box;
  padding-top: 0.37rem;
  overflow: hidden;
  .rule {
    width: 1.66rem;
    height: 0.6rem;
    background: url("../img/act_rule_btn.png") 0/100% 100% no-repeat;
    position: absolute;
    right: 0;
    top: 5.33rem;
    line-height: 0.6rem;
    text-align: center;
    font-size: 0.26rem;
    font-weight: 400;
    color: #854003;
    box-sizing: border-box;
  }
  .act_mail {
    width: 1.66rem;
    height: 0.6rem;
    background: url("../img/act_rule_btn.png") 0/100% 100% no-repeat;
    position: absolute;
    right: 0;
    top: 5.98rem;
    line-height: 0.6rem;
    text-align: center;
    font-size: 0.26rem;
    font-weight: 400;
    color: #854003;
  }

  .title__box {
    width: 6.21rem;
    height: 3.04rem;
    margin: 0 auto;
    position: relative;
    .user_duck {
      width: 2.4rem;
      height: 0.4rem;
      font-size: 0.26rem;
      font-weight: 400;
      color: #ffffff;
      position: absolute;
      bottom: 0.15rem;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      .nick {
        max-width: 1.5rem;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }

  .award__box {
    width: 7.5rem;
    display: flex;
    justify-content: center;
    position: relative;
    margin-top: 0.6rem;
    .left {
      margin-right: 0.2rem;
      .title {
        height: 0.24rem;
        line-height: 0.24rem;
        font-size: 0.24rem;
        font-weight: 400;
        color: #ffffff;
        text-align: center;
      }
      .value {
        height: 0.24rem;
        line-height: 0.24rem;
        font-size: 0.24rem;
        font-weight: 400;
        color: #ffffff;
        text-align: center;
        padding-top: 0.09rem;
      }
    }
    .right {
      width: 4.83rem;
      position: relative;
      height: 0.31rem;
      .liner {
        width: 4.83rem;
        height: 0.31rem;
        background: url("../img/liner.png") 0/100% 100% no-repeat;
        display: flex;
        align-items: center;
        img {
          width: 0.13rem;
          height: 0.31rem;
        }
        .process__main {
          height: 0.31rem;
          background: url("../img/process_main.png");
        }
      }
      .gift {
        width: 0.5rem;
        height: 0.5rem;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        margin-left: -0.5rem;
        .title {
          height: 0.2rem;
          line-height: 0.26rem;
          position: absolute;
          white-space: nowrap;
          left: 50%;
          transform: translateX(-50%);
          bottom: -0.4rem;
          font-size: 0.2rem;
          font-weight: 400;
          color: #ffffff;
          text-align: center;
        }
        .gift__img {
          width: 0.67rem;
          height: 0.67rem;
        }
        .gift__img__box {
          width: 0.67rem;
          height: 0.67rem;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .gift__ani {
          animation: giftAni 1.3s infinite;
        }
        @keyframes giftAni {
          0% {
            transform: scale(0.9);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(0.9);
          }
        }
        .gift_received__img {
          width: 1.68rem;
          height: 1.6rem;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .gift1 {
        @extend .gift;
        left: 1.61rem;
      }
      .gift2 {
        @extend .gift;
        left: 3.22rem;
      }
      .gift3 {
        @extend .gift;
        left: 4.83rem;
      }
    }
  }

  .duck_toast {
    width: 2.95rem;
    height: 1.08rem;
    background: url("../img/toast.png") 0/100% 100% no-repeat;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 5.3rem;
    .toast {
      width: 100%;
      height: 0.85rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.24rem;
      font-weight: 400;
      color: RGBA(96, 46, 14, 1);
      text-align: center;
    }
  }
  .duck__svga {
    max-width: 7.5rem;
    height: 5.21rem;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    top: 1.63rem;
    z-index: 10;
  }
  .duck_shadow {
    width: 2.67rem;
    height: 0.44rem;
    background: #5f932f;
    opacity: 0.67;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 3.45rem;
    z-index: 0;
  }
  .my_coin {
    text-align: center;
    height: 0.3rem;
    font-size: 0.3rem;
    font-weight: 400;
    color: #ffffff;
    line-height: 0.31rem;
    margin-top: 1.9rem;
  }

  .feed__action {
    margin-top: 0.2rem;
    text-align: center;
    img {
      width: 3.33rem;
      height: 1.17rem;
    }
  }
}
</style>