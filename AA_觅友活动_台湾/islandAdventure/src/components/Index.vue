<template>
  <div class="page pageIndex">
    <div class="header"></div>
    <div class="tab">
      <span class="tab1" :class="{act:type == 1}" @click="type = 1"></span>
      <span class="tab2" :class="{act:type == 2}" @click="type = 2"></span>
    </div>
    <keep-alive>
      <component :is="type == 1?'Task':'Rank'" />
    </keep-alive>
  </div>
</template>

<script>

import Task from "./Task"
import Rank from "./Rank"

export default {
  components: { Task, Rank },
  data () {
    return {
      type: 1
    }
  }
}
</script>

<style lang="scss" >
.pageIndex {
  .header {
    height: 3.54rem;
  }
  img {
    display: block;
    width: 100%;
  }
}
</style>