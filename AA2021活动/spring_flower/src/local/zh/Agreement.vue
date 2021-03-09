<template>
  <div class="rule">
    <div class="tabs">
      <a class="tab1" @click.prevent="mainTab=0" :class="{current:mainTab==0}" href="">活動獎勵</a>
      <a class="tab2" @click.prevent="mainTab=1" :class="{current:mainTab==1}" href=""> 活動規則</a>
    </div>
    <div class="actTime">
      活動時間：3月11日18:00-3月29日20:00
    </div>
    <div class="ruleList" v-if="mainTab == 0">
      <h5>活動獎勵</h5>
      <div class="giftArr">
        <div class="giftItem" v-for="(item,index) in giftArr" :key="index">
          <div class="imgBox">
            <img :src="item.img" alt="">
          </div>
          <strong>{{item.name}}</strong>
        </div>
      </div>
      <h5>活動成就獎勵</h5>
      <img src="./img/table.png" alt="" class="table">
      <h5>最佳園丁榜前10名獎勵</h5>
      <h6>第一名：</h6>
      <p>最佳園丁徽章（30天）+粉色薔薇座駕（30天）+春日花環背包禮物（88金幣）*10+5000金幣+8000金豆</p>
      <h6>第二名：</h6>
      <p>最佳園丁徽章（20天）+粉色薔薇座駕（30天）+春日花環背包禮物（88金幣）*8+3000金幣+5000金豆</p>
      <h6>第三名：</h6>
      <p>最佳園丁徽章（20天）+粉色薔薇座駕（20天）+春日花環背包禮物（88金幣）*6+1000金幣+3000金豆</p>
      <h6>第四-六名：：</h6>
      <p>最佳園丁徽章（15天）+粉色薔薇座駕（15天）+春日花環背包禮物（88金幣）*4+800金幣+2000金豆</p>
      <h6>第七-十名：</h6>
      <p>最佳園丁徽章（7天）+粉色薔薇座駕（10天）+春日花環背包禮物（88金幣）*2+500金幣+1000金豆</p>
      <h5 class="mt">獎勵使用規則</h5>
      <p>1、晉級禮物中的儲值金幣返利券，領取後24小時內有效，可疊加使用，返利金幣將即時到賬</p>
      <p>2、獎勵的背包禮物有效期均為30天，請在有效期內使用</p>
    </div>
    <div class="giftItme" v-else>
      <h5>活動規則</h5>
      <h6>活動報名</h6>
      <p>點擊“立即報名”即可參加活動，點擊“立即報名”後的數據才會被計入活動成績</p>
      <h6>活動榜單排名規則</h6>
      <p>1、按照活動期間，用戶累計成功收穫的星願花總數量進行排名（含已消費花朵數量），花圃內未收穫花朵不計入總數</p>
      <p>2、若獲得的星願花總數相同，則先到達該數量的排名在前面</p>
      <p>3、榜單展示前100名用戶的比賽成績，榜單獎勵於活動結束後7日內發放</p>
      <h5>種植攻略</h5>
      <h6>1、種子圖鑒</h6>
      <p>（1）普通種子：</p>
      <p>每顆收成5朵星願花，生長時間10分鐘，通過園丁打卡任務獲得。</p>
      <p>（2）白色種子：</p>
      <p>每顆收成15朵星願花，成長時間10分鐘，每塊花圃可一次種植最多5顆種子，通過儲值金幣獲得。</p>
      <p class="se">*儲值金幣儘計算當日額度，每日00:00重置</p>
      <h6>2、種植說明</h6>
      <p>1）點擊花圃，選擇【普通種子】或【白色種子】種植</p>
      <p>2）種植成功後，種子進入成長倒計時；種植多顆白色種子時，成長時長為10分鐘*種植數量</p>
      <p>3）種子成長倒計時結束，則星願花成熟，點擊成熟星願花即可成功收穫。每積攢20朵星願花，即可抽取1次獎勵：</p>
      <p class="se">*活動結束後，種植、加速、摘取皆不可操作</p>
      <h6>3、加速說明</h6>
      <p>（1）消耗一次花神祝福，即可減少目標花圃中星願花10分鐘生長時間；剩餘成長時間未滿10分鐘時，則目標花圃中星願花立刻成熟。</p>
      <p>（2）花神祝福次數通過儲值金幣獲得。</p>
      <h6>4、擴建花園</h6>
      <p>用戶可通過金幣付費擴建花圃。活動期間每人最多可擴建三塊花圃，擴建的花圃于活動期間有效。</p>
      <h5 class="mt">搖一搖抽獎</h5>
      <p>活動期間，可消耗20星願花/次搖動星願花瓶，獲取獎勵。獲得獎勵將自動發入賬戶，請注意及時查收。</p>
      <h5 class="mt">其他說明</h5>
      <p>比賽過程中，若發現用戶使用不正當手段參與活動，小歡有權在事先不通知的前提下按情節嚴重對參賽者、違規者做取消其參賽資格或封禁帳號等處罰，包括但不限於：</p>
      <p>1）活動作品非本人原唱或盜錄他人作品；</p>
      <p>2）盜用或借用他人已有帳號參與活動；</p>
      <p>3）同一用戶註冊多個帳號參與活動；</p>
      <p>4）比賽期間對參賽作品進行惡意評論，廣告等；</p>
      <p>5）通過其他違規行為參與活動。</p>
      <p>若為主動作弊者，無論是否為參賽者永久封禁該用戶所有大小號，活動結束后小歡任有權收回該用戶所有獎勵</p>
    </div>
    <p class="lastTips lastMt">本活動的最終解釋權歸活動主辦方所有</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      mainTab: 0,
      giftArr: [
        {
          name: '粉色薔薇座駕',
          img: require('../../img/ruleGift/gift_1.png')
        },
        {
          name: '最佳園丁徽章',
          img: require('../../img/ruleGift/gift_2.png')
        },
        {
          name: '小花壺背包禮物',
          img: require('../../img/ruleGift/gift_3.png')
        },
        {
          name: '春日花環背包禮物',
          img: require('../../img/ruleGift/gift_4.png')
        },
        {
          name: '超級火箭頭飾',
          img: require('../../img/ruleGift/gift_5.png')
        },
        {
          name: '會員VIP',
          img: require('../../img/ruleGift/gift_6.png')
        },
        {
          name: '海量金幣',
          img: require('../../img/ruleGift/gift_7.png')
        },
        {
          name: '豐富金豆',
          img: require('../../img/ruleGift/gift_8.png')
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.se {
  color: RGBA(179, 249, 255, 1);
}
.lastTips {
  text-align: center;
  color: rgba(196, 202, 255, 1);
}
.mt {
  margin-top: 0.3rem;
}
.lastMt {
  margin-top: 3rem;
}
.table {
  width: 7.14rem;
  height: 5.14rem;
  margin: 0 auto;
}
.giftArr {
  width: 6.5rem;
  height: 4.34rem;
  background: url(../../img/ruleGiftListBg.png);
  background-size: 100% 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  padding-top: 0.35rem;
  margin-bottom: 0.25rem;
  .giftItem {
    height: 1.6rem;
    width: 25%;
  }
  .imgBox {
    width: 1.3rem;
    height: 1.3rem;
    background: #5447BE;
    border-radius: 0.2rem;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  strong {
    display: block;
    text-align: center;
    color: rgba(196, 202, 255, 1);
    font-size: 0.22rem;
  }
}
h5 {
  font-size: 0.28rem;
  color: rgba(255, 219, 125, 1);
  text-align: center;
  margin-bottom: 0.25rem;
}
h6 {
  color: rgba(255, 219, 125, 1);
  font-size: 0.28rem;
  margin-top: 0.15rem;
}

.rule {
  background: rgba(121, 118, 237, 1);
  padding: 0.37rem 0.22rem;
}
p {
  margin-top: 0.15rem;
  color: rgba(240, 179, 255, 1);
  font-size: 0.22rem;
}
.tabs {
  width: 6.8rem;
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
    color: rgba(165, 147, 255, 1);
    transition: all 0.1s linear;
    &.current {
      color: rgba(255, 255, 255, 1);
      background: url(../../img/tabs_act.png);
      background-size: 100% 100%;
    }
  }
}
.actTime {
  font-size: 0.26rem;
  text-align: center;
  color: rgba(255, 219, 125, 1);
  margin: 0.34rem auto;
}
</style>
