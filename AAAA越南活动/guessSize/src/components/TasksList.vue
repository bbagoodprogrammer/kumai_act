<template>
  <div class="taskList">
    <div class="taskListCon">
      <i href="" class="close" @click="close()"></i>
      <p class="titale">Làm nhiệm vụ nhận thêm điểm</p>
      <div class="listToby">
        <span class="time">Nhiệm vụ</span>
        <span class="openres">Điểm</span>
        <span class="down">Tiến độ</span>
      </div>
      <ul class="list">
        <li v-for="(item,index) in tasksList" :key="index">
          <span class="time">
            <!-- <span class="taskName">{{taskName[item.task_name]}}</span> -->
            <span class="taskName">{{nameStr(item.task_name,item.step,item.task_list)}}</span>
            <span class="progress" v-if="item.task_list && item.task_list.length>1">
              <em v-for="(item2,index2) in item.task_list" :key="index2" :class="{wan:item.finish_count>=item2.counts}">
                {{item2.counts}} <i v-if="index2!==item.task_list.length-1">-</i>
              </em>
            </span>
          </span>
          <span class="openres">{{item.star}}</span>
          <span class="down" v-if="item.finish_count == item.task_count">
            <span class="wanc"></span>
          </span>
          <span class="down" v-else><i>{{item.finish_count}}</i>/{{item.task_count}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: ['tasksList'],
  data() {
    return {
      taskName: {
        publicWork: "Đăng X bài hát công khai",
        share: "Chia sẻ bài hát sang kênh khác",
        kmic_start: "Lên mic ở phòng Kara",
        online: "Vào phòng Kara X phút",
        radio_online: "Vào phòng Radio X phút",
        charge: "Nạp X xu",
        sendCoins: "Tặng X xu",
        KTVcharms: "Mị lực quà xu phòng Kara đạt X",
        SongCoinsCharm: "Mị lực quà xu bài hát đạt X"
      }
    }
  },
  methods: {
    nameStr(name, step, taskList) {
      return this.taskName[name].replace('X', taskList[step].counts)
    },
    close() {
      this.$emit('closeTaskList')
    }
  }
}
</script>
<style lang="scss">
.taskList {
  z-index: 10;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 13;
  background-color: rgba(0, 0, 0, 0.8);
  .taskListCon {
    width: 6.8rem;
    padding: 0.52rem 0.2rem;
    background-color: #0f2123;
    position: absolute;
    top: 1.8rem;
    left: 50%;
    transform: translate(-50%, 0);
    .close {
      display: block;
      width: 0.62rem;
      height: 0.62rem;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
      position: absolute;
      top: -1rem;
      right: 0rem;
    }
    .titale {
      font-size: 120%;
      color: #ffde5c;
      font-weight: bold;
      text-align: center;
    }
    .listToby {
      height: 0.74rem;
      line-height: 0.74rem;
      margin-top: 0.44rem;
      color: #22808a;
      display: flex;
      font-size: 90%;
      text-align: center;
      border-bottom: 0.01rem solid #205c63;
      span {
        margin-left: 0.08rem;
      }
      .time {
        width: 4rem;
        text-align: left;
        span {
          display: block;
        }
      }
      .openres {
        width: 0.98rem;
      }
      .down {
        width: 1.9rem;
        padding-left: 0.45rem;
      }
    }
    ul {
      height: 6rem;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch; //有回弹效果
      -webkit-overflow-scrolling: auto; //滑到哪停到哪
      li {
        min-height: 1rem;
        padding: 0.1rem 0;
        display: flex;
        align-items: center;
        font-size: 80%;
        text-align: center;
        color: #f3ef75;
        border-bottom: 0.01rem solid #205c63;
        span {
          margin-left: 0.08rem;
        }
        .time {
          width: 4rem;
          text-align: left;
          span {
            display: block;
            em {
              font-size: 80%;
              color: #fff;
            }
          }
          .progress {
            margin-top: 0.1rem;
            i {
              color: #905ae9;
            }
            .wan {
              color: #fff;
            }
            em {
              color: #39ffdc;
            }
          }
        }
        .openres {
          width: 0.98rem;
        }
        .down {
          width: 1.9rem;
          padding-left: 0.45rem;
          text-align: center;
          .wanc {
            display: inline-block;
            width: 0.44rem;
            height: 0.43rem;
            background: url(../assets/img/wanc.png);
            background-size: 100% 100%;
          }
          > i {
            color: #fff;
            font-size: 80%;
          }
        }
      }
    }
    ul::-webkit-scrollbar {
      width: 0.06rem;
      margin-left: 0.1rem;
    }
    ul::-webkit-scrollbar-thumb {
      background: #22808a;
    }
  }
}
</style>
