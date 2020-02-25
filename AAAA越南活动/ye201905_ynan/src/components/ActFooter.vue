<template>
  <div class="footerBar">
    <div class="acrStatus">
      <span class="noAct" v-if="astState === 0">{{lang.actState1}}</span>
      <span class="noAct" v-if="astState === 2">{{lang.actState2}}</span>
      <span class="goAct" v-if="astState === 1" @click="singUpAct()">{{lang.singUp}}</span>
      <div class="familyMsg" v-if="astState === 3" :class="'rank'+familyMsg.rank">
        <div class="userRank">{{familyMsg.rank}}</div>
        <div class="imgBox" @click="showUsCard()">
          <span class="topImg" v-if="familyMsg.rank <= 3"></span>
          <img v-else src="../assets/img/defaluteImg.png" alt="" class="defalute">
          <img v-lazy="familyMsg.avatar" alt="" class="userImg">
        </div>
        <div class="userMsg">
          <div class="userPeople">
            <div class="leftPeople">
              <div class="name">{{familyMsg.familyname}}</div>
              <div class="rid">ID:{{familyMsg.fid}}</div>
            </div>
            <div class="rightPeople">
              <strong>{{lang.essence}}</strong>
              <div class="peopelAvatar">
                <span v-for="(item2,index2) in familyMsg.family_user_rank" :key="index2+'2'" class="pelpleItem">
                  <img v-lazy="item2.avatar" alt="" class="people">
                  <img v-if="item2.is_elite == 1" src="../assets/img/jingy.png" alt="" class="imgTips">
                </span>
                <span v-for="(item,index) in 3-familyMsg.family_user_rank.length" :key="index+'1'" class="pelpleItem">
                  <img v-lazy="" alt="" class="people">
                  <!-- <img src="../assets/img/jingy.png" alt="" class="imgTips"> -->
                </span>
              </div>
            </div>
          </div>
          <div class="userScore">
            <div class="rScore">
              <span>{{lang.familyScore}}</span>
              <strong>{{familyMsg.charm_score}}</strong>
            </div>
            <div class="ticketScore">
              <span>{{lang.familyScore2}}</span>
              <strong>{{familyMsg.ticket_score}}</strong>
            </div>
            <div class="totalScore">
              <span>{{lang.familyTotalScore}}</span>
              <strong>{{familyMsg.score}}</strong>
            </div>
          </div>
        </div>
      </div>
      <div class="userRankMsg" v-if="astState === 4" :class="'rank'+userPeopleMsg.rank">
        <div class="userRank">{{userPeopleMsg.rank}}</div>
        <div class="imgBox">
          <img v-if="userPeopleMsg.is_elite == 1" src="../assets/img/totalUserBg.png" alt="" class="topImg">
          <img v-lazy="userPeopleMsg.avatar" alt="" class="userImg">
        </div>
        <div class="userMsg">
          <div class="name">{{userPeopleMsg.nick}}</div>
          <div class="uid">ID:{{userPeopleMsg.uid}}</div>
        </div>
        <div class="score">
          <em>{{lang.coinsScore}}</em>
          <strong>{{userPeopleMsg.score}}</strong>
        </div>
      </div>
    </div>
    <div class="mask" v-show="showNoFamily">
      <transition name="slide">
        <div class="noFamily" v-show="showNoFamily">
          <span class="close" @click="closeNoFamily()"></span>
          <p class="joinTips">{{lang.joinFamilyTips}}</p>
          <span class="btn" @click="goFamilyRank()">{{lang.join}}</span>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="sucSingUp">
      <transition name="slide">
        <div class="sucPup" v-show="sucSingUp">
          <span class="close" @click="closeSucPup()"></span>
          <p class="sucTips">{{lang.joinSuc}}</p>
          <strong class="familyRank">
            Gia tộc của bạn đạt thành tích xuất sắc trong năm 2019, toàn bộ gia tộc nhận điểm mị lực xếp hạng {{familyRank}},
            được tăng thêm {{familyAddition}}%!
          </strong>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="invitationIng">
      <transition name="slide">
        <div class="invitationed" v-show="invitationIng">
          <span class="close" @click="closeInvitation()"></span>
          <p class="invitationIng" v-html="lang.joinWait">
          </p>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="showPeople">
      <transition name="slide">
        <div class="familyPeople" v-show="showPeople">
          <span class="close"></span>
          <p class="noticeTips" v-html="lang.joinNoF">
          </p>
          <div class="peopleItem">
            <span v-for="(item,index) in familyPeople" :key="index">
              <img v-lazy="item.avatar" alt="">
              <strong class="name">{{item.nick}}</strong>
            </span>
          </div>
          <div class="btn" @click="sendNotice()">{{lang.quMsg}}</div>
        </div>
      </transition>
    </div>
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import api from "../api/apiConfig"
import MsgToast from "../components/commonToast"
import { globalBus } from '../utils/eventBus'
export default {
  components: { MsgToast },
  data() {
    return {
      tastMsg: '',
      showT: false,
      showNoFamily: false,
      sucSingUp: false,
      invitationIng: false,
      familyRank: 0,
      familyAddition: 0,
      familyPeople: [],
      showPeople: false
    }
  },
  computed: {
    ...mapState(['actStatus', 'registered', "isShare", 'showCom', 'msgGroups']),
    astState() {
      if (this.actStatus === 0) { //活动未开始
        return 0
      } else if (this.actStatus === 2) { //活动已结束
        return 2
      } else if (this.registered == 0 || this.isShare) { //活动开始未报名，或者分享
        return 1
      } else if (this.registered == 1 && this.showCom == 'rank1') { //活动开始已报名
        return 3
      } else if (this.registered == 1 && this.showCom == 'rank2') { //活动开始已报名
        return 4
      }
    },
    familyMsg() {
      return this.msgGroups['rank1'] ? this.msgGroups['rank1'].userMsg : {}
    },
    userPeopleMsg() {
      return this.msgGroups['rank2'] ? this.msgGroups['rank2'].userMsg : {}
    }
  },
  methods: {
    singUpAct() {
      globalBus.$emit('commonEvent', () => {
        let singUpType = this.msgGroups['rank1'].userMsg
        if (singUpType.type == 1 || singUpType.type == 2) {  //族长
          let rank_status = this.showCom == 'rank1' ? 0 : 1
          api.singUp(rank_status).then(res => {
            const { response_status, response_data } = res.data
            if (response_status.code == 0) {
              this.familyRank = response_data.year_top_rank
              this.familyAddition = response_data.year_top_scale
              if (this.familyRank > 0) {
                this.sucSingUp = true
              }
              this.$store.commit('changRegistered', 1)
              if (rank_status == 0) {
                this.$store.commit('updateMsgGroups', {
                  key: 'rank1',
                  userMsg: response_data.owner_msg,
                })
                this.$store.commit('addRank1', response_data.owner_msg)
              } else {
                this.$store.commit('updateMsgGroups', {
                  key: 'rank2',
                  userMsg: response_data.owner_msg,
                })
                this.$store.commit('addRank2', response_data.owner_msg)
              }
            } else {
              this.tastMsg = response_status.error
              this.showT = true
            }
          })
        } else if (singUpType.fid == 0) { //无家族加入家族
          this.showNoFamily = true
        } else if (singUpType.type == 0) {  //成员
          if (singUpType.invide_sign == 1) {
            this.invitationIng = true
          } else {
            api.share().then(res => {
              this.familyPeople = res.data.response_data.admin_list
              this.showPeople = true
            })
          }
        }
      })
    },
    goFamilyRank() {
      api.getFid().then(res => {
        let fid = res.data.response_data.fid
        location.href = `fid:${fid}`
      })
    },
    sendNotice() {  //发送通知
      globalBus.$emit('commonEvent', () => {
        api.sendNotice().then(res => {
          this.showPeople = false
          this.$store.commit('changInvide_sign', 1)
        })
      })
    },
    closeToast() {
      this.showT = false
    },
    closeNoFamily() {
      this.showNoFamily = false
    },
    closeSucPup() {
      this.sucSingUp = false
    },
    closeInvitation() {
      this.invitationIng = false
    },
    showUsCard() {
      this.$parent.$refs.rank.showFamilyCard(this.familyMsg)
    }
  }
}
</script>
<style lang="scss" scoped>
.footerBar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  .acrStatus {
    width: 7.5rem;
    height: 1.57rem;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(../assets/img/footerBg.png) no-repeat;
    background-size: contain;
    span {
      display: inline-block;
      color: #ffdb7b;
      font-size: 120%;
    }
    .noAct {
      margin-top: 0.5rem;
      font-weight: 700;
    }
    .goAct {
      display: block;
      width: 2.94rem;
      height: 0.92rem;
      background: url(../assets/img/singUp.png);
      background-size: 100% 100%;
      color: #4e2800;
      font-size: 120%;
      font-weight: 700;
      line-height: 0.8rem;
      text-align: center;
    }
    .familyMsg {
      height: 1.61rem;
      margin-top: 0.13rem;
      display: flex;
      align-items: center;
      .userRank {
        width: 0.75rem;
        height: 0.65rem;
        line-height: 0.65rem;
        text-align: center;
        color: #7f3e0a;
        font-size: 120%;
        font-weight: 800;
        margin-left: 0.08rem;
      }
      .imgBox {
        width: 1.45rem;
        height: 1.35rem;
        overflow: hidden;
        position: relative;
        .topImg {
          position: absolute;
          z-index: 10;
          display: block;
        }
        .defalute {
          width: 1.2rem;
          height: 1.2rem;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
        }
        .userImg {
          width: 1.15rem;
          height: 1.15rem;
          border-radius: 0.1rem;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .userMsg {
        flex: 1;
        margin-left: 0.06rem;
        .userPeople {
          height: 0.6rem;
          display: flex;
          .leftPeople {
            width: 1.7rem;
            .name {
              color: #ffeecb;
              font-size: 0.28rem;
              font-weight: 600;
              max-width: 1.7rem;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .rid {
              font-size: 0.22rem;
              color: #ffde9f;
            }
          }
          .rightPeople {
            width: 2.32rem;
            background: linear-gradient(
              -37deg,
              rgba(235, 173, 105, 0.6),
              rgba(169, 101, 58, 0.6)
            );
            border-radius: 0.1rem;
            display: flex;
            align-items: center;
            margin-left: 0.3rem;
            padding: 0 0.12rem;
            strong {
              font-size: 80%;
              color: #ffeecb;
              white-space: nowrap;
            }
            .peopelAvatar {
              width: 1.83rem;
              margin-left: 0.1rem;
              display: flex;
              align-items: center;
              justify-content: space-between;
              .pelpleItem {
                width: 0.5rem;
                height: 0.5rem;
                position: relative;
                .people {
                  width: 0.5rem;
                  height: 0.5rem;
                  border-radius: 50%;
                  box-sizing: border-box;
                  border: 0.02rem solid rgba(255, 188, 150, 1);
                  position: absolute;
                }
                .imgTips {
                  width: 0.61rem;
                  height: 0.63rem;
                  position: absolute;
                  top: -0.075rem;
                  left: -0.065rem;
                }
              }
            }
          }
        }
        .userScore {
          display: flex;
          margin-top: 0.1rem;
          span {
            display: block;
          }
          strong {
            font-size: 86%;
            font-weight: 500;
          }
          .rScore {
            color: #f4d3ff;
            font-size: 71%;
            width: 1.6rem;
          }
          .ticketScore {
            color: #baf6ff;
            font-size: 71%;
            // margin-left: 0.2rem;
          }
          .totalScore {
            color: #ffeecb;
            font-size: 71%;
            text-align: center;
            margin-left: 0.5rem;
            strong {
              font-size: 93%;
              font-weight: 600;
            }
          }
        }
      }
      &.rank1 {
        .userRank {
          text-indent: -999rem;
          background: url(../assets/img/top1.png);
          background-size: 100% 100%;
        }
        .topImg {
          display: block;
          width: 1.45rem;
          height: 1.35rem;
          background: url(../assets/img/rank1Img.png);
          background-size: 100% 100%;
        }
      }
      &.rank2 {
        .userRank {
          text-indent: -999rem;
          background: url(../assets/img/top2.png);
          background-size: 100% 100%;
        }
        .topImg {
          display: block;
          width: 1.45rem;
          height: 1.35rem;
          background: url(../assets/img/rank2Img.png);
          background-size: 100% 100%;
        }
      }
      &.rank3 {
        .userRank {
          text-indent: -999rem;
          background: url(../assets/img/top3.png);
          background-size: 100% 100%;
        }
        .topImg {
          display: block;
          width: 1.45rem;
          height: 1.35rem;
          background: url(../assets/img/rank3Img.png);
          background-size: 100% 100%;
        }
      }
    }
    .userRankMsg {
      height: 1.1rem;
      display: flex;
      align-items: center;
      margin: 0.15rem 0 0 -0.3rem;
      .userRank {
        width: 0.75rem;
        height: 0.65rem;
        line-height: 0.65rem;
        text-align: center;
        color: #7f3e0a;
        font-size: 120%;
        font-weight: 800;
      }
      .imgBox {
        width: 0.97rem;
        height: 1.02rem;
        position: relative;
        .topImg {
          width: 0.97rem;
          height: 1.02rem;
          position: absolute;
          z-index: 10;
        }
        .userImg {
          width: 0.8rem;
          height: 0.8rem;
          border-radius: 50%;
          border: 0.02rem solid #ffbc96;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .userMsg {
        width: 2rem;
        margin-left: 0.16rem;
        .name {
          max-width: 2rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 93%;
          color: #ffeecb;
        }
        .uid {
          font-size: 73%;
          color: #ffde9f;
        }
      }
      .score {
        text-align: center;
        margin-left: 0.8rem;
        em {
          display: block;
          font-size: 73%;
          color: #ffeecb;
        }
        strong {
          color: #ffeecb;
          font-size: 0.28rem;
        }
      }
      &.rank1 {
        .userRank {
          text-indent: -999rem;
          background: url(../assets/img/top1.png);
          background-size: 100% 100%;
        }
      }
      &.rank2 {
        .userRank {
          text-indent: -999rem;
          background: url(../assets/img/top2.png);
          background-size: 100% 100%;
        }
      }
      &.rank3 {
        .userRank {
          text-indent: -999rem;
          background: url(../assets/img/top3.png);
          background-size: 100% 100%;
        }
      }
    }
  }
}
.noFamily,
.sucPup,
.invitationed {
  width: 4.71rem;
  height: 2.56rem;
  padding-bottom: 0.15rem;
  background: url(../assets/img/pupBg1.png);
  background-size: 100% 100%;
  position: absolute;
  left: 1.45rem;
  top: 4.5rem;
  .close {
    display: block;
    width: 0.53rem;
    height: 0.53rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: -0.22rem;
    top: -0.8rem;
    transform: translate(-50%, 0);
  }
  p {
    color: #ffe79c;
    font-weight: 600;
    text-align: center;
  }
  .joinTips {
    margin: 0.7rem auto 0.6rem;
  }
  .sucTips {
    margin: 0.51rem auto 0.34rem;
  }
  .familyRank {
    display: block;
    text-align: center;
    font-size: 90%;
    padding: 0 0.36rem;
  }
  .invitationIng {
    text-align: center;
    color: #fff;
    font-size: 90%;
    font-weight: 400;
    margin: 1.02rem 0;
    padding: 0 0.2rem;
  }
  .btn {
    display: block;
    width: 1.87rem;
    height: 0.53rem;
    background: url(../assets/img/joinFamily.png);
    background-size: 100% 100%;
    text-align: center;
    line-height: 0.53rem;
    font-size: 90%;
    color: #4e2800;
    font-weight: 600;
    margin: 0 auto;
  }
}
.familyPeople {
  width: 4.71rem;
  height: 3.14rem;
  background: url(../assets/img/pupBg2.png);
  background-size: 100% 100%;
  position: absolute;
  left: 1.45rem;
  top: 4.5rem;
  padding-bottom: 0.15rem;
  .close {
    display: block;
    width: 0.53rem;
    height: 0.53rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: -0.22rem;
    top: -0.8rem;
    transform: translate(-50%, 0);
  }
  .noticeTips {
    text-align: center;
    font-size: 90%;
    padding: 0 0.2rem;
    margin: 0.39rem auto 0.25rem;
  }
  .peopleItem {
    display: flex;
    padding: 0 0.15rem;
    height: 0.9rem;
    justify-content: space-between;
    span {
      width: 25%;
    }
    img {
      display: block;
      width: 0.5rem;
      height: 0.5rem;
      border: 0.02rem solid rgba(255, 188, 150, 1);
      margin: 0 auto;
      border-radius: 50%;
    }
    .name {
      font-size: 86%;
      color: #ffeecb;
      font-weight: 500;
      max-width: 1.1rem;
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .btn {
    display: block;
    width: 1.87rem;
    height: 0.53rem;
    background: url(../assets/img/joinFamily.png);
    background-size: 100% 100%;
    text-align: center;
    line-height: 0.53rem;
    font-size: 86%;
    color: #4e2800;
    font-weight: 600;
    margin: 0.15rem auto;
  }
}
</style>
