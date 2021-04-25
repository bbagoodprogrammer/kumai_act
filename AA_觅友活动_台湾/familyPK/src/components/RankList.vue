<template>
  <div class="rank_list">
    <ul>
      <li
        class="list__item"
        :class="{
          list_bg_1: tab == 1 && index < 3,
          list_bg_2: tab == 2 && index < 3,
          list_bg_3: tab == 3 && index < 3,
        }"
        v-for="(item, index) in list"
        :key="index"
        @click="handleSeeAttr(item)"
      >
        <div class="rank">{{ item.rank }}</div>
        <img class="avatar" v-lazy="item.avatar" @click.stop="goRoom(item.rid)" />
        <div class="main__box">
          <div class="name">{{ item.name }}</div>
          <div class="score">
            {{ lang.family_guard_value }}
            <span class="num">{{ item.score }}</span>
          </div>
          <!-- 贡献榜 -->
          <div class="attr">
            <img
              class="fan__avatar"
              v-for="fan in item.familyUser"
              :key="fan.uid"
              v-lazy="fan.avatar"
              @click="goHomepage(fan.uid)"
            />
            <span class="title" :class="{title_margin: !item.familyUser.length}">{{
              lang.family_attr_list
            }}</span>
            <span class="arrow">>></span>
          </div>
        </div>
        <img
          v-if="familyPK.step == 2 && tab != 3 && index < 2"
          class="promotion"
          :src="images.promotion"
          alt=""
        />
      </li>
    </ul>

    <FamilyAttr
      v-if="showFamilyAttrDialog"
      :visible.sync="showFamilyAttrDialog"
      :familyId="familyId"
      :actStep="actStep"
    />
  </div>
</template>

<script>
import callApp from "../utils/callApp";
import FamilyAttr from "./FamilyAttr";
import { mapGetters } from "vuex";
export default {
  name: "RankList",

  props: {
    list: {
      required: true,
    },
    userRank: {
      required: true,
    },
    tab: {
      required: true,
    },
  },

  computed: {
    ...mapGetters(["familyPK"]),
  },

  components: {
    FamilyAttr,
  },

  data() {
    return {
      familyInfo: {},
      actStep: "",
      familyId: "",
      showFamilyAttrDialog: false,
    };
  },

  methods: {
    handleSeeAttr(item) {
      this.actStep = this.tab == 3 ? "finals" : "pk";
      this.familyId = item.familyId;
      this.showFamilyAttrDialog = true;
    },

    goHomepage(uid) {
      if (uid) {
        callApp.userInfo(uid);
      }
    },

    goRoom(rid) {
      if (rid) {
        callApp.room(rid);
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
    .rank {
      font-size: 0;
      background: transparent;
      position: relative;
    }
    .rank::after {
      content: "";
      position: absolute;
      left: -0.3rem;
      top: 50%;
      transform: translateY(-50%);
      width: 1.07rem;
      height: 1.07rem;
      background: url("../img/top1.png") 0/100% 100% no-repeat;
    }
    .name {
      color: #ffffff;
    }
  }
  .list__item:nth-child(2) {
    .rank {
      font-size: 0;
      background: transparent;
      position: relative;
    }
    .rank::after {
      content: "";
      position: absolute;
      left: -0.3rem;
      top: 50%;
      transform: translateY(-50%);
      width: 1.07rem;
      height: 1.07rem;
      background: url("../img/top2.png") 0/100% 100% no-repeat;
    }
    .name {
      color: #ffffff;
    }
  }
  .list__item:nth-child(3) {
    .rank {
      font-size: 0;
      background: transparent;
      position: relative;
    }
    .rank::after {
      content: "";
      position: absolute;
      left: -0.3rem;
      top: 50%;
      transform: translateY(-50%);
      width: 1.07rem;
      height: 1.07rem;
      background: url("../img/top3.png") 0/100% 100% no-repeat;
    }
    .name {
      color: #ffffff;
    }
  }
  .list_bg_1 {
    background: url("../img/list_red_top3_bg.png") 0/100% 100% no-repeat !important;
  }
  .list_bg_2 {
    background: url("../img/list_blue_top3_bg.png") 0/100% 100% no-repeat !important;
  }
  .list_bg_3 {
    background: url("../img/list_comp_top3_bg.png") 0/100% 100% no-repeat !important;
  }
  .list__item {
    width: 6.99rem;
    height: 1.67rem;
    background: url("../img/list_rest_bg.png") 0/100% 100% no-repeat;
    display: flex;
    align-items: center;
    margin: 0 auto 0.08rem auto;
    position: relative;
    .rank {
      width: 0.51rem;
      height: 0.51rem;
      background: #4e5aa6;
      border-radius: 50%;
      margin-left: 0.3rem;
      margin-right: 0.3rem;
      font-size: 0.26rem;
      font-weight: normal;
      color: #ffffff;
      text-align: center;
      line-height: 0.51rem;
    }
    .avatar {
      width: 1.2rem;
      height: 1.2rem;
      border: 0.03rem solid #ebdc8e;
      border-radius: 50%;
      box-sizing: border-box;
      flex-shrink: 0;
    }

    .main__box {
      flex: 1;
      margin-left: 0.15rem;
    }
    .name {
      font-size: 0.26rem;
      font-weight: normal;
      color: #260c46;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-top: 0.1rem;
    }
    .score {
      font-size: 0.2rem;
      font-weight: 400;
      color: #e6fbf9;
      margin-top: 0.06rem;
      .num {
        font-size: 0.3rem;
        font-weight: normal;
        color: #f9f915;
      }
    }
    .attr {
      width: 100%;
      display: flex;
      align-items: center;
      // justify-content: flex-end;
      margin-top: 0.15rem;
      line-height: 0.38rem;
      .fan__avatar {
        width: 0.38rem;
        height: 0.38rem;
        border-radius: 50%;
        box-sizing: border-box;
        border: 0.02rem solid RGBA(254, 228, 255, 1);
        margin-right: 0.04rem;
      }
      .arrow {
        font-size: 0.2rem;
        font-weight: 400;
        color: #e6fbf9;
        text-decoration: underline;
      }
      .title {
        font-size: 0.2rem;
        font-weight: 400;
        color: #e6fbf9;
        text-decoration: underline;
        margin-left: 0.1rem;
      }
      .title_margin {
        margin-left: 0;
      }
    }
    .promotion {
      position: absolute;
      top: 0.1rem;
      right: 0.28rem;
      width: 1.14rem;
      height: 1.14rem;
    }
  }
}
</style>