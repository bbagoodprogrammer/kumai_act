<template>
  <div class="votePeople">
    <div class="title">評委列表</div>
    <ul class="list">
      <li v-for="(item,index) in list " :key="index" :class="'rank'+item.rank">
        <div class="rank">{{item.rank}}</div>
        <div class="imgBox">
          <img v-lazy="item.avatar" alt="" class="av">
        </div>
        <div class="nick">
          <strong class="userNick">{{item.nick}}</strong>
          <strong class="songNum">打擂歌曲數：{{item.sNum}}</strong>
        </div>
        <div class="score">
          投票時為豬耳朵評委
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          rank: 1,
          nick: '飞不上蓝天的猪',
          sNum: 88,
          lv: 0
        },
        {
          rank: 2,
          nick: '飞不上蓝天的猪',
          sNum: 88,
          lv: 0
        },
        {
          rank: 3,
          nick: '飞不上蓝天的猪',
          sNum: 88,
          lv: 0
        },
        {
          rank: 4,
          nick: '飞不上蓝天的猪',
          sNum: 88,
          lv: 0
        },
        {
          rank: 5,
          nick: '飞不上蓝天的猪',
          sNum: 88,
          lv: 0
        }
      ],
      ismore: true,
      loaded: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll() { //滾動加載
      const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100
      if (scrollToBottom && !this.ismore && !this.loaded) { //加載更多合併數組存入vuex
        this.ismore = true
        api.getRank(this.list.length, 'more').then(res => {
          this.ismore = false
          let list = res.data.response_data.list
          if (list.length < 20) {
            this.loaded = true
          } else {
            this.list = this.list.concat(list)
          }
        })
      }
    },
  }
}
</script>
<style lang="scss">
body {
  background: rgba(117, 67, 240, 1) url(../../assets/img/htmlBg.png) no-repeat;
  background-size: 100% auto;
  .votePeople {
    padding: 0.53rem 0.13rem;
    .title {
      text-align: center;
      font-size: 0.48rem;
      font-weight: bold;
      .questIcon {
        display: block;
        width: 0.58rem;
        height: 0.58rem;
        background: url(../../assets/img/standIcon.png);
        background-size: 100% 100%;
        position: absolute;
        top: 0.29rem;
        right: 0.26rem;
      }
    }
    .list {
      margin-top: 0.5rem;
      li {
        height: 1.13rem;
        // background: url(../assets/img/listBg.png);
        // margin-bottom: 0.17rem;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        position: relative;
        margin-bottom: 0.06rem;
        .rank {
          width: 0.76rem;
          height: 0.65rem;
          color: rgba(163, 198, 255, 1);
          text-align: center;
          line-height: 0.65rem;
          margin-left: 0.08rem;
          font-weight: 700;
        }
        .imgBox {
          margin-left: 0.13rem;
          .av {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
          }
        }
        .nick {
          width: 2.3rem;
          margin-left: 0.17rem;
          .userNick {
            height: 0.5rem;
            display: block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .songNum {
            color: rgba(201, 165, 255, 1);
            font-size: 0.24rem;
          }
        }
        .score {
          flex: 1;
          margin-left: 0.15rem;
          color: rgba(94, 255, 230, 1);
          font-size: 0.24rem;
          text-align: center;
        }
        &.rank1 {
          .rank {
            text-indent: -999rem;
            background: url(../../assets/img/top1.png);
            background-size: 100% 100%;
          }
        }
        &.rank2 {
          .rank {
            text-indent: -999rem;
            background: url(../../assets/img/top2.png);
            background-size: 100% 100%;
          }
        }
        &.rank3 {
          .rank {
            text-indent: -999rem;
            background: url(../../assets/img/top3.png);
            background-size: 100% 100%;
          }
        }
      }
    }
  }
}
</style>
