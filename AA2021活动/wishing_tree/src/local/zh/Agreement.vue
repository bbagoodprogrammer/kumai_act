<template>
  <div class="rule">
    <div class="tabs">
      <a class="tab1" @click.prevent="mainTab=0" :class="{current:mainTab==0}" href="">活動規則</a>
      <a class="tab2" @click.prevent="mainTab=1" :class="{current:mainTab==1}" href="">活動獎勵</a>
    </div>
    <div class="actTime">
      活動時間：2月7日12:00-2月18日24:00
    </div>
    <div class="rule" v-if="mainTab == 0">
      <h5>許願樹許願</h5>
      <p>1、用戶報名后才可參與活動，才會開始累計許願值</p>
      <p>2、在作品/K房送出金幣禮物或者完成任務均可獲得許願值，任務會在每日0點更新，當日未領取許願值24點清零</p>
      <p>3、個人許願值達到一定值可獲得相應獎勵：</p>
      <img src="./img/table.png" alt="" class="table">
      <p>4、活動期間全服許願值達到一定值，許願樹便會顯靈隨機向參與用戶派發獎勵</p>
      <h5>許願榜單</h5>
      <p>1、許願日榜：根據活動期間每日用戶貢獻的許願值進行排名，每日許願值超過888積分的用戶將可獲得</p>
      <p>2、許願總榜：根據活動期間用戶貢獻的許願值進行排名，活動結束時排行前十的用戶獲得豐厚獎勵</p>
      <h5>備註：</h5>
      <p>1、活動期間如有任何刷分行為，將取消參賽資格和獎勵，嚴重者封號處理</p>
      <p>2、每個設備僅可使用一個賬號參與活動</p>
      <p>3、活動中許願總榜獎勵會在活動結束后7日內發放，其餘獎勵均有系統自動發放；</p>
      <p>4、所有私密作品/K房數據不會被計算；</p>
    </div>
    <div class="gift" v-else>
      <h5>許願樹派發獎勵（展示部分稀有獎勵）</h5>
      <div class="giftList">
        <div class="giftItem" v-for="(item,index) in giftArr1" :key="index">
          <div class="imgBox">
            <img :src="item.img" alt="">
          </div>
          <strong>{{item.name}}</strong>
        </div>
      </div>
      <h5>許願總榜獎勵</h5>
      <div class="giftList">
        <div class="giftItem" v-for="(item,index) in giftArr2" :key="index">
          <div class="imgBox">
            <img :src="item.img" alt="">
          </div>
          <strong>{{item.name}}</strong>
        </div>
      </div>
      <p>
        第1名<br />
        單筆10%儲值返利券+新年許願徽章30天+新年許願頭飾30天+K房禮物夜之戀曲*1（2880金幣/個）+年獸座駕30天+3000金幣+8000金豆
      </p>
      <p>
        第2名<br />
        單筆8%儲值返利券+新年許願徽章30天+新年許願頭飾30天+K房禮物夜之戀曲*1（2880金幣/個）+年獸座駕30天+2000金幣+5000金豆
      </p>
      <p>
        第3名<br />
        單筆5%儲值返利券+新年許願徽章30天+新年許願頭飾30天+K房禮物夜之戀曲*1（2880金幣/個）+年獸座駕30天+1000金幣+3000金豆
      </p>
      <p>
        第4-10名<br />
        單筆3%儲值返利券+新年許願徽章30天+新年許願頭飾30天+作品禮物浪漫摩天輪*1（388金幣/個）+年獸座駕30天+500金幣+1000金豆
      </p>
      <h5>備註：</h5>
      <p>1、所有背包禮物有效期為7天</p>
      <p>2、頭飾獎勵可以在“我”頁面中“個性商城”里查看</p>
      <p>3、活動中所有獎勵均需要手動點擊領取，實現許願的獎勵以K歌小助手信息為準</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mainTab: 0,
      giftArr1: [
        {
          img: require("../../img/gift_icon/gift1.png"),
          name: '巨星登場（168金幣/個）'
        },
        {
          img: require("../../img/gift_icon/gift2.png"),
          name: '玫瑰花束（168金幣/個）'
        },
        {
          img: require("../../img/gift_icon/gift3.png"),
          name: '儲值返利券'
        },
        {
          img: require("../../img/gift_icon/gift4.png"),
          name: '海量金幣'
        }
      ],
      giftArr2: [
        {
          img: require("../../img/gift_icon/gift5.png"),
          name: '新年許願徽章'
        },
        {
          img: require("../../img/gift_icon/gift6.png"),
          name: '新年許願頭飾'
        },
        {
          img: require("../../img/gift_icon/gift7.png"),
          name: '夜之戀曲（2880金幣 / 個）'
        },
        {
          img: require("../../img/gift_icon/gift8.png"),
          name: '年獸座駕'
        }
      ],

    }
  }
}
</script>
<style lang="scss" scoped>
.rule {
  padding: 0.37rem 0.22rem;
}
h5 {
  color: rgba(255, 245, 139, 1);
}
p {
  font-size: 0.22rem;
  color: rgba(255, 255, 255, 1);
  padding-left: 0.27rem;
  margin: 0.1rem 0;
}
.tabs {
  width: 7.18rem;
  height: 0.88rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background: url(../../img/tabs.png);
  background-size: 100% 100%;
  a {
    display: block;
    width: 3.56rem;
    height: 100%;
    text-align: center;
    line-height: 0.9rem;
    font-size: 0.32rem;
    color: rgba(255, 245, 219, 1);
    transition: all 0.1s linear;
    &.current {
      color: rgba(145, 77, 68, 1);
      background: url(../../img/tab_act.png);
      background-size: 100% 100%;
    }
  }
}
.actTime {
  font-size: 0.26rem;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  margin: 0.34rem auto;
}
.table {
  width: 5.64rem;
  height: 3.67rem;
  margin: 0.32rem 0 0.22rem;
}
.giftList {
  padding: 0 0.36rem;
  display: flex;
  justify-content: space-between;
  margin-top: 0.2rem;
  .giftItem {
    flex: 1;
  }
  .imgBox {
    width: 1.2rem;
    height: 1.2rem;
    background: #f46b6f;
    border: 0.02rem solid #ffeda4;
    border-radius: 0.14rem;
    margin: 0 auto;
    img {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
  strong {
    display: block;
    // margin-left: -0.15rem;
    color: rgba(255, 255, 255, 1);
    font-size: 0.22rem;
    text-align: center;
  }
}
</style>
