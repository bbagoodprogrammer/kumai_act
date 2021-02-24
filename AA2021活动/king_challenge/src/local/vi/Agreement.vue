<template>
  <div class="rule">
    <div class="tabs">
      <a @click.prevent="mainTab=0" :class="{current:mainTab==0}" class="tab1">Quy tắc</a>
      <a @click.prevent="mainTab=1" :class="{current:mainTab==1}" class="tab2">Phần thưởng</a>
    </div>
    <div class="ruleItem" v-if="mainTab == 0">
      <h5>Thời gian sự kiện</h5>
      <p>12:00 25/2 - 22:00 6/3</p>
      <h5>Điểm danh vương giả</h5>
      <p>1, Người dùng sau khi báo danh mới có thể tham gia sự kiện, mới bắt đầu tích lũy điểm sự kiện.</p>
      <p>2, Trong thời gian sự kiện, mỗi ngày hoàn thành nhiệm vụ phòng Kara tương ứng, có thể điểm danh thành công (Nhiệm vụ ngày chỉ có giá trị hoàn thành trong ngày).</p>
      <p>3, Điểm danh mỗi ngày thành công có thể nhận được phần thưởng tương ứng, hoàn thành điểm danh liên tiếp 3 ngày/ 7 ngày/ 10 ngày càng có quà khủng.</p>
      <h5>Bảng thách đấu</h5>
      <p>1. Xếp hạng dựa vào điểm mị quà xu người dùng nhận được dưới chế độ PK 1v1/ PK Võ Đài/ Thách đấu quà tặng/ Hát Karaoke / Hóng hớt.</p>
      <p>2. Đạt được xếp hạng điểm mị xu tương ứng, có thể nhận được rương thách đấu tương .：</p>
      <img src="./img/table1.png" alt="" class="table1">
      <h5>Bảng phòng hát</h5>
      <p>1, Xếp hạng theo thời gian sự kiện điểm mị xu tiêu trong phòng Kara dưới chế độ PK 1v1/ PK Võ Đài/ Thách đấu quà tặng/ Hát Karaoke / Hóng hớt trong thời gian sự kiện.</p>
      <p>2, Thách đấu phòng: Trong thời gian sự kiện, phòng Kara nhận được 10000 điểm mị xu có thể nhận được Khung phòng thách đấu vương giả (7 ngày)</p>
      <h5>Chú thích</h5>
      <p>1. Trong thời gian sự kiện nếu có hành vi gian lận điểm, sẽ hủy bỏ phần thưởng và tư cách tham gia, nếu nghiêm trọng sẽ khóa tài khoản.</p>
      <p>2. Mỗi thiết bị chỉ có thể dùng 1 tài khoản tham gia sự kiện.</p>
      <p>3. Phần thưởng xếp hạn cần nhận thủ công, sự kiện kết thúc nếu chưa nhận sẽ bị hủy, phần thưởng bảng đơn sẽ phát trong vòng 7 ngày sau khi sự kiện kết thúc, phần thưởng do hệ thống phát tự động.</p>
      <p>4. Tất cả số liệu phòng kara riêng sẽ không được tính. </p>
    </div>
    <div class="gift" v-else>
      <h5>Thời gian sự kiện</h5>
      <p>12:00 25/2 - 22:00 6/3</p>
      <h5>Điểm danh vương giả</h5>
      <img src="./img/table2.png" alt="" class="table2">
      <h5>Bảng thách đấu</h5>
      <p>Hạng 1: Huy chương Thách Đấu Vương Giả (30 ngày) + Trang sức Thách Đấu Vương Giả (30 ngày) + Thuyền Ngọc Tiên (30 ngày) + Quà đặc hiệu Dạ Khúc (2880 xu) + 2000 xu + 5000 đậu</p>
      <p>Hạng 2: Huy chương Thách Đấu Vương Giả (30 ngày) + Trang sức thách đấu vương giả (30 ngày) + Thuyền Ngọc Tiên (30 ngày) + Quà đặc hiệu Sao Ước Nguyện (1880 xu) + 1500 xu + 3000 đậu </p>
      <p>Hạng 3: Huy chương Thách Đấu Vương Giả (30 ngày) + Trang sức thách đấu vương giả (30 ngày) + Thuyền Ngọc Tiên (30 ngày) + Quà đặc hiệu Sao Ước Nguyện (1880 xu) + 1000 xu + 2000 đậu</p>
      <p>Hạng 4~Hạng 10: Huy chương Thách Đấu Vương Giả (30 ngày) + Trang sức Thách Đấu Vương Giả (30 ngày) + Thuyền Ngọc Tiên (30 ngày) + Quà đặc hiệu Mưa Bong Bóng (820 xu) + 500 xu + 1000 đậu</p>
      <h5>Bảng phòng hát (Phần thưởng cho chủ phòng và quản lí)</h5>
      <p>Hạng 1: 200 xu + 2000 đậu + Chủ đề Thách Đấu Vương Giả (30 ngày)</p>
      <p>Hạng 2: 150 xu + 1500 đậu + Chủ đề Thách Đấu Vương Giả (30 ngày)</p>
      <p>Hạng 3: 100 xu + 1000 đậu + Chủ đề Thách Đấu Vương Giả (30 ngày)</p>
      <p>Hạng 4-10: 50 xu + 500 đậu + Chủ đề Thách Đấu Vương Giả (30 ngày)</p>
      <h5>Chú thích: </h5>
      <p>1. Tất cả túi quà có thời hạn 7 ngày</p>
      <p>2. Phần thưởng trang sức có thể xem tại Tôi - Cửa hàng.</p>
      <p>3. Phần thưởng xếp hạng cần nhận thủ công, sự kiện kết thúc nếu chưa nhận sẽ bị hủy, phần thưởng bảng đơn sẽ phát trong vòng 7 ngày sau khi sự kiện kết thúc, phần thưởng do hệ thống phát tự động.</p>
    </div>

    <p class="lastTips">Quyền giải thích cuối cùng thuộc về ban tổ chức</p>
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
    height: 0.96rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.8rem;
    a {
      display: block;
      width: 2.66rem;
      height: 0.78rem;
      text-align: center;
      line-height: 0.78rem;
      font-size: 0.36rem;
      color: rgba(83, 43, 35, 1);
      background: url(../../img/tabs_not_act.png);
      background-size: 100% 100%;
      &.current {
        background: url(../../img/tabs_act.png);
        background-size: 100% 100%;
      }
    }
  }
  .table1,
  .table2 {
    width: 6.96rem;
    height: 4.82rem;
  }
  .ruleItem,
  .gift {
    padding: 0 0.23rem;
  }
  h5 {
    color: rgba(67, 47, 23, 0.8);
    font-size: 0.28rem;
    font-weight: 600;
    margin: 0.38rem 0 0.2rem;
  }
  p {
    color: rgba(67, 47, 23, 0.8);
    font-size: 0.24rem;
    margin: 0.15rem 0;
    padding-left: 0.6rem;
  }
  .lastTips {
    margin-top: 3rem;
    text-align: center;
  }
}
</style>
