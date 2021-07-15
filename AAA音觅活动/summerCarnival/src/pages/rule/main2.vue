<template>
  <div class="rule">
    <div class="actTime">2020/10/15 18:00-11/01 21:00</div>
    <div class="tabs">
      <span :class="{act:type == 1}" @click="tabClick(1)">活動規則</span>
      <span :class="{act:type == 2}" @click="tabClick(2)">活動獎勵</span>
    </div>
    <div class="ruleTips" v-if="type == 1">
      <h6>積攢狂歡值贏萬聖節限定</h6>
      <p>1、報名活動後，收集他人贈送萬聖節糖果和驚喜南瓜桶內的任意禮物，可獲得狂歡值<br />
        2、狂歡值=糖果狂歡值+派對狂歡值<br />
        糖果狂歡值=收到糖果數*100<br />
        派對狂歡值=用戶在房間收到指定禮物的價值*12<br />
        3、指定禮物為：驚喜南瓜桶內任意禮物
      </p>
      <h6>排行榜規則</h6>
      <p>1、按照玩家所獲得的狂歡值從高到低進行排名；</p>
      <p>2、日榜和總榜都展示前100名用戶的狂歡值<p>
          <h6>注意事項</h6>
          <p>1、活動中，若發現玩家用不正當手段參與活動，小音有權在不事先通知的情況下按情節嚴重對參與玩家、違規者取消上榜資格、封禁賬號、收回該玩家所有獎勵等處罰，包括但不限於：<br />
            a）同一玩家註冊多賬號參與活動<br />
            b）活動期間對參與活動的玩家進行惡意攻擊、造謠<br />
            2、小號的定義：同一設備登錄的第二個賬號會被活動判斷為小號
          </p>
    </div>
    <div class="giftTips" v-else>
      <h6>1、日榜獎勵</h6>
      <div class="backGift">
        <img src="../../assets/img/ruleImg/gift1.png" alt="">
        <strong>魔法城堡背包禮物（990金幣）</strong>
      </div>
      <p>日榜前20名，隨機抽出2名獲得魔法城堡背包禮物（990金幣）*1個，將在每天24點抽出中獎者，並直接發放背包禮物到對應背包；活動最後一天的開獎時間和活動結束時間一致</p>
      <h6>2、總榜獎勵</h6>
      <h5>第1-3名</h5>
      <div class="gfitBox1 gfitBox">
        <span v-for="(item,index) in giftArr1" :key="index">
          <img :src="item.img" alt="">
          <strong>{{item.name}}</strong>
        </span>
      </div>
      <h5>第4-6名</h5>
      <div class="gfitBox2 gfitBox">
        <span v-for="(item,index) in giftArr2" :key="index">
          <img :src="item.img" alt="">
          <strong>{{item.name}}</strong>
        </span>
      </div>
      <p>
        第1名：【風雲人物】勛章30天+萬聖狂歡夜特效禮物1個+5000金豆<br />
        第2名：【風雲人物】勛章15天+萬聖狂歡夜特效禮物1個+3000金豆<br />
        第3名：【風雲人物】勛章10天+萬聖狂歡夜特效禮物1個+1000金豆<br />
        第4-6名：南瓜燈背包禮物10個+500金豆<br />
        *玩家通過收萬聖節的指定金幣禮物積攢鑽石，鑽石可兌換為金幣
      </p>
      <h6>3、貢獻榜獎勵</h6>
      <div class="gfitBox1 gfitBox">
        <span v-for="(item,index) in giftArr3" :key="index">
          <img :src="item.img" alt="">
          <strong>{{item.name}}</strong>
        </span>
      </div>
      <p>狂歡排行榜總榜前三名的用戶的粉絲貢獻榜中的前三名可獲得貢獻榜獎勵</p>
      <p>儲值返利券（10%）使用說明：在11月1日儲值任意金幣，獲獎者在次日可獲得10%的金幣返利</p>
      <h6>4、送糖獎勵</h6>
      <p>非小號玩家每送出25顆糖果，可獲得小惡魔頭像框3天</p>
      <h6>5、進階獎勵</h6>
      <img src="../../assets/img/ruleImg/table.png" alt="" class="table">
    </div>
    <p class="lastTips">*活動最終解釋權歸活動主辦方所有</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: 1,
      giftArr1: [
        {
          img: require('../../assets/img/ruleImg/gift2.png'),
          name: '風雲人物徽章'
        },
        {
          img: require('../../assets/img/ruleImg/gift3.png'),
          name: '萬聖狂歡夜特效禮物1個'
        },
        {
          img: require('../../assets/img/ruleImg/bean1.png'),
          name: '金豆'
        }
      ],
      giftArr2: [
        {
          img: require('../../assets/img/ruleImg/gift4.png'),
          name: '南瓜燈背包禮物x10  '
        },
        {
          img: require('../../assets/img/ruleImg/bean2.png'),
          name: '500金豆'
        }
      ],
      giftArr3: [
        {
          img: require('../../assets/img/ruleImg/gift6.png'),
          name: '守護者勋章15天'
        },
        {
          img: require('../../assets/img/ruleImg/gift5.png'),
          name: '南瓜車座駕15天'
        },
        {
          img: require('../../assets/img/ruleImg/ticket.png'),
          name: '儲值返利券（10%）'
        }
      ]
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
  background-color: rgba(131, 56, 208, 1);
}

.rule {
  padding: 0.53rem 0.4rem;
  .actTime {
    text-align: center;
    color: rgba(255, 230, 181, 1);
    font-size: 0.26rem;
  }
  .tabs {
    width: 6.7rem;
    height: 0.9rem;
    line-height: 0.9rem;
    background: url(../../assets/img/tabs.png);
    background-size: 100% 100%;
    margin-top: 0.31rem;
    display: flex;
    span {
      flex: 1;
      text-align: center;
      &.act {
        background: url(../../assets/img/actTab2.png);
        background-size: 100% 100%;
      }
    }
  }
  .ruleTips {
    margin-top: 0.15rem;
  }
  .backGift {
    margin-bottom: 0.39rem;
    strong {
      display: block;
      text-align: center;
      font-size: 0.22rem;
      color: rgba(230, 163, 255, 1);
    }
  }
  .gfitBox {
    margin: 0.2rem auto;
    display: flex;
    justify-content: space-between;
    span {
      width: 1.5rem;
    }
    strong {
      display: block;
      text-align: center;
      font-size: 0.21rem;
      color: rgba(230, 163, 255, 1);
    }
  }
  .gfitBox1 {
    width: 4.97rem;
  }
  .gfitBox2 {
    width: 3.5rem;
  }
  img {
    display: block;
    margin: 0 auto;
    width: 1.45rem;
    height: 1.45rem;
  }
  h6 {
    font-size: 0.26rem;
    color: rgba(48, 255, 238, 1);
    margin-top: 0.3rem;
    font-weight: 500;
  }
  h5 {
    text-align: center;
    font-size: 0.28rem;
    color: rgba(255, 218, 124, 1);
    margin-top: 0.32rem;
  }
  p {
    font-size: 0.22rem;
    color: rgba(230, 163, 255, 1);
    font-weight: 500;
  }
  .lastTips {
    text-align: center;
    font-size: 0.22rem;
    color: rgba(230, 163, 255, 1);
    margin-top: 0.6rem;
  }
  .table {
    width: 4rem;
    height: 1.92rem;
    margin-top: 0.24rem;
  }
}
@import "../../assets/scss/common.scss";
</style>
