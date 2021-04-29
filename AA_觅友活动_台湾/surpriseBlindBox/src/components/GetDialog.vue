<template>
  <div class="get__dialog">
    <div class="screen" @click="handleCloseDialog"></div>
    <div
      class="main"
      :style="{ background: `url(${images.get_dialog}) 0/100% 100%` }"
    >
      <template v-if="prizes.length == 1">
        <div class="gift">
          <img :src="prizes[0].image" alt="" />
          <div class="label__box" v-if="prizes[0].level == 'rare'">
            {{ lang.rare }}
          </div>
          <div class="label__box" v-if="prizes[0].level == 'hide'">
            {{ lang.hide }}
          </div>
        </div>
        <div class="name">{{ prizes[0].name }}</div>
      </template>
      <ul v-else class="award__box">
        <li v-for="(item, index) in prizes" :key="index">
          <div class="img__box">
            <img class="gift__img" :src="item.image" alt="" />
            <div v-if="item.number > 1" class="num">{{ item.number }}</div>
            <div class="label__box" v-if="item.level == 'rare'">
              {{ lang.rare }}
            </div>
            <div class="label__box" v-if="item.level == 'hide'">
              {{ lang.hide }}
            </div>
          </div>
          <span class="name">{{ item.name }}</span>
        </li>
      </ul>
      <img
        class="happy_receive"
        :class="{ mul_gift_receive: prizes.length > 1 }"
        :src="images.happy_receive"
        @click="handleCloseDialog"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GetDialog',

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    prizes: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {};
  },

  created() {
    document.body.style.overflow = "hidden";
  },

  beforeDestroy() {
    document.body.style.overflow = "";
  },

  methods: {
    handleCloseDialog() {
      this.$store.dispatch("initData");
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style lang="scss">
.get__dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  .screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.7;
    z-index: 1000;
  }
  .main {
    width: 5.95rem;
    height: 6.03rem;
    position: fixed;
    top: 0;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    opacity: 1;
    .gift {
      width: 2.3rem;
      height: 2.3rem;
      background: url("../img/gift_bg.png") 0/100% 100% no-repeat;
      margin: 1.4rem auto 0.25rem auto;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      img {
        width: 2rem;
        height: 2rem;
      }
      .label__box {
        width: 0.85rem;
        height: 0.4rem;
        background: url("../img/label_box.png") 0/100% 100% no-repeat;
        position: absolute;
        right: 0rem;
        top: 0;
        font-size: 0.24rem;
        font-weight: 400;
        color: #ffffff;
        text-align: center;
        line-height: 0.4rem;
      }
    }
    .name {
      text-align: center;
      font-size: 0.28rem;
      font-weight: 400;
      color: #ffffff;
      line-height: 0.31rem;
    }
    .happy_receive {
      width: 2.14rem;
      height: 0.77rem;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 0.6rem;
    }
    .mul_gift_receive {
      bottom: -0.3rem;
    }

    .award__box {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      overflow: auto;
      height: 4.2rem;
      margin-top: 1.3rem;
      li {
        width: 1.63rem;
        margin: 0 0.03rem 0.14rem 0.03rem;
        text-align: center;
        .img__box {
          width: 1.63rem;
          height: 1.63rem;
          background: url("../img/gift_bg.png") 0/100% 100% no-repeat;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          .num {
            width: 0.4rem;
            height: 0.4rem;
            background: url("../img/num_dot.png") 0/100% 100% no-repeat;
            position: absolute;
            right: 0;
            bottom: 0;
            font-size: 0.24rem;
            font-weight: 400;
            color: #ffffff;
            text-align: center;
            line-height: 0.4rem;
          }
          .gift__img {
            width: 1.4rem;
            height: 1.4rem;
          }
          .label__box {
            width: 0.85rem;
            height: 0.4rem;
            background: url("../img/label_box.png") 0/100% 100% no-repeat;
            position: absolute;
            right: -0.02rem;
            top: 0;
            font-size: 0.24rem;
            font-weight: 400;
            color: #ffffff;
            text-align: center;
            line-height: 0.4rem;
          }
        }
        .name {
          font-size: 0.26rem;
          font-weight: 400;
          color: #ffffff;
        }
      }
    }
  }
}
</style>