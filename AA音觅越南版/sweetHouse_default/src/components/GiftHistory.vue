<template>
  <div class="giftHistory">
    <i class="close" @click="closeHistory()"></i>
    <div class="title">Động thái</div>
    <ul class="itemList scrollable">
      <li class="item" v-for="(item,index) in makeData" :key="index">
        <div class="time">{{getTime(item.list[0].time,1)}}</div>
        <div class="taskItem" v-for="(item2,index2) in item.list" :key="index2">
          <span class="name">{{item2.type=='raw'?taskName[item2.key]:`Chế biến${item2.name}*${item2.count}xuất`}}</span>
          <span class="wards">{{item2.type=='raw'?`${item2.name}+${item2.count}`:`Điểm +${item2.score}`}}</span>
          <span class="timeItem">{{getTime(item2.time,2)}}</span>
        </div>
      </li>
    </ul>
    <div class="dloading" v-if="loading">Đang tải....</div>
    <div class="noData" v-if="list.length == 0">không có dữ liệu</div>
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
      taskName: {
        mic: 'Lên mic trong phòng 25 phút (phòng khóa không tính) ',
        coin: 'Phòng tặng đi 800 xu',
        share: 'chia sẻ tới bạn bè ngoài app',
        create: 'Tạo tác phẩm mới/đăng tác phẩm hát nối/đăng tác phẩm song ca',
        friend: 'Tăng điểm kết bạn 20',
        invite: 'Mời bạn bè tham gia mở gian hàng đồ ngọt',
        charge: 'Nạp số xu bất kì',
        room: 'Điểm sôi nổi phòng đạt 5000',
        gift: 'nhận quà đồ ngọt mùa hè bất kì 15 chiếc',
        sharep: 'Chia sẻ',
        pairing: 'Vào mục kết bạn (phiên bản 280) trượt phải thích 3 người, mỗi ngày 3 lần.'
      },
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
        var times = this.list[i].date;
        var index = getKey(arr, times);
        if (index == -1) {
          arr.push({ key: times, list: [this.list[i]] })
        } else {
          arr[index].list.push(this.list[i]);
        }
      }
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
          api.gotState(this.list.length, 'more').then(res => {
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
  width: 6.06rem;
  height: 8.62rem;
  padding: 0 0.54rem;
  background: url(../assets/img/historyBg.png);
  background-size: 100% 100%;
  position: relative;
  .close {
    display: block;
    width: 0.5rem;
    height: 0.5rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0.45rem;
    top: 0.45rem;
  }
  .title {
    width: 2.08rem;
    height: 0.49rem;
    // background: url(../assets/img/historyTitle.png);
    // background-size: 100% 100%;
    margin: 0.43rem auto 0;
    text-align: center;
    color: rgba(215, 55, 17, 1);
  }
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
        color: rgba(215, 55, 17, 1);
      }
      .taskItem {
        color: rgba(233, 140, 86, 1);
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
  // .itemList::-webkit-scrollbar {
  //   width: 0.06rem;
  //   background: rgba(200, 243, 153, 1);
  //   border-radius: 0.03rem;
  // }

  // .itemList::-webkit-scrollbar-thumb {
  //   width: 0.06rem;
  //   background: #8eca4d;
  //   border-radius: 0.03rem;
  // }
}
.loading,
.noData {
  text-align: center;
  margin-top: 0.4rem;
  color: rgba(215, 55, 17, 1);
}
</style>
