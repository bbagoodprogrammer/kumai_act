<template>
  <div class="purchase_box">
    <InnerScrollLoadList class="list__main" :url="url" :parse="parse">
      <template slot-scope="{ list, loading, none }">
        <ul>
          <li class="list__item" v-for="(item, index) in list" :key="index">
            <div v-if="item.type == 'purchase'">
              <div class="title__box">
                <span class="title">{{
                  lang.purchase_num_box.replace("%s", item.count)
                }}</span>
                <span class="time">{{ item.time }}</span>
              </div>
              <div class="name">{{ item.name }}</div>
            </div>
            <div v-else  class="title__box">
                <span class="title" v-html="getTitle(item)"></span>
                <span class="time">{{ item.time }}</span>
              </div>
          </li>
        </ul>

        <div v-if="loading" class="scrollLoading">{{ lang.loading }}</div>
        <div v-if="none" class="scrollNone">{{ lang.not_data }}</div>
      </template>
    </InnerScrollLoadList>
  </div>
</template>

<script>
import InnerScrollLoadList from "./common/InnerScrollLoadList";
import api from "../apis/api";
import { toast, dateFormat } from "../utils";
export default {
  name: "PurchaseBox",

  components: {
    InnerScrollLoadList,
  },

  data() {
    return {
      url: api.purchaseHistory,
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
          if (item.type == "purchase") {
            let names = [];
            item.prizes.forEach((prize) => {
              names.push(prize.name + "*" + prize.number);
            });
            item.name = names.join("、");
          }
          item.time = dateFormat(this.lang.record_time, item.time * 1000);
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

    getTitle(item) {
      return this.lang.purchase_num_give.replace("{0}", item.count).replace('{1}', item.nick).replace(/\n/g, "<br>");
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
.purchase_box {
  padding-top: 0.2rem;
  .list__main {
    width: 100%;
    height: 5.9rem;
    overflow: auto;
    .list__item {
      .title__box {
        display: flex;
        justify-content: space-between;
        padding: 0 0.51rem 0.18rem 0.56rem;
        font-size: 0.24rem;
        font-weight: 400;
        color: #ffffff;
        .time {
          white-space: nowrap;
        }
      }
      .name {
        padding: 0 0.75rem 0.29rem 0.56rem;
        font-size: 0.22rem;
        font-weight: 400;
        color: #efee6a;
        line-height: 0.31rem;
      }
    }
  }
  .scrollLoading,
  .scrollNone {
    text-align: center;
    color: #fff9e8;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    font-size: 0.26rem;
  }
}
</style>