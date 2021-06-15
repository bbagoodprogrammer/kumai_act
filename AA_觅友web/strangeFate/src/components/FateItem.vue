<template>
  <div class="fate rankItem_box">
    <div
      class="rankItem"
      :class="{
        top: info.ranking <= 3,
        top1: info.ranking == 1,
        top2: info.ranking == 2,
        top3: info.ranking == 3,
      }"
    >
      <div class="rank">{{ info.ranking }}</div>
      <div class="right">
        <div class="infos">
          <span class="avatar avatar_room"
            ><img :src="info.pic_url" alt=""
          /></span>
          <span class="info"
            ><strong>{{ info.rname }}</strong>
            <strong class="strong1"
              ><img :src="info.avatar" alt="" /> <i>{{ info.nick }}</i></strong
            ></span
          >
        </div>
        <div class="score">
          <span>{{ lang.score1 }}</span> <span>{{ info.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
export default {
  props: ["info", "from"],
  computed: {},
  components: {
    // Avatar,
  },
  methods: {
    getAvatar(url) {
      return url ? url : require("../img/avatar.png");
    },
  },
};
</script>

<style lang="scss">
.fate {
  .rankItem {
    height: 1.56rem;
    font-size: 0;
    position: relative;
    display: flex;
    box-sizing: border-box;
    .rank,
    .avatar,
    .nick,
    .score,
    .infos {
      display: inline-block;
      vertical-align: middle;
    }
    .rank {
      width: 0.97rem;
      height: 1.56rem;
      line-height: 1.56rem;
      text-align: center;
      font-size: 0.28rem;
    }
    &.top {
      .rank {
        text-indent: -1000rem;
        position: relative;
        &:after {
          content: "";
          display: inline-block;
          width: 0.7rem;
          height: 0.4rem;
          background-position: 50%;
          background-repeat: no-repeat;
          background-size: contain;
          position: absolute;
          top: 0.56rem;
          left: 0.12rem;
        }
      }
      &.top1 {
        .rank {
          &:after {
            background-image: url("../img/top1.png");
          }
        }
      }
      &.top2 {
        .rank {
          &:after {
            background-image: url("../img/top2.png");
          }
        }
      }
      &.top3 {
        .rank {
          &:after {
            background-image: url("../img/top3.png");
          }
        }
      }
      .score {
        color: #fff664;
      }
    }
    .right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 6.53rem;
      box-sizing: border-box;
      padding-right: 0.3rem;
      padding-left: 0.05rem;
      .infos {
        > span {
          display: inline-block;
          vertical-align: middle;
        }
        .info {
          strong {
            display: block;
          }
          strong:first-of-type {
            font-size: 0.32rem;
            line-height: 0.45rem;
            color: #fff;
            margin-bottom: 0.04rem;
            max-width: 2.5rem;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .strong1 {
            margin-bottom: 0.04rem;
            img,
            i {
              display: inline-block;
              vertical-align: middle;
            }
            img {
              width: 0.4rem;
              height: 0.4rem;
              background: transparent;
              border-radius: 50%;
            }
            i {
              color: #bcbbc7;
              font-size: 0.24rem;
              max-width: 2rem;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }
        }
      }
      .avatar {
        margin-right: 0.1rem;
        img {
          width: 1.1rem;
          height: 1.1rem;
          border-radius: 0.1rem;
        }
      }
      .score {
        text-align: right;
        span {
          display: block;
        }
        span:first-of-type {
          color: hsla(0, 0%, 100%, 0.6);
          font-size: 0.2rem;
          padding-bottom: 0.15rem;
          line-height: 1;
        }
        span:nth-of-type(2) {
          line-height: 1;
          font-size: 0.36rem;
          color: #fff;
          font-weight: 700;
          transform: skew(-10deg);
          -webkit-transform: skew(-10deg);
        }
      }
    }
  }
  .rank_tips {
    font-size: 0.22rem;
    color: #ffe5a0;
    text-align: right;
    padding: 0rem 0.6rem 0.17rem 0;
  }
}
</style>