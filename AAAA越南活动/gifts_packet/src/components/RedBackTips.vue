<template>
  <div class="redBackTips">
    <div class="tipsCon">
      <div class="tips1">
        <p>1. Tải bản android mới nhất để tặng, giành lì xì ở phòng Kara bất kỳ!</p>
        <img src="../assets/img/t1.png" alt="" class="img1">
        <img src="../assets/img/t2.png" alt="" class="img2">
      </div>
      <div class="tips2">
        <p>2. Loại lì xì không giống nhau ngoài quà tặng còn có hiệu ứng cực ngầu!</p>
        <p>*Thông báo: người dùng đã quan tâm nhau hoặc đã lưu
          phòng Kara có lì xì sẽ nhận ngay thông báo khi gửi lì xì,
          kết nhiều bạn, lưu nhiều phòng Kara sẽ tăng tỷ lệ giành
          được lì xì!</p>
        <img src="../assets/img/t3.png" alt="" class="img3">
        <p>*Tăng thứ tự: Phòng Kara có gửi lì xì sẽ tăng thứ tự trong phòng 10 phút, xếp sau phòng của app và trên phòng livestream, được nhiều người tiếp cận hơn!</p>
        <p>*Tăng lên 500 người: trong vòng 60 phút phòng Kara có sức chứa lên đến 500 người, sau đó sẽ khôi phục lại sức chứa như cũ.</p>
        <p>*Tiêu đề phòng Kara: phòng Kara đang gửi lì xì sẽ có tiêu đề lì xì, có thể vào giành lì xì.</p>
        <img src="../assets/img/t4.png" alt="" class="img4">
      </div>
      <div class="tips3">
        <p>*Dạng lì xì riêng: ngày lễ sẽ có lì xì dành riêng cho ngày lễ.</p>
        <img src="../assets/img/t5.png" alt="" class="img5">
      </div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang= "scss" scoped>
.redBackTips {
  width: 7rem;
  padding-top: 0.2rem;
  margin: 0 auto;
  padding-bottom: 0.52rem;
  .tipsCon {
    .tips1,
    .tips2,
    .tips3 {
      padding: 0.31rem 0.41rem;
      background: rgba(239, 65, 68, 1);
      border: 0.015rem solid rgba(237, 211, 148, 1);
      border-radius: 0.1rem;
      p {
        color: #fab965;
        font-size: 0.24rem;
      }
      .img1 {
        width: 6.16rem;
        height: 6.8rem;
        margin-top: 0.28rem;
      }
      .img2 {
        width: 6.16rem;
        height: 8.28rem;
        margin-top: 0.04rem;
      }
    }
    .tips2 {
      margin-top: 0.46rem;
      p {
        margin-top: 0.27rem;
      }
      p:first-child {
        margin: 0;
      }
      .img3 {
        width: 6.48rem;
        height: 2.11rem;
        margin-top: 0.1rem;
      }
      .img4 {
        width: 6.16rem;
        height: 7.17rem;
        margin-top: 0.2rem;
      }
    }
    .tips3 {
      margin-top: 0.46rem;
      .img5 {
        width: 6.13rem;
        height: 8.25rem;
        margin-top: 0.2rem;
      }
    }
  }
}
</style>
