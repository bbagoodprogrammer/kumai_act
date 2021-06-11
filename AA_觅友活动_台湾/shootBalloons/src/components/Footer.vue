<template>
  <div class="footerBar" v-if="astState">
    <div class="acrStatus" :class="{bg:astState!=1}">
      <span class="noAct" v-if="astState === 1">{{lang.noAct}}</span>
      <span class="noAct" v-if="astState === 2">{{lang.actEd}}</span>
      <div class="actIng" v-if="astState === 3" :class="['rank' + owner.rank]" @click="resetUserMsg()">
        <div class="userRank">{{owner.rank}}</div>
        <div class="imgBox">
          <img v-lazy="owner.avatar" alt="" class="avatar">
          <i class="live" v-if="owner.live_room">LIVE</i>
        </div>
        <div class="msg">
          <div class="nick">{{owner.nick}}</div>
          <!-- <span class="live" v-if="owner.live_room"></span> -->
        </div>
        <div class="score">
          <i>{{lang.hitValue}}</i>
          <em>{{owner.score}}</em>
        </div>
      </div>
      <span class="shoot" @click="scorllTo()" v-if="astState === 4">{{lang.shoot}}</span>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
// import api from "../api/apiConfig"
// import { globalBus } from '../utils/eventBus'
export default {
  data () {
    return {
      timer: null
    }
  },
  computed: {
    ...mapState(['activity_status', 'owner']),
    astState () {
      if (this.activity_status === 0) { //活动未开始
        return 1
      } else if (this.activity_status === 2) { //活动已结束
        return 2
      } else if (this.owner.first_time_marbles || this.owner.first_time_dart) { //活动开始已报名
        return 3
      } else if (!this.owner.first_time) { //活动开始已报名
        return 4
      }
    },
  },
  methods: {
    scorllTo () {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        let c = document.documentElement.scrollTop || document.body.scrollTop
        let t = (c) / 10
        window.scrollTo(0, c - t)
        if (t < 1) {
          clearInterval(this.timer)
        }
      }, 25)
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
  z-index: 9;
  .acrStatus {
    width: 7.5rem;
    height: 1.58rem;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(../img/footer.png);
    background-size: 100% 100%;
    span {
      display: inline-block;
    }
    .noAct {
      color: rgba(39, 26, 118, 1);
      font-size: 0.36rem;
      font-weight: 600;
      margin-top: 0.2rem;
    }
    .goAct {
      display: block;
      width: 100%;
      height: 0.96rem;
      position: fixed;
      bottom: 0;
    }
    .actIng {
      width: 100%;
      height: 1.49rem;
      display: flex;
      align-items: center;
      margin-top: 0.2rem;
      .userRank {
        width: 0.82rem;
        height: 0.67rem;
        text-align: center;
        line-height: 0.67rem;
        font-size: 0.36rem;
        font-weight: bold;
        font-style: italic;
        color: #032F6A;
        margin: 0 0.05rem 0 0.27rem;
      }
      .imgBox {
        position: relative;
        .avatar {
          width: 1.13rem;
          height: 1.13rem;
          border-radius: 50%;
          box-sizing: border-box;
          border: 0.03rem solid #FEEB8E;
        }
        .live {
          display: block;
          width: 0.71rem;
          height: 0.23rem;
          background: linear-gradient(133deg, #FFFE67 0%, #72F5FA 100%);
          border-radius: 0.04rem;
          text-align: center;
          line-height: 0.23rem;
          color: #1B80F0;
          font-size: 0.22rem;
          position: absolute;
          bottom: 0;
          left: 0.21rem;
        }
      }
      .msg {
        width: 1.6rem;
        margin-left: 0.15rem;
        .nick {
          color: #032E69;
          font-size: 0.28rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .score {
        width: 2rem;
        text-align: center;
        margin-left: 0.6rem;
        position: relative;
        i {
          display: block;
          color: #032F6A;
          font-size: 0.24rem;
          //   text-align: right;
        }
        em {
          display: block;
          width: 2rem;
          height: 0.37rem;
          background: rgba(3, 59, 8, 0.1);
          border-radius: 0.1rem;
          margin-top: 0.04rem;
        }
      }
      //   &.rank1,
      //   &.rank2,
      //   &.rank3 {
      //     background: url(../img/top3_bg.png);
      //     background-size: 100% 100%;
      //     .userRank {
      //       text-indent: -999rem;
      //     }
      //   }
      &.rank1 {
        .userRank {
          background: url(../img/top1.png);
          background-size: 100% 100%;
        }
      }
      &.rank2 {
        .userRank {
          background: url(../img/top2.png);
          background-size: 100% 100%;
        }
      }
      &.rank3 {
        .userRank {
          background: url(../img/top3.png);
          background-size: 100% 100%;
        }
      }
    }
    .shoot {
      width: 2.8rem;
      height: 0.86rem;
      background: url(../img/shoot.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.86rem;
      font-size: 0.36rem;
    }
  }
}
</style>
