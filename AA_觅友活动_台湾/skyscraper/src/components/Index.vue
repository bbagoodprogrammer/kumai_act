<template>
  <div class="page pageIndex">
    <div class="header">
      <RoolMsg />
      <div class="cloud"></div>
      <div class="floor" :class="['level_' + 3]"></div>
      <div class="userMsg">
        <img v-lazy="'aaaa'" alt="" class="av">
        <div class="msg">
          <div class="nick">行行行行行行行</div>
          <div class="floorName">的空地</div>
        </div>
      </div>
      <div class="fans_list">
        <img v-lazy="" alt="" v-for="(item,index) in 3" :key="index">
      </div>
    </div>
    <UserTaskScore />
    <Rank />
    <Footer />
    <!-- 升级弹窗 -->
    <div class="mask" v-show="showLvUp">
      <transition name="slide">
        <div class="lvUp" v-show="showLvUp">
          <div class="title">你的大樓升級啦！</div>
          <img :src="require('../img/leUp_floor/floor_2.png')" alt="">
          <p class="tips">恭喜你的大樓已經升級到【摩天大樓】<br />獎勵xxx,xxxx,xxx</p>
          <div class="ok" @click="showLvUp = false">
            開心收下
          </div>
        </div>
      </transition>
    </div>

    <!-- 粉丝榜 -->
    <div class="mask" v-show="showFasRank">
      <transition name="slide" v-show="showFasRank">
        <div class="fansRank">
          <div class="title">【 <strong>xxxxx</strong> 】的粉絲榜</div>
          <div class="f_list">
            <div class="listHeader">
              <span class="f_rank">排名</span>
              <span class="user">用戶</span>
              <span class="score">貢獻值</span>
            </div>
            <ul>
              <li v-for="(item,index) in list" :key="index" :class="{act:index%2 == 0}">
                <span class="f_rank">{{item.rank}}</span>
                <span class="user"><img v-lazy="item.avatar" alt=""><strong>{{item.nick}}</strong> </span>
                <span class="score">{{item.score}}</span>
              </li>
            </ul>
          </div>
          <div class="fans_tips">
            *總xx值為粉絲對同一名主播所貢獻的xx值綜合，榜
            單顯示前20名粉絲
          </div>
          <div class="goRoom">進入主播房間</div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import UserTaskScore from "./UserTaskScore"
import Rank from "./Rank"
import Footer from "./Footer"
import RoolMsg from "./RoolMsg"
export default {
  components: { UserTaskScore, Rank, Footer, RoolMsg },
  data () {
    return {
      showLvUp: false,
      showFasRank: false,
      list: [
        {
          rank: 1,
          avatar: '',
          nick: '的的顶顶顶顶顶的的顶顶顶顶顶',
          score: '99'
        },
        {
          rank: 1,
          avatar: '',
          nick: '的的顶顶顶顶顶',
          score: '99'
        },
        {
          rank: 1,
          avatar: '',
          nick: '的的顶顶顶顶顶',
          score: '99'
        }
      ]
    }
  },
  created () {
    setTimeout(() => {
      this.vxc('setRoolMsg', [
        {},
        {},
        {},
        {},
        {},
      ])
    }, 1000)
  }
}
</script>

<style lang="scss">
.pageIndex {
  .header {
    height: 10.97rem;
    position: relative;
    .cloud {
      width: 6.02rem;
      height: 4.95rem;
      background: url(../img/cloud.png);
      background-size: 100% 100%;
      position: absolute;
      top: 3.5rem;
      left: 0.88rem;
      z-index: 2;
    }
    .floor {
      width: 3.92rem;
      height: 8.98rem;
      position: absolute;
      top: 1.81rem;
      left: 1.81rem;

      &.level_1 {
        background: url(../img/floor/level_1.png);
        background-size: 100% 100%;
      }
      &.level_2 {
        background: url(../img/floor/level_2.png);
        background-size: 100% 100%;
      }
      &.level_3 {
        background: url(../img/floor/level_3.png);
        background-size: 100% 100%;
      }
      &.level_4 {
        background: url(../img/floor/level_4.png);
        background-size: 100% 100%;
      }
    }
    .userMsg {
      width: 2.05rem;
      height: 0.82rem;
      background: url(../img/userBg.png);
      background-size: 100% 100%;
      position: absolute;
      top: 3.07rem;
      left: 0.4rem;
      padding-left: 0.73rem;
      z-index: 3;
      .av {
        width: 0.95rem;
        height: 0.95rem;
        border-radius: 50%;
        position: absolute;
        left: -0.22rem;
        top: -0.07rem;
      }
      .msg {
        height: 100%;
        margin-left: 0.2rem;
        > div {
          height: 50%;
        }
        .nick {
          max-width: 1.63rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 0.28rem;
        }
        .floorName {
          font-size: 0.26rem;
        }
      }
    }
    .fans_list {
      width: 0.88rem;
      height: 2.01rem;
      padding-top: 0.4rem;
      position: relative;
      top: 4.29rem;
      left: 0.23rem;
      z-index: 3;
      img {
        width: 0.59rem;
        height: 0.59rem;
        margin: 0 auto 0.07rem;
      }
    }
  }
  .lvUp {
    width: 5.55rem;
    height: 5.71rem;
    background: url(../img/lvUp.png);
    background-size: 100% 100%;
    .title {
      height: 0.89rem;
      text-align: center;
      line-height: 0.89rem;
      color: rgba(11, 66, 117, 1);
      font-weight: 600;
    }
    > img {
      width: 3.98rem;
      height: 2.64rem;
      margin: 0 auto;
    }
    .tips {
      font-size: 0.28rem;
      padding: 0 0.3rem;
      text-align: center;
      margin-top: 0.28rem;
    }
    .ok {
      width: 2.05rem;
      height: 0.75rem;
      background: url(../img/ok.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.75rem;
      font-size: 0.28rem;
      color: rgba(39, 26, 118, 1);
      margin: 0.2rem auto 0;
    }
  }

  .fansRank {
    width: 4.7rem;
    height: 7.15rem;
    background: url(../img/fans_rankBg.png);
    background-size: 100% 100%;
    text-align: center;
    padding-bottom: 0.15rem;
    .title {
      height: 0.6rem;
      align-items: center;
      display: flex;
      justify-content: center;
      color: rgba(11, 66, 117, 1);
      font-weight: 600;
      strong {
        display: block;
        max-width: 1.5rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .f_list {
      text-align: center;
      .f_rank,
      .score {
        width: 1rem;
      }
      .user {
        width: 2.8rem;
        display: flex;
        align-items: center;
        img {
          width: 0.42rem;
          height: 0.42rem;
          border-radius: 50%;
          margin-right: 0.01rem;
        }
        strong {
          font-size: 0.22rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin-left: 0.15rem;
        }
      }
      .listHeader {
        font-size: 0.22rem;
        color: rgba(11, 66, 117, 1);
      }
      .listHeader,
      li {
        height: 0.69rem;
        display: flex;
        align-items: center;
        font-size: 0.22rem;
      }
      ul {
        height: 4.15rem;
        overflow-y: scroll;
        li {
          background: rgba(20, 76, 128, 0.13);
          &.act {
            background: rgba(20, 76, 128, 0.03);
          }
        }
      }
    }
    .fans_tips {
      font-size: 0.22rem;
      color: rgba(39, 26, 118, 1);
      padding: 0 0.25rem;
      text-align: left;
      margin-top: 0.1rem;
    }
    .goRoom {
      width: 2.5rem;
      height: 0.75rem;
      background: url(../img/goRoom.png);
      background-size: 100% 100%;
      margin: 0.19rem auto 0;
      text-align: center;
      line-height: 0.75rem;
      font-size: 0.28rem;
      color: rgba(39, 26, 118, 1);
    }
  }
  img {
    display: block;
    width: 100%;
  }
}
</style>