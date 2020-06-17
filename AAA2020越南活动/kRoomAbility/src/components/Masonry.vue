<template>
  <div class="masonryTask">
    <div class="task">
      <div class="taskTitle">
        <span class="name">Nhiệm vụ ngày</span>
        <span class="num">Kim cương</span>
        <span class="bar">Tiến độ</span>
      </div>
      <ul>
        <li v-for="(item,index) in schule" :key="index" :class="'task'+index">
          <span class="name">{{item.desc}}</span>
          <span class="num">{{index ==4?'Không giới hạn':item.chance}}</span>
          <span class="bar" v-if="index ==4">{{item.schule}}</span>
          <span class="bar" v-else-if="item.schule == item.limit">Đã xong</span>
          <span class="bar" v-else>{{item.schule}}/{{item.limit}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
import api from "../api/apiConfig"
import { globalBus } from '../utils/eventBus'
export default {
  computed: {
    ...mapState(['schule'])
  },
  methods: {

  }
}
</script>
<style lang="scss">
.task {
  width: 6.51rem;
  height: 3.1rem;
  padding: 1.6rem 0.18rem 0 0.38rem;
  background: url(../assets/img/taskBg.png);
  background-size: 100% 100%;
  margin: 0 auto;
  .taskTitle,
  li {
    display: flex;
    align-items: center;
    text-align: center;
    min-height: 0.47rem;
    font-weight: 500;
    padding-left: 0.15rem;
    .name {
      width: 4rem;
      text-align: left;
      font-size: 0.22rem;
    }
    .num {
      width: 1.2rem;
      font-size: 0.28rem;
      color: #fffac7;
    }
    .bar {
      flex: 1;
      font-size: 0.24rem;
      color: #bff1ff;
    }
    &.task4 {
      height: 0.75rem;
    }
  }
  .taskTitle {
    height: 0.8rem;
    color: #fff476;
    font-size: 0.28rem;
    white-space: nowrap;
    .name {
      width: 4rem;
      text-align: left;
      font-size: 0.28rem;
    }
    .num {
      width: 1.2rem;
    }
    .bar {
      flex: 1;
    }
  }
}
</style>
