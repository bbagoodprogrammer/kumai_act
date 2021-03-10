<template>
  <div class="voteSongList">
    <span class="preSongTips" @click="listShowClcik()"><strong> التصويت للمجموعة {{list.length}}</strong> <i :class="{rotate:show}"></i> </span>
    <ul :class="{hide:!show}" v-if="index<=1">
      <li v-for="(item,index) in list " :key="index">
        <span class="tips">تصويت</span>
        <img v-lazy="item.avatar" alt="" class="av">
        <div class="preUserMsg">
          <div class="nick">{{item.nick}}</div>
          <div class="songName">《{{item.name}}》</div>
          <i class="bigGo" v-if="item.result == 1"></i>
        </div>
        <div class="uers">
          <img v-lazy="item.pk_data[0].avatar" alt="" class="av1" @click="goUser(item.pk_data[0].uid)">
          <em>{{item.result != 0?item.pk_data[0].nums:'?'}}</em>
          <i>:</i>
          <em>{{item.result != 0?item.pk_data[1].nums:'?'}}</em>
          <img v-lazy="item.pk_data[1].avatar" alt="" class="av2" @click="goUser(item.pk_data[1].uid)">
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ['list', 'index'],
  data () {
    return {
      show: false
    }
  },
  methods: {
    listShowClcik () {
      if (this.index > 1) return
      this.show = !this.show
    },
    goUser (uid) {
      location.href = `uid:${uid}`
    }
  }
}
</script>
<style lang="scss" scoped>
.voteSongList {
  .preSongTips {
    margin: 0 auto;
    display: block;
    width: 1.88rem;
    height: 0.55rem;
    border: 0.02rem solid rgba(252, 219, 2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.15rem auto 0.1rem;
    strong {
      color: rgba(252, 219, 2, 1);
      font-size: 0.24rem;
      font-weight: bold;
    }
    i {
      transition: transform 0.2s linear;
      display: inline-block;
      width: 0.28rem;
      height: 0.19rem;
      margin-left: 0.29rem;
      background: url(../assets/img/lower.png);
      background-size: 100% 100%;
      &.upper {
        background: url(../assets/img/upper.png);
        background-size: 100% 100%;
      }
      &.rotate {
        transform: rotate(-180deg);
      }
    }
  }
  ul {
    padding-bottom: 0.5rem;
    overflow: hidden;
    transition: height 1s linear;
    &.hide {
      height: 0;
      padding: 0;
    }
    li {
      height: 1.27rem;
      border-bottom: 0.02rem solid rgba(138, 90, 255, 1);
      display: flex;
      align-items: center;
      .tips {
        width: 0.45rem;
        text-align: center;
        color: rgba(201, 165, 255, 1);
        font-weight: bold;
      }
      .av {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        margin-left: 0.2rem;
      }
      .preUserMsg {
        width: 2.7rem;
        height: 0.8rem;
        margin-left: 0.13rem;
        position: relative;
        .nick {
          font-weight: bold;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .songName {
          color: rgba(201, 165, 255, 1);
          font-size: 0.24rem;
          margin-top: 0.03rem;
        }
        .bigGo {
          display: block;
          width: 0.95rem;
          height: 0.95rem;
          background: url(../assets/img/bigGo.png);
          background-size: 100% 100%;
          position: absolute;
          z-index: 10;
          right: 0;
          bottom: -0.32rem;
        }
      }
      .uers {
        width: 2.09rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-left: 0.03rem;
        img {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
