<template>
  <div class="rule">
    <div class="taskTabs">
      <span class="p1Tab1" :class="{act:type==1}" @click="tabClick(1)"></span>
      <span class="p1Tab2" :class="{act:type==2}" @click="tabClick(2)"></span>
    </div>
    <div class="gifts" v-if="type == 1">
      <h5>Thời gian</h5>
      <p>18:00:00 25/11 – 20:00:00 11/1</p>
      <h5>Phần thưởng</h5>
      <div class="giftsItem">
        <div class="item" v-for="(item,index) in 28" :key="index">
          <div class="imgBg">
            <img :src="require(`../../assets/img/ruleGifts/${item}.png`)" alt="">
          </div>
          <strong v-html="giftName[index]"></strong>
        </div>
      </div>
      <h5>Thưởng BXH Lễ Hội Gala – Rút thưởng Gala</h5>
      <h6 class="minTop">Hạng nhất:</h6>
      <p>Huy chương Lễ Hội Gala (1 tháng) + xe Thảm Đỏ (1 tháng) + 3000 xu + 6000 đậu</p>
      <h6>Hạng nhì:</h6>
      <p>Huy chương Lễ Hội Gala (1 tháng) + xe Thảm Đỏ (1 tháng) + 2000 xu + 4000 đậu</p>
      <h6>Hạng ba:</h6>
      <p>Huy chương Lễ Hội Gala (1 tháng) + xe Thảm Đỏ (1 tháng) + 1500 xu + 3000 đậu</p>
      <h6>Hạng 4-10:</h6>
      <p>Huy chương Lễ Hội Gala (1 tháng) + xe Thảm Đỏ (1 tháng) + 1000 xu + 2000 đậu</p>
      <h6>Hạng 11-30:</h6>
      <p>Huy chương Lễ Hội Gala (15 ngày) + xe Thảm Đỏ (1 tháng) + 500 xu + 1000 đậu</p>
      <h5>Thưởng cấp MVP</h5>
      <img src="../../assets/img/rules/img1.png" alt="" class="img1">
      <p class="ps">Ghi chú: rương phần thưởng mỗi cấp chỉ được nhận 1 lần</p>
      <h5>Phần thưởng BXH MVP</h5>
      <h6 class="minTop">Hạng nhất:</h6>
      <p>Chứng nhận MVP (1 năm) + huy chương MVP (1 tháng) + xe Thảm Đỏ (1 tháng) + trang sức MVP (1 tháng) + VIP (1 tháng) + Túi quà Kỳ Lân 7 Màu (399 xu)x3 + 6000 xu + 6000 đậu</p>
      <h6>Hạng nhì:</h6>
      <p>Chứng nhận MVP (6 tháng) + huy chương MVP (1 tháng) + xe Thảm Đỏ (1 tháng) + trang sức MVP (1 tháng) + VIP (1 tháng) + Túi quà Kỳ Lân 7 Màu (399 xu)x3 + 4500 xu + 4500 đậu</p>
      <h6>Hạng ba:</h6>
      <p>Chứng nhận MVP (3 tháng) + huy chương MVP (1 tháng) + xe Thảm Đỏ (1 tháng) + trang sức MVP (1 tháng) + VIP (1 tháng) + Túi quà Kỳ Lân 7 Màu (399 xu)x3 + 3000 xu + 3000 đậu</p>
      <h6>Hạng 4-5:</h6>
      <p>Huy chương MVP (1 tháng) + xe Thảm Đỏ (1 tháng) + trang sức MVP (1 tháng) + VIP (1 tháng) + Túi quà Kỳ Lân 7 Màu (399 xu)x2 + 2000 xu + 2000 đậu</p>
      <h6>Hạng 6-10:</h6>
      <p>Huy chương MVP (1 tháng) + xe Thảm Đỏ (1 tháng) + trang sức MVP (1 tháng) + VIP (1 tháng) + Túi quà Kỳ Lân 7 Màu (399 xu)x1 + 1500 xu + 1500 đậu</p>
      <h5>Phần thưởng mở khoá Quà Vinh Danh</h5>
      <img src="../../assets/img/rules/img2.png" alt="" class="img2">
      <p class="ps">Ghi chú: thưởng mỗi cấp chỉ được nhận 1 lần</p>
      <h5>Phần thưởng BXH Quà Vinh Danh mỗi loại</h5>
      <img src="../../assets/img/rules/img3.png" alt="" class="img3">
      <h5 class="other">Cách sử dụng phần thưởng</h5>
      <p>
        1. Phần thưởng sẽ được gửi trong vòng 14 ngày làm việc sau khi kết thúc sự kiện.<br />
        2. Tất cả phần thưởng túi quà đều có thời hạn 7 ngày.<br />
        3. Phần thưởng Vinh Danh sẽ hiển thị thông tin của người nhận thưởng trên giao diện mua quà.
      </p>
    </div>
    <div class="ruleItem" v-else>
      <h5>Thời gian</h5>
      <p>18:00:00 25/11 – 20:00:00 11/1</p>
      <h5>Báo danh</h5>
      <!-- <h6 class="minTop">Pendaftaran Acara</h6> -->
      <p>1. Nhấn báo danh để tham gia sự kiện Rút Thưởng Gala, MVP, Quà Vinh Danh. Sau khi báo danh mới bắt đầu tính điểm sự kiện. Ưu đãi nạp 12% và Thời Khắc Vĩ Đại không cần báo danh tham gia.</p>
      <h5>Rút Thưởng Gala</h5>
      <h6 class="minTop">Thể lệ Rút Thưởng Gala</h6>
      <p>
        1. Hoàn thành nhiệm vụ mỗi ngày sẽ nhận được Xu Gala. Xu Gala được gửi tự động, khi qua ngày sẽ xoá hết. Vui lòng sử dụng kịp thời.<br />
        2. Nhiệm vụ không xoá bài hát đăng công khai hôm trước, sẽ kiểm tra bài hát đăng công khai hôm trước lúc 12:00 hôm nay. Nếu bài hát chưa bị xoá mới tính là xong nhiệm vụ và phát thưởng 20 Xu Gala.<br />
        3. Xu Gala dùng để rút thưởng, sau khi rút trúng sẽ nhận ngay phần thưởng.<br />
        4. Thẻ Gala dùng để bình chọn trong sự kiện Nhân Vật Tiêu Biểu.
      </p>
      <h6>Thể lệ BXH Lễ Hội Gala - Rút Thưởng Gala</h6>
      <p>1. Dựa vào điểm Vui Vẻ nhận được sau khi báo danh. Điểm Vui Vẻ = số xu Gala đã sử dụng. Nếu điểm số bằng nhau, ai đạt đến điểm số trước sẽ xếp hạng cao hơn.</p>
      <h5>MVP</h5>
      <h6 class="minTop">Thể lệ MVP</h6>
      <p>1. Tặng 1 xu quà tăng 10 điểm MVP, điểm MVP đạt 500, 5000, 40000, 80000, 160000, 240000, 320000, 400000 được mở rương phần thưởng tương ứng.</p>
      <h6>Thể lệ BXH MVP</h6>
      <p>1. Dựa vào mị lực quà xu tặng tại phòng Kara hoặc bài hát sau khi báo danh. Nếu điểm số bằng nhau, ai đạt đến điểm số trước sẽ xếp hạng cao hơn.</p>
      <h5>Quà vinh danh</h5>
      <h6 class="minTop">Thể lệ quà vinh danh</h6>
      <p>1. Trong 6 loại quà tặng chỉ định, người nhận được số lượng quà nhiều nhất trong mỗi loại sẽ được vinh danh tại quà tặng tương ứng.</p>
      <h6>Thể lệ BXH Quà Vinh Danh</h6>
      <p>1. Dựa vào số lượng quà tặng chỉ định mà thí sinh nhận được sau khi báo danh. Nếu điểm số bằng nhau, ai đạt đến điểm số trước sẽ xếp hạng cao hơn.</p>
      <h5>Ưu đãi nạp 12%</h5>
      <h6 class="minTop">Thể lệ Ưu Đãi Nạp 12%</h6>
      <p>
        1. Trong ngày Lễ Tạ Ơn 26/11 và Lễ Giáng Sinh 25/12, nạp xu với mức bất kỳ sẽ được tặng thêm 12% số xu nạp (không bao gồm xu tặng từ hệ thống).<br />
        2. Trong thời gian sự kiện sau khi nạp thành công sẽ nhận ngay xu thưởng.
      </p>
      <h6>Thể lệ xếp hạng Ưu Đãi Nạp 12%</h6>
      <p>1. Trong ngày Lễ Tạ Ơn 26/12 và Lễ Giáng Sinh 25/12, mỗi dịp sẽ có 1 bảng xếp hạng nạp, xếp hạng dựa theo số xu nạp.</p>
      <h5>Thời Khắc Vĩ Đại</h5>
      <h6 class="minTop">Thể lệ Thời Khắc Vĩ Đại</h6>
      <p>1. Trong thời gian từ 21:00:00 – 21:10:00, điểm số sự kiện nhận được sẽ tăng 10%.</p>
      <h6>Vua Ca Nhạc Gala </h6>
      <p class="ytime">30/11 – 8/12</p>
      <h6>Nam Nữ Thần Kara</h6>
      <p class="ytime">7/12 – 17/12</p>
      <h6>Gương Mặt Đại Diện</h6>
      <p class="ytime">14/12-22/12</p>
      <h6>Gia Tộc Mạnh Nhất </h6>
      <p class="ytime">5/1 – 7/1</p>
      <h5 class="other">Quy định khác</h5>
      <p>Trong quá trình diễn ra sự kiện, nếu phát hiện người dùng gian lận trong sự kiện, ban tổ chức sẽ dựa theo mức độ vi phạm để xử lý, người vi phạm sẽ bị loại khỏi sự kiện hoặc khoá tài khoản. Bao gồm nhưng không giới hạn bởi các hành vi sau:</p>
      <p>
        1. Trộm hoặc mượn tài khoản người khác để tham gia sự kiện.<br />
        2. Cùng 1 người dùng nhiều tài khoản để tham gia sự kiện.<br />
        3. Bình luận ác ý, quảng cáo,... trong bài hát dự thi hoặc đối với thí sinh dự thi.<br />
        4. Toàn bộ các hành vi gian lận và vi phạm quy định khác.
      </p>
      <p>Nếu cố ý gian lận hoặc vi phạm quy định, cho dù có tham gia dự thi hay không, người vi phạm đều bị khoá vĩnh viễn toàn bộ tài khoản chính và phụ. Đồng thời, ban tổ chức sẽ thu hồi toàn bộ phần thưởng của người vi phạm.</p>
    </div>
    <p class="lastTips">Quyết định của ban tổ chức là quyết định cuối cùng.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: 1,
      giftName: [
        'Chứng nhận MVP',
        'Quà Vinh Danh',
        'Huy chương Lễ Hội Gala',
        'Huy chương MVP Nhỏ',
        'Huy chương MVP Vừa',
        'Huy chương MVP Cao',
        'Huy chương MVP',
        'Huy chương Ủng Hộ Bạn',
        'Huy chương Hoa Hồng',
        'Huy chương Kỳ Lân 7 Màu',
        'Huy chương Que Cổ Vũ',
        'Huy chương Siêu Sao',
        'Huy chương Pháo Hoa',
        'Xe Thảm Đỏ',
        'Xe Tuần Lộc',
        'Xe Ngọc Tiên',
        'Trang sức MVP Vừa',
        'Trang sức MVP Cao',
        'Trang sức MVP',
        'Túi quà rút thưởng',
        'Túi quà thưởng MVP',
        'Túi quà thưởng Ưu Đãi Nạp',
        'Xe McLaren',
        'Xe Bão Tố',
        'Phiếu nạp',
        'Phiếu tặng',
        'Vô số xu',
        'Vô số đậu'
      ]
    }
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
  background-color: RGBA(35, 27, 40, 1);
  .rule {
    padding: 0.37rem 0.18rem 0;
    .taskTabs {
      display: flex;
      justify-content: center;
      span {
        width: 3.54rem;
        height: 0.88rem;
      }
      .p1Tab1 {
        background: url(../../assets/img/rules/ruleTab1.png);
        background-size: 100% 100%;
        &.act {
          background: url(../../assets/img/rules/ruleTab1_act.png);
          background-size: 100% 100%;
        }
      }

      .p1Tab2 {
        background: url(../../assets/img/rules/ruleTab2.png);
        background-size: 100% 100%;
        &.act {
          background: url(../../assets/img/rules/ruleTab2_act.png);
          background-size: 100% 100%;
        }
      }
    }
    .gifts,
    .ruleItem {
      margin-top: 0.1rem;
      padding: 0 0.08rem;
      h5 {
        font-size: 0.32rem;
        color: rgba(254, 249, 120, 1);
        font-weight: bold;
        margin-top: 0.4rem;
      }
      h6 {
        font-size: 0.28rem;
        color: rgba(255, 128, 34, 1);
        padding-left: 0.64rem;
        margin-top: 0.5rem;
      }
      p {
        font-size: 0.28rem;
        padding-left: 0.64rem;
      }
      .ps {
        font-size: 0.31rem;
        padding-left: 0;
      }
      img {
        margin: 0.18rem auto;
      }
      .img1 {
        width: 7.02rem;
        height: 14.18rem;
      }
      .img2 {
        width: 7.02rem;
        height: 7.02rem;
      }
      .img3 {
        width: 7.02rem;
        height: 18.36rem;
      }
    }
    .giftsItem {
      width: 6.31rem;
      height: 15.57rem;
      padding: 0.81rem 0.48rem 0;
      background: url(../../assets/img/ruleGifts/rulebg.png);
      background-size: 100% 100%;
      margin-left: -0.15rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .item {
        width: 25%;
        .imgBg {
          width: 1.4rem;
          height: 1.4rem;
          background: url(../../assets/img/luckBg.png);
          background-size: 100% 100%;
          margin: 0 auto;
          img {
            width: 1.4rem;
            height: 1.4rem;
            margin: 0 auto;
          }
        }
        strong {
          display: block;
          width: 100%;
          height: 0.6rem;
          font-size: 0.24rem;
          text-align: center;
        }
      }
    }
    .minTop {
      margin-top: 0.29rem !important;
    }
    .ytime {
      color: rgba(252, 245, 193, 1);
    }
    .other {
      margin-bottom: 0.28rem;
    }
  }
  .lastTips {
    text-align: center;
    margin: 1.25rem 0 0.6rem;
  }
}
@import "../../assets/scss/common.scss";
</style>
