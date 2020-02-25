<template>
  <div class="startLit">
    <div class="bottom">
      <ul>
        <li v-for="(item,index) in userRank" @click="goUser(item.uid)" :key="index" :class="'rank'+index">
          <span class="rankItem">{{item.rank}}</span>
          <img v-lazy="item.avatar" alt="">
          <div class="userMsg">
            <p class="name">
              {{item.nick}}
            </p>
            <p class="id">
              {{item.uid}}:UID
            </p>
          </div>
          <div class="start">
            <em></em>
            <span>{{item.score}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  computed: {
    ...mapState(['userRank'])
  },
  methods: {
    goUser(val) { //跳转用户页
      location.href = `uid:${val}`
    }
  }
}
</script>

<style lang="scss">
.bottom {
  margin-top: 0.5rem;
  padding: 0.96rem 0.2rem 0;
  background: url(../assets/img/rankBg.png) center 0 no-repeat;
  background-size: 7.32rem auto;
  li {
    height: 1.07rem;
    background: url(../assets/img/listBg.png) no-repeat;
    background-size: 100% 100%;
    margin-top: 0.06rem;
    display: flex;
    align-items: center;
    // padding-left: .68rem;
    &.rank0 {
      background: url(../assets/img/listBgTop1.png);
      background-size: 100% 100%;
      .rankItem {
        width: 0.75rem;
        height: 0.65rem;
        background: url(../assets/img/top1.png);
        background-size: 100% 100%;
        text-indent: 999rem;
      }
    }
    &.rank1 {
      background: url(../assets/img/listBgTop2.png);
      background-size: 100% 100%;
      .rankItem {
        width: 0.75rem;
        height: 0.65rem;
        background: url(../assets/img/top2.png);
        background-size: 100% 100%;
        text-indent: -999rem;
      }
    }
    &.rank2 {
      background: url(../assets/img/listBgTop2.png);
      background-size: 100% 100%;
      .rankItem {
        width: 0.75rem;
        height: 0.65rem;
        background: url(../assets/img/top3.png);
        background-size: 100% 100%;
        text-indent: -999rem;
      }
    }
    .start {
      width: 1.9rem;
      line-height: 0.97rem;
      color: #fff496;
      margin-right: 0.2rem;
      span {
        float: right;
      }
      em {
        float: right;
        display: inline-block;
        width: 0.35rem;
        height: 0.33rem;
        background: url(../assets/img/star.png) no-repeat;
        background-size: contain;
        margin: 0.3rem 0 0 0.2rem;
      }
    }
    .userMsg {
      width: 2.8rem;
      margin-right: 0.14rem;
      .name {
        max-width: 2.8rem;
        height: 50%;
        font-size: 85%;
        overflow: hidden;
        text-overflow: ellipsis; /* 超出部分显示省略号 */
        white-space: nowrap;
        direction: rtl;
        line-height: 0.46rem;
        margin: 0 auto;
        text-align: right;
      }
      .id {
        font-size: 80%;
        height: 50%;
        line-height: 0.46rem;
        color: #b5aaff;
        text-align: right;
      }
    }
    .rankItem {
      width: 0.75rem;
      height: 0.65rem;
      margin-right: 0.26rem;
      text-align: center;
      line-height: 0.65rem;
      color: #ffdc4f;
    }
    > img {
      width: 0.9rem;
      height: 0.9rem;
      margin-right: 0.1rem;
      border-radius: 50%;
      border: 0.02rem solid #ffe08a;
    }
  }
}
</style>
