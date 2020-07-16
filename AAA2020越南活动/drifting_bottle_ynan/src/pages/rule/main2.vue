<template>
  <div class="rule">
    <div class="tabs">
      <span :class="{act:showType==1}" @click="tabClick(1)">Thể lệ</span>
      <span :class="{act:showType==2}" @click="tabClick(2)">Phần thưởng</span>
    </div>
    <div class="ruleTips" v-if="showType==1">
      <h5>Lịch trình sự kiện:</h5>
      <div class="time">
        <p>Thời gian:18h 15/7 – 21h 27/7</p>
        <p>Thời gian thả: 18h 15/7 – 18h 27/7</p>
        <p>Thời gian nhặt: 22h 15/7 – 21h 27/7</p>
      </div>
      <h5>Thể lệ thả</h5>
      <p>1. Chọn bài hát của bạn hoặc bài hát bạn thích để thả, mỗi ngày lần thả đầu miễn phí, mỗi lần mua lượt thả sẽ quảng cáo 1 bài hát.<br /> <strong class="red">Ghi chú: bài hát được thả phải là ca khúc đơn ca đăng trong vòng 72h, và chưa từng tham gia sự kiện khác.</strong> </p>
      <p>2. Thả miễn phí: hệ thống sẽ tự động tính toán lượt nghe và thời lượng nghe bài hát, thả cho những khán giả có thể sẽ thích bài hát này, bài hát chất lượng sẽ được thả nhiều hơn~<br /> <strong class="red">Ghi chú: mỗi bài hát chỉ được thả miễn phí 1 lần, mời thận trọng</strong> </p>
      <p>3. Thả đặc biệt: bạn có thể thiết lập số lượng lọ điều ước muốn thả và thả lọ cao cấp để tăng thời lượng nghe, bài hát chất lượng sẽ được thả nhiều hơn~<br /><strong class="red">Ghi chú: chú ý số người thả lọ là số lượt tiếp cận, không phải số người nghe</strong></p>
      <p>4. Bài hát sau khi thả có thể vào lịch sử để xem số liệu, kiểm tra lượt nghe và số quan tâm.</p>
      <p>5. Trong thời gian thả, nếu bài hát bị xoá hoặc cài đặt riêng tư, người khác sẽ không thể nhặt.</p>
      <h5>Thể lệ nhặt lọ:</h5>
      <p>1. Mỗi người mỗi ngày được nhặt miễn phí 6 lần.</p>
      <p>2. Mỗi lượt sẽ nhặt ngẫu nhiên 1-6 lọ, bao gồm mảnh lọ, lọ bình thường và lọ cao cấp, mảnh lọ không có bài hát, chỉ có bỏ đi, sau khi nhặt được lọ thường hoặc cao cấp nếu nghe hết bài sẽ nhận phần thưởng ngẫu nhiên.</p>
      <p>3. Mỗi giọng hát đều đáng được chăm chú lắng nghe, nếu phát hiện bất cứ hành vi gian lận hoặc bình luận ác ý, ban tổ chức sẽ thu hồi phần thưởng của bạn và huỷ kết quả tham gia.</p>
      <h5>Quy định khác: </h5>
      <p>Trong quá trình diễn ra sự kiện, nếu phát hiện người dùng gian lận trong sự kiện, ban tổ chức sẽ dựa theo mức độ vi phạm để xử lý, người vi phạm sẽ bị loại khỏi sự kiện hoặc khoá tài khoản. Bao gồm các hành vi sau:</p>
      <div class="other">
        <p>1. Dùng hoặc trộm bài hát của người khác để dự thi.</p>
        <p>2. Mượn hoặc trộm tài khoản của người khác để dự thi.</p>
        <p>3. Dùng nhiều tài khoản để tham gia dự thi.</p>
        <p>4. Bình luận ác ý, quảng cáo vào bài hát dự thi.</p>
        <p>5. Toàn bộ các hành vi gian lận khác.</p>
        <p>6. Nếu có người báo cáo bài hát được thả không có người hát và được xác thực, bài hát sẽ bị xoá và loại bài hát khỏi cuộc thi, nếu nghiêm trọng sẽ loại thí sinh khỏi cuộc thi.</p>
        <!-- <p>6.若投瓶歌曲為作弊歌曲，一旦被檢查出，則取消該作品的參賽資格</p> -->
      </div>
      <p> Nếu cố ý gian lận, dù có tham gia sự kiện hay không đều bị khoá toàn bộ tài khoản chính và phụ. Sau khi kết thúc sự kiện ban tổ chức sẽ thu hồi toàn bộ phần thưởng.</p>
    </div>
    <div class="wardsTips" v-else>
      <h5>Thưởng thả lọ</h5>
      <p>Xếp hạng theo số liệu lượt nghe, thời lượng nghe và quan tâm</p>
      <p>Sau khi sự kiện kết thúc sẽ công bố BXH~</p>
      <h5>Top 10 BXH bài hát</h5>
      <div class="giftBox">
        <span v-for="(item,index) in tenGift" :key="index">
          <img :src="require(`../../assets/img/gift/${item.img}.png`)" alt="">
          <strong>{{item.name}}</strong>
        </span>
      </div>
      <h5>Top 11- 100 BXH bài hát</h5>
      <div class="giftBox2">
        <span v-for="(item,index) in otherGift" :key="index">
          <img :src="require(`../../assets/img/gift/${item.img}.png`)" alt="">
          <strong>{{item.name}}</strong>
        </span>
      </div>
      <p>Về phần thưởng:</p>
      <p>Nếu 1 người có nhiều bài trên BXH, chỉ nhận phần thưởng của bài hạng cao nhất</p>
      <h5>Thưởng nhặt lọ</h5>
      <p>Nhặt lọ thường và nghe hết 20 giây thưởng 2 đậu, nhặt lọ cao cấp và nghe hết 30 giây thưởng 5 đâu hoặc xu với số lượng ngẫu nhiên.</p>
      <p class="red">Đồng thời, khi nhặt còn có cơ hội nhận được quà xu.</p>
      <p>Chú ý: tất cả túi quà nhận tại sự kiện có hiệu lực trong 7 ngày, mới sử dụng kịp thời!</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showType: 1,
      tenGift: [
        {
          img: 0,
          name: '100 xu'
        },
        {
          img: 1,
          name: 'Túi quà Lọ Mộng Ảo'
        },
        {
          img: 2,
          name: 'Huy chương Nhà Phiêu Lưu'
        },
        {
          img: 3,
          name: 'VIP 1 tháng'
        },
      ],
      otherGift: [
        {
          img: 4,
          name: '500 đậu'
        },
        {
          img: 2,
          name: 'Huy chương Nhà Phiêu Lưu'
        },
        {
          img: 3,
          name: 'VIP 1 tháng'
        },
      ]
    }
  },
  created() {
    document.title = 'Thể lệ'
  },
  methods: {
    tabClick(val) {
      this.showType = val
    }
  }
}
</script>

<style lang="scss">
.red {
  color: rgba(181, 218, 255, 1);
}
body {
  background-color: rgba(16, 128, 208, 1);
}
.rule {
  padding: 0.25rem 0.26rem;
  .tabs {
    width: 6.88rem;
    height: 0.98rem;
    display: flex;
    align-items: center;
    padding: 0 0.05rem;
    background: url(../../assets/img/ruleTabs.png);
    background-size: 100% 100%;
    span {
      width: 3.66rem;
      height: 0.9rem;
      text-align: center;
      line-height: 0.9rem;
      color: rgba(255, 220, 42, 1);
      font-weight: 700;
      font-size: 0.32rem;
      &.act {
        color: rgba(174, 72, 0, 1);
        background: url(../../assets/img/ruleAct.png);
        background-size: 100% 100%;
      }
    }
  }
  .ruleTips {
    padding-left: 0.3rem;
    h5 {
      font-weight: 800;
      color: rgba(255, 211, 168, 1);
      margin: 0.4rem 0 0.25rem;
    }
    .time,
    .other {
      p {
        margin: 0;
      }
    }
    .other {
      margin-bottom: 0.3rem;
    }
    p {
      padding-left: 0.33rem;
      font-size: 0.24rem;
      color: rgba(181, 218, 255, 1);
      font-weight: 600;
      margin-bottom: 0.25rem;
    }
  }
  .wardsTips {
    padding-bottom: 1.5rem;
    h5 {
      text-align: center;
      font-weight: 800;
      color: rgba(255, 211, 168, 1);
      margin: 0.28rem 0 0.24rem 0;
    }
    p {
      color: rgba(181, 218, 255, 1);
      font-size: 0.24rem;
      font-weight: 600;
    }
    .giftBox,
    .giftBox2 {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0 1.6rem;
      span {
        margin-bottom: 0.26rem;
      }
      img {
        width: 1.6rem;
        height: 1.6rem;
        display: block;
      }
      strong {
        width: 1.6rem;
        display: block;
        color: rgba(218, 209, 255, 1);
        font-size: 0.24rem;
        font-weight: 600;
        margin-top: 0.15rem;
        text-align: center;
      }
    }
    .giftBox2 {
      padding: 0 0.55rem;
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
