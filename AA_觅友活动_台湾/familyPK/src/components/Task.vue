<template>
  <div class="task">
    <div class="con_title" v-if="initData.step == 0">{{ lang.act_start_down }}</div>
    <div class="con_title" v-else>{{ lang.act_down_title }}</div>
    <div class="time__box">
      <div class="num">{{ downTime.day }}</div>
      <div class="text">{{ lang.day }}</div>
      <div class="num">{{ downTime.hour }}</div>
      <div class="text">{{ lang.hour }}</div>
      <div class="num">{{ downTime.minute }}</div>
      <div class="text">{{ lang.minute }}</div>
      <div class="num">{{ downTime.second }}</div>
      <div class="text">{{ lang.second }}</div>
    </div>

    <div class="task__box">
      <div class="task__item task__title">
        <div class="td1 td_title">{{ lang.task_table_1 }}</div>
        <div class="td2 td_title">{{ lang.task_table_2 }}</div>
        <div class="td3 td_title">{{ lang.task_table_3 }}</div>
        <div class="td4 td_title">{{ lang.task_table_4 }}</div>
      </div>
      <div class="task__item" v-for="(item, index) in tasks" :key="index">
        <div class="td1 td_con">{{ lang[`task_${index + 1}`] }}</div>
        <div class="td2 td_con">{{ item.score }}</div>
        <div class="td3 td_con" v-if="index == 0">
          {{ lang.no_upper_limit }}
        </div>
        <div class="td3 td_con" v-else-if="index == 1">
          {{ lang.per_person.replace("%s", item.upperLimit) }}
        </div>
        <div class="td3 td_con" v-else>{{ item.upperLimit }}</div>
        <div class="td4 td_con">{{ item.haveScore }}</div>
      </div>
      <div class="task_des">{{ lang.task_des }}</div>
    </div>

    <div class="today_value" v-html="getTodayScore"></div>

    <img
      v-if="initData.step == 1"
      class="refresh"
      :class="{ rotate: refreshing }"
      @click="onRefresh"
      src="../img/refresh.png"
    />

  </div>
</template>

<script>
import downTime from "../utils/downTime";
import { mapState, mapGetters } from "vuex";

export default {
  name: "Task",

  data() {
    return {
      downTime: {},
      refreshing: false
    };
  },

  computed: {
    ...mapState(["initData"]),
    ...mapGetters(["tasks"]),
    getTodayScore() {
      return this.lang.my_today_value.replace(
        "%s",
        `<span class="value">${this.initData.todayScore || 0}</span>`
      );
    },
  },

  watch: {
    "initData.downTime": {
      handler(val) {
          this.handleCountTime(val)
      },
      immediate: true,
      deep: true
    }
  },

  created() {
    
  },

  methods: {
    handleCountTime(diffTime) {
      const timeKey = "familyPk_end";
      if (downTime(timeKey) == null) {
        downTime(timeKey, diffTime);
      }
      if (downTime(timeKey).end) {
        this.downTime = downTime(timeKey);
      } else {
        clearInterval(this.timer);
        let fn = () => {
          this.downTime = downTime(timeKey);
        };
        fn();
        this.timer = setInterval(fn, 1000);
      }
    },

    onRefresh() {
      if (this.refreshing) {
        return;
      }
      this.refreshing = true;
      setTimeout(() => {
        this.refreshing = false;
      }, 800);
      this.$store.dispatch("initData");
    },
  },
};
</script>

<style lang="scss">
.task {
  width: 7.39rem;
  height: 8.54rem;
  background: url("../img/task_bg.png") 0/100% 100% no-repeat;
  margin: -0.35rem auto 0 auto;
  box-sizing: border-box;
  padding-top: 0.35rem;
  position: relative;
  .con_title {
    display: inline-block;
    font-size: 0.24rem;
    color: #e4bd68;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 0.4rem;
  }
  .con_title::before {
    content: "";
    width: 1.94rem;
    height: 0.16rem;
    position: absolute;
    left: -2.06rem;
    background-image: url("../img/title_left.png");
    background-size: 100% 100%;
    top: 50%;
    transform: translateY(-50%);
  }
  .con_title::after {
    content: "";
    width: 1.94rem;
    height: 0.16rem;
    position: absolute;
    right: -2.06rem;
    background-image: url("../img/title_right.png");
    background-size: 100% 100%;
    top: 50%;
    transform: translateY(-50%);
  }
  .time__box {
    display: flex;
    justify-content: center;
    align-items: baseline;
    height: 0.8rem;
    .num {
      font-size: 0.48rem;
      font-weight: 900;
      color: #ffffff;
    }
    .text {
      margin-left: 0.15rem;
      margin-right: 0.15rem;
      font-size: 0.22rem;
      font-weight: normal;
      color: #fafcaf;
    }
  }

  .task__box {
    width: 7.26rem;
    height: 6.08rem;
    background: url("../img/task_box.png") 0/100% 100% no-repeat;
    margin: 0 auto;
    .task__title {
      padding-top: 0.4rem;
      height: auto !important;
    }
    .task__item:nth-child(2)::after,
    .task__item:nth-child(3)::after,
    .task__item:nth-child(4)::after {
      content: "";
      position: absolute;
      bottom: 0;
      width: 7.17rem;
      height: 0.02rem;
      background: url("../img/task_liner.png") 0/100% 100% no-repeat;
    }
    .task__item {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      // padding-top: 0.3rem;
      // padding-bottom: 0.3rem;
      height: 1.1rem;
      .td1 {
        width: 2.6rem;
      }
      .td2 {
        width: 1.3rem;
      }
      .td3 {
        width: 1.3rem;
      }
      .td4 {
        width: 1.6rem;
      }
      .td_title {
        font-size: 0.26rem;
        font-weight: 400;
        color: #ebdb8d;
        text-align: center;
      }
      .td_con {
        font-size: 0.26rem;
        font-weight: 400;
        color: #eae9fa;
        text-align: center;
        line-height: 0.28rem;
      }
    }
    .task_des {
      width: 5.89rem;
      height: 0.5rem;
      font-size: 0.2rem;
      font-weight: 400;
      color: #b4aeff;
      line-height: 0.29rem;
      margin: 0 auto;
    }
  }

  .today_value {
    position: absolute;
    bottom: 0.04rem;
    left: 50%;
    transform: translateX(-50%);
    width: 4.35rem;
    height: 0.56rem;
    background: url("../img/task_value_box.png") 0/100% 100% no-repeat;
    font-size: 0.26rem;
    font-weight: 400;
    color: #ecd59b;
    line-height: 0.56rem;
    text-align: center;
    .value {
      color: #fff;
    }
  }

  .refresh {
    width: 0.94rem;
    height: 0.94rem;
    position: fixed;
    right: 0.2rem;
    bottom: 2rem;
    z-index: 300;
  }
  .rotate {
    //animation: rotate 1s ease;
    animation: rotate 0.8s linear infinite;
  }
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(1080deg);
    }
  }
}
</style>