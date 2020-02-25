<template>
  <div class="wards">
    <p class="activeTime"><strong>活動時間</strong>2019年12月30日18:00-2020年1月8日23:00</p>
    <h4>活動獎勵</h4>
    <div class="wardTop">
      <div class="topTitle">人氣榜：</div>
      <h5>第一名</h5>
      <p>人氣王徽章（30天）+一飛沖天座駕（30天）+2019限定背包禮物*1(1099金幣/個，30天)+2000金幣+3000金豆</p>
      <h5>第二名</h5>
      <p>人氣王徽章（30天）+一飛沖天座駕（30天）+2019限定背包禮物*1(1099金幣/個，30天)+1500金幣+2000金豆</p>
      <h5>第三名</h5>
      <p>人氣王徽章（30天）+一飛沖天座駕（30天）+2019限定背包禮物*1(1099金幣/個，30天)+1000金幣+1000金豆</p>
      <h5>第四名-第十名</h5>
      <p>人氣王徽章（30天）+500金幣+500金豆</p>
    </div>
    <div class="kRoomTop">
      <div class="topTitle">應援榜：</div>
      <h5>第一名</h5>
      <p>守護達人徽章（30天）+赤鷹戰機座駕（30天）+5%儲值返利券+1000金幣+1000金豆</p>
      <h5>第二名</h5>
      <p>守護達人徽章（30天）+赤鷹戰機座駕（30天）+4%儲值返利券+800金幣+800金豆</p>
      <h5>第三名</h5>
      <p>守護達人徽章（30天）+赤鷹戰機座駕（30天）+3%儲值返利券+500金幣+500金豆</p>
      <h5>第四名-第十名</h5>
      <p>守護達人徽章（30天）+200金幣+200金豆</p>
    </div>
    <div class="fanhuan">
      <h5>備註：</h5>
      <p>活動獎勵於每週活動結束後三個工作日內發放</p>
    </div>
    <div class="bottmMsg">
      本活動的最終解釋權歸活動主辦方所有
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.wards {
  p {
    font-size: 80%;
    line-height: 0.36rem;
  }
  .activeTime {
    margin-top: 0.51rem;
    text-align: left;
    font-size: 80%;
    strong {
      display: block;
      text-align: left;
      color: #ffefbb;
      font-weight: 600;
      margin-bottom: 0.24rem;
    }
  }
  h4 {
    margin-top: 0.7rem;
    color: #ffefbb;
    font-weight: 600;
  }
  > h5 {
    text-align: center;
    font-size: 120%;
    color: #ffed6a;
    margin-top: 0.57rem;
  }
  .wardTop {
    .topTitle {
      font-size: 88%;
      color: #19ffe7;
      margin-top: 0.3rem;
    }
    > h5 {
      font-size: 75%;
      margin-top: 0.2rem;
    }
    p {
      font-size: 80%;
    }
  }
  .kRoomTop {
    .topTitle {
      font-size: 88%;
      color: #19ffe7;
      margin-top: 0.5rem;
    }
    > h5 {
      font-size: 75%;
      margin-top: 0.2rem;
    }
    p {
      font-size: 80%;
    }
  }
  .fanhuan {
    margin-top: 0.45rem;
    > h5 {
      font-size: 75%;
      margin-top: 0.2rem;
      color: #19ffe7;
    }
    p {
      font-size: 80%;
    }
  }
  .bottmMsg {
    text-align: center;
    font-size: 80%;
    color: #f4a2ff;
    margin-top: 0.87rem;
  }
}
</style>
