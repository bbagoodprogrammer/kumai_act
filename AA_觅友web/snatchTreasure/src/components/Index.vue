<template>
  <div class="page pageIndex">
    <div class="iconList">
      <span class="history" @click="showUserHistrry = true"></span>
      <div class="rank" @click="showRank = true"></div>
      <div class="userTicketNums"><i class="tIcon"></i> <span>{{vouchers}}</span> <i class="get" @click="getTicket()">獲取</i></div>
    </div>
    <div class="logo"><i class="qurey" @click="showRule = true"></i></div>
    <div class="tabs">
      <span :class="{act:type == 1}" @click="init('tabClick')">熱門奪寶</span>
      <span :class="{act:type == 2}" @click="type = 2">歷史奪寶</span>
    </div>
    <keep-alive :include="'hotList'">
      <component :is="type == 1?'hotList':'historyList'" ref="showCom" :numbersList="numbersList" />
    </keep-alive>

    <div class="mask2" @click="closePup()" v-show="showMask"></div>

    <!-- 獲取券 -->
    <transition name="move">
      <div class="getTicket" v-show="showGetTicketPup">
        <div class="tickMsg">
          <div class="title"><i></i><strong>獲得幸運券</strong></div>
          <div class="userTicketNums">幸運券:{{vouchers}}</div>
        </div>
        <div class="btnList">
          <div v-for="(item,index) in joinType" :class="{act:setId == item.id}" :key="index" @click="setType(item.id)">
            <div class="strTips">{{item.nums}}个</div>
          </div>
        </div>
        <div class="getBtn" @click="buy()">獲得</div>
        <p class="getTips">消耗{{price}}金幣可獲得1張幸運券</p>
        <div class="userCoins">
          <div class="coins">
            <i></i>
            <em>{{balance}}</em>
          </div>
          <div class="charge" @click="gowalletpage()">
            <em>儲值</em>
            <i></i>
          </div>
        </div>
      </div>
    </transition>

    <transition name="moveR">
      <Rule v-if="showRule" />
    </transition>
    <transition name="moveR">
      <TabsScrollLoadList v-if="showRank" />
    </transition>
    <transition name="moveR">
      <UserHistoryList v-if="showUserHistrry" />
    </transition>
  </div>
</template>

<script>

import hotList from "./HotList"
import historyList from "./HistoryList"
import { mapState } from "vuex"
import Rule from "./Rule"
import TabsScrollLoadList from "./TabsScrollLoadList"
import UserHistoryList from "./UserHistoryList"
import { getSortIngList, buyVouchers } from "../apis"



export default {
  components: { hotList, historyList, Rule, TabsScrollLoadList, UserHistoryList },
  data () {
    return {
      type: 1,
      showGetTicketPup: false,
      showRule: false,
      showRank: false,
      showUserHistrry: false,
      joinType: [],
      numbersList: [],
      price: 0,
      setId: 1
    }
  },
  created () {
    this.init()
  },
  computed: {
    ...mapState(['showMask', 'balance', 'vouchers'])
  },
  methods: {
    init (val) {
      if (val && this.type == 1) {
        return
      } else {
        this.type = 1
      }
      getSortIngList().then(res => {
        if (res.data.response_data) {
          const { list, products, price, balance, vouchers } = res.data.response_data
          this.numbersList = list
          this.joinType = products
          this.price = price
          this.vxc('setBalance', balance)
          this.vxc('setVouchers', vouchers)
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    setType (id) {
      this.setId = id
    },
    buy () {
      buyVouchers(this.setId).then(res => {
        if (!res.data.response_status.code) {
          const { balance, vouchers } = res.data.response_data
          this.vxc('setBalance', balance)
          this.vxc('setVouchers', vouchers)
          this.showGetTicketPup = false
          this.toast(`購買成功！`)
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    getTicket () {
      this.vxc('setShowMask')
      this.showGetTicketPup = true
    },
    closePup () {
      this.vxc('setShowMask')
      this.$refs.showCom.showSetTypePup = false
      this.showGetTicketPup = false
    },
    gowalletpage () {
      const ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      try {
        if (ios) {
          // goWalletpage()
          sendJsData('app://walletpage');
        } else {
          javascript: JSInterface.sendJsData('app://walletpage');
        }
      } catch (e) { }
    },
  }
}
</script>

<style lang="scss">
.pageIndex {
  width: 7.5rem;
  padding-top: 1.21rem;
  background: url(../img/banner.png) no-repeat;
  background-size: 100% auto;
  position: relative;
  overflow: hidden;
  .iconList {
    display: flex;
    position: absolute;
    top: 0.32rem;
    left: 0.31rem;
    .history,
    .rank {
      width: 0.48rem;
      height: 0.48rem;
      background: url(../img/history.png);
      background-size: 100% 100%;
      margin-right: 0.17rem;
    }
    .rank {
      background: url(../img/rank.png);
      background-size: 100% 100%;
    }
    .userTicketNums {
      width: 1.75rem;
      height: 0.48rem;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 0.24rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        flex: 1;
        text-align: center;
        font-size: 0.24rem;
      }
      .tIcon {
        width: 0.48rem;
        height: 0.48rem;
        background: url(../img/tIcon.png);
        background-size: 100% 100%;
      }
      .get {
        width: 0.56rem;
        height: 0.3rem;
        background: #FFDD00;
        border-radius: 0.15rem;
        margin-right: 0.08rem;
        text-align: center;
        line-height: 0.3rem;
        font-size: 0.2rem;
        color: rgba(44, 43, 54, 1);
      }
    }
  }
  .logo {
    position: relative;
    .qurey {
      display: block;
      width: 0.4rem;
      height: 0.4rem;
      position: absolute;
      top: 0.1rem;
      right: 0.1rem;
    }
  }
  .tabs {
    width: 6.38rem;
    height: 0.8rem;
    background: #6E1ACC;
    border-radius: 0.4rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      width: 3.08rem;
      height: 0.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.32rem;
      color: rgba(255, 255, 255, 0.6);
      &.act {
        color: #ffff;
        background: url(../img/tabAct.png);
        background-size: 100% 100%;
      }
    }
  }
  .getTicket {
    width: 7.5rem;
    height: 4.25rem;
    padding-top: 0.05rem;
    background: url(../img/getTicketBg.png);
    background-size: 100% 100%;
    position: absolute;
    bottom: 0;
    z-index: 5;
    .tickMsg {
      padding: 0 0.33rem;
      height: 1.14rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        display: flex;
        align-items: center;
        justify-content: center;
        i {
          width: 0.48rem;
          height: 0.48rem;
          background: url(../img/tIcon.png);
          background-size: 100% 100%;
        }
        strong {
          font-size: 0.36rem;
          margin-left: 0.04rem;
        }
      }
      .userTicketNums {
        font-size: 0.24rem;
      }
    }
    .btnList {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0.38rem;
      text-align: center;
      > div {
        width: 1.82rem;
        height: 0.7rem;
        background: rgba(255, 255, 255, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border-radius: 0.35rem;
        &.act {
          background: url(../img/joinTypeBtn.png);
          background-size: 100% 100%;
        }
        .strTips {
          font-size: 0.28rem;
        }
        .numsTips {
          font-size: 0.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          i {
            width: 0.24rem;
            height: 0.24rem;
            background: url(../img/tIcon.png);
            background-size: 100% 100%;
          }
          strong {
            font-size: 0.2rem;
          }
        }
      }
    }
    .getBtn {
      width: 5.98rem;
      height: 0.88rem;
      background: #FFFFFF;
      border-radius: 0.44rem;
      margin: 0.48rem auto 0;
      text-align: center;
      line-height: 0.88rem;
      font-size: 0.32rem;
      color: #FE60CD;
      font-weight: bold;
    }
    .getTips {
      text-align: center;
      font-size: 0.24rem;
      margin-top: 0.05rem;
    }
    .userCoins {
      display: inline-block;
      float: right;
      height: 0.36rem;
      display: flex;
      align-items: center;
      margin-right: 0.25rem;
      > div {
        display: flex;
        align-items: center;
        justify-content: center;
        &.coins {
          em {
            font-size: 0.24rem;
          }
          i {
            width: 0.36rem;
            height: 0.36rem;
            background: url(../img/coinsIcon.png);
            background-size: 100% 100%;
            margin-right: 0.08rem;
          }
        }
        &.charge {
          margin-left: 0.2rem;
          em {
            font-size: 0.24rem;
            color: #FFDD00;
          }
          i {
            width: 0.18rem;
            height: 0.18rem;
            background: url(../img/arr.png);
            background-size: 100% 100%;
            margin-left: 0.1rem;
          }
        }
      }
    }
  }
  img {
    display: block;
    width: 100%;
  }
  .mask2 {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    // transform:none!important;
  }
}
</style>