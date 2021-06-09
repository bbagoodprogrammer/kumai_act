<template>
  <div class="user_rank">
    <p v-if="!rank.length">{{lang.noData}}</p>
    <ul>
      <li v-for="(item,index) in rank" :key="index" :class="['rank' + item.rank]" @click="goUser(item)">
        <div class="userRank">{{item.rank}}</div>
        <div class="imgBox">
          <img v-lazy="item.avatar" alt="" class="avatar">
          <i class="live">LIVE</i>
        </div>

        <div class="msg">
          <div class="nick">{{item.nick}}</div>
          <!-- <span class="live" v-if="item.live_room"></span> -->
        </div>
        <div class="score">
          <i>命中值</i>
          <em>{{item.score}}</em>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>


import { mapState } from "vuex"

export default {
  data () {
    return {
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
      surplusTime: {},
      loaded: false,
      more: true
    }
  },
  computed: {
    ...mapState(['activity_status', 'second', 'rank'])
  },

  //   mounted () {
  //     // 如果初始化接口返回当前榜单数据，可以在Store的Action拿到服务器数据时先调用commit('updateRankGroups', {key:key, list:[]})，再更新state.tab触发组件watch
  //     window.addEventListener('scroll', this.onScroll);
  //     this.onScroll()
  //   },
  //   activated () {
  //     window.addEventListener('scroll', this.onScroll);
  //   },
  //   deactivated () {
  //     window.removeEventListener('scroll', this.onScroll);
  //   },
  //   methods: {
  //     onScroll (refresh) {
  //       const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100;
  //       const notFull = document.body.scrollHeight < window.innerHeigh;
  //       if (this.loaded) return
  //       if ((scrollToBottom && this.more) || notFull || (refresh == 'refresh' && this.more)) {
  //         console.log('get')
  //         this.more = false
  //         allList(this.list.length, 'more').then(res => {
  //           this.more = true
  //           if (res.data.response_data.rank.length == 0) {
  //             this.loaded = true
  //           } else {
  //             this.list = this.list.concat(res.data.response_data.rank)
  //           }
  //         })
  //       }
  //     },

  onRefresh () {
    if (!this.more) {
      return
    }
    this.rotatePx = 540 * ++this.rotatec  //旋转动画
    this.loaded = false
    this.$store.dispatch('getInitInfo');
  },
  goUser (item) {
    var isiOS = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
    if (isiOS) {
      sendJsData('app://userInfo?uid=' + item.uid);
    } else {
      javascript: JSInterface.sendJsData('app://userInfo?uid=' + item.uid);
    }
  }

}
</script>

<style lang="scss">
.user_rank {
  width: 7.5rem;
  min-height: 5.97rem;
  margin: 0.11rem auto 0;
  padding: 1.48rem 0 2rem 0;
  ul {
    width: 6.98rem;
    margin: 0 auto;
    li {
      height: 1.53rem;
      display: flex;
      align-items: center;
      background: url(../img/rankBg.png);
      background-size: 100% 100%;
      margin-bottom: 0.06rem;
      .userRank {
        width: 0.82rem;
        height: 0.67rem;
        text-align: center;
        line-height: 0.67rem;
        font-size: 0.36rem;
        font-weight: bold;
        font-style: italic;
        color: #032F6A;
        margin: 0 0.05rem 0 0.27rem;
      }
      .imgBox {
        position: relative;
        .avatar {
          width: 1.13rem;
          height: 1.13rem;
          border-radius: 50%;
          box-sizing: border-box;
          border: 0.03rem solid #FEEB8E;
        }
        .live {
          display: block;
          width: 0.71rem;
          height: 0.23rem;
          background: linear-gradient(133deg, #FFFE67 0%, #72F5FA 100%);
          border-radius: 0.04rem;
          text-align: center;
          line-height: 0.23rem;
          color: #1B80F0;
          font-size: 0.22rem;
          position: absolute;
          bottom: 0;
          left: 0.21rem;
        }
      }
      .msg {
        width: 1.6rem;
        margin-left: 0.15rem;
        .nick {
          color: #032E69;
          font-size: 0.28rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .score {
        width: 2rem;
        text-align: center;
        margin-left: 0.6rem;
        position: relative;
        i {
          display: block;
          color: #032F6A;
          font-size: 0.24rem;
          text-align: right;
        }
        em {
          display: block;
          width: 2rem;
          height: 0.37rem;
          background: rgba(3, 59, 8, 0.1);
          border-radius: 0.1rem;
          margin-top: 0.04rem;
        }
      }
      &.rank1,
      &.rank2,
      &.rank3 {
        background: url(../img/top3_bg.png);
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
  //   background: url(../img/refresh.png) no-repeat;
  //   background-size: contain;
  transition: transform 1s;
  text-indent: -999rem;
  z-index: 100;
  &.mb {
    bottom: 2.8rem;
  }
}
</style>