<template>
  <div class="rankList">
    <div class="noData" v-if="!list.length">{{lang.noData}}</div>
    <ul>
      <li v-for="(item,index) in list" :key="index" :class="'rank' + item.rank">
        <div class="rank">{{item.rank}}</div>
        <div class="uerImg" @click="goUser(item.uid)">
          <img v-if="item.avatar_frame &&item.avatar_frame != ''" :src="item.avatar_frame" class="frame" alt="">
          <!-- <img src="../assets/img/testFrame.png" class="frame" alt=""> -->
          <!-- <img v-else-if="item.nob > 0" :src="require(`../img/nob/${item.nob}.png`)" class="nob" alt=""> -->
          <img v-lazy="item.avatar" alt="" class="av">
        </div>
        <div class="msg">
          <div class="nick">{{item.nick}}</div>
          <div class="uid">UID {{item.uid}}</div>
        </div>
        <div class="score">
          <em>{{item.score}}</em>
          <i></i>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>

import { rank } from "../apis"
export default {
  data () {
    return {
      list: [],
      loaded: false,
      more: true,
    }
  },
  mounted () {
    this.onScroll(); // 如果默认展示的Tabs依赖服务器配置，把此方法移到watch中去调用（watch更新Tabs值后调onScroll）
    // 如果初始化接口返回当前榜单数据，可以在Store的Action拿到服务器数据时先调用commit('updateRankGroups', {key:key, list:[]})，再更新state.tab触发组件watch
    window.addEventListener('scroll', this.onScroll);
  },
  activated () {
    window.addEventListener('scroll', this.onScroll);
  },
  deactivated () {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    goUser (uid) {
      location.href = `uid:${uid}`
    },
    onScroll () {
      console.log('xxx')
      const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100;
      const notFull = document.body.scrollHeight < window.innerHeigh;
      if (this.loaded) return
      if (scrollToBottom && this.more) {
        this.more = false
        rank(this.list.length, 'more').then(res => {
          this.vxc('setUser', res.data.response_data.rank)
          this.more = true
          if (res.data.response_data.list.length == 0) {
            this.loaded = true
          } else {
            this.list = this.list.concat(res.data.response_data.list)
          }
        })
      }
    },
    refresh () {
      if (!this.more) {
        return
      } else {
        this.list = []
        this.loaded = false
        this.onScroll();
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.rankList {
  padding-bottom: 2rem;
}
.noData {
  text-align: center;
  font-size: 0.28rem;
  color: rgba(133, 90, 55, 1);
}
ul {
  width: 7.02rem;
  background: #ffffff;
  border-radius: 0.12rem;
  margin: 0 auto;
  li {
    height: 1.4rem;
    display: flex;
    align-items: center;
    color: rgba(133, 90, 55, 1);
    font-size: 0.32rem;
    position: relative;
    .rank {
      width: 0.87rem;
      height: 0.7rem;
      line-height: 0.7rem;
      text-align: center;
    }
    .uerImg {
      width: 1.1rem;
      height: 1.1rem;
      position: relative;
      .nob {
        width: 1.1rem;
        height: 1.1rem;
        position: absolute;
        top: 0rem;
        left: 0rem;
        z-index: 10;
      }
      .frame {
        width: 1.5rem;
        height: 1.5rem;
        position: absolute;
        top: -0.21rem;
        left: -0.2rem;
        z-index: 10;
      }
      .room_frame {
        width: 0.94rem;
        height: 0.94rem;
        position: absolute;
        top: 0.055rem;
        left: 0.065rem;
        z-index: 10;
      }
      .av {
        width: 0.88rem;
        height: 0.88rem;
        position: absolute;
        top: 0.1rem;
        left: 0.11rem;
        border-radius: 50%;
        border: 0.02rem solid rgba(131, 9, 67, 1);
        &.room {
          border-radius: 0.14rem;
          &.noBor {
            border: none;
          }
        }
      }
    }
    .msg {
      width: 3.1rem;
      margin-left: 0.28rem;
      .nick {
        font-size: 0.32rem;
        color: rgba(133, 90, 55, 1);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .uid {
        font-size: 0.26rem;
        color: rgba(133, 90, 55, 1);
      }
    }
    .score {
      display: flex;
      align-items: center;
      i {
        width: 0.28rem;
        height: 0.28rem;
        background: url(../img/coins.png);
        background-size: 100% 100%;
        margin-left: 0.08rem;
      }
    }
    &.rank1 {
      .rank {
        text-indent: -999rem;
        background: url(../img/top1.png) center center no-repeat;
        background-size: 0.44rem 0.55rem;
      }
    }
    &.rank2 {
      .rank {
        text-indent: -999rem;
        background: url(../img/top2.png) center center no-repeat;
        background-size: 0.44rem 0.55rem;
      }
    }
    &.rank3 {
      .rank {
        text-indent: -999rem;
        background: url(../img/top3.png) center center no-repeat;
        background-size: 0.44rem 0.55rem;
      }
    }
  }
  li::before {
    content: '';
    display: block;
    width: 5.1rem;
    height: 0.015rem;
    position: absolute;
    bottom: 0;
    right: 0.3rem;
    background: RGBA(255, 229, 226, 1);
  }
}
</style>
