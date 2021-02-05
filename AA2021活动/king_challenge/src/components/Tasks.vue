<template>
  <div class="tasks">
    <div class="taskCon">
      <div class="nowDayTaskTips">
        <span> 完成每日簽到任務領取豐厚獎勵</span>
        <span class="history">獎勵記錄></span>
      </div>
      <div class="userStatus">
        <img v-lazy="" alt="">
        <div class="userMsg">
          <div class="nick">xxxx</div>
          <span class="lv">白金段位</span>
        </div>
        <div class="singUpNums">
          <span>已累計簽到1天</span>
          <span>已連續簽到1天</span>
        </div>
      </div>
      <div class="nowDayTask">
        <span class="tips">今日簽到任務</span>
        <span class="desc">{{nowDayTask?nowDayTask.desc:''}}</span>
      </div>
      <div class="dayList">
        <div class="dayItem" v-for="(item,index) in task" :key="index">
          <div class="sing_ed" v-if="item.finish">已簽到</div>
          <div class="sing_not" v-else-if="!item.finish && index < nowDay_index">未簽到</div>
          <div class="taskMsg" v-else>
            <div class="dayNums">第{{item.task_id}}天</div>
            <img :src="item.img" alt="" class="giftImg">
            <div class="giftName">{{item.name}}</div>
            <div class="schule">
              <strong>{{item.schule}}/{{item.limit}}</strong>
              <span class="actLiner" :style="{width:item.schule /item.limit *100+'%' }"></span>
            </div>
          </div>

        </div>
      </div>
      <div class="singUpGift">
        <div class="title">連續簽到獎勵</div>
        <div class="giftArr">
          <div class="giftItem" v-for="(item,index) in boxGiftArr" :key="index">
            <img :src="item.img" alt="">
            <strong>連續簽到{{index}}天</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      boxGiftArr: {
        3: {
          img: require('../img/boxImg/box_1.png')
        },
        5: {
          img: require('../img/boxImg/box_2.png')
        },
        7: {
          img: require('../img/boxImg/box_3.png')
        }
      }
    }
  },
  computed: {
    ...mapState(['task']),
    nowDayTask() {
      for (let i in this.task) {
        if (this.task[i].today) {
          return this.task[i]
        }
      }
    },
    nowDay_index() {
      for (let i in this.task) {
        if (this.task[i].today) {
          return i
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.tasks {
  width: 7.02rem;
  height: 12.09rem;
  background: linear-gradient(180deg, #f8db5d, #f8db5d, #99c28c);
  border: 0.02rem solid #830943;
  border-radius: 0.28rem;
  margin: 0 auto;
  padding-top: 0.21rem;
  .taskCon {
    width: 6.66rem;
    height: 11.9rem;
    background: #fff2d8;
    border: 0.02rem solid #830943;
    border-radius: 0.16rem;
    margin: 0 auto;
  }
  .nowDayTaskTips {
    width: 6.33rem;
    height: 0.82rem;
    color: rgba(131, 9, 67, 1);
    font-size: 0.26rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px dashed rgba(131, 9, 67, 1);
    .history {
      color: rgba(231, 114, 19, 1);
    }
  }
  .userStatus {
    height: 1.2rem;
    display: flex;
    align-items: center;
    color: rgba(131, 9, 67, 1);
    > img {
      width: 0.88rem;
      height: 0.88rem;
      border-radius: 50%;
      margin: 0 0.15rem 0 0.25rem;
    }
    .userMsg {
      width: 3rem;
      .nick {
        font-size: 0.26rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .lv {
        display: inline-block;
        font-size: 0.2rem;
        padding: 0 0.1rem;
        height: 0.32rem;
        background: #f8db5d;
        border: 0.02rem solid #830943;
        border-radius: 0.05rem;
        text-align: center;
        line-height: 0.32rem;
        margin-top: 0.1rem;
      }
    }
    .singUpNums {
      padding-right: 0.24rem;
      flex: 1;
      text-align: right;
      span {
        display: block;
        font-size: 0.22rem;
      }
      span:first-child {
        margin-bottom: 0.1rem;
      }
    }
  }
  .nowDayTask {
    margin: 0.3rem auto 0;
    padding: 0 0.25rem;
    width: 5.66rem;
    height: 0.88rem;
    background: url(../img/nowDayTask.png);
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: rgba(131, 9, 67, 1);
    font-size: 0.28rem;
    .tips {
      width: 1.9rem;
      text-align: center;
    }
    .desc {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
  }
  .dayList {
    height: 4.99rem;
    padding: 0 0.2rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 0.2rem;
    .dayItem {
      width: 1.12rem;
      height: 2.2rem;
      padding: 0.1rem 0;
      background: #ffe9bd;
      border: 0.02rem solid #830943;
      border-radius: 0.12rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      font-size: 0.22rem;
      .giftImg {
        display: block;
        width: 0.75rem;
        height: 0.75rem;
        margin: 0.1rem 0;
      }
      .schule {
        width: 0.91rem;
        height: 0.32rem;
        background: #fff2d8;
        border: 0.02rem solid #830943;
        border-radius: 0.08rem;
        text-align: center;
        line-height: 0.32rem;
        position: relative;
        strong {
          position: relative;
          z-index: 1;
        }
        .actLiner {
          display: block;
          height: 100%;
          border-radius: 0.08rem;
          background: rgba(250, 233, 101, 1);
          position: absolute;
          left: 0;
          top: 0;
        }
      }
      .taskMsg {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .giftName {
          height: 0.7rem;
          font-size: 0.2rem;
          text-align: center;
        }
      }
    }
  }
  .singUpGift {
    .title {
      margin: 0.4rem 0 0.3rem 0;
      text-indent: 0.22rem;
    }
    .giftArr {
      padding: 0 0.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 0.2rem;
      .giftItem {
        img {
          width: 0.88rem;
          height: 0.92rem;
          display: block;
          margin: 0 auto;
        }
        strong {
          font-size: 0.22rem;
          display: block;
          text-align: center;
          margin-top: 0.23rem;
        }
      }
    }
  }
}
</style>
