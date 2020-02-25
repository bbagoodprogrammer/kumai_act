<template>
  <div class="rules">
    <p class="actTime">活動時間：11月22日18:00:00-12月2日20:00:00</p>
    <h3>活動規則</h3>
    <div class="rulesTips">
      <h6>活動報名</h6>
      <p>1、點擊“立即報名”即可參加活動，報名後發佈的作品收禮及K房收禮才會被計算</p>
      <p>2、報名後公開發佈的獨唱、合唱、MV、MV合唱作品收禮計入成績（清唱5分鐘收禮以及收錄作品收禮不計入），報名後無需在活動頁面上上傳歌曲</p>
      <p>3、若刪除參賽作品，該作品收禮成績作廢</p>
      <h6>感恩排行榜規則</h6>
      <p>1、按照報名參賽後，獲得的感恩值排名。感恩值=完成任務/助力好友/被好友助力獲得積分+作品/K房收到特定金幣禮物獲得的積分，10金幣魅力值=10積分</p>
      <p>2、報名後公開發佈的獨唱、合唱、MV、MV合唱作品收禮計入成績（清唱5分鐘收禮以及收錄作品收禮不計入）</p>
      <p>3、作品特定禮物為感恩信（10金幣）、火雞大餐（50金幣）；K房特定禮物為紅蘋果（10金幣）、幸運火雞（50金幣）</p>
      <p>4、若獲得的感恩值相同，則先到達該感恩值的排名在前面</p>
      <p>5、榜單展示前100名用戶的比賽成績</p>
    </div>
    <h3>積分獲取攻略</h3>
    <div class="huoquTips">
      <h6>完成每日任務獲得積分：</h6>
      <p>可通過每天完成特定任務獲得積分；完成任務後，積分將自動到賬，且獲得積分每日不清0 </br>每日挑戰任務及對應積分值如下：</p>
      <div class="taskImg"></div>
      <h6>幫好友贏積分：</h6>
      <p>1、每日最多可幫3位好友贏積分，每日最多被3位好友幫忙贏積分</p>
      <p>2、幫1位好友贏積分1次，可為自己增加10積分，可為好友增加實際抽中的積分</p>
      <p>3、每人每天只可給同一位好友贏積分1次</p>
      <h6>收禮攻略</h6>
      <p>1、按照報名參賽後，獲得的感恩值排名。感恩值=完成任務/助力好友/被好友助力獲得積分+作品/K房收到特定金幣禮物獲得的積分，10金幣魅力值=10積分</p>
      <p>2、報名後公開發佈的獨唱、合唱、MV、MV合唱作品收禮計入成績（清唱5分鐘收禮以及收錄作品收禮不計入）</p>
      <p>3、作品特定禮物為感恩信（10金幣）、火雞大餐（50金幣）；K房特定禮物為紅蘋果（10金幣）、幸運火雞（50金幣）</p>
    </div>
    <h3>其他說明</h3>
    <div class="order">
      <p>比賽過程中，若發現用戶使用不正當手段參與活動，小歡有權在事先不通知的前提下按情節嚴重對參賽者、違規者做取消其參賽資格或封禁帳號等處罰，包括但不限於：</p>
      <p>1）活動作品非本人原唱或盜錄他人作品；</p>
      <p>2）盜用或借用他人已有帳號參與活動；</p>
      <p>3）同一用戶註冊多個帳號參與活動；</p>
      <p>4）比賽期間對參賽作品進行惡意評論，廣告等；</p>
      <p>5）通過其他違規行為參與活動。</p>
      <p>若為主動作弊者，無論是否為參賽者永久封禁該用戶所有大小號，活動結束后小歡任有權收回該用戶所有獎勵</p>
    </div>
    <p class="lastTips">本活動的最終解釋權歸活動主辦方所有</p>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.rules {
  .actTime {
    color: #ffd9c4;
    font-size: 80%;
    text-align: center;
    margin-top: 0.31rem;
  }
  h3 {
    margin-top: 0.55rem;
    color: #ffc867;
    font-size: 120%;
    text-align: center;
  }
  .rulesTips {
    margin-top: 0.19rem;
    padding: 0 0.33rem;
    h6 {
      font-size: 97%;
      margin-top: 0.2rem;
    }
    p {
      color: #ffd9c4;
      font-size: 80%;
      padding-left: 0.15rem;
    }
  }
  .huoquTips {
    margin-top: 0.19rem;
    padding: 0 0.33rem;
    h6 {
      font-size: 97%;
      margin-top: 0.2rem;
    }
    p {
      color: #ffd9c4;
      font-size: 80%;
      padding-left: 0.15rem;
    }
    .taskImg {
      width: 6.51rem;
      height: 8.87rem;
      margin: 0.1rem auto;
      background: url(../../assets/img/taskTable.png);
      background-size: 100% 100%;
    }
  }
  .order {
    margin-top: 0.15rem;
    padding: 0 0.33rem;
    p {
      color: #ffd9c4;
      font-size: 80%;
      padding-left: 0.15rem;
    }
  }
  .lastTips {
    text-align: center;
    color: #ffe0aa;
    font-size: 80%;
    margin-top: 0.55rem;
  }
}
</style>
