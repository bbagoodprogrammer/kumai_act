<template>
  <div class="rule">
    <div class="tabs">
      <span :class="{act:showCom=='ward'}" @click="changTab('ward')">Thể lệ</span>
      <span :class="{act:showCom=='rule'}" @click="changTab('rule')">Phần thưởng</span>
    </div>
    <div class="ward" v-show="showCom=='ward'">
      <div class="actTime">Thời gian: 12h 26/1 – 21h 3/2</div>
      <h3>Thể lệ</h3>
      <p>1. Tộc trưởng và phó vào trang sự kiện nhấn báo danh để tham gia, sau khi báo danh mới bắt đầu tính điểm.</p>
      <p>2. Top 100 gia tộc có thành viên nhận mị lực quà xu nhiều nhất năm 2019 sẽ được tăng thêm điểm.</p>
      <table border="1" bordercolor="#ffe79c" cellspacing="0">
        <thead>
          <th>Hạng mị lực gia tộc</th>
          <th>Điểm tăng</th>
        </thead>
        <tbody>
          <tr>
            <td>1-10</td>
            <td>5%</td>
          </tr>
          <tr>
            <td>11-20</td>
            <td>4%</td>
          </tr>
          <tr>
            <td>21-40</td>
            <td>3%</td>
          </tr>
          <tr>
            <td>41-60</td>
            <td>2%</td>
          </tr>
          <tr>
            <td>61-100</td>
            <td>1%</td>
          </tr>
        </tbody>
      </table>
      <p>3.Điểm gia tộc = mị lực toàn bộ thành viên gia tộc nhận sau khi báo danh (bài hát + phòng Kara) * (1 + phần trăm tăng thêm) và mị lực từ phiếu bầu tặng cho gia tộc được tính thành điểm vinh dự, phiếu bầu được đổi từ cắc, tối đa 5000 mị lực quà đậu.</p>
      <p>4. BXH Gia tộc dựa vào tổng điểm vinh dự, tổng điểm vinh dự = điểm gia tộc + điểm vinh dự.</p>
      <p>5. Top 3 thành viên gia tộc nhận nhiều quà xu nhất sẽ trở thành cốt cán, mỗi 1 thành viên cốt cán đạt 30k mị lực trở lên, gia tộc được tăng 1% điểm Vinh Dự, tối đa tăng 3%.</p>
      <p>6. Top 3 gia tộc sẽ trở thành gia tộc Vàng, Bạc, Đồng của năm, được mời tham gia đại nhạc hội cuối năm.</p>
      <p>7. Thành viên gia tộc tham gia đại nhạc hội sẽ do tộc trưởng đề cử, 3 thành viên gia tộc top 3 tham gia đại nhạc hội sẽ lần lượt được quy đổi 40%, 30%, 20% xu quà nhận thành tiền mặt, trong đó người hát nhận 5%, số tiền còn lại do tộc trưởng phân chia.</p>
      <h3>Ghi chú</h3>
      <p>1. Sau khi báo danh sự kiện, nếu đổi gia tộc thì điểm của gia tộc cũ không bị trừ.</p>
      <p>2. Nếu trong thời gian sự kiện phát hiện bất cứ hành vi gian lận điểm, người vi phạm sẽ bị loại ngay và thu hồi phần thưởng, nếu nghiêm trọng sẽ khoá tài khoản</p>
      <p class="lastTips">Quyết định của ban tổ chức là quyết định cuối cùng</p>
    </div>
    <div class="ruleMsg" v-show="showCom=='rule'">
      <div class="actTime">Thời gian: 12h 26/1 – 21h 3/2</div>
      <img src="../../assets/img/wardsImg.png" alt="" class="wardsImg">
      <h3>Thưởng BXH Gia Tộc</h3>
      <h6>Gia Tộc Hoàng Kim của năm:</h6>
      <p>1. Chứng nhận gia tộc Hoàng Kim của năm (1 năm)</p>
      <p>2. Chọn 30 thành viên gia tộc nhận huy chương Gia Tộc Hoàng Kim 2020 (6 tháng)</p>
      <p>3. Thưởng 10k điểm gia tộc.</p>
      <p>4. Số người phòng Kara tăng lên 250 (vĩnh viễn)</p>
      <p>5. Tộc trưởng được thưởng VIP cả năm, tộc phó 3 tháng VIP</p>
      <p>6. Chọn 50 thành viên gia tộc nhận 1 Túi quà gia tộc</p>
      <p>7. Toàn bộ thành viên được thưởng 800 đậu</p>
      <p>8. Mời tham gia đại nhạc hội cuối năm và quy đổi 40% xu quà nhận thành tiền mặt.</p>
      <h6>Gia tộc Bạc của năm:</h6>
      <p>1. Chứng nhận gia tộc Bạc của năm (1 năm)</p>
      <p>2. Thưởng 8k điểm gia tộc.</p>
      <p>3. Số người phòng Kara tăng lên 250 (vĩnh viễn)</p>
      <p>4. Tộc trưởng được thưởng VIP cả năm, tộc phó 2 tháng VIP</p>
      <p>5. Chọn 40 thành viên gia tộc nhận 1 Túi quà gia tộc</p>
      <p>6. Toàn bộ thành viên được thưởng 500 đậu</p>
      <p>7. Mời tham gia đại nhạc hội cuối năm và quy đổi 30% xu quà nhận thành tiền mặt.</p>
      <h6>Gia tộc Đồng của năm:</h6>
      <p>1. Chứng nhận gia tộc Đồng của năm (1 năm)</p>
      <p>2. Thưởng 5k điểm gia tộc.</p>
      <p>3. Số người phòng Kara tăng lên 250 (vĩnh viễn)</p>
      <p>4. Tộc trưởng được thưởng VIP cả năm, tộc phó 1 tháng VIP</p>
      <p>5. Chọn 30 thành viên gia tộc nhận 1 Túi quà gia tộc</p>
      <p>6. Toàn bộ thành viên được thưởng 300 đậu</p>
      <p>7. Mời tham gia đại nhạc hội cuối năm và quy đổi 20% xu quà nhận thành tiền mặt.</p>
      <h6>Top 10 gia tộc của năm (4-10):</h6>
      <p>1. Thưởng 2k điểm gia tộc.</p>
      <p>2. Số người phòng Kara tăng lên 250 (1 tháng)</p>
      <p>3. Tộc trưởng được thưởng VIP 3 tháng, tộc phó 1 tháng VIP</p>
      <p>4. Chọn 10 thành viên gia tộc nhận 1 Túi quà gia tộc</p>
      <p>5. Toàn bộ thành viên được thưởng 200 đậu</p>
      <h6>Thành viên cốt cán:</h6>
      <p>1. Huy chương Cốt Cán Gia Tộc (30 ngày)</p>
      <p>2. 1 Túi quà gia tộc</p>
      <p>3. Xe Mừng Năm Mới 30 ngày</p>
      <p>4. Quý tộc Công Tước (1 tháng)</p>
      <h6>Bộ quà gia tộc (giá 2040 mị):</h6>
      <img src="../../assets/img/wardsImg2.png" alt="" class="wardImg2">
      <h3>Ghi chú:</h3>
      <div class="other">
        <p>1. Chứng nhận chỉ phát cho tộc trưởng, nếu nhận được nhiều chứng nhận có thể chọn dùng 1 trong số đó.</p>
        <p>2. Nếu điểm gia tộc đạt tối đa, mục thưởng này xem như hết hiệu lực.</p>
        <p>3. Thời gian tăng số người phòng Kara bắt đầu tính từ khi phát thưởng.</p>
        <p>4. Trong vòng 7 ngày sau khi kết thúc sự kiện, nhân viên ban tổ chức sẽ liên hệ tộc trưởng để lấy thông tin nhận thưởng.</p>
        <p>5. Top 3 thành viên cống hiến nhiều mị lực quà xu nhất cho top 10 gia tộc sẽ nhận phần thưởng thành viên cốt cán.</p>
        <p>6. Túi quà gia tộc gồm: Ngôi Sao Gia Tộc(150 mị), Chìa Khóa Tộc(300 mị), Nhẫn Gia Tộc(600 mị), Trượng Gia Tộc(980 mị), tổng gia trị túi quà gia tộc là 2040 mị.</p>
        <p>7. Thông tin thành viên gia tộc được tính đến khi kết thúc sự kiện, trong 7 ngày sau khi kết thúc sự kiện sẽ phát thưởng.</p>
      </div>

      <p class="lastTips">Quyết định của ban tổ chức là quyết định cuối cùng</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showCom: 'ward'
    }
  },
  methods: {
    changTab(val) {
      this.showCom = val
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #1f1f27;
}
.rule {
  padding: 0.35rem 0.45rem;
  .tabs {
    width: 6.74rem;
    height: 0.9rem;
    background: url(../../assets/img/tabBg.png);
    background-size: 100% 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0.08rem;
    span {
      width: 3.51rem;
      height: 0.79rem;
      text-align: center;
      line-height: 0.79rem;
      color: #fffb8e;
      &.act {
        color: #fff;
        background: url(../../assets/img/tabAct.png);
        background-size: 100% 100%;
      }
    }
  }
  .actTime {
    font-size: 0.26rem;
    color: #ffdb7b;
    font-weight: 600;
    text-align: center;
    margin-top: 0.16rem;
  }
  h3 {
    color: #ba7a3a;
    font-size: 0.28rem;
    font-weight: 600;
    margin: 0.36rem 0 0.21rem;
  }
  p {
    color: #ffe79c;
    font-size: 80%;
    padding-left: 0.2rem;
  }
  table {
    color: #ffe79c;
    text-align: center;
    margin: 0.11rem auto 0.11rem;
    font-size: 0.22rem;
    th {
      font-size: 0.22rem !important;
      padding: 0 0.21rem;
    }
    td {
      font-size: 0.22rem !important;
    }
  }
  .lastTips {
    font-size: 80%;
    color: #a88644;
    margin-top: 0.76rem;
    text-align: center;
  }
  .ruleMsg {
    .wardsImg {
      width: 6.53rem;
      height: 3.98rem;
      margin: 0.28rem auto;
    }
    .wardImg2 {
      width: 6.14rem;
      height: 1.94rem;
      margin: 0.2rem 0 0 0.44rem;
    }
    h6 {
      font-size: 87%;
      color: #fff1c4;
      font-weight: 600;
      padding-left: 0.24rem;
      margin-top: 0.2rem;
    }
    p {
      padding-left: 0.48rem;
    }
  }
  .other {
    p {
      padding-left: 0.24rem;
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
