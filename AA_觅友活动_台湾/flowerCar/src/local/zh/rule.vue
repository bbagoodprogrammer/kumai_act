<template>
  <div class="ruleTips">
    <div class="tabs">
      <a class="tab1" @click.prevent="mainTab=0" :class="{current:mainTab==0}" href="">規則</a>
      <a class="tab2" @click.prevent="mainTab=1" :class="{current:mainTab==1}" href="">獎勵</a>
    </div>
    <div class="ruleItem" v-if="mainTab == 0">
      <p>1.活動時間：6月16日-6月24日</p>
      <p>2.遊行花車：每天花神榜和人氣榜的日榜榜首可坐上巡遊花車，並獲得日榜5%的花神值/人氣值加成，加成的分數僅加到總榜，不加到次日日榜</p>
      <p>3.花神榜榜單<br />無需報名，主播收到指定禮物可獲得花神值即可上榜，1金幣指定禮物=1花神值；榜單按照花神值從高到低排序，僅顯示前50名，當花神值一致時，先達到的優先排序。</p>
      <div class="giftList">
        <div class="giftItem" v-for="(item,index) in giftList1" :key="index">
          <div class="imgBox">
            <img :src="item.img" alt="">
          </div>
          <strong>{{item.name}}</strong>
        </div>
      </div>
      <p>4.人氣榜榜單<br />無需報名，主播完成指定的任務即可獲得人氣值，榜單按照人氣值從高到低排序，僅顯示前50名，當人氣值一致時，先達到的優先排序。</p>
      <p>5.人氣榜任務說明<br />房間進房人數：在主播自己的房間中，每進入一個非房主的玩家，人氣值+1，每日上限100 新增粉絲人數：主播每新增一個新粉絲（之前未曾關注過），人氣值+2，每日上限200 送禮人數：主播在任意房間每新增一個送禮給自己的玩家，人氣值+2，無上限<br />*任務每天到0點清零並更新</p>
      <p>
        6.注意事項<br />
        *活動中，若發現玩家用不正當手段參與活動，小音有權在不事先通知的情況下按情節嚴重對參與玩家、違規者取消上榜資格、封禁賬號、收回該玩家所有獎勵等處罰，包括但不限於：<br />
        a）不正當獲得金幣、活動指定禮物，並惡意刷分<br />
        b）活動期間對參與活動的玩家進行惡意攻擊、造謠<br />
        *活動中送出的所有禮物有效期均為7天 *本活動與蘋果公司無關
      </p>
    </div>
    <div class="giftTips" v-else>
      <div class="giftList gift2">
        <div class="giftItem" v-for="(item,index) in giftList2" :key="index">
          <div class="imgBox">
            <img :src="item.img" alt="">
          </div>
          <strong>{{item.name}}</strong>
        </div>
      </div>
      <p>
        1.花神總榜獎勵<br />
        第一名：6月花神-認證（15天）+XXX座駕（15天）+燦爛如夏花-背包禮物*1<br />
        第二名：XXX座駕（10天）+燦爛如夏花-背包禮物*1<br />
        第三名：XXX座駕（7天）+燦爛如夏花-背包禮物*1
      </p>
      <div class="giftList gift2">
        <div class="giftItem" v-for="(item,index) in giftList3" :key="index">
          <div class="imgBox">
            <img :src="item.img" alt="">
          </div>
          <strong>{{item.name}}</strong>
        </div>
      </div>
      <p>
        2.人氣總榜獎勵<br />
        第一名：潛力花神-認證（15天）+XXX-頭像框（15天）+燦爛如夏花-背包禮物*1<br />
        第二名：XXX-頭像框（10天）+燦爛如夏花-背包禮物*1<br />
        第三名：XXX-頭像框（7天）
      </p>
      <p>
        3.粉絲獎勵<br />
        花神總榜第一名的玩家的第一名粉絲：<br />
        禮物冠名權15天+頭號粉絲-頭像框（15天）+頭號粉絲-認證（15天）+燦爛如夏花-背包禮物*1<br />
        花神總榜第二名的玩家的第一名粉絲：<br />
        頭號粉絲-頭像框（10天）+頭號粉絲-認證（15天）+燦爛如夏花-背包禮物*1<br />
        花神總榜第三名的玩家的第一名粉絲：<br />
        頭號粉絲-頭像框（5天）+頭號粉絲-認證（5天）
      </p>
      <p>
        4.注意事項<br />
        *活動中，若發現玩家用不正當手段參與活動，小音有權在不事先通知的情況下按情節嚴重對參與玩家、違規者取消上榜資格、封禁賬號、收回該玩家所有獎勵等處罰，包括但不限於：<br />
        a）不正當獲得金幣、活動指定禮物，並惡意刷分<br />
        b）活動期間對參與活動的玩家進行惡意攻擊、造謠<br />
        *活動中送出的所有禮物有效期均為7天<br />
        *本活動與蘋果公司無關
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mainTab: 0,
      giftList1: [
        {
          img: '',
          name: 'xxxxxx'
        },
        {
          img: '',
          name: 'xxxxxx'
        },
        {
          img: '',
          name: 'xxxxxx'
        }
      ],
      giftList2: [
        {
          img: '',
          name: 'xxxxxx'
        },
        {
          img: '',
          name: 'xxxxxx'
        },
        {
          img: '',
          name: 'xxxxxx'
        },
        {
          img: '',
          name: 'xxxxxx'
        },
        {
          img: '',
          name: 'xxxxxx'
        }
      ],
      giftList3: [
        {
          img: '',
          name: 'xxxxxx'
        },
        {
          img: '',
          name: 'xxxxxx'
        },
        {
          img: '',
          name: 'xxxxxx'
        },
        {
          img: '',
          name: 'xxxxxx'
        },
        {
          img: '',
          name: 'xxxxxx'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.ruleTips {
  background: rgba(156, 85, 244, 1);
  padding: 0.4rem 0.29rem 0;
  .tabs {
    padding: 0 0.7rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > a {
      display: block;
      width: 2.58rem;
      height: 0.97rem;
      text-align: center;
      line-height: 0.97rem;
      font-weight: 500;
      position: relative;
      font-size: 0.4rem;
      background: url(../../img/dayTab.png);
      background-size: 100% 100%;
      &.current {
        background: url(../../img/dayTab_act.png);
        background-size: 100% 100%;
      }
    }
  }
  p {
    color: rgba(232, 222, 255, 1);
    font-size: 0.28rem;
    margin: 0.32rem auto;
  }
  .giftList {
    padding: 0 0.38rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .giftItem {
      margin-bottom: 0.25rem;
    }
    .imgBox {
      width: 1.91rem;
      height: 1.91rem;
      background: #661FAD;
      border-radius: 0.1rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    strong {
      display: block;
      text-align: center;
      font-size: 0.26rem;
      color: rgba(232, 222, 255, 1);
      margin-top: 0.1rem;
    }
    &.gift2 {
      margin-top: 0.3rem;
      flex-wrap: wrap;
      .giftItem:nth-child(1) {
        margin-left: 1rem;
      }
      .giftItem:nth-child(2) {
        margin-right: 1rem;
      }
    }
  }
}
</style>