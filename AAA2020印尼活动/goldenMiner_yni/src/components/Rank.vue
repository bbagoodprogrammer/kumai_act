<template>
  <div class="rankList">
    <div class="title">{{lang.rankTips1}}</div>
    <p v-if="rankList.length == 0" class="noData">{{lang.noDate}}</p>
    <ul class="scrollable">
      <li v-for="(item,index) in rankList" :key="index" :class="'rank'+item.rank" @click="goUser(item.uid)">
        <div class="rank">{{item.rank}}</div>
        <div class="imgBox">
          <div class="defaultImg"></div>
          <img v-lazy="item.avatar" alt="" class="userImg">
        </div>
        <div class="userMsg">
          <div class="name">{{item.nick}}</div>
          <div class="uid">{{item.uid}}</div>
        </div>
        <div class="score">{{lang.score}}<em>{{item.score}}</em> </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from "vuex"
import api from "../api/apiConfig"
import { globalBus } from '../utils/eventBus'
export default {
  data() {
    return {
      loaded: false,
      more: true
    }
  },
  computed: {
    ...mapState(['rankList'])
  },
  mounted() {
    this.scrollable = this.$el.querySelector('.scrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
    globalBus.$on('setLoader', (callback) => {
      this.loaded = false
    })
  },
  methods: {
    goUser(uid) {
      location.href = `uid:${uid}`
    },

    onScroll() {
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.loaded) return
        if (this.more) {
          this.more = false
          api.getRank(this.rankList.length, 'more').then(res => {
            this.more = true
            if (res.data.response_data.list.length === 0) {
              this.loaded = true
            } else {
              this.vxc('addRank', res.data.response_data.list)
            }
          })
        }
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.rankList {
  width: 7.19rem;
  height: 9.29rem;
  background: url(../assets/img/tabBg.png);
  background-size: 100% 100%;
  margin: 0.14rem auto;
  padding-top: 0.5rem;
  .title {
    text-align: center;
    color: #f58662;
    font-size: 0.24rem;
    font-weight: 600;
  }
  .noData {
    text-align: center;
    font-weight: 600;
    margin-top: 1.5rem;
    color: #fffeaf;
  }
  ul {
    width: 6.98rem;
    height: 8.1rem;
    margin: 0.35rem auto 0;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    -webkit-overflow-scrolling: auto;
    li {
      width: 6.98rem;
      height: 1.15rem;
      display: flex;
      align-items: center;
      background: url(../assets/img/defaultListBg.png);
      background-size: 100% 100%;
      margin-top: 0.11rem;
      .rank {
        width: 0.73rem;
        height: 0.65rem;
        margin-left: 0.11rem;
        text-align: center;
        line-height: 0.65rem;
        color: #fffeaf;
        font-weight: 700;
        font-size: 0.36rem;
      }
      .imgBox {
        position: relative;
        width: 1.09rem;
        height: 1.09rem;
        .defaultImg {
          width: 1.09rem;
          height: 1.09rem;
          background: url(../assets/img/defaultBg.png);
          background-size: 100% 100%;
          position: absolute;
          z-index: 1;
        }
        .userImg {
          width: 1rem;
          height: 1rem;
          position: absolute;
          top: 0.045rem;
          left: 0.045rem;
          border-radius: 50%;
        }
      }
      .userMsg {
        width: 2.5rem;
        margin-left: 0.16rem;
        .name {
          max-width: 2.5rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 0.24rem;
          font-weight: 700;
        }
        .uid {
          font-size: 0.22rem;
          font-weight: 600;
          color: #ffe49a;
          //   margin-top: 0.13rem;
        }
      }
      .score {
        font-size: 0.23rem;
        color: #fff4bb;
        font-weight: 700;
        em {
          font-weight: 700;
        }
      }
      &.rank1 {
        background: url(../assets/img/top1Bg.png);
        background-size: 100% 100%;
        .rank {
          background: url(../assets/img/1.png);
          background-size: 100% 100%;
          text-indent: -999rem;
        }
        .defaultImg {
          width: 1.11rem;
          height: 1.25rem;
          background: url(../assets/img/top1.png);
          background-size: 100% 100%;
          top: -0.2rem;
          left: -0.04rem;
        }
      }
      &.rank2 {
        background: url(../assets/img/top2Bg.png);
        background-size: 100% 100%;
        .rank {
          background: url(../assets/img/2.png);
          background-size: 100% 100%;
          text-indent: -999rem;
        }
        .defaultImg {
          width: 1.11rem;
          height: 1.25rem;
          background: url(../assets/img/top2.png);
          background-size: 100% 100%;
          top: -0.2rem;
          left: -0.04rem;
        }
      }
      &.rank3 {
        background: url(../assets/img/top2Bg.png);
        background-size: 100% 100%;
        .rank {
          background: url(../assets/img/3.png);
          background-size: 100% 100%;
          text-indent: -999rem;
        }
        .defaultImg {
          width: 1.11rem;
          height: 1.25rem;
          background: url(../assets/img/top3.png);
          background-size: 100% 100%;
          top: -0.2rem;
          left: -0.04rem;
        }
      }
    }
  }
}
</style>
