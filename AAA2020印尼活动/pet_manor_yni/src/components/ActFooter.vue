<template>
  <div class="footer">
    <div class="noStart" v-if="showState ===0">
      Acara belum mulai
    </div>
    <div class="end" v-if="showState ===1">
      Acara udah selesai
    </div>
    <span class="singUp" @click="goSingUp()" v-if="showState===2">Mendaftar</span>
    <div class="list" v-if="showState ===3" :class="'rank'+myMsg.rank">
      <div class="rank" v-if="myMsg.rank > 0">{{myMsg.rank}}</div>
      <div class="noRank" v-else>Belum masuk Top</div>
      <img v-lazy="myMsg.avatar" alt="" class="av">
      <div class="nick"><strong>{{myMsg.nick}}</strong> <i v-if="myMsg.live">Live</i> </div>
      <div class="score" v-if="tab=='total'"> <i></i> <em>{{myMsg.score}}</em></div>
      <div class="score" v-else>
        <img :src="require(`../assets/img/pets/pet${tab}.png`)" alt="">
        <em>{{myMsg.score}}</em>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
import APP from "../utils/openApp"
import api from "../api/apiConfig"
import getDate from "../utils/getDate"
import getString from "../utils/getString"
import { globalBus } from '../utils/eventBus'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState(["groupsUserMsg", "actStatus", "tab", "isShare", "singUp"]),
    showState() {
      if (this.actStatus == 0) {
        //活動未開始
        return 0
      } else if (this.actStatus == 2) {
        //活動已結束
        return 1
      } else if (this.isShare || !this.singUp) {
        return 2
      } else {
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
            this.vxc("setSingUp", true) //是否報名
          } else {
            this.toast(response_status.error)
          }
        })
      })
    },
    closeToast() {
      this.showT = false
    }
  }
}
</script>
<style lang="scss">
.footer {
  height: 1.59rem;
  background: url(../assets/img/footer.png);
  background-size: 100% 100%;
  position: fixed;
  bottom: -0.1rem;
  left: 0;
  right: 0;
  z-index: 199;
  display: flex;
  align-items: center;
  justify-content: center;
  .noStart,
  .end {
    text-align: center;
    color: rgba(32, 88, 123, 1);
    margin-top: 0.3rem;
    font-size: 0.36rem;
    font-weight: 600;
  }
  .singUp {
    display: block;
    width: 2.9rem;
    height: 0.9rem;
    background: url(../assets/img/singUpBtn.png);
    background-size: 100% 100%;
    line-height: 0.9rem;
    text-align: center;
    color: #fff6ab;
    font-weight: 600;
    margin-top: 0.3rem;
    color: rgba(32, 88, 123, 1);
    font-size: 0.36rem;
  }
  .list {
    height: 1.13rem;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    position: relative;
    width: 7.5rem;
    .rank {
      width: 0.76rem;
      height: 0.65rem;
      color: rgba(212, 255, 232, 1);
      text-align: center;
      line-height: 0.65rem;
      margin-left: 0.08rem;
      font-weight: 600;
      white-space: nowrap;
    }
    .noRank {
      width: 0.76rem;
      margin-left: 0.08rem;
      text-align: center;
      font-size: 0.22rem;
      line-height: 0.25rem;
    }
    .av {
      width: 1rem;
      height: 1rem;
      border: 0.04rem solid rgba(32, 88, 123, 1);
      box-sizing: border-box;
      border-radius: 50%;
      margin-left: 0.2rem;
    }
    .nick {
      width: 2rem;
      margin-left: 0.17rem;
      display: flex;
      align-items: center;
      strong {
        font-size: 0.24rem;
        font-weight: 500;
        width: 1.66rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      i {
        width: 0.78rem;
        height: 0.33rem;
        text-align: center;
        line-height: 0.33rem;
        background: rgba(149, 246, 188, 1);
        color: rgba(32, 88, 123, 1);
        font-size: 0.24rem;
        margin-left: 0.07rem;
      }
    }
    .score {
      display: flex;
      align-items: center;
      margin-left: 0.92rem;
      color: rgba(255, 252, 161, 1);
      font-size: 0.24rem;
      font-weight: 500;
      img {
        width: 0.7rem;
        height: 0.7rem;
        margin-right: 0.19rem;
      }
      i {
        width: 0.4rem;
        height: 0.38rem;
        background: url(../assets/img/star.png);
        background-size: 100% 100%;
        margin-right: 0.09rem;
      }
    }
    &.rank1 {
      .rank {
        text-indent: -999rem;
        background: url(../assets/img/top1.png);
        background-size: 100% 100%;
      }
    }
    &.rank2 {
      .rank {
        text-indent: -999rem;
        background: url(../assets/img/top2.png);
        background-size: 100% 100%;
      }
    }
    &.rank3 {
      .rank {
        text-indent: -999rem;
        background: url(../assets/img/top3.png);
        background-size: 100% 100%;
      }
    }
  }
}
</style>
