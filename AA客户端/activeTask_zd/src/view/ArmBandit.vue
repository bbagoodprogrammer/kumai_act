<template>
  <div class="box">
    <div class="rule">منشوراتي <i @click="showRuleTips()"></i></div>
    <div class="task">
      <ul>
        <li v-for="(item,index) in defaultData" :key="index">
          <div class="taskMsg">
            <img :src="item.icon" class="icon" alt="">
            <div class="msg">
              <div class="name">{{item.name}}</div>
              <div class="gift"><i></i> ×{{item.gift.num}}</div>
            </div>
            <div class="status" @click="getGift(index)">منشاتي</div>
          </div>
          <div class="stage" v-if="item.stage">
            <div class="liner" :style="{width:1.135*item.stage.length-1 +'rem'}">
              <span class="store" :style="{right:index2*(100/(item.stage.length-1))+'%'}" :class="{act:index2 < item.over }" v-for="(item2,index2) in item.stage" :key="index2">
                <canvas class="boxCanvas" :class="'canvas'+index+index2" v-if="item2.box && !item2.open"></canvas>
                <i class="giftBox" v-else-if="item2.box"></i>
                <em>{{item2.num}}</em>
              </span>
              <div class="actLiner" :style="{width:getWidth(item.item2)}">
                <i></i>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <transition name="moveR">
      <div class="ruleTips" v-if="showRule">
        <div class="title"><i class="close" @click="closeRulesTips()"></i> وصف المهام</div>
        <div class="tips">
          <h3>متابعة صديق واحد</h3>
          <p>ستتم هذه المهمة بعد متابعة صديق واحد في الغرف</p>
          <h3> تكلم بالمايك</h3>
          <p>يمكن استلام الجائزة بعد التكلم بالمايك للوقت المطلوب</p>
          <h3>وقت التفرج</h3>
          <p>لا يعتبر وقت فعال إلا التفرج في غرف الدردشة التي سجري البث المباشر فيها أو غرف الغناء التي يغني الأشخاص فيها</p>
          <h3> في صندوق الكنز، ربما له المكلفآت التالية بالإضافة إلى العملات والفول~</h3>
          <div class="giftBox">
            <img :src="require(`../assets/img/gift/${item}.png`)" alt="" v-for="(item,index) in 4" :key="index">
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

import getString from "../utils/getString"
import api from "../api/apiConfig"
import { Downloader, Parser, Player } from 'svga.lite'

const downloader = new Downloader()
const parser = new Parser({ disableWorker: true })
export default {
  components: {},
  data() {
    return {
      defaultData: [
        {
          name: 'estsdadasdada',
          icon: '',
          gift: {
            type: 'dou',
            num: 20
          },
          over: 0
        },
        {
          name: 'estsdadasdada',
          icon: '',
          gift: {
            type: 'dou',
            num: 20
          },
          over: 1,
          stage: [
            {
              num: 2
            },
            {
              num: 5
            },
            {
              num: 10,
              box: true,
              open: false
            },
          ]
        },
        {
          name: 'estsdadasdada',
          icon: '',
          gift: {
            type: 'dou',
            num: 20
          },
          over: 4,
          stage: [
            {
              num: 2
            },
            {
              num: 5
            },
            {
              num: 10,
              box: true,
              open: false
            },
            {
              num: 60
            },
            {
              num: 120,
              box: true,
              open: false
            },
          ]
        },
      ],
      svagData: null,
      showRule: false
    }
  },
  created() {
    this.getDefaultData()
    this.downSvga()
  },
  mounted() {
  },
  methods: {
    getDefaultData(val) { //初始化
      api.getDefault().then(res => {
        const { response_status, response_data } = res.data
        if (response_status.code == 0) {
          this.$nextTick(() => {
            let canvasList = document.getElementsByTagName('canvas')
            for (let i = 0; i < canvasList.length; i++) {
              this.svgaGo(canvasList[i])
            }
          })
        } else {
          this.toast(response_status.error)
        }
      })
    },
    async downSvga() {
      const fileData = await downloader.get(`http://img.17sing.tw/uc/activity/92db29e9cc0149e1df79d4b78873d4c5_1593507888.svga`);
      const data = await parser.do(fileData)
      this.svagData = data
    },
    async svgaGo(el) {
      var player = new Player(el)
      await player.mount(this.svagData)
      player.start()
    },
    showRuleTips() {
      this.showRule = true
    },
    closeRulesTips() {
      this.showRule = false
    },
    getWidth(item, item2) {
      return `100%`
      for (let i = item.stage.length - 1; i >= 0; i--) {
        if (item.over >= item.stage[item.stage.length - 1]) {
          return '100%'
        } else if (item.over >= item.stage[i]) {
          let c = item.stage[i + 1] - item.stage[i]
          let t = item.over - item.stage[i]
          let a = (t / c) * 100 / item.stage.length
          return (20 * i + a) + '%'
        }
      }
    }
  }
}
</script>
<style lang='scss'>
body::-webkit-scrollbar {
  width: 0;
}
.box {
  max-width: 750px;
  overflow-x: hidden;
  position: relative;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  direction: rtl;
  .rule {
    height: 0.92rem;
    display: flex;
    align-items: center;
    color: #666666;
    font-weight: bold;
    text-indent: 0.3rem;
    i {
      width: 0.24rem;
      height: 0.24rem;
      background: url(../assets/img/ruleTips.png);
      background-size: 100% 100%;
      margin-right: 0.16rem;
    }
  }
  .task {
    flex: 1;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    -webkit-overflow-scrolling: auto;
    li {
      position: relative;
      .taskMsg {
        padding: 0 0.3rem;
        min-height: 1.24rem;
        display: flex;
        align-items: center;
        .icon {
          width: 0.8rem;
          height: 0.8rem;
          background: red;
        }
        .msg {
          margin-right: 0.24rem;
          flex: 1;
          .name {
            color: #333333;
          }
          .gift {
            color: #fd9946;
            font-size: 0.28rem;
            display: flex;
            align-items: center;
            margin-top: 0.04rem;
            i {
              width: 0.28rem;
              height: 0.28rem;
              background: url(../assets/img/icon.png);
              background-size: 100% 100%;
              margin-left: 0.1rem;
            }
          }
        }
        .status {
          width: 1.45rem;
          height: 0.6rem;
          border-radius: 1rem;
          background: #eeeeee;
          color: #999999;
          font-size: 0.24rem;
          text-align: center;
          line-height: 0.6rem;
          &.act {
            color: #ffffff;
            background: #39d8ae;
          }
        }
      }
      .stage {
        height: 1.05rem;
        display: flex;
        // justify-content: center;
        // align-items: center;
        padding-right: 1.34rem;
        .liner {
          height: 0.1rem;
          background: #e6e0dc;
          position: relative;
          margin-top: 0.15rem;
          .store {
            display: block;
            width: 0.31rem;
            height: 0.31rem;
            background: url(../assets/img/store.png);
            background-size: 100% 100%;
            position: absolute;
            z-index: 10;
            top: -0.1rem;
            .boxCanvas {
              width: 0.61rem;
              height: 0.58rem;
              position: absolute;
              bottom: -0.1rem;
              left: -0.15rem;
            }
            em {
              display: block;
              color: #999;
              font-size: 0.22rem;
              margin-top: 0.38rem;
              text-align: center;
            }
            .giftBox {
              display: block;
              width: 0.61rem;
              height: 0.58rem;
              background: url(../assets/img/giftBox1.png);
              background-size: 100% 100%;
            }
            &.act {
              background: url(../assets/img/storeAct.png);
              background-size: 100% 100%;
            }
          }
          .actLiner {
            height: 0.1rem;
            background: linear-gradient(
              180deg,
              rgba(255, 229, 126, 1) 0%,
              rgba(255, 178, 64, 1) 13%,
              rgba(252, 234, 73, 1) 100%
            );
            border-radius: 0.1rem;
            position: absolute;
            right: 0;
            z-index: 0;
            i {
              display: block;
              width: 0.48rem;
              height: 0.3rem;
              background: url(../assets/img/actHeader.png);
              background-size: 100% 100%;
              transform: rotateY(180deg);
              position: absolute;
              left: -0.18rem;
              top: -0.12rem;
            }
          }
        }
      }
    }
    li::after {
      content: "";
      width: 6.16rem;
      height: 0.015rem;
      background-color: #eee;
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 100;
    }
    li:last-child::after {
      height: 0;
    }
  }
}
.ruleTips {
  background: #fff;
  overflow-x: hidden;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
  z-index: 1000;
  .title {
    height: 1.1rem;
    text-align: center;
    line-height: 1.1rem;
    font-size: 0.36rem;
    color: #333;
    position: relative;
    .close {
      display: block;
      width: 0.18rem;
      height: 0.32rem;
      position: absolute;
      top: 0.39rem;
      left: 0.45rem;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
    }
  }
  .tips {
    padding: 0 0.54rem;
    h3 {
      color: #666;
      font-size: 0.28rem;
      position: relative;
      margin-top: 0.2rem;
    }
    h3:first-child {
      margin-top: 0;
    }
    h3::after {
      content: "";
      width: 0.08rem;
      height: 0.08rem;
      position: absolute;
      right: -0.2rem;
      top: 0.15rem;
      background-color: #ae6aff;
      border-radius: 50%;
    }
    p {
      color: #999999;
      font-size: 0.28rem;
      line-height: 0.42rem;
    }
  }
  .giftBox {
    display: flex;
    justify-content: space-between;
    margin-top: 0.17rem;
    img {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
}
.moveR-enter-active,
.moveR-leave-active {
  transition: all 0.1s linear;
  transform: translateX(0);
}
.moveR-enter,
.moveR-leave {
  transform: translateX(100%);
}
.moveR-leave-to {
  transform: translateX(100%);
}
</style>


