<template>
  <div class="page pageHeaderNav">
    <div class="headerNav">
      <i @click="back"></i> <strong><em>{{title}}</em></strong>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data () {
    return {};
  },
  props: {
    title: {
      type: String,
    },
  },
  mounted () { },
  computed: {
    ...mapState([]),
  },
  methods: {
    back () {
      this.$router.go(-1);
    },
  },
  components: {
    // HeaderNav,
  },
};
</script>

<style lang="scss">
.headerNav {
  height: 0.88rem;
  line-height: 0.88rem;
  padding-top: 0.1rem;
  color: #fff;
  text-align: center;
  position: relative;
  white-space: nowrap;
  i {
    display: inline-block;
    position: absolute;
    top: 0.33rem;
    left: 0.3rem;
    width: 0.42rem;
    height: 0.42rem;
    background: url('../img/back.png') 50% no-repeat;
    background-size: 100% 100%;
  }
  strong {
    display: inline-block;
    width: 2.5rem;
    height: 0.32rem;
    line-height: 0.32rem;
    background-image: url('../img/choose_bg.png');
    background-size: contain;
    text-align: center;
    em {
      font-size: 0.36rem;
      font-weight: 700;
      color: #fff;
      background: linear-gradient(45deg, #78dff3, #8170fa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
</style>