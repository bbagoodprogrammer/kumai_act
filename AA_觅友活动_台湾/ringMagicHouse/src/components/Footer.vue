<template>
  <div class="footer">
    <div class="footer_main">
      <div class="tabs">
        <div
          class="tab"
          @click="handleTab(0)"
          :class="{ tab_select: currentTab == 0 }"
        >
          {{ lang.magic_engine }}
        </div>
        <div
          class="tab"
          @click="handleTab(1)"
          :class="{ tab_select: currentTab == 1 }"
        >
          {{ lang.magic_list }}
        </div>
      </div>

      <Task v-if="currentTab == 0" />
      <RankGroups ref="RankGroups" v-if="currentTab == 1" />

    </div>

    <img
      v-if="initData.step == 1"
      @click="onRefresh"
      class="refresh"
      :class="{ rotate: refreshing }"
      src="../img/refresh.png"
    />
  </div>
</template>

<script>
import Task from './Task'
import RankGroups from './RankGroups'
import { mapState } from "vuex";

export default {
  name: 'Footer',

  components: {
    Task,
    RankGroups
  },

  data() {
    return {
      // currentTab: 0,
      refreshing: false
    };
  },

  computed: {
    ...mapState(["currentTab", "initData"]),
  },

  methods: {
    handleTab(index) {
      // this.currentTab = index;
      this.$store.commit('changeCurrentTab', index)
    },

    onRefresh () {
      this.refreshing = true
      this.$store.dispatch("initData");
      if (this.currentTab == 1) {
        this.$refs.RankGroups.onRefresh()
      }
      setTimeout(() => {
        this.refreshing = false
      }, 1000);
    }
  },
};
</script>

<style lang="scss">
.footer {
  .footer_main {
    width: 7.32rem;
    min-height: 11rem;
    background: url("../img/footer_main_bg.png")  no-repeat;
    background-size: 7.32rem;
    position: relative;
    margin: 0.81rem auto 0 auto;
    box-sizing: border-box;
      padding-top: 0.47rem;
    .tabs {
      width: 7.16rem;
      height: 0.94rem;
      display: flex;
      justify-content: center;
      background: url("../img/tabs_bg.png") 0/100% 100% no-repeat;
      position: absolute;
      top: -0.47rem;
      left: 50%;
      transform: translateX(-50%);
      .tab {
        width: 50%;
        font-size: 0.3rem;
        font-weight: 500;
        color: rgba($color: #ffff, $alpha: 0.6);
        text-align: center;
        line-height: 0.94rem;
      }
      .tab_select {
        background: url("../img/tab_select_bg.png") 0/100% 100% no-repeat;
        color: #ffff;
      }
    }
  }
  .refresh {
  width: 0.94rem;
  height: 0.94rem;
  position: fixed;
  right: 0.13rem;
  bottom: 1.6rem;
  z-index: 300;
}
.rotate {
  //animation: rotate 1s ease;
  animation: rotate 0.8s linear infinite;
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(1080deg);
  }
}
}
</style>