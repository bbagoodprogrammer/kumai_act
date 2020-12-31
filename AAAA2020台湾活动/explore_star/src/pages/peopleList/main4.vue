<template>
  <div class="list">
    <div class="title">本家族推薦排行榜</div>
    <div class="list">
      <p v-if="list.length == 0" class="noData">{{lang.noDate}}</p>
      <ul class="scrollable">
        <li v-for="(item,index) in list" :key="index">
          <div class="rank">{{item.rank}}</div>
          <img v-lazy="item.avatar" alt="" @click="goUser(item.uid)">
          <div class="nickMsg">
            <div class="nick clor">{{item.nick}}</div>
          </div>
          <div class="scoreMsg">
            <div class="score">成功推薦 <i></i> <span>{{item.score}}</span> </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="listTips">
      <h5>注：</h5>
      <p>家族推薦獎池獎勵將採取多推薦，多瓜分的原則 在本家族推薦的人數排名中：</p>
      <p>第1-3名 隨機瓜分本家族獎池的40%</p>
      <p>第4-10名 隨機瓜分本家族獎池的30%</p>
      <p>第11-20名 隨機瓜分本家族獎池的20%</p>
      <p>第21-其他 隨機瓜分本家族獎池的10%</p>
    </div>
    <div class="lastTips">
      若家族成員人數不足以瓜分整個獎池，那麼剩下獎池將不做瓜分
      或者也可以多多叫家族成員來參加活動哦！
    </div>
    <i class='fire'> </i>
    <loading />
  </div>
</template>
<script>
import api from "../../api/apiConfig"
import loading from "../../components/Loading"
import getDate from "../../utils/getDate"
import getString from "../../utils/getString"

export default {
  components: { loading },
  data() {
    return {
      list: [],
      loaded: false,
      more: true
    }
  },
  created() {
    document.title = '家族推薦排行榜'
    sessionStorage.setItem("need-refresh", true);
    this.fid = getString('fid')
    api.gurad(this.fid, 0).then(res => {
      this.list = res.data.response_data.list
    })
  },
  mounted() {
    this.scrollable = this.$el.querySelector('.scrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
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
          api.gurad(this.fid, this.list.length, 'more').then(res => {
            this.more = true
            if (res.data.response_data.list.length === 0) {
              this.loaded = true
            } else {
              this.list = this.list.concat(res.data.response_data.list)
            }
          })
        }
      }
    },
    getTime(tm) {
      return getDate(new Date(tm * 1000), '~')
    },
  }
}
</script>
<style lang="scss">
body {
  background-color: rgba(29, 22, 95, 1);
  padding-top: 0.32rem;
  .list {
    padding-top: 0.36rem;
  }
  .title {
    width: 7.13rem;
    height: 1.15rem;
    text-align: center;
    line-height: 1.35rem;
    background: url(../../assets/img/titleBg.png);
    background-size: 100% 100%;
    color: rgba(124, 250, 255, 1);
    font-size: 0.36rem;
    font-weight: 600;
    font-style: italic;
    text-shadow: rgba(16, 20, 77, 1) 0.02rem 0 0,
      rgba(16, 20, 77, 1) 0 0.02rem 0, rgba(16, 20, 77, 1) -0.02rem 0 0,
      rgba(16, 20, 77, 1) 0 -0.02rem 0;
    letter-spacing: 0.06rem;
    margin: 0 auto;
  }
  ul {
    width: 7.17rem;
    max-height: 7rem;
    margin: 0.33rem auto;
    overflow-y: scroll;
    li {
      height: 1.33rem;
      margin-bottom: 0.12rem;
      background: url(../../assets/img/pItem.png);
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
          font-size: 0.32rem;
          // &.clor {
          //   color: rgba(255, 254, 151, 1);
          // }
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
            background: url(../../assets/img/star.png);
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
  .listTips {
    font-size: 0.26rem;
    color: rgba(208, 184, 237, 1);
    padding: 0 0.6rem;
  }
  .lastTips {
    font-size: 0.2rem;
    color: rgba(184, 235, 237, 1);
    padding: 0 1.22rem 0 0.6rem;
  }
  .fire {
    position: fixed;
    bottom: 0;
    left: 0;
    display: block;
    width: 7.5rem;
    height: 1.57rem;
    background: url(../../assets/img/fire.png);
    background-size: 100% 100%;
    margin-top: 0.8rem;
  }
}
@import "../../assets/scss/common.scss";
</style>
