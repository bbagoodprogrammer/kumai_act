<template>
  <div class="actRules">
    <div class="totalTips" v-if="is_admin">
      <h6>申請開趴攻略：</h6>
      <div class="tipsBox">
        <p>1、K房房主及管理員可申請開趴，點擊【申請開趴】按鈕並完整填寫開趴申請表即可，需在活動開始前1-30天內提交申請，每次活動時長限定1-3小時之間，每個K房每月最多申請舉辦4次活動</p>
        <p>2、如活動需要歌友提前報名作為演唱嘉賓請選擇【需要報名】，報名詳情可在【我的趴踢】查看，可快捷聯絡報名歡友</p>
        <p>3、成功提交申請後請耐心等待官方審核結果，具體情況可點擊【我的趴踢】查看</p>
        <p>4、在【我的趴踢】中點擊修改方案可對未審核及審核未通過的方案進行修改，已審核通過的方案不可修改</p>
        <p>5、方案審核未通過可重新修改提交一次，再次提交未通過不可進行修改</p>
        <p>6、正在舉辦的活動將在趴踢列表置頂展示，K房封面自動增加活動標籤</p>
        <p>7、同一K房申請活動後未積極組織或舉辦（包括活動期間設置K房私密）達四次，不可再申請活動</p>
        <p>8、每場活動可獲得對應趴踢積分，計算方式如下</p>
        <img src="../../assets/img/ruleImg1.png" alt="" class="ruleImg1">
        <p class="ps">PS：方案策劃積分由官方審核活動時評出，活動方案越完善、玩法越新穎評分越高，可參考官方活動策劃</p>
        <p>9、每週/月達到指定積分（3000/10000）或進入榜單前十名可獲得官方獎勵，官方K房不參與排名</p>
        <img src="../../assets/img/ruleImg2.png" alt="" class="ruleImg2">
        <img src="../../assets/img/ruleImg3.png" alt="" class="ruleImg3">
        <p class="ps">PS：於每週/月初結算上週/月獎勵，官方人員將於3天內聯絡房主統計發放獎勵，逾期未提交視為自動放棄</p>
      </div>
      <h6>圍觀轟趴攻略：</h6>
      <div class="tipsBox">
        <p>1、每人每日在趴踢列表關注2個活動即可領取30金豆，取消關注無效，僅限一個賬號獲得獎勵</p>
        <p>2、用戶在任意活動K房累計在線20分鐘獎勵30金豆，每位用戶每天僅限領取一次</p>
        <p>3、點擊關注活動後可在活動開始前5分鐘收到活動消息提醒，精彩趴踢不錯過</p>
        <p>4、具有報名功能的活動可點擊報名後填寫並提交報名申請，活動發起人會聯絡告知你報名結果，報名成功即可參與活動</p>
        <p>5、多分享、多關注可吸引更多歌友一起轟趴</p>
        <p>6、具體活動內容由發起人確定，與官方無關，活動中存在疑問可咨詢對應活動發起人</p>
      </div>
    </div>
    <div v-else>
      <h6>申請開趴攻略：</h6>
      <div class="tipsBox">
        <p>1、每人每日在趴踢列表關注2個活動即可領取30金豆，取消關注無效，僅限一個賬號獲得獎勵</p>
        <p>2、用戶在任意活動K房累計在線20分鐘獎勵30金豆，每位用戶每天僅限領取一次</p>
        <p>3、點擊關注活動後可在活動開始前5分鐘收到活動消息提醒，精彩趴踢不錯過</p>
        <p>4、具有報名功能的活動可點擊報名後填寫並提交報名申請，活動發起人會聯絡告知你報名結果，報名成功即可參與活動</p>
        <p>5、多分享、多關注可吸引更多歌友一起轟趴</p>
        <p>6、具體活動內容由發起人確定，與官方無關，活動中存在疑問可咨詢對應活動發起人</p>
      </div>
    </div>
    <p class="lastTips">K房狂歡趴活動解釋權歸主辦方所有</p>
  </div>
</template>
<script>
import getString from "../../utils/getString"
export default {
  data() {
    return {
      is_admin: false
    }

  },
  created() {
    this.is_admin = getString('is_admin')
  }
}
</script>
<style lang="scss">
@import "../../assets/scss/common.scss";
body {
  background: rgba(65, 23, 122, 1);
  .actRules {
    padding: 0.5rem 0.58rem 0.2rem 0.33rem;
  }
  .tipsBox {
    padding-left: 0.28rem;
  }
  h6 {
    color: rgba(191, 255, 254, 1);
    font-weight: 600;
    font-size: 0.26rem;
    margin-bottom: 0.25rem;
  }
  p {
    font-size: 0.24rem;
    color: rgba(191, 255, 254, 1);
  }
  .ps {
    font-size: 0.24rem;
    color: rgba(191, 255, 254, 1);
    margin: 0.24rem 0 0.48rem;
  }
  .ruleImg1 {
    width: 6.21rem;
    height: 6.08rem;
    margin-top: 0.32rem;
  }
  .ruleImg2 {
    width: 6.21rem;
    height: 3.58rem;
    margin-top: 0.32rem;
  }
  .ruleImg3 {
    width: 6.21rem;
    height: 3.58rem;
    margin-top: 0.32rem;
  }
  .lastTips {
    color: rgba(168, 132, 216, 1);
    font-size: 0.24rem;
    margin: 0.66rem auto 0;
    text-align: center;
  }
}
</style>
