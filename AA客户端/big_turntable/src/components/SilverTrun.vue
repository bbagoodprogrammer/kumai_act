<template>
  <div class="gameBox gold">
    <div class="bg1"></div>
    <div class="bg2" v-show="lampShow"></div>
    <p class="horn"><em>20</em> <i></i> عملات\مرة، لك <em>{{number_of_draws}}</em> فرص لليانصيب </p>
    <div class="start">
      <span class="one" :class="{opt:lucking}" @click="move(1)"></span>
      <span class="ten" :class="{opt:lucking}" @click="move(10)"></span>
      <transition name="slide">
        <span class="oneTips" v-show="showOneTips"></span>
      </transition>
      <transition>
        <span class="tenTips" v-show="showTenTips"></span>
      </transition>
    </div>
    <ul>
      <li v-for=" (item,i) in silverGiftArr" :key="i" :class="['item' + (i+1), {'active': index == i}]">
        <div class="giftMask" v-show="lucking"></div>
        <div class="img1">
          <img :src="getGiftImg(item.gift_id)" alt="">
        </div>
        <!-- <p>+{{item.number}}{{item.prize_name}}</p> -->
      </li>
    </ul>
    <gift-toast v-show="showGiftToast" :giftArr="prize_data" @closeToast="closeToast"></gift-toast>
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToastCom()" v-show="showT"></msg-toast>
    </transition>
    <div class="noB" v-show="showNoB">
      <div class="nBCon">
        <span class="close" @click="closeNoB()"></span>
        <h3>تذكير</h3>
        <p>ليست عملاتك كافية، يمكن استلامها من خلال المهمات. ستغادر الغرفة بعد خيار الذهاب
        </p>
        <span class="goStored" @click="getB()">اذهب للاستلام</span>
      </div>
    </div>
  </div>
</template>
<script>
import GiftToast from "./GiftToast"
import getString from "../utils/getString"
import api from '../api/apiConfig'
import { mapState } from 'vuex'
import MsgToast from "../components/commonToast"
import { trunImg } from "../config/wardImg"
export default {
  name: "Sudoku",
  components: { GiftToast, MsgToast },
  data() {
    return {
      list: [],//奖品图片数组,//奖品列表
      index: 0, // 当前转动到哪个位置，第一次起点位置0,对应页面item1位置
      count: 8, // 总共有多少个位置
      times: 0, // 转动跑格子次数,
      cycle: 15, // 转动基本次数：即至少需要转动多少次再进入抽奖环节
      speed: 10, // 初始转动速度
      lampShow: false,//开始抽奖，灯光闪烁
      timer: 0, // 转动定时器
      lamp: 0, // 灯光定时器
      prize: 0, // 中奖位置，接口返回
      prize_data: [{//中奖信息
        id: Number,//奖品ID
        name: '',//奖品名称
        number: Number,//奖品数量
        image: '',//奖品图片
        type: Number,// 奖品类型
      }],
      lucking: false, //正在抽奖
      lampTimer: 0,
      // lampStep: 700,
      showGiftToast: false,
      showNoB: false,
      showOneTips: false,  //一次抽奖还是十次提示
      showTenTips: false,
      tastMsg: ``,
      showT: false,
      record: {}
    }
  },
  computed: {
    ...mapState(['owner_wallet', 'silverGiftArr']),
    number_of_draws() {
      if (Math.floor(this.owner_wallet.bean / 20) > 999) {
        return `999+`
      } else {
        return Math.floor(this.owner_wallet.bean / 20)
      }
    }
  },
  mounted() {
    //获取奖品列表
    // this.axios.post('/api/luckdraw/prizeList').then(res => {
    //   if (res.status == 1) {
    //     this.list = res.data.list; // 奖品列表数据
    //     this.number_of_draws = res.data.number_of_draws; // 该用户剩余抽奖次数
    //   }
    // })
    // this.lamp = setInterval(() => {//灯光闪烁开启
    //   this.lampShow = !this.lampShow;
    // }, this.lampStep)
  },
  watch: {
    // lampStep(val) {
    //   clearTimeout(this.lamp);
    //   this.lamp = setInterval(() => {//灯光闪烁开启
    //     this.lampShow = !this.lampShow;
    //   }, val)
    // }
  },
  methods: {
    //点击开始抽奖
    move(val) {
      if (this.times != 0) { //正在抽奖中，点击无效
        return
      }
      if ((this.number_of_draws < 1 && val == 1) || (this.number_of_draws < 10 && val == 10)) {
        this.showNoB = true
      } else {
        api.luckDraw(2, val).then(res => {
          if (res.data.response_status.code == 0) {
            this.$store.commit('rudectDou', val * 20);//减去金币数
            this.speed = 50;//每次抽奖速度初始化为200
            this.prize_data = res.data.response_data.gift_list//已经拿到中奖信息，页面展示，等抽奖结束后，将弹窗弹出
            let giftStr = this.prize_data[0].gift_id   //显示第一个礼物位置的索引
            for (let i = 0; i < this.silverGiftArr.length; i++) {
              if (this.silverGiftArr[i].gift_id == giftStr) {
                this.prize = i;//中奖位置赋值，跑马灯最终停留位置，这里实际位置需要-1
              }
            }
            this.record = res.data.response_data.record // //中奖信息
            this.startRoll();//执行抽奖
            // this.lampStep = 60
            this.lucking = true
            if (val == 10) {
              this.showTenTips = true
            } else {
              this.showOneTips = true
            }
          } else {
            this.tastMsg = res.data.response_status.error
            this.showT = true
          }
        })
      }
    },
    // 开始转动
    startRoll() {
      this.times += 1; // 转动次数
      this.oneRoll(); // 转动过程调用的每一次转动方法，这里是第一次调用初始化
      this.usePrize();
    },

    // 每一次转动
    oneRoll() {
      let index = this.index; // 当前转动到哪个位置
      const count = 8; // 总共有多少个位置
      index += 1;
      if (index > count - 1) {
        index = 0;
      }
      this.index = index;
    },
    usePrize() {
      // 如果当前转动次数达到要求 && 目前转到的位置是中奖位置
      if (this.times > this.cycle && this.prize === this.index) {
        let num = 0
        this.lampTimer = setInterval(() => {
          num++
          if (num == 3) {
            clearInterval(this.lampTimer)
            this.lucking = false
            this.showTenTips = false
            this.showOneTips = false
            this.showGiftToast = true
            //抽奖结束添加中奖等弹幕，抽到金币大于0
            // if (this.record.total_coin > 0) {
            this.$store.commit('changUserMsg', this.record)
            // }
            //抽中金币添加
            var beanNum = 0
            this.prize_data.forEach(item => {
              if (item.gift_id == 203) {
                beanNum += 5
              } else if (item.gift_id == 206) {
                beanNum += 40
              } else if (item.gift_id == 207) {
                beanNum += 100
              }
            });
            this.$store.commit('addBean', beanNum)
          }
          if (this.index > 8) {
            this.index = this.prize
          } else {
            this.index = 11
          }
        }, 80);
        clearTimeout(this.timer); // 清除转动定时器
        // this.lampStep = 700
        this.times = 0; // 转动跑格子次数初始化为0，可以开始下次抽奖
        // clearTimeout(this.lamp); // 清除灯光定时器
        // this.lampShow = false; // 白色灯隐藏
        // if (this.prize_data.type == 0) {
        //   console.log('未中奖，谢谢参与');//未中奖提示弹出，
        // } else {
        //   console.log('中奖啦');//中奖弹出提示
        // }
      } else {
        // if (this.times < this.cycle - 12) {
        //   this.speed -= 2; // 加快转动速度
        // } else {
        //   this.speed += 12; // 抽奖即将结束，放慢转动速度
        // }
        this.timer = setTimeout(this.startRoll, this.speed);//开始转动
      }
    },
    getGiftImg(giftId) {
      return trunImg[giftId]
    },
    getB() {
      let regstr = getString('token')
      let uid = getString('uid')
      location.href = `http://act.gosingapp.com/html/task_centered/index.html?uid=${uid}&token=${regstr}`
    },
    closeToast() {
      this.showGiftToast = false
    },
    closeNoB() {
      this.showNoB = false
    },
    closeToastCom() {
      this.showT = false
    }

  },
  destroyed() {
    clearTimeout(this.lamp);
  }
};
</script>
 
 
<style  lang="scss" scoped>
@import "../assets/scss/common.scss";

/**index.wxss**/

/*
 整体布局采用定位实现
 gameBox:父盒子，最外层背景图
 bg1:灰色灯
 bg2:点击开始按钮后，白色灯出现，同时要每个500s同bg1做切换隐藏显示
 start：按钮样式
 item1-8:通过定位方式将dom元素顺时针排列
 active：点击开始开妞后，从1位置开始高亮，类似跑马灯
*/
.gameBox {
  // display: flex;
  // align-items: center;
  // justify-content: center;
  width: 5.56rem;
  height: 5.51rem;
  padding-top: 0.2rem;
  margin: 0.3rem auto 0;
  border-radius: 8px;
  background: url(../assets/img/silverTrunBg.png) no-repeat left top;
  background-size: 100% 100%;
  position: relative;
  .horn {
    margin-top: 0.15rem;
    height: 0.38rem;
    padding: 0 0.3rem;
    text-align: center;
    font-size: 72%;
    display: flex;
    align-items: center;
    justify-content: center;
    em {
      margin: 0 0.05rem 0;
      color: #fff9a0;
    }
    i {
      display: block;
      width: 0.23rem;
      height: 0.23rem;
      background: url(../assets/img/dou.png);
      background-size: 100% 100%;
      margin: 0 0.05rem 0;
    }
  }
  .bg1 {
    position: absolute;
    left: 0.19rem;
    top: 0.785rem;
    width: 5.18rem;
    height: 4.66rem;
    background: url(../assets/img/silverLamp.png) no-repeat center;
    background-size: 100% 100%;
  }
  .bg2 {
    position: absolute;
    left: 0.19rem;
    top: 0.785rem;
    width: 5.18rem;
    height: 4.66rem;
    background: url(../assets/img/silverLamp2.png) no-repeat center;
    background-size: 100% 100%;
  }
  .start {
    width: 1.55rem;
    height: 1.38rem;
    // background: url(../../common/images/home/game4.png) no-repeat center;
    // background-size: 86px 86px;
    position: absolute;
    top: 2.38rem;
    left: 2.01rem;
    .opt {
      opacity: 0.6;
    }
    .one {
      display: block;
      width: 1.58rem;
      height: 0.73rem;
      background: url(../assets/img/GO.png);
      background-size: 100% 100%;
    }
    .ten {
      display: block;
      width: 1.58rem;
      height: 0.73rem;
      background: url(../assets/img/go10.png);
      background-size: 100% 100%;
    }
    .tenTips {
      display: block;
      width: 1.1rem;
      height: 0.75rem;
      background: url(../assets/img/tenTips.png);
      background-size: 100% 100%;
      z-index: 100;
      position: absolute;
      top: 0.37rem;
      left: 0.22rem;
    }
    .oneTips {
      display: block;
      width: 1.1rem;
      height: 0.75rem;
      background: url(../assets/img/oneTips.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.37rem;
      left: 0.22rem;
    }
  }
  ul {
    li {
      position: absolute;
      width: 1.66rem;
      height: 1.49rem;
      // background: rgba(255, 255, 255, 1);
      // border: 2px solid rgba(227, 161, 0, 1);
      // border-radius: 8px;
      .giftMask {
        width: 1.51rem;
        height: 1.36rem;
        margin: 0.069rem;
        position: absolute;
        top: 0;
        left: 0;
        background: url(../assets/img/giftMask.png);
        background-size: 100% 100%;
      }
      .img1 {
        width: 1.66rem;
        height: 1.49rem;
        img {
          width: 1.66rem;
          height: 1.49rem;
        }
      }
      p {
        text-align: center;
        font-size: 13px;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
      }
    }
    .item1 {
      left: 0.35rem;
      top: 0.93rem;
    }
    .item2 {
      left: 1.95rem;
      top: 0.93rem;
    }
    .item3 {
      right: 0.35rem;
      top: 0.93rem;
    }
    .item4 {
      right: 0.35rem;
      top: 2.37rem;
    }
    .item5 {
      right: 0.35rem;
      bottom: 0.4rem;
    }
    .item6 {
      left: 1.95rem;
      bottom: 0.4rem;
    }
    .item7 {
      left: 0.35rem;
      bottom: 0.4rem;
    }
    .item8 {
      left: 0.35rem;
      top: 2.37rem;
    }
    .active {
      // background: #fff2b1;
      .giftMask {
        background: url();
      }
    }
  }
  .noB {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10000;
    .nBCon {
      width: 4.3rem;
      height: 2.92rem;
      padding-bottom: 0.3rem;
      background: rgba(255, 255, 255, 1);
      border-radius: 0.26rem;
      position: absolute;
      top: 2.62rem;
      left: 50%;
      transform: translate(-50%, 0);
      h3 {
        font-size: 120%;
        color: #4d4d4d;
        text-align: center;
        margin-top: 0.46rem;
      }
      p {
        padding: 0 0.3rem;
        color: #4d4d4d;
        font-size: 70%;
        margin-top: 0.24rem;
        text-align: center;
      }
      .goStored {
        display: block;
        margin: 0.38rem auto;
        width: 2.16rem;
        height: 0.72rem;
        text-align: center;
        line-height: 0.6rem;
        background: url(../assets/img/goHtml.png);
        background-size: 100% 100%;
      }
    }
    .close {
      display: block;
      width: 0.41rem;
      height: 0.41rem;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0.11rem;
      top: 0.11rem;
      z-index: 10;
    }
  }
}
</style>