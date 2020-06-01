<template>
  <div class="landBox">
    <div class="landTop">
      <div class="pelople" :class="{people2:peopleAni}">
        <div class="tipmsg" v-html="tipsMsg"></div>
      </div>
      <div class="runway">
        <div class="car" :style="{transform:`translateX(${late}px) rotateY(${deg}deg)`}">
          <div class="line" :style="{height:lineHeight + 'px'}">
            <div class="gou" :class="{gouAni:showGouAni}">
              <i :class="'pelople'+peopleIndex"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mineralBox">
      <div class="column" v-for="(item,index) in mineralArr" :key="index" :class="'column'+index">
        <div class="pit" :style="{height:`${item.pitHeight}px`}" v-show="item.pitHeight>0">
          <div class="bottom" v-if="item.cludeOpen!=4">
            <span class="peopleTips" v-if="item.cludeOpen==3">{{lang.gameTips1}}</br>{{lang.gameTips2}}<i></i> </span>
          </div>
        </div>
        <img v-for="(item2,index2) in item.mineralItem" :key="index2" :src="require(`../assets/img/mineral/${item2.type}.png`)" alt="" :class="[{hid:item2.open},'mineral'+item2.type]" class="mineralItem">
      </div>
      <div class="gameTips">
        {{lang.gameTips3}}<em>{{userMsg.chances}}</em>
        <span>{{lang.gameTips4}}</span>
      </div>
    </div>
    <div class="direction">
      <span class="left" @touchstart="goLeft()" @touchend="leftUp()"></span>
      <div class="goBtn" @click="go()">{{lang.go}}</div>
      <span class="right" @touchstart="goRigth()" @touchend="rightUp()"></span>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
import api from "../api/apiConfig"
import { globalBus } from '../utils/eventBus'
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      // type:1-3黃金 4-5石頭 6-7磚石 8 神秘石頭 9礦工
      mineralArr: [
        {
          mineralItem: [
            {
              id: 1,
              type: 1,
              open: 0
            },
            {
              id: 2,
              type: 2,
              open: 0
            },
            {
              id: 3,
              type: 6,
              open: 0
            },
            {
              id: 4,
              type: 6,
              open: 0
            },
            {
              id: 5,
              type: 99,
              open: 0
            },
          ]
        },
        {
          mineralItem: [
            {
              id: 6,
              type: 4,
              open: 0
            },
            {
              id: 7,
              type: 2,
              open: 0
            },
            {
              id: 8,
              type: 3,
              open: 0
            },
            {
              id: 9,
              type: 8,
              open: 0
            },
            {
              id: 10,
              type: 100,
              open: 0
            },
          ]
        },
        {
          mineralItem: [
            {
              id: 11,
              type: 5,
              open: 0
            },
            {
              id: 12,
              type: 1,
              open: 0
            },
            {
              id: 13,
              type: 3,
              open: 0
            },
            {
              id: 14,
              type: 8,
              open: 0
            },
            {
              id: 15,
              type: 101,
              open: 0
            },
          ]
        },
        {
          mineralItem: [
            {
              id: 16,
              type: 1,
              open: 0
            },
            {
              id: 17,
              type: 5,
              open: 0
            },
            {
              id: 18,
              type: 8,
              open: 0
            },
            {
              id: 19,
              type: 7,
              open: 0
            },
            {
              id: 20,
              type: 102,
              open: 0
            },
          ]
        },
        {
          mineralItem: [
            {
              id: 21,
              type: 5,
              open: 0
            },
            {
              id: 22,
              type: 8,
              open: 0
            },
            {
              id: 23,
              type: 2,
              open: 0
            },
            {
              id: 24,
              type: 3,
              open: 0
            },
            {
              id: 25,
              type: 103,
              open: 0
            },
          ]
        },
      ],
      tipMsgArr: [
        'Pilih sekolom mulai!',
        'Masih ada 3 lantai',
        'Kurang 1 lantai~',
        '+Xnilai kekayaan! </br>semangat! ',
        'Ganti lokasi～',
        'Kurang 2 lantai~',
        'Kurang 4 lantai~!'
      ],
      msgIndex: 0,     //人說的說話
      tipsMsg: 'Pilih sekolom mulai!',
      isRotate: true,
      late: 0,
      deg: 0,
      timer: null,
      timer2: null,
      going: false,
      peopleAni: false, //人物動畫
      rangeArr: [],   //每一列的距離對象
      lineHeight: 0,  //線的高度
      mineralItem: 0, // 每個石頭的高度
      showGouAni: false, // 鉤子動作
      peopleIndex: 0,   //拉起來的
      distance: 0, //鉤子到列的距離
      randomTimer: 0,  //隨機走定時器
      timeOver: false,  //一段時間內有無操作
      num: 0, //無操作秒數
      way: 0, //走的步數
      radomScope: 2,
    }
  },
  computed: {
    ...mapState(['my_pool', 'userMsg']),
  },
  watch: {
    my_pool(val) {
      for (var i = 0; i < this.mineralArr.length; i++) {
        this.mineralArr[i].mineralItem = val[i + 1]
        if (this.mineralArr[i].pitHeight) {
          this.mineralArr[i].pitHeight = 0
        }
        if (this.mineralArr[i].cludeOpen) {
          this.mineralArr[i].cludeOpen = -1
        }
      }
      this.init()
    },
  },
  mounted() {
    setInterval(() => {
      this.peopleAni = !this.peopleAni
    }, 500)
    window.onload = () => {
      // this.init()
      this.getRangeArr()
      this.randomWay()
      this.awitOperation()
    }
  },
  methods: {
    init() {
      this.mineralItem = document.getElementsByClassName('mineralItem')[0].getBoundingClientRect()
      this.mineralArr.forEach(el => {
        el.mineralItem.forEach((el2, index2) => {
          {
            if (index2 == 0 && !el2.open) {
              this.$set(el, "cludeOpen", -1)
            } else if (el2.open) {
              var pitHeigth = this.mineralItem.height * (index2 + 1)
              if (pitHeigth >= this.mineralItem.height * 4 + 23) {
                pitHeigth = this.mineralItem.height * 4 + 23
              }
              this.$set(el, "pitHeight", pitHeigth)
              this.$set(el, "cludeOpen", index2)
            }
          }
        })
      })
      this.creatTipsMsg()
    },
    randomWay() {
      let scope = [2, -2]  //shu
      var wayEl = document.getElementsByClassName('runway')[0].getBoundingClientRect()
      var car = document.getElementsByClassName('car')[0].getBoundingClientRect()
      clearInterval(this.randomTimer)
      this.randomTimer = setInterval(() => {
        this.way += 2
        // let randomWay = Math.floor(Math.random() * (200 - 100)) + 100
        if (this.late < 0 || this.late > wayEl.width - car.width + 2) {
          this.way = Math.round(Math.random() * 20)
          this.radomScope *= -1
        } else if (this.way >= 150) {
          this.way = Math.round(Math.random() * 20)
          this.radomScope = scope[Math.round(Math.random() * (scope.length - 1))]
        }
        if (this.radomScope < 0) {
          this.deg = 180
        } else {
          this.deg = 0
        }
        this.late += this.radomScope
      }, 40)
    },
    creatTipsMsg(time) {
      let layerArr = []
      //計算當前最低層數
      this.mineralArr.forEach(element => {
        if ('cludeOpen' in element) {
          layerArr.push(element.cludeOpen)
        }
      })
      //判斷是否挖完
      let isover = true
      layerArr.forEach(element => {
        if (element != 4) {
          isover = false
        }
      });
      if (layerArr.length && isover) {  //挖完
        this.$parent.getDefaultData()
      }
      let nowTips = ''
      if (layerArr.indexOf(3) >= 0) {  //一層
        nowTips = this.tipMsgArr[2]
      } else if (layerArr.indexOf(2) >= 0) {  //兩層
        nowTips = this.tipMsgArr[5]
      } else if (layerArr.indexOf(1) >= 0) {  //三層
        nowTips = this.tipMsgArr[1]
      } else if (layerArr.indexOf(0) >= 0) {//四層
        nowTips = this.tipMsgArr[6]
      }
      if (nowTips != '') {
        setTimeout(() => {
          this.tipsMsg = nowTips
        }, time)
      }
    },
    getRangeArr() {
      for (var i = 0; i < this.mineralArr.length; i++) {
        let elArr = document.getElementsByClassName(`column${i}`)[0].getBoundingClientRect()
        this.rangeArr.push(elArr)
      }
      let gouOfs = document.getElementsByClassName('gou')[0].getBoundingClientRect()
      let columnItem = this.rangeArr[0]
      //計算鉤子到列的距離
      this.distance = columnItem.top - gouOfs.top
    },
    go() {
      globalBus.$emit('commonEvent', (callback) => {
        if (!this.userMsg.registered) {
          this.vxc('setToast', {
            title: this.lang.noGo,
            msg: this.lang.noGoTips2
          })
          return
        }
        if (this.userMsg.chances <= 0) {
          this.vxc('setToast', {
            title: this.lang.noGo,
            msg: this.lang.noGoTips
          })
          return
        }
        if (this.going) return
        this.timeOver = true
        clearInterval(this.randomTimer)
        this.going = true
        let gouOfs = document.getElementsByClassName('gou')[0].getBoundingClientRect()
        //在第幾列下勾
        let cIindex = -1
        this.rangeArr.forEach((element, index) => {
          if (gouOfs.left >= (element.left - gouOfs.width / 2) && gouOfs.right <= (element.right + gouOfs.width / 2)) {
            cIindex = index
          }
        });
        if (cIindex != -1 && !this.mineralArr[cIindex].mineralItem[4].open) {
          api.lottery(cIindex + 1).then(res => {
            const { response_data, response_status } = res.data
            if (response_status.code == 0) {
              var timer = setInterval(() => {
                let pitHeight = this.mineralArr[cIindex].pitHeight || 0
                if (this.lineHeight < pitHeight + this.distance + this.mineralItem.height / 2) {
                  this.lineHeight += 10
                } else {
                  clearInterval(timer)
                  this.showGouAni = true
                  setTimeout(() => {
                    this.showGouAni = false
                    var newHeigth = pitHeight + this.mineralItem.height
                    this.mineralArr[cIindex].cludeOpen += 1
                    if (newHeigth >= this.mineralItem.height * 4 + 23) {
                      newHeigth = this.mineralItem.height * 4 + 23
                      if (!this.mineralArr[cIindex].mineralItem[4].open) {
                        this.peopleIndex = cIindex + 1// 到達最底下帶人上來
                        this.mineralArr[cIindex].mineralItem[4].open = 1
                        var showPup = true
                      }
                    }
                    this.vxc('lotterySuc', response_data.prize)
                    this.$set(this.mineralArr[cIindex], "pitHeight", newHeigth)
                    console.log(this.mineralArr)
                    this.lineBack(3, response_data.prize, showPup)
                  }, 1000)
                }
              }, 25)
            } else {
              this.vxc('setToast', {
                msg: response_status.error
              })
            }
          })
        } else {
          var timer = setInterval(() => {
            if (this.lineHeight < this.mineralItem.height * 4 + this.distance + 15) {
              this.lineHeight += 10
            } else {
              clearInterval(timer)
              this.lineBack(4)
            }
          }, 25)
        }
      })
    },
    lineBack(msgIndex, num, showPup) {
      let timer = setInterval(() => {
        if (this.lineHeight >= 0) {
          this.lineHeight -= 10
        } else {
          if (msgIndex == 3) {
            this.tipsMsg = this.tipMsgArr[msgIndex].replace('X', num)
          } else {
            this.tipsMsg = this.tipMsgArr[msgIndex]
          }
          this.peopleIndex = 0
          clearInterval(timer)
          if (showPup) {
            this.vxc('setToast', {
              title: this.lang.goSuc,
              msg: this.lang.goSucTips.replace('X', num)
            })
          }
          this.creatTipsMsg(1500)
          this.going = false
          this.timeOver = false
          this.num = 0
        }
      }, 25)
    },
    goLeft() {
      if (this.going) return
      this.timeOver = true
      clearInterval(this.randomTimer)
      this.deg = 180
      this.timer2 = setInterval(() => {
        if (this.late > 0) {
          this.late -= 2
        }
      }, 25)
    },
    leftUp() {
      clearInterval(this.timer2)
      this.timeOver = false
      this.num = 0
    },
    goRigth() {
      if (this.going) return
      this.timeOver = true
      clearInterval(this.randomTimer)
      this.deg = 0
      var way = document.getElementsByClassName('runway')[0].getBoundingClientRect()
      var car = document.getElementsByClassName('car')[0].getBoundingClientRect()
      this.timer = setInterval(() => {
        if (this.late < way.width - car.width) {
          this.late += 2
        }
      }, 25)
    },
    rightUp() {
      this.timeOver = false
      this.num = 0
      clearInterval(this.timer)
    },
    awitOperation() {
      setInterval(() => {
        if (this.timeOver == false) {
          this.num++
        } else {
          this.num = 0
        }
        if (this.num == 5) {
          this.num = 0
          this.randomWay()
        }
      }, 1000)
    }
  }
}
</script>
<style lang="scss" scoped>
.landBox {
  // height: 8.03rem;
  .landTop {
    height: 1.82rem;
    padding-right: 0.52rem;
    display: flex;
    .pelople {
      width: 1.08rem;
      height: 1.29rem;
      background: url(../assets/img/people.png);
      background-size: 100% 100%;
      margin: 0.4rem 0 0;
      position: relative;
      .tipmsg {
        width: 2rem;
        font-size: 0.26rem;
        font-weight: 700;
        color: rgba(255, 255, 233, 1);
        -webkit-text-stroke: 0.5px #853b18;
        text-stroke: 0.5px #853b18;
        position: absolute;
        bottom: 1.35rem;
        left: 0.1rem;
      }
      &.people2 {
        background: url(../assets/img/people2.png);
        background-size: 100% 100%;
      }
    }
    .runway {
      flex: 1;
      margin-top: 0.1rem;
      .car {
        width: 1.49rem;
        height: 1.56rem;
        background-image: url(../assets/img/car.png);
        background-size: 100% 100%;
        position: relative;
        z-index: 4;
        .line {
          width: 0.04rem;
          min-height: 0.31rem;
          background-image: url(../assets/img/line.png);
          background-size: 100% 100%;
          position: absolute;
          top: 0.65rem;
          right: 0.0205rem;
          .gou {
            width: 0.44rem;
            height: 0.34rem;
            background-image: url(../assets/img/gou.png);
            background-size: 100% 100%;
            transform-origin: top right;
            position: absolute;
            right: -0.02rem;
            bottom: -0.22rem;
            &.gouAni {
              animation: gouAni 1s linear alternate;
            }
            .pelople1 {
              display: block;
              width: 0.83rem;
              height: 0.87rem;
              background: url(../assets/img/mineral/99.png);
              background-size: 100% 100%;
              position: absolute;
              top: -0.57rem;
              left: -0.35rem;
            }
            .pelople2 {
              display: block;
              width: 0.65rem;
              height: 0.96rem;
              background: url(../assets/img/mineral/100.png);
              background-size: 100% 100%;
              position: absolute;
              top: -0.8rem;
              left: 0rem;
            }
            .pelople3 {
              display: block;
              width: 0.75rem;
              height: 0.82rem;
              background: url(../assets/img/mineral/101.png);
              background-size: 100% 100%;
              position: absolute;
              top: -0.67rem;
              left: -0.2rem;
            }
            .pelople4 {
              display: block;
              width: 0.64rem;
              height: 0.71rem;
              background: url(../assets/img/mineral/102.png);
              background-size: 100% 100%;
              position: absolute;
              top: -0.5rem;
              left: -0.1rem;
            }
            .pelople5 {
              display: block;
              width: 0.51rem;
              height: 0.8rem;
              background: url(../assets/img/mineral/103.png);
              background-size: 100% 100%;
              position: absolute;
              top: -0.65rem;
              left: -0.05rem;
            }
          }
        }
      }
    }
  }
  .mineralBox {
    margin-top: -0.01rem;
    height: 6.02rem;
    background-image: url(../assets/img/mineralBox.png);
    background-size: 100% 100%;
    padding: 0.26rem 0.55rem 0;
    display: flex;
    justify-content: space-between;
    position: relative;
    .column {
      width: 1.06rem;
      position: relative;
      .pit {
        width: 1.22rem;
        left: -0.08rem;
        background: url(../assets/img/pit.png);
        background-size: 100% 100%;
        position: absolute;
        z-index: 3;
        .bottom {
          width: 1.22rem;
          height: 0.26rem;
          background: url(../assets/img/pitBottom.png);
          background-size: 100% 100%;
          position: absolute;
          z-index: 5;
          bottom: -0.26rem;
          .peopleTips {
            text-align: center;
            font-size: 0.24rem;
            color: #fffd93;
            font-weight: 700;
            line-height: 0.25rem;
            position: absolute;
            left: -0.2rem;
            top: -1.5rem;
            text-align: center;
            animation: translateY 1s linear infinite alternate;
            i {
              display: block;
              width: 0.36rem;
              height: 0.46rem;
              background: url(../assets/img/jian.png);
              background-size: 100% 100%;
              margin: 0.1rem auto;
            }
          }
        }
      }
      img {
        width: 1.06rem;
        height: 1.05rem;
        &.hid {
          visibility: hidden;
        }
        &.mineral99 {
          width: 0.83rem;
          height: 0.87rem;
          position: absolute;
          left: 0;
          bottom: 0.23rem;
        }
        &.mineral100 {
          width: 0.65rem;
          height: 0.96rem;
          position: absolute;
          left: -0.42rem;
          bottom: 0.3rem;
        }
        &.mineral101 {
          width: 0.75rem;
          height: 0.82rem;
          position: absolute;
          left: 1.86rem;
          bottom: 0.44rem;
        }
        &.mineral102 {
          width: 0.64rem;
          height: 0.71rem;
          position: absolute;
          left: 1.05rem;
          bottom: 0.18rem;
        }
        &.mineral103 {
          width: 0.51rem;
          height: 0.8rem;
          position: absolute;
          left: 0.31rem;
          bottom: 0.43rem;
        }
      }
    }
    .gameTips {
      width: 4.2rem;
      height: 0.8rem;
      position: absolute;
      left: 1.6rem;
      bottom: 0.3rem;
      text-align: center;
      font-size: 0.24rem;
      color: #fffd93;
      font-weight: 500;
      span {
        display: block;
      }
      em {
        font-weight: 500;
      }
    }
  }
  .direction {
    width: 6.04rem;
    height: 0.83rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    .left {
      width: 0.75rem;
      height: 0.83rem;
      background: url(../assets/img/left.png);
      background-size: 100% 100%;
      animation: heartbeat 2s linear infinite;
    }
    .goBtn {
      width: 2.62rem;
      height: 0.87rem;
      line-height: 0.87rem;
      background: url(../assets/img/go.png);
      background-size: 100% 100%;
      text-align: center;
      font-weight: 900;
      font-size: 0.38rem;
      color: rgba(255, 240, 157, 1);
      -webkit-text-stroke: 1.2px #6d2c06;
      text-stroke: 1.2px #6d2c06;
    }
    .right {
      width: 0.75rem;
      height: 0.83rem;
      background: url(../assets/img/right.png);
      background-size: 100% 100%;
      animation: heartbeat 2s linear infinite;
    }
  }
}
@keyframes gouAni {
  50% {
    right: 0.07rem;
    bottom: -0.27rem;
    transform: rotate(-80deg);
  }
}
@keyframes translateY {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10px);
  }
}
</style>
