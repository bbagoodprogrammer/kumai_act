<template>
  <div class="taskList">
    <i class="close" @click="closeTaskPup()"></i>
    <div class="title">每日任務</div>
    <p class="taskTips">以下任務均在K房多人娛樂分組模式下完成，每天可完成1次，任務數據0點刷新，私密K房不記錄數據</p>
    <div class="taskHeader">
      <span class="name">K房任務</span>
      <span class="ward">獎勵</span>
      <span class="bar">進度</span>
    </div>
    <ul class="list">
      <li v-for="(item,index) in taskList" :key="index">
        <div class="number">{{item.number}}</div>
        <div class="name">{{item.name}}</div>
        <div class="ward"><span><i :class="item.type"></i></span> <strong>{{item.ward}}</strong> </div>
        <div class="status" :class="{act:record.indexOf(index + 1) > -1}">{{record.indexOf(index +1) > -1?'已完成':'未完成'}}</div>
      </li>
    </ul>
    <p class="PS">PS：任務④中隊長與隊員組隊方為有效，完成任務後獎勵由係統自動發放</p>
  </div>
</template>
<script>
export default {
  props: ["record"],
  data() {
    return {
      taskList: [
        {
          number: '①',
          name: '連續上坐席5分鐘',
          ward: '20金豆',
          type: 'bean'
        },
        {
          number: '②',
          name: '收到任意金幣禮物',
          ward: 'VIP3天',
          type: 'vip'
        },
        {
          number: '③',
          name: '送出任意金幣禮物',
          ward: '赤鷹戰機座駕3天',
          type: 'car'
        },
        {
          number: '④',
          name: '給自己的任意戰隊加1積分',
          ward: '50金豆',
          type: 'bean'
        },
        {
          number: '⑤',
          name: '主持1次多人娛樂分組模式',
          ward: '紅玫瑰*1',
          type: 'fa'
        }
      ]
    }
  },
  methods: {
    closeTaskPup() {
      this.$parent.showTask = false
    }
  }
}
</script>
<style lang="scss">
.taskList {
  width: 6.75rem;
  height: 8.28rem;
  background: url(../assets/img/taskBg.png);
  background-size: 100% 100%;
  padding-top: 0.73rem;
  position: relative;
  margin-top: -0.6rem;
  .title {
    width: 4.08rem;
    height: 0.92rem;
    font-size: 0.48rem;
    font-weight: 600;
    text-align: center;
    line-height: 0.92rem;
    background: url(../assets/img/titleBg.png);
    background-size: 100% 100%;
    position: absolute;
    left: 1.34rem;
    top: -0.33rem;
  }
  .taskTips {
    font-size: 0.24rem;
    text-align: center;
    padding: 0 0.4rem;
    line-height: 0.38rem;
    opacity: 0.6;
  }
  .taskHeader {
    width: 6.62rem;
    height: 0.89rem;
    display: flex;
    align-items: center;
    text-align: center;
    color: rgba(211, 233, 255, 1);
    font-weight: 500;
    background: url(../assets/img/bar.png);
    background-size: 100% 100%;
    margin-top: 0.24rem;
    .name {
      width: 2.69rem;
    }
    .ward {
      width: 2.05rem;
    }
    .bar {
      flex: 1;
    }
  }
  .list {
    padding: 0 0.15rem;
    li {
      height: 0.98rem;
      display: flex;
      align-items: center;
      color: rgba(211, 233, 255, 1);
      font-size: 0.24rem;
      border-bottom: 1px solid #6b8dce;
      .number {
        margin: 0 0.13rem 0 0.29rem;
      }
      .name {
        width: 2rem;
      }
      .ward {
        text-align: center;
        width: 1.8rem;
        padding: 0 0.1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          width: 0.6rem;
          height: 0.6rem;
        }
        i {
          display: block;
          margin: 0 auto;
          width: 0.5rem;
          height: 0.5rem;
          &.bean {
            background: url(../assets/img/wards/bean.png);
            background-size: 100% 100%;
          }
          &.vip {
            width: 0.4rem;
            height: 0.4rem;
            background: url(../assets/img/wards/vip.png);
            background-size: 100% 100%;
          }
          &.fa {
            background: url(../assets/img/wards/fa.png);
            background-size: 100% 100%;
          }
          &.car {
            width: 0.6rem;
            height: 0.6rem;
            background: url(../assets/img/wards/car.png);
            background-size: 100% 100%;
          }
        }
        strong {
          flex: 1;
          font-size: 0.24rem;
          text-align: left;
          margin-left: 0.05rem;
        }
      }
      .status {
        width: 1.57rem;
        height: 0.74rem;
        margin-left: 0.2rem;
        background: url(../assets/img/status2.png);
        background-size: 100% 100%;
        font-size: 0.26rem;
        text-align: center;
        line-height: 0.64rem;
        color: #fff;
        text-shadow: rgba(45, 45, 45, 1) 0.02rem 0 0,
          rgba(45, 45, 45, 1) 0 0.02rem 0, rgba(45, 45, 45, 1) -0.02rem 0 0,
          rgba(45, 45, 45, 1) 0 -0.02rem 0;
        &.act {
          text-shadow: rgba(28, 81, 179, 1) 0.02rem 0 0,
            rgba(28, 81, 179, 1) 0 0.02rem 0, rgba(28, 81, 179, 1) -0.02rem 0 0,
            rgba(28, 81, 179, 1) 0 -0.02rem 0;
          background: url(../assets/img/status1.png);
          background-size: 100% 100%;
        }
      }
    }
  }
  .PS {
    text-align: center;
    color: rgba(105, 193, 255, 1);
    font-size: 0.24rem;
    margin-top: 0.18rem;
    padding: 0 0.4rem;
  }
  .close {
    display: block;
    width: 0.67rem;
    height: 0.67rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    bottom: -1rem;
    left: 2.8rem;
  }
}
</style>
