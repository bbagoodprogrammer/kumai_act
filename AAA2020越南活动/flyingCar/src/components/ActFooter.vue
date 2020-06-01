<template>
  <div class="footer">
    <div class="noAct" v-if="showState ===0">
      {{lang.noAct}}
    </div>
    <div class="noAct" v-if="showState ===1">
      {{lang.actEd}}
    </div>
    <span class="singUp" @click="goSingUp()" v-if="showState ===2"></span>
    <div class="list" v-if="showState ===3 ">
      <div class="rank">{{myMsg.rank}}</div>
      <div class="userMsg">
        <div class="uerImg">
          <span class="imgBg"></span>
          <img v-lazy="myMsg.avatar" alt="" class="imgItem">
        </div>
        <div class="name">
          <div class="userName">{{myMsg.nick}}</div>
          <div class="carName">{{getCar(myMsg.score).name}}</div>
        </div>
        <div class="car">
          <img :src="getCar(myMsg.score).img" alt="" :class="'car'+getCar(myMsg.score).lv">
        </div>
        <div class="score">{{myMsg.score}} <i></i> </div>
        <div class="bonus" v-if="myMsg.scale>0">Tăng {{myMsg.scale}} %</div>
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
import carList from "../config/cars"
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState(["groupsUserMsg", "actStatus", "isShare", "tab", "rankGroups", "nowDay", "dateArr", "singUp"]),
    showState() {
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
        var listChang = this.getDate(this.dateArr[this.tab - 1])
        api.singUp(listChang).then((res) => {
          const { response_data, response_status } = res.data
          if (response_status.code === 0) {  //报名成功
            this.$store.commit("setSucUp", response_data.owner_msg)
          } else {
            this.toast(response_status.error)
          }
        })
      })
    },
    getday(time) {
      return getDate(new Date(time * 1000), '1')
    },
    getDate(time) {
      return getDate(new Date(time * 1000), '2')
    },
    getCar(score) {
      for (let i = carList.length - 1; i >= 0; i--) {
        if (score >= carList[i].score) {
          return carList[i]
        }
      }
      return {}
    }
  }
}
</script>
<style lang="scss">
.footer {
  height: 1.26rem;
  background: url(../assets/img/footerBg.png);
  background-size: 100% 100%;
  position: fixed;
  bottom: -0.1rem;
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
    width: 3.22rem;
    height: 1.02rem;
    background: url(../assets/img/singUpBtm.png);
    background-size: 100% 100%;
    font-size: 120%;
    line-height: 0.91rem;
    margin: 0.05rem auto;
    text-align: center;
  }
  .list {
    height: 1.25rem;
    display: flex;
    align-items: center;
    .rank {
      width: 0.82rem;
      height: 0.82rem;
      color: #472400;
      text-align: center;
      line-height: 0.82rem;
      margin-left: 0.11rem;
      font-weight: bold;
      background: url(../assets/img/rankBg.png);
      background-size: 100% 100%;
    }
    .userMsg {
      width: 6.17rem;
      height: 1.22rem;
      display: flex;
      align-items: center;
      position: relative;
      .uerImg {
        width: 1.25rem;
        height: 1.25rem;
        position: relative;
        .imgBg {
          display: block;
          width: 1.25rem;
          height: 1.25rem;
          background: url(../assets/img/userImgBg.png);
          background-size: 100% 100%;
        }
        .imgItem {
          width: 0.85rem;
          height: 0.85rem;
          position: absolute;
          top: 0.2rem;
          left: 0.2rem;
          border-radius: 50%;
          z-index: 10;
        }
      }
      .name {
        width: 1.7rem;
        .userName {
          height: 0.4rem;
          line-height: 0.4rem;
          max-width: 1.7rem;
          color: #3f3f3f;
          font-size: 0.24rem;
          font-weight: 500;
          text-indent: 0.1rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .carName {
          width: 2.24rem;
          height: 0.33rem;
          line-height: 0.33rem;
          font-style: italic;
          color: rgba(255, 196, 160, 1);
          font-size: 0.24rem;
          font-weight: 500;
          text-indent: 0.3rem;
          background: url(../assets/img/carNameBg.png);
          background-size: 100% 100%;
        }
      }
      .car {
        width: 1.25rem;
        display: flex;
        justify-content: center;
        margin: 0 0 0 0.2rem;
        .car1 {
          width: 0.54rem;
          height: 0.47rem;
        }
        .car2 {
          width: 0.78rem;
          height: 0.48rem;
        }
        .car3 {
          width: 1.1rem;
          height: 0.36rem;
        }
        .car4 {
          width: 1.15rem;
          height: 0.41rem;
        }
        .car5 {
          width: 1.15rem;
          height: 0.36rem;
        }
        .car6 {
          width: 1.25rem;
          height: 0.39rem;
        }
      }
      .score {
        color: #c96c44;
        font-style: italic;
        font-weight: 500;
        margin: -0.05rem 0 0 0.1rem;
        i {
          display: block;
          width: 1.15rem;
          height: 0.08rem;
          background: url(../assets/img/jiao.png);
          background-size: 100% 100%;
          margin: 0.1rem 0 0 -0.2rem;
        }
      }
      .bonus {
        width: 1.49rem;
        height: 0.31rem;
        background: url(../assets/img/bonus.png);
        background-size: 100% 100%;
        text-align: center;
        line-height: 0.31rem;
        font-size: 0.22rem;
        font-style: italic;
        color: rgba(255, 255, 255, 1);
        position: absolute;
        bottom: 0.3rem;
        right: -0.03rem;
      }
    }
    &.rank1 {
      .rank {
        text-indent: -999rem;
        background: url(../assets/img/top1.png);
        background-size: 100% 100%;
      }
      .imgBg {
        width: 1.11rem;
        height: 1.25rem;
        position: absolute;
        top: -0.11rem;
        left: 0.06rem;
        background: url(../assets/img/av1.png);
        background-size: 100% 100%;
        z-index: 11;
      }
    }
    &.rank2 {
      .rank {
        text-indent: -999rem;
        background: url(../assets/img/top2.png);
        background-size: 100% 100%;
      }
      .imgBg {
        width: 1.11rem;
        height: 1.25rem;
        position: absolute;
        top: -0.11rem;
        left: 0.06rem;
        background: url(../assets/img/av2.png);
        background-size: 100% 100%;
        z-index: 11;
      }
    }
    &.rank3 {
      .rank {
        text-indent: -999rem;
        background: url(../assets/img/top3.png);
        background-size: 100% 100%;
      }
      .imgBg {
        width: 1.11rem;
        height: 1.25rem;
        position: absolute;
        top: -0.11rem;
        left: 0.06rem;
        background: url(../assets/img/av3.png);
        background-size: 100% 100%;
        z-index: 11;
      }
    }
  }
}
</style>
