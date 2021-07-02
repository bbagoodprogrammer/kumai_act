<template>
  <div class="rank">
    <div class="rankLiner">
      <div class="linerBg"></div>
      <div class="liner">
        <span v-for="(item,index) in rank" :key="index" :class="'line' + index" :style="{width:item.score / totalScore * 100+'%'}"></span>
      </div>
    </div>
    <div class="rankScore">
      <span v-for="(item,index) in rank" :key="index" :class="'score' + index">
        {{item.name}}:{{item.score}}
      </span>
    </div>
    <div class="list">
      <div class="listTop1">
        <div class="top1Item" v-for="(item,index) in list_top1" :key="index" :class="'top1_'+index">
          <div class="name">{{item.name}} 戰隊</div>
          <div class="imgBox">
            <img v-lazy="item.user.avatar" alt="">
          </div>
          <div class="medals">
            <img :src="item.url" alt="" v-for="(item,index) in item.user.medals" :key="index">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapState } from "vuex"
export default {
  computed: {
    ...mapState(['rank']),
    totalScore () {
      let score = 0
      for (let item in this.rank) {
        score += this.rank[item].score
      }
      return score
    },
    list_top1 () {
      let list = []
      for (let item in this.rank) {
        list.push({
          name: this.rank[item].name,
          user: this.rank[item].list[0] ? this.rank[item].list[0] : {}
        })
      }
      return list
    },

  }
}
</script>

<style lang="scss">
.rank {
  margin-top: 0.35rem;
  .rankLiner {
    width: 7.13rem;
    height: 0.37rem;
    margin: 0 auto;
    position: relative;
    .linerBg {
      width: 7.13rem;
      height: 0.37rem;
      background: url(../img/rankLiner.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
    .liner {
      //   width: 6.6rem;
      height: 100%;
      margin-left: 0.35rem;
      border-radius: 0 0.3rem 0.3rem 0;
      overflow: hidden;
      display: flex;
      span {
        height: 100%;
        &.line0 {
          background: url(../img/color1.png);
          background-size: auto 100%;
        }
        &.line1 {
          background: url(../img/color2.png);
          background-size: auto 100%;
        }
        &.line2 {
          background: url(../img/color3.png);
          background-size: auto 100%;
        }
      }
    }
  }
  .rankScore {
    font-size: 0.24rem;
    display: flex;
    align-items: center;
    margin-top: 0.15rem;
    span {
      flex: 1;
      text-align: center;
      &.score0 {
        color: #C43039;
      }
      &.score1 {
        color: #C98B2D;
      }
      &.score2 {
        color: #47AD97;
      }
    }
  }
  .list {
    .listTop1 {
      height: 4.6rem;
      display: flex;
      .top1Item {
        width: 2.57rem;
        height: 4.16rem;

        &.top1_0 {
          background: url(../img/top1.png);
          background-size: 100% 100%;
        }
        &.top1_1 {
          background: url(../img/top2.png);
          background-size: 100% 100%;
        }
        &.top1_2 {
          background: url(../img/top3.png);
          background-size: 100% 100%;
        }
      }
      .name {
        width: 2.22rem;
        height: 0.5rem;
        margin: 0.21rem 0 0 0.18rem;
        background: url(../img/rankName.png);
        background-size: 100% 100%;
        text-indent: 0.18rem;
        font-size: 0.26rem;
        line-height: 0.5rem;
      }
      .imgBox {
        width: 1.63rem;
        height: 1.63rem;
        background: url(../img/avBg.png);
        background-size: 100% 100%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 50%;
        }
      }
      .medals {
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 0.45rem;
          height: 0.45rem;
        }
      }
    }
  }
}
</style>