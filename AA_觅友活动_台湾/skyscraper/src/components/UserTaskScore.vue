<template>
  <div class="is_anchor">
    <div class="user_actMsg">
      <div class="linerBox">
        <span class="tips">{{lang.task_title}}</span>
        <div class="liner">
          <i class="actLiner" :style="{width:(show_floorMsg.level) * 33 +'%'}"></i>
          <span v-for="(item,index) in 4" :key="index" :class="'floor' + item" @click="showFcard(item)">
            <img :src="require(`../img/bar_floor/lv${item}.png`)" alt="">
          </span>
        </div>
      </div>
      <div class="tasks">
        <div class="taskHeader">
          <span class="name">{{lang.task_name}}</span>
          <span class="score">{{lang.task_score}}</span>
          <span class="limt">{{lang.task_limt}}</span>
          <span class="bar" v-if="(is_anchor&& !owner_change.uid) || (owner_change.uid == owner.uid && is_anchor)">{{lang.bar}}</span>
        </div>
        <ul>
          <li v-for="(item,index) in task" :key="index">
            <span class="name">{{taskName[index].desc}}</span>
            <span class="score">{{taskName[index].score}}</span>
            <span class="limt">{{item.max?item.max:lang.noSet}}</span>
            <span class="bar"
              v-if="(is_anchor&& !owner_change.uid) || (owner_change.uid == owner.uid && is_anchor)">{{!item.max?item.score:item.score>=item.max?lang.task_doed:`${item.score}/${item.max}`}}</span>
          </li>
        </ul>
      </div>
      <div class="user_score">
        <div class="dayScore">
          <div class="score"> {{lang.dayScore}} <em>{{show_floorMsg.today_score}}</em> </div>
          <div class="lastDay">{{lang.last_nums}} <span :class="{add:show_floorMsg.diff && show_floorMsg.diff.indexOf('+') > -1}"><i></i>{{show_floorMsg.diff}}</span> </div>
        </div>
        <!-- 是主播展示  开播收礼 -->
        <div class="help" @click="goKroom()">
          {{(is_anchor&& !owner_change.uid) || (owner_change.uid == owner.uid && is_anchor) ?lang.help_msg1:lang.help_msg2}}
        </div>
      </div>
      <!-- 高楼介绍 -->
      <div class="mask" v-show="showFloorPup">
        <transition name="slide">
          <div class="floorCard" v-show="showFloorPup">
            <i class="close" @click="showFloorPup = false"></i>
            <div class="title">{{floorConfig[floor_pupItem].name}}</div>
            <div class="needScore">
              {{lang.need_height}} {{floorConfig[floor_pupItem].score}}
            </div>
            <img :src="require(`../img/default_floor/floor_${floor_pupItem + 1}.png`)" alt="">
            <div class="floor_tips">
              {{floorConfig[floor_pupItem].tips}}
            </div>
            <div class="giftList">
              <span v-for="(item,index) in floorConfig[floor_pupItem].gift " :key="index">
                <div class="imgBg">
                  <img :src="item.img" alt="">
                </div>
                <strong>{{item.name}}</strong>
              </span>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <!-- <div class="help not" v-else @click="goKroom('other')">
      幫主播建樓
    </div> -->
  </div>

</template>

<script>

import { mapState } from "vuex"
export default {
  props: ['floorConfig'],
  data () {
    return {
      showFloorPup: false,
      floor_pupItem: 0,
      //   taskName: [
      //     {
      //       desc: '進房人數',
      //       score: '1人=1分',
      //     },
      //     {
      //       desc: '收到指定禮物',
      //       score: '1金幣=1分',
      //     }
      //   ]
    }
  },
  computed: {
    ...mapState(['is_anchor', 'task', 'owner', 'owner_change']),
    show_floorMsg () {
      if (this.owner_change.uid) {
        return this.owner_change
      } else {
        return this.owner
      }
    },
    taskName () {
      return this.lang.taskName
    }
  },
  methods: {
    showFcard (item) {
      if (item == 1) {
        return
      }
      this.floor_pupItem = item - 1
      this.showFloorPup = true
    },
    goKroom (other) {
      var isiOS = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      let rid = this.show_floorMsg.rid
      console.log(rid)
      if (isiOS) {
        sendJsData('app://room?rid=' + rid);
      } else {
        javascript: JSInterface.sendJsData('app://room?rid=' + rid);
      }
    }
  }
}
</script>

<style lang="scss">
.user_actMsg {
  width: 7.25rem;
  height: 4.5rem;
  background: url(../img/userAct_msg.png);
  background-size: 100% 100%;
  margin: 0 auto;
  .linerBox {
    height: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .tips {
      font-size: 0.28rem;
      font-weight: 600;
      margin-right: 0.34rem;
    }
    .liner {
      width: 4.27rem;
      height: 0.27rem;
      background: url(../img/liner_bg.png);
      background-size: 100% 100%;
      position: relative;
      .actLiner {
        max-width: 98%;
        display: block;
        height: 0.13rem;
        background: #FFFDBA;
        box-shadow: 0 4px 5px 0 #FFFEEC, 0 -3px 5px 0 #F1BC5F;
        border-radius: 0.07rem;
        position: absolute;
        left: 0.07rem;
        top: 0.07rem;
      }
      span {
        position: absolute;
        top: -0.83rem;
        &.floor1 {
          left: -0.27rem;
        }
        &.floor2 {
          left: 1.11rem;
        }
        &.floor3 {
          left: 2.38rem;
        }
        &.floor4 {
          left: 3.69rem;
        }
        img {
          width: 0.79rem;
          height: 1.31rem;
        }
      }
    }
  }
  .tasks {
    width: 7.09rem;
    height: 1.98rem;
    background: url(../img/task_bg.png);
    background-size: 100% 100%;
    .taskHeader {
      height: 0.5rem;
      white-space: nowrap;
      display: flex;
      align-items: center;
      text-align: center;
      padding: 0 0.35rem;
      span {
        font-size: 0.22rem;
        color: rgba(208, 229, 254, 1);
      }
    }
    ul {
      padding: 0 0.35rem;
      li {
        height: 0.7rem;
        display: flex;
        align-items: center;
        font-size: 0.26rem;
        color: rgba(4, 71, 144, 1);
        span {
          text-align: center;
        }
      }
    }
    .name {
      width: 2.8rem;
      text-align: left;
    }
    .score {
      flex: 1.5;
    }
    .limt {
      flex: 1;
    }
    .bar {
      flex: 1;
    }
  }
  .user_score {
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
    .dayScore {
      width: 4rem;
      padding-left: 0.33rem;
      .score {
        em {
          font-weight: 600;
        }
      }
      .lastDay {
        height: 0.4rem;
        display: flex;
        align-items: center;
        color: rgba(199, 226, 253, 1);
        font-size: 0.24rem;
        span {
          display: flex;
          align-items: center;
          margin-left: 0.15rem;
          color: rgba(102, 255, 138, 1);
          font-size: 0.24rem;
          &.add {
            color: rgba(253, 240, 4, 1);
            i {
              background: url(../img/top.png);
              background-size: 100%;
            }
          }
          i {
            width: 0.16rem;
            height: 0.26rem;
            background: url(../img/down.png);
            background-size: 100%;
          }
        }
      }
    }
  }
}
.help {
  width: 2.28rem;
  padding: 0 0.2rem;
  height: 0.98rem;
  text-align: center;
  line-height: 0.98rem;
  background: url(../img/help.png);
  background-size: 100% 100%;
  font-size: 0.32rem;
  color: rgba(39, 26, 118, 1);
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0.28rem;
  &.not {
    margin: 0.2rem auto;
  }
}
.floorCard {
  width: 4.7rem;
  // height: 6.91rem;
  background: url(../img/floorMsg.png);
  background-size: 100% 100%;
  text-align: center;
  padding-bottom: 0.15rem;
  position: relative;
  .title {
    height: 0.63rem;
    line-height: 0.63rem;
    color: rgba(11, 66, 117, 1);
    font-weight: 500;
  }
  .needScore {
    font-size: 0.22rem;
  }
  > img {
    width: 4.21rem;
    height: 2.72rem;
    margin: 0.1rem auto 0;
  }
  .floor_tips {
    font-size: 0.27rem;
    min-height: 1.47rem;
    padding: 0 0.25rem;
    display: flex;
    align-items: center;
  }
  .giftList {
    padding: 0 0.56rem;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      width: 1.05rem;
      .imgBg {
        width: 1.05rem;
        height: 1.05rem;
        background: #4D8EE4;
        border-radius: 0.1rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      strong {
        width: 120%;
        margin-left: -0.125rem;
        height: 0.8rem;
        font-size: 0.22rem;
        display: block;
      }
    }
    span:nth-child(2),
    span:nth-child(3) {
      margin-left: 0.15rem;
    }
  }
}
</style>