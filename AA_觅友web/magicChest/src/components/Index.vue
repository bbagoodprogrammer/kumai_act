<template>
  <div class="page pageIndex">
    <div class="content">
      <a @click.prevent="openRule()" href class="btn btnRule">{{lang.openRule}}</a>
      <span class="open_task" @click.prevent="openTask()"></span>
      <div class="main">
        <div class="bubble">
          <div
            class="list"
            v-for="(item,index) in taskList"
            :key="index"
            :style="{top:topArr[item.type-1]+'rem',left:leftArr[item.type-1]+'rem'}"
            @click="showCarrotAnim($event,item)"
          >
            <div :class="{unget:item.waitCollect==0}">
              <span
                v-if="item.waitCollect>0&&item.collect!=item.limit"
                :class="{cur:item.waitCollect>0}"
              >+{{item.waitCollect}}</span>
              <span v-if="item.waitCollect==0&&item.collect!=item.limit">+{{item.waitCollect}}</span>
              <span v-if="item.waitCollect==0&&item.collect==item.limit" class="done">{{lang.done}}</span>
              <strong>{{lang.bubbleTips[item.type]}}</strong>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="box" @click.stop="openGift()">
            <div class="svga_hit" v-show="svga_index=='blue1'">
              <svga-preview :url="svgaUrl" ref="child" />
            </div>
            <div class="rewards" v-if="reward_flag">
              <i class="close" @click.stop="closeGift()"></i>
              <p v-html="lang.giftTips"></p>
              <ul>
                <li v-for="(item,index) in giftList" :key="index">
                  <span>
                    <img :src="item.image" alt />
                  </span>
                  <span>{{item.name}}</span>
                  <span v-if="item.isRareGift">{{lang.uncommon}}</span>
                </li>
              </ul>
            </div>
          </div>
          <p class="energy">
            {{lang.energy}}：
            <i id="energy">{{energy}}</i>
          </p>
          <p class="tips">{{lang.openEnergyTips}}</p>
        </div>

        <div class="open_box" @click="openBox()">
          <p>{{lang.openBox}}</p>
          <p>{{energyExchangeOne}}{{lang.energy}}</p>
        </div>
      </div>

      <van-popup v-model="task_show" position="bottom" round :style="{ height: '6.51rem',}">
        <div class="task_box">
          <p>
            <span>{{lang.taskTitle}}</span>
            <span>{{lang.taskTips}}</span>
          </p>
          <ul class="con">
            <li
              v-for="(item,index) in taskList"
              :key="index"
              :class="{li1:item.type==1,li2:item.type==2,li3:item.type==3,li4:item.type==4,done:item.waitCollect==0&&item.collect==item.limit}"
            >
              <span>
                <strong class="icon4"></strong>
                <strong>
                  <em>{{lang.taskListTips[item.type].type}}</em>
                  <i v-html="lang.taskListTips[item.type].unit.replace('%s',item.unit)"></i>
                </strong>
              </span>
              <span class="get" @click="getTaskEnergy(item)" v-if="item.waitCollect>0">
                <i>{{lang.get}}</i>
              </span>
              <span class v-if="item.waitCollect==0">
                <i>{{item.collect}}/{{item.limit}}</i>
              </span>
            </li>
          </ul>
        </div>
      </van-popup>

      <van-popup v-model="rule_show" position="bottom" round :style="{ height: '6.51rem',}">
        <div class="rule_box">
          <p class="title">{{lang.rule}}</p>
          <ol>
            <li v-for="i in lang.rule_li.length" :key="i">
              <i>{{i}}</i>
              <strong v-html="lang.rule_li[i-1]"></strong>
            </li>
          </ol>
          <div class="gift_box">
            <p>{{lang.giftTitle}}</p>
            <p>
              <span>{{lang.giftName}}</span>
              <span>{{lang.giftProbability}}</span>
            </p>
            <ul>
              <li v-for="(item,index) in giftList" :key="index">
                <span>
                  <strong>
                    <img :src="item.image" alt />
                  </strong>
                  <strong>
                    <!-- <em> -->
                      <i>{{item.name}}</i>
                      <i v-if="item.isRareGift">{{lang.uncommon}}</i>
                    <!-- </em> -->
                  </strong>
                </span>
                <span>{{item.chance}}</span>
              </li>
            </ul>
          </div>
        </div>
      </van-popup>

      <div class="box_reward" id="box_reward" v-if="bigReward">
        <p>{{lang.congratulation}}</p>
        <div class="img">
          <img :src="boxInfo.image" alt />
        </div>
        <p>{{boxInfo.name}}</p>
        <div class="sure" @click="closeBox()">{{lang.sure}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { appClose, toast, callApp, getUrlString } from "../utils";
import { svgas } from "../config";
import { getTask, getGift, getEnergy, openBox } from "../apis";
import SvgaPreview from "./SvgaPreview";
// import Loading from "./common/Loading";

const uid = getUrlString("uid");
const token = getUrlString("token");

function aa(m, n) {
  if (m > n) {
    // document.write("你输入的不合理");
  } else {
    var a = [0];
    for (var i = 0; i < m; i++) {
      a[i] = parseInt(Math.random() * n + 1);
      for (var j = 0; j < i; j++) {
        if (a[j] == a[i]) {
          while (1) {
            a[i] = parseInt(Math.random() * n + 1);
            if (a[i] != a[j]) {
              j = -1;
              break;
            }
          }
        }
      }
    }
    return a;
  }
}
// aa(4, 10);
let toparr = [];
function getCor() {
  var arr = [];
  var arr4 = [];
  for (let i = 0; i < 10; i++) {
    arr.push((2.3 + i * 0.1).toFixed(1));
  }
  var len = aa(4, 9);
  for (let i = 0; i < len.length; i++) {
    arr4.push(arr[len[i]]);
  }
  toparr = arr4;
}

getCor();

// const leftarrNum = [".46", "1.56", "2.76", "3.96", "5.16", "6.26"];
const leftarrNum = [".76", "2.26", "3.96", "5.62"];
const leftarrTemp = aa(4, 4);
let leftarr = [];
for (let i = 0; i < leftarrTemp.length; i++) {
  leftarr.push(leftarrNum[leftarrTemp[i] - 1]);
}
// console.log(leftarr);

export default {
  data() {
    return {
      rule_show: false,
      task_show: false,
      reward_flag: false,
      arrs: [],
      taskList: [],
      pastEnergy: 0,
      energy: 0,
      energyExchangeOne: 0,
      giftList: [],
      bigReward: false,
      boxInfo: {},
      topArr: toparr,
      leftArr: leftarr,
      isShowCarrotAnim: true,
      svgaUrl:
        "http://fstatic.cat1314.com/uc/svga/bf4737adeac077bc2cd46a75fd716abf_1614933002.svga",
      svga_index: "blue1"
    };
  },
  computed: {
    ...mapState(["loading"])
  },
  mounted() {
    // this.getLocation();
    // this.$store.dispatch("getUserHammerInfo");
    (async () => {
      const res = await getTask();
      if (res.data) {
        const { response_status, response_data } = res.data;
        if (!response_status.error) {
          this.taskList = response_data.taskList;
          this.energyExchangeOne = response_data.energyExchangeOne;
          this.energy = response_data.energy;
        } else {
          toast(response_status.error.replace(/\[[\s\d]+\]/, ""));
        }
      }
    })();
  },
  methods: {
    appClose,
    NumAutoPlusAnimation(targetEle, options) {
      /*可以自己改造下传入的参数，按照自己的需求和喜好封装该函数*/
      //不传配置就把它绑定在相应html元素的data-xxxx属性上吧
      options = options || {};
      var $this = document.getElementById(targetEle),
        time = options.time || $this.data("time"), //总时间--毫秒为单位
        finalNum = options.num || $this.data("value"), //要显示的真实数值
        regulator = options.regulator || 100, //调速器，改变regulator的数值可以调节数字改变的速度
        step = finalNum / (time / regulator) /*每30ms增加的数值--*/,
        // count = 0, //计数器
        count = options.past, //计数器
        initial = 0;

      var timer = setInterval(function() {
        count = count + step;

        if (count >= finalNum) {
          clearInterval(timer);
          count = finalNum;
        }
        //t未发生改变的话就直接返回
        //避免调用text函数，提高DOM性能
        var t = Math.floor(count);
        if (t == initial) return;
        initial = t;
        $this.innerHTML = initial;
      }, 30);
    },
    async openGift() {
      if (this.giftList.length == 0) {
        const res = await getGift();
        if (res.data) {
          const { response_status, response_data } = res.data;
          if (!response_status.error) {
            this.reward_flag = true;
            this.giftList = response_data.giftList;
            var timer1 = setTimeout(() => {
              this.reward_flag = false;
              clearTimeout(timer1);
            }, 5000);
          } else {
            toast(response_status.error.replace(/\[[\s\d]+\]/, ""));
          }
        }
      } else {
        this.reward_flag = true;
        var timer2 = setTimeout(() => {
          this.reward_flag = false;
          clearTimeout(timer2);
        }, 5000);
      }
    },
    async openRule() {
      if (this.giftList.length == 0) {
        const res = await getGift();
        if (res.data) {
          const { response_status, response_data } = res.data;
          if (!response_status.error) {
            this.giftList = response_data.giftList;
            this.rule_show = !this.rule_show;
          } else {
            toast(response_status.error.replace(/\[[\s\d]+\]/, ""));
          }
        }
      } else {
        this.rule_show = !this.rule_show;
      }
    },
    closeGift() {
      this.reward_flag = false;
    },
    async openTask() {
      const res = await getTask();
      if (res.data) {
        const { response_status, response_data } = res.data;
        if (!response_status.error) {
          this.task_show = !this.task_show;
          this.taskList = response_data.taskList;
        } else {
          toast(response_status.error.replace(/\[[\s\d]+\]/, ""));
        }
      }
    },

    //任务页收集能量
    async getTaskEnergy(obj) {
      const res = await getEnergy(obj.type);
      if (res.data) {
        const { response_status, response_data } = res.data;
        if (!response_status.error) {
          (async () => {
            const res = await getTask();
            if (res.data) {
              const { response_status, response_data } = res.data;
              if (!response_status.error) {
                this.taskList = response_data.taskList;
                // this.energyExchangeOne = response_data.energyExchangeOne;
                // this.energy = response_data.energy;
              } else {
                toast(response_status.error.replace(/\[[\s\d]+\]/, ""));
              }
            }
          })();
          // this.taskList = response_data.taskList;
          this.energy = response_data.energy;
        } else {
          toast(response_status.error.replace(/\[[\s\d]+\]/, ""));
        }
      }
    },

    //收集能量
    async showCarrotAnim(e, obj) {
      // if(!this.isShowCarrotAnim){
      //   return;
      // }
      this.isShowCarrotAnim = false;
      this.pastEnergy = this.energy;
      var htmlFont = parseInt(
        getComputedStyle(window.document.documentElement)["font-size"]
      );
      const div = e.currentTarget;
      var left = div.getBoundingClientRect().left / htmlFont;
      var top = div.getBoundingClientRect().top / htmlFont;
      // div.style.left = 175 + "px";
      // div.style.top = 270 + "px";
      // div.style.opacity = 0;
      // div.style.transition = "all 2s";
      // this.NumAutoPlusAnimation("energy", {
      //     //更新总能量
      //     time: 2000,
      //     num: 100,
      //     regulator: 0,
      //     past: this.pastEnergy,
      //   });
      // return;

      if (obj.waitCollect > 0 && obj.collect != obj.limit) {
        const res = await getEnergy(obj.type);
        if (res.data) {
          const { response_status, response_data } = res.data;
          if (!response_status.error) {
            // console.log(response_data);
            setTimeout(() => {
              div.style.left = 175 + "px";
              div.style.top = 270 + "px";
              div.style.opacity = 0;
              div.style.transition = "all 2s";
              setTimeout(() => {
                this.NumAutoPlusAnimation("energy", {
                  //更新总能量
                  time: 2000,
                  num: parseInt(response_data.energy),
                  // num: 100,
                  regulator: 50,
                  past: this.pastEnergy,
                });
                this.energy = response_data.energy;
                this.isShowCarrotAnim = true;
                // div.style.left = left + "rem";
                // div.style.top = top + "rem";
                // div.style.opacity = 1;
                // div.style.transition = "none";
                (async () => {
                  const res = await getTask();
                  if (res.data) {
                    const { response_status, response_data } = res.data;
                    if (!response_status.error) {
                      this.taskList = response_data.taskList;
                      div.style.left = left + "rem";
                      div.style.top = top + "rem";
                      div.style.opacity = 1;
                      div.style.transition = "none";
                    } else {
                      toast(response_status.error.replace(/\[[\s\d]+\]/, ""));
                    }
                  }
                })();
              }, 2500);
            }, 50);
          } else {
            this.isShowCarrotAnim = true;
            toast(response_status.error.replace(/\[[\s\d]+\]/, ""));
          }
        }
      } else {
        this.isShowCarrotAnim = true;
        this.openTask();
        // if (obj.collect == obj.limit) {
        //   toast(this.lang.clickDone);
        // } else {
        //   toast(this.lang.unGet);
        // }
      }
    },
    async openBox() {
      // this.$refs.child.childMethod();
      // var timer = setTimeout(() => {
      //   this.bigReward = true;
      //   this.energy = 0;
      //   clearTimeout(timer);
      // }, 1500);
      // return;
      // return;
      if (this.energy < this.energyExchangeOne) {
        toast(this.lang.unEnergy);
      } else {
        const res = await openBox();
        if (res.data) {
          const { response_status, response_data } = res.data;
          if (!response_status.error) {
            this.boxInfo.name = response_data.name;
            this.boxInfo.image = response_data.image;
            // this.bigReward = true;
            this.energy = response_data.energy;
            this.$refs.child.childMethod();
            var timer = setTimeout(() => {
              this.bigReward = true;
              this.energy = response_data.energy;
              clearTimeout(timer);
            }, 1500);
          } else {
            toast(response_status.error.replace(/\[[\s\d]+\]/, ""));
          }
        }
      }
    },
    closeBox() {
      this.bigReward = false;
      this.$refs.child.closeEgg();
    }
  },
  components: {
    // Loading
    SvgaPreview
  }
};
</script>

<style lang="scss">
// @import '../css/var';
@mixin pro_bg() {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7.5rem;
  height: 10.08rem;
}

.pageIndex {
  .content {
    width: 7.5rem;
    height: 9.3rem;
    // background: url("../img/bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    box-sizing: border-box;
    .open_task {
      position: absolute;
      text-align: right;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      font-size: 0.32rem;
      font-weight: 800;
      color: #ffffff;
      padding-right: 0.14rem;
      box-sizing: border-box;
      z-index: 1;
    }
    .btn {
      z-index: 2;
      display: inline-block;
      position: absolute;
      text-align: right;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.32rem;
      padding-right: 0.27rem;
      box-sizing: border-box;
    }
    @keyframes bounce-down {
      25% {
        transform: translateY(-3px);
      }
      50%,
      100% {
        transform: translateY(0);
      }
      75% {
        transform: translateY(3px);
      }
    }

    @keyframes bounce-up {
      25% {
        transform: translateY(3px);
      }
      50%,
      100% {
        transform: translateY(0);
      }
      75% {
        transform: translateY(-3px);
      }
    }

    .main {
      width: 7.5rem;
      height: 9.3rem;
      position: relative;
      .bubble {
        .list {
          width: 1.2rem;
          text-align: center;
          position: absolute;
          // animation: bounce-down 1.5s linear infinite;
          transform: scale(1);
          z-index: 1;
          > div {
            &.unget {
              opacity: 0.5;
            }
            span,
            strong {
              display: inline-block;
            }
            span {
              width: 1.2rem;
              height: 1.2rem;
              // line-height: 1.2rem;
              text-align: center;
              background: url("../img/bubble.png");
              background-size: 100% 100%;
              font-size: 0.32rem;
              color: #fff;
              display: flex;
              justify-content: center;
              align-items: center;
              &.cur {
                background-image: url("../img/bubble_get.png");
              }
              &.done {
                font-size: 0.2rem;
                color: rgba(255, 255, 255, 0.3);
              }
            }
            strong {
              font-size: 0.24rem;
              color: #a1c6f2;
              line-height: 1;
            }
          }
        }
        .list:nth-of-type(1) {
          animation: bounce-up 2.5s linear infinite;
        }
        .list:nth-of-type(2) {
          animation: bounce-down 2.5s linear infinite;
        }
        .list:nth-of-type(3) {
          animation: bounce-up 2.5s linear infinite;
        }
        .list:nth-of-type(4) {
          animation: bounce-down 2.5s linear infinite;
        }
      }
      .bottom {
        position: absolute;
        width: 7.5rem;
        top: 3.78rem;
        left: 50%;
        margin-left: -3.75rem;
        text-align: center;
        .box {
          width: 4.3rem;
          height: 4.3rem;
          // background-color: rgba(255, 255, 255, 0.2);
          margin: 0 auto;
          position: relative;
          .svga_hit {
            width: 4.3rem;
            height: 4.3rem;
            position: absolute;
            top: 0;
            left: 0;
          }
          .rewards {
            width: 6.96rem;
            // height: 2.52rem;
            padding-bottom: .3rem;
            background: rgba(0, 0, 0, 0.9);
            position: absolute;
            top: 2rem;
            left: 50%;
            margin-left: -3.48rem;
            z-index: 2;
            border-radius: 0.2rem;
            i {
              width: 0.3rem;
              height: 0.3rem;
              background: url("../img/close.png") center center no-repeat;
              background-size: 100% 100%;
              position: absolute;
              right: 0.18rem;
              top: 0.2rem;
              z-index: 2;
            }
            > p {
              font-size: 0.26rem;
              color: #fff;
              padding: 0.26rem 0 0.1rem 0.21rem;
              text-align: left;
              span {
                color: #f65a6e;
              }
            }
            &.rewards::after {
              content: " ";
              position: absolute;
              width: 0;
              height: 0;
              top: -0.2rem;
              left: 50%;
              margin-left: -0.2rem;
              border-right: 0.2rem solid transparent;
              border-left: 0.2rem solid transparent;
              border-bottom: 0.2rem solid rgba(0, 0, 0, 0.9);
            }
            ul {
              display: flex;
              padding: 0 0.18rem 0 0.21rem;
              // justify-content: space-around;
              li {
                width: 1rem;
                font-size: 0;
                text-align: center;
                margin-right: 0.11rem;
                span:nth-of-type(1) {
                  display: inline-block;
                  width: 1rem;
                  height: 1rem;
                  text-align: center;
                  box-sizing: border-box;
                  // padding-top: 0.3rem;
                  img {
                    width: 1rem;
                    height: 1rem;
                  }
                }
                span:nth-of-type(2) {
                  display: inline-block;
                  width: 1rem;
                  font-size: 0.2rem;
                  line-height: 0.28rem;
                  color: rgba(255, 255, 255, 0.6);
                  margin-bottom: 0.1rem;
                  max-width: 1rem;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                }
                span:nth-of-type(3) {
                  display: inline-block;
                  height: 0.3rem;
                  line-height: 0.3rem;
                  padding: 0 .1rem;
                  text-align: center;
                  background: linear-gradient(90deg, #feae30 0%, #ffdd27 100%);
                  opacity: 1;
                  border-radius: 0.17rem;
                  color: #fff;
                  font-size: 0.2rem;
                }
              }
              li:last-child {
                margin-right: 0;
              }
            }
          }
        }
        .energy {
          font-size: 0.26rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 0.25rem;
          padding: 0.07rem 0 0.17rem 0;
          margin-top: -1.07rem;
        }
        .tips {
          color: rgba(255, 255, 255, 0.3);
          font-size: 0.26rem;
        }
      }
    }
    .open_box {
      width: 5rem;
      height: 0.87rem;
      background: url("../img/btn.png") center center no-repeat;
      background-size: 100% 100%;
      margin: 0.11rem auto 0;
      text-align: center;
      position: absolute;
      bottom: 0.47rem;
      left: 50%;
      margin-left: -2.5rem;
      &:active {
        background: url("../img/btn_ac.png") center center no-repeat;
        background-size: 100% 100%;
      }
      p:nth-of-type(1) {
        font-size: bold;
        color: #fff;
        font-size: 0.32rem;
        padding-top: 0.11rem;
        padding-bottom: 0.05rem;
        transform: skew(-10deg);
        -webkit-transform: skew(-10deg);
      }
      p:nth-of-type(2) {
        font-size: 0.2rem;
        color: rgba(255, 255, 255, 0.6);
        transform: skew(-10deg);
        -webkit-transform: skew(-10deg);
      }
    }
    .van-popup {
      position: absolute;
    }

    .task_box {
      width: 7.5rem;
      height: 6.51rem;
      background: #ffffff;
      border-radius: 0.2rem 0.2rem 0 0;
      > p {
        padding: 0 0.31rem;
        height: 0.9rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span:nth-of-type(1) {
          font-size: 0.32rem;
          font-weight: 800;
          color: #2c2b36;
        }
        span:nth-of-type(2) {
          font-size: 0.26rem;
          color: #8c8995;
        }
      }
      .con {
        li {
          width: 6.88rem;
          height: 1.2rem;
          background-size: 100% 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0 auto;
          box-sizing: border-box;
          padding: 0 0.3rem 0 0rem;
          margin-bottom: 0.11rem;
          &.li1 {
            background-image: url("../img/task_bg1.png");
          }
          &.li2 {
            background-image: url("../img/task_bg2.png");
          }
          &.li3 {
            background-image: url("../img/task_bg3.png");
          }
          &.li4 {
            background-image: url("../img/task_bg4.png");
          }
          &.done {
            opacity: 0.5;
            span:nth-of-type(2) {
              strong:nth-of-type(2) {
                em {
                  color: rgba(255, 255, 255, 0.5);
                }
                i {
                  color: rgba(255, 255, 255, 0.5);
                }
              }
            }
            span:nth-of-type(2) {
              color: rgba(255, 255, 255, 0.5);
            }
          }
          span:nth-of-type(1) {
            display: flex;
            align-items: center;
            strong:nth-of-type(1) {
              display: inline-block;
              width: 1.16rem;
              height: 0.82rem;
            }
            strong:nth-of-type(2) {
              transform: skew(-10deg);
              -webkit-transform: skew(-10deg);
              display: inline-block;
              em,
              i {
                display: block;
              }
              em {
                font-size: 0.32rem;
                font-weight: bold;
                color: #ffffff;
                padding-bottom: 0.11rem;
              }
              i {
                font-size: 0.26rem;
                color: rgba(255, 255, 255, 0.6);
              }
            }
          }
          span:nth-of-type(2) {
            width: 1.04rem;
            height: 0.52rem;
            line-height: 0.52rem;
            text-align: center;
            font-size: 0.26rem;
            color: #ffffff;
            i {
              display: inline-block;
              transform: skew(-10deg);
              -webkit-transform: skew(-10deg);
            }
            &.get {
              background: linear-gradient(0deg, #bce4ff, #f1f1ff);
              border-radius: 0.26rem;
              color: rgba(98, 80, 225, 1);
            }
          }
        }
      }
    }

    .rule_box {
      width: 7.5rem;
      height: 6.21rem;
      overflow: auto;
      background: #ffffff;
      border-radius: 0.2rem 0.2rem 0 0;
      padding: 0rem 0.3rem 0.49rem;
      box-sizing: border-box;
      .title {
        font-size: 0.32rem;
        font-weight: 600;
        line-height: 0.45rem;
        color: #2c2b36;
        padding-bottom: 0.1rem;
      }
      ol {
        li {
          padding-bottom: 0.11rem;
          display: flex;
          flex-wrap: nowrap;
          i {
            box-sizing: border-box;
            margin-top: 0.08rem;
            margin-right: 0.1rem;
            width: 0.3rem;
            height: 0.3rem;
            line-height: 0.3rem;
            font-size: 0.24rem;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            background: url("../img/bg_num.png");
            background-size: 100% 100%;
            color: #fff;
          }
          strong {
            flex: 1;
            font-size: 0.26rem;
            line-height: 0.46rem;
            color: rgba(44, 43, 54, 0.9);
            em {
              color: rgba(114, 88, 254, 1);
            }
          }
        }
      }
      .gift_box {
        margin-top: 0.3rem;
        box-sizing: border-box;
        > p:nth-of-type(1) {
          width: 6.9rem;
          height: 0.88rem;
          line-height: 0.88rem;
          text-align: center;
          background: #524d79;
          opacity: 1;
          border-radius: 0.1rem 0.1rem 0 0;
          color: #fff;
        }
        > p:nth-of-type(2) {
          width: 6.9rem;
          height: 0.88rem;
          line-height: 0.88rem;
          background: #282355;
          opacity: 1;
          display: flex;
          justify-content: space-around;
          align-items: center;
          box-sizing: border-box;
          span {
            box-sizing: border-box;
            font-size: 0.28rem;
            color: #fff;
            width: 50%;
            text-align: center;
          }
          span:nth-of-type(1) {
            box-sizing: border-box;
            // padding-left: 1.17rem;
            // width: 4.39rem;
          }
          span:nth-of-type(2) {
            // width: 2.51rem;
            // text-align: center;
          }
        }
        ul {
          width: 6.9rem;
          margin: 0 auto;
          li {
            box-sizing: border-box;
            background-color: rgba(21, 14, 78, 1);
            width: 6.9rem;
            margin: 0 auto;
            height: 1rem;
            display: flex;
            align-items: center;
            border-bottom: 0.01rem solid rgba(255, 255, 255, 0.1);
            span {
              display: inline-block;
              box-sizing: border-box;
            }
            span:nth-of-type(1) {
              padding-left: 0.94rem;
              position: relative;
              width: 4.39rem;
              display: flex;
              align-items: center;
              img,
              i {
                display: inline-block;
                vertical-align: middle;
              }
              img {
                width: 1rem;
                height: 1rem;
              }
              strong:nth-of-type(1){
                margin-right: .06rem;
              }
              strong{
                // height: 1rem;
                i:nth-of-type(1) {
                  display: block;
                  font-size: 0.26rem;
                  color: #fff;
                  width: 2rem;
                  line-height: .37rem;
                  max-width: 2rem;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                }
                i:nth-of-type(2) {
                  // display: block;
                  // width: 0.61rem;
                  padding: 0 .1rem;
                  text-align: center;
                  height: 0.3rem;
                  line-height: 0.3rem;
                  background: linear-gradient(90deg, #feae30 0%, #ffdd27 100%);
                  border-radius: 0.17rem;
                  font-size: 0.2rem;
                  color: #fff;
                }
              }
            }
            span:nth-of-type(2) {
              // text-align: center;
              font-size: 0.26rem;
              color: #fff;
              width: 2.51rem;
              padding-left: .51rem;
            }
          }
        }
      }
    }
    .rule_box::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 0; /*高宽分别对应横竖滚动条的尺寸*/
      height: 0;
    }
    @keyframes yellow-orange {
      0% {
        background-color: rgba(0, 0, 0, 0);
      }
      100% {
        background-color: rgba(0, 0, 0, 0.8);
      }
    }
    .box_reward {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0);
      border-radius: 0.2rem 0.2rem 0px 0px;
      animation: yellow-orange 0.5s forwards;
      z-index: 3;
      > p:nth-of-type(1) {
        font-size: 0.32rem;
        font-weight: bold;
        line-height: 0.45rem;
        color: #ffffff;
        text-align: center;
        padding: 2.9rem 0 0.6rem 0;
      }
      .img {
        text-align: center;
        img {
          display: inline-block;
          width: 2rem;
          height: 2rem;
        }
      }
      > p:nth-of-type(2) {
        font-size: 0.32rem;
        font-weight: bold;
        line-height: 0.45rem;
        color: #ffffff;
        text-align: center;
        padding: 0.3rem 0 1.2rem 0;
      }
      .sure {
        width: 5rem;
        height: 0.87rem;
        box-sizing: border-box;
        padding-top: 0.23rem;
        background: url("../img/btn.png") center center no-repeat;
        background-size: 100% 100%;
        text-align: center;
        font-size: 0.3rem;
        color: #fff;
        margin: 0 auto;
        position: absolute;
        bottom: 0.47rem;
        left: 50%;
        margin-left: -2.5rem;
      }
    }
  }

  .van-overlay {
    background-color: rgba(0, 0, 0, 0);
  }

  .van-popup--bottom.van-popup--round {
    border-radius: 0.2rem 0.2rem 0 0;
    box-sizing: border-box;
    padding-top: .3rem;
  }

  .close {
    width: 0.6rem;
    height: 0.6rem;
    background: url("../img/btn_close.png") center center no-repeat;
    background-size: 0.2rem 0.2rem;
    position: absolute;
    right: 0.02rem;
    top: 0.02rem;
  }
}
</style>