<template>
  <div class="taskList">
    <div class="title">{{lang.detailTitle}}</div>
    <div class="list">
      <div class="tab">
        <span class="time">{{lang.detailTime}}</span>
        <span class="code">{{lang.detailGifts}}</span>
      </div>
      <div class="listItem">
        <p v-if="taskList.length == 0" class="noData">{{lang.noData}}</p>
        <ul class="scrollable">
          <li v-for="(item,index) in taskList" :key="index">
            <span class="time">{{getTime(item.time)}}</span>
            <span class="code">{{item.score}} điểm</span>
          </li>
        </ul>
      </div>
    </div>
    <loading />
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
  </div>
</template>
<script>
import api from "../../api/apiConfig"
import loading from "../../components/Loading"
import { globalBus } from '../../utils/eventBus'
import MsgToast from "../../components/commonToast"
import getString from "../../utils/getString"
import getDate from "../../utils/getDate"
export default {
  components: { loading, MsgToast },
  data() {
    return {
      taskList: [],
      tastMsg: '',
      showT: false,
      loaded: false,
      more: true
    }
  },
  created() {
    api.getDetail(0).then(res => {
      this.taskList = res.data.response_data.detail
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
          api.getDetail(this.taskList.length, 'more').then(res => {
            this.more = true
            if (res.data.response_data.list.length === 0) {
              this.loaded = true
            } else {
              this.taskList = this.taskList.concat(res.data.response_data.detail)
            }
          })
        }
      }
    },
    getTime(tm) {
      return getDate(new Date(tm * 1000), '~')
    },
    closeToast() {
      this.showT = false
    },
  }
}
</script>
<style lang="scss">
body {
  background-color: #0e7571;
  .taskList {
    padding: 0.59rem 0.19rem 0;
    .title {
      text-align: center;
      font-size: 0.36rem;
      color: #64ffe0;
      font-weight: bold;
    }
    .list {
      width: 5.12rem;
      margin: 0.5rem auto;
      .tab {
        display: flex;
        padding: 0 0.24rem;
        span {
          color: #64ffe0;
          font-size: 0.26rem;
          text-align: center;
          flex: 1;
          font-weight: bold;
        }
        .code {
          text-indent: 0.3rem;
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
        padding: 0.28rem 0.24rem;
        ul {
          max-height: 8.6rem;
          overflow-x: hidden;
          overflow-y: scroll;
          -webkit-overflow-scrolling: touch;
          -webkit-overflow-scrolling: auto;
        }
        li {
          display: flex;
          align-items: center;
          text-align: center;
          font-size: 0.24rem;
          margin-bottom: 0.06rem;
          span {
            flex: 1;
            width: 50%;
            color: #b7fff1;
          }
          .time {
            font-size: 0.24rem;
            padding: 0 0.14rem;
            white-space: nowrap;
          }
          .code {
            padding: 0 0.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 0.3rem;
            text-align: center;
          }
        }
      }
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
