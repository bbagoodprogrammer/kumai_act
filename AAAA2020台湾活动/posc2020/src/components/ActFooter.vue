<template>
  <div class="footerBar">
    <div class="acrStatus">
      <div class="noAct" v-if="astState === 0">{{lang.noAct}}</div>
      <div class="noAct" v-if="astState === 2">{{lang.actEd}}</div>
      <div class="goAct" :class="{type1:showType == 1}" v-if="astState === 1">
        <p v-if="showType == 1">本活動僅對簽約用戶開放參賽資格，<br />快去簽約成為簽約用戶</p>
        <p v-else>本活動僅對簽約用戶開放參賽資格，<br /> 快去成為粉絲，Pick你喜歡的選手送他們出道吧！</p>
        <div class="signUp" v-if="showType == 1" @click="goSingNing()">快去簽約</div>
      </div>
      <div class="user_1" :class="{up:nowUserScore.up}" v-if="astState == 3 || astState == 5 || astState == 6">
        <p v-if="nowUserScore.up && astState == 3">恭喜您成功晉級，快去準備下一輪比賽吧～ </p>
        <p v-else-if="nowUserScore.up && astState == 5">恭喜您代表戰隊成功晉級，快去準備終極決賽吧，出道位在等著你～</p>
        <p v-else-if="nowUserScore.up && astState == 6">恭喜您通過重重考驗，終於以第{{nowUserScore.rank}}名成功在年度C位爭奪賽出道！</p>
        <div class="user_1_msg" :class="[{icon:astState == 6},'rank' + nowUserScore.rank]">
          <div class="imgBox" @click="goUser(nowUserScore.uid)">
            <span class="avBg" v-if="nowUserScore.rank <=3"></span>
            <img v-else-if="nowUserMsg.frame &&nowUserMsg.frame != ''" :src="nowUserMsg.frame" class="frame">
            <img v-lazy="nowUserMsg.avatar" alt="">
            <span class="rank" v-if="nowUserScore.rank>3">No.{{nowUserScore.rank}}</span>
          </div>
          <div class="userMsg">
            <div class="nick">{{nowUserMsg.nick}}</div>
            <div class="uid">ID:{{nowUserMsg.uid}}</div>
            <div class="group" v-if="astState == 5">戰隊:{{groupName[nowUserScore.team]}}</div>
            <div class="star"><i></i><em>{{nowUserScore.score}}</em> </div>
          </div>
          <div class="score">
            <div class="work"><i></i><em>{{nowUserScore.work}}</em> </div>
            <div class="ktv"><i></i><em>{{nowUserScore.ktv}}</em></div>
            <div class="room"><i></i><em>{{nowUserScore.room}}</em></div>
          </div>
        </div>
      </div>
      <div class="user_2" :class="{up:nowUserScore.up}" v-if="astState == 4" @click="shouCards()">
        <p v-if="nowUserScore.up">恭喜您成功晉級，快去準備下一輪比賽吧～ </p>
        <div class="pkMsg">
          <!-- :class="{textL:nowUserScore.rank <=3}" -->
          <span class="rank">{{nowUserScore.rank}}</span>
          <div class="pkUser">
            <div class="userItem">
              <div class="imgBox">
                <img v-if="nowUserScore.uid1.user.frame &&nowUserScore.uid1.user.frame != ''" :src="nowUserScore.uid1.user.frame" class="frame">
                <img v-lazy="nowUserScore.uid1.user.avatar" alt="" class="av" :class="{bor:!nowUserScore.uid1.user.frame ||nowUserScore.uid1.user.frame == ''}">
                <i class='upIcon' :class="{lose:nowUserScore.uid1.cancel,up:nowUserScore.uid1.up}" v-if="nowUserScore.uid1.cancel || nowUserScore.uid1.up"></i>
              </div>
              <strong class="nick">{{nowUserScore.uid1.user.nick}}</strong>
              <div class="score"><i></i><em>{{nowUserScore.uid1.user.total}}</em></div>
            </div>
            <div class="userItem">
              <div class="imgBox">
                <img v-if="nowUserScore.uid2.user.frame && nowUserScore.uid2.user.frame != ''" :src="nowUserScore.uid2.user.frame" class="frame">
                <img v-lazy="nowUserScore.uid2.user.avatar" alt="" class="av" :class="{bor:!nowUserScore.uid2.user.frame ||nowUserScore.uid2.user.frame == ''}">
                <i class='upIcon' :class="{lose:nowUserScore.uid2.cancel,up:nowUserScore.uid2.up}" v-if="nowUserScore.uid2.cancel || nowUserScore.uid2.up"></i>
              </div>
              <strong class="nick">{{nowUserScore.uid2.user.nick}}</strong>
              <div class="score"><i></i><em>{{nowUserScore.uid2.score}}</em></div>
            </div>
            <span class="vs"></span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import getString from "../utils/getString"
export default {
  data() {
    return {
      groupName: {
        1: "節奏王者",
        2: "Melodic",
        3: "閱動人間",
        4: "BPM 109"
      }
    }
  },
  computed: {
    ...mapState(['actStatus', 'kol', 'nowTab', "isShare", "initGrounps", "showType"]),
    astState() {
      // return 1
      if (this.actStatus === 0) { //活动未开始
        return 0
      } else if (!this.kol || this.isShare) { //不是签约用户
        return 1
      } else if (this.nowTab == 1 && this.nowInitData.reg && this.showType >= this.nowTab) { //活动开始已报名
        return 3
      } else if (this.nowTab == 2 && this.nowInitData.reg && this.showType >= this.nowTab) { //活动开始已报名
        return 4
      } else if (this.nowTab == 3 && this.nowInitData.reg && this.showType >= this.nowTab) { //活动开始已报名
        return 5
      } else if (this.nowTab == 4 && this.nowInitData.reg && this.showType >= this.nowTab) { //活动开始已报名
        return 6
      }
    },
    nowUserScore() {
      console.log(this.initGrounps)
      return this.initGrounps[this.nowTab].owner ? this.initGrounps[this.nowTab].owner : {
        uid1: { user: {} },
        uid2: { user: {} }
      }
    },
    nowUserMsg() {
      console.log(this.initGrounps[this.nowTab])
      return this.initGrounps[this.nowTab].user ? this.initGrounps[this.nowTab].user : {}
    },
    nowInitData() {
      return this.initGrounps[this.nowTab]
    }
  },
  methods: {
    goSingNing() {
      let uid = getString('uid')
      let token = getString('token')
      location.href = `http://act.17sing.tw/signing/index.html?uid=${uid}&token=${token}`
    },
    goUser(uid) {
      location.href = `uid:${uid}`
    },
    shouCards() {
      let uid1 = this.nowUserScore.uid1
      let uid2 = this.nowUserScore.uid2
      for (let i in uid1.user) {
        uid1[i] = uid1.user[i]
      }
      for (let i in uid2.user) {
        uid2[i] = uid2.user[i]
      }
      this.$parent.$refs.list.showPkMsg([uid1, uid2])
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
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    .noAct {
      width: 100%;
      height: 0.99rem;
      background: url(../assets/img/noAct.png);
      background-size: 100% 100%;
      font-size: 0.36rem;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      text-align: center;
      line-height: 0.99rem;
    }
    .goAct {
      width: 100%;
      height: 1.18rem;
      background: url(../assets/img/footerBg2.png);
      background-size: 100% 100%;
      padding-top: 0.42rem;
      &.type1 {
        height: 1.77rem;
        background: url(../assets/img/footerBg1.png);
        background-size: 100% 100%;
      }
      p {
        text-align: center;
        font-size: 0.28rem;
        color: rgba(255, 255, 255, 0.6);
      }
      .signUp {
        width: 3.28rem;
        height: 0.8rem;
        text-align: center;
        line-height: 0.8rem;
        font-size: 0.29rem;
        color: rgba(176, 77, 39, 1);
        font-weight: 600;
        background: url(../assets/img/singUp.png);
        background-size: 100% 100%;
        margin: 0.1rem auto 0;
      }
    }
  }
  .user_1 {
    width: 7.5rem;
    height: 1.84rem;
    padding-top: 0.35rem;
    background: url(../assets/img/footerBg3.png);
    background-size: 100% 100%;
    &.up {
      height: 2.79rem;
      padding-top: 0.4rem;
      background: url(../assets/img/footerBg4.png);
      background-size: 100% 100%;
      p {
        text-align: center;
        font-size: 0.28rem;
        color: rgba(255, 220, 112, 1);
        padding: 0 0.6rem;
      }
      .user_1_msg {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 0.24rem;
        margin: 0.1rem auto 0;
      }
    }
    .user_1_msg {
      width: 7.06rem;
      height: 1.6rem;
      margin-bottom: 0.04rem;
      display: flex;
      align-items: center;
      margin: 0 auto;
      .imgBox {
        width: 1.2rem;
        height: 1.2rem;
        position: relative;
        margin: 0 0.15rem 0 0.14rem;
        .frame {
          width: 1.5rem;
          height: 1.5rem;
          position: absolute;
          top: -0.16rem;
          left: -0.16rem;
          z-index: 10;
        }
        .avBg {
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: 2;
        }
        img {
          width: 0.88rem;
          height: 0.88rem;
          border-radius: 50%;
          position: absolute;
          left: 0.16rem;
          top: 0.16rem;
        }
        .rank {
          display: block;
          width: 0.73rem;
          height: 0.28rem;
          line-height: 0.28rem;
          background: url(../assets/img/rankBg.png);
          background-size: 100% 100%;
          position: absolute;
          bottom: 0.15rem;
          left: 0.24rem;
          z-index: 20;
          color: rgba(251, 250, 185, 1);
          font-size: 0.18rem;
          font-weight: 600;
          text-align: center;
        }
      }
      .userMsg {
        width: 3rem;
        .nick,
        .uid,
        .group {
          font-size: 0.28rem;
          color: rgba(255, 255, 255, 0.6);
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .star {
          display: flex;
          align-items: center;
          i {
            width: 0.36rem;
            height: 0.33rem;
            background: url(../assets/img/star.png);
            background-size: 100% 100%;
            margin-right: 0.09rem;
          }
          em {
            color: rgba(255, 220, 112, 1);
            font-weight: 600;
          }
        }
      }
      .score {
        margin-left: 0.6rem;
        > div {
          display: flex;
          align-items: center;
          i {
            width: 0.46rem;
            height: 0.26rem;
            margin-right: 0.08rem;
          }
          em {
            color: rgba(254, 254, 254, 0.6);
            font-size: 0.24rem;
          }
          &.work {
            i {
              background: url(../assets/img/work.png);
              background-size: 100% 100%;
            }
          }
          &.ktv {
            margin: 0.12rem 0;
            i {
              background: url(../assets/img/ktv.png);
              background-size: 100% 100%;
            }
          }
          &.room {
            i {
              background: url(../assets/img/room.png);
              background-size: 100% 100%;
            }
          }
        }
      }
      &.icon {
        .star {
          i {
            background: url(../assets/img/store.png);
            background-size: 100% 100%;
          }
        }
        .ktv {
          i {
            width: 0.78rem;
            background: url(../assets/img/ktv2.png) !important;
            background-size: 100% 100% !important;
          }
        }
        .room {
          i {
            width: 0.78rem;
            background: url(../assets/img/ktv3.png) !important;
            background-size: 100% 100% !important;
          }
        }
      }
      &.rank1 {
        .avBg {
          background: url(../assets/img/type1_top1.png);
          background-size: 100% 100%;
        }
      }
      &.rank2 {
        .avBg {
          background: url(../assets/img/type1_top2.png);
          background-size: 100% 100%;
        }
      }
      &.rank3 {
        .avBg {
          background: url(../assets/img/type1_top3.png);
          background-size: 100% 100%;
        }
      }
    }
  }
  .user_2 {
    width: 7.5rem;
    height: 2.45rem;
    padding-top: 0.24rem;
    background: url(../assets/img/footerBg5.png);
    background-size: 100% 100%;
    &.up {
      height: 3.04rem;
      padding-top: 0.55rem;
      background: url(../assets/img/footerBg6.png);
      background-size: 100% 100%;
      p {
        text-align: center;
        font-size: 0.28rem;
        color: rgba(255, 220, 112, 1);
        padding: 0 0.6rem;
      }
      .pkMsg {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 0.24rem;
        padding-top: 0.15rem;
      }
    }
    .pkMsg {
      width: 7.06rem;
      height: 2.2rem;
      display: flex;
      align-items: center;
      margin: 0.21rem auto 0;
    }
    .rank {
      width: 1rem;
      height: 1rem;
      text-align: center;
      line-height: 1rem;
      margin: -1rem 0 0 0.5rem;
      font-size: 0.4rem;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.8);
    }
    .pkUser {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 0.7rem;
      position: relative;
      .userItem {
        width: 1.5rem;
        .imgBox {
          width: 1.2rem;
          height: 1.2rem;
          position: relative;
          margin: 0 auto;
          .frame {
            width: 2.04rem;
            height: 2.04rem;
            position: absolute;
            left: -0.42rem;
            top: -0.42rem;
            z-index: 20;
          }
          .av {
            width: 1.2rem;
            height: 1.2rem;
            border-radius: 50%;
            display: block;
            margin: 0 auto;
            position: absolute;
            &.bor {
              border: 0.04rem solid rgba(255, 208, 80, 1);
              box-sizing: border-box;
            }
          }
          .upIcon {
            display: block;
            width: 0.8rem;
            height: 0.8rem;
            z-index: 21;
            position: absolute;
            right: -0.2rem;
            bottom: -0.2rem;
            &.up {
              background: url(../assets/img/up.png);
              background-size: 100% 100%;
            }
            &.lose {
              background: url(../assets/img/lose.png);
              background-size: 100% 100%;
            }
          }
        }

        .nick {
          display: block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.26rem;
          margin: 0.1rem 0 0.08rem;
          text-align: center;
        }
        .score {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 0.3rem;
          i {
            width: 0.28rem;
            height: 0.26rem;
            background: url(../assets/img/star.png);
            background-size: 100% 100%;
            margin-top: -0.05rem;
          }
          em {
            color: rgba(254, 242, 140, 1);
            font-size: 0.26rem;
            margin-left: 0.06rem;
            // text-align: center;
          }
        }
      }
      .vs {
        display: block;
        width: 0.51rem;
        height: 0.4rem;
        background: url(../assets/img/vs.png);
        background-size: 100% 100%;
        position: absolute;
        left: 1.8rem;
        top: 0.6rem;
      }
    }
    .textL {
      text-indent: -999rem;
    }
    &.rank1 {
      background: url(../assets/img/type2_top1.png);
      background-size: 100% 100%;
    }
    &.rank2 {
      background: url(../assets/img/type2_top2.png);
      background-size: 100% 100%;
    }
    &.rank3 {
      background: url(../assets/img/type2_top3.png);
      background-size: 100% 100%;
    }
  }
}
</style>
