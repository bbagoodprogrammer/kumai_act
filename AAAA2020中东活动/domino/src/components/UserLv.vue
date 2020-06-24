<template>
  <div class="userLv">
    <div class="tips"></div>
    <div class="lvBox">
      <div class="lvItem" v-for="(item,index) in 15" :key="index" :class="{act:max_level>= item}">
        <span class="userAv" v-if="item == myLv">
          <img v-lazy="av" alt="">
        </span>
        <span class="zhu" :style="{height:(0.5+0.1*index)+'rem'}">
          <i class="qi" v-if="max_level>= item"></i>
        </span>
        <strong>{{item}}</strong>
      </div>
    </div>
    <p class="userLvTips">عندما انتهى النشاط، كل المستخدمين الذين صعدوا أعلى السلمين الاثنين الاوائل يمكن لهم حصول على حقيبة كنوز اللعبة، الهدايا فيما يلي في انتظارك~</p>
    <div class="giftBox">
      <img :src="require(`../assets/img/gift/${item}.png`)" v-for="(item,index) in 6" :key="index" alt="">
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
export default {
  computed: {
    ...mapState(['max_level', 'myLv', 'av'])
  }
}
</script>
<style lang="scss">
.userLv {
  width: 7.11rem;
  height: 4.9rem;
  background: url(../assets/img/userLvBg.png);
  background-size: 100% 100%;
  margin: 0.43rem auto 0;
  position: relative;
  .tips {
    display: block;
    width: 2.1rem;
    height: 0.53rem;
    background: url(../assets/img/lvTips.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    top: 0.35rem;
  }
  .lvBox {
    padding: 0.55rem 0.27rem 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .lvItem {
      margin-right: 0.03rem;
      position: relative;
      .zhu {
        width: 0.4rem;
        background: linear-gradient(
          0deg,
          rgba(78, 0, 205, 1),
          rgba(137, 42, 255, 1)
        );
        border-radius: 0.08rem;
        display: flex;
        .qi {
          display: block;
          width: 0.25rem;
          height: 0.37rem;
          background: url(../assets/img/qi.png);
          background-size: 100% 100%;
          margin: 0.1rem auto;
        }
      }
      strong {
        display: block;
        text-align: center;
        font-size: 0.22rem;
        color: #892aff;
        margin-top: 0.07rem;
      }
      .userAv {
        width: 0.7rem;
        height: 0.8rem;
        background: url(../assets/img/avBg.png);
        background-size: 100% 100%;
        position: absolute;
        top: -0.9rem;
        left: -0.14rem;
        padding-top: 0.02rem;
        img {
          display: block;
          width: 0.66rem;
          height: 0.66rem;
          border-radius: 50%;
          margin: 0 auto;
        }
      }
      &.act {
        .zhu {
          background: linear-gradient(
            0deg,
            rgba(137, 42, 255, 1),
            rgba(253, 112, 217, 1)
          );
        }
        strong {
          color: #fd70d9;
        }
      }
    }
  }
  .userLvTips {
    padding: 0 0.28rem;
    font-size: 0.26rem;
    color: #ffacea;
    text-align: center;
    margin-top: 0.1rem;
    line-height: 0.28rem;
  }
  .giftBox {
    padding: 0 0.25rem;
    display: flex;
    justify-content: space-between;
    margin-top: 0.15rem;
    img {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>
