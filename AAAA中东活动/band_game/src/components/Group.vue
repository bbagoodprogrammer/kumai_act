<template>
  <div class="grounpRank">
    <ul>
      <li v-for="(item,index) in groupRank" :key="index" :class="'rank' + item.rank">
        <div class="itemTop">
          <div class="rank">{{item.rank}}</div>
          <div class="imgBox" @click="goGroup(item.rid)">
            <div class="imgBg"></div>
            <img v-lazy="item.pic_url" alt="" class="userImg">
          </div>
          <div class="userBox">
            <div class="name">{{item.rname}}</div>
            <div class="uid">{{item.rid}}</div>
          </div>
          <div class="score">
            <i></i><em>{{item.score}}</em>
          </div>
        </div>
        <div class="itemBottom">
          <div class="roomPropleNum">
            <i></i>
            <em>{{item.online_counts}}</em>
          </div>
          <div class="scorePeop">
            <span v-for="(item2,index2) in item.room_user_rank" :key="index2" @click.stop="goPeople(item2.uid)">
              <span class="imgBg" v-if="index2 == 0"></span>
              <img :src="item2.avatar" alt="">
            </span>
          </div>
          <div class="moreTips"></div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import api from "../api/apiConfig"
export default {
  data() {
    return {
      isMore: true,
      loaded: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  computed: {
    ...mapState(['groupRank'])
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll)
  },
  methods: {
    goGroup(rid) {
      location.href = `rid:${rid}`
    },
    goPeople(uid) {
      location.href = `uid:${uid}`
    },
    onScroll() {
      if (this.isMore) {
        const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100
        if (scrollToBottom && !this.loaded) { //加載更多
          this.isMore = false
          api.grounpRank(this.groupRank.length).then((res) => {
            this.isMore = true
            var newArr = res.data.response_data.rank
            if (newArr.length > 0) {
              this.$store.commit('addGroupRank', newArr)  //排行榜
            } else if (newArr.length == 0 && this.groupRank.length > 5) {
              this.loaded = true
            }
          })
        }
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.grounpRank {
  padding-bottom: 2rem;
}
ul {
  margin-top: 0.23rem;
  padding: 0 0.2rem;
  li {
    width: 7.1rem;
    height: 2.56rem;
    background: url(../assets/img/topItemBg.png);
    background-size: 100% 100%;
    margin-top: 0.15rem;
    .itemTop {
      height: 1.65rem;
      padding: 0 0.18rem;
      display: flex;
      align-items: center;
      .rank {
        width: 0.75rem;
        height: 0.65rem;
        text-align: center;
        line-height: 0.65rem;
        font-size: 120%;
        color: #00ff90;
        font-style: italic;
      }
      .imgBox {
        width: 1.56rem;
        height: 1.51rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 0.02rem 0 0.07rem;
        position: relative;
        .imgBg {
          width: 1.56rem;
          height: 1.51rem;
          position: absolute;
          top: 0;
          left: 0;
          background: url(../assets/img/listItemUserBg.png);
          background-size: 100% 100%;
        }
        .userImg {
          width: 1.2rem;
          height: 1.2rem;
          border-radius: 0.2rem;
          border: 0.02rem solid rgba(255, 246, 168, 1);
        }
      }
      .userBox {
        height: 0.8rem;
        width: 2.2rem;
        .name {
          height: 0.4rem;
          line-height: 0.4rem;
          max-width: 2.2rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .uid {
          height: 0.4rem;
          line-height: 0.4rem;
          color: #b59eff;
        }
      }
      .score {
        display: flex;
        align-items: center;
        margin-right: 0.37rem;
        color: #ffe6ab;
        i {
          width: 0.31rem;
          height: 0.36rem;
          background: url(../assets/img/huo.png);
          background-size: 100% 100%;
          margin-left: 0.15rem;
        }
      }
    }
    .itemBottom {
      height: 0.9rem;
      padding: 0 0.32rem;
      display: flex;
      align-items: center;
      .roomPropleNum {
        display: flex;
        align-items: center;
        i {
          display: block;
          width: 0.46rem;
          height: 0.39rem;
          margin-left: 0.15rem;
          background: url(../assets/img/roomPeopleNum.png);
          background-size: 100% 100%;
        }
        em {
          display: block;
          width: 0.7rem;
          font-size: 80%;
        }
      }
      .scorePeop {
        display: flex;
        width: 4.3rem;
        height: 0.72rem;
        margin-top: 0.15rem;
        > span {
          position: relative;
          margin-left: 0.07rem;
          .imgBg {
            position: absolute;
            top: -0.12rem;
            left: -0.025rem;
            display: block;
            width: 0.65rem;
            height: 0.72rem;
            background: url(../assets/img/peopleTop1.png);
            background-size: 100% 100%;
          }
          img {
            width: 0.6rem;
            height: 0.6rem;
            border: 0.01rem solid rgba(181, 158, 255, 1);
            border-radius: 50%;
          }
        }
        > span:first-child {
          margin-left: 0.25rem;
        }
      }
      .moreTips {
        width: 0.62rem;
        height: 0.16rem;
        background: url(../assets/img/moreTips.png);
        background-size: 100% 100%;
        margin-right: 0.32rem;
      }
    }
    &.rank1 {
      background: url(../assets/img/top1Bg.png);
      background-size: 100% 100%;
      .itemTop {
        .rank {
          background: url(../assets/img/rank1.png);
          background-size: 100% 100%;
          text-indent: -999rem;
        }
        .imgBg {
          background: url(../assets/img/listTop1.png);
          background-size: 100% 100%;
        }
      }
    }
    &.rank2 {
      background: url(../assets/img/top2Bg.png);
      background-size: 100% 100%;
      .itemTop {
        .rank {
          background: url(../assets/img/rank2.png);
          background-size: 100% 100%;
          text-indent: -999rem;
        }
        .imgBg {
          background: url(../assets/img/listTop2.png);
          background-size: 100% 100%;
        }
      }
    }
    &.rank3 {
      background: url(../assets/img/top2Bg.png);
      background-size: 100% 100%;
      .itemTop {
        .rank {
          background: url(../assets/img/rank3.png);
          background-size: 100% 100%;
          text-indent: -999rem;
        }
        .imgBg {
          background: url(../assets/img/listTop3.png);
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>
