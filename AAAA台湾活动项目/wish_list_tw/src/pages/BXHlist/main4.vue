<template>
  <div class="BXHlist">
    <div class="tabs">
      <span class="tab1" @click="changTab('tab1')" :class="{actTab:showTab == 'tab1'}">送出心願榜</span>
      <span class="tab2" @click="changTab('tab2')" :class="{actTab:showTab == 'tab2'}">被完成心願榜</span>
    </div>
    <p class="tips1" v-if="showTab == 'tab1'">
      該榜單僅展示送出心願最多的前100名！
    </p>
    <p class="tips1" v-else>
      該榜單僅展示收到心願最多的前100名！
    </p>
    <p class="tips2" v-show="showTab == 'tab1'">
      送出心願值=送出的心願作品數+心願者回饋的滿意分
    </p>
    <p class="tips2" v-show="showTab == 'tab2'">
      被完成心願值=收到的心願作品數
    </p>
    <component :is="showTab"></component>
    <loading></loading>
    <div class="footer">
      <div class="box">
        <div class="imgBox">
          <img v-lazy="userMsg.avatar" alt="">
        </div>
        <div class="userMsg">
          <div class="name">{{userMsg.nick}}</div>
          <div class="id">{{userMsg.uid}}</div>
        </div>
        <div class="score" v-if="userMsg.bad && showTab == 'tab1'">
          已退出比賽
        </div>
        <div class="score" v-else-if="showTab == 'tab1'">
          送出: <em>{{userMsg.score}}</em><i></i>
        </div>
        <div class="score" v-else>
          收到: <em>{{userMsg2.score}}</em>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import tab1 from './Tab1'
import tab2 from './Tab2'
import api from "../../api/apiConfig"
import { mapState } from 'vuex'
import loading from "../../components/Loading"

export default {
  components: { tab1, tab2, loading },
  data() {
    return {
      showTab: 'tab1',
      userMsg: {},
      userMsg2: {}
    }
  },
  computed: {
    ...mapState(['rankList2'])
  },
  created() {
    api.hearList('1', 0).then(res => {
      this.userMsg = res.data.response_data.owner
      this.$store.commit('changRanklist1', res.data.response_data.list)
    })
  },
  methods: {
    changTab(tab) {
      if (tab == 'tab2' && !this.rankList2.owner) {
        api.hearList('2', 0).then(res => {
          this.userMsg2 = res.data.response_data.owner
          this.$store.commit('changRanklist2', res.data.response_data)
        })
      }
      this.showTab = tab
    }
  }
}
</script>
<style lang="scss">
body {
  background: #2d0080;
  .BXHlist {
    padding: 0.43rem 0.31rem 0;
    .tabs {
      width: 6.73rem;
      height: 0.95rem;
      background: url(../../assets/img/tabsBg.png);
      background-size: 100% 100%;
      display: flex;
      span {
        display: inline-block;
        width: 3.56rem;
        height: 0.75rem;
        color: #a739da;
        font-size: 103%;
        line-height: 0.75rem;
        text-align: center;
        transition: all 0.2s;
        &.actTab {
          color: #fefefe;
          font-size: 113%;
          background: url(../../assets/img/avtTab.png);
          background-size: 100% 100%;
        }
        &.tab1 {
          margin: 0.1rem 0 0 0.1rem;
        }
        &.tab2 {
          margin: 0.1rem 0.12rem 0 0;
        }
      }
    }
    .footer {
      height: 2.03rem;
      background: url(../../assets/img/footerBg.png);
      background-size: 100% 100%;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      .box {
        display: flex;
        align-items: center;
        margin-top: 0.7rem;
        .imgBox {
          width: 1.25rem;
          height: 1.25rem;
          background: url(../../assets/img/nanBg.png);
          background-size: 100% 100%;
          margin-left: 0.5rem;
          img {
            width: 1.07rem;
            height: 1.07rem;
            border-radius: 50%;
            margin: 0.08rem 0.08rem;
          }
          &.nv {
            background: url(../../assets/img/nvBg.png);
            background-size: 100% 100%;
          }
        }
        .userMsg {
          width: 3.3rem;
          margin-left: 0.2rem;
          color: #fffde3;
          font-size: 113%;
          .name {
            max-width: 3.5rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .score {
          font-size: 93%;
          color: #fcf872;
          display: flex;
          align-items: center;
          em {
            font-size: 160%;
            font-weight: 600;
            margin: 0 0.15rem;
          }
          i {
            display: block;
            width: 0.54rem;
            height: 0.49rem;
            background: url(../../assets/img/xin3.png);
            background-size: 100% 100%;
          }
        }
      }
    }
    .tips1 {
      font-size: 70%;
      color: #1dfadf;
      text-align: center;
      margin-top: 0.3rem;
    }
    .tips2 {
      font-size: 70%;
      color: #e8b7ff;
      text-align: center;
      margin-top: 0.25rem;
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
