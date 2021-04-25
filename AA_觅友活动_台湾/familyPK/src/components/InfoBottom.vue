<template>
  <div class="info__bottom" v-if="showInfo">
    <div class="info__main" v-if="infoData.avatar">
      <div class="rank" :class="{ rank_hidn: !isPromotion }">
        {{ handleRank(infoData.rank) }}
      </div>
      <img class="avatar" :src="infoData.avatar" alt="" />
      <div>
        <div class="name">{{ infoData.name }}
          <img class="team" v-if="isPromotion" :src="infoData.team == 'red' ? images.red_team : images.blue_team" alt="">
        </div>
        <!-- <div class="team" v-if="isPromotion">
          {{ infoData.team == "red" ? lang.red_team : lang.blue_team }}
        </div> -->
        
        <div class="attr" v-if="isPromotion">
          <img
            class="fan__avatar"
            v-for="fan in infoData.familyUser"
            :key="fan.uid"
            v-lazy="fan.avatar"
            @click="goHomepage(fan.uid)"
          />
          <span class="title" @click="showFamilyIntro = true">{{
            lang.see_menber_list
          }}</span>
          <span class="arrow" @click="showFamilyIntro = true">>></span>
        </div>
      </div>
      <div class="score__box" v-if="isPromotion">
        <div>{{ lang.guard_value }}</div>
        <div class="num">{{ infoData.score }}</div>
      </div>

      <div v-if="!isPromotion" class="not_promotion">
        {{ lang.not_promotion }}
      </div>
    </div>

    <FamilyIntro
      v-if="showFamilyIntro"
      :visible.sync="showFamilyIntro"
      :familyId="infoData.familyId"
    />
  </div>
</template>

<script>
import callApp from "../utils/callApp";
import FamilyIntro from "./FamilyIntro";
import { mapState, mapGetters } from "vuex";

export default {
  name: "InfoBottom",

  props: {
    tab: {
      required: true,
    },
  },

  components: {
    FamilyIntro,
  },

  computed: {
    ...mapState(["initData", "rankGroups"]),
    ...mapGetters(["familyRank", "familyCompetition", "familyPK"]),
    infoData() {
      if (this.tab == 1) {
        return this.familyRank;
      }
      if (this.tab == 2) {
        let data = this.rankGroups[1] || {};
        return data.userRank || {};
      }
      if (this.tab == 3) {
        let data = this.rankGroups[3] || {};
        return data.userRank || {};
      }
    },
    showInfo() {
      if (this.tab == 1 || this.tab == 2) {
        return true;
      }
      if (this.familyCompetition.step != 0) {
        return true;
      }
      return false;
    },
    isPromotion() {
      if (this.tab == 3 && this.infoData.rank == 0) {
        return false;
      }
      if (this.tab == 1 && this.infoData.rank == 0 && this.familyPK.step == 2) {
        return false;
      }
      return true;
    },
  },

  data() {
    return {
      showFamilyIntro: false,
      info: {},
    };
  },

  methods: {
    handleRank(rank) {
      return rank > 100 ? "100+" : rank;
    },

    goHomepage(uid) {
      if (uid) {
        callApp.userInfo(uid);
      }
    },
  },
};
</script>

<style lang="scss">
.info__bottom {
  width: 7.5rem;
  height: 1.33rem;
  background: url("../img/fixed_bottom_box.png") 0/100% 100% no-repeat;
  position: fixed;
  bottom: 0;
  z-index: 500;
  .info__main {
    width: 7.5rem;
    height: 1.33rem;
    display: flex;
    position: relative;
    align-items: center;
    .rank {
      width: 1.08rem;
      height: 1.33rem;
      text-align: center;
      line-height: 1.33rem;
      font-size: 0.33rem;
      font-weight: bold;
      color: #ffffff;
    }
    .rank_hidn {
      font-size: 0;
    }
    .avatar {
      width: 1.42rem;
      height: 1.42rem;
      background: #260c46;
      border: 0.01rem solid #eae9fa;
      border-radius: 50%;
      margin-top: -0.2rem;
    }
    .name {
      font-size: 0.26rem;
      font-weight: normal;
      color: #ffffff;
      margin-left: 0.14rem;
      // margin-top: 0.33rem;
      width: 2.5rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .team {
      width: 0.59rem;
      height: 0.26rem;
      vertical-align: bottom;
    }
    .score__box {
      position: absolute;
      right: 0.4rem;
      top: 0.37rem;
      font-size: 0.2rem;
      font-weight: normal;
      color: #d2afed;
      text-align: center;
      .num {
        font-size: 0.3rem;
        font-weight: normal;
        color: #f9f915;
        padding-top: 0.07rem;
      }
    }
    .attr {
      display: flex;
      align-items: center;
      line-height: 0.44rem;
      margin-top: 0.16rem;
      margin-left: 0.14rem;
      .fan__avatar {
        width: 0.44rem;
        height: 0.44rem;
        border-radius: 50%;
        box-sizing: border-box;
        border: 0.02rem solid RGBA(254, 228, 255, 1);
        margin-right: 0.04rem;
      }
      .arrow {
        font-size: 0.2rem;
        font-weight: 400;
        color: #d2afed;
      }
      .title {
        font-size: 0.2rem;
        font-weight: 400;
        color: #d2afed;
        margin-left: 0.07rem;
      }
    }
    .not_promotion {
      min-width: 1.61rem;
      height: 0.27rem;
      background: url("../img/not_promotion_box.png") 0/100% 100% no-repeat;
      font-size: 0.18rem;
      text-align: center;
      font-weight: normal;
      color: #a5f1fc;
      line-height: 0.27rem;
    }
  }
}
</style>