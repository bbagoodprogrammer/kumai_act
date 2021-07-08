<template>
  <div class="footer" :class="{noData:!listItem.length}">
    <span v-if="actStatus == 1" class="btnBg">{{lang.notStart}}</span>
    <span v-if="actStatus == 2" class="btnBg">{{lang.actEnd}}</span>
    <span v-if="actStatus == 3" class="btnBg singUp" @click="singUp()">{{lang.singUp}}</span>
    <div class="userMsg" v-if="actStatus == 4">
      <i class="rankName">{{rank[owner.team_id - 1]?rank[owner.team_id - 1].name:''}}</i>
      <div class="userRank">{{owner.rank}}</div>
      <div class="imgBox">
        <img v-lazy="owner.avatar" alt="">
      </div>
      <div class="userNick">
        <div class="nick"> {{owner.nick}}</div>
        <div class="medals">
          <img :src="item2.url" alt="" v-for="(item2,index) in owner.medals" :key="index">
          <img :src="require(`../img/wealv/pro_level${getLevel}.png`)" alt="" v-if="getLevel" class="warLv">
        </div>
      </div>
      <div class="score"><i></i><strong>{{owner.score}}</strong></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { singUp } from "../apis"

export default {
  props: ['listItem'],
  computed: {
    ...mapState(['owner', 'activity', 'rank']),
    actStatus () {
      if (this.activity.activity_status == 0) {
        return 1
      } else if (this.activity.activity_status == 2) {
        return 2
      } else if (this.owner.team_id == 0) {
        return 3
      } else if (this.owner.team_id) {
        return 4
      }
    },
    getLevel () {
      const _lv = this.owner.wealth_lv;
      if (_lv > 0 && _lv < 10) {
        return '0'
      }
      if (_lv >= 10 && _lv < 20) {
        return '1'
      }
      if (_lv >= 20 && _lv < 30) {
        return '2'
      }
      if (_lv >= 30 && _lv < 40) {
        return '3'
      }
      if (_lv >= 40 && _lv < 50) {
        return '4'
      }
      if (_lv >= 50) {
        return '5'
      }
    },
  },
  methods: {
    singUp () {
      singUp().then(res => {
        if (res.data.response_status.code == 0) {
          const team_id = res.data.response_data.team_id
          this.toast(this.lang.singUpSuc.replace('%n', this.rank[team_id - 1].name).replace('%s', this.rank[team_id - 1].score).replace('%b', this.rank[team_id - 1].rank))
          setTimeout(() => {
            this.$store.dispatch('getInitInfo');
          }, 800)
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.footer {
  width: 7.5rem;
  height: 1.5rem;
  background: url(../img/footer.png);
  background-size: 100% 100%;
  margin-top: -0.8rem;
  position: fixed;
  bottom: 0;
  padding-top: 0.7rem;
  z-index: 111;
  .btnBg {
    display: block;
    width: 2.94rem;
    height: 0.78rem;
    background: url(../img/notAct.png);
    background-size: 100% 100%;
    text-align: center;
    line-height: 0.78rem;
    color: #D5B25E;
    font-size: 0.38rem;
    margin: 0.3rem auto;
    &.singUp {
      color: #fff;
      background: url(../img/singBtn.png);
      background-size: 100% 100%;
    }
  }
  .userMsg {
    height: 1.42rem;
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 0.1rem;
    .rankName {
      width: 1.41rem;
      height: 0.45rem;
      background: url(../img/rankName3.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0;
      left: 0;
      color: #FEC41B;
      font-size: 0.26rem;
    }
    .userRank {
      width: 0.58rem;
      height: 0.61rem;
      margin-left: 0.5rem;
      color: #D1C7B4;
      text-align: center;
      line-height: 0.61rem;
    }
    .imgBox {
      width: 1.33rem;
      height: 1.33rem;
      background: url(../img/avBg.png);
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 0.16rem;
      img {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
      }
    }
    .userNick {
      .nick {
        width: 2rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 0.32rem;
        color: #FEC41B;
        margin-left: 0.13rem;
      }
      .medals {
        padding: 0 0.3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 0.1rem;
        img {
          width: 0.45rem;
          height: 0.45rem;
        }
        .warLv {
          width: 0.56rem;
          height: 0.3rem;
        }
      }
    }
    .score {
      display: flex;
      align-items: center;
      margin-left: 0.2rem;
      i {
        width: 0.44rem;
        height: 0.41rem;
        background: url(../img/icon2.png);
        background-size: 100% 100%;
        margin-right: 0.04rem;
      }
      strong {
        font-size: 0.28rem;
        color: #D4CAB7;
      }
    }
    &.rank2,
    &.rank3 {
      .userRank {
        background: url(../img/userRankBg.png);
        background-size: 100% 100%;
        text-indent: -999rem;
        position: relative;
      }
      .userRank::before {
        content: '';
        display: block;
        width: 0.33rem;
        height: 0.4rem;
        background: url(../img/2.png);
        background-size: 100% 100%;
        position: absolute;
        top: 0.09rem;
        left: 0.13rem;
      }
    }
    &.rank3 {
      .userRank::before {
        content: '';
        display: block;
        width: 0.33rem;
        height: 0.4rem;
        background: url(../img/3.png);
        background-size: 100% 100%;
        position: absolute;
        top: 0.09rem;
        left: 0.13rem;
      }
    }
  }
}
</style>