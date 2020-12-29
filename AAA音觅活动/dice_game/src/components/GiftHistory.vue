<template>
  <div class="giftHistory">
    <div class="title"><i></i></div>
    <i class="close" @click="closeHistory()"></i>
    <ul class="itemList scrollable">
      <li class="item" v-for="(item,index) in makeData" :key="index">
        <div class="time">{{item.key}}</div>
        <div class="taskItem" v-for="(item2,index2) in item.list" :key="index2">
          <div class="neme" v-if="item2.name">{{item2.name}}</div>
          <!-- <div class="neme" v-else-if="item2.type == 'task'">{{item2.pid==3001?'送禮':'分享'}}限時任務</div> -->
          <div class="neme" v-else-if="item2.type == 'bean'">{{item2.count}}金豆</div>
          <div class="neme" v-else-if="item2.type == 'coin'">{{item2.count}}金幣</div>
          <div class="neme" v-else-if="item2.type == 'dice'">骰子*{{item2.count}}</div>
          <div class="neme" v-else-if="item2.type == 'coupon'">{{item2.ratio}}%儲值返利券</div>
          <div class="tu">{{taskName[item2.pid]}}</div>
          <span class="timeItem">{{getTime(item2.time,2)}}</span>
        </div>
      </li>
    </ul>
    <div class="dloading" v-if="loading">加載中....</div>
    <div class="noData" v-if="list.length == 0">暫無數據</div>
  </div>
</template>
<script>
import api from "../api/apiConfig"
import getDate from "../utils/getDate"
var getKey = function (arr, time) {
  for (let index = 0; index < arr.length; index++) {
    if (arr[index].key == time) {
      return index;
    }
  }
  return -1;
};
export default {
  data() {
    return {
      list: [],
      loaded: false,
      more: true,
      loading: false,
      taskName: {
        1001: '購買',
        1002: '購買 ',
        1003: '購買 ',
        1004: '購買 ',
        1005: '購買',
        2001: '購買',
        2002: '購買',
        2003: '購買',
        3001: '購買',
        3002: '購買',
        4001: '日榜獎勵',
        5001: '購買'
      },
    }
  },
  created() {
    this.loading = true
    api.getHistroy(0).then(res => {
      this.loading = false
      this.list = res.data.response_data.list
    })
  },
  computed: {
    listLength() {
      let num = 0
      this.list.forEach(element => {
        num += element.records.length
      });
      return num
    },
    makeData() {
      var arr = [];
      for (let i = 0; i < this.list.length; i++) {
        var times = this.list[i].time;
        var day = getDate(new Date(times * 1000), 3)
        var index = getKey(arr, day);
        if (index == -1) {
          arr.push({ key: day, list: [this.list[i]] })
        } else {
          arr[index].list.push(this.list[i]);
        }
      }
      return arr;
    }
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
          api.getHistroy(this.list.length, 'more').then(res => {
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
    getTime(tm, type) {
      return getDate(new Date(tm * 1000), type)
    },
    closeHistory() {
      this.$emit('closeHistory')
    }
  }
}
</script>
<style lang="scss" scoped>
.giftHistory {
  width: 5.4rem;
  height: 8.62rem;
  padding: 0 0.54rem;
  border: 0.08rem solid #ffffff;
  background: linear-gradient(0deg, #7aa3fd, #9d56fc, #9251f3);
  border-radius: 0.24rem;
  position: relative;
  .itemList {
    max-height: 6.8rem;
    margin-top: 0.15rem;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    -webkit-overflow-scrolling: auto;
    li {
      margin: 0 0 0.8rem 0;
      font-weight: bold;
      padding-right: 0.3rem;
      .time {
        margin: 0.25rem 0 0.28rem;
        font-size: 0.28rem;
      }
      .taskItem {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.18rem;
        margin-bottom: 0.25rem;
        .name {
          width: 2.6rem;
        }
        .taskTitle {
          font-size: 0.24rem;
          width: 3.5rem;
        }
        .taskGift {
          width: 2rem;
          display: flex;
          align-items: center;
          img {
            display: block;
            width: 0.3rem;
            height: 0.3rem;
            margin-right: 0.15rem;
          }
        }
        .taskTm {
          flex: 1;
        }
      }
    }
  }
  .title {
    width: 5.14rem;
    height: 1.42rem;
    background: url(../assets/img/title/ribbon.png);
    background-size: 100% 100%;
    position: absolute;
    top: -0.8rem;
    left: 0.71rem;
    i {
      display: block;
      width: 5.14rem;
      height: 1.42rem;
      background: url(../assets/img/title/title_15.png);
      background-size: 100% 100%;
    }
  }
}
.close {
  display: block;
  width: 0.72rem;
  height: 0.78rem;
  background: url(../assets/img/close.png);
  background-size: 100% 100%;
  position: absolute;
  right: -0.3rem;
  top: -0.4rem;
}
.loading,
.noData {
  text-align: center;
  margin-top: 0.4rem;
}
</style>
