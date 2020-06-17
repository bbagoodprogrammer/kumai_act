<template>
  <div class="box">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <span class="ruleTips" @click="showRulePup()">活動規則</span>
      <span class="history" @click="showHistoryPup()"></span>
      <span class="rank" @click="showRankPup()"></span>
    </div>
    <GiftBox />
    <Fragment />
    <div class="mask" v-show="showRule">
      <transition name="slide">
        <div class="rules" v-if="showRule">
          <i class="close" @click="closeRule()"></i>
          <div class="title"></div>
          <div class="msg">
            <h6>活動時間：</h6>
            <p>2020.06.19 12:00 - 2020.07.03 18:00</p>
            <h6>尋寶榜規則：</h6>
            <p>榜單排序依據尋到的寶物金幣總價值排序</p>
            <h6>尋寶榜獎勵：</h6>
            <p>第一名：尋寶專家認證（15天） </br>
              第二名：尋寶達人認證（15天）</br>
              第三名：尋寶達人認證（7天）
            </p>
            <h6>其他說明：</h6>
            <p class="lastTips">1 尋到的寶物金幣價值按頁面給出的數值計算。</p>
            <p class="lastTips">2 尋到的寶物，兌換碎片寶物及優雅戀人頭像框由系統實時發放，禮物在背包中查看，頭像框在商城中查看。</p>
            <p class="lastTips">3 鑰匙及碎片僅限當期活動時間內使用，過期將清零，請及時使用。</p>
            <p class="lastTips">4 在活動時間內，收到/送出燭光晚餐禮物都可獲得優雅戀人頭像框（3天）</p>
            <p class="lastTips2">本活動最終解釋權歸主辦方所有</p>
          </div>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="showRank">
      <transition name="slide">
        <div class="rank" v-if="showRank">
          <i class="close" @click="closeRankPup()"></i>
          <div class="title"></div>
          <div class="num">尋到金幣寶物數</div>
          <p class="noData" v-if="rank.length == 0">暫無數據！</p>
          <ul class="scrollable">
            <li v-for="(item,index) in rank " :key="index" :class="'rank' + item.rank">
              <div class="listRank">{{item.rank}}</div>
              <img v-lazy="item.avatar" alt="">
              <div class="nick">{{item.nick}}</div>
              <div class="sex" :class="{man:item.sex == 0}"></div>
              <div class="score"><i></i>{{item.score}}</div>
            </li>
          </ul>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="showHistory">
      <transition name="slide">
        <div class="history" v-show="showHistory">
          <i class="close" @click="closeHistoryPup()"></i>
          <div class="title"></div>
          <div class="tabs" :class="{tab2:hType==2}">
            <span @click="hTabClick(1)"></span>
            <span @click="hTabClick(2)"></span>
          </div>
          <div class="hList">
            <p class="noData" v-if="HshowRank.length == 0">暫無數據！</p>
            <ul class="scrollable2">
              <li v-for="(item,index) in HshowRank" :key="index">
                <div class="giftNick">
                  <strong v-if="item.name && item.type!='frame'" :class="'lv' + item.level">{{item.name}} {{item.day?`(${item.day}天)`:`*${item.count}`}}</strong>
                  <strong v-else :class="'lv' + item.level">{{getName(item)}}</strong>
                </div>
                <div class="coins">
                  <i :class="{fragments:hType==2}"></i>
                  <em>{{getCoins(item)}}</em>
                </div>
                <div class="tm">{{getTime(item.time)}}</div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <!-- <act-footer></act-footer> -->
    <!-- <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}"></div> -->
  </div>
</template>

<script>

import getString from "../utils/getString"
import APP from "../utils/openApp"
import api from "../api/apiConfig"
import ActFooter from "../components/ActFooter"
import GiftBox from "../components/GiftBox"
import Fragment from "../components/Fragment"
import { globalBus } from '../utils/eventBus'
import getDate from "../utils/getDate"
export default {
  components: { ActFooter, GiftBox, Fragment },
  data() {
    return {
      isShare: false, //是否分享
      isMore: true,   //加载更多
      activite: 1,    //活动状态
      showT: false,  //提示弹窗显示
      tastMsg: "提示信息",  //基础弹窗提示信息
      userState: 0,   //用户状态（是否报名）
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
      showRule: false,
      showRank: false,
      showHistory: false,
      rank: [],
      loaded: false,
      more: true,
      loaded2: false,
      loaded3: false,
      more2: true,
      hType: 1,
      luckHistoryList: [],
      revHistoryList: []
    }
  },
  created() {
    this.judgeShare()  //判断是否为分享环境,请求相应的接口 
    this.getDefaultData()
  },
  computed: {
    HshowRank() {
      if (this.hType == 1) {
        return this.luckHistoryList
      } else {
        return this.revHistoryList
      }
    }
  },
  mounted() {
    this.scrollable = this.$el.querySelector('.scrollable');
    this.scrollable2 = this.$el.querySelector('.scrollable2');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
    if (this.scrollable2) {
      this.scrollable2.addEventListener('scroll', this.hOnScroll);
    }
  },
  methods: {
    judgeShare() {//判断是否为分享环境,请求相应的接口 
      this.isShare = getString('token') ? false : true
      this.vxc('setShareState', this.isShare) //分享状态
    },
    getDefaultData(val) { //初始化
      api.getDefault().then(res => {
        const { response_status, response_data } = res.data
        if (response_status.code == 0) {
          const { keys, open_keys, packet1, packet2, step, uid, update, fragments } = response_data
          this.vxc('setActStatus', step)
          this.vxc('setUserKeyNum', keys)
          this.vxc('setOpen_keys', open_keys)
          this.vxc('setFragments', fragments)
        } else {
          this.toast(response_status.error)
        }
      })
      api.getRoolMsg().then(res => {
        this.vxc('setRoolMsg', res.data.response_data.list)
      })
    },
    onScroll() {
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.loaded) return
        if (this.more) {
          this.more = false
          api.getRank(this.rank.length, 'more').then(res => {
            this.more = true
            if (res.data.response_data.list.length === 0) {
              this.loaded = true
            } else {
              this.rank = this.rank.concat(res.data.response_data.list)
            }
          })
        }
      }
    },
    hOnScroll() {
      const scrollToBottom = this.scrollable2.scrollTop + this.scrollable2.clientHeight >= this.scrollable2.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        let isOver = this.hType == 1 ? this.loaded2 : this.loaded3
        if (this.more2 && !isOver) {
          this.more2 = false
          api.getHistory(this.hType, this.hType == 1 ? this.luckHistoryList.length : this.revHistoryList.length, 'more').then(res => {
            this.more2 = true
            if (this.hType == 1) {
              this.luckHistoryList = this.luckHistoryList.concat(res.data.response_data.list)
            } else {
              this.revHistoryList = this.revHistoryList.concat(res.data.response_data.list)
            }
            if (res.data.response_data.list.length < 20) {
              if (this.hType == 1) {
                this.loaded2 = true
              } else {
                this.loaded3 = true
              }
            }
          })
        }
      }
    },
    downApp() {
      APP()
    },
    showRulePup() {
      this.showRule = true
    },
    showRankPup() {
      api.getRank(0).then(res => {
        this.rank = res.data.response_data.list
        this.ModalHelper.afterOpen()
        this.showRank = true
      })
    },
    showHistoryPup() {
      api.getHistory(1, 0).then(res => {
        // if (this.hType == 1) {
        this.luckHistoryList = res.data.response_data.list
        // } else {
        //   this.revHistoryList = res.data.response_data.list
        // }
        // this.scrollable2.scrollTo(0, 0)
        this.ModalHelper.afterOpen()
        this.showHistory = true
      })
    },
    hTabClick(val) {
      this.scrollable2.scrollTo(0, 0)
      if (!this.revHistoryList.length) {
        api.getHistory(2, 0).then(res => {
          this.hType = val
          this.revHistoryList = res.data.response_data.list
        })
      } else {
        this.hType = val
      }
    },
    closeRankPup() {
      this.showRank = false
      this.ModalHelper.beforeClose()
    },
    closeRule() {
      this.showRule = false
    },
    closeHistoryPup() {
      this.loaded2 = false
      this.loaded3 = false
      this.hType = 1
      this.revHistoryList = []
      this.luckHistoryList = []
      this.showHistory = false
      this.ModalHelper.beforeClose()
    },
    refrsh() { //刷新
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      window.removeEventListener("scroll", this.onScroll)
      this.getDefaultData('ref')
    },
    getName(item) {
      if (item.type == 'coin') {
        return `${item.coins}金幣`
      } else if (item.type == 'frame') {
        return `${item.name}頭像框(${item.days}天) x1`
      } else if (item.type == 'fragment') {
        return `寶藏碎片x${item.count}`
      }
    },
    getCoins(item) {
      if (item.fragments) {
        return item.fragments
      }
      if (item.type == 'coin') {
        return item.coins
      } else {
        return item.price * item.count
      }
    },
    getTime(tm) {
      return getDate(new Date(tm * 1000), '2')
    }
  }
}
</script>
<style lang='scss'>
body::-webkit-scrollbar {
  width: 0;
}
body {
  background: #954ddb url(../assets/img/banner.png) center 0 no-repeat;
  background-size: 100% auto;
}
.box {
  max-width: 750px;
  overflow-x: hidden;
  position: relative;
  margin: auto;
  .shareBar {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
    .bar {
      width: 7.5rem;
      height: 1.2rem;
      margin: auto;
      background: url(../assets/img/share_bar.jpg) no-repeat;
      background-size: 100% 100%;
    }
  }
  .header {
    height: 8.29rem;
    position: relative;
    .ruleTips {
      display: block;
      width: 1.29rem;
      height: 0.44rem;
      line-height: 0.44rem;
      font-size: 0.24rem;
      color: #fbe235;
      font-weight: 500;
      text-align: center;
      text-indent: 0.1rem;
      background: rgba(96, 20, 200, 0.49);
      border-radius: 0.22rem 0 0 0.22rem;
      position: fixed;
      top: 3.2rem;
      right: 0;
      z-index: 20;
    }
    .rank {
      width: 0.94rem;
      height: 1rem;
      position: fixed;
      left: 0.08rem;
      top: 4.14rem;
      background: url(../assets/img/rankIcon.png);
      background-size: 100% 100%;
      z-index: 20;
    }
    .history {
      width: 0.94rem;
      height: 1rem;
      position: fixed;
      left: 0.08rem;
      top: 2.95rem;
      background: url(../assets/img/historyIcon.png);
      background-size: 100% 100%;
      z-index: 20;
    }
  }
  .guaBox {
    position: relative;
  }
}
.noData {
  text-align: center;
}
.rules {
  width: 7.03rem;
  height: 9.15rem;
  background: url(../assets/img/pupBg.png);
  background-size: 100% 100%;
  position: relative;
  .title {
    width: 1.65rem;
    height: 0.39rem;
    background: url(../assets/img/rulesTitle.png);
    background-size: 100% 100%;
    margin: 0.48rem auto 0;
  }
  .msg {
    padding: 0 0.39rem;
    h6 {
      font-size: 0.24rem;
      margin-top: 0.28rem;
    }
    p {
      color: #eadfff;
      font-size: 0.24rem;
      padding-left: 0.56rem;
    }
    .lastTips {
      padding: 0;
      text-indent: 0.5rem;
    }
  }
  .lastTips2 {
    margin-top: 0.8rem;
    text-align: center;
    color: #c8acff;
    font-size: 0.24rem;
  }
  .close {
    display: block;
    width: 0.22rem;
    height: 0.22rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    top: -0.5rem;
    right: 0.1rem;
  }
}
.rank {
  width: 7.03rem;
  height: 9.15rem;
  background: url(../assets/img/pupBg.png);
  background-size: 100% 100%;
  position: relative;
  .title {
    width: 1.65rem;
    height: 0.39rem;
    background: url(../assets/img/rankTitle.png);
    background-size: 100% 100%;
    margin: 0.48rem auto 0;
  }
  .num {
    text-align: right;
    font-size: 0.18rem;
    color: #eae3fc;
    padding-right: 0.77rem;
    margin-top: 0.26rem;
  }
  ul {
    width: 6.32rem;
    height: 7rem;
    max-height: 7rem;
    margin: 0.14rem auto;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    -webkit-overflow-scrolling: auto;
    li {
      display: flex;
      align-items: center;
      height: 0.68rem;
      background: rgba(83, 22, 195, 1);
      border-radius: 0.34rem;
      margin-bottom: 0.17rem;
      .listRank {
        width: 0.7rem;
        text-align: center;
        margin-left: 0.09rem;
        font-size: 0.24rem;
        font-weight: bold;
      }
      img {
        width: 0.44rem;
        height: 0.44rem;
        border-radius: 50%;
      }
      .nick {
        margin-left: 0.15rem;
        width: 2.11rem;
        max-width: 2.11rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 0.24rem;
        color: #eae3fc;
      }
      .sex {
        width: 0.32rem;
        height: 0.32rem;
        background: url(../assets/img/sex2.png);
        background-size: 100% 100%;
        margin-left: 0.1rem;
        &.man {
          background: url(../assets/img/sex1.png);
          background-size: 100% 100%;
        }
      }
      .score {
        display: flex;
        align-items: center;
        font-size: 0.24rem;
        color: #fedd0c;
        font-weight: bold;
        margin-left: 0.78rem;
        i {
          width: 0.24rem;
          height: 0.24rem;
          display: block;
          margin-right: 0.11rem;
          background: url(../assets/img/cicon.png);
          background-size: 100% 100%;
        }
      }
      &.rank1 {
        .listRank {
          height: 0.68rem;
          text-indent: -999rem;
          background: url(../assets/img/top1.png) center center no-repeat;
          background-size: 0.4rem 0.68rem;
        }
      }
      &.rank2 {
        .listRank {
          height: 0.68rem;
          text-indent: -999rem;
          background: url(../assets/img/top2.png) center center no-repeat;
          background-size: 0.4rem 0.68rem;
        }
      }
      &.rank3 {
        .listRank {
          height: 0.68rem;
          text-indent: -999rem;
          background: url(../assets/img/top3.png) center center no-repeat;
          background-size: 0.4rem 0.68rem;
        }
      }
    }
  }
  .close {
    display: block;
    width: 0.22rem;
    height: 0.22rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    top: -0.5rem;
    right: 0.1rem;
  }
}
.history {
  width: 7.03rem;
  height: 9.15rem;
  background: url(../assets/img/pupBg.png);
  background-size: 100% 100%;
  position: relative;
  .title {
    width: 1.65rem;
    height: 0.39rem;
    background: url(../assets/img/historyTitle.png);
    background-size: 100% 100%;
    margin: 0.48rem auto 0;
  }
  .tabs {
    width: 3.04rem;
    height: 0.44rem;
    background: url(../assets/img/historyTab1.png);
    background-size: 100% 100%;
    margin: 0.32rem auto;
    display: flex;
    justify-content: space-between;
    span {
      flex: 1;
    }
    &.tab2 {
      background: url(../assets/img/historyTab2.png);
      background-size: 100% 100%;
    }
  }
  .hList {
    ul {
      width: 6.32rem;
      height: 6.8rem;
      max-height: 6.8rem;
      margin: 0.14rem auto 0;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      -webkit-overflow-scrolling: auto;
      li {
        min-height: 0.48rem;
        background: rgba(83, 22, 195, 1);
        border-radius: 0.24rem;
        display: flex;
        align-items: center;
        margin-bottom: 0.1rem;
        .giftNick {
          width: 2.15rem;
          padding-left: 0.31rem;
          font-size: 0.24rem;
          color: #eae3fc;
          font-weight: bold;
        }
        .coins {
          width: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fedd0c;
          font-size: 0.24rem;
          font-weight: bold;
          i {
            width: 0.24rem;
            height: 0.24rem;
            background: url(../assets/img/cicon.png);
            background-size: 100% 100%;
            margin-right: 0.06rem;
            &.fragments {
              background: url(../assets/img/frams.png);
              background-size: 100% 100%;
            }
          }
        }
        .tm {
          flex: 1;
          padding-right: 0.32rem;
          color: #eae3fc;
          font-size: 0.2rem;
          text-align: right;
        }
      }
    }
  }
  .close {
    display: block;
    width: 0.22rem;
    height: 0.22rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    top: -0.5rem;
    right: 0.1rem;
  }
}
.refresh {
  display: block;
  width: 0.94rem;
  height: 1rem;
  position: fixed;
  left: 0.08rem;
  bottom: 1.35rem;
  background: url(../assets/img/refresh.png) no-repeat;
  background-size: contain;
  transition: transform 1s;
  z-index: 1000;
}
</style>


