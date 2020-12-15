<template>
  <div class="rule">
    <div class="tabs">
      <span :class="{act:type==1}" @click="tabClick(1)">Thể lệ</span>
      <span :class="{act:type==2}" @click="tabClick(2)">Phần thưởng</span>
    </div>
    <!-- <div class="actTime">活動時間：{{timer}}</div> -->
    <div class="ruleItem" v-if="type==1">
      <div class="topTips textColor">
        <p>Cuộc thi Gia Tộc Mạnh Nhất chỉ dành cho gia tộc, toàn bộ gia tộc tự động báo danh</p>
        <p>Nếu chưa có gia tộc, người chơi được nhấn báo danh tham gia, sau đó vào gia tộc hoặc xin lập gia tộc để tham gia sự kiện.</p>
        <p>Gia Tộc Mạnh Nhất gồm 3 vòng: Bảo Hộ - PK Gia Tộc – Tranh Bá</p>
      </div>
      <h6>I. Vòng Bảo Hộ:</h6>
      <p>1. Thời gian: 12:00:00 28/12/2020 – 23:59:59 31/12/2020 </p>
      <p>2. Điểm Lấp Lánh= điểm bảo hộ + mị lực bài hát/phòng Kara của thành viên gia tộc nhận</p>
      <p>3. Thành viên gia tộc hoàn thành nhiệm vụ và nhận quà để tăng điểm Lấp Lánh.</p>
      <p>4. Sau khi hết vòng này, 300 gia tộc hạng cao nhất được vào vòng PK Gia Tộc, 3 gia tộc hạng cao nhất được nhận túi quà gia tộc, gửi cho thành viên gia tộc dựa theo số điểm Lấp Lánh đã cống hiến (vòng này thành viên cống hiến điểm Lấp Lánh cho gia tộc mới được nhận thưởng túi quà gia tộc)</p>
      <p>5. Trong thời gian diễn ra vòng Bảo Hộ, nếu thoát gia tộc, điểm số của thành viên sẽ không bị trừ, nếu vào lại gia tộc sẽ tính lại số điểm cũ. Nếu tạo gia tộc mới hoặc vào gia tộc khác, điểm số sẽ tính lại từ đầu.</p>
      <h6>II. Vòng PK Gia Tộc:</h6>
      <p>1. Thời gian: 00:00:00 1/1/2021 – 23:59:59 4/1/2021</p>
      <p>2. Điểm Lấp Lánh= Mị lực bài hát/phòng Kara của thành viên gia tộc nhận</p>
      <p>3. Gia tộc vào vòng này được ghép cặp PK ngẫu nhiên, dựa vào điểm Lấp Lánh nhận trong vòng này phân định thắng thua. </p>
      <p>4. Tặng quà gia tộc đặc biệt sẽ tăng 3% điểm Lấp Lánh nhận được.</p>
      <p>5. Trong thời gian diễn ra vòng Bảo Hộ, nếu thoát gia tộc, điểm số của thành viên sẽ không bị trừ, nếu vào lại gia tộc sẽ tính lại số điểm cũ. Nếu tạo gia tộc mới hoặc vào gia tộc khác, xem như chưa qua vòng.</p>
      <!-- <p>6.PK雙方分數相同，則倆個家族都無法晉級</p> -->
      <h6>III. Vòng Tranh Bá:</h6>
      <p>1. Thời gian: 00:00:00 5/1/2021 – 23:59:59 8/1/2021</p>
      <p>2. Điểm Lấp Lánh= Mị lực bài hát/phòng Kara của thành viên gia tộc nhận, vòng này mỗi ngày 21:00 – 21:10 được tặng thêm 10% quà nhận, top 50 gia tộc trong năm nay được tăng thêm 6-10% điểm nhận.</p>
      <p>3. Gia tộc đã qua vòng được xếp hạng theo điểm Lấp Lánh nhận được, 3 gia tộc hạng cao nhất và đại diện của gia tộc trở thành Gia Tộc Của Năm, gia tộc hạng nhất được chứng nhận Gia Tộc Mạnh Nhất. </p>
      <p>4. 10 gia tộc hạng cao nhất và thành viên gia tộc sẽ nhận phần thưởng phong phú.</p>
      <p>5. Trong thời gian diễn ra vòng Bảo Hộ, nếu thoát gia tộc, điểm số của thành viên sẽ không bị trừ, nếu vào lại gia tộc sẽ tính lại số điểm cũ. Nếu tạo gia tộc mới hoặc vào gia tộc khác, xem như chưa qua vòng.</p>
    </div>
    <div class="wardItem" v-else>
      <img src="../../assets/img/wardImg.png" alt="" class="wardImg">
      <h6>Gia tộc hạng nhất:</h6>
      <p>1. Toàn bộ thành viên gia tộc được chứng nhận Gia Tộc Mạnh Nhất Năm (12 tháng)</p>
      <p>2. Toàn bộ thành viên gia tộc nhận huy chương Gia Tộc Của Năm (1 tháng)</p>
      <p>3. Điểm cấp gia tộc 10000 + phòng gia tộc tăng lên 800 (vĩnh viễn)</p>
      <p>4. Toàn bộ thành viên gia tộc nhận 800 đậu.</p>
      <p>5. Trang sức Gia Tộc Vô Địch (1 tháng)</p>
      <p>6. Ảnh nền gia tộc (1 tháng)</p>
      <p>7. Khung ảnh bìa gia tộc (1 tháng)</p>
      <h6 class="textColor">Thưởng top thành viên cống hiến điểm Lấp Lánh </h6>
      <p>Hạng nhất: quà phòng Kara Mộng Đêm Hè (3520 xu) + 1000 xu + Xe Thảm Đỏ (1 tháng) </p>
      <p>Hạng nhì: quà phòng Kara Mộng Cá Heo (2520 xu) + 800 xu + Xe Thảm Đỏ (1 tháng)</p>
      <p>Hạng ba: quà bài hát Cô Bé Huơu (999 xu) + 500 xu + Xe Thảm Đỏ (1 tháng) </p>
      <p>Hạng tư: quà phòng Kara Chung Tình (520 xu) + 300 xu + Xe Thảm Đỏ (1 tháng) </p>
      <p>Hạng năm: quà bài hát Đu Quay (388 xu) + 100 xu + Xe Thảm Đỏ (1 tháng) </p>
      <h6>Gia tộc hạng nhì: </h6>
      <p>1. Toàn bộ thành viên gia tộc được chứng nhận Gia Tộc Của Năm (6 tháng) </p>
      <p>2. Toàn bộ thành viên gia tộc nhận huy chương Gia Tộc Của Năm (1 tháng)</p>
      <p>3. Điểm cấp gia tộc 8000 + phòng gia tộc tăng lên 700 (vĩnh viễn) </p>
      <p>4. Toàn bộ thành viên gia tộc nhận 700 đậu.</p>
      <p>5. Trang sức Gia Tộc Hạng Nhì (1 tháng)</p>
      <p>6. Ảnh nền gia tộc (1 tháng)</p>
      <p>7. Khung ảnh bìa gia tộc (1 tháng)</p>
      <h6 class="textColor">Thưởng top thành viên cống hiến điểm Lấp Lánh </h6>
      <p>Hạng nhất: quà phòng Kara Mộng Cá Heo (2520 xu) + 800 xu + Xe Thảm Đỏ (1 tháng) </p>
      <p>Hạng nhì: quà bài hát Cô Bé Huơu (999 xu) + 500 xu + Xe Thảm Đỏ (1 tháng)</p>
      <p>Hạng ba: quà phòng Kara Chung Tình (520 xu) + 300 xu + Xe Thảm Đỏ (1 tháng)</p>
      <p>Hạng tư: quà bài hát Đu Quay (388 xu) + 100 xu + Xe Thảm Đỏ (1 tháng)</p>
      <p>Hạng năm: quà phòng Kara LOVE YOU (150 xu) + 80 xu + Xe Thảm Đỏ (1 tháng) </p>
      <h6>Gia tộc hạng ba: </h6>
      <p>1. Toàn bộ thành viên gia tộc được chứng nhận Gia Tộc Của Năm (3 tháng) </p>
      <p>2. Toàn bộ thành viên gia tộc nhận huy chương Gia Tộc Của Năm (1 tháng)</p>
      <p>3. Điểm cấp gia tộc 5000 + phòng gia tộc tăng lên 600 (vĩnh viễn) </p>
      <p>4. Toàn bộ thành viên gia tộc nhận 600 đậu.</p>
      <p>5. Trang sức Gia Tộc Hạng Ba (1 tháng)</p>
      <p>6. Ảnh nền gia tộc (1 tháng)</p>
      <p>7. Khung ảnh bìa gia tộc (1 tháng)</p>
      <h6 class="textColor">Thưởng top thành viên cống hiến điểm Lấp Lánh </h6>
      <p>Hạng nhất: quà bài hát Cô Bé Huơu (999 xu) + 500 xu + Xe Thảm Đỏ (1 tháng)</p>
      <p>Hạng nhì: quà phòng Kara Chung Tình (520 xu) + 300 xu + Xe Thảm Đỏ (1 tháng) </p>
      <p>Hạng ba: quà bài hát Đu Quay (388 xu) + 100 xu + Xe Thảm Đỏ (1 tháng)</p>
      <p>Hạng 4-5: quà phòng Kara LOVE YOU (150 xu) + 80 xu + Xe Thảm Đỏ (1 tháng) </p>
      <h6>Gia tộc hạng 4-10:</h6>
      <p>1. Toàn bộ thành viên gia tộc nhận huy chương Gia Tộc Của Năm (1 tháng) </p>
      <p>2. Điểm cấp gia tộc 2000 + phòng gia tộc tăng lên 500 (vĩnh viễn)</p>
      <p>3. Toàn bộ thành viên gia tộc nhận 500 đậu. </p>
      <h6 class="textColor">Thưởng top thành viên cống hiến điểm Lấp Lánh </h6>
      <p>Hạng nhất: quà phòng Kara Chung Tình (520 xu) + 300 xu</p>
      <p>Hạng nhì: quà bài hát Đu Quay (388 xu) + 100 xu</p>
      <p>Hạng 3-5: quà phòng Kara LOVE YOU (150 xu) + 80 xu</p>
      <h5>Túi quà gia tộc vòng Bảo Hộ (2000 xu)*30</h5>
      <h6 class="textColor minsize">Top 30 gia tộc có điểm Lấp Lánh cao nhất vòng này, 50 thành viên cống hiến nhiều nhất trong gia tộc nhận 1 phần thưởng, cống hiến điểm Lấp Lánh càng nhiều quà nhận được càng giá trị.
        <br />Ghi chú: Nếu gia tộc không đủ 50 người hoặc bảng xếp hạng bảo hộ không đủ 50 người, số quà dư sẽ bị bỏ qua.</h6>
      <img src="../../assets/img/wardImg2.png" alt="" class="wardImg2">
      <h5>Túi quà gia tộc vòng PK Gia Tộc (5000 xu)*15</h5>
      <h6 class="textColor minsize">Top 15 gia tộc có điểm Lấp Lánh cao nhất vòng này (bất kể thắng hay thua), 60 thành viên cống hiến nhiều nhất trong gia tộc nhận 1 phần thưởng, cống hiến điểm Lấp Lánh càng nhiều quà nhận được càng giá trị.
        <br />Ghi chú: Nếu gia tộc không đủ 60 người hoặc bảng xếp hạng PK không đủ 50 người, số quà dư sẽ bị bỏ qua.
      </h6>
      <img src="../../assets/img/wardImg3.png" alt="" class="wardImg2">
      <h6>Ghi chú:</h6>
      <p>1. Trong vòng Tranh Bá nếu gia tộc không đủ 5 người, số phần thưởng dư sẽ bị bỏ qua. </p>
      <p>2. Túi quà gia tộc được phát dựa theo xếp hạng cống hiện điểm lấp lánh và thành viên gia tộc khi kết thúc vòng thi.</p>
      <p>3. Thời hạn nâng số người phòng Kara được tính từ lúc phát thưởng.</p>
      <p>4. Trong vòng 7 ngày làm việc sau khi kết thúc sự kiện, ban tổ chức sẽ liên hệ với tộc trưởng để tổng hợp thông tin nhận thưởng, nếu tộc trưởng không cung cấp thông tin nhận thưởng đúng hạn xem như bỏ phần thưởng.</p>
      <p>5. Trang sức và quà động nhận từ sự kiện cần cập nhật bản mới nhất để dùng, nếu không sẽ bỏ lỡ hiệu ứng của quà tặng.</p>
      <!-- <p>6、頭飾和活動獎勵特效禮物請更新至最新版本軟體使用，否則可能會錯過絢麗特效哦</p> -->
      <p>6. Toàn bộ phần thưởng túi quà đều có thời hạn 7 ngày.</p>
    </div>
    <p class="lastTips">Quyết định của ban tổ chức là quyết định cuối cùng</p>
  </div>
</template>

<script>
import getDate from "../../utils/getDate"
export default {
  data() {
    return {
      type: 1,
      stime: '',
      etime: ''
    }
  },
  computed: {
    timer() {
      return getDate(new Date(this.stime * 1000), 3) + '-' + getDate(new Date(this.etime * 1000), 3)
    }
  },
  created() {
    document.title = '規則&獎勵'
    this.stime = sessionStorage.getItem('stime')
    this.etime = sessionStorage.getItem('etime')
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
  background-color: rgba(29, 14, 9, 1);
}
.giftBox {
  width: 5.34rem;
  height: 3.13rem;
  display: block;
  margin: 0 auto;
}
.giftTIps {
  text-align: center;
}
.textColor {
  color: rgba(255, 181, 104, 1) !important;
  font-weight: 600;
}
.rule {
  padding: 0.54rem 0.26rem;
  font-weight: 500;
  .tabs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 6.88rem;
    height: 0.81rem;
    padding: 0 0.07rem;
    background: url(../../assets/img/tabs.png);
    background-size: 100% 100%;
    span {
      width: 3.55rem;
      height: 0.82rem;
      text-align: center;
      line-height: 0.82rem;
      color: rgba(142, 105, 63, 1);
      &.act {
        color: rgba(29, 14, 9, 1);
        background: url(../../assets/img/actTabs.png);
        background-size: 100% 100%;
      }
    }
  }
  .ruleItem {
    padding: 0 0.25rem;
    .topTips {
      margin-top: 0.37rem;
      p {
        color: rgba(255, 181, 104, 1);
        margin-bottom: 0.2rem;
      }
    }
  }
  h6 {
    color: rgba(255, 248, 129, 1);
    font-size: 0.28rem;
    font-weight: 500;
    margin: 0.5rem 0 0.15rem;
  }
  h5 {
    color: rgba(255, 248, 129, 1);
    font-size: 0.26rem;
    margin: 0.53rem 0 0;
  }
  p {
    color: rgba(179, 181, 144, 1);
    font-size: 0.22rem;
    margin-bottom: 0.15rem;
  }
  .wardImg2 {
    width: 6.72rem;
    height: 1.92rem;
    margin: 0 auto;
  }
}
.minsize {
  font-size: 0.22rem !important;
  margin: 0.05rem 0 0.11rem !important;
}
.mag {
  margin: 0 !important;
}
.wardImg {
  display: block;
  width: 6.59rem;
  height: 4.07rem;
  margin: 0.35rem auto;
}
.lastTips {
  color: rgba(181, 120, 88, 1) !important;
  font-size: 0.24rem;
  margin: 1.7rem auto 0.45rem;
  text-align: center;
}
@import "../../assets/scss/common.scss";
</style>
