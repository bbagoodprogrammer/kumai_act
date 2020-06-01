<template>
  <div class="taskList">
    <div class="title">{{lang.hsitoryTitle}}</div>
    <div class="list">
      <div class="tab">
        <span class="time">{{lang.time}}</span>
        <span class="code">{{lang.stone}}</span>
        <span class="score">{{lang.score2}}</span>
      </div>
      <div class="listItem">
        <p v-if="taskList.length == 0" class="noData">{{lang.noDate}}</p>
        <ul class="scrollable">
          <li v-for="(item,index) in taskList" :key="index">
            <span class="time">{{getTime(item.time)}}</span>
            <span class="code" v-if="item.pid == -1">{{lang.noPeople}}</span>
            <span class="code" v-else>{{pidArr[item.pid]?pidArr[item.pid]:lang.getPeople}}</span>
            <span class="score">{{item.wealth}}</span>
          </li>
        </ul>
      </div>
    </div>
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
      taskList: [],
      pidArr: {
        1: 'Emas kecil',
        2: 'Emas tengah',
        3: 'Emas besar',
        4: 'Batu kecil',
        5: 'Batu besar',
        6: 'Intan kecil ',
        7: 'Intan besar',
        8: 'Permata misterius'
      },
      loaded: false,
      more: true
    }
  },
  created() {
    document.title = 'Catatan emnggali harta karun'
    sessionStorage.setItem("need-refresh", true);
    api.getHistory(0).then(res => {
      this.taskList = res.data.response_data.list
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
          api.getHistory(this.taskList.length, 'more').then(res => {
            this.more = true
            if (res.data.response_data.list.length === 0) {
              this.loaded = true
            } else {
              this.taskList = this.taskList.concat(res.data.response_data.list)
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
  background-color: #331106;
  .taskList {
    padding: 0.59rem 0.19rem 0;
    .title {
      text-align: center;
      font-size: 0.36rem;
      font-weight: 700;
      color: rgba(255, 240, 157, 1);
      -webkit-text-stroke: 1px #6d2c06;
      text-stroke: 1px #6d2c06;
    }
    .list {
      padding: 0 0.17rem;
      margin: 0.5rem auto;
      .tab {
        display: flex;
        padding: 0 0.24rem;
        span {
          color: #ffeccc;
          font-size: 0.26rem;
          text-align: center;
          flex: 1;
          font-weight: bold;
        }
        .time {
          flex: 2;
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
          font-size: 0.24rem;
          margin-bottom: 0.06rem;
          span {
            flex: 1;
            width: 50%;
            color: #f58662;
          }
          .time {
            font-size: 0.24rem;
            padding: 0 0.14rem;
            white-space: nowrap;
            flex: 2;
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
