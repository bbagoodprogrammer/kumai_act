<template>
  <div class="fragment">
    <div class="title">
      <div class="fNum"><i></i>: {{fragments}}</div>
      <div class="revTips">Giới hạn giờ đổi, lựa chọn quà ấn đổi sẽ được nhận</div>
    </div>
    <div class="revGift">
      <span class="gift1">
        <em class="getBtn" @click="getGift(31,1)"></em>
      </span>
      <span class="gift2">
        <em class="getBtn" @click="getGift(32,270)"></em>
      </span>
      <span class="gift3"></span>
    </div>
    <p class="tips">Trong thời gian sự kiện mỗi lần nhận được hoặc tặng 1 quà Tiệc đêm, nhận ngay 1 lần khung ảnh</p>
  </div>
</template>
<script>
import { mapState } from "vuex"
import api from "../api/apiConfig"
export default {
  computed: {
    ...mapState(['fragments'])
  },
  methods: {
    getGift(pid, fnum) {
      console.log(this.fragments, fnum)
      if (this.fragments >= fnum) {
        api.getGift(pid).then(res => {
          if (res.data.response_status.code == 0) {
            this.vxc('setToast', {
              title: 'Đổi thành công',
              msg: pid == 31 ? 'Nhận  Kẹo que*10, Vào túi quà để kiểm tra' : 'Nhận Tiệc đêm *1, mời vào túi quà sử dụng'
            })
            this.vxc('reduxFragments', fnum)
          } else {
            this.vxc('setToast', {
              msg: res.data.response_status.error
            })
          }
        })
      } else {
        this.vxc('setToast', {
          title: 'Đổi thất bại',
          msg: 'Miếng ghép không đủ'
        })
      }
    }
  }
}
</script>
<style lang="scss">
.fragment {
  width: 7.03rem;
  height: 4.07rem;
  padding-top: 0.98rem;
  background: url(../assets/img/fragmentBg.png);
  background-size: 100% 100%;
  margin: 0.52rem auto;
  .title {
    height: 0.54rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.3rem;
    .fNum {
      margin-left: 0.22rem;
      i {
        vertical-align: bottom;
        display: inline-block;
        width: 0.35rem;
        height: 0.35rem;
        background: url(../assets/img/fragmentIcon.png);
        background-size: 100% 100%;
      }
    }
    .revTips {
      width: 5.21rem;
      height: 0.54rem;
      background: rgba(81, 24, 195, 1);
      border-radius: 0.27rem;
      font-size: 0.24rem;
      text-align: center;
      line-height: 0.54rem;
    }
  }
  .revGift {
    margin-top: 0.26rem;
    padding: 0 0.28rem 0 0.62rem;
    display: flex;
    span {
      width: 2.16rem;
      height: 2.03rem;
      position: relative;
      &.gift1 {
        background: url(../assets/img/gift1.png);
        background-size: 100% 100%;
      }
      &.gift2 {
        background: url(../assets/img/gift2.png);
        background-size: 100% 100%;
      }
      &.gift3 {
        background: url(../assets/img/gift3.png);
        background-size: 100% 100%;
      }
      .getBtn {
        width: 0.9rem;
        height: 0.37rem;
        position: absolute;
        bottom: 0;
        left: 0.4rem;
      }
    }
    span:last-child {
      margin-left: -0.39rem;
    }
  }
  .tips {
    margin: 0.4rem auto 0;
    font-size: 0.22rem;
    text-align: center;
  }
}
</style>
