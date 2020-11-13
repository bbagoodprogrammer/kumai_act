<template>
  <div class="commonRank" :style="{height:listHeight+'rem'}">
    <div class="bg">
      <div class="top">
        <p v-if="!list.length" class="noData">{{lang.noData}}</p>
      </div>
      <div class="con"></div>
      <div class="bottom"></div>
    </div>
    <ul class="list">
      <li v-for="(item,index) in list" :key="index" :class="'top' + item.rank">
        <span class="rank">{{item.rank}}</span>
        <div class="imgBox" @click="goUser(item.uid)">
          <img v-if="item.avatar_frame &&item.avatar_frame != ''" :src="item.avatar_frame" class="frame" alt="">
          <!-- <img src="../assets/img/testFrame.png" class="frame" alt=""> -->
          <img v-else-if="item.nob > 0" :src="require(`../assets/img/nob/${item.nob}.png`)" class="nob" alt="">
          <img v-lazy="item.avatar" alt="" class="av">
        </div>
        <div class="nick">{{item.nick}}</div>
        <div class="score">{{lang.happyScore}} <em>{{item.score}}</em></div>
      </li>
    </ul>
    <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      listHeight: 0,
      loaded: false,
      more: true,
      rotatePx: 0,    //刷新旋转动画
    }
  },
  props: ['list', 'type', 'apis', 'rank'],
  watch: {
    list(val) {
      if (val.length) {
        this.listHeight = val.length * 1.4 + .65
      } else {
        this.listHeight = 1.65 + .65
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  activated() {
    window.addEventListener('scroll', this.onScroll)
  },
  deactivated() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    goUser(uid) {
      location.href = `uid:${uid}`
    },
    onScroll() { //滾動加載
      console.log('xxxxx')
      const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100
      if (scrollToBottom && !this.loaded && this.more && this.rank) {
        this.more = false
        this.apis(this.list.length, 'more').then(res => {
          this.more = true
          let list = res.data.response_data.list
          //   this.list = this.list.concat(list)
          this.$emit('listConcat', list)
          if (list.length < 20) {
            this.loaded = true
          }
        })
      }
    },
    refrsh() { //刷新
      if (!this.more) return
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      this.$parent.init()
    }
  }
}
</script>
<style lang="scss">
.commonRank {
  width: 7.35rem;
  min-height: 2.4rem;
  position: relative;
  margin: 0 auto;
  .noData {
    text-align: center;
    margin-top: 1rem;
  }
  .bg {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    .top {
      width: 100%;
      height: 1.56rem;
      background: url(../assets/img/listBgHeader.png);
      background-size: 100% 100%;
    }
    .con {
      width: 100%;
      flex: 1;
      background: url(../assets/img/listBgCon.png);
      background-size: 100% auto;
    }
    .bottom {
      width: 100%;
      height: 0.65rem;
      background: url(../assets/img/listBgBotton.png);
      background-size: 100% 100%;
    }
  }
  .list {
    width: 6.67rem;
    position: absolute;
    top: 0;
    left: 0;
    padding: 0.39rem 0.3rem 0;
    li {
      height: 1.4rem;
      display: flex;
      align-items: center;
      position: relative;
      .rank {
        width: 0.51rem;
        height: 0.67rem;
        line-height: 0.67rem;
        text-align: center;
        font-size: 0.26rem;
        margin: 0 0.18rem 0 0.2rem;
      }
      .imgBox {
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
        .av {
          width: 0.88rem;
          height: 0.88rem;
          position: absolute;
          top: 0.1rem;
          left: 0.11rem;
          border-radius: 50%;
        }
      }

      .nick {
        width: 2.5rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 0.28rem;
        margin-left: 0.18rem;
      }
      .score {
        font-size: 0.28rem;
        flex: 1;
        em {
          display: block;
          text-align: center;
        }
      }
      &.top1 {
        .rank {
          text-indent: 999rem;
          background: url(../assets/img/top1.png);
          background-size: 100% 100%;
        }
      }
      &.top2 {
        .rank {
          text-indent: 999rem;
          background: url(../assets/img/top2.png);
          background-size: 100% 100%;
        }
      }
      &.top3 {
        .rank {
          text-indent: 999rem;
          background: url(../assets/img/top3.png);
          background-size: 100% 100%;
        }
      }
    }
    li::before {
      content: "";
      width: 5.4rem;
      height: 1px;
      background: #ffffff;
      opacity: 0.3;
      position: absolute;
      bottom: 0;
      right: 0;
    }
    li:last-child::before {
      height: 0;
    }
  }
}
</style>
