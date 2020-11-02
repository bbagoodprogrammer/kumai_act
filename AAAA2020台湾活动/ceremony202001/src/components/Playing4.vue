<template>
  <div class="playing4">
    <div class="storedTips">
      <div class="storedTabs">
        <span class="tab1" :class="{act:type==1}" @click="type =1"></span>
        <span class="tab2" :class="{act:type==2}" @click="type =2"></span>
      </div>
      <p v-if="type==1">11月26日感恩節當天儲值任意金幣即送12%的返利金幣（不包括系統贈送），多儲多返！活動期間每筆儲值成功後返利金幣立即到賬！</p>
      <p v-else>12月25日聖誕節當天儲值任意金幣即送12%的返利金幣（不包括系統贈送），多儲多返！活動期間每筆儲值成功後返利金幣立即到賬！</p>
      <div class="storeBtn" @click="goStore()"></div>
    </div>
    <div class="storeRank">
      <div class="rankTabs">
        <span class="tab1" :class="{act:rankType==1}" @click="rankType =1"></span>
        <span class="tab2" :class="{act:rankType==2}" @click="rankType =2"></span>
      </div>
      <div class="rank" v-if="rankType == 1">
        <div class="rankGift">
          <div v-for="(item,index) in giftArr1" :key="index" class="giftItem">
            <div class="imgBox">
              <img :src="item.img" alt="">
            </div>
            <div class="name">{{item.name}}</div>
          </div>
        </div>
        <div class="rank4" :style="{height:listHeight+'rem'}">
          <div class="bg">
            <div class="top">
              <p v-if="!list.length" class="noData">暫無數據</p>
            </div>
            <div class="con"></div>
            <div class="bottom"></div>
          </div>
          <ul class="list">
            <li v-for="(item,index) in list" :key="index" :class="'top' + item.rank">
              <span class="rank">{{item.rank}}</span>
              <div class="imgBox" @click="goUser(item.uid)">
                <img v-if="item.avatar_frame &&item.avatar_frame != ''" :src="item.avatar_frame" class="frame" alt="">
                <!-- <img src="../assets/img/testFrame.png" class="frame" alt=""> -->
                <img v-else-if="item.nob > 0" :src="require(`../assets/img/nob/${item.nob}.png`)" class="nob" alt="">
                <img v-lazy="item.avatar" alt="" class="av">
              </div>
              <div class="nick">{{item.nick}}</div>
              <div class="score">{{item.score}} <i class="coins"></i> </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="giftList" v-else>
        <div class="listItem" v-for="(item,index) in tickGiftList" :key="index">
          <div class="title" :class="'gList' + index"></div>
          <div class="rankGift">
            <div class="giftItem" v-for="(item2,index) in item" :key="index">
              <div class="imgBox">
                <img :src="item2.img" alt="">
              </div>
              <div class="name">{{item2.name}}</div>
            </div>
          </div>

        </div>
        <div class="tips">
          <p>1.座駕及背包禮物需更新到最新版本才可使用~</p>
          <p>2.感恩節大回饋儲值榜單獎勵在11月28日18:00:00由系統發放</p>
          <p>3.聖誕節大回饋儲值榜單獎勵將在12月27日18:00:00由系統發放</p>
        </div>
      </div>
    </div>
    <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}"></div>
  </div>
</template>
<script>
import { mapState } from "vuex"
import api from "../api/apiConfig"
import { tickGiftList } from "../config/ward"
import APP from "../utils/openApp"
export default {
  data() {
    return {
      type: 1,
      rankType: 1,
      giftArr1: [
        {
          img: require('../assets/img/ticket/gift/car.png'),
          name: '戰神GTR座駕'
        },
        {
          img: require('../assets/img/ticket/gift/bean.png'),
          name: '海量金豆'
        },
        {
          img: require('../assets/img/ticket/gift/gift1.png'),
          name: 'K房好禮'
        }
      ],
      listHeight: 0,
      list: [],
      rank: null,
      loaded: false,
      more: true,
      rotatePx: 0,    //刷新旋转动画
      tickGiftList: tickGiftList
    }
  },
  computed: {
    ...mapState(['isShare'])
  },
  watch: {
    list(val) {
      if (val.length) {
        this.listHeight = val.length * 1.4 + .65
      } else {
        this.listHeight = 1.65 + .65
      }
    }
  },
  created() {
    this.init()
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    init() {
      api.page4(0).then(res => {
        this.list = res.data.response_data.list
        this.rank = res.data.response_data.rank
        this.vxc('changGroupsUserMsg', {
          key: 4,
          msg: res.data.response_data.rank
        })
      })
    },
    goStore() {
      if (!this.isShare) {
        location.href = "walletConfig://"
      } else {
        APP()
      }
    },
    onScroll() { //滾動加載
      const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100
      if (scrollToBottom && !this.loaded && this.more && this.rank) {
        this.more = false
        api.page4(this.list.length, 'more').then(res => {
          this.more = true
          let list = res.data.response_data.list
          this.list = this.list.concat(list)
          if (list.length < 20) {
            this.loaded = true
          }
        })
      }
    },
    refrsh() { //刷新
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      this.init()
    }
  }
}
</script>
<style lang="scss" >
.playing4 {
  .storedTips {
    width: 7.26rem;
    height: 4.89rem;
    background: url(../assets/img/stored.png);
    background-size: 100% 100%;
    margin: 0.35rem auto 0;
    padding-top: 0.82rem;
    > p {
      margin-top: 0.3rem;
      padding: 0 0.35rem;
      line-height: 0.5rem;
      text-align: center;
      font-size: 0.28rem;
    }
    .storedTabs {
      display: flex;
      justify-content: center;
      span {
        width: 3.25rem;
        height: 0.86rem;
      }
      .tab1 {
        background: url(../assets/img/store/tab1.png);
        background-size: 100% 100%;
        &.act {
          background: url(../assets/img/store/tab1_act.png);
          background-size: 100% 100%;
        }
      }
      .tab2 {
        background: url(../assets/img/store/tab2.png);
        background-size: 100% 100%;
        &.act {
          background: url(../assets/img/store/tab2_act.png);
          background-size: 100% 100%;
        }
      }
    }
    .storeBtn {
      width: 4.86rem;
      height: 0.9rem;
      background: url(../assets/img/store/storeBtn.png);
      background-size: 100% 100%;
      margin: 0.6rem auto 0;
    }
  }
  .storeRank {
    .rankTabs {
      display: flex;
      justify-content: center;
      margin-top: 0.57rem;
      span {
        width: 3.54rem;
        height: 0.88rem;
      }
      .tab1 {
        background: url(../assets/img/ticket/tab1.png);
        background-size: 100% 100%;
        &.act {
          background: url(../assets/img/ticket/tab1_act_ticket.png);
          background-size: 100% 100%;
        }
      }
      .tab2 {
        background: url(../assets/img/ticket/tab2.png);
        background-size: 100% 100%;
        &.act {
          background: url(../assets/img/ticket/tab2_act_ticket.png);
          background-size: 100% 100%;
        }
      }
    }
  }
  .rankGift {
    padding: 0 0.6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.4rem;
    .giftItem {
      width: 1.8rem;
      .imgBox {
        width: 1.8rem;
        height: 1.8rem;
        background: url(../assets/img/luckBg.png);
        background-size: 100% 100%;
        position: relative;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 1.8rem;
          height: 1.8rem;
        }
      }
      .name {
        display: block;
        text-align: center;
        font-size: 0.28rem;
        white-space: nowrap;
      }
    }
  }
  .rank4 {
    width: 7.35rem;
    min-height: 2.4rem;
    position: relative;
    margin: 0.48rem auto;
    .noData {
      text-align: center;
      margin-top: 1rem;
    }
    .bg {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      .top {
        width: 100%;
        height: 1.56rem;
        background: url(../assets/img/listBgHeader.png);
        background-size: 100% 100%;
      }
      .con {
        width: 100%;
        flex: 1;
        background: url(../assets/img/listBgCon.png);
        background-size: 100% auto;
      }
      .bottom {
        width: 100%;
        height: 0.65rem;
        background: url(../assets/img/listBgBotton.png);
        background-size: 100% 100%;
      }
    }
    .list {
      width: 6.67rem;
      position: absolute;
      top: 0;
      left: 0;
      padding: 0.39rem 0.3rem 0;
      li {
        height: 1.4rem;
        display: flex;
        align-items: center;
        position: relative;
        .rank {
          width: 0.51rem;
          height: 0.67rem;
          line-height: 0.67rem;
          text-align: center;
          font-size: 0.26rem;
          margin: 0 0.18rem 0 0.2rem;
        }
        .imgBox {
          width: 1.1rem;
          height: 1.1rem;
          position: relative;
          .nob {
            width: 1.1rem;
            height: 1.1rem;
            position: absolute;
            top: 0rem;
            left: 0rem;
            z-index: 10;
          }
          .frame {
            width: 1.5rem;
            height: 1.5rem;
            position: absolute;
            top: -0.21rem;
            left: -0.2rem;
            z-index: 10;
          }
          .av {
            width: 0.88rem;
            height: 0.88rem;
            position: absolute;
            top: 0.1rem;
            left: 0.11rem;
            border-radius: 50%;
          }
        }
        .nick {
          width: 2.5rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 0.28rem;
          margin-left: 0.18rem;
        }
        .score {
          font-size: 0.28rem;
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          .coins {
            width: 0.37rem;
            height: 0.37rem;
            background: url(../assets/img/coins2.png);
            background-size: 100% 100%;
            margin-left: 0.1rem;
          }
        }
        &.top1 {
          .rank {
            text-indent: 999rem;
            background: url(../assets/img/top1.png);
            background-size: 100% 100%;
          }
        }
        &.top2 {
          .rank {
            text-indent: 999rem;
            background: url(../assets/img/top2.png);
            background-size: 100% 100%;
          }
        }
        &.top3 {
          .rank {
            text-indent: 999rem;
            background: url(../assets/img/top3.png);
            background-size: 100% 100%;
          }
        }
      }
      li::before {
        content: "";
        width: 5.4rem;
        height: 1px;
        background: #ffffff;
        opacity: 0.3;
        position: absolute;
        bottom: 0;
        right: 0;
      }
      li:last-child::before {
        height: 0;
      }
    }
  }
  .giftList {
    width: 7.26rem;
    height: 20.5rem;
    padding-top: 1.13rem;
    background: url(../assets/img/store/storeGiftBg.png);
    background-size: 100% 100%;
    margin: 0.31rem auto 0;
    .listItem {
      margin-bottom: 0.81rem;
    }
    .title {
      width: 1.78rem;
      height: 0.34rem;
      margin: 0 auto;
      &.gList1 {
        background: url(../assets/img/ticket/title1.png);
        background-size: 100% 100%;
      }
      &.gList2 {
        background: url(../assets/img/ticket/title2.png);
        background-size: 100% 100%;
      }
      &.gList3 {
        background: url(../assets/img/ticket/title3.png);
        background-size: 100% 100%;
      }
      &.gList4 {
        width: 2.34rem;
        height: 0.34rem;
        background: url(../assets/img/ticket/title4.png);
        background-size: 100% 100%;
      }
    }
    .name {
      white-space: pre-wrap !important;
    }
    .tips {
      margin: 1.11rem 0 0;
      padding: 0 0.4rem;
      font-size: 0.26rem;
      p {
        margin-bottom: 0.4rem;
      }
    }
  }
}
</style>