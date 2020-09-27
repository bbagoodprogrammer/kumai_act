<template>
  <div class="rule">
    <div class="tabs">
      <span :class="{act:type==1}" @click="tabClick(1)">Phần thưởng</span>
      <span :class="{act:type==2}" @click="tabClick(2)">Thể lệ</span>
    </div>
    <div class="gift" v-if="type == 1">
      <h3>Phần thưởng</h3>
      <img src="../../assets/img/gift.png" alt="" class="giftImg">
      <h6>Thưởng hạng 10 đầu Bảng Võ Đài kỳ này:</h6>
      <p>Hạng 1</p>
      <p>300 xu + VIP 1 tháng + 1000 đậu</p>
      <p>Hạng 2</p>
      <p>200 xu + VIP 1 tháng + 600 đậu</p>
      <p>Hạng 3 </p>
      <p>100 xu + VIP 1 tháng + 400 đậu</p>
      <p>Hạng 4-10</p>
      <p>50 xu + VIP 1 tháng + 200 đậu</p>
      <h6>Thưởng hạng 100 đầu Vua Ca Hát Mùa này</h6>
      <p>Hạng 1-3: Vua Âm Nhạc</p>
      <p>Huy chương Vua Âm Nhạc + 600 xu + VIP 1 tháng + 1200 đậu</p>
      <p>Hạng 4-10: Thầy Âm Nhạc</p>
      <p>Huy chương Thầy Âm Nhạc + 500 xu + Túi quà 2 + VIP 1 tháng + 1000 đậu</p>
      <p>Hạng 11-50: Sao Âm Nhạc </p>
      <p>Huy chương Sao Âm Nhạc + 300 xu + VIP 1 tháng + 600 đậu</p>
      <p>Hạng 51-100: Âm Nhạc Sĩ</p>
      <p>Huy chương Âm Nhạc Sĩ + 100 xu + VIP 1 tháng + 300 đậu</p>
      <h6 class="red">Thường dự thi:</h6>
      <p class="red">Mỗi người báo danh thành công (có 1 bài hát tham gia thi đấu trước khi sự kiện kết thúc), sau khi sự kiện kết thúc nhận thưởng 50 đậu.</p>
      <h6>Thưởng giám khảo:</h6>
      <p>1. Mỗi giám khảo mỗi ngày bình chọn 30 bài đầu, mỗi chọn 1 bài được thưởng 2 đậu. (gửi thưởng ngay sau chọn bài)<br />
        2. Mỗi kỳ liên tục chọn trúng 5 bài có thể nhận ngẫu nhiên 1 túi quà Hộp Nhạc (360 đậu) / Túi quà Kẹo Bông (1 xu) / VIP (2 ngày) / Chiến Đấu Cơ (2 ngày).</p>
      <h6>Danh hiệu và quyền giám khảo:</h6>
      <img src="../../assets/img/chTab.png" alt="" class="chTabImg">
      <p>Chú ý: </p>
      <p>1. Danh hiệu sẽ chỉ hiển thị vào kỳ sau.</p>
      <p>2. Quyền bỏ phiếu và danh hiệu giám khảo nhận được trong kỳ này sẽ chỉ có hiệu lực trong kỳ sau.</p>
      <p>3. Nếu kỳ này đạt danh hiệu Tai Vàng, trong kỳ sau mỗi lần bỏ phiếu sẽ tương đương 2 phiếu của người dùng vô danh hiệu. Nếu kỳ này đạt danh hiệu Tai Bạch Kim, trong kỳ sau mỗi lần bỏ phiếu sẽ tương đương 3 phiếu của người dùng vô danh hiệu.</p>
      <h6>Về phần thưởng:</h6>
      <p>1. Phần thưởng túi quà có thời hạn 14 ngày.</p>
      <p>2. Đậu thưởng dành cho giám khảo sẽ gửi ngay sau khi chọn, phần thưởng chọn trúng sẽ gửi sau khi sự kiện kỳ này kết thúc. Phần thưởng hạng 10 đầu kỳ này sẽ gửi trong vòng 7 ngày sau khi kết thúc kỳ này, phần thưởng hạng 100 đầu Vua Ca Hát Mùa sẽ gửi trong vòng 7 ngày sau khi kết thúc sự kiện cả mùa.</p>
    </div>
    <div class="ruleTips" v-else>
      <div class="actTime">
        <p>Thời gian thi đấu kỳ này:</p>
        <p class="timeItem">{{stime}}-{{etime}}</p>
        <p>Thời gian báo danh kỳ này:</p>
        <p class="timeItem">{{pstime}}-{{petime}}</p>
        <p>Thời gian ghép cặp đấu kỳ này:</p>
        <p class="timeItem">10:00:00-22:00:00, trong thời gian ghép mỗi 2 giờ ghép cặp đấu 1 lần, tức là 10:00:00, 12:00:00, 14:00:00, 16:00:00, 18:00:00, 20:00:00, 22:00:00, ngày thi đấu cuối cùng của kỳ này chỉ ghép cặp đấu vào 10:00:00, 12:00:00, nếu quá thời gian sẽ không ghép nữa.</p>
        <p>Thời gian thi đấu mùa này: </p>
        <p class="timeItem">{{zsetime}}-{{zeetime}}， mỗi thứ 6 đến thứ 2 tuần sau.</p>
        <!-- <p>活動時間規律說明：</p>
        <div class="timeTips">
          <p>每期時間：</p>
          <p>每週五18:00:00-每週一20:00:00</p>
          <p>賽季時間：</p>
          <p>每3個自然月為一個賽季</p>
        </div> -->
      </div>
      <h3>Thể lệ</h3>
      <h6>Thể lệ tham gia:</h6>
      <div class="mTips">
        <p>1. Cần hát ca khúc chỉ định và đăng sau {{stime}} để tham dự (tức cần nhấn hát ca khúc được chuyển đến sau khi nhấn tham gia võ đài).</p>
        <p>2. Chỉ được tham gia bằng bài hát đơn ca.</p>
        <p>3. Mỗi bài hát chỉ được tham dự 1 lần.</p>
        <p>4. Mỗi kỳ có thể chọn nhiều bài hátk để dự thi.</p>
        <p>5. Bài hát dự thi phải là bài hát hoàn chỉnh (thời gian bài hát chỉ có thể ngắn hơn thời gian nhạc nền 30s), nếu không sẽ không thể gửi bài hát</p>
        <p>6. Nếu sau khi chọn bài hát dự thi và ghép cặp đấu xong, thí sinh xoá bài hát dự thi xem như bỏ thi đấu, thành tích bài hát dự thi của cả 2 đều tính là thất bại, thí sinh còn lại tiếp tục tham gia lượt ghép cặp đấu tiếp theo.</p>
        <p>7. Hệ thống sẽ tự động ghép 2 thí sinh dự thi có ca khúc tương đồng thành 1 cặp đấu, sau đó cho giám khảo bình chọn bằng cách bỏ phiếu. Tính đến khi sự kiện kết thúc, thí sinh nào nhận nhiều phiếu hơn sẽ thắng cuộc.</p>
        <p>8. Nếu 1 bài hát cả 2 thí sinh nhận tổng cộng từ 50 phiếu trở lên, và 1 thí sinh chiếm từ 80% số phiếu trở lên (tức là số phiếu của 1 thí sinh chia cho tổng số phiếu của bài hát đạt từ 80% trở lên), thí sinh thắng cuộc nhận thêm 2 điểm, thí sinh thua cuộc trừ 1 điểm. Nếu bài hát nhận dưới 50 phiếu hoặc thí sinh thắng cuộc không chiếm tới 80% số phiếu, thí sinh thắng cuộc nhận thêm 1 điểm, thí sinh thua cuộc trừ 1 điểm.Nếu số điểm hai bên bằng nhau, hai người thi đấu sẽ không nhận thêm hoặc trừ điểm, người giám khảo cũng không tính vào chọn trúng.</p>
      </div>
      <h6>Thể lệ xếp hạng Bảng Võ Đài mỗi kỳ: </h6>
      <p>1. Xếp hạng theo điểm số thí sinh nhận được mỗi kỳ. Nếu điểm số bằng nhau, bài hát nhận nhiều phiếu hơn sẽ xếp hạng cao hơn.</p>
      <h6>Thể lệ Bảng Vua Ca Hát Mùa: </h6>
      <p>1. Xếp hạng dựa theo cấp, tức là tổng điểm nhận được trong toàn bộ các kỳ. Nếu điểm số bằng nhau, thí sinh nhận nhiều phiếu hơn sẽ xếp hạng cao hơn.</p>
      <p>2. Bắt đầu mỗi kỳ, cấp thí sinh mặc định sẽ là 0. Cứ nhận 1 điểm sẽ tăng 1 cấp, trừ 1 điểm bị giảm 1 cấp, cấp có thể là số âm.</p>
      <h3>Quy định khác</h3>
      <p>Trong quá trình diễn ra sự kiện, nếu phát hiện người dùng gian lận trong sự kiện, ban tổ chức sẽ dựa theo mức độ vi phạm để xử lý, người vi phạm sẽ bị loại khỏi sự kiện hoặc khoá tài khoản. Bao gồm các hành vi sau:</p>
      <p>1. Bài hát dự thi không đúng quy định, bài hát không do thí sinh biểu diễn hoặc dùng/thu bài hát của người khác.</p>
      <p>2. Mượn hoặc trộm tài khoản của người khác để dự thi.</p>
      <p>3. Dùng nhiều tài khoản để tham gia dự thi.</p>
      <p>4. Bình luận ác ý, quảng cáo vào bài hát dự thi.</p>
      <p>5. Toàn bộ các hành vi gian lận khác.</p>
      <p class="mt"> Trong quá trình diễn ra sự kiện, nếu phát hiện người dùng gian lận trong sự kiện, ban tổ chức sẽ dựa theo mức độ vi phạm để xử lý, người vi phạm sẽ bị loại khỏi sự kiện hoặc khoá tài khoản.</p>
    </div>
    <p class="lastTips">Quyết định của ban tổ chức là quyết định cuối cùng</p>
  </div>
</template>

<script>
import getDate from "../../utils/getDate"
export default {
  data() {
    return {
      type: 1,
      time: {}
    }
  },
  created() {
    document.title = 'Thưởng&Thể lệ'
    this.time = JSON.parse(sessionStorage.getItem('time'))
    console.log(this.time)
  },
  computed: {
    stime() {
      return getDate(new Date(this.time.stime * 1000), 3)
    },
    etime() {
      return getDate(new Date(this.time.etime * 1000), 3)
    },
    pstime() {
      return getDate(new Date(this.time.pstime * 1000), 3)
    },
    petime() {
      return getDate(new Date(this.time.petime * 1000), 3)
    },
    zsetime() {
      return getDate(new Date(this.time.zsetime * 1000), 3)
    },
    zeetime() {
      return getDate(new Date(this.time.zeetime * 1000), 3)
    },
    rStime() {
      return getDate(new Date(this.time.stime * 1000), 1)
    },
    rEtime() {
      return getDate(new Date(this.time.etime * 1000), 1)
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
  .red {
    color: red !important;
  }
  background: rgba(117, 67, 240, 1);
  .mTips {
    p {
      margin-bottom: 0.07rem;
    }
  }
  .rule {
    padding: 0.29rem 0.44rem;
    letter-spacing: -0.01rem;
    .tabs {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 6.22rem;
      height: 0.88rem;
      background: url(../../assets/img/tabs.png);
      background-size: 100% 100%;
      margin: 0 auto;
      span {
        width: 3.26rem;
        height: 0.8rem;
        text-align: center;
        line-height: 0.8rem;
        color: rgba(255, 220, 42, 1);
        font-weight: bold;
        font-size: 0.32rem;
        &.act {
          color: rgba(174, 72, 0, 1);
          background: url(../../assets/img/actTab.png);
          background-size: 100% 100%;
        }
      }
    }
    h3 {
      text-align: center;
      margin: 0.3rem 0 0.2rem;
      font-size: 0.32rem;
    }
    h6 {
      font-size: 0.28rem;
      margin: 0.49rem 0 0.25rem;
    }
    p {
      color: rgba(229, 222, 255, 1);
      font-size: 0.26rem;
      padding-left: 0.22rem;
    }
    .giftImg {
      width: 6.56rem;
      height: 4.38rem;
      display: block;
    }
    .chTabImg {
      width: 5.65rem;
      height: 4.22rem;
      margin: 0 0 0.25rem 0.22rem;
    }
    .lastTips {
      color: rgba(209, 190, 255, 1);
      margin: 0.78rem 0 0.92rem;
      text-align: center;
    }
    .ruleTips {
      h6 {
        margin: 0.35rem 0 0.25rem;
      }
      .actTime {
        margin-top: 0.6rem;
        .timeItem {
          margin-bottom: 0.3rem;
        }
        .timeTips {
          padding-left: 0.45rem;
        }
      }
    }
    .mt {
      margin-top: 0.3rem;
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
