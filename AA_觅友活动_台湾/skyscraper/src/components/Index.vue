<template>
  <div class="page pageIndex">
    <div class="header">
      <span class="ruleTips" @click="showRule = true">規則獎勵</span>
      <RoolMsg :floorConfig="floorConfig" />
      <div class="cloud"></div>
      <div class="floor" :class="['level_' + show_floorMsg.level]"></div>
      <div class="userMsg">
        <img v-lazy="show_floorMsg.avatar" alt="" class="av" @click="goRoom()">
        <div class="msg">
          <div class="nick">{{show_floorMsg.nick}}</div>
          <div class="floorName">的{{floorConfig[show_floorMsg.level || 0].name}}</div>
        </div>
      </div>
      <div class="fans_list" @click="fans_list()" v-if="show_floorMsg.user_rank && show_floorMsg.user_rank.length">
        <img v-lazy="item.avatar" alt="" v-for="(item,index) in show_floorMsg.user_rank.slice(0,3)" :key="index">
      </div>
    </div>
    <UserTaskScore :floorConfig="floorConfig" />
    <Rank />
    <Footer />

    <!-- 升级弹窗 -->
    <div class="mask" v-show="showLvUp">
      <transition name="slide">
        <div class="lvUp" v-show="showLvUp">
          <i class="close" @click="showLvUp = false"></i>
          <div class="title">你的大樓升級啦！</div>
          <img :src="require(`../img/leUp_floor/floor_${max_lv + 1}.png`)" alt="">
          <p class="tips">恭喜你的大樓已經升級到【{{floorConfig[max_lv].name}}】<br />獎勵<i v-for="(item,index) in floorConfig[max_lv].gift"
              :key="index">{{item.name}}{{index == floorConfig[max_lv].gift.length -1?'':'、'}}</i></p>
          <div class="ok" @click="showLvUp = false">
            開心收下
          </div>
        </div>
      </transition>
    </div>

    <!-- 粉丝榜 -->
    <div class="mask" v-show="showFasRank">
      <transition name="slide">
        <div class="fansRank" v-show="showFasRank">
          <i class="close" @click="showFasRank = false"></i>
          <div class="title">【 <strong>{{owner_change.nick}}</strong> 】的粉絲榜</div>
          <div class="f_list">
            <div class="listHeader">
              <span class="f_rank">排名</span>
              <span class="user">用戶</span>
              <span class="score">高度</span>
            </div>
            <ul>
              <li v-for="(item,index) in list" :key="index" :class="{act:index%2 == 0}">
                <span class="f_rank">{{item.rank}}</span>
                <span class="user"><img v-lazy="item.avatar" alt=""><strong>{{item.nick}}</strong> </span>
                <span class="score">{{item.score}}</span>
              </li>
            </ul>
          </div>
          <div class="fans_tips">
            *總高度為粉絲對同一名主播所貢獻的高度綜合，榜
            單顯示前20名粉絲
          </div>
          <div class="goRoom" @click="goRoom()">進入主播房間</div>
        </div>
      </transition>
    </div>

    <div class="mask" v-show="showRule">
      <transition name="slide">
        <Rule v-if="showRule" />
      </transition>
    </div>
  </div>
</template>

<script>
import UserTaskScore from "./UserTaskScore"
import Rank from "./Rank"
import Footer from "./Footer"
import RoolMsg from "./RoolMsg"
import { mapState } from "vuex"
import { fansList } from "../apis"
import Rule from "./Rule"
export default {
  components: { UserTaskScore, Rank, Footer, RoolMsg, Rule },
  data () {
    return {
      showLvUp: false,
      max_lv: 0,
      showFasRank: false,
      showRule: false,
      list: [],
      floorConfig: {
        0: {
          name: "空地",
          score: '',
          tips: '',
          gift: []
        },
        1: {
          name: "豪華酒店",
          score: '5000',
          tips: '酒店將古典和現代設施完美融合，極具特色，擁有100間客房',
          gift: [
            {
              img: '',
              name: '豪華酒店-背包禮物*1'
            }

          ]
        },
        2: {
          name: "大笨鐘",
          score: '30000',
          tips: '聳立於最精華地段，遊客可享盡英倫美景，營造浪漫風情',
          gift: [
            {
              img: '',
              name: '大笨鐘-背包禮物*1'
            },
            {
              img: '',
              name: '1000金豆'
            }
          ]
        },
        3: {
          name: "帝國大廈",
          score: '60000',
          tips: '頂樓的風很大，吹亂了我的頭髮，但整座不夜城的風景都能盡收眼底',
          gift: [
            {
              img: '',
              name: '帝國大廈-背包禮物*1'
            },
            {
              img: '',
              name: '2000金豆'
            },
            {
              img: '',
              name: '房產大亨-頭像框*7天'
            },
          ]
        }
      },

    }
  },
  watch: {
    tips (val) {
      if (val) {
        for (let i = val.length; i--; i >= 0) {
          if (val[i] == 1) {
            this.max_lv = i
            console.log(i)
            this.showLvUp = true
            return
          }
        }
      }
    }
  },
  computed: {
    ...mapState(['is_anchor', 'anchor_uid', 'owner_change', 'owner', 'tips']),
    show_floorMsg () {
      if (this.owner_change.uid) {
        return this.owner_change
      } else {
        return this.owner
      }
    }
  },
  methods: {
    fans_list () {
      fansList(this.owner_change.uid).then(res => {
        this.list = res.data.response_data.rank
        this.showFasRank = true
      })
    },
    goRoom () {
      var isiOS = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      console.log(this.show_floorMsg)
      if (isiOS) {
        sendJsData('app://room?rid=' + this.show_floorMsg.rid);
      } else {
        javascript: JSInterface.sendJsData('app://room?rid=' + this.show_floorMsg.rid);
      }
    }
  }
}
</script>

<style lang="scss">
.pageIndex {
  .header {
    height: 10.97rem;
    position: relative;
    .cloud {
      width: 6.02rem;
      height: 4.95rem;
      background: url(../img/cloud.png);
      background-size: 100% 100%;
      position: absolute;
      top: 3.5rem;
      left: 0.88rem;
      z-index: 2;
    }
    .floor {
      width: 3.92rem;
      height: 8.98rem;
      position: absolute;
      top: 1.81rem;
      left: 1.81rem;

      &.level_0 {
        background: url(../img/floor/level_1.png);
        background-size: 100% 100%;
      }
      &.level_1 {
        background: url(../img/floor/level_2.png);
        background-size: 100% 100%;
      }
      &.level_2 {
        background: url(../img/floor/level_3.png);
        background-size: 100% 100%;
      }
      &.level_3 {
        background: url(../img/floor/level_4.png);
        background-size: 100% 100%;
      }
    }
    .userMsg {
      width: 2.05rem;
      height: 0.82rem;
      background: url(../img/userBg.png);
      background-size: 100% 100%;
      position: absolute;
      top: 3.07rem;
      left: 0.4rem;
      padding-left: 0.73rem;
      z-index: 3;
      .av {
        width: 0.95rem;
        height: 0.95rem;
        border-radius: 50%;
        position: absolute;
        left: -0.22rem;
        top: -0.07rem;
      }
      .msg {
        height: 100%;
        margin-left: 0.2rem;
        > div {
          height: 50%;
        }
        .nick {
          max-width: 1.63rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 0.28rem;
          line-height: 0.4rem;
        }
        .floorName {
          font-size: 0.26rem;
        }
      }
    }
    .fans_list {
      width: 0.88rem;
      height: 2.01rem;
      padding-top: 0.4rem;
      position: relative;
      top: 4.29rem;
      left: 0.23rem;
      z-index: 3;
      img {
        width: 0.59rem;
        height: 0.59rem;
        margin: 0 auto 0.07rem;
        border-radius: 50%;
      }
    }
  }
  .lvUp {
    width: 5.55rem;
    height: 5.71rem;
    background: url(../img/lvUp.png);
    background-size: 100% 100%;
    position: relative;
    .title {
      height: 0.89rem;
      text-align: center;
      line-height: 0.89rem;
      color: rgba(11, 66, 117, 1);
      font-weight: 600;
    }
    > img {
      width: 3.98rem;
      height: 2.64rem;
      margin: 0 auto;
    }
    .tips {
      font-size: 0.24rem;
      padding: 0 0.15rem;
      text-align: center;
      margin-top: 0.28rem;
      i {
        font-size: 0.24rem;
      }
    }
    .ok {
      width: 2.05rem;
      height: 0.75rem;
      background: url(../img/ok.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.75rem;
      font-size: 0.28rem;
      color: rgba(39, 26, 118, 1);
      margin: 0.2rem auto 0;
    }
  }

  .fansRank {
    width: 4.7rem;
    height: 7.15rem;
    background: url(../img/fans_rankBg.png);
    background-size: 100% 100%;
    text-align: center;
    padding-bottom: 0.15rem;
    position: relative;
    .title {
      height: 0.6rem;
      align-items: center;
      display: flex;
      justify-content: center;
      color: rgba(11, 66, 117, 1);
      font-weight: 600;
      strong {
        height: 0.3rem;
        display: block;
        max-width: 1.5rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .f_list {
      text-align: center;
      .f_rank,
      .score {
        width: 1rem;
      }
      .user {
        width: 2.8rem;
        display: flex;
        align-items: center;
        img {
          width: 0.42rem;
          height: 0.42rem;
          border-radius: 50%;
          margin-right: 0.01rem;
        }
        strong {
          font-size: 0.22rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin-left: 0.15rem;
        }
      }
      .listHeader {
        font-size: 0.22rem;
        color: rgba(11, 66, 117, 1);
      }
      .listHeader,
      li {
        height: 0.69rem;
        display: flex;
        align-items: center;
        font-size: 0.22rem;
      }
      ul {
        height: 4.15rem;
        overflow-y: scroll;
        li {
          background: rgba(20, 76, 128, 0.13);
          &.act {
            background: rgba(20, 76, 128, 0.03);
          }
        }
      }
    }
    .fans_tips {
      font-size: 0.22rem;
      color: rgba(39, 26, 118, 1);
      padding: 0 0.25rem;
      text-align: left;
      margin-top: 0.1rem;
    }
    .goRoom {
      width: 2.5rem;
      height: 0.75rem;
      background: url(../img/goRoom.png);
      background-size: 100% 100%;
      margin: 0.19rem auto 0;
      text-align: center;
      line-height: 0.75rem;
      font-size: 0.28rem;
      color: rgba(39, 26, 118, 1);
    }
  }
  img {
    display: block;
    width: 100%;
  }
  .ruleTips {
    width: 1.29rem;
    height: 0.39rem;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 0.1rem 0 0 0.1rem;
    position: absolute;
    top: 0.94rem;
    right: 0;
    text-align: center;
    line-height: 0.39rem;
    color: rgba(34, 117, 206, 1);
    font-size: 0.22rem;
  }
  .close {
    display: block;
    width: 0.62rem;
    height: 0.62rem;
    background: url(../img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0.05rem;
    top: -0.76rem;
  }
}
</style>