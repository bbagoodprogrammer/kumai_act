<template>
  <div class="hotList">
    <p v-if="!list.length" class="noData">{{lang.noData}}</p>
    <ul class='hotScrollable'>
      <li v-for="(item,index) in list " :key="index">
        <div class="giftImg">
          <div class="day" v-if="item.prize_type == -1 && item.prize_nums!=1">x{{item.prize_nums}}</div>
          <div class="day" v-else-if="item.prize_type != -1">{{item.prize_days}} {{lang.day}}</div>
          <img :src="item.prize_image" alt="">
          <div class="price"><i></i><em>{{item.prize_price}}</em></div>
        </div>
        <div class="giftMsg">
          <div class="giftName">
            <div class="name" style="-webkit-box-orient: vertical;">{{item.prize_name}}</div>
            <div class="giftType" :class="{gift:item.prize_type == -1}">{{typeTips[item.prize_type]}}</div>
          </div>
          <div class="getNums">
            <strong>{{item.used_voucher_cnt>0?`${lang.getSuc.replace('%s',item.used_voucher_cnt)}`:lang.notSing}}</strong>
            <span v-if="item.used_voucher_cnt" @click="showCode(item)">{{lang.number}}</span>
          </div>
          <div class="linerBox">
            <div class="giftLiner">
              <span class="bar">{{item.cur_voucher_cnt}}/{{item.voucher_cnt}}</span>
              <div class="actLiner" :style="{width:Number(item.cur_voucher_cnt) / Number(item.voucher_cnt)  *100 +'%'}"></div>
            </div>
            <div class="giftDownTm" v-if="item.surplusTime">
              <i class="clock"></i>
              <span>
                <em v-if="item.surplusTime.hour !='00'">{{item.surplusTime.hour}}:</em><em v-if="item.surplusTime.minute !='00'">{{item.surplusTime.minute}}:</em><em>{{item.surplusTime.second}}</em>
              </span>
            </div>
          </div>

        </div>
        <div class="joinbtn" @click="showSetType(item.id,index)"></div>

      </li>
    </ul>
    <!-- 夺宝 -->
    <transition name="move">
      <div class="setJoin" v-show="showSetTypePup">
        <div class="title">{{lang.setJoinTitle}}</div>
        <div class="btnList">
          <div v-for="(item,index) in joinType" :key="index" @click="join(item)">
            <div class="strTips">{{lang.joinNums.replace('%s',item)}}</div>
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
import { hotList, join } from "../apis"

const pageSize = 5

export default {
  props: ['numbersList'],
  components: { GiftNumbers },
  data () {
    return {
      list: [],
      joinType: [
        1, 10, 100
      ],
      dowTimeList: [],
      loaded: false,
      more: true,
      nowId: null,
      showSetTypePup: false,
      showCodePup: false,
      codeItem: {},
      page: 1,
      nowIndex: 0
    }
  },
  computed: {
    typeTips () {
      return this.lang.typeTips
    }
  },
  watch: {
    list (val) {
      if (val.length < pageSize) {
        this.loaded = true
      }
    },
    numbersList (val) {
      if (val.length) {
        console.log(val)
        hotList(this.pagination(this.page, pageSize, val)).then(res => {
          this.list = res.data.response_data.list
          this.downTmList()
        })
      }

    }
  },
  mounted () {
    this.scrollable = this.$el.querySelector('.hotScrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
  },
  methods: {
    join (val) {
      join(this.nowId, val).then(res => {
        if (!res.data.response_status.code) {
          let curLog = res.data.response_data.curLog
          let vouchers = res.data.response_data.vouchers
          if (curLog.ing == 1 && (Number(curLog.cur_voucher_cnt) < Number(curLog.voucher_cnt))) {
            this.$set(this.list, this.nowIndex, Object.assign(this.list[this.nowIndex], curLog))
          } else {
            this.list.splice(this.nowIndex, 1)
          }
          this.vxc('setVouchers', vouchers)
          if (Number(curLog.cur_voucher_cnt) < Number(curLog.voucher_cnt)) {
            this.toast(this.lang.joinSuc)
          } else {
            this.toast(this.lang.joinSuc2)
            setTimeout(() => {
              this.loaded = false
              this.page = 1
              this.$parent.init()

            }, 1000)
          }
          this.showSetTypePup = false
          this.vxc('setShowMask')
        } else {
          this.toast(res.data.response_status.error)
          if (res.data.response_status.code == 10007) {
            this.loaded = false
            this.page = 1
            this.$parent.init()
          }
          this.showSetTypePup = false
          this.vxc('setShowMask')
        }
      })
    },
    showSetType (id, index) {
      this.nowIndex = index
      this.nowId = id
      this.showSetTypePup = true
      this.vxc('setShowMask')
    },
    showCode (item) {
      this.codeItem = item
      this.showCodePup = true
    },
    onScroll () {
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        const ids = this.pagination(++this.page, pageSize, this.numbersList)
        console.log(ids, this.loaded)
        if (this.loaded || !ids) return
        if (this.more) {
          this.more = false
          hotList(ids, 'more').then(res => {
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
    },
    downTmList () {
      this.downTimeSet()
      setInterval(() => {
        this.downTimeSet()
      }, 1000)
    },
    downTimeSet () {
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
    },
    pagination (pageNo, pageSize, array) {
      var offset = (pageNo - 1) * pageSize;
      let arr = (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize);
      //   console.log(arr)
      return arr.length ? arr.join(',') : false
    }
  }
}
</script>

<style lang="scss" scoped>
.hotList {
  position: relative;
  overflow: hidden;
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
          line-height: 0.28rem;
        }
        .price {
          width: 1.73rem;
          height: 0.36rem;
          background: url(../img/priceBg.png);
          background-size: 100% 100%;
          padding-right: 0.2rem;
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
            max-width: 2.6rem;
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
            line-height: 0.28rem;
            background: linear-gradient(90deg, #4D91FF, #55DBFD);
            border-radius: 0.05rem;
            font-size: 0.2rem;
            // font-style: italic;
            text-align: center;
            margin: 0.05rem 0 0 0.06rem;
            font-weight: bold;
            &.gift {
              background: linear-gradient(90deg, #EF52EF, #F87053);
            }
          }
        }
        .getNums {
          width: 3.17rem;
          margin-top: 0.06rem;
          line-height: 0.24rem;
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
        .linerBox {
          width: 105%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 0.33rem;
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
          .giftDownTm {
            display: flex;
            align-items: center;
            height: 0.36rem;
            font-size: 0.24rem;
            color: rgba(255, 255, 255, 0.6);
            em {
              font-size: 0.24rem;
            }
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
          padding: 0 0.25rem;
          font-size: 0.28rem;
        }
        .numsTips {
          font-size: 0.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: -0.05rem;
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