<template>
  <div class="rankItem">
    <!-- <div class="top_box" v-if="info.rank <= 3"> -->
    <div class="top1" v-if="info.rank == 1">
      <div class="avatar">
        <img :src="info.headImg" alt="" class="self" />
        <img v-if="info.avatar_frame" class="frame" :src="info.avatar_frame" />
        <img v-else src="../img/avatar.png" alt="" class="default_avatar" />
      </div>
      <div class="nick">{{ info.nick }}</div>
      <div class="score">
        <img src="../img/coins.png" alt="" />
        <span>{{ info.income }}</span>
      </div>
    </div>
    <div class="top2" v-if="info.rank == 2">
      <div class="avatar">
        <img :src="info.headImg" alt="" class="self" />
        <img v-if="info.avatar_frame" class="frame" :src="info.avatar_frame" />
        <img v-else src="../img/avatar.png" alt="" class="default_avatar" />
      </div>
      <div class="nick">{{ info.nick }}</div>
      <div class="score">
        <img src="../img/coins.png" alt="" />
        <span>{{ info.income }}</span>
      </div>
    </div>
    <div class="top3" v-if="info.rank == 3">
      <div class="avatar">
        <img :src="info.headImg" alt="" class="self" />
        <img v-if="info.avatar_frame" class="frame" :src="info.avatar_frame" />
        <img v-else src="../img/avatar.png" alt="" class="default_avatar" />
      </div>
      <div class="nick">{{ info.nick }}</div>
      <div class="score">
        <img src="../img/coins.png" alt="" />
        <span>{{ info.income }}</span>
      </div>
      <!-- </div> -->
    </div>
    <template v-if="info.rank > 3">
      <div class="list">
        <div>
          <span>{{ info.rank }}</span>
          <span>
            <img
              v-if="info.avatar_frame"
              class="frame"
              :src="info.avatar_frame"
            />
            <img v-else src="../img/avatar.png" alt="" class="default_avatar" />
            <img :src="info.headImg" alt="" />
          </span>
          <span>
            {{ info.nick }}
          </span>
        </div>
        <div>
          <img src="../img/coins.png" alt="" />
          <span>
            {{ info.income }}
          </span>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: ["info", "from"],
  components: {
    // Avatar,
  },
  methods: {
    getAvatar(url) {
      // return url?url:require('../img/avatar.png');
    },
    appPro(id) {
      if (id) {
        location.href = "rid:" + id;
      }
    },
  },
};
</script>

<style lang="scss">
.rankItem {
  width: 7.42rem;
  margin: 0 auto;
  overflow: hidden;
  .top_box {
    width: 7.42rem;
    height: 4.28rem;
  }
  .top1 {
    width: 2.98rem;
    height: 2.2rem;
    background: url("../img/top1.png") no-repeat;
    background-size: 100% 100%;
    margin: 0rem auto 1.8rem;
    .avatar {
      width: 2rem;
      height: 2rem;
      position: relative;
      margin: 0 auto;
      .self {
        width: 1.2rem;
        height: 1.2rem;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -0.6rem;
        margin-top: -0.6rem;
        border-radius: 50%;
      }
      .frame {
        width: 2rem;
        height: 2rem;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -1rem;
        margin-top: -1rem;
        z-index: 1;
      }
      .default_avatar {
        width: 1.6rem;
        height: 1.6rem;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -0.8rem;
        margin-top: -0.8rem;
        z-index: 1;
      }
    }
  }
  .top2,
  .top3 {
    width: 2.34rem;
    height: 0.53rem;
    background: url("../img/top2.png") no-repeat;
    background-size: 100% 100%;
    // margin: .2rem 0 0 .35rem;
    position: absolute;
    top: 2.5rem;
    .avatar {
      width: 2rem;
      height: 2rem;
      position: absolute;
      top: -1.5rem;
      left: 50%;
      margin-left: -1rem;
      .self {
        width: 1.2rem;
        height: 1.2rem;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -0.6rem;
        margin-top: -0.6rem;
        border-radius: 50%;
      }
      .frame {
        width: 2rem;
        height: 2rem;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -1rem;
        margin-top: -1rem;
        z-index: 1;
      }
      .default_avatar {
        width: 1.5rem;
        height: 1.5rem;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -0.75rem;
        margin-top: -0.75rem;
        z-index: 1;
      }
    }
  }
  .top2 {
    left: 0.35rem;
  }
  .top3 {
    top: 2.6rem;
    right: 0.35rem;
  }

  .top1,
  .top2,
  .top3 {
    .nick {
      font-size: 0.26rem;
      color: #ffffff;
      line-height: 1;
      text-align: center;
      padding-top: 0.22rem;
      width: 2.2rem;
      max-width: 2.2rem;
      margin: 0 auto;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .score {
      text-align: center;
      img,
      span {
        display: inline-block;
        vertical-align: middle;
      }
      img {
        width: 0.26rem;
      }
      span {
        font-size: 0.26rem;
        color: #ffffff;
        line-height: 1;
      }
    }
  }

  .top2,
  .top3 {
    .nick {
      padding-top: 0.7rem;
    }
  }

  .list {
    height: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.54rem;
    position: relative;
    &.ac {
      background: #1e0c7a;
    }
    &::after {
      content: "";
      display: inline-block;
      background: url("../img/line.png");
      width: 7.5rem;
      height: 0.02rem;
      background-size: 100% 100%;
      position: absolute;
      bottom: 0;
      left: 0;
    }
    > div:nth-of-type(1) {
      display: flex;
      align-items: center;
      span:nth-of-type(1) {
        font-size: 0.3rem;
        color: #ffffff;
        line-height: 1;
      }
      span:nth-of-type(2) {
        margin: 0 0.13rem;
        width: 0.98rem;
        height: 0.98rem;
        position: relative;
        .default_avatar {
          width: 0.98rem;
          height: 0.98rem;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
        }
        img {
          width: 0.8rem;
          height: 0.8rem;
          border-radius: 50%;
          position: absolute;
          top: 0.09rem;
          left: 0.09rem;
        }
      }
      span:nth-of-type(3) {
        font-size: 0.28rem;
        color: #ffffff;
        line-height: 1;
      }
    }

    > div:nth-of-type(2) {
      img {
        width: 0.26rem;
      }
      span {
        font-size: 0.26rem;
        color: #ffffff;
        line-height: 1;
      }
    }

    span {
      display: inline-block;
    }
  }
}
.rankItem:nth-of-type(2n) {
  background: #1e0c7a;
}
</style>