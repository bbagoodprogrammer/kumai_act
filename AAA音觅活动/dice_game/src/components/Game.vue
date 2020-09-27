<template>
  <div class="game">
    <i class="start"></i>
    <i class="userIcon" :style="{left:userposition.left-.1+ 'rem',top:userposition.top-.8 + 'rem'}" :class="{ani:lucking}">
      <img v-lazy="owner.avatar" alt="">
    </i>
    <span v-for="(item,index) in steps" :key="index" class="icon" :style="{left:iconPosition[index].left + 'rem',top:iconPosition[index].top+ 'rem'}" :class="item.type + item.pid" @click="showPup(item)">
    </span>
    <div class="go" @click="luckGo()"></div>
    <div class="drics">
      <span>{{dice}}</span>
      <i class="add" @click="showDayTaskPup()"></i>
    </div>
    <div class="mask" v-show="showGiftPup">
      <transition name="slide">
        <div class="giftPup" :class="{mHeight:showGift.type == 'packet'}" v-if="showGiftPup">
          <div class="title"><i :class="{rare:isRare,luck:luck}"></i></div>
          <i class="close" @click="closeGiftPup()"></i>
          <!-- <p class="luckTips" v-if="showType== 3">
            恭喜你成為xx-xx-xx-xx大富翁榜第N名<br />
            獲得以下獎勵：
          </p> -->
          <p class="luckTips" v-if="showType== 2">
            今天運氣棒棒噠<br />
            獲得{{getGigtName(showGift)}}
          </p>
          <div class="giftBox" :class="{mt:showType != null}">
            <div class="giftItem" v-if="showGift.type != 'packet'">
              <div class="imgBox">
                <img src="../assets/img/coins.png" alt="" v-if="showGift.type == 'coin'">
                <img src="../assets/img/bean.png" alt="" v-else-if="showGift.type == 'bean'">
                <img src="../assets/img/dice.png" alt="" v-else-if="showGift.type == 'dice'">
                <img :src="showGift.image" alt="" v-else>
              </div>
              <div class="nick">{{getGigtName(showGift)}}</div>
            </div>
            <div class="giftItem" v-else v-for="(item,index) in showGift.packet" :key="index">
              <div class="imgBox">
                <img src="../assets/img/coins.png" alt="" v-if="item.type == 'coin'">
                <img src="../assets/img/bean.png" alt="" v-else-if="item.type == 'bean'">
                <img src="../assets/img/dice.png" alt="" v-else-if="item.type == 'dice'">
                <img :src="item.image" alt="" v-else>
              </div>
              <div class="nick">{{getGigtName(item)}}</div>
            </div>
          </div>
          <div class="packTips" v-if="showGift.type == 'packet' &&showType == null">
            <h3>驚喜大禮包</h3>
            <!-- <em v-for="(item,index) in showGift.packet" :key="index">{{getGigtName(item)}}</em> -->
            <p>隨機獲得以下獎勵之一：骰子*1、Land Rover座駕*5天、BMW座駕*5天、66金豆、甜甜圈背包禮物*1、甜蜜蛋糕特效禮物*1、狗子餵投者頭像框*5天 </p>
          </div>
          <div class="ok" @click="closeGiftPup()">
            <em v-if="showGift.type=='dice'">繼續遊戲</em>
            <em v-else-if="!luck">我知道了</em>
            <em v-else>趕緊收下</em>
          </div>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="showTask">
      <transition name="slide">
        <div class="task" v-if="showTask">
          <i class="close" @click="closeTaskPup()"></i>
          <div class="title"><i></i></div>
          <div class="downTime">倒計時：{{surplusTime.minute}}:{{surplusTime.second}}</div>
          <div class="taskTitle" v-if="showGift.task == 'share'">分享活動給好友</div>
          <div class="taskTitle" v-else>給他人送一次金幣禮物</div>
          <div class="giftBox">
            <div class="giftItem">
              <div class="imgBox">
                <img src="../assets/img/dice.png">
              </div>
              <div class="nick">骰子*1</div>
            </div>
          </div>
          <div class="btnBox">
            <span class="out" @click="closeTaskPup()">放棄任務</span>
            <span class="share" v-if="showGift.task == 'share'" @click="share()">分享好友</span>
            <span class="share" v-else @click="goGift()">去送禮</span>
          </div>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="showDayTask">
      <transition name="slide">
        <GetDice v-show="showDayTask" ref="geDice" />
      </transition>
    </div>
    <div class="mask" v-show="showDiceAni">
      <img :src="require(`../assets/img/dice/${forward}.png`)" alt="" v-show="showForwardImg">
      <canvas id="creatAni" v-show="!showForwardImg"></canvas>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
import downTime from "../utils/downTime"
import GetDice from "./GetDice"
import api from "../api/apiConfig"
import { Downloader, Parser, Player } from 'svga.lite'
import { setTimeout } from 'timers';

const downloader = new Downloader()
const parser = new Parser({ disableWorker: true })

export default {
  components: { GetDice },
  data() {
    return {
      iconPosition: [
        {
          index: 1,
          left: 1.18,
          top: 0
        },
        {
          index: 2,
          left: 2.36,
          top: 0
        },
        {
          index: 3,
          left: 3.54,
          top: 0
        },
        {
          index: 4,
          left: 4.72,
          top: 0
        },
        {
          index: 5,
          left: 4.72,
          top: 1.26
        },
        {
          index: 6,
          left: 5.9,
          top: 1.26
        },
        {
          index: 7,
          left: 5.9,
          top: 2.52
        },
        {
          index: 8,
          left: 5.9,
          top: 3.78
        },
        {
          index: 9,
          left: 5.9,
          top: 5.04
        },
        {
          index: 10,
          left: 5.9,
          top: 6.3
        },
        {
          index: 11,
          left: 4.72,
          top: 6.3
        },
        {
          index: 12,
          left: 3.54,
          top: 6.3
        },
        {
          index: 13,
          left: 3.54,
          top: 7.56
        },
        {
          index: 14,
          left: 2.36,
          top: 7.56
        },
        {
          index: 15,
          left: 1.18,
          top: 7.56
        },
        {
          index: 16,
          left: 1.18,
          top: 6.3
        },
        {
          index: 17,
          left: 0,
          top: 6.3
        },
        {
          index: 18,
          left: 0,
          top: 5.04
        },
        {
          index: 19,
          left: 0,
          top: 3.78
        },
        {
          index: 20,
          left: 0,
          top: 2.52
        },
        {
          index: 21,
          left: 0,
          top: 1.26
        },
        {
          index: 22,
          left: 1.18,
          top: 1.26
        },
      ],
      showGiftPup: false,
      showGift: {},
      surplusTime: {},
      showTask: false,
      luck: false,  //禮物彈窗標題，中獎彈窗為ture
      showType: null,   //null 獎勵預覽  2抽頭子中獎   3榜單獎勵彈窗
      showDayTask: false,
      lucking: false,
      rareArr: [102, 103, 201, 202, 301],
      showDiceAni: false,
      forward: 1,
      showForwardImg: false
    }
  },
  computed: {
    ...mapState(['steps', 'position', 'dice', 'owner', 'reg']),
    userposition() {
      return this.iconPosition[this.position]
    },
    isRare() {
      for (let i = 0; i < this.rareArr.length; i++) {
        if (this.rareArr[i] == this.showGift.pid) {
          return true
        }
      }
    },
  },
  mounted() {
    this.aniGo()
  },
  methods: {
    luckGo() {
      if (this.dice > 0 && !this.lucking) {
        this.lucking = true
        api.goDice().then(res => {
          this.showDiceAni = true
          this.player.start()
          setTimeout(() => {
            let data = res.data.response_data
            let forward = data.extra.forward
            let prize = data.prize
            let goForward = 0
            this.player.clear()
            this.forward = forward
            this.showForwardImg = true
            this.vxc('reduexDiceNum')
            setTimeout(() => {
              this.showDiceAni = false
              let timer = setInterval(() => {
                if (goForward >= forward) {
                  clearInterval(timer)
                  this.showForwardImg = false
                  //禮物彈窗
                  this.lucking = false
                  this.showGift = prize
                  if (prize.pid == '101' || prize.pid == '204' || prize.pid == '301') {
                    this.vxc('addDice')
                  }
                  if (prize.type == "task") {
                    this.showTask = true
                    this.showGift['task'] = data.extra.task
                    if (data.extra.rid) {
                      this.showGift['rid'] = data.extra.rid
                    }
                    this.downTimeGo('time2', 180)
                  } else if (prize.type != "empty") {
                    this.showType = 2
                    this.luck = true
                    this.showGiftPup = true
                  }
                  return
                }
                this.vxc('addPosition')
                goForward++
              }, 500)
            }, 800)
          }, 1000)
        })
      } else if (!this.lucking) {
        this.showDayTaskPup()
      }
    },
    showPup(item) {
      if (item.type != 'empty' && item.type != 'task' && !this.lucking) {
        this.showGift = item
        this.showGiftPup = true
      }
    },
    downTimeGo(timeName, val) {
      clearInterval(this.timer)
      downTime(timeName, val);
      this.surplusTime = downTime(timeName);
      this.timer = setInterval(() => {
        this.surplusTime = downTime(timeName);
        if (this.surplusTime.end) {
          clearInterval(this.timer)
          this.closeTaskPup()
        }
      }, 1000)
    },
    getGigtName(gift) {
      if (gift.type == 'gift') {
        return `${gift.name}背包禮物 *1`
      } else if (gift.type == 'frame') {
        return `${gift.name}頭像框 *${gift.day}天`
      } else if (gift.type == 'car') {
        return `${gift.name} *${gift.day}天`
      } else if (gift.type == 'coin') {
        return `${gift.count} 金幣`
      } else if (gift.type == 'bean') {
        return `${gift.count} 金豆`
      } else if (gift.type == 'dice') {
        return `骰子* 1`
      }
    },
    async aniGo() {
      let fileData1 = await downloader.get('http://fstatic.cat1314.com/uc/svga/d6259c14eb3c6281a5a69aa5c65e69f8_1600253428.svga')
      let svgaData1 = await parser.do(fileData1)
      let canvas = document.getElementById('creatAni')
      this.player = new Player(canvas)
      await this.player.mount(svgaData1)
    },
    share() {
      this.$refs.geDice.doTask('share')
    },
    goGift() {
      this.showTask = false
      let rid = this.showGift.rid
      this.$refs.geDice.doTask('coin', {}, rid)
    },
    closeGiftPup() {
      this.showType = null
      this.luck = false
      this.showGift = {}
      this.showGiftPup = false
    },
    closeTaskPup() {
      this.showTask = false
      api.giveUp(this.showGift.task).then() //放棄任務
    },
    showDayTaskPup() {
      if (this.reg) {
        api.dayTask().then(res => {
          this.vxc('setDayTask', res.data.response_data)
          this.showDayTask = true
        })
      } else {
        api.singUp().then(res => {
          if (res.data.response_status.code == 0) {
            api.dayTask().then(res => {
              this.vxc('setDayTask', res.data.response_data)
              this.showDayTask = true
            })
          } else {
            this.toast(res.data.response_status.error)
          }
        })
      }
    }
  }
}
</script>
<style lang="scss">
.game {
  width: 7.02rem;
  height: 10.5rem;
  margin: 1.46rem auto 0;
  position: relative;
  .start {
    display: block;
    width: 1.12rem;
    height: 1.2rem;
    background: url(../assets/img/icon/GO.png);
    background-size: 100% 100%;
  }
  .go {
    width: 2.34rem;
    height: 2.34rem;
    background: url(../assets/img/icon/shake.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .drics {
    width: 2.34rem;
    height: 0.88rem;
    background: url(../assets/img/icon/driceNum.png);
    background-size: 100% 100%;
    position: absolute;
    left: 0;
    bottom: 0.65rem;
    span {
      display: block;
      width: 1rem;
      height: 0.5rem;
      position: absolute;
      left: 0.7rem;
      top: 0.18rem;
      text-align: center;
      line-height: 0.5rem;
      font-size: 0.26rem;
    }
    .add {
      display: block;
      width: 0.72rem;
      height: 0.72rem;
      background: url(../assets/img/icon/add.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      top: 0.1rem;
    }
  }
  .userIcon {
    display: block;
    width: 1.28rem;
    height: 1.42rem;
    background: url(../assets/img/icon/userIcon.png);
    background-size: 100% 100%;
    position: absolute;
    z-index: 100;
    &.ani {
      transition: left 0.3s ease, top 0.3s ease;
    }
    img {
      width: 0.95rem;
      height: 0.95rem;
      border-radius: 50%;
      position: absolute;
      left: 0.16rem;
      top: 0.18rem;
    }
  }
  .icon {
    display: block;
    width: 1.12rem;
    height: 1.2rem;
    background: url(../assets/img/icon/empty.png);
    background-size: 100% 100%;
    position: absolute;
    // &.gift1 {
    //   background: url(../assets/img/icon/gift1.png);
    //   background-size: 100% 100%;
    // }
    &.gift2 {
      background: url(../assets/img/icon/gift2.png);
      background-size: 100% 100%;
    }
    &.gift3 {
      background: url(../assets/img/icon/gift3.png);
      background-size: 100% 100%;
    }
    &.gift4 {
      background: url(../assets/img/icon/gift4.png);
      background-size: 100% 100%;
    }
    &.frame6 {
      background: url(../assets/img/icon/frame.png);
      background-size: 100% 100%;
    }
    &.coin5 {
      background: url(../assets/img/icon/coin.png);
      background-size: 100% 100%;
    }
    &.task8 {
      background: url(../assets/img/icon/task.png);
      background-size: 100% 100%;
    }
    &.packet5,
    &.packet6,
    &.packet7 {
      background: url(../assets/img/icon/packet.png);
      background-size: 100% 100%;
    }
  }
  .giftPup,
  .task,
  .taskList {
    width: 6.48rem;
    height: 6.06rem;
    border: 0.08rem solid #ffffff;
    border-radius: 0.24rem;
    padding-top: 0.7rem;
    background: linear-gradient(0deg, #83d2fb, #9e81fa, #a875f1);
    position: relative;
    &.mHeight {
      height: 9rem;
      .giftBox {
        height: 5.6rem;
        overflow-y: scroll;
        .giftItem {
          margin: 0 0.5rem 0.2rem;
          .nick {
            margin-top: 0.05rem;
          }
        }
      }
    }
    .close {
      display: block;
      width: 0.72rem;
      height: 0.78rem;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
      position: absolute;
      right: -0.3rem;
      top: -0.4rem;
    }
    .title {
      width: 5.14rem;
      height: 1.42rem;
      background: url(../assets/img/title/ribbon.png);
      background-size: 100% 100%;
      position: absolute;
      top: -0.8rem;
      left: 0.71rem;
      i {
        display: block;
        width: 5.14rem;
        height: 1.42rem;
        background: url(../assets/img/title/title_07.png);
        background-size: 100% 100%;
        &.luck {
          background: url(../assets/img/title/title_05.png);
          background-size: 100% 100%;
        }
        &.rare {
          background: url(../assets/img/title/title_04.png);
          background-size: 100% 100%;
        }
      }
    }
    .giftBox {
      height: 4rem;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: center;
      &.mt {
        margin-top: -0.4rem;
      }
      .giftItem {
        width: 2rem;
        // height: 2rem;
        .imgBox {
          width: 2rem;
          height: 2rem;
          background: rgba(103, 52, 191, 0.4);
          border-radius: 0.12rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .nick {
          height: 0.5rem;
          text-align: center;
          margin-top: 0.3rem;
          font-size: 0.24rem;
        }
      }
    }
    .packTips {
      text-align: center;
      p {
        padding: 0 0.4rem;
        font-size: 0.24rem;
        em {
          font-size: 0.24rem;
        }
      }
    }
    .ok {
      width: 3.76rem;
      height: 1rem;
      background: url(../assets/img/singUpBtn.png);
      background-size: 100% 100%;
      font-size: 0.32rem;
      color: rgba(126, 45, 0, 1);
      margin: 0.5rem auto;
      text-align: center;
      line-height: 0.8rem;
    }
  }
  .task {
    height: 7.76rem;
    .title {
      i {
        background: url(../assets/img/title/title_06.png);
        background-size: 100% 100%;
      }
    }
    .downTime {
      width: 3.2rem;
      height: 0.64rem;
      background: rgba(103, 52, 191, 0.4);
      border-radius: 0.32rem;
      margin: 0 auto;
      text-align: center;
      line-height: 0.64rem;
      font-size: 0.26rem;
    }
    .taskTitle {
      text-align: center;
      font-size: 0.26rem;
      margin: 0.69rem 0 0.22rem;
    }
    .giftBox {
      height: 2rem;
      .nick {
        margin-top: 0.1rem !important;
      }
    }
    .btnBox {
      margin-top: 1.8rem;
      display: flex;
      justify-content: center;
      span {
        width: 2.6rem;
        height: 0.86rem;
        text-align: center;
        line-height: 0.86rem;
        border-radius: 0.43rem;
        &.out {
          background: rgba(255, 255, 255, 0.1);
        }
        &.share {
          background: url(../assets/img/shareBtn.png);
          background-size: 100% 100%;
          color: rgba(126, 45, 0, 1);
          margin-left: 0.56rem;
        }
      }
    }
  }
  .luckTips {
    text-align: center;
    font-size: 0.26rem;
  }
}
</style>
