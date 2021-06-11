<template>
  <div class="list__container">
    <div class="navigator">
      <img class="arrow" @click="$router.go(-1)" src="../img/arrow.png" />
      {{ lang.adventure_list }}
      <div @click.stop="showAwardTip = !showAwardTip" class="weekly_award">
        {{lang.weekly_award}}
        <img src="../img/explain.png" />
      </div>
    </div>

    <!-- tab -->
    <div class="tabs">
      <div @click="mainTabClick(0)" class="tab" :class="{tab_select: mainTab == 0}">{{lang.this_week}}</div>
      <div @click="mainTabClick(1)"  class="tab" :class="{tab_select: mainTab == 1}">{{lang.last_week}}</div>
    </div>

    <div class="list__main" :class="{list__main_padding: mainTab == 0}">
      <ul>
        <li v-for="(item, index) in list" :key="index">
          <div class="rank">{{item.ranking}}</div>
          <div class="avatar">
            <img @click="goProfile(item.uid)" v-lazy="item.avatar_medium" />
          </div>
          <div class="middle__box">
            <div class="nick">
              <span>{{item.nick}}</span>
              <img v-if="item.sex == 0" src="../img/male.png" />
              <img v-else src="../img/female.png" />
            </div>
            <div class="model">
              <img v-for="(img, imgIndex) in item.medal" :key="imgIndex" class="model__img" :src="img" />
              <img v-if="item.isAdventureKing" class="explore_model__img" :src="images.explore_model" />
            </div>
          </div>
          <div class="value">{{lang.list_adventure_value.replace('%s', item.adventureNum || 0)}}</div>
        </li>
      </ul>
      <div class="not_data" v-if="list.length == 0 && loadEnd">{{lang.not_data}}</div>
    </div>

    <!-- fixed -->
    <div v-if="mainTab == 0" class="fixed__box">
      <div v-if="userHuntInfo.ranking <= 50 && userHuntInfo.ranking != 0" class="rank">{{userHuntInfo.ranking}}</div>
      <div v-else class="rank">——</div>
      <div class="avatar">
        <img v-lazy="userHuntInfo.avatar_medium" />
      </div>
      <div class="middle__box">
        <div class="nick">
          <span>{{userHuntInfo.nick}}</span>
          <img v-if="userHuntInfo.sex == 0" src="../img/male.png" />
          <img v-else src="../img/female.png" />
          <div class="value">{{lang.list_adventure_value.replace('%s', userHuntInfo.adventureNum || 0)}}</div>
        </div>
        <div class="middle_buttom">
          <div class="model">
            <img v-for="(img, imgIndex) in userHuntInfo.medal" :key="imgIndex" class="model__img" :src="img" />
          </div>
          <!-- 距离上一名 --><!--v-if="userHuntInfo.ranking != 1"-->
          <div v-if="userHuntInfo.ranking != 1" class="distance__box">
            {{lang.distance_last.replace('%s', userHuntInfo.preUserDValue || '')}}
            <img class="arrow_up" src="../img/arrow_up.png" />
          </div>
        </div>
      </div>
    </div>

    <!-- 每周奖励 -->
    <div v-if="showAwardTip" @click.stop class="award__box">
      <div class="award">
        <div class="title">{{lang.weekly_award_title}}</div>
        <div class="rank">
          <div class="num">{{lang.adventure_first}}</div>
          <div class="des">{{lang.adventure_first_des}}</div>
        </div>
        <div class="imgs">
          <img :src="images.award_3" />
          <img src="../img/award_1.png" />
          <img src="../img/award_2.png" />
          <img src="../img/award_4.png" />
        </div>
        <div class="rank">
          <div class="num">{{lang.adventure_second}}</div>
          <div class="des">{{lang.adventure_second_des}}</div>
        </div>
        <div class="imgs">
          <img src="../img/award_1.png" />
          <img src="../img/award_4.png" />
        </div>
        <div class="rank">
          <div class="num">{{lang.adventure_rest}}</div>
          <div class="des">{{lang.adventure_rest_des}}</div>
        </div>
        <div class="imgs">
          <img src="../img/award_4.png" />
        </div>
      </div>
    </div>

    <Loading :show="loading" />

  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import { getUrlString } from "../utils";
import { getAdventureList } from "../apis";
import { toast } from "../utils";
import callApp from '../utils/callApp'
import Loading from "../components/common/Loading";

export default {
  name: 'RankGroups',

  data() {
    return {
      mainTab: 0,
      list: [],
      showAwardTip: false,
      weekList: [],
      lastWeekList: [],
      userHuntInfo:{},
      loadEnd: false
    };
  },

  components: {
    Loading
  },

  computed: {
    lang: () => _lang,
    images: () => _images,
    ...mapState(["rankGroups", "loading", "share"]),
  },

  watch: {
    mainTab: {
      handler() {
        this.changeList()
      },
      immediate: true
    }
  },

  created() {
    this.fetchList()
  },
  
  mounted() {
    this.$el.onclick = (event) => {
      if(this.showAwardTip) {
        this.showAwardTip = false
      }
    }
  },

  methods: {

    goProfile (uid) {
      callApp.profile(uid)
    },

    mainTabClick(tab) {
      this.mainTab = tab;
      if (tab == 0 && this.weekList.length == 0) {
        this.fetchList()
      } 
      if(tab == 1 && this.lastWeekList.length == 0) {
        this.fetchList()
      }
    },

    changeList() {
      if (this.mainTab == 0) {
        this.list = this.weekList
      } else {
        this.list = this.lastWeekList
      }
    },

    // 获取本周数据
    async fetchList () {
      let type = this.mainTab
      this.loadEnd = false
      const res = await getAdventureList({whichWeek: type});
      if (res.data) {
        const { response_status, response_data } = res.data;
        if (response_status && response_status.error === "") {
          if (type == 0) {
            this.weekList = Object.freeze(response_data.list)
            this.userHuntInfo = response_data
          }
          if (type == 1) {
            this.lastWeekList = Object.freeze(response_data.list)
          }
          this.changeList()
          this.loadEnd = true
        } else if (response_status.error) {
          toast(response_status.error.replace(/\[\d+\]$/, ""));
        }
      }
    }
  },
};
</script>

<style lang="scss">
.list__container {
  width: 100%;
  height: 9.3rem;
  background: #7a68f8;
  border-radius: 0.2rem 0.2rem 0rem 0rem;
  box-sizing: border-box;
  padding-top: 0.3rem;
  position: relative;
  .navigator {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.36rem;
    font-weight: 400;
    height: 0.5rem;
    line-height: 0.5rem;
    color: #ffffff;
    opacity: 1;
    position: relative;
    .arrow {
      width: 0.42rem;
      height: 0.42rem;
      position: absolute;
      left: 0.2rem;
    }
    .weekly_award {
      display: flex;
      align-items: center;
      height: 0.4rem;
      font-size: 0.28rem;
      font-weight: 400;
      line-height: 0.4rem;
      color: #FFFFFF;
      opacity: 1;
      position: absolute;
      right: 0.2rem;
      img {
        width: 0.26rem;
        height: 0.26rem;
        margin-left: 0.08rem;
        margin-right: 0.08rem;
      }
    }
  }

  .tabs {
    display: flex;
    align-items: center;
    margin-left: 0.3rem;
    margin-top: 0.39rem;
    margin-bottom: 0.3rem;
    .tab:first-child{
      margin-right: 0.7rem;
    }
    .tab {
      height: 0.5rem;
      font-size: 0.36rem;
      font-weight: 400;
      line-height: 0.5rem;
      color: #FFFFFF;
      opacity: 0.6;
      position: relative;

    }
    .tab_select {
      opacity: 1;
      font-weight: bold;
    }
    .tab_select::after{
      content: '';
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -0.12rem;
      width: 0.28rem;
      height: 0.08rem;
      background: #FFFFFF;
      opacity: 1;
      border-radius: 0.14rem;

    }
  }

  .list__main_padding {
    padding-bottom: 1.5rem;
  }
  .list__main {
    height: 7.21rem;
    overflow: auto;
    padding-left: 0.12rem;
    padding-right: 0.3rem;
    padding-top: 0.16rem;
    box-sizing: border-box;
    .not_data {
      height: 0.37rem;
      font-size: 0.26rem;
      font-weight: 400;
      color: #ffffff;
      opacity: 0.3;
      text-align: center;
      margin-bottom: 0.3rem;
      margin-top: 0.3rem;
    }
    .crown {
      content: '';
      position: absolute;
      width: 0.3rem;
      height: 0.3rem;
      left: -0.05rem;
      top: -0.05rem;
    }
    li:nth-child(1) .avatar::before{
      @extend .crown;
      background: url('../img/top1.png');
      background-size: 100% 100%;
    }
    li:nth-child(2) .avatar::before{
      @extend .crown;
      background: url('../img/top2.png');
      background-size: 100% 100%;
    }
    li:nth-child(3) .avatar::before{
      @extend .crown;
      background: url('../img/top3.png');
      background-size: 100% 100%;
    }
    li {
      display: flex;
      align-items: center;
      margin-bottom: 0.45rem;
      .rank {
        width: 0.7rem;
        height: 0.4rem;
        font-size: 0.28rem;
        font-weight: 400;
        line-height: 0.4rem;
        color: #FFFFFF;
        opacity: 1;
        text-align: center;
      }
      .avatar {
        width: 1.1rem;
        height: 1.1rem;
        position: relative;
        margin-right: 0.1rem;
        margin-left: 0.2rem;
        flex-shrink: 0;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .middle__box {
        flex: 1;
      }
      .nick {
        display: flex;
        align-items: center;
        height: 0.45rem;
        font-size: 0.32rem;
        font-weight: 400;
        line-height: 0.45rem;
        color: #FFFFFF;
        opacity: 1;
        span {
           max-width: 2rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        img {
          width: 0.3rem;
          height: 0.3rem;
          margin-left: 0.1rem;
        }
      }
      .model {
        height: 0.4rem;
        margin-top: 0.04rem;
        display: flex;
        align-items: center;
        .model__img {
          width: 0.34rem;
          height: 0.38rem;
          margin-right: 0.1rem;
        }
        .explore_model__img {
          width: 1.12rem;
          height: 0.3rem;
        }
      }
      .value {
        height: 0.33rem;
        font-size: 0.24rem;
        font-weight: 400;
        color: #FFFFFF;
        opacity: 0.6;
      }
    }
  }

  .fixed__box {
    width: 7.5rem;
    height: 1.4rem;
    background: #6253C7;
    opacity: 1;
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    padding-right: 0.3rem;
    padding-left: 0.12rem;
    box-sizing: border-box;
    .rank {
      width: 0.7rem;
      height: 0.4rem;
      font-size: 0.28rem;
      font-weight: 400;
      line-height: 0.4rem;
      color: #FFFFFF;
      opacity: 1;
      text-align: center;
    }
    .avatar {
      width: 1.1rem;
      height: 1.1rem;
      position: relative;
      margin-right: 0.1rem;
      margin-left: 0.2rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .middle__box {
      flex: 1;
    }
    .nick {
      display: flex;
      align-items: center;
      height: 0.45rem;
      font-size: 0.32rem;
      font-weight: 400;
      line-height: 0.45rem;
      color: #FFFFFF;
      opacity: 1;
      position: relative;
      span {
        max-width: 1.5rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      img {
        width: 0.3rem;
        height: 0.3rem;
        margin-left: 0.1rem;
      }
      .value {
        // height: 0.33rem;
        font-size: 0.24rem;
        font-weight: 400;
        color: #FFFFFF;
        opacity: 0.6;
        position: absolute;
        right: 0;
        // line-height: 0.3rem;
      }
    }
    .middle_buttom {
      display: flex;
      justify-content: space-between;
      margin-top: 0.04rem;
    }
    .model {
      height: 0.4rem;
      display: flex;
      align-items: center;
      .model__img {
        width: 0.34rem;
          height: 0.38rem;
        margin-right: 0.1rem;
      }
    }
    .distance__box {
      height: 0.4rem;
      font-size: 0.24rem;
      font-weight: 400;
      // line-height: 0.33rem;
      color: #FFFFFF;
      opacity: 1;
      border: 0.01rem solid rgba(255,255,255,0.3);
      border-radius: 0.2rem;
      padding-left: 0.2rem;
      padding-right: 0.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      .arrow_up {
        width: 0.24rem;
        height: 0.24rem;
        margin-left: 0.04rem;
      }
    }
  }

  .award__box::before {
    content: "";
    position: absolute;
    top: -0.2rem;
    right: 0.85rem;
    width: 0;
    height: 0;
    border-width: 0.1rem;
    border-style: solid;
    border-color: transparent transparent rgba(0, 0, 0, 0.8) transparent;
    z-index: 60;
  }
  .award__box {
    width: 6.2rem;
    height: 8rem;
    background: rgba(0, 0, 0, 0.9);
    border-radius: 0.3rem;
    position: absolute;
    z-index: 50;
    box-sizing: border-box;
    right: 0.3rem;
    top: 0.9rem;
    padding: 0.3rem 0.3rem 0 0.3rem;
    box-sizing: border-box;
    .award {
      height: 100%;
      overflow-y: auto;
    }
    .title {
      font-size: 0.28rem;
      font-weight: 400;
      line-height: 0.56rem;
      color: #FFFFFF;
      opacity: 1;
      margin-bottom: -0.04rem;
    }
    .rank {
      display: flex;
      margin-top: 0.3rem;
      .num {
        height: 0.4rem;
        font-size: 0.28rem;
        font-weight: 400;
        line-height: 0.4rem;
        color: #FFFFFF;
        opacity: 1;
        flex-shrink: 0;
        margin-right: 0.1rem;
      }
      .des {
        // height: 0.33rem;
        font-size: 0.24rem;
        font-weight: 400;
        line-height: 0.33rem;
        color: #FFFFFF;
        opacity: 0.6;
        margin-top: 0.04rem;
      }
    }
    .imgs {
      display: flex;
      margin-top: 0.1rem;
      img {
        width: 1.4rem;
        height: 1.4rem;
      }
    }
  }
}
</style>