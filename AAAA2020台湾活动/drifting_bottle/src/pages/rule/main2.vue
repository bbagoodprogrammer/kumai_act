<template>
  <div class="rule">
    <div class="tabs">
      <span :class="{act:showType==1}" @click="tabClick(1)">活動規則</span>
      <span :class="{act:showType==2}" @click="tabClick(2)">活動獎勵</span>
    </div>
    <div class="ruleTips" v-if="showType==1">
      <h5>活動過程：</h5>
      <div class="time">
        <p>2020年7月6日18:00-7月17日20:00</p>
        <p>2020年7月6日 18:00-7月17日 18:00 開啟投瓶時間</p>
        <p>2020年7月7日 00:00-7月17日 20:00 開啟撈瓶時間</p>
      </div>
      <h5>投瓶規則：</h5>
      <p>1.選擇你或者你喜歡的作品后可進行投瓶推廣，1次購買智能推廣1首作品，每日首次普通投放免費<br />PS：每日投瓶歌曲必須為最近72小時發佈歌曲，且沒有參加其他活動</p>
      <p>2.免費投放：系統將智能分配收聽歌曲的人數、時長，匹配最可能對此作品感興趣的聽眾進行投放，優質作品將得到更多的投放次數~<br /> PS：每首作品只能有1次免費投放的機會，請珍惜~</p>
      <p>3.定制投放：您可以自定義投瓶的數量定制投放的高級瓶子可獲得更長時間的收聽，優質作品將得到更多的投放次數~</p>
      <p>4.作品投出后的效果可在投放記錄中查看，可以看到收聽人數和關注人數</p>
      <p>5.投放期間，歌曲刪除或私密，將導致他人無法撈取</p>
      <h5>撈瓶規則:</h5>
      <p>1.每天每個用戶可免費撈取6次</p>
      <p>2.每輪將隨機撈取1-6個瓶子，包括碎片瓶子、高級瓶子和普通瓶子；碎片瓶子內無歌曲，抽到后將直接被扔回大海；抽中到歌曲的瓶子后認真聽歌，可獲得驚喜禮物</p>
      <p>3.每一份歌聲都值得用心對待，如發現任何作弊及惡意點評行為，小歡有權取消您在活動中的獎勵，并取消比賽成績</p>
      <h5>其他說明: </h5>
      <p>比賽過程中，若發現用戶使用不正當的手段參與活動，小歡有權在事先不通知的前提下按情節嚴重對參賽者、違規者做取消其參賽資格或封禁賬號等處罰，包括但不限於：</p>
      <div class="other">
        <p>1.盜用或借用他人已有賬號參與活動；</p>
        <p>2.同一用戶註冊多個賬號參與活動；</p>
        <p>3.通過其他違規行為參與活動</p>
        <p>4.比賽期間，用戶的參賽作品的歌曲內容、序文和評論涉及誹謗、謾罵、攻擊、侮辱、影射他人</p>
        <p>5.比賽期間對參賽作品進行惡意評論和廣告</p>
        <p>6.若有人舉報投瓶歌曲未演唱并屬實，則刪除這首歌參賽資格，情節嚴重者取消該投放用戶其活動中的投瓶資格</p>
        <p>7.若投瓶歌曲為蓋檔歌曲，一旦被檢查出，則取消該用戶的投瓶資格</p>
      </div>
      <p>若為主動作弊者，無論是否為參賽者，永久封禁改用戶的大小號，活動結束后，小歡有權收回該用戶所有獎勵</p>
    </div>
    <div class="wardsTips" v-else>
      <h5>投瓶獎勵</h5>
      <p>本首作品收聽人數 、收聽時長、增加的關注人數綜合進行排名</p>
      <p>活動結束后，將公佈歌曲榜單~</p>
      <h5>歌曲排名TOP10用戶</h5>
      <div class="giftBox">
        <span v-for="(item,index) in tenGift" :key="index">
          <img :src="require(`../../assets/img/gift/${item.img}.png`)" alt="">
          <strong>{{item.name}}</strong>
        </span>
      </div>
      <h5>歌曲排名TOP11-100用戶</h5>
      <div class="giftBox2">
        <span v-for="(item,index) in otherGift" :key="index">
          <img :src="require(`../../assets/img/gift/${item.img}.png`)" alt="">
          <strong>{{item.name}}</strong>
        </span>
      </div>
      <p>獎勵說明：</p>
      <p>同一用戶有多首歌曲上榜，選取成績最高的1首歌發放獎勵</p>
      <h5>撈瓶獎勵</h5>
      <p>撈到普通瓶子，認真聽歌20S，將会得到2金豆；撈到高級瓶子，認真聽歌30S，将会得到5金豆，而且撈瓶過程中隨機金幣禮物掉落哦~</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showType: 1,
      tenGift: [
        {
          img: 0,
          name: '100金幣'
        },
        {
          img: 1,
          name: '夢幻漂流瓶'
        },
        {
          img: 2,
          name: '優質漂流者徽章'
        },
        {
          img: 3,
          name: '1個月VIP'
        },
      ],
      otherGift: [
        {
          img: 4,
          name: '500金豆'
        },
        {
          img: 2,
          name: '優質漂流者徽章'
        },
        {
          img: 3,
          name: '1個月VIP'
        },
      ]
    }
  },
  created() {
    document.title = '規則獎勵'
  },
  methods: {
    tabClick(val) {
      this.showType = val
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: rgba(16, 128, 208, 1);
}
.rule {
  padding: 0.25rem 0.26rem;
  .tabs {
    width: 6.88rem;
    height: 0.98rem;
    display: flex;
    align-items: center;
    padding: 0 0.05rem;
    background: url(../../assets/img/ruleTabs.png);
    background-size: 100% 100%;
    span {
      width: 3.66rem;
      height: 0.9rem;
      text-align: center;
      line-height: 0.9rem;
      color: rgba(255, 220, 42, 1);
      font-weight: 700;
      font-size: 0.32rem;
      &.act {
        color: rgba(174, 72, 0, 1);
        background: url(../../assets/img/ruleAct.png);
        background-size: 100% 100%;
      }
    }
  }
  .ruleTips {
    padding-left: 0.3rem;
    h5 {
      font-weight: 800;
      color: rgba(255, 211, 168, 1);
      margin: 0.4rem 0 0.25rem;
    }
    .time,
    .other {
      p {
        margin: 0;
      }
    }
    .other {
      margin-bottom: 0.3rem;
    }
    p {
      padding-left: 0.33rem;
      font-size: 0.24rem;
      color: rgba(181, 218, 255, 1);
      font-weight: 600;
      margin-bottom: 0.25rem;
    }
  }
  .wardsTips {
    padding-bottom: 1.5rem;
    h5 {
      text-align: center;
      font-weight: 800;
      color: rgba(255, 211, 168, 1);
      margin: 0.28rem 0 0.24rem 0;
    }
    p {
      color: rgba(181, 218, 255, 1);
      font-size: 0.24rem;
      font-weight: 600;
    }
    .giftBox,
    .giftBox2 {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0 1.6rem;
      span {
        margin-bottom: 0.26rem;
      }
      img {
        width: 1.6rem;
        height: 1.6rem;
        display: block;
      }
      strong {
        display: block;
        color: rgba(218, 209, 255, 1);
        font-size: 0.24rem;
        font-weight: 600;
        margin-top: 0.15rem;
        text-align: center;
      }
    }
    .giftBox2 {
      padding: 0 0.55rem;
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
