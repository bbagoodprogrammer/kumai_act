<template>
  <div class="footerBar">
    <div class="acrStatus" :class="{noStart:astState == 0,actEd:astState == 2,singUp:astState == 1}" @click="singUp()">
      <div class="actIng" v-if="astState === 3">
        <div class="total" v-if="tab != 'total'">
          <div class="imgBox" @click="goUser(nowMsg.uid)">
            <img v-if="nowMsg.frame &&nowMsg.frame != ''" :src="nowMsg.frame" class="frame" alt="">
            <img v-else-if="nowMsg.nob > 0" :src="require(`../assets/img/nob/${nowMsg.nob}.png`)" class="nob" alt="">
            <img v-lazy="nowMsg.avatar" alt="" class="av">
          </div>
          <!-- <img :src="nowMsg.avatar" alt="" class="av"> -->
          <div class="songMsg">
            <div class="mySong">我的參賽歌曲數：{{nowMsg.total}}</div>
            <div class="topNum">已飆升歌曲數：{{nowMsg.up}}</div>
          </div>
          <div class="commitSongBtn" @click="commitSong()">上傳作品</div>
        </div>
        <div class="left" :class="'rank' +nowMsg.rank" v-else>
          <div class="rank">{{nowMsg.rank}}</div>
          <div class="imgBox" @click="goUser(nowMsg.user.uid)">
            <img v-if="nowMsg.user.frame &&nowMsg.user.frame != ''" :src="nowMsg.user.frame" class="frame" alt="">
            <img v-else-if="nowMsg.user.nob > 0" :src="require(`../assets/img/nob/${nowMsg.user.nob}.png`)" class="nob" alt="">
            <img v-lazy="nowMsg.user.avatar" alt="" class="av">
          </div>
          <div class="score">
            <div class="lv">Lv.{{nowMsg.level}} <em class="lvScore">閃耀值：{{nowMsg.score}}</em> </div>
            <div class="iconScore">
              <span> <i class="sIcon1"></i>{{nowMsg.like}}</span>
              <span> <i class="sIcon2"></i>{{nowMsg.charm}}</span>
            </div>
          </div>
          <div class="commitSongBtn" @click="commitSong()">上傳作品</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { globalBus } from '../utils/eventBus'
import api from "../api/apiConfig"
import getString from "../utils/getString"
export default {
  computed: {
    ...mapState(['actStatus', 'reg', 'tab', 'groupsUserMsg', "isShare"]),
    astState() {
      if (this.actStatus === 0) { //活动未开始
        return 0
      } else if (this.actStatus === 2) { //活动已结束
        return 2
      } else if (!this.reg || this.isShare) { //活动开始未报名，或者分享
        return 1
      } else if (this.reg) { //活动开始已报名
        return 3
      }
    },
    nowMsg() {
      return this.groupsUserMsg[this.tab] ? this.groupsUserMsg[this.tab].msg : {}
    }
  },
  methods: {
    singUp() {
      globalBus.$emit('commonEvent', () => {
        if (this.astState == 1) {
          api.singUp().then(res => {
            if (res.data.response_status.code == 0) {
              this.$parent.$refs.scorll.onRefresh()
              let top = res.data.response_data.top
              if (top) {
                this.vxc('setToast', {
                  msg: `恭喜您2020年1-10月作品總收金幣禮魅力值排名第${top[0]},獲得本活動魅力歌王榜魅力值加成${top[1]}%`,
                })
              }
            } else {
              this.toast(res.data.response_status.error)
            }
          })
        }
      })
    },
    commitSong() {
      globalBus.$emit('commonEvent', () => {
        let token = getString('token')
        location.href = `./index3.html?token=${token}`
      })
    },
    goUser(uid) { //跳转
      location.href = `uid:${uid}`
    },
    goSong(sid) {
      location.href = 'songid:{"songlist":[' + sid + '],"index":0}';
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
    height: 1.27rem;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(../assets/img/footer.png);
    background-size: contain;
    &.noStart {
      height: 0.96rem;
      background: url(../assets/img/footer/noStart.png);
      background-size: 100% 100%;
    }
    &.actEd {
      height: 0.96rem;
      background: url(../assets/img/footer/actEd.png);
      background-size: 100% 100%;
    }
    &.singUp {
      height: 0.96rem;
      background: url(../assets/img/footer/singUp.png);
      background-size: 100% 100%;
    }
  }
  .actIng {
    width: 100%;
    height: 100%;
    .total {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .imgBox {
        width: 1.1rem;
        height: 1.1rem;
        position: relative;
        margin-left: 0.6rem;
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
          box-sizing: border-box;
          border: 0.04rem solid #f7e0a0;
        }
        &.ml {
          margin-left: 0.7rem;
        }
      }
      .songMsg {
        font-size: 0.26rem;
        .topNum {
          margin-top: 0.1rem;
        }
      }
    }
    .commitSongBtn {
      width: 2.21rem;
      height: 0.65rem;
      background: url(../assets/img/footer/commit.png);
      background-size: 100% 100%;
      text-align: center;
      font-size: 0.24rem;
      color: rgba(126, 26, 6, 1);
      line-height: 0.65rem;
      margin-left: 0.7rem;
    }
  }
  .left {
    height: 1.4rem;
    display: flex;
    align-items: center;
    position: relative;
    padding: 0 0.3rem;
    .rank {
      width: 0.76rem;
      height: 0.65rem;
      text-align: center;
      line-height: 0.65rem;
      font-size: 0.32rem;
    }
    .imgBox {
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
        box-sizing: border-box;
        border: 0.04rem solid #f7e0a0;
      }
    }
    .msg {
      width: 2rem;
      .nick {
        font-size: 0.28rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .add {
        width: 1.07rem;
        height: 0.33rem;
        background: linear-gradient(90deg, #d19d51 0%, #edca92 100%);
        border: 0.02rem solid #ffef9d;
        box-sizing: border-box;
        border-radius: 0.17rem;
        text-align: center;
        line-height: 0.33rem;
        color: rgba(96, 37, 0, 1);
        font-size: 0.22rem;
        margin-top: 0.15rem;
      }
    }
    .score {
      flex: 1;
      .lv {
        white-space: nowrap;
        color: rgba(252, 245, 193, 1);
        font-size: 0.24rem;
        text-align: center;
        em {
          font-size: 0.24rem;
        }
      }
      .iconScore {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.28rem;
        margin-top: 0.15rem;
        span {
          font-size: 0.28rem;
          display: flex;
          align-items: center;
          i {
            width: 0.36rem;
            height: 0.36rem;
            margin-right: 0.05rem;
          }
          .sIcon1 {
            background: url(../assets/img/rank/sIcon1.png);
            background-size: 100% 100%;
          }
          .sIcon2 {
            background: url(../assets/img/rank/sIcon2.png);
            background-size: 100% 100%;
          }
        }
      }
    }
    &.rank1 {
      .rank {
        text-indent: -999rem;
        background: url(../assets/img/rank/top1.png);
        background-size: 100% 100%;
      }
    }
    &.rank2 {
      .rank {
        text-indent: -999rem;
        background: url(../assets/img/rank/top2.png);
        background-size: 100% 100%;
      }
    }
    &.rank3 {
      .rank {
        text-indent: -999rem;
        background: url(../assets/img/rank/top3.png);
        background-size: 100% 100%;
      }
    }
  }
}
</style>
