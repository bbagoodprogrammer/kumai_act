<template>
  <div class="pakcet" ref="packet">
    <div class="packTitle"></div>
    <div class="msg">本活動限定歌手等級為正式及以下用戶參與</div>
    <div class="packItem">
      <span :class="'item'+item.id" v-for="(item,index) in packets" :key=index>
        <em class="jsed" v-if="item.status === 2"></em>
        <em class="js anim" v-else :class="{'anim':score>=item.score}" @click="unlock(item.score,item.name,item.id)"></em>
      </span>
    </div>
    <transition name="slide">
      <div class="wardsPup" v-show="showpup">
        <div class="wardsCont">
          <div class="title">
            <span v-if="wardName == '主唱歌手禮包'" class="title1"></span>
            <span v-if="wardName == '鋼琴手禮包'" class="title2"></span>
            <span v-if="wardName == '鼓手禮包'" class="title3"></span>
            <span v-if="wardName == '吉他手禮包'" class="title4"></span>
          </div>
          <p>恭喜您成功解鎖{{wardName}},禮包獎勵如下</p>
          <div class="wardsItem" :class="{minw:wardName !== '主唱歌手禮包'}">
            <div>
              <span class="wardBg">
                <span :class="{ward1:wardName == '主唱歌手禮包',ward2:wardName == '鋼琴手禮包',ward3:wardName == '鼓手禮包',ward4:wardName == '吉他手禮包'}"></span>
                <em v-if="wardName == '主唱歌手禮包'">主唱歌手</br>背包禮物</em>
                <em v-if="wardName == '鋼琴手禮包'">鋼琴手</br>背包禮物</em>
                <em v-if="wardName == '鼓手禮包'">鼓手</br>背包禮物</em>
                <em v-if="wardName == '吉他手禮包'">吉他手</br>背包禮物</em>
              </span>
            </div>
            <div v-if="wardName == '主唱歌手禮包'">
              <span class="wardBg">
                <span class="huizimg"></span>
                <em>萌新樂隊</br>徽章(30天)</em>
              </span>
            </div>
            <div v-if="wardName == '鼓手禮包' || wardName == '主唱歌手禮包'">
              <span class="wardBg">
                <span class="youtingimg"></span>
                <em>豪華游艇</br>座駕 <i v-if="wardName == '鼓手禮包'">(7天)</i><i v-else>(14天)</i></em>
              </span>
            </div>
            <div v-if="wardName == '鋼琴手禮包'">
              <span class="wardBg">
                <span class="jinbiimg"></span>
                <em>50金幣</em>
              </span>
            </div>
            <div v-if="wardName == '吉他手禮包'">
              <span class="wardBg">
                <span class="jinbiimg"></span>
                <em>100金豆</em>
              </span>
            </div>
          </div>
          <span class="quse" @click="closeWardPup()"></span>
        </div>
      </div>
    </transition>
    <transition name="slide">
      <div class="nowardsPup" v-show="noWardPup">
        <div class="nowardCon">
          <div class="nowardsMsg">
            您尚未達成積分，無法解鎖禮包哦前往完成任務可獲得積分！
          </div>
          <div class="go" @click="scorllGO()"></div>
        </div>
      </div>
    </transition>
    <transition name="slide">
      <div class="nowardsPup" v-show="goSingUp">
        <div class="nowardCon">
          <div class="nowardsMsg">
            請點擊開啟新旅程參與活動哦!
          </div>
          <div class="go" @click="cloesNoWard()"></div>
        </div>
      </div>
    </transition>
    <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import APP from "../utils/openApp"
import api from "../api/apiConfig"
import MsgToast from "../components/commonToast"
export default {
  components: { MsgToast },
  data() {
    return {
      showpup: false,
      noWardPup: false,
      goSingUp: false,
      wardName: '鼓手禮包',
      step: 40, //每次滚动的距离
      timer: null,
      star: false,
      tastMsg: '',
      showT: false
    }
  },
  computed: {
    ...mapState(['packets', 'score', 'isShare', "registered", "activeityState"])
  },
  methods: {
    unlock(itemScore, name, id) {
      if (this.isShare) {
        APP()
        return
      }
      if (this.activeityState === 0) { //活动未开始
        this.tastMsg = '活动未开始！'
        this.showT = true
      } else if (this.activeityState === 2) { //活动jieshu 
        this.tastMsg = '活动已结束！'
        this.showT = true
      } else if (!this.registered) { //用户未报名
        this.goSingUp = true
      } else if (this.score >= itemScore) { //积分足够解锁
        api.unlockPack(id).then((res) => {
          if (res.data.response_status.code === 0) { //解锁成功
            this.showpup = true
            this.wardName = name //当前礼包名字
            //改变当前礼包状态
            var newPack = this.packets
            newPack[--id].status = 2
            this.$store.commit('changPackets', newPack) //礼包列表
          }
        })
      } else { //积分不足
        this.noWardPup = true
      }
    },
    scorllGO() { //关闭弹窗滚动
      this.noWardPup = false
      var scorllHight = this.$parent.$refs.tasksList.$el.offsetTop - 22.5
      this.timer = setInterval(() => {
        var scorllTop = document.documentElement.scrollTop || document.body.scrollTop
        const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 10
        var dicet = 0
        if (scorllTop <= scorllHight) { // 需要滚动得距离

          dicet = scorllHight - scorllTop
        } else {
          dicet = scorllHight - scorllTop
        }
        var step = dicet / 10
        window.scrollTo(0, scorllTop += step)
        if ((step < 3 && step > -3) || scrollToBottom) {//速度小于3或者滚动条到底了
          clearInterval(this.timer)
        }
      }, 10)
    },
    cloesNoWard() {
      this.goSingUp = false
    },
    closeWardPup() {
      this.showpup = false
    },
    closeToast() {
      this.showT = false
    }
  }
}
</script>
<style lang="scss">
.pakcet {
  .packTitle {
    width: 3.24rem;
    height: 0.92rem;
    margin: 0.25rem auto 0;
    background: url(../assets/img/packets.png) no-repeat;
    background-size: 100% 100%;
  }
  .msg {
    font-size: 80%;
    color: #4178bb;
    text-align: center;
    margin-top: 0.17rem;
  }
  .packItem {
    width: 7.18rem;
    height: 7.54rem;
    margin: -0.1rem auto;
    background: url(../assets/img/pakcetItme.png) no-repeat;
    background-size: 100% 100%;
    position: relative;
    span {
      display: inline-block;
      width: 1.25rem;
      height: 0.57rem;
      em {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
      .js {
        background: url(../assets/img/js.png) no-repeat;
        background-size: contain;
      }
      .jsed {
        background: url(../assets/img/jsed.png) no-repeat;
        background-size: contain;
      }
      &.item4 {
        position: absolute;
        top: 1.91rem;
        right: 0.38rem;
      }
      &.item3 {
        position: absolute;
        top: 3.34rem;
        left: 0.59rem;
      }
      &.item2 {
        position: absolute;
        top: 5.18rem;
        right: 1.1rem;
      }
      &.item1 {
        position: absolute;
        top: 6.38rem;
        left: 0.54rem;
      }
    }
  }
  .wardsPup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 10000;
    .wardsCont {
      width: 5.65rem;
      height: 3.82rem;
      padding: 0.62rem 0.62rem 0;
      background: url(../assets/img/wardsBg.png) no-repeat;
      background-size: 100% 100%;
      position: relative;
      left: 0.3rem;
      top: 4rem;
      .title {
        width: 3.62rem;
        height: 0.92rem;
        background: url(../assets/img/wardsTBg.png) no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: -0.36rem;
        left: 1.66rem;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          display: inline-block;
          height: 0.37rem;
          margin-top: -0.2rem;
          &.title1 {
            width: 2.83rem;
            background: url(../assets/img/title1.png) no-repeat;
            background-size: contain;
          }
          &.title2 {
            width: 2.83rem;
            background: url(../assets/img/title2.png) no-repeat;
            background-size: contain;
          }
          &.title3 {
            width: 2.13rem;
            background: url(../assets/img/title3.png) no-repeat;
            background-size: contain;
          }
          &.title4 {
            width: 2.48rem;
            background: url(../assets/img/title4.png) no-repeat;
            background-size: contain;
          }
        }
      }
      p {
        font-size: 80%;
        color: #4178bb;
        text-align: center;
      }
      .wardsItem {
        height: 2.1rem;
        display: flex;
        justify-content: space-between;
        margin-top: 0.16rem;
        &.minw {
          width: 3.5rem;
          margin: 0.16rem auto 0;
        }
        .wardBg {
          display: inline-block;
          width: 1.46rem;
          height: 1.47rem;
          background: url(../assets/img/wardItemBg.png) no-repeat;
          background-size: 100% 100%;
          > span {
            display: inline-block;
            width: 1.4rem;
            height: 1.4rem;
            &.ward1 {
              background: url(../assets/img/geshou.png);
              background-size: 100% 100%;
            }
            &.ward2 {
              background: url(../assets/img/gangqin.png);
              background-size: 100% 100%;
            }
            &.ward3 {
              background: url(../assets/img/gushou.png);
              background-size: 100% 100%;
            }
            &.ward4 {
              background: url(../assets/img/jita.png);
              background-size: 100% 100%;
            }
          }
          > em {
            display: inline-block;
            width: 100%;
            height: 0.53rem;
            font-size: 80%;
            margin-top: 0.06rem;
            text-align: center;
            color: #4178bb;
            i {
              font-size: 80%;
            }
          }
          .backimg {
            background: url(../assets/img/ward1.png);
            background-size: 100% 100%;
          }
          .huizimg {
            background: url(../assets/img/ward2.png);
            background-size: 100% 100%;
          }
          .youtingimg {
            background: url(../assets/img/ward3.png);
            background-size: 100% 100%;
          }
          .jinbiimg {
            background: url(../assets/img/ward4.png);
            background-size: 100% 100%;
          }
          .jindouWard {
            background: url(../assets/img/ward5.png);
            background-size: 100% 100%;
          }
        }
      }
      .quse {
        display: block;
        width: 1.58rem;
        height: 0.62rem;
        margin: 0.25rem auto;
        background: url(../assets/img/qust.png);
        background-size: 100% 100%;
      }
    }
  }
  .nowardsPup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 10000;
    .nowardCon {
      width: 5.49rem;
      height: 2.68rem;
      padding: 0.58rem 0.7rem 0;
      background: url(../assets/img/noWardBg.png) no-repeat;
      background-size: 100% 100%;
      position: absolute;
      left: 0.3rem;
      top: 4rem;
      .nowardsMsg {
        font-size: 120%;
        color: #4178bb;
        text-align: center;
        line-height: 0.55rem;
      }
      .go {
        width: 1.79rem;
        height: 0.62rem;
        background: url(../assets/img/go.png) no-repeat;
        background-size: 100% 100%;
        margin: 0.37rem auto;
      }
    }
  }
  .slide-enter-active {
    animation-name: slideInUp;
    animation-duration: 0.2s;
    animation-fill-mode: both;
  }
  .slide-leave-active {
    animation-name: slideOutDown;
    animation-duration: 0.2s;
    animation-fill-mode: both;
  }
  @keyframes slideInUp {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.2);
    }
    to {
      transform: scale(1);
    }
  }
  @keyframes slideOutDown {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    to {
      transform: scale(0);
    }
  }
}
.anim {
  animation: jiggle 3s ease-in infinite;
  -o-animation: jiggle 3s ease-in infinite;
  -webkit-animation: jiggle 3s ease-in infinite;
  -moz-animation: jiggle 3s ease-in infinite;
  -ms-animation: jiggle 3s ease-in infinite;
}
@keyframes jiggle {
  70%,
  100% {
    transform: rotate(0);
  }
  73%,
  79%,
  84%,
  90%,
  96% {
    transform: rotate(-3deg);
  }
  76%,
  81%,
  87%,
  93%,
  99% {
    transform: rotate(3deg);
  }
  // 48%,
  // 62% {
  //   transform: scale(1, 1);
  // }
  // 50% {
  //   transform: scale(1.1, 0.9);
  // }
  // 56% {
  //   transform: scale(0.9, 1.1) translate(0, -5px);
  // }
  // 59% {
  //   transform: scale(1, 1) translate(0, -3px);
  // }
}
@-o-keyframes jiggle {
  70%,
  100% {
    transform: translateX(0);
  }
  73%,
  79%,
  84%,
  90%,
  96% {
    transform: translateX(-3px);
  }
  76%,
  81%,
  87%,
  93%,
  99% {
    transform: translateX(3px);
  }
  // 48%,
  // 62% {
  //   transform: scale(1, 1);
  // }
  // 50% {
  //   transform: scale(1.1, 0.9);
  // }
  // 56% {
  //   transform: scale(0.9, 1.1) translate(0, -5px);
  // }
  // 59% {
  //   transform: scale(1, 1) translate(0, -3px);
  // }
}
@-webkit-keyframes jiggle {
  70%,
  100% {
    transform: translateX(0);
  }
  73%,
  79%,
  84%,
  90%,
  96% {
    transform: translateX(-3px);
  }
  76%,
  81%,
  87%,
  93%,
  99% {
    transform: translateX(3px);
  }
  // 48%,
  // 62% {
  //   transform: scale(1, 1);
  // }
  // 50% {
  //   transform: scale(1.1, 0.9);
  // }
  // 56% {
  //   transform: scale(0.9, 1.1) translate(0, -5px);
  // }
  // 59% {
  //   transform: scale(1, 1) translate(0, -3px);
  // }
}
@-moz-keyframes jiggle {
  70%,
  100% {
    transform: translateX(0);
  }
  73%,
  79%,
  84%,
  90%,
  96% {
    transform: translateX(-3px);
  }
  76%,
  81%,
  87%,
  93%,
  99% {
    transform: translateX(3px);
  }
  // 48%,
  // 62% {
  //   transform: scale(1, 1);
  // }
  // 50% {
  //   transform: scale(1.1, 0.9);
  // }
  // 56% {
  //   transform: scale(0.9, 1.1) translate(0, -5px);
  // }
  // 59% {
  //   transform: scale(1, 1) translate(0, -3px);
  // }
}
@-ms-keyframes jiggle {
  70%,
  100% {
    transform: translateX(0);
  }
  73%,
  79%,
  84%,
  90%,
  96% {
    transform: translateX(-3px);
  }
  76%,
  81%,
  87%,
  93%,
  99% {
    transform: translateX(3px);
  }
  // 48%,
  // 62% {
  //   transform: scale(1, 1);
  // }
  // 50% {
  //   transform: scale(1.1, 0.9);
  // }
  // 56% {
  //   transform: scale(0.9, 1.1) translate(0, -5px);
  // }
  // 59% {
  //   transform: scale(1, 1) translate(0, -3px);
  // }
}
</style>
