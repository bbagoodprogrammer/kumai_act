<template>
  <div class="rule">
    <div class="listTab">
      <a href="" class="works" :class="{active:showComponent === 'Wards'}" @click.prevent="changshowTab('Wards')">الجوائز</a>
      <a href="" class="kRoom" :class="{active:showComponent === 'Rules'}" @click.prevent="changshowTab('Rules')">القواعد</a>
    </div>
    <component :is="showComponent"></component>
  </div>
</template>

<script>
import Wards from "./Wards"
import Rules from "./Rules"
export default {
  data() {
    return {
      showComponent: 'Wards'
    }
  },
  methods: {
    changshowTab(val) {
      this.showComponent = val
    }
  },
  components: {
    Wards,
    Rules
  }
}
</script>

<style lang="scss">
body {
  background-color: rgba(18, 18, 80, 1);
  direction: rtl;
  letter-spacing: -0.01rem;
}
.rule {
  padding: 0.29rem 0.31rem;
  .listTab {
    width: 6.84rem;
    height: 0.89rem;
    background: url(../../assets/img/listTabBg.png);
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    > a {
      display: block;
      width: 3.8rem;
      height: 0.8rem;
      text-align: center;
      line-height: 0.8rem;
      color: rgba(49, 42, 218, 1);
      &.active {
        background: url(../../assets/img/tabBigBg.png);
        background-size: 100% 100%;
      }
      // &.works {
      //   margin: 0.02rem 0.1rem 0 0;
      // }
      // &.kRoom {
      //   margin: 0.08rem 0.08rem 0.05rem 0;
      // }
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
