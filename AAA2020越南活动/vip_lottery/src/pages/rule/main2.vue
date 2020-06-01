<template>
  <div class="rule">
    <h1>Thể lệ</h1>
    <h6>Thời gian</h6>
    <p>{{timeStr}}</p>
    <h6>Thể lệ báo danh</h6>
    <p>1. Toàn bộ người dùng đều có thể báo danh, không thể báo danh nhiều lần. Những tài khoản cùng máy và địa chỉ chỉ được báo danh 1 lần. Người dùng đã mua hội viên trước đó sẽ thấy số lượt cào tự mình. Người dùng chưa mua hội viên sẽ thấy số lượt cào tự mình sau khi mua hội viên và vào lại trang sự kiện này.</p>
    <h6>Thể lệ sự kiện</h6>
    <p>1. Trong thời gian sự kiện, sau khi báo danh và cập nhật cấp hội viên sẽ nhận lượt cào và bắt đầu cào thưởng. Những phần thưởng khác sẽ được phát ngay sau khi cào. Túi quà được gửi vào Túi, điểm hội viên được cộng thẳng vào cấp hội viên của người dùng, xu và đậu được gửi vào Ví tiền. </p>
    <p>2. Trong thời gian sự kiện nếu dùng hết lượt cào, có thể mua hội viên để nhận thêm lượt. Mua thời hạn hội viên khác nhau sẽ được tặng số lượt cào khác nhau.</p>
    <p>3. Hiện nay, chỉ có người dùng trên bản android 6.6.8.686 sẽ có cơ hội cào trúng Nhiệm vụ bí ẩn. Toàn bộ người dùng đều có thể hỗ trợ hoàn thành Nhiệm vụ bí ẩn nếu được mời. Khi hoàn thành mỗi nhiệm vụ bí ẩn, người mời sẽ nhận thưởng 20 xu, đồng thời mã mời sẽ vô hiệu. Toàn bộ chi tiết nhiệm vụ bí ẩn sẽ hiện trọng nút Nhiệm vụ bí ẩn. </p>
    <p>4. Mỗi nhiệm vụ bí ẩn cần 1 người dùng mới đăng ký sau khi sự kiện bắt đầu hỗ trợ, mỗi tài khoản cùng máy và địa chỉ chỉ được hỗ trợ 1 lần, người được mới sẽ có 1 phần quà hỗ trợ sau khi hỗ trợ thành công. Người dùng cào trúng Nhiệm vụ bí ẩn cần hoàn thành mỗi nhiệm vụ theo hướng dẫn mới có thể nhận quà, mỗi mã mời có hiệu lực 3 ngày.</p>
    <h6>Thể lệ lượt cào</h6>
    <p>1. Trong thời gian sự kiện, người dùng hội viên đã báo danh vào 0h mỗi ngày sẽ nhận lượt cào miễn phí như bảng dưới. Trong ngày, nếu tăng cấp hội viên sau khi đã nhận lượt cào (bất kể tăng cấp bằng cách nào) đều sẽ không nhận thêm lượt cào miễn phí.</p>
    <p>2. Trong thời gian sự kiện, toàn bộ lượt cào nhận được (bao gồm miễn phí và gia hạn hội viên nhận được) đều chỉ có hiệu lực trong ngày, toàn bộ lượt cào chưa dùng đều xoá hết vào 0h sáng ngày hôm sau. Mời chú ý dùng hết.</p>
    <img src="../../assets/img/taskImg.png" alt="">
    <p class="last2Tips">Trong thời gian sự kiện mỗi ngày tự động gửi Toàn bộ số lượt xoá hết vào 0h</p>
    <p class="lastTips">Quyết định của ban tổ chức là quyết định cuối cùng</p>
  </div>
</template>

<script>
import getDate from "../../utils/getDate"
export default {
  data() {
    return {
      time: {}
    }
  },
  created() {
    this.time = JSON.parse(sessionStorage.getItem('time'))
  },
  computed: {
    timeStr() {
      return getDate(new Date(this.time.stime * 1000), '~') + '~' + getDate(new Date(this.time.etime * 1000), '~')
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #4900ad;
}
.rule {
  padding: 0.53rem 0.39rem 0.25rem;
  h1 {
    color: #fff79b;
    font-weight: bold;
    font-size: 0.36rem;
    text-align: center;
  }
  h6 {
    color: #a1f3ff;
    font-size: 0.28rem;
    margin-top: 0.39rem;
    font-weight: bold;
  }
  p {
    color: #ffddff;
    font-size: 0.26rem;
    margin-top: 0.22rem;
    padding-left: 0.25rem;
  }
  img {
    width: 5.99rem;
    height: 7.98rem;
    margin: 0.31rem 0 0 0.25rem;
  }
  .last2Tips {
    text-align: center;
    line-height: 0.5rem;
  }
  .lastTips {
    color: #b37bff;
    text-align: center;
    margin-top: 0.7rem;
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
