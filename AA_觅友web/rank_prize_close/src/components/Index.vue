<template>
  <div class="page pageIndex">
    <div class="app_top" :style="{background:'#7A68F8',height:navigatorHeight}"></div>
    <!-- <div class="top_bg"></div> -->
    <div class="propsList" :style="{paddingTop:navigatorHeight2}">
      <div class="prizeTips">
        {{lang.prizeTips}}
      </div>
      <div class="title">
        <i class="left"></i>
        {{lang.tips_title1}}
        <i class="right"></i>
      </div>
      <ul class="rank_prizeList">
        <li v-for="(item,index) in prize" :key="index">
          <div class="prizeMsg">
            <div class="title">{{topNums[index]}}</div>
            <div class="prize_name">{{`${item.name1}${item.name2?`&${item.name2}`:''}`}}</div>
          </div>
          <div class="prizeImg">
            <img :src="item.url1" alt="">
            <img :src="item.url2" alt="" v-if="item.url2">
          </div>
        </li>
      </ul>
      <div class="title">
        <i class="left"></i>
        {{lang.tips_title2}}
        <i class="right"></i>
      </div>
      <div class="rankPeople">
        <ul>
          <li v-for="(item,index) in ulist" :key="index" :class="'rank' + index">
            <div class="userRank"></div>
            <div class="crown"></div>
            <div class="userLeft">
              <img :src="item.user1.avatar" alt="">
              <div class="userMsg">
                <div class="nick">{{item.user1.nick}}</div>
                <div class="sex" :class="{woman:item.user1.sex == 1}"></div>
              </div>
            </div>
            <div class="userRight">
              <img :src="item.user2.avatar" alt="">
              <div class="userMsg">
                <div class="nick">{{item.user2.nick}}</div>
                <div class="sex" :class="{woman:item.user2.sex == 1}"></div>
              </div>
            </div>
            <div class="disparityTips" v-if="index!= 0">
              {{lang.disparityTips}}:{{item.preScore}}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

import { getLangHtml, getTimeObj, getUrlString, getAppVer, getPlatform } from "../utils";
import { setFullScreen, setStatusBarStyle, getStatusBarHeight, callAppNew } from '../utils/navigation';
import { mapState } from "vuex"
import { getInitInfo } from "../apis"
export default {
  data () {
    return {
      navigatorHeight: 0,
      navigatorHeight2: 0,
      //   topNums: {
      //     1: '第一名',
      //     2: '第二名',
      //     3: '第三名'
      //   }
    }
  },
  computed: {
    ...mapState(['prize', 'ulist']),
    topNums () {
      return this.lang.topNums
    }
  },
  mounted () {
    setTimeout(() => {
      const pt = getPlatform();
      const ver = getAppVer();
      if ((pt == 'ios' && ver >= 165) || pt == 'android') {
        setFullScreen(true);
        //  - document.getElementsByClassName('tab')[0].clientHeight
        this.navigatorHeight = getStatusBarHeight() + 'px';
        this.navigatorHeight2 = getStatusBarHeight() * 1 + 14 + 'px';
      }
    }, 200)
  },

  methods: {
  }
}
</script>

<style lang="scss">
.pageIndex {
  background: rgba(122, 104, 248, 1);
  padding-bottom: 0.5rem;
  .app_top {
    width: 100%;
    z-index: 5;
    &.app_top_fit {
      position: fixed;
      background-color: #10093C;
    }
  }
  img {
    display: block;
    width: 100%;
  }
  .propsList {
    .prizeTips {
      padding: 0.7rem 0.35rem 0;
      font-size: 0.32rem;
      color: rgba(255, 255, 255, 0.6);
      line-height: 0.45rem;
      text-align: center;
    }
    > .title {
      font-size: 0.36rem;
      font-weight: bold;
      height: 0.5rem;
      margin: 0.6rem auto 0;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        width: 0.3rem;
        height: 0.2rem;
        background: url(../img/titleIcon.png);
        background-size: 100% 100%;
        &.left {
          margin-right: 0.3rem;
        }
        &.right {
          margin-left: 0.3rem;
        }
      }
    }
    .rank_prizeList {
      width: 6.9rem;
      margin: 0.3rem auto 0;
      li {
        height: 1.55rem;
        background: #FFFFFF;
        border-radius: 0.2rem;
        margin-bottom: 0.2rem;
        display: flex;
        align-items: center;
        .prizeMsg {
          width: 2.95rem;
          font-size: 0.32rem;
          margin-left: 0.2rem;
          .title {
            color: #2C2B36;
            font-size: 0.32rem;
          }
          .prize_name {
            font-size: 0.24rem;
            color: #8C8995;
            line-height: 0.33rem;
          }
        }
        .prizeImg {
          height: 100%;
          margin-left: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          img {
            width: 1.4rem;
            height: 1.4rem;
          }
        }
      }
      li:last-child {
        margin-bottom: 0;
      }
    }
  }
  .rankPeople {
    width: 6.9rem;
    height: 6.32rem;
    background: #FFFFFF;
    border-radius: 0.2rem;
    margin: 0.3rem auto 0;
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        &.rank0 {
          width: 100%;
          height: 2.25rem;
          padding-top: 0.84rem;
          position: relative;
          display: flex;
          align-items: center;
          //   justify-content: center;
          .userRank {
            width: 0.7rem;
            height: 0.7rem;
            background: url(../img/top1.png);
            background-size: 100% 100%;
            position: absolute;
            top: 0.44rem;
            left: 1.31rem;
          }
          .crown {
            width: 0.8rem;
            height: 0.8rem;
            background: url(../img/top1_crown.png);
            background-size: 100% 100%;
            position: absolute;
            top: 0.21rem;
            left: 2.99rem;
          }
          .userLeft,
          .userRight {
            position: relative;
            z-index: 10;
            img {
              width: 1.7rem;
              height: 1.7rem;
              box-sizing: border-box;
              border: 0.02rem solid #FFDB19;
              border-radius: 50%;
            }
            .userMsg {
              width: 110%;
              height: 0.45rem;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 0.32rem;
              color: #2C2B36;
              margin-top: 0.1rem;
              .nick {
                max-width: 1.1rem;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
              .sex {
                width: 0.3rem;
                height: 0.3rem;
                background: url(../img/man.png);
                background-size: 100% 100%;
                margin-left: 0.1rem;
                &.woman {
                  background: url(../img/woman.png);
                  background-size: 100% 100%;
                }
              }
            }
          }
          .userLeft {
            margin-left: 1.9rem;
            .userMsg {
              margin-left: -0.3rem;
            }
          }
          .userRight {
            margin-left: -0.44rem;
            .userMsg {
              margin-left: 0.1rem;
            }
          }
        }
        &.rank0::before {
          content: '';
          display: block;
          width: 4rem;
          height: 2.62rem;
          background: url(../img/flower.png);
          background-size: 100% 100%;
          position: absolute;
          left: 1.38rem;
          top: 0;
        }
        &.rank1,
        &.rank2 {
          flex: 1;
          height: 3.23rem;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          .userRank {
            width: 0.7rem;
            height: 0.7rem;
            background: url(../img/top1.png);
            background-size: 100% 100%;
            position: absolute;
            top: 0.15rem;
            left: 0.14rem;
          }
          .crown {
            width: 0.5rem;
            height: 0.5rem;
            background: url(../img/top1_crown.png);
            background-size: 100% 100%;
            position: absolute;
            top: 0.48rem;
            right: 0.45rem;
          }
          .userLeft,
          .userRight {
            position: relative;
            z-index: 10;
            img {
              width: 1.4rem;
              height: 1.4rem;
              box-sizing: border-box;
              border: 0.02rem solid #FFDB19;
              border-radius: 50%;
            }
            .userMsg {
              width: 110%;
              height: 0.45rem;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 0.32rem;
              color: #2C2B36;
              margin-top: 0.1rem;
            }
            .nick {
              max-width: 1rem;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .sex {
              width: 0.3rem;
              height: 0.3rem;
              background: url(../img/man.png);
              background-size: 100% 100%;
              margin-left: 0.1rem;
              &.woman {
                background: url(../img/woman.png);
                background-size: 100% 100%;
              }
            }
          }
          .userLeft {
            .userMsg {
              margin-left: -0.4rem;
            }
          }
          .userRight {
            margin-left: -0.34rem;
            .userMsg {
              margin-right: -0.5rem;
            }
          }
          .disparityTips {
            width: 100%;
            text-align: center;
            font-size: 0.24rem;
            color: #8C8995;
            position: absolute;
            bottom: 0.26rem;
          }
        }
        &.rank1 {
          .userRank {
            background: url(../img/top2.png);
            background-size: 100% 100%;
          }
          .crown {
            background: url(../img/top2_crown.png);
            background-size: 100% 100%;
          }
          .userLeft,
          .userRight {
            img {
              border: 0.02rem solid #C2D3FF;
            }
          }
        }
        &.rank2 {
          margin-left: 0.25rem;
          .userRank {
            background: url(../img/top3.png);
            background-size: 100% 100%;
          }
          .crown {
            background: url(../img/top3_crown.png);
            background-size: 100% 100%;
          }
          .userLeft,
          .userRight {
            img {
              border: 0.02rem solid #C2D3FF;
            }
          }
        }
      }
    }
  }
}
// .top_bg {
//   width: 100%;
//   overflow: hidden;
//   height: 4.4rem;
//   position: absolute;
//   top: 0;
//   z-index: -1;
// }
// .top_bg::after {
//   content: '';
//   width: 120%;
//   height: 4.4rem;
//   position: absolute;
//   left: -10%;
//   top: 0;
//   z-index: -1;
//   border-radius: 0 0 60% 60%;
//   background: #7A68F8;
// }
</style>