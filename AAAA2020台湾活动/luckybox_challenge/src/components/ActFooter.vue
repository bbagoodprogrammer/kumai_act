<template>
  <div class="footer" :class="{noAct:showState == 0 || showState==1,singUp:showState == 2}">
    <div class="noAct" v-if="showState ===0">
      {{lang.noAct}}
    </div>
    <div class="noAct" v-if="showState ===1">
      {{lang.actEd}}
    </div>
    <span class="singUp" @click="goSingUp()" v-if="showState ===2">{{lang.singUp}}</span>
    <div class="list" v-if="showState ===3 ">
      <div class="rank" :class="{norank:myMsg.rank==0}">{{myMsg.rank==0?lang.noRank:myMsg.rank}}</div>
      <div class="uerImg">
        <img v-if="myMsg.avatar_frame &&myMsg.avatar_frame != ''" :src="myMsg.avatar_frame" class="frame" alt="">
        <!-- <img src="../assets/img/testFrame.png" class="frame" alt=""> -->
        <img v-else-if="myMsg.nob > 0" :src="require(`../img/nob/${myMsg.nob}.png`)" class="nob" alt="">
        <img v-lazy="myMsg.avatar" alt="" class="av">
      </div>
      <div class="scoreBox">
        <div class="score"><i :class="{coins:mainTab == 'total'}"></i>{{myMsg.score}}</div>
        <div class="lastRank" v-if="!myMsg.rank || myMsg.rank>100">{{lang.lastTrank}}{{myMsg.gap==0?'1':myMsg.gap}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
import { singUp } from "../apis"
import { globalBus } from "../utils/eventBus"
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState(["groupsUserMsg", "step", "isShare", "mainTab", "registered"]),
    showState() {
      // return 1
      if (this.step == 0) {
        //活動未開始
        return 0
      } else if (this.step == 2) {
        //活動已結束
        return 1
      } else if (this.isShare || !this.registered) {
        return 2
      } else if (this.registered) { //已报名
        return 3
      }
    },
    myMsg() {
      console.log(this.groupsUserMsg)
      if (this.groupsUserMsg[this.mainTab]) {
        return this.groupsUserMsg[this.mainTab].msg
      }
      return {}
    }
  },
  methods: {
    goSingUp() {
      globalBus.$emit('commonEvent', () => {
        singUp().then((res) => {
          const { response_data, response_status } = res.data
          if (response_status.code === 0) {  //报名成功
            this.$parent.initData()
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
.footer {
  height: 1.48rem;
  background: url(../img/footerBg.png);
  background-size: 100% 100%;
  position: fixed;
  bottom: -0.1rem;
  left: 0;
  right: 0;
  z-index: 199;
  display: flex;
  align-items: center;
  justify-content: center;
  .singUp {
    display: block;
    width: 3.22rem;
    height: 1.02rem;
    // background: url(../assets/img/singUpBtm.png);
    // background-size: 100% 100%;
    font-size: 120%;
    line-height: 0.91rem;
    margin: 0.05rem auto;
    text-align: center;
  }
  .list {
    width: 7.5rem;
    height: 1.25rem;
    display: flex;
    align-items: center;
    .rank {
      width: 0.82rem;
      height: 0.82rem;
      color: rgba(255, 255, 255, 1);
      text-align: center;
      line-height: 0.82rem;
      margin-left: 0.11rem;
      font-weight: bold;
      font-size: 0.32rem;
      &.norank {
        font-size: 0.25rem;
      }
    }
    .uerImg {
      width: 1.1rem;
      height: 1.1rem;
      position: relative;
      .nob {
        width: 1.1rem;
        height: 1.1rem;
        position: absolute;
        top: 0rem;
        left: 0rem;
        z-index: 10;
      }
      .frame {
        width: 1.5rem;
        height: 1.5rem;
        position: absolute;
        top: -0.21rem;
        left: -0.2rem;
        z-index: 10;
      }
      .av {
        width: 0.88rem;
        height: 0.88rem;
        position: absolute;
        top: 0.1rem;
        left: 0.11rem;
        border-radius: 50%;
      }
    }
    .scoreBox {
      font-size: 0.26rem;
      margin-left: 0.15rem;
      .score {
        display: flex;
        align-items: center;
        font-size: 0.28rem;
        i {
          width: 0.36rem;
          height: 0.32rem;
          background: url(../img/hearIcon.png);
          background-size: 100% 100%;
          margin-right: 0.1rem;
          &.coins {
            height: 0.37rem;
            background: url(../img/coinsIcon.png);
            background-size: 100% 100%;
          }
        }
      }
    }
    &.rank1 {
      .rank {
        text-indent: -999rem;
        background: url(../img/top1.png);
        background-size: 100% 100%;
      }
    }
    &.rank2 {
      .rank {
        text-indent: -999rem;
        background: url(../img/top2.png);
        background-size: 100% 100%;
      }
    }
    &.rank3 {
      .rank {
        text-indent: -999rem;
        background: url(../img/top3.png);
        background-size: 100% 100%;
      }
    }
  }
  &.noAct {
    height: 1.04rem;
    background: url(../img/noAct.png);
    background-size: 100% 100%;
  }
  &.singUp {
    height: 1.04rem;
    background: url(../img/singUp.png);
    background-size: 100% 100%;
  }
}
</style>
