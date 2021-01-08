<template>
  <div class="taskItem" v-if="index == tab_index">
    <login-task :top_mission="task.top_mission" v-if="task.top_mission.mission_id" />
    <h3 class="dayTasksTitle" v-if="task.missions">{{lang.dayTasksTitle}}</h3>
    <div class="dayTasks" v-for="(item,index) in task.missions" :key="index">
      <div class="dayTaskItem" :class="{loaded:item.status == 2}">
        <h3>{{item.tips}} <span>{{item.rate}}/{{item.target}}</span> </h3>
        <div class="loginGift">
          <span class="loginGiftItem" v-for="(item2,index2) in item.prizes" :key="index2">
            <img :src="item2.prize_icon" alt="">
            <strong>{{item2.prize_name}}</strong>
          </span>
        </div>
        <div class="noSuc" v-if="item.status ==0">{{lang.noSuc}}</div>
        <div class="loginBtn" v-else-if="item.status ==1" @click="getRevGift(item.status,item.mission_id,false,index)">{{lang.receive}}</div>
        <div class="stamp"></div>
      </div>
    </div>
    <div v-if="dayLoading" class="scrollLoading">{{lang.loading}}</div>
    <div v-if="tab_index > current_index" class="dengdai">{{lang.open}}</div>
    <div class="mask" v-show="showT">
      <transition name="slide">
        <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
import MsgToast from "../components/commonToast"
import api from "../api/apiConfig"
import LoginTask from "./LoginTask"
import { globalBus } from '../utils/eventBus'
export default {
  components: { MsgToast, LoginTask },
  props: ['index'],
  data() {
    return {
      showAni: false,
      tastMsg: '',
      showT: false
    }
  },
  computed: {
    ...mapState(['giftGroups', 'current_index', 'tab_index', 'dayLoading']),
    task() {
      const rankConf = this.giftGroups[this.tab_index] || {
        top_mission: {},
        mission: {}
      };
      return rankConf;
    }
  },
  methods: {
    getRevGift(status, mission_id, isLogin, index) {
      globalBus.$emit('commonEvent', () => {
        if (this.tab_index != this.current_index) {
          this.tastMsg = this.lang.noDayRev
          this.showT = true
          return
        }
        if (status == 1) {
          api.getTaskGift(mission_id).then(res => {
            const { response_status, response_data } = res.data
            if (response_status.code == 0) {
              let obj = {
                isLogin: isLogin,
              }
              if (index != undefined) {
                obj.index = index
              }
              this.vxc('setTaskState', obj)
            } else {
              this.tastMsg = response_status.error
              this.showT = true
            }
          })
        }
      })
    },
    closeToast() {
      this.showT = false
    }
  }
}
</script>
<style lang="scss" scoped>
.taskItem {
  position: relative;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  -webkit-overflow-scrolling: auto;
  height: 10.5rem;
  flex: 1;
  .loginTask,
  .dayTaskItem {
    width: 5.72rem;
    height: 3.01rem;
    background: url(../assets/img/loginBg.png);
    background-size: 100% 100%;
    position: relative;
    -webkit-backface-visibility: hidden;
    &.loaded .stamp:after {
      opacity: 0.75;
      transform: rotate(0deg) scale(1);
      z-index: 10;
    }
    .stamp {
      width: 5.72rem;
      height: 3.01rem;
      z-index: 10;
      position: absolute;
      left: 0;
      top: 0;
      &:after {
        content: ""; //Draft
        opacity: 0;
        position: absolute;
        width: 1.81rem;
        height: 1.22rem;
        background: url(../assets/img/ed.png);
        background-size: 100% 100%;
        margin: 0 auto;
        bottom: -0.1rem;
        right: -0.2rem;
        text-transform: uppercase;
        opacity: 0;
        transform-origin: 50% 50%;
        transform: rotate(-15deg) scale(5);
        transition: all 0.3s cubic-bezier(0.6, 0.04, 0.98, 0.335);
      }
    }
    h3 {
      font-weight: 600;
      text-align: center;
      line-height: 0.7rem;
      height: 0.6rem;
    }
    .loginGift {
      height: 1.55rem;
      padding: 0 0.61rem;
      // margin-top: 0.15rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .loginGiftItem {
        width: 1rem;
        height: 1rem;
        background: url(../assets/img/giftBg.png);
        background-size: 100% 100%;
        margin-top: -0.3rem;
        img {
          display: block;
          width: 0.9rem;
          height: 0.9rem;
          margin: 0.05rem auto;
        }
        strong {
          display: block;
          text-align: center;
          width: 1.6rem;
          height: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: -0.3rem;
          font-weight: 500;
          color: #fffddb;
          font-size: 0.24rem;
          line-height: 0.25rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
    }
    .loginBtn,
    .noSuc {
      width: 1.64rem;
      height: 0.66rem;
      background: url(../assets/img/rev.png);
      background-size: 100% 100%;
      text-align: center;
      margin: 0.1rem auto 0;
      font-size: 0.28rem;
      font-weight: 500;
      position: relative;
      z-index: 20;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 0.1rem;
      line-height: 0.25rem;
    }
    .noSuc {
      background: url(../assets/img/receiveBg.png);
      background-size: 100% 100%;
    }
  }
  .dayTasksTitle {
    font-weight: 700;
    color: #fff583;
    font-size: 0.32rem;
    text-align: center;
    margin-top: 0.2rem;
  }
  .dayTasks {
    margin-top: 0.14rem;
    .dayTaskItem {
      background: url(../assets/img/dayTasks.png);
      background-size: 100% 100%;
      position: relative;
      margin-top: 0.14rem;
      h3 {
        font-weight: 500;
        font-size: 0.26rem;
        padding: 0 0.25rem;
        line-height: 0.7rem;
        height: 0.6rem;
        display: flex;
        justify-content: space-between;
        white-space: nowrap;
        letter-spacing: -0.025rem;
        span {
          color: #fff195;
          font-size: 0.28rem;
          font-weight: 600;
        }
      }
    }
  }
  .scrollLoading {
    text-align: center;
    font-weight: 600;
  }
}
</style>
