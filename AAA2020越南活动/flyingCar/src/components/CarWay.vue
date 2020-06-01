<template>
  <!-- :style="{backgroundPosition:`${x}% 0%`}" v-swipe="onSwipe" :class="{ani:isMove}" -->
  <!-- :class="{scorllX:isMove}" -->
  <div>
    <div class="carMask" v-if="!isMove"></div>
    <div class="carWay scorllX">
      <!-- :style="{transform:`translate(${x}%)`}" -->
      <div class="wayBg">
        <span class="carItem" v-for="(item,index) in carArr " :key="index" :class="'car' + item.id" :style="{left:item.left+'%',bottom:item.bottom}"></span>
        <span id="myCar" :style="{left:carx+'%',bottom:`${carY}`}" :class="'car'+carType">
          <span class="fire" v-if="carType!=1 && !isMove" :style="{'background-position-X':imgPos[imgindex]}"></span>
          <em>
            <img v-lazy="av" alt="" class="av">
            <i>{{userScore}}</i>
          </em>
        </span>
      </div>
    </div>
  </div>

</template>
<script>
import { mapState } from "vuex"
import carList from "../config/cars"
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      x: 0,
      carx: 0,
      carY: '0.4rem',
      carType: 1, //當前車類型
      isMove: false,
      carArr: [
        {
          id: 1,
          scal: 2
        },
        {
          id: 2,
          scal: 2
        },
        {
          id: 3,
          scal: 3
        },
        {
          id: 4,
          scal: 3
        },
        {
          id: 5,
          scal: 4
        },
        {
          id: 6,
          scal: 4
        },
        {
          id: 7,
          scal: 5
        },
        {
          id: 8,
          scal: 5
        }
      ],
      scalArr: {
        1: {
          start: 0,
          end: 5
        },
        2: {
          start: 5,
          end: 20
        },
        3: {
          start: 28,
          end: 40
        },
        4: {
          start: 48,
          end: 60
        },
        5: {
          start: 68,
          end: 85
        },
        6: {
          start: 85,
          end: 100
        }
      },
      maxScal: 0,
      imgindex: 0,
      imgPos: [
        "-0.1rem", "-.35rem", "-.7rem", "-1.05rem"
      ],
    }
  },
  computed: {
    ...mapState(['userScore', 'av']),
    userLv() {
      if (this.userScore >= carList[carList.length - 1].score) {
        let wayWidth = document.querySelector('.wayBg').getBoundingClientRect().width
        let myCarWidth = document.querySelector('#myCar').getBoundingClientRect().width
        let carScal = (myCarWidth / 2) / wayWidth * 100    //車子所佔百分比
        return {
          deviation: 13 - carScal,
          item: carList[carList.length - 1]
        }
      } else {
        for (let i = carList.length - 1; i >= 0; i--) {
          if (this.userScore >= carList[i].score) {
            let deviation = carList[i + 1].score - carList[i].score
            if (this.userScore < 1200) {
              var deviation2 = (this.userScore - carList[i].score) / deviation / 6
            } else {
              var deviation2 = (this.userScore - carList[i].score) / deviation / 6 * 100
            }
            // console.log(carList[i])
            return {
              deviation: deviation2,
              item: carList[i]
            }
          }
        }
      }
    },
    totalWay() {  //總共該走多少距離，單位（百分比） 
      return this.scalArr[this.userLv.item.lv].start + this.userLv.deviation
    }
  },
  watch: {
    totalWay(val) {
      console.log(val)
      this.creatCars()
      this.carMove()
    },
    carx(val) {
      for (let i in this.scalArr) {
        if (val >= this.scalArr[i].start - 2) { //減去車的寬度
          this.carType = i
        }
      }
    }
  },
  mounted() {
    window.onload = () => {
      for (let i = 0; i < this.carArr.length; i++) {
        let carEl = document.getElementsByClassName(`car${this.carArr[i].id}`)[0]
        this.$set(this.carArr[i], "buld", carEl.getBoundingClientRect())
      }
      this.creatCars()
      // this.carMove()
    }
  },
  methods: {
    creatCars() {
      let bottomArr = ['0.13rem', '0.6rem']
      let i = 0
      this.carArr.forEach(element => {
        this.$set(element, "left", this.getleft(element.scal))
        if (i == 2) {
          i = 0
        }
        this.$set(element, "bottom", bottomArr[i])
        i++
      })
      // let ramdomBtm = bottomArr[Math.round(Math.random() * (bottomArr.length - 1))]
      // this.carY = ramdomBtm
    },
    carMove() {
      let clienWidth = document.querySelector('.carWay').getBoundingClientRect().width
      let wayWidth = document.querySelector('.wayBg').getBoundingClientRect().width
      let myCarWidth = document.querySelector('#myCar').getBoundingClientRect().width
      let carScal = (myCarWidth / 2) / wayWidth * 100    //車子所佔百分比
      this.maxScal = 100 - (clienWidth / wayWidth * 100)   //車子能走的最大距離
      let halfScal = (clienWidth / 2) / wayWidth * 100 //半屏距離百分比
      let userCar = this.totalWay - carScal < 0 ? 0 : this.totalWay - carScal  //車子的最終距離
      // console.log(this.totalWay)
      if (userCar > 0) {
        let timer = setInterval(() => {
          if (this.carx >= userCar) {
            clearTimeout(timer)
            this.isMove = true
          }
          this.carx += .5
          //當車走到屏幕中間的時候滾動背景
          if (this.carx >= halfScal) {
            this.x -= .5
          }
          document.documentElement.querySelector('.carWay').scrollTo(-(this.x / 100) * wayWidth, 0)
          this.imgindex++   //尾氣
          if (this.imgindex == 4) {
            this.imgindex = 0
          }
          this.carArr.forEach(element => {
            if (element.buld) {
              let t = (this.carx + carScal) / 100 * wayWidth
              if (t >= element.buld.left - 10 && t < element.buld.left && this.carY == element.bottom) {
                this.carY = '.4rem'
                // setTimeout(() => {
                //   let bottomArr = ['0.13rem', '0.6rem']
                //   let ramdomBtm = bottomArr[Math.round(Math.random() * (bottomArr.length - 1))]
                //   this.carY = ramdomBtm
                // }, 200)
              }
            }
          });
        }, 30)
      } else {
        this.isMove = true
      }
    },
    getleft(item) {
      let start = this.scalArr[item].start
      let end = this.scalArr[item].end
      var num = Math.random() * (end - start + 1) + start
      return num;
    },
  }
}
</script>
<style lang="scss" scoped>
::-webkit-scrollbar {
  display: none;
}
.carWay ::-webkit-scrollbar {
  display: none;
}
.carMask {
  width: 7.5rem;
  height: 7.45rem;
  position: absolute;
  z-index: 10;
  opacity: 0;
}
.carWay {
  width: 7.5rem;
  height: 7.45rem;
  white-space: nowrap;
  position: relative;
  .title {
    width: 5.89rem;
    height: 2.75rem;
    background: url(../assets/img/actTitle.png);
    background-size: 100% 100%;
    position: absolute;
    top: 0.26rem;
    left: 0.81rem;
    z-index: 10;
  }
  &.scorllX {
    overflow-x: scroll;
    overflow-y: hidden;
  }
}

.wayBg {
  width: 27.66rem;
  height: 7.45rem;
  background: url(../assets/img/way.jpg);
  background-size: 100% 100%;
  position: relative;
  #myCar {
    position: absolute;
    bottom: 0.4rem;
    width: 1.5rem;
    height: 0.57rem;
    // background: url(../assets/img/cars/1_1.png);
    // background-size: 100% 100%;
    z-index: 2;
    .fire {
      width: 0.28rem;
      height: 0.26rem;
      background: url(../assets/img/fire.png);
      background-size: auto 100%;
      position: absolute;
      left: 0rem;
      bottom: 0rem;
    }
    em {
      display: block;
      width: 0.92rem;
      height: 1.02rem;
      background: url(../assets/img/av4.png);
      background-size: 100% 100%;
      position: absolute;
      top: -1rem;
      left: 0.4rem;
      .av {
        width: 0.77rem;
        height: 0.77rem;
        border-radius: 50%;
        position: absolute;
        top: 0.05rem;
        left: 0.075rem;
      }
      i {
        display: block;
        width: 100%;
        text-align: center;
        font-size: 0.24rem;
        font-weight: 500;
        position: absolute;
        top: -0.3rem;
      }
    }
    &.car1 {
      background: url(../assets/img/cars/mycar_1.png);
      background-size: 100% 100%;
    }
    &.car2 {
      background: url(../assets/img/cars/mycar_2.png);
      background-size: 100% 100%;
    }
    &.car3 {
      background: url(../assets/img/cars/mycar_3.png);
      background-size: 100% 100%;
    }
    &.car4 {
      background: url(../assets/img/cars/mycar_4.png);
      background-size: 100% 100%;
    }
    &.car5 {
      background: url(../assets/img/cars/mycar_5.png);
      background-size: 100% 100%;
    }
    &.car6 {
      background: url(../assets/img/cars/mycar_6.png);
      background-size: 100% 100%;
    }
  }
  &.ani {
    transition: all 0.6s linear;
  }
  span {
    display: block;
    width: 1.5rem;
    height: 0.57rem;
    position: absolute;
  }
  .car1 {
    background: url(../assets/img/cars/1_1.png);
    background-size: 100% 100%;
    z-index: 3;
  }
  .car2 {
    background: url(../assets/img/cars/1_2.png);
    background-size: 100% 100%;
  }
  .car3 {
    background: url(../assets/img/cars/2_1.png);
    background-size: 100% 100%;
    z-index: 3;
  }
  .car4 {
    background: url(../assets/img/cars/2_2.png);
    background-size: 100% 100%;
  }
  .car5 {
    background: url(../assets/img/cars/3_1.png);
    background-size: 100% 100%;
    z-index: 3;
  }
  .car6 {
    background: url(../assets/img/cars/3_2.png);
    background-size: 100% 100%;
  }
  .car7 {
    background: url(../assets/img/cars/4_1.png);
    background-size: 100% 100%;
    z-index: 3;
  }
  .car8 {
    background: url(../assets/img/cars/4_2.png);
    background-size: 100% 100%;
  }
}
</style>
