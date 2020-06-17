<template>
  <div class="rule">
    <div class="tabs">
      <span :class="{act:showType == 'rules'}" @click="clickTab('rules')">活動規則</span>
      <span :class="{act:showType == 'wards'}" @click="clickTab('wards')">活動獎勵</span>
    </div>
    <p class="actTime">活動時間：2020年6月9日18:00:00-6月26日20:00:00</p>
    <div class="ward" v-show="showType == 'wards'">
      <div class="wardImg"></div>
      <h3>召喚獎勵</h3>
      <div class="giftBox">
        <div v-for="(item,index) in giftArr" :key="index">
          <div class="giftImg">
            <span class="giftBg"></span>
            <img :src="require(`../../assets/img/luckGift/${index+1}.png`)" alt="">
          </div>
          <strong>{{item.name}}</strong>
        </div>
      </div>
      <h3>日榜獎勵</h3>
      <p>日榜前100名用戶有機會瓜分金幣獎勵，</p>
      <p>瓜分金幣獎勵的數量依據當日積累的召喚值和用戶排名而定</p>
      <p>前十名，平均瓜分當日30%金幣數量</p>
      <p>第十一名到第三十名，平均瓜分當日40%金幣</p>
      <p>第三十一名到第一百名，抽取二十名，平均瓜分當日30%金幣</p>
      <h3>總榜獎勵</h3>
      <h6>第一名：</h6>
      <p>神燈召喚者徽章（30天）+ 鳳凰座駕（30天）+ 阿拉丁金幣背包禮物（666金幣）+3000金幣+5000金豆</p>
      <h6>第二名：</h6>
      <p>神燈召喚者徽章（15天）+ 鳳凰座駕（30天）+ 阿拉丁金幣背包禮物（666金幣）+2000金幣+3000金豆</p>
      <h6>第三名：</h6>
      <p>神燈召喚者徽章（7天）+ 鳳凰座駕（30天）+ 阿拉丁金幣背包禮物（666金幣）+1000金幣+2500金豆</p>
      <h6>第四-五名：</h6>
      <p>神燈召喚者徽章（7天）+ 鳳凰座駕（15天）+ 阿拉丁金幣背包禮物（666金幣）+800金幣+2000金豆</p>
      <h6>第六-十名：</h6>
      <p>鳳凰座駕（9天）+ 阿拉丁金幣背包禮物（666金幣）+500金幣+1000金豆</p>
      <h3>獎勵使用規則</h3>
      <div class="lastRule">
        <p>1、召喚禮物中的儲值金幣返利券，僅限領取當天23:59:59前有效，若是同一用戶同一天領取多張沒儲值額度限制儲值金幣返利券可疊加使用，返利金幣將會儲值后立刻返還到賬戶上</p>
        <p>2、獎勵的背包禮物有效期均為7天，請在有效期內使用。</p>
        <p>3、背包禮物安卓版本可在我-背包中查看，並且送禮時，可選擇背包禮物送出。IOS可前往APP STORE搜尋最新版本”高歌“，下載使用</p>
        <p>4.備註：如座駕不可使用，請更新至最新版本</p>
      </div>
    </div>
    <div class="rules" v-show="showType == 'rules'">
      <h3>活動報名</h3>
      <p class="singUpTips">點擊‘立即報名’，即可參加活動，</br>
        只有報名後的任務數據才會被記錄</p>
      <h3>任務說明</h3>
      <p><strong>每日任務：</strong>前一天發佈的任意1首公開作品未刪除的任務要求，當天12:00檢測前一天的公開作品，如果作品未刪除，則發放10召喚值</p>
      <p><strong>儲值任務：</strong>每儲值30金幣，即可兌換10召喚值，不滿30金幣無法兌換召喚值</p>
      <h3>召喚神燈攻略</h3>
      <p>召喚神燈僅可使用 <em>今日召喚值</em> ，累計召喚值僅用於排名
        </br> 使用召喚值數量不同，獲得獎勵也不同
      </p>
      <h3>金幣瓜分法則</h3>
      <p>1.每日可瓜分的金幣數量和當日所有參加用戶積累的召喚值有關，當日參加活動的用戶積累的召喚值越多，可瓜分的金幣獎勵越多</p>
      <span class="img1"></span>
      <p>2.日榜前100名用戶可瓜分金幣獎勵，瓜分金幣獎勵的數量依據排名而定，</p>
      <span class="img2"></span>
      <p>3.活動將於次日0h抽出中獎名單，獎勵自動派發到賬戶，注意查收~</p>
      <h3>召喚值排名規則</h3>
      <p>1.參賽后完成任務獲得的召喚值排名
        <span>日榜排名：當日召喚值排名</span>
        <span>總榜排名：累計召喚值排名</span>
      </p>
      <p>2.若獲得的召喚值相同，則先到達該召喚值的排名在前面</p>
      <p>3.榜單展示前100名用戶的比賽成績</p>
      <p>4.使用召喚值召喚神燈精靈，不影響排名</p>
      <h3>其他說明</h3>
      <p>比賽過程中，若發現用戶使用不正當手段參與活動，小歡有權在事先不通知的前提下按情節嚴重對參賽者、違規者做取消其參賽資格 取消其比賽成績或封禁帳號等處罰，包括但不限於</p>
      <p>1）盜用或借用他人已有帳號參與活動；</p>
      <p>2）同一用戶註冊多個帳號參與活動；</p>
      <p>3）通過其他違規行為參與活動。</p>
      <p class="other">若為主動作弊者，無論是否為參賽者永久封禁該用戶所有大小號，活動結束后小歡任有權收回該用戶所有獎勵</p>
    </div>
    <div class="tips">本活動的最終解釋權歸活動主辦方所有</div>
  </div>
</template>

<script>
import giftArr from "../../config/gift"
export default {
  data() {
    return {
      showType: 'rules',
      giftArr: giftArr
    }
  },
  created() {
    document.title = '規則獎勵'
  },
  methods: {
    clickTab(val) {
      this.showType = val
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #48008c;
}
.actTime {
  font-size: 0.24rem;
  color: #dac4ff;
  margin: 0.29rem 0 0.28rem;
  text-align: center;
}
.rule {
  padding: 0.28rem 0;
  .tabs {
    width: 6.71rem;
    height: 0.74rem;
    background: url(../../assets/img/tabsBg.png);
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    span {
      display: block;
      width: 3.75rem;
      height: 0.85rem;
      text-align: center;
      line-height: 0.85rem;
      &.act {
        background: url(../../assets/img/tuleTabaAct.png);
        background-size: 100% 100%;
      }
    }
  }
  .singUpTips {
    text-align: center;
  }
  h3 {
    width: 2.35rem;
    height: 0.39rem;
    line-height: 0.39rem;
    background: url(../../assets/img/ruleTitleBg.png);
    background-size: 100% 100%;
    text-align: center;
    color: #ffda8d;
    font-size: 0.26rem;
    font-weight: 700;
    margin: 0.32rem auto 0.27rem;
  }
  p {
    color: #dac4ff;
    font-size: 0.24rem;
    span {
      display: block;
      text-indent: 0.5rem;
    }
    strong {
      font-size: 0.24rem;
      color: #ffda8d;
    }
    em {
      color: #ffe191;
      font-size: 0.36rem;
    }
  }
  h6 {
    color: #dac4ff;
    padding: 0 0.27rem;
    margin-top: 0.3rem;
    font-size: 0.24rem;
  }
  .ward {
    p {
      padding: 0 0.27rem;
    }
  }
  .rules {
    padding: 0 0.22rem 0.7rem;
  }
  .tips {
    margin-top: 0.25rem;
    color: #bdbbff;
    font-size: 0.22rem;
    margin-top: 1.3rem;
    text-align: center;
  }
  .img1 {
    display: block;
    width: 3.14rem;
    height: 2.09rem;
    background: url(../../assets/img/ruleImg1.png);
    background-size: 100% 100%;
    margin: 0.14rem 0 0.28rem;
  }
  .img2 {
    display: block;
    width: 3.87rem;
    height: 1.39rem;
    background: url(../../assets/img/ruleImg2.png);
    background-size: 100% 100%;
    margin: 0.14rem 0 0.28rem;
  }
  .other {
    margin-top: 0.5rem;
  }
  .giftBox {
    width: 5.87rem;
    height: 7.05rem;
    background: url(../../assets/img/giftBox.png);
    background-size: 100% 100%;
    margin: 0 auto;
    padding: 0.47rem 0.69rem;
  }
  .lastRule {
    p {
      margin-bottom: 0.3rem;
    }
  }
  .clearfix:after {
    content: "";
    height: 0;
    line-height: 0;
    display: block;
    visibility: hidden;
    clear: both;
  }
}
.giftBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 0.05rem;
  padding: 0 1rem;
  .giftImg {
    width: 1.4rem;
    height: 1.4rem;
    position: relative;
    .giftBg {
      display: block;
      width: 100%;
      height: 100%;
      background: url(../../assets/img/gitBg.png);
      background-size: 100% 100%;
      position: absolute;
    }
    img {
      width: 100%;
      height: 100%;
      position: absolute;
    }
  }
  strong {
    display: block;
    height: 0.3rem;
    text-align: center;
    font-size: 0.22rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 0.28rem;
    margin-top: 0.05rem;
  }
}
@import "../../assets/scss/common.scss";
</style>
