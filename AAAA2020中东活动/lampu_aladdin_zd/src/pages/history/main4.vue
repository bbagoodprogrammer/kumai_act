<template>
  <div class="history">
    <div class="title">سجل المصباح السحري</div>
    <div class="giftlist">
      <div class="listTitle">
        <span class="time">الوقت</span>
        <span class="type">طريقة الحصول</span>
        <span class="gift">المكافأة</span>
      </div>
      <ul class="scrollable">
        <li v-for="(item,index) in record" :key="index">
          <span class="time">{{getDate(item.time)}}</span>
          <span class="type">{{item.type}}</span>
          <span class="gift">
            <strong v-for="(item,index) in item.prize" :key="index">
              {{item}}
            </strong>
          </span>
        </li>
      </ul>
      <p v-if="record.length == 0" class="noDate">لا يوجد سجل المكافآت الآن</p>
    </div>
    <Loading></Loading>
  </div>
</template>
<script>
import api from "../../api/apiConfig"
import Loading from "../../components/Loading"
import getDate from "../../utils/getDate"
export default {
  components: { Loading },
  data() {
    return {
      record: [],
      loaded: false,
      more: true
    }
  },
  created() {
    document.title = 'سجل المصباح السحري'
    api.getHistory(0).then(res => {
      this.record = res.data.response_data.list
    })
  },
  mounted() {
    this.scrollable = this.$el.querySelector('.scrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
  },
  methods: {
    getDate(tm) {
      return getDate(new Date(tm * 1000), 2)
    },
    onScroll() {
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.loaded) return
        if (this.more) {
          this.more = false
          api.getHistory(this.record.length, 'more').then(res => {
            this.more = true
            if (res.data.response_data.list === 0) {
              this.loaded = true
            } else {
              this.record = this.record.concat(res.data.response_data.list)
            }
          })
        }
      }
    },
  }
}
</script>
<style lang= "scss">
body {
  background: #48008c;
  direction: rtl;
  .history {
    padding: 0.34rem 0.21rem;
  }
  .title {
    width: 4.86rem;
    height: 0.9rem;
    line-height: 0.9rem;
    margin: 0.29rem auto 0;
    text-align: center;
    color: #ffeabe;
    font-size: 0.36rem;
    color: #ffb922;
    font-weight: 800;
  }
  .giftlist {
    margin-top: 0.38rem;
    width: 7rem;
    .listTitle {
      height: 0.7rem;
      line-height: 0.7rem;
      color: #c6a3ff;
      display: flex;
      text-align: center;
      font-size: 0.24rem;
      font-weight: 600;
      .time {
        width: 3rem;
      }
      .type {
        width: 1.3rem;
      }
      .gift {
        flex: 1;
      }
    }
    ul {
      max-height: 9rem;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch; //有回弹效果
      -webkit-overflow-scrolling: auto; //滑到哪停到哪
      li {
        display: flex;
        align-items: center;
        color: #e7d7ff;
        font-size: 73%;
        min-height: 0.45rem;
        text-align: center;
        margin-bottom: 0.06rem;
        .time {
          width: 3rem;
        }
        .type {
          width: 1.3rem;
        }
        .gift {
          flex: 1;
          strong {
            font-size: 0.22rem;
            display: block;
          }
        }
      }
    }
    .noDate {
      text-align: center;
      color: #c6a3ff;
      margin-top: 0.2rem;
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
