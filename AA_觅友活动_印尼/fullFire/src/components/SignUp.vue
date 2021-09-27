<template>
  <div v-if="!(initData.step == 1 && !initData.userRanking.ranking)">
    <div class="sign__up">
      <span class="not_start" v-if="initData.step == 0"></span>
      <span class="act_ended" v-if="initData.step == 2"></span>
      <div class="rank_fixed" v-if="initData.step == 1 && initData.userRanking.ranking">
        <div class="rank">{{handleRank(initData.userRanking.ranking)}}</div>
        <img class="avatar" v-lazy="initData.userRanking.avatar" />
        <div class="title">{{initData.userRanking.roomName}}</div>
        <div class="coin__box">
          <div class="coin_title">{{lang.coin_charm}}</div>
          <div class="num">{{initData.userRanking.score}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import lang from "@/config/lang";
import { mapState } from "vuex";

export default {
  name: "SignUp",


  computed: {
    lang: () => lang,
    ...mapState(["share", "initData"]),
  },

  data() {
    return {
    };
  },

  methods: {
    handleRank (rank) {
      return rank > 100 ? '100+' : rank
    }
  },
};
</script>

<style lang="scss">
.sign__up {
  width: 750px;
  height: 161px;
  background: url("../assets/images/sign_btn.png") 0/100% 100% no-repeat;
  position: fixed;
  bottom: 0;
  z-index: 100;
  // text-align: center;
  .not_start {
    display: inline-block;
    width: 273px;
    height: 72px;
    background: url("../assets/images/act_not_start_btn.png") 0/100% 100%
      no-repeat;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    line-height: 72px;
    font-size: 36px;
    font-weight: bold;
    font-style: italic;
    color: #ffffff;
    -webkit-text-stroke: 2px #cb6f3d;
    text-stroke: 2px #cb6f3d;
    text-align: center;
  }
  .act_ended {
    @extend .not_start;
    background: url("../assets/images/act_end_btn.png") 0/100% 100% no-repeat;
    -webkit-text-stroke: 2px #403936;
    text-stroke: 2px #403936;
  }
  .rank_fixed {
    width: 702px;
    height: 107px;
    // background: red;
    position: absolute;
    bottom: 7px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    .rank {
      width: 69px;
      height: 57px;
      text-align: center;
      line-height: 57px;
      font-size: 26px;
      font-weight: bold;
      font-style: italic;
      color: #fbed8d;
      margin-left: 22px;
      margin-right: 15px;
    }
    .avatar {
      width: 107px;
      height: 107px;
      border: 3px solid #97fcfd;
      border-radius: 50%;
      box-sizing: border-box;
    }
    .title {
      width: 174px;
      height: 30px;
      line-height: 30px;
      font-size: 26px;
      font-weight: bold;
      font-style: italic;
      color: #ffffff;
      margin-left: 18px;
      flex: 1;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .coin__box {
      min-width: 141px;
      margin-right: 34px;
      .coin_title {
        height: 20px;
        line-height: 20px;
        font-size: 20px;
        font-weight: 300;
        color: #ffffff;
        text-align: center;
      }
      .num {
        line-height: 23px;
        height: 23px;
        font-size: 30px;
        font-weight: bold;
        font-style: italic;
        color: #ffffff;
        margin-top: 11px;
        text-align: center;
      }
    }
  }
}
</style>