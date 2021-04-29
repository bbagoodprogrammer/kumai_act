<template>
  <div class="record_dialog">
    <div class="screen" @click="handleCloseDialog()"></div>
    <div
      class="main"
      :style="{
        background: `url(${images.record_dialog}) 0/100% 100% no-repeat`,
      }"
    >
      <div class="tabs">
        <img
          @click="handleTab(1)"
          :class="{ current_tab: tab == 1 }"
          :src="images.purchase_box"
        />
        <img
          @click="handleTab(2)"
          :class="{ current_tab: tab == 2 }"
          :src="images.receive_box"
        />
      </div>

      <PurchaseBox v-if="tab == 1" />

      <div v-if="tab == 2" class="min_tabs">
        <div
          @click="handleMiniTab(1)"
          class="tab"
          :class="{ current_tab: miniTab == 1 }"
        >
          {{ lang.not_open }}
        </div>
        <div
          @click="handleMiniTab(2)"
          class="tab"
          :class="{ current_tab: miniTab == 2 }"
        >
          {{ lang.opened }}
        </div>
      </div>

      <NotOpenBox v-if="tab == 2 && miniTab == 1" />

      <OpenedBox v-if="tab == 2 && miniTab == 2" />

      <img
        class="close__dialog"
        @click="handleCloseDialog()"
        src="../img/close.png"
      />
    </div>
  </div>
</template>

<script>
import PurchaseBox from "./PurchaseBox";
import NotOpenBox from './NotOpenBox'
import OpenedBox from './OpenedBox'
import { mapState, mapGetters } from "vuex";
export default {
  name: 'RecordDialog',

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },

  components: {
    PurchaseBox,
    NotOpenBox,
    OpenedBox
  },

  data() {
    return {
      tab: 1,
      miniTab: 1,
    };
  },

  created() {
    document.body.style.overflow = "hidden";
  },

  beforeDestroy() {
    document.body.style.overflow = "";
  },

  computed: {
    ...mapState(["initData"]),
  },

  methods: {
    handleTab(tab) {
      this.tab = tab;
    },

    handleMiniTab(tab) {
      this.miniTab = tab;
    },

    handleCloseDialog(data) {
      if (data && Array.isArray(data)) {
        this.$emit('startSvga', data)
      }
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style lang="scss">
.record_dialog {
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
    opacity: 0.5;
    z-index: 1000;
  }
  .main {
    width: 6.35rem;
    height: 8.33rem;
    position: fixed;
    top: 0;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    opacity: 1;
    .tabs {
      padding-top: 1.21rem;
      display: flex;
      justify-content: center;
      position: relative;
      z-index: 50;
      img {
        width: 2.78rem;
        height: 0.67rem;
        margin: 0 0.045rem 0 0.045rem;
        opacity: 0.4;
      }
      .current_tab {
        opacity: 1;
      }
    }
    .min_tabs {
      display: flex;
      justify-content: center;
      width: 2.08rem;
      height: 0.45rem;
      background: url("../img/mini_tabs.png") 0/100% 100% no-repeat;
      margin: 0.17rem auto 0 auto;
      .tab {
        width: 50%;
        height: 0.45rem;
        text-align: center;
        line-height: 0.45rem;
        font-size: 0.24rem;
        font-weight: 400;
        color: #ffffff;
      }
      .current_tab {
        background: url("../img/mini_tab.png") 0/100% 100% no-repeat;
      }
    }
    .close__dialog {
      position: absolute;
      width: 0.9rem;
      height: 0.9rem;
      bottom: -1rem;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>