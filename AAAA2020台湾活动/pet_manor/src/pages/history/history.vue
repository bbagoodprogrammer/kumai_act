<template>
  <div class="history">
    <h3>收集記錄</h3>
    <div class="tHeader">
      <span class="nick">贈送者</span>
      <span class="time">收集時間</span>
      <span class="gift">收集萌寵</span>
    </div>
    <p class="noData" v-if="record.length == 0"> 暫無數據</p>
    <ul class="scrollable">
      <li v-for="(item,index) in record" :key="index">
        <div class="listLeft">
          <img v-lazy="item.avatar" alt="" @click="goUser(item.uid)">
          <div class="nick">{{item.nick}}</div>
        </div>
        <div class="time">{{getTime(item.tm)}}</div>
        <div class="gift">{{item.gift_name}}x{{item.num}}</div>
      </li>
    </ul>
    <Loading />
  </div>
</template>
<script>
import Loading from "../../components/Loading"
import api from "../../api/apiConfig"
import getDate from "../../utils/getDate"
export default {
  components: { Loading },
  data() {
    return {
      record: [],
      loaded: false,
      more: true
    }
  },
  created() {
    api.record(0).then(res => {
      this.record = res.data.response_data.list
    })
  },
  mounted() {
    this.scrollable = this.$el.querySelector('.scrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
  },
  methods: {
    getTime(tm) {
      return getDate(new Date(tm * 1000), 2)
    },
    goUser(uid) {
      location.href = `uid:${uid}`
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
}
</script>
<style lang="scss">
body {
  background: rgba(32, 88, 123, 1);
}
.noData {
  text-align: center;
  margin-top: 1.5rem;
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
      margin-bottom: 0.15rem;
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
