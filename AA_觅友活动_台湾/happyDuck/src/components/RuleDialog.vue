<template>
  <div class="rule_dialog">
    <div class="dialog_screen" @click="handleCloseDialog"></div>
    <div class="dialog_container" :style="{background: `url(${images.rule_dialog_bg}) 0/100% 100% no-repeat`}">
      <div class="rule__main">
        <div class="time">{{ getActTime }}</div>
        <div class="title">{{ lang.how_play }}</div>
        <div class="des">{{ lang.how_play_des_1 }}</div>
        <div class="des color">{{ lang.how_play_des_2 }}</div>
        <img class="step_award" :src="images.step_award" />
        <div class="title">{{ lang.duck_gift }}</div>
        <div class="des">{{ lang.duck_gift_des_1 }}</div>
        <ul class="rule_duck__award">
          <li class="award__box" v-for="(item,index) in ruleGifts" :key="index">
            <div class="mian">
              <img :src="item.img" />
              <div class="award_des" v-if="item.show">
                {{ lang[`award_des_${index+1}`] }}
              </div>
              <div class="rate">{{lang[`rate_${index+1}`]}}</div>
            </div>
            <div class="award_title">{{ lang[`award_title_${index+1}`] }}</div>
          </li>
        </ul>
        <div class="des color">{{ lang.duck_gift_des_2 }}</div>
        <div class="title">{{ lang.list_award }}</div>
        <div class="des">{{ lang.list_award_des_1 }}</div>
        <div class="des">{{ lang.list_award_des_2 }}</div>
        <div class="des">{{ lang.list_award_des_3 }}</div>
        <div class="des">{{ lang.list_award_des_4 }}</div>
        <div class="explain apple">{{ lang.apple }}</div>
        <div class="explain">{{ lang.explain }}</div>
      </div>
      <img class="close__dialog" @click="handleCloseDialog" src="../img/close.png" />
    </div>
  </div>
</template>

<script>
import { dateFormat } from "../utils";
import { mapState, mapGetters } from "vuex";
export default {
  name: "ruleDialog",

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    ...mapState(["initData"]),
    getActTime () {
      let sTime = dateFormat(this.lang.s_time, this.initData.sTime * 1000);
      let eTime = dateFormat(this.lang.e_time, this.initData.eTime * 1000);
      return this.lang.act_time.replace('%s', sTime + "-" + eTime)
    },
  },

  data () {
    return {
      ruleGifts: []
    };
  },

  created () {
    this.ruleGifts = window._ruleGifts
    document.body.style.overflow = "hidden";
  },

  beforeDestroy () {
    document.body.style.overflow = "";
  },

  methods: {
    getBrHtml (text) {
      if (!text) {
        return;
      }
      return text.replace(/\n/g, "<br>");
    },

    handleCloseDialog () {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style lang="scss">
.rule_dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  .dialog_screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.7;
    z-index: 1000;
  }
  .dialog_container {
    width: 7.4rem;
    height: 10.69rem;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translate(-50%);
    z-index: 1000;
    opacity: 1;
    .rule__main {
      padding-left: 0.4rem;
      padding-right: 0.4rem;
      height: 7rem;
      margin-top: 3.5rem;
      overflow: auto;
      .time {
        font-size: 0.26rem;
        font-weight: 400;
        color: #db6a06;
        line-height: 0.31rem;
        text-align: center;
        padding-top: 0.24rem;
      }
      .title {
        font-size: 0.3rem;
        font-weight: 400;
        color: #672c06;
        line-height: 0.31rem;
        padding-top: 0.3rem;
      }
      .des {
        font-size: 0.26rem;
        font-weight: 400;
        color: #672c06;
        line-height: 0.31rem;
        padding-top: 0.1rem;
      }
      .color {
        color: rgba(219, 106, 6, 1);
      }
      .explain {
        text-align: center;
        font-size: 0.26rem;
        font-weight: 400;
        color: #672c06;
        line-height: 0.31rem;
        padding-bottom: 0.1rem;
      }
      .apple {
        padding-top: 0.3rem;
      }
      .step_award {
        width: 5.72rem;
        height: 1.77rem;
        display: block;
        margin: 0.2rem auto 0 auto;
      }

      .rule_duck__award {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        .award__box {
          width: 2.03rem;
          text-align: center;
          margin-top: 0.26rem;
          display: flex;
          flex-direction: column;
          .mian {
            position: relative;
            img {
              width: 1.77rem;
              height: 1.75rem;
            }
            .award_des {
              width: 100%;
              height: 0.48rem;
              line-height: 0.48rem;
              position: absolute;
              bottom: 0.1rem;
              font-size: 0.24rem;
              font-weight: 400;
              color: #fae0a5;
            }
            .rate {
              width: 0.9rem;
              height: 0.42rem;
              line-height: 0.42rem;
              position: absolute;
              right: 0.15rem;
              top: 0;
              font-size: 0.24rem;
              font-weight: 400;
              color: #754323;
            }
          }
          .award_title {
            min-height: 0.6rem;
            font-size: 0.26rem;
            font-weight: 400;
            color: #653516;
            line-height: 0.31rem;
            padding-top: 0.05rem;
          }
        }
      }
    }
    .close__dialog {
      position: absolute;
      width: 1.1rem;
      height: 1.1rem;
      left: 50%;
      transform: translateX(-50%);
      bottom: -1.3rem;
    }
  }
}
</style>