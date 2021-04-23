<template>
  <div class="family__list">
    <div class="con_title__box">
      <div class="con_title">{{ lang.family_list }}</div>
    </div>

    <div class="condition__box">
      <div class="input__box">
        <img src="../img/search_icon.png" alt="" />
        <input
          :placeholder="lang.placeholder"
          type="number"
          v-model="searchUid"
        />
      </div>
      <div class="search__btn" @click="handleUrl()">{{ lang.search }}</div>
      <div class="text" @click="handleNum()">{{ lang.people_num }}</div>
      <img class="sort_icon" src="../img/sort_icon.png" alt="" />
      <div class="text" @click="handleDate()">{{ lang.make_date }}</div>
      <img class="sort_icon" src="../img/sort_icon.png" alt="" />
    </div>

    <InnerScrollLoadList class="list__main" :url="url" :parse="parse">
      <template slot-scope="{ list, loading, none }">
        <ul>
          <li class="list__item" v-for="(item, index) in list" :key="index">
            <div class="cover__box">
              <img class="cover" :src="item.avatar" />
            </div>

            <div class="info_middle" @click="seeFamilyIntro(item)">
              <div class="name">{{ item.name }}</div>
              <div class="nick">
                {{ lang.patriarch.replace("%s", item.patriarch) }}
              </div>
              <div class="count__box">
                <img src="../img/person_icon.png" alt="" />
                {{ lang.group_num.replace("%s", item.count) }}
              </div>
            </div>

            <div class="btn" v-if="item.count < initData.maxNumber" @click="handleJoin(item)">
              {{ lang.join }}
            </div>
            <div class="full__btn" v-else>{{ lang.full_starffed }}</div>
          </li>
        </ul>
        <div v-if="loading" class="scrollLoading">{{ lang.loading }}</div>
        <div v-if="none && !searchUid" class="scrollNone">{{ lang.not_data }}</div>
        <div v-if="none && searchUid" class="scrollNone">{{ lang.not_friend_family }}</div>
      </template>
    </InnerScrollLoadList>

    <div class="list_join" @click="jumpMakeFamily">
      {{ lang.make_family }}
    </div>

    <FamilyIntro
      v-if="showFamilyIntroDialog"
      :visible.sync="showFamilyIntroDialog"
      :familyId="info.familyId"
    />

    <ApplyDialog
      v-if="showApplyDialog"
      :visible.sync="showApplyDialog"
      :familyId="selectFamily.familyId"
      :name="selectFamily.name"
    />

    <MakeFamily v-if="showMakeFamily" :visible.sync="showMakeFamily" />

    <img
      class="refresh"
      :class="{ rotate: refreshing }"
      @click="onRefresh"
      src="../img/refresh.png"
    />
  </div>
</template>

<script>
import Api from "../apis/api";
import { toast } from "../utils";
import callApp from "../utils/callApp";
import FamilyIntro from "../components/FamilyIntro";
import InnerScrollLoadList from "../components/common/InnerScrollLoadList";
import ApplyDialog from "../components/ApplyDialog";
import MakeFamily from "../components/MakeFamily";
import { mapState } from "vuex";
export default {
  name: "FamilyList",

  components: {
    InnerScrollLoadList,
    FamilyIntro,
    ApplyDialog,
    MakeFamily,
  },

  computed: {
    ...mapState(["initData"]),
  },

  data() {
    return {
      showFamilyIntroDialog: false,
      showComfirmDialog: false,
      info: {},
      url: "",
      searchUid: "",
      orderBy: "count",
      sort: "DESC",
      refreshing: false,
      selectFamily: {},
      showApplyDialog: false,
      showMakeFamily: false,
    };
  },

  created() {
    this.url = Api.familyList;
  },

  methods: {
    goHomepage(uid) {
      callApp.userInfo(uid);
    },

    parse(data) {
      const { response_status, response_data } = data;
      if (response_status && response_status.error === "") {
        return response_data.list;
      } else {
        const { error } = response_status;
        if (error) {
          toast(error);
        }
      }
      return [];
    },

    handleUrl() {
      if (this.searchUid) {
        this.url =
          Api.familyList +
          `&search=${this.searchUid}&orderBy=${this.orderBy}&sort=${this.sort}`;
      } else {
        this.url =
          Api.familyList +
          `&orderBy=${this.orderBy}&sort=${this.sort}&t=${Date.now()}`;
      }
    },

    handleNum() {
      if (this.orderBy == "count") {
        this.sort = this.sort == "ASC" ? "DESC" : "ASC";
      } else {
        this.orderBy = "count";
      }
      this.handleUrl();
    },

    handleDate() {
      if (this.orderBy == "time") {
        this.sort = this.sort == "ASC" ? "DESC" : "ASC";
      } else {
        this.orderBy = "time";
      }
      this.handleUrl();
    },

    onRefresh() {
      this.refreshing = true;
      setTimeout(() => {
        this.refreshing = false;
      }, 800);
      this.searchUid = "";
      this.orderBy = "count";
      this.sort = "DESC";
      this.$nextTick(this.handleUrl());
    },

    handleJoin(item) {
      this.selectFamily = item;
      this.showApplyDialog = true;
    },

    seeFamilyIntro(item) {
      this.info = item;
      this.showFamilyIntroDialog = true;
    },

    jumpMakeFamily() {
      this.showMakeFamily = true;
    },

    getBrHtml(text) {
      if (!text) {
        return "";
      }
      return text.replace("%s", "<br>");
    },

    handleCloseDialog() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
}
.family__list {
  width: 100%;
  height: 100%;
  background: RGBA(29, 14, 82, 1);
  display: flex;
  flex-direction: column;

  .con_title {
    display: inline-block;
    font-size: 0.34rem;
    color: #e4bd68;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 0.51rem;
  }
  .con_title::before {
    content: "";
    width: 1.94rem;
    height: 0.16rem;
    position: absolute;
    left: -2.06rem;
    background-image: url("../img/title_left.png");
    background-size: 100% 100%;
    top: 50%;
    transform: translateY(-50%);
  }
  .con_title::after {
    content: "";
    width: 1.94rem;
    height: 0.16rem;
    position: absolute;
    right: -2.06rem;
    background-image: url("../img/title_right.png");
    background-size: 100% 100%;
    top: 50%;
    transform: translateY(-50%);
  }

  .condition__box {
    display: flex;
    align-items: center;
    margin-top: 0.38rem;
    margin-bottom: 0.46rem;
    .input__box {
      width: 3.64rem;
      height: 0.48rem;
      background: RGBA(15, 4, 61, 1);
      display: flex;
      align-items: center;
      margin-left: 0.32rem;
      img {
        width: 0.22rem;
        height: 0.22rem;
        margin-left: 0.16rem;
        margin-right: 0.14rem;
      }
      input {
        background: transparent;
        font-size: 0.22rem;
        font-weight: 400;
        color: #6e55ff;
        border: none;
        flex: 1;
      }
      input::-webkit-input-placeholder {
        color: #6e55ff;
        font-size: 0.22rem;
      }
      input::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #6e55ff;
        font-size: 0.22rem;
      }
      input:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #6e55ff;
        font-size: 0.22rem;
      }
      input:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: #6e55ff;
        font-size: 0.22rem;
      }
    }
    .search__btn {
      width: 0.86rem;
      height: 0.48rem;
      background: #bd935c;
      border-radius: 0.06rem;
      font-size: 0.22rem;
      font-weight: 400;
      color: #ffffff;
      line-height: 0.48rem;
      margin-left: 0.13rem;
      margin-right: 0.22rem;
      text-align: center;
    }
    .text {
      font-size: 0.22rem;
      font-weight: 400;
      text-decoration: underline;
      color: #24c5f3;
    }
    .sort_icon {
      width: 0.13rem;
      height: 0.18rem;
      margin-left: 0.05rem;
      margin-right: 0.19rem;
    }
  }

  .list__main {
    flex: 1;
    overflow: auto;
    .list__item {
      display: flex;
      align-items: center;
      margin-bottom: 0.2rem;
      .cover__box {
        width: 1.16rem;
        height: 1.14rem;
        background: url("../img/cover_box.png") 0/100% 100% no-repeat;
        display: flex;
        justify-content: center;
        margin-left: 0.27rem;
        .cover {
          width: 0.9rem;
          height: 0.9rem;
          margin-top: 0.16rem;
        }
      }
      .info_middle {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 0.2rem;
        .name {
          font-size: 0.26rem;
          font-weight: 400;
          color: #e9faf9;
          width: 3rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .nick {
          font-size: 0.22rem;
          font-weight: 400;
          color: #c3e5e3;
          width: 3rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin-top: 0.09rem;
        }
        .count__box {
          font-size: 0.22rem;
          font-weight: 400;
          color: #24f3ec;
          margin-top: 0.1rem;
          img {
            width: 0.27rem;
            height: 0.26rem;
          }
        }
      }
      .btn {
        width: 1.83rem;
        height: 0.78rem;
        background: url("../img/list_join_btn.png") 0/100% 100% no-repeat;
        text-align: center;
        margin-right: 0.25rem;
        font-size: 0.28rem;
        font-weight: bold;
        color: #7a2a10;
        line-height: 0.78rem;
      }
      .full__btn {
        @extend .btn;
        background: url("../img/list_full_btn.png") 0/100% 100% no-repeat;
        color: #fff;
      }
    }
  }

  .list_join {
    width: 3.26rem;
    height: 0.83rem;
    background: url("../img/dialog_btn.png");
    background-size: 100% 100%;
    font-size: 0.3rem;
    font-weight: bold;
    color: #7a2a10;
    line-height: 0.83rem;
    text-align: center;
    margin: 0.3rem auto 0.5rem auto;
  }

  .scrollLoading,
  .scrollNone {
    text-align: center;
    color: #ffffff;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    font-size: 0.26rem;
  }
  .scrollNone {
    padding-top: 0.6rem;
  }

  .refresh {
    width: 0.94rem;
    height: 0.94rem;
    position: fixed;
    right: 0.2rem;
    bottom: 2rem;
    z-index: 300;
  }
  .rotate {
    //animation: rotate 1s ease;
    animation: rotate 0.8s linear infinite;
  }
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(1080deg);
    }
  }
}
</style>