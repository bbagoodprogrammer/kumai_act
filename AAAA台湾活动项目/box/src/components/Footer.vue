<template>
  <div class="footer">
    <div class="noStart" v-if="showState ===0">
      活動未開始！
    </div>
    <div class="end" v-if="showState ===1">
      活動已結束！
    </div>
    <div class="singUpBox" v-if="showState ===2 || isShare">
      <span class="singUp" @click="goSingUp()">立即報名</span>
    </div>
    <div class="list" v-if="showState ===3 ">
      <div class="rank">{{myMsg.rank}}</div>
      <div class="uerImg">
        <span class="imgBg"></span>
        <img v-lazy="myMsg.avatar" alt="" class="imgItem">
      </div>
      <div class="userMsg">
        <div class="name">
          <span v-if="tab == 'total'" class="score">狂歡值: <em>{{myMsg.score}}</em></span>
          <span v-else>{{`${getday(dateArr[this.tab-1])}狂歡值：`}} <em>{{myMsg.score}}</em></span>
        </div>
        <div class="charm" v-if="tab == 'total'">
          <div class="starCharm"><i class="star"></i><em>{{myMsg.star}}</em></div>
          <div class="hearCharm"><i class="hear"></i><em>{{myMsg.charm}}</em></div>
        </div>
        <div class="probability" v-else> <i class="tips" v-if="myMsg.is_lucky == 1"></i>中獎概率：<em>{{(myMsg.scale*100).toFixed(1)+'%'}}</em></div>
      </div>
      <div class="upDateSong" @click="updateSong()">上傳作品</div>
    </div>
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-if="showT"></msg-toast>
    </transition>
  </div>
</template>
<script>
import { mapState } from "vuex"
import MsgToast from "../components/commonToast.vue"
import APP from "../utils/openApp"
import api from "../api/apiConfig"
import getDate from "../utils/getDate"
import getString from "../utils/getString"
import { globalBus } from '../utils/eventBus'
export default {
  components: { MsgToast },
  data() {
    return {
      tastMsg: '',
      showT: false,
    }
  },
  computed: {
    ...mapState(["groupsUserMsg", "activeityState", "isShare", "tab", "rankGroups", "nowDay", "dateArr"]),
    showState() {
      if (this.activeityState == 0) {
        //活動未開始
        return 0
      } else if (this.activeityState == 2) {
        //活動已結束
        return 1
      } else if (this.isShare) {
        return 2
      } else if (this.groupsUserMsg[this.tab] && this.groupsUserMsg[this.tab].msg.is_reg == 0) { //用戶未报名
        return 2
      } else if (this.groupsUserMsg[this.tab] && this.groupsUserMsg[this.tab].msg.is_reg == 1) { //已报名
        return 3
      }
    },
    myMsg() {
      if (this.groupsUserMsg[this.tab]) {
        return this.groupsUserMsg[this.tab].msg
      }
    }
  },
  methods: {
    goSingUp() {
      globalBus.$emit('commonEvent', () => {
        var listChang = this.getDate(this.dateArr[this.tab - 1])
        api.singUp(listChang).then((res) => {
          const { response_data, response_status } = res.data
          if (response_status.code === 0) {  //报名成功
            //当前天数排行榜添加用户数据
            // if (this.rankGroups[this.nowDay] && this.rankGroups[this.nowDay].list.length < 20) {
            //   this.rankGroups[this.nowDay].list.push(response_data.owner_msg)
            // }
            //总榜添加用户数据
            if (this.rankGroups['total'] && this.rankGroups['total'].list.length < 20) {
              this.rankGroups['total'].list.push(response_data.owner_msg)
            }
            //循环修改缓存好的天数报名状态
            var newGroups = this.groupsUserMsg
            for (let key in newGroups) {
              newGroups[key].msg = response_data.owner_msg
            }
            this.$store.commit("changGroupsUserMsg", newGroups)
          } else {
            this.tastMsg = response_status.error
            this.showT = true
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
    updateSong() {
      globalBus.$emit('commonEvent', () => {
        let regstr = getString('token')
        location.href = `./index3.html?token=${regstr}`
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
  height: 1.55rem;
  background: url(../assets/img/footerBg.png);
  background-size: 100% 100%;
  position: fixed;
  bottom: -0.1rem;
  left: 0;
  right: 0;
  z-index: 199;
  .noStart {
    text-align: center;
    margin: 0.68rem auto;
    color: #ffefd7;
  }
  .end {
    text-align: center;
    margin: 0.68rem auto;
    color: #ffefd7;
  }
  .singUp {
    display: block;
    width: 3.06rem;
    height: 0.91rem;
    background: url(../assets/img/singUpBtm.png);
    background-size: 100% 100%;
    font-size: 120%;
    line-height: 0.91rem;
    margin: 0.48rem auto;
    text-align: center;
  }
  .list {
    height: 1rem;
    margin-top: 0.4rem;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    .rank {
      width: 0.84rem;
      height: 0.72rem;
      font-size: 110%;
      color: #c15675;
      text-align: center;
      line-height: 0.72rem;
      margin-left: 0.13rem;
    }
    .uerImg {
      width: 0.92rem;
      height: 1.01rem;
      position: relative;
      margin-left: 0.21rem;
      .imgBg {
        width: 0.92rem;
        height: 1.01rem;
        background: url(../assets/img/userImgBg.png);
        background-size: 100% 100%;
        position: absolute;
        z-index: 10;
      }
      .imgItem {
        width: 0.78rem;
        height: 0.78rem;
        position: absolute;
        top: 0.19rem;
        left: 0.07rem;
        border-radius: 50%;
      }
    }
    .userMsg {
      width: 2.9rem;
      .name {
        display: flex;
        align-items: center;
        span {
          // max-width: 1.86rem;
          // overflow: hidden;
          // white-space: nowrap;
          // text-overflow: ellipsis;
          font-size: 80%;
          color: #fff88e;
          em {
            font-size: 0.29rem;
          }
        }
        i {
          display: block;
          margin-left: 0.18rem;
          width: 0.62rem;
          height: 0.29rem;
          background: url(../assets/img/prizeTips.png);
          background-size: 100% 100%;
        }
      }
      .charm {
        display: flex;
        align-items: center;
        font-size: 80%;
        color: #fff9d6;
        div {
          width: 50%;
          display: flex;
          align-items: center;
        }
        .star {
          display: block;
          width: 0.32rem;
          height: 0.31rem;
          margin-right: 0.09rem;
          background: url(../assets/img/star.png);
          background-size: 100% 100%;
        }
        .hear {
          display: block;
          width: 0.32rem;
          height: 0.31rem;
          margin-right: 0.09rem;
          background: url(../assets/img/hear.png);
          background-size: 100% 100%;
        }
      }
      .probability {
        color: #fff9d6;
        font-size: 73%;
        display: flex;
        align-items: center;
        .tips {
          display: block;
          margin-right: 0.18rem;
          width: 0.62rem;
          height: 0.29rem;
          background: url(../assets/img/prizeTips.png);
          background-size: 100% 100%;
        }
        em {
          font-size: 0.28rem;
        }
      }
    }
    .upDateSong {
      width: 2.29rem;
      height: 0.85rem;
      background: url(../assets/img/updaSong.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.85rem;
    }
    .score {
      color: #fff88e;
      font-size: 80%;
      em {
        font-size: 0.29rem;
      }
    }
    .giftCharm {
      div {
        display: flex;
        align-items: center;
        font-size: 80%;
        color: #fff9d6;
      }
      .star {
        display: block;
        width: 0.32rem;
        height: 0.31rem;
        margin-right: 0.09rem;
        background: url(../assets/img/star.png);
        background-size: 100% 100%;
      }
      .hear {
        display: block;
        width: 0.32rem;
        height: 0.31rem;
        margin-right: 0.09rem;
        background: url(../assets/img/hear.png);
        background-size: 100% 100%;
      }
    }
    &.rank1 {
      .rank {
        background: url(../assets/img/top1.png);
        background-size: 100% 100%;
      }
    }
    &.rank2 {
      .rank {
        background: url(../assets/img/top2.png);
        background-size: 100% 100%;
      }
    }
    &.rank3 {
      .rank {
        background: url(../assets/img/top3.png);
        background-size: 100% 100%;
      }
    }
  }
}
</style>
