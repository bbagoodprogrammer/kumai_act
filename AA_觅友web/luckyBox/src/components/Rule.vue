<template>
  <div class="page pageRule">
    <div class="headerNav">
      <i @click="back"></i><strong>{{ lang.rule }}</strong>
    </div>
    <div class="content_rule">
      <ol>
        <li v-for="i in 7" :key="i">
          <i>{{ i }}</i
          ><strong v-html="lang['rule' + i]"></strong>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import HeaderNav from './app/HeaderNav';
import { getUrlString } from "../utils/";

export default {
  data() {
    return {};
  },
  mounted() {},
  computed: {
    ...mapState([]),
  },
  methods: {
        back() {
            this.$router.go(-1);
        },
    },
  components: {
    // HeaderNav,
  },
};
</script>

<style lang="scss">
// @import '../css/var';

.pageRule {
  color: #fff;
  background: linear-gradient(#c347f7, #f47693);
  border-radius: 0.2rem 0.2rem 0 0;
  .headerNav {
    padding: 0.35rem 0.3rem;
    color: #fff;
    text-align: center;
    position: relative;
    i {
      display: inline-block;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 0.77rem;
      background: url("../img/arrow_left.png") 50% no-repeat;
      background-size: 0.17rem 0.28rem;
    }
    strong {
      font-size: 0.42rem;
      font-weight: 600;
    }
  }
  .content_rule {
      padding: 0 .3rem .3rem;
    ol {
      li {
        line-height: 1.2em;
        padding-bottom: 0.1rem;
        display: flex;
        flex-wrap: nowrap;
        i {
          box-sizing: border-box;
          padding-top: 0.02rem;
          margin-top: 0.08rem;
          width: 0.3rem;
          height: 0.3rem;
          margin-right: 0.1rem;
          font-size: 0.24rem;
          font-weight: 500;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          background: url("../img/num_bg.png");
          background-size: 100% 100%;
        }
        strong {
          flex: 1;
          font-size: 0.26rem;
          span {
            display: inline-block;
            padding-top: 0.15rem;
          }
        }
      }
    }
  }
}
</style>