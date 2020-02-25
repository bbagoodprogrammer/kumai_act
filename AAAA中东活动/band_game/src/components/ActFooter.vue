<template>
  <div class="footerBar">
    <div class="acrStatus" v-if="astState != 5">
      <span class="noAct" v-if="astState === 0">لم يبدأ النشاط</span>
      <span class="noAct" v-if="astState === 2">انتهى النشاط</span>
      <span class="goAct" v-if="astState === 1" @click="singUp()">التسجيل الآن</span>
      <div class="actIng1" v-if="astState === 3" :class="'rank' + groupMsg.rank">
        <div class="itemTop">
          <div class="rank">{{groupMsg.rank}}</div>
          <div class="imgBox">
            <div class="imgBg"></div>
            <img v-lazy="groupMsg.pic_url" alt="" class="userImg">
          </div>
          <div class="userBox">
            <div class="name">{{groupMsg.rname}}</div>
            <div class="uid">{{groupMsg.rid}}</div>
          </div>
          <div class="score">
            <i></i><em>{{groupMsg.score}}</em>
          </div>
        </div>
      </div>
      <div class="actIng2" v-if="astState === 4" :class="'rank' + peopleMsg.rank">
        <div class="itemTop">
          <div class="rank">{{peopleMsg.rank}}</div>
          <div class="imgBox">
            <div class="imgBg"></div>
            <img v-lazy="peopleMsg.avatar" alt="" class="userImg">
          </div>
          <div class="userBox">
            <div class="name">{{peopleMsg.nick}}</div>
            <div class="uid">{{peopleMsg.uid}}</div>
          </div>
          <div class="score">
            <i></i><em>{{peopleMsg.score}}</em>
          </div>
        </div>
      </div>
      <transition name="slide">
        <div class="goCreatKRoomPup" v-show="showGoKroom">
          <div class="creatKroom">
            <span class="close" @click="closePup()"></span>
            <p>ليس لديك غرفة غناء ، لا يمكنك التسجيل.</p>
            <span class="goKroom" @click="goKroom()">انقر لإنشاء</span>
          </div>
        </div>
      </transition>
      <transition name="slide">
        <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import api from "../api/apiConfig"
import { globalBus } from '../utils/eventBus'
import getString from "../utils/getString"
import MsgToast from "../components/commonToast"
export default {
  components: { MsgToast },
  data() {
    return {
      showGoKroom: false,
      tastMsg: '',
      showT: false
    }
  },
  props: ['showCom'],
  computed: {
    ...mapState(['actStatus', 'groupMsg', 'peopleMsg', "isShare"]),
    astState() {
      if (this.actStatus === 0) { //活动未开始
        return 0
      } else if (this.actStatus === 2) { //活动已结束
        return 2
      } else if ((this.actStatus === 1 && this.groupMsg.is_reg == 0) && this.showCom == 'group' || this.isShare) { //活动开始未报名，或者分享
        return 1
      } else if (this.actStatus === 1 && this.groupMsg.is_reg == 1 && this.showCom == 'group') { //团队个人信息
        return 3
      } else if (this.actStatus === 1 && this.peopleMsg.rank > 0 && this.showCom == 'people') { //个人上了贡献榜
        return 4
      } else if (this.actStatus === 1 && this.peopleMsg.rank == 0 && this.showCom == 'people') { //个人信息没上贡献榜
        return 5
      }
    }
  },
  methods: {
    singUp() {
      globalBus.$emit('commonEvent', () => {
        if (this.groupMsg.rid > 0) {
          api.singUp().then(res => {
            if (res.data.response_status.code == 0) {
              this.$store.commit('changGroupMsg', res.data.response_data.owner_msg)
              this.tastMsg = `تم تسجيل غرفة الغناء بنجاح!`
              this.showT = true
            } else {
              this.tastMsg = res.data.response_status.error
              this.showT = true
            }
          })
        } else { //无K房
          this.showGoKroom = true
        }
      })
    },
    goKroom() {
      let uid = getString('uid')
      let token = getString('token')
      location.href = `http://act.gosingapp.com/html/createKtv_new/index.html?uid=${uid}&token=${token}`
    },
    closePup() {
      this.showGoKroom = false
    },
    closeToast() {
      this.showT = false
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
  z-index: 1000;
  .acrStatus {
    width: 7.5rem;
    height: 1.26rem;
    margin: auto;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(../assets/img/footerbg.png) no-repeat;
    background-size: contain;
    span {
      display: inline-block;
      font-size: 140%;
    }
    .goAct {
      width: 2.85rem;
      height: 0.76rem;
      background: url(../assets/img/okBg.png);
      background-size: 100% 100%;
      line-height: 0.76rem;
      text-align: center;
      font-size: 140%;
    }
  }

  .actIng1 {
    width: 7.5rem;
    .itemTop {
      height: 0.98rem;
      padding: 0 0.48rem 0 0.18rem;
      display: flex;
      align-items: center;
      .rank {
        width: 0.75rem;
        height: 0.65rem;
        text-align: center;
        line-height: 0.65rem;
        font-size: 120%;
        color: #00ff90;
        font-style: italic;
        margin-top: 0.05rem;
      }
      .imgBox {
        width: 0.98rem;
        height: 0.95rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 0.05rem 0 0.07rem;
        position: relative;
        .imgBg {
          width: 0.98rem;
          height: 0.95rem;
          position: absolute;
          top: 0;
          left: 0;
          // background: url(../assets/img/listItemUserBg.png);
          // background-size: 100% 100%;
        }
        .userImg {
          width: 0.7rem;
          height: 0.71rem;
          border-radius: 0.2rem;
          border: 0.02rem solid rgba(255, 246, 168, 1);
        }
      }
      .userBox {
        height: 0.8rem;
        width: 2.6rem;
        text-align: right;
        .name {
          height: 0.4rem;
          line-height: 0.4rem;
          max-width: 2.6rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .uid {
          height: 0.4rem;
          line-height: 0.4rem;
          color: #b59eff;
        }
      }
      .score {
        display: flex;
        align-items: center;
        margin-right: 0.37rem;
        color: #ffe6ab;
        i {
          width: 0.31rem;
          height: 0.36rem;
          background: url(../assets/img/huo.png);
          background-size: 100% 100%;
          margin-left: 0.15rem;
        }
      }
    }
    &.rank1 {
      .itemTop {
        .rank {
          background: url(../assets/img/rank1.png);
          background-size: 100% 100%;
          text-indent: -999rem;
        }
        .imgBg {
          background: url(../assets/img/listTop1.png);
          background-size: 100% 100%;
        }
      }
    }
    &.rank2 {
      .itemTop {
        .rank {
          background: url(../assets/img/rank2.png);
          background-size: 100% 100%;
          text-indent: -999rem;
        }
        .imgBg {
          background: url(../assets/img/listTop2.png);
          background-size: 100% 100%;
        }
      }
    }
    &.rank3 {
      .itemTop {
        .rank {
          background: url(../assets/img/rank3.png);
          background-size: 100% 100%;
          text-indent: -999rem;
        }
        .imgBg {
          background: url(../assets/img/listTop3.png);
          background-size: 100% 100%;
        }
      }
    }
  }
  .actIng2 {
    width: 7.5rem;
    .itemTop {
      height: 0.98rem;
      padding: 0 0.48rem 0 0.18rem;
      display: flex;
      align-items: center;
      .rank {
        width: 0.75rem;
        height: 0.65rem;
        text-align: center;
        line-height: 0.65rem;
        font-size: 120%;
        color: #00ff90;
        font-style: italic;
        margin-top: 0.05rem;
      }
      .imgBox {
        width: 0.98rem;
        height: 0.95rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 0.05rem 0 0.07rem;
        position: relative;
        .imgBg {
          width: 0.98rem;
          height: 0.95rem;
          position: absolute;
          top: 0;
          left: 0;
          // background: url(../assets/img/listItemUserBg.png);
          // background-size: 100% 100%;
        }
        .userImg {
          width: 0.7rem;
          height: 0.71rem;
          border-radius: 0.2rem;
          border: 0.02rem solid rgba(255, 246, 168, 1);
        }
      }
      .userBox {
        height: 0.8rem;
        width: 2.6rem;
        text-align: right;
        .name {
          height: 0.4rem;
          line-height: 0.4rem;
          max-width: 2.6rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .uid {
          height: 0.4rem;
          line-height: 0.4rem;
          color: #b59eff;
        }
      }
      .score {
        display: flex;
        align-items: center;
        margin-right: 0.37rem;
        color: #ffe6ab;
        i {
          width: 0.31rem;
          height: 0.36rem;
          background: url(../assets/img/huo.png);
          background-size: 100% 100%;
          margin-left: 0.15rem;
        }
      }
    }
    &.rank1 {
      .itemTop {
        .rank {
          background: url(../assets/img/rank1.png);
          background-size: 100% 100%;
          text-indent: -999rem;
        }
        .imgBg {
          background: url(../assets/img/listTop1.png);
          background-size: 100% 100%;
        }
      }
    }
    &.rank2 {
      .itemTop {
        .rank {
          background: url(../assets/img/rank2.png);
          background-size: 100% 100%;
          text-indent: -999rem;
        }
        .imgBg {
          background: url(../assets/img/listTop2.png);
          background-size: 100% 100%;
        }
      }
    }
    &.rank3 {
      .itemTop {
        .rank {
          background: url(../assets/img/rank3.png);
          background-size: 100% 100%;
          text-indent: -999rem;
        }
        .imgBg {
          background: url(../assets/img/listTop3.png);
          background-size: 100% 100%;
        }
      }
    }
  }
  .goCreatKRoomPup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 10000;
    .creatKroom {
      width: 5.67rem;
      height: 3.04rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(102, 69, 204, 1);
      border: 0.04rem solid rgba(122, 89, 212, 1);
      border-radius: 0.1rem;
      p {
        padding: 1rem 0.2rem 0;
        text-align: center;
      }
      .close {
        display: block;
        width: 0.71rem;
        height: 0.71rem;
        background: url(../assets/img/close.png);
        background-size: 100% 100%;
        position: absolute;
        left: 2.5rem;
        bottom: -1.5rem;
      }
    }

    .goKroom {
      display: block;
      width: 2.85rem;
      height: 0.76rem;
      background: url(../assets/img/okBg.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.76rem;
      font-size: 130%;
      margin: 0.5rem auto;
    }
  }
}
</style>
