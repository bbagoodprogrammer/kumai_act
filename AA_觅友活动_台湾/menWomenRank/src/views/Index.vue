<template>
  <div class="home__container">
    <Header ref="header" />

    <RankGroups />
  </div>
</template>

<script>
import Header from "../components/Header";
import RankGroups from "../components/RankGroups";
import { loadImages } from "../utils";
import { mapState, mapGetters } from "vuex";

export default {
  name: "Home",

  components: {
    Header,
    RankGroups,
  },

  data() {
    return {};
  },

  computed: {
    ...mapState(["initData"]),
    ...mapGetters([]),
  },

  watch: {},

  created() {
    this.$store.dispatch("initData");
  },

  mounted() {
    loadImages();
    //require("../img/synth_dialog_bg.png"),
  },

  methods: {},
};
</script>

<style lang="scss">
.home_padding {
  padding-bottom: 0.3rem;
}
.home__container {
  background: RGBA(22, 6, 63, 1);
  width: 100%;
  position: relative;
}
</style>
