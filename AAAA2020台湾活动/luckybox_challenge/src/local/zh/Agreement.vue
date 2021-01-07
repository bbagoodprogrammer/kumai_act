<template>
  <div class="rule">
    <div class="taskTabs">
      <span class="p1Tab1" :class="{act:type==1}" @click="tabClick(1)">活動獎勵</span>
      <span class="p1Tab2" :class="{act:type==2}" @click="tabClick(2)">活動規則</span>
    </div>
    <div class="gifts" v-if="type == 1">
      <h5>活動時間</h5>
      <p>11月16日18:00:00-12月31日20:00:00</p>
      <h5>活動獎勵</h5>
      <div class="giftsItem">
        <!-- <div class="item" v-for="(item,index) in 28" :key="index">
          <div class="imgBg">
         
          </div>
          <strong v-html="giftName[index]"></strong>
        </div> -->
      </div>
      <h5>每日獎勵可能獲得的獎品</h5>
      <img src="./img/ruleImg2.png" alt="" class="ruleImg2">
      <p>
        福運禮盒的級別越高，獲得的獎勵越豐厚；
        第5次領取超級禮盒獎勵，必中摩羯座稀有頭飾
      </p>
      <h5>福運榜前10名獎勵</h5>
      <h6>第一名：</h6>
      <p>福運徽章（30天）+摩羯座頭飾（30天）+白玉仙舟座駕（30天）+會員VIP（30天）+1500金幣+1500金豆</p>
      <h6>第二名：</h6>
      <p>福運徽章（20天）+摩羯座頭飾（20天）+白玉仙舟座駕（20天）+會員VIP（30天）+1000金幣+1000金豆</p>
      <h6>第三名：</h6>
      <p>福運徽章（15天）+摩羯座頭飾（15天）+白玉仙舟座駕（15天）+會員VIP（30天）+800金幣+800金豆 </p>
      <h6>第四-五名：</h6>
      <p>福運徽章（15天）+白玉仙舟座駕（15天）+會員VIP（30天）+500金幣+500金豆</p>
      <h6>第六-十名：</h6>
      <p>白玉仙舟座駕（15天）+會員VIP（30天）+300金幣+300金豆</p>
      <h5>福運榜前10名獎勵</h5>
      <h6>第一名：</h6>
      <p>應援徽章（30天）+摩羯座頭飾（30天）+白玉仙舟座駕（30天）+會員VIP（30天）+1500金幣+1500金豆</p>
      <h6>第二名：</h6>
      <p>應援徽章（20天）+摩羯座頭飾（20天）+白玉仙舟座駕（20天）+會員VIP（30天）+1000金幣+1000金豆</p>
      <h6>第三名：</h6>
      <p>應援徽章（15天）+摩羯座頭飾（15天）+白玉仙舟座駕（15天）+會員VIP（30天）+800金幣+800金豆</p>
      <h6>第四-五名：</h6>
      <p>應援徽章（15天）+白玉仙舟座駕（15天）+會員VIP（30天）+500金幣+500金豆 </p>
      <h6>第六-十名：</h6>
      <p>白玉仙舟座駕（15天）+會員VIP（30天）+300金幣+300金豆</p>
    </div>
    <div class="ruleItem" v-else>
      <h5>活動時間</h5>
      <p>11月12日18:00:00-12月28日20:00:00</p>
      <h5>活動規則</h5>
      <h6 class="minTop">活動報名</h6>
      <p>1、點擊“立即報名”後，即報名成功，報名後的活動數據才會被計算</p>
      <h5>活動榜單排名規則</h5>
      <h6>福運榜：</h6>
      <p>1、按照報名參賽後，收到的3種作品福運禮盒總禮物魅力值排名<br /> 2、展示榜單前100名，如果分數相同，先到達的排名在前面</p>
      <h6>福運榜：</h6>
      <p>1、按照報名參賽後，送出的3種作品福運禮盒花費金幣數排名<br /> 2、展示榜單前100名，如果分數相同，先到達的排名在前面</p>
      <h5>日獎勵規則</h5>
      <p>
        1、每日收到作品福運禮盒、作品高級福運禮盒、作品超級福運禮盒，可領取對應獎勵 <br />
        2、福運禮盒的級別高，獲得的獎勵越豐厚；第5次領取超級福運禮盒獎勵，必中摩羯座稀有頭飾<br />
        3、每檔福運禮盒獎勵每天可領取1次，僅限當天有效
      </p>
    </div>
    <p class="lastTips">本活動的最終解釋權歸活動主辦方所有</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: 1,
    }
  },
  methods: {
    tabClick(val) {
      this.type = val
    }
  }
}
</script>

<style lang="scss">
body {
  .rule {
    background-color: RGBA(73, 28, 95, 1);
    padding: 0.37rem 0.18rem 0.6rem;
    .taskTabs {
      display: flex;
      justify-content: center;
      span {
        display: block;
        width: 3.55rem;
        height: 0.88rem;
        text-align: center;
        line-height: 0.84rem;
        color: rgba(255, 255, 255, 0.6);
      }
      .p1Tab1 {
        background: url(../../img/tab3.png);
        background-size: 100% 100%;
        &.act {
          color: rgba(255, 255, 255, 1);
          background: url(../../img/tab4.png);
          background-size: 100% 100%;
        }
      }

      .p1Tab2 {
        background: url(../../img/tab2.png);
        background-size: 100% 100%;
        &.act {
          color: rgba(255, 255, 255, 1);
          background: url(../../img/tab1.png);
          background-size: 100% 100%;
        }
      }
    }
    .gifts,
    .ruleItem {
      margin-top: 0.1rem;
      padding: 0 0.08rem;
      h5 {
        font-size: 0.32rem;
        color: rgba(254, 249, 120, 1);
        font-weight: bold;
        margin-top: 0.4rem;
      }
      h6 {
        font-size: 0.28rem;
        color: #ffa0a9;
        padding-left: 0.64rem;
        margin-top: 0.5rem;
      }
      p {
        font-size: 0.28rem;
        padding-left: 0.64rem;
      }
      .ps {
        font-size: 0.31rem;
        padding-left: 0;
      }
      img {
        margin: 0.18rem auto;
      }
      .img1 {
        width: 7.02rem;
        height: 14.18rem;
      }
      .img2 {
        width: 7.02rem;
        height: 7.02rem;
      }
      .img3 {
        width: 7.02rem;
        height: 18.36rem;
      }
    }
    .giftsItem {
      width: 7.02rem;
      height: 7.4rem;
      background: url(./img/ruleImg1.png);
      background-size: 100% 100%;
    }
    .ruleImg2 {
      width: 7.02rem;
      height: 2.8rem;
    }
    .minTop {
      margin-top: 0.29rem !important;
    }
    .ytime {
      color: rgba(252, 245, 193, 1);
    }
    .other {
      margin-bottom: 0.28rem;
    }
    .gifts {
      h6 {
        color: #fff;
      }
    }
  }
  .lastTips {
    text-align: center;
    margin: 1.25rem 0;
    font-size: 0.28rem;
  }
}
// @import "../../assets/scss/common.scss";
</style>
