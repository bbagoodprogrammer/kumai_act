<template>
  <div class="hsitoryList">
    <i class="close" @click="closePup()"></i>
    <div class="title">開獎明細</div>
    <div class="listTitle">
      <span class="num">獎項</span>
      <span class="nick">獲獎者</span>
      <span class="uid">UID</span>
      <span class="gift">獎品</span>
    </div>
    <p v-if="hList.length == 0" class="noData">暫無數據</p>
    <ul class="scrollable">
      <li v-for="(item,index) in hList" :key="index">
        <span class="num">{{item.type}}</span>
        <span class="nick">{{item.nick}}</span>
        <span class="uid">{{item.uid}}</span>
        <span class="gift">{{item.prize}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import api from "../api/apiConfig"
export default {
  props: ['hList'],
  data() {
    return {
      list: [],
      loaded: false,
      more: true
    }
  },
  mounted() {
    this.scrollable = this.$el.querySelector('.scrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
  },
  methods: {
    closePup() {
      this.$parent.showHistory = false
    },
    onScroll() {
      console.log('xxx')
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
    }  }
}
</script>
<style lang="scss">
.noData {
  text-align: center;
  margin-top: 0.8rem;
}
.hsitoryList {
  width: 7.12rem;
  height: 8.86rem;
  background: url(../assets/img/hsitoryList.png);
  background-size: 100% 100%;
  position: relative;
  .close {
    display: block;
    width: 0.6rem;
    height: 0.57rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    top: -0.2rem;
  }
  .title {
    height: 1.2rem;
    text-align: center;
    line-height: 1.5rem;
    font-size: 0.4rem;
    color: rgba(254, 243, 194, 1);
    font-weight: 500;
  }
  .listTitle {
    padding: 0 0.5rem;
    display: flex;
    align-items: center;
    color: rgba(255, 235, 127, 1);
    font-size: 0.28rem;
    span {
      text-align: center;
    }
    .num {
      width: 1.6rem;
    }
    .nick {
      width: 1.8rem;
    }
    .uid {
      width: 1rem;
    }
    .gift {
      flex: 1;
    }
  }
  ul {
    height: 7rem;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    -webkit-overflow-scrolling: auto;
    padding: 0 0.5rem;
    li {
      color: rgba(238, 172, 104, 1);
      font-size: 0.24rem;
      text-align: center;
      display: flex;
      align-items: center;
      margin-top: 0.4rem;
      .num {
        width: 1.6rem;
      }
      .nick {
        width: 1.8rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .uid {
        width: 1.2rem;
      }
      .gift {
        flex: 1;
      }
    }
  }
}
</style>
