<template>
  <div class="rule">
    <div class="tabs">
      <a @click.prevent="mainTab=0" :class="{current:mainTab==0}" class="tab1">BXH Phóng Khoáng</a>
      <a @click.prevent="mainTab=1" :class="{current:mainTab==1}" class="tab2">BXH Nhân Khí</a>
    </div>
    <div class="ruleItem" v-if="mainTab == 0">
      <h5>Thời gian</h5>
      <p>11月12日18:00-11月21日22:00</p>
      <h5>Thể lệ</h5>
      <p>1）Hoạt động cần báo danh, trị số tính sau cuộc thi </p>
      <p>2）BXH phân thành BXH Phóng Khoáng và BXH Nhân Khí</p>
      <p>BXH Phóng Khoáng: xếp hạng dựa vào số xu người dùng tiêu phí Lì Xì và Hộp Quà May Mắn trong thời gian hoạt động, trong phòng Kara mỗi lần phóng tên lửa tăng 1000 điểm</p>
      <p>BXH Nhân Khí: xếp hạng dựa vào mị lực sinh ra từ Lì Xì và Hộp Quà May Mắn trong thời gian hoạt động, trong phòng Kara mỗi lần phóng tên lửa tăng 10000 điểm</p>
      <h5>Ghi chú:</h5>
      <p>1）Phòng Kara không ghi lại số liệu hoạt động</p>
      <p>2）Mỗi người dùng chỉ có thể dùng 1 tài khoản tham gia hoạt động</p>
      <p>Dùng hành vi vi phạm tham gia hoạt động sẽ bị hủy tư cách tham gia, hủy quà hoạt động, khóa tài khoản</p>
    </div>
    <div class="gift" v-else>
      <h5>Thời gian</h5>
      <p>11月12日18:00-11月21日22:00</p>
      <h5>Phần thưởng</h5>
      <p>BXH Phóng Khoáng</p>
      <p>Hạng 1: Huy Chương Phóng Khoáng (30 ngày)+Xe Grand Debut (30 ngày)+Dạ Khúc (2880 xu)+2000 xu</p>
      <p>Hạng 2: Huy Chương Phóng Khoáng (30 ngày)+Xe Grand Debut (30 ngày)+Sao Ước Nguyện (1880 xu)+1500 xu</p>
      <p>Hạng 3: Huy Chương Phóng Khoáng (30 ngày)+Xe Grand Debut (30 ngày)+Mưa Sao Băng (1280 xu)+1000 xu</p>
      <p>Hạng 4-10: Huy Chương Phóng Khoáng (30 ngày)+Xe Grand Debut (30 ngày)+Mưa Bong Bóng (820 xu)+500 xu</p>
      <p class="mt">BXH Nhân Khí (Quà cho chủ phòng và quản lý)</p>
      <p>Hạng 1: 200 xu+2000 đậu+ chủ đề nhân khí phòng 30 ngày</p>
      <p>Hạng 2: 150 xu+1500 đậu+ chủ đề nhân khí phòng 30 ngày</p>
      <p>Hạng 3: 100 xu+1000 đậu+ chủ đề nhân khí phòng 30 ngày</p>
      <p>Hạng 4-10: 50 xu+500 đậu+ chủ đề nhân khí phòng 30 ngày</p>
      <h5>Ghi chú:</h5>
      <p>1. phần thưởng gửi trong vòng 7 ngày sau khi kết thúc cuộc thi.</p>
      <p>Quà có thời hạn 7 ngày, hãy nhanh chóng sử dụng</p>
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
    background: url(../img/tabs.png);
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
        background: url(../img/tabs_act.png);
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
