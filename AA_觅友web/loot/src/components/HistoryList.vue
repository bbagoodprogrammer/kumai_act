<template>
  <div class="historyList">
    <ul class='historyScrollable'>
      <li v-for="(item,index) in list " :key="index">
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
        </div>
        <div class="userLuck">
          <div class="luckUserMsg">
            <img v-lazy="item.avatar" class="av" alt="">
            <div class="nick"><strong>{{item.nick}}</strong>奪寶成功</div>
          </div>
          <div class="luckNumber">
            中獎號碼 {{item.prize_voucher}}
          </div>
        </div>
        <div class="giftDownTm">
          <span>{{item.etime}}</span>
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
      list: [],
    }
  },
  mounted () {
    historyList(1).then(res => {
      // res.data.response_data.rows
      this.list = [
        {
          id: 1,//id 寻宝id
          ing: 1, //1进行中 2正常结束 3、4后台终止
          prize_type: 1, // -1礼物 0头框 1座驾 2钻戒 3主题 4活动称号 5进场秀 6气泡框
          prize_id: 1, //奖励id
          prize_days: 1, //奖励天数
          prize_nums: 1, //奖励数量
          prize_uid: 1, //获奖uid
          nick: 'stirng',//获奖昵称
          avarar: 'stirng',//头像
          prize_voucher: 1, //获奖号码
          voucher_cnt: 1, // 开奖要求总劵数
          cur_voucher_cnt: 1,//当前劵数
          etime: 1, //截止时间戳
          prize_name: 'stirng',//奖品名
          prize_image: 'stirng',//奖品图片
          prize_price: 1,//奖品价值金币

        },
        {
          id: 1,//id 寻宝id
          ing: 1, //1进行中 2正常结束 3、4后台终止
          prize_type: 1, // -1礼物 0头框 1座驾 2钻戒 3主题 4活动称号 5进场秀 6气泡框
          prize_id: 1, //奖励id
          prize_days: 1, //奖励天数
          prize_nums: 1, //奖励数量
          prize_uid: 1, //获奖uid
          nick: 'stirng',//获奖昵称
          avarar: 'stirng',//头像
          prize_voucher: 1, //获奖号码
          voucher_cnt: 1, // 开奖要求总劵数
          cur_voucher_cnt: 1,//当前劵数
          etime: 1, //截止时间戳
          prize_name: 'stirng',//奖品名
          prize_image: 'stirng',//奖品图片
          prize_price: 1,//奖品价值金币
        },
        {
          id: 1,//id 寻宝id
          ing: 1, //1进行中 2正常结束 3、4后台终止
          prize_type: 1, // -1礼物 0头框 1座驾 2钻戒 3主题 4活动称号 5进场秀 6气泡框
          prize_id: 1, //奖励id
          prize_days: 1, //奖励天数
          prize_nums: 1, //奖励数量
          prize_uid: 1, //获奖uid
          nick: 'stirng',//获奖昵称
          avarar: 'stirng',//头像
          prize_voucher: 1, //获奖号码
          voucher_cnt: 1, // 开奖要求总劵数
          cur_voucher_cnt: 1,//当前劵数
          etime: 1, //截止时间戳
          prize_name: 'stirng',//奖品名
          prize_image: 'stirng',//奖品图片
          prize_price: 1,//奖品价值金币
        },
        {
          id: 1,//id 寻宝id
          ing: 1, //1进行中 2正常结束 3、4后台终止
          prize_type: 1, // -1礼物 0头框 1座驾 2钻戒 3主题 4活动称号 5进场秀 6气泡框
          prize_id: 1, //奖励id
          prize_days: 1, //奖励天数
          prize_nums: 1, //奖励数量
          prize_uid: 1, //获奖uid
          nick: 'stirng',//获奖昵称
          avarar: 'stirng',//头像
          prize_voucher: 1, //获奖号码
          voucher_cnt: 1, // 开奖要求总劵数
          cur_voucher_cnt: 1,//当前劵数
          etime: 1, //截止时间戳
          prize_name: 'stirng',//奖品名
          prize_image: 'stirng',//奖品图片
          prize_price: 1,//奖品价值金币
          prize_price: 1,//奖品价值金币
        },
        {
          id: 1,//id 寻宝id
          ing: 1, //1进行中 2正常结束 3、4后台终止
          prize_type: 1, // -1礼物 0头框 1座驾 2钻戒 3主题 4活动称号 5进场秀 6气泡框
          prize_id: 1, //奖励id
          prize_days: 1, //奖励天数
          prize_nums: 1, //奖励数量
          prize_uid: 1, //获奖uid
          nick: 'stirng',//获奖昵称
          avarar: 'stirng',//头像
          prize_voucher: 1, //获奖号码
          voucher_cnt: 1, // 开奖要求总劵数
          cur_voucher_cnt: 1,//当前劵数
          etime: 1, //截止时间戳
          prize_name: 'stirng',//奖品名
          prize_image: 'stirng',//奖品图片
          prize_price: 1,//奖品价值金币
        }
      ]
    })
  }
}
</script>

<style lang="scss">
.historyList {
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
          margin-top: 0.2rem;
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
            strong {
              font-size: 0.2rem;
              max-width: 2rem;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              color: #7E1EE5;
            }
          }
        }
        .luckNumber {
          font-size: 0.2rem;
          font-weight: bold;
          margin-right: 0.25rem;
        }
      }
      .giftDownTm {
        display: flex;
        align-items: center;
        height: 0.36rem;
        font-size: 0.24rem;
        color: rgba(255, 255, 255, 0.6);
        position: absolute;
        right: 0.28rem;
        top: 0.36rem;
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