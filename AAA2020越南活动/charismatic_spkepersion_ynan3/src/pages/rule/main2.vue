<template>
  <div class="rule">
    <div class="topTabs">
      <span :class="{act:tab == 1}" @click="tabClick(1)">Phần thưởng</span>
      <span :class="{act:tab == 2}" @click="tabClick(2)">Thể lệ</span>
    </div>
    <div class="ruleTips" v-if="tab == 1">
      <h5>Thời gian</h5>
      <p class="tm"> 18h 26/3 - 21h 4/4</p>
      <img src="../../assets/img/rule/gifts.png" alt="" class="gift">
      <h5>Phần thưởng rút thưởng các level <br />Mỗi lần tối đa có thể trúng 3 cái</h5>
      <img src="../../assets/img/rule/gifts2.png" alt="" class="img1">
      <p class="mb mt">1.Mỗi ngày đạt đến cấp tương ứng sẽ có thể nhận quà tương ứng, mỗi ngày mỗi cấp có thể nhận 1 lần, chỉ nhận trong ngày.</p>
      <p>2. Lần thứ 7 rút thưởng Lv.4 sẽ trúng huy chương.</p>
      <h5>Phần thưởng trúng thưởng bảng mị lực ngày</h5>
      <img src="../../assets/img/rule/gifts3.png" alt="" class="img3">
      <p class="mt">Chú ý: 20 người ngẫu nhiên trong top 100 bảng ngày có thể nhận 2 Sách Đồng Thoại (20 xu). Danh sách trúng thưởng sẽ rút vào 12h tối mỗi ngày, ngày cuối cùng sẽ rút khi sự kiện kết
        thúc, túi quà
        sẽ tự động gửi vào tài khoản.</p>
      <h5>Phần thưởng quán quân quà tặng</h5>
      <p>Trong thời gian sự kiện, người dùng quán quân tài trợ lì xì, có thể nhận phần thưởng quán quân “Sách Đồng Thoại” 30 ngày, , nếu số lần bằng nhau, đạt được trước sẽ xếp trước</p>
      <h5>Phần thưởng top 10 bảng tổng</h5>
      <p>Hạng 1: <br />
        Chứng Nhận Người Đại Diện Đồng Thoại (30 ngày)+ ID đẹp 4 số (Cần liên hệ ID 10)+ Phần thưởng túi quà người đại diện điểm mị (Ghim 1 bài hát nhãn ca khúc Người Đại Diện+ 2000 xu)+ Huy Chương
        Người Đại Diện Đồng Thoại (30 ngày)+ Trang Sức Bạch Dương (30 ngày)+ Tuần Lộc (30 ngày)+ VIP (30 ngày)+ 3 Kho Báu Dưới Biển (129 xu) + 3500 xu + 7000 đậu</p>
      <p>Hạng 2:<br />
        Huy Chương Người Đại Diện Đồng Thoại (30 ngày)+ Trang Sức Bạch Dương (30 ngày)+ Tuần Lộc (30 ngày)+ VIP (30 ngày)+ 2 Kho Báu Dưới Biển (129 xu) + 2500 xu + 5000 đậu
      </p>
      <p>Hạng 3:<br />Huy Chương Người Đại Diện Đồng Thoại (30 ngày)+ Trang Sức Bạch Dương (30 ngày)+ Tuần Lộc (30 ngày)+ VIP (30 ngày)+ 2 Kho Báu Dưới Biển (129 xu) + 2000 xu + 4000 đậu
      </p>
      <p>Hạng 4-5<br />Huy Chương Người Đại Diện Đồng Thoại (30 ngày)+ Tuần Lộc (30 ngày)+ VIP (30 ngày)+ 1 Kho Báu Dưới Biển (129 xu) + 1500 xu + 3000 đậu</p>
      <p>Hạng 6-10:<br />Huy Chương Người Đại Diện Đồng Thoại (15 ngày)+ Tuần Lộc (30 ngày)+ VIP (30 ngày)+ 1 Kho Báu Dưới Biển (129 xu) + 1000 xu + 2000 đậu</p>
      <!-- <p>Hạng 11-20:<br />1 Túi quà Tết Nguyên Tiêu (129 xu) + 500 xu + 500 đậu</p> -->
      <h5>Thể lệ phần thưởng</h5>
      <p>Trong sự kiện người dùng tích lũy đạt 90000 tích điểm, có thể nhận Huy Chương Người Đại Diện Đồng Thoại (7 ngày) + 2 Kho Báu Dưới Biển (129 xu)+ 500 đậu</p>
      <!-- <p>2、Phiếu quà tặng sẽ được gửi vào túi, có hiệu lực trong 24h sau khi nhận, hãy sử dụng kịp thời.</p> -->
    </div>
    <div class="giftItem" v-else>
      <h5 class="mb">Thời gian</h5>
      <p> 18h 26/3 - 21h 4/4</p>
      <h4>Thể lệ</h4>
      <h6>Báo danh:</h6>
      <p>1、Sau khi nhấn [Báo danh] trên trang sự kiện, nhấn tải lên tác phẩm công khai bất kỳ (ngoại trừ hát chay 5 phút), có thể gửi nhiều tác phẩm dự thi , sau khi báo danh mới bắt đầu tính dữ liệu
        nhận quà và nhận thích, nếu xóa tác phẩm trong thời gian sự kiện, điểm mị và lượt thích của tác phẩm sẽ vô hiệu.</p>
      <h5>Thể lệ xếp hạng bảng sự kiện</h5>
      <h6>Bảng tổng:</h6>
      <p>1、Xếp hạng theo điểm sao nhận sau khi báo danh. <br />
        2、Cách nhận điểm sao：Điểm sao=Lượt thích tác phẩm dự thi nhận *10 + Điểm mị quà xu tác phẩm dự thi nhận<br />
        Lượt thích tác phầm: Chỉ 30 lượt thích đầu tiên của tác phẩm dự thi được tính.<br />
        Điểm mị tác phẩm: Tác phẩm dự thi mỗi lần nhận được 1 quà xu, được tính là 10 điểm mị.<br />
        Tăng thêm điểm sao: Mỗi quán quân tài trợ lì xì 1 lần, điểm sao tăng thêm 2%, tối đa 10%. <br />
        3、Nếu điểm sao bằng nhau, đạt được điểm này trước sẽ được xếp trước. Bảng hiển thị điểm top 100 thí sinh.

      </p>
      <h6>Bảng ngày:</h6>
      <p>
        1、Bảng ngày xếp hạng theo điểm sao ngày.<br />
        2、Nếu điểm sao nhận được bằng nhau, đạt được điểm sao này trước sẽ xếp trước. Bảng hiển thị điểm top 100 thí sinh.<br />
        3、20 người dùng ngẫu nhiên trong top 100 Bảng điểm mị ngày, có thể nhận được 2 Sách Đồng Thoại (20 xu)<br />
        4、Tỉ lệ trúng =điểm sao cá nhân ngày/ điểm sao top 100 bảng ngày
      </p>
      <h6>Cách rút thưởng các level:</h6>
      <p>
        1.Tổng cộng có 4 rương, điểm sao lần lượt đạt đến 100, 1500, 4000, 8000, có thể rút được rương tương ứng, mỗi lần rút sẽ nhận được 3 phần quà. Phần thưởng sẽ tự động gửi vào tài khoản, mỗi
        người mỗi ngày chỉ có thể rút cùng 1 rương 1 lần<br />
        2.Lần thứ 7 rút thưởng Lv.4 sẽ trúng huy chương.<br />
        3. Tất cả lượt rút thưởng chỉ có hiệu lực đến trước khi sự kiện kết thúc, vui lòng sử dụng kịp thời.
      </p>
      <h6>Cách cướp lì xì：</h6>
      <p>
        1. Trong thời gian sự kiện, tác phẩm mang nhãn “Thách Đấu Người Đại Diện” mỗi lần nhận được 300 “Sách Đồng Thoại” (20 xu), sẽ nổ 1 lần lì xì 666 xu, mỗi lần nổ 200 lì xì, đến trước được
        trước<br />
        2. Sau khi nhấn “Hẹn cướp lì xì”, khi nổ lì xì sẽ được hệ thống thông báo, nhấn “Hủy hẹn”, sẽ không nhận được thông báo nổ lì xì nữa
      </p>
      <h5>Giải thích khác</h5>
      <p class="mg">Trong quá trình thách đấu, nếu phát hiện người dùng dùng hành vi không chính đáng tham gia sự kiện, chúng tôi có quyền xử lý tùy theo tình trạng nghiêm trọng mà không cần báo
        trước, người vi phạm có thể bị hủy tư cách hoặc bị khóa tài khoản, bao gồm nhưng không giới hạn:</p>
      <p>
        1）Tác phẩm không phải bản thân hát hoặc vi phạm bản quyền. <br />
        2）Chiếm dụng hoặc mượn tài khoản người khác tham gia sự kiện. <br />
        3）Cùng 1 người dùng đăng ký nhiều tài khoản tham gia sự kiện.<br />
        4）Trong thời gian thách đấu bình luận ác ý, quảng cáo đối với các tác phẩm. <br />
        5）Thông qua các hành vi vi phạm khác tham gia sự kiện.
      </p>
      <p>Nếu gian đối, bất luận có khóa tài khoản của người dùng hay không, sau khi sự kiện kết thúc chúng tôi có quyền thu hồi tất cả phần thưởng.</p>
    </div>
    <p class="lastTips">Quyền giải thích cuối cùng thuộc về ban tổ chức sự kiện</p>
  </div>

</template>


<script>
export default {
  data () {
    return {
      tab: 1
    }
  },
  created () {
    document.title = 'Hướng dẫn'
  },
  methods: {
    tabClick (val) {
      this.tab = val
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: RGBA(151, 176, 250, 1);
  .red {
    color: rgba(252, 245, 193, 1);
  }
  .mt {
    margin-top: 0.24rem !important;
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
      color: rgba(254, 249, 120, 1);
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
        font-size: 0.26rem;
        font-weight: 500;
      }
    }
    .gift {
      display: block;
      width: 7.08rem;
      height: 5.16rem;
      margin: 0.27rem auto 0;
    }
    .img1 {
      display: block;
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
      display: block;
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
@import '../../assets/scss/common.scss';
</style>
