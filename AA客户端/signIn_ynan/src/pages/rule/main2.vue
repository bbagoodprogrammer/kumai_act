<template>
  <div class="rule">
    <div class="header">
      <!-- <i class="black" @click="closeWeb()"></i>簽到規則說明 -->
    </div>
    <div class="tips">
      <h6>Thể lệ:</h6>
      <p>1. Toàn bộ người dùng đều có thể điểm danh</p>
      <p>2. 1 tài khoản mỗi ngày được điểm danh 1 lần và cộng dồn số ngày.</p>
      <p>3. Chu kỳ điểm danh là 7 ngày, khi đủ 7 ngày tự động bắt đầu chu kỳ mới.</p>
      <p>4. Mỗi lần điểm danh sẽ nhận phần thưởng cố định và phần thưởng thêm, thưởng cố định là đậu, thưởng thêm là lật bài (ngày 1 - 6) và mở rương (ngày 7), lật bài và mở rương đều có cơ hội mở ra phần thưởng bất ngờ.</p>
      <p>5. Mỗi ngày điểm danh được lật bài 1 lần, nếu hoàn thành nhiệm vụ chia sẻ nhận thêm 1 lần lật bài, trừ ngày thứ 7 của chu kỳ.</p>
      <p>6. Điểm danh bù chỉ hỗ trợ cho số ngày điểm danh liên tục, không ảnh hưởng đến chu kỳ điểm danh.</p>
      <p>7. Trong thời gian điểm danh, nếu người dùng vi phạm quy định hoặc gian lận (ví dụ gian lận nhận thưởng, vi phạm quy định, dùng tài khoản phụ,...), ban điều hành nếu phát hiện sẽ khoá tài khoản và thu hồi phần thưởng.</p>
      <p>8. Người tham gia điểm danh xem như đồng ý và tuân thủ toàn bộ điều khoản quy định, ban điều hành có quyền điều chỉnh nội dung sự kiện trong phạm vi pháp luật cho phép.</p>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    document.title = `Thể lệ điểm danh`
  },
  methods: {
    closeWeb() {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      try {
        if (isAndroid) {
          window.JSInterface.closeWeb();
        } else {
          closeWeb();
        }
      } catch (e) {

      }
    }
  }
}
</script>

<style lang="scss">
body {
  background: #f2f2f2;
}
.rule {
  .header {
    height: 0.88rem;
    line-height: 0.88rem;
    // background: #fff;
    font-size: 0.36rem;
    text-align: center;
    position: relative;
    color: #111111;
    .black {
      display: block;
      width: 0.18rem;
      height: 0.32rem;
      background: url(../../assets/img/arr.png);
      background-size: 100% 100%;
      position: absolute;
      left: 0.28rem;
      top: 0.28rem;
    }
  }
  .tips {
    padding: 0.3rem;
    h6 {
      color: #111;
      font-size: 0.32rem;
    }
    p {
      font-size: 0.26rem;
      color: #666666;
      margin-top: 0.14rem;
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
