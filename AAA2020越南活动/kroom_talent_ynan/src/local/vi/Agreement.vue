<template>
  <div class="rule">
    <div class="tabs">
      <a @click.prevent="mainTab=0" :class="{current:mainTab==0}" class="tab1">Thể lệ</a>
      <a @click.prevent="mainTab=1" :class="{current:mainTab==1}" class="tab2">Phần thưởng</a>
    </div>
    <div class="ruleItem" v-if="mainTab == 0">
      <h5>Thời gian</h5>
      <p>18:00 27/1 - 22:00 5/2</p>
      <h5>Thể lệ</h5>
      <p>1）Bắt đầu tính dữ liệu sau khi báo danh sự kiện. </p>
      <p>2）Bảng Thần Tượng Phòng Kara và Bảng Phòng Kara Sôi Nổi</p>
      <p>Bảng Thần Tượng: Xếp hạng theo số xu thí sinh tiêu bằng nổ Lì Xì/ tặng Hộp Quà May Mắn/ chơi Đập Trứng.(Đập trứng cần hoàn thành quá trình đập trứng mới được tính điểm, chỉ mua búa không được tính điểm.)</p>
      <p>Bảng Phòng Kara: Xếp hạng theo điểm mị từ nổ Lì Xì /tặng Hộp Quà May Mắn trong phòng, (Ví dụ nổ lì xì 38 xu, sẽ tính 380 điểm mị, tặng hộp quà may mắn 10 xu, sẽ tính 100 điểm mị), trong phòng mỗi lần nổ tên lửa sẽ tăng 10000 điểm.</p>
      <h5>Ghi chú:</h5>
      <p>1）Dữ liệu trong phòng kara riêng tư sẽ không được tính.</p>
      <p>2）Mỗi người dùng chỉ có thể dùng 1 tài khoản tham gia sự kiện.</p>
      <p>3）Tất cả hành vi vi phạm sẽ bị hủy tư cách tham dự, phần thưởng sự kiện sẽ bị hủy, những tài khoản vi phạm nghiêm trọng sẽ bi khóa.</p>
    </div>
    <div class="gift" v-else>
      <h5>Thời gian</h5>
      <p>18:00 27/1 - 22:00 5/2</p>
      <h5>Phần thưởng</h5>
      <p>Bảng Thần Tượng</p>
      <p>Hạng 1: Huy Chương Thần Tượng Phòng Kara (30 ngày) + Xe Grand Debut (30 ngày) + Dạ Khúc (2880 xu) + 2000 xu</p>
      <p>Hạng 2: Huy Chương Thần Tượng Phòng Kara (30 ngày) + Xe Grand Debut (30 ngày) + Sao Ước Nguyện (1880 xu) + 1500 xu</p>
      <p>Hạng 3: Huy Chương Thần Tượng Phòng Kara (30 ngày) + Xe Grand Debut (30 ngày) + Mưa Sao Băng (1280 xu) + 1000 xu</p>
      <p>Hạng 4-10: Huy Chương Thần Tượng Phòng Kara (30 ngày) + Xe Grand Debut (30 ngày) + Mưa Bong Bóng (820 xu) + 500 xu</p>
      <p class="mt">Bảng Phòng Kara (thưởng cho chủ phòng và quản lý)</p>
      <p>Hạng 1: 200 Xu + 2000 Đậu + Chủ Đề Phòng Sôi Nổi (30 ngày)</p>
      <p>Hạng 2: 150 Xu + 1500 Đậu + Chủ Đề Phòng Sôi Nổi (30 ngày)</p>
      <p>Hạng 3: 100 Xu + 1000 Đậu + Chủ Đề Phòng Sôi Nổi (30 ngày)</p>
      <p>Hạng 4-10: 50 Xu + 500 Đậu + Chủ Đề Phòng Sôi Nổi (30 ngày)</p>
      <h5>Ghi chú:</h5>
      <p>1. Phần thưởng gửi trong vòng 7 ngày sau khi kết thúc sự kiện.</p>
      <p>2. Túi quà có thời hạn 7 ngày, hãy nhanh chóng sử dụng.</p>
    </div>

    <p class="lastTips">Quyết định của ban tổ chức là quyết định cuối cùng.</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mainTab: 0
    }
  }
}
</script>
<style lang="scss" scoped>
body {
  background: rgba(30, 6, 99, 1);
  .mt {
    margin-top: 0.8rem;
  }
  .rule {
    padding-top: 0.38rem;
  }
  .tabs {
    width: 7.5rem;
    height: 0.96rem;
    background: url(../../img/tabs.png);
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      display: block;
      width: 3.78rem;
      height: 0.88rem;
      text-align: center;
      line-height: 0.84rem;
      font-size: 0.36rem;
      color: #fff;
      &.current {
        color: rgba(87, 61, 197, 1);
        height: 1.13rem;
        margin-top: 0.2rem;
        background: url(../../img/tabs_act.png);
        background-size: 100% 100%;
      }
    }
  }
  .ruleItem,
  .gift {
    padding: 0 0.23rem;
  }
  h5 {
    color: rgba(255, 241, 162, 1);
    font-size: 0.28rem;
    font-weight: 600;
    margin: 0.38rem 0 0.2rem;
  }
  p {
    color: rgba(199, 240, 255, 1);
    font-size: 0.24rem;
    margin: 0.15rem 0;
  }
  .lastTips {
    margin-top: 3rem;
    text-align: center;
  }
}
</style>
