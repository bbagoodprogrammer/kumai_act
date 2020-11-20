<template>
  <div class="rule">
    <div class="tabs">
      <a @click.prevent="tabClick(0)" :class="{current:tab==0}" href="">Thể lệ</a>
      <a @click.prevent="tabClick(1)" :class="{current:tab==1}" href="">Phần thưởng</a>
    </div>
    <div class="actTime">Thời gian: 12:00 23/11 ~ 22:00 2/12</div>
    <div class="ruleTips" v-show="tab == 0">
      <h5>Thể lệ:</h5>
      <p>1. Cần báo danh tham gia sự kiện, sau khi báo danh mới bắt đầu tính điểm.</p>
      <p>2. BXH chia làm BXH Chuyên Gia và BXH May Mắn</p>
      <p class="rankTips">
        BXH Chuyên Gia: ghi nhận tổng số xu thí sinh đã gửi, chỉ hiện top 100.</br>
        BXH May Mắn: ghi nhận tổng số lì xì thí sinh đã nhận, chỉ hiện top 100.
      </p>
      <h5 class="other">Chú ý:</h5>
      <p>1. Không tính số liệu tặng lì xì ở phòng kara khoá.</p>
      <p>2. Mỗi người chỉ dùng 1 tài khoản tham gia sự kiện.</p>
      <p>3.Nếu phát hiện người dùng có hành vi gian lận, ban tổ chức sẽ xử lý nghiêm khắc, không chỉ loại khỏi sự kiện, thu hồi phần thưởng, nếu nghiêm trọng sẽ khoá tài khoản!</p>
    </div>
    <div class="wardTips" v-show="tab == 1">
      <h5>Phần thưởng:</h5>
      <h6>Phần thưởng BXH Chuyên Gia:</h6>
      <p>Hạng 1: huy chương Lì Xì (30 ngày) + Xe GTR  (30 ngày) + túi quà Siêu Xe Đỏ*1(trị giá 3498 xu) + 1000 xu</p>
      <p>Hạng 2: huy chương Lì Xì (30 ngày) + Xe GTR  (30 ngày) + túi quà Siêu Xe Đỏ*1(trị giá 3498 xu)  + 800 xu</p>
      <p>Hạng 3: huy chương Lì Xì (30 ngày) + Xe GTR  (30 ngày) + túi quà Siêu Xe Đỏ*1(trị giá 3498 xu)  + 600 xu</p>
      <p>Hạng 4~10: huy chương Lì Xì (30 ngày) + túi quà Vua Sân Khấu(trị giá 543 xu)*1+ 300 xu</p>
      <h6>Thưởng BXH May Mắn:</h6>
      <p>Hạng 1: huy chương May Mắn (30 ngày) + Xe GTR  (30 ngày)+ 3 tháng VIP + 5000 đậu</p>
      <p>Hạng 2: huy chương May Mắn (30 ngày) + Xe GTR  (30 ngày)+ 2 tháng VIP + 3000 đậu</p>
      <p>Hạng 3: huy chương May Mắn (30 ngày) + Xe GTR  (30 ngày) + 1 tháng VIP + 2000 đậu</p>
      <p>Hạng 4~10: huy chương May Mắn (30 ngày) + 1000 đậu</p>
    </div>
    <p class="lastTips">Quyết định của ban tổ chức là quyết định cuối cùng</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: 0
    }
  },
  methods: {
    tabClick(val) {
      this.tab = val
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #b13b49;
}
.rule {
  padding: 0.51rem 0.25rem;
  .tabs {
    display: flex;
    width: 7rem;
    height: 0.85rem;
    background: url(../../assets/img/tab.png);
    background-size: 100% 100%;
    margin: 0 auto 0.26rem;
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: 3.5rem;
      height: 0.85rem;
      color: #ae4800;
      font-size: 0.3rem;
      font-weight: bold;
      &.current {
        background: url(../../assets/img/tab1.png);
        background-size: 100% 100%;
      }
    }
  }
  .actTime {
    text-align: center;
    margin: 0.49rem auto 0.45rem;
    color: #faeac5;
  }
  .ruleTips {
    h5 {
      color: #f4cf77;
      font-size: 0.36rem;
      margin-bottom: 0.37rem;
    }
    p {
      font-size: 0.24rem;
      color: #faeac5;
      padding-left: 0.25rem;
      margin-top: 0.2rem;
    }
    .rankTips {
      font-size: 0.22rem;
      color: #f3d4d8;
      padding-left: 0.4rem;
    }
    .other {
      margin-top: 0.97rem;
    }
  }
  .wardTips {
    h5 {
      color: #f4cf77;
      font-size: 0.36rem;
    }
    h6 {
      color: #faeac5;
      font-size: 0.24rem;
      margin-top: 0.45rem;
      padding-left: 0.35rem;
    }
    p {
      color: #f3d4d8;
      font-size: 0.22rem;
      padding-left: 0.5rem;
      margin-top: 0.15rem;
    }
  }
  .lastTips {
    text-align: center;
    color: #faeac5;
    font-size: 0.24rem;
    margin-top: 3.5rem;
  }
}
@import "../../assets/scss/common.scss";
</style>
