<template>
  <div class="footerBar" v-if="astState">
    <div class="acrStatus" :class="{noBg:astState === 3 && showType == 2 && !nowUsrMsg.pk_data}">
      <span class="noAct" v-if="astState === 0">{{lang.noAct}}</span>
      <span class="noAct" v-if="astState === 2">{{lang.actEd}}</span>
      <span class="goAct" v-if="astState === 1" @click="singUp()">立即報名</span>
      <div class="noKroom" v-if="astState === 3">
        <p>- 申請創建家族 -</p>
        <div class="creatMsg">
          <!-- <div class="rank">{{nowUsrMsg.rank}}</div> -->
          <div class="family">
            <img v-lazy="nowUsrMsg.info.avatar" class="fImg" alt="" @click.stop="showFamily(nowUsrMsg.info.fid)">
            <span class="fLv" :class="{lv2:nowUsrMsg.info.level >5 && nowUsrMsg.info.level <=10,lv3:nowUsrMsg.info.level >10 && nowUsrMsg.info.level <=15,lv4:nowUsrMsg.info.level >15}">
              <i class="num">{{nowUsrMsg.info.level}}</i>
              <strong>家族</strong>
            </span>
          </div>
          <div class="msg">
            <div class="scoreTips">房間收禮金幣魅力值</div>
            <div class="score">{{charm}}</div>
            <div class="bar">收禮進度
              <div class="liner">
                <div class="actLiner" :style="{width:charm / 2000 +'%'}">
                  <i class="giftBox"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="creatBtn">
            <div class="look" @click="creatFamily()"></div>
            <div class="join" @click="goFamily()">加入家族</div>
          </div>
        </div>
      </div>
      <div class="actIng" :class="'rank'+nowUsrMsg.rank" v-if="astState === 4">
        <div class="rank">{{nowUsrMsg.rank}}</div>
        <div class="uerImg">
          <img v-lazy="nowUsrMsg.info.avatar" alt="" class="imgItem">
          <span class="fLv" :class="{lv2:nowUsrMsg.info.level >5 && nowUsrMsg.info.level <=10,lv3:nowUsrMsg.info.level >10 && nowUsrMsg.info.level <=15,lv4:nowUsrMsg.info.level >15}">
            <i class="num">{{nowUsrMsg.info.level}}</i>
            <strong>家族</strong>
          </span>
        </div>
        <div class="userMsg">
          <div class="name">{{nowUsrMsg.info.familyname}} </div>
          <div class="totalScore"> <i></i> {{nowUsrMsg.score}}</div>
        </div>
        <div class="score">
          <i>+</i>
          <div class="star"><i></i> {{nowUsrMsg.score - nowUsrMsg.task}}</div>
          <div class="num"><i></i> {{nowUsrMsg.task}}</div>
        </div>
        <span class="award" v-if="nowUsrMsg.join"></span>
      </div>
      <div class="stage2List" v-else-if="astState === 5">
        <div class="rank">{{nowUsrMsg.rank}}</div>
        <div class="PKmsg">
          <i class="up left" v-if="nowUsrMsg.pk_data&&nowUsrMsg.pk_data.left.win"></i>
          <i class="up right" v-if="nowUsrMsg.pk_data.right&&nowUsrMsg.pk_data.right.win"></i>
          <div class="familyMsg">
            <div class="family1 family">
              <img v-lazy="nowUsrMsg.pk_data.left.avatar" class="fImg" alt="" @click.stop="showFamily(nowUsrMsg.pk_data.left.fid)">
              <span class="fLv" :class="{lv2:nowUsrMsg.pk_data.left.level >5 && nowUsrMsg.pk_data.left.level <=10,lv3:nowUsrMsg.pk_data.left.level >10 && nowUsrMsg.pk_data.left.level <=15,lv4:nowUsrMsg.pk_data.left.level >15}">
                <i class="num">{{nowUsrMsg.pk_data.left.level}}</i>
                <strong>家族</strong>
              </span>
            </div>
            <div class="fLiner" v-if="!nowUsrMsg.empty">
              <span class="left" :style="{width:getWidth(nowUsrMsg.pk_data.left.score,nowUsrMsg.pk_data.right.score),top:nowUsrMsg.pk_data.right.score > 0}"></span>
              <div class="star lScore"><i></i><strong>{{nowUsrMsg.pk_data.left.score}}</strong></div>
              <div class="star rScore"><i></i><strong>{{nowUsrMsg.pk_data.right.score}}</strong></div>
            </div>
            <div class="leftMsg" v-else>
              <div class="leftName">
                {{nowUsrMsg.pk_data.left.name}}
              </div>
              <div class="star lScore"><i></i><strong>{{nowUsrMsg.pk_data.left.score}}</strong></div>
            </div>
            <div class="family2 family" v-if="!nowUsrMsg.empty">
              <img v-lazy="nowUsrMsg.pk_data.right.avatar" class="fImg2" alt="" v-if="!nowUsrMsg.empty" @click.stop="showFamily(nowUsrMsg.pk_data.right.fid)">
              <span class="fLv" :class="{lv2:nowUsrMsg.pk_data.right.level >5 && nowUsrMsg.pk_data.right.level <=10,lv3:nowUsrMsg.pk_data.right.level >10 && nowUsrMsg.pk_data.right.level <=15,lv4:nowUsrMsg.pk_data.right.level >15}">
                <i class="num">{{nowUsrMsg.pk_data.right.level}}</i>
                <strong>家族</strong>
              </span>
            </div>
            <div class="noFamily" v-else>
              幸運輪空，直接晉級
            </div>
          </div>
          <div class="familyName" v-if="!nowUsrMsg.empty">
            <div class="leftName">
              {{nowUsrMsg.pk_data.left.name}}
            </div>
            <i class="vs"></i>
            <div class="rightName">
              {{nowUsrMsg.pk_data.right.name}}
            </div>
          </div>
        </div>
      </div>
      <div class="stage3List" v-else-if="astState === 6">
        <i class="adScore"></i>
        <div class="rank">{{nowUsrMsg.rank}}</div>
        <div class="uerImg">
          <img v-lazy="nowUsrMsg.info.avatar" alt="" class="imgItem" @click.stop="showFamily(nowUsrMsg.fid)">
          <span class="fLv" :class="{lv2:nowUsrMsg.info.level >5 && nowUsrMsg.info.level <=10,lv3:nowUsrMsg.info.level >10 && nowUsrMsg.info.level <=15,lv4:nowUsrMsg.info.level >15}">
            <i class="num">{{nowUsrMsg.info.level}}</i>
            <strong>家族</strong>
          </span>
        </div>
        <div class="userMsg">
          <div class="name"><strong>{{nowUsrMsg.info.familyname}} </strong> </div>
          <div class="score"><i></i> <strong>{{nowUsrMsg.score}}</strong> </div>
        </div>
        <div class="shareBtn" v-if="nowUsrMsg.owner" @click="sendMsg()">
          一鍵召喚<br />
          家族成員
        </div>
      </div>
    </div>
    <div class="mask" v-show="showQuery">
      <transition name="slide">
        <div class="qureyPup" v-show="showQuery">
          <i class="close" @click="close()"></i>
          <p>請先加入一個家族！</p>
          <div class="btnBox">
            <div class="join" @click="goFamily()">
              加入家族
            </div>
            <div class="creat" @click="creatFamily()">
              申請創建家族
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="showCommitPup">
      <transition name="slide">
        <div class="commitMsg" v-show="showCommitPup">
          <i class="close" @click="showCommitPup = false"></i>
          <h3>召喚成員</h3>
          <div class="title">通知正文</div>
          <input id='msg' maxlength="20" v-model="comMsg" />
          <div class="title">K歌房ID（選填）</div>
          <input id='rid' maxlength="10" v-model="comRid" />
          <div class="tipsBox" v-if="sendType == 3">
            本月可召喚{{nowUsrMsg.nums}}次<br />
            收到通知的成員，點擊通知直接進入家族主頁或知道K歌房<br />
            如填入ID時，成員點擊通知可直接進入對應K歌房，請確保ID正確
          </div>
          <div class="tipsBox" v-else-if="sendType == 1">
            家族等級達到10級後解鎖該功能
          </div>
          <div class="commitBtn" @click="call()" :class="{black:nowUsrMsg.nums <= 0 || sendType == 1}">
            發送
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
      showQuery: false,
      showCommitPup: false,
      comMsg: '',
      comRid: '',
      sendType: 3
    }
  },
  computed: {
    ...mapState(['actStatus', 'dateArr', 'groupsUserMsg', "nowTab", "showType", "isShare", "registered", "charm"]),
    astState() {
      // return 4
      if (this.actStatus === 0) { //活动未开始
        return 0
      } else if (this.actStatus === 2) { //活动已结束
        return 2
      } else if ((!this.registered && this.charm == -1) || this.isShare) { //沒家族沒K房
        return 1
      } else if (!this.registered && this.charm != -1) { //沒家族有K房
        return 3
      } else if (this.showType == 1) {
        return 4
      } else if (this.showType == 2 && this.nowUsrMsg.pk_data) {
        return 5
      } else if (this.showType == 3 && this.nowUsrMsg.fid) {
        return 6
      }
    },
    nowUsrMsg() {
      let nowList = this.groupsUserMsg[this.showType][this.showType] || {}
      console.log(this.showType, nowList, this.groupsUserMsg)
      return nowList.msg || {
        info: {}
      }
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
        this.showQueryPup()
      })
    },
    goFamily() {
      location.href = `fid:${this.fid}`
    },
    creatFamily() {
      let token = getString('token')
      let uid = getString('uid')
      location.href = `http://act.17sing.tw/createFamily/index.html?uid=${uid}&token=${token}`
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
    sendMsg() {
      if (this.nowUsrMsg.info.level < 10) {
        this.sendType = 1
      } else {
        this.sendType = 3
      }
      this.showCommitPup = true
    },
    call() {
      if (this.nowUsrMsg.nums <= 0 || this.sendType == 1) {
        return
      } else if (this.comMsg == '') {
        this.toast(`請填寫通知內容~`)
        return
      }
      api.call(this.fid, this.comMsg, this.comRid).then(res => {
        this.showCommitPup = false
        if (res.data.response_status.code == 0) {
          this.vxc('reduexNums')
          this.toast('已進行一鍵召喚')
        } else {
          this.toast(res.data.response_status.error)
        }
      })
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
    height: 2.06rem;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(../assets/img/footer.png) no-repeat;
    background-size: 100% 100%;
    span {
      display: inline-block;
    }
    .noAct {
      font-size: 0.48rem;
      color: rgba(137, 63, 30, 1);
      margin-top: 0.5rem;
    }
    .goAct {
      width: 3.28rem;
      height: 1.04rem;
      background: url(../assets/img/singUp.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 1.04rem;
      font-size: 0.4rem;
      font-weight: bold;
      margin-top: 0.4rem;
      color: rgba(65, 44, 6, 1);
    }
    .noKroom {
      width: 100%;
      p {
        margin-top: 0.35rem;
        text-align: center;
        font-size: 0.26rem;
        color: rgba(111, 60, 0, 1);
      }
      .creatMsg {
        display: flex;
        align-items: center;
        .rank {
          width: 1rem;
          height: 0.6rem;
          font-size: 0.42rem;
          font-weight: bold;
          color: rgba(69, 19, 0, 0.5);
          text-align: center;
          line-height: 0.6rem;
          margin: 0 0.05rem 0 0.32rem;
        }
        .family {
          position: relative;
          width: 1rem;
          height: 1rem;
          margin: 0 0.15rem 0 0.25rem;
          img {
            width: 1rem;
            height: 1rem;
            border-radius: 0.2rem;
            border: 0.03rem solid rgba(251, 253, 148, 1);
            box-sizing: border-box;
          }
          .fLv {
            display: block;
            width: 1.06rem;
            height: 0.37rem;
            background: url(../assets/img/fLv/1.png);
            background-size: 100% 100%;
            display: flex;
            align-items: center;
            position: absolute;
            left: 0;
            bottom: -0.05rem;
            z-index: 10;
            .num {
              width: 0.32rem;
              height: 0.32rem;
              line-height: 0.32rem;
              text-align: center;
              font-size: 0.12rem;
              color: #e63ba8;
              margin-left: 0.05rem;
            }
            strong {
              flex: 1;
              font-size: 0.18rem;
              margin-left: 0.1rem;
              margin-top: 0.01rem;
            }
            &.lv2 {
              background: url(../assets/img/fLv/2.png);
              background-size: 100% 100%;
              .num {
                color: #a939ff;
              }
            }
            &.lv3 {
              background: url(../assets/img/fLv/3.png);
              background-size: 100% 100%;
              .num {
                margin-left: 0.04rem;
                color: #a939ff;
              }
            }
            &.lv4 {
              background: url(../assets/img/fLv/4.png);
              background-size: 100% 100%;
              left: -0.03rem;
              .num {
                margin-left: 0.09rem;
                color: #4f5ff4;
              }
            }
          }
        }
        .msg {
          margin-left: 0.05rem;
          .scoreTips {
            font-size: 0.22rem;
          }
          .score {
            color: rgba(255, 251, 128, 1);
          }
          .bar {
            font-size: 0.22rem;
            display: flex;
            align-items: center;
            .liner {
              width: 1.87rem;
              height: 0.16rem;
              background: rgba(0, 0, 0, 0.2);
              border-radius: 0.08rem;
              position: relative;
              margin-left: 0.32rem;
              .actLiner {
                max-width: 100%;
                height: 0.16rem;
                background: linear-gradient(90deg, #ff5bb1 0%, #ff3838 100%);
                border-radius: 0.08rem;
                position: absolute;
                left: 0;
                top: 0;
                .giftBox {
                  display: block;
                  width: 0.53rem;
                  height: 0.54rem;
                  background: url(../assets/img/giftBox.png);
                  background-size: 100% 100%;
                  position: absolute;
                  left: -0.265rem;
                  top: -0.2rem;
                }
              }
            }
          }
        }
      }
      .creatBtn {
        margin-left: 0.5rem;
        .look {
          width: 1.57rem;
          height: 0.42rem;
          background: url(../assets/img/look.png) no-repeat;
          background-size: 100% 100%;
        }
        .join {
          width: 1.77rem;
          height: 0.72rem;
          color: rgba(65, 44, 6, 1);
          font-size: 0.26rem;
          background: url(../assets/img/join.png) no-repeat;
          background-size: 100% 100%;
          text-align: center;
          line-height: 0.72rem;
        }
      }
    }
  }
}

.commitMsg {
  width: 4.72rem;
  height: 6.9rem;
  background: url(../assets/img/commitMsg.png);
  background-size: 100% 100%;
  padding: 0 0.52rem;
  position: relative;
  .close {
    display: block;
    width: 0.58rem;
    height: 0.6rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0.2rem;
    top: 0.2rem;
  }
  h3 {
    height: 0.7rem;
    text-align: center;
    line-height: 0.7rem;
    color: RGBA(69, 43, 6, 1);
    font-size: 0.34rem;
    margin-bottom: 0.1rem;
  }
  .title {
    color: rgba(137, 63, 30, 1);
    font-size: 0.26rem;
    margin: 0.1rem 0;
  }
  input {
    background: none;
    outline: none;
    border: none;
    background: linear-gradient(-9deg, #d7b67f 0%, #f1d8a6 100%);
    border-radius: 0.1rem;
    width: 4.38rem;
    // color: #fff;
    padding: 0.15rem;
    &#msg {
      height: 0.94rem;
    }
    &#rid {
      height: 0.3rem;
    }
  }
  .tipsBox {
    height: 1.7rem;
    color: rgba(255, 139, 124, 1);
    font-size: 0.22rem;
    margin-top: 0.22rem;
  }
  .commitBtn {
    width: 2.27rem;
    height: 0.72rem;
    background: url(../assets/img/creat.png);
    background-size: 100% 100%;
    text-align: center;
    line-height: 0.72rem;
    color: rgba(65, 44, 6, 1);
    font-size: 0.26rem;
    margin: 0.29rem auto 0;
    &.black {
      background: url(../assets/img/creat_black.png);
      background-size: 100% 100%;
    }
  }
}

.actIng,
.stage3List {
  width: 100%;
  height: 1.61rem;
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 0.65rem;
  .rank {
    width: 0.75rem;
    height: 0.65rem;
    font-size: 0.46rem;
    color: rgba(69, 19, 0, 0.5);
    text-align: center;
    line-height: 0.72rem;
    margin: 0 0.13rem 0 0.25rem;
  }
  .uerImg {
    width: 1rem;
    height: 1.01rem;
    position: relative;
    margin: 0 0.15rem 0 0.08rem;
    .fLv {
      display: block;
      width: 1.06rem;
      height: 0.37rem;
      background: url(../assets/img/fLv/1.png);
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      position: absolute;
      left: 0;
      bottom: -0.05rem;
      z-index: 10;
      .num {
        width: 0.32rem;
        height: 0.32rem;
        line-height: 0.32rem;
        text-align: center;
        font-size: 0.12rem;
        color: #e63ba8;
        margin-left: 0.05rem;
      }
      strong {
        flex: 1;
        font-size: 0.18rem;
        margin-left: 0.1rem;
        margin-top: 0.01rem;
      }
      &.lv2 {
        background: url(../assets/img/fLv/2.png);
        background-size: 100% 100%;
        .num {
          color: #a939ff;
        }
      }
      &.lv3 {
        background: url(../assets/img/fLv/3.png);
        background-size: 100% 100%;
        .num {
          margin-left: 0.04rem;
          color: #a939ff;
        }
      }
      &.lv4 {
        background: url(../assets/img/fLv/4.png);
        background-size: 100% 100%;
        .num {
          margin-left: 0.09rem;
          color: #4f5ff4;
        }
      }
    }
    .imgBg {
      width: 1rem;
      height: 1.01rem;
      background: url(../assets/img/av4.png);
      background-size: 100% 100%;
      position: absolute;
      z-index: 10;
    }
    .imgItem {
      width: 1rem;
      height: 1rem;
      border-radius: 0.2rem;
      border: 0.03rem solid rgba(251, 253, 148, 1);
      box-sizing: border-box;
      position: absolute;
      top: 0.035rem;
      left: 0.03rem;
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
    margin-right: 0.45rem;
    .name {
      width: 2.29rem;
      height: 0.67rem;
      background: url(../assets/img/fNameBg.png);
      background-size: 100% 100%;
      line-height: 0.8rem;
      text-indent: 0.45rem;
      font-style: italic;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .totalScore {
      display: flex;
      align-items: center;
      color: rgba(255, 251, 128, 1);
      font-size: 0.26rem;
      font-weight: 500;
      margin-top: 0.05rem;
      i {
        display: block;
        margin-right: 0.06rem;
        width: 0.43rem;
        height: 0.39rem;
        background: url(../assets/img/store.png);
        background-size: 100% 100%;
      }
    }
  }
  > .score {
    flex: 1;
    color: rgba(137, 63, 30, 1);
    font-size: 0.26rem;
    position: relative;
    margin-top: 0.1rem;
    > i {
      font-size: 0.26rem;
      color: rgba(137, 63, 30, 1);
      position: absolute;
      left: -0.3rem;
      top: 0.27rem;
    }
    .star {
      display: flex;
      align-items: center;
      i {
        width: 0.4rem;
        height: 0.38rem;
        background: url(../assets/img/star.png);
        background-size: 100% 100%;
        margin-right: 0.1rem;
      }
    }
    .num {
      display: flex;
      align-items: center;
      margin-top: 0.15rem;
      i {
        width: 0.35rem;
        height: 0.41rem;
        background: url(../assets/img/fire.png);
        background-size: 100% 100%;
        margin-right: 0.1rem;
      }
    }
  }
  .award {
    display: block;
    width: 1.09rem;
    height: 0.4rem;
    background: url(../assets/img/up2.png);
    background-size: 100% 100%;
    position: absolute;
    top: 0;
    right: 0.17rem;
    z-index: 0;
  }
  .userList {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 0.1rem 0 0 0.1rem;
    .userItem {
      position: relative;
      .userImgBox {
        display: block;
        width: 0.62rem;
        height: 0.68rem;
        margin: 0 auto;
        position: relative;
        span {
          display: block;
          width: 0.62rem;
          height: 0.68rem;
          position: absolute;
          z-index: 2;
        }
        img {
          width: 0.56rem;
          height: 0.56rem;
          border: 0.02rem solid rgba(255, 220, 42, 1);
          border-radius: 50%;
          position: absolute;
          top: 0.07rem;
          left: 0.01rem;
        }
      }
      strong {
        display: block;
        text-align: center;
        color: rgba(255, 250, 238, 1);
        font-size: 0.2rem;
      }
    }
  }
  &.rank1 {
    background: url(../assets/img/listItem2.png);
    background-size: 100% 100%;
    .rank {
      text-indent: -999rem;
      background: url(../assets/img/top1.png);
      background-size: 100% 100%;
    }
  }
  &.rank2 {
    background: url(../assets/img/listItem3.png);
    background-size: 100% 100%;
    .rank {
      text-indent: -999rem;
      background: url(../assets/img/top2.png);
      background-size: 100% 100%;
    }
  }
  &.rank3 {
    background: url(../assets/img/listItem3.png);
    background-size: 100% 100%;
    .rank {
      text-indent: -999rem;
      background: url(../assets/img/top3.png);
      background-size: 100% 100%;
    }
  }
}
.stage3List {
  .uerImg {
    .imgItem {
      width: 0.96rem;
      height: 0.96rem;
      border-radius: 0.16rem;
    }
    .fLv {
      display: block;
      width: 1.06rem;
      height: 0.37rem;
      background: url(../assets/img/fLv/1.png);
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      position: absolute;
      left: 0;
      bottom: -0.05rem;
      z-index: 10;
      .num {
        width: 0.32rem;
        height: 0.32rem;
        line-height: 0.32rem;
        text-align: center;
        font-size: 0.12rem;
        color: #e63ba8;
        margin-left: 0.05rem;
      }
      strong {
        flex: 1;
        font-size: 0.18rem;
        margin-left: 0.1rem;
        margin-top: 0.01rem;
      }
      &.lv2 {
        background: url(../assets/img/fLv/2.png);
        background-size: 100% 100%;
        .num {
          color: #a939ff;
        }
      }
      &.lv3 {
        background: url(../assets/img/fLv/3.png);
        background-size: 100% 100%;
        .num {
          margin-left: 0.04rem;
          color: #a939ff;
        }
      }
      &.lv4 {
        background: url(../assets/img/fLv/4.png);
        background-size: 100% 100%;
        .num {
          margin-left: 0.09rem;
          color: #4f5ff4;
        }
      }
    }
  }
  .userMsg {
    width: 2.3rem;
    margin-right: 0.15rem;
    .name {
      width: 2.29rem;
      height: 0.67rem;
      background: url(../assets/img/fNameBg.png);
      background-size: 100% 100%;
      line-height: 0.8rem;
      text-indent: 0.45rem;
      font-style: italic;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .score {
      display: flex;
      align-items: center;
      margin-top: 0.06rem;
      i {
        width: 0.4rem;
        height: 0.38rem;
        background: url(../assets/img/store.png);
        background-size: 100% 100%;
      }
      strong {
        font-size: 0.26rem;
      }
    }
  }
  .shareBtn {
    width: 2.22rem;
    height: 0.9rem;
    background: url(../assets/img/shareBtn.png);
    background-size: 100% 100%;
    text-align: center;
    color: rgba(65, 44, 6, 1);
    font-size: 0.26rem;
    font-weight: 600;
    line-height: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.stage2List {
  width: 100%;
  padding-top: 0.4rem;
  display: flex;
  align-items: center;
  position: relative;
  .rank {
    width: 0.9rem;
    text-align: center;
    color: rgba(69, 19, 0, 1);
    font-size: 0.42rem;
    font-weight: bold;
    opacity: 0.5;
    margin-left: 0.3rem;
  }
  .PKmsg {
    flex: 1;
    height: 100%;
    position: relative;
    padding: 0 0.15rem 0 0;
    .up {
      display: block;
      width: 1.18rem;
      height: 0.4rem;
      background: url(../assets/img/up2.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0rem;
      z-index: 10;
      &.left {
        left: 0;
        background: url(../assets/img/up.png);
        background-size: 100% 100%;
      }
      &.right {
        right: 0;
      }
    }
    .familyMsg {
      // margin-top: 0.2rem;
      // height: 1.4rem;
      display: flex;
      justify-content: space-between;
      .family {
        position: relative;
        width: 1rem;
        height: 1rem;
        img {
          width: 1rem;
          height: 1rem;
          border-radius: 0.2rem;
          border: 0.03rem solid rgba(251, 253, 148, 1);
          box-sizing: border-box;
        }
        .fLv {
          display: block;
          width: 1.06rem;
          height: 0.37rem;
          background: url(../assets/img/fLv/1.png);
          background-size: 100% 100%;
          display: flex;
          align-items: center;
          position: absolute;
          left: 0;
          bottom: -0.05rem;
          z-index: 10;
          .num {
            width: 0.32rem;
            height: 0.32rem;
            line-height: 0.32rem;
            text-align: center;
            font-size: 0.12rem;
            color: #e63ba8;
            margin-left: 0.05rem;
          }
          strong {
            flex: 1;
            font-size: 0.18rem;
            margin-left: 0.1rem;
            margin-top: 0.01rem;
          }
          &.lv2 {
            background: url(../assets/img/fLv/2.png);
            background-size: 100% 100%;
            .num {
              color: #a939ff;
            }
          }
          &.lv3 {
            background: url(../assets/img/fLv/3.png);
            background-size: 100% 100%;
            .num {
              margin-left: 0.04rem;
              color: #a939ff;
            }
          }
          &.lv4 {
            background: url(../assets/img/fLv/4.png);
            background-size: 100% 100%;
            left: -0.03rem;
            .num {
              margin-left: 0.09rem;
              color: #4f5ff4;
            }
          }
        }
      }
    }
    .fLiner {
      width: 3.48rem;
      height: 0.16rem;
      display: flex;
      align-items: center;
      margin: 0.37rem auto;
      background: linear-gradient(-90deg, #b1ffef 0%, #fbf734 100%);
      border-radius: 0.08rem;
      position: relative;
      span {
        max-width: 100%;
        height: 100%;
        &.top {
          max-width: 99%;
        }
      }
      .left {
        background: linear-gradient(90deg, #ff5bb1 0%, #ff3838 100%);
        position: relative;
        border-radius: 0.08rem;
      }
      .star {
        display: flex;
        align-items: center;
        color: rgba(255, 251, 237, 0.8);
        font-size: 0.24rem;
        position: absolute;
        bottom: -0.45rem;
        i {
          width: 0.4rem;
          height: 0.38rem;
          background: url(../assets/img/star.png);
          background-size: 100% 100%;
          margin-right: 0.08rem;
        }
        &.lScore {
          left: 0;
        }
        &.rScore {
          right: 0;
        }
      }
    }
    .leftMsg {
      margin-top: -0.07rem;
      .leftName {
        width: 2.29rem;
        height: 0.67rem;
        background: url(../assets/img/fNameBg.png);
        background-size: 100% 100%;
        line-height: 0.8rem;
        text-indent: 0.45rem;
        font-style: italic;
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
          margin-right: 0.09rem;
        }
      }
    }
    .family2 {
      .msg {
        margin-right: 0.14rem;
      }
      .noOpponents {
        font-size: 0.24rem;
        color: rgba(255, 245, 129, 1);
      }
    }
    .familyName {
      display: flex;
      justify-content: space-between;
      margin: 0rem auto;
      > div {
        width: 2.29rem;
        height: 0.67rem;
        background: url(../assets/img/fNameBg.png);
        background-size: 100% 100%;
        line-height: 0.8rem;
        text-indent: 0.45rem;
        font-style: italic;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .vs {
        display: block;
        width: 1.38rem;
        height: 1.38rem;
        background: url(../assets/img/vs.png);
        background-size: 100% 100%;
        position: absolute;
        left: 2.35rem;
        bottom: -0.2rem;
      }
    }
    .noFamily {
      font-size: 0.24rem;
      color: rgba(255, 251, 128, 1);
      white-space: nowrap;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &.rank1 {
    background: url(../assets/img/stage2ListTop1.png);
    background-size: 100% 100%;
  }
  &.rank2,
  &.rank3 {
    background: url(../assets/img/stage2ListTop2.png);
    background-size: 100% 100%;
  }
}

.qureyPup {
  width: 4.89rem;
  height: 2.89rem;
  background: url(../assets/img/singUpQuery.png);
  background-size: 100% 100%;
  position: relative;
  p {
    height: 1.5rem;
    padding: 0 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(137, 63, 30, 1);
    font-size: 0.22rem;
  }
  .btnBox {
    padding: 0 0.36rem;
    display: flex;
    justify-content: space-between;
    text-align: center;
    line-height: 0.72rem;
    font-size: 0.26rem;
    color: rgba(65, 44, 6, 1);
    font-weight: 600;
    .join {
      width: 1.77rem;
      height: 0.72rem;
      background: url(../assets/img/join.png);
      background-size: 100% 100%;
    }
    .creat {
      width: 2.27rem;
      height: 0.72rem;
      background: url(../assets/img/creat.png);
      background-size: 100% 100%;
    }
  }
  .close {
    display: block;
    width: 0.58rem;
    height: 0.6rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0.2rem;
    top: 0.2rem;
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
</style>
