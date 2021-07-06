<template>
  <div class="home__container">
    <Header />

    <div class="award__main" :style="{background: `url(${images.duck_send_gift}) 0/100% 100% no-repeat`}">
      <div class="award_des">{{ lang.award_des }}</div>
      <ul class="duck__award">
        <li class="award__box" v-for="(item,index) in gifts" :key="index">
          <div class="mian">
            <img :src="item.img" />
            <div class="des" v-if="item.show">
              {{ lang[`award_des_${index+1}`] }}
            </div>
          </div>
          <div class="title">{{ lang[`award_title_${index+1}`] }}</div>
        </li>
      </ul>
    </div>

    <RankGroups />

    <FirstDialog :visible.sync="showFirstDialog" v-if="showFirstDialog" />

  </div>
</template>

<script>
import Header from "../components/Header";
import RankGroups from "../components/RankGroups";
import FirstDialog from "../components/FirstDialog";
import { loadImages } from "../utils";
import { mapState, mapGetters } from "vuex";

export default {
  name: "Home",

  components: {
    Header,
    RankGroups,
    FirstDialog,
  },

  data() {
    return {
      showFirstDialog: false,
      gifts: []
    };
  },

  computed: {
    ...mapState(["initData", "loading"]),
    ...mapGetters([]),
  },

  watch: {
    "initData.firstVisit": {
      handler(val) {
        if (val && !window._notFirstDialog) {
          this.showFirstDialog = true;
        }
      },
      deep: true,
      immediate: true,
    },
  },

  created() {
    this.gifts = window._gifts
    this.$store.dispatch("initData");
  },

  mounted() {
    // loadImages(
    //   require("../img/first_dialog_bg.png"),
    //   require("../img/record_dialog_bg.png"),
    //   require("../img/rule_dialog_bg.png")
    // );
  },

  methods: {},
};
</script>

<style lang="scss">
.home__container {
  background: rgba(61, 116, 34, 1);
  width: 100%;
  position: relative;
  padding-bottom: 1.36rem;
  .award__main {
    width: 7.31rem;
    height: 9.51rem;
    margin: -1.4rem auto 0 auto;
    position: relative;
    z-index: 100;
    .award_des {
      text-align: center;
      font-size: 0.26rem;
      font-weight: 400;
      color: #fae0a5;
      padding-top: 1.38rem;
    }
  }
  .duck__award {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .award__box {
      width: 2.03rem;
      text-align: center;
      margin-top: 0.26rem;
      .mian {
        position: relative;
        img {
          width: 1.77rem;
          height: 1.75rem;
        }
        .des {
          width: 100%;
          height: 0.38rem;
          line-height: 0.38rem;
          position: absolute;
          bottom: 0.1rem;
          font-size: 0.24rem;
          font-weight: 400;
          color: #fae0a5;
        }
      }
      .title {
        height: 0.31rem;
        font-size: 0.26rem;
        font-weight: 400;
        color: #653516;
        line-height: 0.31rem;
        padding-top: 0.05rem;
      }
    }
  }
}
</style>
