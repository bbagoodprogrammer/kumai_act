<template>
  <div class="rule">
    <div class="listTab">
      <a href="" class="works" :class="{active:showComponent === 'Works'}" @click.prevent="changshowTab('Works')">活動獎勵</a>
      <a href="" class="kRoom" :class="{active:showComponent === 'Rules'}" @click.prevent="changshowTab('Rules')">活動規則</a>
    </div>
    <component :is="showComponent"></component>
  </div>
</template>

<script>
import Works from "./Wards"
import Rules from "./Rules"
export default {
  components: { Works, Rules },
  data() {
    return {
      showComponent: 'Works'
    }
  },
  methods: {
    changshowTab(val) {
      this.showComponent = val
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #9c3633;
}
.rule {
  padding: 0.18rem 0 0.13rem 0;
  .listTab {
    width: 6.78rem;
    height: 0.98rem;
    background: url(../../assets/img/listTabBg.png);
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    padding: 0 0.1rem;
    margin: 0 auto;
    > a {
      display: block;
      width: 3.51rem;
      height: 0.76rem;
      text-align: center;
      line-height: 0.76rem;
      color: #ffb1af;
      &.active {
        color: #fff;
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
