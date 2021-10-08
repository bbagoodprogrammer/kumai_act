<template>
  <div class="rule">
    <div class="mainTabs">
      <a href="javascript:;" @click="mainTabClick(0)" :class="{current:mainTab==0}">參與規則</a>
      <a href="javascript:;" @click="mainTabClick(1)" :class="{current:mainTab==1}">活動獎勵</a>
    </div>

    <div class="rewards" v-if="mainTab==1">
      <div class="group">
        <div class="title">約會基金獎池</div>
        <p>約會基金獎池的初獎金為5000金幣，總熱戀值每增加500，獎池則增加1金幣；<br>活動結束時，熱戀值高的聯盟獲勝，聯盟內的CP獲得瓜分約會基金獎池的資格</p>
        <div class="formula"></div>
      </div>
      <div class="the_reward">
        <p>鹽系和甜系熱戀榜的榜單獎勵</p>
        <div class="list">
          <p>榜單冠軍</p>
          <div>
            <span class="icon1">
              <strong>
                <span>
                </span>
                <i>52000</i>
              </strong>
              <strong>天使之戀-戒指</strong>
            </span>
            <span class="icon2">
              <strong><i>15天</i></strong>
              <strong>浪漫飛艇-座駕</strong>
            </span>
            <span class="icon3">
              <strong><i>15天</i></strong>
              <strong>新郎新娘頭像框</strong>
            </span>
            <span class="icon4">
              <strong><i>15天</i></strong>
              <strong>定製CP稱號</strong>
            </span>
          </div>
          <p class="other">520婚禮房婚禮舉辦權*1次</p>
        </div>
        <div class="list">
          <p>榜單亞軍CP</p>
          <div>
            <span class="icon2">
              <strong><i>10天</i></strong>
              <strong>浪漫飛艇-座駕</strong>
            </span>
            <span class="icon3">
              <strong><i>10天</i></strong>
              <strong>新郎新娘頭像框</strong>
            </span>
            <span class="icon4">
              <strong><i>10天</i></strong>
              <strong>甜蜜CP稱號</strong>
            </span>
          </div>
        </div>
        <div class="list">
          <p>榜單季軍CP</p>
          <div>
            <span class="icon2">
              <strong><i>7天</i></strong>
              <strong>浪漫飛艇-座駕</strong>
            </span>
            <span class="icon3">
              <strong><i>10天</i></strong>
              <strong>新郎新娘頭像框</strong>
            </span>
            <span class="icon4">
              <strong><i>10天</i></strong>
              <strong>幸福CP稱號</strong>
            </span>
          </div>
        </div>
        <div class="list">
          <p>第4-6名</p>
          <div>
            <span class="icon6">
              <strong><i>7天</i></strong>
              <strong>新郎新娘頭像框</strong>
            </span>
          </div>
        </div>
      </div>
      <ul class="tip">
        <li>*熱戀值滿52000並達到榜單前三名，可獲得對應榜單獎勵</li>
        <li>*惜敗聯盟的第4-6名捕獲的榜單獎勵</li>
        <li>*所有獎勵以CP為單位</li>
      </ul>
    </div>
    <div class="rules" v-if="mainTab==0">
      <div class="group">
        <div class="title">1、活動時間</div>
        <p>9月01日 00:00-10月01日 00:00</p>
      </div>
      <div class="group">
        <div class="title">2、參與活動</div>
        <p>在APP內組成CP的玩家可參與活動<br>組成CP的流程：準備戒指&gt;&gt;向親密度達標的好友表白&gt;&gt;好友答應&gt;&gt;組成CP</p>
        <p>若解除CP關係則被視為主動退出活動，不可再重新參與或者獲得活動獎勵哦~</p>
      </div>
      <div class="group">
        <div class="title">3、聯盟規則</div>
        <p>CP們隨即加入鹽系聯盟/甜系聯盟；聯盟之間PK,以熱戀值多的聯盟為勝，聯盟內的CP獲得瓜分約會基金的資格</p>
      </div>
      <div class="group">
        <div class="title">4、熱戀值</div>
        <p>CP可通過舉辦房間活動，收集指定禮物、贈送戒指增加熱戀值；熱戀值=指定禮物金幣價值*10+戒指的甜蜜值、熱戀值每增加500，約會基金獎池就增加1金幣</p>
        <div class="rewards_box">
          <div>
            <p class="top"><span></span><i>100</i></p>
            <p class="name">甜蜜賀卡</p>
            <p class="val">+1000熱戀值</p>
          </div>
          <div>
            <p class="top"><span></span><i>1290</i></p>
            <p class="name">巧克力禮盒</p>
            <p class="val">+12900熱戀值</p>
          </div>
          <div>
            <p class="top"><span></span><i>1399</i></p>
            <p class="name">情書</p>
            <p class="val">+13990熱戀值</p>
          </div>
          <div>
            <p class="top"><span></span><i>2800</i></p>
            <p class="name">比心</p>
            <p class="val">+28000熱戀值</p>
          </div>
          <div>
            <p class="top"><span></span><i>6999</i></p>
            <p class="name">天鵝親親</p>
            <p class="val">+69990熱戀值</p>
          </div>
        </div>
      </div>
    </div>
    <p class="copy">本活動的最終解釋權歸活動主辦方所有</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tab: 1,
      mainTab: 0,
      // stime:getstime,
      // etime:getetime,
    }
  },
  methods: {
    mainTabClick (tab) {
      this.mainTab = tab
    },
  },
}
</script>


<style lang="scss">
body {
  background: #511c7e;
}
.time {
  font-size: 0.24rem;
  color: #f9d7cf;
  padding: 0.28rem 0 0.26rem;
}
.mainTabs,
.time {
  text-align: center;
}
.mainTabs {
  width: 6.35rem;
  height: 0.98rem;
  line-height: 0.98rem;
  margin: 1rem auto 0.6rem;
  background: url(../../img/bg_tabs.png?6fa479) no-repeat;
  background-size: 100% 100%;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  a {
    display: inline-block;
    width: 3.15rem;
    height: 0.86rem;
    line-height: 0.86rem;
    font-size: 0.32rem;
    color: #fff;
    font-weight: 700;
    &.current {
      width: 3.14rem;
      height: 0.86rem;
      background: url(../../img/bg_tabs_active.png?5bddfb) 50% no-repeat;
      background-size: 100% 100%;
      color: #8c4018;
    }
  }
}
.rewards .group,
.rules .group {
  padding: 0 0.44rem;
  margin-bottom: 0.24rem;
}
.rewards .group .title,
.rules .group .title {
  font-size: 0.26rem;
  color: #fff;
  padding-bottom: 0.1rem;
}
.rewards .group p,
.rules .group p {
  font-size: 0.26rem;
  color: #c385f8;
}
.rewards .group .formula,
.rules .group .formula {
  width: 6.6rem;
  height: 1.27rem;
  background: url('./img/formula.png') 50% no-repeat;
  background-size: 100% 100%;
  margin: 0.39rem 0 0.36rem;
}
.rewards .group .rewards_box,
.rules .group .rewards_box {
  width: 6rem;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin: 0.4rem auto 0;
}
.rewards .group .rewards_box > div,
.rules .group .rewards_box > div {
  width: 1.75rem;
  height: 2.25rem;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  margin-bottom: 0.16rem;
}
.rewards .group .rewards_box > div .top,
.rules .group .rewards_box > div .top {
  position: absolute;
  top: 0;
  left: 0;
  padding-left: 0.05rem;
}
.rewards .group .rewards_box > div .top i,
.rewards .group .rewards_box > div .top span,
.rules .group .rewards_box > div .top i,
.rules .group .rewards_box > div .top span {
  display: inline-block;
  vertical-align: middle;
}
.rewards .group .rewards_box > div .top span,
.rules .group .rewards_box > div .top span {
  width: 0.24rem;
  height: 0.24rem;
  background: url('../../img/coin20.png') 50% no-repeat;
  background-size: 100% 100%;
  margin-right: 0.07rem;
}
.rewards .group .rewards_box > div .top i,
.rules .group .rewards_box > div .top i {
  color: #fff;
  font-size: 0.24rem;
}
.rewards .group .rewards_box > div .name,
.rules .group .rewards_box > div .name {
  text-align: center;
  font-size: 0.24rem;
  color: #fff;
  padding-top: 1.6rem;
}
.rewards .group .rewards_box > div .val,
.rules .group .rewards_box > div .val {
  text-align: center;
  font-size: 0.2rem;
  color: #ffb523;
}
.rewards .group .rewards_box div:first-of-type,
.rules .group .rewards_box div:first-of-type {
  margin: 0 0.18rem 0.16rem 1rem;
  background-image: url(./img/rule1.png);
}
.rewards .group .rewards_box div:nth-of-type(2),
.rules .group .rewards_box div:nth-of-type(2) {
  margin: 0 1rem 0.16rem 0;
  background-image: url(./img/rule2.png);
}
.rewards .group .rewards_box div:nth-of-type(3),
.rules .group .rewards_box div:nth-of-type(3) {
  margin-right: 0.18rem;
  background-image: url(./img/rule3.png);
}
.rewards .group .rewards_box div:nth-of-type(4),
.rules .group .rewards_box div:nth-of-type(4) {
  margin-right: 0.18rem;
  background-image: url(./img/rule4.png);
}
.rewards .group .rewards_box div:nth-of-type(5),
.rules .group .rewards_box div:nth-of-type(5) {
  margin-right: 0.18rem;
  background-image: url(./img/rule5.png);
}
.rewards .the_reward,
.rules .the_reward {
  padding: 0 0.44rem;
}
.rewards .the_reward > p,
.rules .the_reward > p {
  color: #fff;
  font-size: 0.26rem;
  padding-bottom: 0.3rem;
}
.rewards .the_reward .list,
.rules .the_reward .list {
  margin-bottom: 0.3rem;
}
.rewards .the_reward .list > p,
.rules .the_reward .list > p {
  font-size: 0.26rem;
  color: #fff;
  text-align: center;
  padding-bottom: 0.2rem;
}
.rewards .the_reward .list .other,
.rules .the_reward .list .other {
  text-align: left;
  padding: 0.2rem 0 0 0.2rem;
}
.rewards .the_reward .list > div,
.rules .the_reward .list > div {
  text-align: center;
}
.rewards .the_reward .list > div span,
.rules .the_reward .list > div span {
  width: 1.51rem;
  height: 2.01rem;
  display: inline-block;
  vertical-align: middle;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.rewards .the_reward .list > div span strong,
.rules .the_reward .list > div span strong {
  display: block;
  text-align: center;
}
.rewards .the_reward .list > div span strong:first-of-type,
.rules .the_reward .list > div span strong:first-of-type {
  padding-top: 1.25rem;
}
.rewards .the_reward .list > div span strong:first-of-type i,
.rewards .the_reward .list > div span strong:first-of-type span,
.rules .the_reward .list > div span strong:first-of-type i,
.rules .the_reward .list > div span strong:first-of-type span {
  display: inline-block;
  vertical-align: middle;
}
.rewards .the_reward .list > div span strong:first-of-type span,
.rules .the_reward .list > div span strong:first-of-type span {
  width: 0.24rem;
  height: 0.24rem;
  background: url('../../img/coin20.png') 50% no-repeat;
  background-size: 100% 100%;
  margin-right: 0.07rem;
}
.rewards .the_reward .list > div span strong:first-of-type i,
.rules .the_reward .list > div span strong:first-of-type i {
  color: #fbc42f;
  font-size: 0.2rem;
}
.rewards .the_reward .list > div span strong:nth-of-type(2),
.rules .the_reward .list > div span strong:nth-of-type(2) {
  font-size: 0.2rem;
  color: #ffff;
}
.rewards .the_reward .list > div span.icon1,
.rules .the_reward .list > div span.icon1 {
  background-image: url(./img/icon1.png?5788b0);
}
.rewards .the_reward .list > div span.icon2,
.rules .the_reward .list > div span.icon2 {
  background-image: url(./img/icon2.png?b29593);
}
.rewards .the_reward .list > div span.icon3,
.rules .the_reward .list > div span.icon3 {
  background-image: url(./img/icon3.png?ea7af0);
}
.rewards .the_reward .list > div span.icon4,
.rules .the_reward .list > div span.icon4 {
  background-image: url(./img/icon4.png?920396);
}
.rewards .the_reward .list > div span.icon5,
.rules .the_reward .list > div span.icon5 {
  background-image: url(./img/icon5.png?ef07af);
}
.rewards .the_reward .list > div span.icon6,
.rules .the_reward .list > div span.icon6 {
  background-image: url(./img/icon3.png?ea7af0);
}
.rewards .tip,
.rules .tip {
  margin-top: 0.5rem;
  padding: 0 0.44rem;
}
.rewards .tip li,
.rules .tip li {
  font-size: 0.26rem;
  color: #c385f8;
}
.copy {
  font-size: 0.24rem;
  color: #c385f8;
  text-align: center;
  padding: 0.3rem 0 0.2rem;
}
</style>