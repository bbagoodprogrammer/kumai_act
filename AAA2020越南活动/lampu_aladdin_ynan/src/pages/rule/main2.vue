<template>
  <div class="rule">
    <div class="tabs">
      <span :class="{act:showType == 'rules'}" @click="clickTab('rules')">Thể lệ</span>
      <span :class="{act:showType == 'wards'}" @click="clickTab('wards')">Phần thưởng</span>
    </div>
    <p class="actTime">Thời gian：18h 15/06 – 20h 30/6</p>
    <div class="ward" v-show="showType == 'wards'">
      <!-- <div class="wardImg"></div> -->
      <h3 class="ruleTitleBg1">Thưởng triệu hồi</h3>
      <div class="giftBox">
        <!-- <div v-for="(item,index) in giftArr" :key="index">
          <div class="giftImg">
            <span class="giftBg"></span>
            <img :src="require(`../../assets/img/luckGift/${index+1}.png`)" alt="">
          </div>
          <strong>{{item.name}}</strong>
        </div> -->
      </div>
      <h3>Thưởng ngày</h3>
      <p>Top 100 mỗi ngày được chia tổng xu thưởng.</p>
      <p>Số lượng xu thưởng dựa vào xếp hạng và tổng pháp lực nhận trong ngày.</p>
      <p>Top 10 được chia 30% tổng xu thưởng trong ngày</p>
      <p>Top 11 – 30 được chia 40% tổng xu thưởng trong ngày</p>
      <p>Top 31 – 100 chọn ngẫu nhiên 20 người nhận 30% tổng xu thưởng trong ngày</p>
      <h3 class="ruleTitleBg1">Thưởng BXH tổng</h3>
      <h6>Hạng nhất:</h6>
      <p>Huy chương Thần Đèn (30 ngày) + hiệu ứng vào phòng Long Trọng (30 ngày) + Túi quà phòng Kara Thần Đèn Aladin (666 xu) + 3000 xu + 5000 đậu.</p>
      <h6>Hạng nhì:</h6>
      <p>Huy chương Thần Đèn (15 ngày) + hiệu ứng vào phòng Long Trọng (30 ngày) + Túi quà phòng Kara Thần Đèn Aladin (666 xu) + 2000 xu + 3000 đậu.</p>
      <h6>Hạng ba:</h6>
      <p>Huy chương Thần Đèn (7 ngày) + hiệu ứng vào phòng Long Trọng (30 ngày) + Túi quà phòng Kara Thần Đèn Aladin (666 xu) + 1000 xu + 2500 đậu.</p>
      <h6>Hạng 4-5:</h6>
      <p>Huy chương Thần Đèn (7 ngày) + hiệu ứng vào phòng Long Trọng (15 ngày) + Túi quà phòng Kara Thần Đèn Aladin (666 xu) + 800 xu + 2000 đậu.</p>
      <h6>Hạng 6-10:</h6>
      <p>hiệu ứng vào phòng Long Trọng (9 ngày) + Túi quà phòng Kara Thần Đèn Aladin (666 xu) + 500 xu + 1000 đậu.</p>
      <h3 class="ruleTitleBg1">Cách dùng phần thưởng</h3>
      <div class="lastRule">
        <p>1. Phiếu nạp và phiếu tặng chỉ có tác dụng đến 23:59:59 cùng ngày tính từ lúc nhận, nếu trong ngày 1 người dùng nhận được nhiều phiếu quà nạp và phiếu quà tặng, mức thưởng sẽ cộng dồn. Xu thưởng sẽ được tự động gửi vào tài khoản ngay khi nạp thành công hoặc đạt điều kiện tặng xu.</p>
        <p>2. Phần thưởng túi quà đều có thời hạn 7 ngày, mời dùng kịp thời.</p>
        <p>3. Túi quà trên phiên bản Android có thể xem tại Tôi – Túi quà, khi tặng quà có thể lựa chọn để tặng quà từ Túi. iOS cần cập nhật phiên bản mới nhất NowKara trên App Store để sử dụng.</p>
      </div>
    </div>
    <div class="rules" v-show="showType == 'rules'">
      <h3>Báo danh</h3>
      <p class="singUpTips">Nhấn báo danh để tham gia sự kiện</br>
        Sau khi báo danh mới tính số liệu nhiệm vụ</p>
      <h3>Về nhiệm vụ</h3>
      <p><strong>Nhiệm vụ ngày:</strong>yêu cầu của nhiệm vụ không xoá bài hát công khai đăng hôm trước, vào 12h hôm đó sẽ kiểm tra bài hát đăng công khai hôm trước, nếu vẫn chưa xoá sẽ nhận 10 pháp lực.</p>
      <p><strong>Nhiệm vụ nạp:</strong>mỗi 30 xu đã nạp được thưởng 10 pháp lực, nếu không đủ 30 xu sẽ không nhận được pháp lực.</p>
      <h3 class="ruleTitleBg1">Hướng dẫn gọi Thần Đèn</h3>
      <p>1.Chỉ có thể dùng pháp lực nhận trong ngày để gọi Thần Đèn, điểm pháp lực đã dùng để triệu hồi được dùng để xếp hạng.</p>
      <p>2.Số pháp lực dùng để gọi Thần Đèn khác nhau, sẽ nhận phần thưởng không giống nhau.</p>
      <h3 class="ruleTitleBg1">Cách chia xu thưởng</h3>
      <p>1. Tổng xu thưởng mỗi ngày phụ thuộc vào tổng pháp lực toàn bộ người chơi đã dùng để gọi Thần Đèn, tổng pháp lực càng cao, tổng xu thưởng được chia càng nhiều.</p>
      <span class="img1"></span>
      <p>2. Top 100 mỗi ngày sẽ được chia tổng xu thưởng, số lượng xu thưởng nhận được dựa theo xếp hạng của bản thân.</p>
      <span class="img2"></span>
      <p>3. Vào 0h mỗi ngày sẽ chọn ra danh sách trúng thưởng, phần thưởng được gửi tự động vào tài khoản người chơi, mời chú ý kiểm tra.</p>
      <h3 class="ruleTitleBg1">Thể lệ xếp hạng</h3>
      <p>1.Dựa vào tổng pháp lực nhận được sau khi báo danh để xếp hạng.
        <span>Hạng ngày: xếp hạng theo pháp lực nhận trong ngày.</span>
        <span>Hạng tổng: xếp hạng theo tổng pháp lực nhận.</span>
      </p>
      <p>2.Nếu pháp lực bằng nhau, ai đạt trước sẽ xếp hạng cao hơn.</p>
      <p>3.BXH chỉ hiện 100 người cao điểm nhất.</p>
      <p>4.Dùng pháp lực triệu hồi Thần Đèn không ảnh hưởng đến điểm số trên bảng xếp hạng.</p>
      <h3>Thể lệ khác</h3>
      <p>Trong sự kiện, nếu phát hiện người dùng có hành vi gian lận khi tham gia sự kiện, ban tổ chức sẽ xử lý người vi phạm theo mức độ vi phạm mà không cần thông báo trước, bằng cách huỷ quyền tham gia hoặc khoá tài khoản, bao gồm nhưng không giới hạn những hành vi sau:</p>
      <p>1. Trộm hoặc mượn tài khoản người khác để tham gia sự kiện.</p>
      <p>2. Cùng 1 người đăng ký nhiều tài khoản để tham gia.</p>
      <p>3. Tất cả các hành vi gian lận khác.</p>
      <p class="other">Nếu cố tình vi phạm, cho dù người dùng có tham gia sự kiện hay không đều bị khoá vĩnh viễn toàn bộ tài khoản chính và phụ, sau khi sự kiện kết thúc ban tổ chức sẽ thu hồi toàn bộ phần thưởng.</p>
    </div>
    <div class="tips">Quyết định của ban tổ chức là quyết định cuối cùng</div>
  </div>
</template>

<script>
import giftArr from "../../config/gift"
export default {
  data() {
    return {
      showType: 'rules',
      giftArr: giftArr
    }
  },
  created() {
    document.title = 'Thể lệ&Thưởng'
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
  background-color: #48008c;
}
.actTime {
  font-size: 0.24rem;
  color: #dac4ff;
  margin: 0.29rem 0 0.28rem;
  text-align: center;
}
.rule {
  padding: 0.28rem 0;
  .tabs {
    width: 6.71rem;
    height: 0.74rem;
    background: url(../../assets/img/tabsBg.png);
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    span {
      display: block;
      width: 3.75rem;
      height: 0.85rem;
      text-align: center;
      line-height: 0.85rem;
      color: #f57bdf;
      &.act {
        background: url(../../assets/img/tuleTabaAct.png);
        background-size: 100% 100%;
        color: #faffa5;
      }
    }
  }
  .singUpTips {
    text-align: center;
  }
  h3 {
    width: 2.35rem;
    height: 0.39rem;
    line-height: 0.39rem;
    background: url(../../assets/img/ruleTitleBg.png);
    background-size: 100% 100%;
    text-align: center;
    color: #ffda8d;
    font-size: 0.26rem;
    font-weight: 700;
    margin: 0.32rem auto 0.27rem;
    &.ruleTitleBg1 {
      width: 4.83rem;
      background: url(../../assets/img/ruleTitleBg1.png);
      background-size: 100% 100%;
    }
  }
  p {
    color: #dac4ff;
    font-size: 0.24rem;
    span {
      display: block;
      text-indent: 0.5rem;
    }
    strong {
      font-size: 0.24rem;
      color: #ffda8d;
    }
    em {
      color: #ffe191;
      font-size: 0.36rem;
    }
  }
  h6 {
    color: #dac4ff;
    padding: 0 0.27rem;
    margin-top: 0.3rem;
    font-size: 0.24rem;
  }
  .ward {
    p {
      padding: 0 0.27rem;
    }
  }
  .rules {
    padding: 0 0.22rem 0.7rem;
  }
  .tips {
    margin-top: 0.25rem;
    color: #bdbbff;
    font-size: 0.22rem;
    margin-top: 1.3rem;
    text-align: center;
  }
  .img1 {
    display: block;
    width: 3.14rem;
    height: 2.09rem;
    background: url(../../assets/img/ruleImg1.png);
    background-size: 100% 100%;
    margin: 0.14rem 0 0.28rem;
  }
  .img2 {
    display: block;
    width: 3.87rem;
    height: 1.39rem;
    background: url(../../assets/img/ruleImg2.png);
    background-size: 100% 100%;
    margin: 0.14rem 0 0.28rem;
  }
  .other {
    margin-top: 0.5rem;
  }
  .giftBox {
    width: 5.87rem;
    height: 7.05rem;
    background: url(../../assets/img/giftBox.png);
    background-size: 100% 100%;
    margin: 0 auto;
    padding: 0.47rem 0.69rem;
  }
  .lastRule {
    p {
      margin-bottom: 0.3rem;
    }
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
.giftBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 0.05rem;
  padding: 0 1rem;
  .giftImg {
    width: 1.4rem;
    height: 1.4rem;
    position: relative;
    .giftBg {
      display: block;
      width: 100%;
      height: 100%;
      background: url(../../assets/img/gitBg.png);
      background-size: 100% 100%;
      position: absolute;
    }
    img {
      width: 100%;
      height: 100%;
      position: absolute;
    }
  }
  strong {
    display: block;
    height: 0.3rem;
    text-align: center;
    font-size: 0.22rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 0.28rem;
    margin-top: 0.05rem;
  }
}
@import "../../assets/scss/common.scss";
</style>
