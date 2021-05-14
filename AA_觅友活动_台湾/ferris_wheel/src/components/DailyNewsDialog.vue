<template>
  <div class="daily_main">
    <InnerScrollLoadList class="scroll" :url="url" :parse="parse">
      <template slot-scope="{ list, loading, none }">
        <ul>
          <li class="item__box" v-for="(item, index) in list" :key="index">
            <div class="info">
              <div class="time">{{ item.time }}</div>
              <div class="title" v-html="item.itemTitle"></div>

            </div>
            <div class="num">
              <span v-if="item.type == 4"></span>
              <span v-else>+{{ item.score || item.scores }}</span>
            </div>
          </li>
        </ul>
        <div v-if="none" class="scrollNone" v-html="getBrHtml(lang.not_daily_news)"></div>
        <div v-if="loading" class="scrollNone" v-html="getBrHtml(lang.loading)"></div>
      </template>
    </InnerScrollLoadList>
  </div>
</template>

<script>
import InnerScrollLoadList from "./common/InnerScrollLoadList";
import { toast, dateFormat } from "../utils/index";
import callApp from "../utils/callApp";
import { invite } from "../apis/index";
import api from "../apis/api";

export default {
  name: "DailyNewsDialog",

  components: {
    InnerScrollLoadList,
  },

  data () {
    return {
      url: api.history,
      list: [],
      selectUid: "",
    };
  },

  created () {
    document.body.style.overflow = "hidden";
  },

  beforeDestroy () {
    document.body.style.overflow = "";
  },

  methods: {
    parse (data) {
      const { response_status, response_data } = data;
      if (response_status && response_status.error === "") {
        let list = response_data.list;
        let time = this.lang.daily_time
          .replace("{0}", "mm")
          .replace("{1}", "dd")
          .replace("{2}", "HH")
          .replace("{3}", "MM");
        list.forEach((item, index) => {
          item.itemTitle = `${item.nick}${this.lang.received}${item.name} *${item.num}`
          //   if (item.type == 1) {
          //     //完成任务
          //     item.itemTitle = this.lang.daily_title_1
          //       .replace("{0}", item.nick)
          //       .replace("{1}", item.taskTitle);
          //   }
          //   if (item.type == 2) {
          //     //收到指定礼物
          //     if (item.eachOther == 0) {
          //       item.itemTitle = this.lang.daily_title_2
          //         .replace("{0}", item.nick)
          //         .replace("{1}", item.gname)
          //         .replace("{2}", item.num);
          //     } else {
          //       item.itemTitle = this.lang.daily_title_3
          //         .replace("{0}", item.sendGift_nick)
          //         .replace("{1}", item.nick)
          //         .replace("{2}", item.gname)
          //         .replace("{3}", item.num);
          //     }
          //   }
          //   if (item.type == 3) {
          //     item.itemTitle = this.lang.daily_title_5;
          //   }
          //   if (item.type == 4) {
          //     item.itemTitle = this.lang.daily_title_4
          //       .replace("{0}", item.nick)
          //       .replace("{1}", `<br/><img src="${images[`dialog_ring_${item.index}`]}" />`);
          //   }
          item.time = dateFormat(time, item.tm * 1000);
        });
        return list;
      } else {
        const { error } = response_status;
        if (error) {
          toast(error);
        }
      }
      return [];
    },

    async handleSure () {
      if (!this.selectUid) return;
      let res = await invite({ to_uid: this.selectUid });
      let { response_status, response_data } = res.data;
      if (response_status.code === 0) {
        toast(this.lang.invite_req_success);
      } else {
        toast(response_status.error);
      }
    },

    getBrHtml (text) {
      if (!text) {
        return;
      }
      return text.replace(/\n/g, "<br>");
    },

    selectCp (uid) {
      this.selectUid = uid;
    },

    goProfile (uid) {
      callApp.userInfo(uid);
    },

    handleCloseDialog () {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style lang="scss">
.scrollNone {
  text-align: center;
  margin: 0 auto;
}
.daily_main {
  height: 100%;
  .scroll {
    height: 100%;
    overflow: auto;
  }
  .item__box {
    margin: 0 auto 0.3rem auto;
    display: flex;
    padding-left: 0.4rem;
    .info {
      width: 4.44rem;
      .title {
        font-size: 0.22rem;
        font-weight: 300;
        color: rgba(176, 97, 101, 1);
        line-height: 0.3rem;
        img {
          width: 1rem;
          height: 1rem;
        }
      }
      .time {
        font-size: 0.22rem;
        font-weight: 300;
        color: rgba(176, 97, 101, 1);
        padding-top: 0.1rem;
      }
    }
    .num {
      flex: 1;
      text-align: center;
      font-size: 0.26rem;
      font-weight: 300;
      color: rgba(176, 97, 101, 1);
    }
  }
}
</style>