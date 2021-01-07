<template>
  <div class="mask">
    <div class="historyList" :class="{noData: hList.length== 0}">
      <i class="close" @click="closeHistory()"></i>
      <div class="hasData">
        <div class="listHeader" v-if="hList.length != 0">
          <span class="time">{{lang.lickTime}}</span>
          <span class="boxType">{{lang.luckType}}</span>
          <span class="gift">{{lang.luckGift}}</span>
        </div>
        <ul class='scrollable'>
          <li v-for="(item,index) in hList" :key="index">
            <div class="time">{{getDateStr(item.time)}}</div>
            <div class="boxType">{{boxName[item.gid]}}</div>
            <div class="gift">{{item.name}}</div>
          </li>
        </ul>
      </div>
      <div class="noData" v-if="hList.length == 0">
        {{lang.luckNoData}}
      </div>
    </div>
  </div>
</template>
<script>
import { getList } from '../apis';
import getDate from "../utils/getDate"
import { replaceLang } from '../utils';

export default {
  props: ['hList'],
  data() {
    return {
      loaded: false,
      more: true
    }
  },
  computed: {
    boxName() {
      return this.lang.boxName
    }
  },
  mounted() {
    this.scrollable = this.$el.querySelector('.scrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
  },
  methods: {
    getDateStr(tm) {
      let datem = new Date(tm * 1000)
      var year = datem.getFullYear(),
        month = (datem.getMonth() + 1) < 10 ? '0' + (datem.getMonth() + 1) : datem.getMonth() + 1,
        date = datem.getDate() < 10 ? '0' + datem.getDate() : datem.getDate(),
        hours = datem.getHours() < 10 ? '0' + datem.getHours() : datem.getHours(),
        minute = datem.getMinutes() < 10 ? '0' + datem.getMinutes() : datem.getMinutes(),
        second = datem.getSeconds() < 10 ? '0' + datem.getSeconds() : datem.getSeconds();
      return replaceLang(this.lang.time, year, month, date, hours, minute, second)
    },
    onScroll() {
      console.log('xxx')
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.loaded) return
        if (this.more) {
          this.more = false
          getList(this.hList.length, 'more').then(res => {
            this.more = true
            if (res.data.response_data.list.length === 0) {
              this.loaded = true
            } else {
              this.$emit('addhList', res.data.response_data.list)
            }
          })
        }
      }
    },
    closeHistory() {
      this.$parent.showHistoryList = false
      this.loaded = false
    }
  }
}
</script>
<style lang="scss">
.historyList {
  width: 6.52rem;
  height: 8.2rem;
  padding: 3rem 0.3rem 0;
  text-align: center;
  position: relative;
  .listHeader {
    display: flex;
    align-items: center;
    font-size: 0.28rem;
    margin: 0.15rem 0;
  }
  ul {
    max-height: 7rem;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    -webkit-overflow-scrolling: auto;
  }
  li {
    display: flex;
    align-items: center;
    font-size: 0.22rem;
    margin-bottom: 0.3rem;
  }
  .time {
    width: 1.8rem;
  }
  .boxType {
    width: 2rem;
  }
  .gift {
    flex: 1;
  }
}
.noData {
  //   margin-top: 0.5rem;
}
.close {
  display: block;
  width: 0.56rem;
  height: 0.56rem;
  background: url(../img/close.png);
  background-size: 100% 100%;
  position: absolute;
  right: 0rem;
  top: 2rem;
}
</style>
