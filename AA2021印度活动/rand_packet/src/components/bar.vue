<template>
  <div class="bar">
    <div class="lineMsg">
      <div class="userImgBox">
        <img v-lazy="uaserAvatar" alt="">
        <i class="hear"></i>
      </div>
      <div class="boxGrade">
        <div class="gradeFraction">
          <span v-for="(item,index) in newPcket" :key="index" :class="{active:packet.dayScore >= item}">
            <strong>Lv.{{index +1}}</strong>
            <em>{{getNumsStr(item)}}</em>
          </span>
        </div>
        <div class="line">
          <i v-for="(item,index) in newPcket" :key="index" class="spot" :class="{act:packet.dayScore >= item}"></i>
          <span class="activeLine" :style="{'width':lineWidth}"></span>
        </div>
      </div>
    </div>
    <div class="totalBox" :class="{act:lastBoxOpen}">
      <strong>{{lang.bigBox}}</strong>
      <em>{{totalScore}}</em>
      <i></i>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
export default {
  data () {
    return {
    }
  },
  props: ['newPcket'],
  computed: {
    ...mapState(['packet', 'groupsUserMsg', 'nowDay']),
    totalScore () {
      return this.packet.level ? this.packet.level[this.packet.level.length - 1] : 0
    },
    uaserAvatar () {
      if (this.groupsUserMsg[this.nowDay]) {
        return this.groupsUserMsg[this.nowDay].msg.avatar
      }
    },
    lineWidth () {
      for (let i = this.newPcket.length - 1; i >= 0; i--) {
        if (this.packet.dayScore >= this.newPcket[this.newPcket.length - 1]) {
          return '100%'
        } else if (this.packet.dayScore >= this.newPcket[i]) {
          let c = this.newPcket[i + 1] - this.newPcket[i]
          let t = this.packet.dayScore - this.newPcket[i]
          let a = (t / c) * 100 / 5
          return (20 * i + a) + '%'
        }
      }
    },
    lastBoxOpen () {
      return this.packet.totalScore >= this.packet.level[this.packet.level.length - 1]
    }
  },
  methods: {
    getNumsStr (nums) {
      if (nums >= 100000) {
        return `${nums / 100000}${this.lang.company}`
      }
      return nums
    }
  }
}
</script>
<style lang="scss" scoped>
.bar {
  width: 7.04rem;
  height: 1.11rem;
  background: url(../img/lineBg.png);
  background-size: 100% 100%;
  margin: 1.14rem auto 0;
  display: flex;
  align-items: center;
  .lineMsg {
    width: 5.6rem;
    height: 1.11rem;
    display: flex;
    align-items: center;
    .userImgBox {
      width: 0.7rem;
      height: 0.7rem;
      margin-left: 0.17rem;
      position: relative;
      img {
        width: 0.7rem;
        height: 0.7rem;
        border-radius: 50%;
        border: 0.02rem solid rgba(253, 175, 84, 1);
      }
      .hear {
        display: block;
        width: 0.3rem;
        height: 0.26rem;
        background: url(../img/hear.png);
        background-size: 100% 100%;
        position: absolute;
        bottom: -0.06rem;
        right: -0.1rem;
      }
    }
    .boxGrade {
      flex: 1;
      .gradeFraction {
        display: flex;
        span {
          width: 0.78rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          strong {
            display: block;
            font-size: 0.24rem;
            font-style: italic;
            font-weight: 600;
          }
          em {
            color: #fff3c4;
            font-size: 0.24rem;
            font-weight: 600;
          }
          &.active {
            strong {
              font-size: 0.24rem;
              background: linear-gradient(
                0deg,
                rgba(254, 220, 69, 1) 0%,
                rgba(251, 112, 153, 1) 100%
              );
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              text-transform: uppercase;
            }
            em {
              font-size: 0.24rem;
              //   background: linear-gradient(
              //     0deg,
              //     rgba(254, 220, 69, 1) 0%,
              //     rgba(251, 112, 153, 1) 100%
              //   );
              //   -webkit-background-clip: text;
              //   -webkit-text-fill-color: transparent;
              //   text-transform: uppercase;

              cursor: pointer;
              background-image: -webkit-linear-gradient(
                90deg,
                rgba(254, 220, 69, 1) 0%,
                rgba(251, 112, 153, 1) 100%
              );
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
          }
        }
      }
      .line {
        width: 4.1rem;
        height: 0.12rem;
        background: #e55055;
        margin: 0.05rem auto 0;
        border-radius: 0.06rem;
        position: relative;
        .activeLine {
          display: block;
          height: 0.12rem;
          background: linear-gradient(
            0deg,
            #ffc485 0%,
            #e88e52 37%,
            #ffd47f 90%
          );
          border-radius: 0.06rem;
          width: 0%;
          max-width: 100%;
        }
        .spot {
          display: block;
          width: 0.18rem;
          height: 0.18rem;
          background: url(../img/spotDe.png);
          background-size: 100% 100%;
          position: absolute;
          top: -0.035rem;
          &.act {
            background: url(../img/spotAct.png);
            background-size: 100% 100%;
          }
        }
        .spot:nth-child(1) {
          left: -0.09rem;
        }
        .spot:nth-child(2) {
          left: 0.7rem;
        }
        .spot:nth-child(3) {
          left: 1.49rem;
        }
        .spot:nth-child(4) {
          left: 2.36rem;
        }
        .spot:nth-child(5) {
          left: 3.15rem;
        }
        .spot:nth-child(6) {
          right: -0.09rem;
        }
      }
    }
  }
  .totalBox {
    position: relative;
    width: 1.3rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    margin-top: -0.05rem;
    strong {
      display: block;
      height: 0.3rem;
      font-size: 0.24rem;
      font-weight: 600;
      margin-bottom: 0.05rem;
    }
    em {
      color: #fff3c4;
      font-size: 0.24rem;
      font-weight: 600;
    }
    i {
      display: block;
      width: 0.18rem;
      height: 0.18rem;
      background: url(../img/spotDe.png);
      background-size: 100% 100%;
      margin: 0 auto;
    }
    &.act {
      strong {
        background: linear-gradient(
          0deg,
          rgba(254, 220, 69, 1) 0%,
          rgba(251, 112, 153, 1) 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      em {
        background: linear-gradient(
          0deg,
          rgba(254, 220, 69, 1) 0%,
          rgba(251, 112, 153, 1) 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      i {
        background: url(../img/spotAct.png);
        background-size: 100% 100%;
      }
    }
  }
}
</style>
