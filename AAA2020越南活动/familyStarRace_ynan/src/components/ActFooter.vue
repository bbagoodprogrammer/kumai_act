<template>
  <div class="footerBar">
    <div class="acrStatus" :class="{noBg:astState === 3 && showType == 2 && !nowUsrMsg.pk_data}">
      <span class="noAct" v-if="astState === 0">{{lang.noAct}}</span>
      <span class="noAct" v-if="astState === 2">{{lang.actEd}}</span>
      <span class="goAct" v-if="astState === 1" @click="singUp()">Báo danh</span>
      <div class="actIng" :class="'rank'+nowUsrMsg.rank" v-if="astState === 3 && showType == 1">
        <div class="rank" v-if="nowUsrMsg.rank >0">{{nowUsrMsg.rank}}</div>
        <div class="rank noTop" v-else>Chưa lên bảng</div>
        <div class="uerImg">
          <img v-if="nowUsrMsg.nob > 0" :src="require(`../assets/img/nob/${nowUsrMsg.nob}.png`)" class="nob" alt="">
          <i class="vip" v-else-if="nowUsrMsg.vip > 0">VIP{{nowUsrMsg.vip}}</i>
          <span class="imgBg" v-if="nowUsrMsg.nob ==  0"></span>
          <img v-lazy="nowUsrMsg.avatar" alt="" class="imgItem">
        </div>
        <div class="userMsg">
          <div class="name"><strong> {{nowUsrMsg.nick}}</strong> <span class="star" v-if="nowTab == 'total'"><i></i>{{nowUsrMsg.score}} </span> </div>
          <div class="score" v-if="nowTab != 'total'">Điểm sao {{nowDays}}：{{nowUsrMsg.score}}</div>
        </div>
        <div class="updaSong">
          <div class="btn" @click="goCommitSong()">Đăng bài hát</div>
          <div class="luckTips">Tỷ lệ trúng：{{nowUsrMsg.pro}}%</div>
        </div>
        <i class="luck" v-if="nowTab != 'total' && nowUsrMsg.is_prize"></i>
      </div>
      <div class="family" v-else-if="astState === 3 && showType == 2 && nowUsrMsg.pk_data">
        <div class="familyMsg" v-if="!nowUsrMsg.empty">
          <div class="btn" @click="goCommitSong()" v-if="nowUsrMsg.show">Đăng bài hát</div>
          <div class="family1 family">
            <img v-lazy="nowUsrMsg.pk_data.left.avatar" class="fImg" alt="" @click="showCards(nowUsrMsg.pk_data.left.fid)">
            <div class="msg">
              <div class="nick">{{nowUsrMsg.pk_data.left.name}}</div>
              <div class="star"><i></i><strong>{{nowUsrMsg.pk_data.left.score}}</strong></div>
            </div>
          </div>
          <div class="family2 family">
            <div class="msg">
              <div class="nick">{{nowUsrMsg.pk_data.right.name}}</div>
              <div class="star"><i></i><strong>{{nowUsrMsg.pk_data.right.score}}</strong></div>
            </div>
            <img v-lazy="nowUsrMsg.pk_data.right.avatar" class="fImg2" alt="" @click="showCards(nowUsrMsg.pk_data.right.fid)">
          </div>
        </div>
        <div class="familyMsg noOpen" v-else>
          <div class="family1 family">
            <img v-lazy="nowUsrMsg.pk_data.left.avatar" class="fImg" alt="" @click="showCards(nowUsrMsg.pk_data.left.fid)">
            <div class="msg">
              <div class="nick">{{nowUsrMsg.pk_data.left.name}}</div>
              <div class="star"><i></i><strong>{{nowUsrMsg.pk_data.left.score}}</strong></div>
            </div>
          </div>
          <div class="tipsMsg">
            <p class="noOpponents">Không cần đấu，Qua vòng</p>
            <div class="songBtn" @click="goCommitSong()" v-if="nowUsrMsg.show">Đăng bài hát</div>
          </div>
        </div>
        <div class="fLiner" v-if="!nowUsrMsg.empty">
          <span class="left" :style="{width:getWidth(nowUsrMsg.pk_data.left.score,nowUsrMsg.pk_data.right.score)}"> <i class="giftBox"></i></span>
          <span class="right"></span>
        </div>
      </div>
      <div class="last3" v-else-if="astState === 3 && showType == 3">
        <div class="last">
          <div class="rank" v-if="nowUsrMsg.rank >0">{{nowUsrMsg.rank}}</div>
          <div class="rank noTop" v-else>Chưa lên bảng</div>
          <div class="uerImg">
            <img v-lazy="nowUsrMsg.avatar" alt="" class="imgItem" @click="showCards(nowUsrMsg.fid)">
          </div>
          <div class="userMsg">
            <div class="name" :class="'lv'+nowUsrMsg.level"><strong>{{nowUsrMsg.name}} </strong> </div>
            <div class="score"><i></i> <strong>{{nowUsrMsg.score}}</strong> </div>
          </div>
          <div class="btn" @click="goCommitSong()" v-if="nowUsrMsg.show">Đăng bài hát</div>
        </div>
        <div class="linerBox" v-if="nowUsrMsg.level <3">
          <strong>Đủ điểm sẽ phát {{nowUsrMsg.next?nowUsrMsg.next.name:''}}</strong>
          <div class="liner">
            <div class="actLiner" :style="{width:nowUsrMsg.score/(nowUsrMsg.next?nowUsrMsg.next.limit:0) * 100 +'%'}"><i>{{nowUsrMsg.score}}</i></div>
          </div>
          <span class="fScore">{{nowUsrMsg.next?nowUsrMsg.next.limit:0}}</span>
        </div>
      </div>
    </div>
    <div class="mask" v-show="showQuery">
      <transition name="slide">
        <div class="promptBox" v-show="showQuery">
          <i class="close" @click="close()"></i>
          <p>Mời vào gia tộc trước đã</p>
          <div class="ok" @click="goFamily()">
            Nhấn vào
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import getString from "../utils/getString"
import { mapState } from 'vuex'
import api from "../api/apiConfig"
import { globalBus } from '../utils/eventBus'
import getDate from "../utils/getDate"
export default {
  props: ['fid'],
  data() {
    return {
      showQuery: false
    }
  },
  computed: {
    ...mapState(['actStatus', 'dateArr', 'groupsUserMsg', "nowTab", "showType", "isShare", "registered"]),
    astState() {
      if (this.actStatus === 0) { //活动未开始
        return 0
      } else if (this.actStatus === 2) { //活动已结束
        return 2
      } else if (!this.registered || this.isShare) { //活动开始未报名，或者分享
        return 1
      } else if (this.registered) { //活动开始已报名
        return 3
      }
    },
    nowUsrMsg() {
      let nowList = this.groupsUserMsg[this.showType][this.nowTab] || {}
      console.log(nowList, this.groupsUserMsg)
      return nowList.msg || {}
    },
    nowDays() {
      return getDate(new Date(this.dateArr[this.nowTab - 1] * 1000), 1)
    }
  },
  methods: {
    showQueryPup() {
      this.showQuery = true
    },
    close() {
      this.showQuery = false
    },
    singUp() {
      globalBus.$emit('commonEvent', (callback) => {
        console.log(this.fid)
        if (this.fid) {
          this.showQueryPup()
        } else {
          api.singUp().then(res => {
            const { response_status, response_data } = res.data
            if (response_status.code == 0) {
              this.vxc('setUserSingUp', true)
              this.vxc('setToast', {
                msg: 'Chúc mừng bạn đã báo danh, top 300 BXH Tổng được vào vòng sau và đại diện gia tộc tham gia cuộc thi Ngôi Sao Gia Tộc.'
              })
            } else {
              this.vxc('setToast', {
                msg: response_status.error
              })
            }
          })
        }

      })
    },
    goFamily() {
      location.href = `fid:${this.fid}`
    },
    showCards(fid) {
      this.$parent.$refs.scorll.showFamily(fid)
    },
    goCommitSong() {
      let regstr = getString('token')
      location.href = `./index4.html?token=${regstr}`
    },
    getWidth(score1, score2) {
      return score1 / (score1 + score2) * 100 + '%'
    },
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
    height: 1.5rem;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(../assets/img/footer.png) no-repeat;
    background-size: 100% 100%;
    &.noBg {
      background: none;
    }
    span {
      display: inline-block;
    }
    .noAct {
      font-size: 0.48rem;
      font-weight: 700;
      color: rgba(135, 61, 29, 1);
    }
    .goAct {
      width: 3.26rem;
      height: 0.9rem;
      background: url(../assets/img/singUp.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.9rem;
      font-size: 0.4rem;
      font-weight: bold;
      margin-top: 0.2rem;
      color: rgba(137, 63, 30, 1);
    }
    .actIng {
      width: 7.5rem;
      display: flex;
      align-items: center;
      margin-top: 0.2rem;
      .rank {
        width: 0.84rem;
        height: 0.72rem;
        font-size: 0.46rem;
        text-align: center;
        line-height: 0.72rem;
        margin-left: 0.13rem;
        color: rgba(137, 63, 30, 1);
        &.noTop {
          font-size: 0.24rem;
          line-height: 0.3rem;
        }
      }
      .uerImg {
        width: 1.21rem;
        height: 1.01rem;
        position: relative;
        margin-left: 0.21rem;
        .imgBg {
          width: 1rem;
          height: 1.01rem;
          background: url(../assets/img/av4.png);
          background-size: 100% 100%;
          position: absolute;
          z-index: 10;
        }
        .imgItem {
          width: 0.94rem;
          height: 0.94rem;
          position: absolute;
          top: 0.035rem;
          left: 0.03rem;
          border-radius: 50%;
        }
        .nob {
          width: 1.2rem;
          height: 1.2rem;
          position: absolute;
          top: -0.1rem;
          left: -0.1rem;
          z-index: 10;
        }
        .vip {
          display: block;
          width: 0.8rem;
          height: 0.3rem;
          background: #fc6161;
          font-size: 0.24rem;
          color: #fffca1;
          position: absolute;
          bottom: 0rem;
          border-radius: 0.3rem;
          text-align: center;
          line-height: 0.3rem;
          left: 0.1rem;
          z-index: 11;
        }
      }
      .userMsg {
        width: 2.7rem;
        .name {
          display: flex;
          align-items: center;
          max-width: 2.5rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 0.26rem;
          color: rgba(137, 63, 30, 1);
          strong {
            // flex: 1;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .star {
            display: flex;
            align-items: center;
            i {
              width: 0.4rem;
              height: 0.38rem;
              background: url(../assets/img/star.png);
              background-size: 100% 100%;
              margin: 0 0.08rem 0 0.26rem;
            }
          }
        }
        .score {
          display: flex;
          align-items: center;
          color: rgba(137, 63, 30, 1);
          font-size: 0.22rem;
          font-weight: 500;
          i {
            display: block;
            margin-right: 0.1rem;
            width: 0.22rem;
            height: 0.25rem;
            background: url(../assets/img/coins.png);
            background-size: 100% 100%;
          }
        }
      }
      .updaSong {
        margin-left: 0.3rem;
        .btn {
          width: 1.55rem;
          height: 0.61rem;
          text-align: center;
          line-height: 0.61rem;
          background: url(../assets/img/songBtn.png);
          background-size: 100% 100%;
          margin: 0 auto;
          color: rgba(137, 63, 30, 1);
          font-size: 0.26rem;
        }
        .luckTips {
          color: rgba(137, 63, 30, 1);
          font-size: 0.22rem;
          text-align: center;
        }
      }
      .luck {
        display: block;
        width: 0.97rem;
        height: 0.77rem;
        background: url(../assets/img/award.png);
        background-size: 100% 100%;
        position: absolute;
        bottom: 0;
        right: 1.94rem;
        z-index: 0;
      }
      &.rank1 {
        .rank {
          text-indent: -999rem;
          background: url(../assets/img/top1.png);
          background-size: 100% 100%;
        }
      }
      &.rank2 {
        .rank {
          text-indent: -999rem;
          background: url(../assets/img/top2.png);
          background-size: 100% 100%;
        }
      }
      &.rank3 {
        .rank {
          text-indent: -999rem;
          background: url(../assets/img/top3.png);
          background-size: 100% 100%;
        }
      }
    }
  }
}
.last3 {
  .last {
    width: 7.5rem;
    display: flex;
    align-items: center;
    margin-top: 0.05rem;
    .rank {
      width: 0.75rem;
      height: 0.65rem;
      font-size: 0.46rem;
      color: rgba(137, 63, 30, 1);
      text-align: center;
      line-height: 0.72rem;
      margin-left: 0.13rem;
        &.noTop {
          font-size: 0.24rem;
          line-height: 0.3rem;
        }
    }
    .uerImg {
      margin: 0 0.15rem 0 0.08rem;
      .imgItem {
        width: 0.96rem;
        height: 0.96rem;
        border-radius: 0.16rem;
      }
    }
    .userMsg {
      width: 2.3rem;
      margin-right: 0.15rem;
      .name {
        width: 1.44rem;
        height: 0.54rem;
        padding-left: 0.63rem;
        color: rgba(137, 63, 30, 1);
        background: url(../assets/img/lv0.png);
        background-size: 100% 100%;
        strong {
          line-height: 0.54rem;
          display: block;
          height: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        &.lv1 {
          background: url(../assets/img/lv1.png);
          background-size: 100% 100%;
        }
        &.lv2 {
          background: url(../assets/img/lv2.png);
          background-size: 100% 100%;
        }
        &.lv3 {
          background: url(../assets/img/lv3.png);
          background-size: 100% 100%;
        }
      }
      .score {
        display: flex;
        align-items: center;
        margin-top: 0.06rem;
        color: rgba(137, 63, 30, 1);
        i {
          width: 0.4rem;
          height: 0.38rem;
          background: url(../assets/img/star.png);
          background-size: 100% 100%;
          margin-right: 0.1rem;
        }
        strong {
          font-size: 0.26rem;
        }
      }
    }
    .btn {
      width: 1.55rem;
      height: 0.61rem;
      text-align: center;
      line-height: 0.61rem;
      background: url(../assets/img/songBtn.png);
      background-size: 100% 100%;
      margin: 0 auto;
      color: rgba(137, 63, 30, 1);
      font-size: 0.26rem;
    }
  }
  .linerBox {
    display: flex;
    align-items: center;
    justify-content: center;
    > strong {
      display: block;
      width: 1.8rem;
      font-size: 0.22rem;
      color: rgba(137, 63, 30, 1);
      margin-right: 0.15rem;
      line-height: 0.25rem;
    }
    .liner {
      width: 4rem;
      height: 0.16rem;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 0.08rem;
      margin-top: 0.1rem;
      position: relative;
      .actLiner {
        width: 5%;
        height: 100%;
        position: absolute;
        background: linear-gradient(
          90deg,
          rgba(255, 91, 177, 1) 0%,
          rgba(255, 56, 56, 1) 100%
        );
        border-radius: 0.08rem;
        i {
          display: block;
          width: 0.7rem;
          text-align: center;
          color: #ffeeba;
          font-size: 0.22rem;
          position: absolute;
          right: -0.4rem;
          top: -0.3rem;
        }
      }
    }
    .fScore {
      font-size: 0.23rem;
      color: rgba(255, 216, 98, 1);
      margin: 0.1rem 0 0 0.11rem;
    }
  }
}
.family {
  width: 100%;
}
.familyMsg {
  // width: 100%;
  height: 1.1rem;
  padding: 0 0.3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  .noOpponents {
    font-size: 0.24rem;
    color: rgba(255, 245, 129, 1);
  }
  .btn {
    width: 1.55rem;
    height: 0.61rem;
    text-align: center;
    line-height: 0.61rem;
    background: url(../assets/img/songBtn.png);
    background-size: 100% 100%;
    margin: 0 auto;
    color: rgba(137, 63, 30, 1);
    font-size: 0.26rem;
    position: absolute;
    left: 2.9rem;
    top: 0.19rem;
  }
  &.noOpen {
    .songBtn {
      width: 1.55rem;
      height: 0.61rem;
      text-align: center;
      line-height: 0.61rem;
      background: url(../assets/img/songBtn.png);
      background-size: 100% 100%;
      margin: 0 auto;
      color: rgba(137, 63, 30, 1);
      font-size: 0.26rem;
      margin-top: 0.12rem;
    }
  }
  .family {
    width: 2.7rem;
    display: flex;
    align-items: center;
    &.family2 {
      .msg {
        margin: 0 0.1rem;
      }
    }
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 0.3rem;
    }
    .msg {
      margin-left: 0.14rem;
      .nick {
        max-width: 1.5rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: rgba(137, 63, 30, 1);
      }
      .star {
        display: flex;
        align-items: center;
        font-size: 0.24rem;
        color: rgba(137, 63, 30, 1);
        i {
          width: 0.31rem;
          height: 0.29rem;
          background: url(../assets/img/star.png);
          background-size: 100% 100%;
          margin-right: 0.06rem;
        }
      }
    }
  }
}
.fLiner {
  width: 6.3rem;
  height: 0.16rem;
  display: flex;
  align-items: center;
  margin: 0 auto;
  span {
    height: 100%;
  }
  .left {
    width: 50%;
    background: linear-gradient(
      90deg,
      rgba(255, 144, 83, 1) 0%,
      rgba(255, 58, 58, 1) 39%
    );
    border-radius: 0.08rem 0 0 0.08rem;
    position: relative;
    .giftBox {
      position: absolute;
      width: 0.53rem;
      height: 0.54rem;
      background: url(../assets/img/giftBox.png);
      background-size: 100% 100%;
      right: -0.27rem;
      top: -0.24rem;
    }
  }
  .right {
    flex: 1;
    border-radius: 0 0.08rem 0.08rem 0;
    background: linear-gradient(
      90deg,
      rgba(255, 141, 40, 1) 39%,
      rgba(255, 208, 106, 1) 100%
    );
  }
}
.queryBox {
  width: 6.59rem;
  height: 3.98rem;
  background: url(../assets/img/toastBg.png);
  background-size: 100% 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    font-size: 0.38rem;
    font-weight: 600;
    text-align: center;
    padding: 0 0.15rem;
    color: #983347;
  }
  .btnBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.3rem;
    span {
      width: 2.57rem;
      height: 0.72rem;
      background: url(../assets/img/actDayTitle.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.72rem;
      &.ok {
        margin-left: 0.25rem;
      }
    }
  }
}
</style>
