<template>
  <div class="avtivityContion">
    <divide-up-mutton></divide-up-mutton>
    <start-obtain></start-obtain>
    <div class="ward">
      <div class="wardTitle"></div>
      <div class="wardsItem"></div>
    </div>
    <start-list v-if="activite !==0 && !isShare"></start-list>
  </div>
</template>

<script>
import DivideUpMutton from "./DivideUpMutton" //瓜分羊肉
import StartObtain from "./StartObtain"  //星值获取
import StartList from "./StartList"   //星值排行榜
import { mapState } from 'vuex'
export default {
  components: { DivideUpMutton, StartObtain, StartList },
  computed: {
    ...mapState(['isShare', 'activite'])
  }
}
</script>

<style lang="scss">
.ward {
  margin-top: 0.36rem;
  .wardTitle {
    width: 3.72rem;
    height: 1.47rem;
    margin: auto;
    background: url(../assets/img/wardTitle.png);
    background-size: 100% 100%;
  }
  .wardsItem {
    width: 5.68rem;
    height: 3.5rem;
    margin: 0.01rem auto;
    background: url(../assets/img/wards.png);
    background-size: 100% 100%;
  }
}
</style>
