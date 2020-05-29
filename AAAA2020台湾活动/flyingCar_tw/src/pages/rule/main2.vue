<template>
  <div class="rule">
    <div class="tabs">
      <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" href="">獎勵</a>
      <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" href="">規則</a>
    </div>
    <p class="actTIme">活動時間: 5月27日18:00—6月5日20:00</p>
    <div class="gift" v-if="mainTab==0">
      <img src="../../assets/img/giftImg.png" alt="" class="giftImg">
      <h5>總榜獎勵：</h5>
      <p>TOP1：“車神”認證30天 + 飛車徽章30天 + 夢幻超跑背包禮物（價值3488金幣）+ 7位數靚號 + 3000金幣 + 5000金豆</p>
      <p>TOP2：飛車徽章30天 + 夢幻超跑背包禮物（價值3488金幣）+ 7位數靚號 + 2000金幣 + 3000金豆</p>
      <p>TOP3：飛車徽章30天 + 夢幻超跑背包禮物（價值3488金幣）+ 7位數靚號 + 1000金幣 + 2000金豆</p>
      <p>
        TOP4-10：飛車徽章15天 + 500金幣 + 1000金豆</br>
        注意：背包禮物的有效期為14天 </p>
      <h5>日榜獎勵：</h5>
      <p>TOP1： 12%儲值返利券 + 10000金豆</p>
      <p>TOP2： 10%儲值返利券 + 8000金豆</p>
      <p>TOP3： 8%儲值返利券 + 6000金豆</p>
      <p>注意：儲值返利券的有效期為1天。日榜獎勵于次日0h系統自動發放</p>
      <h6>活動期間達到對應等級可獲得相應稱號和獎勵，獎勵實時派發。詳情如下表：</h6>
      <img src="../../assets/img/ruleImg1.png" class="ruleImg1" alt="">
      <h5>參賽用戶座駕獎勵：</h5>
      <p>活動結束時達到對應里程值的數據，可獲得相應的座駕獎勵，由系統自動派發，可在“我的-進場座駕”點擊使用。獎勵如下：</p>
      <img src="../../assets/img/ruleImg2.png" class="ruleImg2" alt="">
    </div>
    <div class="ruleItem" v-else>
      <p>1. 所有用戶可報名參加</p>
      <p>2. 排名規則：日榜按每日里程值從高到低排名，次日0h重新計算；總榜按活動期間累計里程值從高到低排名。日榜和總榜只展示前200名，相同分數的用戶，先達到的用戶排名在前。</p>
      <p>3. 報名後送出金幣禮物魅力值（包含K房，語聊房，作品）即可獲得里程值，1金幣魅力值=1里程值。</p>
      <p>4. 日榜時間</p>
      <div class="days">
        <p>Day1:18h 27/5-0h 28/5 </br>
          Day2:0h 28/5-0h 29/5</br>
          Day3:0h 29/5-0h 30/5</br>
          Day4:0h 30/5-0h 31/5</br>
          Day5:0h 31/5-0h 1/6</br>
          Day6:0h 1/6-0h 2/6</br>
          Day7:0h 2/6-0h 3/6 </br>
          Day8:0h 3/6-0h 4/6</br>
          Day9:0h 4/6-0h 5/6</br>
          Day10:0h 5/6-20h 5/6
        </p>
      </div>
      <p>5. 活動期間儲值可獲得里程值加成，儲值後送禮將自動獲得加成，每層級的加成不疊加。詳情如下表:</p>
      <img src="../../assets/img/ruleImg3.png" class="ruleImg3" alt="">
    </div>
    <p class="lastTips">活動最終解釋權歸主辦方所有！</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mainTab: 0
    }
  },
  methods: {
    mainTabClick(val) {
      this.mainTab = val
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #382827;
}
.rule {
  padding: 0.26rem 0.32rem;
  .tabs {
    width: 6.84rem;
    height: 0.98rem;
    padding: 0 0.07rem;
    background: url(../../assets/img/tabs.png);
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      display: block;
      width: 3.59rem;
      height: 0.84rem;
      text-align: center;
      line-height: 0.84rem;
      color: #d5b49f;
      &.current {
        color: #642002;
        background: url(../../assets/img/actTab.png);
        background-size: 100% 100%;
      }
    }
  }
  h5 {
    color: #feffa8;
    margin: 0.35rem 0;
  }
  h6 {
    color: #feffa8;
    font-size: 0.24rem;
    margin-top: 0.2rem;
  }
  p {
    font-size: 0.24rem;
    font-weight: 500;
    color: #ffd1a6;
  }
  .actTIme {
    text-align: center;
    font-size: 0.24rem;
    font-weight: 500;
    margin-top: 0.21rem;
    color: #ffdaab;
    font-weight: 700;
  }

  .gift {
    .giftImg {
      width: 6.03rem;
      height: 3.98rem;
      display: block;
      margin: 0.5rem auto;
    }
    .ruleImg1 {
      width: 5.92rem;
      height: 3.46rem;
      margin-top: 0.23rem;
    }
    .ruleImg2 {
      width: 6.02rem;
      height: 6.36rem;
      margin-top: 0.27rem;
    }
  }
  .ruleItem {
    p {
      margin-top: 0.25rem;
    }
    .days {
      margin: 0.05rem 0 0 0.6rem;
    }
    .ruleImg3 {
      width: 6.02rem;
      height: 4.04rem;
      margin-top: 0.27rem;
    }
  }
  .lastTips {
    text-align: center;
    font-size: 0.22rem;
    color: #9a807e;
    margin-top: 1.08rem;
  }
}

@import "../../assets/scss/common.scss";
</style>
