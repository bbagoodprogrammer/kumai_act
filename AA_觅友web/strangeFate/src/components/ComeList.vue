<template>
  <div class="page comeList pageRecore">
    <header-nav :title="type==1?lang.befall_title:lang.bless_title" />
    <p class="tips">{{ lang.come_list_tips }}</p>
    <div class="record">
      <div class="record_title"></div>
      <div class="rank_list scrollable">
        <inner-scroll-load-list :url="url" :parse="proDataParse">
          <div slot-scope="{ list, loading, none, end }">
            <charm-item
              v-for="(item, index) in list"
              :info="item"
              :key="index"
            />
            <div v-show="loading" class="sloading_inner">
              {{ lang.loading }}
            </div>
            <div v-show="none" class="snone_inner"></div>
            <!-- <div v-show="end" class="send_inner">--已加載完全部數據--</div> -->
            <div v-show="end" class="send_inner"></div>
          </div>
        </inner-scroll-load-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import HeaderNav from "./headerNav";
import InnerScrollLoadList from "./InnerScrollLoadList";
import { getUrlString } from "../utils";
import FateItem from "./FateItem";
import CharmItem from "./CharmItem";
const lang = getUrlString("lang");
export default {
  data() {
    return {
      type: 0,
      owner: {},
    };
  },
  mounted() {},
  computed: {
    ...mapState([]),
    url() {
      return (
        "/index.php?action=Action/StrangeFate.getRoomUserRankList&page={page}&from={from}&rid={rid}&uid={uid}&token={token}&lang={lang}&status=" +
        this.type
      );
    },
  },
  created() {
    this.type = this.$route.query.status;
  },
  methods: {
    getNum(i) {
      return require("../img/x" + i + ".png");
    },
    proDataParse(data) {
      if (!data.response_status.code) {
        return data.response_data.list || [];
      } else {
        return [];
      }
    },
  },
  components: {
    HeaderNav,
    InnerScrollLoadList,
    FateItem,
    CharmItem,
  },
};
</script>

<style lang="scss">
.comeList {
  color: #fff;
  width: 100%;
  height: 9.39rem;
  background: #332d88;
  position: relative;
  border-radius: 0.3rem 0.3rem 0 0;
  .tips {
    padding: 0.1rem 0.3rem;
    line-height: 0.4rem;
    color: hsla(0, 0%, 100%, 0.6);
    text-align: left;
    font-size: 0.24rem;
  }
  .rankItem {
    font-size: 0;
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    box-sizing: border-box;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 0 0.3rem 0.2rem;
    .right {
      // width: 3.9rem;
      p {
        &:first-of-type {
          line-height: 0.33rem;
          color: hsla(0, 0%, 100%, 0.6);
          font-size: 0.24rem;
        }
        &:nth-of-type(2) {
          font-size: 0.28rem;
          color: #fff;
          line-height: 0.46rem;
        }
      }
    }
    .left {
      span {
        display: inline-block;
        height: 1.2rem;
        position: relative;
        img {
          height: 100%;
        }
        i {
          position: absolute;
          z-index: 1;
          width: 0.5rem;
          height: 0.28rem;
          top: 0;
          right: 0;
          img {
            width: 100%;
            height: 100%;
          }
        }
        &:first-of-type {
          margin-right: 0.2rem;
        }
      }
    }
  }
  .rank_tips {
    font-size: 0.22rem;
    color: #ffe5a0;
    text-align: right;
    padding: 0 0.6rem 0.17rem 0;
  }
  .scrollable {
    height: 8.5rem;
    overflow: auto;
    margin: 0 auto;
  }
  .snone_inner {
    width: 5rem;
    height: 5rem;
    background: url("../img/no_data.png") no-repeat;
    background-size: 100% 100%;
    margin: 0 auto;
    box-sizing: border-box;
  }
  .owner {
    width: 7.5rem;
    height: 1.4rem;
    background: #6253c7;
    opacity: 1;
    position: absolute;
    bottom: 0;
  }
}
.record .send_inner,
.record .sloading_inner {
  text-align: center;
  font-size: 0.24rem;
  color: #fff;
  padding-top: 0.4rem;
}
</style>