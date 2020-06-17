<template>
  <div class="footer">
    <div class="noStart" v-if="showState ===0">
      Sự kiện chưa bắt đầu
    </div>
    <div class="end" v-if="showState ===1">
      Sự kiện đã kết thúc
    </div>
    <span class="singUp" @click="goSingUp()" v-if="showState===2">Báo danh</span>
    <div class="list" v-if="showState ===3" :class="'rank'+myMsg.rank">
      <div class="rank" v-if="myMsg.rank != 0">{{myMsg.rank}}</div>
      <div class="noRank" v-else>Chưa có hạng</div>
      <div class="uerImg">
        <span class="imgBg"></span>
        <img v-lazy="myMsg.avatar" alt="" class="imgItem">
      </div>
      <div class="userMsg">
        <span class="total" v-if="tab=='total'">Tổng pháp lực:<em>{{myMsg.all_score}}</em> <strong>Kém hạng trên: <em> {{myMsg.gap}}</em></strong></span>
        <span class="toDay" v-else>Pháp lực hôm nay: <em>{{myMsg.today_score}}</em> <strong>Kém hạng trên: <em> {{myMsg.gap}}</em></strong> </span>
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
    ...mapState(["groupsUserMsg", "activeityState", "isShare", "mainTab", "tab", "nowDay", "dateArr", "singUp"]),
    showState() {
      if (this.activeityState == 0) {
        //活動未開始
        return 0
      } else if (this.activeityState == 2) {
        //活動已結束
        return 1
      } else if (this.isShare || !this.singUp) {
        return 2
      } else {
        return 3
      }
    },
    myMsg() {
      console.log(this.groupsUserMsg, this.tab)
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
            this.$store.commit("setSingUp", true) //是否報名
            this.$parent.refrsh('singUp')
          } else {
            this.vxc('setToast', {
              title: 'Báo danh thất bại',
              msg: response_status.error
            })
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
    closeToast() {
      this.showT = false
    }
  }
}
</script>
<style lang="scss">
.footer {
  height: 1.59rem;
  background: url(../assets/img/footerBg.png);
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
    color: #ffefd7;
    margin-top: 0.3rem;
    font-size: 0.36rem;
    font-weight: 600;
  }
  .singUp {
    display: block;
    width: 3.08rem;
    height: 1.03rem;
    background: url(../assets/img/singUpBtm.png);
    background-size: 100% 100%;
    line-height: 1.03rem;
    text-align: center;
    color: #fff6ab;
    font-weight: 800;
    margin-top: 0.3rem;
  }
  .list {
    width: 7.5rem;
    height: 1rem;
    margin-top: 0.2rem;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    .rank {
      width: 0.84rem;
      height: 0.72rem;
      font-size: 110%;
      color: #af6f3e;
      text-align: center;
      line-height: 0.72rem;
      margin-left: 0.13rem;
      white-space: nowrap;
    }
    .noRank {
      font-size: 0.22rem;
      white-space: nowrap;
      color: #af6f3e;
    }
    .uerImg {
      width: 1.1rem;
      height: 1.1rem;
      position: relative;
      margin: 0 0.06rem;
      .imgBg {
        width: 1.09rem;
        height: 1.09rem;
        background: url(../assets/img/userImgBg.png);
        background-size: 100% 100%;
        position: absolute;
        z-index: 10;
      }
      .imgItem {
        width: 1rem;
        height: 1rem;
        position: absolute;
        top: 0.045rem;
        left: 0.045rem;
        border-radius: 50%;
      }
    }
    .userMsg {
      flex: 1;
      .total,
      .toDay {
        strong {
          font-size: 0.24rem;
        }
      }
      span {
        // max-width: 1.86rem;
        // overflow: hidden;
        // white-space: nowrap;
        // text-overflow: ellipsis;
        display: block;
        font-size: 0.24rem;
      }
    }
    .score {
      font-size: 80%;
      em {
        font-size: 0.29rem;
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
        top: -0.2rem;
        background: url(../assets/img/rank1.png);
        background-size: 100% 100%;
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
        top: -0.2rem;
        background: url(../assets/img/rank2.png);
        background-size: 100% 100%;
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
        top: -0.2rem;
        background: url(../assets/img/rank3.png);
        background-size: 100% 100%;
      }
    }
  }
}
</style>
