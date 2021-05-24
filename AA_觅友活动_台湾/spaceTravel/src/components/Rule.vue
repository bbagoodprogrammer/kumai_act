<template>
  <div class="rule">
    <i class="close" @click="$parent.showRule = false"></i>
    <div class="tabs">
      <a class="tab1" @click.prevent="mainTab=0" :class="{current:mainTab==0}" href="">著陸記錄</a>
      <a class="tab2" @click.prevent="mainTab=1" :class="{current:mainTab==1}" href="">碎片記錄</a>
    </div>
    <div class="rule_con">
      <div class="ruleTips" v-if="!mainTab">
        <h5>1.開啟太空旅行</h5>
        <p>玩家收到禮物即可成為宇航員，開啟太空旅行，看遍宇宙星際美景。玩家每收到100金幣指定禮物，可獲得著陸星球的機會一次。宇航員在獲得著陸機會後，需要手動著陸到星球；未著陸的次數在活動結束後失效</p>
        <div class="giftList">
          <div class="giftItem" v-for="(item,index) in giftArr1" :key="index">
            <div class="imgBox">
              <img :src="item.img" alt="">
            </div>
            <strong v-html="item.name"></strong>
          </div>
        </div>
        <h5>2.佔領星球</h5>
        <p>著陸某星球次數最高的宇航員則可佔領星球。在活動時間，著陸次數實時更新，宇航員之間可爭奪星球；到活動結束之後，保持佔領狀態的玩家獲得相應的佔領星球獎勵。若著陸次數一樣，先達到的先佔領。著陸某星球次數最高的宇航員則可佔領星球。在活動時間，著陸次數實時更新，宇航員之間可爭奪星球；到活動結束之後，保持佔領狀態的玩家獲得相應的佔領星球獎勵。若著陸次數一樣，先達到的先佔領。</p>
        <h5>3.神秘星球</h5>
        <p>神秘星球稀有出現，全站的宇航員收到指定禮物每80金幣，神秘星球進度條+1%，當神秘星球進度條達到100%時，全站的神秘星球出現概率翻倍30分鐘，並且進度條重置。</p>
        <h5>4.空間站</h5>
        <p>宇航員著陸過所有的星球（包含神秘星球），則可回到空間站，並獲得空間站的獎勵。著陸到星球的次數最多的宇航員的頭像將出現在空間站中。</p>
        <h5>5.星際漫遊</h5>
        <p>玩家每送出100金幣指定禮物後，可獲得漫遊券，使用1張漫遊券可抽取一次UFO碎片，當集齊橫向碎片後，可獲得相應的獎勵；當集齊所有碎片後，會獲得UFO座駕（10天）。</p>
        <h5>6.其他</h5>
        <p>-活動中，若發現玩家用不正當手段參與活動，小音有權在不事先通知的情況下按情節嚴重對參與玩家、違規者取消上榜資格、封禁賬號、收回該玩家所有獎勵等處罰，包括但不限於：
          <br /> a）活動期間對參賽玩家惡意評論、造謠、影射等
        </p>
      </div>
      <div class="giftTips" v-else>
        <h5>1.佔領星球和進入臨檢站獎勵</h5>
        <div class="giftFirstTips" v-for="(item,index) in gift_tips" :key="index">
          <h6>{{item.title}}</h6>
          <div class="giftList ml">
            <div class="giftItem" v-for="(item2,index2) in item.gift" :key="index2">
              <div class="imgBox">
                <img :src="item2.img" alt="">
              </div>
              <strong v-html="item2.name"></strong>
            </div>
          </div>

        </div>
        <p>
          佔領星球的獎勵再活動結束後由系統自動發放；空間站獎勵在進入空間站時由系統自動發放，每位玩家僅可獲得一次空間站獎勵
        </p>
        <h5>2.星際漫遊獎勵</h5>
        <p>星際漫遊獎勵由自動發放，每位玩家可獲得每分獎勵一次，共可獲得四次星際漫遊獎勵</p>
        <h5>3.榜單獎勵</h5>
        <div class="giftList">
          <div class="giftItem" v-for="(item,index) in giftArr2" :key="index">
            <div class="imgBox">
              <img :src="item.img" alt="">
            </div>
            <strong v-html="item.name"></strong>
          </div>
        </div>
        <p>
          第一名：太空旅行房間背景(10天)+太空飛船-特效禮物<br />
          第二名：太空旅行房間背景(5天)+太空漫遊-特效禮物<br />
          第三名：太空球-特效禮物
        </p>
        <p class="mt">*活動中獲得的所有禮物有效期均為7天，獲得後儘快送出喔</p>
      </div>
      <p class="lastTips">*此活動最終解釋權歸主辦方所有</p>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      mainTab: 0,
      giftArr1: [
        {
          img: require(`../img/ruleGift/1.png`),
          name: '能量石<br/>50金幣'
        },
        {
          img: require(`../img/ruleGift/2.png`),
          name: '電力藥丸<br/>1000金幣'
        },
        {
          img: require(`../img/ruleGift/3.png`),
          name: '太空望遠鏡<br/>9000金幣'
        },
        {
          img: require(`../img/ruleGift/4.png`),
          name: '宇宙飛船<br/>12000金幣'
        }
      ],
      giftArr2: [
        {
          img: require(`../img/ruleGift/10.png`),
          name: '太空旅行<br/>房間背景'
        },
        {
          img: require(`../img/ruleGift/11.png`),
          name: '太空飛船<br/>特效禮物'
        },
        {
          img: require(`../img/ruleGift/12.png`),
          name: '太空漫遊<br/>特效禮物'
        },
        {
          img: require(`../img/ruleGift/13.png`),
          name: '太空球<br/>特效禮物'
        }
      ],
      gift_tips: [
        {
          title: '-佔領普通星球',
          gift: [{
            img: require(`../img/ruleGift/5.png`),
            name: '繁星碎夢<br/>頭像框7天'
          }, {
            img: require(`../img/ruleGift/6.png`),
            name: '藍色星球<br/>動態禮物*1'
          }]
        },
        {
          title: '-佔領神秘星球',
          gift: [{
            img: require(`../img/ruleGift/7.png`),
            name: '夢入星辰<br/>頭像框7天'
          }, {
            img: require(`../img/ruleGift/6.png`),
            name: '藍色星球<br/>動效禮物*1'
          }]
        },
        {
          title: '-來到空間站',
          gift: [{
            img: require(`../img/ruleGift/8.png`),
            name: '星途<br/>頭像框7天'
          }, {
            img: require(`../img/ruleGift/9.png`),
            name: '宇航員<br/>勳章15天'
          }]
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.close {
  width: 0.7rem;
  height: 0.7rem;
  background: url(../img/close.png);
  background-size: 100% 100%;
  position: absolute;
  bottom: -0.9rem;
  left: 3.2rem;
}
.rule {
  padding-top: 1.22rem;
  position: relative;
  .tabs {
    padding: 0 0.59rem;
    height: 0.88rem;
    border-radius: 0.44rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    a {
      width: 2.72rem;
      height: 0.79rem;
      line-height: 0.79rem;
      background: url(../img/tab_bg.png);
      background-size: 100% 100%;
      text-align: center;
      color: rgba(136, 214, 255, 1);
      font-size: 0.34rem;
      font-weight: bold;
      transition: all 0.1s ease;
      &.current {
        width: 2.82rem;
        height: 0.82rem;
        line-height: 0.82rem;
        color: #fff;
        background: url(../img/tab_act.png);
        background-size: 100% 100%;
      }
    }
  }
  .rule_con {
    height: 6rem;
    overflow-y: scroll;
    padding: 0 0.28rem;
    h5 {
      font-size: 0.28rem;
      color: rgba(196, 232, 255, 1);
      margin: 0.25rem 0 0.15rem;
    }
    p {
      color: rgba(114, 234, 255, 1);
      font-size: 0.26rem;
    }
  }
  .giftList {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.25rem;
    .imgBox {
      width: 1.6rem;
      height: 1.6rem;
      background: url(../img/luckGift_bg.png);
      background-size: 100% 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 1.34rem;
        height: 1.34rem;
      }
    }
    strong {
      width: 1.7rem;
      height: 0.7rem;
      display: block;
      text-align: center;
      font-size: 0.24rem;
      margin: 0.11rem auto;
    }
  }
  .giftTips {
    h6 {
      font-size: 0.26rem;
      color: rgba(114, 234, 255, 1);
    }
    .giftList {
      &.ml {
        justify-content: center;
        .giftItem {
          margin-left: 0.15rem;
        }
      }
    }
  }
  .mt {
    margin-top: 0.22rem;
  }
  .lastTips {
    text-align: center;
    font-size: 0.24rem;
    color: rgba(196, 232, 255, 1) !important;
    margin-top: 0.4rem;
  }
}
</style>