<template>
  <div class="not_open_container">
    <ul class="list__main">
      <li class="list__item" v-for="(item, index) in list" :key="index">
        <div class="title" v-html="getTitle(lang.not_open_title, item)"></div>
        <div class="boxs">
          <div class="box">
            <div v-if="item.notOpenCount > 1" class="num">
              {{ item.notOpenCount }}
            </div>
          </div>
          <div class="btn" @click="handleOpen(item)">{{ lang.open }}</div>
        </div>
      </li>
      <div v-if="list.length == 0" class="scrollNone">{{ lang.not_data }}</div>
    </ul>

    <SvgaDialog
      :visible.sync="showSvgaDialog"
      v-if="showSvgaDialog"
      @end="showGetDialog = true"
    />

    <GetDialog
      :visible.sync="showGetDialog"
      v-if="showGetDialog"
      :prizes="prizes"
    />
  </div>
</template>

<script>
import GetDialog from "./GetDialog";
import SvgaDialog from "./SvgaDialog";
import { toast } from "../utils";
import { notOpenBlindBox, openBlindBox } from "../apis";
export default {
  name: "NotOpenBox",

  data() {
    return {
      list: [],
      prizes: [],
      showGetDialog: false,
      showSvgaDialog: false,
    };
  },

  components: {
    GetDialog,
    SvgaDialog,
  },

  watch:{
    showGetDialog(val) {
      if (!val) {
         this.fetchData();
      }
    }
  },

  created() {
    document.body.style.overflow = "hidden";
    this.fetchData();
  },

  beforeDestroy() {
    document.body.style.overflow = "";
  },

  methods: {
    async fetchData() {
      let res = await notOpenBlindBox();
      let { response_status, response_data } = res.data;
      if (response_status.code === 0) {
        this.list = response_data.list;
      } else {
        toast(response_status.error);
      }
    },

    async handleOpen(item) {
      let res = await openBlindBox({ fuid: item.uid });
      let { response_status, response_data } = res.data;
      if (response_status.code === 0) {
        // this.prizes = response_data.prizes;
        // this.showSvgaDialog = true;
        this.$parent.handleCloseDialog(response_data.prizes)
      } else {
        toast(response_status.error);
      }
    },

    getTitle(text, item) {
      return text
        .replace("{0}", `<span class="nick">${item.nick}</span>`)
        .replace("{1}", item.allCount)
        .replace("{2}", item.notOpenCount);
    },

    getBrHtml(text) {
      if (!text) {
        return;
      }
      return text.replace(/\n/g, "<br>");
    },
  },
};
</script>

<style lang="scss">
.not_open_container {
  padding-top: 0.4rem;
  .list__main {
    width: 100%;
    height: 5rem;
    overflow: auto;
    .list__item {
      .title {
        padding: 0 0.7rem 0 0.7rem;
        font-size: 0.24rem;
        font-weight: 400;
        color: #ffffff;
        line-height: 0.31rem;
        // display: flex;
        // flex-wrap: wrap;
        .nick {
          max-width: 1.2rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .boxs {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 0.29rem;
        margin-bottom: 0.34rem;
        .box {
          width: 0.87rem;
          height: 1.31rem;
          background: url("../img/sur_box_2.png") 0/100% 100% no-repeat;
          margin-left: 1.03rem;
          position: relative;
          .num {
            width: 0.4rem;
            height: 0.4rem;
            background: url("../img/num_dot.png") 0/100% 100% no-repeat;
            position: absolute;
            right: -0.25rem;
            bottom: 0.14rem;
            font-size: 0.22rem;
            font-weight: 400;
            color: #ffffff;
            text-align: center;
            line-height: 0.4rem;
          }
        }
        .btn {
          width: 1.29rem;
          height: 0.47rem;
          background: url("../img/open_btn.png") 0/100% 100% no-repeat;
          margin-right: 0.81rem;
          text-align: center;
          line-height: 0.47rem;
          font-size: 0.24rem;
          font-weight: 400;
          color: #ffffff;
        }
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