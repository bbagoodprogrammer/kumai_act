<template>
  <div class="rule">
    <div class="listTab">
      <a href="" class="works" :class="{active:showComponent === 'Wards'}" @click.prevent="changshowTab('Wards')">活動獎勵</a>
      <a href="" class="kRoom" :class="{active:showComponent === 'Rules'}" @click.prevent="changshowTab('Rules')">活動規則</a>
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
  background-color: #FF9473;
}
.rule {
  padding: 0.29rem 0.31rem;
  .listTab {
    width: 6.86rem;
    height: 0.9rem;
    background: url(../../assets/img/listTabBg.png);
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    padding: 0 0.02rem;
    > a {
      display: block;
      width: 3.71rem;
      height: 0.87rem;
      text-align: center;
      line-height: 0.87rem;
      font-weight: 700;
      color: #ffd4b9;
      &.active {
        color: #fff;
        background: url(../../assets/img/tabBigBg.png);
        background-size: 100% 100%;
      }
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
