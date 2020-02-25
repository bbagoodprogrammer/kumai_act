<template>
  <div class="rank">
    <div class="rankTitle">
      <span class="topTips"></span>
      <em>感恩排行榜</em>
      <span class="quset" @click="showRankTipsPup()"></span>
    </div>
    <ul class="rankList">
      <li v-for="(item,index) in rank" :key="index" :class="'rank'+item.rank" @click="gpPeople(item.uid)">
        <span class="itemRank">{{item.rank}}</span>
        <div class="imgBox">
          <img v-lazy="item.avatar" alt="">
        </div>
        <div class="uerMsg">
          <div class="name">{{item.nick}}</div>
          <div class="uid">UID {{item.uid}}</div>
        </div>
        <div class="scoreBox">
          <div class="score"> <i>感恩值 : </i> <em>{{item.score}}</em> </div>
          <div class="giftItem">
            <span class="hear"> <i></i> {{item.charm_score}}</span>
            <span class="star"> <i></i> {{item.task_score}}</span>
          </div>
        </div>
      </li>
    </ul>
    <transition name="slide">
      <div class="rankTips" v-show="showRankTips">
        <div class="rankTipsCon">
          <span class="close" @click="closePup()"></span>
          <h5 class="title">活動排行攻略</h5>
          <p>1、按照報名參賽後，獲得的感恩值排名。感恩值=完成任務/助力好友/被好友助力獲得積分+作品/K房收到特定金幣禮物獲得的積分，10金幣魅力值=10積分</p>
          <p>2、報名後公開發佈的獨唱、合唱、MV、MV合唱作品收禮計入成績（清唱5分鐘收禮以及收錄作品收禮不計入）</p>
          <p>3、作品特定禮物為感恩信（10金幣）、火雞大餐（50金幣）；K房特定禮物為紅蘋果（10金幣）、幸運火雞（50金幣）</p>
          <p>4、若獲得的感恩值相同，則先到達該感恩值的排名在前面</p>
          <p>5、榜單展示前100名用戶的比賽成績</p>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import api from "../api/apiConfig"
export default {
  data() {
    return {
      showRankTips: false,
      isMore: true,   //加载更多
      loaded: false
    }
  },
  computed: {
    ...mapState(['rank'])
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll() {
      if (this.isMore) {
        const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100
        if (scrollToBottom && !this.loaded) { //加載更多
          this.isMore = false
          api.getRank(this.rank.length).then((res) => {
            this.isMore = true
            var newArr = res.data.response_data.rank
            if (newArr.length > 0) {
              this.$store.commit('addUserRank', newArr)  //排行榜
            } else if (newArr.length == 0 && this.rank.length > 20) {
              this.loaded = true
            }
          })
        }
      }
    },
    showRankTipsPup() {
      this.showRankTips = true
    },
    closePup() {
      this.showRankTips = false
    },
    gpPeople(uid) {
      location.href = `uid:${uid}`
    }
  }
}
</script>
<style lang="scss" scoped>
.rank {
  .rankTitle {
    display: flex;
    align-items: center;
    color: #ffd345;
    font-size: 133%;
    margin-top: 0.2rem;
    .topTips {
      display: block;
      width: 0.44rem;
      height: 0.41rem;
      margin: 0 0.09rem 0 0.31rem;
      background: url(../assets/img/topTitle.png);
      background-size: 100% 100%;
    }
    .quset {
      display: block;
      width: 0.4rem;
      height: 0.43rem;
      margin-left: 0.1rem;
      background: url(../assets/img/points.png);
      background-size: 100% 100%;
    }
  }
  .rankList {
    margin-top: 0.28rem;
    padding: 0 0.2rem;
    li {
      width: 7.1rem;
      height: 1.33rem;
      background: url(../assets/img/listItem.png);
      background-size: 100% 100%;
      margin-top: 0.1rem;
      display: flex;
      align-items: center;
      .itemRank {
        width: 0.75rem;
        line-height: 0.65rem;
        height: 0.65rem;
        color: #af3600;
        font-size: 120%;
        margin-left: 0.06rem;
        text-align: center;
      }
      .imgBox {
        width: 0.88rem;
        height: 0.88rem;
        img {
          width: 0.88rem;
          height: 0.88rem;
          border-radius: 50%;
          border: 0.02rem solid rgba(255, 232, 195, 1);
        }
      }
      .uerMsg {
        width: 2rem;
        height: 0.8rem;
        margin-left: 0.13rem;
        .name {
          height: 50%;
          line-height: 0.4rem;
          max-width: 2rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .uid {
          height: 50%;
          margin-top: 0.05rem;
          line-height: 0.4rem;
          font-size: 73%;
          color: #731a0f;
        }
      }
      .scoreBox {
        margin-left: 0.6rem;
        height: 0.8rem;
        .score {
          display: flex;
          align-items: center;
          color: #ffe897;
          i {
            font-size: 80%;
          }
          em {
            margin-left: 0.05rem;
            margin-top: -0.05rem;
            font-size: 110%;
          }
        }
        .giftItem {
          width: 2.5rem;
          margin-top: 0.15rem;
          display: flex;
          color: #ffe0aa;
          font-size: 80%;
          .hear {
            display: flex;
            align-items: center;
            width: 1.4rem;
            i {
              display: block;
              width: 0.34rem;
              height: 0.3rem;
              margin-right: 0.1rem;
              background: url(../assets/img/heart.png);
              background-size: 100% 100%;
            }
          }
          .star {
            display: flex;
            flex: 1;
            align-items: center;
            i {
              display: block;
              width: 0.3rem;
              height: 0.3rem;
              margin-right: 0.1rem;
              background: url(../assets/img/star.png);
              background-size: 100% 100%;
            }
          }
        }
      }
      &.rank1 {
        background: url(../assets/img/top1Bg.png);
        background-size: 100% 100%;
        .itemRank {
          background: url(../assets/img/rank1.png);
          background-size: 100% 100%;
          text-indent: -999rem;
        }
      }
      &.rank2 {
        background: url(../assets/img/top2Bg.png);
        background-size: 100% 100%;
        .itemRank {
          background: url(../assets/img/rank2.png);
          background-size: 100% 100%;
          text-indent: -999rem;
        }
      }
      &.rank3 {
        background: url(../assets/img/top2Bg.png);
        background-size: 100% 100%;
        .itemRank {
          background: url(../assets/img/rank3.png);
          background-size: 100% 100%;
          text-indent: -999rem;
        }
      }
    }
  }
  .rankTips {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 10000;
    background: rgba(0, 0, 0, 0.8);
    .rankTipsCon {
      width: 5.71rem;
      // height: 4.77rem;
      padding: 0.33rem 0.21rem 0.33rem;
      background: rgba(243, 114, 110, 1);
      border: 0.04rem solid rgba(247, 185, 169, 1);
      border-radius: 0.1rem;
      position: absolute;
      left: 50%;
      top: 40%;
      transform: translate(-50%, -40%);
      .title {
        font-size: 120%;
        text-align: center;
      }
      p {
        font-size: 80%;
        margin-top: 0.15rem;
      }
      .close {
        display: block;
        width: 0.71rem;
        height: 0.71rem;
        background: url(../assets/img/close.png);
        background-size: 100% 100%;
        position: absolute;
        bottom: -1.5rem;
        left: 50%;
        transform: translate(-50%, 0);
      }
    }
  }
}
</style>
