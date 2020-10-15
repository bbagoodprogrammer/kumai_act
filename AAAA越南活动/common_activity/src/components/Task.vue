<template>
  <div class="tasks">
    <Days />
    <TaskItem v-for="(item,index) in date_line" :key="index" :index="index" />
  </div>
</template>
<script>
import Days from "./Days"
import TaskItem from "./TaskItem"
import { mapState } from "vuex"
export default {
  components: { Days, TaskItem },
  computed: {
    ...mapState(['date_line'])
  }
}
</script>
<style lang="scss" scoped>
.tasks {
  padding: 0 0.12rem 1.5rem;
  display: flex;
  margin-top: 0.18rem;
  height: 9rem;
}
</style>
