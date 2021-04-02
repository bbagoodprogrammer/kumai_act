<template>
  <div class="comeList">
    <HeaderNav :title="type==1?lang.befall_title:lang.bless_title" />
    <p class="tips">{{lang.come_list_tips}}</p>
    <div class="record1">
      <div class="record_title"></div>
      <div class="rank_list scrollable">
        <inner-scroll-load-list
          :url=url
          :parse="proDataParse"
        >
          <div slot-scope="{list, loading, none, end}">
            <top-item v-for="(item,index) in list" :info="item" :key="index" />
            <div v-show="loading" class="sloading_inner">{{lang.loading}}</div>
            <div v-show="none" class="snone_inner">{{lang.come_no_data}}</div>
            <div v-show="end" class="send_inner">{{lang.end_data}}</div>
          </div>
        </inner-scroll-load-list>
      </div>
      <loading :show="loading" />
    </div>
    <!-- <div class="owner">
      <owner-item :info="owner" />
    </div> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import Loading from "../components/common/Loading";
import { getUrlString } from "../utils";
import InnerScrollLoadList from "../components/InnerScrollLoadList";
import TopItem from "../components/TopItem";
import OwnerItem from "../components/OwnerItem";
import HeaderNav from "../components/HeaderNav";

const uid = getUrlString("uid");
const token = getUrlString("token");
const lang = getUrlString("lang");
const status = getUrlString("status");

export default {
  data() {
    return {
      langs: lang,
      type: 0,
      owner: {},
    };
  },
  created(){
    this.type = this.$route.query.status;
  },
  computed: {
    ...mapState(["loading"]),
    url(){
      return "/index.php?action=Action/StrangeFate.getRoomUserRankList&uid={uid}&from={from}&token={token}&rid=1002&lang=zh-CN&status="+this.type+"&page={page}";
    }
  },
  mounted() {

  },
  methods: {
    proDataParse(data) {
      return data.response_data.list || [];
    }
  },
  components: {
    Loading,
    InnerScrollLoadList,
    TopItem,
    OwnerItem,
    HeaderNav
  }
};
</script>

<style lang="scss">
.comeList {
  color: #fff;
  width: 100%;
  height: 9.4rem;
  background: #332d88;
  position: relative;
  .tips {
    padding: 0.1rem 0.3rem 0.1rem 0.3rem;
    line-height: 0.4rem;
    color: rgba(255, 255, 255, 0.6);
    text-align: left;
    font-size: 0.24rem;
  }
  .scrollable {
    height: 6.24rem;
    overflow: auto;
    margin: 0 auto;
    padding-bottom: 0.5rem;
    box-sizing: border-box;
  }
  .sloading_inner,
  .snone_inner,
  .send_inner {
    text-align: center;
    font-size: 0.24rem;
    color: #fff;
    padding-top: 0.4rem;
  }
  .snone_inner {
    padding-top: 1rem;
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
</style>
