<template>
  <div class="contTop">
    <span class="surplusCoins"> <span> Jumlah bet yg tersisa：</span> <em>{{userCoins}}</em></span>
    <div class="sieveBox">
      <sieve></sieve>
      <sieve></sieve>
      <sieve></sieve>
    </div>
    <div class="openCoins">
      <div class="openCoinsLeft">
        <div>
          <em>Hitung mundur :</em>
          <span class="time">
            <em>{{timerObj.hour}}</em>
            <em>{{timerObj.minute}}</em>
            <em>{{timerObj.second}}</em>
          </span>
        </div>
        <div>Waktu pembukaan: {{hours}}</div>
      </div>
      <div class="openCoinsRight">
        <div>Jumlah orang yg ikut round ini </div>
        <div class="last">{{bet_countsp}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import dowmTime from '../utils/downTime.js'
import Sieve from './Sieve'
export default {
  components: { Sieve },
  data() {
    return {
      timerObj: {},
      timer: null
    }
  },
  computed: {
    ...mapState(['owner_msg', 'downTime', 'hours', 'bet_countsp', 'actStatus']),
    userCoins() {
      if (this.owner_msg.b >= 0) {
        return this.owner_msg.b
      }
    }
  },
  watch: {
    downTime(val) {
      dowmTime('time1', val);
    }
  },
  mounted() {
    this.timerObj = dowmTime('time1')
    this.timer = setInterval(() => {
      this.timerObj = dowmTime('time1');
      if (this.timerObj.end && this.actStatus === 1) {
        this.$store.commit('changDownTime', 3600)
      }
    }, 1000)
  },
}
</script>
<style lang="scss">
.contTop {
  position: relative;
  height: 5rem;
  .surplusCoins {
    position: absolute;
    width: 3rem;
    left: 2.3rem;
    top: 0.15rem;
    height: 0.57rem;
    // line-height: 0.5rem;
    color: #659c9c;
    font-size: 80%;
    display: flex;
    align-items: center;
    span {
      display: inline-block;
      width: 1.3rem;
      line-height: 0.25rem;
    }
    em {
      display: inline-block;
      text-align: center;
      color: #fff261;
      font-weight: bold;
      font-size: 110%;
      margin: 0 auto;
    }
  }
  .sieveBox {
    padding: 0 1.13rem;
    position: absolute;
    top: 1.1rem;
    display: flex;
    justify-content: space-between;
  }
  .openCoins {
    width: 5.9rem;
    height: 0.96rem;
    margin: 0 auto;
    position: absolute;
    left: 0.8rem;
    top: 3.35rem;
    display: flex;
    .openCoinsLeft {
      width: 3.8rem;
      color: #51a6a6;
      font-size: 80%;
      margin-left: 0.1rem;
      div {
        height: 50%;
        line-height: 0.48rem;
        display: flex;
        align-items: center;
        > em {
          font-size: 70%;
          white-space: nowrap;
          transform: scale(0.85);
        }
        .time {
          display: inline-block;
          width: 2rem;
          height: 0.42rem;
          background: url(../assets/img/timeBg.png) no-repeat;
          background-size: contain;
          // margin-left: 0.1rem;
          display: flex;
          justify-content: space-between;
          em {
            display: inline-block;
            width: 0.6rem;
            height: 0.4rem;
            text-align: center;
            color: #28ffcf;
            font-size: 110%;
            line-height: 0.4rem;
          }
        }
      }
      div:first-child {
        margin-left: -0.13rem;
      }
    }
    .openCoinsRight {
      flex: 1;
      font-size: 70%;
      color: #659c9c;
      div {
        height: 50%;
        text-align: center;
        line-height: 0.26rem;
      }
      .last {
        color: #fff261;
        font-size: 110%;
        line-height: 0.48rem;
      }
    }
  }
}
</style>
