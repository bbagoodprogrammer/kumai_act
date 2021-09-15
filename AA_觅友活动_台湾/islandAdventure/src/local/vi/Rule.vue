<template>
  <div class="ruleMsg">
    <div class="tm">Thời gian：{{aTimer}}</div>
    <h6>Cách chơi</h6>
    <p>
      1、Mỗi kỳ mở 1 hải đảo, hoàn thành nhiệm vụ nhận ốc biển, ốc có thể đổi xẻng để đào kho báu, mỗi ngày tối đa đổi 10 cái xẻng<br />
      2、Người chơi có thể dùng Xu đổi xẻng vàng, mỗi ngày không giới hạn số lượng đổi xẻng vàng<br />
      3、Mỗi ngày dùng xẻng đào kho báu tăng tiềm lực chúa đảo, khi đóng hải đảo, BXH chúa đảo, tiểm lực chúa đảo lớn nhất sẽ trở thành chúa đảo (tiềm lực giống nhau sẽ ưu tiên cho người đạt trước),
      nhận quà chúa đảo: Chứng nhận chúa đảo vàng (15 ngày), khung ảnh ta là chúa đảo (10 ngày), hải đăng đảo-quà hiệu ứng đặc biệt * 1 (có hạn 7 ngày), hạng thứ hai và ba: hải đăng-quà tặng hiệu ứng
      đặc biệt * 1 (có giá trị trong 7 ngày)
    </p>
    <div class="giftList">
      <div class="giftItem" v-for="(item,index) in gift" :key="index">
        <div class="imgBox">
          <img :src="item.img" alt="">
        </div>
        <strong>{{item.name}}</strong>
      </div>
    </div>
    <h6>Quà đào kho báu</h6>
    <img src="./img/table1.png" alt="" class="table">
    <img src="./img/table2.png" alt="" class="table">
    <p>*Nếu dùng xẻng vàng để đào bảo 600 lần mà vẫn chưa tìm ra được Siêu đỉnh-Quà túi, thì lần 601 chắc chắn tìm được</p>
    <p>*Quà túi được tặng từ sự kiện có hiệu quả trong 7 ngày</p>

    <h6>khác </h6>
    <p>-Trong sự kiện, khi phát hiện người chơi gian lận, Admin sẽ hủy bỏ tư cách xếp hạng của người vi phạm mà không cần thông báo, đồng thời sẽ khóa tài khoản và thu hồi các phần thưởng của người
      chơi, bao gồm và không giới hạn trong: <br />
      a）Trong quá trình sự kiện nếu có hành động công kích xúc phạm người khác<br />
      b）Gian lận để nhận được phần thưởng<br />
    </p>
    <p> -Sự kiện không liên quan đến công ty Apple </p>
    <p> *Quyền quyết định cuối cùng thuộc về ban quản lý</p>
  </div>
</template>

<script>

import getDate from "../../utils/getDate"
import { mapState } from "vuex"
export default {
  data () {
    return {
      gift: [
        {
          name: ' Chứng nhận chúa đảo vàng ',
          img: require("../../img/ruleImg/gift1.png")
        },
        {
          name: 'Ta là chúa đảo- khung ảnh',
          img: require("../../img/ruleImg/gift2.png")
        },
        {
          name: 'Đảo hải đăng- quà hiệu ứng',
          img: require("../../img/ruleImg/gift3.png")
        }
      ]
    }
  },
  computed: {
    ...mapState(['activity']),
    aTimer () {
      if (AREA == 'tw') {
        return getDate(new Date(this.activity.stime * 1000), 1) + '-' + getDate(new Date(this.activity.etime * 1000), 1)
      } else if (AREA == 'vn') {
        return getDate(new Date(this.activity.stime * 1000), 2) + '-' + getDate(new Date(this.activity.etime * 1000), 2)
      } else if (AREA == 'id') {
        return getDate(new Date(this.activity.stime * 1000), 3) + '-' + getDate(new Date(this.activity.etime * 1000), 3)
      }

    }
  }
}
</script>

<style lang="scss">
body {
  background: #FFE3A6 !important;
  .ruleMsg {
    padding: 0.48rem 0.29rem;
  }
  .giftList {
    padding: 0 0.4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0.2rem 0;
    .giftItem {
      width: 2rem;
    }
    .imgBox {
      width: 1.88rem;
      height: 1.88rem;
      background: url(./img/imgBox.png);
      background-size: 100% 100%;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    strong {
      width: 100%;
      display: block;
      text-align: center;
      font-size: 0.26rem;
      color: #7D3F0A;
    }
  }
  .tm {
    text-align: center;
    color: #A67247;
    margin-bottom: 0.29rem;
  }
  h6 {
    color: #7D3F0A;
    font-size: 0.28rem;
    font-weight: bold;
  }
  p {
    color: #A67247;
    font-size: 0.28rem;
  }
  .table {
    display: block;
    width: 5.85rem;
    height: 4.32rem;
    margin: 0.29rem auto;
  }
}
</style>