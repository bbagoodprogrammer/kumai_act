<template>
  <div class="rule">
    <div class="tabs">
      <a class="tab1" @click.prevent="mainTab=0" :class="{current:mainTab==0}" href="">Quy tắc</a>
      <a class="tab2" @click.prevent="mainTab=1" :class="{current:mainTab==1}" href="">Phần thưởng</a>
    </div>
    <div class="actTime">
      Thời gian: 12:00 ngày 07/02- 24:00 ngày 18/02
    </div>
    <div class="rule" v-if="mainTab == 0">
      <h5>Cầu nguyện Cây Ước Nguyện</h5>
      <p>1. Người dùng sau khi báo danh mới có thể tham gia sự kiện, mới bắt đầu tích lũy điểm cầu nguyện.</p>
      <p>2. Trong tác phẩm/Phòng Kara tặng quà xu hoặc hoàn thành nhiệm vụ có thể nhận điểm cầu nguyện, nhiệm vụ sẽ cập nhật vào 0h mỗi ngày, điểm cầu nguyện chưa nhận trong ngày sẽ xóa vào lúc 24h.</p>
      <p>3. Điểm cầu nguyện cá nhân đạt đến giá trị nhất định có thể nhận phần thưởng tương ứng.</p>
      <img src="./img/table.png" alt="" class="table">
      <p>4. Điểm cầu nguyện tổng trong thời gian sự kiện đạt đến giá trị nhất định, Cây Cầu Nguyện sẽ hiển linh ngẫu nhiên phát phần thưởng cho người tham gia.</p>
      <h5>Bảng cầu nguyện</h5>
      <p>Bảng ngày: Xếp hạng theo điểm cầu nguyện người dùng cống hiến mỗi ngày trong thời gian sự kiện, người dùng có điểm cầu nguyện mỗi ngày vượt qua 666 có thể nhận phần thưởng.</p>
      <p>Bảng tổng: Xếp hạng theo điểm cầu nguyện người dùng cống hiến trong thời gian sự kiện, 10 người dùng hạng đầu sẽ nhận được phần thưởng khủng khi sự kiện kết thúc.</p>
      <h5>Chú thích:</h5>
      <p>1. Trong thời gian sự kiện nếu có hành vi gian lận điểm, sẽ hủy bỏ phần thưởng và tư cách tham gia, nếu nghiêm trọng sẽ khóa tài khoản</p>
      <p>2. Mỗi thiết bị chỉ có thể dùng 1 tài khoản tham gia sự kiện</p>
      <p>3. Phần thưởng bảng cầu nguyện tổng sẽ phát trong vòng 7 ngày sau khi sự kiện kết thúc, phần thưởng do hệ thống phát tự động</p>
      <p>4、所有私密作品/4. Tất cả số liệu tác phẩm/phòng kara khóa sẽ không được tính </p>
    </div>
    <div class="gift" v-else>
      <h5>Cây Cầu Nguyện phát thưởng (Hiển thị những phần thưởng hiếm có)</h5>
      <div class="giftList">
        <div class="giftItem" v-for="(item,index) in giftArr1" :key="index">
          <div class="imgBox">
            <img :src="item.img" alt="">
          </div>
          <strong>{{item.name}}</strong>
        </div>
      </div>
      <h5>Phần thưởng bảng tổng</h5>
      <div class="giftList">
        <div class="giftItem" v-for="(item,index) in giftArr2" :key="index">
          <div class="imgBox">
            <img :src="item.img" alt="">
          </div>
          <strong>{{item.name}}</strong>
        </div>
      </div>
      <p>
        第1名<br />
        單筆10%儲值返利券+新年許願徽章30天+新年許願頭飾30天+K房禮物夜之戀曲*1（2880金幣/個）+年獸座駕30天+3000金幣+8000金豆
      </p>
      <p>
        第2名<br />
        單筆8%儲值返利券+新年許願徽章30天+新年許願頭飾30天+K房禮物夜之戀曲*1（2880金幣/個）+年獸座駕30天+2000金幣+5000金豆
      </p>
      <p>
        第3名<br />
        單筆5%儲值返利券+新年許願徽章30天+新年許願頭飾30天+K房禮物夜之戀曲*1（2880金幣/個）+年獸座駕30天+1000金幣+3000金豆
      </p>
      <p>
        第4-10名<br />
        單筆3%儲值返利券+新年許願徽章30天+新年許願頭飾30天+作品禮物浪漫摩天輪*1（388金幣/個）+年獸座駕30天+500金幣+1000金豆
      </p>
      <h5>備註：</h5>
      <p>1、所有背包禮物有效期為7天</p>
      <p>2、頭飾獎勵可以在“我”頁面中“個性商城”里查看</p>
      <p>3、活動中所有獎勵均需要手動點擊領取，實現許願的獎勵以K歌小助手信息為準</p>
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
          name: '巨星登場（168金幣/個）'
        },
        {
          img: require("../../img/gift_icon/gift2.png"),
          name: '玫瑰花束（168金幣/個）'
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
          name: '新年許願徽章'
        },
        {
          img: require("../../img/gift_icon/gift6.png"),
          name: '新年許願頭飾'
        },
        {
          img: require("../../img/gift_icon/gift7.png"),
          name: '夜之戀曲（2880金幣 / 個）'
        },
        {
          img: require("../../img/gift_icon/gift8.png"),
          name: '年獸座駕'
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
