<template>
  <div class="rule">
    <div class="tabs">
      <span :class="{act:type == 1}" @click="type =1">Giải thưởng sự kiện</span>
      <span :class="{act:type == 2}" @click="type =2">Thể lệ sự kiện</span>
    </div>
    <h6>Thời gian sự kiện:</h6>
    <p>18:00:00 14/12 - 23:00:00 25/12</p>
    <div class="gift" v-if="type == 1">
      <h5>Giải thưởng gương mặt đại diện</h5>
      <h6>Giải thưởng team Gương Mặt Đại Diện:</h6>
      <p>Debut trang sự kiện riêng (kể cả mỗi tác phẩm của 11 thí sinh) + chỉnh sửa ca khúc miễn phí + thiết kết poster riêng + tag bài hát</p>
      <h6>Hạng 1:</h6>
      <p>Chứng nhận Gương Mặt Đại Diện (1 năm) + Khung ảnh Gương Mặt Đại Diện (1 tháng) + Huy chương Đại Chiến Gương Mặt Đại Diện (1 tháng) + Đề cử nhân vật năm + Chia tiền mặt 30% Xu từ liveshow Gala + Xe Thảm Đỏ (1 tháng) + VIP (1 tháng) + Chia tiền mặt 10% Xu BXH vòng chung kết + 5*Túi quà Bảo Hộ Phồn Tinh (1,888 Xu) + 5*Túi quà Xe Sang (1,888 Xu) + 10,000 Xu + 10,000 Đậu</p>
      <h6>Hạng 2:</h6>
      <p>Chứng nhận Gương Mặt Đại Diện (6 tháng) + Khung ảnh Gương Mặt Đại Diện (1 tháng) + Huy chương Đại Chiến Gương Mặt Đại Diện (1 tháng) + Xe Thảm Đỏ (1 tháng) + VIP (1 tháng) + Chia tiền mặt 8% Xu BXH vòng chung kết + 5*Túi quà Cặp Đôi Nhân Mã (1,288 Xu) + 5*Túi quà Cano (1,388 Xu) + 8,000 Xu + 8,000 Đậu</p>
      <h6>Hạng 3:</h6>
      <p>Chứng nhận Gương Mặt Đại Diện (3 tháng) + Khung ảnh Gương Mặt Đại Diện (1 tháng) + Huy chương Đại Chiến Gương Mặt Đại Diện (1 tháng) + Xe Thảm Đỏ (1 tháng) + VIP (1 tháng) + Chia tiền mặt 5% Xu BXH vòng chung kết + 5*Túi quà Súng Giấy Bạc (888 Xu) + 5*Túi quà Xe Công Chúa (888 Xu) + 5,000 Xu + 5,000 Đậu</p>
      <h6>Hạng 4~6:</h6>
      <p>Khung ảnh Gương Mặt Đại Diện (1 tháng) + Huy chương Đại Chiến Gương Mặt Đại Diện (1 tháng) + Xe Thảm Đỏ (1 tháng) + VIP (1 tháng) + Chia tiền mặt 3% Xu BXH vòng chung kết + 5*Túi quà Bom Nốt Nhạc (399 Xu) + 5*Túi quà Đồng Hồ Hồng (399 Xu) + 3,000 Xu + 3,000 Đậu</p>
      <h6>Hạng 7~11:</h6>
      <p>Khung ảnh Gương Mặt Đại Diện (1 tháng) + Huy chương Đại Chiến Gương Mặt Đại Diện (1 tháng) + Xe Thảm Đỏ (1 tháng) + VIP (1 tháng) + Chia tiền mặt 2% Xu BXH vòng chung kết + 5*Túi quà Xe Tàu Hỏa (299 Xu) + 5*Túi quà Bánh Chúc Mừng (299 Xu) + 2,000 Xu + 2,000 Đậu</p>
      <p class="ps">Ghi chú: Nếu nhận được nhiều lời mời tham gia đêm nhạc Gala, chỉ được tính tỷ lệ chia sẻ quà nhận cao nhất, và không cộng dồn. Ngoài ra, khi biểu diễn bắt buộc phải sử dụng mic live thường mới được chia sẻ quà nhận; Nếu lên mic livestream thì sẽ không thể nhận được chia sẻ quà nhận. </p>

      <h5>Giải thưởng top 5 BXH vòng loại</h5>
      <h6>Hạng 1:</h6>
      <p>Xe Du Thuyền (30 ngày) + VIP (1 tháng) + 10*Mặt Dây Chuyền (49 Xu) + 10*Chuông Gió (49 Xu) + 1,000 Xu + 1,000 Đậu. </p>
      <h6>Hạng 2~3:</h6>
      <p>Xe Du Thuyền (30 ngày) + VIP (1 tháng) + 8*Mặt Dây Chuyền (49 Xu) + 8*Chuông Gió (49 Xu) + 800 Xu + 800 Đậu. </p>
      <h6>Hạng 4~5:</h6>
      <p>Xe Du Thuyền (30 ngày) + VIP (1 tháng) + 5* Mặt Dây Chuyền (49 Xu) + 5*Chuông Gió (49 Xu) + 500 Xu + 500 Đậu. </p>
      <h5>Giải thưởng cho team top 5 BXH 1 VS 1</h5>
      <h6>Hạng 1:</h6>
      <p>Xe Tên Lửa (30 ngày) + VIP (1 tháng) + 10*Súng Nước (99 Xu) + 10*Macaron (99 Xu) + 1,500 Xu + 1,500 Đậu.</p>
      <h6>Hạng 2~3:</h6>
      <p>Xe Tên Lửa (30 ngày) + VIP (1 tháng) + 8*Súng Nước (99 Xu) + 8*Macaron (99 Xu) + 1,300 Xu + 1,300 Đậu. </p>
      <h6>Hạng 4~5:</h6>
      <p>Xe Tên Lửa (30 ngày) + VIP (1 tháng) + 5*Súng Nước (99 Xu) + 5*Macaron (99 Xu) + 1,000 Xu + 1,000 Đậu.</p>
      <h5>Giải thưởng cho thí sinh hạng 1 trong team top 4 BXH Đấu Đội</h5>
      <h6>Hạng 1:</h6>
      <p>Xe GTR (30 ngày) + VIP (1 tháng) + 10*Lắc Tay (199 Xu) + 10*Hoa Sen (199 Xu) + 2,000 Xu + 2,000 Đậu. </p>
      <h6>Hạng 2~3:</h6>
      <p>Xe GTR (30 ngày) + VIP (1 tháng) + 8*Lắc Tay (199 Xu) + 8*Hoa Sen (199 Xu) + 1,800 Xu + 1,800 Đậu.</p>
      <h6>Hạng 4~5:</h6>
      <p>Xe GTR (30 ngày) + VIP (1 tháng) + 5*Lắc Tay (199 Xu) + 5*Hoa Sen (199 Xu) + 1,500 Xu + 1,500 Đậu. </p>
    </div>
    <div class="rules" v-else>
      <h5>Thể lệ sự kiện</h5>
      <p class="mag">Sự kiện này chỉ dành rieng cho người dùng đã ký hợp đồng. Người dùng đã ký hợp đồng sẽ được mạc định tham gia sự kiện. </p>
      <p>Trong thời gian vòng loại, sau khi ký hợp đồng, người dùng có thể tham gia sự kiện; Sau khi kết thúc vòng loại, người mới ký hợp đồng không thể tham gia sự kiện. </p>
      <h6>Thể lệ&quà đặc biệt:</h6>
      <p>1.Quà đặc biệt của sự kiện này là: quà bài hát Giọng Ca Ưu Tú (39 Xu), Giúp Bạn Debut (520 Xu), và quà phòng Kara Ngôi sao Live (29 Xu), Của Tôi Rồi (999 Xu)</p>
      <p>2.Tặng quà trên cho thí sinh thì họ sẽ nhận thêm 10% điểm mị lực!</p>
      <h6>Thể lệ xếp hạng&vòng loại:</h6>
      <p>
        1. Xếp hạng theo điểm sôi nổi tức điểm mị lực nhận quà Xu từ bài hát + phòng kara và chủ phòng trong thời gian sự kiện;<br />
        2. Nếu điểm sôi nổi như nhau, thì người dùng đạt điểm trước sẽ được xếp cao hon;<br />
        3. Sau khi vòng loại kết thúc, top 400 sẽ được vào vòng tiếp theo;<br />
        4. Top 5 BXH vòng này sẽ nhận được giải thưởng đặc biệt của vòng này;<br />
        5. Thời gian vòng này: 18:00 14/12/2020 - 23:59 16/12/2020
      </p>
      <h6>Thể lệ xếp hạng & 1VS 1</h6>
      <p>
        1. Hệ thống sẽ tìm trận ngẫu nhiên cho bạn để 1 VS 1;<br />
        2. Cặp đấu có tổng điểm sôi nổi cao hơn thì sẽ được xếp cao hơn. Nếu điểm sôi nổi bằng nhau thì cặp đấu đạt điểm trước sẽ được xếp cao hon;<br />
        3. Điểm sôi nổi sẽ được tính bằng điểm mị lực nhận quà Xu từ bài hát+phòng kara và chủ phòng trong thời hạn 1 VS 1. Người có điểm sôi nổi cao hơn trong mỗi cặp đấu sẽ được vào vòng tiếp theo. Vòng này sẽ có 200 thí sinh có cơ hội vào vòng tiếp theo. <br />
        4. Nếu gặp phải trường hợp bỏ thi đấu thì đối thủ sẽ tự động thắng và vào vòng tiếp theo;<br />
        5. Nếu gặp phải trường hợp 2 bên số điểm như nhau (hòa) thì sẽ được coi là 2 bên đều bị loại, và đều không thể vào vòng tiép theo;<br />
        6. Thí sinh được vào vòng tiếp theo trong top 5 cặp đấu trên BXH vòng này sẽ nhận được giải thưởng đặc biệt của vòng này;<br />
        7. Thời gian vòng này: 00:05 17/12/2020 - 23:59 19/12/2020
      </p>
      <h6>Thể lệ xếp hạng & Đấu đội</h6>
      <p>
        1. Xếp hạng theo điểm sôi nổi của thí sinh top 200 vòng trước, và sẽ được chia sang 4 đội ngẫu nhiên;<br />
        2. Xếp hạng đội: xếp hạng theo tổng điểm sôi nổi của các thành viên trong đội tại vòng này. Đội có tổng điểm sôi nổi cao hơn sẽ được xếp cao hơn;<br />
        3. Xếp hạng cá nhân: điểm sôi nổi sẽ được tính bằng điểm mị lực nhận quà Xu từ bài hát + phòng kara + chủ phòng của mỗi thành viên trong đội, tổng điểm cao hơn thì sẽ được xếp cao hơn. Xếp hạng cao hơn sẽ vào vòng tiếp theo. Nếu điểm sôi nổi như nhau thì thí sinh đạt điểm trước sẽ được xếp cao hơn; <br />
        4. Đội hạng 1 vòng này sẽ có 9 thí sinh được vào vòng tiếp theo. Đội hạng nhì sẽ có 8 thí sinh được vào vòng tiếp theo. Đội hạng 3 sẽ có 7 thí sinh được vào vòng tiếp theo. Đội hạng 4 sẽ có 6 thí sinh được vào vòng tiếp theo. Vòng này sẽ có 30 thí sinh được vào vòng tiếp theo;<br />
        5. Thành viên đứng hạng 1 trong mỗi đội tại vòng này sẽ nhận được giải thưởng đặc biệt của vòng này; <br />
        6. Thời gian vòng này: 00:05 20/12/2020 - 23:59 22/12/2020
      </p>
      <h6>Thể lệ xếp hạng & vòng chung kết Gương Mặt Đại Diện:</h6>
      <p>
        1. 30 thí sinh vòng này sẽ live trong phòng kara Official chỉ định vào 20:00 25/12;<br />
        2. Điểm Đại Diện của thí sinh sẽ được tính bằng điểm mị lực nhận quà Xu từ bài hát+phòng kara (kể cả phòng kara chung kết). Trên BXH vòng này, thí sinh nếu thứ tự càng cao thì sẽ được quyền ưu tiên xếp mic. BXH sẽ căn cứ vào điểm Đại Diện trước 00:00 24/12 của thí sinh vòng này. Trước khi bắt đầu live, ban tổ chức sẽ liên hệ thí sinh để xác định những việc liên quan như lịch trình cụ thể, v. v;<br />
        3. Thí sinh sẽ nhận thêm 10% điểm mị lực khi lên mic vào 20:00 - 23:00 25/12 trong phòng kara chung kết;<br />
        4. Tổng thành tích của thí sinh sẽ được tính bằng điểm Đại Diện (kể cả trong phòng kara chung kết) tại vòng này. Top 11 sẽ nhận được cơ hội trở thành Gương Mặt Đại Diện và nhận được giải thưởng tuong ứng;<br />
        5. Thời gian vòng này: 00:05 23/12/2020 - 23:00 25/12/2020
      </p>
      <h6>Ghi chú:</h6>
      <p>
        Bài hát = điểm mị lực nhận quà Xu từ tất cả tác phẩm công khai của thí sinh trong thời gian vòng này.<br />
        Phòng kara = điểm mị lực nhận quà Xu từ phòng kara của thí sinh khi lên mic trong thời hạn vòng này. <br />
        Chủ phòng (4%) = điểm mị lực nhân được từ phòng kara của thí sinh khi người dùng khác nhận được quà Xu khi lên mic*4%<br />
        Phòng kara thường = điểm mị lực nhận quà Xu từ phòng kara khác (ngoài phòng kara chung kết) của thí sinh khi lên mic trong thời hạn vòng này. <br />
        Phòng kara chung kết = điểm mị lực nhận quà Xu từ phòng kara Official chỉ định khi thí sinh lên mic trong 20:00 - 23:00 25/12 (cộng 10%) <br />
        Điểm sôi nổi = điểm mị lực nhận quà Xu từ bài hát+phòng kara+chủ phòng<br />
        Điểm Gương Mặt Đại Diện = điểm mị lực nhận quà Xu từ bài hát+phòng kara (kể cả phòng kara chung kết)
      </p>
      <p class="red">Sau khi kết thúc mỗi vòng, dữ liệu BXH sẽ xóa hết. </p>
      <h5>Ghi chú khác:</h5>
      <p>Trong quá trình diễn ra sự kiện, nếu phát hiện thí sinh tham gia sự kiện có hành vi gian lận, ban tổ chức có quyền xử phạm và hủy bỏ tư cách tham gia sự kiện hoặc khóa tài khoản mà không cần thông báo cho thí sinh trước (bao gồm nhưng không giới hạn những hành vi như sau):</p>
      <p>
        1)Bài hát dự thi không phải do bản thân thí sinh mình biểu diễn, hoặc trộm bài hát của người dùng khác;<br />
        2)Tham gia sự kiện bằng tài khoản của người dùng khác hoặc trộm tài khoản của người dùng khác;<br />
        3)Cùng một người dăng ký nhiều tài khoản để tham gia sự kiện;<br />
        4)Bình luận hoặc quảng cáo ác ý vào bài hát dự thi trong thời gian sự kiện;<br />
        5)Toàn bộ hành vi vi phạm quy định khác.
      </p>
      <p>Nếu chủ động gian lận, cho dù có dự thi hay không vẫn sẽ bị khóa tài khoản (kể cả tài khoản chính và phụ) vĩnh viễn. Sau khi kết thúc sự kiện, ban tổ chức có quyền thu hồi tất cả các giải thưởng.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: 1
    }
  },
  created() {
    document.title = 'Thể lệ & Giải thưởng'
  }
}
</script>

<style lang="scss">
body {
  background-color: rgba(10, 6, 5, 1);
}
.rule {
  padding: 0.5rem 0.3rem;
  .tabs {
    width: 6.89rem;
    height: 1.16rem;
    background: url(../../assets/img/ruleTabs.png);
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0.1rem;
    span {
      width: 3.47rem;
      height: 0.82rem;
      text-align: center;
      line-height: 0.82rem;
      font-size: 0.32rem;
      color: rgba(255, 191, 73, 1);
      margin-top: -0.02rem;
      &.act {
        color: rgba(185, 71, 33, 1);
        background: url(../../assets/img/ruleTabs_act.png);
        background-size: 100% 100%;
      }
    }
  }
  h5 {
    color: rgba(255, 229, 125, 1);
    font-size: 0.32rem;
    font-weight: 600;
    text-align: center;
    margin-top: 0.6rem;
  }
  h6 {
    font-size: 0.28rem;
    color: rgba(255, 204, 114, 1);
    margin: 0.39rem 0 0.19rem;
  }
  .mag {
    margin-top: 0.39rem;
  }
  p {
    font-size: 0.28rem;
    color: rgba(255, 255, 255, 0.6);
  }
}
@import "../../assets/scss/common.scss";
</style>
