<template>
  <div class="giftNumbers">
    <div class="title"><i @click="$parent.showCodePup = false"></i>奪寶號碼</div>
    <div class="giftItem">
      <div class="giftImg">
        <div class="day">{{codeItem.prize_type == -1?`x${codeItem.prize_nums}`:`${codeItem.prize_days}天`}}</div>
        <img :src="codeItem.prize_image" alt="">
        <div class="price"><i></i><em>{{codeItem.prize_price}}</em></div>
      </div>
      <div class="giftMsg">
        <div class="giftName">
          <div class="name">{{codeItem.prize_name}}</div>
          <div class="giftType" :class="{gift:codeItem.prize_type == -1}">{{typeTips[codeItem.prize_type]}}</div>
        </div>
      </div>
      <div class="luckNumber">中獎號碼:{{codeItem.prize_voucher}}</div>
      <div class="giftDownTm" v-if="codeItem.surplusTime">
        <span>{{codeItem.etime}}</span>
      </div>
      <div class="status">
        <em v-if="codeItem.ing == 1">進行中</em>
        <em v-else-if="codeItem.ing == 2">成功</em>
        <em v-else-if="codeItem.ing == 5">失敗</em>
        <em v-else>取消</em>
      </div>
    </div>
    <div class="numbers">
      <div class="myNumber">
        我的奪寶號碼({{codeItem.used_voucher_cnt}})
      </div>
      <div class="luckTips" v-if="codeItem.prize_uid != uid">恭喜你命中號碼 <em>{{codeItem.prize_voucher}}</em></div>
      <div class="numberList numberScrollable" :class="{six:list.length <= 6}">
        <span v-for="(item,index) in list" :key="index" :class="{act:item.nums == codeItem.prize_uid}">{{item.nums}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getCode } from "../apis"
import { getUrlString } from "../utils"
export default {
  props: ['codeItem'],
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
      loaded: false,
      more: true,
      page: 0
    }
  },
  computed: {
    uid () {
      return getUrlString("uid") || "";
    }
  },
  mounted () {
    this.scrollable = this.$el.querySelector('.numberScrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
    setTimeout(() => {
      getCode(this.codeItem.id, 1).then(res => {
        // res.data.response_data.list
        this.list = [ //幸运劵商品列表
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },
          {
            "id": 1, //id
            "nums": 1 //幸运劵数
          },



        ]
        this.page++
      })
    }, 0)
  },
  destroyed () {
    this.scrollable.removeEventListener('scroll');
  },
  methods: {
    onScroll () {
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.loaded) return
        if (this.more) {
          this.more = false
          getCode(this.codeItem.id, ++this.page, 'more').then(res => {
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
.giftNumbers {
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
  .giftItem {
    width: 7.18rem;
    height: 2.08rem;
    background: url(../img/listBg.png);
    background-size: 100% 100%;
    margin-top: 0.08rem;
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
    .luckNumber {
      width: 2.28rem;
      height: 0.44rem;
      background: url(../img/luckNumberBg.png);
      background-size: 100% 100%;
      font-size: 0.2rem;
      font-weight: bold;
      line-height: 0.44rem;
      text-indent: 0.2rem;
      position: absolute;
      top: 1.31rem;
      left: 1.96rem;
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
  .numbers {
    padding: 0 0.32rem;
    .myNumber {
      margin-top: 0.31rem;
      font-size: 0.32rem;
      font-weight: bold;
    }
    .luckTips {
      font-size: 0.28rem;
      color: #FF60CD;
      margin: 0.1rem 0 0.3rem;
    }
    .numberList {
      display: inline-block;
      max-width: 6.88rem;
      max-height: 4.37rem;
      overflow-y: scroll;
      background: #6E1ACC;
      border-radius: 0.16rem;
      span {
        display: inline-block;
        width: 1.14rem;
        font-size: 0.28rem;
        font-weight: bold;
        box-sizing: border-box;
        height: 0.6rem;
        text-align: center;
        line-height: 0.6rem;
        border-bottom: 1px solid #9A5FDB;
        border-right: 1px solid #9A5FDB;
        &.act {
          background: #FF60CD;
        }
      }
      span:nth-child(6n + 1):nth-last-child(-n + 6),
      span:nth-child(6n + 1):nth-last-child(-n + 6) ~ span {
        border-bottom: none;
      }
      /* 使用选择器重置最后一列格子右边距为0 */
      span:nth-child(6n) {
        border-right: none;
      }
      &.six {
        span:last-child {
          border-right: none;
        }
      }
    }
  }
}
</style>