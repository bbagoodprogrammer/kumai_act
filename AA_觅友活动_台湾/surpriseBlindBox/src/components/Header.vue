<template>
  <div class="header">
    <img class="header_title" :src="images.header_title" alt="" />

    <!-- 右侧的按钮 -->
    <div class="rule" @click="showRuleDialog = true">{{ lang.act_rule }}</div>
    <div class="record_btn" @click="showRecordDialog = true">
      {{ lang.record }}
      <span v-if="initData.notOpenBlindBox > 0" class="dot"></span>
    </div>

    <div class="surprise__box">
      <div class="series__box">{{ getSeriesTitle }}</div>
      <ul class="box__main">
        <li v-for="(item, index) in list" :key="index" @click="handleSelect(index)">
          <div class="select__btn" :class="{ selected: item.state }">
            {{ lang.select }}
          </div>
          <img v-if="item.state" class="select__bg" src="../img/select_bg.png" />
        </li>
      </ul>
      <div class="hidn__box">
        <img src="../img/horn.png" alt="" />
        <span>{{
          lang.hidn_num
            .replace("{0}", rareGiftSurplusData[0].name)
            .replace("{1}", rareGiftSurplusData[0].surplus)
        }}</span>
      </div>
      <img v-if="!isAllSelect" class="all_select__img" @click="handleAllSelect(true)" :src="images.all_select" />
      <img v-else class="all_select__img" @click="handleAllSelect(false)" :src="images.cancel_all_select" />
    </div>

    <div class="surprise__box_bottom">
      <div class="feed__action">
        <img :src="images.send_friend" @click="handleSendFriend" />
        <img :src="images.send_me" @click="handleSendMe" />
      </div>
      <div class="coin__box" @click="goWallet">
        <img src="../img/coin.png" alt="" />
        {{ initData.coin }}
      </div>
    </div>

    <FriendDialog :visible.sync="showFriendDialog" v-if="showFriendDialog" :type="sendType" :count="sendCount" :id="boxIndex" />

    <ScrollNotice />

    <ComfirmDialog :visible.sync="showComfirmDialog" v-if="showComfirmDialog" :type="sendType" :count="sendCount" @handlePurchase="handlePurchase" />

    <GetDialog :visible.sync="showGetDialog" v-if="showGetDialog" :prizes="prizes" />

    <SvgaDialog :visible.sync="showSvgaDialog" v-if="showSvgaDialog" :index="boxIndex" @end="showGetDialog = true" />

    <RecordDialog @startSvga="startSvga" :visible.sync="showRecordDialog" v-if="showRecordDialog" ref="record" />

    <RuleDialog :visible.sync="showRuleDialog" v-if="showRuleDialog" />

    <div class="give_succ" v-if="showSuccDialog">
      <div class="screen" @click="showSuccDialog = false"></div>
      <div class="main">
        <span class="des" v-html="getBrHtml(lang.give_succ_des)"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { purchaseBlindBox } from "../apis/index";
import FriendDialog from "./FriendDialog";
import ComfirmDialog from "./ComfirmDialog";
import GetDialog from "./GetDialog";
import SvgaDialog from "./SvgaDialog";
import RecordDialog from "./RecordDialog";
import RuleDialog from './RuleDialog'
import ScrollNotice from './ScrollNotice'
import { toast } from "../utils";
import callApp from "../utils/callApp";
import { mapState, mapGetters } from "vuex";

export default {
  name: "Header",

  components: {
    FriendDialog,
    ComfirmDialog,
    GetDialog,
    SvgaDialog,
    RecordDialog,
    RuleDialog,
    ScrollNotice
  },

  data () {
    return {
      showRecordDialog: false,
      showRuleDialog: false,
      showFriendDialog: false,
      showComfirmDialog: false,
      showGetDialog: false,
      showSvgaDialog: false,
      showSuccDialog: false,
      sendType: "",
      sendCount: 0,
      list: [
        { state: true },
        { state: false },
        { state: false },
        { state: false },
        { state: false },
        { state: false },
        { state: false },
        { state: false },
        { state: false },
      ],
      isAllSelect: false,
      boxIndex: 0,
      prizes: [],
    };
  },

  watch: {
    showSuccDialog (val) {
      if (val) {
        setTimeout(() => {
          this.showSuccDialog = false;
          this.$store.dispatch("initData");
        }, 2000);
      }
    },
  },

  computed: {
    ...mapState(["initData"]),
    ...mapGetters(["rareGiftSurplusData"]),
    getSeriesTitle () {
      if (this.initData.currentSeries) {
        let seriesItem = this.initData.series.find(item => item.key == this.initData.currentSeries)
        return seriesItem && seriesItem.name
      }
      return ''
    }
  },

  methods: {
    goWallet () {
      callApp.wallet();
    },

    handleSelect (i) {
      if (this.isAllSelect) {
        return;
      }
      this.list.forEach((item) => {
        item.state = false;
      });
      this.$set(this.list, i, { state: true });
      this.boxIndex = i;
    },

    handleAllSelect (is_all) {
      if (is_all) {
        this.list.forEach((item) => {
          item.state = true;
        });
      } else {
        this.list.forEach((item) => {
          item.state = false;
        });
        this.$set(this.list, 0, { state: true });
      }
      this.isAllSelect = is_all;
    },

    handleSendMe () {
      if (this.initData.step == 2) {
        toast(this.lang.act_ended)
        return
      }
      // 判断金币是否足够
      let cost = (this.isAllSelect ? 9 : 1) * this.initData.price;
      if (cost > this.initData.coin) {
        toast(this.lang.not_enough_coin);
        setTimeout(() => {
          this.goWallet();
        }, 1500);
        return;
      }

      if (this.initData.firstGiveOwn) {
        this.sendType = "me";
        if (this.isAllSelect) {
          this.sendCount = 9;
        } else {
          this.sendCount = 1;
        }
        this.showComfirmDialog = true;
      } else {
        this.handlePurchase();
      }
    },

    handleSendFriend () {
      console.log(_app)
      if (this.initData.step == 2) {
        toast(this.lang.act_ended)
        return
      }
      // 判断金币是否足够
      let cost = (this.isAllSelect ? 9 : 1) * this.initData.price;
      if (cost > this.initData.coin) {
        toast(this.lang.not_enough_coin);
        setTimeout(() => {
          this.goWallet();
        }, 1500);
        return;
      }
      if (_app == 'alochat') {
        toast(this.lang.alochat_tips);
      } else {
        this.sendType = "friend";
        if (this.isAllSelect) {
          this.sendCount = 9;
        } else {
          this.sendCount = 1;
        }
        this.showFriendDialog = true;
      }

    },

    async handlePurchase () {
      let data = {
        count: this.isAllSelect ? 9 : 1,
        id: this.isAllSelect ? 0 : this.boxIndex + 1,
      };
      let res = await purchaseBlindBox(data);
      let { response_status, response_data } = res.data;
      if (response_status.code === 0) {
        this.prizes = response_data.prizes;
        toast(this.lang.purchase_succ, 0);
        setTimeout(() => {
          this.showSvgaDialog = true;
        }, 1000);
      } else {
        toast(response_status.error);
      }
    },

    startSvga (prizes) {
      console.log('p', prizes)
      this.prizes = prizes;
      this.showSvgaDialog = true;
    },

    goNotOpenDialog () {
      this.showRecordDialog = true
      this.$nextTick(() => {
        this.$refs.record.tab = 2
      })
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
  height: 14.04rem;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  background: url('../img/header.png') 0/100% 100% no-repeat;
  .header_title {
    width: 5.13rem;
    height: 1.74rem;
    position: absolute;
    top: 0.56rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 20;
  }

  .btn_right {
    width: 1.5rem;
    height: 0.47rem;
    position: absolute;
    right: 0;
    font-size: 0.24rem;
    font-weight: 400;
    color: #ffffff;
    box-sizing: border-box;
    z-index: 10;
    text-align: center;
    line-height: 0.47rem;
  }
  .rule {
    @extend .btn_right;
    top: 2.54rem;
    background: url('../img/rule_btn.png') 0/100% 100% no-repeat;
  }
  .record_btn {
    @extend .btn_right;
    top: 3.13rem;
    background: url('../img/record_btn.png') 0/100% 100% no-repeat;
    .dot {
      display: block;
      width: 0.15rem;
      height: 0.15rem;
      background: red;
      border-radius: 50%;
      position: absolute;
      right: 0.08rem;
      top: 0.05rem;
    }
  }

  .surprise__box {
    width: 7.17rem;
    height: 8.84rem;
    background: url('../img/header_surprise_box.png') 0/100% 100% no-repeat;
    position: absolute;
    top: 1.92rem;
    left: 50%;
    transform: translateX(-50%);
    .series__box {
      width: 1.98rem;
      height: 0.52rem;
      background: url('../img/series_box.png') 0/100% 100% no-repeat;
      position: absolute;
      top: 0.4rem;
      left: 50%;
      transform: translateX(-50%);
      line-height: 0.52rem;
      text-align: center;
      font-size: 0.28rem;
      font-weight: 400;
      color: #ffffff;
    }
    .box__main {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      padding-top: 0.7rem;
      li:nth-child(1),
      li:nth-child(5),
      li:nth-child(7) {
        background: url('../img/sur_box_2.png') 0/100% 100% no-repeat;
      }
      li:nth-child(2),
      li:nth-child(6),
      li:nth-child(8) {
        background: url('../img/sur_box_3.png') 0/100% 100% no-repeat;
      }
      li {
        width: 1.03rem;
        height: 1.56rem;
        background: url('../img/sur_box_1.png') 0/100% 100% no-repeat;
        margin-left: 0.3rem;
        margin-right: 0.3rem;
        margin-top: 0.65rem;
        position: relative;
        .select__btn {
          width: 1.16rem;
          height: 0.36rem;
          background: url('../img/select.png') 0/100% 100% no-repeat;
          position: absolute;
          bottom: -0.42rem;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.26rem;
          font-weight: 400;
          color: #ffffff;
          text-align: center;
          line-height: 0.36rem;
          z-index: 20;
        }
        .selected {
          background: url('../img/selected.png') 0/100% 100% no-repeat;
        }
        .select__bg {
          width: 2.08rem;
          height: 2.23rem;
          position: absolute;
          bottom: -0.05rem;
          left: 50%;
          transform: translateX(-50%-1);
        }
      }
    }
    .hidn__box {
      width: 5.52rem;
      height: 0.42rem;
      background: url('../img/rate_num_box.png') 0/100% 100% no-repeat;
      position: absolute;
      bottom: 0.17rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 0.18rem;
        height: 0.18rem;
        left: 0.24rem;
        top: 0.12rem;
        position: absolute;
      }
      span {
        //margin-left: 0.4rem;
        font-size: 0.2rem;
        font-weight: 400;
        color: #f09eef;
        line-height: 0.42rem;
      }
    }
    .all_select__img {
      width: 1.23rem;
      height: 1.23rem;
      top: 5.5rem;
      right: 0.05rem;
      position: absolute;
    }
  }

  .surprise__box_bottom {
    width: 7.3rem;
    height: 1.75rem;
    background: url('../img/surprise_box_bottom.png') 0/100% 100% no-repeat;
    position: absolute;
    top: 10.74rem;
    left: 0.08rem;
    .feed__action {
      width: 100%;
      text-align: center;
      img {
        width: 2.36rem;
        height: 1.26rem;
        margin-left: 0.35rem;
        margin-right: 0.35rem;
      }
    }
    .coin__box {
      width: 2.32rem;
      height: 0.49rem;
      background: url('../img/coin_box.png') 0/100% 100% no-repeat;
      position: absolute;
      bottom: -0.05rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.26rem;
      font-weight: 600;
      color: #ffffff;
      line-height: 0.31rem;
      z-index: 60;
      img {
        width: 0.3rem;
        height: 0.3rem;
        margin-right: 0.1rem;
      }
    }
  }

  .give_succ {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    .screen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: black;
      opacity: 0.7;
      z-index: 1000;
    }
    .main {
      width: 5.41rem;
      height: 2.54rem;
      background: url('../img/give_succ_box.png') 0/100% 100% no-repeat;
      position: fixed;
      top: 0;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 1000;
      opacity: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      .des {
        display: block;
        text-align: center;
        font-size: 0.28rem;
        font-weight: 400;
        color: #ffffff;
        line-height: 0.33rem;
      }
    }
  }
}
</style>