<template>
  <div class="giftHistory">
    <i class="close" @click="closeHistory()"></i>
    <div class="title"></div>
    <ul class="itemList scrollable">
      <li class="item" v-for="(item,index) in list " :key="index">
        <div class="time">{{getTime(item.time,'~')}}</div>
        <div class="taskItem" v-for="(item2,index2) in item.records" :key="index2">
          <span class="taskTitle">{{item2.title}}</span>
          <span class="taskGift"><img :src="require(`../assets/img/pupImg/gift${item2.reward_type}.png`)" alt=""> {{item2.reward}}</span>
          <span class="taskTm">{{getTime(item2.time,':')}}</span>
        </div>
      </li>
    </ul>
    <div class="loading" v-if="loading">加載中....</div>
    <div class="noData" v-if="list.length == 0">暫無數據</div>
  </div>
</template>
<script>
import api from "../api/apiConfig"
import getDate from "../utils/getDate"
export default {
  data() {
    return {
      list: [],
      loaded: false,
      more: true,
      loading: false
    }
  },
  created() {
    this.loading = true
    api.gotState(0).then(res => {
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
          api.gotState(this.listLength, 'more').then(res => {
            this.more = true
            if (res.data.response_data.list.length === 0) {
              this.loaded = true
            } else {
              const time = res.data.response_data.list[0].time
              const lastTime = this.list[this.list.length - 1].time
              const list = res.data.response_data.list[0].records
              if (time == lastTime) {
                this.list[this.list.length - 1].records = this.list[this.list.length - 1].records.concat(list)
              } else {
                let obj = {
                  time: time,
                  records: list
                }
                this.list.push(obj)
              }
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
  width: 6.34rem;
  height: 7rem;
  padding: 0 0.23rem;
  background: rgba(226, 255, 194, 1);
  border: 0.04rem solid rgba(202, 255, 148, 1);
  // box-shadow: -0.01rem 0.1rem 0.31rem 0.1rem rgba(255, 255, 255, 0.75);
  border-radius: 0.1rem;
  position: absolute;
  left: 0.35rem;
  top: 1.35rem;
  .close {
    display: block;
    width: 0.32rem;
    height: 0.32rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0.25rem;
    top: 0.25rem;
  }
  .title {
    width: 2.08rem;
    height: 0.49rem;
    background: url(../assets/img/historyTitle.png);
    background-size: 100% 100%;
    margin: 0.43rem auto 0;
  }
  .itemList {
    max-height: 5.8rem;
    margin-top: 0.15rem;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    -webkit-overflow-scrolling: auto;
    li {
      margin: 0 0 0.8rem 0;
      color: #5f962d;
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
  .itemList::-webkit-scrollbar {
    width: 0.06rem;
    background: rgba(200, 243, 153, 1);
    border-radius: 0.03rem;
  }

  .itemList::-webkit-scrollbar-thumb {
    width: 0.06rem;
    background: #8eca4d;
    border-radius: 0.03rem;
  }
}
.loading,
.noData {
  text-align: center;
  margin-top: 0.4rem;
  color: #316501;
}
</style>
