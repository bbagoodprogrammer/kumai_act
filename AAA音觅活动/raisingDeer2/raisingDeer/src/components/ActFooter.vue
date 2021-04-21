<template>
  <div class="footerBar">
    <div class="acrStatus" :class="{noSingUp:astState === 0}">
      <span class="noAct" v-if="astState === 0">{{lang.noAct}}</span>
      <span class="noAct" v-if="astState === 2">{{lang.actEd}}</span>
      <span class="goAct" v-if="astState === 1" @click="singUp()">
        <p>還沒領取鹿寶寶哦~</p>
        <div class="singUpBtn">點擊馬上領取</div>
      </span>
      <span class="actIng" v-if="astState === 3">
        <div class="rank" :class="{minf:userMsg.rank == 0}">{{userMsg.rank == 0 ||userMsg.rank >100 ?'100+':userMsg.rank}}</div>
        <img v-lazy="userMsg.avatar" alt="" class="userAvatar">
        <div class="nick">{{userMsg.nick}}</div>
        <div class="deerLv" v-if="userMsg.deer_level">
          <img :src="require(`../assets/img/rankDeer/deer${userMsg.deer_level}.png`)" alt="" class="userDeer" :class="'deer'+userMsg.deer_level">
        </div>
        <div class="score">
          <em>成長值</em>
          <strong>{{userMsg.deer_exp}}</strong>
        </div>
      </span>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { globalBus } from '../utils/eventBus'
import api from "../api/apiConfig"
export default {
  computed: {
    ...mapState(['actStatus', 'userMsg', "isShare"]),
    astState() {
      if (this.actStatus === 0) { //活动未开始
        return 0
      } else if (this.actStatus === 2) { //活动已结束
        return 2
      } else if (!this.userMsg.registered || this.isShare) { //活动开始未报名，或者分享
        return 1
      } else if (this.userMsg.registered) { //活动开始已报名
        return 3
      }
    }
  },
  methods: {
    singUp(uid) {
      globalBus.$emit('commonEvent', () => {
        api.singUp(uid).then(res => {
          const { response_status, response_data } = res.data
          if (response_status.code == 0) {
            const { user_info, land_infos } = response_data
            this.vxc('setUserMsg', user_info)
            this.vxc('setLandInfo', land_infos)
            this.vxc('setToast', {
              msg: `領取水瓶，為鹿寶寶種食物吧！`,
              title: require('../assets/img/pupImg/getDeerSuc.png'),
            })
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
    height: 1.27rem;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(../assets/img/footer1.png) no-repeat;
    background-size: 100% 100%;
    &.noSingUp {
      height: 1.66rem;
      background: url(../assets/img/footer2.png) no-repeat;
      background-size: 100% 100%;
    }
    span {
      display: inline-block;
    }
    .goAct {
      p {
        font-size: 0.24rem;
        color: #014b41;
        text-align: center;
      }
      .singUpBtn {
        width: 2.8rem;
        height: 0.75rem;
        background: url(../assets/img/singUpBtn3.png);
        background-size: 100% 100%;
        text-align: center;
        line-height: 0.75rem;
        font-weight: 800;
      }
    }
    .actIng {
      // height: 0.95rem;
      // margin-bottom: 0.11rem
      // display:flex;
      // align-items: center;
      width: 7.5rem;
      display: flex;
      align-items: center;
      margin-top: 0.2rem;
      .rank {
        width: 1.3rem;
        text-align: center;
        font-size: 0.42rem;
        color: #014b41;
        font-weight: 800;
        margin-left: 0.15rem;
        &.minf {
          font-size: 0.22rem;
        }
      }
      .userAvatar {
        width: 0.65rem;
        height: 0.65rem;
        border-radius: 50%;
        border: 0.02rem solid #f0f861;
      }
      .nick {
        font-weight: bold;
        font-size: 0.32rem;
        margin-left: 0.15rem;
        width: 2.5rem;
        max-width: 2.5rem;
        color: #014b41;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .deerLv {
        width: 0.8rem;
        height: 100%;
        margin: 0 0.1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        .userDeer {
          width: 0.9rem;
          height: 0.9rem;
        }
      }
      .score {
        width: 1.2rem;
        text-align: center;
        em {
          display: block;
          font-size: 0.22rem;
          color: #fff;
          font-weight: bold;
        }
        strong {
          font-size: 0.24rem;
          color: #014b41;
        }
      }
    }
  }
}
</style>
