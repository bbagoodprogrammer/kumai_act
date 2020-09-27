<template>
  <div class="rule">
    <div class="tabs" :class="{tab2Act:type==2,tab3Act:type==3}">
      <span @click="setTab(1)"><em class="tab1" :class="{act:type ==1}"></em></span>
      <span @click="setTab(2)"><em class="tab2" :class="{act:type ==2}"></em></span>
      <span @click="setTab(3)"><em class="tab3" :class="{act:type ==3}"></em></span>
    </div>
    <div class="wards" v-if="type==1">
      <div class="actTime">活動時間：9月18日18:00-9月27日22:00</div>
      <div class="wardsList">
        <span v-for="(item,index) in wardList" :key="index">
          <div class="imgbox">
            <img src="../../assets/img/ruleBgImg.png" alt="" class="bg">
            <img :src="item.img" alt="">
          </div>

          <strong>{{item.name}}</strong>
        </span>
      </div>
      <h3>明星戰隊榜</h3>
      <h6>第1名戰隊</h6>
      <p>1、隊長獲得活動中本人收禮金幣數8%的現金分成+明星戰隊徽章（30天）+粉色摩天輪*2（1520金幣/個）</p>
      <p>2、貢獻戰隊積分值前5名：</p>
      <p>第1名：明星戰隊徽章（30天）+粉色摩天輪*1（1520金幣/個）+800金幣+1000金豆+布加迪座駕（30天）</p>
      <p>第2-3名：明星戰隊徽章（30天）+煙火燦爛*1（588金幣/個）+500金幣+500金豆+布加迪座駕（30天）+800金幣+1000金豆+布加迪座駕（30天）</p>
      <p>第4-5名：明星戰隊徽章（30天）+200金幣+500金豆+布加迪座駕（30天）</p>
      <h6>第2-3名戰隊</h6>
      <p>1、隊長獲得活動中本人收禮金幣數6%的現金分成+明星戰隊徽章（30天）+粉色摩天輪*1（1520金幣/個）</p>
      <p>2、貢獻戰隊積分值前5名：</p>
      <p>第1名：明星戰隊徽章（30天）+一見鐘情*1（820金幣/個）+800金幣+1000金豆+布加迪座駕（30天）</p>
      <p>第2-3名：明星戰隊徽章（30天）+煙火燦爛*1（588金幣/個）+500金幣+500金豆+布加迪座駕（30天）</p>
      <p>第4-5名：明星戰隊徽章（30天）+200金幣+500金豆+布加迪座駕（30天）</p>
      <h6>第4-10名戰隊</h6>
      <p>1、隊長獲得活動中本人收禮金幣數3%的現金分成+明星戰隊徽章（30天）+一見鐘情*1（820金幣/個）</p>
      <p>2、貢獻戰隊積分值前5名：</p>
      <p>第1名：明星戰隊徽章（30天）+煙火燦爛*1（588金幣/個）+500金幣+1000金豆+布加迪座駕（30天）</p>
      <p>第2-3名：明星戰隊徽章（30天）+音符炸彈*1（399金幣/個）+200金幣+500金豆+布加迪座駕（30天）</p>
      <p>第4-5名：明星戰隊徽章（30天）+200金幣+500金豆+布加迪座駕（30天）</p>
      <h6>第11-20名戰隊</h6>
      <p>1、隊長獲得明星戰隊徽章（30天）+流星漏*3（66金幣/個）</p>
      <p>2、貢獻戰隊積分值前5名：</p>
      <p>第1名：明星戰隊徽章（30天）+流星漏*1（66金幣/個）+200金幣+1000金豆</p>
      <p>第2-3名：明星戰隊徽章（30天）+流星漏*1（66金幣/個）+500金豆</p>
      <p>第4-5名：明星戰隊徽章（30天）+500金豆</p>
      <h6>熱房榜（獎勵房主及管理員）：</h6>
      <p>第1名K房：300金幣+3000金豆+K房容量提升至200人（永久）</p>
      <p>第2名K房：200金幣+2000金豆+K房容量提升至200人（永久）</p>
      <p>第3名K房：100金幣+1000金豆+K房容量提升至200人（永久）</p>
      <p>第4-10名K房：50金幣+1000金豆+K房容量提升至200人（永久）</p>
      <h6>獎勵說明</h6>
      <p>1、從本活動獲得的背包禮物有效期均為7天，請在有效期內使用</p>
      <p>2、榜單獎勵于活動結束后7個工作日內發放</p>
      <p>3、榜單前20名戰隊若成員不足五人則剩餘獎勵視為無效</p>
      <p>4、現金獎勵將加入收益中心進行統一結算）</p>
      <p>5、K房房主和管理員以活動結束時統計信息為準</p>
    </div>
    <div class="ruleTips" v-if="type==2">
      <div class="actTime">活動時間：9月18日18:00-9月27日22:00</div>
      <p>1、本活動所有任務及數據僅在K房多人娛樂分組模式下有效</p>
      <p>2、點擊頁面報名即可參賽，簽約玩家（包括簽約房主&創作者）可報名成為隊長並組建自己的明星戰隊，若報名隊員則無法組建戰隊，可加入其他戰隊參與活動。非簽約玩家僅可報名成為隊員</p>
      <p>3、可邀請好友壯大自己的戰隊，與隊長組隊參與分組PK可積累戰隊積分，未與隊長同組則收禮數據不記錄，上麥收禮1金幣魅力值=1積分，明星戰隊榜依據戰隊總積分排名，排名靠前可獲得豐厚獎勵</p>
      <p>4、除戰隊長外每人可加入多個戰隊，可在【當前組隊情況】核查是否與隊長、隊員在同一分組，便於判定積分是否有效</p>
      <p>5、完成每日任務可獲得對應獎勵，任務於0點刷新，獎勵由系統自動發放</p>
      <p>6、熱房榜依據K房多人娛樂分組模式下報名用戶收禮金幣魅力值總和排名，前10名K房房主和管理員可獲得豐厚獎勵</p>
      <p>7、若同時與兩個及以上已加入戰隊隊長同組則本人數據無效，每次僅限與1位已加入戰隊隊長同組</p>
      <h6 class="yellow"> 注意事項</h6>
      <p>1、私密K房不記錄活動數據</p>
      <p>2、每位用戶僅可使用一個賬號參與活動</p>
      <p>3、以任何違規行爲參與活動將被取消活動資格、活動獎勵，嚴重者封禁賬號</p>
    </div>
    <div class="pkTips" v-if="type==3">
      <p>1、更新軟體至最新版本即可在任意K房體驗多人娛樂模式分組PK功能，在K房上主持麥並選擇【娛樂房間—分組對抗】即可開啟功能</p>
      <img src="../../assets/img/ruleImg1.png" alt="" class="img1">
      <p>2、可選擇2人分組或4人分組模式，分組設定後立即生效，麥上玩家可點歌演唱並在頭像下方顯示演唱期間收禮魅力值，各組總計魅力值顯示在隊伍上方</p>
      <img src="../../assets/img/ruleImg2.png" alt="" class="img2">
      <p>3、分組模式開啟後點擊空坐席即可申請上座，主持人亦可以將包廂玩家抱上坐席。趕快前往包廂體驗吧</p>
      <img src="../../assets/img/ruleImg3.png" alt="" class="img3">
    </div>
    <p class="lastTips">活動最終解釋權歸主辦方所有</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: 1,
      wardList: [
        {
          img: require('../../assets/img/wards/ward1.png'),
          name: '明星戰隊徽章'
        },
        {
          img: require('../../assets/img/wards/ward2.png'),
          name: '現金分成'
        },
        {
          img: require('../../assets/img/wards/ward3.png'),
          name: '布加迪座駕'
        },
        {
          img: require('../../assets/img/wards/ward4.png'),
          name: '粉色摩天輪（1520金幣 / 個）'
        },
        {
          img: require('../../assets/img/wards/ward5.png'),
          name: '限量背包禮物'
        },
        {
          img: require('../../assets/img/wards/ward6.png'),
          name: '永久K房人數上限'
        },
        {
          img: require('../../assets/img/wards/ward7.png'),
          name: '海量金幣'
        },
        {
          img: require('../../assets/img/wards/ward8.png'),
          name: '海量金豆'
        }
      ]
    }
  },
  methods: {
    setTab(val) {
      this.type = val
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: rgba(5, 25, 67, 1);
}
.yellow {
  color: rgba(248, 211, 124, 1) !important;
}

.img1 {
  width: 5.58rem;
  height: 4.35rem;
  display: block;
  margin: 0 auto;
}
.img2 {
  width: 5.56rem;
  height: 5.8rem;
  display: block;
  margin: 0 auto;
}
.img3 {
  width: 5.56rem;
  height: 4.42rem;
  display: block;
  margin: 0 auto;
}
.pkTips {
  p {
    margin: 0.35rem 0 0.6rem;
  }
}
.rule {
  padding: 0.34rem 0.26rem;
  .tabs {
    width: 6.84rem;
    height: 1.06rem;
    background: url(../../assets/img/ruleTab1.png);
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    span {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      em {
        display: block;
      }
    }
    .tab1 {
      width: 1.46rem;
      height: 0.34rem;
      background: url(../../assets/img/ruleTitle1.png);
      background-size: 100% 100%;
      &.act {
        width: 1.65rem;
        height: 0.53rem;
        background: url(../../assets/img/ruleTitle2.png);
        background-size: 100% 100%;
      }
    }
    .tab2 {
      width: 1.46rem;
      height: 0.34rem;
      background: url(../../assets/img/ruleTitle3.png);
      background-size: 100% 100%;
      &.act {
        width: 1.66rem;
        height: 0.53rem;
        background: url(../../assets/img/ruleTitle4.png);
        background-size: 100% 100%;
      }
    }
    .tab3 {
      width: 1.96rem;
      height: 0.34rem;
      background: url(../../assets/img/ruleTitle5.png);
      background-size: 100% 100%;
      &.act {
        width: 2.11rem;
        height: 0.53rem;
        background: url(../../assets/img/ruleTitle6.png);
        background-size: 100% 100%;
      }
    }
    &.tab2Act {
      background: url(../../assets/img/ruleTab2.png);
      background-size: 100% 100%;
    }
    &.tab3Act {
      background: url(../../assets/img/ruleTab3.png);
      background-size: 100% 100%;
    }
  }
  .actTime {
    text-align: center;
    font-size: 0.24rem;
    color: rgba(248, 211, 124, 1);
    margin: 0.23rem 0 0.25rem;
  }
  h3 {
    text-align: center;
    color: rgba(248, 211, 124, 1);
    font-size: 0.32rem;
    margin: 0.55rem 0 0.19rem;
  }
  h6 {
    font-size: 0.28rem;
    color: rgba(106, 194, 255, 1);
    margin-bottom: 0.26rem;
  }
  p {
    font-size: 0.24rem;
    color: rgba(156, 188, 216, 1);
    margin-bottom: 0.26rem;
  }
  .wardsList {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    span {
      width: 1.42rem;
      .imgbox {
        height: 1.42rem;
        position: relative;
        .bg {
        }
        img {
          width: 1.42rem;
          height: 1.42rem;
          position: absolute;
        }
      }

      strong {
        display: block;
        color: rgba(156, 188, 216, 1);
        font-size: 0.24rem;
        text-align: center;
      }
    }
  }
  .lastTips {
    text-align: center;
    margin-top: 0.8rem;
    color: rgba(156, 188, 216, 0.6);
  }
}
@import "../../assets/scss/common.scss";
</style>
