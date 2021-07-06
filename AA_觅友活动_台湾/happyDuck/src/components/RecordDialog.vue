<template>
  <div class="record_dialog">
    <div class="dialog_screen" @click="handleCloseDialog"></div>
    <div
      class="dialog_container"
      :style="{
        background: `url(${images.record_dialog_bg}) 0/100% 100% no-repeat`,
      }"
    >
      <InnerScrollLoadList class="record__main" :url="url" :parse="parse">
        <template slot-scope="{ list, loading, none }">
          <ul>
            <li class="record__item" v-for="(item, index) in list" :key="index">
              <div class="title">{{ item.title }}</div>
              <div class="time">{{ item.time }}</div>
            </li>
          </ul>
          <div v-if="loading" class="scrollLoading">{{ lang.loading }}</div>
          <div v-if="none" class="scrollNone">{{ lang.not_data }}</div>
        </template>
      </InnerScrollLoadList>
      <img
        class="close__dialog"
        @click="handleCloseDialog"
        src="../img/close.png"
      />
    </div>
  </div>
</template>

<script>
import { dateFormat } from "../utils";
import InnerScrollLoadList from "./common/InnerScrollLoadList";
import api from "../apis/api";
export default {
  name: "RecordDialog",

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },

  components: {
    InnerScrollLoadList,
  },

  data() {
    return {
      url: api.history,
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
    parse(data) {
      const { response_status, response_data } = data;
      if (response_status && response_status.error === "") {
        response_data.list.forEach((item) => {
          let giftTitle = [];
          item.prizes.forEach((prize) => {
            if (prize.type == "frame") {
              let title = prize.name + this.lang.frame_day.replace("%s", prize.day);
              giftTitle.push(this.handleDoubleTitle(prize.number, title));
            } else if (prize.type == "car") {
              let title = prize.name + this.lang.car_day.replace("%s", prize.day);
              giftTitle.push(this.handleDoubleTitle(prize.number, title));
            } else if (prize.type == "coin") {
              let title = this.lang.coin.replace("%s", prize.count);
              giftTitle.push(this.handleDoubleTitle(prize.number, title));
            } else if (prize.type == "bean") {
              let title = this.lang.bean.replace("%s", prize.count);
              giftTitle.push(this.handleDoubleTitle(prize.number, title));
            } else {
              giftTitle.push(this.handleDoubleTitle(prize.number, prize.name));
            }
          });
          item.title = this.lang.record
            .replace("{1}", item.price)
            .replace("{2}", giftTitle.join("、"));
          item.time = dateFormat(this.lang.time, item.time * 1000);
        });
        return response_data.list;
      } else {
        const { error } = response_status;
        if (error) {
          toast(error);
        }
      }
      return [];
    },

    handleDoubleTitle(number, title) {
      if (number > 1) {
        return title + `*${number}`;
      } else {
        return title;
      }
    },

    getBrHtml(text) {
      if (!text) {
        return;
      }
      return text.replace(/\n/g, "<br>");
    },

    handleCloseDialog() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style lang="scss">
.record_dialog {
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
    width: 6.54rem;
    height: 8.55rem;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translate(-50%);
    z-index: 1000;
    opacity: 1;
    .record__main {
      width: 100%;
      height: 4.8rem;
      margin-top: 3.5rem;
      overflow: auto;
      .record__item {
        display: flex;
        justify-content: space-between;
        padding-left: 0.6rem;
        padding-right: 0.6rem;
        margin-top: 0.33rem;
        .title {
          width: 3.5rem;
          font-size: 0.28rem;
          font-weight: 400;
          color: #712d0f;
          line-height: 0.32rem;
        }
        .time {
          font-size: 0.26rem;
          font-weight: 400;
          color: #db6a06;
        }
      }
    }
    .scrollLoading,
    .scrollNone {
      color: #712d0f;
    }

    .close__dialog {
      position: absolute;
      width: 1.1rem;
      height: 1.1rem;
      left: 50%;
      transform: translateX(-50%);
      bottom: -1.3rem;
    }
  }
}
</style>