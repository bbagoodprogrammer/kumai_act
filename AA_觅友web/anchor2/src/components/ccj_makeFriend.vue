<template>
  <div class="makeFriend">
    <div class="myInfo">
      <div>
        <span>{{my_info.name}}</span>
        <span></span>
        <span>ID {{my_info.gid}}</span>
      </div>
      <div>{{lang.anchor_num}}{{my_info.anchorCnt}}</div>
    </div>
    <!-- <TabsScrollLoadList /> -->
    <RankGroupsFriend />
  </div>
</template>

<script>
import { mapState } from "vuex"
import TabsScrollLoadList from "./TabsScrollLoadList"
import RankGroupsFriend from "./RankGroupsFriend"
export default {
  components: { TabsScrollLoadList, RankGroupsFriend },
  computed: {
    ...mapState(['my_info'])
  }
}
</script>

<style lang="scss" scoped>
.makeFriend {
  .myInfo {
    height: 0.88rem;
    padding: 0 0.3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0;
    div:nth-of-type(1) {
      span {
        display: inline-block;
      }
      span:nth-of-type(1) {
        font-size: 0.28rem;
        font-weight: bold;
        line-height: 0.4rem;
        color: rgba(255, 255, 255, 0.6);
      }
      span:nth-of-type(2) {
        width: 0.01rem;
        height: 0.18rem;
        background-color: rgba(255, 255, 255, 0.3);
        margin: 0 0.1rem;
      }
      span:nth-of-type(3) {
        font-size: 0.24rem;
        line-height: 0.33rem;
        color: rgba(255, 255, 255, 0.3);
      }
    }
    div:nth-of-type(2) {
      font-size: 0.24rem;
      line-height: 0.33rem;
      color: #8C8995;
    }
  }
}
</style>