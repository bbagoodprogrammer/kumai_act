<template>
  <div class="dayTasks">
    <div class="taskList">
      <div class="taskTitle">
        <span class="name">{{lang.todayTask}}</span>
        <span class="num"> {{lang.todayNum}}</span>
        <span class="bar">{{lang.bar}}</span>
      </div>
      <ul>
        <li v-for="(item,index) in schule" :key="index" :class="{suc:item.status==2}">
          <span class="name">{{item.desc}}</span>
          <span class="num"> {{item.chance}}</span>
          <span class="bar">
            <em v-if=" item.schule >= item.limit">{{lang.suc}}</em>
            <em v-else>{{item.schule}}/{{item.limit}}</em>
          </span>
        </li>
      </ul>
    </div>
    <div class="userBar">
      <div class="userImg">
        <img v-lazy="userMsg.avatar" alt="">
      </div>
      <div class="barBox">
        <div class="bar">
          <div class="actBat" :style="{width:(continuous - 1)/4*100+'%'}"></div>
          <span v-for="(item,index) in 5" :key="index" :class="[{act:continuous >= index+1},'spot'+index]">
            <i>{{index+1}}{{lang.day}}</i>
          </span>
        </div>
      </div>
      <img src="../assets/img/carImg.png" alt="" class="carImg">
    </div>
    <div class="barTips">
      <p class="tips">{{lang.tips1}}</p>
    </div>
    <div class="recharge">
      <div class="tips">
        <h3>{{lang.rechargeTitle}}<span>{{lang.rechargeToday.replace('X',charge)}}</span></h3>
        <p>{{lang.rechargeTips}}</p>
      </div>
      <div class="rechargeBtn" @click="goStored()">{{lang.goRecharge}}</div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      actIndex: 2
    }
  },
  computed: {
    ...mapState(['continuous', 'schule', 'isShare', 'charge', 'userMsg'])
  },
  methods: {
    goStored() {
      if (!this.isShare) {
        location.href = "walletConfig://"
      } else {
        APP()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.dayTasks {
  width: 7.19rem;
  height: 9.29rem;
  background: url(../assets/img/tabBg.png);
  background-size: 100% 100%;
  margin: 0.14rem auto;
  padding-top: 0.5rem;
  .taskList {
    width: 6.49rem;
    height: 5.01rem;
    margin: 0 auto;
    background: url(../assets/img/shadow.png);
    background-size: 100% 100%;
    padding: 0.1rem 0.23rem 0 0.18rem;
    .taskTitle {
      font-size: 0.24rem;
      font-weight: 500;
      color: #d36b38;
      height: 0.45rem;
      display: flex;
      align-items: center;
      text-align: center;
      line-height: 0.2rem;
      .name {
        width: 4.5rem;
        text-align: left;
      }
      .num {
        width: 1.1rem;
      }
      .bar {
        flex: 1;
      }
    }
    ul {
      li {
        font-size: 0.2rem;
        min-height: 0.32rem;
        color: #ffeac6;
        display: flex;
        align-items: center;
        text-align: center;
        margin-bottom: 0.05rem;
        &.suc {
          color: #ffe49a;
        }
        .name {
          width: 4.5rem;
          text-align: left;
        }
        .num {
          width: 1.1rem;
        }
        .bar {
          width: 1rem;
          em {
            font-size: 0.2rem;
          }
        }
      }
    }
  }
  .userBar {
    width: 7.04rem;
    height: 1.28rem;
    margin: 0.14rem auto 0;
    background: url(../assets/img/barBg.png);
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    .userImg {
      margin-left: 0.11rem;
      img {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        border: 0.03rem solid #e78700;
      }
    }
    .barBox {
      width: 3.9rem;
      margin-left: 0.09rem;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-top: 0.4rem;
      .bar {
        width: 3.9rem;
        height: 0.1rem;
        background: rgba(98, 40, 19, 1);
        border-radius: 0.05rem;
        position: relative;
        .actBat {
          max-width: 100%;
          height: 0.1rem;
          background: #e78700;
          border-radius: 0.05rem;
          position: absolute;
          left: 0;
          top: 0;
        }
        span {
          display: block;
          width: 0.18rem;
          height: 0.18rem;
          background: rgba(98, 40, 19, 1);
          border-radius: 50%;
          position: absolute;
          top: -0.04rem;
          i {
            font-size: 0.24rem;
            color: #622813;
            font-weight: 700;
            white-space: nowrap;
            position: absolute;
            top: -0.35rem;
            left: -0.09rem;
          }
          &.act {
            background: #e78700;
            i {
              color: #e78700;
            }
          }
          &.spot1 {
            left: 0.93rem;
          }
          &.spot2 {
            left: 1.86rem;
          }
          &.spot3 {
            left: 2.79rem;
          }
          &.spot4 {
            right: 0rem;
          }
        }
      }
      .tips {
        margin-top: 0.1rem;
        font-size: 0.22rem;
        font-weight: 500;
        color: #e78700;
        line-height: 0.25rem;
      }
    }
  }
  .barTips {
    padding: 0 0.15rem;
    .tips {
      font-size: 0.22rem;
      color: #9d6a58;
    }
  }
  .recharge {
    display: flex;
    align-items: center;
    padding: 0 0.19rem;
    .tips {
      width: 4.1rem;
      h3 {
        width: 7.15rem;
        font-size: 0.34rem;
        color: #fddd4e;
        span {
          font-size: 0.24rem;
          color: #fddd4e;
          font-weight: 500;
          margin-left: 0.05rem;
        }
      }
      p {
        font-size: 0.2rem;
        color: #fffd93;
        font-weight: 500;
        line-height: 0.25rem;
      }
    }
    .rechargeBtn {
      width: 2.32rem;
      height: 0.88rem;
      margin: 0.3rem 0 0 0.25rem;
      background: url(../assets/img/rechargeBtn.png);
      background-size: 100% 100%;
      text-align: center;
      font-size: 0.32rem;
      line-height: 0.88rem;
      color: rgba(255, 240, 157, 1);
      -webkit-text-stroke: 0.7px #6d2c06;
      text-stroke: 0.7px #6d2c06;
    }
  }
  .carImg {
    width: 1.59rem;
    height: 1.11rem;
    margin-left: 0.15rem;
  }
}
</style>
