<template>
  <div class="rule">
    <h5>活動規則</h5>
    <p class="ruleTitle">活動時間：</p>
    <p>{{timer}}</p>
    <ol>
      <li>1.活動期間每儲值1金幣即獲得1個老虎幣，老虎幣可在該頁面上兌換抽獎，花費老虎幣越多的抽獎模式獲得的獎勵越豐富，得到珍貴獎品的概率越大！</li>
      <li>2.每次抽獎可同時獲得3個獎品，獎品實時派發到賬戶上，當其中1個獎品Double卡時，當前其他2個獎品可領取各2個！</li>
      <li>3.該活動獲得的儲值金幣返利券和送禮金幣返利券在抽到券後開始計算數值，滿足條件後派發金幣！</li>
      <li>4.抽500老虎幣/次模式滿20次必中7位數靚號，抽中7位數靚號獎勵，官方號UID10會與您聯繫，在官方提供的靚號庫範圍內篩選確認靚號號碼，以及需要提供未在歡歌平台註冊過的手機號碼進行綁定</li>
      <li>5.該活動獲得的金豆背包禮物獎勵，安卓版本可在我-背包中查看，而且送禮時，選擇背包禮物送出。IOS可前往app store 搜尋最新版本“高歌”，下載使用</li>
    </ol>
    <p class="waordsMsg">可能獲得的獎品</p>
    <div class="wardsBox clearfix">
      <ul>
        <li>
          <span>
            <img :src="require('../../assets/img/ward19.png')" alt="">
          </span>
          <p>Vip</p>
        </li>
        <li>
          <span>
            <img :src="require('../../assets/img/ward12.png')" alt="">
          </span>
          <p>海量金幣</p>
        </li>
        <li>
          <span>
            <img :src="require('../../assets/img/ruleWard.png')" alt="">
          </span>
          <p>金豆背包禮物</p>
        </li>
        <li>
          <span>
            <img :src="require('../../assets/img/ward7.png')" alt="">
          </span>
          <p>送禮金幣返利券</p>
        </li>
        <li>
          <span>
            <img :src="require('../../assets/img/ward4.png')" alt="">
          </span>
          <p>储值金幣返利券</p>
        </li>
        <li>
          <span>
            <img :src="require('../../assets/img/ward8.png')" alt="">
          </span>
          <p>老虎幣</p>
        </li>
        <li>
          <span>
            <img :src="require('../../assets/img/ward21.png')" alt="">
          </span>
          <p>Double卡</p>
        </li>
        <li>
          <span>
            <img :src="require('../../assets/img/ward15.png')" alt="">
          </span>
          <p>海量金豆</p>
        </li>
        <li>
          <span>
            <img :src="require('../../assets/img/ward20.png')" alt="">
          </span>
          <p>7位數靚號</p>
        </li>
      </ul>
    </div>
    <p class="footerMsg">該活動最終解釋權由活動主辦方所有 </p>
  </div>
</template>

<script>
import getDate from "../../utils/getDate.js"
export default {
  data() {
    return {
      stime: 0,
      etime: 0
    }
  },
  created() {
    this.stime = sessionStorage.getItem('stime')
    this.etime = sessionStorage.getItem('etime')
  },
  computed: {
    timer() {
      return getDate(new Date(Number(this.stime * 1000)), "rule") + ' - ' + getDate(new Date(Number(this.etime * 1000)), "rule")
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #2b0057;
}
.rule {
  padding: 0.35rem 0.45rem;
  .ruleTitle {
    margin-top: 0.1rem;
  }
  h5 {
    color: #fdfdac;
    font-size: 160%;
    font-weight: bold;
    text-align: center;
    margin-bottom: 0.36rem;
  }
  > p {
    font-size: 80%;
    color: #5dffe2;
  }
  ol {
    li {
      margin-top: 0.2rem;
      padding-left: 0.38rem;
      font-size: 80%;
      line-height: 0.28rem;
      position: relative;
    }
    li::after {
      content: "";
      width: 0.12rem;
      height: 0.12rem;
      position: absolute;
      left: 0rem;
      top: 0.1rem;
      background-color: #ffd900;
      border-radius: 50%;
    }
  }
  .waordsMsg {
    margin-top: 0.5rem;
  }
  .wardsBox {
    width: 5.5rem;
    margin: 0 auto;
    li {
      width: 1.52rem;
      height: 1.8rem;
      float: left;
      margin: 0.2rem 0.3rem 0 0;
      span {
        display: block;
        width: 0.9rem;
        height: 0.9rem;
        border-radius: 0.2rem;
        background-color: #ab02de;
        text-align: center;
        margin: 0 auto;
        img {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }
      p {
        font-size: 70%;
        text-align: center;
        margin-top: 0.12rem;
      }
    }
  }
  .footerMsg {
    text-align: center;
    font-size: 80%;
    color: #f7d8ff;
    margin-top: 0.6rem;
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
