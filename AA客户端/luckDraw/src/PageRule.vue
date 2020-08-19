<template>
  <div class="page pageRule" :style="{height:viewHeight+'px'}">
    <div class="title"><i class="back" @click="$router.go(-1)"></i> 玩法說明</div>
    <div class="tipsItem">
      <p><i>1</i>
        由抽獎發起者支付一定金幣購買相應的獎品，並設置抽獎
        資格禮物，當房間內的用戶贈送對應禮物即可參與抽獎，
        每一次贈送可獲得一次抽獎機會，抽獎機會越多，中獎機
        率越大。抽獎倒計時結束立即開獎，抽取其中一名參與者
        爲得獎者，獲得此次抽獎相應的獎品。
      </p>
      <p><i>2</i>
        獎品可設置爲VIP會員、禮物、座駕、坐席框，每次抽獎
        僅可設置一種。
      </p>
      <p><i>3</i>抽獎資格禮物爲指定某個禮物，具體以選擇列表所展示爲準。</p>
      <p><i>4</i>每次抽獎需設定倒計時，倒計時可選擇2分鐘、5分鐘、
        10分鐘、30分鐘、60分鐘，抽獎發出即開始倒計時，房
        間用戶需在倒計時間內送出抽獎資格禮物才可參與抽獎。
      </p>
      <p><i>5</i>可設置誰可參與抽獎，指定房間內的所有人或麥上用戶，
        當指定爲所有人，則房間內所有用戶可參與抽獎，當指定
        麥上用戶，則當前在麥上的用戶才可參與抽獎，多使用在
        娛樂房多人模式情況。
      </p>
      <p><i>6</i>
        每個房間最多可同時發起一次抽獎，若當前有抽獎正在進
        行，需等此次抽獎結束，才可發起下一次抽獎。
      </p>
      <p><i>7</i>
        已發起的抽獎不可撤回，且已支付的金幣不可退回，如果
        抽獎倒計時結束無人參與抽獎，則獎品歸發起人所有。
      </p>
    </div>
  </div>
</template>

<script>
import { lang } from './config';

export default {
  computed: {
    lang: () => lang,
    viewHeight: () => window.innerHeight,
  },
};
</script>

<style lang="scss">
.pageRule {
  width: 7.5rem;
  height: 9.88rem;
  background: linear-gradient(
    0deg,
    rgba(84, 173, 255, 1) 0%,
    rgba(122, 75, 255, 1) 100%
  );
  border-radius: 0.32rem 0.32rem 0 0;
  display: flex;
  flex-direction: column;
  .title {
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    font-size: 0.42rem;
    font-weight: 600;
    position: relative;
    .back {
      display: block;
      width: 0.17rem;
      height: 0.29rem;
      background: url(./img/back2.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.36rem;
      left: 0.3rem;
    }
  }
  .tipsItem {
    margin-top: 0.08rem;
    flex: 1;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    -webkit-overflow-scrolling: auto;
    padding: 0 0.28rem 0.3rem 0.73rem;
    p {
      position: relative;
      i {
        display: block;
        width: 0.34rem;
        height: 0.34rem;
        background: url(./img/pNum.png);
        background-size: 100% 100%;
        font-size: 0.24rem;
        text-align: center;
        line-height: 0.34rem;
        position: absolute;
        left: -0.43rem;
        top: 0;
      }
      font-size: 0.26rem;
      margin-top: 0.3rem;
    }
  }
}
</style>