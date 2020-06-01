<template>
  <div class="rule">
    <div class="mainTabs">
      <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" href="">Thể lệ</a>
      <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" href="">Phần thưởng</a>
    </div>
    <div class="rule" v-show="mainTab == 0">
      <h3 class="noTop">Thời gian</h3>
      <p class="time">10h ngày 10/4 đến 21h ngày 20/4</p>
      <h3>Báo danh</h3>
      <p>- Khi sự kiện bắt đầu, toàn bộ idol tháng này tự động báo danh tham gia sự kiện, không cần vào trang sự kiện để báo danh.</p>
      <p>- Trong thời gian sự kiện, người dùng tặng quà idol đang live xem như báo danh thành công, không cần vào trang sự kiện để báo danh.</p>
      <h3>Nhiệm vụ idol và xếp hạng</h3>
      <p>- Idol hoàn thành nhiệm vụ mỗi ngày sẽ nhận được điểm số tương ứng, xếp hạng dựa theo tổng số điểm nhận trong thời gian sự kiện, 0h mỗi ngày xoá hết tiến độ nhiệm vụ, danh sách nhiệm vu như sau:</p>
      <img src="../../assets/img/taskImg.png" alt="" class="taskImg">
      <p>- Nếu điểm số mỗi ngày đạt giới hạn sẽ không thể tăng nữa. </br>
        - Nếu điểm số bằng nhau, idol đạt điểm số trước sẽ xếp hạng cao hơn.</br>
        - Nhiệm vụ thời gian live: trong thời gian sự kiện mỗi ngày idol livestream đạt thời lượng yêu cầu sẽ nhận điểm số tương ứng.</br>
        - Fan mới: trong thời gian sự kiện số lượng fan mới mỗi ngày của idol đạt điều kiện sẽ nhận điểm số tương ứng.</br>
        - Người tặng quà xu: trong thời gian sự kiện số lượng người tặng quà xu cho idol đang livestream đạt điều kiện sẽ nhận điểm số tương ứng.</br>
        - Số xu quà nhận: trong thời gian sự kiện số xu quà nhận khi livestream mỗi ngày của idol đạt điều kiện sẽ nhận điểm số tương ứng</br>
        - Trong mỗi nhiệm vụ, mỗi ngày chỉ lấy số điểm tối đa mà idol nhận được.</br>
        - Nhiệm vụ mỗi ngày sẽ xoá hết tiến độ vào 0h hôm sau, tổng điểm nhận trong thời gian sự kiện không bị xoá.
      </p>
      <h3>Thể lệ bảo hộ</h3>
      <p>- Trong thời gian sự kiện, toàn bộ người dùng tặng quà cho idol đang livestream đều trở thành người bảo hộ của idol được tặng quà.</br>
        - Điểm số và xếp hạng bảo hộ dựa vào tổng số xu tặng cho idol.</br>
        - Nếu điểm số bằng nhau, người đạt điểm số trước sẽ xếp hạng cao hơn.
      </p>
      <h6>Chú ý:</h6>
      <p>Nếu phát hiện người dùng gian lận điểm bằng bất cứ hình thức nào, ban tổ chức có quyền loại ngay thí sinh và thu hồi toàn bộ phần thưởng mà không cần báo trước, đồng thời cấm tham gia sự kiện.</p>
    </div>
    <div class="gift" v-show="mainTab == 1">
      <h3>Phần thưởng idol</h3>
      <p>- Trong thời gian sự kiện, idol đang livestream mỗi khi nhận quà sẽ tăng giá trị của heo đất, mỗi 1 xu tăng 30 VND.</br>
        - Khi sự kiện kết thúc, giá trị của heo đất sẽ là giá trị cuối cùng và không thể tăng nữa.</br>
        - Top 10 cuối cùng của sự kiện sẽ chia sẻ giá trị của heo đất theo tỷ lệ sau:
      </p>
      <div class="score">
        <p> • Hạng nhất：25%</p>
        <p> • Hạng nhì：20%</p>
        <p> • Hạng ba：15%</p>
        <p> • Hạng tư - năm：10%</p>
        <p> • Hạng sáu – mười：4%</p>
      </div>
      <p>- Ngoài ra, idol hạng 11 đến 20 sẽ được tăng điểm khi tham gia sự kiện lần sau:</p>
      <div class="score">
        <p> • Hạng 11：20%</p>
        <p> • Hạng 12：18%</p>
        <p> • Hạng 13：15%</p>
        <p> • Hạng 14-16：12%</p>
        <p> • Hạng 17 - 20：10%</p>
      </div>
      <h3>Phần thưởng bảo hộ</h3>
      <div class="anthorWards">
        <p>- Hạng nhất: trả lại 8% số xu bảo hộ trong thời gian sự kiện, xe Chiến Đấu Cơ (30 ngày)</p>
        <p>- Hạng nhì: trả lại 7% số xu bảo hộ trong thời gian sự kiện, xe Chiến Đấu Cơ (30 ngày)</p>
        <p>- Hạng ba: trả lại 6% số xu bảo hộ trong thời gian sự kiện, xe Chiến Đấu Cơ (30 ngày)</p>
        <p>- Hạng 4 - 5: trả lại 5% số xu bảo hộ trong thời gian sự kiện, xe Chiến Đấu Cơ (30 ngày)</p>
        <p>- Hạng 6 – 10: - Hạng nhất: trả lại 4% số xu bảo hộ trong thời gian sự kiện, xe Chiến Đấu Cơ (30 ngày)</p>
      </div>
    </div>
    <p class="lastTips">Quyết định của ban tổ chức là quyết định cuối cùng!</p>
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
    mainTabClick(tab) {
      this.mainTab = tab;
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #0e7571;
  .rule {
    padding: 0.25rem 0.3rem;
    .noTop {
      margin-top: -0.2rem;
    }
    h3 {
      text-align: center;
      color: #64ffe0;
      font-size: 0.36rem;
      font-weight: bold;
      margin: 0.33rem 0 0.2rem 0;
    }
    p {
      font-size: 0.24rem;
      color: #b7fff1;
      font-weight: 500;
      margin-top: 0.09rem;
    }
    .time {
      text-align: center;
    }
    .taskImg {
      width: 6.03rem;
      height: 2.59rem;
      margin: 0.18rem auto;
    }
    h6 {
      color: #b7fff1;
      margin-top: 0.3rem;
    }
    .lastTips {
      text-align: center;
      color: #003230;
      font-size: 0.24rem;
      margin: 0.32rem 0 0.15rem 0;
      font-weight: 500;
    }
    .score {
      margin-left: 0.4rem;
    }
    .anthorWards {
      p {
        margin-bottom: 0.35rem;
      }
    }
  }
  .mainTabs {
    width: 6.91rem;
    height: 0.89rem;
    background: url(../../assets/img/tabsBg.png);
    background-size: 100% 100%;
    margin: 0.22rem auto;
    display: flex;
    a {
      display: block;
      width: 3.66rem;
      height: 0.89rem;
      text-align: center;
      white-space: nowrap;
      font-size: 0.36rem;
      color: #1cdde3;
      font-weight: bold;
      line-height: 0.89rem;
      &.current {
        color: #fff;
        background: url(../../assets/img/actTab.png);
        background-size: 100% 100%;
      }
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
