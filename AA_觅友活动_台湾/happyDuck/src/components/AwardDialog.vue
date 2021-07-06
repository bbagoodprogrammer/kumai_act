<template>
  <div class="award_dialog">
    <div class="dialog_screen"></div>
    <div class="dialog_container">
      <img class="title__img" :src="images.award_dialog_title" />
      <div class="duck__main">
        <ul>
          <li v-for="(item, index) in prizes" :key="index">
            <template v-if="prizes.length == 1">
              <div class="big_duck">
                <img :src="item.image" />
              </div>
              <div class="title">{{ item.name }}</div>
            </template>
            <div class="duck__box" v-else>
              <div class="mini_duck">
                <img class="gift" :src="item.image" />
                <img v-if="item.type == 'frame'" class="avatar" src="../img/avatar.png" />
                <img class="num" v-if="item.number > 1" :src="require(`../img/${item.number}.png`)" />
              </div>
              <div class="name">{{ item.name }}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="des" v-html="getDes"></div>
      <div class="action__box">
      <img
        @click="handleCloseDialog"
        class="receive_btn"
        :src="images.receive_duck"
      />
      <img
        @click="handleAgainFeed"
        class="receive_btn"
        :src="images.feed_again"
      />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AwardDialog",

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    prizes: {
      type: Array,
      required: true,
    },
    type: {
      required: true
    }
  },

  computed: {
    getDes() {
      return this.lang.award_dialog_des.replace(/\n/g, "<br>").replace('%s', this.type * 100)
    }
  },

  data() {
    return {
      list: [],
    };
  },

  created() {
    document.body.style.overflow = "hidden";
  },

  beforeDestroy() {
    document.body.style.overflow = "";
  },

  methods: {
    getBrHtml(text) {
      if (!text) {
        return;
      }
      return text.replace(/\n/g, "<br>");
    },

    handleAgainFeed () {
      this.$parent.handleFeed(this.type)
      this.handleCloseDialog()
    },

    handleCloseDialog() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style lang="scss">
.award_dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  .dialog_screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.7;
    z-index: 1000;
  }
  .dialog_container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    opacity: 1;
    .title__img {
      display: block;
      width: 4.64rem;
      height: 0.79rem;
      margin: 0 auto;
    }
    .duck__main::before {
      position: absolute;
      top: 0;
      content: "";
      width: 7.5rem;
      height: 0.27rem;
      background: url("../img/award_main_1.png") 0/100% 100% no-repeat;
    }
    .duck__main::after {
      position: absolute;
      bottom: 0;
      content: "";
      width: 7.5rem;
      height: 0.27rem;
      background: url("../img/award_main_3.png") 0/100% 100% no-repeat;
    }
    .duck__main {
      width: 7.5rem;
      background: url("../img/award_main_2.png") 0/100% 0.54rem;
      padding-top: 0.2rem;
      padding-bottom: 0.2rem;
      position: relative;
      margin-top: 0.45rem;
      ul {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        // padding-left: 0.3rem;
        // padding-right: 0.3rem;
      }
      .big_duck {
        width: 4.03rem;
        height: 3.43rem;
        background: url("../img/award_duck_1_bg.png") 0/100% 100% no-repeat;
        margin: 0.1rem auto 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 2.44rem;
          height: 2.44rem;
        }
      }
      .title {
        text-align: center;
        font-size: 0.3rem;
        font-weight: 400;
        color: #c69f88;
        line-height: 0.38rem;
      }
      .duck__box {
        width: 1.73rem;
        text-align: center;
        margin-top: 0.23rem;
        .mini_duck {
          width: 1.5rem;
          height: 1.5rem;
          background: url("../img/mini_duck_box.png") 0/100% 100% no-repeat;
          position: relative;
          margin-left: 0.12rem;
          display: flex;
          align-items: center;
          justify-content: center;
          .gift {
            width: 1.48rem;
            height: 1.48rem;
            position: relative;
            z-index: 10;
          }
          .avatar {
            position: absolute;
            width: 0.8rem;
            height: 0.8rem;
            z-index: 0;
          }
          .num {
            width: 0.16rem;
            height: 0.23rem;
            position: absolute;
            right: 0.1rem;
            bottom: 0.1rem;
            z-index: 20;
          }
        }
        .name {
          font-size: 0.22rem;
          font-weight: 400;
          color: #c69f88;
          line-height: 0.3rem;
          padding-top: 0.05rem;
        }
      }
    }
    .des {
      text-align: center;
      font-size: 0.34rem;
      font-weight: 400;
      color: #f4f2ca;
      line-height: 0.48rem;
      padding-top: 0.32rem;
      padding-bottom: 0.22rem;
    }
    .action__box {
      text-align: center;
    }
    .receive_btn {
      width: 3rem;
      height: 1.02rem;
      display: inline-block;
      margin-left: 0.05rem;
      margin-right: 0.05rem;
    }
  }
}
</style>