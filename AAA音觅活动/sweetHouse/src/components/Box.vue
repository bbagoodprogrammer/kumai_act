<template>
  <div class="boxStatus">
    <div class="liner">
      <div class="actLiner"></div>
      <div class="boxItem" v-for="(item,index) in box " :key="index" :class="'box'+index">
        <span class="box" @click="showGiftPup(index)"></span>
        <i class="ligt"></i>
      </div>
    </div>
    <div class="mask" v-show="closePup">
      <transition name="slide">
        <div class="giftBox" v-show="closePup">
          <i class="close" @click="closeGiftPup()"></i>
          <div class="title">清爽值達到XXXX</div>
          <div class="giftItem">
            <span v-for="(item,index) in gift" :key="index">
              <span class="imgBox">
                <img :src="require(`../assets/img/gift/${item.type}.png`)" alt="">
              </span>
              <strong>{{item.name}}</strong>
            </span>
          </div>
          <div class="getBtn" :class="{black:false}"></div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      closePup: false,
      box: {
        1: {
          open: false
        },
        2: {
          open: false
        },
        3: {
          open: false
        },
        4: {
          open: false
        }
      },
      gift: [
        {
          type: 1,
          name: '3000金豆'
        },
        {
          type: 2,
          name: '2000金幣'
        }, {
          type: 3,
          name: '頭像框（5天）'
        }
      ]
    }
  },
  methods: {
    closeGiftPup() {
      this.closePup = false
    },
    showGiftPup(index) {
      this.closePup = true
    }
  }
}
</script>
<style lang="scss">
.boxStatus {
  width: 7.5rem;
  height: 2rem;
  position: absolute;
  top: 0.31rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .liner {
    width: 6.03rem;
    height: 0.33rem;
    background: url(../assets/img/liner.png);
    background-size: 100% 100%;
    position: relative;
    .actLiner {
      width: 100%;
      max-width: 96.5%;
      height: 0.15rem;
      background: url(../assets/img/actLiner.png);
      background-size: auto 100%;
      position: absolute;
      left: 0.1rem;
      top: 0.084rem;
      z-index: 10;
      border-radius: 0.05rem;
    }
    .boxItem {
      width: 1.06rem;
      height: 0.91rem;
      position: absolute;
      z-index: 20;
      top: -0.38rem;
      .box {
        display: block;
        width: 100%;
        height: 100%;
      }
      &.box1 {
        left: 0.53rem;
        .box {
          background: url(../assets/img/box/box1.png);
          background-size: auto 100%;
        }
      }
      &.box2 {
        left: 1.94rem;
        .box {
          background: url(../assets/img/box/box2.png);
          background-size: auto 100%;
        }
      }
      &.box3 {
        left: 3.5rem;
        .box {
          background: url(../assets/img/box/box3.png);
          background-size: auto 100%;
        }
      }
      &.box4 {
        left: 5.06rem;
        .box {
          background: url(../assets/img/box/box4.png);
          background-size: auto 100%;
        }
      }
      .ligt {
        display: block;
        width: 2.07rem;
        height: 1.97rem;
        background: url(../assets/img/box/ligt.png);
        background-size: auto 100%;
        z-index: -1;
        position: absolute;
        left: -0.5rem;
        top: -0.5rem;
      }
    }
  }
  .giftBox {
    width: 5.32rem;
    height: 5.53rem;
    background: url(../assets/img/boxPup.png);
    background-size: 100% 100%;
    position: relative;
    .title {
      height: 0.76rem;
      line-height: 0.76rem;
      text-align: center;
      font-size: 0.34rem;
      color: rgba(41, 182, 255, 1);
      font-weight: 800;
    }
    .giftItem {
      width: 3.65rem;
      // height: 3.82rem;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .imgBox {
        display: block;
        width: 1.52rem;
        height: 1.52rem;
        background: rgba(0, 72, 107, 0.05);
        border-radius: 0.08rem;
        position: relative;
        img {
          width: 1.44rem;
          height: 1.43rem;
        }
      }
      strong {
        display: block;
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: center;
        color: rgba(89, 187, 237, 1);
        font-size: 0.24rem;
      }
    }
    .getBtn {
      width: 1.86rem;
      height: 0.62rem;
      background: url(../assets/img/get.png);
      background-size: 100% 100%;
      margin: 0.03rem auto 0;
      text-align: center;
      line-height: 0.62rem;
      &.black {
        background: url(../assets/img/getBlack.png);
        background-size: 100% 100%;
      }
    }
    .close {
      display: block;
      width: 0.36rem;
      height: 0.37rem;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0.35rem;
      top: 0.3rem;
    }
  }
}
</style>
