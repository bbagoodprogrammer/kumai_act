<template>
  <div class="hotList">
    <ul>
      <li v-for="(item,index) in list " :key="index">
        <div class="giftImg">
          <div class="day">{{item.prize_type == -1?'x2':'7天'}}</div>
          <img :src="item.prize_image" alt="">
          <div class="price"><i></i><em>1234</em></div>
        </div>
        <div class="giftMsg">
          <div class="giftName">
            <div class="name">{{item.prize_name}}</div>
            <div class="giftType">{{typeTips[item.prize_type]}}</div>
          </div>
          <div class="getNums"><strong>{{item.used_voucher_cnt>0?`已奪寶${item.used_voucher_cnt}次`:'未參與本輪奪寶'}}</strong><span v-if="item.used_voucher_cnt">號碼</span></div>
          <div class="giftLiner">
            <span class="bar">100/100</span>
            <div class="actLiner"></div>
          </div>
        </div>
        <div class="joinbtn">奪寶</div>
      </li>
    </ul>
  </div>
</template>

<script>
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
      list: [
        {
          id: 1,//id 寻宝id
          ing: 1, //1进行中 2正常结束 3、4后台终止
          prize_type: 1, // -1礼物 0头框 1座驾 2钻戒 3主题 4活动称号 5进场秀 6气泡框
          prize_id: 1, //奖励id
          prize_days: 1, //奖励天数
          prize_nums: 1, //奖励数量
          prize_uid: 1, //获奖uid
          prize_voucher: 1, //获奖号码
          used_voucher_cnt: 1,//当前用户使用的幸运劵数 
          voucher_cnt: 1, // 开奖要求总劵数
          cur_voucher_cnt: 1,//当前劵数
          etime: 1, //截止时间戳
          prize_name: 'xxxxxxxxxx',//奖品名
          prize_image: '',//奖品图片
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
          prize_voucher: 1, //获奖号码
          used_voucher_cnt: 1,//当前用户使用的幸运劵数 
          voucher_cnt: 1, // 开奖要求总劵数
          cur_voucher_cnt: 1,//当前劵数
          etime: 1, //截止时间戳
          prize_name: 'xxxxxxxxxx',//奖品名
          prize_image: '',//奖品图片
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
          prize_voucher: 1, //获奖号码
          used_voucher_cnt: 1,//当前用户使用的幸运劵数 
          voucher_cnt: 1, // 开奖要求总劵数
          cur_voucher_cnt: 1,//当前劵数
          etime: 1, //截止时间戳
          prize_name: 'xxxxxxxxxx',//奖品名
          prize_image: '',//奖品图片
          prize_price: 1,//奖品价值金币
        }
      ],
    }
  }
}
</script>

<style lang="scss">
ul {
  margin-top: 0.22rem;
  li {
    width: 7.18rem;
    height: 2.08rem;
    background: url(../img/listBg.png);
    background-size: 100% 100%;
    margin-bottom: 0.1rem;
    display: flex;
    align-items: center;
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
        margin-top: 0.2rem;
        display: flex;
        align-items: center;
        .name {
          font-size: 0.32rem;
          font-weight: bold;
        }
        .giftType {
          padding: 0 0.06rem;
          font-size: 0.2rem;
          font-style: italic;
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
      .giftLiner {
        width: 3rem;
        height: 0.28rem;
        background: rgba(248, 248, 248, 0.3);
        border-radius: 0.14rem;
        overflow: hidden;
        position: relative;
        text-align: center;
        line-height: 0.28rem;
        font-size: 0.2rem;
        margin-top: 0.33rem;
        .bar {
          position: relative;
          z-index: 3;
        }
        .actLiner {
          position: absolute;
          left: 0;
          top: 0;
          width: 50%;
          height: 100%;
          border-radius: 0.14rem;
          background: linear-gradient(90deg, #FDBE9D 0%, #FF309C 100%);
        }
        .actLiner::before {
          content: '';
          display: block;
          width: 100%;
          height: 100%;
          background: url(../img/linerArr.png);
          background-size: auto 100%;
          position: absolute;
        }
      }
    }
    .joinbtn {
    }
  }
}
</style>