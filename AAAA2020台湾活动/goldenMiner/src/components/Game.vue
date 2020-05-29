<template>
  <div class="game">
    <button @click="go()">出勾</button>
    <div class="stoneBox">
      <div id="rope" :style="{transform:`rotate(${deg}deg)`,height:ropeHeight+'px'}">
        <i id="hook"></i>
      </div>
      <div class="giftBox">
        <div class="num" v-show="valueAni">{{scorenum}}</div>
      </div>
      <span v-for="(item,index) in stoneArr" class="stoneItem" :class="'stone' +item.id" :key="index">
      </span>
    </div>
  </div>
</template>
<script>
const step = 25  //绳子移动速度
const hookStep = 20 // 钩子摆动速度
export default {
  data() {
    return {
      deg: -60,
      stoneArr: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
        { id: 10 },
        { id: 11 },
        { id: 12 },
        { id: 13 },
        { id: 14 },
      ],
      timer: null,
      timer2: null,
      ropeHeight: 50,
      distanceArr: [],
      luckIng: false,
      scorenum: 0,
      valueAni: false,
    }
  },
  mounted() {
    this.init()
    this.timerGo()
  },
  methods: {
    init() {
      window.onload = () => {
        this.getStoneEl()
      }
    },
    go() {
      if (this.luckIng) return
      this.luckIng = true
      clearInterval(this.timer)
      let oDiv = document.getElementById('hook')
      let parentNode = oDiv.parentNode
      let partant = document.getElementsByClassName('stoneBox')[0].getBoundingClientRect()
      this.timer2 = setInterval(() => {
        this.distanceArr = []
        this.getStoneEl()
        this.ropeHeight += 10
        let distance = oDiv.getBoundingClientRect()
        var t1 = distance.top;
        var l1 = distance.left;
        var r1 = distance.right;
        var b1 = distance.bottom;
        if (l1 < partant.x - 50 || r1 > partant.width + 50 || t1 > partant.height + 50) { // 邊界判定
          clearInterval(this.timer2)
          this.ropeBack()
        }
        for (var i = 0; i < this.distanceArr.length; i++) {
          if (b1 < this.distanceArr[i].t2 || l1 > this.distanceArr[i].r2 || t1 > this.distanceArr[i].b2 || r1 < this.distanceArr[i].l2) {// 表示没碰上
          } else {
            clearInterval(this.timer2)
            this.distanceArr[i].el.style.background = 'blue';
            this.move(oDiv, this.distanceArr[i])
          }
        }
      }, step)
    },
    getStoneEl() {
      for (let i = 0; i < this.stoneArr.length; i++) {
        let elArr = document.getElementsByClassName(`stone${this.stoneArr[i].id}`)[0]
        if (elArr) {
          let obj = {}
          let distance = elArr.getBoundingClientRect()
          obj.el = elArr
          obj.t2 = distance.top;
          obj.l2 = distance.left;
          obj.r2 = distance.right;
          obj.b2 = distance.bottom;
          obj.index = this.stoneArr[i].id
          this.distanceArr.push(obj)
        }
      }
    },
    move(oDiv, item) {
      var newNode = item.el.cloneNode(true)
      newNode.style.left = item.el.offsetWidth / 4 * -1 + 'px'
      newNode.style.top = 0
      item.el.parentNode.removeChild(item.el)
      oDiv.appendChild(newNode)
      // const elNums = document.getElementsByClassName('giftBox')[0];
      // const landOffset = this.getOffset(item.el);
      // const valueOffset = this.getOffset(elNums);
      // item.el.style.left = valueOffset.left + 'px';
      // item.el.style.top = 0 + 'px';
      // item.el.classList.add('carrotAnim');  //改用定時器跟鉤子同步
      // setTimeout(() => {
      //   item.el.parentNode.removeChild(item.el)
      // }, 500);
      this.ropeBack(item, oDiv, newNode)
    },
    ropeBack(item, oDiv, newNode) {
      let timer = setInterval(() => {
        if (this.ropeHeight > 50) {
          this.ropeHeight -= 10
        } else {
          if (item) {
            for (let i = 0; i < this.distanceArr.length; i++) {
              if (this.distanceArr[i].index == item.index) {
                this.distanceArr.splice(i, 1)
                if (this.distanceArr.length == 0) {
                  //刷新页面
                }
                oDiv.removeChild(newNode)
                this.scorenum = 300
                this.valueAni = true
                setTimeout(() => {
                  this.valueAni = false
                }, 1000)
              }
            }
          }
          this.luckIng = false
          this.timerGo()
          clearInterval(timer)
        }
      }, step)
    },
    timerGo() {
      clearInterval(this.timer)
      var step = -1
      this.timer = setInterval(() => {
        this.deg += step
        if (this.deg == -70) {
          step = 1
        }
        if (this.deg == 70) {
          step = -1
        }
      }, hookStep)
    },
    getOffset(elem) {
      let offsetLeft = elem.offsetLeft;
      let offsetTop = elem.offsetTop;
      let offsetParent = elem.offsetParent;
      while (offsetParent) {
        offsetLeft += offsetParent.offsetLeft;
        offsetTop += offsetParent.offsetTop;
        offsetParent = offsetParent.offsetParent;
      }
      return {
        left: offsetLeft,
        top: offsetTop
      };
    }
  }
}
</script>
<style lang="scss"scoped>
.carrotAnim {
  position: absolute;
  transition: all 0.7s ease;
}
.game {
  width: 7.5rem;
  height: 10rem;
  overflow: hidden;
  position: relative;
  .giftBox {
    width: 0.5rem;
    height: 0.5rem;
    background: red;
    position: absolute;
    left: 4rem;
    .num {
      color: green;
      animation: value 1s linear;
    }
  }
  .stoneBox {
    height: 10rem;
    background: orange;
    position: relative;
    #rope {
      width: 0.1rem;
      height: 1rem;
      background: red;
      transform-origin: top;
      position: absolute;
      left: 4rem;
      #hook {
        display: block;
        width: 0.5rem;
        height: 0.05rem;
        background: green;
        position: absolute;
        bottom: 0;
        left: -0.2rem;
      }
    }
    span {
      display: block;
      width: 1rem;
      height: 1rem;
      background: red;
      border-radius: 50%;
    }
    .stone1 {
      position: absolute;
      top: 2rem;
      left: 0;
    }
    .stone2 {
      position: absolute;
      top: 2rem;
      left: 2rem;
    }
    .stone3 {
      position: absolute;
      top: 2rem;
      left: 4rem;
    }
    .stone4 {
      position: absolute;
      top: 2rem;
      left: 6rem;
    }
    .stone5 {
      position: absolute;
      top: 4rem;
      left: 0rem;
    }
    .stone6 {
      position: absolute;
      top: 4rem;
      left: 2rem;
    }
    .stone7 {
      position: absolute;
      top: 4rem;
      left: 4rem;
    }
    .stone8 {
      position: absolute;
      top: 4rem;
      left: 6rem;
    }
    .stone9 {
      position: absolute;
      top: 6rem;
      left: 0rem;
    }
    .stone10 {
      position: absolute;
      top: 6rem;
      left: 2rem;
    }
    .stone11 {
      position: absolute;
      top: 6rem;
      left: 4rem;
    }
    .stone12 {
      position: absolute;
      top: 8rem;
      left: 6rem;
    }
    .stone13 {
      position: absolute;
      top: 8rem;
      left: 0rem;
    }
    .stone14 {
      position: absolute;
      top: 8rem;
      left: 2rem;
    }
  }
}
@keyframes value {
  100% {
    opacity: 0;
    transform: translateY(-100px);
  }
}
</style>
