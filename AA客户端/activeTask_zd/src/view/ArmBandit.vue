<template>
  <div class="box">
    <div class="rule">منشوراتي <i @click="showRuleTips()"></i></div>
    <div class="task">
      <ul>
        <li v-for="(item,index) in defaultData" :key="index">
          <div class="taskMsg">
            <img :src="require(`../assets/img/icon${item.id}.png`)" class="icon" alt="">
            <div class="msg">
              <div class="name">{{item.name}} <em v-if="item.id!=1">({{item.cur_node.target}}دقائق)</em> </div>
              <div class="gift"><i></i> ×{{item.cur_node.reward_qty}}</div>
            </div>
            <div class="status" :class="{act:item.status==1}">
              <em v-if="item.status==0">لم تكمل</em>
              <em v-else-if="item.status == 1" @click="getGift(item,index)">استلام</em>
              <em v-else>إكمال</em>
            </div>
          </div>
          <div class="stage" v-if="item.nodes.length > 1">
            <div class="liner" :style="{width:1.135*item.nodes.length-1 +'rem'}">
              <span class="store" :style="{right:index2*(100/(item.nodes.length-1))+'%'}" :class="{act: item2.status == 2,other:item2.status == 1}" v-for="(item2,index2) in item.nodes" :key="index2">
                <canvas class="boxCanvas" :class="'canvas'+index+index2" v-if="item2.reward_type !=1  && item2.status == 1" @click="getGift(item,index,index2)"></canvas>
                <i class="giftBox" :class="{over:item2.status == 2}" v-else-if="item2.reward_type !=1"></i>
                <em>{{item2.target}}</em>
              </span>
              <div class="actLiner" :style="{width:getWidth(item) + '%'}">
                <i v-if="getWidth(item) > 3"></i>
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
            <span class="giftBg" v-for="(item,index) in 4" :key="index">
              <img :src="require(`../assets/img/gift/${item}.png`)" alt="">
            </span>
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
import report from '../utils/report';

const downloader = new Downloader()
const parser = new Parser({ disableWorker: true })

const reportData = {
  action: {
    follow_0: 201,
    sm_0: 301,
    sm_1: 302,
    sm_2: 303,
    sm_3: 304,
    sm_4: 305,
    watch_0: 401,
    watch_1: 402,
    watch_2: 403,
    watch_3: 404,
    watch_4: 405,
  },
  from: {
    from_1: 1,
    from_2: 2
  },
  click: {
    click_1: 1,
    click_2: 2
  }
}
function reportFun(key, taskKey, taskIndex) {
  let obj = {
    id: '011904001',
  }
  obj[key] = reportData[key][`${taskKey}_${taskIndex}`]
  report(obj)
}
export default {
  components: {},
  data() {
    return {
      defaultData: [],
      svagData: null,
      showRule: false
    }
  },
  created() {
    let from = getString('from')
    if (from) {
      reportFun('from', 'from', from)
    }
    this.getDefaultData()
    this.downSvga()
  },
  mounted() {
    try {
      JSInterface.hideLoading()
    } catch (e) {

    }
  },
  methods: {
    getDefaultData(val) { //初始化
      api.getDefault().then(res => {
        const { response_status, response_data } = res.data
        if (response_data) {
          this.defaultData = response_data.list
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
    getGift(item, index, index2) {
      if (!index2) {
        reportFun('click', 'click', 1)
      } else {
        reportFun('click', 'click', 2)
      }
      if (index === 0) {
        reportFun('action', 'follow', item.cur_node.idx)
      } else if (index === 1) {
        reportFun('action', 'sm', index2 ? index2 : item.cur_node.idx)
      } else if (index === 2) {
        reportFun('action', 'watch', index2 ? index2 : item.cur_node.idx)
      }
      api.getGift(item.id, index2).then(res => {
        const { response_status, response_data } = res.data
        if (response_data) {
          const { prize, rate, status, next_node } = response_data
          let curIndex = item.cur_node.idx
          this.defaultData[index].cur_node = next_node
          this.defaultData[index].rate = rate
          this.defaultData[index].status = status
          if (index2) {
            this.defaultData[index].nodes[index2].status = 2
          } else {
            this.defaultData[index].nodes[curIndex].status = 2
          }
          if (prize.reward_type == 1) {
            JSInterface.showToast(`استلمت ${prize.prize_qty} فول بنجاح`)
          } else {
            JSInterface.onShowRoomActs("مبروك، تحصل على", "تصل الهدايا إلى حقيبتك", `تنتهي الصلاحية بعد ${prize.prize_days} أيام`, prize.prize_img, "عرفت");
          }
        } else {
          JSInterface.showToast(response_status.error)
        }
      })
    },
    async downSvga() {
      const fileData = await downloader.get(`http://fstatic.cat1314.com/uc/svga/02a59d0031983b442728b83b2bcab91d_1604981812.svga`);
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
    getWidth(item) {
      for (let i = item.nodes.length - 1; i >= 0; i--) {
        if (item.rate >= item.target) {
          return '100'
        } else if (item.rate >= item.nodes[i].target) {
          let c = item.nodes[i + 1].target - item.nodes[i].target
          let t = item.rate - item.nodes[i].target
          let a = (t / c) * 100 / item.nodes.length
          return (25 * i + a) + 3
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
        }
        .msg {
          margin-right: 0.24rem;
          flex: 1;
          .name {
            color: #333333;
            em {
              color: rgba(153, 153, 153, 1);
              font-size: 0.26rem;
              margin-right: 0.1rem;
            }
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
          background: rgba(238, 238, 238, 0.7);
          color: rgba(153, 153, 153, 0.6);
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
          height: 0.08rem;
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
            top: -0.11rem;
            .boxCanvas {
              width: 0.73rem;
              height: 0.7rem;
              position: absolute;
              bottom: -0.1rem;
              left: -0.21rem;
            }
            em {
              display: block;
              color: #999;
              font-size: 0.22rem;
              margin-top: 0.42rem;
              text-align: center;
              opacity: 0.8;
            }
            .giftBox {
              display: block;
              width: 0.61rem;
              height: 0.58rem;
              background: url(../assets/img/giftBox3.png);
              background-size: 100% 100%;
              position: absolute;
              top: -0.2rem;
              right: -0.2rem;
              &.over {
                width: 0.75rem;
                height: 0.54rem;
                background: url(../assets/img/giftBox2.png);
                background-size: 100% 100%;
                top: -0.18rem;
                right: -0.24rem;
              }
            }
            &.act {
              background: url(../assets/img/storeAct.png);
              background-size: 100% 100%;
            }
            &.other {
              background: url(../assets/img/storeAct2.png);
              background-size: 100% 100%;
            }
          }
          .actLiner {
            height: 0.08rem;
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
  display: flex;
  flex-direction: column;
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
    flex: 1;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    -webkit-overflow-scrolling: auto;
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
    width: 6.66rem;
    display: flex;
    justify-content: space-between;
    margin-top: 0.17rem;
    padding-bottom: 0.86rem;
    .giftBg {
      width: 1.5rem;
      height: 1.5rem;
      background: RGBA(240, 238, 239, 1);
      border-radius: 0.1rem;
    }
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


