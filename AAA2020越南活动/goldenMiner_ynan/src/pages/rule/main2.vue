<template>
  <div class="rule">
    <div class="tabs">
      <span :class="{act:showType== 0}" @click="tabClick(0)">Thể lệ</span>
      <span :class="{act:showType== 1}" @click="tabClick(1)">Thưởng</span>
    </div>
    <div class="rules" v-show="showType == 0">
      <p class="actTime">18h 6/8/2020 – 20h 23/8/2020</p>
      <h5>Thể lệ BXH Phú Hộ</h5>
      <p>1. Xếp hạng theo điểm phú hộ tương ứng với quặng đào được sau khi báo danh.<span>Điểm phú hộ = giá trị của quặng đào được</span></p>
      <img src="../../assets/img/ruleImg1.png" alt="" class="ruleImg1">
      <p>2. Nếu điểm phú hộ bằng nhau, người đạt điểm trước sẽ xếp hạng cao hơn.</p>
      <p>3. Bảng xếp hạng tổng chỉ hiện top 100 người cao điểm nhất.</p>
      <h5>Về nhiệm vụ</h5>
      <p>1.Nhiệm vụ nạp: mỗi khi nạp đủ 50 xu nhận 1 lượt đào, đào quặng sẽ nhận được điểm phú hộ dùng để đổi quà.</p>
      <p>Nhiệm vụ ngày: yêu cầu của nhiệm vụ không xoá bài hát công khai đã đăng hôm trước, nếu 12:00 hệ thống kiểm tra thấy bài hát công khai đã đăng hôm trước vẫn chưa bị xoá sẽ tự động tặng 1 lượt đào.</p>
      <h5>Hướng dẫn đào</h5>
      <div class="block1">
        <p>1.Quặng ở tầng sâu cần phải đào quặng ở tầng trên mới có thể đào đến được. Sau khi đào hết quặng và cứu được thợ mỏ, đợt này kết thúc, có thể bắt đầu lại đợt đào mới.</p>
        <p>2. Mỗi cột hoàn thành <i class="red">5</i> lần đào sẽ cứu được thợ mỏ 1 lần và nhận điểm phú hộ ngẫu nhiên.</p>
        <p>3. Mỗi loại quặng có phạm vi điểm phú hộ ngẫu nhiên khác nhau, điểm phú hộ của đá quý có phạm vi lớn nhất.</p>
        <p>4. 0h mỗi ngày sẽ xoá hết lượt đào và tiến độ đào, mời sử dụng kịp thời.</p>
        <p>5. Bảng xếp hạng tính tổng điểm trong thời gian sự kiện, người đạt điểm cao hơn và sớm hơn sẽ xếp trước.</p>
        <p>6. Phần thưởng mỗi ngày dựa vào tổng điểm phú hộ trong ngày, 0h hôm sau phần thưởng mỗi ngày sẽ tính lại từ đầu.</p>
        <P>7. Nhấn Đào toàn bộ để đào hết toàn bộ quặng và giải cứu toàn bộ thợ mỏ trong đợt này.</P>
      </div>
      <h5>Quy định khác </h5>
      <p class="otherTips">Trong sự kiện, nếu phát hiện người dùng có hành vi gian lận khi tham gia sự kiện, ban tổ chức sẽ xử lý người vi phạm theo mức độ vi phạm mà không cần thông báo trước, bằng cách huỷ quyền tham gia hoặc khoá tài khoản, bao gồm nhưng không giới hạn những hành vi sau:</p>
      <p>1. Trộm hoặc mượn tài khoản người khác để tham gia sự kiện.</p>
      <p>2. Cùng 1 người đăng ký nhiều tài khoản để tham gia.</p>
      <p>3. Tất cả các hành vi gian lận khác.</p>
      <p class="otherTips2">Nếu cố tình vi phạm, cho dù người dùng có tham gia sự kiện hay không đều bị khoá vĩnh viễn toàn bộ tài khoản chính và phụ, sau khi sự kiện kết thúc ban tổ chức sẽ thu hồi toàn bộ phần thưởng.</p>
    </div>
    <div class="wards" v-show="showType == 1">
      <p class="actTime">18h 15/5/2020 – 21h 29/5/2020</p>
      <h5 class="title1">Thưởng mỗi ngày</h5>
      <p class="centerTips">Điểm phú hộ nhận thưởng mỗi ngày = điểm phú hộ nhận trong hôm đó</p>
      <img src="../../assets/img/ruleImg2.png" alt="" class="ruleImg2">
      <p>1. Mỗi ngày nhận điểm phú hộ đạt đủ mức yêu câu sẽ nhận phần thưởng khác nhau, sau khi nhấn nhận phần thưởng sẽ được gửi ngay vào tài khoản.</p>
      <p>2. Trong thời gian sự kiện, túi quà mỗi cấp 1 người 1 ngày chỉ được nhận 1 lần duy nhất. Nếu không nhận trong ngày sang hôm sau sẽ mất.</p>
      <p>3. Nếu 5 ngày liên tiếp hoàn thành toàn bộ nhiệm vụ ngày, sẽ nhận Xe Ferrari (5 ngày), phần thưởng sẽ được tự động gửi, mời kiểm tra Xe của tôi.</p>
      <h5>Túi quà thưởng BXH tổng</h5>
      <div class="topGift">
        <h6>Hạng nhất:</h6>
        <p>Huy chương Trùm Thợ Mỏ (30 ngày) + 20000 điểm phú hộ (trị giá 20000 xu) + Chiến Đấu Cơ (31 ngày) + Túi quà bài hát Kho Báu Vàng (666 xu) + 5000 xu + 5000 đậu</p>
        <h6>Hạng nhì:</h6>
        <p>Huy chương Trùm Thợ Mỏ (15 ngày) + 15000 điểm phú hộ (trị giá 15000 xu) + Chiến Đấu Cơ (31 ngày) + Túi quà bài hát Kho Báu Vàng (666 xu) + 3000 xu + 3000 đậu</p>
        <h6>Hạng ba:</h6>
        <p>Huy chương Trùm Thợ Mỏ (7 ngày) + 10000 điểm phú hộ (trị giá 10000 xu) + Chiến Đấu Cơ (31 ngày) + Túi quà bài hát Kho Báu Vàng (666 xu) + 2000 xu + 2500 đậu</p>
        <h6>Hạng 4-5:</h6>
        <p>Huy chương Trùm Thợ Mỏ (7 ngày) + Chiến Đấu Cơ (31 ngày) + Túi quà bài hát Kho Báu Vàng (666 xu) + 1500 xu + 2000 đậu</p>
        <h6>Hạng 6-10:</h6>
        <p>Chiến Đấu Cơ (31 ngày) + Túi quà bài hát Kho Báu Vàng (666 xu) + 1000 xu + 1000 đậu</p>
      </div>
      <h5>Cách dùng phần thưởng</h5>
      <div class="giftRules">
        <p>1. Phiếu quà nạp chỉ có tác dụng trong ngày tính từ lúc nhận, nếu trong ngày 1 người dùng nhận được nhiều phiếu quà nạp, mức thưởng sẽ cộng dồn. Xu thưởng sẽ được tự động gửi ngay khi nạp thành công.</p>
        <p>2. Phần thưởng túi quà đều có thời hạn 7 ngày, mời dùng kịp thời.</p>
        <p>3. Túi quà trên phiên bản Android có thể xem tại Tôi – Túi quà, khi tặng quà có thể lựa chọn để tặng quà từ Túi. iOS cần cập nhật phiên bản mới nhất Việt Kara trên App Store để sử dụng.</p>
      </div>
    </div>
    <p class="lastTips">Quyết định của ban tổ chức là quyết định cuối cùng</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showType: 0
    }
  },
  created() {
    document.title = 'Thể lệ&Thưởng'
    sessionStorage.setItem("need-refresh", true);
  },
  methods: {
    tabClick(val) {
      this.showType = val
    }
  }
}
</script>

<style lang="scss">
body {
  background: #331106;
}
.red {
  color: red !important;
}
.rule {
  padding: 0.27rem 0.23rem;
  .tabs {
    width: 7.01rem;
    height: 0.95rem;
    display: flex;
    justify-content: space-between;
    span {
      display: block;
      width: 3.46rem;
      height: 0.95rem;
      background: url(../../assets/img/rule2.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.95rem;
      color: #5a2412;
      &.act {
        background: url(../../assets/img/rule1.png);
        background-size: 100% 100%;
      }
    }
  }
  .actTime {
    margin-top: 0.27rem;
    text-align: center;
    color: #eb9358;
    font-size: 0.24rem;
    font-weight: 700;
  }
  h5 {
    margin: 0.5rem auto 0.36rem;
    text-align: center;
    color: #fddd4e;
    font-weight: 700;
  }
  p {
    font-size: 0.24rem;
    color: #eb9358;
    font-weight: 500;
    span {
      display: block;
      text-indent: 0.25rem;
    }
  }
  .rules {
    .block1 {
      p {
        margin-bottom: 0.2rem;
      }
    }
    .ruleImg1 {
      width: 4.41rem;
      height: 3.93rem;
      margin: 0.16rem 0 0 0.24rem;
    }
    .otherTips {
      margin-bottom: 0.25rem;
    }
    .otherTips2 {
      margin-top: 0.25rem;
    }
  }
  .wards {
    .title1 {
      margin-bottom: 0.14rem;
    }
    .centerTips {
      text-align: center;
    }
    .ruleImg2 {
      width: 7.01rem;
      height: 4.89rem;
      margin: 0.2rem auto 0.14rem;
    }
    .topGift {
      h6 {
        font-size: 0.24rem;
        font-weight: 600;
        color: #eb9358;
        margin: 0.28rem 0 0.15rem;
      }
      p {
        padding-left: 0.39rem;
      }
    }
    .giftRules {
      p {
        margin-bottom: 0.25rem;
      }
    }
  }
  .lastTips {
    text-align: center;
    font-weight: 500;
    color: #9f6151;
    font-size: 0.24rem;
    margin-top: 0.74rem;
  }
}
@import "../../assets/scss/common.scss";
</style>
