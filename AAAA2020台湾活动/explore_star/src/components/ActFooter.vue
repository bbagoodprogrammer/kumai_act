<template>
  <div class="footerBar">
    <div class="acrStatus">
      <span class="noAct" v-if="astState === 0">{{lang.noAct}}</span>
      <span class="noAct" v-if="astState === 2">{{lang.actEd}}</span>
      <span class="goAct" v-if="astState === 1" @click="singUp()">點擊推薦</span>
      <div class="actIng" v-if="astState === 3">
        <div class="rank">{{userMsg.rank}}</div>
        <img v-lazy="userMsg.avatar" alt="">
        <div class="nickMsg">
          <div class="nick">家族名稱</div>
          <div class="nick clor">{{userMsg.nick}}</div>
        </div>
        <div class="scoreMsg">
          <div class="pNums">家族人數: <span>999</span> </div>
          <div class="score">成功推薦 <i></i> <span>999</span> </div>
        </div>
      </div>
    </div>
    <div class="mask" v-show="showQueryPup">
      <transition name="slide">
        <div class="creatFamily" v-show="showQueryPup">
          <i class="close" @click="showQueryPup = false"></i>
          <p>抱歉，您不是家族成員！<br />你可以選擇</p>
          <div class="btnBox">
            <div class="ok" @click="creatFamily()">創建家族</div>
            <div class="ok" @click="goFamily()">加入家族</div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      // userMsg: {},
      showQueryPup: false
    }
  },
  computed: {
    ...mapState(['actStatus', 'userMsg', "isShare"]),
    astState() {
      return 3
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
    goFamily() {
      location.href = `fid:${this.fid}`
    },
    creatFamily() {
      let token = getString('token')
      let uid = getString('uid')
      location.href = `http://act.singnowapp.com/createFamily/index.html?uid=${uid}&token=${token}`
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
    height: 1.78rem;
    margin: auto;
    // text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(../assets/img/footer.png) no-repeat;
    background-size: contain;
    span {
      display: inline-block;
    }
    .goAct {
      width: 3.61rem;
      height: 1.23rem;
      background: url(../assets/img/singUpBtn.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 1.23rem;
      color: rgba(23, 26, 73, 1);
      font-size: 0.47rem;
      font-weight: 600;
    }
    .actIng {
      width: 100%;
      height: 1.33rem;
      margin-top: 0.12rem;
      display: flex;
      align-items: center;
      .rank {
        width: 1rem;
        text-align: center;
        font-size: 0.4rem;
        font-weight: bold;
        color: rgba(255, 255, 255, 0.5);
      }
      > img {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        margin-right: 0.16rem;
      }
      .nickMsg {
        width: 2.3rem;
        font-size: 0.28rem;
        .nick {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          &.clor {
            color: rgba(255, 254, 151, 1);
          }
        }
      }
      .scoreMsg {
        font-size: 0.22rem;
        color: rgba(255, 255, 255, 0.5);
        > div {
          height: 0.4rem;
          display: flex;
          align-items: center;
          i {
            width: 0.35rem;
            height: 0.33rem;
            background: url(../assets/img/star.png);
            background-size: 100% 100%;
            margin: 0 0.1rem 0 0.08rem;
          }
          span {
            color: rgba(255, 254, 151, 1);
            font-size: 0.28rem;
          }
        }
      }
    }
  }
  .creatFamily {
    width: 6.14rem;
    height: 3.49rem;
    background: #2a53af;
    border: 0.04rem solid #171a49;
    border-radius: 0.4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    .close {
      display: block;
      width: 0.34rem;
      height: 0.35rem;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.16rem;
      right: 0.26rem;
    }
    .title {
      font-size: 0.4rem;
    }
    p {
      line-height: 0.6rem;
      text-align: center;
    }
    .ok {
      width: 2.52rem;
      height: 0.89rem;
      background: url(../assets/img/ok.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.89rem;
      color: rgba(23, 26, 73, 1);
      font-size: 0.4rem;
      font-weight: 600;
    }
    .btnBox {
      width: 5.32rem;
      position: absolute;
      bottom: -0.4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0.36rem;
    }
  }
  .creatFamily::before {
    content: "";
    display: block;
    width: 6.22rem;
    height: 0.71rem;
    background: url(../assets/img/pupTips.png);
    background-size: 100% 100%;
    position: absolute;
    bottom: -0.2rem;
    z-index: -1;
  }
}
</style>
