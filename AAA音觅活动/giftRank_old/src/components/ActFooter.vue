<template>
  <div class="footer" v-if="showState">
    <div class="noAct" v-if="showState ===1">
      {{lang.noAct}}
    </div>
    <div class="noAct" v-if="showState ===2">
      {{lang.actEd}}
    </div>
    <!-- <span class="singUp" @click="goSingUp()" v-if="showState ===2"></span> -->
    <div class="list" v-if="showState ===3 ">
      <div class="rank" v-if="myMsg.rank>0">{{myMsg.rank>100?'100+':myMsg.rank}}</div>
      <div class="noRank" v-else>未上榜</div>
      <img v-lazy="owner.avatar" alt="" class="av">
      <div class="nick">{{owner.nick}}</div>
      <div class="medals">
        <img :src="item2" v-for="(item2,index2) in owner.medals" :key="index2" alt="">
      </div>
      <div class="score">
        <strong>{{myMsg.score}}</strong>
        <em>(距上榜差 {{myMsg.uscore}}個)</em>
        <!-- <em v-else>(距上榜差 -- 個)</em> -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
import APP from "../utils/openApp"
import api from "../api/apiConfig"
import { globalBus } from '../utils/eventBus'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState(["groupsUserMsg", "actStatus", "isShare", "tab", "isSingUp", "owner", "gifts"]),
    showState() {
      if (this.actStatus == 0) {
        //活動未開始
        return 1
      } else if (this.actStatus == 2) {
        //活動已結束
        return 2
      } else if (this.isSingUp) { //已报名
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
            this.vxc('setToast', {
              title: '報名成功',
              msg: `收到${this.gifts[0].name}</br>或 ${this.gifts[1].name}即可上榜`,
              cb: this.$parent.getDefaultData
            })
          } else {
            this.toast(response_status.error)
          }
        })
      })
    }
  }
}
</script>
<style lang="scss">
.footer {
  height: 1.58rem;
  background: url(../assets/img/footer.png);
  background-size: 100% 100%;
  position: fixed;
  bottom: 0rem;
  left: 0;
  right: 0;
  z-index: 199;
  .noAct {
    text-align: center;
    margin: 0.68rem auto;
    color: #ffefd7;
  }
  .singUp {
    display: block;
    width: 2.8rem;
    height: 0.75rem;
    background: url(../assets/img/singUpBtn.png);
    background-size: 100% 100%;
    font-size: 0.36rem;
    font-weight: 800;
    line-height: 0.75rem;
    margin: 0.6rem auto;
    text-align: center;
  }
  .list {
    height: 1.28rem;
    margin-top: 0.3rem;
    display: flex;
    align-items: center;
    .rank {
      width: 1.12rem;
      line-height: 0.94rem;
      color: #014b41;
      text-align: center;
      font-weight: bold;
      font-size: 0.42rem;
    }
    .noRank {
      width: 1.12rem;
      color: #014b41;
      font-size: 0.28rem;
      white-space: nowrap;
      text-align: center;
    }
    .av {
      width: 0.65rem;
      height: 0.65rem;
      border: 0.02rem solid #f8fc6a;
      border-radius: 50%;
    }
    .nick {
      width: 1.7rem;
      max-width: 1.7rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-weight: bold;
      margin-left: 0.15rem;
    }
    .medals {
      width: 1.2rem;
      height: 0.35rem;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 0.34rem;
        height: 0.34rem;
      }
    }
    .score {
      margin-left: 0.15rem;
      strong {
        display: block;
        font-size: 0.18rem;
        font-weight: bold;
        text-align: center;
      }
      em {
        display: block;
        font-size: 0.26rem;
        font-weight: 500;
        text-align: center;
      }
    }
    &.rank1 {
      .rank {
        text-indent: -999rem;
        // background: url(../assets/img/top1.png);
        // background-size: 100% 100%;
      }
      .imgBg {
        width: 1.11rem;
        height: 1.25rem;
        position: absolute;
        top: -0.11rem;
        left: 0.06rem;
        // background: url(../assets/img/av1.png);
        // background-size: 100% 100%;
        z-index: 11;
      }
    }
    &.rank2 {
      .rank {
        // text-indent: -999rem;
        // background: url(../assets/img/top2.png);
        // background-size: 100% 100%;
      }
      .imgBg {
        width: 1.11rem;
        height: 1.25rem;
        position: absolute;
        top: -0.11rem;
        left: 0.06rem;
        // background: url(../assets/img/av2.png);
        // background-size: 100% 100%;
        z-index: 11;
      }
    }
    &.rank3 {
      .rank {
        text-indent: -999rem;
        // background: url(../assets/img/top3.png);
        // background-size: 100% 100%;
      }
      .imgBg {
        width: 1.11rem;
        height: 1.25rem;
        position: absolute;
        top: -0.11rem;
        left: 0.06rem;
        // background: url(../assets/img/av3.png);
        // background-size: 100% 100%;
        z-index: 11;
      }
    }
  }
}
</style>
