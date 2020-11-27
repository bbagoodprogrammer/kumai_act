<template>
  <div id="app">
    <div class="page pageSetting" :style="{minHeight:viewHeight+'px'}">
      <!-- <div class="appHeader">
      </div> -->
      <div class="settIngCon">
        <div class="tipsBox">
          <h3 class="tipsTitle">抽獎玩法</h3>
          <p class="tips" v-if="luckType">
            由你發起抽獎並支付一定金幣購買VIP會員或K房禮 物作爲抽獎獎品在倒計時間內，房間內的用戶送出 你指定的抽獎資格禮物即可獲得抽獎機會，倒計時 結束立即開獎，抽取其中一名參與者爲得獎者，獲 得你的獎品。
            <br />無人參與則獎品歸發起人所有。
          </p>
          <p class="tips" v-else>
            1.由你選擇以下抽獎獎品，並支付對應金幣，可發起抽獎<br />
            2.在倒計時間內，房間內的用戶送出參與方式指定的抽獎入場券禮物即可獲得抽獎機會，倒計時結束立即開獎，抽取其中一名參與者爲得獎者，獲得你的獎品。<br />
            3.無人參與則獎品歸發起人所有。
          </p>
        </div>
        <div class="from" v-if="luckType">
          <div class="fromItem">
            <span>抽獎資格</span>
            <div class="itemCon" @click="changGift()">
              <span v-if="actGift.id" class="actGift1"><img :src="actGift.pic" alt=""><strong>{{actGift.name}}</strong></span>
              <span v-else class="noSet">未設置</span>
              <i class="arr"></i>
            </div>
          </div>
          <div class="fromItem">
            <span>倒計時</span>
            <div class="itemCon" @click="setTime()">
              <span v-if="timeIndex != null">{{timeArr[timeIndex]}}分鐘</span>
              <span v-else class="noSet">未設置</span>
              <i class="arr"></i>
            </div>
          </div>
          <div class="fromItem">
            <span>獎品選擇</span>
            <!-- <div class="itemCon"> -->
            <div class="itemCon" @click="setSgift(1)">
              <span v-if="sActGift.id" class="actGift1"><img :src="sActGift.pic" alt="" v-if="sActGift.prise_type !=1"> <strong :class="{textIndex:sActGift.prise_type ==1}">{{sActGift.name}}</strong> </span>
              <span v-else class="noSet">未設置</span>
              <i class="arr"></i>
            </div>
            <!-- </div> -->
          </div>
          <div class="setpeopleType">
            <span>誰可參與</span>
            <div class="peopleType">
              <span @click="setPeopleType(1)"><i :class="{act:peopleType == 1}"></i><strong>所有人</strong></span>
              <span @click="setPeopleType(2)"><i :class="{act:peopleType == 2}"></i><strong>麥上用戶</strong></span>
            </div>
          </div>
        </div>
        <div class="setGift" v-else>
          <h3 class="tipsTitle">選擇抽獎獎品</h3>
          <div class="fiexList">
            <ul>
              <li v-for="(item,index) in fixedDrawList" :key="index" :class="{act:index== fixeActIndex}" @click="setFixedGift(item,index)">
                <i class="prise_type">{{tabArr[item.prise_type - 1]}}</i>
                <img class="giftImg" :class="{card:item.prise_type == 6,bg:item.prise_type == 7}" :src="item.prise_pic" alt="">
                <span class="name">{{item.prise_name}}</span>
                <span class="price"><i :class="{bean:item.ticket_currency == 'bean'}"></i><strong>{{item.prise_price}}</strong> </span>
              </li>
            </ul>
            <div class="sGift"><span>參與方式：</span> 送出 <img :src="fixeActDraw.ticket_gpic" alt="">x{{fixeActDraw.ticket_amount}} ({{fixeActDraw.ticket_price}}{{giftType[fixeActDraw.ticket_currency]}}) 參與抽獎</div>
            <div class="fTime"><span>倒計時：</span> {{fixeActDraw.time_limit}}分鐘</div>
          </div>
          <div class="setpeopleType">
            <span>誰可參與</span>
            <div class="peopleType">
              <span @click="setPeopleType(1)"><i :class="{act:peopleType == 1}"></i><strong>所有人</strong></span>
              <span @click="setPeopleType(2)"><i :class="{act:peopleType == 2}"></i><strong>麥上用戶</strong></span>
            </div>
          </div>
        </div>
        <div class="commitBtn" :class="{act:isCommit || (!luckType &&peopleType)}" @click="showPricePup()">開始抽獎</div>
      </div>

      <!-- 抽獎資格彈窗 -->
      <van-popup v-model="show" position="bottom" :round="true" :style="{background:'none'}" overlay-class="bgopt">
        <div class="giftList">
          <div class="blurMask"></div>
          <p v-if="tabLoading" class="tabLoading">加載中...</p>
          <van-swipe class="my-swipe" :loop="false">
            <van-swipe-item v-for="(item,index) in pageGiftList" :key="index">
              <div class="giftItem" v-for="(item2,index2) in item" :key="index2" @click="setactGift(item2)">
                <div class="actCon" v-if="item2.id == actGiftT.id"></div>
                <div class="giftMsg" :class="{act:item2.id == actGiftT.id}">
                  <img :src="item2.pic" alt="">
                  <span class="name" v-if="item2.id == actGiftT.id">{{item2.name}}</span>
                  <span class="pirce"><i :class="{coins:item2.currency == 'coin'}" v-if="item.currency != 'free'"></i><strong>{{item2.price}}</strong> </span>
                </div>
              </div>
            </van-swipe-item>
          </van-swipe>
          <div class="queryBtn" @click="queryGift()">確定</div>
        </div>
      </van-popup>

      <!-- 獎品選擇 -->
      <van-popup v-model="showSgiftPup" position="bottom" :round="true" :style="{background:'none'}" overlay-class="bgopt">
        <div class="giftList">
          <div class="blurMask"></div>
          <div class="tabs">
            <span v-for="(item,index) in tabArr" :key="index" :class="{act:tabIndex-1 == index,pd0:item == null}" @click="tabClick(index+1)" >{{item}}</span>
          </div>
          <p v-if="tabGift[tabIndex] && tabGift[tabIndex].loading" class="tabLoading">加載中...</p>
          <div class="vipCon" v-show="tabIndex == 1">
            <p class="vipTips">選擇VIP會員月數（已是會員獲得獎品則疊加時長）</p>
            <div class="vipBox">
              <div class="vipItem">
                <div class="item" :class="{act:vipType == index}" @click="vipClick(index,item)" v-for="(item,index) in nowTabGift[0]" :key="index">
                  <span class="tm">{{item.prise_days}}天</span>
                  <span class="price"><i></i> <strong>{{item.price}}</strong></span>
                </div>
              </div>
            </div>
          </div>
          <!-- 名片 -->
          <div class="vipCon" v-show="tabIndex == 6">
            <div class="vipBox">
              <div class="vipItem mt">
                <div class="item2" :class="{act:cardType == index}" @click="cardsClick(index,item)" v-for="(item,index) in nowTabGift[0]" :key="index">
                  <div class="imgBox">
                    <img :src="item.pic" alt="">
                    <i class="select" v-if="cardType == index"></i>
                  </div>
                  <div class="name">{{item.name}}</div>
                  <span class="price"><i :class="{coins:item.currency == 'coin'}"></i> <strong>{{item.price}}</strong></span>
                </div>
              </div>
            </div>
          </div>
          <!-- 主題 -->
          <div class="vipCon" v-show="tabIndex == 7">
            <div class="vipBox">
              <div class="vipItem mt2">
                <div class="item2 bg" :class="{act:cardType == index}" @click="cardsClick(index,item)" v-for="(item,index) in nowTabGift[0]" :key="index">
                  <div class="imgBox">
                    <img :src="item.pic" alt="">
                    <i class="select" v-if="cardType == index"></i>
                  </div>
                  <div class="name">{{item.name}}</div>
                  <span class="price"><i :class="{coins:item.currency == 'coin'}"></i> <strong>{{item.price}}</strong></span>
                </div>
              </div>
            </div>
          </div>
          <!-- 其他 -->
          <van-swipe class="my-swipe-sGift" :loop="false" v-show="tabIndex == 2 || tabIndex == 3||tabIndex == 4||tabIndex == 5">
            <van-swipe-item v-for="(item,index) in nowTabGift" :key="index">
              <div class="giftItem" v-for="(item2,index2) in item" :key="index2" @click="setSactGift(item2)">
                <div class="actCon" v-if="item2.id == sActGiftT.id"></div>
                <div class="giftMsg" :class="{act:item2.id == sActGiftT.id}">
                  <img :src="item2.pic" alt="">
                  <span class="name" v-if="item2.id == sActGiftT.id">{{item2.name}}</span>
                  <span class="pirce"><i :class="{coins:item2.currency == 'coin'}" v-if="item.currency != 'free'"></i><strong>{{item2.price}}</strong> </span>
                </div>
              </div>
            </van-swipe-item>
          </van-swipe>
          <div class="balance">
            <span class="coin"><i></i><strong>{{balance.coin}}</strong></span>
            <span class="bean"><i></i><strong>{{balance.bean}}</strong></span>
            <i class="back" @click="goStored()"></i>
          </div>
          <div class="queryBtn" @click="querySgift()">確定</div>
        </div>
      </van-popup>

      <!-- 倒計時選擇彈窗 -->
      <van-popup v-model="showTimePup" position="bottom" :round="true">
        <ul class="timeList">
          <li v-for="(item,index) in timeArr" :key="index" :class="{act:timeIndex == index}" @click="timeQuery(index)">{{item}}分鐘</li>
        </ul>
      </van-popup>
      <div class="mask" v-if="showCommitPup">
        <transition name="slise">
          <div class="commitQueryPup" v-show="showCommitPup">
            <div class="title">提示</div>
            <p class="msg">確認支付{{price}}購買獎品<br />
              並發起抽獎？
            </p>
            <div class="btnBox">
              <span class="cancel" @click="closeCommitPup()">取消</span>
              <span class="query" @click="commitLuck()">確定</span>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <Loading v-show="loading" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Loading from './components/common/Loading';
import { getRoomDraw, getcustomDrawPriseList, fixedDraw, createCustomDraw, createFixedDraw } from "./apis"
import { toast, getUrlString } from "./utils"
import store from "./store"
export default {
  components: { Loading },
  data() {
    return {
      luckType: 0, //當前用戶身份  1房主管理員主持人 0 普通用戶
      giftList: [],
      actGift: {},
      actGiftT: {}, //暫存當前選擇
      sActGift: {},
      sActGiftT: {},//暫存當前選擇
      show: false,
      showTimePup: false,
      timeArr: [2, 5, 10, 30, 60],
      timeIndex: null,
      showSgiftPup: false,
      tabIndex: 1,
      tabArr: ["VIP", "禮物", "座駕", "頭飾", null, "名片", "主題"],
      tabGift: {},   //tab對應的禮物
      balance: {},
      tabLoading: false,
      vipType: 0,
      cardType: 0,
      peopleType: 1,
      showCommitPup: false,
      fixedDrawList: [],
      fixeActDraw: {},
      fixeActIndex: 0,
      giftType: {
        coin: '金幣',
        bean: '金豆',
        free: ''
      }
    }
  },
  computed: {
    ...mapState(['loading']),
    viewHeight: () => window.innerHeight,
    pageGiftList() {
      return this.formackArr(this.giftList)
    },
    nowTabGift() {
      if (this.tabGift[this.tabIndex]) {
        return this.formackArr(this.tabGift[this.tabIndex].prise_list)
      }
      return []
    },
    isCommit() {
      let s = true
      if (!this.sActGift.id || !this.sActGift.id || this.timeIndex == null || !this.peopleType) {
        s = false
      }
      return s
    },
    price() {
      if (this.luckType) {
        return `${this.sActGift.price}${this.giftType[this.sActGift.currency]}`
      } else {
        return `${this.fixeActDraw.prise_price}${this.giftType[this.fixeActDraw.prise_currency]}`
      }
    }
  },
  watch: {
    // tabGift(val) {
    //   console.log(val)
    //   this.nowTabGift = this.formackArr(val[this.tabIndex])
    // }
  },
  created() {
    let host = getUrlString('host')
    let role = getUrlString('role')
    if (host == 1 || role == 400 || role == 500) {
      this.luckType = 1
    }
    if (!this.luckType) {
      fixedDraw().then(res => {
        this.fixedDrawList = res.data.response_data
        this.fixeActDraw = this.fixedDrawList[0]
      })
    }
  },
  methods: {
    setactGift(item) {  //當前item
      this.actGiftT = item
    },
    setSactGift(item) {
      this.sActGiftT = item
    },
    changGift() {
      if (!this.giftList.length) {
        // this.tabLoading = true
        getRoomDraw().then(res => {
          // this.tabLoading = false
          this.giftList = res.data.response_data
        })
      }
      this.show = true
    },
    queryGift() {
      if (this.actGiftT.id) {
        this.show = !this.show
        this.actGift = Object.assign({}, this.actGiftT)
      } else {
        toast(`請選擇抽獎資格！`)
      }
    },
    querySgift() {
      if (this.sActGiftT.id) {
        this.showSgiftPup = !this.showSgiftPup
        this.sActGift = Object.assign({}, this.sActGiftT)
      } else {
        toast(`請選擇獎品！`)
      }
    },
    setTime() {
      this.showTimePup = true
    },
    timeQuery(index) {
      this.timeIndex = index
      this.showTimePup = false
    },
    setSgift(index) {
      if (this.tabGift[index] && this.tabGift[index].loaded) {
        this.showSgiftPup = true
      } else {
        this.showSgiftPup = true
        getcustomDrawPriseList(index).then(res => {
          let prise_list = res.data.response_data.prise_list
          this.$set(this.tabGift, index, {
            Loading: false,
            prise_list,
            loaded: true
          })
          this.balance = res.data.response_data.balance
          if (index == 1 || index == 6 || index == 7) {   //默認獎品為VIP第一個
            this.sActGiftT = prise_list[0]
            // this.sActGift = this.sActGiftT
          }

        })
      }
    },
    setTabGift() {

    },
    setFixedGift(item, index) {
      this.fixeActDraw = item
      this.fixeActIndex = index
    },
    tabClick(index) {
      this.tabIndex = index
      this.setSgift(index)
    },
    vipClick(index, item) {
      this.vipType = index
      this.sActGiftT = item
    },
    cardsClick(index, item) {
      this.cardType = index
      this.sActGiftT = item
    },
    formackArr(arr) {
      let pageList = []
      let j = -1
      arr.forEach((e, i) => {
        if (pageList[j] && pageList[j].length < 8) {
          pageList[j].push(e)
        } else {
          j++
          pageList[j] = [e]
        }
      });
      return pageList
    },
    setPeopleType(num) {
      this.peopleType = num
    },
    commitLuck() {
      if (this.luckType && this.isCommit) {
        store.commit('updateLoading', true);
        createCustomDraw(this.actGift.id, this.sActGift.id, this.peopleType, this.timeArr[this.timeIndex]).then(res => {
          store.commit('updateLoading', false);
          if (res.data.response_data) {
            toast('抽獎已發起')
            setTimeout(() => {
              this.closeWeb()
            }, 300)
          } else {
            toast(res.data.response_status.error)
          }
        })
      }
      else if (!this.luckType && this.peopleType) {
        store.commit('updateLoading', true);
        createFixedDraw(this.fixeActDraw.id, this.peopleType).then(res => {
          store.commit('updateLoading', false);
          if (res.data.response_data) {
            toast('抽獎已發起')
            setTimeout(() => {
              this.closeWeb()
            }, 300)
          } else {
            toast(res.data.response_status.error)
          }
        })
      }
    },
    showPricePup() {
      if ((this.luckType && this.isCommit) || (!this.luckType && this.peopleType)) {
        this.showCommitPup = true
      }
    },
    closeCommitPup() {
      this.showCommitPup = false
    },
    closeWeb() {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        window.JSInterface.closeWeb();
      } else {
        closeWeb();
      }
    },
    goStored() {
      location.href = "walletConfig://"
    }
  }
};
</script>

<style lang="scss">
#app {
  position: relative;
}
.tabLoading {
  text-align: center;
  margin-top: 0.5rem;
  color: #fff;
  position: absolute;
  top: 1.2rem;
  left: 3.2rem;
}
body {
  background: #fafafa;
}
.pageSetting {
  .appHeader {
    height: 0.8rem;
  }
  .settIngCon {
    padding: 0 0.3rem;
    .tipsBox {
      padding: 0 0.1rem;
      .tipsTitle {
        color: rgba(12, 12, 12, 1);
        font-size: 0.34rem;
        font-weight: 500;
        height: 0.88rem;
        line-height: 0.88rem;
      }
      .tips {
        color: rgba(144, 144, 144, 1);
      }
    }
    .from {
      margin-top: 0.5rem;
    }
    .fromItem {
      height: 0.8rem;
      margin-bottom: 0.4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      > span {
        color: rgba(12, 12, 12, 1);
        font-size: 0.34rem;
        font-weight: 500;
      }
      .itemCon {
        width: 5.23rem;
        height: 0.8rem;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(230, 230, 230, 1);
        border-radius: 0.1rem;
        text-indent: 0.2rem;
        line-height: 0.8rem;
        color: rgba(55, 55, 55, 1);
        font-size: 0.28rem;
        position: relative;
        .actGift1 {
          display: flex;
          align-items: center;
          img {
            width: 0.6rem;
            height: 0.6rem;
            margin: 0 0.1rem 0 0.2rem;
          }
          strong {
            text-indent: 0;
            font-size: 0.28rem;
          }
          .textIndex {
            text-indent: 0.2rem;
          }
        }
        span {
          font-size: 0.28rem;
          color: rgba(55, 55, 55, 1);
        }
        .noSet {
          color: rgba(216, 216, 216, 1);
          font-size: 0.28rem;
        }
        .arr {
          display: block;
          width: 0.12rem;
          height: 0.2rem;
          background: url(./img/arr.png);
          background-size: 100% 100%;
          position: absolute;
          top: 0.3rem;
          right: 0.2rem;
        }
      }
    }
    .setpeopleType {
      display: flex;
      align-items: center;
      margin-top: 0.55rem;
      > span {
        color: rgba(12, 12, 12, 1);
        font-size: 0.34rem;
        font-weight: 500;
      }
      .peopleType {
        display: flex;
        align-items: center;
        margin-left: 0.5rem;
        span {
          color: rgba(55, 55, 55, 1);
          display: flex;
          align-items: center;
          margin-right: 0.4rem;
          i {
            width: 0.3rem;
            height: 0.3rem;
            background: url(./img/cVoteIcon1.png);
            background-size: 100% 100%;
            margin-right: 0.2rem;
            &.act {
              background: url(./img/cVoteIcon3.png);
              background-size: 100% 100%;
            }
          }
        }
      }
    }
    .commitBtn {
      width: 3.7rem;
      height: 0.8rem;
      border: 1px solid rgba(0, 0, 0, 0);
      background: rgba(230, 230, 230, 1);
      font-size: 0.32rem;
      border-radius: 0.6rem;
      margin: 0.6rem auto 1.07rem;
      text-align: center;
      line-height: 0.8rem;
      &.act {
        background: linear-gradient(
          274deg,
          rgba(252, 2, 116, 1) 0%,
          rgba(252, 82, 40, 1) 100%
        );
      }
    }
  }
  .giftList {
    height: 5.74rem;
    border-radius: 0.32rem 0.32rem 0 0;
    overflow: hidden;
    position: relative;
    .tabs {
      width: 6.7rem;
      height: 1rem;
      // padding: 0 0.4rem;
      margin: 0 auto;
      margin-bottom: 0.2rem;
      color: rgba(20, 16, 38, 1);
      font-size: 0.32rem;
      position: relative;
      overflow-x: scroll;
      text-align: center;
      white-space: nowrap;
      span {
        display: inline-block;
        padding: 0 0.2rem;
        line-height: 1rem;
        text-align: center;
        color: rgba(255, 255, 255, 0.4);
        position: relative;
        &.pd0{
          padding:0;
        }
        &.act {
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
        }
        &.act::before {
          content: "";
          display: block;
          width: 0.24rem;
          height: 0.06rem;
          background: rgba(255, 255, 255, 1);
          border-radius: 0.06rem;
          position: absolute;
          bottom: 0.13rem;
          left: 40%;
        }
      }
    }
    .tabs::-webkit-scrollbar {
      display: none;
    }
    .blurMask {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(20, 16, 38, 0.95);
    }
    .my-swipe {
      width: 7.5rem;
      height: 4.62rem;
      position: relative;
      padding-top: 0.6rem;
    }
    .my-swipe-sGift,
    .vipCon {
      height: 3.8rem;
      position: relative;
      .vipTips {
        padding: 0 0.4rem;
        font-size: 0.26rem;
      }
      .vipBox {
        // height: 2.6rem;
        overflow: hidden;
      }
      .vipItem {
        padding: 0 0.4rem 0 0.4rem;
        // height: 2.6rem;
        overflow-x: scroll;
        overflow-y: hidden;
        margin-top: 0.24rem;
        white-space: nowrap;
        &.mt {
          margin-top: 0.36rem;
        }
        &.mt2 {
          margin-top: -0.04rem;
        }
        .item {
          display: inline-block;
          width: 2.18rem;
          height: 1.41rem;
          padding-top: 0.97rem;
          background: url(./img/vipDefault.png);
          background-size: 100% 100%;
          span {
            display: block;
            color: rgba(158, 153, 144, 1);
            text-align: center;
            &.price {
              font-size: 0.26rem;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-top: 0.18rem;
              i {
                width: 0.27rem;
                height: 0.27rem;
                background: url(./img/coins2.png);
                background-size: 100% 100%;
                margin-right: 0.06rem;
              }
            }
          }
          &.act {
            background: url(./img/vipAct.png);
            background-size: 100% 100%;
            span {
              color: rgba(255, 255, 255, 1);
            }
          }
        }
        .item2 {
          display: inline-block;
          width: 3rem;
          color: rgba(255, 255, 255, 1);
          margin-right: 0.2rem;
          position: relative;
          .imgBox {
            padding: 0;
          }
          img {
            width: 100%;
            height: 2.19rem;
            border-radius: 0.16rem;
          }
          .name {
            height: 0.45rem;
            font-size: 0.22rem;
            line-height: 0.5rem;
            text-align: center;
          }
          .price {
            display: flex;
            justify-content: center;
            align-items: center;
            i {
              width: 0.17rem;
              height: 0.17rem;
              background: url(./img/bead.png);
              background-size: 100% 100%;
              margin-right: 0.1rem;
              &.coins {
                background: url(./img/coins.png);
                background-size: 100% 100%;
              }
            }
            strong {
              font-size: 0.2rem !important;
            }
          }
          .select {
            display: block;
            width: 0.31rem;
            height: 0.32rem;
            background: url(./img/select.png);
            background-size: 100% 100%;
            position: absolute;
            top: 0.16rem;
            right: 0.15rem;
          }
          &.act {
            color: rgba(255, 225, 74, 1);
            .price {
              i {
                background: url(./img/bead2.png) !important;
                background-size: 100% 100% !important;
                &.coins {
                  background: url(./img/coins3.png) !important;
                  background-size: 100% 100% !important;
                }
              }
            }
          }
          &.bg {
            width: 2.01rem;
            .imgBox {
              height: 2.77rem;
              img {
                width: 2.01rem;
                height: 2.77rem;
              }
            }
          }
        }
      }
      .vipItem::-webkit-scrollbar {
        display: none;
      }
    }
    .van-swipe {
      overflow: visible !important ;
    }
    .van-swipe-item {
      color: #fff;
      font-size: 20px;
      height: 100%;
      text-align: center;
      display: flex;
      flex-wrap: wrap;
      .giftItem {
        width: 1.58rem;
        height: 1.54rem;
        padding: 0.1rem 0.14rem 0.06rem;
        position: relative;
        .giftMsg {
          position: relative;
          z-index: 3;
          img {
            display: block;
            width: 1rem;
            height: 1rem;
            margin: 0 auto;
          }
          .name {
            display: block;
            font-size: 0.18rem;
            margin-top: 0.08rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .pirce {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 0.25rem;
            i {
              width: 0.17rem;
              height: 0.17rem;
              background: url(./img/bead.png);
              background-size: 100% 100%;
              margin-right: 0.1rem;
              &.coins {
                background: url(./img/coins.png);
                background-size: 100% 100%;
              }
            }
            strong {
              font-size: 0.18rem !important;
            }
          }
          &.act {
            top: -0.36rem;
            color: rgba(255, 225, 74, 1);
            img {
              width: 1.13rem;
              height: 1.13rem;
            }
            .pirce {
              margin-top: 0.07rem;
              i {
                background: url(./img/bead2.png) !important;
                background-size: 100% 100% !important;
                &.coins {
                  background: url(./img/coins3.png) !important;
                  background-size: 100% 100% !important;
                }
              }
            }
          }
        }
        .actCon {
          width: 1.58rem;
          height: 1.54rem;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 0.24rem;
          position: absolute;
          z-index: 0;
        }
      }
    }
    .balance {
      // height: 0.64rem;
      color: rgba(255, 255, 255, 1);
      position: absolute;
      left: 0.3rem;
      bottom: 0.35rem;
      display: flex;
      align-items: center;
      span {
        min-width: 1.2rem;
        display: flex;
        align-items: center;
        i {
          margin-right: 0.08rem;
        }
        strong {
          font-size: 0.26rem;
        }
        &.coin {
          margin-right: 0.1rem;
          i {
            width: 0.28rem;
            height: 0.28rem;
            background: url(./img/coin.png);
            background-size: 100% 100%;
          }
        }
        &.bean {
          i {
            width: 0.25rem;
            height: 0.28rem;
            background: url(./img/bean.png);
            background-size: 100% 100%;
          }
        }
      }
      .back {
        width: 0.1rem;
        height: 0.16rem;
        background: url(./img/back.png);
        background-size: 100% 100%;
        margin-left: 0.07rem;
      }
    }
    .queryBtn {
      width: 1.6rem;
      height: 0.64rem;
      border: 1px solid rgba(0, 0, 0, 0);
      background: linear-gradient(
        313deg,
        rgba(252, 2, 116, 1) 0%,
        rgba(252, 82, 40, 1) 100%
      );
      position: absolute;
      right: 0.3rem;
      bottom: 0.17rem;
      border-radius: 0.6rem;
      font-size: 0.28rem;
      text-align: center;
      line-height: 0.64rem;
    }
  }
}
.van-popup {
  background: none;
}
.van-swipe__indicators {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.04rem;
  bottom: 0rem !important ;
  .van-swipe__indicator {
    width: 0.18rem;
    height: 0.06rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.04rem;
    margin: 0 !important;
  }
}
.timeList {
  padding: 0.1rem 0.2rem;
  height: 5rem;
  li {
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    color: rgba(55, 55, 55, 1);
    font-size: 0.34rem;
    border-radius: 0.06rem;
    &.act {
      background: rgba(240, 240, 240, 1);
    }
  }
}
.mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
.commitQueryPup {
  width: 5.6rem;
  height: 3.08rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.3rem;
  padding-top: 0.46rem;
  position: relative;
  .title {
    text-align: center;
    color: rgba(12, 12, 12, 1);
    font-size: 0.36rem;
    font-weight: 500;
  }
  .msg {
    font-size: 0.32rem;
    color: rgba(55, 55, 55, 1);
    text-align: center;
    margin-top: 0.24rem;
    line-height: 0.56rem;
  }
  .btnBox {
    width: 100%;
    height: 1.04rem;
    line-height: 1.04rem;
    display: flex;
    border-top: 1px solid rgba(236, 236, 236, 1);
    position: absolute;
    bottom: 0;
    span {
      flex: 1;
      text-align: center;
      color: rgba(144, 144, 144, 1);
      font-size: 0.36rem;
      &.query {
        color: rgba(252, 58, 58, 1);
      }
    }
  }
}
.setGift {
  .tipsTitle {
    color: rgba(12, 12, 12, 1);
    font-size: 0.34rem;
    font-weight: 500;
    height: 0.88rem;
    line-height: 0.88rem;
  }
  .fiexList {
    margin-top: 0.2rem;
    padding: 0 0.1rem;
    ul {
      display: flex;
      // justify-content: center;
      flex-wrap: wrap;
      li {
        width: 2.1rem;
        height: 3.13rem;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(230, 230, 230, 1);
        border-radius: 0.16rem;
        box-sizing: border-box;
        margin-bottom: 0.2rem;
        position: relative;
        .prise_type {
          display: block;
          width: 0.76rem;
          height: 0.34rem;
          font-size: 0.24rem;
          background: #cccccc;
          opacity: 1;
          text-align: center;
          line-height: 0.36rem;
          border-radius: 0.16rem 0 0.16rem 0;
          position: absolute;
          left: -0.01rem;
          top: -0.01rem;
        }
        .giftImg {
          width: 1.4rem;
          height: 1.4rem;
          display: block;
          margin: 0.3rem auto 0;
          &.bg {
            width: 0.94rem;
            height: 1.3rem;
            border-radius: 0.16rem;
            margin: 0.4rem auto 0;
          }
          &.card {
            width: 1.3rem;
            height: 0.95rem;
            border-radius: 0.16rem;
            margin: 0.75rem auto 0;
          }
        }
        span {
          display: block;
        }
        .name {
          font-size: 0.32rem;
          color: rgba(55, 55, 55, 1);
          line-height: 0.36rem;
          text-align: center;
          margin-top: 0.2rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .price {
          margin-top: 0.16rem;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 0.36rem;
          color: rgba(155, 155, 155, 1);
          font-size: 0.28rem;
          i {
            width: 0.24rem;
            height: 0.24rem;
            background: url(./img/coins2.png);
            background-size: 100% 100%;
            margin-right: 0.08rem;
            &.bean {
              background: url(./img/bean.png);
              background-size: 100% 100%;
            }
          }
        }
        &.act {
          border: 1px solid rgba(252, 64, 57, 1);
          .prise_type {
            background: rgba(252, 64, 57, 1);
          }
        }
      }
      li:nth-child(3n-1) {
        margin: 0 0.2rem;
      }
    }
    .sGift {
      height: 0.6rem;
      display: flex;
      align-items: center;
      color: rgba(55, 55, 55, 1);
      font-size: 0.28rem;
      line-height: 0.36rem;
      img {
        width: 0.6rem;
        height: 0.6rem;
        margin: 0 0.08rem 0 0.1rem;
      }
    }
    .fTime {
      color: rgba(55, 55, 55, 1);
    }
  }
}
.bgopt {
  background-color: rgba(255, 255, 255, 0) !important;
}
</style>