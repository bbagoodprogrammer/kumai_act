<template>
  <div class="strategy">
    <i class="close" @click="closeStrate()"></i>
    <div class="title">種植攻略</div>
    <div class="tipsItem">
      <h5>1、種子圖鑒</h5>
      <p>（1）普通種子：</p>
      <p>每顆收成5朵星願花，生長時間10分鐘，通過園丁打卡任務獲得。</p>
      <p>（2）白色種子：</p>
      <p>每顆收成15朵星願花，成長時間10分鐘，每塊花圃可一次種植最多5顆種子，通過儲值金幣獲得。</p>
      <p>*儲值金幣儘計算當日額度，每日00:00重置</p>
    </div>
    <div class="tipsItem">
      <h5>2、種植說明</h5>
      <p>
        1）點擊花圃，選擇【普通種子】或【白色種子】種植<br />
        2）種植成功後，種子進入成長倒計時；種植多顆白色種子時，成長時長為10分鐘*種植數量<br />
        3）種子成長倒計時結束，則星願花成熟，點擊成熟星願花即可成功收穫。每積攢20朵星願花，即可抽取1次獎勵：<br />
        *活動結束後，種植、加速、摘取皆不可操作
      </p>
    </div>
    <div class="tipsItem">
      <h5>3、加速說明</h5>
      <p>
        （1）消耗一次花神祝福，即可減少目標花圃中星願花10分鐘生長時間；剩餘成長時間未滿10分鐘時，則目標花圃中星願花立刻成熟。<br />
        （2）花神祝福次數通過儲值金幣獲得
      </p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeStrate () {
      this.$parent.showStrategy = false
    }
  }
}
</script>

<style lang="scss">
.title {
  text-align: center;
  font-size: 0.42rem;
  color: #fff;
}
.strategy {
  width: 6.4rem;
  height: 9.1rem;
  padding: 1.07rem 0.46rem 0 0.2rem;
  background: url(../img/strategy.png);
  background-size: 100% 100%;
  margin-left: 0.4rem;
  font-size: 0.24rem;
  color: rgba(223, 254, 255, 1);
  position: relative;
  .tipsItem {
    padding: 0 0.2rem;
    margin-bottom: 0.3rem;
    h5,
    p {
      font-size: 0.24rem;
    }
  }
}
.close {
  display: block;
  width: 0.56rem;
  height: 0.56rem;
  background: url(../img/close.png);
  background-size: 100% 100%;
  position: absolute;
  bottom: -0.8rem;
  left: 2.86rem;
}
</style>