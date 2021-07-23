<template>
  <div class="rule">
    <div class="actTime">{{tmStr}}</div>
    <div class="tabs">
      <span :class="{act:type == 1}" @click="tabClick(1)">Quy tắc event</span>
      <span :class="{act:type == 2}" @click="tabClick(2)">Quà event</span>
    </div>
    <div class="ruleTips" v-if="type == 1">
      <h6>Tích lũy điểm sảng khoái chỉ định trong mùa hè sản khoái</h6>
      <p>1. Sau khi báo danh event, nhận quà coca và quà chỉ định, có thể nhận được điểm sảng khoái<br />
        2. Điểm sảng khoái= điểm coca sảng khoái + điểm party sảng khoái<br />
        Điểm coca sảng khoái = số lượng coca*50<br />
        Điểm party sảng khoái= giá trị quà chỉ định nhận được trong phòng X5<br />
        3. Quà chỉ định: súng nước, kem, summer, món ăn mùa hè, mùa hè mát mẻ, nước ngọt
      </p>
      <h6>Quy tắc xếp hạng</h6>
      <p>1. Xếp hạng theo điểm sảng khoái từ cao đến thấp, khi điểm bằng nhau người đạt điểm trước sẽ xếp hạng trên</p>
      <p>2. BXH ngày và tổng xếp hạng hiển thị điểm sảng khoái của TOP 100
      <p>
      <h6>Chú ý</h6>
      <p>1. Trong event, khi phát hiện người chơi tham gia event gian lận, Alochat sẽ hủy bỏ tư cách tham gia của người gian lận mà không cần thông báo trước, khóa tài khoản, thu hồi phần thưởng của
        người chơi, bao gồm và không giới hạn:<br />
        a) Cùng 1 người chơi đăng ký nhiều tài khoản tham gia event<br />
        b) Gây tổn hại đến người chơi khác<br />
        c) Nhận xu, quà chỉ định của event hoặc nhận điểm theo cách gian lận<br />
        2. Định nghĩa tài khoản Clone: tài khoản thứ 2 đăng nhập vào cùng 1 thiết bị hoặc cùng 1 IP sẽ được xem là acc Clone
      </p>
    </div>
    <div class="giftTips" v-else>
      <h6>1. Quà BXH ngày</h6>
      <div class="backGift">
        <img src="../../assets/img/ruleImg/gift1.png" alt="">
        <strong>Quà túi súng bóng bóng 7 sắc cầu vòng （500 xu）x1</strong>
      </div>
      <p>Người chơi trong Top 10 của BXH ngày, sẽ có 2 người được ngẫu nhiên chọn ra để nhận quà túi súng bong bóng 7 sắc cầu vòng （500 xu）*1 cái； 24:00 mỗi ngày sẽ chọn ra người nhận quà, và sẽ gửi
        quà trực tiếp đến túi người chơi; thời gian mở thưởng của ngày cuối của event cũng chính là thời gian kết thúc event</p>
      <h6>2. Quà BHX tổng</h6>
      <h5>Hạng 1-3</h5>
      <div class="gfitBox1 gfitBox">
        <span v-for="(item,index) in giftArr1" :key="index">
          <img :src="item.img" alt="">
          <strong>{{item.name}}</strong>
        </span>
      </div>
      <!-- <h5>Hạng 4-6</h5> -->
      <div class="gfitBox2 gfitBox">
        <span v-for="(item,index) in giftArr2" :key="index">
          <img :src="item.img" alt="">
          <strong>{{item.name}}</strong>
        </span>
      </div>
      <p>
        Hạng 1:Huy chương 【Bảo bối sảng khoái】 30 ngày + Quà túi Hồ bơi dưa hấu 1 cái （10000 xu）+ 5000 đậu<br />
        Hạng 2：Huy chương 【Bảo bối sảng khoái】 15 ngày + Quà túi Kem ngọt ngào dễ thương（8000 xu）+ 3000 đậu<br />
        Hạng 3：Huy chương 【Bảo bối sảng khoái】 10 ngày + Quà túi Kem ngọt ngào dễ thương（8000 xu）+ 1000 đậu<br />
        Hạng 4-6： Quà túi Dâu tây kem 10 cái + 500 đậu<br />

      </p>
      <h6>3. Quà BXH cống hiến</h6>
      <!-- <div class="gfitBox1 gfitBox">
        <span v-for="(item,index) in giftArr3" :key="index">
          <img :src="item.img" alt="">
          <strong>{{item.name}}</strong>
        </span>
      </div> -->
      <p>
        Fans cuồng nhất của Hạng 1 bảo bối sảng khoái： Huy chương 【Bảo bối sảng khoái】 30 ngày + Quà túi hồ bơi dưa hấu 1 cái（10000 xu） + Xe-cua （15 ngày）+10% trả lễ nạp thẻ<br />
        Fans cuồng nhất của Hạng 2 bảo bối sảng khoái: Huy chương 【Bảo bối sảng khoái】 15 ngày + Xe-cua （15 ngày）+10% trả lễ nạp thẻ<br />
        Fans cuồng nhất của Hạng 3 bảo bối sảng khoái： Huy chương 【Bảo bối sảng khoái】 10 ngày+ Xe-cua （15 ngày）+10% trả lễ nạp thẻ<br />
      <p>Fans cuồng nhất trong BXH fans của người dùng thuộc TOP 3 BXH sảng khoái sẽ nhận được phần thưởng cống hiến</p>
      <p>cách sử dụng phiếu trả lễ nạp thẻ （10%）: nạp bất kỳ mốc nạp nào trong ngày 1/8, vào ngày thứ 2 sau khi nạp sẽ nhận được 10% xu nạp</p>
      <h6>4. Quà tặng coca</h6>
      <p>Không phải tài khoản Clone mỗi lần tặng 20 chai coca, sẽ nhận được khung avatar mua hè hoàn hảo 3 ngày</p>
      <h6>5、Quà nâng cao</h6>
      <!-- <img src="../../assets/img/ruleImg/table.png" alt="" class="table"> -->
      <p>
        Điểm sảng khoái đạt 5000, thưởng Quà túi Dâu tây kem*5<br />
        Điểm sảng khoái đạt 30000, thưởng Khung ảnh- Cực cool (7 ngày)<br />
        Điểm sảng khoái đạt 80000, thưởng Xe-Cua（10 ngày）
      </p>
      <h6>6. Chú ý</h6>
      <p>
        a) Tất cả quà túi trong sự kiện có hiệu lực 7 ngày<br />
        b) Sự kiện không liên quan đến tập đoàn Apple</p>
    </div>
    <p class="lastTips">*Quyền quyết định cuối cùng thuộc về Alochat</p>
  </div>
</template>

<script>

import getDate from "../../utils/getDate"
export default {
  data () {
    return {
      type: 1,
      giftArr1: [
        {
          img: require('../../assets/img/ruleImg/gift2.png'),
          name: 'Huy chương bảo bối sảng khoái'
        },
        {
          img: require('../../assets/img/ruleImg/gift3.png'),
          name: 'Quà túi hồ bơi dưa hấu'
        },
        {
          img: require('../../assets/img/ruleImg/gift4.png'),
          name: 'Quà túi Kem ngọt ngào dễ thương'
        }
      ],
      giftArr2: [
        {
          img: require('../../assets/img/ruleImg/gift5.png'),
          name: 'Quà túi Dâu tây kem '
        },
        {
          img: require('../../assets/img/ruleImg/bean1.png'),
          name: 'đậu'
        }
      ],
      giftArr3: [
        {
          img: require('../../assets/img/ruleImg/gift6.png'),
          name: 'Huy chương người thủ hộ 15 ngày'
        },
        {
          img: require('../../assets/img/ruleImg/gift5.png'),
          name: 'Xe-cua 15 ngày'
        },
        {
          img: require('../../assets/img/ruleImg/ticket.png'),
          name: 'Nạp thẻ trả lễ（10%）'
        }
      ]
    }
  },
  computed: {
    tmStr () {
      const tm = JSON.parse(sessionStorage.getItem('tm'))
      return getDate(new Date(tm.stime * 1000), 5) + '-' + getDate(new Date(tm.etime * 1000), 5)
    }
  },
  methods: {
    tabClick (val) {
      this.type = val
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #1E42E4;
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
@import '../../assets/scss/common.scss';
</style>
