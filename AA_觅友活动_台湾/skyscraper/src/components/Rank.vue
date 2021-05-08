<template>
  <div class="rank">
    <a @click.prevent="onRefresh" href="" :style="{transform:'rotate('+rotatePx+'deg)'}" id="refresh"></a>
    <p v-if="activity_status==0">- 活動開始倒計時 -</p>
    <p v-else-if="activity_status == 1">- 活動結束倒計時 -</p>
    <p v-else-if="activity_status ==2">- 活動已結束 -</p>
    <div class="timeDown" v-if="surplusTime&& !surplusTime.end && activity_status!=2">
      <strong>{{surplusTime.day}}</strong>
      <em>{{lang.rank_day}}</em>
      <strong>{{surplusTime.hour}}</strong>
      <em>{{lang.rank_hour}}</em>
      <strong>{{surplusTime.minute}}</strong>
      <em>{{lang.rank_min}}</em>
      <strong>{{surplusTime.second}}</strong>
      <em>{{lang.rank_second}}</em>
    </div>
    <p v-if="!list.length">暫無數據</p>
    <ul>
      <li v-for="(item,index) in list" :key="index" :class="['rank' + item.rank]" @click="goUser(item)">
        <div class="userRank">{{item.rank}}</div>
        <img v-lazy="item.avatar" alt="" class="avatar">
        <div class="msg">
          <div class="nick">{{item.nick}}</div>
          <span class="live" v-if="item.live_room"></span>
        </div>
        <div class="score">
          <i :class="['lv' + item.level]"></i>
          {{item.score}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

import downTime from '../utils/downTime.js'
import { mapState } from "vuex"
import { allList } from "../apis"
import { chang_floor } from "../apis"
export default {
  data () {
    return {
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
      surplusTime: {},
      list: [],
      loaded: false,
      more: true
    }
  },
  computed: {
    ...mapState(['activity_status', 'is_anchor', 'second'])
  },
  watch: {
    second (val) {
      this.downTimeGo('time', val)
    }
  },
  mounted () {
    // 如果初始化接口返回当前榜单数据，可以在Store的Action拿到服务器数据时先调用commit('updateRankGroups', {key:key, list:[]})，再更新state.tab触发组件watch
    window.addEventListener('scroll', this.onScroll);
    this.onScroll()
  },
  activated () {
    window.addEventListener('scroll', this.onScroll);
  },
  deactivated () {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    onScroll () {
      const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100;
      const notFull = document.body.scrollHeight < window.innerHeigh;
      if (this.loaded) return
      if ((scrollToBottom && this.more) || notFull) {
        console.log('get')
        this.more = false
        allList(this.list.length, 'more').then(res => {
          //   this.vxc('setUser', res.data.response_data.rank)
          this.more = true
          if (res.data.response_data.rank.length == 0) {
            this.loaded = true
          } else {
            this.list = this.list.concat(res.data.response_data.rank)
          }
        })
      }
    },
    downTimeGo (timeName, val) {
      clearInterval(this.timer)
      if (!downTime(timeName)) {
        downTime(timeName, val);
      }
      this.surplusTime = downTime(timeName);
      this.timer = setInterval(() => {
        this.surplusTime = downTime(timeName);
        if (this.surplusTime && this.surplusTime.end) {
          clearInterval(this.timer)
          // this.$store.commit("changday_down_time", 0)  //當天剩餘時間
        }
      }, 1000)
    },
    onRefresh () {
      if (!this.more) {
        return
      }
      if (this.is_anchor) {
        this.vxc('reSetChange_floor')
      }

      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      this.loaded = false
      this.$store.dispatch('getInitInfo');
      this.onScroll()
    },
    goUser (item) {
      chang_floor(item.uid).then(res => {
        this.vxc('setChangeFloor', res.data.response_data.owner)
      })
    }
  }
}
</script>

<style lang="scss">
.rank {
  width: 7.44rem;
  min-height: 3rem;
  margin: 0.11rem auto 0;
  padding: 1.17rem 0 2rem 0;
  > p {
    text-align: center;
    font-size: 0.24rem;
    color: rgba(10, 86, 177, 1);
  }
  .timeDown {
    padding: 0 1.3rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    strong {
      font-size: 0.48rem;
      font-weight: bold;
      display: block;
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 0.12rem;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 0.38rem;
        height: 0.59rem;
      }
    }
    em {
      display: block;
      font-size: 0.24rem;
      line-height: 0.9rem;
      color: rgba(252, 252, 180, 1);
      margin: 0 0 0.22rem;
    }
  }
  ul {
    width: 7.13rem;
    margin: 0 auto;
    li {
      height: 1.49rem;
      display: flex;
      align-items: center;
      background: url(../img/rankBg.png);
      background-size: 100% 100%;
      margin-bottom: 0.07rem;
      .userRank {
        width: 0.82rem;
        height: 0.67rem;
        text-align: center;
        line-height: 0.67rem;
        font-size: 0.36rem;
        font-weight: bold;
        font-style: italic;
        color: #271A76;
        margin: 0 0.32rem 0 0.27rem;
      }
      .avatar {
        width: 0.95rem;
        height: 0.95rem;
        border-radius: 50%;
      }
      .msg {
        width: 1.6rem;
        margin-left: 0.15rem;
        .nick {
          color: rgba(39, 26, 118, 1);
          font-size: 0.28rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .live {
          display: block;
          margin-top: 0.1rem;
          width: 0.74rem;
          height: 0.29rem;
          background: url(../img/live.png);
          background-size: 100% 100%;
        }
      }
      .score {
        width: 2.1rem;
        height: 0.49rem;
        background: rgba(56, 56, 56, 0.13);
        border-radius: 0.25rem;
        text-align: center;
        line-height: 0.49rem;
        margin-left: 0.6rem;
        position: relative;
        i {
          display: block;
          width: 0.86rem;
          height: 1.44rem;
          position: absolute;
          top: -0.56rem;
          left: -0.47rem;
          &.lv0 {
            background: url(../img/rank_floor/lv1.png);
            background-size: 100% 100%;
          }
          &.lv1 {
            background: url(../img/rank_floor/lv2.png);
            background-size: 100% 100%;
          }
          &.lv2 {
            background: url(../img/rank_floor/lv3.png);
            background-size: 100% 100%;
          }
          &.lv3 {
            background: url(../img/rank_floor/lv4.png);
            background-size: 100% 100%;
          }
        }
      }
      &.rank1,
      &.rank2,
      &.rank3 {
        background: url(../img/top_rank.png);
        background-size: 100% 100%;
        .userRank {
          text-indent: -999rem;
        }
      }
      &.rank1 {
        .userRank {
          background: url(../img/top1.png);
          background-size: 100% 100%;
        }
      }
      &.rank2 {
        .userRank {
          background: url(../img/top2.png);
          background-size: 100% 100%;
        }
      }
      &.rank3 {
        .userRank {
          background: url(../img/top3.png);
          background-size: 100% 100%;
        }
      }
    }
    li:last-child {
      margin-bottom: 0;
    }
  }
}
#refresh {
  display: block;
  width: 0.94rem;
  height: 0.94rem;
  position: fixed;
  right: 0.08rem;
  bottom: 1.6rem;
  background: url(../img/refresh.png) no-repeat;
  background-size: contain;
  transition: transform 1s;
  text-indent: -999rem;
  z-index: 100;
  &.mb {
    bottom: 2.8rem;
  }
}
</style>