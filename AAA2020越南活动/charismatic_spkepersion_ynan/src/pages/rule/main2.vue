<template>
  <div class="rule">
    <div class="topTabs">
      <span :class="{act:tab == 1}" @click="tabClick(1)">Phần thưởng</span>
      <span :class="{act:tab == 2}" @click="tabClick(2)">Quy tắc</span>
    </div>
    <div class="ruleTips" v-if="tab == 1">
      <h5>Thời gian</h5>
      <p class="tm">18:00:00 ngày 25/1-21:00:00 ngày 3/2</p>
      <img src="../../assets/img/rule/gifts.png" alt="" class="gift">
      <h5>Phần thưởng rút thưởng level-Mỗi lần rút thưởng thưởng 3 cái</h5>
      <img src="../../assets/img/rule/gifts2.png" alt="" class="img1">
      <h5>Phần thưởng trúng thưởng bảng mị lực ngày</h5>
      <img src="../../assets/img/rule/gifts3.png" alt="" class="img3">
      <p>PS: 20 người ngẫu nhiền của top 100 bảng mị lực ngày, có thể nhận 50 xu. Danh sách trúng thưởng sẽ rút vào 12h tối mỗi ngày, ngày thách đấu cuối cùng sẽ rút khi thách đấu kết thúc, túi quà sẽ tự động gửi vào tài khoản</p>
      <h5>Phần thưởng top 10 bảng tổng mị lực</h5>
      <p>Hạng 1: <br />Chứng nhận người phát ngôn tháng 1 (30 ngày)+ Túi quà người phát ngôn (1 bài hát được đề xuất trên trang chủ với nhãn người phát ngôn +2000 xu)+Huy chương phát ngôn tháng 1 (30 ngày)+Trang sức cung Bảo Bình (30 ngày)+Xe Thảm Đỏ (30 ngày)+Hội viên VIP (30 ngày)+3 Túi quà mị lực khắp nơi (109 xu)+3500 xu+7000 đậu</p>
      <p>Hạng 2:<br />Huy chương phát ngôn tháng 1 (30 ngày)+Trang sức cung Bảo Bình (30 ngày)+Xe Thảm Đỏ (30 ngày)+Hội viên VIP (30 ngày)+2 Túi quà mị lực khắp nơi (109 xu)+2500 xu+5000 đậu</p>
      <p>Hạng 3:<br />Huy chương người phát ngôn tháng 1 (30 ngày)+Trang sức cung Bảo Bình (30 ngày)+Xe Thảm Đỏ (30 ngày)+Hội viên VIP (30 ngày)+2 Túi quà mị lực khắp nơi (109 xu)+2000 xu+4000 đậu</p>
      <p>Hạng 4-5<br />Huy chương người phát ngôn tháng 1 (30 ngày)+ Xe Thảm Đỏ (30 ngày)+Hội viên VIP (30 ngày)+1 Túi quà mị lực khắp nơi (109 xu)+1500 xu+3000 đậu</p>
      <p>Hạng 6-10:<br />Xe Thảm Đỏ (30 ngày)+Hội viên VIP (30 ngày)+1 Túi quà mị lực khắp nơi (109 xu)+1000 xu+2000 đậu</p>
      <h5>Quy tắc sử dụng phần thưởng</h5>
      <p>1、Túi quà sự kiện này có thời hạn 14 ngày, hãy nhanh chóng sử dụng</p>
      <p>2、Phiếu quà tặng sẽ được gửi vào túi, có giá trị trong 24h sau khi nhận, quà xu sẽ gửi tới tài khoản kịp thời</p>
    </div>
    <div class="giftItem" v-else>
      <h5 class="mb">Thời gian</h5>
      <p>18:00:00 ngày 25/1-21:00:00 ngày 3/2</p>
      <h4>Quy tắc</h4>
      <h6>Báo danh:</h6>
      <p>1、Nhấn “Lập tức” Sau khi báo danh trên trang sự kiện tải lên tác phẩm công khai bất kỳ (ngoại trừ hát acapella 5 phút), có thể tham gia nhiều tác phẩm, sau khi báo danh tác phẩm nhận được quà và like mới được tính, nếu xóa tác phẩm trong thời gian báo danh, mị lực và số like của tác phẩm sẽ vô hiệu.</p>
      <h5>Quy tắc xếp hạng bảng sự kiện</h5>
      <h6>Bảng tổng mị lực</h6>
      <p>1、Sau khi báo danh thách đấu, xếp hạng điểm sao nhận được <br />
        2、Sách lược nhận điểm sao： Điểm sao=số like tác phẩm nhận được X10+mị lực quà xu tác phẩm nhận được<br />
        Chỉ 30 lượt like đầu tiên của tác phẩm mới được tính thành tích<br />
        Mị lực quà xu: Tác phẩm thách đấu mỗi lần nhận được 1 quà xu, được tính là 10 mị lực<br />
        Tăng thêm điểm sao: Mỗi quán quân tài trợ lì xì 1 lần, điểm sao tăng thêm 2%, giới hạn 10% <br />
        Nếu điểm sao nhận được bằng nhau, đạt được điểm số này trước sẽ xếp trước. Bảng hiển thị top 100 thành tích người dùng

      </p>
      <h6>Bảng mị lực ngày:</h6>
      <p>
        1、Bảng mị lực ngày xếp hạng dựa vào điểm sao <br />
        2、Nếu điểm sao nhận được bằng nhau, đạt được điểm sao này trước sẽ xếp trước. Top 100 bảng sao ngày có thể vào bảng mị lực ngày <br />
        3、Chọn ngẫu nhiên 20 người trong top 100 bảng mị lực ngày, có thể nhận 50 xu<br />
        4、Tỉ lệ trúng thưởng=điểm sao bảng ngày/top 100 điểm sao của người dùng trong ngày
      </p>
      <h6>Sách lược rút thưởng level:</h6>
      <p>
        1、Tổng cộng có 5 rương, điểm sao lần lượt đạt đến 100, 1000, 10000, 50000, 100000, có thể rút được rương tương ứng, mỗi lần rút sẽ nhận được 3 phần quà. Sau khi nhận phần thưởng sẽ tự động gửi vào tài khoản, mỗi người chỉ có thể rút cùng 1 rương 1 lần<br />
        2、Tất cả rương nhận được có thời hạn trước khi sự kiện kết thúc, hãy nhanh chóng rút!
      </p>
      <h6>Sách lược kì xì：</h6>
      <p>
        1、Trong thời gian sự kiện, tác phẩm có nhãn “Thách đấu người phát ngôn” mỗi lần nhận được 1000 Vỗ tay (10 xu), sẽ nổ 1 lần lì xì may mắn 666 xu, mỗi lần nổ lì xì 200 cái, đến trước có trước<br />
        2、Sau khi nhấn “Hẹn cướp lì xì”, khi nổ lì xì sẽ nhận được nhắc nhở của hệ thống, nhấn “Hủy hẹn”, sẽ không nhận được nhắc nhở nổ lì xì nữa
      </p>
      <h5>Giải thích khác</h5>
      <p class="mg">Trong quá trình thách đấu, nếu phát hiện người dùng dùng hành vi không chính đáng tham gia sự kiện,chúng tôi có quyền xử lý tùy theo tình trạng nghiêm trọng mà không cần báo trước, người vi phạm có thể bị hủy tư cách hoặc bị khóa tài khoản, bao gồm nhưng không giới hạn:</p>
      <p>
        1）Tác phẩm không phải bản thân hát hoặc vi phạm bản quyền <br />
        2）Chiếm dụng hoặc mượn tài khoản người khác tham gia sự kiện <br />
        3）Cùng 1 người dùng đăng ký nhiều tài khoản tham gia sự kiện<br />
        4）Trong thời gian thách đấu bình luận ác ý, quảng cáo đối với các tác phẩm <br />
        5）Thông qua các hành vi vi phạm khác tham gia sự kiện
      </p>
      <p>Nếu gian đối, bất luận có khóa tài khoản của người dùng hay không, sau khi sự kiện kết thúc chúng tôi có quyền thu hồi tất cả phần thưởng</p>
    </div>
    <p class="lastTips">Quyền giải thích cuối cùng của sự kiện thuộc về ban tổ chức sự kiện</p>
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
    document.title = 'Hướng dẫn'
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
  background-color: RGBA(162, 119, 243, 1);
  .red {
    color: rgba(252, 245, 193, 1);
  }
  .mg {
    margin: 0 !important;
  }
  .tm {
    padding-left: 0 !important;
  }
  .rule {
    padding: 0 0.14rem;
    h5,
    h4 {
      color: rgba(254, 249, 120, 1);
      font-weight: bold;
      font-size: 0.32rem;
    }
    h6 {
      color: rgba(120, 254, 139, 1);
      padding-left: 0.7rem;
    }
    h4 {
      margin-top: 0.47rem;
    }
    h5 {
      margin: 0.65rem 0 0.2rem;
    }
    p {
      font-size: 0.28rem;
      font-weight: 500;
      padding-left: 0.5rem;
      margin-bottom: 0.4rem;
      em {
        font-size: 0.28rem;
        font-weight: 500;
      }
    }
    .gift {
      width: 7.08rem;
      height: 5.16rem;
      margin: 0.27rem auto 0;
    }
    .img1 {
      width: 7.02rem;
      height: 2.26rem;
      margin: 0 auto;
    }
    .img2 {
      width: 7.02rem;
      height: 6.01rem;
      margin: 0 auto 0.34rem;
    }
    .img3 {
      width: 7.18rem;
      height: 2.13rem;
      margin: 0 auto;
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
  justify-content: center;
  align-items: center;
  background: url(../../assets/img/rankTabs.png);
  background-size: 100% 100%;
  margin: 0.38rem auto 0;
  span {
    width: 3.15rem;
    height: 0.85rem;
    text-align: center;
    line-height: 0.88rem;
    color: rgba(255, 255, 255, 0.6);
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
