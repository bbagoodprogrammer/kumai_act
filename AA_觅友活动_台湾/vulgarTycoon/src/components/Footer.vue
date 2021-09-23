<template>
  <div class="footer">
    <span class="notAct" v-if="actStatus == 2 || actStatus==0">{{actStatus == 2?lang.actEnd:lang.noStart}}</span>
    <!-- 用戶信息 -->
    <div class="userMsg" :class="['rank' + nowUserMsg.rank]" v-if="actStatus == 1">
      <div class="userRank">{{nowUserMsg.rank}}</div>
      <div class="imgBox">
        <img :src="nowUserMsg.avatar_frame" alt="" v-if="nowUserMsg.avatar_frame" class="frame">
        <img v-lazy="nowUserMsg.avatar" alt="" class="avatar">
      </div>
      <div class="msg">
        <div class="nick">{{nowUserMsg.nick}}</div>
        <div class="iconList" v-if="nowUserMsg.wealth_lv > 0 || (nowUserMsg.medals && nowUserMsg.medals.length)">
          <img :src="nowUserMsg2.url" alt="" v-for="(nowUserMsg2,index2) in nowUserMsg.medals" :key="index2">
          <div class="inner" v-if="nowUserMsg.wealth_lv">
            <img :src="require(`../img/wealv/icon${ parseInt(nowUserMsg.wealth_lv / 10)}.png`)" alt="" class="icon_lv">
            <span :class="{gt:nowUserMsg.wealth_lv>=10,
              bg9:nowUserMsg.wealth_lv>=1 && nowUserMsg.wealth_lv<10,
              bg10:nowUserMsg.wealth_lv>=10 && nowUserMsg.wealth_lv<20,
              bg20:nowUserMsg.wealth_lv>=20 && nowUserMsg.wealth_lv<30,
              bg30:nowUserMsg.wealth_lv>=30 && nowUserMsg.wealth_lv<40,
              bg40:nowUserMsg.wealth_lv>=40 && nowUserMsg.wealth_lv<50,
              bg50:nowUserMsg.wealth_lv>=50}">{{nowUserMsg.wealth_lv}}
            </span>
          </div>
        </div>
      </div>
      <div class="score">
        <i>{{lang.scoreName}}</i>
        <em>{{nowUserMsg.score}}</em>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  computed: {
    ...mapState(['activity', 'groupsUserMsg', 'tab', 'owner']),
    actStatus () {
      if (this.activity.activity_status == 0 || this.activity.activity_status == 2) {
        return this.activity.activity_status
      } else {
        return 1
      }
    },
    nowUserMsg () {
      if (this.tab == 0) {
        return this.owner
      } else {
        const rankConf = this.groupsUserMsg[this.tab] || {};
        return rankConf.msg || {};
      }

    }
  }
}
</script>

<style lang="scss">
.footer {
  width: 100%;
  height: 1.53rem;
  background: url(../img/footer.png);
  background-size: 100% 100%;
  position: fixed;
  z-index: 1;
  bottom: 0;
  .notAct {
    display: block;
    width: 3.41rem;
    height: 0.72rem;
    background: url(../img/notAct.png);
    background-size: 100% 100%;
    text-align: center;
    line-height: 0.72rem;
    margin: 0.5rem auto 0;
    color: #2F2F2F;
  }
}
.userMsg {
  display: flex;
  align-items: center;
  position: relative;
  .userRank {
    width: 1rem;
    height: 0.86rem;
    text-align: center;
    line-height: 0.86rem;
    font-size: 0.32rem;
    font-weight: bold;
    //   color: #F2E87E;
    margin: 0 0.09rem 0 0.05rem;
    display: flex;
    align-items: center;
    justify-content: center;
    i {
      text-align: center;
      line-height: 0.51rem;
    }
  }
  .imgBox {
    position: relative;
    margin-left: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.08rem;
    height: 1.08rem;
    .frame {
      width: 1.836rem;
      height: 1.836rem;
      position: absolute;
      left: -0.378rem;
      top: -0.378rem;
      z-index: 2;
    }
    .avatar {
      width: 1.08rem;
      height: 1.08rem;
      border-radius: 50%;
      box-sizing: border-box;
      border: 0.03rem solid #fff;
    }
  }
  .msg {
    width: 2.3rem;
    margin-left: 0.15rem;
    display: flex;
    flex-direction: column;
    // align-items: center;
    justify-content: center;
    .nick {
      font-size: 0.28rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .iconList {
      height: 0.4rem;
      display: flex;
      align-items: center;
      margin-top: 0.1rem;
      > img {
        width: 0.39rem;
        height: 0.43rem;
        margin-left: 0.05rem;
      }
      .inner {
        display: flex;
        justify-content: center;
        box-sizing: border-box;
        margin-left: 0.1rem;
        .icon_lv {
          display: inline-block;
          width: 0.4rem;
          height: 0.4rem;
          position: relative;
        }
        span {
          display: inline-block;
          width: 0.67rem;
          height: 0.4rem;
          line-height: 0.4rem;
          background: linear-gradient(322deg, #8C8995 0%, #BCBBC7 100%);
          border-radius: 0 0.25rem 0.25rem 0;
          margin: 0 0 0 -0.25rem;
          font-size: 0.28rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: #FFFFFF;
          box-sizing: border-box;
          text-align: center;
          padding-left: 0.16rem;
          &.gt {
            width: 0.87rem;
          }
          &.bg9 {
            background: linear-gradient(322deg, #4A85B2 0%, #7BABD2 100%);
          }
          &.bg10 {
            background: linear-gradient(322deg, #40ABA1 0%, #69C9D2 100%);
          }
          &.bg20 {
            background: linear-gradient(322deg, #4AC96C 0%, #94E9AB 100%);
          }
          &.bg30 {
            background: linear-gradient(322deg, #BF883B 0%, #E4C396 100%);
          }
          &.bg40 {
            background: linear-gradient(322deg, #CE7445 0%, #D29473 100%);
          }
          &.bg50 {
            background: linear-gradient(322deg, #C55451 0%, #D46B71 100%);
          }
        }
        .privilege_icon {
          width: 2rem;
          height: 1.6rem;
        }
        .privilege4 {
          width: 2rem;
          height: 2rem;
        }
        .float {
          width: 2rem;
          height: 0.88rem;
        }
      }
    }
  }
  .score {
    //   height: 0.46rem;
    flex: 1;
    text-align: center;
    position: relative;
    i {
      display: block;
      text-align: center;
      font-size: 0.22rem;
      color: #FFE7B8;
    }
    em {
      font-size: 0.32rem;
    }
  }
}
.userMsg {
  width: 7.5rem;
  height: 1.29rem;
  padding-top: 0.2rem;
  background: url(../img/footer.png) !important;
  background-size: 100% 100%;
  .userRank {
    margin-left: 0.15rem;
    text-indent: 0 !important;
  }
  .userRank,
  .nick,
  .score {
    color: #fff !important;
    em {
      color: #fff !important;
    }
  }
}
</style>