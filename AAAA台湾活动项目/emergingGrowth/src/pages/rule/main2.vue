<template>
  <div class="tab">
    <div class="topTab" :class="{ruleBg:isShowTab==='wards',wardsBg:isShowTab === 'rule'}">
      <span @click="changTab('wards')"></span>
      <span @click="changTab('rule')"></span>
    </div>
    <div class="wards" v-show="isShowTab === 'wards'">
      <h5>活動時間</h5>
      <p>2019年9月12日15:00-12月12日15:00</p>
      <h5 class="msg">活動獎勵</h5>
      <p>吉他手禮包：吉他手背包禮物*1（25金幣/個）+100金豆</p>
      <p>鼓手禮包：鼓手背包禮物*1（25金幣/個）+豪華遊艇座駕（7天）</p>
      <p>鋼琴手禮包：鋼琴手背包禮物*1（25金幣/個）+50金幣</p>
      <p>主唱歌手禮包：主唱歌手背包禮物*1（25金幣/個）+豪華遊艇座駕（14天）+萌新樂隊徽章（30天）</p>
      <h5 class="msg">獎勵說明</h5>
      <p>1、獎勵禮物均為K房背包禮物，將於領取後自動發放，背包禮物有效期30天</p>
      <p>2、背包禮物可在K房禮物列表背包中查看並贈送，安卓更新至最新版本即可使用，IOS可前往FB“歡歌”粉專，點擊置頂貼文連結下載體驗版使用</p>
      <p>3、解鎖主唱歌手禮包後可獲得萌新樂隊徽章，徽章將於領取次週週一18:00發放</p>
      <p>4、豪華遊艇座駕自動發放，可在我-進場座駕中選擇乘坐</p>
      <p class="jieshi">本活動的最終解釋權歸活動主辦方所有</p>
      <div class="footer">
      </div>
    </div>
    <div class="rule" v-show="isShowTab === 'rule'">
      <h5>活動時間</h5>
      <p>2019年9月12日15:00-12月12日15:00</p>
      <h5 class="msg">活動規則</h5>
      <p>1、本活動限定歌手等級為正式及以下用戶參與，點擊【開啟新旅程】即可報名參與活動</p>
      <p>2、完成任務可領取積分並解鎖對應禮包，獲得獎勵</p>
      <p>3、K房任務限定在新人專屬K房（111744）完成，例如：K房上麥演唱是指在新人專屬K房上麥演唱</p>
      <p>4、已達到指定歌手等級的用戶可直接領取對應積分</p>
      <p>5、每個任務每日最多完成一次</p>
      <h5 class="msg">備註</h5>
      <p>1、完成任務需手動領取對應積分</p>
      <p>2、同一用戶僅可註冊一個帳號參與活動</p>
      <p>3、如發現用戶有任何違規刷分行為，將直接取消用戶活動資格及獎勵，嚴重者封號處理</p>
      <p class="jieshi">本活動的最終解釋權歸活動主辦方所有</p>
      <div class="footer">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowTab: 'wards'
    }
  },
  methods: {
    changTab(tab) {
      this.isShowTab = tab
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #fff2d4;
}
.tab {
  padding: 0.35rem 0.3rem;
  position: relative;
  .topTab {
    transition: all 0.3s;
  }
  .ruleBg {
    width: 6.98rem;
    height: 0.97rem;
    background: url(../../assets/img/ruleTab1.png) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 0.24rem;
    z-index: 10;
    span {
      display: inline-block;
      width: 49%;
      height: 100%;
    }
  }
  .wardsBg {
    width: 6.98rem;
    height: 0.97rem;
    background: url(../../assets/img/wardsTab.png) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 0.24rem;
    z-index: 10;
    span {
      display: inline-block;
      width: 49%;
      height: 100%;
    }
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
.rule {
  width: 5.43rem;
  padding: 0.98rem 0.72rem 0;
  background: #c6f6ff;
  border: 0.03rem solid #0173ff;
  position: absolute;
  top: 0.63rem;
  h5 {
    color: #ff8ec1;
    margin-bottom: 0.2rem;
  }
  p {
    font-size: 80%;
    color: #4178bb;
  }
  .msg {
    margin-top: 0.4rem;
  }
  .jieshi {
    text-align: center;
    margin-top: 0.5rem;
    color: #4178bb;
  }
  .footer {
    width: 6.94rem;
    height: 0.8rem;
    background: url(../../assets/img/ruleFooter.png);
    background-size: 100% 100%;
    position: absolute;
    // bottom: -0.3rem;
    left: -0.035rem;
  }
}
.wards {
  width: 5.43rem;
  padding: 0.98rem 0.72rem 0;
  background: #c6f6ff;
  border: 0.03rem solid #0173ff;
  position: absolute;
  top: 0.63rem;
  h5 {
    color: #ff8ec1;
    margin-bottom: 0.2rem;
  }
  p {
    font-size: 80%;
    color: #4178bb;
  }
  .msg {
    margin-top: 0.4rem;
  }
  .jieshi {
    text-align: center;
    margin-top: 0.5rem;
    color: #4178bb;
  }
  .footer {
    width: 6.94rem;
    height: 0.8rem;
    background: url(../../assets/img/ruleFooter.png);
    background-size: 100% 100%;
    position: absolute;
    // bottom: -0.3rem;
    left: -0.035rem;
  }
}
@import "../../assets/scss/common.scss";
</style>
