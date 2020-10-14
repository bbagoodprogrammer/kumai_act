<template>
  <div class="emojiList" :class="{overTurn:!this.type}" :style="{maxHeight:!this.type?pupMaxHeight+'px':'none'}">
    <div class="title" :class="{max:type}">
      <img :src="bag.pic_url?bag.pic_url.replace(/^http/,'https'):''" alt="">
      <strong>{{bag.remark}}</strong>
    </div>
    <div class="list">
      <p v-if="loading" class="loading">Loading...</p>
      <div class="emojiItem">
        <span v-for="(item,index) in bag.emoticons" :key="index">
          <img :src="item.pic_url?item.pic_url.replace(/^http/,'https'):''" alt="" @click="shouCanvas($event,index)">
          <strong>{{item.name}}</strong>
        </span>
      </div>
    </div>
    <div class="getBtn" @click="showPup()"><i></i>{{listItem.pay_num}}Pertakuran fragmen</div>
    <Footer :type="type" :user_wallet="user_wallet" />
    <div class="mask" :style="{height:mainHeight+'px'}" v-show="showGiftPup">
      <transition name="slide">
        <div class="giftPupCon" v-show="showGiftPup">
          <i class="close" @click="closePup()"></i>
          <div class="imgBox">
            <img :src="lateImg" alt="">
          </div>
          <em>{{giftPupName}}</em>
          <div class="querBtn" @click="closePup()">Ya</div>
        </div>
      </transition>
    </div>
    <div class="mask" :style="{height:mainHeight+'px'}" v-show="showT">
      <transition name="slide">
        <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
      </transition>
    </div>
    <!-- <lottie /> -->
  </div>
</template>
<script>
import Footer from "./Footer"
import lottie from "./lottie"
import { Downloader, Parser, Player } from 'svga.lite'
import api from "../api/apiConfig"
import MsgToast from "../components/commonToast"
import { mapState } from "vuex"
export default {
  components: { Footer, lottie, MsgToast },
  props: ['type'],
  data() {
    return {
      mainHeight: 0,
      showGiftPup: false,
      lateImg: '',
      giftPupName: 'Selamat Anda berhasil pertukaran dan mendapatkan emotikon, bisa digunakannya di K-room!',
      dataArr: [],
      loading: false,
      user_wallet: {},
      tastMsg: '',
      showT: false,
      bag: {},
      listItem: {}
    }
  },
  computed: {
    ...mapState(["userMsg"]),
    filderArr() {
      let svgaArr = []
      this.bag.emoticons.forEach(element => {
        svgaArr.push(element.resource_url.replace(/^http/, 'https'))
      });
      return svgaArr
    }
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
    api.getGiftList(13).then(res => {
      const bid = res.data.response_data.gift_list[0].gid
      this.listItem = res.data.response_data.gift_list[0]
      api.getSvga(bid).then(res => {
        this.loading = false
        const { response_data, response_status } = res
        if (response_data.msg == 'ok') {
          this.bag = response_data.bag
          this.downloaderData(this.filderArr)
        } else {
          this.tastMsg = 'Emotikon gagal muat!'
          this.showT = true
        }
      })
    })

  },
  methods: {
    downloaderData(arr) {
      let downloader = new Downloader()
      for (let i = 0; i < arr.length; i++) {
        downloader.get(arr[i]).then(res => {
          let obj = {
            key: i,
            res: res
          }
          this.dataArr.push(obj)
        })
      }
    },
    shouCanvas(e, index) {
      let newCanvas = document.createElement('canvas')
      newCanvas.className = 'svga'
      // let downloader = new Downloader()
      let parser = new Parser()
        ; (async () => {
          let player = new Player(newCanvas)
          // let fileData1 = await downloader.get('/images/gun.svga')
          let isHas = false
          let data = {}
          for (let i = 0; i < this.dataArr.length; i++) {
            if (index == this.dataArr[i].key) {
              data = this.dataArr[i].res
              isHas = true
            }
          }
          if (isHas) {
            let svgaData1 = await parser.do(data)
            await player.mount(svgaData1)
            e.target.parentNode.insertBefore(newCanvas, null)
            e.target.style.visibility = "hidden"
            player.start()
            setTimeout(() => {
              e.target.style.visibility = "visible"
              player.destroy()
              e.target.parentNode.removeChild(newCanvas);
            }, 2000)
          }
        })()
    },
    showPup() {
      if (Number(this.user_wallet.icon_puzzle) >= Number(this.listItem.pay_num)) {
        api.getGift(13, this.listItem.gift_id).then(res => { //填寫表情包信息
          if (res.data.response_status.code == 0) {
            this.lateImg = this.listItem.picture
            // this.giftPupName = this.listItem.name
            this.showGiftPup = true
            if (this.type) {
              this.user_wallet.icon_puzzle = this.user_wallet.icon_puzzle - this.listItem.pay_num
            } else {
              let obj = {
                type: 2,
                num: this.listItem.pay_num
              }
              this.$store.commit('reduceFramce', obj)
            }
            var ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
            if (ios) {
              if (window.notifyEmoticon != undefined) {
                try {
                  notifyEmoticon()
                } catch (error) { }
              }
            } else {
              try {
                javascript: JSInterface.notifyEmoticon()
              } catch (error) { }
            }
            // sessionStorage.setItem('user_wallet', JSON.stringify(this.user_wallet.gift_puzzle))   //頁面用
          } else {
            this.tastMsg = res.data.response_status.error
            this.showT = true
          }
        })
      } else {
        this.tastMsg = 'Fragmen emotikonmu gak cukup,cepatlah dapatkannya!'
        this.showT = true
      }
    },
    closePup() {
      this.showGiftPup = false
    },
    closeToast() {
      this.showT = false
    },
  }
}
</script>
<style lang="scss">
.svga {
  width: 1.4rem;
  height: 1.4rem;
  position: absolute;
  top: 0;
  left: 0.29rem;
}
.emojiList {
  padding: 0 0.48rem;
  &.overTurn {
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch; //有回弹效果
    -webkit-overflow-scrolling: auto; //滑到哪停到哪
  }
  .loading {
    text-align: center;
  }
  .title {
    height: 0.99rem;
    display: flex;
    align-items: center;
    font-size: 0.28rem;
    &.max {
      display: block;
      margin-top: 0.24rem;
      height: 2.29rem;
      img {
        display: block;
        margin: auto;
        width: 1.7rem;
        height: 1.7rem;
      }
      strong {
        display: block;
        height: 0.4rem;
        line-height: 0.4rem;
        font-size: 0.28rem;
        text-align: center;
        margin-top: 0.09rem;
      }
    }
    img {
      display: block;
      width: 0.68rem;
      height: 0.68rem;
      margin-right: 0.08rem;
    }
  }
  > .list {
    width: 6.06rem;
    height: 5.28rem;
    background: url(../assets/img/emojiBg.png);
    background-size: 100% 100%;
    padding: 0.43rem 0.24rem 0;
    .emojiItem {
      height: 5.1rem;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      -webkit-overflow-scrolling: auto;
      display: flex;
      flex-wrap: wrap;
    }
    span {
      width: 33%;
      display: inline-block;
      vertical-align: top;
      margin-bottom: 0.22rem;
      position: relative;
      img {
        width: 1.4rem;
        height: 1.4rem;
        display: block;
        margin: 0 auto;
      }
      strong {
        display: block;
        height: 0.45rem;
        line-height: 0.45rem;
        text-align: center;
        font-size: 0.24rem;
        min-width: 2rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .getBtn {
    width: 5.2rem;
    height: 0.84rem;
    background: url(../assets/img/getBtn.png);
    background-size: 100% 100%;
    margin: 0.21rem auto 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #8e4519;
    font-weight: 500;
    i {
      display: block;
      width: 0.45rem;
      height: 0.47rem;
      background: url(../assets/img/giftFrame1.png);
      background-size: 100% 100%;
      margin-right: 0.03rem;
    }
  }
}
.giftPupCon {
  width: 4.94rem;
  min-height: 4.52rem;
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
  .imgBox {
    width: 2.59rem;
    min-height: 2.47rem;
    background: url(../assets/img/giftPupBg.png) no-repeat;
    background-size: 100% auto;
    margin: -0.05rem auto 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0.22rem;
    img {
      width: 1.6rem;
      height: 1.6rem;
      margin-top: 0.4rem;
    }
  }
  > em {
    display: block;
    text-align: center;
    font-size: 0.32rem;
    margin-top: -0.3rem;
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
