<template>
  <div v-if="owner_msg" class="landsBox">
    <div class="nowUserMsg">
      <img :src="nowShowUser.avatar" alt="" @click="goUser(nowShowUser.uid)">
      <div class="msg">
        <div class="name" v-html="lang.manorName.replace('%n',nowShowUser.nick)"></div>
        <div class="score" v-if="isMain == 1"><i></i><strong>{{nowShowUser.sun}}</strong></div>
      </div>
    </div>
    <div class="portal" @click="portalUser()"></div>
    <div class="lands">
      <land v-for="land in land_info" :info="land" :key="land.id" :svgaData="svgaData" :next_land_id="next_land_id" />
    </div>
    <!-- 扩建确认 -->
    <div class="mask" v-show="showLockPup">
      <transition name="slide">
        <div class="confirmUnlock" v-if="showLockPup">
          <div class="title">{{lang.unlockLandTitle}}</div>
          <div class="landImgBox">
            <img src="../img/land.png" alt="">
          </div>
          <p>{{lang.unlockTips.replace('%c',land_info[landId].coins)}}</p>
          <div class="btnBox">
            <u @click="showLockPup = false">{{lang.cancel}}</u>
            <span @click="unLock()">{{lang.qureyUnlock}}</span>
          </div>
        </div>
      </transition>
    </div>
    <!-- 用戶種子列表 -->
    <div class="mask" v-show="showGoodListPup" @click="showGoodListPup = false"></div>
    <transition name="slide2">
      <div class="mkBg" v-if="showGoodListPup">
        <div class="userGoodList">
          <i @click="showGoodListPup = false" class="close"> </i>
          <div class="noGoods" v-if="!userGoodsList.length">
            <strong>{{lang.goodsNotHas}}</strong>
            <span class="buy" @click="goShop()">{{lang.buyGoods}}</span>
          </div>
          <div class=" goodsList" v-else>
            <div class="goodItem" v-for="(item,index) in userGoodsList" :key="index" @click="plant(item.id)">
              <img :src="require(`../img/goods/${item.id}.png`)" alt="">
              <div class="nums">{{item.num}}</div>
              <div class="name">{{item.name}}</div>
            </div>
          </div>
        </div>
      </div>

    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Land from './Land';
import { preloadImages, getUrlString } from '../utils';
import { getLands, addLand, goodsList, plant } from "../apis"
import { Downloader, Parser } from 'svga.lite'

const downloader = new Downloader()
const parser = new Parser({ disableWorker: true })

export default {
  data () {
    return {
      svgaData: {},
      userGoodsList: [],
      next_land_id: 0,
      showLockPup: false,
      showGoodListPup: false,
      landId: 0
    }
  },
  computed: {
    ...mapState(['owner_msg', 'land_info', 'isMain', 'owner', 'portal', 'otherUser']),
    nowShowUser () {
      if (this.isMain == 1) {
        return this.owner
      } else if (this.isMain == 2) {
        return this.otherUser
      }

    }
  },
  created () {
    this.init()
    this.getSvgaData()
  },
  methods: {
    init (uid, type) {
      const getUid = uid ? uid : getUrlString('uid')
      getLands(getUid).then(res => {
        if (getUid == getUrlString('uid')) {
          this.vxc('setIsMain', 1)
        } else {
          this.vxc('setIsMain', 2)
          if (type == 'portal' || type == 'rank' || type == 'back') {
            this.toast(this.lang.welcome.replace('%n', this.otherUser.nick))
          }
        }
        let list = res.data.response_data.list
        this.next_land_id = res.data.response_data.next_land_id
        this.vxc('setLandInfo', list);
        this.vxc('setIs_friend', res.data.response_data.is_friend)
      })
    },
    portalUser () {
      if (this.portal.uid) {
        this.vxc('setOtherUser', this.portal)
        this.init(this.portal, 'portal')
      }
    },
    buyLand (id) {
      this.landId = id
      this.showLockPup = true
    },
    unLock () {
      if (this.owner.coins >= this.land_info[this.landId].coins) {
        addLand().then(res => {
          if (res.data.response_status.code == 0) {
            this.showLockPup = false
            this.toast(this.lang.unLandSuc)
            this.init()
          } else {
            this.toast(res.data.response_status.error)
          }
        })
      } else {
        this.toast(this.lang.notCoins)
        setTimeout(() => {
          this.gowalletpage()
        }, 1000)
      }

    },
    getGoodsList (type, id) {
      goodsList(type).then(res => {
        this.landId = id
        this.showGoodListPup = true
        this.userGoodsList = res.data.response_data.list
      })
    },
    plant (goodId) {
      plant(this.landId, goodId).then(res => {
        if (res.data.response_status.code == 0) {
          this.toast(this.lang.plantSuc)
          this.showGoodListPup = false
          this.init()
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    async getSvgaData () {
      let addres = `http://fstatic.cat1314.com/uc/svga/4a4ee99542c0b8d5cebfb8a49cb2f276_1631005934.svga`
      const fileData = await downloader.get(addres);
      this.svgaData = await parser.do(fileData);
    },
    gowalletpage () {
      const ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      try {
        if (ios) {
          // goWalletpage()
          sendJsData('app://walletpage');
        } else {
          javascript: JSInterface.sendJsData('app://walletpage');
        }
      } catch (e) { }
    },
    goShop () {
      this.showGoodListPup = false
      this.$parent.type = 1
      let a = document.getElementsByClassName('tabsList')[0].getBoundingClientRect().top
      let c = document.documentElement.scrollTop || document.body.scrollTop
      let e = a + c - 10
      this.timer = setInterval(() => {
        let c = document.documentElement.scrollTop || document.body.scrollTop
        let t = (e - c) / 10
        let scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 30;
        window.scrollTo(0, c + t)
        console.log(t)
        if (t < 1 || scrollToBottom) {
          clearInterval(this.timer)
        }
      }, 10)
    },
    goUser (uid) {
      var isiOS = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      if (isiOS) {
        sendJsData('app://userInfo?uid=' + uid);
      } else {
        javascript: JSInterface.sendJsData('app://userInfo?uid=' + uid);
      }
    }
  },
  components: {
    Land,
  },
}
</script>

<style lang="scss">
@keyframes getSeed {
  100% {
    transform: scale(0.96);
  }
}
@keyframes role {
  55% {
    transform: translateY(0);
  }
  60% {
    transform: translateY(-5px);
  }
  65% {
    transform: translateY(0);
  }
}
.mask2 {
  position: fixed;
  z-index: 100000;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-self: center;
}

.landsBox {
  font-size: 0.3rem;
  width: 7.33rem;
  height: 8.18rem;
  position: relative;
  .nowUserMsg {
    display: flex;
    align-items: center;
    width: 3.39rem;
    height: 0.89rem;
    background: url(../img/userMsgBg.png);
    background-size: 100% 100%;
    position: absolute;
    z-index: 60;
    top: -0.89rem;
    left: 0.93rem;
    img {
      width: 1.1rem;
      height: 1.1rem;
      border-radius: 50%;
      margin-left: -0.55rem;
      box-sizing: border-box;
      border: 0.02rem solid #fff;
    }
    .msg {
      flex: 1;
      text-align: center;
      margin-left: -0.15rem;
      .name {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.26rem;
        height: 0.35rem;
        strong {
          display: block;
          font-size: 0.26rem;
          max-width: 1.5rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .score {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-top: 0.05rem;
        padding-left: 0.3rem;
        i {
          width: 0.37rem;
          height: 0.37rem;
          background: url(../img/sunIcon1.png);
          background-size: 100% 100%;
          margin-right: 0.05rem;
        }
        strong {
          color: #FFEE8E;
        }
      }
    }
  }
  .portal {
    width: 1.39rem;
    height: 1.35rem;
    background: url(../img/portal.png);
    background-size: 100% 100%;
    position: absolute;
    top: 6.8rem;
    right: 0;
    z-index: 50;
  }
  .lands {
    .land {
      position: absolute;
    }
    .land10 {
      top: 0.3rem;
      left: 2.48rem;
    }
    .land8 {
      top: 1.34rem;
      left: 0.85rem;
    }
    .land9 {
      top: 1.34rem;
      right: 1.12rem;
    }
    .land7 {
      top: 2.28rem;
      left: 2.44rem;
    }
    .land6 {
      top: 3.28rem;
      right: 1.09rem;
    }
    .land5 {
      top: 3.28rem;
      left: 0.89rem;
    }
    .land4 {
      top: 4.23rem;
      left: 2.47rem;
    }
    .land3 {
      top: 5.22rem;
      right: 0.84rem;
    }
    .land2 {
      top: 5.22rem;
      left: 0.84rem;
    }
    .land1 {
      top: 6.27rem;
      left: 2.5rem;
    }
  }
}
.confirmUnlock {
  width: 6.76rem;
  height: 7.84rem;
  padding-top: 0.3rem;
  background: url(../img/unLockBg.png);
  background-size: 100% 100%;
  .title {
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    font-size: 0.4rem;
    color: #8E4908;
    font-weight: bold;
    text-shadow: #FFFFDB 1px 0 0, #FFFFDB 0 1px 0, #FFFFDB -1px 0 0,
      #FFFFDB 0 -1px 0;
  }
  .landImgBox {
    width: 2.9rem;
    height: 2.36rem;
    background: url(../img/landImgBg.png);
    background-size: 100% 100%;
    margin: 0.7rem auto 0;
    padding-top: 0.7rem;
    img {
      width: 2.4rem;
      height: 1.6rem;
      margin: 0 auto;
    }
  }
  > p {
    padding: 0 0.8rem;
    font-size: 0.28rem;
    color: #672A0B;
    text-align: center;
    margin-top: 0.25rem;
  }
  .btnBox {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.35rem;
    u {
      color: #672A0B;
    }
    span {
      width: 2.78rem;
      height: 0.84rem;
      background: url(../img/buy.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.84rem;
      color: #672A0B;
      margin-left: 0.73rem;
    }
  }
}

.mkBg {
  width: 7.5rem;
  position: fixed;
  z-index: 100000;
  left: 0;
  top: 5rem;
}
.userGoodList {
  width: 7rem;
  height: 2.23rem;
  padding: 0.18rem 0.17rem 0;
  background: url(../img/goodlist.png);
  background-size: 100% 100%;
  position: relative;
  //   position: absolute;
  //   left: 0.05rem;
  &.props {
    width: 4.14rem;
    height: 2.22rem;
    background: url(../img/props.png);
    background-size: 100% 100%;
    .goodsList {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .close {
    display: block;
    width: 0.54rem;
    height: 0.54rem;
    background: url(../img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: -0.1rem;
    top: -0.25rem;
    z-index: 3;
  }
  .noGoods {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    strong {
      color: #D9B27F;
    }
    .buy {
      width: 2.78rem;
      height: 0.84rem;
      background: url(../img/buy.png);
      background-size: 100% 100%;
      text-align: center;
      text-align: center;
      line-height: 0.84rem;
      color: #672A0B;
      margin-top: 0.2rem;
    }
  }
  .desc {
    width: 5.6rem;
    height: 1.26rem;
    padding: 0.2rem;
    background: #FFF9E8;
    border: 1px solid #FFFFFF;
    border-radius: 0.1rem;
    color: #703500;
    font-size: 0.26rem;
    position: absolute;
    top: -2rem;
    left: -0.8rem;
    p {
      font-size: 0.24rem;
    }
    .user {
      width: 1.88rem;
      height: 0.59rem;
      background: url(../img/use.png);
      background-size: 100% 100%;
      margin: 0.15rem auto 0;
      text-align: center;
      line-height: 0.59rem;
    }
    .corner {
      display: block;
      width: 0px; /*  宽高设置为0，很重要，否则达不到效果 */
      height: 0px;
      border: 0.25rem solid #FFF9E8;
      border-bottom-color: transparent; /* 设置透明背景色 */
      border-left-color: transparent;
      border-right-color: transparent;
      position: absolute;
      bottom: -0.52rem;
      left: 1.8rem;
      &.ringht {
        left: 3.7rem;
      }
    }
  }
  .goodsList {
    width: 100%;
    height: 2.06rem;
    overflow-x: scroll;
    white-space: nowrap;
    .goodItem {
      display: inline-block;
      width: 1.79rem;
      height: 2.06rem;
      background: url(../img/goodItem.png);
      background-size: 100% 100%;
      margin-right: 0.04rem;
      position: relative;
      img {
        width: 1.09rem;
        height: 1.16rem;
        margin: 0.21rem auto 0;
      }
      .nums {
        width: 0.43rem;
        height: 0.43rem;
        border: 1px solid #FFFFFF;
        background: linear-gradient(0deg, #496BFF 0%, #64B5FF 100%);
        border-radius: 50%;
        position: absolute;
        top: 1.06rem;
        right: 0.19rem;
        text-align: center;
        line-height: 0.43rem;
        font-size: 0.24rem;
      }
      .name {
        text-align: center;
        font-size: 0.28rem;
        color: #703500;
        margin-top: 0.1rem;
      }
    }
  }
  .goodsList::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
}
</style>