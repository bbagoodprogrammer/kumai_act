<template>
  <div class="page pageIndex">
    <RoolMsg />
    <div class="header">
      <div class="ruleTips">活動規則</div>
    </div>
    <TimePeople />
    <TabsScrollLoadList />
    <Footer />
  </div>
</template>

<script>
import TimePeople from "./TimePeople"
import TabsScrollLoadList from "./TabsScrollLoadList"
import Footer from "./Footer"
import RoolMsg from "./RoolMsg"

export default {
  components: { TimePeople, TabsScrollLoadList, Footer, RoolMsg }
}
</script>

<style lang="scss">
.pageIndex {
  .header {
    height: 5.27rem;
    .ruleTips {
      //   display: block;
      width: 0.54rem;
      height: 1.08rem;
      padding: 0.2rem 0;
      background: url(../img/ruleTips.png);
      background-size: 100% 100%;
      position: absolute;
      top: 3.77rem;
      right: 0;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 0.35rem;
      font-size: 0.28rem;
    }
  }
  img {
    display: block;
    width: 100%;
  }
}
</style>