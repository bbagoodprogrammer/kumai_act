<template>
  <div class="task">
    <div class="title">
      <span class="name">مهمة</span>
      <span class="num">جمع النجوم</span>
    </div>
    <ul>
      <li v-for="(item,index) in schule" :key="index">
        <div class="name">{{item.desc}}</div>
        <div class="num" v-if="item.schule">تم حصول</div>
        <div class="num" v-else>
          <i v-for="(item2,index2) in item.chance" :key="index2"></i>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from "vuex"
export default {
  computed: {
    ...mapState(['schule'])
  }
}
</script>
<style lang="scss">
.task {
  padding: 0 0.85rem;
  height: 6.9rem;
  padding-top: 1.27rem;
  background: url(../assets/img/taskBg.png);
  background-size: 100% 100%;
  margin-top: -1.7rem;
  .title {
    height: 0.8rem;
    line-height: 0.9rem;
    font-size: 0.42rem;
    color: #173a80;
    font-weight: bold;
    justify-content: space-between;
    display: flex;
    border-bottom: 0.03rem solid rgba(40, 118, 192, 0.34);
    .name {
      width: 4rem;
      text-indent: 0.3rem;
    }
    .num {
      flex: 1;
      padding-left: 0.4rem;
      white-space: nowrap;
    }
  }
  ul {
    li {
      min-height: 0.75rem;
      display: flex;
      align-items: center;
      border-bottom: 0.03rem solid rgba(40, 118, 192, 0.34);
      .name {
        width: 4rem;
        color: #173a80;
        font-size: 0.28rem;
        font-weight: 600;
        line-height: 0.3rem;
      }
      .num {
        flex: 1;
        display: flex;
        justify-content: center;
        font-size: 0.28rem;
        color: #fffb7d;
        i {
          display: block;
          width: 0.46rem;
          height: 0.42rem;
          background: url(../assets/img/strat.png);
          background-size: 100% 100%;
        }
      }
    }
    li:last-child {
      border: none;
    }
  }
}
</style>
