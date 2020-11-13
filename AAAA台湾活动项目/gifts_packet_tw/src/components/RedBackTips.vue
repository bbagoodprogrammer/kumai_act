<template>
  <div class="redBackTips">
    <div class="tipsCon">
      <div class="tips1">
        <p>1.下載安卓和IOS最新版本，可在任意K房體驗發紅包、搶紅包功能！</p>
        <img src="../assets/img/t1.png" alt="" class="img1">
        <img src="../assets/img/t2.png" alt="" class="img2">
      </div>
      <div class="tips2">
        <p>2、不同套餐紅包除了有禮物外，還擁有酷炫的特效功能！</p>
        <h6>*召喚朋友</h6>
        <p>互相關注的好友及收藏發紅包K房的用戶可第一時間收到搶紅包消息，多互粉、多收藏K房可以提高搶中紅包的概率！</p>
        <img src="../assets/img/t3.png" alt="" class="img3">
        <h6>*排序上升</h6>
        <p>發送紅包的K房10分鐘内排序上升，展示在官方K房之後，曝光給更多用戶！</p>
        <h6>*房間擴容500人</h6>
        <p>自發送紅包起60分鐘内K房可容納500人，時間結束後后恢復回K房原有容量，轟趴必備！</p>
        <h6>*紅包標籤</h6>
        <p>發送紅包後在K房列表内帶有紅包標記，意為有紅包可搶</p>
        <h6></h6>
        <img src="../assets/img/t4.png" alt="" class="img4">
      </div>
      <div class="tips3">
        <h6>*專屬紅包樣式</h6>
        <p>特殊節日和活動有特殊紅包樣式，過節也有新的紅包玩法</p>
        <img src="../assets/img/t5.png" alt="" class="img5">
      </div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang= "scss" scoped>
.redBackTips {
  width: 7rem;
  padding-top: 0.2rem;
  margin: 0 auto;
  padding-bottom: 0.52rem;
  h6 {
    font-size: 0.24rem;
    color: #ffea63;
  }
  .tipsCon {
    .tips1,
    .tips2,
    .tips3 {
      padding: 0.31rem 0.41rem;
      border-radius: 0.1rem;
      p {
        color: #ffd8a6;
        font-size: 0.24rem;
      }
      .img1 {
        width: 5.96rem;
        height: 5.58rem;
        margin-top: 0.28rem;
      }
      .img2 {
        width: 5.9rem;
        height: 9.2rem;
        margin-top: 0.04rem;
      }
    }
    .tips1,
    .tips2 {
      background: url(../assets/img/tipsBg.png) no-repeat;
      background-size: 100% auto;
    }
    .tips2 {
      margin-top: 0.46rem;
      h6 {
        margin-top: 0.27rem;
      }
      p:first-child {
        margin: 0;
      }
      .img3 {
        width: 6.24rem;
        height: 1.87rem;
        margin-top: 0.1rem;
      }
      .img4 {
        width: 5.96rem;
        height: 7.81rem;
        margin-top: 0.2rem;
      }
    }
    .tips3 {
      padding-top: 0;
      .img5 {
        width: 5.9rem;
        height: 9.2rem;
        margin-top: 0.2rem;
      }
    }
  }
}
</style>
