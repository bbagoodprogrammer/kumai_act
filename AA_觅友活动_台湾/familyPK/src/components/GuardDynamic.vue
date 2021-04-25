<template>
  <div class="guard_dynamic">
    <InnerScrollLoadList class="list__main" :url="url" :parse="parse">
      <template slot-scope="{ list, loading, none }">
        <ul>
          <li class="dynamic__item" v-for="(item, index) in list" :key="index">
            <div>
              <div class="name">{{ item.name }}</div>
              <div class="time">{{ item.time }}</div>
            </div>
            <span class="score">+{{ item.score }}</span>
          </li>
        </ul>

        <div v-if="loading" class="scrollLoading">{{ lang.loading }}</div>
        <div v-if="none" class="scrollNone">{{ lang.not_data }}</div>
      </template>
    </InnerScrollLoadList>
  </div>
</template>

<script>
import api from "../apis/api";
import InnerScrollLoadList from "./common/InnerScrollLoadList";
import { dateFormat, toast } from "../utils";
export default {
  name: 'GuardDynamic',

  components: {
    InnerScrollLoadList,
  },

  data() {
    return {
      url: api.history,
    };
  },

  methods: {
    parse(data) {
      const { response_status, response_data } = data;
      if (response_status && response_status.error === "") {
        response_data.list.forEach((item) => {
          if (item.type == "charge") {
            item.name = this.lang.finish_task.replace("%s", this.lang.task_4);
          }
          if (item.type == "login") {
            item.name = this.lang.finish_task.replace("%s", this.lang.task_3);
          }
          if (item.type == "joinmic") {
            item.name = this.lang.user_finish_task.replace("%s", this.lang.task_2).replace('{0}', item.nick);
          }
          if (item.type == "sendGift") {
            item.name = this.lang.send_gift.replace("%s", item.giftName).replace('{0}', item.nick).replace('{1}', item.num);
          }
          item.time = dateFormat(this.lang.dynamic_time, item.time * 1000)
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
  },
};
</script>

<style lang="scss">
.guard_dynamic {
  .list__main {
    height: 7.1rem;
    overflow: auto;
    .dynamic__item {
      display: flex;
      justify-content: space-between;
      .name {
        width: 3.82rem;
        font-size: 0.24rem;
        font-weight: 400;
        color: #b1c4f7;
        margin-left: 0.33rem;
      }
      .time {
        font-size: 0.24rem;
        margin-left: 0.33rem;
        font-weight: 400;
        color: #4a71d9;
        margin-top: 0.09rem;
        margin-bottom: 0.26rem;
      }
      .score {
        font-size: 0.24rem;
        margin-right: 0.43rem;
        font-weight: 400;
        color: #e7d795;
      }
    }
    .scrollLoading,
    .scrollNone {
      text-align: center;
      color: #E9FAF9;
      padding-top: 0.2rem;
      padding-bottom: 0.2rem;
      font-size: 0.26rem;
    }
    .scrollNone {
      padding-top: 2.5rem;
    }
  }
}
</style>