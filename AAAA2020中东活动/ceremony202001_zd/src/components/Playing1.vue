<template>
  <div class="playing1">
    <Turntable />
    <div class="taskTabs">
      <span class="p1Tab1" :class="{act:type==1}" @click="tabClick(1)"></span>
      <span class="p1Tab2" :class="{act:type==2}" @click="tabClick(2)"></span>
    </div>
    <keep-alive>
      <component :is="type == 1?'TaskList':'Playing1Rank'" ref="pCon1"></component>
    </keep-alive>

  </div>
</template>
<script>
import Turntable from "./Turntable"
import TaskList from "./TaskList"
import Playing1Rank from "./Playing1Rank"
import { mapState } from "vuex"
export default {
  components: { Turntable, TaskList, Playing1Rank },
  data() {
    return {
      type: 1,
    }
  },
  methods: {
    tabClick(val) {
      this.vxc('setTab1_type', val)
      this.type = val
    },

  }
}
</script>
<style lang="scss" scoped>
.taskTabs {
  display: flex;
  justify-content: center;
  span {
    width: 3.54rem;
    height: 0.88rem;
  }
  .p1Tab1 {
    background: url(../assets/img/p1Tab1.png);
    background-size: 100% 100%;
    &.act {
      background: url(../assets/img/p1Tab1_act.png);
      background-size: 100% 100%;
    }
  }

  .p1Tab2 {
    background: url(../assets/img/p1Tab2.png);
    background-size: 100% 100%;
    &.act {
      background: url(../assets/img/p1Tab2_act.png);
      background-size: 100% 100%;
    }
  }
}
</style>
