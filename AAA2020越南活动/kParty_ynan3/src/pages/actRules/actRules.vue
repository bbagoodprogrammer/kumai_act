<template>
  <div class="actRules">
    <div class="totalTips" v-if="is_admin">
      <h6>Cách mở tiệc:</h6>
      <div class="tipsBox">
        <p>1. Idol, quản trị viên và chủ phòng của phòng kara có quyền đăng ký xin phép mở Đại Tiệc, nhấn [Đăng ký] và điền thông tin yêu cầu, nhấn gửi để đăng ký mở tiệc, cần đăng ký trước khi mở
          tiệc từ 5 – 30 ngày, mỗi bữa tiệc kéo dài từ 1 – 3 giờ, mỗi phòng 1 tháng được tổ chức tối đa 4 lần.</p>
        <p>2. Nếu muốn người tham dự phải báo danh trước hãy chọn [Cần báo danh], danh sách xem tại [Tiệc của tôi]</p>
        <p>3. Sau khi gửi thông tin đăng ký vui lòng đợi kết quả từ ban điều hành, chi tiết xem tại [Tiệc của tôi]</p>
        <p>4. Nhấn chỉnh sửa tại [Tiệc của tôi] để điều chỉnh thông tin tiệc nếu vẫn chưa được duyệt, tiệc đã được duyệt sẽ không thể chỉnh sửa.</p>
        <p>5. Tiệc chưa được duyệt có thể chỉnh sửa 1 lần, sau khi sửa và gửi lại nếu vẫn không được duyệt sẽ không được chỉnh sửa nữa.</p>
        <p>6. Sự kiện đang diễn ra sẽ được dính trên top danh sách Đại Tiệc. Bìa phòng sẽ được dính tự động danh hiệu tên sự kiện.</p>
        <p>7. Nếu phòng Kara/Idol sau khi đăng ký tiệc không nghiêm túc tổ chức hoặc không tổ chức tiệc (bao gồm đặt mật khẩu phòng trong thời gian tiệc) đủ 4 lần sẽ không thể tiếp tục đăng ký tiệc.
        </p>
        <p>8. Mỗi bữa tiệc sẽ nhận được điểm tương ứng như sau:</p>
        <img src="../../assets/img/ruleImg1.png" alt="" class="ruleImg1">
        <p class="ps">Ghi chú: Điểm kế hoạch do ban điều hành chấm khi duyệt kế hoạch tổ chức tiệc, kế hoạch càng hoàn chỉnh, cách chơi càng mới lạ, điểm số càng cao, có thể tham khảo những sự kiện do
          app tổ chức.</p>
        <p>9.Mỗi tuần/tháng đạt điểm số yêu cầu (5000/15000) hoặc vào top 10 bảng xếp hạng sẽ nhận phần thưởng, phòng Kara của app không được xếp hạng.</p>
        <img src="../../assets/img/ruleImg2.png" alt="" class="ruleImg2">
        <img src="../../assets/img/ruleImg3.png" alt="" class="ruleImg3">
        <p class="ps">Ghi chú: Mỗi đầu tuần/tháng sẽ tính thưởng tuần/tháng, nhân viên app sẽ liên hệ chủ phòng trong vòng 3 ngày làm việc để phát thưởng, nếu quá hạn không cung cấp thông tin nhận
          thưởng xem như từ bỏ phần thưởng (thưởng BXH Tuần sẽ tính từ khi sự kiện ra mắt, thưởng BXH Tháng tính từ ngày 1/8)</p>
      </div>
      <h6>Hướng dẫn dự tiệc:</h6>
      <div class="tipsBox">
        <p>1. Mỗi người mỗi ngày theo dõi 2 tiệc trên danh sách sẽ nhận 30 đậu, nếu bỏ theo dõi xem như hết hiệu lực, chỉ 1 tài khoản được nhận thưởng.</p>
        <p>2. Người dùng vào phòng tiệc 20 phút được thưởng 30 đậu, mỗi người chỉ được nhận 1 lần trong 1 tiệc.</p>
        <p>3. Nhấn theo dõi để nhận được thông báo trước khi tiệc bắt đầu 5 phút, đừng bỏ lỡ chương trình đặc sắc.</p>
        <p>4. Để tham dự tiệc cần báo danh phải nhấn báo danh và điền thông tin, người tổ chức sẽ liên hệ bạn để thông báo kết quả, nếu được duyệt sẽ có thể tham gia sự kiện.</p>
        <p>5. Tích cực chia sẻ và theo dõi để thu hút càng nhiều khán giả tham dự tiệc.</p>
        <p>6. Nội dung tiệc do người tổ chức quyết định, nếu có thắc mắc mời liên hệ người tổ chức.
          Quyết định của ban tổ chức là quyết định cuối cùng</p>
      </div>
    </div>
    <div v-else>
      <h6>Cách mở tiệc:</h6>
      <div class="tipsBox">
        <p>1. Mỗi người mỗi ngày theo dõi 2 tiệc trên danh sách sẽ nhận 30 đậu, nếu bỏ theo dõi xem như hết hiệu lực, chỉ 1 tài khoản được nhận thưởng.</p>
        <p>2. Người dùng vào phòng tiệc 20 phút được thưởng 30 đậu, mỗi người chỉ được nhận 1 lần trong 1 tiệc.</p>
        <p>3. Nhấn theo dõi để nhận được thông báo trước khi tiệc bắt đầu 5 phút, đừng bỏ lỡ chương trình đặc sắc.</p>
        <p>4. Để tham dự tiệc cần báo danh phải nhấn báo danh và điền thông tin, người tổ chức sẽ liên hệ bạn để thông báo kết quả, nếu được duyệt sẽ có thể tham gia sự kiện.</p>
        <p>5. Tích cực chia sẻ và theo dõi để thu hút càng nhiều khán giả tham dự tiệc.</p>
        <p>6. Nội dung tiệc do người tổ chức quyết định, nếu có thắc mắc mời liên hệ người tổ chức.
          Quyết định của ban tổ chức là quyết định cuối cùng</p>
      </div>
    </div>
    <p class="lastTips">Quyết định của ban tổ chức là quyết định cuối cùng</p>
  </div>
</template>
<script>
import getString from "../../utils/getString"
export default {
  data () {
    return {
      is_admin: false
    }

  },
  created () {
    this.is_admin = getString('is_admin')
  }
}
</script>
<style lang="scss">
@import '../../assets/scss/common.scss';
body {
  background: rgba(65, 23, 122, 1);
  .actRules {
    padding: 0.5rem 0.58rem 0.2rem 0.33rem;
  }
  .tipsBox {
    padding-left: 0.28rem;
  }
  h6 {
    color: rgba(191, 255, 254, 1);
    font-weight: 600;
    font-size: 0.26rem;
    margin-bottom: 0.25rem;
  }
  p {
    font-size: 0.24rem;
    color: rgba(191, 255, 254, 1);
  }
  .ps {
    font-size: 0.24rem;
    color: rgba(191, 255, 254, 1);
    margin: 0.24rem 0 0.48rem;
  }
  .ruleImg1 {
    width: 6.21rem;
    height: 4.98rem;
    margin-top: 0.32rem;
  }
  .ruleImg2 {
    width: 6.21rem;
    height: 3.58rem;
    margin-top: 0.32rem;
  }
  .ruleImg3 {
    width: 6.21rem;
    height: 3.58rem;
    margin-top: 0.32rem;
  }
  .lastTips {
    color: rgba(168, 132, 216, 1);
    font-size: 0.24rem;
    margin: 0.66rem auto 0;
    text-align: center;
  }
}
</style>
