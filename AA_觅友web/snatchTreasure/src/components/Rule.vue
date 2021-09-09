
<template>
  <div class="rule">
    <div class="title"><i @click="$parent.showRule = false"></i>{{lang.ruleTitle}}</div>
    <div class="con">
      <p class="firstTips">
        {{lang.firstTips}}
      </p>
      <ul>
        <li v-for="(item,index) in strList" :key="index">
          <i>{{index+1}}</i>
          {{item}}
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
export default {
  computed: {
    strList () {
      return this.lang.strList
    }
  }
}
</script>

<style lang="scss">
.rule {
  width: 7.5rem;
  height: 9.31rem;
  background: url(../img/pupBg.png);
  background-size: 100% 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  .title {
    height: 0.98rem;
    display: flex;
    align-items: center;
    font-size: 0.36rem;
    i {
      width: 0.48rem;
      height: 0.48rem;
      background: url(../img/black.png);
      background-size: 100% 100%;
      margin: 0 0.08rem 0 0.32rem;
    }
  }
  .con {
    padding: 0 0.3rem;
    flex: 1;
    overflow-y: scroll;
    .firstTips {
      margin-top: 0.23rem;
      font-size: 0.26rem;
      color: rgba(255, 255, 255, 0.9);
      line-height: 0.46rem;
    }
    ul {
      margin-top: 0.3rem;
    }
    li {
      font-size: 0.26rem;
      color: rgba(255, 255, 255, 0.9);
      line-height: 0.46rem;
      padding-left: 0.41rem;
      margin-bottom: 0.11rem;
      position: relative;
      i {
        display: block;
        width: 0.3rem;
        height: 0.3rem;
        text-align: center;
        line-height: 0.3rem;
        background: url(../img/numsBg.png);
        background-size: 100% 100%;
        position: absolute;
        left: 0;
        top: 0.09rem;
        font-size: 0.22rem;
      }
    }
  }
}
</style>