<template>
  <div class="rank_list">
    <ul>
      <li
        class="list__item"
        :class="{
          man_top3_list: index < 3 && sex == 0,
          woman_top3_list: index < 3 && sex == 1,
        }"
        v-for="(item, index) in list"
        :key="index"
      >
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
          <div class="score__box">
            <img src="../img/heart.png" />
            <span class="score">{{ item.score }}</span>
          </div>
        </div>
        <img
          v-if="item.rid"
          @click="goParty(item.rid)"
          class="party"
          :src="images.party"
          alt=""
        />
        <!-- 贡献榜 -->
        <div class="attr">
          <span class="title">{{ lang.fan_list }}</span>
          <img
            class="fan__avatar"
            v-for="fan in item.fans"
            :key="fan.uid"
            v-lazy="fan.avatar"
            @click="goHomepage(fan.uid)"
          />
          <span class="arrow" @click="handleSeeAttr(item)">>></span>
        </div>
        <img
          class="active"
          :src="images.active"
          v-if="item.onLine && !item.rid"
        />
      </li>
    </ul>

    <div
      class="fixed__bottom"
      :class="{
        man_fixed: sex == 0,
        woman_fixed: sex == 1,
      }"
      v-if="showFixed"
    >
      <template v-if="initData.reg">
        <div class="rank">{{ handleRank(userRank.rank) }}</div>
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
          <div class="score__box">
            <img src="../img/heart.png" />
            <span class="score">{{ userRank.score }}</span>
          </div>
        </div>
        <img
          @click="joinParty()"
          class="party"
          :src="images.join_party"
          alt=""
        />
        <!-- 贡献榜 -->
        <div class="attr">
          <span class="title" :style="{ color: sex == 0 ? '#04118E' : '' }">{{ lang.fan_list }}</span>
          <img
            class="fan__avatar"
            v-for="fan in userRank.fans"
            :key="fan.uid"
            v-lazy="fan.avatar"
            @click="goHomepage(fan.uid)"
          />
          <span
          class="arrow"
            @click="handleSeeAttr(userRank)"
            :style="{ color: sex == 0 ? '#04118E' : '' }"
            >>></span
          >
        </div>
      </template>
      <!-- 未报名 -->
      <img
        v-else
        class="open__btn"
        @click="handleSign"
        :src="sex == 0 ? images.sign : images.woman_sign"
      />
    </div>

    <ContributeDialog
      v-if="showContributeDialog"
      :visible.sync="showContributeDialog"
      :uid="uid"
      :nick="nick"
    />
  </div>
</template>

<script>
import callApp from "../utils/callApp";
import ContributeDialog from "./ContributeDialog";
import { register } from "../apis";
import { mapState } from "vuex";
import { toast } from "../utils";

export default {
  name: "RankList",

  props: {
    list: {
      required: true,
    },
    sex: {
      required: true,
    },
    userRank: {
      required: true,
    },
  },

  components: {
    ContributeDialog,
  },

  computed: {
    ...mapState(["initData"]),
    showFixed() {
      if (this.initData.step != 2 && !this.initData.reg) {
        return true;
      }
      if (this.initData.reg && this.initData.userInfo.sex == this.sex) {
        return true;
      }
      return false;
    },
  },

  data() {
    return {
      showContributeDialog: false,
      uid: "",
      nick: "",
    };
  },

  methods: {
    async handleSign() {
      let res = await register();
      let { response_status, response_data } = res.data;
      if (response_status.code === 0) {
        this.$store.dispatch("initData");
      } else {
        toast(response_status.error);
      }
    },

    goHomepage(uid) {
      if (uid) {
        callApp.userInfo(uid);
      }
    },

    goParty(rid) {
      callApp.room(rid);
    },

    joinParty() {
      callApp.voiceChatpage();
    },

    getBrHtml(text) {
      if (!text) {
        return;
      }
      return text.replace(/\n/g, "<br>");
    },

    handleRank(rank) {
      return rank > 100 ? "100+" : rank;
    },

    handleSeeAttr(item) {
      this.uid = item.uid;
      this.nick = item.nick;
      this.showContributeDialog = true;
    },
  },
};
</script>

<style lang="scss">
.rank_list {
  margin-top: 0.12rem;
  .list__item:nth-child(1),
  .list__item:nth-child(2),
  .list__item:nth-child(3) {
    .rank {
      font-size: 0;
      position: relative;
      margin-right: 0.4rem;
    }
    .attr::before {
      width: 6.95rem;
      height: 0.02rem;
      content: "";
      position: absolute;
      top: 0;
      background: url("../img/top3_attr_liner.png") 0/100% 100% no-repeat;
    }
  }
  .list__item:nth-child(1) {
    .rank::before {
      content: "";
      width: 1.07rem;
      height: 1.07rem;
      position: absolute;
      background: url("../img/rank_1.png") 0/1.07rem 1.07rem no-repeat;
      left: 0.1rem;
      top: 0.2rem;
    }
  }
  .list__item:nth-child(2) {
    .rank::before {
      content: "";
      width: 1.07rem;
      height: 1.07rem;
      position: absolute;
      background: url("../img/rank_2.png") 0/1.07rem 1.07rem no-repeat;
      left: 0.1rem;
      top: 0.2rem;
    }
  }
  .list__item:nth-child(3) {
    .rank::before {
      content: "";
      width: 1.07rem;
      height: 1.07rem;
      position: absolute;
      background: url("../img/rank_3.png") 0/1.07rem 1.07rem no-repeat;
      left: 0.1rem;
      top: 0.2rem;
    }
  }
  .man_top3_list {
    background: url("../img/man_top3_bg.png") 0/100% 100% no-repeat !important;
  }
  .woman_top3_list {
    background: url("../img/woman_top3_bg.png") 0/100% 100% no-repeat !important;
  }
  .list__item {
    width: 6.96rem;
    height: 1.75rem;
    background: url("../img/rest_item_bg.png") 0/100% 100% no-repeat;
    display: flex;
    margin: 0 auto 0.11rem auto;
    position: relative;
    .rank {
      width: 0.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.26rem;
      font-weight: 400;
      font-style: italic;
      color: #fee0ff;
      margin-right: 0.23rem;
    }
    .avatar__box {
      width: 1.01rem;
      height: 1.01rem;
      border-radius: 50%;
      background: RGBA(254, 228, 255, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 0.12rem;
      .avatar {
        width: 0.95rem;
        height: 0.95rem;
        border-radius: 50%;
        border-radius: 50%;
        box-sizing: border-box;
      }
    }
    .nick__box {
      padding-left: 0.23rem;
      padding-top: 0.28rem;
      font-size: 0.26rem;
      font-weight: 400;
      color: #fff;
      width: 2rem;
      height: 0.4rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .score__box {
      display: flex;
      align-items: center;
      padding-left: 0.23rem;
      img {
        width: 0.34rem;
        height: 0.29rem;
      }
      .score {
        margin-left: 0.07rem;
        font-size: 0.32rem;
        font-weight: 500;
        color: #ffdf76;
      }
    }
    .party {
      width: 1.76rem;
      height: 0.55rem;
      margin-top: 0.43rem;
      margin-left: 0.3rem;
    }
    .attr {
      width: 6.18rem;
      height: 0.5rem;
      position: absolute;
      right: 0;
      bottom: 0.02rem;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .fan__avatar {
        width: 0.38rem;
        height: 0.38rem;
        border-radius: 50%;
        box-sizing: border-box;
        border: 0.02rem solid RGBA(254, 228, 255, 1);
        margin-left: 0.04rem;
      }
      .arrow {
        font-size: 0.2rem;
        font-weight: 400;
        color: #ffdf76;
        padding-right: 0.46rem;
        padding-left: 0.11rem;
      }
      .title {
        font-size: 0.2rem;
        font-weight: 400;
        color: #ffdf76;
        padding-right: 0.1rem;
      }
    }
    .attr::before {
      width: 6.18rem;
      height: 0.01rem;
      content: "";
      position: absolute;
      top: 0;
      background: url("../img/rest_attr_liner.png") 0/100% 100% no-repeat;
    }
    .active {
      width: 1rem;
      height: 0.36rem;
      position: absolute;
      top: 0.01rem;
      right: 0.01rem;
    }
  }

  .man_fixed {
    background: url("../img/man_fixed_info.png") 0/100% 100% no-repeat;
  }
  .woman_fixed {
    background: url("../img/woman_fixed_info.png") 0/100% 100% no-repeat;
  }
  .fixed__bottom {
    width: 7.5rem;
    height: 1.68rem;
    display: flex;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    box-sizing: border-box;
    z-index: 80;

    .rank {
      width: 0.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.26rem;
      font-weight: 400;
      font-style: italic;
      color: #fee0ff;
      margin-right: 0.23rem;
    }
    .avatar__box {
      width: 1.01rem;
      height: 1.01rem;
      border-radius: 50%;
      background: RGBA(254, 228, 255, 1);
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
      padding-left: 0.23rem;
      padding-top: 0.24rem;
      font-size: 0.26rem;
      font-weight: 400;
      color: #4b1d93;
      width: 2rem;
      height: 0.4rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .score__box {
      display: flex;
      align-items: center;
      padding-left: 0.23rem;
      img {
        width: 0.34rem;
        height: 0.29rem;
      }
      .score {
        margin-left: 0.07rem;
        font-size: 0.32rem;
        font-weight: 500;
        color: #5ee1f5;
      }
    }
    .party {
      width: 1.88rem;
      height: 0.57rem;
      margin-top: 0.3rem;
      margin-left: 0.9rem;
    }
    .attr {
      width: 6.18rem;
      height: 0.5rem;
      position: absolute;
      right: 0;
      bottom: 0.02rem;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .fan__avatar {
        width: 0.38rem;
        height: 0.38rem;
        border-radius: 50%;
        box-sizing: border-box;
        border: 0.02rem solid RGBA(254, 228, 255, 1);
        margin-left: 0.04rem;
      }
     .arrow {
        font-size: 0.2rem;
        font-weight: 400;
        color: #ffdf76;
        padding-right: 0.46rem;
        padding-left: 0.11rem;
      }
      .title {
        font-size: 0.2rem;
        font-weight: 400;
        color: #ffdf76;
        padding-right: 0.1rem;
      }
    }
    .attr::before {
      width: 6.695rem;
      height: 0.01rem;
      content: "";
      position: absolute;
      top: 0;
      background: url("../img/top3_attr_liner.png") 0/100% 100% no-repeat;
    }
    .active {
      width: 1rem;
      height: 0.36rem;
      position: absolute;
      top: 0.01rem;
      right: 0.01rem;
    }

    .open__btn {
      width: 3.35rem;
      height: 0.97rem;
      display: block;
      margin: 0.35rem auto;
    }
  }
}
</style>