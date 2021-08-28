<template>
  <div class="rule">
    <i class="close" @click="$parent.showRule = false"></i>
    <div class="title">{{lang.rule_title}}</div>
    <div class="con">
      <p>{{lang.ruleTm}}{{aTimer}}</p>
      <h6>{{lang.rule_tips1}}</h6>
      <p>{{lang.rule_tips2}}</p>
      <h6>{{lang.rule_tips3}}</h6>
      <p v-html="lang.rule_tips4">
      </p>
      <div class="ruleTable"></div>
      <h6>{{lang.rule_tips5}}</h6>
      <p v-html="lang.rule_tips6">
      </p>
      <h6>{{lang.rule_tips7}}</h6>
      <p v-html="lang.rule_tips8"></p>
      <p v-html="lang.rule_tips9"></p>
      <p v-html="lang.rule_tips10"></p>
    </div>

  </div>
</template>

<script>
import getDate from "../utils/getDate"
import { mapState } from "vuex"
export default {
  computed: {
    ...mapState(['activity']),
    aTimer () {
      if (AREA == 'tw') {
        return getDate(new Date(this.activity.stime * 1000), 1) + '-' + getDate(new Date(this.activity.etime * 1000), 1)
      } else if (AREA == 'vn') {
        return getDate(new Date(this.activity.stime * 1000), 2) + '-' + getDate(new Date(this.activity.etime * 1000), 2)
      }
    },
  }
}
</script>

<style lang="scss">
.rule {
  width: 5.75rem;
  height: 9.96rem;
  background: url(../img/rule.png);
  background-size: 100% 100%;
  padding: 0.5rem 0.45rem 0;
  position: relative;
  .title {
    text-align: center;
    text-shadow: #8048D5 1px 0 0, #8048D5 0 1px 0, #8048D5 -1px 0 0,
      #8048D5 0 -1px 0;
  }
  h6 {
    font-size: 0.24rem;
    color: #5220E2;
    margin-top: 0.25rem;
  }
  p {
    font-size: 0.24rem;
  }
  .con {
    max-height: 9rem;
    overflow-y: scroll;
  }
  .close {
    display: block;
    width: 0.62rem;
    height: 0.62rem;
    background: url(../img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0rem;
    top: -0.8rem;
  }
}
</style>