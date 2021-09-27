<template>
  <div
    class="home__container"
    :class="{
      home_padding: initData.step != 0 && initData.userRanking.ranking,
    }"
  >
    <div class="header">
      <div class="rule" @click="showRuleDialog = true">{{ lang.rule }}</div>
      <div class="play_library" @click="showPlayDialog = true">
        {{ lang.play_library }}
      </div>
      <img class="award__img" src="../assets/images/award_img.png" />
    </div>
    <div class="award__box">
      <div class="title__box">
        <div class="title">{{ lang.homeowners_award }}</div>
      </div>
      <div class="award">
        <div class="award__item" v-for="item in 3" :key="item">
          <div class="item__img">
            <img :src="require(`../assets/images/homeowners_award_${item}.png`)" />
          </div>
          <div class="name">{{ lang[`homeowners_award_${item}`] }}</div>
        </div>
      </div>
      <div class="title__box fan_title">
        <div class="title">{{ lang.fan_award }}</div>
      </div>
      <div class="award">
        <div class="award__item" v-for="item in 4" :key="item">
          <div class="item__img">
            <img :src="require(`../assets/images/fan_award_${item}.png`)" />
          </div>
          <div class="name">{{ lang[`fan_award_${item}`] }}</div>
        </div>
      </div>
    </div>
    <div class="room_list_title">
      <div class="time__box">
        <div class="num">{{ downTime.day }}</div>
        <div class="text">{{ lang.day }}</div>
        <div class="num">{{ downTime.hour }}</div>
        <div class="text">{{ lang.hour }}</div>
        <div class="num">{{ downTime.minute }}</div>
        <div class="text">{{ lang.minute }}</div>
        <div class="num">{{ downTime.second }}</div>
        <div class="text">{{ lang.second }}</div>
      </div>
    </div>
    <RankGroups />
    <SignUp />
    <RuleDialog v-if="showRuleDialog" :visible.sync="showRuleDialog" />
    <PlayDialog v-if="showPlayDialog" :visible.sync="showPlayDialog" />
    <Loading :show="loading" />
  </div>
</template>

<script>
import RuleDialog from "../components/RuleDialog.vue";
import PlayDialog from "../components/PlayDialog.vue";
import RankGroups from "../components/RankGroups";
import SignUp from "../components/SignUp";
import Loading from "../components/common/Loading";
import lang from "../config/lang";
import { loadImages } from "../utils";
import downTime from "../utils/downTime";
import { mapState } from "vuex";

export default {
  name: "Home",

  components: {
    RuleDialog,
    PlayDialog,
    RankGroups,
    SignUp,
    Loading,
  },

  data() {
    return {
      showRuleDialog: false,
      showPlayDialog: false,
      downTime: {},
    };
  },

  computed: {
    lang: () => lang,
    ...mapState(["initData", "loading"]),
  },

  watch: {
    initData: {
      handler(val) {
        if (val.downTime) {
          this.handleCountTime(val.downTime);
        }
      },
      deep: true,
      immediate: true,
    },
  },

  created() {
    this.$store.dispatch("initData");
  },

  mounted() {
    loadImages(
      require("../assets/images/contribute_list_bg.png"),
      require("../assets/images/play_dialog_bg.png"),
      require("../assets/images/rule_dialog_bg.png")
    );
  },

  methods: {
    handleCountTime(diffTime) {
      const timeKey = "fullfire";
      if (downTime(timeKey) == null) {
        downTime(timeKey, diffTime);
      }
      if (downTime(timeKey).end) {
        this.downTime = downTime(timeKey);
      } else {
        clearInterval(this.timer);
        let fn = () => {
          this.downTime = downTime(timeKey);
          // console.log(JSON.stringify(this.downTime))
          // if (this.downTime.end) {
          //   clearInterval(this.timer)
          //   location.reload();
          // }
        };
        fn();
        this.timer = setInterval(fn, 1000);
      }
    },
  },
};
</script>

<style lang="scss">
.home_padding {
  padding-bottom: 170px;
}
.home__container {
  background: rgba(0, 1, 52, 1);
  min-height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  .header {
    width: 750px;
    height: 827px;
    background-image: url("../assets/images/header_bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    .rule {
      width: 171px;
      height: 54px;
      background-image: url("../assets/images/rule_btn.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      text-align: center;
      position: absolute;
      right: 0px;
      top: 337px;
      font-size: 24px;
      font-weight: 400;
      color: #ffffff;
      line-height: 54px;
      text-stroke: 2px #3335c3;
    }
    .play_library {
      width: 195px;
      height: 54px;
      background-image: url("../assets/images/play_library_btn.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      text-align: center;
      position: absolute;
      right: 0px;
      top: 402px;
      font-size: 24px;
      font-weight: 400;
      color: #ffffff;
      line-height: 54px;
      text-stroke: 2px #3335c3;
    }
    .award__img {
      width: 680px;
      height: 97px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -53px;
    }
  }
  .award__box {
    width: 742px;
    height: 574px;
    background-image: url("../assets/images/award_bg.png");
    background-size: 100% 100%;
    margin: 50px auto 0 auto;
    position: relative;
    padding-top: 39px;
    box-sizing: border-box;
    .title__box {
      height: 25px;
    }
    .title {
      min-width: 104px;
      display: inline-block;
      height: 25px;
      font-size: 26px;
      font-weight: bold;
      color: #f7aad2;
      line-height: 25px;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
    .title::before {
      content: "";
      width: 147px;
      height: 13px;
      position: absolute;
      left: -158px;
      background-image: url("../assets/images/award_title_left.png");
      background-size: 100% 100%;
      top: 50%;
      transform: translateY(-50%);
    }
    .title::after {
      content: "";
      width: 147px;
      height: 13px;
      position: absolute;
      right: -158px;
      background-image: url("../assets/images/award_title_right.png");
      background-size: 100% 100%;
      top: 50%;
      transform: translateY(-50%);
    }
    .award {
      display: flex;
      justify-content: center;
      margin-top: 25px;
      .award__item {
        width: 163px;
        display: flex;
        flex-direction: column;
        // justify-content: center;
        align-items: center;
        .item__img {
          width: 133px;
          height: 141px;
          background-image: url("../assets/images/award_item_bg.png");
          background-size: 100% 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 107px;
            height: 103px;
          }
        }
        .name {
          height: 22px;
          line-height: 22px;
          font-size: 22px;
          font-weight: 400;
          color: #ffffff;
          text-align: center;
          margin-top: 15px;
        }
      }
    }
    .fan_title {
      margin-top: 33px;
    }
  }
  .room_list_title {
    width: 679px;
    height: 176px;
    background-image: url("../assets/images/room_list_box.png");
    background-size: 100% 100%;
    position: relative;
    top: 9px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 20;
    .time__box {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      bottom: -3px;
      left: 50%;
      transform: translateX(-50%);
      padding-left: 20px;
      .num {
        width: 72px;
        height: 72px;
        background: url("../assets/images/time_num_bg.png") 0/100% 100%
          no-repeat;
        text-align: center;
        line-height: 72px;
        font-size: 48px;
        font-weight: 900;
        color: #ffffff;
      }
      .text {
        margin-left: 10px;
        margin-right: 10px;
        font-size: 22px;
        font-weight: normal;
        color: #fffe98;
      }
    }
  }
}
</style>
