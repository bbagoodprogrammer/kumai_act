<template>
  <div class="record">
    <HeaderNav :title="lang.record_title" />
    <div class="record">
      <div class="record_title"></div>
      <div class="rank_list scrollable">
        <inner-scroll-load-list
          url="/index.php?action=Action/StrangeFate.getMyRecord&page={page}&from={from}&uid={uid}&token={token}"
          :parse="proDataParse"
        >
          <div slot-scope="{list, loading, none, end}">
            <record-item v-for="(item,index) in list" :info="item" :key="index" />
            <div v-show="loading" class="sloading_inner">{{lang.loading}}</div>
            <div v-show="none" class="snone_inner">{{lang.no_data}}</div>
            <div v-show="end" class="send_inner">{{lang.end_data}}</div>
          </div>
        </inner-scroll-load-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Loading from "../components/common/Loading";
import { getUrlString } from "../utils";
import InnerScrollLoadList from "../components/InnerScrollLoadList";
import recordItem from "../components/recordItem";
import OwnerItem from "../components/OwnerItem";
import HeaderNav from "../components/HeaderNav";

const uid = getUrlString("uid");
const token = getUrlString("token");
const lang = getUrlString("lang");
export default {
  data() {
    return {
      langs: lang,
      owner:{},
    };
  },
  computed: {
    ...mapState(["loading", "coverRank"])
  },
  async mounted() {},
  methods: {
    proDataParse(data) {
        this.owner = data.response_data.my_rank;
      return data.response_data.list || [];
    },
  },
  components: {
    Loading,
    InnerScrollLoadList,
    recordItem,
    OwnerItem,
    HeaderNav
  }
};
</script>

<style lang="scss">
.record {
  color: #fff;
  width: 100%;
  height: 9.4rem;
  background: #332d88;
  position: relative;
  .scrollable {
    height: 8.5rem;
    overflow: auto;
    margin: 0 auto;
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
    padding-top: 2rem;
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
