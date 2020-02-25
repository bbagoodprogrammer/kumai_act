<template>
  <div class="game">
    <div class="gheader">
      <span class="face"><img v-lazy="userAvatar"></span>
      <span class="lvbar">
        <span class="lv"><strong>{{lang.Lv}}{{nowGrade.grade?nowGrade.grade:0}}</strong><i></i><strong>{{lang.Lv}}{{nextGrade}}</strong></span>
        <span class="bar"><i :style="{width:linerWidth + '%'}" :class="{right:linerWidth>=98}"></i></span>
        <span class="score" v-if="!isFull"><i :style="{width:linerWidth+ '%'}"></i><strong>{{nowScore?nowScore:0}}</strong><em>{{nextScore}}</em></span>
        <span class="score type2" v-else><em>{{nextScore}}</em><i :style="{width:linerWidth+ '%'}"></i><strong>{{nowScore?nowScore:0}}</strong></span>
      </span>
      <i class="ipacket" :class="{shake:lv_gift_status==1 || changLv}"></i>
      <span class="prizes"><em>{{lang.gradeGift}}</em><a href="" @click.prevent="goGradeGift()">{{lang.Receive}}</a></span>
    </div>
    <div class="gmain">
      <div v-show="!loading" class="gbar">
        <span><strong>{{lang.TotalScore}}</strong><em class="nowScore">{{score}}</em></span>
        <span><strong>{{lang.DownTime}}</strong><em>{{gameTime}}</em></span>
        <span><strong>{{lang.CombatantNumber}}</strong><em>{{doubleCount}}</em></span>
      </div>
      <div class="gcanvas">
        <div v-show="!loading" class="placesGroup">
          <div class="pGroup" v-for="(places, g) in placesGroup" :key="g">
            <place @hit="onHit" @reset="onReset" v-for="place in places" :class="'place'+place.id" :place="place" :key="place.id" />
          </div>
        </div>

        <transition name="fade">
          <div v-if="inStep2" class="step2Tips"><img src="../img/text_mouse_come.png"></div>
        </transition>

        <transition name="fade">
          <div v-if="gaming&&readyTime" class="readyTime"><span :class="'num'+readyTime">{{readyTime}}</span></div>
        </transition>

        <transition name="fade">
          <div v-show="!loading&&!gaming && !isUpLoading" class="start">
            <div class="button"><a @click.prevent="startGame" :class="{disabled:startDisabled}" href=""><strong>{{lang.StartGame}}</strong><em>{{lang.OneGameB}}</em></a></div>
            <div class="coins"><strong>{{lang.GameB}}</strong><i></i><em>{{daily_b}}</em></div>
            <div class="tips">{{lang.mouseTips1}},{{lang.mouseTips2}}</div>
          </div>
        </transition>

        <transition name="slide">
          <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
        </transition>

        <transition name="slide">
          <div class="noConis" v-show="showNoCoins">
            <div class="noCoinsCon">
              <span class="close" @click="closeNoCoins()"></span>
              <p>{{lang.noCoinsTips1}}{{lang.noCoinsTips2}}</p>
              <span class="doTask" @click="goTask()">{{lang.goGetConis}}</span>
            </div>
          </div>
        </transition>

        <transition name="slide">
          <div class="result" v-show="showResult">
            <div class="resultCon">
              <span class="close" @click="closeResult()"></span>
              <p>
                <strong>{{lang.NowScore}}</strong><em class="nowGrade">{{score}}</em>
                </br>{{lang.AchieveLv}}<em>{{lang.Lv}} <i>{{nowGrade.grade}}</i> </em>
              </p>
              <span class="doTask" @click="startGame()">{{lang.Again}}</span>
            </div>
          </div>
        </transition>
        <GameLoading v-show="loading" @load="onLoadingComplete" />
      </div>
    </div>
  </div>
</template>

<script>
import c from '../config/game';
import Place from './Place';
import GameLoading from './GameLoading';
import { getRand, arrayRandom, getOffset, isSupportedCss3D, toast } from '../utils';
import { mapState } from "vuex"
import getString from "../utils/getString"
import { newObj, findValueUseTwoSplit } from "../utils/getGrade"
import api from "../api/apiConfig"
import MsgToast from "../components/commonToast"
import { encodeData } from "../utils/xor"
import axios from "axios"
import { globalBus } from "../utils/eventBus"
import lang from "../config/lang"
let sound;

export default {
  data() {
    return {
      loading: true,
      gaming: false,
      inStep2: false,

      score: 0,
      doubleCount: 0,
      gameTime: c.GAME_TIME,
      readyTime: c.READY_TIME,

      lastType: c.GRAY_MOUSE,
      rightCount: 0,

      readyTimer: null,
      gameTimer: null,
      createMouseTimer: null,
      previewTimer: null,
      places: {
        1: { id: 1, type: 0, running: false },
        2: { id: 2, type: 0, running: false },
        3: { id: 3, type: 0, running: false },
        4: { id: 4, type: 0, running: false },
        5: { id: 5, type: 0, running: false },
        6: { id: 6, type: 0, running: false },
        7: { id: 7, type: 0, running: false },
        8: { id: 8, type: 0, running: false },
        9: { id: 9, type: 0, running: false },
        10: { id: 10, type: 0, running: false },
      },
      tastMsg: '',
      showT: false,
      key: '',
      showNoCoins: false,
      changLv: false,
      isUpLoading: false,
      showResult: false
    };
  },
  computed: {
    ...mapState(['daily_b', 'groupsUserMsg', 'userScore', 'lv_gift_status', 'registered']),
    userAvatar() {
      if (this.groupsUserMsg[2]) {
        return this.groupsUserMsg[2].msg.avatar
      }
    },
    nowGrade() {
      return findValueUseTwoSplit(this.userScore)
    },
    nextGrade() {
      // console.log(this.nowGrade)
      return this.nowGrade.grade >= 25 ? 25 : findValueUseTwoSplit(this.userScore).grade + 1
    },
    nowScore() {
      return this.userScore
    },
    nextScore() {
      // console.log(this.nextGrade)
      return newObj[this.nextGrade - 1].fraction
    },
    isFull() {  //是否滿級
      return this.nowGrade.grade == this.nextGrade
    },
    linerWidth() {
      if (this.nowGrade.grade == 0) {
        return (1 - this.nowGrade.dcukScore / 1000) * 100
      } else if (this.nowGrade.grade == 25) {
        return 100
      } else if (newObj[this.nowGrade.grade]) {
        return (1 - this.nowGrade.dcukScore / (this.nextScore - this.nowGrade.fraction)) * 100
      }
    },
    c() {
      return c;
    },
    isStep2() {
      return this.rightCount > c.LEVEL_CHANGE_COUNT;
    },
    yellowMouseScore() {
      return this.isStep2 ? c.YELLOW_MOUSE_SCORE2 : c.YELLOW_MOUSE_SCORE1;
    },
    createMouseTickTime() {
      return this.isStep2 ? c.SHOW_MOUSE_TIME2 : c.SHOW_MOUSE_TIME1;
    },
    startDisabled() {
      return this.loading || this.gaming
    },
    hasRunningMouse() {
      for (let id in this.places) {
        if (this.places[id].running) {
          return true;
        }
      }
      return false;
    },
    placesGroup() {
      const groups = [];
      let i = 0;
      let arr = [];
      for (let id in this.places) {
        i++;
        arr.push(this.places[id]);
        if (i == 3 || i == 7 || i == 10) {
          groups.push(arr);
          arr = [];
        }
      }
      return groups;
    },
  },
  watch: {
    nowGrade(val) {
      if (val > this.nowGrade) {
        this.changLv = true
      }
    },
    rightCount(newValue) {
      if (newValue == c.LEVEL_CHANGE_COUNT) {
        this.inStep2 = true;
        this.doubleCount = 0;
        setTimeout(() => {
          this.inStep2 = false;
        }, 1000);
      }
    },
  },
  mounted() {
  },
  destroyed() {
    this.stopAllTimer();
    this.stopAllSound();
  },
  methods: {
    playBgSound() {
      sound.playBgSound();
    },
    playHitSound(place) {
      sound.playHitSound(place.type == c.GRAY_MOUSE);
    },
    stopAllSound() {
      sound.stopAllSound();
    },

    stopAllTimer() {
      clearInterval(this.readyTimer);
      clearInterval(this.gameTimer);
      clearTimeout(this.createMouseTimer);
      clearTimeout(this.previewTimer)
    },
    resetGame() {
      this.stopAllTimer();
      this.gaming = false;
      this.inStep2 = false;
      this.score = 0;
      this.doubleCount = 0;
      this.gameTime = c.GAME_TIME;
      this.readyTime = c.READY_TIME;
      this.lastType = c.GRAY_MOUSE;
      this.rightCount = 0;
    },
    startGame() {
      this.closeResult()
      globalBus.$emit('commonEvent', () => {
        if (this.startDisabled) {
          return;
        }

        if (!isSupportedCss3D) {
          api.diPath()
          toast(lang.upgraded);
          return;
        }
        if (!this.registered) {
          this.tastMsg = lang.NoSingUp
          this.showT = true
        } else if (this.isUpLoading) {
          toast(lang.upScoreIng);
        } else if (this.daily_b >= 20) {
          api.playGameState().then(res => {
            if (res.data.response_status.code == 0) {
              this.start()
              this.key = res.data.response_data.key
              this.$store.commit('reduceB', 20)
            } else {
              this.tastMsg = res.data.response_status.error
              this.showT = true
            }
          })
        } else {
          this.showNoCoins = true
        }
      })
    },
    start() {
      this.playBgSound();
      this.resetGame();
      this.gaming = true;
      this.readyTimer = setInterval(() => {
        this.readyTime--;
        if (this.readyTime <= 0) {
          clearInterval(this.readyTimer);
          this.startGameTimer();
          this.startCreateMouseTimer();
        }
      }, 1000);
    },
    gameOver() {  //上報分數
      let encodeScore = encodeData(this.score, this.key)
      let regstr = getString('token')
      this.isUpLoading = true
      axios.get(`/ye201901/addgamescore.php?token=${regstr}&score=${this.score}`, {
        headers: { Warning: encodeScore, ETag: this.key }
      }).then(res => {
        this.isUpLoading = false
        if (res.data.response_status.code == 0) {
          //增加分數，替換等級
          this.$store.commit('addScore', this.score * 1)
          this.showResult = true  //顯示當前分數和等級
          this.previewTimer = setTimeout(() => {
            this.rightCount = 0
            this.startCreateMouseTimer();
          }, 5000)
        }
      }).catch(error => {
        this.isUpLoading = false
        // toast(error);
      })
    },
    startGameTimer() {
      this.gameTimer = setInterval(() => {
        this.gameTime--;
        if (this.gameTime == 0) {
          this.gaming = false;
          this.stopAllTimer();
          this.stopAllSound();
          this.gameOver();
        }
      }, 1000);
    },
    startCreateMouseTimer() {
      this.createMouseTick();
      this.createMouseTimer = setTimeout(this.startCreateMouseTimer, this.createMouseTickTime);
    },

    createMouseTick() {
      let ids = [];
      let yellowRunningCount = 0;
      for (let id in this.places) {
        if (!this.places[id].running) {
          ids.push(id);
        } else if (this.places[id].type == c.YELLOW_MOUSE) {
          yellowRunningCount++;
        }
      }
      ids = arrayRandom(ids);

      const createCount = yellowRunningCount > c.MORE_YELLOW_MOUSE_LIMIT ? 2 : (Math.random() > (1 - c.TWO_GRAY_MOUSE_CHANCE) ? 3 : 2);
      ids = ids.slice(0, createCount);

      ids.forEach((id, index) => {
        const running = true;
        const type = index === 0 ? c.YELLOW_MOUSE : c.GRAY_MOUSE;
        const rand = Math.random();
        this.places[id] = Object.assign({}, this.places[id], { type, running, rand });
        // setTimeout(() => {

        // }, getRand(0, c.CREATE_MOUSE_MAX_DELAY));
      });
    },

    onHit(place) {
      if (!this.gaming) {
        return;
      }
      if (!place.running) {
        this.doubleCount = 0;
        return;
      }

      this.playHitSound(place);
      const { id, type, $el } = place;
      if (type == c.YELLOW_MOUSE) {
        this.rightCount++;
        if (this.lastType == c.YELLOW_MOUSE) {
          this.doubleCount++;
        } else {
          this.doubleCount = 1;
        }
        const score = this.yellowMouseScore + (this.doubleCount - 1) * c.DOUBLE_HIT_SCORE;
        this.score += score;
        this.showHitScore(score, $el);
      } else {
        this.doubleCount = 0;
        this.score += c.GRAY_MOUSE_SCORE;
        this.showHitScore(c.GRAY_MOUSE_SCORE, $el);
      }
      this.lastType = type;

      const hitType = type == c.YELLOW_MOUSE ? c.YELLOW_MOUSE_HIT : c.GRAY_MOUSE_HIT;
      Object.assign(this.places[id], { type: hitType });
    },
    onReset(place) {
      const { id, type } = place;
      this.places[id].running = false;
    },

    showHitScore(score, el) {
      const className = score > 0 ? 'right' : 'wrong';
      const value = score > 0 ? '+' + score : score;
      const span = document.createElement('span');
      span.className = 'gscore ' + className;
      span.innerHTML = value;
      span.style.width = el.offsetWidth + 'px';

      const offset = getOffset(el);
      span.style.left = offset.left + 'px';
      span.style.top = offset.top + (el.offsetHeight * .6) + 'px';

      document.body.appendChild(span);
      setTimeout(() => {
        span.className += ' active';
        setTimeout(() => {
          document.body.removeChild(span);
        }, 2000);
      }, 0);

      this.showHitHammer(el, offset);
    },
    showHitHammer(el, offset) {
      const span = document.createElement('span');
      span.className = 'ghammer';
      span.style.left = offset.left + el.offsetWidth * .2 + 'px';
      span.style.top = offset.top - el.offsetHeight * .3 + 'px';
      document.body.appendChild(span);
      setTimeout(() => {
        span.className += ' active';
        setTimeout(() => {
          span.className += ' ghammer2';
        }, 250);
        setTimeout(() => {
          document.body.removeChild(span);
        }, 300);
      }, 0);
    },

    onLoadingComplete(soundApis) {
      this.loading = false;
      sound = soundApis;
      this.startCreateMouseTimer();
    },

    goGradeGift() {
      globalBus.$emit('commonEvent', () => {
        let regstr = getString('token')
        location.href = `./index5.html?token=${regstr}`
      })
    },
    closeToast() {
      this.showT = false
    },
    goTask() {
      globalBus.$emit('tabClick', 2, 1)
      this.showNoCoins = false
    },
    closeNoCoins() {
      this.showNoCoins = false
    },
    closeResult() {
      this.showResult = false
    }
  },
  components: {
    Place,
    GameLoading,
    MsgToast
  },
}
</script>

<style lang="scss">
@keyframes hammer {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-30deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.noConis {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10000;
  .noCoinsCon {
    width: 4.8rem;
    // height: 2.12rem;
    padding: 0.5rem 0 0.3rem 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(
      0deg,
      rgba(211, 61, 59, 1),
      rgba(255, 94, 92, 1)
    );
    border: 0.04rem solid rgba(255, 244, 137, 1), rgba(255, 249, 214, 1);
    border-radius: 0.4rem;
    .close {
      display: block;
      width: 0.42rem;
      height: 0.42rem;
      background: url(../assets/img/getGiftClose.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      top: -1rem;
    }
    p {
      text-align: center;
      color: #ffdab6;
      font-size: 80%;
      line-height: 0.6rem;
    }
    span {
      display: block;
      width: 2.33rem;
      height: 0.81rem;
      line-height: 0.25rem;
      margin: 0.3rem auto 0;
      text-align: center;
      background: url(../assets/img/taskBgAct.png);
      background-size: 100% 100%;
      font-size: 93%;
      color: #b98300;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
.result {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10000;
  .resultCon {
    width: 4.8rem;
    // height: 2.12rem;
    padding: 0.5rem 0 0.3rem 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(
      0deg,
      rgba(211, 61, 59, 1),
      rgba(255, 94, 92, 1)
    );
    border: 0.04rem solid rgba(255, 244, 137, 1), rgba(255, 249, 214, 1);
    border-radius: 0.4rem;
    .close {
      display: block;
      width: 0.42rem;
      height: 0.42rem;
      background: url(../assets/img/getGiftClose.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      top: -1rem;
    }
    .nowGrade {
      display: inline-block;
      direction: ltr !important;
    }
    p {
      text-align: center;
      color: #ffdab6;
      font-size: 100%;
      line-height: 0.6rem;
      em {
        font-size: 120%;
        color: #fff;
      }
    }
    span {
      display: block;
      width: 2.33rem;
      height: 0.81rem;
      margin: 0.3rem auto 0;
      text-align: center;
      background: url(../assets/img/taskBgAct.png);
      background-size: 100% 100%;
      line-height: 0.81rem;
      font-size: 93%;
      color: #b98300;
    }
  }
}
.game {
  width: 7.26rem;
  height: 7.83rem;
  margin: 0.19rem auto 0;
  overflow: hidden;
  background: url("../img/bg_game.png");
  background-size: 100% 100%;
  .gheader {
    box-sizing: border-box;
    padding-top: 0.15rem;
    height: 1.2rem;
    text-align: center;
    font-size: 0;
    span,
    i,
    strong,
    em {
      display: inline-block;
      vertical-align: middle;
      font-size: 0.3rem;
    }
    .face {
      img {
        width: 0.8rem;
        height: 0.8rem;
        border: 0.04rem solid #ffe178;
        border-radius: 1rem;
      }
    }
    .lvbar {
      margin: 0 0.15rem;
      font-family: Arial, Helvetica, sans-serif;
      span {
        display: block;
      }
      .lv {
        display: flex;
        strong {
          color: #ffe671;
          background: #b85513;
          border: 2px solid #ffe671;
          border-radius: 0.1rem;
          font-size: 80%;
          padding: 0 0.05rem;
          flex-grow: 0;
        }
        i {
          flex-grow: 1;
        }
      }
      .bar {
        width: 3.62rem;
        height: 0.18rem;
        margin: 0.04rem 0 0 0;
        background: url("../img/bg_prog.png");
        background-size: 100% 100%;
        position: relative;
        i {
          position: absolute;
          right: 0.04rem;
          top: 0.04rem;
          height: 0.1rem;
          background: url("../img/bg_prog2.png");
          background-size: 3.54rem 0.1rem;
          background-repeat: no-repeat;
          border-top-right-radius: 1rem;
          border-bottom-right-radius: 1rem;
          max-width: 100%;
          &.right {
            right: -0.045rem;
          }
        }
      }
      .score {
        display: flex;
        justify-content: space-between;
        strong,
        em {
          font-size: 80%;
        }
        i,
        em {
          flex-grow: 0;
        }
        i {
          display: block;
        }
        strong {
          flex-grow: 1;
          text-align: right;
        }
        em {
          color: #ffe671;
          margin-left: 0.1rem;
        }
      }
      .type2 {
        em {
          margin-left: 0;
        }
        strong {
          color: #fff;
        }
      }
    }
    .ipacket {
      width: 0.81rem;
      height: 0.92rem;
      margin: 0 0.1rem;
      background: url("../img/icon_packet.png");
      background-size: 100% 100%;
      // &.shake {
      //   animation: shake 5s linear infinite;
      // }
    }
    .prizes {
      text-align: center;
      em,
      a {
        font-size: 71%;
      }
      em {
        display: block;
        color: #ffec91;
        padding-bottom: 0.05rem;
      }
      a {
        display: inline-block;
        width: 1.08rem;
        height: 0.43rem;
        line-height: 0.43rem;
        background: url("../img/bg_get_prizes.png");
        background-size: 100% 100%;
        color: #aa621b;
      }
    }
  }
  .gmain {
    position: relative;
    padding-top: 1rem;
    .gbar {
      box-sizing: border-box;
      width: 5.12rem;
      height: 0.5rem;
      line-height: 0.42rem;
      padding: 0 0.15rem;
      background: url("../img/bg_game_info.png");
      background-size: 100% 100%;
      position: absolute;
      left: 50%;
      top: 0.2rem;
      margin-left: -2.56rem;
      display: flex;
      // direction: ltr;
      .nowScore {
        display: inline-block;
        direction: ltr !important;
      }
      span,
      strong,
      em {
        display: inline-block;
        vertical-align: middle;
      }
      span {
        display: flex;
        align-items: center;
        &:nth-child(1) {
          min-width: 1.6rem;
          color: #e5ff9f;
          flex-grow: 0;
        }
        &:nth-child(2) {
          color: #ffd77f;
          flex-grow: 1;
          text-align: center;
        }
        &:nth-child(3) {
          color: #31ffa5;
          flex-grow: 0;
        }
      }
      strong {
        font-size: 73%;
        text-align: center;
        line-height: 0.2rem;
      }
      em {
        padding: 0 0.1rem;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
      }
    }
    .gcanvas {
      height: 5.5rem;
      position: relative;
      .step2Tips,
      .readyTime {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        pointer-events: none;
      }
      .readyTime {
        pointer-events: auto;
      }
      .step2Tips {
        img {
          height: 0.55rem;
        }
      }
      .readyTime {
        span {
          display: inline-block;
          text-indent: -1000rem;
          width: 1rem;
          height: 1.46rem;
          background-position: center center;
          background-size: auto 100%;
          background-repeat: no-repeat;
          &.num1 {
            background-image: url("../img/text_1.png");
          }
          &.num2 {
            background-image: url("../img/text_2.png");
          }
          &.num3 {
            background-image: url("../img/text_3.png");
          }
        }
      }
      .start {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: url("../img/bg_start.png") center center no-repeat;
        background-size: contain;
        .button {
          width: 3.62rem;
          height: 2.46rem;
          background: url("../img/btn_start.png");
          background-size: contain;
          margin: 0.8rem auto 0 auto;
          position: relative;
          a {
            display: block;
            width: 2rem;
            height: 1rem;
            position: absolute;
            left: 0.8rem;
            top: 1.4rem;
            text-indent: -1000rem;
          }
        }
        .coins {
          text-align: center;
          padding-top: 0.1rem;
          strong,
          i,
          em {
            display: inline-block;
            vertical-align: middle;
          }
          strong {
            color: #ffe0aa;
          }
          i {
            width: 0.4rem;
            height: 0.4rem;
            background: url("../img/icon_coin.png");
            background-size: contain;
            margin: 0 0.05rem;
          }
          em {
            font-family: Arial, Helvetica, sans-serif;
            color: #fff;
          }
        }
        .tips {
          text-align: center;
          padding-top: 0.15rem;
          color: #ffe0aa;
          font-size: 80%;
        }
      }
    }
  }
}

.placesGroup {
  .pGroup {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.15rem 0;
  }
}

.gscore {
  display: inline-block;
  position: absolute;
  text-align: center;
  font-size: 120%;
  font-family: Arial, sans-serif;
  pointer-events: none;
  &.right {
    color: #ffcf5d;
  }
  &.wrong {
    color: #29ffb6;
  }
  transition: all 2s ease;
  &.active {
    opacity: 0.2;
    transform: translate3d(0, -1.8rem, 0);
  }
}
.ghammer {
  display: inline-block;
  width: 1.33rem;
  height: 1.26rem;
  background: url("../img/hammer.png");
  background-size: 100% 100%;
  position: absolute;
  pointer-events: none;
  &.active {
    animation: hammer 0.3s linear;
  }
  &.ghammer2 {
    background-image: url("../img/hammer_hit.png");
  }
}
</style>