<template>
  <div class="lackBox">
    <div class="boxCon">
      <div class="luckBox" :style="{'background-position-Y':imgPos[imgindex]}">
        <i class="luckTips" @click="showBoxGift()">獎勵説明</i>
      </div>
      <div class="open" :class="{act:clueOpen}" @click="openBox()"></div>
    </div>
    <p class="tips">
      再儲值{{userMsg.diff_charge}}金幣免費獲得一條鑰匙 </br>
      <em>（2月22日0時起計算）</em>
    </p>
    <span class="goCun" @click="goCun()">儲值</span>
    <div class="mask" v-show="showT">
      <transition name="slide">
        <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
      </transition>
    </div>

    <div class="mask" v-show="showGiftPup">
      <transition name="slide">
        <div class="giftPupCon" v-show="showGiftPup">
          <i class="close" @click="closePup()"></i>
          <div class="imgBox">
            <img :src="imgSrc" alt="">
            <em>{{giftPupName}}</em>
          </div>
          <div class="querBtn" @click="closePup()">确定</div>
        </div>
      </transition>
    </div>
    <img :src="imgSrc" alt="" class="lateImg" :class="{giftLate:showLate}">
    <div class="mask" v-show="showBoxGiftItem">
      <transition name="slide">
        <div class="boxGiftCon" v-show="showBoxGiftItem">
          <div class="title">寶箱獎勵 <span class="close" @click="closeGiftItem"></span></div>
          <div class="con">
            <p class="giftTips">開啟寶箱有機會獲得以下獎勵之一</p>
          </div>
          <div class="giftItem" :class="{flex:isloading||noGift,maxH:gift_list2.length>3}">
            <p v-if="isloading" class="loadingTips">加载中...</p>
            <p class="noGift" v-if="noGift">暂无礼物哦~</p>
            <span v-for="(item,index) in gift_list2" :key="index">
              <div class="imgBg">
                <img :src="item.picture" alt="">
              </div>
              <em>{{item.name}}</em>
            </span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import api from "../api/apiConfig"
import MsgToast from "../components/commonToast"
import { setTimeout } from 'timers';
export default {
  components: { MsgToast },
  data() {
    return {
      showGiftPup: false,
      tastMsg: '',
      showT: false,
      imgSrc: '',
      giftPupName: '',
      showBoxGiftItem: false,
      gift_list2: [],
      imgindex: 0,
      imgPos: [
        "-0.1rem", "-11.2rem", "-7.5rem", "-3.8rem"
      ],
      tmier2: null,
      showLate: false,
      isloading: false,
      noGift: false,
      lucking: false,
      istest: false
    }
  },
  computed: {
    ...mapState(["userMsg", "gift_list"]),
    clueOpen() {
      if (this.userMsg.box_key > 0 && this.userMsg.lock_box > 0) {
        return true
      }
    }
  },
  methods: {
    testClick() {
      this.istest = true
    },
    openBox() {
      if (this.lucking) return  //动画未结束
      if (this.userMsg.box_key > 0 && this.userMsg.lock_box > 0) {
        this.lucking = true
        api.luckDraw(1).then(res => {
          if (res.data.response_status.code == 0) {
            this.tmier2 = setInterval(() => {
              this.imgindex++
              if (this.imgindex === 4) {
                clearInterval(this.tmier2)
                this.imgindex = 0
                this.$store.commit('reducnKey')  //減箱子鑰匙
                var gift_info = res.data.response_data.gift_info  //礼物弹窗名和图片
                this.imgSrc = gift_info.picture
                this.giftPupName = gift_info.name
                //抽中特殊礼物
                let addType = {}
                if (gift_info.gift_type == 6) {  //抽奖券
                  addType.type = 1
                } else if (gift_info.gift_type == 7) {  //箱子
                  addType.type = 2
                } else if (gift_info.gift_type == 8) {  //钥匙
                  addType.type = 3
                }
                addType.num = gift_info.num * 1
                if (addType.type) {
                  this.$store.commit('addGift', addType)
                }
                this.showGiftPup = true  //禮物彈窗
                this.lucking = false
              }
            }, 150);
          } else {
            this.tastMsg = res.data.response_status.error
            this.showT = true
          }
        })
      } else if (this.userMsg.lock_box <= 0) {
        this.tastMsg = '您的寶箱不足哦,快去獲取寶箱吧！'
        this.showT = true
      } else if (this.userMsg.box_key <= 0) {
        this.tastMsg = '您的鑰匙不足哦,不能開啟寶箱！'
        this.showT = true
      }
    },
    showBoxGift() {
      if (this.gift_list2.length == 0) {
        this.isloading = true
        api.getDefault(1).then(res => {
          this.isloading = false
          this.gift_list2 = res.data.response_data.gift_list
          if (this.gift_list2.length == 0) {
            this.noGift = true
          }
        })
      }
      this.showBoxGiftItem = true
    },
    goCun() {
      location.href = "walletConfig://"
    },
    closeToast() {
      this.showT = false
    },
    closePup() {
      this.showGiftPup = false
      this.showLate = true
      setTimeout(() => {
        this.showLate = false
      }, 1000)
    },
    closeGiftItem() {
      this.showBoxGiftItem = false
    }
  }
}
</script>
<style lang= "scss"scoped>
.lackBox {
  height: 6.9rem;
  position: relative;
  overflow: hidden;
  .boxCon {
    width: 6.06rem;
    height: 4.46rem;
    background: url(../assets/img/luckBoxBg.png);
    background-size: 100% 100%;
    position: absolute;
    top: -0.82rem;
    left: 0.72rem;
    .luckBox {
      width: 3.5rem;
      height: 3.5rem;
      background: url(../assets/img/luckBox1.png);
      background-size: 100% auto;
      position: absolute;
      top: 0.52rem;
      left: 1.34rem;
      .luckTips {
        display: block;
        width: 1.3rem;
        height: 0.46rem;
        padding-top: 0.02rem;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 0.24rem 0.24rem 0.24rem 0;
        font-size: 80%;
        color: #fef129;
        text-align: center;
        line-height: 0.48rem;
        position: absolute;
        top: 0.62rem;
        right: -0.25rem;
        animation: heart 1.3s ease-in-out 2.7s infinite alternate;
      }
    }
    .open {
      width: 3.31rem;
      height: 0.91rem;
      background: url(../assets/img/openBlack.png);
      background-size: 100% 100%;
      position: absolute;
      bottom: -1.2rem;
      left: 1.37rem;
      &.act {
        background: url(../assets/img/openAct.png);
        background-size: 100% 100%;
      }
    }
  }
  .tips {
    position: absolute;
    top: 5.3rem;
    left: 0.29rem;
    em {
      display: block;
      margin: -0.08rem 0 0 -0.1rem;
      font-size: 0.2rem;
      opacity: 0.5;
    }
  }
  .goCun {
    display: block;
    width: 1rem;
    height: 0.48rem;
    border: 0.02rem solid rgba(254, 241, 41, 0.6);
    border-radius: 0.08rem;
    text-align: center;
    line-height: 0.48rem;
    font-size: 86%;
    color: #fef129;
    position: absolute;
    right: 0.31rem;
    top: 5.4rem;
  }
}
.giftPupCon {
  width: 4rem;
  height: 3.93rem;
  background: rgba(124, 65, 241, 1);
  border-radius: 0.16rem;
  position: absolute;
  top: 2.26rem;
  left: 1.74rem;
  .close {
    display: block;
    width: 0.37rem;
    height: 0.37rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    top: 0.25rem;
    right: 0.35rem;
  }
  .imgBox {
    width: 2.59rem;
    height: 2.47rem;
    background: url(../assets/img/giftPupBg.png);
    background-size: 100% 100%;
    margin: 0.03rem 0.72rem 0;
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
    margin: 0.31rem auto;
  }
}
.lateImg {
  width: 1.6rem;
  height: 1.6rem;
  z-index: 10000;
  position: absolute;
  top: 0.8rem;
  left: 2.95rem;
  display: none;
  &.giftLate {
    display: block;
    animation: giftLate 1s linear;
  }
}
.boxGiftCon {
  width: 5.2rem;
  background: rgba(124, 65, 241, 1);
  border-radius: 0.16rem;
  position: absolute;
  top: 2.26rem;
  left: 1.14rem;
  padding-bottom: 0.21rem;
  transition: all 10s;
  .title {
    font-size: 106%;
    height: 0.9rem;
    line-height: 0.9rem;
    padding-left: 0.3rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 0.16rem 0.16rem 0px 0px;
    position: relative;
    .close {
      display: block;
      width: 0.37rem;
      height: 0.37rem;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.27rem;
      right: 0.3rem;
    }
  }
  .con {
    .giftTips {
      margin: 0.17rem 0 0 0.3rem;
      font-size: 80%;
      color: #cccccc;
    }
  }
  .loadingTips,
  .noGift {
    text-align: center;
  }
  .giftItem {
    width: 4.38rem;
    height: 1.8rem;
    max-height: 3.6rem;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    /* overflow: hidden; */
    margin: 0.21rem auto 0;
    transition: all 0.2s;
    &.maxH {
      height: 3.6rem;
    }
    &.flex {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    span {
      width: 33.3%;
      height: 1.7rem;
      margin-bottom: 0.1rem;
      display: inline-block;
      vertical-align: middle;
      .imgBg {
        width: 1.2rem;
        height: 1.2rem;
        margin: 0 auto;
        /* background: rgba(0, 0, 0, 0.1);
        border-radius: 0.16rem; */
        img {
          width: 1.2rem;
          height: 1.2rem;
          display: block;
          margin: 0 auto;
        }
      }

      em {
        height: 0.5rem;
        display: block;
        width: auto;
        font-size: 70%;
        text-align: center;
      }
    }
  }
  .giftItem::-webkit-scrollbar {
    width: 0.06rem;
  }
  .giftItem::-webkit-scrollbar-thumb {
    width: 0.06rem;
    background: rgba(255, 255, 255, 0.15);
  }
}
@keyframes heart {
  //上下浮動
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(0, 6px);
  }
}
@keyframes giftLate {
  0% {
    top: 0.8rem;
    left: 2.95rem;
  }
  to {
    top: 6.3rem;
    left: 6.3rem;
    transform: scale(0);
    opacity: 0;
  }
}
</style>
