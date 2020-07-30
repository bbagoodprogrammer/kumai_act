<template>
  <div class="rule">
    <div class="tabs">
      <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" href="">Phần thưởng</a>
      <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" href="">Thể lệ</a>
    </div>
    <p class="actTime">Thời gian:18h 29/7 – 23h 7/8</p>
    <div class="wards" v-if="mainTab == 0">
      <h5>Phần thưởng</h5>
      <img src="../../assets/img/wardsImg.png" alt="" class="wardImg">
      <h5>Thưởng BXH Tổng</h5>
      <h6>Hạng 1:</h6>
      <p>Huy chương Chủ Vườn Ưu Tú (30 ngày) + Xe Sư Tử (30 ngày) + 3 tháng vip + 1 bộ quà Thú Cưng (1092 xu/bộ) + 3000 xu + 10000 đậu</p>
      <h6>Hạng 2:</h6>
      <p>Huy chương Chủ Vườn Ưu Tú (30 ngày) + Xe Sư Tử (30 ngày) + 2 tháng vip + 1 bộ quà Thú Cưng (1092 xu/bộ) + 2500 xu + 8000 đậu</p>
      <h6>Hạng 3:</h6>
      <p>Huy chương Chủ Vườn Ưu Tú (30 ngày) + Xe Sư Tử (30 ngày) + 1 tháng vip + 1 bộ quà Thú Cưng (1092 xu/bộ) + 2000 xu + 5000 đậu</p>
      <h6>Hạng 4-5:</h6>
      <p>Huy chương Chủ Vườn Ưu Tú (30 ngày) + Xe Sư Tử (30 ngày) + 1 bộ quà Thú Cưng (1092 xu/bộ) + 1000 xu + 5000 đậu</p>
      <h6>Hạng 6-10:</h6>
      <p>Huy chương Chủ Vườn Ưu Tú (30 ngày) + 1 bộ quà Thú Cưng (1092 xu/bộ) + 500 xu + 2000 đậu</p>
      <h5>Thưởng BXH Thú Cưng</h5>
      <img src="../../assets/img/wardsTab.png" alt="" class="tab">
      <h5>Quy định phần thưởng</h5>
      <p>1.Thời hạn của Túi quà nhận từ sự kiện đều có thời hạn 7 ngày, mời sử dụng kịp lúc.</p>
      <!-- <p>2.Phần thưởng BXH Ngày gửi vào 24h mỗi ngày, hôm kết thúc sự kiện gửi lúc 23h.</p> -->
      <p>2.Xe và Túi quà mời cập nhật phiên bản mới nhất để dùng.</p>
      <P>3.Phần thưởng BXH sẽ gửi trong vòng 7 ngày làm việc sau khi kết thúc sự kiện.</P>
    </div>
    <div class="ruleTips" v-else>
      <!-- <h5>萌寵總榜獎勵</h5> -->
      <h6 class="order">Thể lệ:</h6>
      <p>1.Nhấn báo danh xong sẽ trở thành chủ vườn, sau khi báo danh mới bắt đầu tính thành tích.</p>
      <p>2.Bài hát và tại phòng Kara nhận quà Thú Cưng quy định xem như thu thập thành công thú cưng đó, quà Thú Cưng bao gồm quà phòng Kara Gà Con (10 xu), Sư Tử (168 xu), Voi Con (368 xu) và quà bài hát Vịt Con (10 xu), Hổ Con (168 Xu), Hà Mã (368 Xu).</p>
      <p>3.Nuôi thành công 6 loại thú cưng sẽ trở thành Chủ Vườn Ưu Tú, hoàn thành càng sớm xếp hạng càng cao.</p>
      <p>4.BXH Mị Lực dựa vào tổng điểm mị lực từ quà Thú Cưng, mỗi khi thu thập đủ Thú Cưng (6 loại) nhận thêm 1000 điểm mị lực,</p>
      <p>5.BXH Thú Cưng dựa vào số lượng quà thú cưng tương ứng, top 10 nhận phần thưởng khủng.</p>
      <!-- <h6 class="order">Ghi chú:</h6>
      <p>1.Mỗi người chỉ được dùng 1 tài khoản tham gia sự kiện, cố ý gian lận điểm hoặc vi phạm quy định sẽ bị loại khỏi cuộc thi và thu hồi phần thưởng.</p> -->
    </div>
    <p class="lastTips" :class="{mt:mainTab==1}">Quyết định của ban tổ chức là quyết định cuối cùng.</p>
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
  background-color: rgba(32, 88, 123, 1);
}
.rule {
  padding: 0.26rem 0.34rem;
  .tabs {
    width: 6.41rem;
    height: 0.9rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(../../assets/img/tabs.png);
    background-size: 100% 100%;
    margin: 0 auto;
    a {
      display: block;
      width: 3.24rem;
      height: 100%;
      text-align: center;
      line-height: 0.9rem;
      color: rgba(200, 249, 205, 1);
      font-size: 0.28rem;
      font-weight: 600;
      &.current {
        color: rgba(32, 88, 123, 1);
        background: url(../../assets/img/actTab.png);
        background-size: 100% 100%;
      }
    }
  }
  .actTime {
    text-align: center;
    color: #7bdc9c;
    font-weight: 0.26rem;
    font-weight: 500;
    margin-top: 0.41rem;
  }

  h5 {
    margin: 0.41rem 0 0.22rem;
    text-align: center;
    font-size: 0.36rem;
    color: rgba(174, 255, 201, 1);
    font-weight: 600;
  }
  h6 {
    color: rgba(123, 220, 156, 1);
    font-weight: 600;
    margin-top: 0.3rem;
  }

  p {
    color: rgba(123, 220, 156, 1);
    font-size: 0.24rem;
  }
  .wardImg {
    display: block;
    width: 5.05rem;
    height: 4.21rem;
    margin: 0 auto;
  }
  .tab {
    display: block;
    width: 6.74rem;
    height: 7.02rem;
    margin: 0 auto;
  }
  .lastTips {
    margin-top: 0.89rem;
    text-align: center;
    font-size: 0.26rem;
    color: rgba(238, 255, 215, 1);
    &.mt {
      margin-top: 3rem;
    }
  }
  .order {
    color: rgba(123, 220, 156, 1);
    margin: 0.58rem 0 0.36rem;
  }
}
@import "../../assets/scss/common.scss";
</style>
