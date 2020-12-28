<template>
  <div class="rule">
    <div class="tabs">
      <span :class="{act:type == 1}" @click="type = 1">活動規則</span>
      <span :class="{act:type == 2}" @click="type = 2">活動獎勵</span>
    </div>
    <div class="ruleTips" v-if="type == 1">
      <p class='yel'>
        活動時間：1月5日-1月19日 <br />
        推薦有效日期：1月5日-1月15日<br />
        審核與獎勵結算日期：1月15日-1月19日<br />
        請與15日前進行STAR推薦
      </p>
      <p>各大家族成員們，當歡歌首席星探的機會來咯！現在推薦妳心目中的歡歌Star，即有機會領取超赞獎勵，而且和家族成員們一起努力，還能一起瓜分獎池大獎哦！</p>
      <h5>推薦方式</h5>
      <p>
        1.僅限加入家族的用戶推薦<br />
        2.點擊活動首页下方推薦按鈕進行推薦<br />
        3.點擊提交，提交成功視為已推薦<br />
        4.推薦結果將由官方審核後發消息通知
      </p>
      <h5>推薦方式</h5>
      <p>
        1.僅限加入家族的用戶推薦<br />
        2.點擊活動首页下方推薦按鈕進行推薦<br />
        3.點擊提交，提交成功視為已推薦<br />
        4.推薦結果將由官方審核後發消息通知
      </p>
      <h5>推薦標準</h5>
      <p class="blue">（推薦名額有限，請認真搜尋各項都優質的Star才推薦哦）</p>
      <p>
        1.唱功：音準準確，節奏感強，氣息穩，能熟練使用歌唱技巧咬字發音清晰，有自己的歌唱風格<br />
        2.顏值：顏值優質，上鏡自然，有鏡頭表現力<br />
        3.歡歌粉絲數不低於100 以上維度官方將綜合評分，評審通過後系統將根據規則派發星探獎勵，同時通過小助手消息推送通知到您！
      </p>
      <h5>注意事項</h5>
      <p>
        1.每位星探每次僅可提交一位Star，活動期間最多推薦十人 <br />
        2.推薦以提交的時間先後為準，先提交者，先推薦
      </p>
    </div>
    <div class="giftTips" v-else>
      <p class="yel">
        活動時間：1月5日-1月19日 <br />
        獎勵分為兩部分，個人推薦獎勵和家族獎池獎勵
      </p>
      <h5>個人推薦獎勵</h5>
      <img src="../../assets/img/ruleImg1.png" alt="" class="img1">
      <h5>
        家族推薦獎池獎勵
      </h5>
      <p>獎池初始值為3000金幣，每成功推薦一個人獎池增加10金幣。 所有成功推薦的參與者均可參與獎池瓜分，具體瓜分數額以活動細則核算后為準</p>
      <h5>家族排名瓜分獎池佔比</h5>
      <img src="../../assets/img/ruleImg2.png" alt="" class="img2">
      <h5>
        其他注意事項
      </h5>
      <p>
        1.個人獎勵與家族獎勵都將在5個工作日內，由系統進行自動派發請留意賬戶訊息<br />
        2.頭飾獎勵可以在“我”頁面中“個性商城”里查看</p>
    </div>
    <p class="lastTips">本活動最終解釋權歸平台所有</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: 1
    }
  },
}
</script>

<style lang="scss">
body {
  background-color: rgba(29, 22, 95, 1);
}
.rule {
  padding: 0.35rem 0.45rem;
  .tabs {
    width: 6.36rem;
    height: 1.01rem;
    background: url(../../assets/img/tab.png);
    background-size: 100% 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    span {
      flex: 1;
      height: 100%;
      line-height: 1.01rem;
      text-align: center;
      color: rgba(255, 255, 255, 0.5);
      font-size: 0.32rem;
      font-weight: 600;
      &.act {
        color: rgba(23, 26, 73, 1);
        background: url(../../assets/img/ruleTab.png);
        background-size: 100% 100%;
      }
    }
  }

  p {
    color: rgba(208, 184, 237, 1);
    font-size: 0.22rem;
  }
  .yel {
    color: rgba(254, 254, 184, 1);
    margin: 0.33rem 0;
  }
  .blue {
    color: rgba(184, 235, 237, 1);
  }
  h5 {
    margin-top: 0.8rem;
    color: rgba(254, 254, 184, 1);
    font-size: 0.34rem;
  }
  .img1 {
    width: 6.26rem;
    height: 3.35rem;
  }
  .img2 {
    width: 6.26rem;
    height: 5.42rem;
  }
  .giftTips {
    h5 {
      margin-top: 0.3rem;
    }
  }
  .lastTips {
    text-align: center;
    margin-top: 0.9rem;
    color: rgba(208, 184, 237, 0.5);
  }
}
@import "../../assets/scss/common.scss";
</style>
