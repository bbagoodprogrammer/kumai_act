<template>
  <div class="rule">
    <div class="tabs">
      <span :class="{act:type==1}" @click="tabClick(1)">Phần thưởng:</span>
      <span :class="{act:type==2}" @click="tabClick(2)">Thể lệ</span>
    </div>
    <div class="actTime">Thời gian: {{timer}}</div>
    <div class="ruleItem" v-if="type==1">
      <h3>Thưởng BXH Ngôi Sao Xuất Hiện</h3>
      <h6>Gia tộc hạng nhất</h6>
      <p>1. Vinh danh quà Mặt Trăng</p>
      <p>2. Toàn bộ thành viên gia tộc nhận Huy chương Sao Gia Tộc (1 tháng).</p>
      <p>3. Điểm cấp gia tộc 10k + Chủ đề phòng hát gia tộc (30 ngày).</p>
      <p>4. Toàn bộ thành viên nhận 500 đậu.</p>
      <p>5. Top 10 BXH điểm sao Ngôi Sao Xuất Hiện:</p>
      <p>Hạng 1: Mộng Cá Heo (2520 xu) + 1000 xu + 2000 đậu +Cánh Vàng (30 ngày)</p>
      <p>Hạng 2: Sao Ước Nguyện(1880 xu) + 800 xu + 1000 đậu + Cánh Vàng(30 ngày)</p>
      <p>Hạng 3: Thỏ Đại Bác(820 xu) + 500 xu + 500 đậu + Cánh Vàng(30 ngày)</p>
      <p>Hạng 4-10: Chung Tình(520 xu) + 200 xu + 500 đậu + Cánh Vàng(30 ngày)</p>
      <h6>Gia tộc hạng nhì</h6>
      <p>1. Toàn bộ thành viên gia tộc nhận Huy chương Sao Gia Tộc (1 tháng).</p>
      <p>2. Điểm cấp gia tộc 8k + Chủ đề phòng hát gia tộc (30 ngày).</p>
      <p>3. Toàn bộ thành viên nhận 500 đậu.</p>
      <p>4. Top 10 BXH điểm sao Ngôi Sao Xuất Hiện:</p>
      <p>Hạng 1: Sao Ước Nguyện(1880 xu)+ 800 xu + 1000 đậu + Cánh Vàng(30 ngày)</p>
      <p>Hạng 2: Thỏ Đại Bác(820 xu) + 500 xu + 500 đậu + Cánh Vàng(30 ngày)</p>
      <p>Hạng 3: Chung Tình(520 xu) + 200 xu + 500 đậu + Cánh Vàng(30 ngày)</p>
      <p>Hạng 4-10: Chân Ái(266 xu) + 200 xu + 500 đậu + Cánh Vàng(30 ngày)</p>
      <h6>Gia tộc hạng ba</h6>
      <p>1. Toàn bộ thành viên gia tộc nhận Huy chương Sao Gia Tộc (1 tháng).</p>
      <p>2. Điểm cấp gia tộc 5k + Chủ đề phòng hát gia tộc (30 ngày).</p>
      <p>3. Toàn bộ thành viên nhận 300 đậu.</p>
      <p>4. Top 10 BXH điểm sao Ngôi Sao Xuất Hiện:</p>
      <p>Hạng 1: Thỏ Đại Bác(820 xu) + 800 xu + 1000 đậu + Cánh Vàng(30 ngày)</p>
      <p>Hạng 2: Chung Tình(520 xu)+ 500 xu + 500 đậu + Cánh Vàng(30 ngày)</p>
      <p>Hạng 3: Chân Ái(266 xu) + 200 xu + 500 đậu + Cánh Vàng(30 ngày)</p>
      <p>Hạng 4-10: Sao Gia Tộc (233 xu) + 200 xu + 500 đậu + Cánh Vàng(30 ngày)</p>
      <h6>Gia tộc hạng 4-10</h6>
      <p>1. Toàn bộ thành viên gia tộc nhận Huy chương Sao Gia Tộc (1 tháng).</p>
      <p>2. Điểm cấp gia tộc 2k + Chủ đề phòng hát gia tộc (30 ngày).</p>
      <p>3. Toàn bộ thành viên nhận 200 đậu.</p>
      <p>4. Top 10 BXH điểm sao Ngôi Sao Xuất Hiện:</p>
      <p>Hạng 1:Chung Tình(520 xu) + 800 xu + 1000 đậu + Cánh Vàng(30 ngày)</p>
      <p>Hạng 2: Chân Ái(266 xu) + 500 xu + 500 đậu + Cánh Vàng(30 ngày)</p>
      <p>Hạng 3: Sao Gia Tộc (233 xu) + 200 xu + 500 đậu + Cánh Vàng(30 ngày)</p>
      <p>Hạng 4-10: Sao Gia Tộc (233 xu)+ 100 xu + 500 đậu</p>
      <h3>BXH Bảo Hộ Gia Tộc</h3>
      <p>Hạng 1: Phiếu nạp xu 5% (1 ngày) + Cánh Vàng(30 ngày) + Huy chương Người Bảo Hộ (30 ngày) + 10000 đậu</p>
      <p>Hạng 2: Phiếu nạp xu 4% (1 ngày) + Cánh Vàng(30 ngày) + Huy chương Người Bảo Hộ (30 ngày) + 5000 đậu</p>
      <p>Hạng 3: Phiếu nạp xu 3% (1 ngày) + Cánh Vàng(30 ngày) + Huy chương Người Bảo Hộ (30 ngày) + 3000 đậu</p>
      <p>Hạng 4-10: Huy chương Người Bảo Hộ (30 ngày) + 2000 đậu</p>
      <h3>Phần thưởng túi quà gia tộc:</h3>
      <img src="../../assets/img/giftImg.png" alt="" class="giftBox">
      <p class="tips">Toàn bộ túi quà được hệ thống phát ngẫu nhiên, bảng phần thưởng chỉ liệt kê phần thưởng quý hiếm.</p>
      <h3>Tất cả túi quà thưởng do hệ thống tự động gửi, trên giao diện chỉ hiện một số phần thưởng hiếm.</h3>
      <h3 class="other">Ghi chú:</h3>
      <p>1. Gia tộc vào vòng Ngôi Sao Xuất Hiện nếu không đủ 10 thành viên, số lượng thưởng dư ra sẽ bị mất.</p>
      <p>2. Điểm gia tộc đạt tối đa xem như phần thưởng không còn hiệu lực.</p>
      <p>3. Giới hạn phòng Kara có hiệu lựuc từ lúc phát thưởng.</p>
      <p>4. Sau khi cuộc thi kết thúc trong vòng 7 ngày nhân viên của app sẽ liên hệ tộc trưởng để lấy thông tin phát thưởng, nếu quá hạn không nhận được phản hồi từ tộc trưởng xem như bỏ phần thưởng.
      </p>
      <p>5. Thông tin thành viên gia tộc tính đến lúc kết thúc cuộc thi, phần thưởng gửi trong vòng 7 ngày sau khi kết thúc cuộc thi.</p>
      <p>6. Quà động nhận từ sự kiện cần cập nhật phiên bản mới nhất để dùng, nếu không sẽ không thấy hiệu ứng của quà.</p>
    </div>
    <div class="wardItem" v-else>
      <h3>Thể lệ</h3>
      <p>Cuộc thi Ngôi Sao Gia Tộc chia làm 3 vòng: Sao Lấp Lánh – Sao Sáng Nhất – Ngôi Sao Xuất Hiện, chỉ người đã vào gia tộc mới được tham gia.</p>
      <h3>Sao Lấp Lánh:</h3>
      <p>1. Thời gian<em class="tm"> 12:00 8/3 - 22:00 12/3</em> </p>
      <p>2. Người đã vào gia tộc nhấn báo danh tham gia sự kiện, điểm sao= điểm mị quà xu nhận tại phòng hát/tác phẩm + điểm nhiệm vụ, top 300 BXH Tổng đại diện gia tộc vào vòng sau.</p>
      <p>3. BXH Ngày dựa vào điểm sao nhận trong ngày, top 100 được tham gia rút thưởng, mỗi ngày chọn 20 người nhận túi quà Sao Lấp Lánh (68 xu). Tỷ lệ trúng = điểm sao trong ngày/tổng điểm sao của
        top 100</p>
      <p>4. Thoát gia tộc trong thời gian vòng thi Sao Lấp Lánh sẽ xoá điểm trên BXH, không được rút thưởng, sau khi vào gia tộc khác tính điểm lại từ đầu.</p>
      <h3>Sao Sáng Nhất</h3>
      <p>
        1.Thời gian:<em class="tm">22:05 12/3 - 18:00 16/3</em><br />
        2. Người vào vòng sau nếu cùng gia tộc sẽ tạo thành 1 đội, đại diện gia tộc tham gia thi đấu. Cặp đấu được ghép cặp ngẫu nhiên và dựa vào điểm sao để xác định thắng thua. Đội thắng được vào
        vòng sau và nhận túi quà gia tộc. Điểm sao = Điểm mị quà xu nhận tại phòng hát/tác phẩm + Điểm nhiệm vụ.<br />
        3. Khi kết thúc vòng đấu nếu cả 2 bằng điểm nhau đều sẽ bị loại, PK thua nhưng tổng điểm sao đạt 300k trở lên cũng được vào vòng sau<br />
        4. Thí sinh vào vòng sau nhưng thoát gia tộc sẽ không bị trừ điểm BXH Tổng, khi vào lại gia tộc sẽ bảo lưu điểm số và tính tiếp, nếu vào gia tộc khác xem như bị loại, không thể tham gia thi
        đấu tiếp.<br />
        5. Mỗi gia tộc có 30 phần thưởng túi quà, mỗi người tối đa nhận 1 phần thưởng, vòng thi kết thúc sẽ tự động phát thưởng.
      </p>
      <h3>Sao Xuất Hiện</h3>
      <p>1. Thời gian: <em class="tm"> 18:05 16/3 - 22:00 17/3</em> <br />
        2. Điểm sao = điểm mị quà xu nhận tại phòng hát/tác phẩm + điểm nhiệm vụ, 20-22h ngày cuối cùng được tăng 10%.<br />
        3.Khi kết thúc vòng đấu nếu cả 2 bằng điểm nhau đều sẽ bị loại, PK thua nhưng tổng điểm sao đạt 300k trở lên cũng được vào vòng sau<br />
        4. Điểm sao tổng đạt đến điểm số yêu cầu sẽ tăng cấp gia tộc, hệ thống tự động phát thưởng Túi quà. Cấp I, II, III tương ứng 10k, 100k, 500k điểm sao. Túi quà lần lượt gồm 30, 50, 100
        phần.<br />
        5. Thí sinh vào vòng sau nhưng thoát gia tộc sẽ không bị trừ điểm BXH Tổng, khi vào lại gia tộc sẽ bảo lưu điểm số và tính tiếp, nếu vào gia tộc khác xem như bị loại, không thể tham gia thi
        đấu tiếp.
      </p>
      <h3 class="other">Ghi chú:</h3>
      <p>
        1. BXH Bảo Hộ xếp hạng theo tổng mị lực quà xu người dùng đã tặng sau khi báo danh. Top 10 nhận thưởng, nếu điểm số bằng nhau người đạt trước sẽ xếp hạng cao hơn.<br />
        2. Túi quà gia tộc được thưởng có thể xem tại Chi tiết thưởng.<br />
        3. BXH ngày sẽ phát thưởng vào 24h mỗi ngày, ngày cuối cuộc thi gửi vào 22h.<br />
        4. Sau khi báo danh vòng thi Sao Lấp Lánh, cần gửi bài hát, tất cả bài hát công khai của cá nhân đều được tính điểm. Nếu xoá bài hát trong thời gian sự kiện, sẽ bị trừ điểm mị lực tương ứng
        của bài đã xoá.<br />
        5. Vòng thi Sao Xuất Hiện cần gửi bài hát đăng trong thời gian sự kiện, bài hát nhận quà mới được tính điểm.<br />
        6. Toàn bộ túi quà được hệ thống gửi tự động, mỗi người 1 lần nhận tối đa 1 phần thưởng<br />
        7. Trong thời gian sự kiện nếu phát hiện bất cứ hành vi gian lận điểm nào, thí sinh sẽ bị loại và huỷ phần thưởng, nếu nghiêm trọng sẽ khoá tài khoản.
      </p>
    </div>
    <p class="lastTips">Quyết định của ban tổ chức là quyết định cuối cùng.</p>
  </div>
</template>

<script>
import getDate from "../../utils/getDate"
export default {
  data () {
    return {
      type: 1,
      stime: '',
      etime: ''
    }
  },
  computed: {
    timer () {
      return getDate(new Date(this.stime * 1000), 3) + '-' + getDate(new Date(this.etime * 1000), 3)
    }
  },
  created () {
    document.title = 'Ngôi Sao Gia Tộc'
    this.stime = sessionStorage.getItem('stime')
    this.etime = sessionStorage.getItem('etime')
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
  background-color: rgba(29, 14, 9, 1);
}
.giftBox {
  width: 5.34rem;
  height: 3.13rem;
  display: block;
  margin: 0 auto;
}
.red {
  color: orange !important;
  font-weight: 600;
}
.rule {
  padding: 0.54rem 0.26rem;
  font-weight: 500;
  .tabs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 6.76rem;
    height: 0.78rem;
    padding: 0 0.07rem;
    background: url(../../assets/img/tabs.png);
    background-size: 100% 100%;
    span {
      width: 3.33rem;
      height: 0.64rem;
      text-align: center;
      line-height: 0.64rem;
      color: rgba(142, 105, 63, 1);
      &.act {
        color: rgba(29, 14, 9, 1);
        background: url(../../assets/img/actTabs.png);
        background-size: 100% 100%;
      }
    }
  }
  h3 {
    text-align: center;
    font-size: 0.28rem;
    color: rgba(255, 213, 154, 1);
    margin: 0.41rem 0 0.33rem;
  }
  h6 {
    color: rgba(255, 106, 57, 1);
    font-size: 0.26rem;
    text-align: center;
    margin: 0.2rem 0 0.25rem;
  }
  p {
    color: rgba(207, 135, 110, 1);
    font-size: 0.24rem;
  }
  .other {
    text-align: left;
    color: rgba(255, 96, 40, 1);
    font-size: 0.28rem;
  }
  .wardImg {
    width: 6.5rem;
    height: 6.11rem;
    display: block;
    margin: 0 auto;
  }
  .actTime {
    text-align: center;
    color: rgba(238, 172, 104, 1);
    font-weight: 500;
    font-size: 0.28rem;
    margin-top: 0.27rem;
  }
  .ruleItem,
  .wardItem {
    padding: 0 0.59rem;
  }
  .tm {
    color: rgba(255, 107, 58, 1);
    font-size: 0.24rem;
  }
  .lastTips {
    text-align: center;
    color: rgba(124, 67, 48, 1);
    margin-top: 1.53rem;
  }
  .tips {
    padding: 0 0.2rem;
  }
}
@import '../../assets/scss/common.scss';
</style>
