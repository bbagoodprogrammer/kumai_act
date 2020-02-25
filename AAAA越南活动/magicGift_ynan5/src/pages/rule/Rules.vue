<template>
  <div class="rules">
    <p class="activeTime">Thời gian:18h 25/1 – 21h 4/2</p>
    <h5><i class="titleLeft"></i> Báo danh sự kiện<i class="titleRight"></i></h5>
    <div class="actSingUp">
      <p>1. Nhấn Báo Danh để tham gia sự kiện, sau khi báo danh mới bắt đầu tính quà nhận từ Phòng Kara và bài hát đăng sau khi báo danh. (sau khi báo danh cần vào lại trang sự kiện để đăng bài hát dự thi)</p>
      <p>2. Chỉ tính quà nhận của bài hát đơn ca, song ca, MV, MV song ca (không tính bài hát chay 5 phút, bài hát song ca được lưu lại vào nội dung của mình).</p>
      <p>3. Nếu xoá bài hát trong đã đăng trong thời gian sự kiện sẽ trừ toàn bộ điểm của bài hát đã xoá.lưu lại vào nội dung của tôi.</p>
    </div>
    <h5><i class="titleLeft"></i> Thể lệ BXH Bài Hát<i class="titleRight"></i></h5>
    <div class="wardRankTips">
      <p>1. Dựa theo mị lực từ quà yêu cầu mà bài hát công khai đăng sau khi báo danh nhận được.</p>
      <p>2. Quà bài hát yêu cầu của sự kiện bao gồm: Đốt Pháo (5 xu), Lì Xi Tết (20 xu), Dư Dả Cả Năm (199 xu).</p>
      <p>3. Nếu mị lực bằng nhau, người đạt điểm trước sẽ xếp hạng cao hơn.</p>
    </div>
    <h5><i class="titleLeft"></i> Thể lệ BXH Phòng Kara<i class="titleRight"></i></h5>
    <div class="kRoomTips">
      <p>1. Dựa vào điểm mị lực từ quà yêu cầu nhận tại phòng Kara sau khi báo danh.</p>
      <p>2. Quà phòng Kara yêu cầu của bài hát bao gồm: Pháo Tết (5 xu), Túi May Mắn (20 xu), Múa Lân (199 xu).</p>
      <p>3. Nếu mị lực bằng nhau, người đạt điểm trước sẽ xếp hạng cao hơn.</p>
    </div>
    <h5><i class="titleLeft"></i> Thể lệ BXH Nổi Tiếng<i class="titleRight"></i></h5>
    <div class="peopleTips">
      <p>1. Dưạ vào số người tặng quà yêu cầu cho bài hát đăng sau khi báo danh hoặc tại phòng Kara.</p>
      <p>2. Cùng 1 người tặng quà, dù là quà bài hát hay phòng Kara đều chỉ tính 1 lần</p>
      <p>3. Nếu số người bằng nhau, người đạt điểm trước sẽ xếp hạng cao hơn.</p>
    </div>
    <h5><i class="titleLeft"></i> Thưởng hoàn trả xu<i class="titleRight"></i></h5>
    <div class="coinsTips">
      <p>1. Tặng bài hát dự thi Đốt Pháo (5 xu), Lì Xi Tết (20 xu), Dư Dả Cả Năm (199 xu) sẽ được hoàn trả lại 5% số xu vào sáng sớm hôm sau. Ví dụ tặng 1 Dư Dả Cả Năm 199 xu, hôm sau sẽ được hoàn trả 10 xu.</p>
      <p>2. Tặng thí sinh dự thi tại phòng Kara sau khi báo danh Pháo Tết (5 xu), Túi May Mắn (20 xu), Múa Lân (199 xu) sẽ được hoàn trả lại 5% số xu vào sáng sớm hôm sau. Ví dụ tặng 1 Múa Lân 199 xu, hôm sau sẽ được hoàn trả 10 xu.</p>
    </div>
    <h5><i class="titleLeft"></i> Quy định khác<i class="titleRight"></i></h5>
    <p>Trong quá trình diễn ra sự kiện, nếu phát hiện người dùng gian lận trong sự kiện, ban tổ chức sẽ dựa theo mức độ vi phạm để xử lý, người vi phạm sẽ bị loại khỏi sự kiện hoặc khoá tài khoản. Bao gồm các hành vi sau:</p>
    <p>1. Dùng hoặc trộm bài hát của người khác để dự thi.</p>
    <p>2. Mượn hoặc trộm tài khoản của người khác để dự thi.</p>
    <p>3. Dùng nhiều tài khoản để tham gia dự thi.</p>
    <p>4. Bình luận ác ý, quảng cáo vào bài hát dự thi.</p>
    <p>5. Toàn bộ các hành vi gian lận khác.</p>
    <p class="tips2">Nếu cố ý gian lận, dù có tham gia sự kiện hay không đều bị khoá toàn bộ tài khoản chính và phụ. Sau khi kết thúc sự kiện ban tổ chức sẽ thu hồi toàn bộ phần thưởng.</p>
    <p class="btnMsg">Quyết định của ban tổ chức là quyết định cuối cùng</p>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.rules {
  padding-bottom: 0.4rem;
  .activeTime {
    color: #faefc9;
    text-align: center;
    font-weight: 0.24rem;
    font-weight: 600;
    margin-top: 0.38rem;
  }
  > h5 {
    text-align: center;
    color: #ffe58a;
    margin: 0.46rem auto 0.18rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 5.9rem;
    .titleLeft {
      width: 1.23rem;
      height: 0.33rem;
      background: url(../../assets/img/titleLeft.png);
      background-size: 100% 100%;
      margin-right: 0.11rem;
    }
    .titleRight {
      width: 1.23rem;
      height: 0.33rem;
      background: url(../../assets/img/titleRight.png);
      background-size: 100% 100%;
      margin-left: 0.11rem;
    }
  }
  p {
    color: #ffebc5;
    font-weight: 600;
    font-size: 0.22rem;
    line-height: 0.36rem;
  }
  .tips2 {
    margin-top: 0.3rem;
  }
  .btnMsg {
    margin-top: 0.75rem;
    text-align: center;
    font-size: 0.24rem;
    font-weight: 600;
    color: #ffebc5;
  }
}
</style>
