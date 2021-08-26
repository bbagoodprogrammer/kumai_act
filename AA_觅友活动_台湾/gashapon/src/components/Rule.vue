<template>
  <div class="rule">
    <i class="close" @click="$parent.showRule = false"></i>
    <div class="title">規則</div>
    <div class="con">
      <h6>規則介紹</h6>
      <p>玩家單筆儲值每滿500金幣可以獲得扭扭券一張（如儲值1300金幣可獲得2張扭扭券，直接在扭扭券计数器可以看到當前扭扭券持有券數），每張扭扭券有一次扭蛋開啟機會。開啟扭蛋機可選擇開一次、開十次、開二十次三個按鈕。</p>
      <h6>獎勵及其概率</h6>
      <p>玩家開啟扭蛋，每次開啟必中獎勵，獎勵禮物有不同檔位的金豆禮物、魅力值禮物、金幣禮物、送禮返利券、稀有金幣禮物。<br />
        當抽獎進行到第200次，此前玩家未抽中稀有禮物1，則在第200次必定抽中一次稀有禮物；當抽獎進行到第1000次，此前玩家未抽中稀有禮物2，則在第500次必定抽中稀有禮物2一次，當抽獎進行到第1000次，此前玩家未抽中稀有禮物3，則在第1000次必定抽中稀有禮物3一次<br />
        每抽到一個稀有禮物，將解鎖下一個新的稀有禮物。每個玩家活動期間稀有禮物1、稀有禮物2、稀有禮物3獲得機會均只有一次。<br />
        下表是啟動扭蛋機后能抽中的獎勵禮物及其概率：
      </p>
      <div class="ruleTable"></div>
      <h6>注意事项：</h6>
      <p>
        1.扭扭券通過活動頁面發放，儲值滿條件后在進入活動頁時會有彈窗提示。<br />
        2.送禮1000返100返利券：玩家在當天滿足在房間內贈送其他玩家金幣禮物價值滿1000金幣后，系統在次日零點返利100金幣，獲得送禮返利券僅在當天內使用有效。<br />
        3.送禮500返50返利券：玩家在當天滿足在房間內贈送其他玩家金幣禮物價值滿500金幣后，系統在次日零點返利50金幣，獲得送禮返利券僅在當天內使用有效。<br />
        4.送禮150返30返利券：玩家在當天滿足在房間內贈送其他玩家金幣禮物價值滿150金幣后，系統在次日零點返利30金幣，獲得送禮返利券僅在當天內使用有效。<br />
        4.當當天抽到三種送禮返利券，送禮達到或超過1000金幣時，按最高送禮返利券進行返利，且當天內只能返利一次。<br />
        5.玩家每抽取到一個稀有禮物，將解鎖新的稀有禮物，每個稀有禮物最多能抽到一次，獎池內共有三個稀有禮物。<br />
        本活動解釋權歸音覓官方所有。
      </p>
    </div>

  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.rule {
  width: 5.75rem;
  height: 9.96rem;
  background: url(../img/rule.png);
  background-size: 100% 100%;
  padding: 0.5rem 0.45rem 0;
  position: relative;
  .title {
    text-align: center;
    text-shadow: #8048D5 1px 0 0, #8048D5 0 1px 0, #8048D5 -1px 0 0,
      #8048D5 0 -1px 0;
  }
  h6 {
    font-size: 0.24rem;
    color: #5220E2;
    margin-top: 0.25rem;
  }
  p {
    font-size: 0.24rem;
  }
  .con {
    max-height: 9rem;
    overflow-y: scroll;
  }
  .close {
    display: block;
    width: 0.62rem;
    height: 0.62rem;
    background: url(../img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0rem;
    top: -0.8rem;
  }
}
</style>