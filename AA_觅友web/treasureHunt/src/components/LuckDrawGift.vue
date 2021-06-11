<template>
  <div @click.stop="close()">
    <div class="draw_gift__container" @click.stop="close()"></div>
    <div class="draw_gift">
      <div class="draw_gift__main">
        <ul class="gift_main">
          <li
            v-for="(item, index) in list"
            :class="{
              gift_one: list.length == 1,
              gift_two: list.length == 2,
              gift_more: list.length > 2,
            }"
            :key="index"
          >
            <canvas :id="'canvas' + index"></canvas>
            <img class="gift__img" :src="item.image" />
            <div class="num__imgs" v-if="item.num > 1" v-html="getImgs(item.num)"></div>
            <!-- <img v-if="item.num > 1" class="num__img" :src="require(`../img/X${item.num}.png`)" /> -->
          </li>
        </ul>
      </div>
      <div class="btn" @click.stop="close()">{{lang.sure}}</div>
    </div>
  </div>
</template>
<script>
import calcAwardNumImg from '../utils/calcAwardNumImg'
import { Downloader, Parser, Player } from "svga.lite";
import { mapState } from "vuex";

export default {
  computed: {
    lang: () => _lang,
    ...mapState(["svgaDatas"]),
  },

  props: {
    visible: {
      type: Boolean,
    },
    list: {
      type: Array
    }
  },

  watch: {
    // svgaDatas: {
    //   handler(val) {
    //     let bgItem = this.svgaDatas.find((item) => item.type == "bgLight");
    //     if (bgItem) {
    //       this.handleBgSvga(bgItem.fileData);
    //     }
    //   },
    //   deep: true,
    //   immediate: true,
    // },
  },

  data() {
    return {
      //list: [1],
    };
  },

  mounted() {
    let bgItem = this.svgaDatas.find((item) => item.type == "bgLight");
        if (bgItem) {
          this.handleBgSvga(bgItem.fileData);
        }
  },

  methods: {
    async handleBgSvga(fileData) {
      this.list.forEach(async (item, index) => {
        const player = new Player("#canvas" + index);
        await player.mount(fileData);
        player.start();
      });
    },

    getImgs (num) {
      if (this.list.length == 1) {
        return calcAwardNumImg(num, 44)
      }
      return calcAwardNumImg(num, 28)
    },

    close() {
      this.$emit("update:visible", false);
    },
  },
};
</script>
<style lang="scss">
.draw_gift__container {
  width: 100%;
  height: 9.3rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  border-radius: 0.2rem 0.2rem 0rem 0rem;
  background: #000000;
  opacity: 0.8;
}
.draw_gift {
  position: absolute;
  top: 0;
  z-index: 200;
  box-sizing: border-box;
  width: 100%;
  height: 9.3rem;
  .draw_gift__main {
    height: 6.3rem;
    margin-top: 0.6rem;
    margin-bottom: 0.69rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .gift_main {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    }
    .gift_one {
      width: 5.2rem;
      height: 5.2rem;
      position: relative;
      canvas {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 210;
        left: 0;
      }
      .gift__img {
        width: 2.8rem;
        height: 2.8rem;
        position: absolute;
        z-index: 220;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      .num__imgs {
        position: absolute;
        z-index: 230;
        top: 1rem;
        right: 0.6rem;
        white-space: nowrap;
        img:not(:first-child) {
          margin-left: -0.04rem;
        }
      }
      // .num__img {
      //   width: 0.8rem;
      //   height: 0.8rem;
      //   position: absolute;
      //   z-index: 230;
      //   top: 1rem;
      //   right: 0.6rem;
      // }
    }
    .gift_two {
      width: 3rem;
      height: 3rem;
      position: relative;
      canvas {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 210;
        left: 0;
      }
      .gift__img {
        width: 2rem;
        height: 2rem;
        position: absolute;
        z-index: 220;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      .num__imgs {
        position: absolute;
        z-index: 230;
        top: 0.3rem;
        right: 0.3rem;
        white-space: nowrap;
        img:not(:first-child) {
          margin-left: -0.04rem;
        }
      }
      // .num__img {
      //   width: 0.5rem;
      //   height: 0.5rem;
      //   position: absolute;
      //   z-index: 230;
      //   top: 0.3rem;
      //   right: 0.3rem;
      // }
    }
    .gift_more {
      width: 2.1rem;
      height: 2.1rem;
      position: relative;
      overflow: hidden;
      canvas {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 210;
        left: 0;
      }
      .gift__img {
        width: 1.56rem;
        height: 1.56rem;
        position: absolute;
        z-index: 220;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      .num__imgs {
        position: absolute;
        z-index: 230;
        top: 0rem;
        right: 0rem;
        white-space: nowrap;
        img:not(:first-child) {
          margin-left: -0.04rem;
        }
      }
      // .num__img {
      //   width: 0.51rem;
      //   height: 0.51rem;
      //   position: absolute;
      //   z-index: 230;
      //   top: 0rem;
      //   right: 0rem;
      // }
    }
  }

  .btn {
    width: 3.6rem;
    height: 1.1rem;
    background: url('../img/sure.png');
    background-size: 100% 100%;
    text-align: center;
    font-size: 0.4rem;
    font-weight: 400;
    line-height: 1.1rem;
    color: #984904;
    opacity: 1;
    margin: 0 auto;
  }
}
</style>