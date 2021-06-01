<template>
  <div class="my_collection_dialog">
    <div class="dialog_screen" @click="handleCloseDialog"></div>
    <div class="dialog_container" :style="{
        background: `url(${images.my_coll_dialog}) 0/100% 100% no-repeat`,
      }">
      <i class="arr left" @click="arrClick(0)"></i>
      <i class="arr right" @click="arrClick(1)"></i>
      <ul class="series__main_my">
        <li v-for="item in initData.series" :key="item.key" class="series__box_my" :class="{ current_series: currentSeries == item.key }" @click="selectSeries(item.key)">
          {{ item.name }}
        </li>
      </ul>
      <div class="des" v-html="getDes"></div>
      <ul class="collection__main">
        <li v-for="(item, index) in collects" :key="index" :class="{ no_coll: item.count == 0 }">
          <img class="label" v-if="item.level == 'rare'" :src="images.rare" />
          <img class="label" v-if="item.level == 'hide'" :src="images.hidden" />
          <img class="label" v-if="item.level == 'dyn'" :src="images.dyn" />
          <img v-if="isHidn(item)" class="coll__img" src="../img/hidn_icon.png" alt="" />
          <img v-else class="coll__img" :src="item.image" alt="" />
          <span v-if="!isHidn(item)" class="name">{{ item.name }}</span>
          <span v-else class="name">{{lang.hidn_gift}}</span>
        </li>
      </ul>

      <img class="close__dialog" @click="handleCloseDialog" src="../img/close.png" />
    </div>
  </div>
</template>

<script>
import { seeMyCollect } from "../apis";
import { toast } from "../utils";
import { mapState, mapGetters } from "vuex";
export default {
  name: "MyCollectionDialog",

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },

  data () {
    return {
      collects: [],
      currentSeries: "",
    };
  },

  watch: {
    "initData.currentSeries": {
      handler (val) {
        this.currentSeries = val;
      },
      immediate: true,
      deep: true,
    },
  },

  computed: {
    ...mapState(["initData"]),
    getDes () {
      let isFull = this.collects.every((item) => item.count > 0);
      let seriesItem = this.initData.series.find(item => item.key == this.currentSeries)
      let seriesName = seriesItem && seriesItem.name
      if (isFull) {
        let collects = JSON.parse(JSON.stringify(this.collects));
        collects.sort((a, b) => {
          return a.count - b.count;
        });
        let num = (collects[0] && collects[0].count) || 0;
        return this.lang.my_collection_des_2
          .replace("{0}", num)
          .replace("{1}", seriesName);
      } else {
        let num = 0;
        this.collects.forEach((item) => {
          if (item.count > 0) {
            num += 1;
          }
        });
        return this.lang.my_collection_des_1
          .replace("{0}", num)
          .replace("{1}", seriesName);
      }
    },
  },

  created () {
    document.body.style.overflow = "hidden";
    this.fetchData();
  },

  beforeDestroy () {
    document.body.style.overflow = "";
  },

  methods: {
    async fetchData () {
      let res = await seeMyCollect({ series: this.currentSeries });
      let { response_status, response_data } = res.data;
      if (response_status.code === 0) {
        this.collects = response_data.collects;
        if (this.currentSeries == 'sakura') {
          this.collects.forEach(item => {
            if (item.level == 'hide') {
              item.level = 'dyn'
            }
          })
        }
      } else {
        toast(response_status.error);
      }
    },

    selectSeries (key) {
      this.currentSeries = key
      this.fetchData()
    },

    isHidn (item) {
      return (item.level == 'hide' || item.level == 'dyn') && item.count == 0
    },

    getBrHtml (text) {
      if (!text) {
        return;
      }
      return text.replace(/\n/g, "<br>");
    },

    handleCloseDialog () {
      this.$emit("update:visible", false);
    },

    arrClick (type) {
      let el = document.getElementsByClassName('series__main_my')[0]
      let scrollLeft = el.scrollLeft
      let itemWidth = document.getElementsByClassName('series__box_my')[0].clientWidth
      if (type) {
        el.scrollLeft += itemWidth
      } else {
        el.scrollLeft -= itemWidth
      }
    }
  },
};
</script>

<style lang="scss">
.my_collection_dialog {
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
    width: 6.35rem;
    height: 8.33rem;
    position: fixed;
    top: 0;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    opacity: 1;
    .des {
      text-align: center;
      font-size: 0.22rem;
      font-weight: 400;
      color: #ffffff;
      line-height: 0.31rem;
    }
    .arr {
      display: block;
      width: 0.28rem;
      height: 0.4rem;
      background: url(../img/left.png);
      background-size: 100% 100%;
      position: absolute;
      top: 1.2rem;
      left: 0.37rem;
      &.right {
        background: url(../img/right.png);
        background-size: 100% 100%;
        left: 5.67rem;
      }
    }
    .series__main_my {
      width: 4.75rem;
      overflow-x: scroll;
      white-space: nowrap;
      //   display: flex;
      //   align-items: center;
      //   justify-content: center;
      margin: 1.19rem auto 0.15rem;
      .series__box_my {
        width: 1.56rem;
        height: 0.43rem;
        background: url('../img/coll_series_gray.png') 0/100% 100% no-repeat;
        line-height: 0.43rem;
        text-align: center;
        font-size: 0.24rem;
        font-weight: 400;
        color: #ffffff;
        margin-left: 0.02rem;
        margin-right: 0.02rem;
        display: inline-block;
      }
      .current_series {
        background: url('../img/coll_series.png') 0/100% 100% no-repeat;
      }
    }
    .series__main_my::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
    .collection__main {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      height: 5.88rem;
      overflow: auto;
      .no_coll {
        opacity: 0.41;
      }
      li:nth-child(1) {
        margin-left: 1.41rem;
      }
      li:nth-child(2) {
        margin-right: 1.41rem;
        background: url('../img/rare_gift_box.png') 0/100% 100% no-repeat;
      }
      li {
        width: 1.64rem;
        height: 2.24rem;
        background: url('../img/gift_box.png') 0/100% 100% no-repeat;
        margin-left: 0.11rem;
        margin-right: 0.11rem;
        margin-top: 0.31rem;
        position: relative;
        text-align: center;
        .label {
          width: 0.86rem;
          height: 0.4rem;
          position: absolute;
          right: 0;
          top: 0.02rem;
        }
        .name {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 0.65rem;
          position: absolute;
          bottom: 0.1rem;
          font-size: 0.21rem;
          font-weight: 400;
          color: #ffffff;
          line-height: 0.34rem;
        }
        .coll__img {
          width: 1.25rem;
          height: 1.25rem;
          margin-top: 0.18rem;
        }
      }
    }

    .close__dialog {
      position: absolute;
      width: 0.9rem;
      height: 0.9rem;
      bottom: -1.17rem;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>