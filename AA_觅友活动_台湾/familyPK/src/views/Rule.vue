<template>
  <div class="rule">
    <div>
      <div class="dialog__title">{{ lang.act_rule }}</div>
    </div>
    <div class="time" v-html="getActTime"></div>
    <div class="tabs">
      <div class="tab" :class="{ tab_select: tab == 0 }" @click="handleClick(0)">
        {{ lang.rule }}
      </div>
      <div class="tab" :class="{ tab_select: tab == 1 }" @click="handleClick(1)">
        {{ lang.award }}
      </div>
    </div>
    <div class="main">
      <template v-if="tab == 0">
        <div class="des" v-html="getBrHtml(lang.act_des)"></div>
        <div class="title" v-html="getBrHtml(lang.rule_create_family)"></div>
        <div class="des" v-html="getBrHtml(lang.rule_create_family_des)"></div>
        <div class="title" v-html="getBrHtml(lang.match_step)"></div>
        <div class="des" v-html="getTimeHtml(getBrHtml(lang.match_step_des))"></div>
        <div class="title" v-html="getBrHtml(lang.appoint_gift)"></div>
        <div class="des" v-html="getBrHtml(lang.appoint_gift_des)"></div>
        <ul class="gift__box">
          <li v-for="(item, index) in gifts" :key="index">
            <div class="img__box">
              <img :src="require(`../img/gift_${index + 1}.png`)" alt="" />
              <div class="coin__box">
                <img class="coin" src="../img/coin.png" alt="" />
                {{ item.coin }}
              </div>
            </div>
            <div class="name">{{ lang[`gift_name_${index + 1}`] }}</div>
            <div class="score">
              {{ lang.gift_value.replace("%s", item.score) }}
            </div>
          </li>
        </ul>
        <div class="title" v-html="getBrHtml(lang.orther)"></div>
        <div class="des" v-html="getBrHtml(lang.orther_des)"></div>
      </template>
      <template v-if="tab == 1">
        <ul class="award__box" v-if="tab == 1">
          <li v-for="item in 8" :key="item">
            <div class="img__box">
              <img v-if="item == 2" :src="images.award_2" alt="">
              <img v-else :src="require(`../img/award_${item}.png`)" alt="" />
            </div>
            <span class="name" v-html="getBrHtml(lang[`award_${item}`])"></span>
          </li>
        </ul>
        <div class="title" style="margin-top: 0.1rem" v-html="getBrHtml(lang.act_step_1)"></div>
        <div class="des award_des" v-html="getBrHtml(lang.top_1)"></div>
        <div class="des award_des" v-html="getBrHtml(lang.top_1_menber)"></div>
        <div class="des award_des" v-html="getBrHtml(lang.top_2)"></div>
        <div class="des award_des" v-html="getBrHtml(lang.top_2_menber)"></div>
        <div class="des award_des" v-html="getBrHtml(lang.top_3)"></div>
        <div class="des" v-html="getBrHtml(lang.top_3_menber)"></div>
        <ul class="act_award__box">
          <li v-for="item in 3" :key="item">
            <img :src="require(`../img/act_award_${item}.png`)" alt="" />
            <div class="name">{{ lang[`act_award_${item}`] }}</div>
          </li>
        </ul>
        <div class="des" style="margin-top:0.3rem" v-html="getBrHtml(lang.family_gift)"></div>
        <div class="title" v-html="getBrHtml(lang.act_step_2)"></div>
        <div class="des award_des" v-html="getBrHtml(lang.pk_award_1)"></div>
        <div class="des" v-html="getBrHtml(lang.pk_award_2)"></div>
        <div class="title" v-html="getBrHtml(lang.notice)"></div>
        <div class="des" v-html="getBrHtml(lang.notice_des)"></div>
      </template>
      <div class="explain">{{lang.explain}}</div>
    </div>
  </div>
</template>

<script>
import { dateFormat } from "../utils";
import { mapState, mapGetters } from "vuex";
export default {
  name: "MailDialog",

  computed: {
    ...mapState(["initData"]),
    ...mapGetters(["familyPK", "familyCompetition"]),
    getActTime () {
      let sTime = dateFormat(this.lang.s_time, this.initData.sTime * 1000);
      let eTime = dateFormat(this.lang.e_time, this.initData.eTime * 1000);
      return this.lang.act_time.replace("%s", sTime + "-" + eTime);
    },
  },

  data () {
    return {
      tab: 0,
      gifts: [],
    };
  },

  created () {
    this.gifts = window._gifts;
  },

  methods: {
    handleClick (tab) {
      this.tab = tab;
    },
    getTimeHtml (text) {
      let time1 = dateFormat(this.lang.act_step_time, this.familyPK.sTime * 1000) + '-' + dateFormat(this.lang.act_step_time, this.familyPK.eTime * 1000)
      let time2 = dateFormat(this.lang.act_step_time, this.familyCompetition.sTime * 1000) + '-' + dateFormat(this.lang.act_step_time, this.familyCompetition.eTime * 1000)
      return text.replace('{0}', time1).replace('{1}', time2)
    }
  },
};
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
}
.rule {
  width: 100%;
  height: 100%;
  background: RGBA(29, 14, 82, 1);
  display: flex;
  flex-direction: column;
  .dialog__title {
    display: inline-block;
    font-size: 0.34rem;
    color: #e4bd68;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 0.31rem;
    margin-bottom: 0.27rem;
  }
  .dialog__title::before {
    content: '';
    width: 1.94rem;
    height: 0.16rem;
    position: absolute;
    left: -2.06rem;
    background-image: url('../img/title_left.png');
    background-size: 100% 100%;
    top: 50%;
    transform: translateY(-50%);
  }
  .dialog__title::after {
    content: '';
    width: 1.94rem;
    height: 0.16rem;
    position: absolute;
    right: -2.06rem;
    background-image: url('../img/title_right.png');
    background-size: 100% 100%;
    top: 50%;
    transform: translateY(-50%);
  }

  .time {
    font-size: 0.24rem;
    font-weight: 400;
    color: #b1c4f7;
    text-align: center;
  }

  .tabs {
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 50;
    margin-top: 0.19rem;
    margin-bottom: 0.35rem;
    .tab {
      width: 2.3rem;
      height: 0.78rem;
      background: url('../img/tab_bg.png') 0/100% 100% no-repeat;
      margin: 0 0.05rem 0 0.05rem;
      font-size: 0.28rem;
      text-align: center;
      line-height: 0.78rem;
      font-weight: bold;
      color: #cbd5f9;
    }
    .tab_select {
      background: url('../img/current_tab_bg.png') 0/100% 100% no-repeat;
      color: #2c0204;
    }
  }

  .main {
    flex: 1;
    overflow: auto;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    padding-bottom: 0.4rem;
    .des {
      font-size: 0.22rem;
      font-weight: 400;
      color: #b1c4f7;
      line-height: 0.34rem;
    }
    .title {
      font-size: 0.22rem;
      font-weight: 400;
      color: rgba(222, 231, 255, 1);
      margin-top: 0.44rem;
    }
    .award_des {
      margin-bottom: 0.3rem;
    }
    .award__box {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      li {
        margin-left: 0.05rem;
        margin-right: 0.05rem;
        .img__box {
          width: 1.35rem;
          height: 1.27rem;
          background: #050338;
          border: 0.02rem solid #2d226e;
          border-radius: 0.07rem;
          text-align: center;
          img {
            width: 1.26rem;
            height: 1.25rem;
          }
        }
        .name {
          display: block;
          text-align: center;
          font-size: 0.22rem;
          font-weight: 400;
          color: #b1c4f7;
          margin-top: 0.1rem;
          margin-bottom: 0.14rem;
        }
      }
    }
    .act_award__box {
      display: flex;
      justify-content: center;
      margin-top: 0.33rem;
      li {
        margin-left: 0.05rem;
        margin-right: 0.05rem;
        text-align: center;
        img {
          width: 1.35rem;
          height: 1.27rem;
        }
        .name {
          font-size: 0.22rem;
          font-weight: 400;
          color: #b1c4f7;
        }
      }
    }
    .gift__box {
      display: flex;
      justify-content: center;
      margin-top: 0.3rem;
      justify-content: space-between;
      li {
        text-align: center;
        .img__box {
          width: 1.65rem;
          height: 1.56rem;
          position: relative;
          .coin__box {
            width: 0.68rem;
            height: 0.25rem;
            background: url('../img/coin_box.png') 0/100% 100% no-repeat;
            position: absolute;
            top: 0;
            left: 0;
            font-size: 0.18rem;
            font-weight: 400;
            color: #ffd469;
            display: flex;
            align-items: center;
            justify-content: center;
            .coin {
              width: 0.15rem;
              height: 0.15rem;
            }
          }
        }
        img {
          width: 1.65rem;
          height: 1.56rem;
        }
        .name {
          font-size: 0.22rem;
          font-weight: 400;
          color: #b1c4f7;
        }
        .score {
          font-size: 0.22rem;
          font-weight: 400;
          color: rgba(215, 190, 128, 1);
        }
      }
    }
    .explain {
      font-size: 0.22rem;
      font-weight: 400;
      color: #b1c4f7;
      line-height: 0.34rem;
      text-align: center;
      padding-top: 0.3rem;
    }
  }
}
</style>