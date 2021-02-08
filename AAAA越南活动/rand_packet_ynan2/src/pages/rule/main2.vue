<template>
  <div class="rule">
    <div class="tabs">
      <a @click.prevent="tabClick(0)" :class="{current:tab==0}" href="">Thể lệ</a>
      <a @click.prevent="tabClick(1)" :class="{current:tab==1}" href="">Thưởng</a>
    </div>
    <h6 class="time">Thời gian: 12h 20/2 ~ 24:00 28/2</h6>
    <div class="ruleTips" v-show="tab == 0">
      <h6>Thể lệ:</h6>
      <p>1. Toàn bộ người dùng đều có thể báo danh tham gia.</p>
      <p>2. Sau khi báo danh, thí sinh tặng quà xu cho bài hát, tại phòng Kara, đều nhận được điểm Bất Ngờ, khi điểm đạt cấp yêu cầu sẽ có thể mở hộp quà nhưng mỗi người mỗi ngày chỉ được mở 1 lần, quà từ hộp quà sẽ được gửi tự động vào tài khoản của thí sinh.</p>
      <p>
        3. Quy tắc xếp hạng
        <strong>BXH ngày: điểm Bất Ngờ= tổng mị lực quà xu tặng cho bài hát, tại phòng Kara, điểm càng nhiều xếp hạng càng cao, BXH ngày xoá hết vào 0h ngày hôm sau, BXH Ngày chỉ hiện top 100 thí sinh.</strong>
        <strong>BXH Tổng: xếp hạng theo tổng điểm Bất Ngờ trong thời gian sự kiện từ cao đến thấp, BXH Tổng chỉ hiện top 100 thí sinh.</strong>
        <strong>Trong tình hình thí sinh cùng điểm thì thí sinh đạt trước sẽ được xếp hạng trước.</strong>
      </p>
      <h6>Thời gian BXH Ngày:</h6>
      <p class="dayTime">
        Ngày1：12:00 20/2 - 00:00 21/2<br />
        Ngày2：00:00 21/2 - 00:00 22/2<br />
        Ngày3：00:00 22/2 - 00:00 23/2<br />
        Ngày4：00:00 23/2 - 00:00 24/2<br />
        Ngày5：00:00 24/2 - 00:00 25/2<br />
        Ngày6：00:00 25/2 - 00:00 26/2<br />
        Ngày7：00:00 26/2 - 00:00 27/2<br />
        Ngày8：00:00 27/2 - 00:00 28/2<br />
        Ngày9：00:00 28/2 - 24:00 28/2
      </p>
      <h6>Cấp may mắn:</h6>
      <p class="dayTime">
        Lv1: 500 điểm Bất Ngờ</br>
        Lv2: 1000 điểm Bất Ngờ</br>
        Lv3: 2000 điểm Bất Ngờ</br>
        Lv4: 5000 điểm Bất Ngờ</br>
        Lv5: 8000 điểm Bất Ngờ</br>
        Lv6: 10000 điểm Bất Ngờ</br>
        Hộp quà cuối cần tổng điểm Bất Ngờ trong thời gian sự kiện đạt 150k</br>
        Chú ý: điểm bất ngờ ngày sẽ xoá hết vào 0h ngày hôm sau, mời chú ý mở hộp quà.
      </p>
      <h6>Chú ý:</h6>
      <p>1.Nếu phát hiện thí sinh có hành vi gian lận, ban tổ chức sẽ loại ngay, xoá hết điểm dự thi và thu hồi toàn bộ phần thưởng, cấm tham gia các sự kiện khác.</p>
      <p>2.Top 1-3 lần lượt nhận phiếu quà nạp (Chỉ dùng 1 lần) 15%, 12%, 10%. 0h hôm sau hệ thống tự động gửi, ngày cuối sẽ gửi ngay khi kết thúc sự kiện.</p>
      <p>3.Toàn bộ Túi quà từ sự kiện có hạn sử dụng 14 ngày.</p>
      <p>4.Mỗi người mỗi ngày được mở tối đa 1 hộp quà, khi đạt đến cấp độ có thể mở nhiều hộp quà sẽ mặc định mở hộp quà cấp cao nhất. </p>
    </div>
    <div class="giftTips" v-show="tab ==1">
      <div class="giftBox">
        <span>
          <img src="../../assets/img/ruleGift/1.png" alt="">
          <strong>Huy chương Hộp Quà</strong>
        </span>
        <span>
          <img src="../../assets/img/ruleGift/2.png" alt="">
          <strong>Điểm Phú Hộ</strong>
        </span>
        <span>
          <img src="../../assets/img/ruleGift/4.png" alt="">
          <strong>Kỳ Lân Năm Mới</strong>
        </span>
        <span>
          <img src="../../assets/img/ruleGift/8.png" alt="">
          <strong>Xu và Đậu</strong>
        </span>

      </div>
      <h6>Thưởng cấp</h6>
      <p>Điểm Bất Ngờ mỗi ngày đạt cấp yêu cầu sẽ có thể mở hộp quà, mỗi người mỗi ngày được mở tối đa 1 hộp quà, khi đạt đến cấp độ có thể mở nhiều hộp quà sẽ mặc định mở hộp quà cấp cao nhất. Quà từ hộp quà sẽ được gửi tự động vào tài khoản, có thể vào Khoảnh Khắc để xem lịch sử nhận quà.</p>
      <h6>Thưởng BXH Ngày</h6>
      <p>Top 1-3 lần lượt nhận phiếu quà nạp 15%, 12%, 10%. 0h hôm sau hệ thống tự động gửi, ngày cuối sẽ gửi ngay khi kết thúc sự kiện.</p>
      <h6>Thưởng BXH Tổng:</h6>
      <p>Hạng 1: Huy chương Hộp Quà(31 ngày)+Sao Ước Nguyện(1880 xu)+ Kỳ Lân Năm Mới(31 ngày) +Trang sức May Mắn(31 ngày)+ 3000 xu + 5000 đậu</p>
      <p>Hạng 2: Huy chương Hộp Quà(31 ngày)+Sao Ước Nguyện(1880 xu)+ Kỳ Lân Năm Mới(31 ngày) + Trang sức May Mắn(31 ngày)+2000 xu +3000 đậu</p>
      <p>Hạng 3: Huy chương Hộp Quà(31 ngày)+Sao Ước Nguyện(1880 xu)+ Kỳ Lân Năm Mới(31 ngày) + Trang sức May Mắn(31 ngày)+1000 xu + 2000 đậu</p>
      <p>Hạng 4-10: Huy chương Hộp Quà(31 ngày)+Kỳ Lân Năm Mới(31 ngày)+ Trang sức May Mắn(31 ngày)+500 xu + 1000 đậu</p>
      <h6>Chú ý:</h6>
      <p>1. Phiếu quà nạp nhận từ sự kiện có thời hạn 1 ngày kể từ khi nhận, mời sử dụng kịp thời.</p>
      <p>2. Toàn bộ Túi quà từ sự kiện có hạn sử dụng 14 ngày.</p>
      <p>3. Phần thưởng BXH Tổng sẽ gửi trong vòng 7 ngày sau khi kết thúc sự kiện</p>
    </div>
    <p class="lastTips">Quyết định của ban tổ chức là quyết định cuối cùng!</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: 0
    }
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
  background-color: rgba(173, 43, 67, 1);
  .rule {
    padding: 0.36rem 0.27rem 0;
    .tabs {
      width: 6.98rem;
      height: 0.98rem;
      background: url(../../assets/img/tabs.png);
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      a {
        display: block;
        width: 3.66rem;
        height: 0.9rem;
        text-align: center;
        line-height: 0.9rem;
        color: #fddc55;
        font-weight: 700;
        font-size: 0.32rem;
        &.current {
          color: #a24e04;
          background: url(../../assets/img/actTabs.png);
          background-size: 100% 100%;
        }
      }
    }
    .time {
      text-align: center;
      font-weight: 600;
      color: rgba(255, 204, 223, 1);
      margin-top: 0.5rem;
    }
    h6 {
      font-weight: 600;
      color: rgba(254, 232, 152, 1);
      margin: 0.5rem 0 0.2rem;
    }
    p {
      font-size: 0.24rem;
      font-weight: 500;
      margin-top: 0.15rem;
      padding-left: 0.2rem;
      line-height: 0.4rem;
      strong {
        font-size: 0.24rem;
        display: block;
        padding-left: 0.15rem;
      }
    }
    .ruleTips {
      margin-top: 0.61rem;
      .dayTime {
        line-height: 0.5rem;
      }
    }
    .giftTips {
      .giftBox {
        padding: 0 0.37rem;
        margin-top: 0.15rem;
        span {
          display: inline-block;
          vertical-align: top;
          width: 49%;
          margin-bottom: 0.2rem;
          // margin: 0.29rem 0.6rem 0 0;
          img {
            display: block;
            width: 1.6rem;
            height: 1.6rem;
            margin: 0 auto;
          }
          strong {
            display: block;
            text-align: center;
            color: #fff3d2;
            font-size: 0.24rem;
            font-weight: 600;
            margin-top: 0.15rem;
          }
        }
        span:nth-child(3),
        span:nth-child(6) {
          margin-right: 0;
        }
      }
    }
    .lastTips {
      text-align: center;
      margin: 0.94rem 0 0.15rem;
      color: rgba(221, 85, 110, 1);
      font-size: 0.24rem;
      font-weight: 500;
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
