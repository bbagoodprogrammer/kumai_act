<template>
  <div class="singUp" v-show="showSingUp">
    <transition name="slide">
      <div class="sCon" v-if="showSingUp">
        <i class="close" @click="closeSingUp()"></i>
        <div class="house">
          <p class="houseName">Gian hàng đồ ngọt của <em>{{nick}}</em></p>
        </div>
        <div class="tips">
          <h3>đồ ngọt đến</h3>
          <p>Mở gian hàng đồ ngọt, tạo nên những món quà đồ ngọt cho bạn bè, nhận quà đặc biệt đón năm mới.</p>
        </div>
        <div class="gift">
          <span v-for="(item,index) in giftArr" :key="index">
            <img :src="require(`../assets/img/gift/${item.type}.png`)" alt="">
            <strong>{{item.name}}</strong>
          </span>
        </div>
        <div class="singUpBtn" @click="singUp()"></div>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapState } from "vuex"
import api from "../api/apiConfig"
export default {
  data() {
    return {
      giftArr: [{
        type: 4,
        name: 'Khung ảnh'
      },
      {
        type: 5,
        name: 'Xe vào phòng'
      },
      {
        type: 6,
        name: 'xu'
      }]
    }
  },
  computed: {
    ...mapState(['showSingUp', 'nick'])
  },
  methods: {
    singUp() {
      api.singUp().then(res => {
        if (res.data.response_status.code == 0) {
          this.vxc('setReg', true)
          this.vxc('setSingUp')
          this.toast("Gian hàng đồ ngọt của bạn đã được mở! Mau tạo sản phẩm cho gian hàng của bạn.")
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    closeSingUp() {
      this.vxc('setSingUp')
    }
  }
}
</script>
<style lang="scss" scoped>
.singUp {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  .sCon {
    width: 7.1rem;
    height: 9.6rem;
    background: url(../assets/img/singUp/sBg.png);
    background-size: 100% 100%;
    position: relative;
    padding-top: 1.57rem;
    .house {
      width: 6.1rem;
      height: 4.04rem;
      background: url(../assets/img/singUp/house.png);
      background-size: 100% 100%;
      margin: 0 auto;
      padding-top: 0.2rem;
      .houseName {
        width: 3.8rem;
        margin: 0.5rem auto 0;
        text-align: center;
        line-height: 0.6rem;
        font-size: 0.24rem;
        font-weight: 500;
        display: flex;
        justify-content: center;
        em {
          font-size: 0.32rem;
          font-weight: 600;
          display: block;
          max-width: 1.6rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    .tips {
      h3 {
        text-align: center;
        font-size: 0.36rem;
        font-weight: 800;
      }
      p {
        padding: 0 0.64rem;
        font-size: 0.24rem;
        text-align: center;
        em {
          font-size: 0.24rem;
          color: rgba(254, 77, 181, 1);
        }
      }
    }
    .gift {
      padding: 0 0.55rem;
      display: flex;
      justify-content: space-between;
      margin-top: 0.25rem;
      span {
        img {
          width: 1.73rem;
          height: 1.73rem;
          display: block;
        }
        strong {
          display: block;
          text-align: center;
          margin-top: 0.1rem;
        }
      }
    }
    .singUpBtn {
      width: 3.66rem;
      height: 0.86rem;
      background: url(../assets/img/singUp.png);
      background-size: 100% 100%;
      margin: 0.3rem auto 0;
    }
    .close {
      display: block;
      width: 0.51rem;
      height: 0.51rem;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0.34rem;
      top: 1.08rem;
      z-index: 10;
    }
  }
}
</style>
