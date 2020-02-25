<template>
  <div class="rule">
    <div class="tabs">
      <span @click="tabClick(1)" :class="{act:show== 1}">Phần thưởng</span>
      <span @click="tabClick(2)" :class="{act:show== 2}">Thể lệ</span>
    </div>
    <div class="actTime">Thời gian: 18h 15/1 – 21h 3/2</div>
    <div class="wards" v-show="show == 1">
      <h3>Phần thưởng</h3>
      <div class="wardImg2"></div>
      <h3>Thưởng top 10 BXH Tiêu Biểu</h3>
      <h6>Hạng 1:</h6>
      <p>Huy chương Tiêu Biểu (30 ngày) + Xe GTR (30 ngày) + 5000 xu + 10000 đậu</p>
      <h6>Hạng 2:</h6>
      <p>Huy chương Tiêu Biểu (30 ngày) + Xe GTR (30 ngày) + 3000 xu + 8000 đậu</p>
      <h6>Hạng 3:</h6>
      <p>Huy chương Tiêu Biểu (30 ngày) + Xe GTR (30 ngày) + 2000 xu + 5000 đậu</p>
      <h6>Hạng 4-5:</h6>
      <p>Xe GTR (30 ngày) + 1000 xu + 2000 đậu</p>
      <h6>Hạng 6-10:</h6>
      <p>Xe GTR (30 ngày) + 500 xu + 1000 đậu</p>
      <h3>Thưởng top 10 BXH Đập chuột</h3>
      <h6>Hạng 1:</h6>
      <p>Huy chương Tiêu Biểu (15 ngày) + Xe GTR (30 ngày) + 3000 xu + 8000 đậu</p>
      <h6>Hạng 2:</h6>
      <p>Huy chương Tiêu Biểu (15 ngày) + Xe GTR (30 ngày) + 2000 xu + 6000 đậu</p>
      <h6>Hạng 3:</h6>
      <p> Huy chương Tiêu Biểu (15 ngày) + Xe GTR (30 ngày) + 1000 xu + 4000 đậu</p>
      <h6>Hạng 4-5:</h6>
      <p>Xe GTR (30 ngày) + 800 xu + 1600 đậu</p>
      <h6>Hạng 6-10:</h6>
      <p>Xe GTR (30 ngày) + 450 xu + 900 đậu</p>
      <h3>Thưởng đạt cấp Đập Chuột</h3>
      <div class="wardImg3"></div>
      <h3>Quy định dùng phần thưởng</h3>
      <div class="wardRule">
        <p>1. Túi quà có thời hạn 14 ngày, phiếu bầu từ sự kiện thời hạn sử dụng 1 ngày, mời sử dụng ngay!</p>
        <p>2. Phiếu dùng 100 tặng 10 xu chỉ có thời hạn 24h sau khi nhận, xu tặng sẽ được tự động gửi vào tài khoản sau khi dùng đủ số xu yêu cầu.</p>
        <p>3. Phiếu quà nạp 3% và 2% nhận từ sự kiện chỉ có thời hạn 24h sau khi nhận, được cộng dồn mức thưởng, xu thưởng sẽ được gửi ngay sau mỗi lần nạp.</p>
      </div>
    </div>
    <div class="rules" v-show="show==2">
      <h3>Thể lệ</h3>
      <h6>Báo danh:</h6>
      <p>Nhấn Báo Danh để tham gia sự kiện, sau khi báo danh mới bắt đầu tính điểm số (Trên 1 thiết bị chỉ được sử dụng 1 acc để tham dự nhé~)</p>
      <h6>Thể lệ xếp hạng BXH Tiêu Biểu</h6>
      <p>1. Dựa vào điểm giải trí nhận được sau khi báo danh. Điểm giải trí tương đương tổng số cắc đã dùng.</p>
      <p>2. Bằng cách làm nhiệm vụ ngày, giúp bạn bè và được bạn bè giúp có thể nhận cắc. Cắc được dùng để đập chuột, đổi phiếu bầu, quay thưởng.</p>
      <p>3. Nếu điểm số bằng nhau, người đạt điểm số trước sẽ xếp hạng cao hơn.</p>
      <p>4. Bảng xếp hạng chỉ hiện top 100.</p>
      <h6>Thể lệ xếp hạng BXH Đập chuột</h6>
      <p>1. Xếp hạng dựa vào điểm đập chuột nhận được sau khi báo danh.</p>
      <p>2. Nếu điểm số bằng nhau, người đạt điểm số trước sẽ xếp hạng cao hơn.</p>
      <p>3. BXH chỉ hiện top 100.</p>
      <h6>Cách nhận cắc</h6>
      <p>
        Làm nhiệm vụ ngày, giúp bạn bè hoặc được bạn bè giúp đều nhận được cắc.</br>
        Cắc được tự động gửi và xoá hết khi qua ngày
      </p>
      <h6>Làm nhiệm vụ nhận cắc:</h6>
      <p>Nhiệm vụ ngày và số cắc tương ứng:</p>
      <div class="taskImg"></div>
      <p class="ps">Ghi chú: tặng quà bài hát/phòng Kara/phòng Radio đều được tính</p>
      <h6>Hỗ trợ bạn bè để nhận cắc:</h6>
      <p>1. Mỗi ngày hỗ trợ tối đa 3 bạn bè và được tối đa 3 bạn bè hỗ trợ.</p>
      <p>2. Mỗi lần hỗ trợ, cả 2 đều nhận 5 cắc.</p>
      <h3>Quy định sử dụng cắc</h3>
      <h6>Đập chuột:</h6>
      <p>1. Mỗi lần đập chuột tốn 20 cắc, đạt điểm số yêu cầu có thể nhận thưởng</p>
      <h6>Đổi phiếu bầu:</h6>
      <p>1. Đổi trong thời gian mở sự kiện Cuối Năm, dùng để bầu chọn cho thí sinh.</p>
      <p>2. Đổi 1 phiếu bầu cần 20 cắc.</p>
      <p>3. Mỗi người 1 ngày được đổi 1 phiếu, có thể kiểm tra trong Túi.</p>
      <p>4. Mỗi phiếu bầu có giá 30 đậu, thời hạn 1 ngày, mời tặng trước khi quá hạn.</p>
      <h6>Vòng quay may mắn:</h6>
      <p>1. Mỗi lần quay tốn 20 cắc, phần thưởng trúng được gửi ngay vào tài khoản.</p>
      <h3>Quy định khác</h3>
      <div class="jinggao">
        Trong quá trình diễn ra sự kiện, nếu phát hiện người dùng gian lận trong sự kiện, ban tổ chức sẽ dựa theo mức độ vi phạm để xử lý, người vi phạm sẽ bị loại khỏi sự kiện hoặc khoá tài khoản. Bao gồm các hành vi sau:
        <p>1. Dùng hoặc trộm tài khoản của người khác để dự thi.</p>
        <p>2. Dùng nhiều tài khoản để tham gia dự thi.</p>
        <p>3. Bình luận ác ý, quảng cáo vào bài hát dự thi hoặc nhằm vào thí sinh dự thi.</p>
        <p>4. Toàn bộ các hành vi gian lận khác.</p>
        <p>5. Nếu cố ý gian lận, dù có tham gia sự kiện hay không đều bị khoá toàn bộ tài khoản chính và phụ. Sau khi kết thúc sự kiện ban tổ chức sẽ thu hồi toàn bộ phần thưởng.</p>
      </div>
    </div>
    <p class="lastTips">Quyết định của ban tổ chức là quyết định cuối cùng.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: 1
    }
  },
  methods: {
    tabClick(val) {
      this.show = val
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #d94343;
}
.rule {
  padding: 0.29rem 0.41rem;
  .tabs {
    display: flex;
    justify-content: space-between;
    span {
      display: block;
      width: 3.3rem;
      height: 0.81rem;
      color: #ffd145;
      font-size: 93%;
      background: url(../../assets/img/ruleBg.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.81rem;
      &.act {
        color: #b98300;
        background: url(../../assets/img/ruleBgAct.png);
        background-size: 100% 100%;
      }
    }
  }
  .actTime {
    font-size: 80%;
    color: #ffa365;
    margin: 0.21rem auto 0;
    text-align: center;
  }
  h3 {
    margin: 0.46rem 0 0.31rem;
    text-align: center;
    color: #ffdc7f;
  }
  .wardImg2 {
    width: 6.41rem;
    height: 6.26rem;
    background: url(../../assets/img/wardImg2.png);
    background-size: 100% 100%;
    margin: 0 auto;
  }
  .wardImg3 {
    width: 5.8rem;
    height: 4.49rem;
    background: url(../../assets/img/wardImg.png);
    background-size: 100% 100%;
    margin: 0 auto;
  }
  h6,
  p {
    font-size: 70%;
    color: #ffddc7;
  }
  .wardRule {
    p {
      margin-top: 0.15rem;
    }
  }
  > p {
    padding-left: 0.4rem;
  }
  .lastTips {
    font-size: 80%;
    text-align: center;
    color: #e68d51;
    margin-top: 0.8rem;
  }
  .taskImg {
    width: 6.38rem;
    height: 6.81rem;
    background: url(../../assets/img/taskImg.png);
    background-size: 100% 100%;
    margin: 0.1rem 0 0 0.4rem;
  }

  .ps {
    color: #ffc29a;
  }
  .wards {
    p {
      margin-bottom: 0.15rem;
    }
  }
  .rules {
    h6 {
      font-size: 90%;
      margin-top: 0.25rem;
      font-weight: 700;
    }
    p {
      font-size: 70%;
      padding-left: 0.4rem;
      font-weight: 500;
    }
    .jinggao {
      font-size: 0.2rem;
      color: #ffddc7;
      p {
        font-size: 0.2rem !important;
      }
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
