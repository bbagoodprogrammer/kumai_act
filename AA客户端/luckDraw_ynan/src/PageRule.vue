<template>
  <div class="page pageRule" :style="{height:viewHeight+'px'}">
    <div class="title"><i class="back" @click="$router.go(-1)"></i> Cách chơi</div>
    <div class="tipsItem">
      <p><i>1</i>
        Người mở rút thưởng dùng xu để mua
        phần thưởng tương ứng và thiết lập
        cách rút thưởng. Người trong phòng
        tặng quà tương ứng sẽ được tham gia,
        mỗi 1 quà tặng nhận 1 lần rút thưởng.
        sẽ lần càng nhiều, cơ hội trúng thưởng
        càng cao. Khi hết đếm ngược sẽ mở
        thưởng, 1 người tham dự sẽ nhận phần
        thưởng tương ứng.
      </p>
      <p><i>2</i>
        Phần thưởng có thể chọn VIP, quà, xe
        khung ghế, mỗi lần chỉ được chọn 1 loại.
      </p>
      <p><i>3</i> Cách rút thưởng là quà cần tặng để tham gia, cụ thể dựa theo hiển thị trên danh sách</p>
      <p><i>4</i>Mỗi lần rút thưởng cần chọn thời gian đếm
        ngược: 2, 5, 10, 30, 60 phút. Khi mở rút
        thưởng bắt đầu đếm ngược. Người trong phòng
        tặng quà yêu cầu sẽ được tham dự rút thưởng.
      </p>
      <p><i>5</i>Có thể chọn người được rút thưởng là tất cả
        người trong phòng hoặc chỉ trên mic. Nếu chọn
        tất cả thì tất cả người trong phòng được tham
        dự, nếu chọn chỉ người lên mic thì chỉ ai đang
        lên mic mới được tham dự. Thường dùng trong chế
        độ đông người tại phòng giải trí.
      </p>
      <p><i>6</i>
        Mỗi phòng chỉ được mở 1 rút thưởng. Nếu
        có rút thưởng đang mở thì phải chờ kết
        thúc mới được mở rút thưởng mới.
      </p>
      <p><i>7</i>
        Không thể thu hồi rút thưởng đã mở và
        xu đã dùng. Nếu không ai tham dự rút
        thưởng, phần thưởng gửi cho người mở.
      </p>
    </div>
  </div>
</template>

<script>
import { lang } from './config';

export default {
  computed: {
    lang: () => lang,
    viewHeight: () => window.innerHeight,
  },
};
</script>

<style lang="scss">
.pageRule {
  width: 7.5rem;
  height: 9.88rem;
  background: linear-gradient(
    0deg,
    rgba(84, 173, 255, 1) 0%,
    rgba(122, 75, 255, 1) 100%
  );
  border-radius: 0.32rem 0.32rem 0 0;
  display: flex;
  flex-direction: column;
  .title {
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    font-size: 0.42rem;
    font-weight: 600;
    position: relative;
    .back {
      display: block;
      width: 0.17rem;
      height: 0.29rem;
      background: url(./img/back2.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.36rem;
      left: 0.3rem;
    }
  }
  .tipsItem {
    margin-top: 0.08rem;
    flex: 1;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    -webkit-overflow-scrolling: auto;
    padding: 0 0.28rem 0.3rem 0.73rem;
    p {
      position: relative;
      i {
        display: block;
        width: 0.34rem;
        height: 0.34rem;
        background: url(./img/pNum.png);
        background-size: 100% 100%;
        font-size: 0.24rem;
        text-align: center;
        line-height: 0.34rem;
        position: absolute;
        left: -0.43rem;
        top: 0;
      }
      font-size: 0.26rem;
      margin-top: 0.3rem;
    }
  }
}
</style>