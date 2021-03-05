<template>
  <div class="ruleList">
    <div class="title">Hướng dẫn</div>
    <h5>Thời gian sự kiện</h5>
    <p>Thời gian sự kiện: 12:00:00 8/3 - 23:59:59 10/3 <br />Sự kiện có 3 vòng, thời gian kết thúc mỗi vòng là 23:59:59 mỗi ngày </p>
    <h5>Quy tắc</h5>
    <p>
      1. Người dùng có thể phát động ghép nhóm hoặc tham gia ghép nhóm, có thể chọn nhóm 2-5 người, nhóm có số người khác nhau, giá khác nhau, người dùng có thể tự chọn số lần phát động ghép nhóm
      <br />
      2. Mỗi 1 người dùng trong mỗi lần ghép nhóm chỉ có thể mua 1 món quà, mỗi người dùng cùng 1 món quà ghép nhóm chưa kết thúc thì không thể mở nhóm mới<br />
      3. Quà ghép nhóm thành công tự động vào túi, có hiệu lực 7 ngày, sẽ có trợ lý nhắc nhở, người dùng hãy chú ý kiểm tra<br />
      4. Ghép nhóm nếu 23:59:59 trong ngày chưa ghép thành công thì sẽ hoàn xu
    </p>
    <h5>Giá ghép nhóm</h5>
    <p>Nếu 1 món quà giá gốc 100 xu, sau khi 2 người ghép thành công thì giá sẽ là 95 xu, sau khi 4 người ghép thành công giá sẽ là 85 xu</p>
    <img src="./img/table.png" alt="">
    <h5>Phần thưởng</h5>
    <p>Danh sách dựa vào số xu người dùng sử dụng sau khi ghép nhóm thành công trong thời gia sự kiện</p>
    <p>Hạng 1: Huy Chương Thần Tượng Ghép Nhóm (30 ngày)+ Danh Thiếp Thủ Lĩnh (30 ngày)+Trang Sức Thủ Lĩnh (30 ngày)+5 Quà Xu Bài Hát Đoàn Viên (100 xu)+ ID đẹp 4-5 số*1</p>
    <p>Hạng 2: Huy Chương Thần Tượng Ghép Nhóm (15 ngày)+ Danh Thiếp Thủ Lĩnh (15 ngày)+Trang Sức Thủ Lĩnh (15 ngày)+4 Quà Xu Bài Hát Đoàn Viên (100 xu)</p>
    <p>Hạng 3: Huy Chương Thần Tượng Ghép Nhóm (7 ngày)+ Danh Thiếp Thủ Lĩnh (7 ngày)+Trang Sức Thủ Lĩnh (7 ngày)+3 Quà Xu Bài Hát Đoàn Viên (100 xu)</p>
    <p>Hạng 4-5: 2 Quà Xu Bài Hát Đoàn Viên (100 xu)</p>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss"
 scoped>
.ruleList {
  padding: 0.6rem 0.25rem 0;
  color: rgba(133, 90, 55, 1);
  .title {
    font-size: 0.36rem;
    text-align: center;
  }
  h5 {
    font-size: 0.32rem;
  }
  p {
    margin: 0.15rem auto 0.3rem;
    font-size: 0.28rem;
    padding-left: 0.65rem;
  }
  img {
    width: 5.64rem;
    height: 4.01rem;
    margin: 0.25rem 0 0.8rem 0.65rem;
  }
}
</style>
