<template>
  <div class="giftBoxList" :class="{overTurn:!this.type}" :style="{maxHeight:!this.type?pupMaxHeight+'px':'none'}">
    <p>Kumpulkan fragmen dan menukar hadiah langka</p>
    <p v-if="loading" class="loading">Loading...</p>
    <div class="list">
      <div class="item" v-for="(item,index) in list" :key="index">
        <span>
          <img :src="item.picture" alt="">
          <em>{{item.name}}</em>
          <strong> <i></i> {{item.pay_num}}</strong>
        </span>
        <div class="btn" @click="showPup(item)">Menukar</div>
      </div>
    </div>
    <Footer :user_wallet="user_wallet" :type="type" />
    <div class="mask" :style="{height:mainHeight+'px'}" v-show="showGiftPup">
      <transition name="slide">
        <div class="giftPupCon" v-show="showGiftPup">
          <i class="close" @click="closePup()"></i>
          <p>Selamat</p>
          <div class="imgBox">
            <img :src="lateImg" alt="">
            <em>{{giftPupName}}</em>
          </div>
          <div class="querBtn" @click="closePup()">Ya</div>
        </div>
      </transition>
    </div>
    <div class="mask" :style="{height:mainHeight+'px'}" v-show="showT">
      <transition name="slide">
        <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
      </transition>
    </div>
  </div>
</template>
<script>
import Footer from "./Footer"
import api from "../api/apiConfig"
import MsgToast from "../components/commonToast"
import { mapState } from "vuex"
export default {
  components: { Footer, MsgToast },
  props: ["type"],
  data() {
    return {
      list: [],
      mainHeight: 0,
      showGiftPup: false,
      giftPupName: '',
      lateImg: '',
      loading: false,
      user_wallet: {},
      tastMsg: '',
      showT: false
    }
  },
  computed: {
    ...mapState(["userMsg"]),
  },
  created() {
    this.pupMaxHeight = sessionStorage.getItem('pupMaxHeight')
    this.mainHeight = sessionStorage.getItem('pupHeight')
    if (this.type) {
      this.user_wallet = JSON.parse(sessionStorage.getItem('user_wallet'))
    } else {
      this.user_wallet = this.userMsg
    }
    this.loading = true
    api.getGiftList(11).then(res => {
      this.loading = false
      this.list = res.data.response_data.gift_list
    })
  },
  methods: {
    showPup(item) {
      if (Number(this.user_wallet.gift_puzzle) >= Number(item.pay_num)) {
        api.getGift(11, item.gift_id).then(res => {
          if (res.data.response_status.code == 0) {
            this.lateImg = item.picture
            this.giftPupName = item.name
            this.showGiftPup = true
            if (this.type) {
              this.user_wallet.gift_puzzle = this.user_wallet.gift_puzzle - item.pay_num
            } else {
              let obj = {
                type: 1,
                num: item.pay_num
              }
              this.$store.commit('reduceFramce', obj)
            }
            //sessionStorage.setItem('user_wallet', JSON.stringify(this.user_wallet.gift_puzzle))   //頁面用
          } else {
            this.tastMsg = res.data.response_status.error
            this.showT = true
          }
        })
      } else {
        this.tastMsg = 'Fragmen hadiahmu gak cukup,cepatlah dapatkannya!'
        this.showT = true
      }
    },
    closePup() {
      this.showGiftPup = false
    },
    closeToast() {
      this.showT = false
    }
  }
}
</script>
<style lang= "scss" scoped>
.giftBoxList {
  &.overTurn {
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch; //有回弹效果
    -webkit-overflow-scrolling: auto; //滑到哪停到哪
  }
  > p {
    height: 0.7rem;
    line-height: 0.7rem;
    font-size: 0.26rem;
    text-align: center;
  }
  .loading {
    text-align: center;
    margin-top: 0.7rem;
  }
  > .list {
    padding: 0 0.4rem;
    /* height: 7.15rem; */
    /* overflow-x: hidden; */
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    -webkit-overflow-scrolling: auto;
    display: flex;
    flex-wrap: wrap;
    .item {
      /* display: inline-block;
      vertical-align: top; */
      width: 33%;
      /* margin: 0 0.35rem 0.24rem 0; */
      margin-bottom: 0.24rem;
      span {
        display: block;
        width: 2rem;
        height: 2.14rem;
        background: url(../assets/img/boxGiftItem.png);
        background-size: 100% 100%;
        padding-top: 0.2rem;
        img {
          width: 1.2rem;
          height: 1.18rem;
          display: block;
          margin: 0 auto 0;
        }
        em {
          max-width: 2rem;
          height: 0.45rem;
          line-height: 0.45rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          display: block;
          text-align: center;
          font-size: 0.22rem;
        }
        strong {
          height: 0.45rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.28rem;
          i {
            display: block;
            width: 0.35rem;
            height: 0.35rem;
            background: url(../assets/img/giftFrame2.png);
            background-size: 100% 100%;
            margin-right: 0.05rem;
          }
        }
      }
      .btn {
        width: 2.01rem;
        height: 0.56rem;
        background: url(../assets/img/duihuanBtn.png);
        background-size: 100% 100%;
        text-align: center;
        line-height: 0.56rem;
        font-size: 0.28rem;
        font-weight: 500;
        color: #8e4519;
        margin-top: 0.12rem;
      }
    }
    .item:nth-child(3n) {
      margin-right: 0;
    }
  }
}
.giftPupCon {
  width: 4rem;
  min-height: 4.38rem;
  background: rgba(124, 65, 241, 1);
  border-radius: 0.16rem;
  position: absolute;
  padding-bottom: 0.2rem;
  /* position: absolute;
  top: 2.26rem;
  left: 1.74rem; */
  .close {
    display: block;
    width: 0.37rem;
    height: 0.37rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;
  }
  p {
    text-align: center;
    margin-top: 0.24rem;
    font-size: 0.32rem;
  }
  .imgBox {
    width: 2.59rem;
    min-height: 2.47rem;
    background: url(../assets/img/giftPupBg.png) no-repeat;
    background-size: 100% auto;
    margin: -0.05rem 0.72rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 1.6rem;
      height: 1.6rem;
      margin-top: 0.4rem;
    }
    em {
      text-align: center;
      font-size: 106%;
    }
  }
  .querBtn {
    width: 2.4rem;
    height: 0.72rem;
    background: rgba(254, 241, 41, 1);
    border-radius: 0.36rem;
    text-align: center;
    line-height: 0.72rem;
    color: #7c41f1;
    font-size: 103%;
    margin: 0.26rem auto 0;
  }
}
</style>
