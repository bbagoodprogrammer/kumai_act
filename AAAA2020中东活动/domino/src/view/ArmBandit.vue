<template>
  <div class="box">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <span class="ruleTips" :class="{top:isShare}" @click="goRule()"></span>
    <div class="canvsBox">
      <div class="handle " :class="[{luck:defaltAni,handClick:hClick},'handle'+point]" @click="openBox()" v-if="!lucking && point<3"></div>
      <canvas id="canvas_bg" class="svga"></canvas>
      <canvas id="canvas_lift" class="svga"></canvas>
      <canvas id="canvas_blue_left" class="svga"></canvas>
      <canvas id="canvas_blue_right" class="svga"></canvas>
      <canvas id="canvas_yellow" class="svga"></canvas>
    </div>
    <!-- <testSvga></testSvga> -->
    <div class="header">
      <div class="startTips">
        <p>بعد جمع كل 3 نجوم يمكن</br>
          أن تطيح الدومينو مرة واحدة
        </p>
        <span class="startNum">لديّ <i></i>{{userTotalStart}}</span>
      </div>
      <div class="turnTips"></div>
      <i class="turnicon"></i>
    </div>
    <Task />
    <UserLv />
    <div class="giftBox">
      <span class="gifts"></span>
      <p>بعد إطاحة أحجار الدومينو 3 مرات سيسقط كل أحجار، اذا سقط كلها ستكون ناجحا باللعبة اليوم(يعني تخليص الدومينو)، يمكن تخليص الدومينو مرة 1 كل يوم. بعد كل يوم تخليص الدومينو يمكن أن ترقي السلم الواحد. تصعد السلم الأعلى يمكن حصول على حقيبة كنوز اللعبة~</p>
    </div>
    <TabsScrollLoadList />
    <act-footer></act-footer>
    <div class="mask" v-show="luckPup">
      <transition name="slide">
        <div class="luckBox" :class="{mHeigth:luckGift.length>3}" v-if="luckPup">
          <div class="lheader"></div>
          <div class="title">مبروك عليك لحصول على هذه الكنوز!</div>
          <div class="giftItem">
            <span v-for="(item,index) in luckGift" :key="index" :class="'gift'+index">
              <span class="giftImg">
                <img :src="item.img" alt="" v-if="item.img">
                <img :src="require(`../assets/img/gift/2_${item.type}.png`)" alt="" v-else>
              </span>
              <strong>{{item.name}}</strong>
            </span>
          </div>
          <span class="ok" @click="luckPup=false">{{lang.ok}}</span>
        </div>
      </transition>
    </div>
    <!-- <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}"></div> -->
  </div>
</template>

<script>

import getString from "../utils/getString"
import APP from "../utils/openApp"
import api from "../api/apiConfig"
import ActFooter from "../components/ActFooter"
import MsgToast from "../components/commonToast"
import Task from "../components/Task"
import UserLv from "../components/UserLv"
import TabsScrollLoadList from "../components/TabsScrollLoadList"
import { globalBus } from '../utils/eventBus'
import { Downloader, Parser, Player } from 'svga.lite'

const downloader = new Downloader()
const parser = new Parser({ disableWorker: true })
export default {
  components: { MsgToast, ActFooter, Task, UserLv, TabsScrollLoadList },
  data() {
    return {
      isShare: false, //是否分享
      isMore: true,   //加载更多
      activite: 1,    //活动状态
      showT: false,  //提示弹窗显示
      tastMsg: "提示信息",  //基础弹窗提示信息
      userState: 0,   //用户状态（是否报名）
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
      svgaAddress: [
        {
          index: 1,
          addres: "http://img.17sing.tw/uc/activity/2a5b7b3a59cb88785435b3f18764ca00_1592569662.svga", //寶箱光底
        },
        {
          index: 2,
          addres: "http://img.17sing.tw/uc/activity/12a398700f769029719447a9e2e63f17_1592569674.svga",// 動畫背景
        },
        // {
        //   index: 3,
        //   addres: "http://img.17sing.tw/uc/activity/bfc0a124ac81f955449b70fb8f61ca1e_1592569736.svga", //藍牌不動
        // },
        // {
        //   index: 4,
        //   addres: "http://img.17sing.tw/uc/activity/8ba4b7f11718e2eba88277c997cec728_1592569730.svga", //藍牌已開
        // },
        {
          index: 5,
          addres: "http://img.17sing.tw/uc/activity/a8ea34592471c70f6d81ee89e392a941_1592569722.svga",  //藍牌開啟動畫
        },
        // {
        //   index: 6,
        //   addres: "http://img.17sing.tw/uc/activity/634460c63f6e07d03542403337b9147e_1592569713.svga", // 黃牌不動
        // },
        // {
        //   index: 7,
        //   addres: "http://img.17sing.tw/uc/activity/c4faf986206a838823c6472163f299b8_1592569681.svga", // 黃牌已開
        // },
        {
          index: 8,
          addres: "http://img.17sing.tw/uc/activity/8ef779c3ee89ec4ed7034c3c6cf6f77a_1592569704.svga", //黃牌開啟動畫
        },
      ],
      loaded: false,
      userTotalStart: null,
      able: null,
      point: null,
      plarerArr: {},
      playerKey: {
        0: 'canvas_blue_left',
        1: 'canvas_blue_right',
        2: 'canvas_yellow'
      },
      singUp: null,
      luckGift: [],
      luckPup: false,
      lucking: false,
      hClick: false,
      defaltAni: true
    }
  },
  created() {
    this.judgeShare()  //判断是否为分享环境,请求相应的接口 
    let pro1 = this.getDefaultData()
    let pro2 = this.downloaderData(this.svgaAddress)
    Promise.all([pro1, pro2]).then((val) => {
      this.svgaGo()
    })
  },
  methods: {
    judgeShare() {//判断是否为分享环境,请求相应的接口 
      this.isShare = getString('token') ? false : true
      this.vxc('setShareState', this.isShare) //分享状态
    },
    getDefaultData(val) { //初始化
      return new Promise((resolve, reject) => {
        api.getDefault().then(res => {
          const { response_status, response_data } = res.data
          if (response_status.code == 0) {
            resolve(res)
            const { step, schule, max_level, myrank, list, user_info, point, able, amount } = response_data
            this.userTotalStart = amount
            this.able = able
            this.point = point
            this.vxc('setActStatus', step)
            this.vxc('setSchule', schule)
            this.vxc('setMax_level', max_level)//max_level
            this.vxc('setMyLv', myrank.level) //myrank.level
            this.vxc('setUserAv', myrank.avatar)
            this.vxc("setInited", 1)  //是否初始化頁面
            let rankTab = max_level == 0 ? 1 : max_level
            this.vxc("changTab", rankTab)
            this.vxc('setNowDay', rankTab)
            this.singUp = user_info.registered
            this.vxc("setSingUp", user_info.registered)
            this.vxc('updateRankGroups', { //当前日榜信息
              key: rankTab,
              loadCount: 0,
              loadEnd: list.length < 20,
              loading: false,
              none: list.length == 0,
              list: list,
            })
            this.vxc("changGroupsUserMsg", {//初始当前日榜个人信息
              key: rankTab,
              msg: myrank
            })
          } else {
            this.toast(response_status.error)
          }
        })
      })
    },
    openBox() {
      globalBus.$emit('commonEvent', () => {
        if (!this.defaltAni) return
        if (!this.singUp) {  //請先報名
          this.vxc('setToast', {
            msg: `يرجي تسجيل اللعبة أولا`
          })
        } else if (this.able <= this.point) {
          this.vxc('setToast', {
            msg: `النجوم التي جمعتها ليست كافية لإطاحة الدومينو~  يرجي إكمال المهمات لتحصيل النجوم~`
          })
        } else {
          let playerKey = this.playerKey[this.point]
          let openPlayer = this.plarerArr[playerKey] ? this.plarerArr[playerKey].player : null
          if (!openPlayer) {
            this.vxc('setToast', {
              msg: `جار تحميل المورد،يرجي المحاولة بعد قليل`
            })
            return
          }
          this.defaltAni = false
          setTimeout(() => {
            this.hClick = true
            setTimeout(() => {
              this.hClick = false
              this.lucking = true
              api.luck().then(res => {
                if (res.data.response_status.code == 0) {
                  openPlayer.start()
                  // openPlayer.$on('end', () => { //彈窗
                  //   this.point++
                  //   this.luckGift = res.data.response_data.data
                  //   this.luckPup = true
                  // })
                  openPlayer.$on('process', () => { //彈窗
                    if (openPlayer.progress > 97) {
                      this.lucking = false
                      this.defaltAni = true
                      openPlayer.pause()
                      this.point++
                      this.luckGift = res.data.response_data.data
                      this.luckPup = true
                    }
                  })
                } else {
                  this.vxc('setToast', {
                    msg: res.data.response_status.error
                  })
                }
              })
            }, 800)
          }, 30)
        }
      })
    },
    downloaderData(arr) {
      return new Promise((res, rej) => {
        let PromiseArr = []
        for (let i = 0; i < arr.length; i++) {
          PromiseArr.push(this.loadSvgaData(arr[i]))
        }
        Promise.all(PromiseArr).then((values) => {
          res(values)
        })
      })
    },
    loadSvgaData(fileItem) {
      return new Promise((resolve, reject) => {
        ; (async () => {
          const fileData = await downloader.get(fileItem.addres);
          const data = await parser.do(fileData);
          fileItem.data = data
          resolve(data);
        })()
      });
    },
    svgaGo() {
      this.svgaStart('canvas_bg', 1, true, this.svgaAddress[1].data)  //节点类名,開始幀數,是否开始动画,加载的对应Data
      this.svgaStart('canvas_lift', 1, true, this.svgaAddress[0].data)
      let startObj = { 1: 1, 2: 1, 3: 1 }
      if (this.point == 1) {
        startObj[1] = 59
      } else if (this.point == 2) {
        startObj[1] = 59
        startObj[2] = 59
      } else if (this.point >= 3) {
        startObj[1] = 59
        startObj[2] = 59
        startObj[3] = 59
      }
      this.svgaStart('canvas_blue_left', startObj[1], false, this.svgaAddress[2].data)
      this.svgaStart('canvas_blue_right', startObj[2], false, this.svgaAddress[2].data)
      this.svgaStart('canvas_yellow', startObj[3], false, this.svgaAddress[3].data)
    },
    async svgaStart(className, start, isGo, data) {
      let canvas = document.getElementById(className)
      let player = new Player(canvas)
      player.set({ startFrame: start })
      if (!isGo && start == 1) {
        player.set({ startFrame: start }) //loop: 1, 
      } else {
        player.set({ startFrame: start })
      }
      await player.mount(data)
      player.start()
      if (!isGo && start == 1) {
        player.stop()
      }
      this.plarerArr[className] = {
        player,
      }
    },
    downApp() {
      APP()
    },
    goRule() {
      let regstr = getString('token')
      location.href = `./index2.html?token=${regstr}`
    },
    refrsh() { //刷新
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      window.removeEventListener("scroll", this.onScroll)
      this.getDefaultData('ref')
    }
  }
}
</script>
<style lang='scss'>
body::-webkit-scrollbar {
  width: 0;
}
body {
  direction: rtl;
}
.canvsBox {
  position: relative;
  .handle {
    width: 0.88rem;
    height: 0.9rem;
    background: url(../assets/img/handle.png);
    background-size: 100% 100%;
    position: absolute;
    left: 2.65rem;
    top: 8.9rem;
    z-index: 100;
    &.handle1 {
      left: 4.65rem;
    }
    &.handle2,
    .handle3 {
      left: 3.65rem;
    }
    &.luck {
      animation: fingerHandle 1s ease infinite both;
    }
    &.handClick {
      transition: all 0.8s ease;
      transform: scale(0.5, 0.5);
    }
  }
  #canvas_bg {
    z-index: 0;
  }
  #canvas_lift {
    z-index: 3;
  }
  #canvas_blue_left {
    z-index: 4;
  }
  #canvas_blue_right {
    z-index: 4;
    transform: rotateY(180deg);
    -ms-transform: rotateY(180deg);
    -moz-transform: rotateY(180deg);
    -webkit-transform: rotateY(180deg);
    -o-transform: rotateY(180deg);
  }
  #canvas_yellow {
    z-index: 3;
  }
}
.svga {
  width: 7.5rem;
  height: 11rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.box {
  padding-bottom: 2rem;
  max-width: 750px;
  overflow-x: hidden;
  position: relative;
  margin: auto;
  // background:url(../assets/img/主视觉.png) center 0 no-repeat;
  background-size: 100% auto;
  .shareBar {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
    .bar {
      width: 7.5rem;
      height: 1.2rem;
      margin: auto;
      background: url(../assets/img/share_bar.png) no-repeat;
      background-size: 100% 100%;
    }
  }
  .ruleTips {
    width: 0.9rem;
    height: 1.26rem;
    background: url(../assets/img/ruleTips.png);
    background-size: 100% 100%;
    position: fixed;
    right: 0.12rem;
    top: 0.15rem;
    z-index: 100;
    &.top {
      top: 1.5rem;
    }
  }
  .header {
    height: 11.7rem;
    position: relative;
    z-index: 2;
    background: url(../assets/img/turntable.png) 0 bottom no-repeat;
    background-size: 100% auto;
    .startTips {
      width: 7.5rem;
      color: #35007d;
      font-size: 0.38rem;
      line-height: 0.3rem;
      font-weight: bold;
      text-align: center;
      position: absolute;
      top: 3.85rem;
      p {
      }
      .startNum {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 0.34rem;
        margin-top: 0.15rem;
        i {
          width: 0.46rem;
          height: 0.42rem;
          background: url(../assets/img/strat.png);
          background-size: 100% 100%;
          margin: 0 0.1rem;
        }
      }
    }
    .turnTips {
      width: 3.43rem;
      height: 0.64rem;
      background: url(../assets/img/turnTips.png);
      background-size: 100% 100%;
      position: absolute;
      bottom: 0.5rem;
      left: 2.04rem;
    }
    .turnicon {
      width: 0.4rem;
      height: 0.42rem;
      background: url(../assets/img/turnicon.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0.51rem;
      top: 10.45rem;
      z-index: 100;
      animation: heart 1s ease infinite alternate;
    }
  }
  > .giftBox {
    height: 1.64rem;
    display: flex;
    align-items: center;
    margin: 0.25rem 0 0.21rem;
    padding: 0 0.42rem 0 0.35rem;
    .gifts {
      width: 2.24rem;
      height: 1.64rem;
      background: url(../assets/img/giftsBg.png) no-repeat;
      background-size: 100% 100%;
    }
    p {
      flex: 1;
      font-size: 0.24rem;
      font-weight: 500;
      color: #c1f7ff;
      margin-right: 0.27rem;
    }
  }
}
.luckBox {
  width: 6.26rem;
  height: 4.32rem;
  background: url(../assets/img/pupBg.png);
  background-size: 100% 100%;
  position: relative;
  .lheader {
    width: 5.19rem;
    height: 2.16rem;
    background: url(../assets/img/lheader.png);
    background-size: 100% 100%;
    position: absolute;
    top: -2.16rem;
    left: 0.54rem;
  }
  .title {
    height: 0.96rem;
    line-height: 1.2rem;
    text-align: center;
    font-size: 0.38rem;
  }
  .giftItem {
    display: flex;
    justify-content: space-between;
    padding: 0 0.47rem;
    span {
      width: 1.48rem;
      .giftImg {
        display: block;
        width: 1.48rem;
        height: 1.48rem;
        background: url(../assets/img/giftImgBg.png);
        background-size: 100% 100%;
        position: relative;
        img {
          width: 1.48rem;
          height: 1.48rem;
          display: block;
          margin: 0 auto;
          position: absolute;
          z-index: 1;
        }
      }
      strong {
        display: block;
        width: 125%;
        height: 0.7rem;
        margin-right: -0.17rem;
        text-align: center;
        font-size: 0.22rem;
        color: #7ecef4;
      }
      &.gift0 {
        margin-right: 0 !important;
        .giftImg {
          margin-right: 0 !important;
        }
      }
    }
  }
  .ok {
    display: block;
    width: 2.11rem;
    height: 0.8rem;
    background: url(../assets/img/ok.png);
    background-size: 100% 100%;
    margin: 0 auto;
    text-align: center;
    line-height: 0.8rem;
  }
  &.mHeigth {
    height: 6.53rem;
    background: url(../assets/img/mLuckBg.png);
    background-size: 100% 100%;
    .giftItem {
      justify-content: center;
      flex-wrap: wrap;
      > span {
        margin-right: 0.44rem;
      }
    }
  }
}
// .refresh {
//   display: block;
//   width: 0.94rem;
//   height: 1rem;
//   position: fixed;
//   left: 0.08rem;
//   bottom: 1.35rem;
//   background: url(../assets/img/refresh.png) no-repeat;
//   background-size: contain;
//   transition: transform 1s;
//   z-index: 1000;
// }
</style>


