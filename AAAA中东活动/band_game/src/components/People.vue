<template>
  <div class="peopleRank">
    <ul>
      <li v-for="(item,index) in peopleRank" :key="index" :class="'rank' + item.rank" @click="goPeople(item.uid)">
        <div class="itemTop">
          <div class="rank">{{item.rank}}</div>
          <div class="imgBox">
            <div class="imgBg"></div>
            <img v-lazy="item.avatar" alt="" class="userImg">
          </div>
          <div class="userBox">
            <div class="name">{{item.nick}}</div>
            <div class="uid">{{item.uid}}</div>
          </div>
          <div class="score">
            <i></i><em>{{item.score}}</em>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from "vuex"
import api from "../api/apiConfig"
export default {
  data() {
    return {
      isMore: true,
      loaded: false
    }
  },
  computed: {
    ...mapState(['peopleRank'])
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll)
  },
  methods: {
    goPeople(uid) {
      location.href = `uid:${uid}`
    },
    onScroll() {
      if (this.isMore) {
        const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100
        if (scrollToBottom && !this.loaded) { //加載更多
          this.isMore = false
          api.getPeopleRank(this.peopleRank.length, 'more').then((res) => {
            this.isMore = true
            var newArr = res.data.response_data.rank
            if (newArr.length > 0) {
              this.$store.commit('addPeopleRank', newArr)  //排行榜
            } else if (newArr.length == 0 && this.peopleRank.length > 5) {
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
.peopleRank {
  padding-bottom: 2rem;
}
ul {
  margin-top: 0.23rem;
  padding: 0 0.2rem;
  li {
    width: 7rem;
    height: 0.98rem;
    background: url(../assets/img/peopleItem.png);
    background-size: 100% 100%;
    margin-top: 0.15rem;
    .itemTop {
      height: 0.98rem;
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
        width: 0.98rem;
        height: 0.95rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 0.02rem 0 0.07rem;
        position: relative;
        .imgBg {
          width: 0.98rem;
          height: 0.95rem;
          position: absolute;
          top: 0;
          left: 0;
          // background: url(../assets/img/listItemUserBg.png);
          // background-size: 100% 100%;
        }
        .userImg {
          width: 0.7rem;
          height: 0.71rem;
          border-radius: 0.2rem;
          border: 0.02rem solid rgba(255, 246, 168, 1);
        }
      }
      .userBox {
        height: 0.8rem;
        width: 2.6rem;
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
    &.rank1 {
      background: url(../assets/img/peopleItemTop1.png);
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
      background: url(../assets/img/peopleItemTop2.png);
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
      background: url(../assets/img/peopleItemTop2.png);
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
