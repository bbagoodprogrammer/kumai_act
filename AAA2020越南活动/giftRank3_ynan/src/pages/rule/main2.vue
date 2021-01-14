<template>
  <div class="rule">
    <div class="tabs">
      <span :class="{act:type==1}" @click="tabClick(1)">Thể lệ</span>
      <span :class="{act:type==2}" @click="tabClick(2)">Phần thưởng</span>
    </div>
    <div class="actTime">Thời gian:{{timer}}</div>
    <div class="ruleItem" v-if="type==1">
      <h5>Thể lệ:</h5>
      <h6>Báo danh:</h6>
      <p>1.STAR đã ký hợp đồng sẽ được mặc định tham gia 2 BXH là BXH STAR và BXH Chủ Phòng. Nếu mình không có tạo Phòng, thì sẽ không tham gia BXH Chủ Phòng.</p>
      <p>2.Người dùng chưa ký hợp đồng STAR có thể báo danh và sẽ được mặc định tham gia BXH Ca Sĩ.</p>
      <p>3.Idol (chưa ký hợp đồng STAR) có thể báo danh tham gia BXH Ca Sĩ, tuy nhiên sẽ không tính quà tặng khi livestream; quà tặng khi lên mic thường và bài hát sẽ được tính điểm bình thường. </p>
      <p>4.Sau khi người dùng (chưa ký hợp đồng STAR) báo danh thành công, thành tích sẽ được bắt đầu tính vào BXH Ca Sĩ. Thành tích sự kiện kỳ này của người dùng (chưa ký hợp đồng STAR) sẽ chỉ được tính vào BXH Ca Sĩ.
        <br />(Ghi chú: nếu ký hợp đồng STAR trong thời gian sự kiện thì vẫn được hưởng chia quà tặng như thường, nhưng sẽ không được xếp vào BXH STAR và BXH Chủ Phòng)
      </p>
      <h6>Xếp hạng:</h6>
      <p>1.BXH STAR, chủ phòng, ca sĩ đều chia thành BXH ngày và BXH tổng.</p>
      <p>2.BXH STAR sẽ được xếp dựa theo số Xu quà tặng đặc biệt mà người dùng đã ký hợp đồng STAR nhận được từ bài hát và trong phòng Kara.</p>
      <p>3.BXH Chủ Phòng sẽ được xếp dựa theo số Xu quà tặng đặc biệt mà người dùng đã ký hợp đồng STAR (tức chủ phòng) nhận được trong phòng của mình.</p>
      <p>4.BXH Ca Sĩ dựa theo số xu quà tặng yêu cầu mà ca sĩ nhận từ bài hát và phòng Kara</p>
      <p>5.BXH Ngày và BXH Tổng chỉ hiện top 100, nếu bằng điểm người đạt trước xếp hạng cao hơn.</p>
      <p>6.Quà đặc biệt cho tác phẩm tại sự kiện kỳ này là: Pháo Hoa Que (10 Xu), Cầu Nguyện N.Mới (129 Xu); Quà đặc biệt trong phòng Kara tại sự kiện kỳ này là: Kẹo Hồ Lô (10 Xu), Khỏe Như Trâu (129 Xu).</p>
      <P class="mt">Ghi chú: mọi thắc mắc về ký hợp đồng STAR và chủ phòng mời liên hệ Karaoke Now (ID: 1000)</P>
      <h6>Quy định khác</h6>
      <p>Trong quá trình diễn ra sự kiện, nếu phát hiện người dùng gian lận trong sự kiện, ban tổ chức sẽ dựa theo mức độ vi phạm để xử lý, người vi phạm sẽ bị loại khỏi sự kiện hoặc khoá tài khoản. Bao gồm các hành vi sau:</p>
      <p>1. Dùng hoặc trộm bài hát của người khác để dự thi.</p>
      <p>2. Mượn hoặc trộm tài khoản của người khác để dự thi.</p>
      <p>3. Dùng nhiều tài khoản để tham gia dự thi.</p>
      <p>4. Bình luận ác ý, quảng cáo vào bài hát dự thi.</p>
      <p>5. Toàn bộ các hành vi gian lận khác.</p>
      <p> Nếu cố ý gian lận, dù có tham gia sự kiện hay không đều bị khoá toàn bộ tài khoản chính và phụ. Sau khi kết thúc sự kiện ban tổ chức sẽ thu hồi toàn bộ phần thưởng.</p>
      <p class="lastTips">Quyết định của ban tổ chức là quyết định cuối cùng</p>
    </div>
    <div class="wardItem" v-else>
      <h5>Phần thưởng</h5>
      <img src="../../assets/img/wardImg.png" alt="" class="wardImg">
      <h5>Phần thưởng BXH STAR:</h5>
      <h6>Thưởng top 3:</h6>
      <p> Lần lượt chia 3%, 2.5%, 2% thưởng tiền mặt BXH (dựa vào số liệu cuối cùng mỗi ngày)</p>
      <h6>Thưởng top 10 BXH Tổng:</h6>
      <p>Hạng 1:</p>
      <p>Chia 5% tiền mặt BXH Tổng + huy chương Ngôi Sao STAR (30 ngày) + Xe Tường Vy (30 ngày) + 6000 đậu + 1 túi quà phòng Kara dành riêng cho STAR (50 xu)</p>
      <p>Hạng 2:</p>
      <p>Chia 4% tiền mặt BXH Tổng + huy chương Ngôi Sao STAR (30 ngày) + Xe Tường Vy (30 ngày) + 5000 đậu + 1 túi quà phòng Kara dành riêng cho STAR (50 xu)</p>
      <p>Hạng 3: </p>
      <p>Chia 3% tiền mặt BXH Tổng + huy chương Ngôi Sao STAR (30 ngày) + Xe Tường Vy (30 ngày) + 4000 đậu + 1 túi quà phòng Kara dành riêng cho STAR (50 xu)</p>
      <p>Hạng 4-10:</p>
      <p>Chia 2% tiền mặt BXH Tổng + Xe Tường Vy (15 ngày) + 2000 đậu + 1 túi quà phòng Kara dành riêng cho STAR (50 xu)</p>
      <h5>Thưởng Chủ Phòng:</h5>
      <h6>Thưởng top BXH Ngày</h6>
      <p>Lần lượt chia 2%, 1.5%, 1% thưởng tiền mặt BXH (dựa vào số liệu cuối cùng mỗi ngày)</p>
      <h6>Thưởng top 10 BXH Tổng:</h6>
      <p>Hạng 1:</p>
      <p>Chia 4% tiền mặt BXH Tổng + Danh Hiệu Phòng Ngôi Sao (14 ngày) + huy chương Chủ Phòng Ngôi Sao (30 ngày) + Xe Tường Vy (30 ngày) + 1 túi quà phòng Kara dành riêng cho STAR (50 xu)</p>
      <p>Hạng 2:</p>
      <p>Chia 3% tiền mặt BXH Tổng + Danh Hiệu Phòng Ngôi Sao (10 ngày) + huy chương Chủ Phòng Ngôi Sao (30 ngày) + Xe Tường Vy (30 ngày) + 1 túi quà phòng Kara dành riêng cho STAR (50 xu)</p>
      <p>Hạng 3: </p>
      <p>Chia 2% tiền mặt BXH Tổng + Danh Hiệu Phòng Ngôi Sao (7 ngày) + huy chương Chủ Phòng Ngôi Sao (30 ngày) + Xe Tường Vy (30 ngày) + 1 túi quà phòng Kara dành riêng cho STAR (50 xu)</p>
      <p>Hạng 4-10:</p>
      <p>Chia 1% tiền mặt BXH Tổng + Danh Hiệu Phòng Ngôi Sao (3 ngày) + Xe Tường Vy (15 ngày) + 1 túi quà phòng Kara dành riêng cho STAR (50 xu)</p>
      <h5>Thưởng BXH Ca Sĩ:</h5>
      <h6>Thưởng top BXH Ngày</h6>
      <p>Lần lượt chia 8%, 5%, 3% thưởng tiền mặt BXH (dựa vào số liệu cuối cùng mỗi ngày)</p>
      <h6>Thưởng top 10 BXH Tổng</h6>
      <p>Hạng 1: </p>
      <p>Huy chương Vua Qùa Tặng (30 ngày) + 3,000 Xu + Xe Tường Vy (30 ngày) + 1 túi quà Ngựa Gỗ (3,520 Xu) + 6,000 Đậu.</p>
      <p>Hạng 2: </p>
      <p>Huy chương Vua Qùa Tặng (30 ngày) + 2,500 Xu + Xe Tường Vy (30 ngày) + 1 túi quà Dải Ngân Hà (2,288 Xu) + 5,000 Đậu.</p>
      <p>Hạng 3: </p>
      <p>Huy chương Vua Qùa Tặng (30 ngày) + 2,000 Xu + Xe Tường Vy (30 ngày) + 1 túi quà Sao Tương Lai (1,188 Xu) + 4,000 Đậu.</p>
      <p>Hạng 4-10:</p>
      <p>Huy chương Vua Qùa Tặng (30 ngày) + 1,000 Xu + Xe Tường Vy (15 ngày) + 1 túi quà Quà Bất Ngờ (666 Xu) + 2,000 Đậu.</p>
      <h5>Thưởng BXH Bảo Hộ</h5>
      <p>Top 1 tặng quà cho top 3 BXH STAR tổng và BXH Ca Sĩ tổng sẽ nhận: huy chương Trùm Bảo Hộ (30 ngày) + 10000 đậu</p>
      <p class="mt">Ghi chú:</p>
      <p>1. Phần thưởng BXH ngày và BXH tổng sẽ được gửi trong vòng 7 ngày sau khi kết thúc sự kiện.</p>
      <p>2. Túi quà có thời hạn 14 ngày.</p>
      <p>3. Phần thưởng tiền mặt mời liên hệ Karaoke Now ( ID: 1000 ) để nhận.</p>
      <p class="lastTips">Quyết định của ban tổ chức là quyết định cuối cùng</p>
    </div>
  </div>
</template>

<script>
import getDate from "../../utils/getDate"
export default {
  data() {
    return {
      type: 1,
      stime: '',
      etime: ''
    }
  },
  computed: {
    timer() {
      return getDate(new Date(this.stime * 1000), 3) + ' - ' + getDate(new Date(this.etime * 1000), 3)
    }
  },
  created() {
    document.title = 'Thể lệ&Thưởng'
    this.stime = sessionStorage.getItem('stime')
    this.etime = sessionStorage.getItem('etime')
  },
  methods: {
    tabClick(val) {
      this.type = val
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: rgba(177, 33, 0, 1);
}
.red {
  color: #ffffaa !important;
  font-weight: 600;
}
.rule {
  padding: 0.54rem 0.26rem;
  font-weight: 500;
  h5 {
    text-align: center;
    margin: 0.31rem auto;
    color: rgba(255, 214, 115, 1);

    font-size: 0.28rem;
  }
  h6 {
    color: rgba(255, 214, 115, 1);
    font-size: 0.26rem;
    margin-top: 0.31rem;
  }
  p {
    font-size: 0.22rem;
    color: rgba(255, 243, 223, 1);
  }
  .tabs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 6.98rem;
    height: 0.98rem;
    background: url(../../assets/img/tasBg.png);
    background-size: 100% 100%;
    span {
      width: 3.46rem;
      height: 0.9rem;
      text-align: center;
      line-height: 0.9rem;
      &.act {
        background: url(../../assets/img/ruleAct.png);
        background-size: 100% 100%;
      }
    }
  }
  .wardImg {
    width: 6.5rem;
    height: 6.11rem;
    display: block;
    margin: 0 auto;
  }
  .actTime {
    text-align: center;
    color: rgba(255, 230, 181, 1);
    font-weight: 500;
    font-size: 0.26rem;
    margin-top: 0.27rem;
  }
  .ruleItem {
    .lastTips {
      margin-top: 5.8rem;
      text-align: center;
      color: #fff;
    }
  }
  .wardItem {
    .lastTips {
      margin-top: 2rem;
      text-align: center;
      color: #fff;
    }
  }
  .mt {
    margin-top: 0.35rem;
  }
}
@import "../../assets/scss/common.scss";
</style>
