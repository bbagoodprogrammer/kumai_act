
<template>
  <div class="rule">
    <i class="close" @click="$parent.showRule = false"></i>
    <div class="title">規則&獎勵</div>
    <div class="ruleCon">
      <p class="tm">活動時間：2021年1月12日-11月11日</p>
      <h5>1、活動玩法</h5>
      <p>玩家點亮星座達到2、4、6、8、10、12個分別可以獲得一次轉盤抽獎機會，最多可獲得6次轉盤抽獎機會。</p>
      <h5>2、活動獎勵</h5>
      <p>-每次點亮星座都可獲得對應的星座頭像框或者星座禮物（星座禮物有效期7天）</p>
      <p>-轉盤抽獎100%中獎，轉盤中的特效禮物有效期均為7天</p>
      <div class="giftList">
      </div>
      <h5>注意</h5>
      <p>1、活動中，若發現玩家用不正當手段參與活動，小音有權在不事先通知的情況下按照情節嚴重對違規者封禁賬號、收回該玩家所有獎勵等處罰，包括但不限於：</p>
      <p>a）活動期間對參與活動的玩家進行惡意攻擊、造謠、影射</p>
      <p>b）不正常手段獲得活動的指定禮物</p>
      <p>2、本活動與蘋果公司無關</p>
      <p class="lastTips">*活動最終解釋權歸活動主辦方所有</p>
    </div>
  </div>

</template>

<script>
export default {

}
</script>

<style lang="scss">
.rule {
  width: 7.07rem;
  height: 7.53rem;
  background: url(../img/history.png);
  background-size: 100% 100%;
  position: relative;
  .close {
    width: 0.69rem;
    height: 0.69rem;
    background: url(../img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: -0.15rem;
    top: -0.15rem;
  }
  .title {
    height: 0.8rem;
    text-align: center;
    line-height: 0.8rem;
    font-size: 0.32rem;
    color: #fff;
  }
  .ruleCon {
    color: #fff;
    padding: 0 0.34rem;
    max-height: 6.2rem;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    -webkit-overflow-scrolling: auto;
    margin-top: 0.2rem;
    .tm {
      font-size: 0.24rem;
      color: rgba(90, 224, 248, 1);
    }
    h5 {
      font-size: 0.28rem;
      margin-top: 0.25rem;
    }
    p {
      font-size: 0.26rem;
      color: rgba(246, 223, 254, 1);
    }
    .lastTips {
      font-size: 0.24rem;
      color: rgba(90, 224, 248, 1);
      text-align: center;
      margin-top: 0.6rem;
    }
  }
}
</style>