<template>
  <div class="boxStatus">
    <div class="liner">
      <div class="actLiner" :style="{width:actWidth}"></div>
      <div class="boxItem" v-for="(item,index) in packets " :key="index" :class="'box'+(index*1+1)">
        <span class="box" :class="{open:item.got}" @click="showGiftPup(index)"></span>
        <i class="ligt" v-if="score >= item.score && !item.got"></i>
      </div>
    </div>
    <div class="mask" v-show="closePup">
      <transition name="slide">
        <div class="giftBox" v-if="closePup">
          <i class="close" @click="closeGiftPup()"></i>
          <div class="title">Điểm đạt {{packets[showIndex].score}}</div>
          <div class="giftItem">
            <span v-for="(item,index) in gift[showIndex+1].gift" :key="index">
              <span class="imgBox">
                <img :src="require(`../assets/img/gift/${item.type}.png`)" alt="">
              </span>
              <strong>{{item.name}}</strong>
            </span>
          </div>
          <div class="getBtn" :class="{black:packets[showIndex].got,not:this.score<packets[showIndex].score}" @click="openBox(packets[showIndex].got)"></div>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="showOk">
      <transition name="slide">
        <div class="getOk" v-show="showOk">
          <i class="close" @click="closeSharePup()"></i>
          <h3>nhận thưởng thành công</h3>
          <p>Thưởng đã được gửi vào tài khoản, mời kiểm tra</p>
          <div class="boxShare" @click="share()">
            <p class="shareTitle">Chia sẻ</p>
            <p class="msg">(nhận 2 Hạt đa sắc)</p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
import share from "../utils/share"
import api from "../api/apiConfig"
import { globalBus } from '../utils/eventBus'
export default {
  data() {
    return {
      closePup: false,
      gift: {
        1: {
          gift: [
            {
              type: 1,
              name: '300 đậu'
            },
          ]
        },
        2: {
          gift: [
            {
              type: 1,
              name: '600 đậu'
            },
            {
              type: 2,
              name: '500 xu'
            },
          ]
        },
        3: {
          gift: [
            {
              type: 1,
              name: '1000 đậu'
            },
            {
              type: 2,
              name: '800 xu'
            },
          ]
        },
        4: {
          gift: [
            {
              type: 1,
              name: '2000 đậu'
            },
            {
              type: 2,
              name: '2000 xu'
            },
            {
              type: 4,
              name: 'khung ảnh 5 ngày'
            }
          ]
        },
      },
      showOk: false,
      showIndex: 0
    }
  },
  props: ['nick'],
  computed: {
    ...mapState(['packets', 'score', 'uid']),
    actWidth() {
      for (let i = this.packets.length - 1; i >= 0; i--) {
        if (this.score >= this.packets[this.packets.length - 1].score) {
          return '100%'
        } else if (this.score >= this.packets[i].score) {
          let c = this.packets[i + 1].score - this.packets[i].score
          let t = this.score - this.packets[i].score
          let a = (t / c) * 100 / 5
          return (25 * (i + 1) + a - 6.5) + '%'
        } else if (this.score < this.packets[0].score) {
          return this.score / this.packets[0].score / 5 * 100 - 3.5 + '%'
        }
      }
    }
  },
  methods: {
    closeGiftPup() {
      this.closePup = false
    },
    showGiftPup(index) {
      globalBus.$emit('commonEvent', () => {
        this.showIndex = index
        this.closePup = true
      })
    },
    openBox(status) {
      if (!status) {
        if (this.score >= this.packets[this.showIndex].score) {
          api.openBox(this.packets[this.showIndex].score).then(res => {
            if (res.data.response_status.code == 0) {
              this.showOk = true
              this.vxc('openBoxSuc', this.showIndex)
            }
          })
        } else {
          this.toast(`Số điểm không đủ, mau làm nhiệm vụ nhận điểm ~`)
        }
      }
    },
    share() {
      try {
        share({
          from: this.packets[this.showIndex].score,
          url: `http://activity.alochatapp.com/static_html/2020/sweetHouse/index.html?type=${this.packets[this.showIndex].score}&uid=${this.uid}&score=${this.packets[this.showIndex].score}`,
          title: `tạo nhiều đồ ngọt，Điểm ${this.score}`,
          desc: `tạo nhiều đồ ngọt，Điểm ${this.score}`,
          image: 'http://activity.alochatapp.com/static_html/2020/sweetHouse/share.jpg'
        })
      } catch (e) { }
    },
    closeSharePup() {
      this.showOk = false
    }
  }
}
</script>
<style lang="scss">
.boxStatus {
  width: 7.5rem;
  height: 2rem;
  position: absolute;
  bottom: 0.6rem;
  z-index: 100;
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
        left: 0.4rem;
        .box {
          background: url(../assets/img/box/box1.png);
          background-size: auto 100%;
          &.open {
            background: url(../assets/img/box/open1.png);
            background-size: auto 100%;
          }
        }
      }
      &.box2 {
        left: 1.81rem;
        .box {
          background: url(../assets/img/box/box2.png);
          background-size: auto 100%;
          &.open {
            background: url(../assets/img/box/open2.png);
            background-size: auto 100%;
          }
        }
      }
      &.box3 {
        left: 3.37rem;
        .box {
          background: url(../assets/img/box/box3.png);
          background-size: auto 100%;
          &.open {
            background: url(../assets/img/box/open3.png);
            background-size: auto 100%;
          }
        }
      }
      &.box4 {
        left: 4.93rem;
        .box {
          background: url(../assets/img/box/box4.png);
          background-size: auto 100%;
          &.open {
            background: url(../assets/img/box/open4.png);
            background-size: auto 100%;
          }
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
      color: rgba(174, 6, 5, 1);
      font-weight: 800;
    }
    .giftItem {
      width: 3.65rem;
      height: 3.82rem;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-around;
      .imgBox {
        display: block;
        width: 1.52rem;
        height: 1.52rem;
        background: rgba(0, 72, 107, 0.05);
        border-radius: 0.08rem;
        position: relative;
        margin: 0 auto;
        img {
          width: 1.44rem;
          height: 1.43rem;
          display: block;
          margin: 0 auto;
        }
      }
      strong {
        display: block;
        width: 100%;
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: center;
        color: rgba(212, 62, 25, 1);
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
      &.not {
        background: url(../assets/img/getNot.png);
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
  .getOk {
    width: 5.32rem;
    height: 2.89rem;
    background: url(../assets/img/singUpSuc.png);
    background-size: 100% 100%;
    position: relative;
    h3 {
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      font-size: 0.4rem;
      color: rgba(41, 182, 255, 1);
      font-weight: bold;
    }
    > p {
      font-size: 0.24rem;
      color: rgba(89, 187, 237, 1);
      text-align: center;
      height: 1rem;
    }
    .boxShare {
      width: 5.07rem;
      height: 0.75rem;
      // background: url(../assets/img/singUpSucBtn.png);
      // background-size: 100% 100%;
      margin: 0 auto;
      p {
        font-size: 0.24rem;
        color: rgba(227, 245, 255, 1);
        margin: 0;
        text-align: center;
      }
      .shareTitle {
        font-size: 0.32rem;
        color: rgba(227, 245, 255, 1);
        font-weight: 500;
      }
      .msg {
        margin-top: -0.1rem;
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
