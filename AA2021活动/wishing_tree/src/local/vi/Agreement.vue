<template>
  <div class="rule">
    <div class="tabs">
      <a class="tab1" @click.prevent="mainTab=0" :class="{current:mainTab==0}" href="">Quy tắc</a>
      <a class="tab2" @click.prevent="mainTab=1" :class="{current:mainTab==1}" href="">Phần thưởng</a>
    </div>
    <div class="actTime">
      Thời gian: 12:00 8/2- 24:00 19/02
    </div>
    <div class="rule" v-if="mainTab == 0">
      <h5>Hướng dẫn tích điểm cầu nguyện:</h5>
      <p>1. Nhấn [Báo danh] để tham gia sự kiện, bắt đầu tích điểm cầu nguyện sau khi báo danh, điểm cầu nguyện cần nhấn bong bóng tương ứng để tích điểm.</p>
      <p>2. Tặng quà xu trong tác phẩm/ phòng Kara hoặc hoàn thành nhiệm vụ sẽ nhận điểm cầu nguyện, nhiệm vụ sẽ làm mới vào 0h mỗi ngày, điểm cầu nguyện chưa nhận trong ngày sẽ xóa vào lúc 24h.</p>
      <p>3. Điểm cầu nguyện cá nhân đạt đến tiêu chuẩn, sẽ nhận phần thưởng tương ứng.</p>
      <img src="./img/table.png" alt="" class="table">
      <p>4. Điểm cầu nguyện tổng đạt đến tiêu chuẩn, sẽ có những người dùng may mắn nhận thưởng, điểm cầu nguyện càng nhiều, tỉ lệ nhận càng cao.</p>
      <h5>Bảng cầu nguyện</h5>
      <p>Bảng ngày: Xếp hạng theo điểm cầu nguyện người dùng mỗi ngày trong thời gian sự kiện, người dùng có điểm cầu nguyện mỗi ngày vượt qua 666 có thể nhận phần thưởng.</p>
      <p>Bảng tổng: Xếp hạng theo điểm cầu nguyện người dùng trong thời gian sự kiện, 10 thí sinh hạng đầu sẽ nhận thưởng khủng khi sự kiện kết thúc.</p>
      <h5>Chú thích:</h5>
      <p>1. Trong thời gian sự kiện nếu có hành vi gian lận điểm, sẽ hủy bỏ phần thưởng và tư cách tham gia, nếu nghiêm trọng sẽ khóa tài khoản.</p>
      <p>2. Mỗi thiết bị chỉ có thể dùng 1 tài khoản tham gia sự kiện.</p>
      <p>3. Phần thưởng bảng cầu nguyện tổng sẽ phát trong vòng 7 ngày sau khi sự kiện kết thúc, phần thưởng do hệ thống phát tự động.</p>
      <p>4. Tất cả số liệu tác phẩm riêng tư và phòng riêng tư sẽ không được tính điểm.</p>
    </div>
    <div class="gift" v-else>
      <h5>Cây Cầu Nguyện phát thưởng<br /> (Hiển thị những phần thưởng hiếm có)</h5>
      <div class="giftList">
        <div class="giftItem" v-for="(item,index) in giftArr1" :key="index">
          <div class="imgBox">
            <img :src="item.img" alt="">
          </div>
          <strong v-html="item.name"></strong>
        </div>
      </div>
      <h5>Phần thưởng bảng tổng</h5>
      <div class="giftList">
        <div class="giftItem" v-for="(item,index) in giftArr2" :key="index">
          <div class="imgBox">
            <img :src="item.img" alt="">
          </div>
          <strong v-html="item.name"></strong>
        </div>
      </div>
      <p>
        Hạng 1:<br />
        Phiếu quà nạp 10% (1 lần) + Huy chương Cây Cầu Nguyện (30 ngày) + Trang sức Cây Cầu Nguyện (30 ngày) + Quà đặc hiệu Dạ Khúc (2880 xu) + Kỳ Lân Năm Mới (30 ngày) + 3000 xu + 8000 đậu
      </p>
      <p>
        Hạng 2:<br />
        Phiếu quà nạp 8% (1 lần) + Huy chương Cây Cầu Nguyện (30 ngày) + Trang sức Cây Cầu Nguyện (30 ngày) + Quà đặc hiệu Dạ Khúc (2880 xu) + Kỳ Lân Năm Mới (30 ngày) + 2000 xu + 5000 đậu
      </p>
      <p>
        Hạng 3:<br />
        Phiếu quà nạp 5% (1 lần) + Huy chương Cây Cầu Nguyện (30 ngày) + Trang sức Cây Cầu Nguyện (30 ngày) + Quà đặc hiệu Dạ Khúc (2880 xu) + Kỳ Lân Năm Mới (30 ngày) + 1000 xu + 3000 đậu
      </p>
      <p>
        Hạng 4-10: <br />
        Phiếu quà nạp 3% (1 lần) + Huy chương Cây Cầu Nguyện (30 ngày) + Trang sức Cây Cầu Nguyện (30 ngày) + Quà đặc hiệu Đu Quay (388 xu) + Kỳ Lân Năm Mới (30 ngày) + 5000 xu + 1000 đậu
      </p>
      <h5>Chú thích: </h5>
      <p>1. Tất cả túi quà có thời hạn 7 ngày.</p>
      <p>2. Phần thưởng trang sức có thể xem tại Tôi - Cửa hàng.</p>
      <!-- <p>3、活動中所有獎勵均需要手動點擊領取，實現許願的獎勵以K歌小助手信息為準</p> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mainTab: 0,
      giftArr1: [
        {
          img: require("../../img/gift_icon/gift1.png"),
          name: 'Siêu Sao<br />（118 xu）'
        },
        {
          img: require("../../img/gift_icon/gift2.png"),
          name: 'Hoa Hồng<br />（118 xu）'
        },
        {
          img: require("../../img/gift_icon/gift3.png"),
          name: 'Phiếu quà nạp'
        },
        {
          img: require("../../img/gift_icon/gift4.png"),
          name: 'Vô số xu'
        }
      ],
      giftArr2: [
        {
          img: require("../../img/gift_icon/gift5.png"),
          name: 'Huy chương Cây Cầu Nguyện'
        },
        {
          img: require("../../img/gift_icon/gift6.png"),
          name: 'Trang sức Cây Cầu Nguyện'
        },
        {
          img: require("../../img/gift_icon/gift7.png"),
          name: 'Dạ Khúc<br />	（2880 xu）'
        },
        {
          img: require("../../img/gift_icon/gift8.png"),
          name: 'Kỳ Lân Năm Mới'
        }
      ],

    }
  }
}
</script>
<style lang="scss" scoped>
.rule {
  padding: 0.37rem 0.22rem;
}
h5 {
  color: rgba(255, 245, 139, 1);
}
p {
  font-size: 0.22rem;
  color: rgba(255, 255, 255, 1);
  padding-left: 0.27rem;
  margin: 0.1rem 0;
}
.tabs {
  width: 7.18rem;
  height: 0.88rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background: url(../../img/tabs.png);
  background-size: 100% 100%;
  a {
    display: block;
    width: 3.56rem;
    height: 100%;
    text-align: center;
    line-height: 0.9rem;
    font-size: 0.32rem;
    color: rgba(255, 245, 219, 1);
    transition: all 0.1s linear;
    &.current {
      color: rgba(145, 77, 68, 1);
      background: url(../../img/tab_act.png);
      background-size: 100% 100%;
    }
  }
}
.actTime {
  font-size: 0.26rem;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  margin: 0.34rem auto;
}
.table {
  width: 5.64rem;
  height: 3.67rem;
  margin: 0.32rem 0 0.22rem;
}
.giftList {
  padding: 0 0.36rem;
  display: flex;
  justify-content: space-between;
  margin-top: 0.2rem;
  .giftItem {
    flex: 1;
  }
  .imgBox {
    width: 1.2rem;
    height: 1.2rem;
    background: #f46b6f;
    border: 0.02rem solid #ffeda4;
    border-radius: 0.14rem;
    margin: 0 auto;
    img {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
  strong {
    display: block;
    // margin-left: -0.15rem;
    color: rgba(255, 255, 255, 1);
    font-size: 0.22rem;
    text-align: center;
  }
}
</style>
