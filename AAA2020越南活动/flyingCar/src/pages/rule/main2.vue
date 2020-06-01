<template>
  <div class="rule">
    <div class="tabs">
      <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" href="">Thưởng</a>
      <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" href="">Thể lệ</a>
    </div>
    <p class="actTIme">Thời gian: 18h 21/5 ~ 21h 28/5</p>
    <div class="gift" v-if="mainTab==0">
      <img src="../../assets/img/giftImg.png" alt="" class="giftImg">
      <h5>Thưởng BXH tổng</h5>
      <p>TOP1：Nhận dạng Vua Xe 30 ngày + huy chương Vua Xe 30 ngày + 1 Túi quà Siêu Xe Đỏ(trị giá 3498 xu) +ID đẹp +3000 xu +5000 đậu</p>
      <p>TOP2：Huy chương Vua Xe 30 ngày + 1 Túi quà Siêu Xe Đỏ(trị giá 3498 xu) +ID đẹp +2000 xu +3000 đậu</p>
      <p>TOP3：Huy chương Vua Xe 30 ngày + 1 Túi quà Siêu Xe Đỏ(trị giá 3498 xu) +ID đẹp +1000 xu +2000 đậu</p>
      <p>TOP4-10：Huy chương Vua Xe 15 ngày +500 xu +1000 đậu</br>
        Chú ý: Túi quà có hiệu lực trong 14 ngày.</p>
      <h5>Thưởng BXH ngày</h5>
      <p>TOP1： 12% phiếu quà nạp + 10000 đậu</p>
      <p>TOP2： 10% phiếu quà nạp + 8000 đậu</p>
      <p>TOP3： 8% phiếu quà nạp + 6000 đậu</p>
      <p>Chú ý: phiếu quà nạp có hiệu lực trong 1 ngày; thưởng hạng ngày do hệ thống tự gửi vào 0h hôm sau.</p>
      <h6>Đạt điểm lộ trình yêu cầu sẽ nhận danh hiệu và thưởng tương ứng, hệ thống tự gửi,cụ thể như sau:</h6>
      <img src="../../assets/img/ruleImg1.png" class="ruleImg1" alt="">
      <h5>Thưởng người dùng đạt cấp yêu cầu:</h5>
      <p>Khi sự kiện kết thúc, người dùng đã đạt cấp yêu cầu sẽ được thưởng xe tương ứng, hệ thống tự gửi, trước khi vào phòng hãy vào [xe của tôi] nhấn dùng để sử dụng. Cụ thể như sau:</p>
      <img src="../../assets/img/ruleImg2.png" class="ruleImg2" alt="">
    </div>
    <div class="ruleItem" v-else>
      <p>1.Tất cả người dùng có thể tham gia.</p>
      <p>2.Thể lệ xếp hạng: BXH ngày sẽ xếp theo điểm lộ trình từ cao xuống thấp trong ngày, 0h hôm sau tính lại từ đầu; BXH tổng tính theo điểm lộ trình trong thời gian sự kiện. BXH chỉ hiển thị TOP 200 người dùng trên bảng, ai đạt trước sẽ xếp trước nếu bằng điểm.</p>
      <p>3.Sau khi báo danh, tặng quà xu (phòng kara, radio, bài hát) sẽ nhận được điểm lộ trình, 1 xu = 10 điểm.</p>
      <p>4.Thời giạn hạng ngày</p>
      <div class="days">
        <p>Day 1: 18h 21/5 - 0h 22/5 </br>
          Day 2: 0h 22/5 - 0h 23/5</br>
          Day 3: 0h 23/5 - 0h 24/5</br>
          Day 4: 0h 24/5 - 0h 25/5</br>
          Day 5: 0h 25/5 - 0h 26/5</br>
          Day 6: 0h 26/5 - 0h 27/5</br>
          Day 7: 0h 27/5 - 0h 28/5</br>
          Day 8: 0h 28/5 - 21h 28/5</p>
      </div>
      <p>5.Trong thời gian sự kiện nạp xu sẽ được tăng thêm điểm, sau khi nạp xu thành công sẽ được tự động tăng điểm khi tặng quà, tỷ lệ tăng không cộng dồn. Cụ thể như sau.</p>
      <img src="../../assets/img/ruleImg3.png" class="ruleImg3" alt="">
    </div>
    <p class="lastTips">Quyết định của Karaoke Now là quyết định cuối cùng!</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mainTab: 0
    }
  },
  methods: {
    mainTabClick(val) {
      this.mainTab = val
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #382827;
}
.rule {
  padding: 0.26rem 0.32rem;
  .tabs {
    width: 6.84rem;
    height: 0.98rem;
    padding: 0 0.07rem;
    background: url(../../assets/img/tabs.png);
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      display: block;
      width: 3.59rem;
      height: 0.84rem;
      text-align: center;
      line-height: 0.84rem;
      color: #d5b49f;
      &.current {
        color: #642002;
        background: url(../../assets/img/actTab.png);
        background-size: 100% 100%;
      }
    }
  }
  h5 {
    color: #feffa8;
    margin: 0.35rem 0;
  }
  h6 {
    color: #feffa8;
    font-size: 0.24rem;
    margin-top: 0.2rem;
  }
  p {
    font-size: 0.24rem;
    font-weight: 500;
    color: #ffd1a6;
  }
  .actTIme {
    text-align: center;
    font-size: 0.24rem;
    font-weight: 500;
    margin-top: 0.21rem;
    color: #ffdaab;
    font-weight: 700;
  }

  .gift {
    .giftImg {
      width: 6.03rem;
      height: 3.98rem;
      display: block;
      margin: 0.5rem auto;
    }
    .ruleImg1 {
      width: 5.92rem;
      height: 3.46rem;
      margin-top: 0.23rem;
    }
    .ruleImg2 {
      width: 6.02rem;
      height: 6.36rem;
      margin-top: 0.27rem;
    }
  }
  .ruleItem {
    p {
      margin-top: 0.25rem;
    }
    .days {
      margin: 0.05rem 0 0 0.6rem;
    }
    .ruleImg3 {
      width: 6.02rem;
      height: 4.04rem;
      margin-top: 0.27rem;
    }
  }
  .lastTips {
    text-align: center;
    font-size: 0.22rem;
    color: #9a807e;
    margin-top: 1.08rem;
  }
}

@import "../../assets/scss/common.scss";
</style>
