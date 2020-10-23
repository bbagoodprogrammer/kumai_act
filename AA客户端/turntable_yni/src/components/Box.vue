<template>
  <div class="lackBox">
    <div class="boxCon">
      <div class="luckBox">
        <canvas id="canvas"></canvas>
      </div>
      <div class="open" :class="{act:clueOpen}" @click="openBox()"></div>
      <div class="bar">
        <div class="defaultBar">
          <span :class="'gift'+index" v-for="(item,index) in qustGiftArr" :key="index" @click="showClickGift(item)">
            <img :src="item.picture" class="giftImg" />
            <i class="yes" v-show="userMsg.go_count >= item.must_get"></i>
          </span>
        </div>
        <!-- :style="{height:barHeight + '%'}" -->
        <div class="actBar" :style="{height:barHeight + '%'}">
          <StarEffects v-if="barHeight>=30" />
        </div>
      </div>
    </div>
    <p class="tips">
      Terus top up {{userMsg.diff_charge}} koin emas,akan mendapatkan 1 kunci</br>
      <em>(Dihitung mulai dari jam 14:00 tgl 23 Oct)</em>
    </p>
    <Tabs />
    <div class="mask" :style="{height:mainHeight+'px'}" v-show="showT">
      <transition name="slide">
        <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
      </transition>
    </div>
    <div class="mask" :style="{height:mainHeight+'px'}" v-show="showGiftPup">
      <transition name="slide">
        <div class="giftPupCon" v-show="showGiftPup">
          <i class="close" @click="closePup()"></i>
          <p>{{pupType==1?'Selamat':pupTitle}}</p>
          <div class="imgBox">
            <img :src="imgSrc" alt="">
            <em>{{giftPupName}}</em>
          </div>
          <p v-if="showVerTips && !Version" class="verTips">Hadiah ini perlu update versi baru utk digunakan</p>
          <div class="querBtn" @click="closePup()">{{pupType==1?'Ya':'Buka peti harta karun'}}</div>
        </div>
      </transition>
    </div>
    <!-- <img :src="imgSrc" alt="" class="lateImg" :class="{giftLate:showLate}"> -->
  </div>
</template>
<script>
import { mapState } from 'vuex'
import api from "../api/apiConfig"
import MsgToast from "../components/commonToast"
import { setTimeout } from 'timers';
import { Downloader, Parser, Player } from 'svga.lite'
import Tabs from "./Tabs"
import StarEffects from "./StarEffects"
export default {
  components: { MsgToast, Tabs, StarEffects },
  data() {
    return {
      showGiftPup: false,
      tastMsg: '',
      showT: false,
      pupType: 1,
      pupTitle: '',
      imgSrc: '',
      giftPupName: '',
      gift_list2: [],
      // showLate: false, 禮物飄進背包動畫
      isloading: false,
      noGift: false,
      lucking: false,
      istest: false,
      player: null,
      boxGiftList: [],
      isDown: null,
      luckGift: {}
    }
  },
  computed: {
    ...mapState(["userMsg", "gift_list", "mainHeight", "Version"]),
    clueOpen() {
      if (this.userMsg.box_key > 0 && this.userMsg.lock_box > 0) {
        return true
      }
    },
    qustGiftArr() {
      let mustArr = this.boxGiftList.filter(item => {
        return item.must_get > 0
      })
      var prescDateSort = function (a, b) {
        return a.must_get - b.must_get;
      }
      return mustArr.sort(prescDateSort)
    },
    barHeight() {
      return this.userMsg.go_count / 12 * 100
    },
    showVerTips() {
      if (this.luckGift.gift_type == 9 || this.luckGift.gift_type == 10 || this.luckGift.gift_type == 13 || this.luckGift.gift_type == 14) {
        return true
      }
    }
  },
  created() {
    this.boxGiftList = JSON.parse(sessionStorage.getItem('boxGiftBox')) || []
    if (!this.boxGiftList.length) {
      api.getDefault(1).then(res => {
        const { response_data, response_status } = res.data
        sessionStorage.setItem('boxGiftBox', JSON.stringify(response_data.gift_list))
        this.boxGiftList = response_data.gift_list
      })
    }
  },
  mounted() {
    const downloader = new Downloader()
    // calls WebWorker parsing by default, configurable `new Parser({ disableWorker: true })`
    const parser = new Parser()
    this.player = new Player('#canvas') // #canvas is HTMLCanvasElement

      ; (async () => {
        const fileData = await downloader.get(`https://fstatic.cat1314.com/uc/svga/f49f34c93a846a07f4a0a9e90ab3be09_1602555469.svga?${Math.random()}`)
        const svgaData = await parser.do(fileData)
        this.isDown = svgaData
        this.player.set({
          loop: 1,
          fillMode: 'backwards'
        })

        await this.player.mount(svgaData)

        // this.player
        //   .$on('start', () => console.log('event start'))
        //   .$on('pause', () => console.log('event pause'))
        //   .$on('stop', () => console.log('event stop'))
        //   .$on('end', () => console.log('event end'))
        //   .$on('clear', () => console.log('event clear'))
        //   .$on('process', () => console.log('event process', this.player.progress))

        this.player.start()
        // player.pause()
        this.player.stop()
        // player.clear()
      })()
  },
  methods: {
    openBox() {
      if (!this.isDown) {
        this.tastMsg = 'Sumber daya blm berhasil muat, nanti coba lagi!'
        this.showT = true
        return
      }
      if (this.lucking) return  //动画未结束
      if (this.userMsg.box_key > 0 && this.userMsg.lock_box > 0) {
        this.lucking = true
        api.luckDraw(1).then(res => {
          if (res.data.response_status.code == 0) {
            this.luckGift = res.data.response_data.gift_info
            this.player.start()
            this.player.$on('end', () => {
              this.$store.commit('reducnKey')  //減箱子鑰匙
              var gift_info = res.data.response_data.gift_info  //礼物弹窗名和图片
              this.pupType = 1
              this.imgSrc = gift_info.picture
              this.giftPupName = gift_info.name
              this.showGiftPup = true  //禮物彈窗
              //抽中特殊礼物
              let addType = {}
              if (gift_info.gift_type == 6) {  //抽奖券
                addType.type = 1
              } else if (gift_info.gift_type == 7) {  //箱子
                addType.type = 2
              } else if (gift_info.gift_type == 8) {  //钥匙
                addType.type = 3
              } else if (gift_info.gift_type == 9) {  //禮物碎片
                addType.type = 4
              } else if (gift_info.gift_type == 10) {  //表情包碎片
                addType.type = 5
              }
              addType.num = gift_info.num * 1
              if (addType.type) {
                this.$store.commit('addGift', addType)
              }
              this.lucking = false
            })
          } else {
            this.tastMsg = res.data.response_status.error
            this.showT = true
          }
        })
      } else if (this.userMsg.lock_box <= 0) {
        this.tastMsg = 'Peti harta karun Anda gak cukup,cepatlah dapatkannya!'
        this.showT = true
      } else if (this.userMsg.box_key <= 0) {
        this.tastMsg = 'Kuncimu gak cukup,gak bisa buka peti harta karun!'
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
    },
    showClickGift(item) {
      this.imgSrc = item.picture
      this.giftPupName = item.name
      this.pupType = 2
      this.pupTitle = `Pasti menangkan utk kalinya ke- ${item.must_get}`
      this.showGiftPup = true  //禮物彈窗
    },
    // goCun() {
    //   location.href = "walletConfig://"
    // },
    closeToast() {
      this.showT = false
    },
    closePup() {
      this.showGiftPup = false
      // this.showLate = true
      // setTimeout(() => {
      //   this.showLate = false
      // }, 1000)
    },
  }
}
</script>
<style lang= "scss" scoped>
.lackBox {
  position: relative;
  margin-top: -0.15rem;
  .boxCon {
    width: 6.06rem;
    height: 4.46rem;
    background: url(../assets/img/luckBoxBg.png);
    background-size: 100% 100%;
    margin: 0.09rem auto 0;
    position: relative;
    .luckBox {
      width: 3.5rem;
      height: 3.5rem;
      margin: 0.52rem auto 0;
      #canvas {
        width: 3.5rem;
        height: 3.5rem;
      }
    }
    .bar {
      width: 0.27rem;
      height: 4.13rem;
      /* background: url(../assets/img/barBg.png);
      background-size: 100% 100%; */
      position: absolute;
      top: 0.18rem;
      right: -0.4rem;
      /* overflow: hidden; */
      .defaultBar {
        width: 0.27rem;
        height: 4.13rem;
        background: url(../assets/img/barBg.png);
        background-size: 100% 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        > span {
          display: block;
          width: 0.4rem;
          height: 0.36rem;
          background: url(../assets/img/barGiftBg.png);
          background-size: 100% 100%;
          position: absolute;
          left: -0.5rem;
          .giftImg {
            display: block;
            width: 0.34rem;
            height: 0.34rem;
            position: absolute;
            left: 0.02rem;
            top: 0.02rem;
          }
          .yes {
            display: block;
            width: 0.34rem;
            height: 0.34rem;
            position: absolute;
            background: rgba(0, 0, 0, 0.2) url(../assets/img/yes.png);
            background-size: 100% 100%;
            left: 0.02rem;
            top: 0.02rem;
          }
          &.gift0 {
            bottom: 0.77rem;
          }
          &.gift1 {
            bottom: 2.5rem;
          }
          &.gift2 {
            bottom: 3.95rem;
          }
        }
      }
      .actBar {
        max-height: 100%;
        /* height: 50%; */
        width: 0.27rem;
        /* height: 290px; */
        background: linear-gradient(
          180deg,
          rgba(255, 240, 73, 1),
          rgba(255, 7, 141, 1)
        );
        /* background: red; */
        border-radius: 0.14rem;
        overflow: hidden;
        position: absolute;
        bottom: 0rem;
        /* z-index: ; */
      }
    }
    .open {
      width: 3.31rem;
      height: 0.91rem;
      background: url(../assets/img/openBlack.png);
      background-size: 100% 100%;
      position: absolute;
      bottom: -0.72rem;
      left: 1.37rem;
      &.act {
        background: url(../assets/img/openAct.png);
        background-size: 100% 100%;
      }
    }
  }
  .tips {
    text-align: center;
    margin-top: 0.82rem;
    font-size: 0.26rem;
    em {
      display: block;
      margin: -0.08rem 0 0 -0.1rem;
      font-size: 0.2rem;
      opacity: 0.5;
    }
  }
  /* .goCun {
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
  } */
}
.giftPupCon {
  width: 4rem;
  min-height: 4.18rem;
  padding-bottom: 0.2rem;
  background: rgba(124, 65, 241, 1);
  border-radius: 0.16rem;
  position: relative;
  padding-bottom: 0.2rem;
  /* position: absolute;
  top: 2.26rem;
  left: 1.74rem; */
  .verTips {
    font-size: 0.26rem;
    padding: 0 0.15rem;
  }
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
    padding: 0 0.35rem;
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
    width: 2.6rem;
    height: 0.72rem;
    background: rgba(254, 241, 41, 1);
    border-radius: 0.36rem;
    text-align: center;
    line-height: 0.72rem;
    color: #7c41f1;
    font-size: 0.28rem;
    white-space: nowrap;
    margin: 0.26rem auto 0;
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
