<template>
  <div class="rule">
    <div class="title">規則&獎勵</div>
    <div class="tab">
      <span :class="{act:type == 1}" @click="tabClick(1)">規則</span>
      <span :class="{act:type == 2}" @click="tabClick(2)">獎勵</span>
    </div>
    <div class="rule_tips" v-if="type == 1">
      <p class="tm">活動時間：{{actTime}}</p>
      <h5>1、如何參與真愛摩天輪</h5>
      <p>
        綁定關係：<br />
        玩家們需要在魔法屋中綁定心動關係即可參與 <br />
        a）有CP的玩家其中一方參與了活動，即默認雙方參與 <br />
        b）沒有CP的玩家需要在魔法屋中與心動對象綁定心動關係 後方可參與
      </p>
      <p>
        解除關係：<br />
        a）CP玩家在app中解除CP關係，將被視為退出活動，相關 的真愛值會被清零<br />
        b）非CP玩家可在活動中發起解除心動關係，解除心動關係 後，相關的真愛值會被清零 <br />
        c）若非CP玩家在活動中綁定了心動對象，但在APP中和另 一位玩家組成CP，系統將強制解除雙方在活動中的心動關係， 相關的真愛值會被清零。 <br />
        d)解除關係後，玩家可以邀請另一位玩家重新綁定關係繼續<br />
        參與，但是不可和原心動對象重新綁定關係
      </p>
      <div class="rejectBox">
        <u @click="showQuery = true" class="reject">解除心動關係>></u>
      </div>
      <h5>2、如何獲得真愛值</h5>
      <p>參與了活動的玩家們收到指定禮物可以增加真愛值</p>
      <div class="giftList">
        <div class="gift_item" v-for="(item,index) in giftArr" :key="index" :class="'gift' + index">
          <div class="imgBox">
            <img :src="item.img" alt="">
            <i class="gType" v-if="item.tips">特效</i>
          </div>
          <strong v-html="item.name"></strong>
        </div>
      </div>
      <h5>3、如何乘坐真愛摩天輪</h5>
      <p>
        -玩家累積真愛值，有機會可以登上真愛榜；真愛榜會分為日榜和總榜，按照玩家的真愛值從高到低排序，若真愛值一致時，先達到的玩家優先排序<br />
        -活動中的日榜榜首的玩家會乘坐上真愛摩天輪，並且獲得【星海之淚】*2（一人一個），獲獎玩家可獲得當天所得的日榜真愛值的5%加成（加成的分數直接加到總榜，不會加到次日的日榜中）
      </p>
      <h5>4、如何召喚愛神</h5>
      <p>向愛神投入50金幣，可以召喚一次。每次召喚都100%獲得愛神的獎勵祝福</p>
      <img src="./img/rule_table1.png" alt="" class="rule_table1">
      <p>若前500次沒有召喚到如花幻蝶-戒指，第501次必中如花幻蝶-戒指，每位玩家僅可獲得一次戒指</p>
      <h5>5、其他</h5>
      <p>活動中，若發現玩家用不正當手段參與活動，小音有權在不事先通知的情況下按情節嚴重對參與玩家、違規者取消上榜資格、封禁賬號、收回該玩家所有獎勵等處罰，包括但不限於：</p>
      <p>a）活動期間對參賽玩家惡意評論、造謠、影射等</p>
      <p>b)非法獲得金幣、活動指定禮物</p>
    </div>
    <div class="gift_tips" v-else>
      <p class="tm">活動時間：{{actTime}}</p>
      <h5>1、乘坐摩天輪獎勵</h5>
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
        -活動中的日榜榜首的情侶會乘坐上真愛摩天輪，並獲得【星海之淚】*2（一人一個），獲獎情侶可獲得當天所得的日榜真愛值的5%加成（加成的分數直接加到總榜，不會加到次日的日榜中）
      </p>
      <h5>2、總榜獎勵</h5>
      <div class="giftList">
        <div class="gift_item" v-for="(item,index) in giftArr3" :key="index" :class="'gift' + index">
          <div class="imgBox">
            <img :src="item.img" alt="">
            <i class="gType" v-if="item.tips">特效</i>
          </div>
          <strong v-html="item.name"></strong>
        </div>
      </div>
      <p>冠軍CP頭像框（10天）+真愛摩天輪勛章（10天）+浪漫飛艇座駕（10天）+定制CP認證（10天）+唯你是星辰-特效禮物（一人一個） </p>
      <p>亞軍CP頭像框（7天）+真愛摩天輪勛章（7天）+浪漫飛艇座駕（7天）+真愛CP認證（7天）+心花怒放-特效禮物（一人一個） </p>
      <p>季軍CP頭像框（7天）+浪漫飛艇座駕（7天）+星海之淚-特效禮物（一人一個） </p>
      <p>*真愛值達到1314000並且獲得真愛總榜前三的真愛情侶才可獲得總榜獎勵哦</p>
    </div>
    <p class="lastTips">此活動與蘋果公司無關</p>
    <p class="lastTips2">*活動最終解釋權歸活動主辦方所有</p>
    <div class="mask" v-show="showQuery">
      <transition name="slide">
        <div class="queryPup" v-if="showQuery">
          <div class="title">是否解除心動關係</div>
          <div class="tips" v-html="tipsArr[1].replace('$',owner.days).replace('%',owner.total_score)">
          </div>
          <div class="btns">
            <span class="st1" @click="showQuery = false">我再想想</span>
            <span class="st2" @click="relieve()">確定解除</span>
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
        1: '你們一共花了$天，累積%真愛值真的要解除關系嗎？<br/>解除後，累積的真愛值都會被清零喔',
      },
      giftArr: [
        {
          img: require('./img/rule_gift/gift_7.png'),
          name: '愛的密匙<br/>+1000真愛值'
        },
        {
          img: require('./img/rule_gift/gift_4.png'),
          name: '為你著迷<br/>+10000真愛值',
          tips: '特效'
        },
        {
          img: require('./img/rule_gift/gift_5.png'),
          name: '愛的帆船<br/>+120000真愛值',
          tips: '特效'
        },
        {
          img: require('./img/rule_gift/gift_6.png'),
          name: '浪漫情書<br/>+200真愛值',
        },
        {
          img: require('./img/rule_gift/gift_1.png'),
          name: '愛神之箭<br/>+500真愛值'
        },
        {
          img: require('./img/rule_gift/gift_2.png'),
          name: '談情說愛<br/>+5200真愛值'
        },
        {
          img: require('./img/rule_gift/gift_3.png'),
          name: '一生鎖愛<br/>+20000真愛值',
          tips: '特效'
        },



      ],
      giftArr2: [
        {
          img: require('./img/rule_gift/gift_9.png'),
          name: '真愛值5%加成'
        },
        {
          img: require('./img/rule_gift/gift_16.png'),
          name: '星海之淚*2'
        }
      ],
      giftArr3: [
        {
          img: require('./img/rule_gift/gift_10.png'),
          name: 'CP頭像框（冠亞季軍有別）'
        },
        {
          img: require('./img/rule_gift/gift_11.png'),
          name: '真愛摩天輪勛章'
        },
        {
          img: require('./img/rule_gift/gift_12.png'),
          name: '浪漫飛艇座駕'
        },
        {
          img: require('./img/rule_gift/gift_13.png'),
          name: 'CP認證'
        },
        {
          img: require('./img/rule_gift/gift_19.png'),
          name: '唯你是星辰<br/>特效禮物'
        },
        {
          img: require('./img/rule_gift/gift_20.png'),
          name: '心花怒放<br/>特效禮物'
        },
        {
          img: require('./img/rule_gift/gift_16.png'),
          name: '星海之淚<br/>特效禮物'
        }
      ]
    }
  },
  computed: {
    ...mapState(['owner', 'stime', 'etime']),
    actTime () {
      return getDate(new Date(this.stime * 1000), 6) + '-' + getDate(new Date(this.etime * 1000), 6)
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
  background: rgba(255, 195, 214, 1);
  padding: 0.6rem 0.29rem;
  > .title {
    font-size: 0.34rem;
    font-weight: 500;
    text-align: center;
    color: rgba(188, 37, 104, 1);
  }
  .tab {
    width: 4.98rem;
    height: 0.68rem;
    background: #EBAACD;
    border: 0.02rem solid #FCCBDA;
    border-radius: 0.34rem;
    display: flex;
    align-items: center;
    margin: 0.2rem auto;
    span {
      width: 2.59rem;
      height: 0.74rem;
      text-align: center;
      line-height: 0.78rem;
      margin-top: -0.06rem;
      &.act {
        background: url(../../img/singUpBtn.png);
        background-size: 100% 100%;
      }
    }
  }
  .tm {
    font-size: 0.24rem;
    color: rgba(188, 102, 130, 1);
    margin: 0.15rem 0;
  }
  h5 {
    font-size: 0.26rem;
    font-weight: 600;
    color: rgba(176, 97, 101, 1);
  }
  p {
    color: rgba(176, 97, 101, 1);
    font-size: 0.24rem;
    margin: 0.2rem auto;
  }
  .rejectBox {
    text-align: right;
    margin: 0.1rem 0 0.2rem;
    .reject {
      font-size: 0.22rem;
      color: rgba(159, 64, 219, 1);
    }
  }
  .giftList {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 0.3rem;
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
        color: rgba(176, 97, 101, 1);
        text-align: center;
      }
      &.gift0 {
        margin-left: 0.6rem;
      }
      &.gift2 {
        margin-right: 0.6rem;
      }
    }
  }
}
.rule_table1 {
  display: block;
  width: 5.96rem;
  height: 4.48rem;
  margin: 0 auto;
}

.queryPup {
  width: 6.77rem;
  height: 4.34rem;
  padding-top: 0.28rem;
  background: url(../../img/friend_set.png);
  background-size: 100% 100%;
  .title {
    height: 1.1rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.34rem;
    color: rgba(188, 37, 104, 1);
  }
  .tips {
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0.6rem;
    font-size: 0.26rem;
    color: rgba(176, 97, 101, 1);
  }
  .btns {
    padding: 0 0.97rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      width: 2.19rem;
      height: 0.74rem;
      text-align: center;
      line-height: 0.74rem;
      &.st1 {
        background: url(../../img/st1.png);
        background-size: 100% 100%;
      }
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
  color: rgba(159, 64, 219, 1) !important;
  margin-top: 0.47rem !important;
}
.lastTips2 {
  text-align: center;
  font-size: 0.22rem;
  color: red !important;
  margin-top: 0.5rem !important;
}
</style>