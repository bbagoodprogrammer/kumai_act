<template>
  <div class="footerBar" v-if="astState">
    <div class="acrStatus">
      <span class="noAct" v-if="astState === 1">{{lang.noAct}}</span>
      <span class="noAct" v-if="astState === 2">{{lang.actEd}}</span>
      <span class="noAct" v-if="astState === 4" @click="scorllTo()">{{lang.luck}}</span>
      <div class="actIng" v-if="astState === 3" :class="['rank' + owner.rank]">
        <div class="userRank">{{owner.rank}}</div>
        <div class="imgBox">
          <img :src="owner.avatar_frame" alt="" v-if="owner.avatar_frame" class="frame">
          <img v-lazy="owner.avatar" alt="" class="avatar">
        </div>
        <div class="msg">
          <div class="nick">{{owner.nick}}</div>
          <div class="iconList" v-if="owner.wealth_lv || (owner.medals && owner.medals.length)">
            <img :src="item2.url" alt="" v-for="(item2,index2) in owner.medals" :key="index2">
            <div class="inner" v-if="owner.wealth_lv">
              <img :src="getIcon(owner.wealth_lv)" alt="" class="icon_lv">
              <span :class="{gt:owner.wealth_lv>=10,
              bg9:owner.wealth_lv>=1 && owner.wealth_lv<10,
              bg10:owner.wealth_lv>=10 && owner.wealth_lv<20,
              bg20:owner.wealth_lv>=20 && owner.wealth_lv<30,
              bg30:owner.wealth_lv>=30 && owner.wealth_lv<40,
              bg40:owner.wealth_lv>=40 && owner.wealth_lv<50,
              bg50:owner.wealth_lv>=50,
              }">{{owner.wealth_lv}}</span>
            </div>
          </div>
        </div>
        <div class="score">
          <i>{{lang.scoreName}}</i>
          <em>{{owner.score}}</em>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['activity', 'owner']),
    astState () {
      if (this.activity.activity_status === 0) { //活动未开始
        return 1
      } else if (this.activity.activity_status === 2) { //活动已结束
        return 2
      } else if (this.owner && this.owner.score == 0) { //活动开始已报名
        return 4
      } else if (this.owner) { //活动开始已报名
        return 3
      }
    },
  },
  methods: {
    scorllTo () {
      //   let e = document.documentElement.scrollTop || document.body.scrollTop
      this.timer = setInterval(() => {
        let c = document.documentElement.scrollTop || document.body.scrollTop
        let t = (0 - c) / 10
        window.scrollTo(0, c + t)
        if (c < 1) {
          clearInterval(this.timer)
        }
      }, 10)
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
    height: 1.21rem;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(../img/footer.png);
    background-size: 100% 100%;
    padding-top: 1.1rem;
    span {
      display: inline-block;
    }
    .noAct {
      width: 2.7rem;
      height: 0.92rem;
      font-size: 0.36rem;
      margin-top: 0.1rem;
      background: url(../img/get.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.92rem;
      color: #6C0000;
    }
    .goAct {
      display: block;
      width: 100%;
      height: 0.96rem;
      position: fixed;
      bottom: 0;
    }
    .actIng {
      height: 1.53rem;
      display: flex;
      align-items: center;
      margin-bottom: 0.06rem;
      .userRank {
        width: 1rem;
        height: 0.86rem;
        text-align: center;
        line-height: 0.86rem;
        font-size: 0.32rem;
        font-weight: bold;
        color: #E352FD;
        margin: 0 0.09rem 0 0.05rem;
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
        margin-top: 0.15rem;
        .nick {
          font-size: 0.28rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .iconList {
          height: 0.6rem;
          display: flex;
          margin-top: 0.1rem;
          > img {
            width: 0.49rem;
            height: 0.53rem;
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
              margin-top: 0.1rem;
            }
            span {
              display: inline-block;
              width: 0.67rem;
              height: 0.4rem;
              line-height: 0.4rem;
              background: linear-gradient(322deg, #8C8995 0%, #BCBBC7 100%);
              border-radius: 0 0.25rem 0.25rem 0;
              margin: 0.1rem 0 0 -0.25rem;
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
        flex: 1;
        text-align: center;
        position: relative;
        i {
          display: block;
          color: #FFD25F;
          font-size: 0.28rem;
          //   text-align: right;
        }
        em {
          display: block;
          width: 2rem;
          height: 0.37rem;
          border-radius: 0.1rem;
          margin-top: 0.04rem;
        }
      }

      &.rank1 {
        .userRank {
          text-indent: -999rem;
          background: url(../img/top1.png);
          background-size: 100% 100%;
        }
      }
      &.rank2 {
        .userRank {
          text-indent: -999rem;
          background: url(../img/top2.png);
          background-size: 100% 100%;
        }
      }
      &.rank3 {
        .userRank {
          text-indent: -999rem;
          background: url(../img/top3.png);
          background-size: 100% 100%;
        }
      }
    }
    li:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
