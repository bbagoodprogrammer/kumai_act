<template>
  <div class="tabsCon">
    <div class="tabs">
      <span :class="{act:showCom=='DayTasks'}" @click="tabClick('DayTasks')">{{lang.todayTask}}</span>
      <span :class="{act:showCom=='DayWards'}" @click="tabClick('DayWards')">
        {{lang.dayWards}}
        <i class="tips" v-if="showTips"></i>
      </span>
      <span :class="{act:showCom=='Rank'}" @click="tabClick('Rank')">{{lang.rankTitle}}</span>
    </div>
    <keep-alive>
      <component :is="showCom"></component>
    </keep-alive>
  </div>

</template>
<script>
import DayTasks from "./DayTasks"
import DayWards from "./DayWards"
import Rank from "./Rank"
import api from "../api/apiConfig"
import { mapState } from "vuex"
export default {
  components: { DayTasks, DayWards, Rank },
  data() {
    return {
      showCom: 'DayTasks'
    }
  },
  computed: {
    ...mapState(['wardsList', 'rankList', 'receive']),
    showTips() {
      if (!this.countProperties) {
        return this.receive
      } else {
        for (let item in this.wardsList) {
          if (!this.wardsList[item].receive && this.wardsList[item].able) {
            return true
          }
        }
      }
    },
    countProperties() {
      for (var key in this.wardsList) {
        if (key) {
          return true
        }
      }
      return false
    }
  },
  methods: {
    tabClick(val) {
      if (val == 'DayWards' && !this.countProperties) {
        this.creatDayWards()
        this.showCom = val
      } else if (val == 'Rank' && !this.rankList.length) {
        this.creatRank()
        this.showCom = val
      } else {
        this.showCom = val
      }
    },
    creatDayWards() {
      api.getDayWards().then(res => {
        this.vxc('setWardsList', res.data.response_data.list)
      })
    },
    creatRank() {
      api.getRank(0).then(res => {
        this.vxc('setRankList', res.data.response_data.list)
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.tabsCon {
  margin-top: 0.4rem;
}
.tabs {
  padding: 0 0.17rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    width: 2.32rem;
    height: 0.81rem;
    background: url(../assets/img/tabItem.png);
    background-size: 100% 100%;
    text-align: center;
    color: #5a2412;
    font-weight: 600;
    line-height: 0.25rem;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .tips {
      display: block;
      width: 0.2rem;
      height: 0.2rem;
      background: url(../assets/img/redPoint.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.1rem;
      right: 0.15rem;
    }
    &.act {
      color: rgba(255, 240, 157, 1);
      -webkit-text-stroke: 1px #6d2c06;
      text-stroke: 1px #6d2c06;
      background: url(../assets/img/tabAct.png);
      background-size: 100% 100%;
    }
  }
}
</style>
