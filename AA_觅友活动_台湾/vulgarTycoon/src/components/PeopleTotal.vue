<template>
  <div class="peopleTotal">
    <i class="vol">{{lang.volTips.replace('%v',activity.vol)}}</i>
    <div class="top1">
      <div class="imgBox">
        <img v-lazy="top1.uid?top1.avatar:require('../img/defaultAv.png')" alt="" @click="goUser(top1.uid)">
        <span class="dec"></span>
        <div class="top1Nick">{{top1.nick?top1.nick:lang.noNick}}</div>
      </div>
      <div class="scoreMsg">
        <div class="dayScore">
          <span class="scoreDesc"></span>
          <span class="nums">{{top1.score}}</span>
        </div>
        <div class="scoreNums">
          <span class="numsDesc"></span>
          <span class="nums two">{{top1.count}}</span>
        </div>
      </div>
    </div>
    <div class="todayTopMsg">
      <div class="title">{{lang.todayTitle}}<i @click="topDesc = true"></i></div>
      <div class="userList">
        <div class="userItem" v-for="(item,index) in userList" :key="index">
          <div class="imgBox" @click="goUser(item.uid)">
            <img v-lazy="item.avatar" alt="">
            <span class="avDesc" :class="{user:item.avatar}"></span>
          </div>
          <div class="nick">{{item.nick}}</div>
          <div class="scoreDec">{{lang.scoreName}}</div>
          <div class="score">{{item.score}}</div>
        </div>
      </div>
    </div>
    <div class="mask" v-show="topDesc">
      <transition name="slide">
        <div class="topDesc" v-show="topDesc">
          <i class="close" @click="topDesc =false"></i>
          {{lang.top3Tips}}
        </div>
      </transition>
    </div>
  </div>
</template>

<script>

import { mapState } from "vuex"
export default {
  data () {
    return {
      topDesc: false
    }
  },
  computed: {
    ...mapState(['days_top', 'activity', 'defaultTop1', 'rank']),
    top1 () {
      return this.days_top.uid ? this.days_top : this.defaultTop1
    },
    userList () {
      return this.rank.slice(0, 3)
    }
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
  }
}
</script>

<style lang="scss">
.peopleTotal {
  width: 6.69rem;
  height: 6.1rem;
  padding: 0 0.4rem 0 0.28rem;
  background: url(../img/peopleTotal.png);
  background-size: 100% 100%;
  margin: 0 auto;
  position: relative;
  .vol {
    width: 2.5rem;
    height: 0.4rem;
    line-height: 0.4rem;
    text-align: center;
    line-height: 0.4rem;
    font-size: 0.28rem;
    color: #713229;
    text-indent: 0.06rem;
    position: absolute;
    right: 0;
    top: 0.1rem;
  }
  .top1 {
    height: 2.55rem;
    display: flex;
    align-items: center;
    position: relative;

    .imgBox {
      width: 3.01rem;
      height: 2.28rem;
      position: relative;
      > img {
        width: 1.85rem;
        height: 1.85rem;
        border-radius: 50%;
        position: absolute;
        left: 0.55rem;
      }
      .dec {
        position: absolute;
        z-index: 2;
        display: block;
        width: 100%;
        height: 100%;
        background: url(../img/top1ImgBox.png);
        background-size: 100% 100%;
      }
      .top1Nick {
        width: 2.3rem;
        height: 0.35rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
        line-height: 0.35rem;
        position: absolute;
        z-index: 3;
        left: 0.4rem;
        bottom: 0.39rem;
      }
    }
    .scoreMsg {
      flex: 1;
      margin-top: 0.35rem;
      .dayScore,
      .scoreNums {
        display: flex;
        align-items: center;
        .nums {
          width: 1.84rem;
          height: 0.47rem;
          background: url(../img/nums1.png);
          background-size: 100% 100%;
          text-align: center;
          line-height: 0.47rem;
          font-weight: bold;
          margin-left: 0.14rem;
          text-shadow: #974711 1px 0 0, #974711 0 1px 0, #974711 -1px 0 0,
            #974711 0 -1px 0;
          &.two {
            width: 0.56rem;
            background: url(../img/nums2.png);
            background-size: 100% 100%;
          }
        }
      }
      .scoreNums {
        margin: 0.09rem 0 0 0.47rem;
      }
    }
  }
  .todayTopMsg {
    .title {
      font-size: 0.28rem;
      color: #FFE7B8;
      margin-top: 0.15rem;
      i {
        display: inline-block;
        width: 0.25rem;
        height: 0.25rem;
        background: url(../img/query.png);
        background-size: 100% 100%;
        margin-left: 0.07rem;
      }
    }
    .userList {
      margin-top: 0.15rem;
      padding: 0 0.45rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .userItem {
        width: 1.8rem;
        .imgBox {
          width: 1.45rem;
          height: 1.45rem;
          margin: 0 auto;
          position: relative;
          .avDesc {
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            background: url(../img/defaultAv.png);
            background-size: 100% 100%;
            &.user {
              background: url(../img/defaultAv_bor.png);
              background-size: 100% 100%;
            }
          }
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            position: absolute;
          }
        }
        .nick {
          width: 1.72rem;
          height: 0.41rem;
          font-size: 0.28rem;
          background: url(../img/nickBg.png);
          background-size: 100% 100%;
          text-align: center;
          line-height: 0.41rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin: 0.1rem auto 0;
        }
        .scoreDec {
          font-size: 0.22rem;
          color: #C76245;
          text-align: center;
          margin-top: 0.1rem;
        }
        .score {
          color: #FFD564;
          text-align: center;
          font-size: 0.28rem;
          margin-top: -0.06rem;
        }
      }
    }
  }
  .topDesc {
    width: 6.47rem;
    height: 1.83rem;
    background: url(../img/topDesc.png);
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #FFE7B8;
    position: relative;
    .close {
      width: 0.7rem;
      height: 0.7rem;
      background: url(../img/close.png);
      background-size: 100% 100%;
      position: absolute;
      top: -0.7rem;
      right: 0;
    }
  }
}
</style>