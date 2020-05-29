<template>
  <div class="rule">
    <h1>活動規則</h1>
    <h6>活動時間：</h6>
    <p>{{timeStr}}</p>
    <h6>報名規則：</h6>
    <p>1.每個用戶只能報名1次，不可重複報名。此前已開通會員的用戶點擊報名後即可查看當前刮獎次數；此前未開通會員的用戶在購買會員後返回活動頁面，即可查看當前的刮獎次數。</p>
    <p>2、受邀助力並且成功的新用戶亦可報名，助力禮包中贈與的刮獎次數可進行刮獎，購買會員可獲得刮獎次數。</p>
    <h6>活動規則：</h6>
    <p>1、活動期間，報名成功後，刷新當前會員等級，領取次數，即可開始刮獎，若刮出神秘任務，則需要完成任務後領取獎勵，其他獎勵則直接派發，專屬禮物會領取到背包中，會員值會直接添加到會員等級中，金幣、金豆會直接添加到錢包。</p>
    <p>2、活動期間，當次數用盡時，可以通過購買會員獲取次數，購買不同時長的會員可獲得相應的免費次數。</p>
    <p>3、邀請碼在抽到任務的三天內有效。</p>
    <p>4.活動獲得金豆背包禮物有效期均為3天，儲值返利券和送禮返利券有效期均為24小時，請盡快使用！</p>
    <h6>次數規則：</h6>
    <p>1、活動期間，成功報名的會員用戶每天0點根據以下表格獲得對應的免費次數，次數發放後若會員在當天內升級（無論如何升級）不會增加免費次數。</p>
    <p>2、活動期間，所有獲得的刮獎次數（包括免費次數和購買會員獲得的次數）都僅當天有效，所有未使用的次數在0點清零，請在清零前使用完。</p>
    <img src="../../assets/img/taskImg.png" alt="">
    <p class="last2Tips">活動期間每天自動發放</br>所有次數將在零點清零</p>
    <p class="lastTips">活動最終解釋權歸主辦方所有</p>
  </div>
</template>

<script>
import getDate from "../../utils/getDate"
export default {
  data() {
    return {
      time: {}
    }
  },
  created() {
    this.time = JSON.parse(sessionStorage.getItem('time'))
  },
  computed: {
    timeStr() {
      return getDate(new Date(this.time.stime * 1000), '~') + '~' + getDate(new Date(this.time.etime * 1000), '~')
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #4900ad;
}
.rule {
  padding: 0.53rem 0.39rem 0.25rem;
  h1 {
    color: #fff79b;
    font-weight: bold;
    font-size: 0.36rem;
    text-align: center;
  }
  h6 {
    color: #a1f3ff;
    font-size: 0.28rem;
    margin-top: 0.39rem;
    font-weight: bold;
  }
  p {
    color: #ffddff;
    font-size: 0.26rem;
    margin-top: 0.22rem;
    padding-left: 0.25rem;
  }
  img {
    width: 5.99rem;
    height: 7.98rem;
    margin: 0.31rem 0 0 0.25rem;
  }
  .last2Tips {
    text-align: center;
    line-height: 0.5rem;
  }
  .lastTips {
    color: #b37bff;
    text-align: center;
    margin-top: 0.7rem;
  }
  .clearfix:after {
    content: "";
    height: 0;
    line-height: 0;
    display: block;
    visibility: hidden;
    clear: both;
  }
}
@import "../../assets/scss/common.scss";
</style>
