<template>
  <div class="rule">
    <div class="tabs">
      <span :class="{act:showType == 'wards'}" @click="clickTab('wards')">Phần thưởng</span>
      <span :class="{act:showType == 'rules'}" @click="clickTab('rules')">Thể lệ</span>
    </div>
    <div class="ward" v-show="showType == 'wards'">
      <p class="actTime">Thời gian: 19h 17/12 – 21h 28/12</p>
      <div class="wardImg"></div>
      <h3>Thưởng top 10 BXH Tổng</h3>
      <div class="rankTop10">
        <h6>Hạng nhất:</h6>
        <p>Huy chương Giáng Sinh An Lành (30 ngày) + quý tộc Hoàng Đế (31 ngày) + Xe Tuần Lộc Noel (30 ngày) + quà động Cầu Pha Lê P.Kara (1588 xu) + 5000 xu + 5000 đậu</p>
        <h6>Hạng nhì:</h6>
        <p>Huy chương Giáng Sinh An Lành (30 ngày) + quý tộc Công Tước (31 ngày) + Xe Tuần Lộc Noel (30 ngày) + quà động Cầu Pha Lê P.Kara (1588 xu) + 3000 xu + 3000 đậu</p>
        <h6>Hạng ba:</h6>
        <p>Huy chương Giáng Sinh An Lành (30 ngày) + quý tộc Công Tước (31 ngày) + Xe Tuần Lộc Noel (30 ngày) + quà động Cầu Pha Lê P.Kara (1588 xu) + 2500 xu + 2500 đậu</p>
        <h6>Hạng bốn - năm:</h6>
        <p>Huy chương Giáng Sinh An Lành (30 ngày) + Xe Tuần Lộc Noel (30 ngày) + quà động Cầu Pha Lê P.Kara (1588 xu) + 2000 xu + 2000 đậu</p>
        <h6>Hạng sáu – mười:</h6>
        <p>Xe Tuần Lộc Noel (30 ngày) + quà động Cầu Pha Lê P.Kara (1588 xu) + 1000 xu + 1000 đậu</p>
      </div>
      <h3>Trúng thưởng BXH An Lành mỗi ngày</h3>
      <div class="wardImg2">
        <div class="title"></div>
        <div class="bar"></div>
      </div>
      <h3>Thưởng túi quà Giáng Sinh mỗi ngày</h3>
      <div class="dayBar">
        <h6>Điểm An Lành trong ngày đạt 70:</h6>
        <p>Thưởng 100 đậu, số ngày đạt được liên tiếp càng nhiều, số đậu thưởng càng cao. Số đậu thưởng = 100 + 10*số ngày đạt liên tiếp
          </br>Ví dụ: ngày 1 đạt nhận thưởng 110 đậu, ngày 2 liên tiếp đạt được thưởng 120 đậu,... ngày 12 liên tiếp đạt được thưởng 220 đậu</p>
        <h6>Điểm An Lành trong ngày đạt 90:</h6>
        <p>Thưởng ngẫu nhiên: 1 Túi quà Hoa Tuyết Noel (2 xu); VIP (3 ngày), xe Khinh Khí Cầu (3 ngày), xe Chiến đấu cơ (3 ngày), xe cổ (3 ngày)</p>
        <h6>Điểm An Lành trong ngày đạt 130:</h6>
        <p>1 món trong bộ túi quà Giáng Sinh (mỗi món trị giá 10 xu), bộ túi quà Giáng Sinh gồm 12 món. Trong thời gian sự kiện món quà gửi mỗi ngày sẽ không trùng nhau, đừng bỏ lỡ nhé~</p>
        <h6>Điểm An Lành trong ngày đạt 150:</h6>
        <p>Thưởng ngẫu nhiên gấp đôi quà trong 3 hạng mục quà trước
          Nếu trong ngày nhận 3 hạng mục quà trước lần lượt là 150 đậu, VIP (3 ngày), túi quà Tất Giáng Sinh (10 xu), tức có thể nhận ngẫu nhiên 300 đậu, VIP (6 ngày) hoặc 2 túi quà Tất Giáng Sinh (10 xu)</p>
      </div>
      <h3>Quy định sử dụng phần thưởng:</h3>
      <p>1. Phần thưởng túi quà đều có thời hạn 14 ngày, mời sử dụng trong thời gian hiệu lực.</p>
      <p>2. Bản android vào Tôi – Túi để xem, khi tặng quà có thể chọn quà từ Túi. iOS có thể vào App Store tải NowKara để sử dụng.</p>
    </div>
    <div class="rules" v-show="showType == 'rules'">
      <p class="actTime">Thời gian: 19h 17/12 – 21h 28/12</p>
      <h3>Thể lệ</h3>
      <h6>Báo danh:</h6>
      <p>1. Nhấn “Báo danh” để tham gia sự kiện, sau khi báo danh mới bắt đầu tính số liệu vào thành tích sự kiện.</p>
      <p>2. Sau khi báo danh cần vào trang sự kiện và đăng 1 bài hát công khai bất kỳ (trừ Hát chay 5 phút), có thể đăng nhiều bài hát dự thi, sau khi báo danh mới tính quà bài hát được nhận. Nếu xoá bài hát đã báo danh sẽ xoá hết toàn bộ điểm của bài hát đó.</p>
      <h3>Thể lệ xếp hạng sự kiện</h3>
      <h6>BXH Tổng:</h6>
      <p>1. Xếp hạng dựa vào điểm An lành nhận được sau khi báo danh.</p>
      <p>2. Làm nhiệm vụ mỗi ngày có thể nhận điểm</p>
      <p>3. Quà xu nhận từ phòng Kara và bài hát đều tính vào BXH, mỗi 1 xu quà tính 10 điểm.</p>
      <p>4. Nếu bằng điểm nhau, người đạt điểm trước sẽ xếp hạng cao hơn.</p>
      <p>5. BXH chỉ hiện top 100 người có điểm cao nhất.</p>
      <h6>BXH Ngày:</h6>
      <p>1. Mỗi ngày người đạt từ 3000 điểm trở lên mới được vào bảng xếp hạng.</p>
      <p>2. Người vào BXH Ngày có tỷ lệ nhận 1 bộ túi quà Giáng Sinh (120 xu) + xe Tuần Lộc Noel (7 ngày). Tỷ lệ trúng thưởng = điểm BXH ngày của cá nhân/tổng điểm toàn bộ người trên BXH ngày. Điểm càng cao, tỷ lệ trúng thưởng càng nhiều.</p>
      <p>3. Số lượng người trúng thưởng hàng ngày tương đương 20% tổng số người vào BXH Ngày. Phần thưởng vô số, đừng bỏ lỡ nhé.</p>
      <p>4. Danh sách trúng thưởng sẽ có vào 12h đêm hàng ngày, ngày cuối sẽ có khi kết thúc sự kiện. Túi quà và xe sẽ được tự động gửi vào tài khoản.</p>
      <p>Ghi chú: sẽ không phát thưởng xếp hạng ngày theo thứ tự bảng xếp hạng</p>
      <h6>Nhận điểm:</h6>
      <p>1. Làm nhiệm vụ mỗi ngày sẽ nhận điểm tương ứng. Sau khi hoàn thành nhiệm vụ, điểm sẽ tự động được gửi, 0h mỗi ngày sẽ xoá hết. Nhiệm vụ và điểm số tương ứng mỗi ngày như sau:</p>
      <div class="tasKImg"></div>
      <h6>Nhận thưởng quà Giáng Sinh mỗi ngày:</h6>
      <p>1. Số điểm yêu cầu mỗi ngày gồm 4 cấp: 70, 90, 130, 150. Mỗi khi đạt đến số điểm yêu cầu sẽ có thể nhận phần thưởng tương ứng tại trang sự kiện, sau khi nhận thưởng sẽ tự động gửi vào tài khoản.</p>
      <p>2. Túi quà Giáng Sinh nhận từ mốc điểm chỉ có hiệu lực trong ngày, mời sử dụng ngay~</p>
      <h3>Quy định khác</h3>
      <p>Trong quá trình diễn ra sự kiện, nếu phát hiện người dùng gian lận trong sự kiện, ban tổ chức sẽ dựa theo mức độ vi phạm để xử lý, người vi phạm sẽ bị loại khỏi sự kiện hoặc khoá tài khoản. Bao gồm các hành vi sau:</p>
      <p>1. Dùng hoặc trộm bài hát của người khác để dự thi.</p>
      <p>2. Mượn hoặc trộm tài khoản của người khác để dự thi.</p>
      <p>3. Dùng nhiều tài khoản để tham gia dự thi.</p>
      <p>4. Bình luận ác ý, quảng cáo vào bài hát dự thi.</p>
      <p>5. Toàn bộ các hành vi gian lận khác.</p>
      <div class="tips">Nếu cố ý gian lận, dù có tham gia sự kiện hay không đều bị khoá toàn bộ tài khoản chính và phụ. Sau khi kết thúc sự kiện ban tổ chức sẽ thu hồi toàn bộ phần thưởng.</div>
      <div class="tips">Quyết định của ban tổ chức là quyết định cuối cùng.</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showType: 'wards'
    }
  },
  methods: {
    clickTab(val) {
      this.showType = val
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #cf3052;
}
.actTime {
  font-size: 80%;
  color: #ffefd7;
  margin: 0.36rem 0 0.28rem;
  text-align: center;
}
.rule {
  padding-top: 0.28rem;
  .tabs {
    width: 6.67rem;
    height: 0.88rem;
    background: url(../../assets/img/tabsBg.png);
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    span {
      display: block;
      width: 3.57rem;
      height: 0.85rem;
      text-align: center;
      line-height: 0.85rem;
      &.act {
        background: url(../../assets/img/tuleTabaAct.png);
        background-size: 100% 100%;
      }
    }
  }

  h3 {
    width: 4.86rem;
    height: 0.9rem;
    line-height: 0.9rem;
    background: url(../../assets/img/h3Bg.png);
    background-size: 100% 100%;
    margin: 0.29rem auto 0;
    text-align: center;
    color: #ffeabe;
    white-space: nowrap;
  }
  h6 {
    color: #ffae00;
    font-size: 80%;
    margin-top: 0.2rem;
  }
  p {
    color: #ffd3dc;
    font-size: 73%;
  }
  .rules {
    padding: 0 0.22rem 0.7rem;
  }
  .ward {
    padding: 0 0.22rem 0.7rem;
    .wardImg {
      width: 7.05rem;
      height: 4.86rem;
      background: url(../../assets/img/wardImg.png);
      background-size: 100% 100%;
      margin: 0 auto;
    }
    p {
      color: #ffd3dc;
      font-size: 73%;
    }
    .rankTop10 {
      h6 {
        color: #ffae00;
        font-size: 80%;
        margin-top: 0.2rem;
      }
      p {
        color: #ffd3dc;
        font-size: 73%;
      }
    }
    .dayBar {
      h6 {
        color: #ffae00;
        font-size: 80%;
        margin-top: 0.2rem;
      }
      p {
        color: #ffd3dc;
        font-size: 73%;
      }
    }
    .wardImg2 {
      width: 6.6rem;
      margin: 0.11rem auto;
      .title {
        width: 6.6rem;
        height: 1.98rem;
        background: url(../../assets/img/img2Title.png);
        background-size: 100% 100%;
      }
      .bar {
        width: 6.6rem;
        height: 3.51rem;
        background: url(../../assets/img/imgBar.png);
        background-size: 100% 100%;
        margin-top: 0.13rem;
      }
    }
  }
  .tips {
    margin-top: 0.25rem;
    color: #ffd3dc;
    font-size: 73%;
  }
  .tasKImg {
    width: 6.83rem;
    height: 6.93rem;
    background: url(../../assets/img/taskImg.png);
    background-size: 100% 100%;
    margin: 0.15rem auto;
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
