<template>
  <div class="rule">
    <span @click="showQuery = true">解除心動關係</span>
    <div class="mask" v-show="showQuery">
      <transition name="slide">
        <div class="queryPup" v-if="showQuery">
          <div class="title">是否解除心動關係</div>
          <div class="tips" v-html="tipsArr[1]">
          </div>
          <div class="btns" v-if="type == 1">
            <span class="st1" @click="showQuery = false">我再想想</span>
            <span class="st2">確定解除</span>
          </div>
          <div class="btns" v-else-if="type == 2">
            <span class="st1" @click="showQuery = false">不同意</span>
            <span class="st2">同意</span>
          </div>
          <div class="btns" v-else-if="type == 3">
            <span class="st1" @click="showQuery = false">我知道了</span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showQuery: false,
      type: 2,
      tipsArr: {
        1: '你們一共花了13天，累積123445真愛值真的要解除關系嗎？<br/>解除後，累積的真愛值都會被清零喔',
        2: '玩家【一碗蛋糊糊】請求解除心動關係，解除<br/>後，相關的真愛值會被清零',
        3: '若玩家再活動的心動對象和app的cp不是同一<br/>名玩家，系統將強制解除活動中的心動關係'
      }
    }
  }
}
</script>

<style lang="scss">
.queryPup {
  width: 6.77rem;
  height: 4.34rem;
  padding-top: 0.28rem;
  background: url(../img/friend_set.png);
  background-size: 100% 100%;
  .title {
    height: 1.1rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.34rem;
    color: rgba(188, 37, 104, 1);
  }
  .tips {
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0.6rem;
    font-size: 0.26rem;
    color: rgba(176, 97, 101, 1);
  }
  .btns {
    padding: 0 0.97rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      width: 2.19rem;
      height: 0.74rem;
      text-align: center;
      line-height: 0.74rem;
      &.st1 {
        background: url(../img/st1.png);
        background-size: 100% 100%;
      }
      &.st2 {
        background: url(../img/st12.png);
        background-size: 100% 100%;
      }
    }
  }
}
</style>