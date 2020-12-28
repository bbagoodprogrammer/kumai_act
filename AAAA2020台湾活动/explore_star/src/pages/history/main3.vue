<template>
  <div class="list">
    <div class="title">我的推薦記錄</div>
    <div class="list">
      <div class="tab">
        <span class="time">Star暱稱</span>
        <span class="code">Star uid</span>
        <span class="score">審核結果</span>
      </div>
      <div class="listItem">
        <p v-if="list.length == 0" class="noData">暫無數據</p>
        <ul class="scrollable">
          <li v-for="(item,index) in list" :key="index">
            <span class="time">Star暱稱</span>
            <span class="code">Star uid</span>
            <span class="score">審核結果</span>
          </li>
        </ul>
      </div>
    </div>
    <i class='fire'> </i>
    <loading />
  </div>
</template>
<script>
import api from "../../api/apiConfig"
import loading from "../../components/Loading"
import getDate from "../../utils/getDate"
export default {
  components: { loading },
  data() {
    return {
      list: [
        {
          avatar: '',
          rank: 1,
          nick: 'xxxx',
          nums: 999,
          score: 9999
        },
        {
          avatar: '',
          rank: 2,
          nick: 'xxxx',
          nums: 999,
          score: 9999
        },
        {
          avatar: '',
          rank: 3,
          nick: 'xxxx',
          nums: 999,
          score: 9999
        },
        {
          avatar: '',
          rank: 4,
          nick: 'xxxx',
          nums: 999,
          score: 9999
        },
        {
          avatar: '',
          rank: 5,
          nick: 'xxxx',
          nums: 999,
          score: 9999
        }
      ],
      loaded: false,
      more: true
    }
  },
  created() {
    document.title = '我的推薦記錄'
    sessionStorage.setItem("need-refresh", true);
    api.getHistory(0).then(res => {
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
    onScroll() {
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.loaded) return
        if (this.more) {
          this.more = false
          api.getHistory(this.list.length, 'more').then(res => {
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
  .list {
    padding: 0 0.17rem;
    margin: 0.5rem auto;
    .tab {
      display: flex;
      padding: 0 0.24rem;
      span {
        color: rgba(255, 255, 255, 1);
        font-size: 0.26rem;
        text-align: center;
        flex: 1;
        font-weight: bold;
      }
    }
    .noData {
      text-align: center;
      font-weight: 600;
      margin-top: 1.5rem;
    }
    .listItem {
      margin-top: 0.15rem;
      min-height: 3.22rem;
      padding: 0.1rem 0.24rem;
      ul {
        max-height: 6.6rem;
        overflow-x: hidden;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        -webkit-overflow-scrolling: auto;
      }
      li {
        display: flex;
        align-items: center;
        text-align: center;
        font-size: 0.28rem;
        margin-bottom: 0.06rem;
        span {
          flex: 1;
          width: 50%;
          color: rgba(208, 184, 237, 1);
        }
        .time {
          font-size: 0.24rem;
          white-space: nowrap;
        }
        .code {
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 0.3rem;
          text-align: center;
        }
      }
    }
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
  }
}
@import "../../assets/scss/common.scss";
</style>
