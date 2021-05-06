<template>
  <div class="user_actMsg">
    <div class="linerBox">
      <span class="tips">建設進度：</span>
      <div class="liner">
        <i class="actLiner" :style="{width:(userLv -1) * 33 +'%'}"></i>
        <span v-for="(item,index) in 4" :key="index" :class="'floor' + item" @click="showFcard(item)">
          <img :src="require(`../img/bar_floor/lv${item}.png`)" alt="">
        </span>
      </div>
    </div>
    <div class="tasks">
      <div class="taskHeader">
        <span class="name">任務</span>
        <span class="score">對應積分</span>
        <span class="limt">積分上限</span>
        <span class="bar">進度</span>
      </div>
      <ul>
        <li v-for="(item,index) in task" :key="index">
          <span class="name">{{item.desc}}</span>
          <span class="score">{{item.score}}</span>
          <span class="limt">{{item.limet}}</span>
          <span class="bar">{{item.bar}}</span>
        </li>
      </ul>
    </div>
    <div class="user_score">
      <div class="dayScore">
        <div class="score"> 今日高度: <em>99999</em> </div>
        <div class="lastDay">較昨日 <span :class="{add:true}"><i></i>12%</span> </div>
      </div>
      <!-- 是主播展示  开播收礼 -->
      <div class="help">
        幫主播建樓
      </div>
    </div>
    <!-- 高楼介绍 -->
    <div class="mask" v-show="showFloorPup">
      <transition name="slide">
        <div class="floorCard" v-show="showFloorPup">
          <div class="title">xx酒店</div>
          <div class="needScore">
            所需高度：999999
          </div>
          <img :src="require('../img/default_floor/floor_2.png')" alt="">
          <div class="floor_tips">
            建筑介绍
          </div>
          <div class="giftList">
            <span v-for="(item,index) in 3 " :key="index">
              <div class="imgBg">
                <img src="" alt="">
              </div>
              <strong>xxxxx</strong>
            </span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userLv: 2,
      showFloorPup: false,
      task: {
        nums: {
          desc: '進房人數',
          score: '1人=1分',
          limet: '200',
          bar: '20/3'
        },
        gifts: {
          desc: '進房人數',
          score: '1人=1分',
          limet: '200',
          bar: '20/3'
        }
      }
    }
  },
  methods: {
    showFcard (item) {
      this.showFloorPup = true
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
    .taskHeader {
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
      margin-top: 0.1rem;
      padding: 0 0.35rem;
      li {
        display: flex;
        align-items: center;
        font-size: 0.26rem;
        color: rgba(4, 71, 144, 1);
        margin-bottom: 0.2rem;
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
      flex: 1;
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
    .help {
      width: 2.68rem;
      height: 0.98rem;
      text-align: center;
      line-height: 0.98rem;
      background: url(../img/help.png);
      background-size: 100% 100%;
      font-size: 0.32rem;
      color: rgba(39, 26, 118, 1);
      font-weight: 500;
    }
  }
}
.floorCard {
  width: 4.7rem;
  // height: 6.91rem;
  background: url(../img/floorMsg.png);
  background-size: 100% 100%;
  text-align: center;
  padding-bottom: 0.15rem;
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
    min-height: 1.47rem;
  }
  .giftList {
    padding: 0 0.56rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
        strong {
          display: block;
        }
      }
    }
  }
}
</style>