<template>
  <div class="querySong">
    <i class="closeQuery" @click="closeQueryPup()"></i>
    <p class="queryTips">投放歌曲會收到收聽和關注~投放的人數越多，<br />收聽歌曲的人越多，優質作品將得到更多曝光次數~</p>
    <div class="song">
      <div class="imgBox">
        <img v-lazy="querySong.avatar" alt="">
      </div>
      <div class="songMsg">
        <div class="name">{{querySong.name}}</div>
        <div class="songScore">
          <span class="score1"><i></i>{{querySong.listen}}</span>
          <span class="score2"><i></i>{{querySong.comms}}</span>
          <span class="score3"><i></i>{{querySong.like}}</span>
        </div>
      </div>
      <div class="status" @click="closeQueryPup()">重新選擇</div>
    </div>
    <div class="query">
      <div class="queryTabs">
        <span :class="{act:showType==1}" @click="tabClick(1)">免費投瓶</span>
        <span :class="{act:showType==2}" @click="tabClick(2)">定製投瓶</span>
      </div>
      <div class="firstCom" v-if="showType==1">
        <div class="bottleImgBg">
          <div class="bottle" :class="{black:!first || querySong.free}"></div>
        </div>
        <P v-if="querySong.free">對不起，這首作品《{{querySong.name}}》已于{{getDate(querySong.free_time)}}被免費投瓶過一次了，可以選擇定製投瓶再進行投放~</P>
        <p v-else-if="!first">今日免費投瓶已使用</p>
        <p v-else>每位用戶每天首次投瓶免費，是否確認對此作品投瓶？</p>
        <span class="comitBtn" @click="qurey()" v-if="first && !querySong.free">確認投瓶</span>
        <div class="status" @click="closeQueryPup()" v-if="querySong.free">重新選擇</div>
      </div>
      <!-- @click="selectChange(item)" -->
      <div class="defaultCom" v-else>
        <div class="pNumBox">
          <div class="pNum" :class="{act:item.pNum == pNum}" v-for="(item,index) in optionArr " :key="index" @click="selectChange(item)">
            <i class="yes" v-if="item.pNum == pNum"></i>
            <span class="title">投放人數</span>
            <span class="peopleNum">{{item.pNum}}</span>
            <span class="price">金幣： <em>{{item.price}}</em></span>
          </div>
        </div>
        <span class="commitBtn" @click="qurey()">確定</span>
      </div>
    </div>
    <div class="mask" v-show="showQuery">
      <transition name="slide">
        <div class="queryPup" v-show="showQuery">
          <i class="close" @click="closeComitPup()"></i>
          <p>{{queryType==1?`您將使用${price}金幣投瓶此作品？`:`對不起，你的金幣餘額不足夠投瓶，請前去儲值~`}} </p>
          <div class="btnBox" v-if="queryType == 1">
            <span @click="cancel()">取消</span>
            <span @click="commitSong()">確定</span>
          </div>
          <div class="stored" @click="stored()" v-else>
            前去儲值
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import api from "../api/apiConfig"
import { mapState } from "vuex"
import getDate from "../utils/getDate"
export default {
  props: ["querySong"],
  data() {
    return {
      pNum: 30,
      showOption: false,
      showQuery: false,
      optionArr: [{
        pNum: 30,
        price: 9
      }, {
        pNum: 200,
        price: 55
      }, {
        pNum: 500,
        price: 135
      }],
      queryType: 1,
      showType: 1
    }
  },
  computed: {
    ...mapState(['userMsg', 'first', 'plarerArr']),
    price() {
      if (this.pNum == 200) {
        return 55
      } else if (this.pNum == 500) {
        return 135
      } else {
        return 9
      }
    },
    type() {
      if (this.first && this.showType == 1) {
        return 1
      } else if (this.pNum == 200 && this.showType == 2) {
        return 3
      } else if (this.pNum == 500 && this.showType == 2) {
        return 4
      } else if (this.pNum == 30 && this.showType == 2) {
        return 2
      }
    }
  },
  methods: {
    tabClick(val) {
      this.showType = val
    },
    showSelect() {
      this.showOption = !this.showOption
    },
    selectChange(val) {
      this.pNum = val.pNum
    },
    qurey() {
      this.queryType = 1
      if (this.first && this.showType == 1) {
        this.commitSong()
      } else if (this.userMsg.wallet * 1 >= this.price * 1) {
        this.showQuery = true
      } else {
        this.showQuery = true
        this.queryType = 2
      }
    },
    cancel() {
      this.showQuery = false
    },
    stored() {
      location.href = "walletConfig://"
    },
    commitSong() {
      let workId = this.querySong.sid
      let player = this.plarerArr['Throw'] ? this.plarerArr['Throw'].player : false
      if (!player) {
        this.toast('資源未加載完成，請稍後再試~')
        return
      }
      api.throwBottle(this.type, workId).then(res => {
        if (res.data.response_status.code == 0) {
          this.$parent.$parent.showDsongPup = false //關閉彈窗
          player.start()
          if (this.type == 1) {
            this.vxc('setFirst', false)
          } else {
            this.vxc('reduexCoins', this.price)
          }
          setTimeout(() => {
            this.toast(`已投瓶成功`)
          }, 3000)
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    getDate(time) {
      return getDate(new Date(time * 1000), 1)
    },
    closeComitPup() {
      this.showQuery = false
    },
    closeQueryPup() {
      this.$parent.showQueryBottle = false
    }
  }
}
</script>
<style lang="scss">
.querySong {
  width: 7.17rem;
  height: 8.28rem;
  padding-top: 0.88rem;
  background: url(../assets/img/pupBg.png);
  background-size: 100% 100%;
  position: relative;
  .closeQuery {
    width: 0.75rem;
    height: 0.75rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0.3rem;
    top: 0.1rem;
  }
  .queryTips {
    color: #611300;
    font-size: 0.24rem;
    padding: 0 1rem 0 0.8rem;
    font-weight: 500;
  }
  .song {
    display: flex;
    align-items: center;
    padding: 0 0.9rem 0 1rem;
    margin-top: 0.23rem;
    .imgBox {
      width: 1.1rem;
      height: 1.1rem;
      background: url(../assets/img/avBg.png);
      background-size: 100% 100%;
      img {
        display: block;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        margin: 0.05rem auto;
      }
    }
    .songMsg {
      width: 2.75rem;
      margin-left: 0.16rem;
      .name {
        min-width: 2.75rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .songScore {
        display: flex;
        margin-top: 0.15rem;
        span {
          flex: 1;
          display: flex;
          align-items: center;
          font-size: 0.24rem;
          color: #fff7d4;
          font-weight: 600;
          i {
            width: 0.27rem;
            height: 0.25rem;
            margin-right: 0.07rem;
          }
          &.score1 {
            i {
              background: url(../assets/img/score1.png);
              background-size: 100% 100%;
            }
          }
          &.score2 {
            i {
              background: url(../assets/img/score2.png);
              background-size: 100% 100%;
            }
          }
          &.score3 {
            i {
              background: url(../assets/img/score3.png);
              background-size: 100% 100%;
            }
          }
        }
      }
    }
    .status {
      width: 1.5rem;
      height: 0.6rem;
      border: 0.03rem solid rgba(255, 249, 153, 1);
      border-radius: 0.3rem;
      text-align: center;
      line-height: 0.6rem;
      color: #fff999;
      font-size: 0.26rem;
      font-weight: 600;
    }
  }
  .query {
    width: 5.7rem;
    height: 4.83rem;
    padding-top: 0.23rem;
    background: rgba(180, 110, 82, 0.5);
    border-radius: 0.1rem;
    margin: 0 auto;
    .queryTabs {
      width: 4.8rem;
      height: 0.67rem;
      padding: 0 0.05rem;
      background-image: url(../assets/img/queryBg.png);
      background-size: 100% 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      span {
        width: 2.45rem;
        height: 0.59rem;
        color: #ffd565;
        font-size: 0.28rem;
        font-weight: 600;
        text-align: center;
        line-height: 0.67rem;
        &.act {
          color: #ae4800;
          background-image: url(../assets/img/queryAct.png);
          background-size: 100% 100%;
        }
      }
    }
    .firstCom {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .bottleImgBg {
        width: 1.8rem;
        height: 1.65rem;
        padding-top: 0.15rem;
        background: url(../assets/img/bottleBg1.png);
        background-size: 100% 100%;
        margin-top: 0.23rem;
        .bottle {
          width: 0.8rem;
          height: 1.38rem;
          margin: 0.15rem auto 0;
          background: url(../assets/img/queryBottl.png);
          background-size: 100% 100%;
          &.black {
            background: url(../assets/img/queryBottlBlack.png);
            background-size: 100% 100%;
          }
        }
      }
      p {
        padding: 0 0.5rem;
        font-size: 0.26rem;
        color: #611300;
        font-weight: 600;
        text-align: center;
        margin: 0.1rem 0 0.15rem;
      }
      .comitBtn {
        width: 2.08rem;
        height: 0.68rem;
        background: url(../assets/img/comitBtn.png);
        background-size: 100% 100%;
        color: #ae4800;
        font-weight: 700;
        text-align: center;
        line-height: 0.68rem;
      }
      .status {
        width: 1.5rem;
        height: 0.6rem;
        border: 0.03rem solid rgba(255, 249, 153, 1);
        border-radius: 0.3rem;
        text-align: center;
        line-height: 0.6rem;
        color: #fff999;
        font-size: 0.26rem;
        font-weight: 600;
      }
    }
    .defaultCom {
      .pNumBox {
        padding: 0 0.58rem;
        margin-top: 0.56rem;
        display: flex;
        justify-content: space-between;
      }
      .pNum {
        width: 1.4rem;
        height: 1.76rem;
        padding-top: 0.26rem;
        background: url(../assets/img/bottleTypeBg.png);
        background-size: 100% 100%;
        position: relative;
        &.act::before {
          content: "";
          width: 1.46rem;
          height: 2.02rem;
          background: url(../assets/img/border.png);
          background-size: 100% 100%;
          position: absolute;
          left: -0.04rem;
          top: 0;
        }
        .yes {
          display: block;
          width: 0.39rem;
          height: 0.39rem;
          background: url(../assets/img/yes.png);
          background-size: 100% 100%;
          position: absolute;
          left: 0.54rem;
          top: -0.2rem;
        }
        span {
          display: block;
          text-align: center;
        }
        .title {
          font-size: 0.24rem;
          font-weight: 600;
        }
        .peopleNum {
          font-size: 0.42rem;
          font-weight: 800;
          margin-top: 0.2rem;
        }
        .price {
          color: #611300;
          font-size: 0.24rem;
          font-weight: 600;
          margin-top: 0.24rem;
          em {
            font-size: 0.26rem;
            color: #ffe272;
          }
        }
      }
      .commitBtn {
        display: block;
        width: 2.08rem;
        height: 0.68rem;
        background: url(../assets/img/comitBtn.png);
        background-size: 100% 100%;
        color: #ae4800;
        font-weight: 700;
        text-align: center;
        line-height: 0.68rem;
        margin: 0.5rem auto;
      }
    }
  }
  .queryPup {
    width: 7.17rem;
    height: 8.28rem;
    padding-top: 0.88rem;
    background: url(../assets/img/pupBg.png);
    background-size: 100% 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p {
      color: #611300;
      font-weight: 600;
      padding: 0 1rem;
      text-align: center;
    }
    .btnBox {
      width: 4.5rem;
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;
      span {
        width: 2.08rem;
        height: 0.68rem;
        background: url(../assets/img/comitBtn.png);
        background-size: 100% 100%;
        text-align: center;
        line-height: 0.68rem;
        color: #ae4800;
      }
    }
    .stored {
      margin-top: 1rem;
      width: 2.08rem;
      height: 0.68rem;
      background: url(../assets/img/comitBtn.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.68rem;
      color: #ae4800;
    }
    .close {
      width: 0.75rem;
      height: 0.75rem;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0.3rem;
      top: 0.1rem;
    }
  }
}
</style>
