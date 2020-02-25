<template>
  <div class="rule">
    <div class="listTab">
      <a href="" class="works" :class="{active:showComponent === 'Wards'}" @click.prevent="changshowTab('Wards')">Hadiah Acara</a>
      <a href="" class="kRoom" :class="{active:showComponent === 'Rules'}" @click.prevent="changshowTab('Rules')">Aturan Acara</a>
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
  background-color: #4124d6;
}
.rule {
  padding: 0.29rem 0.31rem;
  .listTab {
    width: 6.9rem;
    height: 0.9rem;
    background: url(../../assets/img/listTabBg.png);
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    > a {
      display: block;
      width: 48%;
      height: 0.75rem;
      text-align: center;
      line-height: 0.79rem;
      &.active {
        background: url(../../assets/img/listActive2.png);
        background-size: 100% 100%;
      }
      &.works {
        margin: 0.02rem 0 0 0.1rem;
      }
      &.kRoom {
        margin: 0.08rem 0 0.05rem 0.08rem;
      }
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
