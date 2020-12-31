<template>
  <div class="list">
    <div class="title">家族榜單</div>
    <div class="top1" v-if="list.length> 0">
      <div class="nickMsg">
        <div class="nick">家族名稱</div>
        <div class="nick clor">{{top1User.info.familyname}}</div>
      </div>
      <div class="imgBox" @click="goFlist(top1User.uid)">
        <span class="avBg"></span>
        <img v-lazy="top1User.info.avatar" alt="">
      </div>
      <div class="scoreMsg">
        <div class="pNums">家族人數: <span>{{top1User.info.nums}}</span> </div>
        <div class="score">成功推薦人數 <i></i> <span>{{top1User.score}}</span> </div>
      </div>
    </div>
    <ul>
      <li v-for="(item,index) in lastRank" :key="index">
        <div class="rank">{{item.rank}}</div>
        <img v-lazy="item.info.avatar" alt="" @click="goFlist(item.uid)">
        <div class="nickMsg">
          <div class="nick">家族名稱</div>
          <div class="nick clor">{{item.info.familyname}}</div>
        </div>
        <div class="scoreMsg">
          <div class="pNums">家族人數: <span>{{item.info.nums}}</span> </div>
          <div class="score">成功推薦 <i></i> <span>{{item.score}}</span> </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>

import { mapState } from "vuex"
import api from "../api/apiConfig"
import getString from "../utils/getString"
export default {
  data() {
    return {
      isMore: true,
      loaded: false
    }
  },
  mounted() {
    if (this.isShare) return
    window.addEventListener('scroll', this.onScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll)
  },
  computed: {
    ...mapState(['list']),
    top1User() {
      return this.list.slice(0, 1)[0]
    },
    lastRank() {
      return this.list.slice(1)
    }
  },
  methods: {
    goFlist(fid) {
      let regstr = getString('token')
      location.href = `./index4.html?token=${regstr}&fid=${fid}`
    },
    onScroll() { //滾動加載
      const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100
      if (scrollToBottom && this.isMore && !this.loaded) {
        this.isMore = false
        api.list(this.list.length).then(res => {
          let addList = res.data.response_data.list
          this.vxc('addList', addList)
          // this.list = this.list.concat(addList)
          this.isMore = true
          if (addList.length < 20) {
            this.loaded = true
          }
        })
      }
    }
  }
}
</script>
<style lang="scss">
.list {
  padding-bottom: 2rem;
  .title {
    width: 7.13rem;
    height: 1.15rem;
    text-align: center;
    line-height: 1.35rem;
    background: url(../assets/img/titleBg.png);
    background-size: 100% 100%;
    color: rgba(124, 250, 255, 1);
    font-size: 0.36rem;
    font-weight: 600;
    font-style: italic;
    text-shadow: rgba(16, 20, 77, 1) 0.02rem 0 0,
      rgba(16, 20, 77, 1) 0 0.02rem 0, rgba(16, 20, 77, 1) -0.02rem 0 0,
      rgba(16, 20, 77, 1) 0 -0.02rem 0;
    letter-spacing: 0.2rem;
  }
  .top1 {
    width: 7.5rem;
    height: 2.34rem;
    background: url(../assets/img/top1Bg.png);
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .nickMsg {
      width: 2rem;
      font-size: 0.28rem;
      text-align: right;
      .nick {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &.clor {
          color: rgba(255, 254, 151, 1);
        }
      }
    }
    .imgBox {
      width: 2.4rem;
      height: 2.4rem;
      position: relative;
      .avBg {
        width: 2.4rem;
        height: 2.4rem;
        position: absolute;
      }
      img {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        position: absolute;
        left: 0.2rem;
        top: 0.2rem;
      }
    }
    .scoreMsg {
      font-size: 0.22rem;
      > div {
        height: 0.4rem;
        i {
          display: inline-block;
          width: 0.35rem;
          height: 0.33rem;
          background: url(../assets/img/star.png);
          background-size: 100% 100%;
          // margin: 0.05rem 0 0 0.08rem;
        }
        span {
          color: rgba(255, 254, 157, 1);
          font-size: 0.28rem;
        }
      }
      .score {
        height: 0.5rem;
        i {
          margin-top: 0.05rem;
        }
      }
    }
  }
  ul {
    width: 7.17rem;
    margin: 0 auto;
    li {
      height: 1.33rem;
      margin-bottom: 0.12rem;
      background: url(../assets/img/pItem.png);
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      .rank {
        width: 1rem;
        text-align: center;
        font-size: 0.4rem;
        font-weight: bold;
        color: rgba(255, 255, 255, 0.5);
      }
      > img {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        margin-right: 0.16rem;
      }
      .nickMsg {
        width: 2.3rem;
        font-size: 0.28rem;
        .nick {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          &.clor {
            color: rgba(255, 254, 151, 1);
          }
        }
      }
      .scoreMsg {
        font-size: 0.22rem;
        color: rgba(255, 255, 255, 0.5);
        > div {
          height: 0.4rem;
          display: flex;
          align-items: center;
          i {
            width: 0.35rem;
            height: 0.33rem;
            background: url(../assets/img/star.png);
            background-size: 100% 100%;
            margin: 0 0.1rem 0 0.08rem;
          }
          span {
            color: rgba(225, 145, 255, 1);
            font-size: 0.28rem;
          }
        }
      }
    }
  }
}
</style>
