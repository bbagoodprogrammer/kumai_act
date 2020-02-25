<template>
  <div class="rule">
    <div class="tabs">
      <span :class="{active:showCom == 'ward'}" @click="tabClick('ward')">الجوائز</span>
      <span :class="{active:showCom == 'rule'}" @click="tabClick('rule')">القواعد</span>
    </div>
    <component :is="showCom"></component>
  </div>
</template>

<script>
import ward from "./Ward"
import rule from "./Rule"
export default {
  components: { ward, rule },
  data() {
    return {
      showCom: 'ward'
    }
  },
  methods: {
    tabClick(val) {
      this.showCom = val
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #210f7e;
  direction: rtl;
}
.tabs {
  width: 6.74rem;
  height: 0.98rem;
  padding: 0 0.12rem;
  margin: 0.41rem auto;
  background: url(../../assets/img/tabsBg.png);
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  span {
    display: block;
    width: 3.51rem;
    height: 0.76rem;
    color: #bb81fb;
    text-align: center;
    font-size: 130%;
    line-height: 0.76rem;
    white-space: nowrap;
    &.active {
      color: #fff;
      background: url(../../assets/img/tabActive.png);
      background-size: 100% 100%;
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
