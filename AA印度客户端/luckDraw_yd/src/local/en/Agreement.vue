<template>
  <div class="page pageRule" :style="{height:viewHeight+'px'}">
    <div class="title"><i class="back" @click="$router.go(-1)"></i> Instructions</div>
    <div class="tipsItem">
      <p><i>1</i>
        The initiator of the lucky draw pays a certain amount of coins to buy the corresponding prizes, and sets raffle eligible gifts. When the users in the room send out the corresponding gifts, they can get a lucky draw opportunity for each gift. The more lucky draw opportunities, the higher the chance of winning. The result of the lucky draw will be displayed immediately after the end of the countdown, and one of the participants will be selected as the winner and receive the corresponding prize of the lucky draw.
      </p>
      <p><i>2</i>
        Prizes can be set up as VIP members, gifts, cars and seat frames. Only one of them can be set up for each lucky draw.
      </p>
      <p><i>3</i>A raffle eligible gift is a specified gift, as shown in the selection list.
      </p>
      <p><i>4</i>
        Each drawing requires a countdown timer, which can be set for 2 minutes, 5 minutes, 10 minutes, 30 minutes, or 60 minutes, and the countdown begins when the drawing is issued. The room users shall send raffle eligible gift within the countdown to participate in the draw.
      </p>
      <p><i>5</i>
        The initiator can set who can participate in the draw, which can be all people in the room or users queuing to sing. When it is set for all, all users in the room can participate in the lucky draw. When it is set as users queuing to sing, users currently queuing can participate in the lucky draw, mostly used in multi-person mode entertainment rooms.
      </p>
      <p><i>6</i>
        If a draw is currently in progress, the next draw can only be initiated when the current draw is over.
      </p>
      <p><i>7</i>
        The initiated lucky draw is irrevocable and the coins paid are not refundable. If no one takes part in the lucky draw at the end of the countdown, the prize belongs to the initiator.
      </p>
    </div>
  </div>
</template>

<script>
// import { lang } from './config';

export default {
  computed: {
    // lang: () => lang,
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
      background: url(../../img/back2.png);
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
        background: url(../../img/pNum.png);
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