<template>
  <div class="rank">
    <div class="rankHeader">
      <div class="tabs">
        <span @click="closeRank()" class="closeIcon"></span>
        القائمة
        <i class="tipsIcon" @click="showTips()"></i>
        <em class="liner"></em>
        <i class="linerItem"></i>
      </div>
    </div>
    <div class="timer">
      <span>{{surplusTime.day}} أيام {{surplusTime.hour}}:{{surplusTime.minute}}:{{surplusTime.second}}</span>
      <em>، ستجدد القائمة بعد هذا الوقت</em>
    </div>
    <ul class="rankList scrollable">
      <li v-for="(item,index) in rank" :key="index" :class="'rank' + item.rank">
        <div class="itemRank">{{item.rank}}</div>
        <img v-lazy="item.avatar" alt="">
        <div class="userMsg">
          <div class="name">{{item.nick}}</div>
          <div class="score">قيم الجوائز: {{item.score}}</div>
        </div>
        <div class="giftArr">
          <span v-for="(item2,key2) in item.gift_infos" :key="key2">
            <img :src="getGiftItem(item2.gift_id)" alt="">
            <em class="giftTotalNum">{{getNum(item2.count,item2.gift_id)}}</em>
          </span>
        </div>
      </li>
      <div class="rankLoading" v-show="loadingShow">في التحميل...</div>
      <div class="noData" v-show="noData">لا توجد البيانات الآن!</div>
      <div class="dataEnd" v-show="dataEnd">تُظهَر المراكز 1-100 فقط!</div>
    </ul>
    <div class="rankTips" v-show="showRankTips">
      <transition name="slide">
        <!-- <div class="rankTips" v-show="showRankTips"> -->
        <div class="rankTipsCon" v-show="showRankTips">
          <span class="closeTips" @click="closeTips()"></span>
          <h3>وصف القائمة</h3>
          <p>تجدد القائمة كل أسبوع، ويُستخدم تقويت دبي موحدا</p>
        </div>
        <!-- </div> -->
      </transition>
    </div>

  </div>
</template>
<script>
import api from "../api/apiConfig"
import { mergeGiftNum } from "../config/wardImg"
import downTime from "../utils/downTime"
export default {
  data() {
    return {
      more: true,
      rank: [],
      loadingShow: false,
      noData: false,
      dataEnd: false,
      second: 0,
      timer: null,
      surplusTime: {}, //倒计时对象
      showRankTips: false
    }
  },
  created() {
    this.init()
  },
  mounted() {
    this.scrollable = this.$el.querySelector('.scrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
  },
  watch: {
    second(val) {
      this.downTimeGo('timer1', val)
    }
  },
  methods: {
    init() {
      this.loadingShow = true
      api.getRank(0).then(res => {
        this.loadingShow = false
        const { response_status, response_data } = res.data
        if (response_status.code == 0) {
          this.rank = response_data.rank
          this.second = response_data.second
          if (this.rank.length == 0) {
            this.noData = true
          }
        }
      })
    },
    downTimeGo(timeName, val) {
      clearInterval(this.timer)
      if (!downTime(timeName)) {
        downTime(timeName, val);
      }
      this.surplusTime = downTime(timeName);
      this.timer = setInterval(() => {
        this.surplusTime = downTime(timeName);
        if (this.surplusTime.end) { //倒计时结束重新掉接口
          this.init()
        }
      }, 1000)
    },
    onScroll() {
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.dataEnd || this.noData) return
        if (this.more) {
          this.more = false
          api.getRank(this.rank.length, 'more').then(res => {
            this.more = true
            if (res.data.response_data.rank.length === 0 && this.rank.length == 100) {
              this.dataEnd = true
            } else if (res.data.response_data.rank.length === 0 && this.rank.length < 100) {
              this.noData = true
            } else {
              this.rank = this.rank.concat(res.data.response_data.rank)
            }
          })
        }
      }
    },
    getGiftItem(key) {
      return mergeGiftNum[key]
    },
    getNum(item, key) {
      if (key == 104 || key == 107) {  //天数礼物
        return `x${item}day`
      } else {
        return `x${item}`
      }
    },
    showTips() {
      this.showRankTips = true
    },
    closeTips() {
      this.showRankTips = false
    },
    closeRank() {
      this.$emit('closeRank')
    }
  }
}
</script>
<style lang= "scss" scoped>
.rank {
  width: 7.5rem;
  height: 9rem;
  background: #4f0078;
  overflow-x: hidden;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  .rankHeader {
    .tabs {
      width: 6.17rem;
      height: 0.96rem;
      margin: 0 auto;
      text-align: center;
      line-height: 0.96rem;
      font-size: 120%;
      color: #fff9a0;
      position: relative;
      /* display: flex;
      align-items: center;
      justify-content: center; */
      .closeIcon {
        display: block;
        width: 0.18rem;
        height: 0.3rem;
        background: url(../assets/img/backArrow.png);
        background-size: 100% 100%;
        position: absolute;
        top: 0.34rem;
        right: -0.42rem;
        transform: rotate(180deg);
      }
      .tipsIcon {
        display: inline-block;
        width: 0.35rem;
        height: 0.35rem;
        position: absolute;
        top: 0.33rem;
        left: 2.1rem;
        background: url(../assets/img/tipsIcon.png);
        background-size: 100% 100%;
      }
      .liner {
        display: block;
        width: 100%;
        height: 0.02rem;
        position: absolute;
        bottom: 0;
        background: rgba(255, 255, 255, 1);
        opacity: 0.05;
      }
      .linerItem {
        display: block;
        width: 0.68rem;
        height: 0.02rem;
        background: #dcd097;
        opacity: 0.5;
        position: absolute;
        left: 2.75rem;
        bottom: 0;
      }
    }
  }
  .timer {
    text-align: center;
    margin-top: 0.12rem;
    span {
      font-size: 93%;
      color: #bbfdff;
    }
    em {
      font-size: 60%;
      display: block;
    }
  }
  .rankTips {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10000;
  }
  .rankTipsCon {
    width: 5.02rem;
    height: 1.78rem;
    padding-top: 0.62rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.26rem;
    position: absolute;
    top: 2.38rem;
    left: 1.21rem;
    /* transform: translate(-50%, 0); */
    .closeTips {
      display: block;
      width: 0.41rem;
      height: 0.41rem;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.07rem;
      right: 0.12rem;
    }
    h3 {
      font-size: 120%;
      color: #262626;
      text-align: center;
    }
    p {
      margin-top: 0.19rem;
      padding: 0 0.3rem;
      font-size: 72%;
      color: #4d4d4d;
      text-align: center;
    }
  }
  .rankList {
    margin: 0 auto 0;
    width: 7.08rem;
    height: 6.5rem;
    overflow-y: scroll;
    overflow-scrolling: touch;
    -webkit-overflow-scrolling: touch;
    padding: 0 0 0.15rem 0.1rem;
    li {
      height: 1.28rem;
      margin-top: 0.19rem;
      display: flex;
      align-items: center;
      background: url(../assets/img/rankItemBg.png);
      background-size: 100% 100%;
      .itemRank {
        width: 0.5rem;
        height: 0.5rem;
        font-size: 120%;
        font-weight: 500;
        color: #deb0ff;
        margin: 0 0.1rem 0 0.2rem;
        text-align: center;
        line-height: 0.5rem;
      }
      > img {
        width: 0.7rem;
        height: 0.7rem;
        border-radius: 50%;
        border: 0.02rem solid #f7e6c4;
      }
      .userMsg {
        width: 2.6rem;
        height: 0.7rem;
        margin-right: 0.1rem;
        .name {
          height: 50%;
          line-height: 0.35rem;
          font-size: 83%;
          max-width: 2.6rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .score {
          height: 50%;
          line-height: 0.35rem;
          font-size: 60%;
          color: #fff8bb;
          white-space: nowrap;
        }
      }
      .giftArr {
        width: 3.2rem;
        display: flex;
        align-items: center;
        margin-left: 0.2rem;
        span {
          width: 0.95rem;
          height: 0.7rem;
          position: relative;
          img {
            width: 100%;
            height: 100%;
          }
          .giftTotalNum {
            position: absolute;
            right: 0.05rem;
            bottom: 0rem;
            font-size: 70%;
            /* transform: scale(0.8); */
            /* font-style: italic; */
            color: #ff37d2;
            -webkit-text-stroke: 0.005rem #fff;
            text-stroke: 0.005rem #fff;
          }
        }
      }
      &.rank1 {
        background: url(../assets/img/rankTop1Bg.png);
        background-size: 100% 100%;
        .itemRank {
          width: 0.44rem;
          height: 0.49rem;
          background: url(../assets/img/top1.png);
          background-size: 100% 100%;
          margin: 0 0.15rem 0 0.21rem;
        }
      }
      &.rank2 {
        background: url(../assets/img/rankTop2Bg.png);
        background-size: 100% 100%;
        .itemRank {
          width: 0.44rem;
          height: 0.49rem;
          background: url(../assets/img/top2.png);
          background-size: 100% 100%;
          margin: 0 0.15rem 0 0.21rem;
        }
      }
      &.rank3 {
        background: url(../assets/img/rankTop3Bg.png);
        background-size: 100% 100%;
        .itemRank {
          width: 0.44rem;
          height: 0.49rem;
          background: url(../assets/img/top3.png);
          background-size: 100% 100%;
          margin: 0 0.15rem 0 0.21rem;
        }
      }
    }
  }
  .rankList::-webkit-scrollbar {
    width: 0.04rem;
    background: rgba(0, 0, 0, 1);
    opacity: 0.1;
    border-radius: 0.02rem;
  }
  .rankList::-webkit-scrollbar-thumb {
    width: 0.04rem;
    background: rgba(0, 0, 0, 1);
    opacity: 0.2;
    border-radius: 0.02rem;
  }
  .rankLoading {
    text-align: center;
    margin-top: 0.1rem;
  }
  .noData {
    text-align: center;
    margin-top: 0.1rem;
  }
  .dataEnd {
    text-align: center;
    margin-top: 0.1rem;
  }
}
</style>
