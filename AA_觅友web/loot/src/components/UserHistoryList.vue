<template>
  <div class="userHistoryList">
    <div class="title"><i @click="$parent.showUserHistrry = false"></i>奪寶記錄</div>
    <div class="historyScorll">
      <div class="giftItem" v-for="(item,index) in list " :key="index">
        <div class="giftImg">
          <div class="day">{{item.prize_type == -1?`x${item.prize_nums}`:`${item.prize_days}天`}}</div>
          <img :src="item.prize_image" alt="">
          <div class="price"><i></i><em>{{item.prize_price}}</em></div>
        </div>
        <div class="giftMsg">
          <div class="giftName">
            <div class="name">{{item.prize_name}}</div>
            <div class="giftType" :class="{gift:item.prize_type == -1}">{{typeTips[item.prize_type]}}</div>
          </div>
          <div class="getNums"><strong>已奪寶{{item.used_voucher_cnt}}次</strong><span v-if="item.used_voucher_cnt" @click="showCode(item)">號碼</span></div>
        </div>

        <div class="giftDownTm">
          <span>{{item.etime}}</span>
        </div>
        <div class="status">
          <em v-if="item.ing == 1">進行中</em>
          <em v-else-if="item.ing == 2">成功</em>
          <em v-else-if="item.ing == 5">失敗</em>
          <em v-else>取消</em>
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

export default {
  components: { GiftNumbers },
  data () {
    return {
      list: [],
      typeTips: {
        '-1': '禮物',
        '0': '頭像框',
        '1': '座駕',
        '2': '磚戒',
        '3': '主題',
        '4': '活動稱號',
        '5': '進場秀',
        '6': '氣泡框',
      },
      codeItem: {},
      showCodePup: false,
      page: 0
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
        this.list = [
          {
            id: 2,//id 寻宝id
            ing: 2, //1进行中 2正常结束 3、4后台终止
            prize_type: 2, // -1礼物 0头框 1座驾 2钻戒 3主题 4活动称号 5进场秀 6气泡框
            prize_id: 2, //奖励id
            prize_days: 2, //奖励天数
            prize_nums: 2, //奖励数量
            prize_uid: 2, //获奖uid 等于当前uid 就夺宝成功
            nick: 'xxxxxx',//获奖昵称
            avarar: 'xx',//头像
            prize_voucher: 2, //获奖号码
            used_voucher_cnt: 3,
            voucher_cnt: 2, // 开奖要求总劵数
            cur_voucher_cnt: 2,//当前劵数
            etime: 2, //截止时间戳
            prize_name: "xxxx",//奖品名
            prize_image: "xxxx",//奖品图片
            prize_price: 2,//奖品价值金币
          },
          {
            id: 2,//id 寻宝id
            ing: 2, //1进行中 2正常结束 3、4后台终止
            prize_type: 2, // -1礼物 0头框 1座驾 2钻戒 3主题 4活动称号 5进场秀 6气泡框
            prize_id: 2, //奖励id
            prize_days: 2, //奖励天数
            prize_nums: 2, //奖励数量
            prize_uid: 2, //获奖uid 等于当前uid 就夺宝成功
            nick: 'xxxxxx',//获奖昵称
            avarar: 'xx',//头像
            prize_voucher: 2, //获奖号码
            used_voucher_cnt: 3,
            voucher_cnt: 2, // 开奖要求总劵数
            cur_voucher_cnt: 2,//当前劵数
            etime: 2, //截止时间戳
            prize_name: "xxxx",//奖品名
            prize_image: "xxxx",//奖品图片
            prize_price: 2,//奖品价值金币
          },
          {
            id: 2,//id 寻宝id
            ing: 2, //1进行中 2正常结束 3、4后台终止
            prize_type: 2, // -1礼物 0头框 1座驾 2钻戒 3主题 4活动称号 5进场秀 6气泡框
            prize_id: 2, //奖励id
            prize_days: 2, //奖励天数
            prize_nums: 2, //奖励数量
            prize_uid: 2, //获奖uid 等于当前uid 就夺宝成功
            nick: 'xxxxxx',//获奖昵称
            avarar: 'xx',//头像
            prize_voucher: 2, //获奖号码
            used_voucher_cnt: 3,
            voucher_cnt: 2, // 开奖要求总劵数
            cur_voucher_cnt: 2,//当前劵数
            etime: 2, //截止时间戳
            prize_name: "xxxx",//奖品名
            prize_image: "xxxx",//奖品图片
            prize_price: 2,//奖品价值金币
          },
          {
            id: 2,//id 寻宝id
            ing: 2, //1进行中 2正常结束 3、4后台终止
            prize_type: 2, // -1礼物 0头框 1座驾 2钻戒 3主题 4活动称号 5进场秀 6气泡框
            prize_id: 2, //奖励id
            prize_days: 2, //奖励天数
            prize_nums: 2, //奖励数量
            prize_uid: 2, //获奖uid 等于当前uid 就夺宝成功
            nick: 'xxxxxx',//获奖昵称
            avarar: 'xx',//头像
            prize_voucher: 2, //获奖号码
            used_voucher_cnt: 3,
            voucher_cnt: 2, // 开奖要求总劵数
            cur_voucher_cnt: 2,//当前劵数
            etime: 2, //截止时间戳
            prize_name: "xxxx",//奖品名
            prize_image: "xxxx",//奖品图片
            prize_price: 2,//奖品价值金币
          },
          {
            id: 2,//id 寻宝id
            ing: 2, //1进行中 2正常结束 3、4后台终止
            prize_type: 2, // -1礼物 0头框 1座驾 2钻戒 3主题 4活动称号 5进场秀 6气泡框
            prize_id: 2, //奖励id
            prize_days: 2, //奖励天数
            prize_nums: 2, //奖励数量
            prize_uid: 2, //获奖uid 等于当前uid 就夺宝成功
            nick: 'xxxxxx',//获奖昵称
            avarar: 'xx',//头像
            prize_voucher: 2, //获奖号码
            used_voucher_cnt: 3,
            voucher_cnt: 2, // 开奖要求总劵数
            cur_voucher_cnt: 2,//当前劵数
            etime: 2, //截止时间戳
            prize_name: "xxxx",//奖品名
            prize_image: "xxxx",//奖品图片
            prize_price: 2,//奖品价值金币
          }
        ]
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

<style lang="scss">
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
        font-size: 0.24rem;
        font-weight: bold;
        text-align: center;
        line-height: 0.26rem;
      }
      .price {
        width: 1.93rem;
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
          font-size: 0.32rem;
          font-weight: bold;
        }
        .giftType {
          padding: 0 0.06rem;
          height: 0.26rem;
          line-height: 0.26rem;

          background: linear-gradient(90deg, #4D91FF, #55DBFD);
          border-radius: 0.05rem;
          font-size: 0.2rem;
          font-style: italic;
          text-align: center;
          margin: 0.05rem 0 0 0.06rem;
          &.gift {
            background: linear-gradient(90deg, #EF52EF, #F87053);
          }
        }
      }
    }
    .getNums {
      margin-top: 0.22rem;
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
      display: flex;
      align-items: center;
      height: 0.36rem;
      font-size: 0.24rem;
      color: rgba(255, 255, 255, 0.6);
      position: absolute;
      right: 0.45rem;
      bottom: 0.32rem;
      i {
        width: 0.36rem;
        height: 0.36rem;
        background: url(../img/clock.png);
        background-size: auto 100%;
        margin-right: 0.06rem;
      }
    }
    .status {
      font-size: 0.46rem;
      color: rgba(255, 255, 255, 0.3);
      position: absolute;
      top: 0.41rem;
      right: 0.66rem;
    }
  }
}
</style>