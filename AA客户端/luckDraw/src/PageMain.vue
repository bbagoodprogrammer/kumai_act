<template>
  <div class="page pageMain">
    <router-link to="rule" class="qustion"></router-link>
    <router-link to="history" class="history"></router-link>
    <i class="close" @click="closeWeb()"></i>
    <div class="turnBox">

      <div class="linght1" :class="{act:linghtStatus}"></div>
      <div class="linght2" :class="{act:linghtStatus}"></div>
      <div class="aniBall" :class="{ani:ballAni}" v-if="ballAni">
        <img :src="require(`./game/assets/user_ball_${randAv}.png`)" alt="" class="userAv">
        <img :src="luckAv" alt="">
      </div>
      <div class="turnBg"></div>
      <div id="game" ref="" class="game"></div>
      <div class="luckMsg">
        <div class="noLuck" v-if="!luckMsg || (luckMsg&&!luckMsg.id)">當前暫無抽獎</div>
        <div class="luckIng" v-else>
          <div class="msg">
            <span v-if="luckIng">正在抽獎...</span>
            <span v-else-if="luckMsg.status == 1">倒計時 <em>{{surplusTime.minute}}:{{surplusTime.second}}</em></span>
            <span v-else class="nick">恭喜：<em>{{luckMsg.winner_nick}}</em> </span>
          </div>
          <div class="gift">獎品：{{luckMsg.prise_str}}</div>
        </div>
      </div>
      <div class="luckBtn" :class="{luckIng:luckStatus == 3,luck:luckStatus==2,again:luckStatus == 1}" @click="goSetting()"></div>
      <div class="sGiftTips" v-if="luckMsg&&luckMsg.status == 1">送出<img :src="luckMsg.ticket_gpic" alt="">x1 即可參加抽獎</div>
      <img :src="luckMsg&&luckMsg.winner_avatar" alt="" class="luckAv" v-if="luckMsg && luckStatus== 1" />
    </div>
    <div class="buttons">
      <div>
        <button @click="setBalls()">setBalls</button>
        <button @click="addBall()">addBall</button>
        <button @click="removeBall()">removeBall</button>
      </div>
      <div>
        <button @click="play">play</button>
        <button @click="stop">stop</button>
        <button @click="removeAllBalls">removeAllBalls</button>
      </div>
    </div>
  </div>
</template>

<script>
import Game from './game';
import { getDrawDetil } from './apis'
import { toast, getUrlString, appShowPage, getAppWebUrl, appClose, callApp } from "./utils"
let game;
export default {
  data() {
    return {
      luckMsg: null,
      luckIng: false,
      ballAni: false,
      linghtStatus: false,
      surplusTime: {},
      leftTime: 0,
      luckAv: ''
    }
  },
  computed: {
    luckStatus() {
      if (!this.luckMsg || (this.luckMsg && !this.luckMsg.id)) {
        return 0
      } else if (this.luckMsg && this.luckMsg.status == 2) { //抽獎結束
        return 1
      } else if (this.luckMsg && this.luckMsg.status == 1 && !this.luckIng) { //抽獎進行倒計時
        return 2
      } else if (this.luckMsg && this.luckMsg.status == 1 && this.luckIng) {  //抽獎進行中
        return 3
      }
    },
    randAv() {
      return Math.floor(Math.random() * 5) + 1
    }
  },
  mounted() {
    setTimeout(this.initGame, 0);
    setInterval(() => {
      this.linghtStatus = !this.linghtStatus
    }, 500)
  },
  methods: {
    initGame() {
      game = new Game(document.getElementById('game'), () => {
        console.log('Game inited');
        this.luckInit()
      });
    },
    luckInit(open, cb) {
      let draw_id = getUrlString('draw_id')
      getDrawDetil(draw_id).then(res => {
        if (res.data.response_data || res.data.response_data == null) {
          let data = res.data.response_data
          if (cb) {
            this.luckAv = data ? data.winner_avatar : ''
            cb(data.winner_id)
            setTimeout(() => {
              //data
              this.luckMsg = Object.assign({}, data)
              //this.luckMsg.status = 2
            }, 8000)
            return
          }
          //    res.data.response_data
          this.luckMsg = Object.assign({}, res.data.response_data
            // {
            //   "id": 17,
            //   "rid": 11,
            //   "status": 1,
            //   "ttl": 3,
            //   "ticket_gid": 2,
            //   "ticket_gname": "放心情",
            //   "ticket_gpic": "http://img.17sing.tw/uc/gift/image_1523434682.png",
            //   "prise_str": "放飛 x1",
            //   "prise_name": "放飛",
            //   "prise_pic": "http://img.17sing.tw/uc/gift/image_1523434682.png",
            //   "winner_id": 10,
            //   "winner_nick": "10name",
            //   "winner_avatar": "http://img.17sing.tw/uc/img/head_2233806_1515642245.png",
            //   "icon_list": [
            //     {
            //       "uid": 6200105,
            //       "count": 10,
            //       "avatar": "http://img.17sing.tw/uc/img/head_2233806_1515642255.png"
            //     },
            //     {
            //       "uid": 10,
            //       "count": 10,
            //       "avatar": "http://img.17sing.tw/uc/img/head_2233806_1515642245.png"
            //     }
            //   ]
            // }
          )
          if (this.luckMsg.status == 1 && !open) {
            this.downTimeGo(this.luckMsg.ttl + 2)
          }
          if (this.luckMsg.id && !open) {
            this.setBalls(this.comptedIcons(this.luckMsg.icon_list))
          }
        } else {
          toast(res.data.response_status.error)
        }
      })

    },
    comptedIcons(arr) {
      let s = []
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].count; j++) {
          s.push(arr[i])
        }
      }
      return s
    },
    setBalls(balls = []) {
      game.setBalls(balls);
    },
    // addBall(ball = null) {
    //   ball = { uid: 4878150, avatar: 'http://img.17sing.tw/uc/img/head_4878150_1597085904.png_small' };
    //   game.addBall(ball);
    // },
    removeBall(uid = 0) {
      game.removeBall(uid);
    },
    removeAllBalls() {
      game.removeAllBalls();
    },
    play() {
      game.play();
    },
    stop() {
      game.stop();
    },
    downTimeGo: function (dTime) {
      var hour = 0
      var minute = 0
      var second = 0
      var that = this
      var s = dTime
      that.timer = setInterval(function () {
        s--
        var hour = parseInt(s / 60 / 60 % 24, 10);
        var minute = parseInt(s / 60 % 60, 10);;
        var second = parseInt(s % 60, 10);;
        hour = hour < 10 ? '0' + hour : hour.toString();
        minute = minute < 10 ? '0' + minute : minute.toString();
        second = second < 10 ? '0' + second : second.toString();
        that.surplusTime = { hour: hour, minute: minute, second: second }
        if (s <= 0) {
          clearInterval(that.timer)
          that.luckInit('open', function (id) {
            that.luckIng = true
            that.play()
            setTimeout(() => {
              that.stop()
              that.removeBall(id)
              that.ballAni = true
              setTimeout(() => {
                that.ballAni = false
                that.luckIng = false
              }, 2000)
            }, 6000)
          })
        }
      }, 1000)
    },
    goSetting() {
      if (this.luckStatus == 2) {
        callApp("showGiftPanel", this.luckMsg.ticket_gid)
        return
      }
      if (this.luckStatus == 0 || this.luckStatus == 1) {
        let token = getUrlString('token')
        let uid = getUrlString('uid')
        let rid = getUrlString('rid')
        let host = getUrlString('host') || ''
        let role = getUrlString('role') || ''
        const link = location.origin + location.pathname.replace(/\/[^\/]+\.html$/, `/setting.html`) + `?token=${token}&uid=${uid}&rid=${rid}&host=${host}&role=${role}`
        this.closeWeb()
        appShowPage({}, link, { fullPage: 1, showTitle: 1 })
      }
    },
    closeWeb() {
      console.log('xxxx')
      appClose()
    }
  },
};
</script>

<style lang="scss">
.pageMain {
  background: url(./img/gameBg.png) no-repeat;
  background-size: 100% auto;
  position: relative;
  .qustion {
    width: 0.51rem;
    height: 0.51rem;
    background: url(./img/question.png);
    background-size: 100% 100%;
    position: absolute;
    left: 0.23rem;
    top: 0.27rem;
    z-index: 11;
  }
  .history {
    width: 0.38rem;
    height: 0.38rem;
    background: url(./img/historyIcon.png);
    background-size: 100% 100%;
    position: absolute;
    left: 0.3rem;
    top: 1.13rem;
    z-index: 11;
  }
  .close {
    width: 0.27rem;
    height: 0.28rem;
    background: url(./img/close.png);
    background-size: 100% 100%;
    position: absolute;
    top: 0.39rem;
    right: 0.31rem;
    z-index: 20;
  }
  .turnBox {
    position: relative;
    height: 9.89rem;
    .linght1 {
      display: block;
      width: 6.68rem;
      height: 0.55rem;
      background: url(./img/linght1.png);
      background-size: 100% 100%;
      position: absolute;
      left: 0.23rem;
      top: 6.08rem;
      z-index: 10;
      &.act {
        background: url(./img/linght1Act.png);
        background-size: 100% 100%;
      }
    }
    .linght2 {
      display: block;
      width: 1.9rem;
      height: 1.58rem;
      background: url(./img/linght2.png);
      background-size: 100% 100%;
      position: absolute;
      left: 0.83rem;
      top: 6.5rem;
      z-index: 10;
      &.act {
        background: url(./img/linght2Act.png);
        background-size: 100% 100%;
      }
    }
    .aniBall {
      display: block;
      width: 0.65rem;
      height: 0.65rem;
      position: absolute;
      left: 0.6rem;
      top: 2.9rem;
      z-index: 2;
      &.ani {
        animation: ballAni 1.5s linear forwards;
      }

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        position: absolute;
        &.userAv {
          z-index: 10;
        }
      }
    }
    .luckAv {
      width: 1.12rem;
      height: 1.12rem;
      border-radius: 50%;
      position: absolute;
      bottom: 1.87rem;
      left: 1.24rem;
      z-index: 10;
    }
    .turnBg {
      width: 100%;
      height: 9.89rem;
      background: url(./img/gameBgBox.png) no-repeat;
      background-size: 100% auto;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 2;
    }
    .game {
      width: 5.3rem;
      height: 5.3rem;
      margin: auto;
      z-index: 0;
      position: absolute;
      left: 1.1rem;
      top: 0.5rem;
      canvas {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .luckMsg {
      width: 4rem;
      height: 1.1rem;
      position: absolute;
      right: 0.52rem;
      bottom: 2.1rem;
      z-index: 100;
      border-radius: 0.2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .noLuck {
        color: rgba(255, 255, 255, 0.4);
        font-size: 0.32rem;
      }
      .luckIng {
        .msg {
          color: rgba(255, 242, 40, 1);
          font-size: 0.32rem;
          display: flex;
          justify-content: center;
          em {
            max-width: 2.5rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .nick {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        .gift {
          color: rgba(255, 255, 255, 1);
          font-size: 0.28rem;
          text-align: center;
          //   margin-top: 0.12rem;
        }
      }
    }
    .luckBtn {
      width: 4.57rem;
      height: 1.3rem;
      position: absolute;
      left: 1.48rem;
      bottom: 0.54rem;
      background: url(./img/creatBtn1.png);
      background-size: 100% 100%;
      z-index: 10;
      &.again {
        background: url(./img/againBtn.png);
        background-size: 100% 100%;
      }
      &.luck {
        background: url(./img/luckStatus1.png);
        background-size: 100% 100%;
      }
      &.luckIng {
        background: url(./img/luckStatus2.png);
        background-size: 100% 100%;
      }
    }
    .sGiftTips {
      width: 100%;
      height: 0.5rem;
      color: rgba(255, 247, 114, 1);
      font-size: 0.28rem;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      bottom: 0.08rem;
      z-index: 20;
      img {
        width: 0.5rem;
        height: 0.5rem;
        margin: 0 0.1rem;
      }
    }
  }
  .buttons {
    text-align: center;
    padding-top: 0.1rem;
    display: none;
    button {
      margin: 0.1rem;
      padding: 0 0.1rem;
    }
  }
  @keyframes ballAni {
    0% {
      left: 0.6rem;
      top: 2.9rem;
    }
    20% {
      left: 0.15rem;
      top: 2.9rem;
    }
    70% {
      left: 0.15rem;
      top: 6.75rem;
      transform: rotate(-1000deg);
      opacity: 1;
    }
    90% {
      left: 1.4rem;
      top: 6.75rem;
      transform: scale(1);
      z-index: 2;
      opacity: 0.1;
    }
    100% {
      left: 1.47rem;
      top: 7.12rem;
      transform: scale(1.75);
      z-index: 20;
      opacity: 1;
    }
  }
}
</style>