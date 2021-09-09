<template>
  <div v-if="owner_msg" class="landsBox">
    <div class="nowUserMsg">
      <img :src="nowShowUser.avatar" alt="">
      <div class="msg">
        <div class="name"><strong>{{nowShowUser.nick}}</strong>的莊園</div>
        <div class="score"><i></i><strong>{{nowShowUser.score}}</strong></div>
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
          <div class="title">擴建土地</div>
          <div class="landImgBox">
            <img src="../img/land.png" alt="">
          </div>
          <p>擴建土地需要花費{{land_info[landId].coins}}金幣喔，請問是否要擴建？</p>
          <div class="btnBox">
            <u @click="showLockPup = false">我再想想</u>
            <span @click="unLock()">確定擴建</span>
          </div>
        </div>
      </transition>
    </div>
    <!-- 用戶種子列表 -->
    <div class="mask" v-show="showGoodListPup">
      <transition name="slide">
        <div class="userGoodList" v-if="showGoodListPup">
          <i @click="showGoodListPup = false" class="close"> </i>
          <div class="noGoods" v-if="!userGoodsList.length">
            <strong>倉庫里沒有種子哦...</strong>
            <span class="buy">去商店購買</span>
          </div>
          <div class="goodsList" v-else>
            <div class="goodItem" v-for="(item,index) in userGoodsList" :key="index" @click="plant(item.id)">
              <img :src="require(`../img/goods/${item.id}.png`)" alt="">
              <div class="nums">{{item.num}}</div>
              <div class="name">{{item.name}}</div>
            </div>
          </div>
        </div>
      </transition>
    </div>
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
    init (uid) {
      const getUid = uid ? uid : getUrlString('uid')
      getLands(getUid).then(res => {
        if (uid) {
          this.vxc('setIsMain', 2)
        }
        let list = res.data.response_data.list
        this.next_land_id = res.data.response_data.next_land_id
        this.vxc('setLandInfo', list);
        this.vxc('setIs_friend', res.data.response_data.is_friend)
      })
    },
    portalUser () {
      if (this.portal > 0) {
        this.init(this.portal)
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
            this.toast(`恭喜擴建成功，快去種下種子吧！`)
            this.init()
          } else {
            this.toast(res.data.response_status.error)
          }
        })
      } else {
        this.toast(`沒有足夠的金幣哦~`)
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
          this.toast(`種植成功！`)
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
        strong {
          display: block;
          max-width: 1.5rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .score {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 0.05rem;
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

.userGoodList {
  width: 7rem;
  height: 2.23rem;
  padding: 0.18rem 0.17rem 0;
  background: url(../img/goodlist.png);
  background-size: 100% 100%;
  position: relative;
  &.props {
    width: 4.14rem;
    height: 2.22rem;
    background: url(../img/props.png);
    background-size: 100% 100%;
    .goodsList {
      display: flex;
      align-items: center;
      justify-content: center;
      //    overflow-x: ;
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