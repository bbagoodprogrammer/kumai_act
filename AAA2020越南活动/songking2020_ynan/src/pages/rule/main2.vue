<template>
  <div class="rule">
    <div class="topTabs">
      <span :class="{act:tab == 1}" @click="tabClick(1)">Phần thưởng</span>
      <span :class="{act:tab == 2}" @click="tabClick(2)">Thể lệ</span>
    </div>
    <div class="ruleTips" v-if="tab == 1">
      <h5>Thời gian</h5>
      <p>18:00 30/11 - 20:00 9/12</p>
      <img src="../../assets/img/rule/gifts.png" alt="" class="gift">
      <h5>Rương thưởng cấp</h5>
      <img src="../../assets/img/rule/img1.png" alt="" class="img1">
      <h5>Thưởng lì xì</h5>
      <p>1、Trong thời gian sự kiện, bài hát gắn thẻ “Vua Ca Nhạc” mỗi khi nhận đủ 800 quà “Ủng Hộ Bạn” (10 xu), sẽ nổ 1 lì xì trị giá 1088 xu, mỗi lần sẽ có 200 bao lì xì, ai đến trước nhận trước.</p>
      <h5>Thưởng tăng tốc BXH</h5>
      <p>1、Bài hát gắn thẻ “Vua Ca Nhạc” trong vòng 48h sau khi đăng nếu nhận đủ 20k mị lực quà xu sẽ tăng 20% điểm xếp hạng trên BXH ca khúc trên app.</p>
      <h5>Thưởng top 10 Vua Ca Nhạc</h5>
      <p class="mg">Hạng nhất:<br /> 16500000 VND + chứng nhận Vua Ca Nhạc (1 năm) + huy chương Vua Ca Nhạc (1 tháng) + ID đẹp (4 số, liên hệ ban tổ chức để nhận) + VIP (1 năm) + Phiếu Nạp 3% (6 tháng) + trang sức Vua Ca Nhạc (1 tháng) + Xe Thảm Đỏ (1 tháng) + 3 túi quà Cô Bé Hươu (666 xu) + 10000 đậu + đổi 30% quà xu nhận trong đêm nhạc Gala thành tiền mặt</p>
      <p class="mg">Hạng nhì:<br />4000000 VND + chứng nhận Vua Ca Nhạc (6 tháng) + huy chương Vua Ca Nhạc (1 tháng) + ID đẹp (4 số, liên hệ ban tổ chức để nhận) + VIP (3 tháng) + Phiếu Nạp 3% (3 tháng) + trang sức Vua Ca Nhạc (1 tháng) + Xe Thảm Đỏ (1 tháng) + 2 túi quà Cô Bé Hươu (666 xu) + 7000 đậu + đổi 25% quà xu nhận trong đêm nhạc Gala thành tiền mặt</p>
      <p class="mg">Hạng ba:<br /> 3000000 VND + chứng nhận Vua Ca Nhạc (3 tháng) + huy chương Vua Ca Nhạc (1 tháng) + ID đẹp (4 số, liên hệ ban tổ chức để nhận) + VIP (2 tháng) + Phiếu Nạp 3% (3 tháng) + trang sức Vua Ca Nhạc (1 tháng) + Xe Thảm Đỏ (1 tháng) + 2 túi quà Cô Bé Hươu (666 xu) + 5000 đậu + đổi 20% quà xu nhận trong đêm nhạc Gala thành tiền mặt</p>
      <p class="mg">Hạng 4-5:<br /> Huy chương Vua Ca Nhạc (1 tháng) + VIP (2 tháng) + Phiếu Nạp 3% (1 tháng) + trang sức Vua Ca Nhạc (1 tháng) + Xe Thảm Đỏ (1 tháng) + 1 túi quà Cô Bé Hươu (666 xu) + 3000 xu + 3000 đậu</p>
      <p class="mg">Hạng 6-10:<br /> Huy chương Vua Ca Nhạc (1 tháng) + VIP (1 tháng) + Phiếu Nạp 3% (1 tháng) + trang sức Vua Ca Nhạc (1 tháng) + Xe Thảm Đỏ (1 tháng) + 1 túi quà Cô Bé Hươu (666 xu) + 2000 xu + 2000 đậu</p>
      <h5>Hướng dẫn dùng phần thưởng</h5>
      <p>1、Phần thưởng túi quà có thời hạn 14 ngày, mời chú ý sử dụng.</p>
      <p>2、Phần thưởng được phát trong vòng 14 ngày làm việc sau khi kết thúc sự kiện.</p>
      <p>3、Nếu nhận được nhiều lời mời tham gia đêm nhạc Gala, chỉ tính tỷ lệ chia sẻ tiền mặt cao nhất trong số đó, không thể cộng dồn. Đồng thời trong đêm nhạc Gala, phải lên mic live hoặc mic thường mới được chia sẻ tiền mặt, nếu lên mic livestream không được chia sẻ tiền mặt.</p>
    </div>
    <div class="giftItem" v-else>
      <h5>Thời gian</h5>
      <p>18:00 30/11 - 20:00 9/12</p>
      <h4>Thể lệ</h4>
      <h5 class="mt">Báo danh:</h5>
      <p>1、Sau khi nhấn báo danh, thí sinh đăng công khai bài hát tuỳ ý (trừ hát chay 5 phút) để dự thi, có thể đăng nhiều bài hát dự thi, sau khi báo danh bài hát mới được tính điểm quà nhận. Nếu xoá bài hát trong thời gian sự kiện, điểm số của bài hát đã xoá sẽ mất.</p>
      <h4>Thể lệ xếp hạng sự kiện</h4>
      <h5 class="mt">BXH Vua Ca Nhạc</h5>
      <p class="mg">1、Xếp hạng theo tổng điểm Rực Rỡ nhận sau khi báo danh.</p>
      <p class="mg">2、Cách nhận điểm Rực Rỡ:</p>
      <p class="mg">Điểm Rực Rỡ=lượt thích bài hát x10 + mị lực quà xu của bài hát</p>
      <p class="mg"> <em class="red">Số lượt thích:</em>chỉ ghi nhận 30 lượt thích đầu tiên</p>
      <p class="mg"> <em class="red">Mị lực quà xu:</em>mỗi 1 xu quà mà bài hát dự thi nhận, sẽ tính 10 điểm mị lực</p>
      <p class="mg"><em class="red">Quà đặc biệt:</em>bài hát dự thi nếu nhận được 4 quà đặc biệt sau: Ủng Hộ Bạn (10 xu), Hoa Hồng (118 xu), Kỳ Lân 7 Màu (399 xu), quà từ hộp quà cao Cạn Ly Bia (110 xu), sẽ tăng 5% mị lực nhận được.</p>
      <p class="mg"><em class="red">Thời gian tăng điểm:</em> trong thời gian sự kiện 21:00 – 21:10 mỗi ngày nếu bài hát nhận quà xu sẽ tăng thêm 10% điểm mị lực.</p>
      <p class="mg">3、Top 100 người có tổng mị lực quà xu bài hát cao nhất từ tháng 1-10/2020, được tăng thêm điểm mị lực BXH Vua Ca Nhạc, cụ thể như sau:</p>
      <img src="../../assets/img/rule/img2.png" alt="" class="img2">
      <p>4、Nếu điểm Rực Rỡ bằng nhau, ai đạt trước sẽ xếp cao hơn.</p>
      <p>5、BXH chỉ hiển thị top 100 người điểm cao nhất</p>
      <h5>Cách nhận rương thưởng</h5>
      <p>1、Có tổng cộng 6 rương, điểm Rực Rỡ đạt lần lượt 100, 1000, 10000, 50000, 100000 có thể nhận rương tương ứng. Sau khi nhận thưởng sẽ tự động gửi vào tài khoản. Mỗi người chỉ được nhận mỗi rương thưởng 1 lần.</p>
      <p>2、Toàn bộ rương sẽ hết hạn khi kết thúc sự kiện, mời chú ý nhận~</p>
      <img src="../../assets/img/rule/img1.png" alt="" class="img1 mt">
      <h5>Thể lệ lì xì</h5>
      <p>1. Trong thời gian sự kiện, bài hát gắn thẻ “Vua Ca Nhạc” mỗi khi nhận đủ 800 quà “Ủng Hộ Bạn” (10 xu), sẽ nổ 1 lì xì trị giá 1088 xu, mỗi lần sẽ có 200 bao lì xì, ai đến trước nhận trước.</p>
      <p>2. Nhấn hẹn trước lì xì, khi nổ lì xì hệ thống sẽ nhắc nhở đến nhận, nhấn huỷ hẹn để không nhận nhắc nhở lì xì từ hệ thống</p>
      <h5>Quy định khác</h5>
      <p>Trong quá trình diễn ra sự kiện, nếu phát hiện người dùng gian lận trong sự kiện, ban tổ chức sẽ dựa theo mức độ vi phạm để xử lý, người vi phạm sẽ bị loại khỏi sự kiện hoặc khoá tài khoản. Bao gồm nhưng không giới hạn bởi các hành vi sau:</p>
      <p>1. Bài hát dự thi không phải do chính thi sinh hát hoặc thu bài hát của người khác.</p>
      <p>2. Trộm hoặc mượn tài khoản người khác để tham gia sự kiện.</p>
      <p>3. Cùng 1 người dùng nhiều tài khoản để tham gia sự kiện.</p>
      <p>4. Bình luận ác ý, quảng cáo,... trong bài hát dự thi hoặc đối với thí sinh dự thi.</p>
      <p class="mg">5. Toàn bộ các hành vi gian lận và vi phạm quy định khác.</p>
      <p>Nếu cố ý gian lận hoặc vi phạm quy định, cho dù có tham gia dự thi hay không, người vi phạm đều bị khoá vĩnh viễn toàn bộ tài khoản chính và phụ. Đồng thời, ban tổ chức sẽ thu hồi toàn bộ phần thưởng của người vi phạm.</p>
    </div>
    <p class="lastTips">Quyết định của ban tổ chức là quyết định cuối cùng.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: 1
    }
  },
  created() {
    document.title = 'Thể lệ & thưởng'
  },
  methods: {
    tabClick(val) {
      this.tab = val
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: RGBA(34, 33, 30, 1);
  .red {
    color: rgba(252, 245, 193, 1);
  }
  .rule {
    padding: 0 0.14rem;
    h5,
    h4 {
      color: rgba(254, 249, 120, 1);
      font-weight: bold;
      font-size: 0.32rem;
    }
    h4 {
      text-align: center;
      margin-top: 0.67rem;
    }
    h5 {
      margin: 0.65rem 0 0.2rem;
    }
    p {
      font-size: 0.28rem;
      font-weight: 500;
      padding-left: 0.7rem;
      em {
        font-size: 0.28rem;
        font-weight: 500;
      }
    }
    .gift {
      width: 7.22rem;
      height: 10.27rem;
      margin: 0.27rem auto 0;
    }
    .img1 {
      width: 7.02rem;
      height: 7.87rem;
      margin: 0 auto;
    }
    .img2 {
      width: 7.02rem;
      height: 6.01rem;
      margin: 0 auto 0.34rem;
    }
    .mg {
      margin-bottom: 0.5rem;
    }
    .mb {
      margin-bottom: 0;
    }
    .mt {
      margin-top: 0.2rem;
    }
    .lastTips {
      margin: 0.93rem 0 1.11rem;
      text-align: center;
    }
  }
}
.topTabs {
  width: 6.4rem;
  height: 0.88rem;
  display: flex;
  align-self: center;
  background: url(../../assets/img/rank/topTabsBg.png);
  background-size: 100% 100%;
  margin: 0.38rem auto 0;
  span {
    width: 3.2rem;
    height: 0.8rem;
    text-align: center;
    line-height: 0.88rem;
    color: rgba(144, 133, 118, 1);
    font-size: 0.28rem;
    &.act {
      font-size: 0.32rem;
      color: rgba(126, 26, 6, 1);
      background: url(../../assets/img/rank/topTabsAct.png);
      background-size: 100% 100%;
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
