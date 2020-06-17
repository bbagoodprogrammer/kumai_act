<template>
  <div class="rule">
    <h1>Thể lệ</h1>
    <p class="time">Thời gian: 18:00 ngày 12/3 - 21:00 ngày 23/3</p>
    <h6>Thể lệ:</h6>
    <p>1. Trong thời gian sự kiện, sau khi báo danh và hoàn thành nhiệm vụ sẽ nhận điểm số tương ứng dùng để đổi lượt lật bài, mỗi người 1 ngày tối đa được lật bài 5 lần, lật 1 lần cần 1000 năng lượng . 0h ngày hôm sau sẽ xoá hết lượt lật bài, mời dùng kịp lúc.</p>
    <p>2. Mỗi lần lật bài sẽ nhận 1 phần thưởng, dùng Thẻ x2 nhận phần thưởng gấp đôi, sau khi lật sẽ tự động gửi phần thưởng.</p>
    <p>3. Thẻ quà nạp bắt đầu tính từ lúc rút trúng, đạt điều kiện sẽ tự động nhận thưởng.</p>
    <h6>Hướng dẫn dùng vật phẩm:</h6>
    <p>1. Thẻ loại bỏ cần nhấn vào để dùng, chọn loại thẻ muốn loại bỏ rồi nhấn lật bài.
      Thẻ x2 sau khi nhấn dùng có thể bắt đầu lật bài.</p>
    <p>2. Toàn bộ vật phẩm phải dùng trong ngày, sáng hôm sau sẽ xoá hết.</p>
    <p>3. Vật phẩm dùng trước khi lật bài chỉ có tác dụng trong 1 lần lật bài.</p>
    <p>4. Mỗi người 1 ngày chỉ được nhận 1 Loại bỏ bài và 1 Thẻ x2</p>
    <h6>Hướng dẫn dùng phần thưởng</h6>
    <p>1. Phần thưởng Túi quà có thời hạn 14 ngày, mời dùng trước khi hết hạn.</p>
    <p>2. Phiếu quà nạp tự động gửi vào Túi, thời hạn 24h, sau khi nạp xu tự động gửi thưởng, mời dùng trước khi hết hạn.</p>
    <p>3. Túi quà phiên bản Android có thể vào Tôi – Túi quà để xem. Khi tặng quà có thể chọn quà từ Túi quà để tặng. Phiên bản iOS mời dùng phiên bản NowKara để xem Túi quà.</p>
    <h5>Phần thưởng có thể nhận</h5>
    <img src="../../assets/img/giftImg.png" alt="">
    <p class="footerMsg">Quyết định của ban tổ chức là quyết định cuối cùng</p>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
body {
  background-color: #af6f4c;
}
.rule {
  padding: 0.6rem 0.37rem;
  h1 {
    font-size: 0.36rem;
    font-weight: 800;
    text-align: center;
  }
  h6 {
    color: #ffe2a5;
    font-weight: 600;
    margin-top: 0.46rem;
  }
  h5 {
    font-size: 0.36rem;
    font-weight: 800;
    text-align: center;
    margin: 0.95rem 0 0.53rem;
  }
  img {
    width: 6.35rem;
    height: 7.04rem;
    margin: 0 auto;
  }
  p {
    font-size: 0.24rem;
    color: #ffe2a5;
    font-weight: 600;
    margin-top: 0.3rem;
    padding-left: 0.25rem;
  }
  .time {
    font-size: 0.24rem;
    font-weight: 600;
    text-align: center;
    margin-top: 0.2rem;
  }
  .footerMsg {
    text-align: center;
    font-size: 80%;
    color: #e8bea6;
    font-weight: 600;
    margin-top: 0.8rem;
  }
  .clearfix:after {
    content: "";
    height: 0;
    line-height: 0;
    display: block;
    visibility: hidden;
    clear: both;
  }
}
@import "../../assets/scss/common.scss";
</style>
