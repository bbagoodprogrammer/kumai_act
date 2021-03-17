<template>
  <div class="rule">
    <div class="tabs">
      <a @click.prevent="mainTab=0" :class="{current:mainTab==0}" class="tab1">Quy tắc</a>
      <a @click.prevent="mainTab=1" :class="{current:mainTab==1}" class="tab2">Phần thưởng</a>
    </div>
    <p class="mt">Thời gian</p>
    <p class="mg">18:00 24/3/2021 -24:00 6/4/2021</p>
    <div class="ruleItem" v-if="mainTab == 0">
      <p>1.Thời gian sự kiện cần báo danh tham gia, sau khi nhấn vào nút báo danh, hiển thị báo danh thành công thì có thể tham gia.</p>
      <p>2.Điểm rung động và điểm tình ý chỉ được tính qua 3 quà đua top:Thư Tình, Hươu Hiếu Động và Lời Yêu, quà khác vô hiệu.</p>
      <p>
        3.3 quà tặng là quà giới hạn trong phòng live:<br />
        Chỉ tính vào bảng khi tặng trong thời gian idol live, trường hợp khác vô hiệu. (Cần live trong chức năng live mới)
      </p>
      <p>
        4.Bảng rung động: Chỉ giới hạn idol tham gia, idol phải live bằng chức năng live mới, live trong phòng Kara không được tính vào bảng<br />
        Bảng tình ý: Ngoại trừ idol, tất cả người dùng đều có thể tham gia.
      </p>
      <p>
        5.Ngoại trừ ngày đầu sự kiện, thời gian thống kê bảng ngày là 0:01-23:59 trong ngày<br />
        Ngày đầu sự kiện thời gian thống kê bảng ngày là 18:00-23:59 24/3
      </p>
      <p>
        6.Cách tính điểm rung động:<br />
        Điểm rung động tương ứng 1:1 với số xu idol nhận được trong thời gian sự kiện, tức là tổng số xu quà đua top nhận được là n, thì điểm rung động là n, điểm rung động trong sự kiện dùng <img
          src="../../img/scoreIcon1.png" alt="" class="headerIcon"> biểu thị
      </p>
      <p>
        7.Cách tính điểm tình ý:<br />
        Điểm tình ý tương ứng 1:1 với số xu người dùng tặng quà trong thời gian sự kiện, tức là tổng số xu quà đua top tặng là n, thì điểm tình ý là n, điểm tình ý trong sự kiện dùng <img
          src="../../img/scoreIcon2.png" alt="" class="headerIcon"> biểu thị
      </p>
      <p>8.Nhấn nút làm mới các bảng và xếp hạng của tôi để xem xếp hạng thực tại</p>
      <p>9.Nếu số điểm bằng nhau, điểm tình ý/rung động đạt được trước sẽ xếp hạng trước</p>
    </div>
    <div class="giftItem" v-else>
      <h5>Phần thưởng bảng tổng</h5>
      <img src="./img/ruleTable.png" alt="" class="ruleTable">
      <p>Phần thưởng bảng ngày</p>
      <img src="./img/dayTable.png" alt="" class="dayTable">
      <p class="mg">Ghi chú:</p>
      <p class="mg">1.Phần thưởng sự kiện chia thành phần thưởng bảng ngày và bảng tổng</p>
      <p>2.Phần thưởng bảng ngày: Sau 24h mỗi ngày, hệ thống tự động gửi phần thưởng của ngày hôm trước, sẽ thông báo qua tin nhắn trong app. Thời gian hiệu lực của trang sức có thể cộng dồn, thời
        gian hiệu lực cộng dồn cao nhất là 30 ngày. </p>
      <p>3.Phần thưởng bảng tổng ngoại trừ xu ra sẽ được hệ thống phát tự động trong vòng 7 ngày làm việc sau khi sự kiện kết thúc, sẽ thông báo qua tin nhắn trong app, phần thưởng xu sẽ gửi cùng với
        lương idol. </p>
      <p>TIPS nhận trang sức trong Cửa hàng trang sức, xem huy chương trong Huy chương</p>
    </div>
    <div class="lastTips">Quyền giải thích cuối cùng của sự kiện này thuộc về ban tổ chức</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mainTab: 0
    }
  }
}
</script>

<style lang="scss">
.headerIcon {
  width: 0.32rem;
  height: 0.26rem;
}
.rule {
  padding-top: 0.38rem;
  background: url(../../img/ruleBg.png);
  background-size: 100% auto;
  padding-bottom: 0.4rem;
  padding: 0 0.44rem;
  font-size: 0.28rem;
  color: rgba(150, 138, 197, 1);
  .ruleTable {
    width: 6.64rem;
    height: 16.8rem;
    margin: 0.15rem 0 0.65rem;
  }
  .dayTable {
    width: 6.64rem;
    height: 4.67rem;
    margin: 0.15rem 0 0.65rem;
  }
  .mg {
    margin: 0 !important;
  }
  .mt {
    margin: 0;
    margin-top: 0.24rem;
  }
  .tabs {
    height: 0.96rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    a {
      display: block;
      width: 3.27rem;
      height: 0.8rem;
      text-align: center;
      line-height: 0.8rem;
      font-size: 0.36rem;
      background: url(../../img/typeTab.png);
      background-size: 100% 100%;
      &.current {
        background: url(../../img/typeTab_act.png);
        background-size: 100% 100%;
      }
    }
  }
  h5 {
    font-size: 0.32rem;
  }
  p {
    margin: 0.4rem auto;
  }

  .lastTips {
    color: rgba(150, 138, 197, 1);
    text-align: center;
    font-size: 0.24rem;
    margin: 0.8rem auto 0;
  }
}
</style>