<template>
  <div class="footerBar">
    <div class="iconBox">
      <span class="rule" @click="showRulesPup()"></span>
      <span class="history" @click="showWardsHistoryPup()"></span>
      <span class="rank" @click="showRankList()"></span>
    </div>
    <div class="coinsBox" @click="goHtml()">
      <em>{{showCom=='SilverTrun'?owner_wallet.bean:owner_wallet.coin}}</em> <i class="coins" :class="{dou:showCom=='SilverTrun'}"></i> <i class="arrow"></i>
    </div>
    <transition name="moveR">
      <rank v-if="showRank" @closeRank="closeRank"></rank>
    </transition>
    <transition name="moveR">
      <wards-history v-if="showWardsHistory" @closeWardsHistoryPup="closeWardsHistoryPup"></wards-history>
    </transition>
    <transition name="moveR">
      <rules v-show="showRules" @closeRules="closeRules"></rules>
    </transition>
  </div>
</template>
<script>
import getString from "../utils/getString"
import Rank from "../components/Rank"
import WardsHistory from "../components/WardsHistory"
import Rules from "../components/Rules"
import { mapState } from 'vuex'
export default {
  components: { Rank, WardsHistory, Rules },
  props: ['showCom'],
  computed: {
    ...mapState(['owner_wallet'])
  },
  data() {
    return {
      showRank: false,
      showWardsHistory: false,
      showRules: false
    }
  },
  methods: {
    goHtml() {
      if (this.showCom == 'SilverTrun') {
        let regstr = getString('token')
        let uid = getString('uid')
        location.href = `http://act.gosingapp.com/html/task_new/index.html?uid=${uid}&token=${regstr}`
      } else {
        location.href = "walletConfig://"
      }
    },
    showRankList() {
      this.showRank = true
    },
    closeRank() {
      this.showRank = false
    },
    showWardsHistoryPup() {
      this.showWardsHistory = true
    },
    closeWardsHistoryPup() {
      this.showWardsHistory = false
    },
    showRulesPup() {
      this.showRules = true
    },
    closeRules() {
      this.showRules = false
    }
  }
}
</script>
<style lang="scss">
.footerBar {
  display: flex;
  padding: 0 0.65rem;
  justify-content: space-between;
  margin-top: 0.28rem;
  .iconBox {
    width: 2.28rem;
    display: flex;
    justify-content: space-between;
    span {
      display: block;
      width: 0.55rem;
      height: 0.55rem;
      &.history {
        background: url(../assets/img/historyTips.png);
        background-size: 100% 100%;
      }
      &.rank {
        background: url(../assets/img/rankTips.png);
        background-size: 100% 100%;
      }
      &.rule {
        background: url(../assets/img/ruleTips.png);
        background-size: 100% 100%;
      }
    }
  }
  .coinsBox {
    display: flex;
    align-items: center;
    .arrow {
      display: block;
      width: 0.18rem;
      height: 0.26rem;
      background: url(../assets/img/coinsArrow.png);
      background-size: 100% 100%;
    }
    .coins {
      width: 0.35rem;
      height: 0.35rem;
      background: url(../assets/img/coins2.png);
      background-size: 100% 100%;
      margin-left: 0.08rem;
      &.dou {
        background: url(../assets/img/dou.png);
        background-size: 100% 100%;
      }
    }
    em {
      font-size: 93%;
      color: #efe0ff;
      margin-left: 0.1rem;
      // font-style: italic;
      // color: #ff37d2;
      // -webkit-text-stroke: 0.005rem #fff;
      // text-stroke: 0.005rem #fff;
    }
  }
}
.moveR-enter-active,
.moveR-leave-active {
  transition: all 0.1s linear;
  transform: translateX(0);
}
.moveR-enter,
.moveR-leave {
  transform: translateX(100%);
}
.moveR-leave-to {
  transform: translateX(100%);
}
</style>
