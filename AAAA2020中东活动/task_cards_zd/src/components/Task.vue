<template>
  <div class="tasks">
    <div class="carGift">
      <img :src="carTips[initData.model].img" alt="">
      <p v-html="carTips[initData.model].tips"></p>
    </div>
    <div class="taskItem">
      <div class="title">
        <span class="taskTitle">{{carTips[initData.model].title}}
          <em>{{lang.taskOne}}</em>
        </span>
        <span class="taskScore">{{lang.taskScore}}</span>
        <span class="taskBar">{{lang.taskBar}}</span>
      </div>
      <ul>
        <li v-for="(item,index) in newTask" :key="index">
          <span class="taskTitle">{{item.name}}</span>
          <span class="taskScore">{{item.score}}</span>
          <span class="taskBar">
            <em v-if="item.finished == item.count" class="suc">{{lang.suc}}</em>
            <em v-else>{{item.finished }}/{{item.count}}</em>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      carTips: {
        1: {
          img: require('../assets/img/car2.png'),
          title: this.lang.taskTaskEd,
          tips: this.lang.taskTaskTips
        },
        2: {
          img: require('../assets/img/car1.png'),
          title: this.lang.taskTaskEd2,
          tips: this.lang.taskTaskTips2
        },
      }
    }
  },
  computed: {
    ...mapState(['initData', 'taskType']),
    newTask() {
      if (this.initData.tasks.sking) {
        if (this.taskType == 1) {
          return this.initData.tasks.sking
        } else {
          return this.initData.tasks.bking
        }
      } else {
        return this.initData.tasks
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.carGift {
  height: 1.52rem;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 1.6rem;
    height: 1.1rem;
  }
  p {
    width: 4rem;
    color: #f0ca6e;
    font-size: 0.24rem;
    font-weight: 600;
    margin-left: 0.26rem;
  }
}
.taskItem {
  width: 6.18rem;
  padding: 0 0.41rem;
  height: 8.43rem;
  background: url(../assets/img/taskBg.png);
  background-size: 100% 100%;
  margin: 0 auto;
  .title {
    height: 1rem;
    display: flex;
    align-items: center;
    font-weight: 700;
    color: #b75514;
    text-align: center;
  }
  .taskTitle {
    text-align: right;
    width: 4rem;
    em {
      display: block;
      font-size: 0.24rem;
      color: #fcf16a;
    }
  }
  .taskScore {
    width: 1.2rem;
  }
  .taskBar {
    flex: 1;
  }
  ul {
    li {
      height: 0.7rem;
      display: flex;
      align-items: center;
      text-align: center;
      font-size: 0.24rem;
      color: #ffe8b2;
      font-weight: 600;
      .taskTitle {
        color: #ffe8b2;
      }
      .taskScore {
        color: #fff7df;
      }
      .taskBar {
        color: #ffe762;
        em {
          font-size: 0.24rem;
        }
        .suc {
          font-size: 0.24rem;
          color: #83fff5;
        }
      }
    }
  }
}
</style>
