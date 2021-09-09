<template>
  <div class="userHistoryList">
    <div class="title"><i @click="$parent.showUserHistrry = false"></i>{{lang.histroyTitle}}</div>
    <p v-if="!list.length" class="noData">{{lang.noData}}</p>
    <div class="historyScorll">
      <div class="giftItem" v-for="(item,index) in list " :key="index" @click="showCode(item)">
        <div class="giftImg">
          <div class="day" v-if="item.prize_type == -1 && item.prize_nums!=1">x{{item.prize_nums}}</div>
          <div class="day" v-else-if="item.prize_type != -1">{{item.prize_days}}{{lang.day}}</div>
          <img :src="item.prize_image" alt="">
          <div class="price"><i></i><em>{{item.prize_price}}</em></div>
        </div>
        <div class="giftMsg">
          <div class="giftName">
            <div class="name" style="-webkit-box-orient: vertical;">{{item.prize_name}}</div>
            <div class="giftType" :class="{gift:item.prize_type == -1}">{{typeTips[item.prize_type]}}</div>
          </div>
          <div class="numsTips">
            <div class="getNums"><strong>{{lang.getSuc.replace('%s',item.used_voucher_cnt)}} </strong><span v-if="item.used_voucher_cnt">{{lang.number}}</span></div>
            <div class="giftDownTm">
              {{item.etime_md}}
            </div>
          </div>
        </div>

        <div class="status">
          <em v-if="item.ing == 1">{{lang.status1}}</em>
          <em v-else-if="item.prize_uid == uid && item.ing == 2">{{lang.status2}}</em>
          <em v-else-if="item.prize_uid != uid && item.ing == 2">{{lang.status3}}</em>
          <em v-else>{{lang.status4}}</em>
        </div>
      </div>
    </div>
    <transition name="moveR">
      <GiftNumbers v-if="showCodePup" :codeItem="codeItem" />
    </transition>
  </div>
</template>

<script>

import { userHistory } from "../apis"
import GiftNumbers from "./GiftNumbers"
import { getUrlString } from "../utils"
export default {
  components: { GiftNumbers },
  data () {
    return {
      list: [],
      codeItem: {},
      showCodePup: false,
      page: 0
    }
  },
  computed: {
    typeTips () {
      return this.lang.typeTips
    },
    uid () {
      return getUrlString("uid") || "";
    }
  },
  mounted () {
    this.scrollable = this.$el.querySelector('.historyScorll');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
    setTimeout(() => {
      userHistory(1).then(res => {
        // res.data.response_data.rows
        this.list = res.data.response_data.rows
        this.page++
      })
    }, 0)
  },
  methods: {
    showCode (item) {
      this.codeItem = item
      this.showCodePup = true
    },
    onScroll () {
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.loaded) return
        if (this.more) {
          this.more = false
          userHistory(++this.page, 'more').then(res => {
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
  }
}
</script>

<style lang="scss" scoped>
.userHistoryList {
  width: 7.5rem;
  height: 9.31rem;
  background: url(../img/pupBg.png);
  background-size: 100% 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  .noData {
    text-align: center;
    margin-top: 0.3rem;
  }
  .title {
    height: 0.98rem;
    display: flex;
    align-items: center;
    font-size: 0.36rem;
    i {
      width: 0.48rem;
      height: 0.48rem;
      background: url(../img/black.png);
      background-size: 100% 100%;
      margin: 0 0.08rem 0 0.32rem;
    }
  }
  .historyScorll {
    max-height: 8.33rem;
    overflow-y: scroll;
  }
  .giftItem {
    width: 7.18rem;
    height: 2.08rem;
    background: url(../img/listBg.png);
    background-size: 100% 100%;
    margin-top: 0.08rem;
    display: flex;
    align-items: center;
    position: relative;
    margin-bottom: 0.16rem;
    .giftImg {
      width: 1.93rem;
      height: 1.59rem;
      padding-top: 0.09rem;
      background: url(../img/listImgBg.png);
      background-size: 100% 100%;
      margin-left: 0.1rem;
      position: relative;
      > img {
        width: 1.44rem;
        height: 1.44rem;
        margin-left: 0.25rem;
      }
      .day {
        display: block;
        width: 0.64rem;
        height: 0.26rem;
        background: linear-gradient(
          -240deg,
          rgba(255, 255, 255, 0.3),
          rgba(255, 255, 255, 0)
        );
        border-radius: 0.13rem 0 0 0.13rem;
        position: absolute;
        top: 0.08rem;
        right: 0.01rem;
        font-size: 0.18rem;
        //   font-weight: bold;
        text-align: center;
        line-height: 0.26rem;
      }
      .price {
        width: 1.73rem;
        padding-right: 0.2rem;
        height: 0.36rem;
        background: url(../img/priceBg.png);
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: 0;
        left: 0;
        i {
          width: 0.24rem;
          height: 0.24rem;
          background: url(../img/coinsIcon.png);
          background-size: 100% 100%;
          margin-right: 0.05rem;
        }
        em {
          color: #FFB81E;
          font-size: 0.24rem;
        }
      }
    }
    .giftImg::before {
      content: '';
      display: block;
      width: 2.05rem;
      height: 1.81rem;
      background: url(../img/imgZc.png);
      background-size: 100% 100%;
      position: absolute;
      top: -0.06rem;
      left: -0.05rem;
      z-index: 5;
    }
    .giftMsg {
      height: 100%;
      margin-left: 0.18rem;
      .giftName {
        height: 0.4rem;
        margin-top: 0.35rem;
        display: flex;
        align-items: center;
        .name {
          max-width: 2.3rem;
          font-size: 0.32rem;
          font-weight: bold;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          /* autoprefixer: off */
          -webkit-box-orient: vertical;
          /* autoprefixer: on */
        }
        .giftType {
          padding: 0 0.06rem;
          height: 0.26rem;
          line-height: 0.26rem;
          background: linear-gradient(90deg, #4D91FF, #55DBFD);
          border-radius: 0.05rem;
          font-size: 0.2rem;
          text-align: center;
          margin: 0.05rem 0 0 0.06rem;
          &.gift {
            background: linear-gradient(90deg, #EF52EF, #F87053);
          }
        }
      }
    }
    .numsTips {
      width: 4.5rem;
      height: 0.36rem;
      //   margin-top: 0.6rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: absolute;
      bottom: 0.36rem;
      .getNums {
        display: flex;
        align-items: center;
        > strong {
          font-size: 0.24rem;
          color: rgba(255, 255, 255, 0.6);
        }
        > span {
          //   width: 0.56rem;
          padding: 0 0.06rem;
          height: 0.28rem;
          border: 1px solid rgba(255, 184, 30, 0.3);
          border-radius: 0.14rem;
          font-size: 0.2rem;
          color: #FFB81E;
          margin-left: 0.09rem;
        }
      }
      .giftDownTm {
        height: 0.36rem;
        line-height: 0.36rem;
        font-size: 0.24rem;
        color: rgba(255, 255, 255, 0.6);
        text-align: right;
      }
    }

    .status {
      width: 1.6rem;
      text-align: right;
      color: rgba(255, 255, 255, 0.3);
      position: absolute;
      top: 0.41rem;
      right: 0.32rem;
      em {
        font-size: 0.36rem;
        line-height: 0.4rem;
        font-weight: bold;
      }
    }
  }
}
</style>