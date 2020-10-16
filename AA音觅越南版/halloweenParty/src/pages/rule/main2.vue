<template>
  <div class="rule">
    <div class="actTime"> 18:00 12/9/2018- 18:00 21/9/2018</div>
    <div class="tabs">
      <span :class="{act:type == 1}" @click="tabClick(1)">Thể lệ</span>
      <span :class="{act:type == 2}" @click="tabClick(2)">Thưởng</span>
    </div>
    <div class="ruleTips" v-if="type == 1">
      <h6></h6>
      <p>1, Báo danh và tặng quà chỉ định, kẹo ma lực và quả bí đỏ, có thể nhận điểm quỷ thần<br />
        2, Điểm quỷ thần = điểm kẹo ma lực + điểm chơi phòng<br />
        Điểm kẹo ma lực = số kẹo ma lực *100<br />
        Điểm chơi phòng = Tổng xu nhận được từ quà chỉ định *12<br />
        3, Qùa chỉ định: Chổi phù thủy, Thuốc độc, Phù thủy, Tiểu quỷ, Kem bí đỏ, Mũ Phù thủy
      </p>
      <h6>Cách tính BXH</h6>
      <p>1, Xếp theo tổng số điểm quỷ thần từ cao xuống thấp</p>
      <p>2, BXH Ngày và BXH tổng chỉ hiển thị top 100<p>
          <h6>Chú ý: </h6>
          <p>"Trong sự kiện, nếu phát hiện người dùng sử dụng các hành vi gian lận điểm như dùng nhiều tài khoản phụ để tham gia sự kiện, hoặc lợi dụng lỗ hổng để chuộc lợi, app sẽ tiến hành trừ điểm thậm chí khóa tài khoản mà không cần báo trước. "</p>
    </div>
    <div class="giftTips" v-else>
      <h6>1, Thưởng BXH Ngày</h6>
      <div class="backGift">
        <img src="../../assets/img/ruleImg/gift1.png" alt="">
        <strong>Túi quà Nhà quỷ (990 xu) </strong>
      </div>
      <p>Top 20 BXH ngày, ngẫu nhiên tặng 2 bạn nhận 1 túi quà Lâu đài quỷ (990 xu), BXH mỗi ngày phát thưởng tự động vào túi quà vào 00h ngày tiếp theo, ngày cuối cùng sự kiện sẽ phát thưởng khi sự kiện kết thúc. </p>
      <h6>2, Thưởng BXH tổng</h6>
      <h5>Top 1-3</h5>
      <div class="gfitBox1 gfitBox">
        <span v-for="(item,index) in giftArr1" :key="index">
          <img :src="item.img" alt="">
          <strong>{{item.name}}</strong>
        </span>
      </div>
      <h5>Top 4-6</h5>
      <div class="gfitBox2 gfitBox">
        <span v-for="(item,index) in giftArr2" :key="index">
          <img :src="item.img" alt="">
          <strong>{{item.name}}</strong>
        </span>
      </div>
      <p>

        "Gi ải nhất: Huy chương thần chớp 30 ngày + Túi quà động Đảo Halloween*1+5000 đậu<br />
        Gi ải nhất: Huy chương thần chớp 15 ngày +Túi quà động Đảo Halloween*1+3000 đậu<br />
        Gi ải nhất: Huy chương thần chớp 10 ngày + Túi quà động Đảo Halloween*1+1000 đậu<br />
        Top 4-6: Túi quà Bí đỏ *10 +500 đậu"<br />
        * Cập nhật phiên bản mới, thông qua sự kiện nhận quà xu có thể đổi kim cương, kim cương có thể đổi xu ~

      </p>
      <h6>3, Thưởng BXH Cống hiến</h6>
      <div class="gfitBox1 gfitBox">
        <span v-for="(item,index) in giftArr3" :key="index">
          <img :src="item.img" alt="">
          <strong>{{item.name}}</strong>
        </span>
      </div>
      <p>Top 3 công hiến cho Top 3 BXH Tổng nhận thưởng.
        Phiếu nạp 10%: Trong ngày kế tiếp Sau khi sự kiện kết thúc nạp xu mệnh giá bất kỳ, nhận lại 10% số xu đã nạp. </p>
      <h6>4, Thưởng kẹo ma lực</h6>
      <p>Không phải tài khoản phụ tặng N kẹo ma lực nhận khung ảnh quỷ thần 3 ngày</p>
      <h6>5, Thưởng khác</h6>
      <img src="../../assets/img/ruleImg/table.png" alt="" class="table">
    </div>
    <p class="lastTips">*Quyết định cuối cùng thuộc về Alochat</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: 1,
      giftArr1: [
        {
          img: require('../../assets/img/ruleImg/gift2.png'),
          name: 'Huy chương thần chớp'
        },
        {
          img: require('../../assets/img/ruleImg/gift3.png'),
          name: 'Đảo Halloween *1'
        },
        {
          img: require('../../assets/img/ruleImg/bean1.png'),
          name: 'Đậu'
        }
      ],
      giftArr2: [
        {
          img: require('../../assets/img/ruleImg/gift4.png'),
          name: 'Bí đỏ *10  '
        },
        {
          img: require('../../assets/img/ruleImg/bean2.png'),
          name: '500 đậu'
        }
      ],
      giftArr3: [
        {
          img: require('../../assets/img/ruleImg/gift6.png'),
          name: 'Huy chương bảo hộ 15 ngày'
        },
        {
          img: require('../../assets/img/ruleImg/gift5.png'),
          name: 'Xe bí đỏ 15 ngày'
        },
        {
          img: require('../../assets/img/ruleImg/ticket.png'),
          name: 'Nạp xu thưởng 10%'
        }
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
  background-color: rgba(131, 56, 208, 1);
}

.rule {
  padding: 0.53rem 0.4rem;
  .actTime {
    text-align: center;
    color: rgba(255, 230, 181, 1);
    font-size: 0.26rem;
  }
  .tabs {
    width: 6.7rem;
    height: 0.9rem;
    line-height: 0.9rem;
    background: url(../../assets/img/tabs.png);
    background-size: 100% 100%;
    margin-top: 0.31rem;
    display: flex;
    span {
      flex: 1;
      text-align: center;
      &.act {
        background: url(../../assets/img/actTab2.png);
        background-size: 100% 100%;
      }
    }
  }
  .ruleTips {
    margin-top: 0.15rem;
  }
  .backGift {
    margin-bottom: 0.39rem;
    strong {
      display: block;
      text-align: center;
      font-size: 0.22rem;
      color: rgba(230, 163, 255, 1);
    }
  }
  .gfitBox {
    margin: 0.2rem auto;
    display: flex;
    justify-content: space-between;
    span {
      width: 1.5rem;
    }
    strong {
      display: block;
      text-align: center;
      font-size: 0.21rem;
      color: rgba(230, 163, 255, 1);
    }
  }
  .gfitBox1 {
    width: 4.97rem;
  }
  .gfitBox2 {
    width: 3.5rem;
  }
  img {
    display: block;
    margin: 0 auto;
    width: 1.45rem;
    height: 1.45rem;
  }
  h6 {
    font-size: 0.26rem;
    color: rgba(48, 255, 238, 1);
    margin-top: 0.3rem;
    font-weight: 500;
  }
  h5 {
    text-align: center;
    font-size: 0.28rem;
    color: rgba(255, 218, 124, 1);
    margin-top: 0.32rem;
  }
  p {
    font-size: 0.22rem;
    color: rgba(230, 163, 255, 1);
    font-weight: 500;
  }
  .lastTips {
    text-align: center;
    font-size: 0.22rem;
    color: rgba(230, 163, 255, 1);
    margin-top: 0.6rem;
  }
  .table {
    width: 4rem;
    height: 1.92rem;
    margin-top: 0.24rem;
  }
}
@import "../../assets/scss/common.scss";
</style>
