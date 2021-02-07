<template>
  <div class='footerBar' v-if="astState">
    <span class="noAct noStatr" v-if="astState === 1"></span>
    <span class="noAct actEnd" v-if="astState === 2"></span>
    <span class="signUp" @click="signUpClick()" v-if="astState === 3"></span>
    <div class="userBoxStatus" v-if="astState == 4" :class="'rank' + nowUserMsg.rank">
      <div class="userMsg">
        <div class="rank" :class="{notRank:!nowUserMsg.rank}">{{nowUserMsg.rank?nowUserMsg.rank:lang.noRank}}</div>
        <div class="uerImg" @click="goUser(nowUserMsg.uid,nowUserMsg.kmic)">
          <img v-if="nowUserMsg.avatar_frame &&nowUserMsg.avatar_frame != ''" :src="nowUserMsg.avatar_frame" class="frame" alt="">
          <img v-else-if="nowUserMsg.nob > 0" :src="require(`../img/nob/${nowUserMsg.nob}.png`)" class="nob" alt="">
          <img v-lazy="nowUserMsg.avatar" alt="" class="av">
        </div>
        <div class="nickBox">
          <div class="nickTips"><span class="nick">{{nowUserMsg.nick}}</span> <i class="ktvIng" v-if="nowUserMsg.kmic"></i> </div>
          <span class="lv" v-if="Lv">{{level[Lv].name}}{{lang.lv}}</span>
        </div>
        <div class="score"><i class="coins"></i>{{nowUserMsg.score}}</div>
      </div>
      <div class="boxLiner">
        <span class="linerAct" :style="{width:linerWidth}"></span>
        <div class="boxItem " :class="'box' + index" v-for="(item,index) in level" :key="index">
          <div class="box_icon " :class="{act:item.get || item.can,shake:!item.get && item.can}" @click="openBox(index)"></div>
          <strong class="lvTips">{{item.name}}</strong>
        </div>
      </div>
    </div>
    <div class="userBoxStatus" v-if="astState == 5" :class="'rank' + nowUserMsg.rank">
      <div class="userMsg">
        <div class="rank" :class="{notRank:!nowUserMsg.rank}">{{nowUserMsg.rank?nowUserMsg.rank:lang.noRank}}</div>
        <div class="uerImg" @click="goKroom(nowUserMsg.info.rid)">
          <!-- <img v-if="nowUserMsg.avatar_frame &&nowUserMsg.avatar_frame != ''" :src="nowUserMsg.avatar_frame" class="frame" alt="">
          <img v-else-if="nowUserMsg.nob > 0" :src="require(`../img/nob/${nowUserMsg.nob}.png`)" class="nob" alt=""> -->
          <img v-lazy="nowUserMsg.info.pic_url" alt="" class="av room">
        </div>
        <div class="nickBox">
          <div class="nickTips"><span class="nick">{{nowUserMsg.info.rname}}</span> </div>
        </div>
        <div class="score"><i></i>{{nowUserMsg.score}}</div>
      </div>
      <div class="linerBox">
        <span>{{lang.room_pk}}</span>
        <div class="boxLiner">
          <span class="linerAct" :style="{width:nowUserMsg.score/100+'%'}"><i class="nums">{{nowUserMsg.score}}</i></span>
        </div>
        <div class="giftImg"></div>
      </div>
      <p class="totalTips">{{lang.room_pk_tips}}</p>
    </div>
    <div class="mask" v-show="showGiftPup">
      <transition name="slide">
        <div class="signUp_suc" v-show="showGiftPup">
          <i class="close" @click="showGiftPup = false"></i>
          <div class="giftList_get">
            <div class="giftItem" v-for="(item,index) in giftArr" :key="index" :class="{ml:giftArr.length >1}">
              <div class="imgBox">
                <img :src="item.image" alt="">
              </div>
              <strong>{{item.name}}</strong>
            </div>
          </div>
          <p>{{lang.room_gift_tips}}</p>
          <div class="ok" @click="showGiftPup = false">{{lang.ok}}</div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>

import { mapState } from 'vuex'
import { signUp, getGift } from "../apis"
export default {
  data() {
    return {
      showGiftPup: false,
      giftArr: [
        {
          name: 'xxxx',
          image: ''
        },
        {
          name: 'xxxx',
          image: ''
        }
      ]
    }
  },
  computed: {
    ...mapState(['step', 'tab', 'groupsUserMsg', 'reg', 'level', 'Lv']),
    astState() {
      console.log(this.tab)
      if (this.step === 0) { //活动未开始
        return 1
      } else if (this.step === 2) { //活动已结束
        return 2
      } else if (!this.reg || this.isShare) { //活动开始未报名，或者分享
        return 3
      } else if (this.reg && this.tab == 0) { //活动开始已报名
        return 4
      }
      else if (this.reg && this.tab == 'total') { //活动开始已报名
        return 5
      }
    },
    nowUserMsg() {
      return this.groupsUserMsg[this.tab] ? this.groupsUserMsg[this.tab].msg : { info: {} }
    },
    linerWidth() {
      if (this.Lv) {
        return this.nowUserMsg.score / this.level[this.level.length - 1].limit * 100 + '%'
      } else {
        return '0%'
      }

    }
  },
  methods: {
    signUpClick() {
      signUp().then(res => {
        if (res.data.response_status.code == 0) {
          this.toast(this.lang.singUp_suc)
          this.$store.dispatch('getInitInfo');
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    openBox(index) {
      if (this.level[index].can && !this.level[index].get) {
        getGift(index).then(res => {
          if (res.data.response_status.code == 0) {
            this.vxc('setBoxStatus', index)
            this.giftArr = res.data.response_data.data
            this.showGiftPup = true
          } else {
            this.toast(res.data.response_status.error)
          }
        })
      }
    },
    goKroom(rid) {
      location.href = `rid:${rid}`
    },
    goUser(uid, kmic) { //跳转
      if (kmic) {
        this.goKroom(kmic)
        return
      }
      location.href = `uid:${uid}`
    },
  }
}
</script>
<style lang="scss" scoped>
.footerBar {
  position: fixed;
  bottom: -0.02rem;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  .userBoxStatus {
    width: 100%;
    height: 2.59rem;
    background: #fff1d4;
    border-top: 0.04rem solid #830943;
    .userMsg {
      height: 1.4rem;
      display: flex;
      align-items: center;
      .rank {
        width: 0.75rem;
        height: 0.56rem;
        color: rgba(131, 9, 67, 1);
        text-align: center;
        line-height: 0.56rem;
        margin: 0 0.15rem;
        font-size: 0.32rem;
        font-weight: bold;
        white-space: nowrap;
        &.notRank {
          margin-right: 0.3rem;
        }
      }
      .uerImg {
        width: 1.1rem;
        height: 1.1rem;
        position: relative;
        .nob {
          width: 1.1rem;
          height: 1.1rem;
          position: absolute;
          top: 0rem;
          left: 0rem;
          z-index: 10;
        }
        .frame {
          width: 1.5rem;
          height: 1.5rem;
          position: absolute;
          top: -0.21rem;
          left: -0.2rem;
          z-index: 10;
        }
        .av {
          width: 0.88rem;
          height: 0.88rem;
          position: absolute;
          top: 0.1rem;
          left: 0.11rem;
          border-radius: 50%;
          border: 0.02rem solid rgba(131, 9, 67, 1);
          &.room {
            border-radius: 0.14rem;
          }
        }
      }
      .nickBox {
        width: 2.6rem;
        margin-left: 0.2rem;
        .nickTips {
          display: flex;
          align-items: center;
          .nick {
            max-width: 1.7rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 0.32rem;
            color: rgba(131, 9, 67, 1);
          }
          .ktvIng {
            width: 0.28rem;
            height: 0.22rem;
            background: url(../img/ktvIng.png);
            background-size: 100% 100%;
            margin-left: 0.1rem;
          }
        }

        .lv {
          display: inline-block;
          font-size: 0.2rem;
          padding: 0 0.1rem;
          height: 0.32rem;
          background: #f8db5d;
          border: 0.02rem solid #830943;
          border-radius: 0.05rem;
          text-align: center;
          line-height: 0.32rem;
          margin-top: 0.1rem;
        }
      }
      .score {
        display: flex;
        align-items: center;
        font-size: 0.28rem;
        margin-left: 0.15rem;
        color: rgba(131, 9, 67, 1);
        i {
          width: 0.31rem;
          height: 0.38rem;
          background: url(../img/fire.png);
          background-size: 100% 100%;
          margin-right: 0.1rem;
          &.coins {
            width: 0.35rem;
            background: url(../img/coinsIcon.png);
            background-size: 100% 100%;
          }
        }
      }
    }
    .linerBox {
      height: 0.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      > span {
        width: 1.2rem;
        font-size: 0.22rem;
        white-space: nowrap;
      }
      .boxLiner {
        margin: 0 0 0 0.1rem;
        width: 5rem;
      }
      .giftImg {
        width: 0.64rem;
        height: 0.64rem;
        background: url(../img/top2.png);
        background-size: 100% 100%;
        margin-left: 0.15rem;
      }
    }
    .boxLiner {
      width: 6.4rem;
      height: 0.16rem;
      background: #afafaf;
      border: 0.02rem solid #830943;
      border-radius: 0.08rem;
      margin: 0.25rem 0.2rem 0;
      position: relative;
      .linerAct {
        max-width: 100%;
        height: 0.16rem;
        background: linear-gradient(90deg, #f8db5d, #99c28c);
        border-right: 0.02rem solid #830943;
        border-radius: 0.08rem;
        position: absolute;
        left: 0;
        top: 0;
        .nums {
          display: block;
          width: 0.84rem;
          height: 0.48rem;
          text-align: center;
          line-height: 0.4rem;
          font-size: 0.24rem;
          background: url(../img/totalScoreNums.png);
          background-size: 100% 100%;
          position: absolute;
          right: -0.42rem;
          top: -0.5rem;
        }
      }
      .boxItem {
        position: absolute;
        top: -0.3rem;
        .lvTips {
          display: block;
          text-align: center;
          width: 0.7rem;
          font-size: 0.24rem;
          color: rgba(131, 9, 67, 1);
          position: absolute;
          bottom: -0.4rem;
          left: -0.1rem;
        }
        .box_icon {
          &.shake {
            animation: jiggle 2s ease-in-out infinite;
            -o-animation: jiggle 2s ease-in infinite;
            -webkit-animation: jiggle 2s ease-in infinite;
            -moz-animation: jiggle 2s ease-in infinite;
            -ms-animation: jiggle 2s ease-in infinite;
          }
        }

        &.box1 {
          left: 16%;
          .box_icon {
            width: 0.57rem;
            height: 0.61rem;
            background: url(../img/boxImg/f_box1_black.png);
            background-size: 100% 100%;

            &.act {
              background: url(../img/boxImg/f_box1.png);
              background-size: 100% 100%;
            }
          }
        }
        &.box2 {
          left: 36%;
          .box_icon {
            width: 0.57rem;
            height: 0.61rem;
            background: url(../img/boxImg/f_box2_black.png);
            background-size: 100% 100%;

            &.act {
              background: url(../img/boxImg/f_box2.png);
              background-size: 100% 100%;
            }
          }
        }
        &.box3 {
          left: 56%;
          .box_icon {
            width: 0.57rem;
            height: 0.61rem;
            background: url(../img/boxImg/f_box3_black.png);
            background-size: 100% 100%;

            &.act {
              background: url(../img/boxImg/f_box3.png);
              background-size: 100% 100%;
            }
          }
        }
        &.box4 {
          left: 76%;
          .box_icon {
            width: 0.57rem;
            height: 0.61rem;
            background: url(../img/boxImg/f_box4_black.png);
            background-size: 100% 100%;

            &.act {
              background: url(../img/boxImg/f_box4.png);
              background-size: 100% 100%;
            }
          }
        }
        &.box5 {
          left: 96%;
          .box_icon {
            width: 0.57rem;
            height: 0.61rem;
            background: url(../img/boxImg/f_box5_black.png);
            background-size: 100% 100%;
            &.act {
              background: url(../img/boxImg/f_box5.png);
              background-size: 100% 100%;
            }
          }
        }
      }
    }
    &.rank1 {
      .rank {
        text-indent: -999rem;
        background: url(../img/top1.png);
        background-size: 100% 100%;
      }
    }
    &.rank2 {
      .rank {
        text-indent: -999rem;
        background: url(../img/top2.png);
        background-size: 100% 100%;
      }
    }
    &.rank3 {
      .rank {
        text-indent: -999rem;
        background: url(../img/top3.png);
        background-size: 100% 100%;
      }
    }
  }
  .totalTips {
    text-align: center;
    font-size: 0.22rem;
  }
  .signUp_suc {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    position: relative;
    .giftList_get {
      display: flex;
      align-items: center;
      justify-content: center;
      .giftItem {
        &.ml {
          margin-left: 0.3rem;
        }
        .imgBox {
          width: 1.6rem;
          height: 1.6rem;
          background: #ffe6cb;
          border-radius: 0.12rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        strong {
          display: block;
          text-align: center;
        }
      }
    }
    > p {
      padding: 0 0.3rem;
      text-align: center;
      font-size: 0.24rem;
      margin: 0.4rem auto;
    }
    .ok {
      width: 2.18rem;
      height: 0.72rem;
      background: url(../img/tabs_act.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.72rem;
      margin: 0.4rem auto 0;
    }
    .close {
      display: block;
      width: 0.34rem;
      height: 0.34rem;
      background: url(../img/close.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0.3rem;
      top: 0.6rem;
    }
  }
}
</style>
