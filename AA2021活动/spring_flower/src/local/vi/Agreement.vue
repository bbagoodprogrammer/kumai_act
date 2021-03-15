<template>
  <div class="rule">
    <div class="tabs">
      <a class="tab1" @click.prevent="mainTab=0" :class="{current:mainTab==0}" href="">Phần thưởng</a>
      <a class="tab2" @click.prevent="mainTab=1" :class="{current:mainTab==1}" href=""> Thể lệ</a>
    </div>
    <div class="actTime">
      Thời gian：18h 16/03 – 20h 3/04
    </div>
    <div class="ruleList" v-if="mainTab == 0">
      <h5>Phần thưởng</h5>
      <div class="giftArr">
        <div class="giftItem" v-for="(item,index) in giftArr" :key="index">
          <div class="imgBox">
            <img :src="item.img" alt="">
          </div>
          <strong>{{item.name}}</strong>
        </div>
      </div>
      <h5>Phần thưởng thành tựu</h5>
      <img src="./img/table2.png" alt="" class="table">
      <h5>Phần thưởng top 10 Bảng Làm Vườn Giỏi Nhất</h5>
      <h6>Hạng 1: </h6>
      <p>Huy Chương Làm Vườn Giỏi Nhất (30 ngày)+ Xe Tường Vy (30 ngày)+ 10 Túi Quà Vòng Hoa Xuân (88 xu)+ 5000 xu+ 8000 đậu</p>
      <h6>Hạng 2</h6>
      <p>Huy Chương Làm Vườn Giỏi Nhất (20 ngày)+ Xe Tường Vy (30 ngày)+ 8 Túi Quà Vòng Hoa Xuân (88 xu)+ 3000 xu+ 5000 đậu</p>
      <h6>Hạng 3: </h6>
      <p> Huy Chương Làm Vườn Giỏi Nhất (20 ngày)+ Xe Tường Vy (20 ngày)+6 Túi Quà Vòng Hoa Xuân (88 xu)+ 1000 xu+ 3000 đậu</p>
      <h6>Hạng 4-6:</h6>
      <p>Huy Chương Làm Vườn Giỏi Nhất (15 ngày)+ Xe Tường Vy (15 ngày)+ 4 Túi Quà Vòng Hoa Xuân (88 xu)+ 800 xu+ 2000 đậu</p>
      <h6>Hạng 7-10:</h6>
      <p> Huy Chương Làm Vườn Giỏi Nhất (7 ngày)+ Xe Tường Vy (10 ngày)+ 2 Túi Quà Vòng Hoa Xuân (88 xu) + 500 xu + 1000 đậu</p>
      <h5 class="mt">Thể lệ sử dụng phần thưởng</h5>
      <p>1. Phiếu nạp hoàn xu trong quà thăng cấp, có hiệu lực trong 24h kể từ khi nhận, có thể cộng dồn, phần thưởng nạp xu sẽ gửi vào tài khoản ngay</p>
      <p>2.Túi quà có hiệu lực trong 7 ngày, hãy sử dụng trong thời gian hiệu lực</p>
    </div>
    <div class="giftItme" v-else>
      <h5>Thể lệ</h5>
      <h6>Báo danh</h6>
      <p>Nhấn “Báo danh ngay” là có thể tham gia sự kiện, số liệu sau khi nhấn báo danh mới được tính vào thành tích sự kiện</p>
      <h6>Thể lệ xếp hạng</h6>
      <p>1. Trong thời gian sự kiện, xếp hạng dựa vào số lượng Hoa Tâm Nguyện người dùng thu thập thành công (bao gồm số lượng hoa đã dùng), số hoa chưa thu hoạch trong vườn không được tính</p>
      <p>2. Nếu số hoa nhận được giống nhau, đạt được số lượng trước sẽ xếp trước</p>
      <p>3. Bảng hiển thị thành tích thi đấu của top 100 người dùng, phần thưởng sẽ được phát trong 7 ngày sau khi sự kiện kết thúc</p>
      <h5>Sách lược trồng trọt</h5>
      <h6>1. Hạt giống</h6>
      <p>(1) Hạt giống thường:</p>
      <p>Mỗi lần thu hoạch 5 Hoa Tâm Nguyện, thời gian sinh trưởng là 10 phút, nhận thông qua nhiệm vụ làm vườn.</p>
      <p>(2) Hạt giống trắng:</p>
      <p>Mỗi lần thu hoạch 15 Hoa Tâm Nguyện, thời gian sinh trưởng là 10 phút, mỗi vườn hoa có thể trồng nhiều nhất 5 hạt giống 1 lần, nhận thông qua nạp xu.</p>
      <p class="se">Lượng xu nạp chỉ tính trong ngày, 00:00 mỗi ngày thiết lập lại</p>
      <h6>2. Hướng dẫn trồng cây</h6>
      <p>1) Nhấn vườn hoa trống, chọn Hạt giống thường hoặc Hạt giống trắng để trồng</p>
      <p>2) Sau khi trồng thành công, hạt giống sẽ đếm ngược thời gian trưởng thành; Khi trồng nhiều hạt giống trắng, thời gian trưởng thành sẽ là 10 phút*số lượng trồng</p>
      <p>3) Đếm ngược thời gian trưởng thành kết thúc, hoa sẽ chín, nhấn vào hoa đã chín là có thể thu hoạch thành công. Tích lũy mỗi 20 đóa hoa, có thể rút thưởng 1 lần:</p>
      <p class="se">*Sau khi sự kiện kết thúc, không thể thao tác trồng, tăng tốc, hái tất cả</p>
      <h6>3. Hướng dẫn tăng tốc</h6>
      <p>(1) Tiêu hao 1 lần Hoa Thần Chúc Phúc, có thể giảm thời gian sinh trưởng của hoa mục tiêu 10 phút; nếu thời gian sinh trưởng còn lại không đủ 10 phút, hoa sẽ chín ngay lập tức.</p>
      <p>(2) Hoa Thần Chúc Phúc nhận được thông qua nạp xu</p>
      <h6>4. Mở rộng vườn hoa</h6>
      <p>Người dùng có thể dùng xu mở rộng vườn hoa. Thời gian sự kiện mỗi người nhiều nhất có thể mở rộng 3 mảnh vườn, vườn được mở rộng có hiệu lực trong thời gian sự kiện.</p>
      <h5 class="mt">Lắc rút thưởng</h5>
      <p>Thời gian sự kiện, có thể dùng 20 Hoa Tâm Nguyện/lần lắc Bình Hoa Tâm Nguyện, nhận phần thưởng. Phần thưởng nhận được tự động gửi vào tài khoản, hãy kiểm tra. </p>
      <h5 class="mt">Quy định khác</h5>
      <p>Trong quá trình diễn ra sự kiện, nếu phát hiện người dùng gian lận trong sự kiện, ban tổ chức sẽ dựa theo mức độ vi phạm để xử lý, người vi phạm sẽ bị loại khỏi sự kiện hoặc khoá tài khoản.
        Bao gồm các hành vi sau:</p>
      <p>1. Dùng hoặc trộm bài hát của người khác để dự thi.</p>
      <p>2. Mượn hoặc trộm tài khoản của người khác để dự thi.</p>
      <p>3. Dùng nhiều tài khoản để tham gia dự thi.</p>
      <p>4. Bình luận ác ý, quảng cáo vào bài hát dự thi.</p>
      <p>5. Toàn bộ các hành vi gian lận khác.</p>
      <p>Nếu cố ý gian lận, dù có tham gia sự kiện hay không đều bị khoá toàn bộ tài khoản chính và phụ.Sau khi kết thúc sự kiện ban tổ chức sẽ thu hồi toàn bộ phần thưởng.</p>
    </div>
    <p class="lastTips lastMt">Quyết định của ban tổ chức là quyết định cuối cùng</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      mainTab: 0,
      giftArr: [
        {
          name: 'Xe Tường Vy',
          img: require('../../img/ruleGift/gift_1.png')
        },
        {
          name: 'Huy Chương Làm Vườn Giỏi Nhất',
          img: require('../../img/ruleGift/gift_2.png')
        },
        {
          name: 'Túi Quà Bình Hoa',
          img: require('../../img/ruleGift/gift_3.png')
        },
        {
          name: 'Túi Quà Vòng Hoa Xuân',
          img: require('../../img/ruleGift/gift_4.png')
        },
        {
          name: 'Trang Sức Siêu Tên Lửa',
          img: require('../../img/ruleGift/gift_5.png')
        },
        {
          name: 'VIP',
          img: require('../../img/ruleGift/gift_6.png')
        },
        {
          name: 'Vô số xu',
          img: require('../../img/ruleGift/gift_7.png')
        },
        {
          name: 'Vô số đậu',
          img: require('../../img/ruleGift/gift_8.png')
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.se {
  color: RGBA(179, 249, 255, 1);
}
.lastTips {
  text-align: center;
  color: rgba(196, 202, 255, 1);
}
.mt {
  margin-top: 0.3rem;
}
.lastMt {
  margin-top: 3rem;
}
.table {
  display: block;
  width: 6.5rem;
  height: 2.89rem;
  margin: 0 auto 0.25rem;
}
.giftArr {
  width: 6.5rem;
  height: 4.34rem;
  background: url(../../img/ruleGiftListBg.png);
  background-size: 100% 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  padding-top: 0.35rem;
  margin-bottom: 0.25rem;
  .giftItem {
    height: 1.6rem;
    width: 25%;
  }
  .imgBox {
    width: 1.3rem;
    height: 1.3rem;
    background: #5447BE;
    border-radius: 0.2rem;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  strong {
    display: block;
    text-align: center;
    color: rgba(196, 202, 255, 1);
    font-size: 0.22rem;
  }
}
h5 {
  font-size: 0.28rem;
  color: rgba(255, 219, 125, 1);
  text-align: center;
  margin-bottom: 0.25rem;
}
h6 {
  color: rgba(255, 219, 125, 1);
  font-size: 0.28rem;
  margin-top: 0.15rem;
}

.rule {
  background: rgba(121, 118, 237, 1);
  padding: 0.37rem 0.22rem;
}
p {
  margin-top: 0.15rem;
  color: #fed8ff;
  font-size: 0.22rem;
}
.tabs {
  width: 6.8rem;
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
    color: rgba(165, 147, 255, 1);
    // transition: all 0.1s linear;
    &.current {
      color: rgba(255, 255, 255, 1);
      background: url(../../img/tabs_act.png);
      background-size: 100% 100%;
    }
  }
}
.actTime {
  font-size: 0.26rem;
  text-align: center;
  color: rgba(255, 219, 125, 1);
  margin: 0.34rem auto;
}
</style>
