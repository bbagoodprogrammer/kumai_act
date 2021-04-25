<template>
  <div class="home__container">
    <Header ref="header" :tab="tab" />

    <div class="tabs">
      <div
        v-for="item in 3"
        :key="item"
        @click="handleTab(item)"
        class="tab"
        :class="{ current_tab: tab == item }"
      >
        {{ lang[`tab_${item}`] }}
      </div>
    </div>

    <Task v-if="tab == 1" />

    <RankGroups v-if="tab == 2" />

    <CompRankGroups v-if="tab == 3" />

    <SignUp v-if="!familyRank.familyId" />
    <InfoBottom v-else :tab="tab" />
    
  </div>
</template>

<script>
import Header from "../components/Header";
import RankGroups from "../components/RankGroups";
import Task from "../components/Task";
import SignUp from "../components/SignUp";
import InfoBottom from "../components/InfoBottom";
import CompRankGroups from "../components/CompRankGroups";
import { loadImages } from "../utils";
import { mapState, mapGetters } from "vuex";

export default {
  name: "Home",

  components: {
    Header,
    RankGroups,
    Task,
    SignUp,
    InfoBottom,
    CompRankGroups,
  },

  data() {
    return {
      tab: 1,
    };
  },

  computed: {
    ...mapState(["initData"]),
    ...mapGetters(["familyRank"]),
  },

  created() {
    this.$store.dispatch("initData");
  },

  mounted() {
    loadImages();
    //require("../img/synth_dialog_bg.png"),
  },

  methods: {
    handleTab(tab) {
      this.tab = tab;
    },
  },
};
</script>

<style lang="scss">
.home_padding {
  padding-bottom: 0.3rem;
}
.home__container {
  background: RGBA(10, 14, 70, 1);
  width: 100%;
  position: relative;
  padding-bottom: 1.5rem;
  .tabs {
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 50;
    .tab {
      width: 2.3rem;
      height: 0.78rem;
      background: url("../img/tab_bg.png") 0/100% 100% no-repeat;
      margin: 0 0.05rem 0 0.05rem;
      font-size: 0.28rem;
      text-align: center;
      line-height: 0.78rem;
      font-weight: bold;
      color: #cbd5f9;
    }
    .current_tab {
      background: url("../img/current_tab_bg.png") 0/100% 100% no-repeat;
      color: #2c0204;
    }
  }
}
</style>
