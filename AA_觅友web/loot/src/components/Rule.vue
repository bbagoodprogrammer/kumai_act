
<template>
  <div class="rule">
    <div class="title"><i @click="$parent.showRule = false"></i>玩法說明</div>
    <div class="con">
      <p class="firstTips">
        使用「幸運券」可參與奪寶，1個幸運券可奪寶1次，當獎品的幸運券數量達成時，則將從參與奪寶的用戶中隨機抽出1位獲得該獎勵。
      </p>
      <ul>
        <li v-for="(item,index) in strList" :key="index">
          <i>{{index+1}}</i>
          {{item}}
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      strList: [
        '奪寶獎品12小時內未達成幸運券數量要求的將取消本輪奪寶，幸運券將回退給對應用戶；',
        '奪寶獎品僅由參與奪寶用戶中的1人獲得，同一個獎品中參與奪寶的次數越多，獲得獎品的概率越高；',
        '每週一0點結算上週奪寶榜單，參與奪寶次數最多的前10名用戶獲得勳章獎勵；',
        '奪寶中獲得虛擬道具獎勵具有一定有效期，請及時使用；',
        '玩家獲得的道具僅限於平台消費使用，不得產生交易、收購等盈利活動，發現違規者將嚴厲懲罰；',
        '禁止實施任何影響活動公平性的行為，或利用平台BUG等不正當首發參與玩法，一旦發現，平台有權取消道具發放，追回道具；',
        '本活動與蘋果公司無關，最終解釋權歸音覓所有。'
      ]
    }
  }
}
</script>

<style lang="scss">
.rule {
  width: 7.5rem;
  height: 9.31rem;
  background: url(../img/pupBg.png);
  background-size: 100% 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  .title {
    height: 0.98rem;
    display: flex;
    align-items: center;
    font-size: 0.36rem;
    i {
      width: 0.48rem;
      height: 0.48rem;
      background: url(../img/black.png);
      background-size: 100% 100%;
      margin: 0 0.08rem 0 0.32rem;
    }
  }
  .con {
    padding: 0 0.3rem;
    flex: 1;
    overflow-y: scroll;
    .firstTips {
      margin-top: 0.23rem;
      font-size: 0.26rem;
      color: rgba(255, 255, 255, 0.9);
      line-height: 0.46rem;
    }
    ul {
      margin-top: 0.3rem;
    }
    li {
      font-size: 0.26rem;
      color: rgba(255, 255, 255, 0.9);
      line-height: 0.46rem;
      padding-left: 0.41rem;
      margin-bottom: 0.11rem;
      position: relative;
      i {
        display: block;
        width: 0.3rem;
        height: 0.3rem;
        text-align: center;
        line-height: 0.3rem;
        background: url(../img/numsBg.png);
        background-size: 100% 100%;
        position: absolute;
        left: 0;
        top: 0.11rem;
        font-size: 0.24rem;
      }
    }
  }
}
</style>