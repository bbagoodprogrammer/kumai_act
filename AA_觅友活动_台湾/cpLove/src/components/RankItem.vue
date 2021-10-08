<template>
  <div class="ranks">
    <div class="invite_list" :class="{
        sweet: from == 1,
        top: info.rank <= 3,
        top1: info.rank == 1,
        top2: info.rank == 2,
        top3: info.rank == 3,
      }">
      <span class="rank">{{ info.rank }}</span>
      <span class="top_avatar" v-if="info.rank <= 3">
        <em>
          <strong>
            <img :src="info.avatar" class="img" @click="appProfile(info,info.uid)" />
          </strong>
          <i>{{ info.nick }}</i>
        </em>
        <em>
          <img src="../img/icon_heard.png" alt="">
        </em>
        <em>
          <strong>
            <img :src="info.cp_avatar" class="img" @click="appProfile(info,info.cp_uid)" />
          </strong>
          <i>{{ info.cp_nick }}</i>
        </em>
      </span>
      <span class="avatar" v-else>
        <strong>
          <img :src="info.avatar" class="img" />
        </strong>
        <strong>
          <img :src="info.cp_avatar" class="img" />
        </strong>
      </span>
      <span class="nick" v-if="info.rank > 3">
        <strong>{{ info.nick }}</strong>
        <strong>{{ info.cp_nick }}</strong>
      </span>
      <span class="top_score" v-if="info.rank <= 3">
        <strong>{{lang.score}}</strong>
        <strong>{{ info.score }}</strong>
      </span>
      <span class="score" v-else>
        <strong>{{lang.score}}</strong>
        <strong>{{ info.score }}</strong>
      </span>
      <span class="top_cp_home" @click="appHome(info)" v-if="info.rank <= 3">{{lang.cp_home}}</span>
      <span class="cp_home" @click="appHome(info)" v-else>{{lang.cp_home}}</span>
    </div>
  </div>
</template>

<script>
// import mixin from "../utils/mixin";
const ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
export default {
  //   mixins: [mixin],
  props: ['info', 'from'],
  computed: {},
  components: {
    // Avatar,
  },
  methods: {
    appHome (t) {
      ios ? sendJsData('app://userInfo?uid=' + t.inviterUid)
        : JSInterface.sendJsData('app://cpHouse?toUid=' + t.uid)
    },
    childOpen (item) {
      this.$parent.openKing(item)
    },
    appProfile (item, uid) {
      if (item.is_live) {
        location.href = 'rid:' + item.is_live
      } else {
        location.href = 'uid:' + uid
      }
    },
    getAvatar (url) {
      return url ? url : require('../img/default.png')
    },
    get: function (num) {
      num = num * 100
      num = Math.round(num * Math.pow(10, 2)) / Math.pow(10, 2) //四舍五入
      num = Number(num).toFixed(1) //补足位数
      return num
    },
  },
}
</script>

<style lang="scss">
.ranks {
  .invite_list {
    width: 6.7rem;
    height: 1.35rem;
    margin: 0 auto 0.07rem;
    background: url('../img/rank4_sweet.png');
    background-size: 100% 100%;
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    .rank {
      width: 1.4rem;
      height: 1.35rem;
      line-height: 1.35rem;
      padding-left: 0.45rem;
      font-family: PingFang SC;
      box-sizing: border-box;
      font-size: 0.3rem;
      font-style: italic;
      color: #fff;
    }
    &.top {
      height: 2.1rem;
      .rank {
        text-indent: -1000rem;
        position: relative;
        width: 1.23rem;
        height: 2.1rem;
        &:after {
          content: '';
          display: inline-block;
          width: 0.46rem;
          height: 0.58rem;
          background-position: 50%;
          background-repeat: no-repeat;
          background-size: contain;
          position: absolute;
          left: 0.385rem;
          top: 0.6rem;
        }
      }
      &.top1 {
        background-image: url('../img/rank1_sweet.png');
        .rank {
          &:after {
            background-image: url('../img/top1.png');
          }
        }
      }
      &.top2 {
        background-image: url('../img/rank1_sweet.png');
        .rank {
          &:after {
            background-image: url('../img/top2.png');
          }
        }
      }
      &.top3 {
        background-image: url('../img/rank1_sweet.png');
        .rank {
          &:after {
            background-image: url('../img/top3.png');
          }
        }
      }
    }
    &.sweet {
      background-image: url('../img/rank4_salt.png');
      &.top1 {
        background-image: url('../img/rank1_salt.png');
      }
      &.top2 {
        background-image: url('../img/rank1_salt.png');
      }
      &.top3 {
        background-image: url('../img/rank1_salt.png');
      }
    }
    .top_avatar {
      width: 3.7rem;
      em {
        display: inline-block;
        vertical-align: middle;
        width: 1.3rem;
        text-align: center;
        strong {
          margin: 0 auto;
        }
        i {
          font-size: 0.2rem;
          color: #fff;
          width: 1.3rem;
          max-width: 1.3rem;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          margin-top: 0.11rem;
        }
        &:nth-of-type(2) {
          width: 0.78rem;
          height: 0.7rem;
          margin: -0.3rem -0.23rem 0;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .top_score {
      text-align: center;
      margin-top: -0.3rem;
      strong {
        display: block;
        &:first-of-type {
          font-size: 0.22rem;
          line-height: 0.22rem;
          color: #fff;
        }
        &:nth-of-type(2) {
          font-size: 0.44rem;
          color: #fed95b;
        }
      }
    }
    .top_cp_home {
      font-size: 0.2rem;
      font-family: PingFang SC;
      text-decoration: underline;
      color: #fadeb3;
      position: absolute;
      bottom: 0.17rem;
      right: 0.57rem;
    }
    .avatar {
      width: 1.8rem;
      strong {
        display: inline-block;
        width: 0.9rem;
        height: 0.9rem;
        background: url('../img/bg_avatar2.png');
        background-size: 100% 100%;
        position: relative;
        .img {
          width: 0.82rem;
          height: 0.82rem;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          margin: -0.41rem 0 0 -0.41rem;
        }
        &:first-of-type {
          z-index: 1;
        }
        &:nth-of-type(2) {
          margin-left: -0.25rem;
        }
      }
    }
    .nick {
      width: 1.8rem;
      margin-right: 0.4rem;
      strong {
        display: block;
        font-size: 0.2rem;
        font-family: PingFang SC;
        color: #fff;
        max-width: 1.8rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    .score {
      text-align: center;
      margin-top: -0.1rem;
      strong {
        display: block;
        &:first-of-type {
          font-size: 0.16rem;
          line-height: 0.18rem;
          color: #fff;
        }
        &:nth-of-type(2) {
          font-size: 0.34rem;
          color: #fed95b;
        }
      }
    }
    .cp_home {
      font-size: 0.16rem;
      font-family: PingFang SC;
      text-decoration: underline;
      color: #fadeb3;
      position: absolute;
      bottom: 0.12rem;
      right: 0.31rem;
    }
  }
}
.ranks .invite_list .avatar,
.ranks .invite_list .nick,
.ranks .invite_list .rank,
.ranks .invite_list .score {
  display: inline-block;
  vertical-align: middle;
}
.ranks .invite_list .top_avatar em i,
.ranks .invite_list .top_avatar em strong {
  display: block;
}
.ranks .invite_list .top_avatar strong:first-of-type,
.ranks .invite_list .top_avatar strong:nth-of-type(3) {
  width: 1.12rem;
  height: 1.12rem;
  background: url('../img/bg_avatar.png');
  background-size: 100% 100%;
  position: relative;
}
.ranks .invite_list .top_avatar strong:first-of-type .img,
.ranks .invite_list .top_avatar strong:nth-of-type(3) .img {
  width: 1.04rem;
  height: 1.04rem;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -0.52rem 0 0 -0.52rem;
}
</style>