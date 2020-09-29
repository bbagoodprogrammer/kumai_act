<template>
  <div class="footerBar">
    <!-- :class="{noBg:astState === 3 && tab == 0 && !topRank}" -->
    <div class="acrStatus">
      <span class="noAct" v-if="astState === 0">{{lang.noAct}}</span>
      <span class="noAct" v-if="astState === 2">{{lang.actEd}}</span>
      <span class="goAct" v-if="astState === 1" @click="apply()"></span>
      <div class="actIng total" v-if="astState === 3 && tab == 'total' && roomRank.infos">
        <span class="rank" v-if="roomRank.rank > 0">{{roomRank.rank}}</span>
        <span class="noRank" v-else>未上榜</span>
        <img v-lazy="roomRank.infos.pic_url" alt="" class="av">
        <div class="msg">
          <div class="nick">{{roomRank.infos.rname}}</div>
          <div class="rid">{{roomRank.infos.rid}}</div>
        </div>
        <div class="score">
          <div class="nums">
            <i></i>{{roomRank.score}}
          </div>
          <em class="goKroom" @click="goRoom()">前往分組K房>></em>
        </div>
      </div>
      <div class="actIng" v-if="astState === 3 && tab == 0 && topRank" :class="'rank' +topRank.rank ">
        <span class="rank">{{topRank.rank}}</span>
        <div class="imgBox" @click.stop="showFamily(topRank.uid)">
          <span class="avBg"></span>
          <img v-lazy="topRank.avatar" alt="" class="av">
        </div>
        <div class="msg">
          <div class="nick">{{topRank.nick}}</div>
          <div class="score"> <i></i> {{topRank.score}}</div>
        </div>
        <div class="peopleList">
          <div class="pItem">
            <span v-for="(item2,index2) in topRank.list " :key="index2">
              <img v-lazy="item2.avatar" alt="" @click.stop="goPeople(item2.uid)">
              <strong>{{item2.score}}</strong>
            </span>
          </div>
          <em class="goKroom" @click="goRoom()">前往分組K房>></em>
        </div>
        <span class="open" @click.stop="showRoomListPup()"></span>
      </div>
      <div class="actIng" v-if="astState === 3 && tab == 0 && !topRank">您還未加入戰隊</div>
    </div>
    <div class="mask" v-show="singUpQuery">
      <transition name="slide">
        <div class="queryPup" v-if="singUpQuery">
          <i class="close" @click="closeApply()"></i>
          <p>
            您已是簽約玩家，報名隊長將組建自己的戰隊並擔任明星隊長，報名隊員則無法組建戰隊，可加入其他戰隊參與活動
          </p>
          <span class="queryTips">請認真閱讀活動規則謹慎選擇</span>
          <div class="btnBox">
            <span class="ok" @click="singUp(1)">報名隊長<em class="red">(推薦)</em></span>
            <span class="no" @click="singUp(0)">報名隊員</span>
          </div>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="qy">
      <transition name="slide">
        <div class="queryPup" v-if="qy">
          <i class="close" @click="closeQy()"></i>
          <p>
            只有簽約玩家可組建戰隊並擔任明星隊長，非簽約玩家報名後僅可加入其他
            戰隊參與活動
          </p>
          <div class="btnBox">
            <span class="ok" @click="goSingNing()">前往簽約</span>
            <span class="no" @click="singUp(0)">確認報名</span>
          </div>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="showRoomList">
      <transition name="slide">
        <div class="roomList" v-if="showRoomList">
          <ul>
            <li v-for="(item,index) in myRank " :key="index">
              <span class='rank'>{{item.rank}}</span>
              <img v-lazy="item.avatar" alt="">
              <div class="msg">
                <div class="nick">{{item.nick}}</div>
                <div class="score"> <i></i>{{item.score}}</div>
              </div>
              <div class="peopleList">
                <span v-for="(item2,index2) in item.list " :key="index2">
                  <img v-lazy="item2.avatar" alt="" @click="goPeople(item2.uid)">
                  <strong>{{item2.score}}</strong>
                </span>
              </div>
            </li>
          </ul>
          <i class="sq" @click="closeRoomList()"></i>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import api from "../api/apiConfig"
import getString from "../utils/getString"
export default {
  data() {
    return {
      singUpQuery: false,
      qy: false,
      showRoomList: false
    }
  },
  computed: {
    ...mapState(['actStatus', 'userMsg', "isShare", "kol", "myRank", "tab", "leader", "roomRank"]),
    astState() {
      if (this.actStatus === 0) { //活动未开始
        return 0
      } else if (this.actStatus === 2) { //活动已结束
        return 2
      } else if (!this.userMsg.registered || this.isShare) { //活动开始未报名，或者分享
        return 1
      } else if (this.userMsg.registered) { //活动开始已报名
        return 3
      }
    },
    topRank() {
      return this.myRank[0]
    }
  },
  methods: {
    apply() {
      if (this.kol) {
        this.singUpQuery = true
      } else {
        this.qy = true
      }
    },
    singUp(type) {
      api.singUp(type).then(res => {
        if (res.data.response_status.code == 0) {
          this.$parent.getDefaultData()
          this.singUpQuery = false
          this.qy = false
        } else {
          this.vxc("setToast", {
            msg: res.data.response_status.error
          })
        }
      })
    },
    goRoom() {
      api.joinRoom().then(res => {
        if (res.data.response_status.code == 0) {
          const rid = res.data.response_data.rid
          location.href = `rid:${rid}`
        } else {
          this.vxc('setToast', {
            msg: '現暫無K房開啟多人娛樂分組模式<br/>請稍後再試'
          })
        }
      })
    },
    closeApply() {
      this.singUpQuery = false
    },
    closeQy() {
      this.qy = false
    },
    closeRoomList() {
      this.showRoomList = false
    },
    showRoomListPup() {
      this.showRoomList = true
    },
    goSingNing() {
      this.qy = false
      let uid = getString('uid')
      let token = getString('token')
      location.href = `http://act.17sing.tw/signing/index.html?uid=${uid}&token=${token}`
    }
  }
}
</script>
<style lang="scss">
.red {
  color: red;
}
.footerBar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  .acrStatus {
    width: 7.5rem;
    height: 1.24rem;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(../assets/img/footer.png) no-repeat;
    background-size: contain;
    &.noBg {
      background: none;
    }
    .noAct {
      font-size: 0.4rem;
      font-weight: bold;
    }
    .goAct {
      width: 3.53rem;
      height: 1.14rem;
      background: url(../assets/img/singUp.png) no-repeat;
      background-size: contain;
    }
  }
  .queryTips {
    display: block;
    text-align: center;
    margin-bottom: 0.15rem;
  }
  .actIng {
    height: 1.25rem;
    display: flex;
    align-items: center;
    .rank {
      width: 0.82rem;
      height: 0.82rem;
      color: rgba(243, 165, 78, 1);
      text-align: center;
      line-height: 0.82rem;
      margin-left: 0.11rem;
      font-weight: bold;
      font-size: 0.4rem;
    }
    .noRank {
      font-size: 0.24rem;
      white-space: nowrap;
    }
    .imgBox {
      width: 1.11rem;
      height: 1.25rem;
      position: relative;
      .av {
        width: 1rem;
        height: 1rem;
        border: 0.02rem solid rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        position: absolute;
        top: 0.125rem;
        left: 0;
      }
    }
    .msg {
      width: 1.8rem;
      .nick {
        font-weight: bold;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .score {
        display: flex;
        align-items: center;
        color: rgba(255, 231, 184, 1);
        font-size: 0.25rem;
        i {
          width: 0.49rem;
          height: 0.52rem;
          background: url(../assets/img/fire.png);
          background-size: 100% 100%;
        }
      }
    }
    .peopleList {
      width: 2.76rem;
      height: 0.91rem;
      padding: 0 0.14rem;
      margin-top: 0.15rem;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .pItem {
        display: flex;
        align-items: center;
      }
      span {
        width: 0.7rem;
        margin-top: 0.05rem;
        img {
          width: 0.48rem;
          height: 0.48rem;
          border-radius: 50%;
          display: block;
          margin: 0 auto;
        }
        strong {
          display: block;
          text-align: center;
          color: rgba(255, 231, 184, 1);
          font-size: 0.17rem;
          text-align: center;
          margin-top: 0.02rem;
        }
        .add {
          strong {
            color: #fff;
          }
        }
      }
      .goKroom {
        text-align: center;
        font-size: 0.24rem;
        margin-top: 0.05rem;
      }
    }
    &.total {
      .av {
        width: 1rem;
        height: 1rem;
        border-radius: 0.1rem;
        border: 0.02rem solid #fff;
        margin-left: 0.2rem;
      }
      .msg {
        width: 3.2rem;
        margin-left: 0.11rem;
        .rid {
          color: rgba(203, 255, 251, 1);
          font-size: 0.25rem;
        }
      }
      .score {
        display: flex;
        align-items: center;
        flex-direction: column;
        .goKroom {
          font-size: 0.24rem;
        }
        .nums {
          display: flex;
          align-items: center;
          color: rgba(255, 231, 184, 1);
          i {
            width: 0.49rem;
            height: 0.52rem;
            background: url(../assets/img/fire.png);
            background-size: 100% 100%;
          }
        }
      }
    }
    .open {
      display: block;
      width: 0.32rem;
      height: 0.31rem;
      background: url(../assets/img/open.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0.5rem;
      top: 0.2rem;
    }
    &.rank1 {
      .rank {
        text-indent: -999rem;
        background: url(../assets/img/top1.png);
        background-size: 100% 100%;
      }
      .avBg {
        width: 1.11rem;
        height: 1.25rem;
        position: absolute;
        top: -0.11rem;
        left: -0.03rem;
        background: url(../assets/img/av1.png);
        background-size: 100% 100%;
        z-index: 11;
      }
    }
    &.rank2 {
      .rank {
        text-indent: -999rem;
        background: url(../assets/img/top2.png);
        background-size: 100% 100%;
      }
      .avBg {
        width: 1.11rem;
        height: 1.25rem;
        position: absolute;
        top: -0.11rem;
        left: -0.03rem;
        background: url(../assets/img/av2.png);
        background-size: 100% 100%;
        z-index: 11;
      }
    }
    &.rank3 {
      .rank {
        text-indent: -999rem;
        background: url(../assets/img/top3.png);
        background-size: 100% 100%;
      }
      .avBg {
        width: 1.11rem;
        height: 1.25rem;
        position: absolute;
        top: -0.11rem;
        left: -0.03rem;
        background: url(../assets/img/av3.png);
        background-size: 100% 100%;
        z-index: 11;
      }
    }
  }
  .roomList {
    width: 6.75rem;
    height: 8.42rem;
    background: url(../assets/img/taskBg.png);
    background-size: 100% 100%;
    padding-top: 0.59rem;
    .sq {
      display: block;
      width: 0.32rem;
      height: 0.31rem;
      background: url(../assets/img/sq.png);
      background-size: 100% 100%;
      margin: -0.5rem auto 0;
    }
    ul {
      width: 5.92rem;
      height: 7.31rem;
      background: rgba(52, 122, 170, 0.2);
      margin: 0 auto;
      padding-top: 0.53rem;
      li {
        display: flex;
        align-items: center;
        margin-bottom: 0.2rem;
        .rank {
          width: 0.7rem;
          text-align: center;
          font-size: 0.4rem;
          color: rgba(243, 165, 78, 1);
        }
        > img {
          width: 1rem;
          height: 1rem;
          border: 0.02rem solid rgba(255, 255, 255, 0.6);
          border-radius: 50%;
        }
        .msg {
          width: 1.3rem;
          margin: 0 0.15rem;
          .nick {
            font-size: 0.26rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .score {
            display: flex;
            align-items: center;
            color: rgba(255, 231, 184, 1);
            font-size: 0.25rem;
            i {
              width: 0.49rem;
              height: 0.52rem;
              background: url(../assets/img/fire.png);
              background-size: 100% 100%;
            }
          }
        }
      }
    }
    .peopleList {
      width: 2.06rem;
      height: 0.91rem;
      padding: 0 0.14rem;
      margin-top: 0.15rem;
      position: relative;
      display: flex;
      align-items: center;
      background: linear-gradient(90deg, rgba(6, 26, 68, 0.2) 0%);
      border-radius: 0.08rem;
      .pItem {
        display: flex;
        align-items: center;
      }
      span {
        width: 0.7rem;
        margin-top: 0.05rem;
        img {
          width: 0.48rem;
          height: 0.48rem;
          border-radius: 50%;
          display: block;
          margin: 0 auto;
        }
        strong {
          display: block;
          text-align: center;
          color: rgba(255, 231, 184, 1);
          font-size: 0.17rem;
          text-align: center;
          margin-top: 0.02rem;
        }
        .add {
          strong {
            color: #fff;
          }
        }
      }
      .goKroom {
        text-align: center;
        font-size: 0.24rem;
        margin-top: 0.05rem;
      }
    }
  }
}
</style>
