<template>
  <div class="rule">
    <p class="tm">活動時間：{{actTime}}</p>
    <div class="tab">
      <span :class="{act:type == 1}" @click="tabClick(1)">規則</span>
      <span :class="{act:type == 2}" @click="tabClick(2)">獎勵</span>
    </div>
    <div class="rule_tips" v-if="type == 1">

      <h5>1、如何參與活動</h5>
      <p>
        綁定關係：<br />
        玩家們需要在活動中綁定心動關係即可參與 <br />
        a）有CP的玩家其中一方參與了活動，即默認雙方參與 <br />
        b）沒有CP的玩家需要在活動中與心動對象綁定心動關係後方可參與
      </p>
      <p>
        解除關係：<br />
        a）CP玩家在app中解除CP關係，將被視為退出活動，相關的浪漫值會被清零<br />
        b）非CP玩家可在活動中發起解除心動關係，解除心動關係後，相關的浪漫值會被清零 <br />
        c）若非CP玩家在活動中綁定了心動對象，但在APP中和另 一位玩家組成CP，系統將強制解除雙方在活動中的心動關係， 相關的浪漫值會被清零。 <br />
        d)解除關係後，玩家可以邀請另一位玩家重新綁定關係繼續<br />
        參與，但是不可和原心動對象重新綁定關係
      </p>
      <div class="rejectBox">
        <u @click="showQuery = true" class="reject" v-if="owner.is_reg">解除心動關係>></u>
      </div>
      <h5>2、如何獲得浪漫值</h5>
      <p>參與了活動的玩家們收到指定禮物可以增加浪漫值</p>
      <div class="giftList list1">
        <div class="gift_item" v-for="(item,index) in giftArr" :key="index" :class="'gift' + index">
          <div class="imgBox">
            <img :src="item.img" alt="">
            <i class="gType" v-if="item.tips">特效</i>
          </div>
          <strong v-html="item.name"></strong>
        </div>
      </div>
      <h5>3、如何漫步喜鵲橋</h5>
      <p>
        -玩家累積浪漫值，可以讓雙方在活動中的頭像靠近，牛郎織女也隨之相互靠近；當浪漫值達到4000時，雙方可獲得LV.1活動稱號「戀人未滿」（3天），當浪漫值達到8000時，雙方可獲得LV.2活動稱號「相思紅豆」（7天）。<br />
        -七夕CP榜根據參加活動的玩家的浪漫值從高到低排序，若浪漫值一致時，先達到的玩家優先排序
      </p>
      <h5>4、浪漫告白</h5>
      <p>-玩家每次送出一個「天生一對」（價值：19999金幣），全站房間飄出霸屏橫幅（5s）</p>

      <p>-每送出兩個「天生一對」特效禮物，送出的玩家可獲得「浪漫約會」房間背景(7天)</p>
      <h5>5、其他</h5>
      <p>活動中，若發現玩家用不正當手段參與活動，小音有權在不事先通知的情況下按情節嚴重對參與玩家、違規者取消上榜資格、封禁賬號、收回該玩家所有獎勵等處罰，包括但不限於：</p>
      <p>a）活動期間對參賽玩家惡意評論、造謠、影射等</p>
      <p>b）非法獲得金幣、活動指定禮物</p>
    </div>
    <div class="gift_tips" v-else>
      <h5>1、漫步獎勵</h5>
      <div class="giftList list2">
        <div class="gift_item" v-for="(item,index) in giftArr2" :key="index" :class="'gift' + index">
          <div class="imgBox">
            <img :src="item.img" alt="">
            <i class="gType" v-if="item.tips">特效</i>
          </div>
          <strong v-html="item.name"></strong>
        </div>
      </div>
      <p>
        當浪漫值達到4000時，雙方可獲得LV.1活動稱號「戀人未滿」（3天），當浪漫值達到8000時，雙方可獲得LV.2活動稱號「相思紅豆」（7天）
      </p>
      <h5>2、總榜獎勵</h5>
      <div class="giftList list3">
        <div class="gift_item" v-for="(item,index) in giftArr3" :key="index" :class="'gift' + index">
          <div class="imgBox">
            <img :src="item.img" alt="">
            <i class="gType" v-if="item.tips">特效</i>
          </div>
          <strong v-html="item.name"></strong>
        </div>
      </div>
      <p>冠軍CP：冠軍CP頭像框（15天）+七夕眷侶勛章（30天）+比翼雙飛座駕（10天）+定制CP認證（10天）+生生世世-特效禮物（一人一個，9999金幣/個）+鵲橋相會-特效禮物（一人一個，13140金幣/個） </p>
      <p>亞軍CP：亞軍CP頭像框（10天）+七夕眷侶勛章（15天）+比翼雙飛座駕（7天）+真愛CP認證（7天）+生生世世-特效禮物（一人一個，9999金幣/個） </p>
      <p>季軍CP：季軍CP頭像框（7天）+比翼雙飛座駕（10天）+生生世世-特效禮物（一人一個，9999金幣/個） </p>

    </div>
    <p class="lastTips">此活動與蘋果公司無關</p>
    <p class="lastTips2">*活動最終解釋權歸活動主辦方所有</p>
    <div class="mask" v-show="showQuery">
      <transition name="slide">
        <div class="queryPup" v-if="showQuery">
          <div class="title">是否解除心動關係</div>
          <div class="tips" v-html="tipsArr[1].replace('$',owner.days).replace('%',owner.score)">
          </div>
          <div class="btns">
            <u class="st1" @click="relieve()">確定解除</u>
            <span class="st2" @click="showQuery = false">我再想想</span>

          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>

import { relieve } from "../../apis"
import { mapState } from "vuex"
import getDate from "../../utils/getDate"

export default {
  data () {
    return {
      type: 1,
      showQuery: false,
      tipsArr: {
        1: '你們一共花了$天，累積%浪漫值真的要解除關係嗎？<br/>解除後，累積的浪漫值都會被清零喔',
      },
      giftArr: [
        {
          img: require('./img/rule_gift/gift_1.png'),
          name: '甜蜜賀卡<br/>+100浪漫值'
        },
        {
          img: require('./img/rule_gift/gift_2.png'),
          name: '愛意花<br/>+1880浪漫值',
          tips: '特效'
        },
        {
          img: require('./img/rule_gift/gift_3.png'),
          name: '喜鵲築巢<br/>+3000浪漫值',
          tips: '特效'
        },
        {
          img: require('./img/rule_gift/gift_4.png'),
          name: '戀愛相冊<br/>+12000浪漫值',
          tips: '特效'
        },
        {
          img: require('./img/rule_gift/gift_5.png'),
          name: '天生一對<br/>+19999浪漫值',
          tips: '特效'
        },

      ],
      giftArr2: [
        {
          img: require('./img/rule_gift/gift_6.png'),
          name: 'LV.1戀人未滿'
        },
        {
          img: require('./img/rule_gift/gift_7.png'),
          name: 'LV.2相思紅豆'
        }
      ],
      giftArr3: [
        {
          img: require('./img/rule_gift/gift_10.png'),
          name: 'CP頭像框（冠亞季軍有別）'
        },
        {
          img: require('./img/rule_gift/gift_11.png'),
          name: '七夕眷侶勛章'
        },
        {
          img: require('./img/rule_gift/gift_12.png'),
          name: '比翼雙飛座駕'
        },
        {
          img: require('./img/rule_gift/gift_13.png'),
          name: 'CP認證'
        },
        {
          img: require('./img/rule_gift/gift_19.png'),
          name: '鵲橋相會<br/>特效禮物'
        },
        {
          img: require('./img/rule_gift/gift_20.png'),
          name: '生生世世<br/>特效禮物'
        }

      ]
    }
  },
  computed: {
    ...mapState(['owner', 'activity']),
    actTime () {
      return getDate(new Date(this.activity.stime * 1000), 6) + '-' + getDate(new Date(this.activity.etime * 1000), 6)
    }
  },
  methods: {
    tabClick (val) {
      this.type = val
      console.log(this.type)
    },
    relieve () {
      relieve().then(res => {
        if (res.data.response_status.code == 0) {
          this.toast(`心動傳送中,請耐心等待他/她的回復`)
          this.showQuery = false
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.rule {
  background: rgba(59, 28, 171, 1);
  padding: 0.6rem 0.29rem;
  > .title {
    font-size: 0.34rem;
    font-weight: 500;
    text-align: center;
  }
  .tab {
    width: 4.98rem;
    height: 0.68rem;
    display: flex;
    align-items: center;
    margin: 0.2rem auto;
    background: url(../../img/tabs.png);
    background-size: 100% 100%;
    span {
      width: 2.56rem;
      height: 0.68rem;
      text-align: center;
      line-height: 0.68rem;
      &.act {
        color: #3B1CAB;
        background: url(../../img/tabs_act.png);
        background-size: 100% 100%;
      }
    }
  }
  .tm {
    font-size: 0.26rem;
    color: #FCE278;
    text-align: center;
  }
  h5 {
    color: #F3D97C;
    font-size: 0.26rem;
    font-weight: 600;
  }
  p {
    font-size: 0.24rem;
    margin: 0.2rem auto;
  }
  .rejectBox {
    text-align: right;
    margin: 0.1rem 0 0.2rem;
    .reject {
      font-size: 0.22rem;
      color: #F3D97C;
    }
  }
  .giftList {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 0.3rem;
    &.list1 {
      .gift_item {
        &.gift0 {
          margin-left: 0.6rem;
        }
        &.gift2 {
          margin-right: 0.6rem;
        }
        &.gift3 {
          margin-left: 1.5rem;
        }
        &.gift4 {
          margin-right: 1.5rem;
        }
      }
    }
    &.list3 {
      padding: 0 0.8rem;
      margin-top: 0.3rem;
    }
    &.list2 {
      padding: 0 1.78rem;
      .gift_item {
        &.gift0 {
          margin-left: 0rem;
        }
      }
    }
    .gift_item {
      width: 1.47rem;
      margin-bottom: 0.2rem;
      .imgBox {
        width: 1.47rem;
        height: 1.47rem;
        background: url(../../img/luckGiftItem.png);
        background-size: 100% 100%;
        position: relative;
        img {
          width: 1.47rem;
          height: 1.47rem;
        }
        .gType {
          display: block;
          width: 0.93rem;
          height: 0.37rem;
          background: url(../../img/te.png);
          background-size: 100% 100%;
          position: absolute;
          top: 0;
          left: 0;
          font-size: 0.24rem;
          text-align: center;
          line-height: 0.37rem;
        }
      }
      strong {
        width: 1.57rem;
        margin-left: -0.05rem;
        display: block;
        font-size: 0.24rem;
        text-align: center;
      }
    }
  }
}

.queryPup {
  width: 6.46rem;
  height: 4rem;
  padding-top: 0.28rem;
  background: url(../../img/friend_set.png);
  background-size: 100% 100%;
  .title {
    height: 0.88rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.34rem;
    color: #FCE278;
  }
  .tips {
    height: 1.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0.6rem;
    font-size: 0.26rem;
  }
  .btns {
    padding: 0 0.97rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    u {
      color: rgba(212, 202, 250, 1);
    }
    span {
      width: 2.19rem;
      height: 0.74rem;
      text-align: center;
      line-height: 0.74rem;
      &.st2 {
        background: url(../../img/st12.png);
        background-size: 100% 100%;
      }
    }
  }
}
.lastTips {
  text-align: center;
  font-size: 0.22rem;
  color: #F3D97C !important;
  margin-top: 0.47rem !important;
}
.lastTips2 {
  text-align: center;
  font-size: 0.22rem;
  color: #F3D97C !important;
  margin-top: 0.5rem !important;
}
</style>