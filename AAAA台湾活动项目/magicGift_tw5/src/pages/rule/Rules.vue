<template>
  <div class="rules">
    <p class="activeTime">活動時間:1月24日18:00:00-2月3日20:00:00</p>
    <h5><i class="titleLeft"></i> 活動報名<i class="titleRight"></i></h5>
    <div class="actSingUp">
      <p>1、點擊“立即報名”參加活動，報名後發佈的作品收禮及K房收禮才會被計算（報名後無需在活動頁面上上傳歌曲）</p>
      <p>2、僅公開發佈的獨唱、合唱、MV獨唱、MV合唱作品收禮計入成績（清唱5分鐘、收錄作品收禮不計入</p>
      <p>3、若刪除活動期間發佈的作品，該刪除作品收禮成績作廢</p>
    </div>
    <h5><i class="titleLeft"></i> 作品爭霸榜排名規則<i class="titleRight"></i></h5>
    <div class="wardRankTips">
      <p>1、按照報名活動後發佈的公開作品獲得特定禮物的魅力值排名</p>
      <p>2、本活動的作品特定禮物為新年湯圓（10金幣）、新年紅包（39金幣）、新年快樂（299金幣）</p>
      <p>3、若獲得的特定禮物魅力值相同，則先到達該魅力值的排名在前面</p>
    </div>
    <h5><i class="titleLeft"></i> K房爭霸榜排名規則<i class="titleRight"></i></h5>
    <div class="kRoomTips">
      <p>1、按照報名活動後在K房上麥獲得特定禮物的魅力值排名</p>
      <p>2、本活動的特定禮物為新年爆竹（10金幣）、新年福袋（39金幣）、新年舞獅（299金幣）</p>
      <p>3、若收到的特定禮物魅力值相同，則先到達該魅力值的排名在前面</p>
    </div>
    <h5><i class="titleLeft"></i> 人氣爭霸榜排名規則<i class="titleRight"></i></h5>
    <div class="peopleTips">
      <p>1、按報名後發佈作品或在K房送特定禮物的人次排名</p>
      <p>2、同一用戶送禮，無論是在作品或是K房，僅計入1次</p>
      <p>3、若送禮人次相同，則先到達該魅力值的排名在前面</p>
    </div>
    <h5><i class="titleLeft"></i> 金幣返還獎勵規則<i class="titleRight"></i></h5>
    <div class="coinsTips">
      <p>1、向報名活動後發佈的公開作品贈送新年湯圓（10金幣）、新年紅包（39金幣）、新年快樂（299金幣），次日凌晨返禮物金幣數的5%金幣。如當天贈送1個價值299金幣的新年快樂禮物，則在次日凌晨獎勵15金幣</p>
      <p>2、向報名活動後在K房上麥的用戶贈送新年爆竹（10金幣）、新年福袋（39金幣）、新年舞獅（299金幣）禮物，次日凌晨返禮物金幣數的5%金幣。如當天贈送1個價值299金幣的新年舞獅禮物，則在次日凌晨獎勵15金幣</p>
    </div>
    <h5><i class="titleLeft"></i> 其他說明<i class="titleRight"></i></h5>
    <p>比賽過程中，若發現用戶使用不正當手段參與活動，小歡有權在事先不通知的前提下按情節嚴重對參賽者、違規者做取消其參賽資格或封禁帳號等處罰，包括但不限於：</p>
    <p>1）活動作品非本人原唱或盜錄他人作品；</p>
    <p>2）盜用或借用他人已有帳號參與活動；</p>
    <p>3）同一用戶註冊多個帳號參與活動；</p>
    <p>4）比賽期間對參賽作品進行惡意評論，廣告等；</p>
    <p>5）通過其他違規行為參與活動。</p>
    <p class="tips2">若為主動作弊者，無論是否為參賽者永久封禁該用戶所有大小號，活動結束后小歡任有權收回該用戶所有獎勵</p>
    <p class="btnMsg">本活動的最終解釋權歸活動主辦方所有</p>
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
