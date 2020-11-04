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
      <p>1.KOL đã ký hợp đồng sẽ được mặc định tham gia 2 BXH là BXH KOL và BXH Phòng. Nếu mình không có tạo Phòng, thì sẽ không tham gia BXH Chủ Phòng.</p>
      <p>2.Người dùng chưa ký hợp đồng có thể báo danh và sẽ được mặc định tham gia BXH Ca Sĩ.</p>
      <p>3.Idol có thể báo danh tham gia BXH Ca Sĩ, tuy nhiên sẽ không tính quà tặng khi livestream; quà tặng khi lên mic thường và bài hát sẽ được tính điểm bình thường. </p>
      <p class="red">4.Sau khi người dùng (chưa ký hợp đồng) báo danh thành công, điểm số sẽ được bắt đầu tính vào BXH Ca Sĩ. Thành tích sự kiện kỳ này của người dùng (chưa ký hợp đồng) sẽ chỉ được tính vào BXH Ca Sĩ.
        <br />(Ghi chú: nếu ký hợp đồng trong thời gian sự kiện thì vẫn được hưởng chia quà tặng như thường, nhưng sẽ không được xếp vào BXH KOL và BXH Chủ Phòng)
      </p>
      <!-- <p>5. Sau khi báo danh xong, điểm số mới bắt đầu tính vào BXH, người dùng chưa ký hợp đồng chỉ được tính điểm vào BXH Ca Sĩ. -->
      <!-- <br /> (Ghi chú: nếu ký hợp đồng trong thời gian sự kiện vẫn được chia quà tặng như thường, chỉ không được xếp vào BXH KOL và BXH chủ phòng)</p> -->
      <h6>Xếp hạng:</h6>
      <p>1.BXH KOL, Chủ Phòng KOL và Ca Sĩ đều sẽ được chia thành BXH Ngày và BXH Tổng.</p>
      <p>2.BXH KOL sẽ được xếp dựa theo số Xu quà tặng đặc biệt mà KOL nhận được từ bài hát và trong phòng Kara.</p>
      <p>3.BXH Chủ Phòng KOL sẽ được xếp dựa theo số Xu quà tặng đặc biệt mà KOL nhận được trong phòng của mình.</p>
      <p>4.BXH Ca Sĩ sẽ được xếp dựa theo số Xu quà tặng đặc biệt mà ca sĩ nhận được từ bài hát và trong phòng Kara.</p>
      <p>BXH Ngày và Tổng sẽ chỉ hiển thị top 100. Nếu bằng điểm thì người đạt trước sẽ được xếp cao hơn. </p>
      <!-- <p>6. Quà tặng yêu cầu của sự kiện kỳ này là quà bài hát Thiệp Anh Đào (10 xu), Hẹn Ước (129 xu), quà phòng Kara Khoá Đồng Tâm (10 xu), Khắc Tên Nhau (129 xu).</p> -->
      <P class="mt">Ghi chú: mọi thắc mắc về ký hợp đồng để trở thành KOL, xin vui lòng liên hệ Karaoke Now Official (ID: 12) để nhận được hỗ trợ.</P>
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
      <h5>Thưởng BXH KOL:</h5>
      <h6>Thưởng top 3:</h6>
      <p> Lần lượt chia 3%, 2.5%, 2% thưởng tiền mặt BXH (dựa vào số liệu cuối cùng mỗi ngày)</p>
      <h6>Thưởng top 10 BXH Tổng:</h6>
      <p>Hạng 1:</p>
      <p>Chia 5% tiền mặt BXH Tổng + huy chương Ngôi Sao KOL (30 ngày) + Xe Tường Vy (30 ngày) + 6000 đậu + 1 túi quà phòng Kara dành riêng cho KOL (50 xu)</p>
      <p>Hạng 2:</p>
      <p>Chia 4% tiền mặt BXH Tổng + huy chương Ngôi Sao KOL (30 ngày) + Xe Tường Vy (30 ngày) + 5000 đậu + 1 túi quà phòng Kara dành riêng cho KOL (50 xu)</p>
      <p>Hạng 3: </p>
      <p>Chia 3% tiền mặt BXH Tổng + huy chương Ngôi Sao KOL (30 ngày) + Xe Tường Vy (30 ngày) + 4000 đậu + 1 túi quà phòng Kara dành riêng cho KOL (50 xu)</p>
      <p>Hạng 4-10:</p>
      <p>Chia 2% tiền mặt BXH Tổng + Xe Tường Vy (15 ngày) + 2000 đậu + 1 túi quà phòng Kara dành riêng cho KOL (50 xu)</p>
      <h5>Thưởng BXH Chủ Phòng:</h5>
      <h6>Thưởng top BXH Ngày</h6>
      <p>Lần lượt chia 2%, 1.5%, 1% thưởng tiền mặt BXH (dựa vào số liệu cuối cùng mỗi ngày)</p>
      <h6>Thưởng top 10 BXH Tổng:</h6>
      <p>Hạng 1:</p>
      <p>Chia 4% tiền mặt BXH Tổng + Danh Hiệu Phòng Ngôi Sao (14 ngày) + huy chương Chủ Phòng Ngôi Sao (30 ngày) + Xe Tường Vy (30 ngày) + 1 túi quà phòng Kara dành riêng cho KOL (50 xu)</p>
      <p>Hạng 2:</p>
      <p>Chia 3% tiền mặt BXH Tổng + Danh Hiệu Phòng Ngôi Sao (10 ngày) + huy chương Chủ Phòng Ngôi Sao (30 ngày) + Xe Tường Vy (30 ngày) + 1 túi quà phòng Kara dành riêng cho KOL (50 xu)</p>
      <p>Hạng 3: </p>
      <p>Chia 2% tiền mặt BXH Tổng + Danh Hiệu Phòng Ngôi Sao (7 ngày) + huy chương Chủ Phòng Ngôi Sao (30 ngày) + Xe Tường Vy (30 ngày) + 1 túi quà phòng Kara dành riêng cho KOL (50 xu)</p>
      <p>Hạng 4-10:</p>
      <p>Chia 1% tiền mặt BXH Tổng + Danh Hiệu Phòng Ngôi Sao (3 ngày) + Xe Tường Vy (15 ngày) + 1 túi quà phòng Kara dành riêng cho KOL (50 xu)</p>
      <h5>Thưởng BXH Ca Sĩ:</h5>
      <h6>Thưởng top 3 BXH Ngày</h6>
      <p>Lần lượt nhận được chia 8%, 5%, 3% thưởng tiền mặt (dựa vào số liệu cuối cùng hàng ngày)</p>
      <h6>Thưởng top 10 BXH Tổng</h6>
      <p>Hạng 1: </p>
      <p>Huy chương Vua Qùa Tặng (30 ngày) + 3,000 Xu + Xe Tường Vy (30 ngày) + 1 túi quà Bướm Sặc Sỡ (2,250 Xu) + 6,000 Đậu.</p>
      <p>Hạng 2: </p>
      <p>Huy chương Vua Qùa Tặng (30 ngày) + 2,500 Xu + Xe Tường Vy (30 ngày) + 1 túi quà Đu Quay Hồng (1,520 Xu) + 5,000 Đậu.</p>
      <p>Hạng 3: </p>
      <p>Huy chương Vua Qùa Tặng (30 ngày) + 2,000 Xu + Xe Tường Vy (30 ngày) + 1 túi quà Sao Tương Lai (1,188 Xu) + 4,000 Đậu.</p>
      <p>Hạng 4-10:</p>
      <p>Huy chương Vua Qùa Tặng (30 ngày) + 1,000 Xu + Xe Tường Vy (15 ngày) + 1 túi quà Tim Chạm Tim (320 Xu) + 2,000 Đậu.</p>
      <h5>Thưởng BXH bảo hộ</h5>
      <p>Top 1 tặng quà cho top 3 của BXH KOL tổng và BXH Ca Sĩ tổng sẽ nhận được: Huy Chương Trùm Bảo hộ (30 ngày) + 10,000 Đậu.</p>
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
  background-color: rgba(131, 56, 208, 1);
}
.red {
  color: red !important;
  font-weight: 600;
}
.rule {
  padding: 0.54rem 0.26rem;
  font-weight: 500;
  h5 {
    text-align: center;
    margin: 0.31rem auto;
    color: rgba(255, 218, 124, 1);

    font-size: 0.28rem;
  }
  h6 {
    color: rgba(48, 255, 238, 1);
    font-size: 0.26rem;
    margin-top: 0.31rem;
  }
  p {
    font-size: 0.22rem;
    color: rgba(230, 164, 255, 1);
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
    color: rgba(255, 230, 182, 1);
    font-weight: 500;
    font-size: 0.26rem;
    margin-top: 0.27rem;
  }
  .ruleItem {
    .lastTips {
      margin-top: 5.8rem;
      text-align: center;
      color: rgba(255, 168, 208, 1);
    }
  }
  .wardItem {
    .lastTips {
      margin-top: 2rem;
      text-align: center;
      color: rgba(255, 168, 208, 1);
    }
  }
  .mt {
    margin-top: 0.35rem;
  }
}
@import "../../assets/scss/common.scss";
</style>
