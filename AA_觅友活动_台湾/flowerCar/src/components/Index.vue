<template>
  <div class="page pageIndex">
    <div class="herder">
      <div class="ruleTips" @click="$router.push({name:'rule'})">{{lang.ruleTips}}</div>
      <div class="car_box">
        <div class="carRoad">
          <div class="carItem" :class="'car' + showCarsList[showIndex].car">
            <img :src="noImgCar" alt="">
            <div class="userMsg">
              <img v-lazy="nowUserMsg.avatar" alt="">
              <div class="nick">{{nowUserMsg.nick}}</div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <TabsScrollLoadList ref="rank" />
    <Footer />
  </div>
</template>

<script>

import TabsScrollLoadList from "./TabsScrollLoadList"
import Footer from "./Footer"
import { mapState } from "vuex"
export default {
  components: { TabsScrollLoadList, Footer },
  data () {
    return {
      showIndex: 0,
      carImg: [
        require('../img/cars/car1.png'),
        require('../img/cars/car2.png'),
        require('../img/cars/car3.png'),
        require('../img/cars/car4.png'),
        require('../img/cars/car5.png'),
        require('../img/cars/car6.png')
      ]
    }
  },
  created () {
    setInterval(() => {
      if (this.showIndex >= this.showCarsList.length - 1) {
        this.showIndex = 0
      } else {

        this.showIndex += 1
      }

    }, 10000)
  },
  computed: {
    ...mapState(['cars']),
    noImgCar () {
      return this.carImg[this.showCarsList[this.showIndex].car]
    },
    nowUserMsg () {
      return this.showCarsList[this.showIndex]
    },
    showCarsList () {
      let newCar = JSON.parse(JSON.stringify(this.cars))
      for (let i = 0; i < newCar.length; i++) {
        newCar[i]['car'] = this.getRandomImg(newCar[i].type)
      }
      if (newCar.length < 3) {
        for (let i = 0; 3 - newCar.length; i++) {
          newCar.push({
            avatar: '',
            nick: this.lang.noUser,
            car: this.getRandomImg(false)
          })
        }
      }
      console.log(newCar)
      return newCar
    }
  },
  methods: {
    getRandomImg (type) {
      if (type == 'flower') {
        return Math.floor(Math.random() * (2 - 0 + 1)) + 0
      } else if (type == 'popularity') {
        return Math.floor(Math.random() * (5 - 3 + 1)) + 3
      } else {
        return Math.floor(Math.random() * (5 - 0 + 1)) + 0
      }
    }
  }
}
</script>

<style lang="scss">
@keyframes go {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
.pageIndex {
  .herder {
    height: 8.29rem;
    padding-top: 2.5rem;
    position: relative;
    .ruleTips {
      width: 1.64rem;
      height: 0.49rem;
      background: url(../img/ruleImg.png);
      background-size: 100% 100%;
      font-size: 0.26rem;
      text-align: center;
      line-height: 0.49rem;
      position: absolute;
      z-index: 5;
      right: -0.15rem;
      top: 3.01rem;
    }
    .car_box {
      width: 100%;
      .carRoad {
        .carItem {
          width: 7.89rem;
          height: 6.78rem;
          animation: go 10s linear infinite;
          position: relative;
          .userMsg {
            position: absolute;
            top: 3.15rem;
            left: 2.65rem;
            img {
              width: 1.54rem;
              height: 1.54rem;
              border-radius: 50%;
              border: 0.03rem solid #fff;
              box-sizing: border-box;
              margin: 0 auto;
            }
            .nick {
              width: 2.32rem;
              height: 0.56rem;
              background: url(../img/cars/userNick.png);
              background-size: 100% 100%;
              text-align: center;
              line-height: 0.56rem;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              margin-top: -0.12rem;
              position: relative;
              z-index: 3;
            }
          }
          img {
            width: 100%;
            height: 100%;
          }
          &.car0 {
            .userMsg {
              top: 3.3rem;
              left: 4.15rem;
            }
          }
          &.car1 {
            .userMsg {
              top: 2.65rem;
              left: 2rem;
            }
          }
        }
      }
    }
  }
  img {
    display: block;
    width: 100%;
  }
}
</style>