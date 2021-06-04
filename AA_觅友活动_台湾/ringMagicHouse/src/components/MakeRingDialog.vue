<template>
  <div class="make_ring_dialog">
    <div class="select__screen__container" @click="handleCloseDialog"></div>
    <div class="select__container">
      <img
        src="../img/close.png"
        @click="handleCloseDialog"
        class="close__img"
      />
      <div class="dialog_header">{{ lang.magic_engine_enough }}</div>
      <div class="make_ring_des">{{ lang.make_ring_des_1.replace('%s', info.rname)}}</div>
      <div class="clear_engine">{{ lang.make_ring_des_2 }}</div>
      <div class="action__tabs">
        <div class="tab" @click="handleCloseDialog">{{ lang.think_again }}</div>
        <div class="tab" @click="handleSure">{{ lang.sure }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { toast } from "../utils/index";
import callApp from "../utils/callApp";
import { makingRings } from "../apis/index";
import { mapGetters, mapState } from 'vuex'

export default {
  name: "MakeRingDialog",

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    info: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      
    };
  },

  computed: {
    ...mapGetters([
      'userInfo',
      "energy"
    ]),
    ...mapState(["initData"]),
  },

  created() {
    document.body.style.overflow = "hidden";
  },

  beforeDestroy() {
    document.body.style.overflow = "";
  },

  methods: {
    async handleSure() {
      let res = await makingRings({rid: this.info.rid});
      let { response_status, response_data } = res.data;
      if (response_status.code === 0) {
        // 把返回的数据保存到vuex，在动效完成之后弹出一个制作成功的框
        this.$store.commit('setRingDialogInfo', response_data)
        this.$store.commit('makeRing', true)
        this.handleCloseDialog()
      } else {
        toast(response_status.error);
      }
    },

    getBrHtml(text) {
      if (!text) {
        return;
      }
      return text.replace(/\n/g, "<br>");
    },

    handleCloseDialog() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style lang="scss">
.make_ring_dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  .select__screen__container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.7;
    z-index: 1000;
  }
  .select__container {
    width: 6.38rem;
    height: 5.03rem;
    background: url("../img/mini_dialog_bg.png") 0/100% 100% no-repeat;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    opacity: 1;
    .close__img {
      width: 0.64rem;
      height: 0.64rem;
      position: absolute;
      top: 0.1rem;
      right: 0rem;
      z-index: 1100;
    }
    .dialog_header {
      width: 6.38rem;
      height: 0.82rem;
      text-align: center;
      line-height: 0.8rem;
      font-size: 0.36rem;
      font-weight: 500;
      color: #ffefbf;
      position: relative;
      z-index: 1050;
    }
    .make_ring_des {
      width: 5.5rem;
      font-size: 0.28rem;
      font-weight: 300;
      color: #ffffff;
      line-height: 0.36rem;
      margin: 0.7rem auto 0.46rem auto;
      text-align: center;
    }
    .clear_engine {
      text-align: center;
      font-size: 0.22rem;
      font-weight: 300;
      color: #8afffb;
    }

    .action__tabs {
      display: flex;
      justify-content: center;
      margin-top: 0.55rem;
      .tab:first-child {
        background: url("../img/dialog_left_action_tab.png") 0/100% 100%
          no-repeat;
      }
      .tab {
        width: 2.48rem;
        height: 0.7rem;
        line-height: 0.7rem;
        background: url("../img/cp_selected_btn.png") 0/100% 100% no-repeat;
        text-align: center;
        font-size: 0.28rem;
        font-weight: 500;
        color: #ffffff;
        margin-right: 0.2rem;
        margin-left: 0.2rem;
      }
    }
  }
}
</style>