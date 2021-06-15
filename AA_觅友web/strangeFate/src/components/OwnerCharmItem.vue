<template>
  <div class="charm rankItem_box" v-if="info">
    <div class="rankItem">
      <div class="rank">{{ info.ranking==0?'- -':info.ranking }}</div>
      <div class="right">
        <div class="infos">
          <span class="avatar"><img :src="info.avatar" alt="" /></span>
          <span class="info"
            >
            <strong>{{info.nick}}</strong>
            <strong class="strong2"
              ><em
                ><img :src=getIcon(info.wealthLv) alt="" />
                <i class="gt" :class="getWeathlv(info.wealthLv)">{{
                  info.wealthLv
                }}</i></em
              >
              <em v-if="info.isEnthusiast" class="isEnthusiast"
                ><img :src="images.icon_rank_hot" alt=""
              /></em>
              <em class="medal" v-if="info.medal">
                <img
                  :src="item"
                  alt=""
                  v-for="(item, i) in info.medal"
                  :key="i"
                /> </em></strong
          ></span>
        </div>
        <div class="score">
          <span>{{lang.score}}</span> <span>{{ info.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import mixin from '../utils/mixin';

export default {
  // mixins: [mixin],
  props: ["info", "from"],
  computed: {},
  components: {
    // Avatar,
  },
  methods: {
    getWeathlv(t) {
      //   gt: t >= 10,
      if (t >= 1 && t < 10) {
        return "bg9";
      }
      if (t >= 10 && t < 20) {
        return "bg10";
      }
      if (t >= 20 && t < 30) {
        return "bg20";
      }
      if (t >= 30 && t < 40) {
        return "bg30";
      }
      if (t >= 40 && t < 50) {
        return "bg40";
      }
      if (t >= 50) {
        return "bg50";
      }
    },
    getIcon(t) {
      var e = 0;
      if(t==0){
          e = 0;
      }
      if(t > 0 && t < 10){
          e = 1;
      }
      if(t >= 10 && t < 20){
          e = 2;
      }
      if(t >= 20 && t < 30){
          e = 3;
      }
      if(t >= 30 && t < 40){
          e = 4;
      }
      if(t >= 40 && t < 50){
          e = 5;
      }
      if(t >= 50){
          e = 6;
      }
      return require('../img/icon'+e+'.png');
    },
    getAvatar(url) {
      return url ? url : require("../img/avatar.png");
    },
    appProfile(id) {
      if (id) {
        location.href = "rid:" + id;
      }
    },
  },
};
</script>

<style lang="scss">
.charm {
  .rankItem {
    height: 1.4rem;
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
      height: 1.4rem;
      line-height: 1.4rem;
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
          .strong2 {
            font-size: 0;
            em {
              display: inline-block;
              vertical-align: middle;
            }
            em:first-of-type {
              height: 0.3rem;
              box-sizing: border-box;
              margin-right: 0.1rem;
              img {
                display: inline-block;
                vertical-align: text-top;
                width: 0.3rem;
                height: 0.3rem;
                position: relative;
              }
              i {
                display: inline-block;
                vertical-align: text-top;
                width: 0.53rem;
                height: 0.3rem;
                line-height: 0.3rem;
                background: linear-gradient(322deg, #8c8995, #bcbbc7);
                border-radius: 0 0.25rem 0.25rem 0;
                margin-left: -0.25rem;
                font-size: 0.2rem;
                font-weight: 700;
                color: #fff;
                box-sizing: border-box;
                text-align: center;
                padding-left: 0.1rem;
                &.gt {
                  width: 0.53rem;
                }
                &.bg9 {
                  background: linear-gradient(322deg, #4a85b2, #7babd2);
                }

                &.bg10 {
                  background: linear-gradient(322deg, #40aba1, #69c9d2);
                }

                &.bg20 {
                  background: linear-gradient(322deg, #4ac96c, #94e9ab);
                }

                &.bg30 {
                  background: linear-gradient(322deg, #bf883b, #e4c396);
                }

                &.bg40 {
                  background: linear-gradient(322deg, #ce7445, #d29473);
                }

                &.bg50 {
                  background: linear-gradient(322deg, #c55451, #d46b71);
                }
              }
            }
            .isEnthusiast {
              width: 1.24rem;
              height: 0.3rem;
              margin-right: 0.1rem;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .medal {
              height: 0.3rem;
              img {
                display: inline-block;
                vertical-align: text-top;
                width: 0.28rem;
                height: 0.3rem;
                margin-right: 0.04rem;
              }
            }
          }
        }
      }
      .avatar {
        margin-right: 0.1rem;
        img {
          width: 1.1rem;
          height: 1.1rem;
          border-radius: 50%;
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