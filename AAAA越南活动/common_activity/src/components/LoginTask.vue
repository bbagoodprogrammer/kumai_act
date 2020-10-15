<template>
  <div class="loginTask" :class="{loaded:top_mission.status ==2}">
    <h3>{{lang.loginTitle}}</h3>
    <div class="loginGift">
      <span class="loginGiftItem" v-for="(item,index) in top_mission.prizes" :key="index">
        <img :src="item.prize_icon" alt="">
        <strong>{{item.prize_name}}</strong>
      </span>
    </div>
    <div class="noSuc" v-if="top_mission.status ==0">{{lang.noSuc}}</div>
    <div class="loginBtn" v-if="top_mission.status ==1" @click="getLoaginGift(top_mission.status,top_mission.mission_id,true)">{{lang.receive}}</div>
    <div class="stamp"></div>
  </div>
</template>

<script>
export default {
  props: ['top_mission'],
  methods: {
    getLoaginGift(status, mission_id, isLogin, index) {
      this.$parent.getRevGift(status, mission_id, isLogin, index)
    }
  }
}
</script>

<style lang="scss">
.loginTask {
  width: 5.72rem;
  height: 3.01rem;
  background: url(../assets/img/loginBg.png);
  background-size: 100% 100%;
  position: relative;
  -webkit-backface-visibility: hidden;
  &.loaded .stamp:after {
    opacity: 0.75;
    transform: rotate(0deg) scale(1);
    z-index: 10;
  }
  .stamp {
    width: 5.72rem;
    height: 3.01rem;
    z-index: 10;
    position: absolute;
    left: 0;
    top: 0;
    &:after {
      content: ""; //Draft
      opacity: 0;
      position: absolute;
      width: 1.81rem;
      height: 1.22rem;
      background: url(../assets/img/ed.png);
      background-size: 100% 100%;
      margin: 0 auto;
      bottom: -0.1rem;
      right: -0.2rem;
      text-transform: uppercase;
      opacity: 0;
      transform-origin: 50% 50%;
      transform: rotate(-15deg) scale(5);
      transition: all 0.3s cubic-bezier(0.6, 0.04, 0.98, 0.335);
    }
  }
  h3 {
    font-weight: 600;
    text-align: center;
    line-height: 0.7rem;
    height: 0.6rem;
  }
  .loginGift {
    height: 1.55rem;
    padding: 0 0.61rem;
    // margin-top: 0.15rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .loginGiftItem {
      width: 1rem;
      height: 1rem;
      background: url(../assets/img/giftBg.png);
      background-size: 100% 100%;
      margin-top: -0.3rem;
      img {
        display: block;
        width: 0.9rem;
        height: 0.9rem;
        margin: 0.05rem auto;
      }
      strong {
        display: block;
        text-align: center;
        width: 1.6rem;
        height: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: -0.3rem;
        font-weight: 500;
        color: #fffddb;
        font-size: 0.24rem;
        line-height: 0.25rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }
  }
  .loginBtn,
  .noSuc {
    width: 1.84rem;
    height: 0.66rem;
    background: url(../assets/img/rev.png);
    background-size: 100% 100%;
    text-align: center;
    line-height: 0.6rem;
    margin: 0.1rem auto 0;
    font-weight: 800;
    position: relative;
    z-index: 20;
  }
  .noSuc {
    background: url(../assets/img/receiveBg.png);
    background-size: 100% 100%;
  }
}
</style>