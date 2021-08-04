<template>
  <div class="rule">
    <i class="close" @click="closeRules()"></i>
    <div class="tips">
      <p>mỗi ngày làm nhiệm vụ nhận nguyên liệu chế biến đồ ngọt (túi quà), nhận Điểm, còn có thể nhận thưởng xu, khung ảnh, xe</p>
      <div class="tabs">
        <span :class="{act:type==1}" @click="tabClick(1)">Thể lệ </span>
        <span :class="{act:type==2}" @click="tabClick(2)">Giai thưởng</span>
      </div>
      <p class="actTime">Thời gian 31/7 12:00 - 6/8 23:59:59</p>
      <div class="tipsCon">
        <div class="tips1" v-if="type==1">
          <h6>Cách chế biến đồ ngọt cho gian hàng của bạn?</h6>
          <p> - Làm nhiệm vụ thu thập nguyên liệu<br />
            - chế biến đồ ngọt (túi quà) nhận ngay Điểm<br />
            - tích Điểm hoàn thành nhiệm vụ<br />
            - nhận thưởng
          </p>
          <p class="blue">* Hoàn thành chế biến đồ ngọt mùa hè sẽ được gửi vào túi quà, có thể dùng túi quà trong phòng tặng người khác. </p>
          <h6>Cách chế biến đồ ngọt cho gian hàng của bạn?</h6>
          <img src="../assets/img/rules/ruleTab2.png" alt="" class="img2">
          <h6>Nhận Điểm như thế nào?</h6>
          <p>chế biến hoàn chỉnh một đồ ngọt nhận Điểm tương ứng</p>
          <img src="../assets/img/rules/ruleTab1.png" alt="" class="img1">
        </div>
        <div class="tips2" v-else>
          <h6>Thưởng nhiệm vụ</h6>
          <img src="../assets/img/rules/ruleTab3.png" alt="" class="img3">
          <h6>Thưởng BXH</h6>
          <img src="../assets/img/rules/ruleTab4.png" alt="" class="img4">
          <h6>Chú ý:</h6>
          <p class="blue">1. Thưởng được phát sau khi sự kiện kết thúc 7 ngày</p>
          <p class="blue">2. Qùa khung ảnh, xe chỉ được phát nếu người dùng sử dụng phiên bản mới nhất. </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      type: 1
    }
  },
  methods: {
    tabClick (val) {
      this.type = val
    },
    closeRules () {
      this.$parent.showRules = false
    }
  }
}
</script>
<style lang="scss">
.rule {
  width: 7.1rem;
  height: 9.6rem;
  background: url(../assets/img/rulesBg.png);
  background-size: 100% 100%;
  padding-top: 1.61rem;
  p {
    font-size: 0.26rem;
    padding-left: 0.3rem;
    color: rgba(233, 140, 86, 1);
  }
  .tips {
    .tabs {
      width: 5.65rem;
      height: 0.73rem;
      display: flex;
      background: url(../assets/img/ruleTabs.png);
      background-size: 100% 100%;
      margin: 0.13rem auto 0;
      span {
        width: 2.99rem;
        height: 0.73rem;
        // color: rgba(40, 146, 199, 1);
        font-size: 0.27rem;
        text-align: center;
        line-height: 0.73rem;
        &.act {
          color: #fff;
          background: url(../assets/img/ruleAct.png);
          background-size: 100% 100%;
        }
      }
    }
    .actTime {
      text-align: center;
      margin: 0.11rem auto;
    }
    .tipsCon {
      height: 6.8rem;
      overflow-y: scroll;
      h6,
      p {
        padding: 0 0.51rem;
      }
    }
    .blue {
      color: rgba(174, 6, 5, 1);
    }
    h6 {
      margin: 0.1rem 0;
      color: rgba(174, 6, 5, 1);
      font-weight: 600;
    }
    .img1 {
      width: 2.98rem;
      height: 2.49rem;
      margin-left: 0.3rem;
    }
    .img2 {
      width: 5.48rem;
      height: 2.48rem;
      margin-left: 0.3rem;
    }
    .img3 {
      width: 5.48rem;
      height: 2.01rem;
      margin-left: 0.3rem;
    }
    .img4 {
      width: 6.26rem;
      height: 4.29rem;
      margin-left: 0.2rem;
    }
  }
  .close {
    display: block;
    width: 0.51rem;
    height: 0.51rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0.34rem;
    top: 1rem;
    z-index: 10;
  }
}
</style>
