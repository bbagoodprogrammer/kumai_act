<template>
  <div class="Playing1Rank">
    <p class="tips">{{lang.rankTips1}}</p>
    <commonRank :list="list" :apis="api.list1" :rank="rank" @listConcat="listConcat" ref="rank" />
  </div>
</template>
<script>
import api from "../api/apiConfig"
import commonRank from "./CommonRank"
export default {
  components: { commonRank },
  data() {
    return {
      list: [],
      rank: null,
      listHeight: 0,
      loaded: false,
      more: true,
      api: api
    }
  },
  watch: {
    list(val) {
      if (val.length) {
        this.listHeight = val.length * 1.4 + .65
      } else {
        this.listHeight = 1.65 + .65
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    goUser(uid) {
      location.href = `uid:${uid}`
    },
    listConcat(list) {
      this.list = this.list.concat(list)
    },
    init() {
      api.list1(0).then(res => {
        this.list = res.data.response_data.list
        this.rank = res.data.response_data.rank
        this.vxc('changGroupsUserMsg', {
          key: 1,
          msg: this.rank
        })
        this.$refs.rank.loaded = false
      })
    },
    // onScroll() { //滾動加載
    //   console.log('xxxxx')
    //   const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100
    //   if (scrollToBottom && !this.loaded && this.more && this.rank) {
    //     this.more = false
    //     api.list1(this.list.length, 'more').then(res => {
    //       this.more = true
    //       let list = res.data.response_data.list
    //       this.list = this.list.concat(list)
    //       if (list.length < 20) {
    //         this.loaded = true
    //       }
    //     })
    //   }
    // }
  }
}
</script>
<style lang="scss" scoped>
.Playing1Rank {
  .tips {
    text-align: center;
    margin: 0.38rem 0 0.31rem;
  }
  .rank1 {
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
        img {
          width: 0.88rem;
          height: 0.88rem;
          border-radius: 50%;
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
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
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
}
</style>
