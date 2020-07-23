<template>
  <div class="rule">
    <div class="tabs">
      <a @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" href="">活動獎勵</a>
      <a @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" href="">活動規則</a>
    </div>
    <p class="actTime">活動時間:7月27日18:00:00-8月5日23:00:00</p>
    <div class="wards" v-if="mainTab == 0">
      <h5>活動獎勵</h5>
      <img src="../../assets/img/wardsImg.png" alt="" class="wardImg">
      <h5>萌寵總榜獎勵</h5>
      <h6>第一名：</h6>
      <p>榮譽莊主徽章（30天）+獅子座駕（30天）+10萬貴族富豪值+萌寵禮物套裝*1（1092金幣/套）+3000金幣+10000金豆</p>
      <h6>第二名：</h6>
      <p>榮譽莊主徽章（30天）+獅子座駕（30天）+8萬貴族富豪值+萌寵禮物套裝*1（1092金幣/套）+2500金幣+8000金豆</p>
      <h6>第三名：</h6>
      <p>榮譽莊主徽章（30天）+獅子座駕（30天）+5萬貴族富豪值+萌寵禮物套裝*1（1092金幣/套）+2000金幣+5000金豆</p>
      <h6>第四-五名：</h6>
      <p>榮譽莊主徽章（30天）+獅子座駕（30天）+萌寵禮物套裝*1（1092金幣/套）+1000金幣+5000金豆</p>
      <h6>第六-十名：</h6>
      <p>榮譽莊主徽章（30天）+萌寵禮物套裝*1（1092金幣/套）+500金幣+2000金豆</p>
      <h5>專屬萌寵榜獎勵</h5>
      <img src="../../assets/img/wardsTab.png" alt="" class="tab">
      <h5>獎勵規則</h5>
      <p>1、從本活動獲得的背包禮物有效期均為7天，萌寵徽章有效期均為30天，請在有效期內使用</p>
      <p>2、座駕和背包禮物請更新至軟體最新版本使用</p>
      <p>3、榜單獎勵于活動結束后7個工作日內發放</p>
    </div>
    <div class="ruleTips" v-else>
      <!-- <h5>萌寵總榜獎勵</h5> -->
      <h6 class="order">活動規則</h6>
      <p>1、點擊報名即可成為萌寵莊園莊主，報名后的數據方可計入活動</p>
      <p>2、在K房、作品收到指定萌寵禮物即成功收集該寵物，萌寵禮物包含K房禮物小黃雞（10金幣/個）、小獅子（168金幣/個）、小粉象（368金幣/個）、作品禮物小黃鴨（10金幣/個）、小老虎（168金幣/個）、小河馬（368金幣/個）</p>
      <p>3、成功領養6種萌寵可成為榮譽莊主並獲得榮譽證書，越早完成榮譽排名越靠前</p>
      <p>4、萌寵魅力榜依據收到所有萌寵禮物魅力值總和排名，每完整集齊一次萌寵（6個）額外增加1000魅力值</p>
      <p>5、專屬萌寵榜依據收到榜單對應萌寵禮物數排名，前十名獲得豐厚獎勵</p>
      <h6 class="order">備註</h6>
      <p>每位用戶僅可使用一個賬號參與活動，惡意刷分或違規參與活動將取消參賽資格和獎勵</p>
    </div>
    <p class="lastTips" :class="{mt:mainTab==1}">本活動的最終解釋權歸活動主辦方所有</p>
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
  background-color: rgba(32, 88, 123, 1);
}
.rule {
  padding: 0.26rem 0.34rem;
  .tabs {
    width: 6.41rem;
    height: 0.9rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(../../assets/img/tabs.png);
    background-size: 100% 100%;
    margin: 0 auto;
    a {
      display: block;
      width: 3.24rem;
      height: 100%;
      text-align: center;
      line-height: 0.9rem;
      color: rgba(200, 249, 205, 1);
      font-size: 0.28rem;
      font-weight: 600;
      &.current {
        color: rgba(32, 88, 123, 1);
        background: url(../../assets/img/actTab.png);
        background-size: 100% 100%;
      }
    }
  }
  .actTime {
    text-align: center;
    color: #7bdc9c;
    font-weight: 0.26rem;
    font-weight: 500;
    margin-top: 0.41rem;
  }
  h5 {
    margin: 0.41rem 0 0.22rem;
    text-align: center;
    font-size: 0.36rem;
    color: rgba(174, 255, 201, 1);
    font-weight: 600;
  }
  h6 {
    color: rgba(123, 220, 156, 1);
    font-weight: 600;
    margin-top: 0.3rem;
  }
  p {
    color: rgba(123, 220, 156, 1);
    font-size: 0.24rem;
  }
  .wardImg {
    display: block;
    width: 6.83rem;
    height: 4.34rem;
    margin: 0 auto;
  }
  .tab {
    display: block;
    width: 6.74rem;
    height: 7.02rem;
    margin: 0 auto;
  }
  .lastTips {
    margin-top: 0.89rem;
    text-align: center;
    font-size: 0.26rem;
    color: rgba(238, 255, 215, 1);
    &.mt {
      margin-top: 3rem;
    }
  }
  .order {
    color: rgba(123, 220, 156, 1);
    margin: 0.58rem 0 0.36rem;
  }
}
@import "../../assets/scss/common.scss";
</style>
