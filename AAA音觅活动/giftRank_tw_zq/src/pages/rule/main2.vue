<template>
  <div class="rule">
    <div class="icon"></div>
    <div class="tabsList">
      <span class="tabItem" v-for="(item,index) in tabs" :key="index" :class="{act:index == vol}" @click="tabClick(index)">{{getDate(item[0])}}-{{getDate(item[1])}}</span>
    </div>
    <div class="gifts">
      <div class="title"></div>
      <div class="giftImg">
        <div class="gift" v-for="(item,index) in nowgifts" :key="index" @click="typeClick(index)">
          <span class="imgIcon" :class="{act:id == index}">
            <img :src="item.image" alt="">
          </span>
          <strong>{{item.name}}</strong>
        </div>
      </div>
    </div>
    <div class="user" v-if="nowUser">
      <div class="imgBox">
        <span class="imgBg"></span>
        <img :src="nowUser.avatar" alt="">
      </div>
      <div class="nick">
        <span> {{nowUser.nick}}</span>
        <div class="medals">
          <img v-for="(item2,index2) in nowUser.medals" :src="item2" :key="index2" alt="">
        </div>
      </div>
      <div class="score">最高紀錄：<em>{{nowUser.score}}</em>個</div>
    </div>
    <div class="user noData" v-else>
      暫無數據
    </div>
    <loading></loading>
  </div>
</template>

<script>
import api from "../../api/apiConfig"
import getDate from "../../utils/getDate"
import Loading from "../../components/Loading"
export default {
  components: { Loading },
  data () {
    return {
      tabs: [],
      vol: 0,
      gifts: {},
      user: {},
      id: 0,
      rankGrounp: {},
      giftsGrounp: {}
    }
  },
  created () {
    api.lastRank(0).then(res => {
      const { gifts, tabs, users, vol, max } = res.data.response_data
      this.tabs = tabs
      this.vol = vol
      this.gifts = gifts
      this.user = users
      this.$set(this.rankGrounp, vol, users)
      this.$set(this.giftsGrounp, vol, gifts)
      for (let a in users) {
        this.id = a
        return
      }
    })
  },
  computed: {
    nowUser () {
      return this.rankGrounp[this.vol] ? this.rankGrounp[this.vol][this.id] : {}
    },
    nowgifts () {
      return this.giftsGrounp[this.vol] ? this.giftsGrounp[this.vol] : {}
    }
  },
  methods: {
    getDate (tm) {
      return getDate(new Date(tm * 1000), 1)
    },
    tabClick (index) {
      if (!this.rankGrounp[index]) {
        api.lastRank(index).then(res => {
          const users = res.data.response_data.users
          const gifts = res.data.response_data.gifts
          this.$set(this.rankGrounp, index, users)
          this.$set(this.giftsGrounp, index, gifts)
          if (users) {
            for (let a in users) {
              this.id = a
              this.vol = index
              return
            }
          } else {
            this.id = null
            this.vol = index
          }
        })
      } else {
        this.vol = index
        for (let a in this.nowgifts) {
          this.id = a
          return
        }
      }

    },
    typeClick (type) {
      console.log(type)
      if (type) {
        this.id = type
      } else {
        this.id = null
      }
    }
  }
}
</script>

<style lang="scss">
body {
  background: #EDEAE3;
}
.rule {
  width: 100%;
  height: 11.83rem;
  background: #EDEAE3 url(../../assets/img/rankBg.png) no-repeat;
  background-size: 100% 100%;
  padding-top: 0.75rem;
  .icon {
    width: 5.9rem;
    height: 1.97rem;
    background: url(../../assets/img/rankIcon.png);
    background-size: 100% 100%;
    margin: 0 auto;
  }
  .tabsList {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 0.58rem;
    .tabItem {
      width: 1.18rem;
      //   flex: 1;
      height: 0.58rem;
      font-size: 0.18rem;
      white-space: nowrap;
      background: url(../../assets/img/rankTab.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.58rem;
      margin-right: 0.04rem;
      &.act {
        background: url(../../assets/img/rankTab_act.png);
        background-size: 100% 100%;
      }
    }
    .tabItem:last-child {
      margin-right: 0;
    }
  }
  .gifts {
    min-height: 1.75rem;
    .title {
      width: 1.31rem;
      height: 0.33rem;
      background: url(../../assets/img/giftTitle.png);
      background-size: 100% 100%;
      margin: 0.2rem auto 0;
    }
    .giftImg {
      display: flex;
      align-items: center;
      justify-content: center;
      .gift {
        width: 1.72rem;
        height: 1.62rem;
        .imgIcon {
          background: url(../../assets/img/giftIconBg.png);
          background-size: 100% 100%;
          &.act {
            background: url(../../assets/img/giftIconBg_act.png);
            background-size: 100% 100%;
          }
        }
      }
      strong {
        display: block;
        text-align: center;
        color: rgba(255, 75, 73, 1);
        font-size: 0.24rem;
      }
      .imgIcon {
        display: block;
        width: 1.47rem;
        height: 1.45rem;
        > img {
          width: 100%;
          height: 100%;
        }
        &.act {
          width: 1.72rem;
          height: 1.62rem;
        }
      }
    }
  }
  .user {
    &.noData {
      margin: 1.6rem auto 0;
      text-align: center;
    }
    .imgBox {
      width: 2.83rem;
      height: 3.21rem;
      position: relative;
      margin: 1.2rem auto 0;
      .imgBg {
        width: 100%;
        height: 100%;
        position: absolute;
        background: url(../../assets/img/avBg.png);
        background-size: 100% 100%;
        z-index: 3;
      }
      > img {
        width: 2.6rem;
        height: 2.6rem;
        border-radius: 50%;
        position: absolute;
        top: 0.57rem;
        left: 0.17rem;
      }
    }
    .nick {
      height: 0.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 81, 57, 1);
      margin: 0.19rem auto 0;
      > span {
        max-width: 2rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .medals {
        width: 1rem;
        height: 0.35rem;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 0.34rem;
          height: 0.34rem;
        }
      }
    }
    .score {
      height: 0.6rem;
      line-height: 0.6rem;
      text-align: center;
      margin: 0.7rem;
      font-size: 0.26rem;
      color: #ff5139;
      em {
        font-size: 0.26rem;
      }
    }
  }
  .clearfix:after {
    content: '';
    height: 0;
    line-height: 0;
    display: block;
    visibility: hidden;
    clear: both;
  }
}
@import '../../assets/scss/common.scss';
</style>
