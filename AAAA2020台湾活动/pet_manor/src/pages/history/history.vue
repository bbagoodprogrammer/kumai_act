<template>
  <div class="history">
    <h3>收集記錄</h3>
    <div class="tHeader">
      <span class="nick">贈送者</span>
      <span class="time">收集時間</span>
      <span class="gift">收集萌寵</span>
    </div>
    <ul class="scrollable">
      <li>
        <div class="listLeft">
          <img v-lazy="" alt="">
          <div class="nick">噠噠噠噠噠所大多</div>
        </div>
        <div class="time">x月x日x時x分</div>
        <div class="gift">小綿羊x10000</div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  mounted() {
    document.title = '收集記錄'
    this.scrollable = this.$el.querySelector('.scrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
  },
  onScroll() {
    const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
    if (scrollToBottom) { //滾動加載，沒有加載完成
      if (this.loaded) return
      if (this.more) {
        this.more = false
        api.getHistory(this.record.length, 'more').then(res => {
          this.more = true
          if (res.data.response_data.list === 0) {
            this.loaded = true
          } else {
            this.record = this.record.concat(res.data.response_data.list)
          }
        })
      }
    }
  },
}
</script>
<style lang="scss">
body {
  background: rgba(32, 88, 123, 1);
}
.history {
  padding: 0.49rem 0.3rem 0;
  > h3 {
    text-align: center;
    font-size: 0.48rem;
    color: rgba(254, 255, 185, 1);
  }
  .tHeader {
    margin: 0.89rem 0 0.15rem;
    display: flex;
    span {
      text-align: center;
      font-size: 0.26rem;
      color: rgba(129, 236, 154, 1);
      font-weight: 600;
    }
    .nick {
      width: 3rem;
      text-indent: 0.5rem;
    }
    .time {
      width: 2rem;
    }
    .gift {
      flex: 1;
    }
  }
  ul {
    max-height: 9rem;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch; //有回弹效果
    -webkit-overflow-scrolling: auto; //滑到哪停到哪
    li {
      height: 1rem;
      display: flex;
      align-items: center;
      text-align: center;
      font-size: 0.26rem;
      color: rgba(200, 249, 205, 1);
      font-weight: 500;
      img {
        width: 1rem;
        height: 1rem;
        border: 0.04rem solid rgba(69, 131, 70, 1);
        border-radius: 50%;
        box-sizing: border-box;
      }
      .listLeft {
        width: 3rem;
        display: flex;
        align-items: center;
      }
      .nick {
        max-width: 1.5rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-left: 0.18rem;
      }
      .time {
        width: 2rem;
      }
      .gift {
        flex: 1;
      }
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
