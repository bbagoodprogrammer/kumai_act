<template>
  <div class="rule">
    <div class="tabs">
      <span class="tab1" @click="changTab('tab1')" :class="{actTab:showTab == 'tab1'}">活動規則</span>
      <span class="tab2" @click="changTab('tab2')" :class="{actTab:showTab == 'tab2'}">活動獎勵</span>
    </div>
    <div class="time">
      <h5>活動時間</h5>
      <p class="actTime">{{actTime}}</p>
    </div>
    <div class="ruleMsg" v-show="showTab == 'tab1'">
      <h5>活動玩法</h5>
      <p>1.用戶點擊發佈心願，寫下自己的心願，每人每天有5次發佈心願機會.</p>
      <p>2.點擊心願便利貼摘下對方心願，摘下心願後，點擊心願紀錄-摘下心願-送出心願歌曲，選擇活動開始後發佈的任意一首公開作品（清唱5分鐘除外）送給歌友</p>
      <p>3.被摘下的心願將不在心願單列表中出現，可在心願記錄裏查詢.</p>
      <p>4.摘取心願後，請在<em class="red">10小時</em>內送出心願歌曲，否則該心願會重新回到待摘狀態.</p>
      <p>5.每天最多幫別人完成心願10個</p>
      <p>6.許願人可及時查詢心願記錄瞭解自己心願被完成的情況.</p>
      <p>7.小號無法參與此活動.</p>
      <p>8.活動期間累計<em class="red">8次</em>被評分為1，或者刪除心願歌曲達到5次，將禁止摘下別人的心願，同時送出心願榜分數清0，退出該榜單的比賽.</p>
      <p>9.若榜單分數相同，先達到的排名在前面</p>
      <h5>注意事項</h5>
      <p>發佈空底板歌曲、惡意摘心願、刷禮物的用戶將觸發被系統封禁相關功能的機制，同時予以下榜，取消所有獎勵，嚴重封禁賬號處理！</p>
    </div>
    <div class="ward" v-show="showTab == 'tab2'">
      <h5>獎勵</h5>
      <p>
        1.每次摘下心願且成功送出歌曲即會收到一個背包禮物（每人每天最多收到3個，多款背包禮物隨機發放）。
      </p>
      <h6>送出心願榜前100名用戶獎勵</h6>
      <div class="title">Top 10</div>
      <div class="ward1Box">
        <span>
          <div class="imgBox">
            <img src="../../assets/img/ward1.png" alt="">
          </div>
          <em>
            心願大使徽章
          </em>
        </span>
        <span>
          <div class="imgBox">
            <img src="../../assets/img/ward2.png" alt="">
          </div>
          <em>
            vip（一個月）
          </em>
        </span>
        <span>
          <div class="imgBox">
            <img src="../../assets/img/ward3.png" alt="">
          </div>
          <em>
            100 金幣
          </em>
        </span>
      </div>
      <div class="title">Top 11 ~ 100</div>
      <div class="ward1Box">
        <span>
          <div class="imgBox">
            <img src="../../assets/img/ward4.png" alt="">
          </div>
          <em>
            暖心天使徽章
          </em>
        </span>
        <span>
          <div class="imgBox">
            <img src="../../assets/img/ward2.png" alt="">
          </div>
          <em>
            vip（一個月）
          </em>
        </span>
        <span>
          <div class="imgBox">
            <img src="../../assets/img/ward6.png" alt="">
          </div>
          <em>
            1000 金豆
          </em>
        </span>
      </div>
      <h6>完成心願榜前100名用戶獎勵</h6>
      <div class="ward2Box">
        <span>
          <div class="imgBox">
            <img src="../../assets/img/ward7.png" alt="">
          </div>
          <em>
            心願人氣徽章
          </em>
        </span>
        <span>
          <div class="imgBox">
            <img src="../../assets/img/ward6.png" alt="">
          </div>
          <em>
            1000 金豆
          </em>
        </span>
      </div>
      <p class="tips1">徽章，VIP有效期皆為31天</p>
      <!-- <p class="tips2">Quyết định của ban tổ chức là quyết định cuối cùng</p> -->
    </div>
    <div class="lastTips">該活動的最終解釋權歸活動主辦方所有</div>
    <loading></loading>
  </div>
</template>

<script>
import api from "../../api/apiConfig"
import getDate from "../../utils/getDate"
import Loading from "../../components/Loading"
export default {
  components: { Loading },
  data() {
    return {
      showTab: 'tab1',
      actTime: ''
    }
  },
  created() {
    api.getTime().then(res => {
      let resData = res.data.response_data
      this.actTime = getDate(new Date(resData.stime * 1000), 'pai') + ' - ' + getDate(new Date(resData.etime * 1000), 'pai')
    })
  },
  methods: {
    changTab(tab) {
      this.showTab = tab
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #2d0080;
}
.red {
  color: red;
}
.rule {
  padding: 0.35rem 0.45rem;
  .tabs {
    width: 6.73rem;
    height: 0.95rem;
    background: url(../../assets/img/tabsBg.png);
    background-size: 100% 100%;
    display: flex;

    span {
      display: inline-block;
      width: 3.56rem;
      height: 0.75rem;
      color: #a739da;
      font-size: 103%;
      line-height: 0.75rem;
      text-align: center;
      transition: all 0.2s;
      &.actTab {
        color: #fefefe;
        font-size: 113%;
        background: url(../../assets/img/avtTab.png);
        background-size: 100% 100%;
      }
      &.tab1 {
        margin: 0.1rem 0 0 0.1rem;
      }
      &.tab2 {
        margin: 0.1rem 0.12rem 0 0;
      }
    }
  }
  .time {
    padding: 0 0.36rem;
    .actTime {
      color: #e8b7ff;
      margin: 0.34rem 0;
      padding-left: 0.24rem;
    }
  }
  .ruleMsg {
    padding: 0 0.36rem;
    p {
      margin: 0.36rem 0;
      padding-left: 0.24rem;
    }
  }
  .ward {
    padding: 0 0.36rem;
    h6 {
      font-size: 80%;
      color: #1dfadf;
      margin-top: 0.5rem;
      font-weight: bold;
    }
    p {
      margin: 0.36rem 0;
      padding-left: 0.24rem;
    }
    .title {
      color: #1dfadf;
      font-weight: bold;
      text-align: center;
      margin-top: 0.4rem;
    }
    .ward1Box {
      display: flex;
      margin-top: 0.15rem;
      span {
        width: 33%;
        .imgBox {
          margin: 0 auto;
          width: 1.7rem;
          height: 1.7rem;
          background: url(../../assets/img/wardBg.png);
          background-size: 100% 100%;
        }
        img {
          display: block;
          width: 1.7rem;
          height: 1.7rem;
          margin: 0 auto;
        }
        em {
          margin-top: 0.05rem;
          display: block;
          font-size: 70%;
          color: #e8b7ff;
          text-align: center;
        }
      }
    }
    .ward2Box {
      display: flex;
      justify-content: center;
      margin-top: 0.35rem;
      span {
        width: 33%;
        .imgBox {
          margin: 0 auto;
          width: 1.7rem;
          height: 1.7rem;
          background: url(../../assets/img/wardBg.png);
          background-size: 100% 100%;
        }
        img {
          display: block;
          width: 1.7rem;
          height: 1.7rem;
          margin: 0 auto;
        }
        em {
          margin-top: 0.05rem;
          display: block;
          font-size: 70%;
          color: #e8b7ff;
          text-align: center;
        }
      }
    }
    .tips1 {
      margin-top: 0.3rem;
      font-size: 70%;
      color: #e8b7ff;
      text-align: left;
      padding-left: 0.2rem;
    }
    .tips2 {
      margin-top: 0.3rem;
      font-size: 70%;
      color: #e8b7ff;
      margin-top: 0.48rem;
    }
  }
  h5 {
    color: #1dfadf;
    font-size: 110%;
    font-weight: bold;
    text-align: left;
    margin: 0.21rem 0 0.1rem;
  }
  p {
    font-size: 0.22rem;
    color: #e8b7ff;
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
.lastTips {
  font-size: 0.22rem;
  color: #9c66ff;
  text-align: center;
  margin-top: 1.56rem;
}
@import "../../assets/scss/common.scss";
</style>
