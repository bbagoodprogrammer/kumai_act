<template>
  <div class="page pageIndex">
    <div class="header">
      <RoolMsg />
      <div class="ruleTips" @click="showRule = true">{{lang.ruleTips}}</div>
    </div>
    <PeopleTotal />
    <MagicLand />
    <TabsScrollLoadList />
    <Footer />
    <div class="mask" v-show="showRule">
      <transition name="slide">
        <Rule v-if="showRule" />
      </transition>
    </div>
  </div>
</template>

<script>

import PeopleTotal from "./PeopleTotal"
import MagicLand from "./MagicLand"
import TabsScrollLoadList from "./TabsScrollLoadList"
import Footer from "./Footer"
import Rule from "./Rule"
import RoolMsg from "./RoolMsg"

export default {
  data () {
    return {
      showRule: false
    }
  },
  components: {
    PeopleTotal, MagicLand, TabsScrollLoadList, Footer, Rule, RoolMsg
  }
}
</script>

<style lang="scss">
.pageIndex {
  overflow-x: hidden;
  .header {
    height: 4.44rem;
    position: relative;
    .ruleTips {
      width: 1.75rem;
      height: 0.44rem;
      white-space: nowrap;
      background: url(../img/ruleTips.png);
      background-size: 100% 100%;
      position: absolute;
      top: 3.94rem;
      right: 0;
      text-align: center;
      line-height: 0.44rem;
      font-size: 0.26rem;
      color: #92260A;
    }
  }
  img {
    display: block;
    width: 100%;
  }
}
</style>