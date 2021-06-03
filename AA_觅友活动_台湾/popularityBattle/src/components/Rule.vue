<template>
  <div class="rule">
    <i class="close" @click="$parent.showRule = false"></i>
    <h5><i class="left"></i>規則&獎勵<i class="right"></i></h5>
    <div class="tab">
      <span :class="{act:type == 1}" @click="type = 1">規則</span>
      <span :class="{act:type == 2}" @click="type = 2">獎勵</span>
    </div>
    <div class="tm">活動時間：6月3日 18:00- 6月9日23:59:59</div>
    <div class="con">
      <div class="rule_tips" v-if="type == 1">
        <h6>一、參賽對象</h6>
        <p>活動前以及晉級賽期間成為官方主播、官方房主的玩家</p>
        <h6>二、晉級賽段</h6>
        <p>1、比賽時間：6月3日 18:00-6月7日23:59:59</p>
        <p>2、每位參賽官方主播/官方房主在晉級賽段中收到指定禮物可以登上晉級賽榜單，人氣榜單按照官方主播/官方房主的人氣值從高到低排序，若出現同分，則先達到的優先排序；晉級賽結束時的前十名可以進入決賽；1金幣=2人氣值</p>
        <h6>三、決賽</h6>
        <p>1、比賽時間：6月8日 00:00-6月9日23:59:59</p>
        <p>2、晉級賽的前十名可進入決賽爭奪人氣之星，官方主播/官方房主的人氣值重新累計（不包含晉級賽的人氣值），按照官方主播/官方房主的人氣值從高到低排序，若出現同分，則先達到的優先排序；1金幣=2人氣值</p>
        <h6>四、人氣加成</h6>
        <p>在6月3日-6月9日期間，每日20:00、21:00、22:00、23:00每小時人氣值第一名榮登人氣席位，並獲得對應小時人氣值10%加成。（席位中展示的人氣值不包含10%加成，加成人氣值直接增加到晉級賽/決賽）</p>
        <p>小時榜說明：20:00小時榜統計的是19:00:01-20:00:00時間內的官方主播、官方房主收到指定禮物的數據，21:00、22:00、23:00如此類推</p>
        <h6>五、推薦官</h6>
        <p>在晉級賽段，貢獻指定禮物的金幣價值最高的玩家會成為相應官方主播/官方房主的推薦官，若貢獻金幣的價值相同，先達到的優先排序；官方主播/官方房主不能成為自己的推薦官</p>
        <h6>六、指定禮物</h6>
        <div class="rule_gift">
          <div class="giftItem" v-for="(item,index) in rule_gift" :key="index">
            <span>{{item.price}} <i></i> </span>
            <img :src="item.img" alt="">
            <div class="name">{{item.name}}</div>
            <div class="addScoreStr">{{item.addScoreStr}}</div>
          </div>
        </div>
        <h6>注意</h6>
        <p>1、活動中，若發現玩家用不正當手段參與活動，小音有權在不事先通知的情況下按照情節嚴重對參與玩家、違規者取消上榜資格、封禁賬號、收回該玩家所有獎勵等處罰，包括但不限於：</p>
        <p>a）活動期間對參與活動的玩家進行惡意攻擊、造謠、影射</p>
        <p>b）不正常手段獲得金幣、活動的指定禮物，並進行惡意刷分</p>
        <p>c）官方主播/官方房主使用小號成為大號的推薦官，一經查出，小號不可獲得推薦官獎勵</p>
        <p>2、本活動與蘋果公司無關</p>
      </div>
      <div class="gift_tips" v-if="type == 2">
        <h6>決賽獎勵</h6>
        <div class="rule_gift gift">
          <div class="giftItem" v-for="(item,index) in luck_gift" :key="index">
            <img :src="item.img" alt="">
            <div class="name" v-html="item.name"></div>
            <div class="addScoreStr">{{item.addScoreStr}}</div>
          </div>
        </div>
        <div class="giftTipsItem">
          <h6 class="nomt">第一名官方主播/官方房主</h6>
          <p>星光璀璨-top1勛章（10天）+琴音裊裊-背包禮物*1</p>
          <h6>第一名的頭號粉絲獎勵</h6>
          <p>頭號粉絲頭像框（10天）+10%儲值返利券+琴音裊裊-背包禮物*1+守護者勛章（10天）</p>
        </div>
        <div class="giftTipsItem">
          <h6 class="nomt">第二名官方主播/官方房主</h6>
          <p>星光璀璨-top2勛章（7天）+貓貓星雲-背包禮物*1</p>
          <h6>第一名的頭號粉絲獎勵</h6>
          <p>頭號粉絲頭像框（7天）+10%儲值返利券+貓貓星雲-背包禮物*1+守護者勛章（7天）</p>
        </div>
        <div class="giftTipsItem">
          <h6 class="nomt">第三名官方主播/官方房主</h6>
          <p>星光璀璨-top3勛章（7天）+魅力四射-背包禮物-1</p>
          <h6>第一名的頭號粉絲獎勵</h6>
          <p>頭號粉絲頭像框（5天）+10%儲值返利券+魅力四射-背包禮物*1+守護者勛章（5天）</p>
        </div>
        <div class="rule_gift gift">
          <div class="giftItem" v-for="(item,index) in luck_gift2" :key="index">
            <img :src="item.img" alt="">
            <div class="name" v-html="item.name"></div>
            <div class="addScoreStr">{{item.addScoreStr}}</div>
          </div>
        </div>
        <div class="giftTipsItem">
          <h6 class="nomt">晉級賽獎勵</h6>
          <p>第一到三名官方主播/官方房主及對應推薦官：</p>
          <p>紫曇花-背包禮物*1+星空瓶-背包禮物*1+緋紅淡香-背包禮物*1+完美綻放-背包禮物*1</p>
          <p>第四到五名官方主播/官方房主及對應推薦官：</p>
          <p>紫曇花-背包禮物*1+星空瓶-背包禮物*1</p>
        </div>
        <div class="giftTipsItem">
          <h6 class="nomt">注意</h6>
          <p>1、活動中的禮物獎勵有效期均為7天，獎勵於活動結束後7個工作日內發放</p>
          <p class="fb">2、儲值返利券為活動結束後的3天內儲值任意金幣，按照其中最高一筆儲值進行金幣返利</p>
          <p>3、晉級賽和決賽中，人氣值低於8000的主播/官方房主不可獲得晉級賽/決賽獎勵；</p>
        </div>
      </div>
      <p class="lastTips">*活動最終解釋權歸活動主辦方所有</p>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      type: 1,
      rule_gift: [
        {
          img: require(`../img/ruleGift/gift1.png`),
          price: '50',
          name: 'pick you',
          addScoreStr: '+100人氣值'
        },
        {
          img: require(`../img/ruleGift/gift2.png`),
          price: '200',
          name: '彩虹燈',
          addScoreStr: '+400人氣值'
        },
        {
          img: require(`../img/ruleGift/gift3.png`),
          price: '2200',
          name: '發射愛心',
          addScoreStr: '+4400人氣值'
        }
      ],
      luck_gift: [
        {
          img: require(`../img/ruleGift/gift4.png`),
          name: '星光璀璨<br/>勛章',
        },
        {
          img: require(`../img/ruleGift/gift5.png`),
          name: '琴音裊裊',
        },
        {
          img: require(`../img/ruleGift/gift6.png`),
          name: '貓貓星雲',
        },
        {
          img: require(`../img/ruleGift/gift7.png`),
          name: '魅力四射',
        }
      ],
      luck_gift2: [
        {
          img: require(`../img/ruleGift/gift8.png`),
          name: '紫曇花<br/>背包禮物',
        },
        {
          img: require(`../img/ruleGift/gift9.png`),
          name: '星空瓶<br/>背包禮物',
        },
        {
          img: require(`../img/ruleGift/gift10.png`),
          name: '緋紅淡香<br/>背包禮物',
        },
        {
          img: require(`../img/ruleGift/gift11.png`),
          name: '完美盛放<br/>背包禮物',
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.nomt {
  margin-top: 0 !important;
}
.fb {
  font-weight: bold;
}
.lastTips {
  text-align: center;
  margin-top: 0.3rem;
}
.rule {
  width: 7.22rem;
  height: 10.36rem;
  background: url(../img/rule_bg.png);
  background-size: 100% 100%;
  position: relative;
  .close {
    display: block;
    width: 0.74rem;
    height: 0.74rem;
    background: url(../img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    top: -0.4rem;
  }
  h5 {
    height: 1.03rem;
    display: flex;
    align-items: center;
    justify-content: center;
    i {
      width: 2.26rem;
      height: 0.33rem;
      background: url(../img/rule_left.png);
      background-size: 100% 100%;
      &.right {
        background: url(../img/rule_right.png);
        background-size: 100% 100%;
        margin-left: 0.32rem;
      }
      &.left {
        margin-right: 0.32rem;
      }
    }
  }
  .tab {
    width: 6.92rem;
    height: 0.79rem;
    background: url(../img/rule_tab.png);
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    span {
      flex: 1;
      height: 0.82rem;
      text-align: center;
      line-height: 0.7rem;
      margin-top: 0.06rem;
      color: #BD6EF5;
      &.act {
        color: #fff;
        background: url(../img/rule_tab_act.png);
        background-size: 100% 100%;
      }
    }
  }
  .tm {
    text-align: center;
    color: #FFEA59;
    font-size: 0.28rem;
    margin-top: 0.26rem;
  }
  .con {
    height: 7.63rem;
    padding: 0 0.29rem;
    overflow-y: scroll;
    h6 {
      font-size: 0.28rem;
      color: #FC9DCE;
      margin-top: 0.27rem;
      font-weight: 600;
    }
    p {
      font-size: 0.26rem;
    }
  }
  .rule_gift {
    padding: 0 0.34rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.42rem;
    &.gift {
      padding: 0;
      margin: 0.22rem 0;
      .giftItem {
        width: 1.62rem;
        height: 1.94rem;
        img {
          width: 1.55rem;
          height: 1.25rem;
          margin: 0 auto;
        }
        .name {
          height: 0.65rem;
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    .giftItem {
      width: 1.82rem;
      height: 2.29rem;
      background: url(../img/ruleGift/gift_bg.png);
      background-size: 100% 100%;
      text-align: center;
      position: relative;
      span {
        width: 0.92rem;
        height: 0.37rem;
        background: url(../img/ruleGift/price_bg.png);
        background-size: 100% 100%;
        font-size: 0.26rem;
        color: #FFE741;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        i {
          width: 0.19rem;
          height: 0.19rem;
          background: url(../img/ruleGift/price.png);
          background-size: 100% 100%;
          margin-left: 0.06rem;
        }
      }
      img {
        width: 1.76rem;
        height: 1.34rem;
      }
      .name {
        font-size: 0.26rem;
        margin: 0.12rem auto;
      }
      .addScoreStr {
        font-size: 0.26rem;
        color: #E586BD;
      }
    }
  }
  .giftTipsItem {
    background: rgba(97, 10, 100, 0.54);
    border-radius: 0.1rem;
    padding: 0.12rem;
    margin-bottom: 0.11rem;
  }
}
</style>