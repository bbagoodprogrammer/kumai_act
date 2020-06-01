<template>
  <div class="footerBar">
    <div class="acrStatus">
      <span class="noAct" v-if="astState === 0">{{lang.actNo}}</span>
      <span class="noAct" v-if="astState === 2">{{lang.acted}}</span>
      <span class="goAct" v-if="astState === 1">
        <em @click="showTaskTab()">{{lang.singUp}}</em>
      </span>
      <div class="acted" v-if="astState === 3">
        <div class="imgBox">
          <img src="../assets/img/imgDf.png" alt="" class="img1">
          <img v-lazy="initData.avatar" alt="" class="img2">
        </div>
        <div class="userMsg">
          <div class="name">{{initData.nick}}</div>
          <div class="card">{{lang.todayNum}} <i>{{initData.chance}}</i><em>({{lang.used}}{{initData.chanceUsed}}{{lang.ci}})</em> </div>
        </div>
        <div class="score">
          <strong>{{lang.todayScore}}</strong><em>{{initData.score}}</em>
        </div>
      </div>
    </div>
    <div class="mask" v-show="showTaskType">
      <transition name="slide">
        <div class="taskType" v-show="showTaskType">
          <div class="taskCon">
            <div class="taskTitle">{{lang.changTask}}</div>
            <p class="taskTips">{{lang.changOne2}}</p>
            <div class="tabs">
              <span :class="{act:taskType==2}" @click="tabClick(2)">{{lang.bigTask}}</span>
              <span :class="{act:taskType==1}" @click="tabClick(1)">{{lang.mTask}}</span>
            </div>
            <div class="type1" v-show="taskType==2">
              <p>{{lang.taskOne}}</p>
              <ul>
                <li v-for="(item,index) in initData.tasks.bking" :key="index">
                  <span class="taskName">{{item.name}}</span>
                  <span class="taskScore">{{item.score}}</span>
                </li>
              </ul>
            </div>
            <div class="type2" v-show="taskType==1">
              <p>{{lang.taskOne}}</p>
              <ul>
                <li v-for="(item,index) in initData.tasks.sking" :key="index">
                  <span class="taskName">{{item.name}}</span>
                  <span class="taskScore">{{item.score}}</span>
                </li>
              </ul>
            </div>
            <span class="queryBtn" @click="singUp()">
              <em v-if="taskType==2">{{lang.changBig}}</em>
              <em v-else>{{lang.changMid}}</em>
            </span>
          </div>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="showT">
      <transition name="slide">
        <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import api from "../api/apiConfig"
import { globalBus } from '../utils/eventBus'
import MsgToast from "../components/commonToast"
export default {
  components: { MsgToast },
  data() {
    return {
      taskType: 1,
      showTaskType: false,
      showT: false,
      tastMsg: '',
    }
  },
  watch: {
    initData(val) {
      this.taskType = val.model
    }
  },
  computed: {
    ...mapState(['actStatus', "isShare", "initData"]),
    astState() {
      if (this.actStatus === 0) { //活动未开始
        return 0
      } else if (this.actStatus === 2) { //活动已结束
        return 2
      } else if (!this.initData.registered || this.isShare) { //活动开始未报名，或者分享
        return 1
      } else if (this.initData.registered) { //活动开始已报名
        return 3
      }
    }
  },
  methods: {
    showTaskTab() {
      globalBus.$emit('commonEvent', () => {
        this.showTaskType = true
      })
    },
    singUp() {
      api.singUp(this.taskType).then(res => {
        if (res.data.response_status.code == 0) {
          this.vxc('setSingUp')
          this.showTaskType = false
          this.$parent.refrsh(2)
        } else {
          this.showTaskType = false
          this.tastMsg = res.data.response_status.error
          this.showT = true
        }
      })
    },
    tabClick(val) {
      this.taskType = val
      this.vxc('setTaskType', this.taskType)
    },
    closeToast() {
      this.showT = false
    }
  }
}
</script>
<style lang="scss">
.footerBar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  .acrStatus {
    width: 7.5rem;
    height: 1.26rem;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(../assets/img/footer.png) no-repeat;
    background-size: contain;
    span {
      display: inline-block;
    }
    .noAct {
      font-size: 0.36rem;
      font-weight: 600;
      color: #ffebb6;
    }
    .goAct {
      width: 7.5rem;
      height: 2.08rem;
      background: url(../assets/img/footerSingUpBg.png);
      background-size: 100% 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      em {
        display: block;
        width: 2.94rem;
        height: 0.9rem;
        background: url(../assets/img/singUpBt.png);
        background-size: 100% 100%;
        font-weight: 700;
        text-align: center;
        line-height: 0.85rem;
        margin: 1rem auto;
      }
    }
  }
  .acted {
    width: 7.5rem;
    display: flex;
    align-items: center;
    .imgBox {
      width: 1.11rem;
      height: 1.25rem;
      position: relative;
      margin-right: 0.27rem;
      .img1 {
        width: 1.11rem;
        height: 1.25rem;
        position: absolute;
        z-index: 3;
      }
      .img2 {
        width: 0.95rem;
        height: 0.95rem;
        border-radius: 50%;
        position: absolute;
        top: 0.26rem;
        left: 0.08rem;
      }
    }
    .userMsg {
      width: 4rem;
      margin-right: 0.08rem;
      .name {
        font-weight: 700;
        max-width: 4rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .card {
        font-size: 0.22rem;
        color: #fff4d7;
        display: flex;
        align-items: center;
        white-space: nowrap;
        i {
          color: #81ffd4;
          font-weight: bold;
          margin: 0 0.15rem;
        }
        em {
          color: #81ffd4;
          font-size: 0.24rem;
          font-weight: 500;
        }
      }
    }
    .score {
      width: 1.8rem;
      font-weight: 600;
      color: #fff4d7;
      font-size: 0.24rem;
      text-align: center;
      // margin-right: 0.25rem;
      em {
        display: block;
        font-weight: bold;
        color: #81ffd4;
      }
    }
  }
  .taskType {
    width: 6rem;
    height: 9rem;
    background: url(../assets/img/taskPupBg.png);
    background-size: 100% 100%;
    position: absolute;
    left: 0.8rem;
    top: 1rem;
    .taskCon {
      width: 5.45rem;
      height: 5.2rem;
      margin: 2.5rem auto 0;
      text-align: center;
      .taskTitle {
        // font-size: 0.28rem;
        font-weight: 600;
      }
      .taskTips {
        color: #fcf16a;
        font-size: 0.22rem;
        font-weight: 600;
      }
      .tabs {
        width: 4.68rem;
        height: 0.66rem;
        background: url(../assets/img/taskTab.png);
        background-size: 100% 100%;
        margin: 0.1rem auto;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          display: block;
          width: 2.45rem;
          height: 0.6rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 0.3rem;
          &.act {
            background: url(../assets/img/taskAct.png);
            background-size: 100% 100%;
          }
        }
      }
      .type1,
      .type2 {
        p {
          color: #fcf16a;
          font-weight: 600;
          font-size: 0.24rem;
        }
        ul {
          padding: 0 0.23rem;
          li {
            display: flex;
            justify-content: space-between;
            font-size: 0.21rem;
            font-weight: 500;
            color: #ffe8b2;
            .taskName {
              flex: 1;
              font-weight: 600;
            }
            .taskScore {
              width: 0.9rem;
              text-align: center;
            }
          }
        }
      }
      .queryBtn {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.26rem;
        width: 2.43rem;
        height: 0.8rem;
        font-weight: 800;
        background: url(../assets/img/openBtn.png);
        background-size: 100% 100%;
        position: absolute;
        bottom: -1.1rem;
        left: 1.51rem;
        line-height: 0.25rem;
        em {
          font-size: 0.26rem;
        }
      }
    }
  }
}
</style>
