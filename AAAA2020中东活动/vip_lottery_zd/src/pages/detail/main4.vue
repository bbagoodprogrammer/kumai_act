<template>
  <div class="taskList">
    <div class="title">{{lang.detailTitle}}</div>
    <div class="tabs">
      <span :class="{act:type == 1}" @click="tabClick(1)">كشط صورة</span>
      <span :class="{act:type == 2}" @click="tabClick(2)">معدل تقدم المرة</span>
    </div>
    <div class="list">
      <div class="tab">
        <span class="time">{{lang.detailTime}}</span>
        <span class="code">{{lang.detailGifts}}</span>
        <span class="state">{{lang.detailState}}</span>
      </div>
      <div class="listItem">
        <p v-if="newList.length == 0" class="noData">{{lang.noData}}</p>
        <ul class="scrollable">
          <li v-for="(item,index) in newList" :key="index">
            <span class="time">{{getTime(type==1?item.add_time:item.time)}}</span>
            <span class="code">
              <em v-if="type==1">{{item.pname}}</em>
              <em v-else>
                <i v-for="(item2,index2) in item.prizes" :key="index2">{{item2.pname}}</i>
              </em>
            </span>
            <span class="state">
              <!--  v-if="item.status == 2"  -->
              <em class="end">{{lang.giftEnd}}</em>
            </span>
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
import getAppUaInfo from "../../utils/getAppUaInfo"
import getDate from "../../utils/getDate"
export default {
  components: { loading, MsgToast },
  data() {
    return {
      type: 1,
      taskList: [],
      giftList: {
        loadCount: 0,
        list: []
      },
      tastMsg: '',
      showT: false,
      loaded: false,
      loaded2: false,
      more: true
    }
  },
  computed: {
    newList() {
      if (this.type == 1) {
        return this.taskList
      } else {
        return this.giftList.list
      }
    }
  },
  created() {
    api.detail(0, 0).then(res => {
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
    tabClick(val) {
      if (val == 2 && this.giftList.loadCount == 0) {
        api.totalGift(0).then(res => {
          this.type = val
          this.giftList.list = res.data.response_data.list
          this.giftList.loadCount++
        })
      } else {
        this.type = val
      }

    },
    onScroll() {
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        let load = this.type == 1 ? this.loaded : this.loaded2
        if (load) return
        if (this.more) {
          this.more = false
          if (this.type == 1) {
            api.detail(0, this.taskList.length, 'more').then(res => {
              this.more = true
              if (res.data.response_data.list.length === 0) {
                this.loaded = true
              } else {
                this.taskList = this.taskList.concat(res.data.response_data.list)
              }
            })
          } else {
            api.totalGift(this.giftList.list.length, 'more').then(res => {
              this.more = true
              if (res.data.response_data.list.length === 0) {
                this.loaded2 = true
              } else {
                this.giftList.list = this.giftList.list.concat(res.data.response_data.list)
              }
            })
          }

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
  background-color: #2b2621;
  direction: rtl;
  .tabs {
    width: 6.98rem;
    height: 0.98rem;
    line-height: 0.98rem;
    background: url(../../assets/img/tabs.png);
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    margin-top: 0.27rem;
    span {
      flex: 1;
      height: 100%;
      text-align: center;
      color: rgba(174, 72, 0, 1);
      font-weight: bold;
      &.act {
        background: url(../../assets/img/tabAct.png);
        background-size: 100% 100%;
      }
    }
  }
  .taskList {
    padding: 0.59rem 0.19rem 0;
    .title {
      text-align: center;
      font-size: 0.48rem;
      color: #faf9a7;
      font-weight: 600;
    }
    .list {
      width: 7.12rem;
      margin: 0.3rem auto;
      .tab {
        display: flex;
        padding: 0 0.24rem;
        span {
          color: #fff8a8;
          font-size: 0.26rem;
          text-align: center;
        }
        .time {
          width: 2.4rem;
        }
        .code {
          width: 2.4rem;
        }
        .state {
          flex: 1;
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
        background: url(../../assets/img/listBg.png) no-repeat;
        background-size: 100% auto;
        padding: 0.28rem 0.24rem;
        ul {
          max-height: 8.6rem;
          overflow-x: hidden;
          overflow-y: scroll;
          -webkit-overflow-scrolling: touch;
          -webkit-overflow-scrolling: auto;
        }
        li {
          width: 6.65rem;
          height: 1.14rem;
          background: url(../../assets/img/detail.png);
          background-size: 100% 100%;
          display: flex;
          text-align: center;
          line-height: 1.1rem;
          font-size: 0.24rem;
          margin-bottom: 0.06rem;
          .time {
            width: 2.3rem;
            font-size: 0.24rem;
            padding: 0 0.14rem;
            white-space: nowrap;
          }
          .code {
            color: #ffe992;
            width: 1.9rem;
            padding: 0 0.05rem;
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 0.3rem;
            text-align: center;
            i {
              display: block;
            }
          }
          .state {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            .end {
              font-size: 0.24rem;
            }
          }
        }
      }
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
