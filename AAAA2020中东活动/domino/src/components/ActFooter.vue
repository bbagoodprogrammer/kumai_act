<template>
  <div class="footerBar">
    <div class="acrStatus">
      <span class="noAct" v-if="astState === 0">{{lang.noAct}}</span>
      <span class="noAct" v-if="astState === 1">{{lang.actEd}}</span>
      <span class="goAct" v-if="astState === 2" @click="goSingUp()">تسجيل اللعبة</span>
      <div class="actIng" v-if="astState === 3">
        <img v-lazy="myMsg.avatar" alt="" class="av">
        <div class="userMsg">
          <div class="name">{{myMsg.nick}}</div>
          <div class="uid">{{myMsg.uid}}</div>
        </div>
        <div class="score">الدرجة التي وصلت إليها: {{myMsg.level}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { globalBus } from '../utils/eventBus'
import api from "../api/apiConfig"
export default {
  computed: {
    ...mapState(['actStatus', 'userMsg', "isShare", "groupsUserMsg", "tab", "singUp"]),
    astState() {
      if (this.actStatus == 0) {
        //活動未開始
        return 0
      } else if (this.actStatus == 2) {
        //活動已結束
        return 1
      } else if (this.isShare || !this.singUp) {
        return 2
      } else if (this.singUp) { //已报名
        return 3
      }
    },
    myMsg() {
      if (this.groupsUserMsg[this.tab]) {
        return this.groupsUserMsg[this.tab].msg
      }
      return {}
    }
  },
  methods: {
    goSingUp() {
      globalBus.$emit('commonEvent', () => {
        api.singUp().then((res) => {
          const { response_data, response_status } = res.data
          if (response_status.code === 0) {  //报名成功
            this.vxc("setSingUp", true)
            this.$parent.getDefaultData()
          } else {
            this.toast(response_status.error)
          }
        })
      })
    },
  }
}
</script>
<style lang="scss">
.footerBar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
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
      font-size: 0.36rem;
      font-weight: 500;
    }
    .goAct {
      display: block;
      width: 3.66rem;
      height: 0.9rem;
      background: url(../assets/img/singUp.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.9rem;
      font-weight: 500;
      text-shadow: #ce4eb3 0.03rem 0 0, #ce4eb3 0 0.03rem 0,
        #ce4eb3 -0.03rem 0 0, #ce4eb3 0 -0.03rem 0;
    }
    .actIng {
      width: 7.5rem;
      display: flex;
      align-items: center;
      .av {
        width: 1rem;
        height: 1rem;
        border: 0.04rem solid rgba(154, 93, 255, 1);
        box-sizing: border-box;
        border-radius: 50%;
        margin: 0 0.47rem 0 0.27rem;
      }
      .userMsg {
        width: 2.4rem;
        .name {
          color: #c1f7ff;
          max-width: 2.4rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .uid {
          font-size: 0.24rem;
          color: #aa84ff;
          font-weight: 500;
        }
      }
      .score {
        font-size: 0.36rem;
        color: #fd70d9;
        margin-top: 0.15rem;
      }
    }
  }
}
</style>
