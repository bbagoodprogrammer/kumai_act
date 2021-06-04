<template>
  <div class="award__main">
    <div class="title">{{ lang.act_time }}</div>
    <div class="des">{{ getActTime }}</div>
    <div class="title">{{ lang.award_part_1 }}</div>
    <ul class="award__ring">
      <li class="ring__info" v-for="item in ringProgress" :key="item.index">
        <div class="ring__box">
          <img :src="images[`dialog_ring_${item.index}`]" />
        </div>
        <div class="ring_title">{{ item.rname }}</div>
        <div class="ring_score">
          {{ lang.ring_engine.replace("%s", item.score) }}
        </div>
      </li>
    </ul>
    <div class="title">{{ lang.list_award }}</div>
    <div class="des">{{ lang.award_rank_1 }}</div>
    <div class="des">{{ lang.award_rank_2 }}</div>
    <div class="des">{{ lang.award_rank_3 }}</div>
    <div class="des1" v-html="getBrHtml(lang.list_award_explain)"></div>
    <div class="explain">{{ lang.act_explain }}</div>
  </div>
</template>

<script>
import { dateFormat } from "../utils";
import { mapState, mapGetters } from "vuex";
export default {
  name: "Award",

  computed: {
    ...mapState(["initData"]),
    ...mapGetters(["ringProgress"]),
    getActTime() {
      let sTime = dateFormat(this.lang.s_time, this.initData.stime * 1000);
      let eTime = dateFormat(this.lang.e_time, this.initData.etime * 1000);
      return  sTime + "-" + eTime
    },
  },

  methods: {
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
.award__main {
  .title {
    font-size: 0.26rem;
    font-weight: 300;
    color: #ffffff;
    padding-left: 0.38rem;
    padding-right: 0.38rem;
    padding-top: 0.3rem;
  }
  .des {
    font-size: 0.22rem;
    font-weight: 300;
    color: #e7c1ff;
    padding-left: 0.62rem;
    padding-right: 0.51rem;
    padding-top: 0.1rem;
  }
  .des1 {
    padding: 0.41rem 0.51rem 0 0.62rem;
    font-size: 0.22rem;
    font-weight: 300;
    color: #fffebc;
  }
  .explain {
    text-align: center;
    font-size: 0.22rem;
    font-weight: 300;
    color: #7540bf;
    padding-top: 0.4rem;
    padding-bottom: 0.1rem;
  }
  .award__ring {
    display: flex;
    justify-content: center;
    margin-top: 0.3rem;
    .ring__info {
      width: 1.9rem;
      text-align: center;
      .ring__box {
        width: 1.4rem;
        height: 1.4rem;
        margin: 0 auto;
        background: url("../img/gift_img_box.png") 0/100% 100% no-repeat;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 1.3rem;
          height: 1.3rem;
        }
      }
      .ring_title {
        font-size: 0.22rem;
        font-weight: 400;
        color: #ffffff;
        padding-top: 0.1rem;
      }
      .ring_score {
        padding-top: 0.05rem;
        font-size: 0.22rem;
        font-weight: 300;
        color: #b296ff;
      }
    }
  }
}
</style>