<template>
  <div class="timePeople">
    <div class="tm">3月10号</div>
    <div class="pelple">
      <i class="arr_left"></i>
      <i class="arr_right"></i>
      <div class="people_list">
        <div class="people_item" v-for="(item,index) in list" :key="index">
          <img v-lazy="item.avatar" alt="" class="av">
          <div class="hour">22:00</div>
          <div class="score">9999</div>
          <div class="scoreTips">人氣值</div>
        </div>
      </div>
    </div>
    <div class="people_scoreTips">
      在3月23日-3月30日期間，每日20：00、21：00、23：00
      每小時人氣值第一名榮登人氣席位，並獲得對應小時人氣值
      10%加成。（席位中展示的人氣值不包含10%加成，加成分
      數直接增加到晉級賽、決賽）
    </div>
  </div>
</template>

<script>

import { mapState } from "vuex"
export default {
  data () {
    return {
      list: [
        {
          avatar: '',
          score: '',
        },
        {
          avatar: '',
          score: '',
        },
        {
          avatar: '',
          score: '',
        },
        {
          avatar: '',
          score: '',
        }
      ]
    }
  },
  computed: {
    ...mapState(['days_rank'])
  }
}
</script>

<style lang="scss" lang="scss">
.timePeople {
  width: 7.31rem;
  height: 5.34rem;
  padding-top: 0.13rem;
  background: url(../img/tm_peopleBg.png);
  background-size: 100% 100%;
  margin: 0 auto;
  position: relative;
  .tm {
    width: 3.4rem;
    height: 0.49rem;
    background: url(../img/tm_title_bg.png);
    background-size: 100% 100%;
    text-align: center;
    line-height: 0.49rem;
    font-size: 0.28rem;
    font-weight: bold;
    margin: 0 auto;
  }
  .pelple {
    margin-top: 0.8rem;
    .people_list {
      padding: 0 0.47rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .people_item {
        width: 1.47rem;
        height: 1.98rem;
        background: url(../img/people_item.png);
        background-size: 100% 100%;
        position: relative;
        .av {
          width: 1.15rem;
          height: 1.15rem;
          border-radius: 50%;
          border: 0.02rem solid RGBA(249, 194, 247, 1);
          box-sizing: border-box;
          position: absolute;
          left: 0.16rem;
          top: -0.5rem;
        }
        .hour {
          width: 1.25rem;
          height: 0.51rem;
          background: url(../img/hourBg.png);
          background-size: 100% 100%;
          text-align: center;
          line-height: 0.51rem;
          font-size: 0.26rem;
          position: absolute;
          top: 0.45rem;
          left: 0.1rem;
        }
        .score {
          width: 100%;
          height: 0.4rem;
          line-height: 0.4rem;
          font-size: 0.32rem;
          font-weight: bold;
          color: rgba(255, 248, 59, 1);
          position: absolute;
          top: 0.9rem;
          text-align: center;
        }
        .scoreTips {
          width: 1.36rem;
          height: 0.32rem;
          text-align: center;
          line-height: 0.32rem;
          background: url(../img/score_tips.png);
          background-size: 100% 100%;
          position: absolute;
          bottom: 0.3rem;
          font-size: 0.24rem;
          color: rgba(249, 194, 247, 1);
        }
      }
    }
  }
  .people_scoreTips {
    padding: 0 0.51rem;
    text-align: center;
    font-size: 0.24rem;
    color: rgba(216, 173, 252, 1);
    margin: 0.3rem auto 0;
  }
}
.timePeople::before {
  content: '';
  display: block;
  width: 7.23rem;
  height: 4.81rem;
  border: 1px solid #E43E7E;
  border-radius: 0.1rem;
  position: absolute;
  top: 0.6rem;
  left: 0.03rem;
}
</style>