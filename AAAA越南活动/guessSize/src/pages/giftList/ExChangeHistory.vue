<template>
  <div class="hsitoryList">
    <div class="hsitoryCon">
      <i href="" class="close" @click="closeHistory()"></i>
      <p class="titale">Xem thông tin đổi</p>
      <div class="listToby">
        <span class="time">Thời gian đổi</span>
        <span class="openres">Số điểm tốn</span>
        <span class="down">Phần thưởng</span>
      </div>
      <ul class="scrollable">
        <li v-for="(item,index) in bettingHistory" :key="index">
          <span class="time">{{item.tm}}</span>
          <span class="openres">{{item.b}}</span>
          <span class="down">{{wardListMsg[item.gid].name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import api from '../../api/apiConfig'
export default {
  props: ['wardListMsg'],
  data() {
    return {
      more: true,
      loaded: false
    }
  },
  computed: {
    ...mapState(['bettingHistory'])
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
          api.receiveGiftRecord(this.bettingHistory.length).then((res) => {
            this.more = true
            if (res.data.response_data.record.length === 0) {
              this.loaded = true
            } else {
              this.$store.commit('addBettingHistory', res.data.response_data.record)
            }
          })
        }
      }
    },
    closeHistory() {
      this.$emit('closeHistory')
    }
  }
}
</script>
<style lang="scss">
.hsitoryList {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10000;
  .hsitoryCon {
    width: 6.8rem;
    padding: 0.52rem 0.2rem;
    background-color: #0f2123;
    position: absolute;
    top: 2.8rem;
    left: 50%;
    transform: translate(-50%, 0);
    .close {
      display: block;
      width: 0.62rem;
      height: 0.62rem;
      background: url(../../assets/img/close.png);
      background-size: 100% 100%;
      position: absolute;
      top: -1rem;
      right: 0rem;
    }
    .titale {
      font-size: 160%;
      color: #ffde5c;
      font-weight: bold;
      text-align: center;
    }
    .listToby {
      height: 0.74rem;
      line-height: 0.74rem;
      margin-top: 0.44rem;
      color: #22808a;
      display: flex;
      font-size: 90%;
      text-align: center;
      border-bottom: 0.01rem solid #205c63;
      span {
        margin-left: 0.08rem;
      }
      .time {
        width: 1.72rem;
      }
      .openres {
        width: 1.58rem;
        margin-left: 0.38rem;
      }
      .down {
        width: 2.5rem;
        margin-left: 0.38rem;
      }
    }
    ul {
      height: 6rem;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch; //有回弹效果
      -webkit-overflow-scrolling: auto; //滑到哪停到哪
      li {
        min-height: 0.74rem;
        padding: 0.1rem 0;
        display: flex;
        align-items: center;
        font-size: 80%;
        text-align: center;
        color: #f3ef75;
        border-bottom: 0.01rem solid #205c63;
        span {
          margin-left: 0.08rem;
        }
        .time {
          width: 1.72rem;
        }
        .openres {
          width: 1.58rem;
          margin-left: 0.38rem;
        }
        .down {
          color: #ffffff;
          width: 2.5rem;
          margin-left: 0.38rem;
        }
      }
    }
    ul::-webkit-scrollbar {
      width: 0.06rem;
      margin-left: 0.1rem;
    }
    ul::-webkit-scrollbar-thumb {
      background: #22808a;
    }
  }
}
</style>
