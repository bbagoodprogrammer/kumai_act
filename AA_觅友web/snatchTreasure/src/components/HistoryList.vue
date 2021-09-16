<template>
  <div class="historyList">
    <p v-if="!list.length" class="noData">{{lang.noData}}</p>
    <ul class='historyScrollable'>
      <li v-for="(item,index) in list " :key="index">
        <div class="giftImg">
          <div class="day" v-if="item.prize_type == -1 && item.prize_nums!=1">x{{item.prize_nums}}</div>
          <div class="day" v-else-if="item.prize_type != -1">{{item.prize_days}}{{lang.day}}</div>
          <img :src="item.prize_image" alt="">
          <div class="price"><i></i><em>{{item.prize_price}}</em></div>
        </div>
        <div class="giftMsg">
          <div class="giftName">
            <div class="giftShow">
              <div class="name" style="-webkit-box-orient: vertical;">{{item.prize_name}}</div>
              <div class="giftType" :class="{gift:item.prize_type == -1}">{{typeTips[item.prize_type]}}</div>
            </div>
            <div class="giftDownTm">
              <span>{{item.etime_md}}</span>
            </div>
          </div>
        </div>
        <div class="userLuck">
          <div class="luckUserMsg">
            <img v-lazy="item.avatar" class="av" alt="" @click="goUser(item.prize_uid)">
            <div class="nick"><strong>{{item.nick}}</strong>{{lang.userLuck}}</div>
          </div>
          <div class="luckNumber">
            {{lang.luckNumber}}{{item.prize_voucher}}
          </div>
        </div>

      </li>
    </ul>
  </div>
</template>

<script>
import { historyList } from "../apis"
export default {
  data () {
    return {
      list: [],
      loaded: false,
      more: true,
      page: 1
    }
  },
  computed: {
    typeTips () {
      return this.lang.typeTips
    }
  },
  mounted () {
    historyList(this.page).then(res => {
      // res.data.response_data.rows
      this.list = res.data.response_data.rows
    })
    this.scrollable = this.$el.querySelector('.historyScrollable');
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
          historyList(++this.page, 'more').then(res => {
            this.more = true
            if (res.data.response_data.rows.length === 0) {
              this.loaded = true
            } else {
              this.list = this.list.concat(res.data.response_data.rows)
            }
          })
        }
      }
    },
    goUser (uid) { //跳转
      var isiOS = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      if (isiOS) {
        sendJsData('app://userInfo?uid=' + uid);
      } else {
        javascript: JSInterface.sendJsData('app://userInfo?uid=' + uid);
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.historyList {
  .noData {
    text-align: center;
    margin-top: 0.3rem;
  }
  ul {
    margin-top: 0.22rem;
    height: 7.06rem;
    overflow-y: scroll;
    li {
      width: 7.18rem;
      height: 2.08rem;
      background: url(../img/listBg.png);
      background-size: 100% 100%;
      margin-bottom: 0.1rem;
      display: flex;
      align-items: center;
      position: relative;
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
        flex: 1;
        height: 100%;
        margin-left: 0.18rem;
        .giftName {
          width: 100%;
          height: 0.6rem;
          margin-top: 0.2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .giftShow {
            height: 100%;
            display: flex;
            align-items: center;
          }
          .name {
            max-width: 1.6rem;
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
            margin-left: 0.06rem;
            &.gift {
              background: linear-gradient(90deg, #EF52EF, #F87053);
            }
          }
        }
      }
      .userLuck {
        width: 4.65rem;
        height: 0.69rem;
        background: url(../img/userLuckBg.png);
        background-size: 100% 100%;
        position: absolute;
        right: 0.14rem;
        bottom: 0.23rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .luckUserMsg {
          display: flex;
          align-items: center;
          img {
            width: 0.36rem;
            height: 0.36rem;
            border: 1px solid #fff;
            border-radius: 50%;
            margin-left: 0.18rem;
          }
          .nick {
            font-size: 0.2rem;
            font-weight: bold;
            margin-left: 0.08rem;
            display: flex;
            align-items: center;
            white-space: nowrap;
            strong {
              display: block;
              font-size: 0.2rem;
              max-width: 1rem;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              color: #7E1EE5;
            }
          }
        }
        .luckNumber {
          white-space: nowrap;
          font-size: 0.2rem;
          font-weight: bold;
          margin-right: 0.25rem;
        }
      }
      .giftDownTm {
        display: flex;
        align-items: center;
        height: 0.36rem;
        font-size: 0.2rem;
        color: rgba(255, 255, 255, 0.6);
        margin-right: 0.28rem;
        i {
          width: 0.36rem;
          height: 0.36rem;
          background: url(../img/clock.png);
          background-size: auto 100%;
          margin-right: 0.06rem;
        }
      }
    }
  }
}
</style>