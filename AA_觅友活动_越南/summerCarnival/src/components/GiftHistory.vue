<template>
  <div class="giftHistory">
    <h5>{{lang.history_title}}</h5>
    <i class="close" @click="closeHistory()"></i>
    <ul class="itemList scrollable">
      <li class="item" v-for="(item,index) in makeData" :key="index">
        <div class="time">{{item.key}}</div>
        <div class="taskItem" v-for="(item2,index2) in item.list" :key="index2">
          <div class="neme">{{getTips(item2.data) }}</div>
          <span class="timeItem">{{getTime(item2.time,4)}}</span>
        </div>
      </li>
    </ul>
    <div class="dloading" v-if="loading">{{lang.loading}}</div>
    <div class="noData" v-if="list.length == 0 && !loading">{{lang.noData}}</div>
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
  data () {
    return {
      list: [],
      loaded: false,
      more: true,
      loading: false,
    }
  },
  created () {
    this.loading = true
    api.getHistroy(0).then(res => {
      this.loading = false
      this.list = res.data.response_data.list
    })
  },
  computed: {
    listLength () {
      let num = 0
      this.list.forEach(element => {
        num += element.records.length
      });
      return num
    },
    makeData () {
      var arr = [];
      for (let i = 0; i < this.list.length; i++) {
        var times = this.list[i].time;
        var day = getDate(new Date(times * 1000), '~')
        var index = getKey(arr, day);
        if (index == -1) {
          arr.push({ key: day, list: [this.list[i]] })
        } else {
          arr[index].list.push(this.list[i]);
        }
      }
      console.log(arr)
      return arr;
    }
  },
  mounted () {
    this.scrollable = this.$el.querySelector('.scrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
  },
  methods: {
    onScroll () {
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
    getTips (data) {
      let type = data.type
      return this.lang.history_msg[type].replace('%t', data.task_name).replace('%n', data.name).replace('%s', data.num).replace('%d', data.days).replace('%c', data.nick).replace('%a', data.count)
      //   if (type == 1) {
      //     return `完成${data.task_name}任務,獲得${data.name}*${data.num}`
      //   } else if (type == 2) {
      //     return `完成${data.task_name}任務,獲得${data.name}*${data.num}`
      //   } else if (type == 3) {
      //     return `兌換【${data.name}】 ${data.days}天`
      //   } else if (type == 4) {
      //     return `送出${data.name}*${data.num}`
      //   } else if (type == 5) {
      //     return `收到【${data.nick}】贈送的${data.name}*${data.num}`
      //   }
    },
    getTime (tm, type) {
      return getDate(new Date(tm * 1000), type)
    },
    closeHistory () {
      this.$emit('closeHistory')
    }
  }
}
</script>
<style lang="scss" scoped>
.giftHistory {
  width: 6.6rem;
  height: 7.14rem;
  background: url(../assets/img/fListBg.png);
  background-size: 100% 100%;
  border-radius: 0.24rem;
  position: relative;
  padding-top: 1rem;
  h5 {
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    color: #fff;
    font-size: 0.33rem;
    font-weight: 600;
  }
  .close {
    display: block;
    width: 0.72rem;
    height: 0.78rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: -0.1rem;
    top: 0.7rem;
  }
  .itemList {
    padding: 0 0.5rem;
    max-height: 5rem;
    margin-top: 0.15rem;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    -webkit-overflow-scrolling: auto;
    li {
      margin: 0 0 0.8rem 0;
      font-weight: bold;
      // padding-right: 0.3rem;
      color: rgba(92, 35, 161, 1);
      .time {
        margin: 0.25rem 0 0.28rem;
        font-size: 0.28rem;
        color: rgba(255, 237, 130, 1);
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
  // .title {
  //   width: 5.14rem;
  //   height: 1.42rem;
  //   background: url(../assets/img/title/ribbon.png);
  //   background-size: 100% 100%;
  //   position: absolute;
  //   top: -0.8rem;
  //   left: 0.71rem;
  //   i {
  //     display: block;
  //     width: 5.14rem;
  //     height: 1.42rem;
  //     background: url(../assets/img/title/title_15.png);
  //     background-size: 100% 100%;
  //   }
  // }
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
.dloading,
.noData {
  text-align: center;
  margin-top: 0.4rem;
}
</style>
