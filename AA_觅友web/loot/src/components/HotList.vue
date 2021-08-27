<template>
  <div class="hotList">
    <ul class='hotScrollable'>
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
          <div class="getNums"><strong>{{item.used_voucher_cnt>0?`已奪寶${item.used_voucher_cnt}次`:'未參與本輪奪寶'}}</strong><span v-if="item.used_voucher_cnt" @click="showCode(item)">號碼</span></div>
          <div class="giftLiner">
            <span class="bar">{{item.cur_voucher_cnt}}/{{item.voucher_cnt}}</span>
            <div class="actLiner" :style="{width:item.cur_voucher_cnt/item.voucher_cnt *100 +'%'}"></div>
          </div>
        </div>
        <div class="joinbtn" @click="showSetType(item.id)">奪寶</div>
        <div class="giftDownTm" v-if="item.surplusTime">
          <i class="clock"></i>
          <span>{{item.surplusTime.minute}}:{{item.surplusTime.second}}</span>
        </div>
      </li>
    </ul>
    <!-- 夺宝 -->
    <transition name="move">
      <div class="setJoin" v-show="showSetTypePup">
        <div class="title">參與奪寶</div>
        <div class="btnList">
          <div v-for="(item,index) in joinType" :key="index" @click="join(item)">
            <div class="strTips">奪寶{{item}}次</div>
            <div class="numsTips">(<i></i><strong>{{item}}</strong>)</div>
          </div>
        </div>
      </div>
    </transition>

    <!--  -->
    <transition name="moveR">
      <GiftNumbers v-if="showCodePup" :codeItem="codeItem" />
    </transition>
  </div>
</template>

<script>

import downTime from "../utils/downTime"
import GiftNumbers from "./GiftNumbers"

export default {
  components: { GiftNumbers },
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
          ing: 1, //1进行中 2正常结束 3、4后台终止 5失敗
          prize_type: 1, // -1礼物 0头框 1座驾 2钻戒 3主题 4活动称号 5进场秀 6气泡框
          prize_id: 1, //奖励id
          prize_days: 1, //奖励天数
          prize_nums: 1, //奖励数量
          prize_uid: 1, //获奖uid
          prize_voucher: 1, //获奖号码
          used_voucher_cnt: 1,//当前用户使用的幸运劵数 
          voucher_cnt: 1, // 开奖要求总劵数
          cur_voucher_cnt: 1,//当前劵数
          etime: 10000, //截止时间戳
          prize_name: 'xxxxxxxxxx',//奖品名
          prize_image: '',//奖品图片
          prize_price: 1,//奖品价值金币
        },
        {
          id: 2,//id 寻宝id
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
          etime: 100000, //截止时间戳
          prize_name: 'xxxxxxxxxx',//奖品名
          prize_image: '',//奖品图片
          prize_price: 1,//奖品价值金币
        },
        {
          id: 3,//id 寻宝id
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
          etime: 20000, //截止时间戳
          prize_name: 'xxxxxxxxxx',//奖品名
          prize_image: '',//奖品图片
          prize_price: 1,//奖品价值金币
        },
        {
          id: 4,//id 寻宝id
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
          etime: 40000, //截止时间戳
          prize_name: 'xxxxxxxxxx',//奖品名
          prize_image: '',//奖品图片
          prize_price: 1,//奖品价值金币
        },
        {
          id: 5,//id 寻宝id
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
          etime: 10000, //截止时间戳
          prize_name: 'xxxxxxxxxx',//奖品名
          prize_image: '',//奖品图片
          prize_price: 1,//奖品价值金币
        }
      ],
      joinType: [
        1, 10, 100
      ],
      dowTimeList: [],
      loaded: false,
      more: true,
      nowId: null,
      showSetTypePup: false,
      showCodePup: false,
      codeItem: 0
    }
  },
  mounted () {
    this.scrollable = this.$el.querySelector('.hotScrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
    setInterval(() => {
      for (let i = 0; i < this.list.length; i++) {
        let timeObj = this.downTimeGo(this.list[i]);
        if (timeObj.end) {
          //删除操作
          this.list.splice(i, 1)
        } else {
          if (this.list[i]['surplusTime']) {
            this.$set(this.list, i, Object.assign(this.list[i], { surplusTime: timeObj }))
          } else {
            this.list[i]['surplusTime'] = timeObj
          }
        }
      }
    }, 1000)
  },
  methods: {
    showSetType (id) {
      this.nowId = id
      this.showSetTypePup = true
      this.vxc('setShowMask')
    },
    join (val) {
      console.log(val)
    },
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
          lotteryRecord(this.list.length, 'more').then(res => {
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
    downTimeGo (val) {
      let strId = String(val.id)
      if (!downTime(strId)) {
        downTime(strId, val.etime);
      }
      return downTime(strId);
    }
  }
}
</script>

<style lang="scss">
.hotList {
  position: relative;
  overflow: hidden;
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
            max-width: 100%;
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
        width: 1.18rem;
        height: 0.54rem;
        background: url(../img/joinbtn.png);
        background-size: auto 100%;
        text-align: center;
        line-height: 0.54rem;
        position: absolute;
        top: 0.32rem;
        right: 0.29rem;
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
    }
  }
  .setJoin {
    width: 7.5rem;
    height: 2rem;
    padding-top: 0.4rem;
    background: url(../img/setJoinBg.png);
    background-size: 100% 100%;
    position: absolute;
    bottom: 0;
    z-index: 5;
    .title {
      text-align: center;
      font-size: 0.36rem;
    }
    .btnList {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 0.48rem;
      padding: 0 0.38rem;
      text-align: center;
      > div {
        width: 1.82rem;
        height: 0.7rem;
        background: url(../img/joinTypeBtn.png);
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .strTips {
          font-size: 0.28rem;
        }
        .numsTips {
          font-size: 0.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          i {
            width: 0.24rem;
            height: 0.24rem;
            background: url(../img/tIcon.png);
            background-size: 100% 100%;
          }
          strong {
            font-size: 0.2rem;
          }
        }
      }
    }
  }
}
</style>