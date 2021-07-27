<template>
  <div>
    <Luck />
    <div class="landTask">
      <div class="landCon">
        <div class="landName">{{openLand.name}}</div>
        <div class="openTm">開放時間:{{openTm}}</div>
        <ul class="taskList">
          <li v-for="(item,index) in openLand.tasks" :key="index">
            <div class="msg">
              <div class="tName">{{item.title}}</div>
              <div class="gift">獎勵:{{item.props}}海螺({{item.process}}/{{item.target}})</div>
            </div>
            <div class="status">
              <em v-if="item.id == 4">房間人氣值：{{item.process}}</em>
              <strong :class="{'act':item.process < item.target}"> {{item.process >= item.target?'已完成':'去完成'}}</strong>
            </div>
          </li>
        </ul>
        <p class="taskTips">*完成任務後，道具自動發放<br />*任務每天0點更新</p>
      </div>
    </div>
  </div>

</template>

<script>
import { mapState } from "vuex"
import getDate from "../utils/getDate"
import Luck from "./Luck"
export default {
  components: { Luck },
  computed: {
    ...mapState(['islands', 'activity']),
    openLand () {
      return this.activity.vol ? this.islands[this.activity.vol - 1] : {}
    },
    openTm () {
      return getDate(new Date(this.openLand.stime * 1000), 1) + '-' + getDate(new Date(this.openLand.etime * 1000), 1)
    }
  }
}
</script>

<style lang="scss">
.landTask {
  width: 7.34rem;
  height: 9.53rem;
  background: url(../img/taskBg.png);
  background-size: 100% 100%;
  margin: 0.25rem auto 0;
  padding-top: 0.13rem;
  .landCon {
    width: 7.05rem;
    height: 8.15rem;
    background: url(../img/taskBgColor.png);
    background-size: 100% 100%;
    margin: 0 auto;
    position: relative;
    padding-top: 1.23rem;
    .landName {
      width: 3.5rem;
      height: 1.03rem;
      background: url(../img/landName.png);
      background-size: 100% 100%;
      position: absolute;
      left: 1.78rem;
      top: -0.06rem;
      text-align: center;
      line-height: 1.3rem;
    }
    .openTm {
      font-size: 0.28rem;
      color: #A36E41;
      text-align: center;
    }
    .taskList {
      width: 6.8rem;
      margin: 0.15rem auto 0;
      li {
        height: 1.58rem;
        background: url(../img/taskItem.png);
        background-size: 100% 100%;
        margin-bottom: 0.07rem;
        display: flex;
        align-items: center;
        padding: 0 0.18rem;
        .msg {
          width: 4.5rem;
          .tName {
            color: #652F00;
            font-size: 0.28rem;
          }
          .gift {
            color: #E98834;
            font-size: 0.26rem;
            margin-top: 0.12rem;
          }
        }
        .status {
          text-align: center;
          margin-left: 0.3rem;
          em {
            font-size: 0.24rem;
            color: #E98834;
            white-space: nowrap;
          }
          strong {
            display: block;
            width: 1.58rem;
            height: 0.67rem;
            background: url(../img/notGet.png);
            background-size: 100% 100%;
            font-size: 0.28rem;
            line-height: 0.67rem;
            &.act {
              color: #A4261C;
              background: url(../img/get.png);
              background-size: 100% 100%;
            }
          }
        }
      }
    }
    .taskTips {
      text-align: center;
      color: #A36E41;
      font-size: 0.26rem;
      margin-top: 0.15rem;
    }
  }
}
</style>