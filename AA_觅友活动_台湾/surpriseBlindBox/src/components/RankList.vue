<template>
  <div class="rank_list">
    <ul>
      <li class="list__item" v-for="(item, index) in list" :key="index">
        <div class="rank">{{ item.rank }}</div>
        <div class="avatar__box">
          <img
            class="avatar"
            v-lazy="item.avatar"
            @click="goHomepage(item.uid)"
          />
        </div>

        <div>
          <div class="nick__box">
            {{ item.nick }}
          </div>
          <div class="count" v-if="item.giftCollection.completeSet">
            {{ lang.rank_item_des_1.replace("%s", item.giftCollection.count) }}
          </div>
          <div class="count" v-else>
            {{ lang.rank_item_des_2.replace("%s", item.giftCollection.count) }}
          </div>
        </div>

        <div class="score">
          <div class="title">{{ lang.store_value }}</div>
          <div class="num">{{ item.score }}</div>
        </div>
      </li>
    </ul>

    <div class="fixed__bottom">
      <template v-if="userRank.score > 0">
        <div class="rank">{{ userRank.ranking }}</div>
        <div class="avatar__box">
          <img
            class="avatar"
            v-lazy="userRank.avatar"
            @click="goHomepage(userRank.uid)"
          />
        </div>

        <div>
          <div class="nick__box">
            {{ userRank.nick }}
          </div>
          <div class="count" v-if="userRank.giftCollection.completeSet">
            {{
              lang.rank_item_des_1.replace("%s", userRank.giftCollection.count)
            }}
          </div>
          <div class="count" v-else>
            {{
              lang.rank_item_des_2.replace("%s", userRank.giftCollection.count)
            }}
          </div>
        </div>

        <div class="score">
          <div class="title">{{ lang.store_value }}</div>
          <div class="num">{{ userRank.score }}</div>
        </div>
      </template>
      <img
        v-else
        class="open__btn"
        @click="handleScroll"
        :src="images.open_surp_box"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import callApp from "../utils/callApp";
export default {
  name: "RankList",

  props: {
    list: {
      required: true,
    },
    userRank: {
      required: true,
    },
  },

  data() {
    return {};
  },

  methods: {
    goHomepage(uid) {
      if (uid) {
        callApp.userInfo(uid);
      }
    },

    getBrHtml(text) {
      if (!text) {
        return;
      }
      return text.replace(/\n/g, "<br>");
    },

    handleScroll() {
      window.scroll({
        behavior: "smooth",
        top: 0,
        left: 0,
      });
    },

    handleCloseDialog() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style lang="scss">
.rank_list {
  margin-top: 0.12rem;
  .list__item:nth-child(1) {
    background: url("../img/list_item_bg1.png") 0/100% 100% no-repeat;
    .rank {
      font-size: 0;
    }
    .avatar__box {
      background: RGBA(254, 255, 157, 1);
    }
    .nick__box {
      color: #bf653d;
    }
    .score {
      .title {
        color: #dfa638;
      }
      .num {
        color: #c0653e;
      }
    }
  }
  .list__item:nth-child(2) {
    background: url("../img/list_item_bg2.png") 0/100% 100% no-repeat;
    .rank {
      font-size: 0;
    }
    .nick__box {
      color: #6b1c9b;
    }
    .score {
      .title {
        color: #269bd2;
      }
    }
  }
  .list__item:nth-child(3) {
    background: url("../img/list_item_bg3.png") 0/100% 100% no-repeat;
    .rank {
      font-size: 0;
    }
    .nick__box {
      color: #6b1c9b;
    }
    .score {
      .title {
        color: #784eec;
      }
    }
  }
  .list__item {
    width: 7.09rem;
    height: 1.34rem;
    background: url("../img/list_rest_bg.png") 0/100% 100% no-repeat;
    display: flex;
    align-items: center;
    margin: 0 auto 0.11rem auto;
    .rank {
      width: 1.2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.3rem;
      font-weight: 400;
      font-style: italic;
      color: #ffffff;
    }
    .avatar__box {
      width: 1.07rem;
      height: 1.07rem;
      border-radius: 50%;
      background: RGBA(115, 149, 255, 1);
      border: 0.01rem solid RGBA(70, 96, 142, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      .avatar {
        width: 0.95rem;
        height: 0.95rem;
        border-radius: 50%;
        border-radius: 50%;
        box-sizing: border-box;
      }
    }

    .nick__box {
      padding-left: 0.1rem;
      font-size: 0.26rem;
      font-weight: 400;
      color: #86e8ff;
      width: 2rem;
      height: 0.4rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .count {
      padding-left: 0.1rem;
      font-size: 0.22rem;
      font-weight: 400;
      color: #ffffff;
    }
    .score {
      width: 2rem;
      text-align: center;
      margin-left: 0.3rem;
      .title {
        font-size: 0.2rem;
        font-weight: 400;
        color: #d1b5fa;
        height: 0.4rem;
      }
      .num {
        font-size: 0.3rem;
        font-weight: 400;
        color: #ffffff;
        height: 0.4rem;
        line-height: 0.31rem;
      }
    }
  }

  .fixed__bottom {
    width: 7.5rem;
    height: 1.72rem;
    background: url("../img/info_fixed.png") 0/100% 100% no-repeat;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    box-sizing: border-box;
    padding-top: 0.38rem;
    z-index: 80;
    .rank {
      width: 1.2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.3rem;
      font-weight: bold;
      font-style: italic;
      color: #ffffff;
    }
    .avatar__box {
      width: 1.3rem;
      height: 1.3rem;
      border-radius: 50%;
      background: RGBA(115, 149, 255, 1);
      border: 0.01rem solid RGBA(70, 96, 142, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      position: relative;
      top: -0.2rem;
      .avatar {
        width: 1.15rem;
        height: 1.15rem;
        border-radius: 50%;
        border-radius: 50%;
        box-sizing: border-box;
      }
    }

    .nick__box {
      padding-left: 0.1rem;
      font-size: 0.26rem;
      font-weight: 400;
      color: #6b1c9b;
      width: 2rem;
      height: 0.4rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .count {
      padding-left: 0.1rem;
      font-size: 0.22rem;
      font-weight: 400;
      color: #ffffff;
    }
    .score {
      width: 2rem;
      text-align: center;
      margin-left: 0.3rem;
      .title {
        font-size: 0.2rem;
        font-weight: 400;
        color: #7855ed;
        height: 0.4rem;
      }
      .num {
        font-size: 0.3rem;
        font-weight: 400;
        color: #ffffff;
        height: 0.4rem;
        line-height: 0.31rem;
      }
    }
    .open__btn {
      width: 3.18rem;
      height: 0.85rem;
      display: block;
      margin: 0 auto;
    }
  }
}
</style>