<template>
  <div class="rank">
    <div class="rankLiner">
      <div class="linerBg"></div>
      <div class="liner">
        <span v-for="(item,index) in rank" :key="index" :class="'line' + index" :style="{width:totalScore == 0?'33.3%':item.score / totalScore * 100+'%'}"></span>
      </div>
    </div>
    <div class="rankScore">
      <span v-for="(item,index) in rank" :key="index" :class="'score' + index">
        {{item.name}}:{{item.score}}
      </span>
    </div>
    <div class="list">
      <div class="listTop1">
        <div class="top1Item" v-for="(item,index) in list_top1" :key="index" :class="[{act:type == index},'top1_'+index]" @click="type = index">
          <i class="lead" v-if="rank[index].rank == 1"></i>
          <div class="name">{{item.name}} {{lang.rank_group}}</div>
          <div class="imgBox" @click="goUser(item.user.uid)">
            <img v-lazy="item.user.avatar" alt="">
          </div>
          <div class="nick">{{item.user.nick?item.user.nick:lang.empty}}</div>
          <div class="medals" v-if="item.user.uid">
            <img :src="item2.url" alt="" v-for="(item2,index) in item.user.medals" :key="index">
            <img :src="require(`../img/wealv/pro_level${getLevel(item.user.wealth_lv)}.png`)" alt="" v-if="item.user.wealth_lv" class="warLv">
          </div>
          <div class="score" v-if="item.user.uid">{{lang.rank_score}}:{{item.user.score}}</div>
          <div class="otherPeople">
            <i></i>
            <u>{{lang.rank_otherPeople}}</u>
          </div>
        </div>
      </div>
    </div>
    <p class="noData" v-if="!listItem.length">{{lang.noData}}</p>
    <div class="listRankItem" :class="'type' + type" v-show="listItem.length">
      <div class="listCon">
        <ul class="listrank">
          <li v-for="(item,index) in listItem" :key="index" :class="'rank'+item.rank">
            <div class="userRank">{{item.rank}}</div>
            <div class="imgBox" @click="goUser(item.uid)">
              <img v-lazy="item.avatar" alt="">
            </div>
            <div class="nick">{{item.nick}}</div>
            <div class="score"><i></i><strong>{{item.score}}</strong></div>
          </li>
        </ul>
      </div>

    </div>
    <Footer :listItem="listItem" />
  </div>
</template>

<script>

import { mapState } from "vuex"
import Footer from "./Footer"

export default {
  components: { Footer },
  data () {
    return {
      type: 0
    }
  },
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
      console.log(list)
      return list
    },
    listItem () {
      return this.rank[this.type] ? this.rank[this.type].list.slice(1) : []
    },

  },
  methods: {
    goUser (uid) { //跳转
      var isiOS = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      if (isiOS) {
        sendJsData('app://userInfo?uid=' + uid);
      } else {
        javascript: JSInterface.sendJsData('app://userInfo?uid=' + uid);
      }
    },
    getLevel (_lv) {
      console.log(_lv)
      if (_lv > 0 && _lv < 10) {
        return '0'
      }
      if (_lv >= 10 && _lv < 20) {
        return '1'
      }
      if (_lv >= 20 && _lv < 30) {
        return '2'
      }
      if (_lv >= 30 && _lv < 40) {
        return '3'
      }
      if (_lv >= 40 && _lv < 50) {
        return '4'
      }
      if (_lv >= 50) {
        return '5'
      }
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
          background: url(../img/color3.png);
          background-size: auto 100%;
        }
        &.line2 {
          background: url(../img/color2.png);
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
    margin-top: 0.46rem;
    .listTop1 {
      height: 4.25rem;
      display: flex;
      .listTop1 {
        height: 4.5rem;
      }
      .top1Item {
        width: 2.57rem;
        height: 4.16rem;
        position: relative;
        &.top1_0 {
          background: url(../img/top1.png);
          background-size: 100% 100%;
          &.act {
            width: 2.77rem;
            height: 4.5rem;
            background: url(../img/top1_act.png);
            background-size: 100% 100%;
            position: relative;
            margin-top: -0.35rem;
          }
        }
        &.top1_1 {
          background: url(../img/top2.png);
          background-size: 100% 100%;
          margin-left: -0.15rem;
          &.act {
            width: 2.77rem;
            height: 4.5rem;
            background: url(../img/top2_act.png);
            background-size: 100% 100%;
            margin-top: -0.35rem;
          }
        }
        &.top1_2 {
          background: url(../img/top3.png);
          background-size: 100% 100%;
          margin-left: -0.15rem;
          &.act {
            width: 2.77rem;
            height: 4.5rem;
            background: url(../img/top3_act.png);
            background-size: 100% 100%;
            margin-top: -0.35rem;
          }
        }
        &.act {
          .name {
            width: 2.22rem;
            background: url(../img/rankName2.png);
            background-size: 100% 100%;
          }
          .imgBox {
            width: 1.63rem;
            height: 1.63rem;
            img {
              width: 1.5rem;
              height: 1.5rem;
            }
          }
        }
      }
      .name {
        width: 2.07rem;
        height: 0.5rem;
        margin: 0.21rem 0 0 0.22rem;
        background: url(../img/rankName.png);
        background-size: 100% 100%;
        text-indent: 0.18rem;
        font-size: 0.26rem;
        line-height: 0.5rem;
      }
      .imgBox {
        width: 1.33rem;
        height: 1.33rem;
        background: url(../img/avBg.png);
        background-size: 100% 100%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 1.2rem;
          height: 1.2rem;
          border-radius: 50%;
        }
      }
      .nick {
        font-size: 0.26rem;
        text-align: center;
      }
      .medals {
        padding: 0 0.4rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 0.1rem;
        img {
          width: 0.45rem;
          height: 0.45rem;
        }
        .warLv {
          width: 0.56rem;
          height: 0.3rem;
        }
      }
      .score {
        font-size: 0.26rem;
        color: #FFF5CB;
        text-align: center;
      }
      .otherPeople {
        width: 100%;
        height: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        position: absolute;
        bottom: -0.2rem;
        color: #AC9A49;
        font-size: 0.24rem;
        i {
          width: 0.36rem;
          height: 0.26rem;
          background: url(../img/arr.png);
          background-size: 100% 100%;
          margin-right: 0.1rem;
        }
      }
    }
  }
  .noData {
    text-align: center;
    margin-top: 0.3rem;
  }
  .listRankItem {
    position: relative;
    &.type0::before {
      content: '';
      display: block;
      width: 0.75rem;
      height: 0.49rem;
      background: url(../img/arrTop.png);
      background-size: 100% 100%;
      position: absolute;
      z-index: 10;
      top: -0.32rem;
      left: 0.38rem;
    }
    &.type1::before {
      content: '';
      display: block;
      width: 0.75rem;
      height: 0.49rem;
      background: url(../img/arrTop.png);
      background-size: 100% 100%;
      position: absolute;
      z-index: 10;
      top: -0.32rem;
      left: 2.8rem;
    }
    &.type2::before {
      content: '';
      display: block;
      width: 0.75rem;
      height: 0.49rem;
      background: url(../img/arrTop.png);
      background-size: 100% 100%;
      position: absolute;
      z-index: 10;
      top: -0.32rem;
      left: 5.2rem;
    }
  }
  .listCon {
    width: 6.74rem;
    height: 7.3rem;
    background: url(../img/listrank.png);
    background-size: 100% 100%;
    margin: 0 auto;
    padding: 0.2rem 0.2rem 0;
  }
  .listRankItem .listrank {
    height: 6.9rem;
    overflow-y: scroll;
    position: relative;
    li {
      height: 1.42rem;
      display: flex;
      align-items: center;
      position: relative;
      margin-bottom: 0.17rem;
      .userRank {
        width: 0.58rem;
        height: 0.61rem;
        margin-left: 0.25rem;
        color: #330D0E;
        text-align: center;
        line-height: 0.61rem;
      }
      .imgBox {
        width: 1.33rem;
        height: 1.33rem;
        background: url(../img/avBg.png);
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 0.16rem;
        img {
          width: 1.2rem;
          height: 1.2rem;
          border-radius: 50%;
        }
      }
      .nick {
        width: 2rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 0.32rem;
        color: #330D0E;
        margin-left: 0.13rem;
      }
      .score {
        display: flex;
        align-items: center;
        margin-left: 0.2rem;
        i {
          width: 0.44rem;
          height: 0.41rem;
          background: url(../img/scoreIcon.png);
          background-size: 100% 100%;
          margin-right: 0.04rem;
        }
        strong {
          font-size: 0.28rem;
          color: #A36749;
        }
      }
      &.rank2,
      &.rank3 {
        .userRank {
          background: url(../img/userRankBg.png);
          background-size: 100% 100%;
          text-indent: -999rem;
          position: relative;
        }
        .userRank::before {
          content: '';
          display: block;
          width: 0.33rem;
          height: 0.4rem;
          background: url(../img/2.png);
          background-size: 100% 100%;
          position: absolute;
          top: 0.09rem;
          left: 0.13rem;
        }
      }
      &.rank3 {
        .userRank::before {
          content: '';
          display: block;
          width: 0.33rem;
          height: 0.4rem;
          background: url(../img/3.png);
          background-size: 100% 100%;
          position: absolute;
          top: 0.09rem;
          left: 0.13rem;
        }
      }
    }
    li::before {
      content: '';
      width: 6.48rem;
      height: 0.17rem;
      background: url(../img/listItemLiner.png) no-repeat;
      background-size: 100% 100%;
      position: absolute;
      bottom: -0.17rem;
      left: 0.18rem;
    }
  }
}
</style>