<template>
  <div class="receuvungRank">
    <div class="query">
      <p class="msg1">عدد المصباح المقدم: نذر بالجان+شراء بفول ذهبي</p>
    </div>
    <ul class="rankList">
      <li v-for="(item,index) in songliRank" :key='index' @click="goUser(item.uid)">
        <div class="rank" :class="'top' + item.rank">{{item.rank}}</div>
        <div class="imgBox">
          <img v-lazy="item.avatar" alt="" class="img1" :class="{top1Img:item.rank===1}">
          <img src="../assets/img/top1Bg.png" alt="" class="img2" v-if="item.rank===1">
        </div>
        <div class="userMsg">
          <div class="name">{{item.nick}}</div>
          <!-- <div class="givingPeople">عدد المصباح المتلقى：<em>88888</em></div>
          <div class="showMsg"> أغنية：<em>لجان، سينال الطرفان</em></div> -->
        </div>
        <div class="givingPeople">عدد المصباح المقدم：<em>{{item.score}}</em></div>
        <!-- <span class="giving">النذر</span> -->
      </li>
      <!-- <li>
        <div class="rank top2">2</div>
        <div class="imgBox">
          <img src="../assets/img/default.png" alt="" class="img1">
        </div>
      </li>
      <li>
        <div class="rank top3">3</div>
        <div class="imgBox">
          <img src="../assets/img/default.png" alt="" class="img1">
        </div>
      </li>
      <li>
        <div class="rank">4</div>
        <div class="imgBox">
          <img src="../assets/img/default.png" alt="" class="img1">
        </div>
      </li> -->
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['songliRank'])
  },
  methods: {
    goUser(uid) {
      location.href = `uid:${uid}`
    }
  }
}
</script>

<style lang="scss">
.receuvungRank {
  .query {
    margin-top: 0.32rem;
    .msg1 {
      font-size: 80%;
      font-weight: bold;
      color: #3effd4;
      text-align: center;
    }
    .msg2 {
      font-size: 80%;
      font-weight: bold;
      color: #ffd13f;
      text-align: center;
    }
    .queryBar {
      width: 4.91rem;
      height: 0.7rem;
      margin: 0.19rem auto 0;
      background: url(../assets/img/queryBg.png) no-repeat;
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      .title {
        display: inline-block;
        color: #ffdfbf;
        margin-right: 0.38rem;
      }
      input {
        width: 1.7rem;
        margin-right: 0.15rem;
        background: none;
        outline: none;
        border: none;
        color: #fff;
      }
      .goQuery {
        margin-right: 0.4rem;
      }
    }
  }
  .rankList {
    margin-top: 0.24rem;
    padding: 0 0.29rem 0 0.35rem;
    li {
      display: flex;
      height: 1.16rem;
      align-items: center;
      border-bottom: 0.01rem solid rgba(120, 72, 189, 1);
      .rank {
        width: 0.75rem;
        height: 0.65rem;
        line-height: 0.65rem;
        text-align: center;
        color: #ffbb8d;
        font-size: 120%;
        &.top1 {
          text-indent: -999rem;
          background: url(../assets/img/top1.png);
          background-size: 100% 100%;
        }
        &.top2 {
          text-indent: -999rem;
          background: url(../assets/img/top2.png);
          background-size: 100% 100%;
        }
        &.top3 {
          text-indent: -999rem;
          background: url(../assets/img/top3.png);
          background-size: 100% 100%;
        }
      }
      .imgBox {
        width: 0.9rem;
        height: 0.9rem;
        margin-right: 0.11rem;
        position: relative;
        > .img1 {
          width: 0.9rem;
          height: 0.9rem;
          border-radius: 50%;
          border: 0.02rem solid #ffee78;
          position: absolute;
        }
        .img2 {
          width: 0.97rem;
          height: 1.14rem;
          position: absolute;
          top: -0.23rem;
          left: -0.01rem;
        }
        .top1Img {
          border: none;
        }
      }
      .userMsg {
        width: 1.8rem;
        margin-right: 0.16rem;
        display: flex;
        flex-direction: column;
        div {
          flex: 1;
          font-size: 70%;
        }
        .name {
          width: 100%;
          color: #fffcef;
          overflow: hidden; /*超出部分隐藏*/
          text-overflow: ellipsis; /* 超出部分显示省略号 */
          white-space: nowrap;
        }
      }
      .givingPeople {
        font-size: 70%;
        color: #dac1ff;
        margin-right: 0.1rem;
        em {
          color: #fff8ab;
          font-size: 80%;
        }
      }
    }
  }
}
</style>