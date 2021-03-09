<template>
  <div class="rank">
    <div class="tabs">
      <a @click.prevent="onRefresh" href="" :style="{transform:'rotate('+rotatePx+'deg)'}" id="refresh"></a>
      <span :class="{act:type == 1}" @click="tabClick(1)">園丁打卡</span>
      <span :class="{act:type == 2}" @click="tabClick(2)">最佳園丁榜</span>
    </div>
    <div class="task" v-show="type == 1">
      <div class="taskList">
        <div class="taskTitle">
          <span class="name">今日任務</span>
          <span class="num"> 獎勵種子</span>
          <span class="bar">進度</span>
        </div>
        <ul>
          <li v-for="(item,index) in schuleList" :key="index">
            <span class="name">{{item.desc}}</span>
            <span class="num"><img src="../img/taskIcon.png" alt="">x {{item.chance}}</span>
            <span class="bar">
              <em class="ed" v-if="item.status">已領取</em>
              <em v-else-if=" item.schule >= item.limit" class="getSeed" @click="getSeed(index)">領取種子</em>
              <em v-else class="barNums">
                <strong>{{item.schule}}/{{item.limit}}</strong>
                <i class="actBar" :style="{width:item.schule/item.limit * 100 +'%'}"></i>
              </em>
            </span>
          </li>
        </ul>
      </div>
      <div class="stored">
        <div class="title">儲值獎勵</div>
        <div class="storedTips">
          <span>每儲值50金幣，可領取白色種子<img src="../img/crazy.png" alt=""> x1</span>
          <span>每儲值100金幣 x1,附贈花神祝福 <img src="../img/accIcon.png" alt="">x1</span>
        </div>
        <div class="coinsTips">今日您已儲值：{{charge}}金幣<br /> （每日00:00重置）</div>
        <div class="btn">
          <div class="get" @click="getGift()" :class="{black:!charge_get}">領取獎勵</div>
          <div class="goStore" @click="goStore()">前往儲值</div>
        </div>
      </div>
    </div>
    <div class="rankList" v-show="type == 2">
      <p v-if="step==0">活動開始倒計時</p>
      <p v-else-if="step == 1">活動結束倒計時</p>
      <div class="timeDown" v-if="surplusTime&& !surplusTime.end">
        <strong>{{surplusTime.day}}</strong>
        <em>天</em>
        <strong>{{surplusTime.hour}}</strong>
        <em>時</em>
        <strong>{{surplusTime.minute}}</strong>
        <em>分</em>
        <strong>{{surplusTime.second}}</strong>
        <em>秒</em>
      </div>
      <p class="rankTips">根據活動期間，用戶累計成功收穫星願花總數進行排名（含已消耗花數），活動結束時，排名前10用戶 可獲得豐厚獎勵</p>
      <div class="noData" v-if="!list.length">暫無數據</div>
      <ul>
        <li v-for="(item,index) in list" :key="index" :class="'rank' + item.rank">
          <div class="listRank">{{item.rank}}</div>
          <div class="uerImg" @click="goUser(item.uid)">
            <img v-if="item.avatar_frame &&item.avatar_frame != ''" :src="item.avatar_frame" class="frame" alt="">
            <!-- <img src="../assets/img/testFrame.png" class="frame" alt=""> -->
            <!-- <img v-else-if="item.nob > 0" :src="require(`../img/nob/${item.nob}.png`)" class="nob" alt=""> -->
            <img v-lazy="item.avatar" alt="" class="av">
          </div>
          <div class="msg">
            <div class="nick">{{item.nick}}</div>
            <div class="uid">UID {{item.uid}}</div>
          </div>
          <div class="score">
            <i></i>
            <em>{{item.score}}</em>
          </div>
        </li>
      </ul>
    </div>
    <div class="mask" v-show="showGiftPup">
      <transition name="slide">
        <div class="giftPup" v-if="showGiftPup">
          <i class="close" @click="showGiftPup = false"></i>
          <div class="title">領取成功</div>
          <div class="giftTips">
            恭喜獲得 <em v-if="giftData[1]">【白色種子x{{giftData[1]}}】</em><em v-if="giftData[2]">【花神祝福x{{giftData[2]}}】</em>， 快去種植吧！
          </div>
          <div class="giftImg">
            <div class="item" v-if="giftData[1]">
              <div class="imgBox">
                <img src="../img/getSeed1.png" alt="">
                <div class="imgbg"></div>
              </div>
              <strong>白色種子x{{giftData[1]}}</strong>
            </div>
            <div class="item" v-if="giftData[2]">
              <div class="imgBox">
                <img src="../img/accIcon.png" alt="">
                <div class="imgbg"></div>
              </div>
              <strong>花神祝福x{{giftData[2]}}</strong>
            </div>
          </div>
          <div class="ok" @click="showGiftPup = false">確認</div>
        </div>

      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { getSeed, getChargeGift, allList } from "../apis"
import downTime from '../utils/downTime.js'
export default {
  data () {
    return {
      surplusTime: {},
      type: 1,
      showGiftPup: false,
      giftData: {},
      loadedList: true,
      list: [],
      loaded: false,
      more: true,
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
    }
  },
  watch: {
    load (val) {
      this.downTimeGo('time', val)
    }
  },
  computed: {
    ...mapState(['schuleList', 'step', 'stime', 'etiem', 'load', 'charge', 'charge_get'])
  },
  mounted () {
    // 如果初始化接口返回当前榜单数据，可以在Store的Action拿到服务器数据时先调用commit('updateRankGroups', {key:key, list:[]})，再更新state.tab触发组件watch
    window.addEventListener('scroll', this.onScroll);
  },
  activated () {
    window.addEventListener('scroll', this.onScroll);
  },
  deactivated () {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    tabClick (val) {
      if (val == 2 && this.loadedList) {
        this.loadedList = false
        allList(0).then(res => {
          this.list = res.data.response_data.list
          this.type = val
          this.vxc('setUserRank', res.data.response_data.myrank)
        })
      } else {
        this.type = val
      }
      this.vxc('setTab', val)
    },
    getGift () {
      if (this.charge_get) {
        getChargeGift().then(res => {
          if (res.data.response_status.code == 0) {
            this.giftData = res.data.response_data.data
            this.showGiftPup = true
          } else {
            this.toast(res.data.response_status.error)
          }
        })
      }

    },
    getSeed (key) {
      getSeed(key).then(res => {
        if (res.data.response_status.code == 0) {
          this.vxc('setTaskStatus', key)
          this.vxc('addSeed', {
            type: 1,
            nums: this.schuleList[key].chance
          })
          this.toast(`領取成功！`)
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    downTimeGo (timeName, val) {
      clearInterval(this.timer)
      if (!downTime(timeName)) {
        downTime(timeName, val);
      }
      this.surplusTime = downTime(timeName);
      this.timer = setInterval(() => {
        this.surplusTime = downTime(timeName);
        if (this.surplusTime && this.surplusTime.end) {
          clearInterval(this.timer)
          // this.$store.commit("changday_down_time", 0)  //當天剩餘時間
        }
      }, 1000)
    },
    goStore () {
      location.href = "walletConfig://"
    },
    onScroll () {
      console.log('xxx')
      const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100;
      const notFull = document.body.scrollHeight < window.innerHeigh;
      if (this.loaded) return
      if (scrollToBottom && this.more && this.type == 2) {
        this.more = false
        allList(this.list.length, 'more').then(res => {
          //   this.vxc('setUser', res.data.response_data.rank)
          this.more = true
          if (res.data.response_data.list.length == 0) {
            this.loaded = true
          } else {
            this.list = this.list.concat(res.data.response_data.list)
          }
        })
      }
    },
    onRefresh () {
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      this.$parent.init()
      if (this.type == 2) {
        this.loaded = false
        allList(0).then(res => {
          this.list = res.data.response_data.list
        })
      }
    },
  }
}
</script>

<style lang="scss">
#refresh {
  display: block;
  width: 0.94rem;
  height: 0.94rem;
  position: fixed;
  right: 0.08rem;
  bottom: 1.35rem;
  background: url(../img/refresh.png) no-repeat;
  background-size: contain;
  transition: transform 1s;
  text-indent: -999rem;
  z-index: 100;
  &.mb {
    bottom: 2.8rem;
  }
}
.rank {
  margin: 0.25rem auto 0;
  .tabs {
    width: 6.7rem;
    height: 1.08rem;
    padding: 0 0.05rem;
    background: url(../img/tabs.png);
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    span {
      height: 0.98rem;
      line-height: 0.98rem;
      flex: 1;
      text-align: center;
      color: rgba(165, 147, 255, 1);
      font-size: 0.42rem;
      &.act {
        color: #fff;
        background: url(../img/tabs_act.png);
        background-size: 100% 100%;
      }
    }
  }
  .task {
    width: 6.8rem;
    margin: 0.25rem auto 0;
    .taskList {
      width: 6.49rem;
      margin: 0 auto;
      background: linear-gradient(0deg, #594FC7 0%, #5447BE 100%);
      border-radius: 0.4rem;
      padding: 0.1rem 0.23rem 0 0.18rem;
      position: relative;
      .taskTitle {
        font-size: 0.32rem;
        font-weight: 500;
        height: 0.8rem;
        display: flex;
        align-items: center;
        text-align: center;
        position: relative;
        .name {
          width: 3.5rem;
          text-align: left;
          text-indent: 0.4rem;
        }
        .num {
          width: 1.5rem;
        }
        .bar {
          flex: 1;
        }
      }
      .taskTitle::before {
        content: '';
        display: block;
        width: 6.65rem;
        height: 0.02rem;
        background: url(../img/liner.png);
        background-size: 100% 100%;
        position: absolute;
        bottom: 0;
        left: 0;
      }
      ul {
        li {
          height: 1rem;
          font-size: 0.24rem;
          min-height: 0.45rem;
          font-weight: 500;
          color: rgba(196, 202, 255, 1);
          display: flex;
          align-items: center;
          text-align: center;
          margin-bottom: 0.05rem;
          position: relative;
          &.suc {
            color: #ffe49a;
          }
          .name {
            width: 3.2rem;
            text-align: left;
            padding-left: 0.4rem;
          }
          .num {
            width: 1.1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              width: 0.5rem;
              height: 0.5rem;
              margin-right: 0.1rem;
            }
          }
          .bar {
            flex: 1;
            .ed {
              background: RGBA(116, 101, 237, 1);
              color: rgba(84, 71, 190, 1);
              font-size: 0.24rem;
            }
            .getSeed {
              display: block;
              width: 1.24rem;
              height: 0.3rem;
              line-height: 0.3rem;
              background: linear-gradient(90deg, #E68FFF 0%, #FFF38F 100%);
              border-radius: 0.15rem;
              margin: 0 auto;
              color: rgba(84, 71, 190, 1);
            }
            em {
              display: block;
              width: 1.24rem;
              height: 0.3rem;
              font-size: 0.24rem;
              font-weight: 500;
              position: relative;
              margin: 0 auto;
              border-radius: 0.15rem;
              &.barNums {
                background: RGBA(104, 124, 219, 1);
              }
              strong {
                font-size: 0.22rem;
                color: rgba(84, 71, 190, 1);
                display: block;
                width: 100%;
                height: 100%;
                line-height: 0.3rem;
                text-align: center;
                position: absolute;
                left: 0;
                top: 0;
                z-index: 2;
              }
              .actBar {
                height: 0.3rem;
                line-height: 0.3rem;
                background: linear-gradient(90deg, #E68FFF 0%, #FFF38F 100%);
                border-radius: 0.15rem;
                max-width: 100%;
                position: absolute;
                left: 0;
                top: 0;
              }
            }
          }
        }
        li::before {
          content: '';
          display: block;
          width: 6.65rem;
          height: 0.02rem;
          background: url(../img/liner.png);
          background-size: 100% 100%;
          position: absolute;
          bottom: 0;
          left: 0;
        }
      }
    }
    .stored {
      width: 6.8rem;
      height: 5.08rem;
      background: linear-gradient(0deg, #594FC7 0%, #5447BE 100%);
      border-radius: 0.4rem;
      margin: 0.2rem auto;
    }
  }
  .stored {
    .title {
      height: 1.3rem;
      line-height: 1.3rem;
      text-align: center;
      color: rgba(182, 239, 255, 1);
      font-size: 0.42rem;
    }
    .storedTips {
      span {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.26rem;
        img {
          width: 0.5rem;
          height: 0.5rem;
          margin: 0 0.1rem;
        }
      }
    }
    .coinsTips {
      text-align: center;
      color: rgba(255, 250, 151, 1);
      font-size: 0.28rem;
      margin: 0.3rem auto 0;
    }
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      div {
        width: 2.54rem;
        height: 0.74rem;
        text-align: center;
        line-height: 0.74rem;
        color: rgba(101, 72, 209, 1);
        font-weight: 600;
        margin: 0.4rem auto;
        &.get {
          background: url(../img/storeBtn.png);
          background-size: 100% 100%;
        }
        &.goStore {
          margin-left: 0.8rem;
          background: url(../img/gerbtn.png);
          background-size: 100% 100%;
        }
        &.black {
          background: url(../img/black.png);
          background-size: 100% 100%;
        }
      }
    }
  }
  .giftPup {
    width: 6.6rem;
    height: 6.12rem;
    background: url(../img/queryPup.png);
    background-size: 100% 100%;
    position: relative;
    padding-right: 0.46rem;
    margin: -1rem 0 0 0.3rem;
    .title {
      height: 1.4rem;
      line-height: 2.3rem;
      text-align: center;
      font-size: 0.36rem;
    }
    .giftTips {
      text-align: center;
      color: rgba(240, 179, 255, 1);
      font-size: 0.24rem;
      padding: 0 0.8rem;
      em {
        font-size: 0.24rem;
      }
    }
    .giftImg {
      display: flex;
      align-items: center;
      justify-content: center;
      .imgBox {
        width: 1.58rem;
        height: 1.6rem;
        position: relative;
        .imgbg {
          width: 1.58rem;
          height: 1.6rem;
          background: url(../img/finght.png);
          background-size: 100% 100%;
          position: absolute;
          left: 0;
          top: 0;
        }
        img {
          position: absolute;
          left: 0.35rem;
          top: 0.35rem;
          z-index: 2;
        }
      }
      strong {
        display: block;
        text-align: center;
        font-size: 0.24rem;
      }
    }
    .ok {
      width: 2.54rem;
      height: 0.74rem;
      text-align: center;
      line-height: 0.74rem;
      font-size: 0.36rem;
      font-weight: 500;
      background: url(../img/ok.png);
      background-size: 100% 100%;
      margin: 0.25rem auto;
      color: rgba(101, 72, 209, 1);
      font-weight: 500;
    }
  }
  .rankList {
    padding-bottom: 2rem;
    > p {
      text-align: center;
      height: 0.8rem;
      line-height: 0.8rem;
      &.rankTips {
        line-height: 0.3rem;
        color: rgba(240, 179, 255, 1);
        font-size: 0.24rem;
      }
    }
    .timeDown {
      padding: 0 0.37rem;
      margin: 0.12rem auto 0;
      display: flex;
      justify-content: space-between;
      strong {
        color: rgba(84, 71, 190, 1);
        font-size: 0.48rem;
        font-weight: bold;
        display: block;
        width: 1rem;
        height: 1rem;
        background: url(../img/timeBg.png);
        background-size: 100% 100%;
        border-radius: 0.12rem;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 0.38rem;
          height: 0.59rem;
        }
      }
      em {
        display: block;
        font-size: 0.24rem;
        line-height: 0.9rem;
        color: rgba(182, 239, 255, 1);
        margin: 0.1rem 0 0.22rem;
      }
    }
    .tips {
      color: rgba(182, 239, 255, 1);
      font-size: 0.22rem;
    }
    .rankTips {
      margin-top: 0.25rem;
      font-size: 0.24rem;
      color: rgba(142, 105, 63, 1);
      span {
        display: block;
      }
    }
    ul {
      width: 6.8rem;
      border-radius: 0.12rem;
      margin: 0 auto;
      li {
        height: 1.4rem;
        display: flex;
        align-items: center;
        background: url(../img/listItem.png);
        background-size: 100% 100%;
        margin-bottom: 0.1rem;
        position: relative;
        .listRank {
          width: 0.87rem;
          height: 0.7rem;
          line-height: 0.7rem;
          text-align: center;
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
          .room_frame {
            width: 0.94rem;
            height: 0.94rem;
            position: absolute;
            top: 0.055rem;
            left: 0.065rem;
            z-index: 10;
          }
          .av {
            width: 0.88rem;
            height: 0.88rem;
            position: absolute;
            top: 0.1rem;
            left: 0.11rem;
            border-radius: 50%;
            border: 0.02rem solid rgba(213, 199, 240, 1);
            &.room {
              border-radius: 0.14rem;
              &.noBor {
                border: none;
              }
            }
          }
        }
        .msg {
          width: 2.6rem;
          margin-left: 0.28rem;
          .nick {
            color: rgba(234, 236, 255, 1);
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .uid {
            font-size: 0.26rem;
            color: rgba(238, 178, 255, 1);
          }
        }
        .score {
          display: flex;
          align-items: center;
          color: rgba(255, 245, 137, 1);
          margin-left: 0.3rem;
          i {
            width: 0.5rem;
            height: 0.5rem;
            background: url(../img/flower.png);
            background-size: 100% 100%;
            margin-right: 0.08rem;
          }
        }
        &.rank1 {
          background: url(../img/listTop.png);
          background-size: 100% 100%;
          .listRank {
            text-indent: -999rem;
            background: url(../img/top1.png) center center no-repeat;
            background-size: 0.44rem 0.55rem;
          }
        }
        &.rank2 {
          background: url(../img/listTop.png);
          background-size: 100% 100%;
          .listRank {
            text-indent: -999rem;
            background: url(../img/top2.png) center center no-repeat;
            background-size: 0.44rem 0.55rem;
          }
        }
        &.rank3 {
          background: url(../img/listTop.png);
          background-size: 100% 100%;
          .listRank {
            text-indent: -999rem;
            background: url(../img/top3.png) center center no-repeat;
            background-size: 0.44rem 0.55rem;
          }
        }
      }
      //   li::before {
      //     content: '';
      //     display: block;
      //     width: 5.1rem;
      //     height: 0.015rem;
      //     position: absolute;
      //     bottom: 0;
      //     right: 0.3rem;
      //     background: RGBA(255, 229, 226, 1);
      //   }
    }
  }
  .noData {
    text-align: center;
    font-size: 0.28rem;
    color: rgba(133, 90, 55, 1);
  }
}
</style>