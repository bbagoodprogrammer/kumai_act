<template>
  <div class="taskListBox">
    <div class="taskList">
      <div class="taskListTitle"></div>
      <div class="kTisksList">
        <div class="kTiskTitle">K房任務限定在新人專屬K房（{{roomId}}）完成</div>
        <div class="list">
          <div class="listTab"></div>
          <div class="listItem">
            <div class="item" v-for="(item,index) in kTasks" :key=index :class="{cloud:item.status === 1}">
              <span class="taskName">{{item.name}}</span>
              <span class="jifen">{{item.score}}</span>
              <span class="wcTask">{{item.finished}}/{{item.count}}</span>
              <span class="taskStatus">
                <em v-if="item.status === 0">未完成</em>
                <em v-if="item.status === 1" class="receivable" @click="complete(item.id,item.status)"></em>
                <em v-if="item.status === 2" class="receivabled"></em>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="otherList">
        <div class="list">
          <div class="listTab"></div>
          <div class="listItem">
            <div class="item" v-for="(item,index) in comTasks" :key=index :class="{cloud:item.status === 1}">
              <span class="taskName">{{item.name}}</span>
              <span class="jifen">{{item.score}}</span>
              <span class="wcTask">{{item.finished}}/{{item.count}}</span>
              <span class="taskStatus">
                <em v-if="item.status === 0">未完成</em>
                <em v-if="item.status === 1" class="receivable" @click="complete(item.id,item.status)"></em>
                <em v-if="item.status === 2" class="receivabled"></em>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="myScore">當前積分：{{score}}</div>
    </div>
    <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import MsgToast from "../components/commonToast"

import api from '../api/apiConfig'
export default {
  components: { MsgToast },
  data() {
    return {
      kRoomTask: ['kmic_start', 'sendKTVGift', 'online', "online10"],
      comTasks: [],
      tastMsg: '',
      showT: false
    }
  },
  watch: {
    tasks(val) { //深复制数组
      this.comTasks = JSON.parse(JSON.stringify(this.tasks))
    }
  },
  computed: {
    ...mapState(['tasks', 'score', "roomId", "activeityState"]),
    kTasks() {
      var kTasksArr = []
      this.kRoomTask.forEach(element => {
        this.comTasks.forEach((element2, index) => {
          if (element2.id === element) {
            kTasksArr.push(element2)
            this.comTasks.splice(index, 1)
          }
        })
      });
      return kTasksArr
    }
  },
  methods: {
    complete(id, status) {
      if (this.activeityState === 0) { //活动未开始
        this.tastMsg = '活动未开始！'
        this.showT = true
      } else if (this.activeityState === 2) { //活动jieshu 
        this.tastMsg = '活动已结束！'
        this.showT = true
      } else if (status === 1) {//可以领取
        api.completeTask(id).then((res) => {
          if (res.data.response_status.code === 0) { //请求成功，更新积分，更改任务状态
            var newTask = JSON.parse(JSON.stringify(this.tasks))
            for (var i = 0; i < newTask.length; i++) {
              if (newTask[i].id == id) {
                newTask[i].status = 2
              }
            }
            this.$store.commit('changTasks', newTask)
            var newScore = res.data.response_data.score
            this.$store.commit('changScore', newScore)
          } else if (res.data.response_status.code === 20006) { //任务未完成
            this.tastMsg = '任务未完成！'
            this.showT = true
          } else if (res.data.response_status.code === 20007) { //任务未完成
            this.tastMsg = '已經領取過了！'
            this.showT = true
          }
        })
      }
    },
    closeToast() {
      this.showT = false
    }
  }
}

</script>
<style lang="scss">
.taskListBox {
  width: 6.89rem;
  padding-bottom: 1.21rem;
  margin: 0.5rem auto 0;
  .taskList {
    border: 0.03rem solid rgba(1, 115, 255, 1);
    border-radius: 0.25rem 0.25rem 0 0;
    background: #c6f6ff;
    position: relative;
    .taskListTitle {
      width: 6.9rem;
      height: 0.92rem;
      position: absolute;
      top: -0.45rem;
      left: -0.04rem;
      background: url(../assets/img/taskTitle.png) no-repeat;
      background-size: 100% 100%;
    }
    .kTisksList {
      margin-top: 0.45rem;
      .kTiskTitle {
        height: 0.61rem;
        color: #4178bb;
        font-size: 80%;
        text-align: center;
        line-height: 0.61rem;
      }
      .list {
        .listTab {
          width: 6.01rem;
          height: 0.64rem;
          margin: 0 auto;
          background: url(../assets/img/KTaskTab.png) no-repeat;
          background-size: 100% 100%;
        }
        .listItem {
          margin: 0.29rem 0 0.25rem;
          .item {
            width: 6.01rem;
            height: 0.68rem;
            margin: 0 auto;
            display: flex;
            border-bottom: 0.01rem solid #8ab6dc;
            background-color: #d9f9ff;
            span {
              text-align: center;
              font-size: 70%;
              color: #4178bb;
              display: flex;
              align-items: center;
              justify-content: center;
              border-right: 0.01rem solid #8ab6dc;
            }
            .taskName {
              width: 2.5rem;
              padding-left: 0.2rem;
              text-align: left;
              font-weight: bold;
              justify-content: flex-start;
            }
            .jifen {
              width: 1rem;
            }
            .wcTask {
              width: 1.4rem;
            }
            .taskStatus {
              flex: 1;
              border-right: 0;
              em {
                font-size: 75%;
                &.receivable {
                  display: inline-block;
                  width: 0.67rem;
                  height: 0.32rem;
                  background: url(../assets/img/receivable.png);
                  background-size: 100% 100%;
                }
                &.receivabled {
                  display: inline-block;
                  width: 0.79rem;
                  height: 0.32rem;
                  background: url(../assets/img/receivabled.png);
                  background-size: 100% 100%;
                }
              }
            }
          }
          .item:last-child {
            border-bottom: 0;
          }
        }
      }
    }
    .otherList {
      .otherTitle {
        width: 6.01rem;
        height: 0.64rem;
        margin: 0 auto;
      }
      .list {
        .listTab {
          width: 6.01rem;
          height: 0.64rem;
          margin: 0 auto;
          background: url(../assets/img/otherTitle.png) no-repeat;
          background-size: 100% 100%;
        }
        .listItem {
          margin: 0.29rem 0 0.25rem;
          .item {
            width: 6.01rem;
            height: 0.68rem;
            margin: 0 auto;
            display: flex;
            border-bottom: 0.01rem solid #8ab6dc;
            background-color: #d9f9ff;
            span {
              text-align: center;
              font-size: 70%;
              color: #4178bb;
              display: flex;
              align-items: center;
              justify-content: center;
              border-right: 0.01rem solid #8ab6dc;
            }
            .taskName {
              width: 2.5rem;
              padding-left: 0.2rem;
              text-align: left;
              font-weight: bold;
              justify-content: flex-start;
            }
            .jifen {
              width: 1rem;
            }
            .wcTask {
              width: 1.4rem;
            }
            .taskStatus {
              flex: 1;
              border-right: 0;
              em {
                font-size: 75%;
                &.receivable {
                  display: inline-block;
                  width: 0.67rem;
                  height: 0.32rem;
                  background: url(../assets/img/receivable.png);
                  background-size: 100% 100%;
                }
                &.receivabled {
                  display: inline-block;
                  width: 0.79rem;
                  height: 0.32rem;
                  background: url(../assets/img/receivabled.png);
                  background-size: 100% 100%;
                }
              }
            }
          }
          .item:last-child {
            border-bottom: 0;
          }
        }
      }
    }
    .myScore {
      height: 0.68rem;
      text-align: center;
      font-size: 120%;
      line-height: 0.68rem;
      color: #4178bb;
      background: #d9f9ff;
    }
  }
}
</style>
