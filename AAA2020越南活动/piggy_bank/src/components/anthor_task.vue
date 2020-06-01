<template>
  <div class="taskCon">
    <div class="task" v-if="is_anchor">
      <div class="downTime">
        <p>{{lang.dayTaskTime}}</p>
        <div class="time">
          <div class="day">
            <strong>{{surplusTime.day}}</strong>
            <em>{{lang.day}}</em>
          </div>
          <div class="hours">
            <strong>{{surplusTime.hour}}</strong>
            <em>{{lang.hour}}</em>
          </div>
          <div class="min">
            <strong>{{surplusTime.minute}}</strong>
            <em>{{lang.mint}}</em>
          </div>
          <div class="second">
            <strong>{{surplusTime.second}}</strong>
            <em>{{lang.second}}</em>
          </div>
        </div>
      </div>
      <div class="taskItem">
        <div class="herder">
          <span class="name">{{lang.taskName}}</span>
          <span class="score">{{lang.score}}</span>
          <span class="scoreTop">{{lang.scoreTop}}n</span>
          <span class="bar">{{lang.bar}}</span>
        </div>
        <div class="taskItems">
          <div class="item" v-for="(item,index) in anchor_missions" :key="index">
            <span class="name">{{item.name}}</span>
            <span class="score">{{item.desc}}</span>
            <span class="scoreTop">{{item.limit_score ==0?'Vô hạn':item.limit_score}}</span>
            <span class="bar">
              <em v-if="item.limit_score == 0" class="fc">{{item.current_score}}</em>
              <em v-else-if="item.current_score >= item.limit_score" class="fc">{{lang.over}}</em>
              <em v-else> <i class="fc">{{item.current_score}}</i> / {{item.limit_score}} </em>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="wards" v-else>
    </div>
  </div>
</template>
<script>
import downTime from "../utils/downTime"
import { mapState } from "vuex"
export default {
  props: ['is_anchor'],
  data() {
    return {
      surplusTime: {}
    }
  },
  computed: {
    ...mapState(['mission_countdown', 'anchor_missions'])
  },
  watch: {
    mission_countdown(val) {
      this.downTimeGo(val)
    }
  },
  methods: {
    downTimeGo(val) {
      downTime('time1', val);
      this.surplusTime = downTime('time1');
      this.timer = setInterval(() => {
        this.surplusTime = downTime('time1');
        if (this.surplusTime.end) {
          clearInterval(this.timer)
        }
      }, 1000)
    },
  }
}
</script>
<style lang="scss" scoped>
.taskCon {
  position: relative;
  z-index: 10;
  .task {
    width: 6.94rem;
    height: 3.83rem;
    padding-top: 1rem;
    background: url(../assets/img/taskBg.png);
    background-size: 100% 100%;
    margin: 0 auto;
    .downTime {
      height: 0.9rem;
      p {
        text-align: center;
        color: #8bf7f3;
        font-size: 0.22rem;
      }
      .time {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 0.5rem;
        > div {
          height: 100%;
          line-height: 0.6rem;
          display: inline-block;
          display: flex;
          strong {
            font-size: 0.36rem;
            font-weight: bold;
            color: #f4ffba;
          }
          em {
            font-size: 0.24rem;
            color: #8bf7f3;
            margin: 0.05rem 0.15rem 0 0.15rem;
          }
        }
      }
    }
    .taskItem {
      padding: 0 0.24rem;
      .herder,
      .item {
        display: flex;
        height: 0.5rem;
        span {
          white-space: nowrap;
          text-align: center;
          line-height: 0.5rem;
          font-size: 0.24rem;
          color: #56fff9;
          font-weight: bold;
        }
        .name {
          width: 1.9rem;
        }
        .score {
          width: 1.9rem;
        }
        .scoreTop {
          width: 1.5rem;
        }
        .bar {
          flex: 1;
        }
      }
      .item {
        span {
          color: #b7fff1;
          font-size: 0.24rem;
          font-weight: 500;
        }
        .bar {
          .fc {
            font-size: 0.24rem;
            color: #ffffd0;
          }
          em {
            font-size: 0.24rem;
          }
        }
      }
    }
  }
}
.wards {
  width: 6.94rem;
  height: 3.57rem;
  background: url(../assets/img/wards.png);
  background-size: 100% 100%;
  margin: 0 auto;
}
</style>
