<template>
  <div class="strategy">
    <i class="close" @click="closeStrate()"></i>
    <div class="title">{{lang.strategy_title}}</div>
    <div class="scorll">
      <div class="tipsItem">
        <h5>{{lang.strategy_h51}}</h5>
        <p>{{lang.strategy_p1}}</p>
        <p>{{lang.strategy_p2}}</p>
        <p>{{lang.strategy_p3}}</p>
        <p>{{lang.strategy_p4}}</p>
        <p>{{lang.strategy_p5}}</p>
      </div>
      <div class="tipsItem">
        <h5>{{lang.strategy_h52}}</h5>
        <p>
          {{lang.strategy_p6}}<br />
          {{lang.strategy_p7}}<br />
          {{lang.strategy_p8}}<br />
          {{lang.strategy_p9}}
        </p>
      </div>
      <div class="tipsItem">
        <h5> {{lang.strategy_p10}}</h5>
        <p>
          {{lang.strategy_p11}}<br />
          {{lang.strategy_p12}}
        </p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  methods: {
    closeStrate () {
      this.$parent.showStrategy = false
    }
  }
}
</script>

<style lang="scss">
.title {
  text-align: center;
  font-size: 0.42rem;
  color: #fff;
}
.scorll {
  height: 7rem;
  overflow: scroll;
}
.strategy {
  width: 6.4rem;
  height: 9.1rem;
  padding: 1.07rem 0.46rem 0 0.2rem;
  background: url(../img/strategy.png);
  background-size: 100% 100%;
  margin-left: 0.4rem;
  font-size: 0.24rem;
  color: rgba(223, 254, 255, 1);
  position: relative;
  .tipsItem {
    padding: 0 0.2rem;
    margin-bottom: 0.3rem;
    h5,
    p {
      font-size: 0.24rem;
    }
  }
}
.close {
  display: block;
  width: 0.56rem;
  height: 0.56rem;
  background: url(../img/close.png);
  background-size: 100% 100%;
  position: absolute;
  bottom: -0.8rem;
  left: 2.86rem;
}
</style>