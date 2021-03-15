<template>
  <div class="seedNums">
    <div class="get" @click="scorllTo()">
      {{lang.userSeedNums_get}}
    </div>
    <div class="seed">
      <div class="seed1">
        <div class="top">
          <div class="imgBox">
            <img src="../img/getSeed1.png" alt="">
            <div class="value"><i class="x"></i> <img v-for="(item,index) in String(seed).split('')" :key="index" :src="require(`../img/numbers/${item}.png`)" alt=""></div>
          </div>
          <strong>{{lang.userSeedNums_seed1}}</strong>
        </div>
        <div class="buttom">
          {{lang.userSeedNums_seed1_tips}}
        </div>
      </div>
      <div class="seed1">
        <div class="top">
          <div class="imgBox">
            <img src="../img/getSeed2.png" alt="">
            <div class="value"><i class="x"></i> <img v-for="(item,index) in String(seed1).split('')" :key="index" :src="require(`../img/numbers/${item}.png`)" alt=""></div>
          </div>
          <strong>{{lang.userSeedNums_seed2}}</strong>
        </div>
        <div class="buttom">
          {{lang.userSeedNums_seed2_tips}}
        </div>
      </div>
      <div class="seed1">
        <div class="top">
          <div class="imgBox">
            <img src="../img/accIcon.png" alt="">
            <div class="value"><i class="x"></i> <img v-for="(item,index) in String(hoping).split('')" :key="index" :src="require(`../img/numbers/${item}.png`)" alt=""></div>
          </div>
          <strong>{{lang.userSeedNums_seed3}}</strong>
        </div>
        <div class="buttom">
          {{lang.userSeedNums_seed3_tips}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  computed: {
    ...mapState(['seed', 'seed1', 'hoping'])
  },
  methods: {
    scorllTo () {
      this.$parent.$refs.rank.tabClick(1)
      //   document.getElementsByClassName('tabs')[0].scrollIntoView();
      let a = document.getElementsByClassName('tabs')[0].getBoundingClientRect().top
      let c = document.documentElement.scrollTop || document.body.scrollTop
      let e = a + c - 10
      this.timer = setInterval(() => {
        let c = document.documentElement.scrollTop || document.body.scrollTop
        let t = (e - c) / 10
        window.scrollTo(0, c + t)
        console.log(t)
        if (t < 8) {
          clearInterval(this.timer)
        }
      }, 10)
    }
  }
}
</script>

<style lang="scss">
.seedNums {
  position: relative;
  z-index: 10;
  .get {
    width: 3.98rem;
    height: 1.67rem;
    background: url(../img/getSeed.png);
    background-size: 100% 100%;
    text-align: center;
    line-height: 1.67rem;
    margin: 0 auto;
    color: rgba(101, 72, 209, 1);
    font-size: 0.36rem;
    font-weight: 600;
  }
  .seed {
    width: 6.8rem;
    height: 3.86rem;
    background: url(../img/seedBg.png);
    background-size: 100% 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    > div {
      height: 100%;
      flex: 1;
      .top {
        height: 50%;
        padding-top: 0.25rem;
        .imgBox {
          position: relative;
          > img {
            display: block;
            margin: 0 auto;
            width: 1.16rem;
            height: 1.16rem;
          }
          .value {
            width: 100%;
            height: 0.4rem;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            right: 0;
            top: 0;
            img {
              width: 0.23rem;
              height: 0.3rem;
              margin-left: -0.05rem;
            }
            .x {
              display: block;
              width: 0.28rem;
              height: 0.3rem;
              background: url(../img/numbers/x.png);
              background-size: 100% 100%;
            }
          }
        }
        strong {
          display: block;
          text-align: center;
          font-size: 0.28rem;
          color: rgba(101, 72, 209, 1);
          margin: 0.15rem auto 0;
          font-weight: 600;
        }
      }
      .buttom {
        font-size: 0.23rem;
        padding: 0 0.2rem;
        text-align: center;
      }
    }
  }
}
</style>