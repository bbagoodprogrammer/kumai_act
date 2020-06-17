<template>
  <div class="rule">
    <div class="listTab">
      <a href="" class="works" :class="{active:showComponent === 'Wards'}" @click.prevent="changshowTab('Wards')">Phần thưởng</a>
      <a href="" class="kRoom" :class="{active:showComponent === 'Rules'}" @click.prevent="changshowTab('Rules')">Thể lệ</a>
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
  background-color: #008595;
}
.rule {
  padding: 0.29rem 0.31rem;
  .listTab {
    width: 6.76rem;
    height: 0.9rem;
    background: url(../../assets/img/listTabBg.png);
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    padding: 0 0.07rem;
    > a {
      display: block;
      width: 3.51rem;
      height: 0.79rem;
      text-align: center;
      line-height: 0.79rem;
      font-weight: 700;
      color: #fffb8e;
      &.active {
        color: #fff;
        margin-top: 0.05rem;
        background: url(../../assets/img/tabBigBg.png);
        background-size: 100% 100%;
      }
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
